// generate_batch11.js — FINAL BATCH: Boston Terrier + Havanese
const fs = require('fs');
const path = require('path');

function buildPage(b) {
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
  <title>${b.name} — Breed Profile, Temperament, Care &amp; Training | AllDogFacts</title>
  <meta name="description" content="${b.metaDesc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/breeds.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${b.name} Dog Breed Guide",
    "description": "Complete guide to the ${b.name} including temperament, care, training, and health information.",
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
            <div class="quick-stat"><span class="quick-stat-value">${b.colors}</span><span class="quick-stat-label">Colors</span></div>
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
          <p>Watch this video for a quick overview of the ${b.name} — see the breed in action before diving into the details.</p>
          <div class="video-embed">
            <iframe src="https://www.youtube.com/embed/${b.youtubeId}" title="${b.name} Dog Breed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>

        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">

        <div class="breed-section">
          <h2>🐾 Overview</h2>
          ${b.overview}
          <div class="info-grid">
            <div class="info-box"><div class="info-box-label">Origin</div><div class="info-box-value">${b.origin}</div></div>
            <div class="info-box"><div class="info-box-label">AKC Group</div><div class="info-box-value">${b.akcGroup}</div></div>
            <div class="info-box"><div class="info-box-label">Bred For</div><div class="info-box-value">${b.bredFor}</div></div>
            <div class="info-box"><div class="info-box-label">Coat Type</div><div class="info-box-value">${b.coatType}</div></div>
          </div>
        </div>

        <div class="breed-section">
          <h2>📸 Photo Gallery</h2>
          <p>Real ${b.name}s — see the breed's natural look, build, and expression.</p>
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
            <div class="info-box"><div class="info-box-label">Vet Visit Frequency</div><div class="info-box-value">Annual check-ups</div></div>
            <div class="info-box"><div class="info-box-label">Hip Dysplasia Risk</div><div class="info-box-value">${b.hipRisk}</div></div>
            <div class="info-box"><div class="info-box-label">Obesity Risk</div><div class="info-box-value">${b.obesityRisk}</div></div>
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
          <h2>🐾 Related Breeds You Might Like</h2>
          <div class="related-breeds">
            ${b.related.map(r => `<a href="/breeds/${r.slug}.html" class="related-card"><span class="rel-emoji">${r.emoji}</span><span>${r.name}</span></a>`).join('\n            ')}
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

        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular ${b.name} Mix Breeds</h2>
            <p>${b.mixes.intro}</p>
            <div class="mix-grid">
              ${b.mixes.cards.map(m => `<div class="mix-card">
                <img src="https://dog.ceo/api/breeds/${m.apiSlug}/images/random" alt="${m.name}" loading="lazy" onerror="this.src='../images/dog-placeholder.jpg'">
                <h3>${m.name}</h3>
                <p><strong>Parents:</strong> ${m.parents}</p>
                <p>${m.desc}</p>
              </div>`).join('\n              ')}
            </div>
          </div>
        </div><!-- end tab-mixes -->

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
          <p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">Browse our full directory of dog breeds with detailed profiles.</p>
          <a href="/breeds/index.html" style="display:block; text-align:center; background:var(--teal); color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:.88rem;">Browse All Breeds →</a>
        </div>
        <div class="sidebar-card">
          <h4>Quick Facts</h4>
          <div class="trait-row">
            <div class="info-box"><div class="info-box-label">AKC Rank</div><div class="info-box-value">${b.akcRank}</div></div>
            <div class="info-box" style="margin-top:8px"><div class="info-box-label">Colors</div><div class="info-box-value">${b.colors}</div></div>
            <div class="info-box" style="margin-top:8px"><div class="info-box-label">Hypoallergenic</div><div class="info-box-value">${b.hypoallergenic}</div></div>
            <div class="info-box" style="margin-top:8px"><div class="info-box-label">Origin</div><div class="info-box-value">${b.origin}</div></div>
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
            <li><a href="german-shepherd.html">German Shepherd</a></li>
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
        hero.onload = () => {
          hero.style.display = 'block';
          document.getElementById('breedEmoji').style.display = 'none';
        };
        const picks = [5, 10, 18, 25, 33, 40];
        picks.forEach((index, i) => {
          const el = document.getElementById('gp' + (i + 1));
          const src = photos[index] || photos[i];
          if (el && src) {
            galleryPhotos.push(src);
            el.src = src;
            el.addEventListener('click', () => openLightbox(i));
          }
        });
      }).catch(() => {});
    function openLightbox(index) {
      currentPhotoIndex = index;
      document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex];
      document.getElementById('lightbox').classList.add('open');
    }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
      document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex];
    });
    document.getElementById('lightboxNext').addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
      document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex];
    });
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeLightbox();
    });
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

