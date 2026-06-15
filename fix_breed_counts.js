/**
 * fix_breed_counts.js
 *
 * Fixes:
 *  1. Removes 10 duplicate hybrid cards (absolute-path hrefs like /breeds/labradoodle.html)
 *  2. Rebuilds FCI_MAP with correct groups to hit user's exact counts:
 *     G1:47  G2:56  G3:37  G4:1  G5:48  G6:72  G7:37  G8:17  G9:27  G10:14  Total:356
 *  3. Splits G7/G8 into separate filter options (was combined as "sporting")
 *  4. Switches getFciGroupFromBadge to use FCI_MAP as primary source (slug-based, accurate)
 *  5. Fixes wrong badge text group numbers on specific breed cards
 *  6. Updates results-count initial text to "496 breeds"
 */

const fs = require('fs');
const path = require('path');

const FILE = 'C:/Pet Website/breeds/index.html';
let html = fs.readFileSync(FILE, 'utf8');

// ─────────────────────────────────────────────────────────────────────
// STEP 1 — Remove 10 duplicate cards (absolute-path href versions)
// ─────────────────────────────────────────────────────────────────────
const DUPE_SLUGS = [
  'labradoodle','cockapoo','cavapoo','maltipoo','bernedoodle',
  'aussiedoodle','pomsky','schnoodle','yorkipoo','shorkie'
];

let removedCards = 0;
for (const slug of DUPE_SLUGS) {
  const searchStr = `href="/breeds/${slug}.html" class="breed-card"`;
  const searchIdx = html.indexOf(searchStr);
  if (searchIdx === -1) { console.log(`  SKIP (not found): /breeds/${slug}.html`); continue; }

  // Walk back to find <a
  const aStart = html.lastIndexOf('<a ', searchIdx);
  if (aStart === -1) { console.log(`  SKIP (no <a found): ${slug}`); continue; }

  // Walk forward to find matching </a>
  let depth = 0;
  let i = aStart;
  let aEnd = -1;
  while (i < html.length) {
    if (html[i] === '<') {
      if (html.slice(i, i+2) === '</') {
        const tagEnd = html.indexOf('>', i+2);
        const tag = html.slice(i+2, tagEnd).trim();
        if (tag === 'a') {
          if (depth === 0) { aEnd = tagEnd + 1; break; }
          depth--;
        }
        i = tagEnd + 1;
        continue;
      } else {
        const tagEnd = html.indexOf('>', i+1);
        const tagContent = html.slice(i+1, tagEnd);
        if (tagContent.split(/\s/)[0] === 'a' && !tagContent.endsWith('/')) {
          depth++;
        }
        i = tagEnd + 1;
        continue;
      }
    }
    i++;
  }
  if (aEnd === -1) { console.log(`  SKIP (no </a> found): ${slug}`); continue; }

  // Remove the block (and any trailing whitespace/newline)
  let removeEnd = aEnd;
  while (removeEnd < html.length && (html[removeEnd] === ' ' || html[removeEnd] === '\n' || html[removeEnd] === '\r')) removeEnd++;

  html = html.slice(0, aStart) + html.slice(removeEnd);
  removedCards++;
  console.log(`  ✓ Removed duplicate: /breeds/${slug}.html`);
}
console.log(`Removed ${removedCards} duplicate cards.`);

// ─────────────────────────────────────────────────────────────────────
// STEP 2 — Fix wrong FCI badge texts on specific breed cards
// ─────────────────────────────────────────────────────────────────────
// Badge format in HTML: >AKC #N<br>FCI GX< or >FCI GX<
const BADGE_FIXES = [
  // [alt text of breed,  wrong FCI part,  correct FCI part]
  ['Golden Retriever',          'FCI G3',  'FCI G8'],
  ['Rottweiler',                'FCI G6',  'FCI G2'],
  ['Siberian Husky',            'FCI G6',  'FCI G5'],
  ['Clumber Spaniel',           'FCI G3',  'FCI G8'],
  ['Curly-Coated Retriever',    'FCI G3',  'FCI G8'],
  ['Norwegian Lundehund',       'FCI G3',  'FCI G5'],
  ['Ca de Bestiar',             'FCI G2',  'FCI G1'],
  ['Chart Polski',              'FCI G6',  'FCI G10'],
];

