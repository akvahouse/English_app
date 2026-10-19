import Foundation
import Observation

/// Неправильна відповідь для підсумкового екрана («Помилки»).
struct WrongAnswer: Identifiable {
    let id = UUID()
    var question: Question
    var userAnswer: String
    var correctText: String
    var why: String?
    var wrongWhy: String?
}

/// Відгук після відповіді (дані для FeedbackCard).
struct QuizFeedback {
    var ok: Bool
    var userAnswer: String
    var correctText: String
    var wrongWhy: String?
    var why: String?
}

/// Логіка тесту — `quiz()`/`show()`/`finish()` із web/js/app.js.
@Observable
final class QuizEngine {
    let lesson: Lesson
    let version: QuizVersion
    let questions: [Question]

    private(set) var index = 0
    private(set) var score = 0
    private(set) var streak = 0
    private(set) var wrong: [WrongAnswer] = []
    private(set) var answered = false
    private(set) var finished = false
    private(set) var feedback: QuizFeedback?

    private let progress: ProgressStore
    private var recorded = false

    init(lesson: Lesson, progress: ProgressStore) {
        self.lesson = lesson
        self.progress = progress
        let version = progress.pickVersion(for: lesson)
        self.version = version
        self.questions = version.questions.shuffledCopy().map(Self.shuffleOptions)
        if questions.isEmpty { finished = true }
    }

    var current: Question { questions[min(index, questions.count - 1)] }
    var isLast: Bool { index >= questions.count - 1 }
    var total: Int { questions.count }

    /// Відсоток правильних відповідей (Math.round на сайті).
    var percent: Int { total == 0 ? 0 : Int((Double(score) / Double(total) * 100).rounded()) }

    /// Частка вже пройдених питань: на сайті смуга на i-му питанні (з 0) анімується до i/n.
    var progressFraction: Double { total == 0 ? 0 : Double(index) / Double(total) }

    var versionLabel: String { "Варіант \(version.n) з \(lesson.versions.count)" }

    /// Реєструє відповідь на поточне питання (повторні виклики ігноруються).
    func finish(ok: Bool, userAnswer: String, correctText: String, wrongWhy: String?) {
        guard !answered, !finished else { return }
        answered = true
        let why = Self.nonEmpty(current.why)
        let reason = Self.nonEmpty(wrongWhy)
        streak = ok ? streak + 1 : 0
        if ok {
            score += 1
            Haptics.success()
        } else {
            wrong.append(WrongAnswer(question: current, userAnswer: userAnswer, correctText: correctText, why: why, wrongWhy: reason))
            Haptics.error()
        }
        feedback = QuizFeedback(ok: ok, userAnswer: userAnswer, correctText: correctText, wrongWhy: reason, why: why)
    }

    /// Наступне питання або завершення тесту (із записом результату в прогрес).
    func next() {
        guard answered, !finished else { return }
        if index + 1 < questions.count {
            index += 1
            answered = false
            feedback = nil
        } else {
            finished = true
            if !recorded {
                recorded = true
                progress.record(lessonId: lesson.id, score: score, total: total)
            }
        }
    }

    // MARK: - helpers

    private static func nonEmpty(_ s: String?) -> String? {
        guard let s, !s.isEmpty else { return nil }
        return s
    }

    /// shuffleOptions із сайту: перемішує варіанти mc/pic разом із поясненнями `no` і перераховує `answer`.
    private static func shuffleOptions(_ question: Question) -> Question {
        switch question {
        case .mc(let q, let options, let answer, let why, let no):
            let idx = Array(options.indices).shuffledCopy()
            return .mc(q: q,
                       options: idx.map { options[$0] },
                       answer: idx.firstIndex(of: answer) ?? answer,
                       why: why,
                       no: no.map { arr in idx.map { k -> String? in k < arr.count ? arr[k] : nil } })
        case .pic(let q, let options, let answer, let why, let no):
            let idx = Array(options.indices).shuffledCopy()
            return .pic(q: q,
                        options: idx.map { options[$0] },
                        answer: idx.firstIndex(of: answer) ?? answer,
                        why: why,
                        no: no.map { arr in idx.map { k -> String? in k < arr.count ? arr[k] : nil } })
        default:
            return question
        }
    }
}
