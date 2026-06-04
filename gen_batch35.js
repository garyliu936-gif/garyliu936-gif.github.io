// Batch 35: Upgrade 30 AKC breeds — add AKC Rank to sidebar + mix breeds tab
// Run with: node gen_batch35.js

const fs = require('fs');
const path = require('path');

const BREEDS_DIR = path.join(__dirname, 'breeds');
const ZH_DIR = path.join(__dirname, 'zh', 'breeds');

// 30 AKC-recognized breeds with their AKC 2025 popularity rank + group + mix data
const breeds = [
  {
    file: 'pembroke-welsh-corgi.html',
    zhFile: 'pembroke-welsh-corgi.html',
    akcRank: '#11 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Horgi', file: 'horgi.html', parents: 'Corgi + Siberian Husky', desc: 'Compact and energetic with the Husky\'s striking markings and the Corgi\'s playful personality — a fan favorite.' },
      { name: 'Corgidor', file: 'corgidor.html', parents: 'Corgi + Labrador Retriever', desc: 'Friendly and loyal family dog that blends the Lab\'s easygoing nature with the Corgi\'s herding alertness.' },
      { name: 'Corgipoo', file: 'corgipoo.html', parents: 'Corgi + Poodle', desc: 'Smart, low-shedding, and spirited — combines the Poodle\'s intelligence with the Corgi\'s lively character.' },
    ],
    zhMixTitle: '热门彭布罗克柯基犬混血品种',
    zhMixIntro: '柯基有时会与其他品种杂交，创造出结合双亲优点的独特伴侣犬。',
    zhMixes: [
      { name: 'Horgi', parents: '柯基 + 西伯利亚哈士奇', desc: '紧凑活力，兼具哈士奇的华丽外貌与柯基的活泼个性——深受爱犬人士喜爱。' },
      { name: 'Corgidor', parents: '柯基 + 拉布拉多', desc: '友善忠诚的家庭犬，融合了拉布拉多的随和与柯基的牧羊警觉性。' },
      { name: 'Corgipoo', parents: '柯基 + 贵宾犬', desc: '聪明、低脱毛量且充满活力——兼具贵宾的智慧与柯基的活力性格。' },
    ],
  },
  {
    file: 'cavalier-king-charles-spaniel.html',
    zhFile: 'cavalier-king-charles-spaniel.html',
    akcRank: '#14 most popular (2025)',
    group: 'AKC Toy Group',
    mixes: [
      { name: 'Cavapoo', file: 'cavapoo.html', parents: 'Cavalier + Poodle', desc: 'One of the most popular designer dogs — gentle, low-shedding, and irresistibly affectionate.' },
      { name: 'Cavachon', file: 'cavachon.html', parents: 'Cavalier + Bichon Frisé', desc: 'Sweet and sociable, this soft-coated mix is ideal for families and apartment living alike.' },
      { name: 'Cavapoochon', file: 'cavapoochon.html', parents: 'Cavalier + Poodle + Bichon Frisé', desc: 'Triple-cross that combines the best traits of three beloved companion breeds — gentle, smart, and low-shed.' },
    ],
    zhMixTitle: '热门查理王骑士猎犬混血品种',
    zhMixIntro: '查理王骑士猎犬常与其他品种杂交，打造温柔、低脱毛量的伴侣犬。',
    zhMixes: [
      { name: 'Cavapoo（卡瓦普）', parents: '查理王 + 贵宾犬', desc: '最受欢迎的设计犬之一——温柔、低脱毛，极具亲和力。' },
      { name: 'Cavachon（卡瓦雄）', parents: '查理王 + 比雄犬', desc: '温馨社交，毛发柔软，是家庭及公寓生活的理想选择。' },
      { name: 'Cavapoochon', parents: '查理王 + 贵宾 + 比雄', desc: '三重杂交融合三个著名伴侣犬品种优点——温柔聪明、低脱毛。' },
    ],
  },
  {
    file: 'dobermann.html',
    zhFile: 'dobermann.html',
    akcRank: '#16 most popular (2025)',
    group: 'AKC Working Group',
    mixes: [
      { name: 'Doberdoodle', file: 'doberdoodle.html', parents: 'Doberman + Poodle', desc: 'Athletic and smart — combines the Doberman\'s loyalty with the Poodle\'s intelligence and low-shedding coat.' },
      { name: 'Doberman Shepherd', file: 'corman-shepherd.html', parents: 'Doberman + German Shepherd', desc: 'Powerful, protective, and driven — a working dog blend suited for active, experienced owners.' },
      { name: 'Rottweiler', file: 'rottweiler.html', parents: 'Close relative — guard breeds', desc: 'A fellow Molossoid guardian sharing the Doberman\'s courage, loyalty, and natural protective instincts.' },
    ],
    zhMixTitle: '热门杜宾犬混血品种',
    zhMixIntro: '杜宾犬有时与其他品种杂交，创造出结合双亲优点的独特工作或伴侣犬。',
    zhMixes: [
      { name: 'Doberdoodle（杜宾贵宾）', parents: '杜宾 + 贵宾犬', desc: '运动而聪明——融合杜宾的忠诚与贵宾的智慧及低脱毛特性。' },
      { name: '杜宾牧羊犬', parents: '杜宾 + 德牧', desc: '强壮、保护性强——适合有经验的活跃主人的工作犬组合。' },
      { name: '罗威纳', parents: '近亲品种——护卫犬', desc: '同为莫洛斯护卫犬，与杜宾共享勇气、忠诚和天然保护本能。' },
    ],
  },
  {
    file: 'brittany-spaniel.html',
    zhFile: 'brittany-spaniel.html',
    akcRank: '#26 most popular (2025)',
    group: 'AKC Sporting Group',
    mixes: [
      { name: 'Borador', file: 'borador.html', parents: 'Border Collie + Labrador', desc: 'High-energy working mix — an active companion that thrives with outdoor jobs, similar energy to the Brittany.' },
      { name: 'Springerdoodle', file: 'springerdoodle.html', parents: 'Springer Spaniel + Poodle', desc: 'Sporting-dog intelligence meets the Poodle\'s low-shed coat — a great active family companion.' },
      { name: 'Irish Doodle', file: 'irish-doodle.html', parents: 'Irish Setter + Poodle', desc: 'Athletic, friendly, and beautiful — shares the Brittany\'s sporting spirit with a wavy, low-shedding coat.' },
    ],
    zhMixTitle: '热门布列塔尼猎犬混血品种',
    zhMixIntro: '布列塔尼猎犬有时与其他品种杂交，创造出充满活力的运动型伴侣犬。',
    zhMixes: [
      { name: 'Borador', parents: '边牧 + 拉布拉多', desc: '高能量工作犬组合——活跃伴侣，适合户外工作，与布列塔尼能量相近。' },
      { name: 'Springerdoodle', parents: '史宾格犬 + 贵宾', desc: '运动犬智慧加贵宾低脱毛——出色的活跃家庭伴侣。' },
      { name: 'Irish Doodle', parents: '爱尔兰雪达 + 贵宾', desc: '运动、友善、美丽——兼具布列塔尼的运动精神与波浪低脱毛外套。' },
    ],
  },
  {
    file: 'bichon-frise.html',
    zhFile: 'bichon-frise.html',
    akcRank: '#30 most popular (2025)',
    group: 'AKC Non-Sporting Group',
    mixes: [
      { name: 'Poochon', file: 'poochon.html', parents: 'Bichon Frisé + Poodle', desc: 'Fluffy, smart, and low-shedding — a top choice for allergy-sensitive families who want a cuddly companion.' },
      { name: 'Cavachon', file: 'cavachon.html', parents: 'Cavalier + Bichon Frisé', desc: 'Sweet and gentle, this popular mix combines two of the most affectionate companion breeds.' },
      { name: 'Maltichon', file: 'maltichon.html', parents: 'Maltese + Bichon Frisé', desc: 'Tiny, fluffy, and devoted — a portable companion perfect for those who want a small, low-shedding lapdog.' },
    ],
    zhMixTitle: '热门比熊犬混血品种',
    zhMixIntro: '比熊犬常与其他品种杂交，打造低脱毛、温柔亲人的伴侣犬。',
    zhMixes: [
      { name: 'Poochon（比贵）', parents: '比熊 + 贵宾犬', desc: '蓬松、聪明、低脱毛——对过敏家庭极为友好的抱抱伴侣。' },
      { name: 'Cavachon（卡瓦雄）', parents: '查理王 + 比熊', desc: '温柔可人，融合两种最深情伴侣犬品种的优点。' },
      { name: 'Maltichon（马尔雄）', parents: '马耳他 + 比熊', desc: '娇小蓬松、忠诚温顺——想要低脱毛小型膝上犬的完美选择。' },
    ],
  },
  {
    file: 'rough-collie.html',
    zhFile: 'rough-collie.html',
    akcRank: '#39 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Gollie', file: 'gollie.html', parents: 'Golden Retriever + Collie', desc: 'Gentle, intelligent, and beautiful — combines two of the most beloved family dogs into one devoted companion.' },
      { name: 'Bordoodle', file: 'bordoodle.html', parents: 'Border Collie + Poodle', desc: 'Herding-dog intelligence meets the Poodle\'s trainability — closely related in spirit to the Rough Collie.' },
      { name: 'Sheepadoodle', file: 'sheepadoodle.html', parents: 'Old English Sheepdog + Poodle', desc: 'Fluffy, affectionate, and smart — a herding mix that shares the Rough Collie\'s gentle family temperament.' },
    ],
    zhMixTitle: '热门粗毛牧羊犬混血品种',
    zhMixIntro: '粗毛牧羊犬有时与其他品种杂交，继承其温柔智慧与家庭亲和力。',
    zhMixes: [
      { name: 'Gollie（金色牧羊）', parents: '金毛 + 牧羊犬', desc: '温柔、聪明、美丽——两种最受爱戴的家庭犬合而为一。' },
      { name: 'Bordoodle', parents: '边牧 + 贵宾', desc: '牧羊犬智慧加贵宾可训性——精神上与粗毛牧羊犬一脉相承。' },
      { name: 'Sheepadoodle', parents: '古代英国牧羊犬 + 贵宾', desc: '蓬松、深情、聪明——共享粗毛牧羊犬温柔家庭气质的牧羊混血。' },
    ],
  },
  {
    file: 'chinese-crested-dog.html',
    zhFile: 'chinese-crested-dog.html',
    akcRank: '#78 most popular (2025)',
    group: 'AKC Toy Group',
    mixes: [
      { name: 'Chipoo', file: 'chipoo.html', parents: 'Chihuahua + Poodle', desc: 'Tiny, spirited, and low-shedding — a small companion with big personality, similar in spirit to the Chinese Crested.' },
      { name: 'Peekapoo', file: 'peekapoo.html', parents: 'Pekingese + Poodle', desc: 'Affectionate and gentle, sharing the Chinese Crested\'s deep devotion to its owner.' },
      { name: 'Pomchi', file: 'pomchi.html', parents: 'Pomeranian + Chihuahua', desc: 'Lively and loyal — a petite companion that shares the Chinese Crested\'s toy group energy and loyalty.' },
    ],
    zhMixTitle: '热门中国冠毛犬混血品种',
    zhMixIntro: '中国冠毛犬有时与其他小型品种杂交，打造个性独特的迷你伴侣犬。',
    zhMixes: [
      { name: 'Chipoo（奇贵）', parents: '吉娃娃 + 贵宾', desc: '娇小活泼、低脱毛——气质上与中国冠毛犬相近的小型伴侣犬。' },
      { name: 'Peekapoo（京贵）', parents: '北京犬 + 贵宾', desc: '深情温柔，如中国冠毛犬一般对主人无比忠诚。' },
      { name: 'Pomchi（博吉）', parents: '博美 + 吉娃娃', desc: '活泼忠诚——娇小伴侣，与中国冠毛犬同为玩具犬组的活力代表。' },
    ],
  },
  {
    file: 'jack-russell-terrier.html',
    zhFile: 'jack-russell-terrier.html',
    akcRank: '#68 most popular (2025)',
    group: 'AKC Terrier Group',
    mixes: [
      { name: 'Jackadoodle', file: 'jackadoodle.html', parents: 'Jack Russell + Poodle', desc: 'Energetic and smart with a low-shedding coat — inherits the Jack Russell\'s bold character and the Poodle\'s wits.' },
      { name: 'Jug', file: 'jug.html', parents: 'Jack Russell + Pug', desc: 'Quirky and entertaining — blends the Jack Russell\'s feisty energy with the Pug\'s comical charm.' },
      { name: 'Bugg', file: 'bugg.html', parents: 'Boston Terrier + Pug', desc: 'Compact and charming — a fellow small terrier mix that shares the Jack Russell\'s lively, apartment-friendly spirit.' },
    ],
    zhMixTitle: '热门杰克罗素梗混血品种',
    zhMixIntro: '杰克罗素梗常与其他品种杂交，结合其活泼勇敢的气质。',
    zhMixes: [
      { name: 'Jackadoodle（杰克贵宾）', parents: '杰克罗素梗 + 贵宾', desc: '活力聪明、低脱毛——继承杰克罗素的大胆与贵宾的智慧。' },
      { name: 'Jug（杰克巴哥）', parents: '杰克罗素 + 巴哥', desc: '古灵精怪——融合杰克罗素的活力与巴哥的搞笑魅力。' },
      { name: 'Bugg（波士顿巴哥）', parents: '波士顿梗 + 巴哥', desc: '紧凑迷人——同为活泼、适合公寓的小型梗类混血。' },
    ],
  },
  {
    file: 'russian-black-terrier.html',
    zhFile: 'russian-black-terrier.html',
    akcRank: '#99 most popular (2025)',
    group: 'AKC Working Group',
    mixes: [
      { name: 'Flandoodle', file: 'flandoodle.html', parents: 'Bouvier des Flandres + Poodle', desc: 'Large, intelligent, and low-shedding — shares the Russian Black Terrier\'s working heritage and robust build.' },
      { name: 'Standard Schnauzer', file: 'standard-schnauzer.html', parents: 'Closely related — working terrier ancestor', desc: 'One of the breeds used to develop the Russian Black Terrier — shares its bold, protective character.' },
      { name: 'Shepadoodle', file: 'shepadoodle.html', parents: 'German Shepherd + Poodle', desc: 'Intelligent guardian mix that complements the Russian Black Terrier\'s serious working dog spirit.' },
    ],
    zhMixTitle: '热门俄罗斯黑梗混血品种',
    zhMixIntro: '俄罗斯黑梗有时与其他工作犬品种杂交，继承其强健体魄与护卫天性。',
    zhMixes: [
      { name: 'Flandoodle', parents: '佛兰德斯牧牛犬 + 贵宾', desc: '大型、聪明、低脱毛——与俄罗斯黑梗共享工作犬血统和强健体格。' },
      { name: '标准雪纳瑞', parents: '近亲品种——工作梗祖先', desc: '是培育俄罗斯黑梗的品种之一，共享大胆、保护性的性格。' },
      { name: 'Shepadoodle', parents: '德牧 + 贵宾', desc: '智慧护卫混血，与俄罗斯黑梗严肃的工作犬精神相辅相成。' },
    ],
  },
  {
    file: 'wirehaired-vizsla.html',
    zhFile: 'wirehaired-vizsla.html',
    akcRank: '#107 most popular (2025)',
    group: 'AKC Sporting Group',
    mixes: [
      { name: 'Weimardoodle', file: 'weimardoodle.html', parents: 'Weimaraner + Poodle', desc: 'A sporting-dog mix with similar energy and elegance — great for active owners who want a low-shedding gun dog.' },
      { name: 'Vizsla', file: 'vizsla.html', parents: 'Closely related — smooth-coated sibling', desc: 'The wire-haired\'s smooth-coated cousin — identical temperament with a different coat texture.' },
      { name: 'Goldmaraner', file: 'goldmaraner.html', parents: 'Golden Retriever + Weimaraner', desc: 'Athletic and affectionate — shares the Wirehaired Vizsla\'s sporting drive and love of outdoor adventure.' },
    ],
    zhMixTitle: '热门刚毛维兹拉犬混血品种',
    zhMixIntro: '刚毛维兹拉犬有时与其他运动犬杂交，结合其运动天赋与温柔气质。',
    zhMixes: [
      { name: 'Weimardoodle', parents: '威玛猎犬 + 贵宾', desc: '运动型混血，与刚毛维兹拉能量和优雅相近——适合活跃主人。' },
      { name: '维兹拉犬', parents: '近亲品种——短毛兄弟', desc: '刚毛版的短毛近亲——气质相同，仅毛发质地不同。' },
      { name: 'Goldmaraner', parents: '金毛 + 威玛猎犬', desc: '运动且深情——共享刚毛维兹拉的运动驱动力与户外冒险热情。' },
    ],
  },
  {
    file: 'australian-silky-terrier.html',
    zhFile: 'australian-silky-terrier.html',
    akcRank: '#118 most popular (2025)',
    group: 'AKC Toy Group',
    mixes: [
      { name: 'Morkie', file: 'morkie.html', parents: 'Maltese + Yorkshire Terrier', desc: 'Tiny, silky-coated, and devoted — shares the Silky Terrier\'s toy group glamour and terrier spunk.' },
      { name: 'Malshi', file: 'malshi.html', parents: 'Maltese + Shih Tzu', desc: 'Sweet, gentle, and low-shedding — a fellow small companion with a beautiful flowing coat.' },
      { name: 'Yorkie Poo', file: 'yorkipoo.html', parents: 'Yorkshire Terrier + Poodle', desc: 'Shares the Australian Silky Terrier\'s fine-coated elegance and spirited terrier energy in a low-shedding package.' },
    ],
    zhMixTitle: '热门澳大利亚丝毛梗混血品种',
    zhMixIntro: '澳大利亚丝毛梗有时与其他小型品种杂交，结合其优雅丝滑外套与梗犬活力。',
    zhMixes: [
      { name: 'Morkie（马克）', parents: '马耳他 + 约克夏梗', desc: '娇小、丝滑、忠诚——与丝毛梗共享玩具组的华丽与梗犬活力。' },
      { name: 'Malshi（马狮）', parents: '马耳他 + 西施', desc: '温柔可爱、低脱毛——同为飘逸长毛的小型伴侣犬。' },
      { name: 'Yorkie Poo（约克贵宾）', parents: '约克夏梗 + 贵宾', desc: '与澳大利亚丝毛梗共享细腻优雅与梗犬活力，低脱毛加成。' },
    ],
  },
  {
    file: 'dutch-shepherd.html',
    zhFile: 'dutch-shepherd.html',
    akcRank: '#124 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Gerberian Shepsky', file: 'gerberian-shepsky.html', parents: 'German Shepherd + Siberian Husky', desc: 'A fellow large working shepherd mix with drive, intelligence, and loyalty — similar spirit to the Dutch Shepherd.' },
      { name: 'Sheprador', file: 'sheprador.html', parents: 'German Shepherd + Labrador', desc: 'Loyal and trainable — a herding-sporting cross that shares the Dutch Shepherd\'s versatile working ethic.' },
      { name: 'Corman Shepherd', file: 'corman-shepherd.html', parents: 'Corgi + German Shepherd', desc: 'Compact herder with the shepherd intelligence — a unique variation on the Dutch Shepherd\'s working dog lineage.' },
    ],
    zhMixTitle: '热门荷兰牧羊犬混血品种',
    zhMixIntro: '荷兰牧羊犬有时与其他工作犬杂交，传承其多才多艺的牧羊基因。',
    zhMixes: [
      { name: 'Gerberian Shepsky', parents: '德牧 + 哈士奇', desc: '同为大型工作牧羊犬混血，充满驱动力、智慧和忠诚——气质与荷兰牧羊犬相近。' },
      { name: 'Sheprador', parents: '德牧 + 拉布拉多', desc: '忠诚可训——牧羊运动型杂交，与荷兰牧羊犬同享多用途工作精神。' },
      { name: 'Corman Shepherd', parents: '柯基 + 德牧', desc: '紧凑牧羊犬，兼具牧羊犬智慧——荷兰牧羊犬工作犬血统的独特变体。' },
    ],
  },
  {
    file: 'king-charles-spaniel.html',
    zhFile: 'king-charles-spaniel.html',
    akcRank: '#137 most popular (2025)',
    group: 'AKC Toy Group',
    mixes: [
      { name: 'Cavapoo', file: 'cavapoo.html', parents: 'Cavalier King Charles + Poodle', desc: 'The most popular companion dog mix — its larger Cavalier cousin produces this gentle, low-shedding favorite.' },
      { name: 'Poochon', file: 'poochon.html', parents: 'Bichon Frisé + Poodle', desc: 'Tiny, fluffy, and low-shedding — a fellow toy companion with the King Charles Spaniel\'s gentle, indoorsy nature.' },
      { name: 'Pom-A-Pug', file: 'pom-a-pug.html', parents: 'Pomeranian + Pug', desc: 'Compact and affectionate — shares the King Charles Spaniel\'s toy group charm and loyal, cuddly personality.' },
    ],
    zhMixTitle: '热门查理王猎犬混血品种',
    zhMixIntro: '查理王猎犬有时与其他玩具犬品种杂交，延续其温柔的宫廷伴侣犬传统。',
    zhMixes: [
      { name: 'Cavapoo（卡瓦普）', parents: '骑士查理王 + 贵宾', desc: '最受欢迎的伴侣犬混血——其大号近亲造就了这一温柔低脱毛宠儿。' },
      { name: 'Poochon（比贵）', parents: '比雄 + 贵宾', desc: '娇小蓬松、低脱毛——与查理王猎犬同享玩具组的温柔居家气质。' },
      { name: 'Pom-A-Pug（博巴）', parents: '博美 + 巴哥', desc: '紧凑深情——与查理王猎犬共享玩具组的魅力与忠诚抱抱个性。' },
    ],
  },
  {
    file: 'peruvian-inca-orchid.html',
    zhFile: 'peruvian-inca-orchid.html',
    akcRank: '#152 most popular (2025)',
    group: 'AKC Hound Group',
    mixes: [
      { name: 'Xoloitzcuintli', file: 'xoloitzcuintli.html', parents: 'Closely related — fellow hairless breed', desc: 'Mexico\'s ancient hairless breed shares the PIO\'s elegant, low-allergen profile and devoted personality.' },
      { name: 'Chinese Crested Dog', file: 'chinese-crested-dog.html', parents: 'Fellow hairless breed', desc: 'Both are rare hairless breeds prized for low-shedding and unique elegance — often compared as an "Eastern twin."' },
      { name: 'Pomapoo', file: 'pomapoo.html', parents: 'Pomeranian + Poodle', desc: 'Lively, low-shedding companion — a popular alternative for fans of the PIO\'s minimal grooming requirements.' },
    ],
    zhMixTitle: '热门秘鲁印加兰花犬混血品种',
    zhMixIntro: '秘鲁印加兰花犬有时与其他无毛或低脱毛品种杂交，延续其优雅低过敏传统。',
    zhMixes: [
      { name: '墨西哥无毛犬', parents: '近亲品种——同为无毛犬', desc: '墨西哥古老无毛犬，与PIO共享优雅低过敏外形与忠诚个性。' },
      { name: '中国冠毛犬', parents: '同为无毛品种', desc: '两者均为罕见无毛犬，因低脱毛和独特优雅而备受推崇——常被称为"东方双生"。' },
      { name: 'Pomapoo（博贵）', parents: '博美 + 贵宾', desc: '活泼低脱毛伴侣——对喜爱PIO低梳理需求特性的人是热门替代选择。' },
    ],
  },
  {
    file: 'smooth-collie.html',
    zhFile: 'smooth-collie.html',
    akcRank: '#155 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Rough Collie', file: 'rough-collie.html', parents: 'Closely related — same breed, different coat', desc: 'The Smooth Collie\'s long-coated sibling — identical in temperament and character, just with a different coat length.' },
      { name: 'Gollie', file: 'gollie.html', parents: 'Golden Retriever + Collie', desc: 'Combines the Collie\'s intelligence and devotion with the Golden Retriever\'s warmth — a beloved family favorite.' },
      { name: 'Bordoodle', file: 'bordoodle.html', parents: 'Border Collie + Poodle', desc: 'A low-shedding herding mix that inherits the Smooth Collie\'s sharp herding instincts and gentle home presence.' },
    ],
    zhMixTitle: '热门短毛牧羊犬混血品种',
    zhMixIntro: '短毛牧羊犬有时与其他品种杂交，继承其智慧温柔与牧羊本能。',
    zhMixes: [
      { name: '粗毛牧羊犬', parents: '近亲——同种不同毛长', desc: '短毛牧羊犬的长毛兄弟——气质性格完全相同，仅毛发长度不同。' },
      { name: 'Gollie（金色牧羊）', parents: '金毛 + 牧羊犬', desc: '融合牧羊犬的智慧忠诚与金毛的温暖——备受喜爱的家庭伴侣。' },
      { name: 'Bordoodle', parents: '边牧 + 贵宾', desc: '低脱毛牧羊混血，继承短毛牧羊犬敏锐的牧羊本能与温柔居家气质。' },
    ],
  },
  {
    file: 'scottish-deerhound.html',
    zhFile: 'scottish-deerhound.html',
    akcRank: '#158 most popular (2025)',
    group: 'AKC Hound Group',
    mixes: [
      { name: 'Irish Wolfhound', file: 'irish-wolfhound.html', parents: 'Closely related — fellow giant sighthound', desc: 'The world\'s tallest dog shares the Deerhound\'s ancient history, gentle giant temperament, and coursing heritage.' },
      { name: 'Greyhound', file: 'greyhound.html', parents: 'Related — sighthound family', desc: 'Shares the Scottish Deerhound\'s speed, grace, and gentle indoor nature — a natural companion comparison.' },
      { name: 'Lurcher', file: 'lurcher.html', parents: 'Sighthound + herding cross', desc: 'Popular UK mixed breed that often includes Deerhound lineage — combines sighthound speed with herding intelligence.' },
    ],
    zhMixTitle: '热门苏格兰猎鹿犬混血品种',
    zhMixIntro: '苏格兰猎鹿犬有时与其他视觉猎犬杂交，延续其高贵的古代猎犬传统。',
    zhMixes: [
      { name: '爱尔兰猎狼犬', parents: '近亲——同为巨型视觉猎犬', desc: '世界最高犬种，与猎鹿犬共享古老历史、温柔巨人气质与追猎传统。' },
      { name: '灰猎犬', parents: '近亲——视觉猎犬家族', desc: '与苏格兰猎鹿犬共享速度、优雅与温柔居家特性——自然的比较伴侣。' },
      { name: 'Lurcher（鲁彻）', parents: '视觉猎犬 + 牧羊犬杂交', desc: '英国流行混血，常含猎鹿犬血统——融合视觉猎犬速度与牧羊犬智慧。' },
    ],
  },
  {
    file: 'finnish-lapphund.html',
    zhFile: 'finnish-lapphund.html',
    akcRank: '#162 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Swedish Vallhund', file: 'swedish-vallhund.html', parents: 'Related Nordic herder', desc: 'A fellow ancient Nordic herding spitz — shares the Finnish Lapphund\'s reindeer-herding heritage and hardiness.' },
      { name: 'Pomapoo', file: 'pomapoo.html', parents: 'Pomeranian + Poodle', desc: 'Shares the Nordic spitz family look and loyal companion temperament in a compact, low-shedding package.' },
      { name: 'Chusky', file: 'chusky.html', parents: 'Chow Chow + Siberian Husky', desc: 'Another thick-coated Nordic-type companion — shares the Finnish Lapphund\'s cold-hardy spitz character.' },
    ],
    zhMixTitle: '热门芬兰拉普猎犬混血品种',
    zhMixIntro: '芬兰拉普猎犬有时与其他北欧品种杂交，传承其驯鹿放牧的北极血脉。',
    zhMixes: [
      { name: '瑞典瓦尔亨德', parents: '近亲北欧牧羊犬', desc: '另一古老北欧牧羊史必兹犬——与芬兰拉普猎犬共享驯鹿放牧传统与耐寒特性。' },
      { name: 'Pomapoo（博贵）', parents: '博美 + 贵宾', desc: '在紧凑低脱毛体型中共享北欧史必兹家族外形与忠诚伴侣气质。' },
      { name: 'Chusky（松哈）', parents: '松狮 + 哈士奇', desc: '另一厚毛北欧型伴侣犬——与芬兰拉普猎犬共享耐寒史必兹特性。' },
    ],
  },
  {
    file: 'polish-lowland-sheepdog.html',
    zhFile: 'polish-lowland-sheepdog.html',
    akcRank: '#168 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Bearded Collie', file: 'bearded-collie.html', parents: 'Closely related — shaggy herder', desc: 'Scottish counterpart to the Polish Lowland — shares the same shaggy coat, herding instincts, and lively spirit.' },
      { name: 'Sheepadoodle', file: 'sheepadoodle.html', parents: 'Old English Sheepdog + Poodle', desc: 'Fluffy and smart — a popular herding mix with the same irresistible shaggy appeal as the Polish Lowland.' },
      { name: 'Bordoodle', file: 'bordoodle.html', parents: 'Border Collie + Poodle', desc: 'Intelligent and low-shedding herding mix — shares the Polish Lowland\'s working drive and adaptability.' },
    ],
    zhMixTitle: '热门波兰低地牧羊犬混血品种',
    zhMixIntro: '波兰低地牧羊犬有时与其他长毛牧羊品种杂交，继承其蓬松外形与牧羊驱动力。',
    zhMixes: [
      { name: '胡须柯利犬', parents: '近亲——蓬松牧羊犬', desc: '波兰低地牧羊犬的苏格兰对应品种——共享蓬松外套、牧羊本能与活泼精神。' },
      { name: 'Sheepadoodle', parents: '古代英国牧羊犬 + 贵宾', desc: '蓬松聪明——与波兰低地同享无法抗拒的蓬松魅力的热门牧羊混血。' },
      { name: 'Bordoodle', parents: '边牧 + 贵宾', desc: '聪明低脱毛牧羊混血——与波兰低地共享工作驱动力与适应能力。' },
    ],
  },
  {
    file: 'komondor.html',
    zhFile: 'komondor.html',
    akcRank: '#170 most popular (2025)',
    group: 'AKC Working Group',
    mixes: [
      { name: 'Puli', file: 'puli.html', parents: 'Closely related — fellow Hungarian corded breed', desc: 'Hungary\'s other corded sheepdog — shares the Komondor\'s unique mop-coat appearance and herding heritage.' },
      { name: 'Great Pyrenees', file: 'great-pyrenees.html', parents: 'Related — livestock guardian', desc: 'Another majestic white livestock guardian that shares the Komondor\'s protective instincts and flock-guarding role.' },
      { name: 'Pyredoodle', file: 'pyredoodle.html', parents: 'Great Pyrenees + Poodle', desc: 'Large, fluffy, and devoted — a gentle giant mix that mirrors the Komondor\'s protective warmth in a low-shedding form.' },
    ],
    zhMixTitle: '热门可蒙犬混血品种',
    zhMixIntro: '可蒙犬有时与其他牧羊护卫品种杂交，继承其独特绳结毛外套与护群本能。',
    zhMixes: [
      { name: '普利犬', parents: '近亲——匈牙利绳结毛品种', desc: '匈牙利另一款绳结毛牧羊犬——与可蒙犬共享独特拖把外形与牧羊传统。' },
      { name: '大白熊犬', parents: '近亲——牲畜护卫犬', desc: '另一雄伟的白色牲畜护卫犬，与可蒙犬共享保护本能和护群职责。' },
      { name: 'Pyredoodle（大白贵宾）', parents: '大白熊 + 贵宾', desc: '大型蓬松忠诚——映照可蒙犬护卫温柔的低脱毛巨犬混血。' },
    ],
  },
  {
    file: 'spanish-water-dog.html',
    zhFile: 'spanish-water-dog.html',
    akcRank: '#171 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Portuguese Water Dog', file: 'portuguese-water-dog.html', parents: 'Closely related — Iberian water dog', desc: 'Portugal\'s working water dog shares the Spanish Water Dog\'s curly coat, retrieving ability, and loyalty.' },
      { name: 'Labradoodle', file: 'labradoodle.html', parents: 'Labrador + Poodle', desc: 'Popular water-loving mix that mirrors the Spanish Water Dog\'s curly coat and athletic, water-retrieving heritage.' },
      { name: 'Irish Water Spaniel', file: 'irish-water-spaniel.html', parents: 'Fellow water dog', desc: 'Another curly-coated water dog with retrieving heritage — a natural counterpart to the Spanish Water Dog.' },
    ],
    zhMixTitle: '热门西班牙水犬混血品种',
    zhMixIntro: '西班牙水犬有时与其他水上犬品种杂交，延续其卷毛工作犬传统。',
    zhMixes: [
      { name: '葡萄牙水犬', parents: '近亲——伊比利亚半岛水犬', desc: '葡萄牙工作水犬，与西班牙水犬共享卷毛外套、取猎能力与忠诚性格。' },
      { name: 'Labradoodle（拉贵）', parents: '拉布拉多 + 贵宾', desc: '热门水上运动混血，与西班牙水犬同享卷毛外套与运动水上取猎传统。' },
      { name: '爱尔兰水猎犬', parents: '同为水犬', desc: '另一款卷毛取猎水犬——是西班牙水犬的天然对应品种。' },
    ],
  },
  {
    file: 'bergamasco-shepherd.html',
    zhFile: 'bergamasco-shepherd.html',
    akcRank: '#175 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Komondor', file: 'komondor.html', parents: 'Related — fellow corded-coat herder', desc: 'Hungary\'s corded sheepdog shares the Bergamasco\'s flocked coat, guarding heritage, and devoted nature.' },
      { name: 'Puli', file: 'puli.html', parents: 'Related — corded herder', desc: 'Compact Hungarian cousin with a similar rope-like coat — shares the Bergamasco\'s unique woolly appearance.' },
      { name: 'Sheepadoodle', file: 'sheepadoodle.html', parents: 'Old English Sheepdog + Poodle', desc: 'Fluffy herding mix that captures the Bergamasco\'s thick, wooly appeal in a more common package.' },
    ],
    zhMixTitle: '热门贝加马斯科牧羊犬混血品种',
    zhMixIntro: '贝加马斯科牧羊犬有时与其他绳结毛牧羊品种杂交，延续其独特毡毛外套与护群传统。',
    zhMixes: [
      { name: '可蒙犬', parents: '近亲——绳结毛牧羊犬', desc: '匈牙利绳结毛牧羊犬，与贝加马斯科共享毡毛外套、护卫传统与忠诚性格。' },
      { name: '普利犬', parents: '近亲——绳结牧羊犬', desc: '紧凑匈牙利近亲，类似绳索状毛发——与贝加马斯科共享独特羊毛外形。' },
      { name: 'Sheepadoodle', parents: '古代英国牧羊犬 + 贵宾', desc: '蓬松牧羊混血，以更常见的形式呈现贝加马斯科厚重羊毛外套的魅力。' },
    ],
  },
  {
    file: 'belgian-laekenois.html',
    zhFile: 'belgian-laekenois.html',
    akcRank: '#196 most popular (2025)',
    group: 'AKC Herding Group',
    mixes: [
      { name: 'Belgian Shepherd', file: 'belgian-shepherd.html', parents: 'Closely related — same family, different coat', desc: 'Shares the Laekenois\'s alert, loyal shepherd character — the wire-coated Laekenois is the rarest of the four Belgian varieties.' },
      { name: 'Gerberian Shepsky', file: 'gerberian-shepsky.html', parents: 'German Shepherd + Siberian Husky', desc: 'A fellow large herding mix combining intelligence and drive — complementary working spirit to the Belgian Laekenois.' },
      { name: 'Malinois cross', file: 'belgian-shepherd.html', parents: 'Belgian Malinois variant', desc: 'The Malinois — Belgian Shepherd\'s most famous coat variety — shares the Laekenois\'s police and military working heritage.' },
    ],
    zhMixTitle: '热门比利时拉坎诺斯混血品种',
    zhMixIntro: '比利时拉坎诺斯有时与其他牧羊犬杂交，传承其警觉忠诚的比利时牧羊犬精神。',
    zhMixes: [
      { name: '比利时牧羊犬', parents: '近亲——同族不同毛质', desc: '共享拉坎诺斯警觉忠诚的牧羊犬性格——刚毛拉坎诺斯是四种比利时品种中最稀有的。' },
      { name: 'Gerberian Shepsky', parents: '德牧 + 哈士奇', desc: '同为大型牧羊混血，兼具智慧与驱动力——与比利时拉坎诺斯互补的工作精神。' },
      { name: '马利诺斯杂交', parents: '比利时马利诺斯变体', desc: '马利诺斯——比利时牧羊犬最著名的毛质变体——与拉坎诺斯共享警察军事工作传统。' },
    ],
  },
  {
    file: 'german-pinscher.html',
    zhFile: 'german-pinscher.html',
    akcRank: '#133 most popular (2025)',
    group: 'AKC Working Group',
    mixes: [
      { name: 'Miniature Pinscher', file: 'miniature-pinscher.html', parents: 'Closely related — miniature version', desc: 'The "Min Pin" is essentially a miniaturized German Pinscher — same bold temperament in a compact, feisty package.' },
      { name: 'Doberman Pinscher', file: 'dobermann.html', parents: 'Closely related — larger pinscher cousin', desc: 'Shares the German Pinscher\'s sleek, athletic build and devoted, watchful character — just at a grander scale.' },
      { name: 'Schnauzer', file: 'schnauzer.html', parents: 'Related working breed', desc: 'The Standard Schnauzer developed alongside the German Pinscher — both are alert, loyal, and quintessentially German.' },
    ],
    zhMixTitle: '热门德国宾莎犬混血品种',
    zhMixIntro: '德国宾莎犬有时与其他宾莎犬家族品种杂交，延续其优雅运动与守护特性。',
    zhMixes: [
      { name: '迷你宾莎犬', parents: '近亲——迷你版本', desc: '"迷你宾莎"本质上是德国宾莎的迷你化版本——同样大胆的气质，紧凑活力的体型。' },
      { name: '杜宾犬', parents: '近亲——更大型的宾莎近亲', desc: '与德国宾莎共享流线运动体型与忠诚警惕性格——只是体型更为壮观。' },
      { name: '雪纳瑞', parents: '近亲工作犬品种', desc: '标准雪纳瑞与德国宾莎并肩发展——两者均警觉忠诚、纯正德国风格。' },
    ],
  },
  {
    file: 'presa-canario.html',
    zhFile: 'presa-canario.html',
    akcRank: 'Not AKC recognized (FCI Group 2)',
    group: 'FCI Group 2 : Pinscher, Schnauzer, Molossoid breeds',
    mixes: [
      { name: 'Boerboel', file: 'boerboel.html', parents: 'Related — large Molossoid guardian', desc: 'South Africa\'s powerful farm dog shares the Presa Canario\'s imposing size, confidence, and loyal family protection.' },
      { name: 'Dogo Argentino', file: 'dogo-argentino.html', parents: 'Related — large working Molossoid', desc: 'Argentina\'s hunting Molossoid shares the Presa\'s athleticism, power, and need for experienced, confident ownership.' },
      { name: 'Cane Corso', file: 'cane-corso.html', parents: 'Related — Italian Molossoid', desc: 'Italy\'s noble guardian shares the Presa Canario\'s calm authority, loyalty, and natural protective instincts.' },
    ],
    zhMixTitle: '热门加那利犬混血品种',
    zhMixIntro: '加那利犬有时与其他大型莫洛斯品种杂交，结合其强健体魄与护卫本能。',
    zhMixes: [
      { name: '布尔波犬', parents: '近亲——大型莫洛斯护卫犬', desc: '南非强壮农场犬，与加那利犬共享威武体型、自信性格与忠诚家庭保护。' },
      { name: '阿根廷杜高', parents: '近亲——大型工作莫洛斯犬', desc: '阿根廷猎用莫洛斯犬，与加那利犬共享运动能力、力量与需要经验丰富主人。' },
      { name: '卡斯罗犬', parents: '近亲——意大利莫洛斯犬', desc: '意大利高贵护卫犬，与加那利犬共享沉稳威严、忠诚与天然保护本能。' },
    ],
  },
  {
    file: 'hovawart.html',
    zhFile: 'hovawart.html',
    akcRank: 'Not AKC recognized (FCI Group 2)',
    group: 'FCI Group 2 : Pinscher, Schnauzer, Molossoid breeds',
    mixes: [
      { name: 'Golden Retriever', file: 'golden-retriever.html', parents: 'Related — golden working companion', desc: 'Often compared for its golden coat and loyal temperament — the Hovawart is sometimes called "Germany\'s Golden Retriever."' },
      { name: 'Leonberger', file: 'leonberger.html', parents: 'Related — large German working dog', desc: 'Germany\'s lion-like giant shares the Hovawart\'s balanced temperament, devotion, and versatile working ability.' },
      { name: 'Bernese Mountain Dog', file: 'bernese-mountain-dog.html', parents: 'Related — Alpine working breed', desc: 'Shares the Hovawart\'s calm confidence, family loyalty, and heritage as an Alpine working and guard dog.' },
    ],
    zhMixTitle: '热门霍瓦特犬混血品种',
    zhMixIntro: '霍瓦特犬有时与其他大型德国工作犬品种杂交，延续其平衡温柔与守护能力。',
    zhMixes: [
      { name: '金毛寻回犬', parents: '近亲——金色工作伴侣犬', desc: '常因其金色外套与忠诚气质而被比较——霍瓦特有时被称为"德国金毛"。' },
      { name: '莱昂伯格犬', parents: '近亲——大型德国工作犬', desc: '德国狮子般的巨犬，与霍瓦特共享平衡气质、忠诚性格与多用途工作能力。' },
      { name: '伯尔尼斯山地犬', parents: '近亲——阿尔卑斯工作犬', desc: '与霍瓦特共享沉稳自信、家庭忠诚及阿尔卑斯工作护卫犬传统。' },
    ],
  },
  {
    file: 'eurasier.html',
    zhFile: 'eurasier.html',
    akcRank: 'Not AKC recognized (FCI Group 5)',
    group: 'FCI Group 5 : Spitz and Primitive types',
    mixes: [
      { name: 'Keeshond', file: 'keeshond.html', parents: 'Related — spitz companion', desc: 'The Dutch barge dog shares the Eurasier\'s calm, family-devoted spitz temperament and plush double coat.' },
      { name: 'Chow Chow', file: 'chow-chow.html', parents: 'Closely related — Eurasier ancestor', desc: 'One of the three breeds used to create the Eurasier — shares its lion-like mane and dignified character.' },
      { name: 'Chusky', file: 'chusky.html', parents: 'Chow Chow + Siberian Husky', desc: 'Thick-coated spitz mix that shares the Eurasier\'s Nordic ancestry and loyal, family-first personality.' },
    ],
    zhMixTitle: '热门欧亚犬混血品种',
    zhMixIntro: '欧亚犬有时与其他史必兹或原始犬品种杂交，延续其平衡温柔的家庭伴侣气质。',
    zhMixes: [
      { name: '基斯犬', parents: '近亲——史必兹伴侣犬', desc: '荷兰驳船犬，与欧亚犬共享沉稳家庭忠诚的史必兹气质与浓密双层毛。' },
      { name: '松狮犬', parents: '近亲——欧亚犬祖先', desc: '培育欧亚犬的三个品种之一——与其共享狮子般鬃毛与高贵性格。' },
      { name: 'Chusky（松哈）', parents: '松狮 + 哈士奇', desc: '厚毛史必兹混血，与欧亚犬共享北欧血脉与忠诚家庭优先个性。' },
    ],
  },
  {
    file: 'caucasian-shepherd-dog.html',
    zhFile: 'caucasian-shepherd-dog.html',
    akcRank: 'Not AKC recognized (FCI Group 2)',
    group: 'FCI Group 2 : Pinscher, Schnauzer, Molossoid breeds',
    mixes: [
      { name: 'Central Asian Shepherd Dog', file: 'central-asian-shepherd-dog.html', parents: 'Closely related — steppe guardian', desc: 'Shares the Caucasian Shepherd\'s ancient livestock-guardian heritage, massive size, and fierce territorial instincts.' },
      { name: 'Great Pyrenees', file: 'great-pyrenees.html', parents: 'Related — mountain livestock guardian', desc: 'Mountain guardian of the Pyrenees — shares the same ancient role protecting flocks from predators.' },
      { name: 'Leonberger', file: 'leonberger.html', parents: 'Related — large mountain dog', desc: 'Gentle giant with similar massive build — represents the more domesticated side of the mountain guardian spirit.' },
    ],
    zhMixTitle: '热门高加索牧羊犬混血品种',
    zhMixIntro: '高加索牧羊犬有时与其他大型护卫品种杂交，传承其强大的牲畜保护本能。',
    zhMixes: [
      { name: '中亚牧羊犬', parents: '近亲——草原护卫犬', desc: '与高加索牧羊犬共享古老牲畜护卫传统、巨大体型与强烈领地本能。' },
      { name: '大白熊犬', parents: '近亲——山地牲畜护卫犬', desc: '比利牛斯山的山地护卫犬——共享抵御掠食者保护羊群的同等古老职责。' },
      { name: '莱昂伯格犬', parents: '近亲——大型山地犬', desc: '温柔巨犬，体型同样庞大——代表山地护卫精神中更温顺家庭化的一面。' },
    ],
  },
  {
    file: 'stabyhoun.html',
    zhFile: 'stabyhoun.html',
    akcRank: 'Not AKC recognized (FCI Group 7)',
    group: 'FCI Group 7 : Pointing Dogs',
    mixes: [
      { name: 'Drentsche Patrijshond', file: 'drentsche-patrijshond.html', parents: 'Closely related — Dutch pointing breed', desc: 'The Stabyhoun\'s Dutch cousin — another rare Frisian gun dog combining pointing, retrieving, and companionship.' },
      { name: 'Wetterhoun', file: 'wetterhoun.html', parents: 'Closely related — Dutch waterfowl dog', desc: 'The Stabyhoun was historically bred alongside the Wetterhoun — both are from Friesland and nearly extinct outside the Netherlands.' },
      { name: 'Irish Water Spaniel', file: 'irish-water-spaniel.html', parents: 'Related — water sporting dog', desc: 'Another rare, water-loving versatile gun dog with a devoted temperament similar to the Stabyhoun.' },
    ],
    zhMixTitle: '热门斯塔比浑混血品种',
    zhMixIntro: '斯塔比浑有时与其他荷兰猎犬品种杂交，延续其弗里斯兰多功能猎犬传统。',
    zhMixes: [
      { name: '德伦特帕特里斯汉德', parents: '近亲——荷兰指示犬', desc: '斯塔比浑的荷兰近亲——另一集指示、取猎与伴侣功能于一体的稀有弗里斯兰猎犬。' },
      { name: '威特荷恩犬', parents: '近亲——荷兰水禽犬', desc: '斯塔比浑历史上与威特荷恩并肩培育——两者均来自弗里斯兰，在荷兰以外几近濒危。' },
      { name: '爱尔兰水猎犬', parents: '近亲——水上运动犬', desc: '另一款稀有、热爱水上运动的多功能猎犬，气质温顺与斯塔比浑相近。' },
    ],
  },
  {
    file: 'bolognese.html',
    zhFile: 'bolognese.html',
    akcRank: 'Not AKC recognized (FCI Group 9)',
    group: 'FCI Group 9 : Companion and Toy Dogs',
    mixes: [
      { name: 'Bichon Frisé', file: 'bichon-frise.html', parents: 'Closely related — Bichon family', desc: 'The Bolognese\'s most famous cousin — both are small white Bichon-type dogs with fluffy coats and devoted characters.' },
      { name: 'Maltese', file: 'maltese.html', parents: 'Related — ancient Mediterranean companion', desc: 'Fellow ancient Mediterranean lap dog — shares the Bolognese\'s pure white coat, gentle nature, and noble lap-dog heritage.' },
      { name: 'Coton de Tulear', file: 'coton-de-tulear.html', parents: 'Related — cotton-coated companion', desc: 'Madagascar\'s royal companion dog — shares the Bolognese\'s cottony white coat and deeply affectionate personality.' },
    ],
    zhMixTitle: '热门博洛尼亚犬混血品种',
    zhMixIntro: '博洛尼亚犬有时与其他比雄家族品种杂交，延续其纯白柔软外套与深情陪伴特性。',
    zhMixes: [
      { name: '比熊犬', parents: '近亲——比雄家族', desc: '博洛尼亚犬最著名的近亲——同为小型白色比雄型犬，蓬松外套、深情性格。' },
      { name: '马耳他犬', parents: '近亲——古代地中海伴侣犬', desc: '古代地中海膝上犬，与博洛尼亚犬共享纯白外套、温柔性格与高贵膝上犬传统。' },
      { name: '图雷亚尔棉花犬', parents: '近亲——棉花毛伴侣犬', desc: '马达加斯加皇家伴侣犬——与博洛尼亚犬共享棉花般白色外套与深深的依恋性格。' },
    ],
  },
  {
    file: 'japanese-spitz.html',
    zhFile: 'japanese-spitz.html',
    akcRank: 'Not AKC recognized (FCI Group 5)',
    group: 'FCI Group 5 : Spitz and Primitive types',
    mixes: [
      { name: 'American Eskimo Dog', file: 'american-eskimo-dog.html', parents: 'Closely related — white spitz', desc: 'America\'s white spitz cousin — shares the Japanese Spitz\'s striking white coat, cheerful personality, and intelligence.' },
      { name: 'Samoyed', file: 'samoyed.html', parents: 'Related — large white spitz', desc: 'A fellow pure-white spitz with the same elegant look — the Samoyed is essentially the Japanese Spitz\'s larger Arctic cousin.' },
      { name: 'Pomapoo', file: 'pomapoo.html', parents: 'Pomeranian + Poodle', desc: 'Lively and fluffy — a fellow white-coated small companion that captures the Japanese Spitz\'s spitz spirit.' },
    ],
    zhMixTitle: '热门日本尖嘴犬混血品种',
    zhMixIntro: '日本尖嘴犬有时与其他白色史必兹品种杂交，延续其纯白外套与活泼伴侣特性。',
    zhMixes: [
      { name: '美国爱斯基摩犬', parents: '近亲——白色史必兹', desc: '美国白色史必兹近亲——与日本尖嘴犬共享醒目白色外套、开朗性格与聪明才智。' },
      { name: '萨摩耶', parents: '近亲——大型白色史必兹', desc: '同为纯白史必兹，外形同样优雅——萨摩耶本质上是日本尖嘴犬更大型的北极近亲。' },
      { name: 'Pomapoo（博贵）', parents: '博美 + 贵宾', desc: '活泼蓬松——另一款白色小型伴侣犬，尽显日本尖嘴犬的史必兹精神。' },
    ],
  },
];

