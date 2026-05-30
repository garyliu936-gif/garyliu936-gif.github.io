/**
 * Generates /zh/breeds/index.html — the Simplified Chinese breed directory.
 * Run: node build_zh_breeds.js
 */
const fs = require('fs');
const path = require('path');

// ── Chinese breed name dictionary ──────────────────────────────────────────
const BREED_NAMES = {
  'Affenpinscher':'猴面梗','Afghan Hound':'阿富汗猎犬','Airedale Terrier':'艾尔谷梗',
  'Akita':'秋田犬','Alaskan Malamute':'阿拉斯加雪橇犬','American English Coonhound':'美国英国猎浣熊犬',
  'American Eskimo Dog':'美国爱斯基摩犬','American Foxhound':'美国猎狐犬',
  'American Hairless Terrier':'美国无毛梗','American Staffordshire Terrier':'美国斯塔福郡梗',
  'American Water Spaniel':'美国水猎犬','Anatolian Shepherd Dog':'安纳托利亚牧羊犬',
  'Australian Cattle Dog':'澳大利亚牧牛犬','Australian Shepherd':'澳大利亚牧羊犬',
  'Australian Terrier':'澳大利亚梗','Azawakh':'阿扎瓦克猎犬','Barbet':'巴比特犬',
  'Basenji':'巴辛吉犬','Basset Hound':'巴塞特猎犬','Beagle':'比格犬',
  'Bearded Collie':'有须牧羊犬','Beauceron':'博塞隆犬','Bedlington Terrier':'贝德灵顿梗',
  'Belgian Laekenois':'比利时拉坎诺斯犬','Belgian Malinois':'比利时马里诺斯犬',
  'Belgian Sheepdog':'比利时牧羊犬','Belgian Tervuren':'比利时特伏丹犬',
  'Bergamasco Sheepdog':'贝加马斯科牧羊犬','Berger Picard':'皮卡迪牧羊犬',
  'Bernese Mountain Dog':'伯恩山犬','Bichon Frise':'比熊犬','Biewer Terrier':'比尔梗',
  'Black and Tan Coonhound':'黑褐色猎浣熊犬','Black Russian Terrier':'黑色俄罗斯梗',
  'Bloodhound':'寻血猎犬','Bluetick Coonhound':'蓝斑猎浣熊犬','Boerboel':'波尔布尔犬',
  'Border Collie':'边境牧羊犬','Border Terrier':'边境梗','Borzoi':'苏俄猎狼犬',
  'Boston Terrier':'波士顿梗','Bouvier des Flandres':'佛兰德斯牧牛犬','Boxer':'拳师犬',
  'Boykin Spaniel':'博伊金猎犬','Bracco Italiano':'意大利布拉科犬','Briard':'布里亚德犬',
  'Brittany':'布列塔尼犬','Brussels Griffon':'布鲁塞尔格里芬犬','Bull Terrier':'牛头梗',
  'Bulldog':'英国斗牛犬','Bullmastiff':'斗牛马士提夫犬','Cairn Terrier':'凯安梗',
  'Canaan Dog':'迦南犬','Cane Corso':'卡斯罗犬','Cardigan Welsh Corgi':'卡地根威尔士柯基犬',
  'Cavalier King Charles Spaniel':'查理士王骑士猎犬','Cesky Terrier':'捷克梗',
  'Chesapeake Bay Retriever':'切萨皮克湾寻回犬','Chihuahua':'吉娃娃',
  'Chinese Crested':'中国冠毛犬','Chinese Shar-Pei':'中国沙皮犬','Chinook':'奇努克犬',
  'Chow Chow':'松狮犬','Cirneco dell\'Etna':'西西里猎犬','Clumber Spaniel':'克伦伯猎犬',
  'Cocker Spaniel':'可卡犬','Collie':'柯利牧羊犬','Corgi':'威尔士柯基犬',
  'Coton de Tulear':'棉花面纱犬','Curly-Coated Retriever':'卷毛寻回犬','Dachshund':'腊肠犬',
  'Dalmatian':'大麦丁犬','Dandie Dinmont Terrier':'丹迪丁蒙梗',
  'Danish-Swedish Farmdog':'丹麦瑞典农场犬','Doberman Pinscher':'杜宾犬',
  'Dogo Argentino':'阿根廷杜高犬','Dogue de Bordeaux':'波尔多犬',
  'English Cocker Spaniel':'英国可卡犬','English Foxhound':'英国猎狐犬',
  'English Setter':'英国雪达犬','English Springer Spaniel':'英国跳猎犬',
  'English Toy Spaniel':'英国玩具猎犬','Entlebucher Mountain Dog':'恩特雷布赫山犬',
  'Field Spaniel':'田野猎犬','Finnish Lapphund':'芬兰拉普犬','Finnish Spitz':'芬兰猎犬',
  'Flat-Coated Retriever':'平毛寻回犬','French Bulldog':'法国斗牛犬',
  'German Pinscher':'德国宾莎犬','German Shepherd':'德国牧羊犬',
  'German Shorthaired Pointer':'德国短毛指示犬','German Wirehaired Pointer':'德国硬毛指示犬',
  'Giant Schnauzer':'巨型雪纳瑞','Glen of Imaal Terrier':'伊马尔谷梗',
  'Gordon Setter':'戈登雪达犬','Grand Basset Griffon Vendeen':'大型旺代格里芬犬',
  'Great Dane':'大丹犬','Great Pyrenees':'大白熊犬','Greater Swiss Mountain Dog':'大瑞士山地犬',
  'Greyhound':'灵缇犬','Harrier':'哈里尔猎犬','Havanese':'哈瓦那犬',
  'Ibizan Hound':'依比萨猎犬','Icelandic Sheepdog':'冰岛牧羊犬',
  'Irish Red and White Setter':'爱尔兰红白雪达犬','Irish Setter':'爱尔兰雪达犬',
  'Irish Terrier':'爱尔兰梗','Irish Water Spaniel':'爱尔兰水猎犬',
  'Irish Wolfhound':'爱尔兰猎狼犬','Italian Greyhound':'意大利灵缇犬',
  'Japanese Chin':'日本狆','Keeshond':'荷兰毛狮犬','Kerry Blue Terrier':'凯利蓝梗',
  'Komondor':'可蒙犬','Kuvasz':'库瓦兹犬','Lagotto Romagnolo':'拉戈托罗马诺洛犬',
  'Lakeland Terrier':'莱克兰梗','Lancashire Heeler':'兰开夏踵犬','Leonberger':'莱昂贝格犬',
  'Lhasa Apso':'拉萨阿普索犬','Lowchen':'罗钦犬','Maltese':'马耳他犬',
  'Manchester Terrier':'曼彻斯特梗','Mastiff':'马士提夫犬',
  'Miniature American Shepherd':'迷你美国牧羊犬','Miniature Bull Terrier':'迷你牛头梗',
  'Miniature Pinscher':'迷你宾莎犬','Miniature Schnauzer':'迷你雪纳瑞','Mudi':'穆迪犬',
  'Neapolitan Mastiff':'那不勒斯马士提夫犬','Nederlandse Kooikerhondje':'荷兰科伊克霍温德犬',
  'Newfoundland':'纽芬兰犬','Norfolk Terrier':'诺福克梗','Norwegian Buhund':'挪威布哈德犬',
  'Norwegian Elkhound':'挪威猎麋犬','Norwegian Lundehund':'挪威伦德猎犬',
  'Norwich Terrier':'诺里奇梗','Nova Scotia Duck Tolling Retriever':'新斯科舍诱鸭寻回犬',
  'Old English Sheepdog':'古代英国牧羊犬','Otterhound':'水獭猎犬','Papillon':'蝴蝶犬',
  'Parson Russell Terrier':'帕森罗素梗','Pekingese':'北京犬',
  'Petit Basset Griffon Vendeen':'小型旺代格里芬犬','Pharaoh Hound':'法老王猎犬',
  'Plott Hound':'普罗特猎犬','Pointer':'英国指示犬','Polish Lowland Sheepdog':'波兰低地牧羊犬',
  'Pomeranian':'博美犬','Poodle':'贵宾犬','Portuguese Podengo Pequeno':'葡萄牙小波腾歌犬',
  'Portuguese Water Dog':'葡萄牙水犬','Pug':'巴哥犬','Puli':'波利犬','Pumi':'普米犬',
  'Pyrenean Shepherd':'比利牛斯牧羊犬','Rat Terrier':'鼠梗','Redbone Coonhound':'红骨猎浣熊犬',
  'Rhodesian Ridgeback':'罗得西亚脊背犬','Rottweiler':'罗威纳犬','Russell Terrier':'罗素梗',
  'Russian Toy':'俄罗斯玩具犬','Saint Bernard':'圣伯纳犬','Saluki':'萨路基猎犬',
  'Samoyed':'萨摩耶犬','Schipperke':'史奇派克犬','Scottish Deerhound':'苏格兰猎鹿犬',
  'Scottish Terrier':'苏格兰梗','Sealyham Terrier':'西里汉姆梗',
  'Shetland Sheepdog':'喜乐蒂牧羊犬','Shiba Inu':'柴犬','Shih Tzu':'西施犬',
  'Siberian Husky':'西伯利亚哈士奇','Silky Terrier':'丝毛梗','Skye Terrier':'斯凯梗',
  'Sloughi':'斯卢基猎犬','Smooth Fox Terrier':'平毛猎狐梗',
  'Soft Coated Wheaten Terrier':'软毛麦色梗','Spanish Water Dog':'西班牙水犬',
  'Spinone Italiano':'意大利斯宾诺犬','Staffordshire Bull Terrier':'斯塔福郡斗牛梗',
  'Standard Schnauzer':'标准雪纳瑞','Sussex Spaniel':'萨塞克斯猎犬',
  'Swedish Vallhund':'瑞典万能梗','Tibetan Mastiff':'藏獒','Tibetan Spaniel':'西藏猎犬',
  'Tibetan Terrier':'西藏梗','Toy Fox Terrier':'玩具猎狐梗',
  'Treeing Walker Coonhound':'树行者浣熊猎犬','Vizsla':'维兹拉犬','Weimaraner':'魏玛犬',
  'Welsh Springer Spaniel':'威尔士跳猎犬','Welsh Terrier':'威尔士梗',
  'West Highland White Terrier':'西高地白梗','Whippet':'惠比特犬',
  'Wire Fox Terrier':'刚毛猎狐梗','Wirehaired Pointing Griffon':'硬毛指示格里芬犬',
  'Wirehaired Vizsla':'硬毛维兹拉犬','Xoloitzcuintli':'墨西哥无毛犬',
  'Yorkshire Terrier':'约克夏梗',
  // Hybrids
  'Affenpoo':'猴面梗贵宾混血犬','Airedoodle':'艾尔谷贵宾混血犬','Akita Shepherd':'秋田牧羊混血犬',
  'Aussiedoodle':'澳牧贵宾混血犬','Aussiedor':'澳牧拉布拉多混血犬','Bagel Hound':'比格巴吉度混血犬',
  'Bassador':'巴塞特拉布拉多混血犬','Beabull':'比格英斗混血犬','Beagador':'比格拉布拉多混血犬',
  'Beaglier':'比格骑士混血犬','Bernedoodle':'伯恩山贵宾混血犬','Borador':'边牧拉布拉多混血犬',
  'Bordoodle':'边牧贵宾混血犬','Bossipoo':'波士顿梗贵宾混血犬','Boxador':'拳师拉布拉多混血犬',
  'Boxerdoodle':'拳师贵宾混血犬','Bugg':'波士顿梗巴哥混血犬','Bullador':'英斗拉布拉多混血犬',
  'Cairnoodle':'凯安梗贵宾混血犬','Cavachon':'骑士比熊混血犬','Cavapoo':'骑士贵宾混血犬',
  'Cavapoochon':'骑士贵宾比熊混血犬','Cheagle':'吉娃娃比格混血犬','Chipoo':'吉娃娃贵宾混血犬',
  'Chiweenie':'吉娃娃腊肠混血犬','Chow Shepherd':'松狮牧羊混血犬','Chug':'吉娃娃巴哥混血犬',
  'Chusky':'松狮哈士奇混血犬','Cockapoo':'可卡贵宾混血犬','Corgidor':'柯基拉布拉多混血犬',
  'Corgipoo':'柯基贵宾混血犬','Corman Shepherd':'柯基德牧混血犬','Dalmadoodle':'大麦丁贵宾混血犬',
  'Doberdoodle':'杜宾贵宾混血犬','Dorgi':'腊肠柯基混血犬','Double Doodle':'双贵宾混血犬',
  'Doxiepoo':'腊肠贵宾混血犬','Flandoodle':'佛兰德牧牛贵宾混血犬','Foodle':'猎狐梗贵宾混血犬',
  'Frenchton':'法斗波士顿梗混血犬','Froodle':'法斗贵宾混血犬','Gerberian Shepsky':'德牧哈士奇混血犬',
  'Golden Retriever':'金毛寻回犬',
  'Goberian':'金毛哈士奇混血犬','Goldador':'金毛拉布拉多混血犬',
  'Golden Mountain Dog':'金毛伯恩山混血犬','Goldendoodle':'金毛贵宾混血犬',
  'Goldmaraner':'金毛魏玛混血犬','Gollie':'金毛柯利混血犬','Great Danoodle':'大丹贵宾混血犬',
  'Havapoo':'哈瓦那贵宾混血犬','Horgi':'哈士奇柯基混血犬','Huskimo':'哈士奇爱斯基摩混血犬',
  'Husky Inu':'哈士奇柴犬混血犬','Huskydoodle':'哈士奇贵宾混血犬',
  'Irish Doodle':'爱尔兰雪达贵宾混血犬','Irish Wolfadoodle':'爱尔兰猎狼贵宾混血犬',
  'Jackadoodle':'杰克罗素贵宾混血犬','Jug':'杰克罗素巴哥混血犬',
  'Labmaraner':'拉布拉多魏玛混血犬','Labradoodle':'拉布拉多贵宾混血犬',
  'Labrador Retriever':'拉布拉多寻回犬','Labsky':'拉布拉多哈士奇混血犬',
  'Lhasapoo':'拉萨贵宾混血犬','Mal-Shi':'马耳他西施混血犬','Maltichon':'马耳他比熊混血犬',
  'Maltipoo':'马耳他贵宾混血犬','Mastidoodle':'马士提夫贵宾混血犬','Morkie':'马耳他约克夏混血犬',
  'Newfiedoodle':'纽芬兰贵宾混血犬','Peekapoo':'北京贵宾混血犬','Pitsky':'比特哈士奇混血犬',
  'Pom-A-Pug':'博美巴哥混血犬','Pomapoo':'博美贵宾混血犬','Pomchi':'博美吉娃娃混血犬',
  'Pomsky':'博美哈士奇混血犬','Poochon':'贵宾比熊混血犬','Pooton':'贵宾棉花面纱混血犬',
  'Portidoodle':'葡萄牙水犬贵宾混血犬','Pugapoo':'巴哥贵宾混血犬','Puggle':'巴哥比格混血犬',
  'Pyredoodle':'大白熊贵宾混血犬','Ratoodle':'鼠梗贵宾混血犬','Rottador':'罗威纳拉布拉多混血犬',
  'Rottle':'罗威纳贵宾混血犬','Rottsky':'罗威纳哈士奇混血犬',
  'Saint Berdoodle':'圣伯纳贵宾混血犬','Sammypoo':'萨摩耶贵宾混血犬',
  'Schnoodle':'雪纳瑞贵宾混血犬','Scoodle':'苏格兰梗贵宾混血犬',
  'Sheepadoodle':'古英牧贵宾混血犬','Shepadoodle':'德牧贵宾混血犬',
  'Sheprador':'德牧拉布拉多混血犬','Shih-Poo':'西施贵宾混血犬','Shorkie':'西施约克夏混血犬',
  'Spoodle':'英国跳猎贵宾混血犬','Springerdoodle':'英国跳猎贵宾混血犬',
  'Weimardoodle':'魏玛贵宾混血犬','Westiepoo':'西高地贵宾混血犬',
  'Whoodle':'软毛麦色梗贵宾混血犬','Woodle':'威尔士梗贵宾混血犬','Yorkipoo':'约克夏贵宾混血犬',
};

