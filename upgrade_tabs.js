// upgrade_tabs.js — node upgrade_tabs.js
// Upgrades Diet, Cost, Mixes, and Fun Facts tabs on all 183 converted breed pages
// to match the rich Labrador Retriever style with info-grid, health-tags, travel-tip-box

'use strict';
const fs   = require('fs');
const path = require('path');

const breedsDir = path.join(__dirname, 'breeds');

// ── Helpers ───────────────────────────────────────────────────────────────────

function pluralize(name) {
  const words = name.split(' ');
  const last  = words[words.length - 1];
  let plural;
  if (/[^aeiou]y$/i.test(last))                    plural = last.slice(0, -1) + 'ies';
  else if (/[sxz]$/i.test(last) || /[sc]h$/i.test(last)) plural = last;
  else                                               plural = last + 's';
  words[words.length - 1] = plural;
  return words.join(' ');
}

function classifySize(weightStr) {
  if (!weightStr) return 'medium';
  const nums = (weightStr.match(/\d+/g) || []).map(Number);
  if (!nums.length) return 'medium';
  const max = Math.max(...nums);
  if (max <= 12) return 'toy';
  if (max <= 25) return 'small';
  if (max <= 55) return 'medium';
  if (max <= 90) return 'large';
  return 'giant';
}

function getBreedName(html) {
  const m = html.match(/<h1>([^<]+)<\/h1>/);
  return m ? m[1].trim() : 'this breed';
}

function getWeight(html) {
  const m = html.match(/<span class="quick-stat-value">([^<]*(?:lbs?|pounds?)[^<]*)<\/span>/i);
  return m ? m[1] : '';
}

function extractTabContent(html, tabId) {
  const startM = `<div class="breed-tab-panel" id="tab-${tabId}">`;
  const endM   = `</div><!-- end tab-${tabId} -->`;
  const s = html.indexOf(startM);
  const e = html.indexOf(endM);
  if (s === -1 || e === -1) return '';
  return html.slice(s + startM.length, e);
}

function getMixCards(html) {
  const cards = [];
  const re = /<div class="mix-card"><h3>(.*?)<\/h3><p>(.*?)<\/p><\/div>/gs;
  let m;
  while ((m = re.exec(html)) !== null) cards.push({ name: m[1].trim(), desc: m[2].trim() });
  return cards;
}

function getFunFacts(html) {
  const marker = '<ul class="fun-facts-list">';
  const s = html.indexOf(marker);
  if (s === -1) return [];
  const e = html.indexOf('</ul>', s);
  const chunk = html.slice(s + marker.length, e);
  const items = [];
  const re = /<li>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = re.exec(chunk)) !== null) items.push(m[1].trim());
  return items;
}

function getNutritionTips(dietContent) {
  const h3i = dietContent.indexOf('<h3>');
  if (h3i === -1) return [];
  const uls = dietContent.indexOf('<ul>', h3i);
  if (uls === -1) return [];
  const ule = dietContent.indexOf('</ul>', uls);
  const chunk = dietContent.slice(uls + 4, ule);
  const items = [];
  const re = /<li>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = re.exec(chunk)) !== null) items.push(m[1].trim());
  return items;
}

function getSidebarFacts(html) {
  const facts = [];
  const s = html.indexOf('<aside class="breed-sidebar">');
  if (s === -1) return facts;
  const chunk = html.slice(s);
  const re = /<div class="info-box-label">([^<]+)<\/div><div class="info-box-value">([^<]+)<\/div>/g;
  let m;
  while ((m = re.exec(chunk)) !== null) facts.push([m[1].trim(), m[2].trim()]);
  return facts;
}

