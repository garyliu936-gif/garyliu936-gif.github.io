// Batch 7: goldendoodle, chihuahua, doberman-pinscher
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

// ── Goldendoodle ─────────────────────────────────────────────────────────────
breeds['goldendoodle'] = {
  diet: dietPanel(
    'Goldendoodle',
    'Goldendoodles vary widely in size — from under 15 lbs (miniature) to over 70 lbs (standard) — so portion sizes depend heavily on the specific dog. Feed a high-quality formula appropriate for your dog\'s size category. All Goldendoodles benefit from the omega-3 fatty acids that support their wavy or curly coats.',
    [
      ['Mini Puppy (2–12 mo)', '¾ – 1½ cups/day', 'Small-breed puppy formula; 3 meals/day'],
      ['Standard Puppy (2–12 mo)', '2 – 3 cups/day', 'Large-breed puppy formula; 3 meals/day'],
      ['Mini Adult (1–10 yr)', '1 – 1½ cups/day', '2 meals/day; watch for weight gain'],
      ['Standard Adult (1–10 yr)', '2½ – 3½ cups/day', '2 meals/day; adjust for activity level'],
      ['Senior (8+ yr)', 'Reduce by 10–20%', 'Joint-support formula; monitor weight closely'],
    ]
  ),
  cost: costPanel(
    'Goldendoodle',
    '$1,500 – $3,500',
    '$50 – $90',
    '$500 – $1,200',
    [
      ['Professional Grooming', '$75 – $150/visit (every 6–8 weeks)'],
      ['Annual Grooming Total', '$600 – $1,800/year'],
      ['Hip Dysplasia Screening', '$200 – $400 (recommended)'],
    ],
    'Adopt from a Doodle rescue for $200–$500. Grooming is the biggest ongoing cost — learn basic trimming at home to stretch professional appointments to every 8–10 weeks. Buying from an OFA health-tested breeder reduces long-term vet costs significantly.'
  ),
  mixes: mixesPanel(
    'Goldendoodle',
    'Since a Goldendoodle is itself a mix (Golden Retriever + Poodle), many breeders create "multi-generational" crosses or breed Goldendoodles with other dogs for specific traits. Here are the most popular Goldendoodle-related crosses.',
    [
      mixBlock('goldendoodle', 'Double Doodle', `Goldendoodle + ${ib('labrador-retriever','Labrador Retriever')} or Labradoodle`, 'Friendly, low-shedding, and highly social. Combines three beloved breeds into one easy-going, family-friendly companion.'),
      mixBlock('goldendoodle', 'Mini Goldendoodle', `${ib('golden-retriever','Golden Retriever')} + Miniature ${ib('poodle','Poodle')}`, 'All the personality of a standard Goldendoodle in a compact 15–35 lb package. Perfect for apartments and smaller homes.'),
      mixBlock('goldendoodle', 'Petite Goldendoodle', `Goldendoodle + Cocker Spaniel`, 'Tiny, fluffy, and incredibly sweet-natured. One of the most gentle and affectionate of all Doodle variations.'),
      mixBlock('goldendoodle', 'F1B Goldendoodle', `Goldendoodle + ${ib('poodle','Poodle')} (backcross)`, '75% Poodle genetics — the lowest-shedding Goldendoodle generation. Ideal for allergy sufferers who love the Doodle look.'),
    ]
  ),
  facts: factsPanel(
    'Goldendoodle',
    [
      ['🌟', 'Born in the 1990s', 'The Goldendoodle was first intentionally bred in 1969 by Monica Dickens, but rose to mainstream popularity in the early 1990s — right after the Labradoodle proved that Poodle mixes could be low-shedding guide dogs.'],
      ['🤧', 'The "Hypoallergenic" Myth', 'No dog is truly hypoallergenic — all dogs produce the Fel d 1 protein that triggers allergies. But Goldendoodles (especially F1B generations) shed far less dander than most breeds, making them much more tolerable for many allergy sufferers.'],
      ['🎭', 'Three Coat Types', 'Goldendoodles can have straight, wavy, or curly coats depending on which parent\'s genes dominate. Curlier coats shed less but require more grooming; straighter coats are easier to maintain but shed more.'],
      ['🏆', 'America\'s Most Popular Doodle', 'Goldendoodles consistently rank as the #1 most popular designer dog breed in the United States, outpacing Labradoodles, Bernedoodles, and all other Poodle crosses in registered litters and online searches.'],
      ['🦮', 'Therapy and Service Stars', 'Goldendoodles are among the most widely used therapy and service dog breeds — combining the Golden\'s intuitive emotional intelligence with the Poodle\'s trainability. They serve in hospitals, schools, and as mobility and psychiatric service dogs.'],
    ]
  ),
};

