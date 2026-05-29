// gen_guides_grooming.js — generates 12 Grooming guide pages
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'grooming');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const BG = 'linear-gradient(135deg,#0f172a 0%,#1f1a3a 100%)';

function nav() {
  return `<nav class="navbar" id="navbar">
  <div class="nav-container">
    <a href="/index.html" class="nav-logo">
      <span class="logo-paw">🐾</span>
      <span class="logo-text">AllDog<span class="logo-accent">Facts</span></span>
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="/index.html">Home</a></li>
      <li><a href="/breeds/index.html">Dog Breeds</a></li>
      <li><a href="/getting-a-dog/index.html">Getting a Dog</a></li>
      <li><a href="/training/index.html">Training</a></li>
      <li><a href="/health/index.html">Health</a></li>
      <li><a href="/nutrition/index.html">Nutrition</a></li>
      <li><a href="/grooming/index.html" style="color:var(--teal)">Grooming</a></li>
    </ul>
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
      <div class="footer-col">
        <h4>Grooming Guides</h4>
        <ul>
          <li><a href="/grooming/how-often-bathe-dog.html">How Often to Bathe</a></li>
          <li><a href="/grooming/trim-dog-nails.html">Trim Dog Nails</a></li>
          <li><a href="/grooming/how-to-brush-dog.html">How to Brush</a></li>
          <li><a href="/grooming/managing-shedding.html">Managing Shedding</a></li>
          <li><a href="/grooming/index.html">All Guides →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>More Topics</h4>
        <ul>
          <li><a href="/health/index.html">Dog Health</a></li>
          <li><a href="/training/index.html">Training</a></li>
          <li><a href="/nutrition/index.html">Nutrition</a></li>
          <li><a href="/breeds/index.html">Dog Breeds</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 AllDogFacts — The Complete Dog Encyclopedia. All rights reserved.</p>
    </div>
  </div>
</footer>`;
}

function page(cfg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${cfg.title} | AllDogFacts</title>
  <meta name="description" content="${cfg.desc}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../css/styles.css"/>
  <link rel="stylesheet" href="../css/guide-article.css"/>
</head>
<body>
${nav()}
<section class="ga-hero" style="background:${BG}">
  <div class="container">
    <div class="ga-breadcrumb"><a href="/index.html">Home</a> › <a href="/grooming/index.html">Grooming</a> › ${cfg.crumb}</div>
    <div class="ga-hero-tag">${cfg.tag}</div>
    <h1>${cfg.h1}</h1>
    <p class="ga-hero-desc">${cfg.desc}</p>
    <div class="ga-meta">${cfg.meta}</div>
  </div>
</section>
<div class="ga-wrap">
  <div class="ga-layout">
    <main class="ga-main">
      ${cfg.body}
    </main>
    <aside class="ga-sidebar">
      <div class="ga-scard">
        <h3>On This Page</h3>
        <ul class="toc-list">${cfg.toc}</ul>
      </div>
      <div class="ga-scard">
        <h3>Related Guides</h3>
        <ul class="ga-related-list">${cfg.related}</ul>
      </div>
    </aside>
  </div>
</div>
${footer()}
<script src="../js/main.js"></script>
</body>
</html>`;
}

const GUIDES = [

// ─── 1. HOW OFTEN TO BATHE ────────────────────────────────────────────────
{
  file: 'how-often-bathe-dog.html',
  title: 'How Often Should You Bathe Your Dog?',
  crumb: 'How Often to Bathe',
  tag: '🛁 Bathing Basics',
  h1: 'How Often Should You Bathe Your Dog?',
  desc: 'Bathing frequency by coat type, breed, and lifestyle — with signs your dog needs a bath now and why overbathing is a real problem.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#bycoat">Frequency by Coat Type</a></li>
        <li><a href="#signs">Signs It's Bath Time</a></li>
        <li><a href="#tooften">Dangers of Overbathing</a></li>
        <li><a href="#between">Between-Bath Freshening</a></li>
        <li><a href="#tips">Bath Time Tips</a></li>`,
  related: `<li><a href="best-dog-shampoos.html">Best Dog Shampoos</a></li>
            <li><a href="bathing-anxious-dog.html">Bathing an Anxious Dog</a></li>
            <li><a href="managing-shedding.html">Managing Shedding</a></li>`,
  body: `
<p class="ga-lede">There's no universal answer — bathing frequency depends on coat type, activity level, skin conditions, and whether your dog has been rolling in something. Here's a framework that works for every breed.</p>

<h2 id="bycoat">Bathing Frequency by Coat Type</h2>
<table class="ga-table">
  <thead><tr><th>Coat Type</th><th>Breeds</th><th>Recommended Frequency</th></tr></thead>
  <tbody>
    <tr><td>Short, smooth coat</td><td>Beagle, Boxer, Dalmatian, Weimaraner</td><td>Every 6–8 weeks or when dirty</td></tr>
    <tr><td>Double coat (heavy shedder)</td><td>Lab, Husky, Corgi, German Shepherd</td><td>Every 4–6 weeks; more during shedding season</td></tr>
    <tr><td>Long, silky coat</td><td>Maltese, Yorkie, Afghan Hound, Shih Tzu</td><td>Every 2–4 weeks to prevent mats</td></tr>
    <tr><td>Wire/rough coat</td><td>Airedale, Schnauzer, Jack Russell</td><td>Every 6–8 weeks; hand-stripping instead of bathing for show dogs</td></tr>
    <tr><td>Curly/wavy coat</td><td>Poodle, Bichon, Labradoodle, Portuguese Water Dog</td><td>Every 3–4 weeks; coats mat quickly without regular cleaning</td></tr>
    <tr><td>Very short, wrinkled skin</td><td>Bulldog, Pug, Shar-Pei</td><td>Every 3–4 weeks; clean skin folds weekly with damp cloth</td></tr>
    <tr><td>Hairless</td><td>Xoloitzcuintli, Chinese Crested</td><td>Every 1–2 weeks; skin needs cleaning and moisturizing</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Lifestyle modifier:</strong> An indoor dog on a clean carpet needs bathing half as often as a dog who swims, hikes, or plays in mud daily. Adjust frequency to your dog's actual life, not just their breed average.</div>

<h2 id="signs">Signs It's Bath Time Right Now</h2>
<ul>
  <li>You can smell them from across the room</li>
  <li>Their coat feels greasy or sticky to the touch</li>
  <li>They've rolled in something (grass, dead animal, mud)</li>
  <li>They've had any contact with unknown dogs (kennel, dog park) — reduce allergen and pathogen transfer</li>
  <li>You notice excessive scratching not explained by other causes</li>
  <li>Their coat appears dull or clumping</li>
</ul>

<h2 id="tooften">The Problem with Overbathing</h2>
<p>Dogs have a natural protective layer of oils on their skin and coat. Bathing too frequently strips these oils, leading to:</p>
<ul>
  <li>Dry, flaky skin and dandruff</li>
  <li>Dull, brittle coat</li>
  <li>Increased itching and scratching</li>
  <li>Potential for secondary skin infections as the skin barrier weakens</li>
</ul>
<p>Using human shampoo makes this worse — human skin is acidic (pH 5.5), dog skin is more neutral (pH 7.5). Human shampoo disrupts the dog's natural skin barrier even faster. Always use dog-specific shampoo.</p>
<div class="warning-box"><strong>Dogs with skin conditions</strong> (allergies, yeast infections, seborrhea) may need medicated baths more frequently — but always follow your vet's protocol, not general guidelines.</div>

<h2 id="between">Between-Bath Freshening</h2>
<p>To keep your dog smelling fresh between full baths:</p>
<ul>
  <li><strong>Dry shampoo</strong> — spray-on or powder formulas that absorb oils; safe for between washes</li>
  <li><strong>Pet wipes</strong> — unscented, fragrance-free wipes for paws, face, and body after outdoor time</li>
  <li><strong>Baking soda</strong> — sprinkle lightly on coat, work in, brush out; natural odor absorber</li>
  <li><strong>Regular brushing</strong> — removes dirt, distributes oils, keeps coat fresher between baths</li>
</ul>

<h2 id="tips">Practical Bath Time Tips</h2>
<ol class="step-list">
  <li>Brush thoroughly before bathing — wet mats become impossible to remove</li>
  <li>Use lukewarm water — not too hot; test on your wrist first</li>
  <li>Wet the coat thoroughly before applying shampoo</li>
  <li>Work shampoo from neck to tail, avoiding eyes and ears</li>
  <li>Rinse completely — leftover shampoo causes skin irritation and dandruff</li>
  <li>Towel dry then blow-dry on low heat if coat is thick — damp undercoat encourages "hot spots"</li>
  <li>Reward generously throughout and after — builds positive association</li>
</ol>
`
},

