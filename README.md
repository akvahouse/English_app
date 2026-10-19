# English Notebook — iPhone

Нативний SwiftUI-додаток для iPhone (iOS 18+) на основі сайту «English Notebook»: 8 уроків англійської з конспектами, ілюстрованими картками лексики, 40 варіантами тестів (7 типів завдань), бігучим рядком фраз і збереженням прогресу.

## Структура

```
EnglishNotebook.xcodeproj/   Xcode-проєкт (один таргет, синхронізована тека EnglishNotebook/)
EnglishNotebook/             Вихідний код SwiftUI
  Resources/Content.json     Увесь контент (генерується скриптом, не редагувати вручну)
  Resources/Notes/           Фото оригінальних конспектів
web/                         Копія сайту — джерело істини для контенту
tools/export-content.mjs     web/js → Content.json
tools/swift-syntax-check.mjs Перевірка синтаксису Swift без Xcode (tree-sitter)
docs/iOS_PLAN.md             Детальний план/спека додатка
```

## Як запустити на своєму iPhone (Mac + Xcode 16+)

1. `git clone https://github.com/akvahouse/English_app.git` і відкрийте `EnglishNotebook.xcodeproj`.
2. У навігаторі виберіть проєкт → таргет **EnglishNotebook** → вкладка **Signing & Capabilities**:
   - увімкніть **Automatically manage signing**;
   - у **Team** оберіть свій Apple ID (Personal Team). Якщо Apple ID ще не доданий: Xcode → Settings → Accounts → «+»;
   - якщо Xcode скаже, що bundle identifier зайнятий, змініть `com.akvahouse.englishnotebook` на будь-який унікальний.
3. Підключіть iPhone кабелем. На телефоні: **Settings → Privacy & Security → Developer Mode** → увімкнути (телефон перезавантажиться).
4. У Xcode виберіть свій iPhone як пристрій запуску і натисніть **⌘R**.
5. При першому запуску iOS заблокує додаток: **Settings → General → VPN & Device Management** → ваш Apple ID → **Trust**. Запустіть ще раз.

Безкоштовний профіль підпису діє **7 днів** — після цього просто перезапустіть додаток з Xcode (⌘R). Для TestFlight потрібен Apple Developer Program ($99/рік).

## Оновлення контенту

Якщо змінився сайт у `web/`:

```bash
cd tools && npm install && cd ..
node tools/export-content.mjs
```

Скрипт перезапише `EnglishNotebook/Resources/Content.json` і скопіює картинки. Він падає з помилкою, якщо зустріне HTML-тег, який не вміє конвертувати.

## Перевірка синтаксису без Xcode

```bash
node tools/swift-syntax-check.mjs            # усі файли
node tools/swift-syntax-check.mjs path/to/File.swift
```

Це лише парсер (tree-sitter), типи не перевіряє — остаточна збірка робиться в Xcode.

## Ручний чеклист після збірки

- Home: 8 карток з ілюстраціями, анімація появи, бігучий рядок біжить і зупиняється при утриманні пальця.
- Урок: flip-картки перевертаються, розгортання «Показати відповіді», фото конспектів відкриваються на весь екран із зумом.
- Тест: усі 7 типів завдань (в уроці Trial class є всі: варіанти, вписати, скласти речення, з'єднати, вставити слова, картинка, сортування), серія 🔥 з'являється з 2 правильних поспіль.
- Результат: кільце й лічильник анімуються, ≥ 70 % — конфеті, список помилок із поясненнями.
- Прогрес видно на Home після перезапуску; «Скинути результати» працює у два тапи.
- Темна тема; Dynamic Type «Larger Text»; Reduce Motion вимикає нескінченні анімації й конфеті.
