const fs = require('fs');
const path = require('path');
const TODAY = '2026-05-25';
const BREEDS_DIR = path.join(__dirname, 'breeds');
const INDEX_PATH = path.join(BREEDS_DIR, 'index.html');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const breeds = [
  {
    slug:'komondor', name:'Komondor', rank:185,
    group:'Working Group', origin:'Hungary', alsoKnown:'Hungarian Sheepdog, Mop Dog',
    weight:'80–100+ lb', height:'25.5–27.5+ in', lifespan:'10–12 years',
    energyLabel:'Low Energy', e:'low', s:'large', sLabel:'Large',
    api:'komondor', emoji:'🧹',
    keywords:'komondor mop dog hungarian sheepdog corded coat guardian dog',
    tagline:'The legendary "mop dog" of Hungary — a natural guardian with an unforgettable coat',
    shortDesc:'Iconic corded Hungarian livestock guardian that blends in with sheep.',
    ov1:'The Komondor is one of the most distinctive-looking dogs in the world. Their remarkable white cords, which can reach the ground on an adult dog, serve a practical purpose: they blend with the sheep the Komondor guards and protect against wolf bites. This ancient Hungarian breed has guarded flocks for over 1,000 years.',
    ov2:'Komondorok (plural) are independent, self-sufficient guardians who take their protective role seriously. They are calm and steady with their family but vigilant and decisive when threatened. Their massive size and powerful build require experienced, confident owners who understand livestock guardian dog behavior.',
    traits:{energy:45,affection:70,kids:70,dogs:55,training:55},
    coat:'Long, corded, white; cords form naturally from 9–24 months',
    colors:'White only',
    apt:'No — needs space to patrol; not suited for apartment life',
    qf:['Their cords can reach the ground and weigh up to 15 lb','The plural of Komondor is Komondorok','Hungarian national treasure — export was historically restricted','AKC recognized in 1937'],
    health:['Hip dysplasia','Bloat (GDV)','Skin issues under cords (if not maintained)','Entropion'],
    diet:{
      puppy:{a:'3 meals daily of large-breed puppy formula; avoid rapid growth',c:'3–4 cups per day total'},
      adult:{a:'2 meals daily of quality large-breed food',c:'3–4 cups per day'},
      senior:{a:'2 meals daily of senior large-breed formula',c:'2½–3 cups per day'}
    },
    nutri:['High-quality protein for massive muscular build','Joint support critical for giant breed','Omega-3s for skin health beneath cords','Antioxidants for immune function'],
    pupCost:'$1,000–$2,000', foodCost:'$80–$120/month', vetCost:'$500–$900/year', groomCost:'$500–$1,000/year', supplCost:'$200–$400/year',
    costNote:'Cord maintenance is an extensive ongoing commitment — not for the impatient. Bathing and drying can take 24–48 hours.',
    mixes:[{n:'Komondor/Great Pyrenees mix',d:'Double white livestock guardian of impressive size and presence'},{n:'Komondor/Standard Poodle mix',d:'Curly giant with intelligence and guardian instincts'},{n:'Komondor/Kangal mix',d:'Formidable, independent flock guardian blend'}],
    facts:['A Komondor\'s cords can take up to 2 years to fully form','They are virtually noiseless when patrolling — then bark loudly at threats','Historically, they would sleep with flocks and blend in with the sheep','Komondorok were used by the Hungarian army to guard military installations in WWII'],
    ctaH:'Is a Komondor Right for You?',
    ctaP:'If you have land to protect, livestock to guard, and the patience for extraordinary coat care, the Komondor is a magnificent and historic working companion.'
  },
  {
    slug:'polish-lowland-sheepdog', name:'Polish Lowland Sheepdog', rank:192,
    group:'Herding Group', origin:'Poland', alsoKnown:'Polski Owczarek Nizinny, PON',
    weight:'30–50 lb', height:'17–20 in', lifespan:'12–14 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'sheepdog/english', emoji:'🐑',
    keywords:'polish lowland sheepdog PON polski owczarek nizinny herding dog',
    tagline:'Poland\'s shaggy herding treasure — intelligent, lively, and fiercely devoted',
    shortDesc:'Shaggy Polish herder with photographic memory and boundless drive.',
    ov1:'The Polish Lowland Sheepdog, known in Poland as the Polski Owczarek Nizinny (PON), is an ancient herding breed with a history spanning centuries on the Polish lowland plains. They are believed to be an ancestor of breeds like the Bearded Collie and Briard.',
    ov2:'PONs are exceptionally intelligent, with a remarkable photographic memory that makes them excellent at learning complex commands. However, this intelligence also means they need constant mental stimulation and consistent leadership. They bond deeply with family and can be stubborn if not properly engaged.',
    traits:{energy:85,affection:85,kids:80,dogs:75,training:80},
    coat:'Long, thick, shaggy double coat; flat or wavy',
    colors:'All colors accepted; white, gray, brown; often with patches',
    apt:'No — needs daily exercise and mental challenge',
    qf:['Polish name "PON" is the common nickname','Said to have contributed genes to the Bearded Collie','AKC recognized in 2001','Have a photographic memory — a trait noted by Polish shepherds for centuries'],
    health:['Hip dysplasia','Progressive retinal atrophy','Hypothyroidism','Central progressive retinal atrophy'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1–1½ cups per day total'},
      adult:{a:'2 meals daily of high-quality protein-rich food',c:'1½–2½ cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1–1½ cups per day'}
    },
    nutri:['High protein for active herding lifestyle','Omega-3 and -6 for long shaggy coat','Glucosamine for joint support','Antioxidants for eye health (PRA risk)'],
    pupCost:'$1,500–$2,500', foodCost:'$55–$85/month', vetCost:'$400–$700/year', groomCost:'$400–$700/year', supplCost:'$200–$400/year',
    costNote:'Grooming is a significant commitment; otherwise a healthy breed with moderate ownership costs.',
    mixes:[{n:'PON/Bearded Collie mix',d:'Double shaggy herder with enormous personality and energy'},{n:'PON/Border Collie mix',d:'Extraordinarily intelligent and driven herding powerhouse'},{n:'PON/Old English Sheepdog mix',d:'Gentle, shaggy giant with herding heritage from two nations'}],
    facts:['Their photographic memory means they remember commands learned years ago','Polish shepherds reportedly trusted PONs to herd livestock without human supervision','Survived the devastation of Poland during WWII thanks to dedicated breeders','Their long forelock often covers the eyes — but their eyesight is unimpaired beneath it'],
    ctaH:'Is a Polish Lowland Sheepdog Right for You?',
    ctaP:'If you want an intelligent, deeply loyal herding dog with a shaggy coat and remarkable memory, the Polish Lowland Sheepdog is a hidden gem.'
  },
  {
    slug:'belgian-laekenois', name:'Belgian Laekenois', rank:196,
    group:'Herding Group', origin:'Belgium', alsoKnown:'Laeken, Belgian Shepherd Laekenois',
    weight:'55–65 lb', height:'22–26 in', lifespan:'10–12 years',
    energyLabel:'High Energy', e:'high', s:'medium', sLabel:'Medium',
    api:'malinois', emoji:'🐕',
    keywords:'belgian laekenois laeken belgian shepherd herding dog wire coat',
    tagline:'The rarest of the four Belgian Shepherds — a wiry-coated guardian with intense drive',
    shortDesc:'Rarest Belgian Shepherd variety — rough-coated, intelligent, and intense.',
    ov1:'The Belgian Laekenois is the rarest of the four Belgian Shepherd varieties (alongside the Malinois, Tervuren, and Groenendael). Named after the royal castle of Laeken, the breed was historically favored by Queen Marie Henriette of Belgium. Their rough, tousled coat is unique among the Belgian Shepherds.',
    ov2:'Like all Belgian Shepherds, the Laekenois is intensely intelligent, high-energy, and deeply driven. They form powerful bonds with one person and excel in protection sports, herding, agility, and search-and-rescue. They require experienced handling and significant daily work to be content.',
    traits:{energy:90,affection:80,kids:70,dogs:65,training:85},
    coat:'Rough, dry, tousled wiry coat; approximately 2.5 inches long',
    colors:'Fawn with black overlay or charcoal; tousled appearance',
    apt:'No — needs significant exercise and mental stimulation',
    qf:['Rarest of the four Belgian Shepherd varieties','Named after the royal castle of Laeken in Brussels','AKC recognized in 2020','Historically guarded linen drying in fields around Antwerp'],
    health:['Hip dysplasia','Elbow dysplasia','Progressive retinal atrophy','Epilepsy'],
    diet:{
      puppy:{a:'3 meals daily of medium-breed puppy formula',c:'1½–2 cups per day total'},
      adult:{a:'2 meals daily of high-quality active dog food',c:'2–3 cups per day'},
      senior:{a:'2 meals daily of senior formula',c:'1½–2 cups per day'}
    },
    nutri:['High-quality protein for working dog physique','Omega-3s for wiry coat health','Taurine and L-carnitine for cardiac support','Glucosamine for joint integrity'],
    pupCost:'$1,500–$3,000', foodCost:'$60–$90/month', vetCost:'$400–$800/year', groomCost:'$200–$400/year', supplCost:'$200–$400/year',
    costNote:'Rare breed with limited breeders; expect higher initial cost and potential wait list; otherwise moderate ongoing costs.',
    mixes:[{n:'Laekenois/Belgian Malinois mix',d:'Extreme drive and intelligence in a slightly softer coat'},{n:'Laekenois/German Shepherd mix',d:'Powerful, loyal, and versatile protection dog blend'},{n:'Laekenois/Dutch Shepherd mix',d:'Triple-brindle herder of extraordinary capability'}],
    facts:['Queen Marie Henriette of Belgium was an early champion of the breed','Used as messenger dogs and Red Cross dogs in World War I','Their rough coat is the result of a different genetic expression than the other Belgian Shepherd varieties','Less well-known than the Malinois but equally capable in working roles'],
    ctaH:'Is a Belgian Laekenois Right for You?',
    ctaP:'If you want the rarest Belgian Shepherd with full working capability and a distinctive rough coat, the Laekenois is an extraordinary choice for experienced owners.'
  }
];