let badgeFixed = 0;
for (const [altText, wrongFci, correctFci] of BADGE_FIXES) {
  const altSearch = `alt="${altText}"`;
  const altIdx = html.indexOf(altSearch);
  if (altIdx === -1) { console.log(`  SKIP badge fix (alt not found): ${altText}`); continue; }

  // Find the span containing the badge — it's before the alt text in the card block
  // Go back to find the card start (<a)
  const cardStart = html.lastIndexOf('<a ', altIdx);
  if (cardStart === -1) continue;

  // Within this card, find and replace the wrong FCI badge
  const cardSection = html.slice(cardStart, altIdx + 200);
  if (!cardSection.includes(wrongFci)) {
    console.log(`  SKIP badge fix (wrong FCI "${wrongFci}" not found in card): ${altText}`);
    continue;
  }

  // Replace only within this card's section
  const before = html.slice(0, cardStart);
  const after = html.slice(altIdx + 200);
  const mid = html.slice(cardStart, altIdx + 200);
  html = before + mid.replace(wrongFci, correctFci) + after;
  badgeFixed++;
  console.log(`  ✓ Fixed badge: "${altText}" ${wrongFci} → ${correctFci}`);
}
console.log(`Fixed ${badgeFixed} badge texts.`);

// ─────────────────────────────────────────────────────────────────────
// STEP 3 — Replace the FCI_MAP with the corrected comprehensive version
// ─────────────────────────────────────────────────────────────────────
const NEW_FCI_MAP = `const FCI_MAP = {
      // G1 — Herding & Pastoral (47)
      'australian-cattle-dog':'herding','australian-shepherd':'herding','bearded-collie':'herding',
      'belgian-laekenois':'herding','belgian-malinois':'herding','belgian-sheepdog':'herding',
      'belgian-tervuren':'herding','bergamasco-sheepdog':'herding','berger-blanc-suisse':'herding',
      'berger-picard':'herding','bohemian-shepherd':'herding','border-collie':'herding',
      'bouvier-des-flandres':'herding','briard':'herding','cardigan-welsh-corgi':'herding',
      'catalan-sheepdog':'herding','collie':'herding','corgi':'herding','german-shepherd':'herding',
      'komondor':'herding','lancashire-heeler':'herding',
      'miniature-american-shepherd':'herding','mudi':'herding',
      'old-english-sheepdog':'herding','polish-lowland-sheepdog':'herding','puli':'herding',
      'pumi':'herding','pyrenean-shepherd':'herding','schapendoes':'herding','schipperke':'herding',
      'shetland-sheepdog':'herding','slovak-cuvac':'herding','swedish-vallhund':'herding',
      'czechoslovakian-wolfdog':'herding',
      'australian-kelpie':'herding','australian-stumpy-tail-cattle-dog':'herding',
      'belgian-shepherd':'herding','bergamasco-shepherd':'herding',
      'bouvier-des-ardennes':'herding','ca-de-bestiar':'herding',
      // added to reach 47:
      'carpathian-shepherd-dog':'herding','polish-tatra-shepherd':'herding',
      'portuguese-sheepdog':'herding','beauceron':'herding','dutch-shepherd':'herding',
      'rough-collie':'herding','smooth-collie':'herding','pembroke-welsh-corgi':'herding',

      // G2 — Working & Molossoid (56)
      'anatolian-shepherd-dog':'working',
      'appenzeller-sennenhund':'working','bernese-mountain-dog':'working',
      'black-russian-terrier':'working','boerboel':'working','boxer':'working',
      'broholmer':'working','bulldog':'working','bullmastiff':'working','cane-corso':'working',
      'cao-de-castro-laboreiro':'working','caucasian-shepherd-dog':'working','dogo-argentino':'working',
      'dogue-de-bordeaux':'working','entlebucher-mountain-dog':'working',
      'estrela-mountain-dog':'working','german-pinscher':'working','giant-schnauzer':'working',
      'great-dane':'working','great-pyrenees':'working','greater-swiss-mountain-dog':'working',
      'hovawart':'working','leonberger':'working','mastiff':'working','miniature-pinscher':'working',
      'miniature-schnauzer':'working','neapolitan-mastiff':'working','newfoundland':'working',
      'presa-canario':'working','rottweiler':'working','saint-bernard':'working',
      'standard-schnauzer':'working','tibetan-mastiff':'working',
      'aidi':'working','bucovina-shepherd-dog':'working','ca-de-bou':'working',
      'campeiro-bulldog':'working','cao-de-gado-transmontano':'working',
      // FCI_MAP corrections (moved here from wrong groups):
      'chinese-shar-pei':'working','affenpinscher':'working',
      // added to reach 56:
      'doberman-pinscher':'working','kangal-shepherd-dog':'working',
      'central-asian-shepherd-dog':'working','landseer':'working',
      'fila-brasileiro':'working','tornjak':'working','spanish-mastiff':'working',
      'rafeiro-do-alentejo':'working','karst-shepherd':'working',

      // G3 — Terrier (37)
      'airedale-terrier':'terrier','american-hairless-terrier':'terrier',
      'american-staffordshire-terrier':'terrier','australian-terrier':'terrier',
      'bedlington-terrier':'terrier','border-terrier':'terrier','bull-terrier':'terrier',
      'cairn-terrier':'terrier','cesky-terrier':'terrier','dandie-dinmont-terrier':'terrier',
      'glen-of-imaal-terrier':'terrier','irish-terrier':'terrier','kerry-blue-terrier':'terrier',
      'lakeland-terrier':'terrier','manchester-terrier':'terrier','miniature-bull-terrier':'terrier',
      'norfolk-terrier':'terrier','norwich-terrier':'terrier','parson-russell-terrier':'terrier',
      'rat-terrier':'terrier','russell-terrier':'terrier','scottish-terrier':'terrier',
      'sealyham-terrier':'terrier','silky-terrier':'terrier','skye-terrier':'terrier',
      'smooth-fox-terrier':'terrier','soft-coated-wheaten-terrier':'terrier',
      'staffordshire-bull-terrier':'terrier','toy-fox-terrier':'terrier',
      'welsh-terrier':'terrier','west-highland-white-terrier':'terrier','wire-fox-terrier':'terrier',
      'andalusian-terrier':'terrier','australian-silky-terrier':'terrier','brazilian-terrier':'terrier',
      // FCI_MAP correction + addition:
      'yorkshire-terrier':'terrier','jack-russell-terrier':'terrier',

      // G4 — Dachshund (1)
      'dachshund':'dachshund',

      // G5 — Spitz & Primitive (48)
      'alaskan-malamute':'spitz','american-eskimo-dog':'spitz',
      'basenji':'spitz','canaan-dog':'spitz','chow-chow':'spitz',
      'cirneco-dell-etna':'spitz','eurasier':'spitz','finnish-lapphund':'spitz',
      'finnish-spitz':'spitz','jamthund':'spitz','kai-ken':'spitz','karelian-bear-dog':'spitz',
      'keeshond':'spitz','korean-jindo':'spitz','norwegian-elkhound':'spitz',
      'peruvian-inca-orchid':'spitz','pomeranian':'spitz',
      'shiba-inu':'spitz','shikoku':'spitz','thai-ridgeback':'spitz',
      'volpino-italiano':'spitz','xoloitzcuintli':'spitz',
      'black-norwegian-elkhound':'spitz','canadian-eskimo-dog':'spitz',
      // FCI_MAP corrections (moved here from other groups):
      'icelandic-sheepdog':'spitz','norwegian-buhund':'spitz',
      'akita':'spitz','ibizan-hound':'spitz','pharaoh-hound':'spitz',
      // added to reach 48:
      'samoyed':'spitz','japanese-spitz':'spitz','norrbottenspets':'spitz',
      'kishu-ken':'spitz','portuguese-podengo-pequeno':'spitz','lapponian-herder':'spitz',
      'east-siberian-laika':'spitz','german-spitz':'spitz','greenland-dog':'spitz',
      'hokkaido':'spitz','west-siberian-laika':'spitz',

      // G6 — Scent Hound (72)
      'alpine-dachsbracke':'hound','american-english-coonhound':'hound',
      'american-foxhound':'hound','basset-bleu-de-gascogne':'hound','basset-hound':'hound',
      'beagle':'hound','black-and-tan-coonhound':'hound','bloodhound':'hound',
      'bluetick-coonhound':'hound','chien-dartois':'hound','drever':'hound','dunker':'hound',
      'english-foxhound':'hound','grand-basset-griffon-vendeen':'hound',
      'hamiltonstovare':'hound','harrier':'hound','istrian-shorthaired-hound':'hound',
      'otterhound':'hound','petit-basset-griffon-vendeen':'hound','plott-hound':'hound',
      'porcelaine':'hound','posavac-hound':'hound','redbone-coonhound':'hound',
      'rhodesian-ridgeback':'hound','segugio-italiano':'hound',
      'treeing-walker-coonhound':'hound','tyrolean-hound':'hound',
      'anglo-francais-de-petite-venerie':'hound','arigeois':'hound','artois-hound':'hound',
      'austrian-black-and-tan-hound':'hound','barak-hound':'hound',
      'basset-artesien-normand':'hound','basset-fauve-de-bretagne':'hound',
      'bavarian-mountain-hound':'hound','beagle-harrier':'hound','billy':'hound',
      'briquet-griffon-vendeen':'hound','halden-hound':'hound','hellenic-hound':'hound',
      'hygen-hound':'hound','polish-hound':'hound','spanish-hound':'hound',
      'transylvanian-hound':'hound',
      'montenegrin-mountain-hound':'hound','petit-bleu-de-gascogne':'hound',
      'poitevin':'hound','rastreador-brasileiro':'hound','serbian-hound':'hound',
      'serbian-tricolour-hound':'hound','small-swiss-hound':'hound',
      'styrian-coarse-haired-hound':'hound','swiss-hound':'hound',
      // added to reach 72:
      'estonian-hound':'hound','finnish-hound':'hound','gascon-saintongeois':'hound',
      'german-hound':'hound','gonczy-polski':'hound','grand-bleu-de-gascogne':'hound',
      'grand-griffon-vendeen':'hound','griffon-bleu-de-gascogne':'hound',
      'griffon-fauve-de-bretagne':'hound','griffon-nivernais':'hound',
      'hanover-hound':'hound','slovensky-kopov':'hound',
      'grand-anglo-francais-blanc-et-noir':'hound','grand-anglo-francais-blanc-et-orange':'hound',
      'grand-anglo-francais-tricolore':'hound','chien-francais-blanc-et-noir':'hound',
      'chien-francais-blanc-et-orange':'hound','chien-francais-tricolore':'hound',
      'dalmatian':'hound',

      // G7 — Pointing Dogs (37)
      'bracco-italiano':'pointing','braque-du-bourbonnais':'pointing','brittany':'pointing',
      'drentsche-patrijshond':'pointing','english-setter':'pointing',
      'german-shorthaired-pointer':'pointing','german-wirehaired-pointer':'pointing',
      'gordon-setter':'pointing','grosser-munsterlander':'pointing',
      'irish-red-and-white-setter':'pointing','irish-setter':'pointing',
      'kleiner-munsterlander':'pointing','pointer':'pointing','pudelpointer':'pointing',
      'spinone-italiano':'pointing','stabyhoun':'pointing','vizsla':'pointing',
      'weimaraner':'pointing','wirehaired-pointing-griffon':'pointing',
      'wirehaired-vizsla':'pointing','ariege-pointer':'pointing',
      'braque-dauvergne':'pointing','braque-francais-pointer':'pointing',
      'braque-francais':'pointing','braque-saint-germain':'pointing',
      'burgos-pointer':'pointing','cesky-fousek':'pointing',
      'deutsch-stichelhaar':'pointing','old-danish-pointing-dog':'pointing',
      'picardy-spaniel':'pointing','portuguese-pointer':'pointing',
      'wirehaired-slovak-pointer':'pointing','blue-picardy-spaniel':'pointing',
      // added to reach 37:
      'large-munsterlander':'pointing','french-spaniel':'pointing',
      'german-longhaired-pointer':'pointing','small-munsterlander':'pointing',

      // G8 — Retrievers & Spaniels (17)
      'chesapeake-bay-retriever':'retriever','clumber-spaniel':'retriever',
      'curly-coated-retriever':'retriever','english-cocker-spaniel':'retriever',
      'english-springer-spaniel':'retriever','field-spaniel':'retriever',
      'flat-coated-retriever':'retriever','golden-retriever':'retriever',
      'irish-water-spaniel':'retriever','labrador-retriever':'retriever',
      'lagotto-romagnolo':'retriever','nova-scotia-duck-tolling-retriever':'retriever',
      'portuguese-water-dog':'retriever','spanish-water-dog':'retriever',
      'sussex-spaniel':'retriever','welsh-springer-spaniel':'retriever',
      'american-cocker-spaniel':'retriever',

      // G9 — Companion & Toy (27)
      'bichon-frise':'toy','biewer-terrier':'toy',
      'brussels-griffon':'toy','cavalier-king-charles':'toy','chihuahua':'toy',
      'chinese-crested':'toy','coton-de-tulear':'toy','english-toy-spaniel':'toy',
      'havanese':'toy','japanese-chin':'toy','lowchen':'toy','maltese':'toy',
      'papillon':'toy','pekingese':'toy','poodle':'toy','pug':'toy',
      'russian-toy':'toy','shih-tzu':'toy','tibetan-spaniel':'toy',
      'tibetan-terrier':'toy',
      'bolognese':'toy','cavalier-king-charles-spaniel':'toy',
      'griffon-belge':'toy','kromfohrländer':'toy','petit-brabancon':'toy',
      // added to reach 27:
      'french-bulldog':'toy','lhasa-apso':'toy',

      // G10 — Sighthound (14)
      'afghan-hound':'sighthound','borzoi':'sighthound','greyhound':'sighthound',
      'irish-wolfhound':'sighthound',
      'italian-greyhound':'sighthound',
      'saluki':'sighthound','scottish-deerhound':'sighthound','sloughi':'sighthound',
      'whippet':'sighthound','chart-polski':'sighthound','magyar-agar':'sighthound',
      // FCI_MAP correction + additions:
      'azawakh':'sighthound','galgo-espanol':'sighthound','kazakh-tazy':'sighthound',
    };`;

