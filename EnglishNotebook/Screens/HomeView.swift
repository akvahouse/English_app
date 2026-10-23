import SwiftUI

/// Головна (сайт: #/). Ticker, вступ, «Твій наступний крок», картки уроків, скидання.
struct HomeView: View {
    @Environment(Router.self) private var router
    @Environment(ProgressStore.self) private var progress

    private let lessons = ContentStore.shared.lessons
    private let totalQuestions = ContentStore.shared.totalQuestions
    private let totalVariants = ContentStore.shared.totalVariants

    /// Перший урок без результату, інакше перший.
    private var nextLesson: Lesson? {
        lessons.first { progress.result(for: $0.id) == nil } ?? lessons.first
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                Ticker().zIndex(1)

                VStack(alignment: .leading, spacing: 24) {
                    header
                    if let next = nextLesson {
                        continueCard(next).riseIn(index: 2)
                    }
                    sectionHeading.riseIn(index: 3)

                    LazyVStack(spacing: 16) {
                        ForEach(Array(lessons.enumerated()), id: \.element.id) { i, lesson in
                            LessonCard(lesson: lesson, index: i)
                                .riseIn(index: min(i, 2), delay: 0.1, duration: 0.4, step: 0.06)
                        }
                    }

                    ResetButton()
                        .frame(maxWidth: .infinity)
                        .riseIn(index: 5)

                    Text("Уроки та тести з англійської · прогрес зберігається на цьому пристрої")
                        .font(.small)
                        .foregroundStyle(Theme.muted)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)
                }
                .padding(.horizontal, Theme.screenPadding)
                .padding(.top, 24)
                .padding(.bottom, 32)
            }
        }
        .background(Theme.bg.ignoresSafeArea())
        .navigationTitle("English Notebook")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button {
                    router.openProgress()
                } label: {
                    Text("Пройдено тестів: \(progress.doneCount)/\(lessons.count)")
                        .font(.small.weight(.semibold))
                        .foregroundStyle(Theme.ink)
                        .fixedSize()
                        .padding(.horizontal, 6)
                }
                .accessibilityHint("Відкриває екран прогресу")
            }
            ToolbarItem(placement: .topBarTrailing) {
                LessonsMenu(current: nil)
            }
        }
    }

    // MARK: - блоки

    private var header: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("ENGLISH · PERSONAL NOTEBOOK")
                .eyebrowStyle(color: Theme.accent)
                .riseIn(index: 0)

            VStack(alignment: .leading, spacing: 12) {
                Text("Мої уроки англійської")
                    .font(.screenTitle)
                    .tracking(-0.5)
                    .foregroundStyle(Theme.ink)
                    .accessibilityAddTraits(.isHeader)
                Text("Усе, що вивчаємо, — в одному місці.\nПовертайся до тем і закріплюй знання на практиці.")
                    .font(.bodyText)
                    .lineSpacing(5)
                    .foregroundStyle(Theme.muted)
                Text("\(lessons.count) тем курсу")
                    .font(.small.weight(.semibold))
                    .foregroundStyle(Theme.muted)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Theme.card, in: Capsule())
                    .overlay(Capsule().stroke(Theme.line, lineWidth: 1))
            }
            .riseIn(index: 1)
        }
    }

    private func continueCard(_ lesson: Lesson) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Твій наступний крок")
                .eyebrowStyle(color: Theme.continueEyebrow)
            Text(lesson.title)
                .font(.cardTitle)
                .foregroundStyle(.white)
                .fixedSize(horizontal: false, vertical: true)
            Text(lesson.subtitle)
                .font(.bodyText)
                .foregroundStyle(Theme.continueText)
                .fixedSize(horizontal: false, vertical: true)
            Button {
                router.openLesson(lesson.id)
            } label: {
                Text("Відкрити урок")
                    .font(.button)
                    .foregroundStyle(Theme.continueButtonFg)
                    .frame(maxWidth: .infinity, minHeight: 50)
                    .background(Theme.continueButtonBg, in: RoundedRectangle(cornerRadius: Theme.buttonRadius, style: .continuous))
            }
            .buttonStyle(.pressableCard)
            .padding(.top, 8)
        }
        .padding(20)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.continueBg, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }

    private var sectionHeading: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Програма навчання")
                .font(.sectionTitle)
                .foregroundStyle(Theme.ink)
                .accessibilityAddTraits(.isHeader)
            Text("\(totalQuestions) завдань у \(totalVariants) варіантах тестів")
                .font(.meta)
                .foregroundStyle(Theme.muted)
        }
    }
}
