// Grammar for English speakers learning Russian (ru_en) and Arabic (ar_en). Examples "src|en".
const G1=(title,body,ex,quiz)=>({title:{en:title},body:{en:body},ex,quiz:quiz.map(q=>[{en:q[0]},q[1],q[2],q[3]])});
GR.ru_en = {
A1: [
G1('No "to be" in the present', `<p>Russian simply drops "am / is / are" in the present tense: [[Я студ+ент.]] = I (am a) student.</p>
<p>Between two nouns a dash often stands in for the missing verb: [[Мо+я м+ама — врач.]]</p>
<p class="tip">There are no articles either — no "a" or "the". [[+Это дом.]] = This is a house / This is the house.</p>`,
`Я студ+ент.|I'm a student.
Он врач.|He's a doctor.
+Это дом.|This is a house.
Мо+я м+ама — врач.|My mother is a doctor.`,
[['"I am a student":','Я студ+ент.','Я есть студ+ент.','Я быть студ+ент.'],['"This is a house":','+Это дом.','+Это есть дом.','+Это быть дом.']]),
G1('Three genders', `<p>Every noun is masculine, feminine or neuter — you can usually tell from the ending:</p>
<table><tr><th>Masculine</th><th>Feminine</th><th>Neuter</th></tr><tr><td>consonant: [[дом]], [[брат]]</td><td>-а / -я: [[м+ама]], [[нед+еля]]</td><td>-о / -е: [[окн+о]], [[м+оре]]</td></tr><tr><td>[[он]], [[мой]]</td><td>[[он+а]], [[мо+я]]</td><td>[[он+о]], [[моё]]</td></tr></table>
<p class="tip">Words in -ь can be either gender — learn them with "my": [[мо+я тетр+адь]], [[мой слов+арь]].</p>`,
`Мой брат.|My brother.
Мо+я сестр+а.|My sister.
Моё окн+о.|My window.
Где мо+я кн+ига?|Where is my book?`,
[['"my mother":','мо+я м+ама','мой м+ама','моё м+ама'],['"my window":','моё окн+о','мой окн+о','мо+я окн+о']]),
G1('Present tense: two conjugations', `<p>Most verbs follow one of two patterns:</p>
<table><tr><th></th><th>чит+ать (read)</th><th>говор+ить (speak)</th></tr><tr><td>я</td><td>[[чит+аю]]</td><td>[[говор+ю]]</td></tr><tr><td>ты</td><td>[[чит+аешь]]</td><td>[[говор+ишь]]</td></tr><tr><td>он / она</td><td>[[чит+ает]]</td><td>[[говор+ит]]</td></tr><tr><td>мы</td><td>[[чит+аем]]</td><td>[[говор+им]]</td></tr><tr><td>вы</td><td>[[чит+аете]]</td><td>[[говор+ите]]</td></tr><tr><td>он+и</td><td>[[чит+ают]]</td><td>[[говор+ят]]</td></tr></table>`,
`Я чит+аю кн+игу.|I'm reading a book.
Ты говор+ишь по-р+усски?|Do you speak Russian?
Мы жив+ём в Москв+е.|We live in Moscow.
Он+и раб+отают в б+анке.|They work in a bank.`,
[['"we read":','мы чит+аем','мы чит+ают','мы чит+аю'],['"you speak" (ты):','ты говор+ишь','ты говор+ит','ты говор+ю']]),
G1('Negation and questions', `<p>Put [[не]] right before the word you negate: [[Я не поним+аю.]] = I don't understand.</p>
<p>Yes/no questions need no special word order — only a rising intonation: [[Ты д+ома?]] Question words: [[кто]] who, [[что]] what, [[где]] where, [[когд+а]] when, [[как]] how, [[ск+олько]] how much, [[почем+у]] why.</p>`,
`Я не поним+аю.|I don't understand.
Где метр+о?|Where is the metro?
Ск+олько +это ст+оит?|How much does this cost?
Почем+у ты не ешь?|Why aren't you eating?`,
[['"I don\'t know":','Я не зн+аю.','Я зн+аю не.','Не я зн+аю.'],['"Where?":','Где?','Когд+а?','Кто?']])
],
A2: [
G1('The past tense', `<p>Drop -ть and add [[-л]] — the ending agrees with the gender of the subject, not with the person:</p>
<table><tr><th>he / I (man)</th><th>she / I (woman)</th><th>it</th><th>they / we / you</th></tr><tr><td>[[чит+ал]]</td><td>[[чит+ала]]</td><td>[[чит+ало]]</td><td>[[чит+али]]</td></tr></table>
<p class="tip">"To be" does exist in the past: [[был]], [[был+а]], [[б+ыло]], [[б+ыли]].</p>`,
`Вчер+а я был д+ома.|Yesterday I was at home.
Он+а раб+отала в б+анке.|She worked at a bank.
Мы смотр+ели фильм.|We watched a film.`,
[['"she was":','он+а был+а','он+а был','он+а б+ыло'],['"they read" (past):','он+и чит+али','он+и чит+ал','он+и чит+ала']]),
G1('Where? — the prepositional case', `<p>After [[в]] (in) and [[на]] (on, at), the noun usually takes [[-е]]: [[Москв+а]] → [[в Москв+е]], [[стол]] → [[на стол+е]].</p>
<p class="tip">Some places use на rather than в: [[на раб+оте]] (at work), [[на п+очте]] (at the post office).</p>`,
`Я жив+у в Ташк+енте.|I live in Tashkent.
Кн+ига на стол+е.|The book is on the table.
Он+а на раб+оте.|She is at work.`,
[['"in Moscow":','в Москв+е','в Москв+а','в Москв+у'],['"on the table":','на стол+е','на стол','на стол+а']]),
G1('The direct object — the accusative', `<p>Feminine nouns in -а/-я change to [[-у]]/[[-ю]] when they are the object: [[кн+ига]] → [[Я чит+аю кн+игу.]]</p>
<p>Inanimate masculine and neuter nouns don't change: [[Я в+ижу дом.]]</p>`,
`Я пь+ю в+оду.|I'm drinking water.
Я любл+ю Москв+у.|I love Moscow.
Он+а чит+ает газ+ету.|She is reading a newspaper.`,
[['"I love Moscow":','Я любл+ю Москв+у.','Я любл+ю Москв+а.','Я любл+ю Москв+е.'],['"I drink water":','Я пь+ю в+оду.','Я пь+ю вод+а.','Я пь+ю вод+е.']]),
G1('The future', `<p>Imperfective verbs: [[б+уду]] + infinitive: [[З+автра я б+уду раб+отать.]]</p>
<p>Perfective verbs: their present-tense form already means the future: [[Я позвон+ю.]] = I'll call.</p>`,
`З+автра я б+уду раб+отать.|Tomorrow I'll be working.
Я позвон+ю теб+е в+ечером.|I'll call you in the evening.
Мы б+удем жд+ать.|We'll wait.`,
[['"we will read":','мы б+удем чит+ать','мы б+удем чит+аем','мы чит+али б+удем'],['"I will call":','я позвон+ю','я звон+ил','я б+уду позвон+ить']])
],
B1: [
G1('The genitive: "of", "no …", quantities', `<p>The genitive answers "whose?" and follows [[нет]] (there is no), quantities and many prepositions: [[кн+ига бр+ата]] (brother's book), [[нет вр+емени]] (no time), [[ч+ашка ч+ая]] (a cup of tea).</p>
<p class="tip">Typical endings: -а/-я (masc./neut.), -ы/-и (fem.).</p>`,
`У мен+я нет вр+емени.|I don't have time.
+Это кн+ига бр+ата.|This is my brother's book.
Д+айте, пож+алуйста, ч+ашку ч+ая.|A cup of tea, please.`,
[['"There is no water":','Нет вод+ы.','Нет вод+а.','Нет в+оду.'],['"my sister\'s house":','дом сестр+ы','дом сестр+а','дом сестр+у']]),
G1('Aspect: process or result', `<p>Most Russian verbs come in pairs. The imperfective describes a process or a repeated action; the perfective describes a single completed result: [[чит+ать]] / [[прочит+ать]], [[пис+ать]] / [[напис+ать]].</p>`,
`Я д+олго чит+ал кн+игу.|I was reading the book for a long time.
Я прочит+ал кн+игу.|I finished the book.
К+аждый день я пиш+у п+исьма.|Every day I write letters.`,
[['"I wrote (finished) the letter":','Я напис+ал письм+о.','Я пис+ать письм+о.','Я пиш+у письм+о вчер+а.'],['"Every day I read":','К+аждый день я чит+аю.','К+аждый день я прочит+аю.','К+аждый день я прочит+ал.']]),
G1('The dative: "to me", likes and ages', `<p>[[мне]], [[теб+е]], [[ем+у]], [[ей]], [[нам]], [[вам]], [[им]] — "to me, to you…". Russian uses them where English uses a subject: [[Мне нр+авится]] (I like), [[Мне н+ужно]] (I need), [[Ем+у дв+адцать лет]] (he is twenty).</p>`,
`Мне нр+авится Москв+а.|I like Moscow.
Мне н+ужно идт+и.|I need to go.
Ем+у дв+адцать лет.|He is twenty.`,
[['"I like tea":','Мне нр+авится чай.','Я нр+авится чай.','Мен+я нр+авится чай.'],['"She is thirty":','Ей тр+идцать лет.','Он+а тр+идцать лет.','Её тр+идцать лет.']]),
G1('Verbs of motion', `<p>Russian distinguishes going on foot from going by transport, and one trip in one direction from habitual trips:</p>
<table><tr><th></th><th>now, one direction</th><th>habitually / there and back</th></tr><tr><td>on foot</td><td>[[идт+и]]: [[я ид+у]]</td><td>[[ход+ить]]: [[я хож+у]]</td></tr><tr><td>by transport</td><td>[[+ехать]]: [[я +еду]]</td><td>[[+ездить]]: [[я +езжу]]</td></tr></table>`,
`Я ид+у в магаз+ин.|I'm walking to the shop.
Я ч+асто хож+у в парк.|I often go to the park.
Мы +едем в Каз+ань.|We're driving to Kazan.`,
[['"I\'m driving to work now":','Я +еду на раб+оту.','Я хож+у на раб+оту.','Я +езжу на раб+оту.'],['"I often walk in the park":','Я ч+асто хож+у в парк.','Я ч+асто ид+у в парк.','Я ч+асто +еду в парк.']])
],
B2: [
G1('The conditional: бы', `<p>Past tense + [[бы]] = "would": [[Я бы хот+ел]] (I would like). For unreal conditions, бы goes in both halves: [[+Если бы я знал, я бы сказ+ал.]]</p>`,
`Я бы хот+ел заказ+ать ст+олик на дво+их.|I'd like to book a table for two.
+Если бы у мен+я б+ыло вр+емя, я бы путеш+ествовал.|If I had time, I would travel.`,
[['"If I knew, I\'d tell you":','+Если бы я знал, я бы сказ+ал теб+е.','+Если я знал, я бы скаж+у теб+е.','+Если бы я зн+аю, скаж+у теб+е.'],['"I would like":','я бы хот+ел','я хоч+у бы','я бы хоч+у']]),
G1('Reflexive verbs in -ся', `<p>The ending [[-ся]] (-сь after a vowel) makes a verb reflexive or intransitive: [[уч+иться]]→[[уч+усь]] (I study), [[начин+аться]] (to begin), [[встр+етиться]] (to meet up).</p>`,
`Я уч+усь в университ+ете.|I study at university.
Ур+ок начин+ается в д+евять.|The lesson starts at nine.
Мы встр+етились в ц+ентре.|We met up in the centre.`,
[['"The film starts at seven":','Фильм начин+ается в семь.','Фильм начин+ает в семь.','Фильм начин+аться в семь.'],['"I study at university":','Я уч+усь в университ+ете.','Я уч+у в университ+ете.','Я уч+усь университ+ет.']]),
G1('"Which" — кот+орый', `<p>[[кот+орый]] works like an adjective: it takes the gender and number of the noun it refers to, but the case of its own clause: [[кн+ига, кот+орую я чит+аю]] (the book that I'm reading).</p>`,
`Студ+ент, кот+орый сдал экз+амен, дов+олен.|The student who passed the exam is happy.
Кн+ига, кот+орую я чит+аю, +очень интер+есная.|The book I'm reading is very interesting.`,
[['"the book that I\'m reading":','кн+ига, кот+орую я чит+аю','кн+ига, кот+орый я чит+аю','кн+ига, кот+орая я чит+аю'],['"the man who called":','челов+ек, кот+орый позвон+ил','челов+ек, кот+орая позвон+ил','челов+ек, кот+орого позвон+ил']])
],
C1: [
G1('Verbal adverbs (деепричастия)', `<p>A verbal adverb links two actions of the same subject. Perfective: [[прочит+ав]] (having read); imperfective: [[возвращ+аясь]] (while returning).</p>`,
`Прочит+ав стать+ю, он измен+ил мн+ение.|Having read the article, he changed his mind.
Возвращ+аясь дом+ой, я встр+етил ст+арого др+уга.|While returning home, I met an old friend.`,
[['"Having read the letter, she smiled":','Прочит+ав письм+о, он+а улыбн+улась.','Прочит+ать письм+о, он+а улыбн+улась.','Прочит+анный письм+о, он+а улыбн+улась.'],['"while returning":','возвращ+аясь','возвращ+ался','возвращ+ать']]),
G1('The instrumental case', `<p>The instrumental expresses "with" ([[с]] + instr.), the tool ("with a pen") and roles after [[раб+отать]], [[быть]], [[стать]]: [[Он раб+отает журнал+истом.]]</p>
<p class="tip">Typical endings: -ом/-ем (masc./neut.), -ой/-ей (fem.).</p>`,
`Он раб+отает журнал+истом.|He works as a journalist.
Я пиш+у р+учкой.|I write with a pen.
Чай с лим+оном, пож+алуйста.|Tea with lemon, please.`,
[['"He works as a doctor":','Он раб+отает врач+ом.','Он раб+отает врач.','Он раб+отает врач+а.'],['"with milk":','с молок+ом','с молок+о','с молок+а']])
],
C2: [
G1('Word order and emphasis', `<p>Russian word order is flexible: the new or important information comes at the end. [[Вчер+а при+ехал мой брат.]] (who came? — my brother) / [[Мой брат при+ехал вчер+а.]] (when? — yesterday).</p>`,
`Вчер+а при+ехал мой брат.|Yesterday my brother arrived.
Мой брат при+ехал вчер+а.|My brother arrived yesterday.`,
[['Answer to "Who arrived?":','При+ехал мой брат.','Мой брат при+ехал.','Брат при+ехал мой.'],['Answer to "When did he arrive?":','Он при+ехал вчер+а.','Вчер+а он при+ехал.','При+ехал он вчер+а он.']]),
G1('Proverbs and idioms', `<p>Idioms are learned as whole units: [[+Утро в+ечера мудрен+ее.]] (Sleep on it — lit. "morning is wiser than evening"), [[Без труд+а не в+ытащишь и р+ыбку из пруд+а.]] (No pain, no gain), [[Л+учше п+оздно, чем никогд+а.]] (Better late than never).</p>`,
`+Утро в+ечера мудрен+ее.|Sleep on it.
Л+учше п+оздно, чем никогд+а.|Better late than never.
Друзь+я позна+ются в бед+е.|A friend in need is a friend indeed.`,
[['"Better late than never":','Л+учше п+оздно, чем никогд+а.','Л+учше никогд+а, чем п+оздно.','П+оздно л+учше никогд+а.'],['"Sleep on it":','+Утро в+ечера мудрен+ее.','В+ечер +утра мудрен+ее.','+Утро мудр+ое в+ечером.']])
]};

