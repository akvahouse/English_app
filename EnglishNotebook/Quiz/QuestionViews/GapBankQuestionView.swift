import SwiftUI

/// Вставлення слів із банку в речення з пропусками «___».
struct GapBankQuestionView: View {
    var prompt: String
    var bank: [String]
    var sentences: [String]
    var answers: [String]
    var finish: QuestionFinish

    private struct Word: Identifiable {
        let k: Int
        let text: String
        var id: Int { k }
    }

    private enum Token {
        case word(String)
        case gap(left: String?, right: String?)   // слова, «приклеєні» до пропуску (розділові знаки)
    }

    @State private var words: [Word]
    @State private var gaps: [Int?]               // k слова в кожному пропуску
    @State private var results: [Bool?]
    @State private var done = false
    @State private var pops: [Int: Int] = [:]
    @State private var shakes: [Int: Int] = [:]

    init(prompt: String, bank: [String], sentences: [String], answers: [String], finish: @escaping QuestionFinish) {
        self.prompt = prompt
        self.bank = bank
        self.sentences = sentences
        self.answers = answers
        self.finish = finish
        _words = State(initialValue: bank.enumerated().map { Word(k: $0.offset, text: $0.element) }.shuffledCopy())
        _gaps = State(initialValue: Array(repeating: nil, count: sentences.count))
        _results = State(initialValue: Array(repeating: nil, count: sentences.count))
    }

    private func text(_ k: Int?) -> String {
        guard let k else { return "" }
        return words.first { $0.k == k }?.text ?? ""
    }

