import SwiftUI

// «Where does your boss work?»: чотири пульсуючі слова-блоки й формула.
struct ArtQuestions: View {
    var body: some View {
        ZStack {
            qblk(20, 78, "Where", Theme.accent, delay: 0)
            qblk(104, 72, "does", Theme.c2, delay: 0.8)
            qblk(182, 112, "your boss", Theme.c3, delay: 1.6)
            qblk(300, 76, "work?", Theme.c4, delay: 0)
            ArtText("(Wh) + do / does / is / are + S + V?", x: 200, y: 186)
            ArtText("What · Where · When · Who · Why · How often", x: 200, y: 206, size: 11)
            ArtEmoji("❓", x: 40, y: 66, size: 32).floaty()
            ArtEmoji("🤔", x: 184, y: 64, size: 30).floaty(delay: 1.3)
            ArtEmoji("💬", x: 326, y: 66, size: 32).floaty(delay: 2.6)
        }
    }

    private func qblk(_ x: CGFloat, _ w: CGFloat, _ label: String, _ color: Color, delay: Double) -> some View {
        ArtBox(x: x, y: 96, w: w, h: 50, r: 14, fill: color,
               labels: [ArtLabel(text: label, y: 128, size: 17)], pulseDelay: delay)
    }
}
