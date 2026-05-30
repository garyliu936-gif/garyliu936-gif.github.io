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

// ── 7. BOXER ───────────────────────────────────────────────────────────────────
breeds['boxer'] = {
  diet: dietPanel(
    'Boxer',
    '3–4 meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['55 lbs (small female)', '2½ – 3 cups/day'],
     ['65 lbs (average)', '3 – 3½ cups/day'],
     ['75 lbs (active male)', '3½ – 4 cups/day'],
     ['80 lbs (large male)', '4 – 4½ cups/day']],
    ['High-quality protein (chicken, beef, or fish) as the first ingredient — Boxers are muscular and need real meat to maintain their build',
     'Avoid grain-free diets with legumes as the main ingredient — Boxers have a higher-than-average rate of heart disease (ARVC), and legume-heavy foods may compound cardiac risk',
     'Low-sodium, heart-healthy formulas become important as Boxers age — discuss with your vet after age 5',
     'Split meals into 2 per day minimum — Boxers are deep-chested and prone to life-threatening bloat (GDV)',
     'Avoid vigorous exercise for at least 60 minutes after eating — this is especially critical for the Boxer'],
    'Post-meal rest is non-negotiable for Boxers',
    "Boxers are one of the breeds most at risk for bloat (GDV) — a twisted stomach that can be fatal within hours. Never let your Boxer run, jump, or play roughly for at least 60 minutes after a meal. This single rule could save their life."
  ),
  cost: costPanel(
    'Boxer',
    '$1,000 – $2,500', '$2,500 – $5,000+', '$50 – $350', '$400 – $900 (risky)',
    '$150 – $300',
    '$60 – $100/month', '$500 – $1,200/year', '$40 – $80/month',
    '$20 – $40/month', '$25 – $50/month',
    '$16,000 – $32,000',
    ['Budget for cardiac screening — Boxer Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC) affects a significant portion of the breed and requires regular heart monitoring',
     'Boxers are prone to certain cancers — pet insurance is particularly valuable given their health profile',
     'Grooming costs are very low — their short, low-maintenance coat requires almost no professional grooming'],
    "Boxers' biggest financial risk is cardiac disease. Annual heart screenings ($150–$300/year) and pet insurance purchased before any cardiac symptoms appear are the two smartest financial decisions you can make as a Boxer owner."
  ),
  mixes: mixesPanel(
    'Boxer',
    "Boxers are mixed with other breeds to blend their playful energy and loyalty with other desirable traits. Here are the most popular Boxer crosses.",
    [
      ['🦮', 'Boxador (Boxer + Labrador Retriever)',
       "One of the most popular large-breed mixes — combines the Boxer's playful personality with the Lab's trainability and friendliness. Boxadors are energetic, loyal, and great with active families.",
       [['Size', '55 – 80 lbs'], ['Energy', 'Very High'], ['With Kids', 'Excellent'], ['Trainability', 'Great']]],
      ['🐺', 'Boxsky (Boxer + Siberian Husky)',
       "A stunning and energetic mix combining the Boxer's clown-like personality with the Husky's striking looks. Boxskies are athletic, independent, and need experienced, very active owners.",
       [['Size', '45 – 75 lbs'], ['Energy', 'Extreme'], ['Shedding', 'Moderate – High'], ['Experience Needed', 'High']]],
      ['🐕‍🦺', 'Box Shepherd (Boxer + German Shepherd)',
       "Intelligent, protective, and athletic. Box Shepherds combine the GSD's work ethic with the Boxer's exuberance and loyalty. They excel in obedience training and make confident family protectors.",
       [['Size', '60 – 88 lbs'], ['Trainability', 'Excellent'], ['Protective Drive', 'High'], ['Energy', 'Very High']]],
      ['🐩', 'Boxerdoodle (Boxer + Poodle)',
       "A lovable, low-shedding mix that blends the Boxer's fun personality with the Poodle's intelligence and hypoallergenic coat. Boxerdoodles are curious, playful, and surprisingly easy to train.",
       [['Size', '40 – 70 lbs'], ['Shedding', 'Low to minimal'], ['Intelligence', 'High'], ['Energy', 'High']]],
    ]
  ),
  facts: factsPanel(
    'Boxer',
    "The eternal puppy of the dog world — here are some of the most fascinating facts about the Boxer breed.",
    [
      '🐕 Boxers are famous for being <strong>perpetual puppies</strong> — they typically don\'t fully mature mentally until age 3, and many owners joke that their Boxer never fully grows up.',
      '👊 The name "Boxer" likely comes from the breed\'s habit of <strong>standing on their hind legs and using their front paws</strong> to play and spar — a behavior that genuinely looks like boxing.',
      '🪖 Boxers were among the <strong>first breeds used as police and military dogs in Germany</strong> and were extensively used in both World Wars as messenger dogs, pack carriers, and attack dogs.',
      '🦷 Boxers have an <strong>undershot jaw</strong> — their lower jaw extends beyond the upper. This trait was deliberately bred in so they could hold onto prey during hunts without blocking their nose to breathe.',
      '❤️ Boxers are one of the breeds with the <strong>highest rate of heart disease (ARVC)</strong> — Boxer Arrhythmogenic Right Ventricular Cardiomyopathy affects an estimated 30–40% of the breed.',
      '🏃 Despite their muscular, stocky build, Boxers are <strong>surprisingly fast and agile</strong> — capable of reaching speeds of up to 38–45 mph in short bursts, making them excellent in dog sports.',
      '🐣 Boxers have <strong>one of the longest puppyhoods of any breed</strong> — high energy, playfulness, and puppy behavior often persist until age 2–3, which surprises many first-time Boxer owners.',
      '🌍 The breed was developed in <strong>19th-century Germany</strong> from a now-extinct large hunting dog called the Bullenbeisser (bull-biter), crossed with English Bulldogs brought to Germany.',
      '🏆 Boxers are one of the <strong>most popular breeds for dog shows</strong> in the United States — their striking appearance and athletic movement make them formidable show competitors.',
    ],
    [
      ["Bang Away", "The most decorated Boxer in show history — won Best in Show at Westminster in 1951 and dominated the show ring for years"],
      ["Sergeant Stubby", "Though often cited as a Bull Terrier or Boxer mix, Stubby became the most decorated war dog of WWI — inspiring the breed's military legacy"],
      ["Blaze (The Villain)", "Boxer who became an internet sensation for his dramatic facial expressions and lovable antics on social media"],
      ["Bogart (Humphrey Bogart's Boxers)", "The famous actor was a well-known Boxer enthusiast and often photographed with his beloved Boxers"],
    ]
  ),
};

