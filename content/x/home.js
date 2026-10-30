/* ---------- languages, flags, home & onboarding ---------- */
const NATIVES=['ar','ru','en'], TARGETS={ar:['ru','en','uz','es'], ru:['en','ar','uz','es'], en:['ru','ar','uz','es']};
const UILANGS=['ar','en','ru'];
const LNAME={ // language names, as written in each UI language
 ar:{ar:'العربية',ru:'الروسية',en:'الإنجليزية',uz:'الأوزبكية',es:'الإسبانية'},
 ru:{ar:'Арабский',ru:'Русский',en:'Английский',uz:'Узбекский',es:'Испанский'},
 en:{ar:'Arabic',ru:'Russian',en:'English',uz:'Uzbek',es:'Spanish'}};
const SELF={ar:'العربية',ru:'Русский',en:'English',uz:'Oʻzbekcha',es:'Español'};
const LEARN={ar:t=>'تعلّم '+LNAME.ar[t], ru:t=>LNAME.ru[t]+' язык', en:t=>'Learn '+LNAME.en[t]};
const FLAGS={
 jo:'<svg viewBox="0 0 28 14"><rect width="28" height="14" fill="#fff"/><rect width="28" height="4.67" fill="#111"/><rect y="9.33" width="28" height="4.67" fill="#007a3d"/><path d="M0 0L14 7L0 14Z" fill="#ce1126"/><path fill="#fff" d="M4.6 5.6l.36.95.95-.42-.43.94.95.37-.98.27.1 1.02-.6-.83-.6.83.1-1.02-.98-.27.95-.37-.43-.94.95.42z"/></svg>',
 ru:'<svg viewBox="0 0 27 18"><rect width="27" height="6" fill="#fff"/><rect y="6" width="27" height="6" fill="#0039a6"/><rect y="12" width="27" height="6" fill="#d52b1e"/></svg>',
 us:'<svg viewBox="0 0 38 20"><rect width="38" height="20" fill="#fff"/><g fill="#b22234">'+[0,2,4,6,8,10,12].map(i=>`<rect y="${i*20/13}" width="38" height="${20/13}"/>`).join('')+'</g><rect width="15.2" height="10.77" fill="#3c3b6e"/><g fill="#fff">'+[[1.3,1.2],[3.9,1.2],[6.5,1.2],[9.1,1.2],[11.7,1.2],[13.9,1.2],[2.6,3.4],[5.2,3.4],[7.8,3.4],[10.4,3.4],[13,3.4],[1.3,5.5],[3.9,5.5],[6.5,5.5],[9.1,5.5],[11.7,5.5],[13.9,5.5],[2.6,7.6],[5.2,7.6],[7.8,7.6],[10.4,7.6],[13,7.6],[1.3,9.6],[3.9,9.6],[6.5,9.6],[9.1,9.6],[11.7,9.6],[13.9,9.6]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".5"/>`).join('')+'</g></svg>',
 uz:'<svg viewBox="0 0 30 15"><rect width="30" height="15" fill="#1eb53a"/><rect width="30" height="10" fill="#ce1126"/><rect width="30" height="9.8" fill="#fff"/><rect width="30" height="5.2" fill="#ce1126"/><rect width="30" height="5" fill="#0099b5"/><circle cx="4.2" cy="2.5" r="1.75" fill="#fff"/><circle cx="4.85" cy="2.5" r="1.6" fill="#0099b5"/><g fill="#fff">'+[[7.2,1.1],[8.6,1.1],[10,1.1],[7.2,2.5],[8.6,2.5],[10,2.5],[11.4,2.5],[5.8,3.9],[7.2,3.9],[8.6,3.9],[10,3.9],[11.4,3.9]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".42"/>`).join('')+'</g></svg>',
 es:'<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/></svg>'};
