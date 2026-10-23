import SwiftUI

/// Рендер одного блоку конспекту.
struct BlockView: View {
    var block: Block

    var body: some View {
        switch block {
        case .paragraph(let text):
            RichTextView(text: text)
        case .hint(let text):
            RichTextView(text: text, font: .meta, color: Theme.muted, lineSpacing: 3)
        case .bullets(let items):
            ListBlock(items: items, numbered: false)
        case .numbered(let items):
            ListBlock(items: items, numbered: true)
        case .table(let header, let rows):
            TableBlock(header: header, rows: rows)
        case .pair(let cells):
            PairBlock(cells: cells)
        case .chips(let items):
            ChipsBlock(items: items)
        case .tag(let text, let color):
            TagLabel(text: text, color: color)
        case .details(let summary, let blocks):
            DetailsBlock(summary: summary, blocks: blocks)
        case .flipCards(let cards):
            FlipCardsGrid(cards: cards)
        case .sourceImages(let files):
            SourceImagesBlock(files: files)
        }
    }
}

/// Стек блоків із відступами.
struct BlocksView: View {
    var blocks: [Block]
    var spacing: CGFloat = 14

    var body: some View {
        VStack(alignment: .leading, spacing: spacing) {
            ForEach(blocks) { BlockView(block: $0) }
        }
    }
}

// MARK: - Списки

struct ListBlock: View {
    var items: [String]
    var numbered: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 9) {
            ForEach(Array(items.enumerated()), id: \.offset) { i, item in
                HStack(alignment: .firstTextBaseline, spacing: 10) {
                    if numbered {
                        Text("\(i + 1).")
                            .font(.bodyText.weight(.semibold).monospacedDigit())
                            .foregroundStyle(Theme.accent)
                            .frame(minWidth: 22, alignment: .trailing)
                    } else {
                        Circle().fill(Theme.accent).frame(width: 6, height: 6)
                            .alignmentGuide(.firstTextBaseline) { d in d[.bottom] + 2 }
                            .frame(minWidth: 22, alignment: .center)
                    }
                    RichTextView(text: item)
                }
            }
        }
    }
}

// MARK: - Таблиця

struct TableBlock: View {
    var header: [TableCell]?
    var rows: [[TableCell]]

    private var columnCount: Int {
        max(header?.count ?? 0, rows.map { $0.reduce(0) { $0 + ($1.colspan ?? 1) } }.max() ?? 0)
    }
    private var minColumnWidth: CGFloat { columnCount >= 3 ? 130 : 110 }

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            VStack(spacing: 0) {
                if let header {
                    row(header, isHeader: true, index: -1)
                }
                ForEach(Array(rows.enumerated()), id: \.offset) { i, r in
                    row(r, isHeader: false, index: i)
                }
            }
            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous).stroke(Theme.line))
        }
        .scrollBounceBehavior(.basedOnSize, axes: .horizontal)
    }

    private func row(_ cells: [TableCell], isHeader: Bool, index: Int) -> some View {
        HStack(alignment: .top, spacing: 0) {
            ForEach(Array(cells.enumerated()), id: \.offset) { _, cell in
                Group {
                    if cell.cont == true {
                        Text("")
                    } else {
                        RichTextView(text: cell.text,
                                     font: isHeader ? .meta.weight(.bold) : .meta,
                                     color: isHeader ? Theme.accent : Theme.ink,
                                     lineSpacing: 3)
                    }
                }
                .frame(width: minColumnWidth * CGFloat(cell.colspan ?? 1), alignment: .leading)
                .padding(.horizontal, 10)
                .padding(.vertical, 8)
                .overlay(alignment: .trailing) { Rectangle().fill(Theme.line).frame(width: 1) }
            }
        }
        .background(isHeader ? Theme.accentSoft : (index % 2 == 1 ? Theme.bg : Theme.card))
        .overlay(alignment: .bottom) { Rectangle().fill(Theme.line).frame(height: 1) }
    }
}

// MARK: - Пари (на телефоні — вертикальний стек)

