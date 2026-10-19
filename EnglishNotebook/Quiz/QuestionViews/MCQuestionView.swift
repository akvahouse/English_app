import SwiftUI

/// Вибір однієї відповіді з варіантів.
struct MCQuestionView: View {
    var prompt: String
    var options: [String]
    var answer: Int
    var no: [String?]?
    var finish: QuestionFinish

    @State private var chosen: Int?
    @State private var popTrigger = 0
    @State private var shakeTrigger = 0

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: prompt)
            VStack(spacing: 10) {
                ForEach(options.indices, id: \.self) { k in
                    optionButton(k)
                }
            }
        }
    }

    private func state(_ k: Int) -> AnswerState {
        guard let chosen else { return .idle }
        if k == answer { return .ok }
        return k == chosen ? .bad : .idle
    }

    private func optionButton(_ k: Int) -> some View {
        let st = state(k)
        return Button {
            choose(k)
        } label: {
            HStack(spacing: 10) {
                Text(options[k])
                    .font(.option)
                    .foregroundStyle(Theme.ink)
                    .multilineTextAlignment(.leading)
                    .fixedSize(horizontal: false, vertical: true)
                    .frame(maxWidth: .infinity, alignment: .leading)
                if st == .ok {
                    Image(systemName: "checkmark.circle.fill").foregroundStyle(Theme.ok)
                } else if st == .bad {
                    Image(systemName: "xmark.circle.fill").foregroundStyle(Theme.bad)
                }
            }
            .padding(17)
            .frame(minHeight: 44)
            .background(st.fill, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(st.stroke, lineWidth: st == .idle ? 1 : 2))
            .contentShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
        .buttonStyle(OptionButtonStyle())
        .disabled(chosen != nil)
        .pop(trigger: k == answer ? popTrigger : 0)
        .shake(trigger: k == chosen ? shakeTrigger : 0)
    }

    private func choose(_ k: Int) {
        guard chosen == nil else { return }
        let ok = k == answer
        withAnimation(Motion.ease(0.45)) {
            chosen = k
            popTrigger += 1
        }
        if !ok {
            withAnimation(.linear(duration: 0.45)) { shakeTrigger += 1 }
        }
        let why = no.flatMap { k < $0.count ? $0[k] : nil }
        finish(ok, options[k], options[answer], why)
    }
}
