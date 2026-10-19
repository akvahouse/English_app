// Урок 6: Present Simple — BE or DO?
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.beordo).
const BEORDO_V1 = /*V1_START*/[
  M("Tom ___ in charge of the bills.", ["is", "are", "does"], 0,
    "Після chunk «in charge of» стоїть дієслово be. Tom — це he, тому потрібне is.",
    "Are вживається з you/we/they і множиною, а Tom — одна особа (he).",
    "Does — допоміжне дієслово для звичайних дієслів, а «be in charge of» — це стан, тут потрібне be."),
  M("Nina is responsible ___ the kitchen.", ["of", "for", "at"], 1,
    "Chunk «responsible for» — відповідальний за щось: responsible FOR the kitchen.",
    "«Of» стоїть у chunks «in charge of», «proud of», «tired of», але не з responsible.",
    "«At» вживається з good/bad (good at cooking), а не з responsible."),
  M("My sister ___ in Kyiv.", ["live", "lives", "is live"], 1,
    "Sister — це she, тому до звичайного дієслова live додаємо -s: lives.",
    "Для he/she/it дієслово в Present Simple потребує закінчення -s, а «live» без -s — для I/you/we/they.",
    "Is live — be і звичайне дієслово live не вживаються разом: для дії «жити» потрібна одна форма — lives."),
  M("The neighbours ___ loud music.", ["don't like", "doesn't like", "aren't like"], 0,
    "Like — звичайне дієслово, тому заперечення з do: neighbours — це they, отже don't like.",
    "Doesn't вживається з he/she/it, а neighbours — множина (they), тому потрібне don't.",
    "Aren't — це заперечення be, воно не поєднується зі звичайним дієсловом like."),
  M("Tom ___ the dishes.", ["never washes", "washes never", "is never washes"], 0,
    "Прислівник never стоїть ПЕРЕД звичайним дієсловом, а до wash у 3-й особі додаємо -es: never washes.",
    "Прислівник частотності не ставимо після основного дієслова: never має бути перед washes.",
    "«Is» тут зайве: washes вже є дієсловом, а be з прислівником never потрібне лише зі станами (is never late)."),

  F("Tom ___ the bills on the first of the month. (pay)", "pays", "Pay закінчується на голосну + y, тому просто додаємо -s: pays (як play → plays)."),
  F("Nina ___ to save money. (try)", "tries", "Try закінчується на приголосну + y, тому y міняємо на ies: tries (як dry → dries)."),
  F("Tom ___ to the shop on Saturdays. (go)", "goes", "Дієслово go у 3-й особі отримує -es: goes (як do → does)."),
  F("She doesn't ___ to move out. (want)", "want", "Після doesn't дієслово стоїть у базовій формі без -s: doesn't want."),

  O("Nina usually makes dinner for everyone.", "Прислівник usually стоїть ПЕРЕД звичайним дієсловом makes, а Nina — she, тому до make додаємо -s."),
  O("Leo is always busy.", "Прислівник always стоїть ПІСЛЯ be: is always busy, а не перед ним."),

  MA("Поєднайте український переклад з англійським реченням:", [
    ["🧾", "Том відповідає за рахунки.", "Tom is in charge of the bills."],
    ["😫", "Ніна втомилася мити посуд сама.", "Nina is tired of washing the dishes alone."],
    ["🛁", "Лео не прибирає ванну.", "Leo doesn't clean the bathroom."],
    ["🔊", "Сусіди не люблять гучну музику.", "The neighbours don't like loud music."],
    ["🧽", "Том і Лео ніколи не миють посуд.", "Tom and Leo never wash the dishes."]
  ], "Be (is) іде з chunks (in charge of, tired of + -ing); звичайні дієслова like, clean у запереченні потребують don't/doesn't + базова форма; never стоїть перед дієсловом (never wash)."),

  SO("Яке слово підходить у пропуск: форма BE чи DO?", ["BE (am / is / are / isn't)", "DO (don't / doesn't)"], [
    ["My brother ___ interested in cleaning!", 0],
    ["I ___ work from home on Fridays.", 1],
    ["Tom ___ good at numbers.", 0],
    ["We ___ need a bigger kitchen.", 1],
    ["They ___ responsible for the rubbish.", 0],
    ["She ___ want to move out.", 1]
  ], "Be вживається зі станами, прикметниками й chunks (interested in, good at, responsible for); do/does — зі звичайними дієсловами (like, need, want)."),

  G("Оберіть слово з банку для кожного речення (одне слово зайве):", ["is", "are", "doesn't", "don't", "am"], [
    "Nina ___ worried about the rent.",
    "The neighbours ___ tired of the noise.",
    "Leo ___ clean the bathroom.",
    "Tom and Leo ___ cook dinner."
  ], ["is", "are", "doesn't", "don't"],
  "Be змінюється за підметом (Nina — is, neighbours — are) і стоїть зі станами; для звичайних дієслів: doesn't з he/she, don't з they, після них — дієслово без -s."),

  P("Яка картинка відповідає реченню «Nina is proud of her borscht»?", [
    ["🍲🏅😊", "Ніна пишається своїм борщем"],
    ["🍲🤢", "Ніні не смакує борщ"],
    ["🍲🕐😴", "Ніна втомилася від готування"]
  ], 0,
    "Proud of — пишатися чимось: Ніна задоволена своїм борщем.",
    "Це зображає, що борщ не смакує, а «proud of» означає гордість.",
    "Втома описується chunk «tired of», а не «proud of»."),
  P("Яка картинка відповідає реченню «Leo is interested in music»?", [
    ["🎧🎸📖", "Лео цікавиться музикою"],
    ["🧹🚿", "Лео прибирає ванну"],
    ["🧾💶", "Лео оплачує рахунки"]
  ], 0,
    "Interested in — цікавитися чимось: Лео цікавиться музикою (music).",
    "Прибирання ванної — це дія (clean the bathroom), а не «interested in».",
    "Рахунки (bills) — це «in charge of» і Tom, а не «interested in music».")
]/*V1_END*/;

