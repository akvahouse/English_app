import SwiftUI
import UIKit

// Примітиви ілюстрацій. Усі координати — у просторі SVG 400×240 (як web/js/art.js),
// кожен елемент сам ставиться через .position, тож їх просто кладуть у ZStack.

enum ArtMetrics {
    /// Центр рядка тексту лежить на ~0.36 em вище за SVG-базову лінію.
    static let baselineShift: CGFloat = 0.36
    /// Емодзі в SVG `<text x>` вирівняне по лівому краю; ширина гліфа ≈ 1.2 em.
    static let emojiHalfWidth: CGFloat = 0.6
}

enum ArtColor {
    /// `.s-desk`: ink, змішаний 55% з card (color-mix), динамічно для світлої/темної теми.
    static let desk = Color(uiColor: UIColor { tc in
        let ink = ArtColor.rgb(UIColor(Theme.ink), tc)
        let card = ArtColor.rgb(UIColor(Theme.card), tc)
        return UIColor(red: ink.0 * 0.55 + card.0 * 0.45,
                       green: ink.1 * 0.55 + card.1 * 0.45,
                       blue: ink.2 * 0.55 + card.2 * 0.45,
                       alpha: 1)
    })

    private static func rgb(_ color: UIColor, _ tc: UITraitCollection) -> (CGFloat, CGFloat, CGFloat) {
        var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
        color.resolvedColor(with: tc).getRed(&r, green: &g, blue: &b, alpha: &a)
        return (r, g, b)
    }
}

/// Група елементів у просторі 400×240 (для спільної анімації: floaty, sway).
struct ArtLayer<Content: View>: View {
    @ViewBuilder var content: () -> Content
    var body: some View {
        ZStack { content() }.frame(width: 400, height: 240)
    }
}

/// `<rect x y width height rx>`.
struct ArtRect: View {
    var x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, r: CGFloat
    var fill: Color
    init(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat, r: CGFloat = 0, fill: Color) {
        self.x = x; self.y = y; self.w = w; self.h = h; self.r = r; self.fill = fill
    }
    var body: some View {
        RoundedRectangle(cornerRadius: r).fill(fill)
            .frame(width: w, height: h)
            .position(x: x + w / 2, y: y + h / 2)
    }
}

/// `.s-card` прямокутник: заливка card + контур line 1.5.
struct ArtCardRect: View {
    var x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, r: CGFloat
    init(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat, r: CGFloat = 0) {
        self.x = x; self.y = y; self.w = w; self.h = h; self.r = r
    }
    var body: some View {
        RoundedRectangle(cornerRadius: r).fill(Theme.card)
            .overlay(RoundedRectangle(cornerRadius: r).stroke(Theme.line, lineWidth: 1.5))
            .frame(width: w, height: h)
            .position(x: x + w / 2, y: y + h / 2)
    }
}

/// `<circle cx cy r>` із необов'язковим контуром.
struct ArtCircle: View {
    var cx: CGFloat, cy: CGFloat, r: CGFloat
    var fill: Color
    var stroke: Color?
    var lineWidth: CGFloat
    init(_ cx: CGFloat, _ cy: CGFloat, _ r: CGFloat, fill: Color, stroke: Color? = nil, lineWidth: CGFloat = 1.5) {
        self.cx = cx; self.cy = cy; self.r = r; self.fill = fill; self.stroke = stroke; self.lineWidth = lineWidth
    }
    var body: some View {
        Circle().fill(fill)
            .overlay { if let stroke { Circle().stroke(stroke, lineWidth: lineWidth) } }
            .frame(width: r * 2, height: r * 2)
            .position(x: cx, y: cy)
    }
}

/// Коло без заливки (окуляри).
struct ArtRing: View {
    var cx: CGFloat, cy: CGFloat, r: CGFloat
    var color: Color
    var lineWidth: CGFloat
    init(_ cx: CGFloat, _ cy: CGFloat, _ r: CGFloat, color: Color, lineWidth: CGFloat) {
        self.cx = cx; self.cy = cy; self.r = r; self.color = color; self.lineWidth = lineWidth
    }
    var body: some View {
        Circle().stroke(color, lineWidth: lineWidth)
            .frame(width: r * 2, height: r * 2)
            .position(x: cx, y: cy)
    }
}

/// `<line>` із круглими кінцями.
struct ArtLine: View {
    var x1: CGFloat, y1: CGFloat, x2: CGFloat, y2: CGFloat
    var color: Color
    var width: CGFloat
    init(_ x1: CGFloat, _ y1: CGFloat, _ x2: CGFloat, _ y2: CGFloat, color: Color = Theme.ink, width: CGFloat) {
        self.x1 = x1; self.y1 = y1; self.x2 = x2; self.y2 = y2; self.color = color; self.width = width
    }
    var body: some View {
        Path { p in
            p.move(to: CGPoint(x: x1, y: y1))
            p.addLine(to: CGPoint(x: x2, y: y2))
        }
        .stroke(color, style: StrokeStyle(lineWidth: width, lineCap: .round))
    }
}

/// `<path>` в абсолютних координатах 400×240: заливка і/або контур.
struct ArtPathView: View {
    var path: Path
    var fill: Color?
    var stroke: Color?
    var lineWidth: CGFloat
    var cap: CGLineCap
    init(_ path: Path, fill: Color? = nil, stroke: Color? = nil, lineWidth: CGFloat = 1.5, cap: CGLineCap = .butt) {
        self.path = path; self.fill = fill; self.stroke = stroke; self.lineWidth = lineWidth; self.cap = cap
    }
    var body: some View {
        ZStack {
            if let fill { path.fill(fill) }
            if let stroke { path.stroke(stroke, style: StrokeStyle(lineWidth: lineWidth, lineCap: cap)) }
        }
    }
}

