// Урок 5: Chunks in the Present Simple.
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.chunks).
const CHUNKS_V1 = /*V1_START*/[
  M("Anna is responsible ___ the studio's budget.", ["for", "of", "at"], 0,
    "Chunk: responsible FOR + що саме. Прийменник for «приклеєний» до прикметника responsible.",
    "In charge OF — це інший chunk; після responsible потрібен саме for.",
    "At вживається в chunks good at / terrible at (уміння), а не responsible."),

  F("Max is in charge ___ user acquisition.", "of",
    "Chunk in charge OF: відповідальний за щось. Інший прийменник тут не підходить."),

  P("Яка картинка відповідає реченню «Olga is good at drawing»?",
    [["🎨👩‍🎨", "Ольга вміє добре малювати"], ["😩💤", "Ольга втомилася"], ["😰📅", "Ольга хвилюється через дедлайн"]], 0,
    "Good at + -ing означає, що людина вміє щось добре робити. Drawing — це малювання, тому підходить картинка з пензлем і палітрою.",
    "Втому передає chunk tired of, а не good at.",
    "Хвилювання через дедлайн — це worried about; у реченні йдеться про вміння малювати."),

  M("Яке речення правильне?",
    ["Max is always interested in new ad formats.", "Max always is interested in new ad formats.", "Max does always interested in new ad formats."], 0,
    "З дієсловом be прислівник частоти стоїть ПІСЛЯ нього: is always interested.",
    "З be прислівник ставимо після is, а не перед ним: is always, а не always is.",
    "Do/does тут зайве: be не потребує допоміжного дієслова, а після does був би інфінітив, а не прикметник."),

  O("Olga is never tired of drawing icons.",
    "З be прислівник стоїть після нього (is never), далі chunk tired of + дієслово з -ing (drawing)."),

  F("Olga is terrible at ___ emails. (write)", "writing",
    "Після прийменника at дієслово має форму -ing. Write закінчується на -e, тож відкидаємо e: writing."),

  MA("Поєднайте переклад із chunk:", [
    ["🛡️", "відповідати за", "responsible for"],
    ["🏆", "пишатися", "proud of"],
    ["😟", "хвилюватися через", "worried about"],
    ["😩", "втомитися від", "tired of"],
    ["🎨", "добре вміти", "good at"],
    ["🔎", "цікавитися", "interested in"]],
    "Кожен chunk має свій постійний прийменник: responsible for, proud of, worried about, tired of, good at, interested in. Їх треба вчити разом."),

  M("Ivan is tired of ___ the same bugs.", ["fix", "fixing", "fixes"], 1,
    "Після прийменника of дієслово має форму -ing: tired of fixing.",
    "Після прийменника не можна ставити базову форму: потрібне -ing.",
    "Форма з -s (fixes) вживається лише після he/she/it як перше дієслово, а не після прийменника."),

  G("Оберіть прийменник до кожного chunk:", ["for", "of", "in", "at", "about"],
    ["Who is responsible ___ the release schedule?", "Ivan is interested ___ game analytics.", "Olga is bad ___ planning.", "Our producer is never worried ___ deadlines.", "Max is tired ___ endless meetings."],
    ["for", "in", "at", "about", "of"],
    "Кожен прикметник має свій прийменник у chunk: responsible for, interested in, bad at, worried about, tired of."),

  F("Olga usually ___ to finish the icons before lunch. (try)", "tries",
    "Прислівник usually стоїть перед дієсловом, а змінюється лише перше дієслово. Try: приголосна + y → ies: tries."),

  M("Яке заперечення правильне до речення «Max is tired of testing new ads»?",
    ["Max isn't tired of testing new ads.", "Max doesn't be tired of testing new ads.", "Max don't tired of testing new ads."], 0,
    "Be утворює заперечення сам: is + not = isn't. Допоміжне do/does не потрібне.",
    "Be не вживається з doesn't; заперечення утворюється як isn't.",
    "Don't не підходить для he/she/it, а прикметник tired потребує дієслова be (is), тому заперечення будується через isn't."),

  O("Anna usually decides to hire new people.",
    "Зі звичайним дієсловом прислівник стоїть перед ним: usually decides. -s отримує лише перше дієслово (decides), а після to йде інфінітив hire."),

  SO("Правильно чи помилка?", ["Correct", "Mistake"], [
    ["Olga is always proud of her icons.", 0],
    ["Olga always is proud of her icons.", 1],
    ["Ivan never tries to skip tests.", 0],
    ["Ivan never try to skip tests.", 1],
    ["Anna doesn't be proud of the release.", 1],
    ["Anna is responsible for hiring people.", 0],
    ["Anna is responsible for hire people.", 1],
    ["Is Max interested in ads?", 0]],
    "З be прислівник стоїть після нього; після he/she/it потрібне -s у першого дієслова; be не потребує doesn't; після прийменника йде -ing."),

  P("Яка картинка відповідає реченню «The team is proud of the game»?",
    [["🏆🎮🎉", "Команда пишається грою"], ["😟💥📱", "Команда хвилюється через збої"], ["😩🐛", "Команда втомилася виправляти баги"]], 0,
    "Proud of означає «пишатися». Нагорода, гра й святкування передають гордість за результат.",
    "Хвилювання через збої — це worried about, а не proud of.",
    "Утому від виправлення багів передає tired of, а не proud of."),

  M("Are you worried about the deadline? — No, ___.", ["I'm not", "I don't", "I aren't"], 0,
    "У короткій відповіді повторюємо be із питання: Are you…? — No, I'm not (I am not).",
    "Питання почалося з Are, тому відповідь теж з be, а не з do.",
    "Aren't вживається з you/we/they; з I у запереченні кажемо I'm not (am not)."),

  F("Does Ivan ___ to test every build? (need)", "need",
    "Після does дієслово стоїть у базовій формі без -s: Does Ivan need…? Закінчення -s уже стоїть у does, тому до need його не додаємо.")
]/*V1_END*/;

