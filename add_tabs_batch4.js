const fs   = require('fs');
const path = require('path');
const BASE = String.raw`C:\Pet Website\breeds`;

const TAB_NAV = `        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">
`;

const TAB_JS = `  <script>
    // Tab switching
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

const DANGEROUS_FOODS = `            <div class="health-tags">
              <span class="health-tag">Chocolate</span>
              <span class="health-tag">Grapes &amp; Raisins</span>
              <span class="health-tag">Onions &amp; Garlic</span>
              <span class="health-tag">Xylitol (artificial sweetener)</span>
              <span class="health-tag">Macadamia Nuts</span>
              <span class="health-tag">Alcohol</span>
              <span class="health-tag">Avocado</span>
              <span class="health-tag">Raw yeast dough</span>
            </div>`;

const HEALTHY_TREATS = `            <ul>
              <li>Carrots — low calorie and great for teeth</li>
              <li>Blueberries — antioxidants, dogs love them</li>
              <li>Plain cooked chicken or turkey (no seasoning)</li>
              <li>Apple slices (remove seeds and core)</li>
              <li>Green beans — filling and very low calorie</li>
              <li>Commercial treats sized for your dog's weight class</li>
            </ul>`;

function ib(label, value) {
  return `              <div class="info-box"><div class="info-box-label">${label}</div><div class="info-box-value">${value}</div></div>`;
}

function dietPanel(name, p1, p2, p3, p4, portions, notes, tipH, tipT) {
  const rows  = portions.map(r => ib(r[0], r[1])).join('\n');
  const nlist = notes.map(n => `              <li>${n}</li>`).join('\n');
  return `        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ How Much to Feed a ${name}</h2>
            <p>Getting portions right is one of the most important things you can do for your ${name}'s long-term health. Use these as starting guidelines and adjust based on your dog's body condition.</p>
            <div class="info-grid">
${ib('Puppy (8–12 weeks)', p1)}
${ib('Puppy (3–6 months)', p2)}
${ib('Adult (1+ year)', p3)}
${ib('Senior (7+ years)', p4)}
            </div>
          </div>
          <div class="breed-section">
            <h2>📏 Daily Portion Guide</h2>
            <p>Based on a standard quality dry kibble (~350 kcal/cup). Always check the feeding chart on your specific brand and adjust for your dog's activity level and metabolism.</p>
            <div class="info-grid">
${rows}
            </div>
          </div>
          <div class="breed-section">
            <h2>✅ Best Foods for ${name}s</h2>
            <p>Look for foods where the first ingredient is a named animal protein. The best diets for this breed also address their specific health tendencies:</p>
            <ul>
${nlist}
              <li>Avoid: artificial colors, BHA/BHT preservatives, and corn or soy as the primary ingredient</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🚫 Foods Dangerous for Dogs</h2>
            <p>These common human foods can be toxic — even life-threatening — for your ${name}. Keep them well out of reach.</p>
${DANGEROUS_FOODS}
          </div>
          <div class="breed-section">
            <h2>🦴 Healthy Treats</h2>
${HEALTHY_TREATS}
            <div class="travel-tip-box">
              <h4>💡 ${tipH}</h4>
              <p>${tipT}</p>
            </div>
          </div>
        </div><!-- end tab-diet -->
`;
}

function costPanel(name, pb, ps, pr, pbk, mr, fc, vc, ic, gc, tc, life, cnotes, ctip) {
  const nlist = cnotes.map(n => `              <li>${n}</li>`).join('\n');
  return `        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 How Much Does a ${name} Cost?</h2>
            <p>The purchase price is just the beginning. Here's a realistic breakdown of what it costs to buy and own a ${name} over their lifetime.</p>
            <div class="info-grid">
${ib('Reputable Breeder', pb)}
${ib('Show / Champion Lines', ps)}
${ib('Rescue / Adoption', pr)}
${ib('Backyard Breeder ⚠️', pbk)}
            </div>
          </div>
          <div class="breed-section">
            <h2>📅 Monthly Cost of Owning a ${name}</h2>
            <p>Beyond the purchase price, owning a ${name} typically costs <strong>${mr} per month</strong>. Here's where the money goes:</p>
            <div class="info-grid">
