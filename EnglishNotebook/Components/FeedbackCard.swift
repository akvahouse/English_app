import SwiftUI

/// Відгук після відповіді (.fb на сайті, role="status").
struct FeedbackCard: View {
    var ok: Bool
    var userAnswer: String
    var correctText: String
    var wrongWhy: String?
    var why: String?

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(ok ? "✓ Правильно!" : "✗ Неправильно.")
                .font(.callout)
                .foregroundStyle(ok ? Theme.ok : Theme.bad)
            if !ok {
                line("Ваша відповідь:", userAnswer + (wrongWhy.map { " — " + $0 } ?? ""))
                line("Правильно:", correctText)
            }
            if let why, !why.isEmpty {
                line("Чому так:", why)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.vertical, 12)
        .padding(.horizontal, 14)
        .background(ok ? Theme.okSoft : Theme.badSoft, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(.updatesFrequently)
        .popIn()
    }

    /// Рядок із жирною міткою та приглушеним значенням.
    private func line(_ label: String, _ value: String) -> some View {
        var text = AttributedString(label + " ")
        text.font = Font.subheadline.bold()
        var tail = AttributedString(value)
        tail.font = Font.subheadline
        text.append(tail)
        return Text(text)
            .foregroundStyle(Theme.muted)
            .fixedSize(horizontal: false, vertical: true)
    }
}
