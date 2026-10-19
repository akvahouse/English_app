import SwiftUI

/// Конспект уроку (сайт: #/lesson/:id). Hero-картка, секції-картки, кнопки внизу.
struct LessonView: View {
    var lesson: Lesson
    @Environment(Router.self) private var router

    private let topID = "lesson-top"

    var body: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Color.clear.frame(height: 0).id(topID)

                    hero.riseIn(index: 0)

                    ForEach(Array(lesson.sections.enumerated()), id: \.offset) { i, section in
                        VStack(alignment: .leading, spacing: 14) {
                            Text(section.title)
                                .font(.sectionTitle)
                                .foregroundStyle(Theme.ink)
                                .accessibilityAddTraits(.isHeader)
                            BlocksView(blocks: section.blocks)
                        }
                        .card(padding: 20)
                        // Як nth-child(n+6) на сайті: затримка не росте далі 5-го блоку.
                        .riseIn(index: min(i + 1, 5))
                    }

                    VStack(spacing: 12) {
                        Button("Пройти тест (випадковий варіант)") { router.openQuiz(lesson.id) }
                            .buttonStyle(.primary)
                        Button("До списку") { router.home() }
                            .buttonStyle(.ghost)
                    }
                    .padding(.top, 4)
                }
                .padding(.horizontal, Theme.screenPadding)
                .padding(.top, 12)
                .padding(.bottom, 32)
            }
            .onAppear { proxy.scrollTo(topID, anchor: .top) }
            .onChange(of: lesson.id) { _, _ in proxy.scrollTo(topID, anchor: .top) }
        }
        .background(Theme.bg.ignoresSafeArea())
        .navigationTitle(lesson.short)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                LessonsMenu(current: lesson.id)
            }
        }
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 14) {
            LessonArt(lessonId: lesson.id)
                .aspectRatio(400.0 / 240.0, contentMode: .fit)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .shadow(color: Theme.ink.opacity(0.15), radius: 12, y: 6)
                .frame(maxWidth: 340)
                .frame(maxWidth: .infinity)

            Text(lesson.title)
                .font(.screenTitle)
                .tracking(-0.5)
                .foregroundStyle(Theme.ink)
                .fixedSize(horizontal: false, vertical: true)
                .accessibilityAddTraits(.isHeader)

            Text(lesson.subtitle)
                .font(.bodyText)
                .lineSpacing(5)
                .foregroundStyle(Theme.muted)
                .fixedSize(horizontal: false, vertical: true)

            Button {
                router.openQuiz(lesson.id)
            } label: {
                Text("Пройти тест · випадковий із \(lesson.versions.count) варіантів")
                    .multilineTextAlignment(.center)
                    .padding(.vertical, 8)
            }
            .buttonStyle(.primary)
            .padding(.top, 4)
        }
        .padding(22)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(
            LinearGradient(colors: [Theme.accentSoft, Theme.card], startPoint: .topLeading, endPoint: .bottomTrailing),
            in: RoundedRectangle(cornerRadius: 22, style: .continuous)
        )
        .overlay(RoundedRectangle(cornerRadius: 22, style: .continuous).stroke(Theme.line, lineWidth: 1))
    }
}
