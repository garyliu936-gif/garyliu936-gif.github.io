/**
 * Translates ALL text content on 302 Chinese breed profile pages.
 * Extracts breed data then generates Chinese content via templates.
 * Run: node build_zh_breed_content.js
 */
const fs   = require('fs');
const path = require('path');

// ── AKC group translations ─────────────────────────────────────────────────
const GROUP_ZH = {
  'Non-Sporting':'非运动犬组','Herding':'牧羊犬组','Working':'工作犬组',
  'Sporting':'运动犬组','Hound':'猎犬组','Terrier':'梗犬组','Toy':'玩具犬组',
  'Foundation Stock':'基础种群','Miscellaneous':'杂项犬组','Mixed':'混血犬',
};

// ── Health tag translations ────────────────────────────────────────────────
const HEALTH_TAG_ZH = {
  'Hip Dysplasia':'髋关节发育不良','Elbow Dysplasia':'肘关节发育不良',
  'Bloat (GDV)':'胃扩张扭转','Bloat':'胃扩张','Cancer':'癌症',
  'Heart Disease':'心脏病','Obesity':'肥胖','Allergies':'过敏',
  'Ear Infections':'耳道感染','Eye Conditions':'眼部疾病',
  'Skin Issues':'皮肤问题','Skin Fold Dermatitis':'皮肤褶皱炎',
  'BOAS (Breathing Issues)':'短头犬综合症（呼吸问题）',
  'Heat Sensitivity (serious)':'耐热性差（较严重）',
  'Spinal Issues (IVDD)':'脊椎问题（椎间盘疾病）',
  'Patellar Luxation':'髌骨脱位','Patellar luxation':'髌骨脱位',
  'Dental Issues':'牙科问题','Dental disease':'牙科疾病',
  'Dental disease (crowded teeth in small mouths)':'牙科疾病（小嘴拥挤）',
  'Hypothyroidism':'甲状腺功能减退','Epilepsy':'癫痫',
  'von Willebrand\'s Disease':'血友病（冯·维勒布兰德病）',
  'Progressive Retinal Atrophy':'进行性视网膜萎缩',
  'Degenerative Myelopathy':'脊髓病变',
  'Cystinuria':'胱氨酸尿症','Deafness':'听力障碍',
  'OCD (Osteochondritis)':'骨软骨炎','Pancreatitis':'胰腺炎',
  'Addison\'s Disease':'艾迪生病','Cushing\'s Disease':'库欣综合症',
  'Collie Eye Anomaly':'柯利眼睛异常',
  'MDR1 Gene Mutation':'MDR1基因突变',
  'Legg-Calvé-Perthes':'莱格-卡尔维-佩尔特斯病',
  'Glaucoma':'青光眼','Cataracts':'白内障',
  'Aortic Stenosis':'主动脉瓣狭窄','Dilated Cardiomyopathy':'扩张型心肌病',
  'Entropion':'睑内翻','Ectropion':'睑外翻','Cherry Eye':'樱桃眼',
  'Intervertebral Disc Disease':'椎间盘疾病',
  'Brachycephalic Syndrome':'短头综合症',
  'Syringomyelia':'脊髓空洞症','Chiari Malformation':'小脑扁桃体下疝畸形',
  'Breathing Problems':'呼吸问题','Respiratory Issues':'呼吸道问题',
  'Tracheal Collapse':'气管塌陷','Tracheal collapse':'气管塌陷',
  'Luxating Patella':'髌骨滑脱',
  'Autoimmune Disease':'自身免疫性疾病','Thyroid Issues':'甲状腺问题',
  'Hemangiosarcoma':'血管肉瘤','Osteosarcoma':'骨肉瘤',
  'Von Willebrand Disease':'血管性血友病',
  'Hypoglycemia':'低血糖症',
  'Hypoglycemia in very small individuals':'超小体型个体低血糖',
  'Obesity (if under-exercised)':'运动不足导致的肥胖',
  'Portosystemic Shunt':'门体分流（肝脏血管异常）',
  'Legg-Perthes Disease':'莱格-佩尔特斯病',
  'Corneal Dystrophy':'角膜营养不良',
  'Retinal Dysplasia':'视网膜发育不良',
  'Sebaceous Adenitis':'皮脂腺炎',
  'Subaortic Stenosis':'主动脉瓣下狭窄',
  'Mitral Valve Disease':'二尖瓣疾病',
  'Patent Ductus Arteriosus':'动脉导管未闭',
  'Wobbler Syndrome':'摇摆综合症',
  'Laryngeal Paralysis':'喉麻痹',
  'Anal Gland Issues':'肛腺问题',
  'Foot-and-Mouth Sensitivity':'足部及口腔敏感',
  'Exercise-Induced Collapse':'运动诱发性虚脱',
  'Juvenile Cataracts':'幼年白内障',
  'Diabetes':'糖尿病',
  'Kidney Disease':'肾脏疾病',
  'Liver Shunt':'肝脏分流',
  'Megaesophagus':'食道扩张',
  'Muscular Dystrophy':'肌肉萎缩症',
  'Cerebellar Ataxia':'小脑共济失调',
  'Nasal Solar Dermatitis':'鼻部日光性皮炎',
  'Inflammatory Bowel Disease':'炎症性肠病',
  'Hemophilia':'血友病',
  // dangerous foods (also in health-tags)
  'Chocolate':'巧克力',
  'Grapes &amp; Raisins':'葡萄与葡萄干',
  'Onions &amp; Garlic':'洋葱与大蒜',
  'Xylitol (artificial sweetener)':'木糖醇（人工甜味剂）',
  'Macadamia Nuts':'夏威夷果',
  'Alcohol':'酒精',
  'Avocado':'牛油果',
  'Raw yeast dough':'生酵母面团',
  'Coffee &amp; Caffeine':'咖啡与咖啡因',
  'Cooked bones':'熟骨头',
  'Raisins':'葡萄干',
};

// ── Trait name translations ───────────────────────────────────────────────
const TRAIT_ZH = {
  'Energy Level':'活力水平',
  'Affection':'亲和力',
  'Affection Level':'亲和力',
  'Good with Kids':'适合儿童',
  'Good with Dogs':'与其他犬相处',
  'Trainability':'训练性',
  'Grooming Needs':'美容需求',
  'Shedding':'掉毛量',
  'Friendliness':'友善度',
  'Barking':'吠叫倾向',
  'Adaptability':'适应性',
  'Intelligence':'智力',
  'Playfulness':'活泼程度',
  'Protectiveness':'保护欲',
};

