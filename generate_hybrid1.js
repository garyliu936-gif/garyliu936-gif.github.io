// generate_hybrid1.js — Labradoodle + Cockapoo
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

        <!-- TAB 2: DIET -->
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

        <!-- TAB 3: COST -->
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

        <!-- TAB 4: GENERATIONS -->
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

        <!-- TAB 5: FUN FACTS -->
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
          <p style="color:#78350f; font-size:.88rem;">The ${b.name} is a designer crossbreed, not AKC-recognized. Individual dogs vary widely in appearance and temperament depending on which parent's traits dominate.</p>
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
          <h4>More Breeds</h4>
          <ul>
            <li><a href="labrador-retriever.html">Labrador Retriever</a></li>
            <li><a href="golden-retriever.html">Golden Retriever</a></li>
            <li><a href="goldendoodle.html">Goldendoodle</a></li>
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
    /* Tab switching */
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
    let galleryPhotos = [];
    let currentPhotoIndex = 0;
    fetch('https://dog.ceo/api/breed/${b.apiBreed}/images')
      .then(r => r.json())
      .then(data => {
        const photos = data.message;
        const hero = document.getElementById('breedPhoto');
        hero.src = photos[2];
        hero.onload = () => { hero.style.display = 'block'; document.getElementById('breedEmoji').style.display = 'none'; };
        const picks = [5, 10, 18, 25, 33, 40];
        picks.forEach((index, i) => {
          const el = document.getElementById('gp' + (i+1));
          const src = photos[index] || photos[i];
          if (el && src) { galleryPhotos.push(src); el.src = src; el.addEventListener('click', () => openLightbox(i)); }
        });
      }).catch(() => {});
    function openLightbox(index) { currentPhotoIndex = index; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; document.getElementById('lightbox').classList.add('open'); }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex+1)%galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('open')) return;
      if (e.key === 'ArrowLeft') { currentPhotoIndex=(currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length; document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'ArrowRight') { currentPhotoIndex=(currentPhotoIndex+1)%galleryPhotos.length; document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'Escape') { closeLightbox(); }
    });
  </script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// LABRADOODLE
