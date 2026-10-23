# English Notebook — iOS (SwiftUI)

Нативний iPhone-додаток (iOS 27+, Swift 6 з ізоляцією MainActor за замовчуванням, SwiftUI, без залежностей). Спека — `docs/iOS_PLAN.md`, інструкції — `README.md`.
Робоча гілка: `claude/pensive-babbage-3xufo3`. Контент (`EnglishNotebook/Resources/Content.json`) генерується з `web/` скриптом `node tools/export-content.mjs` — вручну не редагувати.

## Дві сесії Claude

- **Хмарна сесія** — пише код, веде CI (`.github/workflows/ios-build.yml`), робить великі зміни.
- **Локальна сесія на Mac** (`claude remote-control` у цій папці) — усе, що потребує Xcode:
  збірка, симулятор, скріншоти, встановлення на iPhone. Перед роботою — `git pull`.
  Невеликі виправлення збірки можна комітити; великі зміни коду — описати й залишити хмарній сесії, щоб не було конфліктів.

## Корисні команди (Mac)

```bash
# Збірка для симулятора — у DerivedData самого Xcode (без -derivedDataPath), щоб не дублювати кеш з ⌘R
xcodebuild build -project EnglishNotebook.xcodeproj -scheme EnglishNotebook \
  -destination 'platform=iOS Simulator,name=iPhone 18 Pro'

# Запуск у симуляторі + скріншот
APP=$(ls -d ~/Library/Developer/Xcode/DerivedData/EnglishNotebook-*/Build/Products/Debug-iphonesimulator/EnglishNotebook.app)
xcrun simctl boot "iPhone 18 Pro" 2>/dev/null; open -a Simulator
xcrun simctl install booted "$APP"
xcrun simctl launch booted com.akvahouse.englishnotebook
xcrun simctl io booted screenshot screenshot.png

# Пристрої (для iPhone по кабелю)
xcrun devicectl list devices
```

## Нюанси

- Проєкт лежить у `~/Developer/EnglishNotebook`, не в iCloud Drive: iCloud створює «копії конфліктів» `… 2` при видаленні/перестворенні файлів.
- Типи, які SwiftUI може викликати поза головним потоком (палітра `Theme`, `ArtColor`, `Shape`), позначені `nonisolated` — інакше Swift 6 падає на пристрої під час асинхронного рендерингу.
- Звукові завдання грають mp3 з `Resources/Audio` (генерує експорт), запасний варіант — системний голос.

Встановлення на iPhone потребує підпису: у Xcode один раз обрати Team (Signing & Capabilities); `DEVELOPMENT_TEAM` у pbxproj не комітити.
