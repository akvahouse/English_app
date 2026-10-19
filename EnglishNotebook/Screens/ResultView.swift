import SwiftUI

/// Підсумок тесту (result() на сайті): медаль, кільце, повідомлення, помилки, кнопки.
struct ResultView: View {
    var engine: QuizEngine
    var lesson: Lesson
    var onRetry: () -> Void

    @Environment(Router.self) private var router
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var showConfetti = false

    private var pct: Int { engine.percent }

    private var medal: String {
        pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚"
    }

    private var message: String {
        pct >= 90 ? "Чудово! 🎉" : pct >= 70 ? "Добре! 👍" : pct >= 50 ? "Непогано, повторіть конспект." : "Варто повторити тему."
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("\(lesson.title) — результат")
                .font(.screenTitle)
                .tracking(-0.5)
                .foregroundStyle(Theme.ink)
                .fixedSize(horizontal: false, vertical: true)
                .riseIn(index: 0)

            summaryCard
                .riseIn(index: 1)

            if !engine.wrong.isEmpty {
                reviewCard
                    .riseIn(index: 2)
            }

            actions
                .riseIn(index: 3)
        }
        .overlay(alignment: .top) {
            if showConfetti {
                ConfettiView()
                    .containerRelativeFrame([.horizontal, .vertical])
            }
        }
        .onAppear(perform: scheduleConfetti)
    }

    // MARK: - Блоки

    private var summaryCard: some View {
        VStack(spacing: 12) {
            Text(medal)
                .font(.system(size: 56))
                .floaty(duration: 3)
                .accessibilityHidden(true)
            ScoreRing(percent: pct, caption: "\(engine.score) з \(engine.total)")
            Text(message)
                .font(.bodyText)
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .card()
    }

    private var reviewCard: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Помилки")
                .font(.sectionTitle)
                .foregroundStyle(Theme.ink)
            ForEach(Array(engine.wrong.enumerated()), id: \.element.id) { i, w in
                if i > 0 { Divider() }
                VStack(alignment: .leading, spacing: 4) {
                    Text(title(of: w.question))
                        .font(.bodyText)
                        .foregroundStyle(Theme.ink)
                        .fixedSize(horizontal: false, vertical: true)
                    Text("Ваша відповідь: " + w.userAnswer)
                        .font(.bodyText)
                        .foregroundStyle(Theme.bad)
                        .fixedSize(horizontal: false, vertical: true)
                    Text("Правильно: " + w.correctText)
                        .font(.bodyText)
                        .foregroundStyle(Theme.ok)
                        .fixedSize(horizontal: false, vertical: true)
                    if let ww = w.wrongWhy, !ww.isEmpty {
                        Text("Чому ваша неправильна: " + ww)
                            .font(.meta)
                            .foregroundStyle(Theme.muted)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    if let why = w.why, !why.isEmpty {
                        Text("Чому так: " + why)
                            .font(.meta)
                            .foregroundStyle(Theme.muted)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        .card()
    }

    private var actions: some View {
        VStack(spacing: 10) {
            Button("Пройти ще раз") { onRetry() }
                .buttonStyle(.primary)
            Button("Конспект") { router.path = [.lesson(lesson.id)] }
                .buttonStyle(.ghost)
            Button("Усі уроки") { router.home() }
                .buttonStyle(.ghost)
        }
    }

    // MARK: - Допоміжне

    private func title(of question: Question) -> String {
        if case .order = question { return "Складіть речення" }
        return question.prompt
    }

    /// Конфеті при ≥ 70% через 0.35 с; прибирається після ~2.5 с (150 кадрів).
    private func scheduleConfetti() {
        guard pct >= 70, !reduceMotion, !showConfetti else { return }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
            showConfetti = true
            DispatchQueue.main.asyncAfter(deadline: .now() + 2.7) { showConfetti = false }
        }
    }
}
