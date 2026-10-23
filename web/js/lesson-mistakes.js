// Тренажер «My Mistakes Lab»: вправи на типові помилки, знайдені в записах уроків 5–9.
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.mistakes).
const MISTAKES_V1 = /*V1_START*/[
  L("I am responsible for the budget.",
    ["I am responsible of the budget.", "I responsible for the budget.", "I am responsible for the budget."],
    2,
    "Responsible — це прикметник, тому потрібне be (I am), а прийменник після нього — for. Слухайте: am на початку і for перед the budget.",
    "Responsible of — помилка: з responsible вживаємо for (responsible for), а of стоїть у виразі in charge of.",
    "У цьому реченні немає am: responsible — прикметник, і перед ним потрібне дієслово be (I am responsible)."),
  L("Does he work late on Fridays?",
    ["Does he works late on Fridays?", "Does he work late on Fridays?", "Do he work late on Fridays?"],
    1,
    "З he вживаємо does, а після does основне дієслово стоїть без -s: does he work. Слухайте: does на початку і work без закінчення.",
    "Does he works — зайве -s: -s уже міститься в does, тому після нього дієслово без закінчення (work).",
    "Do he — помилка: з he/she/it потрібне does, а do вживаємо з I/you/we/they."),
  R("Does she live in Kyiv?",
    ["Yes, she is.", "Yes, she does.", "Yes, she do."],
    1,
    "Коротка відповідь повторює допоміжне слово з питання: Does she...? — Yes, she does. Слухайте перше слово питання.",
    "Yes, she is — помилка: питання починається з does (live — дієслово дії), тому і відповідь з does, а не з is.",
    "Yes, she do — з she потрібне does, а do вживаємо лише з I/you/we/they."),
  R("Are you interested in sport?",
    ["No, I don't.", "No, I aren't.", "No, I'm not."],
    2,
    "Питання починається з are (interested — прикметник), тому відповідаємо з be: No, I'm not. З I форма be — am: I'm not.",
    "No, I don't — помилка: питання починається з are, тому в короткій відповіді не можна використовувати don't.",
    "No, I aren't — така форма не існує: з I вживаємо am, тому правильно I'm not."),
  D("I do my homework after dinner.",
    ["I do my homework after dinner."],
    "Homework вживається з дієсловом do: do homework, а не make. Слухайте дієслово do і слово homework."),
  M("Оберіть правильне питання:",
    ["How many people works in your company?", "How many people work in your company?", "How many people does work in your company?"],
    1,
    "People — це множина (вони), тому дієслово без -s: people work. Закінчення -s потрібне лише з he/she/it.",
    "People — множина, тому works з -s тут неправильне: потрібне work.",
    "Does тут зайве: у питанні з How many people... підмет people стоїть перед дієсловом, а does разом з work створює подвійне дієслово."),
  M("Яке речення звучить природно?",
    ["I often have the same mistake in this exercise.", "I often make the same mistake in this exercise.", "I often do the same mistake in this exercise."],
    1,
    "Помилки не «мають» і не «виконують», а роблять: make a mistake. Це стале словосполучення, його потрібно вчити разом.",
    "Have a mistake — калька з української; англійською кажемо make a mistake.",
    "Do a mistake — неправильне словосполучення: do вживаємо з homework, work, exercises, а з mistake — лише make."),
  M("Оберіть речення про минуле:",
    ["Two weeks ago I speak with a tourist in Lviv.", "Two weeks ago I spoke with a tourist in Lviv.", "Two weeks ago I am speaking with a tourist in Lviv."],
    1,
    "Слово ago вказує на минулий час, тому потрібен Past Simple: speak — spoke.",
    "Speak — це Present Simple, а з two weeks ago потрібен Past Simple (spoke).",
    "Am speaking — це теперішній тривалий час, який не поєднується з two weeks ago; потрібне spoke."),
  F("I'm hopeless ___ cooking.",
    "at",
    "Після hopeless (як і після good, bad, terrible) вживаємо прийменник at: hopeless at cooking.",
    "Після hopeless потрібен прийменник at (hopeless at), а in і інші прийменники тут не підходять."),
  F("How ___ electricity do you use at home?",
    "much",
    "Electricity — незлічуваний іменник, тому питаємо How much, а не How many.",
    "З незлічуваним іменником electricity вживаємо much; many — лише зі злічуваними іменниками у множині."),
  O("How does my new player work?",
    "У питанні з How потрібне does перед підметом, а основне дієслово стоїть без -s: How does my player work?"),
  MA("З’єднайте питання з правильною короткою відповіддю:",
    [["☕", "Do you like tea?", "Yes, I do."],
     ["😴", "Are you tired?", "No, I'm not."],
     ["♟️", "Does he play chess?", "Yes, he does."],
     ["🏠", "Do they live here?", "No, they don't."],
     ["🌧️", "Is it cold today?", "Yes, it is."]],
    "Коротка відповідь повторює допоміжне слово з питання: do — do, does — does, are — am/are, is — is."),
  SO("Яке слово потрібне на початку питання?",
    ["Is / Are", "Do / Does"],
    [["___ your flat large?", 0],
     ["___ you late for work?", 0],
     ["___ he work late?", 1],
     ["___ your boss check emails?", 1],
     ["___ they worried about the exam?", 0],
     ["___ she play tennis?", 1]],
    "Якщо в питанні є дієслово дії (work, check, play), потрібне do/does. Якщо є прикметник (large, late, worried), потрібне is/are."),
  G("Заповніть пропуски у запереченнях:",
    ["isn't", "doesn't", "aren't", "don't"],
    ["My sister ___ eat meat.", "You ___ responsible for the budget.", "I ___ like loud music.", "Our flat ___ large."],
    ["doesn't", "aren't", "don't", "isn't"],
    "З дієсловом дії заперечення будуємо через do/does + not (don't з I, doesn't з she). З прикметником — через be + not (aren't з you, isn't з flat).")
]/*V1_END*/;

