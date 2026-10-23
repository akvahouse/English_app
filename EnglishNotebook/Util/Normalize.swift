import Foundation

extension String {
    /// Нормалізація відповіді, як `norm()` на сайті: trim, lowercase, ’‘ → ', стиснути пробіли.
    var normalizedAnswer: String {
        trimmingCharacters(in: .whitespacesAndNewlines)
            .lowercased()
            .replacingOccurrences(of: "’", with: "'")
            .replacingOccurrences(of: "‘", with: "'")
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
    }

    /// Для диктанту: як normalizedAnswer, але без розділових знаків (strip() на сайті).
    var dictationKey: String {
        normalizedAnswer
            .replacingOccurrences(of: "[.,!?;:]", with: "", options: .regularExpression)
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespaces)
    }
}
