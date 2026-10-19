import SwiftUI

/// Капсула «🔥 серія: N» (.streak на сайті); від 4 — `hot`.
struct StreakBadge: View {
    var streak: Int

    private var hot: Bool { streak >= 4 }

    var body: some View {
        Text("🔥 серія: \(streak)")
            .font(.footnote.weight(.bold))
            .foregroundStyle(hot ? Theme.streakHotFg : Theme.streakFg)
            .padding(.horizontal, 10)
            .padding(.vertical, 2)
            .background(hot ? Theme.streakHotBg : Theme.streakBg, in: Capsule())
            .animation(Motion.ease(0.2), value: hot)
            .popIn()
    }
}
