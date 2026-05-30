// Batch 5: yorkshire-terrier, australian-shepherd, border-collie
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'breeds');

// ── shared tab nav ──────────────────────────────────────────────────────────
const TAB_NAV = `        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>`;

// ── shared tab-switching JS ─────────────────────────────────────────────────
const TAB_JS = `  <script>
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
`;

// ── helper: internal breed link ─────────────────────────────────────────────
function ib(slug, label) {
  return `<a href="/breeds/${slug}.html">${label}</a>`;
}

// ── panel builders ──────────────────────────────────────────────────────────
function dietPanel(breedName, intro, rows) {
  const rowsHtml = rows.map(([label, amount, notes]) => `
              <tr>
                <td>${label}</td>
                <td>${amount}</td>
                <td>${notes}</td>
              </tr>`).join('');
  return `        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ Diet &amp; Feeding Guide</h2>
            <p>${intro}</p>
            <table class="breed-table">
              <thead><tr><th>Life Stage</th><th>Daily Amount</th><th>Notes</th></tr></thead>
              <tbody>${rowsHtml}
              </tbody>
            </table>
            <div class="info-box">
              <h3>💧 Hydration &amp; Treats</h3>
              <p>Always provide fresh water. Keep treats to ≤10% of daily calories. Avoid chocolate, grapes, onions, and xylitol — all toxic to dogs.</p>
            </div>
          </div>
        </div><!-- end tab-diet -->`;
}

function costPanel(breedName, puppy, monthly, annual, extras, notes) {
  return `        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 Cost &amp; Price Guide</h2>
            <table class="breed-table">
              <thead><tr><th>Expense</th><th>Estimated Cost</th></tr></thead>
              <tbody>
                <tr><td>Puppy from Breeder</td><td>${puppy}</td></tr>
                <tr><td>Monthly Food</td><td>${monthly}</td></tr>
                <tr><td>Annual Vet Care</td><td>${annual}</td></tr>
                ${extras.map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('\n                ')}
              </tbody>
            </table>
            <div class="info-box">
              <h3>💡 Cost-Saving Tips</h3>
              <p>${notes}</p>
            </div>
          </div>
        </div><!-- end tab-cost -->`;
}

function mixBlock(slug, name, parents, desc) {
  return `              <div class="mix-card">
                <img src="https://dog.ceo/api/breeds/${slug}/images/random" alt="${name}" loading="lazy" onerror="this.src='../images/dog-placeholder.jpg'">
                <h3>${name}</h3>
                <p><strong>Parents:</strong> ${parents}</p>
                <p>${desc}</p>
              </div>`;
}

function mixesPanel(breedName, intro, cards) {
  return `        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular ${breedName} Mix Breeds</h2>
            <p>${intro}</p>
            <div class="mix-grid">
${cards.join('\n')}
            </div>
          </div>
        </div><!-- end tab-mixes -->`;
}

function factsPanel(breedName, facts) {
  const items = facts.map(([emoji, title, text]) => `
            <div class="fun-fact-card">
              <div class="fun-fact-icon">${emoji}</div>
              <h3>${title}</h3>
              <p>${text}</p>
            </div>`).join('');
  return `        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Fun Facts About ${breedName}s</h2>
            <div class="fun-facts-grid">${items}
            </div>
          </div>
        </div><!-- end tab-facts -->`;
}

// ════════════════════════════════════════════════════════════════════════════
// BREED DATA
// ════════════════════════════════════════════════════════════════════════════
const breeds = {};