${ib('Food (quality kibble)', fc)}
${ib('Vet visits (annual)', vc)}
${ib('Pet insurance', ic)}
${ib('Grooming', gc)}
${ib('Toys &amp; supplies', tc)}
${ib('Training classes', '$100 – $300 (one-time)')}
            </div>
          </div>
          <div class="breed-section">
            <h2>📊 Lifetime Cost Estimate</h2>
            <p>Over their full lifespan, a ${name} typically costs <strong>${life} total</strong> — depending on health, lifestyle, and the services you use.</p>
            <ul>
${nlist}
              <li>Pet insurance is worth it — it pays for itself if your dog ever needs surgery</li>
              <li>Boarding costs: plan $50–$100/night at quality facilities when you travel</li>
            </ul>
            <div class="travel-tip-box">
              <h4>💡 Money-saving tip</h4>
              <p>${ctip}</p>
            </div>
          </div>
          <div class="breed-section">
            <h2>💡 How to Save Money as a ${name} Owner</h2>
            <ul>
              <li>Get pet insurance before your dog turns 1 — lower premiums and fewer exclusions</li>
              <li>Buy food in bulk (large bags) — significantly cheaper per pound</li>
              <li>Learn basic grooming at home — brushing and nail trims add up fast at a groomer</li>
              <li>Ask your vet about annual wellness plans — many clinics offer bundled packages</li>
              <li>Adopt instead of buying — rescue ${name}s are just as loving at a fraction of the cost</li>
            </ul>
          </div>
        </div><!-- end tab-cost -->
`;
}

function mixBlock(emoji, mname, desc, stats) {
  const shtml = stats.map(s => ib(s[0], s[1])).join('\n');
  return `          <div class="breed-section">
            <h2>${emoji} ${mname}</h2>
            <p>${desc}</p>
            <div class="info-grid">
${shtml}
            </div>
          </div>`;
}

function mixesPanel(name, intro, mixes) {
  const blocks = mixes.map(m => mixBlock(m[0], m[1], m[2], m[3])).join('\n');
  return `        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular ${name} Mix Breeds</h2>
            <p>${intro}</p>
          </div>
${blocks}
        </div><!-- end tab-mixes -->
`;
}

function factsPanel(name, intro, facts, famous) {
  const flist   = facts.map(f => `              <li>${f}</li>`).join('\n');
  const famhtml = famous.map(f => ib(f[0], f[1])).join('\n');
  return `        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Amazing Facts About ${name}s</h2>
            <p>${intro}</p>
            <ul>
${flist}
            </ul>
          </div>
          <div class="breed-section">
            <h2>🌟 Famous ${name}s</h2>
            <div class="info-grid">
${famhtml}
            </div>
          </div>
        </div><!-- end tab-facts -->