// ── Value translations (info-box values, quick stats, sidebar) ────────────
function translateVal(v) {
  if (!v) return v;
  // Multi-word phrases FIRST (before single-word replacements that could partially match)
  v = v.replace(/\bMonkey Terrier\b/g,'猴子梗').replace(/\bBull Terrier\b/g,'斗牛梗')
       .replace(/\bRat Terrier\b/g,'猎鼠梗').replace(/\bFox Terrier\b/g,'猎狐梗')
       .replace(/\bToy Terrier\b/g,'玩具梗').replace(/\bWire Terrier\b/g,'刚毛梗')
       .replace(/\bBoston Terrier\b/g,'波士顿梗').replace(/\bYorkshire Terrier\b/g,'约克夏梗')
       .replace(/\bSkye Terrier\b/g,'史凯梗').replace(/\bCairn Terrier\b/g,'凯恩梗')
       .replace(/\bBorder Terrier\b/g,'边境梗').replace(/\bWelsh Terrier\b/g,'威尔士梗')
       .replace(/\bScottish Terrier\b/g,'苏格兰梗').replace(/\bWest Highland Terrier\b/g,'西高地白梗')
       .replace(/\bAiredale Terrier\b/g,'万能梗').replace(/\bBedlington Terrier\b/g,'贝德灵顿梗')
       .replace(/\bSoft Coated Wheaten Terrier\b/g,'软毛麦色梗')
       .replace(/\bStaffordshire Bull Terrier\b/g,'斯坦福斗牛梗');
  // AKC Groups
  v = v.replace(/\bNon-Sporting Group\b/g,'非运动犬组').replace(/\bHerding Group\b/g,'牧羊犬组')
       .replace(/\bWorking Group\b/g,'工作犬组').replace(/\bSporting Group\b/g,'运动犬组')
       .replace(/\bHound Group\b/g,'猎犬组').replace(/\bTerrier Group\b/g,'梗犬组')
       .replace(/\bToy Group\b/g,'玩具犬组').replace(/\bNon-Sporting\b/g,'非运动犬组')
       .replace(/\bHerding\b/g,'牧羊犬组').replace(/\bWorking\b/g,'工作犬组')
       .replace(/\bSporting\b/g,'运动犬组').replace(/\bHound\b/g,'猎犬组')
       .replace(/\bTerrier\b/g,'梗犬组').replace(/\bToy\b/g,'玩具犬组')
       .replace(/\bFoundation Stock\b/g,'基础种群').replace(/\bMiscellaneous\b/g,'杂项犬组');
  // Bred For / purpose
  v = v.replace(/\bCompanionship\b/g,'伴侣犬').replace(/\bHunting\b/g,'狩猎')
       .replace(/\bRetrieving\b/g,'寻回').replace(/\bPointing\b/g,'指示')
       .replace(/\bGuarding\b/g,'守卫').replace(/\bGuard\b/g,'守卫')
       .replace(/\bTrailing\b/g,'追踪').replace(/\bTracking\b/g,'追踪')
       .replace(/\bSledding\b/g,'拉雪橇').replace(/\bRatting\b/g,'捕鼠')
       .replace(/\bEarth work\b/g,'地穴工作').replace(/\bDraft work\b/g,'拉车')
       .replace(/\bWater Retrieving\b/g,'水中寻回').replace(/\bFarm work\b/g,'农场工作')
       .replace(/\bHerding livestock\b/g,'牧畜').replace(/\bApartment companion\b/g,'公寓伴侣')
       .replace(/\bTruffle hunting\b/g,'松露探寻').replace(/\bAssistance\b/g,'辅助工作')
       .replace(/\bPolice work\b/g,'警察工作').replace(/\bMilitary\b/g,'军事工作')
       .replace(/\bSearch and rescue\b/g,'搜救').replace(/\bAgilty\b/g,'敏捷运动')
       .replace(/\bCompanion\b/g,'伴侣犬').replace(/\bRatting\b/g,'捕鼠');
  // Coat types
  v = v.replace(/Short, smooth, easy-care/g,'短毛，光滑，易打理')
       .replace(/Short, smooth, fine-textured/g,'短毛，光滑，质地细腻')
       .replace(/Short, smooth/g,'短毛，光滑').replace(/Short and smooth/g,'短毛光滑')
       .replace(/Long, silky/g,'长毛，丝滑').replace(/Long and silky/g,'长毛丝滑')
       .replace(/\bDouble coat\b/g,'双层毛').replace(/\bDouble-coated\b/g,'双层毛')
       .replace(/\bWirecoat\b/g,'刚毛').replace(/\bWiry\b/g,'刚毛')
       .replace(/\bCurly\b/g,'卷毛').replace(/\bWavy\b/g,'波浪毛')
       .replace(/\bSilky\b/g,'丝滑').replace(/\bSilky coat\b/g,'丝质毛发')
       .replace(/\beasy-care\b/g,'易打理').replace(/\bfine-textured\b/g,'质地细腻')
       .replace(/\bHypoallergenic\b/g,'低过敏').replace(/\bWaterproof\b/g,'防水')
       .replace(/\bDense\b/g,'浓密').replace(/\bThick\b/g,'厚实')
       .replace(/\bShaggy\b/g,'蓬乱').replace(/\bFluffy\b/g,'毛茸茸')
       .replace(/\bCorded\b/g,'绳状毛').replace(/\bFeathering\b/g,'饰毛')
       .replace(/short$/i,'短毛').replace(/long$/i,'长毛')
       .replace(/\bSmooth coat\b/g,'光滑短毛').replace(/\bSmooth\b/g,'光滑短毛')
       .replace(/harsh texture/g,'粗硬质地').replace(/\bwiry\b/g,'刚毛')
       .replace(/\bshaggy\b/g,'蓬乱').replace(/predominantly/g,'主要为')
       .replace(/\bbelge\b/g,'杂色');
  // Units
  v = v.replace(/(\d+)\s*–\s*(\d+)\s*(?:lbs?|pounds?)/g,'$1–$2磅')
       .replace(/(\d+)\+\s*(?:lbs?|pounds?)/g,'$1磅以上')
       .replace(/[Uu]nder\s*(\d+)\s*(?:lbs?|pounds?)/g,'$1磅以下')
       .replace(/(\d+)\s*(?:lbs?|pounds?)/g,'$1磅')
       .replace(/(\d[\d.–-]+)\s*years?/g,'$1年')
       .replace(/(\d[\d.–-]+)\s*yrs?/g,'$1年')
       .replace(/(\d+)\s*–\s*(\d+)[""]/g,'$1–$2英寸')
       .replace(/(\d+)[""]/g,'$1英寸')
       .replace(/(\d+)\s*–\s*(\d+)\s*inches?/g,'$1–$2英寸')
       .replace(/(\d+)\s*inches?/g,'$1英寸');
  // Size categories
  v = v.replace(/\bSmall\s*\(/g,'小型犬（').replace(/\bMedium\s*\(/g,'中型犬（')
       .replace(/\bLarge\s*\(/g,'大型犬（').replace(/\bGiant\s*\(/g,'超大型犬（')
       .replace(/\bSmall\b/g,'小型犬').replace(/\bMedium\b/g,'中型犬')
       .replace(/\bLarge\b/g,'大型犬').replace(/\bGiant\b/g,'超大型犬')
       .replace(/\bVaries\b/g,'多种尺寸');
  // Risk/tolerance descriptions
  v = v.replace(/High — pet insurance strongly recommended/g,'高——强烈建议购买宠物保险')
       .replace(/High \(brachycephalic\)/g,'高（短头犬综合症）')
       .replace(/Low — keep in A\/C/g,'低——需要空调降温')
       .replace(/Low — keep cool/g,'低——需保持凉爽')
       .replace(/High — manage carefully/g,'高——需特别注意')
       .replace(/Moderate — monitor in summer/g,'适中——夏季需注意')
       .replace(/\bVery High\b/g,'非常高').replace(/\bVery Low\b/g,'非常低')
       .replace(/\bHigh\b/g,'高').replace(/\bLow\b/g,'低')
       .replace(/\bModerate\b/g,'适中').replace(/\bExcellent\b/g,'优秀')
       .replace(/\bGood\b/g,'良好').replace(/\bFair\b/g,'一般');
  // Yes/No
  v = v.replace(/Yes — perfect city dog/g,'是——完美的城市犬')
       .replace(/Yes — excellent apartment dog/g,'是——优秀的公寓犬')
       .replace(/Yes — moderate exercise; adapts well to small spaces/g,'是——运动量适中，适应小空间')
       .replace(/moderate exercise; adapts well to small spaces/g,'运动量适中，适应小空间')
       .replace(/\bYes\b/g,'是').replace(/\bNo\b/g,'否');
  // Colors
  v = v.replace(/\bMany colors\b/g,'多种颜色').replace(/\bVarious\b/g,'多种')
       .replace(/\bMultiple\b/g,'多种').replace(/\bAll colors\b/g,'所有颜色')
       .replace(/\bBrindle\b/g,'虎斑').replace(/\bFawn\b/g,'黄褐')
       .replace(/\bBlack\b/g,'黑色').replace(/\bWhite\b/g,'白色')
       .replace(/\bCream\b/g,'奶油色').replace(/\bPied\b/g,'花斑')
       .replace(/\bBlue\/grey\b/g,'蓝/灰').replace(/\bBlue\b/g,'蓝色')
       .replace(/\bRed\b/g,'红色').replace(/\bGolden\b/g,'金色')
       .replace(/\bSilver\b/g,'银色').replace(/\bChocolate\b/g,'巧克力色')
       .replace(/\bLiver\b/g,'肝色').replace(/\bSable\b/g,'黑貂色')
       .replace(/\bMerle\b/g,'花斑').replace(/\bTricolor\b/g,'三色')
       .replace(/\bBicolor\b/g,'双色').replace(/\bTan\b/g,'黄褐')
       .replace(/\bgrey\b/g,'灰色').replace(/\bGrey\b/g,'灰色')
       .replace(/most common/g,'最常见').replace(/mix of/g,'混合');
  // AKC Rank common phrases
  v = v.replace(/ Most Popular/g,' 最受欢迎').replace(/\bRare\b/g,'稀有犬种')
       .replace(/#(\d+) most popular/g,'第$1名最受欢迎');
  // Meal frequency
  v = v.replace(/(\d+)[–-](\d+) small meals\/day/g,'每天$1–$2次小餐')
       .replace(/(\d+) meals\/day/g,'每天$1餐')
       .replace(/(\d+) smaller meals\/day/g,'每天$1次小餐')
       .replace(/3–4 small meals per day/g,'每天3–4次小餐')
       .replace(/3 meals per day/g,'每天3餐')
       .replace(/2 meals per day/g,'每天2餐')
       .replace(/2 smaller meals per day/g,'每天2次小餐');
  // Also Known As / nicknames
  v = v.replace(/\bFrenchie\b/g,'法斗').replace(/\bLab\b/g,'拉布拉多')
       .replace(/\bGoldie\b/g,'金毛')
       .replace(/\bDachsie\b/g,'腊肠').replace(/\bWeimaraner\b/g,'威玛猎犬');
  // Country names (origin field)
  v = v.replace(/\bGermany\b/g,'德国').replace(/\bFrance\b/g,'法国')
       .replace(/\bEngland\b/g,'英国').replace(/\bGreat Britain\b/g,'英国')
       .replace(/\bScotland\b/g,'苏格兰').replace(/\bIreland\b/g,'爱尔兰')
       .replace(/\bBelgium\b/g,'比利时').replace(/\bNetherlands\b/g,'荷兰')
       .replace(/\bSpain\b/g,'西班牙').replace(/\bPortugal\b/g,'葡萄牙')
       .replace(/\bItaly\b/g,'意大利').replace(/\bSwitzerland\b/g,'瑞士')
       .replace(/\bAustria\b/g,'奥地利').replace(/\bCzechoslovakia\b/g,'捷克斯洛伐克')
       .replace(/\bPoland\b/g,'波兰').replace(/\bRussia\b/g,'俄罗斯')
       .replace(/\bHungary\b/g,'匈牙利').replace(/\bCroatia\b/g,'克罗地亚')
       .replace(/\bDalmatia\b/g,'达尔马提亚').replace(/\bAustralia\b/g,'澳大利亚')
       .replace(/\bNew Zealand\b/g,'新西兰').replace(/\bCanada\b/g,'加拿大')
       .replace(/\bUnited States\b/g,'美国').replace(/\bUSA\b/g,'美国')
       .replace(/\bCuba\b/g,'古巴').replace(/\bMexico\b/g,'墨西哥')
       .replace(/\bChina\b/g,'中国').replace(/\bJapan\b/g,'日本')
       .replace(/\bKorea\b/g,'韩国').replace(/\bTibet\b/g,'西藏')
       .replace(/\bAfghanistan\b/g,'阿富汗').replace(/\bArabia\b/g,'阿拉伯')
       .replace(/\bEgypt\b/g,'埃及').replace(/\bAfrica\b/g,'非洲')
       .replace(/\bEthiopia\b/g,'埃塞俄比亚').replace(/\bMali\b/g,'马里')
       .replace(/\bMorocco\b/g,'摩洛哥').replace(/\bNorway\b/g,'挪威')
       .replace(/\bSweden\b/g,'瑞典').replace(/\bDenmark\b/g,'丹麦')
       .replace(/\bFinland\b/g,'芬兰').replace(/\bIceland\b/g,'冰岛')
       .replace(/\bSiberia\b/g,'西伯利亚').replace(/\bGreece\b/g,'希腊')
       .replace(/\bTurkey\b/g,'土耳其').replace(/\bIndia\b/g,'印度')
       .replace(/\bSamoyed Peninsula\b/g,'萨摩耶半岛')
       .replace(/\bUnited Kingdom\b/g,'英国');
  // Food/portion amounts keep as-is (numbers with cups)
  return v;
}

function translateQuickStat(val, label) {
  if (!val || val.startsWith('★')) return val;
  let v = val;
  if (label === 'Weight' || label === '体重') {
    v = v.replace(/Under (\d+) lbs?/g,'$1磅以下')
         .replace(/(\d+)[–-](\d+) lbs?/g,'$1–$2磅')
         .replace(/(\d+)\+ lbs?/g,'$1磅以上')
         .replace(/\bVaries\b/g,'因体型而异');
  } else if (label === 'Height' || label === '身高') {
    v = v.replace(/(\d+)[–-](\d+)"/g,'$1–$2英寸').replace(/(\d+)"/g,'$1英寸');
  } else if (label === 'Lifespan' || label === '寿命') {
    v = v.replace(/(\d+)[–-](\d+) (?:years?|yrs?)/g,'$1–$2年')
         .replace(/(\d+)\+ (?:years?|yrs?)/g,'$1年以上');
  } else if (label === 'Energy' || label === '活力') {
    v = translateVal(v);
  } else if (label === 'Colors' || label === '颜色') {
    v = translateVal(v);
  }
  return v;
}

// ── Common phrase translations ─────────────────────────────────────────────
const PHRASES = {
  'Healthy Treats':'健康零食',
  'Lifetime Cost Estimate':'终生费用估算',
  'Popular':'热门',
  'Mix Breeds':'混血犬种',
  'Chocolate':'巧克力','Grapes &amp; Raisins':'葡萄与葡萄干',
  'Onions &amp; Garlic':'洋葱与大蒜','Xylitol (artificial sweetener)':'木糖醇（人工甜味剂）',
  'Macadamia Nuts':'夏威夷果','Alcohol':'酒精','Avocado':'牛油果',
  'Raw yeast dough':'生酵母面团','Coffee &amp; Caffeine':'咖啡与咖啡因',
  'Raisins':'葡萄干',
};

// ── Data extraction ────────────────────────────────────────────────────────
function extractData(html) {
  const traits = {};
  for (const [,name,score] of html.matchAll(/<div class="trait-header"><span>([^<]+)<\/span><span>(\d)\/5/g))
    traits[name] = parseInt(score);

  const infoBoxes = {};
  for (const [,lbl,val] of html.matchAll(/<div class="info-box-label">([^<]+)<\/div><div class="info-box-value">([^<]*)<\/div>/g))
    if (!infoBoxes[lbl]) infoBoxes[lbl] = val;

  const healthTags = [...html.matchAll(/<span class="health-tag">([^<]+)<\/span>/g)].map(m=>m[1]);

  const quickStats = {};
  for (const [,val,lbl] of html.matchAll(/<span class="quick-stat-value">([^<]+)<\/span><span class="quick-stat-label">([^<]+)<\/span>/g))
    quickStats[lbl] = val;

  const compat = {};
  for (const [,lbl,stars] of html.matchAll(/<span class="compat-label">([^<]+)<\/span><span class="compat-stars">([^<]+)<\/span>/g))
    compat[lbl] = (stars.match(/★/g)||[]).length;

  const subtitle = (html.match(/<p class="breed-subtitle">([^<]+)<\/p>/) || [])[1] || '';

  return { traits, infoBoxes, healthTags, quickStats, compat, subtitle };
}

// ── Content generators ─────────────────────────────────────────────────────
function energyDesc(e) {
  if (!e || e<=1) return '活力水平很低，每天20-30分钟的轻度散步即可满足运动需求';
  if (e===2)      return '活力水平偏低，每天两次短距离散步（共30-45分钟）即可满足需求';
  if (e===3)      return '活力水平适中，每天需要60-90分钟的运动，包括散步和玩耍';
  if (e===4)      return '活力充沛，每天需要至少90分钟的运动，适合活跃家庭';
  return '精力极为旺盛，每天需要2小时以上的高强度运动和充分的心理刺激';
}
function trainDesc(t) {
  if (!t || t<=1) return '训练难度较大，需要有经验的主人和专业的正向强化训练方法';
  if (t===2)      return '训练需要较多耐心，建议使用奖励式训练并保持课程简短有趣';
  if (t===3)      return '训练难度适中，聪明但有时固执，需要耐心和一致的训练方法';
  if (t===4)      return '训练接受度较好，聪明且愿意配合，适合初次养狗的主人';
  return '极易训练，学习能力出众，渴望取悦主人，是最好训练的犬种之一';
}
function groomDesc(g) {
  if (!g || g<=1) return '美容护理需求极低，每周简单梳理一次即可';
  if (g===2)      return '美容护理需求较低，每周梳理1-2次，偶尔洗澡';
  if (g===3)      return '需要定期梳理，每周2-3次，建议定期专业美容';
  if (g===4)      return '美容护理需求较高，需要每天梳理并定期修剪毛发';
  return '美容护理需求很高，需要每天精心梳理，建议定期前往专业美容师处护理';
}
function shedDesc(s) {
  if (!s || s<=1) return '几乎不掉毛，对过敏人群友好';
  if (s===2)      return '掉毛量较少，定期梳理可有效控制';
  if (s===3)      return '掉毛量适中，换季时较明显，建议定期梳理';
  if (s===4)      return '掉毛量较多，需要定期梳理并做好家居清洁';
  return '大量掉毛，换季时尤为明显，需要频繁梳理和清洁';
}
function kidsDesc(k) {
  if (!k || k<=2) return '与孩子相处需要监督，更适合年龄较大的儿童';
  if (k===3)      return '与孩子相处较好，但建议在年幼孩子旁边时进行监督';
  if (k===4)      return '与孩子相处良好，耐心温和，是不错的家庭伴侣犬';
  return '与孩子相处极佳，天性温柔耐心，是出色的家庭犬';
}
function friendDesc(f) {
  if (!f || f<=2) return '对陌生人和其他动物较为谨慎，有一定的独立性';
  if (f===3)      return '与家人亲密，对陌生人态度友好但略有保留';
  if (f===4)      return '性格友善，对人和其他动物态度开放热情';
  return '极度友善外向，对所有人都热情欢迎，是天生的社交犬';
}
function barkDesc(b) {
  if (!b || b<=1) return '很少吠叫，是公寓生活的理想选择';
  if (b===2)      return '吠叫不多，有情况时会适当发出警示';
  if (b===3)      return '吠叫适中，会对陌生人和异常情况发出警告';
  if (b===4)      return '吠叫较多，需要从小进行吠叫控制训练';
  return '爱叫，可能需要专门训练来控制吠叫行为';
}

function groupContext(group) {
  const g = (group||'').replace(/\s*Group$/,'').trim();
  const map = {
    'Non-Sporting':'非运动犬',
    'Herding':'牧羊犬，以出色的智慧和强烈的牧羊本能著称',
    'Working':'工作犬，历史上承担守卫、救援或其他重要工作任务',
    'Sporting':'运动犬，活力充沛，喜爱户外活动与狩猎',
    'Hound':'猎犬，拥有出色的嗅觉或视觉追踪能力',
    'Terrier':'梗犬，以无畏的勇气和强烈的狩猎本能著称',
    'Toy':'玩具犬，专为陪伴而生的小型犬',
    'Foundation Stock':'稀有犬种',
    'Miscellaneous':'杂项组犬种',
  };
  return map[g] || '犬种';
}

// ── Generate full Chinese HTML for profile tab ─────────────────────────────
function genProfileTab(data, zhName, enName) {
  const { traits:T, infoBoxes:I, healthTags, quickStats:Q, compat:C } = data;
  const origin   = translateVal(I['Origin'] || '未知地区');
  const group    = I['AKC Group'] || I['Group'] || '';
  const bredFor  = translateVal(I['Bred For'] || '陪伴');
  const coatType = translateVal(I['Coat Type'] || '');
  const groupZh  = GROUP_ZH[group] || translateVal(group) || '犬';
  const lifespan = translateVal(Q['Lifespan'] || I['Average Lifespan'] || '10–13年');
  const weight   = translateQuickStat(Q['Weight'] || '', 'Weight');
  const energy   = T['Energy Level'] || 3;
  const trainability = T['Trainability'] || 3;
  const grooming = T['Grooming Needs'] || 2;
  const friendliness = T['Friendliness'] || 4;
  const kids     = T['Good with Kids'] || 3;
  const barking  = T['Barking'] || 2;
  const shedding = T['Shedding'] || 2;

  const aptStars = C['Apartment'] || 3;
  const aptText  = aptStars>=4 ? '非常适合公寓生活' : aptStars>=3 ? '较适合公寓生活' : '更适合有院子的家庭';
  const firstText = C['First-Time Owner']>=4 ? '非常适合新手主人' : C['First-Time Owner']>=3 ? '较适合有一定经验的主人' : '建议有经验的主人饲养';

  // Health tags translated
  const healthTagsZh = healthTags
    .filter(t => !['Chocolate','Grapes & Raisins','Grapes &amp; Raisins','Onions & Garlic','Onions &amp; Garlic',
                    'Xylitol (artificial sweetener)','Macadamia Nuts','Alcohol','Avocado','Raw yeast dough',
                    'Coffee & Caffeine','Coffee &amp; Caffeine','Raisins','Cooked bones'].includes(t))
    .map(t => HEALTH_TAG_ZH[t] || t);
  const dangerFoodsZh = ['巧克力','葡萄与葡萄干','洋葱与大蒜','木糖醇（人工甜味剂）','夏威夷果','酒精','牛油果','生酵母面团'];

  const vetCost    = translateVal(I['Vet Cost Risk'] || '');
  const breathRisk = translateVal(I['Breathing Risk'] || '');
  const heatTol    = translateVal(I['Heat Tolerance'] || '');
  const avgLifespan = translateVal(I['Average Lifespan'] || lifespan);

  const compat_apt_zh = C['Apartment']>=4 ? '极适合公寓和城市生活' : C['Apartment']>=3 ? '适合公寓生活' : '适合有院子的郊区住宅';

  return `
        <div class="breed-section">
          <h2>🐾 品种简介</h2>
          <p>${zhName}原产于${origin}，是AKC认可的${groupContext(group)}，专为${bredFor}而培育。这一犬种拥有独特的个性和外形，无论是作为家庭伴侣还是工作犬，都在全球范围内赢得了无数爱好者的喜爱。</p>
          <p>就日常生活而言，${zhName}的${energyDesc(energy)}。${kidsDesc(kids)}，${compat_apt_zh}，寿命通常为${avgLifespan}。${coatType ? `其${coatType}的毛发特点为其增添了独特魅力。` : ''}</p>
          <div class="info-grid">
            <div class="info-box"><div class="info-box-label">起源</div><div class="info-box-value">${origin}</div></div>
            <div class="info-box"><div class="info-box-label">AKC犬种组</div><div class="info-box-value">${groupZh}</div></div>
            <div class="info-box"><div class="info-box-label">培育目的</div><div class="info-box-value">${bredFor}</div></div>
            <div class="info-box"><div class="info-box-label">毛发类型</div><div class="info-box-value">${coatType}</div></div>
          </div>
        </div>

        <div class="breed-section">
          <h2>😊 性格与个性</h2>
          <p>${zhName}以其${friendDesc(friendliness)}著称。${barkDesc(barking)}。与孩子的相处方面，${kidsDesc(kids)}。总体而言，这是一种${energy<=2?'安静悠闲':energy>=4?'活跃热情':'平衡温和'}的犬种，非常适合${C['Apartment']>=4?'公寓居民和城市生活':'喜爱户外活动的家庭'}。</p>
          <p>在训练方面，${zhName}${trainDesc(trainability)}。正向强化训练（零食和表扬）效果最佳，应避免严厉的惩罚方式，因为这可能导致犬只产生抵触情绪。早期社会化对于帮助${zhName}成长为自信、友善的成犬至关重要。</p>
          <ul>
            <li>${friendliness>=4?'性格外向友善，对人和其他动物都表现友好':'对主人忠诚，但对陌生人和动物可能较为谨慎，需要充分的社会化训练'}</li>
            <li>${kids>=4?'与儿童相处极佳，耐心温和':'建议在有小孩的环境中进行监督，确保互动安全'}</li>
            <li>${energy<=2?'活力偏低，短暂的散步和室内玩耍即可满足运动需求':energy>=4?'精力旺盛，需要大量运动才能保持平静':'活力适中，平衡了活跃与悠闲'}</li>
            <li>${trainability>=4?'极易训练，学习速度快，很快就能掌握各种技能':trainability>=3?'训练接受度良好，适合有一定经验的主人':'需要耐心培训，短暂有趣的训练课效果最佳'}</li>
            <li>${barking<=2?'很少无故吠叫，适合公寓或有邻居的环境':'对陌生人和异常情况会发出警示，需要适当的吠叫控制训练'}</li>
            <li>${C['First-Time Owner']>=4?'非常适合新手主人，性情温和易于管理':'建议有养狗经验的主人饲养，需要明确的规则和边界'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>🏃 运动与活动需求</h2>
          <p>${zhName}的${energyDesc(energy)}。${energy<=2?`作为活力较低的犬种，每天两次20-30分钟的散步通常已经足够。室内玩耍和益智游戏也是保持其身心健康的好方法。`:`${energy>=4?'每天需要充分的运动来消耗多余精力，跑步、远足和互动游戏是理想的选择。运动不足可能导致破坏性行为。':'建议每天进行一到两次有氧运动，既有助于保持体重，也能满足其探索欲望。'}`}</p>
          <p>${energy<=2?`请注意，即使活力较低的犬种也需要每天定期活动以保持健康体重。运动对于预防关节问题和维持心理健康同样重要，请避免让${zhName}整天待在室内不动。`:`规律的运动训练对${zhName}的身体健康和行为管理都至关重要。充足的运动能有效减少焦虑、破坏行为和吠叫问题，让您的爱犬保持平静快乐。`}</p>
          <ul>
            <li>每日建议运动时间：${energy<=2?'30-45分钟（两次短途散步）':energy===3?'60-90分钟（适中强度运动）':energy===4?'90-120分钟（高强度运动）':'120分钟以上（高强度持续运动）'}</li>
            <li>${energy<=2?'适合室内玩耍和益智游戏作为运动补充':'喜爱户外活动、追逐游戏和互动训练'}</li>
            <li>${energy>=4?'需要足够的户外空间或定期前往狗公园':'可以适应各种居住环境，包括公寓'}</li>
            <li>散步时建议使用舒适的胸背带，避免颈部压力</li>
            <li>老年犬需要根据健康状况适当减少运动强度</li>
            <li>${energy<=2?'避免在炎热天气下过度运动':'天气炎热时建议在清晨或傍晚运动，避免中暑'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>✂️ 美容与毛发护理</h2>
          <p>${zhName}的${groomDesc(grooming)}。${shedDesc(shedding)}。${grooming<=2?`得益于较低的护理需求，${zhName}是忙碌主人的理想选择。基本的定期梳理和洗澡就能保持其整洁外观。`:`${zhName}的毛发需要定期专业护理。建议与当地专业宠物美容师保持联系，制定适合该犬种的护理计划。`}</p>
          <ul>
            <li>梳毛频率：${grooming<=2?'每周1-2次':grooming===3?'每周2-3次':'每天梳理'}</li>
            <li>洗澡频率：每4-8周一次，或根据需要更频繁</li>
            <li>每3-4周修剪指甲一次，避免指甲过长影响步态</li>
            <li>每周检查并清洁耳道，预防耳部感染</li>
            <li>建议从幼犬时期开始培养美容护理习惯，让其习惯被触摸和梳理</li>
            <li>${grooming>=4?'建议每6-8周前往专业美容师处进行全面护理':'定期检查皮肤状况，发现异常及时就医'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>🎓 训练</h2>
          <p>${zhName}${trainDesc(trainability)}。最有效的训练方法是正向强化——使用零食、赞美和游戏作为奖励。训练课程应保持简短（每次5-10分钟），并充满趣味性，避免单调重复导致犬只失去兴趣。</p>
          <p>早期社会化训练对${zhName}至关重要。在幼犬8-16周的关键社会化窗口期内，应让其接触不同的人、动物、声音和环境，这将极大地影响其成年后的行为表现。良好的社会化能让${zhName}成长为自信、友善、从容的成犬。</p>
          <ul>
            <li>训练课程保持简短、有趣，每次5-10分钟效果最佳</li>
            <li>高度食物驱动——零食和奖励是最有效的训练工具</li>
            <li>8-16周是关键社会化窗口期，应充分接触各种环境刺激</li>
            <li>尽早开始笼子训练，有助于建立安全感和独处能力</li>
            <li>避免使用惩罚和强制方法——正向强化效果更持久</li>
            <li>${trainability<=2?'考虑报名参加专业训练课程，有助于建立良好的行为基础':'掌握基础口令后，可以尝试学习高难度技能和竞技训练'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>🏥 健康与常见问题</h2>
          <p>${zhName}的平均寿命为${avgLifespan}。像所有犬种一样，${zhName}也有其特定的健康倾向。了解这些常见健康问题有助于主人提前做好预防和应对准备。${healthTagsZh.length>0?`该犬种最常见的健康问题包括：${healthTagsZh.slice(0,3).join('、')}等。`:''}</p>
          <p>${vetCost?`兽医费用风险评估：${vetCost}。`:''}${breathRisk?`呼吸风险：${breathRisk}。`:''} 建议主人为${zhName}办理宠物医疗保险，以应对潜在的高额医疗费用。定期体检（每年至少一次）和预防性护理是保持犬只健康的最佳方式。</p>
          <div class="health-tags">
            ${healthTagsZh.map(t=>`<span class="health-tag">${t}</span>`).join('\n            ')}
          </div>
          <div class="info-grid" style="margin-top:16px">
            <div class="info-box"><div class="info-box-label">平均寿命</div><div class="info-box-value">${avgLifespan}</div></div>
            ${vetCost?`<div class="info-box"><div class="info-box-label">兽医费用风险</div><div class="info-box-value">${vetCost}</div></div>`:''}
            ${breathRisk?`<div class="info-box"><div class="info-box-label">呼吸风险</div><div class="info-box-value">${breathRisk}</div></div>`:''}
            ${heatTol?`<div class="info-box"><div class="info-box-label">耐热能力</div><div class="info-box-value">${heatTol}</div></div>`:''}
          </div>
          <h3 style="margin-top:20px;font-size:1rem;color:var(--text-dark)">🚫 对${zhName}有危险的食物</h3>
          <div class="health-tags">
            ${dangerFoodsZh.map(t=>`<span class="health-tag">${t}</span>`).join('\n            ')}
          </div>
        </div>

        <div class="breed-section">
          <h2>🏠 ${zhName}适合您吗？</h2>
          <p>${zhName}是${C['Apartment']>=4?'城市居民、公寓住户':C['Apartment']>=3?'郊区家庭':'有宽敞院子的家庭'}的理想选择。${firstText}。${C['With Kids']>=4?`它与孩子相处极佳，是出色的家庭伴侣犬。`:`需要注意与小孩子的互动监督。`}对于${energy<=2?'不喜欢剧烈运动、偏爱悠闲生活方式的主人':energy>=4?'热爱户外活动、生活方式活跃的主人':'运动量适中的主人'}来说，${zhName}将是完美的搭档。</p>
          <div class="compat-grid">
            <div class="compat-item"><span class="compat-icon">👶</span><span class="compat-label">与儿童</span><span class="compat-stars">${'★'.repeat(C['With Kids']||3)}${'☆'.repeat(5-(C['With Kids']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🐕</span><span class="compat-label">与其他犬</span><span class="compat-stars">${'★'.repeat(C['With Dogs']||3)}${'☆'.repeat(5-(C['With Dogs']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🐈</span><span class="compat-label">与猫</span><span class="compat-stars">${'★'.repeat(C['With Cats']||3)}${'☆'.repeat(5-(C['With Cats']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🏠</span><span class="compat-label">公寓适应</span><span class="compat-stars">${'★'.repeat(C['Apartment']||3)}${'☆'.repeat(5-(C['Apartment']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🔰</span><span class="compat-label">新手主人</span><span class="compat-stars">${'★'.repeat(C['First-Time Owner']||3)}${'☆'.repeat(5-(C['First-Time Owner']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🌡️</span><span class="compat-label">炎热气候</span><span class="compat-stars">${'★'.repeat(C['Hot Climates']||3)}${'☆'.repeat(5-(C['Hot Climates']||3))}</span></div>
          </div>
        </div>`;
}

// ── Diet tab Chinese content ───────────────────────────────────────────────
function genDietTab(html, zhName, data) {
  // Strip the trailing </div> that sits on same line as <!-- end tab-diet --> in the source
  const dietSection = ((html.match(/id="tab-diet">([\s\S]*?)<!--\s*end tab-diet/) || [])[1] || '')
    .replace(/\s*<\/div>\s*$/, '');

  let out = dietSection
    .replace(/<h2>🍽️ How Much to Feed a [^<]+<\/h2>/g, `<h2>🍽️ ${zhName}每日喂食量</h2>`)
    .replace(/<h2>📏 Daily Portion Guide by Weight<\/h2>/g, '<h2>📏 按体重划分的每日喂食量参考</h2>')
    .replace(/<h2>📏 Daily Portion Guide<\/h2>/g, '<h2>📏 每日喂食量参考</h2>')
    .replace(/<h2>✅ Best Foods for [^<]+<\/h2>/g, `<h2>✅ ${zhName}最佳食品推荐</h2>`)
    .replace(/<h2>🚫 Foods(?: That Are)? Dangerous for [^<]+<\/h2>/g, '<h2>🚫 对狗狗有危险的食物</h2>')
    .replace(/<h2>🚫 Foods Dangerous for Dogs<\/h2>/g, '<h2>🚫 狗狗危险食物</h2>')
    .replace(/<h2>🦴 Healthy Treats for [^<]+<\/h2>/g, '<h2>🦴 健康零食推荐</h2>')
    .replace(/<h2>🦴 Healthy Treats<\/h2>/g, '<h2>🦴 健康零食</h2>')
    .replace(/<h2>💡 Feeding Tips?<\/h2>/g, '<h2>💡 喂食建议</h2>')
    .replace(/<h2>📊 [^<]+ Feeding Schedule<\/h2>/g, '<h2>📊 喂食时间表</h2>')
    .replace(/<h2>🍽️ Diet &amp; Feeding Guide<\/h2>/g, `<h2>🍽️ ${zhName}饮食与喂食指南</h2>`)
    .replace(/<h2>🍽️ Diet &amp; Nutrition<\/h2>/g, `<h2>🍽️ ${zhName}饮食与营养</h2>`)
    .replace(/<h2>🍽️ Feeding Guide<\/h2>/g, `<h2>🍽️ ${zhName}喂食指南</h2>`)
    .replace(/<h2>[^<]+ Feeding Overview<\/h2>/g, '<h2>喂食概览</h2>')
    .replace(/<h2>💧 Hydration &amp; Treats<\/h2>/g, '<h2>💧 补水与零食</h2>')
    .replace(/<h2>🥩 Recommended Diet<\/h2>/g, '<h2>🥩 推荐饮食</h2>')
    .replace(/<h2>⚠️ Foods to Avoid<\/h2>/g, '<h2>⚠️ 应避免的食物</h2>');

  // Table headers
  out = out
    .replace(/<th>Life Stage<\/th>/g, '<th>生长阶段</th>')
    .replace(/<th>Daily Amount<\/th>/g, '<th>每日用量</th>')
    .replace(/<th>Notes<\/th>/g, '<th>备注</th>')
    .replace(/<th>Expense<\/th>/g, '<th>费用项目</th>')
    .replace(/<th>Estimated Cost<\/th>/g, '<th>估计费用</th>')
    .replace(/<th>Age<\/th>/g, '<th>年龄</th>')
    .replace(/<th>Meals\/Day<\/th>/g, '<th>每日餐数</th>')
    .replace(/<th>Portion<\/th>/g, '<th>每份用量</th>');

  // Table cells - life stages
  out = out
    .replace(/Mini Puppy \(2[–-]12 mo\)/g, '迷你幼犬（2-12个月）')
    .replace(/Standard Puppy \(2[–-]12 mo\)/g, '标准幼犬（2-12个月）')
    .replace(/Mini Adult \(1[–-]10 yr\)/g, '迷你成犬（1-10岁）')
    .replace(/Standard Adult \(1[–-]10 yr\)/g, '标准成犬（1-10岁）')
    .replace(/Senior \(8\+ yr\)/g, '老年犬（8岁以上）')
    .replace(/Senior \(7\+ yr\)/g, '老年犬（7岁以上）')
    .replace(/Puppy \(2[–-]12 months?\)/g, '幼犬（2-12个月）')
    .replace(/Adult \(1[–-]7 years?\)/g, '成犬（1-7岁）')
    .replace(/Senior \(7\+\)/g, '老年犬（7岁以上）')
    .replace(/Reduce by 10[–-]20%/g, '减少10-20%')
    .replace(/3 meals\/day/g, '每天3餐')
    .replace(/2 meals\/day/g, '每天2餐')
    .replace(/Large-breed puppy formula/g, '大型犬幼犬配方')
    .replace(/Small-breed puppy formula/g, '小型犬幼犬配方')
    .replace(/Joint-support formula/g, '关节保护配方')
    .replace(/monitor weight closely/g, '密切监控体重')
    .replace(/adjust for activity level/g, '根据活动量调整')
    .replace(/watch for weight gain/g, '注意体重增长');

  // Info-box labels in diet
  out = out
    .replace(/<div class="info-box-label">Puppy \(8[–-]12 weeks?\)<\/div>/g,
      '<div class="info-box-label">幼犬（8-12周）</div>')
    .replace(/<div class="info-box-label">Puppy \(3[–-]6 months?\)<\/div>/g,
      '<div class="info-box-label">幼犬（3-6个月）</div>')
    .replace(/<div class="info-box-label">Adult \(1\+ years?\)<\/div>/g,
      '<div class="info-box-label">成犬（1岁以上）</div>')
    .replace(/<div class="info-box-label">Senior \(7\+ years?\)<\/div>/g,
      '<div class="info-box-label">老年犬（7岁以上）</div>')
    .replace(/<div class="info-box-label">Puppy \(2[–-]3 months?\)<\/div>/g,
      '<div class="info-box-label">幼犬（2-3个月）</div>');

  // Weight-based portion labels like "5 lbs (inactive)"
  out = out
    .replace(/<div class="info-box-label">(\d+) lbs? \(inactive\)<\/div>/g,
      (m,w) => `<div class="info-box-label">${w}磅（低活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+) lbs? \(average\)<\/div>/g,
      (m,w) => `<div class="info-box-label">${w}磅（平均活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+) lbs? \(active\)<\/div>/g,
      (m,w) => `<div class="info-box-label">${w}磅（较高活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+) lbs? \(very active\)<\/div>/g,
      (m,w) => `<div class="info-box-label">${w}磅（高活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+)[–-](\d+) lbs? \(inactive\)<\/div>/g,
      (m,a,b) => `<div class="info-box-label">${a}–${b}磅（低活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+)[–-](\d+) lbs? \(average\)<\/div>/g,
      (m,a,b) => `<div class="info-box-label">${a}–${b}磅（平均活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+)[–-](\d+) lbs? \(active\)<\/div>/g,
      (m,a,b) => `<div class="info-box-label">${a}–${b}磅（较高活动量）</div>`)
    .replace(/<div class="info-box-label">(\d+)[–-](\d+) lbs? \(very active\)<\/div>/g,
      (m,a,b) => `<div class="info-box-label">${a}–${b}磅（高活动量）</div>`);

  // Translate dangerous food tags
  out = out
    .replace(/>Chocolate</g, '>巧克力<')
    .replace(/>Grapes &amp; Raisins</g, '>葡萄与葡萄干<')
    .replace(/>Grapes & Raisins</g, '>葡萄与葡萄干<')
    .replace(/>Onions &amp; Garlic</g, '>洋葱与大蒜<')
    .replace(/>Onions & Garlic</g, '>洋葱与大蒜<')
    .replace(/>Xylitol \(artificial sweetener\)</g, '>木糖醇（人工甜味剂）<')
    .replace(/>Macadamia Nuts</g, '>夏威夷果<')
    .replace(/>Alcohol</g, '>酒精<')
    .replace(/>Avocado</g, '>牛油果<')
    .replace(/>Raw yeast dough</g, '>生酵母面团<')
    .replace(/>Coffee &amp; Caffeine</g, '>咖啡与咖啡因<')
    .replace(/>Cooked bones</g, '>熟骨头<');

  // Healthy treats
  out = out
    .replace(/Carrots — low calorie[^<]*/g, '胡萝卜——低卡路里，对牙齿有益')
    .replace(/Carrots — low calorie and great for teeth/g, '胡萝卜——低卡路里，对牙齿有益')
    .replace(/Blueberries — antioxidants[^<]*/g, '蓝莓——富含抗氧化剂，狗狗很喜欢')
    .replace(/Plain cooked chicken or turkey[^<]*/g, '白煮鸡肉或火鸡肉（不加调料）')
    .replace(/Apple slices[^<]*/g, '苹果片（去除种子和果核）')
    .replace(/Green beans[^<]*/g, '四季豆——饱腹感强，卡路里极低')
    .replace(/Commercial treats sized[^<]*/g, '按狗狗体重选择适合尺寸的商业零食')
    .replace(/Plain rice cakes[^<]*/g, '原味米饼——低卡路里的训练奖励')
    .replace(/Carrots[^<—]*/g, '胡萝卜');

  // Boarding tip box
  out = out.replace(
    /<h4>💡 Tip: Boarding your [^<]+\?<\/h4>/g,
    `<h4>💡 小提示：寄养${zhName}时</h4>`
  );

  // Translate tip boxes
  out = out
    .replace(/<h4>💡 Feeding tip for[^<]*<\/h4>/g,
      `<h4>💡 ${zhName}喂食建议</h4>`);

  out = out.replace(
    /<h3>💧 Hydration &amp; Treats<\/h3>/g, '<h3>💧 补水与零食</h3>'
  );
  out = out.replace(
    /Always provide fresh water\. Keep treats to ≤10% of daily calories\. Avoid chocolate, grapes, onions, and xylitol — all toxic to dogs\./g,
    '始终提供新鲜饮用水。零食应控制在每日卡路里的10%以内。避免喂食巧克力、葡萄、洋葱和木糖醇——这些对狗狗均有毒性。'
  );

  // Small-breed formula bullet items
  out = out
    .replace(/[Ss]mall[- ]breed[^<]*formula[^<]*sized kibble[^<]*/g,
      '小型犬专用配方，颗粒大小适合小嘴型，便于咀嚼')
    .replace(/[Ss]low feeders? prevent[^<]*/g,
      '使用慢食碗可防止狗狗吞食过快，避免消化不适')
    .replace(/[Oo]mega fatty acids? support[^<]*/g,
      '富含Omega脂肪酸，有助于维护健康的毛发和皮肤')
    .replace(/[Aa]void overfeeding[^<]*/g,
      '避免过度喂食——多余的体重会给关节带来压力')
    .replace(/[Ll]ook for[^<]*named animal protein[^<]*/g,
      '选择以具名动物蛋白质（如鸡肉、牛肉、三文鱼）为首位成分的狗粮');

  // Catch-all: replace any remaining English intro paragraphs in diet tab
  out = out.replace(/<p>([A-Z][^<]{60,})<\/p>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.85) {
      return `<p>请根据您的${zhName}的体型、年龄和活动量调整每日喂食量。以下为参考标准，具体用量请参考所选品牌的喂食指南。</p>`;
    }
    return m;
  });

  // Catch-all: remaining English li items
  out = out.replace(/<li>([A-Z][^<]{30,})<\/li>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.85) {
      const t = translateVal(text);
      if (t !== text) return `<li>${t}</li>`;
    }
    return m;
  });

  return out;
}

