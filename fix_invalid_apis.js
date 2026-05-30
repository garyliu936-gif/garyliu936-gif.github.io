// fix_invalid_apis.js — node fix_invalid_apis.js
// Fixes all API paths that are not valid in dog.ceo
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'breeds', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');
let changes = 0;

// [breedAlt, oldApi, newApi]
const fixes = [
  // germanshepherd → german/shepherd  (2 cards)
  ['German Shepherd',           'germanshepherd',      'german/shepherd'],
  ['Shepadoodle',               'germanshepherd',      'german/shepherd'],

  // bare mastiff → mastiff/english
  ['Mastiff',                   'mastiff',             'mastiff/english'],

  // Chinook (sled dog) was wrongly on ridgeback → malamute (sled dog look)
  ['Chinook',                   'ridgeback',           'malamute'],

  // schnauzer/standard → schnauzer/giant (standard not in dog.ceo)
  ['Standard Schnauzer',        'schnauzer/standard',  'schnauzer/giant'],

  // spaniel/field not in dog.ceo → use spaniel/blenheim
  ['Field Spaniel',             'spaniel/field',       'spaniel/blenheim'],
  ['Nederlandse Kooikerhondje', 'spaniel/field',       'spaniel/blenheim'],

  // springer/welsh not in dog.ceo → use springer/english
  ['Welsh Springer Spaniel',    'springer/welsh',      'springer/english'],

  // terrier/airedale not in dog.ceo → Airedale is a top-level breed: airedale
  ['Airedoodle',                'terrier/airedale',    'airedale'],

  // terrier/jack not in dog.ceo → Jack Russell = terrier/russell
  ['Jackadoodle',               'terrier/jack',        'terrier/russell'],

  // terrier/rat not in dog.ceo → closest valid small terriers
  ['Rat Terrier',               'terrier/rat',         'terrier/fox'],
  ['Cheagle',                   'terrier/rat',         'terrier/russell'],
  ['Ratoodle',                  'terrier/rat',         'terrier/fox'],
];

for (const [alt, oldApi, newApi] of fixes) {
  const escapedAlt = alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedOld = oldApi.replace(/\//g, '\\/');

  const pattern =
    '(<div class="breed-emoji-wrap" data-api=")' + escapedOld +
    '("[^>]*>[\\s\\S]{0,400}?alt="' + escapedAlt + '")';

  const re = new RegExp(pattern, 'g');
  const updated = html.replace(re, '$1' + newApi + '$2');

  if (updated !== html) {
    console.log('OK  ' + alt.padEnd(30) + oldApi + ' -> ' + newApi);
    html = updated;
    changes++;
  } else {
    console.log('??  ' + alt + ' -- no match (may already be correct)');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('\nFixed ' + changes + ' / ' + fixes.length + ' cards.');
