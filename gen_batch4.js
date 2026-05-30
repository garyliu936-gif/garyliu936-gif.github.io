const fs = require('fs');
const path = require('path');
const TODAY = '2026-05-25';
const BREEDS_DIR = path.join(__dirname, 'breeds');
const INDEX_PATH = path.join(BREEDS_DIR, 'index.html');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const breeds = [
  {
    slug:'parson-russell-terrier', name:'Parson Russell Terrier', rank:121,
    group:'Terrier Group', origin:'England', alsoKnown:'Parson Terrier',
    weight:'13–17 lb', height:'12–15 in', lifespan:'13–15 years',
    energyLabel:'High Energy', e:'high', s:'small', sLabel:'Small',
    api:'terrier/fox', emoji:'🦊',
    keywords:'parson russell terrier parson terrier fox terrier',
    tagline:'Bold, athletic fox hunter with a big personality in a small package',
    shortDesc:'Fearless little terrier built for the hunt.',
    ov1:'The Parson Russell Terrier is a spirited, athletic breed originally bred to flush foxes from their dens during English fox hunts. Slightly taller and more square than the Jack Russell Terrier, the Parson is built for endurance and agility.',
    ov2:'These dogs are bold, clever, and full of energy. They thrive with active owners who can provide plenty of exercise, mental challenges, and consistent training. Their tenacious nature makes them entertaining but sometimes stubborn companions.',
    traits:{energy:90,affection:75,kids:70,dogs:60,training:65},
    coat:'Smooth or broken (rough)',
    colors:'White with tan, black, or tri-color markings',
    apt:'Not ideal — needs outdoor space to burn off energy',
    qf:['Originally called the Jack Russell Terrier until 2003','Can jump several times their own height','Named after Reverend John "Jack" Russell','AKC-recognized separately from the Jack Russell Terrier'],
    health:['Lens luxation','Patellar luxation','Deafness (in white dogs)','Legg-Calvé-Perthes disease'],
    diet:{
      puppy:{a:'3–4 small meals daily of high-protein puppy kibble',c:'½–¾ cup per day total'},
      adult:{a:'2 meals daily of quality protein-rich food',c:'¾–1 cup per day'},
      senior:{a:'2 meals daily of lower-calorie senior formula',c:'½–¾ cup per day'}
    },
    nutri:['High animal protein for muscle maintenance','Moderate fat for sustained energy','Glucosamine for joint support','Omega-3s for coat health'],
    pupCost:'$800–$1,500', foodCost:'$30–$50/month', vetCost:'$400–$700/year', groomCost:'$100–$200/year', supplCost:'$200–$400/year',
    costNote:'Relatively affordable; main costs are exercise enrichment and occasional vet visits for terrier-typical injuries.',
    mixes:[{n:'Jack Russell Terrier mix',d:'Energetic, feisty, and clever with big-dog attitude'},{n:'Parson/Beagle mix',d:'Curious scent hound mix that loves to explore'},{n:'Parson/Chihuahua mix',d:'Tiny powerhouse with a bold personality'}],
    facts:['Can squeeze through openings as small as 4 inches wide','Excellent at agility, flyball, and earthdog trials','Has a flexible chest to fit in narrow burrows','Parson Russell Terriers have appeared in many films and TV shows'],
    ctaH:'Is a Parson Russell Terrier Right for You?',
    ctaP:'If you\'re active, patient, and love a dog with personality, the Parson Russell Terrier is a delightful companion.'
  },
  {
    slug:'tibetan-spaniel', name:'Tibetan Spaniel', rank:122,
    group:'Non-Sporting Group', origin:'Tibet', alsoKnown:'Tibbie',
    weight:'9–15 lb', height:'10 in', lifespan:'12–15 years',
    energyLabel:'Low Energy', e:'low', s:'small', sLabel:'Small',
    api:'lhasa', emoji:'🏔️',
    keywords:'tibetan spaniel tibbie tibetan dog small dog',
    tagline:'Ancient Buddhist monastery dog with lion-like mane and regal bearing',
    shortDesc:'Independent yet devoted lapdog from the Himalayas.',
    ov1:'The Tibetan Spaniel is one of the oldest breeds in the world, treasured for centuries in Tibetan monasteries as a companion and watchdog. Despite the name, they are not true spaniels and were never used for hunting.',
    ov2:'Tibbies are alert, intelligent, and somewhat cat-like in their independence. They form strong bonds with family but can be aloof with strangers. Their moderate energy needs and quiet nature make them excellent apartment companions.',
    traits:{energy:45,affection:80,kids:75,dogs:75,training:60},
    coat:'Silky, medium-length double coat with a lion-like mane',
    colors:'All colors and combinations; cream, gold, and sable are common',
    apt:'Excellent — quiet and adaptable',
    qf:['Monks used them to turn prayer wheels','Gifted between monasteries as precious offerings','Called "little lions" in Tibet','AKC recognized in 1984'],
    health:['Patellar luxation','Eye conditions (progressive retinal atrophy)','Portosystemic shunt','Breathing issues (flat face structure)'],
    diet:{
      puppy:{a:'3 meals daily of small-breed puppy food',c:'¼–⅓ cup per day total'},
      adult:{a:'2 meals daily of quality small-breed formula',c:'¼–½ cup per day'},
      senior:{a:'2 meals daily of senior small-breed formula',c:'¼ cup per day'}
    },
    nutri:['High-quality protein for muscle tone','Omega-3s for silky coat','Antioxidants for longevity','Calcium for bone density'],
    pupCost:'$1,200–$2,500', foodCost:'$20–$35/month', vetCost:'$300–$600/year', groomCost:'$200–$400/year', supplCost:'$150–$300/year',
    costNote:'Relatively low maintenance costs; grooming and occasional eye check-ups are the primary expenses.',
    mixes:[{n:'Tibetan Spaniel/Poodle mix',d:'Smart, low-shed companion with ancient wisdom'},{n:'Tibetan Spaniel/Lhasa Apso mix',d:'Double Tibetan heritage with a calm, regal temperament'},{n:'Tibetan Spaniel/Shih Tzu mix',d:'Affectionate, fluffy lapdog blend'}],
    facts:['Used as lookouts on monastery walls to alert monks of approaching visitors','One of the most ancient breeds still in existence','Their wrinkled forehead gives them an almost human-like expression','Rarely bark without reason, making them discerning watchdogs'],
    ctaH:'Is a Tibetan Spaniel Right for You?',
    ctaP:'If you want a calm, intelligent, and ancient companion who is devoted yet independent, the Tibetan Spaniel may be your perfect match.'
  },
  {
    slug:'norfolk-terrier', name:'Norfolk Terrier', rank:126,
    group:'Terrier Group', origin:'England', alsoKnown:'Drop-eared Norwich',
    weight:'11–12 lb', height:'9–10 in', lifespan:'12–16 years',
    energyLabel:'Medium Energy', e:'medium', s:'small', sLabel:'Small',
    api:'terrier/norfolk', emoji:'🐾',
    keywords:'norfolk terrier small terrier british terrier drop ear',
    tagline:'Feisty, friendly, and fearless — the smallest of the working terriers',
    shortDesc:'Spirited little terrier with drop ears and a big heart.',
    ov1:'The Norfolk Terrier is one of the smallest working terriers, bred in England to hunt vermin and work in packs. Distinguished from the Norwich Terrier by its drop ears, the Norfolk is equally spirited but slightly more sociable.',
    ov2:'Norfolks are energetic, affectionate, and surprisingly adaptable. They get along well with other dogs and children, making them excellent family companions. Their wiry coat requires regular hand-stripping to maintain texture.',
    traits:{energy:70,affection:85,kids:80,dogs:80,training:65},
    coat:'Wiry, hard, straight double coat',
    colors:'Red, wheaten, black and tan, or grizzle',
    apt:'Good — adaptable to apartment life if exercised',
    qf:['Separated from the Norwich Terrier as a distinct breed in 1964','One of the smallest AKC-recognized terrier breeds','Hunted in packs unlike most terriers','Distinguished by folded ears vs. Norwich\'s prick ears'],
    health:['Patellar luxation','Mitral valve disease','Upper airway syndrome','Hip dysplasia (rare)'],
    diet:{
      puppy:{a:'3–4 small meals daily of small-breed puppy food',c:'¼–½ cup per day total'},
      adult:{a:'2 meals daily of quality small-breed kibble',c:'½ cup per day'},
      senior:{a:'2 meals daily of senior small-breed formula',c:'¼–⅓ cup per day'}
    },
    nutri:['High protein for an active small terrier','Omega fatty acids for wiry coat health','Joint support supplements','Fiber for digestive health'],
    pupCost:'$1,500–$3,000', foodCost:'$25–$40/month', vetCost:'$400–$700/year', groomCost:'$300–$500/year', supplCost:'$150–$300/year',
    costNote:'Hand-stripping costs add up; otherwise a moderately affordable breed to maintain.',
    mixes:[{n:'Norfolk/Cairn Terrier mix',d:'Shaggy, spirited terrier with boundless curiosity'},{n:'Norfolk/Poodle mix',d:'Low-shed, smart companion with terrier tenacity'},{n:'Norfolk/Jack Russell mix',d:'Energetic and fearless little working dog'}],
    facts:['Originally called the Drop-eared Norwich Terrier before official separation','Can squeeze through surprisingly small spaces','Loves to dig — terrier instincts run deep','One of the most pack-friendly terrier breeds'],
    ctaH:'Is a Norfolk Terrier Right for You?',
    ctaP:'If you want a small dog with big terrier spirit who still plays well with others, the Norfolk Terrier is a wonderful choice.'
  },
  {
    slug:'finnish-lapphund', name:'Finnish Lapphund', rank:127,
    group:'Herding Group', origin:'Finland', alsoKnown:'Lapinkoira',
    weight:'33–53 lb', height:'16–21 in', lifespan:'12–15 years',
    energyLabel:'Medium Energy', e:'medium', s:'medium', sLabel:'Medium',
    api:'samoyed', emoji:'🐺',
    keywords:'finnish lapphund lapinkoira lapland herding dog nordic dog',
    tagline:'Gentle Arctic herder with a teddy bear look and eager-to-please heart',
    shortDesc:'Fluffy Nordic herder known for calm temperament and trainability.',
    ov1:'The Finnish Lapphund was bred by the Sámi people of Lapland to herd reindeer in harsh Arctic conditions. One of Finland\'s most popular breeds, the Lapphund combines hardiness with a gentle, submissive "startle reflex" — a natural tendency to yield to pressure.',
    ov2:'Finnish Lapphunds are affectionate, intelligent, and highly trainable. They excel in obedience, agility, and herding sports. Their thick double coat is beautiful but requires regular brushing, especially during seasonal shedding.',
    traits:{energy:65,affection:90,kids:90,dogs:85,training:85},
    coat:'Thick, long, straight or wavy double coat; profuse mane',
    colors:'All colors accepted; most common is black, brown, or tan with white markings',
    apt:'Possible but needs outdoor exercise; prefers space',
    qf:['One of the oldest breeds still used for their original purpose','Finland\'s third most popular breed','Has a natural "startle reflex" — will yield rather than fight','Their thick coat protects against temperatures below -40°F'],
    health:['Progressive retinal atrophy','Hereditary cataracts','Hip dysplasia','Exercise-induced collapse'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of quality protein-rich kibble',c:'1½–2 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['High protein for active herding dog','Omega-3s for thick Arctic coat','Glucosamine for joint health','Vitamins E and C for immune support'],
    pupCost:'$1,500–$2,500', foodCost:'$50–$75/month', vetCost:'$400–$700/year', groomCost:'$300–$500/year', supplCost:'$200–$400/year',
    costNote:'Relatively healthy breed; grooming costs during heavy shedding seasons are the main expense.',
    mixes:[{n:'Finnish Lapphund/Husky mix',d:'Beautiful Arctic blend with endurance and friendliness'},{n:'Finnish Lapphund/Border Collie mix',d:'Highly intelligent herding powerhouse'},{n:'Finnish Lapphund/Samoyed mix',d:'Fluffy, gentle, and social family dog'}],
    facts:['The Sámi people kept them as companion dogs for centuries before herding reindeer','Their startle reflex made them less likely to be injured by reindeer hooves','Became popular in Finland after WWII when breeding programs were established','Excellent at skijoring and other winter sports'],
    ctaH:'Is a Finnish Lapphund Right for You?',
    ctaP:'If you want a gentle, trainable, and family-friendly herding dog with a gorgeous coat, the Finnish Lapphund is an excellent choice.'
  },
  {
    slug:'barbet', name:'Barbet', rank:129,
    group:'Sporting Group', origin:'France', alsoKnown:'French Water Dog',
    weight:'35–65 lb', height:'19–24.5 in', lifespan:'12–14 years',
    energyLabel:'Medium Energy', e:'medium', s:'medium', sLabel:'Medium',
    api:'poodle/standard', emoji:'🌊',
    keywords:'barbet french water dog curly dog sporting dog',
    tagline:'Rare French water dog with a curly coat and joyful, social personality',
    shortDesc:'Rare, curly-coated French sporting dog — gentle and low-shedding.',
    ov1:'The Barbet is one of the oldest water dog breeds, with records dating back to the 16th century in France. Used to hunt waterfowl, the Barbet is the ancestor of many modern breeds including the Poodle and Bichon Frisé.',
    ov2:'Barbets are joyful, social, and highly adaptable dogs that thrive with active families. Their curly, woolly coat is virtually non-shedding, making them a good option for mild allergy sufferers. They excel in dog sports and love to swim.',
    traits:{energy:70,affection:90,kids:90,dogs:90,training:85},
    coat:'Long, curly or wavy, woolly; non-shedding',
    colors:'Solid black, brown, fawn, gray, or white; may have white markings',
    apt:'Yes — adaptable and quiet indoors',
    qf:['One of the oldest water retriever breeds in the world','AKC recognized in 2020','The name "barbet" comes from the French word for beard','Ancestor of the Poodle, Bichon Frisé, and other curly-coated breeds'],
    health:['Hip dysplasia','Epilepsy','Progressive retinal atrophy','Ear infections (from water exposure)'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of quality kibble',c:'1½–2½ cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['Quality protein for active sporting dog','Omega-3s for curly coat health','Joint support for water retrieval activities','Antioxidants for long-term health'],
    pupCost:'$2,500–$4,000', foodCost:'$50–$80/month', vetCost:'$400–$700/year', groomCost:'$400–$700/year', supplCost:'$200–$400/year',
    costNote:'Rare breed commands higher puppy prices; grooming costs for curly coat maintenance are significant.',
    mixes:[{n:'Barbet/Poodle mix',d:'Ultra-curly, highly intelligent water dog'},{n:'Barbet/Labrador mix',d:'Friendly, athletic retriever blend'},{n:'Barbet/Goldendoodle mix',d:'Social, low-shed family companion'}],
    facts:['Henry IV of France kept a Barbet in the 16th century','Nearly went extinct during World War II','Webbed feet make them exceptional swimmers','One of the rarest breeds in the AKC registry'],
    ctaH:'Is a Barbet Right for You?',
    ctaP:'If you want a rare, gentle, and low-shedding sporting dog with ancient French heritage, the Barbet is a remarkable companion.'
  },
  {
    slug:'wirehaired-vizsla', name:'Wirehaired Vizsla', rank:130,
    group:'Sporting Group', origin:'Hungary', alsoKnown:'Drótszőrű Magyar Vizsla',
    weight:'45–65 lb', height:'21.5–25 in', lifespan:'12–14 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'vizsla', emoji:'🐕',
    keywords:'wirehaired vizsla hungarian dog sporting dog wire coat',
    tagline:'Rugged Hungarian hunting dog with a wiry coat built for all-weather work',
    shortDesc:'Athletic Hungarian pointer with wiry coat and velcro loyalty.',
    ov1:'The Wirehaired Vizsla was developed in Hungary in the 1930s by crossing the smooth Vizsla with the German Wirehaired Pointer. The goal was a more robust hunter with a protective wiry coat for cold water and harsh terrain retrieval.',
    ov2:'Wirehaired Vizslas are intense, loyal, and athletic dogs that bond deeply with their owners — often called "Velcro dogs" like their smooth cousins. They require significant daily exercise and mental stimulation to be content household companions.',
    traits:{energy:90,affection:90,kids:80,dogs:75,training:80},
    coat:'Dense, wiry double coat; 1–1.5 inches long',
    colors:'Golden rust, russet gold; nose, eye rims, and nails match coat',
    apt:'No — needs space and extensive daily exercise',
    qf:['Developed in Hungary in the 1930s','AKC recognized in 2014','Known as "Velcro dogs" for their closeness to owners','Can point, flush, and retrieve on land and water'],
    health:['Hip dysplasia','Progressive retinal atrophy','Epilepsy','Hypothyroidism'],
    diet:{
      puppy:{a:'3 meals daily of large-breed puppy formula',c:'1½–2 cups per day total'},
      adult:{a:'2 meals daily of high-protein active dog food',c:'2–3 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1½–2 cups per day'}
    },
    nutri:['High animal protein for muscle and endurance','Healthy fats for sustained energy','Glucosamine and chondroitin for joints','Omega-3s for wiry coat condition'],
    pupCost:'$1,500–$2,500', foodCost:'$60–$90/month', vetCost:'$400–$800/year', groomCost:'$200–$400/year', supplCost:'$200–$400/year',
    costNote:'Fairly healthy breed with manageable grooming needs; main costs are food and exercise enrichment.',
    mixes:[{n:'Wirehaired Vizsla/Labrador mix',d:'Energetic, loyal retriever with a weather-resistant coat'},{n:'Wirehaired Vizsla/Weimaraner mix',d:'Sleek and powerful hunting companion'},{n:'Wirehaired Vizsla/German Shorthaired Pointer mix',d:'Versatile pointer built for demanding field work'}],
    facts:['Both the smooth and wirehaired Vizsla are national breeds of Hungary','Their liver-colored nose distinguishes them from most other pointers','They were used as messaging dogs in World War II','The breed nearly went extinct in post-WWII Hungary'],
    ctaH:'Is a Wirehaired Vizsla Right for You?',
    ctaP:'If you lead an active outdoor lifestyle and want a loyal, high-energy hunting companion, the Wirehaired Vizsla is an exceptional partner.'
  },
  {
    slug:'saluki', name:'Saluki', rank:135,
    group:'Hound Group', origin:'Middle East', alsoKnown:'Persian Greyhound, Gazelle Hound',
    weight:'40–65 lb', height:'23–28 in', lifespan:'12–14 years',
    energyLabel:'High Energy', e:'high', s:'large', sLabel:'Large',
    api:'saluki', emoji:'🐕‍🦺',
    keywords:'saluki persian greyhound gazelle hound sighthound middle eastern dog',
    tagline:'One of the world\'s oldest breeds — a swift, elegant desert sighthound',
    shortDesc:'Ancient sighthound prized for speed and elegance across millennia.',
    ov1:'The Saluki is among the oldest dog breeds in the world, with evidence of their existence dating back over 5,000 years. Bred across the Middle East and Central Asia to hunt gazelle, the Saluki is one of the fastest dogs alive.',
    ov2:'Salukis are independent, gentle, and somewhat aloof — more cat-like than most breeds. They are loyal to their family but rarely fawn over strangers. Despite their gentle nature indoors, they require significant daily running in a secure area due to their powerful prey drive.',
    traits:{energy:80,affection:65,kids:65,dogs:70,training:55},
    coat:'Smooth and silky; feathered variety has silky feathering on ears, legs, and tail',
    colors:'White, cream, fawn, golden, red, grizzle, tricolor, black and tan',
    apt:'No — needs a large secure yard for running',
    qf:['Depicted in ancient Egyptian tomb paintings','Can reach speeds of 40–43 mph','Considered "clean" animals in Islamic culture (unlike most dogs)','Hunted with falcons in traditional Middle Eastern falconry'],
    health:['Cardiac issues','Hypothyroidism','Bloat (GDV)','Hemangiosarcoma'],
    diet:{
      puppy:{a:'3 meals daily of lean-protein puppy formula',c:'1½–2 cups per day total'},
      adult:{a:'2 meals daily of high-quality lean protein',c:'2–2½ cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1½–2 cups per day'}
    },
    nutri:['Lean protein for greyhound-type physique','Low fat to maintain slender build','Omega-3s for silky coat','Antioxidants for longevity'],
    pupCost:'$1,500–$3,000', foodCost:'$50–$80/month', vetCost:'$400–$700/year', groomCost:'$200–$400/year', supplCost:'$200–$400/year',
    costNote:'Healthy breed overall; main concerns are cardiac screening and safe fenced running space.',
    mixes:[{n:'Saluki/Greyhound mix',d:'Supremely fast, elegant, and gentle sighthound blend'},{n:'Saluki/Afghan Hound mix',d:'Extraordinarily flowing-coated sighthound'},{n:'Saluki/Whippet mix',d:'Swift, gentle, and moderately sized companion'}],
    facts:['Ancient Egyptians mummified Salukis as sacred animals','Muslim tradition generally considers dogs unclean — but the Saluki was an honored exception','They can run 100 meters in under 6 seconds','One of the few breeds that hunted alongside falcons'],
    ctaH:'Is a Saluki Right for You?',
    ctaP:'If you admire ancient breeds with regal independence and breathtaking speed, the Saluki is a once-in-a-lifetime companion.'
  },
  {
    slug:'german-pinscher', name:'German Pinscher', rank:139,
    group:'Working Group', origin:'Germany', alsoKnown:'Deutscher Pinscher',
    weight:'25–45 lb', height:'17–20 in', lifespan:'12–14 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'doberman', emoji:'🐕',
    keywords:'german pinscher deutscher pinscher medium pinscher working dog',
    tagline:'Sleek, energetic working dog — the midsize cousin of the Doberman',
    shortDesc:'Alert, fearless, and loyal German watchdog with sleek good looks.',
    ov1:'The German Pinscher is one of Germany\'s oldest breeds, predating the Doberman Pinscher and Miniature Pinscher — both of which were developed from the German Pinscher. A versatile working dog, the German Pinscher was used for ratting, guarding, and driving cattle.',
    ov2:'German Pinschers are highly intelligent, energetic, and strong-willed. They require an experienced owner who can provide firm, consistent leadership along with plenty of daily exercise and mental stimulation. They are deeply loyal to their family but can be wary of strangers.',
    traits:{energy:85,affection:75,kids:65,dogs:60,training:70},
    coat:'Short, dense, smooth, glossy',
    colors:'Red, fawn, black and tan, blue and tan',
    apt:'Possible but needs vigorous daily exercise',
    qf:['Ancestor of both the Doberman Pinscher and Miniature Pinscher','One of the oldest German dog breeds','Nearly went extinct after World War II','AKC recognized in 2003'],
    health:['Hip dysplasia','Cardiac disease','Von Willebrand\'s disease','Eye conditions'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of high-protein active formula',c:'1½–2 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['High-quality protein for lean muscle','Omega-3s for glossy coat','Taurine for cardiac health','Joint support supplements'],
    pupCost:'$1,500–$2,500', foodCost:'$45–$70/month', vetCost:'$400–$700/year', groomCost:'$100–$200/year', supplCost:'$200–$400/year',
    costNote:'Low grooming costs offset by need for enrichment activities and cardiac health monitoring.',
    mixes:[{n:'German Pinscher/Doberman mix',d:'Sleek, powerful, and intensely loyal guardian'},{n:'German Pinscher/Belgian Malinois mix',d:'Extreme high-drive working dog blend'},{n:'German Pinscher/Vizsla mix',d:'Athletic, devoted, and agile companion'}],
    facts:['Werner Jung is credited with saving the breed from extinction after WWII using only a handful of dogs','The name "Pinscher" means "biter" or "terrier" in German','Can open doors and gates with ease','One of the most versatile German working breeds'],
    ctaH:'Is a German Pinscher Right for You?',
    ctaP:'If you want a sleek, athletic, and fiercely loyal dog and have experience with strong-willed breeds, the German Pinscher is a remarkable companion.'
  },
  {
    slug:'bearded-collie', name:'Bearded Collie', rank:140,
    group:'Herding Group', origin:'Scotland', alsoKnown:'Beardie',
    weight:'45–55 lb', height:'20–22 in', lifespan:'12–14 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'collie/border', emoji:'🐑',
    keywords:'bearded collie beardie scottish herding dog shaggy dog',
    tagline:'Shaggy Scottish herder with boundless enthusiasm and a bouncy gait',
    shortDesc:'Exuberant, shaggy herder loved for its happy-go-lucky personality.',
    ov1:'The Bearded Collie is one of Britain\'s oldest herding breeds, developed in Scotland to herd sheep and cattle in rugged Highland terrain. Their long, shaggy coat protects them from harsh weather, while their tireless energy keeps them working all day.',
    ov2:'Beardies are joyful, bouncy, and highly social dogs that bring infectious enthusiasm to everything they do. They are excellent with children and other pets but require substantial daily exercise and consistent grooming. Their free-spirited nature can make them challenging for first-time owners.',
    traits:{energy:85,affection:90,kids:90,dogs:85,training:70},
    coat:'Long, flat, harsh outer coat; soft, furry undercoat; beard under chin',
    colors:'Black, blue, brown, or fawn with white markings',
    apt:'No — needs space and vigorous daily exercise',
    qf:['One of Britain\'s oldest herding breeds','Their "bounce" gait is a breed hallmark','AKC recognized in 1977','Used to herd both sheep and cattle in the Scottish Highlands'],
    health:['Hip dysplasia','Hypothyroidism','Addison\'s disease','Eye conditions'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1½–2 cups per day total'},
      adult:{a:'2 meals daily of high-quality protein-rich food',c:'2–2½ cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1½–2 cups per day'}
    },
    nutri:['High protein for herding activity levels','Omega-3 and -6 fatty acids for long coat health','Glucosamine for joint support','Digestive enzymes for gut health'],
    pupCost:'$1,500–$2,500', foodCost:'$55–$85/month', vetCost:'$400–$700/year', groomCost:'$400–$700/year', supplCost:'$200–$400/year',
    costNote:'Grooming costs are significant; otherwise a healthy breed with manageable expenses.',
    mixes:[{n:'Bearded Collie/Border Collie mix',d:'Extremely intelligent, energetic herding powerhouse'},{n:'Bearded Collie/Old English Sheepdog mix',d:'Double shaggy herder with gentle soul'},{n:'Bearded Collie/Aussie mix',d:'Athletic, agile, and brilliantly colored herder'}],
    facts:['A Bearded Collie named Potterdale Classic at Moonhill won Best in Show at Crufts in 1989','Their long coat can mat within days without regular brushing','Natural "headers" — they herd by facing the animals head-on','Their bounce can launch them remarkably high when excited'],
    ctaH:'Is a Bearded Collie Right for You?',
    ctaP:'If you love shaggy dogs with exuberant personalities and can commit to daily exercise and grooming, the Bearded Collie is pure joy.'
  },
  {
    slug:'russian-toy', name:'Russian Toy', rank:145,
    group:'Toy Group', origin:'Russia', alsoKnown:'Russkiy Toy, Russian Toy Terrier',
    weight:'Up to 6.5 lb', height:'8–11 in', lifespan:'12–14 years',
    energyLabel:'Medium Energy', e:'medium', s:'small', sLabel:'Small',
    api:'chihuahua', emoji:'🐕',
    keywords:'russian toy russkiy toy russian toy terrier tiny dog',
    tagline:'Elegant, lively Russian companion — one of the world\'s smallest breeds',
    shortDesc:'Petite, elegant Russian companion with enormous personality.',
    ov1:'The Russian Toy, also known as the Russkiy Toy, was developed in Russia from English Toy Terriers imported by the Russian aristocracy. During the Soviet era, the breed was isolated and developed independently, resulting in a uniquely Russian toy breed.',
    ov2:'Russian Toys are lively, devoted, and surprisingly energetic for their tiny size. They come in smooth-coated and long-coated varieties. Despite their delicate appearance, they have a bold, terrier-like personality and form extremely deep bonds with their owners.',
    traits:{energy:65,affection:90,kids:70,dogs:75,training:70},
    coat:'Smooth variety: short, tight; Long variety: long with fringing on ears and legs',
    colors:'Black and tan, brown and tan, blue and tan, red (with or without black/brown overlay)',
    apt:'Excellent — perfect apartment companion',
    qf:['One of the world\'s smallest breeds at under 6.5 lb','AKC recognized in 2022','Nearly went extinct during the Soviet era','Come in smooth and long-coated varieties'],
    health:['Patellar luxation','Dental crowding','Bone fractures (fragile)','Hypoglycemia'],
    diet:{
      puppy:{a:'4 small meals daily of toy-breed puppy food',c:'¼ cup per day total'},
      adult:{a:'2–3 small meals daily of toy-breed formula',c:'¼–⅓ cup per day'},
      senior:{a:'2–3 small meals of senior toy-breed formula',c:'¼ cup per day'}
    },
    nutri:['High-quality protein for tiny muscles','Calcium for fragile bones','Complex carbohydrates to prevent hypoglycemia','Omega-3s for coat and brain health'],
    pupCost:'$1,500–$3,500', foodCost:'$20–$35/month', vetCost:'$300–$600/year', groomCost:'$150–$300/year', supplCost:'$150–$300/year',
    costNote:'Very low food costs, but fragility means potential emergency vet visits; dental care is a recurring cost.',
    mixes:[{n:'Russian Toy/Chihuahua mix',d:'Tiny, bold, and devoted micro-companion'},{n:'Russian Toy/Italian Greyhound mix',d:'Elegant, slender, and delicate toy breed blend'},{n:'Russian Toy/Pomeranian mix',d:'Fluffy, lively, and fiercely loyal small dog'}],
    facts:['Nearly disappeared in Russia after WWII due to the Soviet rejection of Western influences','Soviet-era breeders worked in secret to preserve the breed','AKC\'s 200th recognized breed (2022)','The long-coated variety developed from a spontaneous mutation in the 1950s'],
    ctaH:'Is a Russian Toy Right for You?',
    ctaP:'If you want a tiny, elegant, and deeply devoted companion with a fascinating history, the Russian Toy is a rare treasure.'
  }
];

function generateHTML(b) {
  const gp = b.coat&&b.coat.includes('Long')||b.coat&&b.coat.includes('long') ? 75 :
    b.coat&&b.coat.includes('wire')||b.coat&&b.coat.includes('Wire')||b.coat&&b.coat.includes('Wiry')||b.coat&&b.coat.includes('wiry') ? 65 :
    b.coat&&b.coat.includes('short')||b.coat&&b.coat.includes('Short') ? 25 : 45;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${b.name} – Breed Profile | BestPetSite</title>
<meta name="description" content="${b.name} breed profile: ${b.tagline.toLowerCase()}.">
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/breeds.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
</head>
<body>
<nav class="top-nav">
  <a href="../index.html" class="nav-logo">🐾 BestPetSite</a>
  <div class="nav-links">
    <a href="../breeds/index.html">Dog Breeds</a>
    <a href="../index.html#tools">Tools</a>
    <a href="../index.html#about">About</a>
  </div>
</nav>

<div class="breed-hero">
  <div class="breed-hero-inner">
    <div class="breed-emoji-wrap" data-api="${b.api}" id="breedEmojiWrap">
      <span class="breed-hero-emoji" id="breedEmoji">${b.emoji}</span>
      <img id="breedPhoto" alt="${b.name}" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:18px;">
    </div>
    <div class="breed-hero-text">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
        <span style="background:#0d9488;color:#fff;font-size:.75rem;font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:.03em">AKC #${b.rank}</span>
        <span style="background:#f1f5f9;color:#475569;font-size:.75rem;font-weight:600;padding:4px 12px;border-radius:20px">${b.group}</span>
      </div>
      <h1>${b.name}</h1>
      <p class="breed-hero-tagline">${b.tagline}</p>
      <div class="breed-quick-stats">
        <div class="bqs-item"><span class="bqs-label">Weight</span><span class="bqs-val">${b.weight}</span></div>
        <div class="bqs-item"><span class="bqs-label">Height</span><span class="bqs-val">${b.height}</span></div>
        <div class="bqs-item"><span class="bqs-label">Lifespan</span><span class="bqs-val">${b.lifespan}</span></div>
        <div class="bqs-item"><span class="bqs-label">Energy</span><span class="bqs-val">${b.energyLabel}</span></div>
      </div>
    </div>
  </div>
</div>

<div class="breed-tabs-wrap">
  <div class="breed-tabs">
    <button class="breed-tab active" data-tab="profile">Profile</button>
    <button class="breed-tab" data-tab="diet">Diet</button>
    <button class="breed-tab" data-tab="cost">Cost</button>
    <button class="breed-tab" data-tab="mixes">Mixes</button>
    <button class="breed-tab" data-tab="facts">Fun Facts</button>
  </div>
</div>

<div class="breed-content">

<div class="breed-tab-panel active" id="tab-profile">
  <div class="breed-two-col">
    <div class="breed-main">
      <h2>Overview</h2>
      <p>${b.ov1}</p>
      <p>${b.ov2}</p>

      <h2>Temperament &amp; Traits</h2>
      <div class="trait-bars-full">
        <div class="trait-row"><span class="trait-label">Energy Level</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.energy}%"></div></div><span class="trait-pct">${b.traits.energy}%</span></div>
        <div class="trait-row"><span class="trait-label">Affection</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.affection}%"></div></div><span class="trait-pct">${b.traits.affection}%</span></div>
        <div class="trait-row"><span class="trait-label">Good with Kids</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.kids}%"></div></div><span class="trait-pct">${b.traits.kids}%</span></div>
        <div class="trait-row"><span class="trait-label">Good with Dogs</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.dogs}%"></div></div><span class="trait-pct">${b.traits.dogs}%</span></div>
        <div class="trait-row"><span class="trait-label">Trainability</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.training}%"></div></div><span class="trait-pct">${b.traits.training}%</span></div>
      </div>

      <h2>Photo Gallery</h2>
      <div class="breed-gallery">
        <img id="gp1" class="gallery-photo" alt="${b.name} photo 1">
        <img id="gp2" class="gallery-photo" alt="${b.name} photo 2">
        <img id="gp3" class="gallery-photo" alt="${b.name} photo 3">
        <img id="gp4" class="gallery-photo" alt="${b.name} photo 4">
        <img id="gp5" class="gallery-photo" alt="${b.name} photo 5">
        <img id="gp6" class="gallery-photo" alt="${b.name} photo 6">
      </div>
    </div>

    <div class="breed-sidebar">
      <div class="sidebar-card">
        <h3>Quick Facts</h3>
        <table class="quick-facts-table">
          <tr><td>Origin</td><td>${b.origin}</td></tr>
          <tr><td>Also Known As</td><td>${b.alsoKnown}</td></tr>
          <tr><td>Weight</td><td>${b.weight}</td></tr>
          <tr><td>Height</td><td>${b.height}</td></tr>
          <tr><td>Lifespan</td><td>${b.lifespan}</td></tr>
          <tr><td>Coat</td><td>${b.coat}</td></tr>
          <tr><td>Colors</td><td>${b.colors}</td></tr>
          <tr><td>Apartment?</td><td>${b.apt}</td></tr>
        </table>
      </div>

      <div class="sidebar-card">
        <h3>Did You Know?</h3>
        <ul class="did-you-know">
          ${b.qf.map(q=>`<li>${q}</li>`).join('\n          ')}
        </ul>
      </div>

      <div class="sidebar-card">
        <h3>Common Health Issues</h3>
        <ul class="health-list">
          ${b.health.map(h=>`<li>${h}</li>`).join('\n          ')}
        </ul>
      </div>

      <div class="sidebar-card cta-card">
        <h3>${b.ctaH}</h3>
        <p>${b.ctaP}</p>
        <a href="https://www.pawsvip.com" class="cta-btn" target="_blank" rel="noopener">Find a Sitter on PawsVIP →</a>
      </div>
    </div>
  </div>
