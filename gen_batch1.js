// Batch 1 – AKC breeds #31–#65 (10 breeds)
// brittany, english-cocker-spaniel, pug, shiba-inu, australian-cattle-dog,
// giant-schnauzer, german-wirehaired-pointer, russell-terrier,
// staffordshire-bull-terrier, cardigan-welsh-corgi
const fs = require('fs');
const TODAY = '2026-05-25';

const breeds = [
  {
    slug:'brittany', name:'Brittany', rank:31, group:'Sporting', origin:'France',
    alsoKnown:'Brittany Spaniel, Épagneul Breton', weight:'30–40 lbs', height:'17–21 in',
    lifespan:'12–14 yrs', energyLabel:'High', e:'high', s:'medium', sLabel:'Medium',
    api:'spaniel/brittany', emoji:'🍂', keywords:'brittany spaniel french bird dog sporting',
    tagline:"France's compact, tailless bird dog — a tireless pointing spaniel with boundless enthusiasm, a championship-caliber nose, and more AKC Dual Champions than any other breed",
    shortDesc:"Compact French bird dog with a big nose, boundless energy, and a gentle, biddable personality — more AKC Dual Champions than any other breed.",
    ov1:"The Brittany is a versatile French sporting dog developed in the Bretagne region of northwestern France for hunting upland birds, especially woodcock and partridge. Unlike traditional flushing spaniels, the Brittany evolved pointing instincts through 19th-century selective breeding that produced a compact, tailless gun dog equally skilled at finding, pointing, and retrieving game. It was recognized by the AKC in 1934 as the 'Brittany Spaniel' — the word 'Spaniel' was dropped in 1982 to reflect its pointing, not flushing, behavior.",
    ov2:"Off the field, Brittanys are gentle, affectionate, and excellent with children, making them as popular with families as with hunters. They are among the most biddable sporting breeds, responding beautifully to positive training with minimal correction needed. However, they need substantial daily exercise — without enough activity they become restless and inventive about channeling their energy indoors.",
    traits:{energy:88,affection:90,kids:88,dogs:85,training:85},
    coat:"Dense, flat or wavy with light feathering on legs and belly; easy to maintain",
    colors:"Orange and white, liver and white, black and white, or tricolor",
    apt:"No — needs outdoor space and vigorous daily exercise",
    qf:["<strong>AKC Rank:</strong> #31 most popular (2025)","<strong>Group:</strong> Sporting","<strong>Origin:</strong> Brittany, France","<strong>Also Known As:</strong> Brittany Spaniel, Épagneul Breton","<strong>Size:</strong> Medium","<strong>Good for First-Time Owners:</strong> Yes — biddable, gentle, and eager to please"],
    health:["Hip dysplasia — OFA testing recommended; relatively low prevalence in this medium-sized breed","Epilepsy — idiopathic epilepsy documented in the breed; discuss history with your breeder","Hypothyroidism — thyroid issues can appear in middle age; annual wellness panels recommended","Ear infections — floppy ears trap moisture; regular inspection and cleaning required"],
    diet:{puppy:{a:"1.5–2.5 cups",c:"600–900 kcal"},adult:{a:"1.5–2.5 cups",c:"600–900 kcal"},senior:{a:"1–2 cups",c:"450–700 kcal"}},
    nutri:["High-quality protein supports the Brittany's lean athletic build and hunting endurance","Avoid overfeeding — compact frame gains weight quickly when under-exercised","Omega-3 fatty acids support coat quality and joint health in this active sporting breed","Feed twice daily on a schedule rather than free-feeding to support an active lifestyle"],
    pupCost:"$800–$1,500", foodCost:"$450–$700", vetCost:"$400–$650", groomCost:"$150–$300", supplCost:"$200–$400",
    costNote:"The Brittany is one of the most affordable sporting breeds — its short, easy-care coat nearly eliminates grooming costs, and medium size keeps food modest.",
    mixes:[
      {n:"Brittany × Golden Retriever",d:"The Brittany's bird-hunting nose meets the Golden's legendary warmth — a medium-sized, active companion equally happy in the field or the backyard."},
      {n:"Brittany × Labrador Mix",d:"A friendly, energetic gun dog blending the Brittany's pointing instincts with the Lab's renowned retrieving drive — a dual-purpose hunting companion."},
      {n:"Brittany × Border Collie Mix",d:"High intelligence meets high energy in an agile, quick-thinking working dog that excels at dog sports and any activity with a clear job to do."},
      {n:"Brittany × English Springer Spaniel Mix",d:"Two enthusiastic bird dogs combine into one eager flushing-and-pointing companion packed with sporting drive and family-friendly warmth."},
    ],
    facts:[
      "🏅 The Brittany holds an extraordinary record in American dog sports: it has earned more Dual Championships — titles requiring excellence in both AKC conformation showing AND field hunting events — than any other breed in history. No other sporting dog has so consistently produced individuals capable of winning in the show ring while simultaneously performing at the highest level in the field.",
      "✂️ Brittanys are born with naturally bobbed tails more often than most breeds. In countries where tail docking is prohibited, many Brittanys retain their distinctive short silhouette without surgical modification — roughly one in five is born with a naturally abbreviated stub that breeders have selected for over generations.",
      "🍂 Despite its French origins, the Brittany is now more popular in the United States than in France itself. American hunters adopted the breed in the mid-20th century for upland bird hunting of pheasant, quail, and woodcock, and the US Brittany population today dwarfs that of its homeland.",
      "📛 The AKC dropped the word 'Spaniel' from the Brittany's official name in 1982 — a rare event in breed naming history — because its pointing behavior is fundamentally different from the flushing behavior of true spaniels, and the rename recognized what hunters had always known: the Brittany is its own distinct type of gun dog.",
      "🐾 The Brittany matures slowly, often not reaching full emotional maturity until about age two. Young Brittanys can appear hyperactive, but given consistent exercise and patient positive training, the breed typically settles into one of the most balanced and agreeable sporting companions available to active families.",
    ],
    ctaH:"Traveling with Your Brittany?", ctaP:"France's most versatile bird dog deserves expert care on every adventure."
  },
  {
    slug:'english-cocker-spaniel', name:'English Cocker Spaniel', rank:35, group:'Sporting', origin:'England',
    alsoKnown:'Cocker Spaniel (UK), ECS, Cocker', weight:'20–30 lbs', height:'15–17 in',
    lifespan:'12–14 yrs', energyLabel:'Medium', e:'medium', s:'small', sLabel:'Small',
    api:'spaniel/cocker', emoji:'🌹', keywords:'english cocker spaniel british sporting dog',
    tagline:"England's beloved merry cocker — a compact, silky-eared spaniel with an eternally wagging tail, a gentle soul, and one of the finest noses in the flushing world",
    shortDesc:"England's original cocker spaniel — a compact, merry, silky-eared bird dog with a wagging tail that never seems to stop and a gentle, devoted personality.",
    ov1:"The English Cocker Spaniel is the original 'Cocker,' developed in England centuries before its American cousin was split into a separate breed. The name 'Cocker' comes from the woodcock — a bird the breed was specifically bred to flush from dense cover. Distinguished from the American Cocker by its longer muzzle, flatter head, and more athletic build, the English Cocker is first and foremost a working gun dog that has also earned a well-deserved reputation as a superb family companion.",
    ov2:"English Cockers are famous for their 'merry' temperament — a term used in the breed standard to describe their constantly wagging tails and enthusiastic, happy nature. They bond deeply with their families and tend to be gentle with children and sociable with other dogs. They require daily exercise and regular grooming of their silky coats, but reward their owners with exceptional loyalty and affection.",
    traits:{energy:72,affection:92,kids:88,dogs:88,training:80},
    coat:"Silky, flat or slightly wavy with moderate feathering on ears, chest, belly, and legs",
    colors:"Black, liver, red, golden, blue roan, liver roan, orange roan, and various parti-colors",
    apt:"Yes, if given daily walks and playtime — adaptable to apartment life with exercise",
    qf:["<strong>AKC Rank:</strong> #35 most popular (2025)","<strong>Group:</strong> Sporting","<strong>Origin:</strong> England","<strong>Also Known As:</strong> Cocker Spaniel (in UK), ECS","<strong>Size:</strong> Small","<strong>Good for Families:</strong> Excellent — gentle, affectionate, and merry"],
    health:["Progressive retinal atrophy (PRA) — genetic testing available; ask breeder for clear results","Hip dysplasia — less common than in larger breeds but worth testing in breeding stock","Familial nephropathy — a kidney disease with a genetic test available; screen breeding dogs","Ear infections — long, floppy ears create a warm, moist environment; clean ears weekly"],
    diet:{puppy:{a:"1–2 cups",c:"450–750 kcal"},adult:{a:"1–1.75 cups",c:"450–700 kcal"},senior:{a:"0.75–1.5 cups",c:"350–550 kcal"}},
    nutri:["Quality protein and moderate fat support the ECS's active but compact build","Avoid overfeeding — this breed gains weight easily and obesity stresses joints","Omega-3s help keep the silky coat in top condition and reduce inflammation","Split meals into two feedings to avoid bloat and maintain steady energy levels"],
    pupCost:"$800–$1,800", foodCost:"$400–$650", vetCost:"$400–$700", groomCost:"$400–$700", supplCost:"$200–$350",
    costNote:"Grooming is the main ongoing cost — the silky coat requires professional trimming every 6–8 weeks plus regular brushing at home to prevent mats.",
    mixes:[
      {n:"English Cocker Spaniel × Poodle (Cockapoo)",d:"One of Britain's most beloved crossbreeds — the Cocker's merry temperament meets the Poodle's intelligence in a low-shedding, highly trainable family dog."},
      {n:"English Cocker Spaniel × Golden Retriever Mix",d:"Gentle meets gentle in this affectionate, medium-sized companion with a love of water, outdoor adventures, and being by its family's side."},
      {n:"English Cocker Spaniel × Labrador Mix",d:"A friendly, energetic sporting mix combining the Cocker's refined nose and gentle nature with the Lab's famous enthusiasm and trainability."},
      {n:"English Cocker Spaniel × Cavalier Mix",d:"Two of England's most affectionate spaniel breeds combine into a gentle, adaptable companion suited to families, retirees, and anyone seeking unwavering devotion."},
    ],
    facts:[
      "🌹 The English Cocker Spaniel and the American Cocker Spaniel were considered the same breed until 1946, when the AKC officially separated them based on structural differences developed through decades of independent breeding programs in England and the United States. Today they are distinct breeds with different breed standards, though they share the same ancient spaniel ancestry.",
      "🏆 The English Cocker Spaniel has won Best in Show at Crufts — the world's largest dog show — more times than any other breed. This extraordinary record speaks to the breed's consistent quality and its embodiment of everything the British fancy values in a sporting companion: balance, soundness, and that unmistakable 'merry' temperament.",
      "🐦 The name 'Cocker' specifically refers to the woodcock — a long-billed woodland bird that was the breed's primary quarry. The Cocker was bred to push through dense undergrowth and flush woodcock into the air for waiting hunters, a task requiring a compact body, a fearless spirit, and an outstanding nose working close to the hunter.",
      "📚 The fictional dog Flush — the beloved spaniel of poet Elizabeth Barrett Browning, immortalized in Virginia Woolf's 1933 novel of the same name — was an English Cocker Spaniel. Flush's portrait by artist Edwin Landseer, and Woolf's imaginative account of his inner life, made the breed a symbol of artistic and literary Victorian England.",
      "🧬 The English Cocker Spaniel comes in a remarkable variety of colors — over 20 recognized color combinations, including solid colors, roans, parti-colors, and ticked patterns. This variety is unmatched among sporting breeds and makes every English Cocker visually unique, a characteristic breeders have cultivated for over a century.",
    ],
    ctaH:"Traveling with Your English Cocker Spaniel?", ctaP:"England's most merry sporting dog gets attentive, expert care every step of the journey."
  },
  {
    slug:'pug', name:'Pug', rank:38, group:'Toy', origin:'China',
    alsoKnown:'Dutch Bulldog, Mops (Germany), Carlin (France)', weight:'14–18 lbs', height:'10–13 in',
    lifespan:'13–15 yrs', energyLabel:'Low', e:'low', s:'small', sLabel:'Small',
    api:'pug', emoji:'😤', keywords:'pug toy dog chinese flat face wrinkles',
    tagline:"The ancient Chinese philosopher-dog — a wrinkled, flat-faced charmer whose entire purpose is human companionship, delivered with comedic flair and absolute devotion",
    shortDesc:"Ancient Chinese companion dog with a wrinkled face, curled tail, and huge personality — the original 'multum in parvo' (a lot of dog in a small package).",
    ov1:"The Pug is one of the oldest dog breeds in the world, with origins in ancient China dating back to at least 400 BCE, where it was kept as a prized companion of Chinese emperors. Pugs arrived in Europe in the 16th century via Dutch trading ships and quickly captivated the royal courts of Holland, England, and France. The breed's Latin motto, 'multum in parvo,' meaning 'a lot in a little,' captures its personality perfectly: enormous character packed into a compact, wrinkled body.",
    ov2:"Pugs are quintessential companion dogs — they live for human attention and are remarkably adaptable to apartment living, older owners, and families with children. They are playful, affectionate, and comedically expressive, using their large, soulful eyes and elaborate facial wrinkles to communicate with disarming effectiveness. Their low exercise needs make them ideal for less active owners, though their brachycephalic (flat-faced) anatomy requires special care in heat and humidity.",
    traits:{energy:42,affection:95,kids:90,dogs:85,training:58},
    coat:"Fine, smooth, and glossy; double coat with a soft undercoat that sheds considerably",
    colors:"Fawn (most common) or black; fawn Pugs have a black mask and black ears",
    apt:"Yes — ideal apartment dog; low exercise needs, loves indoor life and couches",
    qf:["<strong>AKC Rank:</strong> #38 most popular (2025)","<strong>Group:</strong> Toy","<strong>Origin:</strong> China (ancient)","<strong>Also Known As:</strong> Dutch Bulldog, Mops, Carlin","<strong>Size:</strong> Small","<strong>Good for Apartments:</strong> Excellent — one of the best apartment breeds"],
    health:["Brachycephalic Obstructive Airway Syndrome (BOAS) — the flat face causes breathing difficulties; avoid heat and strenuous exercise","Pug Dog Encephalitis (PDE) — a serious breed-specific brain inflammation; no cure exists, but it is not universal","Eye injuries and corneal ulcers — prominent eyes are vulnerable to scratches and trauma; keep nails trimmed on all pets","Obesity — Pugs love food and have low activity; strict portion control is essential throughout their lives"],
    diet:{puppy:{a:"0.5–1 cup",c:"300–500 kcal"},adult:{a:"0.5–0.75 cup",c:"300–450 kcal"},senior:{a:"0.5 cup",c:"250–380 kcal"}},
    nutri:["Strict portion control is essential — Pugs are extremely food-motivated and gain weight easily","Avoid exercise immediately after eating to reduce aspiration risk given their airway anatomy","Choose foods with moderate fat content; obesity dramatically worsens BOAS breathing issues","Feed from a raised bowl to ease swallowing, and select kibble sized for flat-faced breeds"],
    pupCost:"$600–$1,500", foodCost:"$300–$500", vetCost:"$500–$1,000", groomCost:"$200–$400", supplCost:"$150–$300",
    costNote:"Veterinary costs can be higher than average due to potential respiratory, eye, and skin-fold issues — factor in pet insurance and budget for possible BOAS treatment.",
    mixes:[
      {n:"Pug × Beagle (Puggle)",d:"One of the most popular hybrids — the Pug's loving personality with the Beagle's longer muzzle reduces some breathing concerns while keeping the compact, fun-loving nature."},
      {n:"Pug × French Bulldog (Frenchie Pug)",d:"Two brachycephalic toy breeds combine into an ultra-compact, wrinkled companion with an enormous personality and a face that practically demands affection."},
      {n:"Pug × Chihuahua (Chug)",d:"A tiny, bold, affectionate crossbreed that blends the Pug's sociability with the Chihuahua's loyalty and occasionally spicy personality in a very small package."},
      {n:"Pug × Poodle (Pugapoo)",d:"The Poodle's intelligence and low-shedding coat meet the Pug's devoted companionship — a clever, affectionate small dog that may benefit from the Poodle's longer muzzle."},
    ],
    facts:[
      "😤 Pugs were so prized by Chinese emperors that they were given their own palaces, kept warm by special soldiers, and treated as living treasures of the imperial court. The breed's royal status in China meant it was initially unavailable to common people — only the emperor's favor could grant ownership of a Pug to someone outside the royal household.",
      "🇳🇱 The Pug became the official dog of the House of Orange in the Netherlands after a Pug allegedly saved the life of William the Silent by alerting him to the approach of Spanish assassins in 1572. Whether historically accurate or embellished legend, the story cemented the Pug's royal status in Dutch culture, and it traveled to England with William III when he took the British throne in 1689.",
      "⭐ The Pug has appeared in more famous laps than perhaps any other breed: Napoleon's wife Josephine refused to share her bed without her Pug Fortune, Queen Victoria kept and bred dozens of Pugs, and the Duke and Duchess of Windsor traveled with a pack of Pugs across post-WWII Europe. The breed's association with royalty, fashion, and celebrity has persisted from ancient China through the modern era.",
      "😴 Pugs are champion snorers. Their flat faces and elongated soft palates cause air to vibrate noisily during both sleeping and waking, producing the characteristic grunting, snuffling, and wheezing sounds that Pug owners find endearing. New owners should be forewarned: sleeping in the same room as a Pug often requires earplugs or an acceptance of ambient snoring as a permanent feature of home life.",
      "🌡️ Pugs are one of the breeds most vulnerable to heatstroke, and have died from heat exposure far more easily than long-muzzled breeds. Their flat faces give them insufficient room to pant effectively — the primary cooling mechanism for dogs — meaning even moderate heat and humidity can become dangerous rapidly. Pug owners must strictly limit outdoor time in warm weather and ensure constant access to cool, air-conditioned environments.",
    ],
    ctaH:"Traveling with Your Pug?", ctaP:"Your flat-faced companion needs climate-controlled, expert care every step of the way."
  },
  {
    slug:'shiba-inu', name:'Shiba Inu', rank:44, group:'Non-Sporting', origin:'Japan',
    alsoKnown:'Shiba, Japanese Shiba Inu, Little Brushwood Dog', weight:'17–23 lbs', height:'13–17 in',
    lifespan:'13–16 yrs', energyLabel:'High', e:'high', s:'small', sLabel:'Small',
    api:'shiba', emoji:'🦊', keywords:'shiba inu japanese spitz fox dog',
    tagline:"Japan's ancient mountain hunter — a fox-like, fiercely independent Spitz-type dog famous for its dramatic 'Shiba scream,' intense loyalty, and cat-like self-sufficiency",
    shortDesc:"Japan's iconic fox-like hunting dog — fiercely independent, immaculately clean, intensely loyal to its owner, and prone to dramatic vocalizations when displeased.",
    ov1:"The Shiba Inu is the smallest of Japan's six native breeds and the most popular dog in Japan today. It was originally developed in the mountainous Chubu region to flush small game and birds from dense brush — its name means 'little brushwood dog' in Japanese (though 'shiba' also means 'small' in an old dialect). The breed nearly went extinct during World War II but was revived through careful reconstruction programs using the remaining bloodlines from three distinct regional strains.",
    ov2:"The Shiba Inu is known for its cat-like independence, meticulous self-grooming habits, and what owners describe as a 'spirited boldness' — a polite term for a dog that knows its own mind and rarely changes it. Shibas bond deeply with their primary person but can be aloof with strangers and challenging with other dogs. They require patient, experienced owners who understand that a Shiba's cooperation must be earned, not commanded.",
    traits:{energy:80,affection:72,kids:65,dogs:55,training:52},
    coat:"Double coat with a stiff, straight outer coat and soft, thick undercoat; sheds heavily twice yearly",
    colors:"Red (most iconic), red sesame, black and tan, or cream",
    apt:"Possible with daily vigorous exercise, but a securely fenced yard is strongly recommended",
    qf:["<strong>AKC Rank:</strong> #44 most popular (2025)","<strong>Group:</strong> Non-Sporting","<strong>Origin:</strong> Japan","<strong>Also Known As:</strong> Shiba, Little Brushwood Dog","<strong>Size:</strong> Small","<strong>Good for First-Time Owners:</strong> No — requires experienced, patient handling"],
    health:["Allergies — Shibas are prone to environmental and food allergies causing skin irritation and itching","Hip dysplasia — OFA testing recommended for breeding stock; less common than in larger breeds","Patellar luxation — knee cap slippage common in smaller breeds; watch for skipping gait","Glaucoma — eye pressure issues can occur; annual eye exams recommended from middle age"],
    diet:{puppy:{a:"0.75–1.25 cups",c:"400–650 kcal"},adult:{a:"0.75–1.25 cups",c:"400–650 kcal"},senior:{a:"0.6–1 cup",c:"320–520 kcal"}},
    nutri:["High-protein diet suits the Shiba's ancestral hunting background and lean, muscular build","Grain-free or limited-ingredient formulas may help if allergies are suspected","Omega-3 supplements support the Shiba's thick double coat and reduce seasonal shedding severity","Measure meals precisely — Shibas are not typically prone to bloat but obesity shortens their lives"],
    pupCost:"$1,400–$3,500", foodCost:"$400–$650", vetCost:"$450–$750", groomCost:"$200–$400", supplCost:"$200–$400",
    costNote:"Shiba Inu puppies from reputable Japanese bloodlines command premium prices; the breed's growing international popularity has driven breeder waitlists in major US cities.",
    mixes:[
      {n:"Shiba Inu × Husky (Shiba Husky)",d:"Two ancient Spitz-type hunters combine into a striking, independent, highly energetic dog that needs experienced owners and serious daily exercise."},
      {n:"Shiba Inu × Corgi (Shiba Corgi)",d:"The Shiba's fox-like face meets the Corgi's herding instincts — a compact, spirited, and surprisingly vocal little companion with a big personality."},
      {n:"Shiba Inu × Golden Retriever Mix",d:"The Shiba's independence tempered by the Golden's warmth — a medium-sized companion that may be more sociable than a purebred Shiba while retaining its elegant foxlike appearance."},
      {n:"Shiba Inu × Poodle (Shibadoodle)",d:"A clever, potentially low-shedding crossbreed that blends the Shiba's spirit and self-sufficiency with the Poodle's trainability and low-allergen coat."},
    ],
    facts:[
      "😱 The 'Shiba scream' is one of the internet's most recognizable dog sounds — a high-pitched, human-like wail that Shibas produce when they're displeased, restrained, or dramatically inconvenienced. Unlike most dogs that bark or whine, the Shiba Inu produces a sound that strikes many first-time owners as startlingly human, ranging from a piercing shriek to an extended moan of theatrical protest.",
      "🗾 The Shiba Inu nearly went extinct during World War II, with all three of the breed's distinct regional strains severely depleted through wartime food shortages and a distemper epidemic that swept Japan in 1952. A careful breeding reconstruction program saved the Shiba by combining the surviving San'in, Mino, and Shinshu strains into a unified modern breed that was officially designated a Japanese Natural Monument in 1936.",
      "🐱 The Shiba Inu is often described as the 'cat of the dog world' — it grooms itself fastidiously, dislikes being wet or dirty, maintains personal space, can be affectionate on its own terms, and holds an intense preference for its chosen person while remaining coolly indifferent to most others. Unlike cats, however, Shibas are athletic, require substantial daily exercise, and will escape any enclosure not specifically designed to contain them.",
      "🌍 The Shiba Inu is the most popular dog breed in Japan and has become one of the most searched dog breeds on the internet globally, partly due to the 'Doge' meme featuring a Shiba named Kabosu. That single meme, posted in 2013, introduced the Shiba Inu to millions of people who had never heard of the breed, contributing to a dramatic increase in demand for Shiba puppies in western countries.",
      "🦊 The Shiba Inu's resemblance to a fox is striking enough that the breed is often called the 'fox dog' outside Japan. The similarity is entirely convergent — the Shiba evolved its pointed muzzle, upright ears, curled tail, and reddish coloration as adaptations for hunting in Japan's mountain forests, not from any genetic relationship to foxes. The comparison is so universal that the red-coated Shiba has become the go-to reference image when pop culture needs 'a fox that's actually a dog.'",
    ],
    ctaH:"Traveling with Your Shiba Inu?", ctaP:"Japan's most independent breed deserves calm, stress-free expert care on every journey."
  },
  {
    slug:'australian-cattle-dog', name:'Australian Cattle Dog', rank:47, group:'Herding', origin:'Australia',
    alsoKnown:'Blue Heeler, Red Heeler, Queensland Heeler, ACD', weight:'35–50 lbs', height:'17–20 in',
    lifespan:'12–16 yrs', energyLabel:'High', e:'high', s:'medium', sLabel:'Medium',
    api:'cattledog/australian', emoji:'🐮', keywords:'australian cattle dog blue heeler red heeler herding',
    tagline:"Australia's tireless cattle-driving machine — a compact, tenacious herder that bites heels, thinks independently, and holds the record for the world's oldest verified dog",
    shortDesc:"Australia's blue or red speckled herding dog — relentlessly energetic, fiercely intelligent, and the breed that produced Bluey, the world's oldest dog ever recorded.",
    ov1:"The Australian Cattle Dog was developed in 19th-century Australia specifically to herd cattle across the vast, rugged terrain of the Queensland outback — a job that required a dog that could work all day in extreme heat, think independently, and handle wild or semi-feral cattle without flinching. Breeders crossed imported Smithfield herding dogs with Australian Dingos, then added Dalmatian, Kelpie, and Black and Tan Kelpie blood to produce the exceptionally hardy, loyal, and intelligent breed we know today.",
    ov2:"The ACD is not a pet for sedentary owners — it needs a job, a purpose, and hours of daily physical and mental exercise to remain balanced. Without sufficient stimulation, ACDs become destructive, vocal, and inventive about finding their own entertainment. For active families, farmers, hikers, or competitive dog sport participants, however, the Australian Cattle Dog is an unparalleled partner: loyal, tireless, and capable of learning virtually anything taught with patience and consistency.",
    traits:{energy:96,affection:80,kids:70,dogs:65,training:88},
    coat:"Smooth double coat that is extremely weather-resistant; sheds year-round, heaviest twice yearly",
    colors:"Blue (speckled or mottled with or without black, blue, or tan markings) or red speckled",
    apt:"No — needs substantial outdoor space and a minimum of 2 hours vigorous exercise daily",
    qf:["<strong>AKC Rank:</strong> #47 most popular (2025)","<strong>Group:</strong> Herding","<strong>Origin:</strong> Queensland, Australia","<strong>Also Known As:</strong> Blue Heeler, Red Heeler, Queensland Heeler, ACD","<strong>Size:</strong> Medium","<strong>Good for First-Time Owners:</strong> No — requires experienced owners with active lifestyles"],
    health:["Progressive retinal atrophy (PRA) and deafness — genetic tests available; screen breeding stock","Hip and elbow dysplasia — OFA certification recommended despite the breed's typically sound structure","Portosystemic shunt — a liver defect more common in ACDs than many breeds; screen puppies","Obesity in retirement — highly active working dogs gain weight rapidly when exercise decreases in old age"],
    diet:{puppy:{a:"1.5–2.5 cups",c:"600–950 kcal"},adult:{a:"1.5–2.5 cups",c:"700–1,000 kcal"},senior:{a:"1.25–2 cups",c:"550–800 kcal"}},
    nutri:["High-protein, moderate-fat diet fuels the ACD's extreme working capacity and lean muscle mass","Working and sport dogs may need 25–50% more calories than sedentary pets of the same size","Joint supplements (glucosamine, chondroitin) help support an intensely active working dog's longevity","Feed after exercise, not before, to reduce bloat risk in this active but deep-chested medium breed"],
    pupCost:"$800–$2,000", foodCost:"$500–$800", vetCost:"$450–$700", groomCost:"$100–$250", supplCost:"$200–$400",
    costNote:"The ACD is an economical breed to own — its weather-resistant coat needs minimal professional grooming, and its robust constitution means fewer vet visits than many purebreds.",
    mixes:[
      {n:"Australian Cattle Dog × Labrador Mix",d:"The ACD's intelligence and work drive meets the Lab's friendliness — a highly energetic, trainable companion that needs active owners and a job to do."},
      {n:"Australian Cattle Dog × Border Collie (Borderstralian)",d:"Two of the world's most intelligent herding breeds combine into a supreme working dog with extraordinary problem-solving ability and nearly limitless physical endurance."},
      {n:"Australian Cattle Dog × Australian Shepherd Mix",d:"A double dose of Australian herding excellence — smart, energetic, and incredibly capable, this mix needs daily purposeful activity and experienced handling."},
      {n:"Australian Cattle Dog × German Shepherd Mix",d:"Herding intelligence meets protection instincts in a loyal, athletic, and versatile working dog that excels at virtually any dog sport or working role."},
    ],
    facts:[
      "🏆 The world's oldest dog ever verified is Bluey, an Australian Cattle Dog from Rochester, Victoria, who lived to 29 years and 5 months — a record set in 1939 that remains unbroken. Bluey worked cattle and sheep for nearly two decades and lived a deeply active life, which many researchers cite as contributing to his extraordinary longevity. The ACD's typical lifespan of 12–16 years is itself among the longest of medium-sized breeds.",
      "🦮 Part Dingo — the wild Australian dog — is the ACD's most distinctive heritage ingredient. Early breeders deliberately crossed their herding dogs with Dingos to add the heat tolerance, hardiness, and independent problem-solving that only Australia's native dog possessed. The Dingo influence is most visible in the ACD's upright ears, lean build, and tendency to make decisions in the field without waiting for human direction.",
      "🌈 Australian Cattle Dog puppies are born entirely white, regardless of whether they will develop the blue or red coloring of adults. The speckled adult coat develops over the first few months of life. This unusual characteristic comes from the Dalmatian blood introduced into the breed during its development, and it means that predicting an ACD puppy's adult appearance from its birth color is impossible.",
      "🤕 The 'heeler' in Blue Heeler doesn't refer to a person — it refers to cattle heels. ACDs were specifically bred to nip the heels of stubborn cattle to move them forward, a herding technique that requires the dog to dart in, bite, and dart back before the cow can kick. This herding instinct is so deeply ingrained that ACDs will sometimes 'heel' running children, bicycles, or joggers, which requires early training to redirect.",
      "💪 Australian Cattle Dogs have been documented completing ultramarathon distances alongside their running owners. One ACD named Hōkū ran over 1,000 miles of the Appalachian Trail. The breed's capacity for sustained endurance work — not just sprinting speed — is exceptional, making ACDs popular companions for trail runners, cyclists, and anyone who exercises for hours rather than minutes.",
    ],
    ctaH:"Traveling with Your Australian Cattle Dog?", ctaP:"Australia's most tireless herder gets expert, active care no matter the destination."
  },
  {
    slug:'giant-schnauzer', name:'Giant Schnauzer', rank:52, group:'Working', origin:'Germany',
    alsoKnown:'Riesenschnauzer, Munich Schnauzer', weight:'55–85 lbs', height:'23–27 in',
    lifespan:'12–15 yrs', energyLabel:'High', e:'high', s:'large', sLabel:'Large',
    api:'schnauzer/giant', emoji:'🏔️', keywords:'giant schnauzer working dog germany police dog',
    tagline:"Germany's imposing working Schnauzer — a powerful, intelligent, and intensely loyal guard and police dog that is the largest of the three Schnauzer breeds",
    shortDesc:"Germany's largest Schnauzer — a powerful, bold, and deeply loyal working dog used by police and military worldwide, requiring experienced owners and serious daily exercise.",
    ov1:"The Giant Schnauzer was developed in the Bavarian Alps during the 19th century, originally bred to drive cattle from farms to market and guard Munich breweries — tasks that required strength, intelligence, and a commanding presence. The breed is essentially a scaled-up Standard Schnauzer, created through crosses with the Great Dane, Bouvier des Flandres, and possibly Flanders cattle dogs to produce a larger working dog. Its distinctive wiry coat, bushy eyebrows, and prominent beard are hallmarks shared with its smaller Schnauzer relatives.",
    ov2:"Giant Schnauzers are serious, highly intelligent working dogs that demand an equally serious commitment from their owners. They bond intensely with their families and are naturally suspicious of strangers — traits that make them outstanding guard dogs but require thorough socialization from puppyhood. They excel in police and military K-9 roles, AKC working events, and as loyal family protectors, but they are emphatically not suitable for passive or inexperienced dog owners.",
    traits:{energy:88,affection:80,kids:72,dogs:62,training:82},
    coat:"Hard, wiry outer coat with dense undercoat; requires hand-stripping or regular clipping to maintain shape",
    colors:"Solid black or salt-and-pepper",
    apt:"No — large, energetic breed needs substantial space and 2+ hours of daily vigorous exercise",
    qf:["<strong>AKC Rank:</strong> #52 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> Bavaria, Germany","<strong>Also Known As:</strong> Riesenschnauzer, Munich Schnauzer","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — requires experienced, assertive ownership"],
    health:["Hip dysplasia — OFA certification essential; common in large working breeds","Bloat (GDV) — deep-chested breed at elevated risk; avoid exercise around mealtimes and consider prophylactic gastropexy","Cancer — Giant Schnauzers have a higher-than-average cancer rate; routine wellness screenings are important","Squamous cell carcinoma of the toe — an unusual cancer more prevalent in black-coated breeds; monitor feet"],
    diet:{puppy:{a:"3–4.5 cups",c:"1,200–1,800 kcal"},adult:{a:"3–4 cups",c:"1,200–1,600 kcal"},senior:{a:"2.5–3.5 cups",c:"1,000–1,400 kcal"}},
    nutri:["Large-breed puppy formula prevents too-rapid growth that strains developing joints in this powerful breed","High-quality protein fuels the Giant Schnauzer's working drive and substantial muscle mass","Feed twice daily from a raised bowl and restrict exercise for 1 hour before and after eating to reduce GDV risk","Monitor weight carefully — an obese Giant Schnauzer puts enormous strain on joints and cardiovascular system"],
    pupCost:"$1,200–$3,000", foodCost:"$700–$1,100", vetCost:"$500–$900", groomCost:"$500–$900", supplCost:"$250–$450",
    costNote:"Professional grooming (hand-stripping or clipping every 6–8 weeks) is a significant ongoing cost for the wiry-coated Giant Schnauzer — owners who learn to do it themselves save considerably.",
    mixes:[
      {n:"Giant Schnauzer × German Shepherd Mix",d:"Two of Germany's premier working breeds combine into an intensely loyal, highly trainable guardian and working dog suited for experienced active owners."},
      {n:"Giant Schnauzer × Standard Poodle Mix",d:"Working intelligence meets working intelligence — a large, potentially low-shedding crossbreed with exceptional trainability and a commanding, elegant presence."},
      {n:"Giant Schnauzer × Rottweiler Mix",d:"Power and loyalty amplified — a large, protective crossbreed requiring confident experienced ownership and extensive early socialization."},
      {n:"Giant Schnauzer × Belgian Malinois Mix",d:"Two elite police and military dog breeds combine into an extraordinarily driven, athletic working crossbreed best suited to professional handlers or serious sport dog enthusiasts."},
    ],
    facts:[
      "🚔 Giant Schnauzers serve as police and military working dogs across Europe, particularly in Germany, where the breed has been used by law enforcement since the early 20th century. Their combination of intelligence, strength, trainability, and intense drive makes them highly effective in apprehension, search, and protection roles, and German police K-9 units have prized the breed for over a century.",
      "🏔️ The Giant Schnauzer was originally developed as a cattle-driving dog in the Bavarian Alps, where it needed to control large cattle over mountain terrain. The breed's powerful build, weather-resistant wiry coat, and bold temperament were all shaped by this demanding working environment — the coat protecting against alpine cold and wet, the temperament developed to assert control over stubborn cattle.",
      "🦠 Unlike many large-breed dogs, the Giant Schnauzer has a disproportionately high rate of cancer — particularly squamous cell carcinoma of the digit (a toe cancer) and other malignancies. Researchers have identified this elevated cancer risk as a breed-specific concern, and responsible owners work with veterinarians to conduct proactive screenings to catch problems early.",
      "✂️ The Giant Schnauzer's wiry double coat requires a technique called hand-stripping — physically pulling out the dead outer coat by hand rather than cutting it — to maintain the proper harsh texture called for in the breed standard. Show dogs must be hand-stripped, while pet dogs are often clipped instead, which softens the coat over time but is far less labor-intensive for owners.",
      "🐄 Despite its imposing appearance, the Giant Schnauzer's original job was actually quite mundane: moving cattle from Bavarian farms to Munich's markets — a task that required a dog large enough to control cattle without being hurt but biddable enough to work with farmers who weren't professional dog trainers. The breed's transition to police and guard work came later, in the 20th century, when its intelligence and protective instincts were recognized as ideal for working law enforcement roles.",
    ],
    ctaH:"Traveling with Your Giant Schnauzer?", ctaP:"Germany's most powerful Schnauzer gets the attentive, experienced care it deserves on every trip."
  },
  {
    slug:'german-wirehaired-pointer', name:'German Wirehaired Pointer', rank:58, group:'Sporting', origin:'Germany',
    alsoKnown:'Deutsch Drahthaar, GWP, Drahthaar', weight:'50–70 lbs', height:'22–26 in',
    lifespan:'14–16 yrs', energyLabel:'High', e:'high', s:'large', sLabel:'Large',
    api:'pointer/germanwirehaired', emoji:'🎣', keywords:'german wirehaired pointer sporting hunting dog drahthaar',
    tagline:"Germany's ultimate all-purpose hunting dog — the rugged, wire-coated Drahthaar that can track, point, retrieve, and hunt any game on any terrain in any weather",
    shortDesc:"Germany's all-purpose hunting machine — wire-coated, weather-proof, and capable of tracking, pointing, and retrieving any game on any terrain.",
    ov1:"The German Wirehaired Pointer was developed in Germany in the late 19th century as the ultimate versatile hunting dog — a single breed capable of performing all hunting tasks, from tracking wounded game and pointing birds to retrieving waterfowl from icy rivers. Breeders crossed the German Shorthaired Pointer with the Pudelpointer, Stichelhaar, and Griffon to produce a wire-coated dog whose protective harsh beard and eyebrows made it capable of working in dense brush, thorny undergrowth, and cold water that would defeat other gun dogs.",
    ov2:"The GWP is a dog built for serious hunters and active outdoor enthusiasts — its energy, drive, and working intelligence demand an owner who can provide a purpose. They are devoted to their families and often excellent with children, but they are independent thinkers in the field and need consistent training from puppyhood. Their weather-resistant coat makes them ideal for cold-climate hunting, and their stamina allows them to work all day without fatigue.",
    traits:{energy:90,affection:78,kids:75,dogs:70,training:80},
    coat:"Harsh, wire-like outer coat with dense undercoat; distinctive beard and bushy eyebrows are breed hallmarks",
    colors:"Liver, liver and white spotted, liver roan, or black and white; white with liver or black spots",
    apt:"No — high-energy gun dog needs outdoor access, daily hunting or vigorous exercise",
    qf:["<strong>AKC Rank:</strong> #58 most popular (2025)","<strong>Group:</strong> Sporting","<strong>Origin:</strong> Germany","<strong>Also Known As:</strong> Deutsch Drahthaar, Drahthaar, GWP","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — hunting dog needs experienced, active owners"],
    health:["Hip and elbow dysplasia — OFA certification essential for breeding stock; common in larger sporting breeds","von Willebrand disease — a blood-clotting disorder; genetic test available, screen before breeding","Cardiac issues — heart conditions have been documented; annual cardiac evaluation recommended","Entropion — inward rolling eyelids causing eye irritation; correctable surgically"],
    diet:{puppy:{a:"2–3.5 cups",c:"900–1,400 kcal"},adult:{a:"2.5–3.5 cups",c:"1,100–1,500 kcal"},senior:{a:"2–3 cups",c:"900–1,200 kcal"}},
    nutri:["High-protein working dog formula supports the GWP's demanding fieldwork and lean muscle mass","Hunting season may require 25–40% more calories; reduce intake appropriately in off-season","Joint supplements benefit any large working dog that will spend years on demanding terrain","Feed twice daily and limit exercise 30–60 minutes before and after meals to reduce bloat risk"],
    pupCost:"$800–$1,800", foodCost:"$600–$1,000", vetCost:"$450–$750", groomCost:"$300–$550", supplCost:"$250–$450",
    costNote:"The wire coat requires periodic stripping or clipping and beard trimming, but the GWP's overall hardiness and robust constitution keep overall ownership costs moderate for a large breed.",
    mixes:[
      {n:"German Wirehaired Pointer × Labrador Mix",d:"A friendly, powerful hunting companion blending the GWP's all-terrain versatility with the Lab's legendary water retrieving ability and social temperament."},
      {n:"German Wirehaired Pointer × German Shorthaired Pointer Mix",d:"Two German hunting breeds combine into the ultimate versatile pointing dog — a streamlined, high-drive companion for serious bird hunters."},
      {n:"German Wirehaired Pointer × Weimaraner Mix",d:"Two athletic German gun dogs produce a large, elegant, high-energy crossbreed with excellent hunting instincts and a devoted, intelligent temperament."},
      {n:"German Wirehaired Pointer × Vizsla Mix",d:"German toughness meets Hungarian elegance — a tireless, affectionate pointing dog with a weather-resistant coat and exceptional bird-finding ability."},
    ],
    facts:[
      "🎣 The German Wirehaired Pointer was specifically bred to be Germany's single-breed answer to all hunting needs — tracking, pointing, flushing, and retrieving game from land and water, in any weather, on any terrain. German hunting culture prizes the 'versatile hunting dog' ideal above specialized breeds, and the GWP represents the culmination of that philosophy: one dog that can do it all without compromise.",
      "🧔 The GWP's distinctive wiry beard and shaggy eyebrows aren't just decorative — they're functional protective gear. The coarse facial hair shields the dog's eyes and face from sharp briars, thorns, and brush that would injure a smooth-faced dog working dense cover. The harsh outer coat serves the same purpose on the body, creating a dog that can push through vegetation that would cut or scratch other breeds.",
      "🌡️ The German Wirehaired Pointer's double coat is naturally water-resistant and cold-insulating — designed for retrieving waterfowl from icy German rivers and working in the harsh conditions of central European winters. Unlike smooth-coated gun dogs that may shiver in cold water retrieves, the GWP's undercoat and harsh outer layer provide effective insulation that allows it to work in conditions that other retrieving breeds would find prohibitive.",
      "🏋️ The GWP is notably more protective and assertive than most sporting breeds. Unlike the friendly, outgoing German Shorthaired Pointer, the GWP tends to be reserved with strangers and territorial, traits selected for because German hunters historically wanted their dog to also guard their home and game. This protective instinct requires early socialization but makes the GWP an unusually good dual-purpose hunting dog and family guardian.",
      "📏 The German Wirehaired Pointer consistently outperforms many purpose-bred retrievers at retrieving waterfowl in cold, rough conditions because its entire body system — not just its coat — is adapted to harsh environments. Its webbed feet aid swimming, its trailing scenting ability rivals hound breeds, and its pain tolerance when working through dense brush has no peer in the pointing dog world. German hunters consider the GWP the only pointing dog they ever need.",
    ],
    ctaH:"Traveling with Your German Wirehaired Pointer?", ctaP:"Germany's toughest gun dog deserves expert care that matches its all-terrain spirit."
  },
  {
    slug:'russell-terrier', name:'Russell Terrier', rank:60, group:'Terrier', origin:'England',
    alsoKnown:'Jack Russell Terrier, Short-Legged JRT, Shorty Jack', weight:'9–15 lbs', height:'10–12 in',
    lifespan:'12–14 yrs', energyLabel:'High', e:'high', s:'small', sLabel:'Small',
    api:'terrier/russell', emoji:'🐭', keywords:'russell terrier jack russell short leg terrier hunting',
    tagline:"The pocket-sized tornado — a tenacious, clever, and fearless earthdog that punches far above its weight in energy, personality, and ability to keep its owners on their toes",
    shortDesc:"The compact, short-legged Jack Russell — an explosive package of terrier tenacity, hunting instinct, and comedic mischief that never accepts being underestimated.",
    ov1:"The Russell Terrier shares its origins with the Parson Russell Terrier — both descended from the fox-working dogs bred by Reverend John Russell of Devon, England, in the early 19th century. The Russell Terrier is distinguished from its taller Parson cousin by its shorter legs and longer body (10–12 inches at the shoulder versus 13–14 inches), a silhouette shaped by breeders who preferred a dog small enough to bolt foxes from very tight, narrow earths. The AKC recognized the Russell Terrier as a separate breed from the Parson Russell Terrier in 2012.",
    ov2:"What the Russell Terrier lacks in stature it more than compensates for in personality, energy, and sheer tenacity. These dogs are highly intelligent, deeply curious, and relentlessly active — they need mental and physical stimulation every day and will find their own entertainment (usually at the expense of furniture, gardens, or household items) if not provided with appropriate outlets. They are charming, loyal, and often hilarious companions for active owners who enjoy a dog with a strong personality.",
    traits:{energy:92,affection:80,kids:72,dogs:60,training:65},
    coat:"Smooth, broken, or rough coat — all three are valid; coarse texture for all varieties",
    colors:"Predominantly white with black and/or tan markings; white must be more than 51% of the body",
    apt:"Challenging — extreme energy needs multiple walks and active play even in small spaces",
    qf:["<strong>AKC Rank:</strong> #60 most popular (2025)","<strong>Group:</strong> Terrier","<strong>Origin:</strong> Devon, England","<strong>Also Known As:</strong> Jack Russell Terrier, Shorty Jack, Short-Legged JRT","<strong>Size:</strong> Small","<strong>Good for First-Time Owners:</strong> Challenging — strong personality needs consistent training"],
    health:["Patellar luxation — knee instability common in small terrier breeds; surgical repair available","Lens luxation — the lens of the eye can dislocate; a hereditary condition in terriers requiring prompt treatment","Deafness — congenital deafness linked to heavy white coat; BAER hearing test recommended","Legg-Calvé-Perthes disease — hip joint deterioration in small breeds; surgical correction is effective"],
    diet:{puppy:{a:"0.5–1 cup",c:"350–550 kcal"},adult:{a:"0.5–0.75 cup",c:"300–500 kcal"},senior:{a:"0.4–0.6 cup",c:"250–400 kcal"}},
    nutri:["High-energy small breed formula matches the Russell's extreme metabolic demands per body weight","Avoid obesity — carries excess weight surprisingly easily despite high energy; measure meals precisely","Dental chews help prevent tartar buildup, a common issue in small terriers with close-set teeth","Feed twice daily; small stomachs mean one large meal can cause digestive upset"],
    pupCost:"$800–$1,500", foodCost:"$300–$500", vetCost:"$400–$650", groomCost:"$150–$300", supplCost:"$150–$300",
    costNote:"The Russell Terrier is inexpensive to feed and groom, but owners should budget for training classes — this highly independent breed benefits enormously from professional guidance early on.",
    mixes:[
      {n:"Russell Terrier × Chihuahua (Jack Chi)",d:"Tiny but enormous in personality — a feisty, clever crossbreed that combines the Russell's terrier fire with the Chihuahua's intense loyalty and bold temperament."},
      {n:"Russell Terrier × Poodle (Jackapoo)",d:"A smart, potentially low-shedding terrier cross that softens the Russell's headstrong nature with the Poodle's trainability and eagerness to please."},
      {n:"Russell Terrier × Beagle (Jack-A-Bee)",d:"Two enthusiastic hunting dogs combine into a curious, energetic sniffer with the Russell's tenacity and the Beagle's famous nose and social, friendly nature."},
      {n:"Russell Terrier × Dachshund (Jackshund)",d:"Two earth-dog breeds with bold attitudes — a long-bodied, low-set, energetic crossbreed that's surprisingly fast and completely fearless about investigating anything underground."},
    ],
    facts:[
      "⛪ The Russell Terrier's namesake, Reverend John Russell (1795–1883), was an English clergyman and passionate fox hunter who spent his entire adult life refining a strain of fox-working terriers that could run with the hounds and bolt foxes from their earths. Known as 'The Sporting Parson,' Russell's dogs became legendary in Devon and he personally judged some of the earliest British dog shows — helping establish organized dog exhibition as a sport.",
      "📺 The Jack Russell Terrier — the breed most Americans know under that name — achieved global fame through television characters including Eddie on Frasier, Wishbone on the PBS children's series, and numerous film appearances. This media exposure created enormous demand for the breed in the 1990s and early 2000s, leading to irresponsible breeding and many poorly-matched placements with families unprepared for the breed's extreme energy and independent nature.",
      "🕳️ The Russell Terrier was specifically bred to bolt foxes from underground earths — narrow, twisting burrows that larger terriers couldn't navigate. The breed's small, flexible, predominantly white body (so hunters could distinguish it from the fox in dim light underground) and its extraordinary fearlessness around foxes considerably larger than itself made it the ideal working earthdog for traditional British fox hunting.",
      "🏋️ Pound for pound, the Russell Terrier may be the most energetic dog breed in existence. Studies of terrier energy expenditure show that small terriers have metabolic rates and activity levels that rival working sled dogs when adjusted for body weight. A Russell Terrier on a vigorous walk covers more ground, changes direction more times, and investigates more targets than almost any other dog — a reflection of the intense working drive bred into the earthdog family.",
      "🎭 Russell Terriers have an uncanny ability to learn complex tricks and performance routines. Despite their reputation for stubbornness, Russells that are properly motivated — usually with high-value food rewards and very short training sessions — can learn impressive trick sequences quickly. Several Russell Terriers have become professional animal actors in Hollywood, trained to perform reliable, complex behaviors on cue across multiple takes.",
    ],
    ctaH:"Traveling with Your Russell Terrier?", ctaP:"The world's smallest big personality needs experienced, attentive care on every trip."
  },
  {
    slug:'staffordshire-bull-terrier', name:'Staffordshire Bull Terrier', rank:61, group:'Terrier', origin:'England',
    alsoKnown:'Staffy, Staffie, SBT, English Staffie', weight:'24–38 lbs', height:'14–16 in',
    lifespan:'12–14 yrs', energyLabel:'High', e:'high', s:'medium', sLabel:'Medium',
    api:'terrier/staffordshire', emoji:'💪', keywords:'staffordshire bull terrier staffy staffie british terrier',
    tagline:"England's nanny dog — a muscular, broad-headed terrier famous for its gentle devotion to children, its big heart, and its determination to prove that bully breeds are family dogs",
    shortDesc:"England's 'nanny dog' — a compact, muscular bull-and-terrier with an enormous heart, legendary patience with children, and a smile that could melt any skeptic.",
    ov1:"The Staffordshire Bull Terrier was developed in the English Midlands in the early 19th century by crossing Bulldogs with terriers to create a dog capable of bull-baiting and dog fighting — the working-class sports of industrial England at the time. When these blood sports were banned in 1835, the breed's breeders redirected its qualities toward companionship, exploiting the Staffie's natural gentleness with humans and its characteristic patience with children. The AKC officially recognized the breed in 1974.",
    ov2:"Despite its tough history, the Staffordshire Bull Terrier is one of the most affectionate and people-oriented breeds in existence. It is often called the 'nanny dog' in England due to its legendary patience and gentleness with children — a reputation earned over generations in working-class English households where Staffies were trusted family members in cramped homes. They need regular exercise, consistent training, and early socialization, but give back extraordinary loyalty and companionship.",
    traits:{energy:85,affection:95,kids:92,dogs:60,training:72},
    coat:"Short, smooth, and close to the body; very easy to maintain — one of the lowest-maintenance coats of any breed",
    colors:"Red, fawn, white, black, blue, or brindle, with or without white; some white with any of the above",
    apt:"Yes, with daily exercise — compact and clean indoors, but needs vigorous daily walks and playtime",
    qf:["<strong>AKC Rank:</strong> #61 most popular (2025)","<strong>Group:</strong> Terrier","<strong>Origin:</strong> Staffordshire, England","<strong>Also Known As:</strong> Staffy, Staffie, SBT, Nanny Dog","<strong>Size:</strong> Medium","<strong>Good for Families with Children:</strong> Excellent — known as the 'nanny dog' for a reason"],
    health:["L-2-hydroxyglutaric aciduria (L2HGA) — a metabolic disorder specific to Staffies; genetic test available and mandatory for responsible breeders","Hereditary cataracts — genetic test available; ask breeder for clear results on both parents","Skin allergies — Staffies are prone to environmental and food allergies causing skin irritation","Hip dysplasia — less common than in larger breeds but worth screening in breeding stock"],
    diet:{puppy:{a:"1–1.75 cups",c:"450–750 kcal"},adult:{a:"1–1.5 cups",c:"500–800 kcal"},senior:{a:"0.75–1.25 cups",c:"400–650 kcal"}},
    nutri:["High-quality protein supports the Staffie's dense muscle mass and active lifestyle","Avoid overfeeding — Staffies have big appetites and a tendency to carry extra weight if not exercised enough","Joint supplements become beneficial from middle age given the breed's compact, muscular build","Dental health is important — short snouts can lead to crowded teeth; dental chews and brushing help"],
    pupCost:"$1,000–$2,500", foodCost:"$450–$700", vetCost:"$400–$650", groomCost:"$100–$200", supplCost:"$200–$350",
    costNote:"The Staffie is among the most economical breeds to groom — its short, smooth coat needs only a weekly wipe-down and occasional bath — keeping grooming costs minimal.",
    mixes:[
      {n:"Staffordshire Bull Terrier × Labrador Mix",d:"The Lab's friendliness amplified by the Staffie's loyalty and muscle — a social, energetic, and affectionate family dog that's equally at home in a park or on a sofa."},
      {n:"Staffordshire Bull Terrier × Bulldog Mix",d:"Two British bully breeds combine into a stocky, devoted companion with a broad smile, a low exercise requirement compared to the Staffie parent, and legendary patience."},
      {n:"Staffordshire Bull Terrier × Border Collie Mix",d:"The Staffie's loyalty and affection meets the Border Collie's intelligence — a highly trainable, energetic crossbreed that needs mental as well as physical stimulation."},
      {n:"Staffordshire Bull Terrier × Boxer Mix",d:"Two people-loving, muscular breeds produce a playful, energetic companion with the Staffie's devotion to family and the Boxer's clownish, exuberant personality."},
    ],
    facts:[
      "👶 The Staffordshire Bull Terrier's nickname 'nanny dog' originated in Victorian and Edwardian England, where working-class families routinely left their children in the care of the family Staffie — trusting the dog's natural gentleness and patience with small humans. Contemporary accounts from the period describe Staffies as reliably patient with toddlers who climbed on them, pulled their ears, and subjected them to the rough handling of young children.",
      "🧬 The Staffordshire Bull Terrier was the first breed recognized by the UK Kennel Club for which mandatory health testing covers a breed-specific metabolic disorder. L-2-hydroxyglutaric aciduria (L2HGA), a neurological condition unique to Staffies, can now be tested via a simple DNA cheek swab, and reputable breeders worldwide test both parents before every litter — a model for responsible breed health management.",
      "🏆 The Staffordshire Bull Terrier is the second most popular dog breed in the United Kingdom (after the French Bulldog), where it has been beloved by working-class and upper-class families alike for over a century. Its combination of manageable size, wash-and-wear coat, and extraordinary affection for people makes it particularly well-suited to British urban and suburban life.",
      "💪 Despite its compact size, the Staffordshire Bull Terrier is one of the strongest dogs for its weight of any breed. Its muscle density rivals that of dogs twice its size — a legacy of its bull-and-terrier ancestry. This strength requires consistent recall and leash training from puppyhood, as an untrained adult Staffie on a leash can easily outpull an unprepared owner, especially around squirrels, dogs, or anything interesting.",
      "❤️ Staffordshire Bull Terriers are the most common breed in UK animal shelters — not because they are difficult or dangerous, but because their popularity has led to overbreeding and many dogs being acquired by unprepared owners who didn't research the breed's exercise needs. Rescue Staffies are typically excellent dogs desperately seeking a committed family, and Staffie rescue organizations in the UK and US work tirelessly to find them appropriate homes.",
    ],
    ctaH:"Traveling with Your Staffordshire Bull Terrier?", ctaP:"England's nanny dog deserves the same devoted care it gives every member of your family."
  },
  {
    slug:'cardigan-welsh-corgi', name:'Cardigan Welsh Corgi', rank:65, group:'Herding', origin:'Wales',
    alsoKnown:'Cardigan, CWC, Corgi (Cardigan variety)', weight:'25–38 lbs', height:'10–13 in',
    lifespan:'12–15 yrs', energyLabel:'Medium', e:'medium', s:'small', sLabel:'Small',
    api:'corgi/cardigan', emoji:'🌟', keywords:'cardigan welsh corgi herding dog wales long tail',
    tagline:"Wales's ancient, long-tailed herding dog — the older of the two Corgi breeds, with a fox-like face, a full-length tail, and one of the most loyal and versatile herding minds in the world",
    shortDesc:"The older, long-tailed Welsh Corgi — a loyal, athletic herding dog with a fox-like face, remarkable intelligence, and a versatile personality suited to farm and family alike.",
    ov1:"The Cardigan Welsh Corgi is one of the oldest herding breeds in the British Isles, with origins in Wales traced back over 3,000 years to dogs brought by Celtic tribes migrating from central Europe. The Cardigan's name comes from Cardiganshire — the county in southwest Wales where the breed developed — and its full, fox-like tail distinguishes it immediately from the similarly named Pembroke Welsh Corgi, which is a distinct and separate breed. Cardigans were used for centuries to drive cattle by nipping their heels, a technique that evolved specifically in Wales.",
    ov2:"Cardigan Welsh Corgis are intelligent, loyal, and adaptable — equally suited to active farm life and urban apartments, provided they receive sufficient daily exercise and mental stimulation. They are more reserved with strangers than the Pembroke but deeply devoted to their families, often described as 'one person dogs' with a preference for their primary person. Their herding instinct remains strong, and they will attempt to herd children, other pets, and moving objects without appropriate training.",
    traits:{energy:72,affection:88,kids:82,dogs:78,training:85},
    coat:"Medium-length double coat, dense and weather-resistant; moderate shedding year-round with heavier seasonal sheds",
    colors:"Red, sable, brindle, black with or without tan and/or brindle points, blue merle",
    apt:"Yes, with daily walks — adapts well to apartments if given consistent exercise and mental engagement",
    qf:["<strong>AKC Rank:</strong> #65 most popular (2025)","<strong>Group:</strong> Herding","<strong>Origin:</strong> Cardiganshire, Wales","<strong>Also Known As:</strong> Cardigan, CWC, Yard-Long Dog (historical)","<strong>Size:</strong> Small","<strong>Good for Apartments:</strong> Yes, with daily exercise and mental stimulation"],
    health:["Degenerative myelopathy — a progressive neurological disease with a genetic test available; screen breeding dogs","Hip dysplasia — OFA testing recommended for breeders; more common in long-backed breeds","Intervertebral disc disease (IVDD) — long spine at risk; avoid encouraging jumping from heights","Progressive retinal atrophy — genetic test available; request clear results from breeder"],
    diet:{puppy:{a:"0.75–1.5 cups",c:"350–600 kcal"},adult:{a:"0.75–1.5 cups",c:"350–600 kcal"},senior:{a:"0.6–1.25 cups",c:"300–500 kcal"}},
    nutri:["Quality protein supports the Cardigan's athletic herding build without overloading a short-legged frame","Strictly control calories — Cardigans gain weight easily and obesity dramatically increases IVDD risk","Omega-3 fatty acids support the long spine and joint health critical for a low-slung working breed","Feed twice daily and avoid post-meal exercise to protect the digestive system of a deep-chested small breed"],
    pupCost:"$1,200–$2,500", foodCost:"$400–$650", vetCost:"$450–$750", groomCost:"$200–$400", supplCost:"$200–$350",
    costNote:"The Cardigan Welsh Corgi is a moderate-cost breed overall — grooming needs are manageable at home with regular brushing, though professional groomers can help manage heavy seasonal shedding.",
    mixes:[
      {n:"Cardigan Welsh Corgi × Australian Shepherd Mix",d:"Two intelligent, colorful herding breeds combine into a highly trainable, energetic working dog with striking markings and a devoted, alert personality."},
      {n:"Cardigan Welsh Corgi × Labrador Mix",d:"The Cardigan's herding smarts meet the Lab's legendary sociability — a friendly, trainable companion that may inherit the Corgi's distinctive shape with the Lab's outgoing warmth."},
      {n:"Cardigan Welsh Corgi × Golden Retriever Mix",d:"Intelligence and warmth in a package that often inherits the Cardigan's long body and the Golden's flowing coat — a loving, active family dog."},
      {n:"Cardigan Welsh Corgi × Pembroke Welsh Corgi Mix",d:"Combining Wales's two Corgi varieties in one dog — similar intelligence and herding drive with a fascinating blend of the two bloodlines' physical and temperament traits."},
    ],
    facts:[
      "🌟 The Cardigan Welsh Corgi and the Pembroke Welsh Corgi were considered a single breed by the UK Kennel Club until 1934, when they were officially separated based on their distinct histories and physical differences. The Cardigan is the older and rarer of the two breeds — and crucially, it has a tail, while the Pembroke is typically born with or docked to a short tail. The two breeds are not interfertile in the AKC registry.",
      "🐄 The Cardigan Welsh Corgi's herding technique — nipping the heels of cattle to move them — was ideally suited to Welsh cattle droving because the dog's low stature kept it safely below the cattle's kicking line. When a cow kicked in response to the nip, it would kick over the dog rather than connecting with it, allowing the Corgi to return immediately for another pass. This height-advantage herding strategy explains why a dog only 10–13 inches tall could confidently herd cattle many times its size.",
      "⭐ The word 'Corgi' in Welsh literally means 'dwarf dog' — an accurate if unromantic description of the breed's most distinctive physical feature. However, some Welsh language scholars argue that 'cor' in old Welsh meant 'gathering' rather than 'dwarf,' suggesting that 'Corgi' may actually mean 'gathering dog,' a more flattering reference to the breed's herding role than simple shorthand for its stature.",
      "🏆 The Cardigan Welsh Corgi is significantly rarer than the Pembroke Welsh Corgi — fewer than 800 Cardigan puppies are registered with the AKC annually, compared to several thousand Pembrokes. This rarity makes finding a reputable Cardigan breeder more challenging and typically results in longer waitlists. The breed's rarity is partly attributable to the Pembroke's royal association with Queen Elizabeth II, who kept Pembroke Corgis throughout her reign.",
      "🌈 The Cardigan Welsh Corgi comes in a wider range of colors than the Pembroke, including blue merle — a striking marbled gray-and-black pattern rare in herding breeds outside the Australian Shepherd family. Blue merle Cardigans with blue or mismatched eyes are particularly striking and sought after by breed enthusiasts. This color diversity reflects the Cardigan's ancient and distinct breeding history separate from the Pembroke line.",
    ],
    ctaH:"Traveling with Your Cardigan Welsh Corgi?", ctaP:"Wales's most ancient herder deserves safe, expert care on every adventure near and far."
  },
];

