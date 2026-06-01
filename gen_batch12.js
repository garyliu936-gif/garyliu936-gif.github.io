/**
 * Generate Batch 12: 5 Missing FCI Breed Pages
 * Austrian Black and Tan Hound, Barak Hound, Basset Artésien Normand, Basset Fauve de Bretagne, Bavarian Mountain Hound
 * Run: node gen_batch12.js
 */

const fs = require('fs');
const path = require('path');

const batch12Breeds = [
  {
    name: 'Austrian Black and Tan Hound',
    url: 'austrian-black-and-tan-hound',
    title: 'Austrian Black and Tan Hound — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Austrian Black and Tan Hound breed profile: Austria\'s elegant scent hound — a medium-sized black and tan hound bred for hunting in Alpine forests. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '34–49 lbs',
    height: '19–22 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🏔️',
    color: 'Black with tan markings',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · Austria\'s elegant Alpine hunter — a medium-sized black and tan scent hound developed for hunting in Austrian mountain forests with excellent nose and tireless work ethic',
    overview: 'The Austrian Black and Tan Hound is an elegant scent hound developed in Austria for hunting in Alpine forests and mountains. Known for their striking black and tan coat and exceptional hunting ability, these dogs have been refined over centuries to work in challenging mountain terrain.',
    temperament: 'Determined, focused, and driven to hunt. Excellent nose and tireless in the field. Friendly with family but bred for serious hunting work.',
    exercise: 'High energy: 60+ minutes daily. Bred for mountain hunting; needs active owners and challenging terrain.',
    grooming: 'Short, dense coat. Minimal grooming needs. Regular brushing; bathe as needed.',
    training: 'Intelligent and responsive but independent-minded. Bred for autonomous hunting decisions.',
    health: 'Generally hardy. Hip dysplasia screening recommended.'
  },
  {
    name: 'Barak Hound',
    url: 'barak-hound',
    title: 'Barak Hound — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Barak Hound breed profile: Croatia\'s rare scent hound — a medium-sized hound with exceptional nose bred for hunting in Balkans forests. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '37–51 lbs',
    height: '18–22 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🇭🇷',
    color: 'Red, fawn, black and tan',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · Croatia\'s rare forest hunter — a medium-sized scent hound with exceptional nose bred for hunting in Balkan mountain forests, nearly extinct but preserved by dedicated enthusiasts',
    overview: 'The Barak Hound is a rare scent hound from the Balkans, particularly associated with Croatia. Nearly extinct at one point, dedicated breed enthusiasts have worked to preserve this talented hunting dog with its exceptional nose and determination.',
    temperament: 'Determined, focused, and strongly driven to hunt. Excellent scent tracking ability. Friendly but work-focused.',
    exercise: 'High energy: 60+ minutes daily. Bred for hunting in forests; needs very active owners.',
    grooming: 'Short to medium coat. Minimal grooming needs. Regular brushing; bathe as needed.',
    training: 'Intelligent and bred for independent hunting work. Responds to firm, consistent leadership.',
    health: 'Generally hardy. Regular vet checkups recommended.'
  },
  {
    name: 'Basset Artésien Normand',
    url: 'basset-artesien-normand',
    title: 'Basset Artésien Normand — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Basset Artésien Normand breed profile: France\'s short-legged hound — a low-riding scent hound bred for hunting rabbits in French valleys and plains. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '26–34 lbs',
    height: '10–14 in',
    lifespan: '12–15 yrs',
    energy: 'Moderate–High',
    emoji: '🇫🇷',
    color: 'Tri-color, fawn and white',
    subtitle: 'Basset Hound / FCI Group 6 · Purebred · France\'s charming short-legged hunter — a low-riding scent hound bred for hunting rabbits with exceptional nose and charming, laid-back personality',
    overview: 'The Basset Artésien Normand is a French short-legged scent hound developed specifically for hunting rabbits. This breed combines the iconic basset body type with French hunting heritage, resulting in a dog that is both an excellent hunter and a delightful companion.',
    temperament: 'Friendly, laid-back, and driven to hunt. Excellent nose and stubborn independence. Good with family and children.',
    exercise: 'Moderate–High: 30–60 minutes daily of gentle exercise. Bred for hunting; loves to follow scents.',
    grooming: 'Short coat. Minimal grooming needs. Regular brushing; watch for ear infections.',
    training: 'Intelligent but independent-minded. Responds to patient, consistent training.',
    health: 'Watch for ear infections. Hip dysplasia screening recommended. Back issues possible.'
  },
  {
    name: 'Basset Fauve de Bretagne',
    url: 'basset-fauve-de-bretagne',
    title: 'Basset Fauve de Bretagne — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Basset Fauve de Bretagne breed profile: France\'s low-riding golden hound — a short-legged fawn-colored scent hound bred for hunting rabbits and hares in French countryside. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '31–36 lbs',
    height: '12–15 in',
    lifespan: '12–15 yrs',
    energy: 'High',
    emoji: '🇫🇷',
    color: 'Fawn, golden',
    subtitle: 'Basset Hound / FCI Group 6 · Purebred · France\'s golden short-legged hunter — a low-riding fawn-colored scent hound with exceptional nose, bred for hunting rabbits with tireless determination and joyful spirit',
    overview: 'The Basset Fauve de Bretagne is a charming French short-legged hound with a distinctive golden-fawn coat. Developed in Brittany for hunting rabbits, this breed is known for its combination of exceptional hunting ability and friendly, laid-back personality.',
    temperament: 'Friendly, cheerful, and driven to hunt. Excellent nose and strong pack instinct. Good with family and children.',
    exercise: 'High energy: 45–60 minutes daily. Bred for hunting; thrives with active owners.',
    grooming: 'Short, wiry coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Intelligent but independent-minded. Responds well to positive reinforcement and patient training.',
    health: 'Generally healthy. Ear infections possible. Hip dysplasia screening recommended.'
  },
  {
    name: 'Bavarian Mountain Hound',
    url: 'bavarian-mountain-hound',
    title: 'Bavarian Mountain Hound — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Bavarian Mountain Hound breed profile: Germany\'s Alpine tracking specialist — a medium-sized red-brown hound bred for tracking in mountainous terrain with exceptional scent ability. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '37–52 lbs',
    height: '18–22 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🏔️',
    color: 'Red-brown, brindle',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · Germany\'s Alpine tracker — a medium-sized red-brown hound specializing in tracking wounded game through mountains with unmatched determination and nose',
    overview: 'The Bavarian Mountain Hound is a specialized German scent hound developed specifically for tracking wounded game in Alpine mountains. Bred for centuries in Bavaria, these dogs are known for their exceptional nose, determination, and ability to work in challenging mountainous terrain.',
    temperament: 'Determined, focused, and intensely driven to work. Excellent problem-solver. Devoted to owner but independent hunter.',
    exercise: 'High energy: 60+ minutes daily. Bred for Alpine tracking; needs challenging terrain and serious activity.',
    grooming: 'Short, dense coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Intelligent and responsive to dedicated training. Bred for independent tracking decisions.',
    health: 'Generally hardy. Hip dysplasia screening recommended.'
  }
];

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
        </div>

        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ Feeding Guide</h2>
            <p>Consult with your veterinarian for specific feeding recommendations based on age, weight, and activity level.</p>
          </div>
        </div>

        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 Cost Information</h2>
            <p>Consult with reputable breeders for pricing information.</p>
          </div>
        </div>

        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Fun Facts About ${breed.name}</h2>
            <p>${breed.name} is a fascinating and unique breed with a rich history.</p>
          </div>
        </div>
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

console.log('🚀 Generating Batch 12: 5 Missing FCI Breeds...\n');

batch12Breeds.forEach(breed => {
  const filePath = path.join(__dirname, 'breeds', `${breed.url}.html`);
  const html = buildPage(breed);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Created ${breed.name} (${breed.url}.html)`);
});

console.log(`\n✨ Batch 12 complete: 5 new breed pages created!`);
