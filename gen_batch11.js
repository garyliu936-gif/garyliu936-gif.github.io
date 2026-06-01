/**
 * Generate Batch 11: 5 Missing FCI Breed Pages
 * Ariégeois, Artois Hound, Australian Kelpie, Australian Silky Terrier, Australian Stumpy Tail Cattle Dog
 * Run: node gen_batch11.js
 */

const fs = require('fs');
const path = require('path');

const batch11Breeds = [
  {
    name: 'Ariégeois',
    url: 'arigeois',
    title: 'Ariégeois — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Ariégeois breed profile: France\'s medium scent hound — a tri-color pack hound bred for hunting in the Ariège region. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '50–66 lbs',
    height: '22–24 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🦌',
    color: 'Tri-color (white, black, orange)',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · France\'s spirited pack hound — a medium-sized tri-color hound bred for hunting in the Ariège region with excellent endurance and nose',
    overview: 'The Ariégeois is a French scent hound from the Ariège region of southern France. Bred specifically for pack hunting, this breed combines French hound heritage with dedicated selection for hunting ability, resulting in a dog with exceptional tracking ability and tireless work ethic.',
    temperament: 'Energetic, determined, and pack-oriented. Excellent hunting instinct. Friendly and sociable with family but bred for pack work.',
    exercise: 'High energy: 60+ minutes daily. Bred for hunting; thrives with very active owners.',
    grooming: 'Short coat. Minimal grooming needs. Regular brushing; bathe as needed.',
    training: 'Intelligent and bred for independent work. Responds to firm, consistent leadership.',
    health: 'Generally robust. Hip dysplasia screening recommended.'
  },
  {
    name: 'Artois Hound',
    url: 'artois-hound',
    title: 'Artois Hound — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Artois Hound breed profile: France\'s small pack hound — a spirited scent hound from the Artois region bred for hunting small game. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '44–55 lbs',
    height: '20–22 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🦌',
    color: 'Tri-color (white, black, orange)',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · France\'s spirited small-game hunter — a tri-color pack hound from the Artois region with exceptional nose and tireless work drive',
    overview: 'The Artois Hound is a French scent hound from the Artois region in northern France. Developed specifically for hunting small game in packs, this breed is known for its determination, excellent nose, and enduring popularity among French hunters.',
    temperament: 'Energetic, determined, and pack-oriented. Strong hunting drive. Friendly with family but bred for pack work.',
    exercise: 'High energy: 60+ minutes daily. Bred for hunting; thrives with very active owners.',
    grooming: 'Short coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Intelligent but independent-minded. Responds to firm, consistent leadership.',
    health: 'Generally healthy. Hip dysplasia screening recommended.'
  },
  {
    name: 'Australian Kelpie',
    url: 'australian-kelpie',
    title: 'Australian Kelpie — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Australian Kelpie breed profile: Australia\'s tireless herding dog — a small, athletic herding dog bred to work livestock in harsh Australian outback conditions. FCI recognized.',
    group: 'Group 1 — Sheepdogs and Cattledogs',
    weight: '24–33 lbs',
    height: '17–20 in',
    lifespan: '11–15 yrs',
    energy: 'Very High',
    emoji: '🐑',
    color: 'Black, red, chocolate, fawn',
    subtitle: 'Herding Dog / FCI Group 1 · Purebred · Australia\'s tireless stockman — a small, athletic herding dog developed to work cattle and sheep across vast Australian outback terrain with incredible endurance',
    overview: 'The Australian Kelpie is one of the most capable and tireless herding dogs in the world. Developed in Australia to herd sheep and cattle across vast, harsh terrain, the Kelpie is known for its incredible work ethic, intelligence, and boundless energy.',
    temperament: 'Alert, intelligent, and intensely driven to work. Excellent with livestock. Devoted to family but requires mental stimulation.',
    exercise: 'Very high energy: 90+ minutes daily. Bred for all-day work; needs constant activity.',
    grooming: 'Short, dense coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Highly intelligent and responsive. Thrives with herding work or intense activity. Early socialization important.',
    health: 'Generally hardy. Hip and elbow dysplasia screening recommended.'
  },
  {
    name: 'Australian Silky Terrier',
    url: 'australian-silky-terrier',
    title: 'Australian Silky Terrier — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Australian Silky Terrier breed profile: Australia\'s elegant small terrier — a toy terrier with a silky coat bred for rat and snake control. FCI recognized.',
    group: 'Group 3 — Terriers',
    weight: '8–10 lbs',
    height: '9–10 in',
    lifespan: '13–15 yrs',
    energy: 'High',
    emoji: '🇦🇺',
    color: 'Blue and tan, gray and tan',
    subtitle: 'Toy Terrier / FCI Group 3 · Purebred · Australia\'s elegant ratter — a small, spirited terrier with a silky coat bred for controlling rodents and snakes in Australian homes and farms',
    overview: 'The Australian Silky Terrier is a small but spirited Australian terrier breed. Developed in Australia from Yorkshire Terrier stock, the Silky combines the elegance of its coat with the fearless hunting instinct of a true terrier.',
    temperament: 'Alert, spirited, and confident. Strong prey drive. Affectionate with family but reserved with strangers.',
    exercise: 'High energy: 30–45 minutes daily. Needs play and mental stimulation.',
    grooming: 'Silky, medium-length coat. Requires regular brushing (3–4 times weekly). Professional grooming recommended.',
    training: 'Intelligent and responsive. Eager to please. Early socialization important.',
    health: 'Generally healthy. Patellar luxation and diabetes can occur. Regular vet checkups.'
  },
  {
    name: 'Australian Stumpy Tail Cattle Dog',
    url: 'australian-stumpy-tail-cattle-dog',
    title: 'Australian Stumpy Tail Cattle Dog — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Australian Stumpy Tail Cattle Dog breed profile: Australia\'s bobtailed herder — a small, compact cattle dog bred to herd livestock with natural bobtail. FCI recognized.',
    group: 'Group 1 — Sheepdogs and Cattledogs',
    weight: '28–33 lbs',
    height: '17–20 in',
    lifespan: '12–15 yrs',
    energy: 'Very High',
    emoji: '🐑',
    color: 'Blue mottle, red speckle',
    subtitle: 'Cattle Dog / FCI Group 1 · Purebred · Australia\'s compact bobtailed herder — a tireless stockman with a natural short tail, bred to control cattle in harsh Australian conditions',
    overview: 'The Australian Stumpy Tail Cattle Dog is a compact, sturdy herding dog developed in Australia specifically for controlling cattle. Distinguished by its naturally short, stubby tail (unlike the closely related Australian Cattle Dog), the Stumpy Tail is a tireless, intelligent worker.',
    temperament: 'Alert, intelligent, and intensely driven. Excellent herding instinct. Devoted to family but requires work.',
    exercise: 'Very high energy: 90+ minutes daily. Needs herding work or intense activity.',
    grooming: 'Short, dense, mottle or speckle coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Highly intelligent and trainable. Thrives with herding work. Early socialization critical.',
    health: 'Generally hardy. Hip and elbow dysplasia screening recommended.'
  }
];

