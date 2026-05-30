/**
 * Fixes Chinese breed pages to match English typesetting:
 * 1. CSS/JS paths: ../css/ → ../../css/, ../js/ → ../../js/
 * 2. Home links: ../index.html → /index.html
 * 3. Adds Photo Gallery section to profile tab (was missing)
 * 4. Nav breeds link: /breeds/index.html → /zh/breeds/index.html
 */
const fs   = require('fs');
const path = require('path');

const zhDir  = path.join(__dirname, 'zh', 'breeds');
const srcDir = path.join(__dirname, 'breeds');
const files  = fs.readdirSync(zhDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let count = 0;

files.forEach(filename => {
  const zhPath  = path.join(zhDir, filename);
  const srcPath = path.join(srcDir, filename);
  let html = fs.readFileSync(zhPath, 'utf8');

  // 1. Fix CSS paths
  html = html
    .replace(/href="\.\.\/css\/styles\.css"/g, 'href="../../css/styles.css"')
    .replace(/href="\.\.\/css\/breeds\.css"/g, 'href="../../css/breeds.css"');

  // 2. Fix JS path
  html = html.replace(/src="\.\.\/js\/main\.js"/g, 'src="../../js/main.js"');

  // 3. Fix all ../index.html links → /index.html
  html = html.replace(/href="\.\.\/index\.html(#[^"]*)?"/g, (m, anchor) => {
    return `href="/index.html${anchor || ''}"`;
  });

  // 4. Fix nav Dog Breeds link to point to Chinese breeds index
  html = html.replace(
    /href="\/breeds\/index\.html"/g,
    'href="/zh/breeds/index.html"'
  );

  // 5. Add Photo Gallery section to profile tab if missing
  if (!html.includes('id="breedGallery"')) {
    // Extract zh name from h1
    const zhNameMatch = html.match(/<h1>([^<]+)<\/h1>/);
    const zhName = zhNameMatch ? zhNameMatch[1].trim() : '';

    // Also get the dog.ceo API slug from English source for the photo fetch
    let dogApiBreed = '';
    if (fs.existsSync(srcPath)) {
      const srcHtml = fs.readFileSync(srcPath, 'utf8');
      const apiMatch = srcHtml.match(/fetch\('https:\/\/dog\.ceo\/api\/breed\/([^/]+)\/images'\)/);
      if (apiMatch) dogApiBreed = apiMatch[1];
    }
    // Fallback: derive from filename
    if (!dogApiBreed) dogApiBreed = filename.replace('.html', '');

    const gallerySection = `
        <div class="breed-section">
          <h2>📸 ${zhName}照片集</h2>
          <p>浏览${zhName}的真实照片，欣赏它的外形、体型与个性。</p>
          <div class="breed-gallery" id="breedGallery">
            <img class="gallery-photo" id="gp1" alt="${zhName}照片 1" />
            <img class="gallery-photo" id="gp2" alt="${zhName}照片 2" />
            <img class="gallery-photo" id="gp3" alt="${zhName}照片 3" />
            <img class="gallery-photo" id="gp4" alt="${zhName}照片 4" />
            <img class="gallery-photo" id="gp5" alt="${zhName}照片 5" />
            <img class="gallery-photo" id="gp6" alt="${zhName}照片 6" />
          </div>
        </div>
`;

    // Insert gallery after the first breed-section (Overview/品种简介) in the profile tab
    // Find the profile tab panel, then inject gallery after the first </div> that closes the first breed-section
    const profileStart = html.indexOf('<div class="breed-tab-panel active" id="tab-profile">');
    if (profileStart !== -1) {
      // Find the second <div class="breed-section"> in the profile tab (after Overview)
      const firstSectionStart = html.indexOf('<div class="breed-section">', profileStart);
      if (firstSectionStart !== -1) {
        // Find the closing of this first section (the next </div> after the last content tag)
        // Walk forward to find </div> that closes the first breed-section
        let depth = 0;
        let i = firstSectionStart;
        while (i < html.length) {
          if (html.startsWith('<div', i)) depth++;
          else if (html.startsWith('</div>', i)) {
            depth--;
            if (depth === 0) {
              // Insert gallery after this closing div
              const insertAt = i + '</div>'.length;
              html = html.slice(0, insertAt) + '\n' + gallerySection + html.slice(insertAt);
              break;
            }
          }
          i++;
        }
      }
    }

    // Also update the gallery fetch script to use the correct breed
    // The current script may reference the English name — keep it as-is since dog.ceo uses English
  }

  // 6. Make sure the lightbox HTML is present before </body>
  if (!html.includes('id="lightbox"')) {
    const zhNameMatch = html.match(/<h1>([^<]+)<\/h1>/);
    const zhName = zhNameMatch ? zhNameMatch[1].trim() : '犬';
    const lightboxHtml = `
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <button class="lightbox-prev" id="lightboxPrev">&#9664;</button>
    <img id="lightboxImg" src="" alt="放大图片" />
    <button class="lightbox-next" id="lightboxNext">&#9654;</button>
  </div>
`;
    html = html.replace('</body>', lightboxHtml + '</body>');
  }

  // 7. Fix the gallery fetch script if it uses wrong path or is missing
  // Ensure the gallery script references gp1-gp6 elements
  if (!html.includes('galleryPhotos') && html.includes('id="breedGallery"')) {
    // Extract dog.ceo breed from English source
    let dogApiBreed = filename.replace('.html', '');
    if (fs.existsSync(srcPath)) {
      const srcHtml = fs.readFileSync(srcPath, 'utf8');
      const apiMatch = srcHtml.match(/fetch\('https:\/\/dog\.ceo\/api\/breed\/([^/]+)\/images'\)/);
      if (apiMatch) dogApiBreed = apiMatch[1];
    }
    const galleryScript = `
  <script>
    let galleryPhotos = [];
    let currentPhotoIndex = 0;

    fetch('https://dog.ceo/api/breed/${dogApiBreed}/images')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data.message) || !data.message.length) return;
        const photos = data.message;
        const hero = document.getElementById('breedPhoto');
        if (hero) { hero.src = photos[2] || photos[0]; hero.onload = () => { hero.style.display = 'block'; const em = document.getElementById('breedEmoji'); if (em) em.style.display = 'none'; }; }
        const picks = [5, 15, 25, 35, 45, 55];
        picks.forEach((index, i) => {
          const el = document.getElementById('gp' + (i + 1));
          const src = photos[index] || photos[i] || photos[0];
          if (el && src) { galleryPhotos.push(src); el.src = src; el.addEventListener('click', () => openLightbox(i)); }
        });
      }).catch(() => {});

    function openLightbox(index) { currentPhotoIndex = index; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; document.getElementById('lightbox').classList.add('open'); }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    const lbEl = document.getElementById('lightbox');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    if (lbEl) lbEl.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('open')) return;
      if (e.key === 'ArrowLeft') { currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'ArrowRight') { currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'Escape') closeLightbox();
    });
  </script>
`;
    html = html.replace('</body>', galleryScript + '</body>');
  }

  fs.writeFileSync(zhPath, html, 'utf8');
  count++;
  if (count % 50 === 0) process.stdout.write(`  ${count} pages done...\n`);
});

console.log(`\n✅ Fixed paths and layout for ${count} Chinese breed pages.`);
