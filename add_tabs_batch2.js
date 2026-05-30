const fs   = require('fs');
const path = require('path');
const BASE = String.raw`C:\Pet Website\breeds`;

// ─── Shared snippets (same as batch 1) ─────────────────────────────────────
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

// ─── HTML builders ──────────────────────────────────────────────────────────
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

// ── 4. BEAGLE ──────────────────────────────────────────────────────────────────
breeds['beagle'] = {
  diet: dietPanel(
    'Beagle',
    '3–4 small meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['13 lbs (small female)', '¾ – 1 cup/day'],
     ['20 lbs (average)', '1 – 1¼ cups/day'],
     ['25 lbs (active)', '1¼ – 1½ cups/day'],
     ['30 lbs (large male)', '1½ – 1¾ cups/day']],
    ['Real meat as the first ingredient — Beagles do well on chicken, turkey, or fish-based formulas',
     'Measured portions at every single meal — Beagles have no "off switch" and will eat until sick',
     'High-fiber foods help them feel fuller longer — important for this notoriously food-obsessed breed',
     'Omega-3 fatty acids support their drop ears, which are prone to infections and need healthy skin underneath',
     'Avoid free-feeding at all costs — always put food down for 15 minutes then remove it'],
    'Beagle feeding tip',
    "Beagles are escape artists motivated almost entirely by food and smell. Never leave food unattended — they will find it, no matter where you put it. Always use a puzzle feeder to slow them down and keep their minds busy."
  ),
  cost: costPanel(
    'Beagle',
    '$800 – $1,500', '$1,500 – $3,000', '$50 – $300', '$300 – $700 (risky)',
    '$80 – $150',
    '$30 – $50/month', '$400 – $800/year', '$30 – $60/month',
    '$20 – $40/month', '$15 – $30/month',
    '$12,000 – $20,000',
    ['First year costs include puppy-proofing your yard — Beagles are expert escape artists and a secure fence is non-negotiable',
     'Budget for a good harness and long line — Beagles follow their nose and cannot be fully trusted off-leash in open areas',
     'Overall cost of ownership is moderate — Beagles are relatively healthy and low-maintenance compared to many breeds'],
    "Beagles are one of the most affordable purebred dogs to own. Their biggest costs are often containment (secure fencing, good leashes) and the occasional escape-related vet visit — not routine care."
  ),
  mixes: mixesPanel(
    'Beagle',
    "Beagles are mixed with other breeds to combine their friendly personality and keen nose with different temperaments. Here are the most popular Beagle crosses.",
    [
      ['🐩', 'Poogle (Beagle + Poodle)',
       "One of the most popular Beagle mixes — combines the Beagle's friendly nature with the Poodle's low-shedding coat and intelligence. Also called a Beaglepoo or Beadoodle.",
       [['Size', '10 – 25 lbs'], ['Shedding', 'Low to minimal'], ['Energy', 'Moderate – High'], ['Trainability', 'Good']]],
      ['🐾', 'Puggle (Beagle + Pug)',
       "One of the first \"designer dogs\" to become popular in the 2000s. Puggles combine the Beagle's curiosity with the Pug's laid-back personality — great city dogs who love people.",
       [['Size', '15 – 30 lbs'], ['Energy', 'Moderate'], ['With Kids', 'Excellent'], ['Shedding', 'Moderate']]],
      ['🐕', 'Cheagle (Beagle + Chihuahua)',
       "A small but bold mix that combines the Beagle's scenting instinct with the Chihuahua's fierce loyalty. Cheagles are compact, curious, and deeply devoted to their person.",
       [['Size', '9 – 20 lbs'], ['Energy', 'Moderate – High'], ['Loyalty', 'Very High'], ['Best For', 'Singles or couples']]],
      ['🦴', 'Beaglier (Beagle + Cavalier King Charles)',
       "A sweet-natured mix combining the Beagle's playfulness with the Cavalier's gentle, affectionate temperament. Beagliers are loving, adaptable, and great with families of all sizes.",
       [['Size', '10 – 25 lbs'], ['Temperament', 'Very gentle'], ['Energy', 'Moderate'], ['With Kids', 'Outstanding']]],
    ]
  ),
  facts: factsPanel(
    'Beagle',
    "Small but mighty — the Beagle is packed with personality, history, and some genuinely surprising facts.",
    [
      '👃 Beagles have approximately <strong>220 million scent receptors</strong> — compared to just 5 million in humans. Their nose is so powerful it\'s used in law enforcement and airport security to detect prohibited items.',
      '🏛️ Beagles are one of the oldest and most historically documented dog breeds — they appear in <strong>Greek writings dating back to 400 BC</strong> and were favorites of English royalty for centuries.',
      '🎵 The name "Beagle" may come from the French word <em>be\'geule</em>, meaning <strong>"loudmouth"</strong> — a reference to their distinctive baying howl that can be heard over a mile away.',
      '🌿 Beagles are the <strong>#1 most used breed in animal research laboratories</strong> — their small size, gentle temperament, and predictable genetics make them preferred subjects, which has made them a focus of animal rights advocacy.',
      '🐾 A Beagle named <strong>Uno made history in 2008</strong> by becoming the first Beagle ever to win Best in Show at the Westminster Kennel Club Dog Show — and the crowd went wild.',
      '🚀 A Beagle named <strong>Snoopy</strong> — the world\'s most famous fictional dog — has been used as a NASA mascot since 1959. The Apollo 10 lunar module was even named "Snoopy."',
      '🌍 Beagles are among the <strong>top 10 most popular breeds in the US, UK, and Australia</strong> simultaneously — making them one of the world\'s most universally loved dogs.',
      '🎭 Beagles are naturally pack animals — they were bred to work in large groups tracking hares. Left alone for long periods, they\'re among the breeds most likely to develop <strong>separation anxiety and destructive behavior</strong>.',
      '🔬 The entire <strong>canine genome was first sequenced from a Beagle</strong> named Tasha in 2005 — her DNA became the reference genome for the entire dog species.',
    ],
    [
      ["Uno", "First Beagle to win Westminster Best in Show (2008) — the crowd's reaction became one of the show's most iconic moments"],
      ["Snoopy (Peanuts)", "The world's most famous fictional dog — Charles Schulz modeled him on Beagles he loved as a child"],
      ["Shiloh", "Star of the beloved 1996 film about a boy who rescues an abused Beagle — based on Phyllis Naylor's award-winning novel"],
      ["Brains (Inspector Gadget)", "Cartoon Beagle sidekick who was often smarter than his owner — a nod to the breed's clever, independent nature"],
    ]
  ),
};

