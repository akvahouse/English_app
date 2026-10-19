// Урок 7: Negatives in Present Simple.
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.negatives).
const NEGATIVES_V1 = /*V1_START*/[
  M("Does Anna write posts for social media? — No, ___.",
    ["she doesn't", "she isn't", "she don't", "she not"], 0,
    "Питання починається з Does, тому й коротка відповідь закінчується на doesn't: перше слово питання = останнє слово відповіді.",
    "Isn't — це відповідь на питання з be (Is she…?), а тут питання з Does.",
    "Don't вживається з I/you/we/they, а з she потрібне doesn't.",
    "She not — неповна форма: після No у короткій відповіді потрібне допоміжне дієслово doesn't, а не лише not."),
  M("Яке речення правильне?",
    ["Anna doesn't wants to move.", "Anna doesn't want to move.", "Anna don't want to move."], 1,
    "Після doesn't дієслово стоїть у базовій формі без -s: doesn't want. Закінчення -s уже «забрав» допоміжний doesn't.",
    "Doesn't wants — подвійне -s: після doesn't потрібна базова форма want.",
    "Don't не поєднується з Anna (she): для 3-ї особи однини потрібне doesn't."),
  M("Is Blue Fox Media a large company? — No, ___.",
    ["it doesn't", "it isn't", "it don't"], 1,
    "Питання з be (Is the company…?) — коротка відповідь з be: No, it isn't. Перше слово питання Is стає останнім у відповіді.",
    "Doesn't — відповідь на питання з Does (Does it work…?); питання тут починається з Is.",
    "Don't — форма для I/you/we/they, а питання з Is вимагає відповіді з be: isn't."),
  M("Olga ___ worried about the numbers.",
    ["doesn't", "isn't", "don't"], 1,
    "Worried about — це to be + прикметник, тому заперечення робимо через isn't: Olga isn't worried.",
    "Doesn't ставимо перед дієсловом у базовій формі (doesn't like), а worried — прикметник після be.",
    "Don't — форма для I/you/we/they, а Olga — це she; крім того, don't не стоїть перед прикметником worried."),
  M("Max ___ works on Sundays.",
    ["never", "doesn't never", "isn't never"], 0,
    "Never саме по собі вже заперечення, тому don't/doesn't поруч не потрібні: Max never works on Sundays.",
    "Doesn't never — подвійне заперечення: never уже містить значення «ні».",
    "Isn't never — подвійне заперечення, до того ж works не поєднується з isn't."),

  F("Does Ivan hope to manage the team one day? — Yes, he ___.", "does",
    "Питання починається з Does, тож позитивна коротка відповідь закінчується на does: Yes, he does."),
  F("Anna ___ plan to move to a bigger office. (заперечення)", ["doesn't", "does not"],
    "Plan — звичайне дієслово, тому заперечення з Anna (she) — doesn't + базова форма: doesn't plan."),
  F("You ___ responsible for the budget. (заперечення)", ["aren't", "are not"],
    "Responsible for — to be + прикметник. З you заперечення — aren't (are not): You aren't responsible."),
  F("We ___ often work late. (заперечення)", ["don't", "do not"],
    "Work — звичайне дієслово, з we — don't + базова форма. Прислівник often стоїть після don't, перед дієсловом."),

  O("Max doesn't want to change his job.",
    "Doesn't ставимо перед основним дієсловом want, яке стоїть у базовій формі без -s; після нього йде to change."),
  O("She doesn't usually answer emails on Friday.",
    "Прислівник usually стоїть після doesn't і перед основним дієсловом answer, яке в базовій формі без -s."),

  MA("З'єднайте питання з правильною короткою відповіддю:", [
    ["😴", "Are you tired today?", "No, I'm not."],
    ["👩‍🍳", "Is your friend good at cooking?", "Yes, he is."],
    ["💼", "Does your boss often work late?", "No, he doesn't."],
    ["📚", "Do you want to learn something new?", "Yes, I do."]
  ], "Перше слово питання = останнє слово відповіді: Are → I'm not, Is → is, Does → doesn't, Do → do."),

  SO("Правильно чи помилка?", ["Correct", "Mistake"], [
    ["Ivan doesn't work in a media team.", 0],
    ["Max isn't doesn't work on Sunday.", 1],
    ["Olga don't like to answer emails.", 1],
    ["Ivan doesn't need to work on weekends.", 0],
    ["They doesn't plan to hire anyone.", 1],
    ["She isn't usually late.", 0],
    ["They don't often work on weekends.", 0]
  ], "Не змішуємо isn't і doesn't; doesn't — лише з he/she/it, don't — з I/you/we/they; після них дієслово в базовій формі."),

  G("Оберіть isn't, aren't, don't або doesn't:", ["isn't", "aren't", "don't", "doesn't", "am not"], [
    "The company ___ make games.",
    "Olga and Ivan ___ in the same team.",
    "Ivan ___ the boss.",
    "I ___ want to change my job."
  ], ["doesn't", "aren't", "isn't", "don't"],
    "З be: isn't (he/she/it), aren't (you/we/they); зі звичайними дієсловами: doesn't (he/she/it) і don't (I/you/we/they) + базова форма."),

  P("Яка картинка відповідає реченню «Olga doesn't like to respond to emails»?", [
    ["📧😫", "Олі не хочеться відповідати на листи"],
    ["📧😊", "Оля із задоволенням відповідає на листи"],
    ["📝💡", "Оля записує нові ідеї"]
  ], 0,
    "Doesn't like to respond означає «не любить відповідати», тому Олі не хочеться відповідати на листи.",
    "На цій картинці Оля відповідає охоче, а в реченні заперечення doesn't like.",
    "Нові ідеї — це інша деталь про Олю (interested in new ideas), а речення говорить про листи."),
  P("Яка картинка відповідає реченню «Ivan isn't good at drawing»?", [
    ["🎨😟", "Іван погано малює"],
    ["🎨😄", "Іван чудово малює"],
    ["💻✉️", "Іван пише листи"]
  ], 0,
    "Isn't good at означає «не вміє», тому Іван погано малює.",
    "Ця картинка показує good at drawing, а в реченні заперечення isn't good.",
    "Писати листи Іван вміє добре (good at writing emails), а речення про малювання.")
]/*V1_END*/;

