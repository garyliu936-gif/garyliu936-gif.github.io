/**
 * fix-profile-photos.js
 * Fixes wrong dog.ceo API breed paths in individual breed profile pages.
 * Pattern in each page: fetch('https://dog.ceo/api/breed/BREED/images')
 *
 * Run: node scripts/fix-profile-photos.js
 */

const fs = require('fs');
const path = require('path');

// slug (filename without .html) → correct dog.ceo breed path
// Only entries where the current path is wrong or broken
const FIXES = {
  // ── Broken endpoint: 'germanshepherd' is not valid, must be 'german/shepherd' ──
  'akita-shepherd':        'german/shepherd',
  'berger-blanc-suisse':   'german/shepherd',
  'bohemian-shepherd':     'german/shepherd',
  'karst-shepherd':        'german/shepherd',
  'saarlos-wolfdog':       'german/shepherd',
  'czechoslovakian-wolfdog': 'german/shepherd',

  // ── Wrong breed shown ─────────────────────────────────────────────────────
  'portuguese-water-dog':  'waterdog/spanish',   // was springer/english
  'dogo-argentino':        'mastiff/bull',        // was boxer
  'japanese-chin':         'spaniel/japanese',    // was pug
  'chinese-crested':       'terrier/toy',         // was maltese
  'caucasian-shepherd-dog': 'ovcharka',           // was malamute — dog.ceo ovcharka = Caucasian Ovcharka ✓
  'anatolian-shepherd-dog': 'mastiff',            // was malamute — Anatolian is large mastiff-type LGD
  'spanish-hound':         'hound',               // was bloodhound — too different
  'nova-scotia-duck-tolling-retriever': 'retriever/flatcoated', // was retriever/golden
};

const breedsDir = path.join(__dirname, '..', 'breeds');
let totalFixed = 0;
let totalFiles = 0;

for (const [slug, correctBreed] of Object.entries(FIXES)) {
  const filePath = path.join(breedsDir, `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${slug}.html`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Match the fetch URL: fetch('https://dog.ceo/api/breed/ANYTHING/images')
  // Also handles double-quotes and template literals
  const fetchRegex = /fetch\(`https:\/\/dog\.ceo\/api\/breed\/([^/`'"]+(?:\/[^/`'"]+)?)\/(images)`\)/g;
  const fetchRegex2 = /fetch\('https:\/\/dog\.ceo\/api\/breed\/([^/'"]+(?:\/[^/'"]+)?)\/images'\)/g;

  const oldBreed1 = (html.match(fetchRegex) || [''])[0].match(/breed\/([^/`'"]+(?:\/[^/`'"]+)?)\/images/);
  const currentBreed = oldBreed1 ? oldBreed1[1] : '?';

  if (currentBreed === correctBreed) {
    console.log(`  ✅ ${slug}: already correct (${correctBreed})`);
    continue;
  }

  const newHtml = html
    .replace(
      /fetch\(`https:\/\/dog\.ceo\/api\/breed\/[^`]+\/images`\)/g,
      `fetch(\`https://dog.ceo/api/breed/${correctBreed}/images\`)`
    )
    .replace(
      /fetch\('https:\/\/dog\.ceo\/api\/breed\/[^']+\/images'\)/g,
      `fetch('https://dog.ceo/api/breed/${correctBreed}/images')`
    );

  if (newHtml !== html) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log(`  ✅ ${slug}: ${currentBreed} → ${correctBreed}`);
    totalFixed++;
  } else {
    console.log(`  ❓ ${slug}: pattern not matched (current: ${currentBreed})`);
  }
  totalFiles++;
}

console.log(`\nDone. Fixed ${totalFixed} / ${totalFiles} pages.`);