// ── 5. DACHSHUND ───────────────────────────────────────────────────────────────
breeds['dachshund'] = {
  diet: dietPanel(
    'Dachshund',
    '3–4 small meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['8 lbs (miniature)', '⅓ – ½ cup/day'],
     ['12 lbs (small standard)', '½ – ¾ cup/day'],
     ['16 lbs (average)', '¾ – 1 cup/day'],
     ['25 lbs (large standard)', '1 – 1¼ cups/day']],
    ['Real meat protein as the first ingredient — avoid fillers that pack on unnecessary calories',
     'Low-calorie formula is ideal — even small amounts of extra weight put massive stress on their long spine',
     'Calcium and phosphorus balance matters — supports the skeletal structure of this unique body shape',
     'Avoid foods with excessive fat — Dachshunds are prone to pancreatitis, especially if they sneak fatty table scraps',
     'Chondroitin and glucosamine supplements support spinal and joint health in a breed prone to IVDD'],
    'Weight management is critical for Dachshunds',
    "Every extra pound on a Dachshund is like 5–6 pounds on a human back — and it dramatically increases their risk of painful spinal disc disease (IVDD). Weigh your Dachshund monthly and consult your vet if they gain even 1–2 pounds."
  ),
  cost: costPanel(
    'Dachshund',
    '$800 – $1,500', '$2,000 – $3,500', '$50 – $300', '$200 – $600 (risky)',
    '$80 – $150',
    '$20 – $40/month', '$400 – $800/year', '$30 – $60/month',
    '$20 – $50/month', '$15 – $30/month',
    '$12,000 – $22,000',
    ['The biggest potential expense is spinal surgery (IVDD) — this can cost $3,000–$8,000 and affects up to 25% of Dachshunds',
     'Longhaired and wirehaired Dachshunds have higher grooming costs than the smooth-coated variety',
     'Miniature Dachshunds often live 14–17 years — a longer lifespan means overall lifetime costs can exceed estimates'],
    "Pet insurance is especially important for Dachshunds because of IVDD risk. The $3,000–$8,000 spinal surgery cost catches many owners off-guard. Insure before age 1 and before any symptoms appear."
  ),
  mixes: mixesPanel(
    'Dachshund',
    "The Dachshund's unique silhouette and bold personality make it a popular mixing partner. Here are the most loved Dachshund crosses.",
    [
      ['🌭', 'Chiweenie (Dachshund + Chihuahua)',
       "One of the most popular small-dog mixes in the US — compact, feisty, and deeply loyal. Chiweenies often inherit the Dachshund's long body and the Chihuahua's bold, sassy personality.",
       [['Size', '5 – 12 lbs'], ['Energy', 'Moderate – High'], ['Loyalty', 'Very High'], ['Best For', 'Singles, apartments']]],
      ['🐩', 'Doxiepoo (Dachshund + Poodle)',
       "Combines the Dachshund's personality with the Poodle's intelligence and low-shedding coat. Doxiepoos are playful, smart, and often hypoallergenic — great for allergy-prone families.",
       [['Size', '5 – 30 lbs (varies)'], ['Shedding', 'Low to none'], ['Intelligence', 'High'], ['Trainability', 'Good']]],
      ['🐕', 'Dorgi (Dachshund + Corgi)',
       "A royal combination — Queen Elizabeth II famously owned Corgis, and Dorgis became a beloved accidental mix in the royal household. Low to the ground with double the personality.",
       [['Size', '15 – 28 lbs'], ['Energy', 'Moderate – High'], ['Royal Connection', 'Yes — Queen Elizabeth II'], ['Personality', 'Bold, loyal']]],
      ['🦴', 'Doxle (Dachshund + Beagle)',
       "Combines two of the world's most scent-driven breeds. Doxles are curious, food-motivated, and determined trackers. They need a secure yard and a patient owner who appreciates their independent streak.",
       [['Size', '18 – 30 lbs'], ['Nose', 'Exceptional'], ['Energy', 'Moderate – High'], ['Stubbornness', 'High']]],
    ]
  ),
  facts: factsPanel(
    'Dachshund',
    "Small dog, massive history. Here are some of the most fascinating — and surprising — facts about the beloved Dachshund.",
    [
      '🏆 The Dachshund is one of the <strong>most popular breeds in the world</strong> — ranked in the top 10 in the US, Germany, UK, and Australia simultaneously for decades.',
      '🌭 The name "Dachshund" means <strong>"badger dog"</strong> in German (Dachs = badger, Hund = dog). They were bred to track, chase, and flush badgers out of their burrows — which explains their long body and powerful front paws.',
      '🎖️ During WWI, Dachshunds faced severe backlash in the United States — anti-German sentiment was so intense that <strong>owners were sometimes attacked in the street</strong> for walking them. Some Dachshunds were renamed "Liberty Hounds" to avoid harassment.',
      '🏅 Dachshunds hold the world record for the <strong>most Dachshunds in a single place</strong> — over 1,800 dogs attended a Dachshund parade in Melbourne, Australia in 2019.',
      '🎨 Pablo Picasso was obsessed with his Dachshund, Lump, who <strong>appeared in his artwork multiple times</strong>. The two were inseparable companions for years.',
      '🏃 Despite their small stature, Dachshunds are surprisingly athletic. Standard Dachshunds were bred to hunt <strong>wild boar</strong> — one of the most dangerous prey animals in Europe.',
      '🧬 There are three coat types (smooth, longhaired, wirehaired) and two sizes (standard, miniature) — creating <strong>six recognized varieties</strong> in a single breed.',
      '🐾 Dachshunds have the <strong>highest rate of intervertebral disc disease (IVDD)</strong> of any breed — their unique spine structure means up to 25% will experience some form of back problem in their lifetime.',
      '🌍 The Dachshund was chosen as the <strong>official mascot of the 1972 Munich Olympics</strong> — a dog named "Waldi" — making it the first Olympic mascot in history.',
    ],
    [
      ["Waldi", "Official mascot of the 1972 Munich Summer Olympics — the very first Olympic Games mascot ever created"],
      ["Lump (Picasso's Dachshund)", "Pablo Picasso's beloved Dachshund who appeared in his artwork and was his constant studio companion"],
      ["Crusoe the Celebrity Dachshund", "Social media star with millions of followers, known for his elaborate costume photos and charming videos"],
      ["Kaiser Wilhelm II's Dachshunds", "The German Emperor was so devoted to his Dachshunds that he had them buried with full military honors"],
    ]
  ),
};