// Template function to create breed page
function buildPage(breed) {
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
  <title>${breed.title}</title>
  <meta name="description" content="${breed.meta}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/breeds.css" />
  <link rel="alternate" hreflang="en" href="/breeds/${breed.url}.html" />
  <link rel="alternate" hreflang="zh-CN" href="/zh/breeds/${breed.url}.html" />
</head>
<body>
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">All<span class="logo-dog">Dog</span><span class="logo-accent">Facts</span></span></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Home</a></li>
        <li><a href="/breeds/index.html" style="color:var(--teal)">Dog Breeds</a></li>
        <li><a href="/getting-a-dog/index.html">Getting a Dog</a></li>
        <li><a href="/training/index.html">Training</a></li>
        <li><a href="/health/index.html">Health</a></li>
        <li><a href="/nutrition/index.html">Nutrition</a></li>
        <li><a href="/grooming/index.html">Grooming</a></li>
      </ul>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <section class="breed-page-hero">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a><span>›</span>
        <a href="index.html">Dog Breeds</a><span>›</span>
        <span style="color:rgba(255,255,255,.8)">${breed.name}</span>
      </div>
      <div class="breed-hero-layout">
        <div class="breed-hero-emoji" id="breedPhotoWrap">
          <img class="breed-hero-real-photo" id="breedPhoto" alt="${breed.name}" />
          <span class="breed-emoji-fallback" id="breedEmoji">${breed.emoji}</span>
        </div>
        <div class="breed-hero-text">
          <h1>${breed.name}</h1>
          <p class="breed-subtitle">${breed.subtitle}</p>
          <div class="breed-quick-stats">
            <div class="quick-stat"><span class="quick-stat-value">${breed.weight}</span><span class="quick-stat-label">Weight</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${breed.height}</span><span class="quick-stat-label">Height</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${breed.lifespan}</span><span class="quick-stat-label">Lifespan</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${breed.energy}</span><span class="quick-stat-label">Energy</span></div>
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
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">
          <div class="breed-section">
            <h2>🐾 Overview</h2>
            <p>${breed.overview}</p>
          </div>

          <div class="breed-section">
            <h2>📸 Photo Gallery</h2>
            <p>Real ${breed.name} photos — showcasing their unique appearance and character.</p>
            <div class="breed-gallery" id="breedGallery">
              <img class="gallery-photo" id="gp1" alt="${breed.name} photo 1" />
              <img class="gallery-photo" id="gp2" alt="${breed.name} photo 2" />
              <img class="gallery-photo" id="gp3" alt="${breed.name} photo 3" />
              <img class="gallery-photo" id="gp4" alt="${breed.name} photo 4" />
              <img class="gallery-photo" id="gp5" alt="${breed.name} photo 5" />
              <img class="gallery-photo" id="gp6" alt="${breed.name} photo 6" />
            </div>
          </div>

          <div class="breed-section">
            <h2>😊 Temperament &amp; Personality</h2>
            <p>${breed.temperament}</p>
          </div>

          <div class="breed-section">
            <h2>🏃 Exercise &amp; Activity Needs</h2>
            <p>${breed.exercise}</p>
          </div>

          <div class="breed-section">
            <h2>✂️ Grooming &amp; Coat Care</h2>
            <p>${breed.grooming}</p>
          </div>

          <div class="breed-section">
            <h2>🎓 Training</h2>
            <p>${breed.training}</p>
          </div>

          <div class="breed-section">
            <h2>🏥 Health &amp; Common Issues</h2>
            <p>${breed.health}</p>
          </div>
        </div><!-- end tab-profile -->

        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ Feeding Guide</h2>
            <p>Consult with your veterinarian for specific feeding recommendations based on age, weight, and activity level.</p>
          </div>
        </div><!-- end tab-diet -->

        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 Cost Information</h2>
            <p>Consult with reputable breeders for pricing information.</p>
          </div>
        </div><!-- end tab-cost -->

        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Fun Facts About ${breed.name}</h2>
            <p>${breed.name} is a fascinating and unique breed with a rich history.</p>
          </div>
        </div><!-- end tab-facts -->
      </div>

      <aside class="breed-sidebar">
        <div class="sidebar-card">
          <h4>Quick Facts</h4>
          <div class="info-box"><div class="info-box-label">${breed.group}</div></div>
          <div class="info-box"><div class="info-box-label">Weight</div><div class="info-box-value">${breed.weight}</div></div>
          <div class="info-box"><div class="info-box-label">Height</div><div class="info-box-value">${breed.height}</div></div>
          <div class="info-box"><div class="info-box-label">Lifespan</div><div class="info-box-value">${breed.lifespan}</div></div>
          <div class="info-box"><div class="info-box-label">Colors</div><div class="info-box-value">${breed.color}</div></div>
        </div>
      </aside>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">All<span class="logo-dog">Dog</span><span class="logo-accent">Facts</span></span></div><p>Your complete guide to dog breeds, care, health, and training.</p></div>
        <div class="footer-col"><h4>More Breeds</h4><ul><li><a href="index.html">All Breeds →</a></li></ul></div>
        <div class="footer-col"><h4>Explore</h4><ul><li><a href="/training/index.html">Dog Training</a></li><li><a href="/health/index.html">Pet Health</a></li><li><a href="/nutrition/index.html">Nutrition</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div>
    </div>
  </footer>

  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <button class="lightbox-prev" id="lightboxPrev">&#9664;</button>
    <img id="lightboxImg" src="" alt="Enlarged ${breed.name} photo" />
    <button class="lightbox-next" id="lightboxNext">&#9654;</button>
  </div>
  <script src="../js/main.js"></script>
  <script>document.querySelectorAll('.breed-tab').forEach(tab=>{tab.addEventListener('click',()=>{document.querySelectorAll('.breed-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.breed-tab-panel').forEach(p=>p.classList.remove('active'));tab.classList.add('active');document.getElementById('tab-'+tab.dataset.tab).classList.add('active');document.querySelector('.breed-tabs-nav').scrollIntoView({behavior:'smooth',block:'nearest'});});});</script>
  <script>
    let galleryPhotos=[];let currentPhotoIndex=0;
    fetch('https://dog.ceo/api/breeds/list/all').then(r=>r.json()).then(data=>{const allBreeds=Object.keys(data.message);const searchBreed='${breed.name.toLowerCase().split(' ')[0]}';const matchingBreed=allBreeds.find(b=>b.includes(searchBreed))||allBreeds[0];fetch(\`https://dog.ceo/api/breed/\${matchingBreed}/images\`).then(r=>r.json()).then(data=>{if(!Array.isArray(data.message)||!data.message.length)return;const photos=data.message;const hero=document.getElementById('breedPhoto');hero.src=photos[2]||photos[0];hero.onload=()=>{hero.style.display='block';document.getElementById('breedEmoji').style.display='none';};[0,2,4,6,8,10].forEach((index,i)=>{const el=document.getElementById('gp'+(i+1));const src=photos[index]||photos[i]||photos[0];if(el&&src){galleryPhotos.push(src);el.src=src;el.addEventListener('click',()=>openLightbox(i));}});}).catch(()=>{});}).catch(()=>{});
    function openLightbox(i){currentPhotoIndex=i;document.getElementById('lightboxImg').src=galleryPhotos[i];document.getElementById('lightbox').classList.add('open');}
    function closeLightbox(){document.getElementById('lightbox').classList.remove('open');}
    document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click',(e)=>{e.stopPropagation();currentPhotoIndex=(currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];});
    document.getElementById('lightboxNext').addEventListener('click',(e)=>{e.stopPropagation();currentPhotoIndex=(currentPhotoIndex+1)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];});
    document.getElementById('lightbox').addEventListener('click',(e)=>{if(e.target===e.currentTarget)closeLightbox();});
    document.addEventListener('keydown',(e)=>{if(!document.getElementById('lightbox').classList.contains('open'))return;if(e.key==='ArrowLeft'){currentPhotoIndex=(currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];}else if(e.key==='ArrowRight'){currentPhotoIndex=(currentPhotoIndex+1)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];}else if(e.key==='Escape'){closeLightbox();}});
  </script>
</body>
</html>`;
}

console.log('🚀 Generating Batch 11: 5 Missing FCI Breeds...\n');

batch11Breeds.forEach(breed => {
  const filePath = path.join(__dirname, 'breeds', `${breed.url}.html`);
  const html = buildPage(breed);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Created ${breed.name} (${breed.url}.html)`);
});

console.log(`\n✨ Batch 11 complete: 5 new breed pages created!`);
