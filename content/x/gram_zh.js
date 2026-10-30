// Chinese grammar for ar / ru / en / uz / es natives. ex: "zh|ar|ru|en|uz|es"
const T5=(ar,ru,en,uz,es)=>({ar,ru,en,uz,es});
GR.zh = {
A1: [
{title:T5('الجملة بـ 是 وجملة الصفة','Предложения с 是 и с прилагательным','Sentences with 是 and with adjectives','是 bilan gaplar va sifatli gaplar','Oraciones con 是 y con adjetivos'),
 body:T5(
 `<p>[[是]] (shì) يربط اسمين: [[我 是 学生 。]] = أنا طالب. لكن مع الصفة لا نستخدم 是، بل نضع عادة [[很]] (جداً): [[他 很 高 。]] = هو طويل.</p><p class="tip">الأفعال في الصينية لا تتغيّر أبداً: لا تصريف حسب الضمير أو الزمن.</p>`,
 `<p>[[是]] (shì) связывает два существительных: [[我 是 学生 。]] = Я студент. Но с прилагательным 是 не нужен — ставят [[很]] («очень»): [[他 很 高 。]] = Он высокий.</p><p class="tip">Глаголы в китайском никогда не изменяются — ни по лицам, ни по временам.</p>`,
 `<p>[[是]] (shì) links two nouns: [[我 是 学生 。]] = I am a student. With adjectives 是 is not used — you usually add [[很]] ("very"): [[他 很 高 。]] = He is tall.</p><p class="tip">Chinese verbs never change — no conjugation for person or tense.</p>`,
 `<p>[[是]] (shì) ikki otni bogʻlaydi: [[我 是 学生 。]] = Men talabaman. Sifat bilan esa 是 ishlatilmaydi, odatda [[很]] («juda») qoʻyiladi: [[他 很 高 。]] = U baland boʻyli.</p><p class="tip">Xitoy tilida feʼllar hech qachon oʻzgarmaydi — shaxs va zamonga koʻra tuslanmaydi.</p>`,
 `<p>[[是]] (shì) une dos sustantivos: [[我 是 学生 。]] = Soy estudiante. Con adjetivos no se usa 是, sino normalmente [[很]] («muy»): [[他 很 高 。]] = Él es alto.</p><p class="tip">Los verbos chinos nunca cambian: no se conjugan por persona ni por tiempo.</p>`),
 ex:`我 是 学生 。|أنا طالب.|Я студент.|I am a student.|Men talabaman.|Soy estudiante.
她 是 医生 。|هي طبيبة.|Она врач.|She is a doctor.|U shifokor.|Ella es médica.
这 个 苹果 很 好吃 。|هذه التفاحة لذيذة.|Это яблоко очень вкусное.|This apple is delicious.|Bu olma juda mazali.|Esta manzana está muy rica.
我们 很 忙 。|نحن مشغولون.|Мы заняты.|We are busy.|Biz bandmiz.|Estamos ocupados.`,
 quiz:[[T5('«أنا معلم»:','«Я учитель»:','"I am a teacher":','«Men oʻqituvchiman»:','«Soy profesor»:'),'我 是 老师 。','我 很 老师 。','我 老师 是 。'],[T5('«هو طويل»:','«Он высокий»:','"He is tall":','«U baland boʻyli»:','«Él es alto»:'),'他 很 高 。','他 是 高 。','他 高 是 。']]},
{title:T5('النفي بـ 不 والسؤال بـ 吗','Отрицание 不 и вопрос с 吗','Negation with 不 and questions with 吗','不 bilan inkor va 吗 bilan savol','La negación con 不 y la pregunta con 吗'),
 body:T5(
 `<p>للنفي نضع [[不]] (bù) قبل الفعل أو الصفة: [[我 不 喝 咖啡 。]] = لا أشرب القهوة.</p><p>لسؤال «نعم/لا» نضيف [[吗]] (ma) في آخر الجملة: [[你 是 学生 吗 ？]] = هل أنت طالب؟ ومع أدوات الاستفهام لا نضع 吗: [[你 叫 什么 名字 ？]]</p>`,
 `<p>Для отрицания перед глаголом или прилагательным ставят [[不]] (bù): [[我 不 喝 咖啡 。]] = Я не пью кофе.</p><p>Вопрос «да/нет» — частица [[吗]] (ma) в конце: [[你 是 学生 吗 ？]] = Ты студент? С вопросительными словами 吗 не нужен: [[你 叫 什么 名字 ？]]</p>`,
 `<p>To negate, put [[不]] (bù) before the verb or adjective: [[我 不 喝 咖啡 。]] = I don't drink coffee.</p><p>For a yes/no question, add [[吗]] (ma) at the end: [[你 是 学生 吗 ？]] = Are you a student? With question words, no 吗: [[你 叫 什么 名字 ？]]</p>`,
 `<p>Inkor uchun feʼl yoki sifat oldidan [[不]] (bù) qoʻyiladi: [[我 不 喝 咖啡 。]] = Men qahva ichmayman.</p><p>Ha/yoʻq savoli uchun gap oxiriga [[吗]] (ma) qoʻshiladi: [[你 是 学生 吗 ？]] = Talabamisan? Soʻroq soʻzi boʻlsa, 吗 kerak emas: [[你 叫 什么 名字 ？]]</p>`,
 `<p>Para negar se pone [[不]] (bù) delante del verbo o adjetivo: [[我 不 喝 咖啡 。]] = No tomo café.</p><p>Para preguntas de sí/no se añade [[吗]] (ma) al final: [[你 是 学生 吗 ？]] = ¿Eres estudiante? Con interrogativos no se usa 吗: [[你 叫 什么 名字 ？]]</p>`),
 ex:`我 不 喝 咖啡 。|لا أشرب القهوة.|Я не пью кофе.|I don't drink coffee.|Men qahva ichmayman.|No tomo café.
你 是 学生 吗 ？|هل أنت طالب؟|Ты студент?|Are you a student?|Talabamisan?|¿Eres estudiante?
你 叫 什么 名字 ？|ما اسمك؟|Как тебя зовут?|What's your name?|Isming nima?|¿Cómo te llamas?
这 是 谁 ？|من هذا؟|Кто это?|Who is this?|Bu kim?|¿Quién es este?`,
 quiz:[[T5('«لست متعباً»:','«Я не устал»:','"I am not tired":','«Men charchamadim»:','«No estoy cansado»:'),'我 不 累 。','我 累 不 。','我 是 不 累 吗 。'],[T5('«هل أنت جائع؟»:','«Ты голоден?»:','"Are you hungry?":','«Ochmisan?»:','«¿Tienes hambre?»:'),'你 饿 吗 ？','你 吗 饿 ？','吗 你 饿 ？']]},
{title:T5('العدد وكلمات القياس: 个','Числа и счётные слова: 个','Numbers and measure words: 个','Sonlar va hisob soʻzlari: 个','Números y clasificadores: 个'),
 body:T5(
 `<p>بين العدد والاسم لا بد من «كلمة قياس». أكثرها شيوعاً [[个]] (ge): [[三 个 人]] = ثلاثة أشخاص. وهناك كلمات خاصة: [[一 本 书]] (كتاب)، [[一 杯 茶]] (كوب شاي)، [[一 只 猫]] (قطة).</p><p class="tip">«اثنان» قبل كلمة القياس تكون [[两]] وليس 二: [[两 个 人]].</p>`,
 `<p>Между числом и существительным обязательно «счётное слово». Самое частое — [[个]] (ge): [[三 个 人]] = три человека. Есть и особые: [[一 本 书]] (книга), [[一 杯 茶]] (чашка чая), [[一 只 猫]] (кошка).</p><p class="tip">«Два» перед счётным словом — [[两]], а не 二: [[两 个 人]].</p>`,
 `<p>A "measure word" is required between a number and a noun. The most common is [[个]] (ge): [[三 个 人]] = three people. Others are specific: [[一 本 书]] (a book), [[一 杯 茶]] (a cup of tea), [[一 只 猫]] (a cat).</p><p class="tip">"Two" before a measure word is [[两]], not 二: [[两 个 人]].</p>`,
 `<p>Son va ot orasida albatta «hisob soʻzi» boʻladi. Eng koʻp ishlatiladigani — [[个]] (ge): [[三 个 人]] = uch kishi. Maxsuslari ham bor: [[一 本 书]] (kitob), [[一 杯 茶]] (bir piyola choy), [[一 只 猫]] (mushuk).</p><p class="tip">Hisob soʻzi oldida «ikki» [[两]] boʻladi, 二 emas: [[两 个 人]].</p>`,
 `<p>Entre el número y el sustantivo hace falta un «clasificador». El más común es [[个]] (ge): [[三 个 人]] = tres personas. Hay otros específicos: [[一 本 书]] (un libro), [[一 杯 茶]] (una taza de té), [[一 只 猫]] (un gato).</p><p class="tip">«Dos» delante de un clasificador es [[两]], no 二: [[两 个 人]].</p>`),
 ex:`我 有 两 个 哥哥 。|عندي أخوان أكبر مني.|У меня два старших брата.|I have two older brothers.|Mening ikkita akam bor.|Tengo dos hermanos mayores.
我 要 一 杯 茶 。|أريد كوب شاي.|Мне чашку чая.|I'd like a cup of tea.|Menga bir piyola choy.|Quiero una taza de té.
这 本 书 很 有意思 。|هذا الكتاب ممتع.|Эта книга интересная.|This book is interesting.|Bu kitob qiziq.|Este libro es interesante.`,
 quiz:[[T5('«شخصان»:','«два человека»:','"two people":','«ikki kishi»:','«dos personas»:'),'两 个 人','二 个 人','两 人 个'],[T5('«كتاب واحد»:','«одна книга»:','"one book":','«bitta kitob»:','«un libro»:'),'一 本 书','一 书','一 个 本 书']]},
{title:T5('الملكية بـ 的','Принадлежность: 的','Possession with 的','的 bilan qaratqich','La posesión con 的'),
 body:T5(
 `<p>[[的]] (de) تعني «الخاص بـ»: [[我 的 书]] = كتابي، [[老师 的 车]] = سيارة المعلم. ومع أفراد العائلة والأماكن القريبة يمكن حذفه: [[我 妈妈]] = أمي.</p>`,
 `<p>[[的]] (de) = «чей»: [[我 的 书]] = моя книга, [[老师 的 车]] = машина учителя. С родственниками и близкими понятиями 的 часто опускают: [[我 妈妈]] = моя мама.</p>`,
 `<p>[[的]] (de) works like "'s": [[我 的 书]] = my book, [[老师 的 车]] = the teacher's car. With family members it is often dropped: [[我 妈妈]] = my mom.</p>`,
 `<p>[[的]] (de) «-ning» maʼnosini beradi: [[我 的 书]] = mening kitobim, [[老师 的 车]] = oʻqituvchining mashinasi. Oila aʼzolari bilan koʻpincha tushib qoladi: [[我 妈妈]] = onam.</p>`,
 `<p>[[的]] (de) equivale a «de»: [[我 的 书]] = mi libro, [[老师 的 车]] = el coche del profesor. Con la familia se suele omitir: [[我 妈妈]] = mi madre.</p>`),
 ex:`这 是 我 的 猫 。|هذه قطتي.|Это моя кошка.|This is my cat.|Bu mening mushugim.|Este es mi gato.
我 妈妈 是 老师 。|أمي معلمة.|Моя мама учительница.|My mom is a teacher.|Onam oʻqituvchi.|Mi madre es profesora.
你 的 手机 在 哪儿 ？|أين هاتفك؟|Где твой телефон?|Where is your phone?|Telefoning qayerda?|¿Dónde está tu móvil?`,
 quiz:[[T5('«بيتي»:','«мой дом»:','"my house":','«mening uyim»:','«mi casa»:'),'我 的 家','的 我 家','我 家 的'],[T5('«كتاب المعلم»:','«книга учителя»:','"the teacher\'s book":','«oʻqituvchining kitobi»:','«el libro del profesor»:'),'老师 的 书','书 的 老师','的 老师 书']]}
],
A2: [
{title:T5('الحدث المكتمل: 了','Завершённое действие: 了','Completed actions: 了','Tugallangan harakat: 了','Acción terminada: 了'),
 body:T5(
 `<p>[[了]] (le) بعد الفعل يدل على أن الحدث تمّ: [[我 买 了 一 本 书 。]] = اشتريت كتاباً. والنفي يكون بـ [[没]] بدون 了: [[我 没 买 。]] = لم أشترِ.</p>`,
 `<p>[[了]] (le) после глагола показывает, что действие совершилось: [[我 买 了 一 本 书 。]] = Я купил книгу. Отрицание — [[没]] без 了: [[我 没 买 。]] = Я не купил.</p>`,
 `<p>[[了]] (le) after a verb shows the action is completed: [[我 买 了 一 本 书 。]] = I bought a book. The negative uses [[没]] without 了: [[我 没 买 。]] = I didn't buy it.</p>`,
 `<p>Feʼldan keyin [[了]] (le) harakat bajarilganini bildiradi: [[我 买 了 一 本 书 。]] = Bir kitob sotib oldim. Inkori [[没]] bilan, 了 siz: [[我 没 买 。]] = Sotib olmadim.</p>`,
 `<p>[[了]] (le) tras el verbo indica que la acción se completó: [[我 买 了 一 本 书 。]] = Compré un libro. La negación es [[没]] sin 了: [[我 没 买 。]] = No lo compré.</p>`),
 ex:`昨天 我 去 了 商店 。|ذهبت أمس إلى المتجر.|Вчера я ходил в магазин.|Yesterday I went to the shop.|Kecha doʻkonga bordim.|Ayer fui a la tienda.
我们 吃 了 饭 。|أكلنا.|Мы поели.|We ate.|Biz ovqatlandik.|Comimos.
他 没 来 。|لم يأتِ.|Он не пришёл.|He didn't come.|U kelmadi.|No vino.`,
 quiz:[[T5('«اشتريت كتاباً»:','«Я купил книгу»:','"I bought a book":','«Kitob sotib oldim»:','«Compré un libro»:'),'我 买 了 一 本 书 。','我 了 买 一 本 书 。','我 不 买 了 书 。'],[T5('«لم أذهب»:','«Я не пошёл»:','"I didn\'t go":','«Bormadim»:','«No fui»:'),'我 没 去 。','我 不 去 了 。','我 去 没 。']]},
{title:T5('在: المكان والحدث الجاري','在: место и действие в процессе','在: place and ongoing action','在: joy va davom etayotgan harakat','在: lugar y acción en curso'),
 body:T5(
 `<p>[[在]] (zài) تعني «في» للمكان: [[我 在 家 。]] = أنا في البيت. وقبل الفعل تعني «يفعل الآن»: [[我 在 看 书 。]] = أقرأ الآن.</p><p class="tip">المكان يأتي قبل الفعل دائماً: [[我 在 银行 工作 。]] = أعمل في بنك.</p>`,
 `<p>[[在]] (zài) = «находиться в»: [[我 在 家 。]] = Я дома. Перед глаголом — «сейчас делаю»: [[我 在 看 书 。]] = Я читаю (сейчас).</p><p class="tip">Место всегда стоит перед глаголом: [[我 在 银行 工作 。]] = Я работаю в банке.</p>`,
 `<p>[[在]] (zài) = "to be at": [[我 在 家 。]] = I'm at home. Before a verb it means "doing right now": [[我 在 看 书 。]] = I'm reading.</p><p class="tip">The place always comes before the verb: [[我 在 银行 工作 。]] = I work at a bank.</p>`,
 `<p>[[在]] (zài) = «-da boʻlmoq»: [[我 在 家 。]] = Men uydaman. Feʼl oldida «hozir qilyapman» maʼnosini beradi: [[我 在 看 书 。]] = Kitob oʻqiyapman.</p><p class="tip">Joy har doim feʼldan oldin keladi: [[我 在 银行 工作 。]] = Bankda ishlayman.</p>`,
 `<p>[[在]] (zài) = «estar en»: [[我 在 家 。]] = Estoy en casa. Delante de un verbo = «estar haciendo»: [[我 在 看 书 。]] = Estoy leyendo.</p><p class="tip">El lugar siempre va antes del verbo: [[我 在 银行 工作 。]] = Trabajo en un banco.</p>`),
 ex:`妈妈 在 做 饭 。|أمي تطبخ.|Мама готовит.|Mom is cooking.|Onam ovqat pishiryapti.|Mamá está cocinando.
我 在 学校 。|أنا في المدرسة.|Я в школе.|I'm at school.|Men maktabdaman.|Estoy en la escuela.
他 在 医院 工作 。|يعمل في المستشفى.|Он работает в больнице.|He works at a hospital.|U kasalxonada ishlaydi.|Trabaja en un hospital.`,
 quiz:[[T5('«أعمل في بنك»:','«Я работаю в банке»:','"I work at a bank":','«Bankda ishlayman»:','«Trabajo en un banco»:'),'我 在 银行 工作 。','我 工作 在 银行 。','在 银行 我 工作 了 。'],[T5('«هو يقرأ الآن»:','«Он сейчас читает»:','"He is reading now":','«U hozir oʻqiyapti»:','«Ahora está leyendo»:'),'他 在 看 书 。','他 看 在 书 。','他 书 在 看 。']]},
{title:T5('الرغبة والقدرة: 想، 要، 会، 能','Желание и умение: 想, 要, 会, 能','Wanting and ability: 想, 要, 会, 能','Istak va qobiliyat: 想, 要, 会, 能','Deseo y capacidad: 想, 要, 会, 能'),
 body:T5(
 `<p>[[想]] = أرغب، [[要]] = أريد / سأفعل، [[会]] = أعرف كيف (مهارة متعلَّمة)، [[能]] = أستطيع (ظرف أو إذن): [[我 会 说 中文 。]] = أعرف أتكلم الصينية.</p>`,
 `<p>[[想]] = хотеть, [[要]] = хотеть / собираться, [[会]] = уметь (выученный навык), [[能]] = мочь (возможность): [[我 会 说 中文 。]] = Я умею говорить по-китайски.</p>`,
 `<p>[[想]] = would like to, [[要]] = want / be going to, [[会]] = know how to (a learned skill), [[能]] = can (be able / allowed): [[我 会 说 中文 。]] = I can speak Chinese.</p>`,
 `<p>[[想]] = xohlamoq, [[要]] = istamoq / -moqchi, [[会]] = bilmoq (oʻrganilgan koʻnikma), [[能]] = qila olmoq (imkoniyat): [[我 会 说 中文 。]] = Xitoycha gapira olaman.</p>`,
 `<p>[[想]] = querer (me gustaría), [[要]] = querer / ir a, [[会]] = saber hacer (habilidad aprendida), [[能]] = poder (posibilidad o permiso): [[我 会 说 中文 。]] = Sé hablar chino.</p>`),
 ex:`我 想 去 中国 。|أرغب في الذهاب إلى الصين.|Я хочу поехать в Китай.|I'd like to go to China.|Xitoyga borishni xohlayman.|Quiero ir a China.
你 会 游泳 吗 ？|هل تعرف السباحة؟|Ты умеешь плавать?|Can you swim?|Suzishni bilasanmi?|¿Sabes nadar?
今天 我 不 能 来 。|لا أستطيع المجيء اليوم.|Сегодня я не могу прийти.|I can't come today.|Bugun kela olmayman.|Hoy no puedo venir.`,
 quiz:[[T5('«أعرف أتكلم الصينية»:','«Я умею говорить по-китайски»:','"I can speak Chinese":','«Xitoycha gapira olaman»:','«Sé hablar chino»:'),'我 会 说 中文 。','我 说 会 中文 。','我 中文 会 说 了 。'],[T5('«أرغب في شرب الشاي»:','«Я хочу чаю»:','"I\'d like to drink tea":','«Choy ichgim keladi»:','«Me apetece un té»:'),'我 想 喝 茶 。','我 喝 想 茶 。','想 我 茶 喝 。']]},
{title:T5('المقارنة بـ 比','Сравнение с 比','Comparison with 比','比 bilan qiyoslash','La comparación con 比'),
 body:T5(
 `<p>A + [[比]] + B + صفة: [[哥哥 比 我 高 。]] = أخي أطول مني. ولا نستخدم 很 هنا. وللتفضيل المطلق نضع [[最]]: [[最 好]] = الأفضل.</p>`,
 `<p>A + [[比]] + B + прилагательное: [[哥哥 比 我 高 。]] = Брат выше меня. 很 здесь не ставят. Превосходная степень — [[最]]: [[最 好]] = лучший.</p>`,
 `<p>A + [[比]] + B + adjective: [[哥哥 比 我 高 。]] = My brother is taller than me. Don't use 很 here. For "the most", use [[最]]: [[最 好]] = the best.</p>`,
 `<p>A + [[比]] + B + sifat: [[哥哥 比 我 高 。]] = Akam mendan baland. Bu yerda 很 ishlatilmaydi. «Eng» — [[最]]: [[最 好]] = eng yaxshi.</p>`,
 `<p>A + [[比]] + B + adjetivo: [[哥哥 比 我 高 。]] = Mi hermano es más alto que yo. Aquí no se usa 很. Para el superlativo: [[最]]: [[最 好]] = el mejor.</p>`),
 ex:`北京 比 上海 冷 。|بكين أبرد من شنغهاي.|В Пекине холоднее, чем в Шанхае.|Beijing is colder than Shanghai.|Pekin Shanxaydan sovuqroq.|Pekín es más frío que Shanghái.
这 件 比 那 件 便宜 。|هذه أرخص من تلك.|Эта дешевле той.|This one is cheaper than that one.|Bu unisidan arzonroq.|Esta es más barata que aquella.
地铁 最 快 。|المترو هو الأسرع.|Метро быстрее всего.|The metro is the fastest.|Metro eng tez.|El metro es lo más rápido.`,
 quiz:[[T5('«أخي أكبر مني»:','«Брат старше меня»:','"My brother is older than me":','«Akam mendan katta»:','«Mi hermano es mayor que yo»:'),'哥哥 比 我 大 。','哥哥 比 我 很 大 。','我 比 哥哥 大 很 。'],[T5('«الأفضل»:','«самый лучший»:','"the best":','«eng yaxshi»:','«el mejor»:'),'最 好','很 好 比','比 好']]}
],
B1: [
{title:T5('التجربة: 过','Опыт: 过','Experience: 过','Tajriba: 过','La experiencia: 过'),
 body:T5(
 `<p>[[过]] (guo) بعد الفعل = «سبق أن فعلت»: [[我 去过 北京 。]] = زرت بكين من قبل. النفي: [[没 去过]] = لم أزرها أبداً.</p>`,
 `<p>[[过]] (guo) после глагола = «когда-то уже делал»: [[我 去过 北京 。]] = Я бывал в Пекине. Отрицание: [[没 去过]] = никогда не был.</p>`,
 `<p>[[过]] (guo) after a verb = "have done before": [[我 去过 北京 。]] = I have been to Beijing. Negative: [[没 去过]] = have never been.</p>`,
 `<p>Feʼldan keyin [[过]] (guo) = «ilgari qilganman»: [[我 去过 北京 。]] = Pekinda boʻlganman. Inkori: [[没 去过]] = hech boʻlmaganman.</p>`,
 `<p>[[过]] (guo) tras el verbo = «haber hecho alguna vez»: [[我 去过 北京 。]] = He estado en Pekín. Negación: [[没 去过]] = nunca he estado.</p>`),
 ex:`你 吃过 饺子 吗 ？|هل أكلت الجياوزي من قبل؟|Ты когда-нибудь ел цзяоцзы?|Have you ever eaten dumplings?|Chuchvara yeganmisan?|¿Has comido alguna vez jiaozi?
我 没 看过 这 部 电影 。|لم أشاهد هذا الفيلم.|Я не смотрел этот фильм.|I haven't seen this film.|Bu filmni koʻrmaganman.|No he visto esta película.`,
 quiz:[[T5('«زرت الصين من قبل»:','«Я бывал в Китае»:','"I have been to China":','«Xitoyda boʻlganman»:','«He estado en China»:'),'我 去过 中国 。','我 过 去 中国 。','我 去 中国 过 了 。'],[T5('«لم أشاهده أبداً»:','«Я никогда не видел»:','"I have never seen it":','«Hech koʻrmaganman»:','«Nunca lo he visto»:'),'我 没 看过 。','我 不 看过 。','我 看过 没 。']]},
{title:T5('السبب والنتيجة: 因为 … 所以','Причина и следствие: 因为 … 所以','Cause and result: 因为 … 所以','Sabab va natija: 因为 … 所以','Causa y consecuencia: 因为 … 所以'),
 body:T5(
 `<p>[[因为]] = لأن، [[所以]] = لذلك، ويُستخدمان معاً في الجملة نفسها: [[因为 下雨 ， 所以 我 没 去 。]] = لأنها أمطرت لم أذهب.</p>`,
 `<p>[[因为]] = потому что, [[所以]] = поэтому — в китайском их ставят вместе: [[因为 下雨 ， 所以 我 没 去 。]] = Из-за дождя я не пошёл.</p>`,
 `<p>[[因为]] = because, [[所以]] = so — Chinese uses both in the same sentence: [[因为 下雨 ， 所以 我 没 去 。]] = Because it rained, I didn't go.</p>`,
 `<p>[[因为]] = chunki, [[所以]] = shuning uchun — xitoy tilida ikkalasi bir gapda keladi: [[因为 下雨 ， 所以 我 没 去 。]] = Yomgʻir yogʻgani uchun bormadim.</p>`,
 `<p>[[因为]] = porque, [[所以]] = por eso; en chino se usan juntos: [[因为 下雨 ， 所以 我 没 去 。]] = Como llovía, no fui.</p>`),
 ex:`因为 我 很 累 ， 所以 早 睡 了 。|لأنني متعب نمت مبكراً.|Я устал, поэтому рано лёг спать.|Because I was tired, I went to bed early.|Charchaganim uchun erta yotdim.|Como estaba cansado, me acosté pronto.
因为 堵车 ， 所以 他 迟到 了 。|تأخر بسبب الازدحام.|Он опоздал из-за пробки.|He was late because of the traffic jam.|Tirbandlik tufayli u kechikdi.|Llegó tarde por el atasco.`,
 quiz:[[T5('«لأنها أمطرت لم أذهب»:','«Из-за дождя я не пошёл»:','"Because it rained, I didn\'t go":','«Yomgʻir yogʻgani uchun bormadim»:','«Como llovía, no fui»:'),'因为 下雨 ， 所以 我 没 去 。','所以 下雨 ， 因为 我 没 去 。','因为 下雨 所以 ， 我 去 没 。'],[T5('«لذلك»:','«поэтому»:','"so / therefore":','«shuning uchun»:','«por eso»:'),'所以','因为','但是']]},
{title:T5('مكمّل النتيجة: 完، 到، 懂','Результативные дополнения: 完, 到, 懂','Result complements: 完, 到, 懂','Natija toʻldiruvchilari: 完, 到, 懂','Complementos de resultado: 完, 到, 懂'),
 body:T5(
 `<p>نضيف بعد الفعل كلمة تبيّن نتيجته: [[看完]] = أنهيت القراءة، [[找到]] = وجدتُ (بحثت فنجحت)، [[听懂]] = فهمت ما سمعت. النفي بـ 没: [[我 没 听懂 。]]</p>`,
 `<p>После глагола добавляют слово-результат: [[看完]] = дочитать, [[找到]] = найти (искал — и нашёл), [[听懂]] = понять на слух. Отрицание — 没: [[我 没 听懂 。]]</p>`,
 `<p>A second word after the verb shows the result: [[看完]] = finish reading, [[找到]] = find (look for and succeed), [[听懂]] = understand by listening. Negative with 没: [[我 没 听懂 。]]</p>`,
 `<p>Feʼldan keyin natijani bildiruvchi soʻz qoʻshiladi: [[看完]] = oʻqib tugatmoq, [[找到]] = topmoq (qidirib topdi), [[听懂]] = eshitib tushunmoq. Inkori 没 bilan: [[我 没 听懂 。]]</p>`,
 `<p>Tras el verbo se añade una palabra de resultado: [[看完]] = terminar de leer, [[找到]] = encontrar (buscar con éxito), [[听懂]] = entender al oír. Negación con 没: [[我 没 听懂 。]]</p>`),
 ex:`我 找到 工作 了 。|وجدت عملاً.|Я нашёл работу.|I've found a job.|Ish topdim.|He encontrado trabajo.
这 本 书 我 看完 了 。|أنهيت قراءة هذا الكتاب.|Я дочитал эту книгу.|I've finished this book.|Bu kitobni oʻqib tugatdim.|He terminado este libro.
对不起 ， 我 没 听懂 。|عذراً، لم أفهم.|Извините, я не понял.|Sorry, I didn't understand.|Kechirasiz, tushunmadim.|Perdón, no lo he entendido.`,
 quiz:[[T5('«لم أفهم (ما سمعت)»:','«Я не понял (на слух)»:','"I didn\'t understand (what I heard)":','«Tushunmadim (eshitib)»:','«No lo entendí (al oírlo)»:'),'我 没 听懂 。','我 不 听懂 了 。','我 听 没 懂 。'],[T5('«وجدت المفتاح»:','«Я нашёл ключ»:','"I found the key":','«Kalitni topdim»:','«Encontré la llave»:'),'我 找到 钥匙 了 。','我 找 钥匙 到 。','我 到 找 钥匙 。']]}
],
B2: [
{title:T5('المبني للمجهول بـ 被','Пассив с 被','The passive with 被','被 bilan majhul nisbat','La pasiva con 被'),
 body:T5(
 `<p>المفعول + [[被]] + الفاعل + الفعل: [[我 的 钱包 被 偷 了 。]] = سُرقت محفظتي. يُستعمل 被 غالباً للأحداث غير المرغوبة.</p>`,
 `<p>Объект + [[被]] + исполнитель + глагол: [[我 的 钱包 被 偷 了 。]] = У меня украли кошелёк. 被 чаще используют для неприятных событий.</p>`,
 `<p>Object + [[被]] + doer + verb: [[我 的 钱包 被 偷 了 。]] = My wallet was stolen. 被 is mostly used for unpleasant events.</p>`,
 `<p>Toʻldiruvchi + [[被]] + bajaruvchi + feʼl: [[我 的 钱包 被 偷 了 。]] = Hamyonim oʻgʻirlandi. 被 asosan yoqimsiz voqealar uchun ishlatiladi.</p>`,
 `<p>Objeto + [[被]] + agente + verbo: [[我 的 钱包 被 偷 了 。]] = Me robaron la cartera. 被 se usa sobre todo para hechos desagradables.</p>`),
 ex:`蛋糕 被 弟弟 吃 了 。|أكل أخي الصغير الكعكة.|Торт съел младший брат.|The cake was eaten by my little brother.|Tortni ukam yeb qoʻydi.|El pastel se lo comió mi hermano pequeño.
他 被 公司 解雇 了 。|فُصل من الشركة.|Его уволили из компании.|He was fired by the company.|Uni kompaniya ishdan boʻshatdi.|La empresa lo despidió.`,
 quiz:[[T5('«سُرق هاتفي»:','«У меня украли телефон»:','"My phone was stolen":','«Telefonim oʻgʻirlandi»:','«Me robaron el móvil»:'),'我 的 手机 被 偷 了 。','我 的 手机 偷 被 了 。','被 我 的 手机 偷 。'],[T5('حرف المجهول:','Пассивная частица:','The passive marker:','Majhul belgisi:','La partícula de pasiva:'),'被','把','比']]},
{title:T5('الشرط: 如果 … 就','Условие: 如果 … 就','Conditionals: 如果 … 就','Shart: 如果 … 就','Condición: 如果 … 就'),
 body:T5(
 `<p>[[如果]] = إذا، و[[就]] في جواب الشرط قبل الفعل: [[如果 明天 下雨 ， 我们 就 不 去 。]] = إذا أمطرت غداً فلن نذهب.</p>`,
 `<p>[[如果]] = если, а [[就]] стоит во второй части перед глаголом: [[如果 明天 下雨 ， 我们 就 不 去 。]] = Если завтра будет дождь, мы не пойдём.</p>`,
 `<p>[[如果]] = if, and [[就]] goes before the verb in the result clause: [[如果 明天 下雨 ， 我们 就 不 去 。]] = If it rains tomorrow, we won't go.</p>`,
 `<p>[[如果]] = agar, natija qismida feʼl oldidan [[就]] keladi: [[如果 明天 下雨 ， 我们 就 不 去 。]] = Ertaga yomgʻir yogʻsa, bormaymiz.</p>`,
 `<p>[[如果]] = si, y [[就]] va delante del verbo en la segunda parte: [[如果 明天 下雨 ， 我们 就 不 去 。]] = Si mañana llueve, no iremos.</p>`),
 ex:`如果 你 有 时间 ， 就 给 我 打 电话 。|إذا كان عندك وقت فاتصل بي.|Если будет время, позвони мне.|If you have time, call me.|Vaqting boʻlsa, menga qoʻngʻiroq qil.|Si tienes tiempo, llámame.
如果 我 是 你 ， 我 就 同意 。|لو كنت مكانك لوافقت.|На твоём месте я бы согласился.|If I were you, I would agree.|Sening oʻrningda boʻlsam, rozi boʻlardim.|Yo que tú, aceptaría.`,
 quiz:[[T5('«إذا أمطرت فلن نذهب»:','«Если пойдёт дождь, мы не пойдём»:','"If it rains, we won\'t go":','«Yomgʻir yogʻsa, bormaymiz»:','«Si llueve, no vamos»:'),'如果 下雨 ， 我们 就 不 去 。','就 下雨 ， 我们 如果 不 去 。','如果 下雨 就 ， 我们 去 不 。'],[T5('«إذا»:','«если»:','"if":','«agar»:','«si»:'),'如果','所以','虽然']]}
],
C1: [
{title:T5('رغم أن … إلا أن: 虽然 … 但是','Хотя … но: 虽然 … 但是','Although … but: 虽然 … 但是','Garchi … lekin: 虽然 … 但是','Aunque … pero: 虽然 … 但是'),
 body:T5(
 `<p>[[虽然]] = رغم أن، و[[但是]] = لكن، ويأتيان معاً: [[虽然 很 难 ， 但是 很 有意思 。]] = رغم أنه صعب فهو ممتع. ومثلها [[不但 … 而且]] = ليس فقط … بل أيضاً.</p>`,
 `<p>[[虽然]] = хотя, [[但是]] = но — употребляются вместе: [[虽然 很 难 ， 但是 很 有意思 。]] = Хотя трудно, но интересно. Похожая пара: [[不但 … 而且]] = не только …, но и.</p>`,
 `<p>[[虽然]] = although and [[但是]] = but are used together: [[虽然 很 难 ， 但是 很 有意思 。]] = Although it's hard, it's interesting. A similar pair: [[不但 … 而且]] = not only … but also.</p>`,
 `<p>[[虽然]] = garchi, [[但是]] = lekin — birga ishlatiladi: [[虽然 很 难 ， 但是 很 有意思 。]] = Qiyin boʻlsa ham, qiziq. Shunga oʻxshash juftlik: [[不但 … 而且]] = nafaqat …, balki.</p>`,
 `<p>[[虽然]] = aunque y [[但是]] = pero van juntos: [[虽然 很 难 ， 但是 很 有意思 。]] = Aunque es difícil, es interesante. Pareja parecida: [[不但 … 而且]] = no solo …, sino también.</p>`),
 ex:`虽然 下雨 ， 但是 我们 还是 去 散步 了 。|رغم المطر خرجنا للتنزه.|Хотя шёл дождь, мы всё равно пошли гулять.|Although it rained, we still went for a walk.|Yomgʻir yogʻsa ham, sayrga chiqdik.|Aunque llovía, salimos a pasear.
他 不但 会 说 中文 ， 而且 会 写 汉字 。|لا يتكلم الصينية فحسب بل يكتب الحروف أيضاً.|Он не только говорит по-китайски, но и пишет иероглифы.|He not only speaks Chinese but also writes characters.|U nafaqat xitoycha gapiradi, balki iyerogliflarni ham yozadi.|No solo habla chino, sino que también escribe caracteres.`,
 quiz:[[T5('«رغم أنه صعب فهو ممتع»:','«Хотя трудно, но интересно»:','"Although it\'s hard, it\'s interesting":','«Qiyin boʻlsa ham, qiziq»:','«Aunque es difícil, es interesante»:'),'虽然 很 难 ， 但是 很 有意思 。','但是 很 难 ， 虽然 很 有意思 。','虽然 很 难 但是 ， 有意思 很 。'],[T5('«ليس فقط … بل أيضاً»:','«не только …, но и»:','"not only … but also":','«nafaqat …, balki»:','«no solo …, sino también»:'),'不但 … 而且','因为 … 所以','如果 … 就']]},
{title:T5('بنية 把','Конструкция с 把','The 把 construction','把 qurilmasi','La construcción con 把'),
 body:T5(
 `<p>[[把]] ينقل المفعول قبل الفعل ليُبرز ما حدث له: الفاعل + 把 + المفعول + الفعل + نتيجة: [[我 把 作业 做完 了 。]] = أنهيت الواجب. [[请 把 门 关上 。]] = أغلق الباب من فضلك.</p>`,
 `<p>[[把]] выносит дополнение перед глаголом, чтобы подчеркнуть, что с ним сделали: подлежащее + 把 + дополнение + глагол + результат: [[我 把 作业 做完 了 。]] = Я сделал домашнее задание. [[请 把 门 关上 。]] = Закройте, пожалуйста, дверь.</p>`,
 `<p>[[把]] moves the object before the verb to stress what happened to it: subject + 把 + object + verb + result: [[我 把 作业 做完 了 。]] = I've finished my homework. [[请 把 门 关上 。]] = Please close the door.</p>`,
 `<p>[[把]] toʻldiruvchini feʼldan oldinga chiqaradi va unga nima boʻlganini taʼkidlaydi: ega + 把 + toʻldiruvchi + feʼl + natija: [[我 把 作业 做完 了 。]] = Uy vazifasini bajarib boʻldim. [[请 把 门 关上 。]] = Iltimos, eshikni yoping.</p>`,
 `<p>[[把]] adelanta el objeto delante del verbo para destacar qué le pasó: sujeto + 把 + objeto + verbo + resultado: [[我 把 作业 做完 了 。]] = Ya he terminado los deberes. [[请 把 门 关上 。]] = Cierra la puerta, por favor.</p>`),
 ex:`我 把 钥匙 忘 在 家里 了 。|نسيت المفاتيح في البيت.|Я забыл ключи дома.|I left my keys at home.|Kalitlarni uyda unutib qoldirdim.|Me dejé las llaves en casa.
请 把 窗户 打开 。|افتح النافذة من فضلك.|Откройте, пожалуйста, окно.|Please open the window.|Iltimos, derazani oching.|Abre la ventana, por favor.`,
 quiz:[[T5('«أغلق الباب من فضلك»:','«Закройте дверь, пожалуйста»:','"Please close the door":','«Iltimos, eshikni yoping»:','«Cierra la puerta, por favor»:'),'请 把 门 关上 。','请 门 把 关上 。','请 关上 把 门 。'],[T5('«أنهيت الواجب»:','«Я сделал домашнее задание»:','"I finished the homework":','«Uy vazifasini tugatdim»:','«Terminé los deberes»:'),'我 把 作业 做完 了 。','我 作业 把 做完 了 。','把 我 作业 做完 了 。']]}
],
C2: [
{title:T5('الأمثال الصينية (成语)','Чэнъюй — китайские идиомы (成语)','Chengyu: four-character idioms (成语)','Chengyu — xitoy iboralari (成语)','Los chengyu: modismos de cuatro caracteres (成语)'),
 body:T5(
 `<p>«تشنغيو» عبارات من أربعة حروف غالباً، تختصر قصة أو حكمة: [[一举两得]] = عصفوران بحجر واحد، [[半途而废]] = التوقف في منتصف الطريق، [[入乡随俗]] = إذا دخلت قوماً فاتبع عاداتهم.</p><p class="tip">احفظ كل عبارة كوحدة واحدة مع قصتها.</p>`,
 `<p>Чэнъюй — устойчивые выражения, чаще из четырёх иероглифов, за которыми стоит история: [[一举两得]] = убить двух зайцев, [[半途而废]] = бросить на полпути, [[入乡随俗]] = в чужой монастырь со своим уставом не ходят.</p><p class="tip">Учите каждое выражение целиком, вместе с его историей.</p>`,
 `<p>Chengyu are set phrases, usually of four characters, that carry a story or a lesson: [[一举两得]] = kill two birds with one stone, [[半途而废]] = give up halfway, [[入乡随俗]] = when in Rome, do as the Romans do.</p><p class="tip">Learn each one as a single unit, together with its story.</p>`,
 `<p>Chengyu — odatda toʻrt iyeroglifdan iborat turgʻun iboralar, ortida hikoya yoki hikmat bor: [[一举两得]] = bir oʻq bilan ikki quyonni urmoq, [[半途而废]] = ishni yarim yoʻlda tashlamoq, [[入乡随俗]] = qaysi elga borsang, oʻsha elning toʻnini kiy.</p><p class="tip">Har birini hikoyasi bilan birga, bir butun sifatida yodlang.</p>`,
 `<p>Los chengyu son expresiones fijas, casi siempre de cuatro caracteres, con una historia detrás: [[一举两得]] = matar dos pájaros de un tiro, [[半途而废]] = abandonar a medio camino, [[入乡随俗]] = donde fueres, haz lo que vieres.</p><p class="tip">Aprende cada uno entero, junto con su historia.</p>`),
 ex:`学 外语 不要 半途而废 。|لا تتوقف عن تعلّم اللغة في منتصف الطريق.|Не бросай изучение языка на полпути.|Don't give up learning a language halfway.|Til oʻrganishni yarim yoʻlda tashlama.|No abandones el idioma a medio camino.
这样 做 一举两得 。|هكذا نصيب عصفورين بحجر واحد.|Так мы убьём двух зайцев.|This way we kill two birds with one stone.|Shunday qilsak, bir oʻq bilan ikki quyonni uramiz.|Así matamos dos pájaros de un tiro.
入乡随俗 。|إذا دخلت قوماً فاتبع عاداتهم.|В чужой монастырь со своим уставом не ходят.|When in Rome, do as the Romans do.|Qaysi elga borsang, oʻsha elning toʻnini kiy.|Donde fueres, haz lo que vieres.`,
 quiz:[[T5('«عصفوران بحجر واحد»:','«убить двух зайцев»:','"kill two birds with one stone":','«bir oʻq bilan ikki quyon»:','«matar dos pájaros de un tiro»:'),'一举两得','半途而废','入乡随俗'],[T5('«التوقف في منتصف الطريق»:','«бросить на полпути»:','"give up halfway":','«yarim yoʻlda tashlamoq»:','«abandonar a medio camino»:'),'半途而废','一举两得','马马虎虎']]},
{title:T5('أسلوب الكتابة الرسمية','Книжный стиль','Formal written style','Rasmiy yozma uslub','El estilo escrito formal'),
 body:T5(
 `<p>في الكتابة الرسمية تُستبدل كلمات الكلام اليومي بأخرى أدبية: [[因为]] ← [[由于]] (بسبب)، [[但是]] ← [[然而]] (غير أنّ)، [[所以]] ← [[因此]] (ولذلك)، [[的]] ← [[之]] في العبارات الثابتة: [[之一]] = أحد.</p>`,
 `<p>В книжном стиле разговорные слова заменяют литературными: [[因为]] → [[由于]] (вследствие), [[但是]] → [[然而]] (однако), [[所以]] → [[因此]] (поэтому), а 的 в устойчивых оборотах → [[之]]: [[之一]] = один из.</p>`,
 `<p>Formal writing swaps everyday words for literary ones: [[因为]] → [[由于]] (due to), [[但是]] → [[然而]] (however), [[所以]] → [[因此]] (therefore), and 的 in set phrases → [[之]]: [[之一]] = one of.</p>`,
 `<p>Rasmiy uslubda soʻzlashuv soʻzlari adabiylari bilan almashtiriladi: [[因为]] → [[由于]] (sababli), [[但是]] → [[然而]] (biroq), [[所以]] → [[因此]] (shu bois), turgʻun birikmalarda 的 → [[之]]: [[之一]] = …dan biri.</p>`,
 `<p>En el estilo formal se cambian palabras coloquiales por otras cultas: [[因为]] → [[由于]] (debido a), [[但是]] → [[然而]] (sin embargo), [[所以]] → [[因此]] (por lo tanto), y 的 en frases hechas → [[之]]: [[之一]] = uno de.</p>`),
 ex:`由于 天气 原因 ， 航班 取消 了 。|أُلغيت الرحلة بسبب الطقس.|Из-за погоды рейс отменили.|Due to the weather, the flight was cancelled.|Ob-havo sababli reys bekor qilindi.|Debido al tiempo, se canceló el vuelo.
这 是 世界 上 最 古老 的 城市 之一 。|هذه من أقدم مدن العالم.|Это один из древнейших городов мира.|This is one of the oldest cities in the world.|Bu dunyodagi eng qadimiy shaharlardan biri.|Es una de las ciudades más antiguas del mundo.`,
 quiz:[[T5('«بسبب» (رسمي):','«вследствие» (книжн.):','"due to" (formal):','«sababli» (rasmiy):','«debido a» (formal):'),'由于','因为','所以'],[T5('«أحد…»:','«один из»:','"one of":','«…dan biri»:','«uno de»:'),'之一','的一','一之']]}
]};
