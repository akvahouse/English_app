import SwiftUI

/// Введення відповіді з клавіатури. Для диктанту (`sound` задано) — кнопки звуку над полем,
/// а розділові знаки при перевірці не враховуються.
struct FillQuestionView: View {
    var prompt: String
    var answers: [String]
    var no: String?
    var sound: QuestionSound? = nil
    var finish: QuestionFinish

    @State private var input = ""
    @State private var result: Bool?
    @FocusState private var focused: Bool

    private var isEmpty: Bool { input.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }

    private var stateColor: (stroke: Color, fill: Color) {
        switch result {
        case true?: return (Theme.ok, Theme.okSoft)
        case false?: return (Theme.bad, Theme.badSoft)
        case nil: return (focused ? Theme.accent : Theme.line, Theme.card)
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            QuestionPrompt(text: prompt)
            if let sound { SoundBar(sound: sound) }
            let colors = stateColor
            TextField(sound == nil ? "Ваша відповідь…" : "Впишіть речення…", text: $input)
                .font(.option)
                .foregroundStyle(Theme.ink)
                .focused($focused)
                .autocorrectionDisabled()
                .textInputAutocapitalization(.never)
                .submitLabel(.done)
                .onSubmit { check() }
                .disabled(result != nil)
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .frame(minHeight: 48)
                .background(colors.fill, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 10, style: .continuous).stroke(colors.stroke, lineWidth: 2))
                .accessibilityLabel("Ваша відповідь")
            if result == nil {
                Button("Перевірити") { check() }
                    .buttonStyle(.primary)
                    .disabled(isEmpty)
            }
        }
        .animation(Motion.ease(0.18), value: focused)
        .onAppear {
            Task { @MainActor in
                try? await Task.sleep(for: .milliseconds(500))
                if result == nil, sound == nil { focused = true }
            }
        }
    }

    private func check() {
        guard result == nil, !isEmpty else { return }
        let key: (String) -> String = sound == nil ? { $0.normalizedAnswer } : { $0.dictationKey }
        let norm = key(input)
        let ok = answers.contains { key($0) == norm }
        focused = false
        withAnimation(Motion.ease(0.3)) { result = ok }
        finish(ok, input, answers.first ?? "", no)
    }
}
