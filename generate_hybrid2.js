// generate_hybrid2.js — Cavapoo + Maltipoo
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
            <li><a href="cockapoo.html">Cockapoo</a></li>
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
// CAVAPOO
// ─────────────────────────────────────────────────────────────
const CAVAPOO = {
  name: 'Cavapoo', slug: 'cavapoo', emoji: '🐕', apiBreed: 'spaniel/cocker',
  youtubeId: 'S6cOPIFdLaI', parents: 'Cavalier King Charles + Poodle',
  subtitle: 'Hybrid / Designer Dog · UK\'s Most Popular Crossbreed · Gentle &amp; Low-Shedding',
  weight: '9–25 lbs', height: '9–14"', lifespan: '12–15 yrs',
  familyStar: '★★★★★', hypoallergenic: 'Often', shedding: 'Low–Very Low',
  bestFor: 'Families, seniors, allergy sufferers, apartment living',
  coatType: 'Wavy or curly; soft, low-shedding',
  metaDesc: 'Complete guide to the Cavapoo: temperament, generations, grooming, health, and why this Cavalier King Charles + Poodle mix is one of the most popular hybrids in the world.',
  keywords: 'Cavapoo, Cavalier King Charles Poodle mix, Cavapoo temperament, Cavapoo care, most popular hybrid dog UK',
  hybridVigor: 'Generally good',
  overview: `<p>The Cavapoo — a cross between a Cavalier King Charles Spaniel and a Miniature or Toy Poodle — has become one of the most sought-after hybrid dogs in the world. In the UK, they regularly outsell all purebred dogs, earning the title of Britain's most popular crossbreed. In the US, demand has surged dramatically over the past decade.</p>
          <p>It's easy to see why. The Cavapoo inherits the Cavalier's gentle, empathetic nature — one of the sweetest temperaments in dogdom — combined with the Poodle's intelligence and low-shedding coat. The result is a small, loving, adaptable companion that thrives in virtually any home environment and bonds deeply with every member of the family.</p>`,
  temperament: `<p>Cavapoos are warm, intuitive, and deeply affectionate. They seem to sense emotions around them and respond with calm, comforting presence. Unlike some Poodle mixes that can be high-strung, the Cavalier's calming influence gives the Cavapoo a gentle, even-keeled temperament that suits families, seniors, and first-time owners equally well.</p>
          <ul>
            <li>Exceptionally gentle and loving — one of the sweetest hybrid temperaments</li>
            <li>Wonderful with children, seniors, and people of all ages</li>
            <li>Friendly with strangers, other dogs, and cats</li>
            <li>Intuitive and emotionally sensitive — natural therapy dog material</li>
            <li>Adaptable — suits active and quieter households alike</li>
            <li>Prone to separation anxiety — needs consistent companionship</li>
          </ul>`,
  exercise: `<p>Cavapoos are moderately energetic — they enjoy daily walks and play sessions but are equally content cuddled up on the sofa. About 30–45 minutes of daily activity keeps them happy. Their adaptable energy level is one of their most appealing traits — they match their owner's lifestyle remarkably well.</p>
          <ul>
            <li>Daily requirement: 30–45 minutes of walking or play</li>
            <li>Excellent apartment dogs with consistent daily walks</li>
            <li>Enjoy fetch, short hikes, and off-leash play in secure areas</li>
            <li>Can participate in agility and obedience sports</li>
            <li>Mental enrichment through training keeps them sharp and content</li>
          </ul>`,
  travelTip: 'Cavapoos are outstanding travel companions. Their compact size (9–25 lbs) often qualifies for in-cabin airline travel, and their calm, adaptable temperament means they settle quickly in new environments — hotels, short-term rentals, and friends\' homes. One of the best hybrid breeds for people who travel with their dog.',
  grooming: `<p>The Cavapoo's soft, wavy or curly coat is low-shedding but requires consistent care to prevent matting — especially around the ears, face, and legs. Most owners keep their Cavapoo in a short "teddy bear" trim for easier maintenance. Ear health is particularly important given the floppy ears inherited from both parent breeds.</p>
          <ul>
            <li>Brush 3–4 times per week; daily for curlier coats</li>
            <li>Professional grooming every 6–8 weeks</li>
            <li>Clean floppy ears weekly — both parent breeds are ear-infection prone</li>
            <li>Trim around eyes regularly to prevent irritation</li>
            <li>Brush teeth daily — small breeds are highly prone to dental disease</li>
          </ul>`,
  training: `<p>Cavapoos are among the easiest hybrids to train — the Poodle's intelligence makes them quick learners, and the Cavalier's eagerness to please makes them willing and enthusiastic students. They excel in therapy dog work, basic obedience, and agility. Their sensitivity means positive reinforcement is always the right approach.</p>
          <ul>
            <li>Learns new commands quickly; excellent memory retention</li>
            <li>Highly food and praise motivated</li>
            <li>Popular therapy and emotional support dog choice</li>
            <li>House training is usually straightforward with routine</li>
            <li>Sensitive to tone of voice — always use calm, positive methods</li>
          </ul>`,
  health: `<p>Cavapoos can inherit health issues from either parent breed. The Cavalier side introduces the risk of Mitral Valve Disease (MVD) — a serious heart condition that affects over half of Cavaliers by age 5. Responsible Cavapoo breeders test both parents' hearts annually before breeding. The Poodle side may contribute eye conditions and hip dysplasia.</p>`,
  healthTags: ['Mitral Valve Disease (MVD)', 'Progressive Retinal Atrophy', 'Hip Dysplasia', 'Luxating Patella', 'Ear Infections', 'Syringomyelia (Cavalier side)', 'Cataracts'],
  rightForYou: `<p>Cavapoos suit almost anyone — families, seniors, singles, apartment dwellers, and first-time owners. They're one of the most universally recommended hybrid breeds. The main requirements: regular grooming, ear cleaning, and daily companionship. Their one health caveat — the Cavalier's heart disease risk — makes buying from health-tested breeders especially important.</p>`,
  compat: { kids: '★★★★★', dogs: '★★★★★', cats: '★★★★★', apartment: '★★★★★', firstTime: '★★★★★', heat: '★★★★☆' },
  parentLinks: [
    { slug: 'cavalier-king-charles', emoji: '🐕', name: 'Cavalier King Charles Spaniel' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Cavapoos are small to medium dogs with moderate energy needs. Feed a high-quality small-breed kibble with lean protein sources. Because the Cavalier parent is prone to heart disease, some owners choose cardiac-support formulas with added taurine and omega-3s as their Cavapoo ages. Avoid overfeeding — both parent breeds can gain weight easily.',
    rows: [
      ['Puppy (2–12 mo)', '½ – 1 cup/day', 'Small-breed puppy formula; 3 meals/day'],
      ['Adult (1–9 yr)', '¾ – 1¼ cups/day', '2 meals/day; monitor weight; omega-3 supplement beneficial'],
      ['Senior (9+ yr)', '½ – 1 cup/day', 'Consider cardiac-support formula; reduce if less active'],
    ],
  },
  cost: {
    puppy: '$1,200 – $3,000',
    monthly: '$40 – $65',
    annual: '$500 – $1,200',
    extras: [
      ['Professional Grooming', '$60 – $100/visit (every 6–8 weeks)'],
      ['Annual Heart Screening', '$150 – $300/year (important given MVD risk)'],
      ['Ear Cleaning Supplies', '$10 – $20/month'],
    ],
    tips: 'Adopt from a Cavapoo or Doodle rescue for $200–$400. Always buy from breeders who provide annual cardiac clearances for both Cavalier parents — MVD is hereditary and health testing reduces risk significantly. Annual heart checks for your dog starting around age 5 are a worthwhile investment.',
  },
  generations: {
    intro: 'Cavapoo generations determine the ratio of Cavalier to Poodle genetics. Generation significantly affects shedding, coat type, and how much the dog resembles each parent. Because the Cavalier side carries heart disease risk, some breeders prefer higher Poodle percentages to reduce this genetic load.',
    rows: [
      ['F1', '50% Cavalier + 50% Poodle', 'Low–Moderate', 'Classic Cavapoo look; gentle temperament; some shedding possible'],
      ['F1B', '25% Cavalier + 75% Poodle', 'Very Low', 'Best for allergy sufferers; curlier, less Cavalier coat'],
      ['F2', '50/50 second generation', 'Variable', 'More unpredictable coat; choose carefully'],
      ['Multigen', 'Multiple Cavapoo generations', 'Very Low', 'Most consistent coat and temperament; established lines'],
    ],
    tip: 'For allergy sufferers, choose F1B or multigen Cavapoos for the lowest shedding. For the most balanced blend of Cavalier sweetness and Poodle intelligence, an F1 Cavapoo from health-tested parents offers the best of both worlds.',
  },
  facts: [
    ['🇬🇧', 'Britain\'s Favorite Crossbreed', 'In the UK, Cavapoos have consistently outsold every purebred dog breed for several years running — more popular than Labradors, French Bulldogs, and Golden Retrievers. Their combination of low-shedding coats and gentle temperament hit a perfect sweet spot for British dog lovers.'],
    ['❤️', 'Natural-Born Therapy Dogs', 'Cavapoos inherit the Cavalier\'s extraordinary emotional intuition and the Poodle\'s trainability — making them one of the most naturally suited hybrid breeds for therapy work. They are widely used in hospitals, care homes, schools, and counseling settings.'],
    ['🎭', 'Two Looks in One Breed', 'Cavapoos can look dramatically different from one another depending on which parent they take after. Some are round-faced with tight curls (more Poodle), while others have the soft, spaniel-like face and wavy coat of the Cavalier. Both are equally adorable.'],
    ['📊', 'Search Traffic Champion', 'According to Google Trends, "Cavapoo" is consistently one of the most-searched dog breed terms in the world — often outranking purebred AKC-recognized breeds. Their social media presence is enormous, with millions of Instagram and TikTok followers across Cavapoo-dedicated accounts.'],
    ['💔', 'The Heart Health Challenge', 'The Cavalier King Charles Spaniel has one of the highest rates of inherited heart disease of any breed — over 50% develop MVD by age 5. Responsible Cavapoo breeders address this by testing both Cavalier parents annually and following the MVD Breeding Protocol, significantly reducing the risk in offspring.'],
  ],
  traits: [
    ['Energy Level', 60], ['Trainability', 100], ['Friendliness', 100],
    ['Grooming Needs', 80], ['Good with Kids', 100], ['Barking', 40], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// MALTIPOO
// ─────────────────────────────────────────────────────────────
const MALTIPOO = {
  name: 'Maltipoo', slug: 'maltipoo', emoji: '🐩', apiBreed: 'maltese',
  youtubeId: 'Qb3PBumFnWE', parents: 'Maltese + Poodle',
  subtitle: 'Hybrid / Designer Dog · Tiny &amp; Loving · Low-Shedding Apartment Champion',
  weight: '5–20 lbs', height: '8–14"', lifespan: '12–16 yrs',
  familyStar: '★★★★☆', hypoallergenic: 'Often', shedding: 'Very Low',
  bestFor: 'Apartment living, seniors, allergy sufferers',
  coatType: 'Wavy or curly; silky and very low-shedding',
  metaDesc: 'Complete guide to the Maltipoo: temperament, generations, grooming, cost, and whether this beloved Maltese Poodle mix is the right tiny companion for you.',
  keywords: 'Maltipoo, Maltese Poodle mix, Maltipoo temperament, Maltipoo care, small hypoallergenic dog breeds',
  hybridVigor: 'Generally good',
  overview: `<p>The Maltipoo is one of the most popular toy hybrid dogs in the world — a cross between the ancient Maltese and a Toy or Miniature Poodle. Both parent breeds were developed purely for human companionship, making the Maltipoo the ultimate expression of that purpose: a tiny, loving, low-shedding dog with an enormous capacity for affection.</p>
          <p>Maltipoos have exploded in popularity over the past two decades, beloved by celebrities, seniors, city dwellers, and allergy sufferers alike. Their small size, cheerful personality, and near-hypoallergenic coat make them ideal for apartment living and for people who want all the joy of a dog without the fur everywhere.</p>`,
  temperament: `<p>Maltipoos are affectionate, playful, and deeply attached to their people. They combine the Maltese's gentle, devoted nature with the Poodle's lively intelligence and enthusiasm. They thrive on attention and interaction, and they'll follow their favorite person from room to room all day if allowed.</p>
          <ul>
            <li>Deeply affectionate and loyal to their family</li>
            <li>Playful and entertaining — love to perform for attention</li>
            <li>Gentle with children, though better suited to older kids (fragility risk)</li>
            <li>Generally friendly with strangers and other pets</li>
            <li>Alert and vocal — tend to bark at new sounds and visitors</li>
            <li>Can develop separation anxiety — not suited to being alone all day</li>
          </ul>`,
  exercise: `<p>Maltipoos need light daily exercise — about 20–30 minutes of walking and play is plenty for most. Their small size and moderate energy level make them perfect apartment dogs. They enjoy indoor games just as much as outdoor walks, and they tire more quickly than larger breeds.</p>
          <ul>
            <li>Daily requirement: 20–30 minutes of light activity</li>
            <li>Short walks, indoor fetch, and play sessions work perfectly</li>
            <li>Ideal apartment and condo companions</li>
            <li>Avoid extreme heat — their coat can trap warmth</li>
            <li>Mental stimulation through training is important</li>
            <li>Never let off-leash in unsecured areas — vulnerable to predatory birds</li>
          </ul>`,
  travelTip: 'Maltipoos are among the very best travel dogs. At 5–20 lbs, they easily fit in airline-approved under-seat carriers for in-cabin travel on virtually any airline. Their adaptable, cheerful nature means they settle quickly in new environments. They\'re practically designed for the modern traveling dog owner.',
  grooming: `<p>The Maltipoo's soft, wavy coat is very low-shedding — but it grows continuously and mats easily without regular brushing. Like both parent breeds, Maltipoos need professional grooming every 4–8 weeks to keep their coat tidy. Their teeth and ears need special attention given the small-breed risks of dental disease and ear infections.</p>
          <ul>
            <li>Brush 4–5 times per week; daily for curlier coats</li>
            <li>Professional grooming every 4–8 weeks</li>
            <li>NEVER shave to the skin — damages coat permanently</li>
            <li>Brush teeth daily — small breeds get dental disease very easily</li>
            <li>Clean ears weekly; trim nails every 2–3 weeks</li>
            <li>Wipe eye area daily to prevent tear staining</li>
          </ul>`,
  training: `<p>Maltipoos are bright and quick to learn — the Poodle's intelligence shines through clearly. They're enthusiastic in training sessions, especially when treats are involved. However, they can be stubborn at times (a Maltese trait), and house training requires patience and consistency. Early training prevents excessive barking.</p>
          <ul>
            <li>Smart and fast to learn new tricks and commands</li>
            <li>Highly food motivated — small treats work best</li>
            <li>Bark training is essential — Maltipoos alert-bark readily</li>
            <li>House training needs consistent routine and patience</li>
            <li>Positive reinforcement only — very sensitive to harsh correction</li>
            <li>Excellent candidates for therapy dog certification</li>
          </ul>`,
  health: `<p>Maltipoos are generally long-lived and healthy, benefiting from hybrid vigor. Their main health concerns come from both parent breeds: White Shaker Syndrome and hypoglycemia from the Maltese side; progressive retinal atrophy and epilepsy from the Poodle side. Their tiny size also makes them vulnerable to injury from falls and rough handling.</p>`,
  healthTags: ['Hypoglycemia (especially puppies)', 'White Shaker Syndrome', 'Progressive Retinal Atrophy', 'Epilepsy', 'Dental Disease', 'Luxating Patella', 'Tracheal Collapse'],
  rightForYou: `<p>Maltipoos are ideal for seniors, apartment dwellers, singles, allergy sufferers, and anyone who wants a small, deeply loving companion. They're not the best choice for families with toddlers (too fragile) or people who are away from home all day (separation anxiety). They need grooming investment and daily companionship.</p>`,
  compat: { kids: '★★★☆☆', dogs: '★★★★☆', cats: '★★★★☆', apartment: '★★★★★', firstTime: '★★★★☆', heat: '★★★☆☆' },
  parentLinks: [
    { slug: 'maltese', emoji: '🐩', name: 'Maltese' },
    { slug: 'poodle', emoji: '🐩', name: 'Poodle' },
  ],
  diet: {
    intro: 'Maltipoos are tiny dogs with fast metabolisms — they need calorie-dense, high-quality small-breed kibble split into multiple small meals. Hypoglycemia (low blood sugar) is a serious risk in Maltipoo puppies and very small adults, so skipping meals is dangerous. Their beautiful coat also benefits from omega-3 fatty acid supplements.',
    rows: [
      ['Puppy (2–12 mo)', '¼ – ½ cup/day', '3–4 tiny meals/day; watch for hypoglycemia signs'],
      ['Adult (1–10 yr)', '¼ – ¾ cup/day', '2–3 meals/day; small-breed formula; omega-3 supplement'],
      ['Senior (10+ yr)', '¼ – ½ cup/day', 'Reduce if less active; soft food if dental issues develop'],
    ],
  },
  cost: {
    puppy: '$1,000 – $3,000',
    monthly: '$30 – $50',
    annual: '$400 – $900',
    extras: [
      ['Professional Grooming', '$55 – $90/visit (every 4–8 weeks)'],
      ['Dental Cleanings', '$200 – $400/year (critical for this breed)'],
      ['Tear Stain Treatment', '$10 – $25/month'],
    ],
    tips: 'Adopt from a Maltipoo or Doodle rescue for $100–$300. Food costs are minimal for this tiny breed. The biggest ongoing expenses are grooming and dental care. Brush teeth daily from puppyhood — it\'s the single most impactful thing you can do for their long-term health and vet bill reduction.',
  },
  generations: {
    intro: 'Maltipoo generations describe the ratio of Maltese to Poodle genetics. Because both parent breeds are already small and low-shedding, generation differences are less dramatic than in larger Doodle breeds — but they still affect coat type, size, and shedding level.',
    rows: [
      ['F1', '50% Maltese + 50% Poodle', 'Very Low', 'Classic Maltipoo; soft wavy coat; gentle personality blend'],
      ['F1B', '25% Maltese + 75% Poodle', 'Near Zero', 'Curlier coat; lowest shedding; best for severe allergies'],
      ['F2', '50/50 second generation', 'Very Low', 'Consistent results; established temperament'],
      ['Multigen', 'Multiple Maltipoo generations', 'Near Zero', 'Most predictable; smallest and lowest-shedding lines'],
    ],
    tip: 'Since both Maltese and Poodles are already very low-shedding, even F1 Maltipoos shed very little. For severe allergies, an F1B or multigen with more Poodle genetics offers the most allergen-friendly coat. Focus on health testing over generation when choosing a Maltipoo breeder.',
  },
  facts: [
    ['⭐', 'Celebrity Favorite', 'Maltipoos have been owned by Ellen DeGeneres, Rihanna, Blake Lively, and numerous other celebrities — fueling their popularity and establishing them as the quintessential Hollywood small dog. Their photogenic looks and manageable size make them perfect for high-profile lifestyles.'],
    ['🧬', 'Two Ancient Breeds Combined', 'The Maltese has been a companion dog for over 2,800 years. The Poodle has been refined for centuries as a working and companion breed. The Maltipoo combines two of the world\'s oldest and most devoted companion dog lineages into one tiny package.'],
    ['🤧', 'Allergy Sufferers\' Choice', 'Maltipoos are among the lowest-shedding of all hybrid breeds — both parent breeds already produce minimal dander. While no dog is truly hypoallergenic, Maltipoos are among the safest choices for people with mild to moderate dog allergies.'],
    ['🎭', 'Natural Entertainers', 'Maltipoos love an audience. They inherit the Maltese\'s historic tradition of performing (Maltese were once circus dogs) and the Poodle\'s love of showing off. They\'ll learn tricks enthusiastically and perform them on command for anyone willing to watch and applaud.'],
    ['⏳', 'Long Lifespan', 'Maltipoos regularly live 12–16 years — occasionally even longer. Combining the Maltese (one of the longest-lived small breeds) with the Poodle (also long-lived) creates a hybrid with exceptional longevity. Budget for a 15-year commitment when bringing one home.'],
  ],
  traits: [
    ['Energy Level', 40], ['Trainability', 80], ['Friendliness', 80],
    ['Grooming Needs', 80], ['Good with Kids', 60], ['Barking', 80], ['Shedding', 20],
  ],
};

// ─────────────────────────────────────────────────────────────
// WRITE FILES + UPDATE INDEX + SITEMAP
// ─────────────────────────────────────────────────────────────
[CAVAPOO, MALTIPOO].forEach(b => {
  fs.writeFileSync(path.join(BREEDS_DIR, `${b.slug}.html`), buildHybridPage(b), 'utf8');
  console.log(`✅ Created breeds/${b.slug}.html`);
});

const idxPath = path.join(BREEDS_DIR, 'index.html');
let idxHtml = fs.readFileSync(idxPath, 'utf8').replace(/\r\n/g, '\n');

const NEW_CARDS = `
        <a href="/breeds/cavapoo.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="medium" data-kids="yes" data-name="cavapoo cavalier king charles poodle mix">
          <div class="breed-emoji-wrap" data-api="spaniel/cocker"><img class="breed-card-real-photo" alt="Cavapoo" /><span class="breed-card-emoji-fallback">🐕</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Cavapoo <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>Britain's most popular crossbreed — gentle, loving, and low-shedding. Cavalier heart meets Poodle brains.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:60%"></div></div></div>
              <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:100%"></div></div></div>
              <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:80%"></div></div></div>
            </div>
          </div>
          <div class="breed-link-row">Full Profile <span>→</span></div>
        </a>

        <a href="/breeds/maltipoo.html" class="breed-card" data-type="hybrid" data-size="small" data-energy="low" data-kids="yes" data-name="maltipoo maltese poodle mix">
          <div class="breed-emoji-wrap" data-api="maltese"><img class="breed-card-real-photo" alt="Maltipoo" /><span class="breed-card-emoji-fallback">🐩</span><span class="size-badge small">Small</span></div>
          <div class="breed-info">
            <h3>Maltipoo <span style="font-size:.75em;color:var(--teal);font-weight:600">Hybrid</span></h3>
            <p>Tiny, loving, and nearly shed-free — the perfect apartment companion for seniors and allergy sufferers.</p>
            <div class="trait-dots">
              <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:40%"></div></div></div>
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
  `\n  <url><loc>https://www.alldogfacts.com/breeds/cavapoo.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://www.alldogfacts.com/breeds/maltipoo.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml updated');

console.log('\n🎉 Hybrid Batch 2 complete: cavapoo + maltipoo');
