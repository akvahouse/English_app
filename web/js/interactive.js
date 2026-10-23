// Нові інтерактивні типи завдань: pic, match, sort, gapbank + ефекти (конфетті).
// Кожен обробник: (q, box, finish, {esc, shuffle, norm}); finish(ok, userAns, correctText, wrongWhy).
const QTYPES = {};

const reduceMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

/* ---------- Вибір картинки ---------- */
QTYPES.pic = (q, box, finish, { esc }) => {
  box.innerHTML = `<p class="q">${esc(q.q)}</p><div class="pics">${q.options.map((o, k) =>
    `<button class="pic" style="--i:${k}" data-k="${k}"><span class="pic-e">${o.e}</span><span class="pic-t">${esc(o.t)}</span></button>`).join("")}</div>`;
  let done = false;
  box.querySelectorAll(".pic").forEach(b => b.onclick = () => {
    if (done) return; done = true;
    const k = +b.dataset.k, ok = k === q.answer;
    box.querySelectorAll(".pic").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("ok"); });
    if (!ok) b.classList.add("bad");
    finish(ok, q.options[k].t, q.options[q.answer].t, q.no && q.no[k]);
  });
};

/* ---------- З'єднати картинки з підписами ---------- */
QTYPES.match = (q, box, finish, { esc, shuffle }) => {
  const L = q.pairs.map((p, k) => ({ ...p, k }));
  const R = shuffle(L);
  box.innerHTML = `<p class="q">${esc(q.q)}</p><p class="hint">Натисніть картинку, а потім підпис, що їй відповідає. Пара забарвиться в один колір.</p>
    <div class="match"><div class="mcol">${L.map(p => `<button class="mcard mleft" data-k="${p.k}"><span class="me">${p.e}</span>${p.l ? `<span class="ml">${esc(p.l)}</span>` : ""}</button>`).join("")}</div>
    <div class="mcol">${R.map(p => `<button class="mcard mright" data-k="${p.k}">${esc(p.r)}</button>`).join("")}</div></div>
    <div class="mstat" id="mstat">З'єднано: 0 / ${L.length}</div>`;
  const cards = [...box.querySelectorAll(".mcard")];
  let sel = null, mistakes = 0, matched = 0;
  const clear = () => { cards.forEach(c => c.classList.remove("sel")); sel = null; };
  cards.forEach(c => c.onclick = () => {
    if (c.classList.contains("matched")) return;
    const side = c.classList.contains("mleft") ? "l" : "r";
    if (!sel || sel.side === side) { clear(); sel = { c, side }; c.classList.add("sel"); return; }
    const a = sel.c, ok = a.dataset.k === c.dataset.k;
    if (ok) {
      const hue = +c.dataset.k * 62 + 20;
      [a, c].forEach(x => { x.classList.remove("sel"); x.classList.add("matched"); x.style.setProperty("--h", hue); replay(x, "pop"); });
      sel = null; matched++;
      box.querySelector("#mstat").textContent = `З'єднано: ${matched} / ${L.length}`;
      if (matched === L.length) finish(mistakes === 0, `помилок у парах: ${mistakes}`, L.map(p => `${p.l || p.e} → ${p.r}`).join(" · "), "");
    } else {
      mistakes++; [a, c].forEach(x => replay(x, "shake")); clear();
      box.querySelector("#mstat").classList.add("warn");
    }
  });
};