// ── Cost tab Chinese content ───────────────────────────────────────────────
function genCostTab(html, zhName) {
  let out = ((html.match(/id="tab-cost">([\s\S]*?)<!--\s*end tab-cost/) || [])[1] || '')
    .replace(/\s*<\/div>\s*$/, '');

  out = out
    .replace(/<h2>💰 How Much Does a [^<]+ Cost\?<\/h2>/g,
      `<h2>💰 购买${zhName}需要多少钱？</h2>`)
    .replace(/<h2>📅 Monthly Cost of Owning a [^<]+<\/h2>/g,
      `<h2>📅 每月养育${zhName}的费用</h2>`)
    .replace(/<h2>📊 Lifetime Cost Estimate<\/h2>/g, '<h2>📊 终生费用估算</h2>')
    .replace(/<h2>💡 How to Save Money as a [^<]+ Owner<\/h2>/g,
      `<h2>💡 养${zhName}的省钱建议</h2>`)
    .replace(/<h2>💰 Cost &amp; Price Guide<\/h2>/g, `<h2>💰 ${zhName}费用指南</h2>`)
    .replace(/<h2>💰 [^<]+ Price Guide<\/h2>/g, `<h2>💰 ${zhName}价格指南</h2>`)
    .replace(/<h2>💰 Purchase Price<\/h2>/g, '<h2>💰 购买价格</h2>')
    .replace(/<h2>📊 Annual Cost Breakdown<\/h2>/g, '<h2>📊 年度费用明细</h2>')
    .replace(/<h2>📊 [^<]+ Annual Costs?<\/h2>/g, '<h2>📊 年度费用估算</h2>');

  out = out
    .replace(/<th>Expense<\/th>/g, '<th>费用项目</th>')
    .replace(/<th>Estimated Cost<\/th>/g, '<th>估计费用</th>')
    .replace(/<th>Cost<\/th>/g, '<th>费用</th>');

  out = out
    .replace(/>Puppy from Breeder</g, '>从繁育者购买幼犬<')
    .replace(/>Monthly Food</g, '>每月食物费用<')
    .replace(/>Annual Vet Care</g, '>每年兽医费用<')
    .replace(/>Grooming \(annual\)</g, '>美容费用（每年）<')
    .replace(/>Pet Insurance</g, '>宠物保险<')
    .replace(/>Training Classes</g, '>训练课程<')
    .replace(/>Toys &amp; Supplies</g, '>玩具和用品<');

  out = out
    .replace(/<div class="info-box-label">Reputable Breeder<\/div>/g,
      '<div class="info-box-label">信誉繁育者</div>')
    .replace(/<div class="info-box-label">Show \/ Champion Lines<\/div>/g,
      '<div class="info-box-label">展犬/冠军血统</div>')
    .replace(/<div class="info-box-label">Rescue \/ Adoption<\/div>/g,
      '<div class="info-box-label">救援/领养</div>')
    .replace(/<div class="info-box-label">Backyard Breeder ⚠️<\/div>/g,
      '<div class="info-box-label">不正规繁育者 ⚠️</div>')
    .replace(/<div class="info-box-label">Food \(quality kibble\)<\/div>/g,
      '<div class="info-box-label">食物（优质狗粮）</div>')
    .replace(/<div class="info-box-label">Vet visits \(annual\)<\/div>/g,
      '<div class="info-box-label">兽医费用（每年）</div>')
    .replace(/<div class="info-box-label">Pet insurance<\/div>/g,
      '<div class="info-box-label">宠物保险</div>')
    .replace(/<div class="info-box-label">Grooming<\/div>/g,
      '<div class="info-box-label">美容费用</div>')
    .replace(/<div class="info-box-label">Toys &amp; supplies<\/div>/g,
      '<div class="info-box-label">玩具和用品</div>')
    .replace(/<div class="info-box-label">Training classes<\/div>/g,
      '<div class="info-box-label">训练课程</div>');

  out = out
    .replace(/<h4>💡 Money-saving tip<\/h4>/g, '<h4>💡 省钱建议</h4>');

  // Translate cost list items
  out = out
    .replace(/Boarding costs: plan[^<]+when you travel[^<]*/g,
      '寄养费用：旅行时在优质设施处寄养通常需每晚一定费用')
    .replace(/Pet insurance is essentially mandatory/g, '宠物保险对于高风险犬种几乎是必须的')
    .replace(/Pet insurance is worth it[^<]*/g,
      '宠物保险物有所值——一旦需要手术，其价值将远超保费')
    .replace(/Get pet insurance before your dog turns 1[^<]*/g,
      '在狗狗1岁前购买宠物保险——保费更低，排除条款更少')
    .replace(/Buy food in bulk[^<]*/g,
      '批量购买狗粮（大包装）——每磅价格更划算')
    .replace(/Learn basic grooming at home[^<]*/g,
      '学习居家基础美容——在美容师处梳理和剪指甲费用可观')
    .replace(/Ask your vet about annual wellness plans[^<]*/g,
      '向兽医咨询年度健康计划——许多诊所提供套餐服务')
    .replace(/Adopt instead of buying[^<]*/g,
      '选择领养而非购买——领养犬同样充满爱，费用仅为购买的一小部分')
    .replace(/Use a rewards credit card[^<]*/g,
      '使用积分信用卡支付较大笔兽医账单，获得返现或积分')
    .replace(/First year is the most expensive[^<]*/g,
      '第一年费用最高：购买/领养费用、疫苗、绝育/去势、初始用品')
    .replace(/Budget extra for unexpected vet bills[^<]*/g,
      '为意外兽医费用预留额外预算——任何犬种都可能发生意外')
    .replace(/Pet insurance pays for itself[^<]*/g,
      '宠物保险若您的狗狗需要手术或重大治疗，物有所值')
    .replace(/The upfront cost of[^<]+beginning[^<]+\./g,
      `购买${zhName}只是开始。以下是详细的费用分析，帮助您做好财务规划。`)
    .replace(/Beyond the purchase price[^<]+month[^<]+\. Here's where the money goes:/g,
      `除购买费用外，每月养育${zhName}平均花费在以下几个方面：`)
    .replace(/Over a \d+[–-]\d+ year lifespan[^<]+total[^<]+—[^<]+\./g,
      `在${zhName}的整个生命周期内，总花费因健康状况、生活方式和所选服务而有所不同。`);

  // Translate paragraphs with <strong> price tags (monthly/lifetime cost)
  out = out.replace(
    /<p>Beyond the purchase price, owning a [^<]+(?:costs?|typically costs?) (?:between )?<strong>([^<]+)<\/strong>[^<]*\. Here's where the money goes:<\/p>/g,
    (m, price) => `<p>除购买费用外，养育${zhName}每月平均花费约 <strong>${price}</strong>。以下是主要费用构成：</p>`
  );
  out = out.replace(
    /<p>The upfront cost of (?:a|an) [^<]+ is just the beginning\.[^<]+<\/p>/g,
    `<p>购买${zhName}只是开始。以下是购买和养育${zhName}的全面费用分析。</p>`
  );
  out = out.replace(
    /<p>Over a ([\d–\-]+)[- ](?:to[- ])?([\d]+)?[- ]?year lifespan, (?:a|an) [^<]+ typically costs? (?:between )?<strong>([^<]+)<\/strong>[^<]*\.<\/p>/g,
    (m, y1, y2, cost) => `<p>在${y1}${y2?'–'+y2:''}年的生命周期内，养育${zhName}的总花费约为 <strong>${cost}</strong>，具体取决于健康状况、生活方式及所选服务。</p>`
  );

  // Translate travel-tip-box paragraphs (insurance/saving tips)
  out = out.replace(
    /<p>Pet insurance is worth considering for any breed\. Buying before your dog turns 1[^<]+\. Compare 2[^<]+\.<\/p>/g,
    '<p>任何犬种都值得考虑宠物保险。在狗狗满1岁前购买可获得最低保费和最少的既往症排除条款。建议对比2-3家保险商后再决定。</p>'
  );

  // Translate monthly/year suffixes in info-box values
  out = out.replace(/(\$[\d,\s–-]+)\/month/g, '$1/月');
  out = out.replace(/(\$[\d,\s–-]+)\/year/g, '$1/年');
  out = out.replace(/\(one-time\)/g, '（一次性费用）');

  // Catch-all for remaining English paragraphs (no HTML tags)
  out = out.replace(/<p>([A-Z][^<]{60,})<\/p>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.85) {
      const t = translateVal(text);
      return t !== text ? `<p>${t}</p>` : m;
    }
    return m;
  });

  // Catch-all for remaining English li items
  out = out.replace(/<li>([A-Z][^<]{30,})<\/li>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.85) {
      const t = translateVal(text);
      if (t !== text) return `<li>${t}</li>`;
    }
    return m;
  });

  return out;
}

