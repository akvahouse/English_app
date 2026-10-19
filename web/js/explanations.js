// Пояснення до питань тестів. Порядок збігається з порядком питань у LESSONS[].quiz.
// Кожен запис: [чому правильна відповідь правильна, чому неправильні]
//  - для mc: масив того ж розміру, що й options (null для правильного варіанта);
//  - для fill / order: один рядок — типова причина помилки.
const GENERIC = "Ваша відповідь не відповідає правилу нижче.";
const EXPL = {
trial: [
  ["barely = ледве, ледь. Barely awake — щойно прокинувся, ще напівсонний.", ["Fully awake — повністю прокинувся, це протилежне до barely.", null]],
  ["Dreaded — той, якого бояться (від dread — страх). The dreaded four words — слова «Tell me about yourself», яких бояться на співбесіді.", ["Excited — це радість, а dreaded — страх і тривога.", null]],
  ["To yap on — безперервно базікати, часто безладно й без користі.", [null, "Це протилежне значення: yap — це говорити багато й безладно, а не чітко й коротко."]],
  ["Relevant — той, що стосується теми чи ситуації. Relevant courses — курси, пов'язані з роботою.", [null, "Це про складність (difficult), а relevant — про зв'язок із темою."]],
  ["To brace for — морально підготуватися до чогось неприємного.", [null, "Brace for — не уникати, а навпаки зустріти складне підготовленим."]],
  ["Wake up to + щось — прокинутися і побачити/почути це (woke up to a call — прокинувся від дзвінка).", "У цій сталій конструкції після wake up потрібен саме to."],
  ["Apply for + посада/програма (apply for an internship). Apply to вживаємо з організацією: apply to a company.", "На посаду чи стажування подаються з for, а не з іншими прийменниками."],
  ["Panic settled in — паніка охопила мене. Settle in — це фразове дієслово («закріпитися, оселитися»).", "Тут фразове дієслово settle in — прийменник не замінюється."],
  ["Excited for/about + something. У відео сказано for, але about теж правильно.", "З excited ми вживаємо for або about."],
  ["Підмет he → у Present Simple додаємо -s: he wakes.", "Форма wake без -s — лише для I/you/we/they. Після he/she/it потрібне -s."],
  ["Після he/she/it дієслово має -s. Якщо воно закінчується на -o, додаємо -es: go → goes (dog = it).", "Dog — це it, тому go → goes. Форма go без -es — для I/you/we/they."],
  ["She → he/she/it, тому get → gets.", "Після she потрібне -s: gets."],
  ["Структура: спершу Present (хто ти зараз і чому хочеш цю роль), потім Past (релевантні курси й проєкти), потім Future (чого хочеш досягти).", ["Починати з минулого — не стратегія: спочатку розкажіть, хто ви зараз.", null, "Майбутнє без бази про теперішнє й минуле звучить безпідставно; воно іде останнім."]]
],
tobe1: [
  ["Worried about — хвилюватися про. Із речення «I don't think we'll finish on time» видно саме хвилювання, а не втому чи гордість.", "Тут потрібне хвилювання: I'm worried about…; інші слова не пасують за змістом."],
  ["Tired of + щось — набридло, втомився від цього.", "Стала фраза: tired of (а не tired from/about)."],
  ["Proud of — пишатися чимось.", "Після proud завжди of."],
  ["Interested in — цікавитися чимось.", "Після interested завжди in."],
  ["Responsible for — відповідальний за щось.", "Після responsible завжди for."],
  ["In charge of — керувати, відповідати за (посада). In charge of the branch — очолює філію.", "Фраза in charge of завжди з of."],
  ["Everyone граматично однина (як he/she), тому to be — is.", ["Am — тільки з I.", null, "Are — для you/we/they. Everyone, незважаючи на значення «усі», — однина."]],
  ["Wife = she → is; заперечення isn't.", [null, "Aren't — для you/we/they; wife — це she.", "Am not — тільки з I."]],
  ["Colleagues — множина (they) → are.", ["Is — для однини; colleagues — множина.", null, "Am — лише з I."]],
  ["З I вживаємо am: I am (I'm).", ["Is — для he/she/it.", "Are — для you/we/they.", null]],
  ["A priority — те, що найважливіше й робиться першим. «Finishing this report… for me this week» = пріоритет.", [null, "A challenge — складне завдання, але речення про важливість і терміни, тобто пріоритет.", "Tired of — це почуття людини; про завдання так не кажуть, і потрібен іменник після is."]],
  ["У питанні з to be порядок: Are + підмет + …? (Are you good at…?).", ["Порядок слів як у ствердженні — це не питання. Дієслово to be має бути перед підметом.", null, "Do не потрібне з to be: am/is/are самі утворюють питання."]],
  "Who — підмет, тому одразу після Who стоїть is, потім in charge of + додаток.",
  "To be у питанні стоїть перед підметом: Are + you + …?"
].map(e => typeof e === "string" ? [e, GENERIC] : e),
tobe2: [
  ["The balance isn't very good recently — підмет один (the balance), заперечення з to be: is not / isn't. Recently (останнім часом) може вживатися з Present Simple/Perfect, last week — з минулим.", ["Тут два підмети поспіль (the balance it's) — зайве it. Також last week — минулий час, тому потрібне was.", null, "Заперечення з to be — is not (isn't) після підмета, а не not is."]],
  ["Repetitive — нудно однаковий, що постійно повторюється (repetitive work). Repeated — повторений кілька разів (a repeated mistake).", ["Repeated — те, що трапилося кілька разів (a repeated mistake), а не характер роботи.", null, "Repeating у цьому значенні не вживається."]],
  ["Look at — навмисно подивитися (картинки, годинник). Watch — дивитися тривало (TV, фільми). See — бачити, не керуючи поглядом.", ["Watch — для телевізора й фільмів; на годинник швидко дивимося — look at.", null, "See — здатність бачити; для спрямованого погляду потрібне look at."]],
  ["Підмет he → finds (з -s). Прислівник very quickly ставимо в кінці, після додатка.", ["Після he/she/it дієслово має -s: finds.", null, "Не розриваємо дієслово й додаток прислівником: finds dependencies very quickly."]],
  "Team — однина (як it), тому needs (з -s): Our team needs to improve… (need + to + infinitive).",
  "Підмет I → дієслово без -s: I plan to launch… (plan + to + infinitive).",
  "We → hope без -s: We hope to reach… (hope + to + infinitive).",
  "Management — однина (як it), тому decides (з -s): Management decides to change…",
  "I → learn без -s: I learn to use… (learn + to + infinitive).",
  "I → try без -s: I try to answer… (try + to + infinitive).",
  ["Know — стативне (стан), у -ing майже не вживається. Swim, learn, try — динамічні дії, можна swimming, learning, trying.", ["Swim — дія, можна I'm swimming.", "Learn — процес, можна I'm learning.", null, "Try — дія, можна I'm trying."]],
  ["Це загальновідома істина — факт. Present Simple.", [null, "Opinion — це особиста думка (I think…), а тут перевірена істина.", "Звичка — регулярна дія; Земля не робить цього «за звичкою».", "Дія зараз — Present Continuous."]],
  ["Every morning — маркер регулярної дії, тобто звички.", ["Не загальна істина, а особиста регулярна дія.", "Opinion — коли висловлюємо ставлення (I think…).", null, "Permanent state — постійна ситуація (I live in…); every morning вказує на повторювану дію."]],
  "Прислівник частотності стоїть перед основним дієсловом: I frequently update…",
  "Not always easy — заперечення not стоїть перед always: It's not always easy…"
].map(e => typeof e === "string" ? [e, GENERIC] : e),
presimple: [
  ["Usually / every day — маркери звички → Present Simple. Manager = he → checks.", ["Після he/she/it потрібне -s: checks.", null, "Is checking — Present Continuous (дія зараз), а usually і every day вказують на звичку."]],
  ["Після I дієслово без -s: need. Always стоїть перед основним дієсловом, потім need + to + infinitive.", [null, "Після I форма needs неправильна: -s — тільки для he/she/it.", "Need — стативне дієслово, не вживається в -ing."]],
  ["Заперечення з to be: I am not (I'm not) interested.", ["Not не ставимо після підмета перед to be; правильно I'm not.", null, "Interested — прикметник, а не дієслово, тому з to be, а не з do."]],
  ["Постійну ситуацію описуємо Present Simple: I work in… Present Continuous — тимчасово й зараз.", ["I'm working — це про дію зараз або тимчасову; постійну роботу описуємо Present Simple.", null]],
  "Підмет she → get + s: gets. Present Simple: після he/she/it додаємо -s.",
  "Team — однина (it) → skips. Never стоїть перед дієсловом.",
  "Studio — однина (it) → launches. Після ch додаємо -es.",
  "З днями тижня (Wednesdays, Fridays) вживаємо on.",
  ["Frequency adverb стоїть після to be: He is usually… He — однина → is.", ["Are — для you/we/they; he → is.", null, "Без to be у реченні немає дієслова."]],
  "Підмет + прислівник + дієслово: She usually starts… (usually перед starts).",
  "Підмет + always + дієслово: The team always reviews… (always перед reviews).",
  ["Strategic plan — детальний довгостроковий план розвитку компанії.", ["Strategic — довгостроковий і загальний, а не щоденний список справ.", null]],
  ["Execute — виконувати, реалізовувати план.", [null, "Execute — виконувати, а не скасовувати."]],
  ["Brand manager відповідає за маркетинг продукту чи бренду й його сприйняття.", ["Brand manager — не про технічні сервери, а про маркетинг.", null]],
  ["Deliverables — конкретні результати, які команда пообіцяла здати до дедлайну.", [null, "Deliverables — результати роботи, а не фізичні посилки."]],
  ["Aligned with — узгоджений з чимось, відповідає цілі чи плану.", ["Aligned with — не про розташування, а про відповідність цілі чи плану.", null]],
  ["Skill set — сукупність усіх умінь і навичок людини.", ["Сертифікат — це certificate, а skill set — усі навички загалом.", null]],
  ["Get into an industry — почати працювати в певній галузі.", ["Інвестувати — invest; get into an industry — прийти працювати в сферу.", null]]
].map(e => typeof e === "string" ? [e, GENERIC] : e)
};
LESSONS.forEach(l => l.quiz.forEach((q, i) => { const e = (EXPL[l.id] || [])[i]; if (e) { q.why = e[0]; q.no = e[1]; } }));