// ── 6. ROTTWEILER ──────────────────────────────────────────────────────────────
breeds['rottweiler'] = {
  diet: dietPanel(
    'Rottweiler',
    '3–4 meals/day', '3 meals/day', '2 meals/day', '2 smaller meals/day',
    [['80 lbs (average female)', '4 – 5 cups/day'],
     ['100 lbs (average male)', '5 – 6 cups/day'],
     ['115 lbs (large male)', '6 – 7 cups/day'],
     ['130 lbs (extra large)', '7 – 8 cups/day']],
    ['High-quality protein (chicken, beef, or lamb) as the first ingredient — Rotties are muscular and need real meat',
     'Large-breed formula for puppies — Rottweilers grow quickly and need controlled calcium-to-phosphorus ratios to protect developing joints',
     'Glucosamine and chondroitin supplements — Rotties are prone to hip and elbow dysplasia, and joint support should start early',
     'Never feed one large meal — always split into 2 portions to significantly reduce the risk of life-threatening bloat (GDV)',
     'Avoid high-fat foods and table scraps — Rottweilers can develop pancreatitis, and excess weight worsens joint problems'],
    'Feeding a large breed like a Rottweiler',
    "Rottweilers are prone to bloat (GDV) — a life-threatening condition where the stomach twists. Always wait at least 60 minutes after feeding before exercise. Elevated feeding bowls are now considered controversial — ask your vet for the latest guidance."
  ),
  cost: costPanel(
    'Rottweiler',
    '$1,500 – $4,000', '$4,000 – $8,000+', '$50 – $400', '$500 – $1,200 (risky)',
    '$200 – $400',
    '$80 – $130/month', '$500 – $1,200/year', '$50 – $100/month',
    '$20 – $40/month', '$25 – $50/month',
    '$22,000 – $45,000',
    ['Obedience training is not optional for Rottweilers — budget $300–$600 for professional group classes, and more for private sessions',
     'Some homeowners\' insurance policies restrict or exclude Rottweiler ownership — check your policy before buying',
     'Hip and elbow OFA testing in parents is essential — avoid breeders who do not health-test their dogs'],
    "Rottweilers are a breed where skimping on initial costs (buying from an untested breeder) almost always leads to bigger expenses later. Proper health testing and professional training are investments, not extras."
  ),
  mixes: mixesPanel(
    'Rottweiler',
    "Rottweilers are mixed with other breeds to create loyal, protective family dogs. Here are the most popular Rottweiler crosses.",
    [
      ['🐾', 'Rottsky (Rottweiler + Siberian Husky)',
       "A striking mix of two very different breeds — the Rottweiler's loyalty and protective instincts combined with the Husky's energy and striking blue eyes. Rottskies are stunning and require experienced, active owners.",
       [['Size', '55 – 95 lbs'], ['Energy', 'Very High'], ['Eye Color', 'Often blue or bi-colored'], ['Experience Needed', 'High']]],
      ['🦮', 'Labrottie (Rottweiler + Labrador)',
       "Combines the Lab's friendliness and trainability with the Rottweiler's loyalty and protective instincts. Labrotties make excellent family guard dogs — social with family, cautious with strangers.",
       [['Size', '70 – 115 lbs'], ['Trainability', 'Excellent'], ['With Kids', 'Good with socialization'], ['Guard Dog', 'Natural']]],
      ['💪', 'Shepweiler (Rottweiler + German Shepherd)',
       "Powerful, intelligent, and intensely loyal. Shepweilers combine two of the world's premier working breeds. They're natural protectors who need experienced ownership and consistent training from puppyhood.",
       [['Size', '75 – 115 lbs'], ['Intelligence', 'Very High'], ['Protective Drive', 'Extreme'], ['Energy', 'High']]],
      ['🐕', 'Golden Rottie (Rottweiler + Golden Retriever)',
       "A surprisingly balanced mix — the Golden's warmth softens the Rottweiler's guardian instincts. Golden Rotties tend to be loyal, affectionate, and good with families while maintaining a natural watchdog awareness.",
       [['Size', '65 – 100 lbs'], ['Temperament', 'Balanced, loyal'], ['With Kids', 'Good'], ['Shedding', 'Moderate – High']]],
    ]
  ),
  facts: factsPanel(
    'Rottweiler',
    "One of the world's most powerful and misunderstood breeds — here are some surprising and impressive facts about the Rottweiler.",
    [
      '🏛️ Rottweilers are one of the <strong>oldest herding breeds</strong> — their ancestors were Roman drover dogs used to move livestock across Europe. They passed through the German town of Rottweil, which gave the breed its name.',
      '🥩 For centuries, Rottweilers were known as <strong>"Rottweiler Metzgerhund"</strong> — the Butcher\'s Dog of Rottweil — because local butchers used them to herd cattle to market and pull meat carts through the streets.',
      '🏋️ Rottweilers are one of the <strong>strongest dog breeds by bite force</strong> — with a bite pressure of approximately 328 PSI, compared to 235 PSI for a German Shepherd and 150 PSI for a Labrador.',
      '🪖 Rottweilers have served in both <strong>World War I and World War II</strong> as messenger dogs, ambulance dogs, and guard dogs — their courage and trainability made them valued military partners.',
      '🧠 Rottweilers consistently rank in the <strong>top 10 most intelligent breeds</strong>. They learn commands quickly and excel in obedience, tracking, search and rescue, and personal protection work.',
      '🐕 Despite their intimidating reputation, well-bred, well-socialized Rottweilers are <strong>calm, confident, and deeply affectionate</strong> with family. Their guardian instinct is natural — aggression is not.',
      '📉 Rottweiler populations declined so severely in the 1900s that by the early 20th century the breed was nearly extinct — only a few dedicated breeders in Germany kept the bloodline alive.',
      '🏆 Rottweilers are the <strong>8th most popular breed in the United States</strong> — a ranking that reflects how the perception of the breed has shifted as responsible ownership and training have become more widespread.',
      '💙 In disasters, Rottweilers have served as <strong>search and rescue dogs</strong> — working alongside Golden Retrievers and German Shepherds at sites like the 1995 Oklahoma City bombing.',
    ],
    [
      ["Strega Nona", "Famous show Rottweiler who helped change public perception of the breed through AKC conformation competition"],
      ["Rescue Rotties (OKC Bombing)", "Multiple Rottweilers served as search and rescue dogs following the 1995 Oklahoma City bombing"],
      ["Brutus (film)", "Rottweiler characters in films like 'Ferris Bueller's Day Off' and 'The Omen' ironically helped make the breed famous — and misunderstood"],
      ["Harras vom Sofienbusch", "One of the founding sires of the modern Rottweiler breed — his bloodline appears in virtually every purebred Rottweiler today"],
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

  // 1. Insert tab nav + open tab-profile after video section
  const old1 = '          </div>\n        </div>\n\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';
  const new1 = '          </div>\n        </div>\n\n' + TAB_NAV + '\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>';
  if (!html.includes(old1)) throw new Error(`Pattern 1 not found in ${filename}`);
  html = html.replace(old1, new1);

  // 2. Close tab-profile + add 4 new panels before breed-main ends
  const old2 = '          </div>\n        </div>\n\n      </div>\n\n      <aside class="breed-sidebar">';
  const new2 = '          </div>\n        </div>\n\n        </div><!-- end tab-profile -->\n\n'
    + d.diet + '\n' + d.cost + '\n' + d.mixes + '\n' + d.facts
    + '\n      </div>\n\n      <aside class="breed-sidebar">';
  if (!html.includes(old2)) throw new Error(`Pattern 2 not found in ${filename}`);
  html = html.replace(old2, new2);

  // 3. Add tab-switching JS after main.js
  const old3 = '  <script src="../js/main.js"></script>\n  <script>';
  const new3 = '  <script src="../js/main.js"></script>\n' + TAB_JS + '  <script>';
  if (!html.includes(old3)) throw new Error(`Pattern 3 not found in ${filename}`);
  html = html.replace(old3, new3);

  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ ${filename} updated`);
}

process('beagle.html',     'beagle');
process('dachshund.html',  'dachshund');
process('rottweiler.html', 'rottweiler');

console.log('\n✅ Batch 2 complete: beagle, dachshund, rottweiler');
