import SwiftUI
import UIKit

// Кольори сайту (css/style.css, css/fun.css) для світлої й темної теми.
// nonisolated: SwiftUI може обчислювати динамічні кольори поза головним потоком (асинхронний рендеринг),
// і перевірка ізоляції MainActor у Swift 6 тоді аварійно зупиняє додаток.

nonisolated extension Color {
    init(hex: UInt32) {
        self.init(red: Double((hex >> 16) & 0xff) / 255,
                  green: Double((hex >> 8) & 0xff) / 255,
                  blue: Double(hex & 0xff) / 255)
    }

    /// Динамічний колір: light / dark.
    init(light: UInt32, dark: UInt32) {
        self.init(uiColor: UIColor { tc in
            tc.userInterfaceStyle == .dark ? UIColor(Color(hex: dark)) : UIColor(Color(hex: light))
        })
    }
}

nonisolated enum Theme {
    // Основна палітра
    static let bg = Color(light: 0xf5f7fb, dark: 0x12141b)
    static let card = Color(light: 0xffffff, dark: 0x1b1e28)
    static let ink = Color(light: 0x17243d, dark: 0xe8eaf0)
    static let muted = Color(light: 0x627089, dark: 0x9aa1b2)
    static let line = Color(light: 0xe0e6ef, dark: 0x2b3040)
    static let accent = Color(light: 0x2559e5, dark: 0x8b86ff)
    static let accentSoft = Color(light: 0xedf2ff, dark: 0x25274a)
    static let ok = Color(light: 0x167347, dark: 0x4ade80)
    static let okSoft = Color(light: 0xe8f7ee, dark: 0x14301f)
    static let bad = Color(light: 0xb32d3e, dark: 0xf87171)
    static let badSoft = Color(light: 0xfff0f1, dark: 0x3a1c1e)
    static let continueBg = Color(light: 0x193a91, dark: 0x25274a)
    static let continueEyebrow = Color(hex: 0xbdceff)
    static let continueText = Color(hex: 0xd0ddff)
    static let continueButtonBg = Color(light: 0xffffff, dark: 0x8b86ff)
    static let continueButtonFg = Color(light: 0x193a91, dark: 0x12141b)

    // Акцентні кольори ілюстрацій, прогрес-бару, конфеті
    static let c1 = Color(hex: 0x4f46e5)
    static let c2 = Color(hex: 0xf59e0b)
    static let c3 = Color(hex: 0x10b981)
    static let c4 = Color(hex: 0xec4899)
    static let c5 = Color(hex: 0x38bdf8)

    // Ілюстрації
    static let skin = Color(hex: 0xf3c9a5)
    static let hair = Color(hex: 0x3b2f2f)

    // Теги Past / Present / Future
    static let past = Color(hex: 0xdc2626)
    static let present = Color(hex: 0xd97706)
    static let future = Color(hex: 0x16a34a)

    // Streak
    static let streakBg = Color(light: 0xfff2df, dark: 0x3a2c14)
    static let streakFg = Color(light: 0x96621b, dark: 0xf0b35a)
    static let streakHotBg = Color(light: 0xffe1d6, dark: 0x47231a)
    static let streakHotFg = Color(light: 0xc2410c, dark: 0xff9a6c)

    /// Кольори номерів карток уроків 01…08 (фон, текст), як `.card:nth-child(n) .num` на сайті.
    static func numberColors(index: Int) -> (bg: Color, fg: Color) {
        switch index {
        case 2: return (Color(light: 0xe6f5f2, dark: 0x14302b), Color(light: 0x167663, dark: 0x4fd1b8))
        case 3: return (Color(light: 0xfff2df, dark: 0x3a2c14), Color(light: 0x96621b, dark: 0xf0b35a))
        case 4: return (Color(light: 0xf0ebfc, dark: 0x2d2347), Color(light: 0x7148ac, dark: 0xb79cf0))
        case 5: return (Color(light: 0xfde8f1, dark: 0x3b1a2a), Color(light: 0xb4235f, dark: 0xf58fb6))
        case 6: return (Color(light: 0xe3f1ff, dark: 0x173049), Color(light: 0x1f5fa8, dark: 0x7db9f2))
        case 7: return (Color(light: 0xe9f7e1, dark: 0x1f3318), Color(light: 0x3b7a1f, dark: 0x9ad77a))
        case 8: return (Color(light: 0xfff0d9, dark: 0x3a2a10), Color(light: 0xa15c00, dark: 0xf5b95c))
        default: return (accentSoft, accent)
        }
    }

    /// Колір результату: ≥ 90 % — зелений, < 50 % — бурштиновий, інакше акцент (як кільце на сайті).
    static func scoreColor(_ percent: Int) -> Color {
        percent >= 90 ? c3 : percent < 50 ? c2 : accent
    }

    static func tagColor(_ c: TagColor?) -> Color {
        switch c {
        case .past: return past
        case .present: return present
        case .future: return future
        case nil: return muted
        }
    }

    // Розміри
    static let screenPadding: CGFloat = 20
    static let cardRadius: CGFloat = 16
    static let buttonRadius: CGFloat = 12
    static let cardShadow = Color(light: 0x17243d, dark: 0x000000).opacity(0.04)
}

