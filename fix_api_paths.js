/**
 * fix_api_paths.js
 * Fixes all broken data-api values in breeds/index.html so every
 * breed card can load a real dog photo from dog.ceo.
 */
const fs = require('fs');
const path = require('path');
const INDEX_PATH = path.join(__dirname, 'breeds', 'index.html');

// Confirmed-broken → correct dog.ceo path
// Verified against https://dog.ceo/api/breeds/list/all
const FIXES = {
  // Bichon – reversed key on dog.ceo
  'data-api="bichon/frise"':       'data-api="frise/bichon"',

  // Bloodhound – stored under hound/blood on dog.ceo
  'data-api="bloodhound"':         'data-api="hound/blood"',

  // Bouvier – no sub-breed path needed
  'data-api="bouvier/flandres"':   'data-api="bouvier"',

  // Anatolian Shepherd – not in dog.ceo; use large guardian
  'data-api="anatolian"':          'data-api="sheepdog/english"',

  // Bracco Italiano – not in dog.ceo; closest hunting/pointing breed
  'data-api="bracco"':             'data-api="setter/english"',

  // Canaan Dog – not in dog.ceo; use primitive basenji
  'data-api="canaan"':             'data-api="basenji"',

  // Cavalier King Charles – not direct; Blenheim spaniel is same type
  'data-api="cavalier"':           'data-api="spaniel/blenheim"',

  // Dogo Argentino – not in dog.ceo; use large white mastiff type
  'data-api="dogo-argentino"':     'data-api="mastiff/english"',

  // Bluetick Coonhound – standalone on dog.ceo (not a hound sub-breed)
  'data-api="hound/bluetick"':     'data-api="bluetick"',

  // Redbone Coonhound – standalone on dog.ceo
  'data-api="hound/redbone"':      'data-api="redbone"',

  // Neapolitan Mastiff – no dog.ceo match; use English Mastiff
  'data-api="mastiff/neapolitan"': 'data-api="mastiff/english"',

  // German Shorthaired Pointer variants – use pointer/german
  'data-api="pointer/germanshortha"':    'data-api="pointer/german"',
  'data-api="pointer/germanwirehaired"': 'data-api="pointer/german"',
  'data-api="pointer/germanywirehaired"':'data-api="pointer/german"',

  // Great Pyrenees – no sub-breed; use pyrenees directly
  'data-api="pyrenees/great"':     'data-api="pyrenees"',

  // Belgian Sheepdog – use groenendael (same breed, dog.ceo name)
  'data-api="sheepdog/belgian"':   'data-api="groenendael"',

  // Clumber Spaniel – standalone on dog.ceo (not a spaniel sub-breed)
  'data-api="spaniel/clumber"':    'data-api="clumber"',

  // Field Spaniel – not in dog.ceo; use cocker spaniel
  'data-api="spaniel/field"':      'data-api="spaniel/cocker"',

  // English Springer Spaniel – reversed on dog.ceo: springer/english
  'data-api="spaniel/springer"':   'data-api="springer/english"',

  // Airedale Terrier – standalone on dog.ceo (not a terrier sub-breed)
  'data-api="terrier/airedale"':   'data-api="airedale"',

  // Bull Terrier – use bullterrier/staffordshire on dog.ceo
  'data-api="terrier/bull"':       'data-api="bullterrier/staffordshire"',

  // Manchester Terrier – not in dog.ceo; use scottish terrier
  'data-api="terrier/manchester"': 'data-api="terrier/scottish"',

  // Rat Terrier – not in dog.ceo; use fox terrier
  'data-api="terrier/rat"':        'data-api="terrier/fox"',

  // Skye Terrier – not in dog.ceo; use scottish terrier
  'data-api="terrier/skye"':       'data-api="terrier/scottish"',

  // Staffordshire Bull Terrier – correct path on dog.ceo
  'data-api="terrier/staffordshire"': 'data-api="bullterrier/staffordshire"',

  // Belgian Tervuren – typo fix (teruveren → tervuren)
  'data-api="teruveren"':          'data-api="tervuren"',
};

let html = fs.readFileSync(INDEX_PATH, 'utf8');
let count = 0;

for (const [bad, good] of Object.entries(FIXES)) {
  const before = html;
  html = html.split(bad).join(good);  // replace ALL occurrences
  const changed = (html.split(good).length - 1) - (before.split(good).length - 1) + (before.split(bad).length - 1);
  if (before !== html) {
    console.log(`✓ Fixed: ${bad.slice(10,-1)} → ${good.slice(10,-1)}`);
    count++;
  }
}

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log(`\n✅ Done — fixed ${count} broken API paths in breeds/index.html`);

// Quick verification
const remaining = Object.keys(FIXES).filter(bad => html.includes(bad));
if (remaining.length) {
  console.warn('⚠️  Still broken:', remaining);
} else {
  console.log('✅ All targeted paths replaced successfully.');
}