function buildMixGrid(mixes, isZh, zhMixes) {
  const items = isZh ? zhMixes : mixes;
  return items.map(m => {
    const href = `/breeds/${m.file || (m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html')}`;
    if (isZh) {
      return `              <div class="mix-card">
                <h3>${m.name}</h3>
                <p><strong>亲本：</strong>${m.parents}</p>
                <p>${m.desc}</p>
              </div>`;
    }
    return `              <div class="mix-card">
                <a href="${href}" style="text-decoration:none;color:inherit">
                  <h3><a href="${href}">${m.name}</a></h3>
                  <p><strong>Parents:</strong> ${m.parents}</p>
                  <p>${m.desc}</p>
                </a>
              </div>`;
  }).join('\n');
}

function buildMixTab(breed, isZh) {
  const title = isZh ? breed.zhMixTitle : `Popular ${breed.file.replace('.html','').split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')} Mix Breeds`;
  const intro = isZh ? breed.zhMixIntro : `${breed.file.replace('.html','').split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')} are sometimes crossed with other breeds to create unique companions that combine the best traits of both parents. Here are some of the most popular mixes.`;
  const grid = buildMixGrid(breed.mixes, isZh, breed.zhMixes);
  return `        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 ${title}</h2>
            <p>${intro}</p>
            <div class="mix-grid">
${grid}
            </div>
          </div>
        </div>`;
}

