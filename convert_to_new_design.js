// convert_to_new_design.js — node convert_to_new_design.js
// Converts all BestPetSite breed pages to the AllDogFacts (English Bulldog) design
const fs = require('fs');
const path = require('path');

const breedsDir = path.join(__dirname, 'breeds');

// ─── Utility: extract inner HTML of a div identified by a string marker ───────
// Uses div-depth tracking so nested divs don't confuse the boundary detection.
function getInnerHtml(html, marker) {
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return '';

  // Walk forward to find the '>' that closes the opening tag containing the marker
  const tagEnd = html.indexOf('>', markerIdx);
  if (tagEnd === -1) return '';
  const contentStart = tagEnd + 1;

  let depth = 1;
  let pos = contentStart;

  while (pos < html.length && depth > 0) {
    const nextOpen  = html.indexOf('<div', pos);
    const nextClose = html.indexOf('</div>', pos);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) return html.slice(contentStart, nextClose).trim();
      pos = nextClose + 6;
    }
  }
  return html.slice(contentStart).trim();
}

// ─── Simple regex helper ───────────────────────────────────────────────────────
function rx(html, pattern, def = '') {
  const m = html.match(pattern);
  return m ? m[1].trim() : def;
}

// ─── Convert width% to x/5 label ─────────────────────────────────────────────
function pctToScore(pct) {
  const n = parseInt(pct) || 0;
  if (n >= 90) return '5/5';
  if (n >= 70) return '4/5';
  if (n >= 50) return '3/5';
  if (n >= 30) return '2/5';
  return '1/5';
}

// ─── Convert old trait-bars HTML → new sidebar trait-item HTML ────────────────
function convertTraits(traitBarsHtml) {
  if (!traitBarsHtml) return '';
  const re = /<div class="trait">\s*<span class="trait-name">(.*?)<\/span>\s*<div class="bar">\s*<div class="bar-fill" style="width:(\d+)%"[^>]*>\s*<\/div>\s*<\/div>\s*<\/div>/g;
  let items = '';
  let m;
  while ((m = re.exec(traitBarsHtml)) !== null) {
    const name = m[1];
    const pct  = m[2];
    items += `\n            <div class="trait-item"><div class="trait-header"><span>${name}</span><span>${pctToScore(pct)}</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:${pct}%"></div></div></div>`;
  }
  return items;
}

// ─── Convert old quick-facts-card → new info-box HTML ────────────────────────
function convertQuickFacts(sidebarHtml) {
  if (!sidebarHtml) return '';
  const ulM = sidebarHtml.match(/<ul>([\s\S]*?)<\/ul>/);
  if (!ulM) return '';

  const liRe = /<li>\s*<strong>(.*?):?<\/strong>\s*([\s\S]*?)<\/li>/g;
  let items = '';
  let first = true;
  let m;
  while ((m = liRe.exec(ulM[1])) !== null) {
    const label = m[1].trim().replace(/:$/, '');
    const value = m[2].trim().replace(/<[^>]+>/g, '');
    if (!label) continue;
    items += `\n          <div class="info-box"${first ? '' : ' style="margin-top:8px"'}><div class="info-box-label">${label}</div><div class="info-box-value">${value}</div></div>`;
    first = false;
  }
  return items;
}

// ─── Process profile-main content: strip traits & gallery, return clean overview
function processProfileMain(mainHtml) {
  if (!mainHtml) return { overviewContent: '', traitBarsHtml: '' };

  // Extract trait-bars inner HTML (before we cut it out)
  let traitBarsHtml = '';
  if (mainHtml.includes('class="trait-bars"')) {
    traitBarsHtml = getInnerHtml(mainHtml, 'class="trait-bars"');
  }

  // Cut everything from <h3>Personality Traits</h3> onwards
  let overview = mainHtml;
  const persIdx = overview.indexOf('<h3>Personality Traits</h3>');
  if (persIdx !== -1) overview = overview.slice(0, persIdx);

  // Also cut <h3>Photo Gallery</h3> if it somehow appears before traits
  const gallIdx = overview.indexOf('<h3>Photo Gallery</h3>');
  if (gallIdx !== -1) overview = overview.slice(0, gallIdx);

  return { overviewContent: overview.trim(), traitBarsHtml };
}

