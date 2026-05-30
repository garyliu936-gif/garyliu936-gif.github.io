/**
 * Generates Chinese versions of all 302 breed profile pages.
 * Outputs to /zh/breeds/[slug].html
 * Run: node build_zh_breed_profiles.js
 */
const fs   = require('fs');
const path = require('path');

// ── Chinese breed names ────────────────────────────────────────────────────
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
  'Cavalier King Charles Spaniel':'查理士王骑士猎犬','Cavalier King Charles':'查理士王骑士猎犬',
  'Cesky Terrier':'捷克梗','Chesapeake Bay Retriever':'切萨皮克湾寻回犬','Chihuahua':'吉娃娃',
  'Chinese Crested':'中国冠毛犬','Chinese Shar-Pei':'中国沙皮犬','Chinook':'奇努克犬',
  'Chow Chow':'松狮犬',"Cirneco dell'Etna":'西西里猎犬','Clumber Spaniel':'克伦伯猎犬',
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
  'Golden Retriever':'金毛寻回犬','Gordon Setter':'戈登雪达犬',
  'Grand Basset Griffon Vendeen':'大型旺代格里芬犬',
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
  'Chi-Poo':'吉娃娃贵宾混血犬','Chiweenie':'吉娃娃腊肠混血犬','Chow Shepherd':'松狮牧羊混血犬',
  'Chug':'吉娃娃巴哥混血犬','Chusky':'松狮哈士奇混血犬','Cockapoo':'可卡贵宾混血犬',
  'Corgidor':'柯基拉布拉多混血犬','Corgipoo':'柯基贵宾混血犬','Corman Shepherd':'柯基德牧混血犬',
  'Dalmadoodle':'大麦丁贵宾混血犬','Doberdoodle':'杜宾贵宾混血犬','Dorgi':'腊肠柯基混血犬',
  'Double Doodle':'双贵宾混血犬','Doxiepoo':'腊肠贵宾混血犬','Flandoodle':'佛兰德牧牛贵宾混血犬',
  'Foodle':'猎狐梗贵宾混血犬','Frenchton':'法斗波士顿梗混血犬','Froodle':'法斗贵宾混血犬',
  'Gerberian Shepsky':'德牧哈士奇混血犬','Goberian':'金毛哈士奇混血犬',
  'Goldador':'金毛拉布拉多混血犬','Golden Mountain Dog':'金毛伯恩山混血犬',
  'Goldendoodle':'金毛贵宾混血犬','Goldmaraner':'金毛魏玛混血犬','Gollie':'金毛柯利混血犬',
  'Great Danoodle':'大丹贵宾混血犬','Havapoo':'哈瓦那贵宾混血犬','Horgi':'哈士奇柯基混血犬',
  'Huskimo':'哈士奇爱斯基摩混血犬','Husky Inu':'哈士奇柴犬混血犬',
  'Huskydoodle':'哈士奇贵宾混血犬','Irish Doodle':'爱尔兰雪达贵宾混血犬',
  'Irish Wolfadoodle':'爱尔兰猎狼贵宾混血犬','Jackadoodle':'杰克罗素贵宾混血犬',
  'Jug':'杰克罗素巴哥混血犬','Labmaraner':'拉布拉多魏玛混血犬',
  'Labradoodle':'拉布拉多贵宾混血犬','Labrador Retriever':'拉布拉多寻回犬',
  'Labsky':'拉布拉多哈士奇混血犬','Lhasapoo':'拉萨贵宾混血犬',
  'Mal-Shi':'马耳他西施混血犬','Maltichon':'马耳他比熊混血犬','Maltipoo':'马耳他贵宾混血犬',
  'Mastidoodle':'马士提夫贵宾混血犬','Morkie':'马耳他约克夏混血犬',
  'Newfiedoodle':'纽芬兰贵宾混血犬','Peekapoo':'北京贵宾混血犬','Pitsky':'比特哈士奇混血犬',
  'Pom-A-Pug':'博美巴哥混血犬','Pomapoo':'博美贵宾混血犬','Pomchi':'博美吉娃娃混血犬',
  'Pomsky':'博美哈士奇混血犬','Poochon':'贵宾比熊混血犬','Pooton':'贵宾棉花面纱混血犬',
  'Portidoodle':'葡萄牙水犬贵宾混血犬','Pugapoo':'巴哥贵宾混血犬','Puggle':'巴哥比格混血犬',
  'Pyredoodle':'大白熊贵宾混血犬','Ratoodle':'鼠梗贵宾混血犬',
  'Rottador':'罗威纳拉布拉多混血犬','Rottle':'罗威纳贵宾混血犬','Rottsky':'罗威纳哈士奇混血犬',
  'Saint Berdoodle':'圣伯纳贵宾混血犬','Sammypoo':'萨摩耶贵宾混血犬',
  'Schnoodle':'雪纳瑞贵宾混血犬','Scoodle':'苏格兰梗贵宾混血犬',
  'Sheepadoodle':'古英牧贵宾混血犬','Shepadoodle':'德牧贵宾混血犬',
  'Sheprador':'德牧拉布拉多混血犬','Shih-Poo':'西施贵宾混血犬','Shorkie':'西施约克夏混血犬',
  'Spoodle':'英国跳猎贵宾混血犬','Springerdoodle':'英国跳猎贵宾混血犬',
  'Weimardoodle':'魏玛贵宾混血犬','Westiepoo':'西高地贵宾混血犬',
  'Whoodle':'软毛麦色梗贵宾混血犬','Woodle':'威尔士梗贵宾混血犬',
  'Yorkipoo':'约克夏贵宾混血犬',
  // Name variants from HTML h1
  'Bichon Frisé':'比熊犬',
  'English Bulldog':'英国斗牛犬',
  'Rough Collie':'粗毛柯利牧羊犬',
  'Pembroke Welsh Corgi':'彭布罗克威尔士柯基犬',
  'Coton de Tuléar':'棉花面纱犬',
  'Grand Basset Griffon Vendéen':'大型旺代格里芬犬',
  'Löwchen':'罗钦犬',
  'Malshi':'马耳他西施混血犬',
  'Petit Basset Griffon Vendéen':'小型旺代格里芬犬',
};

