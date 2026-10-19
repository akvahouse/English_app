import SwiftUI

// «want to do»: три пульсуючі «пігулки», пунктир, що біжить, і емодзі.
struct ArtToBe2: View {
    var body: some View {
        ZStack {
            pill(34, "want", Theme.accent, delay: 0)
            pill(152, "to", Theme.c2, delay: 0.8)
            pill(270, "do", Theme.c3, delay: 1.6)
            // M132 120h16M250 120h16, dasharray 2 6, dashoffset 0 → −16 за 1 с
            ArtMarch(path: dashes, color: Theme.ink, width: 3, dash: [2, 6], travel: 16, duration: 1)
            ArtText("need · plan · hope · decide · learn · try", x: 200, y: 190)
            ArtEmoji("🎯", x: 48, y: 64, size: 34).floaty()
            ArtEmoji("🚀", x: 316, y: 66, size: 34).floaty(delay: 1.3)
            ArtEmoji("💡", x: 184, y: 66, size: 30).floaty(delay: 2.6)
        }
    }

    private func pill(_ x: CGFloat, _ label: String, _ color: Color, delay: Double) -> some View {
        ArtBox(x: x, y: 98, w: 96, h: 44, r: 22, fill: color,
               labels: [ArtLabel(text: label, y: 126, size: 18)], pulseDelay: delay)
    }

    private var dashes: Path {
        Path { p in
            p.move(to: CGPoint(x: 132, y: 120)); p.addLine(to: CGPoint(x: 148, y: 120))
            p.move(to: CGPoint(x: 250, y: 120)); p.addLine(to: CGPoint(x: 266, y: 120))
        }
    }
}
