// fix_breeds_layout.js
// 1. Moves misplaced breed cards from the hero section into the breeds grid
// 2. Sorts all 40 cards by popularity (AKC rank for purebreds, hybrid rank for hybrids)
// 3. Adds a rank number badge to every card

const fs = require('fs');

let html = fs.readFileSync('breeds/index.html', 'utf8').replace(/\r\n/g, '\n');

// ── RANK TABLES ───────────────────────────────────────────────────────────────
// AKC 2023-2024 popularity rank for every purebred on the site
const PUREBRED_RANK = {
  'french-bulldog':             { n: 1,  badge: '#1'  },
  'labrador-retriever':         { n: 2,  badge: '#2'  },
  'golden-retriever':           { n: 3,  badge: '#3'  },
  'german-shepherd':            { n: 4,  badge: '#4'  },
  'bulldog':                    { n: 5,  badge: '#5'  },
  'poodle':                     { n: 6,  badge: '#6'  },
  'beagle':                     { n: 7,  badge: '#7'  },
  'rottweiler':                 { n: 8,  badge: '#8'  },
  'german-shorthaired-pointer': { n: 9,  badge: '#9'  },
  'dachshund':                  { n: 10, badge: '#10' },
  'pembroke-welsh-corgi':       { n: 11, badge: '#11' },
  'corgi':                      { n: 11, badge: '#11' },
  'doberman-pinscher':          { n: 12, badge: '#12' },
  'yorkshire-terrier':          { n: 13, badge: '#13' },
  'siberian-husky':             { n: 14, badge: '#14' },
  'boxer':                      { n: 15, badge: '#15' },
  'cavalier-king-charles':      { n: 16, badge: '#16' },
  'great-dane':                 { n: 17, badge: '#17' },
  'miniature-schnauzer':        { n: 18, badge: '#18' },
  'shih-tzu':                   { n: 19, badge: '#19' },
  'boston-terrier':             { n: 20, badge: '#20' },
  'bernese-mountain-dog':       { n: 21, badge: '#21' },
  'pomeranian':                 { n: 22, badge: '#22' },
  'cane-corso':                 { n: 23, badge: '#23' },
  'chihuahua':                  { n: 24, badge: '#24' },
  'australian-shepherd':        { n: 25, badge: '#25' },
  'havanese':                   { n: 26, badge: '#26' },
  'border-collie':              { n: 27, badge: '#27' },
  'maltese':                    { n: 28, badge: '#28' },
  'dalmatian':                  { n: 29, badge: '#29' },
};