const SIZE_LABELS = { 'Small':'小型', 'Medium':'中型', 'Large':'大型', 'Giant':'超大型', 'Varies':'多种尺寸' };

// ── Read source ────────────────────────────────────────────────────────────
let html = fs.readFileSync(path.join(__dirname, 'breeds/index.html'), 'utf8');

// ── 1. Page language & meta ────────────────────────────────────────────────
html = html.replace('lang="en"', 'lang="zh-CN"');
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>犬种大全 — 302个犬种完整目录 | AllDogFacts</title>'
);
html = html.replace(
  /<meta name="description"[^>]*>/,
  '<meta name="description" content="探索302个犬种的详细资料——纯种犬与混血犬——性格、体型、运动需求、美容护理、健康状况及训练指南。找到最适合您的狗狗。" />'
);

// ── 2. Fix asset paths (breeds/index.html uses ../ ; zh/breeds/ needs ../../) ──
html = html.replace(/href="\.\.\/css\//g, 'href="../../css/');
html = html.replace(/href="\.\.\/js\//g,  'href="../../js/');
html = html.replace(/src="\.\.\/js\//g,   'src="../../js/');
html = html.replace(/src="\.\.\/css\//g,  'src="../../css/');

// ── 3. Fix nav & internal links ────────────────────────────────────────────
html = html.replace('href="../index.html" class="nav-logo"', 'href="/index.html" class="nav-logo"');
// Nav links — keep absolute paths but translate text
html = html
  .replace(/>Home<\/a>/g, '>首页</a>')
  .replace(/>Dog Breeds<\/a>/g, '>犬种大全</a>')
  .replace(/>Getting a Dog<\/a>/g, '>养狗入门</a>')
  .replace(/>Training<\/a>/g, '>训练指南</a>')
  .replace(/>Health<\/a>/g, '>健康</a>')
  .replace(/>Nutrition<\/a>/g, '>营养</a>')
  .replace(/>Grooming<\/a>/g, '>美容护理</a>');

// Breed card hrefs: "french-bulldog.html" → "/breeds/french-bulldog.html"
html = html.replace(/href="([a-z0-9-]+\.html)" class="breed-card"/g, (m, slug) => {
  return `href="/breeds/${slug}" class="breed-card"`;
});

// ── 4. Hero section ────────────────────────────────────────────────────────
html = html
  .replace(/>🐕 Complete Guide</g, '>🐕 完整指南<')
  .replace('<h1>Dog Breeds Directory</h1>', '<h1>犬种大全</h1>')
  .replace(
    '<p>Explore detailed profiles for 302 breeds — purebreds &amp; hybrids — temperament, size, care needs, and more.</p>',
    '<p>探索302个犬种的详细资料——纯种犬与混血犬——性格、体型、护理需求等全方位介绍。</p>'
  )
  .replace('placeholder="Search breeds... (e.g. Labrador, Husky)"', 'placeholder="搜索犬种...（如 拉布拉多、哈士奇）"');

// ── 5. Filter bar ─────────────────────────────────────────────────────────
html = html
  .replace('>📐 Size<', '>📐 体型<')
  .replace('>⚡ Energy<', '>⚡ 活力<')
  .replace('>🏷️ Type<', '>🏷️ 类型<')
  .replace('>👶 Kids<', '>👶 儿童<')
  .replace('>🔀 Sort<', '>🔀 排序<')
  // Size chips
  .replace(/data-value="all">All</g,          'data-value="all">全部<')
  .replace(/data-value="small">Small</g,      'data-value="small">小型<')
  .replace(/data-value="medium">Medium</g,    'data-value="medium">中型<')
  .replace(/data-value="large">Large</g,      'data-value="large">大型<')
  .replace(/data-value="giant">Giant</g,      'data-value="giant">超大型<')
  .replace(/data-value="low">Low</g,          'data-value="low">低<')
  .replace(/data-value="high">High</g,        'data-value="high">高<')
  // Type chips
  .replace(/data-value="purebred">Purebred</g,'data-value="purebred">纯种犬<')
  .replace(/data-value="hybrid">Hybrid \/ Mix</g,'data-value="hybrid">混血犬<')
  // Kids chip
  .replace(/>Great with Kids</g, '>适合儿童<')
  // Sort chips
  .replace(/data-sort="popularity">⭐ Popularity</g,'data-sort="popularity">⭐ 热门<')
  .replace(/data-sort="alpha">🔤 A – Z</g,    'data-sort="alpha">🔤 A – Z<')
  // Results count
  .replace(/ id="resultsCount">302 breeds</g,' id="resultsCount">302个犬种<');

// ── 6. Size badges inside breed cards ─────────────────────────────────────
Object.entries(SIZE_LABELS).forEach(([en, zh]) => {
  // size-badge spans: e.g. <span class="size-badge small">Small</span>
  const re = new RegExp(`(class="size-badge[^"]*">)${en}(<\\/span>)`, 'g');
  html = html.replace(re, `$1${zh}$2`);
});

// ── 7. Trait names ─────────────────────────────────────────────────────────
html = html
  .replace(/<span class="trait-name">Energy<\/span>/g, '<span class="trait-name">活力</span>')
  .replace(/<span class="trait-name">Training<\/span>/g, '<span class="trait-name">训练</span>')
  .replace(/<span class="trait-name">Grooming<\/span>/g, '<span class="trait-name">美容</span>');

// ── 8. Breed card link rows ────────────────────────────────────────────────
html = html
  .replace(/Full Profile <span>/g, '查看完整资料 <span>')
  .replace(/View Profile <span>/g, '查看完整资料 <span>');

// ── 9. Breed h3 names + descriptions in one pass ──────────────────────────
// Handles both purebred h3s and hybrid h3s (which contain <span>Hybrid</span>)
// lang="en" on small prevents i18n.js re-translating the English subtitle
const BREED_DESC = require('./breed_desc_zh.js');

// Aliases for name mismatches between HTML and dict keys
const EXTRA_NAMES = {
  'Cavalier King Charles':     '查理士王骑士猎犬',
  'Löwchen':                   '罗钦犬',
  'Petit Basset Griffon Vendéen': '小型旺代格里芬犬',
  'Bichon Frisé':              '比熊犬',
  'Chi-Poo':                   '吉娃娃贵宾混血犬',
  'Grand Basset Griffon Vendéen': '大型旺代格里芬犬',
};
const ALL_NAMES = Object.assign({}, BREED_NAMES, EXTRA_NAMES);

// Hybrid badge span style (constant)
const HYBRID_SPAN_RE = / <span style="font-size:\.75em;color:var\(--teal\);font-weight:600">Hybrid<\/span>/;
const HYBRID_BADGE_ZH = ' <span style="font-size:.75em;color:var(--teal);font-weight:600">混血犬</span>';

Object.entries(ALL_NAMES).forEach(([en, zh]) => {
  const descZh = BREED_DESC[en] || BREED_DESC[en.replace('Frisé','Frise').replace('Vendéen','Vendeen').replace('Löwchen','Lowchen').replace('Chi-Poo','Chipoo').replace(' Spaniel','')];
  const h3Pat  = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const subtitle = `<small lang="en" style="font-size:.6em;font-weight:400;color:#94a3b8">${en}</small>`;

  if (descZh) {
    // Match h3 (with optional Hybrid badge) + immediately following <p>
    const re = new RegExp(
      `<h3>${h3Pat}( <span[^>]*>Hybrid<\\/span>)?<\\/h3>(\\s*<p>)[\\s\\S]*?(<\\/p>)`,
      'g'
    );
    html = html.replace(re, (m, hybridSpan, pOpen, pClose) => {
      const badge = hybridSpan ? HYBRID_BADGE_ZH : '';
      return `<h3>${zh} ${subtitle}${badge}</h3>${pOpen}${descZh}${pClose}`;
    });
  } else {
    // h3 only, no description available
    const re = new RegExp(
      `<h3>${h3Pat}( <span[^>]*>Hybrid<\\/span>)?<\\/h3>`,
      'g'
    );
    html = html.replace(re, (m, hybridSpan) => {
      const badge = hybridSpan ? HYBRID_BADGE_ZH : '';
      return `<h3>${zh} ${subtitle}${badge}</h3>`;
    });
  }
});

// ── 10. Footer translations ────────────────────────────────────────────────
html = html
  .replace(/>Your complete dog encyclopedia\.<\/p>/g, '>您的完整犬类百科全书。</p>')
  .replace(/>Quick Links</g, '>快速链接<')
  .replace(/>Privacy Policy</g, '>隐私政策<')
  .replace(/>Terms of Use</g, '>使用条款<')
  .replace(/© 202[45] AllDogFacts\. All rights reserved\./g, '© 2025 AllDogFacts. 版权所有。');

// ── 11. Add Chinese lang switcher default & hreflang ──────────────────────
// Ensure localStorage is set to zh when this page is visited
html = html.replace(
  '</head>',
  `  <link rel="alternate" hreflang="en" href="/breeds/index.html" />
  <link rel="alternate" hreflang="zh-CN" href="/zh/breeds/index.html" />
  <script>localStorage.setItem('adf-lang','zh');</script>
</head>`
);

// ── 12. Add "View English version" banner ─────────────────────────────────
html = html.replace(
  '<section class="breeds-hero">',
  `<div style="background:#0d9488;color:#fff;text-align:center;padding:8px 16px;font-size:.85rem">
    🌐 您正在浏览中文版 · <a href="/breeds/index.html" style="color:#ccfbf1;text-decoration:underline">切换至英文版</a>
  </div>
  <section class="breeds-hero">`
);

// ── Output ─────────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, 'zh', 'breeds');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
console.log('✅ zh/breeds/index.html written (' + Math.round(html.length/1024) + ' KB)');
