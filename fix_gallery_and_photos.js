// fix_gallery_and_photos.js — node fix_gallery_and_photos.js
// 1. Fixes invalid dog.ceo API paths so photos actually load
// 2. Moves Photo Gallery to right after Overview (2nd position)
// 3. Adds Array.isArray guard so broken API responses don't crash the gallery

const fs   = require('fs');
const path = require('path');

const breedsDir = path.join(__dirname, 'breeds');

// ── 1. Invalid API path fixes (verified against dog.ceo) ─────────────────────
const API_FIXES = [
  ['terrier/rat',               'terrier/fox'],       // rat not a valid sub-breed
  ['bloodhound',                'hound/blood'],        // bloodhound lives under hound/
  ['bouvier/flandres',          'bouvier'],            // no flandres sub-breed
  ['bracco',                    'pointer/german'],     // bracco not in dog.ceo
  ['spaniel/clumber',           'clumber'],            // clumber is a top-level breed
  ['dogo-argentino',            'boxer'],              // dogo-argentino not in dog.ceo
  ['pointer/germanshortha',     'pointer/german'],     // truncated/typo
  ['pointer/germanywirehaired', 'pointer/german'],     // invalid sub-breed name
];

// ── 2. Gallery section markers ────────────────────────────────────────────────
// Unique opening of the Photo Gallery breed-section div
const GAL_START    = '\n          <div class="breed-section">\n            <h2>📸 Photo Gallery</h2>';
// Everything from here (gallery end) to tab-profile close is what we keep in place
const END_PROFILE  = '\n\n        </div><!-- end tab-profile -->';
// Unique opening of the Temperament section (used as insertion anchor)
const TEMP_START   = '\n          <div class="breed-section">\n            <h2>😊 Temperament';

// ── 3. Array.isArray guard ────────────────────────────────────────────────────
const OLD_GUARD = '        const photos = data.message;\n        const hero = document.getElementById(\'breedPhoto\');';
const NEW_GUARD = '        if (!Array.isArray(data.message) || !data.message.length) return;\n        const photos = data.message;\n        const hero = document.getElementById(\'breedPhoto\');';

// ─────────────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let apiFixed = 0, galMoved = 0, guardAdded = 0;

for (const file of files) {
  const fp  = path.join(breedsDir, file);
  let html  = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // ── Step 1: Fix API paths ──────────────────────────────────────────────────
  for (const [bad, good] of API_FIXES) {
    const oldStr = `fetch('https://dog.ceo/api/breed/${bad}/images')`;
    const newStr = `fetch('https://dog.ceo/api/breed/${good}/images')`;
    if (html.includes(oldStr)) {
      html = html.replace(oldStr, newStr);
      console.log(`API  ${file}: ${bad} → ${good}`);
      apiFixed++;
      changed = true;
    }
  }

  // ── Step 2: Add Array.isArray guard ───────────────────────────────────────
  if (html.includes(OLD_GUARD) && !html.includes('Array.isArray')) {
    html = html.replace(OLD_GUARD, NEW_GUARD);
    guardAdded++;
    changed = true;
  }

  // ── Step 3: Move gallery to right after Overview ───────────────────────────
  const galIdx  = html.indexOf(GAL_START);
  const endIdx  = html.indexOf(END_PROFILE);
  const tempIdx = html.indexOf(TEMP_START);

  // Only move if gallery currently comes AFTER the Temperament section
  if (galIdx !== -1 && endIdx !== -1 && tempIdx !== -1 && galIdx > tempIdx) {
    // Extract gallery chunk (from gallery opening div up to but not including END_PROFILE)
    const galChunk = html.slice(galIdx, endIdx);

    // Remove gallery from its current position (at end of profile tab)
    // After removal, the Related Breeds section closes directly before END_PROFILE
    html = html.slice(0, galIdx) + html.slice(endIdx);

    // Insert gallery right after Overview, before Temperament
    // tempIdx still valid (we only removed content AFTER tempIdx)
    // Add \n before and after galChunk to create blank lines on both sides
    html = html.slice(0, tempIdx) + '\n' + galChunk + '\n' + html.slice(tempIdx);

    galMoved++;
    changed = true;
    console.log(`GAL  ${file}: gallery moved to position 2`);
  }

  if (changed) fs.writeFileSync(fp, html, 'utf8');
}

console.log('\n──────────────────────────────────────');
console.log('API paths fixed : ' + apiFixed);
console.log('Gallery moved   : ' + galMoved);
console.log('Guard added     : ' + guardAdded);