function inferMixProps(name, desc) {
  const txt = (name + ' ' + desc).toLowerCase();

  // Size
  let size;
  if (/great dane|irish wolfhound|saint bernard|mastiff|newfoundland|leonberger|borzoi/.test(txt))
    size = '80–150+ lbs';
  else if (/great pyrenees|rottweiler|german shepherd|husky|golden retriever|labrador|retriever|weimaraner|doberman|boxer|akita/.test(txt))
    size = '50–90 lbs';
  else if (/cocker|spaniel|beagle|border collie|basenji|whippet|bulldog|shiba|australian shepherd/.test(txt))
    size = '25–50 lbs';
  else if (/dachshund|corgi|scottish|westie|cairn|jack russell|fox terrier|pug|boston|french bulldog/.test(txt))
    size = '12–30 lbs';
  else if (/chihuahua|pomeranian|maltese|yorkshire|yorkie|toy poodle|teacup|tiny|pocket/.test(txt))
    size = '5–15 lbs';
  else if (/miniature|mini poodle|mini schnauzer/.test(txt))
    size = '15–30 lbs';
  else if (/poodle|doodle/.test(txt))
    size = '45–70 lbs';
  else
    size = '20–45 lbs';

  // Energy
  let energy;
  if (/double terrier|jack russell|border collie|weimaraner|vizsla|belgian|unstoppable|very high/.test(txt))
    energy = 'Very High';
  else if (/bulldog|basset|bloodhound|chow|shar.pei|calm|mellow|low energy/.test(txt))
    energy = 'Low–Moderate';
  else
    energy = 'Moderate–High';

  // Shedding
  let shedding;
  if (/poodle|bichon|maltese|yorkshire|yorkie|hypoallergenic|low.shed/.test(txt))
    shedding = 'Low';
  else if (/husky|malamute|shepherd|golden retriever|collie|samoyed|chow|heavy shed/.test(txt))
    shedding = 'High';
  else
    shedding = 'Moderate';

  // Price
  let price;
  if (/poodle|doodle/.test(txt))             price = '$800–$3,000';
  else if (/golden|retriever|shepherd/.test(txt)) price = '$600–$1,800';
  else if (/husky|malamute/.test(txt))        price = '$500–$1,500';
  else                                         price = '$300–$1,200';

  return { size, energy, shedding, price };
}

function mixEmoji(name) {
  const n = name.toLowerCase();
  if (/poodle|doodle/.test(n))    return '🐩';
  if (/golden|retriever/.test(n)) return '🐕';
  if (/shepherd|wolf/.test(n))    return '🐺';
  if (/husky|malamute/.test(n))   return '🐺';
  if (/bulldog/.test(n))          return '🐾';
  if (/chihuahua/.test(n))        return '🐕';
  if (/beagle/.test(n))           return '🐕';
  if (/dachshund/.test(n))        return '🐕';
  if (/corgi/.test(n))            return '🐾';
  return '🐾';
}

// ── Size-specific data ────────────────────────────────────────────────────────

const SIZE_DIET = {
  toy: {
    portionGuide: [
      ['5 lbs (inactive)',     '¼ cup/day'],
      ['8 lbs (average)',      '⅓ cup/day'],
      ['10 lbs (active)',      '½ cup/day'],
      ['12 lbs (very active)', '½–¾ cup/day'],
    ],
    sizeLabel: 'toy', foodType: 'Toy-breed',
  },
  small: {
    portionGuide: [
      ['10 lbs (inactive)',    '½ cup/day'],
      ['15 lbs (average)',     '¾ cup/day'],
      ['20 lbs (active)',      '1 cup/day'],
      ['25 lbs (very active)', '1¼ cups/day'],
    ],
    sizeLabel: 'small', foodType: 'Small-breed',
  },
  medium: {
    portionGuide: [
      ['30 lbs (inactive)',    '1½ cups/day'],
      ['40 lbs (average)',     '1¾ cups/day'],
      ['50 lbs (active)',      '2¼ cups/day'],
      ['55 lbs (very active)', '2½ cups/day'],
    ],
    sizeLabel: 'medium', foodType: 'Medium or large-breed',
  },
  large: {
    portionGuide: [
      ['60 lbs (inactive)',    '2½ cups/day'],
      ['70 lbs (average)',     '3 cups/day'],
      ['80 lbs (active)',      '3½ cups/day'],
      ['90 lbs (very active)', '4 cups/day'],
    ],
    sizeLabel: 'large', foodType: 'Large-breed',
  },
  giant: {
    portionGuide: [
      ['100 lbs (inactive)',      '4 cups/day'],
      ['120 lbs (average)',       '5 cups/day'],
      ['140 lbs (active)',        '5½ cups/day'],
      ['160+ lbs (very active)',  '6+ cups/day'],
    ],
    sizeLabel: 'giant', foodType: 'Giant-breed',
  },
};

