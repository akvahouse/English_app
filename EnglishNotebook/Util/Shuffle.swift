import Foundation

extension Array {
    /// Копія з випадковим порядком елементів (shuffle сайту — Фішер–Єтс).
    func shuffledCopy() -> [Element] {
        var copy = self
        guard copy.count > 1 else { return copy }
        for i in stride(from: copy.count - 1, to: 0, by: -1) {
            copy.swapAt(i, Int.random(in: 0...i))
        }
        return copy
    }
}