// ─────────────────────────────────────────────────────────────
// BOSTON TERRIER
// ─────────────────────────────────────────────────────────────
const BOSTON_TERRIER = {
  name: 'Boston Terrier',
  slug: 'boston-terrier',
  emoji: '🐾',
  apiBreed: 'terrier/boston',
  youtubeId: 'io3_s6HU-pU',
  akcRank: '#24 Most Popular',
  subtitle: 'Non-Sporting Group · The American Gentleman · #24 AKC Breed',
  weight: '12–25 lbs',
  height: '15–17"',
  lifespan: '11–13 yrs',
  colors: 'Black & White, Brindle & White',
  familyStar: '★★★★★',
  hypoallergenic: 'No',
  origin: 'Boston, USA (1870s)',
  akcGroup: 'Non-Sporting',
  bredFor: 'Companion, originally pit fighting (now entirely a companion breed)',
  coatType: 'Short, smooth, fine single coat',
  metaDesc: 'Complete guide to the Boston Terrier: temperament, size, grooming, training, health, and whether this dapper "American Gentleman" is right for you.',
  keywords: 'Boston Terrier, Boston Terrier temperament, American Gentleman dog, Boston Terrier care, small non-shedding dog breeds',
  overview: `<p>The Boston Terrier is one of the few dog breeds that is truly made in America. Developed in Boston, Massachusetts in the 1870s by crossing English Bulldogs with White English Terriers, the Boston Terrier was originally bred for pit fighting — but was quickly refined into the gentle, dapper companion breed we know today. The AKC recognized them in 1893, making them one of the first American breeds admitted to the registry.</p>
          <p>Nicknamed "The American Gentleman" for their tuxedo-like black and white markings and courteous, well-mannered personalities, Boston Terriers are consistently one of the top 25 most popular breeds in the US. They're compact, adaptable, and deeply affectionate — equally at home in city apartments and suburban houses.</p>`,
  temperament: `<p>Boston Terriers are friendly, lively, and highly attuned to their owners' emotions. They're social butterflies that love meeting new people and get along well with children, other dogs, and even cats when socialized early. They have a playful, sometimes mischievous streak — and an endearing sense of humor.</p>
          <p>Bostons are sensitive dogs that pick up on household moods. They do not respond well to harsh training or tense environments. They thrive on companionship and can develop separation anxiety if left alone too frequently.</p>
          <ul>
            <li>Friendly and sociable with virtually everyone — great party dogs</li>
            <li>Excellent with children of all ages — gentle yet playful</li>
            <li>Generally good with other pets when socialized early</li>
            <li>Intelligent and eager to please — highly trainable for a small breed</li>
            <li>Sensitive to their owner's emotions and household atmosphere</li>
            <li>Prone to separation anxiety — best in homes where someone is usually around</li>
          </ul>`,
  exercise: `<p>Boston Terriers need moderate daily exercise — about 30–45 minutes. They're lively and enjoy play sessions, but their flat face (brachycephalic structure) limits their endurance, especially in heat or humidity. Short, frequent activity sessions suit them far better than long runs.</p>
          <ul>
            <li>Daily requirement: 30–45 minutes of light to moderate exercise</li>
            <li>Short walks and indoor play sessions work perfectly</li>
            <li>Avoid exercise in heat, humidity, or extreme cold — breathing is compromised</li>
            <li>Never exercise strenuously right after eating — bloat risk</li>
            <li>Great apartment dogs — don't need a yard if walked consistently</li>
            <li>Mental stimulation through training games keeps them sharp</li>
          </ul>`,
  travelTip: 'Boston Terriers are excellent travel companions — their compact size (12–25 lbs) often qualifies for under-seat airline cabin travel. However, their flat faces make them vulnerable to oxygen and pressure changes at altitude. Many airlines restrict brachycephalic breeds from flying in cargo. Always check airline policies and travel in cabin whenever possible.',
  grooming: `<p>The Boston Terrier's short, smooth coat is one of the easiest to maintain of any breed. They're light shedders and need minimal grooming — but their prominent eyes and facial folds need regular cleaning to prevent irritation and infection.</p>
          <ul>
            <li>Brush once a week with a rubber mitt or soft bristle brush</li>
            <li>Bathe every 4–6 weeks or when dirty</li>
            <li>Clean facial folds (if present) weekly — moisture causes skin infections</li>
            <li>Wipe large, prominent eyes daily to remove discharge</li>
            <li>Trim nails every 3–4 weeks</li>
            <li>Brush teeth 3× per week minimum — dental disease is common</li>
          </ul>`,
  training: `<p>Boston Terriers are among the most trainable small breeds — they're intelligent, food-motivated, and genuinely want to make their owners happy. They excel at obedience, agility, and trick training. Their sensitivity means positive reinforcement is the only effective approach — harsh methods cause them to shut down completely.</p>
          <ul>
            <li>Start training at 8 weeks — they're quick learners from the start</li>
            <li>Highly food motivated; small, high-value treats work best</li>
            <li>Excel in agility, rally obedience, and trick dog competitions</li>
            <li>Teach "leave it" early — their curiosity can get them into trouble</li>
            <li>House training is usually straightforward with consistent routine</li>
            <li>Positive reinforcement only — they're sensitive and shut down with harsh corrections</li>
          </ul>`,
  health: `<p>Boston Terriers are brachycephalic (flat-faced), which means breathing-related issues are the primary health concern. Their prominent eyes are also vulnerable to corneal ulcers and other injuries. Responsible breeders screen for eye conditions, patellar luxation, and heart defects. In hot or humid weather, always monitor for signs of overheating.</p>`,
  healthTags: ['Brachycephalic Obstructive Airway Syndrome (BOAS)', 'Corneal Ulcers', 'Luxating Patella', 'Hemivertebrae', 'Cataracts', 'Deafness (white markings linked)', 'Allergies'],
  hipRisk: 'Low',
  obesityRisk: 'Moderate',
  rightForYou: `<p>Boston Terriers are ideal for city dwellers, apartment residents, first-time owners, families with children, and seniors who want an affectionate, manageable companion. They're not ideal for people who need a running partner, live in very hot climates, or want a low-maintenance dog health-wise — their flat faces require monitoring and sometimes veterinary intervention.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★☆', cats: '★★★★☆', apartment: '★★★★★', firstTime: '★★★★★', heat: '★★☆☆☆' },
  related: [
    { slug: 'french-bulldog', emoji: '🐶', name: 'French Bulldog' },
    { slug: 'bulldog', emoji: '🐕', name: 'Bulldog' },
    { slug: 'pug', emoji: '🐾', name: 'Pug' },
  ],
  diet: {
    intro: 'Boston Terriers are prone to weight gain and flatulence — both manageable with the right diet. Feed a high-quality small-breed kibble with easily digestible proteins to reduce gas. Their flat faces make eating from a slow feeder bowl helpful, as they tend to gulp air while eating. Avoid ingredients known to cause gas: soy, peas, and cheap fillers.',
    rows: [
      ['Puppy (2–12 mo)', '½ – 1 cup/day', 'Small-breed puppy formula; 3 meals/day; slow feeder bowl'],
      ['Adult (1–10 yr)', '¾ – 1½ cups/day', '2 meals/day; slow feeder; avoid gas-causing ingredients'],
      ['Senior (10+ yr)', '½ – 1 cup/day', 'Reduce if less active; soft food if dental issues develop'],
    ],
  },
  cost: {
    puppy: '$800 – $2,000',
    monthly: '$35 – $55',
    annual: '$500 – $1,200',
    extras: [
      ['BOAS Surgery (if needed)', '$1,500 – $4,000'],
      ['Eye Specialist Visits', '$150 – $400/visit (if corneal issues arise)'],
      ['Dental Cleanings', '$200 – $400/year'],
    ],
    tips: 'Adopt from a Boston Terrier rescue for $100–$350. Pet insurance is highly recommended — BOAS surgery and eye treatments can be expensive. Buy from a reputable breeder who health-tests for elongated soft palate and stenotic nares; well-bred Bostons have far fewer breathing issues than poorly bred ones.',
  },
  mixes: {
    intro: 'The Boston Terrier\'s friendly temperament, compact size, and tuxedo good looks make them popular in small and medium-breed crosses. Most Boston Terrier mixes are social, adaptable, and great for apartment living.',
    cards: [
      { apiSlug: 'terrier/boston', name: 'Bossi-Poo', parents: `Boston Terrier + <a href="/breeds/poodle.html">Poodle</a>`, desc: 'Low-shedding, intelligent, and endlessly sociable. Gets the Boston\'s friendly spirit with the Poodle\'s hypoallergenic-friendly coat — a great apartment mix.' },
      { apiSlug: 'terrier/boston', name: 'Bo-Jack', parents: `Boston Terrier + <a href="/breeds/beagle.html">Beagle</a>`, desc: 'Curious, energetic, and scent-driven. The Beagle\'s hunting instincts give this mix a love of outdoor adventures that the Boston Terrier alone doesn\'t have.' },
      { apiSlug: 'terrier/boston', name: 'Frenchton', parents: `Boston Terrier + <a href="/breeds/french-bulldog.html">French Bulldog</a>`, desc: 'The most popular Boston mix — combines the best traits of two beloved flat-faced breeds. Slightly fewer breathing issues than either parent alone, plus double the charm.' },
      { apiSlug: 'terrier/boston', name: 'Bostchon', parents: `Boston Terrier + Bichon Frisé`, desc: 'Fluffy, cheerful, and gentle. The Bichon\'s soft cloud coat paired with the Boston\'s tuxedo personality — a wonderful, social companion for all ages.' },
    ],
  },
  facts: [
    ['🇺🇸', 'Born in Boston', 'The Boston Terrier is one of only a handful of dog breeds genuinely developed in the United States. The founding dog — a cross between an English Bulldog and a White English Terrier named "Judge" — was purchased by Robert C. Hooper of Boston around 1870. All Boston Terriers trace back to Judge.'],
    ['🎩', 'The American Gentleman', 'The Boston Terrier earned its "American Gentleman" nickname not just for its tuxedo markings, but for its courteous, well-mannered temperament. AKC breed standards actually require the black-and-white "tuxedo" pattern to be precisely placed — not just any spots will do.'],
    ['🎓', 'Official Mascot of 5 Universities', 'The Boston Terrier is the official mascot of Boston University — where the mascot "Rhett" has reigned since 1922. They\'re also the state dog of Massachusetts, making them one of the most officially celebrated breeds in America.'],
    ['👁️', 'The Dog with the Biggest Eyes', 'Boston Terriers have the largest eyes relative to head size of any dog breed. Those big, round eyes are adorable — but they\'re also vulnerable. Corneal scratches, ulcers, and even eye-popping accidents (proptosis) are real risks that owners must watch for.'],
    ['🏆', 'First American Breed in the AKC', 'When the AKC admitted the Boston Terrier in 1893, it became one of the first breeds developed in the United States to be recognized. Today they remain a symbol of American dog breeding — the original homegrown companion dog.'],
  ],
  traits: [
    ['Energy Level', 60],
    ['Trainability', 80],
    ['Friendliness', 100],
    ['Grooming Needs', 20],
    ['Good with Kids', 100],
    ['Barking', 40],
    ['Shedding', 40],
  ],
};

// ─────────────────────────────────────────────────────────────
// HAVANESE
// ─────────────────────────────────────────────────────────────
const HAVANESE = {
  name: 'Havanese',
  slug: 'havanese',
  emoji: '🐩',
  apiBreed: 'havanese',
  youtubeId: 'A0YpZmGlRXA',
  akcRank: '#25 Most Popular',
  subtitle: 'Toy Group · National Dog of Cuba · #25 AKC Breed',
  weight: '7–13 lbs',
  height: '8.5–11.5"',
  lifespan: '14–16 yrs',
  colors: 'All Colors & Patterns',
  familyStar: '★★★★★',
  hypoallergenic: 'Yes (low-shedding)',
  origin: 'Cuba (1700s)',
  akcGroup: 'Toy',
  bredFor: 'Companion, Cuban aristocracy lapdog',
  coatType: 'Long, silky, wavy or curly double coat',
  metaDesc: 'Complete guide to the Havanese: temperament, silky coat care, training, health, and why this cheerful Cuban companion is one of the best small dogs for families.',
  keywords: 'Havanese, Havanese dog, Havanese temperament, Havanese care, Cuba national dog breed',
  overview: `<p>The Havanese is the national dog of Cuba and the only breed developed there. Named after Havana, the capital city, the Havanese descends from the now-extinct Blanquito de la Habana ("little white dog of Havana"), which was itself descended from small dogs brought to Cuba by Spanish settlers in the 1600s. For centuries, the Havanese was the beloved lapdog of Cuban aristocracy — treasured for their cheerful disposition and silky, flowing coats.</p>
          <p>When Cuban refugees fled to the United States after the 1959 revolution, they brought their Havanese with them — and the breed slowly rebuilt its numbers in America. Today the Havanese consistently ranks among the top 25 most popular breeds, celebrated for being one of the most adaptable, joyful, and family-friendly small dogs in the world.</p>`,
  temperament: `<p>The Havanese is pure sunshine in dog form. They are cheerful, social, and affectionate with absolutely everyone — family, strangers, children, other dogs, even cats. They were bred to be companions, and every fiber of their being reflects that purpose. They genuinely thrive on human interaction and are happiest when they're involved in whatever their family is doing.</p>
          <p>Unlike some toy breeds, Havanese are not yappy or snappy — they're gentle, patient, and remarkably tolerant. They do form strong attachments and can develop separation anxiety if left alone too often.</p>
          <ul>
            <li>Exceptionally friendly with everyone — no stranger-shyness</li>
            <li>Wonderful with children of all ages — gentle and patient</li>
            <li>Gets along beautifully with other dogs and cats</li>
            <li>Highly intelligent — quick to learn and eager to please</li>
            <li>Velcro dog — follows family everywhere and hates being alone</li>
            <li>Rarely aggressive; one of the most even-tempered toy breeds</li>
          </ul>`,
  exercise: `<p>Havanese are moderately energetic — they enjoy play sessions and short walks but are equally happy curling up on the couch. About 20–30 minutes of daily activity is usually sufficient. They're well-suited to apartment living and adapt easily to their owner's lifestyle, whether active or relaxed.</p>
          <ul>
            <li>Daily requirement: 20–30 minutes of play and walking</li>
            <li>Ideal apartment dogs — adapt easily to smaller spaces</li>
            <li>Enjoy indoor games, fetch, and interactive toys</li>
            <li>Do well in dog agility and obedience sports despite small size</li>
            <li>Don't over-exercise in heat — their coat retains warmth</li>
            <li>Mental stimulation through training and puzzle toys is important</li>
          </ul>`,
  travelTip: 'Havanese are among the best travel companions of any breed — their 7–13 lb size fits easily under airplane seats in cabin carriers, they adapt quickly to new environments, and their cheerful temperament means they rarely stress in new situations. They\'re a top choice for frequent travelers who want a small, social dog.',
  grooming: `<p>The Havanese's long, silky coat is stunning — and requires consistent upkeep. Most pet owners choose to keep it trimmed short in a "puppy cut" for easier maintenance. Show dogs wear the full flowing coat, which requires daily brushing. Unlike many double-coated breeds, the Havanese sheds very little, making them excellent for allergy sufferers.</p>
          <ul>
            <li>Brush 3–4 times per week (daily for full-length coat)</li>
            <li>Professional grooming every 6–8 weeks for trimming</li>
            <li>Puppy cut (short trim) dramatically reduces grooming time</li>
            <li>Check and clean ears weekly — floppy ears trap moisture</li>
            <li>Trim nails every 3–4 weeks</li>
            <li>Brush teeth daily — small breeds are highly prone to dental disease</li>
          </ul>`,
  training: `<p>Havanese are exceptionally easy to train for a toy breed. They're intelligent, highly food-motivated, and deeply eager to please — a combination that makes them star pupils in obedience and trick training. They've even been used as therapy dogs, hearing assistance dogs, and allergy-detection dogs. Early training channels their energy productively and prevents the few bad habits they can develop (excessive barking, jumping).</p>
          <ul>
            <li>Begin training at 8 weeks — they absorb everything quickly</li>
            <li>Highly food and praise motivated; respond enthusiastically to rewards</li>
            <li>Excel in obedience, agility, and trick dog competitions</li>
            <li>Teach "quiet" command early — can develop alert barking if unchecked</li>
            <li>Positive reinforcement only — very sensitive to harsh correction</li>
            <li>Socialization is easy — they naturally love everyone</li>
          </ul>`,
  health: `<p>Havanese are generally a healthy, long-lived breed — regularly reaching 14–16 years. Their most common concerns are joint issues (luxating patellas, hip dysplasia for a small breed), eye conditions, and deafness in certain color lines. Chondrodysplasia (abnormal cartilage development) can also occur. Regular vet check-ups and buying from health-tested breeders minimizes these risks significantly.</p>`,
  healthTags: ['Luxating Patella', 'Hip Dysplasia', 'Progressive Retinal Atrophy', 'Cataracts', 'Deafness (chocolate/silver lines)', 'Chondrodysplasia', 'Dental Disease'],
  hipRisk: 'Low–Moderate',
  obesityRisk: 'Low',
  rightForYou: `<p>The Havanese is one of the most universally suitable small breeds — they adapt to apartments, houses, active lifestyles, and quieter homes equally well. They're perfect for families, seniors, first-time owners, allergy sufferers, and frequent travelers. The only real requirement: they need company. This is not a breed that does well alone all day.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★★', cats: '★★★★★', apartment: '★★★★★', firstTime: '★★★★★', heat: '★★★☆☆' },
  related: [
    { slug: 'maltese', emoji: '🐩', name: 'Maltese' },
    { slug: 'cavalier-king-charles', emoji: '🐕', name: 'Cavalier King Charles' },
    { slug: 'shih-tzu', emoji: '🐕', name: 'Shih Tzu' },
  ],
  diet: {
    intro: 'Havanese are small, moderately active dogs that do well on a high-quality small-breed kibble. Their long silky coat benefits from omega-3 fatty acids — look for foods with fish oil or add a supplement. Unlike some toy breeds, Havanese are not particularly prone to obesity, but portions should still be measured carefully.',
    rows: [
      ['Puppy (2–12 mo)', '¼ – ½ cup/day', 'Small-breed puppy formula; 3 meals/day'],
      ['Adult (1–12 yr)', '½ – 1 cup/day', '2 meals/day; add omega-3 supplement for coat health'],
      ['Senior (12+ yr)', '⅓ – ¾ cup/day', 'Reduce if less active; joint-support formula beneficial'],
    ],
  },
  cost: {
    puppy: '$1,000 – $2,500',
    monthly: '$30 – $50',
    annual: '$400 – $900',
    extras: [
      ['Professional Grooming', '$60 – $100/visit (every 6–8 weeks)'],
      ['Dental Cleanings', '$200 – $400/year'],
      ['Eye Specialist (if needed)', '$150 – $350/visit'],
    ],
    tips: 'Adopt from a Havanese rescue for $150–$350. Their food cost is low and they\'re generally healthy. The main ongoing cost is grooming — a short "puppy cut" maintained at home between professional appointments can cut grooming bills significantly. Buy from OFA health-tested breeders to minimize expensive eye and joint issues later.',
  },
  mixes: {
    intro: 'The Havanese\'s low-shedding silky coat, cheerful temperament, and compact size make them a natural fit for designer toy-breed crosses. Most Havanese mixes are gentle, sociable, and apartment-friendly.',
    cards: [
      { apiSlug: 'havanese', name: 'Havapoo', parents: `Havanese + <a href="/breeds/poodle.html">Poodle</a>`, desc: 'One of the fluffiest, most affectionate small mixes available. Combines the Havanese\'s sunny personality with the Poodle\'s intelligence and low-shedding coat. A top choice for allergy sufferers.' },
      { apiSlug: 'havanese', name: 'Havamalt', parents: `Havanese + <a href="/breeds/maltese.html">Maltese</a>`, desc: 'Gentle, silky, and endlessly sweet. Two of the world\'s oldest companion breeds combined — the result is a calm, loving lap dog that thrives in any home.' },
      { apiSlug: 'havanese', name: 'Havashu', parents: `Havanese + <a href="/breeds/shih-tzu.html">Shih Tzu</a>`, desc: 'Cheerful, fluffy, and utterly devoted. Both parents were bred for centuries purely as companions — this mix lives to make its family happy.' },
      { apiSlug: 'havanese', name: 'Cavanese', parents: `Havanese + <a href="/breeds/cavalier-king-charles.html">Cavalier King Charles Spaniel</a>`, desc: 'Silky, gentle, and deeply affectionate. Gets the Cavalier\'s emotional sensitivity paired with the Havanese\'s cheerful sociability — a therapy dog in the making.' },
    ],
  },
  facts: [
    ['🇨🇺', 'Cuba\'s Only Native Breed', 'The Havanese is the only dog breed native to Cuba and serves as the country\'s national dog. They were the exclusive companions of Cuba\'s aristocratic and wealthy merchant class for centuries, sometimes called "the silk dog" for their flowing, lustrous coat.'],
    ['⚠️', 'Near Extinction After 1959', 'After the Cuban Revolution in 1959, the Havanese nearly disappeared — Cuba\'s wealthy class fled, and many dogs were left behind. The entire American Havanese population descends from just 11 dogs brought to the US by Cuban refugees. The breed owes its survival to dedicated breeders who rebuilt from those 11 dogs.'],
    ['🎭', 'Circus and Street Performer', 'In the 1800s, Havanese became popular performers in European circuses and street acts — their intelligence, agility, and love of showing off made them natural entertainers. Charles Dickens and Ernest Hemingway both owned Havanese.'],
    ['🦮', 'Surprise Service Dogs', 'Despite their toy size, Havanese have been successfully trained as hearing assistance dogs, therapy dogs, and even mold and termite detection dogs. Their exceptional nose and willingness to work make them capable service animals in roles most people don\'t expect from a 10-lb dog.'],
    ['📈', 'The Fastest-Growing Breed', 'In 1996, only 1,000 Havanese were registered with the AKC. By 2023, they were in the top 25 most popular breeds with tens of thousands of registrations annually — one of the most dramatic rises in AKC history, driven entirely by word-of-mouth from devoted owners.'],
  ],
  traits: [
    ['Energy Level', 60],
    ['Trainability', 100],
    ['Friendliness', 100],
    ['Grooming Needs', 80],
    ['Good with Kids', 100],
    ['Barking', 40],
    ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES
// ─────────────────────────────────────────────────────────────
const BREEDS_DIR = path.join(__dirname, 'breeds');

[BOSTON_TERRIER, HAVANESE].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

// Update breeds/index.html
const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/boston-terrier.html" class="breed-card" data-size="small" data-energy="medium" data-kids="yes" data-name="boston terrier">
          <div class="breed-emoji-wrap" data-api="terrier/boston"><img class="breed-card-real-photo" alt="Boston Terrier" /><span class="breed-card-emoji-fallback">🐾</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Boston Terrier</h3>
            <p>The American Gentleman — tuxedo-clad, friendly, and perfectly suited to city and apartment living.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:20%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/havanese.html" class="breed-card" data-size="small" data-energy="low" data-kids="yes" data-name="havanese">
          <div class="breed-emoji-wrap" data-api="havanese"><img class="breed-card-real-photo" alt="Havanese" /><span class="breed-card-emoji-fallback">🐩</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Havanese</h3>
            <p>Cuba's national dog — cheerful, silky, and one of the most universally friendly small breeds in the world.</p>
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

// Update sitemap.xml
const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n');
sitemap = sitemap.replace('</urlset>',
  `\n  <url><loc>https://www.alldogfacts.com/breeds/boston-terrier.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/havanese.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉🎉🎉 FINAL BATCH COMPLETE: boston-terrier + havanese — ALL 30 BREEDS DONE!');