/// `<text text-anchor="middle">`: x — центр, y — базова лінія.
struct ArtText: View {
    var text: String
    var x: CGFloat, y: CGFloat
    var size: CGFloat
    var color: Color
    init(_ text: String, x: CGFloat, y: CGFloat, size: CGFloat = 13, color: Color = Theme.ink) {
        self.text = text; self.x = x; self.y = y; self.size = size; self.color = color
    }
    var body: some View {
        Text(text)
            .font(.system(size: size, weight: .bold))
            .foregroundStyle(color)
            .lineLimit(1)
            .fixedSize()
            .position(x: x, y: y - size * ArtMetrics.baselineShift)
    }
}

/// `<text x y font-size>` з емодзі: x — лівий край, y — базова лінія.
struct ArtEmoji: View {
    var emoji: String
    var x: CGFloat, y: CGFloat
    var size: CGFloat
    init(_ emoji: String, x: CGFloat, y: CGFloat, size: CGFloat) {
        self.emoji = emoji; self.x = x; self.y = y; self.size = size
    }
    var body: some View {
        Text(emoji)
            .font(.system(size: size))
            .fixedSize()
            .position(x: x + size * ArtMetrics.emojiHalfWidth, y: y - size * ArtMetrics.baselineShift)
    }
}

/// Підпис усередині блоку: `y` — абсолютна базова лінія в SVG.
struct ArtLabel {
    var text: String
    var y: CGFloat
    var size: CGFloat = 13
}

/// Блок із підписами (pill / blk / qblk / картки відповідей) — одна SVG-група,
/// що пульсує навколо власного центру (`transform-box: fill-box`).
struct ArtBox: View {
    var x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, r: CGFloat
    var fill: Color
    var labels: [ArtLabel]
    var textColor: Color = .white
    /// true — стиль `.s-card` (заливка card + контур line).
    var card = false
    /// nil — без пульсації; інакше затримка (d1 = 0, d2 = 0.8, d3 = 1.6).
    var pulseDelay: Double? = nil

    var body: some View {
        ZStack {
            shape
            ForEach(labels.indices, id: \.self) { i in
                Text(labels[i].text)
                    .font(.system(size: labels[i].size, weight: .bold))
                    .foregroundStyle(textColor)
                    .lineLimit(1)
                    .fixedSize()
                    .position(x: w / 2, y: labels[i].y - y - labels[i].size * ArtMetrics.baselineShift)
            }
        }
        .frame(width: w, height: h)
        .pulse(delay: pulseDelay ?? 0, active: pulseDelay != nil)
        .position(x: x + w / 2, y: y + h / 2)
    }

    @ViewBuilder private var shape: some View {
        if card {
            RoundedRectangle(cornerRadius: r).fill(Theme.card)
                .overlay(RoundedRectangle(cornerRadius: r).stroke(Theme.line, lineWidth: 1.5))
        } else {
            RoundedRectangle(cornerRadius: r).fill(fill)
        }
    }
}

/// Хмарка-репліка: картка + трикутний «хвіст» + текст.
struct ArtBubble: View {
    var x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, r: CGFloat
    var tail: [CGPoint]
    var text: String
    var textX: CGFloat, textY: CGFloat
    var size: CGFloat = 13

    var body: some View {
        ZStack {
            ArtCardRect(x, y, w, h, r: r)
            ArtPathView(tailPath, fill: Theme.card, stroke: Theme.line)
            ArtText(text, x: textX, y: textY, size: size)
        }
    }

    private var tailPath: Path {
        Path { p in
            p.move(to: tail[0])
            p.addLine(to: tail[1])
            p.addLine(to: tail[2])
            p.closeSubpath()
        }
    }
}

/// Стрілка, що обертається навколо точки (cx, cy) (`animateTransform rotate 0→360`).
struct ArtHand: View {
    var cx: CGFloat, cy: CGFloat, length: CGFloat, width: CGFloat
    var color: Color
    var duration: Double

    var body: some View {
        // Кадр 2L×2L із центром у (cx, cy): його центр і є вісь обертання.
        Path { p in
            p.move(to: CGPoint(x: length, y: length))
            p.addLine(to: CGPoint(x: length, y: 0))
        }
        .stroke(color, style: StrokeStyle(lineWidth: width, lineCap: .round))
        .frame(width: length * 2, height: length * 2)
        .spin(duration: duration)
        .position(x: cx, y: cy)
    }
}

/// Пунктир, що «біжить» (`animate stroke-dashoffset`). `travel` — зсув за `duration`, px.
struct ArtMarch: View {
    var path: Path
    var color: Color
    var width: CGFloat
    var dash: [CGFloat]
    var travel: CGFloat
    var duration: Double
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    init(path: Path, color: Color, width: CGFloat, dash: [CGFloat], travel: CGFloat, duration: Double) {
        self.path = path; self.color = color; self.width = width
        self.dash = dash; self.travel = travel; self.duration = duration
    }

    var body: some View {
        TimelineView(.animation(minimumInterval: nil, paused: reduceMotion)) { ctx in
            let frac = CGFloat((ctx.date.timeIntervalSinceReferenceDate / duration).truncatingRemainder(dividingBy: 1))
            let period = dash.reduce(0, +)
            let shift = (travel * frac).truncatingRemainder(dividingBy: period)
            path.stroke(color, style: StrokeStyle(lineWidth: width, lineCap: .round, dash: dash,
                                                  dashPhase: reduceMotion ? 0 : period - shift))
        }
    }
}