let totalUpdated = 0;
let totalZhUpdated = 0;

for (const breed of breeds) {
  // ---- EN page ----
  const enPath = path.join(BREEDS_DIR, breed.file);
  if (!fs.existsSync(enPath)) { console.log(`SKIP (not found): ${breed.file}`); continue; }
  let html = fs.readFileSync(enPath, 'utf8');

  // 1. Add AKC Rank to sidebar Quick Facts (insert before Group line or first info-box)
  if (!html.includes('AKC Rank')) {
    // Replace the sidebar-card Quick Facts first info-box with AKC Rank prepended
    html = html.replace(
      /<div class="sidebar-card">\s*<h4>Quick Facts<\/h4>/,
      `<div class="sidebar-card">
          <h4>Quick Facts</h4>
          <div class="info-box"><div class="info-box-label">AKC Rank</div><div class="info-box-value">${breed.akcRank}</div></div>`
    );
    // Also update group line if it shows KCI style — keep existing, just ensure AKC rank is added
  }

  // 2. Add mix tab button if missing
  if (!html.includes('data-tab="mixes"')) {
    html = html.replace(
      /(<button class="breed-tab" data-tab="cost">.*?<\/button>)/s,
      `$1\n          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>`
    );
    // Add mix tab panel before closing breed-main
    html = html.replace(
      /(<div class="breed-tab-panel"[^>]*id="tab-facts">)/,
      buildMixTab(breed, false) + '\n\n        $1'
    );
  }

  fs.writeFileSync(enPath, html, 'utf8');
  totalUpdated++;
  console.log(`✅ EN updated: ${breed.file}`);

  // ---- ZH page ----
  const zhPath = path.join(ZH_DIR, breed.zhFile);
  if (!fs.existsSync(zhPath)) { console.log(`SKIP ZH (not found): ${breed.zhFile}`); continue; }
  let zhHtml = fs.readFileSync(zhPath, 'utf8');

  if (!zhHtml.includes('AKC排名') && !zhHtml.includes('AKC Rank')) {
    const zhRank = breed.akcRank.includes('Not AKC') ? breed.akcRank : breed.akcRank.replace('most popular', '最受欢迎');
    const before = zhHtml;
    // Try sidebar-card format first (all known header variants)
    const zhHeaders = ['快速信息', '快速参数', '快速概览', '快速资料', '快速参考', '基本信息', '基本资料', 'Quick Facts'];
    for (const h of zhHeaders) {
      zhHtml = zhHtml.replace(
        new RegExp(`<div class="sidebar-card">\\s*<h4>${h}<\\/h4>`),
        `<div class="sidebar-card">\n          <h4>${h}</h4>\n          <div class="info-box"><div class="info-box-label">AKC排名</div><div class="info-box-value">${zhRank}</div></div>`
      );
      if (zhHtml !== before) break;
    }
    // Fallback: old sidebar-box / sidebar-facts format
    if (zhHtml === before) {
      zhHtml = zhHtml.replace(
        /(<ul class="sidebar-facts">)/,
        `$1\n            <li><strong>AKC排名：</strong>${zhRank}</li>`
      );
    }
  }

  if (!zhHtml.includes('data-tab="mixes"')) {
    // Try cost tab button first, fall back to facts tab button
    if (zhHtml.match(/<button class="breed-tab" data-tab="cost">/)) {
      zhHtml = zhHtml.replace(
        /(<button class="breed-tab" data-tab="cost">.*?<\/button>)/s,
        `$1\n          <button class="breed-tab" data-tab="mixes">🧬 混血品种</button>`
      );
    } else {
      zhHtml = zhHtml.replace(
        /(<button class="breed-tab" data-tab="facts">.*?<\/button>)/s,
        `<button class="breed-tab" data-tab="mixes">🧬 混血品种</button>\n          $1`
      );
    }
    zhHtml = zhHtml.replace(
      /(<div class="breed-tab-panel"[^>]*id="tab-facts">)/,
      buildMixTab(breed, true) + '\n\n        $1'
    );
  }

  fs.writeFileSync(zhPath, zhHtml, 'utf8');
  totalZhUpdated++;
  console.log(`✅ ZH updated: ${breed.zhFile}`);
}

console.log(`\nBatch 35 complete: ${totalUpdated} EN + ${totalZhUpdated} ZH pages updated.`);
