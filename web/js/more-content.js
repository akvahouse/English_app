// Ілюстровані картки лексики + додаткові інтерактивні питання для кожного уроку.
const flipHtml = cards => `<p class="hint">Натисніть на картку, щоб побачити переклад і приклад.</p><div class="flips">${cards.map((c, i) =>
  `<div class="flip" tabindex="0" role="button" aria-label="${c[1]}" style="--i:${i}"><div class="flip-in"><div class="face fc-front"><span class="fe">${c[0]}</span><b>${c[1]}</b></div><div class="face fc-back"><b>${c[2]}</b><em>${c[3]}</em></div></div></div>`).join("")}</div>`;

const CARDS = {
  trial: [
    ["😴", "barely awake", "ледь прокинувшись", "Barely awake, I answered the phone."],
    ["😨", "the dreaded four words", "слова, яких боїшся", "“Tell me about yourself” — the dreaded four words."],
    ["🗣️", "to yap on and on", "базікати без кінця", "I could yap on and on about my hobbies."],
    ["📚", "relevant courses", "відповідні курси", "Mention relevant courses and projects."],
    ["🛡️", "to brace for", "приготуватися до неприємного", "I braced for the first question."],
    ["📞", "phone screen", "перше телефонне інтерв'ю", "It was time for the phone screen."]
  ],
  tobe1: [
    ["🏅", "good at", "добре вмію", "I'm good at presentations."],
    ["🏆", "proud of", "пишаюся", "She's proud of her team."],
    ["😟", "worried about", "хвилююся про", "I'm worried about the deadline."],
    ["😩", "tired of", "набридло, втомився від", "He's tired of his commute."],
    ["🎨", "interested in", "цікавлюся", "She's interested in modern art."],
    ["📋", "responsible for", "відповідальний за", "He's responsible for the weekly report."],
    ["👔", "in charge of", "керує, очолює", "She's in charge of the Asian branch."],
    ["⚖️", "a priority", "пріоритет", "Finishing this report is a priority."],
    ["🧗", "a challenge", "виклик, складне завдання", "Learning a language is a challenge."],
    ["🔥", "under pressure", "під тиском", "How do you perform under pressure?"]
  ],
  tobe2: [
    ["🎯", "want to", "хочу", "I want to settle into my new role."],
    ["⚡", "need to", "потрібно", "We need to improve the click-through rate."],
    ["🗓️", "plan to", "планую", "I plan to launch the campaign next week."],
    ["🤞", "hope to", "сподіваюся", "We hope to reach a wider audience."],
    ["✅", "decide to", "вирішувати", "Management decides to change the budget."],
    ["🧠", "learn to", "вчитися (робити щось)", "I learn to use the new AI tools."],
    ["🔧", "try to", "намагатися", "I try to answer emails within 24 hours."],
    ["🧊", "state verbs", "дієслова стану — без -ing", "I know, I believe, I own, I need."]
  ],
  questions: [
    ["📍", "Where", "де / куди — місце", "Where do you work?"],
    ["🕒", "When", "коли — час", "When does your boss work late?"],
    ["🧑", "Who", "хто — людина", "Who is your boss?"],
    ["❓", "What", "що", "What do you do at work?"],
    ["💡", "Why", "чому — причина", "Why do you like your job?"],
    ["🔢", "How often", "як часто", "How often do you work late?"],
    ["🧩", "helper word", "допоміжне слово: do / does / is / are", "What does she do?"],
    ["👥", "overpopulation", "перенаселення", "Does saving lives lead to overpopulation?"],
    ["🎁", "give money away", "роздавати гроші", "Why are you giving your money away?"]
  ],
  questions2: [
    ["🔍", "follow-up question", "уточнювальне питання, що продовжує розмову", "Why? Are you on a diet?"],
    ["🙋", "What about you?", "а ти? — швидке питання у відповідь", "I like tea. What about you?"],
    ["🎯", "What exactly …?", "що саме …?", "What exactly do you hate about Mondays?"],
    ["🔢", "How many …?", "скільки (з іменником у множині)", "How many hours a week do you work?"],
    ["🍦", "Which …?", "який / котрий (з певного набору)", "Which ice-cream do you like?"],
    ["⏰", "What time …?", "о котрій / котра година", "What time is it?"],
    ["💼", "self-employed", "працює на себе (фрилансер)", "Why are you self-employed?"],
    ["🏢", "co-founder", "співзасновник", "Sergey Brin is a co-founder of Google."],
    ["🏅", "literature awards", "літературні премії", "Stephen King owns more than 110 literature awards."]
  ],
  mistakes: [
    ["🅰️", "Does he work?", "після does дієслово без -s", "Does he work late?"],
    ["🔁", "Do you…? — Yes, I do.", "перше слово питання = останнє слово відповіді", "Are you busy? — Yes, I am."],
    ["😩", "tired of", "втомлений від (не tired in)", "I'm tired of emails."],
    ["🛡️", "responsible for", "відповідальний за (не of)", "She is responsible for hiring."],
    ["🎯", "good at", "гарний у (чомусь)", "He is good at drawing."],
    ["🧩", "I am busy", "прикметнику потрібне be", "I am busy this week."],
    ["📖", "a problem", "перед злічуваним однини потрібен a", "I have a problem with that."],
    ["🧮", "much / many", "much — незлічуване, many — злічуване", "much electricity, many people"],
    ["🛠️", "do / make", "do homework, make a mistake", "I do homework. I make mistakes."]
  ],
  visual: [
    ["😩", "tired of", "втомлений від", "I'm tired of emails."],
    ["😨", "afraid of", "боятися (чогось)", "She is afraid of dogs."],
    ["🎯", "good at", "добре вміти", "He is good at drawing."],
    ["🏆", "proud of", "пишатися", "I'm proud of my team."],
    ["🤔", "interested in", "цікавитися", "We are interested in AI art."],
    ["😟", "worried about", "хвилюватися про", "I'm worried about the exam."],
    ["🛡️", "responsible for", "відповідальний за", "Max is responsible for the server."],
    ["🧑‍💼", "in charge of", "керувати, відповідати за", "Anna is in charge of the budget."],
    ["🪜", "hard for me", "складно для мене", "It is hard for me."]
  ],
  negatives: [
    ["⚖️", "work-life balance", "баланс роботи й особистого життя", "He needs a better work-life balance."],
    ["💬", "respond to emails", "відповідати на листи", "She doesn't like to respond to emails."],
    ["🛡️", "responsible / irresponsible", "відповідальний / безвідповідальний", "Anna is responsible for hiring."],
    ["📋", "responsibility", "обов'язок, відповідальність", "Hiring is Anna's responsibility."],
    ["🚚", "relocate", "переїхати в інше місто чи офіс", "She doesn't plan to relocate."],
    ["🧑‍💼", "hire", "наймати на роботу", "She wants to hire one more person."],
    ["👥", "manage the team", "керувати командою", "Ivan hopes to manage the team one day."],
    ["📱", "social media posts", "дописи в соцмережах", "The team writes posts for social media."],
    ["🚫", "don't / doesn't / isn't", "do/does + not, be + not", "She doesn't write posts. She isn't good at drawing."]
  ],
  beordo: [
    ["🏠", "share a flat", "ділити квартиру", "Tom, Nina and Leo share a flat."],
    ["🧾", "pay the bills", "платити за рахунки", "Tom pays the bills on the first of the month."],
    ["🗑️", "rubbish", "сміття", "Who is responsible for the rubbish?"],
    ["🔊", "loud music", "гучна музика", "The neighbours don't like loud music."],
    ["👥", "neighbours", "сусіди", "Nina is worried about the neighbours."],
    ["🔑", "rent a flat", "орендувати квартиру", "She wants to rent a bigger flat."],
    ["📦", "move out", "виїхати, переїхати", "She doesn't want to move out."],
    ["✍️", "-s / -es / -ies", "tries, washes, goes, plays", "try → tries · wash → washes · play → plays"],
    ["⚖️", "BE or DO?", "be — стани, do — дії", "She is tired. She doesn't want."]
  ],
  chunks: [
    ["📋", "responsible for", "відповідальний за", "Anna is responsible for the budget."],
    ["👔", "in charge of", "керує, очолює", "Max is in charge of user acquisition."],
    ["😩", "tired of", "набридло", "Ivan is tired of fixing the same bugs."],
    ["🏆", "proud of", "пишається", "The team is proud of the game."],
    ["🎨", "interested in", "цікавиться", "Max is interested in new ad formats."],
    ["🖌️", "good at", "добре вміє", "Olga is good at drawing."],
    ["🙈", "terrible at", "жахливо вміє", "She is terrible at writing emails."],
    ["😟", "worried about", "хвилюється через", "He is worried about crashes."],
    ["🔁", "chunk + -ing", "після прийменника — форма -ing", "tired of cooking, good at drawing"]
  ],
  presimple: [
    ["📈", "a strategic plan", "стратегічний план", "A detailed plan for long-term goals."],
    ["🏃", "to execute a plan", "виконати план", "We execute a new campaign every quarter."],
    ["🏷️", "a brand manager", "бренд-менеджер", "The brand manager owns the product image."],
    ["📦", "deliverables", "результати до дедлайну", "My deliverables are due on Friday."],
    ["🧭", "aligned with", "узгоджений із", "Our goals are aligned with the strategy."],
    ["🔭", "strategic vision", "стратегічне бачення", "She has a clear strategic vision."],
    ["🧰", "skill set", "набір навичок", "I want to expand my skill set."],
    ["🚪", "get into an industry", "прийти у галузь", "How do I get into the games industry?"]
  ]
};

