# English Notebook — iPhone-додаток на SwiftUI

## Context

Є готовий сайт «English Notebook» (артефакт https://claude.ai/artifact/AvqF9cH8WsunZftaFaLTXs): 8 уроків англійської з конспектами, ілюстрованими картками лексики, 5 варіантів тесту на кожен урок (≈430 завдань, 7 типів), бігучим рядком фраз, прогресом у localStorage і багатьма анімаціями. Потрібен нативний iPhone-додаток на SwiftUI, який **зберігає весь контент і всі анімації сайту**, але з дизайном, переробленим під телефон і максимальну читабельність.

Рішення, прийняті з користувачем:
- Збірка: **Xcode на Mac користувача**, запуск на iPhone через кабель із безкоштовним Personal Team (без Apple Developer Program).
- **iOS 18+**, Swift 5.10+, лише SwiftUI, без сторонніх залежностей.
- Фото оригінальних конспектів (12 файлів, ~9 МБ) **вкладаються** в бандл.
- Репозиторій `akvahouse/english_app` зараз порожній (лише README) — усе створюється з нуля на гілці `claude/pensive-babbage-3xufo3`.

Агент-виконавець працює в Linux без Xcode, тому: (1) контент експортується з JS у JSON скриптом на Node, (2) Xcode-проєкт описується мінімальним `project.pbxproj` із синхронізованими теками (Xcode 16+), щоб не перелічувати файли, (3) синтаксис Swift перевіряється `swiftc -parse` (Swift toolchain для Linux), а фінальна збірка — користувачем у Xcode.

---

## 1. Структура репозиторію

```
English_app/
├── README.md                      # як відкрити в Xcode і запустити на iPhone
├── web/                           # копія сайту (джерело істини для контенту) — файли з артефакту
│   ├── index.html  css/  js/  assets/
├── tools/
│   ├── package.json               # node-html-parser
│   └── export-content.mjs         # JS → Content.json + копіює картинки
├── EnglishNotebook.xcodeproj/
│   └── project.pbxproj            # один таргет, PBXFileSystemSynchronizedRootGroup → ./EnglishNotebook
└── EnglishNotebook/
    ├── EnglishNotebookApp.swift
    ├── Info.plist (або ключі в pbxproj: UILaunchScreen, portrait only)
    ├── Assets.xcassets/            # AppIcon, AccentColor, кольори теми
    ├── Resources/
    │   ├── Content.json            # згенеровано tools/export-content.mjs
    │   └── Notes/lesson-source-1.png … lesson-source-12.(png|webp)
    ├── Model/        Content.swift, Question.swift, Progress.swift, ContentStore.swift
    ├── Theme/        Theme.swift (кольори, шрифти, відступи), Motion.swift (easing, reduce-motion)
    ├── Components/   RichText.swift, Blocks/…, FlipCard.swift, Ticker.swift, ProgressBar.swift,
    │                 ScoreRing.swift, Confetti.swift, StreakBadge.swift, FeedbackCard.swift, PrimaryButton.swift
    ├── Art/          LessonArt.swift + 8 файлів ілюстрацій (ArtTrial.swift …)
    ├── Screens/      HomeView.swift, LessonView.swift, QuizView.swift, ResultView.swift
    ├── Quiz/         QuizEngine.swift + QuestionViews/ (MCView, FillView, OrderView, PicView, MatchView, SortView, GapBankView)
    └── Util/         Normalize.swift, Shuffle.swift, Haptics.swift
```

`project.pbxproj`: один iOS-таргет `EnglishNotebook`, `IPHONEOS_DEPLOYMENT_TARGET = 18.0`, `TARGETED_DEVICE_FAMILY = 1`, `SWIFT_VERSION = 5.0`, `INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait`, `GENERATE_INFOPLIST_FILE = YES`, `PRODUCT_BUNDLE_IDENTIFIER = com.akvahouse.englishnotebook`, `CODE_SIGN_STYLE = Automatic`, `DEVELOPMENT_TEAM` порожній (користувач обере свій Personal Team в Xcode). Тека `EnglishNotebook/` підключена як synchronized root group (`objectVersion = 77`), тому нові Swift-файли й ресурси підхоплюються автоматично; `Resources/` потрапляє в бандл як папка-референс або просто файли (JSON і картинки — у `Copy Bundle Resources` автоматично через синхронізацію).

---

## 2. Експорт контенту (`tools/export-content.mjs`)

Сайт зберігає контент у глобальних JS-змінних, що мутуються кількома файлами (data.js → lesson-*.js → explanations.js → more-content.js → variants.js). Скрипт відтворює цей процес:

1. Створює `vm` контекст із заглушками `document` (getElementById → об'єкт із `innerHTML`), `localStorage`, `window`, `location`, `matchMedia`, `requestAnimationFrame`.
2. Виконує по черзі `helpers.js, data.js, lesson-chunks.js, lesson-beordo.js, lesson-negatives.js, lesson-questions.js, explanations.js, art.js, interactive.js, more-content.js, variants.js, ticker.js` (саме цей порядок, як в index.html; `app.js` не виконується).
3. Із контексту читає `LESSONS` (з `versions`), `CARDS`, `TICKER_ITEMS`.
4. Для кожної секції уроку парсить `html` (`node-html-parser`) у **блокову модель** (розділ 3.2). Секція «Ілюстрована лексика» (вставлена more-content.js) замінюється на блок `flipCards` з `CARDS[id]`; секція «Оригінальні матеріали» — на блок `sourceImages` з іменами файлів (витягти з `<img src>`).
5. Пише `EnglishNotebook/Resources/Content.json` і копіює `web/assets/*` у `Resources/Notes/`.
6. Друкує статистику (уроків, секцій, питань за типами) і падає з ненульовим кодом, якщо зустрів HTML-тег, який не вміє конвертувати — щоб нічого не загубити мовчки.

Теги, які трапляються в секціях (повний перелік): `p, ul, ol, li, b, mark, s, u, i, small, br, table/tr/th/td, div.pair > div, div.tag(.past/.present/.future), div.chips > span.chip, details/summary, p.hint, p.source-note, div.source-images > a > img, h2(не трапляється всередині), a href` (внутрішні/зовнішні посилання — зберегти як inline-link).

Інлайн-розмітка переводиться в компактний markdown-подібний формат (розділ 3.3), який на боці Swift перетворюється в `AttributedString`.

---

## 3. Модель даних (Swift, `Codable`)

### 3.1 Content.json
```swift
struct Content: Codable { var lessons: [Lesson]; var ticker: [TickerItem] }
struct Lesson: Codable, Identifiable {
  var id: String            // trial, tobe1, tobe2, presimple, chunks, beordo, negatives, questions
  var index: Int            // 1…8 (для «01» і кольору номера)
  var title, short, subtitle, summary: String
  var sections: [Section]
  var versions: [QuizVersion]   // n: 1…5
}
struct Section: Codable, Identifiable { var id: String; var title: String; var blocks: [Block] }
struct QuizVersion: Codable { var n: Int; var questions: [Question] }
struct TickerItem: Codable { var en, ua, emoji: String }
struct FlipCard: Codable { var emoji, en, ua, example: String }
```

### 3.2 Блоки секцій (enum з `kind`)
`paragraph(text)`, `bullets([text])`, `numbered([text])`, `table(header:[text], rows:[[text]])`, `pair([PairCell{tag?, tagColor?(past|present|future), text}])`, `chips([text])`, `details(summary, blocks)`, `hint(text)`, `flipCards([FlipCard])`, `sourceImages([String])`, `tag(text, color?)`.
`text` — рядок у форматі 3.3; `li` може містити `<br>` → `\n`.

### 3.3 Інлайн-розмітка (рядок → AttributedString)
`**жирний**`, `==mark==` (підсвітка accent-soft/accent, як `<mark>`), `~~закреслено~~` (`<s>`), `__підкреслено__` (`<u>`), `*курсив*`, `^^small^^` (менший, muted), `[текст](url)`. `RichText.swift` містить простий парсер (без Markdown-рендера Apple, бо потрібні mark/small/u) → `Text`. Екранування: `\*`, `\=`.

### 3.4 Питання (7 типів — усі з сайту)
```swift
enum Question: Codable {
  case mc(q: String, options: [String], answer: Int, why: String?, no: [String?]?)
  case fill(q: String, answers: [String], why: String?, no: String?)
  case order(words: [String], answer: String, why: String?, no: String?)
  case pic(q: String, options: [PicOption{emoji, text}], answer: Int, why: String?, no: [String?]?)
  case match(q: String, pairs: [MatchPair{emoji, left: String?, right: String}], why: String?)
  case sort(q: String, buckets: [String], items: [SortItem{text, bucket: Int}], why: String?)
  case gapbank(q: String, bank: [String], sentences: [String], answers: [String], why: String?)
}
```
JSON: `{"type":"mc", ...}` — декодується вручну за `type`. Поля `why`/`explain` на сайті — злити в `why`.

### 3.5 Прогрес (`Progress.swift`, `@Observable final class ProgressStore`)
- `results: [String: LessonResult{best, total, date}]` — ключ UserDefaults `english_progress_v1` (JSON), та сама семантика: зберігати лише якщо `score/total >= best/total`.
- `lastVariant: [String: Int]` — ключ `english_last_variant_v1`; `pickVersion` обирає випадкову версію, крім минулої.
- `reset()` — видаляє результати (не lastVariant).
- `doneCount` → для заголовка «Пройдено тестів: N/8».

### 3.6 `ContentStore`
Завантажує `Content.json` з бандлу один раз при старті (`static let shared`), `lessons`, `lesson(id:)`, `totalQuestions`, `totalVariants` для підпису «N завдань у M варіантах тестів».

---

## 4. Дизайн-система (`Theme.swift`)

Мета — максимальна читабельність на iPhone: великий текст, щедрі відступи, одна колонка, контраст ≥ 4.5:1.

**Кольори** (Assets.xcassets, light / dark — значення з CSS сайту):
| Ім'я | Light | Dark |
|---|---|---|
| bg | #f5f7fb | #12141b |
| card | #ffffff | #1b1e28 |
| ink | #17243d | #e8eaf0 |
| muted | #627089 | #9aa1b2 |
| line | #e0e6ef | #2b3040 |
| accent | #2559e5 | #8b86ff |
| accentSoft | #edf2ff | #25274a |
| ok / okSoft | #167347 / #e8f7ee | #4ade80 / #14301f |
| bad / badSoft | #b32d3e / #fff0f1 | #f87171 / #3a1c1e |
| continueBg | #193a91 | #25274a |
| c2 (amber) #f59e0b, c3 (green) #10b981, c4 (pink) #ec4899 — для ілюстрацій, прогрес-бару, конфеті |
| Кольори номерів карток 01–08 (пара soft/strong, light і dark) — узяти з `.card:nth-child(n) .num` у style.css/fun.css |

**Типографіка** (системний SF, Dynamic Type через `.font(.system(.title, design: .rounded))` для заголовків і `.body` для тексту; усі розміри масштабуються):
- H1 екрана: `.largeTitle.bold()` (34pt), трекінг −0.5
- Заголовок картки/секції: `.title2.bold()` (22pt)
- Питання тесту: `.title3` (20pt), `lineSpacing 4`
- Текст конспекту/варіанти відповіді: `.body` (17pt), `lineSpacing 5`
- Підписи/мета: `.subheadline` (15pt) muted; eyebrow: `.caption.weight(.bold)`, `tracking(1.5)`, uppercase
- Мінімальний розмір будь-якого тексту 13pt; емодзі-ілюстрації 44–56pt.

**Відступи й форми**: горизонтальний відступ екрана 20pt; картки `RoundedRectangle(cornerRadius: 16)` з fill `card`, stroke `line` 1pt, тінь `0 3 10 rgba(23,36,61,.03)`; кнопки `cornerRadius 12`, висота ≥ 50pt; все, що тапається, ≥ 44×44pt. Таблиці — горизонтальний `ScrollView` всередині картки з чергуванням рядків і жирними заголовками (на телефоні таблиці ≥ 3 колонок вміщуються через `ScrollView(.horizontal)` з мінімальною шириною колонки 120pt).

**Motion.swift**: `static let ease = Animation.timingCurve(0.2, 0.7, 0.2, 1, duration:)` — це `cubic-bezier(.2,.7,.2,1)` сайту; `@Environment(\.accessibilityReduceMotion)` — при `true` всі нескінченні анімації вимикаються, появи стають миттєвими, конфеті не показується (як `prefers-reduced-motion` на сайті).

---

## 5. Навігація та екрани

`NavigationStack` з `enum Route: Hashable { case lesson(String), quiz(String), result(...) }`. Сайдбар сайту замінюється на: (а) картки на Home, (б) у тулбарі кожного екрана кнопка-меню «Уроки» (`Menu` з 8 пунктами «01 · Trial class»), (в) свайп-назад. Футер сайту → маленький підпис внизу Home. Хедер «En. English Notebook · Пройдено тестів: N/8» → `navigationTitle` + `toolbar` з лічильником у капсулі.

### 5.1 HomeView (`#/`)
Порядок зверху вниз, усе в `ScrollView`:
1. **Ticker** (розділ 7) — одразу під навбаром, висота 44pt.
2. Eyebrow «ENGLISH · PERSONAL NOTEBOOK», H1 «Мої уроки англійської», lead «Усе, що вивчаємо, — в одному місці. Повертайся до тем і закріплюй знання на практиці.», підпис «8 тем курсу».
3. **Картка «Твій наступний крок»** (`continueBg`, білий текст, радіус 18): eyebrow, title і subtitle першого непройденого уроку, біла кнопка «Відкрити урок».
4. Заголовок «Програма навчання» + підпис «N завдань у M варіантах тестів».
5. **Картки уроків** в одну колонку (`LazyVStack spacing 16`): ілюстрація уроку (SVG → SwiftUI, розділ 8) зверху з радіусом 12; рядок: квадратний бейдж «01» (43pt, колір за індексом) + «5 варіантів тесту»; title `.title2.bold()`; subtitle жирним; summary muted; футер із роздільником: «Відкрити урок» accent + бейдж статусу («До вивчення» accent-soft або «80% · 8 / 10» ok-soft). Тап — `NavigationLink(value: .lesson(id))`; натискання — `scaleEffect(0.98)` + тінь (замість hover-ліфту).
6. Кнопка «↺ Скинути результати» (розділ 5.5).

### 5.2 LessonView (`#/lesson/:id`)
1. **Hero-картка** (градієнт accentSoft→card, радіус 22): ілюстрація уроку на всю ширину (макс 340pt, тінь), H1 title, lead subtitle, велика кнопка «Пройти тест · випадковий із 5 варіантів».
2. Секції по порядку як на сайті: «Коротко про головне», «Ілюстрована лексика» (FlipCards), далі оригінальні секції уроку, в кінці «Оригінальні матеріали». Кожна — картка з заголовком `.title2.bold()` і блоками (`BlockView` рендерить enum з 3.2). `details` → `DisclosureGroup` зі стилізованим summary (accent, bold) і анімацією розкриття.
3. `sourceImages` → `DisclosureGroup("Показати сторінки уроку")` з картинками (`Image(uiImage:)` з бандлу, `.resizable().scaledToFit()`), тап відкриває `fullScreenCover` з `ScrollView` + `MagnifyGesture` для зуму.
4. Внизу: кнопки «Пройти тест (випадковий варіант)» (primary) і «До списку» (ghost).
Усі `NavigationLink` до `.quiz(id)`.

### 5.3 QuizView (`#/quiz/:id`)
`QuizEngine` (`@Observable`): при старті `pickVersion`, `shuffle(questions)`, для `mc`/`pic` — перемішати варіанти разом із `no` і перерахувати `answer` (як `shuffleOptions`). Стан: `index, score, streak, wrong: [WrongAnswer], answered`.
Макет: кнопка «← До конспекту» (тулбар), H1 «{title} — тест», **ProgressBar** (6pt, градієнт accent→c4→accent, що «біжить» — розділ 6), рядок «Питання 3 з 10 · Варіант 2 з 5» + **StreakBadge** («🔥 серія: N», показується при streak ≥ 2, стиль `hot` при ≥ 4), картка з `QuestionView` для поточного типу, після відповіді — **FeedbackCard** (ok/bad: «✓ Правильно!» / «✗ Неправильно.» + «Ваша відповідь: …», «Правильно: …», «Чому так: …») і кнопка «Наступне питання» / «Результат». Перехід між питаннями — `.transition(.asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .opacity))` з `id: index`. Haptics: `.success` / `.error` через `UINotificationFeedbackGenerator`, `.selection` на вибір слова.
Усі підказки-рядки (`hint`) з сайту переносяться дослівно, але «Натисніть» лишається (на телефоні це тап).

### 5.4 ResultView
Зберегти результат у `ProgressStore`, потім: H1 «{title} — результат»; картка: **медаль** (🏆 ≥90 / 🎉 ≥70 / 💪 ≥50 / 📚, 56pt, floaty-анімація), **ScoreRing** (190pt, розділ 6) з лічильником 0→pct% (easeOut cubic 1.3 с) і підписом «8 з 10»; повідомлення («Чудово! 🎉» / «Добре! 👍» / «Непогано, повторіть конспект.» / «Варто повторити тему.»); при pct ≥ 70 через 0.35 с — **конфеті**. Картка «Помилки» (список: питання, «Ваша відповідь» bad, «Правильно» ok, «Чому ваша неправильна», «Чому так»). Кнопки: «Пройти ще раз» (новий `QuizEngine` — заміна екрана), «Конспект», «Усі уроки».

### 5.5 Скидання результатів
Кнопка-«арм» у два тапи, як на сайті: 1-й тап — текст «Точно скинути? Натисніть ще раз», заливка bad, пульсація (`pulse` 1 с, repeatForever) 4 с, потім повернення; 2-й тап — `reset()`, текст «✓ Результати скинуто» на 2 с. Haptic `.warning` на арм.

---

## 6. Карта анімацій сайту → SwiftUI (обов'язково зберегти всі)

| Сайт (CSS/JS) | Де | SwiftUI |
|---|---|---|
| `rise` поява блоків зі зсувом 20px, затримка 60 мс × індекс | усі екрани (`#app>*`, `.sec`, `.grid .card`, `.gaps li`, `.flip`) | `ViewModifier RiseIn(index:)`: `opacity 0→1`, `offset y 20→0`, `Motion.ease(0.55).delay(0.06*index)` при `onAppear`; у `LazyVStack` з ключем на id |
| `popin` (scale .9→1.04→1) | FeedbackCard, StreakBadge, pic-варіанти | `keyframeAnimator` (iOS 17+): scale 0.9 → 1.04 (60%) → 1.0, 0.35 с |
| `shake` (±7px по X) | неправильний варіант, пари match, chip sort, gap | `keyframeAnimator` по `offset.x`: 0,−7,7,−5,5,0 за 0.45 с; запуск через `trigger` |
| `pop` (scale 1→1.08→1) | правильна відповідь, matched-пара, filled gap | `keyframeAnimator` 0.45 с |
| `floaty` (y ±8px, 4 с нескінченно) | емодзі на flip-картках, медаль, елементи ілюстрацій | `phaseAnimator([0,-8])` з `easeInOut(4)` або `withAnimation(.repeatForever(autoreverses:true))`; затримки `d2/d3` (−1.3/−2.6 с) через `delay` |
| `pulse` (scale 1↔1.07, 2.4 с) | ілюстрації, reset-кнопка (1 с) | `repeatForever` `scaleEffect` |
| `shine` прогрес-бар (градієнт рухається 3 с) | ProgressBar у тесті | `LinearGradient` ширина 200%, `offset` анімований `repeatForever(autoreverses:false)`; ширина заливки — `Motion.ease(0.6)` |
| hover-ліфт карток/кнопок | картки, кнопки | `ButtonStyle` з `scaleEffect(pressed ? 0.97 : 1)` + тінь; немає hover на iOS — замінити тактильним feedback |
| `.opt:hover translateX(5px)` | варіанти | pressed-state `offset x 4` |
| flip 3D (rotateY 180°, 0.6 с, preserve-3d) | FlipCard | два `ZStack`-шари з `rotation3DEffect(.degrees(flipped ? 180 : 0), axis: (0,1,0), perspective: 0.6)`; задня сторона попередньо повернута на 180°, `opacity` перемикається на 90° — щоб не «просвічувало» |
| `tk-run` бігучий рядок (translateX −50% за N с, лінійно, пауза на hover) | Ticker | `TimelineView(.animation)` + `offset` за часом; рядок дубльовано; пауза при утриманні пальця (`LongPressGesture`/`DragGesture` з `minimumDistance 0`) і можливість прокрутки пальцем |
| ring `stroke-dashoffset` 1.4 с | ScoreRing | `Circle().trim(from: 0, to: progress)` + `rotationEffect(-90°)`, `Motion.ease(1.4)`; колір great (c3) ≥ 90, low (c2) < 50 |
| лічильник 0→pct (easeOut cubic 1.3 с) | ResultView | `TimelineView` або `Animatable` modifier `AnimatableNumber` |
| confetti canvas (140 частинок, гравітація .35, 150 кадрів) | ResultView | `Canvas` + `TimelineView(.animation)`; та сама фізика (vx ±7, vy −3…−16, обертання), кольори `#4f46e5 #f59e0b #10b981 #ec4899 #38bdf8`; overlay на весь екран, `allowsHitTesting(false)`, зняти через 2.5 с |
| SVG `<animateTransform>` в ілюстраціях (стрілка годинника 8 с, гойдання терезів ±7° 5 с, інші) | LessonArt | `rotationEffect` з `repeatForever(autoreverses:false)` / `autoreverses:true` на відповідних під-вьюшках |
| `.mcard.sel` (scale 1.03 + кільце 4px accent 22%) | Match, Sort | `scaleEffect` + `overlay(stroke)` з `Motion.ease(0.18)` |
| `.bar` ширина (прогрес) | QuizView | `Motion.ease(0.6)` |
| `prefers-reduced-motion` | усюди | `accessibilityReduceMotion` → без нескінченних анімацій, без конфеті, без затримок появи |

Усі переходи між екранами — стандартний push `NavigationStack`; Result замінює Quiz без «назад» (`navigationBarBackButtonHidden`, щоб не повертатись у завершений тест).

---

## 7. Компоненти

- **Ticker** (`Ticker.swift`): горизонтальна стрічка на фоні accentSoft із fade-краями 40pt; елементи «emoji **en** ua ✦», шрифт 15pt; порядок перемішаний при старті; швидкість як на сайті — `items.count * 8.4` с на один прохід; тап на елемент — `popover`/тост із повним перекладом (бо `title` на сайті). Реалізація через `TimelineView` + вимірювання ширини контенту (`GeometryReader`/`onGeometryChange`), контент дубльовано вдвічі.
- **FlipCard** (`FlipCard.swift`): сітка `LazyVGrid(columns: 2)` (на iPhone — 2 колонки, висота 150pt); лицьова: емодзі 44pt (floaty) + en жирний 15pt; зворот: accent-фон, білий ua жирний + приклад курсивом 13pt; тап — flip; `accessibilityLabel`.
- **PrimaryButton / GhostButton** стилі (`ButtonStyle`): primary — accent, білий текст, 16pt semibold; ghost — accentSoft/accent; disabled opacity .45.
- **ProgressBar**, **StreakBadge** (amber-капсула, hot — помаранчева), **FeedbackCard** (ok/bad soft-фон, `role: status` → `accessibilityAddTraits(.updatesFrequently)`), **ScoreRing**, **Confetti**.
- **BlockView**: switch по `Block`; `pair` → `VStack` карток із фоном bg, тег кольоровий (past red/present amber/future green); `chips` → `FlowLayout` (власний `Layout`) капсул accentSoft; `table` → `Grid` або власний рендер з `ScrollView(.horizontal)`; списки з маркерами «•» / номерами.

---

## 8. Ілюстрації уроків (`Art/`)

У `web/js/art.js` 8 inline-SVG 400×240 (персонажі, хмарки, годинник, терези, стрілки, емодзі) з класами кольорів теми й `float/pulse/animateTransform`. Перенести **кожну** як SwiftUI-вью на `Canvas`/`Shape`-примітивах (`RoundedRectangle`, `Circle`, `Path` для хвиль/волосся/сердечка, `Text` для підписів і емодзі), у координатній системі 400×240 через `GeometryReader` + `scaleEffect` (або `Canvas` з `context.scaleBy`). Анімовані групи — окремі `View` з модифікаторами з таблиці розділу 6. Кольори — із Theme, щоб працювала темна тема. Для `wrap` — фон accentSoft, радіус 26. Якщо для якогось елемента точне відтворення неможливе, замінити на близький за змістом примітив, але композицію й анімації зберегти. `LessonArt(id:)` повертає потрібну вью.

---

## 9. Типи завдань (`Quiz/QuestionViews/`) — поведінка 1:1 із сайтом

Загальний протокол: вью отримує `question` і замикання `finish(ok: Bool, userAnswer: String, correctText: String, wrongWhy: String?)`; після `finish` усе блокується (`disabled`).

1. **MC**: вертикальний стек кнопок-варіантів (card-фон, 1pt line, радіус 12, padding 17, текст 17pt, вирівняний ліворуч, багаторядковий). Тап: правильний варіант підсвічується ok (+pop), обраний неправильний — bad (+shake); `finish(ok, options[k], options[answer], no?[k])`.
2. **Fill**: `TextField` (17pt, рамка 2pt, placeholder «Ваша відповідь…», `autocorrectionDisabled`, `textInputAutocapitalization(.never)`, `submitLabel(.done)`), кнопка «Перевірити» (disabled, поки порожньо). Перевірка: `normalize()` = trim + lowercase + `’‘`→`'` + стиснути пробіли, збіг із будь-яким з `answers`. Поле фарбується ok/bad, Enter = перевірити.
3. **Order**: «Складіть речення з слів:» — зона `built` (пунктирна рамка, мін. висота 52) і `bank` (FlowLayout слів-капсул). Тап у банку — слово переходить у built (`matchedGeometryEffect` для переліту), тап у built — повертається. Кнопки «Перевірити» (enabled, коли всі слова) і «Скинути». Порівняння normalize-рядків.
4. **Pic**: сітка 2 колонки карток 16pt радіус: емодзі 56pt + підпис 14pt muted; popin з затримкою 90 мс × k; результат як у MC.
5. **Match**: hint; дві колонки (ліва: емодзі 34pt + підпис, права: тексти); вибір підсвічує `sel`; пара співпала → обидві `matched` з кольором `hue = k*62+20` (`Color(hue: ((k*62+20) % 360)/360, saturation: .65, brightness: .48)` для рамки і 14%-фон) + pop; не співпала → shake, `mistakes += 1`, лічильник «З'єднано: n / N» стає bad-кольору. Коли всі з'єднано → `finish(mistakes == 0, "помилок у парах: \(mistakes)", "l → r · …", nil)`. На вузькому екрані дві колонки по 50% з текстом 15pt, мін. висота картки 62.
6. **Sort**: hint; `pool` (пунктир) + кошики (`LazyVGrid` 1–2 колонки) з кольором `hue = bi*95+215`; тап на слово → sel, тап на кошик → перемістити; тап на розміщене — повернути. Плюс **drag-and-drop** через `draggable`/`dropDestination` (Transferable String = id) — на сайті є перетягування. «Перевірити» — коли pool порожній; результат: ok/bad на кожному чипі, shake на bad; тексти `userAnswer/correctText/wrongWhy` формуються як на сайті («Помилково розміщено: «x» має бути в групі «y»; …»).
7. **GapBank**: hint; нумерований список речень, де `___` → капсула-«gap» (пунктирне підкреслення accent, min width 92, filled — bold + pop); банк слів. Тап слова → перше вільне місце; тап заповненого gap → повернути. «Перевірити» — коли всі заповнені; порівняння normalize по індексу; bad — shake. Речення рендеряться `Text` + inline-вью: реалізувати як `FlowLayout` з токенів (слова речення як `Text`, gap як кнопка), щоб переносилося по рядках.

`QuizEngine.finish()` рахує streak (ok ? +1 : 0), score, `wrong.append(...)`, формує FeedbackCard із `why`.

---

## 10. Доступність і читабельність

- Dynamic Type до `.accessibility2` без обрізань (`minimumScaleFactor` не використовувати для основного тексту; FlowLayout і `LazyVGrid` адаптуються).
- Кольорові стани дублюються іконками ✓/✗ і текстом.
- `accessibilityLabel` на емодзі-картках, ring, ticker; `accessibilityHidden` на декоративних ілюстраціях (`role="img"` aria-label з SVG → label).
- Світла/темна тема автоматично за системою (кольори в Assets).
- Portrait only; safe area; клавіатура не перекриває поле Fill (`ScrollViewReader` + `scrollTo` при фокусі).

---

## 11. Порядок реалізації (мілстоуни, кожен — окремий коміт)

1. `web/` копія сайту + `tools/export-content.mjs` + `Content.json` (перевірка статистики: 8 уроків, 40 версій, кількість питань = сумі в JS; секції: 1 → 11 у trial тощо).
2. Xcode-проєкт (`project.pbxproj`, App, Assets з кольорами, Theme, Motion), `ContentStore`, `ProgressStore`, `RichText`, `BlockView`.
3. HomeView + LessonCard + Ticker + Reset; LessonView з усіма блоками, FlipCards, DisclosureGroup, картинки конспектів.
4. QuizEngine + MC, Fill, Order + FeedbackCard, ProgressBar, StreakBadge, переходи.
5. Pic, Match, Sort (з DnD), GapBank.
6. ResultView: ScoreRing, лічильник, медаль, конфеті, помилки, збереження прогресу.
7. 8 ілюстрацій `Art/` з анімаціями.
8. Reduce-motion, haptics, доступність, README.

---

## 12. Перевірка

**На Linux (агент):**
- `node tools/export-content.mjs` → без помилок; статистика збігається з сайтом (питання за типами: mc/fill/order/pic/match/sort/gapbank; усі 12 картинок скопійовано); `jq` перевіряє, що в жодному `text` немає залишкових `<`/`>` тегів.
- Swift toolchain для Linux (`swift.org` tarball або `swiftly`): `swiftc -parse` (або `-typecheck` з заглушками недоступних iOS-API неможливий — обмежитись `-parse`) на всіх файлах `EnglishNotebook/**/*.swift`; `plutil`-еквівалент: `python3 -c "import plistlib"` для Info-ключів; pbxproj — валідний OpenStep-формат (перевірка парсером `pbxproj` npm-пакета або ручним read-through).

**На Mac (користувач), описано в README:**
1. `git clone`, відкрити `EnglishNotebook.xcodeproj`, у Signing & Capabilities обрати свій Personal Team (Apple ID), змінити bundle id, якщо зайнятий.
2. Підключити iPhone, увімкнути Developer Mode (Settings → Privacy & Security), вибрати пристрій, ⌘R; на телефоні довірити розробнику (Settings → General → VPN & Device Management).
3. Чеклист ручної перевірки: Home показує 8 карток з ілюстраціями й анімацією появи; ticker біжить і зупиняється при утриманні; flip-картки перевертаються; кожен із 7 типів завдань проходиться (знайти в уроці trial усі 7: mc, fill, order, match, gapbank, pic, sort); streak з'являється при 2 поспіль; результат ≥ 70% → конфеті й кільце; прогрес видно на Home після перезапуску; reset у два тапи; темна тема; Dynamic Type «Larger Text»; Reduce Motion вимикає нескінченні анімації.
4. Безкоштовний профіль діє 7 днів — після цього перезапустити з Xcode (зазначити в README); для TestFlight знадобиться Apple Developer Program.
