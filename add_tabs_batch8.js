// Batch 8 (FINAL): maltese, dalmatian
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

// ── Maltese ──────────────────────────────────────────────────────────────────
breeds['maltese'] = {
  diet: dietPanel(
    'Maltese',
    'Maltese are tiny, elegant dogs — typically 4–7 lbs — with fast metabolisms and small stomachs. They need calorie-dense small-breed kibble split into multiple meals. Hypoglycemia (low blood sugar) is a real risk in puppies and very small adults, so never skip meals.',
    [
      ['Puppy (2–12 mo)', '¼ – ½ cup/day', '3–4 tiny meals/day; watch closely for hypoglycemia'],
      ['Adult (1–10 yr)', '¼ – ½ cup/day', '2–3 meals/day; small-breed formula; measure carefully'],
      ['Senior (10+ yr)', '¼ – ⅓ cup/day', 'Softer food if dental issues arise; reduce if less active'],
    ]
  ),
  cost: costPanel(
    'Maltese',
    '$1,000 – $3,000',
    '$25 – $40',
    '$400 – $900',
    [
      ['Professional Grooming', '$50 – $90/visit (every 4–6 weeks)'],
      ['Dental Cleanings', '$200 – $400/year (Maltese are highly prone to dental disease)'],
      ['Tear Stain Treatment', '$10 – $30/month'],
    ],
    'Adopt from a Maltese rescue for $100–$300. Their food costs are among the lowest of any breed. The biggest ongoing expenses are grooming and dental care — brushing teeth daily and learning basic home grooming can significantly cut annual costs.'
  ),
  mixes: mixesPanel(
    'Maltese',
    'The Maltese\'s silky white coat, gentle temperament, and tiny size make them one of the most popular toy breeds for designer crosses. Most Maltese mixes are low-shedding, affectionate, and perfectly suited to apartment living.',
    [
      mixBlock('maltipoo', 'Maltipoo', `Maltese + ${ib('poodle','Poodle')}`, 'One of America\'s most beloved toy mixes — gentle, low-shedding, and endlessly affectionate. Perfect for seniors, singles, and apartment dwellers.'),
      mixBlock('morkie', 'Morkie', `Maltese + ${ib('yorkshire-terrier','Yorkshire Terrier')}`, 'Tiny, spunky, and covered in silky hair. Gets the Yorkie\'s feistiness softened by the Maltese\'s sweet nature.'),
      mixBlock('malshi', 'Mal-Shi', `Maltese + ${ib('shih-tzu','Shih Tzu')}`, 'Fluffy, calm, and deeply loving. Two ancient companion breeds combined into one adorable, low-energy lap dog.'),
      mixBlock('maltichon', 'Maltichon', `Maltese + Bichon Frisé`, 'Cloud-like and cheerful. Both parent breeds were bred purely for companionship — the result is a gentle, happy, powder-puff of a dog.'),
    ]
  ),
  facts: factsPanel(
    'Maltese',
    [
      ['🏛️', '2,800 Years of History', 'The Maltese is one of the oldest dog breeds in existence. Ancient Greeks and Romans adored them — Aristotle mentioned the breed around 370 BC, and Maltese dogs appear in Egyptian tombs, Greek ceramics, and Roman poetry.'],
      ['👑', 'The Aristocrat\'s Companion', 'For millennia, Maltese were exclusively owned by nobility and royalty. Mary Queen of Scots, Queen Elizabeth I, and Marie Antoinette all kept Maltese. Their association with wealth and status earned them the nickname "The Comforter of Kings."'],
      ['🦴', 'No Shedding — No Fur', 'Like Yorkshire Terriers, Maltese have hair rather than fur. It grows continuously and barely sheds, making them an excellent choice for allergy sufferers. The trade-off: without regular grooming, their coat mats severely.'],
      ['💨', 'Fearless Despite Their Size', 'Don\'t let the silk and white coat fool you — Maltese are surprisingly bold and have been known to take on much larger dogs. Ancient Romans called them "the fearless ones," and modern Maltese still carry that confident, stubborn streak.'],
      ['🌡️', 'Cold Weather Warning', 'Maltese have no undercoat and very little body fat, making them extremely sensitive to cold. Many owners dress them in sweaters during winter — not just for looks, but genuine protection against hypothermia on cold days.'],
    ]
  ),
};

