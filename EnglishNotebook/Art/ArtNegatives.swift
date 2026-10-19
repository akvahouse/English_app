import SwiftUI

// «Yes / No: короткі відповіді»: питання-хмарка й дві пульсуючі відповіді.
struct ArtNegatives: View {
    var body: some View {
        ZStack {
            ArtBubble(x: 96, y: 30, w: 208, h: 46, r: 20,
                      tail: [CGPoint(x: 190, y: 76), CGPoint(x: 200, y: 88), CGPoint(x: 208, y: 76)],
                      text: "Does she write posts?", textX: 200, textY: 59, size: 16)
                .floaty()
            ArtBox(x: 36, y: 112, w: 148, h: 54, r: 18, fill: Theme.c3,
                   labels: [ArtLabel(text: "Yes, she does.", y: 146, size: 16)], pulseDelay: 0)
            ArtBox(x: 216, y: 112, w: 148, h: 54, r: 18, fill: Theme.c4,
                   labels: [ArtLabel(text: "No, she doesn't.", y: 146, size: 16)], pulseDelay: 0.8)
            ArtText("The first word of the question = the last word of the answer", x: 200, y: 196, size: 11)
            ArtEmoji("🦊", x: 50, y: 72, size: 28).floaty(delay: 1.3)
            ArtEmoji("✋", x: 326, y: 74, size: 26).floaty(delay: 2.6)
        }
    }
}