// MARK: - Типографіка (Dynamic Type, SF Rounded для заголовків)

extension Font {
    static let screenTitle = Font.system(.largeTitle, design: .rounded).weight(.bold)
    static let sectionTitle = Font.system(.title2, design: .rounded).weight(.bold)
    static let cardTitle = Font.system(.title2, design: .rounded).weight(.bold)
    static let question = Font.system(.title3).weight(.medium)
    static let bodyText = Font.system(.body)
    static let option = Font.system(.body)
    static let meta = Font.system(.subheadline)
    static let small = Font.system(.footnote)
    static let eyebrow = Font.system(.caption).weight(.bold)
    static let button = Font.system(.body).weight(.semibold)
}

// MARK: - Загальні модифікатори

struct CardStyle: ViewModifier {
    var padding: CGFloat = 20
    func body(content: Content) -> some View {
        content
            .padding(padding)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.card, in: RoundedRectangle(cornerRadius: Theme.cardRadius, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: Theme.cardRadius, style: .continuous).stroke(Theme.line, lineWidth: 1))
            .shadow(color: Theme.cardShadow, radius: 5, y: 3)
    }
}

extension View {
    func cardStyle(padding: CGFloat = 20) -> some View { modifier(CardStyle(padding: padding)) }

    /// Eyebrow-напис: дрібний, жирний, розріджений, великими літерами.
    func eyebrowStyle(color: Color = Theme.muted) -> some View {
        self.font(.eyebrow).tracking(1.5).textCase(.uppercase).foregroundStyle(color)
    }
}

// MARK: - Кнопки (сайт: .btn, .btn.ghost)

struct PrimaryButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var enabled
    var fullWidth = true
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.button)
            .foregroundStyle(.white)
            .padding(.horizontal, 20)
            .frame(minHeight: 50)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .background(Theme.accent, in: RoundedRectangle(cornerRadius: Theme.buttonRadius, style: .continuous))
            .shadow(color: Theme.accent.opacity(configuration.isPressed ? 0.1 : 0.3), radius: configuration.isPressed ? 4 : 10, y: configuration.isPressed ? 2 : 6)
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(enabled ? 1 : 0.45)
            .animation(Motion.ease(0.18), value: configuration.isPressed)
    }
}

struct GhostButtonStyle: ButtonStyle {
    @Environment(\.isEnabled) private var enabled
    var fullWidth = true
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.button)
            .foregroundStyle(Theme.accent)
            .padding(.horizontal, 20)
            .frame(minHeight: 50)
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .background(Theme.accentSoft, in: RoundedRectangle(cornerRadius: Theme.buttonRadius, style: .continuous))
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .opacity(enabled ? 1 : 0.45)
            .animation(Motion.ease(0.18), value: configuration.isPressed)
    }
}

/// Стиль для карток-кнопок: легке стискання при натисканні замість hover-ліфту.
struct PressableCardStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(Motion.ease(0.18), value: configuration.isPressed)
    }
}

extension ButtonStyle where Self == PrimaryButtonStyle {
    static var primary: PrimaryButtonStyle { PrimaryButtonStyle() }
}
extension ButtonStyle where Self == GhostButtonStyle {
    static var ghost: GhostButtonStyle { GhostButtonStyle() }
}
extension ButtonStyle where Self == PressableCardStyle {
    static var pressableCard: PressableCardStyle { PressableCardStyle() }
}