function generateHTML(b) {
  const gp = b.coat&&b.coat.includes('Long')||b.coat&&b.coat.includes('long') ? 75 :
    b.coat&&b.coat.includes('wire')||b.coat&&b.coat.includes('Wire')||b.coat&&b.coat.includes('Wiry')||b.coat&&b.coat.includes('wiry')||b.coat&&b.coat.includes('rough')||b.coat&&b.coat.includes('Rough') ? 65 :
    b.coat&&b.coat.includes('short')||b.coat&&b.coat.includes('Short') ? 25 : 45;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${b.name} – Breed Profile | BestPetSite</title>
<meta name="description" content="${b.name} breed profile: ${b.tagline.toLowerCase()}.">
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/breeds.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
</head>
<body>
<nav class="top-nav">
  <a href="../index.html" class="nav-logo">🐾 BestPetSite</a>
  <div class="nav-links">
    <a href="../breeds/index.html">Dog Breeds</a>
    <a href="../index.html#tools">Tools</a>
    <a href="../index.html#about">About</a>
  </div>
</nav>

<div class="breed-hero">
  <div class="breed-hero-inner">
    <div class="breed-emoji-wrap" data-api="${b.api}" id="breedEmojiWrap">
      <span class="breed-hero-emoji" id="breedEmoji">${b.emoji}</span>
      <img id="breedPhoto" alt="${b.name}" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:18px;">
    </div>
    <div class="breed-hero-text">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
        <span style="background:#0d9488;color:#fff;font-size:.75rem;font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:.03em">AKC #${b.rank}</span>
        <span style="background:#f1f5f9;color:#475569;font-size:.75rem;font-weight:600;padding:4px 12px;border-radius:20px">${b.group}</span>
      </div>
      <h1>${b.name}</h1>
      <p class="breed-hero-tagline">${b.tagline}</p>
      <div class="breed-quick-stats">
        <div class="bqs-item"><span class="bqs-label">Weight</span><span class="bqs-val">${b.weight}</span></div>
        <div class="bqs-item"><span class="bqs-label">Height</span><span class="bqs-val">${b.height}</span></div>
        <div class="bqs-item"><span class="bqs-label">Lifespan</span><span class="bqs-val">${b.lifespan}</span></div>
        <div class="bqs-item"><span class="bqs-label">Energy</span><span class="bqs-val">${b.energyLabel}</span></div>
      </div>
    </div>
  </div>
</div>

<div class="breed-tabs-wrap">
  <div class="breed-tabs">
    <button class="breed-tab active" data-tab="profile">Profile</button>
    <button class="breed-tab" data-tab="diet">Diet</button>
    <button class="breed-tab" data-tab="cost">Cost</button>
    <button class="breed-tab" data-tab="mixes">Mixes</button>
    <button class="breed-tab" data-tab="facts">Fun Facts</button>
  </div>
</div>

<div class="breed-content">

<div class="breed-tab-panel active" id="tab-profile">
  <div class="breed-two-col">
    <div class="breed-main">
      <h2>Overview</h2>
      <p>${b.ov1}</p>
      <p>${b.ov2}</p>

      <h2>Temperament &amp; Traits</h2>
      <div class="trait-bars-full">
        <div class="trait-row"><span class="trait-label">Energy Level</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.energy}%"></div></div><span class="trait-pct">${b.traits.energy}%</span></div>
        <div class="trait-row"><span class="trait-label">Affection</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.affection}%"></div></div><span class="trait-pct">${b.traits.affection}%</span></div>
        <div class="trait-row"><span class="trait-label">Good with Kids</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.kids}%"></div></div><span class="trait-pct">${b.traits.kids}%</span></div>
        <div class="trait-row"><span class="trait-label">Good with Dogs</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.dogs}%"></div></div><span class="trait-pct">${b.traits.dogs}%</span></div>
        <div class="trait-row"><span class="trait-label">Trainability</span><div class="trait-bar-full"><div class="trait-fill" style="width:${b.traits.training}%"></div></div><span class="trait-pct">${b.traits.training}%</span></div>
      </div>

      <h2>Photo Gallery</h2>
      <div class="breed-gallery">
        <img id="gp1" class="gallery-photo" alt="${b.name} photo 1">
        <img id="gp2" class="gallery-photo" alt="${b.name} photo 2">
        <img id="gp3" class="gallery-photo" alt="${b.name} photo 3">
        <img id="gp4" class="gallery-photo" alt="${b.name} photo 4">
        <img id="gp5" class="gallery-photo" alt="${b.name} photo 5">
        <img id="gp6" class="gallery-photo" alt="${b.name} photo 6">
      </div>
    </div>

    <div class="breed-sidebar">
      <div class="sidebar-card">
        <h3>Quick Facts</h3>
        <table class="quick-facts-table">
          <tr><td>Origin</td><td>${b.origin}</td></tr>
          <tr><td>Also Known As</td><td>${b.alsoKnown}</td></tr>
          <tr><td>Weight</td><td>${b.weight}</td></tr>
          <tr><td>Height</td><td>${b.height}</td></tr>
          <tr><td>Lifespan</td><td>${b.lifespan}</td></tr>
          <tr><td>Coat</td><td>${b.coat}</td></tr>
          <tr><td>Colors</td><td>${b.colors}</td></tr>
          <tr><td>Apartment?</td><td>${b.apt}</td></tr>
        </table>
      </div>

      <div class="sidebar-card">
        <h3>Did You Know?</h3>
        <ul class="did-you-know">
          ${b.qf.map(q=>`<li>${q}</li>`).join('\n          ')}
        </ul>
      </div>

      <div class="sidebar-card">
        <h3>Common Health Issues</h3>
        <ul class="health-list">
          ${b.health.map(h=>`<li>${h}</li>`).join('\n          ')}
        </ul>
      </div>

      <div class="sidebar-card cta-card">
        <h3>${b.ctaH}</h3>
        <p>${b.ctaP}</p>
        <a href="https://www.pawsvip.com" class="cta-btn" target="_blank" rel="noopener">Find a Sitter on PawsVIP →</a>
      </div>
    </div>
  </div>