// ─── 2. BEST DOG SHAMPOOS ─────────────────────────────────────────────────
{
  file: 'best-dog-shampoos.html',
  title: 'Best Dog Shampoos — What to Use for Every Coat Type',
  crumb: 'Best Dog Shampoos',
  tag: '🧴 Shampoo Guide',
  h1: 'Best Dog Shampoos — Choosing the Right One for Your Dog',
  desc: 'How to read dog shampoo labels, the best formulas for sensitive skin, puppies, shedding, and smelly dogs — and why human shampoo is always the wrong choice.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#why">Why Dog-Specific Shampoo Matters</a></li>
        <li><a href="#types">Shampoo Types by Need</a></li>
        <li><a href="#ingredients">Ingredients to Avoid</a></li>
        <li><a href="#puppies">Shampoo for Puppies</a></li>
        <li><a href="#medicated">Medicated Shampoos</a></li>`,
  related: `<li><a href="how-often-bathe-dog.html">How Often to Bathe</a></li>
            <li><a href="bathing-anxious-dog.html">Bathing an Anxious Dog</a></li>
            <li><a href="managing-shedding.html">Managing Shedding</a></li>`,
  body: `
<p class="ga-lede">A dog shampoo aisle has hundreds of options, each claiming to be the best. Most of them are fine. A few are excellent. Some are actually harmful. Here's how to tell the difference.</p>

<h2 id="why">Why Dog-Specific Shampoo Matters</h2>
<p>Human skin has a pH of about 5.5 (acidic). Dog skin has a pH of about 7.5 (near neutral). Human shampoos are formulated for the lower human pH. Using them on dogs strips the protective acid mantle on dog skin, disrupts the skin barrier, and causes dryness, irritation, and vulnerability to infection — even after just a few uses.</p>
<p>Human baby shampoo is also not ideal for dogs despite being "mild" — it's still the wrong pH. Use a dog-specific formula for every bath.</p>

<h2 id="types">Shampoo Types by Need</h2>
<table class="ga-table">
  <thead><tr><th>Type</th><th>Best For</th><th>What to Look For</th></tr></thead>
  <tbody>
    <tr><td>General purpose</td><td>Healthy dogs without skin issues</td><td>Gentle surfactants, natural fragrance, moisturizing</td></tr>
    <tr><td>Sensitive/hypoallergenic</td><td>Itchy dogs, allergy-prone breeds</td><td>Fragrance-free, minimal ingredients, oatmeal-based</td></tr>
    <tr><td>Deshedding shampoo</td><td>Heavy shedding breeds during blow-out season</td><td>Omega-3 enriched, coat-loosening agents; use with deshedding brush</td></tr>
    <tr><td>Whitening/brightening</td><td>White or light-colored dogs</td><td>Optical brighteners; avoid bleach-based products</td></tr>
    <tr><td>Deodorizing</td><td>Smelly dogs, after skunk or outdoor exposure</td><td>Enzyme-based deodorizers, not just masking fragrances</td></tr>
    <tr><td>Waterless/dry shampoo</td><td>Between-bath freshening, water-averse dogs</td><td>Spray or foam; no rinse required</td></tr>
    <tr><td>Flea & tick shampoo</td><td>Active flea infestation</td><td>Kills on contact only — not a prevention tool</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Top-rated vet-recommended shampoos</strong> include Virbac Epi-Soothe (sensitive skin), Burt's Bees Hypoallergenic, Chris Christensen White Ice (white coats), and Furminator deShedding shampoo. These aren't sponsored recommendations — they just come up consistently in vet dermatology practices.</div>

<h2 id="ingredients">Ingredients to Avoid</h2>
<ul>
  <li><strong>Artificial fragrances / parfum</strong> — one of the most common causes of skin reactions in dogs; choose fragrance-free or naturally scented</li>
  <li><strong>Parabens (methylparaben, propylparaben)</strong> — preservatives linked to skin sensitization; look for paraben-free formulas</li>
  <li><strong>Sodium lauryl sulfate (SLS)</strong> — harsh surfactant that strips skin oils; sodium laureth sulfate (SLES) is milder</li>
  <li><strong>Propylene glycol (in some formulas)</strong> — can be irritating to sensitive skin</li>
  <li><strong>Permethrin</strong> — safe for dogs, extremely toxic to cats; keep any permethrin product away from cats</li>
  <li><strong>Tea tree oil (undiluted)</strong> — toxic to dogs in concentrated amounts; if present in a shampoo, it should be <0.1% dilution</li>
</ul>

<h2 id="puppies">Shampoo for Puppies</h2>
<p>Puppies have thinner, more sensitive skin than adults. Use a shampoo specifically labeled for puppies or "extra gentle." Key features: tear-free formula (eyes are at bath height), no harsh fragrances, and gentle surfactants. Johnson's Baby Shampoo is often mentioned but it's still not pH-correct for dogs — use a dog puppy shampoo instead.</p>
<div class="key-box"><strong>How often for puppies:</strong> No more than once a month before 6 weeks old (and only if truly necessary). From 8 weeks: monthly or when dirty. Their skin oil regulation is not fully mature.</div>

<h2 id="medicated">Medicated Shampoos</h2>
<p>Medicated shampoos require a diagnosis before use — using the wrong medicated shampoo can worsen a skin condition. Common types:</p>
<ul>
  <li><strong>Chlorhexidine-based</strong> — antifungal and antibacterial; for dogs with recurring skin infections, hot spots, or pyoderma; most common vet prescription</li>
  <li><strong>Ketoconazole-based</strong> — specifically antifungal; for yeast overgrowth (Malassezia), especially in skin folds and ear canals</li>
  <li><strong>Benzoyl peroxide</strong> — degreasing; for seborrhea (oily/scaly skin); very drying — use only when prescribed</li>
  <li><strong>Selenium sulfide</strong> — for seborrheic conditions; use strictly as directed; toxic if ingested</li>
</ul>
`
},

// ─── 3. BATHING ANXIOUS DOG ────────────────────────────────────────────────
{
  file: 'bathing-anxious-dog.html',
  title: 'How to Bathe an Anxious or Fearful Dog',
  crumb: 'Bathing an Anxious Dog',
  tag: '😰 Anxiety & Bathing',
  h1: 'How to Bathe an Anxious or Fearful Dog',
  desc: 'Step-by-step desensitization for dogs who hate baths — from fear of water to refusing the tub. Includes calming strategies and tools that actually help.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#why">Why Dogs Fear Baths</a></li>
        <li><a href="#desensitize">Desensitization Steps</a></li>
        <li><a href="#tools">Tools That Help</a></li>
        <li><a href="#during">During the Bath</a></li>
        <li><a href="#groomer">When to Use a Groomer</a></li>`,
  related: `<li><a href="how-often-bathe-dog.html">How Often to Bathe</a></li>
            <li><a href="best-dog-shampoos.html">Best Dog Shampoos</a></li>
            <li><a href="/training/separation-anxiety.html">Separation Anxiety Guide</a></li>`,
  body: `
<p class="ga-lede">For some dogs, bath time is genuinely traumatic — not just dramatic. The good news: fear of bathing is highly treatable with the right approach. Here's how to go from a dog who bolts at the sight of a towel to one who calmly tolerates baths.</p>

<h2 id="why">Why Dogs Fear Baths</h2>
<p>Bath fear usually stems from one or more of these:</p>
<ul>
  <li><strong>Slippery surface</strong> — a smooth tub or sink is terrifying for a dog who can't get footing; they feel out of control</li>
  <li><strong>Water pressure</strong> — a forceful shower can feel overwhelming; dogs prefer gentler flows</li>
  <li><strong>Temperature shock</strong> — water that's too cold or too hot creates an aversive memory</li>
  <li><strong>Restraint</strong> — being held down (even gently) triggers panic in anxious dogs</li>
  <li><strong>Past bad experience</strong> — one very stressful bath is enough to create lasting fear</li>
  <li><strong>Sounds</strong> — running water, the drain gurgling, or the echo in an enclosed space</li>
</ul>

<h2 id="desensitize">Desensitization — The Step-by-Step Process</h2>
<p>This takes days to weeks but creates permanent comfort. Don't skip steps. Each step should be comfortable before moving to the next.</p>
<ol class="step-list">
  <li><strong>Just be near the tub:</strong> Bring your dog near the (dry, empty) tub. Treats. Leave. Repeat 5 times. Goal: tub = good things appear.</li>
  <li><strong>Touch the tub:</strong> Let your dog sniff the tub, put paws on the edge. Treats throughout. Never force entry.</li>
  <li><strong>Step into the empty tub:</strong> Lure in with treats. Let them step in and right back out. Many sessions. Build duration slowly.</li>
  <li><strong>Add a non-slip mat:</strong> Put a rubber mat in the tub. This alone dramatically reduces fear — stable footing changes everything.</li>
  <li><strong>Add a small amount of lukewarm water:</strong> Just enough to cover paws. Treats, praise, keep it positive, exit immediately after.</li>
  <li><strong>Add body wetting:</strong> Use a cup to pour water over the back. Not the face or head yet. Treats continuously.</li>
  <li><strong>Full bath with minimal shampoo:</strong> Keep it short. Exit before the dog shows stress. Jackpot treat afterward (something extraordinary).</li>
</ol>
<div class="tip-box"><strong>Licki mat trick:</strong> Stick a licki mat (smeared with peanut butter or wet food) to the tub wall at nose height. A dog focused on licking is a dog not panicking — and they're creating a positive association simultaneously.</div>

<h2 id="tools">Tools That Actually Help</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Non-Slip Mat</strong><p>The single biggest fear-reducer. A rubber bath mat with suction cups gives your dog confidence to stand still.</p></div>
  <div class="ga-hl-card"><strong>Detachable Shower Head</strong><p>Control the water flow and direction. A gentle spray aimed at the coat (not the face) is far less stressful than a fixed overhead shower.</p></div>
  <div class="ga-hl-card"><strong>Licki Mat</strong><p>A silicone mat with ridges — spread peanut butter or wet food. Stick to the wall, the side of the tub, or hold it yourself.</p></div>
  <div class="ga-hl-card"><strong>Calming Treats</strong><p>Zylkene (casein-based), CBD treats (with vet approval), or L-theanine chews 30–60 min before bath time can take the edge off. Not a substitute for desensitization.</p></div>
</div>

<h2 id="during">Keeping Calm During the Bath</h2>
<ul>
  <li><strong>Your energy matters:</strong> Dogs read anxiety. If you're tense expecting a fight, they feel it. Stay slow and calm.</li>
  <li><strong>Talk softly and continuously:</strong> Your voice is reassuring — keep up a steady calm monologue</li>
  <li><strong>Never scruff or forcibly hold down:</strong> This confirms their worst fears and makes next time harder</li>
  <li><strong>Keep it short:</strong> 3 minutes well-done beats 10 minutes of struggle. Speed matters more than thoroughness</li>
  <li><strong>Avoid the face:</strong> Wipe face with a damp cloth instead of rinsing; water on the face is the most aversive part</li>
  <li><strong>End before they melt down:</strong> If you can tell they're near their threshold, end the session on a good note — don't push until breakdown</li>
</ul>

<h2 id="groomer">When a Professional Groomer Is the Better Choice</h2>
<p>If your dog's bath anxiety is causing severe panic, self-injury (from scrambling), or makes bathing genuinely impossible — a professional groomer has equipment, restraint systems, and techniques you don't have at home. Look for groomers who:</p>
<ul>
  <li>Use a "fear-free" approach and are familiar with anxiety-reduction techniques</li>
  <li>Will do a short consultation bath before committing to a full groom</li>
  <li>Are willing to work with you on a desensitization plan over multiple visits</li>
</ul>
<p>In extreme cases, your vet can prescribe a mild sedative (trazodone, gabapentin) for bathing sessions while the desensitization program progresses. This isn't "cheating" — it prevents traumatic experiences from entrenching the fear further.</p>
`
},

