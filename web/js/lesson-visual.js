// Тренажер «Picture & Sound Lab»: квізи з анімованими картинками та озвучкою на типові помилки.
// Тест (версія 1) вставляється між маркерами; версії 2–5 лежать у variants.js (EXTRA.visual).
const VISUAL_V1 = /*V1_START*/[
  HP("He is afraid of spiders.",
    [["😍 🕷️", "обожнює павуків"], ["😴 🛏️", "міцно спить"], ["😨 🕷️", "павук поряд"]],
    2,
    "Afraid of означає «боятися чогось»: після afraid завжди стоїть прийменник of. Тому підходить сцена зі страхом перед павуком.",
    "Тут людина радіє павукам, а в реченні сказано afraid of, тобто «боїться», а не «любить».",
    "На цій картинці людина спить, а в реченні немає жодного слова про сон: є is afraid of spiders."),

  SG("🧑‍💻 🌙 😩", "My friend always ___ late at night.", ["work", "works", "working"], 1,
    "Підмет my friend означає he/she, тому в Present Simple дієслово отримує закінчення -s: works. Слово always показує звичку, а не дію прямо зараз.",
    "Work без -s підходить лише до I, you, we, they; my friend — це одна особа (he/she), тож потрібне works.",
    "Форма working (-ing) без is/are не є дієсловом у реченні, а always показує звичку, тому потрібне просте works."),

  HP("She is worried about her exam.",
    [["😰 📝", "іспит на столі"], ["🥳 🎂", "святкує день народження"], ["🤒 🌡️", "хворіє"]],
    0,
    "Worried about означає «хвилюватися через щось»: після worried стоїть прийменник about. Тут це хвилювання перед іспитом.",
    "На цій картинці свято, а worried about означає хвилювання, а не радість.",
    "Тут людина хворіє, а в реченні хвилювання через іспит (worried about her exam), про хворобу нічого не сказано."),

  SG("😰 ❓", "How often ___ she feel nervous?", ["is", "do", "does"], 2,
    "У питанні з how often перед підметом потрібне допоміжне слово: з she це does, і тоді основне дієслово без -s: does she feel.",
    "Is ставимо перед прикметником або з -ing, а тут є дієслово feel, тому is не підходить: потрібне does.",
    "Do вживаємо лише з I, you, we, they; з she в питанні потрібне does."),

  VS("😌 🏅", ["He proud of his medal.", "He is proud of his medal.", "He does proud of his medal."], 1,
    "Proud — це прикметник, а перед прикметником потрібне дієслово be: he is proud of. Прийменник після proud — of.",
    "Тут бракує дієслова is: перед прикметником proud завжди потрібне be, інакше речення неповне.",
    "Does ставимо перед дієсловом дії, а proud — не дія, а стан, тому потрібне is, а не does."),

  HP("My brother doesn't like loud music.",
    [["😍 🎸 🔊", "рок на повну"], ["😖 🔊 🎸", "затуляє вуха"], ["🥱 📖", "нудна книжка"]],
    1,
    "Doesn't like означає «не любить»: заперечення з дієсловом дії будуємо через doesn't, а після нього дієслово без -s. Тож підходить сцена, де людині не подобається гучна музика.",
    "На цій картинці людині гучна музика подобається, а в реченні є заперечення doesn't like.",
    "Тут людина читає й нудьгує, а в реченні мова про гучну музику, яка не подобається."),

  SG("😩 📚 📚 📚", "I have too ___ homework.", ["a", "much", "many", "an"], 1,
    "Homework — незлічуваний іменник, тому з ним вживаємо much (too much homework), а не many. Артикль a тут також не ставимо.",
    "A (як і an) використовується перед злічуваним іменником в однині, а homework — незлічуваний, тож too a homework сказати не можна.",
    "Many вживаємо з злічуваними іменниками у множині (many books), а homework — незлічуваний, потрібне much.",
    "An стоїть лише перед злічуваним іменником в однині, а homework — незлічуваний, тому тут потрібне much."),

  SG("🧑 🐕 😄", "Are you afraid of dogs? No, I ___.", ["am not", "don't", "aren't", "doesn't"], 0,
    "Коротка відповідь повторює допоміжне слово з питання: на Are you…? відповідаємо з am (No, I am not). З I форма aren't не існує.",
    "Don't повторює do, а в питанні було Are you…?, тож і відповідь має бути з be: No, I am not.",
    "З підметом I форма aren't не вживається: з I потрібне am (I am not).",
    "Doesn't стоїть лише з he/she/it, а в питанні було Are, тому тут потрібне am not."),

  VS("👧 📚 ✏️ 🌙",
    ["She makes her homework every evening.", "She do her homework every evening.", "She does her homework every evening.", "She does her homeworks every evening."],
    2,
    "З homework вживаємо дієслово do (do homework), а не make. З she дієслово має -s: does. Слово homework незлічуване, тому без -s.",
    "З homework вживаємо do, а не make: make означає створювати щось нове, а завдання «виконують» (do).",
    "З she (одна особа) потрібне does, а do вживається лише з I, you, we, they.",
    "Homework — незлічуваний іменник і не має форми множини, тому homeworks неправильно."),

  HP("My dad is bad at cooking.",
    [["🛒 🧺", "іде по продукти"], ["😋 🍳 ✨", "смачна вечеря"], ["👨 😵 🔥 🍳", "підгоріла страва"]],
    2,
    "Bad at означає «погано вміти щось робити»: з bad і good вживаємо прийменник at, а після нього дієслово з -ing (bad at cooking). Тут батько спалив страву.",
    "На цій картинці людина йде в магазин, а в реченні мова про те, що тато погано готує (bad at cooking).",
    "Тут вечеря виходить смачною, а в реченні bad at cooking, тобто готувати погано, а не добре."),

  VS("📅 ⬅️ 😢 🌧️",
    ["Yesterday she felt very sad.", "Yesterday she feels very sad.", "Yesterday she is very sad."], 0,
    "Слово yesterday означає минулий час, тому потрібне Past Simple: felt (feel має неправильну форму минулого часу). Стрілка в сцені теж вказує на минуле.",
    "Feels — це теперішній час, а з yesterday вживаємо Past Simple (felt).",
    "Is — теперішній час, а yesterday вимагає минулого: was або felt, тож is не підходить."),

  VS("👦 🤒 ❓",
    ["How your brother feels today?", "How does your brother feels today?", "How does your brother feel today?", "How is your brother feels today?"],
    2,
    "У питанні з How перед підметом ставимо does, а основне дієслово без -s: How does your brother feel? Порядок слів: питальне слово, does, підмет, дієслово.",
    "Бракує допоміжного слова does: у питанні з дієсловом feel перед підметом your brother потрібне does.",
    "Після does дієслово стоїть без -s (feel), бо -s уже є в does; так не можна казати feels.",
    "Is не вживається разом із дієсловом дії feel: потрібне does, а не is, і feel без -s.")
]/*V1_END*/;

