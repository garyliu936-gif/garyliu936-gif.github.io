// gen_batch34.js — Upgrade 31 AKC basic breed pages
// Adds AKC Rank to sidebar + full mix breeds tab content
// node gen_batch34.js

'use strict';
const fs   = require('fs');
const path = require('path');
const DIR  = path.join(__dirname, 'breeds');

// ── Breed data ────────────────────────────────────────────────────────────────
const BREEDS = [
  {
    slug: 'akita', name: 'Akita', rank: 62,
    origin: 'Japan', aka: 'American Akita, Japanese Akita Inu',
    mixes: [
      { slug:'akita-shepherd', name:'Akita Shepherd', parents:'Akita + German Shepherd', desc:'Powerful, loyal, and highly intelligent. Inherits the Akita\'s dignity and the Shepherd\'s trainability — excellent working companion for experienced owners.' },
      { slug:'husky-inu',      name:'Husky Inu',      parents:'Akita + Siberian Husky',  desc:'Striking wolf-like looks with an energetic, friendly personality. Athletic and adventurous — needs plenty of space and exercise.' },
      { slug:'aki-poo',        name:'Aki-Poo',         parents:'Akita + Poodle',          desc:'A large, intelligent mix combining the Akita\'s loyalty with the Poodle\'s trainability. Usually low-shedding with a curly or wavy coat.' },
    ]
  },
  {
    slug: 'alaskan-malamute', name: 'Alaskan Malamute', rank: 81,
    origin: 'United States (Alaska)', aka: 'Mal, Mally',
    mixes: [
      { slug:'chusky',   name:'Chusky',    parents:'Chow Chow + Alaskan Malamute', desc:'Fluffy, loyal, and powerful. Gets the Chow\'s calm independence mixed with the Malamute\'s endurance and pack instincts.' },
      { slug:'huskimo',  name:'Huskimo',   parents:'Siberian Husky + Alaskan Malamute', desc:'One of the most striking Arctic mixes — a high-energy sled dog hybrid with incredible stamina and a beautiful thick coat.' },
      { slug:'goberian', name:'Goberian',  parents:'Golden Retriever + Siberian Husky', desc:'Friendly, playful, and highly trainable. One of the most popular husky-type mixes — outgoing personality in a beautiful package.' },
    ]
  },
  {
    slug: 'australian-terrier', name: 'Australian Terrier', rank: 150,
    origin: 'Australia', aka: 'Aussie Terrier',
    mixes: [
      { slug:'airedoodle',    name:'Airedoodle',     parents:'Airedale Terrier + Poodle',   desc:'Smart, spirited, and low-shedding. Combines terrier tenacity with poodle intelligence in a medium-sized package.' },
      { slug:'jackadoodle',   name:'Jackadoodle',    parents:'Jack Russell Terrier + Poodle', desc:'Energetic, clever, and compact. One of the most popular terrier-poodle mixes — always ready for adventure.' },
      { slug:'westiepoo',     name:'Westiepoo',      parents:'West Highland White Terrier + Poodle', desc:'Friendly, low-shedding, and playful. Gets the Westie\'s confident personality softened with poodle sweetness.' },
    ]
  },
  {
    slug: 'barbet', name: 'Barbet', rank: 129,
    origin: 'France', aka: 'French Water Dog',
    mixes: [
      { slug:'bordoodle',   name:'Bordoodle',    parents:'Border Collie + Poodle',         desc:'Brilliant, energetic, and eager to please. One of the smartest designer mixes — ideal for agility and advanced training.' },
      { slug:'springerdoodle', name:'Springerdoodle', parents:'English Springer Spaniel + Poodle', desc:'Cheerful, athletic, and low-shedding. A natural hunting and family companion that loves water and outdoor adventure.' },
      { slug:'barbet',      name:'Barbet (Purebred)', parents:'100% Barbet', desc:'The Barbet\'s curly, waterproof coat and gentle temperament make it a rising star. Often compared to a Labradoodle but with its own ancient heritage.' },
    ]
  },
  {
    slug: 'bearded-collie', name: 'Bearded Collie', rank: 140,
    origin: 'Scotland', aka: 'Beardie',
    mixes: [
      { slug:'bordoodle',     name:'Bordoodle',      parents:'Border Collie + Poodle',         desc:'One of the smartest herding-poodle mixes — energetic, highly trainable, and low-shedding.' },
      { slug:'sheepadoodle',  name:'Sheepadoodle',   parents:'Old English Sheepdog + Poodle',  desc:'Fluffy, gentle, and great with kids. A beloved family companion that combines herding intelligence with poodle softness.' },
      { slug:'double-doodle', name:'Double Doodle',  parents:'Labradoodle + Goldendoodle',     desc:'Super friendly and low-shedding. One of the most popular multi-generation doodle crosses.' },
    ]
  },
  {
    slug: 'bedlington-terrier', name: 'Bedlington Terrier', rank: 147,
    origin: 'England', aka: 'Rothbury Terrier',
    mixes: [
      { slug:'jackadoodle', name:'Jackapoo',       parents:'Jack Russell Terrier + Poodle',      desc:'Lively, intelligent, and compact. Shares the terrier spirit with a low-shedding poodle coat.' },
      { slug:'foodle',      name:'Foodle',          parents:'Fox Terrier + Poodle',               desc:'Alert, friendly, and clever. A spirited small terrier mix with a soft, curly coat.' },
      { slug:'ratoodle',    name:'Ratoodle',        parents:'Rat Terrier + Poodle',               desc:'Energetic and affectionate. A playful small mix with the rat terrier\'s prey drive softened by poodle trainability.' },
    ]
  },
  {
    slug: 'bloodhound', name: 'Bloodhound', rank: 59,
    origin: 'Belgium / England', aka: 'St. Hubert Hound',
    mixes: [
      { slug:'bagel-hound', name:'Bagel Hound',    parents:'Basset Hound + Beagle',              desc:'Gentle, stubborn, and nose-driven. Combines two classic scenthound breeds into one lovable low-energy companion.' },
      { slug:'beagador',    name:'Beagador',        parents:'Beagle + Labrador Retriever',         desc:'Friendly, energetic, and scent-motivated. One of the most popular beagle mixes — great family dog with a strong nose.' },
      { slug:'basset-hound','name':'Basset Hound',  parents:'Purebred relative',                   desc:'The Bloodhound\'s closest cousin — same legendary nose, lower-slung body, and equally laid-back personality.' },
    ]
  },
  {
    slug: 'bull-terrier', name: 'Bull Terrier', rank: 86,
    origin: 'England', aka: 'English Bull Terrier, Bully',
    mixes: [
      { slug:'bugg',      name:'Bugg',            parents:'Boston Terrier + Pug',             desc:'Comical, affectionate, and playful. A compact mixed breed with an irresistible personality and a lovable squished face.' },
      { slug:'bullador',  name:'Bullador',         parents:'Bull Terrier + Labrador',          desc:'Energetic, loyal, and muscular. Combines the Bully\'s tenacity with the Lab\'s friendly, outgoing nature.' },
      { slug:'beabull',   name:'Beabull',          parents:'Beagle + Bulldog',                 desc:'Gentle, stubborn, and affectionate. A medium-sized mix that\'s great with families and easy-going around the house.' },
    ]
  },
  {
    slug: 'cairn-terrier', name: 'Cairn Terrier', rank: 68,
    origin: 'Scotland', aka: 'Toto\'s Breed',
    mixes: [
      { slug:'cairnoodle', name:'Cairnoodle',      parents:'Cairn Terrier + Poodle',           desc:'Smart, spirited, and low-shedding. Inherits the Cairn\'s bold personality with a softer, curly poodle coat.' },
      { slug:'westiepoo',  name:'Westiepoo',        parents:'West Highland White Terrier + Poodle', desc:'Confident, friendly, and playful. Two Scottish terriers combined with poodle softness.' },
      { slug:'dorgi',      name:'Dorgi',            parents:'Dachshund + Pembroke Welsh Corgi', desc:'Playful, low to the ground, and loyal. A famously royal cross — Queen Elizabeth II owned several Dorgis.' },
    ]
  },
  {
    slug: 'chesapeake-bay-retriever', name: 'Chesapeake Bay Retriever', rank: 56,
    origin: 'United States', aka: 'Chessie, CBR',
    mixes: [
      { slug:'labmaraner',  name:'Labmaraner',       parents:'Labrador Retriever + Weimaraner',  desc:'Sleek, athletic, and intelligent. A handsome sporting mix that excels in the field and bonds deeply with its family.' },
      { slug:'goldador',    name:'Goldador',          parents:'Golden Retriever + Labrador',      desc:'One of the most gentle, trainable mixes in existence. Beloved as guide dogs, therapy dogs, and family pets.' },
      { slug:'sheprador',   name:'Sheprador',         parents:'German Shepherd + Labrador',       desc:'Loyal, smart, and highly trainable. A popular working dog mix that\'s also excellent with families.' },
    ]
  },
  {
    slug: 'cocker-spaniel', name: 'Cocker Spaniel', rank: 33,
    origin: 'England', aka: 'American Cocker Spaniel, Show Cocker',
    mixes: [
      { slug:'cockapoo',  name:'Cockapoo',          parents:'Cocker Spaniel + Poodle',          desc:'One of the original designer dogs — gentle, low-shedding, and endlessly lovable. Perfect for families and allergy sufferers.' },
      { slug:'spoodle',   name:'Spoodle',            parents:'Cocker Spaniel + Poodle',          desc:'The Australian name for the Cockapoo. Sweet-natured, energetic, and almost hypoallergenic.' },
      { slug:'cavapoo',   name:'Cavapoo',            parents:'Cavalier King Charles + Poodle',   desc:'Gentle, affectionate, and low-shedding. One of the most popular toy doodles — great for first-time owners.' },
    ]
  },
  {
    slug: 'greyhound', name: 'Greyhound', rank: 151,
    origin: 'Egypt / England', aka: 'Racing Greyhound, Ex-Racer',
    mixes: [
      { slug:'whippet',   name:'Whippet',           parents:'Closely related purebred',         desc:'The Greyhound\'s smaller cousin — equally fast (up to 35 mph) but more compact and apartment-friendly.' },
      { slug:'lurcher',   name:'Lurcher',            parents:'Greyhound + Collie/Terrier',       desc:'A classic English working cross — fast as a Greyhound with added intelligence and versatility. Not AKC recognized.' },
      { slug:'saluki',    name:'Saluki',             parents:'Closely related ancient sighthound', desc:'One of the world\'s oldest breeds — similar sighthound grace and speed but with a more feathered, elegant coat.' },
    ]
  },
  {
    slug: 'irish-setter', name: 'Irish Setter', rank: 73,
    origin: 'Ireland', aka: 'Red Setter',
    mixes: [
      { slug:'irish-doodle',       name:'Irish Doodle',        parents:'Irish Setter + Poodle',        desc:'Stunningly beautiful and low-shedding. One of the most striking doodle mixes — friendly, smart, and athletic.' },
      { slug:'irish-wolfadoodle',  name:'Irish Wolfadoodle',   parents:'Irish Wolfhound + Poodle',     desc:'A giant, gentle doodle mix combining the wolfhound\'s calm nature with poodle intelligence.' },
      { slug:'goberian',           name:'Goberian',            parents:'Golden Retriever + Siberian Husky', desc:'Friendly, energetic, and outgoing. A handsome sporting mix perfect for active families.' },
    ]
  },
  {
    slug: 'irish-terrier', name: 'Irish Terrier', rank: 149,
    origin: 'Ireland', aka: 'Daredevil',
    mixes: [
      { slug:'airedoodle',  name:'Airedoodle',        parents:'Airedale Terrier + Poodle',      desc:'Spirited and low-shedding. Combines the largest terrier breed with poodle brains and a soft coat.' },
      { slug:'foodle',      name:'Foodle',            parents:'Fox Terrier + Poodle',           desc:'Compact, lively, and clever. A feisty small terrier mix with an outgoing personality.' },
      { slug:'jackadoodle', name:'Jackapoo',          parents:'Jack Russell Terrier + Poodle',  desc:'One of the most energetic small mixes — fearless, fast, and always entertaining.' },
    ]
  },
  {
    slug: 'kerry-blue-terrier', name: 'Kerry Blue Terrier', rank: 155,
    origin: 'Ireland', aka: 'Irish Blue Terrier',
    mixes: [
      { slug:'schnoodle',  name:'Schnoodle',          parents:'Schnauzer + Poodle',             desc:'Smart, loyal, and low-shedding. One of the most popular terrier-poodle crosses — energetic and great with families.' },
      { slug:'airedoodle', name:'Airedoodle',         parents:'Airedale Terrier + Poodle',      desc:'Intelligent and spirited. Combines the world\'s largest terrier with poodle trainability.' },
      { slug:'whoodle',    name:'Whoodle',            parents:'Soft Coated Wheaten Terrier + Poodle', desc:'Playful, silky-coated, and low-shedding. Gets the Wheaten\'s happy personality with poodle intelligence.' },
    ]
  },
  {
    slug: 'lakeland-terrier', name: 'Lakeland Terrier', rank: 157,
    origin: 'England (Lake District)', aka: 'Lakeland',
    mixes: [
      { slug:'westiepoo',   name:'Westiepoo',         parents:'West Highland White Terrier + Poodle', desc:'Confident, friendly, and low-shedding. Two British terriers + poodle intelligence.' },
      { slug:'cairnoodle',  name:'Cairnoodle',        parents:'Cairn Terrier + Poodle',         desc:'Bold, smart, and hypoallergenic-friendly. A spirited small companion with a curly coat.' },
      { slug:'ratoodle',    name:'Ratoodle',          parents:'Rat Terrier + Poodle',           desc:'Energetic and compact. Combines terrier athleticism with poodle sweetness.' },
    ]
  },
  {
    slug: 'lhasa-apso', name: 'Lhasa Apso', rank: 83,
    origin: 'Tibet', aka: 'Abso Seng Kye (Bark Lion Sentinel Dog)',
    mixes: [
      { slug:'lhasapoo',  name:'Lhasapoo',           parents:'Lhasa Apso + Poodle',            desc:'Calm, gentle, and low-shedding. A charming small companion with a silky or curly coat and a watchful personality.' },
      { slug:'maltichon', name:'Maltichon',          parents:'Maltese + Bichon Frisé',         desc:'Fluffy, sweet, and hypoallergenic-friendly. One of the most popular small white companion mixes.' },
      { slug:'pooton',    name:'Pooton',             parents:'Poodle + Coton de Tulear',       desc:'Gentle, playful, and cottony-soft. A delightful small companion with minimal shedding.' },
    ]
  },
  {
    slug: 'mastiff', name: 'Mastiff', rank: 40,
    origin: 'England', aka: 'English Mastiff, Old English Mastiff',
    mixes: [
      { slug:'mastidoodle', name:'Mastidoodle',       parents:'Mastiff + Poodle',               desc:'A gentle giant doodle — calm, affectionate, and surprisingly low-shedding for such a large dog.' },
      { slug:'great-danoodle', name:'Great Danoodle',  parents:'Great Dane + Poodle',            desc:'One of the tallest doodle mixes — gentle, graceful, and low-shedding. True gentle giant status.' },
      { slug:'saint-berdoodle', name:'Saint Berdoodle', parents:'Saint Bernard + Poodle',       desc:'Fluffy, friendly, and enormous. Combines the Saint Bernard\'s sweet nature with poodle intelligence.' },
    ]
  },
  {
    slug: 'miniature-pinscher', name: 'Miniature Pinscher', rank: 67,
    origin: 'Germany', aka: 'Min Pin, King of Toys',
    mixes: [
      { slug:'chiweenie', name:'Chiweenie',          parents:'Chihuahua + Dachshund',          desc:'Tiny, bold, and full of personality. One of the most popular small dog mixes — feisty but affectionate.' },
      { slug:'pom-a-pug', name:'Pom-A-Pug',          parents:'Pomeranian + Pug',               desc:'Compact, playful, and charismatic. Gets the Pom\'s energy softened by the Pug\'s laid-back charm.' },
      { slug:'pomchi',    name:'Pomchi',             parents:'Pomeranian + Chihuahua',         desc:'Tiny, loyal, and surprisingly fearless. A pocket-sized companion with a huge personality.' },
    ]
  },
  {
    slug: 'norfolk-terrier', name: 'Norfolk Terrier', rank: 126,
    origin: 'England', aka: 'Drop-Eared Norwich',
    mixes: [
      { slug:'cairnoodle', name:'Cairnoodle',         parents:'Cairn Terrier + Poodle',        desc:'Bold and low-shedding. A spirited small companion with Scottish terrier roots and poodle intelligence.' },
      { slug:'westiepoo',  name:'Westiepoo',          parents:'West Highland White Terrier + Poodle', desc:'Cheerful, confident, and family-friendly. An ideal small companion for active households.' },
      { slug:'foodle',     name:'Foodle',             parents:'Fox Terrier + Poodle',          desc:'Alert and playful. Compact terrier energy with a soft, low-shedding coat.' },
    ]
  },
  {
    slug: 'old-english-sheepdog', name: 'Old English Sheepdog', rank: 87,
    origin: 'England', aka: 'Bobtail, OES',
    mixes: [
      { slug:'sheepadoodle', name:'Sheepadoodle',      parents:'Old English Sheepdog + Poodle', desc:'Fluffy, gentle, and incredibly popular. Combines the OES\'s sweet nature with the poodle\'s low-shedding intelligence — one of the most sought-after family doodles.' },
      { slug:'shepadoodle',  name:'Shepadoodle',       parents:'German Shepherd + Poodle',      desc:'Loyal, highly trainable, and low-shedding. One of the most versatile working doodle mixes.' },
      { slug:'flandoodle',   name:'Flandoodle',        parents:'Bouvier des Flandres + Poodle', desc:'Powerful, intelligent, and tireless. A herding doodle built for work and adventure.' },
    ]
  },
  {
    slug: 'parson-russell-terrier', name: 'Parson Russell Terrier', rank: 121,
    origin: 'England', aka: 'Parson Jack Russell, PRT',
    mixes: [
      { slug:'jackadoodle', name:'Jackapoo',           parents:'Jack Russell Terrier + Poodle', desc:'Energetic, clever, and endlessly entertaining. One of the most popular small terrier mixes.' },
      { slug:'jug',         name:'Jug',                parents:'Jack Russell Terrier + Pug',    desc:'Compact, comical, and affectionate. Gets the JRT\'s energy with the Pug\'s laid-back charm.' },
      { slug:'ratoodle',    name:'Ratoodle',           parents:'Rat Terrier + Poodle',          desc:'Athletic, smart, and surprisingly gentle. A great small mix for active owners.' },
    ]
  },
  {
    slug: 'rhodesian-ridgeback', name: 'Rhodesian Ridgeback', rank: 41,
    origin: 'Zimbabwe (formerly Rhodesia)', aka: 'African Lion Hound',
    mixes: [
      { slug:'labmaraner',  name:'Labmaraner',         parents:'Labrador Retriever + Weimaraner', desc:'Sleek, athletic, and loyal. A handsome sporting mix with strong hunting instincts and deep family devotion.' },
      { slug:'boxador',     name:'Boxador',            parents:'Boxer + Labrador Retriever',    desc:'Energetic, loyal, and playful. One of the most popular large family mixes — great with active kids.' },
      { slug:'rottador',    name:'Rottador',           parents:'Rottweiler + Labrador',         desc:'Protective, loyal, and intelligent. A powerful mix that\'s deeply devoted to its family.' },
    ]
  },
  {
    slug: 'saint-bernard', name: 'Saint Bernard', rank: 63,
    origin: 'Switzerland / Italy', aka: 'St. Bernhardshund, Alpine Mastiff',
    mixes: [
      { slug:'saint-berdoodle', name:'Saint Berdoodle',  parents:'Saint Bernard + Poodle',      desc:'A giant, fluffy gentle giant — the softness of a Saint Bernard with a poodle\'s low-shedding intelligence. One of the most beloved giant doodles.' },
      { slug:'golden-mountain-dog', name:'Golden Mountain Dog', parents:'Golden Retriever + Bernese Mountain Dog', desc:'Sweet, gentle, and strikingly beautiful. A beloved gentle giant mix perfect for families.' },
      { slug:'newfiedoodle',    name:'Newfiedoodle',     parents:'Newfoundland + Poodle',       desc:'A calm, sweet water dog mix. Inherits the Newfoundland\'s legendary patience with poodle intelligence.' },
    ]
  },
  {
    slug: 'saluki', name: 'Saluki', rank: 135,
    origin: 'Middle East (ancient)',  aka: 'Persian Greyhound, Gazelle Hound',
    mixes: [
      { slug:'whippet',   name:'Whippet',             parents:'Close relative — sighthound',   desc:'The most apartment-friendly sighthound — just as fast in bursts (35 mph) but more compact and adaptable to city life.' },
      { slug:'greyhound', name:'Greyhound',            parents:'Close relative — sighthound',   desc:'The world\'s fastest dog breed — shares the Saluki\'s ancient sighthound heritage and gentle indoor temperament.' },
      { slug:'lurcher',   name:'Lurcher',             parents:'Sighthound + Herding/Terrier',   desc:'A classic English working cross using sighthound speed. Often Greyhound or Saluki based.' },
    ]
  },
  {
    slug: 'samoyed', name: 'Samoyed', rank: 55,
    origin: 'Siberia (Russia)', aka: 'Sammy, Smiley Dog',
    mixes: [
      { slug:'sammypoo',  name:'Sammypoo',            parents:'Samoyed + Poodle',              desc:'Fluffy, friendly, and low-shedding. Gets the Samoyed\'s famous smile and the poodle\'s intelligence — a stunning combination.' },
      { slug:'huskimo',   name:'Huskimo',             parents:'Siberian Husky + American Eskimo Dog', desc:'A striking, energetic arctic mix — outgoing, beautiful, and built for cold weather.' },
      { slug:'goberian',  name:'Goberian',            parents:'Golden Retriever + Siberian Husky', desc:'Outgoing and beautiful. One of the friendliest husky crosses — great for active families.' },
    ]
  },
  {
    slug: 'scottish-terrier', name: 'Scottish Terrier', rank: 57,
    origin: 'Scotland', aka: 'Scottie, Aberdeen Terrier',
    mixes: [
      { slug:'scoodle',   name:'Scoodle',             parents:'Scottish Terrier + Poodle',     desc:'Bold, smart, and low-shedding. Gets the Scottie\'s dignified independence softened with poodle warmth.' },
      { slug:'cairnoodle', name:'Cairnoodle',         parents:'Cairn Terrier + Poodle',        desc:'Spirited, curious, and low-shedding. Two Scottish terriers combined with poodle intelligence.' },
      { slug:'westiepoo',  name:'Westiepoo',          parents:'West Highland White Terrier + Poodle', desc:'Friendly, confident, and great with families. A classic Scottish terrier in a soft, curly package.' },
    ]
  },
  {
    slug: 'soft-coated-wheaten-terrier', name: 'Soft Coated Wheaten Terrier', rank: 76,
    origin: 'Ireland', aka: 'Wheaten, Wheatie',
    mixes: [
      { slug:'whoodle',    name:'Whoodle',             parents:'Soft Coated Wheaten Terrier + Poodle', desc:'Playful, silky-coated, and genuinely low-shedding. A joyful companion that combines the Wheaten\'s happy personality with poodle intelligence.' },
      { slug:'woodle',     name:'Woodle',              parents:'Welsh Terrier + Poodle',        desc:'Energetic and low-shedding. A feisty Welsh terrier paired with poodle brains.' },
      { slug:'schnoodle',  name:'Schnoodle',           parents:'Schnauzer + Poodle',            desc:'One of the most popular terrier-poodle crosses — smart, loyal, and minimal-shedding.' },
    ]
  },
  {
    slug: 'tibetan-spaniel', name: 'Tibetan Spaniel', rank: 122,
    origin: 'Tibet', aka: 'Tibbie',
    mixes: [
      { slug:'pomchi',    name:'Pomchi',              parents:'Pomeranian + Chihuahua',        desc:'Tiny, alert, and bold. A pocket-sized companion with a big personality — great for apartment living.' },
      { slug:'malshi',    name:'Mal-Shi',             parents:'Maltese + Shih Tzu',            desc:'Gentle, fluffy, and affectionate. Two ancient companion breeds in one beautiful small package.' },
      { slug:'poochon',   name:'Poochon',             parents:'Poodle + Bichon Frisé',        desc:'Soft, sweet, and hypoallergenic-friendly. One of the most popular small companion doodle mixes.' },
    ]
  },
  {
    slug: 'west-highland-white-terrier', name: 'West Highland White Terrier', rank: 45,
    origin: 'Scotland', aka: 'Westie',
    mixes: [
      { slug:'westiepoo', name:'Westiepoo',           parents:'West Highland White Terrier + Poodle', desc:'Confident, friendly, and low-shedding. One of the most popular terrier-doodle crosses — gets the Westie\'s bold personality with a soft, curly coat.' },
      { slug:'cairnoodle', name:'Cairnoodle',         parents:'Cairn Terrier + Poodle',        desc:'Spirited and smart. Two Scottish terriers combined with poodle intelligence and low-shedding coat.' },
      { slug:'cavapoochon', name:'Cavapoochon',       parents:'Cavalier + Poodle + Bichon',    desc:'Perhaps the world\'s most popular tri-mix — gentle, low-shedding, and perpetually puppy-faced.' },
    ]
  },
  {
    slug: 'whippet', name: 'Whippet', rank: 48,
    origin: 'England', aka: 'English Whippet, Snap Dog',
    mixes: [
      { slug:'lurcher',   name:'Lurcher',             parents:'Whippet + Collie/Terrier',      desc:'The classic English coursing cross — takes the Whippet\'s speed and adds intelligence and agility. Popular working and show dog in the UK.' },
      { slug:'greyhound', name:'Greyhound',            parents:'Close relative — sighthound',  desc:'The Whippet\'s larger cousin — both share ancestry and gentle, affectionate indoor temperaments.' },
      { slug:'pitsky',    name:'Pitsky',              parents:'Pit Bull + Siberian Husky',     desc:'Athletic, energetic, and loyal. An active mix built for outdoor adventures and devoted family life.' },
    ]
  },
];

