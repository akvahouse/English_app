import SwiftUI

/// Кнопка скидання результатів у два тапи (сайт: .reset-btn, клас armed).
struct ResetButton: View {
    @Environment(ProgressStore.self) private var progress

    private enum Phase { case idle, armed, done }
    @State private var phase: Phase = .idle
    @State private var task: Task<Void, Never>?

    var body: some View {
        Button(action: tap) {
            Text(title)
                .font(.meta)
                .multilineTextAlignment(.center)
                .foregroundStyle(phase == .armed ? Color.white : Theme.muted)
                .padding(.vertical, 11)
                .padding(.horizontal, 14)
                .frame(minHeight: 44)
                .background {
                    if phase == .armed {
                        RoundedRectangle(cornerRadius: 10, style: .continuous).fill(Theme.bad)
                    }
                }
                .overlay {
                    if phase != .armed {
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .strokeBorder(Theme.line, style: StrokeStyle(lineWidth: 1, dash: [5, 4]))
                    }
                }
                .pulse(scale: 1.04, duration: 1, active: phase == .armed)
        }
        .buttonStyle(.plain)
        .animation(Motion.ease(0.2), value: phase)
        .onDisappear { task?.cancel() }
    }

    private var title: String {
        switch phase {
        case .idle: return "↺ Скинути результати"
        case .armed: return "Точно скинути? Натисніть ще раз"
        case .done: return "✓ Результати скинуто"
        }
    }

    private func tap() {
        task?.cancel()
        switch phase {
        case .idle, .done:
            Haptics.warning()
            phase = .armed
            schedule(after: 4)
        case .armed:
            progress.reset()
            Haptics.success()
            phase = .done
            schedule(after: 2)
        }
    }

    /// Повертає кнопку у стан спокою через `seconds`.
    private func schedule(after seconds: Double) {
        task = Task { @MainActor in
            try? await Task.sleep(for: .seconds(seconds))
            guard !Task.isCancelled else { return }
            phase = .idle
        }
    }
}