LESSONS.push({
  id: "beordo",
  title: "Present Simple: BE or DO?",
  short: "BE or DO?",
  subtitle: "Урок 6 · -s, заперечення, прислівники, be чи do",
  summary: "Повторення Present Simple: закінчення -s / -es / -ies, to be чи do/does, структура заперечень, позиція прислівників частотності й прийменникові chunks.",
  sections: [
    { title: "Коротко про головне", html: `
      <p><b>BE</b> (am / is / are) стоїть зі станами, прикметниками й chunks: Tom <b>is</b> in charge of the bills, Nina <b>is</b> proud of her borscht. <b>DO</b> (do / does) потрібне зі звичайними дієсловами: Leo <b>doesn't</b> clean the bathroom.</p>
      <p>Після <b>doesn't / don't</b> дієслово стоїть у базовій формі <b>без -s</b>: She doesn't <b>want</b> (а не wants). Прислівник стоїть <b>після be</b> (is always busy) і <b>перед іншими дієсловами</b> (usually makes, never washes).</p>` },
    { title: "Entry check", html: `
      <p>Оберіть правильний варіант (правильна відповідь виділена):</p>
      <ol>
        <li>Tom <mark>is</mark> in charge of the bills. <small>(is / are / does)</small></li>
        <li>Neighbours <mark>are</mark> tired of the noise. <small>(is / are / do)</small></li>
        <li>Nina is responsible <mark>for</mark> the kitchen. <small>(of / for / at)</small></li>
        <li>Leo is interested <mark>in</mark> music. <small>(on / at / in)</small></li>
        <li>My sister <mark>lives</mark> in Kyiv. <small>(live / lives / is live)</small></li>
        <li>The neighbours <mark>don't</mark> like loud music. <small>(doesn't / don't / aren't)</small></li>
        <li>He <mark>doesn't</mark> work on Sundays. <small>(doesn't / don't / isn't)</small></li>
        <li>She wants <mark>to rent</mark> a bigger flat. <small>(rent / renting / to rent)</small></li>
        <li>I'm good <mark>at</mark> cooking. <small>(at / in / of)</small></li>
        <li>Tom <mark>never washes</mark> the dishes. <small>(never washes / washes never / is never washes)</small></li></ol>` },
    { title: "Read, notice and explain", html: `
      <p>Tom, Nina and Leo share a flat. Tom <b>is</b> in charge of the bills, and he <b>pays</b> them on the first of the month. He <b>is</b> good at numbers, but he <b>is</b> bad at cooking. Nina <b>is</b> responsible for the kitchen. She <b>loves</b> to cook, and she <u>usually</u> <b>makes</b> dinner for everyone. She <b>is</b> proud of her borscht. Leo <b>doesn't clean</b> the bathroom, because he <b>is</b> <u>always</u> busy. He <b>is</b> interested in music, so he <u>often</u> <b>plays</b> the guitar in the evening. The neighbours <b>don't like</b> loud music, so Nina <b>is</b> <u>sometimes</u> worried about them. Tom and Leo <u>never</u> <b>wash</b> the dishes, so Nina <b>is</b> tired of washing them alone.</p>
      <ul>
        <li><b>-s endings of verbs:</b> pays, makes, loves, plays</li>
        <li><b>to be:</b> is in charge of, is good at, is always busy, are tired of</li>
        <li><b>structure of negatives:</b> doesn't clean, don't like, don't wash</li>
        <li><b>position of adverbs of frequency:</b> usually makes, is always busy, often plays, is sometimes worried, never wash</li></ul>` },
    { title: "Prepositions", html: `
      <ol>
        <li>Nina is responsible <mark>for</mark> the kitchen.</li>
        <li>Tom is in charge <mark>of</mark> the bills.</li>
        <li>Leo is interested <mark>in</mark> music.</li>
        <li>Nina is proud <mark>of</mark> her borscht.</li>
        <li>Tom is bad <mark>at</mark> cooking.</li>
        <li>Nina is worried <mark>about</mark> the neighbours.</li>
        <li>They are tired <mark>of</mark> the noise.</li>
        <li>Who is responsible <mark>for</mark> the rubbish?</li></ol>` },
    { title: "Present Simple (affirmatives and negatives)", html: `
      <ol>
        <li>Tom <mark>pays</mark> (pay) the bills on the first of the month. (+)</li>
        <li>Nina <mark>makes</mark> (make) dinner for everyone. (+)</li>
        <li>Leo <mark>doesn't clean</mark> (clean) the bathroom. (−)</li>
        <li>The neighbours <mark>don't like</mark> (like) loud music. (−)</li>
        <li>I <mark>want</mark> (want) to move to a bigger flat. (+)</li>
        <li>My flatmate <mark>needs</mark> (need) a quiet room to work. (+)</li>
        <li>Tom and Leo <mark>don't wash</mark> (wash) the dishes. (−)</li>
        <li>She <mark>tries</mark> (try) to save money. (+)</li></ol>
      <table><tr><th>Правило</th><th>Приклади</th></tr>
        <tr><td>приголосна + <b>y</b> → <b>ies</b></td><td>try → tries · dry → dries · cry → cries</td></tr>
        <tr><td>-ch, -sh, -ss, -x, -o → <b>es</b></td><td>watch → watches · wash → washes · kiss → kisses · box → boxes · go → goes · do → does</td></tr>
        <tr><td>голосна + y → просто <b>s</b></td><td>play → plays · stay → stays</td></tr>
        <tr><td>решта → <b>s</b></td><td>like → likes · pay → pays · make → makes</td></tr></table>` },
    { title: "BE or DO?", html: `
      <p>Fill the gaps with: <b>is / isn't / are / aren't / doesn't / don't</b></p>
      <ol>
        <li>Nina <mark>is</mark> tired of washing dishes.</li>
        <li>Leo <mark>doesn't</mark> like washing dishes.</li>
        <li>They <mark>are</mark> responsible for the rubbish.</li>
        <li>I <mark>don't</mark> work from home on Fridays.</li>
        <li>Tom <mark>is</mark> good at cooking.</li>
        <li>We <mark>don't</mark> need a bigger kitchen.</li>
        <li>My brother <mark>is</mark> interested in cleaning!</li>
        <li>She <mark>doesn't</mark> want to move out. <small>(не «doesn't wants»: після doesn't — базова форма)</small></li></ol>
      <div class="pair">
        <div><div class="tag">BE</div>Nina <b>is</b> tired · They <b>are</b> responsible · Tom <b>isn't</b> proud</div>
        <div><div class="tag">DO</div>Leo <b>doesn't</b> like · We <b>don't</b> need · She <b>doesn't</b> want</div>
      </div>` },
    { title: "Speaking", html: `
      <ol>
        <li>Who is in charge of the bills in your home? Who is responsible for the rubbish?</li>
        <li>What are you good at? What are you bad at?</li>
        <li>What do you never do at home? What do you usually do in the evening?</li>
        <li>Is there anything you are tired of doing every week?</li>
        <li>Do your neighbours like loud music? What does your flatmate (or family) need to work?</li></ol>
      <p class="hint">Тримайте в голові: <i>is / are</i> — стани й chunks, <i>do / does</i> — дії; після doesn't — без -s.</p>` },
    { title: "Оригінальні матеріали", html: `<p class="source-note">Ваші нотатки з уроку.</p><details><summary>Показати сторінку уроку</summary><div class="source-images"><a href="assets/lesson-source-9.webp" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-9.webp" alt="Оригінальні нотатки: урок 6"></a></div></details>` }
  ],
  quiz: BEORDO_V1
});
