// generate_hybrid5.js — Yorkipoo + Shorkie (Final Hybrid Batch)
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
            <li><a href="maltipoo.html">Maltipoo</a></li>
            <li><a href="cavapoo.html">Cavapoo</a></li>
            <li><a href="cockapoo.html">Cockapoo</a></li>
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
// YORKIPOO
// ─────────────────────────────────────────────────────────────
const YORKIPOO = {
  name: 'Yorkipoo', slug: 'yorkipoo', emoji: '🐶', apiBreed: 'terrier/yorkshire',
  youtubeId: 'A3PvBMmbWTE', parents: 'Yorkshire Terrier + Poodle',
  subtitle: 'Hybrid / Designer Dog · Tiny, Feisty &amp; Nearly Shed-Free · Big Personality in a Pocket Package',
  weight: '3–14 lbs', height: '7–15"', lifespan: '10–15 yrs',
  familyStar: '★★★☆☆', hypoallergenic: 'Often', shedding: 'Very Low',
  bestFor: 'Singles, seniors, apartment dwellers, allergy sufferers',
  coatType: 'Silky, wavy or curly; very low-shedding; varies from straight to tightly curled',
  metaDesc: 'Complete Yorkipoo guide: temperament, size, generations, grooming, and whether this spirited Yorkshire Terrier + Poodle mix is the right tiny companion for you.',
  keywords: 'Yorkipoo, Yorkshire Terrier Poodle mix, Yorkipoo temperament, Yorkipoo care, tiny hypoallergenic dog',
  hybridVigor: 'Good',
  overview: `<p>The Yorkipoo is a cross between the Yorkshire Terrier — one of the world's most popular toy breeds — and a Toy or Miniature Poodle. The result is a tiny, lively, nearly shed-free dog with enormous personality and an impressive combination of terrier boldness and Poodle intelligence. Despite weighing just 3–14 lbs, the Yorkipoo carries itself with the confidence of a much larger dog.</p>
          <p>Yorkipoos are ideal companions for city dwellers, apartment residents, seniors, and allergy sufferers who want all the joy of a devoted small dog without the heavy shedding of many toy breeds. Their compact size, adaptable nature, and long lifespan make them one of the most practical of all hybrid toy dogs.</p>`,
  temperament: `<p>Yorkipoos are spirited, affectionate, and deeply curious. They inherit the Yorkshire Terrier's feisty terrier confidence — fearless, bold, and always ready to investigate — alongside the Poodle's emotional intelligence and sensitivity. They form intense bonds with their primary person and can be velcro-dog devoted. They love to play, explore, and be the center of attention.</p>
          <ul>
            <li>Bold, confident, and fearless — big-dog personality in a tiny body</li>
            <li>Deeply affectionate and loyal to their people</li>
            <li>Curious and playful — love interactive games and toys</li>
            <li>Alert barkers — will sound the alarm for anything unusual</li>
            <li>Can develop small-dog syndrome without firm, consistent boundaries</li>
            <li>Better with older children — fragility risk with toddlers</li>
          </ul>`,
  exercise: `<p>Yorkipoos have moderate energy for their size — they enjoy daily walks and play sessions but tire more quickly than larger breeds. About 20–30 minutes of daily activity is typically sufficient. Their small size makes them excellent apartment dogs. They enjoy indoor games just as much as outdoor adventures, especially when they involve interacting with their favorite person.</p>
          <ul>
            <li>Daily requirement: 20–30 minutes of light to moderate activity</li>
            <li>Short walks, indoor fetch, and play sessions work well</li>
            <li>Perfect apartment and city dogs</li>
            <li>Mental stimulation through training is important</li>
            <li>Do not over-exercise as puppies — tiny joints need protection</li>
            <li>Never let off-leash in unsecured areas — high prey drive and tiny size</li>
          </ul>`,
  travelTip: 'Yorkipoos are outstanding travel companions. At 3–14 lbs, they are among the smallest hybrid breeds and easily fit in airline-approved under-seat carriers for in-cabin travel. Their adaptable nature and compact size make them perfect for hotels, vacation rentals, and road trips. One of the most travel-friendly hybrid breeds available.',
  grooming: `<p>The Yorkipoo coat varies from silky-straight (more Yorkie) to tightly curled (more Poodle), but all types are very low-shedding and grow continuously. Regular brushing prevents matting, and professional grooming every 6–8 weeks keeps the coat manageable. Like both parent breeds, dental care is critical — small dogs are highly prone to dental disease.</p>
          <ul>
            <li>Brush 3–4 times per week; daily for curlier coats</li>
            <li>Professional grooming every 6–8 weeks</li>
            <li>Brush teeth daily — dental disease is the top health risk for toy breeds</li>
            <li>Clean ears weekly; check for wax buildup</li>
            <li>Wipe eye area daily to prevent tear staining (Yorkie tendency)</li>
            <li>Trim nails every 2–3 weeks — tiny nails grow fast</li>
          </ul>`,
  training: `<p>Yorkipoos are smart and quick to learn — the Poodle's intelligence is prominent — but they can inherit the Yorkshire Terrier's stubborn streak. They respond best to short, fun, positive training sessions with high-value treats. House training can be challenging for toy breeds; patience and a consistent routine are essential. Early training prevents excessive barking and small-dog assertiveness.</p>
          <ul>
            <li>Learns quickly with positive reinforcement</li>
            <li>Highly food motivated — tiny, high-value treats work best</li>
            <li>House training requires consistency and patience</li>
            <li>Bark training is important — they alert-bark readily</li>
            <li>Early socialization reduces timidity and helps build confidence</li>
            <li>Avoid harsh corrections — very sensitive; positive methods only</li>
          </ul>`,
  health: `<p>Yorkipoos benefit from hybrid vigor and tend to be healthy, long-lived dogs. Their small size makes them vulnerable to hypoglycemia (especially as puppies), luxating patella, and tracheal collapse — conditions common in toy breeds. Dental disease is the most prevalent long-term health issue. Good breeders test for eye conditions and heart health.</p>`,
  healthTags: ['Hypoglycemia (puppies)', 'Luxating Patella', 'Tracheal Collapse', 'Dental Disease', 'Progressive Retinal Atrophy', 'Legg-Calve-Perthes Disease', 'Epilepsy'],
  rightForYou: `<p>Yorkipoos are excellent companions for singles, couples, seniors, and apartment dwellers who want a spirited, low-shedding toy dog with a big personality. They are not ideal for families with very young children (fragility risk) or people who are away from home frequently (separation anxiety). Their main requirements are daily companionship, consistent training, and diligent dental care.</p>`,
  compat: { kids: '★★★☆☆', dogs: '★★★☆☆', cats: '★★★☆☆', apartment: '★★★★★', firstTime: '★★★★☆', heat: '★★★★☆' },
  parentLinks: [
    { slug: 'yorkshire-terrier', emoji: '🐶', name: 'Yorkshire Terrier' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Yorkipoos are tiny dogs with fast metabolisms. They need small amounts of calorie-dense, high-quality toy or small-breed kibble split into multiple small meals throughout the day. Hypoglycemia is a real risk in very small Yorkipoos, especially puppies — skipping meals can cause dangerous blood sugar drops. Omega-3 supplements support their silky coat.',
    rows: [
      ['Puppy (2–12 mo)', '1/4 – 1/2 cup/day', '3–4 tiny meals/day; watch for hypoglycemia; toy-breed puppy formula'],
      ['Adult (1–10 yr)', '1/4 – 3/4 cup/day', '2–3 meals/day; small-breed formula; omega-3 supplement for coat'],
      ['Senior (10+ yr)', '1/4 – 1/2 cup/day', 'Reduce if less active; soft food if dental issues develop'],
    ],
  },
  cost: {
    puppy: '$400 – $1,800',
    monthly: '$25 – $45',
    annual: '$350 – $800',
    extras: [
      ['Professional Grooming', '$50 – $85/visit (every 6–8 weeks)'],
      ['Annual Dental Cleanings', '$150 – $350/year (essential for this breed)'],
      ['Tear Stain Products', '$10 – $20/month'],
    ],
    tips: 'Yorkipoos are among the more affordable hybrid toy dogs. Adopt from a Yorkie or Poodle rescue for $100–$300. The biggest ongoing expenses are grooming and dental care. Daily tooth brushing from puppyhood can prevent the expensive veterinary dental cleanings that toy breeds so frequently need.',
  },
  generations: {
    intro: 'Yorkipoo generations describe the Yorkie-to-Poodle genetic ratio. Because both parent breeds already have very low-shedding, hair-like coats, generation differences are less dramatic than in many other hybrids — even F1 Yorkipoos are nearly shed-free. Generation mainly affects coat texture and degree of curl.',
    rows: [
      ['F1', '50% Yorkie + 50% Poodle', 'Very Low', 'Classic Yorkipoo; silky-wavy coat blend; balanced personality'],
      ['F1B', '25% Yorkie + 75% Poodle', 'Near Zero', 'Curlier coat; best for severe allergies; more Poodle temperament'],
      ['F2', '50/50 second generation', 'Very Low', 'Consistent results; slightly more predictable size'],
      ['Multigen', 'Multiple Yorkipoo generations', 'Near Zero', 'Most consistent size and coat; established Yorkipoo lines'],
    ],
    tip: 'Since both Yorkies and Poodles shed very little, even an F1 Yorkipoo is an excellent choice for allergy sufferers. Generation choice mainly affects coat texture — straighter and silkier with more Yorkie influence, curlier with more Poodle. Focus on health testing over generation when selecting a breeder.',
  },
  facts: [
    ['🏙️', 'The Ultimate City Dog', 'Yorkipoos are built for urban life. At 3–14 lbs, they fit comfortably in tote bags, qualify for in-cabin airline travel, and require minimal exercise space. Combined with their very low shedding and quiet (relative to many toy breeds) nature, they are arguably the ideal New York City, San Francisco, or Seattle apartment dog.'],
    ['💈', 'Two Non-Shedding Lineages', 'Yorkshire Terriers have a fine, silky coat that grows like human hair and barely sheds. Poodles are famous for their curly, nearly allergen-free coats. Crossing these two ultra-low-shedding breeds produces one of the least allergenic toy hybrids possible — excellent news for allergy-prone dog lovers.'],
    ['💪', 'Terrier Courage, Pocket Size', 'Yorkshire Terriers were originally bred to hunt rats in textile mills — fearless, determined, and scrappy. That terrier spirit lives on in the Yorkipoo. These tiny dogs have been known to confidently approach large dogs, chase squirrels three times their size, and bark assertively at perceived intruders. The courage-to-size ratio is remarkable.'],
    ['🧩', 'Puzzle Prodigies', 'The Poodle side gives Yorkipoos exceptional problem-solving ability. Many Yorkipoo owners are amazed by how quickly these tiny dogs master puzzle feeders, learn to open cabinet doors, or find creative ways to get what they want. Mental enrichment toys are highly recommended — and highly entertaining — for this breed.'],
    ['⏳', 'Long-Lived Little Dogs', 'Yorkipoos regularly live 10–15 years, with many reaching 16 or 17. Both parent breeds are long-lived by dog standards — Yorkies typically live 13–16 years, Poodles 12–15 years. When you bring home a Yorkipoo, budget for a 15-year relationship and the joy (and responsibility) that comes with it.'],
  ],
  traits: [
    ['Energy Level', 60], ['Trainability', 80], ['Friendliness', 60],
    ['Grooming Needs', 80], ['Good with Kids', 60], ['Barking', 80], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// SHORKIE
// ─────────────────────────────────────────────────────────────
const SHORKIE = {
  name: 'Shorkie', slug: 'shorkie', emoji: '🐕', apiBreed: 'shihtzu',
  youtubeId: 'uN9CYgFAjH8', parents: 'Shih Tzu + Yorkshire Terrier',
  subtitle: 'Hybrid / Designer Dog · Silky, Sweet &amp; Spunky · The Tiny Two-Breed Lap Champion',
  weight: '7–16 lbs', height: '6–11"', lifespan: '11–16 yrs',
  familyStar: '★★★☆☆', hypoallergenic: 'Often', shedding: 'Very Low',
  bestFor: 'Singles, seniors, apartment dwellers, those wanting a calmer small companion',
  coatType: 'Long, silky, straight or slightly wavy; minimal shedding; beautiful floor-length coat possible',
  metaDesc: 'Complete Shorkie guide: temperament, grooming, health, and whether this loving Shih Tzu + Yorkshire Terrier hybrid is the perfect tiny companion for your lifestyle.',
  keywords: 'Shorkie, Shih Tzu Yorkshire Terrier mix, Shorkie temperament, Shorkie care, small companion dog hybrid',
  hybridVigor: 'Good',
  overview: `<p>The Shorkie is a cross between the ancient Shih Tzu — bred for centuries as Chinese royal companions — and the Yorkshire Terrier, the spunky terrier from northern England. Unlike most popular hybrids, the Shorkie contains no Poodle genetics. Instead, it combines two naturally low-shedding, silky-coated companion breeds to create a small, devoted, long-lived lapdog with an interesting personality blend.</p>
          <p>Shorkies are known for their beautiful floor-length silky coats, compact size (7–16 lbs), and a temperament that balances the Shih Tzu's calm affection with the Yorkie's lively, curious spark. They are popular among seniors, apartment dwellers, and anyone who wants an elegant, low-shedding small companion that truly lives to be with its people.</p>`,
  temperament: `<p>Shorkies have a wonderfully mixed temperament — the Shih Tzu brings warmth, gentleness, and a love of leisure, while the Yorkie contributes curiosity, alertness, and just enough terrier spunk to keep things interesting. The balance between these two parent temperaments can vary significantly, but most Shorkies land in a pleasant middle ground: affectionate but not fragile, playful but not exhausting.</p>
          <ul>
            <li>Affectionate and devoted — love being with their people</li>
            <li>Alert and curious — Yorkie watchdog instincts are present</li>
            <li>Playful but not hyperactive — good balance of energy</li>
            <li>Can be stubborn — both parent breeds have independent streaks</li>
            <li>Generally friendly once comfortable; may be shy with strangers initially</li>
            <li>Better with older children — too small for rough toddler play</li>
          </ul>`,
  exercise: `<p>Shorkies are light exercisers. They enjoy short daily walks and indoor play sessions, but are not demanding in their physical needs. About 20–30 minutes of gentle daily activity keeps them healthy and content. Their small size and moderate energy level make them excellent apartment dogs and ideal companions for less active owners or seniors.</p>
          <ul>
            <li>Daily requirement: 20–30 minutes of light activity</li>
            <li>Short walks and indoor play are perfectly sufficient</li>
            <li>Ideal for apartment and condo living</li>
            <li>Enjoy gentle interactive play and puzzle toys</li>
            <li>Avoid strenuous exercise in heat — small dogs overheat easily</li>
            <li>Mental enrichment through training and games is important</li>
          </ul>`,
  travelTip: 'Shorkies are superb travel dogs. At 7–16 lbs, they qualify for in-cabin airline travel on most airlines and fit comfortably under the seat. Their calm, adaptable nature means they settle quickly in new environments. Their silky coat requires brushing after travel, but they are otherwise low-maintenance on the road. Excellent companions for traveling seniors.',
  grooming: `<p>The Shorkie's silky, flowing coat is undeniably beautiful — but it is also the breed's most demanding trait. Without daily brushing and regular professional grooming, the coat mats badly and quickly. Most owners choose to keep Shorkies in a shorter "puppy cut" for practical reasons, though the full-length traditional Shih Tzu-style coat is breathtaking for those willing to maintain it.</p>
          <ul>
            <li>Brush daily to prevent matting — especially around ears and legs</li>
            <li>Professional grooming every 6–8 weeks</li>
            <li>Clean ears weekly — floppy ears from the Shih Tzu side trap moisture</li>
            <li>Wipe face daily — Shih Tzu facial folds can trap debris and cause odor</li>
            <li>Brush teeth daily — both parent breeds are dental disease prone</li>
            <li>Trim nails every 2–3 weeks</li>
          </ul>`,
  training: `<p>Shorkies are intelligent enough to learn basic commands quickly, but they can inherit stubbornness from both parent breeds. Neither the Shih Tzu nor the Yorkie is famous for eager obedience — they were bred for companionship, not working tasks. Patient, positive, food-motivated training sessions work best. Early socialization and house training routines should begin from day one.</p>
          <ul>
            <li>Intelligent but selectively obedient — use high-value treats consistently</li>
            <li>House training requires patience and consistent routine</li>
            <li>Early socialization reduces shyness and excessive barking</li>
            <li>Short sessions (5–10 minutes) work better than long drills</li>
            <li>Positive reinforcement only — sensitive and proud; harsh methods backfire</li>
            <li>Puppy classes are highly recommended for socialization</li>
          </ul>`,
  health: `<p>Shorkies are generally healthy with good hybrid vigor from combining two genetically distinct breeds. Health concerns from the Shih Tzu side include brachycephalic (short-nose) issues (in Shorkies that inherit a flatter face), dental crowding, and eye problems. From the Yorkie side: hypoglycemia, tracheal collapse, and luxating patella. Dental disease is the most prevalent long-term concern for both parent breeds.</p>`,
  healthTags: ['Dental Disease', 'Luxating Patella', 'Tracheal Collapse', 'Brachycephalic Issues (if flat-faced)', 'Progressive Retinal Atrophy', 'Hypoglycemia', 'Ear Infections'],
  rightForYou: `<p>Shorkies are ideal for seniors, singles, couples, and apartment dwellers who want a small, low-shedding, devoted companion that is calmer than many toy dogs but still has enough personality to be entertaining. Their main requirements are daily grooming, gentle exercise, consistent companionship, and diligent dental care. Not recommended for very active owners or families with young children.</p>`,
  compat: { kids: '★★☆☆☆', dogs: '★★★☆☆', cats: '★★★☆☆', apartment: '★★★★★', firstTime: '★★★★☆', heat: '★★★☆☆' },
  parentLinks: [
    { slug: 'shih-tzu', emoji: '🐕', name: 'Shih Tzu' },
    { slug: 'yorkshire-terrier', emoji: '🐶', name: 'Yorkshire Terrier' },
  ],
  diet: {
    intro: 'Shorkies are small dogs with modest food requirements. Feed a high-quality toy or small-breed kibble formulated for their life stage. Both parent breeds are prone to dental disease, so dental-specific kibble or raw feeding approaches can help. Avoid overfeeding — Shorkies can gain weight easily, which stresses their tiny frames. Split meals into 2–3 daily portions.',
    rows: [
      ['Puppy (2–12 mo)', '1/4 – 1/2 cup/day', '3 meals/day; small-breed puppy formula; watch for hypoglycemia in tiny pups'],
      ['Adult (1–10 yr)', '1/4 – 3/4 cup/day', '2 meals/day; dental-health kibble beneficial; avoid high-fat treats'],
      ['Senior (10+ yr)', '1/4 – 1/2 cup/day', 'Soft food if dental disease is present; reduce if less active'],
    ],
  },
  cost: {
    puppy: '$500 – $1,800',
    monthly: '$25 – $45',
    annual: '$350 – $800',
    extras: [
      ['Professional Grooming', '$50 – $90/visit (every 6–8 weeks)'],
      ['Dental Cleanings', '$150 – $350/year (critical for both parent breeds)'],
      ['Daily Grooming Supplies', '$30 – $60 (quality brush and detangler essential)'],
    ],
    tips: 'Shorkies are moderately priced hybrids. Look for reputable breeders who health-test both parents. Grooming and dental care are the primary ongoing costs. Investing in a high-quality slicker brush and learning basic home grooming techniques can significantly reduce professional grooming frequency and cost over your Shorkie\'s lifetime.',
  },
  generations: {
    intro: 'Shorkie generations describe the Shih Tzu-to-Yorkshire Terrier ratio. Unlike Doodle crosses, the Shorkie has no Poodle influence, so "generations" primarily affect the balance between the calm Shih Tzu temperament and the spirited Yorkie character. Both breeds have naturally low-shedding coats, so shedding remains minimal across all generations.',
    rows: [
      ['F1', '50% Shih Tzu + 50% Yorkie', 'Very Low', 'Perfect blend; silky-wavy coat; ideal temperament balance'],
      ['F1B', '75% Shih Tzu + 25% Yorkie', 'Very Low', 'Calmer personality; rounder face; more Shih Tzu coat texture'],
      ['F1B (Yorkie)', '25% Shih Tzu + 75% Yorkie', 'Very Low', 'More spirited; finer, silkier coat; stronger terrier personality'],
      ['Multigen', 'Multiple Shorkie generations', 'Very Low', 'Most consistent; established lines with reliable temperament'],
    ],
    tip: 'For the most balanced blend of calm Shih Tzu affection and Yorkie sparkle, an F1 Shorkie is the classic choice. If you prefer a calmer, gentler personality, choose F1B with more Shih Tzu. If you want a more alert, active dog with a finer coat, choose F1B with more Yorkie. Both are equally low-shedding.',
  },
  facts: [
    ['👑', 'Royal Ancestry on Both Sides', 'The Shih Tzu was bred exclusively for Chinese emperors and was so prized it was illegal for commoners to own one for centuries. The Yorkshire Terrier, though born in working-class England, quickly became a Victorian-era fashion accessory for high society. The Shorkie combines two breeds with remarkable aristocratic histories.'],
    ['💎', 'The Silky Coat Legacy', 'Both the Shih Tzu and Yorkshire Terrier have among the most luxurious coats in dogdom — fine, silky, and nearly shed-free. The Shorkie inherits the best of both: a flowing, lustrous coat that produces minimal dander and almost no fur on furniture or clothing. It is one of the finest coats of any hybrid breed.'],
    ['🌍', 'East Meets West', 'The Shorkie is one of the most geographically interesting hybrids: the Shih Tzu traces its origins to ancient Tibet and imperial China over 1,000 years ago, while the Yorkshire Terrier was developed in mid-19th century northern England. Few hybrid breeds unite such dramatically different cultural and geographic origins.'],
    ['😌', 'The Calming Companion', 'Shorkies that take more after their Shih Tzu side are remarkably calm and serene — suitable even as unofficial therapy dogs. Shih Tzus were bred specifically to be harmonious companions, and this trait passes strongly to Shorkies. They are often described as having a settling effect on anxious or stressed owners, simply by their peaceful presence.'],
    ['🦷', 'The Dental Care Priority', 'Both Shih Tzus and Yorkshire Terriers are among the breeds most prone to dental disease — overcrowded teeth, early tartar buildup, and tooth loss. Shorkies inherit this vulnerability. Daily tooth brushing is not optional for this breed; it is the single most important preventive health practice a Shorkie owner can establish from puppyhood.'],
  ],
  traits: [
    ['Energy Level', 40], ['Trainability', 60], ['Friendliness', 80],
    ['Grooming Needs', 100], ['Good with Kids', 40], ['Barking', 60], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES + UPDATE INDEX + SITEMAP
// ─────────────────────────────────────────────────────────────
[YORKIPOO, SHORKIE].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildHybridPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/yorkipoo.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="medium" data-kids="yes" data-name="yorkipoo yorkshire terrier poodle mix tiny">
          <div class="breed-emoji-wrap" data-api="terrier/yorkshire"><img class="breed-card-real-photo" alt="Yorkipoo" /><span class="breed-card-emoji-fallback">🐶</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Yorkipoo <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>Terrier boldness meets Poodle smarts in a 3–14 lb nearly shed-free package. The ultimate tiny city companion.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/shorkie.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="low" data-kids="yes" data-name="shorkie shih tzu yorkshire terrier mix silky">
          <div class="breed-emoji-wrap" data-api="shihtzu"><img class="breed-card-real-photo" alt="Shorkie" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Shorkie <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>Royal ancestry from East and West — silky, sweet, and devoted. The perfect gentle companion for apartment living.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:40%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
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

const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n');
sitemap = sitemap.replace('</urlset>',
  `\n  <url><loc>https://www.alldogfacts.com/breeds/yorkipoo.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/shorkie.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Hybrid Batch 5 complete: yorkipoo + shorkie');
console.log('🏁 ALL 10 HYBRID PAGES DONE!');
