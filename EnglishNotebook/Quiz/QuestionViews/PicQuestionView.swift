import SwiftUI

/// Вибір картинки: сітка 2×N карток з емодзі. `animated` — емодзі як анімована сцена (hearpic);
/// `accessory` — вміст між питанням і картками (кнопки звуку).
struct PicQuestionView<Accessory: View>: View {
    var prompt: String
    var options: [PicOption]
    var answer: Int
    var no: [String?]?
    var animated = false
    var finish: QuestionFinish
    @ViewBuilder var accessory: () -> Accessory

    @State private var chosen: Int?
    @State private var popTrigger = 0
    @State private var shakeTrigger = 0

    private let columns = [GridItem(.flexible(), spacing: 14), GridItem(.flexible(), spacing: 14)]

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: prompt)
            accessory()
            LazyVGrid(columns: columns, spacing: 14) {
                ForEach(options.indices, id: \.self) { k in
                    picButton(k)
                }
            }
        }
    }

    private func state(_ k: Int) -> AnswerState {
        guard let chosen else { return .idle }
        if k == answer { return .ok }
        return k == chosen ? .bad : .idle
    }

    private func picButton(_ k: Int) -> some View {
        let st = state(k)
        let option = options[k]
        return Button {
            choose(k)
        } label: {
            VStack(spacing: 8) {
                if animated {
                    SceneView(scene: option.emoji, size: 38)
                        .frame(minHeight: 56)
                } else {
                    Text(option.emoji)
                        .font(.system(size: 56))
                        .accessibilityHidden(true)
                }
                HStack(spacing: 4) {
                    if st == .ok {
                        Image(systemName: "checkmark.circle.fill").foregroundStyle(Theme.ok)
                    } else if st == .bad {
                        Image(systemName: "xmark.circle.fill").foregroundStyle(Theme.bad)
                    }
                    Text(option.text)
                        .font(.meta)
                        .foregroundStyle(Theme.muted)
                        .multilineTextAlignment(.center)
                }
            }
            .frame(maxWidth: .infinity, minHeight: 44)
            .padding(.vertical, 18)
            .padding(.horizontal, 10)
            .background(st.fill, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous).stroke(st.stroke, lineWidth: 2))
            .contentShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        }
        .buttonStyle(.pressableCard)
        .disabled(chosen != nil)
        .accessibilityLabel(option.text)
        .pop(trigger: k == answer ? popTrigger : 0)
        .shake(trigger: k == chosen ? shakeTrigger : 0)
        .popIn(delay: 0.09 * Double(k))
    }

    private func choose(_ k: Int) {
        guard chosen == nil else { return }
        let ok = k == answer
        withAnimation(Motion.ease(0.5)) {
            chosen = k
            popTrigger += 1
        }
        if !ok {
            withAnimation(.linear(duration: 0.45)) { shakeTrigger += 1 }
        }
        let why = no.flatMap { k < $0.count ? $0[k] : nil }
        finish(ok, opt(k).text, opt(answer).text, why)
    }

    private func opt(_ k: Int) -> PicOption { options[min(max(k, 0), options.count - 1)] }
}

extension PicQuestionView where Accessory == EmptyView {
    init(prompt: String, options: [PicOption], answer: Int, no: [String?]?, finish: @escaping QuestionFinish) {
        self.init(prompt: prompt, options: options, answer: answer, no: no, finish: finish) { EmptyView() }
    }
}
