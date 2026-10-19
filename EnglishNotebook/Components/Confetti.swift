import SwiftUI

/// Конфеті (`confetti()` в interactive.js): 140 частинок, гравітація 0.35, 150 кадрів при 60 кадрах/с.
/// Сам не зникає — батьківський вью прибирає його приблизно через 2.5 с.
struct ConfettiView: View {
    private struct Particle {
        var dx: Double      // зсув старту від центру по X
        var vx: Double
        var vy: Double
        var size: Double
        var r0: Double
        var vr: Double
        var color: Color
    }

    private static let colors: [Color] = ([0x4f46e5, 0xf59e0b, 0x10b981, 0xec4899, 0x38bdf8] as [UInt32]).map { Color(hex: $0) }
    private static let frames = 150.0
    private static let stepsPerSecond = 60.0

    @State private var particles: [Particle] = ConfettiView.makeParticles()
    @State private var start = Date()

    private static func makeParticles() -> [Particle] {
        (0..<140).map { _ in
            Particle(dx: (Double.random(in: 0..<1) - 0.5) * 200,
                     vx: (Double.random(in: 0..<1) - 0.5) * 14,
                     vy: -Double.random(in: 0..<1) * 13 - 3,
                     size: 6 + Double.random(in: 0..<1) * 7,
                     r0: Double.random(in: 0..<1) * 6,
                     vr: (Double.random(in: 0..<1) - 0.5) * 0.3,
                     color: colors.randomElement() ?? .white)
        }
    }

    var body: some View {
        TimelineView(.animation) { timeline in
            let n = max(timeline.date.timeIntervalSince(start), 0) * Self.stepsPerSecond
            Canvas { ctx, size in
                guard n < Self.frames else { return }
                for p in particles {
                    // Замкнена форма циклу: vy += .35; x += vx; y += vy; r += vr (n кроків).
                    let x = size.width / 2 + p.dx + n * p.vx
                    let y = size.height * 0.35 + n * p.vy + 0.35 * n * (n + 1) / 2
                    let r = p.r0 + n * p.vr
                    var c = ctx
                    c.translateBy(x: x, y: y)
                    c.rotate(by: .radians(r))
                    let rect = CGRect(x: -p.size / 2, y: -p.size / 3, width: p.size, height: p.size * 0.6)
                    c.fill(Path(rect), with: .color(p.color))
                }
            }
        }
        .allowsHitTesting(false)
        .ignoresSafeArea()
        .accessibilityHidden(true)
        .onAppear { start = Date() }
    }
}