</div>

<div class="breed-tab-panel" id="tab-diet">
  <h2>${b.name} Diet &amp; Nutrition Guide</h2>
  <div class="diet-stages">
    <div class="diet-stage">
      <h3>🐶 Puppy (0–12 months)</h3>
      <p><strong>Approach:</strong> ${b.diet.puppy.a}</p>
      <p><strong>Calories:</strong> ${b.diet.puppy.c}</p>
    </div>
    <div class="diet-stage">
      <h3>🐕 Adult (1–7 years)</h3>
      <p><strong>Approach:</strong> ${b.diet.adult.a}</p>
      <p><strong>Calories:</strong> ${b.diet.adult.c}</p>
    </div>
    <div class="diet-stage">
      <h3>🦮 Senior (7+ years)</h3>
      <p><strong>Approach:</strong> ${b.diet.senior.a}</p>
      <p><strong>Calories:</strong> ${b.diet.senior.c}</p>
    </div>
  </div>
  <h3>Key Nutritional Priorities</h3>
  <ul class="nutri-list">
    ${b.nutri.map(n=>`<li>${n}</li>`).join('\n    ')}
  </ul>
</div>

<div class="breed-tab-panel" id="tab-cost">
  <h2>Cost of Owning a ${b.name}</h2>
  <div class="cost-grid">
    <div class="cost-card"><span class="cost-icon">🐾</span><h3>Puppy Price</h3><p class="cost-amount">${b.pupCost}</p></div>
    <div class="cost-card"><span class="cost-icon">🍖</span><h3>Food / Month</h3><p class="cost-amount">${b.foodCost}</p></div>
    <div class="cost-card"><span class="cost-icon">🏥</span><h3>Vet / Year</h3><p class="cost-amount">${b.vetCost}</p></div>
    <div class="cost-card"><span class="cost-icon">✂️</span><h3>Grooming / Year</h3><p class="cost-amount">${b.groomCost}</p></div>
    <div class="cost-card"><span class="cost-icon">🧸</span><h3>Supplies / Year</h3><p class="cost-amount">${b.supplCost}</p></div>
  </div>
  <p class="cost-note">${b.costNote}</p>
