// Batch 6: cavalier-king-charles, bernese-mountain-dog, corgi
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'breeds');

const TAB_NAV = `        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>`;

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

function ib(slug, label) {
  return `<a href="/breeds/${slug}.html">${label}</a>`;
}

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

// ── Cavalier King Charles Spaniel ────────────────────────────────────────────
breeds['cavalier-king-charles'] = {
  diet: dietPanel(
    'Cavalier King Charles Spaniel',
    'Cavaliers are gentle, moderate-energy dogs that tend toward weight gain if overfed. Because obesity worsens their predisposition to heart disease (MVD), portion control and a heart-healthy diet are especially important for this breed.',
    [
      ['Puppy (2–12 mo)', '½ – 1 cup/day', 'Split into 3 meals; use small-breed puppy formula'],
      ['Adult (1–8 yr)', '¾ – 1½ cups/day', '2 meals/day; measure carefully — Cavaliers love food'],
      ['Senior (8+ yr)', '½ – 1 cup/day', 'Reduce portions; consider cardiac-support formula'],
    ]
  ),
  cost: costPanel(
    'Cavalier King Charles Spaniel',
    '$1,500 – $3,500',
    '$40 – $60',
    '$800 – $2,500',
    [
      ['Cardiac Screening (echocardiogram)', '$200 – $400/year (recommended annually after age 5)'],
      ['Syringomyelia MRI Screening', '$1,000 – $2,500 (if symptoms appear)'],
      ['Grooming', '$50 – $80/month'],
    ],
    'Adopt from a Cavalier rescue for $200–$500. Pet insurance is especially worthwhile for this breed — heart disease affects over half of all Cavaliers by age 5. Annual cardiac checkups are a smart investment to catch MVD early.'
  ),
  mixes: mixesPanel(
    'Cavalier King Charles Spaniel',
    'Cavaliers\' gentle temperament and silky good looks make them one of the most popular breeds for designer crosses. Most Cavalier mixes inherit the breed\'s loving, adaptable nature.',
    [
      mixBlock('cavapoo', 'Cavapoo', `Cavalier King Charles + ${ib('poodle','Poodle')}`, 'The most popular Cavalier mix — combines the Cavalier\'s sweet nature with the Poodle\'s low-shedding coat. Ideal for allergy sufferers.'),
      mixBlock('cavachon', 'Cavachon', 'Cavalier King Charles + Bichon Frisé', 'Fluffy, gentle, and endlessly affectionate. A wonderful companion for families, seniors, and apartment dwellers.'),
      mixBlock('cavador', 'Cavador', `Cavalier King Charles + ${ib('labrador-retriever','Labrador Retriever')}`, 'Friendly, playful, and easy-going. Gets the Lab\'s energetic spirit paired with the Cavalier\'s calm sweetness.'),
      mixBlock('cava-tzu', 'Cava-Tzu', `Cavalier King Charles + ${ib('shih-tzu','Shih Tzu')}`, 'A silky, social lap dog. Combines two breeds bred purely for companionship — the result is pure affection.'),
    ]
  ),
  facts: factsPanel(
    'Cavalier King Charles Spaniel',
    [
      ['👑', 'Named for a King', 'The breed is named after King Charles II of England (1630–1685), who was so obsessed with his spaniels that he reportedly issued a royal decree allowing them into any public building — including Parliament.'],
      ['❤️', 'Heart Dog — Literally', 'Cavaliers are nicknamed "the heart dog" for two reasons: their loving personality AND their predisposition to mitral valve disease. Over 50% develop a heart murmur by age 5 and nearly all are affected by age 10.'],
      ['🖼️', 'Painted into History', 'Cavaliers appear in paintings by Van Dyck, Gainsborough, and Titian spanning 400 years. They were a constant fixture in European royal portraits — living symbols of aristocratic status.'],
      ['📺', 'Charlotte\'s Dog on Sex and the City', 'Charlotte York\'s beloved Cavalier "Elizabeth Taylor" became one of TV\'s most famous dogs, introducing millions of Americans to the breed and sparking a surge in Cavalier popularity in the early 2000s.'],
      ['🧸', 'Born Therapy Dogs', 'Cavaliers are among the top therapy dog breeds worldwide. Their calm, intuitive nature — and love of sitting in laps — makes them naturals in hospitals, nursing homes, and schools.'],
    ]
  ),
};