LESSONS.push({
  id: "negatives",
  title: "Negatives in Present Simple",
  short: "Negatives",
  subtitle: "Урок 7 · заперечення, питання й короткі відповіді",
  summary: "Заперечення isn't / aren't / don't / doesn't, питання з be і do/does та короткі відповіді за правилом «перше слово питання — останнє слово відповіді».",
  sections: [
    { title: "Коротко про головне", html: `
      <p>Коротка відповідь повторює <b>перше слово питання</b>: <b>Are</b> you…? — Yes, I <b>am</b>. · <b>Does</b> she…? — No, she <b>doesn't</b>.</p>
      <p>Заперечення з <b>be</b>: <b>isn't / aren't / am not</b>. Зі звичайними дієсловами: <b>don't / doesn't + базова форма</b> (She doesn't <b>want</b>, а не wants). <b>Never</b> уже містить заперечення: He never works on Sundays.</p>` },
    { title: "Blitz + diagnostics", html: `
      <p>Дайте коротку відповідь на кожне питання (обидва варіанти правильні, залежно від вас):</p>
      <ol>
        <li>Are you responsible for cooking at home? — Yes, I <mark>am</mark>. / No, I'<mark>m not</mark>.</li>
        <li>Do you like going out early in the morning? — Yes, I <mark>do</mark>. / No, I <mark>don't</mark>.</li>
        <li>Do you need to have a better work-life balance? — Yes, I <mark>do</mark>. / No, I <mark>don't</mark>.</li>
        <li>Does your family live in the same city? — Yes, they <mark>do</mark>. / No, they <mark>don't</mark>.</li>
        <li>Do you usually work on weekends? — Yes, I <mark>do</mark>. / No, I <mark>don't</mark>.</li>
        <li>Are you tired today? — Yes, I <mark>am</mark>. / No, I'<mark>m not</mark>.</li>
        <li>Is your friend good at cooking? — Yes, he <mark>is</mark>. / No, he <mark>isn't</mark>.</li>
        <li>Do you want to learn something new this year? — Yes, I <mark>do</mark>. / No, I <mark>don't</mark>.</li>
        <li>Does your boss often work late? — Yes, he <mark>does</mark>. / No, he <mark>doesn't</mark>.</li></ol>` },
    { title: "The rule", html: `
      <p><mark>The first word of the question is the last word of the answer.</mark></p>
      <table><tr><th>Question</th><th>Yes</th><th>No</th></tr>
        <tr><td>Are you…?</td><td>Yes, I <b>am</b>.</td><td>No, I'<b>m not</b>.</td></tr>
        <tr><td>Is he / she / it…?</td><td>Yes, he <b>is</b>.</td><td>No, he <b>isn't</b>.</td></tr>
        <tr><td>Do you / we / they…?</td><td>Yes, I <b>do</b>.</td><td>No, I <b>don't</b>.</td></tr>
        <tr><td>Does he / she / it…?</td><td>Yes, he <b>does</b>.</td><td>No, he <b>doesn't</b>.</td></tr></table>` },
    { title: "Reading + noticing", html: `
      <p>Blue Fox Media <b>is</b> a small company. It works with game brands, but it <b>doesn't make</b> games and it <b>doesn't make</b> ads. The team writes posts for social media and answers messages every day.</p>
      <p>Anna <b>is</b> the boss. She <b>is in charge of</b> the budget and <b>responsible for</b> hiring. She <b>doesn't write</b> posts. She <b>is good at</b> talking to people, but she <b>is bad at</b> drawing. She wants to hire one more person, but she <b>doesn't plan</b> to move to a bigger office.</p>
      <p>Max <b>is</b> the producer. He <b>is responsible for</b> weekly plans. He usually works late, and he <b>is tired of</b> it. He needs to have a better work-life balance, but he <b>doesn't want</b> to change his job. He <u>never</u> works on Sundays, though.</p>
      <p>Olga works in the social media team. She <b>is interested in</b> new ideas, and she <b>is proud of</b> her team. She <b>isn't worried about</b> the numbers, but she <b>doesn't like</b> to respond to emails. She tries to finish early on Fridays.</p>
      <p>Ivan works in the email team. He <b>is good at</b> writing emails, but he <b>isn't good at</b> drawing. He <b>doesn't need</b> to work on weekends. He hopes to manage the team one day, and he <b>doesn't plan</b> to leave the company yet.</p>
      <details><summary>Питання по тексту й відповіді</summary>
        <ol>
          <li>Is Blue Fox Media a large company? → No, it is not.</li>
          <li>Does it work with game brands? → Yes, it does.</li>
          <li>Does it make games? → No, it doesn't.</li>
          <li>Is Anna the head of the company? → Yes, she is.</li>
          <li>Does Anna create content? → No, she doesn't.</li>
          <li>Is Anna great at drawing? → No, she isn't.</li>
          <li>Does Anna plan to relocate? → No, she doesn't.</li>
          <li>Does Max usually work long hours? → Yes, he does.</li>
          <li>Does Max usually work on Sundays? → No, he doesn't.</li>
          <li>Does Olga like to answer emails? → No, she doesn't.</li>
          <li>Are Olga and Ivan in the same team? → No, they aren't.</li>
          <li>Does Ivan hope to become the manager? → Yes, he does.</li></ol></details>` },
    { title: "Хто що робить: таблиця chunks", html: `
      <table><tr><th>Name, position</th><th>to be + responsible for / in charge of</th><th>to be + good at / bad at / proud of / tired of</th><th>doesn't / isn't / never</th></tr>
        <tr><td>Anna, the boss</td><td>Anna is responsible for hiring.</td><td>Anna is bad at drawing.</td><td>Anna isn't good at drawing.</td></tr>
        <tr><td>Max, the producer</td><td>Max is in charge of weekly plans.</td><td>He's tired of working late.</td><td>He doesn't want to work late.</td></tr>
        <tr><td>Olga, the SMM</td><td>Olga is responsible for the SM team.</td><td>Olga is bad at responding to emails.</td><td>She doesn't finish late on Fridays.</td></tr>
        <tr><td>Ivan, direct manager</td><td>He is responsible for writing e-mails.</td><td>He is bad at drawing.</td><td>He doesn't work in a media team.</td></tr></table>` },
    { title: "Controlled practice", html: `
      <p><b>Fill the gap:</b> isn't / aren't / don't / doesn't</p>
      <ol>
        <li>Olga <mark>isn't</mark> worried about the numbers.</li>
        <li>Max <mark>doesn't</mark> work on Sunday.</li>
        <li>Anna <mark>doesn't</mark> plan to move to a bigger office.</li>
        <li>Ivan <mark>doesn't</mark> need to work on weekends.</li>
        <li>We <mark>don't</mark> often work late.</li>
        <li>Olga and Ivan <mark>aren't</mark> in the same team.</li>
        <li>I <mark>don't</mark> want to change my job.</li>
        <li>She <mark>doesn't</mark> usually answer emails on Friday.</li>
        <li>The company <mark>doesn't</mark> make games.</li>
        <li>You <mark>aren't</mark> responsible for the budget.</li></ol>
      <div class="chips"><span class="chip">respond — V — відповідати</span><span class="chip">(ir)responsible — adj — (без)відповідальний</span><span class="chip">responsibility — n — обов'язок, відповідальність</span></div>` },
    { title: "Spot the mistake", html: `
      <p>Три речення правильні. Виправте решту:</p>
      <ol>
        <li>Anna doesn't <s>wants</s> <mark>want</mark> to move.</li>
        <li>Max <s>isn't</s> <mark>doesn't</mark> work on Sunday.</li>
        <li>Olga <s>don't</s> <mark>doesn't</mark> like to answer emails.</li>
        <li>Ivan doesn't need to work on weekends. ✓</li>
        <li>We don't often work late. ✓</li>
        <li>She isn't usually late. ✓</li>
        <li>They <s>doesn't</s> <mark>don't</mark> plan to hire anyone.</li>
        <li>Olga doesn't usually <s>works</s> <mark>work</mark>.</li></ol>` },
    { title: "Semi-controlled practice", html: `
      <p><b>Make sentences:</b></p>
      <ol>
        <li>Anna / not / write posts → Anna <mark>doesn't write</mark> posts.</li>
        <li>Max / not / want / change his job → Max <mark>doesn't want to change</mark> his job.</li>
        <li>Ivan / not / the boss → Ivan <mark>isn't</mark> the boss.</li>
        <li>Olga and Ivan / not / work in the same team → They <mark>don't work</mark> in the same team.</li>
        <li>I / not often / work late → I <mark>don't often work</mark> late.</li></ol>
      <p><b>Correct wrong sentences with negatives. Then say what is true.</b><br><i>Example: Anna writes posts every day. → No, she doesn't. She doesn't write posts. She is the boss.</i></p>
      <ol>
        <li>Blue Fox Media makes games. → No, they don't. They never make games.</li>
        <li>Anna is good at drawing. → No, she isn't. She isn't good at drawing.</li>
        <li>Max works on Sunday. → No, he doesn't. He doesn't work on Sunday.</li>
        <li>Olga likes to answer emails. → No, she doesn't. She doesn't like to answer emails.</li>
        <li>Ivan needs to work on weekends. → No, he doesn't. He doesn't need to work on weekends.</li>
        <li>Max wants to change his job. → No, he doesn't. He doesn't want to change his job.</li></ol>` },
    { title: "Speaking", html: `
      <ol>
        <li>Do you work on weekends? Does your boss work late?</li>
        <li>Are you good at drawing? Are you responsible for the budget in your team?</li>
        <li>What doesn't your company do? What don't you like to do at work?</li>
        <li>Tell me one thing your friend never does.</li></ol>
      <p class="hint">Відповідайте коротко (<i>No, he doesn't.</i>) і потім повним реченням (<i>He doesn't work on Sundays.</i>).</p>` },
    { title: "Оригінальні матеріали", html: `<p class="source-note">Ваші нотатки з уроку.</p><details><summary>Показати сторінку уроку</summary><div class="source-images"><a href="assets/lesson-source-10.png" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-10.png" alt="Оригінальні нотатки: урок 7"></a></div></details>` }
  ],
  quiz: NEGATIVES_V1
});
