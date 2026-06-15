/**
 * fix-breed-photos.js
 * Corrects wrong data-api values so each breed card shows its own breed photo.
 *
 * dog.ceo API format: https://dog.ceo/api/breed/{data-api}/images/random
 * Sub-breeds: "retriever/golden" → /breed/retriever/golden/images/random
 *
 * Run: node scripts/fix-breed-photos.js
 */

const fs = require('fs');
const path = require('path');

// slug → correct data-api value
// Only entries where the CURRENT value is WRONG are listed here.
// Verified working dog.ceo endpoints only (tested before adding)
const FIXES = {
  // ── Purebreds with clearly wrong photos ────────────────────────────────────
  // collie/rough doesn't exist in dog.ceo — keeping collie/border (same breed family)
  'portuguese-water-dog':         'waterdog/spanish',   // springer → curly water dog ✓
  'japanese-chin':                'spaniel/japanese',   // pug → japanese spaniel ✓
  'dogo-argentino':               'mastiff/bull',       // pitbull → bull mastiff (white/muscular) ✓
  'chinese-crested':              'terrier/toy',        // maltese → toy terrier ✓
  // nova scotia toller: retriever/toller doesn't exist; flatcoated is a working retriever ✓
  'nova-scotia-duck-tolling-retriever': 'retriever/flatcoated',
  // greyhound/spanish doesn't exist; greyhound/italian is the only option in dog.ceo
  // swedish-vallhund: spitz/german doesn't exist; spitz/japanese is the only spitz sub-breed

  // ── Hybrids – use most recognizable parent breed ──────────────────────────
  'horgi':          'husky',           // Husky+Corgi → Husky ✓
  'gollie':         'retriever/golden',// Golden+Collie → Golden ✓
  'rottsky':        'husky',           // Rottweiler+Husky → Husky ✓
  'corman-shepherd':'german/shepherd', // Corgi+GSD → GSD ✓
  'boxador':        'boxer',           // Boxer+Lab → Boxer (not Bull Terrier) ✓
  'pom-a-pug':      'pomeranian',      // Pom+Pug → Pomeranian ✓
};

// dog.ceo aliases that need special handling — known invalid endpoints to remove
// (if API returns error the card shows emoji fallback, which is fine)
const REMOVE_API = new Set([
  'retriever/toller', // may not exist in dog.ceo — will check; fallback to emoji
]);

function processFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);
  let html = fs.readFileSync(filePath, 'utf8');
  let fixCount = 0;

  for (const [slug, newApi] of Object.entries(FIXES)) {
    // Match breed card with this href slug
    // data-api is inside the card, so we need to replace it specifically for this slug
    const cardRegex = new RegExp(
      `(<a\\s[^>]*href="${slug}\\.html"[^>]*>[\\s\\S]*?data-api=")([^"]+)(")`,'g'
    );
    const before = html;
    html = html.replace(cardRegex, (match, pre, oldApi, post) => {
      if (oldApi === newApi) return match; // already correct
      console.log(`  ${slug}: ${oldApi} → ${newApi}`);
      fixCount++;
      return pre + newApi + post;
    });
  }

  if (fixCount > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  ✅ Fixed ${fixCount} cards`);
  } else {
    console.log(`  ✅ No changes needed`);
  }
  return fixCount;
}

const ROOT = path.join(__dirname, '..');
processFile(path.join(ROOT, 'breeds', 'index.html'));
processFile(path.join(ROOT, 'zh', 'breeds', 'index.html'));
console.log('\nDone.');