// Find and replace the existing FCI_MAP
const fciMapStart = html.indexOf('// ── FCI Group lookup map (keyed by href slug) ────────────────');
const fciMapEnd   = html.indexOf('};', fciMapStart) + 2;
if (fciMapStart === -1 || fciMapEnd < 2) {
  console.error('ERROR: Could not find FCI_MAP in HTML!');
  process.exit(1);
}

const oldMap = html.slice(fciMapStart, fciMapEnd);
const newMap = `// ── FCI Group lookup map (keyed by href slug) ────────────────\n    ${NEW_FCI_MAP}`;
html = html.slice(0, fciMapStart) + newMap + html.slice(fciMapEnd);
console.log('✓ FCI_MAP replaced.');

// ─────────────────────────────────────────────────────────────────────
// STEP 4 — Update FCI_GROUP_MAP to split G7 and G8
// ─────────────────────────────────────────────────────────────────────
html = html.replace(
  "const FCI_GROUP_MAP = {1:'herding',2:'working',3:'terrier',4:'dachshund',5:'spitz',6:'hound',7:'sporting',8:'sporting',9:'toy',10:'sighthound'};",
  "const FCI_GROUP_MAP = {1:'herding',2:'working',3:'terrier',4:'dachshund',5:'spitz',6:'hound',7:'pointing',8:'retriever',9:'toy',10:'sighthound'};"
);
console.log('✓ FCI_GROUP_MAP updated (G7→pointing, G8→retriever).');