// ── Bernese Mountain Dog ─────────────────────────────────────────────────────
breeds['bernese-mountain-dog'] = {
  diet: dietPanel(
    'Bernese Mountain Dog',
    'Berners are large, gentle working dogs originally bred to pull carts in the Swiss Alps. They need a large-breed diet that supports their joints and manages weight carefully. Slow growth during puppyhood is critical to prevent skeletal issues.',
    [
      ['Puppy (2–12 mo)', '3 – 5 cups/day', 'Large-breed puppy formula ONLY; prevents too-rapid growth'],
      ['Adult (1–6 yr)', '4 – 6 cups/day', 'Split into 2 meals; elevated bowl may help digestion'],
      ['Senior (6+ yr)', '3 – 4 cups/day', 'Joint-support formula; Berners age faster than smaller breeds'],
    ]
  ),
  cost: costPanel(
    'Bernese Mountain Dog',
    '$1,200 – $3,000',
    '$70 – $100',
    '$700 – $1,500',
    [
      ['Hip/Elbow Dysplasia Treatment', '$3,000 – $6,000 (if needed)'],
      ['Cancer Screening / Treatment', '$2,000 – $10,000+ (Berners have high cancer rates)'],
      ['Grooming', '$70 – $120/month (heavy shedder)'],
    ],
    'Adopt from a Berner rescue for $200–$500. Pet insurance is strongly recommended — Bernese Mountain Dogs have one of the highest cancer rates of any breed (nearly 50% die from cancer). Budget for joint care, as hip dysplasia is common.'
  ),
  mixes: mixesPanel(
    'Bernese Mountain Dog',
    'Berners\' striking tri-color coat, gentle giant temperament, and loving nature make them increasingly popular in designer mixes. Most Bernese mixes are large, affectionate, and family-oriented.',
    [
      mixBlock('bernedoodle', 'Bernedoodle', `Bernese Mountain Dog + ${ib('poodle','Poodle')}`, 'The most popular Berner mix — combines the Bernese\'s loyalty and the Poodle\'s low-shedding coat. Often inherits the gorgeous tri-color pattern.'),
      mixBlock('great-bernese', 'Great Bernese', `Bernese Mountain Dog + ${ib('great-dane','Great Dane')}`, 'A gentle giant squared. Incredibly loving and calm — but truly enormous. Not for small homes.'),
      mixBlock('euro-mountain-sheparnese', 'Euro Mountain Sheparnese', `Bernese Mountain Dog + ${ib('german-shepherd','German Shepherd')}`, 'Loyal, intelligent, and strikingly beautiful. Gets the Berner\'s calm nature with the Shepherd\'s protective instinct.'),
      mixBlock('labernese', 'Labernese', `Bernese Mountain Dog + ${ib('labrador-retriever','Labrador Retriever')}`, 'Friendly, gentle, and great with kids. Combines two of the world\'s most beloved family breeds. Often used as service dogs.'),
    ]
  ),
  facts: factsPanel(
    'Bernese Mountain Dog',
    [
      ['🇨🇭', 'Swiss Alpine Heritage', 'Bernese Mountain Dogs come from the canton of Bern in Switzerland, where they worked as farm dogs for 2,000+ years — pulling milk carts, herding cattle, and acting as watchdogs for Swiss farmers.'],
      ['🎨', 'The Tri-Color Coat', 'The Berner\'s iconic jet-black, white, and rust coat is one of the most recognizable in dogdom. Breed standards require a white "Swiss cross" on the chest and a white blaze on the face — no two are exactly alike.'],
      ['💔', 'A Short Life Well Loved', 'Berners have one of the shortest lifespans of any breed — typically just 6–8 years. Nearly 50% die from cancer. Owners often say: "The only problem with a Berner is they don\'t live long enough."'],
      ['💪', 'Cart-Pulling Champions', 'A Bernese Mountain Dog can pull up to 1,000 lbs — roughly 10 times their own body weight. Cart-pulling competitions (called "drafting") are still held today, honoring their working heritage.'],
      ['🌟', 'Late to America', 'Despite their long Swiss history, Berners didn\'t arrive in the United States until 1926 — brought by farmer Isaac Scheiss of Kansas. The AKC recognized the breed in 1937, and their popularity has surged ever since.'],
    ]
  ),
};

