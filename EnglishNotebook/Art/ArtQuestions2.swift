import SwiftUI

// «Follow-up питання»: репліка-хмарка й три пульсуючі уточнювальні питання.
struct ArtQuestions2: View {
    var body: some View {
        ZStack {
            ArtBubble(x: 26, y: 40, w: 172, h: 52, r: 20,
                      tail: [CGPoint(x: 62, y: 92), CGPoint(x: 54, y: 110), CGPoint(x: 80, y: 92)],
                      text: "I never eat junk food.", textX: 112, textY: 71, size: 14)
                .floaty()
            ask(34, "Why?", Theme.accent, delay: 0)
            ask(82, "What exactly…?", Theme.c2, delay: 0.8)
            ask(130, "What about you?", Theme.c3, delay: 1.6)
            ArtText("Why · What exactly · How often · Which · How many", x: 200, y: 198, size: 11)
            ArtEmoji("🥗", x: 48, y: 150, size: 34).floaty(delay: 1.3)
            ArtEmoji("🤔", x: 116, y: 168, size: 32).floaty(delay: 2.6)
        }
    }

    private func ask(_ y: CGFloat, _ label: String, _ color: Color, delay: Double) -> some View {
        ArtBox(x: 216, y: y, w: 150, h: 38, r: 16, fill: color,
               labels: [ArtLabel(text: label, y: y + 25, size: 16)], pulseDelay: delay)
    }
}
