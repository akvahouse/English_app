import Foundation
import Observation

/// Найкращий результат тесту з уроку (як `english_progress_v1` на сайті).
/// `attempts` і `last` з'явилися пізніше: у старих записах їх немає, тому вони опціональні.
struct LessonResult: Codable, Equatable {
    var best: Int
    var total: Int
    var date: Date
    var attempts: Int?
    var last: Int?

    var percent: Int { total == 0 ? 0 : Int((Double(best) / Double(total) * 100).rounded()) }
    var attemptCount: Int { attempts ?? 1 }
}

/// Прогрес користувача. Зберігається в UserDefaults у тих самих ключах і з тією самою семантикою, що й сайт.
@Observable
final class ProgressStore {
    static let resultsKey = "english_progress_v1"
    static let lastVariantKey = "english_last_variant_v1"

    private(set) var results: [String: LessonResult]
    private(set) var lastVariant: [String: Int]   // lessonId → індекс версії (0-based), що була минулого разу

    private let defaults: UserDefaults

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        results = Self.read([String: LessonResult].self, key: Self.resultsKey, from: defaults) ?? [:]
        lastVariant = Self.read([String: Int].self, key: Self.lastVariantKey, from: defaults) ?? [:]
    }

    func result(for lessonId: String) -> LessonResult? { results[lessonId] }

    var doneCount: Int { results.count }

    /// Найкращий результат оновлюється, лише якщо новий не гірший (score/total >= best/total);
    /// лічильник спроб і останній бал оновлюються завжди.
    func record(lessonId: String, score: Int, total: Int) {
        let prev = results[lessonId]
        let attempts = (prev?.attemptCount ?? 0) + 1
        if let prev, total > 0, prev.total > 0,
           Double(score) / Double(total) < Double(prev.best) / Double(prev.total) {
            results[lessonId] = LessonResult(best: prev.best, total: prev.total, date: prev.date, attempts: attempts, last: score)
        } else {
            results[lessonId] = LessonResult(best: score, total: total, date: Date(), attempts: attempts, last: score)
        }
        write(results, key: Self.resultsKey)
    }

    /// Сумарно найкращих правильних відповідей і завдань у пройдених тестах.
    var totalBest: Int { results.values.reduce(0) { $0 + $1.best } }
    var totalAnswered: Int { results.values.reduce(0) { $0 + $1.total } }
    var totalAttempts: Int { results.values.reduce(0) { $0 + $1.attemptCount } }

    /// Загальний відсоток правильних відповідей за найкращими спробами.
    var overallPercent: Int {
        totalAnswered == 0 ? 0 : Int((Double(totalBest) / Double(totalAnswered) * 100).rounded())
    }

    /// Випадкова версія тесту, але не та, що була минулого разу.
    func pickVersion(for lesson: Lesson) -> QuizVersion {
        let last = lastVariant[lesson.id]
        var pool = lesson.versions.indices.filter { $0 != last }
        if pool.isEmpty { pool = Array(lesson.versions.indices) }
        let k = pool.randomElement() ?? 0
        lastVariant[lesson.id] = k
        write(lastVariant, key: Self.lastVariantKey)
        return lesson.versions[k]
    }

    /// Скидання результатів (lastVariant не чіпаємо — як на сайті).
    func reset() {
        results = [:]
        defaults.removeObject(forKey: Self.resultsKey)
    }

    // MARK: - storage

    private static func read<T: Decodable>(_ type: T.Type, key: String, from defaults: UserDefaults) -> T? {
        guard let data = defaults.data(forKey: key) else { return nil }
        let dec = JSONDecoder()
        dec.dateDecodingStrategy = .iso8601
        return try? dec.decode(T.self, from: data)
    }

    private func write<T: Encodable>(_ value: T, key: String) {
        let enc = JSONEncoder()
        enc.dateEncodingStrategy = .iso8601
        if let data = try? enc.encode(value) { defaults.set(data, forKey: key) }
    }
}
