// Урок 9: Questions in Present Simple (практика, follow-up питання, інтерв'ю).
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.questions2).
const QUESTIONS2_V1 = /*V1_START*/[
  M("Яке питання правильне?", ["Is your boss work late?", "Does your boss work late?", "Do your boss works late?"], 1,
    "Work — звичайне дієслово, тому питання будуємо з does + підмет + базова форма: Does your boss work late? (boss — він, тож does).",
    "Is — це форма be, її не можна поєднувати зі звичайним дієсловом work: потрібне does.",
    "Do вживаємо з I/you/we/they; boss — однина (he), тому does, а дієслово після нього без -s: work."),

  M("Оберіть правильне питання:", ["Do you tired of the noise?", "Are you tired of the noise?", "Does you tired of the noise?"], 1,
    "Tired of — це chunk (прикметник + прийменник), тому з ним потрібне be: Are you tired of the noise?",
    "Do ставимо перед звичайним дієсловом; tired — прикметник, а не дієслово, тому потрібне be.",
    "Does вживаємо з he/she/it, а з you потрібне are; до того ж tired — прикметник, тож допоміжне слово тут be."),

  M("Яке питання про команду правильне?", ["Where your team works?", "Where does your team work?", "Where does your team works?"], 1,
    "Питання з Wh-словом і звичайним дієсловом: Where + does + підмет + базова форма: Where does your team work?",
    "Допоміжне слово does пропущене: у питанні воно стоїть перед підметом (Where does your team ...?), а -s після підмета не потрібне.",
    "Після does дієслово лишається в базовій формі: work, а не works — does уже показує 3-тю особу."),

  M("Яке питання про Olga правильне?", ["What Olga is interested in?", "What is Olga interested in?", "What does Olga interested in?"], 1,
    "Interested in — chunk з be, тому порядок такий: What + is + Olga + interested in? Прийменник in лишається в кінці.",
    "У питанні допоміжне слово стоїть перед підметом: is Olga, а не Olga is.",
    "Does ставимо перед звичайним дієсловом; interested — прикметник, тож потрібне is."),

  M("Яке питання про Anna правильне?", ["Does Anna is the boss?", "Is Anna the boss?", "Do Anna be the boss?"], 1,
    "Після be питання будуємо перестановкою: Anna is the boss → Is Anna the boss? Does тут зайве.",
    "Does і is разом не вживаємо: у питанні лише одне допоміжне слово — is.",
    "Be не потребує do: її самої достатньо, а Anna — це she, тому is, а не do."),

  M("Which question is correct?", ["Is Max usually works late?", "Does Max usually work late?", "Does Max usually works late?"], 1,
    "Work — звичайне дієслово, тому питання з does: Does Max usually work late? Прислівник usually стоїть перед дієсловом.",
    "Is не поєднується з дієсловом works; потрібне does + базова форма work.",
    "Після does дієслово має форму без -s: work. Форма works — помилка."),

  F("How often ___ he look for a new job?", "does",
    "Look for — звичайне дієслово, а he — 3-тя особа, тому допоміжне слово does: How often does he look for a new job?"),

  F("What ___ you tired of?", "are",
    "Tired of — chunk з be, а з you вживаємо are: What are you tired of? Прийменник of лишається в кінці."),

  O("When do you finish work?",
    "Порядок у питанні: питальне слово + допоміжне слово (do) + підмет + дієслово в базовій формі."),

  O("What is Olga interested in?",
    "Питання з be: питальне слово + is + підмет + interested in; прийменник in залишається в кінці питання."),

  MA("З'єднайте питання з відповіддю:", [
    ["🎬", "Are you responsible for visual effects?", "Yes, I am."],
    ["🌙", "Do you work on Sunday?", "No, I don't."],
    ["📅", "When does your boss usually work late?", "On Thursday."],
    ["🧑‍💼", "Does Anna want to hire one more person?", "Yes, she does."],
    ["✉️", "What are you tired of?", "Writing emails."]
  ], "Питання з Are → Yes, I am; питання з Do → No, I don't; When → час (On Thursday); Does Anna ...? → Yes, she does; What ... tired of → предмет (writing emails)."),

  SO("Розсортуйте follow-up питання:", ["Wh-питання (Why / What / How often)", "Питання «так / ні»"], [
      ["Why are you self-employed?", 0],
      ["How often does he work late?", 0],
      ["What exactly do they hate about early mornings?", 0],
      ["Don't you like teamwork?", 1],
      ["Does he look for a new job?", 1],
      ["Are you on a diet?", 1]
    ],
    "Wh-питання починаються з питального слова (Why, How often, What exactly) і потребують розгорнутої відповіді. Питання з Do/Does/Are/Is (Don't you ...?, Does he ...?, Are you ...?) відповідаємо Yes або No."),

  G("Оберіть слово Do / Does / Is / Are:", ["Do", "Does", "Is", "Are", "Am"], [
    "___ your partner look for a new job?",
    "___ you self-employed?",
    "___ your friends hate early mornings?",
    "___ your mum interested in learning something new?"
  ], ["Does", "Are", "Do", "Is"],
    "Look for і hate — звичайні дієслова: Does + your partner (він), Do + your friends (вони). Self-employed та interested in — прикметник і chunk, тому be: Are you, Is your mum."),

  M("У таблиці про колег: Mary — Kyiv. Як запитати, де живе Sam?", ["Where does Sam live?", "Where Sam lives?", "Where is Sam live?"], 0,
    "Live — звичайне дієслово, тому Where + does + Sam + live? Після does — базова форма без -s.",
    "Пропущено допоміжне слово does: у питанні воно стоїть перед підметом, а -s після нього не потрібне.",
    "Is не поєднується зі звичайним дієсловом live; потрібне does."),

  M("Sam is tired of answering messages. Як запитати те саме про Mary?", ["What is Mary tired of?", "What does Mary tired of?", "What Mary is tired of?"], 0,
    "Tired of — chunk з be: What + is + Mary + tired of? Прийменник of лишається в кінці.",
    "Does ставимо зі звичайним дієсловом; tired — прикметник, тому потрібне is.",
    "Допоміжне слово is має стояти перед підметом: What is Mary ...?, а не What Mary is ...?"),

  P("What do you do after work? — «I play the guitar.» Яка картинка відповідає цій відповіді?", [
    ["🎸🎶", "Грає на гітарі"],
    ["🏊‍♂️💦", "Плаває в басейні"],
    ["🍳🥘", "Готує вечерю"]
  ], 0,
    "Play the guitar — грати на гітарі, тому відповідає картинка з гітарою.",
    "Плавання — це swim, а не play the guitar.",
    "Готувати вечерю — це cook dinner, а не play the guitar."),

  M("Ви берете інтерв'ю у письменника. Яке питання про його улюблену книжку правильне?", ["Which of your books is your favourite?", "Which your book is your favourite?", "Which book does your favourite?"], 0,
    "Which + of your books — «яка з ваших книжок»: Which of your books is your favourite? Is стоїть після групи слів з Which.",
    "Which your book — помилка: після Which потрібне або of your books, або book без your (Which book ...?).",
    "Does не потрібне: favourite — це прикметник, а не дієслово, тому питання має інший порядок слів.")
]/*V1_END*/;