// ── Mix breeds tab Chinese content ────────────────────────────────────────
function genMixesTab(html, zhName) {
  let out = ((html.match(/id="tab-mixes">([\s\S]*?)<!--\s*end tab-mixes/) || [])[1] || '')
    .replace(/\s*<\/div>\s*$/, '');

  out = out.replace(
    /<h2>🧬 Popular [^<]+ Mix Breeds<\/h2>/g,
    `<h2>🧬 热门${zhName}混血犬种</h2>`
  );

  // Translate mix breed h2 headings (e.g. "Affenpinscher Brussels Griffon Mix")
  out = out.replace(/<h2>([🐾🐩🐕🐈🦮🐶])\s+([^<]+) Mix<\/h2>/g, (m, emoji, breedName) => {
    return `<h2>${emoji} ${breedName} 混血犬</h2>`;
  });
  out = out.replace(/<h2>([^<]+) Mix<\/h2>/g, (m, breedName) => {
    if (!breedName.includes('混血')) return `<h2>${breedName} 混血犬</h2>`;
    return m;
  });

  // Translate info-box labels in mixes
  out = out
    .replace(/<div class="info-box-label">Size<\/div>/g, '<div class="info-box-label">体型</div>')
    .replace(/<div class="info-box-label">Energy<\/div>/g, '<div class="info-box-label">活力</div>')
    .replace(/<div class="info-box-label">Price<\/div>/g, '<div class="info-box-label">价格</div>')
    .replace(/<div class="info-box-label">Shedding<\/div>/g, '<div class="info-box-label">掉毛</div>')
    .replace(/<div class="info-box-label">Trainability<\/div>/g, '<div class="info-box-label">训练性</div>')
    .replace(/<div class="info-box-label">Breathing<\/div>/g, '<div class="info-box-label">呼吸</div>')
    .replace(/<div class="info-box-label">Breathing Risk<\/div>/g, '<div class="info-box-label">呼吸风险</div>')
    .replace(/<div class="info-box-label">Best For<\/div>/g, '<div class="info-box-label">最适合</div>')
    .replace(/<div class="info-box-label">Temperament<\/div>/g, '<div class="info-box-label">性格</div>')
    .replace(/<div class="info-box-label">Coat<\/div>/g, '<div class="info-box-label">毛发</div>')
    .replace(/<div class="info-box-label">Lifespan<\/div>/g, '<div class="info-box-label">寿命</div>')
    .replace(/<div class="info-box-label">Exercise<\/div>/g, '<div class="info-box-label">运动需求</div>');

  // Translate info-box values
  out = out
    .replace(/>Moderate – High<\/div>/g, '>中等偏高</div>')
    .replace(/>Moderate–High<\/div>/g, '>中等偏高</div>')
    .replace(/>Low – Moderate<\/div>/g, '>低至适中</div>')
    .replace(/>Low–Moderate<\/div>/g, '>低至适中</div>')
    .replace(/>Moderate<\/div>/g, '>适中</div>')
    .replace(/>Low<\/div>/g, '>低</div>')
    .replace(/>High<\/div>/g, '>高</div>')
    .replace(/>Very High<\/div>/g, '>非常高</div>')
    .replace(/>Good<\/div>/g, '>良好</div>')
    .replace(/>Excellent<\/div>/g, '>优秀</div>')
    .replace(/>Relaxed households?<\/div>/g, '>悠闲家庭</div>')
    .replace(/>Active families<\/div>/g, '>活跃家庭</div>')
    .replace(/>Families with children<\/div>/g, '>有孩子的家庭</div>');

  // Apply translateVal to all info-box-value content
  out = out.replace(
    /<div class="info-box-value">([^<]+)<\/div>/g,
    (m, val) => `<div class="info-box-value">${translateVal(val)}</div>`
  );

  // Translate mix intro paragraphs (catch-all for any English paragraphs)
  out = out.replace(/<p>([A-Z][^<]{40,})<\/p>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.80 && !text.includes('混血') && !text.includes('犬种') && !text.includes('结合')) {
      return `<p>以下混血犬种结合了${zhName}与其他优秀犬种的特质，各有独特的外形和性格特点。在考虑饲养任何混血犬之前，建议了解其亲本犬种的特征及潜在的健康需求。</p>`;
    }
    return m;
  });

  return out;
}

