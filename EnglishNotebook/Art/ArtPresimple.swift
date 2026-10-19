import SwiftUI

// «Present Simple: звички й факти»: годинник (стрілки 10 с / 120 с), тиждень, пунктир, що біжить.
struct ArtPresimple: View {
    private let days = Array("MTWTFSS").map { String($0) }

    var body: some View {
        ZStack {
            clock
            week
            ArtText("on Wednesdays and Fridays", x: 290, y: 76, size: 11)
            // M200 140h180, dasharray 8 10, dashoffset 0 → −36 за 1.6 с
            ArtMarch(path: line, color: Theme.accent, width: 3, dash: [8, 10], travel: 36, duration: 1.6)
            ArtText("always · usually · often · never", x: 290, y: 172)
            ArtEmoji("🔁", x: 40, y: 52, size: 26).floaty()
            ArtEmoji("📅", x: 330, y: 212, size: 22).floaty(delay: 1.3)
        }
    }

    private var clock: some View {
        ZStack {
            ArtCircle(110, 116, 62, fill: Theme.card, stroke: Theme.line)
            ForEach(0..<12, id: \.self) { i in
                let a = Double(i) * Double.pi / 6
                let s = CGFloat(sin(a))
                let c = CGFloat(cos(a))
                ArtLine(110 + 50 * s, 116 - 50 * c, 110 + 56 * s, 116 - 56 * c, width: 2.5)
            }
            ArtHand(cx: 110, cy: 116, length: 40, width: 3.5, color: Theme.ink, duration: 10)
            ArtHand(cx: 110, cy: 116, length: 24, width: 5, color: Theme.accent, duration: 120)
            ArtCircle(110, 116, 5, fill: Theme.c2)
        }
    }

    /// Дні тижня: середа й п'ятниця — жовті та пульсують (d1 / d2).
    private var week: some View {
        ForEach(0..<7, id: \.self) { i in
            let hot = i == 2 || i == 4
            ArtBox(x: CGFloat(214 + i * 27) - 12, y: 92, w: 24, h: 24, r: 12,
                   fill: hot ? Theme.c2 : Theme.card,
                   labels: [ArtLabel(text: days[i], y: 108.5, size: 11)],
                   textColor: hot ? .white : Theme.ink,
                   card: !hot,
                   pulseDelay: i == 2 ? 0 : (i == 4 ? 0.8 : nil))
        }
    }

    private var line: Path {
        Path { p in
            p.move(to: CGPoint(x: 200, y: 140))
            p.addLine(to: CGPoint(x: 380, y: 140))
        }
    }
}