const SIZE_COST = {
  toy:    { breeder: '$500–$2,000',   show: '$2,000–$5,000+', rescue: '$50–$300',  backyard: '$200–$600 (risky)',    food: '$20–$35',  monthly: '$80–$150',  lifetime: '$6,000–$14,000' },
  small:  { breeder: '$500–$1,500',   show: '$1,500–$4,000+', rescue: '$50–$350',  backyard: '$200–$600 (risky)',    food: '$25–$50',  monthly: '$100–$180', lifetime: '$8,000–$18,000' },
  medium: { breeder: '$700–$2,000',   show: '$2,000–$5,000+', rescue: '$50–$450',  backyard: '$250–$700 (risky)',    food: '$40–$70',  monthly: '$120–$250', lifetime: '$12,000–$22,000' },
  large:  { breeder: '$800–$2,500',   show: '$2,000–$6,000+', rescue: '$50–$500',  backyard: '$300–$800 (risky)',    food: '$55–$90',  monthly: '$150–$300', lifetime: '$15,000–$28,000' },
  giant:  { breeder: '$1,000–$3,500', show: '$3,000–$8,000+', rescue: '$100–$600', backyard: '$400–$1,000 (risky)', food: '$80–$150', monthly: '$200–$400', lifetime: '$18,000–$35,000' },
};

const LIFETIME_YEARS = { toy: '12–16', small: '12–15', medium: '10–13', large: '8–12', giant: '7–10' };

// ── Tab builders ──────────────────────────────────────────────────────────────

function buildDietTab(breedName, breedPlural, size, dietContent) {
  const d    = SIZE_DIET[size];
  const tips = getNutritionTips(dietContent);

  const portionBoxes = d.portionGuide
    .map(([lbl, val]) =>
      `              <div class="info-box"><div class="info-box-label">${lbl}</div><div class="info-box-value">${val}</div></div>`)
    .join('\n');

  const bestFoodsItems = tips.length >= 3
    ? tips.map(t => `              <li>${t}</li>`).join('\n')
    : `              <li>High-quality dry kibble with real meat as the first ingredient</li>
              <li>${d.foodType} formula designed for their size and caloric needs</li>
              <li>Omega-3 fatty acids (fish oil) for coat and joint health</li>
              <li>Glucosamine &amp; chondroitin for joint support as they age</li>
              <li>Avoid: artificial colors, BHA/BHT preservatives, excessive corn and soy fillers</li>`;

  return `<div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ How Much to Feed a ${breedName}</h2>
            <p>${breedPlural} need consistent, well-portioned meals matched to their life stage. Overfeeding is one of the biggest health risks for any dog — use these guidelines and adjust based on your dog's activity level and body condition.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Puppy (8–12 weeks)</div><div class="info-box-value">3–4 small meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Puppy (3–6 months)</div><div class="info-box-value">3 meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Adult (1+ year)</div><div class="info-box-value">2 meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Senior (7+ years)</div><div class="info-box-value">2 smaller meals per day</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📏 Daily Portion Guide by Weight</h2>
            <p>These are general guidelines for a ${d.sizeLabel}-breed dog. Always check the feeding instructions on your specific food brand, and adjust based on activity level and body condition score.</p>
            <div class="info-grid">
${portionBoxes}
            </div>
          </div>
          <div class="breed-section">
            <h2>✅ Best Foods for ${breedPlural}</h2>
            <p>Look for dog foods where the first ingredient is a named protein — chicken, beef, salmon, or lamb. ${d.foodType} formulas are calibrated for their metabolism and nutritional needs.</p>
            <ul>
${bestFoodsItems}
            </ul>
          </div>
          <div class="breed-section">
            <h2>🚫 Foods That Are Dangerous for ${breedPlural}</h2>
            <p>These common human foods can be toxic — even life-threatening — for dogs. Keep them safely out of reach at all times.</p>
            <div class="health-tags">
              <span class="health-tag">Chocolate</span>
              <span class="health-tag">Grapes &amp; Raisins</span>
              <span class="health-tag">Onions &amp; Garlic</span>
              <span class="health-tag">Xylitol (artificial sweetener)</span>
              <span class="health-tag">Macadamia Nuts</span>
              <span class="health-tag">Alcohol</span>
              <span class="health-tag">Avocado</span>
              <span class="health-tag">Raw yeast dough</span>
            </div>
          </div>
          <div class="breed-section">
            <h2>🦴 Healthy Treats for ${breedPlural}</h2>
            <ul>
              <li>Carrots — low calorie, great for dental health</li>
              <li>Blueberries — antioxidants and a sweet reward</li>
              <li>Plain cooked chicken or turkey (no seasoning)</li>
              <li>Apple slices (remove seeds and core)</li>
              <li>Plain rice cakes — low-calorie training reward</li>
              <li>Commercial treats sized appropriately for a ${d.sizeLabel} breed</li>
            </ul>
            <div class="travel-tip-box">
              <h4>💡 Tip: Boarding your ${breedName}?</h4>
              <p>Always bring your ${breedName}'s regular food when boarding. Switching food suddenly can cause digestive upset. Provide the facility your exact feeding schedule and portion sizes.</p>
            </div>
          </div>
        </div><!-- end tab-diet -->`;
}

