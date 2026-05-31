const fs = require('fs');
const path = require('path');

// Translation maps — order matters: more specific first
const translations = [

  // ── 培育目的 (Bred For) — fully English ──────────────────────────────────
  ["All-purpose hunting, pointing, retrieving", "全能猎犬——指示、惊鸟与寻回"],
  ["Badger and small game hunting", "猎獾与小型猎物狩猎"],
  ["Cattle herding in Welsh farms", "威尔士农场放牧牛群"],
  ["Drafting, herding, and farm work in the Alps", "阿尔卑斯山区拉车、放牧与农场劳作"],
  ["Flushing and retrieving upland birds", "惊鸟与寻回猎鸟"],
  ["Long-distance sled pulling in Arctic conditions", "北极环境下的长途雪橇牵引"],
  ["Personal protection and guard work", "个人保护与守卫工作"],
  ["Property guarding, hunting large game, personal protection", "守卫财产、猎取大型猎物与个人保护"],
  ["Rat catching in textile mills and mines", "在纺织厂和矿场捕鼠"],
  ["Royal companionship and warming laps", "皇室伴侣与暖腿犬"],
  ["Running alongside carriages; firehouse dogs", "奔跑随行马车；消防站犬"],
  ["Scent hunting rabbits and hares", "追踪气味猎取兔子和野兔"],
  ["Versatile hunting — pointing, flushing, retrieving on land and water", "多用途狩猎——陆地与水上指示、惊鸟与寻回"],
  ["Water rescue, hauling nets, draft work", "水上救援、拖网与拉车劳作"],
  ["Water retrieving, truffle hunting", "水中寻回、寻找松露"],

  // ── 培育目的 — mixed Chinese/English ────────────────────────────────────
  ["伴侣犬 and religious ceremonies", "伴侣犬与宗教仪式"],
  ["伴侣犬 for Chinese royalty", "中国皇室伴侣犬"],
  ["伴侣犬 for aristocracy and nobility", "贵族与上流阶层的伴侣犬"],
  ["伴侣犬, Cuban aristocracy lapdog", "伴侣犬，古巴贵族膝上犬"],
  ["伴侣犬, originally pit fighting (now entirely a companion breed)", "伴侣犬（原用于斗狗，现完全作为伴侣犬）"],
  ["伴侣犬, performing", "伴侣犬与表演犬"],
  ["伴侣犬, sled pulling (ancestors)", "伴侣犬（祖先曾用于拉雪橇）"],
  ["寻回 waterfowl", "寻回水禽"],
  ["指示 and retrieving upland birds", "指示与寻回猎鸟"],
  ["捕鼠, farm guarding", "捕鼠与农场守卫"],
  ["牧羊犬组 cattle, pulling carts, guarding", "放牧牛群、拉车与守卫"],
  ["牧羊犬组 livestock on American ranches", "在美国牧场放牧牲畜"],
  ["牧羊犬组 sheep and ponies", "放牧绵羊与小马"],
  ["牧羊犬组 sheep in Highland terrain", "在高地地形放牧绵羊"],
  ["牧羊犬组 sheep over long distances", "长途放牧绵羊"],
  ["牧羊犬组, guarding, police/military work", "放牧、守卫与警察/军事工作"],
  ["牧羊犬组, protection, working", "放牧、保护与工作犬"],
  ["狩猎 large game, guarding, police work", "猎取大型猎物、守卫与警察工作"],
  ["狩猎 wild boar, estate guarding", "猎取野猪与庄园守卫"],
  ["追踪 rabbits and hare for hunters on foot", "为步行猎人追踪兔子和野兔"],
  ["猎物寻回与辅助工作", "猎物寻回与辅助工作"],  // already correct — keep

  // ── 毛发类型 — fully English ─────────────────────────────────────────────
  ["Long, dense double coat with full mane", "长密双层被毛，带完整鬃毛"],
  ["Long, dense double coat with mane and frill", "长密双层被毛，带鬃毛和饰毛"],
  ["Long, dense, flowing double coat", "长密飘逸双层被毛"],
  ["Short, dense double coat", "短密双层被毛"],
  ["Short, dense, coarse double coat", "短密粗糙双层被毛"],
  ["Short, dense, smooth — easy to groom", "短密光滑——易于护理"],
  ["Short, dense, smooth", "短密光滑被毛"],
  ["Short, dense, water-resistant double coat", "短密防水双层被毛"],
  ["Short, dense, water-resistant", "短密防水被毛"],
  ["Short, dense, weather-resistant", "短密耐候被毛"],
  ["Short, dense, 质地细腻", "短密，质地细腻"],
  ["Short, straight, hard double coat", "短直硬质双层被毛"],
  ["Soft, curly, low-shedding double coat", "柔软卷曲、低掉毛双层被毛"],
  ["Soft, wavy or curly; very low-shedding; non-stop growing coat", "柔软波浪或卷曲；极低掉毛；持续生长的被毛"],

  // ── 毛发类型 — mixed Chinese/English ────────────────────────────────────
  ["丝滑, medium-length, with feathering", "丝滑中长毛，带飘毛"],
  ["丝滑, wavy or curly; very low-shedding; varies from straight to tightly curled", "丝滑，波浪或卷曲；极低掉毛；从直毛到紧卷毛不等"],
  ["中型犬-length double coat; straight to wavy", "中等长度双层被毛；从直毛到波浪毛"],
  ["中型犬-length double coat; waterproof", "中等长度双层被毛；防水"],
  ["中型犬-length, flat or wavy, water-resistant", "中等长度，平直或波浪，防水"],
  ["厚实 double coat — dense undercoat + straight topcoat", "厚实双层被毛——浓密底毛加直硬面毛"],
  ["厚实 double coat; heavy shedder; often blue-eyed or multi-eyed", "厚实双层被毛；大量掉毛；常见蓝眼或多色眼"],
  ["厚实, moderately long, slightly wavy double coat", "厚实中长，略带波浪的双层被毛"],
  ["双层毛 — medium or 长毛", "双层被毛——中等或长毛"],
  ["双层毛 — thick, fluffy outer with dense undercoat", "双层被毛——蓬松厚实面毛加浓密底毛"],
  ["双层毛 — 刚毛 outer, soft undercoat", "双层被毛——刚毛面毛，柔软底毛"],
  ["波浪毛 or curly; low-shedding; often merle or multicolor", "波浪毛或卷毛；低掉毛；常见花斑或多色"],
  ["波浪毛 or curly; silky and very low-shedding", "波浪毛或卷毛；丝滑且极低掉毛"],
  ["波浪毛 or curly; soft and low-shedding", "波浪毛或卷毛；柔软低掉毛"],
  ["波浪毛 or curly; soft, low-shedding", "波浪毛或卷毛；柔软，低掉毛"],
  ["波浪毛 or curly; thick, low-shedding; often tricolor", "波浪毛或卷毛；浓密低掉毛；常见三色"],
  ["波浪毛 or curly; varies by generation", "波浪毛或卷毛；因代数而异"],
  ["波浪毛 to curly; varies by generation", "波浪至卷毛；因代数而异"],
  ["浓密, curly, low-shedding", "浓密卷曲，低掉毛"],
  ["浓密, flat, water-resistant double coat", "浓密平伏，防水双层被毛"],
  ["浓密, water-repellent double coat", "浓密防水双层被毛"],
  ["短毛，光滑, close-fitting", "短毛光滑，贴身"],
  ["短毛，光滑, fine single coat", "短毛光滑，细腻单层被毛"],
  ["短毛，光滑, golden rust — low maintenance", "短毛光滑，金锈色——易于打理"],
  ["短毛，光滑, sleek silver-gray", "短毛光滑，亮泽银灰色"],
  ["短毛，光滑, tight-fitting", "短毛光滑，紧贴皮肤"],
  ["长毛，丝滑, fine — similar to human hair", "长毛丝滑，细腻——类似人类发质"],
  ["长毛，丝滑, straight or slightly wavy; minimal shedding; beautiful floor-length coat possible", "长毛丝滑，直毛或略带波浪；极少掉毛；可蓄至地面的美丽长毛"],
  ["长毛，丝滑, straight; always white", "长毛丝滑，直毛；始终为白色"],
  ["长毛，丝滑, wavy or curly double coat", "长毛丝滑，波浪或卷曲双层被毛"],

  // ── 起源 (Origin) — mostly location cleanup ──────────────────────────────
  ["Aire Valley, Yorkshire, 英国", "英国约克郡艾尔谷"],
  ["Anatolia, 土耳其", "土耳其安纳托利亚"],
  ["Appalachian Mountains, 美国", "美国阿巴拉契亚山脉"],
  ["Argentina", "阿根廷"],
  ["Bavaria, 德国", "德国巴伐利亚"],
  ["Beauce region, 法国", "法国博斯地区"],
  ["Bern region, 瑞士", "瑞士伯尔尼地区"],
  ["Bordeaux region, 法国", "法国波尔多地区"],
  ["Boston, 美国 (1870s)", "美国波士顿（1870年代）"],
  ["Brittany, 法国", "法国布列塔尼"],
  ["Campania region, 意大利 (Naples)", "意大利坎帕尼亚地区（那不勒斯）"],
  ["Cardiganshire, Wales", "威尔士卡迪根郡"],
  ["Cheviot Hills, 英国/苏格兰 border", "英国/苏格兰边境切维奥特丘陵"],
  ["Chihuahua, 墨西哥 (ancient roots)", "墨西哥奇瓦瓦州（古老起源）"],
  ["Congo Basin, Central 非洲", "中非刚果盆地"],
  ["County Wicklow, 爱尔兰", "爱尔兰威克洛郡"],
  ["Czech Republic (捷克斯洛伐克)", "捷克共和国（捷克斯洛伐克）"],
  ["Devon, 英国", "英国德文郡"],
  ["Flanders, 比利时", "比利时法兰德斯"],
  ["Groenendael, 比利时", "比利时格罗嫩达尔"],
  ["Ibiza, Balearic Islands, 西班牙", "西班牙巴利阿里群岛伊维萨岛"],
  ["Israel / Ancient Canaan", "以色列/古迦南"],
  ["Kentucky/Virginia, 美国", "美国肯塔基州/弗吉尼亚州"],
  ["Louisiana, 美国", "美国路易斯安那州"],
  ["Madagascar", "马达加斯加"],
  ["Malines, 比利时", "比利时梅赫伦"],
  ["Malta", "马耳他"],
  ["Mediterranean (ancient — 2,800+ years)", "地中海地区（古老——2800多年历史）"],
  ["Mediterranean / Canary Islands", "地中海/加那利群岛"],
  ["New Hampshire, 美国", "美国新罕布什尔州"],
  ["Newfoundland, 加拿大", "加拿大纽芬兰省"],
  ["North Carolina, 美国 (German ancestry)", "美国北卡罗来纳州（德国血统）"],
  ["North 非洲 (摩洛哥, Algeria, Tunisia)", "北非（摩洛哥、阿尔及利亚、突尼斯）"],
  ["Nova Scotia, 加拿大", "加拿大新斯科舍省"],
  ["Peking (Beijing), 中国", "中国北京"],
  ["Pembrokeshire, Wales", "威尔士彭布罗克郡"],
  ["Piedmont, 意大利", "意大利皮埃蒙特"],
  ["Pyrenean Mountains, 法国/西班牙", "法国/西班牙比利牛斯山脉"],
  ["Pyrenean mountains, 法国", "法国比利牛斯山脉"],
  ["Queensland, 澳大利亚", "澳大利亚昆士兰州"],
  ["Rottweil, 德国", "德国罗特韦尔"],
  ["Scottish-English border (Teviotdale)", "苏格兰-英格兰边境（蒂维奥特代尔）"],
  ["Scottish-English border region", "苏格兰-英格兰边境地区"],
  ["Shetland Islands, 苏格兰", "苏格兰设德兰群岛"],
  ["Sicily, 意大利", "意大利西西里岛"],
  ["South 非洲", "南非"],
  ["Soviet Union / 俄罗斯", "苏联/俄罗斯"],
  ["Staffordshire, 英国", "英国斯塔福德郡"],
  ["Tennessee/Georgia, 美国", "美国田纳西州/乔治亚州"],
  ["Wales", "威尔士"],
  ["Weimar, 德国", "德国魏玛"],
  ["Western 美国 (not 澳大利亚)", "美国西部（非澳大利亚）"],
  ["Yorkshire, 英国 (1800s)", "英国约克郡（1800年代）"],
  ["中国 (ancient)", "中国（古代）"],
  ["中国 (via 非洲)", "中国（经非洲）"],
  ["德国 (Bavaria/Württemberg)", "德国（巴伐利亚/符腾堡）"],
  ["德国 (Leonberg, Baden-Württemberg)", "德国（莱昂贝格，巴登-符腾堡）"],
  ["德国 (despite the name)", "德国（尽管名称如此）"],
  ["德国 (late 1800s)", "德国（19世纪晚期）"],
  ["德国 (refined in 法国)", "德国（在法国改良）"],
  ["德国 / 法国 / 比利时 (debated)", "德国/法国/比利时（存争议）"],
  ["意大利 (Ancient Rome)", "意大利（古罗马时期）"],
  ["意大利 (Bergamo Alps)", "意大利（贝加莫阿尔卑斯山）"],
  ["意大利 (Romagna region)", "意大利（罗马涅地区）"],
  ["意大利 / Mediterranean", "意大利/地中海"],
  ["挪威 (Vaeroy Island)", "挪威（韦勒伊岛）"],
  ["日本 (originally 中国/韩国)", "日本（源自中国/韩国）"],
  ["比利时 (Brussels)", "比利时（布鲁塞尔）"],
  ["法国 (Picardy)", "法国（皮卡第）"],
  ["法国 (Vendée region)", "法国（旺代地区）"],
  ["澳大利亚 (Sydney)", "澳大利亚（悉尼）"],
  ["澳大利亚 (Wally Conron, 1989)", "澳大利亚（沃利·科恩隆，1989年）"],
  ["美国 (American South)", "美国南部"],
  ["美国 (California)", "美国（加利福尼亚州）"],
  ["美国 (German roots)", "美国（德国血统）"],
  ["美国 (South Carolina)", "美国（南卡罗来纳州）"],
  ["美国 (Wisconsin / 良好 Lakes)", "美国（威斯康星州/五大湖地区）"],
  ["美国 (colonial Virginia)", "美国（殖民时期弗吉尼亚）"],
  ["美国 (colonial era)", "美国（殖民时期）"],
  ["苏格兰 (Isle of Skye)", "苏格兰（斯凯岛）"],
  ["苏格兰 and Northern 英国", "苏格兰与英格兰北部"],
  ["英国 (17th century royal courts)", "英国（17世纪皇家宫廷）"],
  ["英国 (Lancashire)", "英国（兰开夏郡）"],
  ["英国 (Manchester)", "英国（曼彻斯特）"],
  ["英国 (Sussex County)", "英国（苏塞克斯郡）"],
  ["英国 (ancient)", "英国（古代）"],
  ["西伯利亚, 俄罗斯 (Chukchi people)", "俄罗斯西伯利亚（楚科奇人）"],
  ["西藏 (Himalayan monasteries)", "西藏（喜马拉雅山寺院）"],
  ["西藏 / Central Asia", "西藏/中亚"],
  ["西藏 / 中国 (imperial courts)", "西藏/中国（皇廷）"],
  ["达尔马提亚 region (克罗地亚)", "克罗地亚达尔马提亚地区"],
  ["马里, Niger, Burkina Faso (West 非洲)", "马里、尼日尔、布基纳法索（西非）"],

  // ── Sidebar AKC ranking ───────────────────────────────────────────────────
  ["第2名最受欢迎 (was #1 for 31年)", "第2名最受欢迎（曾连续31年第一）"],
];

const dir = 'zh/breeds';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

let totalChanges = 0;
let filesChanged = 0;

for (const fn of files) {
  const filePath = path.join(dir, fn);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const [from, to] of translations) {
    if (from === to) continue;
    if (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesChanged++;
    totalChanges++;
  }
}

console.log(`Done. Updated ${filesChanged} files.`);
