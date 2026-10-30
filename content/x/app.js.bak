(function(){
'use strict';
const LEVELS = ['A1','A2','B1','B2','C1','C2'];
const TRACKS = {
  'ar-ru': {n:'ar', t:'ru', bank:RU},
  'ar-en': {n:'ar', t:'en', bank:EN},
  'ru-en': {n:'ru', t:'en', bank:EN},
  'ru-ar': {n:'ru', t:'ar', bank:AR}
};
const SPEECH_LANG = {ru:'ru-RU', en:'en-US', ar:'ar-SA'};
const PASS = 80, EXAM_N = 20;

/* ---------- UI strings ---------- */
const T = {
ar:{dir:'rtl', home:'الرئيسية', tabs:{letters:'الحروف',words:'المفردات',phrases:'الجمل',grammar:'القواعد',read:'القراءة',talk:'المحادثة',write:'الكتابة',exam:'الامتحان'},
 lv:{A1:'مبتدئ',A2:'أساسي',B1:'متوسط',B2:'فوق المتوسط',C1:'متقدم',C2:'إتقان'},
 lvd:{A1:'من الصفر: الحروف والنطق والتحيات وأول جمل للحياة اليومية.',A2:'التسوّق والسفر والطقس، والحديث عن الماضي والمستقبل.',B1:'العمل والصحة والمشاعر، وحالات الإعراب الأساسية.',B2:'النقاش وإبداء الرأي في المجتمع والبيئة والإعلام.',C1:'الأسلوب الرسمي والمقالات وأدوات الربط المتقدمة.',C2:'التعابير الاصطلاحية والأمثال وأدق الفروق الأسلوبية.'},
 words:'كلمة', phrases:'جملة', topics:'درس قواعد', open:'مفتوح', locked:'مقفل', passed:'ناجح',
 audio:'الصوت', voice:'الصوت المستخدم', speed:'السرعة', volume:'مستوى الصوت', lisanVoice:'تسجيلات لِسان', autoVoice:'تلقائي: أوضح صوت عربي في جهازك، وإلا تسجيلات لِسان (موصى به)', deviceVoice:'صوت الجهاز', noAudio:'لا يوجد صوت لهذا النص على جهازك.', test:'جرّب', close:'إغلاق',
 noVoice:'لم يُعثر على صوت لهذه اللغة في جهازك. لسماع نطق صحيح ثبّت الصوت من الإعدادات: أندرويد ← تحويل النص إلى كلام ← Google ← تثبيت بيانات الصوت. آيفون ← تسهيلات الاستخدام ← المحتوى المنطوق ← الأصوات. ويندوز ← الوقت واللغة ← الكلام ← إضافة أصوات. متصفح Chrome على الكمبيوتر يحتوي أصواتاً جاهزة.',
 audioNote:'كل الكلمات والجمل مسجّلة مسبقاً بصوت واضح وطبيعي (الروسية: صوت امرأة ورجل، الإنجليزية: صوتان، العربية: صوت رجل)، وتعمل على أي جهاز دون تثبيت شيء. أبطئ السرعة للتمرّن، ويمكنك التبديل إلى صوت جهازك إن أردت.',
 all:'الكل', cards:'بطاقات', flash:'بطاقات الحفظ', knew:'عرفتها', didnt:'لم أعرفها', flip:'اقلب البطاقة', again:'من جديد',
 listenAll:'استمع للكل', stop:'إيقاف', showTr:'إظهار الترجمة', hideTr:'إخفاء الترجمة', pron:'النطق', meaning:'المعنى',
 sound:'الصوت', example:'مثال', name:'اسم الحرف', forms:'أشكال الحرف',
 checkUnd:'تحقّق من فهمك', examples:'أمثلة',
 roleplay:'أنا أؤدي الدور B', yourTurn:'دورك: اقرأ الجملة بصوت عالٍ، ثم اضغط «التالي» لتسمع النطق الصحيح.', next:'التالي', play:'تشغيل',
 trace:'تتبّع الحروف', dict:'إملاء', copy:'انسخ الجملة', clear:'امسح', guide:'الدليل', print:'مطبوع', hand:'بخط اليد', prev:'السابق',
 type:'اكتب ما تسمعه', check:'تحقّق', showKb:'لوحة المفاتيح', correct:'صحيح! أحسنت.', wrongIs:'الصواب:', copyHint:'اكتب الجملة كما هي:',
 examTitle:'امتحان المستوى', examInfo:'20 سؤالاً متنوعاً: معاني، استماع، ترتيب جمل، إملاء وقواعد. تنجح بـ 80٪ فأكثر وينفتح المستوى التالي. كل امتحان جديد مختلف عن السابق ويركّز على أخطائك.',
 q:'سؤال', passMark:'علامة النجاح', best:'أفضل نتيجة', weakN:'كلمات للمراجعة', start:'ابدأ الامتحان', startNew:'امتحان جديد',
 kMean:'ما معنى هذه الكلمة؟', kRev:'اختر الكلمة الصحيحة', kListen:'استمع واختر ما سمعت', kSent:'ما معنى هذه الجملة؟', kOrder:'رتّب الكلمات لتكوين الجملة', kSpell:'استمع واكتب الكلمة', kGram:'قواعد: اختر الصحيح', kLetter:'استمع واختر الحرف',
 passedMsg:'ناجح! انفتح المستوى التالي.', failedMsg:'لم تصل إلى 80٪ بعد. راجع أخطاءك أدناه ثم خذ امتحاناً جديداً مختلفاً.',
 yourAns:'إجابتك', review:'راجع أخطاءك', noMist:'لا أخطاء. ممتاز!', nextLevel:'المستوى التالي', backLevels:'المستويات',
 lockT:'هذا المستوى مقفل', lockD:'انجح في امتحان المستوى السابق لفتحه، أو إذا كنت تعرف هذا المستوى فخذ امتحانه مباشرة.', goPrev:'إلى المستوى السابق', takeExam:'خذ امتحان هذا المستوى',
 lockedTab:'افتح المستوى أولاً من خلال الامتحان.',
 notFound:'هذه الكلمة غير موجودة في القاموس. معنى الجملة:', glossFrom:'',
 skip:'تخطَّ', done:'تمّ', ofN:'من', reset:'إعادة تعيين التقدّم', chooseText:'النص',
 orderReset:'أعد الترتيب', you:'أنت',
 trackOf:{'ar-ru':'تعلّم الروسية','ar-en':'تعلّم الإنجليزية'}, levelsTitle:'المستويات من A1 إلى C2'},
ru:{dir:'ltr', home:'Главная', tabs:{letters:'Алфавит',words:'Слова',phrases:'Фразы',grammar:'Грамматика',read:'Чтение',talk:'Диалоги',write:'Письмо',exam:'Экзамен'},
 lv:{A1:'Начальный',A2:'Элементарный',B1:'Средний',B2:'Выше среднего',C1:'Продвинутый',C2:'Владение в совершенстве'},
 lvd:{A1:'С нуля: буквы, произношение, приветствия и первые фразы на каждый день.',A2:'Покупки, путешествия, погода; рассказ о прошлом и будущем.',B1:'Работа, здоровье, эмоции и основные грамматические конструкции.',B2:'Дискуссии и своё мнение об обществе, экологии и СМИ.',C1:'Официальный стиль, статьи и сложные связки.',C2:'Идиомы, пословицы и тонкие стилистические оттенки.'},
 words:'слов', phrases:'фраз', topics:'тем грамматики', open:'Открыт', locked:'Закрыт', passed:'Сдан',
 audio:'Звук', voice:'Голос', speed:'Скорость', volume:'Громкость', lisanVoice:'Записи Lisan', autoVoice:'Авто: лучший арабский голос устройства, иначе записи Lisan (рекомендуется)', deviceVoice:'Голос устройства', noAudio:'Для этого текста нет озвучки на устройстве.', test:'Проверить', close:'Закрыть',
 noVoice:'На устройстве не найден голос для этого языка. Чтобы слышать правильное произношение, установите его: Android → Синтез речи → Google → Установить голосовые данные. iPhone → Универсальный доступ → Устно → Голоса. Windows → Время и язык → Речь → Добавить голоса. В Chrome на компьютере голоса уже встроены.',
 audioNote:'Все слова и фразы заранее озвучены чёткими естественными голосами, поэтому звук работает на любом устройстве без установки. Замедляйте скорость для тренировки или переключитесь на голос устройства.',
 all:'Все', cards:'Карточки', flash:'Заучивание', knew:'Знаю', didnt:'Не знаю', flip:'Перевернуть', again:'Сначала',
 listenAll:'Слушать всё', stop:'Стоп', showTr:'Показать перевод', hideTr:'Скрыть перевод', pron:'Произношение', meaning:'Значение',
 sound:'Звук', example:'Пример', name:'Название буквы', forms:'Формы буквы',
 checkUnd:'Проверьте себя', examples:'Примеры',
 roleplay:'Я играю роль B', yourTurn:'Ваша очередь: прочитайте реплику вслух, затем нажмите «Дальше», чтобы услышать правильное произношение.', next:'Дальше', play:'Слушать',
 trace:'Прописи', dict:'Диктант', copy:'Списывание', clear:'Стереть', guide:'Образец', print:'Печатный', hand:'Рукописный', prev:'Назад',
 type:'Напишите, что слышите', check:'Проверить', showKb:'Клавиатура', correct:'Верно! Отлично.', wrongIs:'Правильно:', copyHint:'Перепишите фразу точно:',
 examTitle:'Экзамен уровня', examInfo:'20 разных заданий: значения, аудирование, порядок слов, диктант и грамматика. Порог — 80%, после сдачи открывается следующий уровень. Каждый новый экзамен отличается от прежнего и учитывает ваши ошибки.',
 q:'Вопрос', passMark:'Проходной балл', best:'Лучший результат', weakN:'Слов на повторение', start:'Начать экзамен', startNew:'Новый экзамен',
 kMean:'Что значит это слово?', kRev:'Выберите правильное слово', kListen:'Послушайте и выберите', kSent:'Что значит эта фраза?', kOrder:'Составьте фразу из слов', kSpell:'Послушайте и напишите слово', kGram:'Грамматика: выберите верное', kLetter:'Послушайте и выберите букву',
 passedMsg:'Сдано! Следующий уровень открыт.', failedMsg:'Пока меньше 80%. Разберите ошибки ниже и пройдите новый экзамен — он будет другим.',
 yourAns:'Ваш ответ', review:'Работа над ошибками', noMist:'Ошибок нет. Отлично!', nextLevel:'Следующий уровень', backLevels:'Уровни',
 lockT:'Уровень закрыт', lockD:'Сдайте экзамен предыдущего уровня, чтобы открыть этот. Если вы уже знаете этот уровень, сдайте его экзамен сразу.', goPrev:'К предыдущему уровню', takeExam:'Сдать экзамен этого уровня',
 lockedTab:'Сначала откройте уровень через экзамен.',
 notFound:'Этого слова нет в словаре. Перевод фразы:', glossFrom:'',
 skip:'Пропустить', done:'Готово', ofN:'из', reset:'Сбросить прогресс', chooseText:'Текст',
 orderReset:'Заново', you:'Вы',
 trackOf:{'ru-en':'Английский язык','ru-ar':'Арабский язык'}, levelsTitle:'Уровни от A1 до C2'}
};

/* ---------- helpers ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lines = s => String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = (s,n) => { if(Array.isArray(s)) return n==='ar'?s[0]:s[1]; if(typeof s==='string'&&s.includes('::')){const p=s.split('::');return n==='ar'?p[0]:p[1];} return s; };
const disp = s => String(s).replace(/\+(.)/g,'$1́');
const sayOf = s => String(s).replace(/\([^)]*\)/g,' ').replace(/\+/g,'').replace(/́/g,'').replace(/\s+/g,' ').trim();
const HARAKAT = /[ً-ْٰـ]/g;
function norm(s, tl){
  s = sayOf(String(s)).toLowerCase().trim();
  if (tl==='ar') s = s.replace(HARAKAT,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي');
  if (tl==='ru') s = s.replace(/ё/g,'е');
  return s.replace(/[.,!?;:«»"“”()—\-–؟،؛…]/g,' ').replace(/[’']/g,"'").replace(/\s+/g,' ').trim();
}
function pronOf(src, tl, nat){ if (tl==='ru') return ruToAr(src); if (tl==='ar') return arToRu(src);
  if (tl==='en'){ const n=nat||(S.tr?TRACKS[S.tr].n:'ar'); const i=n==='ar'?0:1; return String(src).replace(/\([^)]*\)/g,' ').split(/([A-Za-z]+(?:'[A-Za-z]+)?)/).map((t,k)=>{ if(k%2===0) return t.replace(/[.,!?;:"()]/g,'').replace(/\s+/g,' '); const e=ENPR[t.toLowerCase()]; return e?e[i]:t; }).join('').replace(/\s+/g,' ').trim(); }
  return ''; }
const ICON = {
 play:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
 slow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 15c0-4 3.5-7 8-7s7 3 7 6"/><path d="M18 14h2.5a1.5 1.5 0 0 0 0-3H19"/><path d="M5 15v3M9 15.5V18M14 15.5V18"/><circle cx="20" cy="11" r=".6" fill="currentColor"/></svg>',
 sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
 stop:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'
};
const playBtn = (say, tl, slow, extra='') => `<button class="play${slow?' slow':''}" data-act="say" data-say="${esc(say)}" data-tl="${tl}"${slow?' data-slow="1"':''} aria-label="${slow?'slow':'play'}" ${extra}>${slow?ICON.slow:ICON.play}</button>`;

/* ---------- store ---------- */
const Store = {
  d:{passed:{},best:{},weak:{},last:{},settings:{rate:1,volume:1,voice:{}}},
  load(){ try{ const r=localStorage.getItem('lisan.v1'); if(r){ const o=JSON.parse(r); Object.assign(this.d,o); this.d.settings=Object.assign({rate:1,volume:1,voice:{}},o.settings||{}); } }catch(e){} },
  save(){ try{ localStorage.setItem('lisan.v1', JSON.stringify(this.d)); }catch(e){} },
  passed(tr,L){ return !!(this.d.passed[tr]&&this.d.passed[tr][L]); },
  unlocked(tr,i){ if(i===0) return true; for(let k=i-1;k<LEVELS.length;k++) if(this.passed(tr,LEVELS[k])) return true; return false; },
  weak(key){ return this.d.weak[key]||(this.d.weak[key]={}); }
};

/* ---------- speech ---------- */
/* Audio: recorded neural-voice clips (packs per language+level), device voice only as fallback */
const Packs = { data:{}, loading:{},
  key(text, alt){ return (alt?'B|':'')+sayOf(text).trim().toLowerCase(); },
  one(id){ if (this.data[id]) return Promise.resolve(); if (this.loading[id]) return this.loading[id];
    this.loading[id] = fetch('audio/'+id+'.json').then(r=>r.ok?r.json():null).then(j=>{ if(j) this.data[id]=j; }).catch(()=>{}).finally(()=>{ delete this.loading[id]; });
    return this.loading[id]; },
  load(lang, L){ const id=lang+'-'+L; return this.one(id).then(()=>this.one(id+'-w')); },
  async ensure(text, tl, alt){ let c=this.find(text,tl,alt); if (c) return c; const ps=Object.values(this.loading); if (ps.length){ await Promise.all(ps); c=this.find(text,tl,alt); } return c; },
  find(text, tl, alt){ const ks = alt ? [this.key(text,true), this.key(text,false)] : [this.key(text,false)];
    const cur=tl+'-'+S.L; const order = Object.keys(this.data).filter(id=>id.startsWith(tl+'-')).sort((a,b)=> (b.startsWith(cur)) - (a.startsWith(cur)));
    for (const k of ks) for (const id of order){ const v=this.data[id][k]; if (v) return v; }
    return null; }
};
const audioEl = new Audio(); audioEl.preload='auto'; try{ audioEl.preservesPitch=true; audioEl.mozPreservesPitch=true; audioEl.webkitPreservesPitch=true; }catch(e){}
const Speech = {
  voices:[], chainId:0, pend:null,
  ok: typeof window.speechSynthesis!=='undefined',
  init(){ if(!this.ok) return; const load=()=>{ try{ this.voices = speechSynthesis.getVoices(); }catch(e){} if (S.view==='level' && S.audioOpen) renderAudioSheet(); }; load(); try{ speechSynthesis.addEventListener('voiceschanged',load); }catch(e){ speechSynthesis.onvoiceschanged=load; } },
  list(tl){ return this.voices.filter(v=>(v.lang||'').toLowerCase().replace('_','-').startsWith(tl)); },
  score(v){ let s=0; const n=v.name||''; if(/Google/i.test(n)) s+=5; if(/Natural|Neural|Premium|Enhanced|Online/i.test(n)) s+=6; if(/Milena|Yuri|Katya|Svetlana|Dmitry|Dariya|Samantha|Daniel|Karen|Maged|Laila|Majed|Tarik|Zariyah|Hamed|Mariam|Shakir|Salma/i.test(n)) s+=3; if(/Naayf|Hoda/i.test(n)) s-=2; if(v.localService) s+=1; return s; },
  mode(tl){ const v=Store.d.settings.voice[tl]; if (v && v!=='lisan' && v!=='auto') return 'device'; if (v==='lisan') return 'clip'; return (tl==='ar' && this.autoVoice(tl)) ? 'auto' : 'clip'; },
  autoVoice(tl){ if (!this.ok || this.broken) return null; const L=this.list(tl); if(!L.length) return null; return L.slice().sort((a,b)=>this.score(b)-this.score(a))[0]; },
  voice(tl, alt){ const L=this.list(tl); if(!L.length) return null; const want=Store.d.settings.voice[tl]; let v = L.find(x=>x.voiceURI===want); const sorted=L.slice().sort((a,b)=>this.score(b)-this.score(a)); if(!v) v=sorted[0]; if(alt){ const other = sorted.find(x=>x!==v); return other||v; } return v; },
  stop(){ this.chainId++; try{ audioEl.pause(); }catch(e){} if (this.pend){ const f=this.pend; this.pend=null; f(); } if(this.ok) try{ speechSynthesis.cancel(); }catch(e){} document.querySelectorAll('.speaking').forEach(e=>e.classList.remove('speaking')); },
  rate(o){ const st=Store.d.settings; return Math.max(.4,Math.min(2,(st.rate||1)*(o.slow?0.65:1))); },
  vol(){ const st=Store.d.settings; return Math.max(0,Math.min(1,st.volume==null?1:st.volume)); },
  playClip(clip, o){
    return new Promise(res=>{
      let done=false; const fin=()=>{ if(!done){ done=true; audioEl.onended=audioEl.onerror=null; if(this.pend===fin) this.pend=null; res(); } };
      this.pend=fin; audioEl.onended=fin; audioEl.onerror=fin;
      const r=this.rate(o); audioEl.src='data:audio/mpeg;base64,'+clip; audioEl.playbackRate=r; audioEl.defaultPlaybackRate=r; audioEl.volume=this.vol();
      const p=audioEl.play(); if (p&&p.catch) p.catch(()=>{ fin(); });
    });
  },
  // resolves true if the device voice actually started speaking
  speakDevice(text, tl, o, watch){
    return new Promise(res=>{
      if(!this.ok || !text){ res(false); return; }
      const u = new SpeechSynthesisUtterance(sayOf(text));
      u.lang = SPEECH_LANG[tl]; const main=this.voice(tl); const v=this.voice(tl,o.alt); if(v){ u.voice=v; u.lang=v.lang; }
      const sameVoice = o.alt && (!v || v===main);
      u.rate = Math.max(.3,Math.min(2,this.rate(o)*0.95)); u.pitch = sameVoice?0.82:1; u.volume=this.vol();
      let started=false, done=false; const fin=(ok)=>{ if(!done){ done=true; if(this.pend===stopper) this.pend=null; res(ok); } };
      const stopper=()=>fin(true); this.pend=stopper;
      u.onstart=()=>{ started=true; }; u.onend=()=>fin(true); u.onerror=()=>{ if(!started && watch) this.broken=true; fin(started); };
      if (watch) setTimeout(()=>{ if(!started && !done){ try{ speechSynthesis.cancel(); }catch(e){} this.broken=true; fin(false); } }, 1600);
      setTimeout(()=>fin(started), 2500+ sayOf(text).length*240/(u.rate||1));
      try{ speechSynthesis.speak(u); }catch(e){ fin(false); }
    });
  },
  async speak(text, tl, o={}){
    const m=this.mode(tl);
    if (m==='device'){ const ok=await this.speakDevice(text,tl,o,false); if(!ok && !this.list(tl).length) toast(ui().noAudio); return; }
    if (m==='auto'){ const id=this.chainId; const ok=await this.speakDevice(text,tl,o,true); if (ok || id!==this.chainId) return; }
    let clip = Packs.find(text, tl, o.alt);
    if (!clip && Object.keys(Packs.loading).length) clip = await Packs.ensure(text, tl, o.alt);
    if (clip) return this.playClip(clip, o);
    const ok=await this.speakDevice(text,tl,o,false); if(!ok) toast(ui().noAudio);
  },
  say(text, tl, o={}){ this.stop(); return this.speak(text,tl,o); },
  async chain(items, tl, onItem){ this.stop(); const id=this.chainId;
    for (let i=0;i<items.length;i++){ if(id!==this.chainId) return false; onItem&&onItem(i,true); await this.speak(items[i].say, tl, items[i].o||{}); onItem&&onItem(i,false); if(id!==this.chainId) return false; await new Promise(r=>setTimeout(r,items[i].pause||350)); }
    return true; }
};

/* ---------- model ---------- */
const cache = {};
function common(tr){ const key='c:'+tr; if(cache[key]) return cache[key]; const {n,t,bank}=TRACKS[tr]; const m={};
  lines(bank.common).forEach(l=>{ const f=l.split('|'); const w=norm(f[0],t); m[w] = t==='en' ? (n==='ar'?f[1]:f[2]) : f[1]; });
  return cache[key]=m; }
function parseSent(l, t, n){ const f=l.split('|'); const src=f[0]; const m = t==='en' ? (n==='ar'?f[1]:f[2]) : f[1]; return {src, t:disp(src), say:sayOf(src), m, pr:pronOf(src,t,n)}; }
function level(tr, L){
  const key=tr+':'+L; if(cache[key]) return cache[key];
  const {n,t,bank}=TRACKS[tr]; const D=bank.levels[L];
  const themes=[], vocab=[];
  D.vocab.forEach((th,ti)=>{ themes.push(pick(th.t,n)); lines(th.w).forEach(l=>{ const f=l.split('|'); let it;
    if (t==='en') it={e:f[0],src:f[1],m:n==='ar'?f[2]:f[3]}; else it={e:f[0],src:f[1],m:f[2]};
    it.theme=ti; it.t=disp(it.src); it.say=sayOf(it.src); if(!it.pr) it.pr=pronOf(it.src,t,n); it.id=L+':v:'+vocab.length; it.kind='v'; vocab.push(it); }); });
  const sentences = lines(D.sentences).map((l,i)=>Object.assign(parseSent(l,t,n),{id:L+':s:'+i,kind:'s'}));
  const grammar = D.grammar.map((g,gi)=>({title:pick(g.title,n), body:pick(g.body,n), ex:lines(g.ex).map(l=>parseSent(l,t,n)),
    quiz:(g.quiz||[]).map((q,qi)=>({q:pick(q[0],n), opts:q.slice(1), id:L+':g:'+gi+':'+qi, kind:'g'}))}));
  const readings = (D.readings||[]).map(r=>{ const gl={}; lines(r.gloss).forEach(x=>{ const f=x.split('|'); gl[norm(f[0],t)] = t==='en'?(n==='ar'?f[1]:f[2]):f[1]; });
    return {title:disp(r.title), say:sayOf(r.title), tr:pick(r.tr,n), sents:lines(r.sents).map(l=>parseSent(l,t,n)), gloss:gl}; });
  const dialogues = (D.dialogues||[]).map(d=>({title:pick(d.title,n), lines:lines(d.lines).map(l=>{ const f=l.split('|'); const s=parseSent(f.slice(1).join('|'),t,n); s.who=f[0]; return s; })}));
  let alphabet=null;
  if (L==='A1' && bank.alphabet){ alphabet = lines(bank.alphabet).map((l,i)=>{ const f=l.split('|'); let a;
      if (t==='ru') a={letter:f[0], name:f[1], nameSay:f[1], sound:f[2], ex:f[3], e:f[4], m:f[5]};
      else if (t==='en') a={letter:f[0], name:pick(f[1],n), nameSay:f[0].split(' ')[0]+'.', sound:pick(f[2],n), ex:f[3], e:f[4], m:n==='ar'?f[5]:f[6], expr:n==='ar'?f[7]:f[8]};
      else a={letter:f[0], name:f[1], nameSay:f[7], sound:f[2], forms:f[3], ex:f[4], e:f[5], m:f[6]};
      a.exT=disp(a.ex); a.exSay=sayOf(a.ex); a.expr=pronOf(a.ex,t,n); a.id='A1:l:'+i; a.kind='l'; return a; }); }
  return cache[key]={tr,L,n,t,themes,vocab,sentences,grammar,readings,dialogues,alphabet};
}
function dict(tr){ const key='d:'+tr; if(cache[key]) return cache[key]; const m={}; const {t}=TRACKS[tr];
  LEVELS.forEach(L=>{ const lv=level(tr,L); lv.vocab.forEach(v=>{ const k=norm(v.src,t); if(!m[k]) m[k]=v; }); }); return cache[key]=m; }

/* ---------- state & routing ---------- */
const S = { view:'home', tr:null, L:null, tab:null, theme:0, vmode:'cards', letter:0, reading:0, dialog:0, showTr:false, role:false,
  wmode:'trace', traceIdx:0, traceFont:'print', dictIdx:0, copyIdx:0, kb:false, exam:null, audioOpen:false, gramOpen:0, flashQ:null, flashI:0, flashFlip:false, lockedView:false };
function setHash(h){ if (location.hash.slice(1)!==h){ history.replaceState(null,'','#'+h); } }
function route(){
  const h = location.hash.slice(1); const m = h.match(/^(ar-ru|ar-en|ru-en|ru-ar)(?:-(a1|a2|b1|b2|c1|c2))?(?:-(letters|words|phrases|grammar|read|talk|write|exam))?$/);
  Speech.stop();
  if (!m){ S.view='home'; S.tr=null; render(); return; }
  S.tr=m[1]; if (!m[2]){ S.view='track'; render(); return; }
  const L=m[2].toUpperCase(); if (S.L!==L){ S.theme=0; S.letter=0; S.reading=0; S.dialog=0; S.traceIdx=0; S.dictIdx=0; S.copyIdx=0; S.exam=null; S.gramOpen=0; S.flashQ=null; }
  S.L=L; S.view='level'; Packs.load(TRACKS[S.tr].t, L);
  const lv=level(S.tr,L); const tabs=tabList(lv);
  const i=LEVELS.indexOf(L); S.lockedView = !Store.unlocked(S.tr,i);
  S.tab = m[3] && tabs.includes(m[3]) ? m[3] : (S.lockedView?'exam':tabs[0]);
  if (S.lockedView && S.tab!=='exam') S.tab='exam';
  render();
}
function go(h){ location.hash = h; }
function tabList(lv){ const a=['words','phrases','grammar','read','talk','write','exam']; if (lv.alphabet) a.unshift('letters'); return a; }

/* ---------- render shell ---------- */
const app = document.getElementById('app');
function ui(){ return S.tr ? T[TRACKS[S.tr].n] : T.ar; }
function render(){
  const tr = S.tr ? TRACKS[S.tr] : null;
  const lang = tr ? tr.n : 'ar'; const u=T[lang];
  document.documentElement.dir = S.view==='home' ? 'rtl' : u.dir; document.documentElement.lang = lang;
  let body='';
  if (S.view==='home') body = homeView(); else if (S.view==='track') body = trackView(); else body = levelView();
  app.innerHTML = topBar() + body + `<footer><div class="wrap">Lisan · لِسان · Лисан — ${S.view==='home'?'A1 → C2':esc(u.levelsTitle)}</div></footer>`;
  afterRender();
}
function topBar(){
  const u=ui(); let crumbs='';
  if (S.view!=='home'){ crumbs = `<nav class="crumbs"><button data-act="nav" data-h="">${esc(u.home)}</button>`; if (S.view==='level') crumbs+=`<span>›</span><button data-act="nav" data-h="${S.tr}">${esc(u.trackOf[S.tr])}</button><span>›</span><span>${S.L}</span>`; else crumbs+=`<span>›</span><span>${esc(u.trackOf[S.tr])}</span>`; crumbs+='</nav>'; }
  const audio = S.view==='level' ? `<button class="iconbtn" data-act="audio" aria-label="${esc(u.audio)}">${ICON.sound}<span>${esc(u.audio)}</span></button>` : '';
  return `<header class="top"><div class="wrap"><button class="brand" data-act="nav" data-h=""><span class="b-ar">لِسان</span><span class="b-lat">Lisan</span><span class="b-cy">Лисан</span></button>${crumbs}<span class="sp"></span>${audio}</div></header>`;
}

/* ---------- home ---------- */
function trackStats(tr){ let w=0,s=0,g=0; LEVELS.forEach(L=>{ const lv=level(tr,L); w+=lv.vocab.length; s+=lv.sentences.length+lv.dialogues.reduce((a,d)=>a+d.lines.length,0)+lv.readings.reduce((a,r)=>a+r.sents.length,0); g+=lv.grammar.length; }); return {w,s,g}; }
function homeView(){
  const cards = [
    {id:'ar-ru', dir:'rtl', from:'AR → RU', glyph:'Яя', h:'تعلّم اللغة الروسية', sub:'كل الشرح والمعاني بالعربية، مع النطق بالحروف العربية.'},
    {id:'ar-en', dir:'rtl', from:'AR → EN', glyph:'Aa', h:'تعلّم اللغة الإنجليزية', sub:'كل الشرح والمعاني بالعربية، مع النطق بالحروف العربية.'},
    {id:'ru-en', dir:'ltr', from:'RU → EN', glyph:'Aa', h:'Английский язык', sub:'Все объяснения на русском, произношение русскими буквами.'},
    {id:'ru-ar', dir:'ltr', from:'RU → AR', glyph:'ضـ', ar:1, h:'Арабский язык', sub:'Все объяснения на русском, транскрипция кириллицей.'}
  ].map(c=>{ const st=trackStats(c.id); const done=LEVELS.filter(L=>Store.passed(c.id,L)).length;
    return `<button class="track" dir="${c.dir}" data-act="nav" data-h="${c.id}"><span class="from">${c.from}</span><span class="glyph${c.ar?' ar':''}">${c.glyph}</span><h3>${c.h}</h3><span class="sub">${c.sub}</span><span class="small muted mono">A1–C2 · ${st.w} ${c.dir==='rtl'?'كلمة':'слов'} · ${st.g} ${c.dir==='rtl'?'درس قواعد':'тем грамматики'}</span><span class="bar" aria-label="${done}/6"><i style="width:${done/6*100}%"></i></span></button>`; }).join('');
  const tot = ['ar-ru','ar-en','ru-ar'].map(trackStats).reduce((a,b)=>({w:a.w+b.w,s:a.s+b.s,g:a.g+b.g}),{w:0,s:0,g:0});
  return `<main class="wrap"><section class="hero"><div class="specimen" aria-hidden="true"><span>Яя</span><span class="s-hand">Жж</span><span>Aa</span><span class="s-ar">ض</span></div>
  <h1>الروسية والإنجليزية والعربية، من الحرف الأول حتى مستوى C2</h1>
  <p class="h1-ru">Русский, английский и арабский — от первой буквы до уровня C2</p>
  <div class="stats">${[[4,'مسارات','направления'],[6,'مستويات','уровней'],[tot.w,'كلمة بالصور','слов с картинками'],[tot.g,'درس قواعد','тем грамматики']].map(([n,a,r])=>`<div class="stat"><b>${n}</b><span class="s-ar" dir="rtl">${a}</span><span class="s-ru" dir="ltr">${r}</span></div>`).join('')}</div></section>
  <section class="tracks">${cards}</section>
  <section class="how" dir="rtl"><div><h3>اسمع وكرّر</h3><p>كل حرف وكلمة وجملة لها صوت، ويمكنك التحكم بالسرعة وطبقة الصوت واختيار الصوت. اضغط على أي كلمة في النصوص لتسمعها وترى معناها.</p></div>
  <div><h3>اكتب بيدك</h3><p>تتبّع الحروف بالخط المطبوع وخط اليد، ثم تدرّب على الإملاء ونسخ الجمل بلوحة مفاتيح اللغة.</p></div>
  <div><h3>امتحان لكل مستوى</h3><p>لا تنتقل إلا بعد 80٪. إذا لم تنجح تراجع أخطاءك، ويأتيك امتحان جديد مختلف يركّز على ما أخطأت فيه.</p></div></section>
  <section class="how" dir="ltr" style="border-top:0;padding-top:0"><div><h3>Слушайте и повторяйте</h3><p>У каждой буквы, слова и фразы есть озвучка с регулировкой скорости и высоты голоса. Нажмите на любое слово в тексте — услышите его и увидите перевод.</p></div>
  <div><h3>Пишите от руки</h3><p>Прописи печатным и рукописным шрифтом, диктант и списывание с экранной клавиатурой нужного алфавита.</p></div>
  <div><h3>Экзамен на каждом уровне</h3><p>Дальше — только после 80%. Не сдали? Разберите ошибки и пройдите новый экзамен с упором на них.</p></div></section>
  <p class="note" dir="rtl" style="margin-bottom:10px">${esc(T.ar.audioNote)}</p><p class="note" dir="ltr">${esc(T.ru.audioNote)}</p></main>`;
}

/* ---------- track ---------- */
function trackView(){
  const u=ui(); const rows = LEVELS.map((L,i)=>{ const lv=level(S.tr,L); const un=Store.unlocked(S.tr,i); const ps=Store.passed(S.tr,L); const best=Store.d.best[S.tr+':'+L];
    const pill = ps?`<span class="pill ok">✓ ${esc(u.passed)} · ${best}%</span>`: un?`<span class="pill open">${esc(u.open)}${best!=null?' · '+best+'%':''}</span>`:`<span class="pill lock">🔒 ${esc(u.locked)}</span>`;
    return `<button class="lvl${un?'':' locked'}" data-act="nav" data-h="${S.tr}-${L.toLowerCase()}"><span class="code">${L}</span><span class="info"><h3>${esc(u.lv[L])}</h3><p>${esc(u.lvd[L])}</p><div class="counts">${lv.alphabet?lv.alphabet.length+' '+(TRACKS[S.tr].n==='ar'?'حرفاً':'букв')+' · ':''}${lv.vocab.length} ${esc(u.words)} · ${lv.sentences.length} ${esc(u.phrases)} · ${lv.grammar.length} ${esc(u.topics)}</div></span>${pill}</button>`; }).join('');
  return `<main class="wrap"><div class="page-h"><h2>${esc(u.trackOf[S.tr])}</h2><p class="muted">${esc(u.levelsTitle)}</p></div><div class="ladder">${rows}</div>
  <p class="small"><button class="btn ghost sm" data-act="reset">${esc(u.reset)}</button></p></main>`;
}

/* ---------- level ---------- */
function levelView(){
  const u=ui(); const lv=level(S.tr,S.L); const tabs=tabList(lv);
  const tb = tabs.map(k=>`<button class="tab${k==='exam'?' exam':''}${S.tab===k?' on':''}" data-act="tab" data-tab="${k}"${S.lockedView&&k!=='exam'?' disabled':''}>${esc(u.tabs[k])}</button>`).join('');
  let content='';
  if (S.lockedView && S.tab==='exam' && !S.exam) content = lockedNote() + examView(lv);
  else content = ({letters:lettersView,words:wordsView,phrases:phrasesView,grammar:grammarView,read:readView,talk:talkView,write:writeView,exam:examView})[S.tab](lv);
  return `<main class="wrap"><div class="lvl-head"><div class="row"><h2><span class="code">${S.L}</span><span>${esc(u.lv[S.L])}</span></h2></div><div class="margin-line"></div></div>
  <nav class="tabs" role="tablist">${tb}</nav><section class="panel" id="panel">${content}</section></main>`;
}
function lockedNote(){ const u=ui(); const i=LEVELS.indexOf(S.L);
  return `<div class="lockmsg" style="margin-bottom:18px"><h3>🔒 ${esc(u.lockT)}</h3><p class="muted" style="margin:0;max-width:52ch">${esc(u.lockD)}</p><div class="row-btns"><button class="btn ghost" data-act="nav" data-h="${S.tr}-${LEVELS[i-1].toLowerCase()}">${esc(u.goPrev)}</button></div></div>`; }
const isAr = ()=>TRACKS[S.tr].t==='ar';
const tclass = ()=> isAr()?'tgt tgt-ar':'tgt';
const tdir = ()=> isAr()?'rtl':'ltr';

/* clickable words */
function wordsHTML(src, ctx){
  const tl=TRACKS[S.tr].t; const re=/([\p{L}\p{M}+'’́]+(?:-[\p{L}\p{M}+́]+)*)/gu;
  return String(src).split(re).map((p,i)=> i%2 ? `<span class="w" data-act="word" data-w="${esc(p)}"${ctx!=null?` data-ctx="${esc(ctx)}"`:''}>${esc(disp(p))}</span>` : esc(p)).join('');
}

/* letters */
function lettersView(lv){
  const u=ui(), tl=lv.t, A=lv.alphabet, a=A[S.letter]||A[0]; const ar=tl==='ar';
  const hand = ar ? `<span class="hand" style="font-family:'Aref Ruqaa',cursive" dir="rtl">${esc(a.letter)}</span>` : `<span class="hand">${esc(a.letter.replace(' ',''))}</span>`;
  return `<div class="letter-stage"><div class="ruled big-letter" dir="${ar?'rtl':'ltr'}"><span class="print${ar?' ar':''}">${esc(a.letter.replace(' ',''))}</span>${hand}</div>
  <div class="letter-info"><div><div class="nm">${esc(u.name)}</div><div style="display:flex;align-items:center;gap:10px;font-size:1.3rem;font-weight:600"><span class="${tclass()}">${esc(a.name)}</span>${playBtn(a.nameSay,tl,false)}${playBtn(a.nameSay,tl,true)}</div></div>
  <div><div class="nm">${esc(u.sound)}</div><div class="snd">${esc(a.sound)}</div></div>
  ${a.forms?`<div><div class="nm">${esc(u.forms)}</div><div class="forms">${esc(a.letter)} ${esc(a.forms)}</div></div>`:''}
  <div><div class="nm">${esc(u.example)}</div><div class="ex-word"><span class="emo">${a.e}</span><div style="flex:1;min-width:0"><div class="w ${tclass()}" dir="${tdir()}">${esc(a.exT)}</div><div class="small" style="color:var(--teal)">${esc(a.expr)}</div><div class="small muted">${esc(a.m)}</div></div>${playBtn(a.exSay,tl,false)}${playBtn(a.exSay,tl,true)}</div></div>
  <div class="row-btns"><button class="btn ghost sm" data-act="letter" data-i="${(S.letter-1+A.length)%A.length}">${esc(u.prev)}</button><button class="btn sm" data-act="letter" data-i="${(S.letter+1)%A.length}">${esc(u.next)}</button><button class="btn ghost sm" data-act="tab" data-tab="write">✍︎ ${esc(u.trace)}</button></div></div></div>
  <div class="ltr-grid" dir="${ar?'rtl':'ltr'}">${A.map((x,i)=>`<button class="ltr${ar?' ar':''}${i===S.letter?' on':''}" data-act="letter" data-i="${i}">${esc(x.letter.split(' ')[0])}</button>`).join('')}</div>`;
}

/* words */
function wordsView(lv){
  const u=ui(), tl=lv.t; const weak=Store.weak(S.tr+':'+S.L);
  const chips = `<div class="chips"><button class="chip${S.theme<0?' on':''}" data-act="theme" data-i="-1">${esc(u.all)} · ${lv.vocab.length}</button>${lv.themes.map((t,i)=>`<button class="chip${S.theme===i?' on':''}" data-act="theme" data-i="${i}">${esc(t)}</button>`).join('')}</div>`;
  const items = lv.vocab.filter(v=>S.theme<0||v.theme===S.theme);
  const head = `<div class="sec-h"><h3>${esc(u.tabs.words)}</h3><div class="seg"><button class="${S.vmode==='cards'?'on':''}" data-act="vmode" data-m="cards">${esc(u.cards)}</button><button class="${S.vmode==='flash'?'on':''}" data-act="vmode" data-m="flash">${esc(u.flash)}</button></div></div>`;
  if (S.vmode==='flash') return head + chips + flashView(items, lv);
  return head + chips + `<div class="cards">${items.map(v=>`<div class="card${weak[v.id]?' weak':''}"><div class="emo" aria-hidden="true">${v.e}</div><div class="w ${tclass()}" dir="${tdir()}">${esc(v.t)}</div><div class="pr" dir="auto">${esc(v.pr)}</div><div class="m">${esc(v.m)}</div><div class="acts">${playBtn(v.say,tl,false)}${playBtn(v.say,tl,true)}</div></div>`).join('')}</div>`;
}
function flashView(items, lv){
  const u=ui(), tl=lv.t; const sig=S.tr+S.L+S.theme;
  if (!S.flashQ || S.flashQ.sig!==sig){ S.flashQ={sig, list:shuffle(items).map(v=>v.id)}; S.flashI=0; S.flashFlip=false; }
  const q=S.flashQ.list; if (S.flashI>=q.length) return `<div class="flash"><div class="flash-card"><div class="emo">🎉</div><div class="w">${q.length}/${q.length}</div><button class="btn" data-act="flashAgain">${esc(u.again)}</button></div></div>`;
  const v = lv.vocab.find(x=>x.id===q[S.flashI]);
  return `<div class="flash"><div class="count">${S.flashI+1} ${esc(u.ofN)} ${q.length}</div><div class="flash-card"><div class="emo">${v.e}</div><div class="w ${tclass()}" dir="${tdir()}">${esc(v.t)}</div><div class="row-btns">${playBtn(v.say,tl,false)}${playBtn(v.say,tl,true)}</div>
  ${S.flashFlip?`<div class="pr" dir="auto">${esc(v.pr)}</div><div class="m">${esc(v.m)}</div>`:`<button class="btn ghost" data-act="flip">${esc(u.flip)}</button>`}</div>
  <div class="row-btns" style="justify-content:center"><button class="btn ghost" data-act="flashAns" data-ok="0">✗ ${esc(u.didnt)}</button><button class="btn" data-act="flashAns" data-ok="1">✓ ${esc(u.knew)}</button></div></div>`;
}

/* phrases */
function sentenceList(arr, tl, opts={}){
  return `<div class="list">${arr.map((s,i)=>`<div class="li" data-li="${i}"><div class="btns">${playBtn(s.say,tl,false)}${playBtn(s.say,tl,true)}</div><div class="txt"><div class="t ${tclass()}" dir="${tdir()}">${wordsHTML(s.src, s.m)}</div>${s.pr?`<div class="pr" dir="auto">${esc(s.pr)}</div>`:''}<div class="m">${esc(s.m)}</div></div></div>`).join('')}</div>`;
}
function phrasesView(lv){
  const u=ui(); return `<div class="sec-h"><h3>${esc(u.tabs.phrases)} · ${lv.sentences.length}</h3><button class="btn ghost sm" data-act="playList" data-src="phrases">${ICON.play} ${esc(u.listenAll)}</button></div>${sentenceList(lv.sentences, lv.t)}`;
}

/* grammar */
function bodyHTML(html, tl){
  return html.replace(/\[\[(.+?)\]\]/g,(m,x)=>`<span class="tgt${tl==='ar'?' tgt-ar':''}" dir="${tl==='ar'?'rtl':'ltr'}" data-act="say" data-say="${esc(sayOf(x))}" data-tl="${tl}">${esc(disp(x))}</span>`)
             .replace(/<table>/g,'<div class="tblwrap"><table>').replace(/<\/table>/g,'</table></div>');
}
function grammarView(lv){
  const u=ui(), tl=lv.t;
  return lv.grammar.map((g,gi)=>{ const open=S.gramOpen===gi;
    return `<div class="gram"><button data-act="gram" data-i="${gi}" aria-expanded="${open}"><span>${esc(g.title)}</span><span class="n">${gi+1}/${lv.grammar.length} ${open?'−':'+'}</span></button>${open?`<div class="body">${bodyHTML(g.body,tl)}
    <h4>${esc(u.examples)}</h4>${sentenceList(g.ex,tl)}
    ${g.quiz.length?`<h4>${esc(u.checkUnd)}</h4>${g.quiz.map((q,qi)=>{ const opts=shuffle(q.opts.map((o,oi)=>({o,ok:oi===0})));
      return `<div class="mini-q"><div class="q" dir="auto">${bodyHTML(esc(disp(q.q)),tl).replace(/___/g,'<b>____</b>')}</div><div class="opts">${opts.map(x=>`<button class="opt" data-act="miniq" data-ok="${x.ok?1:0}" dir="auto">${esc(disp(x.o))}</button>`).join('')}</div></div>`; }).join('')}`:''}</div>`:''}</div>`; }).join('');
}

/* reading */
function readView(lv){
  const u=ui(), tl=lv.t; const r=lv.readings[S.reading]; if(!r) return `<div class="empty">—</div>`;
  const pick = lv.readings.length>1 ? `<div class="chips">${lv.readings.map((x,i)=>`<button class="chip${i===S.reading?' on':''}" data-act="readingSel" data-i="${i}">${esc(x.title)}</button>`).join('')}</div>`:'';
  return `${pick}<div class="sec-h"><div><h3 class="${tclass()}" dir="${tdir()}">${esc(r.title)}</h3><div class="muted small">${esc(r.tr)}</div></div><div class="row-btns"><button class="btn sm" data-act="playList" data-src="read">${ICON.play} ${esc(u.listenAll)}</button><button class="btn ghost sm" data-act="playList" data-src="read" data-slow="1">${ICON.slow}</button><button class="btn ghost sm" data-act="toggleTr">${esc(S.showTr?u.hideTr:u.showTr)}</button></div></div>
  <div class="ruled reading${tl==='ar'?' ar':''}" dir="${tdir()}">${r.sents.map((s,i)=>`<span class="sent" data-si="${i}">${wordsHTML(s.src,i)}</span> ${S.showTr?`<span class="trl" dir="${ui().dir}">${esc(s.m)}</span>`:''}`).join('')}</div>
  <p class="small muted" style="margin-top:10px">${TRACKS[S.tr].n==='ar'?'اضغط على أي كلمة لتسمعها وترى معناها.':'Нажмите на любое слово, чтобы услышать его и увидеть перевод.'}</p>`;
}

/* dialogue */
function avatar(color, label, id){ return `<div class="avatar" id="av-${id}"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="38" fill="${color}" opacity=".16"/><circle cx="40" cy="33" r="15" fill="${color}"/><path d="M14 72c4-14 14-20 26-20s22 6 26 20" fill="${color}"/><ellipse class="mouth" cx="40" cy="39" rx="4" ry="2" fill="var(--sheet)" style="transform-origin:40px 39px"/><circle cx="34.5" cy="31" r="1.8" fill="var(--sheet)"/><circle cx="45.5" cy="31" r="1.8" fill="var(--sheet)"/></svg><span>${esc(label)}</span></div>`; }
function talkView(lv){
  const u=ui(), tl=lv.t; const d=lv.dialogues[S.dialog]; if(!d) return `<div class="empty">—</div>`;
  const pick = lv.dialogues.length>1 ? `<div class="chips">${lv.dialogues.map((x,i)=>`<button class="chip${i===S.dialog?' on':''}" data-act="dialogSel" data-i="${i}">${esc(x.title)}</button>`).join('')}</div>`:'';
  return `${pick}<div class="sec-h"><h3>${esc(d.title)}</h3><div class="row-btns"><button class="btn sm" data-act="playDialog">${ICON.play} ${esc(u.listenAll)}</button><button class="btn ghost sm" data-act="playDialog" data-slow="1">${ICON.slow}</button><label class="small" style="display:inline-flex;gap:6px;align-items:center"><input type="checkbox" id="role" data-act="role" ${S.role?'checked':''}> ${esc(u.roleplay)}</label></div></div>
  <div class="stage"><div class="stage-top">${avatar('var(--blue)','A','A')}${avatar('var(--teal)',S.role?'B · '+u.you:'B','B')}</div>
  <div class="chat" dir="${tdir()}">${d.lines.map((l,i)=>`<div class="bubble-row ${l.who}" data-bi="${i}"><button class="play" data-act="say" data-say="${esc(l.say)}" data-tl="${tl}"${l.who==='B'?' data-alt="1"':''}>${ICON.play}</button><div class="bubble${S.role&&l.who==='B'?' hidden-line':''}" data-bubble="${i}"><div class="t ${tclass()}">${wordsHTML(l.src,l.m)}</div>${l.pr?`<div class="pr" dir="auto">${esc(l.pr)}</div>`:''}<div class="m" dir="${ui().dir}">${esc(l.m)}</div></div></div>`).join('')}</div>
  <div class="your-turn" id="yourturn" hidden><span>${esc(u.yourTurn)}</span><button class="btn sm" data-act="turnNext">${esc(u.next)}</button></div></div>`;
}

/* writing */
const KB = {
 ru:['йцукенгшщзхъ','фывапролджэ','ячсмитьбюё'],
 en:['qwertyuiop','asdfghjkl',"zxcvbnm'"],
 ar:['ضصثقفغعهخحجد','شسيبلاتنمكط','ئءؤرىةوزظذ','أإآ']
};
function kbHTML(){ const tl=TRACKS[S.tr].t; return `<div class="kbd${tl==='ar'?' ar':''}" dir="${tdir()}">${KB[tl].map(r=>`<div class="krow">${[...r].map(c=>`<button data-act="key" data-k="${esc(c)}">${esc(c)}</button>`).join('')}</div>`).join('')}<div class="krow"><button class="wide" data-act="key" data-k=" ">␣</button><button class="wide" data-act="key" data-k="BS">⌫</button></div></div>`; }
function writeItems(lv){ if (lv.alphabet) return lv.alphabet.map(a=>({text:a.letter.replace(' ', TRACKS[S.tr].t==='ar'?' ':''), say:a.nameSay})); return lv.vocab.filter(v=>v.say.length<=14).map(v=>({text:v.t, say:v.say})); }
function dictItems(lv){ return lv.vocab.filter(v=>v.say.length<=24); }
function writeView(lv){
  const u=ui(); const seg=`<div class="sec-h"><div class="seg"><button class="${S.wmode==='trace'?'on':''}" data-act="wmode" data-m="trace">${esc(u.trace)}</button><button class="${S.wmode==='dict'?'on':''}" data-act="wmode" data-m="dict">${esc(u.dict)}</button><button class="${S.wmode==='copy'?'on':''}" data-act="wmode" data-m="copy">${esc(u.copy)}</button></div></div>`;
  if (S.wmode==='trace'){ const items=writeItems(lv); const it=items[S.traceIdx%items.length];
    return seg+`<div class="trace-wrap"><div class="row-btns"><div class="seg"><button class="${S.traceFont==='print'?'on':''}" data-act="tfont" data-f="print">${esc(u.print)}</button><button class="${S.traceFont==='hand'?'on':''}" data-act="tfont" data-f="hand">${esc(u.hand)}</button></div>${playBtn(it.say,lv.t,false)}${playBtn(it.say,lv.t,true)}<span class="sp" style="flex:1"></span><span class="mono small muted">${S.traceIdx%items.length+1}/${items.length}</span></div>
    <canvas class="trace-canvas" id="trace" aria-label="${esc(u.trace)}"></canvas><div class="row-btns"><button class="btn ghost sm" data-act="trace" data-d="-1">${esc(u.prev)}</button><button class="btn ghost sm" data-act="traceClear">${esc(u.clear)}</button><button class="btn sm" data-act="trace" data-d="1">${esc(u.next)}</button></div></div>`; }
  if (S.wmode==='dict'){ const items=dictItems(lv); const it=items[S.dictIdx%items.length];
    return seg+`<div class="dict"><div class="row-btns"><button class="big-play" data-act="say" data-say="${esc(it.say)}" data-tl="${lv.t}" aria-label="${esc(u.play)}">${ICON.play}</button>${playBtn(it.say,lv.t,true)}<span class="emo" style="font-size:2.4rem">${it.e}</span><span class="mono small muted">${S.dictIdx%items.length+1}/${items.length}</span></div>
    <label class="muted">${esc(u.type)}</label><input class="answer${isAr()?' ar':''}" id="dictIn" dir="${tdir()}" autocomplete="off" autocapitalize="off" spellcheck="false" lang="${lv.t}">
    <div class="row-btns"><button class="btn" data-act="dictCheck">${esc(u.check)}</button><button class="btn ghost" data-act="dictNext">${esc(u.next)}</button><button class="btn ghost sm" data-act="kb">${esc(u.showKb)}</button></div><div id="dictFb"></div>${S.kb?kbHTML():''}</div>`; }
  const items=lv.sentences; const it=items[S.copyIdx%items.length];
  return seg+`<div class="dict"><p class="muted" style="margin:0">${esc(u.copyHint)}</p><div class="paper"><div class="t ${tclass()}" dir="${tdir()}" style="font-size:1.3rem">${esc(it.t)}</div><div class="muted">${esc(it.m)}</div><div class="row-btns" style="margin-top:8px">${playBtn(it.say,lv.t,false)}${playBtn(it.say,lv.t,true)}<span class="mono small muted">${S.copyIdx%items.length+1}/${items.length}</span></div></div>
  <input class="answer${isAr()?' ar':''}" id="copyIn" dir="${tdir()}" autocomplete="off" autocapitalize="off" spellcheck="false" lang="${lv.t}">
  <div class="row-btns"><button class="btn" data-act="copyCheck">${esc(u.check)}</button><button class="btn ghost" data-act="copyNext">${esc(u.next)}</button><button class="btn ghost sm" data-act="kb">${esc(u.showKb)}</button></div><div id="copyFb"></div>${S.kb?kbHTML():''}</div>`;
}
let traceState=null;
function setupTrace(){
  const c=$('#trace'); if(!c) return; const lv=level(S.tr,S.L); const items=writeItems(lv); const it=items[S.traceIdx%items.length]; const tl=lv.t;
  const dpr=window.devicePixelRatio||1; const w=c.clientWidth, h=c.clientHeight; c.width=w*dpr; c.height=h*dpr; const ctx=c.getContext('2d'); ctx.scale(dpr,dpr);
  const css=getComputedStyle(document.documentElement); const col=n=>css.getPropertyValue(n).trim();
  const font = S.traceFont==='hand' ? (tl==='ar'?"'Aref Ruqaa'":"'Marck Script'") : (tl==='ar'?"'Amiri'":"'Lora'");
  const draw=()=>{ ctx.clearRect(0,0,w,h); ctx.fillStyle=col('--sheet'); ctx.fillRect(0,0,w,h);
    const base=h*0.68, top=h*0.22, mid=(base+top)/2; ctx.strokeStyle=col('--rule-2'); ctx.lineWidth=1;
    [top,base].forEach(y=>{ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}); ctx.setLineDash([6,6]); ctx.beginPath();ctx.moveTo(0,mid);ctx.lineTo(w,mid);ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle=col('--margin'); ctx.beginPath(); const mx = tl==='ar'? w-36 : 36; ctx.moveTo(mx,0); ctx.lineTo(mx,h); ctx.stroke();
    let size=h*0.5; ctx.font=`${size}px ${font}`; let tw=ctx.measureText(it.text).width; if (tw>w-80){ size=size*(w-80)/tw; ctx.font=`${size}px ${font}`; tw=ctx.measureText(it.text).width; }
    ctx.direction = tl==='ar'?'rtl':'ltr'; ctx.textAlign='center'; ctx.textBaseline='alphabetic'; ctx.fillStyle=col('--rule-2'); ctx.globalAlpha=.9; ctx.fillText(it.text, w/2, base); ctx.globalAlpha=1; };
  const strokes=[]; let cur=null;
  const redraw=()=>{ draw(); ctx.strokeStyle=col('--blue'); ctx.lineWidth=Math.max(4,h/45); ctx.lineCap='round'; ctx.lineJoin='round'; strokes.forEach(s=>{ ctx.beginPath(); s.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); if(s.length===1) ctx.lineTo(s[0][0]+.1,s[0][1]); ctx.stroke(); }); };
  const pos=e=>{ const r=c.getBoundingClientRect(); return [e.clientX-r.left, e.clientY-r.top]; };
  c.onpointerdown=e=>{ c.setPointerCapture(e.pointerId); cur=[pos(e)]; strokes.push(cur); redraw(); };
  c.onpointermove=e=>{ if(!cur) return; cur.push(pos(e)); redraw(); };
  c.onpointerup=c.onpointercancel=()=>{ cur=null; };
  traceState={clear(){ strokes.length=0; redraw(); }};
  const f = S.traceFont==='hand' ? (tl==='ar'?"40px 'Aref Ruqaa'":"40px 'Marck Script'") : (tl==='ar'?"40px 'Amiri'":"40px 'Lora'");
  redraw(); if (document.fonts && document.fonts.load) document.fonts.load(f, it.text).then(redraw).catch(()=>{});
}

/* ---------- exam ---------- */
function examPool(lv){
  const g=[]; lv.grammar.forEach(x=>x.quiz.forEach(q=>g.push(q)));
  return {v:lv.vocab, s:lv.sentences, g, l:lv.alphabet||[]};
}
function prioritized(arr, key, n){
  const weak=Store.weak(key), last=new Set(Store.d.last[key]||[]);
  const w=shuffle(arr.filter(x=>weak[x.id])), fresh=shuffle(arr.filter(x=>!weak[x.id]&&!last.has(x.id))), old=shuffle(arr.filter(x=>!weak[x.id]&&last.has(x.id)));
  const out=[]; const wn=Math.ceil(n*0.5);
  out.push(...w.slice(0,wn)); for (const x of fresh){ if(out.length>=n) break; out.push(x); } for (const x of old){ if(out.length>=n) break; out.push(x); } for (const x of w.slice(wn)){ if(out.length>=n) break; out.push(x); }
  return out.slice(0,n);
}
function distract(pool, correct, getter, n=3){ const tl=TRACKS[S.tr].t; const nm=x=>norm(x.m||'',TRACKS[S.tr].n); const ns=x=>norm(x.say||x.letter||'',tl);
  const seenG=new Set([getter(correct)]), seenM=new Set([nm(correct)]), seenS=new Set([ns(correct)]); const out=[];
  for (const x of shuffle(pool)){ const g=getter(x), m=nm(x), sv=ns(x); if(seenG.has(g)||(m&&seenM.has(m))||(sv&&seenS.has(sv))) continue; seenG.add(g); seenM.add(m); seenS.add(sv); out.push(x); if(out.length>=n) break; }
  return out; }
function buildExam(lv){
  const key=S.tr+':'+S.L, P=examPool(lv), tl=lv.t; const Q=[];
  const plan = lv.alphabet ? {mean:5,rev:3,listen:3,letter:2,sent:2,order:2,spell:1,gram:2} : {mean:5,rev:3,listen:3,sent:2,order:2,spell:2,gram:3};
  const vNeed = plan.mean+plan.rev+plan.listen+plan.spell; const vs = prioritized(P.v,key,vNeed);
  let vi=0; const takeV=()=>vs[vi++];
  for(let i=0;i<plan.mean;i++){ const it=takeV(); if(!it) break; Q.push({type:'mcq',kind:'kMean',item:it, prompt:{word:it.t,say:it.say,emo:''}, opts:shuffle([it,...distract(P.v,it,x=>x.m)]).map(x=>({label:x.m,ok:x===it}))}); }
  for(let i=0;i<plan.rev;i++){ const it=takeV(); if(!it) break; Q.push({type:'mcq',kind:'kRev',item:it, prompt:{text:it.m,emo:it.e}, opts:shuffle([it,...distract(P.v,it,x=>x.say)]).map(x=>({label:x.t,ok:x===it,tgt:1}))}); }
  for(let i=0;i<plan.listen;i++){ const it=takeV(); if(!it) break; Q.push({type:'mcq',kind:'kListen',item:it, prompt:{listen:it.say}, opts:shuffle([it,...distract(P.v,it,x=>x.say)]).map(x=>({label:x.t,ok:x===it,tgt:1}))}); }
  const sp = P.v.filter(x=>!/\s/.test(x.say) && x.say.length<=12); const spells = prioritized(sp.length?sp:P.v,key,plan.spell);
  spells.forEach(it=>Q.push({type:'spell',kind:'kSpell',item:it,prompt:{listen:it.say,emo:it.e}}));
  if (plan.letter && P.l.length){ prioritized(P.l,key,plan.letter).forEach(it=>Q.push({type:'mcq',kind:'kLetter',item:it,prompt:{listen:it.nameSay},opts:shuffle([it,...distract(P.l,it,x=>x.letter)]).map(x=>({label:x.letter,ok:x===it,tgt:1}))})); }
  prioritized(P.s,key,plan.sent).forEach(it=>Q.push({type:'mcq',kind:'kSent',item:it,prompt:{word:it.t,say:it.say,small:1},opts:shuffle([it,...distract(P.s,it,x=>x.m)]).map(x=>({label:x.m,ok:x===it}))}));
  const ord = P.s.filter(x=>{ const n=tokens(x.src).length; return n>=3&&n<=6 && new Set(tokens(x.src).map(w=>w.toLowerCase())).size===n; });
  prioritized(ord.length?ord:P.s,key,plan.order).forEach(it=>{ const tk=tokens(it.src); Q.push({type:'order',kind:'kOrder',item:it,words:tk,pool:shuffle(tk.map((w,i)=>({w,i}))),chosen:[]}); });
  prioritized(P.g,key,plan.gram).forEach(it=>Q.push({type:'mcq',kind:'kGram',item:it,prompt:{gram:it.q},opts:shuffle(it.opts.map((o,i)=>({label:disp(o),ok:i===0,tgt:1})))}));
  while (Q.length<EXAM_N){ const it=P.v[Math.floor(Math.random()*P.v.length)]; Q.push({type:'mcq',kind:'kMean',item:it,prompt:{word:it.t,say:it.say},opts:shuffle([it,...distract(P.v,it,x=>x.m)]).map(x=>({label:x.m,ok:x===it}))}); }
  const first=Q.slice(0,EXAM_N); const out = shuffle(first);
  Store.d.last[key]=out.map(q=>q.item.id); Store.save();
  return {qs:out, i:0, answers:[], done:false, answered:false};
}
function tokens(src){ return sayOf(src).replace(/[.,!?;:«»"—؟،؛…]/g,' ').split(/\s+/).filter(Boolean); }
function examView(lv){
  const u=ui(); const key=S.tr+':'+S.L; const ex=S.exam;
  if (!ex){ const best=Store.d.best[key]; const weakN=Object.keys(Store.weak(key)).length;
    return `<div class="exam-intro"><div class="paper"><h3>${esc(u.examTitle)} ${S.L}</h3><p class="muted">${esc(u.examInfo)}</p>
    <div class="facts"><div class="fact"><b>${EXAM_N}</b><span>${esc(u.q)}</span></div><div class="fact"><b>${PASS}%</b><span>${esc(u.passMark)}</span></div><div class="fact"><b>${best!=null?best+'%':'—'}</b><span>${esc(u.best)}</span></div></div>
    <button class="btn" data-act="examStart">${esc(u.start)}</button></div>
    <div class="paper"><h3>${esc(u.weakN)}: ${weakN}</h3>${weakN?`<div class="cards" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">${weakCards(lv)}</div>`:`<p class="muted">—</p>`}</div></div>`; }
  if (ex.done) return resultView(lv);
  const q=ex.qs[ex.i]; const pct=Math.round(ex.i/ex.qs.length*100);
  let body='';
  const promptHTML = p => { if (p.listen!=null) return `<button class="big-play" data-act="say" data-say="${esc(p.listen)}" data-tl="${lv.t}" aria-label="${esc(u.play)}">${ICON.play}</button>${playBtn(p.listen,lv.t,true)}${p.emo?`<span class="emo">${p.emo}</span>`:''}`;
    if (p.gram!=null) return `<span style="font-size:1.15rem;font-weight:500" dir="auto">${bodyHTML(esc(disp(p.gram)),lv.t).replace(/___/g,'<b>____</b>')}</span>`;
    if (p.text!=null) return `${p.emo?`<span class="emo">${p.emo}</span>`:''}<span>${esc(p.text)}</span>`;
    return `<span class="${tclass()}" dir="${tdir()}" style="${p.small?'font-size:1.25rem':''}">${esc(p.word)}</span>${playBtn(p.say,lv.t,false)}`; };
  if (q.type==='mcq'){ body = `<div class="prompt">${promptHTML(q.prompt)}</div><div class="qopts">${q.opts.map((o,i)=>`<button class="qopt${q.picked!=null?(o.ok?' right':(q.picked===i?' wrong':'')):''}" data-act="ans" data-i="${i}" ${q.picked!=null?'disabled':''} ${o.tgt?`dir="${tdir()}"`:'dir="auto"'}><span class="${o.tgt?tclass():''}">${esc(o.label)}</span></button>`).join('')}</div>`; }
  else if (q.type==='spell'){ body = `<div class="prompt">${promptHTML(q.prompt)}</div><input class="answer${isAr()?' ar':''}" id="spellIn" dir="${tdir()}" autocomplete="off" autocapitalize="off" spellcheck="false" ${q.given!=null?'disabled':''} value="${esc(q.given||'')}"><div class="row-btns" style="margin-top:10px">${q.given==null?`<button class="btn" data-act="spellCheck">${esc(u.check)}</button><button class="btn ghost sm" data-act="kb">${esc(u.showKb)}</button>`:''}</div>${q.given!=null?`<div class="feedback ${q.ok?'ok':'bad'}" style="margin-top:10px">${q.ok?esc(u.correct):esc(u.wrongIs)+' <span class="'+tclass()+'">'+esc(q.item.t)+'</span>'}</div>`:''}${S.kb&&q.given==null?kbHTML():''}`; }
  else if (q.type==='order'){ const used=new Set(q.chosen); body = `<div class="muted" style="margin-bottom:8px">${esc(q.item.m)}</div><div class="order-slot" dir="${tdir()}">${q.chosen.map((pi,k)=>`<button class="wchip ${tclass()}" data-act="unchoose" data-k="${k}" ${q.result!=null?'disabled':''}>${esc(q.pool[pi].w)}</button>`).join('')}</div><div class="order-pool" dir="${tdir()}">${q.pool.map((p,pi)=>used.has(pi)?'':`<button class="wchip ${tclass()}" data-act="choose" data-p="${pi}" ${q.result!=null?'disabled':''}>${esc(p.w)}</button>`).join('')}</div>
    <div class="row-btns" style="margin-top:10px">${q.result==null?`<button class="btn" data-act="orderCheck" ${q.chosen.length!==q.pool.length?'disabled':''}>${esc(u.check)}</button><button class="btn ghost sm" data-act="orderReset">${esc(u.orderReset)}</button>`:''}</div>${q.result!=null?`<div class="feedback ${q.result?'ok':'bad'}" style="margin-top:10px">${q.result?esc(u.correct):esc(u.wrongIs)+' <span class="'+tclass()+'">'+esc(q.item.t)+'</span>'}</div>`:''}`; }
  const answered = q.picked!=null || q.given!=null || q.result!=null;
  return `<div class="qbox"><div class="qprog"><span>${ex.i+1}/${ex.qs.length}</span><span class="bar"><i style="width:${pct}%"></i></span></div><div class="qcard"><div class="kind">${esc(u[q.kind])}</div>${body}
  <div class="qfoot"><span></span>${answered?`<button class="btn" data-act="examNext">${esc(ex.i+1<ex.qs.length?u.next:u.done)}</button>`:''}</div></div></div>`;
}
function weakCards(lv){ const weak=Store.weak(S.tr+':'+S.L); const all=[...lv.vocab, ...lv.sentences, ...(lv.alphabet||[])];
  return all.filter(x=>weak[x.id]).slice(0,24).map(x=>`<div class="card"><div class="w ${tclass()}" dir="${tdir()}" style="font-size:1.05rem">${esc(x.t||x.letter)}</div><div class="m small">${esc(x.m||x.name)}</div><div class="acts">${playBtn(x.say||x.nameSay,lv.t,false)}${playBtn(x.say||x.nameSay,lv.t,true)}</div></div>`).join(''); }
function resultView(lv){
  const u=ui(), ex=S.exam; const right=ex.qs.filter(q=>q.correct).length; const pct=Math.round(right/ex.qs.length*100); const pass=pct>=PASS; const i=LEVELS.indexOf(S.L);
  const mistakes = ex.qs.filter(q=>!q.correct);
  const ansText = q => q.type==='mcq' ? (q.opts[q.picked]||{}).label : q.type==='spell' ? q.given : q.chosen.map(pi=>q.pool[pi].w).join(' ');
  const corrText = q => q.type==='mcq' ? q.opts.find(o=>o.ok).label : q.item.t;
  const say = q => q.item.say || q.item.nameSay || '';
  return `<div class="qbox"><div class="paper" style="text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center"><div class="score ${pass?'pass':'fail'}">${pct}%</div><span class="stamp" style="color:${pass?'var(--green)':'var(--red)'}">${pass?'PASS · '+S.L:'RETRY · '+S.L}</span><p style="margin:0;max-width:48ch">${esc(pass?u.passedMsg:u.failedMsg)}</p>
  <div class="row-btns" style="justify-content:center">${pass&&i<5?`<button class="btn" data-act="nav" data-h="${S.tr}-${LEVELS[i+1].toLowerCase()}">${esc(u.nextLevel)} ${LEVELS[i+1]}</button>`:''}<button class="btn ${pass?'ghost':''}" data-act="examStart">${esc(u.startNew)}</button><button class="btn ghost" data-act="nav" data-h="${S.tr}">${esc(u.backLevels)}</button></div></div>
  <div class="paper" style="margin-top:14px"><h3>${esc(u.review)} · ${mistakes.length}</h3>${mistakes.length?mistakes.map(q=>`<div class="mist">${say(q)?playBtn(say(q),lv.t,false):'<span></span>'}<div><div class="small muted">${esc(u[q.kind])}${q.item.m?' · '+esc(q.item.m):''}</div><div><span class="yours">${esc(ansText(q)||'—')}</span></div><div class="corr ${q.type!=='mcq'||q.opts.find(o=>o.ok).tgt?tclass():''}" dir="auto">${esc(corrText(q))}</div></div></div>`).join(''):`<p class="muted">${esc(u.noMist)}</p>`}</div></div>`;
}
function markAnswer(q, ok){
  const key=S.tr+':'+S.L; const weak=Store.weak(key); q.correct=ok; const id=q.item.id;
  if (ok){ if (weak[id]){ weak[id]--; if(weak[id]<=0) delete weak[id]; } } else weak[id]=(weak[id]||0)+2;
  Store.save();
}
function finishExam(){
  const ex=S.exam; ex.done=true; const key=S.tr+':'+S.L; const right=ex.qs.filter(q=>q.correct).length; const pct=Math.round(right/ex.qs.length*100);
  Store.d.best[key]=Math.max(Store.d.best[key]||0,pct);
  if (pct>=PASS){ (Store.d.passed[S.tr]||(Store.d.passed[S.tr]={}))[S.L]=true; S.lockedView=false; }
  Store.save();
}
function checkTyped(given, item){ const tl=TRACKS[S.tr].t; let a=norm(given,tl), b=norm(item.say,tl); if (tl==='ar'){ a=a.replace(/ة/g,'ه'); b=b.replace(/ة/g,'ه'); } return a===b; }

/* ---------- sheets ---------- */
function closeSheet(){ const s=$('#sheet'); if(s) s.remove(); S.audioOpen=false; }
function openSheet(html){ closeSheet(); const d=document.createElement('div'); d.id='sheet'; d.innerHTML=`<div class="sheet-back" data-act="closeSheet"></div><div class="sheet" role="dialog" aria-modal="true" dir="${ui().dir}"><div class="grip"></div>${html}</div>`; document.body.appendChild(d); }
function renderAudioSheet(){
  const u=ui(), tl=TRACKS[S.tr].t, st=Store.d.settings; const vs=Speech.list(tl); const curSel = st.voice[tl]||(tl==='ar'?'auto':'lisan');
  const opts = (tl==='ar'?`<option value="auto" ${curSel==='auto'?'selected':''}>${esc(u.autoVoice)}</option>`:'') + `<option value="lisan" ${curSel==='lisan'?'selected':''}>${esc(u.lisanVoice)}</option>` + vs.map(v=>`<option value="${esc(v.voiceURI)}" ${curSel===v.voiceURI?'selected':''}>${esc(u.deviceVoice)}: ${esc(v.name)} (${esc(v.lang)})</option>`).join('');
  openSheet(`<div class="stack"><h3>${esc(u.audio)}</h3>
  <label>${esc(u.voice)}<select id="voiceSel">${opts}</select></label>
  <label>${esc(u.speed)}<span class="rng"><input type="range" id="rate" min="0.5" max="1.5" step="0.05" value="${st.rate||1}"><output id="rateO">${(+(st.rate||1)).toFixed(2)}×</output></span></label>
  <label>${esc(u.volume)}<span class="rng"><input type="range" id="vol" min="0" max="1" step="0.05" value="${st.volume==null?1:st.volume}"><output id="volO">${Math.round((st.volume==null?1:st.volume)*100)}%</output></span></label>
  <div class="row-btns"><button class="btn" data-act="testVoice">${ICON.play} ${esc(u.test)}</button><button class="btn ghost" data-act="closeSheet">${esc(u.close)}</button></div><p class="small muted" style="margin:0">${esc(u.audioNote)}</p></div>`);
  S.audioOpen=true; const r=$('#rate'), p=$('#vol'), vsel=$('#voiceSel');
  r.oninput=()=>{ st.rate=+r.value; $('#rateO').textContent=(+r.value).toFixed(2)+'×'; Store.save(); };
  p.oninput=()=>{ st.volume=+p.value; $('#volO').textContent=Math.round(p.value*100)+'%'; Store.save(); };
  vsel.onchange=()=>{ st.voice[tl]=vsel.value; Store.save(); };
}
function wordSheet(raw, ctx){
  const tr=TRACKS[S.tr], tl=tr.t, u=ui(); const k=norm(raw,tl); const lv=level(S.tr,S.L);
  let m=null, pr='';
  if (S.tab==='read'){ const r=lv.readings[S.reading]; if (r) m = r.gloss[k]; }
  const D=dict(S.tr); let v=D[k];
  if (!m && v) m=v.m;
  if (!m){ const G=(GL[tl]||{})[k]; if (G) m = Array.isArray(G) ? (tr.n==='ar'?G[0]:G[1]) : G; }
  if (!m && !v && tl==='ar'){ for (const p of ['و','ف','ب','ل','ال','وال','بال','لل','فال']){ const r=k.slice(p.length); if (k.startsWith(p) && (D[r]||(GL.ar||{})[r])){ v=D[r]; m=(v&&v.m)||GL.ar[r]; break; } } }
  if (!m){ const C=common(S.tr); m = C[k]; if(!m && tl==='ar'){ for (const p of ['و','ف','ب','ل','ال','وال','بال']) if (k.startsWith(p)&&C[k.slice(p.length)]){ m=C[k.slice(p.length)]; break; } } if(!m && tl==='en' && k.endsWith('s')) m=C[k.slice(0,-1)]||(D[k.slice(0,-1)]||{}).m; }
  pr = pronOf(raw,tl);
  let ctxM=''; if (!m && ctx!=null){ if (S.tab==='read'){ const r=lv.readings[S.reading]; ctxM=r&&r.sents[+ctx]?r.sents[+ctx].m:''; } else ctxM=ctx; }
  const say=sayOf(raw);
  openSheet(`<div class="stack"><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="wbig${tl==='ar'?' ar':''}" dir="${tdir()}">${v&&v.e?`<span aria-hidden="true">${v.e}</span> `:''}${esc(disp(raw))}</span><span style="flex:1"></span>${playBtn(say,tl,false)}${playBtn(say,tl,true)}</div>
  ${pr?`<div><div class="small muted">${esc(u.pron)}</div><div style="color:var(--teal);font-size:1.1rem" dir="auto">${esc(pr)}</div></div>`:''}
  <div><div class="small muted">${esc(u.meaning)}</div><div style="font-size:1.15rem">${m?esc(m):`<span class="muted">${esc(u.notFound)}</span><br>${esc(ctxM)}`}</div></div>
  <button class="btn ghost" data-act="closeSheet">${esc(u.close)}</button></div>`);
  Speech.say(say, tl);
}
function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200); }

/* unlock the audio element during the first user gesture (iOS/Safari autoplay rules) */
let audioPrimed=false;
document.addEventListener('pointerdown', ()=>{ if(audioPrimed) return; audioPrimed=true; try{ audioEl.src='data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAABAAAAlgAenp6enp6enp6enp6enp6enp6enp6enp6pqampqampqampqampqampqampqampqamptPT09PT09PT09PT09PT09PT09PT09PT09P/////////////////////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQCcQAAAAAAAAJY+/rsqgAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'; const p=audioEl.play(); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }, {capture:true, once:true});
/* ---------- events ---------- */
let activeInput=null;
document.addEventListener('focusin', e=>{ if (e.target.matches('input.answer')) activeInput=e.target; });
document.addEventListener('keydown', e=>{ if (e.key==='Escape') closeSheet(); if (e.key==='Enter' && e.target.matches('input.answer')){ const id=e.target.id; const b={dictIn:'dictCheck',copyIn:'copyCheck',spellIn:'spellCheck'}[id]; if(b){ const btn=$(`[data-act="${b}"]`); btn&&btn.click(); } } });
document.addEventListener('change', e=>{ if (e.target.id==='role'){ S.role=e.target.checked; Speech.stop(); render(); } });
document.addEventListener('click', async e=>{
  const el=e.target.closest('[data-act]'); if(!el) return; const act=el.dataset.act; const lv = S.L && S.tr ? level(S.tr,S.L) : null; const u=ui();
  switch(act){
    case 'nav': closeSheet(); go(el.dataset.h); break;
    case 'tab': if (el.disabled) return; S.tab=el.dataset.tab; Speech.stop(); setHash(`${S.tr}-${S.L.toLowerCase()}-${S.tab}`); render(); window.scrollTo({top:0}); break;
    case 'say': { const slow=!!el.dataset.slow; Speech.stop(); const cid=Speech.chainId; el.classList.add('speaking'); await Speech.speak(el.dataset.say, el.dataset.tl, {slow, alt:!!el.dataset.alt}); if (cid===Speech.chainId) el.classList.remove('speaking'); else el.classList.remove('speaking'); break; }
    case 'word': wordSheet(el.dataset.w, el.dataset.ctx); break;
    case 'audio': renderAudioSheet(); break;
    case 'closeSheet': closeSheet(); break;
    case 'testVoice': { const tl=TRACKS[S.tr].t; const lv0=level(S.tr,S.L); const sample=(lv0.sentences[0]||{}).say; Speech.say(sample, tl); break; }
    case 'letter': S.letter=+el.dataset.i; render(); { const a=lv.alphabet[S.letter]; Speech.say(a.nameSay, lv.t); } break;
    case 'theme': S.theme=+el.dataset.i; render(); break;
    case 'vmode': S.vmode=el.dataset.m; S.flashQ=null; render(); break;
    case 'flip': S.flashFlip=true; render(); break;
    case 'flashAns': { const id=S.flashQ.list[S.flashI]; const weak=Store.weak(S.tr+':'+S.L); if (el.dataset.ok==='0') weak[id]=(weak[id]||0)+1; else if (weak[id]){ weak[id]--; if(weak[id]<=0) delete weak[id]; } Store.save(); S.flashI++; S.flashFlip=false; render(); const nid=S.flashQ.list[S.flashI]; const nv=lv.vocab.find(x=>x.id===nid); if(nv) Speech.say(nv.say, lv.t); break; }
    case 'flashAgain': S.flashQ=null; render(); break;
    case 'gram': { const i=+el.dataset.i; S.gramOpen = S.gramOpen===i?-1:i; render(); break; }
    case 'miniq': { const box=el.closest('.mini-q'); box.querySelectorAll('.opt').forEach(b=>{ b.disabled=true; if(b.dataset.ok==='1') b.classList.add('right'); }); if (el.dataset.ok!=='1') el.classList.add('wrong'); break; }
    case 'readingSel': S.reading=+el.dataset.i; Speech.stop(); render(); break;
    case 'dialogSel': S.dialog=+el.dataset.i; Speech.stop(); render(); break;
    case 'toggleTr': S.showTr=!S.showTr; render(); break;
    case 'playList': {
      const slow=!!el.dataset.slow;
      if (el.dataset.src==='phrases'){ const rows=[...document.querySelectorAll('.li')]; await Speech.chain(lv.sentences.map(s=>({say:s.say,o:{slow},pause:600})), lv.t, (i,on)=>{ rows.forEach(r=>r.classList.remove('playing')); if(on&&rows[i]){ rows[i].classList.add('playing'); rows[i].scrollIntoView({block:'nearest',behavior:'smooth'}); } }); rows.forEach(r=>r.classList.remove('playing')); }
      else { const r=lv.readings[S.reading]; const ss=[...document.querySelectorAll('.sent')]; await Speech.chain(r.sents.map(s=>({say:s.say,o:{slow},pause:450})), lv.t, (i,on)=>{ ss.forEach(x=>x.classList.remove('playing')); if(on&&ss[i]) ss[i].classList.add('playing'); }); ss.forEach(x=>x.classList.remove('playing')); }
      break; }
    case 'playDialog': await playDialog(lv, !!el.dataset.slow); break;
    case 'turnNext': if (turnResolve){ const f=turnResolve; turnResolve=null; f(); } break;
    case 'wmode': S.wmode=el.dataset.m; S.kb=false; render(); break;
    case 'tfont': S.traceFont=el.dataset.f; render(); break;
    case 'trace': { const n=writeItems(lv).length; S.traceIdx=(S.traceIdx+(+el.dataset.d)+n)%n; render(); const it=writeItems(lv)[S.traceIdx]; Speech.say(it.say, lv.t); break; }
    case 'traceClear': traceState&&traceState.clear(); break;
    case 'kb': S.kb=!S.kb; { const keep=(activeInput||{}).value; const id=(activeInput||{}).id; render(); if(id&&$('#'+id)){ $('#'+id).value=keep||''; $('#'+id).focus(); } } break;
    case 'key': { const inp = activeInput && document.body.contains(activeInput) ? activeInput : $('input.answer'); if(!inp||inp.disabled) return; const k=el.dataset.k; if (k==='BS') inp.value=[...inp.value].slice(0,-1).join(''); else inp.value+=k; activeInput=inp; break; }
    case 'dictCheck': { const items=dictItems(lv); const it=items[S.dictIdx%items.length]; const v=$('#dictIn').value; const ok=checkTyped(v,it); $('#dictFb').innerHTML=`<div class="feedback ${ok?'ok':'bad'}">${ok?esc(u.correct):esc(u.wrongIs)+` <span class="${tclass()}" dir="${tdir()}">${esc(it.t)}</span> — ${esc(it.m)}`}</div>`; if(!ok){ const w=Store.weak(S.tr+':'+S.L); w[it.id]=(w[it.id]||0)+1; Store.save(); } break; }
    case 'dictNext': S.dictIdx++; render(); { const items=dictItems(lv); Speech.say(items[S.dictIdx%items.length].say, lv.t); } break;
    case 'copyCheck': { const it=lv.sentences[S.copyIdx%lv.sentences.length]; const v=$('#copyIn').value; const tl=lv.t; const a=norm(v,tl), b=norm(it.say,tl); const ok=a===b;
      let diff=''; if(!ok){ const A=[...b], G=[...a]; diff = A.map((c,i)=>G[i]===c?esc(c):`<span class="x">${esc(c)}</span>`).join(''); }
      $('#copyFb').innerHTML=`<div class="feedback ${ok?'ok':'bad'}">${ok?esc(u.correct):esc(u.wrongIs)+` <span class="diff ${tclass()}" dir="${tdir()}">${diff}</span>`}</div>`; break; }
    case 'copyNext': S.copyIdx++; render(); break;
    case 'examStart': S.exam=buildExam(lv); S.kb=false; render(); autoPlayQ(); window.scrollTo({top:0}); break;
    case 'ans': { const q=S.exam.qs[S.exam.i]; if(q.picked!=null) return; q.picked=+el.dataset.i; markAnswer(q, q.opts[q.picked].ok); render(); break; }
    case 'spellCheck': { const q=S.exam.qs[S.exam.i]; const v=$('#spellIn').value; if(!v.trim()) return; q.given=v; markAnswer(q, checkTyped(v,q.item)); render(); break; }
    case 'choose': { const q=S.exam.qs[S.exam.i]; q.chosen.push(+el.dataset.p); render(); break; }
    case 'unchoose': { const q=S.exam.qs[S.exam.i]; q.chosen.splice(+el.dataset.k,1); render(); break; }
    case 'orderReset': { const q=S.exam.qs[S.exam.i]; q.chosen=[]; render(); break; }
    case 'orderCheck': { const q=S.exam.qs[S.exam.i]; const got=q.chosen.map(pi=>q.pool[pi].w).join(' '); const ok = norm(got,lv.t)===norm(q.words.join(' '),lv.t); q.result=ok; markAnswer(q,ok); render(); Speech.say(q.item.say, lv.t); break; }
    case 'examNext': S.exam.i++; S.kb=false; if (S.exam.i>=S.exam.qs.length) finishExam(); render(); autoPlayQ(); window.scrollTo({top:0}); break;
    case 'reset': if (el.dataset.confirm){ delete Store.d.passed[S.tr]; LEVELS.forEach(L=>{ delete Store.d.best[S.tr+':'+L]; delete Store.d.weak[S.tr+':'+L]; delete Store.d.last[S.tr+':'+L]; }); Store.save(); render(); } else { el.dataset.confirm='1'; el.textContent = u.reset+' ?  ✓'; el.classList.remove('ghost'); } break;
  }
});
function autoPlayQ(){ const ex=S.exam; if(!ex||ex.done) return; const q=ex.qs[ex.i]; const lv=level(S.tr,S.L); if (q.prompt&&q.prompt.listen) setTimeout(()=>Speech.say(q.prompt.listen, lv.t),250); }
let turnResolve=null;
async function playDialog(lv, slow){
  const d=lv.dialogues[S.dialog]; Speech.stop(); const id=Speech.chainId;
  const rows=[...document.querySelectorAll('.bubble-row')]; const yt=$('#yourturn');
  for (let i=0;i<d.lines.length;i++){
    if (id!==Speech.chainId) break; const l=d.lines[i]; const row=rows[i]; const bub=row&&row.querySelector('.bubble'); const av=$('#av-'+l.who);
    rows.forEach(r=>r.querySelector('.bubble').classList.remove('active')); bub&&bub.classList.add('active'); row&&row.scrollIntoView({block:'nearest',behavior:'smooth'});
    if (S.role && l.who==='B'){ yt.hidden=false; await new Promise(r=>{ turnResolve=r; }); yt.hidden=true; if (id!==Speech.chainId) break; bub&&bub.classList.remove('hidden-line'); }
    av&&av.classList.add('talking'); await Speech.speak(l.say, lv.t, {slow, alt:l.who==='B'}); av&&av.classList.remove('talking');
    await new Promise(r=>setTimeout(r,500));
  }
  rows.forEach(r=>r.querySelector('.bubble').classList.remove('active'));
}
function afterRender(){ if (S.view==='level' && S.tab==='write' && S.wmode==='trace') requestAnimationFrame(setupTrace); }
window.addEventListener('resize', ()=>{ if (S.view==='level' && S.tab==='write' && S.wmode==='trace') setupTrace(); });
window.addEventListener('hashchange', route);

Store.load(); Speech.init(); route();
window.__lisan = {S, Speech, audio:audioEl, norm, tokens, checkTyped:(v,it,tr)=>{ const o=S.tr; S.tr=tr; const r=checkTyped(v,it); S.tr=o; return r; }, Packs, level, buildExam:(tr,L)=>{ const o=S.tr,p=S.L; S.tr=tr; S.L=L; const e=buildExam(level(tr,L)); S.tr=o; S.L=p; return e; }, dict};
})();
