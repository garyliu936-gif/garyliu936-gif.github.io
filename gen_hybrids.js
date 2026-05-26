const fs = require('fs');
const path = require('path');
const TODAY = '2026-05-25';
const BREEDS_DIR = path.join(__dirname, 'breeds');
const INDEX_PATH = path.join(BREEDS_DIR, 'index.html');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const hybrids = [
  {
    slug: 'cavachon', name: 'Cavachon', num: 14,
    cross: 'Cavalier King Charles Spaniel × Bichon Frisé',
    tagline: 'A silky-soft, gentle lapdog that almost never sheds',
    weight: '15–35 lbs', height: '12–13 in', lifespan: '10–15 yrs', energy: 'Low',
    emoji: '🌸', api: 'cavalier',
    size: 'small', sLabel: 'Small', eFilter: 'low',
    keywords: 'cavachon cavalier bichon frise mix small fluffy gentle lapdog',
    shortDesc: 'Sweet, silky Cavalier × Bichon mix — gentle, low-shedding, and endlessly cuddly.',
    ov1: 'The Cavachon is a charming cross between the Cavalier King Charles Spaniel and the Bichon Frisé. This combination produces a small, silky-coated companion that inherits the Cavalier\'s warm, gentle temperament and the Bichon\'s cheerful, low-shedding coat. The result is one of the most loving and adaptable small dogs around.',
    ov2: 'Cavachons are equally at home in a city apartment or a suburban house. They bond deeply with their owners and get along beautifully with children, the elderly, and other pets. Their low exercise needs and quiet nature make them ideal companions for first-time dog owners and seniors alike.',
    traits: {gentleness:95, friendliness:95, energy:40, training:80, kids:95},
    qf: [
      '<strong>Hybrid:</strong> Cavalier King Charles Spaniel × Bichon Frisé',
      '<strong>Sizes:</strong> Toy (15–20 lbs), Standard (25–35 lbs)',
      '<strong>Coat:</strong> Silky, wavy, low-to-no shedding',
      '<strong>Colors:</strong> White, apricot, tan, tri-color',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — quiet and compact'
    ],
    health: ['Mitral valve disease (from Cavalier parent)', 'Syringomyelia (Cavalier risk)', 'Patellar luxation', 'Eye conditions'],
    diet: {
      puppy: {amount:'½–¾ cup', cal:'250–400 kcal'},
      adult: {amount:'¾–1 cup', cal:'350–500 kcal'},
      senior: {amount:'½–¾ cup', cal:'250–350 kcal'}
    },
    dietTips: ['Small-breed formula to match their tiny stomach size', 'Omega-3 supplements for silky coat maintenance', 'Dental chews or water additives — small breeds are prone to dental issues', 'Measured meals twice daily to prevent obesity'],
    cost: {puppy:'$800–$2,500', food:'$25–$40/mo', vet:'$300–$600/yr', groom:'$300–$500/yr', supplies:'$150–$300'},
    costNote: 'One of the more affordable small hybrids to own — low food costs, manageable grooming, and generally robust health.',
    mixes: [
      {n:'F1 Cavachon', d:'50% Cavalier, 50% Bichon. Classic wavy coat, gentle personality.'},
      {n:'F1B Cavachon', d:'F1 × Bichon. Even lower shedding, great for mild allergies.'},
      {n:'Mini Cavachon', d:'Cavalier × Toy Poodle/Bichon mix. Under 15 lbs.'},
      {n:'Cavapoo vs Cavachon', d:'Cavapoo uses Poodle instead of Bichon — curlier coat, similar temperament.'}
    ],
    facts: [
      '🌸 Cavachons are sometimes called "the forever puppy" because their round faces and soft coats keep them looking puppy-like for years.',
      '❤️ The Cavalier parent\'s empathetic nature means Cavachons are often used as comfort and emotional support animals.',
      '🤫 They are naturally quiet dogs — rarely nuisance barkers — making them ideal for apartments and condos.',
      '🧴 Their coat requires brushing 3–4 times per week to prevent matting, but sheds very little onto furniture and clothing.',
      '🏆 Cavachons consistently rank among the top 10 most popular designer dog breeds in the UK and Australia.'
    ]
  },
  {
    slug: 'morkie', name: 'Morkie', num: 15,
    cross: 'Maltese × Yorkshire Terrier',
    tagline: 'Tiny, feisty, and fiercely devoted — the ultimate purse dog with a big attitude',
    weight: '4–8 lbs', height: '6–9 in', lifespan: '12–15 yrs', energy: 'Medium',
    emoji: '✨', api: 'maltese',
    size: 'small', sLabel: 'Small', eFilter: 'medium',
    keywords: 'morkie maltese yorkshire terrier yorkie mix tiny toy dog',
    shortDesc: 'Silky micro-pup with Maltese sweetness and Yorkie spunk — huge personality, tiny body.',
    ov1: 'The Morkie is a cross between the Maltese and the Yorkshire Terrier. Both parents are ancient companion breeds with silky, long coats and big personalities in small frames. The result is an affectionate, feisty, and glamorous little dog that bonds intensely with its family.',
    ov2: 'Morkies are brave beyond their size — they often have no idea how small they are. They are deeply loyal and can be possessive of their favorite person. Though they need socialization to prevent small-dog syndrome, well-raised Morkies are playful, trainable, and deeply charming companions.',
    traits: {gentleness:75, friendliness:85, energy:65, training:65, kids:70},
    qf: [
      '<strong>Hybrid:</strong> Maltese × Yorkshire Terrier',
      '<strong>Weight:</strong> 4–8 lbs (Toy size only)',
      '<strong>Coat:</strong> Long, silky, low-shedding',
      '<strong>Colors:</strong> Black/tan, gold/tan, white, or combination',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — tiny and quiet enough'
    ],
    health: ['Patellar luxation', 'Tracheal collapse (avoid collar — use harness)', 'Hypoglycemia (tiny dogs)', 'Dental crowding and disease'],
    diet: {
      puppy: {amount:'¼ cup (4 small meals)', cal:'150–250 kcal'},
      adult: {amount:'¼–⅓ cup', cal:'200–300 kcal'},
      senior: {amount:'¼ cup', cal:'150–200 kcal'}
    },
    dietTips: ['Tiny-breed or toy formula kibble — smaller kibble size prevents choking', 'Multiple small meals to prevent hypoglycemia in puppies', 'Avoid table scraps — tiny dogs gain weight fast', 'Dental health diet or regular tooth brushing is essential'],
    cost: {puppy:'$1,000–$3,500', food:'$15–$30/mo', vet:'$300–$600/yr', groom:'$300–$600/yr', supplies:'$150–$300'},
    costNote: 'Food costs are minimal, but professional grooming every 6–8 weeks adds up — their long, silky coat needs regular trimming.',
    mixes: [
      {n:'F1 Morkie', d:'Classic 50/50 mix — variable coat texture and color.'},
      {n:'Morkie-Poo', d:'Morkie × Toy Poodle. Extra curly, even lower shedding.'},
      {n:'Teacup Morkie', d:'Selectively bred under 4 lbs — require careful handling.'},
      {n:'Morkshire', d:'Alternative name used by some breeders for the same cross.'}
    ],
    facts: [
      '✨ Despite weighing under 8 lbs, Morkies will fearlessly confront dogs ten times their size — terrier courage from the Yorkie side.',
      '💇 Their silky coat grows continuously like human hair — regular trims or a "puppy cut" every 6–8 weeks keeps them manageable.',
      '🧸 Morkies are sometimes called "velcro dogs" because they follow their favorite person from room to room all day.',
      '🚫 They should always wear a harness instead of a collar — their delicate tracheas are vulnerable to collar pressure.',
      '🌟 Celebrity owners have helped boost Morkie popularity; they\'re especially common among people who want a glamorous but trainable micro-companion.'
    ]
  },
  {
    slug: 'chipoo', name: 'Chi-Poo', num: 16,
    cross: 'Chihuahua × Toy/Miniature Poodle',
    tagline: 'A curly-coated micro-companion with Chihuahua sass and Poodle smarts',
    weight: '5–20 lbs', height: '7–15 in', lifespan: '12–15 yrs', energy: 'Medium',
    emoji: '🌀', api: 'chihuahua',
    size: 'small', sLabel: 'Small', eFilter: 'medium',
    keywords: 'chipoo chi-poo chihuahua poodle mix small curly dog toy dog',
    shortDesc: 'Tiny Chihuahua × Poodle mix — smart, sassy, and surprisingly low-shedding.',
    ov1: 'The Chi-Poo (also spelled Chipoo) is a cross between the Chihuahua and the Toy or Miniature Poodle. This combination produces a small, often curly-coated dog that inherits the Chihuahua\'s fierce loyalty and the Poodle\'s intelligence and low-shedding coat.',
    ov2: 'Chi-Poos are alert, affectionate, and quick to learn. They tend to be devoted to one person above all others and can be wary of strangers — a trait from the Chihuahua parent. With early socialization, they become confident, sociable little dogs that adapt well to apartment life.',
    traits: {gentleness:70, friendliness:75, energy:65, training:80, kids:65},
    qf: [
      '<strong>Hybrid:</strong> Chihuahua × Toy or Miniature Poodle',
      '<strong>Sizes:</strong> Varies by Poodle parent (5–20 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-no shedding',
      '<strong>Colors:</strong> All colors — cream, black, brown, parti',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — adaptable and quiet'
    ],
    health: ['Patellar luxation', 'Hypoglycemia (small size)', 'Dental crowding', 'Eye conditions (both parent breeds)'],
    diet: {
      puppy: {amount:'¼–⅓ cup (3–4 meals)', cal:'150–250 kcal'},
      adult: {amount:'¼–½ cup', cal:'200–400 kcal'},
      senior: {amount:'¼–⅓ cup', cal:'150–300 kcal'}
    },
    dietTips: ['Toy/small-breed formula for appropriate calorie density', 'Multiple small meals for puppies to prevent hypoglycemia', 'High-quality protein first ingredient for lean muscle', 'Dental health kibble to manage crowding-related tooth decay'],
    cost: {puppy:'$500–$2,000', food:'$15–$30/mo', vet:'$300–$600/yr', groom:'$200–$400/yr', supplies:'$150–$250'},
    costNote: 'One of the most budget-friendly doodle-type mixes — low food and grooming costs with long lifespan.',
    mixes: [
      {n:'F1 Chi-Poo', d:'Classic 50/50 mix — coat can range from wavy to curly.'},
      {n:'F1B Chi-Poo', d:'F1 × Poodle. Curlier, more allergy-friendly coat.'},
      {n:'Teacup Chi-Poo', d:'Under 5 lbs — bred with Toy Chihuahua and Toy Poodle.'},
      {n:'Chi-Poo × Maltipoo', d:'Ultra-tiny, ultra-fluffy micro-companion blend.'}
    ],
    facts: [
      '🌀 The curly Poodle coat tends to dominate — most Chi-Poos have wavy or curly coats even with a 50/50 mix.',
      '🧠 The Poodle\'s intelligence shines through — Chi-Poos can learn 50+ words and complex commands.',
      '🔊 Chihuahua vocal instincts mean Chi-Poos may bark at strangers, making them surprisingly good watchdogs for their tiny size.',
      '☀️ Like Chihuahuas, they tend to be cold-sensitive and love warm laps and sunny spots.',
      '❤️ Their deep devotion to their favorite person earns them the "velcro dog" nickname — they do not like being alone.'
    ]
  },
  {
    slug: 'havapoo', name: 'Havapoo', num: 17,
    cross: 'Havanese × Toy/Miniature Poodle',
    tagline: 'Fluffy, joyful, and nearly hypoallergenic — the Cuban-French teddy bear dog',
    weight: '7–20 lbs', height: '8–15 in', lifespan: '12–15 yrs', energy: 'Medium',
    emoji: '🧸', api: 'havanese',
    size: 'small', sLabel: 'Small', eFilter: 'medium',
    keywords: 'havapoo havanese poodle mix poovanese small fluffy low shed dog',
    shortDesc: 'Joyful Havanese × Poodle blend — fluffy, friendly, and nearly non-shedding.',
    ov1: 'The Havapoo (also called Poovanese or Havadoodle) is a cross between the Havanese and the Toy or Miniature Poodle. Both parent breeds are sociable, intelligent, and low-shedding, making the Havapoo an exceptionally easy-to-love companion that suits a wide range of lifestyles.',
    ov2: 'Havapoos are gentle, playful, and deeply social. They thrive on human interaction and don\'t do well left alone for long periods. Their soft, wavy-to-curly coat is nearly non-shedding, and they adapt beautifully to apartment life. They are especially popular with first-time dog owners for their trainability and affectionate nature.',
    traits: {gentleness:90, friendliness:97, energy:60, training:85, kids:92},
    qf: [
      '<strong>Hybrid:</strong> Havanese × Toy or Miniature Poodle',
      '<strong>Sizes:</strong> Toy (7–12 lbs), Mini (12–20 lbs)',
      '<strong>Coat:</strong> Soft, wavy to curly, low-shedding',
      '<strong>Colors:</strong> Cream, gold, black, chocolate, parti, tri',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — ideal'
    ],
    health: ['Patellar luxation', 'Hip dysplasia (mini size)', 'Progressive retinal atrophy', 'Hypothyroidism'],
    diet: {
      puppy: {amount:'⅓–½ cup (3 meals)', cal:'200–350 kcal'},
      adult: {amount:'½–¾ cup', cal:'300–500 kcal'},
      senior: {amount:'⅓–½ cup', cal:'200–350 kcal'}
    },
    dietTips: ['Small or toy-breed formula for appropriate portion sizing', 'Omega-3 and -6 fatty acids for wavy coat health', 'Probiotic supplement — Poodle parent is prone to sensitive digestion', 'Two measured meals daily to prevent obesity from overfeeding'],
    cost: {puppy:'$1,000–$2,500', food:'$20–$40/mo', vet:'$300–$600/yr', groom:'$300–$500/yr', supplies:'$150–$300'},
    costNote: 'Affordable and healthy breed overall — grooming is the main recurring cost for their soft, continuously growing coat.',
    mixes: [
      {n:'F1 Havapoo', d:'50% Havanese, 50% Poodle. Wavy coat, sociable personality.'},
      {n:'F1B Havapoo', d:'F1 × Poodle. Curlier coat, better for allergy sufferers.'},
      {n:'Toy Havapoo', d:'Havanese × Toy Poodle. Under 10 lbs, perfect lap companion.'},
      {n:'Havamalt', d:'Havanese × Maltese — a silkier, lower-maintenance alternative.'}
    ],
    facts: [
      '🧸 Havapoos are sometimes called "the dog that never grows up" for their playful, puppy-like energy throughout their lives.',
      '🎭 The Havanese parent was the national dog of Cuba and a favorite of Spanish royalty — the Havapoo carries that aristocratic charm.',
      '🤝 They excel as therapy and emotional support animals due to their gentle, intuitive nature.',
      '💃 Havapoos often enjoy learning tricks and performing — the Havanese was historically used as a circus dog.',
      '🌍 The Havapoo\'s low-shedding coat makes it one of the most popular choices for families with mild dog allergies.'
    ]
  },
  {
    slug: 'shih-poo', name: 'Shih-Poo', num: 18,
    cross: 'Shih Tzu × Toy Poodle',
    tagline: 'Regal Shih Tzu meets brainy Poodle — a fluffy little charmer with ancient noble roots',
    weight: '8–18 lbs', height: '8–15 in', lifespan: '13–17 yrs', energy: 'Low',
    emoji: '👑', api: 'shihtzu',
    size: 'small', sLabel: 'Small', eFilter: 'low',
    keywords: 'shih poo shihpoo shih tzu poodle mix small fluffy royal dog',
    shortDesc: 'Shih Tzu × Poodle — long-lived, low-shedding, and absolutely adorable.',
    ov1: 'The Shih-Poo is a cross between the ancient Shih Tzu and the Toy Poodle. The Shih Tzu has roots in Chinese imperial courts going back over 1,000 years, while the Poodle brings hypoallergenic qualities and exceptional intelligence. The Shih-Poo combines the best of both into a cheerful, long-lived companion.',
    ov2: 'Shih-Poos are gentle, affectionate, and surprisingly adaptable. They tend to be calmer than many other doodle mixes, making them excellent companions for seniors and families with young children. Their low-shedding coat and long lifespan (up to 17 years) make them a wonderful long-term commitment.',
    traits: {gentleness:88, friendliness:90, energy:45, training:78, kids:88},
    qf: [
      '<strong>Hybrid:</strong> Shih Tzu × Toy Poodle',
      '<strong>Sizes:</strong> Toy (8–13 lbs), Mini (13–18 lbs)',
      '<strong>Coat:</strong> Soft, wavy to curly, low-to-no shedding',
      '<strong>Colors:</strong> All colors — white, black, gold, parti, tri',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — calm and adaptable'
    ],
    health: ['Patellar luxation', 'Dental disease (brachycephalic jaw)', 'Ear infections', 'Eye issues (both parent breeds)'],
    diet: {
      puppy: {amount:'⅓–½ cup (3 meals)', cal:'200–300 kcal'},
      adult: {amount:'½–¾ cup', cal:'250–450 kcal'},
      senior: {amount:'⅓–½ cup', cal:'200–300 kcal'}
    },
    dietTips: ['Small-breed formula sized for tiny jaws', 'Dental health kibble or regular brushing — flat face causes dental crowding', 'Omega-3s for continuous coat growth', 'Avoid overfeeding — weight gain strains their small frame'],
    cost: {puppy:'$700–$2,000', food:'$20–$35/mo', vet:'$300–$600/yr', groom:'$300–$500/yr', supplies:'$150–$300'},
    costNote: 'Affordable to own; their notably long lifespan (13–17 years) means many years of companionship for a modest investment.',
    mixes: [
      {n:'F1 Shih-Poo', d:'50/50 cross — coat varies from wavy Shih Tzu to curly Poodle.'},
      {n:'F1B Shih-Poo', d:'F1 × Toy Poodle. Curlier, reduced shedding.'},
      {n:'Teddy Bear Dog', d:'Shih-Poo is one of the original "teddy bear dog" breeds.'},
      {n:'Zuchon / Shichon', d:'Shih Tzu × Bichon — a popular fluffier alternative.'}
    ],
    facts: [
      '👑 The Shih Tzu parent was bred exclusively for Chinese emperors — the Shih-Poo carries a lineage of over 1,000 years of royal companionship.',
      '🎂 With a lifespan of up to 17 years, the Shih-Poo is one of the longest-lived of all doodle-type breeds.',
      '😴 They are naturally calm and do not need extensive exercise — a short daily walk and some indoor play keeps them content.',
      '✂️ Their coat grows continuously and needs trimming every 6–8 weeks — many owners prefer a short "teddy bear cut."',
      '🏆 Consistently ranked among the top 5 most popular small hybrid dogs in North America.'
    ]
  },
  {
    slug: 'goberian', name: 'Goberian', num: 19,
    cross: 'Golden Retriever × Siberian Husky',
    tagline: 'Striking golden-husky beauty meets dual-breed friendliness — an athletic outdoor partner',
    weight: '45–80 lbs', height: '20–24 in', lifespan: '10–15 yrs', energy: 'High',
    emoji: '🐺',  api: 'husky',
    size: 'large', sLabel: 'Large', eFilter: 'high',
    keywords: 'goberian golden retriever husky mix large athletic outdoor dog',
    shortDesc: 'Golden Retriever × Husky — stunning, athletic, and endlessly enthusiastic.',
    ov1: 'The Goberian is a striking cross between the Golden Retriever and the Siberian Husky. This pairing combines the Golden\'s legendary friendliness and trainability with the Husky\'s athletic build, endurance, and stunning blue or multicolored eyes. The result is a beautiful, energetic companion with wide appeal.',
    ov2: 'Goberians are social, playful, and highly active dogs that thrive with outdoor enthusiasts. They can be independent-minded (the Husky influence) but also deeply people-oriented (the Golden side). Daily vigorous exercise is non-negotiable — a bored Goberian will redecorate your home. They shed heavily year-round.',
    traits: {gentleness:85, friendliness:95, energy:90, training:75, kids:90},
    qf: [
      '<strong>Hybrid:</strong> Golden Retriever × Siberian Husky',
      '<strong>Sizes:</strong> Medium-Large (45–80 lbs)',
      '<strong>Coat:</strong> Dense double coat, heavy shedding',
      '<strong>Colors:</strong> Gold, cream, white, black, sable — often with husky markings',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — needs significant daily exercise'
    ],
    health: ['Hip dysplasia (both parents)', 'Eye conditions (Husky genetic eye issues)', 'Bloat risk', 'Progressive retinal atrophy'],
    diet: {
      puppy: {amount:'2–3 cups (3 meals)', cal:'900–1,400 kcal'},
      adult: {amount:'3–4 cups', cal:'1,200–2,000 kcal'},
      senior: {amount:'2.5–3 cups', cal:'1,000–1,400 kcal'}
    },
    dietTips: ['High-protein active formula to fuel their energetic lifestyle', 'Omega-3s (fish oil) to reduce heavy shedding', 'Glucosamine and chondroitin for joint support — both parents are hip dysplasia risks', 'Two meals daily to reduce bloat risk'],
    cost: {puppy:'$500–$1,500', food:'$65–$100/mo', vet:'$500–$900/yr', groom:'$300–$600/yr', supplies:'$200–$400'},
    costNote: 'Food and vet costs are the main expenses — healthy breed overall, but heavy shedding means high-quality de-shedding tools are a worthwhile investment.',
    mixes: [
      {n:'F1 Goberian', d:'Classic 50/50 mix — coat and eye color vary widely.'},
      {n:'Goberian × Labrador', d:'Triple retriever/sled dog energy — extremely athletic.'},
      {n:'Golden Husky vs Goberian', d:'Same cross, different breeder name — identical dogs.'},
      {n:'Mini Goberian', d:'Golden × Miniature Husky (rare) — a smaller version under 30 lbs.'}
    ],
    facts: [
      '👁️ Many Goberians inherit the Husky\'s striking blue eyes or heterochromia (one blue, one brown eye).',
      '🏔️ They excel at outdoor activities — hiking, running, skijoring, and camping — thanks to the Husky\'s endurance genes.',
      '🌨️ Their double coat keeps them warm in extreme cold, making them ideal dogs for cold-climate households.',
      '🧹 Goberians shed heavily twice a year ("coat blow") and moderately year-round — daily brushing is strongly recommended.',
      '🎓 The Golden\'s biddability softens the Husky\'s notorious stubbornness, making Goberians more trainable than purebred Huskies.'
    ]
  },
  {
    slug: 'westiepoo', name: 'Westiepoo', num: 20,
    cross: 'West Highland White Terrier × Poodle',
    tagline: 'The fluffy white terrier-doodle — Westie pluck meets Poodle polish',
    weight: '20–35 lbs', height: '11–17 in', lifespan: '13–16 yrs', energy: 'Medium',
    emoji: '🤍', api: 'poodle/miniature',
    size: 'small', sLabel: 'Small', eFilter: 'medium',
    keywords: 'westiepoo westie poodle mix white terrier doodle long lived',
    shortDesc: 'Westie × Poodle — bold, bright, low-shedding, and long-lived.',
    ov1: 'The Westiepoo is a cross between the West Highland White Terrier and the Poodle (Miniature or Standard). The Westie brings terrier tenacity, a bold personality, and an iconic white coat, while the Poodle adds intelligence, trainability, and a low-shedding curl. The combination is a lively, adaptable companion.',
    ov2: 'Westiepoos tend to have the terrier\'s confidence and curiosity balanced by the Poodle\'s eagerness to please. They are energetic but not exhausting — a good daily walk and play session keeps them satisfied. Their long lifespan (often 13–16 years) and low-shedding coat make them a popular choice for families seeking a long-term companion.',
    traits: {gentleness:78, friendliness:87, energy:70, training:82, kids:80},
    qf: [
      '<strong>Hybrid:</strong> West Highland White Terrier × Miniature or Standard Poodle',
      '<strong>Sizes:</strong> Small (20–30 lbs) or Medium (25–35 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-shedding, often white or cream',
      '<strong>Colors:</strong> White, cream, apricot, or parti',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — manageable size and energy'
    ],
    health: ['Patellar luxation', 'Skin conditions (Westie skin syndrome)', 'Addison\'s disease (Poodle risk)', 'Hip dysplasia (larger Poodle parent)'],
    diet: {
      puppy: {amount:'¾–1 cup (3 meals)', cal:'350–500 kcal'},
      adult: {amount:'1–1.5 cups', cal:'450–700 kcal'},
      senior: {amount:'¾–1 cup', cal:'350–500 kcal'}
    },
    dietTips: ['Limited-ingredient diet if skin sensitivity develops (Westie trait)', 'Omega-3s for low-shedding coat maintenance', 'Avoid foods with corn, soy, or wheat if skin issues appear', 'Dental health diet — terrier-mix teeth need regular attention'],
    cost: {puppy:'$1,000–$2,500', food:'$35–$60/mo', vet:'$400–$700/yr', groom:'$300–$500/yr', supplies:'$150–$300'},
    costNote: 'A well-priced doodle with long lifespan — skin condition management (if it appears) can add some vet costs.',
    mixes: [
      {n:'F1 Westiepoo', d:'50% Westie, 50% Poodle. Coat varies from wavy to curly.'},
      {n:'F1B Westiepoo', d:'F1 × Poodle. Curlier, even lower shedding.'},
      {n:'Mini Westiepoo', d:'Westie × Toy Poodle. Under 15 lbs — a popular compact version.'},
      {n:'Westipoo vs Westiepoo', d:'Same cross — just different breeder spellings.'}
    ],
    facts: [
      '🤍 Most Westiepoos are white or cream-colored, inheriting the Westie\'s iconic white coat genes.',
      '🏴󠁧󠁢󠁳󠁣󠁴󠁿 The West Highland White Terrier was originally bred on Scottish estates to hunt foxes and rodents — the Westiepoo may still show digging and chasing instincts.',
      '🧴 They are prone to the Westie\'s skin sensitivity, so a limited-ingredient or fish-based diet works well for many Westiepoos.',
      '🎓 They respond excellently to positive reinforcement training and can master a wide range of commands and tricks.',
      '📅 With a lifespan of 13–16 years, the Westiepoo is one of the longest-lived medium-sized hybrid breeds.'
    ]
  }
];