// Вставляє питання перед оригінальним індексом at (після всіх пояснень, що задані за індексом).
function insertQuestions(id, list) {
  const l = LESSONS.find(x => x.id === id), old = l.quiz, out = [];
  old.forEach((q, i) => { list.filter(x => x[0] === i).forEach(x => out.push(x[1])); out.push(q); });
  list.filter(x => x[0] >= old.length).forEach(x => out.push(x[1]));
  l.quiz = out;
}

LESSONS.forEach(l => l.sections.splice(1, 0, { title: "Ілюстрована лексика", html: flipHtml(CARDS[l.id]) }));

insertQuestions("trial", [
  [5, { type: "match", q: "Поєднайте картинки з виразами з відео:", pairs: [
    { e: "😴", r: "barely awake" }, { e: "😨", r: "the dreaded four words" }, { e: "🗣️💬", r: "to yap on and on" },
    { e: "📚🎓", r: "relevant courses" }, { e: "🛡️", r: "to brace for" }],
    why: "barely awake — ледь прокинувся; dreaded — той, якого бояться; yap on — базікати безперервно; relevant — доречний, пов'язаний із темою; brace for — приготуватися до неприємного." }],
  [9, { type: "gapbank", q: "Вставте прийменники з відео:", bank: ["to", "for", "in", "for", "at"],
    sentences: ["I woke up ___ a call from Microsoft.", "I had applied ___ a software internship.", "Panic settled ___ as I thought about the answer.", "I braced ___ the first question."],
    answers: ["to", "for", "in", "for"], no: "Прийменник входить у стале словосполучення.",
    why: "woke up to — прокинувся від; apply for — подаватися на; settle in — охоплювати (про відчуття); brace for — готуватися до. Це стале поєднання слова й прийменника, його варто вчити разом." }],
  [12, { type: "pic", q: "Яка картинка відповідає фразі “Panic settled in”?", options: [{ e: "😰", t: "Panic" }, { e: "😎", t: "Calm and confident" }, { e: "🥳", t: "Celebration" }, { e: "😴", t: "Sleepy" }], answer: 0,
    no: [null, "Calm — спокій, протилежне паніці.", "Celebration — святкування, а не тривога.", "Sleepy — це barely awake, а не panic."],
    why: "Panic settled in — паніка охопила, тривога «осіла» всередині. Картинка 😰 передає саме цей стан." }],
  [12, { type: "sort", q: "Розкладіть частини відповіді «Tell me about yourself»:", buckets: ["Past", "Present", "Future"], items: [
    { t: "relevant courses", b: 0 }, { t: "projects that got me here", b: 0 }, { t: "my current role", b: 1 },
    { t: "why I want this role", b: 1 }, { t: "what I want to do next", b: 2 }, { t: "my goals for the next years", b: 2 }],
    why: "Past — освіта й проєкти, що привели вас сюди; Present — поточна ситуація й чому вам потрібна ця роль; Future — що ви хочете робити далі." }]
]);