// ── UI label translations ──────────────────────────────────────────────────
const LABELS = {
  // Quick stats
  'Weight':'体重', 'Height':'身高', 'Lifespan':'寿命', 'Colors':'颜色', 'Apartment':'公寓适应',
  // Tabs
  '🐾 Profile':'🐾 品种概况',
  '🍽️ Diet &amp; Feeding':'🍽️ 饮食与喂食',
  '💰 Cost &amp; Price':'💰 费用与价格',
  '🧬 Mix Breeds':'🧬 混血犬种',
  '🎉 Fun Facts':'🎉 趣味知识',
  // Section h2 headings
  '🐾 Overview':'🐾 品种简介',
  '📸 Photo Gallery':'📸 图片展示',
  '😊 Temperament &amp; Personality':'😊 性格与个性',
  '🏃 Exercise &amp; Activity Needs':'🏃 运动与活动需求',
  '✂️ Grooming &amp; Coat Care':'✂️ 美容与毛发护理',
  '🎓 Training':'🎓 训练',
  '🏥 Health &amp; Common Issues':'🏥 健康与常见问题',
  '🐾 Related Breeds':'🐾 相关犬种',
  '📏 Daily Portion Guide':'📏 每日喂食量指南',
  '💡 Feeding Tips':'💡 喂食建议',
  '🎉 Fun Facts':'🎉 趣味知识',
  '🚀 Origin &amp; History':'🚀 起源与历史',
  '🧬 Mix Breeds':'🧬 混血犬种',
  '💰 Purchase Price':'💰 购买价格',
  '📊 Annual Cost Breakdown':'📊 年度费用明细',
  '🏡 Is This Breed Right for You?':'🏡 这个犬种适合您吗？',
  // Info-box labels
  'Origin':'起源', 'AKC Group':'AKC犬种组', 'Bred For':'培育目的',
  'Coat Type':'毛发类型', 'Average Lifespan':'平均寿命',
  'Vet Cost Risk':'兽医费用风险', 'Breathing Risk':'呼吸风险',
  'Heat Tolerance':'耐热能力', 'AKC Rank':'AKC排名', 'Group':'犬种组',
  'Also Known As':'别名', 'Size':'体型', 'Coat':'毛发', 'Good for Apartments':'适合公寓',
  'Reputable Breeder':'信誉繁育者', 'Show / Champion Lines':'展犬/冠军血统',
  'Rescue / Adoption':'救援/领养', 'Backyard Breeder ⚠️':'不正规繁育者 ⚠️',
  'Food (quality kibble)':'食物（优质狗粮）', 'Vet visits (annual)':'兽医费用（每年）',
  'Pet insurance':'宠物保险', 'Grooming':'美容费用', 'Toys &amp; supplies':'玩具和用品',
  'Training classes':'训练课程', 'Energy':'活力', 'Breathing':'呼吸',
  'Price':'价格', 'Best For':'最适合', 'Shedding':'掉毛', 'Trainability':'训练性',
  'Puppy (8–12 weeks)':'幼犬（8-12周）', 'Puppy (3–6 months)':'幼犬（3-6个月）',
  'Adult (1+ year)':'成犬（1岁以上）', 'Senior (7+ years)':'老年犬（7岁以上）',
  // Compat labels
  'With Kids':'与儿童', 'With Dogs':'与其他犬', 'With Cats':'与猫',
  'First-Time Owner':'新手主人', 'Hot Climates':'炎热气候',
  // Sidebar
  'Breed Traits':'品种特征', 'Explore More Breeds':'探索更多犬种',
  'Quick Facts':'快速概览',
  'Energy Level':'活力水平', 'Trainability':'训练性', 'Friendliness':'友善程度',
  'Grooming Needs':'美容需求', 'Good with Kids':'适合儿童', 'Barking':'吠叫程度',
  'Browse All Breeds →':'浏览全部犬种 →',
  // Footer
  'More Breeds':'更多犬种', 'All Breeds →':'全部犬种 →',
  'Our Services':'我们的服务', 'Pet Hotel Seattle':'西雅图宠物酒店',
  'Nationwide Transport':'全国宠物运输', 'Get a Quote':'获取报价',
};

