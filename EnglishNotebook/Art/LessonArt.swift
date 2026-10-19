import SwiftUI

// Ілюстрації уроків (web/js/art.js → SwiftUI). Простір малювання — 400×240, як viewBox SVG.

/// Ілюстрація за id уроку; невідомий id → `trial`.
struct LessonArt: View {
    var lessonId: String

    var body: some View {
        switch lessonId {
        case "tobe1": ArtCanvas(label: "Баланс роботи та вільного часу") { ArtToBe1() }
        case "tobe2": ArtCanvas(label: "want to do") { ArtToBe2() }
        case "presimple": ArtCanvas(label: "Present Simple: звички й факти") { ArtPresimple() }
        case "chunks": ArtCanvas(label: "Chunk: is tired of cooking") { ArtChunks() }
        case "beordo": ArtCanvas(label: "BE or DO?") { ArtBeOrDo() }
        case "negatives": ArtCanvas(label: "Yes / No: короткі відповіді") { ArtNegatives() }
        case "questions": ArtCanvas(label: "Where does your boss work?") { ArtQuestions() }
        default: ArtCanvas(label: "Співбесіда") { ArtTrial() }
        }
    }
}

/// Спільний контейнер (`wrap` в art.js): пропорція 400:240, фон accentSoft, масштабування вмісту.
struct ArtCanvas<Content: View>: View {
    var label: String
    @ViewBuilder var content: () -> Content

    var body: some View {
        GeometryReader { geo in
            ZStack {
                // <rect x=8 y=14 width=384 height=212 rx=26>
                ArtRect(8, 14, 384, 212, r: 26, fill: Theme.accentSoft)
                content()
            }
            .frame(width: 400, height: 240)
            .scaleEffect(geo.size.width / 400, anchor: .topLeading)
            .frame(width: geo.size.width, height: geo.size.height, alignment: .topLeading)
            .accessibilityHidden(true)
        }
        .aspectRatio(400.0 / 240.0, contentMode: .fit)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(label)
        .accessibilityAddTraits(.isImage)
    }
}

/// Людина (`person()` в art.js): тіло, голова, волосся, очі, усмішка, окуляри.
struct ArtPerson: View {
    var cx: CGFloat
    var color: Color
    var glasses: Bool

    var body: some View {
        ZStack {
            ArtRect(cx - 28, 124, 56, 58, r: 20, fill: color)
            ArtCircle(cx, 98, 23, fill: Theme.skin)
            ArtPathView(hair, fill: Theme.hair)
            ArtCircle(cx - 8, 100, 2.4, fill: Theme.ink)
            ArtCircle(cx + 8, 100, 2.4, fill: Theme.ink)
            ArtPathView(smile, stroke: Theme.ink, lineWidth: 2, cap: .round)
            if glasses {
                ArtRing(cx - 8, 100, 6.5, color: Theme.ink, lineWidth: 1.6)
                ArtRing(cx + 8, 100, 6.5, color: Theme.ink, lineWidth: 1.6)
            }
        }
    }

    /// M cx-23 94 a23 23 0 0 1 46 0 c-11-9-33-12-46 0 z (півколо = 2 кубічні криві).
    private var hair: Path {
        Path { p in
            p.move(to: CGPoint(x: cx - 23, y: 94))
            p.addCurve(to: CGPoint(x: cx, y: 71),
                       control1: CGPoint(x: cx - 23, y: 81.3), control2: CGPoint(x: cx - 12.7, y: 71))
            p.addCurve(to: CGPoint(x: cx + 23, y: 94),
                       control1: CGPoint(x: cx + 12.7, y: 71), control2: CGPoint(x: cx + 23, y: 81.3))
            p.addCurve(to: CGPoint(x: cx - 23, y: 94),
                       control1: CGPoint(x: cx + 12, y: 85), control2: CGPoint(x: cx - 10, y: 82))
            p.closeSubpath()
        }
    }

    /// M cx-7 109 q7 6 14 0
    private var smile: Path {
        Path { p in
            p.move(to: CGPoint(x: cx - 7, y: 109))
            p.addQuadCurve(to: CGPoint(x: cx + 7, y: 109), control: CGPoint(x: cx, y: 115))
        }
    }
}
