import SwiftUI

/// Картка уроку на головній (сайт: a.card). `index` — 0-based позиція у списку.
struct LessonCard: View {
    var lesson: Lesson
    var index: Int
    @Environment(Router.self) private var router
    @Environment(ProgressStore.self) private var progress

    var body: some View {
        let colors = Theme.numberColors(index: lesson.index)
        Button {
            router.openLesson(lesson.id)
        } label: {
            VStack(alignment: .leading, spacing: 14) {
                LessonArt(lessonId: lesson.id)
                    .aspectRatio(400.0 / 240.0, contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

                HStack(spacing: 12) {
                    Text(lesson.number)
                        .font(.system(.headline, design: .rounded).weight(.bold))
                        .foregroundStyle(colors.fg)
                        .frame(minWidth: 43, minHeight: 43)
                        .background(colors.bg, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    Text("\(lesson.versions.count) варіантів тесту")
                        .font(.small)
                        .foregroundStyle(Theme.muted)
                }

                Text(lesson.title)
                    .font(.cardTitle)
                    .foregroundStyle(Theme.ink)
                    .fixedSize(horizontal: false, vertical: true)

                Text(lesson.subtitle)
                    .font(.bodyText.weight(.bold))
                    .foregroundStyle(Theme.ink)
                    .fixedSize(horizontal: false, vertical: true)

                Text(lesson.summary)
                    .font(.meta)
                    .foregroundStyle(Theme.muted)
                    .lineSpacing(4)
                    .fixedSize(horizontal: false, vertical: true)

                Theme.line.frame(height: 1)

                HStack(spacing: 8) {
                    Text("Відкрити урок")
                        .font(.meta.weight(.semibold))
                        .foregroundStyle(Theme.accent)
                    Spacer(minLength: 8)
                    badge
                }
            }
            .multilineTextAlignment(.leading)
            .card(padding: 20)
        }
        .buttonStyle(.pressableCard)
    }

    /// Статус: «80% · 8 / 10» або «До вивчення».
    @ViewBuilder private var badge: some View {
        if let r = progress.result(for: lesson.id) {
            statusBadge("\(r.percent)% · \(r.best) / \(r.total)", fg: Theme.ok, bg: Theme.okSoft)
        } else {
            statusBadge("До вивчення", fg: Theme.accent, bg: Theme.accentSoft)
        }
    }

    private func statusBadge(_ text: String, fg: Color, bg: Color) -> some View {
        Text(text)
            .font(.small.weight(.semibold))
            .foregroundStyle(fg)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(bg, in: Capsule())
    }
}
