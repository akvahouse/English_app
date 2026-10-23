// Експорт контенту сайту (web/js/*.js) у EnglishNotebook/Resources/Content.json
// і копіювання картинок конспектів у EnglishNotebook/Resources/Notes/.
//
// Запуск: node tools/export-content.mjs
// Скрипт виконує JS сайту в ізольованому vm-контексті в тому ж порядку, що й index.html,
// потім перетворює HTML секцій у блокову модель. Невідомий HTML-тег → помилка (щоб нічого не загубити).

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { parse, NodeType } from "node-html-parser";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEB = path.join(ROOT, "web");
const OUT_DIR = path.join(ROOT, "EnglishNotebook", "Resources");
const NOTES_DIR = path.join(OUT_DIR, "Notes");
const AUDIO_DIR = path.join(OUT_DIR, "Audio");
const WEB_AUDIO = path.join(WEB, "assets", "audio");

// ---------- 1. Виконати JS сайту ----------
const ORDER = ["helpers", "data", "lesson-chunks", "lesson-beordo", "lesson-negatives", "lesson-questions", "lesson-questions2", "lesson-visual", "lesson-mistakes",
  "explanations", "art", "interactive", "more-content", "variants", "ticker"];

const elementStub = () => ({ innerHTML: "", textContent: "", classList: { add() {}, remove() {}, toggle() {} }, style: {} });
const sandbox = {
  console,
  document: { getElementById: () => elementStub(), querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, createElement: elementStub, body: { appendChild() {} } },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  location: { hash: "" },
  matchMedia: () => ({ matches: false }),
  requestAnimationFrame: () => 0,
  setTimeout: () => 0, clearTimeout() {},
  innerWidth: 400, innerHeight: 800,
  performance: { now: () => 0 },
};
sandbox.window = sandbox;
const ctx = vm.createContext(sandbox);
for (const name of ORDER) {
  const file = path.join(WEB, "js", `${name}.js`);
  vm.runInContext(fs.readFileSync(file, "utf8"), ctx, { filename: file });
}
// Ці змінні оголошені через const/let на верхньому рівні скриптів — дістаємо їх з контексту окремим виразом.
const { LESSONS, CARDS, TICKER_ITEMS } = vm.runInContext("({ LESSONS, CARDS, TICKER_ITEMS })", ctx);

// ---------- 2. HTML → блоки ----------
const INLINE_TAGS = new Set(["b", "strong", "mark", "s", "u", "i", "em", "small", "br", "a", "span"]);
const escText = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const collapseWs = s => s.replace(/\s+/g, " ");

