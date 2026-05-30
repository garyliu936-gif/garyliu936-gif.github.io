const fs = require('fs');
const path = require('path');
const TODAY = '2026-05-25';
const BREEDS_DIR = path.join(__dirname, 'breeds');
const INDEX_PATH = path.join(BREEDS_DIR, 'index.html');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const breeds = [
  {
    slug:'bedlington-terrier', name:'Bedlington Terrier', rank:147,
    group:'Terrier Group', origin:'England', alsoKnown:'Rothbury Terrier',
    weight:'17–23 lb', height:'15–17.5 in', lifespan:'11–16 years',
    energyLabel:'Medium Energy', e:'medium', s:'small', sLabel:'Small',
    api:'terrier/bedlington', emoji:'🐑',
    keywords:'bedlington terrier lamb dog rothbury terrier english terrier',
    tagline:'Lamb-like in looks, lion-hearted in spirit — the elegant terrier surprise',
    shortDesc:'Fluffy, lamb-like terrier with surprising athletic ability.',
    ov1:'The Bedlington Terrier looks like a lamb but acts like a terrier. Originally bred in the Northumberland mining town of Bedlington, England, these dogs were used to hunt rats, badgers, and foxes — often racing against whippets for sport.',
    ov2:'Don\'t be fooled by the soft, curly coat and gentle appearance. Bedlingtons are energetic, courageous, and tenacious. They are loyal family companions who can be stubborn but respond well to positive training. Their unique appearance never fails to turn heads at the dog park.',
    traits:{energy:70,affection:80,kids:75,dogs:65,training:65},
    coat:'Thick, crisp, and curly; not wiry; distinctive topknot',
    colors:'Blue, sandy, liver, or combinations with tan',
    apt:'Yes — adapts well if exercised daily',
    qf:['Originally used to race against Whippets','Named after a mining town in Northumberland, England','Their crisp curly coat is neither wire nor soft','AKC recognized in 1886'],
    health:['Copper toxicosis (hereditary liver disease)','Patellar luxation','Distichiasis (extra eyelashes)','Retinal dysplasia'],
    diet:{
      puppy:{a:'3 meals daily of small-breed puppy formula',c:'½–¾ cup per day total'},
      adult:{a:'2 meals daily; low-copper diet recommended',c:'¾–1 cup per day'},
      senior:{a:'2 meals daily of senior formula; monitor copper levels',c:'½–¾ cup per day'}
    },
    nutri:['Low-copper diet critical for breed health','High-quality protein for muscle maintenance','Antioxidants for liver support','Omega-3s for curly coat condition'],
    pupCost:'$1,500–$2,500', foodCost:'$35–$55/month', vetCost:'$400–$800/year', groomCost:'$300–$500/year', supplCost:'$150–$300/year',
    costNote:'Copper toxicosis testing adds to vet costs; grooming requires a skilled groomer familiar with the breed\'s unique trim.',
    mixes:[{n:'Bedlington/Whippet mix',d:'Swift, elegant, and surprisingly athletic small dog'},{n:'Bedlington/Poodle mix',d:'Super curly, intelligent, and low-shedding companion'},{n:'Bedlington/Border Terrier mix',d:'Scruffy, spirited terrier with sweet temperament'}],
    facts:['Their curly coat was historically thought to shed in rain to keep them dry','Once known as the "Gypsy Dog" due to their use by Romani people for poaching','Among the fastest terriers — can outrun some sighthounds over short distances','The distinctive topknot was traditionally used to protect the skull in fights'],
    ctaH:'Is a Bedlington Terrier Right for You?',
    ctaP:'If you want a unique-looking dog with a spirited terrier personality in a manageable size, the Bedlington is an unforgettable companion.'
  },
  {
    slug:'irish-terrier', name:'Irish Terrier', rank:149,
    group:'Terrier Group', origin:'Ireland', alsoKnown:'Irish Red Terrier, Daredevil',
    weight:'25–27 lb', height:'18 in', lifespan:'13–15 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'terrier/irish', emoji:'🍀',
    keywords:'irish terrier daredevil red terrier irish dog',
    tagline:'The bold, loyal "Daredevil" of the terrier world — fiery as an Irish sunset',
    shortDesc:'Fiery, loyal Irish terrier dubbed "the Daredevil" for good reason.',
    ov1:'The Irish Terrier is one of the oldest terrier breeds, with roots in Ireland dating back centuries. Their fiery red coat and bold personality earn them the nickname "Daredevil." In World War I, they served as messenger dogs and sentinels, renowned for their courage under fire.',
    ov2:'Irish Terriers are loyal, spirited, and affectionate with their family — but they have a low tolerance for other dogs and a high prey drive. They thrive with active owners who appreciate a dog with personality, humor, and plenty of heart.',
    traits:{energy:85,affection:80,kids:75,dogs:45,training:65},
    coat:'Dense, wiry double coat; slightly wavy',
    colors:'Red, golden red, or red wheaten; solid',
    apt:'Possible but challenging; needs vigorous daily exercise',
    qf:['Served as messenger and sentinel dogs in WWI','One of the oldest Irish breeds','Nicknamed "the Daredevil" for fearless temperament','AKC recognized in 1885'],
    health:['Hyperkeratosis of feet','Bladder stones','Hip dysplasia','Hypothyroidism'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of high-quality protein',c:'1½–2 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['High-quality protein for active terrier','Omega-3s for wiry coat health','Zinc for foot/pad health','Antioxidants for immune support'],
    pupCost:'$1,200–$2,000', foodCost:'$45–$65/month', vetCost:'$400–$700/year', groomCost:'$300–$500/year', supplCost:'$200–$400/year',
    costNote:'Relatively healthy and affordable; hand-stripping is needed for show coat, which adds grooming expense.',
    mixes:[{n:'Irish Terrier/Poodle mix',d:'Curly, energetic, and smart companion with Irish flair'},{n:'Irish Terrier/Labrador mix',d:'Friendly, energetic, and loyal all-around dog'},{n:'Irish Terrier/Airedale mix',d:'Large, bold terrier blend with exceptional courage'}],
    facts:['Known for giving a "warning pinch" instead of a full bite when threatened','Inspired the poem "The Irish Terrier" by W.H. Ogilvie in 1900','One of the few breeds that can express genuine empathy toward their owners','Author John Steinbeck owned Irish Terriers throughout his life'],
    ctaH:'Is an Irish Terrier Right for You?',
    ctaP:'If you want a fearlessly loyal, energetic, and characterful companion with a fiery Irish spirit, the Irish Terrier is hard to beat.'
  },
  {
    slug:'australian-terrier', name:'Australian Terrier', rank:150,
    group:'Terrier Group', origin:'Australia', alsoKnown:'Aussie Terrier',
    weight:'15–20 lb', height:'10–11 in', lifespan:'11–15 years',
    energyLabel:'High Energy', e:'high', s:'small', sLabel:'Small',
    api:'terrier/australian', emoji:'🦘',
    keywords:'australian terrier aussie terrier small terrier australia',
    tagline:'Australia\'s own terrier — spirited, alert, and surprisingly tough for their size',
    shortDesc:'Spirited Aussie terrier — small, tough, and full of personality.',
    ov1:'The Australian Terrier was the first breed developed and recognized in Australia, created to be a versatile working dog capable of hunting snakes and rodents, herding, and acting as a watchdog. British settlers bred several terrier types together to create this adaptable companion.',
    ov2:'Australian Terriers are confident, spirited, and eager to please — making them easier to train than many terriers. Their small size and moderate exercise needs make them more apartment-friendly than their energy level might suggest. They are alert and make excellent watchdogs.',
    traits:{energy:80,affection:85,kids:75,dogs:60,training:75},
    coat:'Rough, straight outer coat; soft undercoat; topknot',
    colors:'Blue and tan, sandy, or red',
    apt:'Yes — manageable with daily exercise',
    qf:['First breed developed and recognized in Australia','Can dispatch snakes and rodents effectively','One of the smallest working terriers','AKC recognized in 1960'],
    health:['Patellar luxation','Diabetes mellitus (higher incidence in breed)','Legg-Calvé-Perthes disease','Thyroid issues'],
    diet:{
      puppy:{a:'3–4 meals daily of small-breed puppy food',c:'⅓–½ cup per day total'},
      adult:{a:'2 meals daily; monitor for diabetes tendency',c:'½–¾ cup per day'},
      senior:{a:'2 meals daily; low-glycemic senior formula',c:'⅓–½ cup per day'}
    },
    nutri:['High-quality protein for an active small dog','Low-glycemic carbohydrates to manage diabetes risk','Omega-3s for rough coat condition','Calcium for small-breed bone health'],
    pupCost:'$800–$1,800', foodCost:'$30–$50/month', vetCost:'$400–$700/year', groomCost:'$200–$400/year', supplCost:'$150–$300/year',
    costNote:'Generally affordable; diabetes management costs can add up if the condition develops.',
    mixes:[{n:'Australian Terrier/Yorkshire Terrier mix',d:'Tiny, bold, and silky-coated terrier blend'},{n:'Australian Terrier/Cairn Terrier mix',d:'Scruffy, courageous, and endlessly curious companion'},{n:'Australian Terrier/Miniature Schnauzer mix',d:'Alert, smart, and spirited little watchdog'}],
    facts:['Historically used to kill venomous snakes in the Australian bush','Developed from a mix of Dandie Dinmont, Scottish, Yorkshire, and Cairn Terriers','Their keen hearing makes them exceptional watchdogs','Often described as having the courage of a dog three times their size'],
    ctaH:'Is an Australian Terrier Right for You?',
    ctaP:'If you want a spirited, confident, and adaptable small dog with true working terrier heritage, the Australian Terrier is a brilliant choice.'
  },
  {
    slug:'greyhound', name:'Greyhound', rank:151,
    group:'Hound Group', origin:'Egypt / Middle East', alsoKnown:'English Greyhound',
    weight:'60–70 lb', height:'27–30 in', lifespan:'10–13 years',
    energyLabel:'Low Energy', e:'low', s:'large', sLabel:'Large',
    api:'greyhound/italian', emoji:'💨',
    keywords:'greyhound english greyhound sighthound racing dog fastest dog',
    tagline:'The world\'s fastest dog — a gentle giant who loves nothing more than the couch',
    shortDesc:'World\'s fastest dog breed, paradoxically the ultimate couch potato.',
    ov1:'The Greyhound is one of the oldest dog breeds in the world, with depictions found in ancient Egyptian tombs dating back 4,000 years. Capable of reaching speeds up to 45 mph, the Greyhound is built for explosive short-distance sprinting rather than endurance.',
    ov2:'Despite their racing reputation, Greyhounds are gentle, quiet, and surprisingly lazy at home. They are the quintessential "45-mph couch potato." Many are rescued from racing careers and make wonderfully affectionate, low-maintenance companions — requiring only daily sprints in a securely fenced area.',
    traits:{energy:55,affection:80,kids:80,dogs:75,training:65},
    coat:'Short, smooth, close-lying',
    colors:'All colors: fawn, brindle, black, white, red, blue, and combinations',
    apt:'Possible with a safe outdoor space; surprisingly calm indoors',
    qf:['Can reach 45 mph — the world\'s fastest dog','Mentioned in the Bible and depicted in Egyptian tombs','Typically require only 30–40 minutes of exercise per day','The only dog breed directly mentioned in the King James Bible'],
    health:['Bloat (GDV)','Osteosarcoma','Sensitivity to anesthesia','Greyhound neuropathy'],
    diet:{
      puppy:{a:'3 meals daily of large-breed puppy formula',c:'2–3 cups per day total'},
      adult:{a:'2 meals daily of high-quality lean protein',c:'2½–3½ cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'2–2½ cups per day'}
    },
    nutri:['Lean, high-quality protein for greyhound physique','Low fat to maintain racing-lean build','Calcium for bone density','Omega-3s for joint and coat health'],
    pupCost:'$1,000–$2,500 (or free from adoption)', foodCost:'$60–$100/month', vetCost:'$400–$800/year', groomCost:'$100–$200/year', supplCost:'$200–$400/year',
    costNote:'Many Greyhounds are rescued for free or low cost from racing programs; anesthesia sensitivity means extra care with vet procedures.',
    mixes:[{n:'Greyhound/Labrador mix',d:'Friendly, athletic, and sleek all-around companion'},{n:'Greyhound/Border Collie mix',d:'Intelligent speed machine with herding instincts'},{n:'Greyhound/Saluki mix',d:'Supremely elegant ancient sighthound blend'}],
    facts:['Greyhounds have a 270-degree field of vision due to their narrow head','Their heart is proportionally larger than any other dog breed','Can go from 0 to 45 mph in just a few strides','A Greyhound named Snowflake reportedly outran a cheetah in a short sprint test'],
    ctaH:'Is a Greyhound Right for You?',
    ctaP:'If you want a gentle, elegant, and low-maintenance large dog who is happy with daily sprints followed by hours of lounging, the Greyhound is perfect.'
  },
  {
    slug:'kerry-blue-terrier', name:'Kerry Blue Terrier', rank:155,
    group:'Terrier Group', origin:'Ireland', alsoKnown:'Irish Blue Terrier',
    weight:'33–40 lb', height:'17.5–19.5 in', lifespan:'12–15 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'terrier/kerryblue', emoji:'💙',
    keywords:'kerry blue terrier irish blue terrier ireland national dog',
    tagline:'Ireland\'s national dog — a versatile, blue-coated terrier with boundless energy',
    shortDesc:'Ireland\'s national dog with a distinctive blue-gray coat and big personality.',
    ov1:'The Kerry Blue Terrier is Ireland\'s national dog, named after County Kerry where it originated. Originally bred as a versatile working dog for hunting, herding, and guarding, the Kerry Blue is athletic and highly capable. Its distinctive blue-gray coat is unique among terriers.',
    ov2:'Kerry Blues are energetic, headstrong, and deeply loyal to their family. They can be dog-aggressive, a common terrier trait, and require an experienced owner willing to provide consistent training and ample exercise. Their soft, wavy coat is non-shedding and requires regular grooming.',
    traits:{energy:85,affection:80,kids:70,dogs:45,training:65},
    coat:'Soft, wavy, dense; non-shedding; blue-gray in adults',
    colors:'Blue-gray (puppies are born black and develop blue coat by 18 months)',
    apt:'Not ideal — needs vigorous daily exercise',
    qf:['Ireland\'s national dog','Puppies are born black and gradually turn blue-gray','Used historically for hunting, herding, and water retrieving','AKC recognized in 1922'],
    health:['Hypothyroidism','Hip dysplasia','Cerebellar abiotrophy','Skin problems'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of high-quality protein',c:'1½–2 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['High-quality protein for active terrier build','Omega-3s and -6s for unique wavy coat','Zinc for skin health','Joint support supplements'],
    pupCost:'$1,200–$2,500', foodCost:'$50–$75/month', vetCost:'$400–$700/year', groomCost:'$400–$700/year', supplCost:'$200–$400/year',
    costNote:'Regular professional grooming is essential; otherwise a healthy breed with typical terrier care costs.',
    mixes:[{n:'Kerry Blue/Poodle mix',d:'Low-shedding, intelligent, and energetic curly companion'},{n:'Kerry Blue/Airedale mix',d:'Large, bold, and versatile working terrier blend'},{n:'Kerry Blue/Standard Schnauzer mix',d:'Smart, spirited, and distinctive working dog'}],
    facts:['Michael Collins, Irish revolutionary leader, reportedly owned a Kerry Blue Terrier','Were used as police dogs in Ireland in the early 20th century','Can work as a herding dog, hunting dog, and water retriever','The distinctive blue color is caused by a dilution gene'],
    ctaH:'Is a Kerry Blue Terrier Right for You?',
    ctaP:'If you want Ireland\'s versatile national dog with a stunning coat and courageous personality, the Kerry Blue Terrier is a unique treasure.'
  },
  {
    slug:'scottish-deerhound', name:'Scottish Deerhound', rank:156,
    group:'Hound Group', origin:'Scotland', alsoKnown:'Deerhound',
    weight:'75–110 lb', height:'28–32 in', lifespan:'8–11 years',
    energyLabel:'Medium Energy', e:'medium', s:'large', sLabel:'Large',
    api:'deerhound/scottish', emoji:'🦌',
    keywords:'scottish deerhound deerhound giant sighthound scotland',
    tagline:'The royal dog of Scotland — a gentle giant built to course stags through the Highlands',
    shortDesc:'Majestic, shaggy giant with a gentle soul and noble Highland heritage.',
    ov1:'The Scottish Deerhound is one of the most ancient breeds in Britain, bred specifically to hunt red deer in the Scottish Highlands. Historically, only Scottish nobility were permitted to own Deerhounds, and owning one could win a condemned man\'s freedom.',
    ov2:'Despite their imposing size, Scottish Deerhounds are extraordinarily gentle, sensitive, and laid-back at home. They require moderate daily exercise — including opportunities to sprint — but spend the rest of their time as graceful, dignified companions. Their shorter lifespan is a consideration for prospective owners.',
    traits:{energy:65,affection:85,kids:85,dogs:80,training:60},
    coat:'Harsh, wiry, ragged; 3–4 inches long; slightly softer on head',
    colors:'Dark blue-gray, gray brindle, yellow, sandy red, red fawn',
    apt:'No — needs space and a large secure yard',
    qf:['Historically owned only by Scottish nobility','Sir Walter Scott called the Deerhound "the most perfect creature in Heaven"','AKC recognized in 1886','Can course red deer weighing up to 500 lb'],
    health:['Cardiomyopathy','Osteosarcoma (bone cancer)','Bloat (GDV)','Cystinuria'],
    diet:{
      puppy:{a:'3–4 meals daily of giant-breed puppy formula (low-calcium)',c:'3–4 cups per day total'},
      adult:{a:'2 meals daily of high-quality lean protein',c:'3–4 cups per day'},
      senior:{a:'2 meals daily of senior large-breed formula',c:'2½–3 cups per day'}
    },
    nutri:['Lean protein for maintaining giant sighthound physique','Low fat for lean body condition','Omega-3s for wiry coat','Calcium carefully managed during growth'],
    pupCost:'$1,500–$2,500', foodCost:'$80–$120/month', vetCost:'$500–$900/year', groomCost:'$200–$400/year', supplCost:'$200–$400/year',
    costNote:'Higher food costs for giant breed; cardiac and cancer screening add to vet expenses; shorter lifespan is a factor.',
    mixes:[{n:'Scottish Deerhound/Irish Wolfhound mix',d:'Enormous, gentle, and deeply noble giant companion'},{n:'Scottish Deerhound/Greyhound mix',d:'Sleek yet shaggy sighthound of great speed'},{n:'Scottish Deerhound/Borzoi mix',d:'Aristocratic, flowing-coated giant of rare elegance'}],
    facts:['Mary Queen of Scots kept Scottish Deerhounds at her court','A Deerhound could course a red deer across miles of Highland terrain','They are among the tallest dog breeds in the world','Their rough coat provides protection against the harsh Highland climate'],
    ctaH:'Is a Scottish Deerhound Right for You?',
    ctaP:'If you have space for a gentle giant with noble heritage and a calm, loving temperament, the Scottish Deerhound is a magnificent companion.'
  },
  {
    slug:'lakeland-terrier', name:'Lakeland Terrier', rank:157,
    group:'Terrier Group', origin:'England', alsoKnown:'Lakie',
    weight:'17 lb', height:'14–15 in', lifespan:'12–15 years',
    energyLabel:'High Energy', e:'high', s:'small', sLabel:'Small',
    api:'terrier/lakeland', emoji:'⛰️',
    keywords:'lakeland terrier lakie english terrier fell terrier',
    tagline:'Bold fell hunter from the English Lake District — confident and surprisingly agile',
    shortDesc:'Confident, compact terrier bred for the rugged English fells.',
    ov1:'The Lakeland Terrier was developed in the Lake District of England to protect sheep from foxes during lambing season. Unlike most terriers that hunted solo, Lakies worked in packs with hounds, needing the stamina to keep up all day in rugged fell country.',
    ov2:'Lakeland Terriers are bold, self-confident, and friendly. They tend to be more adaptable than many terriers and generally get along better with other dogs. Their wiry coat requires regular grooming, including hand-stripping for show dogs. They are spirited companions with a sense of humor.',
    traits:{energy:80,affection:80,kids:75,dogs:65,training:65},
    coat:'Dense, wiry, weather-resistant double coat',
    colors:'Blue, black, liver, red, grizzle; may have tan markings',
    apt:'Yes — adaptable if well-exercised',
    qf:['Worked in packs alongside hounds in the Lake District','AKC recognized in 1934','Won Best in Show at Crufts and Westminster in the same year (1967)','Originally called the Patterdale Terrier or Fell Terrier'],
    health:['Legg-Calvé-Perthes disease','Lens luxation','Hypothyroidism','Von Willebrand\'s disease'],
    diet:{
      puppy:{a:'3 meals daily of small-breed puppy formula',c:'½–¾ cup per day total'},
      adult:{a:'2 meals daily of quality small-breed food',c:'¾–1 cup per day'},
      senior:{a:'2 meals daily of senior small-breed formula',c:'½–¾ cup per day'}
    },
    nutri:['High protein for active terrier lifestyle','Omega fatty acids for wiry coat health','Joint support for mountain-bred dog','Antioxidants for immune function'],
    pupCost:'$1,500–$2,500', foodCost:'$30–$50/month', vetCost:'$400–$700/year', groomCost:'$300–$500/year', supplCost:'$150–$300/year',
    costNote:'Moderate ownership costs; hand-stripping adds grooming expense but can be learned by dedicated owners.',
    mixes:[{n:'Lakeland/Welsh Terrier mix',d:'Double terrier energy with a bold, wiry personality'},{n:'Lakeland/Poodle mix',d:'Smart, low-shedding companion with terrier pluck'},{n:'Lakeland/Border Terrier mix',d:'Hardy, friendly terrier blend for active families'}],
    facts:['In 1967, a Lakeland Terrier named Stingray of Derryabah won Best in Show at both Crufts and Westminster','Their compact size allowed them to follow foxes deep into rocky dens','Can climb nearly vertical rock faces when motivated','One of the most versatile and athletic terrier breeds'],
    ctaH:'Is a Lakeland Terrier Right for You?',
    ctaP:'If you want a spirited, adaptable, and friendly terrier with genuine working heritage and a winning show record, the Lakeland is a great choice.'
  },
  {
    slug:'irish-red-and-white-setter', name:'Irish Red and White Setter', rank:162,
    group:'Sporting Group', origin:'Ireland', alsoKnown:'IRWS',
    weight:'35–60 lb', height:'22.5–26 in', lifespan:'11–15 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'setter/irish', emoji:'🍀',
    keywords:'irish red and white setter IRWS irish setter sporting dog',
    tagline:'The original Irish setter — athletic bird dog with a striking parti-color coat',
    shortDesc:'The older of the two Irish setters — athletic, friendly, and parti-colored.',
    ov1:'The Irish Red and White Setter predates the solid red Irish Setter and was the original bird dog of Ireland. Nearly extinct by the 20th century, dedicated breeders revived the breed. They are highly athletic, field-capable dogs used to hunt upland gamebirds.',
    ov2:'IRWS are energetic, friendly, and highly trainable compared to their solid red cousins. They are excellent family dogs who bond closely with all family members. Their high energy demands significant daily exercise, and they thrive in an active household with access to outdoor space.',
    traits:{energy:90,affection:90,kids:90,dogs:85,training:80},
    coat:'Fine, silky straight coat with feathering; parti-color base',
    colors:'White with solid red patches; red patches are clearly defined',
    apt:'No — needs significant daily exercise and space',
    qf:['Predates the solid Irish Setter by centuries','Nearly went extinct in the 1800s','AKC recognized in 2009','Used to hunt grouse, woodcock, and pheasant in Ireland'],
    health:['Hip dysplasia','Posterior polar cataract (PPC)','Canine leucocyte adhesion deficiency (CLAD)','Hypothyroidism'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1½–2 cups per day total'},
      adult:{a:'2 meals daily of high-quality active dog food',c:'2–3 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1½–2 cups per day'}
    },
    nutri:['High protein for athletic field dog','Omega-3s for silky coat feathering','Glucosamine for joint support','B vitamins for energy metabolism'],
    pupCost:'$1,500–$2,500', foodCost:'$55–$85/month', vetCost:'$400–$800/year', groomCost:'$200–$400/year', supplCost:'$200–$400/year',
    costNote:'CLAD and PPC genetic testing adds to initial costs; otherwise a healthy and active breed.',
    mixes:[{n:'IRWS/Irish Setter mix',d:'Double Irish setter heritage with stunning red coloring'},{n:'IRWS/English Setter mix',d:'Elegant, birdy, and friendly tri-color setter blend'},{n:'IRWS/Labrador mix',d:'Friendly, athletic, and biddable family companion'}],
    facts:['Father Gall, an 18th-century Irish monk, is credited with early records of the breed','Their white base coat helps hunters spot them in dense undergrowth','More biddable and easier to train than the solid Irish Setter','The breed club was formed in 1944 to save the breed from extinction'],
    ctaH:'Is an Irish Red and White Setter Right for You?',
    ctaP:'If you want an energetic, friendly Irish bird dog with rare beauty and a willing spirit, the IRWS is a remarkable sporting companion.'
  },
  {
    slug:'spanish-water-dog', name:'Spanish Water Dog', rank:167,
    group:'Herding Group', origin:'Spain', alsoKnown:'Perro de Agua Español',
    weight:'31–49 lb', height:'15.75–19.75 in', lifespan:'12–14 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'waterdog/spanish', emoji:'🌊',
    keywords:'spanish water dog perro de agua espanol curly herding water dog',
    tagline:'Versatile Spanish working dog — herder, hunter, and water retriever in one curly package',
    shortDesc:'Curly-coated Spanish all-rounder — herder, hunter, and water dog.',
    ov1:'The Spanish Water Dog is an ancient, versatile working dog from Spain used to herd sheep, hunt, and retrieve waterfowl. Their distinctive wooly, curly coat is corded when left to grow naturally and should never be combed or brushed.',
    ov2:'Spanish Water Dogs are highly intelligent, loyal, and energetic. They form strong bonds with their primary handler and can be reserved with strangers. They excel in herding trials, agility, and water sports. Their unique coat is nearly waterproof and low-shedding.',
    traits:{energy:85,affection:80,kids:75,dogs:70,training:80},
    coat:'Curly, wooly; can be corded when grown long; never brushed',
    colors:'Solid (black, brown, beige, white) or parti-color with white',
    apt:'No — needs vigorous daily exercise and mental challenge',
    qf:['Their coat should never be brushed — only combed when short, corded when long','AKC recognized in 2015','Used for centuries as an all-purpose working dog in Spain','Webbed feet make them exceptional swimmers'],
    health:['Hip dysplasia','Progressive retinal atrophy','Hypothyroidism','Exocrine pancreatic insufficiency'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of high-quality active dog food',c:'1½–2½ cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['High protein for active working dog','Omega-3s for curly coat health','Digestive enzymes (EPI risk)','Antioxidants for overall health'],
    pupCost:'$1,200–$2,500', foodCost:'$50–$75/month', vetCost:'$400–$700/year', groomCost:'$300–$600/year', supplCost:'$200–$400/year',
    costNote:'Unique coat care is the primary grooming challenge; find a groomer experienced with corded/curly breeds.',
    mixes:[{n:'Spanish Water Dog/Poodle mix',d:'Double curly intelligence with low-shedding coat'},{n:'Spanish Water Dog/Border Collie mix',d:'Extreme intelligence and drive in a curly package'},{n:'Spanish Water Dog/Portuguese Water Dog mix',d:'Double water dog blend with athletic versatility'}],
    facts:['Their cords form naturally if the coat is left to grow without brushing','Historically used on fishing boats in Spain as retrievers','One of the few herding breeds that also excels at water work','Their webbed feet are an unusual trait for a herding breed'],
    ctaH:'Is a Spanish Water Dog Right for You?',
    ctaP:'If you want a highly capable, versatile working dog with a unique corded coat and boundless energy, the Spanish Water Dog is a fascinating choice.'
  },
  {
    slug:'danish-swedish-farmdog', name:'Danish-Swedish Farmdog', rank:170,
    group:'Terrier Group', origin:'Denmark / Sweden', alsoKnown:'Dansk-Svensk Gårdshund',
    weight:'15–25 lb', height:'12–14.5 in', lifespan:'11–13 years',
    energyLabel:'High Energy', e:'high', s:'small', sLabel:'Small',
    api:'terrier/rat', emoji:'🌾',
    keywords:'danish swedish farmdog dansk-svensk gardshund scandinavian terrier farm dog',
    tagline:'Scandinavia\'s lively little farm worker — energetic, friendly, and surprisingly versatile',
    shortDesc:'Lively Scandinavian farm dog — agile, trainable, and family-friendly.',
    ov1:'The Danish-Swedish Farmdog has worked on Scandinavian farms for centuries, hunting rats and mice, herding livestock, and serving as a family companion. Despite their small size, they are capable working dogs with terrier tenacity and surprising trainability.',
    ov2:'Danish-Swedish Farmdogs are energetic, sociable, and quick to learn. They are more biddable than most terriers and excel in dog sports including agility, flyball, and tricks. Their compact size and friendly nature make them excellent family dogs for active households.',
    traits:{energy:85,affection:90,kids:90,dogs:85,training:80},
    coat:'Short, smooth, dense',
    colors:'White with patches of black, brown, or tri-color; white must be present',
    apt:'Possible but needs vigorous daily exercise',
    qf:['One of Scandinavia\'s oldest breeds','AKC recognized in 2011','More trainable than most terriers — often compared to herding dogs','Used as circus dogs due to their trick-learning ability'],
    health:['Patellar luxation','Hip dysplasia','Eye conditions','Dental crowding'],
    diet:{
      puppy:{a:'3–4 meals daily of small-breed puppy formula',c:'½–¾ cup per day total'},
      adult:{a:'2 meals daily of quality small-breed food',c:'¾–1 cup per day'},
      senior:{a:'2 meals daily of senior small-breed formula',c:'½–¾ cup per day'}
    },
    nutri:['High protein for active small working dog','Omega-3s for short coat sheen','Dental health diet to manage crowding risk','Joint support for agile dog'],
    pupCost:'$1,000–$2,000', foodCost:'$25–$45/month', vetCost:'$300–$600/year', groomCost:'$100–$200/year', supplCost:'$150–$300/year',
    costNote:'Low grooming costs for smooth coat; main expenses are enrichment activities and dog sports equipment.',
    mixes:[{n:'Danish-Swedish Farmdog/Jack Russell mix',d:'Double terrier energy with extreme athleticism'},{n:'Danish-Swedish Farmdog/Border Collie mix',d:'Brilliant, agile, and trainable small working dog'},{n:'Danish-Swedish Farmdog/Rat Terrier mix',d:'Lightning-fast, clever, and compact companion'}],
    facts:['Historically used as circus performers due to their learning speed','Can learn tricks in just a few repetitions','Their short coat is nearly maintenance-free','Popular in Scandinavia for agility, flyball, and disc dog competitions'],
    ctaH:'Is a Danish-Swedish Farmdog Right for You?',
    ctaP:'If you want a small, energetic, and surprisingly trainable companion with Scandinavian working heritage, the Danish-Swedish Farmdog is a wonderful discovery.'
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

console.log('\nBatch 5 done: 10 files, index + sitemap updated.');