const FLAG_OF={ar:'jo',ru:'ru',en:'us',uz:'uz',es:'es'};
const flag=(lang,cls='')=>`<span class="flag ${cls}" aria-hidden="true">${FLAGS[FLAG_OF[lang]]}</span>`;
const HOME={
 ar:{dir:'rtl', kicker:'منصة لتعلّم اللغات', title:'تعلّم لغة جديدة، من الحرف الأول حتى الإتقان', lead:'«لِسان» منصة مجانية تعلّمك الروسية والإنجليزية والعربية والأوزبكية والإسبانية على ستة مستويات (A1–C2): كلمات بالصور، وجمل وحوارات بصوت واضح، وقواعد مبسّطة، وامتحان لكل مستوى. اختر لغتك ثم ابدأ.',
  step1:'ما لغتك الأم؟', step1d:'ستكون كل الشروحات والمعاني بهذه اللغة.', step2:'ماذا تريد أن تتعلّم؟', change:'تغيير', yourLang:'لغتك', uiLang:'لغة الواجهة',
  stats:['لغات','دورات','مستويات','كلمة بالصور'], featT:'كيف تتعلّم مع لِسان',
  feats:[['listen','اسمع وكرّر','لكل كلمة وجملة صوت، مع التحكم بالسرعة.'],['tap','اضغط أي كلمة','في النصوص تسمعها وترى معناها فوراً.'],['pen','اكتب بيدك','تتبّع الحروف وتدرّب على الإملاء.'],['check','امتحان لكل مستوى','80٪ للانتقال، وامتحان جديد يركّز على أخطائك.']],
  levels:'المستويات A1–C2', cont:'أكمل', start:'ابدأ'},
 en:{dir:'ltr', kicker:'A language-learning platform', title:'Learn a new language, from the first letter to fluency', lead:'Lisan is a free platform for learning Russian, English, Arabic, Uzbek and Spanish across six levels (A1–C2): picture words, sentences and dialogues with clear audio, simple grammar, and an exam for every level. Pick your language and start.',
  step1:'What is your native language?', step1d:'All explanations and meanings will be in this language.', step2:'What do you want to learn?', change:'Change', yourLang:'Your language', uiLang:'Interface language',
  stats:['languages','courses','levels','picture words'], featT:'How you learn with Lisan',
  feats:[['listen','Listen and repeat','Every word and sentence has audio, with speed control.'],['tap','Tap any word','In texts you hear it and see its meaning instantly.'],['pen','Write by hand','Trace the letters and practise dictation.'],['check','An exam for every level','80% to move on, and each new exam targets your mistakes.']],
  levels:'Levels A1–C2', cont:'Continue', start:'Start'},
 ru:{dir:'ltr', kicker:'Платформа для изучения языков', title:'Новый язык — от первой буквы до свободного владения', lead:'Lisan — бесплатная платформа для изучения русского, английского, арабского, узбекского и испанского языков на шести уровнях (A1–C2): слова с картинками, фразы и диалоги с чёткой озвучкой, понятная грамматика и экзамен на каждом уровне. Выберите язык и начните.',
  step1:'Ваш родной язык?', step1d:'Все объяснения и переводы будут на этом языке.', step2:'Какой язык хотите изучать?', change:'Изменить', yourLang:'Ваш язык', uiLang:'Язык интерфейса',
  stats:['языков','курсов','уровней','слов с картинками'], featT:'Как учиться с Lisan',
  feats:[['listen','Слушайте и повторяйте','У каждого слова и фразы есть озвучка с регулировкой скорости.'],['tap','Нажмите на любое слово','В текстах — сразу звук и перевод.'],['pen','Пишите от руки','Прописи букв и диктант.'],['check','Экзамен на каждом уровне','80% для перехода; новый экзамен учитывает ваши ошибки.']],
  levels:'Уровни A1–C2', cont:'Продолжить', start:'Начать'}};
