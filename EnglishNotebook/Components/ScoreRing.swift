import SwiftUI

/// Кільце результату (.ring на сайті): заливка 0 → частка за 1.4 с, лічильник 0 → % за 1.3 с (easeOut cubic).
struct ScoreRing: View {
    var percent: Int
    /// Напис під числом, напр. «8 з 10».
    var caption: String?

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var progress: Double = 0
    @State private var counter: Double = 0

    init(percent: Int, caption: String? = nil) {
        self.percent = percent
        self.caption = caption
    }

    private var color: Color {
        percent >= 90 ? Theme.c3 : percent < 50 ? Theme.c2 : Theme.accent
    }

    var body: some View {
        ZStack {
            Circle()
                .inset(by: 5)
                .stroke(Theme.line, lineWidth: 10)
            Circle()
                .inset(by: 5)
                .trim(from: 0, to: progress)
                .stroke(color, style: StrokeStyle(lineWidth: 10, lineCap: .round))
                .rotationEffect(.degrees(-90))
            VStack(spacing: 2) {
                HStack(alignment: .firstTextBaseline, spacing: 0) {
                    CountingNumber(t: counter, target: percent)
                    Text("%")
                }
                .font(.system(size: 46, weight: .bold, design: .rounded))
                .foregroundStyle(Theme.ink)
                if let caption {
                    Text(caption)
                        .font(.footnote)
                        .foregroundStyle(Theme.muted)
                }
            }
        }
        .frame(width: 190, height: 190)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Результат \(percent) відсотків" + (caption.map { ", " + $0 } ?? ""))
        .onAppear {
            let target = Double(min(max(percent, 0), 100)) / 100
            if reduceMotion {
                progress = target
                counter = 1
                return
            }
            // Подвійний rAF на сайті: даємо кільцю відмалюватись порожнім.
            Task { @MainActor in
                try? await Task.sleep(for: .milliseconds(50))
                withAnimation(Motion.ease(1.4)) { progress = target }
                withAnimation(.linear(duration: 1.3)) { counter = 1 }
            }
        }
    }
}

/// Число, що «набігає» від 0 до `target`: easeOut cubic (1 − (1 − t)³), t анімується лінійно.
private struct CountingNumber: View, Animatable {
    var t: Double
    var target: Int

    var animatableData: Double {
        get { t }
        set { t = newValue }
    }

    var body: some View {
        let k = min(max(t, 0), 1)
        let value = Double(target) * (1 - pow(1 - k, 3))
        Text("\(Int(value.rounded()))")
            .monospacedDigit()
    }
}
