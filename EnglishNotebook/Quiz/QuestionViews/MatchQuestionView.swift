import SwiftUI

/// З'єднання картинок із підписами: тап по картинці, потім по підпису.
struct MatchQuestionView: View {
    var prompt: String
    var pairs: [MatchPair]
    var finish: QuestionFinish

    private enum Side { case left, right }
    private struct Selection: Equatable {
        var side: Side
        var k: Int
    }

    @State private var rightOrder: [Int]          // порядок правих карток (перемішаний)
    @State private var selection: Selection?
    @State private var matched: Set<Int> = []
    @State private var mistakes = 0
    @State private var warn = false
    @State private var done = false
    @State private var pops: [String: Int] = [:]
    @State private var shakes: [String: Int] = [:]

    init(prompt: String, pairs: [MatchPair], finish: @escaping QuestionFinish) {
        self.prompt = prompt
        self.pairs = pairs
        self.finish = finish
        _rightOrder = State(initialValue: Array(pairs.indices).shuffledCopy())
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: prompt)
            QuestionHint(text: "Натисніть картинку, а потім підпис, що їй відповідає. Пара забарвиться в один колір.")
            HStack(alignment: .top, spacing: 12) {
                VStack(spacing: 10) {
                    ForEach(pairs.indices, id: \.self) { k in
                        card(.left, k)
                    }
                }
                .frame(maxWidth: .infinity)
                VStack(spacing: 10) {
                    ForEach(rightOrder, id: \.self) { k in
                        card(.right, k)
                    }
                }
                .frame(maxWidth: .infinity)
            }
            Text("З'єднано: \(matched.count) / \(pairs.count)")
                .font(.meta)
                .foregroundStyle(warn ? Theme.bad : Theme.muted)
                .animation(Motion.ease(0.18), value: warn)
        }
    }

    private func hueColor(_ k: Int) -> Color {
        Color(hue: Double((k * 62 + 20) % 360) / 360, saturation: 0.65, brightness: 0.48)
    }

    @ViewBuilder
    private func content(_ side: Side, _ k: Int) -> some View {
        let pair = pairs[k]
        switch side {
        case .left:
            HStack(spacing: 12) {
                Text(pair.emoji).font(.system(size: 34))
                if let left = pair.left, !left.isEmpty {
                    Text(left)
                        .font(.meta)
                        .foregroundStyle(Theme.ink)
                        .multilineTextAlignment(.leading)
                }
            }
        case .right:
            Text(pair.right)
                .font(.meta)
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.leading)
        }
    }

    private func card(_ side: Side, _ k: Int) -> some View {
        let key = (side == .left ? "l" : "r") + String(k)
        let isMatched = matched.contains(k)
        let isSel = selection == Selection(side: side, k: k)
        let shape = RoundedRectangle(cornerRadius: 14, style: .continuous)
        let stroke: Color = isMatched ? hueColor(k) : isSel ? Theme.accent : Theme.line
        let fill: Color = isMatched ? hueColor(k).opacity(0.14) : isSel ? Theme.accentSoft : Theme.card
        return Button {
            tap(side, k)
        } label: {
            content(side, k)
                .padding(.vertical, 12)
                .padding(.horizontal, 14)
                .frame(maxWidth: .infinity, minHeight: 62, alignment: .leading)
                .background(fill, in: shape)
                .overlay(shape.stroke(stroke, lineWidth: 2))
                .background {
                    shape.stroke(Theme.accent.opacity(0.22), lineWidth: 4)
                        .padding(-2)
                        .opacity(isSel ? 1 : 0)
                }
                .contentShape(shape)
        }
        .buttonStyle(.plain)
        .disabled(isMatched || done)
        .scaleEffect(isSel ? 1.03 : 1)
        .pop(trigger: pops[key] ?? 0)
        .shake(trigger: shakes[key] ?? 0)
        .accessibilityAddTraits(isSel ? .isSelected : [])
    }

    private func tap(_ side: Side, _ k: Int) {
        guard !done, !matched.contains(k) else { return }
        Haptics.selection()
        guard let current = selection, current.side != side else {
            // Перший вибір або вибір на тій самій стороні — перевибір.
            withAnimation(Motion.ease(0.18)) { selection = Selection(side: side, k: k) }
            return
        }
        let leftKey = "l" + String(side == .left ? k : current.k)
        let rightKey = "r" + String(side == .right ? k : current.k)
        if current.k == k {
            withAnimation(Motion.ease(0.45)) {
                matched.insert(k)
                selection = nil
                pops[leftKey, default: 0] += 1
                pops[rightKey, default: 0] += 1
            }
            if matched.count == pairs.count {
                done = true
                let correct = pairs.map { p -> String in
                    let label = (p.left?.isEmpty == false ? p.left : nil) ?? p.emoji
                    return "\(label) → \(p.right)"
                }.joined(separator: " · ")
                finish(mistakes == 0, "помилок у парах: \(mistakes)", correct, nil)
            }
        } else {
            mistakes += 1
            warn = true
            withAnimation(.linear(duration: 0.45)) {
                shakes[leftKey, default: 0] += 1
                shakes[rightKey, default: 0] += 1
            }
            withAnimation(Motion.ease(0.18)) { selection = nil }
        }
    }
}
