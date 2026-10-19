import SwiftUI

// «Співбесіда»: двоє за столом, репліка, таймлайн, годинник із рухомою стрілкою.
struct ArtTrial: View {
    var body: some View {
        ZStack {
            ArtRect(52, 176, 296, 14, r: 7, fill: ArtColor.desk)
            ArtPerson(cx: 132, color: Theme.accent, glasses: false)
            ArtPerson(cx: 268, color: Theme.c3, glasses: true)
            // float
            ArtBubble(x: 164, y: 34, w: 124, h: 36, r: 16,
                      tail: [CGPoint(x: 230, y: 70), CGPoint(x: 238, y: 80), CGPoint(x: 242, y: 70)],
                      text: "Tell me about…", textX: 226, textY: 57)
                .floaty()
            // float d2
            ZStack {
                ArtCardRect(30, 40, 112, 32, r: 14)
                ArtText("Past · Present · Future", x: 86, y: 61, size: 11)
            }
            .floaty(delay: 1.3)
            clock
            ArtRect(186, 164, 28, 12, r: 3, fill: Theme.ink)
        }
    }

    /// translate(350 62): циферблат r24, хвилинна стрілка (8 с), годинна, центр.
    private var clock: some View {
        ZStack {
            ArtCircle(350, 62, 24, fill: Theme.card, stroke: Theme.line)
            ArtHand(cx: 350, cy: 62, length: 15, width: 3, color: Theme.ink, duration: 8)
            ArtLine(350, 62, 360, 62, width: 3)
            ArtCircle(350, 62, 3, fill: Theme.ink)
        }
    }
}
