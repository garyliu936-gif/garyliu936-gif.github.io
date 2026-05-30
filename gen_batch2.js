// Batch 2 – AKC breeds #66–#92 (10 breeds)
// great-pyrenees, nova-scotia-duck-tolling-retriever, airedale-terrier,
// chinese-crested, irish-wolfhound, bullmastiff, anatolian-shepherd-dog,
// pekingese, border-terrier, basenji
const fs = require('fs');
const TODAY = '2026-05-25';

const breeds = [
  {
    slug:'great-pyrenees', name:'Great Pyrenees', rank:66, group:'Working', origin:'France / Spain',
    alsoKnown:'Pyrenean Mountain Dog, Patou, Great Pyr', weight:'85–115+ lbs', height:'25–32 in',
    lifespan:'10–12 yrs', energyLabel:'Medium', e:'medium', s:'large', sLabel:'Large',
    api:'pyrenees/great', emoji:'⛄', keywords:'great pyrenees mountain dog white fluffy guardian',
    tagline:"The majestic white mountain guardian of the Pyrenees — a gentle giant who has protected flocks from wolves and bears for thousands of years with calm authority and unwavering devotion",
    shortDesc:"The noble white livestock guardian from the Pyrenees — a massive, calm, and devoted protector that bonds to its flock (or family) with unshakeable loyalty.",
    ov1:"The Great Pyrenees has guarded sheep in the Pyrenean mountains between France and Spain for thousands of years — some estimates place the breed's origin as far back as 1800 BCE. Its thick, weather-resistant white coat provided camouflage among the sheep it protected and insulation against alpine winters. French royalty discovered the breed in the 17th century and it became fashionable in Versailles before finding worldwide popularity as a livestock guardian, family companion, and show dog.",
    ov2:"Great Pyrenees are calm, patient, and remarkably gentle with children and small animals — a temperament shaped by millennia of coexisting peacefully with the flocks they guard. However, they are also instinctively independent and nocturnal (livestock guardian dogs typically work at night) which can make them challenging to train for obedience. They bark at night, roam if not contained, and make decisions independently — characteristics that served them well in the mountains but require management in suburban homes.",
    traits:{energy:55,affection:85,kids:88,dogs:80,training:55},
    coat:"Thick, weather-resistant double coat — flat or slightly wavy outer coat with dense, woolly undercoat; sheds heavily seasonally",
    colors:"White, or white with markings of gray, badger, reddish brown, or tan",
    apt:"No — large breed needs substantial outdoor space; heavy shedder and nocturnal barker",
    qf:["<strong>AKC Rank:</strong> #66 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> Pyrenean Mountains, France/Spain","<strong>Also Known As:</strong> Pyrenean Mountain Dog, Patou, Great Pyr","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> Challenging — independent nature requires patient, consistent handling"],
    health:["Hip and elbow dysplasia — OFA testing essential; large breed at elevated risk","Bloat (GDV) — deep-chested giant breed; feed twice daily and restrict exercise around meals","Osteosarcoma — bone cancer at elevated risk in large breeds; sudden limb swelling warrants emergency evaluation","Addison's disease and immune-mediated disorders — more prevalent in Great Pyrenees than in many other breeds"],
    diet:{puppy:{a:"4–6 cups",c:"1,600–2,400 kcal"},adult:{a:"4–6 cups",c:"1,700–2,500 kcal"},senior:{a:"3–5 cups",c:"1,300–2,000 kcal"}},
    nutri:["Large-breed puppy formula prevents too-rapid bone growth that can cause developmental joint problems","Avoid overfeeding — a Great Pyrenees that's too heavy faces greatly increased joint and heart strain","Split meals into two servings and avoid strenuous exercise before and after eating to reduce GDV risk","Joint supplements (glucosamine, chondroitin) are beneficial starting from middle age in this large working breed"],
    pupCost:"$1,000–$2,500", foodCost:"$900–$1,400", vetCost:"$500–$900", groomCost:"$400–$700", supplCost:"$300–$500",
    costNote:"Food is the biggest ongoing expense — a 100-lb dog consumes substantially more than average, and the thick double coat requires regular professional grooming or dedicated home brushing sessions.",
    mixes:[
      {n:"Great Pyrenees × Golden Retriever (Great Golden Pyrenees)",d:"A stunning, gentle giant combining the Pyr's calm guardian nature with the Golden's friendliness — a devoted, fluffy family companion beloved by active households."},
      {n:"Great Pyrenees × German Shepherd Mix",d:"Guardian instinct meets working intelligence in a large, loyal, and protective crossbreed that's highly trainable with experienced owners."},
      {n:"Great Pyrenees × Bernese Mountain Dog (Bernese Pyrenees)",d:"Two magnificent mountain breeds combine into an enormous, gentle, gorgeous companion with thick fur, calm temperament, and deep devotion to family."},
      {n:"Great Pyrenees × Labrador Mix",d:"The Pyr's calm guardian nature softened by the Lab's sociability — a large, family-friendly crossbreed that's gentle with children and surprisingly trainable."},
    ],
    facts:[
      "⭐ The Great Pyrenees was declared the Royal Dog of France by King Louis XIV in 1675, and the young Louis XIV was known to have kept a Great Pyrenees at the Palace of Versailles — one of the first instances of a working livestock guardian breed entering fashionable European society. The royal endorsement transformed the breed from a mountain working dog into a prized aristocratic companion throughout the French court.",
      "🌙 Great Pyrenees are naturally nocturnal — a behavioral adaptation developed over thousands of years of livestock guarding work. Wolves and bears attack flocks primarily at night, so the breed evolved to sleep during the day and patrol actively after dark. This means Great Pyrenees tend to bark at night in response to sounds that other dogs sleep through, a behavior that is natural and functional but challenging for suburban owners with close neighbors.",
      "🐑 The Great Pyrenees's white coat was not an accident — it was deliberately developed to help the dog blend in with the white sheep of the Pyrenean mountain flocks. A guardian dog that resembles the sheep it protects can work close to the flock without causing panic among the animals. The white coat also allowed shepherds to distinguish their dog from wolves in low-light conditions, preventing accidental harm to the guardian.",
      "🌎 Great Pyrenees were among the first European dog breeds brought to North America. French Basques who settled in North America in the 1600s brought their Pyrenean Mountain Dogs with them, and the breed served as livestock guardians on the eastern seaboard long before the United States existed as a nation. President George Washington received Great Pyrenees dogs as a gift from the Marquis de Lafayette and kept them at Mount Vernon.",
      "🦴 Great Pyrenees have a distinctive physical feature unique among dogs: double dewclaws on each rear leg — an extra digit that gives the dog additional grip on steep, icy mountain terrain. Most dogs have single dewclaws on their front legs and none on the rear; the Great Pyrenees has two on each rear leg, and breed standards consider this feature essential. Dogs without rear double dewclaws are disqualified in the show ring.",
    ],
    ctaH:"Traveling with Your Great Pyrenees?", ctaP:"Your majestic mountain guardian gets careful, expert handling every step of the journey."
  },
  {
    slug:'nova-scotia-duck-tolling-retriever', name:'Nova Scotia Duck Tolling Retriever', rank:69, group:'Sporting', origin:'Canada',
    alsoKnown:'Toller, NSDR, Little River Duck Dog', weight:'35–50 lbs', height:'17–21 in',
    lifespan:'12–14 yrs', energyLabel:'High', e:'high', s:'medium', sLabel:'Medium',
    api:'retriever/golden', emoji:'🦆', keywords:'nova scotia duck tolling retriever toller canadian retriever',
    tagline:"Canada's clever fox-colored retriever — the only breed that lures ducks within range by playing on the shore, then dives in to retrieve them with the athleticism of a much larger dog",
    shortDesc:"Canada's fox-colored retrieving trickster — uses playful shore antics to lure curious ducks within range, then retrieves them with explosive athleticism and joyful energy.",
    ov1:"The Nova Scotia Duck Tolling Retriever was developed in the Little River district of Nova Scotia, Canada, in the early 19th century to assist hunters of waterfowl on the tidal flats of the Bay of Fundy. The breed's name references 'tolling' — an old English term for enticing or luring — because the Toller was trained to run, fetch, and play energetically along the shore while the hunter hid in a blind. Ducks, curious about the playful fox-colored dog, would swim closer to investigate, putting themselves within shotgun range before the Toller was sent to retrieve the birds.",
    ov2:"Tollers are energetic, intelligent, and highly affectionate with their families — they are sometimes called the 'middle child' of the retriever family, combining the Golden's warmth with a spark of terrier-like independence. They are vocal, using a distinctive high-pitched 'Toller scream' when extremely excited, and they need substantial daily exercise to stay balanced. Tollers excel at dog sports including agility, flyball, and dock diving, and are outstanding companions for athletic families.",
    traits:{energy:90,affection:88,kids:85,dogs:85,training:85},
    coat:"Dense, water-repellent double coat with a soft, thick undercoat; slight wave; feathering on ears, chest, legs, and tail",
    colors:"Various shades of red or orange with white markings on face, chest, feet, and/or tail tip",
    apt:"No — high-energy retriever needs substantial exercise and ideally water access",
    qf:["<strong>AKC Rank:</strong> #69 most popular (2025)","<strong>Group:</strong> Sporting","<strong>Origin:</strong> Nova Scotia, Canada","<strong>Also Known As:</strong> Toller, NSDR, Little River Duck Dog","<strong>Size:</strong> Medium","<strong>Good for First-Time Owners:</strong> Moderately — manageable but needs daily vigorous exercise"],
    health:["Progressive retinal atrophy (PRA) — genetic test available; request clear results from breeder","Addison's disease — more prevalent in Tollers than most breeds; know the symptoms of an 'Addisonian crisis'","Collie eye anomaly (CEA) — despite the name, this genetic eye condition occurs in Tollers; genetic test available","Systemic lupus erythematosus — an immune condition with higher incidence in the breed than average"],
    diet:{puppy:{a:"1.5–2.5 cups",c:"650–1,000 kcal"},adult:{a:"1.5–2.5 cups",c:"700–1,050 kcal"},senior:{a:"1.25–2 cups",c:"550–850 kcal"}},
    nutri:["High-quality protein fuels the Toller's intense athleticism and retriever working drive","Fish-based diets are particularly well-suited to this Canadian water dog's ancestral nutrition","Omega-3 fatty acids support the water-repellent double coat and reduce joint inflammation in an active dog","Feed twice daily; split meals help sustain energy levels throughout a Toller's high-activity day"],
    pupCost:"$1,500–$3,000", foodCost:"$550–$850", vetCost:"$450–$750", groomCost:"$300–$500", supplCost:"$250–$450",
    costNote:"Tollers are relatively rare in the US, making quality puppies harder to find and more expensive — waitlists with reputable breeders are common, especially outside eastern Canada.",
    mixes:[
      {n:"Nova Scotia Duck Tolling Retriever × Golden Retriever Mix",d:"Two fox-golden retriever types combine into a warm, athletic, highly trainable companion that loves water and family life in equal measure."},
      {n:"Nova Scotia Duck Tolling Retriever × Labrador Mix",d:"The Toller's energetic intelligence meets the Lab's legendary sociability — a medium-large, water-loving companion excellent for active families."},
      {n:"Nova Scotia Duck Tolling Retriever × Border Collie Mix",d:"Athletic precision meets athletic speed — a highly trainable, energetic working dog crossbreed suited to dog sports, farm life, and active handlers."},
      {n:"Nova Scotia Duck Tolling Retriever × Australian Shepherd Mix",d:"Two energetic, highly intelligent working breeds combine into a devoted, driven companion that needs a purpose and an owner who can provide one."},
    ],
    facts:[
      "🦊 The Nova Scotia Duck Tolling Retriever's fox-colored coat is not a coincidence — the breed was partly inspired by the natural behavior of foxes playing on shorelines that attracts curious waterfowl. Indigenous Mi'kmaq hunters in Nova Scotia observed that ducks would swim toward a playing fox out of curiosity, and early breeders developed the Toller specifically to replicate this behavior with a trained domestic dog under hunter direction.",
      "📢 The 'Toller scream' is one of the most distinctive vocalizations in dogdom — a high-pitched, eerily humanlike shriek that Tollers produce when they reach peak excitement, typically just before a retrieve or at the sight of their favorite toy. New owners are often unprepared for the sound, which can be alarming if mistaken for pain or distress but actually signals extreme positive excitement from a Toller fully engaged in what it was bred to do.",
      "🏆 The Nova Scotia Duck Tolling Retriever was only recognized by the AKC in 2003, making it one of the most recently recognized retriever breeds. Its Canadian origins — it was officially recognized by the Canadian Kennel Club in 1945 — meant it remained largely unknown outside Atlantic Canada for most of the 20th century. The breed's growing popularity in the US and Europe is relatively recent, driven by its manageable size, striking appearance, and athletic versatility.",
      "💧 Tollers are built for cold-water retrieves — their dense, oily double coat sheds water rapidly and provides insulation against the icy waters of Nova Scotia's Bay of Fundy. Tollers readily plunge into water at temperatures that would cause other retrievers to hesitate, a trait so pronounced that experienced Toller owners keep a stack of towels at the car and expect their dog to seek out any body of water within range on a walk.",
      "🎭 The tolling behavior — the playful shore-running that lures ducks within range — must be trained and directed by the hunter, not simply expected to happen spontaneously. Hunters using Tollers hide in a blind and toss a ball or stick along the shore; the Toller retrieves it repeatedly, and the movement and flash of the red coat draws curious ducks progressively closer. The method requires a Toller that is highly reliable, responsive to silent hand signals, and capable of sustained, enthusiastic play on command.",
    ],
    ctaH:"Traveling with Your Nova Scotia Duck Tolling Retriever?", ctaP:"Canada's clever tolling retriever deserves expert care that matches its boundless enthusiasm."
  },
  {
    slug:'airedale-terrier', name:'Airedale Terrier', rank:70, group:'Terrier', origin:'England',
    alsoKnown:'King of Terriers, Waterside Terrier, Bingley Terrier', weight:'40–65 lbs', height:'23 in',
    lifespan:'11–14 yrs', energyLabel:'High', e:'high', s:'large', sLabel:'Large',
    api:'terrier/airedale', emoji:'👑', keywords:'airedale terrier king of terriers largest terrier',
    tagline:"The King of Terriers — the largest of all terriers, bred in the Aire Valley of Yorkshire for versatile hunting and later distinguished as a police dog, military messenger, and war hero",
    shortDesc:"The King of Terriers — the largest terrier breed, a bold Yorkshire working dog with extraordinary versatility as hunter, guard, police dog, and beloved family companion.",
    ov1:"The Airedale Terrier was developed in the mid-19th century in the Aire valley of Yorkshire, England, by crossing the now-extinct Black and Tan Terrier with the Otterhound to create a larger, waterproof terrier capable of hunting otters in the river and rats and rabbits on land. The resulting breed was large, intelligent, and versatile enough to hunt virtually any quarry, and it earned the title 'King of Terriers' as the largest member of the terrier group. It was officially recognized by the AKC in 1888.",
    ov2:"Airedales are bold, energetic, and highly intelligent — they have a terrier's independent thinking and playful mischief combined with a working dog's stamina and drive. They are devoted to their families and typically good with children, but their size, strength, and stubbornness require confident, experienced handling. Airedales excel at obedience, agility, search and rescue, and as police dogs in Europe, where they served extensively in both World Wars as message carriers and search-and-rescue dogs.",
    traits:{energy:88,affection:82,kids:80,dogs:65,training:72},
    coat:"Dense, wiry outer coat with a softer undercoat; characteristic beard and tan markings; requires hand-stripping or regular clipping",
    colors:"Tan with a black or dark grizzle saddle on back and upper sides of the body",
    apt:"No — large, energetic terrier needs outdoor space and a minimum of 1–2 hours exercise daily",
    qf:["<strong>AKC Rank:</strong> #70 most popular (2025)","<strong>Group:</strong> Terrier","<strong>Origin:</strong> Aire Valley, Yorkshire, England","<strong>Also Known As:</strong> King of Terriers, Waterside Terrier","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> Challenging — needs experienced, assertive handling"],
    health:["Hip dysplasia — OFA testing recommended; more significant in this larger terrier than in smaller breeds","Hypothyroidism — thyroid issues are relatively common; annual thyroid panels from middle age","Skin and coat conditions — prone to dermatitis and hot spots; the dense wiry coat needs careful monitoring","Cancer — Airedales have an elevated cancer rate compared to the average; proactive health screening important"],
    diet:{puppy:{a:"2–3.5 cups",c:"850–1,400 kcal"},adult:{a:"1.75–3 cups",c:"800–1,200 kcal"},senior:{a:"1.5–2.5 cups",c:"650–1,000 kcal"}},
    nutri:["High-protein diet supports the Airedale's athletic build and terrier energy demands","Avoid obesity — an overweight Airedale puts excess stress on its joints and loses working ability quickly","Omega-3 fatty acids help maintain the wiry coat quality and reduce skin inflammation","Feed twice daily and monitor calorie intake seasonally — hunting-season dogs need more than pets on light exercise"],
    pupCost:"$1,000–$2,000", foodCost:"$600–$900", vetCost:"$450–$750", groomCost:"$400–$700", supplCost:"$250–$450",
    costNote:"Professional grooming (hand-stripping or clipping every 8–10 weeks) is a significant recurring cost for the Airedale — owners who learn to groom at home save hundreds annually.",
    mixes:[
      {n:"Airedale Terrier × Labrador Mix",d:"The King of Terriers meets the King of Retrievers — a large, intelligent, energetic crossbreed that combines terrier boldness with the Lab's legendary sociability and trainability."},
      {n:"Airedale Terrier × German Shepherd Mix",d:"Two working-dog powerhouses combine into a highly intelligent, loyal, and versatile companion with strong protective instincts and exceptional trainability."},
      {n:"Airedale Terrier × Goldendoodle Mix",d:"An athletic, potentially curly-coated large crossbreed blending the Airedale's terrier spirit with Poodle/Golden warmth in a package that may shed less than a purebred Airedale."},
      {n:"Airedale Terrier × Standard Poodle Mix",d:"Intelligence squared — two highly trainable, working-dog breeds with wiry or curly coats combine into an athletic, responsive companion that excels at virtually any dog sport."},
    ],
    facts:[
      "👑 The title 'King of Terriers' given to the Airedale was not honorary — it was earned through performance. In the early 20th century, Airedales were the preferred police dog in Britain and Germany before the German Shepherd became dominant in that role. Their combination of size, bite strength, intelligence, and trainability made them effective in law enforcement and military work long before purpose-bred police dog programs developed.",
      "🪖 Airedales served in both World War I and World War II, used by the British Army as messenger dogs to carry communications through enemy fire, as search and rescue dogs to find wounded soldiers on battlefields, and as sentry dogs guarding supply depots. A famous WWI Airedale named Jack ran through heavy shelling to deliver a message that saved a British battalion — Jack died of his wounds after completing his mission and was posthumously awarded the Victoria Cross.",
      "🎩 Three US Presidents kept Airedale Terriers: Woodrow Wilson owned one named Davie, Warren G. Harding's Airedale Laddie Boy was one of the most famous White House dogs in American history — he attended cabinet meetings, had his own chair, and received press coverage that made him a national celebrity. Calvin Coolidge also kept Airedales, reflecting the breed's early-20th-century popularity among America's influential classes.",
      "🌊 The Airedale was specifically bred to hunt otters in rivers — a job that required a dog waterproof enough to work in currents, large enough to handle an adult otter (which can weigh 30 pounds and is a ferocious fighter), and brave enough to pursue its quarry into deep water. The Otterhound crosses that created the Airedale gave it the swimming ability, dense coat, and nose for water quarry that distinguished it from strictly land-working terriers.",
      "🎭 Despite being categorized as a Terrier, the Airedale's size and capabilities blur the traditional line between terrier and working dog. It has been trained for search and rescue, bomb detection, narcotics detection, guide dog work, and competitive obedience — roles that few terriers could fill due to size and temperament limitations. This versatility reflects its design as a do-everything working dog rather than a purpose-built specialist.",
    ],
    ctaH:"Traveling with Your Airedale Terrier?", ctaP:"The King of Terriers deserves royal treatment — expert care on every journey."
  },
  {
    slug:'chinese-crested', name:'Chinese Crested', rank:72, group:'Toy', origin:'China / Africa',
    alsoKnown:'Crested, Chinese Crested Hairless, Powderpuff', weight:'8–12 lbs', height:'11–13 in',
    lifespan:'13–18 yrs', energyLabel:'Low', e:'low', s:'small', sLabel:'Small',
    api:'maltese', emoji:'🌸', keywords:'chinese crested hairless toy dog crested powderpuff',
    tagline:"The world's most distinctive toy dog — available in hairless or fully coated varieties, with an ancient seagoing history and one of the longest lifespans of any breed",
    shortDesc:"The breed that turns heads everywhere — available hairless (with silky crest and socks) or fully coated (Powderpuff), with an ancient history and remarkable 13–18 year lifespan.",
    ov1:"The Chinese Crested's exact origin is debated — the breed has ancient roots traced to African hairless dogs that Chinese sailors acquired during maritime trading voyages, then selectively bred on Chinese ships to create a compact, affectionate companion and ratter. Hairless dogs were prized as living hot water bottles by sick sailors and traded at ports worldwide, which explains why similar hairless breeds appear across multiple continents. The breed was further refined in China and arrived in the modern Western show world in the 20th century.",
    ov2:"Every Chinese Crested litter contains both hairless and fully coated ('Powderpuff') individuals — both are the same breed with different coat genetics, and both varieties can appear in the same litter. The hairless variety requires sunscreen in summer, moisturizer in winter, and protection from cold temperatures; the Powderpuff is fully coated and needs regular grooming. Both varieties are affectionate, playful, and deeply devoted to their owners, with an exceptional lifespan that often reaches 15–18 years.",
    traits:{energy:45,affection:92,kids:75,dogs:88,training:72},
    coat:"Hairless variety: smooth skin with silky crest on head, socks on paws, and plume on tail. Powderpuff variety: long, soft double coat over entire body",
    colors:"Any color or combination of colors — parti-colored, solid, spotted, or any combination",
    apt:"Yes — ideal apartment dog; minimal exercise needs, loves indoor life, and adapts to small spaces perfectly",
    qf:["<strong>AKC Rank:</strong> #72 most popular (2025)","<strong>Group:</strong> Toy","<strong>Origin:</strong> China (via Africa)","<strong>Also Known As:</strong> Crested, Chinese Crested Hairless, Powderpuff","<strong>Size:</strong> Small","<strong>Good for Apartments:</strong> Excellent — ideal apartment companion"],
    health:["Dental issues — the hairless gene is linked to missing or malformed teeth; routine dental care is critical","Sunburn and skin damage — hairless variety must wear pet sunscreen and be kept from prolonged sun exposure","Lens luxation — hereditary eye condition requiring prompt veterinary attention if symptoms appear","Progressive retinal atrophy — genetic test available; ask breeder for clear documentation on parents"],
    diet:{puppy:{a:"0.25–0.5 cup",c:"150–300 kcal"},adult:{a:"0.25–0.5 cup",c:"150–300 kcal"},senior:{a:"0.25 cup",c:"130–250 kcal"}},
    nutri:["Very small breed with minimal caloric needs — overfeeding is a serious risk; measure portions precisely","Dental-supportive diet is important — dental disease is the breed's most common health issue","Warm food slightly to entice this small breed, which may be choosy about food texture and temperature","High-quality small-breed formula helps maintain the coat in Powderpuffs and supports skin health in hairless varieties"],
    pupCost:"$1,000–$3,000", foodCost:"$250–$400", vetCost:"$350–$600", groomCost:"$200–$500", supplCost:"$150–$300",
    costNote:"Powderpuff varieties require regular professional grooming; hairless varieties need regular skincare products (sunscreen, moisturizer) — factor both into ownership costs.",
    mixes:[
      {n:"Chinese Crested × Chihuahua (Chi-Chi Crested)",d:"Two ancient companion breeds combine into a tiny, devoted, potentially hairless crossbreed with enormous personality and loyalty packed into a very small frame."},
      {n:"Chinese Crested × Poodle (Chinese Crestepoo)",d:"The Poodle's intelligence and potentially low-shedding coat meets the Crested's affectionate, people-focused nature in a small, clever companion."},
      {n:"Chinese Crested × Maltese Mix",d:"Two silky-haired toy companions combine into a gentle, affectionate lap dog with a potentially flowing coat and an easygoing, sociable temperament."},
      {n:"Chinese Crested × Papillon Mix",d:"Two distinctively beautiful toy breeds produce a small, lively crossbreed with striking ears, a unique coat, and an alert, playful personality."},
    ],
    facts:[
      "🚢 Chinese Cresteds traveled the world's oceans on trading ships — the hairless breed was valued by sailors for multiple reasons: they provided warmth (hairless dogs have skin temperature slightly higher than coated breeds), they caught rats in the ship's hold, and they were disease-resistant in ways that medieval and early modern sailors believed, perhaps partly due to the perceived cleanliness of a hairless animal. Ports from China to Africa to Latin America all have records of similar hairless dogs.",
      "🎪 The Chinese Crested consistently wins the World's Ugliest Dog Contest at the Sonoma-Marin Fair in California — a beloved annual event in which the most unusually-featured dog is celebrated rather than the most beautiful. Chinese Cresteds have dominated the competition for decades, with their combination of sparse hair, protruding teeth (a genetic consequence of the hairless gene), and striking features perfectly designed for the contest's aesthetic. The dogs' owners universally report that their Cresteds are, to them, the most beautiful dogs in the world.",
      "🧬 The hairless gene that defines the Chinese Crested is a mutation in the FOXI3 gene — an autosomal dominant mutation that also affects tooth development, which is why hairless Chinese Cresteds reliably have missing or malformed teeth. Responsible breeders never breed two hairless-to-hairless, because inheriting two copies of the hairless gene is lethal before birth. Every litter from a hairless × powderpuff or hairless × hairless breeding contains a statistical mix of hairless and fully coated puppies.",
      "🌞 Owning a hairless Chinese Crested requires a skincare routine that most dog owners never anticipate. The bare skin must be moisturized regularly to prevent dryness and cracking, protected from sun exposure with pet-safe SPF products, checked for acne (yes, dogs can get acne and Cresteds are prone to it on their skin), and bundled in cold weather. Many Crested owners keep a wardrobe of sweaters and dog coats — often the most elaborate canine wardrobes of any breed owner.",
      "🏆 The Chinese Crested is one of the longest-lived of all dog breeds — individual Cresteds regularly reach 18 years of age, and the breed's average lifespan of 13–18 years substantially exceeds that of most toy breeds. Researchers attribute this longevity partly to the breed's genetic diversity (introduced through its mixed seaport origins) and partly to the reduced cancer rates that accompany hairlessness in some research models. Whatever the cause, a Crested is a genuinely long-term companion commitment.",
    ],
    ctaH:"Traveling with Your Chinese Crested?", ctaP:"Your uniquely beautiful companion needs gentle, attentive expert care on every journey."
  },
  {
    slug:'irish-wolfhound', name:'Irish Wolfhound', rank:75, group:'Hound', origin:'Ireland',
    alsoKnown:'IWH, Cu Faoil (Irish: Hound of Ireland), Irish Hound', weight:'105–120+ lbs', height:'30–35 in',
    lifespan:'6–8 yrs', energyLabel:'Medium', e:'medium', s:'large', sLabel:'Large',
    api:'wolfhound/irish', emoji:'🏰', keywords:'irish wolfhound giant sighthound tallest dog breed',
    tagline:"The tallest dog breed in the world — Ireland's ancient wolf-hunting sighthound, a gentle giant whose brief life is given entirely to its family in a devotion as immense as its stature",
    shortDesc:"The world's tallest dog breed — Ireland's ancient wolf hunter, a gentle giant of immense stature, quiet dignity, and heartbreaking devotion despite a tragically brief 6–8 year lifespan.",
    ov1:"The Irish Wolfhound is one of the oldest breeds in recorded history — Celtic warriors prized it as a war dog and wolf hunter for at least 2,000 years, and it appears in ancient Irish legend as a gift between kings. By the 17th century, the breed had nearly hunted itself to extinction by eliminating the wolves, elk, and bears it was bred to pursue; without quarry, the original function of these enormous dogs became irrelevant. Captain George Graham of Scotland spent the 1860s–1880s reconstructing the breed from the surviving remnants, crosses with Deerhounds, Great Danes, and Borzoi producing the modern Irish Wolfhound.",
    ov2:"Irish Wolfhounds are famous for their 'gentle when stroked, fierce when provoked' temperament — they are remarkably calm, friendly, and patient indoors, spending most of their time as gentle companions who require only moderate daily exercise despite their massive size. Their short lifespan (6–8 years on average) means that every year with an Irish Wolfhound is precious, and owners often describe an intense, brief relationship of extraordinary depth and love. Few breeds generate the emotional attachment that the Irish Wolfhound reliably inspires.",
    traits:{energy:60,affection:90,kids:85,dogs:82,training:68},
    coat:"Rough, wiry, hard outer coat with bushy eyebrows and beard; double coat providing some weather resistance",
    colors:"Gray, brindle, red, black, pure white, fawn, or any combination; gray is most common",
    apt:"No — the world's tallest dog needs significant space both indoors and outdoors",
    qf:["<strong>AKC Rank:</strong> #75 most popular (2025)","<strong>Group:</strong> Hound","<strong>Origin:</strong> Ireland","<strong>Also Known As:</strong> IWH, Cu Faoil (Hound of Ireland)","<strong>Size:</strong> Giant","<strong>Good for First-Time Owners:</strong> Yes, with research — gentle but requires understanding of giant-breed health"],
    health:["Dilated cardiomyopathy (DCM) — the leading cause of death in the breed; cardiac screening by age 2 is essential","Osteosarcoma (bone cancer) — elevated risk in giant breeds; sudden limb swelling requires emergency evaluation","Bloat (GDV) — deep-chested giant at high risk; prophylactic gastropexy strongly recommended at time of spay/neuter","Bone and joint disorders — rapid growth makes puppyhood nutrition and exercise critical for long-term soundness"],
    diet:{puppy:{a:"5–8 cups",c:"2,000–3,200 kcal"},adult:{a:"6–10 cups",c:"2,400–4,000 kcal"},senior:{a:"5–8 cups",c:"2,000–3,200 kcal"}},
    nutri:["Giant-breed puppy formula prevents too-rapid bone growth — crucial in a breed growing to over 100 lbs in 18 months","Feed from floor level, not raised bowls — research suggests raised bowls may increase bloat risk in giant breeds","Split food into 2–3 meals and restrict exercise before and after eating to reduce GDV risk substantially","Cardiac support supplements (fish oil, CoQ10) are worth discussing with your vet given the breed's DCM risk"],
    pupCost:"$1,500–$3,500", foodCost:"$1,200–$2,000", vetCost:"$600–$1,200", groomCost:"$300–$600", supplCost:"$300–$500",
    costNote:"Food costs are substantial for the world's tallest dog — budget for 6–10 cups of premium kibble daily plus significantly higher veterinary costs typical of giant breeds.",
    mixes:[
      {n:"Irish Wolfhound × Great Dane Mix",d:"Two giant sighthounds combine into an enormous, gentle companion of extraordinary stature — perhaps the tallest crossbreed possible, deeply devoted and remarkably calm."},
      {n:"Irish Wolfhound × Scottish Deerhound Mix",d:"Ireland's wolf hunter meets Scotland's deer hunter — two ancient sighthounds whose combination produces a large, dignified, athletic companion with similar quiet nobility."},
      {n:"Irish Wolfhound × Greyhound Mix",d:"Ancient speed meets ancient size — a large, elegant sighthound crossbreed with the Wolfhound's gentle temperament and the Greyhound's sleek athleticism."},
      {n:"Irish Wolfhound × Standard Poodle Mix",d:"The Wolfhound's gentle giant nature meets the Poodle's intelligence — a large, potentially low-shedding crossbreed with a calm, affectionate temperament."},
    ],
    facts:[
      "📏 The Irish Wolfhound holds the record as the tallest dog breed in the world. The AKC breed standard sets a minimum height of 30 inches at the shoulder for males — most adult males stand 32–35 inches and weigh 120–180 pounds. A full-grown Irish Wolfhound standing on its hind legs can reach over 7 feet tall — taller than most adult humans. This extraordinary size was functional: only a dog of this stature could bring down a full-grown wolf or chase an Irish elk at speed.",
      "📜 Irish mythology is full of Irish Wolfhounds. The most famous is Gelert, the faithful hound of the Welsh prince Llywelyn the Great, but the most ancient Irish hero-dog is Cú Chulainn's companion — the warrior's very name means 'Hound of Culann,' given to him after he killed the great guard dog of the smith Culann and took its place. These stories reflect how deeply woven into Celtic culture the great Irish hound was for over two millennia.",
      "💔 The Irish Wolfhound has the shortest lifespan of any dog breed relative to its size — just 6–8 years on average, with many dying of cardiac disease before age seven. This brevity is both the breed's tragedy and its peculiar gift: IWH owners speak of relationships of extraordinary intensity, compressed into fewer years than most medium-sized dogs live, creating bonds that owners describe as uniquely profound. The breed's motto — 'Gentle when stroked, fierce when provoked' — applies equally to its owners' grief when the time comes.",
      "🐺 Irish Wolfhounds were so effective at hunting wolves in Ireland that they made themselves nearly redundant — by the late 1700s, they had hunted Ireland's wolf population to extinction, eliminating their primary purpose. Without wolves to hunt, and with their owners losing interest in maintaining such expensive dogs, the breed nearly disappeared entirely. The reconstruction of the 1860s–1880s was a true rescue from extinction, and every modern Irish Wolfhound descends from Captain Graham's breeding program.",
      "🏛️ The Irish Wolfhound is the national symbol of Ireland and appears on the country's heraldry, coinage, and official insignia. The Irish state mascot is an Irish Wolfhound, and the Irish Army Ranger Corps has historically used an Irish Wolfhound as its mascot and parade dog. The breed's role as a national symbol reflects its 2,000-year presence in Irish history as a gift between Celtic chieftains, a companion of kings, and a symbol of aristocratic prestige.",
    ],
    ctaH:"Traveling with Your Irish Wolfhound?", ctaP:"The world's tallest dog deserves careful, expert transport and care on every journey."
  },
  {
    slug:'bullmastiff', name:'Bullmastiff', rank:78, group:'Working', origin:'England',
    alsoKnown:"Gamekeeper's Night Dog", weight:'100–130 lbs', height:'24–27 in',
    lifespan:'7–9 yrs', energyLabel:'Medium', e:'medium', s:'large', sLabel:'Large',
    api:'mastiff/bull', emoji:'🛡️', keywords:'bullmastiff working dog gamekeeper guardian mastiff bulldog cross',
    tagline:"England's Gamekeeper's Night Dog — a powerful, loyal mastiff-terrier cross bred to silently pin poachers in the dark, combining the Mastiff's size with the Bulldog's tenacity",
    shortDesc:"England's silent guardian — bred to silently track and pin poachers in darkness, combining the Mastiff's size with the Bulldog's tenacity in a loyal, devoted family protector.",
    ov1:"The Bullmastiff was deliberately created in 19th-century England by English gamekeepers who needed a dog powerful enough to overpower adult poachers, dark-colored enough to work invisibly at night, and controllable enough not to harm those it apprehended. Gamekeepers crossed Mastiffs (for size and power) with Bulldogs (for tenacity, speed, and courage) — eventually settling on approximately 60% Mastiff and 40% Bulldog — to produce the ideal anti-poaching dog. The AKC recognized the Bullmastiff as a purebred in 1933.",
    ov2:"Today's Bullmastiff is a calm, dignified, and deeply affectionate family companion that retains its ancestors' protective instincts without their aggression. They are notably low-energy for their size — happy with moderate daily exercise — and are devoted to their families, especially children. However, they are naturally territorial and can be challenging with strangers and other large dogs, requiring early socialization and experienced, confident handling to develop into well-rounded adults.",
    traits:{energy:55,affection:85,kids:80,dogs:60,training:68},
    coat:"Short, dense, and weather-resistant; close-lying and flat; very easy to maintain",
    colors:"Fawn, red, or brindle; all with a dark muzzle and ears; small white patch on chest is acceptable",
    apt:"No — large, territorial breed needs a secure yard and is too large for most apartment living",
    qf:["<strong>AKC Rank:</strong> #78 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> England","<strong>Also Known As:</strong> Gamekeeper's Night Dog","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> Challenging — needs confident, experienced handling"],
    health:["Hip and elbow dysplasia — OFA testing essential for this large, heavy breed","Bloat (GDV) — deep-chested breed at elevated risk; feed twice daily and restrict post-meal exercise","Lymphoma and other cancers — elevated cancer rates make annual wellness screenings important","Progressive retinal atrophy and entropion — eye conditions with genetic or structural causes; annual eye exams recommended"],
    diet:{puppy:{a:"3–5 cups",c:"1,200–2,000 kcal"},adult:{a:"3.5–5 cups",c:"1,400–2,200 kcal"},senior:{a:"3–4.5 cups",c:"1,200–1,800 kcal"}},
    nutri:["Large-breed puppy formula prevents too-rapid growth in this heavy breed's developing joints and bones","Feed twice daily from floor level — raised bowls may increase bloat risk in deep-chested large breeds","Joint supplements are important from middle age; a 130-lb dog puts enormous stress on hips and elbows over time","Monitor weight carefully — an obese Bullmastiff faces dramatically increased joint, cardiac, and respiratory strain"],
    pupCost:"$1,500–$3,000", foodCost:"$900–$1,400", vetCost:"$500–$900", groomCost:"$150–$300", supplCost:"$300–$500",
    costNote:"The Bullmastiff's short coat is among the easiest of any large breed to maintain — virtually no professional grooming is needed. The major costs are food (large quantities), veterinary care, and the initial puppy purchase.",
    mixes:[
      {n:"Bullmastiff × Labrador Mix",d:"The Lab's friendliness softens the Bullmastiff's territorial nature — a large, loyal, and affectionate family dog that combines the Bullmastiff's protective presence with the Lab's warmth."},
      {n:"Bullmastiff × Boxer Mix",d:"Two bully-type British working breeds combine into a powerful, playful, and protective large dog with a clownish streak and deep family devotion."},
      {n:"Bullmastiff × Great Dane Mix",d:"Two giant breeds combine into an enormous, gentle companion — a very large crossbreed with the Bullmastiff's guarding instincts and the Great Dane's elegant, calm temperament."},
      {n:"Bullmastiff × Rottweiler Mix",d:"Power and protection amplified — a large, confident, and deeply loyal guardian crossbreed requiring experienced ownership and extensive early socialization."},
    ],
    facts:[
      "🌙 The Bullmastiff's dark brindle coloring was specifically selected by English gamekeepers because it made the dog nearly invisible at night — a crucial advantage for a dog whose job was to silently track and ambush poachers in darkness. The original dark brindle or red coloring served as natural camouflage in woodland settings, and gamekeepers preferred darker specimens precisely because they were harder to detect in low light.",
      "🎾 Rocky, the dog owned by fictional boxer Rocky Balboa in the Rocky film franchise, was a Bullmastiff — named Butkus and played by Sylvester Stallone's actual pet. The dog appeared in Rocky (1976) and Rocky II (1979) and became one of the most recognizable canine film characters of the 1970s, significantly boosting the breed's profile in America during a period when the Bullmastiff was much less well-known than today.",
      "🚫 The Bullmastiff's training philosophy was unique: gamekeepers trained them to pin without biting — to hold down a poacher using body weight alone until the gamekeeper arrived. This 'pin without bite' training made the Bullmastiff one of the few working dogs trained explicitly to not use its teeth on humans, despite having the physical capability to inflict serious harm. The approach required a dog of exceptional self-control and intelligence.",
      "💯 The Bullmastiff's composition — approximately 60% Mastiff and 40% Bulldog — was so precisely defined by gamekeepers and early breeders that the AKC breed standard reflects this ratio in the dog's physical appearance. Decades of selecting for exactly this blend produced a remarkably consistent breed in terms of temperament and structure, to the point that modern genetics confirm the Bullmastiff's ancestry aligns closely with the historical records of what was crossed.",
      "❤️ Despite their imposing size and guardian history, Bullmastiffs are remarkably devoted to their immediate family, particularly children. They are known to maintain a quiet vigil over sleeping infants in their family's home, and many Bullmastiff owners report that the family dog positions itself between the children and any unknown visitor — a behavior so instinctive and reliable that veterinary researchers have studied it as an example of guardian breed bonding behavior.",
    ],
    ctaH:"Traveling with Your Bullmastiff?", ctaP:"Your silent guardian deserves careful, expert handling and comfortable travel arrangements."
  },
  {
    slug:'anatolian-shepherd-dog', name:'Anatolian Shepherd Dog', rank:88, group:'Working', origin:'Turkey',
    alsoKnown:'Kangal Shepherd Dog, Coban Köpeği, Karabash, Turkish Shepherd', weight:'80–150 lbs', height:'27–31 in',
    lifespan:'11–13 yrs', energyLabel:'Medium', e:'medium', s:'large', sLabel:'Large',
    api:'anatolian', emoji:'🐏', keywords:'anatolian shepherd dog turkey livestock guardian kangal',
    tagline:"Turkey's ancient flock guardian — a powerful, independent livestock protection dog that has defended sheep from wolves and bears on the Anatolian plateau for thousands of years",
    shortDesc:"Turkey's ancient livestock guardian — a massive, independent, and remarkably fast working dog that bonds fiercely to its flock and treats any threat as a mortal challenge.",
    ov1:"The Anatolian Shepherd Dog has guarded livestock on the high plateaus of Turkey for at least 6,000 years, making it one of the oldest recognizable breeds in the world. Developed to work independently of human direction — shepherds in Anatolia would leave their flock with the dog for days or weeks at a time — the Anatolian evolved the self-sufficiency, territorial instinct, and physical power necessary to confront wolves, bears, and jackals alone. The breed was recognized by the AKC in 1996.",
    ov2:"In modern American use, Anatolian Shepherd Dogs are increasingly deployed as working livestock guardians on farms and ranches, particularly in areas where wolves, coyotes, or mountain lions threaten livestock. They are not companion dogs in the traditional sense — they are working dogs that happen to live with humans, and they require owners who understand the difference. For experienced working dog owners with land and livestock, the Anatolian is unparalleled; as a family pet without a job, it can become territorial, destructive, and difficult.",
    traits:{energy:58,affection:68,kids:65,dogs:55,training:52},
    coat:"Short and dense, or rough and approximately 4 inches long; double coat adapted to temperature extremes",
    colors:"Fawn, white, brindle, or pinto with a black mask and ears; variety of patterns accepted",
    apt:"No — working breed needs extensive outdoor space and ideally a livestock or guardian job",
    qf:["<strong>AKC Rank:</strong> #88 most popular (2025)","<strong>Group:</strong> Working","<strong>Origin:</strong> Anatolia, Turkey","<strong>Also Known As:</strong> Kangal Shepherd, Coban Köpeği, Turkish Shepherd","<strong>Size:</strong> Large","<strong>Good for First-Time Owners:</strong> No — highly independent working dog, not a typical family pet"],
    health:["Hip and elbow dysplasia — OFA certification essential for breeding stock of this large working breed","Entropion and ectropion — eyelid conditions requiring surgical correction; screen breeding stock","Hypothyroidism — thyroid issues documented in the breed; annual thyroid panels from middle age","Bloat (GDV) — deep-chested large breed at elevated risk; feed twice daily and restrict activity around mealtimes"],
    diet:{puppy:{a:"3–6 cups",c:"1,200–2,400 kcal"},adult:{a:"4–7 cups",c:"1,600–2,800 kcal"},senior:{a:"3.5–6 cups",c:"1,400–2,400 kcal"}},
    nutri:["Large-breed puppy formula prevents too-rapid skeletal development in this enormous breed","Working dogs guarding livestock may burn significantly more calories than sedentary pets of the same size","Joint supplements from middle age support the long-term soundness of a dog weighing up to 150 pounds","Feed twice daily and avoid exercise around mealtimes to reduce the bloat risk common in deep-chested large breeds"],
    pupCost:"$1,000–$2,500", foodCost:"$900–$1,600", vetCost:"$500–$900", groomCost:"$200–$400", supplCost:"$300–$500",
    costNote:"Food is the dominant ongoing cost for this large-to-giant working breed. The short or medium coat is low-maintenance, keeping grooming costs reasonable for a dog of this size.",
    mixes:[
      {n:"Anatolian Shepherd × Great Pyrenees Mix",d:"Two ancient livestock guardian breeds combine into an enormous, white or fawn guardian dog with extraordinary protective instincts and independent working ability on large properties."},
      {n:"Anatolian Shepherd × German Shepherd Mix",d:"Guardian independence meets working intelligence — a large, loyal, territorial crossbreed with strong protective instincts suited to experienced working dog handlers."},
      {n:"Anatolian Shepherd × Labrador Mix",d:"The Anatolian's guardian nature tempered by the Lab's sociability — a large, loyal crossbreed that may be more manageable as a family companion than the purebred Anatolian."},
      {n:"Anatolian Shepherd × Rottweiler Mix",d:"Two powerful guardian breeds combine into a very large, territorial, and deeply loyal protection dog that requires extensive early socialization and experienced ownership."},
    ],
    facts:[
      "🐺 The Anatolian Shepherd Dog is widely regarded as the most effective livestock guardian dog in the world for protecting against large predators. Studies conducted in Namibia — where the breed was introduced to protect livestock from cheetahs — showed that farms using Anatolians experienced dramatic reductions in livestock losses, and the program was credited with reducing cheetah killing by ranchers who no longer suffered losses that motivated retaliatory hunting.",
      "⚡ The Anatolian Shepherd Dog is deceptively fast for its size — despite weighing up to 150 pounds, the breed can reach speeds of 28–30 mph over short distances. This speed, combined with its massive body weight and territorial drive, makes it physically capable of confronting and driving off wolves, bears, and coyotes. Turkish shepherds have traditionally valued the combination of speed and mass as essential for a guardian that must intercept predators before they reach the flock.",
      "🌙 Like other livestock guardian breeds, the Anatolian Shepherd works primarily at night — the time when predators are most active. Anatolians are naturally nocturnal working dogs, sleeping during the day near the flock and patrolling at night. This schedule means they bark at night, a behavior that is instinctive and functional but challenging in suburban or residential settings where neighbors expect quiet after dark.",
      "🌍 The Anatolian Shepherd Dog is now deployed as a conservation tool in multiple countries where large predators threaten both livestock and local goodwill toward wildlife. Beyond Namibia's cheetah program, Anatolians have been placed with farmers in South Africa (to protect against leopards), in the American West (to reduce coyote killing of sheep), and in Central Asia (to allow coexistence with snow leopards). The breed's ancient guardian function has found new relevance in modern conservation.",
      "🏛️ The Turkish government considers the Anatolian Shepherd Dog a national cultural treasure — the breed appears on Turkish postage stamps and commemorative coins, and its preservation is a matter of national pride. Export controls on the breed from Turkey have historically been strict to prevent depletion of the domestic working dog population, though demand from working sheep operations worldwide has created a global breeding community outside Turkey.",
    ],
    ctaH:"Traveling with Your Anatolian Shepherd Dog?", ctaP:"Turkey's ancient guardian deserves careful, experienced handling and expert transport."
  },
  {
    slug:'pekingese', name:'Pekingese', rank:90, group:'Toy', origin:'China',
    alsoKnown:'Peke, Lion Dog, Peking Palasthund', weight:'Up to 14 lbs', height:'6–9 in',
    lifespan:'12–14 yrs', energyLabel:'Low', e:'low', s:'small', sLabel:'Small',
    api:'pekinese', emoji:'👸', keywords:'pekingese toy dog china imperial palace lion dog',
    tagline:"China's imperial treasure — the ancient Lion Dog of Peking's Forbidden City, so sacred that theft was once punishable by death and now a devoted, dignified companion of regal self-possession",
    shortDesc:"China's imperial Lion Dog — a dignified, regal toy breed with a flowing lion-like mane, a flat face, and centuries of palace history that gave it an attitude to match.",
    ov1:"The Pekingese is one of the oldest dog breeds in existence, developed in ancient China specifically as a companion for Chinese emperors and members of the imperial court. The breed was so sacred that it could only be owned by Chinese royalty — theft or unauthorized possession of a Pekingese was historically punishable by death. The breed arrived in the West in 1860 when British troops sacked the Imperial Summer Palace in Beijing and brought five Pekingese back to England, where Queen Victoria received one as a gift.",
    ov2:"The Pekingese is a dog of enormous personal dignity — it will not be hurried, bullied, or forced into anything it doesn't agree to. It is affectionate and devoted with its chosen people, but it reserves its warmth and tends to be wary of strangers. Their independent nature and occasional stubbornness reflect centuries of being the center of an imperial universe, and modern Peke owners report that successful ownership requires understanding that the dog may occasionally decide it is in charge.",
    traits:{energy:35,affection:85,kids:65,dogs:72,training:48},
    coat:"Long, flowing double coat with a thick undercoat and coarser outer coat; lion-like mane around neck and shoulders",
    colors:"Any color including red, fawn, black, cream, white, sable, parti-color, and brindle; black mask is typical",
    apt:"Yes — ideal apartment companion; low exercise needs and fully adapted to indoor life",
    qf:["<strong>AKC Rank:</strong> #90 most popular (2025)","<strong>Group:</strong> Toy","<strong>Origin:</strong> Peking (Beijing), China","<strong>Also Known As:</strong> Peke, Lion Dog, Peking Palasthund","<strong>Size:</strong> Small","<strong>Good for Apartments:</strong> Excellent — born for indoor palace life"],
    health:["Brachycephalic Obstructive Airway Syndrome (BOAS) — flat face causes breathing difficulty; avoid heat and strenuous exercise","Corneal ulcers and eye injuries — prominent eyes require careful monitoring; even minor trauma can be serious","Intervertebral disc disease (IVDD) — long back relative to leg length makes spine vulnerable to disc problems","Syringomyelia — a spinal condition associated with the breed's head shape; veterinary evaluation if scratching near neck or shoulder"],
    diet:{puppy:{a:"0.25–0.5 cup",c:"150–300 kcal"},adult:{a:"0.25–0.5 cup",c:"150–300 kcal"},senior:{a:"0.25 cup",c:"130–250 kcal"}},
    nutri:["Very small breed with minimal caloric needs — overfeeding is the most common Pekingese health mistake","Choose small-breed kibble sized for flat-faced breeds to reduce swallowing difficulty and choking risk","Dental care is essential — the flat face creates crowded teeth prone to disease; brush teeth several times weekly","Avoid exercise in heat; the Peke's flat face makes thermoregulation difficult and heatstroke a serious risk"],
    pupCost:"$800–$2,000", foodCost:"$250–$400", vetCost:"$400–$700", groomCost:"$500–$900", supplCost:"$150–$300",
    costNote:"Grooming is the dominant ongoing cost — the magnificent flowing coat requires daily home brushing and professional grooming every 6–8 weeks to maintain its condition and prevent matting.",
    mixes:[
      {n:"Pekingese × Poodle (Peekapoo)",d:"One of the oldest designer breeds — combining the Peke's ancient Chinese heritage with the Poodle's intelligence and low-shedding coat in a small, devoted companion."},
      {n:"Pekingese × Shih Tzu (Shinese)",d:"Two Chinese imperial toy breeds combine into a fluffy, dignified, and deeply affectionate small companion with double the ancient palace heritage."},
      {n:"Pekingese × Chihuahua (Cheeks)",d:"Two ancient companion breeds — one Chinese, one Mexican — produce a tiny, bold, and devoted crossbreed with a large personality in a very small package."},
      {n:"Pekingese × Maltese (Peke-A-Tese)",d:"Two elegant, long-coated toy breeds combine into a small, silky companion with the Peke's dignified character softened by the Maltese's playful warmth."},
    ],
    facts:[
      "👸 The Pekingese was so sacred in imperial China that it could only be legitimately owned by members of the Chinese imperial court — the emperors, empress dowagers, and highest-ranking nobles. Commoners who owned a Pekingese without permission could be executed. The dogs were kept in conditions of extraordinary luxury, tended by dedicated servants and maintained as living symbols of imperial power and divine favor.",
      "🚢 The first Pekingese in the West arrived as war trophies. When British and French troops sacked the Imperial Summer Palace during the Second Opium War in 1860, they found the dogs of the Empress Ci'an's court hiding near the body of her aunt, who had committed suicide rather than surrender. British Commodore John Hart Dunne brought five Pekingese to England and presented one to Queen Victoria, who named it 'Looty' — commemorating its origin as war loot.",
      "🦁 The Pekingese was bred to resemble a Chinese lion — the mythological guardian creature of temples and palaces — and its elaborate mane, flat face, and stocky build were deliberately cultivated to enhance this resemblance. The breed standard even specifies the desired 'lion-like' appearance, and the flowing mane around the head and shoulders was historically maintained with elaborate grooming techniques practiced by imperial palace attendants.",
      "🏅 The Pekingese is one of only two breeds known to have survived the sinking of the Titanic (along with a Pomeranian). The Peke's owner, Henry Sleeper Harper, an heir to the Harper & Brothers publishing family, carried the dog into Lifeboat 3. The survival of both dogs became a footnote in the Titanic disaster's history, and the Pekingese involved — named Sun Yat Sen — gained brief fame when the survivors reached New York.",
      "🧬 The Pekingese's extraordinary coat takes approximately three years to fully develop — puppies are born with short coats that gradually grow into the characteristic flowing mane and skirt of the adult. This slow development is unusual among dog breeds and was something Chinese breeders shaped over centuries by selecting for individuals with the most luxurious adult coats regardless of how modest the puppies appeared at birth.",
    ],
    ctaH:"Traveling with Your Pekingese?", ctaP:"China's imperial treasure deserves the most careful, regal treatment on every journey."
  },
  {
    slug:'border-terrier', name:'Border Terrier', rank:91, group:'Terrier', origin:'England / Scotland',
    alsoKnown:'BT, Coquetdale Terrier, Reedwater Terrier', weight:'11–16 lbs', height:'11–16 in',
    lifespan:'12–15 yrs', energyLabel:'High', e:'high', s:'small', sLabel:'Small',
    api:'terrier/border', emoji:'🌿', keywords:'border terrier small working terrier otter face rugged',
    tagline:"The otter-faced hunter from the Anglo-Scottish border — a hardy little working terrier tough enough to follow a horse across the moors and bold enough to bolt a fox from its earth",
    shortDesc:"The rugged, otter-faced working terrier of the Anglo-Scottish border — built to run with hounds, bolt foxes from earths, and be your most enthusiastic and affectionate little companion.",
    ov1:"The Border Terrier was developed in the Cheviot Hills along the border between England and Scotland, bred to be small enough to follow a fox into its earth but long-legged enough to keep up with a horse during the hunt. Its narrow chest — specifically described as 'able to be spanned by a man's hands' — allows it to pass through narrow rock crevices and earth passages that other terriers couldn't navigate. The breed was officially recognized by the UK Kennel Club in 1920 and by the AKC in 1930.",
    ov2:"Border Terriers are among the most versatile of all small dogs — equally content working as an earth dog, competing in agility, serving as a therapy dog, or simply being a devoted family companion. They are affectionate, good-natured, and have a lower intensity of the 'terrier attitude' than many of their relatives, making them excellent family dogs that also satisfy serious working dog enthusiasts. Their distinctive otter-shaped head, grizzled coat, and expressive eyes give them a uniquely rugged handsomeness.",
    traits:{energy:85,affection:88,kids:85,dogs:75,training:78},
    coat:"Wiry, dense, close-lying outer coat with a dense undercoat; the distinctive 'otter head' shape is characteristic",
    colors:"Grizzle and tan, blue and tan, red, or wheaten; dark ears and muzzle are typical",
    apt:"Possible with vigorous daily exercise — securely fenced yard essential as the BT will dig under or squeeze through barriers",
    qf:["<strong>AKC Rank:</strong> #91 most popular (2025)","<strong>Group:</strong> Terrier","<strong>Origin:</strong> Cheviot Hills, England/Scotland border","<strong>Also Known As:</strong> BT, Coquetdale Terrier, Reedwater Terrier","<strong>Size:</strong> Small","<strong>Good for Families:</strong> Excellent — one of the most family-friendly terrier breeds"],
    health:["Canine epileptoid cramping syndrome (CECS) — a breed-specific movement disorder; also called 'Spike's Disease'; dietary management may help","Hip dysplasia — less common than in larger breeds but worth testing in breeding stock","Heart defects — patent ductus arteriosus and other cardiac issues have been documented; cardiac screening recommended","Juvenile cataracts — genetic testing available; request clear results from reputable breeders"],
    diet:{puppy:{a:"0.5–1 cup",c:"300–550 kcal"},adult:{a:"0.5–0.75 cup",c:"300–500 kcal"},senior:{a:"0.4–0.6 cup",c:"250–400 kcal"}},
    nutri:["High-quality protein supports the Border Terrier's active lifestyle and working terrier metabolism","Avoid grain-containing foods if CECS is diagnosed — some cases respond to gluten-free diets","Dental care is important for small terriers prone to tartar buildup; dental chews and brushing help","Feed twice daily on a schedule to support energy levels in this consistently active small breed"],
    pupCost:"$1,200–$2,500", foodCost:"$350–$550", vetCost:"$400–$650", groomCost:"$250–$450", supplCost:"$150–$300",
    costNote:"The BT's wiry coat requires hand-stripping 1–2 times per year by a skilled groomer — less frequent than many wire-coated breeds, but important for maintaining proper coat texture and condition.",
    mixes:[
      {n:"Border Terrier × Jack Russell Mix",d:"Two working earthdog terriers combine into a small, explosive, fearless package of terrier energy that needs experienced owners and consistent training."},
      {n:"Border Terrier × Poodle Mix",d:"A clever, potentially low-shedding terrier cross that softens the BT's independent streak with the Poodle's trainability — an agile, affectionate small companion."},
      {n:"Border Terrier × Labrador Mix",d:"The BT's terrier spirit meets the Lab's sociability — a small-to-medium, energetic, friendly crossbreed with excellent trainability and a love of outdoor activity."},
      {n:"Border Terrier × Cairn Terrier Mix",d:"Two scruffy, rugged British working terriers combine into a small, bold, and expressive companion with double the character and half the grooming requirements of a show terrier."},
    ],
    facts:[
      "🦦 The Border Terrier's head is specifically described in the breed standard as 'otter-like' — a comparison to the broad, flat-topped skull and strong muzzle of the Eurasian otter, which the BT resembles more than any other dog breed. This head shape developed naturally from centuries of selecting for terriers with jaws strong enough to grip foxes and head shapes narrow enough to fit into fox earths — a combination that happens to produce the distinctive otter appearance.",
      "🏇 The Border Terrier was bred to keep up with horses during the hunt — a requirement shared with few other small dog breeds. While most terriers ride to the hunt in saddlebags or hunt vans, the Border Terrier was expected to run the full distance alongside the hounds and horses, then go to ground to bolt the fox at the end. This dual requirement for endurance running AND earthwork produced one of the most athletic small breeds in existence.",
      "📏 The breed standard specifies that a Border Terrier's chest must be spannable — a man with average-sized hands should be able to encircle the dog's chest behind its front legs with his hands touching fingertip to fingertip. This chest measurement test ensures the dog remains narrow enough to follow foxes and other quarry through the rock crevices and earth tunnels of the Cheviot Hills, where the breed was developed for centuries.",
      "🥕 The Border Terrier is the only terrier breed known to have developed a significant following among vegetarians and vegans — partly because of its relatively gentle demeanor for a terrier, partly because of its association with northern English working-class culture, and partly due to a strong social media presence in the UK that has made the breed disproportionately popular among urban dwellers who appreciate its rugged appearance and manageable size.",
      "🎬 Border Terriers have appeared in numerous British films and television programs, most notably as the dog breed of choice in several British period dramas and as Baxter in the UK version of The Wire and Toto-substitute characters in various British Wizard of Oz adaptations. The breed's rugged, expressive face photographs exceptionally well, making it a favorite among directors who need a dog that reads as 'authentic British working class' on screen.",
    ],
    ctaH:"Traveling with Your Border Terrier?", ctaP:"The Anglo-Scottish border's most rugged little hunter gets expert care on every adventure."
  },
  {
    slug:'basenji', name:'Basenji', rank:92, group:'Hound', origin:'Central Africa (Congo)',
    alsoKnown:"African Barkless Dog, Congo Dog, Zande Dog, Africa's Barkless Dog", weight:'22–24 lbs', height:'16–17 in',
    lifespan:'13–14 yrs', energyLabel:'High', e:'high', s:'small', sLabel:'Small',
    api:'basenji', emoji:'🎭', keywords:'basenji barkless dog africa ancient hound unique dog',
    tagline:"Africa's ancient barkless dog — a cat-like, fastidiously clean primitive hound from the Congo Basin that yodels, grooms itself, and remains one of the most genetically ancient dog breeds alive",
    shortDesc:"Africa's ancient barkless dog — a cat-like, wrinkle-browed hound from the Congo that yodels instead of barks, grooms itself obsessively, and thinks independently enough to humble experienced trainers.",
    ov1:"The Basenji is one of the most genetically ancient dog breeds in existence — DNA analysis places it among the basal dog breeds that diverged earliest from wolves, before most modern breeds developed. It originated in Central Africa, particularly in the Congo Basin, where the Azande and Mangbetu peoples used it as a hunting dog to drive game into nets and retrieve small quarry. Basenjis were so prized by Central African tribes that they were traded for a slave apiece — more valuable than most material possessions.",
    ov2:"The Basenji is famous for not barking — it produces a unique yodel or chortle instead, created by an unusually shaped larynx that produces sound differently than in most dogs. It is also fastidiously clean, grooming itself like a cat, and it is known for its cat-like independence, intelligence, and tendency to think rather than simply obey. Basenji owners describe training as an ongoing negotiation rather than a simple command-and-response relationship. They are deeply bonded to their owners but famously challenging to reliably recall off-leash.",
    traits:{energy:85,affection:75,kids:62,dogs:55,training:45},
    coat:"Short, fine, and close-lying; practically no dog odor; self-cleaning like a cat",
    colors:"Red, black, tricolor, or brindle, all with white feet, chest, and tail tip; white blaze optional",
    apt:"Possible but challenging — escape artist that can climb fences; needs a dedicated, secure space",
    qf:["<strong>AKC Rank:</strong> #92 most popular (2025)","<strong>Group:</strong> Hound","<strong>Origin:</strong> Congo Basin, Central Africa","<strong>Also Known As:</strong> African Barkless Dog, Congo Dog, Zande Dog","<strong>Size:</strong> Small","<strong>Good for First-Time Owners:</strong> No — highly independent and challenging to train reliably"],
    health:["Fanconi syndrome — a kidney disease specific to Basenjis; genetic test available and essential for breeding stock","Progressive retinal atrophy (PRA) — genetic test available; request clear results from breeder","Hip dysplasia — less common than in larger breeds but documented; OFA testing recommended","Immunoproliferative small intestinal disease — a digestive condition unique to the breed requiring dietary management"],
    diet:{puppy:{a:"0.75–1.25 cups",c:"350–600 kcal"},adult:{a:"0.75–1 cup",c:"350–550 kcal"},senior:{a:"0.6–0.85 cup",c:"280–440 kcal"}},
    nutri:["High-protein, limited-ingredient diet suits the Basenji's primitive, high-metabolism physique","Monitor for Fanconi syndrome — if diagnosed, dietary protein and phosphorus levels require careful veterinary management","Low-fat diet recommended for dogs with intestinal disease, which the Basenji is prone to","Feed twice daily rather than free-feeding to establish routine and monitor a Basenji's characteristically fussy appetite"],
    pupCost:"$1,500–$3,000", foodCost:"$350–$550", vetCost:"$450–$750", groomCost:"$100–$200", supplCost:"$200–$350",
    costNote:"The Basenji is the easiest breed in the world to keep clean — its self-grooming habit means minimal bathing, virtually no grooming costs, and no dog odor in the home under normal circumstances.",
    mixes:[
      {n:"Basenji × Whippet Mix",d:"Two ancient sighthounds — one African, one English — combine into a sleek, fast, and independent companion with refined athleticism and cat-like self-sufficiency."},
      {n:"Basenji × Corgi Mix",d:"The Basenji's ancient hound spirit meets the Corgi's herding intelligence — a small, alert, and energetic crossbreed with unusual character and a curiously expressive face."},
      {n:"Basenji × Labrador Mix",d:"The Lab's legendary friendliness tempers the Basenji's independence — a small-to-medium crossbreed that may be more manageable for first-time owners while retaining Basenji elegance."},
      {n:"Basenji × Siberian Husky Mix",d:"Two ancient breeds with independent personalities combine into a striking, athletic crossbreed that requires experienced handling and may produce its own unique range of vocalizations."},
    ],
    facts:[
      "🔇 The Basenji cannot bark — it produces a unique sound called a 'baroo' or yodel, created by an unusually flat larynx that vibrates differently from the larynx of barking dogs. The sound ranges from a cheerful yodel to an eerie howl-chortle combination, and Basenjis can produce this vocalization only on the exhale (unlike most dogs that bark on both inhale and exhale). The barkless characteristic was likely selected for by Central African hunters who needed a silent dog in the forest.",
      "🧬 DNA analysis published in 2004 placed the Basenji among the most genetically ancient dog breeds in existence — closer to the original split from wolves than most domesticated breeds. A 2017 Science study on dog domestication confirmed that Basenji-type dogs represent an early branch of dog evolution that diverged before the major expansion of dog breeds from Europe and Asia. This ancient lineage means the Basenji shares traits with wolves not found in more recently developed breeds.",
      "🌙 Basenjis are the only domestic dogs known to cycle reproductively only once per year — like wolves — rather than twice yearly like most domesticated breeds. This unusual reproductive schedule reflects the breed's primitive, ancient origins and its development in central African conditions where seasonal reproduction was advantageous. Female Basenjis typically come into heat in the autumn, producing a single litter annually, which also contributes to the breed's relative rarity compared to twice-cycling breeds.",
      "🐱 The Basenji's cat-like self-grooming behavior is so pronounced that owners frequently report that their Basenjis have no dog odor whatsoever — even dogs that spend considerable time outdoors. The breed's fine, close-lying coat releases dirt naturally, the skin produces minimal oils that cause odor in other breeds, and the Basenji actively removes debris from its coat with its tongue and paws in the manner of domestic cats. Many Basenji owners report going months between baths.",
      "🎪 The Basenji's extreme independence makes it one of the most challenging breeds in competitive obedience — Stanley Coren's famous ranking of dog intelligence by working and obedience criteria placed the Basenji near the bottom, not because it lacks intelligence (Basenjis are clever problem-solvers) but because it lacks the motivated compliance that makes obedience training straightforward. A Basenji will learn any behavior it finds personally rewarding; the challenge is finding rewards that reliably compete with the environment's distractions.",
    ],
    ctaH:"Traveling with Your Basenji?", ctaP:"Africa's most ancient and independent hound deserves calm, expert care on every journey."
  },
];

