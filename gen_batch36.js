/* gen_batch36.js — Add new distinct purebred breeds (real, documented, non-FCI)
 * Generates EN + ZH breed pages, inserts cards into both index files, updates sitemap.
 * Idempotent: skips a breed's page/card/sitemap entry if it already exists.
 * Run: node gen_batch36.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EN_DIR = path.join(ROOT, 'breeds');
const ZH_DIR = path.join(ROOT, 'zh', 'breeds');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const TODAY = '2026-06-27';

/* ── Breed data ───────────────────────────────────────────────────────────────
 * size: small|medium|large|giant   energy: low|medium|high
 * api : dog.ceo path for real photos, or null (emoji hero, no gallery)
 * badge: short registry/rarity tag shown on the card (never contains "FCI")
 */
const BREEDS = [
  {
    slug: 'american-bulldog', name: 'American Bulldog', emoji: '🐶', api: null,
    badge: 'UKC', size: 'large', weight: '60–120 lbs', height: '20–28 in',
    lifespan: '10–16 yrs', energyLabel: 'Medium–High', energy: 'medium', kids: 'yes',
    coat: 'Short, smooth', shedding: 'Moderate', origin: 'United States (South)',
    recognition: 'UKC recognized · AKC Foundation Stock Service',
    group: 'Working / Guardian', subtitle: 'Working Group · Purebred · Powerful, confident, and devoted',
    keywords: 'american bulldog johnson scott bully standard farm catch dog hog southern usa guardian working',
    overview: [
      "The American Bulldog is a powerful, athletic working dog descended from the Old English Bulldogs that English and Scots-Irish settlers brought to the American South. While the breed nearly vanished after World War II, dedicated breeders — most famously John D. Johnson and Alan Scott — revived it as a versatile farm dog used to catch feral hogs, drive cattle, and guard the homestead.",
      "Today the breed exists in two broad types: the heavier, more muscular \"Johnson\" (or Bully) type and the leaner, more agile \"Scott\" (Standard) type, plus many dogs in between. American Bulldogs are confident, intensely loyal, and deeply bonded to their families. They are best suited to experienced owners who can provide firm, consistent leadership, early socialization, and a real job to do."
    ],
    temperament: "American Bulldogs are courageous, affectionate, and devoted to their people. They are natural protectors with a gentle, playful side at home, but their strength and drive demand structure and early socialization.",
    traitBullets: [
      "Loyal and family-oriented — forms an intense bond with its household",
      "Confident and protective — a natural watchdog that needs proper socialization",
      "High working drive — happiest with a job, training, or sport to channel its energy",
      "Strong and athletic — capable of impressive jumps and bursts of speed",
      "Best for experienced owners who can provide firm, consistent leadership",
      "Generally good with children it is raised with, but supervise around small kids due to its size"
    ],
    health: ['Hip dysplasia', 'Elbow dysplasia', 'ACL/cruciate tears', 'Cherry eye', 'Ichthyosis (skin)', 'Bone cancer (some lines)'],
    facts: [
      "🐗 American Bulldogs were prized \"catch dogs\" on Southern farms, used to grab and hold feral hogs and unruly cattle.",
      "🎬 The breed gained fame from the 1993 movie \"Homeward Bound\" — the dog Chance is an American Bulldog.",
      "💪 The two main lines — Johnson (Bully) and Scott (Standard) — were named after the two breeders who saved the breed from near-extinction.",
      "🚜 Unlike the show-bred English Bulldog, the American Bulldog kept its athletic, working build and can jump 3–6 feet vertically.",
      "🇺🇸 They are recognized by the United Kennel Club (UKC) and are in the AKC's Foundation Stock Service, a step toward full recognition."
    ],
    related: [
      { slug: 'bulldog', name: 'Bulldog', emoji: '🐶' },
      { slug: 'olde-english-bulldogge', name: 'Olde English Bulldogge', emoji: '🐶' },
      { slug: 'boxer', name: 'Boxer', emoji: '🥊' }
    ],
    traits: { Trainability: 4, Friendliness: 4, 'Energy Level': 4, 'Good with Kids': 4, Protectiveness: 5 },
    compat: { kids: 4, dogs: 3, cats: 2, apartment: 2, firstTime: 2, hot: 3 },
    zh: {
      name: '美国斗牛犬',
      subtitle: '工作犬组 · 纯种犬 · 强壮、自信、忠诚',
      overview: [
        "美国斗牛犬是一种强壮、运动型的工作犬，源自英国和苏格兰移民带到美国南方的古代英国斗牛犬。二战后该品种几近消失，幸得 John D. Johnson 与 Alan Scott 等育种者倾力复兴，将其重塑为多用途农场犬——用于捕捉野猪、驱赶牛群和守卫家园。",
        "如今该品种分为两大类型：体格更厚重健壮的“约翰逊型”（Bully）与更精瘦敏捷的“斯科特型”（Standard），以及介于两者之间的众多个体。美国斗牛犬自信、忠诚，与家人羁绊极深，最适合能提供坚定一致领导、早期社会化和实际“工作”的有经验主人。"
      ],
      temperament: "美国斗牛犬勇敢、深情、对主人忠心耿耿。它们是天生的守护者，在家中也有温柔顽皮的一面，但其力量与驱动力需要结构化训练和早期社会化。",
      facts: [
        "🐗 美国斗牛犬曾是南方农场珍贵的“捕捉犬”，用于抓捕和制服野猪与不驯的牛群。",
        "🎬 1993 年电影《无家可归》（Homeward Bound）让该品种声名大噪——其中名叫 Chance 的狗就是美国斗牛犬。",
        "💪 两大主要血系——约翰逊（Bully）与斯科特（Standard）——以拯救该品种的两位育种者命名。",
        "🚜 与展示型英国斗牛犬不同，美国斗牛犬保留了运动型工作体格，垂直跳跃可达 1–1.8 米。",
        "🇺🇸 它们获联合养犬俱乐部（UKC）认可，并已进入 AKC 基础种群服务（FSS），迈向完全认可。"
      ]
    }
  },
  {
    slug: 'alaskan-klee-kai', name: 'Alaskan Klee Kai', emoji: '🐺', api: null,
    badge: 'UKC', size: 'small', weight: '6–25 lbs', height: '13–17 in',
    lifespan: '13–16 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Double, thick', shedding: 'High (seasonal)', origin: 'United States (Alaska)',
    recognition: 'UKC recognized · AKC Foundation Stock Service',
    group: 'Companion / Spitz', subtitle: 'Companion Spitz · Purebred · A companion-sized husky with a sharp mind',
    keywords: 'alaskan klee kai mini husky miniature toy standard spitz companion linda spurlin apartment',
    overview: [
      "The Alaskan Klee Kai is a small Northern breed developed in Wasilla, Alaska, in the 1970s and 80s by Linda Spurlin, who wanted a companion-sized dog with the striking looks of an Alaskan Husky. \"Klee Kai\" comes from an Inuit term meaning \"small dog.\" The result is an alert, agile, fox-like dog that looks like a husky in miniature.",
      "Klee Kai come in three sizes — Toy (under 13 in), Miniature (13–15 in), and Standard (15–17 in). They are highly intelligent, energetic, and intensely loyal to their family, but tend to be reserved or aloof with strangers. Early, ongoing socialization is essential. They thrive with active owners and make surprisingly good apartment dogs when their considerable mental and physical needs are met."
    ],
    temperament: "Bright, curious, and quick, the Alaskan Klee Kai bonds fiercely with its family while staying wary of strangers. It is a vocal, highly trainable breed that needs mental stimulation to stay content.",
    traitBullets: [
      "Highly intelligent and trainable — learns quickly but can be willful",
      "Reserved with strangers — early and consistent socialization is critical",
      "Energetic and agile — excels at agility, trick training, and active play",
      "Vocal — \"talks,\" whines, and can be prone to barking if under-stimulated",
      "Strong prey drive — small pets and off-leash freedom require caution",
      "Adaptable to apartments if given enough daily exercise and enrichment"
    ],
    health: ['Luxating patella', 'Heart conditions', 'Thyroid disease', 'Factor VII deficiency', 'Cataracts', 'Liver shunts (rare)'],
    facts: [
      "🐺 Despite looking like a wolf or husky, the Alaskan Klee Kai is purely a companion breed — it was never bred for sledding.",
      "📏 The breed comes in three official sizes: Toy, Miniature, and Standard.",
      "🤫 \"Klee Kai\" derives from an Alaskan Inuit phrase meaning \"small dog.\"",
      "🗣️ They are famously \"talkative,\" using an expressive range of yips, whines, and grumbles to communicate.",
      "👩‍🔬 The entire breed traces back to the dogs developed by one woman, Linda Spurlin, who carefully shaped it over two decades."
    ],
    related: [
      { slug: 'siberian-husky', name: 'Siberian Husky', emoji: '🐺' },
      { slug: 'american-eskimo-dog', name: 'American Eskimo Dog', emoji: '🐩' },
      { slug: 'pomsky', name: 'Pomsky', emoji: '🐺' }
    ],
    traits: { Trainability: 4, Friendliness: 3, 'Energy Level': 5, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 4, cats: 2, apartment: 4, firstTime: 3, hot: 2 },
    zh: {
      name: '阿拉斯加克利凯犬',
      subtitle: '伴侣史必兹 · 纯种犬 · 拥有敏锐头脑的迷你哈士奇',
      overview: [
        "阿拉斯加克利凯犬是一种小型北方犬，由 Linda Spurlin 于 1970–80 年代在阿拉斯加瓦西拉培育，旨在打造一种拥有阿拉斯加雪橇犬醒目外形的伴侣体型犬。“Klee Kai”源自因纽特语，意为“小狗”。成果便是这种警觉、敏捷、狐狸般的迷你哈士奇。",
        "克利凯犬分三种体型——玩具型（13 英寸以下）、迷你型（13–15 英寸）和标准型（15–17 英寸）。它们高度聪慧、精力充沛、对家人极为忠诚，但对陌生人往往保留或冷淡，因此持续的早期社会化至关重要。它们适合活跃的主人，在满足充足身心需求的前提下，也能成为出色的公寓犬。"
      ],
      temperament: "聪明、好奇、反应敏捷，阿拉斯加克利凯犬对家人羁绊极深，却对陌生人保持警惕。这是一个善于“说话”、极易训练的品种，需要充分的脑力刺激才能保持满足。",
      facts: [
        "🐺 尽管外形酷似狼或哈士奇，阿拉斯加克利凯犬纯粹是伴侣犬——从未用于拉雪橇。",
        "📏 该品种有三种官方体型：玩具型、迷你型和标准型。",
        "🤫 “Klee Kai”源自阿拉斯加因纽特语，意为“小狗”。",
        "🗣️ 它们以“健谈”著称，会用丰富的呜咽、哼唱和咕哝声来表达。",
        "👩‍🔬 整个品种都可追溯到 Linda Spurlin 一人历经二十年精心培育的犬只。"
      ]
    }
  },
  {
    slug: 'catahoula-leopard-dog', name: 'Catahoula Leopard Dog', emoji: '🐕', api: null,
    badge: 'UKC', size: 'large', weight: '50–95 lbs', height: '20–26 in',
    lifespan: '10–14 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Short, single', shedding: 'Moderate', origin: 'United States (Louisiana)',
    recognition: 'UKC recognized · AKC FSS · Louisiana State Dog',
    group: 'Herding / Working', subtitle: 'Herding Group · Purebred · Louisiana\'s striking all-purpose stock dog',
    keywords: 'catahoula leopard dog louisiana hog dog cur merle glass eyes herding working stock dog state dog',
    overview: [
      "The Louisiana Catahoula Leopard Dog is America's only breed developed entirely in Louisiana, where it became the official state dog in 1979. Named for Catahoula Parish, it descends from local dogs crossed with breeds brought by Spanish and French settlers. For centuries it has been the all-purpose working dog of the bayou — herding cattle and hogs, hunting, and guarding.",
      "Catahoulas are famous for their dazzling appearance: marbled \"leopard\" merle coats and striking, sometimes ice-blue \"glass\" eyes. They are intelligent, intensely energetic, and independent — bred to make their own decisions while working livestock. This combination makes them rewarding but demanding; they need a confident owner, a real job, and substantial daily exercise to thrive."
    ],
    temperament: "Catahoulas are bold, energetic, and fiercely loyal working dogs with a strong independent streak. They are devoted to their family but naturally wary of strangers and need early socialization and a job to channel their drive.",
    traitBullets: [
      "Extremely energetic — needs vigorous daily exercise and mental work",
      "Intelligent and independent — bred to think and work on its own",
      "Loyal and protective of family — naturally reserved with strangers",
      "Strong herding and prey drive — best with space and a job to do",
      "Not ideal for first-time or sedentary owners",
      "Thrives with experienced handlers who provide structure and purpose"
    ],
    health: ['Hip dysplasia', 'Deafness (linked to merle)', 'Eye abnormalities', 'Bloat', 'Hypothyroidism'],
    facts: [
      "🦅 The Catahoula became the official state dog of Louisiana in 1979.",
      "👁️ Many Catahoulas have striking \"glass\" (ice-blue) eyes — and some have two different-colored eyes (heterochromia).",
      "🐗 They are renowned \"hog dogs,\" able to track, bay, and hold wild boar across rough bayou terrain.",
      "🐾 Some Catahoulas have webbed feet, helping them work in the marshy wetlands of the American South.",
      "🌍 The name comes from Catahoula Parish, a word of Choctaw origin meaning \"sacred lake.\""
    ],
    related: [
      { slug: 'mountain-cur', name: 'Mountain Cur', emoji: '🐕' },
      { slug: 'black-mouth-cur', name: 'Black Mouth Cur', emoji: '🐕' },
      { slug: 'australian-cattle-dog', name: 'Australian Cattle Dog', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 3, 'Energy Level': 5, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 3, cats: 2, apartment: 1, firstTime: 1, hot: 4 },
    zh: {
      name: '卡塔霍拉豹犬',
      subtitle: '牧羊犬组 · 纯种犬 · 路易斯安那州醒目的全能牧畜犬',
      overview: [
        "路易斯安那卡塔霍拉豹犬是唯一完全在路易斯安那州培育的美国犬种，并于 1979 年成为该州的官方州犬。它以卡塔霍拉教区命名，由当地犬只与西班牙、法国移民带来的品种杂交而成。数百年来，它一直是河口湿地的全能工作犬——牧牛、赶猪、狩猎和守卫。",
        "卡塔霍拉犬以其炫目的外形闻名：大理石纹“豹斑”陨色被毛，以及醒目、有时呈冰蓝色的“玻璃眼”。它们聪明、精力极其旺盛且独立——天生被培育成能在牧畜时自主决策。这一组合使它们既令人满足又极具挑战；需要自信的主人、真正的工作和大量的每日运动才能茁壮成长。"
      ],
      temperament: "卡塔霍拉犬是大胆、精力充沛、极度忠诚的工作犬，具有强烈的独立性。它们对家人忠心耿耿，但天生对陌生人保持警惕，需要早期社会化和工作来引导其驱动力。",
      facts: [
        "🦅 卡塔霍拉犬于 1979 年成为路易斯安那州的官方州犬。",
        "👁️ 许多卡塔霍拉犬拥有醒目的“玻璃眼”（冰蓝色），有些还有两只不同颜色的眼睛（虹膜异色）。",
        "🐗 它们是著名的“猎猪犬”，能在崎岖的河口地形中追踪、吠围并制服野猪。",
        "🐾 部分卡塔霍拉犬长有蹼足，帮助它们在美国南方的沼泽湿地中工作。",
        "🌍 名字源自卡塔霍拉教区，是一个乔克托语词汇，意为“圣湖”。"
      ]
    }
  },
  {
    slug: 'black-mouth-cur', name: 'Black Mouth Cur', emoji: '🐕', api: null,
    badge: 'UKC', size: 'large', weight: '40–95 lbs', height: '16–25 in',
    lifespan: '12–16 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Short, dense', shedding: 'Moderate', origin: 'United States (Southeast)',
    recognition: 'UKC recognized', group: 'Working / Herding',
    subtitle: 'Working Group · Purebred · The loyal Southern all-rounder of "Old Yeller" fame',
    keywords: 'black mouth cur old yeller southern usa hunting herding stock dog ladner texas yellow working',
    overview: [
      "The Black Mouth Cur is a rugged American working breed from the rural Southeast, prized by farmers and hunters for its versatility. A single dog might herd cattle in the morning, tree squirrels or bay wild hogs in the afternoon, and guard the family at night. Its name comes from the dark muzzle that many — though not all — of these dogs display.",
      "Hardworking, courageous, and devoted, the Black Mouth Cur is happiest with a job and a family to protect. They are intelligent and eager to please but carry strong drive and stamina, so they need active, engaged owners. Loyal and gentle with their own people — they were immortalized as the heroic dog in the classic novel and film \"Old Yeller.\""
    ],
    temperament: "Loyal, brave, and hardworking, the Black Mouth Cur is devoted to its family and protective by nature. It is energetic and intelligent, needing daily activity and a sense of purpose to be content.",
    traitBullets: [
      "Versatile worker — herds, hunts, and guards with equal enthusiasm",
      "Deeply loyal and protective of family, including children",
      "High energy and stamina — needs vigorous daily exercise",
      "Intelligent and trainable, but independent-minded",
      "Best on a farm or with an active outdoor family",
      "Naturally wary of strangers — good watchdog"
    ],
    health: ['Hip dysplasia', 'Ear infections', 'Mange (juveniles)', 'Eye issues', 'Generally very hardy'],
    facts: [
      "📚 The Black Mouth Cur is the breed of \"Old Yeller,\" the heroic dog from Fred Gipson's 1956 novel and Disney's 1957 film.",
      "🛠️ \"Cur\" simply means a working farm dog of mixed working heritage — not an insult in this context.",
      "🐂 A single Black Mouth Cur can herd livestock, tree game, and guard the homestead — a true all-purpose dog.",
      "🎨 Despite the name, not every Black Mouth Cur has a black muzzle; coats range from yellow and red to brindle.",
      "💪 The breed is known for remarkable hardiness and a long working lifespan."
    ],
    related: [
      { slug: 'mountain-cur', name: 'Mountain Cur', emoji: '🐕' },
      { slug: 'catahoula-leopard-dog', name: 'Catahoula Leopard Dog', emoji: '🐕' },
      { slug: 'american-leopard-hound', name: 'American Leopard Hound', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 4, 'Energy Level': 5, 'Good with Kids': 5, Alertness: 5 },
    compat: { kids: 5, dogs: 3, cats: 2, apartment: 1, firstTime: 2, hot: 4 },
    zh: {
      name: '黑嘴卡',
      subtitle: '工作犬组 · 纯种犬 · 因《老黄狗》闻名的忠诚南方全能犬',
      overview: [
        "黑嘴卡是来自美国东南部乡村的强健工作犬，因其多才多艺而深受农民和猎人珍视。一只狗可能早上牧牛，下午追树松鼠或吠围野猪，晚上守卫家园。它的名字来源于许多（但并非全部）这种狗所具有的深色口吻。",
        "勤劳、勇敢、忠诚，黑嘴卡在有工作可做、有家人可护时最为快乐。它们聪明、乐于取悦主人，但拥有强烈的驱动力和耐力，因此需要活跃、投入的主人。对自家人忠诚温柔——它们因经典小说和电影《老黄狗》中那只英勇的狗而永载史册。"
      ],
      temperament: "忠诚、勇敢、勤劳，黑嘴卡对家人忠心耿耿，天性具有保护欲。它们精力充沛、聪明伶俐，需要每日活动和使命感才能保持满足。",
      facts: [
        "📚 黑嘴卡正是《老黄狗》中的犬种——源自 Fred Gipson 1956 年的小说和迪士尼 1957 年的电影。",
        "🛠️ “Cur”仅指具有混合工作血统的农场工作犬——在此语境下并非贬义。",
        "🐂 一只黑嘴卡可以牧畜、追猎和守家——真正的全能犬。",
        "🎨 尽管名为黑嘴，并非每只黑嘴卡都有黑色口吻；被毛从黄色、红色到虎斑色不等。",
        "💪 该品种以非凡的强健体质和长久的工作寿命著称。"
      ]
    }
  },
  {
    slug: 'carolina-dog', name: 'Carolina Dog', emoji: '🐕', api: null,
    badge: 'AKC FSS', size: 'medium', weight: '30–55 lbs', height: '17–24 in',
    lifespan: '12–15 yrs', energyLabel: 'Medium', energy: 'medium', kids: 'yes',
    coat: 'Short, dense', shedding: 'Moderate (seasonal)', origin: 'United States (Southeast)',
    recognition: 'UKC recognized · AKC Foundation Stock Service',
    group: 'Primitive / Pariah', subtitle: 'Primitive Type · Purebred · America\'s ancient free-ranging "Dixie Dingo"',
    keywords: 'carolina dog american dingo dixie dingo pariah primitive free ranging wild i lehr brisbin southeast usa',
    overview: [
      "The Carolina Dog — nicknamed the \"American Dingo\" or \"Dixie Dingo\" — is a primitive breed believed to descend from ancient dogs that crossed into the Americas with early peoples thousands of years ago. Free-ranging populations were rediscovered living semi-wild in the cypress swamps and pine forests of the rural Southeast, and were studied beginning in the 1970s by ecologist Dr. I. Lehr Brisbin.",
      "Carolina Dogs have a classic primitive build: a wedge-shaped head, upright ears, a fishhook tail, and a sandy-red coat. They are intelligent, alert, and clean by nature, often showing dingo-like behaviors such as digging snout-pits and a strong pack instinct. They can be shy with strangers but form devoted bonds with their family, making a quiet, naturally healthy companion for patient owners."
    ],
    temperament: "Carolina Dogs are alert, intelligent, and naturally reserved, retaining many primitive instincts. They bond closely with their pack/family but are often cautious with strangers and new situations.",
    traitBullets: [
      "Primitive and intelligent — independent thinker with strong instincts",
      "Shy or wary with strangers — patient socialization helps greatly",
      "Pack-oriented — bonds deeply with family and other dogs",
      "Clean and low-odor — naturally fastidious",
      "Moderate exercise needs — enjoys exploring and digging",
      "Generally very healthy thanks to natural-selection origins"
    ],
    health: ['Generally very healthy', 'Hip dysplasia (uncommon)', 'Sensitivity to ivermectin (some)', 'Demodectic mange (juveniles)'],
    facts: [
      "🌎 Carolina Dogs may be among the oldest dog lineages in the Americas, possibly descended from dogs that arrived with ancient peoples.",
      "🦴 They were rediscovered living wild in the swamps of South Carolina and Georgia in the 1970s.",
      "🕳️ They dig distinctive \"snout pits\" — small holes in the ground — a behavior shared with the Australian Dingo.",
      "🐕 Their nicknames include \"American Dingo,\" \"Dixie Dingo,\" and \"Yaller Dog.\"",
      "🔬 Much of what we know comes from decades of study by ecologist Dr. I. Lehr Brisbin Jr."
    ],
    related: [
      { slug: 'dingo', name: 'Dingo', emoji: '🐕' },
      { slug: 'indian-pariah-dog', name: 'Indian Pariah Dog', emoji: '🐕' },
      { slug: 'basenji', name: 'Basenji', emoji: '🐕' }
    ],
    traits: { Trainability: 3, Friendliness: 3, 'Energy Level': 3, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 4, cats: 2, apartment: 2, firstTime: 2, hot: 4 },
    zh: {
      name: '卡罗莱纳犬',
      subtitle: '原始犬种 · 纯种犬 · 美国古老的自由放养"迪克西野犬"',
      overview: [
        "卡罗莱纳犬——绰号“美洲野犬”或“迪克西野犬”——是一种原始犬种，据信是数千年前随早期人类迁入美洲的古老犬只的后代。人们在美国东南部乡村的柏树沼泽和松林中重新发现了半野生的自由放养种群，生态学家 I. Lehr Brisbin 博士自 1970 年代起对其展开研究。",
        "卡罗莱纳犬具有典型的原始犬体型：楔形头部、直立耳朵、鱼钩状尾巴和沙红色被毛。它们聪明、警觉、天性爱干净，常表现出类似野犬的行为，如挖掘鼻坑和强烈的群居本能。它们对陌生人可能害羞，但与家人建立深厚的羁绊，是有耐心主人的安静、天然健康的伴侣。"
      ],
      temperament: "卡罗莱纳犬警觉、聪明、天性内敛，保留了许多原始本能。它们与家庭/族群羁绊紧密，但对陌生人和新环境往往保持谨慎。",
      facts: [
        "🌎 卡罗莱纳犬可能是美洲最古老的犬系之一，或为随古代人类抵达的犬只后代。",
        "🦴 它们于 1970 年代在南卡罗来纳州和佐治亚州的沼泽中被重新发现，当时仍野生生存。",
        "🕳️ 它们会挖掘独特的“鼻坑”——地面上的小洞——这一行为与澳洲野犬相同。",
        "🐕 它们的绰号包括“美洲野犬”“迪克西野犬”和“黄狗”。",
        "🔬 我们的大部分认识来自生态学家 I. Lehr Brisbin 博士数十年的研究。"
      ]
    }
  },
  {
    slug: 'mountain-cur', name: 'Mountain Cur', emoji: '🐕', api: null,
    badge: 'UKC', size: 'medium', weight: '30–60 lbs', height: '16–26 in',
    lifespan: '12–16 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Short, dense', shedding: 'Moderate', origin: 'United States (Appalachia)',
    recognition: 'UKC recognized', group: 'Working / Hound',
    subtitle: 'Working Group · Purebred · The pioneer\'s rugged Appalachian treeing dog',
    keywords: 'mountain cur appalachia treeing squirrel raccoon hunting pioneer settler working stock dog ohio kentucky tennessee',
    overview: [
      "The Mountain Cur is a hardy American working dog that helped settlers survive in the Appalachian and Ohio Valley frontier. Pioneers relied on these dogs to tree game for food and fur, drive livestock, and guard isolated cabins. By the mid-20th century the breed nearly disappeared as families left the land, but a small group of dedicated breeders revived it starting in the 1950s.",
      "Built for stamina and grit, the Mountain Cur is courageous, intelligent, and intensely devoted to its work and family. It is a natural treeing dog with a strong prey drive and an independent mind. These are not couch dogs — they need an active, outdoorsy home with plenty of exercise and ideally a job, but reward the right owner with fierce loyalty."
    ],
    temperament: "The Mountain Cur is brave, energetic, and loyal, bred for relentless work in rough country. It is protective of family and naturally reserved with strangers, needing exercise and purpose to thrive.",
    traitBullets: [
      "Tireless worker — bred to tree game and drive stock all day",
      "Courageous and protective — a capable watchdog",
      "High prey drive — caution around small animals",
      "Intelligent but independent — needs consistent training",
      "Best for active, rural, or hunting households",
      "Extremely hardy with few health problems"
    ],
    health: ['Generally very hardy', 'Hip dysplasia (uncommon)', 'Ear infections', 'Minor cuts/injuries from work'],
    facts: [
      "🪓 The Mountain Cur was essential to American frontier survival — treeing game for food and fur and guarding the homestead.",
      "📉 The breed nearly went extinct in the 1940s–50s as rural families moved to cities.",
      "🐿️ They are prized \"treeing\" dogs, chasing squirrels and raccoons up trees and barking to alert the hunter.",
      "🏛️ Four men — including Hugh Stephens and Carl McConnell — are credited with formally saving the breed in 1957.",
      "🌲 The breed thrives in rugged terrain and is renowned for its endurance and toughness."
    ],
    related: [
      { slug: 'black-mouth-cur', name: 'Black Mouth Cur', emoji: '🐕' },
      { slug: 'mountain-feist', name: 'Mountain Feist', emoji: '🐕' },
      { slug: 'american-leopard-hound', name: 'American Leopard Hound', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 3, 'Energy Level': 5, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 3, cats: 2, apartment: 1, firstTime: 2, hot: 4 },
    zh: {
      name: '山地卡',
      subtitle: '工作犬组 · 纯种犬 · 拓荒者强健的阿巴拉契亚追树犬',
      overview: [
        "山地卡是一种强健的美国工作犬，曾帮助拓荒者在阿巴拉契亚和俄亥俄河谷边疆生存。先驱者依靠这些狗将猎物追上树以获取食物和毛皮、驱赶牲畜并守卫偏远小屋。到 20 世纪中叶，随着家庭离开土地，该品种几近消失，但一小群专注的育种者自 1950 年代起将其复兴。",
        "山地卡为耐力和坚韧而生，勇敢、聪明，对工作和家庭极度忠诚。它是天生的追树犬，具有强烈的捕猎驱动力和独立的头脑。它们绝非沙发犬——需要活跃、热爱户外的家庭、大量运动以及理想情况下的一份工作，但会以坚定的忠诚回报合适的主人。"
      ],
      temperament: "山地卡勇敢、精力充沛、忠诚，专为在崎岖山野中不懈工作而培育。它保护家人，对陌生人天性保留，需要运动和使命才能茁壮成长。",
      facts: [
        "🪓 山地卡对美国边疆生存至关重要——追树猎物以获取食物和毛皮，并守卫家园。",
        "📉 该品种在 1940–50 年代因农村家庭迁往城市而几近灭绝。",
        "🐿️ 它们是珍贵的“追树”犬，将松鼠和浣熊追上树并吠叫提醒猎人。",
        "🏛️ 包括 Hugh Stephens 和 Carl McConnell 在内的四人被认为于 1957 年正式拯救了该品种。",
        "🌲 该品种在崎岖地形中茁壮成长，以耐力和坚韧著称。"
      ]
    }
  },
  {
    slug: 'mcnab-dog', name: 'McNab Dog', emoji: '🐕‍🦺', api: null,
    badge: 'Rare', size: 'medium', weight: '30–65 lbs', height: '16–25 in',
    lifespan: '13–16 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Short, slick', shedding: 'Low–Moderate', origin: 'United States (California)',
    recognition: 'Regional registries (working herding breed)', group: 'Herding',
    subtitle: 'Herding Group · Purebred · California\'s tireless ranch herding dog',
    keywords: 'mcnab dog shepherd california ranch herding stock dog border collie alexander mcnab scotch collie working',
    overview: [
      "The McNab Dog (or McNab Shepherd) is an American herding breed developed in the late 1800s on the Mendocino County ranch of Scottish immigrant Alexander McNab. He crossed his imported Scotch Collies with local dogs to create a herder suited to California's hot, rugged ranchland — one that could work cattle and sheep tirelessly in heat that exhausted other breeds.",
      "Lean, athletic, and slick-coated, the McNab is built for stamina and agility. They are highly intelligent and intensely driven, with a strong but gentler herding style than the Border Collie. Devoted and eager to work, they make excellent ranch dogs and active companions, but their energy and need for a job make them a poor fit for sedentary homes."
    ],
    temperament: "McNab Dogs are intelligent, energetic, and devoted, bred for all-day herding in tough conditions. They bond closely with their handler and need substantial exercise and mental work to be content.",
    traitBullets: [
      "Exceptional herding ability — works cattle and sheep with stamina",
      "Highly intelligent and trainable — quick to learn",
      "Athletic and heat-tolerant — built for hot ranchland",
      "Strong work drive — needs a job or active lifestyle",
      "Loyal and bonded to its handler",
      "Low-maintenance, weather-resistant slick coat"
    ],
    health: ['Generally very healthy', 'Hip dysplasia (uncommon)', 'Eye issues (rare)', 'Hardy working build'],
    facts: [
      "🏔️ The breed was created by Scottish rancher Alexander McNab in Mendocino County, California, in the 1880s.",
      "☀️ McNabs were bred to handle California heat that exhausted traditional collies.",
      "🐂 They use a unique \"heeler and header\" style, working both ends of livestock as needed.",
      "🐾 Many McNabs have distinctive cat-like, single-coated feet that help them move over rough terrain.",
      "🤠 They remain a beloved working ranch dog across the American West, though still relatively unknown elsewhere."
    ],
    related: [
      { slug: 'border-collie', name: 'Border Collie', emoji: '🐕' },
      { slug: 'english-shepherd', name: 'English Shepherd', emoji: '🐕' },
      { slug: 'australian-shepherd', name: 'Australian Shepherd', emoji: '🐕' }
    ],
    traits: { Trainability: 5, Friendliness: 4, 'Energy Level': 5, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 4, cats: 3, apartment: 1, firstTime: 2, hot: 5 },
    zh: {
      name: '麦克纳布犬',
      subtitle: '牧羊犬组 · 纯种犬 · 加州不知疲倦的牧场牧羊犬',
      overview: [
        "麦克纳布犬（或称麦克纳布牧羊犬）是一种美国牧羊犬，于 19 世纪末由苏格兰移民 Alexander McNab 在门多西诺县的牧场培育。他将进口的苏格兰柯利犬与当地犬只杂交，创造出一种适合加州炎热崎岖牧场的牧羊犬——能在让其他品种精疲力竭的高温下不知疲倦地放牧牛羊。",
        "精瘦、运动、被毛光滑，麦克纳布犬为耐力和敏捷而生。它们高度聪慧、驱动力强，牧羊风格虽强势但比边境牧羊犬更温和。忠诚且渴望工作，它们是出色的牧场犬和活跃的伴侣，但其精力和对工作的需求使其不适合久坐的家庭。"
      ],
      temperament: "麦克纳布犬聪明、精力充沛、忠诚，专为在艰苦条件下整日放牧而培育。它们与主人羁绊紧密，需要大量运动和脑力工作才能满足。",
      facts: [
        "🏔️ 该品种由苏格兰牧场主 Alexander McNab 于 1880 年代在加州门多西诺县创造。",
        "☀️ 麦克纳布犬专为应对让传统柯利犬精疲力竭的加州高温而培育。",
        "🐂 它们采用独特的“赶头加赶尾”风格，根据需要在牲畜两端工作。",
        "🐾 许多麦克纳布犬有独特的猫状单层被毛足，帮助它们在崎岖地形上移动。",
        "🤠 它们至今仍是整个美国西部受喜爱的工作牧场犬，尽管在其他地区仍相对鲜为人知。"
      ]
    }
  },
  {
    slug: 'english-shepherd', name: 'English Shepherd', emoji: '🐕', api: null,
    badge: 'UKC', size: 'medium', weight: '40–70 lbs', height: '18–24 in',
    lifespan: '12–15 yrs', energyLabel: 'Medium–High', energy: 'high', kids: 'yes',
    coat: 'Medium, double', shedding: 'Moderate–High', origin: 'United States',
    recognition: 'UKC recognized', group: 'Herding / Farm',
    subtitle: 'Herding Group · Purebred · The classic all-purpose American farm dog',
    keywords: 'english shepherd farm collie american all purpose herding stock dog chore family homestead farmhand',
    overview: [
      "The English Shepherd is a traditional American farm dog descended from the working collies and shepherd dogs brought by British settlers. For generations it was the quintessential homestead \"farm collie\" — herding livestock, controlling vermin, guarding the property, and serving as a trusted family companion, all in one capable package.",
      "English Shepherds are intelligent, adaptable, and deeply bonded to their families. They are independent decision-makers with a calm, sensible temperament — less intense than a Border Collie but every bit as smart. They excel at farm work, dog sports, and family life, provided they get the daily exercise and mental engagement their busy minds need."
    ],
    temperament: "English Shepherds are smart, loyal, and adaptable, with a calm but hardworking nature. They bond strongly with family, are protective without being aggressive, and need a job or activity to feel fulfilled.",
    traitBullets: [
      "Versatile all-purpose farm dog — herds, guards, and controls vermin",
      "Highly intelligent and independent problem-solver",
      "Calm and sensible — less frantic than other herders",
      "Devoted and protective of family and territory",
      "Needs daily exercise and mental stimulation",
      "Adaptable to farm, suburban, or active family life"
    ],
    health: ['Hip dysplasia', 'MDR1 drug sensitivity (some)', 'Elbow dysplasia', 'Eye issues', 'Generally robust'],
    facts: [
      "🚜 The English Shepherd is often called the original American \"farm collie\" — a jack-of-all-trades homestead dog.",
      "🧠 They are renowned independent thinkers, capable of managing livestock chores with minimal direction.",
      "🐈 Traditional farm English Shepherds also controlled rats and other vermin around the barn.",
      "🌎 Despite the name, the breed was developed and refined in the United States, not England.",
      "🏅 They excel in modern dog sports like agility, herding trials, and search-and-rescue."
    ],
    related: [
      { slug: 'border-collie', name: 'Border Collie', emoji: '🐕' },
      { slug: 'mcnab-dog', name: 'McNab Dog', emoji: '🐕‍🦺' },
      { slug: 'australian-shepherd', name: 'Australian Shepherd', emoji: '🐕' }
    ],
    traits: { Trainability: 5, Friendliness: 4, 'Energy Level': 4, 'Good with Kids': 5, Alertness: 5 },
    compat: { kids: 5, dogs: 4, cats: 3, apartment: 2, firstTime: 3, hot: 3 },
    zh: {
      name: '英国牧羊犬（农场型）',
      subtitle: '牧羊犬组 · 纯种犬 · 经典的美国全能农场犬',
      overview: [
        "英国牧羊犬是一种传统的美国农场犬，源自英国移民带来的工作柯利犬和牧羊犬。数代以来，它一直是典型的家园“农场柯利”——牧畜、灭鼠、守卫财产，并兼任值得信赖的家庭伴侣，一身多能。",
        "英国牧羊犬聪明、适应力强，与家人羁绊深厚。它们是独立的决策者，性情沉稳理智——不像边境牧羊犬那样激烈，却同样聪慧。只要获得忙碌头脑所需的每日运动和脑力投入，它们在农场工作、犬类运动和家庭生活中都表现出色。"
      ],
      temperament: "英国牧羊犬聪明、忠诚、适应力强，天性沉稳而勤劳。它们与家人羁绊深厚，有保护欲但不具攻击性，需要工作或活动才能感到满足。",
      facts: [
        "🚜 英国牧羊犬常被称为最初的美国“农场柯利”——一身多能的家园万事通。",
        "🧠 它们是著名的独立思考者，能在极少指挥下管理牲畜杂务。",
        "🐈 传统农场英国牧羊犬还负责控制谷仓周围的老鼠和其他害兽。",
        "🌎 尽管名为英国，该品种实际是在美国而非英格兰培育和完善的。",
        "🏅 它们在敏捷、牧羊比赛和搜救等现代犬类运动中表现出色。"
      ]
    }
  },
  {
    slug: 'teddy-roosevelt-terrier', name: 'Teddy Roosevelt Terrier', emoji: '🐕', api: null,
    badge: 'UKC', size: 'small', weight: '8–25 lbs', height: '8–15 in',
    lifespan: '14–16 yrs', energyLabel: 'Medium–High', energy: 'high', kids: 'yes',
    coat: 'Short, smooth', shedding: 'Low–Moderate', origin: 'United States',
    recognition: 'UKC recognized', group: 'Terrier',
    subtitle: 'Terrier Group · Purebred · A low-set, muscular American ratting terrier',
    keywords: 'teddy roosevelt terrier short legged rat terrier ratting feist vermin farm small muscular american',
    overview: [
      "The Teddy Roosevelt Terrier is a short-legged, muscular American terrier closely related to the Rat Terrier, with which it shares ancestry from the farm ratting dogs of the 1800s. It is named in honor of President Theodore Roosevelt, an avid outdoorsman often associated with this type of working terrier. The breed was separated from the longer-legged Rat Terrier and recognized in its own right by the UKC in 1999.",
      "Compact and sturdy with a low-slung build, the \"Teddy\" is intelligent, lively, and affectionate. Bred to hunt rats and other vermin, it retains a strong prey drive and a confident, comical personality. They are devoted family companions that bond closely with their people, trainable and adaptable to homes of all sizes when given enough activity."
    ],
    temperament: "Teddy Roosevelt Terriers are smart, affectionate, and lively, combining terrier spunk with a devoted, people-loving nature. They are alert and energetic but settle happily as loyal lap companions.",
    traitBullets: [
      "Intelligent and trainable — eager to please its people",
      "Affectionate and bonded — loves close family time",
      "Strong prey drive — natural ratter, caution with small pets",
      "Energetic but adaptable — suits houses or apartments",
      "Confident, comical personality",
      "Low-maintenance smooth coat"
    ],
    health: ['Luxating patella', 'Allergies', 'Hip issues (uncommon)', 'Generally long-lived and hardy'],
    facts: [
      "🇺🇸 The breed is named after President Theodore \"Teddy\" Roosevelt, a famous outdoorsman and dog lover.",
      "📏 It is distinguished from the Rat Terrier mainly by its shorter legs and more muscular, low-set body.",
      "🐀 Like its cousins, it was bred as a relentless farm ratter and vermin hunter.",
      "🏆 The UKC recognized the Teddy Roosevelt Terrier as a separate breed in 1999.",
      "💛 Despite its working roots, the \"Teddy\" is an affectionate, devoted companion that loves to cuddle."
    ],
    related: [
      { slug: 'rat-terrier', name: 'Rat Terrier', emoji: '🐕' },
      { slug: 'mountain-feist', name: 'Mountain Feist', emoji: '🐕' },
      { slug: 'toy-fox-terrier', name: 'Toy Fox Terrier', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 4, 'Energy Level': 4, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 4, cats: 2, apartment: 4, firstTime: 4, hot: 3 },
    zh: {
      name: '泰迪罗斯福梗',
      subtitle: '梗犬组 · 纯种犬 · 矮脚强健的美国捕鼠梗',
      overview: [
        "泰迪罗斯福梗是一种矮脚、肌肉发达的美国梗犬，与捕鼠梗关系密切，二者都源自 19 世纪的农场捕鼠犬。它以热爱户外的西奥多·罗斯福总统命名，这位总统常与这类工作梗犬联系在一起。该品种从腿较长的捕鼠梗中分离出来，并于 1999 年获 UKC 独立认可。",
        "体格紧凑结实、身形低矮，“泰迪”聪明、活泼、深情。它被培育用于捕猎老鼠和其他害兽，保留了强烈的捕猎驱动力和自信、滑稽的个性。它们是忠诚的家庭伴侣，与主人羁绊紧密，易于训练，在获得足够活动量时能适应各种大小的家庭。"
      ],
      temperament: "泰迪罗斯福梗聪明、深情、活泼，兼具梗犬的活力与忠诚爱人的天性。它们警觉、精力充沛，却也能愉快地安顿下来成为忠实的膝上伴侣。",
      facts: [
        "🇺🇸 该品种以著名的户外运动家和爱犬人士西奥多·“泰迪”·罗斯福总统命名。",
        "📏 它主要凭借更短的腿和更强健、低矮的身躯与捕鼠梗区分开来。",
        "🐀 与其近亲一样，它被培育为不知疲倦的农场捕鼠犬和害兽猎手。",
        "🏆 UKC 于 1999 年将泰迪罗斯福梗认可为独立品种。",
        "💛 尽管有工作犬血统，“泰迪”是深情忠诚的伴侣，喜欢依偎撒娇。"
      ]
    }
  },
  {
    slug: 'olde-english-bulldogge', name: 'Olde English Bulldogge', emoji: '🐶', api: null,
    badge: 'Rare', size: 'large', weight: '50–80 lbs', height: '16–20 in',
    lifespan: '9–14 yrs', energyLabel: 'Medium', energy: 'medium', kids: 'yes',
    coat: 'Short, smooth', shedding: 'Moderate', origin: 'United States',
    recognition: 'Breed registries (Leavitt / IOEBA)', group: 'Working / Guardian',
    subtitle: 'Working Group · Purebred · A healthier, athletic re-creation of the old bulldog',
    keywords: 'olde english bulldogge leavitt bulldog healthy athletic working guardian reconstructed bull baiting victorian',
    overview: [
      "The Olde English Bulldogge is a modern American breed created by David Leavitt in the 1970s, who set out to re-create the athletic, healthy bulldog of the early 1800s — before generations of show breeding gave the English Bulldog its many health problems. By blending English Bulldog, American Bulldog, Bullmastiff, and American Pit Bull Terrier, Leavitt produced a dog with the classic bulldog look but far better health and mobility.",
      "The result is a muscular, confident, and capable dog that can breathe, run, and reproduce naturally — things the modern English Bulldog often struggles with. Olde English Bulldogges are friendly, courageous, and devoted family companions with a calm temperament and a protective streak. They need moderate exercise and benefit from early socialization and consistent training."
    ],
    temperament: "Olde English Bulldogges are confident, friendly, and courageous, combining a calm family-dog temperament with natural protectiveness. They are devoted to their people and gentler than their imposing build suggests.",
    traitBullets: [
      "Healthier, more athletic than the modern English Bulldog",
      "Confident and courageous — a capable guardian",
      "Friendly and devoted to family, good with children",
      "Calm indoors but enjoys moderate daily exercise",
      "Benefits from early socialization and firm, kind training",
      "Better breathing and mobility than show bulldogs"
    ],
    health: ['Hip/elbow dysplasia', 'Some brachycephalic risk (reduced)', 'Skin fold issues', 'Bloat', 'ACL injuries'],
    facts: [
      "🛠️ The breed was created in the 1970s by David Leavitt specifically to fix the health problems of the modern English Bulldog.",
      "📜 Leavitt aimed to recreate the leaner, athletic \"Regency\" bulldog of around 1820.",
      "🫁 Unlike many show bulldogs, Olde English Bulldogges can typically breathe, run, and give birth naturally.",
      "🧬 Its foundation includes English Bulldog, American Bulldog, Bullmastiff, and American Pit Bull Terrier.",
      "🏛️ Several registries now maintain the breed, including the IOEBA and the Leavitt Bulldog Association."
    ],
    related: [
      { slug: 'bulldog', name: 'Bulldog', emoji: '🐶' },
      { slug: 'american-bulldog', name: 'American Bulldog', emoji: '🐶' },
      { slug: 'bullmastiff', name: 'Bullmastiff', emoji: '🐶' }
    ],
    traits: { Trainability: 4, Friendliness: 5, 'Energy Level': 3, 'Good with Kids': 5, Protectiveness: 4 },
    compat: { kids: 5, dogs: 3, cats: 3, apartment: 3, firstTime: 3, hot: 2 },
    zh: {
      name: '古式英国斗牛犬',
      subtitle: '工作犬组 · 纯种犬 · 更健康、运动型的古老斗牛犬再造',
      overview: [
        "古式英国斗牛犬是由 David Leavitt 于 1970 年代创造的现代美国犬种，他立志重现 19 世纪初——在数代展示型育种给英国斗牛犬带来诸多健康问题之前——那种运动、健康的斗牛犬。通过融合英国斗牛犬、美国斗牛犬、斗牛獒和美国比特犬，Leavitt 培育出一种保留经典斗牛犬外形但健康和活动能力大大改善的狗。",
        "成果是一只肌肉发达、自信、能干的狗，能够自然呼吸、奔跑和繁殖——这些都是现代英国斗牛犬常常难以做到的。古式英国斗牛犬友善、勇敢，是忠诚的家庭伴侣，性情沉稳并带有保护欲。它们需要适度运动，并受益于早期社会化和一致的训练。"
      ],
      temperament: "古式英国斗牛犬自信、友善、勇敢，兼具沉稳的家庭犬性情与天生的保护欲。它们对主人忠诚，比其魁梧体格所暗示的更为温和。",
      facts: [
        "🛠️ 该品种于 1970 年代由 David Leavitt 创造，专门用于解决现代英国斗牛犬的健康问题。",
        "📜 Leavitt 旨在重现约 1820 年更精瘦、运动型的“摄政时期”斗牛犬。",
        "🫁 与许多展示型斗牛犬不同，古式英国斗牛犬通常能够自然呼吸、奔跑和分娩。",
        "🧬 其基础血统包括英国斗牛犬、美国斗牛犬、斗牛獒和美国比特犬。",
        "🏛️ 目前已有多个登记机构维护该品种，包括 IOEBA 和 Leavitt 斗牛犬协会。"
      ]
    }
  },
  {
    slug: 'alapaha-blue-blood-bulldog', name: 'Alapaha Blue Blood Bulldog', emoji: '🐶', api: null,
    badge: 'Rare', size: 'large', weight: '55–90 lbs', height: '18–24 in',
    lifespan: '12–14 yrs', energyLabel: 'Medium', energy: 'medium', kids: 'yes',
    coat: 'Short, stiff', shedding: 'Moderate', origin: 'United States (Georgia)',
    recognition: 'Rare-breed registries', group: 'Working / Guardian',
    subtitle: 'Working Group · Purebred · A rare, devoted plantation guardian from Georgia',
    keywords: 'alapaha blue blood bulldog georgia plantation guardian otto lane buck rare protective family southern',
    overview: [
      "The Alapaha Blue Blood Bulldog is a rare working bulldog from the Alapaha River region of southern Georgia. It was carefully preserved through the 20th century by the Lane family, who bred down from a beloved foundation dog to keep alive the old Southern plantation bulldog type used to guard property and manage livestock.",
      "Striking and athletic, the Alapaha typically shows a flashy white coat marked with patches of merle, brindle, or color, often with blue eyes. They are highly protective, intelligent, and devoted to their families — confident guardians that are gentle and loving at home but naturally suspicious of outsiders. Their strong territorial instincts mean they need an experienced owner committed to early socialization and training."
    ],
    temperament: "Alapaha Blue Blood Bulldogs are loyal, protective, and intelligent, forming intense bonds with their families. They are confident natural guardians that require early socialization and firm, consistent leadership.",
    traitBullets: [
      "Devoted and protective — a serious natural guardian",
      "Intelligent and responsive to consistent training",
      "Gentle and loving with its own family, including children",
      "Naturally wary of strangers — needs early socialization",
      "Athletic and agile for a bulldog-type breed",
      "Best for experienced owners who can provide leadership"
    ],
    health: ['Hip dysplasia', 'Deafness (linked to white/merle coat)', 'Entropion', 'Skin issues', 'Generally hardy'],
    facts: [
      "🌊 The breed is named for the Alapaha River in southern Georgia.",
      "👨‍👩‍👧 It was saved largely through the efforts of the Lane family, especially Buck Lane and his dog \"Otto.\"",
      "🛡️ Alapahas were traditionally used to guard plantations and catch livestock.",
      "💙 The name \"Blue Blood\" reflects both the breed's prized bloodlines and the blue eyes and merle coloring many display.",
      "🐕 It remains one of America's rarest bulldog breeds, maintained by dedicated preservation breeders."
    ],
    related: [
      { slug: 'american-bulldog', name: 'American Bulldog', emoji: '🐶' },
      { slug: 'olde-english-bulldogge', name: 'Olde English Bulldogge', emoji: '🐶' },
      { slug: 'catahoula-leopard-dog', name: 'Catahoula Leopard Dog', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 3, 'Energy Level': 3, 'Good with Kids': 4, Protectiveness: 5 },
    compat: { kids: 4, dogs: 2, cats: 2, apartment: 2, firstTime: 1, hot: 3 },
    zh: {
      name: '阿拉帕哈蓝血斗牛犬',
      subtitle: '工作犬组 · 纯种犬 · 来自佐治亚州的稀有忠诚庄园守护犬',
      overview: [
        "阿拉帕哈蓝血斗牛犬是一种来自佐治亚州南部阿拉帕哈河流域的稀有工作斗牛犬。整个 20 世纪，它由 Lane 家族精心保育，他们以一只深受喜爱的基础种犬为起点繁育，以延续用于守卫财产和管理牲畜的古老南方庄园斗牛犬类型。",
        "阿拉帕哈犬醒目而运动，通常拥有亮眼的白色被毛，间杂陨色、虎斑或彩色斑块，常带蓝眼睛。它们保护欲极强、聪明，对家人忠诚——是自信的守护者，在家温柔慈爱，却天生对外人警惕。强烈的领地本能意味着它们需要一位致力于早期社会化和训练的有经验主人。"
      ],
      temperament: "阿拉帕哈蓝血斗牛犬忠诚、有保护欲、聪明，与家人建立深厚羁绊。它们是自信的天生守护者，需要早期社会化和坚定一致的领导。",
      facts: [
        "🌊 该品种以佐治亚州南部的阿拉帕哈河命名。",
        "👨‍👩‍👧 它主要通过 Lane 家族（尤其是 Buck Lane 和他的狗“Otto”）的努力得以保存。",
        "🛡️ 阿拉帕哈犬传统上用于守卫庄园和制服牲畜。",
        "💙 “蓝血”之名既反映了该品种珍贵的血统，也指许多个体所展现的蓝眼睛和陨色被毛。",
        "🐕 它至今仍是美国最稀有的斗牛犬品种之一，由专注的保育育种者维护。"
      ]
    }
  },
  {
    slug: 'american-leopard-hound', name: 'American Leopard Hound', emoji: '🐕', api: null,
    badge: 'UKC', size: 'large', weight: '45–75 lbs', height: '21–27 in',
    lifespan: '12–15 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Short, dense', shedding: 'Moderate', origin: 'United States',
    recognition: 'UKC recognized · AKC Foundation Stock Service', group: 'Hound / Treeing',
    subtitle: 'Hound Group · Purebred · One of America\'s oldest treeing hounds',
    keywords: 'american leopard hound leopard cur treeing hound hunting squirrel raccoon bear merle spotted oldest',
    overview: [
      "The American Leopard Hound is one of the oldest tree-hunting dog breeds in the United States, with roots tracing back to dogs brought by early settlers and possibly Spanish conquistadors. Long known as the \"Leopard Cur,\" it was renamed to better reflect its hound heritage and was accepted into the AKC's Foundation Stock Service.",
      "Bred to track and tree game — from squirrels and raccoons to bobcats and bears — the American Leopard Hound is hardy, fast, and tireless, with an excellent nose and a strong, melodious bark. Many display an attractive spotted or merle \"leopard\" coat. At home they are affectionate, loyal, and good with children, but their high energy and hunting drive make them best suited to active or hunting households."
    ],
    temperament: "American Leopard Hounds are intelligent, energetic, and affectionate, combining a strong hunting drive with a devoted family nature. They are loyal and gentle at home but need plenty of exercise and outlets for their instincts.",
    traitBullets: [
      "Skilled treeing hunter — excellent nose and stamina",
      "Affectionate and loyal with family, good with kids",
      "High energy — needs vigorous daily exercise",
      "Intelligent and trainable with patience",
      "Strong prey drive — caution around small animals",
      "Hardy, weather-resistant working breed"
    ],
    health: ['Hip dysplasia', 'Generally very healthy', 'Ear infections', 'Eye issues (rare)'],
    facts: [
      "🌳 The American Leopard Hound is considered one of the oldest treeing breeds in the United States.",
      "🐆 It was historically known as the \"Leopard Cur\" for its spotted, merle-patterned coat.",
      "🐻 The breed has been used to tree everything from squirrels and raccoons to bobcats and bears.",
      "🏆 It joined the AKC Foundation Stock Service in 2012 and is fully recognized by the UKC.",
      "🎶 Hunters prize its loud, clear bark, which helps them locate the dog when it has treed game."
    ],
    related: [
      { slug: 'catahoula-leopard-dog', name: 'Catahoula Leopard Dog', emoji: '🐕' },
      { slug: 'mountain-cur', name: 'Mountain Cur', emoji: '🐕' },
      { slug: 'black-mouth-cur', name: 'Black Mouth Cur', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 4, 'Energy Level': 5, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 4, cats: 2, apartment: 1, firstTime: 2, hot: 4 },
    zh: {
      name: '美国豹纹猎犬',
      subtitle: '猎犬组 · 纯种犬 · 美国最古老的追树猎犬之一',
      overview: [
        "美国豹纹猎犬是美国最古老的追树猎犬品种之一，其渊源可追溯至早期移民乃至西班牙征服者带来的犬只。它长期以“豹纹卡”之名为人所知，后更名以更好地反映其猎犬血统，并被纳入 AKC 基础种群服务。",
        "它被培育用于追踪并将猎物逼上树——从松鼠、浣熊到山猫和熊——美国豹纹猎犬强健、迅捷、不知疲倦，拥有出色的嗅觉和洪亮悦耳的吠声。许多个体展现迷人的斑点或陨色“豹纹”被毛。在家中它们深情、忠诚、与孩子相处融洽，但旺盛的精力和狩猎驱动力使其最适合活跃或狩猎家庭。"
      ],
      temperament: "美国豹纹猎犬聪明、精力充沛、深情，兼具强烈的狩猎驱动力与忠诚的家庭天性。它们在家忠诚温柔，但需要大量运动和发泄本能的途径。",
      facts: [
        "🌳 美国豹纹猎犬被认为是美国最古老的追树品种之一。",
        "🐆 因其斑点、陨色花纹被毛，它历史上被称为“豹纹卡”。",
        "🐻 该品种曾被用于将从松鼠、浣熊到山猫和熊的各种猎物逼上树。",
        "🏆 它于 2012 年加入 AKC 基础种群服务，并获 UKC 完全认可。",
        "🎶 猎人珍视它洪亮清晰的吠声，便于在它将猎物逼上树后定位犬只。"
      ]
    }
  },
  {
    slug: 'mountain-feist', name: 'Mountain Feist', emoji: '🐕', api: null,
    badge: 'UKC', size: 'small', weight: '12–30 lbs', height: '10–18 in',
    lifespan: '13–18 yrs', energyLabel: 'High', energy: 'high', kids: 'yes',
    coat: 'Short, smooth', shedding: 'Low', origin: 'United States (Appalachia/South)',
    recognition: 'UKC recognized', group: 'Hunting / Terrier-type',
    subtitle: 'Hunting Type · Purebred · The spirited little squirrel dog of the rural South',
    keywords: 'mountain feist squirrel dog feist treeing small hunting terrier appalachia southern usa lincoln faulkner',
    overview: [
      "The Mountain Feist is a small, energetic American hunting dog bred for generations in the rural South and Appalachia to tree squirrels and other small game. \"Feist\" is an old term for a small, lively dog, and these compact hunters are exactly that — fast, fearless, and tenacious well beyond their size. They have been part of American country life since colonial times; even George Washington and Abraham Lincoln referenced feists.",
      "Mountain Feists are alert, intelligent, and devoted, combining a fierce hunting drive in the field with an affectionate, playful nature at home. They are quick learners and adaptable, fitting well into active families, though their energy and prey drive mean they need real exercise and stimulation. Low-maintenance and famously healthy, many live well into their teens."
    ],
    temperament: "Mountain Feists are lively, brave, and affectionate, pairing an intense hunting drive with a loving family disposition. They are smart and trainable but need daily activity to channel their boundless energy.",
    traitBullets: [
      "Tenacious squirrel and small-game hunter — fearless in the field",
      "Affectionate and playful family companion at home",
      "Intelligent and quick to learn",
      "High energy — needs daily exercise and play",
      "Strong prey drive — caution with small pets",
      "Low-maintenance coat and remarkably long-lived"
    ],
    health: ['Generally very healthy', 'Luxating patella (uncommon)', 'Allergies (rare)', 'Long lifespan'],
    facts: [
      "🐿️ The Mountain Feist is America's classic \"squirrel dog,\" bred to tree small game across the rural South.",
      "📜 \"Feist\" is a centuries-old word for a small, feisty dog; George Washington wrote of a \"small foist\" in his diary.",
      "🎩 Abraham Lincoln mentioned feists in his poem \"The Bear Hunt.\"",
      "💪 The breed is famous for its hardiness and long lifespan, often reaching 15–18 years.",
      "🏆 The UKC officially recognized the Mountain Feist in 2015."
    ],
    related: [
      { slug: 'rat-terrier', name: 'Rat Terrier', emoji: '🐕' },
      { slug: 'teddy-roosevelt-terrier', name: 'Teddy Roosevelt Terrier', emoji: '🐕' },
      { slug: 'mountain-cur', name: 'Mountain Cur', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 4, 'Energy Level': 5, 'Good with Kids': 4, Alertness: 5 },
    compat: { kids: 4, dogs: 4, cats: 2, apartment: 3, firstTime: 3, hot: 4 },
    zh: {
      name: '山地费斯特犬',
      subtitle: '狩猎犬型 · 纯种犬 · 美国南方乡村活泼的小型松鼠犬',
      overview: [
        "山地费斯特犬是一种小型、精力充沛的美国狩猎犬，数代以来在美国南方乡村和阿巴拉契亚地区被培育用于将松鼠和其他小猎物逼上树。“Feist”是对小型活泼犬的古老称呼，而这些体格紧凑的猎手正是如此——迅捷、无畏、坚韧远超其体型。自殖民时代起，它们就是美国乡村生活的一部分；连乔治·华盛顿和亚伯拉罕·林肯都提到过费斯特犬。",
        "山地费斯特犬警觉、聪明、忠诚，在野外拥有凶猛的狩猎驱动力，在家则有深情顽皮的天性。它们学得快、适应力强，很适合活跃的家庭，不过其精力和捕猎驱动力意味着它们需要真正的运动和刺激。它们打理简单、以健康著称，许多能活到十几岁高龄。"
      ],
      temperament: "山地费斯特犬活泼、勇敢、深情，兼具强烈的狩猎驱动力与慈爱的家庭性情。它们聪明易训，但需要每日活动来引导其无穷的精力。",
      facts: [
        "🐿️ 山地费斯特犬是美国经典的“松鼠犬”，被培育用于在南方乡村将小猎物逼上树。",
        "📜 “Feist”是一个数百年历史的词，指小型活泼的狗；乔治·华盛顿曾在日记中写到一只“small foist”。",
        "🎩 亚伯拉罕·林肯在他的诗作《猎熊》（The Bear Hunt）中提到过费斯特犬。",
        "💪 该品种以强健和长寿著称，常能活到 15–18 岁。",
        "🏆 UKC 于 2015 年正式认可了山地费斯特犬。"
      ]
    }
  },
  {
    slug: 'silken-windhound', name: 'Silken Windhound', emoji: '🐕', api: null,
    badge: 'ISWS', size: 'medium', weight: '20–55 lbs', height: '18–24 in',
    lifespan: '14–20 yrs', energyLabel: 'Medium', energy: 'medium', kids: 'yes',
    coat: 'Silky, medium', shedding: 'Moderate', origin: 'United States',
    recognition: 'ISWS · UKC recognized', group: 'Sighthound',
    subtitle: 'Sighthound · Purebred · A graceful, gentle small sighthound with a silky coat',
    keywords: 'silken windhound sighthound borzoi whippet silky coat francie stull graceful gentle lure coursing companion',
    overview: [
      "The Silken Windhound is a relatively new American sighthound, developed in the 1980s and 90s by Francie Stull from Borzoi and Whippet-type lines. Her goal was an elegant, mid-sized sighthound with a beautiful silky coat, sound temperament, and excellent health. The breed was officially established with the founding of the International Silken Windhound Society (ISWS) in 1999.",
      "Silken Windhounds combine the grace and speed of a sighthound with a notably affectionate, people-oriented personality. They are gentle, intelligent, and more trainable than many sighthounds, excelling at lure coursing, agility, and as devoted family companions. Their flowing silky coat is surprisingly low-maintenance, and the breed is known for remarkable health and longevity, with many living well into their late teens."
    ],
    temperament: "Silken Windhounds are gentle, affectionate, and intelligent, blending sighthound grace with an unusually people-loving nature. They are calm indoors, playful outdoors, and bond closely with their families.",
    traitBullets: [
      "Affectionate and people-oriented — loves close family bonds",
      "Graceful and athletic — excels at lure coursing and agility",
      "More trainable than most sighthounds",
      "Gentle and good with children and other dogs",
      "Calm indoors despite bursts of speed outside",
      "Remarkably healthy and long-lived"
    ],
    health: ['MDR1 drug sensitivity (test recommended)', 'Generally very healthy', 'Minor eye issues (rare)', 'Long lifespan'],
    facts: [
      "🧬 The Silken Windhound was created from Borzoi and Whippet lines by breeder Francie Stull.",
      "📅 The breed was formally established with the International Silken Windhound Society in 1999.",
      "🏃 They are accomplished lure coursers, combining speed with surprising agility.",
      "💆 Despite the elegant silky coat, grooming needs are modest — it rarely mats.",
      "🎂 Silken Windhounds are notably long-lived, with many reaching 17–20 years."
    ],
    related: [
      { slug: 'whippet', name: 'Whippet', emoji: '🐕' },
      { slug: 'borzoi', name: 'Borzoi', emoji: '🐕' },
      { slug: 'italian-greyhound', name: 'Italian Greyhound', emoji: '🐕' }
    ],
    traits: { Trainability: 4, Friendliness: 5, 'Energy Level': 3, 'Good with Kids': 5, Alertness: 4 },
    compat: { kids: 5, dogs: 5, cats: 3, apartment: 4, firstTime: 4, hot: 3 },
    zh: {
      name: '丝毛灵缇',
      subtitle: '视觉猎犬 · 纯种犬 · 拥有丝滑被毛的优雅温柔小型视觉猎犬',
      overview: [
        "丝毛灵缇是一种相对较新的美国视觉猎犬，由 Francie Stull 于 1980–90 年代以苏俄牧羊犬（Borzoi）和惠比特型血系培育而成。她的目标是培育一种优雅的中型视觉猎犬，拥有美丽的丝滑被毛、健全的性情和出色的健康。随着 1999 年国际丝毛灵缇协会（ISWS）的成立，该品种正式确立。",
        "丝毛灵缇兼具视觉猎犬的优雅与速度，以及格外深情、以人为本的个性。它们温柔、聪明，比许多视觉猎犬更易训练，在诱饵追逐、敏捷比赛中表现出色，也是忠诚的家庭伴侣。其飘逸的丝滑被毛打理起来出乎意料地简单，该品种以非凡的健康和长寿著称，许多个体能活到接近二十岁。"
      ],
      temperament: "丝毛灵缇温柔、深情、聪明，融合了视觉猎犬的优雅与异常爱人的天性。它们在室内安静，在户外顽皮，与家人羁绊紧密。",
      facts: [
        "🧬 丝毛灵缇由育种者 Francie Stull 以苏俄牧羊犬和惠比特血系培育而成。",
        "📅 该品种随 1999 年国际丝毛灵缇协会的成立而正式确立。",
        "🏃 它们是出色的诱饵追逐者，兼具速度与惊人的敏捷性。",
        "💆 尽管拥有优雅的丝滑被毛，其美容需求并不高——很少打结。",
        "🎂 丝毛灵缇格外长寿，许多个体能活到 17–20 岁。"
      ]
    }
  }
];

/* ── Generic helpers (parameterized content shared across breeds) ─────────────── */
const SIZE_LABEL = { small: 'Small', medium: 'Medium', large: 'Large', giant: 'Giant' };
const SIZE_LABEL_ZH = { small: '小型', medium: '中型', large: '大型', giant: '巨型' };
const ENERGY_LABEL_ZH = { low: '低', medium: '中等', high: '高' };

function stars(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
function cap(s) { return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '); }

function dietPortion(size) {
  return ({
    small:  ['½–1 cup/day', '¾–1¼ cups/day', '1–1½ cups/day', '3–4 small meals (puppy)'],
    medium: ['1–1½ cups/day', '1½–2 cups/day', '2–2½ cups/day', '3 meals (puppy)'],
    large:  ['2–2½ cups/day', '2½–3 cups/day', '3–4 cups/day', '3 meals (puppy)'],
    giant:  ['3–4 cups/day', '4–5 cups/day', '5–6 cups/day', '3 meals (puppy)']
  })[size];
}
function costRange(size) {
  return ({
    small:  ['$600–$1,800', '$1,800–$3,500', '$50–$400', '$90–$200'],
    medium: ['$600–$2,000', '$2,000–$4,000', '$50–$400', '$110–$230'],
    large:  ['$800–$2,500', '$2,500–$5,000', '$75–$450', '$130–$280'],
    giant:  ['$1,000–$3,000', '$3,000–$6,000', '$100–$500', '$160–$340']
  })[size];
}

module.exports = { BREEDS, SIZE_LABEL, SIZE_LABEL_ZH, ENERGY_LABEL_ZH, stars, cap, dietPortion, costRange };
console.log('Loaded', BREEDS.length, 'breed records (wave 1).');
