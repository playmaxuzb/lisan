// Sentences that name the target language, for all twelve languages and all twelve targets.
// STARX[lang][kind][target]; kinds: S (how do you say "book"), RT (reading title), RL1, RL2 (reading lines).
(function(){
const T=['ar','ru','en','uz','es','zh','de','fr','it','tr','ja','ko'];
const build=(f)=>{ const o={S:{},RT:{},RL1:{},RL2:{}}; T.forEach(t=>{ const r=f(t); if(!r) return; o.S[t]=r[0]; o.RT[t]=r[1]; o.RL1[t]=r[2]; o.RL2[t]=r[3]; }); return o; };
// existing six languages: only the six new targets
const ARN={de:['الأَلْمَانِيَّةِ','الأَلْمَانِيَّةَ','الأَلْمَانُ'],fr:['الفَرَنْسِيَّةِ','الفَرَنْسِيَّةَ','الفَرَنْسِيُّونَ'],it:['الإِيطَالِيَّةِ','الإِيطَالِيَّةَ','الإِيطَالِيُّونَ'],tr:['التُّرْكِيَّةِ','التُّرْكِيَّةَ','الأَتْرَاكُ'],ja:['اليَابَانِيَّةِ','اليَابَانِيَّةَ','اليَابَانِيُّونَ'],ko:['الكُورِيَّةِ','الكُورِيَّةَ','الكُورِيُّونَ']};
STARX.ar=build(t=>{ const n=ARN[t]; if(!n) return null; return ['كَيْفَ نَقُولُ «كِتَابٌ» بِ'+n[0]+'؟','كَيْفَ أَتَعَلَّمُ '+n[1],'أَتَعَلَّمُ اللُّغَةَ '+n[1]+' مُنْذُ سَنَةٍ.','سَاعَدَنِي أَصْدِقَائِي '+n[2]+' كَثِيرًا.']; });
const RUN={de:['нем+ецки','нем+ецкий','нем+ецкие'],fr:['франц+узски','франц+узский','франц+узские'],it:['италь+янски','италь+янский','италь+янские'],tr:['тур+ецки','тур+ецкий','тур+ецкие'],ja:['яп+онски','яп+онский','яп+онские'],ko:['кор+ейски','кор+ейский','кор+ейские']};
STARX.ru=build(t=>{ const n=RUN[t]; if(!n) return null; return ['Как по-'+n[0]+' «кн+ига»?','Как я уч+у '+n[1],'Я уч+у '+n[1]+' яз+ык уж+е год.','Мне +очень помогл+и мо+и '+n[2]+' друзь+я.']; });
const ENN={de:['German','German'],fr:['French','French'],it:['Italian','Italian'],tr:['Turkish','Turkish'],ja:['Japanese','Japanese'],ko:['Korean','Korean']};
STARX.en=build(t=>{ const n=ENN[t]; if(!n) return null; return ['How do you say "book" in '+n[0]+'?','How I Learn '+n[0],'I have been learning '+n[0]+' for a year already.','My '+n[1]+' friends helped me a lot.']; });
const UZN={de:['Nemischa','nemis'],fr:['Fransuzcha','fransuz'],it:['Italyancha','italyan'],tr:['Turkcha','turk'],ja:['Yaponcha','yapon'],ko:['Koreyscha','koreys']};
STARX.uz=build(t=>{ const n=UZN[t]; if(!n) return null; const cap=n[1].charAt(0).toUpperCase()+n[1].slice(1); return [n[0]+' «kitob» qanday boʻladi?','Men '+n[1]+' tilini qanday oʻrganyapman','Men '+n[1]+' tilini bir yildan beri oʻrganyapman.',cap+' doʻstlarim menga juda koʻp yordam berishdi.']; });
const ESN={de:['alemán','alemanes'],fr:['francés','franceses'],it:['italiano','italianos'],tr:['turco','turcos'],ja:['japonés','japoneses'],ko:['coreano','coreanos']};
STARX.es=build(t=>{ const n=ESN[t]; if(!n) return null; return ['¿Cómo se dice «libro» en '+n[0]+'?','Cómo aprendo '+n[0],'Llevo un año aprendiendo '+n[0]+'.','Mis amigos '+n[1]+' me ayudaron mucho.']; });
const ZHN={de:['德语','德国'],fr:['法语','法国'],it:['意大利语','意大利'],tr:['土耳其语','土耳其'],ja:['日语','日本'],ko:['韩语','韩国']};
STARX.zh=build(t=>{ const n=ZHN[t]; if(!n) return null; return ['“ 书 ” 用 '+n[0]+' 怎么 说 ？','我 是 怎么 学 '+n[0]+' 的','我 学 '+n[0]+' 已经 一 年 了 。','我 的 '+n[1]+' 朋友 帮 了 我 很 多 。']; });
// new languages: all twelve targets
const DEN={ar:['Arabisch','arabischen'],ru:['Russisch','russischen'],en:['Englisch','englischen'],uz:['Usbekisch','usbekischen'],es:['Spanisch','spanischen'],zh:['Chinesisch','chinesischen'],de:['Deutsch','deutschen'],fr:['Französisch','französischen'],it:['Italienisch','italienischen'],tr:['Türkisch','türkischen'],ja:['Japanisch','japanischen'],ko:['Koreanisch','koreanischen']};
STARX.de=build(t=>{ const n=DEN[t]; return ['Was heißt „Buch“ auf '+n[0]+'?','Wie ich '+n[0]+' lerne','Ich lerne schon seit einem Jahr '+n[0]+'.','Meine '+n[1]+' Freunde haben mir sehr geholfen.']; });
const FRN={ar:['arabe','arabes'],ru:['russe','russes'],en:['anglais','anglais'],uz:['ouzbek','ouzbeks'],es:['espagnol','espagnols'],zh:['chinois','chinois'],de:['allemand','allemands'],fr:['français','français'],it:['italien','italiens'],tr:['turc','turcs'],ja:['japonais','japonais'],ko:['coréen','coréens']};
const fv=s=>/^[aeiouéèh]/i.test(s);
STARX.fr=build(t=>{ const n=FRN[t]; return ['Comment dit-on « livre » en '+n[0]+' ?','Comment j’apprends '+(fv(n[0])?'l’':'le ')+n[0],'J’apprends '+(fv(n[0])?'l’':'le ')+n[0]+' depuis un an déjà.','Mes amis '+n[1]+' m’ont beaucoup aidé.']; });
const ITN={ar:['arabo','arabi'],ru:['russo','russi'],en:['inglese','inglesi'],uz:['uzbeko','uzbeki'],es:['spagnolo','spagnoli'],zh:['cinese','cinesi'],de:['tedesco','tedeschi'],fr:['francese','francesi'],it:['italiano','italiani'],tr:['turco','turchi'],ja:['giapponese','giapponesi'],ko:['coreano','coreani']};
const iart=s=>/^[aeiou]/i.test(s)?'l’':/^(s[^aeiou]|z|gn|ps)/i.test(s)?'lo ':'il ';
STARX.it=build(t=>{ const n=ITN[t]; return ['Come si dice «libro» in '+n[0]+'?','Come imparo '+iart(n[0])+n[0],'Studio '+iart(n[0])+n[0]+' già da un anno.','I miei amici '+n[1]+' mi hanno aiutato molto.']; });
const TRN={ar:['Arapça','Arap'],ru:['Rusça','Rus'],en:['İngilizce','İngiliz'],uz:['Özbekçe','Özbek'],es:['İspanyolca','İspanyol'],zh:['Çince','Çinli'],de:['Almanca','Alman'],fr:['Fransızca','Fransız'],it:['İtalyanca','İtalyan'],tr:['Türkçe','Türk'],ja:['Japonca','Japon'],ko:['Korece','Koreli']};
// Turkish accusative of the language name: -yı/-yi/-yu/-yü after a vowel
const tracc=s=>{ const v=(s.match(/[aeıioöuü](?=[^aeıioöuü]*$)/)||['e'])[0]; return s+'y'+({a:'ı',ı:'ı',e:'i',i:'i',o:'u',u:'u',ö:'ü',ü:'ü'}[v]); };
STARX.tr=build(t=>{ const n=TRN[t]; return ['«Kitap» '+n[0]+' nasıl denir?',n[0]+' nasıl öğreniyorum',"Bir yıldır "+n[0]+' öğreniyorum.',n[1]+' arkadaşlarım bana çok yardım etti.']; });
const JAN={ar:['アラビア語','アラブ人'],ru:['ロシア語','ロシア人'],en:['英語','イギリス人'],uz:['ウズベク語','ウズベク人'],es:['スペイン語','スペイン人'],zh:['中国語','中国人'],de:['ドイツ語','ドイツ人'],fr:['フランス語','フランス人'],it:['イタリア語','イタリア人'],tr:['トルコ語','トルコ人'],ja:['日本語','日本人'],ko:['韓国語','韓国人']};
STARX.ja=build(t=>{ const n=JAN[t]; return ['「 本 」 は '+n[0]+' で 何 と 言い ます か 。','わたし の '+n[0]+' の 勉強 法',n[0]+' を 勉強 し て もう 一 年 に なり ます 。',n[1]+' の 友だち が とても 助け て くれ まし た 。']; });
const KON={ar:['아랍어','아랍'],ru:['러시아어','러시아'],en:['영어','영국'],uz:['우즈베크어','우즈베크'],es:['스페인어','스페인'],zh:['중국어','중국'],de:['독일어','독일'],fr:['프랑스어','프랑스'],it:['이탈리아어','이탈리아'],tr:['튀르키예어','튀르키예'],ja:['일본어','일본'],ko:['한국어','한국']};
const kobj=s=>{ const c=s.charCodeAt(s.length-1)-0xAC00; return s+((c%28)?'을':'를'); };
STARX.ko=build(t=>{ const n=KON[t]; return ['"책"은 '+n[0]+'로 뭐라고 해요?','내가 '+kobj(n[0])+' 배우는 방법','저는 '+kobj(n[0])+' 배운 지 벌써 일 년이 됐어요.',n[1]+' 친구들이 많이 도와줬어요.']; });
})();