insertQuestions("tobe1", [
  [0, { type: "match", q: "Яка фраза пасує до ситуації на картинці?", pairs: [
    { e: "🏅", l: "She gets the best results in the team.", r: "good at" },
    { e: "🥹🎉", l: "He feels happy about his team's success.", r: "proud of" },
    { e: "😟⏰", l: "She can't stop thinking about the deadline.", r: "worried about" },
    { e: "😩🚗", l: "The same traffic jam every single day…", r: "tired of" },
    { e: "🎨🖼️", l: "He loves visiting art museums.", r: "interested in" },
    { e: "📋✅", l: "She must send the weekly report.", r: "responsible for" }],
    why: "good at — вміти; proud of — пишатися; worried about — хвилюватися; tired of — набридло; interested in — цікавитися; responsible for — відповідати за. Кожна фраза завжди йде з одним і тим самим прийменником." }],
  [6, { type: "gapbank", q: "Вставте прикметник у речення:", bank: ["tired", "interested", "responsible", "proud", "worried", "good"],
    sentences: ["He's ___ of his commute.", "I'm ___ in modern art.", "She's ___ for the weekly report.", "My manager is ___ of our team.", "I'm ___ about the deadline."],
    answers: ["tired", "interested", "responsible", "proud", "worried"], no: "Прикметник і прийменник утворюють стале поєднання.",
    why: "tired of, interested in, responsible for, proud of, worried about — вчіть їх парами «прикметник + прийменник». Слово good тут зайве: good at — з іншим прийменником і значенням." }],
  [6, { type: "sort", q: "Розкладіть підмети за формою to be:", buckets: ["am", "is", "are"], items: [
    { t: "I", b: 0 }, { t: "my manager", b: 1 }, { t: "Everyone", b: 1 }, { t: "my colleagues", b: 2 }, { t: "you and I", b: 2 }, { t: "the deadlines", b: 2 }],
    why: "I → am; he/she/it, Everyone, одна людина → is; you/we/they і множина (colleagues, deadlines, you and I = we) → are." }],
  [11, { type: "pic", q: "Яка картинка відповідає: “He's in charge of the Asian branch.”?", options: [{ e: "👨‍💼🌏", t: "A manager leads a branch" }, { e: "🧑‍🎓📖", t: "A student reads a book" }, { e: "🏖️😎", t: "A person on holiday" }], answer: 0,
    no: [null, "Читання книги — не про керування філією.", "Відпустка — не про відповідальність за роботу."],
    why: "In charge of — керувати, очолювати. Тому картинка із керівником і картою світу пасує найкраще." }]
]);

