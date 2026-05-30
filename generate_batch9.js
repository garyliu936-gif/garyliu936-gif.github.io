// generate_batch9.js — Creates German Shorthaired Pointer + Miniature Schnauzer pages
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────
// TEMPLATE — generates a full breed HTML page
// ─────────────────────────────────────────────────────────────
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

  <!-- HERO -->
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

  <!-- MAIN CONTENT -->
  <div class="container">
    <div class="breed-content-wrap">

      <!-- MAIN COLUMN -->
      <div class="breed-main">

        <div class="breed-section">
          <h2>🎬 ${b.name} Facts</h2>
          <p>Watch this video for a quick overview of the ${b.name} — perfect if you want to see the breed in action before diving into the details.</p>
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

        <!-- TAB 1: PROFILE -->
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

        <!-- TAB 2: DIET & FEEDING -->
        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ Diet &amp; Feeding Guide</h2>
            <p>${b.diet.intro}</p>
            <table class="breed-table">
              <thead><tr><th>Life Stage</th><th>Daily Amount</th><th>Notes</th></tr></thead>
              <tbody>
                ${b.diet.rows.map(([a,b2,c]) => `<tr><td>${a}</td><td>${b2}</td><td>${c}</td></tr>`).join('\n                ')}
              </tbody>
            </table>
            <div class="info-box">
              <h3>💧 Hydration &amp; Treats</h3>
              <p>Always provide fresh water. Keep treats to ≤10% of daily calories. Avoid chocolate, grapes, onions, and xylitol — all toxic to dogs.</p>
            </div>
          </div>
        </div><!-- end tab-diet -->

        <!-- TAB 3: COST & PRICE -->
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

        <!-- TAB 4: MIX BREEDS -->
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

      <!-- SIDEBAR -->
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
    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('open');
    }
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
// BREED DATA
// ─────────────────────────────────────────────────────────────

