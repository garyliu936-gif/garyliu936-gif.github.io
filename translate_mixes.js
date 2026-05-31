/**
 * Step 3: Translate remaining English in the mixes/generations tab.
 * Run: node translate_mixes.js
 */
const fs = require('fs');
const path = require('path');

const REPLACEMENTS = [
  // ── Common F1 description tail (most frequent pattern) ──────────────────
  ['. The first-generation cross — the most common type and the widest range of trait variation.', '。第一代杂交犬——最常见的类型，性状变异范围最广。'],

  // ── Breed-specific variant descriptions ─────────────────────────────────
  ['50% Border Collie, 50% Poodle. High intelligence, variable coat.', '50%边境牧羊犬，50%贵宾犬。高度智慧，被毛变异较大。'],
  ['50% Boxer, 50% Poodle. Coat ranges from wavy to lightly curly.', '50%拳师犬，50%贵宾犬。被毛从波浪状到轻度卷曲不等。'],
  ['50% Cavalier, 50% Bichon. Classic wavy coat, gentle personality.', '50%骑士查理王猎鸟犬，50%卷毛比雄犬。经典波浪毛，温柔性格。'],
  ['50% Dachshund, 50% Poodle. Body length and coat vary widely.', '50%腊肠犬，50%贵宾犬。体长和被毛变异较大。'],
  ['50% Havanese, 50% Poodle. Wavy coat, sociable personality.', '50%哈瓦那犬，50%贵宾犬。波浪毛，爱社交的性格。'],
  ['50% Husky, 50% Poodle. Wide variation in coat and personality.', '50%哈士奇，50%贵宾犬。被毛和性格变异范围广。'],
  ['50% Maltese, 50% Bichon. White to cream coat, very gentle.', '50%马耳他犬，50%卷毛比雄犬。白色至奶油色被毛，非常温顺。'],
  ['50% OES, 50% Poodle. Classic black-and-white look, variable coat.', '50%古英格兰牧羊犬，50%贵宾犬。经典黑白外观，被毛变异较大。'],
  ['50% Rottweiler, 50% Lab. Appearance and temperament vary significantly.', '50%罗威纳犬，50%拉布拉多犬。外观和性格差异显著。'],
  ['50% Saint Bernard, 50% Standard Poodle. Size varies widely.', '50%圣伯纳犬，50%标准贵宾犬。体型变异较大。'],
  ['50% Springer, 50% Poodle. Wavy to curly coat.', '50%史宾格犬，50%贵宾犬。被毛从波浪状到卷曲不等。'],
  ['50% Westie, 50% Poodle. Coat varies from wavy to curly.', '50%西高地白梗，50%贵宾犬。被毛从波浪状到卷曲不等。'],
  ['50/50 cross — coat length and color vary significantly.', '50/50杂交——被毛长度和颜色变异显著。'],
  ['50/50 cross — coat varies from wavy Shih Tzu to curly Poodle.', '50/50杂交——被毛从西施犬的波浪状到贵宾犬的卷曲不等。'],
  ['75% Golden, 25% Lab — longer, wavier coat, more Retriever expression.', '75%金毛，25%拉布拉多——被毛更长更有波浪感，更多寻回犬气质。'],
  ['75% Lab, 25% Husky — calmer, more trainable, may have blue eyes.', '75%拉布拉多，25%哈士奇——更平静、更易训练，可能有蓝眼睛。'],
  ['75% Poodle genetics — the lowest-shedding Goldendoodle generation. Ideal for allergy sufferers who love the Doodle look.', '75%贵宾犬基因——掉毛量最少的黄金贵宾犬代。适合喜欢贵宾混血外观的过敏人群。'],
  ['Same cross — the name varies by breeder.', '相同杂交组合——名称因繁育者而异。'],
  ['10–90磅 (varies)', '10–90磅（变异较大）'],
  ['25–80磅 (varies)', '25–80磅（变异较大）'],
  ['5–30磅 (varies)', '5–30磅（变异较大）'],

  // ── Info-box values in mixes tab ─────────────────────────────────────────
  ['Mixed coat', '混合被毛'],
  ['Lower than F1', '低于F1代'],
  ['Variable', '因个体而异'],
  ['Exceptional', '出色'],
  ['Extreme', '极高'],
  ['Great', '良好'],
  ['Thrives', '非常适合'],
  ['Natural', '自然'],
  ['Minimal', '极少'],
  ['Outstanding', '优秀'],
  ['Mini Husky', '迷你哈士奇'],
  ['Teddy Bear Dog', '泰迪熊犬'],
  ['Longer than purebred Bernese', '比纯种伯恩山犬更长'],
  ['Longer — better breathing', '更长——有助于呼吸'],
  ['Often blue or bi-colored', '常见蓝色或双色'],
  ['低 to minimal', '低至极少'],
  ['低 to none', '低至无'],
  ['低过敏 guide dog', '低过敏导盲犬'],
  ['Active, experienced owners', '有经验的活跃主人'],
  ['Experienced owners', '有经验的主人'],
  ['Very experienced, active owners', '经验丰富的活跃主人'],
  ['Families, service work', '家庭，服务工作'],
  ['Seniors, apartments', '老年人，公寓生活'],
  ['Singles or couples', '单身或情侣'],
  ['Singles, apartments', '单身，公寓生活'],
  ['Very large home required', '需要非常大的居住空间'],
  ['Balanced, loyal', '平衡，忠诚'],
  ['Bold, devoted', '大胆，忠诚'],
  ['Bold, loyal', '大胆，忠诚'],
  ['Calm, loyal', '平静，忠诚'],
  ['Friendly, gentle', '友善，温柔'],
  ['Gentle, calm', '温柔，平静'],
  ['Gentle, loyal', '温柔，忠诚'],
  ['Sweet, social', '亲切，爱社交'],
  ['Very gentle', '非常温柔'],
  ['是 — Queen Elizabeth II', '是——英国女王伊丽莎白二世的爱犬'],
  ['是, great', '是，非常适合'],
  ['是, with supervision', '是，需要监督'],
  ['稍有改善 than purebred', '比纯种犬略有改善'],
  ['良好 with socialization', '社会化后良好'],
  ['良好 – Great', '良好至优秀'],
  ['丝滑, low-shedding', '丝滑，低掉毛量'],

  // ── Descriptive blurbs ───────────────────────────────────────────────────
  ['Friendly, athletic retriever blend', '友善、运动型的寻回犬混血'],
  ['Social, low-shed family companion', '爱社交、低掉毛的家庭伴侣犬'],
  ['Double shaggy herder with gentle soul', '双层蓬松被毛、温柔心灵的牧羊混血'],
  ['Highly intelligent herding powerhouse', '高度智慧的牧羊型强力混血'],
  ['Fluffy, gentle, and social family dog', '蓬松、温柔、爱社交的家庭犬'],
  ['Extreme high-drive working dog blend', '超高工作驱动力的工作犬混血'],
  ['Athletic, devoted, and agile companion', '运动、忠诚、敏捷的伴侣犬'],
  ['Affectionate, fluffy lapdog blend', '亲热、蓬松的膝上犬混血'],
  ['Tiny powerhouse with a bold personality', '体型小却性格大胆的小型强力犬'],
  ['Tiny, bold, and devoted micro-companion', '娇小、大胆、忠诚的微型伴侣犬'],
  ['Sleek and powerful hunting companion', '流线型、强壮的狩猎伴侣犬'],

  // ── Sidebar mixed content ────────────────────────────────────────────────
  ['The Bernedoodle 是a designer crossbreed, not AKC-recognized. Individual dogs vary于a', '伯恩山贵宾犬是一种设计师混血犬，未获AKC认可。个体差异'],
];

const zhDir = path.join(__dirname, 'zh', 'breeds');
const files = fs.readdirSync(zhDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let total = 0, changed = 0;
for (const file of files) {
  const fp = path.join(zhDir, file);
  let h = fs.readFileSync(fp, 'utf8');
  const orig = h;
  for (const [en, zh] of REPLACEMENTS) {
    if (h.includes(en)) { h = h.split(en).join(zh); total++; }
  }
  if (h !== orig) { fs.writeFileSync(fp, h, 'utf8'); changed++; }
}
console.log('Files changed:', changed, 'Replacements:', total);
