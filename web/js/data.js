// Дані уроків. Щоб додати новий урок — додайте об'єкт у масив LESSONS.
// Типи питань: mc (варіанти), fill (впишіть слово/фразу), order (складіть речення).
// У fill: "answer" — масив допустимих відповідей (регістр і крайні пробіли ігноруються).
const LESSONS = [
{
  id: "trial",
  title: "Trial class",
  subtitle: "Пробне заняття · Job interview",
  summary: "Розмова про роботу, прийменники, лексика з відео про співбесіду та стратегія «Tell me about yourself».",
  sections: [
    { title: "Warm-up", html: `
      <div class="pair">
        <div><div class="tag">Routine</div><ul>
          <li>What does a typical weekday look like for you?</li>
          <li>What time do you usually get up?</li>
          <li>Do you normally have breakfast before work?</li>
          <li>How do you usually get to work?</li>
          <li>What do you usually do after work?</li>
          <li>What do you normally do at weekends?</li></ul></div>
        <div><div class="tag">Work</div><ul>
          <li>What do you <b>do for a living</b>?</li>
          <li>What are your main <b>responsibilities</b>?</li>
          <li>What do you <b>enjoy most</b> about your job?</li>
          <li>What is the <b>most challenging</b> part?</li>
          <li>How often do you use English at work?</li>
          <li>Who do you usually communicate with in English?</li></ul></div>
      </div>
      <p><b>Tell about a recent situation at work when you had to solve a problem:</b> What happened? What was the problem? What did you do? How did you feel about it? What was the result?</p>
      <p><b>If you could change one thing about your current job, what would it be and why?</b></p>` },
    { title: "Video: How to Nail Your First Job Interview", html: `
      <p>Listen and insert prepositions:</p>
      <ol>
        <li>I woke up <mark>to</mark> a call from one of the biggest tech companies <mark>in</mark> the world, Microsoft.</li>
        <li>Back in college, I had applied <mark>for</mark> a software engineering internship. And now it was time <mark>for</mark> the phone screen.</li>
        <li>Barely awake, I braced <mark>for</mark> the first question, praying it wasn't what I thought it'd be.</li>
        <li>Panic settled <mark>in</mark> as I thought <mark>about</mark> how to answer.</li>
        <li>I started <mark>with</mark> the present… Then I touched <mark>upon</mark> my past… And finally, I discussed my future, explaining why I was excited <mark>for</mark> the role.</li>
      </ol>
      <p><b>Questions:</b> What question did the interviewer ask him? Why did he panic? Do you think he was prepared for the question? Why / why not?</p>` },
    { title: "Vocabulary", html: `
      <div class="chips"><span class="chip">barely awake — лише наполовину прокинувшись</span><span class="chip">the dreaded four words — слова, що лякають</span><span class="chip">to yap on and on — базікати без структури</span><span class="chip">relevant courses — відповідні курси</span><span class="chip">to brace for — приготуватися до неприємного</span></div>
      <ul><li>I was <b>barely awake</b> when…</li><li>I had to <b>brace myself for</b>…</li><li>I could <b>yap</b> on and on about…</li></ul>` },
    { title: "Grammar: Present Simple, he/she/it + -s", html: `
      <div class="pair">
        <div>I wake up every day.<br><b>He wakes</b> up later than me.</div>
        <div>I go — my dog <b>goes</b> for a walk.</div>
        <div>I never cook dinner.<br>My wife <b>cooks</b> dinner.</div>
        <div>I get up at 9.<br>She <b>gets</b> up at 10.</div>
      </div>
      <p>We need to listen to some audio. → He <b>needs</b> to listen to some audio.</p>` },
    { title: "Strategy: “Tell me about yourself”", html: `
      <div class="pair">
        <div><div class="tag past">Past</div>relevant courses, projects</div>
        <div><div class="tag present">Present</div>why you want the role, current situation</div>
        <div><div class="tag future">Future</div>what you want to do in the future</div>
      </div>` }
  ],
  quiz: [
    { type:"mc", q:"barely awake", options:["fully awake and ready to talk","only partly awake"], answer:1 },
    { type:"mc", q:"the dreaded four words", options:["words that make you excited","words that make you feel worried or scared"], answer:1 },
    { type:"mc", q:"I would have yapped on and on", options:["I would have kept talking without much useful structure","I would have spoken very clearly and briefly"], answer:0 },
    { type:"mc", q:"relevant courses", options:["courses that are connected to the job or situation","courses that were especially difficult"], answer:0 },
    { type:"mc", q:"I braced for the first question", options:["I prepared myself for something difficult or unpleasant","I tried to avoid answering the question"], answer:0 },
    { type:"fill", q:"I woke up ___ a call from Microsoft.", answer:["to"] },
    { type:"fill", q:"Back in college, I had applied ___ an internship.", answer:["for"] },
    { type:"fill", q:"Panic settled ___ as I thought about how to answer.", answer:["in"] },
    { type:"fill", q:"I was excited ___ the role.", answer:["for","about"] },
    { type:"fill", q:"He ___ up later than me every day. (wake)", answer:["wakes"] },
    { type:"fill", q:"My dog ___ for a walk every morning. (go)", answer:["goes"] },
    { type:"fill", q:"She ___ up at 10 o'clock. (get)", answer:["gets"] },
    { type:"mc", q:"What is the strategy for answering “Tell me about yourself”?", options:["Past → Present → Future","Present → Past → Future","Future → Past → Present"], answer:1, explain:"Present (current situation) → Past (relevant courses, projects) → Future (what you want to do)." }
  ]
},
{
  id: "tobe1",
  title: "To Be (Feelings, Priorities & Responsibilities)",
  short: "To Be · Feelings",
  subtitle: "Урок 2 · Почуття, пріоритети та відповідальність",
  summary: "Дієслово to be, фрази good at / proud of / worried about / tired of / interested in, in charge of vs responsible for.",
  sections: [
    { title: "Key phrases", html: `
      <div class="chips"><span class="chip">good at</span><span class="chip">proud of</span><span class="chip">worried about</span><span class="chip">tired of</span><span class="chip">interested in</span><span class="chip">responsible for</span><span class="chip">in charge of</span><span class="chip">a challenge</span><span class="chip">a priority</span><span class="chip">under pressure</span></div>
      <ul>
        <li>He's <b>in charge of</b> the Asian branch.</li>
        <li>She's <b>responsible for</b> the weekly report.</li>
        <li>How do you perform <b>under pressure</b>?</li>
        <li>to prioritize · set priorities</li></ul>
      <p>Kate has a car. → This is Kate's car. (<b>'s</b> = possession) · He's tired = He <b>is</b> tired.</p>` },
    { title: "Grammar: to be", html: `
      <table><tr><th></th><th>Affirmative</th><th>Negative</th><th>Question</th></tr>
      <tr><td>I</td><td>I am / I'm</td><td>I am not / I'm not</td><td>Am I…?</td></tr>
      <tr><td>you / we / they</td><td>…are / 're</td><td>…are not / aren't / 're not</td><td>Are you/we/they…?</td></tr>
      <tr><td>he / she / it</td><td>…is / 's</td><td>…is not / isn't / 's not</td><td>Is he/she/it…?</td></tr></table>` },
    { title: "Examples", html: `
      <ol>
        <li>I'm <b>worried about</b> my new project. I don't think we'll finish on time.</li>
        <li>He's <b>tired of</b> his commute, it's the same every day.</li>
        <li>My manager is <b>proud of</b> our team's results this quarter.</li>
        <li>Replying to client emails is one of my <b>responsibilities</b>.</li>
        <li>Finishing this report on time is <b>a priority</b> for me this week.</li>
        <li>Learning a new language is <b>a challenge</b>, but it's worth it.</li>
        <li>She's <b>interested in</b> modern art, not classical.</li></ol>` },
    { title: "Speaking practice", html: `
      <p>A new colleague asks what you do. Tell them: your role, what you're good at, what you're responsible for, something you're proud of, and one challenge or priority you have right now.</p>
      <ul><li>I'm responsible for…</li><li>I'm good at… / I'm interested in…</li><li>I'm proud of…</li><li>My biggest challenge/priority right now is…</li></ul>
      <p><b>Role play:</b> interview a colleague for a team spotlight — what they're good at, proud of, what's under pressure, their biggest priority this month. Then switch roles.</p>` }
  ],
  quiz: [
    { type:"fill", q:"I'm ___ about my new project. I don't think we'll finish on time. (worried / tired / proud)", answer:["worried"] },
    { type:"fill", q:"He's tired ___ his commute. It's the same every day.", answer:["of"] },
    { type:"fill", q:"My manager is proud ___ our team's results.", answer:["of"] },
    { type:"fill", q:"She's interested ___ modern art, not classical.", answer:["in"] },
    { type:"fill", q:"She's responsible ___ the weekly report.", answer:["for"] },
    { type:"fill", q:"He's in charge ___ the Asian branch.", answer:["of"] },
    { type:"mc", q:"Everyone ___ worried about deadlines.", options:["am","is","are"], answer:1 },
    { type:"mc", q:"My wife ___ interested in sports.", options:["isn't","aren't","am not"], answer:0 },
    { type:"mc", q:"My colleagues ___ tired of this project.", options:["is","are","am"], answer:1 },
    { type:"mc", q:"I ___ tired of working overtime.", options:["is","are","am"], answer:2 },
    { type:"mc", q:"Finishing this report on time is ___ for me this week.", options:["a priority","a challenge","tired of"], answer:0 },
    { type:"mc", q:"Which question is correct?", options:["You are good at your job?","Are you good at your job?","Do you are good at your job?"], answer:1 },
    { type:"order", words:["Who","is","in","charge","of","your","projects?"], answer:"Who is in charge of your projects?" },
    { type:"order", words:["Are","you","under","pressure","these","days?"], answer:"Are you under pressure these days?" }
  ]
},
{
  id: "tobe2",
  title: "To Be (recycling) Verb patterns with “to”",
  short: "To Be (recycling)",
  subtitle: "Урок 3 · Повторення to be та дієслова з to",
  summary: "Повторення to be, дієслова + to infinitive (want, need, plan, hope, decide, learn, try), state vs dynamic verbs, Present Simple правила.",
  sections: [
    { title: "Error correction", html: `
      <ul>
        <li>Last week the balance it's not very good. → <b>The balance wasn't very good last week.</b></li>
        <li>It's very repeated work. → <b>repetitive</b></li>
        <li>He very quickly finds dependencies. → <b>He finds dependencies very quickly.</b></li>
        <li>Watch at the clock! → <b>Look at the clock!</b> (Watch = TV, films; Look at = quick action, pictures, clocks)</li></ul>
      <table><tr><th>repetitive</th><th>repeated</th><th>historic / historical</th><th>economic / economical</th></tr>
      <tr><td>repetitive work/melody</td><td>a repeated mistake</td><td>historic event · historical novel</td><td>economics, economic crisis · economical = saving, frugal</td></tr></table>` },
    { title: "Verb + to infinitive", html: `
      <p><b>want, need, plan, hope, decide, learn, try</b> + to + verb</p>
      <ul>
        <li>Our team <b>needs to</b> improve the click-through rate this month.</li>
        <li>I <b>plan to</b> launch the new ad campaign next week.</li>
        <li>We <b>hope to</b> reach a wider audience with this video ad.</li>
        <li>Management <b>decides to</b> change the budget for Q4.</li>
        <li>I <b>learn to</b> use the new AI tools.</li>
        <li>I <b>try to</b> answer client emails within 24 hours.</li>
        <li>I <b>want to</b> settle into my new role with ease.</li></ul>
      <p>like / hate + to + verb або -ing; dislike + -ing: I dislike working late.</p>` },
    { title: "State vs dynamic verbs", html: `
      <div class="pair">
        <div><div class="tag">State verbs (зазвичай без -ing)</div>want, know, need, believe, think (opinion), have/own (possession)</div>
        <div><div class="tag">Dynamic verbs (can use -ing)</div>swim, plan, decide, learn, try, think (process), have (replace with another word)</div>
      </div>` },
    { title: "Present Simple: rules", html: `
      <ul>
        <li><b>A fact</b> — The Earth moves around the Sun.</li>
        <li><b>An opinion</b> — I think short video ads work better than banner ads.</li>
        <li><b>A habit / routine</b> — I check our ad performance dashboard every morning.</li>
        <li><b>A permanent state</b> — Our studio focuses on hyper-casual games.</li></ul>
      <p>Word order: I frequently update my CV with new information. · I don't always wake up at the same time. · He's usually very attentive to details. · It's not always easy to recognise your skill set.</p>` }
  ],
  quiz: [
    { type:"mc", q:"Choose the correct sentence.", options:["Last week the balance it's not very good.","The balance wasn't very good last week.","The balance not is very good recently."], answer:1 },
    { type:"mc", q:"It's very ___ work. (the same thing again and again)", options:["repeated","repetitive","repeating"], answer:1 },
    { type:"mc", q:"___ at the clock!", options:["Watch","Look","See"], answer:1, explain:"Look at = quick action, pictures, clocks. Watch = TV, films." },
    { type:"mc", q:"Which is correct?", options:["He find dependencies very quickly.","He finds dependencies very quickly.","He finds very quickly dependencies."], answer:1 },
    { type:"fill", q:"Our team ___ to improve the click-through rate. (need)", answer:["needs"] },
    { type:"fill", q:"I ___ to launch the new ad campaign next week. (plan)", answer:["plan"] },
    { type:"fill", q:"We ___ to reach a wider audience. (hope)", answer:["hope"] },
    { type:"fill", q:"Management ___ to change the budget for Q4. (decide)", answer:["decides"] },
    { type:"fill", q:"I ___ to use the new AI tools. (learn)", answer:["learn"] },
    { type:"fill", q:"I ___ to answer client emails within 24 hours. (try)", answer:["try"] },
    { type:"mc", q:"Which verb is a STATE verb (not used in -ing)?", options:["swim","learn","know","try"], answer:2 },
    { type:"mc", q:"“The Earth moves around the Sun.” This is…", options:["a fact","an opinion","a habit","an action right now"], answer:0 },
    { type:"mc", q:"“I check our dashboard every morning.” This is…", options:["a fact","an opinion","a habit / routine","a permanent state"], answer:2 },
    { type:"order", words:["I","frequently","update","my","CV","with","new","information."], answer:"I frequently update my CV with new information." },
    { type:"order", words:["It's","not","always","easy","to","recognise","your","skill","set."], answer:"It's not always easy to recognise your skill set." }
  ]
},
{
  id: "presimple",
  title: "Present Simple",
  subtitle: "Habits, facts & workplace chunks",
  summary: "Факти, думки, звички; маркери часу; прислівники частотності та їх позиція; робочі chunks (strategic plan, deliverables…).",
  sections: [
    { title: "When do we use it?", html: `
      <ul><li><b>Facts</b> and permanent truths</li><li><b>Opinions</b></li><li><b>Habits</b> / routines / repeated actions</li></ul>
      <p>I, we, they, you <b>go</b> to the store every day. · She, he, it <b>goes</b> every day. · I <b>am</b> / She <b>is</b>.</p>
      <p><b>Markers:</b> every day, from time to time, every other day, on Fridays, once a year, on weekends</p>
      <p><b>Frequency:</b> always, often, usually, sometimes, rarely, never</p>
      <ul><li>My dog <b>always barks</b> at black dogs. · My wife <b>sometimes does</b> her nails.</li>
      <li>I <b>usually go</b> to a store <b>every other day</b>.</li>
      <li>We have classes <b>on Wednesdays and Fridays</b>.</li></ul>
      <p>The frequency adverb goes <b>before</b> the main verb but <b>after</b> to be: <i>He's usually very attentive.</i></p>` },
    { title: "Mistake correction", html: `
      <ol>
        <li>She <b>is</b> responsible for the budget.</li>
        <li>I <b>always need</b> to finish reports by Friday.</li>
        <li>I <b>hope to get</b> a raise at work.</li>
        <li>My manager <b>usually checks</b> the reports <b>every day</b>.</li>
        <li>I <b>am not interested in</b> the new project.</li>
        <li>I need to send a file before the deadline.</li>
        <li>Our studio <b>decides</b> which market to enter first. Для завершеного рішення в минулому: Our studio <b>decided</b> to launch the game in Europe first.</li>
        <li>My manager is very busy this week.</li>
        <li>I'm working in mobile game marketing. → <b>I work in</b> the mobile game industry.</li>
        <li>I plan to finish the project by the end of this month.</li></ol>` },
    { title: "Examples", html: `
      <ol>
        <li>She usually starts her day by checking emails and the campaign dashboard.</li>
        <li>The marketing team always reviews last week's results before planning anything new.</li>
        <li>Giorgia often works closely with the brand and community teams.</li>
        <li>The studio rarely launches a game without full QA approval.</li>
        <li>She sometimes presents updates directly to senior management.</li>
        <li>The production and marketing teams never skip the weekly sync meeting.</li></ol>` },
    { title: "Meaning check: workplace chunks", html: `
      <table>
        <tr><td><b>a strategic plan</b></td><td>a detailed plan for how a company will achieve its long-term goals</td></tr>
        <tr><td><b>to execute (a plan)</b></td><td>to carry out a plan and put it into action</td></tr>
        <tr><td><b>a brand manager</b></td><td>a person responsible for how a specific product or brand is marketed and perceived</td></tr>
        <tr><td><b>deliverables</b></td><td>the specific results or items a team has promised to produce by a deadline</td></tr>
        <tr><td><b>(to be) aligned with</b></td><td>to match or fit well with something else, like a goal or plan</td></tr>
        <tr><td><b>strategic vision</b></td><td>a long-term picture of where a company or person wants to be in the future</td></tr>
        <tr><td><b>skill set</b></td><td>the group of abilities and expertise a person has</td></tr>
        <tr><td><b>to get into (an industry)</b></td><td>to start working in a particular field or sector</td></tr></table>` },
    { title: "Speaking", html: `
      <ol>
        <li>Do you have a strategic vision for your career in the next 10 years? What does it look like?</li>
        <li>Imagine someone who wants to get into the mobile games industry today. What piece of advice would you give them?</li>
        <li>What are your main deliverables at work this month, and how do you make sure they're aligned with your team's strategic plan?</li>
        <li>If you were the brand manager for one of your studio's games, what would you focus on executing first?</li>
        <li>What's one skill you'd like to add to your skill set this year, and why?</li></ol>` }
  ],
  quiz: [
    { type:"mc", q:"My manager usually ___ the reports every day.", options:["check","checks","is checking"], answer:1 },
    { type:"mc", q:"Which sentence is correct?", options:["I always need to finish reports by Friday.","I always needs to finish reports by Friday.","I always needing to finish reports by Friday."], answer:0 },
    { type:"mc", q:"Which sentence is correct?", options:["I not am interested in the project.","I'm not interested in the project.","I don't interested in the project."], answer:1 },
    { type:"mc", q:"Which is correct for a permanent job description?", options:["I'm working in mobile game marketing.","I work in mobile game marketing."], answer:1 },
    { type:"fill", q:"She ___ up at 10 o'clock. (get)", answer:["gets"] },
    { type:"fill", q:"The production team never ___ the weekly sync meeting. (skip)", answer:["skips"] },
    { type:"fill", q:"The studio rarely ___ a game without full QA approval. (launch)", answer:["launches"] },
    { type:"fill", q:"We have classes ___ Wednesdays and Fridays.", answer:["on"] },
    { type:"mc", q:"He ___ very attentive to details.", options:["are usually","is usually","usually"], answer:1, explain:"Frequency adverbs go after the verb to be." },
    { type:"order", words:["She","usually","starts","her","day","by","checking","emails."], answer:"She usually starts her day by checking emails." },
    { type:"order", words:["The","team","always","reviews","last","week's","results."], answer:"The team always reviews last week's results." },
    { type:"mc", q:"a strategic plan", options:["A short daily to-do list for one employee","A detailed plan for how a company will achieve its long-term goals"], answer:1 },
    { type:"mc", q:"to execute (a plan)", options:["To carry out a plan and put it into action","To cancel a plan before it starts"], answer:0 },
    { type:"mc", q:"a brand manager", options:["A person who manages the technical servers of a company","A person responsible for how a specific product or brand is marketed"], answer:1 },
    { type:"mc", q:"deliverables", options:["The specific results a team has promised to produce by a deadline","Packages that a company ships to its customers"], answer:0 },
    { type:"mc", q:"(to be) aligned with", options:["To be located physically next to something","To match or fit well with something else, like a goal or plan"], answer:1 },
    { type:"mc", q:"skill set", options:["A single certificate proving someone finished a course","The group of abilities and expertise a person has"], answer:1 },
    { type:"mc", q:"to get into (an industry)", options:["To invest money in a company's stock","To start working in a particular field or sector"], answer:1 }
  ]
}
];
const sourcePages = [[1,2],[3,4],[5],[6,7]];
LESSONS.forEach((lesson,index) => {
  lesson.sections.unshift({title:'Коротко про головне',html:[
    '<p>Говоримо про щоденний розклад і роботу. Для <b>he / she / it</b> додаємо до дієслова <b>-s</b>: I work → she works. На співбесіді будуємо розповідь у порядку <b>Present → Past → Future</b>.</p>',
    '<p><b>To be</b> допомагає описати стан, роль або почуття: I <b>am</b>, he/she/it <b>is</b>, you/we/they <b>are</b>. У запереченні додаємо <b>not</b>; у питанні ставимо am/is/are перед підметом. Вчимо фрази разом із прийменником: good <b>at</b>, proud <b>of</b>, responsible <b>for</b>.</p>',
    '<p>Повторюємо to be та будуємо плани: <b>want / need / plan / hope / decide / learn / try + to + дієслово</b>. Наприклад: I plan <b>to learn</b> English. Після he/she/it змінюємо лише перше дієслово: She <b>needs to finish</b> the report.</p>',
    '<p><b>Present Simple</b> — для звичок, фактів і постійних ситуацій. I/you/we/they <b>work</b>, he/she/it <b>works</b>. Заперечення: <b>do not / does not + work</b>. Питання: <b>Do you work? Does she work?</b> Після does закінчення -s не потрібне.</p>'
  ][index]});
  lesson.sections.push({title:'Оригінальні матеріали',html:`<p class="source-note">Ваші нотатки з уроку. У конспекті вище окремі неточності виправлено.</p><details><summary>Показати сторінки уроку</summary><div class="source-images">${sourcePages[index].map(n=>`<a href="assets/lesson-source-${n}.png" target="_blank" rel="noopener"><img loading="lazy" src="assets/lesson-source-${n}.png" alt="Оригінальні нотатки: урок ${index+1}, сторінка ${n}"></a>`).join('')}</div></details>`});
});