function generateHTML(h) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${h.name} – Breed Profile | BestPetSite</title>
<meta name="description" content="${h.name} breed profile: ${h.tagline.toLowerCase()}.">
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/breeds.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
</head>
<body>
<header class="site-header">
  <div class="container">
    <a href="../index.html" class="logo">🐾 BestPetSite</a>
    <nav class="main-nav">
      <a href="../index.html">Home</a>
      <a href="../breeds/index.html">Breeds</a>
      <a href="../services/boarding.html">Boarding</a>
      <a href="../services/shipping.html">Pet Shipping</a>
    </nav>
  </div>
</header>

<main>
  <section class="breed-hero">
    <div class="container">
      <div class="breed-hero-content">
        <div class="breed-hero-text">
          <div class="breed-badges">
            <span class="badge badge-group">Hybrid / Designer</span>
            <span class="badge badge-type" style="background:#f59e0b">Hybrid</span>
          </div>
          <h1>${h.name}</h1>
          <p class="breed-tagline">${h.tagline}</p>
          <div class="breed-quick-stats">
            <div class="stat"><span class="stat-icon">⚖️</span><span class="stat-label">Weight</span><span class="stat-value">${h.weight}</span></div>
            <div class="stat"><span class="stat-icon">📏</span><span class="stat-label">Height</span><span class="stat-value">${h.height}</span></div>
            <div class="stat"><span class="stat-icon">📅</span><span class="stat-label">Lifespan</span><span class="stat-value">${h.lifespan}</span></div>
            <div class="stat"><span class="stat-icon">🌡️</span><span class="stat-label">Energy</span><span class="stat-value">${h.energy}</span></div>
          </div>
        </div>
        <div class="breed-hero-image">
          <span id="breedEmoji" style="font-size:120px">${h.emoji}</span>
          <img id="breedPhoto" src="" alt="${h.name}" style="display:none;width:100%;border-radius:16px;max-height:350px;object-fit:cover">
        </div>
      </div>
    </div>
  </section>

  <section class="breed-tabs-section">
    <div class="container">
      <div class="tabs-wrapper">
        <div class="tab-buttons">
          <button class="tab-btn active" data-tab="profile">Profile</button>
          <button class="tab-btn" data-tab="diet">Diet</button>
          <button class="tab-btn" data-tab="cost">Cost</button>
          <button class="tab-btn" data-tab="mixes">Mixes</button>
          <button class="tab-btn" data-tab="facts">Fun Facts</button>
        </div>

        <div class="tab-content active" id="tab-profile">
          <div class="profile-grid">
            <div class="profile-main">
              <h2>Breed Overview</h2>
              <p>${h.ov1}</p>
              <p>${h.ov2}</p>

              <h3>Personality Traits</h3>
              <div class="trait-bars">
                <div class="trait"><span class="trait-name">Gentleness</span><div class="bar"><div class="bar-fill" style="width:${h.traits.gentleness}%"></div></div></div>
                <div class="trait"><span class="trait-name">Friendliness</span><div class="bar"><div class="bar-fill" style="width:${h.traits.friendliness}%"></div></div></div>
                <div class="trait"><span class="trait-name">Energy Level</span><div class="bar"><div class="bar-fill" style="width:${h.traits.energy}%"></div></div></div>
                <div class="trait"><span class="trait-name">Trainability</span><div class="bar"><div class="bar-fill" style="width:${h.traits.training}%"></div></div></div>
                <div class="trait"><span class="trait-name">Good with Kids</span><div class="bar"><div class="bar-fill" style="width:${h.traits.kids}%"></div></div></div>
              </div>

              <h3>Photo Gallery</h3>
              <div class="gallery-grid">
                <img id="gp1" src="" alt="${h.name} 1" class="gallery-img" style="cursor:pointer">
                <img id="gp2" src="" alt="${h.name} 2" class="gallery-img" style="cursor:pointer">
                <img id="gp3" src="" alt="${h.name} 3" class="gallery-img" style="cursor:pointer">
                <img id="gp4" src="" alt="${h.name} 4" class="gallery-img" style="cursor:pointer">
                <img id="gp5" src="" alt="${h.name} 5" class="gallery-img" style="cursor:pointer">
                <img id="gp6" src="" alt="${h.name} 6" class="gallery-img" style="cursor:pointer">
              </div>
            </div>
            <div class="profile-sidebar">
              <div class="quick-facts-card">
                <h3>Quick Facts</h3>
                <ul>
                  ${h.qf.map(q=>`<li>${q}</li>`).join('\n                  ')}
                </ul>
              </div>
              <div class="health-card">
                <h3>Health Notes</h3>
                <ul>
                  ${h.health.map(item=>`<li>${item}</li>`).join('\n                  ')}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" id="tab-diet">
          <h2>Feeding Your ${h.name}</h2>
          <table class="diet-table">
            <thead><tr><th>Life Stage</th><th>Daily Amount</th><th>Calories/Day</th></tr></thead>
            <tbody>
              <tr><td>Puppy (under 12 mo)</td><td>${h.diet.puppy.amount}</td><td>${h.diet.puppy.cal}</td></tr>
              <tr><td>Adult (1–7 yrs)</td><td>${h.diet.adult.amount}</td><td>${h.diet.adult.cal}</td></tr>
              <tr><td>Senior (7+ yrs)</td><td>${h.diet.senior.amount}</td><td>${h.diet.senior.cal}</td></tr>
            </tbody>
          </table>
          <h3>Nutrition Tips</h3>
          <ul>
            ${h.dietTips.map(t=>`<li>${t}</li>`).join('\n            ')}
          </ul>
        </div>

        <div class="tab-content" id="tab-cost">
          <h2>Cost of Owning a ${h.name}</h2>
          <table class="cost-table">
            <thead><tr><th>Expense</th><th>Frequency</th><th>Estimated Cost</th></tr></thead>
            <tbody>
              <tr><td>Puppy / Adoption</td><td>One-time</td><td>${h.cost.puppy}</td></tr>
              <tr><td>Food</td><td>Monthly</td><td>${h.cost.food}</td></tr>
              <tr><td>Vet – routine</td><td>Annual</td><td>${h.cost.vet}</td></tr>
              <tr><td>Grooming</td><td>Annual</td><td>${h.cost.groom}</td></tr>
              <tr><td>Supplies & toys</td><td>One-time</td><td>${h.cost.supplies}</td></tr>
            </tbody>
          </table>
          <p style="margin-top:1rem;font-size:.95rem;color:#555;">${h.costNote}</p>
        </div>

        <div class="tab-content" id="tab-mixes">
          <h2>${h.name} Generations &amp; Variations</h2>
          <div class="mixes-grid">
            ${h.mixes.map(m=>`<div class="mix-card"><h3>${m.n}</h3><p>${m.d}</p></div>`).join('\n            ')}
          </div>
        </div>

        <div class="tab-content" id="tab-facts">
          <h2>Fun Facts About the ${h.name}</h2>
          <ul class="fun-facts-list">
            ${h.facts.map(f=>`<li>${f}</li>`).join('\n            ')}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div id="lightbox" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;align-items:center;justify-content:center;">
    <button onclick="closeLightbox()" style="position:absolute;top:20px;right:30px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer">✕</button>
    <button onclick="changePhoto(-1)" style="position:absolute;left:20px;background:none;border:none;color:#fff;font-size:2.5rem;cursor:pointer">‹</button>
    <img id="lightboxImg" src="" alt="" style="max-width:90vw;max-height:85vh;border-radius:8px">
    <button onclick="changePhoto(1)" style="position:absolute;right:20px;background:none;border:none;color:#fff;font-size:2.5rem;cursor:pointer">›</button>
  </div>

  <div class="cta-section">
    <div class="container">
      <h2>Need a Sitter or Boarding for Your ${h.name}?</h2>
      <p>Connect with trusted pet sitters and boarding options in your area.</p>
      <a href="https://www.pawsvip.com" class="btn btn-primary" target="_blank" rel="noopener">Find a Sitter on PawsVIP →</a>
      <a href="../services/boarding.html" class="btn btn-secondary">Explore Boarding</a>
    </div>
  </div>