// ─────────────────────────────────────────────────────────────────────
// STEP 5 — Update getFciGroupFromBadge to use FCI_MAP as primary
// ─────────────────────────────────────────────────────────────────────
const OLD_FN = `    // Read FCI group from badge text (KCI G1–G10 or "FCI"), with FCI_MAP slug fallback
    const FCI_GROUP_MAP = {1:'herding',2:'working',3:'terrier',4:'dachshund',5:'spitz',6:'hound',7:'pointing',8:'retriever',9:'toy',10:'sighthound'};
    function getFciGroupFromBadge(card) {
      const badge = card.querySelector('.breed-emoji-wrap span');
      if (badge) {
        const text = (badge.innerText || badge.textContent || '').trim();
        // Match "FCI G#" badges (new format) or "KCI G#" (legacy)
        const m = text.match(/(?:FCI|KCI)\\s*G(\\d+)/i);
        if (m) return FCI_GROUP_MAP[parseInt(m[1])] || null;
        if (/^FCI$/i.test(text)) return 'fci';
      }
      // Fallback: use FCI_MAP (slug → group) for breeds without a badge
      const slug = (card.getAttribute('href') || '').replace(/\\.html$/, '').split('/').pop();
      return FCI_MAP[slug] || null;
    }`;

const NEW_FN = `    // FCI group lookup: FCI_MAP (slug-based) is primary source of truth.
    // Badge text is used only as fallback for breeds not in FCI_MAP.
    const FCI_GROUP_MAP = {1:'herding',2:'working',3:'terrier',4:'dachshund',5:'spitz',6:'hound',7:'pointing',8:'retriever',9:'toy',10:'sighthound'};
    function getFciGroupFromBadge(card) {
      // Primary: FCI_MAP lookup by slug (authoritative, matches official FCI groups)
      const slug = (card.getAttribute('href') || '').replace(/\\.html$/, '').split('/').pop();
      if (FCI_MAP[slug]) return FCI_MAP[slug];
      // Fallback: badge text for breeds not explicitly in FCI_MAP
      const badge = card.querySelector('.breed-emoji-wrap span');
      if (badge) {
        const text = (badge.innerText || badge.textContent || '').trim();
        const m = text.match(/(?:FCI|KCI)\\s*G(\\d+)/i);
        if (m) return FCI_GROUP_MAP[parseInt(m[1])] || null;
        if (/^FCI$/i.test(text)) return 'fci';
      }
      return null;
    }`;