// ── Fun facts tab Chinese content ─────────────────────────────────────────
function genFactsTab(srcHtml, zhName, data) {
  const { traits:T, infoBoxes:I, quickStats:Q, compat:C } = data;
  const origin  = translateVal(I['Origin'] || '');
  const group   = I['AKC Group'] || I['Group'] || '';
  const groupZh = GROUP_ZH[group.replace(' Group','')] || group;
  const akc     = I['AKC Rank'] || Q['AKC Rank'] || '';
  const akcZh   = akc ? translateVal(akc) : '';
  const alsoKnownAs = translateVal(I['Also Known As'] || '');
  const size    = translateVal(I['Size'] || '');
  const coat    = translateVal(I['Coat'] || I['Coat Type'] || '');
  const colors  = translateVal(I['Colors'] || '');
  const aptVal  = translateVal(I['Good for Apartments'] || '');

  const energy = T['Energy Level'] || 3;
  const trainability = T['Trainability'] || 3;

  // Generate fun facts from breed data
  const facts = [
    `${zhName}原产于${origin || '历史悠久的地区'}，是一个具有深厚历史底蕴的犬种。经过数百年的选育，这一犬种逐渐形成了其独特的外形特征和性格特质，并在世界各地赢得了众多爱好者的喜爱。`,
    `在AKC认可的犬种中，${zhName}属于${groupZh}。${energy>=4?`作为一个精力充沛的犬种，${zhName}在各种犬类运动和工作中表现出色，包括敏捷性训练和服从性比赛。`:`${zhName}以其${energy<=2?'温顺悠闲':'平衡的活力'}著称，是${C['Apartment']>=4?'城市公寓':'各种家庭环境'}中备受欢迎的伴侣犬。`}`,
    `${trainability>=4?`${zhName}以其出色的学习能力和渴望取悦主人的性格著称。这一犬种在服从性训练和各种技能学习中表现卓越，是初次养狗者的理想选择。`:trainability>=3?`${zhName}聪明而善于学习，只要训练方法得当，通常能快速掌握各种指令。使用正向强化方法（零食奖励和表扬）效果最佳。`:`${zhName}有其独特的个性，训练需要主人保持耐心和一致性。该犬种对有经验的主人反应最好，建议从幼犬时期开始系统训练。`}`,
    `${zhName}${C['With Kids']>=4?'以对儿童极为友善和耐心著称，是优秀的家庭犬。许多家庭选择这一犬种正是因为它与孩子的绝佳相处能力。':C['With Kids']>=3?'通常与孩子相处融洽，但与所有犬种一样，建议在互动时保持监督，确保孩子和狗狗都能安全愉快地相处。':'更适合与年龄较大的儿童一起生活，建议主人在犬只与幼童互动时保持全程监督。'}`,
    `无论您是寻找活跃的运动伙伴还是温柔的家庭伴侣，${zhName}都有其独特的魅力。这一犬种以其${energy>=4?'充沛的活力和对冒险的热爱':energy<=2?'安静温顺的性格和低维护需求':'均衡的个性和适应力'}吸引了全球无数爱犬人士。随着对该犬种了解的加深，您将发现更多关于${zhName}令人着迷的特质。`,
  ];

  // Build "Why People Love" list items
  const whyLove = [
    `忠诚而深情，与家人建立深厚的情感纽带`,
    energy<=2 ? `维护需求${trainability>=4?'低且':'相对'}易于管理，适合各种生活方式的主人` : `活力充沛，是热爱户外活动的主人的完美伙伴`,
    `适应能力强，能够融入${C['Apartment']>=4?'城市公寓生活和':''}各种家庭环境`,
    `独特的外形和个性，在所有犬种中独树一帜`,
    `${trainability>=4?'极易训练，适合初次养狗的主人':'对有一定经验的主人来说，是非常有价值的犬类伴侣'}`,
  ];

  return `<div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 关于${zhName}的趣味知识</h2>
            <p>以下是关于${zhName}最令人着迷的趣味知识，让您对这一犬种有更深入的了解。</p>
            <ul>
              ${facts.map((f,i)=>{
                const emojis = ['🌍','🏆','🎓','👶','❤️'];
                return `<li>${emojis[i]||'🐾'} ${f}</li>`;
              }).join('\n              ')}
            </ul>
          </div>
          <div class="breed-section">
            <h2>📋 ${zhName}基本信息</h2>
            <div class="info-grid">
              ${akcZh?`<div class="info-box"><div class="info-box-label">AKC排名</div><div class="info-box-value">${akcZh}</div></div>`:''}
              <div class="info-box"><div class="info-box-label">犬种组</div><div class="info-box-value">${groupZh}</div></div>
              ${origin?`<div class="info-box"><div class="info-box-label">起源</div><div class="info-box-value">${origin}</div></div>`:''}
              ${alsoKnownAs?`<div class="info-box"><div class="info-box-label">别名</div><div class="info-box-value">${alsoKnownAs}</div></div>`:''}
            </div>
          </div>
          <div class="breed-section">
            <h2>❤️ 为什么人们喜爱${zhName}</h2>
            <ul>
              ${whyLove.map(w=>`<li>${w}</li>`).join('\n              ')}
            </ul>
          </div>
        </div><!-- end tab-facts -->`;
}

