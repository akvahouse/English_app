import SwiftUI

// «Chunk: is tired of cooking»: чотири пульсуючі блоки зі сполучними рисками.
struct ArtChunks: View {
    var body: some View {
        ZStack {
            blocks
            ArtPathView(joints, stroke: Theme.ink, lineWidth: 3, cap: .round)
            ArtText("be + adjective + preposition + -ing", x: 200, y: 176)
            ArtText("She is always responsible for cooking", x: 200, y: 198, size: 11)
            ArtEmoji("🍎", x: 44, y: 64, size: 30).floaty()
            ArtEmoji("🧩", x: 190, y: 62, size: 28).floaty(delay: 1.3)
            ArtEmoji("🎮", x: 330, y: 66, size: 30).floaty(delay: 2.6)
        }
    }

    private var blocks: some View {
        ZStack {
            blk(30, 64, "is", Theme.accent, delay: 0)
            blk(100, 108, "tired", Theme.c2, delay: 0.8)
            blk(214, 56, "of", Theme.c3, delay: 1.6)
            blk(276, 96, "cooking", Theme.c4, delay: 0)
        }
    }

    private func blk(_ x: CGFloat, _ w: CGFloat, _ label: String, _ color: Color, delay: Double) -> some View {
        ArtBox(x: x, y: 92, w: w, h: 52, r: 14, fill: color,
               labels: [ArtLabel(text: label, y: 125, size: 18)], pulseDelay: delay)
    }

    /// M94 118h6M208 118h6M270 118h6
    private var joints: Path {
        Path { p in
            for x in [94.0, 208.0, 270.0] {
                p.move(to: CGPoint(x: x, y: 118))
                p.addLine(to: CGPoint(x: x + 6, y: 118))
            }
        }
    }
}
