// generate_hybrid3.js — Bernedoodle + Aussiedoodle
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
            <li><a href="cavapoo.html">Cavapoo</a></li>
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
// BERNEDOODLE
// ─────────────────────────────────────────────────────────────
const BERNEDOODLE = {
  name: 'Bernedoodle', slug: 'bernedoodle', emoji: '🐕', apiBreed: 'mountain/bernese',
  youtubeId: 'jEPc3s0ZJFU', parents: 'Bernese Mountain Dog + Poodle',
  subtitle: 'Hybrid / Designer Dog · Playful, Loyal &amp; Low-Shedding · The Gentle Giant Doodle',
  weight: '10–90 lbs', height: '12–29"', lifespan: '12–18 yrs',
  familyStar: '★★★★★', hypoallergenic: 'Often', shedding: 'Low–Very Low',
  bestFor: 'Families, active owners, cold climates, those wanting a low-shedding large dog',
  coatType: 'Wavy or curly; thick, low-shedding; often tricolor',
  metaDesc: 'Complete guide to the Bernedoodle: temperament, generations, grooming, health, and why this Bernese Mountain Dog + Poodle mix is beloved by families worldwide.',
  keywords: 'Bernedoodle, Bernese Mountain Dog Poodle mix, Bernedoodle temperament, Bernedoodle care, tricolor doodle dog',
  hybridVigor: 'Strong — significantly longer-lived than purebred Bernese',
  overview: `<p>The Bernedoodle is one of the most visually striking hybrid dogs — a cross between the majestic Bernese Mountain Dog and the intelligent Poodle. Known for their gorgeous tricolor coats (black, white, and rust), calm loyalty, and playful goofiness, Bernedoodles combine the Bernese's heart of gold with the Poodle's longevity and low-shedding coat.</p>
          <p>What makes the Bernedoodle particularly compelling is the hybrid vigor factor. Purebred Bernese Mountain Dogs have one of the shortest lifespans of any large breed — often just 7–8 years, frequently lost to cancer. By crossing with the long-lived Poodle, Bernedoodles regularly reach 12–18 years. For Bernese lovers who've grieved too soon, the Bernedoodle offers the temperament they love in a body that lasts.</p>`,
  temperament: `<p>Bernedoodles inherit the best of both worlds: the Bernese Mountain Dog's gentle, loyal, goofy nature and the Poodle's intelligence and attentiveness. They tend to be calm yet playful — devoted family dogs that are equally happy romping in snow or cuddling on the couch. They bond closely with their families and are known for a puppy-like silliness that persists well into adulthood.</p>
          <ul>
            <li>Loyal, affectionate, and deeply bonded to family</li>
            <li>Playful and goofy — retain puppy energy for years</li>
            <li>Gentle with children, excellent with young kids</li>
            <li>Typically calm indoors once exercise needs are met</li>
            <li>Can be stubborn (Bernese trait) — patience in training is key</li>
            <li>Some are wary of strangers initially but warm up quickly</li>
          </ul>`,
  exercise: `<p>Bernedoodles are moderately active dogs that need consistent daily exercise — but they're not as demanding as pure working breeds. Standard Bernedoodles need 45–60 minutes of daily activity; Minis and Tinys less. They thrive in homes with yards and absolutely love cold weather and snow — a trait inherited from their Bernese side.</p>
          <ul>
            <li>Daily requirement: 45–60 min (Standard); 30–45 min (Mini/Tiny)</li>
            <li>Excellent hiking companions — love trails and outdoor adventures</li>
            <li>Thrive in cold climates; heat tolerance is lower</li>
            <li>Enjoy fetch, swimming, and structured play sessions</li>
            <li>Mental enrichment through training prevents boredom</li>
            <li>Minis can adapt to apartment living with sufficient walks</li>
          </ul>`,
  travelTip: 'Standard Bernedoodles are too large for in-cabin airline travel but are excellent road trip companions — calm, adaptable, and comfortable in vehicles. Mini and Tiny Bernedoodles (under 20–25 lbs) may qualify for in-cabin travel. Their calm temperament makes them great hotel and vacation rental dogs.',
  grooming: `<p>The Bernedoodle's thick, wavy or curly coat is one of their most celebrated features — especially the striking tricolor pattern — but it requires consistent maintenance to stay mat-free. Wavy coats are easier to maintain; curlier coats need more frequent brushing. Professional grooming is essential every 8–12 weeks.</p>
          <ul>
            <li>Brush 3–4 times per week; daily for curlier coats</li>
            <li>Professional grooming every 8–12 weeks</li>
            <li>Ears need weekly checking and cleaning — floppy and prone to infection</li>
            <li>Bathe every 4–8 weeks or as needed</li>
            <li>Trim nails every 3–4 weeks; brush teeth 2–3 times per week</li>
            <li>Start grooming routines early — puppies should be comfortable with handling</li>
          </ul>`,
  training: `<p>Bernedoodles are intelligent but can carry the Bernese Mountain Dog's stubborn streak — especially in early generations. They respond beautifully to positive reinforcement and thrive with patient, consistent training. Early socialization is important because some Bernedoodles can be shy or reserved. Once trained, they're highly obedient and eager to please.</p>
          <ul>
            <li>Intelligent and quick to learn with the right motivation</li>
            <li>Stubborn phase common in adolescence (8–18 months) — stay consistent</li>
            <li>Highly treat and praise motivated</li>
            <li>Excellent candidates for therapy and service dog work</li>
            <li>Early socialization crucial — expose to people, places, and sounds young</li>
            <li>Positive reinforcement only — sensitive to harsh corrections</li>
          </ul>`,
  health: `<p>Bernedoodles benefit significantly from hybrid vigor. The Bernese Mountain Dog side carries serious health concerns including high cancer rates, hip and elbow dysplasia, and a shortened lifespan. Crossing with the Poodle dramatically improves longevity and reduces genetic disease prevalence. Reputable breeders health-test for hips, elbows, eyes, and heart before breeding.</p>`,
  healthTags: ['Hip Dysplasia', 'Elbow Dysplasia', 'Progressive Retinal Atrophy', 'Von Willebrand Disease', 'Sebaceous Adenitis', 'Bloat (Standard size)', 'Hypothyroidism'],
  rightForYou: `<p>Bernedoodles are wonderful family dogs for active households that can meet their grooming and exercise needs. They're especially well-suited to families with children, cold-climate homes, and anyone who wants a large, low-shedding, deeply loyal companion. Not ideal for hot climates or truly sedentary lifestyles. Standard size requires significant space.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★★', cats: '★★★★☆', apartment: '★★★☆☆', firstTime: '★★★★☆', heat: '★★★☆☆' },
  parentLinks: [
    { slug: 'bernese-mountain-dog', emoji: '🐕', name: 'Bernese Mountain Dog' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Bernedoodles vary dramatically in size — Tiny (10–24 lbs), Mini (25–49 lbs), and Standard (50–90 lbs) — so feeding amounts differ significantly. Always feed a life-stage appropriate, breed-size specific food. Standard Bernedoodles are at risk for bloat (GDV), so elevated bowls, slow-feeder bowls, and splitting meals into 2–3 daily portions are recommended.',
    rows: [
      ['Puppy (2–12 mo)', '1 – 3 cups/day', 'Large-breed puppy formula (Standard); avoid overfeeding — controls growth rate'],
      ['Adult (1–8 yr)', '1.5 – 4 cups/day', 'Size-appropriate formula; 2–3 meals to reduce bloat risk (Standard)'],
      ['Senior (8+ yr)', '1 – 3 cups/day', 'Reduce if less active; joint-support supplements beneficial'],
    ],
  },
  cost: {
    puppy: '$2,000 – $5,000',
    monthly: '$60 – $120',
    annual: '$700 – $1,800',
    extras: [
      ['Professional Grooming', '$80 – $150/visit (every 8–12 weeks)'],
      ['OFA Health Testing at Purchase', 'Verify breeder provides hip, elbow, eye clearances'],
      ['Bloat Emergency Fund (Standard)', '$3,000 – $7,000 if GDV surgery needed'],
    ],
    tips: 'Bernedoodles are among the pricier hybrids — tricolor and "phantom" patterns command premiums. Verify that breeders provide OFA health clearances for both parent breeds. Adopting from a Doodle rescue can save $1,500–$3,000. For Standard Bernedoodles, pet insurance covering bloat and orthopedic issues is strongly recommended.',
  },
  generations: {
    intro: 'Bernedoodle generations determine the ratio of Bernese to Poodle genetics. This significantly affects shedding, coat type, and the degree of hybrid vigor. Because the Bernese side carries health risks, many breeders lean toward F1B and multigenerational lines to increase Poodle genetics.',
    rows: [
      ['F1', '50% Bernese + 50% Poodle', 'Low–Moderate', 'Classic Bernedoodle look; strong hybrid vigor; may have some shedding'],
      ['F1B', '25% Bernese + 75% Poodle', 'Very Low', 'Curlier coat; best for allergies; most popular for allergy households'],
      ['F2', '50/50 second generation', 'Variable', 'More coat unpredictability; choose carefully from health-tested lines'],
      ['Multigen', 'Multiple Bernedoodle generations', 'Near Zero', 'Most consistent; established Bernedoodle lines with predictable temperament'],
    ],
    tip: 'For the iconic tricolor Bernedoodle look with maximum health benefits, an F1 from health-tested parents is excellent. For lowest shedding and allergy households, choose F1B or multigen. Always prioritize OFA health clearances over generation or color when selecting a Bernedoodle.',
  },
  facts: [
    ['🎨', 'The Tricolor Treasure', 'The classic Bernedoodle tricolor coat — black, white, and rust — is one of the most sought-after color patterns in all of dogdom. A perfectly marked tricolor Bernedoodle puppy can command $4,000–$6,000 or more. Other popular patterns include "phantom" (black and tan) and merle, though merle breeding requires careful genetic testing.'],
    ['⏳', 'Living Longer Than Bernese', 'Pure Bernese Mountain Dogs average just 7–8 years and have devastating cancer rates (one of the highest of any breed). Bernedoodles regularly live 12–18 years. For Bernese lovers who\'ve lost dogs far too young, the Bernedoodle represents a heartfelt solution — the same sweet soul in a longer-lived body.'],
    ['❄️', 'Born for Winter', 'The Bernese Mountain Dog was developed in the Swiss Alps to haul carts through alpine terrain. Bernedoodles inherit this love of cold weather and will joyfully bound through deep snow. They thrive in cold climates and make excellent companions for skiing, snowshoeing, and winter hiking.'],
    ['🤪', 'The Silly Gene', 'Bernedoodles are widely known in the Doodle community for their extraordinary goofiness. They retain a puppy-like playfulness and sense of humor well into adulthood — often learning to make their owners laugh on purpose. Many Bernedoodle owners describe them as the funniest dogs they\'ve ever owned.'],
    ['🦺', 'Therapy Dog Naturals', 'The Bernese Mountain Dog\'s calm, intuitive nature combined with the Poodle\'s trainability and intelligence makes the Bernedoodle a natural fit for therapy work. Bernedoodles are increasingly being certified as therapy dogs for hospitals, schools, and care facilities — where their gentle, goofy presence brings immediate joy.'],
  ],
  traits: [
    ['Energy Level', 60], ['Trainability', 80], ['Friendliness', 100],
    ['Grooming Needs', 80], ['Good with Kids', 100], ['Barking', 40], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// AUSSIEDOODLE
// ─────────────────────────────────────────────────────────────
const AUSSIEDOODLE = {
  name: 'Aussiedoodle', slug: 'aussiedoodle', emoji: '🐕', apiBreed: 'australian/shepherd',
  youtubeId: 'qVDHdBOkptI', parents: 'Australian Shepherd + Poodle',
  subtitle: 'Hybrid / Designer Dog · Einstein-Level Smart · High-Energy Athlete &amp; Devoted Companion',
  weight: '25–70 lbs', height: '14–24"', lifespan: '10–13 yrs',
  familyStar: '★★★★★', hypoallergenic: 'Often', shedding: 'Low',
  bestFor: 'Active families, athletes, dog sports enthusiasts, experienced owners',
  coatType: 'Wavy or curly; low-shedding; often merle or multicolor',
  metaDesc: 'Complete guide to the Aussiedoodle: temperament, energy, training, generations, and whether this brilliant Australian Shepherd + Poodle mix is the right high-octane companion for you.',
  keywords: 'Aussiedoodle, Australian Shepherd Poodle mix, Aussiedoodle temperament, Aussiedoodle training, smart hybrid dog breeds',
  hybridVigor: 'Good — generally healthier than either parent',
  overview: `<p>The Aussiedoodle is a cross between the Australian Shepherd — one of America's most intelligent and athletic working dogs — and the Poodle, equally gifted in smarts and trainability. The result is arguably the most intellectually capable hybrid dog you can own: a dog that needs a job, loves to learn, and thrives when given purpose and challenge.</p>
          <p>Aussiedoodles are rising stars in the hybrid world, beloved by active families, dog sport enthusiasts, and anyone who wants a deeply engaged canine partner. Their striking merle coats and often blue or heterochromatic eyes make them as visually stunning as they are mentally impressive. But fair warning: this is not a dog for couch-potato households.</p>`,
  temperament: `<p>Aussiedoodles are intensely loyal, incredibly smart, and almost supernaturally tuned in to their owners. They inherit the Australian Shepherd's herding instinct and drive alongside the Poodle's eagerness to please and learn. They form extraordinarily close bonds with their primary person and thrive on being involved in everything their family does.</p>
          <ul>
            <li>Exceptionally intelligent — one of the smartest hybrid breeds</li>
            <li>Deeply loyal and velcro-dog attached to their favorite person</li>
            <li>Playful, energetic, and endlessly enthusiastic</li>
            <li>May try to herd children, other pets, or even adults (Aussie instinct)</li>
            <li>Can be wary of strangers — early socialization is essential</li>
            <li>High need for mental stimulation — boredom leads to destructive behavior</li>
          </ul>`,
  exercise: `<p>Aussiedoodles have high energy needs — this is a working-breed cross that needs substantial daily exercise and mental engagement. An Aussiedoodle that doesn't get enough activity will find creative (and often destructive) outlets. They excel in agility, flyball, frisbee, hiking, and obedience sports. These are not casual 20-minute-walk dogs.</p>
          <ul>
            <li>Daily requirement: 60–90 minutes of vigorous exercise</li>
            <li>Excel at agility, flyball, herding trials, and frisbee</li>
            <li>Require mental challenges — puzzle feeders, training sessions, dog sports</li>
            <li>Thrive with access to a fenced yard for running and play</li>
            <li>Can destructively misbehave when under-exercised or bored</li>
            <li>Make exceptional trail running and hiking companions</li>
          </ul>`,
  travelTip: 'Mini Aussiedoodles (under 25 lbs) can qualify for in-cabin airline travel. Standard Aussiedoodles travel best by car, where their energy can be burned during stops. Their high intelligence means they adapt quickly to travel routines — but they need exercise breaks to stay calm. They make outstanding road trip dogs for active travelers.',
  grooming: `<p>The Aussiedoodle's wavy or curly coat is low-shedding but requires regular maintenance to prevent matting. Their often multicolor or merle coats are beautiful but need brushing 3–4 times weekly. Like all Doodles, they need professional grooming every 8–10 weeks. Their floppy ears need regular cleaning to prevent infections.</p>
          <ul>
            <li>Brush 3–4 times per week; daily for curlier coats</li>
            <li>Professional grooming every 8–10 weeks</li>
            <li>Check and clean ears weekly — prone to ear infections</li>
            <li>Bathe every 4–8 weeks or as needed after outdoor activities</li>
            <li>Trim nails every 3–4 weeks; brush teeth 2–3 times per week</li>
            <li>Active outdoor lifestyle means more frequent baths after muddy adventures</li>
          </ul>`,
  training: `<p>Training an Aussiedoodle is an absolute delight — and also a necessity. These dogs are among the easiest to train of any breed or hybrid, absorbing commands at remarkable speed and retaining them long-term. Both parent breeds are in the top tier of canine intelligence. The challenge isn't getting them to learn; it's keeping them challenged enough to stay out of trouble.</p>
          <ul>
            <li>Learns new commands in very few repetitions — exceptional retention</li>
            <li>Thrives with obedience, agility, and trick training</li>
            <li>Needs consistent mental challenges beyond basic sit/stay/come</li>
            <li>Herding instinct may need management around small children or animals</li>
            <li>Positive reinforcement is highly effective; harsh methods backfire</li>
            <li>Excellent candidates for therapy, service, and search-and-rescue work</li>
          </ul>`,
  health: `<p>Aussiedoodles are generally healthy with good hybrid vigor. The Australian Shepherd side may contribute the MDR1 gene mutation (drug sensitivity), hip dysplasia, and eye conditions. The Poodle side may contribute Addison's disease and sebaceous adenitis. Responsible breeders test for MDR1 gene mutations, hips, and eyes before breeding.</p>`,
  healthTags: ['MDR1 Gene Mutation (drug sensitivity)', 'Hip Dysplasia', 'Progressive Retinal Atrophy', 'Collie Eye Anomaly', 'Addison\'s Disease', 'Epilepsy', 'Sebaceous Adenitis'],
  rightForYou: `<p>Aussiedoodles are ideal for active individuals, athletic families, and experienced dog owners who understand working-breed drives. They're extraordinary companions for people who want a highly engaged canine partner for sports, outdoor adventures, or professional dog work. Not recommended for first-time owners, sedentary lifestyles, or households where dogs will be left alone for long periods.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★☆', cats: '★★★☆☆', apartment: '★★☆☆☆', firstTime: '★★★☆☆', heat: '★★★★☆' },
  parentLinks: [
    { slug: 'australian-shepherd', emoji: '🐕', name: 'Australian Shepherd' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Aussiedoodles are active, athletic dogs with higher caloric needs than their size might suggest. Feed a high-quality kibble formulated for active medium or large breeds, with lean protein as the first ingredient. Their high activity level means they process calories efficiently — avoid under-feeding working dogs. Adjust portions to activity level.',
    rows: [
      ['Puppy (2–12 mo)', '1 – 2.5 cups/day', 'Puppy formula; 3 meals/day; avoid overfeeding — controls growth'],
      ['Adult (1–8 yr)', '2 – 4 cups/day', 'Active-adult formula; 2 meals/day; increase on high-activity days'],
      ['Senior (8+ yr)', '1.5 – 3 cups/day', 'Reduce if less active; joint supplements beneficial for working dogs'],
    ],
  },
  cost: {
    puppy: '$1,500 – $4,500',
    monthly: '$60 – $100',
    annual: '$700 – $1,500',
    extras: [
      ['Professional Grooming', '$70 – $130/visit (every 8–10 weeks)'],
      ['Dog Sports / Agility Classes', '$100 – $300/season (highly recommended for this breed)'],
      ['MDR1 Gene Test', '$70 – $150 (important before any medications)'],
    ],
    tips: 'Merle and blue-eyed Aussiedoodles command price premiums — focus on temperament and health testing over color. Always ask breeders about MDR1 gene testing — dogs with two copies of this mutation can have severe reactions to common medications. Agility and obedience classes are almost mandatory for this breed and provide essential mental exercise.',
  },
  generations: {
    intro: 'Aussiedoodle generations affect the ratio of Australian Shepherd to Poodle genetics, with meaningful implications for shedding, energy level, and herding drive intensity. Higher Poodle percentages generally reduce shedding and can slightly moderate the intense working-dog energy.',
    rows: [
      ['F1', '50% Aussie + 50% Poodle', 'Low–Moderate', 'Classic Aussiedoodle; strong working-dog drive; some shedding possible'],
      ['F1B', '25% Aussie + 75% Poodle', 'Very Low', 'Curlier coat; reduced herding drive; better for mild allergies'],
      ['F2', '50/50 second generation', 'Variable', 'More personality variation; energy can range widely'],
      ['Multigen', 'Multiple Aussiedoodle generations', 'Near Zero', 'Most consistent coat; established lines with predictable drive levels'],
    ],
    tip: 'For dog sports enthusiasts who want maximum working-dog intelligence and drive, an F1 Aussiedoodle is ideal. For families wanting the Aussiedoodle look with slightly calmer energy and lower shedding, F1B or multigen lines from breeders who select for temperament are the better choice.',
  },
  facts: [
    ['🧠', 'Two of the Smartest Breeds Combined', 'The Australian Shepherd consistently ranks in the top 5 most intelligent dog breeds. The Poodle is ranked #2 by Dr. Stanley Coren\'s definitive canine intelligence study. Combining these two breeds creates a hybrid with extraordinary cognitive ability — Aussiedoodles have been known to learn over 100 words and commands.'],
    ['👁️', 'The Striking Blue-Eye Lottery', 'Many Aussiedoodles — especially those with merle coloring — inherit the Australian Shepherd\'s stunning blue eyes, or even one blue and one brown eye (heterochromia). This genetic trait, linked to the merle gene, makes Aussiedoodles among the most visually striking of all hybrid dogs.'],
    ['⚡', 'Dog Sport Champions', 'Aussiedoodles regularly compete and win at the highest levels of agility, flyball, obedience, and herding trials. Their combination of athleticism, intelligence, and trainability makes them formidable competitors. Many have achieved national-level rankings in dog sports that were once dominated exclusively by Border Collies.'],
    ['🌈', 'The Merle Coat Spectacle', 'The merle coat pattern — swirling patches of gray, black, blue, or red — is one of the most visually dramatic in dogdom. Aussiedoodles can express blue merle, red merle, and chocolate merle patterns. However, breeding two merle dogs together carries serious health risks; responsible breeders never do this.'],
    ['🚨', 'The MDR1 Warning', 'Australian Shepherds carry the MDR1 gene mutation, which causes severe, potentially fatal reactions to common medications — including ivermectin (found in many heartworm preventatives), acepromazine, and several antibiotics. Aussiedoodles can inherit this mutation. Always test your Aussiedoodle for MDR1 status and inform your vet before any medications or anesthesia.'],
  ],
  traits: [
    ['Energy Level', 100], ['Trainability', 100], ['Friendliness', 80],
    ['Grooming Needs', 80], ['Good with Kids', 80], ['Barking', 60], ['Shedding', 40],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES + UPDATE INDEX + SITEMAP
// ─────────────────────────────────────────────────────────────
[BERNEDOODLE, AUSSIEDOODLE].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildHybridPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/bernedoodle.html" class="breed-card" data-type="hybrid" data-size="large" data-energy="medium" data-kids="yes" data-name="bernedoodle bernese mountain dog poodle mix tricolor">
          <div class="breed-emoji-wrap" data-api="mountain/bernese"><img class="breed-card-real-photo" alt="Bernedoodle" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge large">Large</span></div>
          <div class="breed-info">
            <h3>Bernedoodle <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>The gentle giant Doodle — loyal, playful, tricolor, and low-shedding. Lives twice as long as a purebred Bernese.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/aussiedoodle.html" class="breed-card" data-type="hybrid" data-size="medium" data-energy="high" data-kids="yes" data-name="aussiedoodle australian shepherd poodle mix merle">
          <div class="breed-emoji-wrap" data-api="australian/shepherd"><img class="breed-card-real-photo" alt="Aussiedoodle" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge medium">Medium</span></div>
          <div class="breed-info">
            <h3>Aussiedoodle <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>Two of the world's smartest breeds combined — a high-energy, low-shedding athlete built for dog sports and adventure.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
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
  `\n  <url><loc>https://www.alldogfacts.com/breeds/bernedoodle.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/aussiedoodle.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Hybrid Batch 3 complete: bernedoodle + aussiedoodle');
