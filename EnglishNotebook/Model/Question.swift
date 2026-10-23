import Foundation

// 12 типів завдань — 1:1 із сайтом: mc, fill, order, pic, match, sort, gapbank
// і звукові/сценові listen, dictate, hearpic, scenegap, scenesay.

/// Озвучка речення: `audio` — ключ mp3 у Resources/Audio (`<audio>.mp3`, `<audio>-slow.mp3`);
/// без нього додаток читає `say` системним голосом.
struct QuestionSound: Codable, Hashable {
    var say: String
    var audio: String?
    var audioSlow: Bool?
}

struct PicOption: Codable, Hashable {
    var emoji: String
    var text: String
}

struct MatchPair: Codable, Hashable {
    var emoji: String
    var left: String?
    var right: String
}

struct SortItem: Codable, Hashable {
    var text: String
    var bucket: Int
}

enum Question: Codable, Identifiable {
    case mc(q: String, options: [String], answer: Int, why: String?, no: [String?]?)
    case fill(q: String, answers: [String], why: String?, no: String?)
    case order(words: [String], answer: String, why: String?, no: String?)
    case pic(q: String, options: [PicOption], answer: Int, why: String?, no: [String?]?)
    case match(q: String, pairs: [MatchPair], why: String?)
    case sort(q: String, buckets: [String], items: [SortItem], why: String?)
    case gapbank(q: String, bank: [String], sentences: [String], answers: [String], why: String?, no: String?)
    /// `reply` — звучить питання, а варіанти — короткі відповіді на нього.
    case listen(q: String, sound: QuestionSound, reply: Bool, options: [String], answer: Int, why: String?, no: [String?]?)
    case dictate(q: String, sound: QuestionSound, answers: [String], why: String?)
    case hearpic(q: String, sound: QuestionSound, options: [PicOption], answer: Int, why: String?, no: [String?]?)
    case scenegap(q: String, scene: String, sentence: String, sound: QuestionSound, options: [String], answer: Int, why: String?, no: [String?]?)
    case scenesay(q: String, scene: String, sound: QuestionSound, options: [String], answer: Int, why: String?, no: [String?]?)

    var typeName: String {
        switch self {
        case .mc: return "mc"
        case .fill: return "fill"
        case .order: return "order"
        case .pic: return "pic"
        case .match: return "match"
        case .sort: return "sort"
        case .gapbank: return "gapbank"
        case .listen: return "listen"
        case .dictate: return "dictate"
        case .hearpic: return "hearpic"
        case .scenegap: return "scenegap"
        case .scenesay: return "scenesay"
        }
    }

    /// Текст питання (для order на сайті — «Складіть речення»).
    var prompt: String {
        switch self {
        case .mc(let q, _, _, _, _), .pic(let q, _, _, _, _), .match(let q, _, _),
             .sort(let q, _, _, _), .gapbank(let q, _, _, _, _, _), .fill(let q, _, _, _),
             .listen(let q, _, _, _, _, _, _), .dictate(let q, _, _, _), .hearpic(let q, _, _, _, _, _),
             .scenegap(let q, _, _, _, _, _, _, _), .scenesay(let q, _, _, _, _, _, _):
            return q
        case .order:
            return "Складіть речення з слів:"
        }
    }

    /// Пояснення «Чому так».
    var why: String? {
        switch self {
        case .mc(_, _, _, let w, _), .fill(_, _, let w, _), .order(_, _, let w, _), .pic(_, _, _, let w, _),
             .match(_, _, let w), .sort(_, _, _, let w), .gapbank(_, _, _, _, let w, _),
             .listen(_, _, _, _, _, let w, _), .dictate(_, _, _, let w), .hearpic(_, _, _, _, let w, _),
             .scenegap(_, _, _, _, _, _, let w, _), .scenesay(_, _, _, _, _, let w, _):
            return w
        }
    }

    /// Озвучка завдання (nil — завдання без звуку).
    var sound: QuestionSound? {
        switch self {
        case .listen(_, let s, _, _, _, _, _), .dictate(_, let s, _, _), .hearpic(_, let s, _, _, _, _),
             .scenegap(_, _, _, let s, _, _, _, _), .scenesay(_, _, let s, _, _, _, _):
            return s
        default:
            return nil
        }
    }

    var id: String { typeName + ":" + prompt + ":" + answerKey }