LESSONS.push({
  id: "questions2",
  title: "Questions in Present Simple (part 2)",
  short: "Questions · part 2",
  subtitle: "Урок 9 · практика питань, follow-up, Which / How many, інтерв'ю",
  summary: "Тренуємо питання з be і do/does, додаємо follow-up питання (Why? What exactly? What about you?), Which / How many / What time, складаємо запитання до таблиці й інтерв'ю.",
  sections: [
    { title: "Коротко про головне", html: `
      <p>Формула та сама: <b>(Wh-слово) + допоміжне слово + підмет + решта</b>. Зі звичайними дієсловами — <b>do / does</b> і базова форма (Where does your boss <b>work</b>?), з прикметниками й chunks — <b>am / is / are</b> (What are you <b>tired of</b>?).</p>
      <p>Нове: <b>follow-up питання</b> — питання, що продовжує розмову (Why…? What exactly…? How often…? What about you?), а також <b>Which</b> + іменник, <b>How many</b> + іменник у множині та <b>What time</b>.</p>` },
    { title: "Warm up: ask 2 questions about each statement", html: `
      <p class="hint">Для кожного речення поставте два питання, щоразу різного типу.</p>
      <ol>
        <li>I live in a large flat. → <mark>Is your flat large?</mark> / <mark>Where is your flat located?</mark></li>
        <li>My boyfriend works in a small company. → <mark>Does your boyfriend work in a small company?</mark> / <mark>How many people work in that company?</mark></li>
        <li>I'm interested in games. → <mark>Are you interested in games?</mark> / <mark>What games are you interested in?</mark></li>
        <li>I rarely go out on weekends. → <mark>Do you rarely go out on weekends?</mark> / <mark>How often do you go out on weekends?</mark></li></ol>` },
    { title: "Choose the correct question", html: `
      <ol>
        <li>A) <s>Is your boss work late?</s> · B) <mark>Does your boss work late?</mark></li>
        <li>A) <mark>Are you tired of the noise?</mark> · B) <s>Do you tired of the noise?</s></li>
        <li>A) <s>Where your team works?</s> · B) <mark>Where does your team work?</mark></li>
        <li>A) <mark>What's Ivan interested in?</mark> · B) <s>What Ivan is interested in?</s></li>
        <li>A) <s>Does Anna is the boss?</s> · B) <mark>Is Anna the boss?</mark></li>
        <li>A) <mark>Do your colleagues like early mornings?</mark> · B) <s>Are your colleagues like early mornings?</s></li>
        <li>A) <mark>How often does she check emails?</mark> · B) <s>How often she checks emails?</s></li>
        <li>A) <mark>What is she good at?</mark> · B) <s>What does she good at?</s></li></ol>` },
    { title: "Put the words in order", html: `
      <ol>
        <li>your / does / where / boss / work → <mark>Where does your boss work?</mark></li>
        <li>you / are / what / tired / of → <mark>What are you tired of?</mark></li>
        <li>do / when / finish / you / work → <mark>When do you finish work?</mark></li>
        <li>interested / is / in / Olga / what → <mark>What is Olga interested in?</mark></li>
        <li>your colleagues / work / do / on weekends → <mark>Do your colleagues work on weekends?</mark></li>
        <li>he / good / is / at / drawing → <mark>Is he good at drawing?</mark></li></ol>` },
    { title: "One question is correct. Fix the others", html: `
      <ol>
        <li><s>Does he is tired of the noise?</s> → <mark>Is he tired of the noise?</mark></li>
        <li><s>Which you do at work?</s> → <mark>What do you do at work?</mark></li>
        <li>Where does Anna work? ✓ <small>(у нотатках надруковано works — це описка: після does дієслово без -s)</small></li>
        <li><s>Why you are late?</s> → <mark>Why are you late?</mark></li>
        <li><s>Is Max usually works late?</s> → <mark>Does he usually work late?</mark></li>
        <li><s>Who are you responsible for?</s> → <mark>What are you responsible for?</mark></li></ol>` },
    { title: "Write the missing question for each answer", html: `
      <p class="hint">Можливі питання для відповідей (підійде й інше правильне питання).</p>
      <ol>
        <li>B: Yes, I am. I'm responsible for visual effects. → <mark>Are you responsible for visual effects?</mark></li>
        <li>B: No, I don't. I never work on Sunday. → <mark>Do you work on Sunday?</mark></li>
        <li>B: My boss usually works late on Thursday. → <mark>When does your boss usually work late?</mark></li>
        <li>B: Because I'm interested in new ideas. → <mark>Why do you like your job?</mark></li>
        <li>B: Yes, she does. She wants to hire one more person. → <mark>Does Anna want to hire one more person?</mark></li>
        <li>B: I'm tired of writing emails. → <mark>What are you tired of?</mark></li></ol>` },
    { title: "Add a follow-up question", html: `
      <div class="chips"><span class="chip">Why …?</span><span class="chip">What exactly …?</span><span class="chip">How often …?</span><span class="chip">Who …?</span><span class="chip">Where …?</span><span class="chip">Do you …?</span><span class="chip">Does your …?</span><span class="chip">Is it …?</span><span class="chip">Are you …?</span><span class="chip">What about you?</span></div>
      <p><b>Example:</b> I never eat junk food on weekdays. <small>(= unhealthy food)</small> → <mark>Why?</mark> <mark>Are you on a diet?</mark> <mark>What do you usually eat on weekdays?</mark></p>
      <ol>
        <li>I am self-employed. → <mark>Why are you self-employed?</mark> / <mark>Don't you like teamwork?</mark></li>
        <li>My partner is tired of working late. → <mark>How often does he work late?</mark> / <mark>Does he look for a new job?</mark></li>
        <li>My friends don't like early mornings. → <mark>What exactly do they hate about early mornings?</mark> / <mark>What part of the day do they prefer?</mark></li>
        <li>My mum wants to learn something new. → <mark>What direction is she interested in?</mark> / <mark>Where does she see herself in the future?</mark></li>
        <li>I never work on Mondays. → <mark>Why do you hate working on Mondays?</mark> / <mark>What is your plan for Mondays?</mark></li>
        <li>We plan to travel soon. → <mark>Why do you plan to travel soon?</mark> / <mark>Which place do you plan to travel to?</mark></li></ol>` },
    { title: "Ask questions to complete the table about two new colleagues", html: `
      <table><tr><th></th><th>Sam</th><th>Mary</th></tr>
        <tr><td>Team</td><td>email team</td><td>? → <mark>What team does Mary work in?</mark></td></tr>
        <tr><td>City</td><td>? → <mark>Where does Sam live?</mark></td><td>Kyiv</td></tr>
        <tr><td>After work</td><td>plays the guitar</td><td>? → <mark>What does Mary do after work?</mark></td></tr>
        <tr><td>Good at</td><td>? → <mark>What is Sam good at?</mark></td><td>drawing</td></tr>
        <tr><td>Tired of</td><td>answering messages</td><td>? → <mark>What is Mary tired of?</mark></td></tr>
        <tr><td>Wants to learn to</td><td>? → <mark>What does Sam want to learn?</mark></td><td>play the guitar</td></tr></table>` },
    { title: "Interview a famous person (5 questions!)", html: `
      <div class="pair">
        <div><div class="tag">Stephen King</div>author, owner of more than 110 literature awards</div>
        <div><div class="tag">Sergey Brin</div>co-founder of Google, 4th richest man in the world</div>
        <div><div class="tag">Rihanna</div>singer, owner of “Fenty Beauty”</div>
      </div>
      <ol>
        <li>At what age <b>did</b> you understand that you wanted to write literature?</li>
        <li>When <b>can</b> we expect a new book?</li>
        <li>Until what age <b>do</b> you want to write new books?</li>
        <li><s>Which your book is your favourite?</s> → <mark>Which of your books is your favourite?</mark></li></ol>` },
    { title: "Which / How many / How often / What time", html: `
      <ol>
        <li><b>Which</b> ice-cream do you like?</li>
        <li><b>How many</b> hours a week do you work?</li>
        <li><b>How often</b> do you nap?</li>
        <li><b>What time</b> is it?</li></ol>
      <p class="hint">Which + іменник — вибір з відомого набору; How many + іменник у множині — кількість; What time is it? — котра година.</p>` },
    { title: "Speaking", html: `
      <ol>
        <li>Say a fact about yourself and let your partner ask two follow-up questions.</li>
        <li>Interview your partner as a famous person: ask five questions with Which / How many / How often / What time / Why.</li>
        <li>Ask what they are good at, tired of and interested in.</li></ol>
      <p class="hint">Перевірте себе: після do/does — дієслово без -s, після is/are — прикметник чи chunk, допоміжне слово стоїть перед підметом.</p>` },
    { title: "Оригінальні матеріали", html: `<p class="source-note">Ваші нотатки з уроку.</p><details><summary>Показати сторінки уроку</summary><div class="source-images"><a href="assets/lesson-source-13.webp" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-13.webp" alt="Оригінальні нотатки: урок 9, сторінка 1"></a><a href="assets/lesson-source-14.webp" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-14.webp" alt="Оригінальні нотатки: урок 9, сторінка 2"></a></div></details>` }
  ],
  quiz: QUESTIONS2_V1
});
