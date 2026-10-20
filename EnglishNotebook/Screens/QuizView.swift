import SwiftUI

/// Екран тесту (#/quiz/:id): заголовок, смуга прогресу, питання, відгук, «Наступне питання».
struct QuizView: View {
    var lesson: Lesson

    @Environment(ProgressStore.self) private var progress
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var engine: QuizEngine?
    @State private var attempt = 0

    private var slide: AnyTransition {
        .asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .opacity)
    }

    var body: some View {
        Group {
            if let engine {
                content(engine)
            } else {
                Color.clear
            }
        }
        .background(Theme.bg.ignoresSafeArea())
        .navigationTitle(lesson.short)
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden(engine?.finished ?? false)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                LessonsMenu(current: lesson.id)
            }
        }
        .onAppear {
            if engine == nil { engine = QuizEngine(lesson: lesson, progress: progress) }
        }
    }

    // MARK: - Вміст

    private func content(_ engine: QuizEngine) -> some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    if engine.finished {
                        ResultView(engine: engine, lesson: lesson, onRetry: retry)
                            .transition(slide)
                    } else {
                        header(engine)
                        questionCard(engine)
                            .id(engine.index)
                            .transition(slide)
                    }
                }
                .id("top")
                .padding(.horizontal, Theme.screenPadding)
                .padding(.top, 8)
                .padding(.bottom, 32)
            }
            .scrollDismissesKeyboard(.interactively)
            .onChange(of: engine.index) { _, _ in scrollToTop(proxy) }
            .onChange(of: engine.finished) { _, _ in scrollToTop(proxy) }
            .onChange(of: attempt) { _, _ in scrollToTop(proxy) }
            .onChange(of: engine.answered) { _, answered in
                guard answered else { return }
                // Показати відгук і кнопку «Далі» (на сайті кнопка отримує фокус).
                Task { @MainActor in
                    try? await Task.sleep(for: .milliseconds(150))
                    withAnimation(Motion.ease(0.4)) { proxy.scrollTo("next", anchor: .bottom) }
                }
            }
        }
    }

    private func header(_ engine: QuizEngine) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("\(lesson.title) — тест")
                .font(.screenTitle)
                .tracking(-0.5)
                .foregroundStyle(Theme.ink)
                .fixedSize(horizontal: false, vertical: true)
            ProgressBar(fraction: engine.progressFraction)
            HStack(spacing: 12) {
                Text("Питання \(engine.index + 1) з \(engine.total) · \(engine.versionLabel)")
                    .font(.meta)
                    .foregroundStyle(Theme.muted)
                if engine.streak >= 2 {
                    StreakBadge(streak: engine.streak)
                }
                Spacer(minLength: 0)
            }
            .frame(minHeight: 26)
            .animation(Motion.ease(0.2), value: engine.streak >= 2)
        }
    }

    private func questionCard(_ engine: QuizEngine) -> some View {
        VStack(alignment: .leading, spacing: 16) {
            QuestionView(question: engine.current) { ok, userAnswer, correctText, wrongWhy in
                engine.finish(ok: ok, userAnswer: userAnswer, correctText: correctText, wrongWhy: wrongWhy)
            }
            if engine.answered, let fb = engine.feedback {
                FeedbackCard(ok: fb.ok, userAnswer: fb.userAnswer, correctText: fb.correctText,
                             wrongWhy: fb.wrongWhy, why: fb.why)
                Button(engine.isLast ? "Результат" : "Наступне питання") {
                    advance(engine)
                }
                .buttonStyle(.primary)
                .id("next")
            }
        }
        .cardStyle()
    }

    // MARK: - Дії

    private func advance(_ engine: QuizEngine) {
        withAnimation(reduceMotion ? nil : Motion.ease(0.4)) { engine.next() }
    }

    private func retry() {
        withAnimation(reduceMotion ? nil : Motion.ease(0.4)) {
            engine = QuizEngine(lesson: lesson, progress: progress)
            attempt += 1
        }
    }

    private func scrollToTop(_ proxy: ScrollViewProxy) {
        proxy.scrollTo("top", anchor: .top)
    }
}
