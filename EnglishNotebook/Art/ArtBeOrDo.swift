import SwiftUI

// «BE or DO?»: дві пульсуючі картки й плаваюче «?» посередині.
struct ArtBeOrDo: View {
    var body: some View {
        ZStack {
            ArtBox(x: 34, y: 70, w: 138, h: 104, r: 18, fill: Theme.accent,
                   labels: [ArtLabel(text: "BE", y: 108, size: 26),
                            ArtLabel(text: "is · are · am", y: 136, size: 12),
                            ArtLabel(text: "isn't · aren't", y: 156, size: 12)],
                   pulseDelay: 0)
            ArtBox(x: 228, y: 70, w: 138, h: 104, r: 18, fill: Theme.c3,
                   labels: [ArtLabel(text: "DO", y: 108, size: 26),
                            ArtLabel(text: "do · does", y: 136, size: 12),
                            ArtLabel(text: "don't · doesn't", y: 156, size: 12)],
                   pulseDelay: 0.8)
            // float d3
            ZStack {
                ArtCircle(200, 122, 22, fill: Theme.c2)
                ArtText("?", x: 200, y: 132, size: 28, color: .white)
            }
            .floaty(delay: 2.6)
            ArtText("She is tired · She doesn't want", x: 200, y: 202, size: 11)
            ArtEmoji("🏠", x: 48, y: 54, size: 26).floaty()
            ArtEmoji("🧽", x: 322, y: 52, size: 26).floaty(delay: 1.3)
        }
    }
}