    private var answerKey: String {
        switch self {
        case .mc(_, let o, let a, _, _): return o.joined(separator: "|") + "#\(a)"
        case .fill(_, let a, _, _): return a.joined(separator: "|")
        case .order(_, let a, _, _): return a
        case .pic(_, let o, let a, _, _): return o.map(\.text).joined(separator: "|") + "#\(a)"
        case .match(_, let p, _): return p.map(\.right).joined(separator: "|")
        case .sort(_, _, let i, _): return i.map(\.text).joined(separator: "|")
        case .gapbank(_, _, _, let a, _, _): return a.joined(separator: "|")
        case .listen(_, let s, _, let o, let a, _, _): return s.say + ":" + o.joined(separator: "|") + "#\(a)"
        case .dictate(_, let s, _, _): return s.say
        case .hearpic(_, let s, let o, let a, _, _): return s.say + ":" + o.map(\.text).joined(separator: "|") + "#\(a)"
        case .scenegap(_, let sc, let st, _, let o, let a, _, _): return sc + st + ":" + o.joined(separator: "|") + "#\(a)"
        case .scenesay(_, let sc, _, let o, let a, _, _): return sc + ":" + o.joined(separator: "|") + "#\(a)"
        }
    }

    private enum CodingKeys: String, CodingKey {
        case type, q, options, answer, answers, why, no, words, pairs, buckets, items, bank, sentences
        case say, audio, audioSlow, reply, scene, sentence
    }

    private static func decodeSound(_ c: KeyedDecodingContainer<CodingKeys>) throws -> QuestionSound {
        QuestionSound(say: try c.decode(String.self, forKey: .say),
                      audio: try c.decodeIfPresent(String.self, forKey: .audio),
                      audioSlow: try c.decodeIfPresent(Bool.self, forKey: .audioSlow))
    }

