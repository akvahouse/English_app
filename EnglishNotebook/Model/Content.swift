import Foundation

// Модель контенту. Джерело — Resources/Content.json, який генерує tools/export-content.mjs із web/js.

struct Content: Codable {
    var lessons: [Lesson]
    var ticker: [TickerItem]
}

struct Lesson: Codable, Identifiable, Hashable {
    var id: String          // trial, tobe1, tobe2, presimple, chunks, beordo, negatives, questions
    var index: Int          // 1…8
    var title: String
    var short: String
    var subtitle: String
    var summary: String
    var sections: [LessonSection]
    var versions: [QuizVersion]

    /// «01», «02»…
    var number: String { String(format: "%02d", index) }
    var questionCount: Int { versions.reduce(0) { $0 + $1.questions.count } }

    static func == (a: Lesson, b: Lesson) -> Bool { a.id == b.id }
    func hash(into h: inout Hasher) { h.combine(id) }
}

struct LessonSection: Codable, Identifiable {
    var id: String
    var title: String
    var blocks: [Block]
}

struct QuizVersion: Codable {
    var n: Int
    var questions: [Question]
}

struct TickerItem: Codable, Identifiable {
    var en: String
    var ua: String
    var emoji: String
    var id: String { en }
}

struct FlipCard: Codable, Identifiable {
    var emoji: String
    var en: String
    var ua: String
    var example: String
    var id: String { en }
}

/// Клітинка таблиці конспекту. `cont` — продовження клітинки з rowspan (порожня).
struct TableCell: Codable {
    var text: String
    var colspan: Int?
    var cont: Bool?
}

/// Клітинка блоку «pair» (двоколонкова сітка на сайті, на телефоні — стовпчик карток).
struct PairCell: Codable {
    var tag: String?
    var tagColor: TagColor?
    var blocks: [Block]
}

enum TagColor: String, Codable {
    case past, present, future
}

/// Блоки конспекту. Текст у блоках — інлайн-формат (див. RichText.swift):
/// <b> <mark> <s> <u> <i> <small> <a href="…"> та "\n".
indirect enum Block: Codable, Identifiable {
    case paragraph(text: String)
    case hint(text: String)
    case bullets(items: [String])
    case numbered(items: [String])
    case table(header: [TableCell]?, rows: [[TableCell]])
    case pair(cells: [PairCell])
    case chips(items: [String])
    case tag(text: String, color: TagColor?)
    case details(summary: String, blocks: [Block])
    case flipCards(cards: [FlipCard])
    case sourceImages(files: [String])

    // Ідентифікатор для ForEach — стабільний у межах секції (вміст незмінний).
    var id: String {
        switch self {
        case .paragraph(let t): return "p:" + t
        case .hint(let t): return "h:" + t
        case .bullets(let i): return "ul:" + i.joined(separator: "|")
        case .numbered(let i): return "ol:" + i.joined(separator: "|")
        case .table(_, let rows): return "tbl:" + rows.flatMap { $0.map(\.text) }.joined(separator: "|")
        case .pair(let cells): return "pair:" + cells.map { ($0.tag ?? "") + $0.blocks.map(\.id).joined() }.joined(separator: "|")
        case .chips(let i): return "chips:" + i.joined(separator: "|")
        case .tag(let t, _): return "tag:" + t
        case .details(let s, _): return "details:" + s
        case .flipCards(let c): return "flips:" + c.map(\.en).joined(separator: "|")
        case .sourceImages(let f): return "img:" + f.joined(separator: "|")
        }
    }

    private enum CodingKeys: String, CodingKey {
        case kind, text, items, header, rows, cells, color, summary, blocks, cards, files
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        let kind = try c.decode(String.self, forKey: .kind)
        switch kind {
        case "paragraph": self = .paragraph(text: try c.decode(String.self, forKey: .text))
        case "hint": self = .hint(text: try c.decode(String.self, forKey: .text))
        case "bullets": self = .bullets(items: try c.decode([String].self, forKey: .items))
        case "numbered": self = .numbered(items: try c.decode([String].self, forKey: .items))
        case "table": self = .table(header: try c.decodeIfPresent([TableCell].self, forKey: .header),
                                    rows: try c.decode([[TableCell]].self, forKey: .rows))
        case "pair": self = .pair(cells: try c.decode([PairCell].self, forKey: .cells))
        case "chips": self = .chips(items: try c.decode([String].self, forKey: .items))
        case "tag": self = .tag(text: try c.decode(String.self, forKey: .text),
                                color: try c.decodeIfPresent(TagColor.self, forKey: .color))
        case "details": self = .details(summary: try c.decode(String.self, forKey: .summary),
                                        blocks: try c.decode([Block].self, forKey: .blocks))
        case "flipCards": self = .flipCards(cards: try c.decode([FlipCard].self, forKey: .cards))
        case "sourceImages": self = .sourceImages(files: try c.decode([String].self, forKey: .files))
        default:
            throw DecodingError.dataCorruptedError(forKey: .kind, in: c, debugDescription: "Невідомий блок \(kind)")
        }
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case .paragraph(let t): try c.encode("paragraph", forKey: .kind); try c.encode(t, forKey: .text)
        case .hint(let t): try c.encode("hint", forKey: .kind); try c.encode(t, forKey: .text)
        case .bullets(let i): try c.encode("bullets", forKey: .kind); try c.encode(i, forKey: .items)
        case .numbered(let i): try c.encode("numbered", forKey: .kind); try c.encode(i, forKey: .items)
        case .table(let h, let r): try c.encode("table", forKey: .kind); try c.encodeIfPresent(h, forKey: .header); try c.encode(r, forKey: .rows)
        case .pair(let cells): try c.encode("pair", forKey: .kind); try c.encode(cells, forKey: .cells)
        case .chips(let i): try c.encode("chips", forKey: .kind); try c.encode(i, forKey: .items)
        case .tag(let t, let col): try c.encode("tag", forKey: .kind); try c.encode(t, forKey: .text); try c.encodeIfPresent(col, forKey: .color)
        case .details(let s, let b): try c.encode("details", forKey: .kind); try c.encode(s, forKey: .summary); try c.encode(b, forKey: .blocks)
        case .flipCards(let cards): try c.encode("flipCards", forKey: .kind); try c.encode(cards, forKey: .cards)
        case .sourceImages(let f): try c.encode("sourceImages", forKey: .kind); try c.encode(f, forKey: .files)
        }
    }
}
