// Batch 3 – AKC breeds #94–#120 (10 breeds)
// chow-chow, dogue-de-bordeaux, bouvier-des-flandres, beauceron, boerboel,
// spinone-italiano, welsh-terrier, tibetan-terrier, neapolitan-mastiff, belgian-sheepdog
const fs = require('fs');
const TODAY = '2026-05-25';

const breeds = [
  {
    slug:'chow-chow', name:'Chow Chow', rank:94, group:'Non-Sporting', origin:'China',
    alsoKnown:'Chow, Songshi Quan (Puffy-Lion Dog), Tang Quan', weight:'45–70 lbs', height:'17–20 in',
    lifespan:'8–12 yrs', energyLabel:'Low', e:'low', s:'medium', sLabel:'Medium',
    api:'chow', emoji:'🦁', keywords:'chow chow lion dog china blue tongue fluffy',
    tagline:"China's ancient lion-dog — one of the world's oldest breeds, with a blue-black tongue, a lion's mane, and a regal self-possession that demands respect rather than asking for it",
    shortDesc:"China's ancient lion-dog with an unmistakable blue-black tongue, lion's mane, and dignified aloofness — one of the oldest breeds on earth, loyal to few and feared by none.",
    ov1:"The Chow Chow is one of the oldest recognizable dog breeds in the world — it closely resembles dogs depicted in Chinese pottery and sculptures from the Han Dynasty (206 BCE–220 CE), and DNA analysis confirms it as a basal breed with minimal genetic divergence from ancestral dogs. It was used in ancient China for hunting, herding, pulling sleds, and guarding temples. Its distinctive blue-black tongue and straight rear legs (the only dog to have this joint structure) are hallmarks of the breed's unique anatomy.",
    ov2:"The Chow Chow is famously aloof and cat-like in temperament — deeply loyal to its immediate family but reserved to the point of disinterest with strangers and often intolerant of other dogs. It does not perform for attention, seek approval, or respond well to heavy-handed training. Chows require early socialization and consistent, respectful handling to develop into well-mannered adults, but they reward patient owners with an unwavering, quiet loyalty that makes them deeply bonded companions.",
    traits:{energy:38,affection:72,kids:58,dogs:42,training:45},
    coat:"Dense double coat in rough variety (abundant, off-standing, with a mane) or smooth variety (shorter, plush); heavy seasonal shedding",
    colors:"Red, black, blue, cinnamon, or cream; solid colors only; no white markings",
    apt:"Possible with daily walks — relatively low exercise needs but needs space to decompress away from strangers",
    qf:["<strong>AKC Rank:</strong> #94 most popular (2025)","<strong>Group:</strong> Non-Sporting","<strong>Origin:</strong> China (ancient)","<strong>Also Known As:</strong> Chow, Songshi Quan, Tang Quan","<strong>Size:</strong> Medium","<strong>Good for First-Time Owners:</strong> No — needs experienced, consistent handling and early socialization"],
    health:["Hip and elbow dysplasia — elevated rate in the breed; OFA testing essential for breeders","Entropion — inward rolling eyelids very common in Chow Chows; correctable surgically and should be addressed early","Gastric cancer — Chow Chows have an elevated gastric cancer rate; watch for persistent digestive issues","Autoimmune thyroiditis — hypothyroidism from thyroid inflammation is more common than average; annual thyroid testing recommended"],
    diet:{puppy:{a:"1.5–2.5 cups",c:"650–1,000 kcal"},adult:{a:"1.5–2.5 cups",c:"650–1,000 kcal"},senior:{a:"1.25–2 cups",c:"500–800 kcal"}},
    nutri:["High-quality, moderate-protein diet suits the Chow's low-energy, less-active lifestyle","Avoid obesity — the Chow is a low-energy breed that easily becomes overweight without portion control","Omega-3 fatty acids help maintain the magnificent double coat and reduce skin inflammation","Feed in a cool location — the dense coat makes Chow Chows heat-sensitive; heavy eating in warm weather can cause distress"],
    pupCost:"$1,000–$3,000", foodCost:"$500–$800", vetCost:"$450–$800", groomCost:"$500–$900", supplCost:"$200–$400",
    costNote:"Professional grooming is a significant recurring cost for the rough-coated Chow Chow — the dense double coat requires thorough professional grooming every 6–8 weeks and daily home brushing.",
    mixes:[
      {n:"Chow Chow × Golden Retriever (Golden Chow)",d:"The Golden's warmth softens the Chow's aloofness — a medium-large, fluffy companion that may be more approachable than a purebred Chow while retaining its magnificent coat."},
      {n:"Chow Chow × Labrador Mix",d:"A friendly, dense-coated crossbreed combining the Chow's lion-like appearance with the Lab's sociable, trainable personality — a large, loyal companion."},
      {n:"Chow Chow × German Shepherd Mix",d:"Two independent, loyal working breeds combine into a large, protective, and intelligent companion with a thick coat and a reserved but devoted temperament."},
      {n:"Chow Chow × Siberian Husky Mix",d:"Two ancient cold-climate breeds produce a striking, fluffy crossbreed with the Chow's aloofness and the Husky's energy — a challenging but visually stunning companion."},
    ],
    facts:[
      "👅 The Chow Chow's blue-black tongue is one of the most distinctive features in the dog world — and one of the most genetically unusual. No other breed outside the closely related Shar-Pei has this coloration, and the Chow's breed standard specifically requires it: a pink-spotted or pink tongue in an adult Chow is considered a disqualification in the show ring. The genetic mutation responsible for this pigmentation is found in ancient Chinese dog lineages but is absent in Western breeds.",
      "🦵 The Chow Chow is the only dog breed to have completely straight hind legs — no bend at the stifle (knee) joint. This unique structure gives the breed its characteristic stilted, somewhat rolling gait that is distinctive but limits its agility compared to normal-jointed breeds. The straight-stifle anatomy appears in ancient Chinese dog sculptures and pottery, suggesting it was a trait bred into the Chow thousands of years ago.",
      "📚 Sigmund Freud kept Chow Chows throughout his life and took one to his therapy sessions as a form of patient assessment — he believed that dogs could read human emotional states better than humans could. Freud's Chow Jofi reportedly lay quietly with calm patients and moved restlessly during sessions with anxious ones, providing Freud with a kind of canine behavioral indicator. The breed's reputation for reading people with unusual accuracy persists among Chow Chow owners to this day.",
      "🍖 In ancient China, Chow Chows were raised for food — their meat was considered a delicacy, and the breed is one of the few dog breeds that was systematically farmed for consumption. This historical reality is occasionally cited to explain the breed's characteristically aloof relationship with humans, though the actual behavioral explanation is simply the breed's long development as a self-sufficient working and guard dog. The practice is now illegal throughout China.",
      "🏠 The Chow Chow is one of the only breeds that has been identified as a high-risk breed by homeowners' insurance companies in the United States, alongside Pit Bulls, Rottweilers, and German Shepherds. This classification is based on bite statistics rather than individual dog temperament, and many Chow Chow enthusiasts argue that the breed's natural aloofness with strangers is misclassified as aggression when it is actually simply disengagement.",
    ],
    ctaH:"Traveling with Your Chow Chow?", ctaP:"China's most regal ancient breed deserves calm, respectful expert care on every journey."
  },
  {
    slug:'dogue-de-bordeaux', name:'Dogue de Bordeaux', rank:95, group:'Working', origin:'France',
    alsoKnown:'French Mastiff, Bordeaux Bulldog, DDB', weight:'110–145 lbs', height:'23–27 in',
    lifespan:'5–8 yrs', energyLabel:'Low', e:'low', s:'large', sLabel:'Large',
    api:'mastiff/english', emoji:'🍷', keywords:'dogue de bordeaux french mastiff bordeaux wrinkles giant',
    tagline:"France's ancient wrinkled mastiff — a massive, devoted guardian with the largest head of any breed relative to body size, made famous by Tom Hanks and an extraordinary bond with its family",
    shortDesc:"France's wrinkled giant — the French Mastiff has the largest head relative to body size of any breed, a devoted heart, and a lifespan tragically short at 5–8 years.",
    ov1:"The Dogue de Bordeaux is one of France's most ancient breeds, with origins traced to the molossoid dogs of ancient Rome that spread throughout Gaul during Roman conquest. It was used for hunting large game (bears, boars, and jaguars in the New World), bull-baiting, guarding estates, and pulling heavy carts. The breed's distinctively massive, wrinkled head — the largest relative to body size of any breed — distinguishes it from all other mastiffs. Despite its French origin, the modern breed was revived largely through English breeding programs in the 20th century.",
    ov2:"The Dogue de Bordeaux is a calm, devoted companion that belies its imposing appearance with extraordinary gentleness toward its family. It is typically low-energy, satisfied with moderate daily exercise, and deeply affectionate — especially with children. However, its very short lifespan of 5–8 years means that time with a DDB must be treasured, and owners must prepare for early health challenges and heartbreak. The breed requires vigilant attention to breathing, joint health, and cardiac function throughout its life.",
    traits:{energy:42,affection:88,kids:82,dogs:60,training:62},
    coat:"Short, fine, and soft; wrinkled skin around face and neck requires regular cleaning to prevent skin fold dermatitis",
    colors:"Shades of fawn from light fawn to mahogany, with a red or black mask",
    apt:"No — large, heavy breed needs space and a secure yard; not suitable for apartment living",
    qf:["<strong>AKC Rank:</strong> #95 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> Bordeaux region, France","<strong>Also Known As:</strong> French Mastiff, Bordeaux Bulldog, DDB","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> Challenging — health management needs are extensive"],
    health:["Dilated cardiomyopathy — cardiac disease is the leading cause of premature death in the breed; cardiac screening from age 2","Hip and elbow dysplasia — OFA testing essential; very common in this heavy, large breed","Brachycephalic syndrome — the flat face causes breathing difficulties; avoid heat and strenuous exercise","Skin fold dermatitis — wrinkles around face and body must be cleaned and dried daily to prevent infections"],
    diet:{puppy:{a:"3–5 cups",c:"1,200–2,000 kcal"},adult:{a:"4–6 cups",c:"1,600–2,400 kcal"},senior:{a:"3–5 cups",c:"1,200–2,000 kcal"}},
    nutri:["Large-breed puppy formula prevents too-rapid growth in this heavy breed during critical bone development","Feed twice daily from floor level — avoid raised bowls and restrict exercise around meals to reduce bloat risk","Joint supplements from puppyhood benefit this heavy breed's developing joints and long-term mobility","Monitor weight carefully — obesity dramatically worsens breathing, joint, and cardiac issues in this breed"],
    pupCost:"$1,500–$3,500", foodCost:"$900–$1,500", vetCost:"$600–$1,200", groomCost:"$200–$400", supplCost:"$300–$500",
    costNote:"Veterinary costs are the dominant expense — the DDB's health challenges (cardiac, respiratory, orthopedic) often require specialist consultations and early intervention. Pet insurance is strongly recommended.",
    mixes:[
      {n:"Dogue de Bordeaux × Labrador Mix",d:"The Lab's warmth and energy tempers the DDB's calm guardian nature — a large, devoted family dog that's more active than the DDB parent but equally loyal."},
      {n:"Dogue de Bordeaux × Bullmastiff Mix",d:"Two guardian mastiff breeds combine into a massive, devoted protector with the DDB's wrinkled face and the Bullmastiff's working discipline."},
      {n:"Dogue de Bordeaux × Rottweiler Mix",d:"Two powerful European guardians produce a large, loyal, and protective crossbreed with strong territorial instincts and deep family devotion."},
      {n:"Dogue de Bordeaux × English Bulldog Mix",d:"Two bully-type dogs with flat faces combine into a stocky, deeply devoted companion — a wrinkled, low-energy, gentle crossbreed with an enormous appetite for affection."},
    ],
    facts:[
      "🎬 The Dogue de Bordeaux became internationally famous through the 1989 Tom Hanks film Turner & Hooch, in which the slobbery, wrinkled Hooch — played by a DDB named Beasley — stole every scene he appeared in. The film dramatically increased American interest in the breed, which had been nearly unknown in the United States prior to its release. Beasley was trained by Karl Lewis Miller and is credited with introducing the Dogue de Bordeaux to a global audience for the first time.",
      "🏆 The Dogue de Bordeaux has the largest head relative to body size of any dog breed in the world. Male DDB heads can measure 27–30 inches in circumference, and the breed standard specifies that the head should look 'massive and angular' rather than round — the architecture of the skull is so specific and distinctive that experienced breeders can identify the breed from a head silhouette alone. This massive head is part of the breed's appeal, but it contributes to birthing difficulties requiring C-sections.",
      "💔 The Dogue de Bordeaux has the shortest average lifespan of almost any breed — just 5–8 years — a consequence of the combination of giant size (large dogs live shorter lives), brachycephalic anatomy, and elevated cardiac disease rates. DDB owners universally describe the breed's short life as its only significant flaw, and the community of DDB enthusiasts is close-knit partly because of the shared experience of loving and losing these dogs at ages that seem impossibly young.",
      "🌍 The breed nearly went extinct during the French Revolution and again during World War II. During the Revolution, the DDB was associated with the French aristocracy whose estates it guarded, and many dogs were killed along with their owners. During WWII, German occupation forces demanded the deaths of large French dogs to reduce food competition — the DDB population in France was devastated and took decades to recover, largely through British breeding programs that had preserved the breed.",
      "🧶 The Dogue de Bordeaux drools extensively — this is not an occasional occurrence but a constant reality of life with the breed. Owners keep designated 'drool rags' in every room, specifically position themselves relative to their DDB to avoid the worst airborne drool trajectories, and accept that any clothing worn near the dog will bear evidence of the visit. The drool is a direct consequence of the breed's pendulous jowls and loose lips, anatomical features that have been selected for over centuries of breeding for the characteristic mastiff head.",
    ],
    ctaH:"Traveling with Your Dogue de Bordeaux?", ctaP:"France's wrinkled giant needs careful, climate-controlled transport and expert handling on every journey."
  },
  {
    slug:'bouvier-des-flandres', name:'Bouvier des Flandres', rank:100, group:'Herding', origin:'Belgium',
    alsoKnown:'Belgian Cattle Dog, Vuilbaard (Dirty Beard), Flanders Cattle Dog', weight:'70–110 lbs', height:'23–27 in',
    lifespan:'10–12 yrs', energyLabel:'High', e:'high', s:'large', sLabel:'Large',
    api:'bouvier/flandres', emoji:'⚜️', keywords:'bouvier des flandres belgian herding working police dog',
    tagline:"Belgium's rugged all-purpose working dog — a powerful, intelligent herder that served in both World Wars, became a top police and military breed, and remains a devoted, versatile family guardian",
    shortDesc:"Belgium's rugged all-purpose herder — a powerful, bearded working dog that served heroically in both World Wars and is now one of Europe's premier police and family guardian breeds.",
    ov1:"The Bouvier des Flandres was developed in the Flanders region of Belgium as an all-purpose farm dog — it herded cattle, pulled carts, and served as a general working companion for Belgian farmers. 'Bouvier' simply means 'cow herder' in French, and 'des Flandres' specifies the Flanders region. The breed nearly went extinct during World War I, when Flanders became the most devastated battlefield in Europe — so many Bouviers worked as ambulance dogs and message carriers on the Western Front that the breed's Belgian civilian population was nearly wiped out.",
    ov2:"Modern Bouviers are highly intelligent, versatile working dogs used in police K-9 units, search and rescue, personal protection, guide dog work, and competitive dog sports. They are deeply loyal to their families and moderately reserved with strangers — traits that make them exceptional family guardians but require thorough early socialization. Their dense, rough coat and powerful build require consistent training from puppyhood, but for experienced owners willing to invest the time, the Bouvier is one of the most rewarding working dogs available.",
    traits:{energy:85,affection:80,kids:78,dogs:65,training:85},
    coat:"Thick, rough, tousled double coat with a dense undercoat; characteristic beard and mustache require regular maintenance",
    colors:"Fawn, black, gray brindle, or dark brindle; white star on chest is acceptable; solid black or fawn to brindle",
    apt:"No — large, high-energy herding dog needs outdoor space, daily vigorous exercise, and a job",
    qf:["<strong>AKC Rank:</strong> #100 most popular (2025)","<strong>Group:</strong> Herding","<strong>Origin:</strong> Flanders, Belgium","<strong>Also Known As:</strong> Belgian Cattle Dog, Vuilbaard (Dirty Beard)","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — requires experienced, assertive owners with active lifestyles"],
    health:["Hip dysplasia — OFA certification essential for this large herding breed","Subaortic stenosis — a heart defect; cardiac screening by a cardiologist recommended before breeding","Glaucoma — eye pressure disease more common in Bouviers than average; annual eye exams from age 3","Hypothyroidism — thyroid issues documented; annual thyroid panels from middle age"],
    diet:{puppy:{a:"3–5 cups",c:"1,200–2,000 kcal"},adult:{a:"3–4.5 cups",c:"1,200–1,800 kcal"},senior:{a:"2.5–4 cups",c:"1,000–1,600 kcal"}},
    nutri:["Large-breed puppy formula prevents too-rapid skeletal development in this powerful breed","High-protein diet supports the Bouvier's working drive and substantial muscle mass","The rough beard and mustache trap food and water — clean after meals to prevent odor and skin irritation","Feed twice daily and restrict exercise around meals to reduce bloat risk in this deep-chested large breed"],
    pupCost:"$1,200–$3,000", foodCost:"$700–$1,100", vetCost:"$500–$900", groomCost:"$500–$900", supplCost:"$300–$500",
    costNote:"Professional grooming every 6–8 weeks for the dense, rough coat is a significant recurring expense — owners who learn to groom at home save considerably but must invest time in learning the technique.",
    mixes:[
      {n:"Bouvier des Flandres × Standard Poodle Mix",d:"Two intelligent working breeds combine into a large, potentially low-shedding crossbreed with exceptional trainability and a strong working drive."},
      {n:"Bouvier des Flandres × German Shepherd Mix",d:"Two elite working dog breeds produce a large, highly intelligent, protective crossbreed used in K-9 and working roles across Europe."},
      {n:"Bouvier des Flandres × Labrador Mix",d:"The Lab's sociability softens the Bouvier's territorial nature — a large, loyal, and more approachable crossbreed that retains working intelligence."},
      {n:"Bouvier des Flandres × Belgian Malinois Mix",d:"Two Belgian working breeds combine into an extraordinarily driven, athletic working dog best suited to professional handlers and serious dog sport enthusiasts."},
    ],
    facts:[
      "🪖 The Bouvier des Flandres served with extraordinary distinction in World War I — Belgian military Bouviers were used as messenger dogs, ambulance dogs, and search dogs on the Western Front, carrying messages through artillery fire and locating wounded soldiers in no-man's land. The breed's original Belgian population was decimated during the war, and the modern breed owes its survival to surviving Belgian military dogs and to breeding programs in France and the Netherlands.",
      "🏛️ The Bouvier des Flandres served as a White House dog under President Ronald Reagan, who kept a Bouvier named Lucky. The dog became notorious for dragging Reagan across the White House lawn in front of cameras — a viral moment before viral moments existed — demonstrating that even a president's authority was not sufficient to override a Bouvier's determination when it had decided where it was going.",
      "🚔 The Bouvier des Flandres is one of the four breeds most commonly used in European police K-9 units, alongside the German Shepherd, Belgian Malinois, and Dutch Shepherd. Its combination of intelligence, tracking ability, bite work capability, and heat tolerance makes it particularly valued in Mediterranean and southern European police forces where German Shepherds overheat. Belgian and Dutch police have favored the breed for over a century.",
      "🎬 Bouvier des Flandres with unusually high intelligence and trainability have been used in film productions requiring complex behavioral sequences from large dogs. The breed's work ethic — it genuinely enjoys learning and performing complex tasks — makes it more reliable on a film set than many breeds. Director Alain Resnais owned Bouviers throughout his life and credited the breed's disciplined work habits with influencing his thinking about creative work.",
      "🌾 The breed's nickname 'Vuilbaard' — Dutch for 'Dirty Beard' — refers to the characteristic that the Bouvier's dense beard and mustache trap mud, vegetation, water, and food during a working day in the Belgian countryside. While working farmers apparently found this charming, modern Bouvier owners must clean the beard after every meal and outdoor excursion to prevent odor and skin irritation beneath the dense facial hair.",
    ],
    ctaH:"Traveling with Your Bouvier des Flandres?", ctaP:"Belgium's most versatile working dog deserves expert, professional care on every journey."
  },
  {
    slug:'beauceron', name:'Beauceron', rank:102, group:'Herding', origin:'France',
    alsoKnown:'Berger de Beauce, Bas Rouge (Red Stockings), French Shorthaired Shepherd', weight:'70–110 lbs', height:'24–28 in',
    lifespan:'10–12 yrs', energyLabel:'High', e:'high', s:'large', sLabel:'Large',
    api:'malinois', emoji:'🐺', keywords:'beauceron french herding dog bas rouge double dewclaw',
    tagline:"France's large, natural herding shepherd — a powerful, intelligent working dog with distinctive red stockings on its legs, an ancestor of the Doberman, and centuries of French farm guardianship",
    shortDesc:"France's all-purpose farm shepherd with distinctive red-tan 'stockings' and double rear dewclaws — an ancient working breed that shaped the Doberman Pinscher and served in both World Wars.",
    ov1:"The Beauceron is one of France's oldest and most versatile herding breeds, developed in the Beauce region south of Paris for driving and guarding cattle and sheep. The breed is distinguished by its characteristic tan markings on the legs — called 'bas rouge' (red stockings) by French breeders — and its mandatory double dewclaws on each rear leg, a feature shared with the Great Pyrenees. The Beauceron is believed to have contributed significantly to the development of the Doberman Pinscher in Germany through crossings in the late 19th century.",
    ov2:"The Beauceron is a highly intelligent, high-drive working dog that was used extensively by the French military in both World Wars as a messenger dog, mine detector, and search-and-rescue dog. It is not a beginner's breed — it requires experienced, confident handling and substantial daily exercise to remain balanced. For working dog enthusiasts, farmers, or active families willing to invest in proper training and socialization, the Beauceron is a deeply loyal, impressively capable, and endlessly fascinating companion.",
    traits:{energy:88,affection:78,kids:72,dogs:62,training:85},
    coat:"Short, dense outer coat with a woolly undercoat; smooth and weather-resistant; easy to maintain",
    colors:"Black and tan (most common) or harlequin (gray and black patches with tan markings); tan markings must be clearly defined",
    apt:"No — large, high-drive working dog needs outdoor space and a job; minimum 2 hours vigorous exercise daily",
    qf:["<strong>AKC Rank:</strong> #102 most popular (2025)","<strong>Group:</strong> Herding","<strong>Origin:</strong> Beauce region, France","<strong>Also Known As:</strong> Berger de Beauce, Bas Rouge, French Shorthaired Shepherd","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — requires experienced, assertive handling and serious commitment to exercise"],
    health:["Hip dysplasia — OFA testing essential for this large working breed","Bloat (GDV) — deep-chested large breed at elevated risk; feed twice daily and limit post-meal exercise","Dilated cardiomyopathy — cardiac disease documented in the breed; cardiac screening recommended","Osteosarcoma — elevated bone cancer risk in large breeds; sudden limb swelling requires emergency evaluation"],
    diet:{puppy:{a:"3–5 cups",c:"1,200–2,000 kcal"},adult:{a:"3–4.5 cups",c:"1,200–1,800 kcal"},senior:{a:"2.5–4 cups",c:"1,000–1,600 kcal"}},
    nutri:["High-protein diet supports the Beauceron's working drive and substantial lean muscle mass","Working dogs on farms or in sport programs may need 25–40% more calories than sedentary pets of the same size","Joint supplements from middle age benefit this large, active working dog's long-term soundness","Feed twice daily and avoid vigorous exercise before and after meals to reduce bloat risk"],
    pupCost:"$1,200–$2,500", foodCost:"$700–$1,100", vetCost:"$500–$900", groomCost:"$200–$400", supplCost:"$300–$500",
    costNote:"The Beauceron's smooth, short coat is inexpensive to groom — occasional bathing and brushing is sufficient. The main costs are quality food for a large working dog and veterinary health screenings.",
    mixes:[
      {n:"Beauceron × German Shepherd Mix",d:"Two large European herding breeds combine into a highly intelligent, protective, and athletic working dog suited to experienced handlers and active families."},
      {n:"Beauceron × Belgian Malinois Mix",d:"Two elite European working dogs produce an extraordinarily driven, athletic, and intelligent crossbreed best suited to professional handlers or serious sport dog enthusiasts."},
      {n:"Beauceron × Labrador Mix",d:"The Beauceron's working intelligence meets the Lab's sociability — a large, trainable crossbreed that may be more approachable as a family companion than the purebred Beauceron."},
      {n:"Beauceron × Rottweiler Mix",d:"Two powerful European working breeds combine into a large, loyal, and protective family guardian with strong herding and guarding instincts."},
    ],
    facts:[
      "🐕 The Beauceron is believed to be one of the ancestor breeds of the Doberman Pinscher — Louis Dobermann, the German tax collector who developed the Doberman in the 1880s, almost certainly crossed German Shorthaired Pinschers with French herding dogs including the Beauceron to add size, elegance, and herding instinct to his new breed. The physical resemblance between a black-and-tan Beauceron and a Doberman is striking and not coincidental.",
      "🪖 Beaucerons served in both World War I and World War II in the French military as messenger dogs, mine detectors, and search dogs. Their intelligence and trainability made them ideal for learning complex working behaviors, and their courage under fire was documented in numerous French military records. The breed's working versatility — it could herd livestock, guard property, and perform complex military tasks — made it unusually adaptable to the varied demands of wartime service.",
      "🦶 Like the Great Pyrenees, the Beauceron has mandatory double dewclaws on each rear leg — a feature so important to the breed that dogs lacking them are disqualified in the show ring. These extra digits are believed to provide additional traction on uneven terrain during cattle-herding work on the plains of the Beauce region. The feature is unique among herding breeds and connects the Beauceron to ancient French working dog traditions.",
      "🎬 The Beauceron achieved its widest international audience as the fictional dog Vikie in the 2017 French film Sauvages (Savages) and through appearances in several French films and television series. The breed's striking black-and-tan coloring and imposing presence make it cinematically compelling, and French directors often prefer Beaucerons over German Shepherds for roles requiring a distinctively French working dog aesthetic.",
      "🐄 Traditional Beauceron handlers used a technique called 'making sheep' — where the dog was trained to move cattle in precise geometric patterns, including circles, spirals, and figure-eights, by reading subtle directional cues from the shepherd. This advanced herding technique required a dog of exceptional intelligence and responsiveness, and Beaucerons trained in this system could manage hundreds of sheep or cattle across large open plains with minimal human input during the working day.",
    ],
    ctaH:"Traveling with Your Beauceron?", ctaP:"France's most versatile shepherd dog deserves expert care on every adventure."
  },
  {
    slug:'boerboel', name:'Boerboel', rank:112, group:'Working', origin:'South Africa',
    alsoKnown:'South African Mastiff, Boer Dog, South African Boerboel', weight:'150–200 lbs', height:'22–27 in',
    lifespan:'9–11 yrs', energyLabel:'Medium', e:'medium', s:'large', sLabel:'Large',
    api:'mastiff/english', emoji:'🦁', keywords:'boerboel south african mastiff guardian farm dog',
    tagline:"South Africa's farm guardian mastiff — one of the largest and most powerful breeds on earth, bred by Boer settlers to protect farmsteads from lions, leopards, and baboons in the African bush",
    shortDesc:"South Africa's massive farm guardian — bred by Boer settlers to protect homesteads from lions and leopards, the Boerboel is one of the most powerful guardian breeds on earth.",
    ov1:"The Boerboel was developed by Dutch and German settlers in South Africa beginning in the 17th century — the word 'Boerboel' means 'farmer's dog' in Afrikaans. Settlers crossbred large European dogs brought from the Netherlands and Germany with indigenous African breeds, selecting for size, strength, and the courage necessary to confront lions, leopards, baboons, and other African wildlife threatening the farm. The resulting breed became the quintessential South African farm dog for nearly three centuries.",
    ov2:"The Boerboel is extremely devoted to its family — it bonds deeply with its people and is often called the most affectionate of the mastiff breeds at home. However, it is naturally territorial and suspicious of strangers, and its enormous size and strength demand experienced, confident ownership and thorough early socialization. In South Africa, the Boerboel is a cultural institution representing Afrikaner rural heritage, and the breed is now recognized internationally as one of the most capable and loyal guardian breeds available.",
    traits:{energy:60,affection:85,kids:72,dogs:55,training:65},
    coat:"Short, dense, and smooth; easy to maintain; minimal grooming required for this large breed",
    colors:"Fawn, red, brown, brindle, piebald; black mask preferred; white markings acceptable in limited areas",
    apt:"No — needs extensive outdoor space; not suitable for apartments or urban environments",
    qf:["<strong>AKC Rank:</strong> #112 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> South Africa","<strong>Also Known As:</strong> South African Mastiff, Boer Dog","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — requires very experienced ownership and early socialization"],
    health:["Hip and elbow dysplasia — OFA testing essential for this massive breed; very common in large working breeds","Vaginal hyperplasia — a reproductive condition in unspayed females; spaying eliminates this risk","Heart disease — dilated cardiomyopathy documented; cardiac screening from age 2","Bloat (GDV) — giant, deep-chested breed at high risk; prophylactic gastropexy strongly recommended"],
    diet:{puppy:{a:"4–7 cups",c:"1,600–2,800 kcal"},adult:{a:"5–8 cups",c:"2,000–3,200 kcal"},senior:{a:"4–6 cups",c:"1,600–2,400 kcal"}},
    nutri:["Giant-breed puppy formula is essential — too-rapid growth in a breed reaching 150–200 lbs causes lasting joint damage","Feed twice daily from floor level; restrict exercise 1 hour before and after meals to reduce GDV risk","Joint supplements from puppyhood are particularly important for this extraordinarily heavy breed","Monitor weight rigorously — an obese 200-lb dog faces dramatically amplified health consequences"],
    pupCost:"$1,500–$3,500", foodCost:"$1,100–$1,800", vetCost:"$600–$1,200", groomCost:"$150–$300", supplCost:"$300–$600",
    costNote:"Food is the dominant cost — a 200-lb working dog requires substantial daily calories. The short, smooth coat is among the easiest of any breed to maintain, keeping grooming costs low.",
    mixes:[
      {n:"Boerboel × Labrador Mix",d:"The Lab's famous warmth tempers the Boerboel's territorial nature — a large, loyal crossbreed that may be more approachable as a family companion while retaining guardian instincts."},
      {n:"Boerboel × Rottweiler Mix",d:"Two powerful guardian breeds combine into a massive, loyal protection dog requiring experienced ownership and extensive socialization from puppyhood."},
      {n:"Boerboel × Great Dane Mix",d:"Two giant breeds combine into an enormous companion — potentially one of the largest crossbreeds possible, with the Boerboel's guarding instinct and the Great Dane's calm elegance."},
      {n:"Boerboel × German Shepherd Mix",d:"Guardian power meets working intelligence — a large, loyal, and versatile crossbreed with strong protective instincts and better trainability than the purebred Boerboel."},
    ],
    facts:[
      "🦁 The Boerboel was specifically developed to confront and drive off lions and leopards — an extraordinary working requirement that shaped an extraordinary dog. Boer settlers in South Africa faced nightly threats from large predators attacking their livestock and families, and the Boerboel's size, courage, and bite strength were selected specifically to address these threats. Documented accounts from the 19th century describe Boerboels successfully driving off leopards and holding wounded lions at bay until hunters could arrive.",
      "🏋️ The Boerboel is ranked among the most powerful dog breeds in the world by bite force — estimates place its bite force at 450–800 PSI, comparable to or exceeding that of other mastiff breeds. This extraordinary physical capability was functional for a dog that needed to fight predators that could kill horses and cattle. Modern Boerboel owners must understand that this bite force combined with the breed's territorial instincts demands absolute confidence and control in the owner.",
      "🌍 Several countries have banned the Boerboel outright, including Denmark, Malaysia, Qatar, and parts of Switzerland and Russia. This unusual legal status reflects the breed's classification as a potentially dangerous dog under legislation targeting breeds with high bite incident rates and large size. South Africa and most Western countries allow the breed with no restrictions, and breed advocates argue that properly socialized Boerboels are no more dangerous than any other large working breed.",
      "📜 The Boerboel was only recognized by the AKC in 2015 — one of the most recently recognized breeds — despite being a working dog in South Africa for nearly 300 years. Its path to AKC recognition required decades of standardization work by South African breeders who had previously maintained informal records of the breed's lineage. The formal recognition brought increased international attention to the breed and significantly expanded its presence in North America.",
      "🤝 In South Africa, the Boerboel is so culturally significant that it appears on commemorative postage stamps and is associated with Afrikaner cultural identity in ways that few other breeds are tied to their country of origin. South African breeders maintain strict records and promote the breed internationally as part of cultural heritage preservation, and the South African Boerboel Breeders' Association is one of the most active national breed organizations in Africa.",
    ],
    ctaH:"Traveling with Your Boerboel?", ctaP:"South Africa's most powerful farm guardian needs careful, expert transport and handling on every journey."
  },
  {
    slug:'spinone-italiano', name:'Spinone Italiano', rank:113, group:'Sporting', origin:'Italy',
    alsoKnown:'Italian Griffon, Italian Wire-haired Pointing Dog, Spinone', weight:'61–85 lbs', height:'22–27 in',
    lifespan:'12–14 yrs', energyLabel:'Medium', e:'medium', s:'large', sLabel:'Large',
    api:'pointer/german', emoji:'🍕', keywords:'spinone italiano italian hunting dog wire haired pointer griffon',
    tagline:"Italy's ancient wire-haired hunting companion — a methodical, gentle, and affectionate gun dog with a bushy beard, human-like eyes, and one of the most people-oriented temperaments in the sporting world",
    shortDesc:"Italy's shaggy, gentle gun dog with a bushy beard and kind, almost human eyes — a methodical hunter and endearing companion beloved for its sweet, laid-back temperament.",
    ov1:"The Spinone Italiano is one of the oldest pointing breeds in the world, with ancestors depicted in Italian Renaissance paintings and possibly developed from ancient Celtic breeds brought to northern Italy during the Roman period. It was bred in the Piedmont region of northern Italy as an all-terrain hunting dog capable of working both in the mountains and the wetlands of the Po Valley — its wiry coat providing protection in dense brush and its webbed feet enabling efficient swimming. The AKC recognized the Spinone Italiano in 2000.",
    ov2:"The Spinone is one of the most gentle, patient, and people-focused hunting breeds in existence. It is famously good with children, tolerant of other dogs, and adaptable to family life in ways that many gun dog breeds are not. Unlike the intensity of many pointing breeds, the Spinone works at a thoughtful, methodical trot rather than a frantic gallop — an approach that makes it excellent company in the field without the relentless drive that challenges less active owners. It is often described as 'the thinking man's gun dog.'",
    traits:{energy:65,affection:92,kids:92,dogs:88,training:78},
    coat:"Wiry, dense, slightly wavy outer coat; distinctive beard, mustache, and bushy eyebrows; harsh texture protects against briars and cold water",
    colors:"White, white and orange, orange roan, white and brown, or brown roan; any brown patches must be in specific areas",
    apt:"No — large hunting dog needs substantial exercise, though its moderate energy suits more relaxed active owners",
    qf:["<strong>AKC Rank:</strong> #113 most popular (2025)","<strong>Group:</strong> Sporting","<strong>Origin:</strong> Piedmont, Italy","<strong>Also Known As:</strong> Italian Griffon, Italian Wire-haired Pointing Dog, Spinone","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> Yes — one of the most gentle and manageable large sporting breeds"],
    health:["Hip dysplasia — OFA testing recommended; common in this large, heavy-bodied sporting breed","Cerebellar ataxia — a genetic neurological condition specific to the breed; DNA test available for breeders","Bloat (GDV) — deep-chested breed at elevated risk; feed twice daily and limit exercise around meals","Otitis externa — the drop ears and dense hair around ear canal make ear infections common; clean ears weekly"],
    diet:{puppy:{a:"2.5–4 cups",c:"1,000–1,600 kcal"},adult:{a:"2.5–3.5 cups",c:"1,000–1,500 kcal"},senior:{a:"2–3 cups",c:"800–1,200 kcal"}},
    nutri:["High-quality protein supports the Spinone's large frame and moderate working drive","The beard and mustache trap food — clean after meals to prevent odor and skin irritation in the facial hair","Omega-3 fatty acids help maintain the wiry coat quality and protect the joints of this large sporting breed","Feed twice daily; a hunting dog in active season may need 20–30% more calories than during off-season rest"],
    pupCost:"$1,500–$2,500", foodCost:"$700–$1,100", vetCost:"$500–$850", groomCost:"$400–$700", supplCost:"$250–$450",
    costNote:"The Spinone's wiry coat requires hand-stripping or clipping every 8–10 weeks — less frequent than some wire-coated breeds but important for coat health and condition.",
    mixes:[
      {n:"Spinone Italiano × Standard Poodle Mix",d:"Two wire-coated or curly-coated sporting breeds combine into a large, intelligent, gentle companion with potentially low-shedding qualities and outstanding warmth."},
      {n:"Spinone Italiano × Labrador Mix",d:"Two gentle, people-oriented gun dogs combine into a large, affectionate, and trainable companion that excels in the field and at home with families."},
      {n:"Spinone Italiano × Golden Retriever Mix",d:"Gentle meets gentle in a large, fluffy, affectionate sporting companion that loves water, children, and lying by the fire in equal measure."},
      {n:"Spinone Italiano × Wirehaired Pointing Griffon Mix",d:"Two wire-coated European hunting breeds combine into an athletic, rugged, and affectionate companion with exceptional versatility in the field."},
    ],
    facts:[
      "🎨 The Spinone Italiano appears in paintings by Renaissance masters including Andrea Mantegna, whose Camera degli Sposi fresco in Mantua (1474) depicts a dog strikingly similar to the Spinone among the court of the Gonzaga family. If these depictions are of the Spinone's direct ancestors, they represent one of the earliest visual records of a specific recognizable dog breed in Western art history — evidence of the breed's deep roots in northern Italian culture.",
      "👀 The Spinone Italiano is famous among dog enthusiasts for its eyes — large, deep, amber or dark ochre, and characterized by an expression so soulful and human-like that artists and writers have returned to it repeatedly as a subject. The Italian breed standard specifically addresses the desirable 'gentle, mild, and friendly' expression that distinguishes the Spinone from more intense-looking sporting breeds, and Spinone owners frequently describe the feeling of being understood by their dog in a way that other breeds don't produce.",
      "🏊 The Spinone Italiano's webbed feet are among the most fully developed of any sporting breed — not a minor anatomical detail but a significant swimming advantage that makes the Spinone an enthusiastic and capable water retriever. Italian hunters in the wetlands of the Po Valley and the lagoons of Venice used the Spinone to retrieve waterfowl from shallow marshes where boats couldn't navigate, and the breed's swimming ability remains one of its most useful hunting characteristics.",
      "🐢 The Spinone Italiano is one of the slowest-working pointing breeds — it moves at a methodical trot rather than a gallop, systematically quartering the field at a pace that keeps it within range of walking hunters. This working style suits hunters who prefer a thorough, reliable search over the exhilarating but exhausting performance of faster breeds. The Spinone's pace means it covers ground very thoroughly, rarely missing birds, and it can sustain this methodical searching all day without fatigue.",
      "🌟 Despite its long history, the Spinone Italiano is one of the rarer sporting breeds in the United States — fewer than 300 puppies are registered with the AKC annually. Its relative rarity means that finding a reputable breeder requires research and typically a waitlist, but the breed's small community of dedicated enthusiasts ensures that puppy buyers receive excellent support and guidance from experienced Spinone owners.",
    ],
    ctaH:"Traveling with Your Spinone Italiano?", ctaP:"Italy's most gentle gun dog deserves warm, attentive care on every journey."
  },
  {
    slug:'welsh-terrier', name:'Welsh Terrier', rank:114, group:'Terrier', origin:'Wales',
    alsoKnown:'Welshie, Old English Terrier (historically)', weight:'20 lbs', height:'15 in',
    lifespan:'12–15 yrs', energyLabel:'High', e:'high', s:'small', sLabel:'Small',
    api:'terrier/welsh', emoji:'🏴', keywords:'welsh terrier welshie wales black tan terrier hunting',
    tagline:"Wales's spirited black-and-tan terrier — a compact, wire-coated earthdog with boundless energy, a sharp mind, and the classic terrier personality scaled to a perfectly portable size",
    shortDesc:"Wales's compact black-and-tan working terrier — spirited, intelligent, and energetic, the Welsh Terrier looks like a tiny Airedale and has the personality to match its appearance.",
    ov1:"The Welsh Terrier is one of the oldest terrier breeds in the British Isles, with origins in Wales extending back at least several centuries. It was bred to hunt fox, otter, and badger in the rugged Welsh countryside, working both above and below ground. The breed closely resembles a miniature Airedale Terrier in its coloring and coat — black saddle with tan head, legs, and belly — though it is an entirely distinct breed with its own ancient lineage. The AKC recognized the Welsh Terrier in 1888, making it one of the earliest British terriers to gain American recognition.",
    ov2:"Welsh Terriers are energetic, clever, and enthusiastic companions with the characteristic terrier independence that makes them both charming and occasionally exasperating. They are playful, good with children, and more amenable to training than many terriers — though they still retain the breed's fundamental assumption that their own judgment deserves equal weight to human direction. They need daily vigorous exercise, consistent training from puppyhood, and owners who appreciate a dog with opinions.",
    traits:{energy:85,affection:80,kids:80,dogs:62,training:72},
    coat:"Wiry, dense double coat; black saddle on back with tan head, ears, legs, and belly; requires hand-stripping to maintain proper texture",
    colors:"Black and tan only; tan may range from light to deep red-tan",
    apt:"Possible with vigorous daily exercise — securely fenced yard essential as the Welshie will pursue anything that moves",
    qf:["<strong>AKC Rank:</strong> #114 most popular (2025)","<strong>Group:</strong> Terrier","<strong>Origin:</strong> Wales","<strong>Also Known As:</strong> Welshie, Old English Terrier (historically)","<strong>Size:</strong> Small","<strong>Good for Families:</strong> Yes — energetic and affectionate with consistent training"],
    health:["Lens luxation — hereditary dislocation of the eye lens; a genetic test is available for breeding stock","Glaucoma — sometimes secondary to lens luxation; annual eye exams recommended","Skin allergies — Welsh Terriers are prone to environmental and food allergies causing skin irritation","Hip dysplasia — less common than in larger breeds but documented; OFA screening recommended"],
    diet:{puppy:{a:"0.5–0.75 cup",c:"300–500 kcal"},adult:{a:"0.5–0.75 cup",c:"300–500 kcal"},senior:{a:"0.4–0.6 cup",c:"250–400 kcal"}},
    nutri:["High-quality protein supports the Welshie's compact, muscular terrier build and high energy level","Avoid overfeeding — small, energetic breed that gains weight when exercise is inadequate","Omega-3 fatty acids help maintain the wiry coat quality and reduce skin inflammation in allergy-prone dogs","Feed twice daily on a schedule — regular mealtimes help manage energy levels in this active terrier"],
    pupCost:"$1,000–$2,000", foodCost:"$350–$550", vetCost:"$400–$650", groomCost:"$400–$700", supplCost:"$150–$300",
    costNote:"Hand-stripping the wiry coat 2–3 times per year is essential for show dogs — pet owners can opt for clipping, which is less expensive but gradually softens the coat texture.",
    mixes:[
      {n:"Welsh Terrier × Poodle Mix",d:"A smart, potentially low-shedding terrier cross that combines the Welshie's bold character with the Poodle's trainability — a compact, lively companion."},
      {n:"Welsh Terrier × Airedale Terrier Mix",d:"Two Welsh-connected terrier breeds combine into a medium-sized, wire-coated companion with extra energy and the Airedale's additional size and versatility."},
      {n:"Welsh Terrier × Jack Russell Mix",d:"Two British working terriers combine into a small, explosive bundle of terrier energy that requires experienced owners and consistent, positive training."},
      {n:"Welsh Terrier × Border Terrier Mix",d:"Two Welsh-heritage terrier breeds combine into a rugged, affectionate, and spirited little companion with the working terrier's fundamental attributes in a manageable size."},
    ],
    facts:[
      "🏆 Four US Presidents have kept Welsh Terriers — John F. Kennedy owned a Welshie named Charlie who lived at the White House during his presidency, and three other presidents kept the breed at various points. The Welsh Terrier's compact size, distinctive appearance, and lively temperament made it popular with politically active families who wanted a dog with presence but manageable size for White House life.",
      "🎭 The Welsh Terrier and the Airedale Terrier bear a strong visual resemblance — both are black-and-tan with wiry coats and similar facial structure — but they are distinct breeds with different origins. The confusion is so persistent that Welsh Terrier breed clubs regularly publish guides helping people distinguish the two. The simplest difference: the Welshie is about half the size of an Airedale and has a squarer, more compact body relative to its leg length.",
      "🦦 The Welsh Terrier was bred to work both above and below ground — hunting otter along Welsh riverbanks in summer and fox or badger in the mountains during winter. This dual above/below-ground working ability required a dog with the otter-hunting endurance of a water dog and the earthdog courage of a fox terrier, producing a breed of unusual versatility for its size.",
      "🎨 The Welsh Terrier's distinctive black-and-tan coloring appears remarkably consistently across the breed — essentially all Welsh Terriers are born this way. Unlike many terrier breeds with a wide color range, the Welshie's coloring is so uniform that judging at dog shows focuses almost entirely on structure, movement, and coat quality rather than color evaluation. This genetic consistency reflects centuries of selective breeding in a relatively isolated Welsh population.",
      "🌟 Despite being one of the oldest British terrier breeds, the Welsh Terrier is classified as a 'vulnerable native breed' by the UK Kennel Club — meaning fewer than 300 puppies are registered in Britain annually. This rarity is partly attributable to the breed's lower profile compared to similar-looking terriers, and partly to its robust constitution making it a less dramatic subject for the health-conscious media stories that drive interest in other breeds.",
    ],
    ctaH:"Traveling with Your Welsh Terrier?", ctaP:"Wales's most spirited terrier deserves expert, enthusiastic care on every adventure."
  },
  {
    slug:'tibetan-terrier', name:'Tibetan Terrier', rank:118, group:'Non-Sporting', origin:'Tibet',
    alsoKnown:'Dhokhi Apso (Shaggy Dog), Tsang Apso, Holy Dog of Tibet', weight:'18–30 lbs', height:'14–17 in',
    lifespan:'15–16 yrs', energyLabel:'Medium', e:'medium', s:'medium', sLabel:'Medium',
    api:'terrier/tibetan', emoji:'🏔️', keywords:'tibetan terrier tibet holy dog long coat medium breed',
    tagline:"Tibet's lucky 'holy dog' — a shaggy, flat-footed mountain dog that was never sold, only gifted, and brings fortune to those fortunate enough to share their home with one",
    shortDesc:"Tibet's sacred 'holy dog' — never sold, only gifted by Tibetan monks, with unique flat snow-shoe feet, an extraordinary 15–16 year lifespan, and a loving, spirited personality.",
    ov1:"The Tibetan Terrier is not technically a terrier — it was named by British travelers who encountered the breed in Tibet and applied the misleading 'terrier' label based on size. In Tibet, the breed was kept by Buddhist monks in the monasteries of the Himalayas and considered a sacred animal; it was never sold but occasionally gifted as a gesture of profound good fortune or gratitude. The breed was introduced to the West when a British physician, Dr. Agnes Greig, received one as a gift from a Tibetan patient in the 1920s.",
    ov2:"Tibetan Terriers are affectionate, adaptable, and lively — gentle enough for families with children and spirited enough for active owners. They are notably long-lived, regularly reaching 15–16 years, and maintain their vitality well into old age. Their dense, flowing double coat requires regular grooming but sheds minimally, making them a better choice for allergy-sensitive households than many breeds. They are sensitive dogs that respond best to positive, gentle training and can become anxious with harsh handling.",
    traits:{energy:68,affection:88,kids:82,dogs:82,training:75},
    coat:"Long, double coat — soft, woolly undercoat and fine outer coat that falls forward over the face; does not shed much but mats without regular brushing",
    colors:"Any color or combination including white, black, gold, cream, gray, brindle; parti-colors common",
    apt:"Yes — adapts well to apartment living with regular walks and indoor play",
    qf:["<strong>AKC Rank:</strong> #118 most popular (2025)","<strong>Group:</strong> Non-Sporting","<strong>Origin:</strong> Tibet (Himalayan monasteries)","<strong>Also Known As:</strong> Dhokhi Apso, Tsang Apso, Holy Dog of Tibet","<strong>Size:</strong> Medium","<strong>Good for First-Time Owners:</strong> Yes — gentle, adaptable, and manageable"],
    health:["Progressive retinal atrophy (PRA) — genetic testing available; request clear results from breeder","Hip dysplasia — less common than in larger breeds but documented in Tibetan Terriers; OFA testing recommended","Neuronal ceroid lipofuscinosis (NCL) — a fatal neurological storage disease; genetic test is available","Lens luxation — hereditary eye condition requiring prompt veterinary attention if symptoms appear"],
    diet:{puppy:{a:"0.75–1.25 cups",c:"350–600 kcal"},adult:{a:"0.75–1.25 cups",c:"350–600 kcal"},senior:{a:"0.6–1 cup",c:"280–500 kcal"}},
    nutri:["Quality protein supports the Tibetan Terrier's moderate activity level and longevity","The dense coat benefits from omega-3 fatty acids that maintain coat condition and skin health","Avoid overfeeding — this breed maintains a healthy weight easily but gains weight if significantly over-fed","Feed twice daily; the Tibetan Terrier's hardy Himalayan ancestry means it is not typically finicky but benefits from consistency"],
    pupCost:"$1,200–$2,500", foodCost:"$400–$650", vetCost:"$400–$700", groomCost:"$400–$700", supplCost:"$200–$350",
    costNote:"Regular grooming — professional or thorough home brushing every 2–3 days — is the main ongoing cost to prevent the dense coat from matting. Professional grooming every 6–8 weeks is recommended.",
    mixes:[
      {n:"Tibetan Terrier × Poodle Mix",d:"Two long-lived, low-shedding breeds combine into a gentle, intelligent companion that may be particularly suitable for allergy-sensitive households."},
      {n:"Tibetan Terrier × Lhasa Apso Mix",d:"Two Tibetan companion dogs combine into a small, devoted, long-coated companion deeply rooted in Himalayan tradition and notable for exceptional longevity."},
      {n:"Tibetan Terrier × Maltese Mix",d:"Two ancient long-coated companion breeds produce a small, flowing, affectionate crossbreed with gentle temperament and minimal shedding."},
      {n:"Tibetan Terrier × Shih Tzu Mix",d:"Three generations of Chinese-Tibetan companion breeding meet in this small, silky, affectionate crossbreed with a flowing coat and an easygoing, loving personality."},
    ],
    facts:[
      "🍀 Tibetan Terriers were considered sacred luck-bringers by Tibetan Buddhist monks — giving one away was believed to transfer the good fortune of the monastery to the recipient, while selling one was considered to risk inverting that fortune. This tradition meant the breed could only change hands as a precious gift, never through commerce, preserving the breed's purity within the monasteries for centuries and explaining why the Tibetan Terrier remained essentially unknown in the West until the 1920s.",
      "🦶 The Tibetan Terrier has uniquely large, round, flat feet with hair between the toes — natural snowshoes that provided grip and traction on the icy, snowy terrain of the Himalayas. These unusual feet are specified in the breed standard as a characteristic feature and are one of the physical traits that distinguish the Tibetan Terrier from other small long-coated breeds. Tibetan monks reportedly valued this feature for allowing their sacred dogs to accompany them on mountain journeys.",
      "🏔️ The Tibetan Terrier was developed at altitudes exceeding 16,000 feet in the Himalayan mountains — among the highest elevations at which any domestic dog was kept as a permanent resident. This extreme altitude shaped a breed with a double coat capable of insulating against temperatures well below freezing, lungs adapted to thin air, and feet designed for mountainous terrain. The breed's hardiness and adaptability reflect this extreme development environment.",
      "🌿 The Tibetan Terrier has an unusually long lifespan for a medium-sized dog — regularly reaching 15–16 years and occasionally beyond. Veterinary researchers attribute this longevity partly to genetic diversity maintained through the breed's isolated Tibetan development, partly to its historically sparse but nutritious diet, and partly to the low-stress monastery environment where the breed lived for centuries. Long-lived Tibetan Terriers seem to maintain cognitive sharpness well into old age.",
      "🎁 The first Tibetan Terrier in the Western world was given as a gift of gratitude — Dr. Agnes Greig, a British physician working in Tibet, performed a successful medical procedure on a Tibetan patient who rewarded her with a Tibetan Terrier puppy as the highest expression of gratitude available. Dr. Greig was so enchanted by the dog that she established a breeding kennel in England, importing additional dogs from Tibet, and created the foundation of all Western Tibetan Terrier bloodlines.",
    ],
    ctaH:"Traveling with Your Tibetan Terrier?", ctaP:"Tibet's sacred holy dog deserves careful, gentle care on every journey it takes with you."
  },
  {
    slug:'neapolitan-mastiff', name:'Neapolitan Mastiff', rank:119, group:'Working', origin:'Italy',
    alsoKnown:'Mastino Napoletano, Neo, Italian Mastiff', weight:'110–150 lbs', height:'24–31 in',
    lifespan:'7–9 yrs', energyLabel:'Low', e:'low', s:'large', sLabel:'Large',
    api:'mastiff/neapolitan', emoji:'🏛️', keywords:'neapolitan mastiff italian mastiff wrinkled giant guardian',
    tagline:"Italy's ancient wrinkled war dog — a massive, loose-skinned descendant of Roman combat dogs that once fought in the Colosseum, now a devoted, slobbery, and unmistakably unique family guardian",
    shortDesc:"Italy's ancient, magnificently wrinkled mastiff — descended from Roman war dogs, with pendulous jowls, loose folds of skin, and extraordinary devotion to its family.",
    ov1:"The Neapolitan Mastiff is a direct descendant of the molossoid war dogs of ancient Rome — massive, loose-skinned dogs used by the Roman Army and exhibited in Colosseum spectacles. After the fall of the Roman Empire, the breed survived in the Campania region around Naples, used as a farm guardian and estate protector. The breed was saved from near-extinction by Piero Scanziani, who standardized it in 1946 after World War II and entered it in Italian dog shows, bringing it to international attention for the first time.",
    ov2:"The Neapolitan Mastiff is among the most visually dramatic dog breeds in the world — its extraordinarily wrinkled face, pendulous jowls, and massive size create an appearance unlike any other breed. Despite this imposing appearance, Neos are deeply devoted to their families and typically gentle with their own people, though they are naturally suspicious of strangers and can be territorial. Their care requirements are significant: the skin folds must be cleaned daily, the slobbering is constant, and the short lifespan of 7–9 years compresses the relationship into an intense but relatively brief period.",
    traits:{energy:38,affection:85,kids:68,dogs:52,training:58},
    coat:"Short, dense, and fine; loose skin forms characteristic folds and wrinkles throughout the body; skin folds require daily cleaning",
    colors:"Gray (blue), black, mahogany, or tawny, with or without brindling; some white on chest and toes acceptable",
    apt:"No — giant breed needs substantial indoor and outdoor space; not suitable for apartments",
    qf:["<strong>AKC Rank:</strong> #119 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> Campania region, Italy (Naples)","<strong>Also Known As:</strong> Mastino Napoletano, Neo, Italian Mastiff","<strong>Size:</strong> Giant","<strong>Good for First-Time Owners:</strong> No — extensive health care needs and strong territorial instincts require experience"],
    health:["Hip and elbow dysplasia — OFA testing essential for this very large, heavy breed","Skin fold dermatitis — wrinkles must be cleaned and dried daily to prevent bacterial and yeast infections","Bloat (GDV) — giant, deep-chested breed at very high risk; prophylactic gastropexy strongly recommended","Cherry eye and entropion — eyelid and tear duct issues are extremely common; surgical correction often required"],
    diet:{puppy:{a:"4–6 cups",c:"1,600–2,400 kcal"},adult:{a:"5–8 cups",c:"2,000–3,200 kcal"},senior:{a:"4–6 cups",c:"1,600–2,400 kcal"}},
    nutri:["Giant-breed puppy formula prevents too-rapid growth that causes lifelong joint problems in this massive breed","Feed twice daily from floor level; avoid raised bowls and exercise around mealtimes to reduce bloat risk","Keep paper towels or dedicated Neo rags in every room — the Neo drools constantly and substantially","Skin-supporting supplements (fish oil, vitamin E) help maintain the health of the extensive skin fold surface area"],
    pupCost:"$2,000–$5,000", foodCost:"$1,100–$1,800", vetCost:"$600–$1,500", groomCost:"$200–$500", supplCost:"$300–$600",
    costNote:"Veterinary costs are the most significant ongoing expense — skin fold infections, eye conditions, and orthopedic issues in a 150-lb dog generate substantial medical bills over the breed's relatively short lifespan.",
    mixes:[
      {n:"Neapolitan Mastiff × Labrador Mix",d:"The Lab's warmth and energy softens the Neo's territorial nature — a large, devoted family dog that may be more manageable than the purebred Neo while retaining its loyal presence."},
      {n:"Neapolitan Mastiff × Cane Corso Mix",d:"Two Italian mastiff breeds combine into an enormous, powerful guardian with double the Italian mastiff heritage and an exceptionally imposing presence."},
      {n:"Neapolitan Mastiff × Rottweiler Mix",d:"Two powerful guardian breeds produce a massive, loyal protection dog requiring very experienced ownership and extensive socialization from puppyhood."},
      {n:"Neapolitan Mastiff × Great Dane Mix",d:"Two giant breeds combine into a potentially enormous companion — a crossbreed of extraordinary size with the Neo's wrinkled character and the Dane's elegant, calm temperament."},
    ],
    facts:[
      "🏛️ The Neapolitan Mastiff is the most direct living descendant of the molossoid dogs used in ancient Roman warfare and gladiatorial combat. Roman Legions brought these massive dogs on military campaigns to intimidate enemies, attack cavalry horses, and storm fortifications — their loose skin was a functional adaptation that allowed them to continue fighting even when seized by an opponent. The same skin that made them effective war dogs creates the breed's distinctive modern appearance.",
      "🎬 Fang — the dog belonging to Hagrid in the Harry Potter films — was played by Neapolitan Mastiffs throughout the series, particularly a Neo named Hugo who appeared in multiple films. The breed's combination of enormous size, jowly face, gentle film-set temperament, and dramatic appearance made it perfect for the role of a giant's beloved dog. The casting dramatically increased worldwide interest in the breed during the height of Harry Potter's popularity.",
      "😴 Neapolitan Mastiffs drool prodigiously — more consistently and abundantly than almost any other breed. The pendulous jowls, loose lips, and large mouth that give the Neo its distinctive appearance also create the anatomical conditions for constant, significant drooling. Neo owners universally warn prospective buyers that every piece of furniture, wall, clothing item, and visiting human will eventually bear evidence of their dog's presence. Dedicated drool management tools (bibs, towels, wall protectors) are standard Neo owner equipment.",
      "🔢 Neapolitan Mastiff puppies are among the most expensive dogs to produce — litters often require C-sections (the massive head is difficult to deliver naturally), the mother requires supplementary feeding to maintain milk production for large pups, and early health screening of the litter is complex and expensive. These production costs explain why responsibly bred Neo puppies from health-tested parents command prices of $2,000–$5,000 and why cheap Neos are typically products of irresponsible breeding.",
      "🌺 The Neapolitan Mastiff was nearly entirely unknown outside Italy until the late 20th century. The breed was reconstructed and standardized in Naples after World War II and recognized by the FCI in 1956, but it didn't reach America in significant numbers until the 1970s and was only recognized by the AKC in 2004. Its rapid rise to recognition despite its very specific care requirements reflects the irresistible draw of its ancient Roman appearance and its role in popular culture.",
    ],
    ctaH:"Traveling with Your Neapolitan Mastiff?", ctaP:"Rome's ancient war dog deserves the most careful, expert handling on every journey."
  },
  {
    slug:'belgian-sheepdog', name:'Belgian Sheepdog', rank:120, group:'Herding', origin:'Belgium',
    alsoKnown:'Groenendael, Chien de Berger Belge (black variety)', weight:'45–75 lbs', height:'22–26 in',
    lifespan:'12–14 yrs', energyLabel:'High', e:'high', s:'large', sLabel:'Large',
    api:'sheepdog/belgian', emoji:'🖤', keywords:'belgian sheepdog groenendael black herding dog belgium',
    tagline:"Belgium's stunning all-black herder — the Groenendael variety of the Belgian Shepherd, a breathtakingly elegant, intensely intelligent working dog with a flowing black coat and world-class versatility",
    shortDesc:"Belgium's all-black herder — the elegant Groenendael variety, with a flowing black coat, high working intelligence, and a record of distinguished police and military service worldwide.",
    ov1:"The Belgian Sheepdog (known in Europe as the Groenendael variety of the Belgian Shepherd) is one of four Belgian Shepherd varieties distinguished primarily by coat type and color — the Groenendael is the fully black, long-coated variety. All four varieties were developed in Belgium in the late 19th century for herding and farm guarding work. The Belgian Sheepdog was one of the first breeds used by Belgian police, serving as a police dog before World War I and distinguishing itself in military service during both World Wars.",
    ov2:"Belgian Sheepdogs are among the most intelligent and versatile working dogs in the herding group — they excel at police work, search and rescue, obedience competition, agility, and personal protection. Their elegant all-black coat and graceful movement make them visually striking, but they are emphatically working dogs that require substantial daily exercise and mental stimulation. They form extremely strong bonds with their primary person and can be sensitive to changes in routine or harsh training.",
    traits:{energy:90,affection:82,kids:72,dogs:65,training:88},
    coat:"Long, abundant outer coat with a dense undercoat; especially profuse around the neck (mane and jabot) and on the tail and hindquarters; solid black",
    colors:"Solid black (with or without small white spots on chest and between pads of feet); no other colors acceptable",
    apt:"No — high-energy herding dog needs outdoor space, daily vigorous exercise, and a working purpose",
    qf:["<strong>AKC Rank:</strong> #120 most popular (2025)","<strong>Group:</strong> Herding","<strong>Origin:</strong> Groenendael, Belgium","<strong>Also Known As:</strong> Groenendael, Belgian Shepherd (black long-coated variety)","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — requires experienced, active owners committed to extensive training and exercise"],
    health:["Hip and elbow dysplasia — OFA testing essential for this athletic herding breed","Epilepsy — idiopathic epilepsy is more common in Belgian breeds than in the average dog population","Progressive retinal atrophy — genetic testing available; ask breeder for clear documentation","Cancer — Belgian Sheepdogs have elevated cancer rates; proactive health screening is important from middle age"],
    diet:{puppy:{a:"2–3.5 cups",c:"800–1,400 kcal"},adult:{a:"2–3.5 cups",c:"900–1,400 kcal"},senior:{a:"1.75–3 cups",c:"750–1,200 kcal"}},
    nutri:["High-protein diet supports the Belgian Sheepdog's athletic build and intense working drive","Omega-3 fatty acids maintain the flowing black coat's condition and reduce seasonal shedding severity","Feed twice daily; high-energy herding dogs benefit from consistent meal scheduling to regulate energy levels","Monitor weight closely in retired working dogs — the transition to lower activity requires an immediate caloric adjustment"],
    pupCost:"$1,500–$2,500", foodCost:"$600–$950", vetCost:"$450–$800", groomCost:"$400–$700", supplCost:"$250–$450",
    costNote:"The long black coat requires regular professional grooming and dedicated home brushing to prevent matting and maintain its elegant appearance — this is a significant ongoing time and cost commitment.",
    mixes:[
      {n:"Belgian Sheepdog × German Shepherd Mix",d:"Two elite European herding and working breeds combine into a highly intelligent, loyal, and versatile companion with exceptional trainability and protective instincts."},
      {n:"Belgian Sheepdog × Standard Poodle Mix",d:"Two intelligent, active, working-oriented breeds produce a large, potentially low-shedding crossbreed with outstanding versatility in dog sports and working roles."},
      {n:"Belgian Sheepdog × Labrador Mix",d:"The Lab's famous sociability tempers the Belgian Sheepdog's intensity — a large, loyal, and highly trainable crossbreed that may be more approachable as a family pet."},
      {n:"Belgian Sheepdog × Belgian Malinois Mix",d:"Two Belgian Shepherd varieties combine into an extraordinarily driven, intelligent working dog suited only to experienced handlers and serious working dog enthusiasts."},
    ],
    facts:[
      "🖤 The Belgian Sheepdog's solid black coat is unique among the four Belgian Shepherd varieties — and it was deliberately selected and standardized by Groenendael castle owner Nicolas Rose, who began breeding for the all-black long-coated variety in the 1890s. The Groenendael name comes from Rose's estate near Brussels, and his breeding program established the Belgian Sheepdog as a distinct variety from the fawn Malinois, the rough-coated Tervuren, and the wirehaired Laekenois.",
      "🪖 Belgian Sheepdogs served extensively in both World Wars — during WWI, the Belgian Army used them as message carriers, ambulance dogs, and artillery cart-pulling dogs under conditions that proved the breed's extraordinary courage and trainability. After the war, the Belgian Sheepdog's military performance attracted international attention, and the breed was exported to police forces across Europe and North America where its working ability rivaled or exceeded that of the German Shepherd in several documented trials.",
      "🏆 The Belgian Sheepdog holds an AKC record for versatility — it is one of very few breeds that has earned titles in every AKC dog sport: herding, obedience, agility, tracking, protection (Schutzhund/IPO), and conformation showing. This extraordinary range of competitive achievement reflects the breed's genetic working intelligence, physical athleticism, and trainability, and is a core part of the Belgian Sheepdog's identity as a true all-purpose working dog.",
      "🌙 Like other herding breeds with strong guardian instincts, Belgian Sheepdogs are alert and tend to be somewhat nocturnal in their awareness — they are lighter sleepers than many breeds and will respond to sounds during the night that other dogs ignore. This trait, valuable in a farm guardian, can make them challenging in urban environments where background noise is constant, and early training to distinguish significant from insignificant stimuli is important.",
      "🎨 The Belgian Sheepdog's all-black coat is one of the most visually striking in the dog world when the dog moves — the flowing mane, the feathering on the legs and tail, and the dog's naturally elegant gait create a combination that many observers describe as uniquely beautiful. The breed has appeared in numerous fashion photography campaigns, luxury brand advertisements, and cinematic productions where a visually arresting black dog was required, and it photographs with exceptional drama in all lighting conditions.",
    ],
    ctaH:"Traveling with Your Belgian Sheepdog?", ctaP:"Belgium's most elegant black herder deserves expert, attentive care on every journey."
  },
];