LESSONS.push({
  id: "chunks",
  title: "Chunks in the Present Simple",
  short: "Chunks · Present Simple",
  subtitle: "Урок 5 · be + прикметник + прийменник + -ing",
  summary: "Фрази-блоки responsible for, in charge of, tired of, proud of, interested in, good at, worried about; -ing після прийменника; прислівник з be та з іншими дієсловами; заперечення й питання.",
  sections: [
    { title: "Коротко про головне", html: `
      <p><b>Chunk</b> — готовий «блок» слів, який вчимо разом: <b>is tired of</b>, <b>are proud of</b>, <b>am good at</b>. Прийменник — частина блоку, а після нього дієслово стоїть у формі <b>-ing</b>: tired of <b>cooking</b>.</p>
      <p>Прислівники частотності (always, usually, never…) стоять <b>після be</b> (She <b>is always</b> responsible…) і <b>перед іншими дієсловами</b> (He <b>never tries</b>…). Be має власні заперечення й питання: <b>isn't</b>, <b>Is she…?</b> — без do/does.</p>` },
    { title: "Notice the chunks in bold", html: `
      <p>Pixel Orchard is a small mobile game studio. Anna is the producer. She is <b>responsible for</b> the studio's budget and <b>for</b> hiring new people. Max is <b>in charge of</b> user acquisition, and he is always <b>interested in</b> new ad formats. Olga designs the game icons. She is very <b>good at</b> drawing, but she is <b>terrible at</b> writing emails. Ivan tests every build. He is sometimes <b>worried about</b> crashes and <b>tired of</b> fixing the same bugs. After a good release, the whole team is <b>proud of</b> the game.</p>` },
    { title: "Схема chunk-ів", html: `
      <table><tr><th>am / is / are</th><th>прикметник</th><th>прийменник</th><th>далі</th></tr>
      <tr><td rowspan="8"><b>am<br>is<br>are</b></td><td>responsible</td><td><mark>for</mark></td><td rowspan="8">+ <b>-ing</b><br><small>cooking, sending, learning, missing…</small></td></tr>
      <tr><td>in charge</td><td><mark>of</mark></td></tr>
      <tr><td>tired</td><td><mark>of</mark></td></tr>
      <tr><td>proud</td><td><mark>of</mark></td></tr>
      <tr><td>interested</td><td><mark>in</mark></td></tr>
      <tr><td>good / terrible / bad</td><td><mark>at</mark></td></tr>
      <tr><td>worried</td><td><mark>about</mark></td></tr>
      <tr><td colspan="2"><small>Прийменник не міняємо: він «прикутий» до прикметника.</small></td></tr></table>` },
    { title: "Recall: Prepositions", html: `
      <ol>
        <li>Anna is responsible <mark>for</mark> the release schedule.</li>
        <li>Max is tired <mark>of</mark> endless meetings.</li>
        <li>Who is in charge <mark>of</mark> the new campaign?</li>
        <li>Olga's parents are proud <mark>of</mark> her.</li>
        <li>Ivan is interested <mark>in</mark> game analytics.</li>
        <li>Our producer is never worried <mark>about</mark> deadlines.</li>
        <li>Olga is good <mark>at</mark> drawing, but bad <mark>at</mark> planning.</li></ol>
      <div class="pair">
        <div><b>IS</b> he interested in…?<br>Yes, he <b>IS</b>. / No, he <b>ISN'T</b>.</div>
        <div><b>ARE</b> you interested in…?<br>Yes, I <b>AM</b>. / No, I<b>'M NOT</b>.</div>
      </div>` },
    { title: "Verb forms: дієслово → -ing", html: `
      <ol>
        <li>Anna is tired of <mark>cooking</mark> (cook) every day.</li>
        <li>I am responsible for <mark>sending</mark> (send) the weekly report.</li>
        <li>Max is interested in <mark>learning</mark> (learn) data analysis.</li>
        <li>They are worried about <mark>missing</mark> (miss) the deadline.</li></ol>
      <p>Подвоєння приголосної: plan → <b>planning</b>, control → <b>controlling</b>. Без -e: write → <b>writing</b>, release → <b>releasing</b>.</p>` },
    { title: "Analyze and answer the questions", html: `
      <p><b>Set A</b></p>
      <ul><li>She is <u>always</u> responsible for cooking in our family.</li><li>Max is <u>never</u> tired of testing new ads.</li><li>Our team is <u>usually</u> in charge of releasing the notes.</li><li>I am <u>sometimes</u> worried about missing deadlines.</li></ul>
      <p><b>Set B</b></p>
      <ul><li>He <u>never</u> tries to learn anything new.</li><li>Our manager <u>always</u> plans to launch updates on Mondays.</li><li>We <u>usually</u> decide to test two versions first.</li><li>Maria <u>often</u> needs to work late before a release.</li></ul>
      <p><b>Set C</b></p>
      <ul><li>Max isn't tired of testing new ads.</li><li>Is she responsible for the budget?</li><li>He doesn't try to learn anything new.</li><li>Does Maria need to work late?</li></ul>
      <ol>
        <li>Where is the frequency adverb in Set A? And in Set B?</li>
        <li>Which word comes right before the adverb in A? Which comes right after it in B?</li>
        <li>In Set B, which verbs end in -s? Does the second verb ever take -s?</li>
        <li>In Set C, why isn't it «doesn't be» in sentence 1?</li>
        <li>What comes after a preposition in Set A?</li></ol>
      <details><summary>Показати відповіді</summary>
        <ol>
          <li>Set A: <b>після</b> be (is always, is never, is usually, am sometimes). Set B: <b>перед</b> основним дієсловом (never tries, always plans, usually decide, often needs).</li>
          <li>У A перед прислівником стоїть <b>be</b> (is / am). У B одразу після прислівника йде <b>основне дієслово</b>.</li>
          <li>-s мають <b>tries, plans, needs</b> (he / manager / Maria). <b>Decide</b> — без -s, бо we. Друге дієслово (learn, launch, test, work) <b>ніколи</b> не отримує -s.</li>
          <li>Be утворює власне заперечення: <b>isn't</b>. Do/does потрібні лише зі звичайними дієсловами.</li>
          <li>Після прийменника — форма <b>-ing</b>: cooking, testing, releasing, missing.</li></ol></details>` },
    { title: "RULE", html: `
      <ul>
        <li>З <b>be</b> прислівник стоїть <b>після</b> нього: She <b>is always</b> responsible for cooking.</li>
        <li>З іншими дієсловами прислівник стоїть <b>перед</b> ними: He <b>never tries</b> to learn anything new.</li>
        <li>Змінюється лише <b>перше</b> дієслово: tries to learn, doesn't try to learn.</li>
        <li><b>Be</b> утворює власні заперечення й питання: isn't, Is she…? (без do/does).</li>
        <li>Прийменник належить до chunk (responsible FOR cooking, tired OF learning, in charge OF controlling) і після нього йде <b>-ing</b>.</li></ul>` },
    { title: "Speaking", html: `
      <ol>
        <li>What are you responsible for at work? What are you in charge of?</li>
        <li>What are you good at? What are you terrible at?</li>
        <li>What are you tired of doing at work?</li>
        <li>What are you proud of this month?</li>
        <li>Is there anything you are worried about missing?</li></ol>
      <p class="hint">Відповідайте повними реченнями: <i>I'm good at … -ing</i>, <i>I'm usually tired of … -ing</i>.</p>` },
    { title: "Оригінальні матеріали", html: `<p class="source-note">Ваші нотатки з уроку.</p><details><summary>Показати сторінку уроку</summary><div class="source-images"><a href="assets/lesson-source-8.webp" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-8.webp" alt="Оригінальні нотатки: урок 5"></a></div></details>` }
  ],
  quiz: CHUNKS_V1
});