</div>

<div class="breed-tab-panel" id="tab-mixes">
  <h2>Popular ${b.name} Mixes</h2>
  <div class="mixes-grid">
    ${b.mixes.map(m=>`<div class="mix-card"><h3>${m.n}</h3><p>${m.d}</p></div>`).join('\n    ')}
  </div>
</div>

<div class="breed-tab-panel" id="tab-facts">
  <h2>Fun Facts About the ${b.name}</h2>
  <ul class="fun-facts-list">
    ${b.facts.map(f=>`<li>${f}</li>`).join('\n    ')}
  </ul>
</div>

</div><!-- .breed-content -->

<div id="lightbox" class="lightbox" style="display:none">
  <button class="lb-close" id="lbClose">✕</button>
  <button class="lb-prev" id="lbPrev">‹</button>
  <img id="lbImg" alt="enlarged photo">
  <button class="lb-next" id="lbNext">›</button>
</div>

<footer class="site-footer">
  <p>© 2025 BestPetSite · <a href="../index.html">Home</a> · <a href="../breeds/index.html">All Breeds</a></p>
</footer>

<script>
(function(){
  const tabs=document.querySelectorAll('.breed-tab');
  const panels=document.querySelectorAll('.breed-tab-panel');
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    });
  });

  let galleryPhotos=[];
  let currentLb=0;
  function openLightbox(i){currentLb=i;document.getElementById('lbImg').src=galleryPhotos[i];document.getElementById('lightbox').style.display='flex';}
  function closeLightbox(){document.getElementById('lightbox').style.display='none';}
  document.getElementById('lbClose').addEventListener('click',closeLightbox);
  document.getElementById('lbPrev').addEventListener('click',()=>{currentLb=(currentLb-1+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lbImg').src=galleryPhotos[currentLb];});
  document.getElementById('lbNext').addEventListener('click',()=>{currentLb=(currentLb+1)%galleryPhotos.length;document.getElementById('lbImg').src=galleryPhotos[currentLb];});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')document.getElementById('lbPrev').click();if(e.key==='ArrowRight')document.getElementById('lbNext').click();});

  fetch('https://dog.ceo/api/breed/${b.api}/images').then(r=>r.json()).then(data=>{
    const photos=data.message;if(!photos||!photos.length)return;
    const hero=document.getElementById('breedPhoto');
    hero.src=photos[Math.min(3,photos.length-1)];
    hero.onload=()=>{hero.style.display='block';document.getElementById('breedEmoji').style.display='none';};
    [6,11,16,21,26,31].forEach((idx,i)=>{
      const src=photos[idx]||photos[i]||photos[0];
      const el=document.getElementById('gp'+(i+1));
      if(el&&src){galleryPhotos.push(src);el.src=src;el.style.display='block';el.addEventListener('click',()=>openLightbox(i));}
    });
  }).catch(()=>{});
})();
</script>
</body>
</html>`;
}

function generateCard(b) {
  const gp = b.coat&&b.coat.includes('Long')||b.coat&&b.coat.includes('long') ? 75 :
    b.coat&&b.coat.includes('wire')||b.coat&&b.coat.includes('Wire')||b.coat&&b.coat.includes('Wiry')||b.coat&&b.coat.includes('wiry') ? 65 :
    b.coat&&b.coat.includes('short')||b.coat&&b.coat.includes('Short') ? 25 : 45;
  return `<a href="${b.slug}.html" class="breed-card" data-type="purebred" data-size="${b.s}" data-energy="${b.e}" data-kids="yes" data-name="${b.keywords}">
            <div class="breed-emoji-wrap" data-api="${b.api}"><span style="position:absolute;top:8px;left:8px;background:#0d9488;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">#${b.rank}</span><img class="breed-card-real-photo" alt="${b.name}" /><span class="breed-card-emoji-fallback">${b.emoji}</span><span class="size-badge ${b.s}">${b.sLabel}</span></div>
            <div class="breed-info">
              <h3>${b.name}</h3>
              <p>${b.shortDesc}</p>
              <div class="trait-dots">
                <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:${b.traits.energy}%"></div></div></div>
                <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:${b.traits.training}%"></div></div></div>
                <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:${gp}%"></div></div></div>
              </div>
            </div>
            <div class="breed-link-row">Full Profile <span>→</span></div>
          </a>`;
}

let index = fs.readFileSync(INDEX_PATH, 'utf8');
let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

breeds.forEach(b => {
  const htmlPath = path.join(BREEDS_DIR, b.slug + '.html');
  fs.writeFileSync(htmlPath, generateHTML(b), 'utf8');
  console.log('✓', b.slug + '.html');
});

const newCards = '\n' + breeds.map(b => generateCard(b)).join('\n') + '\n';
index = index.replace('\n<a href="goldendoodle.html"', newCards + '\n<a href="goldendoodle.html"');
fs.writeFileSync(INDEX_PATH, index, 'utf8');

const entries = breeds.map(b =>
  `  <url><loc>https://www.alldogfacts.com/breeds/${b.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
).join('\n');
sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>');
fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');

console.log('\nBatch 4 done: 10 files, index + sitemap updated.');
