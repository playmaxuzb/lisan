// Uzbek grammar. Bodies in ar/ru/en; examples "uz|ar|ru|en"; quiz [[q{ar,ru,en}, correct, wrong, wrong]]
GR.uz = {
A1: [
{title:{ar:'«أنا طالب»: الضمائر ولواحق الكينونة', ru:'«Я студент»: местоимения и личные окончания', en:'"I am a student": pronouns and the "to be" endings'},
 body:{
 ar:`<p>لا يوجد في الأوزبكية فعل مستقل بمعنى «يكون». بدلاً منه نضيف لاحقة شخصية إلى آخر الكلمة: [[Men talabaman.]] = أنا طالب.</p>
<table><tr><th>الضمير</th><th>اللاحقة</th><th>مثال</th></tr><tr><td>[[men]] أنا</td><td>-man</td><td>[[talabaman]]</td></tr><tr><td>[[sen]] أنتَ</td><td>-san</td><td>[[talabasan]]</td></tr><tr><td>[[u]] هو/هي</td><td>—</td><td>[[talaba]]</td></tr><tr><td>[[biz]] نحن</td><td>-miz</td><td>[[talabamiz]]</td></tr><tr><td>[[siz]] أنتم/حضرتك</td><td>-siz</td><td>[[talabasiz]]</td></tr><tr><td>[[ular]] هم</td><td>-(lar)</td><td>[[talabalar]]</td></tr></table>
<p class="tip">النفي بكلمة [[emas]] وتأخذ هي اللاحقة: [[Men shifokor emasman.]] = لستُ طبيباً.</p>`,
 ru:`<p>В узбекском нет отдельного глагола «быть». Вместо него к слову добавляется личное окончание: [[Men talabaman.]] = Я студент.</p>
<table><tr><th>Местоимение</th><th>Окончание</th><th>Пример</th></tr><tr><td>[[men]] я</td><td>-man</td><td>[[talabaman]]</td></tr><tr><td>[[sen]] ты</td><td>-san</td><td>[[talabasan]]</td></tr><tr><td>[[u]] он/она</td><td>—</td><td>[[talaba]]</td></tr><tr><td>[[biz]] мы</td><td>-miz</td><td>[[talabamiz]]</td></tr><tr><td>[[siz]] вы</td><td>-siz</td><td>[[talabasiz]]</td></tr><tr><td>[[ular]] они</td><td>-(lar)</td><td>[[talabalar]]</td></tr></table>
<p class="tip">Отрицание — словом [[emas]], окончание переходит на него: [[Men shifokor emasman.]] = Я не врач.</p>`,
 en:`<p>Uzbek has no separate verb "to be". Instead, a personal ending is added to the word: [[Men talabaman.]] = I am a student.</p>
<table><tr><th>Pronoun</th><th>Ending</th><th>Example</th></tr><tr><td>[[men]] I</td><td>-man</td><td>[[talabaman]]</td></tr><tr><td>[[sen]] you</td><td>-san</td><td>[[talabasan]]</td></tr><tr><td>[[u]] he/she</td><td>—</td><td>[[talaba]]</td></tr><tr><td>[[biz]] we</td><td>-miz</td><td>[[talabamiz]]</td></tr><tr><td>[[siz]] you (polite/plural)</td><td>-siz</td><td>[[talabasiz]]</td></tr><tr><td>[[ular]] they</td><td>-(lar)</td><td>[[talabalar]]</td></tr></table>
<p class="tip">For "not", use [[emas]], which takes the ending: [[Men shifokor emasman.]] = I am not a doctor.</p>`},
 ex:`Men talabaman.|أنا طالب.|Я студент.|I am a student.
Sen shifokorsan.|أنت طبيب.|Ты врач.|You are a doctor.
U o'qituvchi.|هو معلم.|Он учитель.|He is a teacher.
Biz do'stmiz.|نحن أصدقاء.|Мы друзья.|We are friends.
Men charchagan emasman.|لستُ متعباً.|Я не устал.|I am not tired.`,
 quiz:[[{ar:'«أنا معلم» بالأوزبكية:',ru:'«Я учитель» по-узбекски:',en:'"I am a teacher" in Uzbek:'},"Men o'qituvchiman.","Men o'qituvchisan.","Men o'qituvchimiz."],
       [{ar:'«لسنا متعبين»:',ru:'«Мы не устали»:',en:'"We are not tired":'},"Biz charchagan emasmiz.","Biz charchagan emasman.","Biz emas charchaganmiz."]]},
{title:{ar:'الجمع ‎-lar‎ ولواحق الملكية', ru:'Множественное число -lar и притяжательные окончания', en:'Plural -lar and possessive endings'},
 body:{
 ar:`<p>الجمع سهل جداً: نضيف [[-lar]] لأي اسم: [[kitob]] ← [[kitoblar]] (كتب)، [[bola]] ← [[bolalar]] (أطفال).</p>
<p>الملكية لاحقة في آخر الاسم، مثل «كتابي» في العربية تماماً:</p>
<table><tr><th></th><th>بعد ساكن</th><th>بعد حرف علّة</th></tr><tr><td>ـي (لي)</td><td>[[kitobim]]</td><td>[[onam]]</td></tr><tr><td>ـكَ (لك)</td><td>[[kitobing]]</td><td>[[onang]]</td></tr><tr><td>ـه (له/لها)</td><td>[[kitobi]]</td><td>[[onasi]]</td></tr><tr><td>ـنا</td><td>[[kitobimiz]]</td><td>[[onamiz]]</td></tr><tr><td>ـكم</td><td>[[kitobingiz]]</td><td>[[onangiz]]</td></tr></table>
<p class="tip">يمكن إضافة الضمير للتأكيد: [[mening kitobim]] = كتابي أنا.</p>`,
 ru:`<p>Множественное число образуется очень просто — окончанием [[-lar]]: [[kitob]] → [[kitoblar]] (книги), [[bola]] → [[bolalar]] (дети).</p>
<p>Принадлежность выражается окончанием, а не отдельным словом:</p>
<table><tr><th></th><th>после согласной</th><th>после гласной</th></tr><tr><td>мой</td><td>[[kitobim]]</td><td>[[onam]]</td></tr><tr><td>твой</td><td>[[kitobing]]</td><td>[[onang]]</td></tr><tr><td>его/её</td><td>[[kitobi]]</td><td>[[onasi]]</td></tr><tr><td>наш</td><td>[[kitobimiz]]</td><td>[[onamiz]]</td></tr><tr><td>ваш</td><td>[[kitobingiz]]</td><td>[[onangiz]]</td></tr></table>
<p class="tip">Для усиления можно добавить местоимение: [[mening kitobim]] = моя книга.</p>`,
 en:`<p>The plural is easy: add [[-lar]] to any noun: [[kitob]] → [[kitoblar]] (books), [[bola]] → [[bolalar]] (children).</p>
<p>"My, your, his" are endings on the noun:</p>
<table><tr><th></th><th>after a consonant</th><th>after a vowel</th></tr><tr><td>my</td><td>[[kitobim]]</td><td>[[onam]]</td></tr><tr><td>your</td><td>[[kitobing]]</td><td>[[onang]]</td></tr><tr><td>his/her</td><td>[[kitobi]]</td><td>[[onasi]]</td></tr><tr><td>our</td><td>[[kitobimiz]]</td><td>[[onamiz]]</td></tr><tr><td>your (pl.)</td><td>[[kitobingiz]]</td><td>[[onangiz]]</td></tr></table>
<p class="tip">You can add the pronoun for emphasis: [[mening kitobim]] = my book.</p>`},
 ex:`Bu mening kitobim.|هذا كتابي.|Это моя книга.|This is my book.
Onam uyda.|أمي في البيت.|Мама дома.|My mother is at home.
Bolalar maktabda.|الأطفال في المدرسة.|Дети в школе.|The children are at school.
Ismingiz nima?|ما اسمك؟|Как вас зовут?|What is your name?`,
 quiz:[[{ar:'«بيتي»:',ru:'«мой дом»:',en:'"my house":'},"uyim","uying","uylar"],
       [{ar:'«الأصدقاء» (جمع doʻst):',ru:'«друзья» (мн. ч. от doʻst):',en:'"friends" (plural of doʻst):'},"do'stlar","do'stim","do'stni"]]},
{title:{ar:'الأسئلة: ‎-mi‎ وأدوات الاستفهام', ru:'Вопросы: частица -mi и вопросительные слова', en:'Questions: -mi and question words'},
 body:{
 ar:`<p>لسؤال «نعم/لا» نضيف [[-mi]] إلى آخر الكلمة المسؤول عنها: [[Bu choy.]] ← [[Bu choymi?]] (هل هذا شاي؟)</p>
<p>أدوات الاستفهام: [[nima]] ماذا، [[kim]] مَن، [[qayerda]] أين، [[qayerga]] إلى أين، [[qachon]] متى، [[qanday]] كيف، [[qancha]] كم، [[nega]] لماذا.</p>
<p class="tip">مع أداة الاستفهام لا نستخدم ‎-mi‎: [[Bu nima?]] = ما هذا؟</p>`,
 ru:`<p>Для вопроса «да/нет» к нужному слову добавляется [[-mi]]: [[Bu choy.]] → [[Bu choymi?]] (Это чай?)</p>
<p>Вопросительные слова: [[nima]] что, [[kim]] кто, [[qayerda]] где, [[qayerga]] куда, [[qachon]] когда, [[qanday]] как, [[qancha]] сколько, [[nega]] почему.</p>
<p class="tip">С вопросительным словом -mi не нужно: [[Bu nima?]] = Что это?</p>`,
 en:`<p>For a yes/no question, add [[-mi]] to the word you are asking about: [[Bu choy.]] → [[Bu choymi?]] (Is this tea?)</p>
<p>Question words: [[nima]] what, [[kim]] who, [[qayerda]] where, [[qayerga]] where to, [[qachon]] when, [[qanday]] how, [[qancha]] how much, [[nega]] why.</p>
<p class="tip">With a question word, -mi is not used: [[Bu nima?]] = What is this?</p>`},
 ex:`Siz talabamisiz?|هل أنت طالب؟|Вы студент?|Are you a student?
Bu nima?|ما هذا؟|Что это?|What is this?
U kim?|من هو؟|Кто он?|Who is he?
Bozor qayerda?|أين السوق؟|Где базар?|Where is the market?
Bu qancha turadi?|بكم هذا؟|Сколько это стоит?|How much does this cost?`,
 quiz:[[{ar:'«هل هذا شاي؟»:',ru:'«Это чай?»:',en:'"Is this tea?":'},"Bu choymi?","Bu choyda?","Bu choyni?"],
       [{ar:'«أين البيت؟»:',ru:'«Где дом?»:',en:'"Where is the house?":'},"Uy qayerda?","Uy qachon?","Uy kim?"]]},
{title:{ar:'bor و yoʻq: يوجد / عندي', ru:'bor и yoʻq: есть / нет, «у меня есть»', en:'bor and yoʻq: "there is" and "I have"'},
 body:{
 ar:`<p>[[bor]] = يوجد، [[yo'q]] = لا يوجد: [[Uyda non bor.]] = في البيت خبز.</p>
<p>للتعبير عن «عندي» نستخدم الملكية + bor: [[Mening mashinam bor.]] = عندي سيارة (حرفياً: سيارتي موجودة).</p>
<p class="tip">للسؤال: [[bormi?]] — [[Vaqtingiz bormi?]] = هل عندك وقت؟</p>`,
 ru:`<p>[[bor]] = есть, имеется; [[yo'q]] = нет: [[Uyda non bor.]] = Дома есть хлеб.</p>
<p>«У меня есть» = притяжательное окончание + bor: [[Mening mashinam bor.]] = У меня есть машина (букв. «моя машина есть»).</p>
<p class="tip">Вопрос: [[bormi?]] — [[Vaqtingiz bormi?]] = У вас есть время?</p>`,
 en:`<p>[[bor]] = there is; [[yo'q]] = there isn't: [[Uyda non bor.]] = There is bread at home.</p>
<p>"I have" = possessive ending + bor: [[Mening mashinam bor.]] = I have a car (literally "my car exists").</p>
<p class="tip">To ask: [[bormi?]] — [[Vaqtingiz bormi?]] = Do you have time?</p>`},
 ex:`Mening akam bor.|عندي أخ أكبر.|У меня есть старший брат.|I have an older brother.
Uyda non yo'q.|لا يوجد خبز في البيت.|Дома нет хлеба.|There is no bread at home.
Vaqtingiz bormi?|هل عندك وقت؟|У вас есть время?|Do you have time?
Bu yerda bank bormi?|هل يوجد بنك هنا؟|Здесь есть банк?|Is there a bank here?`,
 quiz:[[{ar:'«ليس عندي أخ أكبر»:',ru:'«У меня нет старшего брата»:',en:'"I don\'t have an older brother":'},"Akam yo'q.","Akam bor.","Akam emas."],
       [{ar:'«هل يوجد ماء؟»:',ru:'«Есть вода?»:',en:'"Is there water?":'},"Suv bormi?","Suv yo'qmi?","Suv bor."]]}
],
A2: [
{title:{ar:'الحالات: ‎-ni, -ga, -da, -dan', ru:'Падежи: -ni, -ga, -da, -dan', en:'Cases: -ni, -ga, -da, -dan'},
 body:{
 ar:`<p>بدل حروف الجر تستخدم الأوزبكية لواحق في آخر الكلمة:</p>
<table><tr><th>اللاحقة</th><th>المعنى</th><th>مثال</th></tr><tr><td>-ni</td><td>المفعول به المعرّف</td><td>[[kitobni o'qiyman]]</td></tr><tr><td>-ga</td><td>إلى / لـ</td><td>[[maktabga]]</td></tr><tr><td>-da</td><td>في / عند</td><td>[[uyda]]</td></tr><tr><td>-dan</td><td>من</td><td>[[Toshkentdan]]</td></tr><tr><td>-ning</td><td>ملكية (الإضافة)</td><td>[[akamning uyi]]</td></tr></table>
<p class="tip">بعد k تصبح ‎-ga‎ ‏‎-ka‎، وبعد q تصبح ‎-qa‎: [[bankka]]، [[qishloqqa]].</p>`,
 ru:`<p>Вместо предлогов в узбекском используются окончания:</p>
<table><tr><th>Окончание</th><th>Значение</th><th>Пример</th></tr><tr><td>-ni</td><td>определённое прямое дополнение (кого? что?)</td><td>[[kitobni o'qiyman]]</td></tr><tr><td>-ga</td><td>куда? кому?</td><td>[[maktabga]]</td></tr><tr><td>-da</td><td>где?</td><td>[[uyda]]</td></tr><tr><td>-dan</td><td>откуда? от кого?</td><td>[[Toshkentdan]]</td></tr><tr><td>-ning</td><td>чей? (родительный)</td><td>[[akamning uyi]]</td></tr></table>
<p class="tip">После k окончание -ga становится -ka, после q — -qa: [[bankka]], [[qishloqqa]].</p>`,
 en:`<p>Instead of prepositions, Uzbek uses endings:</p>
<table><tr><th>Ending</th><th>Meaning</th><th>Example</th></tr><tr><td>-ni</td><td>definite object</td><td>[[kitobni o'qiyman]]</td></tr><tr><td>-ga</td><td>to</td><td>[[maktabga]]</td></tr><tr><td>-da</td><td>in / at</td><td>[[uyda]]</td></tr><tr><td>-dan</td><td>from</td><td>[[Toshkentdan]]</td></tr><tr><td>-ning</td><td>of / 's</td><td>[[akamning uyi]]</td></tr></table>
<p class="tip">After k, -ga becomes -ka; after q it becomes -qa: [[bankka]], [[qishloqqa]].</p>`},
 ex:`Men kitobni o'qiyman.|أقرأ الكتاب.|Я читаю книгу.|I'm reading the book.
Biz maktabga boramiz.|نذهب إلى المدرسة.|Мы идём в школу.|We go to school.
U Toshkentda yashaydi.|يعيش في طشقند.|Он живёт в Ташкенте.|He lives in Tashkent.
Men Iordaniyadanman.|أنا من الأردن.|Я из Иордании.|I am from Jordan.
Bu akamning uyi.|هذا بيت أخي.|Это дом моего брата.|This is my brother's house.`,
 quiz:[[{ar:'«إلى السوق»:',ru:'«на базар» (куда?):',en:'"to the market":'},"bozorga","bozorda","bozordan"],
       [{ar:'«في المكتب»:',ru:'«в офисе»:',en:'"in the office":'},"ofisda","ofisga","ofisni"]]},
{title:{ar:'المضارع والمستقبل: ‎-a/-y‎ + اللاحقة الشخصية', ru:'Настоящее-будущее время: -a/-y + лицо', en:'Present-future tense: -a/-y + person'},
 body:{
 ar:`<p>زمن واحد يعبّر عن العادة وعن المستقبل: جذر الفعل + [[-a]] (بعد ساكن) أو [[-y]] (بعد حرف علّة) + اللاحقة الشخصية.</p>
<table><tr><th></th><th>bor- (يذهب)</th><th>o'qi- (يقرأ)</th></tr><tr><td>أنا</td><td>[[boraman]]</td><td>[[o'qiyman]]</td></tr><tr><td>أنتَ</td><td>[[borasan]]</td><td>[[o'qiysan]]</td></tr><tr><td>هو</td><td>[[boradi]]</td><td>[[o'qiydi]]</td></tr><tr><td>نحن</td><td>[[boramiz]]</td><td>[[o'qiymiz]]</td></tr><tr><td>أنتم</td><td>[[borasiz]]</td><td>[[o'qiysiz]]</td></tr><tr><td>هم</td><td>[[borishadi]]</td><td>[[o'qishadi]]</td></tr></table>
<p class="tip">[[Har kuni ishlayman]] = أعمل كل يوم، و[[Ertaga kelaman]] = سآتي غداً: الصيغة نفسها.</p>`,
 ru:`<p>Одно время выражает и привычку, и будущее: основа + [[-a]] (после согласной) или [[-y]] (после гласной) + личное окончание.</p>
<table><tr><th></th><th>bor- (идти)</th><th>o'qi- (читать)</th></tr><tr><td>я</td><td>[[boraman]]</td><td>[[o'qiyman]]</td></tr><tr><td>ты</td><td>[[borasan]]</td><td>[[o'qiysan]]</td></tr><tr><td>он</td><td>[[boradi]]</td><td>[[o'qiydi]]</td></tr><tr><td>мы</td><td>[[boramiz]]</td><td>[[o'qiymiz]]</td></tr><tr><td>вы</td><td>[[borasiz]]</td><td>[[o'qiysiz]]</td></tr><tr><td>они</td><td>[[borishadi]]</td><td>[[o'qishadi]]</td></tr></table>
<p class="tip">[[Har kuni ishlayman]] = Я работаю каждый день; [[Ertaga kelaman]] = Завтра приду — одна и та же форма.</p>`,
 en:`<p>One tense covers both habits and the future: verb stem + [[-a]] (after a consonant) or [[-y]] (after a vowel) + personal ending.</p>
<table><tr><th></th><th>bor- (go)</th><th>o'qi- (read)</th></tr><tr><td>I</td><td>[[boraman]]</td><td>[[o'qiyman]]</td></tr><tr><td>you</td><td>[[borasan]]</td><td>[[o'qiysan]]</td></tr><tr><td>he/she</td><td>[[boradi]]</td><td>[[o'qiydi]]</td></tr><tr><td>we</td><td>[[boramiz]]</td><td>[[o'qiymiz]]</td></tr><tr><td>you (pl.)</td><td>[[borasiz]]</td><td>[[o'qiysiz]]</td></tr><tr><td>they</td><td>[[borishadi]]</td><td>[[o'qishadi]]</td></tr></table>
<p class="tip">[[Har kuni ishlayman]] = I work every day; [[Ertaga kelaman]] = I'll come tomorrow — the same form.</p>`},
 ex:`Men har kuni ishlayman.|أعمل كل يوم.|Я работаю каждый день.|I work every day.
Ertaga kelaman.|سآتي غداً.|Завтра приду.|I'll come tomorrow.
U rus tilini biladi.|هو يعرف الروسية.|Он знает русский язык.|He knows Russian.
Biz choy ichamiz.|نشرب الشاي.|Мы пьём чай.|We drink tea.`,
 quiz:[[{ar:'«نقرأ»:',ru:'«мы читаем»:',en:'"we read":'},"o'qiymiz","o'qiyman","o'qiysiz"],
       [{ar:'«سيذهب (هو)»:',ru:'«он пойдёт»:',en:'"he will go":'},"boradi","boraman","bordi"]]},
{title:{ar:'الماضي: ‎-di‎', ru:'Прошедшее время на -di', en:'The past tense: -di'},
 body:{
 ar:`<p>الماضي = جذر الفعل + [[-di]] + لاحقة مختصرة:</p>
<table><tr><th>أنا</th><th>أنتَ</th><th>هو</th><th>نحن</th><th>أنتم</th><th>هم</th></tr><tr><td>[[bordim]]</td><td>[[bording]]</td><td>[[bordi]]</td><td>[[bordik]]</td><td>[[bordingiz]]</td><td>[[borishdi]]</td></tr></table>
<p class="tip">لاحظ: «نحن» تنتهي بـ ‎-k‎ في الماضي ([[keldik]] = وصلنا) وبـ ‎-miz‎ في المضارع ([[kelamiz]]).</p>`,
 ru:`<p>Прошедшее время = основа + [[-di]] + краткое личное окончание:</p>
<table><tr><th>я</th><th>ты</th><th>он</th><th>мы</th><th>вы</th><th>они</th></tr><tr><td>[[bordim]]</td><td>[[bording]]</td><td>[[bordi]]</td><td>[[bordik]]</td><td>[[bordingiz]]</td><td>[[borishdi]]</td></tr></table>
<p class="tip">Обратите внимание: «мы» в прошедшем времени оканчивается на -k ([[keldik]] = мы пришли), а в настоящем — на -miz ([[kelamiz]]).</p>`,
 en:`<p>Past tense = stem + [[-di]] + a short personal ending:</p>
<table><tr><th>I</th><th>you</th><th>he</th><th>we</th><th>you (pl.)</th><th>they</th></tr><tr><td>[[bordim]]</td><td>[[bording]]</td><td>[[bordi]]</td><td>[[bordik]]</td><td>[[bordingiz]]</td><td>[[borishdi]]</td></tr></table>
<p class="tip">Note: "we" ends in -k in the past ([[keldik]] = we came) but in -miz in the present ([[kelamiz]]).</p>`},
 ex:`Kecha kinoga bordim.|ذهبت أمس إلى السينما.|Вчера я ходил в кино.|Yesterday I went to the cinema.
Biz osh yedik.|أكلنا البلوف.|Мы ели плов.|We ate plov.
Siz qachon keldingiz?|متى وصلتم؟|Когда вы приехали?|When did you arrive?
U uyga qaytdi.|عاد إلى البيت.|Он вернулся домой.|He went back home.`,
 quiz:[[{ar:'«رأيتُ»:',ru:'«я увидел»:',en:'"I saw":'},"ko'rdim","ko'rdik","ko'raman"],
       [{ar:'«وصلنا»:',ru:'«мы пришли»:',en:'"we came":'},"keldik","kelamiz","keldim"]]},
{title:{ar:'النفي: ‎-ma-‎ و emas', ru:'Отрицание: -ma- и emas', en:'Negation: -ma- and emas'},
 body:{
 ar:`<p>لنفي الفعل نضع [[-ma-]] بعد الجذر مباشرة: [[boraman]] ← [[bormayman]] (لن أذهب / لا أذهب)، [[bordim]] ← [[bormadim]] (لم أذهب).</p>
<p>لنفي الاسم أو الصفة نستخدم [[emas]]: [[Bu qimmat emas.]] = هذا ليس غالياً.</p>
<p class="tip">في المضارع ‎-ma-‎ + ‎-y-‎: [[tushunmayman]] = لا أفهم.</p>`,
 ru:`<p>Глагол отрицается частицей [[-ma-]] сразу после основы: [[boraman]] → [[bormayman]] (не пойду), [[bordim]] → [[bormadim]] (не пошёл).</p>
<p>Имя или прилагательное отрицается словом [[emas]]: [[Bu qimmat emas.]] = Это не дорого.</p>
<p class="tip">В настоящем времени -ma- + -y-: [[tushunmayman]] = я не понимаю.</p>`,
 en:`<p>To negate a verb, put [[-ma-]] right after the stem: [[boraman]] → [[bormayman]] (I won't go / I don't go), [[bordim]] → [[bormadim]] (I didn't go).</p>
<p>To negate a noun or adjective, use [[emas]]: [[Bu qimmat emas.]] = It isn't expensive.</p>
<p class="tip">In the present, -ma- + -y-: [[tushunmayman]] = I don't understand.</p>`},
 ex:`Men go'sht yemayman.|لا آكل اللحم.|Я не ем мясо.|I don't eat meat.
U kelmadi.|لم يأتِ.|Он не пришёл.|He didn't come.
Bu qimmat emas.|هذا ليس غالياً.|Это не дорого.|It isn't expensive.
Men tushunmayman.|لا أفهم.|Я не понимаю.|I don't understand.`,
 quiz:[[{ar:'«لم أفهم»:',ru:'«я не понял»:',en:'"I didn\'t understand":'},"Tushunmadim.","Tushundim.","Tushunmayman."],
       [{ar:'«هذا ليس بعيداً»:',ru:'«Это не далеко»:',en:'"It isn\'t far":'},"Bu uzoq emas.","Bu uzoqma.","Bu uzoq yo'qmi."]]}
],
B1: [
{title:{ar:'المضارع المستمر: ‎-yap-‎', ru:'Настоящее длительное: -yap-', en:'Present continuous: -yap-'},
 body:{
 ar:`<p>لما يحدث الآن نستخدم [[-yap-]] (بعد ساكن ‎-ayap-‎ أو ‎-yap-‎ حسب الفعل) + اللاحقة الشخصية: [[o'qiyapman]] = أقرأ الآن.</p>
<p>هو/هي: [[-yapti]]: [[Yomg'ir yog'yapti.]] = إنها تمطر.</p>
<p class="tip">قارن: [[Har kuni ishlayman]] (عادة) — [[Hozir ishlayapman]] (الآن).</p>`,
 ru:`<p>Для действия в данный момент используется [[-yap-]] + личное окончание: [[o'qiyapman]] = я сейчас читаю.</p>
<p>Он/она: [[-yapti]]: [[Yomg'ir yog'yapti.]] = Идёт дождь.</p>
<p class="tip">Сравните: [[Har kuni ishlayman]] (обычно) — [[Hozir ishlayapman]] (сейчас).</p>`,
 en:`<p>For what is happening right now, use [[-yap-]] + personal ending: [[o'qiyapman]] = I'm reading now.</p>
<p>He/she: [[-yapti]]: [[Yomg'ir yog'yapti.]] = It's raining.</p>
<p class="tip">Compare: [[Har kuni ishlayman]] (habit) — [[Hozir ishlayapman]] (right now).</p>`},
 ex:`Hozir ishlayapman.|أنا أعمل الآن.|Сейчас я работаю.|I'm working now.
Yomg'ir yog'yapti.|إنها تمطر.|Идёт дождь.|It's raining.
Nima qilyapsan?|ماذا تفعل؟|Что ты делаешь?|What are you doing?
Biz sizni kutyapmiz.|نحن ننتظرك.|Мы вас ждём.|We are waiting for you.`,
 quiz:[[{ar:'«هي تطبخ الآن»:',ru:'«Она сейчас готовит»:',en:'"She is cooking now":'},"U hozir ovqat pishiryapti.","U hozir ovqat pishirdi.","U hozir ovqat pishirmadi."],
       [{ar:'«ماذا تفعل (أنتَ)؟»:',ru:'«Что ты делаешь?»:',en:'"What are you doing?":'},"Nima qilyapsan?","Nima qilyapman?","Nima qildik?"]]},
{title:{ar:'النية والرغبة: ‎-moqchi‎', ru:'Намерение: -moqchi', en:'Intention: -moqchi'},
 body:{
 ar:`<p>«أريد أن / أنوي» = جذر الفعل + [[-moqchi]] + اللاحقة الشخصية: [[bormoqchiman]] = أريد أن أذهب.</p>
<p>للنفي: [[bormoqchi emasman]] = لا أريد أن أذهب.</p>
<p class="tip">يمكن أيضاً استخدام الفعل [[xohlamoq]] (يرغب): [[Choy xohlaysizmi?]] = هل تريد شاياً؟</p>`,
 ru:`<p>«Хочу / собираюсь» = основа + [[-moqchi]] + личное окончание: [[bormoqchiman]] = я хочу пойти.</p>
<p>Отрицание: [[bormoqchi emasman]] = я не собираюсь идти.</p>
<p class="tip">Можно также использовать глагол [[xohlamoq]] (хотеть): [[Choy xohlaysizmi?]] = Хотите чаю?</p>`,
 en:`<p>"I want to / I'm going to" = stem + [[-moqchi]] + personal ending: [[bormoqchiman]] = I want to go.</p>
<p>Negative: [[bormoqchi emasman]] = I don't intend to go.</p>
<p class="tip">You can also use [[xohlamoq]] (to want): [[Choy xohlaysizmi?]] = Would you like some tea?</p>`},
 ex:`Men shifokor bo'lmoqchiman.|أريد أن أصبح طبيباً.|Я хочу стать врачом.|I want to become a doctor.
Ertaga bozorga bormoqchimiz.|ننوي الذهاب إلى السوق غداً.|Завтра мы собираемся на базар.|We're going to the market tomorrow.
U uy sotib olmoqchi.|يريد أن يشتري بيتاً.|Он хочет купить дом.|He wants to buy a house.`,
 quiz:[[{ar:'«أريد أن أرتاح»:',ru:'«Я хочу отдохнуть»:',en:'"I want to rest":'},"Dam olmoqchiman.","Dam oldim.","Dam olyapman."],
       [{ar:'«لا أريد أن آكل»:',ru:'«Я не хочу есть»:',en:'"I don\'t want to eat":'},"Ovqat yemoqchi emasman.","Ovqat yemadim.","Ovqat yemoqchiman."]]},
{title:{ar:'القدرة: ‎-a olmoq‎', ru:'Возможность: -a olmoq («мочь»)', en:'Ability: -a olmoq ("can")'},
 body:{
 ar:`<p>«أستطيع» = جذر الفعل + [[-a]]/[[-y]] + الفعل [[olmoq]] مصرَّفاً: [[gapira olaman]] = أستطيع التكلم.</p>
<p>النفي على olmoq: [[kela olmadim]] = لم أستطع المجيء.</p>`,
 ru:`<p>«Могу» = основа + [[-a]]/[[-y]] + спрягаемый глагол [[olmoq]]: [[gapira olaman]] = я могу говорить.</p>
<p>Отрицание ставится на olmoq: [[kela olmadim]] = я не смог прийти.</p>`,
 en:`<p>"Can" = stem + [[-a]]/[[-y]] + the verb [[olmoq]], conjugated: [[gapira olaman]] = I can speak.</p>
<p>The negative goes on olmoq: [[kela olmadim]] = I couldn't come.</p>`},
 ex:`Men o'zbekcha gapira olaman.|أستطيع التحدث بالأوزبكية.|Я могу говорить по-узбекски.|I can speak Uzbek.
Kecha kela olmadim.|لم أستطع المجيء أمس.|Вчера я не смог прийти.|I couldn't come yesterday.
Menga yordam bera olasizmi?|هل يمكنك مساعدتي؟|Вы можете мне помочь?|Can you help me?`,
 quiz:[[{ar:'«هل يمكنك المساعدة؟»:',ru:'«Вы можете помочь?»:',en:'"Can you help?":'},"Yordam bera olasizmi?","Yordam berdingizmi?","Yordam beryapsizmi?"],
       [{ar:'«لم أستطع النوم»:',ru:'«Я не смог уснуть»:',en:'"I couldn\'t sleep":'},"Uxlay olmadim.","Uxlamadim olaman.","Uxlay olaman."]]},
{title:{ar:'الوجوب: kerak', ru:'Необходимость: kerak', en:'Necessity: kerak'},
 body:{
 ar:`<p>«يجب أن / عليّ أن» = الفعل بـ [[-ish]] + لاحقة الملكية + [[kerak]]: [[borishim kerak]] = يجب أن أذهب (حرفياً: ذهابي لازم).</p>
<p>«أحتاج» = [[Menga ... kerak]]: [[Menga yordam kerak.]] = أحتاج مساعدة.</p>
<p class="tip">النفي: [[kerak emas]] = لا داعي.</p>`,
 ru:`<p>«Нужно, должен» = глагол на [[-ish]] + притяжательное окончание + [[kerak]]: [[borishim kerak]] = мне нужно идти.</p>
<p>«Мне нужно что-то» = [[Menga ... kerak]]: [[Menga yordam kerak.]] = Мне нужна помощь.</p>
<p class="tip">Отрицание: [[kerak emas]] = не нужно.</p>`,
 en:`<p>"I have to" = verb in [[-ish]] + possessive ending + [[kerak]]: [[borishim kerak]] = I have to go (literally "my going is needed").</p>
<p>"I need something" = [[Menga ... kerak]]: [[Menga yordam kerak.]] = I need help.</p>
<p class="tip">Negative: [[kerak emas]] = not necessary.</p>`},
 ex:`Men ishga borishim kerak.|يجب أن أذهب إلى العمل.|Мне нужно идти на работу.|I have to go to work.
Sizga nima kerak?|ماذا تحتاج؟|Что вам нужно?|What do you need?
Shoshilish kerak emas.|لا داعي للعجلة.|Не нужно спешить.|There's no need to hurry.`,
 quiz:[[{ar:'«يجب أن ندرس»:',ru:'«Нам нужно учиться»:',en:'"We must study":'},"O'qishimiz kerak.","O'qiymiz kerak.","O'qidik kerak."],
       [{ar:'«أحتاج ماء»:',ru:'«Мне нужна вода»:',en:'"I need water":'},"Menga suv kerak.","Men suv kerak.","Mening suv kerakman."]]}
],
B2: [
{title:{ar:'الشرط: ‎-sa‎', ru:'Условие: -sa', en:'Conditionals: -sa'},
 body:{
 ar:`<p>«إذا» = جذر الفعل + [[-sa]] + لاحقة مختصرة: [[kelsam]] (إذا أتيتُ)، [[kelsang]]، [[kelsa]]، [[kelsak]]، [[kelsangiz]].</p>
<p>للشرط غير الواقعي («لو»): [[-sa]] ... [[-ar edi]]: [[Pulim bo'lsa, sayohat qilardim.]] = لو كان عندي مال لسافرت.</p>`,
 ru:`<p>«Если» = основа + [[-sa]] + краткое окончание: [[kelsam]] (если я приду), [[kelsang]], [[kelsa]], [[kelsak]], [[kelsangiz]].</p>
<p>Нереальное условие («если бы»): [[-sa]] ... [[-ar edi]]: [[Pulim bo'lsa, sayohat qilardim.]] = Если бы у меня были деньги, я бы путешествовал.</p>`,
 en:`<p>"If" = stem + [[-sa]] + a short ending: [[kelsam]] (if I come), [[kelsang]], [[kelsa]], [[kelsak]], [[kelsangiz]].</p>
<p>For unreal conditions ("if I had…, I would…"): [[-sa]] ... [[-ar edi]]: [[Pulim bo'lsa, sayohat qilardim.]] = If I had money, I would travel.</p>`},
 ex:`Vaqtim bo'lsa, kelaman.|إذا كان عندي وقت سآتي.|Если будет время, я приду.|If I have time, I'll come.
Yomg'ir yog'sa, uyda qolamiz.|إذا أمطرت سنبقى في البيت.|Если пойдёт дождь, мы останемся дома.|If it rains, we'll stay home.
Pulim bo'lsa, sayohat qilardim.|لو كان عندي مال لسافرت.|Если бы у меня были деньги, я бы путешествовал.|If I had money, I would travel.`,
 quiz:[[{ar:'«إذا اتصلتَ سأجيب»:',ru:'«Если позвонишь, я отвечу»:',en:'"If you call, I\'ll answer":'},"Qo'ng'iroq qilsang, javob beraman.","Qo'ng'iroq qilding, javob beraman.","Qo'ng'iroq qilyapsan, javob beraman."],
       [{ar:'«لو كنتُ أعرف لقلتُ لك»:',ru:'«Если бы я знал, я бы сказал»:',en:'"If I had known, I would have told you":'},"Bilsam, senga aytardim.","Bildim, senga aytaman.","Bilaman, senga aytdim."]]},
{title:{ar:'اسم المفعول/الفاعل ‎-gan‎ (الجمل الموصولة)', ru:'Причастие на -gan (определительные обороты)', en:'The -gan participle (relative clauses)'},
 body:{
 ar:`<p>لا يوجد «الذي» في الأوزبكية. نضع الفعل بـ [[-gan]] قبل الاسم: [[men o'qigan kitob]] = الكتاب الذي قرأته.</p>
<p>ويعني ‎-gan‎ + اللاحقة الشخصية أيضاً «فعلتُ ذلك من قبل»: [[Samarqandga borganman.]] = زرتُ سمرقند (من قبل).</p>`,
 ru:`<p>Слова «который» в узбекском нет. Перед существительным ставится глагол на [[-gan]]: [[men o'qigan kitob]] = книга, которую я прочитал.</p>
<p>С личным окончанием -gan означает опыт: [[Samarqandga borganman.]] = Я бывал в Самарканде.</p>`,
 en:`<p>Uzbek has no word for "which/who". Put the verb in [[-gan]] before the noun: [[men o'qigan kitob]] = the book (that) I read.</p>
<p>With a personal ending, -gan expresses experience: [[Samarqandga borganman.]] = I have been to Samarkand.</p>`},
 ex:`Men o'qigan kitob juda qiziq.|الكتاب الذي قرأته ممتع جداً.|Книга, которую я прочитал, очень интересная.|The book I read is very interesting.
Bu men tug'ilgan shahar.|هذه المدينة التي وُلدت فيها.|Это город, где я родился.|This is the city where I was born.
Imtihonni topshirgan talaba mamnun.|الطالب الذي نجح في الامتحان راضٍ.|Студент, сдавший экзамен, доволен.|The student who passed the exam is happy.
Men Samarqandga borganman.|زرتُ سمرقند من قبل.|Я бывал в Самарканде.|I have been to Samarkand.`,
 quiz:[[{ar:'«الفيلم الذي شاهدناه»:',ru:'«фильм, который мы посмотрели»:',en:'"the film we watched":'},"biz ko'rgan film","biz ko'rdik film","biz ko'ramiz film"],
       [{ar:'«لم أزر سمرقند أبداً»:',ru:'«Я никогда не был в Самарканде»:',en:'"I have never been to Samarkand":'},"Samarqandga hech qachon bormaganman.","Samarqandga hech qachon bordim.","Samarqandga hech qachon boraman."]]},
{title:{ar:'المبني للمجهول: ‎-il-/-in-‎', ru:'Страдательный залог: -il-/-in-', en:'The passive: -il-/-in-'},
 body:{
 ar:`<p>نضيف [[-il-]] بعد الجذر (أو [[-in-]] إذا انتهى الجذر بـ l أو بحرف علّة): [[qurmoq]] (يبني) ← [[qurildi]] (بُني)، [[o'qimoq]] ← [[o'qiladi]] (يُقرأ).</p>
<p class="tip">[[Bu yerda chekilmaydi.]] = هنا لا يُدخَّن.</p>`,
 ru:`<p>После основы добавляется [[-il-]] (или [[-in-]], если основа кончается на l или гласную): [[qurmoq]] (строить) → [[qurildi]] (был построен), [[o'qimoq]] → [[o'qiladi]] (читается).</p>
<p class="tip">[[Bu yerda chekilmaydi.]] = Здесь не курят.</p>`,
 en:`<p>Add [[-il-]] after the stem (or [[-in-]] if the stem ends in l or a vowel): [[qurmoq]] (to build) → [[qurildi]] (was built), [[o'qimoq]] → [[o'qiladi]] (is read).</p>
<p class="tip">[[Bu yerda chekilmaydi.]] = There's no smoking here.</p>`},
 ex:`Ko'prik o'tgan asrda qurilgan.|بُني الجسر في القرن الماضي.|Мост построен в прошлом веке.|The bridge was built last century.
Xat kecha yuborildi.|أُرسلت الرسالة أمس.|Письмо отправили вчера.|The letter was sent yesterday.
Bu kitob ko'p tillarga tarjima qilingan.|تُرجم هذا الكتاب إلى لغات كثيرة.|Эта книга переведена на многие языки.|This book has been translated into many languages.`,
 quiz:[[{ar:'«بيع البيت»:',ru:'«Дом продан»:',en:'"The house was sold":'},"Uy sotildi.","Uy sotdi.","Uy sotadi."],
       [{ar:'«أُغلق الباب»:',ru:'«Дверь закрыли»:',en:'"The door was closed":'},"Eshik yopildi.","Eshik yopdi.","Eshik yopmoqchi."]]}
],
C1: [
{title:{ar:'الحال ‎-ib‎: ربط الأفعال', ru:'Деепричастие на -ib: цепочки действий', en:'The -ib converb: chaining actions'},
 body:{
 ar:`<p>لربط فعلين متتاليين نضع الأول بـ [[-ib]] (بعد حرف علّة ‎-b‎) ونصرّف الأخير فقط: [[Uyga kelib, ovqatlandim.]] = جئت إلى البيت وأكلت.</p>
<p>[[-ayotib]] = «بينما»: [[Uyga qaytayotib, do'stimni uchratdim.]] = وأنا عائد إلى البيت قابلت صديقي.</p>`,
 ru:`<p>Чтобы связать последовательные действия, первый глагол ставится на [[-ib]] (после гласной -b), спрягается только последний: [[Uyga kelib, ovqatlandim.]] = Придя домой, я поел.</p>
<p>[[-ayotib]] = «в то время как»: [[Uyga qaytayotib, do'stimni uchratdim.]] = Возвращаясь домой, я встретил друга.</p>`,
 en:`<p>To link actions in sequence, put the first verb in [[-ib]] (-b after a vowel) and conjugate only the last: [[Uyga kelib, ovqatlandim.]] = I came home and ate.</p>
<p>[[-ayotib]] = "while": [[Uyga qaytayotib, do'stimni uchratdim.]] = While returning home, I met my friend.</p>`},
 ex:`Maqolani o'qib, u fikrini o'zgartirdi.|بعد أن قرأ المقالة غيّر رأيه.|Прочитав статью, он изменил мнение.|Having read the article, he changed his mind.
Uyga qaytayotib, eski do'stimni uchratdim.|وأنا عائد إلى البيت قابلت صديقاً قديماً.|Возвращаясь домой, я встретил старого друга.|On my way home I met an old friend.
O'tirib gaplashaylik.|لنجلس ونتحدث.|Давайте сядем и поговорим.|Let's sit down and talk.`,
 quiz:[[{ar:'«أنهيتُ العمل ثم ارتحت»:',ru:'«Закончив работу, я отдохнул»:',en:'"Having finished work, I rested":'},"Ishni tugatib, dam oldim.","Ishni tugatsa, dam oldim.","Ishni tugatgan, dam oldim."],
       [{ar:'«وأنا أمشي فكّرتُ»:',ru:'«Идя, я думал»:',en:'"While walking, I was thinking":'},"Yurayotib, o'yladim.","Yurib bo'lmaydi, o'yladim.","Yurmoqchi, o'yladim."]]},
{title:{ar:'أدوات الربط في الأسلوب الرسمي', ru:'Связки книжного стиля', en:'Connectors of formal style'},
 body:{
 ar:`<p>[[-ga qaramay]] = على الرغم من، [[-gani sababli]] / [[tufayli]] = بسبب، [[shuning uchun]] = لذلك، [[biroq]] = لكنّ، [[shunday qilib]] = وهكذا.</p>
<p class="tip">[[Qiyinchiliklarga qaramay, loyiha o'z vaqtida yakunlandi.]]</p>`,
 ru:`<p>[[-ga qaramay]] = несмотря на, [[-gani sababli]] / [[tufayli]] = из-за, благодаря, [[shuning uchun]] = поэтому, [[biroq]] = однако, [[shunday qilib]] = таким образом.</p>
<p class="tip">[[Qiyinchiliklarga qaramay, loyiha o'z vaqtida yakunlandi.]]</p>`,
 en:`<p>[[-ga qaramay]] = despite, [[-gani sababli]] / [[tufayli]] = because of, thanks to, [[shuning uchun]] = therefore, [[biroq]] = however, [[shunday qilib]] = thus.</p>
<p class="tip">[[Qiyinchiliklarga qaramay, loyiha o'z vaqtida yakunlandi.]]</p>`},
 ex:`Qiyinchiliklarga qaramay, loyiha o'z vaqtida yakunlandi.|رغم الصعوبات أُنجز المشروع في وقته.|Несмотря на трудности, проект завершили вовремя.|Despite the difficulties, the project was finished on time.
Yomg'ir yog'gani sababli, uchrashuv qoldirildi.|بسبب المطر أُجِّل اللقاء.|Из-за дождя встречу перенесли.|Because of the rain, the meeting was postponed.
Shuning uchun biz rejani o'zgartirdik.|لذلك غيّرنا الخطة.|Поэтому мы изменили план.|That's why we changed the plan.`,
 quiz:[[{ar:'«رغم المطر»:',ru:'«несмотря на дождь»:',en:'"despite the rain":'},"yomg'irga qaramay","yomg'ir sababli","yomg'irdan keyin"],
       [{ar:'«لذلك»:',ru:'«поэтому»:',en:'"therefore":'},"shuning uchun","biroq","qaramay"]]},
{title:{ar:'الإمكان والاستحالة: mumkin و ‎-ib boʻlmaydi‎', ru:'Можно и нельзя: mumkin и -ib boʻlmaydi', en:'Possible and impossible: mumkin and -ib boʻlmaydi'},
 body:{
 ar:`<p>[[-ish mumkin]] = يمكن / مسموح: [[Bu yerda suratga olish mumkin.]]</p>
<p>[[-ib bo'lmaydi]] = لا يمكن: [[Bitta misoldan xulosa chiqarib bo'lmaydi.]] = لا يمكن الاستنتاج من مثال واحد.</p>`,
 ru:`<p>[[-ish mumkin]] = можно: [[Bu yerda suratga olish mumkin.]]</p>
<p>[[-ib bo'lmaydi]] = нельзя, невозможно: [[Bitta misoldan xulosa chiqarib bo'lmaydi.]] = Нельзя делать выводы из одного примера.</p>`,
 en:`<p>[[-ish mumkin]] = it is possible / allowed: [[Bu yerda suratga olish mumkin.]]</p>
<p>[[-ib bo'lmaydi]] = it is impossible: [[Bitta misoldan xulosa chiqarib bo'lmaydi.]] = One cannot draw conclusions from a single example.</p>`},
 ex:`Bu yerda suratga olish mumkin.|يمكن التصوير هنا.|Здесь можно фотографировать.|You may take photos here.
Bitta misoldan xulosa chiqarib bo'lmaydi.|لا يمكن الاستنتاج من مثال واحد.|Нельзя делать выводы из одного примера.|One can't draw conclusions from a single example.
Uning qilmishini oqlab bo'lmaydi.|لا يمكن تبرير فعلته.|Его поступок нельзя оправдать.|His act cannot be justified.`,
 quiz:[[{ar:'«لا يمكن فهمه»:',ru:'«Это невозможно понять»:',en:'"It\'s impossible to understand":'},"Tushunib bo'lmaydi.","Tushunish kerak.","Tushunmoqchi."],
       [{ar:'«هل يمكن الدخول؟»:',ru:'«Можно войти?»:',en:'"May I come in?":'},"Kirish mumkinmi?","Kirib bo'lmaydi?","Kirdimmi?"]]}
],
C2: [
{title:{ar:'الكلام المنقول: deb و ‎-ganini/-ishini‎', ru:'Косвенная речь: deb и -ganini/-ishini', en:'Reported speech: deb and -ganini/-ishini'},
 body:{
 ar:`<p>الاقتباس المباشر يُختم بـ [[deb]]: [[U «Ertaga kelaman», deb aytdi.]]</p>
<p>الكلام غير المباشر يحوّل الفعل إلى مصدر بلاحقة ملكية: [[U keyinroq kelishini aytdi.]] = قال إنه سيأتي لاحقاً؛ [[U charchaganini aytdi.]] = قال إنه متعب.</p>`,
 ru:`<p>Прямая речь заканчивается словом [[deb]]: [[U «Ertaga kelaman», deb aytdi.]]</p>
<p>В косвенной речи глагол превращается в отглагольное имя с притяжательным окончанием: [[U keyinroq kelishini aytdi.]] = Он сказал, что придёт позже; [[U charchaganini aytdi.]] = Он сказал, что устал.</p>`,
 en:`<p>A direct quote is closed with [[deb]]: [[U «Ertaga kelaman», deb aytdi.]]</p>
<p>In indirect speech, the verb becomes a noun form with a possessive ending: [[U keyinroq kelishini aytdi.]] = He said he would come later; [[U charchaganini aytdi.]] = He said he was tired.</p>`},
 ex:`U «Ertaga kelaman», deb aytdi.|قال: «سآتي غداً».|Он сказал: «Приду завтра».|He said, "I'll come tomorrow."
U keyinroq kelishini aytdi.|قال إنه سيأتي لاحقاً.|Он сказал, что придёт позже.|He said he would come later.
U qayerda ishlashimni so'radi.|سألني أين أعمل.|Он спросил, где я работаю.|He asked where I work.`,
 quiz:[[{ar:'«قالت إنها متعبة»:',ru:'«Она сказала, что устала»:',en:'"She said she was tired":'},"U charchaganini aytdi.","U charchaydi aytdi.","U charchagan so'radi."],
       [{ar:'إنهاء الاقتباس المباشر بكلمة:',ru:'Прямую речь закрывает слово:',en:'A direct quote is closed with:'},"deb","emas","bilan"]]},
{title:{ar:'أدوات التوكيد والإيحاء: ‎-ku, -chi, -da, -oq‎', ru:'Частицы -ku, -chi, -da, -oq', en:'Nuance particles: -ku, -chi, -da, -oq'},
 body:{
 ar:`<p>[[-ku]] = «ألم أقل؟» / تأكيد: [[Aytdim-ku!]] — [[-chi]] = «وماذا عن…؟» أو حثّ: [[Sen-chi?]] (وأنت؟)، [[Kelsang-chi!]] (تعالَ إذن!) — [[-da]] = توكيد ودّي: [[Bo'ldi-da!]] (يكفي!) — [[-oq]]/[[-yoq]] = «فور / حتى»: [[kirishi bilanoq]] = فور دخوله.</p>`,
 ru:`<p>[[-ku]] = «же», «ведь»: [[Aytdim-ku!]] — [[-chi]] = «а как же…?» или побуждение: [[Sen-chi?]] (А ты?), [[Kelsang-chi!]] (Ну приходи же!) — [[-da]] = смягчённое усиление: [[Bo'ldi-da!]] (Ну хватит!) — [[-oq]]/[[-yoq]] = «сразу, даже»: [[kirishi bilanoq]] = как только он вошёл.</p>`,
 en:`<p>[[-ku]] = "but I told you!" / emphasis: [[Aytdim-ku!]] — [[-chi]] = "what about…?" or urging: [[Sen-chi?]] (And you?), [[Kelsang-chi!]] (Come on, do come!) — [[-da]] = friendly emphasis: [[Bo'ldi-da!]] (That's enough!) — [[-oq]]/[[-yoq]] = "as soon as / even": [[kirishi bilanoq]] = as soon as he entered.</p>`},
 ex:`Aytdim-ku!|ألم أقل لك!|Я же говорил!|I told you!
Sen-chi?|وأنت؟|А ты?|And you?
U kirishi bilanoq hamma jim bo'ldi.|ما إن دخل حتى سكت الجميع.|Как только он вошёл, все замолчали.|As soon as he came in, everyone fell silent.`,
 quiz:[[{ar:'«وأنت؟»:',ru:'«А ты?»:',en:'"And you?":'},"Sen-chi?","Sen-ku?","Sen-da?"],
       [{ar:'«ألم أقل لك!»:',ru:'«Я же говорил!»:',en:'"I told you!":'},"Aytdim-ku!","Aytdim-chi?","Aytmadim-oq."]]}
]};