// Інлайн-формат: невеликий набір тегів <b> <mark> <s> <u> <i> <small> <a href=""> + "\n".
function inline(node) {
  if (node.nodeType === NodeType.TEXT_NODE) return escText(collapseWs(node.rawText.replace(/&nbsp;/g, " ")).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
  if (node.nodeType !== NodeType.ELEMENT_NODE) return "";
  const t = node.tagName.toLowerCase();
  const inner = () => node.childNodes.map(inline).join("");
  switch (t) {
    case "b": case "strong": return `<b>${inner()}</b>`;
    case "mark": return `<mark>${inner()}</mark>`;
    case "s": return `<s>${inner()}</s>`;
    case "u": return `<u>${inner()}</u>`;
    case "i": case "em": return `<i>${inner()}</i>`;
    case "small": return `<small>${inner()}</small>`;
    case "br": return "\n";
    case "span": return inner();
    case "a": return `<a href="${node.getAttribute("href") || ""}">${inner()}</a>`;
    default: throw new Error(`Неочікуваний інлайн-тег <${t}> у: ${node.outerHTML.slice(0, 120)}`);
  }
}
const inlineAll = nodes => nodes.map(inline).join("").replace(/ *\n */g, "\n").trim();

const isBlank = n => n.nodeType === NodeType.TEXT_NODE && !n.rawText.trim();
const tagOf = n => n.nodeType === NodeType.ELEMENT_NODE ? n.tagName.toLowerCase() : null;
const hasClass = (n, c) => n.classList && n.classList.contains(c);

function listItem(li) {
  // li може містити вкладений список — додаємо його рядками з маркером
  const parts = [], nested = [];
  for (const c of li.childNodes) {
    const t = tagOf(c);
    if (t === "ul" || t === "ol") nested.push(...c.querySelectorAll(":scope > li").map(x => "  • " + listItem(x)));
    else parts.push(inline(c));
  }
  let s = parts.join("").replace(/ *\n */g, "\n").trim();
  if (nested.length) s += "\n" + nested.join("\n");
  return s;
}

function table(node) {
  const rows = node.querySelectorAll("tr");
  const grid = []; // grid[r][c] = {text, colspan} або {text:"", cont:true}
  const pending = {}; // col -> {rowsLeft}
  rows.forEach((tr, r) => {
    const row = []; let c = 0;
    const cells = tr.childNodes.filter(n => tagOf(n) === "td" || tagOf(n) === "th");
    for (const cell of cells) {
      while (pending[c] && pending[c] > 0) { row.push({ text: "", cont: true }); pending[c]--; c++; }
      const colspan = +(cell.getAttribute("colspan") || 1), rowspan = +(cell.getAttribute("rowspan") || 1);
      row.push({ text: inlineAll(cell.childNodes), colspan, header: tagOf(cell) === "th" });
      if (rowspan > 1) pending[c] = rowspan - 1;
      c += colspan;
    }
    while (pending[c] && pending[c] > 0) { row.push({ text: "", cont: true }); pending[c]--; c++; }
    grid.push(row);
  });
  const headerRow = grid[0].every(x => x.header) ? grid.shift() : null;
  const strip = row => row.map(({ text, colspan, cont }) => ({ text, ...(colspan > 1 ? { colspan } : {}), ...(cont ? { cont: true } : {}) }));
  return { kind: "table", header: headerRow ? strip(headerRow) : null, rows: grid.map(strip) };
}

function blocks(nodes) {
  const out = [];
  let inlineBuf = [];
  const flush = () => {
    const text = inlineAll(inlineBuf);
    if (text) out.push({ kind: "paragraph", text });
    inlineBuf = [];
  };
  for (const n of nodes) {
    if (isBlank(n)) { inlineBuf.push(n); continue; }
    const t = tagOf(n);
    if (t === null || INLINE_TAGS.has(t)) { inlineBuf.push(n); continue; }
    flush();
    switch (t) {
      case "p":
        if (hasClass(n, "hint")) out.push({ kind: "hint", text: inlineAll(n.childNodes) });
        else if (hasClass(n, "source-note")) out.push({ kind: "hint", text: inlineAll(n.childNodes) });
        else { const text = inlineAll(n.childNodes); if (text) out.push({ kind: "paragraph", text }); }
        break;
      case "ul": out.push({ kind: "bullets", items: n.querySelectorAll(":scope > li").map(listItem) }); break;
      case "ol": out.push({ kind: "numbered", items: n.querySelectorAll(":scope > li").map(listItem) }); break;
      case "table": out.push(table(n)); break;
      case "details": {
        const summary = n.querySelector("summary");
        out.push({ kind: "details", summary: inlineAll(summary.childNodes), blocks: blocks(n.childNodes.filter(c => c !== summary)) });
        break;
      }
      case "div":
        if (hasClass(n, "pair")) {
          out.push({ kind: "pair", cells: n.querySelectorAll(":scope > div").map(cell => {
            const tagEl = cell.childNodes.find(c => tagOf(c) === "div" && hasClass(c, "tag"));
            const color = tagEl ? ["past", "present", "future"].find(c => hasClass(tagEl, c)) || null : null;
            const rest = cell.childNodes.filter(c => c !== tagEl);
            return { tag: tagEl ? inlineAll(tagEl.childNodes) : null, tagColor: color, blocks: blocks(rest) };
          }) });
        } else if (hasClass(n, "chips")) {
          out.push({ kind: "chips", items: n.querySelectorAll(":scope > .chip").map(c => inlineAll(c.childNodes)) });
        } else if (hasClass(n, "tag")) {
          out.push({ kind: "tag", text: inlineAll(n.childNodes), color: ["past", "present", "future"].find(c => hasClass(n, c)) || null });
        } else if (hasClass(n, "source-images")) {
          out.push({ kind: "sourceImages", files: n.querySelectorAll("img").map(i => path.basename(i.getAttribute("src"))) });
        } else if (hasClass(n, "flips")) {
          throw new Error("div.flips має замінюватись на flipCards до парсингу");
        } else {
          // Звичайний div без класу — обробляємо вміст як вкладені блоки
          out.push(...blocks(n.childNodes));
        }
        break;
      default:
        throw new Error(`Невідомий блочний тег <${t}>: ${n.outerHTML.slice(0, 160)}`);
    }
  }
  flush();
  return out;
}

function sectionBlocks(html) {
  const root = parse(html, { blockTextElements: {} });
  return blocks(root.childNodes);
}

// ---------- 3. Питання ----------
// Озвучка: як audioKey() на сайті — FNV-1a (32 біт) від UTF-8 тексту → assets/audio/<key>[-slow].mp3.
// Якщо файлу немає, поле audio не ставимо — додаток говорить системним голосом.
const audioFiles = new Set();
function audioKey(text) {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(text)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0");
}
function sound(say) {
  const key = audioKey(say);
  const has = suffix => fs.existsSync(path.join(WEB_AUDIO, key + suffix + ".mp3"));
  if (!has("")) return { say };
  audioFiles.add(key + ".mp3");
  if (has("-slow")) audioFiles.add(key + "-slow.mp3");
  return { say, audio: key, audioSlow: has("-slow") };
}
const noList = q => Array.isArray(q.no) ? q.no.map(x => x ?? null) : null;

function question(q) {
  const why = q.why || q.explain || null;
  switch (q.type) {
    case "mc": return { type: "mc", q: q.q, options: q.options, answer: q.answer, why, no: Array.isArray(q.no) ? q.no.map(x => x ?? null) : null };
    case "fill": return { type: "fill", q: q.q, answers: [].concat(q.answer), why, no: typeof q.no === "string" && q.no ? q.no : null };
    case "order": return { type: "order", words: q.words, answer: q.answer, why, no: typeof q.no === "string" && q.no ? q.no : null };
    case "pic": return { type: "pic", q: q.q, options: q.options.map(o => ({ emoji: o.e, text: o.t })), answer: q.answer, why, no: Array.isArray(q.no) ? q.no.map(x => x ?? null) : null };
    case "match": return { type: "match", q: q.q, pairs: q.pairs.map(p => ({ emoji: p.e, left: p.l || null, right: p.r })), why };
    case "sort": return { type: "sort", q: q.q, buckets: q.buckets, items: q.items.map(i => ({ text: i.t, bucket: i.b })), why };
    case "gapbank": return { type: "gapbank", q: q.q, bank: q.bank, sentences: q.sentences, answers: q.answers, why, no: typeof q.no === "string" && q.no ? q.no : null };
    case "listen": return { type: "listen", q: q.q, ...sound(q.say), reply: q.mode === "reply", options: q.options, answer: q.answer, why, no: noList(q) };
    case "dictate": return { type: "dictate", q: q.q, ...sound(q.say), answers: [].concat(q.answer), why };
    case "hearpic": return { type: "hearpic", q: q.q, ...sound(q.say), options: q.options.map(o => ({ emoji: o.e, text: o.t })), answer: q.answer, why, no: noList(q) };
    case "scenegap": return { type: "scenegap", q: q.q, scene: q.scene, sentence: q.sentence, ...sound(q.say), options: q.options, answer: q.answer, why, no: noList(q) };
    case "scenesay": return { type: "scenesay", q: q.q, scene: q.scene, ...sound(q.say), options: q.options, answer: q.answer, why, no: noList(q) };
    default: throw new Error("Невідомий тип питання " + q.type);
  }
}

// ---------- 4. Збірка ----------
const slug = s => s.toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, "-").replace(/^-|-$/g, "");
const stats = { lessons: 0, sections: 0, versions: 0, questions: {}, blocks: {} };
const countBlocks = bs => bs.forEach(b => { stats.blocks[b.kind] = (stats.blocks[b.kind] || 0) + 1; if (b.blocks) countBlocks(b.blocks); if (b.cells) b.cells.forEach(c => countBlocks(c.blocks)); });