// ── Corgi ────────────────────────────────────────────────────────────────────
breeds['corgi'] = {
  diet: dietPanel(
    'Corgi',
    'Corgis are surprisingly energetic herding dogs in a compact body — but they\'re also notorious for overeating and obesity. Their long backs make weight gain especially dangerous, as extra pounds put severe strain on their spines. Strict portion control is essential.',
    [
      ['Puppy (2–12 mo)', '¾ – 1½ cups/day', 'Split into 3 meals; medium-breed puppy formula'],
      ['Active Adult (1–10 yr)', '1 – 1½ cups/day', '2 meals/day; measure precisely — Corgis are opportunistic eaters'],
      ['Senior (10+ yr)', '¾ – 1 cup/day', 'Reduce portions; joint-support formula recommended'],
    ]
  ),
  cost: costPanel(
    'Corgi',
    '$1,000 – $2,200',
    '$40 – $60',
    '$500 – $1,200',
    [
      ['Spinal (IVDD) Treatment', '$3,000 – $8,000 (if surgery needed)'],
      ['Hip Dysplasia Treatment', '$1,500 – $4,000 (if needed)'],
      ['Grooming', '$40 – $70/month (heavy seasonal shedder)'],
    ],
    'Adopt from a Corgi rescue for $150–$400. Pet insurance is highly recommended — spinal problems (IVDD) can require expensive surgery. Keep your Corgi at a lean weight; it\'s the single best thing you can do for their long-term health.'
  ),
  mixes: mixesPanel(
    'Corgi',
    'Corgis\' fox-like face, stumpy legs, and herding intelligence make them one of the internet\'s favorite breeds — and popular in designer crosses. Most Corgi mixes inherit those legendary short legs and big personality.',
    [
      mixBlock('corgi-poodle', 'Corgipoo', `Corgi + ${ib('poodle','Poodle')}`, 'Fluffy, smart, and low-shedding with that iconic Corgi build. Highly trainable and endlessly entertaining.'),
      mixBlock('horgi', 'Horgi', `Corgi + ${ib('siberian-husky','Siberian Husky')}`, 'The Husky\'s stunning markings on a Corgi\'s body — and double the energy. One of the most eye-catching mixed breeds around.'),
      mixBlock('auggie', 'Auggie', `Corgi + ${ib('australian-shepherd','Australian Shepherd')}`, 'Two herding breeds combined — intelligent, energetic, and fiercely loyal. Often inherits the Aussie\'s beautiful merle coloring.'),
      mixBlock('corgi-golden', 'Golden Corgi', `Corgi + ${ib('golden-retriever','Golden Retriever')}`, 'The Golden\'s warm personality in a lower-slung body. Friendly, fluffy, and absolutely irresistible.'),
    ]
  ),
  facts: factsPanel(
    'Corgi',
    [
      ['👸', 'The Queen\'s Dog', 'Queen Elizabeth II owned more than 30 Pembroke Welsh Corgis during her 70-year reign — making them the most famous royal dogs in history. Her first Corgi, Susan, was a gift for her 18th birthday in 1944.'],
      ['🌐', 'Internet Royalty', 'Corgis are arguably the most meme\'d and photographed dog breed on the internet. The image of a Corgi\'s fluffy rear — nicknamed "the Corgi butt" — has its own dedicated fan communities with millions of followers.'],
      ['🐄', 'Viking Herding Dogs', 'Welsh legends say Corgis were the preferred mounts of fairy warriors. Historically, Pembroke Corgis were brought to Wales by Flemish weavers around 1107 AD, where they herded cattle by nipping at heels.'],
      ['✂️', 'Two Distinct Breeds', 'There are actually two Corgi breeds: the Pembroke Welsh Corgi (no tail, more popular) and the Cardigan Welsh Corgi (with a long tail, more ancient). They were only separated into distinct breeds by the Kennel Club in 1934.'],
      ['🏃', 'Tiny Legs, Real Speed', 'Don\'t let the short legs fool you — Corgis can run up to 25 mph and were built to cover miles of Welsh farmland daily. They need far more exercise than their size suggests. A bored Corgi will herd your children.'],
    ]
  ),
};

// ════════════════════════════════════════════════════════════════════════════
// PATTERNS & PROCESS
// ════════════════════════════════════════════════════════════════════════════
const old1 = '          </div>\n        </div>\n\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';
const old2 = '          </div>\n        </div>\n\n      </div>\n\n      <aside class="breed-sidebar">';
const old3 = '  <script src="../js/main.js"></script>\n  <script>';

function process(filename, breedKey) {
  const filepath = path.join(BASE, filename);
  let html = fs.readFileSync(filepath, 'utf8').replace(/\r\n/g, '\n');
  const d = breeds[breedKey];

  if (!html.includes(old1)) throw new Error(`Pattern 1 not found in ${filename}`);
  html = html.replace(old1,
    '          </div>\n        </div>\n\n' + TAB_NAV + '\n        <div class="breed-tab-panel active" id="tab-profile">\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>'
  );

  if (!html.includes(old2)) throw new Error(`Pattern 2 not found in ${filename}`);
  html = html.replace(old2,
    '          </div>\n        </div>\n\n        </div><!-- end tab-profile -->\n\n'
    + d.diet + '\n' + d.cost + '\n' + d.mixes + '\n' + d.facts
    + '\n      </div>\n\n      <aside class="breed-sidebar">'
  );

  if (!html.includes(old3)) throw new Error(`Pattern 3 not found in ${filename}`);
  html = html.replace(old3, '  <script src="../js/main.js"></script>\n' + TAB_JS + '  <script>');

  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ ${filename} updated`);
}

process('cavalier-king-charles.html', 'cavalier-king-charles');
process('bernese-mountain-dog.html', 'bernese-mountain-dog');
process('corgi.html', 'corgi');

console.log('\n✅ Batch 6 complete: cavalier-king-charles, bernese-mountain-dog, corgi');