// ─── Build new AllDogFacts page ───────────────────────────────────────────────
function buildNewPage(d) {
  const {
    breedName, metaTitle, metaDesc, breedEmoji, apiPath, subtitle,
    weight, height, lifespan, energy,
    overviewContent, traitItemsHtml, quickFactsHtml,
    dietHtml, costHtml, mixesHtml, factsHtml
  } = d;

  const newTitle = metaTitle
    .replace('| BestPetSite', '| AllDogFacts')
    .replace('– Breed Profile', '— Breed Profile, Temperament, Care & Health');

  // Sidebar trait card: show even if empty so card still appears
  const traitCard = traitItemsHtml
    ? `        <div class="sidebar-card">
          <h4>Breed Traits</h4>
          <div class="trait-row">${traitItemsHtml}
          </div>
        </div>`
    : '';

  // Quick facts card
  const qfCard = quickFactsHtml
    ? `        <div class="sidebar-card">
          <h4>Quick Facts</h4>${quickFactsHtml}
        </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C8QDN9HH5F');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${newTitle}</title>
  <meta name="description" content="${metaDesc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/breeds.css" />
</head>
<body>

  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Home</a></li>
        <li><a href="/breeds/index.html" style="color:var(--teal)">Dog Breeds</a></li>
        <li><a href="/getting-a-dog/index.html">Getting a Dog</a></li>
        <li><a href="/training/index.html">Training</a></li>
        <li><a href="/health/index.html">Health</a></li>
        <li><a href="/nutrition/index.html">Nutrition</a></li>
      </ul>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <section class="breed-page-hero">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a><span>›</span>
        <a href="index.html">Dog Breeds</a><span>›</span>
        <span style="color:rgba(255,255,255,.8)">${breedName}</span>
      </div>
      <div class="breed-hero-layout">
        <div class="breed-hero-emoji" id="breedPhotoWrap">
          <img class="breed-hero-real-photo" id="breedPhoto" alt="${breedName}" />
          <span class="breed-emoji-fallback" id="breedEmoji">${breedEmoji}</span>
        </div>
        <div class="breed-hero-text">
          <h1>${breedName}</h1>
          <p class="breed-subtitle">${subtitle}</p>
          <div class="breed-quick-stats">
            <div class="quick-stat"><span class="quick-stat-value">${weight}</span><span class="quick-stat-label">Weight</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${height}</span><span class="quick-stat-label">Height</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${lifespan}</span><span class="quick-stat-label">Lifespan</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${energy}</span><span class="quick-stat-label">Energy</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="breed-content-wrap">
      <div class="breed-main">

        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">

          <div class="breed-section">
            ${overviewContent}
          </div>

          <div class="breed-section">
            <h2>📸 Photo Gallery</h2>
            <p>Real ${breedName}s — browse photos showcasing their look, size, and personality.</p>
            <div class="breed-gallery" id="breedGallery">
              <img class="gallery-photo" id="gp1" alt="${breedName} photo 1" />
              <img class="gallery-photo" id="gp2" alt="${breedName} photo 2" />
              <img class="gallery-photo" id="gp3" alt="${breedName} photo 3" />
              <img class="gallery-photo" id="gp4" alt="${breedName} photo 4" />
              <img class="gallery-photo" id="gp5" alt="${breedName} photo 5" />
              <img class="gallery-photo" id="gp6" alt="${breedName} photo 6" />
            </div>
          </div>

        </div><!-- end tab-profile -->

        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            ${dietHtml}
          </div>
        </div><!-- end tab-diet -->

        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            ${costHtml}
          </div>
        </div><!-- end tab-cost -->

        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            ${mixesHtml}
          </div>
        </div><!-- end tab-mixes -->

        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            ${factsHtml}
          </div>
        </div><!-- end tab-facts -->

      </div>

      <aside class="breed-sidebar">
${traitCard}
        <div class="sidebar-card" style="background:var(--teal-light); border-color:var(--teal)">
          <h4 style="color:var(--teal-dark)">Explore More Breeds</h4>
          <p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">Browse our full directory of dog breeds with detailed profiles.</p>
          <a href="/breeds/index.html" style="display:block; text-align:center; background:var(--teal); color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:.88rem;">Browse All Breeds →</a>
        </div>
${qfCard}
      </aside>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div><p>Your complete guide to dog breeds, pet boarding in Seattle, and nationwide pet transportation.</p></div>
        <div class="footer-col"><h4>More Breeds</h4><ul><li><a href="golden-retriever.html">Golden Retriever</a></li><li><a href="labrador-retriever.html">Labrador Retriever</a></li><li><a href="german-shepherd.html">German Shepherd</a></li><li><a href="index.html">All Breeds →</a></li></ul></div>
        <div class="footer-col"><h4>Our Services</h4><ul><li><a href="https://www.pawsvip.com" target="_blank">Pet Hotel Seattle</a></li><li><a href="../index.html#transport">Nationwide Transport</a></li><li><a href="../index.html#contact">Get a Quote</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div>
    </div>
  </footer>

  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <button class="lightbox-prev" id="lightboxPrev">&#9664;</button>
    <img id="lightboxImg" src="" alt="Enlarged ${breedName} photo" />
    <button class="lightbox-next" id="lightboxNext">&#9654;</button>
  </div>

  <script src="../js/main.js"></script>
  <script>
    document.querySelectorAll('.breed-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.breed-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.breed-tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
        document.querySelector('.breed-tabs-nav').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  </script>
  <script>
    let galleryPhotos = [];
    let currentPhotoIndex = 0;

    fetch('https://dog.ceo/api/breed/${apiPath}/images')
      .then(r => r.json())
      .then(data => {
        const photos = data.message;
        const hero = document.getElementById('breedPhoto');
        hero.src = photos[2] || photos[0];
        hero.onload = () => { hero.style.display = 'block'; document.getElementById('breedEmoji').style.display = 'none'; };
        const picks = [5, 15, 25, 35, 45, 55];
        picks.forEach((index, i) => {
          const el = document.getElementById('gp' + (i + 1));
          const src = photos[index] || photos[i] || photos[0];
          if (el && src) { galleryPhotos.push(src); el.src = src; el.addEventListener('click', () => openLightbox(i)); }
        });
      }).catch(() => {});

    function openLightbox(index) { currentPhotoIndex = index; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; document.getElementById('lightbox').classList.add('open'); }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('open')) return;
      if (e.key === 'ArrowLeft') { currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'ArrowRight') { currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'Escape') { closeLightbox(); }
    });
  </script>
</body>
</html>`;
}

