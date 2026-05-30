// generate_hybrid4.js — Pomsky + Schnoodle
const fs = require('fs');
const path = require('path');

const BREEDS_DIR = path.join(__dirname, 'breeds');

function buildHybridPage(b) {
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
  <title>${b.name} — Hybrid Breed Profile, Temperament, Care &amp; Training | AllDogFacts</title>
  <meta name="description" content="${b.metaDesc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/breeds.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${b.name} Hybrid Dog Breed Guide",
    "description": "Complete guide to the ${b.name} hybrid including temperament, generations, care, training, and health information.",
    "keywords": "${b.keywords}"
  }
  </script>
</head>
<body>

  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo">
        <span class="logo-paw">🐾</span>
        <span class="logo-text">AllDog<span class="logo-accent">Facts</span></span>
      </a>
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
        <a href="../index.html">Home</a>
        <span>›</span>
        <a href="index.html">Dog Breeds</a>
        <span>›</span>
        <span style="color:rgba(255,255,255,.8)">${b.name}</span>
      </div>
      <div class="breed-hero-layout">
        <div class="breed-hero-emoji" id="breedPhotoWrap">
          <img class="breed-hero-real-photo" id="breedPhoto" alt="${b.name}" />
          <span class="breed-emoji-fallback" id="breedEmoji">${b.emoji}</span>
        </div>
        <div class="breed-hero-text">
          <h1>${b.name}</h1>
          <p class="breed-subtitle">${b.subtitle}</p>
          <div class="breed-quick-stats">
            <div class="quick-stat"><span class="quick-stat-value">${b.weight}</span><span class="quick-stat-label">Weight</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.height}</span><span class="quick-stat-label">Height</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.lifespan}</span><span class="quick-stat-label">Lifespan</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.parents}</span><span class="quick-stat-label">Parents</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.familyStar}</span><span class="quick-stat-label">Family Dog</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="breed-content-wrap">
      <div class="breed-main">

        <div class="breed-section">
          <h2>🎬 ${b.name} Facts</h2>
          <p>Watch this video for a quick overview of the ${b.name} — see the hybrid in action before diving into the details.</p>
          <div class="video-embed">
            <iframe src="https://www.youtube.com/embed/${b.youtubeId}" title="${b.name} Hybrid Breed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>

        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="generations">🧬 Generations</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">

        <div class="breed-section">
          <h2>🐾 Overview</h2>
          ${b.overview}
          <div class="info-grid">
            <div class="info-box"><div class="info-box-label">Parent Breeds</div><div class="info-box-value">${b.parents}</div></div>
            <div class="info-box"><div class="info-box-label">Breed Type</div><div class="info-box-value">Hybrid / Designer Dog</div></div>
            <div class="info-box"><div class="info-box-label">Best Known For</div><div class="info-box-value">${b.bestFor}</div></div>
            <div class="info-box"><div class="info-box-label">Coat Type</div><div class="info-box-value">${b.coatType}</div></div>
          </div>
        </div>

        <div class="breed-section">
          <h2>📸 Photo Gallery</h2>
          <p>Real ${b.name}s — coat types and colors vary widely depending on which parent's genes dominate.</p>
          <div class="breed-gallery" id="breedGallery">
            <img class="gallery-photo" id="gp1" alt="${b.name} photo 1" />
            <img class="gallery-photo" id="gp2" alt="${b.name} photo 2" />
            <img class="gallery-photo" id="gp3" alt="${b.name} photo 3" />
            <img class="gallery-photo" id="gp4" alt="${b.name} photo 4" />
            <img class="gallery-photo" id="gp5" alt="${b.name} photo 5" />
            <img class="gallery-photo" id="gp6" alt="${b.name} photo 6" />
          </div>
        </div>

        <div class="breed-section">
          <h2>😊 Temperament &amp; Personality</h2>
          ${b.temperament}
        </div>

        <div class="breed-section">
          <h2>🏃 Exercise &amp; Activity Needs</h2>
          ${b.exercise}
          <div class="travel-tip-box">
            <h4>✈️ Traveling with Your ${b.name}?</h4>
            <p>${b.travelTip}</p>
          </div>
        </div>

        <div class="breed-section">
          <h2>✂️ Grooming &amp; Coat Care</h2>
          ${b.grooming}
        </div>

        <div class="breed-section">
          <h2>🎓 Training</h2>
          ${b.training}
        </div>

        <div class="breed-section">
          <h2>🏥 Health &amp; Common Issues</h2>
          ${b.health}
          <div class="health-tags">
            ${b.healthTags.map(t => `<span class="health-tag">${t}</span>`).join('\n            ')}
          </div>
          <div class="info-grid" style="margin-top:16px">
            <div class="info-box"><div class="info-box-label">Average Lifespan</div><div class="info-box-value">${b.lifespan}</div></div>
            <div class="info-box"><div class="info-box-label">Hybrid Vigor</div><div class="info-box-value">${b.hybridVigor}</div></div>
            <div class="info-box"><div class="info-box-label">Shedding</div><div class="info-box-value">${b.shedding}</div></div>
            <div class="info-box"><div class="info-box-label">Hypoallergenic</div><div class="info-box-value">${b.hypoallergenic}</div></div>
          </div>
        </div>

        <div class="breed-section">
          <h2>🏠 Is a ${b.name} Right for You?</h2>
          ${b.rightForYou}
          <div class="compat-grid">
            <div class="compat-item"><span class="compat-icon">👶</span><span class="compat-label">With Kids</span><span class="compat-stars">${b.compat.kids}</span></div>
            <div class="compat-item"><span class="compat-icon">🐕</span><span class="compat-label">With Dogs</span><span class="compat-stars">${b.compat.dogs}</span></div>
            <div class="compat-item"><span class="compat-icon">🐈</span><span class="compat-label">With Cats</span><span class="compat-stars">${b.compat.cats}</span></div>
            <div class="compat-item"><span class="compat-icon">🏠</span><span class="compat-label">Apartment</span><span class="compat-stars">${b.compat.apartment}</span></div>
            <div class="compat-item"><span class="compat-icon">🔰</span><span class="compat-label">First-Time Owner</span><span class="compat-stars">${b.compat.firstTime}</span></div>
            <div class="compat-item"><span class="compat-icon">🌡️</span><span class="compat-label">Hot Climates</span><span class="compat-stars">${b.compat.heat}</span></div>
          </div>
        </div>

        <div class="breed-section">
          <h2>🐾 Meet the Parent Breeds</h2>
          <div class="related-breeds">
            ${b.parentLinks.map(r => `<a href="/breeds/${r.slug}.html" class="related-card"><span class="rel-emoji">${r.emoji}</span><span>${r.name}</span></a>`).join('\n            ')}
          </div>
        </div>

        </div><!-- end tab-profile -->

        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ Diet &amp; Feeding Guide</h2>
            <p>${b.diet.intro}</p>
            <table class="breed-table">
              <thead><tr><th>Life Stage</th><th>Daily Amount</th><th>Notes</th></tr></thead>
              <tbody>
                ${b.diet.rows.map(([a,bb,c]) => `<tr><td>${a}</td><td>${bb}</td><td>${c}</td></tr>`).join('\n                ')}
              </tbody>
            </table>
            <div class="info-box">
              <h3>💧 Hydration &amp; Treats</h3>
              <p>Always provide fresh water. Keep treats to ≤10% of daily calories. Avoid chocolate, grapes, onions, and xylitol — all toxic to dogs.</p>
            </div>
          </div>
        </div><!-- end tab-diet -->

        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 Cost &amp; Price Guide</h2>
            <table class="breed-table">
              <thead><tr><th>Expense</th><th>Estimated Cost</th></tr></thead>
              <tbody>
                <tr><td>Puppy from Breeder</td><td>${b.cost.puppy}</td></tr>
                <tr><td>Monthly Food</td><td>${b.cost.monthly}</td></tr>
                <tr><td>Annual Vet Care</td><td>${b.cost.annual}</td></tr>
                ${b.cost.extras.map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('\n                ')}
              </tbody>
            </table>
            <div class="info-box">
              <h3>💡 Cost-Saving Tips</h3>
              <p>${b.cost.tips}</p>
            </div>
          </div>
        </div><!-- end tab-cost -->

        <div class="breed-tab-panel" id="tab-generations">
          <div class="breed-section">
            <h2>🧬 Understanding ${b.name} Generations</h2>
            <p>${b.generations.intro}</p>
            <table class="breed-table">
              <thead><tr><th>Generation</th><th>Makeup</th><th>Shedding</th><th>Best For</th></tr></thead>
              <tbody>
                ${b.generations.rows.map(([gen,makeup,shed,best]) => `<tr><td><strong>${gen}</strong></td><td>${makeup}</td><td>${shed}</td><td>${best}</td></tr>`).join('\n                ')}
              </tbody>
            </table>
            <div class="info-box">
              <h3>💡 Which Generation Should You Choose?</h3>
              <p>${b.generations.tip}</p>
            </div>
          </div>
        </div><!-- end tab-generations -->

        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Fun Facts About ${b.name}s</h2>
            <div class="fun-facts-grid">
              ${b.facts.map(([emoji, title, text]) => `<div class="fun-fact-card">
                <div class="fun-fact-icon">${emoji}</div>
                <h3>${title}</h3>
                <p>${text}</p>
              </div>`).join('\n              ')}
            </div>
          </div>
        </div><!-- end tab-facts -->

      </div>

      <aside class="breed-sidebar">
        <div class="sidebar-card">
          <h4>Breed Traits</h4>
          <div class="trait-row">
            ${b.traits.map(([label, pct]) => `<div class="trait-item">
              <div class="trait-header"><span>${label}</span><span>${Math.round(pct/20)}/5</span></div>
              <div class="trait-bar-bg"><div class="trait-bar-fill" style="width:${pct}%"></div></div>
            </div>`).join('\n            ')}
          </div>
        </div>
        <div class="sidebar-card" style="background:var(--teal-light); border-color:var(--teal)">
          <h4 style="color:var(--teal-dark)">Explore More Breeds</h4>
          <p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">Browse our full directory of purebred and hybrid breeds.</p>
          <a href="/breeds/index.html" style="display:block; text-align:center; background:var(--teal); color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:.88rem;">Browse All Breeds →</a>
        </div>
        <div class="sidebar-card" style="background:#fff8e1; border-color:#f59e0b">
          <h4 style="color:#92400e">🧬 Hybrid Breed</h4>
          <p style="color:#78350f; font-size:.88rem;">The ${b.name} is a designer crossbreed, not AKC-recognized. Individual dogs vary in appearance and temperament depending on which parent's traits dominate.</p>
        </div>
        <div class="sidebar-card">
          <h4>Quick Facts</h4>
          <div class="trait-row">
            <div class="info-box"><div class="info-box-label">Type</div><div class="info-box-value">Hybrid / Designer</div></div>
            <div class="info-box" style="margin-top:8px"><div class="info-box-label">Parent Breeds</div><div class="info-box-value">${b.parents}</div></div>
            <div class="info-box" style="margin-top:8px"><div class="info-box-label">Hypoallergenic</div><div class="info-box-value">${b.hypoallergenic}</div></div>
            <div class="info-box" style="margin-top:8px"><div class="info-box-label">Shedding</div><div class="info-box-value">${b.shedding}</div></div>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div>
          <p>Your complete guide to dog breeds, pet boarding in Seattle, and nationwide pet transportation.</p>
        </div>
        <div class="footer-col">
          <h4>More Hybrids</h4>
          <ul>
            <li><a href="labradoodle.html">Labradoodle</a></li>
            <li><a href="goldendoodle.html">Goldendoodle</a></li>
            <li><a href="bernedoodle.html">Bernedoodle</a></li>
            <li><a href="index.html">All Breeds →</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><a href="https://www.pawsvip.com" target="_blank">Pet Hotel Seattle</a></li>
            <li><a href="../index.html#transport">Nationwide Transport</a></li>
            <li><a href="../index.html#contact">Get a Quote</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom"><p>© 2024 AllDogFacts. All rights reserved.</p></div>
    </div>
  </footer>

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
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <button class="lightbox-prev" id="lightboxPrev">&#9664;</button>
    <img id="lightboxImg" src="" alt="Enlarged dog photo" />
    <button class="lightbox-next" id="lightboxNext">&#9654;</button>
  </div>
  <script>
    let galleryPhotos = [], currentPhotoIndex = 0;
    fetch('https://dog.ceo/api/breed/${b.apiBreed}/images')
      .then(r => r.json()).then(data => {
        const photos = data.message;
        const hero = document.getElementById('breedPhoto');
        hero.src = photos[2];
        hero.onload = () => { hero.style.display='block'; document.getElementById('breedEmoji').style.display='none'; };
        [5,10,18,25,33,40].forEach((idx,i) => {
          const el = document.getElementById('gp'+(i+1));
          const src = photos[idx]||photos[i];
          if (el&&src) { galleryPhotos.push(src); el.src=src; el.addEventListener('click',()=>openLightbox(i)); }
        });
      }).catch(()=>{});
    function openLightbox(i){ currentPhotoIndex=i; document.getElementById('lightboxImg').src=galleryPhotos[i]; document.getElementById('lightbox').classList.add('open'); }
    function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }
    document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click',(e)=>{ e.stopPropagation(); currentPhotoIndex=(currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length; document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightboxNext').addEventListener('click',(e)=>{ e.stopPropagation(); currentPhotoIndex=(currentPhotoIndex+1)%galleryPhotos.length; document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightbox').addEventListener('click',(e)=>{ if(e.target===e.currentTarget)closeLightbox(); });
    document.addEventListener('keydown',(e)=>{
      if(!document.getElementById('lightbox').classList.contains('open'))return;
      if(e.key==='ArrowLeft'){currentPhotoIndex=(currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];}
      else if(e.key==='ArrowRight'){currentPhotoIndex=(currentPhotoIndex+1)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];}
      else if(e.key==='Escape'){closeLightbox();}
    });
  </script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// POMSKY
// ─────────────────────────────────────────────────────────────
const POMSKY = {
  name: 'Pomsky', slug: 'pomsky', emoji: '🐺', apiBreed: 'husky',
  youtubeId: 'R-LWrAmKapk', parents: 'Pomeranian + Siberian Husky',
  subtitle: 'Hybrid / Designer Dog · The Miniature Wolf-Dog · Stunning, Spirited &amp; Social Media Famous',
  weight: '7–38 lbs', height: '10–15"', lifespan: '13–15 yrs',
  familyStar: '★★★☆☆', hypoallergenic: 'No', shedding: 'High',
  bestFor: 'Experienced owners, people who love Huskies but want a smaller dog',
  coatType: 'Thick double coat; heavy shedder; often blue-eyed or multi-eyed',
  metaDesc: 'Complete Pomsky guide: temperament, size, generations, grooming, and whether this gorgeous Pomeranian + Siberian Husky hybrid is the right dog for you.',
  keywords: 'Pomsky, Pomeranian Husky mix, Pomsky temperament, Pomsky size, miniature Husky dog breed',
  hybridVigor: 'Good',
  overview: `<p>The Pomsky — a cross between the Pomeranian and the Siberian Husky — is one of the most visually stunning hybrid dogs ever created. With the Husky's wolf-like face and piercing blue or multi-colored eyes scaled down to a more manageable size, the Pomsky looks like a fairy-tale dog brought to life. They exploded on social media around 2012 and have been trending ever since.</p>
          <p>But the Pomsky is far more than a pretty face. These are spirited, intelligent, vocal dogs that inherit the Husky's independent streak and the Pomeranian's boldness. They require experienced ownership, consistent training, and tolerance for heavy shedding. Done right, the Pomsky is a breathtaking, loyal companion. Done wrong, they can be a handful.</p>`,
  temperament: `<p>Pomskies are lively, charismatic, and deeply social dogs. They inherit the Pomeranian's big personality and the Husky's playful mischief. They love being the center of attention, are typically friendly with people they know, and can be entertaining in their vocal expressiveness — Pomskies "talk" and howl, especially when they want something.</p>
          <ul>
            <li>Lively, bold, and full of personality</li>
            <li>Affectionate with family; may be reserved with strangers initially</li>
            <li>Vocal — howl, whine, and "talk" like their Husky parent</li>
            <li>Independent streak — not always eager to please</li>
            <li>High prey drive from both parent breeds — caution with small animals</li>
            <li>Can be stubborn; not ideal for first-time owners</li>
          </ul>`,
  exercise: `<p>Pomskies have moderate to high energy needs — more than their size might suggest. They need daily exercise to stay physically and mentally healthy, but their smaller size compared to pure Huskies makes this manageable. Without sufficient activity, they become destructive and excessively vocal. They love to run, play, and explore.</p>
          <ul>
            <li>Daily requirement: 45–60 minutes of active exercise</li>
            <li>Enjoy running, fetch, agility, and off-leash play (in secure areas)</li>
            <li>Strong prey drive — always use a leash or secure fencing</li>
            <li>Mental stimulation through puzzle toys and training is essential</li>
            <li>Can adapt to apartment living with sufficient daily exercise</li>
            <li>Thrive in cooler climates; heavy coat means heat sensitivity</li>
          </ul>`,
  travelTip: 'Pomskies in the 7–20 lb range may qualify for in-cabin airline travel. Larger Pomskies travel best in cargo or by car. Their thick double coat means they can overheat in warm climates — always keep cool water available and avoid peak heat hours. They adapt well to travel routines once established.',
  grooming: `<p>The Pomsky's thick double coat is beautiful — and demanding. They shed heavily year-round and blow their full coat twice a year, during which shedding is extreme. No amount of grooming reduces shedding; it only manages it. Regular brushing keeps the coat healthy and reduces loose fur in your home. Professional grooming every 6–8 weeks is recommended.</p>
          <ul>
            <li>Brush 3–4 times per week; daily during seasonal blowout</li>
            <li>Professional grooming every 6–8 weeks</li>
            <li>NEVER shave a Pomsky — the double coat insulates against both heat and cold</li>
            <li>Check ears weekly; clean as needed</li>
            <li>Brush teeth 2–3 times per week; dental disease common in smaller Pomeranians</li>
            <li>Trim nails every 3–4 weeks</li>
          </ul>`,
  training: `<p>Training a Pomsky requires patience, consistency, and a sense of humor. The Husky's independent nature means they may understand what you want — and choose not to do it. The Pomeranian's boldness means they are not easily intimidated or corrected. Positive reinforcement with high-value treats works best. Early training and socialization are essential.</p>
          <ul>
            <li>Intelligent but selectively obedient — "why should I?" mentality</li>
            <li>Short, engaging training sessions work better than long drills</li>
            <li>High-value treats are essential motivators</li>
            <li>Early socialization reduces wariness and excessive barking</li>
            <li>Recall training is critical — Huskies are infamous escape artists</li>
            <li>Crate training from puppyhood helps manage destructive tendencies</li>
          </ul>`,
  health: `<p>Pomskies benefit from hybrid vigor and tend to be healthy, long-lived dogs. Health concerns can come from either parent: dental disease and tracheal collapse from the Pomeranian side; eye conditions and hip dysplasia from the Husky side. Because breeding a Pomeranian female to a Husky male is impossible safely (size difference), artificial insemination or Husky female to Pomeranian male crosses are used — meaning litter outcomes can be variable.</p>`,
  healthTags: ['Dental Disease', 'Tracheal Collapse', 'Hip Dysplasia', 'Progressive Retinal Atrophy', 'Hypothyroidism', 'Luxating Patella', 'Allergies'],
  rightForYou: `<p>Pomskies are best suited to experienced dog owners who can handle an independent, spirited, vocal dog. They are stunning companions for active people who are prepared for significant grooming demands and a dog that will not always follow orders. Not recommended for first-time owners, households with very small pets, or people who want a quiet, low-maintenance dog.</p>`,
  compat: { kids: '★★★☆☆', dogs: '★★★☆☆', cats: '★★☆☆☆', apartment: '★★★☆☆', firstTime: '★★☆☆☆', heat: '★★☆☆☆' },
  parentLinks: [
    { slug: 'pomeranian', emoji: '🐕', name: 'Pomeranian' },
    { slug: 'siberian-husky', emoji: '🐺', name: 'Siberian Husky' },
  ],
  diet: {
    intro: 'Pomskies are small to medium dogs with high energy relative to their size. Feed a high-quality small or medium breed kibble with lean protein as the first ingredient. Because Pomeranians are prone to hypoglycemia, avoid long gaps between meals for smaller Pomskies. Omega-3 fatty acids support their thick, lustrous coat.',
    rows: [
      ['Puppy (2–12 mo)', '1/2 – 1.5 cups/day', 'Small-breed puppy formula; 3 meals/day; monitor blood sugar in tiny pups'],
      ['Adult (1–10 yr)', '3/4 – 2 cups/day', 'Size-appropriate formula; 2 meals/day; omega-3 supplement for coat'],
      ['Senior (10+ yr)', '1/2 – 1.5 cups/day', 'Reduce if less active; dental-friendly diet or kibble for oral health'],
    ],
  },
  cost: {
    puppy: '$1,000 – $5,000',
    monthly: '$40 – $80',
    annual: '$500 – $1,200',
    extras: [
      ['Professional Grooming', '$60 – $110/visit (every 6–8 weeks)'],
      ['De-shedding Treatments', '$30 – $60 add-on during grooming visits'],
      ['Quality Vacuum Cleaner', '$150 – $400 one-time (essential for heavy shedder)'],
    ],
    tips: 'Pomsky pricing is highly variable based on size, eye color, and coat pattern — blue eyes and smaller size command premiums of $1,000+. Be wary of unethical breeders selling "mini Huskies" that are actually pure Pomskies. Ask for genetic testing documentation. Grooming is the major ongoing cost; invest in a good de-shedding brush to extend time between professional visits.',
  },
  generations: {
    intro: 'Pomsky generations describe the ratio of Pomeranian to Husky genetics. Unlike Doodle breeds, Pomsky size and appearance can vary dramatically — a significant concern for buyers who expect a specific size. Reputable Pomsky breeders provide size estimates with genetic testing.',
    rows: [
      ['F1', '50% Pomeranian + 50% Husky', 'High', 'Most Husky-looking; size varies 15–38 lbs; wolf-like appearance'],
      ['F1B', '75% Pomeranian + 25% Husky', 'High', 'Smaller, more Pom-like; 7–20 lbs; retains Husky face traits'],
      ['F2', '50/50 second generation', 'High', 'More consistent size; appearance still variable'],
      ['Multigen', 'Multiple Pomsky generations', 'High', 'Most predictable size; established Pomsky lines'],
    ],
    tip: 'For the smallest, most apartment-friendly Pomsky, choose F1B or multigen lines from breeders with proven size histories. For the most dramatic Husky look in a medium-sized package, F1 is the classic choice. Always see both parent dogs in person — they give the best indication of your puppy\'s adult size.',
  },
  facts: [
    ['📱', 'Born on the Internet', 'The Pomsky became famous almost overnight in 2012 when viral photos of what appeared to be a puppy Husky went massively viral — it turned out to be an adult Pomsky. From that moment, demand exploded globally. They remain one of the most searched hybrid dog breeds on Instagram and TikTok.'],
    ['🔬', 'An Artificial Insemination Breed', 'The size difference between Pomeranians and Huskies makes natural breeding between them impossible or dangerous. All Pomskies are created through artificial insemination, with a Husky female typically serving as the mother to safely carry the litter. This complexity is part of why Pomsky puppies are expensive.'],
    ['🐺', 'The Miniature Wolf-Dog', 'Pomskies often carry the Husky\'s striking wolf-like facial features, including the distinctive facial mask markings, erect ears, and blue or bi-colored eyes — all compressed into a body weighing just 10–30 lbs. Many people describe seeing their first Pomsky as encountering a wolf puppy that never grew up.'],
    ['🎭', 'Vocal Virtuosos', 'Husky genes bring extraordinary vocal ability — Pomskies howl, yodel, whine, and "talk" expressively. Many Pomsky owners report full conversations with their dogs. While charming, this can be challenging in apartments or noise-sensitive environments. Pomsky howling videos are among the most viral pet content online.'],
    ['📏', 'The Size Lottery', 'Pomsky size is notoriously difficult to predict. Two Pomsky parents can produce puppies ranging from 7 to 38 lbs — a remarkable range. This unpredictability is one of the breed\'s most controversial traits and a frequent source of frustration for buyers who expected a specific size. Always research breeders who track adult sizes carefully.'],
  ],
  traits: [
    ['Energy Level', 80], ['Trainability', 60], ['Friendliness', 60],
    ['Grooming Needs', 100], ['Good with Kids', 60], ['Barking', 100], ['Shedding', 100],
  ],
};

// ─────────────────────────────────────────────────────────────
// SCHNOODLE
// ─────────────────────────────────────────────────────────────
const SCHNOODLE = {
  name: 'Schnoodle', slug: 'schnoodle', emoji: '🐩', apiBreed: 'schnauzer',
  youtubeId: 'UHByBfGGEGY', parents: 'Schnauzer + Poodle',
  subtitle: 'Hybrid / Designer Dog · Forever Puppy Face · Spirited, Smart &amp; Low-Shedding',
  weight: '6–75 lbs', height: '10–26"', lifespan: '13–17 yrs',
  familyStar: '★★★★☆', hypoallergenic: 'Often', shedding: 'Very Low',
  bestFor: 'Families, allergy sufferers, active singles, apartment dwellers (Mini)',
  coatType: 'Soft, wavy or curly; very low-shedding; non-stop growing coat',
  metaDesc: 'Complete Schnoodle guide: temperament, size variations, generations, grooming needs, and whether this Schnauzer + Poodle mix is the right spirited companion for your home.',
  keywords: 'Schnoodle, Schnauzer Poodle mix, Schnoodle temperament, Schnoodle care, low shedding hybrid dog',
  hybridVigor: 'Good — generally healthier than either parent',
  overview: `<p>The Schnoodle is a cross between the Schnauzer (Miniature, Standard, or Giant) and the Poodle, creating a hybrid that combines two of dogdom's most intelligent, spirited, and low-shedding breeds. The result is a dog that is clever, fun-loving, devoted to family, and virtually shed-free — with a distinctive scruffy, teddy-bear face that earns the name "forever puppy."</p>
          <p>Schnoodles come in a wide range of sizes depending on which Schnauzer parent is used: Toy and Mini Schnoodles (6–20 lbs) from Miniature Schnauzer parents, Standard Schnoodles (20–55 lbs) from Standard Schnauzer parents, and Giant Schnoodles (50–75 lbs) from Giant Schnauzer parents. This versatility makes the Schnoodle one of the most adaptable hybrids in terms of lifestyle fit.</p>`,
  temperament: `<p>Schnoodles are lively, alert, and deeply loyal. They have a clown-like sense of humor inherited from both parent breeds and love making their families laugh. Schnauzers bring terrier-like spunk and confidence; Poodles bring sensitivity and trainability. The combination creates a dog that is entertaining, affectionate, and surprisingly athletic despite its small-to-medium size.</p>
          <ul>
            <li>Playful, spirited, and endlessly entertaining</li>
            <li>Deeply loyal to family — classic "one-person dog" tendencies</li>
            <li>Alert watchdogs — will bark at strangers and noises</li>
            <li>Intelligent and eager to please (with the right motivation)</li>
            <li>Can have stubborn moments — Schnauzer independence shows through</li>
            <li>Generally good with children; better with older kids</li>
          </ul>`,
  exercise: `<p>Schnoodles are moderately energetic dogs with exercise needs proportional to their size. Mini Schnoodles are content with 30–45 minutes of daily activity; Standard and Giant Schnoodles need 45–60+ minutes. All sizes enjoy mental challenges and physical play equally. They are adaptable — equally happy in a city apartment (Mini) or on a farm (Giant).</p>
          <ul>
            <li>Daily requirement: 30–60 minutes depending on size</li>
            <li>Enjoy walks, fetch, agility, and interactive play</li>
            <li>Mental stimulation through training is equally important as physical exercise</li>
            <li>Mini Schnoodles are excellent apartment dogs</li>
            <li>Standard and Giant Schnoodles enjoy hiking and outdoor adventures</li>
            <li>Alert, curious nature means they love exploring new environments</li>
          </ul>`,
  travelTip: 'Mini Schnoodles (6–20 lbs) are excellent travel dogs — compact enough for in-cabin airline travel and adaptable enough to settle quickly in new environments. Their low-shedding coat means minimal mess in hotel rooms and rental cars. Larger Schnoodles travel well by car. Their alert nature makes them good watchdogs when staying in unfamiliar places.',
  grooming: `<p>The Schnoodle coat is one of its best features — very low-shedding and nearly odor-free. But it grows continuously and will mat without regular brushing. Most owners opt for a short "puppy cut" or "teddy bear" trim for easy maintenance. Professional grooming every 6–8 weeks is the standard routine. Their Schnauzer heritage gives them a naturally scruffy look that is immediately charming.</p>
          <ul>
            <li>Brush 3–4 times per week to prevent matting</li>
            <li>Professional grooming every 6–8 weeks</li>
            <li>Trim around eyes and beard area regularly</li>
            <li>Clean ears weekly — both parent breeds can be prone to ear issues</li>
            <li>Brush teeth 2–3 times per week; dental health is important for smaller dogs</li>
            <li>Trim nails every 3–4 weeks</li>
          </ul>`,
  training: `<p>Schnoodles are intelligent and generally willing to learn — the Poodle's trainability usually wins out over the Schnauzer's stubbornness. They thrive in obedience classes, agility, and trick training. They need variety in training to stay engaged — repetitive drills bore them. Positive reinforcement with food rewards and play works exceptionally well.</p>
          <ul>
            <li>Learns quickly with consistent, varied training sessions</li>
            <li>Highly food motivated — small, high-value treats work best</li>
            <li>Excels in agility, obedience, and trick training</li>
            <li>Can be stubborn in adolescence — patience is key</li>
            <li>Early socialization reduces wariness and excessive barking</li>
            <li>Thrives in structured training environments like puppy classes</li>
          </ul>`,
  health: `<p>Schnoodles generally benefit from hybrid vigor and tend to be long-lived and healthy. Known health concerns from the Schnauzer side include pancreatitis, bladder stones, and Schnauzer comedo syndrome (skin condition). From the Poodle side: progressive retinal atrophy, epilepsy, and Addison's disease. Reputable breeders test for hips, eyes, and genetic diseases before breeding.</p>`,
  healthTags: ['Pancreatitis', 'Bladder Stones', 'Progressive Retinal Atrophy', 'Hip Dysplasia', 'Addison\'s Disease', 'Epilepsy', 'Schnauzer Comedo Syndrome'],
  rightForYou: `<p>Schnoodles are wonderfully versatile hybrid dogs that fit a wide range of lifestyles depending on size. Mini Schnoodles are outstanding apartment companions for singles, couples, and families with older children. Standard and Giant Schnoodles suit more active, spacious households. Their low-shedding coat makes them popular with allergy sufferers. Grooming commitment is their main requirement.</p>`,
  compat: { kids: '★★★★☆', dogs: '★★★★☆', cats: '★★★☆☆', apartment: '★★★★☆', firstTime: '★★★★☆', heat: '★★★★☆' },
  parentLinks: [
    { slug: 'miniature-schnauzer', emoji: '🐶', name: 'Miniature Schnauzer' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Schnoodle diet needs vary significantly by size. Mini Schnoodles eat small amounts of high-quality small-breed kibble. Standard and Giant Schnoodles need proportionally more food with joint support in mind. Schnauzers are prone to pancreatitis — feed a low-fat diet and avoid high-fat treats. Split meals into two daily portions.',
    rows: [
      ['Puppy (2–12 mo)', '1/4 – 2 cups/day', 'Size-appropriate puppy formula; 3 meals/day; low-fat to protect against pancreatitis'],
      ['Adult (1–10 yr)', '1/2 – 3 cups/day', '2 meals/day; low-to-moderate fat content; lean protein sources'],
      ['Senior (10+ yr)', '1/2 – 2 cups/day', 'Reduce if less active; joint support supplements for Standard/Giant sizes'],
    ],
  },
  cost: {
    puppy: '$700 – $3,000',
    monthly: '$30 – $90',
    annual: '$400 – $1,200',
    extras: [
      ['Professional Grooming', '$55 – $120/visit (every 6–8 weeks, size-dependent)'],
      ['Dental Cleanings', '$150 – $350/year (important for smaller Schnoodles)'],
      ['Pancreatitis Emergency Fund', '$500 – $2,000 if dietary indiscretion occurs'],
    ],
    tips: 'Mini Schnoodles are the most affordable size; Giant Schnoodles command higher prices and incur higher food and grooming costs. Adopt from a Schnauzer or Poodle rescue for $150–$400. Feed a consistently low-fat diet — pancreatitis episodes are painful and expensive. Budget for regular professional grooming as the biggest ongoing cost.',
  },
  generations: {
    intro: 'Schnoodle generations follow the same F1, F1B, F2, and multigen pattern as other Poodle hybrids. Because Schnauzers already shed very little, even F1 Schnoodles are remarkably low-shedding — making generation less critical for allergy management than in some other Doodle crosses.',
    rows: [
      ['F1', '50% Schnauzer + 50% Poodle', 'Very Low', 'Classic Schnoodle; scruffy-teddy look; low shedding from day one'],
      ['F1B', '25% Schnauzer + 75% Poodle', 'Near Zero', 'Curlier coat; most Poodle-like; best for severe allergies'],
      ['F2', '50/50 second generation', 'Very Low', 'Consistent results; established temperament blend'],
      ['Multigen', 'Multiple Schnoodle generations', 'Near Zero', 'Most predictable; established lines with reliable size and coat'],
    ],
    tip: 'Since Schnauzers shed very little themselves, even F1 Schnoodles are excellent for most allergy sufferers. The generation choice matters more for coat texture and adult size than for shedding. Focus on finding a reputable breeder who tests for pancreatitis and eye conditions in their parent dogs.',
  },
  facts: [
    ['🎭', 'The Forever Puppy', 'Schnoodles are famous for maintaining their puppy-like appearance well into old age. Their soft, wavy coats and distinctive teddy-bear facial features make even senior Schnoodles look like puppies at a glance. This "forever puppy" quality is one of the most beloved traits among Schnoodle enthusiasts.'],
    ['🏆', 'Two Genius Breeds', 'Both the Schnauzer and the Poodle are renowned for their intelligence. Miniature Schnauzers rank #12 in Stanley Coren\'s definitive dog intelligence study; Standard Schnauzers rank even higher. Poodles rank #2 overall. The Schnoodle inherits this exceptional cognitive horsepower — they pick up new skills impressively fast.'],
    ['🤸', 'Agility Stars', 'Schnoodles have become increasingly successful in dog agility competitions, combining Poodle athleticism with Schnauzer drive and determination. Their light, nimble build and high motivation make them natural agility candidates. Many Schnoodle owners are surprised by just how athletic these scruffy little dogs can be.'],
    ['👃', 'The Schnauzer Beard', 'One of the most charming inherited traits is the Schnoodle\'s tendency toward a slightly scruffy beard and eyebrows — a Schnauzer signature that softens the Poodle\'s more polished look. The result is a distinctly expressive, almost human-looking face that many owners describe as having a permanent "concerned professor" expression.'],
    ['📐', 'Three Sizes, One Personality', 'Unlike many hybrid breeds where size variation is a problem, the Schnoodle intentionally comes in three size ranges — Mini (6–20 lbs), Standard (20–55 lbs), and Giant (50–75 lbs) — by using different Schnauzer parents. This makes the Schnoodle one of the most size-scalable hybrids, allowing buyers to choose the perfect fit for their lifestyle.'],
  ],
  traits: [
    ['Energy Level', 60], ['Trainability', 80], ['Friendliness', 80],
    ['Grooming Needs', 80], ['Good with Kids', 80], ['Barking', 80], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES + UPDATE INDEX + SITEMAP
// ─────────────────────────────────────────────────────────────
[POMSKY, SCHNOODLE].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildHybridPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/pomsky.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="high" data-kids="yes" data-name="pomsky pomeranian husky mix wolf dog">
          <div class="breed-emoji-wrap" data-api="husky"><img class="breed-card-real-photo" alt="Pomsky" /><span class="breed-card-emoji-fallback">🐺</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Pomsky <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>The internet's most famous dog — a stunning miniature Husky with a Pomeranian's personality. Spirited and social media iconic.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/schnoodle.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="medium" data-kids="yes" data-name="schnoodle schnauzer poodle mix low shedding">
          <div class="breed-emoji-wrap" data-api="schnauzer"><img class="breed-card-real-photo" alt="Schnoodle" /><span class="breed-card-emoji-fallback">🐩</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Schnoodle <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>The forever puppy — spunky, smart, and virtually shed-free. Two genius breeds combine for one irresistible scruffy companion.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>`;

const GRID_CLOSE = '      </div>\n    </div>\n  </section>';
if (!idxHtml.includes(GRID_CLOSE)) throw new Error('Grid closing pattern not found');
idxHtml = idxHtml.replace(GRID_CLOSE, NEW_CARDS + '\n\n' + GRID_CLOSE);
fs.writeFileSync(idxPath, idxHtml, 'utf8');
console.log('✅ breeds/index.html updated');

const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n');
sitemap = sitemap.replace('</urlset>',
  `\n  <url><loc>https://www.alldogfacts.com/breeds/pomsky.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/schnoodle.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Hybrid Batch 4 complete: pomsky + schnoodle');
