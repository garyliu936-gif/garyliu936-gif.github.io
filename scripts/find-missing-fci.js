const fs = require('fs');
const path = require('path');

function toSlug(name) {
  return name.toLowerCase()
    .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u').replace(/[ýÿ]/g, 'y')
    .replace(/[ñ]/g, 'n').replace(/[ç]/g, 'c').replace(/[ß]/g, 'ss')
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const FCI_RAW = fs.readFileSync(path.join(__dirname, 'fci-raw.txt'), 'utf8');
const fciSlugMap = {};
for (const line of FCI_RAW.split('\n')) {
  const [name, group] = line.split('|');
  if (name && group) fciSlugMap[toSlug(name)] = parseInt(group);
}

const MANUAL = {
  'collie-rough':1,'collie-smooth':1,'dutch-schapendoes':1,'pyrenean-sheepdog-smooth-faced':1,
  'long-haired-pyrenean-sheepdog':1,'atlas-mountain-dog-aidi':2,'cimarron-uruguayo':2,
  'cane-corso':2,'italian-cane-corso':2,'landseer':2,'fox-terrier-smooth':3,
  'fox-terrier-wire':3,'english-toy-terrier':3,'german-hunting-terrier':3,
  'dachshund':4,'miniature-dachshund':4,'kaninchen-dachshund':4,
  'cirneco-delletna':5,'cirneco-dell-etna':5,'jamthund':5,'korea-jindo-dog':5,'jindo':5,
  'portuguese-podengo':5,'pharaoh-hound':5,'petit-basset-griffon-vendeen':6,
  'grand-basset-griffon-vendeen':6,'briquet-griffon-vendeen':6,'grand-griffon-vendeen':6,
  'porcelaine':6,'vizsla':7,'hungarian-vizsla':7,'wirehaired-vizsla':7,
  'german-shorthaired-pointer':7,'german-wirehaired-pointer':7,'kleiner-munsterlander':7,
  'small-munsterlander':7,'large-munsterlander':7,'english-pointer':7,'pointer':7,
  'cocker-spaniel':8,'english-cocker-spaniel':8,'american-cocker-spaniel':8,
  'flat-coated-retriever':8,'kromforlander':9,'petit-brabancon':9,'griffon-bruxellois':9,
  'griffon-belge':9,'little-lion-dog':9,'borzoi':10,'deerhound':10,
  'spanish-greyhound':10,'galgo-espanol':10,
};
Object.assign(fciSlugMap, MANUAL);

const html = fs.readFileSync(path.join(__dirname, '..', 'breeds', 'index.html'), 'utf8');
const cardSlugs = [];
const re = /<a\s[^>]*class="[^"]*breed-card[^"]*"[^>]*>/g;
let m;
while ((m = re.exec(html)) !== null) {
  const hm = m[0].match(/href="([^"]+)"/);
  if (hm) cardSlugs.push(hm[1].replace(/\.html$/, '').split('/').pop().toLowerCase());
}

console.log('Total cards:', cardSlugs.length);
const matched = cardSlugs.filter(s => fciSlugMap[s]);
console.log('FCI matched:', matched.length);

const unmatched = cardSlugs.filter(s => !fciSlugMap[s]);
console.log('\nUnmatched slugs (all non-FCI + missed FCI):');
console.log(unmatched.join('\n'));
