// Урок 8: Questions in Present Simple.
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.questions).
const QUESTIONS_V1 = /*V1_START*/[
  M("Яке питання про Max правильне?", ["Is Max works late?", "Does Max works late?", "Does Max work late?", "Is Max work late?"], 2,
    "Work — звичайне дієслово, тому питання будуємо з does + підмет + дієслово в базовій формі: Does Max work late?",
    "Is — це форма be; поєднувати її зі звичайним дієсловом works не можна: питання зі звичайним дієсловом потребує does.",
    "Does уже показує 3-тю особу, тому після підмета дієслово стоїть у базовій формі: work, а не works.",
    "Is потрібне лише тоді, коли після підмета стоїть прикметник чи chunk (Is Max busy?); work — звичайне дієслово, йому потрібне does."),

  M("Does your boss work on Sunday? — No, ___", ["he isn't.", "he don't.", "he doesn't."], 2,
    "Коротка відповідь повторює допоміжне слово питання: Does ...? — No, he doesn't.",
    "Isn't — це відповідь на питання з be (Is he ...?), а питання почалося з Does.",
    "Для he/she/it потрібне doesn't, а не don't: don't вживаємо з I, you, we, they."),

  M("Оберіть правильне питання про Olga:", ["Are Olga proud of her team?", "Is Olga proud of her team?", "Does Olga proud of her team?"], 1,
    "Proud — прикметник, тому потрібне be. Olga — одна людина (she), отже: Is Olga proud of her team?",
    "Are вживаємо з you/we/they і множиною; Olga — однина, тому потрібне is.",
    "Does ставимо перед звичайним дієсловом; proud — прикметник, а не дієслово, тому потрібне is."),

  M("___ is Ivan tired? — Because he writes emails all day.", ["Why", "Where", "When"], 0,
    "Відповідь з Because пояснює причину, а причину запитуємо словом Why (чому): Why is Ivan tired?",
    "Where запитує про місце (в офісі, вдома), а відповідь з Because називає причину.",
    "When запитує про час (в понеділок, увечері), а відповідь з Because називає причину."),

  M("___ does your team finish work? — At six o'clock.", ["Where", "Why", "When"], 2,
    "At six o'clock — це час, а про час запитуємо словом When (коли).",
    "Where запитує про місце, а At six o'clock — не місце.",
    "Why запитує про причину і потребує відповіді з because, а відповідь тут — час."),

  F("Are your friends interested in games? — No, they ___.", ["aren't", "are not"],
    "Коротка відповідь повторює допоміжне слово питання. Питання з Are, тому: No, they aren't."),

  F("Why ___ you like early mornings? (негативне питання)", "don't",
    "У негативному питанні don't стоїть перед підметом: Why don't you like early mornings? Порядок Why you don't — помилка."),

  F("Does Anna ___ posts every day? (write)", "write",
    "Після does дієслово стоїть у базовій формі, без -s: Does Anna write posts? Форма writes тут неправильна."),

  F("What ___ Tom do after work?", "does",
    "Tom — це he (однина), тому допоміжне слово does. Після нього дієслово do — базова форма: What does Tom do after work?"),

  O("Where does your family live?",
    "Порядок у питанні: питальне слово + допоміжне слово (does) + підмет + дієслово в базовій формі."),

  O("What is your friend interested in?",
    "Питання з be: питальне слово + is + підмет + chunk (interested in); прийменник in залишається в кінці питання."),

  MA("З'єднайте питання з його відповіддю:", [
    ["📍", "Where do you work?", "In a small company."],
    ["📅", "When does your boss work late?", "On Thursday."],
    ["👤", "Who is your boss?", "Anna."],
    ["💡", "Why do you like your job?", "Because it's interesting."],
    ["🔁", "How often do you work late?", "Sometimes."],
    ["🛠️", "What do you do at work?", "I make visual effects."]
  ], "Where — місце, When — час, Who — людина, Why — причина (because), How often — частота, What — що саме робимо."),

  SO("Розсортуйте питання з відео Bill & Melinda Gates за типом допоміжного слова:",
    ["Питання з be (am/is/are)", "Питання з do/does/don't", "Інше (модальне can)"], [
      ["Is Bill Gates still alive?", 0],
      ["What is your new annual letter about?", 0],
      ["What does Melinda Gates look like?", 1],
      ["Why don't you give more in the United States?", 1],
      ["Does saving kids' lives lead to overpopulation?", 1],
      ["Where can I read your annual letter?", 2]
    ],
    "Is — це be (+ прикметник чи chunk), does/don't — допоміжні для звичайних дієслів, а can — модальне слово: Where can I read ...?"),

  G("Оберіть слово Do / Does / Is / Are:", ["Do", "Does", "Is", "Are", "Am"], [
    "___ your flat big?",
    "___ your flatmates cook dinner every day?",
    "___ Leo play the guitar in the evening?",
    "___ you tired of the noise?"
  ], ["Is", "Do", "Does", "Are"],
    "Big і tired — прикметники, тому потрібне be: Is your flat (однина), Are you. Перед звичайним дієсловом: Do + your flatmates (вони), Does + Leo (він)."),

  P("Where does your boss work? — «In a hospital.» Яка картинка відповідає цій відповіді?", [
    ["🏫📚", "Школа"],
    ["🏥🚑", "Лікарня"],
    ["🏪🛒", "Магазин"]
  ], 1,
    "Hospital — лікарня, тому відповідь на Where does your boss work? пасує до картинки з лікарнею.",
    "Школа — school, а не hospital.",
    "Магазин — shop, а не hospital."),

  P("What do you do at work? — «I make visual effects.» Яка картинка відповідає цій відповіді?", [
    ["🎬✨", "Створює візуальні ефекти для кіно"],
    ["🍳🍽️", "Готує їжу в кафе"],
    ["🚗🔧", "Ремонтує автомобілі"]
  ], 0,
    "Visual effects — візуальні ефекти для відео й кіно, тому пасує картинка з кіно та ефектами.",
    "Готувати їжу — to cook, а не to make visual effects.",
    "Ремонтувати автомобілі — to repair cars, а не to make visual effects.")
]/*V1_END*/;

