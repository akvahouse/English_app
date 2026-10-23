import SwiftUI

// «Мої помилки»: речення з помилкою → стрілка → виправлене речення.
struct ArtMistakes: View {
    var body: some View {
        ZStack {
            ArtBox(x: 40, y: 36, w: 320, h: 46, r: 16, fill: Theme.c4,
                   labels: [ArtLabel(text: "I responsible for effects", y: 66, size: 18)], pulseDelay: 0)
            // text-anchor="middle": центр емодзі в x = 200
            ArtEmoji("⬇️", x: 200 - 26 * ArtMetrics.emojiHalfWidth, y: 112, size: 26).floaty(delay: 1.3)
            ArtBox(x: 40, y: 124, w: 320, h: 46, r: 16, fill: Theme.c3,
                   labels: [ArtLabel(text: "I am responsible for effects", y: 154, size: 18)], pulseDelay: 0.8)
            ArtText("be + прикметник · do + дієслово · the right word", x: 200, y: 198, size: 11)
            ArtEmoji("🔍", x: 28, y: 62, size: 26).floaty()
            ArtEmoji("🔊", x: 344, y: 196, size: 26).floaty(delay: 2.6)
        }
    }
}
