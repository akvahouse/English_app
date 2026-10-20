# English Notebook — iOS (SwiftUI)

Нативний iPhone-додаток (iOS 18+, SwiftUI, без залежностей). Спека — `docs/iOS_PLAN.md`, інструкції — `README.md`.
Робоча гілка: `claude/pensive-babbage-3xufo3`. Контент (`EnglishNotebook/Resources/Content.json`) генерується з `web/` скриптом `node tools/export-content.mjs` — вручну не редагувати.

## Дві сесії Claude

- **Хмарна сесія** — пише код, веде CI (`.github/workflows/ios-build.yml`), робить великі зміни.
- **Локальна сесія на Mac** (`claude remote-control` у цій папці) — усе, що потребує Xcode:
  збірка, симулятор, скріншоти, встановлення на iPhone. Перед роботою — `git pull`.
  Невеликі виправлення збірки можна комітити; великі зміни коду — описати й залишити хмарній сесії, щоб не було конфліктів.

## Корисні команди (Mac)

```bash
# Збірка для симулятора
xcodebuild build -project EnglishNotebook.xcodeproj -scheme EnglishNotebook \
  -destination 'platform=iOS Simulator,name=iPhone 16' -derivedDataPath build

# Запуск у симуляторі + скріншот
xcrun simctl boot "iPhone 16" 2>/dev/null; open -a Simulator
xcrun simctl install booted build/Build/Products/Debug-iphonesimulator/EnglishNotebook.app
xcrun simctl launch booted com.akvahouse.englishnotebook
xcrun simctl io booted screenshot screenshot.png

# Пристрої (для iPhone по кабелю)
xcrun devicectl list devices
```

Встановлення на iPhone потребує підпису: у Xcode один раз обрати Team (Signing & Capabilities); `DEVELOPMENT_TEAM` у pbxproj не комітити.
