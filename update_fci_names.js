const fs = require('fs');

const changes = [
  ['aidi', 'Aidi', 'Atlas Mountain Dog'],
  ['ariege-pointer', 'Ariège Pointer', 'Ariege Pointing Dog'],
  ['barak-hound', 'Barak Hound', 'Bosnian Broken-Haired Hound'],
  ['basset-bleu-de-gascogne', 'Basset Bleu de Gascogne', 'Blue Gascony Basset'],
  ['bavarian-mountain-hound', 'Bavarian Mountain Hound', 'Bavarian Mountain Scent Hound'],
  ['berger-blanc-suisse', 'Berger Blanc Suisse', 'White Swiss Shepherd Dog'],
  ['bohemian-shepherd', 'Bohemian Shepherd', 'Bohemian Shepherd Dog'],
  ['braque-dauvergne', "Braque d'Auvergne", 'Auvergne Pointer'],
  ['braque-du-bourbonnais', 'Braque du Bourbonnais', 'Bourbonnais Pointing Dog'],
  ['braque-francais-type-gascogne', 'Braque Français Type Gascogne', 'French Pointing Dog - Gascogne Type'],
  ['braque-francais-type-pyrenees', 'Braque Français Type Pyrénées', 'French Pointing Dog - Pyrenean Type'],
  ['braque-saint-germain', 'Braque Saint-Germain', 'Saint Germain Pointer'],
  ['burgos-pointer', 'Burgos Pointer', 'Burgos Pointing Dog'],
  ['ca-de-bestiar', 'Ca de Bestiar', 'Majorca Shepherd Dog'],
  ['ca-de-bou', 'Ca de Bou', 'Majorca Mastiff'],
  ['carpathian-shepherd-dog', 'Carpathian Shepherd Dog', 'Romanian Carpathian Shepherd Dog'],
  ['chart-polski', 'Chart Polski', 'Polish Greyhound'],
  ['croatian-sheepdog', 'Croatian Sheepdog', 'Croatian Shepherd Dog'],
  ['drentsche-patrijshond', 'Drentsche Patrijshond', 'Drentsche Partridge Dog'],
  ['dunker', 'Dunker', 'Norwegian Hound'],
  ['german-longhaired-pointer', 'German Longhaired Pointer', 'Deutsch Langhaar'],
  ['gonczy-polski', 'Polish Hound', 'Polish Hunting Dog'],
  ['grand-bleu-de-gascogne', 'Grand Bleu de Gascogne', 'Great Gascony Blue'],
  ['griffon-bleu-de-gascogne', 'Griffon Bleu de Gascogne', 'Blue Gascony Griffon'],
  ['griffon-fauve-de-bretagne', 'Griffon Fauve de Bretagne', 'Fawn Brittany Griffon'],
  ['hanover-hound', 'Hanover Hound', 'Hanoverian Scent Hound'],
  ['jagdterrier', 'Jagdterrier', 'German Hunting Terrier'],
  ['kai-ken', 'Kai Ken', 'Kai'],
  ['karst-shepherd', 'Karst Shepherd', 'Karst Shepherd Dog'],
  ['kishu-ken', 'Kishu Ken', 'Kishu'],
  ['kintamani', 'Kintamani', 'Kintamani-Bali Dog'],
  ['mioritic-shepherd-dog', 'Mioritic Shepherd Dog', 'Romanian Mioritic Shepherd Dog'],
  ['norrbottenspets', 'Norrbottenspets', 'Norrbottenspitz'],
  ['petit-bleu-de-gascogne', 'Petit Bleu de Gascogne', 'Small Blue Gascony'],
  ['posavac-hound', 'Posavac Hound', 'Posavatz Hound'],
  ['rastreador-brasileiro', 'Rastreador Brasileiro', 'Brazilian Tracker'],
  ['saarlos-wolfdog', 'Saarloos Wolfdog', 'Saarloos Wolfhond'],
  ['smalandsstovare', 'Smaland Hound', 'Smalandsstovare'],
  ['slovak-cuvac', 'Slovak Cuvac', 'Slovakian Chuvach'],
  ['south-russian-ovcharka', 'South Russian Ovcharka', 'South Russian Shepherd Dog'],
  ['styrian-coarse-haired-hound', 'Styrian Coarse-Haired Hound', 'Coarse-Haired Styrian Hound'],
  ['volpino-italiano', 'Volpino Italiano', 'Italian Volpino'],
  ['bucovina-shepherd-dog', 'Bucovina Shepherd Dog', 'Romanian Bucovina Shepherd'],
  ['anglo-francais-de-petite-venerie', 'Small Anglo-French Hound', 'Medium-Sized Anglo-French Hound'],
  ['presa-canario', 'Perro de Presa Canario', 'Presa Canario'],
];

function esc(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Update individual EN breed pages
changes.forEach(([slug, oldName, newName]) => {
  const f = 'breeds/' + slug + '.html';
  if (!fs.existsSync(f)) { console.log('MISSING EN: ' + f); return; }
  let c = fs.readFileSync(f, 'utf8');
  c = c.split(oldName).join(newName);
  fs.writeFileSync(f, c);
  console.log('EN: ' + oldName + ' -> ' + newName);
});

// Update individual ZH breed pages (update English subtitle inside <small lang="en">)
changes.forEach(([slug, oldName, newName]) => {
  const f = 'zh/breeds/' + slug + '.html';
  if (!fs.existsSync(f)) { console.log('MISSING ZH: ' + f); return; }
  let c = fs.readFileSync(f, 'utf8');
  c = c.split(oldName).join(newName);
  fs.writeFileSync(f, c);
  console.log('ZH: ' + oldName + ' -> ' + newName);
});

// Update EN listing page
let listing = fs.readFileSync('breeds/index.html', 'utf8');
changes.forEach(([slug, oldName, newName]) => {
  listing = listing.split(oldName).join(newName);
});
// Also fix "Norman Artesian Basset" -> "Norman Artesien Basset" (listing h3)
listing = listing.split('Norman Artesian Basset').join('Norman Artesien Basset');
// Fix listing card for Ariege Pointer which may use plain ASCII
listing = listing.split('Ariege Pointer').join('Ariege Pointing Dog');
// Braque Francais listing cards use ASCII versions
listing = listing.split('Braque Francais (Type Gascogne)').join('French Pointing Dog - Gascogne Type');
listing = listing.split('Braque Francais (Type Pyrenees)').join('French Pointing Dog - Pyrenean Type');
fs.writeFileSync('breeds/index.html', listing);
console.log('EN listing updated');

// Update ZH listing page
let zhListing = fs.readFileSync('zh/breeds/index.html', 'utf8');
changes.forEach(([slug, oldName, newName]) => {
  zhListing = zhListing.split(oldName).join(newName);
});
zhListing = zhListing.split('Norman Artesian Basset').join('Norman Artesien Basset');
zhListing = zhListing.split('Ariege Pointer').join('Ariege Pointing Dog');
zhListing = zhListing.split('Braque Francais (Type Gascogne)').join('French Pointing Dog - Gascogne Type');
zhListing = zhListing.split('Braque Francais (Type Pyrenees)').join('French Pointing Dog - Pyrenean Type');
fs.writeFileSync('zh/breeds/index.html', zhListing);
console.log('ZH listing updated');

console.log('Done!');
