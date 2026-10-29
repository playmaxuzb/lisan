/* Transliteration helpers: Russian → Arabic script, Arabic (vowelized) → Cyrillic */
const RU_VOW = 'аеёиоуыэюя';
const RU_EXC = {
 'что':'شتو','чтобы':'شتوبي','конечно':'كانيشنا','скучно':'سكوشنا','сегодня':'سيڤودنيا',
 'здравствуйте':'زدراستڤويتي','солнце':'سونتسي','сердце':'سيرتسي','его':'يِڤو','него':'نيڤو',
 'всего':'ڤسيڤو','ничего':'نيتشيڤو','чего':'تشيڤو','много':'منوگا','бог':'بوخ','лёгкий':'ليوخكي',
 'счёт':'شّوت','счастье':'شّاستيا','мне':'منيه','что-нибудь':'شتو-نيبود'
};
const RU_CONS = {б:'ب',в:'ڤ',г:'گ',д:'د',ж:'ج',з:'ز',й:'ي',к:'ك',л:'ل',м:'م',н:'ن',п:'پ',р:'ر',с:'س',т:'ت',ф:'ف',х:'خ',ц:'تس',ч:'تش',ш:'ش',щ:'شّ',ъ:'',ь:''};
const RU_DEVOICE = {б:'п',в:'ф',г:'к',д:'т',ж:'ш',з:'с'};
function ruWordToAr(w){
  let plain = w.replace(/\+/g,'').toLowerCase();
  if (RU_EXC[plain]) return RU_EXC[plain];
  let s = w.toLowerCase();
  s = s.replace(/ться$/,'ца').replace(/тся$/,'ца');
  // letters with stress index
  const letters = []; let stressAt = -1;
  for (let i=0;i<s.length;i++){ const c=s[i]; if(c==='+'){ stressAt = letters.length; continue;} letters.push(c); }
  const vowelIdx = letters.map((c,i)=>RU_VOW.includes(c)?i:-1).filter(i=>i>=0);
  if (stressAt<0){ const yo = letters.indexOf('ё'); if (yo>=0) stressAt=yo; else if (vowelIdx.length===1) stressAt=vowelIdx[0]; }
  const knownStress = stressAt>=0;
  // final devoicing
  let last = letters.length-1; while(last>=0 && (letters[last]==='ь'||letters[last]==='ъ'||letters[last]==='-')) last--;
  const word = letters.join('');
  const gToV = /(ого|его)$/.test(word) && word.length>3 && !/(много|строго|дорого|убого)$/.test(word);
  let out = '';
  for (let i=0;i<letters.length;i++){
    let c = letters[i]; const prev = i>0?letters[i-1]:'';
    if (c==='-'){ out+='-'; continue; }
    const initial = i===0 || prev==='-' || RU_VOW.includes(prev) || prev==='ъ' || prev==='ь';
    const stressed = i===stressAt;
    if (RU_VOW.includes(c)){
      const hard = 'жшцчщ'.includes(prev);
      switch(c){
        case 'а': out += (i===0||prev==='-')?'ا':'ا'; break;
        case 'о': if (stressed||!knownStress) out += (i===0||prev==='-')?'أو':'و'; else out += 'ا'; break;
        case 'у': out += (i===0||prev==='-')?'أو':'و'; break;
        case 'ы': out += 'ي'; break;
        case 'и': out += (i===0||prev==='-')?'إي':'ي'; break;
        case 'э': out += (i===0||prev==='-')?'إي':'ي'; break;
        case 'е': out += initial?'يِ':'ي'; break;
        case 'ё': out += (initial)?'يو':(hard?'و':'يو'); break;
        case 'ю': out += 'يو'; break;
        case 'я': if (initial || stressed || i===letters.length-1 || !knownStress) out += 'يا'; else out += 'ي'; break;
      }
    } else {
      if (c==='г' && gToV && i===letters.length-2) { out+='ڤ'; continue; }
      if (i===last && RU_DEVOICE[c]) c = RU_DEVOICE[c];
      out += RU_CONS[c] !== undefined ? RU_CONS[c] : c;
    }
  }
  return out.replace(/يي/g,'ي').replace(/اا/g,'ا').replace(/وو/g,'و');
}
function ruToAr(src){
  return src.split(/([^а-яё+\-]+)/i).map(tok=>{
    if (!/[а-яё]/i.test(tok)) return tok.replace(/,/g,'،').replace(/\?/g,'؟').replace(/;/g,'؛').replace(/[«»"]/g,'');
    return ruWordToAr(tok);
  }).join('');
}

/* Arabic → Cyrillic (scholarly-practical: ҳ ح, х خ, һ ه, қ ق, ғ غ, ʿ ع, ʾ ء, dot below = emphatic) */
const AR_C = {'ب':'б','ت':'т','ث':'с̱','ج':'дж','ح':'ҳ','خ':'х','د':'д','ذ':'з̱','ر':'р','ز':'з','س':'с','ش':'ш','ص':'с̣','ض':'д̣','ط':'т̣','ظ':'з̣','ع':'ʿ','غ':'ғ','ف':'ф','ق':'қ','ك':'к','ل':'л','م':'м','ن':'н','ه':'һ','و':'в','ي':'й','ء':'ʾ','أ':'ʾ','إ':'ʾ','ؤ':'ʾ','ئ':'ʾ','ة':'т'};
const AR_SUN = 'تثدذرزسشصضطظلن';
const AR_V = {'َ':'а','ِ':'и','ُ':'у','ً':'ан','ٍ':'ин','ٌ':'ун'};
const AR_EXC = {'الله':'Алла̄һ','اللَّهِ':'Алла̄һи','لِلَّهِ':'лилла̄һи','اللَّهُ':'Алла̄һу','اللَّهَ':'Алла̄һа','هَذَا':'ха̄за̄','هَذِهِ':'ха̄зиһи','ذَلِكَ':'за̄лика','لَكِنْ':'ла̄кин','لَكِنَّ':'ла̄кинна'};
function arUnits(w){
  const u=[]; for (const ch of w){ if (/[ً-ْٰ]/.test(ch)){ if(u.length) u[u.length-1].m+=ch; } else if (ch!=='ـ') u.push({c:ch,m:''}); }
  return u;
}
function arWordToRu(w, wi){
  if (AR_EXC[w]) return AR_EXC[w];
  const u = arUnits(w); let out=''; let i=0; let skipShadda=false;
  // prefixes (و ف ب ل ك with a vowel) followed by ال
  const pre = (k)=> u[k] && 'وفبلك'.includes(u[k].c) && /[َِ]/.test(u[k].m) && !/ْ/.test(u[k].m);
  const isAl = (k)=> u[k] && u[k].c==='ا' && !/[َُِ]/.test(u[k].m) && u[k+1] && u[k+1].c==='ل' && u[k+2];
  let start=0;
  if (pre(0) && isAl(1)){ out += AR_C[u[0].c] + (u[0].m.includes('َ')?'а':'и'); start=1; }
  if (isAl(start)){
    const nx = u[start+2];
    if (AR_SUN.includes(nx.c) && (nx.m.includes('ّ') || !u[start+1].m.includes('ْ'))){
      out += (start? '' : 'а') + AR_C[nx.c] + '-'; skipShadda = true;
    } else out += (start? 'ль-' : 'аль-');
    i = start+2;
  } else if (start===0 && u[0] && u[0].c==='ل' && /\u0650/.test(u[0].m) && u[1] && u[1].c==='ل' && u[2] && !/[\u064E\u0650\u064F]/.test(u[1].m)){
    if (AR_SUN.includes(u[2].c) && u[2].m.includes('\u0651')) { out += 'ли' + AR_C[u[2].c] + '-'; skipShadda=true; } else out += 'лиль-'; i=2;
  } else i = start;
  for (; i<u.length; i++){
    const {c,m} = u[i]; const next=u[i+1];
    let cons='';
    if (c==='ا' && i===u.length-1 && u[i-1] && u[i-1].c==='و') continue;
    if (c==='ا'){
      if (/[َُِ]/.test(m)) { out += (i===0 ? '' : 'ʾ') + AR_V[m.match(/[َُِ]/)[0]]; continue; }
      if (i===0 && !m){ if (wi>0) continue; out+='и'; continue; }
      if (/а$/.test(out)) { out += '̄'; continue; }
      if (/ан$/.test(out)) continue;
      out += 'а̄'; continue;
    }
    if (c==='آ'){ out += (i===0||/-$/.test(out)?'':'ʾ') + 'а\u0304'; continue; }
    if (c==='ى'){ if (m.includes('ً')) { out+='ан'; continue; } if (/а$/.test(out)) out+='̄'; else out+='а̄'; continue; }
    if ((c==='و'||c==='ي') && !m && i>0){
      if (c==='و' && /у$/.test(out)) { out = out.slice(0,-1)+'ӯ'; continue; }
      if (c==='ي' && /и$/.test(out)) { out = out.slice(0,-1)+'ӣ'; continue; }
      if (c==='و' && i===u.length-1 && u[i-1] && u[i-1].c!=='ا') { out+='ӯ'; continue; }
    }
    if (c==='ة'){
      if (/[\u064B-\u0650]/.test(m)) { const v=m.match(/[\u064B-\u0650]/); out += 'т' + (v?AR_V[v[0]]:''); }
      continue;
    }
    if ((c==='أ'||c==='إ') && i===0) cons=''; else cons = AR_C[c] !== undefined ? AR_C[c] : '';
    if (c==='ء' && i===0) cons='';
    if (m.includes('ّ') && !skipShadda) cons = cons+cons;
    if (skipShadda) skipShadda=false;
    out += cons;
    if (c==='إ' && !/ِ/.test(m)) out += 'и';
    const vm = m.match(/[ً-ِ]/);
    if (vm) { if (vm[0]==='\u064B' && next && (next.c==='ا'||next.c==='ى')) { out+='ан'; i++; } else out += AR_V[vm[0]]; }
    if (m.includes('ٰ')) out += 'а̄';
  }
  return out;
}
function arToRu(src){
  let wi=0;
  return src.split(/([\s،؟!.,?:؛«»\-—]+)/).map(tok=>{
    if (!/[ء-ي]/.test(tok)) return tok.replace(/،/g,',').replace(/؟/g,'?').replace(/؛/g,';');
    return arWordToRu(tok, wi++);
  }).join('');
}
if (typeof module!=='undefined') module.exports={ruToAr,arToRu};