function generateHTML(b) {
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
            <span class="badge badge-group">${b.group} Group</span>
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
                <div class="trait"><span class="trait-name">Energy Level</span><div class="bar"><div class="bar-fill" style="width:${b.traits.energy}%"></div></div></div>
                <div class="trait"><span class="trait-name">Affection</span><div class="bar"><div class="bar-fill" style="width:${b.traits.affection}%"></div></div></div>
                <div class="trait"><span class="trait-name">Good with Kids</span><div class="bar"><div class="bar-fill" style="width:${b.traits.kids}%"></div></div></div>
                <div class="trait"><span class="trait-name">Good with Dogs</span><div class="bar"><div class="bar-fill" style="width:${b.traits.dogs}%"></div></div></div>
                <div class="trait"><span class="trait-name">Trainability</span><div class="bar"><div class="bar-fill" style="width:${b.traits.training}%"></div></div></div>
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
          <p>A ${b.s === 'small' ? 'small' : b.s === 'large' ? 'large' : 'medium'}-sized breed with ${b.energyLabel.toLowerCase()} energy, the ${b.name} requires quality nutrition matched to its life stage and activity level.</p>
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

function generateCard(b) {
  const gp = b.coat&&b.coat.includes('Long')||b.coat&&b.coat.includes('long') ? 75 : b.coat&&b.coat.includes('wire')||b.coat&&b.coat.includes('Wire') ? 65 : b.coat&&b.coat.includes('short')||b.coat&&b.coat.includes('Short') ? 25 : 45;
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

const breedDir = 'C:/Pet Website/breeds/';
for (const b of breeds) {
  fs.writeFileSync(breedDir + b.slug + '.html', generateHTML(b), 'utf8');
  console.log(`✓ ${b.slug}.html`);
}
const indexPath = 'C:/Pet Website/breeds/index.html';
let index = fs.readFileSync(indexPath, 'utf8');
const newCards = '\n' + breeds.map(b => generateCard(b)).join('\n') + '\n';
index = index.replace('\n<a href="goldendoodle.html"', newCards + '\n<a href="goldendoodle.html"');
fs.writeFileSync(indexPath, index, 'utf8');
const sitemapPath = 'C:/Pet Website/sitemap.xml';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const entries = breeds.map(b => `  <url><loc>https://www.alldogfacts.com/breeds/${b.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n');
sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`\nBatch 3 done: ${breeds.length} files, index + sitemap updated.`);