// ─── HTML template ────────────────────────────────────────────────────────────
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
          <p>A ${b.s === 'small' ? 'small' : b.s === 'large' ? 'large' : 'medium'}-sized breed with ${b.energyLabel.toLowerCase()} energy, the ${b.name} requires quality nutrition matched to its activity level and life stage.</p>
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
  const groomPct = b.groomPct || (b.coat && b.coat.includes('long') ? 75 : b.coat && b.coat.includes('wire') ? 65 : b.coat && b.coat.includes('short') ? 25 : 45);
  return `<a href="${b.slug}.html" class="breed-card" data-type="purebred" data-size="${b.s}" data-energy="${b.e}" data-kids="yes" data-name="${b.keywords}">
          <div class="breed-emoji-wrap" data-api="${b.api}"><span style="position:absolute;top:8px;left:8px;background:#0d9488;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">#${b.rank}</span><img class="breed-card-real-photo" alt="${b.name}" /><span class="breed-card-emoji-fallback">${b.emoji}</span><span class="size-badge ${b.s}">${b.sLabel}</span></div>
          <div class="breed-info">
            <h3>${b.name}</h3>
            <p>${b.shortDesc}</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:${b.traits.energy}%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:${b.traits.training}%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:${groomPct}%"></div></div></div>
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

console.log(`\nBatch 2: wrote ${breeds.length} HTML files, updated index and sitemap.`);
