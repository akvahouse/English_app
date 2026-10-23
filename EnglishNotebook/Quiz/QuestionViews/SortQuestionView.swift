import SwiftUI

/// Розсортування слів по групах: тап (слово → група) або перетягування.
struct SortQuestionView: View {
    var prompt: String
    var buckets: [String]
    var items: [SortItem]
    var finish: QuestionFinish

    private struct Entry: Identifiable {
        let k: Int
        let text: String
        let bucket: Int
        var place: Int? = nil
        var res: Bool? = nil
        var id: Int { k }
    }

    @State private var entries: [Entry]
    @State private var selected: Int?          // k вибраного слова
    @State private var done = false
    @State private var shakes: [Int: Int] = [:]
    @Namespace private var ns

    init(prompt: String, buckets: [String], items: [SortItem], finish: @escaping QuestionFinish) {
        self.prompt = prompt
        self.buckets = buckets
        self.items = items
        self.finish = finish
        _entries = State(initialValue: items.enumerated()
            .map { Entry(k: $0.offset, text: $0.element.text, bucket: $0.element.bucket) }
            .shuffledCopy())
    }

    private var pool: [Entry] { entries.filter { $0.place == nil } }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: prompt)
            QuestionHint(text: "Натисніть слово й оберіть групу — або перетягніть. Натисніть на розміщене слово, щоб повернути його.")

            // Пул слів
            FlowLayout(spacing: 8, lineSpacing: 0) {
                ForEach(pool) { chip($0) }
                if pool.isEmpty {
                    Text("Усе розподілено ✓")
                        .font(.meta)
                        .foregroundStyle(Theme.muted)
                        .padding(.vertical, 8)
                }
            }
            .padding(10)
            .frame(maxWidth: .infinity, minHeight: 54, alignment: .topLeading)
            .overlay(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .strokeBorder(Theme.line, style: StrokeStyle(lineWidth: 2, dash: [6, 4]))
            )
            .contentShape(Rectangle())
            .dropDestination(for: String.self) { dropped, _ in
                handleDrop(dropped, bucket: nil)
            }

            // Групи
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 140), spacing: 14)], spacing: 14) {
                ForEach(buckets.indices, id: \.self) { bi in
                    bucketView(bi)
                }
            }

            if !done {
                Button("Перевірити") { check() }
                    .buttonStyle(.primary)
                    .disabled(!pool.isEmpty)
            }
        }
    }

    // MARK: - Група

    private func hue(_ bi: Int) -> Double { Double((bi * 95 + 215) % 360) / 360 }

    private func bucketView(_ bi: Int) -> some View {
        let shape = RoundedRectangle(cornerRadius: 16, style: .continuous)
        let members = entries.filter { $0.place == bi }
        return VStack(alignment: .leading, spacing: 8) {
            Text(buckets[bi])
                .font(.subheadline.weight(.bold))
                .foregroundStyle(Theme.ink)
            FlowLayout(spacing: 8, lineSpacing: 0) {
                ForEach(members) { chip($0) }
            }
            .frame(maxWidth: .infinity, minHeight: 36, alignment: .topLeading)
        }
        .padding(12)
        .frame(maxWidth: .infinity, minHeight: 110, alignment: .topLeading)
        .background(Color(hue: hue(bi), saturation: 0.73, brightness: 0.87).opacity(0.09), in: shape)
        .overlay(shape.stroke(Color(hue: hue(bi), saturation: 0.66, brightness: 0.82).opacity(0.55), lineWidth: 2))
        .contentShape(shape)
        .onTapGesture { placeSelected(in: bi) }
        .dropDestination(for: String.self) { dropped, _ in
            handleDrop(dropped, bucket: bi)
        }
        .accessibilityElement(children: .contain)
        .accessibilityAction(named: Text("Покласти вибране слово сюди")) { placeSelected(in: bi) }
    }

    // MARK: - Слово

    private func chip(_ e: Entry) -> some View {
        let isSel = selected == e.k
        let st: AnswerState = e.res == true ? .ok : e.res == false ? .bad : .idle
        let shape = RoundedRectangle(cornerRadius: 10, style: .continuous)
        let stroke: Color = st != .idle ? st.stroke : isSel ? Theme.accent : Theme.line
        let fill: Color = st != .idle ? st.fill : isSel ? Theme.accentSoft : Theme.card
        let mark = st == .ok ? "✓ " : st == .bad ? "✗ " : ""
        return Button {
            tapChip(e.k)
        } label: {
            Text(mark + e.text)
                .font(.subheadline)
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.leading)
                .padding(.vertical, 7)
                .padding(.horizontal, 12)
                .background(fill, in: shape)
                .overlay(shape.stroke(stroke, lineWidth: 2))
                .background {
                    shape.stroke(Theme.accent.opacity(0.22), lineWidth: 4)
                        .padding(-2)
                        .opacity(isSel ? 1 : 0)
                }
                .padding(.vertical, 5)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .scaleEffect(isSel ? 1.06 : 1)
        .shake(trigger: shakes[e.k] ?? 0)
        .matchedGeometryEffect(id: e.k, in: ns)
        .draggable("sort-\(e.k)")
        .accessibilityAddTraits(isSel ? .isSelected : [])
    }

    // MARK: - Дії

    private func tapChip(_ k: Int) {
        guard !done, let i = entries.firstIndex(where: { $0.k == k }) else { return }
        Haptics.selection()
        withAnimation(Motion.ease(0.25)) {
            if entries[i].place != nil {
                entries[i].place = nil
                selected = nil
            } else {
                selected = selected == k ? nil : k
            }
        }
    }

    private func placeSelected(in bi: Int) {
        guard !done, let k = selected, let i = entries.firstIndex(where: { $0.k == k }) else { return }
        Haptics.tap()
        withAnimation(Motion.ease(0.25)) {
            entries[i].place = bi
            selected = nil
        }
    }

    @discardableResult
    private func handleDrop(_ dropped: [String], bucket: Int?) -> Bool {
        guard !done, let raw = dropped.first, raw.hasPrefix("sort-"),
              let k = Int(raw.dropFirst("sort-".count)),
              let i = entries.firstIndex(where: { $0.k == k }) else { return false }
        Haptics.tap()
        withAnimation(Motion.ease(0.25)) {
            entries[i].place = bucket
            selected = nil
        }
        return true
    }

    private func check() {
        guard !done, pool.isEmpty else { return }
        done = true
        selected = nil
        withAnimation(Motion.ease(0.3)) {
            for i in entries.indices { entries[i].res = entries[i].place == entries[i].bucket }
        }
        let bad = entries.filter { $0.res == false }
        withAnimation(.linear(duration: 0.45)) {
            for e in bad { shakes[e.k, default: 0] += 1 }
        }
        let userAnswer = bad.map { "\($0.text) → \(buckets[$0.place ?? 0])" }.joined(separator: "; ")
        let correct = buckets.enumerated().map { (bi, name) -> String in
            let texts = items.filter { $0.bucket == bi }.map(\.text)
            return name + ": " + texts.joined(separator: ", ")
        }.joined(separator: " | ")
        let why: String? = bad.isEmpty ? nil
            : "Помилково розміщено: " + bad.map { "«\($0.text)» має бути в групі «\(buckets[$0.bucket])»" }.joined(separator: "; ")
        finish(bad.isEmpty, userAnswer, correct, why)
    }
}
