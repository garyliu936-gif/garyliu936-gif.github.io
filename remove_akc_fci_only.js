const fs = require('fs');

// These are FCI-only breeds (not AKC recognized) — remove AKC Rank and AKC Group from their pages
const fciOnlySlugs = [
  'aidi',
  'ariege-pointer',
  'barak-hound',
  'basset-bleu-de-gascogne',
  'bavarian-mountain-hound',
  'berger-blanc-suisse',
  'bohemian-shepherd',
  'braque-dauvergne',
  'braque-du-bourbonnais',
  'braque-francais-type-gascogne',
  'braque-francais-type-pyrenees',
  'braque-saint-germain',
  'burgos-pointer',
  'ca-de-bestiar',
  'ca-de-bou',
  'carpathian-shepherd-dog',
  'chart-polski',
  'croatian-sheepdog',
  'drentsche-patrijshond',
  'dunker',
  'german-longhaired-pointer',
  'gonczy-polski',
  'grand-bleu-de-gascogne',
  'griffon-bleu-de-gascogne',
  'griffon-fauve-de-bretagne',
  'hanover-hound',
  'jagdterrier',
  'kai-ken',
  'karst-shepherd',
  'kishu-ken',
  'kintamani',
  'mioritic-shepherd-dog',
  'norrbottenspets',
  'petit-bleu-de-gascogne',
  'posavac-hound',
  'rastreador-brasileiro',
  'saarlos-wolfdog',
  'smalandsstovare',
  'slovak-cuvac',
  'south-russian-ovcharka',
  'styrian-coarse-haired-hound',
  'volpino-italiano',
  'bucovina-shepherd-dog',
  'anglo-francais-de-petite-venerie',
  'presa-canario',
  // Additional FCI-only breeds
  'smooth-collie',          // renamed to Collie Smooth
  'belgian-shepherd',       // FCI breed (the 4 AKC varieties are separate pages)
  'pelo-raso',              // FCI #337
  'pelo-forte',             // FCI #198
  'artois-hound',           // FCI only
  'hellenic-hound',         // FCI only
  'greek-harehound',        // FCI only
  'basset-artesien-normand',// FCI only
  'billy',                  // FCI only
  'blue-picardy-spaniel',   // FCI only
  'bosnian-coarse-haired-hound', // FCI only
  'briquet-griffon-vendeen',// FCI only
  'bruno-jura-hound',       // FCI only
  'chien-francais-blanc-et-noir', // FCI only
  'chien-francais-blanc-et-orange', // FCI only
  'chien-francais-tricolore', // FCI only
  'chodsky-pes',            // FCI only
  'cirneco-dell-etna',      // FCI only (not AKC)
  'czechoslovakian-wolfdog',// FCI only
  'dogo-guatemalteco',      // FCI only
  'drever',                 // FCI only
  'dutch-shepherd',         // check — if FCI only
  'erdelyi-kopo',           // FCI only
  'estonian-hound',         // FCI only
  'eurasier',               // FCI only
  'faraoun',                // FCI only
  'fci-belgian-laekenois', // FCI only
  'finnish-hound',          // FCI only
  'formosan-mountain-dog',  // FCI only
  'francais-blanc-et-noir', // FCI only
  'grand-basset-griffon-vendeen', // FCI only
  'grand-griffon-vendeen',  // FCI only
  'haldenstovare',          // FCI only
  'hamiltonstovare',        // FCI only
  'hanoverian-scenthound',  // FCI only
  'hygenhund',              // FCI only
  'istrian-coarse-haired-hound', // FCI only
  'istrian-short-haired-hound',  // FCI only
  'jack-russell-terrier',   // FCI only (AKC has it as Russell Terrier)
  'jindo',                  // FCI only
  'kai',                    // FCI only
  'kanaan-dog',             // FCI only
  'keeshond',               // check
  'kokoni',                 // FCI only
  'komondor',               // check
  'korean-jindo-dog',       // FCI only
  'kraszki-hound',          // FCI only
  'lagotto-romagnolo',      // check
  'landseer',               // FCI only
  'lapinporokoira',         // FCI only
  'leonberger',             // check
  'lhasa-apso',             // AKC recognized — skip
  'majorca-shepherd-dog',   // FCI only
  'majorcan-sheepdog',      // FCI only
  'mallorquin',             // FCI only
  'montenegrin-mountain-hound', // FCI only
  'mudi',                   // FCI only
  'mudhol-hound',           // FCI only
  'norsk-elghund-gra',      // FCI only
  'norsk-elghund-sort',     // FCI only
  'perro-de-pastor-mallorquin', // FCI only
  'perro-sin-pelo-del-peru',    // FCI only
  'petit-basset-griffon-vendeen', // FCI only (check — AKC may have it)
  'picardy-spaniel',        // FCI only
  'polish-greyhound',       // FCI only
  'polish-hunting-dog',     // FCI only
  'polish-lowland-sheepdog',// AKC recognized
  'porcelaine',             // FCI only
  'portuguese-pointing-dog',// FCI only
  'posavatz-hound',         // FCI only
  'pudelpointer',           // FCI only
  'pyrenean-sheepdog',      // check
  'rafeiro-do-alentejo',    // FCI only
  'rampur-greyhound',       // FCI only
  'romanian-bucovina-shepherd', // FCI only
  'romanian-mioritic-shepherd-dog', // FCI only
  'rottweiler',             // AKC recognized — skip
  'russian-toy',            // FCI only
  'russian-tsvetnaya-bolonka', // FCI only
  'sabueso-espanol',        // FCI only
  'saint-germain-pointer',  // FCI only
  'schapendoes',            // FCI only
  'schweizerischer-niederlaufhund', // FCI only
  'serbian-hound',          // FCI only
  'serbian-tricolour-hound',// FCI only
  'shikoku',                // FCI only
  'shikoku-ken',            // FCI only
  'slovensky-cuvac',        // FCI only
  'slovensky-kopov',        // FCI only
  'slovensky-rough-haired-pointer', // FCI only
  'small-blue-gascony',     // FCI only
  'south-russian-shepherd-dog', // FCI only
  'spanish-greyhound',      // FCI only
  'stabyhoun',              // FCI only
  'stichelhaar',            // FCI only
  'styrian-hound',          // FCI only
  'swiss-laufhund',         // FCI only
  'telomian',               // FCI only
  'tornjak',                // FCI only
  'transylvanian-hound',    // FCI only
  'treeing-walker-coonhound', // AKC recognized — skip
  'tyrolean-hound',         // FCI only
  'weimaraner',             // AKC recognized — skip
  'westphalian-dachsbracke',// FCI only
];

const akrankRe = /<div class="info-box"><div class="info-box-label">AKC Rank<\/div><div class="info-box-value">[^<]*<\/div><\/div>/g;
const akgroupRe = /<div class="info-box"><div class="info-box-label">AKC Group<\/div><div class="info-box-value">[^<]*<\/div><\/div>/g;

let count = 0;

fciOnlySlugs.forEach(slug => {
  ['breeds/' + slug + '.html', 'zh/breeds/' + slug + '.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    const before = c;
    c = c.replace(akrankRe, '');
    c = c.replace(akgroupRe, '');
    if (c !== before) {
      fs.writeFileSync(f, c);
      console.log('Removed AKC info: ' + f);
      count++;
    }
  });
});

console.log('Done. Modified ' + count + ' files.');