// ── Core transform function ────────────────────────────────────────────────
function transformBreedPage(html, enName, zhName, slug) {
  // 1. Lang & hreflang
  html = html.replace('lang="en"', 'lang="zh-CN"');
  html = html.replace(
    '</head>',
    `  <link rel="alternate" hreflang="en" href="/breeds/${slug}" />
  <link rel="alternate" hreflang="zh-CN" href="/zh/breeds/${slug}" />
  <script>localStorage.setItem('adf-lang','zh');</script>
</head>`
  );

  // 2. Page title
  html = html.replace(
    new RegExp(`<title>${enName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^<]*)<\/title>`),
    `<title>${zhName}$1</title>`
  );
  // Fallback title pattern
  html = html.replace(/<title>([^<]*?)<\/title>/, (m, t) =>
    t.includes(enName) ? `<title>${t.replace(enName, zhName)}</title>` : m
  );

  // 3. Nav links
  html = html
    .replace(/>Home<\/a>/g, '>首页</a>')
    .replace(/>Dog Breeds<\/a>/g, '>犬种大全</a>')
    .replace(/>Getting a Dog<\/a>/g, '>养狗入门</a>')
    .replace(/>Training<\/a>/g, '>训练指南</a>')
    .replace(/>Health<\/a>/g, '>健康</a>')
    .replace(/>Nutrition<\/a>/g, '>营养</a>')
    .replace(/>Grooming<\/a>/g, '>美容护理</a>');

  // 4. Breadcrumb
  html = html
    .replace(/>Home<\/a><span>/g, '>首页</a><span>')
    .replace(/>Dog Breeds<\/a><span>/g, '>犬种大全</a><span>');
  // Breed name in breadcrumb
  const enEsc = enName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  html = html.replace(
    new RegExp(`(<span[^>]*>)${enEsc}(<\\/span>)(?=\\s*</div>\\s*<div class="breed-hero-layout")`),
    `$1${zhName}$2`
  );

  // 5. Hero h1 — breed name
  html = html.replace(
    new RegExp(`<h1>${enEsc}<\\/h1>`),
    `<h1>${zhName}</h1>`
  );

  // 6. Quick stat labels
  html = html.replace(
    /<span class="quick-stat-label">(.*?)<\/span>/g,
    (m, label) => LABELS[label] ? `<span class="quick-stat-label">${LABELS[label]}</span>` : m
  );

  // 7. Tab buttons
  Object.entries(LABELS).forEach(([en, zh]) => {
    if (en.includes('🐾') || en.includes('🍽') || en.includes('💰') || en.includes('🧬') || en.includes('🎉')) {
      html = html.replace(new RegExp(`>${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<`, 'g'), `>${zh}<`);
    }
  });

  // 8. Section h2 headings — common ones
  Object.entries(LABELS).forEach(([en, zh]) => {
    if (en.startsWith('🐾') || en.startsWith('📸') || en.startsWith('😊') ||
        en.startsWith('🏃') || en.startsWith('✂️') || en.startsWith('🎓') ||
        en.startsWith('🏥') || en.startsWith('📏') || en.startsWith('💡') ||
        en.startsWith('🎉') || en.startsWith('🚀') || en.startsWith('🧬') ||
        en.startsWith('💰') || en.startsWith('📊') || en.startsWith('🏡')) {
      const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(`<h2>${escaped}<\\/h2>`, 'g'), `<h2>${zh}</h2>`);
    }
  });

  // Breed-specific h2 headings that include the breed name
  html = html
    .replace(
      new RegExp(`<h2>🎬 ${enEsc} Facts<\\/h2>`),
      `<h2>🎬 ${zhName} 趣闻</h2>`
    )
    .replace(
      new RegExp(`<h2>🏠 Is a ${enEsc} Right for You\\?<\\/h2>`),
      `<h2>🏠 ${zhName}适合您吗？</h2>`
    )
    .replace(
      new RegExp(`<h2>🍽️ How Much to Feed a ${enEsc}<\\/h2>`),
      `<h2>🍽️ ${zhName}每日喂食量</h2>`
    )
    .replace(/<h2>🏠 Is a [^<]+ Right for You\?<\/h2>/g, '<h2>🏠 这个犬种适合您吗？</h2>')
    .replace(/<h2>🍽️ How Much to Feed a [^<]+<\/h2>/g, '<h2>🍽️ 每日喂食量指南</h2>')
    .replace(/<h2>🎬 [^<]+ Facts<\/h2>/g, '<h2>🎬 品种趣闻</h2>');

  // 9. Info-box labels
  html = html.replace(
    /<div class="info-box-label">(.*?)<\/div>/g,
    (m, label) => LABELS[label] ? `<div class="info-box-label">${LABELS[label]}</div>` : m
  );

  // 10. Compat labels
  html = html.replace(
    /<span class="compat-label">(.*?)<\/span>/g,
    (m, label) => LABELS[label] ? `<span class="compat-label">${LABELS[label]}</span>` : m
  );

  // 11. Sidebar headings
  html = html
    .replace(/<h4>Breed Traits<\/h4>/g, '<h4>品种特征</h4>')
    .replace(/<h4>Explore More Breeds<\/h4>/g, '<h4>探索更多犬种</h4>')
    .replace(/<h4>Quick Facts<\/h4>/g, '<h4>快速概览</h4>');

  // Sidebar trait names (inside trait-header spans)
  html = html.replace(
    /(<div class="trait-header"><span>)(.*?)(<\/span>)/g,
    (m, pre, name, post) => LABELS[name] ? `${pre}${LABELS[name]}${post}` : m
  );

  // Sidebar explore text
  html = html.replace(
    /Browse our full directory of <strong[^>]*>.*?<\/strong> dog breeds with detailed profiles\./g,
    '浏览我们完整的犬种目录，每个犬种都有详细资料。'
  );
  html = html.replace(/Browse All Breeds →/g, '浏览全部犬种 →');

  // 12. Related breeds section — translate breed name links
  html = html.replace(
    /<span>(.*?)<\/span>(<\/a>)/g,
    (m, name, close) => {
      const zh = BREED_NAMES[name];
      return zh ? `<span>${zh}</span>${close}` : m;
    }
  );

  // 13. Photo gallery caption / alt updates
  html = html
    .replace(new RegExp(`alt="${enEsc}"`, 'g'), `alt="${zhName}"`)
    .replace(/Watch this video for a quick overview of the/g, '观看视频快速了解')
    .replace(/perfect if you want to see the breed in action before diving into the details\./g, '在深入了解详情之前，先看看这个犬种的实际表现。');

  // 14. Travel tip box
  html = html
    .replace(/<h4>⚠️ Important: Flying with/g, '<h4>⚠️ 重要提示：乘机携带')
    .replace(/<\/h4>\s*<p>Most major airlines ban/g, '</h4>\n            <p>大多数主要航空公司禁止')
    .replace(/<h4>✈️ Pet Travel Tip<\/h4>/g, '<h4>✈️ 宠物出行提示</h4>')
    .replace(/<h4>🚗 Ground Transport Option<\/h4>/g, '<h4>🚗 地面运输选项</h4>');

  // 15. Footer
  html = html
    .replace(/>Your complete guide to dog breeds, pet boarding in Seattle, and nationwide pet transportation\.<\/p>/g,
      '>狗狗品种完整指南、西雅图宠物寄宿及全国宠物托运服务。</p>')
    .replace(/>Your complete dog encyclopedia\.<\/p>/g, '>您的完整犬类百科全书。</p>')
    .replace(/<h4>More Breeds<\/h4>/g, '<h4>更多犬种</h4>')
    .replace(/<h4>Our Services<\/h4>/g, '<h4>我们的服务</h4>')
    .replace(/>Labrador Retriever</g, '>拉布拉多寻回犬<')
    .replace(/>Golden Retriever</g, '>金毛寻回犬<')
    .replace(/>French Bulldog</g, '>法国斗牛犬<')
    .replace(/>German Shepherd</g, '>德国牧羊犬<')
    .replace(/>All Breeds →</g, '>全部犬种 →<')
    .replace(/>Pet Hotel Seattle</g, '>西雅图宠物酒店<')
    .replace(/>Nationwide Transport</g, '>全国宠物运输<')
    .replace(/>Get a Quote</g, '>获取报价<')
    .replace(/© 202[45] AllDogFacts\. All rights reserved\./g, '© 2025 AllDogFacts. 版权所有。');

  // 16. Lightbox buttons (keep as symbols, just ensure aria translated)
  html = html.replace(/alt="Enlarged dog photo"/g, `alt="放大的狗狗照片"`);

  // 17. English banner
  html = html.replace(
    '<section class="breed-page-hero">',
    `<div style="background:#0d9488;color:#fff;text-align:center;padding:8px 16px;font-size:.85rem">
    🌐 您正在浏览中文版 · <a href="/breeds/${slug}" style="color:#ccfbf1;text-decoration:underline">切换至英文版</a>
  </div>
  <section class="breed-page-hero">`
  );

  return html;
}

// ── Process all 302 breed files ────────────────────────────────────────────
const breedsDir  = path.join(__dirname, 'breeds');
const outDir     = path.join(__dirname, 'zh', 'breeds');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let count = 0;
const notFound = [];

files.forEach(filename => {
  const src = path.join(breedsDir, filename);
  let html = fs.readFileSync(src, 'utf8');

  // Extract English breed name from h1
  const h1Match = html.match(/<h1>([^<]+)<\/h1>/);
  if (!h1Match) { notFound.push(filename + ' (no h1)'); return; }
  const enName = h1Match[1].trim();
  const zhName = BREED_NAMES[enName];

  if (!zhName) {
    notFound.push(`${filename} → "${enName}" not in dict`);
    // Still process the page with English name
  }

  const translated = transformBreedPage(html, enName, zhName || enName, filename);
  fs.writeFileSync(path.join(outDir, filename), translated, 'utf8');
  count++;
});

console.log(`\n✅ Generated ${count} Chinese breed profile pages → zh/breeds/`);
if (notFound.length) {
  console.log(`\n⚠️  ${notFound.length} issues:`);
  notFound.forEach(n => console.log('  -', n));
}
