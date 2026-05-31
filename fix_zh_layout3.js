const fs = require('fs');
const path = require('path');

const dirs = ['getting-a-dog', 'training', 'health', 'nutrition', 'grooming'];
const base = path.join(__dirname, 'zh');

let fixed = 0;

for (const dir of dirs) {
  const folder = path.join(base, dir);
  if (!fs.existsSync(folder)) continue;

  const files = fs.readdirSync(folder).filter(f => f.endsWith('.html'));

  for (const file of files) {
    const fp = path.join(folder, file);
    let html = fs.readFileSync(fp, 'utf8');
    let changed = false;

    // Fix 1: Restore <h3> -> <h4> inside .ga-sidebar ONLY
    // (CSS is .ga-scard h4, not h3)
    const sidebarIdx = html.indexOf('class="ga-sidebar"');
    const asideEnd = html.indexOf('</aside>', sidebarIdx);
    if (sidebarIdx !== -1 && asideEnd !== -1) {
      const before = html.slice(0, sidebarIdx);
      const sidebar = html.slice(sidebarIdx, asideEnd + 8);
      const after = html.slice(asideEnd + 8);
      const fixed_sidebar = sidebar
        .replace(/<h3>/g, '<h4>')
        .replace(/<\/h3>/g, '</h4>');
      if (fixed_sidebar !== sidebar) {
        html = before + fixed_sidebar + after;
        changed = true;
      }
    }

    // Fix 2: Restore <div class="ga-breadcrumb"> -> <nav class="ga-breadcrumb">
    // in the hero section only (not elsewhere)
    if (html.includes('<div class="ga-breadcrumb">')) {
      html = html.replace(/<div class="ga-breadcrumb">/g, '<nav class="ga-breadcrumb">');
      // Replace the corresponding closing </div> that closes the breadcrumb
      // Pattern: the breadcrumb content ends before the ga-hero-tag div
      html = html.replace(
        /(<nav class="ga-breadcrumb">[\s\S]*?)<\/div>(\s*\n?\s*<div class="ga-hero-tag">)/,
        '$1</nav>$2'
      );
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(fp, html, 'utf8');
      console.log('Fixed: zh/' + dir + '/' + file);
      fixed++;
    }
  }
}

console.log(`\nDone: ${fixed} files fixed.`);
