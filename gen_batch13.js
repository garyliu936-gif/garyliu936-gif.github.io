const fs = require('fs');
const path = require('path');

const batch13Breeds = [
  {
    name: 'Beagle-Harrier',
    url: 'beagle-harrier',
    title: 'Beagle-Harrier — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Beagle-Harrier breed profile: France\'s versatile pack hound — a medium-sized scent hound combining Beagle and Harrier traits for hunting rabbits and hares. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '48–66 lbs',
    height: '18–20 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🦌',
    color: 'Tri-color (white, black, orange)',
    subtitle: 'Scent Hound / FCI Group 6 · Purebred · France\'s versatile pack hound — a medium-sized tri-color scent hound combining Beagle and Harrier traits for hunting rabbits with excellent endurance',
    overview: 'The Beagle-Harrier is a French scent hound that represents a unique cross between Beagle and Harrier traits. Created specifically for hunting rabbits and hares, this breed combines the determined nose of a Beagle with the stronger build and endurance of a Harrier.',
    temperament: 'Energetic, determined, and pack-oriented. Excellent hunting instinct. Friendly with family but bred for pack work.',
    exercise: 'High energy: 60+ minutes daily. Bred for hunting; needs very active owners.',
    grooming: 'Short coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Intelligent but independent-minded. Responds to firm, consistent leadership.',
    health: 'Generally healthy. Hip dysplasia screening recommended.'
  },
  {
    name: 'Belgian Shepherd',
    url: 'belgian-shepherd',
    title: 'Belgian Shepherd — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Belgian Shepherd breed profile: Belgium\'s versatile working dog — an intelligent herding dog in four coat varieties, renowned for police and military work. FCI recognized.',
    group: 'Group 1 — Sheepdogs and Cattledogs',
    weight: '45–75 lbs',
    height: '22–26 in',
    lifespan: '12–14 yrs',
    energy: 'Very High',
    emoji: '🇧🇪',
    color: 'Fawn, black, brindle, fawn with black mask',
    subtitle: 'Herding Dog / FCI Group 1 · Purebred · Belgium\'s versatile working dog — an intelligent, athletic herding dog renowned for police, military, and protection work with intense drive and loyalty',
    overview: 'The Belgian Shepherd is a versatile working dog from Belgium, recognized in four coat varieties (Groenendael, Malinois, Tervuren, Laekenois). Renowned for intelligence, athleticism, and work drive, Belgian Shepherds excel in police work, military service, and protection roles.',
    temperament: 'Intelligent, alert, and intensely driven. Excellent work ethic. Loyal and protective with family; wary of strangers.',
    exercise: 'Very high energy: 90+ minutes daily. Bred for herding; needs challenging work and intense activity.',
    grooming: 'Coat varies by variety. Regular brushing; minimal grooming needs.',
    training: 'Highly intelligent and responsive. Thrives with herding work or protection training. Early socialization essential.',
    health: 'Generally hardy. Hip and elbow dysplasia screening recommended.'
  },
  {
    name: 'Bergamasco Shepherd',
    url: 'bergamasco-shepherd',
    title: 'Bergamasco Shepherd — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Bergamasco Shepherd breed profile: Italy\'s unique woolly herder — a medium-sized shepherd with a distinctive felted coat, bred for herding in Alpine mountains. FCI recognized.',
    group: 'Group 1 — Sheepdogs and Cattledogs',
    weight: '57–84 lbs',
    height: '21.5–23.5 in',
    lifespan: '13–15 yrs',
    energy: 'Moderate–High',
    emoji: '🇮🇹',
    color: 'Gray, black, black and gray',
    subtitle: 'Herding Dog / FCI Group 1 · Purebred · Italy\'s woolly shepherd — a distinctive Italian herder with a unique felted coat developed in Alpine mountains for independent flock work with calm temperament',
    overview: 'The Bergamasco Shepherd is an Italian herding dog renowned for its distinctive felted coat. Developed in the Alpine valleys of Bergamo, Italy, this breed was selected to herd sheep independently across mountain terrain. Its calm, independent nature and unique appearance make it a truly distinctive breed.',
    temperament: 'Calm, intelligent, and independent. Excellent problem-solver. Loyal to family; independent thinker rather than slavishly obedient.',
    exercise: 'Moderate–High: 45–60 minutes daily. Bred for herding; enjoys varied activity.',
    grooming: 'Distinctive felted coat requires specialized care. Minimal brushing; air-dry after baths.',
    training: 'Intelligent but independent-minded. Responds to positive reinforcement. Early socialization important.',
    health: 'Generally hardy. Hip dysplasia screening recommended.'
  },
  {
    name: 'Bichon Frisé',
    url: 'bichon-frise',
    title: 'Bichon Frisé — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Bichon Frisé breed profile: France\'s cheerful white companion — a small, fluffy toy dog with a happy temperament, low-shedding hypoallergenic coat. FCI recognized.',
    group: 'Group 9 — Companion and Toy Dogs',
    weight: '12–18 lbs',
    height: '9.5–11.5 in',
    lifespan: '14–15 yrs',
    energy: 'Moderate',
    emoji: '☁️',
    color: 'White, cream, apricot',
    subtitle: 'Toy Companion / FCI Group 9 · Purebred · France\'s cheerful white companion — a small, fluffy toy dog with a happy temperament, hypoallergenic coat, and playful spirit',
    overview: 'The Bichon Frisé is a small French companion dog with a distinctive fluffy white coat. Known for its cheerful temperament, playful nature, and hypoallergenic qualities, the Bichon makes an excellent family companion. The breed has a long history as a circus performer and favorite of Spanish nobility.',
    temperament: 'Cheerful, playful, and affectionate. Excellent with children and families. Loves being the center of attention.',
    exercise: 'Moderate: 20–30 minutes daily. Enjoys play and walks. Lower exercise needs than many breeds.',
    grooming: 'Fluffy, curly coat requires regular brushing (3–4 times weekly). Professional grooming every 6–8 weeks.',
    training: 'Intelligent and eager to please. Responds well to positive reinforcement. Enjoys training and tricks.',
    health: 'Generally healthy. Patellar luxation and dental issues possible. Regular vet checkups.'
  },
  {
    name: 'Billy',
    url: 'billy',
    title: 'Billy — Breed Profile, Temperament, Care & Health | AllDogFacts',
    meta: 'Billy breed profile: France\'s rare white pack hound — a large, white scent hound bred for hunting large game in French forests. FCI recognized.',
    group: 'Group 6 — Scent Hounds',
    weight: '55–66 lbs',
    height: '24–28 in',
    lifespan: '12–14 yrs',
    energy: 'High',
    emoji: '🇫🇷',
    color: 'White, white with lemon or orange',
    subtitle: 'Large Scent Hound / FCI Group 6 · Purebred · France\'s rare white pack hunter — a large white scent hound bred for hunting large game in French forests with exceptional nose and enduring pack instinct',
    overview: 'The Billy is a rare French scent hound developed specifically for hunting large game like wild boar and deer. Named after the original breeder Gaston Phoebus and his hounds, the Billy is known for its exceptional nose, determination, and pack hunting ability. Today it remains rare even in France.',
    temperament: 'Determined, focused, and strongly pack-oriented. Excellent nose and tireless hunter. Loyal to family.',
    exercise: 'High energy: 60+ minutes daily. Bred for serious hunting; needs very active owners.',
    grooming: 'Short coat. Minimal grooming. Regular brushing; bathe as needed.',
    training: 'Intelligent but bred for independent hunting work. Responds to firm, consistent leadership.',
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

console.log('🚀 Generating Batch 13: 5 Missing FCI Breeds...\n');

batch13Breeds.forEach(breed => {
  const filePath = path.join(__dirname, 'breeds', `${breed.url}.html`);
  const html = buildPage(breed);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Created ${breed.name} (${breed.url}.html)`);
});

console.log(`\n✨ Batch 13 complete: 5 new breed pages created!`);
