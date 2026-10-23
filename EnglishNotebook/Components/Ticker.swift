import SwiftUI

/// Бігучий рядок слів і фраз (сайт: #ticker, keyframes tk-run).
/// Контент дубльовано вдвічі; зсув обчислюється з часу, тож пауза на дотик не збиває позицію.
struct Ticker: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var items: [TickerItem] = ContentStore.shared.ticker.shuffled()
    @State private var start = Date()
    @State private var pausedAt: Date?
    @State private var pausedTotal: TimeInterval = 0
    @State private var contentWidth: CGFloat = 0
    @State private var tip: TickerItem?
    @State private var tipTask: Task<Void, Never>?
    @GestureState private var touching = false

    /// Тривалість одного проходу — як на сайті: items.count * 8.4 с.
    private var duration: Double { max(Double(items.count) * 8.4, 1) }

    var body: some View {
        strip
            .frame(height: 44)
            .background(Theme.accentSoft)
            .overlay {
                // Fade-краї 40pt
                HStack(spacing: 0) {
                    LinearGradient(colors: [Theme.accentSoft, Theme.accentSoft.opacity(0)], startPoint: .leading, endPoint: .trailing)
                        .frame(width: 40)
                    Spacer(minLength: 0)
                    LinearGradient(colors: [Theme.accentSoft.opacity(0), Theme.accentSoft], startPoint: .leading, endPoint: .trailing)
                        .frame(width: 40)
                }
                .allowsHitTesting(false)
            }
            .overlay(alignment: .bottom) { Theme.line.frame(height: 1) }
            .overlay(alignment: .top) {
                if let tip {
                    bubble(tip)
                        .offset(y: 50)
                        .transition(.opacity.combined(with: .scale(scale: 0.9, anchor: .top)))
                }
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel("Слова й фрази для запам'ятовування")
            .onChange(of: touching) { _, isTouching in
                if isTouching {
                    pausedAt = Date()
                } else if let p = pausedAt {
                    pausedTotal += Date().timeIntervalSince(p)
                    pausedAt = nil
                }
            }
            .onDisappear { tipTask?.cancel() }
    }

    // MARK: - стрічка

    @ViewBuilder private var strip: some View {
        if reduceMotion {
            // Без автопрокрутки — звичайна горизонтальна прокрутка пальцем.
            ScrollView(.horizontal, showsIndicators: false) { row }
        } else {
            // GeometryReader вимірює реальну доступну ширину — без цього `.frame(maxWidth: .infinity)`
            // поверх `.fixedSize` не має обмеження зверху, і SwiftUI роздуває ширину всього екрана.
            GeometryReader { geo in
                TimelineView(.animation(paused: touching)) { context in
                    let reference = pausedAt ?? context.date
                    let elapsed = max(reference.timeIntervalSince(start) - pausedTotal, 0)
                    let phase = (elapsed / duration).truncatingRemainder(dividingBy: 1)
                    HStack(spacing: 0) {
                        row.onGeometryChange(for: CGFloat.self) { $0.size.width } action: { contentWidth = $0 }
                        row
                    }
                    .fixedSize(horizontal: true, vertical: false)
                    .offset(x: -CGFloat(phase) * contentWidth)
                    .frame(width: geo.size.width, alignment: .leading)
                }
            }
            .clipped()
            .simultaneousGesture(
                DragGesture(minimumDistance: 0).updating($touching) { _, state, _ in state = true }
            )
        }
    }

    private var row: some View {
        HStack(spacing: 0) {
            ForEach(items) { item in itemView(item) }
        }
    }

    private func itemView(_ item: TickerItem) -> some View {
        HStack(spacing: 8) {
            Text(item.emoji).font(.system(size: 18))
            Text(item.en).bold().foregroundStyle(Theme.accent)
            Text(item.ua).foregroundStyle(Theme.ink.opacity(0.85))
            Text("✦").foregroundStyle(Theme.accent.opacity(0.5)).padding(.leading, 12)
        }
        .font(.system(size: 15))
        .lineLimit(1)
        .padding(.horizontal, 20)
        .padding(.vertical, 11)
        .contentShape(Rectangle())
        .onTapGesture { show(item) }
    }

    // MARK: - підказка з повним перекладом (на сайті — title)

    private func bubble(_ item: TickerItem) -> some View {
        Text("\(item.en) — \(item.ua)")
            .font(.meta.weight(.semibold))
            .foregroundStyle(Theme.ink)
            .multilineTextAlignment(.center)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(Theme.card, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).stroke(Theme.line, lineWidth: 1))
            .shadow(color: .black.opacity(0.12), radius: 8, y: 4)
            .padding(.horizontal, Theme.screenPadding)
            .allowsHitTesting(false)
    }

    private func show(_ item: TickerItem) {
        Haptics.selection()
        tipTask?.cancel()
        withAnimation(Motion.ease(0.25)) { tip = item }
        tipTask = Task { @MainActor in
            try? await Task.sleep(for: .seconds(2.5))
            guard !Task.isCancelled else { return }
            withAnimation(Motion.ease(0.25)) { tip = nil }
        }
    }
}
