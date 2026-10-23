// Допоміжні конструктори питань для тестів (використовуються в data/variants/lesson-файлах).
const M = (q, options, answer, why, ...wr) => ({ type: "mc", q, options, answer, why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Цей варіант не відповідає правилу нижче.")) });
const P = (q, options, answer, why, ...wr) => ({ type: "pic", q, options: options.map(([e, t]) => ({ e, t })), answer, why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Ця картинка не пасує за змістом.")) });
const F = (q, answer, why, no = "Ця відповідь не підходить: перевірте форму слова й правило нижче.") => ({ type: "fill", q, answer: [].concat(answer), why, no });
const O = (answer, why) => ({ type: "order", words: answer.split(" "), answer, why, no: "Порядок слів неправильний. Перевірте правило нижче." });
const MA = (q, pairs, why) => ({ type: "match", q, pairs: pairs.map(([e, l, r]) => ({ e, l, r })), why });
const SO = (q, buckets, items, why) => ({ type: "sort", q, buckets, items: items.map(([t, b]) => ({ t, b })), why });
const G = (q, bank, sentences, answers, why) => ({ type: "gapbank", q, bank, sentences, answers, why, no: "" });
// Звукові завдання: L — послухати й обрати написане речення, D — диктант (вписати почуте).
const L = (say, options, answer, why, ...wr) => ({ type: "listen", q: "Послухайте речення й оберіть те, що ви почули:", say, options, answer, why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Це речення звучить інакше: прослухайте ще раз.")) });
const D = (say, answer, why, q = "Послухайте й впишіть речення, яке ви чуєте:") => ({ type: "dictate", q, say, answer: [].concat(answer), why, no: "" });
// R — послухати питання й обрати правильну коротку відповідь (say — питання, options — відповіді).
const R = (say, options, answer, why, ...wr) => ({ type: "listen", mode: "reply", q: "Послухайте питання й оберіть правильну коротку відповідь:", say, options, answer, why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Ця відповідь не відповідає допоміжному слову в питанні.")) });
// Візуальні вправи з анімованими сценами (емодзі) і озвучкою:
// HP — почути речення й обрати картинку; SG — сцена + речення з пропуском; VS — сцена + обрати речення, що її описує.
const HP = (say, options, answer, why, ...wr) => ({ type: "hearpic", q: "Послухайте речення й оберіть картинку, яка йому відповідає:", say, options: options.map(([e, t]) => ({ e, t })), answer, why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Ця картинка не відповідає почутому реченню.")) });
const SG = (scene, sentence, options, answer, why, ...wr) => ({ type: "scenegap", q: "Подивіться на сцену й оберіть слово для пропуску:", scene, sentence, options, answer, say: sentence.replace("___", options[answer]), why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Це слово не підходить до пропуску.")) });
const VS = (scene, options, answer, why, ...wr) => ({ type: "scenesay", q: "Яке речення описує цю сцену?", scene, options, answer, say: options[answer], why,
  no: options.map((_, i) => i === answer ? null : (wr.shift() || "Це речення містить помилку.")) });
