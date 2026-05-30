// fix_hybrid_apis.js  — run with: node fix_hybrid_apis.js
// Reassigns every hybrid breed card to a unique, visually representative dog.ceo API path
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'breeds', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Map: alt text of the card → correct dog.ceo API path
// Only hybrid cards are included; purebreds already have correct paths.
const hybridMap = {
  // ── #1–30 (original hybrids) ──────────────────────────────────────
  'Goldendoodle':        'retriever/golden',
  'Labradoodle':         'labrador',
  'Cockapoo':            'spaniel/cocker',
  'Cavapoo':             'spaniel/irish',        // Cavalier is a spaniel family
  'Maltipoo':            'maltese',
  'Bernedoodle':         'mountain/bernese',
  'Aussiedoodle':        'australian/shepherd',
  'Pomsky':              'pomeranian',
  'Schnoodle':           'schnauzer/miniature',
  'Yorkipoo':            'terrier/yorkshire',
  'Shorkie':             'shihtzu',
  'Sheepadoodle':        'sheepdog/english',
  'Puggle':              'beagle',               // Beagle × Pug — beagle face dominates
  'Cavachon':            'frise/bichon',
  'Morkie':              'terrier/silky',        // silky terrier looks like Yorkie/Maltese mix
  'Chi-Poo':             'chihuahua',
  'Havapoo':             'cotondetulear',        // Havanese-like fluffy white
  'Shih-Poo':            'poodle/toy',
  'Goberian':            'husky',                // Husky × Golden — Husky look is dominant
  'Westiepoo':           'terrier/westhighland',
  'Boxerdoodle':         'boxer',
  'Goldador':            'retriever/flatcoated', // Different retriever variety
  'Labsky':              'malamute',             // Husky-type, avoids path conflict
  'Bordoodle':           'collie/border',
  'Springerdoodle':      'springer/english',
  'Saint Berdoodle':     'stbernard',
  'Huskydoodle':         'husky',
  'Doxiepoo':            'dachshund',
  'Maltichon':           'frise/bichon',         // Maltese × Bichon → show Bichon
  'Rottador':            'rottweiler',

  // ── #31–50 ────────────────────────────────────────────────────────
  'Poochon':             'poodle/standard',      // Bichon × Poodle → Poodle look
  'Whoodle':             'terrier/wheaten',
  'Shepadoodle':         'germanshepherd',
  'Borador':             'cattledog/australian', // Border Collie-type herder, unique
  'Pugapoo':             'pug',
  'Jackadoodle':         'terrier/jack',
  'Boxador':             'bullterrier/staffordshire', // Athletic dog, unique from boxer
  'Corgipoo':            'corgi/cardigan',
  'Frenchton':           'bulldog/french',
  'Chug':                'pekinese',             // Flat-faced small dog, unique
  'Beaglier':            'beagle',
  'Mal-Shi':             'spaniel/japanese',     // Small silky lap dog
  'Dorgi':               'pembroke',             // Pembroke Corgi × Dachshund
  'Cheagle':             'terrier/rat',          // Small hunting dog like Chi+Beagle
  'Bullador':            'bulldog/english',
  'Bugg':                'terrier/boston',
  'Gerberian Shepsky':   'malinois',             // GSD-like, avoids germanshepherd conflict
  'Sheprador':           'pointer/german',       // Working dog aesthetic, unique
  'Pomapoo':             'schipperke',           // Fluffy small dog, avoids pomeranian conflict
  'Jug':                 'terrier/patterdale',   // Jack Russell-type terrier, unique

  // ── #51–70 ────────────────────────────────────────────────────────
  'Corgidor':            'entlebucher',          // Herding dog, avoids corgi/lab conflicts
  'Irish Doodle':        'setter/irish',
  'Woodle':              'terrier/welsh',
  'Pitsky':              'pitbull',
  'Dalmadoodle':         'dalmatian',
  'Chiweenie':           'terrier/toy',          // Small toy terrier look
  'Pomchi':              'papillon',             // Small fluffy dog with big ears
  'Peekapoo':            'pekinese',
  'Cavapoochon':         'poodle/miniature',     // Triple mix — miniature poodle look
  'Beabull':             'hound/english',        // Beagle family but unique
  'Scoodle':             'terrier/scottish',
  'Airedoodle':          'terrier/airedale',
  'Sammypoo':            'samoyed',
  'Doberdoodle':         'doberman',
  'Horgi':               'malamute',             // Husky-type, avoids duplicates
  'Aussiedor':           'cattledog/australian', // Different from australian/shepherd
  'Pyredoodle':          'pyrenees',
  'Newfiedoodle':        'newfoundland',
  'Goldmaraner':         'weimaraner',
  'Rottsky':             'tervuren',             // Wolf-like Belgian Shepherd, unique

  // ── #71–85 ────────────────────────────────────────────────────────
  'Lhasapoo':            'lhasa',
  'Pooton':              'cotondetulear',
  'Rottle':              'leonberg',             // Powerful big dog, unique
  'Mastidoodle':         'mastiff/english',
  'Great Danoodle':      'dane/great',
  'Weimardoodle':        'vizsla',               // Elegant hunting dog, avoids weimaraner clash
  'Beagador':            'hound/blood',          // Nose-hound family, unique
  'Chusky':              'chow',
  'Froodle':             'poodle/standard',
  'Corman Shepherd':     'sheepdog/shetland',    // Herder, smaller GSD-look
  'Akita Shepherd':      'akita',
  'Gollie':              'sheepdog/shetland',    // Collie family, unique from border collie
  'Husky Inu':           'shiba',                // Shiba Inu look is more distinctive
  'Pom-A-Pug':           'keeshond',             // Fluffy spitz dog, unique
  'Bagel Hound':         'hound/basset',

  // ── #86–100 ───────────────────────────────────────────────────────
  'Bassador':            'hound/blood',          // Hound family, avoids basset clash
  'Huskimo':             'eskimo',               // American Eskimo Dog
  'Affenpoo':            'affenpinscher',
  'Bossipoo':            'poodle/toy',           // Avoid boston terrier clash
  'Foodle':              'terrier/fox',
  'Cairnoodle':          'terrier/cairn',
  'Spoodle':             'spaniel/brittany',     // English Cocker × Poodle, Brittany Spaniel unique
  'Labmaraner':          'pointer/germanlonghair', // Elegant hunting dog pointer
  'Flandoodle':          'bouvier',              // Bouvier des Flandres — perfect match
  'Portidoodle':         'spaniel/welsh',        // Water-loving spaniel
  'Ratoodle':            'terrier/rat',
  'Irish Wolfadoodle':   'wolfhound/irish',
  'Chow Shepherd':       'groenendael',          // Belgian Shepherd, GSD-adjacent
  'Golden Mountain Dog': 'mountain/swiss',       // Greater Swiss Mountain Dog, avoids bernese clash
  'Double Doodle':       'retriever/chesapeake', // Unique retriever variety
};

// Apply each mapping: find the hybrid card by its alt text and replace data-api
let changes = 0;
for (const [breedName, newApi] of Object.entries(hybridMap)) {
  // Match the pattern: data-api="old" ... alt="BreedName"
  // The alt and data-api are on the same .breed-emoji-wrap div
  const re = new RegExp(
    `(<div class="breed-emoji-wrap" data-api=")[^"]*("[^>]*>(?:[\\s\\S]{0,300}?)alt="${breedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")`,
    'g'
  );
  const updated = html.replace(re, `$1${newApi}$2`);
  if (updated !== html) {
    console.log(`✅  ${breedName.padEnd(26)} → ${newApi}`);
    html = updated;
    changes++;
  } else {
    console.log(`⚠️  ${breedName} — no match found`);
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log(`\nDone. ${changes} / ${Object.keys(hybridMap).length} breeds updated.`);