// ── Yorkshire Terrier ────────────────────────────────────────────────────────
breeds['yorkshire-terrier'] = {
  diet: dietPanel(
    'Yorkshire Terrier',
    'Yorkshire Terriers are tiny dogs — typically 4–7 lbs — with surprisingly big appetites relative to their size. Because of their small stomachs, Yorkies do best with multiple small meals per day using high-quality small-breed kibble.',
    [
      ['Puppy (2–12 mo)', '¼ – ½ cup/day', 'Split into 3–4 small meals; watch for hypoglycemia'],
      ['Adult (1–8 yr)', '½ – ¾ cup/day', '2 meals/day; small-breed formula recommended'],
      ['Senior (8+ yr)', '⅓ – ½ cup/day', 'Reduce as activity slows; watch dental health'],
    ]
  ),
  cost: costPanel(
    'Yorkshire Terrier',
    '$1,200 – $2,500',
    '$30 – $50',
    '$500 – $1,200',
    [
      ['Grooming (professional)', '$50 – $90/month'],
      ['Dental Cleanings', '$200 – $400/year'],
      ['Tracheal Collapse Treatment', '$500 – $3,000 (if needed)'],
    ],
    'Adopt from a rescue for $100–$400. Use at-home grooming between professional appointments to cut costs. Pet insurance (~$30/mo) is worthwhile given Yorkies\' tendency toward dental and tracheal issues.'
  ),
  mixes: mixesPanel(
    'Yorkshire Terrier',
    'Yorkies\' silky coats, bold personalities, and compact size make them popular in designer mixes. Most Yorkshire Terrier mixes inherit the Yorkie\'s feisty spirit and low-shedding coat.',
    [
      mixBlock('yorkipoo', 'Yorkipoo', `Yorkshire Terrier + ${ib('poodle','Poodle')}`, 'Playful, hypoallergenic-friendly, and wickedly smart. One of the most popular Yorkie mixes.'),
      mixBlock('shorkie', 'Shorkie', `Yorkshire Terrier + ${ib('shih-tzu','Shih Tzu')}`, 'Affectionate and fiercely loyal. Gets the silky coat of both parents — gorgeous but high-maintenance.'),
      mixBlock('morkie', 'Morkie', 'Yorkshire Terrier + Maltese', 'Tiny, fluffy, and social butterflies. Wonderful lap dogs for apartment living.'),
      mixBlock('biewer', 'Biewer Terrier', 'Yorkshire Terrier (tri-colored mutation)', 'A piebald variety developed in Germany in 1984. Now recognized as its own breed by the AKC.'),
    ]
  ),
  facts: factsPanel(
    'Yorkshire Terrier',
    [
      ['🐀', 'Born Ratters', 'Yorkies were bred in 19th-century Yorkshire, England to catch rats in clothing mills and mines. Despite their glamorous reputation today, they are fearless working terriers at heart.'],
      ['📦', 'Tiniest War Hero', 'Smoky, a 4-lb Yorkie found in a New Guinea jungle in 1944, served in WWII with Corporal William Wynne — running communications wire through a 70-foot pipe under an airfield, saving hundreds of lives.'],
      ['👑', 'Victorian Fashion Icon', 'By the late 1800s, Yorkies had become the dog of British high society. Wealthy women carried them in their purses — making the Yorkie the original "purse dog" 150 years before chihuahuas.'],
      ['🏆', 'Big Personality, Small Body', 'Yorkies consistently rank among the top 10 most popular breeds in the US despite weighing less than a standard bag of sugar. Their bold, almost cat-like independence makes them favorites in small apartments.'],
      ['🧬', 'Coat That Grows Like Hair', 'Unlike most dogs, Yorkies have hair rather than fur — it grows continuously, doesn\'t shed seasonally, and has a texture nearly identical to human hair. This makes them a top choice for allergy sufferers.'],
    ]
  ),
};