// статична анімована «сцена» з емодзі для конспекту
const vscene = s => `<span class="scene">${s.split(" ").map((e, i) => `<span class="sc-e a-${["bounce", "float", "wiggle", "pulse", "sway"][i % 5]}" style="--d:${(i * .37).toFixed(2)}s">${e}</span>`).join("")}</span>`;
const vrows = rows => `<table class="mtable vtable"><tr><th></th><th>Вираз</th><th>Приклад</th></tr>${rows.map(([sc, chunk, ex]) => `<tr><td class="vsc">${vscene(sc)}</td><td><b>${chunk}</b></td><td>${ex}</td></tr>`).join("")}</table>`;

LESSONS.push({
  id: "visual",
  title: "Picture & Sound Lab",
  short: "Picture lab",
  subtitle: "Квізи з анімованими картинками та озвучкою",
  summary: "Слухайте речення й обирайте картинку, дивіться на сцену й обирайте слово чи речення. Усе на ті помилки, які ми знайшли в ваших уроках; правильне речення звучить після кожної відповіді.",
  sections: [
    { title: "Як це працює", html: `
      <p>Це тренажер, де помилки, які повторюються у ваших уроках (прийменники, be, do / does, артиклі, much / many), відпрацьовуються через <b>картинку + звук</b>. Тест має три типи вправ:</p>
      <ol>
        <li><b>Почути й обрати картинку</b> — голос читає речення, ви обираєте анімовану сцену, яка йому відповідає.</li>
        <li><b>Сцена + пропуск</b> — дивитесь на сцену й обираєте слово для пропуску (прийменник, допоміжне слово, much / many, a / an…).</li>
        <li><b>Сцена + речення</b> — обираєте речення, яке правильно описує сцену. У хибних реченнях ваші типові помилки.</li></ol>
      <p class="hint">Після кожної відповіді правильне речення звучить ще раз. Повторюйте його вголос — так воно запам'ятовується краще, ніж просто читання. Речення озвучують різні голоси (жіночі й чоловічі, американські й британські), щоб вухо звикало до різної вимови.</p>` },
    { title: "Шпаргалка: вирази з прийменниками", html: `
      ${vrows([
        ["😩 ✉️", "tired of", "I'm tired of emails."],
        ["😨 🐕", "afraid of", "She is afraid of dogs."],
        ["🎯 🎨", "good at", "He is good at drawing."],
        ["🏆 👥", "proud of", "I'm proud of my team."],
        ["🤔 🖼️", "interested in", "We are interested in AI art."],
        ["😟 📝", "worried about", "I'm worried about the exam."],
        ["🛡️ 🖥️", "responsible for", "Max is responsible for the server."],
        ["🧑‍💼 💰", "in charge of", "Anna is in charge of the budget."]])}
      <p><b>Прийом:</b> вчіть прийменник разом зі словом, як одну цеглинку: <b>tired of</b>, <b>good at</b>, <b>responsible for</b>. І не забувайте <b>be</b> перед ними: I <b>am</b> tired of…, he <b>is</b> good at…</p>` },
    { title: "Шпаргалка: ваші найчастіші помилки", html: `
      <ol>
        <li><b>do / does + базова форма:</b> Does he <mark>work</mark> late? (не <s>works</s>)</li>
        <li><b>Коротка відповідь повторює допоміжне слово:</b> Do you…? — Yes, I <mark>do</mark>. Are you…? — Yes, I <mark>am</mark>.</li>
        <li><b>Be перед прикметником:</b> I <mark>am</mark> busy. (не <s>I busy</s>)</li>
        <li><b>Артикль:</b> I have <mark>a</mark> problem. Many / much: <mark>many</mark> apples, <mark>much</mark> water.</li>
        <li><b>Минуле:</b> yesterday, ago → Past Simple: I <mark>studied</mark> it two years ago.</li></ol>` },
    { title: "Спробуйте голосом", html: `
      <ol>
        <li>Подивіться на сцену й скажіть вголос, що в ній відбувається.</li>
        <li>Слухайте запис і повторюйте за ним: спочатку нормально, потім повільно (кнопка 🐢).</li>
        <li>Якщо відповіли неправильно — прочитайте пояснення й промовте правильне речення двічі.</li></ol>` }
  ],
  quiz: VISUAL_V1
});
