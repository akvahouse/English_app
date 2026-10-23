import SwiftUI

// «Картинки й звук»: три пульсуючі картки-емоції і динамік.
struct ArtVisual: View {
    var body: some View {
        ZStack {
            tile(40, "😩", Theme.accent, delay: 0)
            tile(152, "😨", Theme.c2, delay: 0.8)
            tile(264, "🏆", Theme.c3, delay: 1.6)
            ArtEmoji("🔊", x: 190 - 34 * ArtMetrics.emojiHalfWidth, y: 178, size: 34).floaty(delay: 1.3)
            ArtText("Listen · Look · Choose", x: 200, y: 206, size: 11)
        }
    }

    private func tile(_ x: CGFloat, _ emoji: String, _ color: Color, delay: Double) -> some View {
        ArtBox(x: x, y: 40, w: 96, h: 96, r: 22, fill: color,
               labels: [ArtLabel(text: emoji, y: 102, size: 48)], pulseDelay: delay)
    }
}
