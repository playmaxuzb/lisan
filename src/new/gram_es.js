// Spanish grammar. Bodies in ar/ru/en; examples "es|ar|ru|en"
GR.es = {
A1: [
{title:{ar:'فعلا «يكون»: ser و estar', ru:'Два глагола «быть»: ser и estar', en:'Two verbs "to be": ser and estar'},
 body:{
 ar:`<p>في الإسبانية فعلان بمعنى «يكون». [[ser]] للصفات الدائمة والهوية: [[Soy médico.]] (أنا طبيب). [[estar]] للمكان والحالة المؤقتة: [[Estoy cansado.]] (أنا متعب).</p>
<table><tr><th></th><th>ser</th><th>estar</th></tr><tr><td>أنا yo</td><td>[[soy]]</td><td>[[estoy]]</td></tr><tr><td>أنتَ tú</td><td>[[eres]]</td><td>[[estás]]</td></tr><tr><td>هو/هي/حضرتك</td><td>[[es]]</td><td>[[está]]</td></tr><tr><td>نحن</td><td>[[somos]]</td><td>[[estamos]]</td></tr><tr><td>أنتم</td><td>[[sois]]</td><td>[[estáis]]</td></tr><tr><td>هم</td><td>[[son]]</td><td>[[están]]</td></tr></table>
<p class="tip">الضمير يُحذف غالباً لأن الفعل يدل عليه: [[Soy de Jordania.]] = أنا من الأردن.</p>`,
 ru:`<p>В испанском два глагола «быть». [[ser]] — постоянные свойства, профессия, происхождение: [[Soy médico.]] (Я врач). [[estar]] — местонахождение и временное состояние: [[Estoy cansado.]] (Я устал).</p>
<table><tr><th></th><th>ser</th><th>estar</th></tr><tr><td>я yo</td><td>[[soy]]</td><td>[[estoy]]</td></tr><tr><td>ты tú</td><td>[[eres]]</td><td>[[estás]]</td></tr><tr><td>он/она/вы (usted)</td><td>[[es]]</td><td>[[está]]</td></tr><tr><td>мы</td><td>[[somos]]</td><td>[[estamos]]</td></tr><tr><td>вы</td><td>[[sois]]</td><td>[[estáis]]</td></tr><tr><td>они</td><td>[[son]]</td><td>[[están]]</td></tr></table>
<p class="tip">Местоимение обычно опускается — форма глагола и так показывает лицо: [[Soy de Rusia.]] = Я из России.</p>`,
 en:`<p>Spanish has two verbs for "to be". [[ser]] is for identity, profession and origin: [[Soy médico.]] (I'm a doctor). [[estar]] is for location and temporary states: [[Estoy cansado.]] (I'm tired).</p>
<table><tr><th></th><th>ser</th><th>estar</th></tr><tr><td>I yo</td><td>[[soy]]</td><td>[[estoy]]</td></tr><tr><td>you tú</td><td>[[eres]]</td><td>[[estás]]</td></tr><tr><td>he/she/you (usted)</td><td>[[es]]</td><td>[[está]]</td></tr><tr><td>we</td><td>[[somos]]</td><td>[[estamos]]</td></tr><tr><td>you (pl.)</td><td>[[sois]]</td><td>[[estáis]]</td></tr><tr><td>they</td><td>[[son]]</td><td>[[están]]</td></tr></table>
<p class="tip">The pronoun is usually dropped — the verb already shows the person: [[Soy de Inglaterra.]] = I'm from England.</p>`},
 ex:`Soy estudiante.|أنا طالب.|Я студент.|I'm a student.
Mi madre está en casa.|أمي في البيت.|Мама дома.|My mother is at home.
Estamos cansados.|نحن متعبون.|Мы устали.|We're tired.
Madrid es grande.|مدريد كبيرة.|Мадрид большой.|Madrid is big.
¿Dónde está el baño?|أين الحمّام؟|Где туалет?|Where is the bathroom?`,
 quiz:[[{ar:'«أنا متعب الآن»:',ru:'«Я сейчас устал»:',en:'"I am tired now":'},"Estoy cansado.","Soy cansado.","Es cansado."],
       [{ar:'«نحن أصدقاء»:',ru:'«Мы друзья»:',en:'"We are friends":'},"Somos amigos.","Estamos amigos.","Son amigos."]]},
{title:{ar:'المذكر والمؤنث وأدوات التعريف', ru:'Род и артикли', en:'Gender and articles'},
 body:{
 ar:`<p>كل اسم مذكر أو مؤنث. غالباً: ما ينتهي بـ ‎-o‎ مذكر، وما ينتهي بـ ‎-a‎ مؤنث.</p>
<table><tr><th></th><th>مذكر</th><th>مؤنث</th></tr><tr><td>الـ (مفرد)</td><td>[[el libro]]</td><td>[[la casa]]</td></tr><tr><td>الـ (جمع)</td><td>[[los libros]]</td><td>[[las casas]]</td></tr><tr><td>نكرة</td><td>[[un libro]]</td><td>[[una casa]]</td></tr></table>
<p class="tip">الجمع: ‎-s‎ بعد حرف علّة، ‎-es‎ بعد ساكن: [[ciudad]] ← [[ciudades]]. والصفة تطابق الاسم: [[la casa blanca]].</p>`,
 ru:`<p>У каждого существительного есть род. Обычно на -o — мужской, на -a — женский.</p>
<table><tr><th></th><th>муж. р.</th><th>жен. р.</th></tr><tr><td>опред. ед. ч.</td><td>[[el libro]]</td><td>[[la casa]]</td></tr><tr><td>опред. мн. ч.</td><td>[[los libros]]</td><td>[[las casas]]</td></tr><tr><td>неопред.</td><td>[[un libro]]</td><td>[[una casa]]</td></tr></table>
<p class="tip">Множественное число: -s после гласной, -es после согласной: [[ciudad]] → [[ciudades]]. Прилагательное согласуется: [[la casa blanca]].</p>`,
 en:`<p>Every noun is masculine or feminine. Usually nouns in -o are masculine and nouns in -a are feminine.</p>
<table><tr><th></th><th>masc.</th><th>fem.</th></tr><tr><td>the (sing.)</td><td>[[el libro]]</td><td>[[la casa]]</td></tr><tr><td>the (pl.)</td><td>[[los libros]]</td><td>[[las casas]]</td></tr><tr><td>a / an</td><td>[[un libro]]</td><td>[[una casa]]</td></tr></table>
<p class="tip">Plural: -s after a vowel, -es after a consonant: [[ciudad]] → [[ciudades]]. Adjectives agree: [[la casa blanca]].</p>`},
 ex:`El libro es interesante.|الكتاب ممتع.|Книга интересная.|The book is interesting.
La casa es blanca.|البيت أبيض.|Дом белый.|The house is white.
Tengo un hermano y una hermana.|عندي أخ وأخت.|У меня есть брат и сестра.|I have a brother and a sister.
Las ciudades son grandes.|المدن كبيرة.|Города большие.|The cities are big.`,
 quiz:[[{ar:'«الكتب»:',ru:'«книги» (с артиклем):',en:'"the books":'},"los libros","las libros","el libros"],
       [{ar:'«بيت أبيض»:',ru:'«белый дом»:',en:'"a white house":'},"una casa blanca","un casa blanco","una casa blanco"]]},
{title:{ar:'المضارع للأفعال المنتظمة: ‎-ar, -er, -ir‎', ru:'Настоящее время правильных глаголов: -ar, -er, -ir', en:'Present tense of regular verbs: -ar, -er, -ir'},
 body:{
 ar:`<p>نحذف ‎-ar/-er/-ir‎ ونضيف اللاحقة:</p>
<table><tr><th></th><th>hablar يتكلم</th><th>comer يأكل</th><th>vivir يعيش</th></tr><tr><td>yo</td><td>[[hablo]]</td><td>[[como]]</td><td>[[vivo]]</td></tr><tr><td>tú</td><td>[[hablas]]</td><td>[[comes]]</td><td>[[vives]]</td></tr><tr><td>él/ella</td><td>[[habla]]</td><td>[[come]]</td><td>[[vive]]</td></tr><tr><td>nosotros</td><td>[[hablamos]]</td><td>[[comemos]]</td><td>[[vivimos]]</td></tr><tr><td>vosotros</td><td>[[habláis]]</td><td>[[coméis]]</td><td>[[vivís]]</td></tr><tr><td>ellos</td><td>[[hablan]]</td><td>[[comen]]</td><td>[[viven]]</td></tr></table>`,
 ru:`<p>Отбрасываем -ar/-er/-ir и добавляем окончание:</p>
<table><tr><th></th><th>hablar говорить</th><th>comer есть</th><th>vivir жить</th></tr><tr><td>yo</td><td>[[hablo]]</td><td>[[como]]</td><td>[[vivo]]</td></tr><tr><td>tú</td><td>[[hablas]]</td><td>[[comes]]</td><td>[[vives]]</td></tr><tr><td>él/ella</td><td>[[habla]]</td><td>[[come]]</td><td>[[vive]]</td></tr><tr><td>nosotros</td><td>[[hablamos]]</td><td>[[comemos]]</td><td>[[vivimos]]</td></tr><tr><td>vosotros</td><td>[[habláis]]</td><td>[[coméis]]</td><td>[[vivís]]</td></tr><tr><td>ellos</td><td>[[hablan]]</td><td>[[comen]]</td><td>[[viven]]</td></tr></table>`,
 en:`<p>Drop -ar/-er/-ir and add the ending:</p>
<table><tr><th></th><th>hablar speak</th><th>comer eat</th><th>vivir live</th></tr><tr><td>yo</td><td>[[hablo]]</td><td>[[como]]</td><td>[[vivo]]</td></tr><tr><td>tú</td><td>[[hablas]]</td><td>[[comes]]</td><td>[[vives]]</td></tr><tr><td>él/ella</td><td>[[habla]]</td><td>[[come]]</td><td>[[vive]]</td></tr><tr><td>nosotros</td><td>[[hablamos]]</td><td>[[comemos]]</td><td>[[vivimos]]</td></tr><tr><td>vosotros</td><td>[[habláis]]</td><td>[[coméis]]</td><td>[[vivís]]</td></tr><tr><td>ellos</td><td>[[hablan]]</td><td>[[comen]]</td><td>[[viven]]</td></tr></table>`},
 ex:`Hablo un poco de español.|أتكلم قليلاً من الإسبانية.|Я немного говорю по-испански.|I speak a little Spanish.
¿Dónde vives?|أين تسكن؟|Где ты живёшь?|Where do you live?
Comemos a las dos.|نتغدّى في الساعة الثانية.|Мы обедаем в два.|We have lunch at two.
Ellos trabajan en un banco.|هم يعملون في بنك.|Они работают в банке.|They work in a bank.`,
 quiz:[[{ar:'«نحن نعيش»:',ru:'«мы живём»:',en:'"we live":'},"vivimos","vivemos","viven"],
       [{ar:'«أنتَ تتكلم»:',ru:'«ты говоришь»:',en:'"you speak" (tú):'},"hablas","hables","hablo"]]},
{title:{ar:'النفي والأسئلة', ru:'Отрицание и вопросы', en:'Negation and questions'},
 body:{
 ar:`<p>النفي: [[no]] قبل الفعل: [[No hablo ruso.]] = لا أتكلم الروسية.</p>
<p>السؤال: علامة استفهام مقلوبة في البداية [[¿]] وعادية في النهاية. أدوات الاستفهام عليها شدّة: [[qué]] ماذا، [[quién]] من، [[dónde]] أين، [[cuándo]] متى، [[cómo]] كيف، [[cuánto]] كم، [[por qué]] لماذا.</p>`,
 ru:`<p>Отрицание: [[no]] перед глаголом: [[No hablo inglés.]] = Я не говорю по-английски.</p>
<p>Вопрос: перевёрнутый знак [[¿]] в начале и обычный в конце. Вопросительные слова пишутся с ударением: [[qué]] что, [[quién]] кто, [[dónde]] где, [[cuándo]] когда, [[cómo]] как, [[cuánto]] сколько, [[por qué]] почему.</p>`,
 en:`<p>Negation: put [[no]] before the verb: [[No hablo ruso.]] = I don't speak Russian.</p>
<p>Questions start with an upside-down [[¿]] and end with a normal question mark. Question words carry an accent: [[qué]] what, [[quién]] who, [[dónde]] where, [[cuándo]] when, [[cómo]] how, [[cuánto]] how much, [[por qué]] why.</p>`},
 ex:`No entiendo.|لا أفهم.|Я не понимаю.|I don't understand.
¿Cómo te llamas?|ما اسمك؟|Как тебя зовут?|What's your name?
¿Cuánto cuesta?|بكم؟|Сколько стоит?|How much is it?
¿Por qué no comes?|لماذا لا تأكل؟|Почему ты не ешь?|Why aren't you eating?`,
 quiz:[[{ar:'«لا أعمل»:',ru:'«Я не работаю»:',en:'"I don\'t work":'},"No trabajo.","Trabajo no.","No trabajas."],
       [{ar:'«أين؟»:',ru:'«Где?»:',en:'"Where?":'},"¿Dónde?","¿Cuándo?","¿Quién?"]]}
],
A2: [
{title:{ar:'الفعل gustar: «يعجبني»', ru:'Глагол gustar: «мне нравится»', en:'The verb gustar: "I like"'},
 body:{
 ar:`<p>[[gustar]] يعمل مثل «يعجبني» بالعربية تماماً: الشيء المحبوب هو الفاعل. [[Me gusta el té.]] = يعجبني الشاي. ومع الجمع: [[Me gustan las flores.]]</p>
<p>الضمائر: [[me]] لي، [[te]] لك، [[le]] له/لها، [[nos]] لنا، [[os]] لكم، [[les]] لهم.</p>`,
 ru:`<p>[[gustar]] строится как русское «мне нравится»: то, что нравится, — подлежащее. [[Me gusta el té.]] = Мне нравится чай. Во множественном числе: [[Me gustan las flores.]]</p>
<p>Местоимения: [[me]] мне, [[te]] тебе, [[le]] ему/ей, [[nos]] нам, [[os]] вам, [[les]] им.</p>`,
 en:`<p>[[gustar]] works like "… is pleasing to me": the thing liked is the subject. [[Me gusta el té.]] = I like tea. With plurals: [[Me gustan las flores.]]</p>
<p>Pronouns: [[me]] (to) me, [[te]] you, [[le]] him/her, [[nos]] us, [[os]] you (pl.), [[les]] them.</p>`},
 ex:`Me gusta leer.|أحب القراءة.|Мне нравится читать.|I like reading.
¿Te gustan los gatos?|هل تحب القطط؟|Тебе нравятся кошки?|Do you like cats?
A mi hermano le gusta el fútbol.|أخي يحب كرة القدم.|Моему брату нравится футбол.|My brother likes football.
No nos gusta el frío.|لا نحب البرد.|Мы не любим холод.|We don't like the cold.`,
 quiz:[[{ar:'«أحب الفواكه»:',ru:'«Мне нравятся фрукты»:',en:'"I like fruit (plural)":'},"Me gustan las frutas.","Me gusta las frutas.","Yo gusto las frutas."],
       [{ar:'«هل يعجبك؟» (tú):',ru:'«Тебе нравится?»:',en:'"Do you like it?" (tú):'},"¿Te gusta?","¿Le gusto?","¿Me gustas?"]]},
{title:{ar:'الماضي البسيط: pretérito indefinido', ru:'Простое прошедшее: pretérito indefinido', en:'The simple past: pretérito indefinido'},
 body:{
 ar:`<p>لحدث انتهى في وقت محدد (أمس، السنة الماضية):</p>
<table><tr><th></th><th>hablar</th><th>comer / vivir</th></tr><tr><td>yo</td><td>[[hablé]]</td><td>[[comí]]</td></tr><tr><td>tú</td><td>[[hablaste]]</td><td>[[comiste]]</td></tr><tr><td>él</td><td>[[habló]]</td><td>[[comió]]</td></tr><tr><td>nosotros</td><td>[[hablamos]]</td><td>[[comimos]]</td></tr><tr><td>ellos</td><td>[[hablaron]]</td><td>[[comieron]]</td></tr></table>
<p class="tip">أفعال شاذة شائعة: [[fui]] (ذهبتُ / كنتُ)، [[tuve]] (كان عندي)، [[hice]] (فعلتُ).</p>`,
 ru:`<p>Для законченного действия в определённый момент (вчера, в прошлом году):</p>
<table><tr><th></th><th>hablar</th><th>comer / vivir</th></tr><tr><td>yo</td><td>[[hablé]]</td><td>[[comí]]</td></tr><tr><td>tú</td><td>[[hablaste]]</td><td>[[comiste]]</td></tr><tr><td>él</td><td>[[habló]]</td><td>[[comió]]</td></tr><tr><td>nosotros</td><td>[[hablamos]]</td><td>[[comimos]]</td></tr><tr><td>ellos</td><td>[[hablaron]]</td><td>[[comieron]]</td></tr></table>
<p class="tip">Частые неправильные формы: [[fui]] (я пошёл / был), [[tuve]] (у меня было), [[hice]] (я сделал).</p>`,
 en:`<p>For a finished action at a definite time (yesterday, last year):</p>
<table><tr><th></th><th>hablar</th><th>comer / vivir</th></tr><tr><td>yo</td><td>[[hablé]]</td><td>[[comí]]</td></tr><tr><td>tú</td><td>[[hablaste]]</td><td>[[comiste]]</td></tr><tr><td>él</td><td>[[habló]]</td><td>[[comió]]</td></tr><tr><td>nosotros</td><td>[[hablamos]]</td><td>[[comimos]]</td></tr><tr><td>ellos</td><td>[[hablaron]]</td><td>[[comieron]]</td></tr></table>
<p class="tip">Common irregulars: [[fui]] (I went / was), [[tuve]] (I had), [[hice]] (I did).</p>`},
 ex:`Ayer fui al cine.|ذهبت أمس إلى السينما.|Вчера я ходил в кино.|Yesterday I went to the cinema.
Comimos en un restaurante.|أكلنا في مطعم.|Мы поели в ресторане.|We ate at a restaurant.
¿Cuándo llegaste?|متى وصلت؟|Когда ты приехал?|When did you arrive?
El año pasado visité Granada.|زرت غرناطة السنة الماضية.|В прошлом году я был в Гранаде.|Last year I visited Granada.`,
 quiz:[[{ar:'«تكلمتُ»:',ru:'«я поговорил»:',en:'"I spoke":'},"hablé","habló","hablo"],
       [{ar:'«أكلوا»:',ru:'«они поели»:',en:'"they ate":'},"comieron","comimos","comen"]]},
{title:{ar:'المستقبل القريب: ir a + مصدر', ru:'Ближайшее будущее: ir a + инфинитив', en:'Near future: ir a + infinitive'},
 body:{
 ar:`<p>«سوف / سأقوم بـ» = [[ir]] (يذهب) مصرَّفاً + [[a]] + المصدر: [[Voy a estudiar.]] = سأدرس.</p>
<p>[[voy, vas, va, vamos, vais, van]]</p>`,
 ru:`<p>«Собираюсь / буду» = спрягаемый [[ir]] (идти) + [[a]] + инфинитив: [[Voy a estudiar.]] = Я буду учиться.</p>
<p>[[voy, vas, va, vamos, vais, van]]</p>`,
 en:`<p>"Going to" = [[ir]] (to go), conjugated + [[a]] + infinitive: [[Voy a estudiar.]] = I'm going to study.</p>
<p>[[voy, vas, va, vamos, vais, van]]</p>`},
 ex:`Voy a llamar a mi madre.|سأتصل بأمي.|Я позвоню маме.|I'm going to call my mother.
¿Qué vas a hacer mañana?|ماذا ستفعل غداً؟|Что ты будешь делать завтра?|What are you going to do tomorrow?
Vamos a viajar en verano.|سنسافر في الصيف.|Летом мы поедем путешествовать.|We're going to travel in summer.`,
 quiz:[[{ar:'«سنأكل»:',ru:'«мы будем есть»:',en:'"we are going to eat":'},"Vamos a comer.","Vamos comer.","Van a comer."],
       [{ar:'«سيعمل (هو)»:',ru:'«он будет работать»:',en:'"he is going to work":'},"Va a trabajar.","Voy a trabajar.","Va trabajar."]]},
{title:{ar:'الماضي التام: pretérito perfecto', ru:'Пройденное время с haber: pretérito perfecto', en:'The present perfect: pretérito perfecto'},
 body:{
 ar:`<p>لحدث في فترة لم تنتهِ (اليوم، هذا الأسبوع) أو تجربة: [[haber]] + اسم المفعول (‎-ado / -ido‎).</p>
<p>[[he, has, ha, hemos, habéis, han]] + [[hablado]] / [[comido]]. مثال: [[Hoy he trabajado mucho.]]</p>
<p class="tip">أفعال شاذة: [[hecho]] (مفعول)، [[visto]] (مرئي)، [[escrito]] (مكتوب).</p>`,
 ru:`<p>Для действия в незаконченный период (сегодня, на этой неделе) или опыта: [[haber]] + причастие (-ado / -ido).</p>
<p>[[he, has, ha, hemos, habéis, han]] + [[hablado]] / [[comido]]. Пример: [[Hoy he trabajado mucho.]]</p>
<p class="tip">Неправильные причастия: [[hecho]] (сделано), [[visto]] (увидено), [[escrito]] (написано).</p>`,
 en:`<p>For an action in an unfinished period (today, this week) or for experience: [[haber]] + past participle (-ado / -ido).</p>
<p>[[he, has, ha, hemos, habéis, han]] + [[hablado]] / [[comido]]. Example: [[Hoy he trabajado mucho.]]</p>
<p class="tip">Irregular participles: [[hecho]] (done), [[visto]] (seen), [[escrito]] (written).</p>`},
 ex:`Ya he leído este libro.|قرأت هذا الكتاب من قبل.|Я уже прочитал эту книгу.|I've already read this book.
¿Has estado en Sevilla?|هل زرت إشبيلية؟|Ты бывал в Севилье?|Have you been to Seville?
Hoy no hemos comido.|لم نأكل اليوم.|Сегодня мы не обедали.|We haven't eaten today.`,
 quiz:[[{ar:'«شاهدتُ (اليوم)»:',ru:'«я (сегодня) посмотрел»:',en:'"I have seen":'},"he visto","he veído","ha visto"],
       [{ar:'«هل أكلتَ؟»:',ru:'«Ты поел?»:',en:'"Have you eaten?":'},"¿Has comido?","¿Ha comiste?","¿Has comer?"]]}
],
B1: [
{title:{ar:'الماضي المستمر: imperfecto', ru:'Имперфект: imperfecto', en:'The imperfect: imperfecto'},
 body:{
 ar:`<p>للوصف والعادات في الماضي («كنتُ أفعل»): ‎-ar → -aba‎، ‎-er/-ir → -ía‎.</p>
<p>[[hablaba, hablabas, hablaba, hablábamos, hablaban]] — [[comía, comías, comía, comíamos, comían]]</p>
<p class="tip">قارن: [[Cuando era niño, vivía en un pueblo.]] (وصف وعادة) — [[Un día fui a la ciudad.]] (حدث واحد).</p>`,
 ru:`<p>Для описания и привычек в прошлом («бывало», несовершенный вид): -ar → -aba, -er/-ir → -ía.</p>
<p>[[hablaba, hablabas, hablaba, hablábamos, hablaban]] — [[comía, comías, comía, comíamos, comían]]</p>
<p class="tip">Сравните: [[Cuando era niño, vivía en un pueblo.]] (описание) — [[Un día fui a la ciudad.]] (единичное событие).</p>`,
 en:`<p>For descriptions and habits in the past ("I used to / was doing"): -ar → -aba, -er/-ir → -ía.</p>
<p>[[hablaba, hablabas, hablaba, hablábamos, hablaban]] — [[comía, comías, comía, comíamos, comían]]</p>
<p class="tip">Compare: [[Cuando era niño, vivía en un pueblo.]] (background) — [[Un día fui a la ciudad.]] (a single event).</p>`},
 ex:`Antes vivía en un pueblo.|كنت أعيش في قرية.|Раньше я жил в деревне.|I used to live in a village.
Hacía sol y todos estaban contentos.|كان الجو مشمساً والجميع سعداء.|Светило солнце, и все были довольны.|It was sunny and everyone was happy.
Mientras leía, sonó el teléfono.|بينما كنت أقرأ رنّ الهاتف.|Пока я читал, зазвонил телефон.|While I was reading, the phone rang.`,
 quiz:[[{ar:'«كنا نعيش»:',ru:'«мы жили (раньше)»:',en:'"we used to live":'},"vivíamos","vivimos","vivíamos ido"],
       [{ar:'«بينما كنت أطبخ…»:',ru:'«Пока я готовил…»:',en:'"While I was cooking…":'},"Mientras cocinaba…","Mientras cociné…","Mientras cocinaré…"]]},
{title:{ar:'المستقبل البسيط', ru:'Простое будущее время', en:'The simple future'},
 body:{
 ar:`<p>نضيف إلى المصدر كاملاً: ‎-é, -ás, -á, -emos, -éis, -án‎: [[hablaré]] (سأتكلم)، [[viviremos]] (سنعيش).</p>
<p class="tip">شواذ: [[tendré]] (سيكون عندي)، [[haré]] (سأفعل)، [[podré]] (سأستطيع)، [[vendré]] (سآتي).</p>`,
 ru:`<p>К полному инфинитиву добавляются окончания -é, -ás, -á, -emos, -éis, -án: [[hablaré]] (я буду говорить), [[viviremos]] (мы будем жить).</p>
<p class="tip">Исключения: [[tendré]] (у меня будет), [[haré]] (сделаю), [[podré]] (смогу), [[vendré]] (приду).</p>`,
 en:`<p>Add -é, -ás, -á, -emos, -éis, -án to the whole infinitive: [[hablaré]] (I will speak), [[viviremos]] (we will live).</p>
<p class="tip">Irregulars: [[tendré]] (I'll have), [[haré]] (I'll do), [[podré]] (I'll be able), [[vendré]] (I'll come).</p>`},
 ex:`Lo haré mañana.|سأفعله غداً.|Я сделаю это завтра.|I'll do it tomorrow.
Esta noche llamaré a mi madre.|سأتصل الليلة بأمي.|Вечером позвоню маме.|Tonight I'll call my mother.
Según los expertos, la economía crecerá.|حسب الخبراء سينمو الاقتصاد.|По мнению экспертов, экономика вырастет.|According to experts, the economy will grow.`,
 quiz:[[{ar:'«سآتي»:',ru:'«я приду»:',en:'"I will come":'},"vendré","veniré","vengo"],
       [{ar:'«سنعيش»:',ru:'«мы будем жить»:',en:'"we will live":'},"viviremos","vivimos","vivíamos"]]},
{title:{ar:'ضمائر المفعول به: lo, la, le', ru:'Местоимения-дополнения: lo, la, le', en:'Object pronouns: lo, la, le'},
 body:{
 ar:`<p>المفعول المباشر: [[lo]] (هو)، [[la]] (هي)، [[los]]، [[las]]. غير المباشر (لـ): [[le]]، [[les]]. يأتي الضمير قبل الفعل المصرَّف: [[Lo veo.]] = أراه.</p>
<p class="tip">مع المصدر والأمر يتصل بآخره: [[Quiero comprarlo.]]، [[Dímelo.]]</p>`,
 ru:`<p>Прямое дополнение: [[lo]] (его), [[la]] (её), [[los]], [[las]]. Косвенное (кому?): [[le]], [[les]]. Местоимение стоит перед спрягаемым глаголом: [[Lo veo.]] = Я его вижу.</p>
<p class="tip">С инфинитивом и повелительным наклонением пишется слитно в конце: [[Quiero comprarlo.]], [[Dímelo.]]</p>`,
 en:`<p>Direct object: [[lo]] (him/it), [[la]] (her/it), [[los]], [[las]]. Indirect (to someone): [[le]], [[les]]. The pronoun goes before a conjugated verb: [[Lo veo.]] = I see him.</p>
<p class="tip">With an infinitive or command it attaches to the end: [[Quiero comprarlo.]], [[Dímelo.]]</p>`},
 ex:`¿Conoces a Ana? — Sí, la conozco.|هل تعرف آنا؟ — نعم، أعرفها.|Ты знаешь Анну? — Да, знаю её.|Do you know Ana? — Yes, I know her.
Le escribí una carta.|كتبتُ له رسالة.|Я написал ему письмо.|I wrote him a letter.
Quiero comprarlo.|أريد أن أشتريه.|Я хочу его купить.|I want to buy it.`,
 quiz:[[{ar:'«أراها»:',ru:'«я её вижу»:',en:'"I see her":'},"La veo.","Le veo la.","Veo la."],
       [{ar:'«قل لي ذلك»:',ru:'«Скажи мне это»:',en:'"Tell me it":'},"Dímelo.","Me lo di.","Lo dime."]]},
{title:{ar:'por و para', ru:'por и para', en:'por and para'},
 body:{
 ar:`<p>[[para]] = الهدف والوجهة والمستفيد: [[Estudio para aprender.]]، [[un regalo para ti]].</p>
<p>[[por]] = السبب والوسيلة والمكان العابر: [[Gracias por tu ayuda.]]، [[Paseamos por el parque.]]</p>`,
 ru:`<p>[[para]] — цель, назначение, адресат: [[Estudio para aprender.]], [[un regalo para ti]].</p>
<p>[[por]] — причина, способ, движение «по»: [[Gracias por tu ayuda.]], [[Paseamos por el parque.]]</p>`,
 en:`<p>[[para]] = purpose, destination, recipient: [[Estudio para aprender.]], [[un regalo para ti]].</p>
<p>[[por]] = cause, means, moving through: [[Gracias por tu ayuda.]], [[Paseamos por el parque.]]</p>`},
 ex:`Este regalo es para ti.|هذه الهدية لك.|Этот подарок для тебя.|This gift is for you.
Gracias por tu apoyo.|شكراً على دعمك.|Спасибо за поддержку.|Thanks for your support.
Te llamo por teléfono.|سأتصل بك بالهاتف.|Позвоню тебе по телефону.|I'll call you on the phone.`,
 quiz:[[{ar:'«شكراً على المساعدة»:',ru:'«Спасибо за помощь»:',en:'"Thanks for the help":'},"Gracias por la ayuda.","Gracias para la ayuda.","Gracias de la ayuda."],
       [{ar:'«أدرس لكي أعمل»:',ru:'«Учусь, чтобы работать»:',en:'"I study in order to work":'},"Estudio para trabajar.","Estudio por trabajar.","Estudio a trabajar."]]}
],
B2: [
{title:{ar:'صيغة الالتماس في المضارع: subjuntivo', ru:'Сослагательное наклонение (presente de subjuntivo)', en:'The present subjunctive'},
 body:{
 ar:`<p>يُستخدم بعد التعبير عن رغبة أو شعور أو ضرورة موجّهة لشخص آخر: [[Quiero que vengas.]] = أريد أن تأتي.</p>
<p>تكوينه: نبدّل حرف العلة في اللاحقة: ‎-ar → -e‎، ‎-er/-ir → -a‎: [[hable]]، [[coma]]، [[viva]].</p>
<p class="tip">بعد [[que]] مع: [[quiero]]، [[espero]]، [[es importante]]، [[ojalá]].</p>`,
 ru:`<p>Используется после выражения желания, чувства или необходимости, обращённых к другому лицу: [[Quiero que vengas.]] = Я хочу, чтобы ты пришёл.</p>
<p>Образование: гласная окончания меняется: -ar → -e, -er/-ir → -a: [[hable]], [[coma]], [[viva]].</p>
<p class="tip">После [[que]] с: [[quiero]], [[espero]], [[es importante]], [[ojalá]].</p>`,
 en:`<p>Used after wishes, feelings or necessity aimed at someone else: [[Quiero que vengas.]] = I want you to come.</p>
<p>Formation: swap the ending vowel: -ar → -e, -er/-ir → -a: [[hable]], [[coma]], [[viva]].</p>
<p class="tip">After [[que]] with: [[quiero]], [[espero]], [[es importante]], [[ojalá]].</p>`},
 ex:`Quiero que seas feliz.|أريدك أن تكون سعيداً.|Я хочу, чтобы ты был счастлив.|I want you to be happy.
Es importante que todos lleguen a tiempo.|من المهم أن يصل الجميع في الوقت.|Важно, чтобы все пришли вовремя.|It's important that everyone arrives on time.
Espero que todo salga bien.|أتمنى أن يسير كل شيء على ما يرام.|Надеюсь, что всё будет хорошо.|I hope everything goes well.`,
 quiz:[[{ar:'«أريد أن تتكلم» (tú):',ru:'«Хочу, чтобы ты говорил»:',en:'"I want you to speak":'},"Quiero que hables.","Quiero que hablas.","Quiero hablas."],
       [{ar:'«أتمنى أن يأتي»:',ru:'«Надеюсь, что он придёт»:',en:'"I hope he comes":'},"Espero que venga.","Espero que viene.","Espero venir."]]},
{title:{ar:'الشرط: condicional و si + imperfecto de subjuntivo', ru:'Условное наклонение и si + imperfecto de subjuntivo', en:'Conditional and si + past subjunctive'},
 body:{
 ar:`<p>«كنتُ سأفعل» = المصدر + ‎-ía‎: [[viajaría]] (لسافرت). شواذ: [[tendría]]، [[haría]]، [[podría]].</p>
<p>للشرط غير الواقعي: [[si]] + ماضي الالتماس (‎-ra‎) + الشرطي: [[Si tuviera tiempo, viajaría.]] = لو كان عندي وقت لسافرت.</p>`,
 ru:`<p>«Я бы сделал» = инфинитив + -ía: [[viajaría]] (я бы поехал). Исключения: [[tendría]], [[haría]], [[podría]].</p>
<p>Нереальное условие: [[si]] + прошедшее сослагательное (-ra) + кондиционал: [[Si tuviera tiempo, viajaría.]] = Если бы у меня было время, я бы путешествовал.</p>`,
 en:`<p>"I would" = infinitive + -ía: [[viajaría]] (I would travel). Irregulars: [[tendría]], [[haría]], [[podría]].</p>
<p>Unreal conditions: [[si]] + past subjunctive (-ra) + conditional: [[Si tuviera tiempo, viajaría.]] = If I had time, I would travel.</p>`},
 ex:`Si tuviera más tiempo, viajaría.|لو كان عندي وقت أكثر لسافرت.|Если бы у меня было больше времени, я бы путешествовал.|If I had more time, I would travel.
Yo que tú, aceptaría.|لو كنت مكانك لوافقت.|На твоём месте я бы согласился.|If I were you, I'd accept.
¿Podría ayudarme?|هل يمكنك مساعدتي؟|Не могли бы вы мне помочь?|Could you help me?`,
 quiz:[[{ar:'«لو كنت أعرف لقلت لك»:',ru:'«Если бы я знал, я бы сказал тебе»:',en:'"If I knew, I would tell you":'},"Si lo supiera, te lo diría.","Si lo sé, te lo diría.","Si lo sabría, te lo digo."],
       [{ar:'«كنت سأشتري»:',ru:'«я бы купил»:',en:'"I would buy":'},"compraría","compraré","compraba"]]},
{title:{ar:'الكلام المنقول', ru:'Косвенная речь', en:'Reported speech'},
 body:{
 ar:`<p>عند النقل بفعل ماضٍ يتغير الزمن خطوة إلى الوراء: [[«Vendré»]] ← [[Dijo que vendría.]]؛ [[«Estoy cansado»]] ← [[Dijo que estaba cansado.]]</p>
<p class="tip">الأوامر تصبح subjuntivo: [[Me pidió que cerrara la ventana.]]</p>`,
 ru:`<p>После глагола в прошедшем времени время сдвигается назад: [[«Vendré»]] → [[Dijo que vendría.]]; [[«Estoy cansado»]] → [[Dijo que estaba cansado.]]</p>
<p class="tip">Просьбы переходят в subjuntivo: [[Me pidió que cerrara la ventana.]]</p>`,
 en:`<p>After a past reporting verb, the tense shifts back: [[«Vendré»]] → [[Dijo que vendría.]]; [[«Estoy cansado»]] → [[Dijo que estaba cansado.]]</p>
<p class="tip">Requests take the subjunctive: [[Me pidió que cerrara la ventana.]]</p>`},
 ex:`Dijo que vendría más tarde.|قال إنه سيأتي لاحقاً.|Он сказал, что придёт позже.|He said he would come later.
Me preguntó dónde trabajo.|سألني أين أعمل.|Он спросил, где я работаю.|He asked where I work.
Le pedí que cerrara la ventana.|طلبت منه أن يغلق النافذة.|Я попросил его закрыть окно.|I asked him to close the window.`,
 quiz:[[{ar:'«قالت إنها متعبة»:',ru:'«Она сказала, что устала»:',en:'"She said she was tired":'},"Dijo que estaba cansada.","Dijo que está cansada será.","Dice que estuvo cansando."],
       [{ar:'«طلب مني أن أنتظر»:',ru:'«Он попросил меня подождать»:',en:'"He asked me to wait":'},"Me pidió que esperara.","Me pidió que espero.","Me pidió esperaré."]]}
],
C1: [
{title:{ar:'المبني للمجهول و se', ru:'Пассив и конструкции с se', en:'The passive and se constructions'},
 body:{
 ar:`<p>المجهول التام: [[ser]] + اسم المفعول المطابق: [[El puente fue construido en 1900.]]</p>
<p>أكثر شيوعاً في الكلام: [[se]] + الفعل: [[Aquí se habla español.]] = هنا يُتكلَّم بالإسبانية؛ [[Se venden pisos.]] = شقق للبيع.</p>`,
 ru:`<p>Полный пассив: [[ser]] + согласованное причастие: [[El puente fue construido en 1900.]]</p>
<p>Чаще в речи: [[se]] + глагол: [[Aquí se habla español.]] = Здесь говорят по-испански; [[Se venden pisos.]] = Продаются квартиры.</p>`,
 en:`<p>Full passive: [[ser]] + agreeing participle: [[El puente fue construido en 1900.]]</p>
<p>More common in speech: [[se]] + verb: [[Aquí se habla español.]] = Spanish is spoken here; [[Se venden pisos.]] = Flats for sale.</p>`},
 ex:`El libro ha sido traducido a veinte idiomas.|تُرجم الكتاب إلى عشرين لغة.|Книга переведена на двадцать языков.|The book has been translated into twenty languages.
La decisión se tomó por unanimidad.|اتُّخذ القرار بالإجماع.|Решение приняли единогласно.|The decision was taken unanimously.
Aquí no se fuma.|هنا لا يُدخَّن.|Здесь не курят.|No smoking here.`,
 quiz:[[{ar:'«بُنيت المدينة»:',ru:'«Город был построен»:',en:'"The city was built":'},"La ciudad fue construida.","La ciudad fue construido.","La ciudad se construyó ella."],
       [{ar:'«تُباع سيارات»:',ru:'«Продаются машины»:',en:'"Cars for sale":'},"Se venden coches.","Se vende coches.","Venden se coches."]]},
{title:{ar:'أدوات الربط الرسمية والموصولات', ru:'Книжные связки и относительные слова', en:'Formal connectors and relatives'},
 body:{
 ar:`<p>الموصولات: [[que]] (الذي/التي)، [[quien]] (مَن للعاقل)، [[donde]] (حيث)، [[lo que]] (ما): [[Es lo que pienso.]]</p>
<p>الربط: [[sin embargo]] لكنّ، [[no obstante]] ومع ذلك، [[por lo tanto]] لذلك، [[a pesar de]] رغم، [[en cuanto a]] أما بالنسبة لـ.</p>`,
 ru:`<p>Относительные слова: [[que]] (который), [[quien]] (кто — о людях), [[donde]] (где), [[lo que]] (то, что): [[Es lo que pienso.]]</p>
<p>Связки: [[sin embargo]] однако, [[no obstante]] тем не менее, [[por lo tanto]] следовательно, [[a pesar de]] несмотря на, [[en cuanto a]] что касается.</p>`,
 en:`<p>Relatives: [[que]] (that/which), [[quien]] (who, for people), [[donde]] (where), [[lo que]] (what): [[Es lo que pienso.]]</p>
<p>Connectors: [[sin embargo]] however, [[no obstante]] nevertheless, [[por lo tanto]] therefore, [[a pesar de]] despite, [[en cuanto a]] as for.</p>`},
 ex:`A pesar de las dificultades, el proyecto se terminó a tiempo.|رغم الصعوبات أُنجز المشروع في وقته.|Несмотря на трудности, проект завершили вовремя.|Despite the difficulties, the project was finished on time.
Esta es la ciudad donde nací.|هذه المدينة التي وُلدت فيها.|Это город, где я родился.|This is the city where I was born.
No obstante, quedaron cuestiones sin resolver.|ومع ذلك بقيت مسائل بلا حل.|Тем не менее остались нерешённые вопросы.|Nevertheless, some questions remained unresolved.`,
 quiz:[[{ar:'«هذا ما أريده»:',ru:'«Это то, чего я хочу»:',en:'"That\'s what I want":'},"Es lo que quiero.","Es que lo quiero.","Es el que quiero lo."],
       [{ar:'«رغم المطر»:',ru:'«несмотря на дождь»:',en:'"despite the rain":'},"a pesar de la lluvia","por lo tanto la lluvia","sin embargo la lluvia"]]}
],
C2: [
{title:{ar:'التعابير الاصطلاحية', ru:'Идиомы и устойчивые выражения', en:'Idioms and set expressions'},
 body:{
 ar:`<p>الإسبانية غنية بالتعابير التي لا تُترجم حرفياً: [[Dicho y hecho.]] (قيل وفُعل)، [[No es oro todo lo que reluce.]] (ليس كل ما يلمع ذهباً)، [[Más vale tarde que nunca.]] (أن تأتي متأخراً خير من ألا تأتي).</p>
<p class="tip">تعلّم المثل كاملاً كوحدة واحدة، ولا تحاول ترجمته كلمة كلمة.</p>`,
 ru:`<p>В испанском много выражений, которые нельзя переводить дословно: [[Dicho y hecho.]] (Сказано — сделано), [[No es oro todo lo que reluce.]] (Не всё то золото, что блестит), [[Más vale tarde que nunca.]] (Лучше поздно, чем никогда).</p>
<p class="tip">Учите пословицу целиком, как одно слово, а не по словам.</p>`,
 en:`<p>Spanish is full of expressions that can't be translated word for word: [[Dicho y hecho.]] (No sooner said than done), [[No es oro todo lo que reluce.]] (All that glitters is not gold), [[Más vale tarde que nunca.]] (Better late than never).</p>
<p class="tip">Learn a proverb as a single unit, not word by word.</p>`},
 ex:`Dicho y hecho.|قيل وفُعل.|Сказано — сделано.|No sooner said than done.
En la necesidad se conoce al amigo.|الصديق وقت الضيق.|Друг познаётся в беде.|A friend in need is a friend indeed.
Cuando el río suena, agua lleva.|لا دخان بلا نار.|Нет дыма без огня.|There's no smoke without fire.`,
 quiz:[[{ar:'«أن تأتي متأخراً خير من ألا تأتي»:',ru:'«Лучше поздно, чем никогда»:',en:'"Better late than never":'},"Más vale tarde que nunca.","Más tarde que nunca vale.","Mejor nunca que tarde."],
       [{ar:'«الصديق وقت الضيق»:',ru:'«Друг познаётся в беде»:',en:'"A friend in need is a friend indeed":'},"En la necesidad se conoce al amigo.","El amigo conoce la necesidad.","Amigo y necesidad se conocen."]]},
{title:{ar:'تراكيب متقدمة: por mucho que, con tal de que, como si', ru:'Сложные конструкции: por mucho que, con tal de que, como si', en:'Advanced structures: por mucho que, con tal de que, como si'},
 body:{
 ar:`<p>[[por mucho que]] + subjuntivo = مهما: [[Por mucho que lo intentes…]]؛ [[con tal de que]] = بشرط أن؛ [[como si]] + ماضي الالتماس = كأنّ: [[Hablaba como si no hubiera pasado nada.]]؛ [[pase lo que pase]] = مهما حدث.</p>`,
 ru:`<p>[[por mucho que]] + subjuntivo = как бы ни: [[Por mucho que lo intentes…]]; [[con tal de que]] = лишь бы, при условии что; [[como si]] + прошедшее сослагательное = как будто: [[Hablaba como si no hubiera pasado nada.]]; [[pase lo que pase]] = что бы ни случилось.</p>`,
 en:`<p>[[por mucho que]] + subjunctive = however much: [[Por mucho que lo intentes…]]; [[con tal de que]] = as long as; [[como si]] + past subjunctive = as if: [[Hablaba como si no hubiera pasado nada.]]; [[pase lo que pase]] = whatever happens.</p>`},
 ex:`Por mucho que lo intentes, no puedes contentar a todos.|مهما حاولت لا يمكنك إرضاء الجميع.|Как ни старайся, всем не угодишь.|However hard you try, you can't please everyone.
Pase lo que pase, estaré ahí.|مهما حدث سأكون هناك.|Что бы ни случилось, я буду рядом.|Whatever happens, I'll be there.
Hablaba como si no hubiera pasado nada.|كانت تتكلم كأن شيئاً لم يحدث.|Она говорила так, будто ничего не случилось.|She spoke as if nothing had happened.`,
 quiz:[[{ar:'«مهما حدث»:',ru:'«что бы ни случилось»:',en:'"whatever happens":'},"pase lo que pase","pasa lo que pasa","pasó lo que pase"],
       [{ar:'«كأنه لا يعرف»:',ru:'«как будто он не знает»:',en:'"as if he didn\'t know":'},"como si no supiera","como si no sabe","como no si supiera"]]}
]};