function buildCostTab(breedName, breedPlural, size) {
  const c   = SIZE_COST[size];
  const yrs = LIFETIME_YEARS[size];

  return `<div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 How Much Does a ${breedName} Cost?</h2>
            <p>The upfront cost of a ${breedName} is just the beginning. Here's a realistic breakdown of what to expect — both to acquire one and to own one for their lifetime.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Reputable Breeder</div><div class="info-box-value">${c.breeder}</div></div>
              <div class="info-box"><div class="info-box-label">Show / Champion Lines</div><div class="info-box-value">${c.show}</div></div>
              <div class="info-box"><div class="info-box-label">Rescue / Adoption</div><div class="info-box-value">${c.rescue}</div></div>
              <div class="info-box"><div class="info-box-label">Backyard Breeder ⚠️</div><div class="info-box-value">${c.backyard}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📅 Monthly Cost of Owning a ${breedName}</h2>
            <p>Beyond the purchase price, owning a ${breedName} costs between <strong>${c.monthly} per month</strong> on average. Here's where the money goes:</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Food (quality kibble)</div><div class="info-box-value">${c.food}/month</div></div>
              <div class="info-box"><div class="info-box-label">Vet visits (annual)</div><div class="info-box-value">$400 – $800/year</div></div>
              <div class="info-box"><div class="info-box-label">Pet insurance</div><div class="info-box-value">$30 – $70/month</div></div>
              <div class="info-box"><div class="info-box-label">Grooming</div><div class="info-box-value">$30 – $80/month</div></div>
              <div class="info-box"><div class="info-box-label">Toys &amp; supplies</div><div class="info-box-value">$15 – $35/month</div></div>
              <div class="info-box"><div class="info-box-label">Training classes</div><div class="info-box-value">$100 – $300 (one-time)</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📊 Lifetime Cost Estimate</h2>
            <p>Over a ${yrs} year lifespan, a ${breedName} typically costs between <strong>${c.lifetime} total</strong> — depending on health, lifestyle, and the services you use.</p>
            <ul>
              <li>First year is the most expensive: purchase cost + vaccinations + spay/neuter + starter supplies</li>
              <li>Budget extra for unexpected vet bills — accidents and emergencies can happen to any breed</li>
              <li>Pet insurance pays for itself if your dog ever needs surgery or serious treatment</li>
              <li>Boarding costs: plan for $50–$100/night at quality facilities when you travel</li>
            </ul>
            <div class="travel-tip-box">
              <h4>💡 Money-saving tip</h4>
              <p>Pet insurance is worth considering for any breed. Buying before your dog turns 1 gives the best rates and fewest pre-existing condition exclusions. Compare 2–3 providers before committing.</p>
            </div>
          </div>
          <div class="breed-section">
            <h2>💡 How to Save Money as a ${breedName} Owner</h2>
            <ul>
              <li>Get pet insurance before your dog turns 1 — premiums are lower and pre-existing conditions won't be excluded</li>
              <li>Buy food in larger bags when possible — significantly cheaper per pound</li>
              <li>Learn basic grooming at home — brushing, ear cleaning, and nail trimming save groomer fees</li>
              <li>Ask your vet about wellness plans — many clinics offer annual packages that bundle routine care</li>
              <li>Use a rewards credit card for larger vet bills</li>
              <li>Adopt instead of buying — rescue ${breedPlural} are just as loving and cost a fraction of the price</li>
            </ul>
          </div>
        </div><!-- end tab-cost -->`;
}

