// add_missing_overviews.js — node add_missing_overviews.js
// Inserts proper 2-paragraph Overview sections into the 42 breed pages
// whose Overview div was left empty by the original conversion script.

const fs   = require('fs');
const path = require('path');

const breedsDir = path.join(__dirname, 'breeds');

// Each entry: filename → [paragraph1, paragraph2]
const OVERVIEWS = {

  'akita.html': [
    `The Akita is Japan's most iconic dog breed, originating in the mountainous Akita prefecture of northern Honshu where it was developed as a versatile hunting dog capable of bringing down deer, wild boar, and even the formidable Ussuri brown bear. Officially declared a Japanese Natural Monument in 1931, the Akita is revered throughout Japan as a symbol of health, happiness, and long life — families send small Akita figurines to wish good fortune upon newborns and the sick alike.`,
    `A powerfully built large breed weighing 70–130 lbs with a lifespan of 10–13 years, the Akita comes in two recognized types: the traditional Japanese Akita Inu and the larger, more varied American Akita developed after World War II. Both types share the same core character — deeply loyal and devoted to their family, dignified and reserved with strangers, and bold enough to back down from nothing. The Akita is not a beginner's dog, but in the right hands it is an extraordinarily noble and faithful companion.`
  ],

  'alaskan-malamute.html': [
    `The Alaskan Malamute is one of the oldest Arctic sled dog breeds in the world, developed by the indigenous Mahlemut people of Alaska to haul heavy freight across vast frozen tundra. Unlike sprint sled dogs bred for speed, the Malamute was purpose-built for strength and endurance — pulling massive loads over hundreds of miles through some of the harshest terrain on earth. The breed played a critical role in polar expeditions and both World Wars.`,
    `A large, powerfully muscled breed weighing 75–100 lbs with a thick double coat built for Arctic conditions, the Malamute is an affectionate, pack-oriented dog that bonds strongly with its family. They are high-energy, highly vocal — they howl rather than bark — and possess a strong independent streak rooted in their working heritage. Malamutes thrive with active owners who can provide daily vigorous exercise, firm leadership, and plenty of companionship.`
  ],

  'australian-terrier.html': [
    `The Australian Terrier holds the distinction of being one of the first native breeds developed and recognized in Australia. Created in the early 1800s from a mix of British terrier stock brought by settlers — including ancestors of the Cairn, Skye, Dandie Dinmont, and Yorkshire Terriers — the Aussie was bred to hunt snakes and rodents in the harsh Australian outback and to serve as a loyal, watchful companion on remote homesteads.`,
    `One of the smallest working terriers at just 14–16 lbs, the Australian Terrier is nonetheless full of confidence, energy, and personality. They sport a rough, weather-resistant double coat in sandy, red, or blue-and-tan colors, and are notably more biddable and family-friendly than many other terrier breeds. Despite their small stature, they are brave, loyal, and surprisingly adaptable — equally at home on a rural property or in a city apartment with sufficient daily exercise.`
  ],

  'barbet.html': [
    `The Barbet is an ancient French water spaniel with roots stretching back to the 16th century, where it was prized by French nobility and royalty as both a waterfowl retriever and devoted companion. The breed's name derives from the French word <em>barbe</em> meaning beard, a reference to its distinctive facial furnishings. Despite its long history, the Barbet came close to extinction during the World Wars and remains relatively rare outside of Europe today.`,
    `A medium-sized breed weighing 35–65 lbs, the Barbet is beloved for its dense, curly, hypoallergenic coat that sheds minimally and comes in solid black, brown, fawn, gray, or white. Beyond looks, the Barbet is a joyful, athletic, and highly social dog that thrives in active family environments. They are intelligent, eager to please, and excel at dog sports including agility, dock diving, and of course, waterfowl retrieving.`
  ],

  'bearded-collie.html': [
    `The Bearded Collie — known affectionately as the "Beardie" — is one of Scotland's oldest herding breeds, developed centuries ago to work independently on the rugged Scottish Highlands driving cattle and sheep long distances to market. The breed's shaggy double coat provided protection against the harsh Highland weather, while its boundless energy and keen intelligence made it invaluable for controlling livestock over rough, open terrain.`,
    `A medium-to-large breed weighing 45–55 lbs, the Bearded Collie is famous for its exuberant, bouncy personality — often described as "boisterous" and "animated" even in adulthood. Their long, flat double coat requires consistent grooming to prevent matting, but their warm, playful, and deeply affectionate nature makes the effort worthwhile. Beardies are active dogs that need substantial daily exercise and mental stimulation, and they shine in dog sports, obedience, and as energetic family companions.`
  ],

  'bedlington-terrier.html': [
    `The Bedlington Terrier is one of the most visually distinctive breeds in the dog world, with its pear-shaped head, arched back, and lamb-like curly coat giving it an appearance unlike any other. Despite looking like a plush toy, the Bedlington has serious working roots: it was developed in the Bedlington mining district of Northumberland, England, in the early 1800s to hunt rats, rabbits, and even badgers in the collieries and on the surrounding moors.`,
    `Weighing just 17–23 lbs, the Bedlington is a lithe, muscular terrier that was once called the "Gypsy dog" for its versatility as a poacher's companion. Beneath that gentle appearance lies a true terrier spirit — fast enough to outrun a Whippet over short distances, courageous enough to face a badger underground. Modern Bedlingtons retain that spark but channel it into playful, affectionate companionship, making them excellent family dogs with a low-shedding, hypoallergenic coat as a bonus.`
  ],

  'belgian-laekenois.html': [
    `The Belgian Laekenois (pronounced "Lak-in-wah") is the rarest and oldest of the four Belgian shepherd varieties, distinguished by its harsh, tousled, fawn-and-black wire coat. The breed takes its name from the royal castle of Laeken near Brussels, where Queen Marie Henriette — a passionate dog enthusiast — kept a kennel of Laekenois in the late 19th century. The breed was historically used to guard flax fields in the Antwerp region and served both Belgium and France during World War I and II as messenger and Red Cross dogs.`,
    `A medium-to-large working breed weighing 55–65 lbs, the Belgian Laekenois shares the same versatile, highly intelligent character as its Belgian shepherd siblings — the Malinois, Groenendael, and Tervuren. Laekenois are intensely loyal, highly energetic, and thrive when given a job to do. They excel in protection sports, herding trials, obedience, and detection work. Their rough, low-maintenance coat sets them apart visually, but their drive and intelligence are what truly define the breed.`
  ],

  'bloodhound.html': [
    `The Bloodhound possesses the most powerful nose of any dog breed on earth — capable of following a scent trail that is several days old over distances exceeding 130 miles. Developed from the St. Hubert Hound of medieval Belgium and perfected by monks at the St. Hubert Monastery, the Bloodhound was the preferred tracking dog of European royalty for centuries. In the United States, Bloodhound evidence is legally admissible in court — a unique distinction that speaks to the breed's unmatched reliability as a tracking animal.`,
    `A large, substantial breed weighing 80–110 lbs with a lifespan of 10–12 years, the Bloodhound is instantly recognizable by its loose, wrinkled skin, long pendulous ears — which help funnel scent toward the nose — and deeply mournful expression. Despite their formidable working ability, Bloodhounds are gentle, patient, and affectionate with family. They are famously stubborn on the trail and require a securely fenced yard and a patient owner who appreciates their slow, methodical pace and thunderous baying.`
  ],

  'bull-terrier.html': [
    `The Bull Terrier was created in 19th-century England by James Hinks, who crossed the now-extinct White English Terrier with Bulldogs and later refined the breed to produce a dog of unique beauty and character. The result was a breed with a one-of-a-kind egg-shaped head, deep-set triangular eyes, and a muscular, well-balanced body. Originally bred for pit fighting and ratting, the Bull Terrier evolved into a companion dog known for its clownish, mischievous personality and fierce devotion to its family.`,
    `Weighing 50–70 lbs with a short, easy-care coat, the Bull Terrier is a study in contradictions — simultaneously tough and tender, fearless and goofy, independent and people-obsessed. They are intensely playful, pack a remarkable amount of energy into a compact frame, and form deep, lasting bonds with their human family. Bull Terriers thrive with owners who can match their enthusiasm, provide consistent training, and laugh along with their antics — because life with a Bull Terrier is never dull.`
  ],

  'cairn-terrier.html': [
    `The Cairn Terrier is one of Scotland's oldest working terrier breeds, developed in the Scottish Highlands and the Isle of Skye to bolt foxes, otters, and other vermin from the rocky cairns (stone piles) that dot the Scottish landscape. These small but fearless dogs worked independently in rugged terrain, and their determination, digging ability, and sharp instincts made them invaluable on Highland farms. The breed achieved worldwide fame as Toto in the 1939 film <em>The Wizard of Oz</em>.`,
    `One of the smallest working terriers at just 13–14 lbs, the Cairn is a hardy, weather-resistant dog with a shaggy outer coat and dense undercoat available in cream, wheaten, red, sandy, grey, or brindle. They are alert, curious, and full of personality — confident enough to take on creatures many times their size, yet warm and playful with family. Cairns are among the more adaptable and trainable of the terrier group, though they retain a healthy independent streak and the terrier's inborn love of digging.`
  ],

  'chesapeake-bay-retriever.html': [
    `The Chesapeake Bay Retriever is America's own retriever, developed entirely on U.S. soil to work the icy, rough waters of Maryland's Chesapeake Bay. The breed traces its lineage to two Newfoundland puppies rescued from a shipwreck off the Maryland coast in 1807, which were bred with local retrievers and hounds to produce a dog capable of diving into frigid, choppy water to retrieve hundreds of ducks per day. The "Chessie" is widely regarded as the toughest and most tenacious of all retriever breeds.`,
    `A large, powerful breed weighing 55–80 lbs, the Chesapeake Bay Retriever has a unique oily, wavy double coat that repels water and provides remarkable insulation in cold conditions. Unlike the famously social Golden or Labrador, the Chessie is more reserved, independent, and devoted primarily to its own family — a working dog through and through. They require an experienced owner who appreciates their strong will and provides consistent training and substantial daily exercise to channel their considerable drive.`
  ],

  'cocker-spaniel.html': [
    `The American Cocker Spaniel was the most popular dog breed in the United States for an extraordinary 23 consecutive years from 1936 to 1952 and again from 1983 to 1990, a record that reflects its enduring appeal as a gentle, beautiful, and versatile companion. Descended from English Cocker Spaniels brought to America in the 1800s, the breed was developed into a slightly smaller, more refined type specifically suited to hunting American woodcock in thick cover — giving it the "cocker" name.`,
    `A medium-small breed weighing 20–30 lbs, the Cocker Spaniel is renowned for its luxurious silky coat that flows in elegant waves, its long feathered ears, and its expressive, dark, soulful eyes. They are among the most affectionate and gentle of sporting breeds — equally happy flushing birds in the field or curled on a lap at home. Regular professional grooming is essential to maintain the coat, but the Cocker's merry, sensitive, and loving disposition makes them one of the most rewarding breeds for devoted owners.`
  ],

  'danish-swedish-farmdog.html': [
    `The Danish-Swedish Farmdog is one of Scandinavia's oldest working breeds, developed over centuries on Danish and southern Swedish farms as a versatile, all-purpose working dog. Known in its home region as <em>Dansk-Svensk Gårdhund</em>, it served as a hunter, ratter, herder, and watchdog — performing multiple jobs on small family farms with equal competence. Despite being practically unknown outside Scandinavia until the 1980s, the breed has a well-documented history stretching back to the 1700s.`,
    `A compact, lightly built breed weighing just 15–25 lbs, the Danish-Swedish Farmdog has a short, smooth coat in white with patches of black, brown, or tan — always predominantly white. They are alert, highly trainable, and possess remarkable intelligence and adaptability. Modern Farmdog owners prize the breed for combining a compact, easy-care frame with the heart and work ethic of a much larger working dog — making them exceptional at dog sports, nose work, agility, and as active family companions.`
  ],

  'finnish-lapphund.html': [
    `The Finnish Lapphund is an ancient herding breed from Lapland — the region spanning northern Finland, Sweden, and Norway — where the indigenous Sámi people used it for centuries to herd and manage reindeer. Descended from spitz-type dogs that traveled with Sámi nomads across the Arctic tundra, the Finnish Lapphund developed remarkable stamina, cold tolerance, and a calm, biddable temperament suited to working closely with reindeer herds over vast distances.`,
    `A medium-sized breed weighing 33–53 lbs, the Finnish Lapphund has a profuse double coat that provides exceptional insulation against Arctic cold and comes in virtually any color with a markedly different shade on the undercoat. They are renowned for their gentle, friendly, and deeply people-oriented nature — the Lapphund is one of the more social and trainable of the Nordic breeds. They make outstanding family dogs, adapting equally well to active outdoor lifestyles and quieter suburban homes, and are known for their characteristic "startle-and-recover" instinct developed to avoid reindeer hooves.`
  ],

  'german-pinscher.html': [
    `The German Pinscher is a sleek, powerful medium-sized working dog that serves as the root stock from which both the Doberman Pinscher and the Miniature Pinscher were developed. One of Germany's oldest breeds, the German Pinscher was traditionally employed as a rat catcher, guard dog, and stable guardian in 19th-century Germany. The breed nearly went extinct after World War II but was saved through the dedication of German breeder Werner Jung, who used a handful of survivors to rebuild the population.`,
    `Weighing 25–45 lbs with a short, dense, gleaming coat in fawn, red, black-and-tan, or blue-and-tan, the German Pinscher combines the elegance of a show dog with the tenacity of a working terrier. They are highly intelligent, assertive, and energetic — requiring consistent training, plenty of exercise, and a confident owner who can match their drive. German Pinschers bond intensely with their families, make excellent alert watchdogs, and excel in obedience, agility, and protection sports.`
  ],

  'greyhound.html': [
    `The Greyhound is the world's fastest dog breed, capable of reaching speeds of 45 mph — faster than a thoroughbred racehorse over short distances. One of the oldest purebred dogs in existence, the Greyhound appears in Egyptian tomb carvings dating to 2900 BC and is the only breed mentioned by name in the Bible. For thousands of years, Greyhounds were so prized that only nobility were permitted to own them, and killing one was once considered a capital offense in parts of medieval England.`,
    `Despite their athletic build, Greyhounds are famously calm and gentle in the home — earning the nickname "40-mph couch potato." They are sight hounds with exceptional vision and explosive speed, built for short sprints rather than sustained exercise. A large breed weighing 60–70 lbs with a lean, aerodynamic frame and an extremely short, low-maintenance coat, Greyhounds are affectionate, sensitive, and quiet dogs that make surprisingly excellent apartment companions — provided they get daily opportunities to stretch their legs in a safely enclosed area.`
  ],

  'irish-red-and-white-setter.html': [
    `The Irish Red and White Setter is the original setter of Ireland, predating the solid mahogany Irish Setter by at least a century. Developed in the 17th century as a bird dog for setting game — crouching low to indicate birds for hunters using nets — the Red and White was once more common than its solid-colored cousin and nearly vanished in the late 1800s as the fashionable all-red Irish Setter rose to prominence. Dedicated Irish breeders revived the breed in the early 20th century.`,
    `A medium-to-large sporting breed weighing 42–60 lbs, the Irish Red and White Setter is easily distinguished by its predominantly white coat with solid red patches, providing excellent visibility in the field. In character, they share the friendly, energetic, and affectionate nature of the Irish Setter but are generally considered slightly more focused in the field and calmer in the home. They are athletic dogs that excel at hunting, agility, and obedience — and make warm, playful family companions for active households.`
  ],

  'irish-setter.html': [
    `The Irish Setter is one of the most recognizable dog breeds in the world, instantly identified by its stunning mahogany or chestnut-red silky coat and its rollicking, high-spirited personality. Developed in 18th-century Ireland as a bird dog for the field — originally called the Irish Red Spaniel — the breed was refined over centuries into the elegant, all-red sporting dog we know today. Irish Setters were among the earliest dogs registered by the American Kennel Club and became one of America's most popular breeds throughout the 20th century.`,
    `A large, graceful sporting breed weighing 60–70 lbs, the Irish Setter combines athletic performance with showstopping beauty. They are famously enthusiastic and fun-loving — sometimes described as "perpetually happy" and among the most joyful of all dog breeds. Irish Setters have high energy requirements and need substantial daily exercise to stay balanced; a bored Setter can be a destructive force in the home. But with adequate activity and loving companionship, they are affectionate, playful, and deeply devoted family dogs.`
  ],

  'irish-terrier.html': [
    `The Irish Terrier is one of the oldest terrier breeds and Ireland's most celebrated native dog, with a history believed to stretch back over 2,000 years. Known in Ireland as the "Daredevil" for its legendary courage, the Irish Terrier served as a messenger and sentinel dog in World War I, earning a reputation for bravery that made it one of the few breeds to be specifically praised by name in official military accounts. The breed was also a favorite of poets and writers including Rudyard Kipling.`,
    `A medium-sized terrier weighing 25–27 lbs, the Irish Terrier is instantly recognizable by its fiery red-wheaten wiry double coat and its long, flat-skulled head — resembling a miniature Irish Wolfhound in outline. Irish Terriers are bold, energetic, and intensely loyal — described by admirers as "recklessly courageous" — with a strong terrier instinct to chase small animals and confront anything that threatens their family. They are affectionate and playful with those they love, but require confident handling and consistent training to manage their independent spirit.`
  ],

  'kerry-blue-terrier.html': [
    `The Kerry Blue Terrier is Ireland's national dog and one of the most versatile working breeds ever produced on the Emerald Isle. Originating in County Kerry in southwest Ireland, the breed was used by Irish peasants — for whom ownership of hunting dogs was legally restricted to the gentry — as a secret all-purpose working dog capable of herding cattle and sheep, hunting game, retrieving from water, and guarding the homestead. The Kerry Blue became a symbol of Irish nationalism in the early 20th century.`,
    `One of the Kerry Blue's most distinctive traits is its remarkable coat transformation: all Kerry Blue puppies are born black, and the coat gradually transitions to its characteristic blue-gray color between 18 months and 3 years of age. A medium-sized breed weighing 33–40 lbs, the Kerry has a dense, wavy, soft single coat that sheds minimally but requires regular trimming. In character, Kerry Blues are spirited, intelligent, and deeply loyal — more versatile and trainable than many terriers, but still possessing the breed's hallmark boldness and determination.`
  ],

  'komondor.html': [
    `The Komondor is Hungary's ancient livestock guardian dog, developed by the Cumans — a nomadic people who settled the Hungarian plain in the 13th century — to guard large flocks of sheep on the open puszta. The breed's extraordinary corded white coat — which can grow to floor length in adults and weigh up to 15 lbs on its own — is not merely decorative: it evolved as armor against wolf bites and insulation against extreme weather. The Komondor has been the guardian of Hungarian flocks for centuries, working independently and making its own decisions without human guidance.`,
    `One of the world's largest dog breeds, the Komondor typically weighs 80–100 lbs or more, with females consistently large and males even larger. Despite their imposing appearance, Komondors are affectionate and devoted with their family — treating children with the same patient protectiveness they show toward their livestock charges. They are inherently suspicious of strangers, intensely territorial, and not suited to dog parks or casual socialization. The Komondor demands an experienced owner who respects the breed's independent nature and invests significant time in proper socialization from puppyhood.`
  ],

  'lakeland-terrier.html': [
    `The Lakeland Terrier was developed in the Lake District of northern England — the same rugged, rocky terrain that inspired Wordsworth and Coleridge — specifically to hunt foxes that preyed on sheep flocks during lambing season. Unlike most terrier hunts conducted on horseback, Lakeland hunts were conducted on foot through the treacherous fells, requiring a dog athletic enough to keep pace with huntsmen over rocky mountains and bold enough to pursue foxes deep into rocky earths. The breed was officially recognized in 1921.`,
    `A small but remarkably sturdy and well-balanced terrier weighing just 15–17 lbs, the Lakeland Terrier has a hard, dense outer coat and soft undercoat in a wide range of colors including blue, black, liver, red, and wheaten — often with tan markings. Lakelands are confident, cheerful, and somewhat self-important — carrying themselves with the bearing of a much larger dog. They are friendly and adaptable compared to many terrier breeds, making them excellent town or country companions, though their terrier instincts for digging and chasing small animals remain firmly intact.`
  ],

  'lhasa-apso.html': [
    `The Lhasa Apso is one of the world's most ancient breeds, developed over a thousand years ago in the sacred city of Lhasa, Tibet, where it served as an interior sentinel in Buddhist monasteries and the palaces of Tibetan nobility. Tibetans believe that when a holy man dies, his soul may enter the body of a Lhasa Apso before reincarnation — giving the breed an almost sacred status. Lhasas were never sold and only given as gifts to honored individuals; the Dalai Lama first presented Lhasas to American visitors in the 1930s.`,
    `Despite its small size — typically 12–18 lbs — the Lhasa Apso is a confident, independent, and surprisingly assertive dog with the temperament of a much larger animal. Their luxurious floor-length double coat, which parts along the spine, provided insulation against Tibet's extreme temperatures and requires substantial regular grooming. Lhasas are loyal and affectionate with their inner circle but naturally wary of strangers, reflecting their centuries of work as alert sentinels. They are long-lived dogs — regularly reaching 14–16 years — and make devoted companions for patient, experienced owners.`
  ],

  'mastiff.html': [
    `The Mastiff — known in full as the Old English Mastiff — is one of the heaviest dog breeds on earth, with males routinely exceeding 160 lbs and exceptional individuals reaching over 200 lbs. One of the most ancient breeds in existence, Mastiff-type dogs appear in ancient Babylonian art from 2500 BC, in Caesar's account of his British campaigns in 55 BC, and throughout medieval European history as war dogs, bear-baiting dogs, and estate guardians. The modern English Mastiff was nearly extinguished by both World Wars and was rebuilt partly from American breeding stock.`,
    `Despite their extraordinary size and formidable presence, Mastiffs are famously gentle, patient, and affectionate with their family — earning the well-deserved title of "gentle giant." They are calm, dignified dogs with a naturally protective instinct that expresses itself through watchful alertness rather than aggression. Mastiffs have modest exercise needs relative to their size, but require substantial living space and an owner prepared for the realities of caring for a very large breed: significant food costs, veterinary expenses, and a lifespan of only 6–10 years.`
  ],

  'miniature-pinscher.html': [
    `The Miniature Pinscher — known in Germany as the <em>Zwergpinscher</em> (Dwarf Pinscher) — is not, as is commonly believed, a miniaturized Doberman Pinscher. In fact, the Min Pin predates the Doberman by centuries, developed in Germany from a mix of Italian Greyhound, Dachshund, and the now-extinct German Pinscher to create a spirited, fearless rat catcher for homes and stables. The breed is known in dog circles as the "King of Toys" — a title it has thoroughly earned through sheer force of personality.`,
    `A small but remarkably athletic breed weighing just 8–10 lbs, the Miniature Pinscher moves with a distinctive high-stepping hackney gait and carries itself with an air of total self-confidence. Their short, smooth coat requires minimal grooming, and they come in red, chocolate-and-rust, and black-and-rust. Min Pins are intensely curious, fearless, and energetic — possessing energy and boldness that far exceeds their diminutive frame. They are devoted to their family but require consistent training from puppyhood to manage their independent, sometimes stubborn nature.`
  ],

  'norfolk-terrier.html': [
    `The Norfolk Terrier is Britain's smallest working terrier, sharing its history with the Norwich Terrier until the two were officially separated into distinct breeds in 1964 — the Norfolk with its characteristic folded-over drop ears, the Norwich with its pricked ears. Both breeds trace their roots to Cambridge University in the late 1800s, where a small red terrier became fashionable among undergraduates, and were later developed into working terriers used to bolt foxes from their earths on East Anglian hunts.`,
    `Weighing just 11–12 lbs, the Norfolk Terrier packs enormous personality into a tiny package. Their hard, wiry, weather-resistant coat comes in red, wheaten, black-and-tan, or grizzle. Unlike many terrier breeds, Norfolk Terriers are notably sociable and enjoy the company of other dogs — they are often described as the most companionable of the small terriers. They are alert, energetic, and game for adventure, but also adaptable enough to thrive in city apartments given adequate daily exercise and mental engagement.`
  ],

  'old-english-sheepdog.html': [
    `The Old English Sheepdog — affectionately known as the "Bobtail" for the docked tail that was once its trademark — is one of Britain's most recognizable herding breeds, developed in the early 19th century in western England to drive cattle and sheep to market. Despite its name, the breed is not particularly ancient; its exact origins remain uncertain, though herding dogs from Russia, Eastern Europe, and Scotland are believed to have contributed to its development. Working OES dogs had their tails docked as a tax exemption marker indicating working animals.`,
    `A large, athletic breed weighing 60–100 lbs, the Old English Sheepdog is famous for its profuse double coat — which grows to cover the face entirely — and its rolling, bear-like gait. Beneath all that fur is a strong, agile herding dog with remarkable intelligence and a wonderfully goofy, playful personality. OES are affectionate, adaptable, and excellent with children, but their coat demands significant regular grooming commitment. Without consistent brushing, the dense double coat mats badly; many owners opt for a shorter "puppy cut" to manage the maintenance.`
  ],

  'parson-russell-terrier.html': [
    `The Parson Russell Terrier takes its name from the Reverend John Russell — a 19th-century Devon parson and passionate fox hunting enthusiast — who developed this small, working terrier specifically to follow hounds on horseback and bolt foxes from their underground earths. Unlike the shorter-legged Jack Russell Terrier, the Parson was bred with a longer leg to allow it to keep pace with the hunt on horseback. The AKC formally recognized the Parson Russell Terrier as a distinct breed from the Jack Russell in 2003.`,
    `A small but supremely athletic breed weighing 13–17 lbs, the Parson Russell Terrier has a compact, balanced body built for stamina and agility. Their coat can be smooth or broken (rough), always dense, weather-resistant, and predominantly white with tan, black, or lemon markings — the white coat makes them visible to hunters in the field. Parson Russells are bold, energetic, and highly intelligent — bred to work independently underground where human direction is impossible — and require an owner who can match their enthusiasm, provide intensive daily exercise, and maintain consistent training.`
  ],

  'polish-lowland-sheepdog.html': [
    `The Polish Lowland Sheepdog — known in Poland as the <em>Polski Owczarek Nizinny</em>, or PON — is an ancient herding breed that has been working the lowland plains of Poland for centuries. The breed played a significant role in the development of several European herding breeds, most notably the Bearded Collie, when Polish merchants traded PONs for Scottish sheep in the 16th century. The breed nearly disappeared after World War II but was revived through the dedicated efforts of Polish veterinarian Dr. Danuta Hryniewicz using just a handful of surviving dogs.`,
    `A medium-sized breed weighing 30–50 lbs, the Polish Lowland Sheepdog has a shaggy, long double coat that falls over the face giving it an endearing peek-a-boo expression. PONs are remarkably intelligent and possess an exceptional memory — they are said to remember commands and training from years past without refresher sessions. They are energetic, confident, and somewhat independent, with a strong herding instinct that may express itself by trying to herd children and other pets. PONs are loyal, adaptable, and deeply bonded to their family, thriving with active owners who engage their busy minds.`
  ],

  'rhodesian-ridgeback.html': [
    `The Rhodesian Ridgeback is southern Africa's only indigenous breed and the only AKC-recognized dog with a distinctive reversed ridge of hair along its spine — a characteristic inherited from the semi-domesticated Khoikhoi dogs of the Cape of Good Hope. Developed by Boer farmers in what is now Zimbabwe (formerly Rhodesia), the breed was used to track lions and hold them at bay until hunters arrived — earning it the legendary title of "Lion Dog." The Ridgeback excelled at keeping lions occupied through speed, agility, and fearless courage without engaging them directly.`,
    `A large, athletic breed weighing 70–85 lbs, the Rhodesian Ridgeback is a supremely capable hunting and athletic dog with a short, dense, easy-care coat in wheaten to red wheaten. In the home, they are dignified, loyal, and deeply devoted to their family — affectionate with children and intensely protective of those they love. Ridgebacks are independent thinkers who require patient, consistent training from an experienced owner. They need substantial daily exercise to channel their considerable energy and athletic ability.`
  ],

  'russian-toy.html': [
    `The Russian Toy is a tiny, elegant breed developed in Russia from English Toy Terriers imported to the Russian Imperial court in the 18th and 19th centuries. The breed became enormously fashionable among Russian aristocracy before the Revolution, then nearly vanished under Soviet rule as keeping small decorative dogs was considered bourgeois. Russian breeders revived the breed in isolation throughout the 20th century, and when the Iron Curtain fell, the Russian Toy was introduced to the wider world — receiving AKC recognition in 2022.`,
    `The smallest breed recognized by the AKC, the Russian Toy weighs just 3–6.5 lbs and comes in two coat varieties: smooth and long-coated (with distinctive feathering on the ears and tail). Both varieties are elegant, lively, and surprisingly athletic for their tiny size. Russian Toys are devoted, affectionate, and bond intensely with their owner — forming a one-person attachment that rivals any larger breed. Despite their delicate appearance, they are alert, confident, and surprisingly fearless, with the bright-eyed curiosity of a much larger terrier.`
  ],

  'saint-bernard.html': [
    `The Saint Bernard is one of history's most celebrated rescue dogs, renowned for its centuries of service at the Great Saint Bernard Hospice — a mountain pass refuge at 8,100 feet between Switzerland and Italy that has been operated by Augustinian monks since the 11th century. The monks developed the breed from large Molosser-type dogs to assist in finding and rescuing travelers buried by avalanches in the treacherous Alpine pass. A single Saint Bernard named Barry is credited with saving more than 40 lives between 1800 and 1812, and he remains one of the most celebrated dogs in history.`,
    `One of the world's largest breeds, the Saint Bernard typically weighs 120–180 lbs and stands 26–30 inches at the shoulder. They come in both rough (long) and smooth coat varieties, in combinations of red and white or mahogany and white. Despite their imposing size, Saint Bernards are gentle, patient, and deeply affectionate — particularly renowned for their calm, nurturing temperament with children. Their massive size means they are best suited to spacious homes with experienced owners prepared for the realities of giant-breed ownership, including a shorter-than-average lifespan of 8–10 years.`
  ],

  'saluki.html': [
    `The Saluki lays claim to being the world's oldest purebred dog, with depictions of Saluki-like dogs appearing in ancient Sumerian art dating to approximately 7,000 BC and confirmed archaeological evidence from ancient Egypt. Revered by Arabic peoples as "El Hor" — the noble one — the Saluki was the only dog permitted to share the tents and sleeping quarters of desert nomads. Considered a gift from Allah, Salukis could not be sold, only given as precious gifts, and were used to course gazelle, hare, and fox alongside trained falcons across the Arabian desert.`,
    `A tall, slender sight hound weighing 35–65 lbs, the Saluki combines extraordinary speed and endurance with a gentle, almost catlike temperament in the home. Their silky coat comes in smooth or feathered varieties in a wide range of colors including white, cream, fawn, red, grizzle, black-and-tan, and tricolor. Salukis are devoted to their family yet independent by nature — they are not demonstratively affectionate but form quiet, deep bonds. They need regular opportunities to run at full speed in a safely enclosed area, as their sight-hound instinct makes them unreliable off-leash in open spaces.`
  ],

  'samoyed.html': [
    `The Samoyed is one of the world's oldest and most beloved spitz breeds, developed by the nomadic Samoyede people of Siberia over thousands of years to herd reindeer, haul sleds, and sleep pressed against their human companions for warmth on the frozen tundra. The breed's distinctive "Sammy smile" — the permanently upturned corners of the mouth — is not just cosmetically pleasing; it serves a practical purpose, preventing the formation of icicles from drool in Arctic temperatures. Samoyeds were among the dogs that accompanied early polar expeditions to the Antarctic.`,
    `A medium-to-large breed weighing 35–65 lbs, the Samoyed is immediately recognizable by its stunning white or cream double coat — one of the most beautiful in the dog world. The coat is dense enough to provide insulation at temperatures as low as -60°F and sheds heavily twice a year. Beyond their striking appearance, Samoyeds are famously friendly, gentle, and deeply social — they cannot tolerate isolation and thrive when they are an integral part of family life. They are vocal, playful, and maintain a puppy-like exuberance well into adulthood.`
  ],

  'scottish-deerhound.html': [
    `The Scottish Deerhound is a breed of ancient lineage, developed in medieval Scotland to course red deer on the open highland moors. So prized was the Deerhound by Scottish nobles that no one below the rank of Earl was permitted to own one, and a Deerhound could save a condemned man from execution — a reflection of the breed's extraordinary value to the aristocracy. Sir Walter Scott, who owned several Deerhounds, called the breed "the most perfect creature of Heaven," and the breed appears throughout Scottish Highland literature and art.`,
    `A very large, rough-coated sight hound weighing 75–110 lbs, the Scottish Deerhound closely resembles a rough-coated Greyhound, sharing the same aerodynamic frame and effortless ground-covering stride. Their coat is harsh and crisp — ideal for Scotland's wet, cold climate — and comes in blue-gray, dark gray, gray-brindle, yellow, sandy-red, or red-fawn. Despite their imposing size, Deerhounds are famously gentle, dignified, and quiet in the home — calm couch companions who transform into breathtaking athletes in the field. They require regular opportunities to gallop in a safely enclosed space.`
  ],

  'scottish-terrier.html': [
    `The Scottish Terrier — universally known as the "Scottie" — is one of the most recognizable dogs in the world, its bold silhouette a symbol of Scotland and Scottish character. One of several terrier breeds native to the Scottish Highlands, the Scottie was developed to hunt fox, badger, and other vermin in rocky, unforgiving terrain. The breed achieved worldwide fame as the pet of President Franklin D. Roosevelt, whose Scottie "Fala" became so beloved he was included in FDR's memorial in Washington D.C. — the only presidential pet so honored.`,
    `A small but remarkably sturdy terrier weighing 18–22 lbs, the Scottish Terrier has a distinctive long head, short legs, and a hard, wiry double coat in black, wheaten, or brindle. Scotties are famously independent, confident, and dignified — described by admirers as "big dogs in a small package" and by the AKC as "feisty and fearless." They are loyal and devoted to their immediate family but aloof with strangers, making them excellent watchdogs. The Scottish Terrier requires a patient, experienced owner who appreciates its strong-willed nature and matches it with consistent, positive training.`
  ],

  'soft-coated-wheaten-terrier.html': [
    `The Soft-Coated Wheaten Terrier is Ireland's all-purpose farm dog — a breed that for centuries worked alongside Irish peasant farmers performing virtually every canine job imaginable: hunting small game, controlling vermin, herding livestock, and guarding the homestead. Unlike the more aristocratic terrier breeds developed for sport hunting by the landed gentry, the Wheaten was the working man's dog, bred for versatility and practicality. The breed was officially recognized in Ireland in 1937 after centuries of unrecorded development.`,
    `A medium-sized terrier weighing 30–45 lbs, the Soft-Coated Wheaten is instantly recognizable by its silky, flowing coat in warm wheaten gold — so different from the coarse double coat of most terrier breeds. Puppies are born darker and the characteristic wheaten color develops between 18–24 months. The Wheaten is more sociable and people-oriented than many terriers, often described as bridging the gap between terrier independence and spaniel affection. They are energetic, playful, and joyful dogs that maintain a puppylike enthusiasm throughout their lives — requiring substantial daily exercise and consistent grooming.`
  ],

  'spanish-water-dog.html': [
    `The Spanish Water Dog — <em>Perro de Agua Español</em> — is an ancient working breed from the Iberian Peninsula with roots stretching back at least a thousand years. A true multi-purpose dog, the Spanish Water Dog has historically served as sheepherder, cattle herder, retrieving waterfowl, and assistant to fishermen — performing all these jobs with equal competence. The breed is most closely associated with Andalusia in southern Spain, where it worked the region's marshes, estuaries, and farmland with remarkable versatility.`,
    `A medium-sized breed weighing 31–49 lbs, the Spanish Water Dog is immediately identifiable by its dense, curly or corded coat — which can form natural cords when left ungroomed — in solid or particolored patterns of black, brown, beige, white, or black-and-white. The coat is never brushed, only trimmed, and is fully functional as weather protection for a working water dog. Spanish Water Dogs are athletic, intelligent, and intensely devoted to their family — with a natural wariness of strangers that makes them excellent watchdogs. They are highly trainable and excel in herding, agility, and water sports.`
  ],

  'tibetan-spaniel.html': [
    `The Tibetan Spaniel is not a true spaniel at all — it shares no history with European sporting spaniels and was never bred to flush or retrieve game. Instead, this small, ancient breed developed in the Buddhist monasteries of Tibet over a thousand years ago as a sacred companion and sentinel. Tibetan Buddhist monks kept Tibetans Spaniels as prized companions, and the dogs served a practical role as "prayer dogs" — placed on the monastery walls to watch for approaching visitors and alert the monks. They were frequently given as gifts between Tibetan monasteries and the Chinese Imperial Palace.`,
    `A small breed weighing just 9–15 lbs, the Tibetan Spaniel has a silky, moderately long double coat with a distinctive lion-like mane around the neck, a plumed tail carried over the back, and an alert, confident expression. Despite their small size, Tibetan Spaniels have the self-assurance and independence of a much larger dog — they are curious, clever, and somewhat catlike in their behavior. They form deep bonds with their family but maintain a dignified aloofness with strangers, making them excellent watchdogs. They are adaptable and relatively low-energy, well-suited to apartment living.`
  ],

  'west-highland-white-terrier.html': [
    `The West Highland White Terrier — beloved worldwide as the "Westie" — is one of Scotland's most popular native breeds, developed in the Scottish Highlands to hunt foxes, badgers, and vermin in rocky terrain. The breed's all-white coat was specifically bred by Colonel Edward Malcolm of Poltalloch in the 19th century following a tragic accident in which his wheaten-colored Cairn Terrier was mistaken for a fox during a hunt. The white coat allows hunters to instantly identify their dogs in the field. The Westie quickly became popular across Britain and beyond.`,
    `A compact, sturdy small breed weighing 15–22 lbs, the Westie has a hard, straight outer coat and a dense soft undercoat — both pure white — that frames a round head and dark, expressive eyes giving the breed an irresistible teddy-bear appearance. Their coat requires regular grooming to maintain cleanliness and shape. Beneath that charming exterior, Westies are bold, confident, and full of terrier spirit — independent and occasionally stubborn, but also playful, affectionate, and surprisingly adaptable to both city and country living. They are one of the more sociable and good-natured of the terrier group.`
  ],

  'whippet.html': [
    `The Whippet was developed in northern England in the mid-19th century by working-class miners and mill workers in Lancashire and Yorkshire who wanted a dog capable of coursing rabbits — a popular pastime and food source — but couldn't afford to feed a large Greyhound. By crossing Greyhounds with various terrier breeds, they produced the Whippet: the fastest domesticated animal of its weight in the world, capable of reaching 35 mph. The breed was nicknamed the "poor man's racehorse" and was raced on straight tracks in industrial towns throughout the north of England.`,
    `A medium-sized sight hound weighing 25–40 lbs, the Whippet has a slender, muscular frame, deep chest, and tightly arched loin that gives it a unique sculptural silhouette. Their short, fine coat lies close to the skin and offers minimal protection against cold, meaning Whippets benefit from a coat in winter. In the home, Whippets are extraordinarily gentle, quiet, and affectionate — among the calmest of all breeds indoors. They are intensely sensitive and form profound bonds with their family. Despite their racing heritage, Whippets are highly adaptable and can thrive in apartments provided they get regular sprints in a safely enclosed area.`
  ],

  'wirehaired-vizsla.html': [
    `The Wirehaired Vizsla was developed in Hungary in the 1930s by crossing the smooth-coated Hungarian Vizsla with the German Wirehaired Pointer, with the goal of producing a dog that combined the Vizsla's exceptional nose and biddable temperament with a more robust coat better suited to cold-water retrieving and harsh autumn weather in the Hungarian marshes. The result is a versatile all-around hunting dog equally capable of pointing, flushing, and retrieving on both land and water — and the only truly wirehaired golden-rust pointing breed.`,
    `A medium-to-large breed weighing 45–65 lbs, the Wirehaired Vizsla has a distinctive dense, harsh, close-lying golden rust coat with a pronounced beard and eyebrows that gives it a distinguished, serious expression. Like its smooth-coated cousin, the Wirehaired Vizsla is intensely loyal and develops an unusually close bond with its owner — sometimes described as a "Velcro dog" for its preference to be in constant physical contact with family members. They are high-energy, highly trainable dogs that excel in hunt tests, agility, and obedience, and thrive with active owners who involve them in daily outdoor activities.`
  ],

};

// ─────────────────────────────────────────────────────────────────────────────
// The empty overview div that was left by the conversion script
const EMPTY_OVERVIEW = '          <div class="breed-section">\n            \n          </div>';

let fixed = 0, notFound = 0;

for (const [file, [p1, p2]] of Object.entries(OVERVIEWS)) {
  const fp  = path.join(breedsDir, file);
  if (!fs.existsSync(fp)) { console.log(`MISSING FILE: ${file}`); notFound++; continue; }

  let html = fs.readFileSync(fp, 'utf8');

  if (!html.includes(EMPTY_OVERVIEW)) {
    console.log(`SKIP (no empty overview div): ${file}`);
    notFound++;
    continue;
  }

  const newOverview = `          <div class="breed-section">
            <h2>🐾 Overview</h2>
            <p>${p1}</p>
            <p>${p2}</p>
          </div>`;

  html = html.replace(EMPTY_OVERVIEW, newOverview);
  fs.writeFileSync(fp, html, 'utf8');
  console.log(`✅  ${file}`);
  fixed++;
}

console.log('\n──────────────────────────────────────');
console.log(`Fixed   : ${fixed}`);
console.log(`Skipped : ${notFound}`);
