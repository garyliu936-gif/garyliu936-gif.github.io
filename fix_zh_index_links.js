const fs = require('fs');
const path = require('path');

// Fix all zh/*/index.html files:
// 1. Navbar links: /section/... -> /zh/section/...  and /index.html -> /zh/index.html
// 2. Article card links: href="/section/article.html -> href="/zh/section/article.html

const sections = ['getting-a-dog', 'training', 'health', 'nutrition', 'grooming'];
const base = path.join(__dirname, 'zh');

let fixed = 0;

for (const dir of sections) {
  const fp = path.join(base, dir, 'index.html');
  if (!fs.existsSync(fp)) continue;

  let html = fs.readFileSync(fp, 'utf8');
  const original = html;

  // Fix navbar: all nav-links hrefs that point to English pages
  // Pattern: these appear in <ul class="nav-links"...>...</ul>
  // We'll do targeted replacements for known nav hrefs

  const navReplacements = [
    [/(<li><a href=")\/index\.html(")/g,                           '$1/zh/index.html$2'],
    [/(<li><a href=")\/breeds\/index\.html(")/g,                   '$1/zh/breeds/index.html$2'],
    [/(<li><a href=")\/getting-a-dog\/index\.html(")/g,            '$1/zh/getting-a-dog/index.html$2'],
    [/(<li><a href=")\/training\/index\.html(")/g,                 '$1/zh/training/index.html$2'],
    [/(<li><a href=")\/health\/index\.html(")/g,                   '$1/zh/health/index.html$2'],
    [/(<li><a href=")\/nutrition\/index\.html(")/g,                '$1/zh/nutrition/index.html$2'],
    [/(<li><a href=")\/grooming\/index\.html(")/g,                 '$1/zh/grooming/index.html$2'],
    // with style attribute
    [/(<li><a href=")\/index\.html(" style)/g,                     '$1/zh/index.html$2'],
    [/(<li><a href=")\/breeds\/index\.html(" style)/g,             '$1/zh/breeds/index.html$2'],
    [/(<li><a href=")\/getting-a-dog\/index\.html(" style)/g,      '$1/zh/getting-a-dog/index.html$2'],
    [/(<li><a href=")\/training\/index\.html(" style)/g,           '$1/zh/training/index.html$2'],
    [/(<li><a href=")\/health\/index\.html(" style)/g,             '$1/zh/health/index.html$2'],
    [/(<li><a href=")\/nutrition\/index\.html(" style)/g,          '$1/zh/nutrition/index.html$2'],
    [/(<li><a href=")\/grooming\/index\.html(" style)/g,           '$1/zh/grooming/index.html$2'],
  ];

  for (const [pattern, replacement] of navReplacements) {
    html = html.replace(pattern, replacement);
  }

  // Fix logo link: href="/index.html" -> href="/zh/index.html" (nav-logo only)
  html = html.replace(
    /(<a href=")\/index\.html(" class="nav-logo")/g,
    '$1/zh/index.html$2'
  );

  // Fix article card links: href="/SECTION/article.html" -> href="/zh/SECTION/article.html"
  // Only for gi-card links (article cards), not hreflang or language banner
  html = html.replace(
    /(<a href=")\/([a-z-]+\/[a-z-]+\.html)(" class="gi-card")/g,
    (match, p1, p2, p3) => {
      // Don't double-add /zh/
      if (p2.startsWith('zh/')) return match;
      return `${p1}/zh/${p2}${p3}`;
    }
  );

  if (html !== original) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log(`Fixed: zh/${dir}/index.html`);
    fixed++;
  } else {
    console.log(`Skipped (no changes): zh/${dir}/index.html`);
  }
}

console.log(`\nDone: ${fixed} files fixed.`);