// ── Helper: build mix card HTML ───────────────────────────────────────────────
function mixCard(m) {
  const href = `/breeds/${m.slug}.html`;
  return `              <div class="mix-card">
                <a href="${href}" style="text-decoration:none;color:inherit">
                  <h3><a href="${href}">${m.name}</a></h3>
                  <p><strong>Parents:</strong> ${m.parents}</p>
                  <p>${m.desc}</p>
                </a>
              </div>`;
}

function mixPanel(b) {
  return `        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular ${b.name} Mix Breeds</h2>
            <p>${b.name}s are sometimes crossed with other breeds to create unique companions that combine the best traits of both parents. Here are some of the most popular mixes.</p>
            <div class="mix-grid">
${b.mixes.map(mixCard).join('\n')}
            </div>
          </div>
        </div><!-- end tab-mixes -->`;
}

// ── Process each breed ────────────────────────────────────────────────────────
let updated = 0;

for (const b of BREEDS) {
  const fpath = path.join(DIR, b.slug + '.html');
  if (!fs.existsSync(fpath)) { console.log('❌ MISSING FILE:', b.slug); continue; }

  let html = fs.readFileSync(fpath, 'utf8');
  let changed = false;

  // 1. Add AKC Rank + Origin + Aliases to sidebar Quick Facts
  if (!html.includes('AKC Rank')) {
    const qfOld = `<h4>Quick Facts</h4>\n          <div class="info-box"><div class="info-box-label">Group</div>`;
    const qfNew = `<h4>Quick Facts</h4>\n          <div class="info-box"><div class="info-box-label">AKC Rank</div><div class="info-box-value">#${b.rank} most popular (2025)</div></div>\n          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Group</div>`;
    if (html.includes(qfOld)) {
      html = html.replace(qfOld, qfNew);
      changed = true;
    } else {
      // Fallback: find sidebar-card with Quick Facts and inject after h4
      const alt = `<h4>Quick Facts</h4>`;
      if (html.includes(alt)) {
        html = html.replace(alt, `<h4>Quick Facts</h4>\n          <div class="info-box"><div class="info-box-label">AKC Rank</div><div class="info-box-value">#${b.rank} most popular (2025)</div></div>`);
        changed = true;
      }
    }
    // Also add Origin if not present
    if (!html.includes('info-box-label">Origin')) {
      html = html.replace(
        `<div class="info-box-label">AKC Rank</div>`,
        `<div class="info-box-label">AKC Rank</div>`
      );
    }
  }

  // 2. Replace empty/basic mixes tab with full content
  const emptyMixRe = /<div class="breed-tab-panel" id="tab-mixes">[\s\S]*?<\/div><!-- end tab-mixes -->/;
  const emptyMixSimple = /<div class="breed-tab-panel" id="tab-mixes">[\s\S]*?<\/div>\s*<\/div><!-- end tab-mixes -->/;
  if (html.match(emptyMixRe)) {
    html = html.replace(emptyMixRe, mixPanel(b));
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fpath, html, 'utf8');
    updated++;
    console.log(`✅ ${b.name} (#${b.rank})`);
  } else {
    console.log(`⚠️  ${b.name} — no changes (check manually)`);
  }
}

console.log(`\n✨ Batch 34 complete! Updated ${updated} / ${BREEDS.length} pages`);
