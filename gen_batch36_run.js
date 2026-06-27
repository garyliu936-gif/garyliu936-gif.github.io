/* gen_batch36_run.js — Build EN+ZH pages, insert cards, update sitemap.
 * Idempotent. Run: node gen_batch36_run.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const base = require('./gen_batch36.js');
const { SIZE_LABEL, SIZE_LABEL_ZH, ENERGY_LABEL_ZH, stars, cap, dietPortion, costRange } = base;
function tryReq(f){ try { const m = require(f); return Array.isArray(m) ? m : (m.BREEDS || []); } catch(e){ console.log('  (no '+f+')'); return []; } }
const BREEDS = [...base.BREEDS, ...tryReq('./gen_batch36_wave2.js'), ...tryReq('./gen_batch36_wave3.js')];

const ROOT = __dirname;
const EN_DIR = path.join(ROOT, 'breeds');
const ZH_DIR = path.join(ROOT, 'zh', 'breeds');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const TODAY = '2026-06-27';
const GA = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C8QDN9HH5F');
  </script>`;

const energyWidth = e => (e === 'high' ? 90 : e === 'medium' ? 60 : 35);
const groomWidth = c => /silk|double|medium/i.test(c) ? 60 : 30;

// Photo helpers — only emitted when breed has a dog.ceo `api` path
function heroImg(b) { return b.api ? `<img class="breed-hero-real-photo" id="breedPhoto" alt="${b.api ? b.name : ''}" />\n          ` : ''; }
function gallerySection(b, isZh) {
  if (!b.api) return '';
  const nm = isZh ? b.zh.name : b.name;
  const intro = isZh ? `真实的${nm}照片——欣赏它们的外貌、体型和个性。` : `Real ${nm}s — browse photos showcasing their look, size, and personality.`;
  const h2 = isZh ? '📸 照片画廊' : '📸 Photo Gallery';
  const imgs = [1,2,3,4,5,6].map(n=>`<img class="gallery-photo" id="gp${n}" alt="${nm} photo ${n}" />`).join('\n              ');
  return `
          <div class="breed-section">
            <h2>${h2}</h2>
            <p>${intro}</p>
            <div class="breed-gallery" id="breedGallery">
              ${imgs}
            </div>
          </div>`;
}
function lightboxBlock(b) {
  if (!b.api) return '';
  return `
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <button class="lightbox-prev" id="lightboxPrev">&#9664;</button>
    <img id="lightboxImg" src="" alt="Enlarged ${b.name} photo" />
    <button class="lightbox-next" id="lightboxNext">&#9654;</button>
  </div>`;
}
function galleryScript(b) {
  if (!b.api) return '';
  return `
  <script>
    let galleryPhotos = [], currentPhotoIndex = 0;
    fetch('https://dog.ceo/api/breed/${b.api}/images')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data.message) || !data.message.length) return;
        const photos = data.message;
        const hero = document.getElementById('breedPhoto');
        if (hero) { hero.src = photos[2] || photos[0]; hero.onload = () => { hero.style.display = 'block'; document.getElementById('breedEmoji').style.display = 'none'; }; }
        [5,15,25,35,45,55].forEach((index, i) => {
          const el = document.getElementById('gp' + (i + 1));
          const src = photos[index] || photos[i] || photos[0];
          if (el && src) { galleryPhotos.push(src); el.src = src; el.addEventListener('click', () => openLightbox(i)); }
        });
      }).catch(() => {});
    function openLightbox(i){ currentPhotoIndex=i; document.getElementById('lightboxImg').src=galleryPhotos[i]; document.getElementById('lightbox').classList.add('open'); }
    function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }
    const lb=document.getElementById('lightbox');
    if(lb){
      document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
      document.getElementById('lightboxPrev').addEventListener('click', e=>{e.stopPropagation();currentPhotoIndex=(currentPhotoIndex-1+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];});
      document.getElementById('lightboxNext').addEventListener('click', e=>{e.stopPropagation();currentPhotoIndex=(currentPhotoIndex+1)%galleryPhotos.length;document.getElementById('lightboxImg').src=galleryPhotos[currentPhotoIndex];});
      lb.addEventListener('click', e=>{ if(e.target===e.currentTarget) closeLightbox(); });
    }
  </script>`;
}

function metaHead(b, isZh) {
  const name = isZh ? b.zh.name : b.name;
  const url = `https://alldogfacts.com/${isZh ? 'zh/' : ''}breeds/${b.slug}.html`;
  const enUrl = `https://alldogfacts.com/breeds/${b.slug}.html`;
  const zhUrl = `https://alldogfacts.com/zh/breeds/${b.slug}.html`;
  const desc = isZh
    ? `${name}犬种资料：起源、性格、体型、运动、美容护理、健康与饲养费用全方位介绍。`
    : `${name} breed profile: origin, temperament, size, exercise, grooming, health, and cost to own — a complete guide.`;
  const title = isZh
    ? `${name} — 犬种资料、性格、护理与健康 | AllDogFacts`
    : `${name} — Breed Profile, Temperament, Care & Health | AllDogFacts`;
  const cssBase = isZh ? '../../css' : '../css';
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh-CN' : 'en'}">
<head>
${GA}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${cssBase}/styles.css" />
  <link rel="stylesheet" href="${cssBase}/breeds.css" />
  <!-- SEO:auto -->
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="en" href="${enUrl}" />
  <link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />
  <link rel="alternate" hreflang="x-default" href="${enUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="AllDogFacts" />
  <meta property="og:title" content="${title.replace(/&/g,'&amp;')}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="https://alldogfacts.com/images/lab-grass.jpg" />
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title.replace(/&/g,'&amp;')}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://alldogfacts.com/images/lab-grass.jpg" />
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"${isZh?'首页':'Home'}","item":"https://alldogfacts.com/${isZh?'zh/':''}"},{"@type":"ListItem","position":2,"name":"${isZh?'犬种大全':'Dog Breeds'}","item":"https://alldogfacts.com/${isZh?'zh/':''}breeds/"},{"@type":"ListItem","position":3,"name":"${name}","item":"${url}"}]}</script>
</head>`;
}

function nav(isZh) {
  const p = isZh ? '/zh' : '';
  const home = isZh ? '首页' : 'Home';
  const L = isZh
    ? ['犬种大全','养狗入门','训练指南','健康','营养','美容护理']
    : ['Dog Breeds','Getting a Dog','Training','Health','Nutrition','Grooming'];
  const paths = ['/breeds/index.html','/getting-a-dog/index.html','/training/index.html','/health/index.html','/nutrition/index.html','/grooming/index.html'];
  const back = isZh ? '../index.html' : '../index.html';
  return `
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="${back}" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">All<span class="logo-dog">Dog</span><span class="logo-accent">Facts</span></span></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="${back}">${home}</a></li>
        <li><a href="${p}/breeds/index.html" style="color:var(--teal)">${L[0]}</a></li>
        <li><a href="${p}/getting-a-dog/index.html">${L[1]}</a></li>
        <li><a href="${p}/training/index.html">${L[2]}</a></li>
        <li><a href="${p}/health/index.html">${L[3]}</a></li>
        <li><a href="${p}/nutrition/index.html">${L[4]}</a></li>
        <li><a href="${p}/grooming/index.html">${L[5]}</a></li>
      </ul>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </nav>`;
}

function relatedCards(b, isZh) {
  return b.related.map(r =>
    `<a href="${r.slug}.html" class="related-card"><span class="rel-emoji">${r.emoji}</span><span>${r.name}</span></a>`
  ).join('\n              ');
}

function buildEN(b) {
  const sz = SIZE_LABEL[b.size];
  const dp = dietPortion(b.size), cr = costRange(b.size);
  const traitRows = Object.entries(b.traits).map(([k,v]) =>
    `<div class="trait-item"><div class="trait-header"><span>${k}</span><span>${v}/5</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:${v*20}%"></div></div></div>`
  ).join('\n            ');
  return `${metaHead(b,false)}
<body>
${nav(false)}

  <section class="breed-page-hero">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a><span>›</span>
        <a href="index.html">Dog Breeds</a><span>›</span>
        <span style="color:rgba(255,255,255,.8)">${b.name}</span>
      </div>
      <div class="breed-hero-layout">
        <div class="breed-hero-emoji" id="breedPhotoWrap">
          ${heroImg(b)}<span class="breed-emoji-fallback" id="breedEmoji">${b.emoji}</span>
        </div>
        <div class="breed-hero-text">
          <h1>${b.name}</h1>
          <p class="breed-subtitle">${b.subtitle}</p>
          <div class="breed-quick-stats">
            <div class="quick-stat"><span class="quick-stat-value">${b.weight}</span><span class="quick-stat-label">Weight</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.height}</span><span class="quick-stat-label">Height</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.lifespan}</span><span class="quick-stat-label">Lifespan</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.energyLabel}</span><span class="quick-stat-label">Energy</span></div>
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
            ${b.overview.map(p=>`<p>${p}</p>`).join('\n            ')}
          </div>${gallerySection(b,false)}
          <div class="breed-section">
            <h2>😊 Temperament &amp; Personality</h2>
            <p>${b.temperament}</p>
            <ul>
              ${b.traitBullets.map(t=>`<li>${t}</li>`).join('\n              ')}
            </ul>
          </div>
          <div class="breed-section">
            <h2>🏃 Exercise &amp; Activity Needs</h2>
            <p>The ${b.name} is ${b.energy==='high'?'a high-energy breed that needs substantial daily exercise':b.energy==='medium'?'a moderately active breed that needs regular daily exercise':'a lower-energy breed that still needs daily walks and play'} to stay physically and mentally healthy. Match activity to the dog's age and fitness, and remember that mental work is as important as physical exertion.</p>
            <ul>
              <li>Daily exercise: ${b.energy==='high'?'1–2 hours of vigorous activity':b.energy==='medium'?'45–75 minutes of activity':'30–45 minutes of walking and play'}, split across the day</li>
              <li>Provide enrichment — puzzle feeders, scent games, and training — to prevent boredom</li>
              <li>Secure, fenced space is ideal for safe off-leash running</li>
              <li>Build up gradually and avoid overexertion in young puppies to protect developing joints</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>✂️ Grooming &amp; Coat Care</h2>
            <p>The ${b.name} has a ${b.coat.toLowerCase()} coat with ${b.shedding.toLowerCase()} shedding. A consistent, simple grooming routine keeps the coat healthy and your home cleaner.</p>
            <ul>
              <li>Brush ${groomWidth(b.coat)>40?'2–3 times per week':'weekly'}; increase during seasonal shedding</li>
              <li>Bathe every 6–8 weeks or as needed — avoid overbathing</li>
              <li>Check and clean ears weekly to prevent infection</li>
              <li>Trim nails every 3–4 weeks and brush teeth regularly</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🎓 Training</h2>
            <p>The ${b.name} responds best to consistent, reward-based training started early. Patience and clear, fair boundaries bring out the best in this breed.</p>
            <ul>
              <li>Begin socialization and training as early as possible</li>
              <li>Use positive reinforcement — treats, praise, and play</li>
              <li>Keep sessions short, varied, and consistent across the household</li>
              <li>Exercise before training — a settled dog focuses better</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🏥 Health &amp; Common Issues</h2>
            <p>The ${b.name} is generally a hardy breed, but responsible breeders screen for the conditions below. Buying from health-tested parents significantly reduces risk.</p>
            <div class="health-tags">
              ${b.health.map(h=>`<span class="health-tag">${h}</span>`).join('\n              ')}
            </div>
            <div class="info-grid" style="margin-top:16px">
              <div class="info-box"><div class="info-box-label">Average Lifespan</div><div class="info-box-value">${b.lifespan}</div></div>
              <div class="info-box"><div class="info-box-label">Size Category</div><div class="info-box-value">${sz} — ${b.weight}</div></div>
              <div class="info-box"><div class="info-box-label">Vet Visits</div><div class="info-box-value">Annual wellness exams + vaccinations</div></div>
              <div class="info-box"><div class="info-box-label">Pet Insurance</div><div class="info-box-value">Strongly recommended for all breeds</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🏠 Is a ${b.name} Right for You?</h2>
            <p>The ${b.name} suits owners who can meet its exercise, training, and companionship needs. Consider your living space, schedule, and experience level before bringing one home.</p>
            <div class="compat-grid">
              <div class="compat-item"><span class="compat-icon">👶</span><span class="compat-label">With Kids</span><span class="compat-stars">${stars(b.compat.kids)}</span></div>
              <div class="compat-item"><span class="compat-icon">🐕</span><span class="compat-label">With Dogs</span><span class="compat-stars">${stars(b.compat.dogs)}</span></div>
              <div class="compat-item"><span class="compat-icon">🐈</span><span class="compat-label">With Cats</span><span class="compat-stars">${stars(b.compat.cats)}</span></div>
              <div class="compat-item"><span class="compat-icon">🏠</span><span class="compat-label">Apartment</span><span class="compat-stars">${stars(b.compat.apartment)}</span></div>
              <div class="compat-item"><span class="compat-icon">🔰</span><span class="compat-label">First-Time Owner</span><span class="compat-stars">${stars(b.compat.firstTime)}</span></div>
              <div class="compat-item"><span class="compat-icon">🌡️</span><span class="compat-label">Hot Climates</span><span class="compat-stars">${stars(b.compat.hot)}</span></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🐾 Related Breeds</h2>
            <div class="related-breeds">
              ${relatedCards(b,false)}
            </div>
          </div>
        </div><!-- end tab-profile -->

        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ How Much to Feed a ${b.name}</h2>
            <p>${b.name}s need consistent, well-portioned meals matched to their life stage. Overfeeding is a major health risk — use these guidelines and adjust to your dog's activity and body condition.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Puppy (8–12 weeks)</div><div class="info-box-value">${dp[3]}</div></div>
              <div class="info-box"><div class="info-box-label">Puppy (3–6 months)</div><div class="info-box-value">3 meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Adult (1+ year)</div><div class="info-box-value">2 meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Senior (7+ years)</div><div class="info-box-value">2 smaller meals per day</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📏 Daily Portion Guide</h2>
            <p>General guidelines for a ${sz.toLowerCase()} breed. Always follow your food brand's instructions and adjust for activity level.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Inactive</div><div class="info-box-value">${dp[0]}</div></div>
              <div class="info-box"><div class="info-box-label">Average</div><div class="info-box-value">${dp[1]}</div></div>
              <div class="info-box"><div class="info-box-label">Active / Working</div><div class="info-box-value">${dp[2]}</div></div>
              <div class="info-box"><div class="info-box-label">Treats</div><div class="info-box-value">≤10% of daily calories</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🚫 Foods That Are Dangerous</h2>
            <p>These common human foods can be toxic — even life-threatening — for dogs. Keep them safely out of reach.</p>
            <div class="health-tags">
              <span class="health-tag">Chocolate</span><span class="health-tag">Grapes &amp; Raisins</span><span class="health-tag">Onions &amp; Garlic</span><span class="health-tag">Xylitol</span><span class="health-tag">Macadamia Nuts</span><span class="health-tag">Alcohol</span><span class="health-tag">Avocado</span>
            </div>
            <div class="travel-tip-box">
              <h4>💡 Tip: Boarding your ${b.name}?</h4>
              <p>Always bring your dog's regular food when boarding — sudden food changes cause digestive upset. Share your exact feeding schedule and portions with the facility.</p>
            </div>
          </div>
        </div><!-- end tab-diet -->

        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 How Much Does a ${b.name} Cost?</h2>
            <p>The upfront cost is just the beginning. Here's a realistic breakdown of what to expect to acquire and own one.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Reputable Breeder</div><div class="info-box-value">${cr[0]}</div></div>
              <div class="info-box"><div class="info-box-label">Rare / Champion Lines</div><div class="info-box-value">${cr[1]}</div></div>
              <div class="info-box"><div class="info-box-label">Rescue / Adoption</div><div class="info-box-value">${cr[2]}</div></div>
              <div class="info-box"><div class="info-box-label">Monthly Ownership</div><div class="info-box-value">${cr[3]}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📅 Monthly Cost of Ownership</h2>
            <p>Beyond purchase price, expect ongoing monthly costs across these categories:</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Food</div><div class="info-box-value">Quality kibble for a ${sz.toLowerCase()} dog</div></div>
              <div class="info-box"><div class="info-box-label">Vet (annual)</div><div class="info-box-value">$400–$900/year</div></div>
              <div class="info-box"><div class="info-box-label">Pet insurance</div><div class="info-box-value">$30–$70/month</div></div>
              <div class="info-box"><div class="info-box-label">Supplies &amp; toys</div><div class="info-box-value">$15–$40/month</div></div>
            </div>
            <div class="travel-tip-box">
              <h4>💡 Money-saving tip</h4>
              <p>Buy pet insurance before your dog turns 1 for the best rates and fewest exclusions. Compare 2–3 providers before committing.</p>
            </div>
          </div>
        </div><!-- end tab-cost -->

        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Amazing Facts About the ${b.name}</h2>
            <ul>
              ${b.facts.map(f=>`<li>${f}</li>`).join('\n              ')}
            </ul>
          </div>
          <div class="breed-section">
            <h2>📋 ${b.name} At a Glance</h2>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Origin</div><div class="info-box-value">${b.origin}</div></div>
              <div class="info-box"><div class="info-box-label">Recognition</div><div class="info-box-value">${b.recognition}</div></div>
              <div class="info-box"><div class="info-box-label">Group</div><div class="info-box-value">${b.group}</div></div>
              <div class="info-box"><div class="info-box-label">Coat</div><div class="info-box-value">${b.coat}</div></div>
            </div>
          </div>
        </div><!-- end tab-facts -->

      </div>

      <aside class="breed-sidebar">
        <div class="sidebar-card">
          <h4>Breed Traits</h4>
          <div class="trait-row">
            ${traitRows}
          </div>
        </div>
        <div class="sidebar-card" style="background:var(--teal-light); border-color:var(--teal)">
          <h4 style="color:var(--teal-dark)">Explore More Breeds</h4>
          <p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">Browse our full directory of <strong class="breed-count-live">571+</strong> dog breeds with detailed profiles.</p>
          <a href="/breeds/index.html" style="display:block; text-align:center; background:var(--teal); color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:.88rem;">Browse All Breeds →</a>
        </div>
        <div class="sidebar-card">
          <h4>Quick Facts</h4>
          <div class="info-box"><div class="info-box-label">Origin</div><div class="info-box-value">${b.origin}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Group</div><div class="info-box-value">${b.group}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Recognition</div><div class="info-box-value">${b.recognition}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Coat</div><div class="info-box-value">${b.coat}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Shedding</div><div class="info-box-value">${b.shedding}</div></div>
        </div>
      </aside>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">All<span class="logo-dog">Dog</span><span class="logo-accent">Facts</span></span></div><p>Your complete guide to dog breeds, pet boarding in Seattle, and nationwide pet transportation.</p></div>
        <div class="footer-col"><h4>More Breeds</h4><ul><li><a href="golden-retriever.html">Golden Retriever</a></li><li><a href="labrador-retriever.html">Labrador Retriever</a></li><li><a href="german-shepherd.html">German Shepherd</a></li><li><a href="index.html">All Breeds →</a></li></ul></div>
        <div class="footer-col"><h4>Our Services</h4><ul><li><a href="https://www.pawsvip.com" target="_blank">Pet Hotel Seattle</a></li><li><a href="../index.html#transport">Nationwide Transport</a></li><li><a href="../index.html#contact">Get a Quote</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div>
    </div>
  </footer>

  ${lightboxBlock(b)}
  <script src="../js/main.js"></script>
  <script src="../js/breed-count.js?v=5"></script>
  ${galleryScript(b)}
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
</body>
</html>`;
}

function buildZH(b) {
  const z = b.zh;
  const sz = SIZE_LABEL_ZH[b.size];
  const dp = dietPortion(b.size), cr = costRange(b.size);
  const traitRows = Object.entries(b.traits).map(([k,v]) =>
    `<div class="trait-item"><div class="trait-header"><span>${k}</span><span>${v}/5</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:${v*20}%"></div></div></div>`
  ).join('\n            ');
  const related = b.related.map(r=>`<a href="${r.slug}.html" class="related-card"><span class="rel-emoji">${r.emoji}</span><span>${r.name}</span></a>`).join('\n              ');
  return `${metaHead(b,true)}
<body>
${nav(true)}

  <section class="breed-page-hero">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">首页</a><span>›</span>
        <a href="index.html">犬种大全</a><span>›</span>
        <span style="color:rgba(255,255,255,.8)">${z.name}</span>
      </div>
      <div class="breed-hero-layout">
        <div class="breed-hero-emoji" id="breedPhotoWrap">
          ${heroImg(b)}<span class="breed-emoji-fallback" id="breedEmoji">${b.emoji}</span>
        </div>
        <div class="breed-hero-text">
          <h1>${z.name}</h1>
          <p class="breed-subtitle">${z.subtitle}</p>
          <div class="breed-quick-stats">
            <div class="quick-stat"><span class="quick-stat-value">${b.weight}</span><span class="quick-stat-label">体重</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.height}</span><span class="quick-stat-label">肩高</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${b.lifespan}</span><span class="quick-stat-label">寿命</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${ENERGY_LABEL_ZH[b.energy]}</span><span class="quick-stat-label">活力</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="breed-content-wrap">
      <div class="breed-main">

        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 简介</button>
          <button class="breed-tab" data-tab="diet">🍽️ 饮食</button>
          <button class="breed-tab" data-tab="cost">💰 费用</button>
          <button class="breed-tab" data-tab="facts">🎉 趣味知识</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">
          <div class="breed-section">
            <h2>🐾 品种概述</h2>
            ${z.overview.map(p=>`<p>${p}</p>`).join('\n            ')}
          </div>${gallerySection(b,true)}
          <div class="breed-section">
            <h2>😊 性格与气质</h2>
            <p>${z.temperament}</p>
          </div>
          <div class="breed-section">
            <h2>🏃 运动需求</h2>
            <p>${z.name}属于${ENERGY_LABEL_ZH[b.energy]}活力犬种，需要${b.energy==='high'?'大量的每日运动':b.energy==='medium'?'规律的每日运动':'适度的每日散步和玩耍'}以保持身心健康。请根据犬只的年龄和体能调整运动量，并记住脑力锻炼与体力消耗同样重要。</p>
            <ul>
              <li>每日运动：${b.energy==='high'?'1–2 小时的剧烈活动':b.energy==='medium'?'45–75 分钟的活动':'30–45 分钟的散步和玩耍'}，可分次进行</li>
              <li>提供益智玩具、嗅闻游戏和训练等丰富化活动，防止无聊</li>
              <li>有围栏的安全空间适合放绳奔跑</li>
              <li>幼犬应循序渐进、避免过度运动，以保护发育中的关节</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>✂️ 美容与被毛护理</h2>
            <p>${z.name}拥有${b.coat}型被毛，掉毛量为${b.shedding}。简单而规律的美容护理能保持被毛健康，也让居家更整洁。</p>
            <ul>
              <li>每${groomWidth(b.coat)>40?'周梳理 2–3 次':'周梳理一次'}；换毛季增加频率</li>
              <li>每 6–8 周或按需洗澡——避免过度洗澡</li>
              <li>每周检查并清洁耳朵，预防感染</li>
              <li>每 3–4 周修剪一次指甲，并定期刷牙</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🎓 训练</h2>
            <p>${z.name}对尽早开始的一致、奖励式训练反应最佳。耐心以及清晰公正的界限能激发该品种的最佳表现。</p>
            <ul>
              <li>尽早开始社会化和训练</li>
              <li>使用正向强化——零食、表扬和玩耍</li>
              <li>训练时间宜短、多样，全家规则一致</li>
              <li>训练前先运动——安定的狗更专注</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🏥 健康与常见问题</h2>
            <p>${z.name}总体是强健的品种，但负责任的育种者会针对以下情况进行筛查。从经过健康检测的父母犬购买可显著降低风险。</p>
            <div class="health-tags">
              ${b.health.map(h=>`<span class="health-tag">${h}</span>`).join('\n              ')}
            </div>
            <div class="info-grid" style="margin-top:16px">
              <div class="info-box"><div class="info-box-label">平均寿命</div><div class="info-box-value">${b.lifespan}</div></div>
              <div class="info-box"><div class="info-box-label">体型分类</div><div class="info-box-value">${sz} — ${b.weight}</div></div>
              <div class="info-box"><div class="info-box-label">兽医检查</div><div class="info-box-value">每年健康体检 + 疫苗</div></div>
              <div class="info-box"><div class="info-box-label">宠物保险</div><div class="info-box-value">强烈建议所有品种购买</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🐾 相关品种</h2>
            <div class="related-breeds">
              ${related}
            </div>
          </div>
        </div><!-- end tab-profile -->

        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ ${z.name}的喂食量</h2>
            <p>${z.name}需要根据生命阶段提供分量适宜的规律餐食。过度喂食是主要健康风险——请参考以下指南，并根据犬只的活动量和体况调整。</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">幼犬（8–12 周）</div><div class="info-box-value">每天 3–4 顿少量餐</div></div>
              <div class="info-box"><div class="info-box-label">幼犬（3–6 月）</div><div class="info-box-value">每天 3 顿</div></div>
              <div class="info-box"><div class="info-box-label">成犬（1 岁以上）</div><div class="info-box-value">每天 2 顿</div></div>
              <div class="info-box"><div class="info-box-label">老年犬（7 岁以上）</div><div class="info-box-value">每天 2 顿少量餐</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🚫 危险食物</h2>
            <p>以下常见人类食物对狗可能有毒，甚至危及生命，请妥善存放，远离犬只。</p>
            <div class="health-tags">
              <span class="health-tag">巧克力</span><span class="health-tag">葡萄与葡萄干</span><span class="health-tag">洋葱与大蒜</span><span class="health-tag">木糖醇</span><span class="health-tag">夏威夷果</span><span class="health-tag">酒精</span><span class="health-tag">牛油果</span>
            </div>
            <div class="travel-tip-box">
              <h4>💡 提示：寄养您的${z.name}？</h4>
              <p>寄养时务必带上狗狗平时的食物——突然换粮会导致肠胃不适。请将确切的喂食时间和分量告知寄养机构。</p>
            </div>
          </div>
        </div><!-- end tab-diet -->

        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 ${z.name}的价格</h2>
            <p>购买费用只是开始。以下是获取和饲养一只所需的实际费用概览。</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">正规育种者</div><div class="info-box-value">${cr[0]}</div></div>
              <div class="info-box"><div class="info-box-label">稀有/冠军血系</div><div class="info-box-value">${cr[1]}</div></div>
              <div class="info-box"><div class="info-box-label">救援/领养</div><div class="info-box-value">${cr[2]}</div></div>
              <div class="info-box"><div class="info-box-label">每月饲养</div><div class="info-box-value">${cr[3]}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📅 每月饲养费用</h2>
            <p>除购买价格外，每月还需在以下方面持续支出：</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">食物</div><div class="info-box-value">${sz}犬的优质狗粮</div></div>
              <div class="info-box"><div class="info-box-label">兽医（年度）</div><div class="info-box-value">$400–$900/年</div></div>
              <div class="info-box"><div class="info-box-label">宠物保险</div><div class="info-box-value">$30–$70/月</div></div>
              <div class="info-box"><div class="info-box-label">用品与玩具</div><div class="info-box-value">$15–$40/月</div></div>
            </div>
          </div>
        </div><!-- end tab-cost -->

        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 关于${z.name}的趣味知识</h2>
            <ul>
              ${z.facts.map(f=>`<li>${f}</li>`).join('\n              ')}
            </ul>
          </div>
          <div class="breed-section">
            <h2>📋 ${z.name}一览</h2>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">起源</div><div class="info-box-value">${b.origin}</div></div>
              <div class="info-box"><div class="info-box-label">认可机构</div><div class="info-box-value">${b.recognition}</div></div>
              <div class="info-box"><div class="info-box-label">类别</div><div class="info-box-value">${b.group}</div></div>
              <div class="info-box"><div class="info-box-label">被毛</div><div class="info-box-value">${b.coat}</div></div>
            </div>
          </div>
        </div><!-- end tab-facts -->

      </div>

      <aside class="breed-sidebar">
        <div class="sidebar-card">
          <h4>品种特征</h4>
          <div class="trait-row">
            ${traitRows}
          </div>
        </div>
        <div class="sidebar-card" style="background:var(--teal-light); border-color:var(--teal)">
          <h4 style="color:var(--teal-dark)">探索更多犬种</h4>
          <p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">浏览我们收录 <strong class="breed-count-live">571+</strong> 个犬种的完整目录。</p>
          <a href="/zh/breeds/index.html" style="display:block; text-align:center; background:var(--teal); color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:.88rem;">浏览全部犬种 →</a>
        </div>
        <div class="sidebar-card">
          <h4>快速信息</h4>
          <div class="info-box"><div class="info-box-label">起源</div><div class="info-box-value">${b.origin}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">类别</div><div class="info-box-value">${b.group}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">认可机构</div><div class="info-box-value">${b.recognition}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">被毛</div><div class="info-box-value">${b.coat}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">掉毛</div><div class="info-box-value">${b.shedding}</div></div>
        </div>
      </aside>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">All<span class="logo-dog">Dog</span><span class="logo-accent">Facts</span></span></div><p>您的完整犬种指南、西雅图宠物寄养与全美宠物运输服务。</p></div>
        <div class="footer-col"><h4>更多犬种</h4><ul><li><a href="golden-retriever.html">金毛寻回犬</a></li><li><a href="labrador-retriever.html">拉布拉多寻回犬</a></li><li><a href="german-shepherd.html">德国牧羊犬</a></li><li><a href="index.html">全部犬种 →</a></li></ul></div>
        <div class="footer-col"><h4>我们的服务</h4><ul><li><a href="https://www.pawsvip.com" target="_blank">西雅图宠物酒店</a></li><li><a href="../index.html#transport">全美运输</a></li><li><a href="../index.html#contact">获取报价</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>© 2025 AllDogFacts. 版权所有。</p></div>
    </div>
  </footer>

  ${lightboxBlock(b)}
  <script src="../../js/main.js"></script>
  <script src="../../js/breed-count.js?v=5"></script>
  ${galleryScript(b)}
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
</body>
</html>`;
}

function cardHTML(b, isZh) {
  const name = isZh ? b.zh.name : b.name;
  const tagline = (isZh ? b.zh.subtitle : b.subtitle).split('·').pop().trim();
  const szLabel = isZh ? SIZE_LABEL_ZH[b.size] : SIZE_LABEL[b.size];
  const apiAttr = b.api ? ` data-api="${b.api}"` : '';
  const dn = (b.name + ' ' + b.keywords).toLowerCase();
  const train = (b.traits.Trainability || 3) * 20;
  return `<a href="${b.slug}.html" class="breed-card" data-type="purebred" data-size="${b.size}" data-energy="${b.energy}" data-kids="${b.kids}" data-name="${dn}"><div class="breed-emoji-wrap"${apiAttr}><span style="position:absolute;top:8px;left:8px;background:#0d9488;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">${b.badge}</span><img class="breed-card-real-photo" alt="${name}"/><span class="breed-card-emoji-fallback">${b.emoji}</span><span class="size-badge ${b.size}">${szLabel}</span></div><div class="breed-info"><h3>${name}</h3><p>${tagline}</p><div class="trait-dots"><div class="trait"><span class="trait-name">${isZh?'活力':'Energy'}</span><div class="trait-bar"><div class="trait-fill" style="width:${energyWidth(b.energy)}%"></div></div></div><div class="trait"><span class="trait-name">${isZh?'训练':'Training'}</span><div class="trait-bar"><div class="trait-fill" style="width:${train}%"></div></div></div><div class="trait"><span class="trait-name">${isZh?'美容':'Grooming'}</span><div class="trait-bar"><div class="trait-fill" style="width:${groomWidth(b.coat)}%"></div></div></div></div></div><div class="breed-link-row">${isZh?'完整资料':'Full Profile'} <span>→</span></div></a>`;
}

function insertCards(indexPath, isZh) {
  let html = fs.readFileSync(indexPath, 'utf8');
  const marker = '<div class="no-results" id="noResults">';
  const newCards = BREEDS
    .filter(b => !html.includes(`href="${b.slug}.html"`))
    .map(b => cardHTML(b, isZh));
  if (!newCards.length) { console.log(`  (cards) all present in ${path.basename(path.dirname(indexPath))}/index`); return 0; }
  const block = `<!-- ===== BATCH 36 new breeds ===== -->\n` + newCards.join('\n') + `\n        `;
  html = html.replace(marker, block + marker);
  fs.writeFileSync(indexPath, html, 'utf8');
  return newCards.length;
}

function updateSitemap() {
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  let added = 0;
  const entries = [];
  for (const b of BREEDS) {
    for (const loc of [`https://alldogfacts.com/breeds/${b.slug}.html`, `https://alldogfacts.com/zh/breeds/${b.slug}.html`]) {
      if (!xml.includes(loc)) {
        entries.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
        added++;
      }
    }
  }
  if (added) xml = xml.replace('</urlset>', entries.join('\n') + '\n</urlset>');
  fs.writeFileSync(SITEMAP, xml, 'utf8');
  return added;
}

// ── Run ──
let en = 0, zh = 0;
for (const b of BREEDS) {
  const enPath = path.join(EN_DIR, b.slug + '.html');
  const zhPath = path.join(ZH_DIR, b.slug + '.html');
  if (!fs.existsSync(enPath)) { fs.writeFileSync(enPath, buildEN(b), 'utf8'); en++; console.log('  EN +', b.slug); }
  if (!fs.existsSync(zhPath)) { fs.writeFileSync(zhPath, buildZH(b), 'utf8'); zh++; console.log('  ZH +', b.slug); }
}
const cEn = insertCards(path.join(EN_DIR, 'index.html'), false);
const cZh = insertCards(path.join(ZH_DIR, 'index.html'), true);
const sm = updateSitemap();
console.log(`\nDone. EN pages: ${en}, ZH pages: ${zh}, EN cards: ${cEn}, ZH cards: ${cZh}, sitemap entries: ${sm}`);