const lessons = LESSONS.map((l, index) => {
  const sections = l.sections.map((s, si) => {
    let bl;
    if (s.title === "Ілюстрована лексика") {
      const cards = (CARDS[l.id] || []).map(([emoji, en, ua, example]) => ({ emoji, en, ua, example }));
      bl = [{ kind: "hint", text: "Натисніть на картку, щоб побачити переклад і приклад." }, { kind: "flipCards", cards }];
    } else bl = sectionBlocks(s.html);
    countBlocks(bl);
    return { id: `${l.id}-${si}-${slug(s.title)}`, title: s.title, blocks: bl };
  });
  const versions = l.versions.map(v => ({ n: v.n, questions: v.quiz.map(question) }));
  versions.forEach(v => v.questions.forEach(q => { stats.questions[q.type] = (stats.questions[q.type] || 0) + 1; }));
  stats.lessons++; stats.sections += sections.length; stats.versions += versions.length;
  return { id: l.id, index: index + 1, title: l.title, short: l.short || l.title, subtitle: l.subtitle, summary: l.summary, sections, versions };
});

const ticker = TICKER_ITEMS.map(([en, ua, emoji]) => ({ en, ua, emoji }));
const content = { lessons, ticker };

// Перевірка: у текстах не лишилось "сирого" HTML, окрім дозволених інлайн-тегів
const allowed = /<\/?(b|mark|s|u|i|small|a( href="[^"]*")?)>/g;
JSON.stringify(content, (k, v) => {
  if (typeof v === "string" && /<[a-z]/i.test(v.replace(allowed, ""))) throw new Error("Залишковий HTML у тексті: " + v.slice(0, 120));
  return v;
});

fs.mkdirSync(NOTES_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "Content.json"), JSON.stringify(content, null, 1));
const images = new Set();
JSON.stringify(content, (k, v) => { if (k === "files") v.forEach(f => images.add(f)); return v; });
for (const f of images) fs.copyFileSync(path.join(WEB, "assets", f), path.join(NOTES_DIR, f));
// Аудіо: синхронізуємо теку, а не перестворюємо її — інакше iCloud Drive (тека Documents)
// плодить «копії конфліктів» «… 2.mp3». Копіюємо лише нові/змінені файли, зайві видаляємо.
fs.mkdirSync(AUDIO_DIR, { recursive: true });
for (const f of fs.readdirSync(AUDIO_DIR)) if (!audioFiles.has(f)) fs.rmSync(path.join(AUDIO_DIR, f));
for (const f of audioFiles) {
  const src = path.join(WEB_AUDIO, f), dst = path.join(AUDIO_DIR, f);
  if (!fs.existsSync(dst) || !fs.readFileSync(src).equals(fs.readFileSync(dst))) fs.copyFileSync(src, dst);
}

const totalQ = Object.values(stats.questions).reduce((a, b) => a + b, 0);
console.log(`Уроків: ${stats.lessons}, секцій: ${stats.sections}, версій тестів: ${stats.versions}, питань: ${totalQ}`);
console.log("Питання за типами:", stats.questions);
console.log("Блоки:", stats.blocks);
console.log(`Бігучий рядок: ${ticker.length} фраз; картинок скопійовано: ${images.size}; аудіо: ${audioFiles.size}`);