    private static func encodeSound(_ s: QuestionSound, _ c: inout KeyedEncodingContainer<CodingKeys>) throws {
        try c.encode(s.say, forKey: .say)
        try c.encodeIfPresent(s.audio, forKey: .audio)
        try c.encodeIfPresent(s.audioSlow, forKey: .audioSlow)
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        let type = try c.decode(String.self, forKey: .type)
        let why = try c.decodeIfPresent(String.self, forKey: .why)
        switch type {
        case "mc":
            self = .mc(q: try c.decode(String.self, forKey: .q),
                       options: try c.decode([String].self, forKey: .options),
                       answer: try c.decode(Int.self, forKey: .answer),
                       why: why,
                       no: try c.decodeIfPresent([String?].self, forKey: .no))
        case "fill":
            self = .fill(q: try c.decode(String.self, forKey: .q),
                         answers: try c.decode([String].self, forKey: .answers),
                         why: why,
                         no: try c.decodeIfPresent(String.self, forKey: .no))
        case "order":
            self = .order(words: try c.decode([String].self, forKey: .words),
                          answer: try c.decode(String.self, forKey: .answer),
                          why: why,
                          no: try c.decodeIfPresent(String.self, forKey: .no))
        case "pic":
            self = .pic(q: try c.decode(String.self, forKey: .q),
                        options: try c.decode([PicOption].self, forKey: .options),
                        answer: try c.decode(Int.self, forKey: .answer),
                        why: why,
                        no: try c.decodeIfPresent([String?].self, forKey: .no))
        case "match":
            self = .match(q: try c.decode(String.self, forKey: .q),
                          pairs: try c.decode([MatchPair].self, forKey: .pairs),
                          why: why)
        case "sort":
            self = .sort(q: try c.decode(String.self, forKey: .q),
                         buckets: try c.decode([String].self, forKey: .buckets),
                         items: try c.decode([SortItem].self, forKey: .items),
                         why: why)
        case "gapbank":
            self = .gapbank(q: try c.decode(String.self, forKey: .q),
                            bank: try c.decode([String].self, forKey: .bank),
                            sentences: try c.decode([String].self, forKey: .sentences),
                            answers: try c.decode([String].self, forKey: .answers),
                            why: why,
                            no: try c.decodeIfPresent(String.self, forKey: .no))
        case "listen":
            self = .listen(q: try c.decode(String.self, forKey: .q),
                           sound: try Self.decodeSound(c),
                           reply: try c.decodeIfPresent(Bool.self, forKey: .reply) ?? false,
                           options: try c.decode([String].self, forKey: .options),
                           answer: try c.decode(Int.self, forKey: .answer),
                           why: why,
                           no: try c.decodeIfPresent([String?].self, forKey: .no))
        case "dictate":
            self = .dictate(q: try c.decode(String.self, forKey: .q),
                            sound: try Self.decodeSound(c),
                            answers: try c.decode([String].self, forKey: .answers),
                            why: why)
        case "hearpic":
            self = .hearpic(q: try c.decode(String.self, forKey: .q),
                            sound: try Self.decodeSound(c),
                            options: try c.decode([PicOption].self, forKey: .options),
                            answer: try c.decode(Int.self, forKey: .answer),
                            why: why,
                            no: try c.decodeIfPresent([String?].self, forKey: .no))
        case "scenegap":
            self = .scenegap(q: try c.decode(String.self, forKey: .q),
                             scene: try c.decode(String.self, forKey: .scene),
                             sentence: try c.decode(String.self, forKey: .sentence),
                             sound: try Self.decodeSound(c),
                             options: try c.decode([String].self, forKey: .options),
                             answer: try c.decode(Int.self, forKey: .answer),
                             why: why,
                             no: try c.decodeIfPresent([String?].self, forKey: .no))
        case "scenesay":
            self = .scenesay(q: try c.decode(String.self, forKey: .q),
                             scene: try c.decode(String.self, forKey: .scene),
                             sound: try Self.decodeSound(c),
                             options: try c.decode([String].self, forKey: .options),
                             answer: try c.decode(Int.self, forKey: .answer),
                             why: why,
                             no: try c.decodeIfPresent([String?].self, forKey: .no))
        default:
            throw DecodingError.dataCorruptedError(forKey: .type, in: c, debugDescription: "Невідомий тип питання \(type)")
        }
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.container(keyedBy: CodingKeys.self)
        try c.encode(typeName, forKey: .type)
        try c.encodeIfPresent(why, forKey: .why)
        switch self {
        case .mc(let q, let o, let a, _, let no):
            try c.encode(q, forKey: .q); try c.encode(o, forKey: .options); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        case .fill(let q, let a, _, let no):
            try c.encode(q, forKey: .q); try c.encode(a, forKey: .answers); try c.encodeIfPresent(no, forKey: .no)
        case .order(let w, let a, _, let no):
            try c.encode(w, forKey: .words); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        case .pic(let q, let o, let a, _, let no):
            try c.encode(q, forKey: .q); try c.encode(o, forKey: .options); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        case .match(let q, let p, _):
            try c.encode(q, forKey: .q); try c.encode(p, forKey: .pairs)
        case .sort(let q, let b, let i, _):
            try c.encode(q, forKey: .q); try c.encode(b, forKey: .buckets); try c.encode(i, forKey: .items)
        case .gapbank(let q, let b, let s, let a, _, let no):
            try c.encode(q, forKey: .q); try c.encode(b, forKey: .bank); try c.encode(s, forKey: .sentences); try c.encode(a, forKey: .answers); try c.encodeIfPresent(no, forKey: .no)
        case .listen(let q, let snd, let reply, let o, let a, _, let no):
            try c.encode(q, forKey: .q); try Self.encodeSound(snd, &c); try c.encode(reply, forKey: .reply)
            try c.encode(o, forKey: .options); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        case .dictate(let q, let snd, let a, _):
            try c.encode(q, forKey: .q); try Self.encodeSound(snd, &c); try c.encode(a, forKey: .answers)
        case .hearpic(let q, let snd, let o, let a, _, let no):
            try c.encode(q, forKey: .q); try Self.encodeSound(snd, &c)
            try c.encode(o, forKey: .options); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        case .scenegap(let q, let scene, let sentence, let snd, let o, let a, _, let no):
            try c.encode(q, forKey: .q); try c.encode(scene, forKey: .scene); try c.encode(sentence, forKey: .sentence); try Self.encodeSound(snd, &c)
            try c.encode(o, forKey: .options); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        case .scenesay(let q, let scene, let snd, let o, let a, _, let no):
            try c.encode(q, forKey: .q); try c.encode(scene, forKey: .scene); try Self.encodeSound(snd, &c)
            try c.encode(o, forKey: .options); try c.encode(a, forKey: .answer); try c.encodeIfPresent(no, forKey: .no)
        }
    }
}