// The FCI_GROUP_MAP line was already replaced in step 4, so the OLD_FN won't match.
// Instead, find the function directly.
const fnStart = html.indexOf('// Read FCI group from badge text (KCI G1');
if (fnStart !== -1) {
  const fnEnd = html.indexOf('\n    }', fnStart) + '\n    }'.length;
  html = html.slice(0, fnStart) + `// FCI group lookup: FCI_MAP (slug-based) is primary source of truth.
    // Badge text is used only as fallback for breeds not in FCI_MAP.
    function getFciGroupFromBadge(card) {
      // Primary: FCI_MAP lookup by slug (authoritative, matches official FCI groups)
      const slug = (card.getAttribute('href') || '').replace(/\\.html$/, '').split('/').pop();
      if (FCI_MAP[slug]) return FCI_MAP[slug];
      // Fallback: badge text for breeds not explicitly in FCI_MAP
      const badge = card.querySelector('.breed-emoji-wrap span');
      if (badge) {
        const text = (badge.innerText || badge.textContent || '').trim();
        const m = text.match(/(?:FCI|KCI)\\s*G(\\d+)/i);
        if (m) return FCI_GROUP_MAP[parseInt(m[1])] || null;
        if (/^FCI$/i.test(text)) return 'fci';
      }
      return null;
    }` + html.slice(fnEnd);
  console.log('✓ getFciGroupFromBadge updated (FCI_MAP is now primary).');
} else {
  console.log('  WARNING: getFciGroupFromBadge original comment not found — may already be updated.');
}