function buildMixesTab(breedName, breedPlural, mixCards) {
  if (!mixCards.length) {
    return `<div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular ${breedName} Mix Breeds</h2>
            <p>${breedPlural} are sometimes crossed with other breeds to create unique companions. Mix breeds can inherit the best qualities of both parents.</p>
          </div>
        </div><!-- end tab-mixes -->`;
  }

  const sections = mixCards.map(card => {
    const props = inferMixProps(card.name, card.desc);
    const emoji = mixEmoji(card.name);
    return `          <div class="breed-section">
            <h2>${emoji} ${card.name}</h2>
            <p>${card.desc}</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Size</div><div class="info-box-value">${props.size}</div></div>
              <div class="info-box"><div class="info-box-label">Energy</div><div class="info-box-value">${props.energy}</div></div>
              <div class="info-box"><div class="info-box-label">Shedding</div><div class="info-box-value">${props.shedding}</div></div>
              <div class="info-box"><div class="info-box-label">Price</div><div class="info-box-value">${props.price}</div></div>
            </div>
          </div>`;
  }).join('\n');

  return `<div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular ${breedName} Mix Breeds</h2>
            <p>Because ${breedPlural} have such wonderful traits, they're a popular choice for intentional mixed breeding. Here are the most common — and most loved — ${breedName} crosses.</p>
          </div>
${sections}
        </div><!-- end tab-mixes -->`;
}

function buildFactsTab(breedName, breedPlural, funFacts, sidebarFacts) {
  const factsItems = funFacts.length
    ? funFacts.map(f => `              <li>${f}</li>`).join('\n')
    : `              <li>${breedPlural} are one of the most unique and beloved breeds in the world, with a history stretching back centuries.</li>
              <li>Their combination of loyalty, intelligence, and adaptability makes them outstanding companions for the right owner.</li>
              <li>Responsible breeding and early socialization consistently produce the best temperaments in this breed.</li>`;

  const glanceBoxes = sidebarFacts.slice(0, 4)
    .map(([k, v]) =>
      `              <div class="info-box"><div class="info-box-label">${k}</div><div class="info-box-value">${v}</div></div>`)
    .join('\n');

  const glanceFallback = `              <div class="info-box"><div class="info-box-label">See Profile</div><div class="info-box-value">For full breed stats</div></div>`;

  return `<div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Amazing Facts About ${breedPlural}</h2>
            <p>${breedPlural} are full of surprises. Here are some of the most fascinating, funny, and heartwarming facts about this breed.</p>
            <ul>
${factsItems}
            </ul>
          </div>
          <div class="breed-section">
            <h2>📋 ${breedName} At a Glance</h2>
            <div class="info-grid">
${glanceBoxes || glanceFallback}
            </div>
          </div>
          <div class="breed-section">
            <h2>❤️ Why People Love the ${breedName}</h2>
            <ul>
              <li>Loyal and devoted companions who form deep bonds with their families</li>
              <li>Adaptable to a wide variety of living situations with the right exercise and care</li>
              <li>Unique history and personality that sets them apart from other breeds</li>
              <li>Consistently ranked among the most rewarding breeds to live with</li>
            </ul>
          </div>
        </div><!-- end tab-facts -->`;
}

// ── Replace a full tab (start marker → end marker) ───────────────────────────
function replaceTab(html, tabId, newContent) {
  const startM = `<div class="breed-tab-panel" id="tab-${tabId}">`;
  const endM   = `</div><!-- end tab-${tabId} -->`;
  const s = html.indexOf(startM);
  const e = html.indexOf(endM);
  if (s === -1 || e === -1) return html;
  return html.slice(0, s) + newContent + html.slice(e + endM.length);
}

// ── Main ──────────────────────────────────────────────────────────────────────
const files = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let upgraded = 0, skipped = 0;

for (const file of files) {
  const fp = path.join(breedsDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Only process converted pages that still have the old diet-table format
  if (!html.includes('class="diet-table"')) { skipped++; continue; }

  const breedName    = getBreedName(html);
  const breedPlural  = pluralize(breedName);
  const size         = classifySize(getWeight(html));
  const mixCards     = getMixCards(html);
  const funFacts     = getFunFacts(html);
  const sidebarFacts = getSidebarFacts(html);
  const dietContent  = extractTabContent(html, 'diet'); // extract BEFORE replacement

  html = replaceTab(html, 'diet',  buildDietTab(breedName, breedPlural, size, dietContent));
  html = replaceTab(html, 'cost',  buildCostTab(breedName, breedPlural, size));
  html = replaceTab(html, 'mixes', buildMixesTab(breedName, breedPlural, mixCards));
  html = replaceTab(html, 'facts', buildFactsTab(breedName, breedPlural, funFacts, sidebarFacts));

  fs.writeFileSync(fp, html, 'utf8');
  upgraded++;
  console.log(`✓ ${file.padEnd(45)} ${size}`);
}

console.log('\n──────────────────────────────────────');
console.log('Upgraded : ' + upgraded);
console.log('Skipped  : ' + skipped + ' (already upgraded or original pages)');
