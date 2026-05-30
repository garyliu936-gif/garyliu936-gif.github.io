// generate_batch10.js — Creates Cane Corso + Pomeranian pages
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

        <!-- TAB 4: MIXES -->
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
// CANE CORSO
// ─────────────────────────────────────────────────────────────
const CANE_CORSO = {
  name: 'Cane Corso',
  slug: 'cane-corso',
  emoji: '🐕',
  apiBreed: 'mastiff',
  youtubeId: 'Z6trnJCquiU',
  akcRank: '#18 Most Popular',
  subtitle: 'Working Group · Italian Mastiff · Powerful Guardian',
  weight: '88–110 lbs',
  height: '23.5–27.5"',
  lifespan: '9–12 yrs',
  colors: 'Black, Gray, Fawn, Brindle',
  familyStar: '★★★★☆',
  hypoallergenic: 'No',
  origin: 'Italy (Ancient Rome)',
  akcGroup: 'Working',
  bredFor: 'Property guarding, hunting large game, personal protection',
  coatType: 'Short, dense, coarse double coat',
  metaDesc: 'Complete guide to the Cane Corso: temperament, size, grooming, training, health, and whether this powerful Italian Mastiff is right for you.',
  keywords: 'Cane Corso, Cane Corso temperament, Italian Mastiff, Cane Corso training, large guard dog breeds',
  overview: `<p>The Cane Corso is one of the most powerful and ancient dog breeds in the world — a direct descendant of the Roman war dog, the <em>Canis Pugnax</em>. The name itself comes from the Latin <em>cohors</em>, meaning "guardian" or "protector." For centuries, the Cane Corso served Italian farmers as a versatile working dog: hunting wild boar, driving livestock, and guarding property and family with fierce loyalty.</p>
          <p>Nearly extinct by the 1970s, the breed was revived by Italian enthusiasts and recognized by the AKC in 2010. Today the Cane Corso has surged into the top 20 most popular breeds in the US — prized by experienced owners who want an imposing, deeply loyal guardian that bonds intensely with its family.</p>`,
  temperament: `<p>The Cane Corso is reserved, confident, and deeply bonded to its family — but it is not a breed for everyone. It is naturally wary of strangers and has strong guarding instincts that require proper channeling through training and socialization. With its family, a well-raised Cane Corso is affectionate, gentle, and even goofy.</p>
          <p>Cane Corsos are dominant by nature and need an owner who provides confident, consistent leadership from day one. They will test boundaries and push back on weak or inconsistent handling.</p>
          <ul>
            <li>Fiercely loyal and protective of family — especially children in the household</li>
            <li>Naturally suspicious of strangers; early socialization is non-negotiable</li>
            <li>Dominant with other dogs — same-sex aggression is common</li>
            <li>Highly intelligent; picks up training quickly but needs consistency</li>
            <li>Sensitive to their owner's mood — responds best to calm, firm leadership</li>
            <li>Not recommended for first-time or inexperienced dog owners</li>
          </ul>`,
  exercise: `<p>Cane Corsos need moderate daily exercise — about 1 hour per day — but quality matters more than quantity. They're not hyperactive, but they're powerful animals that need structured activity to stay mentally and physically balanced. A bored or under-exercised Cane Corso can become destructive or anxious.</p>
          <ul>
            <li>Daily requirement: 1 hour of exercise minimum</li>
            <li>Brisk walks, jogging, and structured play sessions ideal</li>
            <li>Weight-pulling and protection sports suit their natural drives</li>
            <li>Avoid intense exercise in heat — prone to overheating</li>
            <li>Mental stimulation through training is as important as physical activity</li>
            <li>Secure, fenced yard essential — their size and prey drive make off-leash walks risky</li>
          </ul>`,
  travelTip: 'Cane Corsos are too large for cabin travel on any commercial airline and must fly as cargo — a stressful experience for a guardian breed. For most Cane Corso owners, driving is the preferred travel method. Budget for large-breed boarding facilities or in-home pet sitters when you travel without your dog.',
  grooming: `<p>The Cane Corso's short, dense coat is low-maintenance — but they're moderate shedders year-round with heavier shedding seasonally. Their large wrinkled face (especially around the muzzle) needs regular cleaning to prevent skin infections.</p>
          <ul>
            <li>Brush once a week with a rubber curry or bristle brush</li>
            <li>Bathe every 6–8 weeks or as needed</li>
            <li>Clean facial wrinkles and muzzle folds weekly — moisture causes infections</li>
            <li>Wipe drool from lips daily — Cane Corsos can be moderate droolers</li>
            <li>Trim nails every 3–4 weeks (their nails grow fast)</li>
            <li>Brush teeth 3× per week minimum</li>
          </ul>`,
  training: `<p>Cane Corsos are highly intelligent and capable of advanced training — they excel at obedience, protection sports (Schutzhund/IPO), and tracking. However, their dominant nature means they need an owner who is firm, consistent, and experienced. They learn quickly and remember everything — including bad habits.</p>
          <ul>
            <li>Start obedience training and socialization at 8 weeks — no exceptions</li>
            <li>Socialize extensively with people, dogs, and environments during puppyhood</li>
            <li>Use positive reinforcement paired with calm, firm consistency</li>
            <li>Establish clear rules and boundaries from day one — they test weak leadership</li>
            <li>Professional training is strongly recommended for first-time Corso owners</li>
            <li>Never use fear or pain-based methods — creates unpredictable aggression</li>
          </ul>`,
  health: `<p>Cane Corsos are generally healthy for a giant breed, but like all large dogs they're prone to orthopedic issues, bloat, and heart conditions. Responsible breeders screen for hip and elbow dysplasia, cardiac disease, and eyelid conditions. Bloat (GDV) is the most acute life-threatening risk given their deep chest.</p>`,
  healthTags: ['Hip Dysplasia', 'Elbow Dysplasia', 'Bloat (GDV)', 'Dilated Cardiomyopathy', 'Ectropion / Entropion', 'Cherry Eye', 'Mange'],
  hipRisk: 'Moderate–High',
  obesityRisk: 'Moderate',
  rightForYou: `<p>The Cane Corso is right for experienced dog owners who want a devoted, powerful guardian and are prepared to invest in training, socialization, and responsible ownership. They are not suited for first-time owners, apartment living, households that can't provide strong leadership, or owners who want an easygoing, everyone-friendly dog.</p>`,
  compat: { kids: '★★★★☆', dogs: '★★☆☆☆', cats: '★★☆☆☆', apartment: '★★☆☆☆', firstTime: '★☆☆☆☆', heat: '★★★☆☆' },
  related: [
    { slug: 'rottweiler', emoji: '🐕', name: 'Rottweiler' },
    { slug: 'doberman-pinscher', emoji: '🐕‍🦺', name: 'Doberman Pinscher' },
    { slug: 'german-shepherd', emoji: '🐕', name: 'German Shepherd' },
  ],
  diet: {
    intro: 'Cane Corsos are large, muscular dogs that need a high-quality, protein-rich diet to support their imposing build. Feed from a raised bowl to reduce bloat risk, and never exercise within 1–2 hours of meals. Puppies must be fed a large-breed formula to control rapid growth that can damage developing joints.',
    rows: [
      ['Puppy (2–12 mo)', '4 – 6 cups/day', 'Large-breed puppy ONLY; 3 meals/day; slow growth protects joints'],
      ['Adult (1–6 yr)', '5 – 8 cups/day', '2 meals/day; raised bowl; no exercise 1–2 hrs after eating'],
      ['Senior (6+ yr)', '4 – 6 cups/day', 'Joint-support formula; monitor weight carefully'],
    ],
  },
  cost: {
    puppy: '$1,500 – $4,000',
    monthly: '$80 – $120',
    annual: '$700 – $2,000',
    extras: [
      ['Professional Training (essential)', '$300 – $1,000+'],
      ['Hip/Elbow OFA Screening', '$300 – $500'],
      ['Bloat Preventive Gastropexy', '$400 – $600 (highly recommended)'],
    ],
    tips: 'Adopt from a Cane Corso rescue for $200–$500. Professional training is not optional for this breed — budget for it from day one. A preventive gastropexy at the time of spay/neuter (~$500) is a worthwhile investment that can prevent a $5,000+ emergency surgery for bloat.',
  },
  mixes: {
    intro: 'The Cane Corso\'s powerful build, loyal temperament, and guardian instincts make it increasingly sought after in working-dog crosses. Most Cane Corso mixes are large, protective, and best suited for experienced owners.',
    cards: [
      { apiSlug: 'mastiff', name: 'Cane Corxer', parents: `Cane Corso + <a href="/breeds/boxer.html">Boxer</a>`, desc: 'Athletic, loyal, and naturally protective. Gets the Boxer\'s playful energy softened with the Corso\'s calm authority. Still needs an experienced handler.' },
      { apiSlug: 'mastiff', name: 'Italian Daniff', parents: `Cane Corso + <a href="/breeds/great-dane.html">Great Dane</a>`, desc: 'A gentle giant with serious guardian instincts. Two of the world\'s most imposing breeds combined — calm indoors, alert and protective outdoors.' },
      { apiSlug: 'mastiff', name: 'Labrador Corso', parents: `Cane Corso + <a href="/breeds/labrador-retriever.html">Labrador Retriever</a>`, desc: 'The Lab\'s sociability helps temper the Corso\'s reserve. Friendly yet protective — a better fit for first-time large-dog owners than a purebred Corso.' },
      { apiSlug: 'mastiff', name: 'Cane Corso Rottweiler Mix', parents: `Cane Corso + <a href="/breeds/rottweiler.html">Rottweiler</a>`, desc: 'An extraordinary protection dog — two of Europe\'s premier guardian breeds in one powerful animal. For experienced owners only.' },
    ],
  },
  facts: [
    ['⚔️', 'Roman War Dog', 'The Cane Corso\'s ancestors charged into Roman battle formations wearing flaming oil buckets strapped to their backs — used to break cavalry lines and terrorize enemy horses. Julius Caesar referenced these dogs in his writings on the Gallic Wars.'],
    ['🏛️', 'Gladiator Ring Survivor', 'Cane Corsos (as Canis Pugnax) were used in Roman amphitheaters to fight lions, bears, and other large animals for public entertainment. Their courage and pain tolerance became legendary — qualities that survive in the modern breed.'],
    ['🌾', 'Italy\'s Farmhand', 'After Rome\'s fall, Cane Corsos transitioned from war dogs to versatile Italian farm dogs — hunting wild boar, driving cattle to market, and protecting farmsteads. Every Italian farming family had one for centuries.'],
    ['💀', 'Back from Extinction', 'By the 1970s, the Cane Corso had nearly vanished — modernized farming eliminated their working role. A small group of Italian breeders led by Dr. Paolo Breber launched a rescue effort in 1973. The AKC recognized the breed in 2010.'],
    ['📈', 'Fastest Rising Breed', 'The Cane Corso has risen from AKC obscurity to the top 20 most popular breeds in under 15 years — one of the fastest rises in AKC history. Their combination of loyalty, power, and devotion has made them a cultural icon among large-breed enthusiasts.'],
  ],
  traits: [
    ['Energy Level', 60],
    ['Trainability', 80],
    ['Friendliness', 60],
    ['Grooming Needs', 20],
    ['Good with Kids', 80],
    ['Barking', 40],
    ['Shedding', 40],
  ],
};

