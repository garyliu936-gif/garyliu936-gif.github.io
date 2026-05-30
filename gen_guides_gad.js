const fs = require('fs');
const path = require('path');

function nav(active) {
  const items = [
    ['/', 'Home'],
    ['/breeds/index.html', 'Dog Breeds'],
    ['/getting-a-dog/index.html', 'Getting a Dog'],
    ['/training/index.html', 'Training'],
    ['/health/index.html', 'Health'],
    ['/nutrition/index.html', 'Nutrition'],
    ['/grooming/index.html', 'Grooming'],
  ];
  const links = items.map(([href, label]) =>
    `<li><a href="${href}"${href.includes(active) && active !== '/' ? ' style="color:var(--teal)"' : ''}>${label}</a></li>`
  ).join('\n        ');
  return `<nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="/index.html" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></a>
      <ul class="nav-links" id="navLinks">${links}</ul>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </nav>`;
}

function footer() {
  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div>
          <p>A free, in-depth encyclopedia for dog owners and lovers.</p>
        </div>
        <div class="footer-col"><h4>Getting a Dog</h4><ul>
          <li><a href="/getting-a-dog/best-breeds-first-time-owners.html">Best for First-Timers</a></li>
          <li><a href="/getting-a-dog/cost-of-owning-a-dog.html">Cost of a Dog</a></li>
          <li><a href="/getting-a-dog/adopt-vs-breeder.html">Adopt vs. Buy</a></li>
        </ul></div>
        <div class="footer-col"><h4>Dog Care</h4><ul>
          <li><a href="/training/index.html">Training Guides</a></li>
          <li><a href="/health/index.html">Health & Symptoms</a></li>
          <li><a href="/nutrition/index.html">Nutrition & Diet</a></li>
          <li><a href="/grooming/index.html">Grooming</a></li>
        </ul></div>
        <div class="footer-col"><h4>Dog Breeds</h4><ul>
          <li><a href="/breeds/labrador-retriever.html">Labrador Retriever</a></li>
          <li><a href="/breeds/golden-retriever.html">Golden Retriever</a></li>
          <li><a href="/breeds/index.html">All 302 Breeds</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div>
    </div>
  </footer>`;
}

function page(cfg) {
  const tocHtml = cfg.toc.map(t => `<li><a href="#${t.id}">${t.label}</a></li>`).join('');
  const relatedHtml = cfg.related.map(r => `<li><a href="${r.url}">${r.title}</a></li>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${cfg.title} | AllDogFacts</title>
  <meta name="description" content="${cfg.metaDesc}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/css/styles.css"/>
  <link rel="stylesheet" href="/css/guide-article.css"/>
</head>
<body>
  ${nav(cfg.category)}
  <section class="ga-hero" style="background:${cfg.heroBg}">
    <div class="container">
      <nav class="ga-breadcrumb">
        <a href="/index.html">Home</a><span>›</span>
        <a href="/${cfg.category}/index.html">${cfg.categoryLabel}</a><span>›</span>
        ${cfg.title}
      </nav>
      <div class="ga-hero-tag">${cfg.heroTag}</div>
      <h1>${cfg.h1}</h1>
      <p class="ga-hero-desc">${cfg.desc}</p>
      <div class="ga-meta">
        <span>📖 ${cfg.readTime}</span>
        ${cfg.level ? `<span>🏷️ ${cfg.level}</span>` : ''}
      </div>
    </div>
  </section>
  <div class="ga-wrap">
    <div class="container">
      <div class="ga-layout">
        <main class="ga-main">${cfg.body}</main>
        <aside class="ga-sidebar">
          <div class="ga-scard">
            <h4>In This Guide</h4>
            <ul class="toc-list">${tocHtml}</ul>
          </div>
          <div class="ga-scard">
            <h4>Related Guides</h4>
            <ul class="ga-related-list">${relatedHtml}</ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
  ${footer()}
  <script src="/js/main.js"></script>
</body>
</html>`;
}

const GUIDES = [
  {
    slug: 'best-breeds-first-time-owners',
    title: 'Best Dog Breeds for First-Time Owners',
    metaDesc: 'The 8 best dog breeds for first-time owners — easy to train, forgiving, and great for beginners. Ranked and explained.',
    heroTag: 'Find Your Breed',
    heroBg: 'linear-gradient(135deg,#0f172a 0%,#134e4a 100%)',
    h1: 'Best Dog Breeds for <span class="hl">First-Time Owners</span>',
    desc: "Not every breed is beginner-friendly. These 8 breeds forgive mistakes, train quickly, and adapt to a wide range of lifestyles.",
    readTime: '7 min read',
    level: 'Beginner',
    toc: [
      {id:'what-makes', label:'What Makes a Breed Beginner-Friendly?'},
      {id:'top-breeds', label:'The 8 Best Breeds'},
      {id:'avoid', label:'Breeds to Avoid First Time'},
      {id:'next', label:'Your Next Step'},
    ],
    body: `
<p class="ga-lede">Choosing your first dog is one of the most exciting decisions you'll make — and one of the easiest to get wrong. The most common mistake new owners make is choosing a breed based on looks. A Husky is stunning; it's also a high-energy escape artist that routinely ends up in shelters because first-time owners underestimate its needs. This guide focuses on breeds that are genuinely forgiving, trainable, and a joy to live with from day one.</p>
<h2 id="what-makes">What Makes a Breed Beginner-Friendly?</h2>
<p>Beginner-friendly breeds share several key traits:</p>
<ul>
  <li><strong>Eager to please</strong> — they want to make you happy, which makes training faster</li>
  <li><strong>Medium energy</strong> — not so calm they become lazy, not so high-energy they become destructive</li>
  <li><strong>Predictable temperament</strong> — consistent behavior, not prone to sudden aggression</li>
  <li><strong>Adaptable</strong> — comfortable in apartments or houses, with or without a yard</li>
  <li><strong>Forgiving of mistakes</strong> — bounce back from training inconsistencies without lasting behavioral damage</li>
</ul>
<h2 id="top-breeds">The 8 Best Breeds for First-Time Owners</h2>
<h3>1. Labrador Retriever</h3>
<p>America's most popular dog for over 30 years. Labs are friendly with everyone, easy to train, and bounce back from your mistakes gracefully. They need daily exercise (45 minutes of walking or play) but are otherwise low-drama. Main challenge: they're mouthy as puppies and need consistent chew-toy redirection.</p>
<div class="tip-box"><strong>💡 Best for:</strong> Active families, first-timers with a yard. Available in yellow, black, and chocolate.</div>
<h3>2. Golden Retriever</h3>
<p>Gentle, patient, and endlessly tolerant — Goldens rarely lose their temper. They're slightly softer in temperament than Labs, making them a great fit for positive-reinforcement-focused owners. They shed heavily, so expect a lint roller in every room.</p>
<h3>3. Cavalier King Charles Spaniel</h3>
<p>If you want a lap dog that's also social and trainable, the Cavalier is your match. They weigh 12–18 lbs, adapt well to apartment living, and have a gentle disposition fantastic with kids and other pets. Health costs can be higher due to hereditary heart issues — get a puppy from health-tested parents.</p>
<h3>4. Bichon Frisé</h3>
<p>Playful, cheerful, and nearly hypoallergenic. Bichons are ideal for people who want a small dog that doesn't trigger allergies. They're smart, enjoy training, and don't require enormous exercise. Professional grooming every 6–8 weeks is the main commitment.</p>
<h3>5. Poodle (Miniature or Standard)</h3>
<p>Poodles are among the most intelligent dogs in existence, making training fast and rewarding. They're hypoallergenic, athletic, and remarkably adaptable. The "fancy" stereotype is completely wrong — Standard Poodles especially make outstanding first dogs.</p>
<h3>6. Shih Tzu</h3>
<p>For lower-activity owners or apartment dwellers, the Shih Tzu delivers big personality in a tiny package. They were bred as companion dogs and are naturally good at it. A moderate daily walk and weekly brushing is all they need. They can be stubborn during training — keep sessions short and fun.</p>
<h3>7. Beagle</h3>
<p>Friendly, sociable, and sturdy with kids. The caveat: Beagles follow their nose. A loose Beagle in an unfenced yard will vanish. They also bark and howl, which matters in apartments. With a secure yard and leash discipline, they're wonderful.</p>
<h3>8. Pug</h3>
<p>Charming, low-energy, and happy in small spaces. Pugs adapt easily to their owner's lifestyle. The trade-off: as a flat-faced (brachycephalic) breed, they struggle in heat and may have breathing issues. Avoid strenuous exercise in warm weather.</p>
<h2 id="avoid">Breeds to Avoid as a First-Timer</h2>
<table class="ga-table">
  <thead><tr><th>Breed</th><th>Why It's Challenging</th></tr></thead>
  <tbody>
    <tr><td>Siberian Husky</td><td>Extreme exercise needs, escape artists, strong-willed</td></tr>
    <tr><td>Chow Chow</td><td>Reserved with strangers, dominant, needs strong leadership</td></tr>
    <tr><td>Border Collie</td><td>Extraordinarily intelligent — bored Borders become destructive</td></tr>
    <tr><td>Dalmatian</td><td>High energy, stubborn, needs very experienced handling</td></tr>
    <tr><td>Akita</td><td>Protective, powerful, unforgiving of inconsistent training</td></tr>
  </tbody>
</table>
<h2 id="next">Your Next Step</h2>
<p>Once you've identified a breed you love, take our breed-finder quiz on the <a href="/getting-a-dog/index.html">Getting a Dog</a> page to confirm it matches your lifestyle. Then research breeders or local shelters.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Pick a breed that fits your real lifestyle, not your ideal lifestyle. If you currently walk 20 minutes a day, don't get a Border Collie hoping you'll run marathons. Get a dog that thrives on what you actually do today.</div>`,
    related: [
      {url:'/getting-a-dog/adopt-vs-breeder.html', title:'Adopt vs. Buy From a Breeder'},
      {url:'/getting-a-dog/cost-of-owning-a-dog.html', title:'The Real Cost of Owning a Dog'},
      {url:'/getting-a-dog/new-puppy-checklist.html', title:'New Puppy Checklist'},
    ]
  },

  {
    slug: 'cost-of-owning-a-dog',
    title: 'The Real Cost of Owning a Dog',
    metaDesc: 'Complete dog ownership cost breakdown — year one, ongoing annual costs, by size, and hidden expenses. No sugarcoating.',
    heroTag: 'Costs & Budget',
    heroBg: 'linear-gradient(135deg,#0f172a 0%,#134e4a 100%)',
    h1: 'The Real Cost of <span class="hl">Owning a Dog</span>',
    desc: "The purchase price is just the beginning. Here's what dog ownership actually costs — year one and every year after.",
    readTime: '9 min read',
    level: null,
    toc: [
      {id:'year-one', label:'Year One Costs'},
      {id:'ongoing', label:'Ongoing Annual Costs'},
      {id:'by-size', label:'Cost by Dog Size'},
      {id:'hidden', label:'Hidden & Surprise Costs'},
      {id:'budget', label:'How to Budget'},
    ],
    body: `
<p class="ga-lede">Most people budget for the puppy price and maybe food. Then they get hit with $800 vet bills, $150 grooming appointments, boarding fees, destroyed furniture, and dozens of impulse toy purchases. The real cost of owning a dog is significantly higher than most first-timers expect — but it's manageable if you know what's coming.</p>
<h2 id="year-one">Year One Costs</h2>
<p>The first year is always the most expensive. Between acquisition, initial vet visits, spay/neuter, and supplies, most owners spend $3,000–$6,000 before the dog turns 12 months.</p>
<table class="ga-table">
  <thead><tr><th>Expense</th><th>Low</th><th>High</th></tr></thead>
  <tbody>
    <tr><td>Purchase price (breeder) or adoption fee</td><td>$300</td><td>$3,500+</td></tr>
    <tr><td>Initial vet visit + vaccinations</td><td>$150</td><td>$350</td></tr>
    <tr><td>Spay/neuter</td><td>$200</td><td>$600</td></tr>
    <tr><td>Microchip</td><td>$25</td><td>$75</td></tr>
    <tr><td>Startup supplies (crate, bed, bowls, leash, collar)</td><td>$150</td><td>$400</td></tr>
    <tr><td>Food (first year)</td><td>$300</td><td>$900</td></tr>
    <tr><td>Toys and chews</td><td>$75</td><td>$250</td></tr>
    <tr><td>Training class</td><td>$100</td><td>$300</td></tr>
    <tr><td><strong>Year One Total</strong></td><td><strong>~$1,300</strong></td><td><strong>~$6,375+</strong></td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>⚠️ Note:</strong> Designer breeds (French Bulldog, English Bulldog, premium Doodle mixes) can cost $3,000–$6,000 for the dog alone — before a single vet visit.</div>
<h2 id="ongoing">Ongoing Annual Costs</h2>
<p>After year one, costs stabilize but don't disappear. The average owner spends $1,500–$3,500 per year depending on size and health.</p>
<table class="ga-table">
  <thead><tr><th>Expense</th><th>Small Dog</th><th>Medium Dog</th><th>Large Dog</th></tr></thead>
  <tbody>
    <tr><td>Food</td><td>$250–$450</td><td>$400–$700</td><td>$600–$1,200</td></tr>
    <tr><td>Annual vet wellness exam</td><td>$150–$250</td><td>$150–$250</td><td>$200–$350</td></tr>
    <tr><td>Vaccines + flea/heartworm prevention</td><td>$100–$200</td><td>$100–$200</td><td>$150–$300</td></tr>
    <tr><td>Grooming</td><td>$200–$600</td><td>$200–$600</td><td>$300–$800</td></tr>
    <tr><td>Toys, treats, accessories</td><td>$100–$200</td><td>$150–$300</td><td>$200–$400</td></tr>
    <tr><td>Boarding/pet sitting (10 days/yr)</td><td>$200–$500</td><td>$300–$600</td><td>$400–$800</td></tr>
    <tr><td><strong>Annual Total</strong></td><td><strong>$1,000–$2,200</strong></td><td><strong>$1,300–$2,650</strong></td><td><strong>$1,850–$3,850</strong></td></tr>
  </tbody>
</table>
<h2 id="by-size">Cost by Dog Size</h2>
<p>Size is the single biggest cost driver. Everything costs more with a bigger dog — food, medications dosed by weight, larger crates and beds, higher boarding rates.</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><div class="hl-emoji">🐩</div><strong>Small (&lt;25 lbs)</strong><span>$1,000–$2,500/yr</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🐕</div><strong>Medium (25–60 lbs)</strong><span>$1,500–$3,000/yr</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🐕‍🦺</div><strong>Large (60–100 lbs)</strong><span>$2,000–$4,000/yr</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🦮</div><strong>Giant (100+ lbs)</strong><span>$2,500–$5,000+/yr</span></div>
</div>
<h2 id="hidden">Hidden &amp; Surprise Costs</h2>
<ul>
  <li><strong>Emergency vet visits</strong> — A swallowed object, toxin ingestion, or injury can run $1,000–$5,000+ without pet insurance</li>
  <li><strong>Pet deposit / pet rent</strong> — Many rentals charge $300–$500 deposit plus $30–$75/month pet rent</li>
  <li><strong>Destroyed property</strong> — Puppies chew. Budget $100–$500 in year one for items they've ruined</li>
  <li><strong>Doggy daycare</strong> — If you work long hours, $25–$40/day adds up quickly</li>
  <li><strong>Dental cleanings</strong> — Professional dental cleaning under anesthesia costs $300–$800, needed every 1–3 years</li>
  <li><strong>Breed-specific health costs</strong> — Bulldogs/Pugs: breathing issues. Retrievers: hip dysplasia. Research your breed's known conditions.</li>
</ul>
<h2 id="budget">How to Budget</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Open a dedicated savings account</strong><br>Set aside $100–$200/month as your "dog fund." This covers routine costs and builds an emergency reserve.</div></li>
  <li><div class="step-content"><strong>Get pet insurance in year one</strong><br>Buy before your dog develops any conditions. Accident-and-illness plans cost $25–$65/month but can save thousands on a single emergency.</div></li>
  <li><div class="step-content"><strong>Keep a vet emergency fund</strong><br>Keep $1,000–$2,000 available exclusively for pet emergencies. Rebuild it after each use.</div></li>
</ol>
<div class="key-box"><strong>Bottom line:</strong> Budget $200–$350/month for a medium-sized dog in years 2+. More in year one, and more any year with a major health event. If that doesn't fit your budget today, waiting is a kindness to both you and the dog.</div>`,
    related: [
      {url:'/getting-a-dog/best-breeds-first-time-owners.html', title:'Best Breeds for First-Timers'},
      {url:'/getting-a-dog/adopt-vs-breeder.html', title:'Adopt vs. Buy From a Breeder'},
      {url:'/nutrition/daily-feeding-guide.html', title:'Daily Dog Feeding Guide'},
    ]
  },

  {
    slug: 'adopt-vs-breeder',
    title: 'Adopting vs. Buying From a Breeder',
    metaDesc: 'Adopt or buy? An honest side-by-side comparison of rescuing a dog vs. buying from a breeder — costs, pros, cons, and how to decide.',
    heroTag: 'Adoption & Breeders',
    heroBg: 'linear-gradient(135deg,#0f172a 0%,#134e4a 100%)',
    h1: 'Adopting vs. <span class="hl">Buying From a Breeder</span>',
    desc: "Both paths lead to wonderful dogs. Here's an honest look at what each option really means for you and the dog.",
    readTime: '8 min read',
    level: null,
    toc: [
      {id:'quick-compare', label:'Quick Comparison'},
      {id:'adoption', label:'Adopting a Dog'},
      {id:'breeder', label:'Buying From a Breeder'},
      {id:'cost', label:'Cost Comparison'},
      {id:'decide', label:'How to Decide'},
    ],
    body: `
<p class="ga-lede">The adopt-vs-buy debate generates a lot of emotion — but the honest answer is that both are valid choices. Both can go wonderfully or terribly depending on how you approach them. This guide skips the moralizing and gives you the real trade-offs so you can make the decision that's right for your life.</p>
<h2 id="quick-compare">Quick Comparison</h2>
<table class="ga-table">
  <thead><tr><th>Factor</th><th>Adoption</th><th>Reputable Breeder</th></tr></thead>
  <tbody>
    <tr><td>Cost</td><td>$50–$500</td><td>$800–$5,000+</td></tr>
    <tr><td>Age of dog</td><td>Often adult or adolescent</td><td>Usually 8-week puppy</td></tr>
    <tr><td>Known history</td><td>Often unknown</td><td>Full health/genetic history</td></tr>
    <tr><td>Health guarantees</td><td>Rarely</td><td>Yes (reputable breeders)</td></tr>
    <tr><td>Specific breed guaranteed</td><td>Hit or miss</td><td>Yes</td></tr>
    <tr><td>Wait time</td><td>Days to weeks</td><td>Weeks to 12+ months</td></tr>
  </tbody>
</table>
<h2 id="adoption">Adopting a Dog</h2>
<h3>The advantages</h3>
<ul>
  <li><strong>Much lower cost</strong> — shelters charge $50–$300, typically including spay/neuter, vaccines, and microchip</li>
  <li><strong>Adult dogs are often already house-trained</strong> — adopting a 2-year-old skips the puppy chaos phase</li>
  <li><strong>You can see their personality</strong> — adult dogs show you exactly who they are in the shelter</li>
  <li><strong>Saving a life</strong> — millions of dogs need homes; adoption directly addresses this</li>
</ul>
<h3>The honest challenges</h3>
<ul>
  <li><strong>Unknown history</strong> — many shelter dogs have unclear backgrounds; some have trauma</li>
  <li><strong>Potential behavioral issues</strong> — fear, reactivity, or resource guarding may emerge after adoption</li>
  <li><strong>Breed uncertainty</strong> — DNA tests on shelter "Lab mixes" often reveal 4+ breeds</li>
</ul>
<div class="tip-box"><strong>💡 Tip:</strong> Breed-specific rescues are a great middle ground. Search "[breed name] rescue [your state]" to find one and adopt a known breed while still rescuing.</div>
<h2 id="breeder">Buying From a Breeder</h2>
<h3>The advantages</h3>
<ul>
  <li><strong>Predictable traits</strong> — breed, size, coat, temperament, and energy level are known before you bring the dog home</li>
  <li><strong>Health-tested parents</strong> — responsible breeders screen for genetic conditions like hip dysplasia and heart disease</li>
  <li><strong>Early socialization</strong> — reputable breeders socialize pups from birth in home environments</li>
  <li><strong>Breeder support</strong> — a responsible breeder is a lifelong resource who will take the dog back if needed</li>
</ul>
<h3>The honest challenges</h3>
<ul>
  <li><strong>High cost</strong> — $1,500–$4,000 for most popular breeds; $3,000–$6,000 for French Bulldogs</li>
  <li><strong>Long waits</strong> — reputable breeders may have waitlists of 6–18 months</li>
  <li><strong>Scam risk</strong> — many "breeders" online are puppy mills or scammers. See our <a href="/getting-a-dog/find-reputable-breeder.html">guide to finding a reputable breeder</a>.</li>
</ul>
<h2 id="cost">Cost Over a Dog's Lifetime</h2>
<p>The acquisition cost gap narrows significantly over 12 years. An adopted dog at $200 vs. a breeder pup at $2,500 saves $2,300 upfront — but a health-tested breeder pup may have lower lifetime vet costs than a dog with unknown genetics. Over 12 years, total lifetime costs are often within $3,000–$5,000 of each other regardless of how you acquired the dog.</p>
<h2 id="decide">How to Decide</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Do you have a specific breed in mind?</strong><br>If yes, a reputable breeder is the reliable route. If you're open to the right dog regardless of breed, adoption gives you more options.</div></li>
  <li><div class="step-content"><strong>Can you handle the puppy phase?</strong><br>Puppies require 2 AM potty trips, bite inhibition training, and constant supervision for months. If that's not realistic, an adult rescue dog is often a better match.</div></li>
  <li><div class="step-content"><strong>What's your honest budget?</strong><br>If $2,000+ for a puppy is a stretch, adoption makes financial sense. The difference isn't about love — it's about starting your relationship without financial stress.</div></li>
</ol>
<div class="key-box"><strong>Key Takeaway:</strong> There's no morally superior choice here. A shelter dog and a dog from a reputable breeder both deserve equally loving homes. The question is which path gives you the best chance of a successful, happy relationship.</div>`,
    related: [
      {url:'/getting-a-dog/find-reputable-breeder.html', title:'How to Find a Reputable Breeder'},
      {url:'/getting-a-dog/best-breeds-first-time-owners.html', title:'Best Breeds for First-Timers'},
      {url:'/getting-a-dog/cost-of-owning-a-dog.html', title:'The Real Cost of Owning a Dog'},
    ]
  },

  {
    slug: 'find-reputable-breeder',
    title: 'How to Find a Reputable Breeder',
    metaDesc: 'How to find a responsible dog breeder and avoid puppy mills and scams. Questions to ask, red flags to spot, and where to search.',
    heroTag: 'Adoption & Breeders',
    heroBg: 'linear-gradient(135deg,#0f172a 0%,#134e4a 100%)',
    h1: 'How to Find a <span class="hl">Reputable Breeder</span>',
    desc: "Puppy mills and online scams look legitimate now. Here's exactly how to tell the difference and find a breeder you can trust.",
    readTime: '8 min read',
    level: null,
    toc: [
      {id:'red-flags', label:'Red Flags — Walk Away'},
      {id:'good-breeder', label:'What a Good Breeder Looks Like'},
      {id:'questions', label:'Questions to Ask'},
      {id:'where', label:'Where to Search'},
      {id:'process', label:'What to Expect'},
    ],
    body: `
<p class="ga-lede">The single biggest mistake puppy buyers make is choosing convenience over diligence. Puppy mills have perfected the art of looking like legitimate breeders online — professional websites, glowing reviews, "health guarantees" that mean nothing. Knowing the difference could mean the difference between 12 years of joy and $10,000 in vet bills for a genetically compromised dog.</p>
<h2 id="red-flags">Red Flags — Walk Away Immediately</h2>
<ul>
  <li><strong>Multiple breeds always available</strong> — responsible breeders specialize in one (occasionally two) breeds</li>
  <li><strong>"Puppies always available"</strong> — legitimate breeders have planned litters with waitlists, not constant supply</li>
  <li><strong>Won't let you visit</strong> — if they refuse to show you where the puppy was raised, walk away</li>
  <li><strong>No health testing documentation</strong> — good breeders test parents for genetic conditions and can show you results</li>
  <li><strong>Selling on Craigslist or Facebook Marketplace</strong> — most quality breeders don't need to advertise this way</li>
  <li><strong>Pushing wire transfer or Zelle</strong> — scammers want untraceable transfers; legitimate breeders accept normal payment</li>
  <li><strong>Ready to go at 5–6 weeks</strong> — puppies should not leave before 8 weeks minimum</li>
  <li><strong>Can't name or show you the parents</strong> — you should always be able to meet at least the mother</li>
</ul>
<div class="warning-box"><strong>⚠️ Scam Alert:</strong> A common scam involves beautiful puppy photos, a suspiciously low price, then a "shipping fee" that keeps growing. Never wire money for a puppy you haven't seen in person.</div>
<h2 id="good-breeder">What a Reputable Breeder Looks Like</h2>
<ul>
  <li>Specializes in one breed and knows it deeply — can discuss health issues, history, and temperament at length</li>
  <li>Performs OFA (hip/elbow), cardiac, eye, and other breed-relevant health tests on both parents</li>
  <li>Raises puppies inside the home (not in outdoor kennels) and handles them daily from birth</li>
  <li>Asks <em>you</em> as many questions as you ask them — they care where puppies go</li>
  <li>Has a written contract with a health guarantee and a return clause for the dog's entire life</li>
  <li>Provides AKC or other registry documentation for purebred dogs</li>
</ul>
<h2 id="questions">Questions to Ask a Breeder</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>"Can I see the health testing results for both parents?"</strong><br>Look for OFA clearances for hips, elbows, and breed-specific conditions. Results are publicly searchable at ofa.org.</div></li>
  <li><div class="step-content"><strong>"Can I visit and meet the puppy and its mother?"</strong><br>Always yes. Watch how the mother interacts — her temperament strongly predicts her puppies'.</div></li>
  <li><div class="step-content"><strong>"What does your contract include?"</strong><br>Look for a 2-year health guarantee for genetic conditions and a return clause requiring them to take the dog back if needed.</div></li>
  <li><div class="step-content"><strong>"How do you socialize your puppies?"</strong><br>Responsible breeders introduce puppies to sounds, surfaces, people, and gentle handling during the socialization window (3–8 weeks).</div></li>
  <li><div class="step-content"><strong>"How many litters per year does your female have?"</strong><br>One or two per year is typical. More is a red flag.</div></li>
</ol>
<h2 id="where">Where to Search</h2>
<ul>
  <li><strong>AKC Marketplace (akc.org/marketplace)</strong> — breeders who register litters and agree to AKC policies</li>
  <li><strong>National breed clubs</strong> — each AKC breed has a parent club with a breeder referral list. Search "[breed name] club of America breeder referral."</li>
  <li><strong>Dog shows</strong> — serious show exhibitors are almost always involved in health-focused breeding</li>
  <li><strong>Vet referrals</strong> — ask your local vet if they know breeders they trust</li>
  <li><strong>Word of mouth</strong> — a recommendation from a friend who has a happy, healthy dog from a specific breeder is the most reliable signal</li>
</ul>
<h2 id="process">What to Expect</h2>
<ul>
  <li><strong>Application/interview</strong> — many breeders have an application asking about your home, lifestyle, and experience</li>
  <li><strong>Waitlist</strong> — popular breeds can have waitlists of 6–18 months</li>
  <li><strong>Deposit</strong> — $200–$500 holds your spot; this is normal and legitimate</li>
  <li><strong>Pick-up at 8–10 weeks</strong> — puppies should leave with records, first vaccines, and a bag of their current food</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> If getting a puppy feels too easy, that's a warning sign. A reputable breeder will make you work a little — because they care where their puppies end up. The extra effort is absolutely worth it for the dog you'll live with for the next 12+ years.</div>`,
    related: [
      {url:'/getting-a-dog/adopt-vs-breeder.html', title:'Adopt vs. Buy From a Breeder'},
      {url:'/getting-a-dog/prepare-home-for-puppy.html', title:'Preparing Your Home for a Puppy'},
      {url:'/training/first-week-home.html', title:'First Week Home — Day by Day'},
    ]
  },

  {
    slug: 'prepare-home-for-puppy',
    title: 'Preparing Your Home for a Puppy',
    metaDesc: 'Complete puppy-proofing guide — what to buy, what to remove, and how to set up your home before your puppy arrives.',
    heroTag: 'Prepare Your Home',
    heroBg: 'linear-gradient(135deg,#0f172a 0%,#134e4a 100%)',
    h1: 'Preparing Your Home <span class="hl">for a Puppy</span>',
    desc: "Puppies explore everything with their mouths. An afternoon of prep prevents vet emergencies and a lot of stress.",
    readTime: '7 min read',
    level: 'Beginner',
    toc: [
      {id:'puppy-proof', label:'Room-by-Room Puppy-Proofing'},
      {id:'setup', label:'Essential Setup Before Arrival'},
      {id:'zones', label:'Creating a Puppy Zone'},
      {id:'dangerous', label:'Toxic Items to Remove'},
      {id:'day-one', label:'Day One Plan'},
    ],
    body: `
<p class="ga-lede">Bringing a puppy home without preparation is like bringing a toddler into a home with no baby gates. Puppies chew through cords, eat toxic plants, slip behind appliances, and fit through gaps you'd never expect. An afternoon of prep prevents injuries, emergency vet visits, and a lot of avoidable stress.</p>
<h2 id="puppy-proof">Room-by-Room Puppy-Proofing</h2>
<h3>Kitchen</h3>
<ul>
  <li>Secure cabinet doors under the sink — cleaning products are toxic</li>
  <li>Keep trash cans inside cabinets or use a locking lid</li>
  <li>Keep dishwasher closed — knives are at nose height</li>
  <li>Move food off low shelves and counters</li>
</ul>
<h3>Living Room</h3>
<ul>
  <li>Bundle and conceal electrical cords or use cord protectors</li>
  <li>Move houseplants — many are toxic to dogs</li>
  <li>Block access behind TV stands where cords concentrate</li>
  <li>Pick up small objects (coins, remotes, children's toys) — choking hazards</li>
</ul>
<h3>Bathrooms</h3>
<ul>
  <li>Keep toilet lids down — small dogs can fall in; all dogs drink from toilets</li>
  <li>Lock medication cabinets — human medications cause most dog poisonings</li>
  <li>Move razors and dental floss off accessible surfaces</li>
</ul>
<h3>Garage &amp; Outdoors</h3>
<ul>
  <li>Lock antifreeze completely away — it tastes sweet and is deadly in tiny amounts</li>
  <li>Check fencing for gaps at ground level; puppies squeeze through surprisingly small holes</li>
  <li>Remove garden chemicals, fertilizers, and pesticides from accessible areas</li>
</ul>
<h2 id="setup">Essential Setup Before Arrival</h2>
<ul>
  <li><strong>Crate</strong> — puppy should stand, turn around, and lie down, but not much more (too large = harder to house-train)</li>
  <li><strong>X-pen or baby gate</strong> — to create a confined safe zone</li>
  <li><strong>Non-tip water bowl</strong> — stainless steel is easiest to clean</li>
  <li><strong>Food</strong> — get a bag of whatever they've been eating (ask the breeder/shelter) to prevent stomach upset from sudden food change</li>
  <li><strong>Dog bed or crate blanket</strong> — a blanket with the mother's scent (ask the breeder) helps the first night</li>
  <li><strong>Collar + ID tag</strong> — fitted with your phone number from day one, before they ever go outside</li>
  <li><strong>6-foot leash</strong> — for early walks and training</li>
  <li><strong>Enzymatic cleaner (Nature's Miracle)</strong> — eliminates potty-spot scent so they don't re-mark</li>
</ul>
<h2 id="zones">Creating a Puppy Zone</h2>
<p>Don't give a new puppy free run of the house immediately. Limit their space to one room or gated area for the first few weeks. This speeds house-training (they can't wander to a distant room to potty) and reduces the number of things they can destroy unsupervised.</p>
<p>The puppy zone should have: open crate, fresh water, a clear exit route to their outdoor potty spot, and a few toys. Gradually expand their access as they earn trust.</p>
<div class="tip-box"><strong>💡 Tip:</strong> A baby monitor near the crate lets you hear the puppy whine without physically checking every 20 minutes. You'll respond faster and at the right times, which speeds overnight training.</div>
<h2 id="dangerous">Toxic Plants &amp; Foods to Remove</h2>
<ul>
  <li>🌿 Sago palm — highly toxic, can cause liver failure</li>
  <li>🌸 Azalea, rhododendron, oleander</li>
  <li>🌱 Pothos, philodendron, dieffenbachia — common houseplants, all toxic</li>
  <li>🍇 Grapes and raisins — any amount can cause kidney failure</li>
  <li>🧅 Onion, garlic, chives — all forms, especially concentrated</li>
  <li>🍫 Chocolate — all types; dark chocolate is most dangerous</li>
  <li>💊 Xylitol — in sugar-free gum, some peanut butters, baked goods — extremely toxic</li>
</ul>
<h2 id="day-one">Day One Plan</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Potty spot first, then inside</strong><br>Before bringing the puppy in, take them straight to the designated outdoor potty spot. They've been in a car and will need to go.</div></li>
  <li><div class="step-content"><strong>Introduce the crate immediately — positively</strong><br>Toss treats inside, let them explore on their own. Don't force them in. A positive first impression lasts.</div></li>
  <li><div class="step-content"><strong>Limit visitors for the first 48 hours</strong><br>Overstimulation in the first two days increases anxiety. Let them settle with just immediate family.</div></li>
  <li><div class="step-content"><strong>Start the routine immediately</strong><br>Set feeding times, potty times, and nap times. The earlier the routine is established, the faster house-training goes.</div></li>
</ol>
<div class="key-box"><strong>Key Takeaway:</strong> Preparation pays dividends for months. A well-set-up space leads to faster house-training, fewer accidents, and a calmer start to what will be a 12+ year relationship.</div>`,
    related: [
      {url:'/getting-a-dog/new-puppy-checklist.html', title:'New Puppy Checklist'},
      {url:'/training/potty-training.html', title:'Potty Training Your Puppy'},
      {url:'/training/crate-training.html', title:'Crate Training Step by Step'},
    ]
  },

  {
    slug: 'new-puppy-checklist',
    title: 'New Puppy Checklist — Everything You Need',
    metaDesc: 'Complete new puppy supply checklist. Everything to buy before your puppy comes home — crate, food, collar, enzymatic cleaner, and more.',
    heroTag: 'Prepare Your Home',
    heroBg: 'linear-gradient(135deg,#0f172a 0%,#134e4a 100%)',
    h1: 'New Puppy Checklist — <span class="hl">Everything You Need</span>',
    desc: "A complete, organized list of what to buy before your puppy comes home — with honest notes on what to skip.",
    readTime: '6 min read',
    level: 'Beginner',
    toc: [
      {id:'sleeping', label:'Sleeping & Confinement'},
      {id:'feeding', label:'Feeding Essentials'},
      {id:'potty', label:'Potty Training Supplies'},
      {id:'health', label:'Health & Safety'},
      {id:'training', label:'Training & Enrichment'},
      {id:'skip', label:'Things You Can Skip'},
    ],
    body: `
<p class="ga-lede">It's easy to spend $500 on things your puppy will never use. This checklist focuses on what actually matters — organized by category, with notes on what to buy vs. what to skip. Start with the essentials and let your dog's personality guide the rest.</p>
<h2 id="sleeping">Sleeping &amp; Confinement ✅ Essential</h2>
<ul>
  <li><strong>Wire crate (appropriately sized)</strong> — Get one with a divider so you can reduce space as they grow. Medium dogs: 36-inch. Large breeds: 42–48 inch. Too big = puppy potties in unused space.</li>
  <li><strong>Washable crate pad or blanket</strong> — A blanket from their litter (if the breeder provides one) helps the first few nights.</li>
  <li><strong>X-pen / exercise pen</strong> — Creates a safe zone in one room when you can't directly supervise. 36-inch height works for most breeds under 50 lbs.</li>
  <li><strong>Baby gate(s)</strong> — Block off rooms and staircases during the housetraining period.</li>
</ul>
<h2 id="feeding">Feeding Essentials ✅ Essential</h2>
<ul>
  <li><strong>Stainless steel food and water bowls</strong> — Non-tip design helps. Avoid plastic (it harbors bacteria in scratches).</li>
  <li><strong>Puppy food — same brand as they've been eating</strong> — Ask your breeder or shelter what they've been feeding. Switching food immediately causes diarrhea. Transition gradually over 7 days.</li>
  <li><strong>Measuring cup</strong> — Feeding by volume is important. Eyeballing leads to overfeeding.</li>
</ul>
<h2 id="potty">Potty Training Supplies ✅ Essential</h2>
<ul>
  <li><strong>Enzymatic cleaner (Nature's Miracle or similar)</strong> — Non-negotiable. Regular cleaners don't break down the scent molecules that tell a puppy "this is a potty spot." Buy a large bottle.</li>
  <li><strong>Paper towels in bulk</strong> — Accidents happen multiple times a day in the first weeks.</li>
  <li><strong>Puppy pads (optional)</strong> — Only if you're using them long-term for apartment training. If you're doing outdoor training, skip them — they often create confusion.</li>
</ul>
<h2 id="health">Health &amp; Safety ✅ Essential</h2>
<ul>
  <li><strong>Flat collar + ID tag</strong> — Have the tag made with your phone number before the puppy comes home. Every day without one is a day they could get lost unidentified.</li>
  <li><strong>4–6 foot leash</strong> — A standard leash for early training. Avoid retractable leashes for puppies — they teach pulling.</li>
  <li><strong>Harness (recommended for small breeds)</strong> — Small breeds with delicate tracheas benefit from a harness to avoid collar pressure on their neck.</li>
  <li><strong>First vet appointment booked</strong> — Schedule within 48–72 hours. Most breeder contracts require a vet check within 72 hours to validate the health guarantee.</li>
</ul>
<div class="warning-box"><strong>⚠️ Until fully vaccinated (typically 16 weeks):</strong> Limit exposure to unknown dogs and public areas where unvaccinated dogs may have been. Parvovirus can survive in soil for over a year.</div>
<h2 id="training">Training &amp; Enrichment ✅ Worth Having</h2>
<ul>
  <li><strong>Small, soft training treats</strong> — Pea-sized, smelly, single-ingredient (freeze-dried chicken or beef). Avoid hard crunchy treats for puppies under 12 weeks.</li>
  <li><strong>Treat pouch / bait bag</strong> — Clips to your waist, keeps treats accessible during training. Dramatically improves training efficiency.</li>
  <li><strong>2–3 chew toys</strong> — Bully sticks, KONG rubber toys, Nylabone-style chews. Have them ready before day one so you're redirecting, not reacting.</li>
  <li><strong>KONG stuffable toy</strong> — A frozen stuffed KONG is one of the most useful tools for crate training. Buy one before the puppy arrives.</li>
  <li><strong>1–2 plush toys</strong> — Fine for supervised play. Most puppies destroy them quickly.</li>
</ul>
<h2 id="skip">Things You Can Skip (For Now)</h2>
<ul>
  <li><strong>Expensive dog bed</strong> — Wait until past the destructive chewing phase (~12–18 months)</li>
  <li><strong>Full grooming kit</strong> — A basic brush is enough to start; full kit can wait</li>
  <li><strong>Automatic feeder</strong> — Manual feeding monitors intake and reinforces your role as provider</li>
  <li><strong>GPS collar</strong> — Nice eventually, but not day one</li>
  <li><strong>Dog clothes</strong> — Functional for tiny dogs in cold climates; otherwise skippable</li>
</ul>
<div class="key-box"><strong>Total essential cost estimate:</strong> $150–$300, not including food or the puppy itself. Most expensive optional items can wait until you've lived with your puppy for a few weeks and know what you actually need.</div>`,
    related: [
      {url:'/getting-a-dog/prepare-home-for-puppy.html', title:'Preparing Your Home for a Puppy'},
      {url:'/training/potty-training.html', title:'Potty Training Your Puppy'},
      {url:'/training/crate-training.html', title:'Crate Training Step by Step'},
    ]
  }
];

const OUT_DIR = path.join(__dirname, 'getting-a-dog');
GUIDES.forEach(g => {
  const cfg = { ...g, category: 'getting-a-dog', categoryLabel: 'Getting a Dog' };
  const html = page(cfg);
  const fp = path.join(OUT_DIR, g.slug + '.html');
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Created:', fp);
});
console.log('Done: Getting a Dog guides');
