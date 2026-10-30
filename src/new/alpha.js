// Alphabets for the new courses. Fields: letter|name|sound{ar,ru,en}|ex|emoji|meaning{ar,ru,en}
const ALPHA = {};
const A3 = (rows) => rows.trim().split('\n').map(l => { const f = l.split('|'); return {letter:f[0], name:f[1], sound:{ar:f[2], ru:f[3], en:f[4]}, ex:f[5], e:f[6], m:{ar:f[7], ru:f[8], en:f[9]}}; });
ALPHA.uz = A3(`
A a|a|أَ (a) مفتوحة|«а»|a as in "father"|olma|🍎|تفاحة|яблоко|apple
B b|be|ب|«б»|b|baliq|🐟|سمكة|рыба|fish
D d|de|د|«д»|d|daraxt|🌳|شجرة|дерево|tree
E e|e|إِ (e)|«э»; после согласной — «е» без смягчения|e as in "bed"|eshik|🚪|باب|дверь|door
F f|ef|ف|«ф»|f|futbol|⚽|كرة القدم|футбол|football
G g|ge|گ (g) مثل g في go — وليست غ|«г»|g as in "go"|gul|🌸|زهرة|цветок|flower
H h|ha|هـ خفيفة (h)|лёгкий выдох, как англ. h|h as in "hat"|hamyon|👛|محفظة نقود|кошелёк|wallet
I i|i|إِي قصيرة (i)|«и»|i as in "sit"|ilon|🐍|أفعى|змея|snake
J j|je|ج (dj)، وفي الكلمات الدخيلة ج شامية|«дж», в заимствованиях «ж»|j as in "jam" (zh in loanwords)|joʻja|🐥|كتكوت|цыплёнок|chick
K k|ka|ك|«к»|k|kitob|📕|كتاب|книга|book
L l|el|ل|«л»|l|lola|🌷|توليب|тюльпан|tulip
M m|em|م|«м»|m|mushuk|🐈|قطة|кошка|cat
N n|en|ن|«н»|n|non|🍞|خبز|лепёшка, хлеб|bread
O o|o|أو مفتوحة (o)، قريبة من «آ» المفخّمة|«о»|o as in "hot"|ota|👨|أب|отец|father
P p|pe|پ (p) — ليست ب|«п»|p|piyola|🍵|فنجان شاي (پيالة)|пиала|tea bowl
Q q|qa|ق (من أقصى الحلق)|глубокое «к», как арабское ق|a deep k from the back of the throat|qor|❄️|ثلج|снег|snow
R r|er|ر|«р» (раскатистое)|rolled r|ruchka|🖊️|قلم|ручка|pen
S s|es|س|«с»|s|suv|💧|ماء|вода|water
T t|te|ت|«т»|t|tuxum|🥚|بيضة|яйцо|egg
U u|u|أُو (u)|«у»|u as in "rule"|uy|🏠|بيت|дом|house
V v|ve|ڤ (v)، وأحياناً قريبة من و|«в» (иногда как англ. w)|v (sometimes close to w)|velosiped|🚲|دراجة|велосипед|bicycle
X x|xa|خ|твёрдое «х»|like "ch" in Scottish "loch"|xat|✉️|رسالة|письмо|letter
Y y|ye|ي (y)|«й»|y as in "yes"|yulduz|⭐|نجمة|звезда|star
Z z|ze|ز|«з»|z|zina|🪜|سُلّم|лестница|ladder
Oʻ oʻ|oʻ|صوت بين «أُو» و«أو»|«ў» — между «о» и «у»|between o and u, like u in "put"|oʻrdak|🦆|بطة|утка|duck
Gʻ gʻ|gʻe|غ|картавое «г», как арабское غ|like French r (Arabic gh)|gʻoz|🪿|إوزّة|гусь|goose
Sh sh|sha|ش|«ш»|sh|shaftoli|🍑|خوخ|персик|peach
Ch ch|che|تش (ch)|«ч»|ch as in "chair"|choy|🍵|شاي|чай|tea
Ng ng|nge|نغ أنفية (ng)|носовое «нг»|ng as in "sing"|tong|🌅|فجر|рассвет|dawn
`);
ALPHA.es = A3(`
A a|a|أَ (a) مفتوحة|«а»|a as in "father"|agua|💧|ماء|вода|water
B b|be|ب|«б»|b|barco|⛵|قارب|корабль|boat
C c|ce|ك؛ وقبل e/i تُلفظ ث (في إسبانيا)|«к»; перед e/i — межзубный звук (англ. th)|k; before e/i like "th" in "think"|casa|🏠|بيت|дом|house
D d|de|د (وبين حرفي علّة تُلفظ قريبة من ذ)|«д» (между гласными мягче, почти как англ. th в this)|d (softer between vowels, like "th" in "this")|dedo|☝️|إصبع|палец|finger
E e|e|إِ (e)|«э»|e as in "bed"|elefante|🐘|فيل|слон|elephant
F f|efe|ف|«ф»|f|flor|🌸|زهرة|цветок|flower
G g|ge|گ (g)؛ وقبل e/i تُلفظ خ|«г»; перед e/i — «х»|g as in "go"; before e/i a rough h|gato|🐈|قطة|кошка|cat
H h|hache|لا تُلفظ أبداً|не читается|always silent|huevo|🥚|بيضة|яйцо|egg
I i|i|إِي (i)|«и»|ee as in "see" (short)|isla|🏝️|جزيرة|остров|island
J j|jota|خ|«х»|a rough h, like "ch" in "loch"|jirafa|🦒|زرافة|жираф|giraffe
K k|ka|ك|«к»|k|kilo|⚖️|كيلو|килограмм|kilo
L l|ele|ل|«л» (мягкое)|l|luna|🌙|قمر|луна|moon
M m|eme|م|«м»|m|manzana|🍎|تفاحة|яблоко|apple
N n|ene|ن|«н»|n|nube|☁️|غيمة|облако|cloud
Ñ ñ|eñe|ني (ny) مثل «نيـ»|«нь»|ny as in "canyon"|niño|👦|طفل|мальчик|boy
O o|o|أو (o)|«о» (всегда чётко)|o as in "or"|oso|🐻|دب|медведь|bear
P p|pe|پ (p) — ليست ب|«п»|p|perro|🐕|كلب|собака|dog
Q q|cu|ك (تأتي دائماً مع ue/ui)|«к» (только в que/qui)|k (always in que/qui)|queso|🧀|جبن|сыр|cheese
R r|erre|ر؛ وفي أول الكلمة وrr تُكرَّر بقوة|«р»; в начале слова и rr — раскатистое|tapped r; at the start and in rr strongly rolled|ratón|🐭|فأر|мышь|mouse
S s|ese|س|«с»|s|sol|☀️|شمس|солнце|sun
T t|te|ت|«т»|t|tomate|🍅|طماطم|помидор|tomato
U u|u|أُو (u)|«у»|oo as in "food"|uva|🍇|عنب|виноград|grapes
V v|uve|ب (مثل b تماماً)|как «б»|like b|vaca|🐄|بقرة|корова|cow
W w|uve doble|و (w)|«у» (как англ. w)|w|wifi|📶|واي فاي|вай-фай|wifi
X x|equis|كس (ks)|«кс»|ks|taxi|🚕|تاكسي|такси|taxi
Y y|ye|ي (y)|«й»|y as in "yes"|yogur|🥣|زبادي|йогурт|yogurt
Z z|zeta|ث (في إسبانيا)|межзубный звук (англ. th)|like "th" in "think"|zapato|👞|حذاء|ботинок|shoe
`);
// English descriptions for the Russian and Arabic alphabets (en-native courses)
ALPHA.ru_en = `
А|a as in "father"|watermelon
Б|b|banana
В|v|water
Г|g as in "go"|mushroom
Д|d|house
Е|ye as in "yes"; softens the consonant before it|fir tree
Ё|yo as in "yogurt" — always stressed|hedgehog
Ж|zh, like "s" in "measure"|beetle
З|z|umbrella
И|ee as in "see"|toy
Й|short y, like "y" in "boy"|yogurt
К|k|cat
Л|l (dark, as in "full")|lamp
М|m|milk
Н|n|nose
О|o when stressed; unstressed it sounds like "a"|window
П|p|pizza
Р|rolled r|fish
С|s|cheese
Т|t|tiger
У|oo as in "food"|duck
Ф|f|flag
Х|h, like "ch" in Scottish "loch"|bread
Ц|ts as in "cats"|flower
Ч|ch as in "chair"|tea
Ш|sh (hard)|cap
Щ|long soft sh, as in "fresh sheep"|brush
Ъ|hard sign: no sound, separates the letters around it|building entrance
Ы|a sound English lacks: between "i" and "u", tongue pulled back|soap
Ь|soft sign: no sound, softens the consonant before it|salt
Э|e as in "end"|screen
Ю|yu as in "you"|skirt
Я|ya as in "yard"|apple`;
ALPHA.ar_en = `
ا|alif|Long "aa", or a seat for hamza. Does not join the next letter.|lion
ب|baa|b|house
ت|taa|t|apples
ث|thaa|th as in "think"|fox
ج|jiim|j as in "jam"|camel
ح|Haa|a breathy h from the middle of the throat|milk
خ|khaa|kh, like "ch" in Scottish "loch"|bread
د|daal|d. Does not join the next letter.|chicken
ذ|dhaal|th as in "this"|gold
ر|raa|rolled r. Does not join the next letter.|letter (message)
ز|zaay|z. Does not join the next letter.|olives
س|siin|s|fish
ش|shiin|sh|sun
ص|Saad|an emphatic, "heavy" s|falcon
ض|Daad|an emphatic d — Arabic is called "the language of Daad"|frog
ط|Taa|an emphatic t|airplane
ظ|DHaa|an emphatic th as in "this"|envelope
ع|ʿayn|a deep sound from the throat, absent in English: squeeze the throat as if saying a strained "a"|eye
غ|ghayn|like French r (a gargled g)|gazelle
ف|faa|f|elephant
ق|qaaf|a deep k from the very back of the mouth|moon
ك|kaaf|k|book
ل|laam|l|lemon
م|miim|m|water
ن|nuun|n|fire
ه|haa|a light h as in "hello"|phone
و|waaw|w, or long "oo". Does not join the next letter.|rose
ي|yaa|y, or long "ee"|hand`;
