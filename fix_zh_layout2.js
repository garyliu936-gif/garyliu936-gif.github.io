const fs = require('fs');
const path = require('path');

const dirs = ['getting-a-dog', 'training', 'health', 'nutrition', 'grooming'];
const base = path.join(__dirname, 'zh');

let fixed = 0;
let skipped = 0;

for (const dir of dirs) {
  const folder = path.join(base, dir);
  if (!fs.existsSync(folder)) continue;

  const files = fs.readdirSync(folder).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const fp = path.join(folder, file);
    let html = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // Restore: <div class="ga-wrap"><div class="ga-layout"> -> add container back
    if (html.includes('<div class="ga-wrap"><div class="ga-layout">')) {
      html = html.replace(
        '<div class="ga-wrap"><div class="ga-layout">',
        '<div class="ga-wrap"><div class="container"><div class="ga-layout">'
      );
      // Fix corresponding closing tags: </div></div> -> </div></div></div>
      html = html.replace(
        /(<\/aside>\s*\n?\s*)<\/div><\/div>/,
        '$1</div></div></div>'
      );
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(fp, html, 'utf8');
      console.log('Restored: zh/' + dir + '/' + file);
      fixed++;
    } else {
      skipped++;
    }
  }
}

console.log(`\nDone: ${fixed} files restored, ${skipped} skipped.`);