const mistakeRows = rows => `<table class="mtable"><tr><th>Як було</th><th>Як правильно</th></tr>${rows.map(([bad, good]) => `<tr><td><s>${bad}</s></td><td><mark>${good}</mark></td></tr>`).join("")}</table>`;

LESSONS.push({
  id: "mistakes",
  title: "My Mistakes Lab",
  short: "My mistakes",
  subtitle: "Тренажер ваших типових помилок · вправи зі звуком",
  summary: "Вправи на помилки, які повторюються у ваших записах уроків 5–9: допоміжні слова, короткі відповіді, прийменники, be, порядок слів у питаннях, артиклі. У тестах є вправи зі звуком.",
  sections: [
    { title: "Як це працює", html: `
      <p>Я розшифрував записи ваших занять (уроки 5–9) і знайшов <b>146 місць</b>, де повторюються схожі помилки. Нижче вони розкладені на 9 груп — від найчастіших до найрідших. Усі приклади — ваші власні фрази з уроків, поруч правильний варіант і коротке правило.</p>
      <p class="hint">Розшифровка автоматична, тож окремі фрази могли бути записані трохи інакше, ніж ви їх сказали. Для тренування це не заважає: правила працюють для всіх схожих речень.</p>
      <ol>
        <li>Перегляньте групи помилок нижче (кожна — таблиця «було → стало»).</li>
        <li>Пройдіть тест: у ньому <b>5 звукових вправ</b> — «Слухати й обрати», «Питання → коротка відповідь» і диктант. Кнопка 🔊 читає речення вголос, 🐢 — повільніше. Голоси різні (чоловічі й жіночі, американські й британські).</li>
        <li>Кожна відповідь має пояснення, чому саме так. Повторюйте вголос — це допомагає краще, ніж просто читати.</li></ol>` },
    { title: "Ваш рейтинг помилок", html: `
      <table class="mtable"><tr><th>Група</th><th>Скільки разів</th><th>Типовий приклад</th></tr>
        <tr><td>1. do / does і дієслово без -s</td><td><b>31</b></td><td><s>Does he works late?</s></td></tr>
        <tr><td>2. Підбір слів і сполучень</td><td><b>25</b></td><td><s>make homework</s> → do homework</td></tr>
        <tr><td>3. Прийменники</td><td><b>18</b></td><td><s>tired in</s> → tired of</td></tr>
        <tr><td>4. Артиклі, множина, much / many</td><td><b>16</b></td><td><s>I have problem</s> → a problem</td></tr>
        <tr><td>5. Короткі відповіді Yes / No</td><td><b>16</b></td><td><s>Do you…? — Yes, I am.</s></td></tr>
        <tr><td>6. Порядок слів у питанні</td><td><b>13</b></td><td><s>What means dish?</s></td></tr>
        <tr><td>7. Пропущене be</td><td><b>11</b></td><td><s>I responsible for…</s></td></tr>
        <tr><td>8. Час: минулий чи теперішній</td><td><b>9</b></td><td><s>I study 20 years ago</s></td></tr>
        <tr><td>9. Заперечення</td><td><b>7</b></td><td><s>she isn't usually answer</s></td></tr></table>` },
    { title: "1 · do / does і дієслово без -s", html: `
      ${mistakeRows([
        ["Does he works late?", "Does he work late?"],
        ["Do your boss check your work?", "Does your boss check your work?"],
        ["How often does I go to the office?", "How often do I go to the office?"],
        ["I wants to move.", "I want to move."],
        ["I never tries.", "I never try."],
        ["Why do you are late?", "Why are you late?"]])}
      <p><b>Правило:</b> закінчення <b>-s</b> лише для he / she / it і лише <b>один раз</b>: або в допоміжному does (Does he work?), або на дієслові (He works). Після do / does дієслово завжди базове. З I, you, we, they — тільки do.</p>
      <p><b>Прийом:</b> do / does і be (am / is / are) ніколи не стоять разом в одному питанні.</p>` },
    { title: "2 · Підбір слів і сполучень", html: `
      ${mistakeRows([
        ["a more good idea", "a better idea"],
        ["my most (dish)", "my favourite dish"],
        ["How do you do at work?", "What do you do at work?"],
        ["I make homework.", "I do homework."],
        ["I have the same mistake.", "I make the same mistake."],
        ["tired of work late", "tired of working late"],
        ["I even don't remember.", "I don't even remember."],
        ["grammatics", "grammar"]])}
      <p><b>Правило:</b> <b>do</b> — домашка, роботу, вправи; <b>make</b> — помилки, презентації, рішення. Після прийменника (of, at, in) дієслово має форму -ing. Good → better (не more good).</p>` },
    { title: "3 · Прийменники", html: `
      ${mistakeRows([
        ["tired in / tired from", "tired of"],
        ["responsible of", "responsible for"],
        ["good in cooking / hopeless in", "good at cooking / hopeless at"],
        ["it's hard to me", "it's hard for me"],
        ["English in a high level", "English at a high level"],
        ["I have on five o'clock meeting", "I have a meeting at five o'clock"],
        ["do something in your phone", "do something on your phone"]])}
      <div class="chips"><span class="chip">tired of</span><span class="chip">responsible for</span><span class="chip">good / bad / hopeless at</span><span class="chip">interested in</span><span class="chip">worried about</span><span class="chip">afraid of</span><span class="chip">proud of</span><span class="chip">in charge of</span></div>
      <p><b>Прийом:</b> вчіть прийменник разом зі словом, як одне ціле: <b>tired of</b>, а не просто «tired».</p>` },
    { title: "4 · Артиклі, множина, much / many", html: `
      ${mistakeRows([
        ["I have problem with that.", "I have a problem with that."],
        ["I want to know answer.", "I want to know the answer."],
        ["I make presentation.", "I make a presentation."],
        ["I have many responsibility.", "I have many responsibilities."],
        ["many electricity", "much electricity"],
        ["I don't have office.", "I don't have an office."]])}
      <p><b>Правило:</b> перед злічуваним іменником в однині потрібен <b>a / an</b> (або the, якщо ми знаємо який саме). <b>Many</b> + злічуване множина (many people), <b>much</b> + незлічуване (much water, much electricity).</p>` },
    { title: "5 · Короткі відповіді Yes / No", html: `
      ${mistakeRows([
        ["Do you work on Sunday? — Yes, I am.", "Yes, I do."],
        ["Are you busy? — No, I don't.", "No, I'm not."],
        ["Does she work late? — Yes, she is.", "Yes, she does."],
        ["Do they like it? — Yes, they does.", "Yes, they do."],
        ["Is it big? — No, is not.", "No, it isn't."]])}
      <p><b>Правило:</b> перше слово питання = останнє слово відповіді: <b>Do</b> you…? — Yes, I <b>do</b>. <b>Are</b> you…? — No, I'm <b>not</b>. <b>Does</b> she…? — Yes, she <b>does</b>. Не пропускайте підмет: No, <b>it</b> isn't.</p>` },
    { title: "6 · Порядок слів у питанні", html: `
      ${mistakeRows([
        ["What means dish?", "What does “dish” mean?"],
        ["How work my player?", "How does my player work?"],
        ["What is interested Olga in?", "What is Olga interested in?"],
        ["Why you give your money?", "Why do you give your money?"],
        ["What exactly he don't like?", "What exactly doesn't he like?"]])}
      <p><b>Формула:</b> (Wh-слово) + <b>допоміжне слово</b> + підмет + дієслово. Допоміжне слово завжди стоїть <b>перед підметом</b>; у звичайних дієсловах без нього не обійтися.</p>` },
    { title: "7 · Пропущене be", html: `
      ${mistakeRows([
        ["I responsible for visual effects.", "I am responsible for visual effects."],
        ["Yes, I busy this week.", "Yes, I am busy this week."],
        ["We worried about this.", "We are worried about this."],
        ["He bad at drawing.", "He is bad at drawing."],
        ["Do your flat large?", "Is your flat large?"]])}
      <p><b>Правило:</b> прикметник або chunk (busy, tired of, responsible for) завжди потребує <b>am / is / are</b>. В українській «я зайнятий» — без дієслова, а в англійській обов'язково <b>I'm busy</b>.</p>` },
    { title: "8 · Час: минулий чи теперішній", html: `
      ${mistakeRows([
        ["I study it more than 20 years ago.", "I studied it more than 20 years ago."],
        ["Two weeks ago I speak with an American.", "Two weeks ago I spoke with an American."],
        ["He understand my bad English.", "He understood my bad English."],
        ["Tom is paying the bills on the first of the month.", "Tom pays the bills on the first of the month."]])}
      <p><b>Правило:</b> слова <b>ago, yesterday, last week</b> вимагають Past Simple (studied, spoke, understood). Звичка чи регулярна дія — Present Simple (Tom pays).</p>` },
    { title: "9 · Заперечення", html: `
      ${mistakeRows([
        ["She isn't usually answer emails.", "She doesn't usually answer emails."],
        ["You don't responsible for the budget.", "You aren't responsible for the budget."],
        ["Aren't like loud music.", "Don't like loud music."]])}
      <p><b>Правило:</b> з дієсловом — <b>do / does + not</b> (doesn't answer, don't like); з прикметником чи chunk — <b>be + not</b> (aren't responsible). Не змішуйте їх.</p>` }
  ],
  quiz: MISTAKES_V1
});
