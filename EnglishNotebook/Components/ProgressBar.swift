import SwiftUI

/// Смуга прогресу тесту (.bar на сайті): 6pt, ширина заливки анімується, градієнт «біжить» (shine, 3 с).
struct ProgressBar: View {
    var fraction: Double
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var phase: Double = 0

    var body: some View {
        let clamped = min(max(fraction, 0), 1)
        GeometryReader { geo in
            let w = geo.size.width * clamped
            let tile = max(w * 2, 1)
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.line)
                // Градієнт вдвічі ширший за заливку; зсув на один період дає безшовний цикл.
                HStack(spacing: 0) {
                    gradient.frame(width: tile)
                    gradient.frame(width: tile)
                }
                .offset(x: reduceMotion ? 0 : -CGFloat(phase) * tile)
                .frame(width: w, alignment: .leading)
                .clipShape(Capsule())
                .animation(Motion.ease(0.6), value: fraction)
            }
        }
        .frame(height: 6)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Прогрес тесту")
        .accessibilityValue("\(Int((clamped * 100).rounded())) відсотків")
        .onAppear {
            guard !reduceMotion else { return }
            withAnimation(.linear(duration: 3).repeatForever(autoreverses: false)) { phase = 1 }
        }
    }

    private var gradient: some View {
        LinearGradient(colors: [Theme.accent, Theme.c4, Theme.accent], startPoint: .leading, endPoint: .trailing)
    }
}
