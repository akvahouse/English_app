import SwiftUI

// Анімації сайту (css/fun.css) → SwiftUI.
// Easing сайту: cubic-bezier(.2,.7,.2,1).

enum Motion {
    static func ease(_ duration: Double) -> Animation {
        .timingCurve(0.2, 0.7, 0.2, 1, duration: duration)
    }
}

/// Поява блоку знизу зі зсувом 20pt (keyframes rise), затримка 60 мс × індекс.
struct RiseIn: ViewModifier {
    var index: Int = 0
    var delay: Double = 0
    var duration: Double = 0.55
    var step: Double = 0.06
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var shown = false

    func body(content: Content) -> some View {
        content
            .opacity(shown || reduceMotion ? 1 : 0)
            .offset(y: shown || reduceMotion ? 0 : 20)
            .onAppear {
                guard !shown else { return }
                if reduceMotion { shown = true; return }
                withAnimation(Motion.ease(duration).delay(delay + Double(index) * step)) { shown = true }
            }
    }
}

/// Поява зі збільшенням (keyframes popin: scale .9 → 1.04 → 1).
struct PopIn: ViewModifier {
    var delay: Double = 0
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var phase = 0

    func body(content: Content) -> some View {
        content
            .scaleEffect(reduceMotion ? 1 : (phase == 0 ? 0.9 : phase == 1 ? 1.04 : 1))
            .opacity(reduceMotion || phase > 0 ? 1 : 0)
            .onAppear {
                guard phase == 0, !reduceMotion else { return }
                withAnimation(Motion.ease(0.21).delay(delay)) { phase = 1 }
                withAnimation(Motion.ease(0.14).delay(delay + 0.21)) { phase = 2 }
            }
    }
}

/// Трясіння по горизонталі (keyframes shake). Запускається зміною `trigger`.
struct Shake: ViewModifier, Animatable {
    var trigger: Int
    var animatableData: CGFloat
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    init(trigger: Int) {
        self.trigger = trigger
        self.animatableData = CGFloat(trigger)
    }

    func body(content: Content) -> some View {
        content.offset(x: reduceMotion ? 0 : sin(animatableData * .pi * 4) * 7)
    }
}

/// Збільшення й повернення (keyframes pop: 1 → 1.08 → 1). Запускається зміною `trigger`.
struct Pop: ViewModifier, Animatable {
    var trigger: Int
    var animatableData: CGFloat
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    init(trigger: Int) {
        self.trigger = trigger
        self.animatableData = CGFloat(trigger)
    }

    func body(content: Content) -> some View {
        content.scaleEffect(reduceMotion ? 1 : 1 + sin(animatableData * .pi) * 0.08)
    }
}

/// Плавне «плавання» вгору-вниз (keyframes floaty: y 0 → −8 → 0, 4 с, нескінченно).
struct Floaty: ViewModifier {
    var amplitude: CGFloat = 8
    var duration: Double = 4
    var delay: Double = 0
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var up = false

    func body(content: Content) -> some View {
        content
            .offset(y: up && !reduceMotion ? -amplitude : 0)
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(.easeInOut(duration: duration / 2).delay(delay).repeatForever(autoreverses: true)) { up = true }
            }
    }
}

/// Пульсація масштабу (keyframes pulse: 1 → 1.07 → 1, 2.4 с, нескінченно).
struct Pulse: ViewModifier {
    var scale: CGFloat = 1.07
    var duration: Double = 2.4
    var delay: Double = 0
    var active = true
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var big = false

    func body(content: Content) -> some View {
        content
            .scaleEffect(big && active && !reduceMotion ? scale : 1)
            .onAppear { start() }
            .onChange(of: active) { _, _ in start() }
    }

    private func start() {
        guard active, !reduceMotion else { big = false; return }
        big = false
        withAnimation(.easeInOut(duration: duration / 2).delay(delay).repeatForever(autoreverses: true)) { big = true }
    }
}

/// Нескінченне обертання (SVG animateTransform rotate).
struct Spin: ViewModifier {
    var duration: Double = 8
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var angle: Double = 0

    func body(content: Content) -> some View {
        content
            .rotationEffect(.degrees(angle))
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(.linear(duration: duration).repeatForever(autoreverses: false)) { angle = 360 }
            }
    }
}

/// Гойдання навколо осі (SVG animateTransform rotate −a° … +a°).
struct Sway: ViewModifier {
    var degrees: Double = 7
    var duration: Double = 5
    var anchor: UnitPoint = .center
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var right = false

    func body(content: Content) -> some View {
        content
            .rotationEffect(.degrees(reduceMotion ? 0 : (right ? degrees : -degrees)), anchor: anchor)
            .onAppear {
                guard !reduceMotion else { return }
                withAnimation(.easeInOut(duration: duration / 2).repeatForever(autoreverses: true)) { right = true }
            }
    }
}

extension View {
    func riseIn(index: Int = 0, delay: Double = 0, duration: Double = 0.55, step: Double = 0.06) -> some View {
        modifier(RiseIn(index: index, delay: delay, duration: duration, step: step))
    }
    func popIn(delay: Double = 0) -> some View { modifier(PopIn(delay: delay)) }
    /// `trigger` збільшуйте на 1 всередині `withAnimation(.linear(duration: 0.45))`.
    func shake(trigger: Int) -> some View { modifier(Shake(trigger: trigger)) }
    /// `trigger` збільшуйте на 1 всередині `withAnimation(Motion.ease(0.45))`.
    func pop(trigger: Int) -> some View { modifier(Pop(trigger: trigger)) }
    func floaty(amplitude: CGFloat = 8, duration: Double = 4, delay: Double = 0) -> some View {
        modifier(Floaty(amplitude: amplitude, duration: duration, delay: delay))
    }
    func pulse(scale: CGFloat = 1.07, duration: Double = 2.4, delay: Double = 0, active: Bool = true) -> some View {
        modifier(Pulse(scale: scale, duration: duration, delay: delay, active: active))
    }
    func spin(duration: Double = 8) -> some View { modifier(Spin(duration: duration)) }
    func sway(degrees: Double = 7, duration: Double = 5, anchor: UnitPoint = .center) -> some View {
        modifier(Sway(degrees: degrees, duration: duration, anchor: anchor))
    }
}
