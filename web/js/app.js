const app = document.getElementById("app");
const KEY = "english_progress_v1";

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const save = p => { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const norm = s => s.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const LAST_KEY = "english_last_variant_v1";
// Випадкова версія тесту, але не та, що була минулого разу
function pickVersion(l) {
  let last = {};
  try { last = JSON.parse(localStorage.getItem(LAST_KEY)) || {}; } catch {}
  const pool = l.versions.filter((v, k) => k !== last[l.id]);
  const v = pool[Math.floor(Math.random() * pool.length)];
  try { last[l.id] = l.versions.indexOf(v); localStorage.setItem(LAST_KEY, JSON.stringify(last)); } catch {}
  return v;
}
// Перемішує варіанти відповіді (mc, pic) разом із поясненнями
function shuffleOptions(q) {
  if (q.type !== "mc" && q.type !== "pic") return q;
  const idx = shuffle(q.options.map((_, k) => k));
  return { ...q, options: idx.map(k => q.options[k]), answer: idx.indexOf(q.answer), no: Array.isArray(q.no) ? idx.map(k => q.no[k]) : q.no };
}

function updateOverall() {
  const p = load();
  const done = LESSONS.filter(l => p[l.id]).length;
  document.getElementById("overall").textContent = `Пройдено тестів: ${done}/${LESSONS.length}`;
}

function home() {
  const p = load();
  const next = LESSONS.find(l => !p[l.id]) || LESSONS[0];
  app.innerHTML = `<div class="eyebrow">ENGLISH · PERSONAL NOTEBOOK</div><div class="home-head"><div><h1>Мої уроки англійської</h1><p class="lead">Усе, що вивчаємо, — в одному місці.<br>Повертайся до тем і закріплюй знання на практиці.</p></div><span class="course-count">${LESSONS.length} тем курсу</span></div>
  <section class="continue"><div><div class="eyebrow">ТВІЙ НАСТУПНИЙ КРОК</div><h2>${esc(next.title)}</h2><p>${esc(next.subtitle)}</p></div><a class="btn" href="#/lesson/${next.id}">Відкрити урок</a></section>
  <div class="section-heading"><h2>Програма навчання</h2><span>${LESSONS.reduce((n,l)=>n+l.versions.reduce((m,v)=>m+v.quiz.length,0),0)} завдань у ${LESSONS.reduce((n,l)=>n+l.versions.length,0)} варіантах тестів</span></div>
  <div class="grid">${LESSONS.map((l, i) => {
    const r = p[l.id];
    return `<a class="card" style="--i:${i}" href="#/lesson/${l.id}"><div class="card-art">${ART[l.id]}</div><div class="card-meta"><div class="num">0${i+1}</div><span>${l.versions.length} варіантів тесту</span></div><h3>${esc(l.title)}</h3><p><b>${esc(l.subtitle)}</b></p><p>${esc(l.summary)}</p><div class="card-foot"><span>Відкрити урок</span><span class="badge ${r ? "done" : ""}">${r ? Math.round(r.best / r.total * 100) + "% · " + r.best + " / " + r.total : "До вивчення"}</span></div></a>`;
  }).join("")}</div>
  <div class="reset-row"><button type="button" class="reset-btn">↺ Скинути результати</button></div>`;
}

function lesson(id) {
  const l = LESSONS.find(x => x.id === id);
  if (!l) return home();
  app.innerHTML = `<section class="hero"><div><a class="back" href="#/">← Усі уроки</a>
  <h1>${esc(l.title)}</h1><p class="lead">${esc(l.subtitle)}</p>
  <div class="actions lesson-actions"><a class="btn" href="#/quiz/${l.id}">Пройти тест · випадковий із ${l.versions.length} варіантів</a></div></div>${ART[l.id]}</section>
  ${l.sections.map(s => `<section class="sec"><h2>${esc(s.title)}</h2>${s.html}</section>`).join("")}
  <div class="actions"><a class="btn" href="#/quiz/${l.id}">Пройти тест (випадковий варіант)</a><a class="btn ghost" href="#/">До списку</a></div>`;
}

function quiz(id) {
  const l = LESSONS.find(x => x.id === id);
  if (!l) return home();
  const ver = pickVersion(l);
  const qs = shuffle(ver.quiz).map(shuffleOptions);
  let i = 0, score = 0, streak = 0;
  const wrong = [];

  function show() {
    const q = qs[i];
    let built = [];
    app.innerHTML = `<a class="back" href="#/lesson/${l.id}">До конспекту</a>
    <h1>${esc(l.title)} — тест</h1>
    <div class="bar"><i id="barfill" style="width:${(Math.max(i - 1, 0) / qs.length) * 100}%"></i></div>
    <div class="tag">Питання ${i + 1} з ${qs.length} · Варіант ${ver.n} з ${l.versions.length}<span id="streak" class="streak" ${streak > 1 ? "" : "hidden"}>🔥 серія: ${streak}</span></div>
    <div class="sec" id="box"></div>`;
    const box = document.getElementById("box");
    requestAnimationFrame(() => requestAnimationFrame(() => { document.getElementById("barfill").style.width = (i / qs.length) * 100 + "%"; }));
    let answered = false;

    const finish = (ok, userAns, correctText, wrongWhy) => {
      if (answered) return;
      answered = true;
      const why = q.why || q.explain || "";
      streak = ok ? streak + 1 : 0;
      const st = document.getElementById("streak");
      if (st) { st.hidden = streak < 2; st.textContent = "🔥 серія: " + streak; st.classList.toggle("hot", streak >= 4); }
      if (ok) score++; else wrong.push({ q, userAns, correctText, why, wrongWhy });
      const last = i === qs.length - 1;
      const whyHtml = why ? `<small><b>Чому так:</b> ${esc(why)}</small>` : "";
      const parts = ok
        ? "✓ Правильно!" + whyHtml
        : `✗ Неправильно.<small><b>Ваша відповідь:</b> ${esc(userAns)}${wrongWhy ? " — " + esc(wrongWhy) : ""}</small><small><b>Правильно:</b> ${esc(correctText)}</small>` + whyHtml;
      box.insertAdjacentHTML("beforeend", `<div role="status" class="fb ${ok ? "ok" : "bad"}">${parts}</div>
        <div class="actions"><button class="btn" id="next">${last ? "Результат" : "Наступне питання"}</button></div>`);
      const next = document.getElementById("next");
      next.focus();
      next.onclick = () => { i++; i < qs.length ? show() : result(); };
    };

    if (q.type === "mc") {
      box.innerHTML = `<p class="q">${esc(q.q)}</p><div class="opts">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>`;
      box.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        if (answered) return;
        const k = +b.dataset.k, ok = k === q.answer;
        box.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("ok"); });
        if (!ok) b.classList.add("bad");
        finish(ok, q.options[k], q.options[q.answer], q.no && q.no[k]);
      });
    } else if (q.type === "fill") {
      box.innerHTML = `<p class="q">${esc(q.q)}</p><input aria-label="Ваша відповідь" class="fill" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ваша відповідь…">
        <div class="actions"><button class="btn" id="chk">Перевірити</button></div>`;
      const inp = document.getElementById("inp"), chk = document.getElementById("chk");
      inp.focus();
      const check = () => {
        if (answered || !inp.value.trim()) return;
        const ok = q.answer.some(a => norm(a) === norm(inp.value));
        inp.classList.add(ok ? "ok" : "bad"); inp.disabled = true; chk.remove();
        finish(ok, inp.value, q.answer[0], typeof q.no === "string" ? q.no : "");
      };
      chk.onclick = check;
      inp.onkeydown = e => { if (e.key === "Enter") check(); };
    } else if (q.type === "order") {
      const bank = shuffle(q.words.map((w, k) => ({ w, k })));
      box.innerHTML = `<p class="q">Складіть речення з слів:</p><div class="built" id="built"></div><div class="bank" id="bank"></div>
        <div class="actions"><button class="btn" id="chk" disabled>Перевірити</button><button class="btn ghost" id="clr">Скинути</button></div>`;
      const bEl = document.getElementById("built"), kEl = document.getElementById("bank"), chk = document.getElementById("chk"), clr = document.getElementById("clr");
      const draw = () => {
        bEl.innerHTML = built.map(x => `<button class="word" data-k="${x.k}">${esc(x.w)}</button>`).join("");
        kEl.innerHTML = bank.map(x => `<button class="word" data-k="${x.k}" ${built.includes(x) ? "disabled" : ""}>${esc(x.w)}</button>`).join("");
        chk.disabled = built.length !== bank.length || answered;
        if (answered) return;
        kEl.querySelectorAll(".word:not(:disabled)").forEach(b => b.onclick = () => { built.push(bank.find(x => x.k === +b.dataset.k)); draw(); });
        bEl.querySelectorAll(".word").forEach(b => b.onclick = () => { built = built.filter(x => x.k !== +b.dataset.k); draw(); });
      };
      clr.onclick = () => { if (!answered) { built = []; draw(); } };
      chk.onclick = () => {
        const ans = built.map(x => x.w).join(" ");
        const ok = norm(ans) === norm(q.answer);
        finish(ok, ans, q.answer, typeof q.no === "string" ? q.no : "");
        chk.disabled = true; clr.remove(); draw();
      };
      draw();
    } else if (QTYPES[q.type]) {
      QTYPES[q.type](q, box, finish, { esc, shuffle, norm });
    }
  }

  function result() {
    const p = load();
    const prev = p[l.id];
    if (!prev || score / qs.length >= prev.best / prev.total) p[l.id] = { best: score, total: qs.length, date: new Date().toISOString() };
    save(p); updateOverall();
    const pct = Math.round((score / qs.length) * 100);
    const msg = pct >= 90 ? "Чудово! 🎉" : pct >= 70 ? "Добре! 👍" : pct >= 50 ? "Непогано, повторіть конспект." : "Варто повторити тему.";
    app.innerHTML = `<h1>${esc(l.title)} — результат</h1>
    <div class="sec"><div class="medal">${pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
    <div class="ringwrap"><svg class="ring" viewBox="0 0 120 120"><circle class="ring-bg" cx="60" cy="60" r="52"/><circle id="ringfg" class="ring-fg ${pct >= 90 ? "great" : pct < 50 ? "low" : ""}" cx="60" cy="60" r="52" stroke-dasharray="326.7" stroke-dashoffset="326.7" transform="rotate(-90 60 60)"/></svg>
    <div class="ring-num"><div><b id="cnt">0</b><b>%</b></div><small>${score} з ${qs.length}</small></div></div>
    <p style="text-align:center">${msg}</p></div>
    ${wrong.length ? `<div class="sec review"><h2>Помилки</h2><ul>${wrong.map(w => `<li>${esc(w.q.q || "Складіть речення")}<br><span class="r-bad">Ваша відповідь: ${esc(w.userAns)}</span><br><span class="r-ok">Правильно: ${esc(w.correctText)}</span>${w.wrongWhy ? `<br><small>Чому ваша неправильна: ${esc(w.wrongWhy)}</small>` : ""}${w.why ? `<br><small>Чому так: ${esc(w.why)}</small>` : ""}</li>`).join("")}</ul></div>` : ""}
    <div class="actions"><a class="btn" href="#/quiz/${l.id}" id="retry">Пройти ще раз</a><a class="btn ghost" href="#/lesson/${l.id}">Конспект</a><a class="btn ghost" href="#/">Усі уроки</a></div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { document.getElementById("ringfg").style.strokeDashoffset = 326.7 * (1 - pct / 100); }));
    const cnt = document.getElementById("cnt"), t0 = performance.now();
    (function count(t) { const k = Math.min((t - t0) / 1300, 1); cnt.textContent = Math.round(pct * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(count); })(t0);
    if (pct >= 70) setTimeout(confetti, 350);
    document.getElementById("retry").onclick = e => { e.preventDefault(); quiz(l.id); };
  }

  show();
}

function route() {
  const [, page, id] = location.hash.split("/");
  window.scrollTo(0, 0);
  document.querySelectorAll(".confetti").forEach(c => c.remove());
  if (page === "lesson") lesson(id);
  else if (page === "quiz") quiz(id);
  else home();
  document.querySelectorAll("#lesson-nav a").forEach(n => n.classList.toggle("active", n.getAttribute("href") === `#/lesson/${id}` || n.getAttribute("href") === `#/quiz/${id}`.replace("quiz", "lesson")));
  if (reduceMotion()) document.querySelectorAll("svg.art").forEach(s => s.pauseAnimations && s.pauseAnimations());
}
window.addEventListener("hashchange", route);
document.getElementById("lesson-nav").innerHTML = LESSONS.map((l,i)=>`<a href="#/lesson/${l.id}"><span>0${i+1}</span>${esc(l.short || l.title)}</a>`).join("");
updateOverall();
route();

// Скидання результатів: два кліки (перший просить підтвердження)
document.addEventListener("click", e => {
  const b = e.target.closest(".reset-btn");
  if (!b) return;
  if (!b.classList.contains("armed")) {
    document.querySelectorAll(".reset-btn").forEach(x => { x.classList.add("armed"); x.textContent = "Точно скинути? Натисніть ще раз"; });
    clearTimeout(window.__resetTimer);
    window.__resetTimer = setTimeout(() => document.querySelectorAll(".reset-btn").forEach(x => { x.classList.remove("armed"); x.textContent = "↺ Скинути результати"; }), 4000);
    return;
  }
  clearTimeout(window.__resetTimer);
  try { localStorage.removeItem(KEY); } catch {}
  updateOverall();
  route();
  document.querySelectorAll(".reset-btn").forEach(x => { x.classList.remove("armed"); x.textContent = "✓ Результати скинуто"; setTimeout(() => { x.textContent = "↺ Скинути результати"; }, 2000); });
});
