const fs = require('fs');
const path = require('path');
const TODAY = '2026-05-25';
const BREEDS_DIR = path.join(__dirname, 'breeds');
const INDEX_PATH = path.join(BREEDS_DIR, 'index.html');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const hybrids = [
  {
    slug: 'boxerdoodle', name: 'Boxerdoodle', num: 21,
    cross: 'Boxer × Poodle',
    tagline: 'Boxer bounce meets Poodle brains — a loyal, low-shedding family athlete',
    weight: '40–70 lbs', height: '18–22 in', lifespan: '10–14 yrs', energy: 'High',
    emoji: '🥊', api: 'boxer',
    size: 'large', sLabel: 'Large', eFilter: 'high',
    keywords: 'boxerdoodle boxer poodle mix medium large athletic family dog low shed',
    shortDesc: 'Boxer × Poodle — playful, loyal, and surprisingly low-shedding.',
    ov1: 'The Boxerdoodle is a cross between the Boxer and the Poodle (Standard or Miniature). The Boxer contributes its iconic clownish personality, unwavering loyalty, and athletic build, while the Poodle brings intelligence, trainability, and a low-shedding coat. The result is a fun-loving, energetic companion that appeals to active families.',
    ov2: 'Boxerdoodles are affectionate and people-oriented — they love being the center of attention and thrive when included in family activities. They have a natural clownish streak from the Boxer side and pick up commands quickly thanks to Poodle intelligence. Daily vigorous exercise is essential; a well-exercised Boxerdoodle is a well-behaved Boxerdoodle.',
    traits: {gentleness:82, friendliness:93, energy:88, training:83, kids:90},
    qf: [
      '<strong>Hybrid:</strong> Boxer × Standard or Miniature Poodle',
      '<strong>Sizes:</strong> Medium (40–55 lbs) or Large (55–70 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-moderate shedding',
      '<strong>Colors:</strong> Fawn, brindle, black, brown, parti',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — needs a yard and active daily exercise'
    ],
    health: ['Hip dysplasia (Boxer parent)', 'Aortic stenosis (Boxer heart condition)', 'Bloat risk (deep chest)', 'Addison\'s disease (Poodle risk)'],
    diet: {
      puppy: {amount:'2–2.5 cups (3 meals)', cal:'800–1,100 kcal'},
      adult: {amount:'2.5–3.5 cups', cal:'1,100–1,600 kcal'},
      senior: {amount:'2–2.5 cups', cal:'900–1,200 kcal'}
    },
    dietTips: ['High-protein active formula to fuel their energetic lifestyle', 'Glucosamine and chondroitin for joint support — both parents are dysplasia risks', 'Two meals daily (no free-feeding) to reduce bloat risk', 'Omega-3 fatty acids for coat health and heart support'],
    cost: {puppy:'$800–$2,000', food:'$65–$100/mo', vet:'$500–$900/yr', groom:'$300–$500/yr', supplies:'$200–$400'},
    costNote: 'Boxer health conditions can add to vet costs — cardiac screening of both parents is recommended before purchase.',
    mixes: [
      {n:'F1 Boxerdoodle', d:'50% Boxer, 50% Poodle. Coat ranges from wavy to lightly curly.'},
      {n:'F1B Boxerdoodle', d:'F1 × Poodle. Curlier, less shedding — better for allergy homes.'},
      {n:'Mini Boxerdoodle', d:'Boxer × Miniature Poodle. 25–45 lbs — compact but still athletic.'},
      {n:'Boxerpoo', d:'Alternative name used interchangeably with Boxerdoodle.'}
    ],
    facts: [
      '🥊 Boxers were originally developed in Germany as working dogs for hunting and guarding — the Boxerdoodle inherits that protective instinct.',
      '🤡 The Boxer\'s "clownish" reputation is legendary; Boxerdoodles often inherit this playful, goofy personality.',
      '🎓 They are one of the easier large-breed doodles to train thanks to the Poodle\'s intelligence softening the Boxer\'s occasional stubbornness.',
      '💓 Cardiac health is a priority — the Boxer breed has elevated risk of heart conditions, so regular vet checkups are important.',
      '🧒 Boxerdoodles are known for their exceptional patience with children, making them excellent family dogs for active households.'
    ]
  },
  {
    slug: 'goldador', name: 'Goldador', num: 22,
    cross: 'Golden Retriever × Labrador Retriever',
    tagline: 'Two of America\'s most beloved retrievers in one friendly, golden-hearted dog',
    weight: '55–80 lbs', height: '21–24 in', lifespan: '10–15 yrs', energy: 'High',
    emoji: '⭐', api: 'retriever/golden',
    size: 'large', sLabel: 'Large', eFilter: 'high',
    keywords: 'goldador golden retriever labrador mix family dog service dog therapy dog gentle',
    shortDesc: 'Golden Retriever × Labrador — the friendliest possible dog in one package.',
    ov1: 'The Goldador is a cross between the Golden Retriever and the Labrador Retriever — arguably the two most popular dog breeds in America. Both parents are gentle, trainable retrievers known for their affectionate nature and working ability. The Goldador combines these qualities, producing a dog that is exceptionally friendly, highly trainable, and universally well-liked.',
    ov2: 'Goldadors are prized as service dogs, guide dogs, therapy animals, and search-and-rescue dogs precisely because both parent breeds excel in these roles. As family companions, they are patient, playful, and endlessly affectionate. They love water, play fetch tirelessly, and get along with everyone — children, other dogs, and even cats.',
    traits: {gentleness:95, friendliness:98, energy:85, training:95, kids:97},
    qf: [
      '<strong>Hybrid:</strong> Golden Retriever × Labrador Retriever',
      '<strong>Sizes:</strong> Medium-Large (55–80 lbs)',
      '<strong>Coat:</strong> Dense double coat, moderate shedding',
      '<strong>Colors:</strong> Yellow, golden, black, chocolate, cream',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Possible but better with a yard'
    ],
    health: ['Hip and elbow dysplasia (both parents)', 'Progressive retinal atrophy', 'Obesity risk (food-motivated)', 'Ear infections (floppy ears)'],
    diet: {
      puppy: {amount:'2–3 cups (3 meals)', cal:'900–1,400 kcal'},
      adult: {amount:'3–4 cups', cal:'1,400–2,000 kcal'},
      senior: {amount:'2.5–3 cups', cal:'1,000–1,400 kcal'}
    },
    dietTips: ['Measured meals — both parent breeds are notorious food-motivated overeaters', 'Large-breed formula to support slow joint development in puppyhood', 'Glucosamine and chondroitin from age 5 onward for joint support', 'Limit treats to 10% of daily calories to prevent obesity'],
    cost: {puppy:'$800–$2,500', food:'$70–$110/mo', vet:'$500–$900/yr', groom:'$300–$600/yr', supplies:'$200–$400'},
    costNote: 'A healthy, robust breed overall. Main costs are food (they eat a lot) and routine vet visits. Hip screening of parents is recommended.',
    mixes: [
      {n:'F1 Goldador', d:'Classic 50/50 — coat and color vary between golden/yellow and chocolate.'},
      {n:'Goldador × Golden', d:'75% Golden, 25% Lab — longer, wavier coat, more Retriever expression.'},
      {n:'Black Goldador', d:'Inherits Lab\'s black gene — black coat with Golden personality.'},
      {n:'Service Goldador', d:'Specially bred and selected lines for guide and assistance work.'}
    ],
    facts: [
      '⭐ Goldadors are used by guide dog organizations because they combine the Golden\'s emotional sensitivity with the Lab\'s physical resilience.',
      '🏊 Both parent breeds are water-lovers — Goldadors will happily swim for hours if given the opportunity.',
      '🎓 Consistently among the easiest large dogs to train — they are eager to please and quick learners.',
      '❤️ They have an extraordinary ability to sense human emotions, making them exceptional therapy dogs in hospitals and schools.',
      '🍗 Food motivation is intense — they will try to steal food from counters and tables, so secure your snacks!'
    ]
  },
  {
    slug: 'labsky', name: 'Labsky', num: 23,
    cross: 'Labrador Retriever × Siberian Husky',
    tagline: 'Lab loyalty meets Husky adventure — a high-energy explorer with a heart of gold',
    weight: '40–75 lbs', height: '20–25 in', lifespan: '10–15 yrs', energy: 'High',
    emoji: '🌌', api: 'husky',
    size: 'large', sLabel: 'Large', eFilter: 'high',
    keywords: 'labsky labrador husky mix huskador energetic outdoor adventure dog',
    shortDesc: 'Labrador × Husky — adventurous, loyal, and built for the great outdoors.',
    ov1: 'The Labsky (also called Huskador) is a cross between the Labrador Retriever and the Siberian Husky. The Lab brings a gentle, family-friendly temperament and exceptional trainability, while the Husky contributes endurance, striking appearance, and an adventurous spirit. Together they create a high-energy, handsome companion.',
    ov2: 'Labskies are best suited to active owners who love outdoor activities. They inherit the Lab\'s friendliness and the Husky\'s wanderlust — a combination that makes them wonderful trail companions but demanding house pets without adequate exercise. They often carry Husky coloring (including possible blue eyes) combined with the Lab\'s broader head and shorter coat.',
    traits: {gentleness:82, friendliness:92, energy:92, training:78, kids:88},
    qf: [
      '<strong>Hybrid:</strong> Labrador Retriever × Siberian Husky',
      '<strong>Sizes:</strong> Medium-Large (40–75 lbs)',
      '<strong>Coat:</strong> Dense double coat, moderate-to-heavy shedding',
      '<strong>Colors:</strong> Black, yellow, chocolate, grey, sable — often with Husky markings',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — needs significant daily exercise and space'
    ],
    health: ['Hip dysplasia (both parents)', 'Progressive retinal atrophy', 'Epilepsy (Lab parent risk)', 'Obesity (Lab food drive)'],
    diet: {
      puppy: {amount:'2–2.5 cups (3 meals)', cal:'800–1,200 kcal'},
      adult: {amount:'2.5–4 cups', cal:'1,200–2,000 kcal'},
      senior: {amount:'2–3 cups', cal:'1,000–1,400 kcal'}
    },
    dietTips: ['High-protein, high-activity formula to meet their caloric demands', 'Omega-3s (fish oil) to reduce heavy seasonal shedding', 'Portion control — Labs love to eat and will overeat if allowed', 'Glucosamine supplement from age 5+ for joint health'],
    cost: {puppy:'$400–$1,200', food:'$65–$100/mo', vet:'$500–$900/yr', groom:'$200–$500/yr', supplies:'$200–$400'},
    costNote: 'One of the more affordable large hybrids to acquire. Main costs are food and an active lifestyle investment (gear, dog park memberships, etc.).',
    mixes: [
      {n:'F1 Labsky / Huskador', d:'50/50 cross — coat length and color vary significantly.'},
      {n:'Labsky × Lab', d:'75% Lab, 25% Husky — calmer, more trainable, may have blue eyes.'},
      {n:'Arctic Labrador', d:'Alternative name for the same cross, emphasizing Husky heritage.'},
      {n:'Mini Labsky', d:'Lab × Miniature Husky (rare) — a smaller, more apartment-friendly version.'}
    ],
    facts: [
      '🌌 Many Labskies inherit the Husky\'s famous blue eyes or heterochromia — one blue and one brown eye is common.',
      '🏃 They need at least 1–2 hours of vigorous exercise daily — running, hiking, or swimming keeps them balanced.',
      '🗣️ The Husky\'s vocal personality often comes through — Labskies may howl, "talk," or chatter rather than bark.',
      '❄️ Their dense double coat keeps them comfortable in cold weather — they often prefer snow to summer heat.',
      '🔒 A secure fence is essential — the Husky\'s escape-artist tendencies can combine with the Lab\'s high energy unpredictably.'
    ]
  },
  {
    slug: 'bordoodle', name: 'Bordoodle', num: 24,
    cross: 'Border Collie × Poodle',
    tagline: 'The world\'s smartest breeds combined — a dazzling, low-shedding agility superstar',
    weight: '30–60 lbs', height: '15–22 in', lifespan: '12–15 yrs', energy: 'High',
    emoji: '🧠', api: 'collie/border',
    size: 'medium', sLabel: 'Medium', eFilter: 'high',
    keywords: 'bordoodle border collie poodle mix smart agility dog athletic low shed',
    shortDesc: 'Border Collie × Poodle — the ultimate brainy, athletic, low-shedding companion.',
    ov1: 'The Bordoodle is a cross between the Border Collie — widely considered the most intelligent dog breed — and the Poodle, the second most intelligent. This pairing creates a dog of extraordinary mental capability, combined with a low-shedding coat and athletic build. Bordoodles excel at virtually every dog sport and activity.',
    ov2: 'Bordoodles need both physical exercise and mental stimulation in abundance. Without sufficient mental engagement, they can develop obsessive behaviors (a Border Collie trait) or become destructive. In the right home — one with active owners, training goals, and plenty of enrichment — they are breathtaking dogs that seem almost to think like humans.',
    traits: {gentleness:80, friendliness:88, energy:93, training:98, kids:82},
    qf: [
      '<strong>Hybrid:</strong> Border Collie × Standard or Miniature Poodle',
      '<strong>Sizes:</strong> Medium (30–45 lbs) or Large (45–60 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-no shedding',
      '<strong>Colors:</strong> Black/white, merle, sable, chocolate, parti',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — requires significant mental and physical exercise'
    ],
    health: ['Hip dysplasia (Border Collie parent)', 'Collie eye anomaly', 'Progressive retinal atrophy', 'Epilepsy (Border Collie risk)'],
    diet: {
      puppy: {amount:'1.5–2 cups (3 meals)', cal:'700–1,000 kcal'},
      adult: {amount:'2–3 cups', cal:'900–1,400 kcal'},
      senior: {amount:'1.5–2 cups', cal:'700–1,000 kcal'}
    },
    dietTips: ['High-quality protein formula for an active, working-dog metabolism', 'DHA-rich food or supplement to support exceptional cognitive function', 'Mental enrichment snacks (puzzle feeders, lick mats) to engage their brain at mealtimes', 'Omega-3s for coat and joint health — athletic dogs work their joints hard'],
    cost: {puppy:'$1,500–$3,500', food:'$55–$90/mo', vet:'$400–$800/yr', groom:'$300–$500/yr', supplies:'$200–$400'},
    costNote: 'Bordoodles command a premium price due to their exceptional qualities. Long-term costs are moderate for a mid-size dog.',
    mixes: [
      {n:'F1 Bordoodle', d:'50% Border Collie, 50% Poodle. High intelligence, variable coat.'},
      {n:'F1B Bordoodle', d:'F1 × Poodle. Curlier coat, reduced shedding, still razor sharp mentally.'},
      {n:'Mini Bordoodle', d:'Border Collie × Miniature Poodle. 20–35 lbs — all the brains, smaller frame.'},
      {n:'Merle Bordoodle', d:'Inherits Border\'s merle gene — striking marbled coat pattern.'}
    ],
    facts: [
      '🧠 The Border Collie has been documented to understand over 1,000 individual words — the Bordoodle inherits this astonishing vocabulary capacity.',
      '🥏 Bordoodles dominate agility, flyball, and disc competitions — their speed, precision, and drive are unmatched in hybrid dogs.',
      '👀 They may inherit the Border Collie\'s famous "herding eye" — an intense stare they use to direct animals (and sometimes children or other pets).',
      '📚 They need 2+ hours of combined physical and mental exercise daily — puzzle toys, training sessions, and agility work are all beneficial.',
      '🌈 Merle-patterned Bordoodles are especially prized for their unique coat — though merle-to-merle breeding should be avoided for health reasons.'
    ]
  },
  {
    slug: 'springerdoodle', name: 'Springerdoodle', num: 25,
    cross: 'English Springer Spaniel × Poodle',
    tagline: 'The springy, curly-coated spaniel-doodle — enthusiastic, gentle, and always smiling',
    weight: '30–60 lbs', height: '16–24 in', lifespan: '10–15 yrs', energy: 'High',
    emoji: '🌿', api: 'spaniel/springer',
    size: 'medium', sLabel: 'Medium', eFilter: 'high',
    keywords: 'springerdoodle english springer spaniel poodle mix medium active gentle family dog',
    shortDesc: 'English Springer Spaniel × Poodle — enthusiastic, kind, and low-shedding.',
    ov1: 'The Springerdoodle (also called Sproodle) is a cross between the English Springer Spaniel and the Poodle. The Springer Spaniel brings a naturally merry, gentle temperament and a love of fieldwork, while the Poodle adds intelligence, low-shedding genetics, and eagerness to please. The result is a cheerful, active dog with a heart full of enthusiasm.',
    ov2: 'Springerdoodles are wonderful family dogs — gentle enough for children, active enough for outdoor adventures, and smart enough to learn quickly. They love water, have excellent noses, and can be channeled into hiking, hunting, agility, or simply playing fetch all day. Their curly or wavy coat is easy to manage and low-shedding.',
    traits: {gentleness:88, friendliness:93, energy:83, training:88, kids:90},
    qf: [
      '<strong>Hybrid:</strong> English Springer Spaniel × Standard or Miniature Poodle',
      '<strong>Sizes:</strong> Medium (30–50 lbs) or Large (50–60 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-no shedding',
      '<strong>Colors:</strong> Liver & white, black & white, parti, chocolate, cream',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Manageable but better with outdoor access'
    ],
    health: ['Hip dysplasia', 'Phosphofructokinase deficiency (Springer parent)', 'Ear infections (both parents have droopy ears)', 'Progressive retinal atrophy'],
    diet: {
      puppy: {amount:'1.5–2 cups (3 meals)', cal:'600–900 kcal'},
      adult: {amount:'2–3 cups', cal:'900–1,400 kcal'},
      senior: {amount:'1.5–2 cups', cal:'700–1,000 kcal'}
    },
    dietTips: ['Active medium-breed formula with high protein content', 'Regular ear cleaning paired with diet — prone to ear infections', 'Omega-3s for wavy coat health and shine', 'Two meals daily on a consistent schedule for digestive health'],
    cost: {puppy:'$900–$2,500', food:'$55–$85/mo', vet:'$400–$700/yr', groom:'$300–$500/yr', supplies:'$150–$300'},
    costNote: 'A well-priced, healthy hybrid overall. Ear care products are a small but recurring expense given both parents\' ear shape.',
    mixes: [
      {n:'F1 Springerdoodle', d:'50% Springer, 50% Poodle. Wavy to curly coat.'},
      {n:'F1B Springerdoodle', d:'F1 × Poodle. Curlier, even lower shedding.'},
      {n:'Mini Springerdoodle', d:'English Springer × Miniature Poodle. 20–35 lbs.'},
      {n:'Sproodle', d:'Popular alternate name, especially in the UK and Australia.'}
    ],
    facts: [
      '🌿 English Springer Spaniels were bred to "spring" game from fields for hunters — Springerdoodles often have a bouncy, springy gait that reflects this heritage.',
      '💧 Both parent breeds love water — Springerdoodles are natural swimmers who will seek out any pond, lake, or puddle they can find.',
      '😄 The Springer\'s naturally "merry" expression is a breed trait — Springerdoodles seem to smile, which makes them irresistibly charming.',
      '👂 Their floppy ears need weekly cleaning — moisture and hair can accumulate inside, making them prone to ear infections.',
      '🏅 In the UK, Sproodles are among the most popular doodle breeds, rivaling the Labradoodle in sales and popularity.'
    ]
  },
  {
    slug: 'saint-berdoodle', name: 'Saint Berdoodle', num: 26,
    cross: 'Saint Bernard × Poodle',
    tagline: 'A gentle giant with Poodle brains — the oversized teddy bear of the doodle world',
    weight: '40–180 lbs', height: '24–30 in', lifespan: '8–12 yrs', energy: 'Medium',
    emoji: '🏔️', api: 'stbernard',
    size: 'large', sLabel: 'Large', eFilter: 'medium',
    keywords: 'saint berdoodle saint bernard poodle mix gentle giant large fluffy family dog',
    shortDesc: 'Saint Bernard × Poodle — a massive, gentle, low-shedding giant.',
    ov1: 'The Saint Berdoodle is a cross between the iconic Saint Bernard and the Standard Poodle. The Saint Bernard brings calm, patient grandeur and a legendary gentle nature with children, while the Poodle contributes intelligence, reduced shedding, and longevity. The result is a gentle giant that is easier to live with than a purebred Saint Bernard.',
    ov2: 'Saint Berdoodles are calm, affectionate, and famously patient — they tend to be natural "nanny dogs" around small children. Despite their imposing size, they are not high-energy dogs and are content with moderate daily exercise. Their wavy or curly coat dramatically reduces the infamous Saint Bernard drool and shedding issues, though some drool is still possible.',
    traits: {gentleness:97, friendliness:95, energy:50, training:82, kids:97},
    qf: [
      '<strong>Hybrid:</strong> Saint Bernard × Standard Poodle',
      '<strong>Sizes:</strong> Standard (70–120 lbs) or Giant (120–180 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-moderate shedding',
      '<strong>Colors:</strong> Brown & white, black & white, merle, red & white',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — needs space; medium exercise needs'
    ],
    health: ['Hip and elbow dysplasia (Saint Bernard parent)', 'Bloat risk (giant deep-chest breed)', 'Heart conditions (Dilated Cardiomyopathy)', 'Addison\'s disease (Poodle risk)', 'Shorter lifespan due to giant size'],
    diet: {
      puppy: {amount:'3–5 cups (3 meals)', cal:'1,200–2,000 kcal'},
      adult: {amount:'4–8 cups', cal:'1,800–3,500 kcal'},
      senior: {amount:'3–5 cups', cal:'1,200–2,000 kcal'}
    },
    dietTips: ['Large/giant breed formula — prevents too-rapid growth that stresses joints', 'Two elevated meals daily (never exercise within 1 hour) to reduce bloat risk', 'Glucosamine and chondroitin from year 2 onward for massive joint support', 'Calorie-dense food — giant dogs burn more calories simply existing'],
    cost: {puppy:'$1,500–$3,000', food:'$120–$200/mo', vet:'$600–$1,200/yr', groom:'$400–$700/yr', supplies:'$300–$600'},
    costNote: 'Giant breeds cost significantly more to feed, medicate, and groom. Everything from flea treatment to anesthesia is dose-dependent on weight.',
    mixes: [
      {n:'F1 Saint Berdoodle', d:'50% Saint Bernard, 50% Standard Poodle. Size varies widely.'},
      {n:'Mini Saint Berdoodle', d:'Saint Bernard × Miniature Poodle. 40–70 lbs — much more manageable.'},
      {n:'F1B Saint Berdoodle', d:'F1 × Poodle. Curlier coat, drastically reduced shedding and drool.'},
      {n:'St. Berdoodle vs Bernedoodle', d:'Similar size but different parents — Bernedoodle uses Bernese Mountain Dog.'}
    ],
    facts: [
      '🏔️ Saint Bernards were originally bred by Alpine monks to rescue travelers lost in mountain passes — the Saint Berdoodle carries this gentle rescue heritage.',
      '💧 Purebred Saint Bernards are famous droolers; Saint Berdoodles often drool significantly less thanks to the Poodle\'s tighter lip structure.',
      '🧸 Their sheer size and plush coat make them one of the most huggable dogs imaginable — children often treat them like living stuffed animals.',
      '😴 Despite their size, Saint Berdoodles are relatively low-energy and enjoy long naps interspersed with moderate outdoor adventures.',
      '🧠 The Poodle\'s intelligence gives the Saint Berdoodle a trainability edge over the purebred Saint Bernard, which can be more stubborn.'
    ]
  },
  {
    slug: 'huskydoodle', name: 'Huskydoodle', num: 27,
    cross: 'Siberian Husky × Poodle',
    tagline: 'Husky drama meets Poodle poise — a striking, chatty, adventurous companion',
    weight: '40–60 lbs', height: '18–22 in', lifespan: '10–13 yrs', energy: 'High',
    emoji: '❄️', api: 'husky',
    size: 'medium', sLabel: 'Medium', eFilter: 'high',
    keywords: 'huskydoodle husky poodle mix siberpoo medium energetic talkative adventure dog',
    shortDesc: 'Siberian Husky × Poodle — dramatic, chatty, stunning, and low-shedding.',
    ov1: 'The Huskydoodle (also called Siberpoo or Huskypoo) is a cross between the Siberian Husky and the Standard or Miniature Poodle. The Husky contributes its striking looks, athletic build, and famously vocal personality, while the Poodle brings intelligence, trainability, and a dramatically reduced shedding coat. The result is a head-turning, high-energy companion.',
    ov2: 'Huskydoodles are for experienced, active dog owners. They can be independent and strong-willed (the Husky influence) but respond well to positive reinforcement when motivated. Their Poodle side makes them more trainable than a purebred Husky, and their coat — often wavy rather than double-coated — sheds far less than either parent alone. They often have striking blue or parti-colored eyes.',
    traits: {gentleness:78, friendliness:88, energy:93, training:73, kids:80},
    qf: [
      '<strong>Hybrid:</strong> Siberian Husky × Standard or Miniature Poodle',
      '<strong>Sizes:</strong> Medium (40–55 lbs) or Large (55–65 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-moderate shedding',
      '<strong>Colors:</strong> Black/white, grey/white, brown, sable — often with Husky facial markings',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — high energy and may howl'
    ],
    health: ['Hip dysplasia', 'Eye conditions (Husky hereditary eye disorders)', 'Progressive retinal atrophy', 'Addison\'s disease (Poodle risk)'],
    diet: {
      puppy: {amount:'1.5–2.5 cups (3 meals)', cal:'700–1,100 kcal'},
      adult: {amount:'2.5–3.5 cups', cal:'1,100–1,600 kcal'},
      senior: {amount:'2–2.5 cups', cal:'900–1,200 kcal'}
    },
    dietTips: ['High-protein active formula — Huskies are efficient metabolizers but Huskydoodles are more active than Huskies alone', 'Omega-3s to support coat health and reduce residual shedding', 'Consistent meal schedule — Huskies can be picky eaters and may skip meals', 'Avoid overfeeding — Poodle crosses can be prone to weight gain if under-exercised'],
    cost: {puppy:'$1,000–$2,500', food:'$60–$90/mo', vet:'$400–$800/yr', groom:'$300–$500/yr', supplies:'$200–$400'},
    costNote: 'A visually stunning hybrid that commands higher prices. Eye exams and hip screening for parents are worthwhile investments.',
    mixes: [
      {n:'F1 Huskydoodle', d:'50% Husky, 50% Poodle. Wide variation in coat and personality.'},
      {n:'F1B Huskydoodle', d:'F1 × Poodle. Curlier, less shedding, retains Husky markings.'},
      {n:'Mini Huskydoodle', d:'Husky × Miniature Poodle. 25–40 lbs — more apartment-manageable.'},
      {n:'Siberpoo / Huskypoo', d:'Alternative names used by different breeders for the same cross.'}
    ],
    facts: [
      '❄️ Siberian Huskies were bred by the Chukchi people of Siberia to pull sleds across vast frozen landscapes — the Huskydoodle carries this exceptional endurance.',
      '🗣️ Huskies are famously vocal — they howl, "woo-woo," and chatter; Huskydoodles often inherit this expressive communication style.',
      '👁️ Blue eyes and heterochromia are common in Huskydoodles — one of the most striking features of the cross.',
      '🏃 They need 90+ minutes of vigorous exercise daily; without it, their intelligence and energy combine destructively.',
      '🌡️ Unlike purebred Huskies, Huskydoodles adapt better to warmer climates thanks to the Poodle\'s different coat structure.'
    ]
  },
  {
    slug: 'doxiepoo', name: 'Doxiepoo', num: 28,
    cross: 'Dachshund × Miniature/Toy Poodle',
    tagline: 'Long-bodied Dachshund curiosity meets Poodle smarts — a little dog with enormous personality',
    weight: '8–25 lbs', height: '8–15 in', lifespan: '12–15 yrs', energy: 'Medium',
    emoji: '🌭', api: 'dachshund',
    size: 'small', sLabel: 'Small', eFilter: 'medium',
    keywords: 'doxiepoo dachshund poodle mix small long body clever funny dog low shed',
    shortDesc: 'Dachshund × Poodle — curious, clever, low-shedding, and uniquely adorable.',
    ov1: 'The Doxiepoo is a cross between the Dachshund (in any of its varieties) and the Miniature or Toy Poodle. The Dachshund contributes its iconic long body, curious nose, bold personality, and tenacious spirit, while the Poodle adds intelligence, a low-shedding coat, and longer life expectancy. The result is a clever, comical, and deeply devoted small dog.',
    ov2: 'Doxiepoos are spirited and independent — they investigate everything and form strong bonds with their people. They can be stubborn at times (the Dachshund influence) but respond well to positive reinforcement training. Their curly or wavy coat is much lower-shedding than a purebred Dachshund, making them appealing to allergy-conscious owners.',
    traits: {gentleness:75, friendliness:85, energy:65, training:72, kids:72},
    qf: [
      '<strong>Hybrid:</strong> Dachshund × Miniature or Toy Poodle',
      '<strong>Sizes:</strong> Toy (8–15 lbs) or Mini (15–25 lbs)',
      '<strong>Coat:</strong> Wavy to curly, low-to-no shedding',
      '<strong>Colors:</strong> Red, black & tan, cream, chocolate, dapple',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — adaptable and relatively quiet'
    ],
    health: ['Intervertebral disc disease (IVDD – Dachshund\'s major risk)', 'Patellar luxation', 'Progressive retinal atrophy', 'Obesity risk (Dachshund body shape strains spine)'],
    diet: {
      puppy: {amount:'¼–½ cup (3 meals)', cal:'150–350 kcal'},
      adult: {amount:'½–¾ cup', cal:'300–550 kcal'},
      senior: {amount:'¼–½ cup', cal:'200–350 kcal'}
    },
    dietTips: ['Small-breed formula to match body size — avoid overfeeding at all costs', 'Spinal health is critical — weight management reduces IVDD risk dramatically', 'Avoid jumping on/off furniture — use ramps or steps to protect the spine', 'Omega-3s for coat health and joint/disc support'],
    cost: {puppy:'$400–$1,500', food:'$20–$40/mo', vet:'$400–$800/yr', groom:'$200–$400/yr', supplies:'$150–$300'},
    costNote: 'Affordable to buy and maintain — but IVDD treatment can be expensive if it develops. Back-friendly ramps and vet check-ups are worthwhile investments.',
    mixes: [
      {n:'F1 Doxiepoo', d:'50% Dachshund, 50% Poodle. Body length and coat vary widely.'},
      {n:'Mini Doxiepoo', d:'Miniature Dachshund × Toy Poodle. Under 10 lbs.'},
      {n:'Long-haired Doxiepoo', d:'Long-haired Dachshund parent — produces a silkier, softer coat.'},
      {n:'Dachshund-Poodle vs Doxiepoo', d:'Same cross — both names are in common use.'}
    ],
    facts: [
      '🌭 Dachshunds were bred in Germany to hunt badgers — their long body allowed them to burrow into underground tunnels. The Doxiepoo inherits this digging instinct.',
      '🧠 Poodle intelligence softens the Dachshund\'s legendary stubbornness, making Doxiepoos generally more trainable than purebred Dachshunds.',
      '⚠️ Spinal care is essential — no jumping from furniture, no running up stairs. IVDD is the breed\'s primary health concern.',
      '🐛 Their curious nose leads them on scent adventures — they will follow interesting smells across the yard regardless of commands.',
      '❤️ Doxiepoos tend to pick one "person" as their absolute favorite and follow that person everywhere throughout the day.'
    ]
  },
  {
    slug: 'maltichon', name: 'Maltichon', num: 29,
    cross: 'Maltese × Bichon Frisé',
    tagline: 'Two of the fluffiest small white dogs in one cloud-like, non-shedding companion',
    weight: '8–15 lbs', height: '8–12 in', lifespan: '12–15 yrs', energy: 'Low',
    emoji: '☁️', api: 'maltese',
    size: 'small', sLabel: 'Small', eFilter: 'low',
    keywords: 'maltichon maltese bichon frise mix white fluffy small hypoallergenic gentle dog',
    shortDesc: 'Maltese × Bichon Frisé — a cloud-like white companion that almost never sheds.',
    ov1: 'The Maltichon is a cross between the Maltese and the Bichon Frisé — two of the oldest and most cherished small white companion breeds in the world. Both parent breeds are renowned for their silky coats, gentle natures, and near-hypoallergenic qualities. The Maltichon combines these traits into a perfectly compact, elegant companion.',
    ov2: 'Maltichons are gentle, cheerful, and deeply affectionate. They are ideal for seniors, apartment dwellers, and families with gentle children. Their low-energy needs mean they are satisfied with short daily walks and indoor playtime. Their white, non-shedding coat is one of their most appealing traits, though it does require regular brushing to prevent matting.',
    traits: {gentleness:97, friendliness:95, energy:35, training:80, kids:88},
    qf: [
      '<strong>Hybrid:</strong> Maltese × Bichon Frisé',
      '<strong>Sizes:</strong> Toy (8–12 lbs) or Small (12–15 lbs)',
      '<strong>Coat:</strong> Silky to fluffy, white or cream, very low shedding',
      '<strong>Colors:</strong> White, cream, apricot tipped (rarely)',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> Yes — ideal apartment companion'
    ],
    health: ['Patellar luxation', 'Dental disease (both parent breeds)', 'Tear staining (white coat)', 'Luxating patella and tracheal sensitivity'],
    diet: {
      puppy: {amount:'¼–⅓ cup (3 meals)', cal:'150–250 kcal'},
      adult: {amount:'¼–½ cup', cal:'200–350 kcal'},
      senior: {amount:'¼ cup', cal:'150–250 kcal'}
    },
    dietTips: ['Small-breed or toy formula with smaller kibble size', 'Tear-stain management diet — some foods contribute to staining around white fur', 'Dental health kibble or regular tooth brushing is essential', 'Omega-3s for silky coat maintenance'],
    cost: {puppy:'$800–$2,000', food:'$15–$30/mo', vet:'$300–$600/yr', groom:'$300–$500/yr', supplies:'$150–$300'},
    costNote: 'One of the most affordable small companion hybrids to own. Grooming is the primary cost — their white coat needs regular professional trimming.',
    mixes: [
      {n:'F1 Maltichon', d:'50% Maltese, 50% Bichon. White to cream coat, very gentle.'},
      {n:'Maltese-Bichon vs Maltichon', d:'Same cross — the name varies by breeder.'},
      {n:'Maltipoo vs Maltichon', d:'Maltipoo uses Poodle instead of Bichon — curlier, also non-shedding.'},
      {n:'Havachon', d:'Havanese × Bichon — a closely related, slightly larger fluffy alternative.'}
    ],
    facts: [
      '☁️ Their cloud-white, non-shedding coat was prized by Mediterranean royalty for centuries — the Maltese alone was kept by Roman empresses and Greek aristocrats.',
      '🤫 Maltichons are naturally quiet and rarely bark excessively — ideal for apartment living and noise-sensitive households.',
      '❤️ They excel as emotional support animals due to their sensitive, empathetic nature and constant desire for close contact.',
      '🧴 Tear staining is common in white-coated dogs — regular face washing and a clean diet can minimize this cosmetic issue.',
      '👴 They are one of the top choices for older adults and retirees — low energy, small size, and affectionate temperament are a perfect match.'
    ]
  },
  {
    slug: 'rottador', name: 'Rottador', num: 30,
    cross: 'Rottweiler × Labrador Retriever',
    tagline: 'Rottweiler strength and protectiveness blended with Labrador\'s golden heart',
    weight: '70–115 lbs', height: '24–27 in', lifespan: '9–12 yrs', energy: 'High',
    emoji: '🛡️', api: 'rottweiler',
    size: 'large', sLabel: 'Large', eFilter: 'high',
    keywords: 'rottador rottweiler labrador mix large protective loyal family guard dog',
    shortDesc: 'Rottweiler × Labrador — a powerful, loyal protector with a Lab\'s gentle heart.',
    ov1: 'The Rottador is a cross between the Rottweiler and the Labrador Retriever. The Rottweiler contributes physical power, natural protectiveness, and deep loyalty to family, while the Labrador softens these traits with its renowned friendliness, trainability, and gentle disposition. The result is a large, confident dog that can serve as both loving companion and natural guardian.',
    ov2: 'Rottadors are highly loyal and deeply bonded to their families. They tend to be less aggressive than purebred Rottweilers — the Lab\'s influence promotes friendliness — but they retain a natural protectiveness that makes them excellent watchdogs. Early socialization and training are essential to channel their strength and intelligence positively.',
    traits: {gentleness:80, friendliness:88, energy:80, training:88, kids:82},
    qf: [
      '<strong>Hybrid:</strong> Rottweiler × Labrador Retriever',
      '<strong>Sizes:</strong> Large (70–115 lbs)',
      '<strong>Coat:</strong> Short to medium, moderate shedding',
      '<strong>Colors:</strong> Black & tan, brown & tan, black, yellow — often with Rottweiler markings',
      '<strong>Not AKC recognized</strong> (hybrid breed)',
      '<strong>Good for Apartments:</strong> No — needs space and significant daily exercise'
    ],
    health: ['Hip and elbow dysplasia (both parents)', 'Bloat/GDV risk (deep chest)', 'Osteosarcoma (Rottweiler cancer risk)', 'Progressive retinal atrophy (Lab parent)'],
    diet: {
      puppy: {amount:'2.5–3.5 cups (3 meals)', cal:'1,000–1,500 kcal'},
      adult: {amount:'4–5 cups', cal:'1,800–2,500 kcal'},
      senior: {amount:'3–4 cups', cal:'1,400–2,000 kcal'}
    },
    dietTips: ['Large-breed formula — controls calcium/phosphorus ratio for healthy joint development', 'Two meals daily, never exercise within 1 hour of eating — bloat prevention is critical', 'Glucosamine and chondroitin from age 3 onward for large joint support', 'Protein-rich diet to maintain muscle mass — powerful dogs need sustained protein'],
    cost: {puppy:'$500–$1,500', food:'$90–$140/mo', vet:'$600–$1,200/yr', groom:'$150–$300/yr', supplies:'$250–$500'},
    costNote: 'Lower grooming costs (short coat) but higher food and vet costs. Cancer screening and cardiac exams are recommended from the Rottweiler parent lineage.',
    mixes: [
      {n:'F1 Rottador', d:'50% Rottweiler, 50% Lab. Appearance and temperament vary significantly.'},
      {n:'Black Rottador', d:'Inherits Lab black gene with Rottweiler structure — striking, uniform black coat.'},
      {n:'Yellow Rottador', d:'Lab yellow gene dominant — yellow/gold coat, may retain Rottie markings.'},
      {n:'Rottador vs Labrottie', d:'Same cross — "Labrottie" is another common name for this mix.'}
    ],
    facts: [
      '🛡️ Rottweilers were the "drover\'s dogs" of ancient Rome, guarding livestock and property — the Rottador carries this protective heritage instinctively.',
      '❤️ The Labrador\'s famous gentle temperament softens the Rottweiler\'s guarding instincts, producing a dog that is protective but rarely aggressive toward family.',
      '🎓 With consistent positive reinforcement training, Rottadors are highly trainable — they learn commands quickly and love having a job to do.',
      '🏋️ Their powerful build and working drive make them excellent candidates for weight pulling, tracking, and protection sport activities.',
      '👨‍👩‍👧 Well-socialized Rottadors are known for being gentle and patient with children in their own family, while naturally watchful toward strangers.'
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
  const gpct = h.eFilter === 'low' ? 55 : h.eFilter === 'medium' ? 65 : 75;
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

console.log('\n✅ Hybrid batch 2 done: 10 files created, index + sitemap updated. Total hybrids now: 30.');