/* ---------- Розсортувати по групах (клік або перетягування) ---------- */
QTYPES.sort = (q, box, finish, { esc, shuffle }) => {
  const items = shuffle(q.items.map((it, k) => ({ t: it.t, b: it.b, k, place: null, res: null })));
  let sel = null, done = false;
  box.innerHTML = `<p class="q">${esc(q.q)}</p><p class="hint">Натисніть слово й оберіть групу — або перетягніть. Натисніть на розміщене слово, щоб повернути його.</p>
    <div id="root"></div><div class="actions"><button class="btn" id="chk" disabled>Перевірити</button></div>`;
  const root = box.querySelector("#root"), chk = box.querySelector("#chk");
  const chip = it => `<button class="sch ${sel === it ? "sel" : ""} ${it.res === true ? "ok" : it.res === false ? "bad" : ""}" draggable="${!done}" data-k="${it.k}">${esc(it.t)}</button>`;
  const draw = () => {
    const pool = items.filter(i => i.place === null);
    root.innerHTML = `<div class="pool" data-pool="1">${pool.map(chip).join("") || '<span class="hint">Усе розподілено ✓</span>'}</div>
      <div class="buckets">${q.buckets.map((b, bi) => `<div class="bucket" data-b="${bi}" style="--bh:${bi * 95 + 215}"><h4>${esc(b)}</h4><div class="bitems">${items.filter(i => i.place === bi).map(chip).join("")}</div></div>`).join("")}</div>`;
    chk.disabled = done || items.some(i => i.place === null);
  };
  const byK = k => items.find(i => i.k === +k);
  root.addEventListener("click", e => {
    if (done) return;
    const c = e.target.closest(".sch");
    if (c) { const it = byK(c.dataset.k); if (it.place !== null) { it.place = null; sel = null; } else sel = sel === it ? null : it; draw(); return; }
    const bk = e.target.closest(".bucket");
    if (bk && sel) { sel.place = +bk.dataset.b; sel = null; draw(); }
  });
  root.addEventListener("dragstart", e => { const c = e.target.closest(".sch"); if (c && !done) e.dataTransfer.setData("text/plain", c.dataset.k); });
  root.addEventListener("dragover", e => { if (!done && e.target.closest(".bucket,.pool")) e.preventDefault(); });
  root.addEventListener("drop", e => {
    if (done) return; e.preventDefault();
    const it = byK(e.dataTransfer.getData("text/plain")); if (!it) return;
    const bk = e.target.closest(".bucket"); it.place = bk ? +bk.dataset.b : null; sel = null; draw();
  });
  chk.onclick = () => {
    done = true; items.forEach(it => it.res = it.place === it.b); draw();
    const bad = items.filter(i => !i.res);
    finish(!bad.length, bad.map(i => `${i.t} → ${q.buckets[i.place]}`).join("; "),
      q.buckets.map((b, bi) => `${b}: ${q.items.filter(i => i.b === bi).map(i => i.t).join(", ")}`).join(" | "),
      bad.length ? "Помилково розміщено: " + bad.map(i => `«${i.t}» має бути в групі «${q.buckets[i.b]}»`).join("; ") : "");
    root.querySelectorAll(".bad").forEach(x => replay(x, "shake"));
  };
  draw();
};

/* ---------- Вставити слова з банку в речення ---------- */
QTYPES.gapbank = (q, box, finish, { esc, shuffle, norm }) => {
  const bank = shuffle(q.bank.map((w, k) => ({ w, k })));
  const gaps = q.sentences.map(() => ({ it: null, res: null }));
  let done = false;
  box.innerHTML = `<p class="q">${esc(q.q)}</p><p class="hint">Натисніть слово — воно займе перше вільне місце. Натисніть на слово в реченні, щоб прибрати його.</p>
    <div id="root"></div><div class="actions"><button class="btn" id="chk" disabled>Перевірити</button></div>`;
  const root = box.querySelector("#root"), chk = box.querySelector("#chk");
  const draw = () => {
    root.innerHTML = `<ol class="gaps">${q.sentences.map((s, gi) => {
      const [a, b] = s.split("___"), g = gaps[gi];
      return `<li style="--i:${gi}">${esc(a)}<button class="gap ${g.it ? "filled" : ""} ${g.res === true ? "ok" : g.res === false ? "bad" : ""}" data-g="${gi}">${g.it ? esc(g.it.w) : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}</button>${esc(b || "")}</li>`;
    }).join("")}</ol>
    <div class="bank">${bank.filter(x => !gaps.some(g => g.it === x)).map(x => `<button class="word" data-k="${x.k}">${esc(x.w)}</button>`).join("") || '<span class="hint">Усі слова використано ✓</span>'}</div>`;
    chk.disabled = done || gaps.some(g => !g.it);
  };
  root.addEventListener("click", e => {
    if (done) return;
    const w = e.target.closest(".word"), g = e.target.closest(".gap");
    if (w) { const slot = gaps.find(x => !x.it); if (slot) { slot.it = bank.find(x => x.k === +w.dataset.k); draw(); } }
    else if (g && gaps[+g.dataset.g].it) { gaps[+g.dataset.g].it = null; draw(); }
  });
  chk.onclick = () => {
    done = true; gaps.forEach((g, gi) => g.res = norm(g.it.w) === norm(q.answers[gi])); draw();
    const bad = gaps.map((g, gi) => ({ g, gi })).filter(x => !x.g.res);
    finish(!bad.length, bad.map(x => `${x.gi + 1}) ${x.g.it.w}`).join("; "), q.answers.map((a, i) => `${i + 1}) ${a}`).join("; "),
      bad.length ? "Не на своєму місці: " + bad.map(x => `у реченні ${x.gi + 1} потрібне «${q.answers[x.gi]}»`).join("; ") : "");
    root.querySelectorAll(".gap.bad").forEach(x => replay(x, "shake"));
  };
  draw();
};