insertQuestions("tobe2", [
  [4, { type: "match", q: "Поєднайте ситуацію з дієсловом (verb + to):", pairs: [
    { e: "🚀", l: "I ___ to launch the campaign next week.", r: "plan" },
    { e: "🤞", l: "We ___ to reach a wider audience.", r: "hope" },
    { e: "🧠", l: "I ___ to use the new AI tools.", r: "learn" },
    { e: "🔧", l: "I ___ to answer emails within 24 hours.", r: "try" },
    { e: "⚖️", l: "Management ___ to change the Q4 budget.", r: "decides" },
    { e: "⚡", l: "Our team ___ to improve the click rate.", r: "needs" }],
    why: "Після want, need, plan, hope, decide, learn, try ставимо to + інфінітив. Для he/she/it та однини (management, team) додаємо -s: decides, needs." }],
  [4, { type: "pic", q: "Яка картинка відповідає: “I try to answer client emails within 24 hours.”?", options: [{ e: "📧⏱️", t: "Answering emails quickly" }, { e: "🎮🕹️", t: "Playing a game" }, { e: "🍕🥤", t: "Having lunch" }], answer: 0,
    no: [null, "Гра — не про клієнтські листи.", "Обід — не про роботу з листами."],
    why: "try to + дієслово — намагатися щось робити. Тут це відповідати на листи протягом 24 годин." }],
  [10, { type: "gapbank", q: "Заповніть речення дієсловами з банку:", bank: ["need", "plan", "want", "hope", "learn", "decide", "try"],
    sentences: ["We ___ to finish the project before Friday.", "I ___ to launch my own game next year.", "I ___ to speak English more fluently.", "We ___ to hit our Q4 targets.", "I ___ to use new AI tools every month.", "They ___ to move the release to May.", "I ___ to answer every email on time."],
    answers: ["need", "plan", "want", "hope", "learn", "decide", "try"], no: "Це інше дієслово за змістом.",
    why: "Усі ці дієслова вживаються за схемою verb + to + infinitive. Значення підказує, яке слово пасує: need — потрібно, plan — планувати, hope — сподіватися, try — намагатися." }],
  [10, { type: "sort", q: "State чи dynamic verb?", buckets: ["State verbs (без -ing)", "Dynamic verbs (можна -ing)"], items: [
    { t: "know", b: 0 }, { t: "want", b: 0 }, { t: "need", b: 0 }, { t: "believe", b: 0 }, { t: "swim", b: 1 }, { t: "plan", b: 1 }, { t: "learn", b: 1 }, { t: "try", b: 1 }],
    why: "State verbs описують стан або думку (know, want, need, believe) — їх не вживають у -ing. Dynamic verbs — це дії та процеси (swim, plan, learn, try), можна I'm learning." }]
]);