// ─── HTML template ───────────────────────────────────────────────────────────
function generateHTML(b) {
  const groupBadge = b.group;
  const traits = b.traits;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${b.name} – Breed Profile | BestPetSite</title>
<meta name="description" content="${b.name} breed profile: ${b.tagline.toLowerCase()}.">
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/breeds.css">
<!-- Google tag (gtag.js) -->
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
            <span class="badge badge-group">${groupBadge} Group</span>
            <span class="badge badge-type" style="background:#0d9488">Purebred</span>
          </div>
          <h1>${b.name}</h1>
          <p class="breed-tagline">${b.tagline}</p>
          <div class="breed-quick-stats">
            <div class="stat"><span class="stat-icon">⚖️</span><span class="stat-label">Weight</span><span class="stat-value">${b.weight}</span></div>
            <div class="stat"><span class="stat-icon">📏</span><span class="stat-label">Height</span><span class="stat-value">${b.height}</span></div>
            <div class="stat"><span class="stat-icon">📅</span><span class="stat-label">Lifespan</span><span class="stat-value">${b.lifespan}</span></div>
            <div class="stat"><span class="stat-icon">🌡️</span><span class="stat-label">Energy</span><span class="stat-value">${b.energyLabel}</span></div>
          </div>
        </div>
        <div class="breed-hero-image">
          <span id="breedEmoji" style="font-size:120px">${b.emoji}</span>
          <img id="breedPhoto" src="" alt="${b.name}" style="display:none;width:100%;border-radius:16px;max-height:350px;object-fit:cover">
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
              <p>${b.ov1}</p>
              <p>${b.ov2}</p>
              <h3>Personality Traits</h3>
              <div class="trait-bars">
                <div class="trait"><span class="trait-name">Energy Level</span><div class="bar"><div class="bar-fill" style="width:${traits.energy}%"></div></div></div>
                <div class="trait"><span class="trait-name">Affection</span><div class="bar"><div class="bar-fill" style="width:${traits.affection}%"></div></div></div>
                <div class="trait"><span class="trait-name">Good with Kids</span><div class="bar"><div class="bar-fill" style="width:${traits.kids}%"></div></div></div>
                <div class="trait"><span class="trait-name">Good with Dogs</span><div class="bar"><div class="bar-fill" style="width:${traits.dogs}%"></div></div></div>
                <div class="trait"><span class="trait-name">Trainability</span><div class="bar"><div class="bar-fill" style="width:${traits.training}%"></div></div></div>
              </div>
              <h3>Photo Gallery</h3>
              <div class="gallery-grid">
                <img id="gp1" src="" alt="${b.name} 1" class="gallery-img" style="cursor:pointer">
                <img id="gp2" src="" alt="${b.name} 2" class="gallery-img" style="cursor:pointer">
                <img id="gp3" src="" alt="${b.name} 3" class="gallery-img" style="cursor:pointer">
                <img id="gp4" src="" alt="${b.name} 4" class="gallery-img" style="cursor:pointer">
                <img id="gp5" src="" alt="${b.name} 5" class="gallery-img" style="cursor:pointer">
                <img id="gp6" src="" alt="${b.name} 6" class="gallery-img" style="cursor:pointer">
              </div>
            </div>
            <div class="profile-sidebar">
              <div class="quick-facts-card">
                <h3>Quick Facts</h3>
                <ul>
                  ${b.qf.map(f=>`<li>${f}</li>`).join('\n                  ')}
                  <li><strong>Coat:</strong> ${b.coat}</li>
                  <li><strong>Colors:</strong> ${b.colors}</li>
                  <li><strong>Good for Apartments:</strong> ${b.apt}</li>
                </ul>
              </div>
              <div class="health-card">
                <h3>Health Notes</h3>
                <ul>
                  ${b.health.map(h=>`<li>${h}</li>`).join('\n                  ')}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content" id="tab-diet">
          <h2>Feeding Your ${b.name}</h2>
          <p>A ${b.s === 'small' ? 'small' : b.s === 'large' ? 'large' : 'medium'}-sized breed with ${b.energyLabel.toLowerCase()} energy needs, the ${b.name} requires quality nutrition matched to its activity level and life stage.</p>
          <table class="diet-table">
            <thead><tr><th>Life Stage</th><th>Daily Amount</th><th>Calories/Day</th></tr></thead>
            <tbody>
              <tr><td>Puppy (under 18 mo)</td><td>${b.diet.puppy.a}</td><td>${b.diet.puppy.c}</td></tr>
              <tr><td>Adult (1–8 yrs)</td><td>${b.diet.adult.a}</td><td>${b.diet.adult.c}</td></tr>
              <tr><td>Senior (8+ yrs)</td><td>${b.diet.senior.a}</td><td>${b.diet.senior.c}</td></tr>
            </tbody>
          </table>
          <h3>Nutrition Tips</h3>
          <ul>
            ${b.nutri.map(n=>`<li>${n}</li>`).join('\n            ')}
          </ul>
        </div>
        <div class="tab-content" id="tab-cost">
          <h2>Cost of Owning a ${b.name}</h2>
          <table class="cost-table">
            <thead><tr><th>Expense</th><th>One-Time / Annual</th><th>Estimated Cost</th></tr></thead>
            <tbody>
              <tr><td>Puppy / Adoption</td><td>One-time</td><td>${b.pupCost}</td></tr>
              <tr><td>Food (annual)</td><td>Annual</td><td>${b.foodCost}</td></tr>
              <tr><td>Vet – routine</td><td>Annual</td><td>${b.vetCost}</td></tr>
              <tr><td>Grooming</td><td>Annual</td><td>${b.groomCost}</td></tr>
              <tr><td>Supplies &amp; toys</td><td>One-time</td><td>${b.supplCost}</td></tr>
            </tbody>
          </table>
          <p style="margin-top:1rem;font-size:.95rem;color:#555;">${b.costNote}</p>
        </div>
        <div class="tab-content" id="tab-mixes">
          <h2>Popular ${b.name} Mixes</h2>
          <div class="mixes-grid">
            ${b.mixes.map(m=>`<div class="mix-card"><h3>${m.n}</h3><p>${m.d}</p></div>`).join('\n            ')}
          </div>
        </div>
        <div class="tab-content" id="tab-facts">
          <h2>Fun Facts About ${b.name}s</h2>
          <ul class="fun-facts-list">
            ${b.facts.map(f=>`<li>${f}</li>`).join('\n            ')}
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
      <h2>${b.ctaH}</h2>
      <p>${b.ctaP}</p>
      <a href="../services/shipping.html" class="btn btn-primary">Pet Travel Services</a>
      <a href="../services/boarding.html" class="btn btn-secondary">Find Boarding</a>
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
fetch('https://dog.ceo/api/breed/${b.api}/images').then(r=>r.json()).then(data=>{
  const photos=data.message;if(!photos||!photos.length)return;
  const hero=document.getElementById('breedPhoto');
  hero.src=photos[Math.min(3,photos.length-1)];
  hero.onload=()=>{hero.style.display='block';document.getElementById('breedEmoji').style.display='none';};
  [6,11,16,21,26,31].forEach((idx,i)=>{
    const src=photos[idx]||photos[i]||photos[0];
    const el=document.getElementById('gp'+(i+1));
    if(el&&src){galleryPhotos.push(src);el.src=src;el.addEventListener('click',()=>openLightbox(i));}
  });
}).catch(()=>{});
</script>
</body>
</html>`;
}

// ─── Index card template ──────────────────────────────────────────────────────
function generateCard(b) {
  const energyPct = b.traits.energy;
  const trainPct = b.traits.training;
  // grooming: inverse of energy roughly, override per breed if needed
  const groomPct = b.groomPct || (b.s === 'small' ? 55 : b.coat && b.coat.includes('wire') ? 65 : 45);
  return `<a href="${b.slug}.html" class="breed-card" data-type="purebred" data-size="${b.s}" data-energy="${b.e}" data-kids="yes" data-name="${b.keywords}">
          <div class="breed-emoji-wrap" data-api="${b.api}"><span style="position:absolute;top:8px;left:8px;background:#0d9488;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">#${b.rank}</span><img class="breed-card-real-photo" alt="${b.name}" /><span class="breed-card-emoji-fallback">${b.emoji}</span><span class="size-badge ${b.s}">${b.sLabel}</span></div>
          <div class="breed-info">
            <h3>${b.name}</h3>
            <p>${b.shortDesc}</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:${energyPct}%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:${trainPct}%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:${groomPct}%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>`;
}

// ─── Generate HTML files ──────────────────────────────────────────────────────
const breedDir = 'C:/Pet Website/breeds/';
let written = 0;
for (const b of breeds) {
  const path = breedDir + b.slug + '.html';
  fs.writeFileSync(path, generateHTML(b), 'utf8');
  written++;
  console.log(`✓ ${b.slug}.html`);
}
console.log(`\nWrote ${written} HTML files.`);

// ─── Update index.html ────────────────────────────────────────────────────────
const indexPath = 'C:/Pet Website/breeds/index.html';
let index = fs.readFileSync(indexPath, 'utf8');

const newCards = '\n' + breeds.map(b => generateCard(b)).join('\n') + '\n';
const insertBefore = '\n<a href="goldendoodle.html"';
if (!index.includes(insertBefore)) {
  console.error('ERROR: Could not find goldendoodle insertion point!');
  process.exit(1);
}
index = index.replace(insertBefore, newCards + insertBefore);
fs.writeFileSync(indexPath, index, 'utf8');
console.log('Updated index.html with ' + breeds.length + ' new cards.');

// ─── Update sitemap.xml ───────────────────────────────────────────────────────
const sitemapPath = 'C:/Pet Website/sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const entries = breeds.map(b =>
  `  <url><loc>https://www.alldogfacts.com/breeds/${b.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
).join('\n');
sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('Updated sitemap.xml with ' + breeds.length + ' new entries.');
console.log('\nBatch 1 complete!');