/* ---------- Звук: синтез мовлення браузера (без аудіофайлів) ---------- */
const TTS = (() => {
  const ok = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  let voice = null;
  const pick = () => {
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /^en[-_]US/i.test(v.lang) && /natural|google|aria|jenny|samantha|zira/i.test(v.name)) || vs.find(v => /^en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  };
  if (ok) { pick(); speechSynthesis.onvoiceschanged = pick; }
  const speak = (text, rate = 1) => {
    if (!ok) return false;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "en-US"; if (voice) u.voice = voice; u.rate = rate; speechSynthesis.speak(u); return true; }
    catch { return false; }
  };
  return { ok, speak };
})();
// Озвучка: готові mp3 (ElevenLabs) з assets/audio; якщо файлу немає — голос браузера.
const audioKey = s => { let h = 0x811c9dc5; for (const b of new TextEncoder().encode(s)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, "0"); };
let curAudio = null;
const playSound = (text, slow, onFail) => {
  try { if (curAudio) curAudio.pause(); if (TTS.ok) speechSynthesis.cancel(); } catch {}
  let fell = false;
  const fall = () => { if (fell) return; fell = true; if (!TTS.speak(text, slow ? .6 : 1)) onFail(); };
  const a = curAudio = new Audio("assets/audio/" + audioKey(text) + (slow ? "-slow" : "") + ".mp3");
  a.onerror = fall;
  const p = a.play();
  if (p && p.catch) p.catch(e => { if (!e || e.name !== "NotAllowedError") fall(); });
};
const soundBar = (q, box, auto = true) => {
  const warn = box.querySelector(".tts-warn");
  const play = slow => playSound(q.say, slow, () => { warn.hidden = false; });
  box.querySelector(".snd-fast").onclick = () => play(false);
  box.querySelector(".snd-slow").onclick = () => play(true);
  if (auto) setTimeout(() => play(false), 300);
  return play;
};
const soundHtml = () => `<div class="listen-bar"><button type="button" class="btn snd snd-fast">🔊 Слухати</button><button type="button" class="btn ghost snd snd-slow">🐢 Повільно</button></div>
  <p class="hint tts-warn" hidden>Браузер не відтворює звук. Перевірте гучність або відкрийте сайт у Chrome/Edge — а поки що можна розкрити текст нижче.</p>`;

/* ---------- Послухати й обрати написане речення ---------- */
QTYPES.listen = (q, box, finish, { esc }) => {
  box.innerHTML = `<p class="q">${esc(q.q)}</p>${soundHtml()}<div class="opts">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>`;
  soundBar(q, box);
  let done = false;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => {
    if (done) return; done = true;
    const k = +b.dataset.k, ok = k === q.answer;
    box.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("ok"); });
    if (!ok) b.classList.add("bad");
    finish(ok, q.options[k], q.options[q.answer], q.no && q.no[k]);
  });
};

/* ---------- Диктант: вписати почуте ---------- */
QTYPES.dictate = (q, box, finish, { esc, norm }) => {
  box.innerHTML = `<p class="q">${esc(q.q)}</p>${soundHtml()}<input aria-label="Ваша відповідь" class="fill" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Впишіть речення…">
    <div class="actions"><button class="btn" id="chk">Перевірити</button></div>`;
  soundBar(q, box);
  const inp = box.querySelector("#inp"), chk = box.querySelector("#chk");
  const strip = s => norm(s).replace(/[.,!?;:]/g, "").replace(/s+/g, " ").trim();
  let done = false;
  const check = () => {
    if (done || !inp.value.trim()) return; done = true;
    const ok = q.answer.some(a => strip(a) === strip(inp.value));
    inp.classList.add(ok ? "ok" : "bad"); inp.disabled = true; chk.remove();
    finish(ok, inp.value, q.answer[0], "");
  };
  chk.onclick = check;
  inp.onkeydown = e => { if (e.key === "Enter") check(); };
};

