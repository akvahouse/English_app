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
