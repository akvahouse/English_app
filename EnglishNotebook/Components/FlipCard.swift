import SwiftUI

/// Сітка карток-перевертів «Ілюстрована лексика» (сайт: .flip, 2 колонки на телефоні).
struct FlipCardsGrid: View {
    var cards: [FlipCard]

    private let columns = [GridItem(.flexible(), spacing: 14), GridItem(.flexible(), spacing: 14)]

    var body: some View {
        LazyVGrid(columns: columns, spacing: 14) {
            ForEach(Array(cards.enumerated()), id: \.offset) { i, card in
                FlipCardView(card: card, index: i)
                    .riseIn(index: i, duration: 0.5, step: 0.06)
            }
        }
    }
}

/// Одна картка: тап перевертає навколо осі Y (rotateY 180°, 0.6 с).
struct FlipCardView: View {
    var card: FlipCard
    var index: Int
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var flipped = false

    var body: some View {
        Button {
            Haptics.tap()
            withAnimation(reduceMotion ? nil : Motion.ease(0.6)) { flipped.toggle() }
        } label: {
            FlipCardFaces(card: card, index: index, angle: flipped ? 180 : 0)
        }
        .buttonStyle(.plain)
        .accessibilityLabel(card.en)
        .accessibilityValue(flipped ? "\(card.ua). \(card.example)" : "")
        .accessibilityHint("Натисніть, щоб перевернути")
    }
}

/// Обидві сторони картки. Animatable, щоб перемикати видимість граней рівно на 90°
/// (інакше під час повороту «просвічує» зворотний бік).
private struct FlipCardFaces: View, Animatable {
    var card: FlipCard
    var index: Int
    var angle: Double

    var animatableData: Double {
        get { angle }
        set { angle = newValue }
    }

    private var showFront: Bool { angle < 90 }

    var body: some View {
        ZStack {
            front
                .opacity(showFront ? 1 : 0)
                .animation(nil, value: showFront)
            back
                .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                .opacity(showFront ? 0 : 1)
                .animation(nil, value: showFront)
        }
        .rotation3DEffect(.degrees(angle), axis: (x: 0, y: 1, z: 0), perspective: 0.6)
    }

    private var front: some View {
        VStack(spacing: 10) {
            Text(card.emoji)
                .font(.system(size: 44))
                .floaty(amplitude: 6, duration: 3.5, delay: Double(index % 3) * 0.4)
            Text(card.en)
                .font(.system(.subheadline).weight(.bold))
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.center)
        }
        .padding(12)
        .frame(maxWidth: .infinity, minHeight: 150)
        .background(Theme.card, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 14, style: .continuous).stroke(Theme.line, lineWidth: 1))
    }

    private var back: some View {
        VStack(spacing: 8) {
            Text(card.ua)
                .font(.bodyText.weight(.bold))
            Text(card.example)
                .font(.small.italic())
                .opacity(0.9)
        }
        .foregroundStyle(.white)
        .multilineTextAlignment(.center)
        .padding(12)
        .frame(maxWidth: .infinity, minHeight: 150)
        .background(Theme.accent, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}