// ── Sidebar translation ────────────────────────────────────────────────────
function translateSidebar(html, zhName, data) {
  const { traits:T, infoBoxes:I, quickStats:Q } = data;
  const origin  = translateVal(I['Origin'] || '');
  const group   = I['AKC Group'] || I['Group'] || '';
  const groupZh = GROUP_ZH[group.replace(' Group','')] || translateVal(group) || '';
  const akc     = I['AKC Rank'] || '';
  const akcZh   = akc ? translateVal(akc) : akc;
  const alsoKnownAs = translateVal(I['Also Known As'] || '');
  const size    = translateVal(I['Size'] || '');
  const coat    = translateVal(I['Coat'] || '');
  const colors  = translateVal(I['Colors'] || '');
  const apt     = translateVal(I['Good for Apartments'] || 'Yes');

  // Translate trait labels in sidebar
  for (const [en, zh] of Object.entries(TRAIT_ZH)) {
    html = html.replace(
      new RegExp(`(<span>)${en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(<\/span>)`, 'g'),
      `$1${zh}$2`
    );
  }

  // Sidebar card headings
  html = html
    .replace(/<h4>Breed Traits<\/h4>/g, '<h4>品种特征</h4>')
    .replace(/<h4>Quick Facts<\/h4>/g, '<h4>快速概览</h4>')
    .replace(/<h4[^>]*>Explore More Breeds<\/h4>/g,
      '<h4 style="color:var(--teal-dark)">探索更多犬种</h4>')
    .replace(/Browse our full directory of[^<]+with detailed profiles\./g,
      '浏览我们完整的犬种目录，每个犬种都有详细资料。')
    .replace(/>Browse All Breeds →</g, '>浏览全部犬种 →<');

  // Rebuild the Quick Facts sidebar card entirely from English data (avoids stale mangled values)
  const quickFactsCard = `<div class="sidebar-card">
          <h4>快速概览</h4>
          ${akcZh?`<div class="info-box"><div class="info-box-label">AKC排名</div><div class="info-box-value">${akcZh}</div></div>`:''}
          ${groupZh?`<div class="info-box" style="margin-top:8px"><div class="info-box-label">犬种组</div><div class="info-box-value">${groupZh}</div></div>`:''}
          ${origin?`<div class="info-box" style="margin-top:8px"><div class="info-box-label">起源</div><div class="info-box-value">${origin}</div></div>`:''}
          ${alsoKnownAs?`<div class="info-box" style="margin-top:8px"><div class="info-box-label">别名</div><div class="info-box-value">${alsoKnownAs}</div></div>`:''}
          ${size?`<div class="info-box" style="margin-top:8px"><div class="info-box-label">体型</div><div class="info-box-value">${size}</div></div>`:''}
          ${coat?`<div class="info-box" style="margin-top:8px"><div class="info-box-label">毛发</div><div class="info-box-value">${coat}</div></div>`:''}
          ${colors?`<div class="info-box" style="margin-top:8px"><div class="info-box-label">颜色</div><div class="info-box-value">${colors}</div></div>`:''}
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">适合公寓</div><div class="info-box-value">${translateVal(apt)}</div></div>
        </div>`;

  // Replace the existing Quick Facts sidebar card
  html = html.replace(
    /<div class="sidebar-card">\s*<h4>快速概览<\/h4>[\s\S]*?<\/div>\s*<\/aside>/,
    quickFactsCard + '\n      </aside>'
  );
  // Also handle English version label
  html = html.replace(
    /<div class="sidebar-card">\s*<h4>Quick Facts<\/h4>[\s\S]*?<\/div>\s*<\/aside>/,
    quickFactsCard + '\n      </aside>'
  );

  return html;
}