</div>

<div class="breed-tab-panel" id="tab-diet">
  <h2>${b.name} Diet &amp; Nutrition Guide</h2>
  <div class="diet-stages">
    <div class="diet-stage">
      <h3>🐶 Puppy (0–12 months)</h3>
      <p><strong>Approach:</strong> ${b.diet.puppy.a}</p>
      <p><strong>Calories:</strong> ${b.diet.puppy.c}</p>
    </div>
    <div class="diet-stage">
      <h3>🐕 Adult (1–7 years)</h3>
      <p><strong>Approach:</strong> ${b.diet.adult.a}</p>
      <p><strong>Calories:</strong> ${b.diet.adult.c}</p>
    </div>
    <div class="diet-stage">
      <h3>🦮 Senior (7+ years)</h3>
      <p><strong>Approach:</strong> ${b.diet.senior.a}</p>
      <p><strong>Calories:</strong> ${b.diet.senior.c}</p>
    </div>
  </div>
  <h3>Key Nutritional Priorities</h3>
  <ul class="nutri-list">
    ${b.nutri.map(n=>`<li>${n}</li>`).join('\n    ')}
  </ul>
</div>

<div class="breed-tab-panel" id="tab-cost">
  <h2>Cost of Owning a ${b.name}</h2>
  <div class="cost-grid">
    <div class="cost-card"><span class="cost-icon">🐾</span><h3>Puppy Price</h3><p class="cost-amount">${b.pupCost}</p></div>
    <div class="cost-card"><span class="cost-icon">🍖</span><h3>Food / Month</h3><p class="cost-amount">${b.foodCost}</p></div>
    <div class="cost-card"><span class="cost-icon">🏥</span><h3>Vet / Year</h3><p class="cost-amount">${b.vetCost}</p></div>
    <div class="cost-card"><span class="cost-icon">✂️</span><h3>Grooming / Year</h3><p class="cost-amount">${b.groomCost}</p></div>
    <div class="cost-card"><span class="cost-icon">🧸</span><h3>Supplies / Year</h3><p class="cost-amount">${b.supplCost}</p></div>
  </div>
  <p class="cost-note">${b.costNote}</p>