// ── 8. BULLDOG ─────────────────────────────────────────────────────────────────
breeds['bulldog'] = {
  diet: dietPanel(
    'Bulldog',
    '3–4 small meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['35 lbs (small female)', '1½ – 2 cups/day'],
     ['45 lbs (average)', '2 – 2½ cups/day'],
     ['50 lbs (large male)', '2½ – 3 cups/day'],
     ['55 lbs (maximum)', '2¾ – 3¼ cups/day']],
    ['Low-calorie, lean protein formula — Bulldogs gain weight easily and excess weight worsens their breathing problems dramatically',
     'Avoid foods with common allergens (wheat, corn, soy, dairy) — Bulldogs have some of the highest food allergy and skin sensitivity rates of any breed',
     'Small-breed or medium kibble pieces — their flat face and undershot jaw make it difficult to pick up large pieces',
     'Always use a slow-feed or puzzle bowl — Bulldogs gulp food and air, which leads to gas, bloating, and digestive discomfort',
     'Omega-3 fatty acids (fish oil) support skin fold health and reduce the inflammation that causes fold dermatitis'],
    'Feeding your Bulldog',
    "Bulldogs are prone to severe gas and digestive issues when they eat too fast. A slow-feed bowl is one of the best investments you can make. Also avoid feeding right before or after any activity — their breathing is already compromised and a full stomach makes it worse."
  ),
  cost: costPanel(
    'Bulldog',
    '$2,000 – $4,000', '$4,000 – $8,000+', '$50 – $500', '$800 – $1,500 (risky)',
    '$200 – $400',
    '$40 – $70/month', '$800 – $2,500/year', '$60 – $120/month',
    '$30 – $60/month', '$20 – $40/month',
    '$22,000 – $55,000',
    ['Bulldogs are expensive to breed — most litters require artificial insemination and C-section delivery, which breeders pass on in the price',
     'Veterinary costs are significantly above average due to brachycephalic health issues — budget $2,000–$6,000 for potential airway surgery and skin fold maintenance',
     'Bulldogs are among the breeds most likely to require surgery in their lifetime — pet insurance is strongly recommended from day one'],
    "Pet insurance for a Bulldog typically costs $60–$120/month, but can save you $3,000–$8,000 when airway surgery, cherry eye repair, or hip dysplasia treatment is needed. It is one of the most important purchases you'll make as a Bulldog owner."
  ),
  mixes: mixesPanel(
    'Bulldog',
    "Bulldogs are mixed with other breeds to improve health, add energy, or create unique companions. Here are the most popular English Bulldog crosses.",
    [
      ['🐕', 'Beabull (Bulldog + Beagle)',
       "A sweet-natured and playful mix that combines the Bulldog's calm, loyal personality with the Beagle's curiosity and nose. Beabulls are fun, affectionate, and usually have slightly better breathing than purebred Bulldogs.",
       [['Size', '30 – 50 lbs'], ['Energy', 'Moderate'], ['With Kids', 'Excellent'], ['Breathing', 'Somewhat better']]],
      ['🐩', 'Boodle (Bulldog + Poodle)',
       "A charming mix combining the Bulldog's gentle personality with the Poodle's intelligence and low-shedding coat. Boodles tend to be calmer than Poodles and more alert than Bulldogs.",
       [['Size', '15 – 55 lbs'], ['Shedding', 'Low to moderate'], ['Trainability', 'Good'], ['Energy', 'Low – Moderate']]],
      ['🐾', 'Bull-Pei (Bulldog + Shar-Pei)',
       "A wrinkly, loyal, and independent mix. Bull-Peis combine the Bulldog's affectionate nature with the Shar-Pei's dignified personality. They need experienced owners who understand both parent breeds.",
       [['Size', '35 – 65 lbs'], ['Wrinkles', 'Abundant'], ['Independence', 'High'], ['Experience Needed', 'Moderate – High']]],
      ['🦮', 'English Bull Labrador (Bulldog + Labrador)',
       "A friendly and surprisingly athletic mix that blends the Lab's outgoing personality with the Bulldog's stocky build and loyalty. Generally healthier than purebred Bulldogs due to hybrid vigor.",
       [['Size', '50 – 90 lbs'], ['Energy', 'Moderate – High'], ['With Kids', 'Excellent'], ['Health', 'Generally better than purebred']]],
    ]
  ),
  facts: factsPanel(
    'Bulldog',
    "One of the most recognizable breeds in the world — and one of the most surprising when you dig into their history.",
    [
      '🏟️ The Bulldog was literally <strong>bred for bull-baiting</strong> — a brutal sport popular in England until it was banned in 1835. Early Bulldogs were ferocious fighters; the gentle dogs we know today are the result of nearly 200 years of selective breeding for temperament.',
      '🇬🇧 The Bulldog is the <strong>national symbol of Great Britain</strong> — associated with Winston Churchill\'s stubborn wartime resolve. Churchill himself was famously nicknamed "The British Bulldog."',
      '👶 Bulldogs <strong>cannot give birth naturally</strong> in most cases — their puppies\' enormous heads cannot pass through the birth canal. Nearly all Bulldog litters are delivered by C-section.',
      '🌡️ Bulldogs are <strong>extremely heat-intolerant</strong> — they can overheat and suffer heatstroke in temperatures above 75°F (24°C). They should never be left outside in warm weather without supervision.',
      '✈️ Most airlines <strong>ban Bulldogs from cargo holds</strong> due to their breathing difficulties — the stress and reduced oxygen at altitude is life-threatening for brachycephalic breeds.',
      '🏈 The Bulldog is the most popular <strong>college sports mascot in the United States</strong> — adopted by Yale, Georgia, Butler, Mississippi State, and dozens of other universities.',
      '🐾 The Bulldog\'s distinctive low-slung walk and wrinkled face are entirely the product of <strong>human selective breeding</strong> — wild ancestors of the Bulldog looked nothing like today\'s breed.',
      '🧬 Bulldogs have one of the <strong>lowest genetic diversity scores of any dog breed</strong> — centuries of breeding for specific physical traits have narrowed the gene pool significantly.',
      '❤️ Despite their tough appearance, Bulldogs are among the most <strong>gentle, patient, and family-oriented breeds</strong> — they consistently rank as one of the best dogs for families with young children.',
    ],
    [
      ["Handsome Dan (Yale's Bulldog)", "Yale's official mascot since 1889 — the longest-running college sports mascot in US history"],
      ["Uga (Georgia Bulldogs)", "The University of Georgia's beloved mascot — one of the most famous dog mascots in American sports"],
      ["Churchill (Insurance mascot)", "The nodding Bulldog in UK insurance ads became one of Britain's most recognizable advertising characters"],
      ["Tillman", "Skateboarding English Bulldog who set a Guinness World Record for fastest 100m on a skateboard by a dog"],
    ]
  ),
};