    private var freeWords: [Word] { words.filter { w in !gaps.contains { $0 == w.k } } }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: prompt)
            QuestionHint(text: "Натисніть слово — воно займе перше вільне місце. Натисніть на слово в реченні, щоб прибрати його.")

            VStack(alignment: .leading, spacing: 4) {
                ForEach(sentences.indices, id: \.self) { gi in
                    sentenceRow(gi)
                        .riseIn(index: gi, step: 0.07, duration: 0.45)
                }
            }

            // Банк слів
            FlowLayout(spacing: 8, lineSpacing: 0) {
                ForEach(freeWords) { w in
                    Button { place(w.k) } label: { WordChip(text: w.text) }
                        .buttonStyle(.plain)
                        .disabled(done)
                }
                if freeWords.isEmpty {
                    Text("Усі слова використано ✓")
                        .font(.meta)
                        .foregroundStyle(Theme.muted)
                        .padding(.vertical, 8)
                }
            }
            .frame(maxWidth: .infinity, minHeight: 44, alignment: .topLeading)

            if !done {
                Button("Перевірити") { check() }
                    .buttonStyle(.primary)
                    .disabled(gaps.contains { $0 == nil })
            }
        }
    }

    // MARK: - Речення

    private func tokens(_ sentence: String) -> [Token] {
        let parts = sentence.components(separatedBy: "___")
        let a = parts[0]
        let b = parts.count > 1 ? parts[1] : ""
        var before = a.split(separator: " ").map(String.init)
        var after = b.split(separator: " ").map(String.init)
        var left: String?
        var right: String?
        if !a.isEmpty, !a.hasSuffix(" "), let last = before.popLast() { left = last }
        if !b.isEmpty, !b.hasPrefix(" "), !after.isEmpty { right = after.removeFirst() }
        return before.map { Token.word($0) } + [Token.gap(left: left, right: right)] + after.map { Token.word($0) }
    }

    private func sentenceRow(_ gi: Int) -> some View {
        let toks = Array(tokens(sentences[gi]).enumerated())
        return HStack(alignment: .top, spacing: 10) {
            Text(String(gi + 1))
                .font(.system(size: 12, weight: .bold))
                .foregroundStyle(Theme.accent)
                .frame(width: 24, height: 24)
                .background(Theme.accentSoft, in: Circle())
                .padding(.top, 10)
                .accessibilityHidden(true)
            FlowLayout(spacing: 4, lineSpacing: 0) {
                ForEach(toks, id: \.offset) { _, tok in
                    switch tok {
                    case .word(let w):
                        sentenceWord(w)
                    case .gap(let left, let right):
                        HStack(spacing: 0) {
                            if let left { sentenceWord(left) }
                            gapButton(gi)
                            if let right { sentenceWord(right) }
                        }
                    }
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.vertical, 2)
    }

    private func sentenceWord(_ w: String) -> some View {
        Text(w)
            .font(.option)
            .foregroundStyle(Theme.ink)
    }

    private func gapButton(_ gi: Int) -> some View {
        let filled = gaps[gi] != nil
        let st: AnswerState = results[gi] == true ? .ok : results[gi] == false ? .bad : .idle
        let line: Color = st == .idle ? Theme.accent : st.stroke
        let fill: Color = st == .idle ? Theme.accentSoft : st.fill
        let top = UnevenRoundedRectangle(topLeadingRadius: 8, bottomLeadingRadius: 0,
                                         bottomTrailingRadius: 0, topTrailingRadius: 8, style: .continuous)
        return Button {
            clear(gi)
        } label: {
            Text(filled ? text(gaps[gi]) : " ")
                .font(.callout.weight(filled ? .bold : .regular))
                .foregroundStyle(Theme.ink)
                .padding(.horizontal, 12)
                .padding(.vertical, 2)
                .frame(minWidth: 92)
                .background(fill, in: top)
                .overlay(alignment: .bottom) {
                    GapUnderline()
                        .stroke(line, style: StrokeStyle(lineWidth: 3, dash: filled || st != .idle ? [] : [5, 3]))
                        .frame(height: 3)
                }
                .padding(.vertical, 9)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .disabled(!filled || done)
        .pop(trigger: pops[gi] ?? 0)
        .shake(trigger: shakes[gi] ?? 0)
        .padding(.horizontal, 3)
        .accessibilityLabel(filled ? "Пропуск \(gi + 1): \(text(gaps[gi]))" : "Порожній пропуск \(gi + 1)")
    }

    // MARK: - Дії

    private func place(_ k: Int) {
        guard !done, let gi = gaps.firstIndex(where: { $0 == nil }) else { return }
        Haptics.selection()
        withAnimation(Motion.ease(0.35)) {
            gaps[gi] = k
            pops[gi, default: 0] += 1
        }
    }

    private func clear(_ gi: Int) {
        guard !done, gaps[gi] != nil else { return }
        Haptics.selection()
        withAnimation(Motion.ease(0.25)) { gaps[gi] = nil }
    }

    private func answer(_ gi: Int) -> String { gi < answers.count ? answers[gi] : "" }

    private func check() {
        guard !done, !gaps.contains(where: { $0 == nil }) else { return }
        done = true
        var bad: [Int] = []
        withAnimation(Motion.ease(0.3)) {
            for gi in sentences.indices {
                let ok = text(gaps[gi]).normalizedAnswer == answer(gi).normalizedAnswer
                results[gi] = ok
                if !ok { bad.append(gi) }
            }
        }
        withAnimation(.linear(duration: 0.45)) {
            for gi in bad { shakes[gi, default: 0] += 1 }
        }
        let userAnswer = bad.map { String($0 + 1) + ") " + text(gaps[$0]) }.joined(separator: "; ")
        let correct = sentences.indices.map { String($0 + 1) + ") " + answer($0) }.joined(separator: "; ")
        let why: String? = bad.isEmpty ? nil
            : "Не на своєму місці: " + bad.map { "у реченні " + String($0 + 1) + " потрібне «" + answer($0) + "»" }.joined(separator: "; ")
        finish(bad.isEmpty, userAnswer, correct, why)
    }
}

/// Горизонтальна лінія по центру рамки (нижня межа пропуску).
private struct GapUnderline: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        p.move(to: CGPoint(x: rect.minX, y: rect.midY))
        p.addLine(to: CGPoint(x: rect.maxX, y: rect.midY))
        return p
    }
}
