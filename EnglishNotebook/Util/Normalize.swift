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
}