</main>

<footer class="site-footer">
  <div class="container">
    <p>© 2026 BestPetSite. All rights reserved.</p>
    <nav><a href="../index.html">Home</a> · <a href="../breeds/index.html">Breeds</a> · <a href="../services/boarding.html">Boarding</a> · <a href="../services/shipping.html">Pet Shipping</a></nav>
  </div>
</footer>

<script>
let galleryPhotos=[],currentPhoto=0;
function openLightbox(i){currentPhoto=i;document.getElementById('lightboxImg').src=galleryPhotos[i];const lb=document.getElementById('lightbox');lb.style.display='flex';}
function closeLightbox(){document.getElementById('lightbox').style.display='none';}
function changePhoto(d){currentPhoto=(currentPhoto+d+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhoto];}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')changePhoto(-1);if(e.key==='ArrowRight')changePhoto(1);});
document.querySelectorAll('.tab-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));btn.classList.add('active');document.getElementById('tab-'+btn.dataset.tab).classList.add('active');});});
fetch('https://dog.ceo/api/breed/${h.api}/images').then(r=>r.json()).then(data=>{
  const photos=data.message;
  const hero=document.getElementById('breedPhoto');
  hero.src=photos[Math.min(3,photos.length-1)];
  hero.onload=()=>{hero.style.display='block';document.getElementById('breedEmoji').style.display='none';};
  [5,10,18,25,33,40].forEach((idx,i)=>{
    const src=photos[idx]||photos[i]||photos[0];
    const el=document.getElementById('gp'+(i+1));
    if(el&&src){galleryPhotos.push(src);el.src=src;el.addEventListener('click',()=>openLightbox(i));}
  });
}).catch(()=>{});
</script>
</body>
</html>`;
}

function generateCard(h) {
  const gpct = h.eFilter === 'low' ? 65 : 75; // most hybrids have fluffy/wavy coats
  return `<a href="${h.slug}.html" class="breed-card" data-type="hybrid" data-size="${h.size}" data-energy="${h.eFilter}" data-kids="yes" data-name="${h.keywords}">
          <div class="breed-emoji-wrap" data-api="${h.api}"><span style="position:absolute;top:8px;left:8px;background:#f59e0b;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">#${h.num}</span><img class="breed-card-real-photo" alt="${h.name}" /><span class="breed-card-emoji-fallback">${h.emoji}</span><span class="size-badge ${h.size}">${h.sLabel}</span></div>
          <div class="breed-info">
            <h3>${h.name} <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>${h.shortDesc}</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:${h.traits.energy}%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:${h.traits.training}%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:${gpct}%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>`;
}

// Generate HTML files
let index = fs.readFileSync(INDEX_PATH, 'utf8');
let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

hybrids.forEach(h => {
  const htmlPath = path.join(BREEDS_DIR, h.slug + '.html');
  fs.writeFileSync(htmlPath, generateHTML(h), 'utf8');
  console.log('✓', h.slug + '.html');
});

// Insert cards before the no-results div
const newCards = '\n' + hybrids.map(h => generateCard(h)).join('\n') + '\n';
index = index.replace('\n        <div class="no-results"', newCards + '\n        <div class="no-results"');
fs.writeFileSync(INDEX_PATH, index, 'utf8');

// Update sitemap
const entries = hybrids.map(h =>
  `  <url><loc>https://www.alldogfacts.com/breeds/${h.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
).join('\n');
sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>');
fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');

console.log('\n✅ Hybrid batch done: 7 files created, index + sitemap updated. Total hybrids: 20.');