insertQuestions("presimple", [
  [1, { type: "pic", q: "Яка картинка відповідає: “She usually starts her day by checking emails.”?", options: [{ e: "☕📧🌅", t: "Morning coffee and emails" }, { e: "🌙😴", t: "Sleeping at night" }, { e: "🏃⚽", t: "Playing football" }], answer: 0,
    no: [null, "Сон уночі — не початок робочого дня.", "Футбол — не про листи."],
    why: "Usually + Present Simple — звична дія. Ранок із кавою й листами — типова рутина." }],
  [4, { type: "match", q: "Поєднайте картинку з реченням (Present Simple):", pairs: [
    { e: "🐕💢", r: "My dog always barks at black dogs." },
    { e: "💅", r: "My wife sometimes does her nails." },
    { e: "🛒", r: "I usually go to a store every second day." },
    { e: "🏫📅", r: "We have classes on Wednesdays and Fridays." },
    { e: "📧☀️", r: "She usually starts her day by checking emails." }],
    why: "Present Simple для звичок і розкладів. Прислівник частотності (always, sometimes, usually) стоїть перед дієсловом; для he/she/it додаємо -s/-es (barks, does, starts)." }],
  [8, { type: "gapbank", q: "Додайте прислівник частотності:", bank: ["always", "rarely", "often", "never", "sometimes", "usually"],
    sentences: ["The marketing team ___ reviews last week's results before planning anything new.", "The studio ___ launches a game without QA approval.", "Giorgia ___ works closely with the brand team.", "The production and marketing teams ___ skip the weekly sync meeting.", "She ___ presents updates to senior management."],
    answers: ["always", "rarely", "often", "never", "sometimes"], no: "Це інший ступінь частотності за змістом.",
    why: "always — завжди, often — часто, sometimes — іноді, rarely — рідко, never — ніколи. Усі ставимо перед основним дієсловом (але після am/is/are)." }],
  [11, { type: "sort", q: "Що це: факт, думка чи звичка?", buckets: ["Fact / state", "Opinion", "Habit / routine"], items: [
    { t: "Mobile games generate over $100 billion a year.", b: 0 }, { t: "Our studio focuses on hyper-casual games.", b: 0 },
    { t: "I think short video ads work better than banners.", b: 1 }, { t: "I believe QA is the most important stage.", b: 1 },
    { t: "I check our dashboard every morning.", b: 2 }, { t: "The team reviews results every Monday.", b: 2 }],
    why: "Факт чи постійний стан — це істина; думка зазвичай із I think/believe; звичка має маркер повторення (every morning, every Monday). Усе це Present Simple." }]
]);