</div>

<div class="breed-tab-panel" id="tab-mixes">
  <h2>Popular ${b.name} Mixes</h2>
  <div class="mixes-grid">
    ${b.mixes.map(m=>`<div class="mix-card"><h3>${m.n}</h3><p>${m.d}</p></div>`).join('\n    ')}
  </div>
</div>

<div class="breed-tab-panel" id="tab-facts">
  <h2>Fun Facts About the ${b.name}</h2>
  <ul class="fun-facts-list">
    ${b.facts.map(f=>`<li>${f}</li>`).join('\n    ')}
  </ul>
</div>

</div><!-- .breed-content -->

<div id="lightbox" class="lightbox" style="display:none">
  <button class="lb-close" id="lbClose">✕</button>
  <button class="lb-prev" id="lbPrev">‹</button>
  <img id="lbImg" alt="enlarged photo">
  <button class="lb-next" id="lbNext">›</button>
</div>

<footer class="site-footer">
  <p>© 2025 BestPetSite · <a href="../index.html">Home</a> · <a href="../breeds/index.html">All Breeds</a></p>
</footer>

<script>
(function(){
  const tabs=document.querySelectorAll('.breed-tab');
  const panels=document.querySelectorAll('.breed-tab-panel');
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    });
  });

  let galleryPhotos=[];
  let currentLb=0;
  function openLightbox(i){currentLb=i;document.getElementById('lbImg').src=galleryPhotos[i];document.getElementById('lightbox').style.display='flex';}
  function closeLightbox(){document.getElementById('lightbox').style.display='none';}
  document.getElementById('lbClose').addEventListener('click',closeLightbox);
  document.getElementById('lbPrev').addEventListener('click',()=>{currentLb=(currentLb-1+galleryPhotos.length)%galleryPhotos.length;document.getElementById('lbImg').src=galleryPhotos[currentLb];});
  document.getElementById('lbNext').addEventListener('click',()=>{currentLb=(currentLb+1)%galleryPhotos.length;document.getElementById('lbImg').src=galleryPhotos[currentLb];});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')document.getElementById('lbPrev').click();if(e.key==='ArrowRight')document.getElementById('lbNext').click();});

  fetch('https://dog.ceo/api/breed/${b.api}/images').then(r=>r.json()).then(data=>{
    const photos=data.message;if(!photos||!photos.length)return;
    const hero=document.getElementById('breedPhoto');
    hero.src=photos[Math.min(3,photos.length-1)];
    hero.onload=()=>{hero.style.display='block';document.getElementById('breedEmoji').style.display='none';};
    [6,11,16,21,26,31].forEach((idx,i)=>{
      const src=photos[idx]||photos[i]||photos[0];
      const el=document.getElementById('gp'+(i+1));
      if(el&&src){galleryPhotos.push(src);el.src=src;el.style.display='block';el.addEventListener('click',()=>openLightbox(i));}
    });
  }).catch(()=>{});
})();
</script>
</body>
</html>`;
}

function generateCard(b) {
  const gp = b.coat&&b.coat.includes('Long')||b.coat&&b.coat.includes('long')||b.coat&&b.coat.includes('corded')||b.coat&&b.coat.includes('Cord') ? 75 :
    b.coat&&b.coat.includes('wire')||b.coat&&b.coat.includes('Wire')||b.coat&&b.coat.includes('Wiry')||b.coat&&b.coat.includes('wiry')||b.coat&&b.coat.includes('rough')||b.coat&&b.coat.includes('Rough')||b.coat&&b.coat.includes('tousled') ? 65 :
    b.coat&&b.coat.includes('short')||b.coat&&b.coat.includes('Short') ? 25 : 45;
  return `<a href="${b.slug}.html" class="breed-card" data-type="purebred" data-size="${b.s}" data-energy="${b.e}" data-kids="yes" data-name="${b.keywords}">
            <div class="breed-emoji-wrap" data-api="${b.api}"><span style="position:absolute;top:8px;left:8px;background:#0d9488;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em">#${b.rank}</span><img class="breed-card-real-photo" alt="${b.name}" /><span class="breed-card-emoji-fallback">${b.emoji}</span><span class="size-badge ${b.s}">${b.sLabel}</span></div>
            <div class="breed-info">
              <h3>${b.name}</h3>
              <p>${b.shortDesc}</p>
              <div class="trait-dots">
                <div class="trait"><span class="trait-name">Energy</span><div class="trait-bar"><div class="trait-fill" style="width:${b.traits.energy}%"></div></div></div>
                <div class="trait"><span class="trait-name">Training</span><div class="trait-bar"><div class="trait-fill" style="width:${b.traits.training}%"></div></div></div>
                <div class="trait"><span class="trait-name">Grooming</span><div class="trait-bar"><div class="trait-fill" style="width:${gp}%"></div></div></div>
              </div>
            </div>
            <div class="breed-link-row">Full Profile <span>→</span></div>
          </a>`;
}

let index = fs.readFileSync(INDEX_PATH, 'utf8');
let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

breeds.forEach(b => {
  const htmlPath = path.join(BREEDS_DIR, b.slug + '.html');
  fs.writeFileSync(htmlPath, generateHTML(b), 'utf8');
  console.log('✓', b.slug + '.html');
});

const newCards = '\n' + breeds.map(b => generateCard(b)).join('\n') + '\n';
index = index.replace('\n<a href="goldendoodle.html"', newCards + '\n<a href="goldendoodle.html"');
fs.writeFileSync(INDEX_PATH, index, 'utf8');

const entries = breeds.map(b =>
  `  <url><loc>https://www.alldogfacts.com/breeds/${b.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
).join('\n');
sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>');
fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');

console.log('\nBatch 6 done: 3 files, index + sitemap updated. ALL 53 BREEDS COMPLETE!');
