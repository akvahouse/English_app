import Foundation

/// Завантажує Content.json з бандлу один раз.
final class ContentStore {
    static let shared = ContentStore()

    let lessons: [Lesson]
    let ticker: [TickerItem]

    private init() {
        guard let url = Bundle.main.url(forResource: "Content", withExtension: "json"),
              let data = try? Data(contentsOf: url) else {
            fatalError("Content.json не знайдено в бандлі — запустіть tools/export-content.mjs")
        }
        do {
            let content = try JSONDecoder().decode(AppContent.self, from: data)
            lessons = content.lessons
            ticker = content.ticker
        } catch {
            fatalError("Content.json не читається: \(error)")
        }
    }

    func lesson(_ id: String) -> Lesson? { lessons.first { $0.id == id } }

    /// Усього завдань у всіх варіантах усіх уроків.
    var totalQuestions: Int { lessons.reduce(0) { $0 + $1.questionCount } }
    var totalVariants: Int { lessons.reduce(0) { $0 + $1.versions.count } }

    /// URL картинки конспекту з Resources/Notes.
    func noteImageURL(_ file: String) -> URL? {
        let name = (file as NSString).deletingPathExtension
        let ext = (file as NSString).pathExtension
        return Bundle.main.url(forResource: name, withExtension: ext)
            ?? Bundle.main.url(forResource: name, withExtension: ext, subdirectory: "Notes")
            ?? Bundle.main.url(forResource: name, withExtension: ext, subdirectory: "Resources/Notes")
    }
}
