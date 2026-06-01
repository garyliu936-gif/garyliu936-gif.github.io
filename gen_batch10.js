/**
 * Generate Batch 10: 5 Missing FCI Breed Pages
 * Aidi, American Cocker Spaniel, Andalusian Terrier, Anglo-Français de Petite Vénerie, Ariège Pointer
 * Run: node gen_batch10.js
 */

const fs = require('fs');
const path = require('path');

const batch10Breeds = [
  {
    name: 'Aidi',
    url: 'aidi',
    title: 'Aidi — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Aidi breed profile: Morocco\'s ancient mountain dog — a large, powerful livestock guardian developed to protect herds in the Atlas Mountains. FCI recognized.',
    group: 'Group 2 — Pinscher and Schnauzer - Molossoid',
    weight: '55–65 lbs',
    height: '20–29 in',
    lifespan: '10–12 yrs',
    energy: 'Moderate–High',
    emoji: '🏔️',
    color: 'Fawn, sable, brindle',
    subtitle: 'Livestock Guardian / FCI Group 2 · Purebred · Morocco\'s powerful mountain protector — an ancient Atlas hound bred to guard herds against jackals and leopards, deeply loyal and fiercely independent',
    overview: 'The Aidi (also called Aidi, Atlas Mountain Dog) is North Africa\'s premier livestock guardian, developed in the Atlas Mountains of Morocco to protect sheep and goat herds from large predators including jackals, hyenas, and leopards. The breed is known as the "Atlas Hound" and has served Moroccan shepherds for centuries, valued for its fearlessness, strength, and unwavering loyalty to its flock and family.',
    temperament: 'Protective, courageous, and fiercely loyal. The Aidi bonds deeply with its family and livestock while remaining wary of strangers. Independent-minded but responsive to training.',
    exercise: 'High energy: 60+ minutes daily of active exercise. Thrives in large spaces. Excellent for herding and livestock work.',
    grooming: 'Coat varies from short to medium length. Regular brushing; moderate shedding, heavy seasonally.',
    training: 'Intelligent and trainable but independent. Responds well to consistent, firm leadership. Early socialization is critical.',
    health: 'Generally hardy. Hip dysplasia possible. Requires annual vet checkups.'
  },
  {
    name: 'American Cocker Spaniel',
    url: 'american-cocker-spaniel',
    title: 'American Cocker Spaniel — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'American Cocker Spaniel breed profile: USA\'s adaptable spaniel — a medium-sized flushing dog with a silky coat, gentle temperament, and eager-to-please attitude. FCI recognized.',
    group: 'Group 8 — Retrievers, Flushing Dogs, Water Dogs',
    weight: '25–30 lbs',
    height: '13–15.5 in',
    lifespan: '12–15 yrs',
    energy: 'Moderate–High',
    emoji: '🦆',
    color: 'Black, buff, parti-color',
    subtitle: 'Flushing Dog / FCI Group 8 · Purebred · America\'s beloved spaniel — bred from English Cocker Spaniels and refined to a smaller, sweeter-tempered companion with a silky coat and gentle nature',
    overview: 'The American Cocker Spaniel is the refined American descendant of the English Cocker Spaniel, developed in the United States to be both an effective flushing dog and a loving family companion. Smaller and longer-coated than their English cousins, American Cockers have become one of the most popular toy and companion breeds worldwide.',
    temperament: 'Gentle, eager to please, and affectionate. Excellent with children and families. Love water and retrieving. Generally friendly even with strangers.',
    exercise: 'Moderate–High: 30–60 minutes daily. Enjoy walks, play, and water activities. Need regular mental stimulation.',
    grooming: 'Silky, medium-length coat requires regular brushing (3–4 times weekly). Professional grooming every 6–8 weeks. Ear care essential.',
    training: 'Highly intelligent and eager to please. Respond well to positive reinforcement. Early socialization important.',
    health: 'Watch for: ear infections, hip dysplasia, eye conditions. Regular vet checkups and genetic screening recommended.'
  },
  {
    name: 'Andalusian Terrier',
    url: 'andalusian-terrier',
    title: 'Andalusian Terrier — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Andalusian Terrier (Ratonero Bodeguero Andaluz) breed profile: Spain\'s small ratter — a spirited, fearless terrier bred to control rodents in Andalusian wine cellars. FCI recognized.',
    group: 'Group 3 — Terriers',
    weight: '4.5–9 lbs',
    height: '7.5–9 in',
    lifespan: '13–15 yrs',
    energy: 'High',
    emoji: '🇪🇸',
    color: 'Black and tan, red, brindle',
    subtitle: 'Small Terrier / FCI Group 3 · Purebred · Spain\'s spirited ratter — a fearless little hunter bred in the wine cellars and farms of Andalusia to control rodent populations with tireless drive',
    overview: 'The Andalusian Terrier (Ratonero Bodeguero Andaluz) is a small Spanish terrier bred historically to control rodent populations in the wine cellars and farms of Andalusia. Despite its small size, the breed is known for its fearless, energetic nature and exceptional hunting ability.',
    temperament: 'Alert, spirited, and fearless. Highly energetic and playful. Excellent prey drive. Affectionate with family but reserved with strangers.',
    exercise: 'High energy: 45+ minutes daily. Needs mental stimulation, play, and activities that engage their hunting instincts.',
    grooming: 'Short, smooth coat. Minimal grooming required. Brush weekly; bathe as needed.',
    training: 'Intelligent but independent-minded. Responds well to consistent, positive reinforcement. Early socialization important.',
    health: 'Generally hardy and healthy. No major breed-specific health issues reported.'
  },
  {
    name: 'Anglo-Français de Petite Vénerie',
    url: 'anglo-francais-de-petite-venerie',
    title: 'Anglo-Français de Petite Vénerie — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Anglo-Français de Petite Vénerie breed profile: France\'s small pack hound — a spirited scent hound developed for hunting small game with exceptional nose work ability. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '40–50 lbs',
    height: '18.5–20.5 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🦌',
    color: 'Tri-color (white, black, orange)',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · France\'s spirited small-game hunter — a medium-sized pack hound with exceptional nose, bred specifically for hunting rabbits and hares in French hunting tradition',
    overview: 'The Anglo-Français de Petite Vénerie is a French scent hound developed specifically for hunting small game, particularly rabbits and hares. Created by crossing French and English hound breeds, this dog combines the endurance and nose of French hounds with the English hunting sensibility.',
    temperament: 'Energetic, determined, and pack-oriented. Excellent work ethic in hunting. Friendly and sociable with family but bred for pack work.',
    exercise: 'High energy: 60+ minutes daily of vigorous activity. Bred for hunting; thrives with active owners.',
    grooming: 'Short coat. Minimal grooming needs. Regular brushing sufficient; bathe as needed.',
    training: 'Intelligent and trainable but bred for independent hunting work. Responds to firm, consistent leadership.',
    health: 'Generally robust. Hip dysplasia screening recommended. Regular vet checkups.'
  },
  {
    name: 'Ariège Pointer',
    url: 'ariege-pointer',
    title: 'Ariège Pointer — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Ariège Pointer breed profile: France\'s elegant hunting dog — a medium-sized pointer developed for bird hunting in the Ariège Pyrenees region. FCI recognized.',
    group: 'Group 7 — Pointing Dogs',
    weight: '55–66 lbs',
    height: '22–24 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🏹',
    color: 'White and chestnut/orange',
    subtitle: 'Pointer / FCI Group 7 · Purebred · France\'s elegant bird hunter — a medium-sized pointer developed in the Ariège Pyrenees for hunting upland game with athleticism and grace',
    overview: 'The Ariège Pointer is a French hunting dog developed in the Ariège region of the Pyrenees. This elegant pointer combines excellent hunting ability with a gentle, trainable temperament, making it valued both in the field and as a family companion.',
    temperament: 'Gentle, intelligent, and eager to please. Excellent hunting drive. Responsive to training and affectionate with family.',
    exercise: 'High energy: 60+ minutes daily. Bred for hunting; thrives with active owners. Excellent for field work and running.',
    grooming: 'Short, dense coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Intelligent and responsive. Trainable for hunting and obedience. Early socialization important.',
    health: 'Generally hardy. Hip dysplasia screening recommended. Regular vet checkups.'
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

console.log('🚀 Generating Batch 10: 5 Missing FCI Breeds...\n');

batch10Breeds.forEach(breed => {
  const filePath = path.join(__dirname, 'breeds', `${breed.url}.html`);
  const html = buildPage(breed);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Created ${breed.name} (${breed.url}.html)`);
});

console.log(`\n✨ Batch 10 complete: 5 new breed pages created!`);
