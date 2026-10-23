import SwiftUI

/// Екран «Мій прогрес»: загальний відсоток правильних відповідей і результати кожного уроку.
struct StatsView: View {
    @Environment(Router.self) private var router
    @Environment(ProgressStore.self) private var progress

    private let lessons = ContentStore.shared.lessons

    private static let dateStyle = Date.FormatStyle.dateTime.day().month(.abbreviated)
        .locale(Locale(identifier: "uk_UA"))

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Text("Мій прогрес")
                    .font(.screenTitle)
                    .tracking(-0.5)
                    .foregroundStyle(Theme.ink)
                    .accessibilityAddTraits(.isHeader)
                    .riseIn(index: 0)

                summary.riseIn(index: 1)

                VStack(alignment: .leading, spacing: 4) {
                    Text("За уроками")
                        .font(.sectionTitle)
                        .foregroundStyle(Theme.ink)
                        .accessibilityAddTraits(.isHeader)
                    Text("Найкращий результат кожного тесту")
                        .font(.meta)
                        .foregroundStyle(Theme.muted)
                }
                .riseIn(index: 2)

                VStack(spacing: 12) {
                    ForEach(Array(lessons.enumerated()), id: \.element.id) { i, lesson in
                        row(lesson).riseIn(index: min(i, 4), delay: 0.1, duration: 0.4, step: 0.04)
                    }
                }
            }
            .padding(.horizontal, Theme.screenPadding)
            .padding(.top, 8)
            .padding(.bottom, 32)
        }
        .background(Theme.bg.ignoresSafeArea())
        .navigationTitle("Прогрес")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                LessonsMenu(current: nil)
            }
        }
    }

    // MARK: - Підсумок

    @ViewBuilder private var summary: some View {
        VStack(spacing: 20) {
            if progress.doneCount == 0 {
                VStack(spacing: 12) {
                    Text("📊").font(.system(size: 48))
                    Text("Ще немає пройдених тестів")
                        .font(.cardTitle)
                        .foregroundStyle(Theme.ink)
                    Text("Пройди перший тест — і тут з'явиться відсоток правильних відповідей.")
                        .font(.meta)
                        .foregroundStyle(Theme.muted)
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)
                    if let first = lessons.first {
                        Button("Почати з уроку \(first.number)") { router.openLesson(first.id) }
                            .buttonStyle(.primary)
                            .padding(.top, 4)
                    }
                }
                .frame(maxWidth: .infinity)
            } else {
                // id: кільце анімується заново, якщо результат змінився.
                ScoreRing(percent: progress.overallPercent, caption: "правильних відповідей")
                    .id(progress.overallPercent)
                    .frame(maxWidth: .infinity)

                HStack(spacing: 10) {
                    statTile(value: "\(progress.doneCount)/\(lessons.count)", label: "тестів")
                    statTile(value: "\(progress.totalBest)/\(progress.totalAnswered)", label: "правильних")
                    statTile(value: "\(progress.totalAttempts)", label: "спроб")
                }

                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text("Курс пройдено")
                        Spacer()
                        Text("\(coursePercent)%").monospacedDigit()
                    }
                    .font(.meta.weight(.semibold))
                    .foregroundStyle(Theme.muted)
                    ScoreBar(fraction: Double(progress.doneCount) / Double(max(lessons.count, 1)), color: Theme.accent)
                }
                .accessibilityElement(children: .combine)
            }
        }
        .cardStyle()
    }

    private var coursePercent: Int {
        Int((Double(progress.doneCount) / Double(max(lessons.count, 1)) * 100).rounded())
    }

    private func statTile(value: String, label: String) -> some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.system(.title3, design: .rounded).weight(.bold))
                .monospacedDigit()
                .foregroundStyle(Theme.ink)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text(label)
                .font(.small)
                .foregroundStyle(Theme.muted)
                .multilineTextAlignment(.center)
                .lineLimit(2)
        }
        .frame(maxWidth: .infinity, minHeight: 72)
        .padding(.horizontal, 6)
        .background(Theme.bg, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        .accessibilityElement(children: .combine)
    }

    // MARK: - Рядок уроку

    private func row(_ lesson: Lesson) -> some View {
        let colors = Theme.numberColors(index: lesson.index)
        let result = progress.result(for: lesson.id)
        return Button {
            router.openLesson(lesson.id)
        } label: {
            HStack(alignment: .top, spacing: 14) {
                Text(lesson.number)
                    .font(.system(.headline, design: .rounded).weight(.bold))
                    .foregroundStyle(colors.fg)
                    .frame(width: 43, height: 43)
                    .background(colors.bg, in: RoundedRectangle(cornerRadius: 10, style: .continuous))

                VStack(alignment: .leading, spacing: 8) {
                    HStack(alignment: .firstTextBaseline) {
                        Text(lesson.short)
                            .font(.bodyText.weight(.semibold))
                            .foregroundStyle(Theme.ink)
                            .multilineTextAlignment(.leading)
                        Spacer(minLength: 8)
                        if let result {
                            Text("\(result.percent)%")
                                .font(.system(.headline, design: .rounded).weight(.bold))
                                .monospacedDigit()
                                .foregroundStyle(Theme.scoreColor(result.percent))
                        }
                    }
                    if let result {
                        ScoreBar(fraction: Double(result.percent) / 100, color: Theme.scoreColor(result.percent))
                        Text(details(result))
                            .font(.small)
                            .foregroundStyle(Theme.muted)
                    } else {
                        Text("Ще не пройдено")
                            .font(.small)
                            .foregroundStyle(Theme.muted)
                    }
                }
            }
            .cardStyle(padding: 16)
        }
        .buttonStyle(.pressableCard)
        .accessibilityHint("Відкриває урок")
    }

    private func details(_ r: LessonResult) -> String {
        var parts = ["\(r.best) з \(r.total)"]
        if let last = r.last, last != r.best { parts.append("востаннє \(last)") }
        parts.append("спроб: \(r.attemptCount)")
        parts.append(r.date.formatted(Self.dateStyle))
        return parts.joined(separator: " · ")
    }
}

/// Тонка смуга результату (без «біжучого» градієнта, як у тесті).
private struct ScoreBar: View {
    var fraction: Double
    var color: Color

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.line)
                Capsule().fill(color).frame(width: geo.size.width * min(max(fraction, 0), 1))
            }
        }
        .frame(height: 6)
        .accessibilityHidden(true)
    }
}