// ─── Convert a single page ────────────────────────────────────────────────────
function convertPage(html, filename) {
  const breedName = rx(html, /<h1>(.*?)<\/h1>/) ||
                    filename.replace('.html','').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());

  const metaTitle = rx(html, /<title>(.*?)<\/title>/, breedName + ' – Breed Profile | BestPetSite');
  const metaDesc  = rx(html, /<meta name="description" content="([^"]*)"/, '');

  // Emoji — from id="breedEmoji" span content
  const emojiM  = html.match(/id="breedEmoji"[^>]*>(.*?)<\/span>/);
  const breedEmoji = emojiM ? emojiM[1] : '🐕';

  // Quick stats (stat-icon / stat-label / stat-value pattern)
  const weight   = rx(html, /Weight<\/span><span class="stat-value">(.*?)<\/span>/);
  const height   = rx(html, /Height<\/span><span class="stat-value">(.*?)<\/span>/);
  const lifespan = rx(html, /Lifespan<\/span><span class="stat-value">(.*?)<\/span>/);
  const energy   = rx(html, /Energy<\/span><span class="stat-value">(.*?)<\/span>/);

  // Subtitle: group badge + type badge + tagline
  const group   = rx(html, /badge-group">(.*?)<\/span>/);
  const type    = rx(html, /badge-type"[^>]*>(.*?)<\/span>/);
  const tagline = rx(html, /breed-tagline">(.*?)<\/p>/);
  const subtitle = [group, type, tagline].filter(Boolean).join(' · ');

  // dog.ceo API path — multiple fetch URL patterns seen in the wild
  const apiM  = html.match(/fetch\('https:\/\/dog\.ceo\/api\/breed\/([^'\/]+(?:\/[^'\/]+)?(?:\/[^'\/]+)?)\/images'\)/);
  const apiPath = apiM ? apiM[1] : 'husky';

  // Profile tab
  const profileTabHtml   = getInnerHtml(html, 'id="tab-profile"');
  const profileMainHtml  = getInnerHtml(profileTabHtml  || html, 'class="profile-main"');
  const profileSideHtml  = getInnerHtml(profileTabHtml  || html, 'class="profile-sidebar"');

  const { overviewContent, traitBarsHtml } = processProfileMain(profileMainHtml);
  const traitItemsHtml = convertTraits(traitBarsHtml);
  const quickFactsHtml = convertQuickFacts(profileSideHtml);

  // Other tabs
  const dietHtml  = getInnerHtml(html, 'id="tab-diet"');
  const costHtml  = getInnerHtml(html, 'id="tab-cost"');
  const mixesHtml = getInnerHtml(html, 'id="tab-mixes"');
  const factsHtml = getInnerHtml(html, 'id="tab-facts"');

  return buildNewPage({
    breedName, metaTitle, metaDesc, breedEmoji, apiPath, subtitle,
    weight, height, lifespan, energy,
    overviewContent, traitItemsHtml, quickFactsHtml,
    dietHtml, costHtml, mixesHtml, factsHtml
  });
}

// ─── Main loop ────────────────────────────────────────────────────────────────
const allFiles = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let converted = 0, skipped = 0, errors = 0;

for (const file of allFiles) {
  const filePath = path.join(breedsDir, file);
  const html     = fs.readFileSync(filePath, 'utf8');

  if (!html.includes('BestPetSite')) {
    skipped++;
    continue;
  }

  try {
    const newHtml = convertPage(html, file);
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log('✅  ' + file);
    converted++;
  } catch (err) {
    console.error('❌  ' + file + ': ' + err.message);
    errors++;
  }
}

console.log('\n─────────────────────────────────────────');
console.log(`Converted : ${converted}`);
console.log(`Skipped   : ${skipped}  (already AllDogFacts design)`);
console.log(`Errors    : ${errors}`);
console.log(`Total     : ${allFiles.length} breed pages`);
