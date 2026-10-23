// Векторні ілюстрації до уроків (inline SVG, кольори беруться з теми сайту).
const ART = (() => {
  const wrap = (label, body) => `<svg class="art" viewBox="0 0 400 240" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="14" width="384" height="212" rx="26" class="s-bg"/>${body}</svg>`;
  const person = (cx, color, glasses) => `
    <rect x="${cx - 28}" y="124" width="56" height="58" rx="20" class="${color}"/>
    <circle cx="${cx}" cy="98" r="23" class="s-skin"/>
    <path d="M${cx - 23} 94a23 23 0 0 1 46 0c-11-9-33-12-46 0z" class="s-hair"/>
    <circle cx="${cx - 8}" cy="100" r="2.4" class="s-ink"/><circle cx="${cx + 8}" cy="100" r="2.4" class="s-ink"/>
    <path d="M${cx - 7} 109q7 6 14 0" fill="none" class="s-stroke" stroke-width="2" stroke-linecap="round"/>
    ${glasses ? `<circle cx="${cx - 8}" cy="100" r="6.5" fill="none" class="s-stroke" stroke-width="1.6"/><circle cx="${cx + 8}" cy="100" r="6.5" fill="none" class="s-stroke" stroke-width="1.6"/>` : ""}`;

  const trial = wrap("Співбесіда", `
    <rect x="52" y="176" width="296" height="14" rx="7" class="s-desk"/>
    ${person(132, "s-c1", false)}${person(268, "s-c3", true)}
    <g class="float"><rect x="164" y="34" width="124" height="36" rx="16" class="s-card"/><path d="M230 70l8 10 4-10z" class="s-card"/><text x="226" y="57" text-anchor="middle" class="s-text">Tell me about…</text></g>
    <g class="float d2"><rect x="30" y="40" width="112" height="32" rx="14" class="s-card"/><text x="86" y="61" text-anchor="middle" class="s-text s">Past · Present · Future</text></g>
    <g transform="translate(350 62)"><circle r="24" class="s-card"/><line x1="0" y1="0" x2="0" y2="-15" class="s-stroke" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite"/></line><line x1="0" y1="0" x2="10" y2="0" class="s-stroke" stroke-width="3" stroke-linecap="round"/><circle r="3" class="s-ink"/></g>
    <rect x="186" y="164" width="28" height="12" rx="3" class="s-ink"/>`);

  const tobe1 = wrap("Баланс роботи та вільного часу", `
    <path d="M200 156L170 210h60z" class="s-c1"/>
    <g><animateTransform attributeName="transform" type="rotate" values="-7 200 150;7 200 150;-7 200 150" keyTimes="0;.5;1" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" dur="5s" repeatCount="indefinite"/>
      <rect x="54" y="144" width="292" height="12" rx="6" class="s-desk"/>
      <rect x="86" y="108" width="52" height="36" rx="7" class="s-c2"/><path d="M101 108v-7a7 7 0 0 1 7-7h14a7 7 0 0 1 7 7v7" fill="none" class="s-stroke" stroke-width="4"/><rect x="86" y="122" width="52" height="4" class="s-bg"/>
      <g transform="translate(300 126)"><path d="M0 14C-26-4-14-24 0-10 14-24 26-4 0 14z" class="s-c4"/></g>
      <text x="112" y="176" text-anchor="middle" class="s-text s">work</text><text x="300" y="176" text-anchor="middle" class="s-text s">free time</text>
    </g>
    <g class="float"><text x="64" y="70" font-size="30">💪</text></g><g class="float d2"><text x="318" y="64" font-size="30">😊</text></g><g class="float d3"><text x="190" y="64" font-size="26">⚖️</text></g>`);

  const pill = (x, label, cls, d) => `<g class="pulse ${d}"><rect x="${x}" y="98" width="96" height="44" rx="22" class="${cls}"/><text x="${x + 48}" y="126" text-anchor="middle" class="s-text w">${label}</text></g>`;
  const tobe2 = wrap("want to do", `
    ${pill(34, "want", "s-c1", "d1")}${pill(152, "to", "s-c2", "d2")}${pill(270, "do", "s-c3", "d3")}
    <path d="M132 120h16M250 120h16" class="s-stroke" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6"><animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite"/></path>
    <text x="200" y="190" text-anchor="middle" class="s-text">need · plan · hope · decide · learn · try</text>
    <g class="float"><text x="48" y="64" font-size="34">🎯</text></g><g class="float d2"><text x="316" y="66" font-size="34">🚀</text></g><g class="float d3"><text x="184" y="66" font-size="30">💡</text></g>`);

  const ticks = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="${(110 + 50 * Math.sin(a)).toFixed(1)}" y1="${(116 - 50 * Math.cos(a)).toFixed(1)}" x2="${(110 + 56 * Math.sin(a)).toFixed(1)}" y2="${(116 - 56 * Math.cos(a)).toFixed(1)}" class="s-stroke" stroke-width="2.5" stroke-linecap="round"/>`; }).join("");
  const days = "MTWTFSS".split("").map((d, i) => `<g class="${i === 2 || i === 4 ? "pulse d" + (i === 2 ? 1 : 2) : ""}"><circle cx="${214 + i * 27}" cy="104" r="12" class="${i === 2 || i === 4 ? "s-c2" : "s-card"}"/><text x="${214 + i * 27}" y="108.5" text-anchor="middle" class="s-text s ${i === 2 || i === 4 ? "w" : ""}">${d}</text></g>`).join("");
  const presimple = wrap("Present Simple: звички й факти", `
    <circle cx="110" cy="116" r="62" class="s-card"/>${ticks}
    <line x1="110" y1="116" x2="110" y2="76" class="s-stroke" stroke-width="3.5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 110 116" to="360 110 116" dur="10s" repeatCount="indefinite"/></line>
    <line x1="110" y1="116" x2="110" y2="92" class="s-c1-stroke" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 110 116" to="360 110 116" dur="120s" repeatCount="indefinite"/></line>
    <circle cx="110" cy="116" r="5" class="s-c2"/>
    ${days}
    <text x="290" y="76" text-anchor="middle" class="s-text s">on Wednesdays and Fridays</text>
    <path d="M200 140h180" class="s-c1-stroke" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 10"><animate attributeName="stroke-dashoffset" from="0" to="-36" dur="1.6s" repeatCount="indefinite"/></path>
    <text x="290" y="172" text-anchor="middle" class="s-text">always · usually · often · never</text>
    <g class="float"><text x="40" y="52" font-size="26">🔁</text></g><g class="float d2"><text x="330" y="212" font-size="22">📅</text></g>`);

  const blk = (x, w, label, cls, d) => `<g class="pulse ${d}"><rect x="${x}" y="92" width="${w}" height="52" rx="14" class="${cls}"/><text x="${x + w / 2}" y="125" text-anchor="middle" class="s-text w">${label}</text></g>`;
  const chunks = wrap("Chunk: is tired of cooking", `
    ${blk(30, 64, "is", "s-c1", "d1")}${blk(100, 108, "tired", "s-c2", "d2")}${blk(214, 56, "of", "s-c3", "d3")}${blk(276, 96, "cooking", "s-c4", "d1")}
    <path d="M94 118h6M208 118h6M270 118h6" class="s-stroke" stroke-width="3" stroke-linecap="round"/>
    <text x="200" y="176" text-anchor="middle" class="s-text">be + adjective + preposition + -ing</text>
    <text x="200" y="198" text-anchor="middle" class="s-text s">She is always responsible for cooking</text>
    <g class="float"><text x="44" y="64" font-size="30">🍎</text></g><g class="float d2"><text x="190" y="62" font-size="28">🧩</text></g><g class="float d3"><text x="330" y="66" font-size="30">🎮</text></g>`);

  const beordo = wrap("BE or DO?", `
    <g class="pulse d1"><rect x="34" y="70" width="138" height="104" rx="18" class="s-c1"/><text x="103" y="108" text-anchor="middle" class="s-text w" font-size="26">BE</text><text x="103" y="136" text-anchor="middle" class="s-text w" font-size="12">is · are · am</text><text x="103" y="156" text-anchor="middle" class="s-text w" font-size="12">isn't · aren't</text></g>
    <g class="pulse d2"><rect x="228" y="70" width="138" height="104" rx="18" class="s-c3"/><text x="297" y="108" text-anchor="middle" class="s-text w" font-size="26">DO</text><text x="297" y="136" text-anchor="middle" class="s-text w" font-size="12">do · does</text><text x="297" y="156" text-anchor="middle" class="s-text w" font-size="12">don't · doesn't</text></g>
    <g class="float d3"><circle cx="200" cy="122" r="22" class="s-c2"/><text x="200" y="132" text-anchor="middle" class="s-text w" font-size="28">?</text></g>
    <text x="200" y="202" text-anchor="middle" class="s-text s">She is tired · She doesn't want</text>
    <g class="float"><text x="48" y="54" font-size="26">🏠</text></g><g class="float d2"><text x="322" y="52" font-size="26">🧽</text></g>`);

  const negatives = wrap("Yes / No: короткі відповіді", `
    <g class="float"><rect x="96" y="30" width="208" height="46" rx="20" class="s-card"/><path d="M190 76l10 12 8-12z" class="s-card"/><text x="200" y="59" text-anchor="middle" class="s-text" font-size="16">Does she write posts?</text></g>
    <g class="pulse d1"><rect x="36" y="112" width="148" height="54" rx="18" class="s-c3"/><text x="110" y="146" text-anchor="middle" class="s-text w" font-size="16">Yes, she does.</text></g>
    <g class="pulse d2"><rect x="216" y="112" width="148" height="54" rx="18" class="s-c4"/><text x="290" y="146" text-anchor="middle" class="s-text w" font-size="16">No, she doesn't.</text></g>
    <text x="200" y="196" text-anchor="middle" class="s-text s">The first word of the question = the last word of the answer</text>
    <g class="float d2"><text x="50" y="72" font-size="28">🦊</text></g><g class="float d3"><text x="326" y="74" font-size="26">✋</text></g>`);

  const qblk = (x, w, label, cls, d) => `<g class="pulse ${d}"><rect x="${x}" y="96" width="${w}" height="50" rx="14" class="${cls}"/><text x="${x + w / 2}" y="128" text-anchor="middle" class="s-text w" font-size="17">${label}</text></g>`;
  const questions = wrap("Where does your boss work?", `
    ${qblk(20, 78, "Where", "s-c1", "d1")}${qblk(104, 72, "does", "s-c2", "d2")}${qblk(182, 112, "your boss", "s-c3", "d3")}${qblk(300, 76, "work?", "s-c4", "d1")}
    <text x="200" y="186" text-anchor="middle" class="s-text">(Wh) + do / does / is / are + S + V?</text>
    <text x="200" y="206" text-anchor="middle" class="s-text s">What · Where · When · Who · Why · How often</text>
    <g class="float"><text x="40" y="66" font-size="32">❓</text></g><g class="float d2"><text x="184" y="64" font-size="30">🤔</text></g><g class="float d3"><text x="326" y="66" font-size="32">💬</text></g>`);

  const questions2 = wrap("Follow-up питання", `
    <g class="float"><rect x="26" y="40" width="172" height="52" rx="20" class="s-card"/><path d="M62 92l-8 18 26-18z" class="s-card"/><text x="112" y="71" text-anchor="middle" class="s-text" font-size="14">I never eat junk food.</text></g>
    <g class="pulse d1"><rect x="216" y="34" width="150" height="38" rx="16" class="s-c1"/><text x="291" y="59" text-anchor="middle" class="s-text w" font-size="16">Why?</text></g>
    <g class="pulse d2"><rect x="216" y="82" width="150" height="38" rx="16" class="s-c2"/><text x="291" y="107" text-anchor="middle" class="s-text w" font-size="16">What exactly…?</text></g>
    <g class="pulse d3"><rect x="216" y="130" width="150" height="38" rx="16" class="s-c3"/><text x="291" y="155" text-anchor="middle" class="s-text w" font-size="16">What about you?</text></g>
    <text x="200" y="198" text-anchor="middle" class="s-text s">Why · What exactly · How often · Which · How many</text>
    <g class="float d2"><text x="48" y="150" font-size="34">🥗</text></g><g class="float d3"><text x="116" y="168" font-size="32">🤔</text></g>`);

  const mistakes = wrap("Мої помилки", `
    <g class="pulse d1"><rect x="40" y="36" width="320" height="46" rx="16" class="s-c4"/><text x="200" y="66" text-anchor="middle" class="s-text w" font-size="18">I responsible for effects</text></g>
    <g class="float d2"><text x="200" y="112" text-anchor="middle" font-size="26">⬇️</text></g>
    <g class="pulse d2"><rect x="40" y="124" width="320" height="46" rx="16" class="s-c3"/><text x="200" y="154" text-anchor="middle" class="s-text w" font-size="18">I am responsible for effects</text></g>
    <text x="200" y="198" text-anchor="middle" class="s-text s">be + прикметник · do + дієслово · the right word</text>
    <g class="float"><text x="28" y="62" font-size="26">🔍</text></g><g class="float d3"><text x="344" y="196" font-size="26">🔊</text></g>`);

  const visual = wrap("Картинки й звук", `
    <g class="pulse d1"><rect x="40" y="40" width="96" height="96" rx="22" class="s-c1"/><text x="88" y="102" text-anchor="middle" font-size="48">😩</text></g>
    <g class="pulse d2"><rect x="152" y="40" width="96" height="96" rx="22" class="s-c2"/><text x="200" y="102" text-anchor="middle" font-size="48">😨</text></g>
    <g class="pulse d3"><rect x="264" y="40" width="96" height="96" rx="22" class="s-c3"/><text x="312" y="102" text-anchor="middle" font-size="48">🏆</text></g>
    <g class="float d2"><text x="190" y="178" text-anchor="middle" font-size="34">🔊</text></g>
    <text x="200" y="206" text-anchor="middle" class="s-text s">Listen · Look · Choose</text>`);

  return { trial, tobe1, tobe2, presimple, chunks, beordo, negatives, questions, questions2, visual, mistakes };
})();