struct PairBlock: View {
    var cells: [PairCell]

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            ForEach(Array(cells.enumerated()), id: \.offset) { _, cell in
                VStack(alignment: .leading, spacing: 8) {
                    if let tag = cell.tag {
                        TagLabel(text: tag, color: cell.tagColor)
                    }
                    BlocksView(blocks: cell.blocks, spacing: 8)
                }
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Theme.bg, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
        }
    }
}

struct TagLabel: View {
    var text: String
    var color: TagColor?

    var body: some View {
        Text(RichText.plain(text))
            .eyebrowStyle(color: Theme.tagColor(color))
    }
}

// MARK: - Чипи

struct ChipsBlock: View {
    var items: [String]

    var body: some View {
        FlowLayout(spacing: 8, lineSpacing: 8) {
            ForEach(Array(items.enumerated()), id: \.offset) { _, item in
                Text(RichText.attributed(item, baseFont: .meta, color: Theme.accent))
                    .padding(.horizontal, 12)
                    .padding(.vertical, 5)
                    .background(Theme.accentSoft, in: Capsule())
            }
        }
    }
}

// MARK: - Розгортання (details/summary)

struct DetailsBlock: View {
    var summary: String
    var blocks: [Block]
    @State private var open = false

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Button {
                withAnimation(Motion.ease(0.35)) { open.toggle() }
            } label: {
                HStack(spacing: 8) {
                    Image(systemName: "chevron.right")
                        .font(.footnote.weight(.bold))
                        .rotationEffect(.degrees(open ? 90 : 0))
                    Text(RichText.plain(summary))
                        .font(.bodyText.weight(.semibold))
                    Spacer(minLength: 0)
                }
                .foregroundStyle(Theme.accent)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            if open {
                BlocksView(blocks: blocks)
                    .transition(.opacity.combined(with: .move(edge: .top)))
            }
        }
        .clipped()
    }
}

// MARK: - Картинки конспектів

struct SourceImagesBlock: View {
    var files: [String]
    @State private var selected: NoteImage?

    var body: some View {
        VStack(spacing: 12) {
            ForEach(files, id: \.self) { file in
                if let url = ContentStore.shared.noteImageURL(file), let ui = UIImage(contentsOfFile: url.path) {
                    Button { selected = NoteImage(file: file) } label: {
                        Image(uiImage: ui)
                            .resizable()
                            .scaledToFit()
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous).stroke(Theme.line))
                    }
                    .buttonStyle(.pressableCard)
                    .accessibilityLabel("Сторінка конспекту \(file)")
                } else {
                    Text("Картинка \(file) відсутня")
                        .font(.small).foregroundStyle(Theme.muted)
                }
            }
        }
        .fullScreenCover(item: $selected) { note in
            ImageViewer(file: note.file)
        }
    }
}

/// Обрана сторінка конспекту для fullScreenCover(item:).
struct NoteImage: Identifiable {
    let file: String
    var id: String { file }
}

/// Повноекранний перегляд картинки з масштабуванням.
struct ImageViewer: View {
    var file: String
    @Environment(\.dismiss) private var dismiss
    @State private var scale: CGFloat = 1
    @State private var lastScale: CGFloat = 1
    @State private var viewportWidth: CGFloat = 0

    var body: some View {
        NavigationStack {
            Group {
                if let url = ContentStore.shared.noteImageURL(file), let ui = UIImage(contentsOfFile: url.path) {
                    ScrollView([.horizontal, .vertical]) {
                        Image(uiImage: ui)
                            .resizable()
                            .scaledToFit()
                            .frame(width: viewportWidth * scale)
                            .gesture(
                                MagnifyGesture()
                                    .onChanged { v in scale = min(max(lastScale * v.magnification, 1), 5) }
                                    .onEnded { _ in lastScale = scale }
                            )
                            .onTapGesture(count: 2) {
                                withAnimation(Motion.ease(0.3)) { scale = scale > 1 ? 1 : 2.5; lastScale = scale }
                            }
                    }
                    .onGeometryChange(for: CGFloat.self) { $0.size.width } action: { viewportWidth = $0 }
                    .background(Color.black)
                } else {
                    Text("Картинку не знайдено").foregroundStyle(.white)
                }
            }
            .ignoresSafeArea()
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Закрити", role: .close) { dismiss() }
                }
            }
            .toolbarColorScheme(.dark, for: .navigationBar)
        }
    }
}