// ── 9. POODLE ──────────────────────────────────────────────────────────────────
breeds['poodle'] = {
  diet: dietPanel(
    'Poodle',
    '3–4 small meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['45 lbs (standard, light)', '2 – 2½ cups/day'],
     ['55 lbs (standard, average)', '2½ – 3 cups/day'],
     ['65 lbs (standard, active)', '3 – 3½ cups/day'],
     ['70 lbs (standard, very active)', '3½ – 4 cups/day']],
    ['High-quality protein (chicken, salmon, or lamb) as the first ingredient — Poodles are active and need good protein for muscle maintenance',
     'Omega-3 fatty acids (fish oil) — essential for keeping their curly coat healthy and reducing skin irritation',
     'Digestible, high-quality carbohydrates — Poodles are prone to Addison\'s disease, and consistent, high-quality nutrition supports adrenal health',
     'Avoid high-fat diets — Standard Poodles are susceptible to bloat (GDV), and rich foods increase this risk',
     'Split into 2 meals per day minimum to reduce bloat risk — never feed one large meal'],
    'Grooming and diet go hand in hand for Poodles',
    "A Poodle's coat quality is directly influenced by their diet. If their coat looks dull, dry, or brittle, try adding a fish oil supplement (1,000mg per 30 lbs of body weight). You'll often see an improvement in just 4–6 weeks."
  ),
  cost: costPanel(
    'Poodle',
    '$1,200 – $3,000', '$3,000 – $6,000+', '$50 – $400', '$400 – $900 (risky)',
    '$150 – $350',
    '$50 – $80/month', '$500 – $1,000/year', '$35 – $70/month',
    '$80 – $150/month', '$20 – $40/month',
    '$16,000 – $38,000',
    ['Grooming is the biggest ongoing cost for Poodle owners — their coat grows continuously and requires professional grooming every 6–8 weeks',
     'Standard Poodles are prone to bloat (GDV) — emergency GDV surgery can cost $3,000–$8,000, making pet insurance essential',
     'Poodles have an exceptionally long lifespan (10–18 years) — lifetime costs are higher than most breeds simply due to longevity'],
    "Learning to groom your Poodle at home — even partially — can save $1,200–$2,400 per year. Many Poodle owners learn basic scissoring and clipping. YouTube tutorials for Poodle grooming are an excellent starting point."
  ),
  mixes: mixesPanel(
    'Poodle',
    "The Poodle is the most popular dog to mix with other breeds — their low-shedding coat and high intelligence are traits almost every dog owner wants. Here are the most beloved Poodle crosses.",
    [
      ['🐕', 'Goldendoodle (Poodle + Golden Retriever)',
       "The world's most popular designer dog — combines the Golden's loving personality with the Poodle's low-shedding coat. Goldendoodles consistently top popularity charts for family dogs.",
       [['Size', '25 – 80 lbs'], ['Shedding', 'Low to minimal'], ['Trainability', 'Excellent'], ['Price', '$1,500 – $3,500']]],
      ['🦮', 'Labradoodle (Poodle + Labrador Retriever)',
       "Originally bred in Australia in 1989 to create a hypoallergenic guide dog, the Labradoodle sparked the entire designer dog revolution. They combine the Lab's trainability with the Poodle's low-shedding coat.",
       [['Size', '15 – 65 lbs'], ['Origin', 'Australia, 1989'], ['Purpose', 'Hypoallergenic guide dog'], ['Trainability', 'Excellent']]],
      ['🐾', 'Bernedoodle (Poodle + Bernese Mountain Dog)',
       "A gentle giant mix — the Bernese Mountain Dog's calm, loyal personality meets the Poodle's intelligence and low-shedding coat. Bernedoodles are affectionate, playful, and surprisingly good with kids.",
       [['Size', '10 – 90 lbs (varies)'], ['Temperament', 'Gentle, loyal'], ['Shedding', 'Low to none'], ['Lifespan', 'Longer than purebred Bernese']]],
      ['🐩', 'Aussiedoodle (Poodle + Australian Shepherd)',
       "One of the most intelligent mixes ever created — combining two of the world's smartest breeds. Aussiedoodles are highly trainable, energetic, and need plenty of mental stimulation every single day.",
       [['Size', '25 – 70 lbs'], ['Intelligence', 'Exceptional'], ['Energy', 'Very High'], ['Best For', 'Active, experienced owners']]],
    ]
  ),
  facts: factsPanel(
    'Poodle',
    "Behind the fancy haircut lies one of the world's most intelligent, athletic, and historically fascinating dog breeds.",
    [
      '🧠 Poodles rank <strong>#2 in canine intelligence</strong> — behind only the Border Collie. They can learn a new command in fewer than 5 repetitions and obey it over 95% of the time.',
      '💈 The Poodle\'s iconic show clip wasn\'t designed for fashion — it was originally a <strong>working water retriever cut</strong>. Hunters shaved the joints to allow free movement while leaving fur over vital organs for warmth in cold water.',
      '🇫🇷 Despite being considered the national dog of France, Poodles were actually <strong>developed in Germany</strong>. The name comes from the German word <em>Pudel</em>, meaning "to splash in water."',
      '🎪 For centuries, Poodles were the <strong>most popular circus performing dog in Europe</strong> — their intelligence, trainability, and ability to learn complex tricks made them stars of French and German traveling shows.',
      '🏆 Poodles have won <strong>Best in Show at Westminster</strong> more times than any other breed — they are considered one of the most dominant show dogs in history.',
      '🐾 Poodles come in three AKC-recognized sizes (Standard, Miniature, Toy) — but they are all the <strong>same breed</strong>, not separate breeds, just different size varieties.',
      '🌊 Standard Poodles were bred as <strong>water retrievers</strong> — they retrieved ducks from lakes and rivers for hunters. Their webbed feet, water-resistant coat, and athletic build all reflect this working heritage.',
      '⚕️ Poodles are one of the <strong>longest-living dog breeds</strong> — Standard Poodles commonly live 12–15 years, Miniatures 14–17 years, and Toys 14–18 years. Some individuals have reached their early 20s.',
      '🧬 The Poodle\'s curly, low-shedding coat is the result of a <strong>single gene mutation (KRT71)</strong> — the same mutation found in other curly-coated breeds like the Portuguese Water Dog and Irish Water Spaniel.',
    ],
    [
      ["Rumpel von Grünewald", "The most successful show Poodle in US history — won Westminster Best in Show in 1960 and set records that stood for decades"],
      ["Jofi (Sigmund Freud's Poodle)", "Freud's beloved Chow Chow-mix companion has a Poodle connection — many early psychotherapists used Poodles as therapy dogs due to their sensitivity"],
      ["Moyen Poodles", "A fourth unofficial size between Standard and Miniature that's popular in Europe — showing the breed's remarkable size versatility"],
      ["Elvis Presley's Poodles", "Elvis gave Poodles as gifts to multiple romantic partners — his association with the breed helped make Standard Poodles fashionable in 1950s America"],
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

process('boxer.html',   'boxer');
process('bulldog.html', 'bulldog');
process('poodle.html',  'poodle');

console.log('\n✅ Batch 3 complete: boxer, bulldog, poodle');
