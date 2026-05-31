/**
 * Step 1: Translate all common/repeating English phrases in Chinese breed pages.
 * Run: node translate_common.js
 */
const fs = require('fs');
const path = require('path');

// Ordered list of [English, Chinese] pairs — longer/more specific first
const REPLACEMENTS = [
  // ── Cost tab ────────────────────────────────────────────────────────────────
  ['(very risky)', '（风险极高）'],
  ['(risky)', '（有风险）'],
  ['Up to $4,000+', '高达 $4,000+'],
  ['Up to $5,000+', '高达 $5,000+'],
  ['Up to $6,000+', '高达 $6,000+'],
  ['Up to $8,000+', '高达 $8,000+'],
  ['Up to $10,000+', '高达 $10,000+'],

  // Monthly cost in paragraph text
  ['$50–$80 per month', '每月 $50–$80'],
  ['$60–$100 per month', '每月 $60–$100'],
  ['$60–$120 per month', '每月 $60–$120'],
  ['$70–$130 per month', '每月 $70–$130'],
  ['$70–$140 per month', '每月 $70–$140'],
  ['$80–$130 per month', '每月 $80–$130'],
  ['$80–$150 per month', '每月 $80–$150'],
  ['$80–$160 per month', '每月 $80–$160'],
  ['$80–$180 per month', '每月 $80–$180'],
  ['$90–$160 per month', '每月 $90–$160'],
  ['$90–$170 per month', '每月 $90–$170'],
  ['$90–$180 per month', '每月 $90–$180'],
  ['$100–$180 per month', '每月 $100–$180'],
  ['$100–$200 per month', '每月 $100–$200'],
  ['$100–$220 per month', '每月 $100–$220'],
  ['$110–$200 per month', '每月 $110–$200'],
  ['$120–$200 per month', '每月 $120–$200'],
  ['$120–$220 per month', '每月 $120–$220'],
  ['$120–$250 per month', '每月 $120–$250'],
  ['$130–$220 per month', '每月 $130–$220'],
  ['$140–$250 per month', '每月 $140–$250'],
  ['$150–$280 per month', '每月 $150–$280'],
  ['$160–$280 per month', '每月 $160–$280'],
  ['$180–$300 per month', '每月 $180–$300'],
  ['$200–$350 per month', '每月 $200–$350'],
  ['per month', '每月'],

  // Total lifetime in paragraph text
  ['$3,000–$8,000 total', '$3,000–$8,000（终生总费用）'],
  ['$4,000–$9,000 total', '$4,000–$9,000（终生总费用）'],
  ['$4,000–$10,000 total', '$4,000–$10,000（终生总费用）'],
  ['$5,000–$10,000 total', '$5,000–$10,000（终生总费用）'],
  ['$5,000–$12,000 total', '$5,000–$12,000（终生总费用）'],
  ['$6,000–$12,000 total', '$6,000–$12,000（终生总费用）'],
  ['$6,000–$14,000 total', '$6,000–$14,000（终生总费用）'],
  ['$6,000–$15,000 total', '$6,000–$15,000（终生总费用）'],
  ['$7,000–$14,000 total', '$7,000–$14,000（终生总费用）'],
  ['$7,000–$15,000 total', '$7,000–$15,000（终生总费用）'],
  ['$7,000–$16,000 total', '$7,000–$16,000（终生总费用）'],
  ['$8,000–$15,000 total', '$8,000–$15,000（终生总费用）'],
  ['$8,000–$16,000 total', '$8,000–$16,000（终生总费用）'],
  ['$8,000–$17,000 total', '$8,000–$17,000（终生总费用）'],
  ['$8,000–$18,000 total', '$8,000–$18,000（终生总费用）'],
  ['$8,000–$20,000 total', '$8,000–$20,000（终生总费用）'],
  ['$9,000–$18,000 total', '$9,000–$18,000（终生总费用）'],
  ['$9,000–$20,000 total', '$9,000–$20,000（终生总费用）'],
  ['$10,000–$18,000 total', '$10,000–$18,000（终生总费用）'],
  ['$10,000–$20,000 total', '$10,000–$20,000（终生总费用）'],
  ['$10,000–$22,000 total', '$10,000–$22,000（终生总费用）'],
  ['$10,000–$25,000 total', '$10,000–$25,000（终生总费用）'],
  ['$12,000–$25,000 total', '$12,000–$25,000（终生总费用）'],
  ['$12,000–$30,000 total', '$12,000–$30,000（终生总费用）'],
  ['$15,000–$30,000 total', '$15,000–$30,000（终生总费用）'],

  // Cup measurements in diet tab
  ['¼ cup/day', '每天¼杯'],
  ['½ cup/day', '每天½杯'],
  ['¾ cup/day', '每天¾杯'],
  ['1 cup/day', '每天1杯'],
  ['1¼ cups/day', '每天1¼杯'],
  ['1½ cups/day', '每天1½杯'],
  ['1¾ cups/day', '每天1¾杯'],
  ['2 cups/day', '每天2杯'],
  ['2¼ cups/day', '每天2¼杯'],
  ['2½ cups/day', '每天2½杯'],
  ['2¾ cups/day', '每天2¾杯'],
  ['3 cups/day', '每天3杯'],
  ['3½ cups/day', '每天3½杯'],
  ['4 cups/day', '每天4杯'],
  ['4½ cups/day', '每天4½杯'],
  ['5 cups/day', '每天5杯'],
  ['5½ cups/day', '每天5½杯'],
  ['6 cups/day', '每天6杯'],
  ['6½ cups/day', '每天6½杯'],
  ['7 cups/day', '每天7杯'],
  ['8 cups/day', '每天8杯'],
  ['cups/day', '杯/天'],

  // Savings tips (common across many pages)
  ['Buy food in larger bags when possible — significantly cheaper per pound', '尽量购买大包装狗粮——每磅价格更划算'],
  ['Ask your vet about wellness plans — many clinics offer annual packages that bundle routine care', '咨询兽医健康计划——许多诊所提供包含常规护理的年度套餐'],
  ['Ask your vet about wellness plans — many clinics offer annual packages for routine care', '咨询兽医健康计划——许多诊所提供常规护理年度套餐'],
  ['Ask your vet about wellness plans — many clinics offer annual packages', '咨询兽医健康计划——许多诊所提供年度套餐'],
  ['Use a credit card with rewards for vet bills', '使用积分信用卡支付兽医费用'],

  // ── Diet tab ─────────────────────────────────────────────────────────────────
  ['高-quality protein as the first ingredient to support muscle mass', '优质蛋白质作为首要成分，支持肌肉发育'],
  ['高-fat diet supports skin and coat health — salmon oil is ideal', '高脂肪饮食有助于皮肤和被毛健康——三文鱼油是理想选择'],
  ['高-protein diet supports the lean, athletic muscle of this working hound', '高蛋白饮食支持这种工作猎犬的精瘦健硕肌肉'],
  ['高-protein diets support their muscular build', '高蛋白饮食支持其强健的肌肉体型'],
  ['高-protein diets support their muscular, working dog build', '高蛋白饮食支持其强健的工作犬体型'],
  ['高-protein formula supports the lean, athletic muscle of this working hound', '高蛋白配方支持工作猎犬的精瘦健硕肌肉'],

  ['Omega-3 fatty acids for coat and skin health', 'Omega-3脂肪酸，维护毛发和皮肤健康'],
  ['Omega-3 fatty acids for a healthy, shiny coat', 'Omega-3脂肪酸，使被毛健康亮泽'],
  ['Omega-3 fatty acids help maintain the 刚毛 coat quality and reduce skin inflammation', 'Omega-3脂肪酸有助于维护刚毛被毛质量，减少皮肤炎症'],
  ['Omega-3 fatty acids help maintain their thick, healthy coat', 'Omega-3脂肪酸有助于维护其浓密健康的被毛'],
  ['Omega-3 fatty acids support skin, coat, and joint health', 'Omega-3脂肪酸支持皮肤、被毛和关节健康'],

  ['Two meals daily (no free-feeding) to maintain a healthy weight and reduce bloat risk', '每天两餐（避免自由取食），维持健康体重并降低胃扩张风险'],
  ['Feed twice daily to reduce bloat risk', '每天两餐以降低胃扩张风险'],
  ['Feed twice daily and monitor calorie intake seasonally — hunting-season dogs need more than pets on light exercise', '每天两餐，并根据季节监控热量摄入——狩猎期的犬只需要比轻度运动宠物摄入更多热量'],
  ['Feed two meals daily — avoid the single large meal that elevates bloat risk in deep-chested breeds', '每天两餐——避免一次性大量喂食，以降低深胸犬种的胃扩张风险'],
  ['Avoid exercise 1 hour before and after meals', '饭前饭后1小时内避免剧烈运动'],
  ['Never exercise within 1 hour of meals — reduces bloat risk', '饭后1小时内禁止剧烈运动——可有效降低胃扩张风险'],

  ['Glucosamine and chondroitin for joint support — important for hybrid breeds with active lifestyles', '葡萄糖胺和软骨素支持关节健康——对活跃的混血犬种尤为重要'],
  ['Glucosamine and chondroitin for joint support — important for large-breed hybrids prone to hip issues', '葡萄糖胺和软骨素支持关节健康——对易患髋关节问题的大型混血犬尤为重要'],

  ['Afghans can be fussy; try a few protein sources to find their preference', '阿富汗猎犬可能比较挑食；尝试几种蛋白质来源以找到其偏好'],
  ['Avoid obesity — an overweight Airedale puts excess stress on its joints and loses working ability quickly', '避免肥胖——超重的艾尔代尔梗会对关节造成额外压力，并迅速失去工作能力'],
  ['Feed twice daily and monitor calorie intake seasonally', '每天两餐，并根据季节监控热量摄入'],
  ['Fresh water should always be available', '始终保持清洁饮水供应'],
  ['大型犬 breed puppy formula helps control growth rate — critical for joint health in a large, fast-growing breed', '大型犬幼犬配方有助于控制生长速度——对大型快速生长犬种的关节健康至关重要'],
  ['Zinc supplementation may be beneficial — discuss with your vet for appropriate dosage', '补充锌可能有益——请与兽医讨论适当剂量'],
  ['狩猎 dogs on active days need caloric supplementation to match energy expenditure', '狩猎犬在活跃工作日需要额外补充热量以匹配能量消耗'],
  ['Use large breed formulas — caloric density and mineral ratios support proper growth', '使用大型犬配方——热量密度和矿物质比例支持正确发育'],

  // ── Common cost advice paragraphs ───────────────────────────────────────────
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Beagle over their lifetime.', '购买价格只是开始。以下是养一只比格犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Boxer over their lifetime.', '购买价格只是开始。以下是养一只拳师犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Bulldog over their lifetime.', '购买价格只是开始。以下是养一只斗牛犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Dachshund over their lifetime.', '购买价格只是开始。以下是养一只腊肠犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a French Bulldog over their lifetime.', '购买价格只是开始。以下是养一只法国斗牛犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a German Shepherd over their lifetime.', '购买价格只是开始。以下是养一只德国牧羊犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Great Dane over their lifetime.', '购买价格只是开始。以下是养一只大丹犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Poodle over their lifetime.', '购买价格只是开始。以下是养一只贵宾犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Rottweiler over their lifetime.', '购买价格只是开始。以下是养一只罗威纳犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Shih Tzu over their lifetime.', '购买价格只是开始。以下是养一只西施犬终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a Siberian Husky over their lifetime.', '购买价格只是开始。以下是养一只西伯利亚哈士奇终生所需费用的详细分析。'],
  ['The purchase price is just the beginning. Here\'s a realistic breakdown of what it costs to buy and own a 金色 Retriever over their lifetime.', '购买价格只是开始。以下是养一只金毛寻回犬终生所需费用的详细分析。'],

  // Common cost advice tips
  ['Get pet insurance before your 拉布拉多 turns 1 — premiums are lower and pre-existing conditions won\'t be excluded', '在您的拉布拉多犬满1岁前购买宠物保险——保费更低，既往症不会被排除'],
  ['Budget for cancer screening — Goldens have a ~60% cancer rate, the highest of any breed', '预留癌症筛查预算——金毛寻回犬的癌症发病率约为60%，是所有犬种中最高的'],
  ['Budget for hip and elbow dysplasia screening — OFA-certified parents are a must from reputable breeders', '预留髋关节和肘关节发育不良筛查预算——正规繁育者必须提供OFA认证'],
  ['Budget for a good harness and long line — Beagles follow their nose and cannot be fully trusted off-leash in open areas', '预留购买优质胸背带和长牵引绳的预算——比格犬跟着鼻子走，在开阔区域不能完全脱绳'],
  ['Budget for cardiac screening — Boxer Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC) affects a significant portion of the breed and requires regular heart monitoring', '预留心脏筛查预算——拳师犬心律失常性右室心肌病（ARVC）影响相当比例的犬只，需要定期心脏监测'],
  ['First year costs include puppy-proofing your yard — Beagles are expert escape artists and a secure fence is non-negotiable', '第一年费用包括为院子防逃跑改造——比格犬是逃跑高手，安全围栏不可缺少'],
  ['First-year costs are high — obedience training classes are essential, not optional, for German Shepherds', '第一年费用较高——服从训练课程对德国牧羊犬是必需的，而非可选的'],
  ['Obedience training is not optional for Rottweilers — budget $300–$600 for professional group classes, and more for private sessions', '服从训练对罗威纳犬而言不是可选项——为专业团体课程预留$300–$600，私教课费用更高'],
  ['Some homeowners\' insurance policies restrict or exclude Rottweiler ownership — check your policy before buying', '部分房主保险可能限制或排除饲养罗威纳犬——购犬前请检查您的保险条款'],
  ['Rottweilers are a breed where skimping on initial costs (buying from an untested breeder) almost always leads to bigger expenses later. Proper health testing and professional training are investments, not extras.', '罗威纳犬是那种节省初期成本（从未经检测的繁育者购买）几乎必然带来更大后续费用的犬种。适当的健康检测和专业训练是投资，而非额外开销。'],
  ['Hip and elbow OFA testing in parents is essential — avoid breeders who do not health-test their dogs', '亲本的OFA髋关节和肘关节检测至关重要——避免选择不进行健康检测的繁育者'],
  ['Containment is a hidden major cost — Huskies are world-class escape artists and require 6-foot fencing with dig guards buried underground', '围栏是一项隐性重大费用——哈士奇是世界级的逃跑能手，需要6英尺围栏并在地下埋设防挖设施'],
  ['The biggest Husky expense most owners don\'t anticipate is secure fencing. Standard 4-foot fences are useless — Huskies jump, climb, and dig. Budget $1,000–$3,000 for proper containment before you bring one home.', '大多数主人未曾预料到的最大哈士奇费用是安全围栏。标准4英尺围栏形同虚设——哈士奇会跳、会爬、会挖。在迎接它回家前，请为合适的围栏预留$1,000–$3,000。'],
  ['Huskies are relatively healthy for a purebred dog, which keeps veterinary costs lower than many breeds of similar size', '哈士奇相对健康，兽医费用低于许多同体型犬种'],
  ['Overall cost of ownership is moderate — Beagles are relatively healthy and low-maintenance compared to many breeds', '总体养育成本适中——比格犬与许多犬种相比相对健康且易于打理'],
  ['Beagles are one of the most affordable purebred dogs to own. Their biggest costs are often containment (secure fencing, good leashes) and the occasional escape-related vet visit — not routine care.', '比格犬是养育成本最低的纯种犬之一。最大的费用通常是围栏（安全围栏、优质牵引绳）和偶尔因逃跑引发的兽医就诊——而非常规护理。'],

  ['Boxers are prone to certain cancers — pet insurance is particularly valuable given their health profile', '拳师犬易患某些癌症——考虑其健康状况，宠物保险尤为重要'],
  ['Boxers\' biggest financial risk is cardiac disease. Annual heart screenings ($150–$300/年) and pet insurance purchased before any cardiac symptoms appear are the two smartest financial decisions you can make as a Boxer owner.', '拳师犬最大的财务风险是心脏病。在任何心脏症状出现前进行年度心脏筛查（$150–$300/年）并购买宠物保险，是拳师犬主人最明智的两项财务决定。'],
  ['Bulldogs are among the breeds most likely to require surgery in their lifetime — pet insurance is strongly recommended from day one', '斗牛犬是终生最有可能需要手术的犬种之一——从第一天起就强烈建议购买宠物保险'],
  ['Bulldogs are expensive to breed — most litters require artificial insemination and C-section delivery, which breeders pass on in the price', '斗牛犬的繁殖成本高昂——大多数幼犬需要人工授精和剖腹产，繁育者会将此成本计入售价'],
  ['Veterinary costs are significantly above average due to brachycephalic health issues — budget $2,000–$6,000 for potential airway surgery and skin fold maintenance', '由于短头犬健康问题，兽医费用显著高于平均水平——请为潜在的气道手术和皮肤褶皱护理预留$2,000–$6,000'],
  ['Veterinary costs are significantly higher than average due to brachycephalic health issues — budget $2,000–$5,000 for potential airway surgery over their lifetime', '由于短头犬健康问题，兽医费用显著高于平均水平——请为终生潜在的气道手术预留$2,000–$5,000'],
  ['Pet insurance for a Bulldog typically costs $60–$120/月, but can save you $3,000–$8,000 when airway surgery, cherry eye repair, or hip dysplasia treatment is needed. It is one of the most important purchases you\'ll make as a Bulldog owner.', '斗牛犬的宠物保险通常每月$60–$120，但当需要气道手术、樱桃眼修复或髋关节发育不良治疗时，可为您节省$3,000–$8,000。这是您作为斗牛犬主人最重要的购买之一。'],
  ['Pet insurance for a French Bulldog costs $60–$120/月 but can save you $5,000–$10,000 when airway surgery, spinal issues, or eye problems arise. This is not optional — it\'s essential.', '法国斗牛犬的宠物保险每月$60–$120，但当出现气道手术、脊柱问题或眼部问题时，可节省$5,000–$10,000。这不是可选的——而是必不可少的。'],
  ['French Bulldogs are the most expensive common breed to buy — most require artificial insemination and C-section births, which breeders pass on in the price', '法国斗牛犬是最昂贵的常见犬种——大多数需要人工授精和剖腹产，繁育者会将此成本计入售价'],
  ['宠物保险对于高风险犬种几乎是必须的 for Frenchies — health issues are a near certainty, not just a possibility', '对于法斗来说，宠物保险几乎是必须的——健康问题几乎是必然发生的，而非只是可能'],

  ['Pet insurance is especially important for Dachshunds because of IVDD risk. The $3,000–$8,000 spinal surgery cost catches many owners off-guard. Insure before age 1 and before any symptoms appear.', '宠物保险对腊肠犬尤为重要，因为存在椎间盘疾病（IVDD）风险。$3,000–$8,000的脊柱手术费用让许多主人猝不及防。请在1岁前且任何症状出现前投保。'],
  ['The biggest potential expense is spinal surgery (IVDD) — this can cost $3,000–$8,000 and affects up to 25% of Dachshunds', '最大的潜在费用是脊柱手术（IVDD）——费用可达$3,000–$8,000，影响多达25%的腊肠犬'],
  ['Miniature Dachshunds often live 14–17年 — a longer lifespan means overall lifetime costs can exceed estimates', '迷你腊肠犬通常可以活14–17年——更长的寿命意味着终生总费用可能超出预期'],
  ['Longhaired and wirehaired Dachshunds have higher grooming costs than the smooth-coated variety', '长毛和刚毛腊肠犬的美容费用高于短毛型'],

  ['Pet insurance is especially important for Goldens given their high cancer rate (~60%). Buy before age 1 for the best rates and fewest pre-existing condition exclusions.', '考虑到金毛寻回犬较高的癌症发病率（约60%），宠物保险尤为重要。在1岁前购买可获得最低保费和最少的既往症排除条款。'],
  ['Budget for cancer screening — Goldens have a ~60% cancer rate, the highest of any breed', '预留癌症筛查预算——金毛寻回犬的癌症发病率约60%，是所有犬种中最高的'],

  ['Grooming is the biggest ongoing cost for Poodle owners — their coat grows continuously and requires professional grooming every 6–8 weeks', '对贵宾犬主人来说，美容是最大的持续性费用——其被毛持续生长，每6–8周需要专业美容'],
  ['Learning to groom your Poodle at home — even partially — can save $1,200–$2,400 per year. Many Poodle owners learn basic scissoring and clipping. YouTube tutorials for Poodle grooming are an excellent starting point.', '学习在家为贵宾犬美容——即使只是部分自理——每年可节省$1,200–$2,400。许多贵宾犬主人学习基础剪刀和推剪技术。YouTube贵宾犬美容教程是很好的起点。'],
  ['Poodles have an exceptionally long lifespan (10–18年) — lifetime costs are higher than most breeds simply due to longevity', '贵宾犬寿命特别长（10–18年）——仅因寿命长，终生费用就高于大多数犬种'],
  ['Standard Poodles are prone to bloat (GDV) — emergency GDV surgery can cost $3,000–$8,000, making pet insurance essential', '标准贵宾犬易患胃扩张（GDV）——紧急GDV手术可能需要$3,000–$8,000，宠物保险至关重要'],

  ['Great Danes have a tragically short lifespan of 7–10年 — this limits lifetime costs somewhat, but each year is expensive due to their giant size', '大丹犬的寿命遗憾地只有7–10年——这在一定程度上限制了终生费用，但每年因其巨大体型而费用不菲'],
  ['Food costs are among the highest of any breed — a Great Dane eats 8–14 cups of quality kibble per day, which adds up to $100–$180/月 in food alone', '食物费用是所有犬种中最高的之一——大丹犬每天吃8–14杯优质狗粮，仅食物费用每月就高达$100–$180'],
  ['Many Great Dane owners opt for prophylactic gastropexy — a preventive surgery ($400–$800) that tacks the stomach to the body wall so it can\'t twist. Done during spay/neuter, it dramatically reduces bloat risk and is often worth every penny.', '许多大丹犬主人选择预防性胃固定术——一种预防手术（$400–$800），将胃固定在腹壁以防止扭转。在绝育手术时同步进行，可显著降低胃扩张风险，通常物有所值。'],

  ['Emergency bloat surgery (GDV correction) can cost $2,000–$8,000 — pet insurance is strongly recommended and many owners also opt for prophylactic gastropexy', '紧急胃扩张手术（GDV矫正）可能花费$2,000–$8,000——强烈建议购买宠物保险，许多主人也选择预防性胃固定术'],

  ['Shih Tzus have a long lifespan (10–18年), which means lifetime costs can be significant despite their small size', '西施犬寿命较长（10–18年），这意味着尽管体型小，但终生费用可能相当可观'],
  ['Dental care costs are higher than average — Shih Tzus are extremely prone to dental disease and often need professional cleanings under anesthesia annually', '牙科护理费用高于平均水平——西施犬极易患牙科疾病，通常每年需要麻醉下的专业洁牙'],
  ['Grooming is the largest ongoing expense — Shih Tzus in a full coat require professional grooming every 4–6 weeks. Many owners opt for a shorter "puppy cut" to reduce both grooming time and cost', '美容是最大的持续性费用——全毛西施犬每4–6周需要专业美容。许多主人选择较短的"幼犬剪"以减少美容时间和成本'],
  ['Learning to do basic Shih Tzu grooming at home — brushing daily and giving baths every 2–3 weeks — can save $600–$1,200/年 in professional grooming costs. A quality slicker brush and dog-safe conditioner are your best investments.', '学习在家进行基础西施犬美容——每天梳理，每2–3周洗澡——可节省$600–$1,200/年的专业美容费用。优质针梳和犬用护毛素是您最值得的投资。'],

  ['工作犬组-line GSDs cost significantly more than pet-line dogs — know the difference before buying', '工作犬血统的德国牧羊犬比宠物血统贵得多——购买前了解区别'],
  ['A cheaper GSD puppy from health-untested parents may cost thousands in vet bills later. OFA hip and elbow certification from both parents is worth paying extra for upfront.', '来自未经健康检测亲本的低价德牧幼犬可能在后期带来数千美元的兽医费用。双亲的OFA髋关节和肘关节认证值得提前支付额外费用。'],

  ['Adopt from a Berner rescue for $200–$500. Pet insurance is strongly recommended — Bernese Mountain Dogs have one of the highest cancer rates of any breed (nearly 50% die from cancer). Budget for joint care, as hip dysplasia is common.', '从伯恩山犬救助机构领养，费用$200–$500。强烈建议购买宠物保险——伯恩山犬是癌症发病率最高的犬种之一（近50%死于癌症）。请为关节护理预留预算，因髋关节发育不良较为常见。'],
  ['Bernedoodles are among the pricier hybrids — tricolor and "phantom" patterns command premiums. Verify that breeders provide OFA health clearances for both parent breeds. Adopting from a Doodle rescue can save $1,500–$3,000. For Standard Bernedoodles, pet insurance covering bloat and orthopedic issues is strongly recommended.', 'Bernedoodle是较贵的混血犬之一——三色和"幻影"花纹会有价格溢价。确认繁育者为两种亲本犬种提供OFA健康认证。从贵宾混血救助机构领养可节省$1,500–$3,000。对于标准体型Bernedoodle，强烈建议购买涵盖胃扩张和骨科问题的宠物保险。'],

  ['Adopt from a Border Collie rescue for $150–$350. Investing in training and mental enrichment saves money long-term — a bored Border Collie will redecorate your house. Many owners compete in agility or herding trials, which replaces the dog\'s need for work.', '从边牧救助机构领养，费用$150–$350。在训练和心理丰容上的投入可节省长期费用——无聊的边牧会"重新装修"您的房子。许多主人参加敏捷或牧羊比赛，满足狗狗的工作需求。'],
  ['Adopt from a Cane Corso rescue for $200–$500. Professional training is not optional for this breed — budget for it from day one. A preventive gastropexy at the time of spay/neuter (~$500) is a worthwhile investment that can prevent a $5,000+ emergency surgery for bloat.', '从卡内科尔索救助机构领养，费用$200–$500。专业训练对这个犬种不是可选的——从第一天起就应预算。绝育手术时同步进行预防性胃固定术（约$500）是值得的投资，可预防$5,000+的胃扩张紧急手术。'],
  ['Adopt from a Cavalier rescue for $200–$500. Pet insurance is especially worthwhile for this breed — heart disease affects over half of all Cavaliers by age 5. Annual cardiac checkups are a smart investment to catch MVD early.', '从骑士查理王犬救助机构领养，费用$200–$500。宠物保险对这个犬种尤为值得——超过一半的骑士犬在5岁时出现心脏病。年度心脏检查是尽早发现二尖瓣疾病的明智投资。'],
  ['Adopt from a Cavapoo or Doodle rescue for $200–$400. Always buy from breeders who provide annual cardiac clearances for both Cavalier parents — MVD is hereditary and health testing reduces risk significantly. Annual heart checks for your dog starting around age 5 are a worthwhile investment.', '从骑士贵宾或混血救助机构领养，费用$200–$400。始终从为两只骑士犬亲本提供年度心脏认证的繁育者购买——二尖瓣疾病具有遗传性，健康检测可显著降低风险。从约5岁开始的年度心脏检查是值得的投资。'],
  ['Adopt from a Cockapoo rescue for $150–$350. Weekly ear cleaning at home is non-negotiable and costs almost nothing — it prevents expensive vet visits for chronic ear infections. Learn basic home grooming to reduce professional grooming frequency.', '从可卡贵宾救助机构领养，费用$150–$350。每周在家清洁耳道是不可省略的，费用几乎为零——可预防慢性耳道感染带来的昂贵兽医就诊。学习基础家庭美容以减少专业美容频次。'],
  ['Adopt from a Corgi rescue for $150–$400. Pet insurance is highly recommended — spinal problems (IVDD) can require expensive surgery. Keep your Corgi at a lean weight; it\'s the single best thing you can do for their long-term health.', '从柯基救助机构领养，费用$150–$400。强烈建议购买宠物保险——脊柱问题（IVDD）可能需要昂贵的手术。保持柯基的苗条体型是您为其长期健康所能做的最重要的事。'],
  ['Adopt from a Dalmatian rescue for $150–$350 — many are surrendered by owners who underestimated their energy needs. The specialized low-purine diet is non-negotiable and may cost slightly more than standard kibble. Budget for hearing tests and training from day one.', '从斑点犬救助机构领养，费用$150–$350——许多是被低估其运动需求的主人遗弃的。专业低嘌呤饮食是不可省略的，可能比标准狗粮稍贵。从第一天起就为听力测试和训练预留预算。'],
  ['Adopt from a Doberman rescue for $150–$400. A preventive gastropexy (stomach tacking surgery) performed at the time of spay/neuter costs ~$400 and can prevent the $5,000+ emergency of GDV. Annual cardiac screening is non-negotiable for this breed.', '从杜宾犬救助机构领养，费用$150–$400。在绝育手术时进行预防性胃固定术（约$400）可预防$5,000+的GDV紧急情况。年度心脏筛查对这个犬种不可或缺。'],
  ['Adopt from a Doodle rescue for $200–$500. Grooming is the biggest ongoing cost — learn basic home trimming to extend time between professional appointments. Always buy from breeders who health-test both parents for hip dysplasia and eye conditions.', '从贵宾混血救助机构领养，费用$200–$500。美容是最大的持续性费用——学习基础家庭修剪以延长专业美容间隔。始终从为双亲进行髋关节发育不良和眼部疾病检测的繁育者购买。'],
  ['Adopt from a Doodle rescue for $200–$500. Grooming is the biggest ongoing cost — learn basic trimming at home to stretch professional appointments to every 8–10 weeks. Buying from an OFA health-tested breeder reduces long-term vet costs significantly.', '从贵宾混血救助机构领养，费用$200–$500。美容是最大的持续性费用——学习在家基础修剪，将专业美容间隔延长至每8–10周。从OFA健康检测繁育者购买可显著降低长期兽医费用。'],
  ['Adopt from a GSP rescue for $150–$400. Investing in training early saves money long-term — a bored GSP can cause significant property damage. Budget for dog sports or regular off-leash exercise opportunities, which replace expensive destructive behavior.', '从德国短毛指示犬救助机构领养，费用$150–$400。早期投入训练可节省长期费用——无聊的GSP可能造成严重财产损失。为犬类运动或定期脱绳运动预留预算，以替代昂贵的破坏性行为。'],
  ['Adopt from a Havanese rescue for $150–$350. Their food cost is low and they\'re generally healthy. The main ongoing cost is grooming — a short "puppy cut" maintained at home between professional appointments can cut grooming bills significantly. Buy from OFA health-tested breeders to minimize expensive eye and joint issues later.', '从哈瓦那犬救助机构领养，费用$150–$350。食物费用低且通常健康。主要持续费用是美容——在专业美容之间在家维护短"幼犬剪"可显著减少美容账单。从OFA健康检测繁育者购买，以减少后期昂贵的眼部和关节问题。'],
  ['Adopt from a Maltese rescue for $100–$300. Their food costs are among the lowest of any breed. The biggest ongoing expenses are grooming and dental care — brushing teeth daily and learning basic home grooming can significantly cut annual costs.', '从马耳他犬救助机构领养，费用$100–$300。食物费用是所有犬种中最低的之一。最大的持续费用是美容和牙科护理——每天刷牙和学习基础家庭美容可显著降低年度费用。'],
  ['Adopt from a Maltipoo or Doodle rescue for $100–$300. Food costs are minimal for this tiny breed. The biggest ongoing expenses are grooming and dental care. Brush teeth daily from puppyhood — it\'s the single most impactful thing you can do for their long-term health and vet bill reduction.', '从马耳他贵宾或混血救助机构领养，费用$100–$300。这种小型犬种的食物费用极低。最大的持续费用是美容和牙科护理。从幼犬期起每天刷牙——这是您为其长期健康和降低兽医账单所能做的最有效的事。'],
  ['Adopt from a Pom rescue for $100–$300. Their food cost is among the lowest of any breed. The biggest ongoing expenses are grooming and dental care. Learn basic home brushing techniques to stretch professional grooming appointments, and brush teeth daily to avoid costly dental procedures.', '从博美犬救助机构领养，费用$100–$300。食物费用是所有犬种中最低的之一。最大的持续费用是美容和牙科护理。学习基础家庭梳理技巧以延长专业美容间隔，并每天刷牙以避免昂贵的牙科手术。'],
  ['Adopt from a Schnauzer rescue for $100–$300. Their food cost is low, but grooming is a consistent expense — learning to do basic trims at home between professional visits saves significantly. Feed a strict low-fat diet from day one to avoid costly pancreatitis emergencies.', '从雪纳瑞救助机构领养，费用$100–$300。食物费用低，但美容是持续性开销——学习在专业美容间隔期间在家进行基础修剪可显著节省。从第一天起坚持低脂饮食，以避免昂贵的胰腺炎紧急情况。'],
  ['Adopt from a breed rescue for $150–$400. The MDR1 genetic test is a one-time investment that can prevent dangerous drug reactions. Budget for training — a bored, untrained Aussie can be very destructive.', '从犬种救助机构领养，费用$150–$400。MDR1基因检测是一次性投入，可预防危险的药物反应。为训练预留预算——无聊且未受训练的澳牧可能造成严重破坏。'],
  ['Adopt from a rescue for $100–$400. Use at-home grooming between professional appointments to cut costs. Pet insurance (~$30/mo) is worthwhile given Yorkies\' tendency toward dental and tracheal issues.', '从救助机构领养，费用$100–$400。在专业美容间隔期间在家美容以降低费用。考虑约克夏梗的牙科和气管问题倾向，宠物保险（约$30/月）是值得的。'],
  ['Adopt from a rescue for $50–$200 — Chihuahuas are the most surrendered breed in the US. Their food cost is minimal, but dental care is their biggest health expense. Brush their teeth daily and budget for annual professional cleanings.', '从救助机构领养，费用$50–$200——吉娃娃是美国遗弃率最高的犬种。食物费用极低，但牙科护理是最大的健康支出。每天刷牙并为年度专业洁牙预留预算。'],
  ['Adopt from a 波士顿梗 rescue for $100–$350. Pet insurance is highly recommended — BOAS surgery and eye treatments can be expensive. Buy from a reputable breeder who health-tests for elongated soft palate and stenotic nares; well-bred Bostons have far fewer breathing issues than poorly bred ones.', '从波士顿梗救助机构领养，费用$100–$350。强烈建议购买宠物保险——BOAS手术和眼部治疗费用不菲。从检测软腭延长和鼻孔狭窄的正规繁育者购买；品质好的波士顿梗呼吸问题远少于劣质繁育的犬只。'],

  ['Mini Schnoodles are the most affordable size; 超大型犬 Schnoodles command higher prices and incur higher food and grooming costs. Adopt from a Schnauzer or Poodle rescue for $150–$400. Feed a consistently low-fat diet — pancreatitis episodes are painful and expensive. Budget for regular professional grooming as the biggest ongoing cost.', '迷你雪贵是最实惠的尺寸；超大型雪贵售价更高，食物和美容费用也更高。从雪纳瑞或贵宾犬救助机构领养，费用$150–$400。坚持低脂饮食——胰腺炎发作既痛苦又昂贵。将定期专业美容作为最大的持续性费用纳入预算。'],
  ['Pomsky pricing is highly variable based on size, eye color, and coat pattern — blue eyes and smaller size command premiums of $1,000+. Be wary of unethical breeders selling "mini Huskies" that are actually pure Pomskies. Ask for genetic testing documentation. Grooming is the major ongoing cost; invest in a good de-shedding brush to extend time between professional visits.', '博美哈士奇混血的定价因体型、眼睛颜色和被毛花纹而有很大差异——蓝眼睛和较小体型会有$1,000+的溢价。警惕不道德的繁育者将纯博美哈士奇混血冒充"迷你哈士奇"销售。要求提供基因检测文件。美容是主要的持续性费用；投资一把好的去毛梳以延长专业就诊间隔。'],
  ['花斑 and blue-eyed Aussiedoodles command price premiums — focus on temperament and health testing over color. Always ask breeders about MDR1 gene testing — dogs with two copies of this mutation can have severe reactions to common medications. Agility and obedience classes are almost mandatory for this breed and provide essential mental exercise.', '花斑和蓝眼睛澳式贵宾犬有价格溢价——应优先考虑气质和健康检测而非颜色。始终向繁育者询问MDR1基因检测——有两个拷贝该突变的犬只对常见药物可能有严重反应。敏捷和服从课程对这个犬种几乎是必须的，并提供必要的心理运动。'],
  ['Shorkies are moderately priced hybrids. Look for reputable breeders who health-test both parents. Grooming and dental care are the primary ongoing costs. Investing in a high-quality slicker brush and learning basic home grooming techniques can significantly reduce professional grooming frequency and cost over your Shorkie\'s lifetime.', 'Shorkie是中等价位的混血犬。寻找对双亲进行健康检测的正规繁育者。美容和牙科护理是主要的持续性费用。投资高质量针梳并学习基础家庭美容技术，可在Shorkie的一生中显著降低专业美容频次和费用。'],
  ['Yorkipoos are among the more affordable hybrid toy dogs. Adopt from a Yorkie or Poodle rescue for $100–$300. The biggest ongoing expenses are grooming and dental care. Daily tooth brushing from puppyhood can prevent the expensive veterinary dental cleanings that toy breeds so frequently need.', 'Yorkipoo是较为实惠的混血玩具犬之一。从约克夏或贵宾犬救助机构领养，费用$100–$300。最大的持续费用是美容和牙科护理。从幼犬期起每天刷牙，可预防玩具犬种频繁需要的昂贵兽医牙科洁牙。'],

  // Generic cost notes
  ['Grooming costs are significant; otherwise a healthy breed with manageable expenses.', '美容费用较高；除此之外是一种健康且维护成本可控的犬种。'],
  ['Grooming is the biggest ongoing cost; invest in a good de-shedding brush to extend time between professional visits.', '美容是最大的持续性费用；投资一把好的去毛梳以延长专业就诊间隔。'],
  ['Grooming costs are higher than average due to their heavy, shedding double coat', '由于其浓密的双层被毛大量掉毛，美容费用高于平均水平'],
  ['Grooming costs spike twice a year during heavy shedding season — professional de-shedding treatments are helpful but not cheap', '每年两次换毛季期间美容费用会激增——专业去毛护理有帮助但价格不菲'],
  ['Grooming costs are very low — their short, low-maintenance coat requires almost no professional grooming', '美容费用非常低——其短而易于维护的被毛几乎不需要专业美容'],
  ['Grooming costs are significant; otherwise a healthy breed with moderate ownership costs.', '美容费用较高；除此之外是一种维护成本适中的健康犬种。'],
  ['Grooming is a significant commitment; otherwise a healthy breed with moderate ownership costs.', '美容需要较大投入；除此之外是一种维护成本适中的健康犬种。'],
  ['Grooming is the largest ongoing expense; otherwise a healthy breed with moderate ownership costs.', '美容是最大的持续性费用；除此之外是一种维护成本适中的健康犬种。'],
  ['Regular professional grooming is essential; otherwise a healthy breed with typical terrier care costs.', '定期专业美容至关重要；除此之外是一种具有典型梗犬护理成本的健康犬种。'],
  ['Moderate ownership costs; hand-stripping adds grooming expense but can be learned by dedicated owners.', '养育成本适中；手拔毛会增加美容费用，但有心的主人可以学习。'],
  ['Hand-stripping costs add up; otherwise a moderately affordable breed to maintain.', '手拔毛费用可观；除此之外是一种养育成本适中的犬种。'],
  ['Cord maintenance is an extensive ongoing commitment — not for the impatient. Bathing and drying can take 24–48 hours.', '绳状被毛的维护是长期持续的承诺——不适合缺乏耐心的人。洗澡和烘干可能需要24–48小时。'],
  ['Copper toxicosis testing adds to vet costs; grooming requires a skilled groomer familiar with the breed\'s unique trim.', '铜中毒检测会增加兽医费用；美容需要熟悉该犬种独特修剪方式的专业美容师。'],
  ['Unique coat care is the primary grooming challenge; find a groomer experienced with corded/curly breeds.', '独特的被毛护理是主要的美容挑战；寻找有经验处理绳状/卷毛犬种的美容师。'],
  ['CLAD and PPC genetic testing adds to initial costs; otherwise a healthy and active breed.', 'CLAD和PPC基因检测会增加初始费用；除此之外是一种健康活跃的犬种。'],
  ['Fairly healthy breed with manageable grooming needs; main costs are food and exercise enrichment.', '相对健康、美容需求可控的犬种；主要费用是食物和运动丰容。'],
  ['Generally affordable; diabetes management costs can add up if the condition develops.', '总体实惠；如果发展为糖尿病，管理费用可能会累积。'],
  ['Healthy breed overall; main concerns are cardiac screening and safe fenced running space.', '整体健康的犬种；主要关注点是心脏筛查和安全的有围栏跑步空间。'],
  ['Higher food costs for giant breed; cardiac and cancer screening add to vet expenses; shorter lifespan is a factor.', '巨型犬食物费用更高；心脏和癌症筛查增加兽医费用；寿命较短是一个因素。'],
  ['Low grooming costs for smooth coat; main expenses are enrichment activities and dog sports equipment.', '光滑被毛美容费用低；主要费用是丰容活动和犬类运动设备。'],
  ['Low grooming costs offset by need for enrichment activities and cardiac health monitoring.', '低美容费用被丰容活动和心脏健康监测的需求所抵消。'],
  ['Rare breed commands higher puppy prices; grooming costs for curly coat maintenance are significant.', '稀有犬种幼犬价格更高；卷毛维护的美容费用较高。'],
  ['Rare breed with limited breeders; expect higher initial cost and potential wait list; otherwise moderate ongoing costs.', '繁育者有限的稀有犬种；预期初始费用较高且可能需要等待；其余持续费用适中。'],
  ['Relatively affordable; main costs are exercise enrichment and occasional vet visits for terrier-typical injuries.', '相对实惠；主要费用是运动丰容和偶尔因梗犬典型伤病的兽医就诊。'],
  ['Relatively healthy and affordable; hand-stripping is needed for show coat, which adds grooming expense.', '相对健康且实惠；展示被毛需要手拔毛，会增加美容费用。'],
  ['Relatively healthy breed; grooming costs during heavy shedding seasons are the main expense.', '相对健康的犬种；换毛季期间的美容费用是主要开销。'],
  ['Relatively low maintenance costs; grooming and occasional eye check-ups are the primary expenses.', '维护成本相对较低；美容和偶尔的眼部检查是主要费用。'],
  ['Many Greyhounds are rescued for free or low cost from racing programs; anesthesia sensitivity means extra care with vet procedures.', '许多灵缇犬可从赛犬项目中免费或低价领养；麻醉敏感性意味着兽医操作时需要额外谨慎。'],
  ['Very low food costs, but fragility means potential emergency vet visits; dental care is a recurring cost.', '食物费用极低，但体质脆弱意味着可能的紧急兽医就诊；牙科护理是持续性费用。'],
  ['Grooming is the largest ongoing expense — Shih Tzus in a full coat require professional grooming every 4–6 weeks. Many owners opt for a shorter "puppy cut" to reduce both grooming time and cost', '美容是最大的持续性费用——全毛西施犬每4–6周需要专业美容。许多主人选择较短的"幼犬剪"以减少美容时间和费用'],
  ['$1,000–$2,500 (or free from adoption)', '$1,000–$2,500（或从救助机构免费领养）'],
];

const zhDir = path.join(__dirname, 'zh', 'breeds');
const files = fs.readdirSync(zhDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let totalReplacements = 0;
let filesChanged = 0;

for (const file of files) {
  const filePath = path.join(zhDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  for (const [en, zh] of REPLACEMENTS) {
    if (html.includes(en)) {
      html = html.split(en).join(zh);
      totalReplacements++;
    }
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    filesChanged++;
  }
}

console.log(`Files changed: ${filesChanged}, Total replacement instances: ${totalReplacements}`);