// ── Dalmatian ────────────────────────────────────────────────────────────────
breeds['dalmatian'] = {
  diet: dietPanel(
    'Dalmatian',
    'Dalmatians have a unique urinary system that processes protein differently from other breeds — they produce uric acid rather than allantoin, making them prone to urate bladder stones. They need a LOW-PURINE diet with moderate protein, and must drink plenty of water daily to flush their system.',
    [
      ['Puppy (2–12 mo)', '1½ – 2½ cups/day', 'Low-purine puppy formula; avoid organ meats and game'],
      ['Adult (1–8 yr)', '2½ – 3½ cups/day', '2 meals/day; low-purine kibble; encourage water intake always'],
      ['Senior (8+ yr)', '2 – 2½ cups/day', 'Continue low-purine diet; monitor for stone symptoms'],
    ]
  ),
  cost: costPanel(
    'Dalmatian',
    '$800 – $1,500',
    '$50 – $80',
    '$500 – $1,200',
    [
      ['Urinary Stone Treatment/Surgery', '$1,500 – $4,000 (if needed)'],
      ['BAER Hearing Test (puppy)', '$50 – $100 (one-time; ~30% of Dals have hearing loss)'],
      ['Training Classes', '$150 – $350 (high-energy breed; training is essential)'],
    ],
    'Adopt from a Dalmatian rescue for $150–$350 — many are surrendered by owners who underestimated their energy needs. The specialized low-purine diet is non-negotiable and may cost slightly more than standard kibble. Budget for hearing tests and training from day one.'
  ),
  mixes: mixesPanel(
    'Dalmatian',
    'Dalmatians\' striking spotted coat and athletic build make them increasingly popular in designer crosses. Most Dalmatian mixes are high-energy, athletic, and benefit from owners who lead active lifestyles.',
    [
      mixBlock('dalmatian', 'Dalmatian Lab Mix', `Dalmatian + ${ib('labrador-retriever','Labrador Retriever')}`, 'Energetic, friendly, and strikingly spotted. The Lab\'s sociable nature perfectly complements the Dalmatian\'s athleticism and independence.'),
      mixBlock('dalmatian', 'Dalmatian Pointer Mix', `Dalmatian + Pointer`, 'A hunting-dog powerhouse. Both parents are athletic, driven sporting dogs — this mix has incredible stamina and a nose built for the field.'),
      mixBlock('dalmatian', 'Bodacion', `Dalmatian + ${ib('border-collie','Border Collie')}`, 'Brilliant and beautiful. Gets the Border Collie\'s legendary intelligence with the Dalmatian\'s speed and striking spotted coat.'),
      mixBlock('dalmatian', 'Dalmatian Husky Mix', `Dalmatian + ${ib('siberian-husky','Siberian Husky')}`, 'Two strikingly beautiful, high-energy breeds combined. Stunning to look at, endlessly active — best for very experienced, outdoorsy owners.'),
    ]
  ),
  facts: factsPanel(
    'Dalmatian',
    [
      ['🎬', '101 Dalmatians Effect', 'Disney\'s 1961 animated film (and the 1996 live-action remake) caused massive surges in Dalmatian popularity — followed by waves of surrenders as families discovered the breed\'s intense energy needs. Animal shelters call this the "101 Dalmatians effect."'],
      ['🚒', 'Official Firehouse Dog', 'Dalmatians ran alongside horse-drawn fire carriages in the 1800s, clearing the path and calming the horses. Their bond with firehouses was so strong that they became the official mascot of the US fire service — a tradition that continues today.'],
      ['🐆', 'Born White, Spots Come Later', 'Dalmatian puppies are born completely white. Their iconic black (or liver) spots don\'t appear until around 3–4 weeks of age and continue developing for the first year. No two Dalmatians have the same spot pattern.'],
      ['👂', 'Deafness Is Common', 'Approximately 30% of Dalmatians are born deaf in one or both ears due to the same genetic pigmentation gene that causes their spots. Responsible breeders BAER-test all puppies before placement. Deaf Dalmatians can live full, happy lives with experienced owners.'],
      ['🏃', 'Endurance Champions', 'Dalmatians were bred to run alongside horse-drawn carriages for miles at a time — sometimes 20–30 miles per day. They have extraordinary stamina and need far more exercise than most people expect. Without it, they become destructive and anxious.'],
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

process('maltese.html', 'maltese');
process('dalmatian.html', 'dalmatian');

console.log('\n🎉 Batch 8 complete: maltese, dalmatian — ALL 24 BREEDS DONE!');