`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// BREED DATA
// ═══════════════════════════════════════════════════════════════════════════════
const breeds = {};

// ── 10. SIBERIAN HUSKY ─────────────────────────────────────────────────────────
breeds['siberian-husky'] = {
  diet: dietPanel(
    'Siberian Husky',
    '3–4 meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['35 lbs (small female)', '1½ – 2 cups/day'],
     ['45 lbs (average)', '2 – 2½ cups/day'],
     ['55 lbs (active male)', '2½ – 3 cups/day'],
     ['60 lbs (working dog)', '3 – 3½ cups/day']],
    ['High-quality protein (chicken, fish, or lamb) as the first ingredient — Huskies are athletic working dogs who thrive on real meat',
     'Higher fat content than most breeds — Huskies were bred to metabolize fat efficiently for sustained endurance over long distances',
     'Omega-3 fatty acids (fish oil) are essential for maintaining their thick double coat and preventing dry, flaky skin',
     'Zinc supplementation may be needed — Huskies are prone to zinc-responsive dermatosis, a skin condition caused by zinc deficiency',
     'Do NOT overfeed — Huskies naturally self-regulate and can maintain a healthy weight on surprisingly small amounts of food compared to dogs their size'],
    'Huskies are natural self-regulators',
    "Unlike most dogs, Huskies instinctively eat only what they need — they will often leave food in the bowl. Don't force them to eat more than they want. However, during heavy exercise or cold weather, increase portions to compensate for the extra energy burned."
  ),
  cost: costPanel(
    'Siberian Husky',
    '$800 – $1,500', '$2,000 – $4,000', '$50 – $300', '$300 – $700 (risky)',
    '$100 – $200',
    '$40 – $70/month', '$400 – $900/year', '$30 – $60/month',
    '$30 – $60/month', '$20 – $40/month',
    '$13,000 – $22,000',
    ['Containment is a hidden major cost — Huskies are world-class escape artists and require 6-foot fencing with dig guards buried underground',
     'Grooming costs spike twice a year during heavy shedding season — professional de-shedding treatments are helpful but not cheap',
     'Huskies are relatively healthy for a purebred dog, which keeps veterinary costs lower than many breeds of similar size'],
    "The biggest Husky expense most owners don't anticipate is secure fencing. Standard 4-foot fences are useless — Huskies jump, climb, and dig. Budget $1,000–$3,000 for proper containment before you bring one home."
  ),
  mixes: mixesPanel(
    'Siberian Husky',
    "The Husky's striking looks and energetic personality make it one of the most popular breeds to mix. Here are the most sought-after Husky crosses.",
    [
      ['🐺', 'Gerberian Shepsky (Husky + German Shepherd)',
       "One of the most stunning working dog mixes — combines the GSD's loyalty and intelligence with the Husky's endurance and striking appearance. Shepskies are athletic, loyal, and highly trainable but need experienced owners.",
       [['Size', '45 – 88 lbs'], ['Energy', 'Extreme'], ['Trainability', 'Excellent'], ['Experience Needed', 'High']]],
      ['🐕', 'Huskador (Husky + Labrador Retriever)',
       "A friendly, energetic mix that blends the Lab's trainability and warmth with the Husky's athleticism and endurance. Huskadors make excellent active family dogs and are often more trainable than purebred Huskies.",
       [['Size', '40 – 60 lbs'], ['Energy', 'Very High'], ['Trainability', 'Good – Great'], ['With Kids', 'Excellent']]],
      ['🐾', 'Pomsky (Husky + Pomeranian)',
       "The internet's favorite designer dog — a miniature Husky-lookalike that combines the Husky's striking appearance with the Pomeranian's compact size. Pomskies are playful, beautiful, and full of personality.",
       [['Size', '7 – 38 lbs'], ['Appearance', 'Mini Husky'], ['Energy', 'High'], ['Price', '$1,500 – $5,000']]],
      ['❄️', 'Alusky (Husky + Alaskan Malamute)',
       "A powerhouse combination of two Arctic sled dog breeds — the Alusky is large, strong, and built for endurance. They are gentle with family but need serious exercise, cold climates, and very experienced owners.",
       [['Size', '60 – 100 lbs'], ['Strength', 'Exceptional'], ['Cold Weather', 'Thrives'], ['Best For', 'Very experienced, active owners']]],
    ]
  ),
  facts: factsPanel(
    'Siberian Husky',
    "Few breeds have a history as dramatic and heroic as the Siberian Husky. Here are some of their most remarkable facts.",
    [
      '🏆 Huskies are famous for the <strong>1925 Serum Run to Nome</strong> — a relay of sled dog teams ran 674 miles through blizzard conditions to deliver diphtheria antitoxin to Nome, Alaska, saving the town from an epidemic. The lead dog Balto became a national hero.',
      '❄️ Siberian Huskies were originally bred by the <strong>Chukchi people of northeastern Siberia</strong> over 3,000 years ago — making them one of the oldest dog breeds still in existence.',
      '👁️ Huskies are one of the few breeds where <strong>heterochromia (two different colored eyes) is completely normal</strong> and accepted in the breed standard — blue, brown, green, or any combination is possible.',
      '🌡️ A Husky\'s double coat insulates so effectively that they can sleep comfortably in temperatures as low as <strong>-60°F (-51°C)</strong> by curling their tail over their face to warm the air they breathe.',
      '🏃 Husky sled teams can run at <strong>10–15 mph for 100+ miles per day</strong> in racing conditions — an endurance feat unmatched by virtually any other animal relative to body size.',
      '🧬 Despite looking wolf-like, DNA studies show Siberian Huskies are <strong>no more closely related to wolves</strong> than any other dog breed — their appearance is a convergent adaptation to cold climates.',
      '🔇 Huskies rarely bark — instead they <strong>howl, whine, and "talk"</strong> using a remarkable range of vocalizations that many owners describe as almost conversational.',
      '🌍 Huskies were brought to <strong>Alaska during the Nome Gold Rush in 1909</strong> and immediately dominated sled dog racing, astounding locals who had never seen such efficient runners.',
      '🎭 Huskies are notorious escape artists and <strong>rank among the top breeds for running away</strong> — their independent, wandering instinct is deeply rooted in thousands of years of covering vast distances.',
    ],
    [
      ["Balto", "Lead dog of the final leg of the 1925 Nome serum run — a bronze statue in Central Park, NYC honors him to this day"],
      ["Togo", "The true hero of the 1925 serum run — musher Leonhard Seppala's lead dog ran the longest and most dangerous leg of the relay (91 miles)"],
      ["Buck (Call of the Wild)", "Jack London's famous sled dog novel was partly inspired by the Husky breeds of the Klondike — bringing the breed to worldwide literary fame"],
      ["Nanook (The Mask)", "Jim Carrey's Husky mix in the 1994 film The Mask introduced millions of viewers to the breed's irresistible, mischievous personality"],
    ]
  ),
};

// ── 11. GREAT DANE ─────────────────────────────────────────────────────────────
breeds['great-dane'] = {
  diet: dietPanel(
    'Great Dane',
    '3–4 small meals/day (critical!)', '3–4 meals/day', '2–3 meals/day', '2–3 smaller meals/day',
    [['100 lbs (younger/lighter)', '6 – 8 cups/day'],
     ['130 lbs (average adult)', '8 – 10 cups/day'],
     ['150 lbs (large adult)', '10 – 12 cups/day'],
     ['170 lbs (extra large)', '12 – 14 cups/day']],
    ['Large-breed or giant-breed puppy formula ONLY for the first 18–24 months — standard puppy food causes too-rapid growth and dramatically increases joint problems',
     'Controlled protein and calcium levels during puppyhood — Great Danes grow so fast that excess nutrition causes skeletal deformities',
     'NEVER feed one large meal — always split into 2–3 portions. Bloat (GDV) is the #1 killer of Great Danes and eating patterns directly affect risk',
     'Elevated feeding bowls were once recommended but are now controversial — ask your vet about the latest guidance on bloat prevention',
     'Joint supplements (glucosamine, chondroitin, fish oil) from puppyhood — their immense size puts extraordinary stress on developing joints'],
    'Great Dane feeding is a matter of life and death',
    "Bloat (GDV) kills more Great Danes than any other condition. The three most important rules: never feed one large meal, never exercise within 60 minutes of eating, and learn the signs of bloat (distended belly, unproductive retching, restlessness). This is an emergency requiring immediate veterinary care."
  ),
  cost: costPanel(
    'Great Dane',
    '$1,000 – $3,000', '$3,000 – $6,000+', '$50 – $400', '$400 – $900 (risky)',
    '$250 – $500',
    '$100 – $180/month', '$600 – $1,500/year', '$60 – $120/month',
    '$20 – $50/month', '$30 – $60/month',
    '$18,000 – $36,000',
    ['Food costs are among the highest of any breed — a Great Dane eats 8–14 cups of quality kibble per day, which adds up to $100–$180/month in food alone',
     'Emergency bloat surgery (GDV correction) can cost $2,000–$8,000 — pet insurance is strongly recommended and many owners also opt for prophylactic gastropexy',
     'Great Danes have a tragically short lifespan of 7–10 years — this limits lifetime costs somewhat, but each year is expensive due to their giant size'],
    "Many Great Dane owners opt for prophylactic gastropexy — a preventive surgery ($400–$800) that tacks the stomach to the body wall so it can't twist. Done during spay/neuter, it dramatically reduces bloat risk and is often worth every penny."
  ),
  mixes: mixesPanel(
    'Great Dane',
    "Great Danes are mixed with other large breeds to create imposing but friendly companions. Here are the most notable Great Dane crosses.",
    [
      ['🐾', 'Great Danoodle (Great Dane + Poodle)',
       "A giant, low-shedding companion that combines the Great Dane's gentle giant personality with the Poodle's intelligence and hypoallergenic coat. Great Danoodles are affectionate, calm, and surprisingly trainable.",
       [['Size', '80 – 150 lbs'], ['Shedding', 'Low to minimal'], ['Temperament', 'Gentle, calm'], ['Energy', 'Moderate']]],
      ['🦁', 'Daniff (Great Dane + Mastiff)',
       "One of the largest dog mixes in existence — combining two of the world's biggest breeds. Daniffs are gentle, loyal, and surprisingly docile despite their enormous size. Not for small homes.",
       [['Size', '115 – 200 lbs'], ['Temperament', 'Calm, loyal'], ['Space Needed', 'Very large home required'], ['Lifespan', '7 – 10 years']]],
      ['🐕‍🦺', 'Great Shepherd (Great Dane + German Shepherd)',
       "A loyal, intelligent, and imposing mix. Great Shepherds are protective family dogs who combine the GSD's work ethic with the Great Dane's calm confidence. They need early socialization and consistent training.",
       [['Size', '75 – 130 lbs'], ['Intelligence', 'High'], ['Protective Drive', 'Moderate – High'], ['Energy', 'Moderate – High']]],
      ['🐕', 'Great Labradane (Great Dane + Labrador)',
       "A friendly, gentle giant — the Lab's outgoing personality in a much larger package. Great Labradanes are affectionate, easy-going, and excellent family dogs that adapt well to homes with children.",
       [['Size', '80 – 145 lbs'], ['Temperament', 'Friendly, gentle'], ['With Kids', 'Excellent'], ['Trainability', 'Good']]],
    ]
  ),
  facts: factsPanel(
    'Great Dane',
    'Called the "Apollo of Dogs" — the Great Dane is a breed of extraordinary size, grace, and surprisingly gentle spirit.',
    [
      '📏 The <strong>tallest dog ever recorded</strong> was a Great Dane named Zeus from Michigan, who measured 44 inches at the shoulder — taller than many small ponies. He held the Guinness World Record until his death in 2014.',
      '🇩🇪 Despite the name, Great Danes are <strong>not Danish</strong> — they were developed in Germany from boarhound ancestors. The French called them "Grand Danois" (Great Danish), and the name stuck in English.',
      '🐗 Great Danes were originally bred to hunt <strong>wild boar</strong> in Germany — one of the most dangerous prey animals in Europe. They had to be large enough to tackle a 400-pound boar and hold it until the hunter arrived.',
      '❤️ Great Danes are nicknamed the <strong>"gentle giants"</strong> for good reason — despite their intimidating size, they are affectionate, patient, and famously good with children. Many act like lap dogs who don\'t understand their own size.',
      '⏳ Tragically, Great Danes have one of the <strong>shortest lifespans of any breed</strong> — typically just 7–10 years. Their accelerated aging is a direct consequence of their extreme size, which puts enormous stress on the heart and joints.',
      '🏰 Great Danes were status symbols of <strong>European royalty and nobility</strong> for centuries — keeping a pack of well-trained Great Danes was a sign of wealth and power in 16th–18th century Germany.',
      '💉 <strong>Bloat (GDV)</strong> — a twisted stomach — is the leading cause of death in Great Danes. It can kill within hours and is one of the most important veterinary emergencies any Great Dane owner must know how to recognize.',
      '🛋️ Great Danes are sometimes called <strong>"apartment dogs in giant bodies"</strong> — despite their size, they are relatively low-energy indoors and adapt surprisingly well to city living if given daily walks.',
      '🎨 Scooby-Doo, the world\'s most famous fictional dog, is a <strong>Great Dane</strong> — creator Iwao Takamoto studied the breed and then deliberately exaggerated their features to create the lovable cartoon character.',
    ],
    [
      ["Zeus (Michigan)", "Tallest dog ever recorded at 44 inches — held the Guinness World Record and became a beloved local celebrity"],
      ["Scooby-Doo", "The world's most famous animated dog — a Great Dane created by Hanna-Barbera in 1969, now a pop culture icon"],
      ["Just Nuisance", "The only dog ever officially enlisted in the Royal Navy (WWII) — a Great Dane who became the mascot of the naval base at Simonstown, South Africa"],
      ["Gibson", "Previously held the Guinness World Record for tallest dog at 42.2 inches — a Harlequin Great Dane from California"],
    ]
  ),
};

// ── 12. SHIH TZU ───────────────────────────────────────────────────────────────
breeds['shih-tzu'] = {
  diet: dietPanel(
    'Shih Tzu',
    '3–4 small meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['8 lbs (small)', '⅓ – ½ cup/day'],
     ['11 lbs (average)', '½ – ⅔ cup/day'],
     ['14 lbs (larger)', '⅔ – ¾ cup/day'],
     ['16 lbs (maximum)', '¾ – 1 cup/day']],
    ['Small-breed formula with small kibble pieces — Shih Tzus have tiny mouths and flat faces that make large kibble hard to eat',
     'High-quality protein (chicken or fish) as the first ingredient to support their flowing coat',
     'Omega-3 fatty acids (fish oil or flaxseed) — the Shih Tzu\'s long, luxurious coat requires excellent nutritional support from the inside out',
     'Avoid foods with artificial dyes — the Shih Tzu\'s white facial hair is very susceptible to staining from dyes and low-quality ingredients',
     'Dental-health focused treats and foods — Shih Tzus are prone to dental disease due to their small mouths and crowded teeth'],
    'Coat health starts with diet',
    "A Shih Tzu's coat is their crowning glory — and it's directly influenced by what they eat. If the coat looks dull or the skin is flaky, try adding a fish oil supplement and switching to a higher-quality protein source. You'll often see improvement within 6–8 weeks."
  ),
  cost: costPanel(
    'Shih Tzu',
    '$800 – $1,800', '$2,500 – $5,000', '$50 – $300', '$300 – $600 (risky)',
    '$100 – $200',
    '$25 – $45/month', '$400 – $800/year', '$30 – $60/month',
    '$50 – $100/month', '$15 – $30/month',
    '$14,000 – $28,000',
    ['Grooming is the largest ongoing expense — Shih Tzus in a full coat require professional grooming every 4–6 weeks. Many owners opt for a shorter "puppy cut" to reduce both grooming time and cost',
     'Dental care costs are higher than average — Shih Tzus are extremely prone to dental disease and often need professional cleanings under anesthesia annually',
     'Shih Tzus have a long lifespan (10–18 years), which means lifetime costs can be significant despite their small size'],
    "Learning to do basic Shih Tzu grooming at home — brushing daily and giving baths every 2–3 weeks — can save $600–$1,200/year in professional grooming costs. A quality slicker brush and dog-safe conditioner are your best investments."
  ),
  mixes: mixesPanel(
    'Shih Tzu',
    "Shih Tzus are mixed with other small breeds to create adorable, low-shedding companions. Here are the most popular Shih Tzu crosses.",
    [
      ['🐩', 'Shih-Poo (Shih Tzu + Poodle)',
       "One of the most popular small designer dogs — combines the Shih Tzu's affectionate, laid-back personality with the Poodle's intelligence and low-shedding coat. Shih-Poos are playful, gentle, and great for allergy sufferers.",
       [['Size', '8 – 18 lbs'], ['Shedding', 'Very Low'], ['Trainability', 'Good'], ['Energy', 'Moderate']]],
      ['🌸', 'Shorkie (Shih Tzu + Yorkshire Terrier)',
       "A tiny, bold mix that pairs the Shih Tzu's sweetness with the Yorkie's feisty confidence. Shorkies are devoted to their owners, surprisingly brave for their size, and have beautiful silky coats.",
       [['Size', '5 – 12 lbs'], ['Coat', 'Silky, low-shedding'], ['Personality', 'Bold, devoted'], ['Energy', 'Moderate']]],
      ['🐶', 'Mal-Shi (Maltese + Shih Tzu)',
       "A gentle, sweet-natured mix combining two of the world's oldest lap dog breeds. Mal-Shis are affectionate, low-energy, and typically hypoallergenic — ideal companions for seniors and apartment dwellers.",
       [['Size', '6 – 12 lbs'], ['Shedding', 'Minimal'], ['Energy', 'Low – Moderate'], ['Best For', 'Seniors, apartments']]],
      ['🎀', 'Zuchon / Teddy Bear (Shih Tzu + Bichon Frisé)',
       "Nicknamed the 'Teddy Bear Dog' for their irresistibly fluffy, stuffed-animal appearance. Zuchons are sweet, playful, and social — they love everyone and adapt easily to families, seniors, and city life.",
       [['Size', '8 – 16 lbs'], ['Shedding', 'Very Low'], ['Nickname', 'Teddy Bear Dog'], ['Temperament', 'Sweet, social']]],
    ]
  ),
  facts: factsPanel(
    'Shih Tzu',
    "One of the world's oldest and most pampered breeds — the Shih Tzu has a history fit for royalty.",
    [
      '👑 The Shih Tzu is one of the <strong>oldest dog breeds in the world</strong> — DNA analysis places them among the 14 most ancient breeds, with roots going back at least 2,000 years in China and Tibet.',
      '🏯 Shih Tzus were <strong>sacred dogs of Chinese royalty</strong> — kept exclusively in the Imperial Palace and treated as living treasures. Commoners were forbidden from owning them under penalty of death.',
      '🌸 The name "Shih Tzu" means <strong>"Lion Dog"</strong> in Chinese — they were bred to resemble the lion, a sacred animal in Buddhist iconography. The long hair parted on the face was meant to mimic a lion\'s mane.',
      '🌍 When the last Chinese Emperor was deposed in 1908, Shih Tzus were <strong>nearly lost forever</strong> — the imperial breeding program collapsed. The entire modern breed descends from just 14 dogs saved by British and Scandinavian breeders.',
      '✈️ The Shih Tzu wasn\'t seen outside of China until the <strong>1930s</strong>, when a few dogs were brought to England. They weren\'t recognized by the AKC until 1969 — making them relative newcomers to Western dog culture.',
      '🐾 Despite their pampered reputation, Shih Tzus are <strong>sturdy, athletic little dogs</strong> with surprising endurance. They were originally used as watchdogs in Tibetan monasteries — a job requiring alertness, not lounging.',
      '🌡️ Like all flat-faced breeds, Shih Tzus are <strong>heat-sensitive</strong> — they overheat quickly in warm weather. Air conditioning, cool water, and shade are essential for summer safety.',
      '🏆 The Shih Tzu is currently one of the <strong>top 20 most popular dog breeds in the United States</strong> — despite being virtually unknown outside China just 90 years ago, a meteoric rise in popularity.',
      '🧸 Shih Tzus are one of the <strong>most popular breeds for emotional support animal certification</strong> — their calm, intuitive nature and genuine love of human contact make them natural comfort dogs.',
    ],
    [
      ["Empress Dowager Cixi's Shih Tzus", "The most powerful woman in Chinese history bred Shih Tzus obsessively — her imperial kennel set the breed standard for centuries"],
      ["Mr. Pickles (social media)", "Shih Tzu with millions of followers known for his grumpy yet adorable expression and elaborate outfit photos"],
      ["Marnie the Dog", "Shih Tzu Instagram star with over 2 million followers who became one of social media's most beloved dogs"],
      ["Cola (UK rescue)", "A rescued Shih Tzu whose transformation from neglect to beloved pet went viral, sparking worldwide awareness about the breed"],
    ]
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESS FILES
// ═══════════════════════════════════════════════════════════════════════════════
function process(filename, breedKey) {
  const filepath = path.join(BASE, filename);
  let html = fs.readFileSync(filepath, 'utf8').replace(/\r\n/g, '\n');
  const d = breeds[breedKey];

  const old1 = '          </div>\n        </div>\n\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';
  const new1 = '          </div>\n        </div>\n\n' + TAB_NAV + '\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';
  if (!html.includes(old1)) throw new Error(`Pattern 1 not found in ${filename}`);
  html = html.replace(old1, new1);

  const old2 = '          </div>\n        </div>\n\n      </div>\n\n      <aside class="breed-sidebar">';
  const new2 = '          </div>\n        </div>\n\n        </div><!-- end tab-profile -->\n\n'
    + d.diet + '\n' + d.cost + '\n' + d.mixes + '\n' + d.facts
    + '\n      </div>\n\n      <aside class="breed-sidebar">';
  if (!html.includes(old2)) throw new Error(`Pattern 2 not found in ${filename}`);
  html = html.replace(old2, new2);

  const old3 = '  <script src="../js/main.js"></script>\n  <script>';
  const new3 = '  <script src="../js/main.js"></script>\n' + TAB_JS + '  <script>';
  if (!html.includes(old3)) throw new Error(`Pattern 3 not found in ${filename}`);
  html = html.replace(old3, new3);

  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ ${filename} updated`);
}

process('siberian-husky.html', 'siberian-husky');
process('great-dane.html',     'great-dane');
process('shih-tzu.html',       'shih-tzu');

console.log('\n✅ Batch 4 complete: siberian-husky, great-dane, shih-tzu');
