// English grammar for uz / es / zh natives. ex: "en|uz|es|zh"
GR.en_x = {
A1: [
{title:{uz:'«to be» feʼli: am / is / are', es:'El verbo «to be»: am / is / are', zh:'动词 “to be”：am / is / are'},
 body:{uz:`<p>Ingliz tilida «boʻlmoq» feʼli tushib qolmaydi: «Men talabaman» = [[I am a student.]]</p><table><tr><th>Olmosh</th><th>Feʼl</th><th>Qisqa</th></tr><tr><td>[[I]]</td><td>[[am]]</td><td>[[I'm]]</td></tr><tr><td>[[he]] / [[she]] / [[it]]</td><td>[[is]]</td><td>[[he's]]</td></tr><tr><td>[[we]] / [[you]] / [[they]]</td><td>[[are]]</td><td>[[we're]]</td></tr></table><p><b>Inkor:</b> [[I am not]], [[she isn't]]. <b>Savol:</b> feʼl oldinga chiqadi: [[Are you a student?]]</p>`,
  es:`<p>Un solo verbo, [[to be]], sirve para «ser» y «estar»: [[I am a student.]] = Soy estudiante; [[I am tired.]] = Estoy cansado.</p><table><tr><th>Pronombre</th><th>Verbo</th><th>Contracción</th></tr><tr><td>[[I]]</td><td>[[am]]</td><td>[[I'm]]</td></tr><tr><td>[[he]] / [[she]] / [[it]]</td><td>[[is]]</td><td>[[he's]]</td></tr><tr><td>[[we]] / [[you]] / [[they]]</td><td>[[are]]</td><td>[[we're]]</td></tr></table><p><b>Negación:</b> [[I am not]], [[she isn't]]. <b>Pregunta:</b> el verbo va delante: [[Are you a student?]] El sujeto nunca se omite.</p>`,
  zh:`<p>英语 的 “是” 不能 省略：“我 是 学生” = [[I am a student.]]</p><table><tr><th>代词</th><th>动词</th><th>缩写</th></tr><tr><td>[[I]]</td><td>[[am]]</td><td>[[I'm]]</td></tr><tr><td>[[he]] / [[she]] / [[it]]</td><td>[[is]]</td><td>[[he's]]</td></tr><tr><td>[[we]] / [[you]] / [[they]]</td><td>[[are]]</td><td>[[we're]]</td></tr></table><p><b>否定：</b>[[I am not]]，[[she isn't]]。<b>疑问：</b>动词 放 到 前面：[[Are you a student?]] 形容词 前 也 要 用 be：[[I am tired.]]（我 累 了）</p>`},
 ex:`I am a student.|Men talabaman.|Soy estudiante.|我 是 学生。
She is a doctor.|U shifokor.|Ella es médica.|她 是 医生。
We are at home.|Biz uydamiz.|Estamos en casa.|我们 在 家。
Are you tired?|Charchadingmi?|¿Estás cansado?|你 累 吗？`,
 quiz:[[{uz:'«Men charchadim»:',es:'«Estoy cansado»:',zh:'“我 累 了”：'},"I am tired.","I tired.","I is tired."],[{uz:'«Ular uyda»:',es:'«Están en casa»:',zh:'“他们 在 家”：'},"They are at home.","They is at home.","They at home."]]},
{title:{uz:'Artikllar a / the va koʻplik', es:'Los artículos a / the y el plural', zh:'冠词 a / the 和 复数'},
 body:{uz:`<p>[[a]] (unli oldidan [[an]]) — birinchi marta tilga olingan birlik narsa: [[a book]], [[an apple]]. [[the]] — maʼlum narsa: [[The book is on the table.]]</p><p>Koʻplik odatda [[-s]]: [[book]] → [[books]]. Notoʻgʻrilari: [[man]] → [[men]], [[child]] → [[children]].</p>`,
  es:`<p>[[a]] ([[an]] ante vocal) = un/una: [[a book]], [[an apple]]. [[the]] = el/la/los/las, sin género: [[the book]], [[the books]].</p><p>El plural suele ser [[-s]]: [[book]] → [[books]]. Irregulares: [[man]] → [[men]], [[child]] → [[children]]. Los adjetivos no cambian: [[a big house]], [[big houses]].</p>`,
  zh:`<p>[[a]]（元音 前 用 [[an]]）表示 “一 个”，用于 第一次 提到 的 单数 事物：[[a book]]，[[an apple]]。[[the]] 表示 特指：[[The book is on the table.]]</p><p>复数 一般 加 [[-s]]：[[book]] → [[books]]。不规则：[[man]] → [[men]]，[[child]] → [[children]]。</p>`},
 ex:`I have a dog.|Mening itim bor.|Tengo un perro.|我 有 一 只 狗。
The dog is big.|It katta.|El perro es grande.|这 只 狗 很 大。
I eat an apple every day.|Har kuni bitta olma yeyman.|Como una manzana todos los días.|我 每天 吃 一 个 苹果。
The children are in the park.|Bolalar bogʻda.|Los niños están en el parque.|孩子们 在 公园 里。`,
 quiz:[[{uz:'«bitta olma»:',es:'«una manzana»:',zh:'“一 个 苹果”：'},"an apple","a apple","the apples"],[{uz:'«bolalar»:',es:'«niños»:',zh:'“孩子们”：'},"children","childs","childrens"]]},
{title:{uz:'Present Simple: odatiy harakatlar', es:'Presente simple: acciones habituales', zh:'一般 现在时：习惯 动作'},
 body:{uz:`<p>Odat va doimiy faktlar uchun: [[I work.]], [[We live in Tashkent.]]</p><p class="tip">Muhim qoida: he / she / it bilan feʼlga [[-s]] qoʻshiladi: [[She works.]], [[He lives here.]]</p>`,
  es:`<p>Para hábitos y hechos: [[I work.]], [[We live in Madrid.]] El verbo casi no cambia.</p><p class="tip">Regla clave: con he / she / it se añade [[-s]]: [[She works.]], [[He lives here.]]</p>`,
  zh:`<p>用于 习惯 和 事实：[[I work.]]，[[We live in Beijing.]]</p><p class="tip">重要 规则：主语 是 he / she / it 时，动词 加 [[-s]]：[[She works.]]，[[He lives here.]]</p>`},
 ex:`I drink tea every morning.|Har kuni ertalab choy ichaman.|Tomo té todas las mañanas.|我 每天 早上 喝 茶。
She works in a bank.|U bankda ishlaydi.|Ella trabaja en un banco.|她 在 银行 工作。
They live near the sea.|Ular dengiz yonida yashaydi.|Viven cerca del mar.|他们 住 在 海边。`,
 quiz:[[{uz:'«U ishlaydi»:',es:'«Él trabaja»:',zh:'“他 工作”：'},"He works.","He work.","He working."],[{uz:'«Biz yashaymiz»:',es:'«Vivimos»:',zh:'“我们 住”：'},"We live.","We lives.","We living."]]},
{title:{uz:'Inkor va savol: do / does', es:'Negación y pregunta: do / does', zh:'否定 和 疑问：do / does'},
 body:{uz:`<p>Inkor: [[don't]] / [[doesn't]] + feʼl: [[I don't eat meat.]], [[She doesn't smoke.]]</p><p>Savol: [[Do]] / [[Does]] boshida: [[Do you speak English?]] — [[Yes, I do.]] / [[No, I don't.]]</p><p class="tip">doesn't va does dan keyin -s qoʻyilmaydi: [[Does he work?]]</p>`,
  es:`<p>Negación: [[don't]] / [[doesn't]] + verbo: [[I don't eat meat.]], [[She doesn't smoke.]]</p><p>Pregunta: [[Do]] / [[Does]] al principio: [[Do you speak English?]] — [[Yes, I do.]] / [[No, I don't.]]</p><p class="tip">Tras doesn't y does el verbo pierde la -s: [[Does he work?]]</p>`,
  zh:`<p>否定：[[don't]] / [[doesn't]] + 动词：[[I don't eat meat.]]，[[She doesn't smoke.]]</p><p>疑问：句首 用 [[Do]] / [[Does]]：[[Do you speak English?]] —— [[Yes, I do.]] / [[No, I don't.]]</p><p class="tip">doesn't 和 does 后面 的 动词 不 加 -s：[[Does he work?]]</p>`},
 ex:`I don't understand.|Tushunmayapman.|No entiendo.|我 不 明白。
Do you speak English?|Inglizcha gapirasizmi?|¿Hablas inglés?|你 会 说 英语 吗？
Where do you live?|Qayerda yashaysan?|¿Dónde vives?|你 住 在 哪儿？`,
 quiz:[[{uz:'«U (ayol) chekmaydi»:',es:'«Ella no fuma»:',zh:'“她 不 抽烟”：'},"She doesn't smoke.","She don't smoke.","She doesn't smokes."],[{uz:'«U ishlaydimi?»:',es:'«¿Él trabaja?»:',zh:'“他 工作 吗？”：'},"Does he work?","Do he work?","Does he works?"]]}
],
A2: [
{title:{uz:'Past Simple: oʻtgan zamon', es:'Pasado simple', zh:'一般 过去时'},
 body:{uz:`<p>Toʻgʻri feʼllarga [[-ed]] qoʻshiladi: [[work]] → [[worked]]. Notoʻgʻrilarini yodlash kerak: [[go]] → [[went]], [[see]] → [[saw]], [[buy]] → [[bought]].</p><p>Inkor va savol [[did]] bilan, feʼl esa asos shaklda: [[I didn't go.]], [[Did you see it?]]</p>`,
  es:`<p>Los verbos regulares añaden [[-ed]]: [[work]] → [[worked]]. Los irregulares hay que memorizarlos: [[go]] → [[went]], [[see]] → [[saw]], [[buy]] → [[bought]].</p><p>Negación y pregunta con [[did]] + verbo base: [[I didn't go.]], [[Did you see it?]]</p>`,
  zh:`<p>规则 动词 加 [[-ed]]：[[work]] → [[worked]]。不规则 动词 要 背：[[go]] → [[went]]，[[see]] → [[saw]]，[[buy]] → [[bought]]。</p><p>否定 和 疑问 用 [[did]] + 动词 原形：[[I didn't go.]]，[[Did you see it?]]</p>`},
 ex:`Yesterday I went to the cinema.|Kecha kinoga bordim.|Ayer fui al cine.|昨天 我 去 看 电影 了。
She bought a new dress.|U yangi koʻylak sotib oldi.|Se compró un vestido nuevo.|她 买 了 一 条 新 连衣裙。
Did you call your mother?|Onangga qoʻngʻiroq qildingmi?|¿Llamaste a tu madre?|你 给 妈妈 打 电话 了 吗？`,
 quiz:[[{uz:'«Men bordim»:',es:'«Fui»:',zh:'“我 去 了”：'},"I went.","I goed.","I did went."],[{uz:'«Koʻrdingmi?»:',es:'«¿Lo viste?»:',zh:'“你 看见 了 吗？”：'},"Did you see it?","Did you saw it?","Do you saw it?"]]},
{title:{uz:'Kelasi zamon: will va going to', es:'El futuro: will y going to', zh:'将来时：will 和 going to'},
 body:{uz:`<p>[[going to]] — oldindan rejalashtirilgan ish: [[I'm going to visit Samarkand.]]</p><p>[[will]] — shu zahoti qilingan qaror, vaʼda, bashorat: [[I'll call you later.]], [[It will rain tomorrow.]]</p>`,
  es:`<p>[[going to]] = planes ya decididos: [[I'm going to visit London.]]</p><p>[[will]] = decisiones del momento, promesas y predicciones: [[I'll call you later.]], [[It will rain tomorrow.]]</p>`,
  zh:`<p>[[going to]] 表示 事先 计划 好 的 事：[[I'm going to visit London.]]</p><p>[[will]] 表示 临时 决定、承诺 和 预测：[[I'll call you later.]]，[[It will rain tomorrow.]]</p>`},
 ex:`I'm going to study medicine.|Men tibbiyotni oʻqimoqchiman.|Voy a estudiar medicina.|我 打算 学 医。
I'll help you.|Senga yordam beraman.|Te ayudaré.|我 会 帮 你 的。
It will be sunny tomorrow.|Ertaga quyoshli boʻladi.|Mañana hará sol.|明天 会 是 晴天。`,
 quiz:[[{uz:'«Keyinroq qoʻngʻiroq qilaman» (vaʼda):',es:'«Te llamo luego» (promesa):',zh:'“我 晚点 给 你 打 电话”（承诺）：'},"I'll call you later.","I call you later tomorrow.","I'm call you later."],[{uz:'«Biz sayohat qilmoqchimiz» (reja):',es:'«Vamos a viajar» (plan):',zh:'“我们 打算 去 旅行”（计划）：'},"We're going to travel.","We going to travel.","We will to travel."]]},
{title:{uz:'Present Continuous: hozir boʻlayotgan ish', es:'Presente continuo: lo que pasa ahora', zh:'现在 进行时：正在 发生 的 事'},
 body:{uz:`<p>[[am / is / are]] + feʼl + [[-ing]]: [[I am reading.]] = Hozir oʻqiyapman.</p><p class="tip">Solishtiring: [[I work every day.]] (odat) — [[I'm working now.]] (hozir).</p>`,
  es:`<p>[[am / is / are]] + verbo + [[-ing]]: [[I am reading.]] = Estoy leyendo.</p><p class="tip">Compara: [[I work every day.]] (hábito) — [[I'm working now.]] (ahora).</p>`,
  zh:`<p>[[am / is / are]] + 动词 + [[-ing]]：[[I am reading.]] = 我 正在 读。</p><p class="tip">比较：[[I work every day.]]（习惯）—— [[I'm working now.]]（现在）。</p>`},
 ex:`What are you doing?|Nima qilyapsan?|¿Qué estás haciendo?|你 在 做 什么？
It's raining.|Yomgʻir yogʻyapti.|Está lloviendo.|在 下雨。
The children are playing outside.|Bolalar tashqarida oʻynayapti.|Los niños están jugando fuera.|孩子们 在 外面 玩。`,
 quiz:[[{uz:'«U ovqat pishiryapti»:',es:'«Ella está cocinando»:',zh:'“她 在 做饭”：'},"She is cooking.","She cooking.","She cooks now is."],[{uz:'«Nima qilyapsan?»:',es:'«¿Qué estás haciendo?»:',zh:'“你 在 做 什么？”：'},"What are you doing?","What you are doing?","What do you doing?"]]},
{title:{uz:'Qiyoslash: -er / more / the most', es:'Comparativos y superlativos', zh:'比较级 和 最高级'},
 body:{uz:`<p>Qisqa sifatlar: [[-er]] / [[the -est]]: [[big]] → [[bigger]] → [[the biggest]]. Uzun sifatlar: [[more]] / [[the most]]: [[more interesting]]. «…dan» = [[than]]: [[Moscow is bigger than Tashkent.]]</p><p class="tip">Notoʻgʻri: [[good]] → [[better]] → [[the best]], [[bad]] → [[worse]] → [[the worst]].</p>`,
  es:`<p>Adjetivos cortos: [[-er]] / [[the -est]]: [[big]] → [[bigger]] → [[the biggest]]. Largos: [[more]] / [[the most]]: [[more interesting]]. «que» = [[than]]: [[Moscow is bigger than Madrid.]]</p><p class="tip">Irregulares: [[good]] → [[better]] → [[the best]], [[bad]] → [[worse]] → [[the worst]].</p>`,
  zh:`<p>短 形容词 加 [[-er]] / [[the -est]]：[[big]] → [[bigger]] → [[the biggest]]。长 形容词 用 [[more]] / [[the most]]：[[more interesting]]。“比” = [[than]]：[[Beijing is bigger than London.]]</p><p class="tip">不规则：[[good]] → [[better]] → [[the best]]，[[bad]] → [[worse]] → [[the worst]]。</p>`},
 ex:`My brother is older than me.|Akam mendan katta.|Mi hermano es mayor que yo.|我 哥哥 比 我 大。
This book is more interesting.|Bu kitob qiziqroq.|Este libro es más interesante.|这 本 书 更 有意思。
It's the best day of my life.|Bu hayotimdagi eng yaxshi kun.|Es el mejor día de mi vida.|这 是 我 一生 中 最 好 的 一 天。`,
 quiz:[[{uz:'«yaxshiroq»:',es:'«mejor»:',zh:'“更 好”：'},"better","gooder","more good"],[{uz:'«eng katta»:',es:'«el más grande»:',zh:'“最 大”：'},"the biggest","the most big","the bigger"]]}
],
B1: [
{title:{uz:'Present Perfect: have + V3', es:'Presente perfecto: have + participio', zh:'现在 完成时：have + 过去 分词'},
 body:{uz:`<p>Tajriba va hozir bilan bogʻliq natija uchun: [[have / has]] + 3-shakl: [[I have been to London.]], [[She has lost her keys.]]</p><p class="tip">Aniq oʻtgan vaqt bilan ishlatilmaydi: [[I saw him yesterday.]] (Past Simple), lekin [[I have seen this film.]]</p>`,
  es:`<p>Para experiencias y resultados que importan ahora: [[have / has]] + participio: [[I have been to London.]], [[She has lost her keys.]]</p><p class="tip">No se usa con un momento pasado concreto: [[I saw him yesterday.]] (pasado simple), pero [[I have seen this film.]]</p>`,
  zh:`<p>用于 经历 和 与 现在 有关 的 结果：[[have / has]] + 过去 分词：[[I have been to London.]]，[[She has lost her keys.]]</p><p class="tip">不 和 具体 的 过去 时间 连用：[[I saw him yesterday.]]（一般 过去时），但 [[I have seen this film.]]</p>`},
 ex:`I have already read this book.|Bu kitobni allaqachon oʻqiganman.|Ya he leído este libro.|这 本 书 我 已经 读过 了。
Have you ever been to Japan?|Yaponiyada boʻlganmisan?|¿Has estado alguna vez en Japón?|你 去过 日本 吗？
She has worked here for three years.|U bu yerda uch yildan beri ishlaydi.|Trabaja aquí desde hace tres años.|她 在 这里 工作 三 年 了。`,
 quiz:[[{uz:'«Bu filmni koʻrganman»:',es:'«He visto esta película»:',zh:'“我 看过 这 部 电影”：'},"I have seen this film.","I have saw this film.","I seen this film."],[{uz:'«U (ayol) kalitini yoʻqotdi (hozir yoʻq)»:',es:'«Ha perdido sus llaves»:',zh:'“她 把 钥匙 丢 了”：'},"She has lost her keys.","She have lost her keys.","She has lose her keys."]]},
{title:{uz:'Modal feʼllar: can, must, should', es:'Modales: can, must, should', zh:'情态 动词：can、must、should'},
 body:{uz:`<p>[[can]] — qila olmoq, ruxsat: [[I can swim.]]; [[must]] — majburiyat: [[You must stop.]]; [[should]] — maslahat: [[You should rest.]]</p><p class="tip">Modal feʼldan keyin asos shakl keladi, -s va to qoʻyilmaydi: [[She can drive.]]</p>`,
  es:`<p>[[can]] = poder, saber hacer: [[I can swim.]]; [[must]] = obligación: [[You must stop.]]; [[should]] = consejo: [[You should rest.]]</p><p class="tip">Tras un modal va el verbo base, sin -s ni to: [[She can drive.]]</p>`,
  zh:`<p>[[can]] 能、会：[[I can swim.]]；[[must]] 必须：[[You must stop.]]；[[should]] 应该（建议）：[[You should rest.]]</p><p class="tip">情态 动词 后 用 动词 原形，不 加 -s，也 不 加 to：[[She can drive.]]</p>`},
 ex:`Can you help me?|Menga yordam bera olasizmi?|¿Puedes ayudarme?|你 能 帮 我 吗？
I must finish the report.|Hisobotni tugatishim kerak.|Tengo que terminar el informe.|我 必须 完成 报告。
You should see a doctor.|Shifokorga borishing kerak.|Deberías ir al médico.|你 应该 去 看 医生。`,
 quiz:[[{uz:'«U (ayol) mashina hayday oladi»:',es:'«Ella sabe conducir»:',zh:'“她 会 开车”：'},"She can drive.","She can drives.","She can to drive."],[{uz:'«Dam olishing kerak» (maslahat):',es:'«Deberías descansar»:',zh:'“你 应该 休息”：'},"You should rest.","You should to rest.","You should rests."]]},
{title:{uz:'Birinchi shart gap: if + Present, will', es:'Primer condicional: if + presente, will', zh:'第一 条件句：if + 现在时，will'},
 body:{uz:`<p>Real kelajak sharti: [[If it rains, we will stay at home.]] = Yomgʻir yogʻsa, uyda qolamiz.</p><p class="tip">if qismida will ishlatilmaydi: [[If I have time…]], «If I will have» emas.</p>`,
  es:`<p>Condición real en el futuro: [[If it rains, we will stay at home.]] = Si llueve, nos quedaremos en casa.</p><p class="tip">En la parte con if no se usa will: [[If I have time…]], nunca «If I will have».</p>`,
  zh:`<p>将来 可能 的 条件：[[If it rains, we will stay at home.]] = 如果 下雨，我们 就 待 在 家里。</p><p class="tip">if 从句 里 不用 will：[[If I have time…]]，不能 说 “If I will have”。</p>`},
 ex:`If I have time, I'll call you.|Vaqtim boʻlsa, senga qoʻngʻiroq qilaman.|Si tengo tiempo, te llamo.|如果 我 有 时间，就 给 你 打 电话。
If you study, you will pass.|Oʻqisang, oʻtasan.|Si estudias, aprobarás.|如果 你 学习，就 能 通过。`,
 quiz:[[{uz:'«Yomgʻir yogʻsa, uyda qolamiz»:',es:'«Si llueve, nos quedamos en casa»:',zh:'“如果 下雨，我们 就 待 在 家”：'},"If it rains, we'll stay at home.","If it will rain, we stay at home.","If it rain, we will stay at home."],[{uz:'«Charchasang, dam ol»:',es:'«Si estás cansado, descansa»:',zh:'“如果 你 累 了，就 休息”：'},"If you are tired, rest.","If you will be tired, rest.","If you tired, rest."]]}
],
B2: [
{title:{uz:'Majhul nisbat', es:'La voz pasiva', zh:'被动 语态'},
 body:{uz:`<p>[[be]] + 3-shakl: [[The bridge was built in 1900.]], [[English is spoken here.]] Bajaruvchi kerak boʻlsa — [[by]]: [[written by Tolstoy]].</p>`,
  es:`<p>[[be]] + participio: [[The bridge was built in 1900.]], [[English is spoken here.]] El agente va con [[by]]: [[written by Cervantes]].</p>`,
  zh:`<p>[[be]] + 过去 分词：[[The bridge was built in 1900.]]，[[English is spoken here.]] 需要 说出 动作 者 时 用 [[by]]：[[written by Lu Xun]]。</p>`},
 ex:`The letter was sent yesterday.|Xat kecha yuborildi.|La carta se envió ayer.|信 昨天 寄出 了。
The book has been translated into many languages.|Kitob koʻp tillarga tarjima qilingan.|El libro ha sido traducido a muchos idiomas.|这 本 书 被 翻译 成 了 很多 语言。
The house is being repaired.|Uy taʼmirlanmoqda.|Están reparando la casa.|房子 正在 修。`,
 quiz:[[{uz:'«Uy sotildi»:',es:'«La casa se vendió»:',zh:'“房子 卖掉 了”：'},"The house was sold.","The house sold was.","The house was sell."],[{uz:'«Bu yerda ingliz tilida gapiriladi»:',es:'«Aquí se habla inglés»:',zh:'“这里 说 英语”：'},"English is spoken here.","English speaks here.","English is speak here."]]},
{title:{uz:'Ikkinchi shart gap: if + Past, would', es:'Segundo condicional: if + pasado, would', zh:'第二 条件句：if + 过去时，would'},
 body:{uz:`<p>Hozirgi real boʻlmagan holat: [[If I had more time, I would travel.]] = Koʻproq vaqtim boʻlsa, sayohat qilardim.</p><p class="tip">Maslahatda: [[If I were you, I would accept.]]</p>`,
  es:`<p>Situaciones irreales en el presente: [[If I had more time, I would travel.]] = Si tuviera más tiempo, viajaría.</p><p class="tip">Para aconsejar: [[If I were you, I would accept.]] = Yo que tú, aceptaría.</p>`,
  zh:`<p>与 现在 事实 相反 的 假设：[[If I had more time, I would travel.]] = 如果 我 有 更 多 时间，我 就 去 旅行。</p><p class="tip">给 建议：[[If I were you, I would accept.]] = 如果 我 是 你，我 就 接受。</p>`},
 ex:`If I had money, I would buy a house.|Pulim boʻlsa, uy sotib olardim.|Si tuviera dinero, compraría una casa.|如果 我 有 钱，我 就 买 房子。
If I were you, I would agree.|Sening oʻrningda boʻlsam, rozi boʻlardim.|Yo que tú, aceptaría.|如果 我 是 你，我 就 同意。`,
 quiz:[[{uz:'«Bilganimda, senga aytardim»:',es:'«Si lo supiera, te lo diría»:',zh:'“要是 我 知道，就 告诉 你”：'},"If I knew, I would tell you.","If I know, I would tell you.","If I would know, I told you."],[{uz:'«sotib olardim»:',es:'«compraría»:',zh:'“我 会 买”：'},"I would buy","I will bought","I would bought"]]},
{title:{uz:'Oʻzlashtirma gap', es:'Estilo indirecto', zh:'间接 引语'},
 body:{uz:`<p>Oʻtgan zamondagi said / asked dan keyin zamon bir pogʻona orqaga suriladi: [[“I am tired.”]] → [[She said she was tired.]]; [[“I will come.”]] → [[He said he would come.]]</p><p class="tip">Savolda soʻz tartibi oddiy boʻladi: [[She asked where I worked.]]</p>`,
  es:`<p>Tras said / asked en pasado, el tiempo retrocede: [[“I am tired.”]] → [[She said she was tired.]]; [[“I will come.”]] → [[He said he would come.]]</p><p class="tip">En preguntas indirectas el orden es normal: [[She asked where I worked.]]</p>`,
  zh:`<p>在 过去时 的 said / asked 后，时态 往 前 推：[[“I am tired.”]] → [[She said she was tired.]]；[[“I will come.”]] → [[He said he would come.]]</p><p class="tip">间接 疑问句 用 陈述 语序：[[She asked where I worked.]]</p>`},
 ex:`He said he would come later.|U keyinroq kelishini aytdi.|Dijo que vendría más tarde.|他 说 他 晚 点儿 来。
She asked where I worked.|U qayerda ishlashimni soʻradi.|Me preguntó dónde trabajaba.|她 问 我 在 哪儿 工作。
I asked him to close the window.|Undan derazani yopishini soʻradim.|Le pedí que cerrara la ventana.|我 请 他 关上 窗户。`,
 quiz:[[{uz:'«U (ayol) charchaganini aytdi»:',es:'«Dijo que estaba cansada»:',zh:'“她 说 她 累 了”：'},"She said she was tired.","She said she is tired was.","She told she tired."],[{uz:'«U qayerda yashashimni soʻradi»:',es:'«Me preguntó dónde vivía»:',zh:'“他 问 我 住 在 哪儿”：'},"He asked where I lived.","He asked where did I live.","He asked where I do live."]]}
],
C1: [
{title:{uz:'Nisbiy gaplar: who, which, that, whose', es:'Oraciones de relativo: who, which, that, whose', zh:'定语 从句：who、which、that、whose'},
 body:{uz:`<p>[[who]] — odamlar, [[which]] — narsalar, [[that]] — ikkalasi uchun, [[whose]] — kimning: [[The woman who called is my aunt.]], [[The book which I bought…]], [[the man whose car…]]</p><p class="tip">Toʻldiruvchi boʻlsa, nisbiy soʻz tushib qolishi mumkin: [[the book I read]].</p>`,
  es:`<p>[[who]] para personas, [[which]] para cosas, [[that]] para ambos, [[whose]] = cuyo: [[The woman who called is my aunt.]], [[The book which I bought…]], [[the man whose car…]]</p><p class="tip">Si es complemento, el relativo puede omitirse: [[the book I read]] = el libro que leí.</p>`,
  zh:`<p>[[who]] 指 人，[[which]] 指 物，[[that]] 两者 都 可以，[[whose]] 表示 “……的”：[[The woman who called is my aunt.]]，[[The book which I bought…]]，[[the man whose car…]]</p><p class="tip">关系词 作 宾语 时 可以 省略：[[the book I read]] = 我 读 的 书。</p>`},
 ex:`The student who passed the exam is happy.|Imtihondan oʻtgan talaba xursand.|El estudiante que aprobó está contento.|通过 考试 的 学生 很 高兴。
This is the city where I was born.|Bu men tugʻilgan shahar.|Esta es la ciudad donde nací.|这 是 我 出生 的 城市。
I have a friend whose father is a pilot.|Otasi uchuvchi boʻlgan doʻstim bor.|Tengo un amigo cuyo padre es piloto.|我 有 一 个 朋友，他 爸爸 是 飞行员。`,
 quiz:[[{uz:'«qoʻngʻiroq qilgan ayol»:',es:'«la mujer que llamó»:',zh:'“打 电话 的 那 个 女人”：'},"the woman who called","the woman which called","the woman whose called"],[{uz:'«mashinasi qizil boʻlgan odam»:',es:'«el hombre cuyo coche es rojo»:',zh:'“车 是 红色 的 那 个 人”：'},"the man whose car is red","the man who car is red","the man which car is red"]]},
{title:{uz:'Uchinchi shart gap va wish', es:'Tercer condicional y wish', zh:'第三 条件句 和 wish'},
 body:{uz:`<p>Oʻtmishdagi real boʻlmagan holat: [[If I had known, I would have told you.]] = Bilganimda, senga aytgan boʻlardim.</p><p>[[I wish]] + Past = afsus: [[I wish I spoke Chinese.]] (Xitoycha gapirsam edi.)</p>`,
  es:`<p>Situaciones irreales del pasado: [[If I had known, I would have told you.]] = Si lo hubiera sabido, te lo habría dicho.</p><p>[[I wish]] + pasado = ojalá: [[I wish I spoke Chinese.]] (Ojalá hablara chino.)</p>`,
  zh:`<p>与 过去 事实 相反 的 假设：[[If I had known, I would have told you.]] = 要是 我 早 知道，就 告诉 你 了。</p><p>[[I wish]] + 过去时 = 但愿：[[I wish I spoke Chinese.]]（要是 我 会 说 中文 就 好 了。）</p>`},
 ex:`If I had known, I would have told you.|Bilganimda, senga aytgan boʻlardim.|Si lo hubiera sabido, te lo habría dicho.|要是 我 早 知道，就 告诉 你 了。
I wish I had more time.|Koʻproq vaqtim boʻlsa edi.|Ojalá tuviera más tiempo.|要是 我 有 更 多 时间 就 好 了。`,
 quiz:[[{uz:'«Bilganimda, senga aytgan boʻlardim»:',es:'«Si lo hubiera sabido, te lo habría dicho»:',zh:'“要是 我 早 知道，就 告诉 你 了”：'},"If I had known, I would have told you.","If I knew, I will have told you.","If I would know, I had told you."],[{uz:'«Koʻproq vaqtim boʻlsa edi»:',es:'«Ojalá tuviera más tiempo»:',zh:'“要是 我 有 更 多 时间 就 好 了”：'},"I wish I had more time.","I wish I have more time.","I wish I will have more time."]]}
],
C2: [
{title:{uz:'Frazali feʼllar va iboralar', es:'Phrasal verbs y modismos', zh:'短语 动词 和 习语'},
 body:{uz:`<p>Feʼl + kichik soʻz yangi maʼno beradi: [[give up]] (taslim boʻlmoq), [[look after]] (qaramoq), [[turn down]] (rad etmoq), [[get over]] (yengib oʻtmoq).</p><p>Iboralar butunligicha yodlanadi: [[Better late than never.]], [[A friend in need is a friend indeed.]]</p>`,
  es:`<p>Verbo + partícula = nuevo significado: [[give up]] (rendirse), [[look after]] (cuidar), [[turn down]] (rechazar), [[get over]] (superar).</p><p>Los modismos se aprenden enteros: [[Better late than never.]], [[A friend in need is a friend indeed.]]</p>`,
  zh:`<p>动词 + 小品词 构成 新 意思：[[give up]]（放弃），[[look after]]（照顾），[[turn down]]（拒绝），[[get over]]（克服）。</p><p>习语 要 整体 记：[[Better late than never.]]，[[A friend in need is a friend indeed.]]</p>`},
 ex:`Don't give up!|Taslim boʻlma!|¡No te rindas!|别 放弃！
She turned down the offer.|U taklifni rad etdi.|Rechazó la oferta.|她 拒绝 了 这 个 提议。
Better late than never.|Hech qachondan koʻra kech yaxshi.|Más vale tarde que nunca.|迟到 总比 不到 好。`,
 quiz:[[{uz:'«taslim boʻlmoq»:',es:'«rendirse»:',zh:'“放弃”：'},"give up","give in up","give off"],[{uz:'«Hech qachondan koʻra kech yaxshi»:',es:'«Más vale tarde que nunca»:',zh:'“迟到 总比 不到 好”：'},"Better late than never.","Late is better never.","Never late than better."]]},
{title:{uz:'Urgʻu uchun inversiya', es:'Inversión para dar énfasis', zh:'倒装 强调'},
 body:{uz:`<p>Rasmiy uslubda inkor soʻz gap boshiga chiqsa, yordamchi feʼl egadan oldin keladi: [[Never have I seen such beauty.]], [[Not only did he come, but he also helped.]]</p><p class="tip">[[No sooner had he arrived than…]] = U kelishi bilanoq…</p>`,
  es:`<p>En estilo formal, si una palabra negativa va al principio, el auxiliar va antes del sujeto: [[Never have I seen such beauty.]], [[Not only did he come, but he also helped.]]</p><p class="tip">[[No sooner had he arrived than…]] = Apenas llegó…</p>`,
  zh:`<p>在 正式 文体 中，否定 词 放 在 句首 时，助动词 要 放 在 主语 前：[[Never have I seen such beauty.]]，[[Not only did he come, but he also helped.]]</p><p class="tip">[[No sooner had he arrived than…]] = 他 一 到 就……</p>`},
 ex:`Never have I seen such a beautiful city.|Hech qachon bunday goʻzal shaharni koʻrmaganman.|Nunca he visto una ciudad tan bonita.|我 从来 没 见过 这么 美 的 城市。
Not only did he come, but he also helped.|U nafaqat keldi, balki yordam ham berdi.|No solo vino, sino que también ayudó.|他 不但 来 了，还 帮 了 忙。`,
 quiz:[[{uz:'«Hech qachon bunday narsani koʻrmaganman» (rasmiy):',es:'«Nunca he visto algo así» (formal):',zh:'“我 从来 没 见过 这样 的 东西”（正式）：'},"Never have I seen such a thing.","Never I have seen such a thing.","Never seen I have such a thing."],[{uz:'«U nafaqat keldi…»:',es:'«No solo vino…»:',zh:'“他 不但 来 了……”：'},"Not only did he come…","Not only he came did…","Not only came he did…"]]}
]};