const GSP = {
  name: 'German Shorthaired Pointer',
  slug: 'german-shorthaired-pointer',
  emoji: '🐕',
  apiBreed: 'pointer/germanshortha',
  youtubeId: 'WBz-BRRdApM',
  akcRank: '#10 Most Popular',
  subtitle: 'Sporting Group · Versatile Hunting Dog · #10 AKC Breed',
  weight: '45–70 lbs',
  height: '21–25"',
  lifespan: '10–12 yrs',
  colors: 'Liver & White',
  familyStar: '★★★★★',
  hypoallergenic: 'No',
  origin: 'Germany (1800s)',
  akcGroup: 'Sporting',
  bredFor: 'Versatile hunting — pointing, flushing, retrieving on land and water',
  coatType: 'Short, dense, water-resistant',
  metaDesc: 'Everything about the German Shorthaired Pointer: temperament, size, grooming, training tips, health issues, and whether this energetic sporting breed is right for you.',
  keywords: 'German Shorthaired Pointer, GSP dog, German Shorthaired Pointer temperament, GSP training, pointer dog breed',
  overview: `<p>The German Shorthaired Pointer (GSP) is the Swiss Army knife of the dog world — a single breed that can point, flush, and retrieve game on both land and water. Developed in 19th-century Germany by crossing Spanish Pointers with Bloodhounds and English Pointers, the GSP was engineered to be the ultimate versatile hunting companion.</p>
          <p>Today, GSPs are just as popular as athletic family dogs as they are in the field. They're affectionate, intelligent, and intensely energetic — consistently ranking in the top 10 most popular breeds in the US. If you can match their energy, a GSP will reward you with unwavering loyalty and endless enthusiasm.</p>`,
  temperament: `<p>GSPs are friendly, eager to please, and deeply bonded to their families. They have a high drive to work and play, and they don't have an off switch — especially as young dogs. They're affectionate with people they know but can be reserved with strangers initially.</p>
          <p>GSPs are highly social and do not do well when left alone for long periods. They need both physical exercise and mental stimulation — a bored GSP will redecorate your house with their mouth.</p>
          <ul>
            <li>Loyal and affectionate with family; can be reserved with strangers</li>
            <li>Excellent with children — energetic and playful match</li>
            <li>Generally good with other dogs when socialized early</li>
            <li>High prey drive — may not be reliable off-leash around small animals</li>
            <li>Extremely energetic; needs significant daily activity</li>
            <li>Sensitive — responds poorly to harsh training methods</li>
          </ul>`,
  exercise: `<p>GSPs are athletes that require serious daily exercise — a minimum of 1.5–2 hours per day. This isn't a breed for casual dog owners. They were bred to work in the field all day and have the stamina to match. Without sufficient exercise, GSPs become destructive and anxious.</p>
          <ul>
            <li>Daily requirement: 1.5–2+ hours of vigorous exercise</li>
            <li>Excellent running and cycling companion</li>
            <li>Strong swimmer — born for water retrieval</li>
            <li>Thrives in dog sports: agility, dock diving, hunt tests, obedience</li>
            <li>Needs a securely fenced yard — their prey drive can cause them to bolt</li>
            <li>Mental exercise (nose work, retrieving games) is equally important</li>
          </ul>`,
  travelTip: 'GSPs are adaptable and love being with their owners — but their high energy makes long travel days challenging. Plan for exercise breaks every 2–3 hours on road trips. For flights, GSPs are too large for cabin travel and would need to fly as cargo — factor this into pet travel plans.',
  grooming: `<p>The GSP's short, dense coat is one of its most practical features. It's low maintenance, water-repellent, and self-cleaning to a degree. GSPs are light to moderate shedders year-round.</p>
          <ul>
            <li>Brush once a week with a rubber grooming mitt or bristle brush</li>
            <li>Bathe every 4–6 weeks or after muddy field work</li>
            <li>Check and clean floppy ears weekly — prone to ear infections</li>
            <li>Trim nails every 3–4 weeks</li>
            <li>Brush teeth 3× per week minimum</li>
            <li>Check paws and pads after field work for cuts or debris</li>
          </ul>`,
  training: `<p>GSPs are highly intelligent and eager to please — they respond exceptionally well to positive reinforcement training. They're used as hunting dogs, search-and-rescue dogs, and detection dogs, which speaks to their trainability. However, their high energy and drive requires a handler who can match their enthusiasm.</p>
          <ul>
            <li>Start training and socialization at 8 weeks</li>
            <li>Highly food and praise motivated</li>
            <li>Excel in obedience, agility, and hunt tests</li>
            <li>Teach recall early — their prey drive can override commands</li>
            <li>Crate training is essential to prevent destructive behavior</li>
            <li>Avoid punishment-based methods — GSPs are sensitive and shut down</li>
          </ul>`,
  health: `<p>GSPs are generally a healthy, hardy breed. Responsible breeders screen for hip dysplasia, cardiac issues, and cone degeneration (a hereditary eye condition). Bloat (GDV) is a risk given their deep chest — never exercise immediately after meals.</p>`,
  healthTags: ['Hip Dysplasia', 'Bloat (GDV)', 'Cone Degeneration (CD)', 'Cardiac Issues', 'Ear Infections', 'Lymphedema'],
  hipRisk: 'Moderate',
  obesityRisk: 'Low (very active)',
  rightForYou: `<p>A GSP is ideal for active individuals or families who can commit to 2+ hours of daily exercise. They're not suited for apartment living, sedentary owners, or anyone who works long hours without dog care arrangements. In the right home, they're extraordinary companions.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★☆', cats: '★★★☆☆', apartment: '★☆☆☆☆', firstTime: '★★★☆☆', heat: '★★★★☆' },
  related: [
    { slug: 'labrador-retriever', emoji: '🦮', name: 'Labrador Retriever' },
    { slug: 'australian-shepherd', emoji: '🐕‍🦺', name: 'Australian Shepherd' },
    { slug: 'border-collie', emoji: '🐕', name: 'Border Collie' },
  ],
  diet: {
    intro: 'GSPs are high-energy working dogs that burn significant calories. Feed a high-quality protein-rich kibble and adjust portions based on activity level. A dog running field trials needs far more than a suburban companion. Feed from a raised bowl to reduce bloat risk, and never exercise immediately after meals.',
    rows: [
      ['Puppy (2–12 mo)', '2 – 3 cups/day', 'Large-breed puppy formula; 3 meals/day'],
      ['Active Adult (1–7 yr)', '2.5 – 4 cups/day', '2 meals/day; increase for working/sporting dogs'],
      ['Companion Adult', '2 – 2.5 cups/day', 'Monitor weight; reduce if less active'],
      ['Senior (8+ yr)', '1.5 – 2.5 cups/day', 'Joint-support formula; watch for weight changes'],
    ],
  },
  cost: {
    puppy: '$800 – $1,800',
    monthly: '$60 – $90',
    annual: '$500 – $1,200',
    extras: [
      ['Training Classes / Sport Fees', '$150 – $500/year'],
      ['Hip OFA Screening', '$200 – $400 (one-time)'],
      ['Hunting/Field Gear (optional)', '$100 – $500'],
    ],
    tips: 'Adopt from a GSP rescue for $150–$400. Investing in training early saves money long-term — a bored GSP can cause significant property damage. Budget for dog sports or regular off-leash exercise opportunities, which replace expensive destructive behavior.',
  },
  mixes: {
    intro: 'GSPs\' athletic build, keen nose, and friendly temperament make them increasingly popular in designer crosses. Most GSP mixes are highly active and need experienced, outdoorsy owners.',
    cards: [
      { apiSlug: 'pointer', name: 'Lab Pointer', parents: `German Shorthaired Pointer + <a href="/breeds/labrador-retriever.html">Labrador Retriever</a>`, desc: 'Friendly, athletic, and highly trainable. Combines the Lab\'s sociability with the GSP\'s stamina and nose — one of the best all-around sporting mixes.' },
      { apiSlug: 'pointer', name: 'German Shorthaired Pointerdoodle', parents: `German Shorthaired Pointer + <a href="/breeds/poodle.html">Poodle</a>`, desc: 'Athletic and low-shedding with exceptional intelligence. Inherits the GSP\'s drive and the Poodle\'s trainability in a lower-shedding package.' },
      { apiSlug: 'pointer', name: 'Border Point', parents: `German Shorthaired Pointer + <a href="/breeds/border-collie.html">Border Collie</a>`, desc: 'The ultimate working-dog hybrid — two of the world\'s most driven and intelligent breeds combined. Needs serious daily exercise and a job to do.' },
      { apiSlug: 'pointer', name: 'Weimar Pointer', parents: 'German Shorthaired Pointer + Weimaraner', desc: 'Sleek, fast, and built for endurance. Both parents are German sporting dogs with tremendous stamina — a powerhouse in the field.' },
    ],
  },
  facts: [
    ['🏆', 'Jack of All Trades', 'The GSP is one of the only breeds in the world that can reliably point, flush, AND retrieve game on both land and water. German hunters in the 1800s wanted one dog that could do everything — and they achieved it.'],
    ['🦶', 'Webbed Feet Like a Lab', 'GSPs have webbed feet — a trait shared with Labrador Retrievers and other water breeds. This makes them exceptional swimmers who can retrieve waterfowl from cold lakes and rivers without hesitation.'],
    ['🏃', 'Endurance Champions', 'A working GSP can cover 30+ miles in a single day of field work. They were built for all-day stamina in any terrain and any weather — earning them the nickname "the dog that does everything."'],
    ['🥇', 'Westminster Winner', 'CJ the German Shorthaired Pointer won Best in Show at the prestigious Westminster Kennel Club Dog Show in 2016 — putting the breed in the national spotlight and sparking a surge in GSP registrations.'],
    ['🤝', 'Velcro Hunters', 'Unlike some hunting breeds that work independently, GSPs were specifically bred to work closely with their human handlers — constantly checking in and adjusting based on the hunter\'s direction. This makes them unusually people-oriented for a sporting breed.'],
  ],
  traits: [
    ['Energy Level', 100],
    ['Trainability', 80],
    ['Friendliness', 80],
    ['Grooming Needs', 20],
    ['Good with Kids', 100],
    ['Barking', 60],
    ['Shedding', 40],
  ],
};

const MINI_SCHNAUZER = {
  name: 'Miniature Schnauzer',
  slug: 'miniature-schnauzer',
  emoji: '🐩',
  apiBreed: 'schnauzer/miniature',
  youtubeId: 'r_yq4sFTxYU',
  akcRank: '#17 Most Popular',
  subtitle: 'Terrier Group · Bold & Loyal · #17 AKC Breed',
  weight: '11–20 lbs',
  height: '12–14"',
  lifespan: '12–15 yrs',
  colors: 'Salt & Pepper, Black',
  familyStar: '★★★★★',
  hypoallergenic: 'Yes (low-shedding)',
  origin: 'Germany (1800s)',
  akcGroup: 'Terrier',
  bredFor: 'Ratting, farm guarding',
  coatType: 'Double coat — wiry outer, soft undercoat',
  metaDesc: 'Complete guide to the Miniature Schnauzer: temperament, size, grooming, training, health, and whether this bold, low-shedding terrier is right for you.',
  keywords: 'Miniature Schnauzer, Mini Schnauzer temperament, Schnauzer care, Miniature Schnauzer training, small dog breeds',
  overview: `<p>The Miniature Schnauzer is the smallest of the three Schnauzer breeds — and arguably the most popular. Developed in Germany in the late 1800s by breeding Standard Schnauzers with Affenpinschers and Poodles, Mini Schnauzers were built to catch rats on farms. Today they're beloved companions known for their distinctive bushy eyebrows, walrus mustache, and outsize personality.</p>
          <p>Mini Schnauzers are consistently one of the top 20 most popular breeds in the US — beloved for their low-shedding coats, longevity, and bold-but-affectionate personalities. They adapt remarkably well to apartment life while still having enough energy and spirit to keep up with active families.</p>`,
  temperament: `<p>Mini Schnauzers are confident, energetic, and alert — classic terrier traits packed into a compact body. They're deeply loyal to their families, often picking one person as their "person," and can be reserved or bossy with strangers and other dogs.</p>
          <p>Despite their terrier independence, Mini Schnauzers are more trainable than many terrier breeds and love to learn. They're spirited but not hyperactive — they enjoy play sessions followed by curling up on the couch.</p>
          <ul>
            <li>Loyal and affectionate with family; can be standoffish with strangers</li>
            <li>Good with children, especially when raised together</li>
            <li>Can be bossy with other dogs — proper socialization is important</li>
            <li>High prey drive for small animals (bred to hunt rats)</li>
            <li>Loves to bark — an excellent watchdog but needs bark training</li>
            <li>Spirited and fun, but not relentlessly high-energy like sporting breeds</li>
          </ul>`,
  exercise: `<p>Mini Schnauzers need moderate daily exercise — about 30–60 minutes of activity per day. They're energetic enough to enjoy longer walks and play sessions, but not so intense that they require hours of running. They adapt well to apartment living as long as they get their daily walks.</p>
          <ul>
            <li>Daily requirement: 30–60 minutes of exercise</li>
            <li>Brisk walks, fetch, and off-leash play in a fenced area</li>
            <li>Enjoy agility and obedience competitions</li>
            <li>Keep on a leash — their prey drive can send them after squirrels</li>
            <li>Mental stimulation (puzzle toys, training) is essential</li>
            <li>Adapt well to apartment living with consistent walks</li>
          </ul>`,
  travelTip: 'Mini Schnauzers are excellent travel companions — their compact size fits under airplane seats, they adapt quickly to new environments, and their low-shedding coat makes them welcome in more accommodations. They\'re one of the best small breeds for active travelers.',
  grooming: `<p>The Mini Schnauzer's wiry double coat doesn't shed much, but it does require regular grooming to stay tidy and mat-free. The iconic "Schnauzer cut" — short on the body, longer beard and leg furnishings — requires professional grooming every 5–8 weeks.</p>
          <ul>
            <li>Brush 2–3 times per week to prevent mats in the beard and leg fur</li>
            <li>Professional grooming every 5–8 weeks (hand-stripping or clipping)</li>
            <li>Clean the beard after eating and drinking — it traps food and moisture</li>
            <li>Check and clean ears weekly</li>
            <li>Trim nails every 3–4 weeks</li>
            <li>Brush teeth daily — Mini Schnauzers are prone to dental disease</li>
          </ul>`,
  training: `<p>Mini Schnauzers are more trainable than most terriers — they're smart, eager to please when motivated, and respond well to positive reinforcement. They can be stubborn, so consistency and patience are important. Early socialization is especially critical to prevent bossiness with strangers and other dogs.</p>
          <ul>
            <li>Smart and quick to learn — but trains on their own terms</li>
            <li>Food and praise motivated; use high-value treats for new commands</li>
            <li>Start socialization at 8 weeks — critical for this breed</li>
            <li>Bark training is important — Mini Schnauzers love to announce everything</li>
            <li>Excellent in agility, earthdog trials, and obedience</li>
            <li>Avoid harsh corrections — they become stubborn and resistant</li>
          </ul>`,
  health: `<p>Mini Schnauzers are generally long-lived and healthy, but they have a notable predisposition to pancreatitis and high blood lipid levels (hyperlipidemia) — making a low-fat diet especially important for this breed. They're also prone to bladder stones and certain eye conditions.</p>`,
  healthTags: ['Pancreatitis', 'Hyperlipidemia', 'Bladder Stones', 'Cataracts', 'Progressive Retinal Atrophy', 'Dental Disease', 'Myotonia Congenita'],
  hipRisk: 'Low',
  obesityRisk: 'Moderate',
  rightForYou: `<p>Mini Schnauzers are ideal for people who want a small, low-shedding, long-lived companion with a big personality. They work well in apartments, with seniors, with active families, and with first-time owners willing to invest in training. They're not ideal for people who want a pushover — Mini Schnauzers have opinions.</p>`,
  compat: { kids: '★★★★☆', dogs: '★★★☆☆', cats: '★★★☆☆', apartment: '★★★★★', firstTime: '★★★★☆', heat: '★★★★☆' },
  related: [
    { slug: 'yorkshire-terrier', emoji: '🐕', name: 'Yorkshire Terrier' },
    { slug: 'dachshund', emoji: '🌭', name: 'Dachshund' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Miniature Schnauzers have a unique metabolic quirk — they\'re prone to high blood triglycerides (hyperlipidemia) and pancreatitis, making a LOW-FAT diet essential. Avoid fatty treats, table scraps, and rich foods entirely. High-quality, lean protein kibble formulated for small breeds is the foundation of a healthy Schnauzer diet.',
    rows: [
      ['Puppy (2–12 mo)', '½ – ¾ cup/day', 'Small-breed puppy formula; 3 meals/day'],
      ['Adult (1–10 yr)', '½ – 1 cup/day', '2 meals/day; LOW-FAT formula; measure carefully'],
      ['Senior (10+ yr)', '⅓ – ¾ cup/day', 'Continue low-fat diet; watch for weight gain'],
    ],
  },
  cost: {
    puppy: '$1,000 – $2,500',
    monthly: '$30 – $50',
    annual: '$500 – $1,000',
    extras: [
      ['Professional Grooming', '$60 – $100/visit (every 6–8 weeks)'],
      ['Dental Cleanings', '$200 – $400/year'],
      ['Pancreatitis Treatment', '$500 – $2,000 (if needed)'],
    ],
    tips: 'Adopt from a Schnauzer rescue for $100–$300. Their food cost is low, but grooming is a consistent expense — learning to do basic trims at home between professional visits saves significantly. Feed a strict low-fat diet from day one to avoid costly pancreatitis emergencies.',
  },
  mixes: {
    intro: 'Mini Schnauzers\' low-shedding coat, compact size, and bold personality make them popular in toy and small-breed crosses. Most Mini Schnauzer mixes are apartment-friendly, intelligent, and fiercely loyal.',
    cards: [
      { apiSlug: 'schnauzer/miniature', name: 'Schnoodle', parents: `Miniature Schnauzer + <a href="/breeds/poodle.html">Poodle</a>`, desc: 'Low-shedding, highly intelligent, and affectionate. Combines two smart, low-shed breeds — great for allergy sufferers who want a trainable small dog.' },
      { apiSlug: 'schnauzer/miniature', name: 'Snorkie', parents: `Miniature Schnauzer + <a href="/breeds/yorkshire-terrier.html">Yorkshire Terrier</a>`, desc: 'Tiny, feisty, and full of personality. Both parents are bold terrier types — this mix has zero awareness of its own small size.' },
      { apiSlug: 'schnauzer/miniature', name: 'Miniature Schnauzer Beagle Mix', parents: `Miniature Schnauzer + <a href="/breeds/beagle.html">Beagle</a>`, desc: 'Curious, sociable, and scent-driven. Gets the Beagle\'s friendly nature with the Schnauzer\'s loyalty and low-shedding coat.' },
      { apiSlug: 'schnauzer/miniature', name: 'Schnauzerdor', parents: `Miniature Schnauzer + <a href="/breeds/labrador-retriever.html">Labrador Retriever</a>`, desc: 'A fun, unusual mix — the Lab\'s warmth in a more compact, lower-shedding body. Friendly, active, and highly trainable.' },
    ],
  },
  facts: [
    ['🐀', 'Professional Rat Catchers', 'Mini Schnauzers were specifically bred in Germany to catch rats on farms — their small size let them pursue vermin into tight spaces that Standard Schnauzers couldn\'t reach. Despite their salon-ready appearance today, they have serious hunting instincts.'],
    ['🧔', 'The Beard Has a Purpose', 'The Schnauzer\'s distinctive beard and bushy eyebrows weren\'t just for looks — they protected the dog\'s face from bites during ratting. The wiry coat similarly protected against bites and scratches in the field.'],
    ['🌍', 'Three Sizes, One Breed Family', 'There are three Schnauzer breeds — Giant, Standard, and Miniature — but they\'re all separate breeds, not just size variations of one. The Mini was developed last, in the late 1800s, by crossing Standard Schnauzers with smaller breeds.'],
    ['⏳', 'Among the Longest-Lived Breeds', 'Mini Schnauzers regularly live 12–16 years, with some reaching 18+. Their longevity, combined with their small size and low-shedding coat, makes them one of the most practical long-term companion dog choices available.'],
    ['🤧', 'Low-Shedding, Not No-Shedding', 'Mini Schnauzers are often marketed as "hypoallergenic," and while they shed far less than most breeds, no dog is truly hypoallergenic. Their wiry coat traps loose fur, significantly reducing the amount that ends up on furniture — making them much more tolerable for many allergy sufferers.'],
  ],
  traits: [
    ['Energy Level', 60],
    ['Trainability', 80],
    ['Friendliness', 80],
    ['Grooming Needs', 80],
    ['Good with Kids', 80],
    ['Barking', 80],
    ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE HTML FILES
// ─────────────────────────────────────────────────────────────
const BREEDS_DIR = path.join(__dirname, 'breeds');

[GSP, MINI_SCHNAUZER].forEach(b => {
  const html = buildPage(b);
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), html, 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

// ─────────────────────────────────────────────────────────────
// UPDATE breeds/index.html — add 2 new breed cards before </div> closing breedsGrid
// ─────────────────────────────────────────────────────────────
const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/german-shorthaired-pointer.html" class="breed-card" data-size="large" data-energy="high" data-kids="yes" data-name="german shorthaired pointer">
          <div class="breed-emoji-wrap" data-api="pointer/germanshortha"><img class="breed-card-real-photo" alt="German Shorthaired Pointer" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge large">Large</span></div>
          <div class="breed-info">
            <h3>German Shorthaired Pointer</h3>
            <p>The ultimate versatile sporting dog — athletic, loyal, and built for adventure both on land and water.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:20%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/miniature-schnauzer.html" class="breed-card" data-size="small" data-energy="medium" data-kids="yes" data-name="miniature schnauzer">
          <div class="breed-emoji-wrap" data-api="schnauzer/miniature"><img class="breed-card-real-photo" alt="Miniature Schnauzer" /><span class="breed-card-emoji-fallback">🐩</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Miniature Schnauzer</h3>
            <p>Bold, low-shedding, and long-lived — a terrier with a big personality in a compact, apartment-friendly body.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>`;

// Insert before the closing </div> of breedsGrid
const GRID_CLOSE = '      </div>\n    </div>\n  </section>';
if (!idxHtml.includes(GRID_CLOSE)) throw new Error('Grid closing pattern not found in breeds/index.html');
idxHtml = idxHtml.replace(GRID_CLOSE, NEW_CARDS + '\n\n' + GRID_CLOSE);
fs.writeFileSync(idxPath, idxHtml, 'utf8');
console.log('✅ breeds/index.html updated');

// ─────────────────────────────────────────────────────────────
// UPDATE sitemap.xml
// ─────────────────────────────────────────────────────────────
const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_URLS = `
  <url><loc>https://www.alldogfacts.com/breeds/german-shorthaired-pointer.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/miniature-schnauzer.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;

sitemap = sitemap.replace('</urlset>', NEW_URLS + '\n</urlset>');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Batch 9 complete: german-shorthaired-pointer + miniature-schnauzer');
