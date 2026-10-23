import SwiftUI

/// Вибір теми користувачем. Зберігається в UserDefaults під ключем `storageKey`.
enum AppAppearance: String, CaseIterable, Identifiable {
    case system, light, dark

    static let storageKey = "english_appearance_v1"

    var id: String { rawValue }

    var title: String {
        switch self {
        case .system: return "Як у системі"
        case .light: return "Світла"
        case .dark: return "Темна"
        }
    }

    var systemImage: String {
        switch self {
        case .system: return "circle.lefthalf.filled"
        case .light: return "sun.max"
        case .dark: return "moon"
        }
    }

    /// nil — слідувати налаштуванню iPhone.
    var colorScheme: ColorScheme? {
        switch self {
        case .system: return nil
        case .light: return .light
        case .dark: return .dark
        }
    }
}