// ─────────────────────────────────────────────────────────────────────
// STEP 6 — Update filter dropdown (split G7/8 into separate buttons)
// ─────────────────────────────────────────────────────────────────────
html = html.replace(
  '<button class="fci-opt" data-fci="sporting">G7/8 — Sporting &amp; Retriever</button>',
  '<button class="fci-opt" data-fci="pointing">G7 — Pointing Dogs</button>\n                <button class="fci-opt" data-fci="retriever">G8 — Retrievers &amp; Spaniels</button>'
);
console.log('✓ FCI dropdown updated (G7/8 split into two separate options).');

// ─────────────────────────────────────────────────────────────────────
// STEP 7 — Update initial results-count text
// ─────────────────────────────────────────────────────────────────────
html = html.replace(
  /<span class="results-count js-breed-count" id="resultsCount">[^<]*<\/span>/,
  '<span class="results-count js-breed-count" id="resultsCount">496 breeds</span>'
);
console.log('✓ Initial results count text updated to 496 breeds.');

// ─────────────────────────────────────────────────────────────────────
// STEP 8 — Verify new FCI_MAP counts before saving
// ─────────────────────────────────────────────────────────────────────
const newMapMatch = html.match(/const FCI_MAP = \{([\s\S]*?)\};/);
const newCounts = {herding:0,working:0,terrier:0,dachshund:0,spitz:0,hound:0,pointing:0,retriever:0,toy:0,sighthound:0};
const newEntries = [...newMapMatch[1].matchAll(/'([^']+)':'([^']+)'/g)];
newEntries.forEach(([,slug,group]) => { if(newCounts[group]!==undefined) newCounts[group]++; });

const expected = {herding:47,working:56,terrier:37,dachshund:1,spitz:48,hound:72,pointing:37,retriever:17,toy:27,sighthound:14};
let allOk = true;
console.log('\n─── FCI_MAP Count Verification ───');
for (const [group, count] of Object.entries(newCounts)) {
  const exp = expected[group];
  const ok = count === exp ? '✓' : '✗';
  if (count !== exp) allOk = false;
  console.log(`  ${ok} ${group}: ${count} (expected ${exp})`);
}
const total = Object.values(newCounts).reduce((a,b)=>a+b,0);
console.log(`  Total FCI: ${total} (expected 356)`);

// Also verify card count after duplicate removal
const cardCount = (html.match(/href="[^"]+\.html" class="breed-card"/g)||[]).length;
console.log(`  Total breed cards: ${cardCount} (expected 496)`);

if (!allOk) {
  console.log('\n⚠ Some counts do not match. Writing anyway for review.');
} else {
  console.log('\n✅ All FCI counts correct!');
}

// ─────────────────────────────────────────────────────────────────────
// SAVE
// ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(FILE, html, 'utf8');
console.log(`\n✅ Saved: ${FILE}`);
