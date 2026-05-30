// fix_purebred_apis.js — node fix_purebred_apis.js
// Fixes incorrect dog.ceo API paths for purebred breeds
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'breeds', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// alt text → correct dog.ceo API path
const fixes = {
  // ── Terriers ──────────────────────────────────────────────────────
  'Rat Terrier':               'terrier/rat',
  'Parson Russell Terrier':    'terrier/russell',
  'American Hairless Terrier': 'terrier/american',
  'Smooth Fox Terrier':        'terrier/fox',
  'Wire Fox Terrier':          'terrier/fox',
  'Border Terrier':            'terrier/border',
  'Bedlington Terrier':        'terrier/bedlington',
  'Lakeland Terrier':          'terrier/lakeland',
  'Sealyham Terrier':          'terrier/sealyham',
  'Silky Terrier':             'terrier/silky',
  'Tibetan Terrier':           'terrier/tibetan',
  'Toy Manchester Terrier':    'terrier/toy',
  'Norfolk Terrier':           'terrier/norfolk',
  'Norwich Terrier':           'terrier/norwich',
  'Irish Terrier':             'terrier/irish',
  'Kerry Blue Terrier':        'terrier/kerryblue',
  'Patterdale Terrier':        'terrier/patterdale',
  'Australian Terrier':        'terrier/australian',

  // ── Spaniels ──────────────────────────────────────────────────────
  'Boykin Spaniel':            'spaniel/cocker',    // most similar available
  'English Toy Spaniel':       'spaniel/japanese',  // small silky toy spaniel
  'Field Spaniel':             'spaniel/field',
  'Nederlandse Kooikerhondje': 'spaniel/field',     // closest spaniel look
  'Sussex Spaniel':            'spaniel/sussex',
  'Clumber Spaniel':           'clumber',
  'Welsh Springer Spaniel':    'springer/welsh',
  'Brittany Spaniel':          'spaniel/brittany',
  'Irish Water Spaniel':       'spaniel/irish',

  // ── Pointers & Setters ────────────────────────────────────────────
  'Spinone Italiano':          'setter/english',    // elegant hunting dog
  'Wirehaired Pointing Griffon':'pointer/german',
  'Harrier':                   'beagle',            // small pack hound, similar look
  'Treeing Walker Coonhound':  'hound/walker',
  'Black and Tan Coonhound':   'hound/blood',       // similar hound

  // ── Mastiffs & Large Dogs ─────────────────────────────────────────
  'Dogue de Bordeaux':         'mastiff/bull',      // heavy wrinkled mastiff type
  'Dogo Argentino':            'pitbull',           // athletic white working dog
  'Boerboel':                  'mastiff/english',
  'Neapolitan Mastiff':        'mastiff/english',
  'Cane Corso':                'mastiff/bull',
  'Bullmastiff':               'mastiff/bull',
  'Tibetan Mastiff':           'mastiff/tibetan',
  'South African Boerboel':    'mastiff/english',

  // ── Shepherd & Herding ────────────────────────────────────────────
  'Berger Picard':             'briard',            // French shaggy herder
  'Bergamasco':                'komondor',          // corded/matted coat herder
  'Bouvier des Flandres':      'bouvier',
  'Belgian Malinois':          'malinois',
  'Belgian Tervuren':          'tervuren',
  'Belgian Groenendael':       'groenendael',
  'Shetland Sheepdog':         'sheepdog/shetland',
  'Old English Sheepdog':      'sheepdog/english',
  'Australian Cattle Dog':     'cattledog/australian',
  'Entlebucher Mountain Dog':  'entlebucher',
  'Greater Swiss Mountain Dog':'mountain/swiss',
  'Appenzeller Sennenhund':    'appenzeller',

  // ── Spitz & Nordic ────────────────────────────────────────────────
  'Shiba Inu':                 'shiba',
  'American Eskimo Dog':       'eskimo',
  'Norwegian Buhund':          'buhund/norwegian',
  'Finnish Lapphund':          'finnish/lapphund',
  'Keeshond':                  'keeshond',
  'Schipperke':                'schipperke',

  // ── Sighthounds ───────────────────────────────────────────────────
  'Borzoi':                    'borzoi',
  'Scottish Deerhound':        'deerhound/scottish',
  'Saluki':                    'saluki',
  'Italian Greyhound':         'greyhound/italian',
  'Whippet':                   'whippet',
  'Pharaoh Hound':             'hound/ibizan',      // similar sighthound
  'Ibizan Hound':              'hound/ibizan',
  'Plott Hound':               'hound/plott',
  'English Foxhound':          'hound/english',
  'Redbone Coonhound':         'redbone',

  // ── Toy & Companion ───────────────────────────────────────────────
  'Papillon':                  'papillon',
  'Pekingese':                 'pekinese',
  'Coton de Tulear':           'cotondetulear',
  'Lhasa Apso':                'lhasa',

  // ── Miscellaneous fixes ───────────────────────────────────────────
  'Danish-Swedish Farmdog':    'terrier/fox',   // closest available (no exact match)
  'Leonberger':                'leonberg',
  'Otterhound':                'otterhound',
  'Briard':                    'briard',
  'Komondor':                  'komondor',
  'Kuvasz':                    'kuvasz',
  'Basenji':                   'basenji',
  'Rhodesian Ridgeback':       'ridgeback/rhodesian',
  'Dalmatian':                 'dalmatian',
  'Weimaraner':                'weimaraner',
  'Vizsla':                    'vizsla',
  'Doberman Pinscher':         'doberman',
  'Miniature Pinscher':        'pinscher/miniature',
  'Affenpinscher':             'affenpinscher',
  'Standard Schnauzer':        'schnauzer/standard',
  'Miniature Schnauzer':       'schnauzer/miniature',
  'Giant Schnauzer':           'schnauzer/giant',
  'Irish Wolfhound':           'wolfhound/irish',
  'Russian Wolfhound':         'wolfhound/russian',
  'Newfoundland':              'newfoundland',
  'Great Pyrenees':            'pyrenees',
  'Saint Bernard':             'stbernard',
  'Bernese Mountain Dog':      'mountain/bernese',
  'Alaskan Malamute':          'malamute',
  'Siberian Husky':            'husky',
  'Samoyed':                   'samoyed',
  'Akita':                     'akita',
  'Chow Chow':                 'chow',
  'Pomeranian':                'pomeranian',
  'Dachshund':                 'dachshund',
  'Poodle':                    'poodle/standard',
  'Miniature Poodle':          'poodle/miniature',
  'Toy Poodle':                'poodle/toy',
  'Maltese':                   'maltese',
  'Shih Tzu':                  'shihtzu',
  'Chihuahua':                 'chihuahua',
  'Pug':                       'pug',
  'Boston Terrier':            'terrier/boston',
  'French Bulldog':            'bulldog/french',
  'English Bulldog':           'bulldog/english',
  'Beagle':                    'beagle',
  'Labrador Retriever':        'labrador',
  'Golden Retriever':          'retriever/golden',
  'German Shepherd':           'germanshepherd',
  'Rottweiler':                'rottweiler',
  'Boxer':                     'boxer',
  'Dobermann':                 'doberman',
  'Bulldog':                   'bulldog/english',
};

let changes = 0;
for (const [breedName, newApi] of Object.entries(fixes)) {
  const escaped = breedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `(<div class="breed-emoji-wrap" data-api=")[^"]*("[^>]*>[\\s\\S]{0,400}?alt="${escaped}")`,
    'g'
  );
  const updated = html.replace(re, `$1${newApi}$2`);
  if (updated !== html) {
    console.log(`✅  ${breedName.padEnd(30)} → ${newApi}`);
    html = updated;
    changes++;
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log(`\nDone. ${changes} breeds updated.`);