// ─────────────────────────────────────────────────────────────
const LABRADOODLE = {
  name: 'Labradoodle', slug: 'labradoodle', emoji: '🐕', apiBreed: 'labrador',
  youtubeId: 'NdyKMRRqIiw', parents: 'Labrador + Poodle',
  subtitle: 'Hybrid / Designer Dog · #1 Most Popular Doodle · Low-Shedding Family Dog',
  weight: '15–65 lbs', height: '14–24"', lifespan: '12–15 yrs',
  familyStar: '★★★★★', hypoallergenic: 'Often (F1B+)', shedding: 'Low–None (varies)',
  bestFor: 'Low-shedding family companion, service dogs',
  coatType: 'Wavy or curly; varies by generation',
  metaDesc: 'Complete guide to the Labradoodle: generations, temperament, grooming, cost, and whether this popular Lab-Poodle hybrid is the right dog for your family.',
  keywords: 'Labradoodle, Labrador Poodle mix, Labradoodle temperament, Labradoodle generations, F1 F1B Labradoodle',
  hybridVigor: 'Generally good',
  overview: `<p>The Labradoodle is the hybrid that started the designer dog revolution. In 1989, Australian breeder Wally Conron crossed a Labrador Retriever with a Standard Poodle to create a low-shedding guide dog for a blind woman whose husband had dog allergies. The result was so appealing — friendly, trainable, and low-shedding — that demand exploded worldwide almost overnight.</p>
          <p>Today the Labradoodle is the most popular designer dog in the world, coming in three sizes (miniature, medium, standard) and a range of coat types. They combine the Labrador's legendary temperament with the Poodle's intelligence and low-shedding coat — making them one of the most versatile and sought-after family dogs available.</p>`,
  temperament: `<p>Labradoodles are friendly, energetic, and deeply social — inheriting the best traits of both parent breeds. They love everyone: children, strangers, other dogs, cats. Their people-oriented nature makes them exceptional therapy and service dogs, and genuinely joyful family companions.</p>
          <ul>
            <li>Friendly, outgoing, and social with virtually everyone</li>
            <li>Highly intelligent — learns commands quickly and retains them</li>
            <li>Excellent with children of all ages</li>
            <li>Gets along well with other pets</li>
            <li>Energetic and playful; can be boisterous as puppies</li>
            <li>Prone to separation anxiety — needs company and mental stimulation</li>
          </ul>`,
  exercise: `<p>Labradoodles need significant daily exercise — at least 1 hour for standard-sized dogs, less for miniatures. They love swimming (inherited from both parents), fetch, and running. Without adequate exercise they become hyperactive and destructive indoors.</p>
          <ul>
            <li>Standard: 1–2 hours daily; Mini: 30–45 minutes daily</li>
            <li>Excellent swimmers — both parent breeds love water</li>
            <li>Great jogging, hiking, and agility companions</li>
            <li>Mental stimulation through training prevents boredom</li>
          </ul>`,
  travelTip: 'Mini Labradoodles (under 25 lbs) can fly in-cabin on most airlines. Standards must travel as cargo or by car. Their adaptable, social temperament makes them generally good travelers — they settle well in new environments.',
  grooming: `<p>Labradoodle grooming depends heavily on coat type. Curlier coats (more Poodle) shed less but mat easily and need professional grooming every 6–8 weeks. Wavy coats are easier to maintain. Straight coats shed more like a Labrador and need less intensive grooming.</p>
          <ul>
            <li>Brush 3–4 times per week; daily for curly coats</li>
            <li>Professional grooming every 6–10 weeks</li>
            <li>Check ears weekly — floppy ears trap moisture and cause infections</li>
            <li>Trim nails every 3–4 weeks; brush teeth regularly</li>
          </ul>`,
  training: `<p>Labradoodles are among the easiest dogs to train — combining the Lab's eagerness to please with the Poodle's sharp intelligence. They excel in obedience, agility, therapy work, and service dog roles. Start early and keep sessions fun and reward-based.</p>
          <ul>
            <li>Highly food and praise motivated</li>
            <li>Learn new commands in as few as 5 repetitions</li>
            <li>Excel as guide dogs, therapy dogs, and emotional support animals</li>
            <li>Positive reinforcement only — sensitive to harsh corrections</li>
          </ul>`,
  health: `<p>Labradoodles generally benefit from hybrid vigor, but they can inherit health issues from either parent. Hip dysplasia, progressive retinal atrophy, and exercise-induced collapse (from the Lab side) are the primary concerns. Buying from health-tested breeders dramatically reduces these risks.</p>`,
  healthTags: ['Hip Dysplasia', 'Progressive Retinal Atrophy', 'Exercise-Induced Collapse', 'Ear Infections', 'Addison\'s Disease', 'Von Willebrand Disease'],
  rightForYou: `<p>Labradoodles are ideal for active families, allergy sufferers (especially F1B+ generations), first-time owners, and anyone who wants a friendly, trainable companion. They need regular grooming investment and significant daily exercise. Not ideal for owners who are away all day or want a low-maintenance coat.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★★', cats: '★★★★☆', apartment: '★★★☆☆', firstTime: '★★★★★', heat: '★★★★☆' },
  parentLinks: [
    { slug: 'labrador-retriever', emoji: '🦮', name: 'Labrador Retriever' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Feed based on your Labradoodle\'s size — miniatures eat like small breeds, standards like large breeds. Both parent breeds love food and can become overweight easily, so portion control matters. Choose high-quality protein-first kibble appropriate for your dog\'s size category.',
    rows: [
      ['Mini Puppy (2–12 mo)', '¾ – 1½ cups/day', 'Small-breed puppy formula; 3 meals/day'],
      ['Standard Puppy (2–12 mo)', '2 – 3 cups/day', 'Large-breed puppy formula; 3 meals/day'],
      ['Mini Adult', '1 – 1½ cups/day', '2 meals/day; monitor weight carefully'],
      ['Standard Adult', '2½ – 3½ cups/day', '2 meals/day; adjust for activity level'],
    ],
  },
  cost: {
    puppy: '$1,500 – $3,500',
    monthly: '$50 – $90',
    annual: '$600 – $1,400',
    extras: [
      ['Professional Grooming', '$75 – $150/visit (every 6–10 weeks)'],
      ['Annual Grooming Total', '$600 – $1,800/year'],
      ['Hip/Eye Health Screening', '$200 – $400 (recommended)'],
    ],
    tips: 'Adopt from a Doodle rescue for $200–$500. Grooming is the biggest ongoing cost — learn basic home trimming to extend time between professional appointments. Always buy from breeders who health-test both parents for hip dysplasia and eye conditions.',
  },
  generations: {
    intro: 'Labradoodle generations describe the percentage of Labrador vs Poodle genetics in the dog. Generation significantly affects coat type, shedding level, and allergen production. Understanding generations helps you choose the right dog for your household.',
    rows: [
      ['F1', '50% Lab + 50% Poodle', 'Low–Moderate', 'People who want a friendly family dog and can tolerate some shedding'],
      ['F1B', '25% Lab + 75% Poodle', 'Very Low', 'Allergy sufferers; best non-shedding generation'],
      ['F2', '50% Lab + 50% Poodle (2nd gen)', 'Unpredictable', 'Variable — coat type harder to predict'],
      ['Multigen', 'Multiple Doodle generations', 'Very Low–None', 'Most consistent coat; bred for lowest shedding'],
    ],
    tip: 'For allergy sufferers, choose F1B or multigen Labradoodles — they have the most Poodle genetics and shed the least. For a family pet without allergy concerns, F1 Labradoodles are often the healthiest due to maximum hybrid vigor.',
  },
  facts: [
    ['🌏', 'The Hybrid That Started It All', 'In 1989, Australian guide dog trainer Wally Conron created the first deliberate Labradoodle for a blind Hawaiian woman whose husband had severe dog allergies. The resulting puppy, Sultan, became a successful guide dog — and accidentally ignited the global designer dog industry.'],
    ['😔', 'The Creator\'s Regret', 'Wally Conron has publicly stated he regrets creating the Labradoodle — not because the dogs are bad, but because the explosion of unregulated breeding led to thousands of poorly bred Doodles with behavioral and health problems. "I released a Frankenstein," he said in 2019.'],
    ['🦮', 'World\'s Most Popular Service Dog', 'Labradoodles are now used as guide dogs, therapy dogs, psychiatric service dogs, and allergy-detection dogs worldwide. Their combination of trainability, low-shedding coats, and calm temperament makes them ideal for people who need a working dog but can\'t tolerate shedding.'],
    ['📏', 'Three Sizes, One Name', 'Labradoodles come in miniature (15–25 lbs), medium (25–45 lbs), and standard (45–65 lbs) sizes depending on whether a Miniature or Standard Poodle was used. All three are called "Labradoodle" — always clarify which size you\'re getting.'],
    ['🧬', 'Not Truly Hypoallergenic', 'No dog is completely hypoallergenic — all dogs produce the Fel d 1 protein that triggers allergies. But Labradoodles (especially F1B+ generations) shed far less dander than most breeds, making them significantly more tolerable for most allergy sufferers.'],
  ],
  traits: [
    ['Energy Level', 80], ['Trainability', 100], ['Friendliness', 100],
    ['Grooming Needs', 80], ['Good with Kids', 100], ['Barking', 40], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// COCKAPOO
// ─────────────────────────────────────────────────────────────
const COCKAPOO = {
  name: 'Cockapoo', slug: 'cockapoo', emoji: '🐩', apiBreed: 'cocker',
  youtubeId: 'QjSoT9kXBTk', parents: 'Cocker Spaniel + Poodle',
  subtitle: 'Hybrid / Designer Dog · Oldest Doodle Breed · Loving &amp; Low-Shedding',
  weight: '6–30 lbs', height: '9–15"', lifespan: '13–16 yrs',
  familyStar: '★★★★★', hypoallergenic: 'Often', shedding: 'Low–Very Low',
  bestFor: 'Low-shedding companion, families, seniors',
  coatType: 'Wavy or curly; soft and low-shedding',
  metaDesc: 'Complete guide to the Cockapoo: the original designer dog — temperament, generations, grooming, cost, and everything you need to know about this lovable Cocker Spaniel Poodle mix.',
  keywords: 'Cockapoo, Cocker Spaniel Poodle mix, Cockapoo temperament, Cockapoo care, oldest designer dog breed',
  hybridVigor: 'Excellent',
  overview: `<p>The Cockapoo holds a special distinction: it's the oldest intentional designer dog breed in existence. While the Labradoodle gets most of the credit for starting the designer dog trend, Cockapoos were being bred deliberately in the United States as far back as the 1950s — predating the Labradoodle by nearly 40 years.</p>
          <p>Created by crossing a Cocker Spaniel (American or English) with a Miniature or Toy Poodle, the Cockapoo was designed to combine the Cocker's sweet, gentle nature with the Poodle's low-shedding coat and intelligence. The result is one of the most consistently beloved small hybrids in the world — joyful, adaptable, and deeply affectionate.</p>`,
  temperament: `<p>Cockapoos are warm, sociable, and emotionally intuitive — they seem to always know how you're feeling and respond accordingly. They're playful with children, gentle with seniors, and friendly with strangers. The Cocker Spaniel's sensitivity and the Poodle's intelligence combine to create a dog that is both emotionally connected and mentally sharp.</p>
          <ul>
            <li>Exceptionally gentle and affectionate with all family members</li>
            <li>Excellent with children — patient, playful, and tolerant</li>
            <li>Friendly with strangers and other dogs</li>
            <li>Emotionally sensitive — mirrors the mood of the household</li>
            <li>Intelligent and quick to learn</li>
            <li>Can develop separation anxiety — thrives with company</li>
          </ul>`,
  exercise: `<p>Cockapoos are moderately energetic — they enjoy daily walks and play sessions but are equally happy lounging with their family. About 30–45 minutes of daily exercise keeps them healthy and content. Their adaptable energy level makes them suitable for both active families and quieter households.</p>
          <ul>
            <li>Daily requirement: 30–45 minutes of exercise</li>
            <li>Enjoy walks, fetch, and off-leash play in secure areas</li>
            <li>Well-suited to apartment living with consistent exercise</li>
            <li>Mental enrichment through training is important</li>
          </ul>`,
  travelTip: 'Cockapoos are superb travel companions — their small-to-medium size (6–30 lbs) often qualifies for in-cabin air travel, they adapt easily to new environments, and their cheerful temperament means they settle quickly in hotels and rentals. One of the best hybrid breeds for frequent travelers.',
  grooming: `<p>The Cockapoo's soft, wavy or curly coat is low-shedding but needs regular brushing and professional grooming every 6–8 weeks to prevent matting. Their floppy ears are a particular concern — moisture and wax buildup can cause ear infections if not cleaned weekly.</p>
          <ul>
            <li>Brush 3–4 times per week; daily for curlier coats</li>
            <li>Professional grooming every 6–8 weeks</li>
            <li>Clean ears weekly — Cockapoos are very prone to ear infections</li>
            <li>Trim around the eyes to prevent irritation</li>
            <li>Brush teeth daily — small breeds are prone to dental disease</li>
          </ul>`,
  training: `<p>Cockapoos are highly trainable — the Poodle's intelligence makes them quick learners, and the Cocker's desire to please makes them willing students. They respond beautifully to positive reinforcement and can excel in obedience, agility, and therapy dog work. Their sensitivity means harsh training methods are counterproductive.</p>
          <ul>
            <li>Quick to learn and eager to please</li>
            <li>Highly food and praise motivated</li>
            <li>Ideal candidates for therapy dog certification</li>
            <li>Early socialization helps prevent noise sensitivity</li>
            <li>Positive reinforcement only — sensitive to tone of voice</li>
          </ul>`,
  health: `<p>Cockapoos generally enjoy good health thanks to hybrid vigor, and their 13–16 year lifespan is exceptional. The main concerns inherited from parent breeds include ear infections (very common due to floppy ears), progressive retinal atrophy, and hip dysplasia. Buying from health-tested parents minimizes risks significantly.</p>`,
  healthTags: ['Ear Infections (very common)', 'Progressive Retinal Atrophy', 'Hip Dysplasia', 'Cataracts', 'Luxating Patella', 'Allergies', 'Liver Disease (Cocker side)'],
  rightForYou: `<p>Cockapoos suit virtually any household — families, singles, seniors, apartment dwellers, and first-time owners alike. They're one of the most universally adaptable small hybrids available. The main requirements: regular grooming, ear cleaning, and daily companionship. They do not do well left alone all day.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★★', cats: '★★★★☆', apartment: '★★★★★', firstTime: '★★★★★', heat: '★★★★☆' },
  parentLinks: [
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
    { slug: 'cavalier-king-charles', emoji: '🐕', name: 'Cavalier King Charles (similar)' },
  ],
  diet: {
    intro: 'Cockapoo portions depend on size — Toy Cockapoos eat like very small dogs while Standard Cockapoos eat moderate amounts. Their Cocker Spaniel heritage means they can be prone to weight gain and pancreatitis if fed fatty foods. Choose a high-quality, moderate-fat kibble appropriate for their size.',
    rows: [
      ['Toy/Mini Puppy (2–12 mo)', '¼ – ½ cup/day', 'Small-breed puppy formula; 3 meals/day'],
      ['Standard Puppy (2–12 mo)', '¾ – 1½ cups/day', 'Medium-breed puppy formula; 3 meals/day'],
      ['Toy/Mini Adult', '¼ – ¾ cup/day', '2 meals/day; watch for weight gain'],
      ['Standard Adult', '1 – 1½ cups/day', '2 meals/day; moderate-fat formula'],
    ],
  },
  cost: {
    puppy: '$900 – $2,500',
    monthly: '$40 – $70',
    annual: '$500 – $1,100',
    extras: [
      ['Professional Grooming', '$60 – $100/visit (every 6–8 weeks)'],
      ['Ear Cleaning Supplies', '$10 – $20/month (essential for this breed)'],
      ['Eye/Ear Specialist (if needed)', '$150 – $350/visit'],
    ],
    tips: 'Adopt from a Cockapoo rescue for $150–$350. Weekly ear cleaning at home is non-negotiable and costs almost nothing — it prevents expensive vet visits for chronic ear infections. Learn basic home grooming to reduce professional grooming frequency.',
  },
  generations: {
    intro: 'Like all Poodle crosses, Cockapoo generations describe the ratio of Cocker Spaniel to Poodle genetics. Generation affects coat texture, shedding level, and size. Cockapoos have been bred long enough that multigenerational (multigen) lines are well established.',
    rows: [
      ['F1', '50% Cocker + 50% Poodle', 'Low–Moderate', 'Classic Cockapoo look; slight variability in coat'],
      ['F1B', '25% Cocker + 75% Poodle', 'Very Low', 'Best for allergy sufferers; curlier coat'],
      ['F2', '50% Cocker + 50% Poodle (2nd gen)', 'Variable', 'More unpredictable; coat type varies widely'],
      ['Multigen', 'Multiple Cockapoo generations', 'Very Low', 'Most consistent; established breed-like predictability'],
    ],
    tip: 'For allergy sufferers, F1B or multigen Cockapoos are the safest choice. For a classic Cockapoo look and feel, the F1 generation often produces the most balanced temperament and appearance — the best of both parent breeds.',
  },
  facts: [
    ['🏆', 'The Original Designer Dog', 'Cockapoos were being intentionally bred in the United States as early as the 1950s — making them the oldest deliberate designer crossbreed in the world, predating the Labradoodle by nearly 40 years. They just never got the same marketing spotlight.'],
    ['❤️', 'Natural Therapy Dogs', 'Cockapoos are consistently among the top breeds chosen for therapy dog work in hospitals, schools, and nursing homes. Their gentle temperament, intuitive emotional sensitivity, and non-threatening size make them naturals in therapeutic settings.'],
    ['📏', 'Four Size Variations', 'Cockapoos come in four size categories: Teacup (under 6 lbs), Toy (under 12 lbs), Miniature (13–18 lbs), and Standard (19+ lbs) — determined by which Poodle size was used. Always confirm the expected adult size with your breeder.'],
    ['🏅', 'Celebrity Favorite', 'Cockapoos have been owned by numerous celebrities, and their consistent popularity in the UK has made them one of Britain\'s most-owned dogs for over two decades. In the UK, they consistently outsell many purebred breeds.'],
    ['🧬', 'Seeking Recognition', 'Despite being bred for 70+ years, Cockapoos are not AKC-recognized — mainly because there\'s no single breed standard. The American Cockapoo Club and Cockapoo Club of America are working to establish consistent breed standards that could lead to eventual recognition.'],
  ],
  traits: [
    ['Energy Level', 60], ['Trainability', 100], ['Friendliness', 100],
    ['Grooming Needs', 80], ['Good with Kids', 100], ['Barking', 40], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES
// ─────────────────────────────────────────────────────────────
[LABRADOODLE, COCKAPOO].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildHybridPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

// Update breeds/index.html
const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/labradoodle.html" class="breed-card" data-type="hybrid" data-size="large" data-energy="high" data-kids="yes" data-name="labradoodle doodle lab poodle mix">
          <div class="breed-emoji-wrap" data-api="labrador"><img class="breed-card-real-photo" alt="Labradoodle" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge large">Large</span></div>
          <div class="breed-info">
            <h3>Labradoodle <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>The hybrid that started it all — friendly, low-shedding, and highly trainable. Lab + Poodle perfection.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/cockapoo.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="medium" data-kids="yes" data-name="cockapoo cocker spaniel poodle mix">
          <div class="breed-emoji-wrap" data-api="cocker"><img class="breed-card-real-photo" alt="Cockapoo" /><span class="breed-card-emoji-fallback">🐩</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Cockapoo <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>The original designer dog — gentle, low-shedding, and one of the most loving small companions you can find.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
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

// Update sitemap
const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n');
sitemap = sitemap.replace('</urlset>',
  `\n  <url><loc>https://www.alldogfacts.com/breeds/labradoodle.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/cockapoo.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Hybrid Batch 1 complete: labradoodle + cockapoo');