// ── Chihuahua ────────────────────────────────────────────────────────────────
breeds['chihuahua'] = {
  diet: dietPanel(
    'Chihuahua',
    'Chihuahuas are the world\'s smallest breed — typically 2–6 lbs — but have fast metabolisms and need calorie-dense, small-breed kibble. Their tiny stomachs require multiple small meals, and they\'re extremely prone to hypoglycemia (low blood sugar) as puppies if they skip meals.',
    [
      ['Puppy (2–12 mo)', '¼ – ½ cup/day', '3–4 tiny meals/day; watch for hypoglycemia signs'],
      ['Adult (1–10 yr)', '¼ – ½ cup/day', '2–3 meals/day; small-breed formula essential'],
      ['Senior (10+ yr)', '¼ – ⅓ cup/day', 'Softer food if dental issues; reduce if less active'],
    ]
  ),
  cost: costPanel(
    'Chihuahua',
    '$500 – $1,500',
    '$20 – $35',
    '$400 – $900',
    [
      ['Dental Cleanings', '$200 – $400/year (Chis are prone to severe dental disease)'],
      ['Patellar Luxation Surgery', '$1,500 – $3,000 (if needed)'],
      ['Clothing (optional but practical)', '$20 – $100/year (Chihuahuas get cold easily)'],
    ],
    'Adopt from a rescue for $50–$200 — Chihuahuas are the most surrendered breed in the US. Their food cost is minimal, but dental care is their biggest health expense. Brush their teeth daily and budget for annual professional cleanings.'
  ),
  mixes: mixesPanel(
    'Chihuahua',
    'Chihuahuas\' small size and big personality make them popular in toy-breed designer crosses. Most Chihuahua mixes are compact, spirited, and intensely loyal to their owners.',
    [
      mixBlock('chihuahua', 'Chion', `Chihuahua + Papillon`, 'Butterfly-eared and feisty. Gets the Papillon\'s elegant looks with the Chihuahua\'s bold attitude — a tiny dog with enormous presence.'),
      mixBlock('chihuahua', 'Chi-Poo', `Chihuahua + ${ib('poodle','Poodle')}`, 'Clever, low-shedding, and surprisingly athletic. The Poodle\'s intelligence amplifies the Chihuahua\'s already sharp mind.'),
      mixBlock('chihuahua', 'Chorkie', `Chihuahua + ${ib('yorkshire-terrier','Yorkshire Terrier')}`, 'Tiny, feisty, and silky-coated. Both parents are bold terrier types — this mix has no idea how small it is.'),
      mixBlock('chihuahua', 'Cheagle', `Chihuahua + ${ib('beagle','Beagle')}`, 'Curious and scent-driven with the Chihuahua\'s compact frame. A surprisingly energetic little hound with a big nose for adventure.'),
    ]
  ),
  facts: factsPanel(
    'Chihuahua',
    [
      ['🌎', 'Ancient Mexican Roots', 'Chihuahuas are descended from the Techichi, a small companion dog kept by the ancient Toltec civilization in Mexico as far back as the 9th century AD. The breed is named after the Mexican state of Chihuahua, where they were rediscovered in the 1850s.'],
      ['🧠', 'Biggest Brain-to-Body Ratio', 'Chihuahuas have the largest brain relative to body size of any dog breed. This may explain their quick learning ability — and their tendency to think they\'re in charge of much larger dogs.'],
      ['💪', 'Fearless to a Fault', 'Chihuahuas consistently rank among the most aggressive breeds in studies of dog behavior — not because they\'re dangerous, but because they have zero sense of their own size. They will challenge dogs 10 times their weight without hesitation.'],
      ['📺', 'Taco Bell Icon', 'The Taco Bell Chihuahua ("¡Yo quiero Taco Bell!") ran from 1997–2000 and became one of the most recognized advertising characters in fast food history. The dog\'s real name was Gidget, and she was a female playing a male character.'],
      ['⏳', 'Longest-Lived Dog Breed', 'Chihuahuas regularly live 15–20 years — making them one of the longest-lived dog breeds in the world. A well-cared-for Chihuahua can outlive many larger breeds by nearly a decade.'],
    ]
  ),
};