// ── Australian Shepherd ──────────────────────────────────────────────────────
breeds['australian-shepherd'] = {
  diet: dietPanel(
    'Australian Shepherd',
    'Australian Shepherds are high-energy working dogs that burn significant calories. Active Aussies need protein-rich, high-quality kibble. Adjust portions based on activity level — a working farm dog needs far more than a suburban pet.',
    [
      ['Puppy (2–12 mo)', '1½ – 2½ cups/day', 'Split into 3 meals; use large-breed puppy formula'],
      ['Active Adult (1–7 yr)', '2 – 3 cups/day', '2 meals/day; increase for working/agility dogs'],
      ['Less Active Adult', '1½ – 2 cups/day', 'Monitor weight carefully; Aussies gain weight when under-exercised'],
      ['Senior (7+ yr)', '1½ – 2 cups/day', 'Joint-support formula; watch for weight gain'],
    ]
  ),
  cost: costPanel(
    'Australian Shepherd',
    '$800 – $1,800',
    '$50 – $80',
    '$500 – $1,200',
    [
      ['Training Classes', '$100 – $300 (essential for Aussies)'],
      ['Dog Sports / Agility Fees', '$50 – $200/year'],
      ['MDR1 Gene Test', '$70 – $80 (one-time; important for medication safety)'],
    ],
    'Adopt from a breed rescue for $150–$400. The MDR1 genetic test is a one-time investment that can prevent dangerous drug reactions. Budget for training — a bored, untrained Aussie can be very destructive.'
  ),
  mixes: mixesPanel(
    'Australian Shepherd',
    'Aussies\' intelligence, athleticism, and striking coat patterns make them one of the most-mixed herding breeds. Most Australian Shepherd mixes are highly active and need plenty of mental stimulation.',
    [
      mixBlock('aussiedoodle', 'Aussiedoodle', `Australian Shepherd + ${ib('poodle','Poodle')}`, 'Incredibly smart, energetic, and low-shedding. One of the most popular Aussie mixes — great for active families.'),
      mixBlock('border-aussie', 'Border-Aussie', `Australian Shepherd + ${ib('border-collie','Border Collie')}`, 'The ultimate working dog hybrid — two of the world\'s smartest breeds combined. Needs a job or serious exercise daily.'),
      mixBlock('auggie', 'Auggie', 'Australian Shepherd + Corgi', 'Herding instincts in a shorter body. Energetic, loyal, and absolutely adorable with the Corgi\'s low-slung build.'),
      mixBlock('texas-heeler', 'Texas Heeler', 'Australian Shepherd + Australian Cattle Dog', 'A tried-and-true ranch dog combo. Tough, smart, and built for all-day work in any weather.'),
    ]
  ),
  facts: factsPanel(
    'Australian Shepherd',
    [
      ['🇺🇸', 'Not Actually Australian', 'Despite the name, Australian Shepherds were developed in the American West in the 1800s. They get the "Australian" part from Basque shepherds who came to the US via Australia — bringing their dogs with them.'],
      ['👁️', 'Eyes Like No Other', 'Aussies can have blue, brown, green, or amber eyes — or two different colored eyes (heterochromia), or even two colors within a single eye (sectoral heterochromia). Each dog\'s eyes are literally unique.'],
      ['🐄', 'The Cowboy\'s Dog', 'Aussies became iconic in the American West after WWII, rising to fame through rodeo performances with Jay Sisler. Their intelligence and agility made them superstars of the ranch circuit — and they\'ve never looked back.'],
      ['🧠', 'Problem Solvers', 'Australian Shepherds are ranked among the top 5 most intelligent dog breeds. They can learn new commands in as few as 5 repetitions and will figure out how to open gates, doors, and latches if bored.'],
      ['🌈', 'The Merle Coat', 'The Aussie\'s iconic merle pattern — swirls of color on a lighter base — is caused by the merle gene. Two merle parents should never be bred together, as "double merle" offspring often have severe vision and hearing impairments.'],
    ]
  ),
};