/* ---------- Анімовані сцени з емодзі ---------- */
const sceneHtml = scene => {
  let parts;
  try { parts = [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(scene)].map(s => s.segment); } catch { parts = Array.from(scene); }
  const anims = ["bounce", "float", "wiggle", "pulse", "sway"];
  return `<span class="scene">${parts.filter(p => p.trim()).map((c, k) => `<span class="sc-e a-${anims[k % anims.length]}" style="--d:${(k * .37).toFixed(2)}s">${c}</span>`).join("")}</span>`;
};
// Після відповіді показуємо кнопки звуку й одразу читаємо правильне речення
const revealSound = (q, box) => {
  box.querySelector(".listen-bar").hidden = false;
  const play = soundBar(q, box, false);
  setTimeout(() => play(false), 250);
};
const hiddenSound = () => soundHtml().replace('class="listen-bar"', 'class="listen-bar" hidden');

/* ---------- Почути речення й обрати анімовану картинку ---------- */
QTYPES.hearpic = (q, box, finish, { esc }) => {
  box.innerHTML = `<p class="q">${esc(q.q)}</p>${soundHtml()}<div class="pics hearpics">${q.options.map((o, k) =>
    `<button class="pic" style="--i:${k}" data-k="${k}"><span class="pic-e">${sceneHtml(o.e)}</span><span class="pic-t">${esc(o.t)}</span></button>`).join("")}</div>`;
  soundBar(q, box);
  let done = false;
  box.querySelectorAll(".pic").forEach(b => b.onclick = () => {
    if (done) return; done = true;
    const k = +b.dataset.k, ok = k === q.answer;
    box.querySelectorAll(".pic").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("ok"); });
    if (!ok) b.classList.add("bad");
    finish(ok, q.options[k].t, q.options[q.answer].t, q.no && q.no[k]);
  });
};

/* ---------- Сцена + речення з пропуском ---------- */
QTYPES.scenegap = (q, box, finish, { esc }) => {
  const [a, b] = q.sentence.split("___");
  box.innerHTML = `<p class="q">${esc(q.q)}</p><div class="stage">${sceneHtml(q.scene)}</div>
    <p class="sentence">${esc(a)}<span class="blank" id="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${esc(b || "")}</p>
    <div class="opts">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>${hiddenSound()}`;
  let done = false;
  box.querySelectorAll(".opt").forEach(bt => bt.onclick = () => {
    if (done) return; done = true;
    const k = +bt.dataset.k, ok = k === q.answer;
    box.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("ok"); });
    if (!ok) bt.classList.add("bad");
    const bl = box.querySelector("#blank"); bl.textContent = q.options[q.answer]; bl.classList.add(ok ? "ok" : "fixed");
    revealSound(q, box);
    finish(ok, q.options[k], q.options[q.answer], q.no && q.no[k]);
  });
};

/* ---------- Сцена + вибрати речення, що її описує ---------- */
QTYPES.scenesay = (q, box, finish, { esc }) => {
  box.innerHTML = `<p class="q">${esc(q.q)}</p><div class="stage">${sceneHtml(q.scene)}</div>
    <div class="opts">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>${hiddenSound()}`;
  let done = false;
  box.querySelectorAll(".opt").forEach(bt => bt.onclick = () => {
    if (done) return; done = true;
    const k = +bt.dataset.k, ok = k === q.answer;
    box.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("ok"); });
    if (!ok) bt.classList.add("bad");
    revealSound(q, box);
    finish(ok, q.options[k], q.options[q.answer], q.no && q.no[k]);
  });
};

/* ---------- Конфетті ---------- */
function confetti() {
  if (reduceMotion()) return;
  const c = document.createElement("canvas");
  c.className = "confetti"; document.body.appendChild(c);
  const ctx = c.getContext("2d"), W = c.width = innerWidth, H = c.height = innerHeight;
  const cols = ["#4f46e5", "#f59e0b", "#10b981", "#ec4899", "#38bdf8"];
  const ps = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * 200, y: H * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 13 - 3, s: 6 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: cols[Math.random() * cols.length | 0] }));
  let t = 0;
  (function tick() {
    ctx.clearRect(0, 0, W, H);
    ps.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); ctx.restore(); });
    if (++t < 150) requestAnimationFrame(tick); else c.remove();
  })();
}

/* ---------- Перевертні картки лексики ---------- */
document.addEventListener("click", e => {
  const f = e.target.closest(".flip");
  if (f) f.classList.toggle("on");
});
document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("flip")) { e.preventDefault(); e.target.classList.toggle("on"); }
});
