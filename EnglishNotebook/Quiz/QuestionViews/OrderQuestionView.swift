import SwiftUI

/// Складання речення зі слів: тап у банку — слово «летить» у рядок, тап у рядку — повертається.
struct OrderQuestionView: View {
    var words: [String]
    var answer: String
    var no: String?
    var finish: QuestionFinish

    private struct Word: Identifiable {
        let k: Int
        let text: String
        var id: Int { k }
    }

    @State private var bank: [Word]
    @State private var built: [Int] = []      // k слів у порядку складання
    @State private var done = false
    @Namespace private var ns

    init(words: [String], answer: String, no: String?, finish: @escaping QuestionFinish) {
        self.words = words
        self.answer = answer
        self.no = no
        self.finish = finish
        _bank = State(initialValue: words.enumerated().map { Word(k: $0.offset, text: $0.element) }.shuffledCopy())
    }

    private func text(_ k: Int) -> String { bank.first { $0.k == k }?.text ?? "" }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: "Складіть речення з слів:")

            // Зона складеного речення
            FlowLayout(spacing: 8, lineSpacing: 0) {
                ForEach(built, id: \.self) { k in
                    Button { remove(k) } label: {
                        WordChip(text: text(k), background: Theme.card, stroke: Theme.accent)
                    }
                    .buttonStyle(.plain)
                    .disabled(done)
                    .matchedGeometryEffect(id: k, in: ns)
                }
            }
            .padding(8)
            .frame(maxWidth: .infinity, minHeight: 52, alignment: .topLeading)
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .strokeBorder(Theme.line, style: StrokeStyle(lineWidth: 2, dash: [6, 4]))
            )

            // Банк слів
            FlowLayout(spacing: 8, lineSpacing: 0) {
                ForEach(bank) { w in
                    let used = built.contains(w.k)
                    Button { add(w.k) } label: {
                        WordChip(text: w.text)
                    }
                    .buttonStyle(.plain)
                    .disabled(used || done)
                    .opacity(used ? 0.3 : 1)
                    .matchedGeometryEffect(id: used ? -(w.k + 1) : w.k, in: ns)
                }
            }
            .frame(maxWidth: .infinity, minHeight: 44, alignment: .topLeading)

            if !done {
                HStack(spacing: 10) {
                    Button("Перевірити") { check() }
                        .buttonStyle(.primary)
                        .disabled(built.count != bank.count)
                    Button("Скинути") { reset() }
                        .buttonStyle(.ghost)
                        .disabled(built.isEmpty)
                }
            }
        }
    }

    private func add(_ k: Int) {
        guard !done, !built.contains(k) else { return }
        Haptics.selection()
        withAnimation(Motion.ease(0.3)) { built.append(k) }
    }

    private func remove(_ k: Int) {
        guard !done else { return }
        Haptics.selection()
        withAnimation(Motion.ease(0.3)) { built.removeAll { $0 == k } }
    }

    private func reset() {
        guard !done else { return }
        withAnimation(Motion.ease(0.3)) { built = [] }
    }

    private func check() {
        guard !done, built.count == bank.count else { return }
        let sentence = built.map(text).joined(separator: " ")
        let ok = sentence.normalizedAnswer == answer.normalizedAnswer
        done = true
        finish(ok, sentence, answer, no)
    }
}