GR.ar_en = {
A1: [
G1('The nominal sentence: no "is"', `<p>Arabic has no verb "is" in the present. A sentence can be just a subject and a description: [[أَنَا طَالِبٌ.]] = I (am a) student; [[البَيْتُ كَبِيرٌ.]] = The house (is) big.</p>`,
`أَنَا طَالِبٌ.|I'm a student.
هَذَا بَيْتٌ.|This is a house.
البَيْتُ كَبِيرٌ.|The house is big.
الطَّقْسُ جَمِيلٌ.|The weather is nice.`,
[['"The book is new":','الكِتَابُ جَدِيدٌ.','الكِتَابُ يَكُونُ جَدِيدٌ.','كِتَابٌ الجَدِيدُ.'],['"I am a doctor":','أَنَا طَبِيبٌ.','أَنَا أَكُونُ طَبِيبٌ.','طَبِيبٌ أَنَا هُوَ.']]),
G1('The article al- and the sun letters', `<p>"The" is the prefix [[الـ]]. Before 14 "sun letters" (t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n) the l is not pronounced and the next letter is doubled: [[الشَّمْسُ]] = ash-shams. Before "moon letters" the l is heard: [[القَمَرُ]] = al-qamar.</p>`,
`الشَّمْسُ حَارَّةٌ.|The sun is hot.
القَمَرُ جَمِيلٌ.|The moon is beautiful.
السُّوقُ قَرِيبٌ.|The market is near.`,
[['"the moon":','القَمَرُ','قَمَرُ الـ','القَمَرٌ'],['"the sun":','الشَّمْسُ','شَمْسٌ الـ','الشَّمْسٌ']]),
G1('Masculine and feminine', `<p>Most feminine words end in [[ـة]] (taa marbuta). Adjectives agree: [[طَالِبٌ جَدِيدٌ]] / [[طَالِبَةٌ جَدِيدَةٌ]]. Pronouns: [[هُوَ]] he, [[هِيَ]] she, [[أَنْتَ]] you (m.), [[أَنْتِ]] you (f.).</p>`,
`هُوَ مُدَرِّسٌ.|He is a teacher.
هِيَ مُدَرِّسَةٌ.|She is a teacher.
السَّيَّارَةُ جَدِيدَةٌ.|The car is new.`,
[['"She is a doctor":','هِيَ طَبِيبَةٌ.','هِيَ طَبِيبٌ.','هُوَ طَبِيبَةٌ.'],['"a big city":','مَدِينَةٌ كَبِيرَةٌ','مَدِينَةٌ كَبِيرٌ','مَدِينٌ كَبِيرَةٌ']]),
G1('"My, your, his": possessive endings', `<p>Possession is an ending on the noun: [[كِتَابِي]] my book, [[كِتَابُكَ]] your (m.), [[كِتَابُكِ]] your (f.), [[كِتَابُهُ]] his, [[كِتَابُهَا]] her, [[كِتَابُنَا]] our.</p>
<p class="tip">Feminine ة becomes ت before an ending: [[سَيَّارَة]] → [[سَيَّارَتِي]].</p>`,
`هَذَا كِتَابِي.|This is my book.
مَا اسْمُكَ؟|What's your name?
سَيَّارَتُهُ جَدِيدَةٌ.|His car is new.`,
[['"my house":','بَيْتِي','بَيْتُهُ','بَيْتُنَا'],['"her car":','سَيَّارَتُهَا','سَيَّارَةُهَا','سَيَّارَتُهُ']])
],
A2: [
G1('The past tense', `<p>The past tense adds endings to the root form: [[كَتَبَ]] (he wrote) → [[كَتَبْتُ]] I, [[كَتَبْتَ]] you (m.), [[كَتَبَتْ]] she, [[كَتَبْنَا]] we, [[كَتَبُوا]] they.</p>`,
`ذَهَبْتُ إِلَى السُّوقِ.|I went to the market.
أَكَلْنَا فِي المَطْعَمِ.|We ate at the restaurant.
هَلْ شَرِبْتَ القَهْوَةَ؟|Did you drink the coffee?`,
[['"we wrote":','كَتَبْنَا','كَتَبْتُ','كَتَبُوا'],['"she went":','ذَهَبَتْ','ذَهَبْتُ','ذَهَبُوا']]),
G1('The present tense', `<p>The present tense adds prefixes (and some endings): [[أَكْتُبُ]] I write, [[تَكْتُبُ]] you write / she writes, [[يَكْتُبُ]] he writes, [[نَكْتُبُ]] we write, [[يَكْتُبُونَ]] they write.</p>`,
`أَدْرُسُ اللُّغَةَ العَرَبِيَّةَ.|I study Arabic.
هِيَ تَعْمَلُ فِي بَنْكٍ.|She works in a bank.
نَشْرَبُ الشَّايَ.|We drink tea.`,
[['"I drink":','أَشْرَبُ','يَشْرَبُ','نَشْرَبُ'],['"they work":','يَعْمَلُونَ','نَعْمَلُ','أَعْمَلُ']]),
G1('Negation', `<p>[[لا]] + present: [[لا أَفْهَمُ.]] I don't understand. [[لَمْ]] + present form = past negative: [[لَمْ أَذْهَبْ.]] I didn't go. [[لَنْ]] = future negative: [[لَنْ أَتَأَخَّرَ.]] I won't be late. [[لَيْسَ]] negates nominal sentences: [[لَيْسَ عِنْدِي وَقْتٌ.]]</p>`,
`لا أَفْهَمُ.|I don't understand.
لَمْ أَذْهَبْ إِلَى العَمَلِ.|I didn't go to work.
لَيْسَ عِنْدِي وَقْتٌ.|I don't have time.`,
[['"I didn\'t go":','لَمْ أَذْهَبْ.','لا ذَهَبْتُ أَذْهَبُ.','لَنْ ذَهَبْتُ.'],['"I don\'t know":','لا أَعْرِفُ.','لَمْ أَعْرِفُ لَنْ.','لَيْسَ أَعْرِفُ.']]),
G1('The future: سـ / سوف', `<p>Add [[سَـ]] (or the word [[سَوْفَ]]) before the present tense: [[سَأُسَافِرُ غَداً.]] = I will travel tomorrow.</p>`,
`سَأُسَافِرُ غَداً.|I'll travel tomorrow.
سَنَزُورُ جَدَّتَنَا.|We'll visit our grandmother.
سَوْفَ أَتَّصِلُ بِكَ.|I will call you.`,
[['"We will travel":','سَنُسَافِرُ','سَافَرْنَا','نُسَافِرُ أَمْسِ'],['"I will call":','سَأَتَّصِلُ','اِتَّصَلْتُ','لَمْ أَتَّصِلْ']])
],
B1: [
G1('Idafa: "the X of Y"', `<p>To say "the student's book", put the two nouns side by side; only the second takes [[الـ]]: [[كِتَابُ الطَّالِبِ]]. The first word never has al-.</p>`,
`بَابُ البَيْتِ مَفْتُوحٌ.|The door of the house is open.
عَمَّانُ عَاصِمَةُ الأُرْدُنِّ.|Amman is the capital of Jordan.
هَذِهِ سَيَّارَةُ أَبِي.|This is my father's car.`,
[['"the door of the house":','بَابُ البَيْتِ','البَابُ البَيْتُ','بَابٌ البَيْتِ'],['"the teacher\'s book":','كِتَابُ المُدَرِّسِ','الكِتَابُ المُدَرِّسُ','كِتَابٌ المُدَرِّسِ']]),
G1('Plurals and agreement', `<p>Many plurals are "broken" — the vowels inside the word change: [[كِتَابٌ]] → [[كُتُبٌ]], [[وَلَدٌ]] → [[أَوْلَادٌ]]. Plurals of things (not people) take a feminine singular adjective: [[الكُتُبُ جَدِيدَةٌ.]]</p>`,
`الكُتُبُ جَدِيدَةٌ.|The books are new.
الأَوْلَادُ فِي المَدْرَسَةِ.|The children are at school.
المُدَرِّسُونَ مَشْغُولُونَ.|The teachers are busy.`,
[['"The cars are new":','السَّيَّارَاتُ جَدِيدَةٌ.','السَّيَّارَاتُ جَدِيدُونَ.','السَّيَّارَاتُ جَدِيدٌ.'],['"books":','كُتُبٌ','كِتَابُونَ','كِتَابَاتٌ']]),
G1('The dual', `<p>Arabic has a special form for exactly two: [[ـَانِ]]: [[كِتَابٌ]] → [[كِتَابَانِ]] (two books), [[طَالِبَةٌ]] → [[طَالِبَتَانِ]].</p>`,
`عِنْدِي أُخْتَانِ.|I have two sisters.
فِي الغُرْفَةِ كُرْسِيَّانِ.|There are two chairs in the room.`,
[['"two books":','كِتَابَانِ','كُتُبَانِ','كِتَابُونَ'],['"two (female) students":','طَالِبَتَانِ','طَالِبَاتَانِ','طَالِبَانِ']]),
G1('"To have": عند، لـ، مع', `<p>Arabic has no verb "to have". Use [[عِنْدَ]] + ending: [[عِنْدِي سَيَّارَةٌ.]] (I have a car), or [[لِي]] / [[مَعِي]] (on me): [[مَعِي مَالٌ.]]</p>`,
`عِنْدِي أَخٌ وَأُخْتٌ.|I have a brother and a sister.
هَلْ عِنْدَكَ وَقْتٌ؟|Do you have time?
لَيْسَ مَعِي نُقُودٌ.|I don't have money on me.`,
[['"I have a car":','عِنْدِي سَيَّارَةٌ.','أَنَا سَيَّارَةٌ.','سَيَّارَتِي عِنْدَ.'],['"Do you have time?":','هَلْ عِنْدَكَ وَقْتٌ؟','هَلْ أَنْتَ وَقْتٌ؟','هَلْ وَقْتُكَ عِنْدَ؟']])
],
B2: [
G1('كان and its sisters', `<p>[[كَانَ]] (was), [[أَصْبَحَ]] (became), [[مَا زَالَ]] (is still), [[لَيْسَ]] (is not) make the predicate accusative (‑an): [[كَانَ الجَوُّ جَمِيلاً.]]</p>`,
`كَانَ الطَّقْسُ حَارّاً.|The weather was hot.
أَصْبَحَ أَخِي مُهَنْدِساً.|My brother became an engineer.
مَا زَالَ الطِّفْلُ نَائِماً.|The child is still asleep.`,
[['"The weather was cold":','كَانَ الجَوُّ بَارِداً.','كَانَ الجَوُّ بَارِدٌ.','الجَوُّ كَانَ بَارِدٍ.'],['"He became a doctor":','أَصْبَحَ طَبِيباً.','أَصْبَحَ طَبِيبٌ.','أَصْبَحَ الطَّبِيبُ هُوَ.']]),
G1('إنّ and its sisters', `<p>[[إِنَّ]] (indeed), [[أَنَّ]] (that), [[لَكِنَّ]] (but), [[لِأَنَّ]] (because) make the subject accusative: [[إِنَّ العِلْمَ نُورٌ.]] = Knowledge is light.</p>`,
`إِنَّ العِلْمَ نُورٌ.|Knowledge is light.
أَعْرِفُ أَنَّ الامْتِحَانَ صَعْبٌ.|I know that the exam is hard.
تَأَخَّرْتُ لِأَنَّ الطَّرِيقَ مُزْدَحِمٌ.|I'm late because the road is busy.`,
[['"because the book is useful":','لِأَنَّ الكِتَابَ مُفِيدٌ','لِأَنَّ الكِتَابُ مُفِيداً','لِأَنَّ كِتَابٌ مُفِيدٌ'],['"but the weather is cold":','لَكِنَّ الجَوَّ بَارِدٌ','لَكِنَّ الجَوُّ بَارِداً','لَكِنْ الجَوَّ بَارِداً']]),
G1('Roots and patterns', `<p>Most words grow from a three-letter root. From د-ر-س (study): [[دَرَسَ]] he studied, [[دَرَّسَ]] he taught, [[دَرْسٌ]] a lesson, [[مَدْرَسَةٌ]] a school, [[مُدَرِّسٌ]] a teacher.</p>
<p class="tip">Learning patterns lets you guess new words: مَـ ـْ ـَ ـَة often means a place: [[مَكْتَبَةٌ]] (library, from ك-ت-ب).</p>`,
`المُدَرِّسُ فِي المَدْرَسَةِ.|The teacher is at the school.
قَرَأْتُ الكِتَابَ فِي المَكْتَبَةِ.|I read the book in the library.`,
[['"teacher" (from د-ر-س):','مُدَرِّسٌ','مَدْرَسَةٌ','دَرْسٌ'],['"library" (from ك-ت-ب):','مَكْتَبَةٌ','كَاتِبٌ','مَكْتُوبٌ']])
],
C1: [
G1('The passive', `<p>The passive changes the vowels inside the verb: [[كَتَبَ]] (wrote) → [[كُتِبَ]] (was written), [[يَكْتُبُ]] → [[يُكْتَبُ]] (is written).</p>`,
`بُنِيَ الجِسْرُ فِي القَرْنِ المَاضِي.|The bridge was built last century.
أُرْسِلَتِ الرِّسَالَةُ أَمْسِ.|The letter was sent yesterday.
يُقَالُ إِنَّهُ سَافَرَ.|It is said that he has travelled.`,
[['"The letter was sent":','أُرْسِلَتِ الرِّسَالَةُ.','أَرْسَلَتِ الرِّسَالَةُ.','تُرْسِلُ الرِّسَالَةُ.'],['"was written":','كُتِبَ','كَتَبَ','يَكْتُبُ']]),
G1('Relative pronouns', `<p>[[الَّذِي]] (m.), [[الَّتِي]] (f.), [[الَّذِينَ]] (people, pl.) follow a definite noun: [[الكِتَابُ الَّذِي قَرَأْتُهُ]]. After an indefinite noun no relative word is used: [[كِتَابٌ قَرَأْتُهُ]] (a book I read).</p>`,
`الكِتَابُ الَّذِي قَرَأْتُهُ مُمْتِعٌ.|The book I read is interesting.
البِنْتُ الَّتِي تَجْلِسُ هُنَاكَ أُخْتِي.|The girl sitting there is my sister.
الطُّلَّابُ الَّذِينَ نَجَحُوا سُعَدَاءُ.|The students who passed are happy.`,
[['"the girl who…":','البِنْتُ الَّتِي','البِنْتُ الَّذِي','البِنْتُ الَّذِينَ'],['"the men who came":','الرِّجَالُ الَّذِينَ جَاؤُوا','الرِّجَالُ الَّتِي جَاؤُوا','الرِّجَالُ الَّذِي جَاءَ']])
],
C2: [
G1('Conditionals: إذا، إن، لو', `<p>[[إِذَا]] / [[إِنْ]] = real conditions: [[إِذَا دَرَسْتَ نَجَحْتَ.]] (If you study, you'll pass). [[لَوْ]] = unreal conditions, with [[لَـ]] in the result: [[لَوْ عَرَفْتُ لَأَخْبَرْتُكَ.]] (If I had known, I would have told you).</p>`,
`إِذَا دَرَسْتَ نَجَحْتَ.|If you study, you'll pass.
لَوْ كَانَ عِنْدِي وَقْتٌ لَسَافَرْتُ.|If I had time, I would travel.`,
[['"If I had known, I would have told you":','لَوْ عَرَفْتُ لَأَخْبَرْتُكَ.','إِذَا عَرَفْتُ أَخْبَرْتُكَ لَوْ.','لَوْ أَعْرِفُ أُخْبِرُكَ سَوْفَ.'],['"If it rains, we\'ll stay home":','إِذَا أَمْطَرَتْ بَقِينَا فِي البَيْتِ.','لَوْ أَمْطَرَتْ لَنْ بَقِينَا.','إِذَا تُمْطِرُ سَوْفَ بَقِينَا.']]),
G1('Exclamation and style', `<p>"How beautiful…!" uses the pattern [[مَا أَفْعَلَ]] + accusative: [[مَا أَجْمَلَ السَّمَاءَ!]] Formal style also likes [[كَمْ مِنْ]] (how many a…) and [[قَدْ]] + past (indeed, already): [[قَدْ وَصَلَ القِطَارُ.]]</p>`,
`مَا أَجْمَلَ السَّمَاءَ!|How beautiful the sky is!
قَدْ وَصَلَ القِطَارُ.|The train has (indeed) arrived.`,
[['"How beautiful the sea is!":','مَا أَجْمَلَ البَحْرَ!','مَا أَجْمَلُ البَحْرِ؟','كَمْ جَمِيلٌ البَحْرُ.'],['"The train has arrived":','قَدْ وَصَلَ القِطَارُ.','قَدْ يَصِلُ القِطَارَ.','قَدْ وَصَلَ القِطَارَ.']])
]};