// ─── 4. HOW TO BRUSH A DOG ────────────────────────────────────────────────
{
  file: 'how-to-brush-dog.html',
  title: 'How to Brush Your Dog — Tools and Technique by Coat Type',
  crumb: 'How to Brush Your Dog',
  tag: '🪮 Brushing Guide',
  h1: 'How to Brush Your Dog — Tools and Technique by Coat Type',
  desc: 'The right brush for every coat type, how to brush without causing pain, dealing with mats, and how often each coat type needs brushing.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#tools">Brushes by Coat Type</a></li>
        <li><a href="#technique">Brushing Technique</a></li>
        <li><a href="#frequency">How Often to Brush</a></li>
        <li><a href="#mats">Dealing with Mats</a></li>
        <li><a href="#benefits">Benefits Beyond Coat</a></li>`,
  related: `<li><a href="managing-shedding.html">Managing Shedding</a></li>
            <li><a href="how-often-bathe-dog.html">How Often to Bathe</a></li>
            <li><a href="dog-haircut-schedule.html">Haircut Schedule</a></li>`,
  body: `
<p class="ga-lede">Using the wrong brush is as useless as not brushing at all — and some brushes can hurt your dog. Here's exactly what to use for your dog's coat and how to do it without turning grooming into a battle.</p>

<h2 id="tools">The Right Brush for Every Coat Type</h2>
<table class="ga-table">
  <thead><tr><th>Coat Type</th><th>Primary Tool</th><th>Secondary Tool</th></tr></thead>
  <tbody>
    <tr><td>Short, smooth (Beagle, Boxer)</td><td>Rubber curry comb or grooming glove</td><td>Soft bristle brush for finishing</td></tr>
    <tr><td>Double coat, dense (Lab, Husky, Corgi)</td><td>Slicker brush (weekly) + deshedding undercoat rake</td><td>Steel comb for finishing, especially neck and ruff</td></tr>
    <tr><td>Long, silky (Maltese, Yorkie, Shih Tzu)</td><td>Pin brush (gentle) + wide-tooth comb</td><td>Detangling spray; dematting comb for knots</td></tr>
    <tr><td>Wire/rough coat (Schnauzer, Airedale)</td><td>Slicker brush + metal comb</td><td>Stripping knife for show coats (not for clipped pets)</td></tr>
    <tr><td>Curly (Poodle, Bichon, Doodles)</td><td>Slicker brush + wide-tooth comb</td><td>Dematting comb; mats form fast in these coats</td></tr>
    <tr><td>Wavy (Golden Retriever, Spaniel)</td><td>Slicker brush + metal comb</td><td>Deshedding tool during shedding season</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Slicker brush tip:</strong> A good slicker brush should have fine, short wire pins with bent tips. If it scratches your arm, it'll hurt your dog. Use light pressure — the weight of the brush, not added force, does the work.</div>

<h2 id="technique">Brushing Technique That Doesn't Hurt</h2>
<ol class="step-list">
  <li><strong>Start with a once-over by hand:</strong> Pet your dog all over, feeling for knots, mats, burrs, or sensitive areas before introducing tools</li>
  <li><strong>Section the coat:</strong> For long-coated dogs, work in sections; lift a small section with one hand and brush from the roots outward with the other</li>
  <li><strong>Brush with the grain:</strong> Always brush in the direction of hair growth, except for the undercoat where you work slightly against growth to pull out loose fur</li>
  <li><strong>Use the "line brushing" method for thick coats:</strong> Part the fur and brush from skin outward in layers; this ensures you're getting through the full depth, not just the surface</li>
  <li><strong>Be gentle around sensitive areas:</strong> Face, ears, armpits, groin, and paws — use a soft-bristle brush or your fingers in these zones</li>
  <li><strong>Follow with a comb:</strong> Run a metal comb through areas you've brushed; if it snags, you missed a mat with the brush</li>
</ol>

<h2 id="frequency">How Often Each Coat Type Needs Brushing</h2>
<table class="ga-table">
  <thead><tr><th>Coat Type</th><th>Minimum Frequency</th><th>During Shedding Season</th></tr></thead>
  <tbody>
    <tr><td>Short, smooth</td><td>Weekly</td><td>2–3 times per week</td></tr>
    <tr><td>Double coat, dense</td><td>2–3 times per week</td><td>Daily (blown coat produces massive volume)</td></tr>
    <tr><td>Long, silky</td><td>Daily</td><td>Daily (mats form within 24–48 hours)</td></tr>
    <tr><td>Wire/rough coat</td><td>Weekly</td><td>2–3 times per week</td></tr>
    <tr><td>Curly coat</td><td>Every 2–3 days</td><td>Every 2–3 days (curly coats trap shed fur, causing mats)</td></tr>
    <tr><td>Wavy coat</td><td>2–3 times per week</td><td>Daily or every other day</td></tr>
  </tbody>
</table>

<h2 id="mats">Dealing with Mats</h2>
<p>Mats are tangled clumps of fur close to the skin. They can become painful, restrict movement, and hide skin infections underneath. Never pull a mat — it hurts and creates fear of grooming.</p>
<ol class="step-list">
  <li>Apply detangling spray or a small amount of coconut oil to the mat; let it sit for 2 minutes</li>
  <li>Hold the mat at the base (between fingers and skin) to prevent pulling on the skin while you work</li>
  <li>Use a dematting comb or mat splitter to carefully divide the mat into smaller sections</li>
  <li>Work from the outside edges inward, loosening small amounts at a time</li>
  <li>For severe mats — especially near skin: clip them out with blunt-nosed scissors, cutting parallel to the skin; or take to a groomer who can shave them safely</li>
</ol>
<div class="warning-box"><strong>Never cut a mat with scissors pointing at the skin.</strong> Dogs move unexpectedly and "mat clipping" is the most common cause of accidental cuts at home. Point blunt-nosed scissors parallel to the skin, not perpendicular.</div>

<h2 id="benefits">Why Brushing Is About More Than Coat</h2>
<p>Regular brushing is also: a bonding ritual that most dogs grow to love; a full-body skin and health check (you'll spot lumps, parasites, wounds, and skin changes early); a way to reduce indoor shedding by 50–80%; and stimulating for skin circulation and natural oil distribution that gives coats a healthy shine.</p>
`
},

// ─── 5. MANAGING SHEDDING ────────────────────────────────────────────────
{
  file: 'managing-shedding.html',
  title: 'Managing Dog Shedding — Reduce It Without Shaving',
  crumb: 'Managing Shedding',
  tag: '🐾 Shedding Control',
  h1: 'Managing Dog Shedding — Effective Strategies That Actually Work',
  desc: 'Why dogs shed, the best deshedding tools and techniques, whether diet affects shedding, and the big mistake of shaving a double-coated dog.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#why">Why Dogs Shed</a></li>
        <li><a href="#tools">Deshedding Tools</a></li>
        <li><a href="#diet">Diet and Shedding</a></li>
        <li><a href="#shaving">Don't Shave Double Coats</a></li>
        <li><a href="#home">Home Strategies</a></li>`,
  related: `<li><a href="how-to-brush-dog.html">How to Brush Your Dog</a></li>
            <li><a href="how-often-bathe-dog.html">How Often to Bathe</a></li>
            <li><a href="dog-haircut-schedule.html">Haircut Schedule</a></li>`,
  body: `
<p class="ga-lede">Shedding is not a problem to solve — it's a biological process. But you can manage it so you're not wearing your dog to work every day. Here's what actually works.</p>

<h2 id="why">Why Dogs Shed (and When It Gets Worse)</h2>
<p>All dogs shed (yes, even "hypoallergenic" ones — they just shed less and the hair is finer). Shedding is driven primarily by daylight hours, not temperature. As days get longer in spring and shorter in fall, dogs "blow" their coat — releasing massive amounts of undercoat to regulate for the coming season.</p>
<p>Heavy shedding seasons: spring (losing winter coat) and fall (losing summer coat). During a "coat blow," a double-coated dog like a Husky or Corgi can shed enough fur to fill a grocery bag per week.</p>
<div class="key-box"><strong>Heavy shedding breeds:</strong> Siberian Husky, Alaskan Malamute, German Shepherd, Labrador Retriever, Golden Retriever, Corgi, Akita, Bernese Mountain Dog, Chow Chow, Samoyed.</div>

<h2 id="tools">The Most Effective Deshedding Tools</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Undercoat Rake</strong><p>Reaches through the topcoat to pull out loose undercoat. The most important tool for double-coated breeds. Work in sections, don't drag across skin.</p></div>
  <div class="ga-hl-card"><strong>Furminator (Deshedding Tool)</strong><p>Highly effective at removing undercoat. Use weekly during shedding season, monthly otherwise. Don't use daily — can damage topcoat with overuse.</p></div>
  <div class="ga-hl-card"><strong>Slicker Brush</strong><p>Removes loose surface fur and small tangles. Use before and after the undercoat rake. Essential for all coat types.</p></div>
  <div class="ga-hl-card"><strong>Grooming Gloves</strong><p>Great for short-coated dogs who don't tolerate traditional brushes. Mimics petting. Good for face and sensitive areas.</p></div>
</div>
<p><strong>Deshedding bath:</strong> During coat blow, a warm bath with a deshedding shampoo followed by a high-velocity blow dryer (or a vigorous towel dry + regular brush) releases enormous amounts of loose undercoat. Many groomers offer a "deshedding treatment" that includes all of this — worth doing once per season for heavy shedders.</p>

<h2 id="diet">Does Diet Affect Shedding?</h2>
<p>Yes — significantly. A dog with poor nutrition will shed more and have a duller coat. Specific dietary factors that affect shedding:</p>
<ul>
  <li><strong>Omega-3 fatty acids</strong> — the single biggest dietary influencer of coat health. Add fish oil (20–55 mg EPA+DHA per kg body weight daily) to see a difference in 4–8 weeks</li>
  <li><strong>Protein quality</strong> — coat is made of keratin (protein). Low-protein or poor-quality protein diets produce weaker, more easily shed fur</li>
  <li><strong>Hydration</strong> — dehydrated skin produces dry, brittle fur that breaks and sheds more</li>
  <li><strong>Zinc and biotin deficiency</strong> — rare on complete commercial diets but can increase shedding; check with a vet before supplementing</li>
</ul>
<div class="tip-box"><strong>Fish oil results:</strong> Add fish oil to your dog's food for 6–8 weeks and you'll likely see visibly less shedding, a shinier coat, and less dandruff. It's the most consistently effective "supplement" for coat quality.</div>

<h2 id="shaving">The Big Mistake — Don't Shave Your Double-Coated Dog</h2>
<p>Shaving a double-coated dog (Husky, Golden, Lab, German Shepherd, Corgi) seems logical when they're shedding profusely. It is almost always the wrong move.</p>
<p>Double coats are a thermal regulation system — they insulate against both heat AND cold. The undercoat does the insulating; the topcoat protects against sun, insects, and moisture. When you shave this system down, you remove the protection without stopping shedding (the undercoat grows back and sheds in the same cycle).</p>
<p>Worse: in many double-coated dogs, shaved coats don't grow back correctly — the undercoat grows faster than the guard hairs, producing a permanent patchy, woolly, incorrect coat called "post-clipping alopecia" or "clipper alopecia." Some dogs never fully recover their original coat.</p>
<div class="warning-box"><strong>Exception:</strong> Medical necessity (surgery, severe matting, skin infections) may require shaving. This is fine in those cases. But shaving for comfort or to reduce shedding is counterproductive and potentially permanently damaging.</div>

<h2 id="home">Home Strategies to Reduce Fur Everywhere</h2>
<ul>
  <li><strong>Brush outside:</strong> Do all deshedding sessions outdoors or in a room with easy-clean flooring</li>
  <li><strong>Designate dog furniture:</strong> A specific blanket or washable cover for where your dog sleeps reduces fur spread</li>
  <li><strong>Lint rollers + rubber gloves:</strong> A damp rubber glove rubbed across upholstery pulls fur off better than a lint roller alone</li>
  <li><strong>HEPA air purifier:</strong> Captures airborne dog dander and fine fur; meaningful difference for allergy sufferers</li>
  <li><strong>Washable dog beds:</strong> Wash weekly with fragrance-free detergent during shedding season</li>
  <li><strong>Robot vacuum:</strong> Running it daily during coat blow is genuinely life-changing for heavy-shedder households</li>
</ul>
`
},

// ─── 6. DOG HAIRCUT SCHEDULE ──────────────────────────────────────────────
{
  file: 'dog-haircut-schedule.html',
  title: 'Dog Haircut Schedule — How Often Each Breed Needs a Trim',
  crumb: 'Dog Haircut Schedule',
  tag: '✂️ Haircut Guide',
  h1: 'Dog Haircut Schedule — How Often Does Your Dog Need a Trim?',
  desc: 'Grooming frequency by breed group, what happens when you skip a grooming appointment, and how to maintain a dog\'s coat between professional sessions.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#frequency">Frequency by Coat Type</a></li>
        <li><a href="#skip">What Happens If You Skip</a></li>
        <li><a href="#between">Between-Appointment Maintenance</a></li>
        <li><a href="#cost">Grooming Costs</a></li>
        <li><a href="#diy">When to DIY</a></li>`,
  related: `<li><a href="find-dog-groomer.html">Find a Dog Groomer</a></li>
            <li><a href="home-vs-professional-grooming.html">Home vs. Professional</a></li>
            <li><a href="how-to-brush-dog.html">How to Brush Your Dog</a></li>`,
  body: `
<p class="ga-lede">Some dogs need a haircut every 4–6 weeks. Others genuinely never need one. Knowing where your dog falls saves money and prevents painful matting.</p>

<h2 id="frequency">Grooming Frequency by Breed Type</h2>
<table class="ga-table">
  <thead><tr><th>Breed Type</th><th>Examples</th><th>Professional Grooming</th><th>Home Maintenance</th></tr></thead>
  <tbody>
    <tr><td>Double coat, no trim needed</td><td>Husky, Malamute, Akita, Samoyed</td><td>Deshedding bath 2x/year; no haircut</td><td>Brush 2–3x/week; daily during shedding</td></tr>
    <tr><td>Short coat, minimal grooming</td><td>Beagle, Boxer, Dalmatian, Weimaraner</td><td>Bath every 6–8 weeks; no haircut needed</td><td>Weekly brush with rubber curry</td></tr>
    <tr><td>Continuously growing coat (curly)</td><td>Poodle, Bichon, Portuguese Water Dog</td><td>Every 4–6 weeks — hair won't stop growing</td><td>Brush every 2–3 days to prevent mats</td></tr>
    <tr><td>Doodle mixes</td><td>Labradoodle, Goldendoodle, Bernedoodle</td><td>Every 6–8 weeks; varies by coat type</td><td>Brush every 2–3 days</td></tr>
    <tr><td>Long, silky coat</td><td>Maltese, Yorkie, Shih Tzu, Lhasa Apso</td><td>Every 4–8 weeks depending on cut style</td><td>Daily brushing; bow ties or bands for show cuts</td></tr>
    <tr><td>Spaniel/setter coat</td><td>Cocker Spaniel, Irish Setter, Cavalier</td><td>Every 6–8 weeks for ear and foot trimming</td><td>Brush 2–3x/week; check ears weekly</td></tr>
    <tr><td>Wire coat (needs stripping or clipping)</td><td>Schnauzer, Airedale, Wire Fox Terrier</td><td>Every 6–8 weeks for clipping; or strip 2x/year for show</td><td>Brush weekly; beard/eyebrow touch-ups</td></tr>
  </tbody>
</table>
<div class="key-box"><strong>Poodles and doodles don't shed</strong> the way double-coated dogs do. Their dead fur stays in the coat and forms mats if not removed by brushing and trimming. Skipping grooming on a Poodle or Doodle is much more damaging than skipping on a Lab.</div>

<h2 id="skip">What Happens When You Skip Grooming Appointments</h2>
<p>For short-coated dogs: almost nothing — they just get a bit shaggier.</p>
<p>For Poodles, Doodles, Bichons, and long-coated breeds: missing even one 6-week appointment can mean severe matting that requires a full "puppy cut" shave-down to remove. A matted coat is painful — mats pull the skin, restrict movement, and hide hot spots and infections beneath.</p>
<p>Groomers sometimes have to shave matted dogs down to skin level, which is uncomfortable, changes the coat texture, and costs more than regular maintenance appointments.</p>

<h2 id="between">Between-Appointment Maintenance</h2>
<ul>
  <li><strong>Daily brushing for curly/long coats</strong> — prevents the mat formation that ruins appointments</li>
  <li><strong>Weekly ear check</strong> — especially for Spaniels, Poodles, and floppy-eared breeds; moisture in ears causes infections</li>
  <li><strong>Monthly nail trim</strong> — most dogs need nails trimmed every 3–4 weeks regardless of haircut schedule</li>
  <li><strong>Face wipe</strong> — Doodles, Shih Tzus, Pugs and other flat-faced breeds need face folds wiped weekly</li>
  <li><strong>Sanitary trim</strong> — the fur around the rear end can be trimmed with round-tipped scissors between appointments to maintain hygiene</li>
</ul>

<h2 id="cost">What to Budget for Grooming</h2>
<table class="ga-table">
  <thead><tr><th>Dog Size</th><th>Basic Bath & Brush</th><th>Full Groom (bath, cut, nails, ears)</th></tr></thead>
  <tbody>
    <tr><td>Small (under 25 lbs)</td><td>$35–$55</td><td>$50–$80</td></tr>
    <tr><td>Medium (25–50 lbs)</td><td>$45–$70</td><td>$65–$95</td></tr>
    <tr><td>Large (50–80 lbs)</td><td>$60–$90</td><td>$80–$120</td></tr>
    <tr><td>Giant (80+ lbs)</td><td>$80–$120</td><td>$100–$160+</td></tr>
  </tbody>
</table>
<p>Prices vary significantly by location, groomer experience, and coat condition. Dogs that come in regularly and are easy to handle cost less than matted dogs requiring dematting time or anxious dogs requiring slow handling.</p>

<h2 id="diy">When DIY Grooming Makes Sense</h2>
<p>DIY is practical for: regular brushing and deshedding (every breed), bathing (any breed), nail trimming (if you're comfortable), and trimming paw fur on low-key breeds. Professional grooming is the better choice for: face and ear shaping, any complex haircut pattern, dogs who are anxious about grooming, and cutting with clippers near skin.</p>
`
},

// ─── 7. TRIM DOG NAILS ────────────────────────────────────────────────────
{
  file: 'trim-dog-nails.html',
  title: 'How to Trim Your Dog\'s Nails — A Step-by-Step Guide',
  crumb: 'Trim Dog Nails',
  tag: '💅 Nail Care',
  h1: 'How to Trim Your Dog\'s Nails — Step-by-Step',
  desc: 'What tools to use, how to find the quick in dark nails, what to do if you cut too short, and how to get a dog to cooperate with nail trims.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#tools">Tools You Need</a></li>
        <li><a href="#quick">Finding the Quick</a></li>
        <li><a href="#steps">Step-by-Step Trim</a></li>
        <li><a href="#quick-cut">If You Cut Too Deep</a></li>
        <li><a href="#resistant">Getting a Resistant Dog to Accept It</a></li>`,
  related: `<li><a href="overgrown-dog-nails.html">Overgrown Dog Nails</a></li>
            <li><a href="how-to-brush-dog.html">How to Brush Your Dog</a></li>
            <li><a href="home-vs-professional-grooming.html">Home vs. Professional Grooming</a></li>`,
  body: `
<p class="ga-lede">Overgrown nails cause pain and posture problems in dogs — yet most owners avoid trimming them because they've nicked the quick once and their dog won't cooperate anymore. Here's how to do it confidently and correctly.</p>

<h2 id="tools">Tools You'll Need</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Scissor-Style Clippers</strong><p>Also called "bypass clippers." Best for medium to large dogs with thick nails. Cleaner cut with less crushing force. Miller's Forge is the standard recommendation.</p></div>
  <div class="ga-hl-card"><strong>Guillotine Clippers</strong><p>A blade drops across the nail. Work well for small dogs. Need frequent blade replacement as they dull fast and crush instead of cut.</p></div>
  <div class="ga-hl-card"><strong>Nail Grinder (Dremel)</strong><p>Grinds nail down gradually. Eliminates quick-cutting risk. Takes longer. Some dogs tolerate the vibration better than clippers; others hate the sound.</p></div>
  <div class="ga-hl-card"><strong>Styptic Powder</strong><p>Stops bleeding immediately if you cut the quick. Keep it on hand every time you trim. Cornstarch also works in a pinch.</p></div>
</div>

<h2 id="quick">Finding the Quick in Light and Dark Nails</h2>
<p>The quick is the blood vessel and nerve running through each nail. Cutting it causes bleeding and pain — the main source of nail trim anxiety.</p>
<p><strong>Light/white nails:</strong> The quick is visible as a pink shadow inside the nail. Stay 2mm beyond where the pink ends.</p>
<p><strong>Dark/black nails:</strong> You can't see the quick directly. Use this method:</p>
<ol class="step-list">
  <li>Look at the nail from below (the cut face) after each small clip</li>
  <li>Initially the cut shows white or yellowish chalky material — you're in the dead part; safe to continue</li>
  <li>As you get closer to the quick, a dark dot or circle appears in the center of the cut face — stop here, you're 1–2mm from the quick</li>
  <li>When you see a grayish ring with a dark center, that's the quick boundary — stop immediately</li>
</ol>
<div class="tip-box"><strong>The "little and often" approach:</strong> Trim just a tiny amount weekly rather than a full trim monthly. This keeps nails short without ever approaching the quick, because the quick recedes as you trim regularly.</div>

<h2 id="steps">Step-by-Step Nail Trim</h2>
<ol class="step-list">
  <li>Have your dog sit or stand in a comfortable, stable position; have styptic powder within reach</li>
  <li>Hold the paw firmly but gently; press the pad to extend the nail slightly</li>
  <li>Position the clipper at a 45-degree angle to the nail, mirroring the natural angle of the tip</li>
  <li>For dark nails: take multiple thin slices rather than one big cut; check the center after each slice</li>
  <li>For light nails: clip 2mm before where the pink quick ends</li>
  <li>Don't forget dewclaws (the nail higher on the inner leg) — they don't touch the ground and grow faster and curlier</li>
  <li>Treat generously after each paw; use a licki mat or high-value treat throughout for fearful dogs</li>
</ol>

<h2 id="quick-cut">If You Cut the Quick</h2>
<p>Cutting the quick looks dramatic (blood) but is not a serious injury. Act quickly and calmly:</p>
<ol class="step-list">
  <li>Apply styptic powder directly to the bleeding nail tip; hold with light pressure for 30–60 seconds</li>
  <li>If you don't have styptic powder: press cornstarch, flour, or a bar of soap to the tip</li>
  <li>Keep your dog calm and still for 5 minutes while the blood clots</li>
  <li>Don't let them walk on wet surfaces for 30 minutes</li>
  <li>The nail should stop bleeding within 5 minutes; if it doesn't, call your vet</li>
</ol>
<div class="key-box"><strong>After cutting the quick:</strong> Don't give up on nail trims — this is exactly when dogs form lasting fear. End the session immediately with a very high-value treat. Then do several positive, "fake trim" sessions before the next real trim.</div>

<h2 id="resistant">Getting a Resistant Dog to Accept Nail Trims</h2>
<p>Dogs who fight nail trims have usually had a painful experience — the quick was cut, or nails were twisted. The fix is desensitization:</p>
<ol class="step-list">
  <li>Touch paws and nails daily with your hands, treating generously — paw handling without clippers first</li>
  <li>Click (or say "yes") and treat every time you touch a paw calmly; repeat until paw handling = happy dog</li>
  <li>Introduce the clipper near the paw without cutting; treat for calm acceptance of the tool</li>
  <li>Touch the clipper to a nail without cutting; treat immediately</li>
  <li>Clip just the very tip of one nail (the least you could possibly clip); jackpot treat, done for the day</li>
  <li>Gradually work up — over many sessions — to trimming all nails in one session</li>
</ol>
`
},

// ─── 8. OVERGROWN DOG NAILS ───────────────────────────────────────────────
{
  file: 'overgrown-dog-nails.html',
  title: 'Overgrown Dog Nails — Risks and How to Fix Them Safely',
  crumb: 'Overgrown Dog Nails',
  tag: '⚠️ Nail Health',
  h1: 'Overgrown Dog Nails — Health Risks and Safe Correction',
  desc: 'What happens when dog nails get too long, how to shorten overgrown nails without cutting the quick, and why the quick recedes over time.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#risks">Health Risks of Overgrown Nails</a></li>
        <li><a href="#howlong">How to Know Nails Are Too Long</a></li>
        <li><a href="#fix">How to Shorten Overgrown Nails</a></li>
        <li><a href="#quick">The Quick Recedes Over Time</a></li>
        <li><a href="#vet">When to See a Vet or Groomer</a></li>`,
  related: `<li><a href="trim-dog-nails.html">How to Trim Dog Nails</a></li>
            <li><a href="find-dog-groomer.html">Find a Dog Groomer</a></li>
            <li><a href="/health/limping.html">Limping in Dogs</a></li>`,
  body: `
<p class="ga-lede">Overgrown nails aren't just a cosmetic problem. They cause real pain and can permanently alter your dog's posture and gait. Here's what's actually happening and how to fix it.</p>

<h2 id="risks">Health Risks of Overgrown Nails</h2>
<p>When a dog's nails are too long, they contact the ground when walking. This pushes the toe backward with every step — essentially forcing the toe joint to splay sideways with each footfall.</p>
<ul>
  <li><strong>Pain with every step</strong> — pressure on the nail bed and toe joint</li>
  <li><strong>Altered gait</strong> — dogs unconsciously shift their weight to compensate, causing strain on hips, knees, and spine</li>
  <li><strong>Joint problems over time</strong> — chronic poor posture leads to arthritis development earlier than normal</li>
  <li><strong>Nail curling into the pad</strong> — untrimmed nails eventually curl under and grow into the paw pad; extremely painful and requires vet treatment</li>
  <li><strong>Snagging and tearing</strong> — long nails catch on carpet, bedding, or ground; a torn nail is a painful emergency</li>
  <li><strong>Dewclaw ingrowth</strong> — dewclaws (higher inner nails) don't touch the ground at all; they grow in a curl and will pierce the leg if never trimmed</li>
</ul>
<div class="warning-box"><strong>Dewclaw ingrowth is a vet emergency:</strong> A dewclaw that has grown into the leg skin must be removed by a vet; attempting home removal causes severe pain and infection risk.</div>

<h2 id="howlong">How to Know Nails Are Too Long</h2>
<p>The clearest test: with your dog standing on a flat, hard surface (not carpet), listen while they walk. If you can hear clicking with each step — nails too long. Visually: nails should not touch the ground when the dog is standing. They should clear the floor by about 2–3mm.</p>
<p>Another check: hold the paw and look at the nails from below. The nail should curve down and end near — but not at — the floor level when the paw is flat.</p>

<h2 id="fix">How to Shorten Overgrown Nails Safely</h2>
<p>Overgrown nails have a longer quick (the quick grows as the nail grows). You <em>cannot</em> shorten overgrown nails to normal length in one session — it requires a gradual process over weeks.</p>
<ol class="step-list">
  <li><strong>Week 1:</strong> Trim the very tip only — just 1–2mm. The goal isn't to reach the right length; it's to start the process safely.</li>
  <li><strong>Week 2–3:</strong> Trim again, slightly more. The quick has begun to recede from the first trim.</li>
  <li><strong>Week 3–4:</strong> Trim again. Continue weekly. The quick recedes by about 1–2mm per week with regular trimming.</li>
  <li><strong>Week 4–6:</strong> Nails should be approaching normal length. Continue weekly trims for another 1–2 months to establish the habit and fully recede the quick.</li>
  <li>Once normal length is achieved: trim every 3–4 weeks to maintain.</li>
</ol>
<div class="tip-box"><strong>Grinder advantage:</strong> A nail grinder (Dremel) is ideal for overgrown nails — you can grind small amounts and see the cut face clearly, making it much easier to stay safe while still making progress each session.</div>

<h2 id="quick">Why the Quick Recedes — and Why This Takes Time</h2>
<p>The quick (blood vessel inside the nail) is not fixed in length. It grows with the nail and recedes when nails are trimmed regularly. When nails have been left long for months or years, the quick extends almost to the nail tip — which is why you can't just clip them short immediately.</p>
<p>Each trim stimulates the quick to recede slightly — it's a vascular response to the reduced nail pressure. This is why weekly small trims are more effective than monthly aggressive ones for managing overgrown nails.</p>

<h2 id="vet">When to See a Groomer or Vet</h2>
<p>Take your dog to a professional if:</p>
<ul>
  <li>Nails have been untrimmed so long they are curling or spiraling</li>
  <li>A nail has already grown into the pad or skin — this requires vet treatment</li>
  <li>The dog is showing lameness or pain when walking that might be nail-related</li>
  <li>You've been unable to trim nails at home and they haven't been done in over 8 weeks</li>
  <li>You cut deeply into the quick and bleeding won't stop after 10 minutes</li>
</ul>
`
},

// ─── 9. CLEAN DOG EARS ────────────────────────────────────────────────────
{
  file: 'clean-dog-ears.html',
  title: 'How to Clean Your Dog\'s Ears — And When Not To',
  crumb: 'Clean Dog Ears',
  tag: '👂 Ear Care',
  h1: 'How to Clean Your Dog\'s Ears — And When Not To',
  desc: 'Step-by-step ear cleaning guide, the right products to use, signs of ear infection, and which dogs need ear cleaning most — and how often.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#needs">Which Dogs Need Ear Cleaning</a></li>
        <li><a href="#signs">Signs of Infection vs. Normal Wax</a></li>
        <li><a href="#steps">How to Clean Ears</a></li>
        <li><a href="#products">What Products to Use</a></li>
        <li><a href="#avoid">What Not to Do</a></li>`,
  related: `<li><a href="/health/dog-allergies.html">Dog Allergies</a></li>
            <li><a href="how-to-brush-dog.html">How to Brush Your Dog</a></li>
            <li><a href="find-dog-groomer.html">Find a Dog Groomer</a></li>`,
  body: `
<p class="ga-lede">Most healthy dogs with upright ears rarely need ear cleaning. Floppy-eared breeds and dogs who swim frequently are a different story — their ears are prime territory for infection without regular maintenance.</p>

<h2 id="needs">Which Dogs Need Regular Ear Cleaning</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>High-Risk Breeds</strong><p>Cocker Spaniels, Basset Hounds, Beagles, Bloodhounds, Poodles, Labradoodles. Long, floppy ears trap moisture and restrict airflow — perfect for yeast and bacteria.</p></div>
  <div class="ga-hl-card"><strong>Swimmers</strong><p>Any dog who swims frequently needs ears checked and dried after every water session. Water in the ear canal is the most common trigger for ear infections.</p></div>
  <div class="ga-hl-card"><strong>Allergy-Prone Dogs</strong><p>Dogs with environmental or food allergies develop more ear yeast and debris. Often the first sign of allergies is recurring ear problems.</p></div>
  <div class="ga-hl-card"><strong>Upright-Eared Breeds</strong><p>German Shepherds, Huskies, Dobermans — usually need little cleaning. Good airflow keeps their ears naturally clean. Over-cleaning causes irritation.</p></div>
</div>
<p>General rule: clean ears <strong>when dirty, not on a schedule</strong>. For high-risk dogs, check weekly and clean as needed (typically every 2–4 weeks). For most dogs, monthly checks are sufficient.</p>

<h2 id="signs">Normal Wax vs. Signs of Infection</h2>
<table class="ga-table">
  <thead><tr><th></th><th>Normal</th><th>Possible Infection</th></tr></thead>
  <tbody>
    <tr><td>Color</td><td>Pale yellow to light tan</td><td>Dark brown, black, red, or unusual color</td></tr>
    <tr><td>Smell</td><td>Mild, earthy</td><td>Strong, foul, yeasty (like bread or corn chips), or putrid</td></tr>
    <tr><td>Amount</td><td>Small to moderate amount</td><td>Excessive buildup despite cleaning</td></tr>
    <tr><td>Behavior</td><td>No head shaking or scratching</td><td>Frequent head shaking, scratching at ears, tilting head to one side</td></tr>
    <tr><td>Appearance</td><td>Clean-looking inner ear</td><td>Redness, swelling, discharge, crusting</td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>Never clean an infected ear:</strong> If you suspect infection, take your dog to the vet before cleaning. Cleaning an infected ear can push debris deeper, rupture an inflamed eardrum, or introduce more bacteria. The vet will clean it and prescribe appropriate drops.</div>

<h2 id="steps">How to Clean Your Dog's Ears — Step by Step</h2>
<ol class="step-list">
  <li>Gather supplies: vet-approved ear cleaner, cotton balls or gauze pads (not cotton swabs)</li>
  <li>Have your dog sit or lie down; have a helper hold for a wiggly dog</li>
  <li>Hold the ear flap up to straighten the ear canal; fill the canal with ear cleaner (don't be shy — it should feel like you're "filling" the canal)</li>
  <li>Massage the base of the ear for 20–30 seconds — you'll hear a squishing sound; this loosens debris inside</li>
  <li>Release the ear and let your dog shake — most of the debris comes out in the shake</li>
  <li>Wipe the outer canal and ear flap with a cotton ball to remove debris; reach as far as your finger naturally goes — no deeper</li>
  <li>Repeat on the other ear; treat generously</li>
</ol>

<h2 id="products">What Products to Use</h2>
<ul>
  <li><strong>Veterinary ear cleaners</strong> — Virbac Epi-Otic Advanced, Zymox Ear Cleanser, MalAcetic Aural are all vet-recommended; choose based on whether the primary issue is wax, yeast, or bacterial</li>
  <li><strong>Zymox with hydrocortisone</strong> — specifically for mild yeast infections; contains enzymes that kill bacteria and yeast; available without prescription; follow instructions carefully</li>
  <li><strong>Avoid:</strong> hydrogen peroxide (too harsh), alcohol (dries and irritates), mineral oil alone, and any drops not specifically labeled for dog ear use</li>
</ul>

<h2 id="avoid">What Not to Do</h2>
<ul>
  <li><strong>Never use cotton swabs inside the ear canal</strong> — pushes debris deeper and can damage the eardrum; only use on the visible outer ear flap</li>
  <li><strong>Don't over-clean</strong> — excessive cleaning irritates the ear canal and can cause the inflammation it's meant to prevent</li>
  <li><strong>Don't ignore persistent odor or discharge</strong> — a recurring smell after cleaning is a vet visit, not a cleaning problem</li>
  <li><strong>Don't pluck ear hair without vet guidance</strong> — some groomers pluck the hair inside Poodle and Doodle ears; evidence on whether this helps or hurts is mixed; ask your vet</li>
</ul>
`
},

// ─── 10. TEAR STAINS ──────────────────────────────────────────────────────
{
  file: 'tear-stains.html',
  title: 'Dog Tear Stains — Causes, Safe Removal, and Prevention',
  crumb: 'Tear Stains',
  tag: '👁️ Tear Stains',
  h1: 'Dog Tear Stains — Causes, Safe Removal, and Prevention',
  desc: 'Why dogs get reddish-brown tear stains, which breeds are most affected, safe cleaning methods, and when tear staining is a sign of something medical.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#what">What Causes Tear Stains</a></li>
        <li><a href="#breeds">Breeds Most Affected</a></li>
        <li><a href="#remove">How to Remove Stains Safely</a></li>
        <li><a href="#prevent">Prevention Strategies</a></li>
        <li><a href="#vet">When to See a Vet</a></li>`,
  related: `<li><a href="how-to-brush-dog.html">How to Brush Your Dog</a></li>
            <li><a href="bathing-anxious-dog.html">Bathing an Anxious Dog</a></li>
            <li><a href="/health/dog-allergies.html">Dog Allergies</a></li>`,
  body: `
<p class="ga-lede">The reddish-brown streaks beneath your dog's eyes are called tear stains — and they're caused by a pigment, not dirt. Here's what's actually going on and how to manage them safely.</p>

<h2 id="what">What Actually Causes Tear Stains</h2>
<p>Tears contain a compound called porphyrin — an iron-containing molecule that turns reddish-brown when exposed to air and light (oxidation). Porphyrins are excreted through tears, saliva, and urine. When tears overflow onto facial fur and sit there, the porphyrin oxidizes and leaves the characteristic rusty stain.</p>
<p>The root question is: why are tears overflowing in the first place? Common causes:</p>
<ul>
  <li><strong>Shallow eye sockets (brachycephalic breeds)</strong> — the anatomy simply doesn't allow full drainage</li>
  <li><strong>Blocked or abnormally small tear ducts</strong> — the drainage channel is kinked or narrow</li>
  <li><strong>Epiphora (excessive tearing)</strong> — abnormal tear production from allergies, eye irritation, or entropion (eyelid rolling in)</li>
  <li><strong>Trichiasis</strong> — eyelashes that grow inward and irritate the eye surface, causing more tearing</li>
  <li><strong>Yeast overgrowth</strong> — the Malassezia yeast thrives in the warm, moist stained area and darkens the stain further</li>
  <li><strong>Diet and water</strong> — hard water high in minerals, certain food dyes, or food allergens can increase porphyrin levels in tears</li>
</ul>

<h2 id="breeds">Breeds Most Affected</h2>
<p>Short-faced (brachycephalic) breeds are the most commonly affected: Maltese, Bichon Frise, Shih Tzu, Poodle, Lhasa Apso, Cavalier King Charles Spaniel, Pug, Bulldog, Chihuahua. Light-colored dogs show staining most visibly — a white Maltese with staining is striking; a black Poodle has the same staining but it's invisible against the coat.</p>

<h2 id="remove">How to Clean Tear Stains Safely</h2>
<p>Regular cleaning prevents stain buildup and reduces yeast growth. Do this daily for heavily-stained dogs, 2–3 times per week for mild cases.</p>
<ol class="step-list">
  <li>Wipe the stained area with a soft cloth, cotton ball, or pet face wipe dampened with warm water or saline solution</li>
  <li>Work from the inner corner of the eye outward, following the hair direction</li>
  <li>For stubborn stains: apply a small amount of tear-stain-specific cleanser (see products below) to a cotton ball; gently work into the stained fur</li>
  <li>Dry the area thoroughly after cleaning — moisture encourages yeast growth</li>
  <li>Trim the stained fur short if the dog's breed allows — shorter fur = less surface area for staining and bacteria</li>
</ol>
<div class="warning-box"><strong>Avoid near the eyes:</strong> Don't use hydrogen peroxide, bleach, or undiluted apple cider vinegar near the eyes. Many popular "DIY" tear stain recipes are too harsh for the delicate eye area and can cause chemical burns or eye damage.</div>
<p>Safe, vet-used products: Opti-Clear Eye Rinse (saline flush), Burt's Bees Eye Wash, Vetericyn Eye Wash. For established staining: Angels' Eyes powder (tylosin-based — check with vet first), TropiClean Spa Tear Stain Remover.</p>

<h2 id="prevent">Prevention Strategies That Actually Help</h2>
<ul>
  <li><strong>Daily face wiping</strong> — prevents stain buildup before it starts; the most effective intervention</li>
  <li><strong>Filtered water</strong> — switching from tap water (high in minerals) to filtered or bottled water reduces porphyrin output in some dogs</li>
  <li><strong>Limited ingredient or hypoallergenic food trial</strong> — if allergies are suspected, an 8-week food elimination trial sometimes dramatically reduces tearing</li>
  <li><strong>Short face trim</strong> — keep fur around the eyes trimmed short to minimize fur wicking tears across the face</li>
  <li><strong>Stainless steel or ceramic water bowls</strong> — plastic bowls can harbor bacteria that contribute to facial infections; replace with non-porous materials</li>
  <li><strong>Probiotic supplement</strong> — some owners report reduced staining after adding a dog probiotic; the mechanism is unclear but it's low-risk to try</li>
</ul>

<h2 id="vet">When Tear Staining Means a Vet Visit</h2>
<p>See your vet if:</p>
<ul>
  <li>Staining is sudden or dramatically worse than usual — may indicate a new eye condition</li>
  <li>The eye itself looks red, cloudy, squinting, or has discharge that isn't clear</li>
  <li>The dog is pawing at their eye or face</li>
  <li>Staining is accompanied by odor from the face (yeast infection of skin folds requires treatment)</li>
  <li>Staining occurs on a dog with upright eyes and no obvious structural cause — may indicate blocked tear ducts that can be flushed or surgically corrected</li>
</ul>
`
},

// ─── 11. FIND A DOG GROOMER ───────────────────────────────────────────────
{
  file: 'find-dog-groomer.html',
  title: 'How to Find a Good Dog Groomer — What to Look For',
  crumb: 'Find a Dog Groomer',
  tag: '✂️ Professional Grooming',
  h1: 'How to Find a Good Dog Groomer',
  desc: 'Red flags to watch for, questions to ask before booking, how to read reviews, what certifications matter, and how to switch groomers if you\'re unhappy.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#where">Where to Find Groomers</a></li>
        <li><a href="#questions">Questions to Ask</a></li>
        <li><a href="#redflags">Red Flags to Watch For</a></li>
        <li><a href="#certs">Certifications That Matter</a></li>
        <li><a href="#anxious">Finding a Fear-Free Groomer</a></li>`,
  related: `<li><a href="home-vs-professional-grooming.html">Home vs. Professional Grooming</a></li>
            <li><a href="dog-haircut-schedule.html">Haircut Schedule</a></li>
            <li><a href="bathing-anxious-dog.html">Bathing an Anxious Dog</a></li>`,
  body: `
<p class="ga-lede">Not all groomers are equal — and a bad experience can make your dog fear grooming for life. Here's how to find someone who actually knows what they're doing and treats your dog well.</p>

<h2 id="where">Where to Start Your Search</h2>
<ul>
  <li><strong>Ask your vet</strong> — veterinarians refer only groomers they've seen produce healthy, unstressed dogs; this is the most reliable recommendation</li>
  <li><strong>Local dog owners and Facebook groups</strong> — area-specific groups often have pinned groomer recommendations with real photos and recent reviews</li>
  <li><strong>Google Maps / Yelp reviews</strong> — useful but filter for recent reviews (within 6 months); staffing changes fast in grooming salons</li>
  <li><strong>The National Dog Groomers Association of America (NDGAA) and International Professional Groomers (IPG)</strong> — both maintain directories of certified members</li>
  <li><strong>Fear Free Pets directory</strong> — lists groomers certified in low-stress handling techniques; search at fearfreepets.com</li>
</ul>

<h2 id="questions">Questions to Ask Before You Book</h2>
<ol class="step-list">
  <li>"Can I see where you groom and the drying area before I book?" — a confident groomer will say yes immediately</li>
  <li>"Do you use cage dryers, and are dogs ever left unattended in them?" — cage dryers have caused overheating deaths; hands-on drying is safer</li>
  <li>"How long will my dog be there?" — a full groom should take 2–4 hours max; all-day drop-offs suggest caging for hours between services</li>
  <li>"Have you worked with [my breed] before?" — breed-specific coats require specific skills; Doodles and double coats in particular</li>
  <li>"What do you do if a dog becomes very stressed or anxious?" — listen for "we stop and call the owner" rather than "we push through"</li>
  <li>"Do you use positive reinforcement and treats?" — not universal; some groomers still use physical restraint for everything</li>
</ol>

<h2 id="redflags">Red Flags to Walk Away From</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Won't Let You Tour</strong><p>Any reluctance to show you the facility is a major warning. Clean, professional groomers want you to see where your dog will be.</p></div>
  <div class="ga-hl-card"><strong>No Ventilation or Smells Bad</strong><p>Heavy bleach smell suggests chemical overuse; ammonia smell (urine) suggests overcrowding and inadequate cleaning. Professional salons smell faintly of pet shampoo, nothing worse.</p></div>
  <div class="ga-hl-card"><strong>All-Day Drop-Off</strong><p>A dog waiting in a crate for 6 hours for a 2-hour groom is stressful and unnecessary. Find groomers who give you a pickup window.</p></div>
  <div class="ga-hl-card"><strong>Staff Turnover</strong><p>High staff turnover or the groomer you met isn't the one who greets you is a warning sign. Relationship continuity matters enormously for anxious dogs.</p></div>
</div>
<div class="warning-box"><strong>If your dog comes home injured, trembling, or unusually subdued after a grooming session:</strong> Don't return without a conversation with the owner. Injuries (cuts, burns from dryers) must be disclosed. A dog who is too stressed to walk or eat after grooming is being handled badly.</div>

<h2 id="certs">Certifications That Actually Mean Something</h2>
<p>Dog grooming is unregulated in most US states — anyone can open a salon. Voluntary certifications show commitment to the craft:</p>
<ul>
  <li><strong>Certified Master Groomer (CMG)</strong> — the highest NDGAA certification; requires written and practical exams across multiple breeds</li>
  <li><strong>International Certified Master Groomer (ICMG)</strong> — IPG's equivalent top-tier certification</li>
  <li><strong>Fear Free Certified Professional</strong> — specifically for low-stress handling; excellent for anxious dogs</li>
  <li><strong>Certified Professional Groomer (CPG)</strong> — entry-level NDGAA certification; still shows they passed formal assessment</li>
</ul>
<p>No certification doesn't automatically mean bad — many excellent groomers don't pursue credentials. But certification plus good reviews plus a willingness to let you tour is a very good sign.</p>

<h2 id="anxious">Finding a Fear-Free Groomer for Anxious Dogs</h2>
<p>If your dog has had a traumatic grooming experience, specifically look for:</p>
<ul>
  <li>Fear Free certified or at least familiar with fear-free protocols</li>
  <li>Willingness to do a short introductory session (just bath, no cut) before committing to full grooms</li>
  <li>Flexible booking (willing to work with your dog's pace, not a production line)</li>
  <li>Experience with anxious dogs specifically — ask for their approach, not just whether they've handled them</li>
  <li>Some mobile groomers (one-on-one in a van) are better for anxious dogs — no other dogs present, no unfamiliar facility, less stimulus overload</li>
</ul>
`
},

// ─── 12. HOME VS PROFESSIONAL GROOMING ────────────────────────────────────
{
  file: 'home-vs-professional-grooming.html',
  title: 'Home vs. Professional Dog Grooming — Which Is Right for You?',
  crumb: 'Home vs. Professional Grooming',
  tag: '🏠 vs. ✂️ DIY vs. Pro',
  h1: 'Home vs. Professional Dog Grooming — An Honest Comparison',
  desc: 'Cost comparison, what you can realistically do at home, what needs a professional, and how to create a hybrid routine that saves money without compromising your dog\'s coat.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#costs">Real Cost Comparison</a></li>
        <li><a href="#diy-tasks">What You Can Do at Home</a></li>
        <li><a href="#pro-tasks">What Needs a Professional</a></li>
        <li><a href="#hybrid">The Hybrid Approach</a></li>
        <li><a href="#tools">Home Grooming Tools Worth Buying</a></li>`,
  related: `<li><a href="find-dog-groomer.html">Find a Dog Groomer</a></li>
            <li><a href="dog-haircut-schedule.html">Haircut Schedule</a></li>
            <li><a href="trim-dog-nails.html">How to Trim Nails</a></li>`,
  body: `
<p class="ga-lede">Professional grooming is expensive. DIY grooming requires time, tools, and skill. For most owners, the best approach is a mix of both — and knowing exactly which tasks belong in which category.</p>

<h2 id="costs">The Real Cost Comparison</h2>
<table class="ga-table">
  <thead><tr><th>Scenario</th><th>Annual Cost Estimate</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>All-professional (full groom every 6 weeks)</td><td>$500–$1,600/year</td><td>Based on $65–$120 per groom; large breeds cost more</td></tr>
    <tr><td>Hybrid (professional cut 4x/year + home maintenance)</td><td>$200–$600/year</td><td>Home tools: $100–$200 one-time; professional grooms reduced</td></tr>
    <tr><td>Full DIY (all home grooming)</td><td>$100–$200/year</td><td>Ongoing: shampoo + brush replacement; upfront tool cost $150–$350</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Hidden DIY cost:</strong> Your time. A full groom (bath, dry, brush, trim, nails, ears) takes 1–3 hours at home vs. drop off/pickup of a professional. Value your time honestly when calculating savings.</div>

<h2 id="diy-tasks">What You Can Realistically Do at Home</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Brushing</strong><p>100% DIY for all breeds. The most important and time-consuming grooming task. Daily for long/curly coats, weekly for short coats. No special skill required.</p></div>
  <div class="ga-hl-card"><strong>Bathing</strong><p>DIY for most breeds. Requires a space, a non-slip mat, the right shampoo, and patience. Gets easier with practice and desensitization.</p></div>
  <div class="ga-hl-card"><strong>Nail Trimming</strong><p>DIY with the right tools and technique. Initial learning curve; refer to our nail trimming guide. Many owners become fully confident within a few months.</p></div>
  <div class="ga-hl-card"><strong>Ear Cleaning</strong><p>DIY with vet-approved cleaner. Easy once learned. Critical for floppy-eared breeds between professional visits.</p></div>
  <div class="ga-hl-card"><strong>Face & Paw Wipes</strong><p>Fully DIY and should be done daily for Doodles, flat-faced breeds, and dogs with tear staining. Just a damp cloth or pet wipe.</p></div>
  <div class="ga-hl-card"><strong>Sanitary Trimming</strong><p>Round-tipped scissors to clean up fur around the rear; doable at home once comfortable with scissors near your dog.</p></div>
</div>

<h2 id="pro-tasks">What Needs a Professional</h2>
<ul>
  <li><strong>Full haircuts and shaping</strong> — especially breed-specific patterns (Poodle continental clip, Schnauzer skirt, Westie profile); these require years of skill</li>
  <li><strong>Dematting sessions</strong> — severe mats require professional dematting tools and technique; attempting at home can injure the dog or remove too much coat</li>
  <li><strong>Hand stripping</strong> — for wire-coated breeds; requires specialized technique; cannot be replicated at home without significant training</li>
  <li><strong>First groom for a puppy</strong> — better with a professional who knows puppy introduction protocols</li>
  <li><strong>Dogs who won't cooperate</strong> — a professional has equipment, technique, and experience that makes it safer and less traumatic</li>
  <li><strong>Anal gland expression</strong> — while technically possible at home, this is messy, potentially harmful if done incorrectly, and best left to a vet or experienced groomer</li>
</ul>

<h2 id="hybrid">The Hybrid Approach — Best of Both</h2>
<p>Most owners can save 50–70% of grooming costs with a hybrid routine:</p>
<ol class="step-list">
  <li><strong>Professional groom every 8–12 weeks</strong> instead of every 4–6 weeks — this is only possible if you maintain the coat between appointments</li>
  <li><strong>Daily home brushing</strong> — prevents the mat formation that forces emergency professional grooms or shave-downs</li>
  <li><strong>Home baths every 4–6 weeks</strong> — keep coat clean between professional visits</li>
  <li><strong>Home nail trims monthly</strong> — eliminates the add-on charge ($10–$20) at every grooming visit</li>
  <li><strong>Professional for the cut and shaping</strong> — focus professional appointments on what they do best</li>
</ol>

<h2 id="tools">Home Grooming Tools Worth Buying</h2>
<table class="ga-table">
  <thead><tr><th>Tool</th><th>Approximate Cost</th><th>Worth It For</th></tr></thead>
  <tbody>
    <tr><td>Quality slicker brush (Chris Christensen, Andis)</td><td>$25–$50</td><td>Every dog with medium to long coat</td></tr>
    <tr><td>Undercoat rake / deshedding tool</td><td>$20–$40</td><td>All double-coated breeds</td></tr>
    <tr><td>Metal greyhound comb</td><td>$10–$20</td><td>All coat types; the finishing tool</td></tr>
    <tr><td>Scissor-style nail clippers (Miller's Forge)</td><td>$15–$25</td><td>Any dog whose nails you'll trim</td></tr>
    <tr><td>Nail grinder (Dremel 7300)</td><td>$30–$50</td><td>Dogs with dark nails or nail trim anxiety</td></tr>
    <tr><td>Dog-specific blow dryer (Shernbao, XPOWER)</td><td>$80–$200</td><td>Double-coated breeds during shedding season; serious home groomers</td></tr>
    <tr><td>Dog clippers (Andis Excel, Oster A5)</td><td>$80–$150</td><td>Only if you plan to do full trims at home; significant learning curve</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Start simple:</strong> Don't buy a full professional grooming kit before you know if you'll use it. Start with a slicker brush and good nail clippers. Add tools as your confidence and your dog's tolerance grow.</div>
`
}

]; // end GUIDES

GUIDES.forEach(cfg => {
  const html = page(cfg);
  const outPath = path.join(OUT, cfg.file);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Created:', outPath);
});
console.log(`Done: Grooming guides (${GUIDES.length} pages)`);