LESSONS.push({
  id: "questions",
  title: "Questions in Present Simple",
  short: "Questions",
  subtitle: "Урок 8 · питання з be, do/does і Wh-словами",
  summary: "Питання з be і do/does, питальні слова What / Where / When / Who / Why / How (often), порядок слів, формули питань і типові помилки.",
  sections: [
    { title: "Коротко про головне", html: `
      <p>Питання = <b>(Wh-слово) + допоміжне слово + підмет + решта</b>. Допоміжне слово: <b>do / does</b> зі звичайними дієсловами (дієслово лишається без -s: Where does your boss <b>work</b>?) і <b>am / is / are</b> з прикметниками й chunks (Is Nina proud of…?).</p>
      <p>Не змішуємо: ❌ Is Max works late? ❌ Does Anna writes? ❌ Why you don't like…? ✅ Does Max work late? ✅ Does Anna write? ✅ Why don't you like…?</p>` },
    { title: "Recall", html: `
      <ol>
        <li>Are you busy this week? – Yes, I <b>am</b>.</li>
        <li>Does your boss work on Sunday? – No, he <b>doesn't</b>.</li>
        <li>Do you work from home on Fridays? – Yes, I <b>do</b>.</li>
        <li>Is your team big? – No, it <b>isn't</b>.</li>
        <li>Do your colleagues write emails every day? – No, they <b>don't</b>.</li>
        <li>Are your friends interested in games? – No, they <b>aren't</b>. <small>(I am interested in games. My friends aren't interested in games.)</small></li>
        <li>Does your family live in the same city? – Yes, it <b>does</b>. / Yes, they <b>do</b>.</li>
        <li>Is your job easy? – No, it <b>isn't</b>.</li></ol>` },
    { title: "Wh-question words", html: `
      <div class="chips"><span class="chip">What</span><span class="chip">Where</span><span class="chip">When</span><span class="chip">Who</span><span class="chip">Why</span><span class="chip">How</span><span class="chip">How often</span></div>
      <ol>
        <li><b>Where</b> do you work? — In a small company. <small>(місце)</small></li>
        <li><b>When</b> does your boss work late? — On Thursday. <small>(час)</small></li>
        <li><b>Who</b> is your boss? — Anna. <small>(людина)</small></li>
        <li><b>What</b> do you do at work? — I make visual effects.</li>
        <li><b>Why</b> do you like your job? — Because it's interesting. <small>(причина)</small></li>
        <li><b>How often</b> do you work late? — Sometimes. <small>(частота)</small></li></ol>` },
    { title: "Listening: Tough questions with Bill & Melinda Gates", html: `
      <p class="hint">Відео «Tough questions with Bill & Melinda Gates» (канал Bill Gates, YouTube) шукайте в себе в нотатках. Нижче питання з відео.</p>
      <ol>
        <li><b>What does</b> Melinda Gates look like?</li>
        <li><b>Is</b> Bill Gates still alive?</li>
        <li><b>Why don't</b> you give more in the United States?</li>
        <li><s>Why are you really giving your money away?</s></li>
        <li><b>What is</b> your new annual letter about?</li>
        <li><b>Does</b> saving kids' lives lead to overpopulation?</li>
        <li><b>Why don't</b> you give money to fight climate change?</li>
        <li><s>Why are you imposing your values on other cultures?</s></li>
        <li><b>Where can</b> I read your annual letter?</li></ol>
      <div class="chips"><span class="chip">annual letter — щорічний лист</span><span class="chip">overpopulation — перенаселення</span><span class="chip">climate change — зміна клімату</span><span class="chip">give money away — роздавати гроші</span></div>` },
    { title: "Sort the questions", html: `
      <p>Розкладіть 9 питань на три групи: A — з is / are, B — з do / does / don't, C — інше.</p>
      <div class="pair">
        <div><div class="tag">to be</div>Is Bill Gates still alive?<br>What is your new annual letter about?<br><mark>(Wh) + am / is / are + S + adj?</mark></div>
        <div><div class="tag">do / does</div>What does Melinda Gates look like?<br>Why don't you give more in the United States?<br>Does saving kids' lives lead to overpopulation?<br>Why don't you give money to fight climate change?<br><mark>(Wh) + do / does + S + V?</mark></div>
        <div><div class="tag">other</div>Where can I read your annual letter?<br><mark>(Wh) + modal + S + V?</mark></div>
      </div>
      <table><tr><th>Question</th><th>Question word</th><th>Helper word</th><th>Subject</th><th>The rest</th></tr>
        <tr><td>Is Bill Gates still alive?</td><td>—</td><td>Is</td><td>Bill Gates</td><td>still alive?</td></tr>
        <tr><td>What does Melinda Gates look like?</td><td>What</td><td>does</td><td>Melinda Gates</td><td>look like?</td></tr>
        <tr><td>Why don't you give money to fight climate change?</td><td>Why</td><td>don't</td><td>you</td><td>…</td></tr>
        <tr><td>Does saving kids' lives lead to overpopulation?</td><td>—</td><td>does</td><td>saving kids' lives</td><td>…</td></tr>
        <tr><td>What's your new annual letter about?</td><td>What</td><td>is</td><td>your new annual letter</td><td>about?</td></tr></table>` },
    { title: "Block 2 · Questions with be", html: `
      <ol>
        <li>Tom is in charge of the bills. → <mark>Is he</mark> in charge of the bills?</li>
        <li>Nina is good at cooking. → <mark>Is she</mark> good at cooking?</li>
        <li>They are tired of the noise. → <mark>Are they</mark> tired of the noise?</li>
        <li>You are responsible for the budget. → <mark>Are you</mark> responsible for the budget?</li>
        <li>Max is busy on Friday. → <mark>Is he</mark> busy on Friday?</li>
        <li>Olga and Ivan are in the same team. → <mark>Are they</mark> in the same team?</li></ol>` },
    { title: "Block 2 · Questions with do / does", html: `
      <ol>
        <li>Anna wants to hire one more person. → <mark>Does</mark> Anna <mark>want</mark> to hire one more person?</li>
        <li>Max usually works late. → <mark>Does</mark> he usually <mark>work</mark> late?</li>
        <li>You need to have a better work-life balance. → <mark>Do</mark> you <mark>need</mark> to have a better work-life balance?</li>
        <li>Olga and Ivan like to answer emails. → <mark>Do</mark> they <mark>like</mark> to answer emails?</li>
        <li>Your boss checks your work every day. → <mark>Does</mark> your boss <mark>check</mark> your work every day?</li>
        <li>Tom pays the bills on the first of the month. → <mark>Does</mark> he <mark>pay</mark> the bills?</li></ol>` },
    { title: "Fill the gap: Do / Does / Is / Are", html: `
      <ol>
        <li><mark>Is</mark> your flat big?</li>
        <li><mark>Do</mark> your flatmates cook dinner every day?</li>
        <li><mark>Is</mark> Nina proud of her borscht?</li>
        <li><mark>Does</mark> Leo play the guitar in the evening?</li>
        <li><mark>Are</mark> you tired of the noise?</li>
        <li><mark>Do</mark> the neighbours like loud music?</li>
        <li><mark>Is</mark> your boss interested in new ideas?</li>
        <li><mark>Do</mark> they work on weekends?</li></ol>` },
    { title: "Spot 6 mistakes in 8 sentences", html: `
      <ol>
        <li>Does Anna <s>writes</s> <mark>write</mark> posts?</li>
        <li><s>Is</s> <mark>Does</mark> Max <s>works</s> <mark>work</mark> late?</li>
        <li>Does he work on Sunday? ✓</li>
        <li><s>Are</s> <mark>Is</mark> Olga proud of her team?</li>
        <li>Does Ivan need to work on weekends? ✓</li>
        <li>Where does your boss work? ✓</li>
        <li>Why <s>you don't</s> <mark>don't you</mark> like early mornings?</li>
        <li>What does your team <s>does</s> <mark>do</mark> on Friday?</li></ol>` },
    { title: "Block 3 · Build the question", html: `
      <ol>
        <li>where / your boss / work → <mark>Where does your boss work?</mark></li>
        <li>what / you / do / at work → <mark>What do you do at work?</mark></li>
        <li>who / be / in charge of the budget → <mark>Who is in charge of the budget?</mark></li>
        <li>when / your team / finish work → <mark>When does your team finish work?</mark></li>
        <li>why / you / want to learn something new → <mark>Why do you want to learn something new?</mark></li>
        <li>how often / you / work late → <mark>How often do you work late?</mark></li>
        <li>what / your friend / be / interested in → <mark>What is your friend interested in?</mark></li>
        <li>where / your family / live → <mark>Where does your family live?</mark></li></ol>` },
    { title: "Block 3 · Ask about the words in bold", html: `
      <ol>
        <li>Anna works <b>in a small office</b>. → <mark>Where does she work?</mark></li>
        <li>Max finishes work <b>at six</b>. → <mark>When does he finish work?</mark></li>
        <li>Olga writes <b>the posts</b>. → <mark>What does she write?</mark></li>
        <li>Ivan is tired <b>of writing emails</b>. → <mark>Why is he tired?</mark> / <mark>What is he tired of?</mark></li>
        <li>Anna wants to hire one more person <b>because the team is busy</b>. → <mark>Why does she want to hire a person?</mark></li>
        <li>I go to the office <b>three times a week</b>. → <mark>How often do you go to the office?</mark></li></ol>` },
    { title: "Speaking", html: `
      <ol>
        <li>Ask your partner five questions about their job: Where…? When…? Who…? Why…? How often…?</li>
        <li>Ask about their boss: Does your boss work late? Is your boss strict?</li>
        <li>Ask what they are good at, tired of and interested in.</li></ol>
      <p class="hint">Перевірте себе: після does/do — дієслово без -s, після is/are — прикметник чи chunk.</p>` },
    { title: "Оригінальні матеріали", html: `<p class="source-note">Ваші нотатки з уроку.</p><details><summary>Показати сторінки уроку</summary><div class="source-images"><a href="assets/lesson-source-11.webp" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-11.webp" alt="Оригінальні нотатки: урок 8, сторінка 1"></a><a href="assets/lesson-source-12.png" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-12.png" alt="Оригінальні нотатки: урок 8, сторінка 2"></a></div></details>` }
  ],
  quiz: QUESTIONS_V1
});