// ── Apply translations to the full page ───────────────────────────────────
function translateSubtitle(subtitle) {
  if (!subtitle) return '';
  let s = subtitle;
  // Translate AKC group names (only "X Group" form — avoid clobbering breed name words)
  Object.entries(GROUP_ZH).forEach(([en,zh]) => {
    s = s.replace(en + ' Group', zh);
  });
  // Standalone group words only when they clearly stand alone (between · separators)
  s = s.replace(/· Toy ·/g, '· 玩具犬组 ·').replace(/· Herding ·/g, '· 牧羊犬组 ·')
       .replace(/· Working ·/g, '· 工作犬组 ·').replace(/· Sporting ·/g, '· 运动犬组 ·')
       .replace(/· Hound ·/g, '· 猎犬组 ·').replace(/· Terrier ·/g, '· 梗犬组 ·')
       .replace(/· Non-Sporting ·/g, '· 非运动犬组 ·');
  s = s
    .replace(/Most Popular in the US/g, '美国最受欢迎')
    .replace(/Most Popular/g, '最受欢迎')
    .replace(/The Perfect City Dog/g, '完美的城市犬')
    .replace(/The World's Most Popular/g, '世界最受欢迎')
    .replace(/Designer Hybrid/g, '设计师混血犬')
    .replace(/Hybrid Breed/g, '混血犬种')
    .replace(/Purebred/g, '纯种犬')
    .replace(/Family Dog/g, '家庭犬')
    // The English descriptive phrase after the second "·" — translate common patterns
    .replace(/— America's #1 most popular breed[^$]*/g, '— 美国最受欢迎的犬种之一')
    .replace(/— The world's most popular[^·]*/g, '— 世界上最受欢迎的犬种')
    .replace(/— Germany's ancient/g, '— 德国古老的')
    .replace(/— England's ancient/g, '— 英国古老的')
    .replace(/— Scotland's ancient/g, '— 苏格兰古老的')
    .replace(/— France's iconic/g, '— 法国标志性的')
    .replace(/\bGermany's\b/g, '德国的').replace(/\bFrance's\b/g, '法国的')
    .replace(/\bEngland's\b/g, '英国的').replace(/\bScotland's\b/g, '苏格兰的')
    .replace(/\bAmerica's\b/g, '美国的').replace(/\bIreland's\b/g, '爱尔兰的')
    // Country words in subtitles
    .replace(/\bGermany\b/g, '德国').replace(/\bFrance\b/g, '法国')
    .replace(/\bEngland\b/g, '英国').replace(/\bScotland\b/g, '苏格兰')
    .replace(/\bIreland\b/g, '爱尔兰').replace(/\bBelgium\b/g, '比利时')
    .replace(/\bAustralia\b/g, '澳大利亚').replace(/\bCanada\b/g, '加拿大')
    .replace(/\bChina\b/g, '中国').replace(/\bJapan\b/g, '日本')
    .replace(/\bSiberia\b/g, '西伯利亚');
  return s;
}

// ── Process all 302 breed files ────────────────────────────────────────────
const profilesScript = fs.readFileSync(path.join(__dirname,'build_zh_breed_profiles.js'),'utf8');
const bnMatch = profilesScript.match(/const BREED_NAMES = \{([\s\S]*?)\n\};/);
const FULL_BREED_NAMES = bnMatch ? eval('({'+bnMatch[1]+'})') : {};

const zhDir  = path.join(__dirname, 'zh', 'breeds');
const srcDir = path.join(__dirname, 'breeds');
const files  = fs.readdirSync(zhDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let count = 0;
files.forEach(filename => {
  const zhPath  = path.join(zhDir, filename);
  const srcPath = path.join(srcDir, filename);

  let html = fs.readFileSync(zhPath, 'utf8');

  let srcHtml = '';
  if (fs.existsSync(srcPath)) srcHtml = fs.readFileSync(srcPath, 'utf8');

  // Extract zh name from the Chinese file
  const h1Match = html.match(/<h1>([^<]+)<\/h1>/);
  const zhName = h1Match ? h1Match[1].trim() : '';

  // Extract en name from English source
  const enH1 = srcHtml.match(/<h1>([^<]+)<\/h1>/);
  const enName = enH1 ? enH1[1].trim() : '';

  if (!zhName || !srcHtml) { count++; return; }

  const data = extractData(srcHtml);

  // Translate subtitle
  const subtitleMatch = srcHtml.match(/<p class="breed-subtitle">([^<]+)<\/p>/);
  if (subtitleMatch) {
    const subtitleZh = translateSubtitle(subtitleMatch[1]);
    html = html.replace(
      /<p class="breed-subtitle">[^<]+<\/p>/,
      `<p class="breed-subtitle">${subtitleZh}</p>`
    );
  }

  // Translate video section text
  html = html.replace(
    /Watch this video for a quick overview of the [^<.]+ — [^<.]+\./g,
    `观看视频快速了解${zhName}——在深入阅读详情之前，先看看这个犬种的实际表现。`
  );
  html = html.replace(
    /观看视频快速了解 [A-Za-z][^<]+ — see the breed[^<]+\./g,
    `观看视频快速了解${zhName}——在深入阅读详情之前，先看看这个犬种的实际表现。`
  );

  // ── Replace ENTIRE tab section as one clean block ──────────────────────
  // This avoids orphaned/duplicated content from previous partial runs.
  const tabsNavEnd = html.indexOf('</nav>', html.indexOf('<nav class="breed-tabs-nav">')) + '</nav>'.length;
  // Find the closing div of breed-main (just before <aside class="breed-sidebar">)
  const asideStart = html.indexOf('<aside class="breed-sidebar">');

  if (tabsNavEnd !== -1 && asideStart !== -1) {
    const profileZh = genProfileTab(data, zhName, enName);
    const dietZh    = genDietTab(srcHtml, zhName, data);
    const costZh    = genCostTab(srcHtml, zhName);
    const mixZh     = genMixesTab(
      srcHtml.slice(srcHtml.indexOf('<div class="breed-tab-panel" id="tab-mixes">'),
        srcHtml.indexOf('</div><!-- end tab-mixes -->') + '</div><!-- end tab-mixes -->'.length)
      || '<div class="breed-tab-panel" id="tab-mixes"><!-- no mixes --></div><!-- end tab-mixes -->',
      zhName
    );
    const factsZh   = genFactsTab(srcHtml, zhName, data);

    const tabContent = `

        <div class="breed-tab-panel active" id="tab-profile">
${profileZh}

        </div><!-- end tab-profile -->

        <div class="breed-tab-panel" id="tab-diet">
${dietZh}
        </div><!-- end tab-diet -->

        <div class="breed-tab-panel" id="tab-cost">
${costZh}
        </div><!-- end tab-cost -->

        <div class="breed-tab-panel" id="tab-mixes">
          ${mixZh}
        </div><!-- end tab-mixes -->

        ${factsZh}

      </div>

      `;

    html = html.slice(0, tabsNavEnd) + tabContent + html.slice(asideStart);
  }

  // ── Sidebar translation ────────────────────────────────────────────────
  html = translateSidebar(html, zhName, data);

  // ── GLOBAL PASS: translate all remaining English values ──────────────
  // 1. Translate ALL info-box-value content
  html = html.replace(
    /<div class="info-box-value">([^<]+)<\/div>/g,
    (m, val) => `<div class="info-box-value">${translateVal(val)}</div>`
  );

  // 2. Translate quick-stat-values using label context
  html = html.replace(
    /(<span class="quick-stat-value">)([^<]+)(<\/span>\s*<span class="quick-stat-label">)([^<]+)(<\/span>)/g,
    (m, pre, val, mid, lbl, post) => `${pre}${translateQuickStat(val, lbl)}${mid}${lbl}${post}`
  );

  // 3. Translate sidebar card text about browsing breeds
  html = html.replace(
    /Browse our full directory of <strong[^>]*>[^<]*<\/strong> dog breeds with detailed profiles\./g,
    '浏览我们完整的犬种目录，每个犬种都有详细资料。'
  );

  // 4. Translate list items still in English
  html = html.replace(/<li>([A-Z][^<]{40,})<\/li>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.85) {
      const translated = translateVal(text);
      return translated !== text ? `<li>${translated}</li>` : m;
    }
    return m;
  });

  // 5. Translate strong-tag content that's still English in info-boxes
  html = html.replace(
    /<strong>([A-Z][a-zA-Z\s,.\-–]{20,})<\/strong>/g,
    (m, text) => {
      const t = translateVal(text);
      return t !== text ? `<strong>${t}</strong>` : m;
    }
  );

  // 6. Translate travel-tip-box h4 headings
  html = html
    .replace(/<h4>⚠️ Important: Flying with ([^<]+)<\/h4>/g,
      `<h4>⚠️ 重要提示：${zhName}乘机注意事项</h4>`)
    .replace(/<h4>💡 Feeding tip for [^<]+<\/h4>/g,
      `<h4>💡 ${zhName}喂食小贴士</h4>`)
    .replace(/<h4>💡 Money-saving tip<\/h4>/g,'<h4>💡 省钱建议</h4>')
    .replace(/<h4>✈️ Pet Travel Tip<\/h4>/g,'<h4>✈️ 宠物出行提示</h4>')
    .replace(/<h4>🚗 Ground Transport Option<\/h4>/g,'<h4>🚗 地面运输选项</h4>')
    .replace(/<h4>💡 Tip: Boarding your [^<]+\?<\/h4>/g,
      `<h4>💡 小提示：寄养${zhName}时</h4>`);

  // 7. Translate travel-tip-box paragraph content
  html = html.replace(
    /(<div class="travel-tip-box">[\s\S]*?<p>)([A-Z][^<]{60,})(<\/p>)/g,
    (m, pre, text, post) => {
      const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
      if (ascii / text.length > 0.85) {
        return `${pre}${translateVal(text)}${post}`;
      }
      return m;
    }
  );

  // 8. Translate any still-English h4 inside breed-section
  html = html.replace(
    /<h4>([A-Z][^<]{15,})<\/h4>/g,
    (m, text) => {
      const t = translateVal(text);
      return t !== text ? `<h4>${t}</h4>` : m;
    }
  );

  // 9. Photo gallery section heading
  html = html.replace(
    /<h2>📸 Photo Gallery<\/h2>/g,
    `<h2>📸 ${zhName}照片集</h2>`
  );
  html = html.replace(
    /Real [A-Za-z\s]+ — browse photos showcasing[^<]+\./g,
    `浏览${zhName}的真实照片，欣赏它的外形、体型与个性。`
  );
  html = html.replace(
    /Enlarged ([A-Za-z\s]+) photo/g,
    '放大图片'
  );
  html = html.replace(
    /alt="Enlarged [^"]*"/g,
    'alt="放大图片"'
  );

  // 10. Related breeds section
  html = html.replace(/<h2>🐾 Related Breeds<\/h2>/g, '<h2>🐾 相关犬种</h2>');

  fs.writeFileSync(zhPath, html, 'utf8');
  count++;
  if (count % 50 === 0) process.stdout.write(`  ${count} pages done...\n`);
});

console.log(`\n✅ Translated content for ${count} Chinese breed profile pages.`);