// ── Border Collie ────────────────────────────────────────────────────────────
breeds['border-collie'] = {
  diet: dietPanel(
    'Border Collie',
    'Border Collies are the world\'s premier working dogs and can burn enormous amounts of energy. Their diet must match their activity level precisely — an active working dog may need twice what a companion pet requires. High-quality protein is essential.',
    [
      ['Puppy (2–12 mo)', '1½ – 2½ cups/day', 'Split into 3 meals; avoid overfeeding to protect joints'],
      ['Working/Agility Adult', '2½ – 3½ cups/day', 'High-energy formula; fuel intensive activity'],
      ['Companion Adult (1–7 yr)', '1½ – 2 cups/day', '2 meals/day; reduce if weight gain occurs'],
      ['Senior (7+ yr)', '1½ – 2 cups/day', 'Joint-support formula; adjust for reduced activity'],
    ]
  ),
  cost: costPanel(
    'Border Collie',
    '$700 – $2,000',
    '$50 – $80',
    '$500 – $1,200',
    [
      ['Training / Sport Fees', '$200 – $500/year (highly recommended)'],
      ['Mental Enrichment Toys', '$50 – $150/year'],
      ['Hip/Eye Health Screening', '$100 – $300 (one-time)'],
    ],
    'Adopt from a Border Collie rescue for $150–$350. Investing in training and mental enrichment saves money long-term — a bored Border Collie will redecorate your house. Many owners compete in agility or herding trials, which replaces the dog\'s need for work.'
  ),
  mixes: mixesPanel(
    'Border Collie',
    'Border Collies\' unmatched intelligence and athleticism make them highly sought-after in designer mixes. Most Border Collie mixes require significant exercise and mental engagement.',
    [
      mixBlock('borderdoodle', 'Borderdoodle', `Border Collie + ${ib('poodle','Poodle')}`, 'Genius-level intelligence meets a low-shedding coat. One of the smartest mixed breeds you can own — needs a serious outlet for energy.'),
      mixBlock('border-aussie', 'Border-Aussie', `Border Collie + ${ib('australian-shepherd','Australian Shepherd')}`, 'Two world-class herding breeds in one dog. Incredible drive and athleticism — best for experienced, active owners.'),
      mixBlock('borador', 'Borador', `Border Collie + ${ib('labrador-retriever','Labrador Retriever')}`, 'Friendly, energetic, and highly trainable. The Lab\'s sociability softens the Border Collie\'s intense work drive.'),
      mixBlock('shollie', 'Shollie', `Border Collie + ${ib('german-shepherd','German Shepherd')}`, 'Loyal, protective, and brilliant. A working-dog powerhouse with strong herding and guarding instincts.'),
    ]
  ),
  facts: factsPanel(
    'Border Collie',
    [
      ['🧠', '#1 Smartest Dog in the World', 'Border Collies top virtually every canine intelligence ranking. Psychologist Stanley Coren\'s landmark study ranked them #1 out of 138 breeds for working and obedience intelligence. They understand new commands after fewer than 5 repetitions.'],
      ['🐑', 'The Stare', 'Border Collies control livestock using an intense, unwavering "eye" — a hypnotic stare that freezes sheep in their tracks. It\'s an instinct so powerful that Border Collies will try to "herd" children, cars, and even shadows.'],
      ['📚', 'Chaser Knew 1,022 Words', 'Chaser, a Border Collie from South Carolina, learned the names of 1,022 individual toys — more words than any non-human animal had ever been proven to understand. She could even categorize objects she\'d never seen before.'],
      ['🏆', 'Born to Compete', 'Border Collies dominate virtually every dog sport: agility, flyball, disc dog, herding trials, and obedience. They\'ve won the Westminster Kennel Club\'s Masters Agility Championship multiple times.'],
      ['⚡', 'Energy That Never Quits', 'A working Border Collie can run 50 miles in a single day while herding sheep. Without adequate exercise and mental stimulation, they become anxious and destructive. They are not suited for sedentary lifestyles — at all.'],
    ]
  ),
};

// ════════════════════════════════════════════════════════════════════════════
// SHARED PATTERNS
// ════════════════════════════════════════════════════════════════════════════
const old1 = '          </div>\n        </div>\n\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';
const new1 = (d) => '          </div>\n        </div>\n\n' + TAB_NAV + '\n        <div class="breed-tab-panel active" id="tab-profile">\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';

const old2 = '          </div>\n        </div>\n\n      </div>\n\n      <aside class="breed-sidebar">';
const new2 = (d) => '          </div>\n        </div>\n\n        </div><!-- end tab-profile -->\n\n'
  + d.diet + '\n' + d.cost + '\n' + d.mixes + '\n' + d.facts
  + '\n      </div>\n\n      <aside class="breed-sidebar">';

const old3 = '  <script src="../js/main.js"></script>\n  <script>';
const new3 = '  <script src="../js/main.js"></script>\n' + TAB_JS + '  <script>';

// ════════════════════════════════════════════════════════════════════════════
// PROCESS
// ════════════════════════════════════════════════════════════════════════════
function process(filename, breedKey) {
  const filepath = path.join(BASE, filename);
  let html = fs.readFileSync(filepath, 'utf8').replace(/\r\n/g, '\n');
  const d = breeds[breedKey];

  if (!html.includes(old1)) throw new Error(`Pattern 1 not found in ${filename}`);
  html = html.replace(old1, new1(d));

  if (!html.includes(old2)) throw new Error(`Pattern 2 not found in ${filename}`);
  html = html.replace(old2, new2(d));

  if (!html.includes(old3)) throw new Error(`Pattern 3 not found in ${filename}`);
  html = html.replace(old3, new3);

  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ ${filename} updated`);
}

process('yorkshire-terrier.html', 'yorkshire-terrier');
process('australian-shepherd.html', 'australian-shepherd');
process('border-collie.html', 'border-collie');

console.log('\n✅ Batch 5 complete: yorkshire-terrier, australian-shepherd, border-collie');