// ── Doberman Pinscher ────────────────────────────────────────────────────────
breeds['doberman-pinscher'] = {
  diet: dietPanel(
    'Doberman Pinscher',
    'Dobermans are lean, muscular working dogs that need a high-protein diet to maintain their athletic build. They\'re prone to bloat (GDV) — a life-threatening stomach condition — so feeding habits matter as much as food quality. Never exercise right after meals.',
    [
      ['Puppy (2–12 mo)', '2 – 3 cups/day', 'Large-breed puppy formula; 3 meals/day to prevent bloat'],
      ['Active Adult (1–7 yr)', '3 – 4 cups/day', '2 meals/day minimum; space meals 8+ hours apart'],
      ['Senior (7+ yr)', '2½ – 3 cups/day', 'Joint-support formula; monitor for weight loss (common in seniors)'],
    ]
  ),
  cost: costPanel(
    'Doberman Pinscher',
    '$1,500 – $2,500',
    '$60 – $90',
    '$600 – $1,500',
    [
      ['Dilated Cardiomyopathy (DCM) Screening', '$300 – $600/year (Dobermans have very high DCM rates)'],
      ['Training Classes', '$150 – $400 (essential for this powerful breed)'],
      ['Bloat/GDV Surgery', '$3,000 – $7,000 (if needed; preventive gastropexy ~$400)'],
    ],
    'Adopt from a Doberman rescue for $150–$400. A preventive gastropexy (stomach tacking surgery) performed at the time of spay/neuter costs ~$400 and can prevent the $5,000+ emergency of GDV. Annual cardiac screening is non-negotiable for this breed.'
  ),
  mixes: mixesPanel(
    'Doberman Pinscher',
    'Dobermans\' sleek build, intelligence, and loyal temperament make them increasingly popular in working-dog crosses. Most Doberman mixes are alert, athletic, and form deep bonds with their owners.',
    [
      mixBlock('doberman', 'Doberdoodle', `Doberman Pinscher + ${ib('poodle','Poodle')}`, 'Athletic and low-shedding with exceptional intelligence. Combines the Doberman\'s loyalty and protection instincts with the Poodle\'s trainability.'),
      mixBlock('doberman', 'Doberhuahua', `Doberman Pinscher + ${ib('chihuahua','Chihuahua')}`, 'A surprisingly common mix — gets the Doberman\'s alertness in a much smaller body. Bold, loyal, and always on guard.'),
      mixBlock('doberman', 'Doberman Shepherd', `Doberman Pinscher + ${ib('german-shepherd','German Shepherd')}`, 'A premier protection dog hybrid. Both parent breeds are among the world\'s top working dogs — this mix has incredible drive, loyalty, and trainability.'),
      mixBlock('doberman', 'Rotterman', `Doberman Pinscher + ${ib('rottweiler','Rottweiler')}`, 'Powerful, confident, and deeply loyal. Two of Germany\'s great working breeds combined — best for experienced owners who provide firm, consistent training.'),
    ]
  ),
  facts: factsPanel(
    'Doberman Pinscher',
    [
      ['👨', 'Created by One Man', 'The Doberman was developed in the 1890s by Louis Dobermann, a German tax collector who wanted the ideal personal protection dog for his dangerous rounds. He had access to the local dog pound and selectively bred the perfect guardian — we still don\'t know exactly which breeds he used.'],
      ['🎖️', 'War Heroes', 'During WWII, the US Marine Corps used Dobermans as their official war dogs in the Pacific. Twenty-five Dobermans died in the Battle of Guam in 1944. A bronze statue called "Always Faithful" at the National War Dog Cemetery in Guam honors them.'],
      ['❤️', 'Velcro Dogs', 'Despite their intimidating reputation, Dobermans are known as "velcro dogs" — they follow their owners from room to room and demand physical closeness. They\'re among the most emotionally sensitive and human-bonded of all large breeds.'],
      ['🏆', 'Elite Police and Military Record', 'Dobermans served as the US military\'s preferred war dog breed in both World Wars and became synonymous with K-9 police work. Today they\'re still used in police, military, and personal protection roles worldwide.'],
      ['💔', 'A Shortened Lifespan', 'Dobermans live only 10–12 years on average, and over half develop dilated cardiomyopathy (DCM) — a serious heart condition. Responsible breeders screen for cardiac disease, and annual echocardiograms are strongly recommended starting at age 2.'],
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

process('goldendoodle.html', 'goldendoodle');
process('chihuahua.html', 'chihuahua');
process('doberman-pinscher.html', 'doberman-pinscher');

console.log('\n✅ Batch 7 complete: goldendoodle, chihuahua, doberman-pinscher');
