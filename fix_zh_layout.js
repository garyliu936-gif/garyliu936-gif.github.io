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

    // Fix 1: Remove extra <div class="container"> between ga-wrap and ga-layout
    if (html.includes('<div class="ga-wrap"><div class="container"><div class="ga-layout">')) {
      html = html.replace(
        '<div class="ga-wrap"><div class="container"><div class="ga-layout">',
        '<div class="ga-wrap"><div class="ga-layout">'
      );
      // Also fix the corresponding triple closing tags at end (after footer)
      // The closing for ga-layout + container + ga-wrap
      // Pattern: </div></div></div>\n\n  <footer
      // After fix: </div></div>\n\n  <footer
      // Be careful: only reduce by one </div> for the removed container
      html = html.replace(
        /(<\/aside>\s*\n?\s*)<\/div><\/div><\/div>/,
        '$1</div></div>'
      );
      changed = true;
    }

    // Fix 2: <nav class="ga-breadcrumb"> -> <div class="ga-breadcrumb">
    if (html.includes('<nav class="ga-breadcrumb">')) {
      // Replace opening tag - but only within hero section (not navbar)
      html = html.replace(/<nav class="ga-breadcrumb">/g, '<div class="ga-breadcrumb">');
      // Replace the corresponding closing </nav> that follows (the breadcrumb nav close)
      // It's always before </div> (closing the container in hero)
      // We need to be careful not to replace the main navbar's </nav>
      // The breadcrumb is inside .ga-hero .container, so its </nav> comes before the h1
      // Pattern: </nav>\n      <div class="ga-hero-tag">  OR  </nav>\n  <div class="ga-hero-tag">
      html = html.replace(/(class="ga-breadcrumb"[^<]*(?:<a[^<]*<\/a>|<span>[^<]*<\/span>|[^<])*)<\/nav>/g, '$1</div>');
      changed = true;
    }

    // Fix 3: <h4> -> <h3> in sidebar only
    if (html.includes('class="ga-sidebar"')) {
      // Replace h4 inside ga-sidebar section
      const sidebarMatch = html.match(/class="ga-sidebar"[\s\S]*?<\/aside>/);
      if (sidebarMatch) {
        const before = html.indexOf(sidebarMatch[0]);
        const after = before + sidebarMatch[0].length;
        const sidebarSection = sidebarMatch[0]
          .replace(/<h4>/g, '<h3>')
          .replace(/<\/h4>/g, '</h3>');
        html = html.slice(0, before) + sidebarSection + html.slice(after);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(fp, html, 'utf8');
      console.log('Fixed: zh/' + dir + '/' + file);
      fixed++;
    } else {
      skipped++;
    }
  }
}

console.log(`\nDone: ${fixed} files fixed, ${skipped} skipped.`);
