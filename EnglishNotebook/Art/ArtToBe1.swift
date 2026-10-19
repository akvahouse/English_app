import SwiftUI

// «Баланс роботи та вільного часу»: терези гойдаються ±7° за 5 с навколо (200, 150).
struct ArtToBe1: View {
    var body: some View {
        ZStack {
            ArtPathView(fulcrum, fill: Theme.accent)
            ArtLayer {
                ArtRect(54, 144, 292, 12, r: 6, fill: ArtColor.desk)
                ArtRect(86, 108, 52, 36, r: 7, fill: Theme.c2)
                ArtPathView(handle, stroke: Theme.ink, lineWidth: 4)
                ArtRect(86, 122, 52, 4, fill: Theme.accentSoft)
                ArtPathView(heart, fill: Theme.c4)
                ArtText("work", x: 112, y: 176, size: 11)
                ArtText("free time", x: 300, y: 176, size: 11)
            }
            .sway(degrees: 7, duration: 5, anchor: UnitPoint(x: 200.0 / 400.0, y: 150.0 / 240.0))
            ArtEmoji("💪", x: 64, y: 70, size: 30).floaty()
            ArtEmoji("😊", x: 318, y: 64, size: 30).floaty(delay: 1.3)
            ArtEmoji("⚖️", x: 190, y: 64, size: 26).floaty(delay: 2.6)
        }
    }

    /// M200 156 L170 210 h60 z
    private var fulcrum: Path {
        Path { p in
            p.move(to: CGPoint(x: 200, y: 156))
            p.addLine(to: CGPoint(x: 170, y: 210))
            p.addLine(to: CGPoint(x: 230, y: 210))
            p.closeSubpath()
        }
    }

    /// Ручка сумки: M101 108 v-7 a7 7 0 0 1 7-7 h14 a7 7 0 0 1 7 7 v7
    private var handle: Path {
        Path { p in
            p.move(to: CGPoint(x: 101, y: 108))
            p.addLine(to: CGPoint(x: 101, y: 101))
            p.addCurve(to: CGPoint(x: 108, y: 94), control1: CGPoint(x: 101, y: 97.1), control2: CGPoint(x: 104.1, y: 94))
            p.addLine(to: CGPoint(x: 122, y: 94))
            p.addCurve(to: CGPoint(x: 129, y: 101), control1: CGPoint(x: 125.9, y: 94), control2: CGPoint(x: 129, y: 97.1))
            p.addLine(to: CGPoint(x: 129, y: 108))
        }
    }

    /// translate(300 126): M0 14C-26-4-14-24 0-10 14-24 26-4 0 14z
    private var heart: Path {
        Path { p in
            p.move(to: CGPoint(x: 300, y: 140))
            p.addCurve(to: CGPoint(x: 300, y: 116), control1: CGPoint(x: 274, y: 122), control2: CGPoint(x: 286, y: 102))
            p.addCurve(to: CGPoint(x: 300, y: 140), control1: CGPoint(x: 314, y: 102), control2: CGPoint(x: 326, y: 122))
            p.closeSubpath()
        }
    }
}
