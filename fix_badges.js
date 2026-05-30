// Updates all purebred breed card badge numbers to AKC 2025 official ranks
const fs = require('fs');

// slug -> AKC 2025 rank
const akc_rank = {
'french-bulldog':1,'labrador-retriever':2,'golden-retriever':3,'german-shepherd':4,
'dachshund':5,'poodle':6,'beagle':7,'rottweiler':8,'german-shorthaired-pointer':9,
'bulldog':10,'cane-corso':11,'cavalier-king-charles':12,'yorkshire-terrier':13,
'australian-shepherd':14,'doberman-pinscher':15,'corgi':16,'miniature-schnauzer':17,
'boxer':18,'pomeranian':19,'bernese-mountain-dog':20,'shih-tzu':21,'great-dane':22,
'boston-terrier':23,'chihuahua':24,'havanese':25,'border-collie':26,
'english-springer-spaniel':27,'miniature-american-shepherd':28,'shetland-sheepdog':29,
'siberian-husky':30,'brittany':31,'belgian-malinois':32,'cocker-spaniel':33,
'basset-hound':34,'english-cocker-spaniel':35,'vizsla':36,'maltese':37,'pug':38,
'collie':39,'mastiff':40,'rhodesian-ridgeback':41,'papillon':42,
'portuguese-water-dog':43,'shiba-inu':44,'west-highland-white-terrier':45,
'newfoundland':46,'australian-cattle-dog':47,'whippet':48,'bichon-frise':49,
'dalmatian':50,'wirehaired-pointing-griffon':51,'giant-schnauzer':52,
'italian-greyhound':53,'weimaraner':54,'samoyed':55,'chesapeake-bay-retriever':56,
'scottish-terrier':57,'german-wirehaired-pointer':58,'bloodhound':59,
'russell-terrier':60,'staffordshire-bull-terrier':61,'akita':62,'saint-bernard':63,
'boykin-spaniel':64,'cardigan-welsh-corgi':65,'great-pyrenees':66,
'miniature-pinscher':67,'cairn-terrier':68,'nova-scotia-duck-tolling-retriever':69,
'airedale-terrier':70,'greater-swiss-mountain-dog':71,'chinese-crested':72,
'irish-setter':73,'biewer-terrier':74,'irish-wolfhound':75,
'soft-coated-wheaten-terrier':76,'lagotto-romagnolo':77,'bullmastiff':78,
'coton-de-tulear':79,'chinese-shar-pei':80,'alaskan-malamute':81,
'brussels-griffon':82,'lhasa-apso':83,'rat-terrier':84,'keeshond':85,
'bull-terrier':86,'old-english-sheepdog':87,'anatolian-shepherd-dog':88,
'english-setter':89,'pekingese':90,'border-terrier':91,'basenji':92,
'standard-schnauzer':93,'chow-chow':94,'dogue-de-bordeaux':95,'leonberger':96,
'american-staffordshire-terrier':97,'flat-coated-retriever':98,'borzoi':99,
'bouvier-des-flandres':100,'dogo-argentino':101,'beauceron':102,'japanese-chin':103,
'gordon-setter':104,'miniature-bull-terrier':105,'toy-fox-terrier':106,
'wire-fox-terrier':107,'american-hairless-terrier':108,'norwich-terrier':109,
'schipperke':110,'pointer':111,'boerboel':112,'spinone-italiano':113,
'welsh-terrier':114,'belgian-tervuren':115,'silky-terrier':116,'afghan-hound':117,
'tibetan-terrier':118,'neapolitan-mastiff':119,'belgian-sheepdog':120,
'parson-russell-terrier':121,'tibetan-spaniel':122,'xoloitzcuintli':123,
'american-eskimo-dog':124,'mudi':125,'norfolk-terrier':126,'finnish-lapphund':127,
'norwegian-elkhound':128,'barbet':129,'wirehaired-vizsla':130,
'manchester-terrier':131,'bluetick-coonhound':132,'clumber-spaniel':133,
'english-toy-spaniel':134,'saluki':135,'bracco-italiano':136,
'black-and-tan-coonhound':137,'icelandic-sheepdog':138,'german-pinscher':139,
'bearded-collie':140,'welsh-springer-spaniel':141,'tibetan-mastiff':142,
'treeing-walker-coonhound':143,'smooth-fox-terrier':144,'russian-toy':145,
'redbone-coonhound':146,'bedlington-terrier':147,'field-spaniel':148,
'irish-terrier':149,'australian-terrier':150,'greyhound':151,'swedish-vallhund':152,
'affenpinscher':153,'black-russian-terrier':154,'kerry-blue-terrier':155,
'scottish-deerhound':156,'lakeland-terrier':157,'nederlandse-kooikerhondje':158,
'lowchen':159,'pumi':160,'petit-basset-griffon-vendeen':161,
'irish-red-and-white-setter':162,'sealyham-terrier':163,
'portuguese-podengo-pequeno':164,'glen-of-imaal-terrier':165,'berger-picard':166,
'spanish-water-dog':167,'curly-coated-retriever':168,'irish-water-spaniel':169,
'danish-swedish-farmdog':170,'plott-hound':171,'briard':172,'norwegian-buhund':173,
'ibizan-hound':174,'sussex-spaniel':175,'american-water-spaniel':176,'puli':177,
'entlebucher-mountain-dog':178,'kuvasz':179,'pharaoh-hound':180,'skye-terrier':181,
'american-english-coonhound':182,'bergamasco-sheepdog':183,'cirneco-dell-etna':184,
'komondor':185,'dandie-dinmont-terrier':186,'english-foxhound':187,
'american-foxhound':188,'otterhound':189,'lancashire-heeler':190,
'pyrenean-shepherd':191,'polish-lowland-sheepdog':192,'canaan-dog':193,
'finnish-spitz':194,'azawakh':195,'belgian-laekenois':196,'cesky-terrier':197,
'chinook':198,'harrier':199,'grand-basset-griffon-vendeen':200,'sloughi':201,
'norwegian-lundehund':202,
};

const indexPath = 'C:/Pet Website/breeds/index.html';
let html = fs.readFileSync(indexPath, 'utf8');
let updatedCount = 0;
let skipped = [];

// Process line by line - when we see a purebred breed-card href, update the badge on next line
const lines = html.split('\n');
for(let i = 0; i < lines.length; i++){
  const line = lines[i];
  // Match purebred breed card links
  const m = line.match(/href="([a-z0-9-]+)\.html" class="breed-card"/);
  if(m){
    const slug = m[1];
    const rank = akc_rank[slug];
    if(rank && i+1 < lines.length){
      const nextLine = lines[i+1];
      // Only update if it has teal purebred badge (not amber hybrid #f59e0b)
      if(nextLine.includes('background:#0d9488') && nextLine.includes('>#')){
        const updated = nextLine.replace(/>#\d+<\/span>/, '>#'+rank+'</span>');
        if(updated !== nextLine){
          lines[i+1] = updated;
          updatedCount++;
        }
      }
    } else if(!rank){
      skipped.push(slug);
    }
  }
}

html = lines.join('\n');
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated '+updatedCount+' badge numbers to AKC 2025 ranks.');
if(skipped.length) console.log('Skipped (not in AKC map): '+skipped.join(', '));