// ─────────────────────────────────────────────────────────────
// POMERANIAN
// ─────────────────────────────────────────────────────────────
const POMERANIAN = {
  name: 'Pomeranian',
  slug: 'pomeranian',
  emoji: '🦊',
  apiBreed: 'pomeranian',
  youtubeId: 'XnCRxGwcqNY',
  akcRank: '#23 Most Popular',
  subtitle: 'Toy Group · Fluffy & Fearless · #23 AKC Breed',
  weight: '3–7 lbs',
  height: '6–7"',
  lifespan: '12–16 yrs',
  colors: 'Orange, Cream, Black, Sable',
  familyStar: '★★★★☆',
  hypoallergenic: 'No',
  origin: 'Germany / Poland (1800s)',
  akcGroup: 'Toy',
  bredFor: 'Companion, sled pulling (ancestors)',
  coatType: 'Double coat — thick, fluffy outer with dense undercoat',
  metaDesc: 'Complete guide to the Pomeranian: temperament, fluffy coat care, training, health issues, and whether this bold little fox-faced dog is right for you.',
  keywords: 'Pomeranian, Pom dog, Pomeranian temperament, Pomeranian care, fluffy small dog breeds',
  overview: `<p>The Pomeranian is a tiny dog with the heart of a sled dog — which makes perfect sense, because their ancestors <em>were</em> sled dogs. Pomeranians descend from large Nordic spitz-type working dogs from the Pomerania region (modern-day Germany and Poland). Over centuries of selective breeding — particularly by Queen Victoria of England in the late 1800s — they were miniaturized from 30-lb working dogs into the 3–7 lb fluffy companions we know today.</p>
          <p>Pomeranians consistently rank in the top 25 most popular breeds in the US, beloved for their fox-like faces, spectacular double coats, and enormous personalities. They're one of the most extroverted small breeds — confident to the point of being oblivious about their tiny size.</p>`,
  temperament: `<p>Pomeranians are bold, curious, and lively — with absolutely no awareness of how small they are. They will challenge dogs ten times their size, bark at strangers with authority, and demand attention with the confidence of a much larger dog. With their family, they're affectionate, playful, and deeply loyal.</p>
          <p>Poms can be independent and stubborn — traits inherited from their spitz working-dog ancestors. Early training and socialization are important to prevent "small dog syndrome," where they become yappy and bossy.</p>
          <ul>
            <li>Bold, confident, and extroverted — zero small-dog timidity</li>
            <li>Very attached to their primary person; can develop separation anxiety</li>
            <li>Good with gentle, older children — too fragile for rough play with toddlers</li>
            <li>Naturally alert — excellent watchdogs, but can be excessive barkers</li>
            <li>Can be bossy with other dogs despite their size</li>
            <li>Intelligent and quick to learn — but independent enough to be selective about obeying</li>
          </ul>`,
  exercise: `<p>Pomeranians need moderate daily exercise — their small legs cover a lot of ground on a brisk 20–30 minute walk. They're surprisingly energetic for their size and love indoor play, but they tire more quickly than larger breeds. Over-exercising in heat is dangerous given their thick double coat.</p>
          <ul>
            <li>Daily requirement: 20–30 minutes of walking or active play</li>
            <li>Indoor play sessions work well for apartment living</li>
            <li>Short, frequent exercise sessions beat long runs</li>
            <li>Avoid exercise in high heat — their thick coat traps body heat</li>
            <li>Mental stimulation through training and puzzle toys is essential</li>
            <li>Never let off-leash in unsecured areas — vulnerable to hawks and coyotes</li>
          </ul>`,
  travelTip: 'Pomeranians are ideal travel companions — their 3–7 lb size fits comfortably in an airline-approved under-seat carrier for cabin travel on most airlines. They adapt quickly to new environments and are one of the best small breeds for people who travel frequently. Just watch the heat.',
  grooming: `<p>The Pomeranian's spectacular double coat is beautiful — and high-maintenance. It requires regular brushing to prevent mats and tangles, and professional grooming every 4–8 weeks to maintain shape. Despite appearances, their coat should NEVER be shaved — shaving damages the undercoat permanently (called "post-clipping alopecia").</p>
          <ul>
            <li>Brush 3–4 times per week minimum; daily during heavy shedding seasons</li>
            <li>Professional grooming every 4–8 weeks for trimming and shaping</li>
            <li>NEVER shave a Pomeranian — permanently damages coat texture and regrowth</li>
            <li>Brush teeth daily — Poms are highly prone to dental disease</li>
            <li>Trim nails every 2–3 weeks (small nails grow fast)</li>
            <li>Check and clean ears weekly</li>
          </ul>`,
  training: `<p>Pomeranians are smart and learn quickly — they've even been used in circus performances. However, they're also independent and can be stubborn, especially without consistent training from puppyhood. Bark training and basic obedience are particularly important for this vocal breed.</p>
          <ul>
            <li>Start training at 8 weeks — earlier than you think necessary</li>
            <li>Highly food motivated; small, high-value treats work best</li>
            <li>Bark training is essential — Poms will alert-bark at everything</li>
            <li>Teach "off" and "down" early — they love jumping on people</li>
            <li>Avoid the temptation to let bad behaviors slide because they're "cute and tiny"</li>
            <li>Positive reinforcement only — harsh methods cause anxiety and shutdown</li>
          </ul>`,
  health: `<p>Pomeranians are generally long-lived and healthy, but they have several breed-specific concerns. Luxating patellas (slipping kneecaps) and tracheal collapse are the most common issues. Their tiny mouths almost guarantee dental problems without daily brushing. Hypoglycemia (low blood sugar) is a serious risk in very small Pom puppies.</p>`,
  healthTags: ['Luxating Patella', 'Tracheal Collapse', 'Dental Disease', 'Hypoglycemia (puppies)', 'Alopecia X (Black Skin Disease)', 'Heart Disease', 'Eye Problems'],
  hipRisk: 'Low',
  obesityRisk: 'Moderate',
  rightForYou: `<p>Pomeranians are perfect for people who want a lively, intelligent companion in a compact package — apartment dwellers, frequent travelers, seniors, and singles who can give them plenty of attention. They're not ideal for families with toddlers (fragility risk), owners who want a quiet dog, or people away from home all day.</p>`,
  compat: { kids: '★★★☆☆', dogs: '★★★☆☆', cats: '★★★☆☆', apartment: '★★★★★', firstTime: '★★★★☆', heat: '★★☆☆☆' },
  related: [
    { slug: 'chihuahua', emoji: '🐕', name: 'Chihuahua' },
    { slug: 'yorkshire-terrier', emoji: '🐕', name: 'Yorkshire Terrier' },
    { slug: 'maltese', emoji: '🐩', name: 'Maltese' },
  ],
  diet: {
    intro: 'Pomeranians are tiny dogs with fast metabolisms — they need calorie-dense, high-quality small-breed kibble split into multiple meals. Hypoglycemia (dangerously low blood sugar) is a real risk in Pomeranian puppies and very small adults, so never skip meals. Their beautiful coat also benefits from omega-3 fatty acids.',
    rows: [
      ['Puppy (2–12 mo)', '¼ – ½ cup/day', '3–4 tiny meals/day; watch for hypoglycemia signs'],
      ['Adult (1–10 yr)', '¼ – ½ cup/day', '2–3 meals/day; measure carefully; small-breed formula'],
      ['Senior (10+ yr)', '¼ – ⅓ cup/day', 'Reduce if less active; softer food if dental issues'],
    ],
  },
  cost: {
    puppy: '$1,000 – $3,000',
    monthly: '$25 – $45',
    annual: '$400 – $900',
    extras: [
      ['Professional Grooming', '$50 – $90/visit (every 6–8 weeks)'],
      ['Dental Cleanings', '$200 – $400/year (very important for this breed)'],
      ['Tracheal Collapse Treatment', '$300 – $2,000 (if needed)'],
    ],
    tips: 'Adopt from a Pom rescue for $100–$300. Their food cost is among the lowest of any breed. The biggest ongoing expenses are grooming and dental care. Learn basic home brushing techniques to stretch professional grooming appointments, and brush teeth daily to avoid costly dental procedures.',
  },
  mixes: {
    intro: 'The Pomeranian\'s fluffy coat, compact size, and bold personality make them one of the most popular toy breeds for designer crosses. Most Pomeranian mixes are small, energetic, and fiercely devoted to their owners.',
    cards: [
      { apiSlug: 'pomeranian', name: 'Pomsky', parents: `Pomeranian + <a href="/breeds/siberian-husky.html">Siberian Husky</a>`, desc: 'The most talked-about designer mix of the 2010s. Gets the Husky\'s striking markings and blue eyes in a much smaller, fluffier body. One of the most visually stunning small dogs.' },
      { apiSlug: 'pomeranian', name: 'Pomapoo', parents: `Pomeranian + <a href="/breeds/poodle.html">Poodle</a>`, desc: 'Intelligent, low-shedding, and endlessly affectionate. Combines the Pom\'s personality with the Poodle\'s low-allergen coat — great for allergy-prone households.' },
      { apiSlug: 'pomeranian', name: 'Pomchi', parents: `Pomeranian + <a href="/breeds/chihuahua.html">Chihuahua</a>`, desc: 'Tiny, feisty, and intensely loyal. Two of the boldest small breeds combined — this mix has absolutely no idea how small it is.' },
      { apiSlug: 'pomeranian', name: 'Shiranian', parents: `Pomeranian + <a href="/breeds/shih-tzu.html">Shih Tzu</a>`, desc: 'Fluffy, gentle, and deeply affectionate. Gets the Pom\'s energy with the Shih Tzu\'s calm companionship — a wonderful small lap dog.' },
    ],
  },
  facts: [
    ['👑', 'Queen Victoria\'s Obsession', 'Queen Victoria of England fell in love with Pomeranians during a trip to Italy in 1888 — and then dedicated 40 years to breeding them smaller. She shrunk the average Pom from 20–30 lbs down to under 7 lbs through selective breeding, essentially creating the modern Pomeranian.'],
    ['🚢', 'Titanic Survivors', 'Of the very few dogs that survived the sinking of the Titanic in 1912, two were Pomeranians — both rescued in lifeboats with their owners. Their small size meant they could be carried aboard without using a human spot.'],
    ['🎵', 'Mozart\'s Muse', 'Wolfgang Amadeus Mozart had a beloved Pomeranian named Pimperl, to whom he dedicated an aria. Michelangelo\'s Pomeranian reportedly sat on a silk cushion and watched him paint the Sistine Chapel.'],
    ['🧊', 'Sled Dog DNA', 'Despite weighing 5 lbs, the Pomeranian is a spitz breed — directly descended from large Nordic sled and herding dogs. Their bold, independent temperament, thick double coat, and curled tail are all inherited from their working ancestors.'],
    ['🌟', 'Smallest Trick Dog', 'Pomeranians have been featured in circus acts for over 100 years — their intelligence, agility, and love of attention make them natural performers. Several Pomeranians hold world records in trick dog competitions, outperforming breeds many times their size.'],
  ],
  traits: [
    ['Energy Level', 60],
    ['Trainability', 80],
    ['Friendliness', 80],
    ['Grooming Needs', 100],
    ['Good with Kids', 60],
    ['Barking', 100],
    ['Shedding', 80],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES
// ─────────────────────────────────────────────────────────────
const BREEDS_DIR = path.join(__dirname, 'breeds');

[CANE_CORSO, POMERANIAN].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

// Update breeds/index.html
const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/cane-corso.html" class="breed-card" data-size="large" data-energy="medium" data-kids="yes" data-name="cane corso">
          <div class="breed-emoji-wrap" data-api="mastiff"><img class="breed-card-real-photo" alt="Cane Corso" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge large">Large</span></div>
          <div class="breed-info">
            <h3>Cane Corso</h3>
            <p>Italy's ancient guardian — powerful, loyal, and deeply devoted to its family. A serious dog for experienced owners.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:20%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/pomeranian.html" class="breed-card" data-size="small" data-energy="medium" data-kids="yes" data-name="pomeranian">
          <div class="breed-emoji-wrap" data-api="pomeranian"><img class="breed-card-real-photo" alt="Pomeranian" /><span class="breed-card-emoji-fallback">🦊</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Pomeranian</h3>
            <p>Fluffy, bold, and bursting with personality — a tiny dog descended from sled dogs with zero awareness of its own size.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
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
  `\n  <url><loc>https://www.alldogfacts.com/breeds/cane-corso.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/pomeranian.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Batch 10 complete: cane-corso + pomeranian');