// Hybrid popularity rank (no AKC recognition — ranked by search/sales volume)
const HYBRID_RANK = {
  'goldendoodle':  { n: 1,  badge: '#1'  },
  'labradoodle':   { n: 2,  badge: '#2'  },
  'cockapoo':      { n: 3,  badge: '#3'  },
  'cavapoo':       { n: 4,  badge: '#4'  },
  'maltipoo':      { n: 5,  badge: '#5'  },
  'bernedoodle':   { n: 6,  badge: '#6'  },
  'aussiedoodle':  { n: 7,  badge: '#7'  },
  'pomsky':        { n: 8,  badge: '#8'  },
  'schnoodle':     { n: 9,  badge: '#9'  },
  'yorkipoo':      { n: 10, badge: '#10' },
  'shorkie':       { n: 11, badge: '#11' },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function getSlug(c) {
  const m = c.match(/href="([^"]+)"/);
  return m ? m[1].replace(/.*\//, '').replace('.html', '') : '';
}
function isHybrid(c) { return /data-type="hybrid"/.test(c); }
function sortKey(c) {
  const slug = getSlug(c);
  if (isHybrid(c)) { const r = HYBRID_RANK[slug]; return 1000 + (r ? r.n : 99); }
  const r = PUREBRED_RANK[slug]; return r ? r.n : 500;
}
function addBadge(c) {
  const slug = getSlug(c);
  const h = isHybrid(c);
  const info = h ? HYBRID_RANK[slug] : PUREBRED_RANK[slug];
  if (!info) { console.warn('  ⚠️  No rank entry for slug:', slug); return c; }
  const bg = h ? '#f59e0b' : '#0d9488'; // amber for hybrid, teal for purebred
  const badge = `<span style="position:absolute;top:8px;left:8px;background:${bg};color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">${info.badge}</span>`;
  // Insert immediately inside the breed-emoji-wrap div (before existing img/emoji)
  return c.replace(/(<div class="breed-emoji-wrap"[^>]*>)/, `$1${badge}`);
}

// ── STEP 1: EXTRACT ALL 40 BREED CARDS FROM THE FILE ─────────────────────────
const cards = [];
let pos = 0;
while (pos < html.length) {
  const s = html.indexOf('<a ', pos);
  if (s === -1) break;
  const te = html.indexOf('>', s);
  if (te === -1) { pos = s + 1; continue; }
  const openTag = html.substring(s, te + 1);
  if (openTag.includes('class="breed-card"')) {
    const e = html.indexOf('</a>', te) + 4;
    cards.push(html.substring(s, e));
    pos = e;
  } else {
    pos = te + 1;
  }
}
console.log(`\n📦 Extracted ${cards.length} breed cards total`);
console.log(`   Purebreds: ${cards.filter(c => !isHybrid(c)).length}`);
console.log(`   Hybrids:   ${cards.filter(isHybrid).length}`);

// ── STEP 2: ADD RANK BADGES AND SORT ─────────────────────────────────────────
const sorted = cards.map(addBadge).sort((a, b) => sortKey(a) - sortKey(b));

console.log('\n📋 Final card order:');
sorted.forEach((c, i) => {
  const slug = getSlug(c);
  const h = isHybrid(c);
  const info = h ? HYBRID_RANK[slug] : PUREBRED_RANK[slug];
  console.log(`  ${String(i+1).padStart(2)}. [${h ? 'HYBRID' : 'BREED '}] ${slug.padEnd(30)} rank ${info ? info.badge : '?'}`);
});

// ── STEP 3: FIX THE HERO SECTION (remove misplaced cards) ────────────────────
// The search input ends with />  Everything between that and <!-- FILTER BAR -->
// is misplaced breed cards — replace it with just the closing div tags.
const searchEnd = html.indexOf('/>', html.indexOf('id="breedSearch"')) + 2;
const filterBarPos = html.indexOf('<!-- FILTER BAR -->');
if (filterBarPos === -1) throw new Error('Could not find <!-- FILTER BAR --> marker');

html = html.substring(0, searchEnd) +
  '\n      </div>\n    </div>\n  </section>\n\n  ' +
  html.substring(filterBarPos);

console.log('\n✅ Hero section cleaned (misplaced cards removed)');

// ── STEP 4: REPLACE BREEDS-GRID CONTENT WITH SORTED CARDS ────────────────────
const GRID_OPEN = '<div class="breeds-grid" id="breedsGrid">';
const gridOpenPos = html.indexOf(GRID_OPEN);
if (gridOpenPos === -1) throw new Error('Could not find breeds-grid div');
const gridContentStart = gridOpenPos + GRID_OPEN.length;

const noResultsPos = html.indexOf('<div class="no-results"', gridContentStart);
if (noResultsPos === -1) throw new Error('Could not find no-results div');

// Build the sorted cards block (each card on its own, separated by blank lines)
const cardsBlock = sorted.join('\n\n');

html = html.substring(0, gridContentStart) +
  '\n\n' + cardsBlock + '\n\n        ' +
  html.substring(noResultsPos);

console.log('✅ Breeds grid rebuilt with all', sorted.length, 'cards in rank order');

// ── WRITE FILE ────────────────────────────────────────────────────────────────
fs.writeFileSync('breeds/index.html', html, 'utf8');
console.log('\n🎉 breeds/index.html saved successfully!\n');