const FICON={
 listen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
 tap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2"/><path d="M15 10.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4.3 15a1.5 1.5 0 0 1 2.4-1.8L9 15"/></svg>',
 pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 12l3 3 5-6"/></svg>'};
function uiLang(){ const v=Store.d.ui; return UILANGS.includes(v)?v:(NATIVES.includes(Store.d.native)?Store.d.native:'ar'); }
function langSwitch(){ const cur=uiLang(); return `<div class="uiswitch" role="group" aria-label="${esc(HOME[cur].uiLang)}">${UILANGS.map(l=>`<button class="${l===cur?'on':''}" data-act="ui" data-l="${l}" lang="${l}" aria-pressed="${l===cur}">${{ar:'عربي',en:'EN',ru:'RU'}[l]}</button>`).join('')}</div>`; }
function greetStrip(){ const g=[['ar','مرحباً'],['ru','Привет'],['en','Hello'],['uz','Salom'],['es','Hola'],['ar','أهلاً وسهلاً'],['ru','Здравствуйте'],['en','Welcome'],['uz','Xush kelibsiz'],['es','Bienvenido']];
  const row=g.map(([l,w])=>`<span class="gw">${flag(l,'sm')}<span lang="${l}"${l==='ar'?' dir="rtl"':''}>${w}</span></span>`).join('');
  return `<div class="greet" aria-hidden="true"><div class="greet-track">${row}${row}</div></div>`; }
function trackStats(tr){ let w=0,g=0; LEVELS.forEach(L=>{ const lv=level(tr,L); w+=lv.vocab.length; g+=lv.grammar.length; }); return {w,g}; }
function homeView(){
  const ul=uiLang(), H=HOME[ul]; const nat=Store.d.native;
  const allW = ['ru','en','ar','uz','es'].map(t=>trackStats(t==='ru'?'ar-ru':t==='en'?'ar-en':t==='ar'?'ru-ar':'ar-'+t).w).reduce((a,b)=>a+b,0);
  const stats=[[5,H.stats[0]],[Object.keys(TRACKS).length,H.stats[1]],[6,H.stats[2]],[allW.toLocaleString('en-US'),H.stats[3]]].map(([n,l])=>`<div class="stat"><b>${n}</b><span>${esc(l)}</span></div>`).join('');
  let pickHTML;
  if (!NATIVES.includes(nat)){
    pickHTML = `<section class="pick" aria-labelledby="pk1"><div class="pick-h"><span class="stepn">1</span><div><h2 id="pk1">${esc(H.step1)}</h2><p class="muted">${esc(H.step1d)}</p></div></div>
    <div class="natives">${NATIVES.map(l=>`<button class="native" data-act="native" data-l="${l}" lang="${l}">${flag(l,'lg')}<span class="nm"${l==='ar'?' dir="rtl"':''}>${SELF[l]}</span><span class="sub">${esc(LNAME[ul][l])}</span></button>`).join('')}</div></section>`;
  } else {
    const cards = TARGETS[nat].map(t=>{ const id=nat+'-'+t; const st=trackStats(id); const done=LEVELS.filter(L=>Store.passed(id,L)).length; const u=T[nat];
      return `<button class="track" dir="${T[nat].dir}" lang="${nat}" data-act="nav" data-h="${id}"><span class="pair">${flag(nat,'sm')}<span class="arrow" aria-hidden="true">${T[nat].dir==='rtl'?'←':'→'}</span>${flag(t,'md')}</span>
      <h3>${esc(LEARN[nat](t))}</h3><span class="self"${t==='ar'?' dir="rtl"':''} lang="${t}">${SELF[t]}</span>
      <span class="meta">A1–C2 · ${st.w} ${esc(u.words)} · ${st.g} ${esc(u.topics)}</span><span class="bar" aria-label="${done}/6"><i style="width:${done/6*100}%"></i></span></button>`; }).join('');
    pickHTML = `<section class="pick" aria-labelledby="pk2"><div class="pick-h"><span class="stepn">2</span><div><h2 id="pk2">${esc(H.step2)}</h2>
      <p class="chosen">${esc(H.yourLang)}: ${flag(nat,'sm')} <b lang="${nat}">${SELF[nat]}</b> <button class="linkbtn" data-act="native" data-l="">${esc(H.change)}</button></p></div></div>
      <div class="tracks">${cards}</div></section>`;
  }
  const feats = H.feats.map(([i,t,d])=>`<div class="feat"><span class="fi">${FICON[i]}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('');
  return `<main class="wrap home" dir="${H.dir}" lang="${ul}">${greetStrip()}<section class="hero"><p class="kicker">${esc(H.kicker)}</p><h1>${esc(H.title)}</h1><p class="lead">${esc(H.lead)}</p><div class="stats">${stats}</div></section>
  ${pickHTML}
  <section class="feats" aria-labelledby="ft"><h2 id="ft" class="sec-title">${esc(H.featT)}</h2><div class="feat-grid">${feats}</div></section>
  <p class="note">${esc(T[ul].audioNote)}</p></main>`;
}
