// enrich_breed_pages.js — node enrich_breed_pages.js
// Adds Temperament, Exercise, Grooming, Training, Health, Compat & Related sections
// to the 183 converted breed pages (skips pages that already have them).
const fs = require('fs');
const path = require('path');

const breedsDir = path.join(__dirname, 'breeds');

// ─── Extractors ───────────────────────────────────────────────────────────────

function extractTraits(html) {
  const t = {};
  const re = /class="trait-item"><div class="trait-header"><span>(.*?)<\/span><span>.*?<\/span><\/div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:(\d+)%/g;
  let m;
  while ((m = re.exec(html)) !== null) t[m[1].toLowerCase()] = parseInt(m[2]);
  return t;
}

function extractFacts(html) {
  const f = {};
  const re = /<div class="info-box-label">(.*?)<\/div><div class="info-box-value">(.*?)<\/div>/g;
  let m;
  while ((m = re.exec(html)) !== null) f[m[1].toLowerCase()] = m[2].replace(/<[^>]+>/g,'');
  return f;
}

function extractStats(html) {
  const qv = (label) => {
    const r = new RegExp('quick-stat-value">(.*?)<\\/span><span class="quick-stat-label">' + label);
    const m = html.match(r);
    return m ? m[1] : '';
  };
  return { weight: qv('Weight'), height: qv('Height'), lifespan: qv('Lifespan'), energy: qv('Energy') };
}

function extractGroupInfo(html) {
  const sub = (html.match(/breed-subtitle">(.*?)<\/p>/) || [])[1] || '';
  const parts = sub.split(' · ');
  return { group: (parts[0] || '').trim(), type: (parts[1] || 'Purebred').trim() };
}

function extractBreedName(html) {
  return (html.match(/<h1>(.*?)<\/h1>/) || [])[1] || '';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stars(pct) {
  let n = pct >= 85 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : pct >= 30 ? 2 : 1;
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function getMinWeight(w) {
  const m = (w || '').match(/(\d+)/);
  return m ? parseInt(m[1]) : 30;
}

function sizeLabel(minW) {
  return minW <= 15 ? 'small' : minW <= 40 ? 'medium' : minW <= 80 ? 'large' : 'giant';
}

// ─── Group knowledge base ─────────────────────────────────────────────────────

const GRP = {
  terrier: {
    temperament: ['tenacious and fearless', 'bold, energetic, and alert', 'independent and spirited'],
    exercise: 'daily vigorous play, digging opportunities, and interactive games that channel their prey drive',
    trainNote: 'Terriers are intelligent but independent — short, varied sessions with high-value rewards work best. Avoid repetition, which bores them quickly.',
    groomNote: 'Wire-coated terriers benefit from hand-stripping rather than clipping to maintain coat texture. Smooth-coated varieties need only weekly brushing.',
    health: ['Patellar luxation', 'Skin allergies', 'Eye conditions', 'Legg-Calvé-Perthes disease'],
    related: [['cairn-terrier','🐾','Cairn Terrier'],['west-highland-white-terrier','🐾','West Highland White Terrier'],['airedale-terrier','🐾','Airedale Terrier']]
  },
  sporting: {
    temperament: ['friendly, active, and eager to please', 'outgoing and sociable', 'energetic and loyal'],
    exercise: 'vigorous daily exercise — swimming, fetch, trail hiking, or dog sports — plus mental enrichment',
    trainNote: 'Sporting dogs are among the most trainable breeds. They respond enthusiastically to positive reinforcement and food rewards. Begin obedience training early.',
    groomNote: 'Feathered coats need brushing 2–3 times weekly. Pay special attention to the ears — floppy ears trap moisture and are prone to infections.',
    health: ['Hip dysplasia', 'Ear infections', 'Progressive retinal atrophy', 'Exercise-induced collapse (some lines)'],
    related: [['golden-retriever','🦮','Golden Retriever'],['labrador-retriever','🐕','Labrador Retriever'],['cocker-spaniel','🐕','Cocker Spaniel']]
  },
  working: {
    temperament: ['loyal, powerful, and alert', 'confident and protective', 'devoted and strong-willed'],
    exercise: 'structured daily exercise with purposeful activity — working breeds need a job or structured outlet to stay balanced',
    trainNote: 'Working breeds require experienced, consistent handling. Early socialization and obedience training are non-negotiable. They respect clear leadership.',
    groomNote: 'Grooming needs vary widely in this group. Most working breeds benefit from weekly brushing. Check nails, ears, and teeth regularly.',
    health: ['Hip and elbow dysplasia', 'Bloat (GDV)', 'Cardiac conditions', 'Bone cancer (larger breeds)'],
    related: [['rottweiler','🛡️','Rottweiler'],['doberman-pinscher','🐕','Doberman Pinscher'],['boxer','🥊','Boxer']]
  },
  herding: {
    temperament: ['highly intelligent and responsive', 'energetic, focused, and trainable', 'loyal with strong instincts'],
    exercise: 'daily vigorous exercise plus significant mental stimulation — herding instincts must have outlets or they\'ll herd children, cats, and anything that moves',
    trainNote: 'Herding breeds are among the most trainable dogs in the world. They thrive in obedience, agility, and rally sports. Challenge their minds daily.',
    groomNote: 'Double-coated herding breeds shed seasonally and benefit from regular brushing with a slicker brush and undercoat rake during shed seasons.',
    health: ['Hip dysplasia', 'Collie eye anomaly (some breeds)', 'MDR1 drug sensitivity', 'Epilepsy'],
    related: [['border-collie','🐕','Border Collie'],['german-shepherd','🐕‍🦺','German Shepherd'],['australian-shepherd','🐕','Australian Shepherd']]
  },
  hound: {
    temperament: ['independent, determined, and loyal', 'driven by instinct — scent or sight', 'gentle at home but single-minded on the trail'],
    exercise: 'daily off-leash running in a securely fenced area for sighthounds; long scent walks for scenthounds — never trust off-leash without a fence',
    trainNote: 'Hounds can be selectively deaf when a scent or sight captures their attention. Keep training sessions short and engaging, and always train in a secure area.',
    groomNote: 'Smooth-coated hounds need minimal grooming — a weekly wipe-down suffices. Rough-coated or longer-haired hounds need regular brushing and ear cleaning.',
    health: ['Bloat (GDV) in deep-chested breeds', 'Hip dysplasia', 'Eye conditions', 'Ear infections (floppy-eared breeds)'],
    related: [['basset-hound','🐕','Basset Hound'],['beagle','🐕','Beagle'],['bloodhound','🐕','Bloodhound']]
  },
  toy: {
    temperament: ['affectionate, alert, and adaptable', 'surprisingly bold for their small size', 'devoted companions who love being close to their people'],
    exercise: 'short daily walks and indoor play sessions — tiny legs cover ground faster than you think, but overall distance needs are modest',
    trainNote: 'Toy breeds are often underestimated — they\'re very intelligent. "Small dog syndrome" comes from inconsistent rules. Train them exactly as you would a large dog.',
    groomNote: 'Many toy breeds have silky or long coats requiring daily brushing to prevent tangles. Professional grooming every 6–8 weeks keeps coats manageable.',
    health: ['Patellar luxation', 'Dental disease (crowded teeth in small mouths)', 'Tracheal collapse', 'Hypoglycemia in very small individuals'],
    related: [['chihuahua','🐕','Chihuahua'],['pomeranian','🐕','Pomeranian'],['maltese','🐕','Maltese']]
  },
  'non-sporting': {
    temperament: ['diverse in personality — this group is a catch-all of unique breeds', 'adaptable and generally companion-oriented', 'each breed has distinct traits — research yours specifically'],
    exercise: 'exercise needs vary significantly within this group — match activity to your specific breed\'s energy level and size',
    trainNote: 'Training requirements vary greatly within this group. Research the specific training style that suits your breed\'s temperament.',
    groomNote: 'Grooming needs are highly breed-specific in this group — from the nearly no-maintenance Dalmatian to the high-maintenance Poodle.',
    health: ['Varies significantly by breed', 'Hip dysplasia common', 'Regular veterinary screening recommended'],
    related: [['french-bulldog','🐕','French Bulldog'],['poodle','🐕','Poodle'],['dalmatian','🐕','Dalmatian']]
  },
  hybrid: {
    temperament: ['sociable and adaptable', 'often inheriting the best traits of both parent breeds', 'personality can vary — early socialization shapes their adult character'],
    exercise: 'daily exercise matched to the energy levels of the parent breeds — most hybrids fall in the moderate-to-high energy range',
    trainNote: 'Many popular hybrids include Poodle ancestry, which contributes high intelligence and trainability. Start early, be consistent, and use positive reinforcement.',
    groomNote: 'Coat type depends on which parent is dominant. Curly or wavy coats (common in doodles) need professional grooming every 6–8 weeks and daily brushing at home.',
    health: ['Hybrid vigor may reduce some conditions', 'Hip dysplasia', 'Eye conditions', 'Inherits parent-breed health risks'],
    related: [['goldendoodle','🐩','Goldendoodle'],['labradoodle','🐕','Labradoodle'],['cavapoo','🐕','Cavapoo']]
  },
  default: {
    temperament: ['loyal, intelligent, and devoted', 'forms strong bonds with their family', 'adaptable to various living situations when their needs are met'],
    exercise: 'regular daily exercise suited to their size and energy level — consistency matters more than intensity',
    trainNote: 'Consistent positive reinforcement with short, rewarding sessions works well. Begin socialization early and enroll in puppy classes if possible.',
    groomNote: 'Regular brushing, nail trimming every 3–4 weeks, weekly ear checks, and periodic baths keep most breeds comfortable and healthy.',
    health: ['Hip dysplasia', 'Dental disease', 'Eye conditions', 'Obesity if under-exercised'],
    related: [['golden-retriever','🦮','Golden Retriever'],['labrador-retriever','🐕','Labrador Retriever'],['german-shepherd','🐕‍🦺','German Shepherd']]
  }
};

function getGrp(group, type) {
  const gl = (group + ' ' + type).toLowerCase();
  if (gl.includes('hybrid') || gl.includes('designer')) return GRP.hybrid;
  if (gl.includes('terrier')) return GRP.terrier;
  if (gl.includes('sport')) return GRP.sporting;
  if (gl.includes('working')) return GRP.working;
  if (gl.includes('herd') || gl.includes('pastoral')) return GRP.herding;
  if (gl.includes('hound')) return GRP.hound;
  if (gl.includes('toy')) return GRP.toy;
  if (gl.includes('non-sport') || gl.includes('non sport') || gl.includes('utility')) return GRP['non-sporting'];
  return GRP.default;
}

// ─── Section generators ───────────────────────────────────────────────────────

function secTemperament(bn, traits, grp, isHybrid) {
  const epct  = traits['energy level'] || traits['energy'] || 65;
  const tpct  = traits['trainability'] || traits['intelligence'] || 65;
  const kpct  = traits['good with kids'] || 65;
  const fpct  = traits['friendliness'] || traits['affection'] || traits['loyalty'] || 70;

  const mood  = grp.temperament[Math.floor(Math.random() * grp.temperament.length)];
  const eLow  = epct < 45;
  const eMid  = epct >= 45 && epct < 70;
  const eHigh = epct >= 70;

  const p1 = `${bn}s are known for being ${mood}. They form deep bonds with their families and thrive on consistent human connection. ${eHigh ? `As a high-energy ${isHybrid ? 'hybrid' : 'breed'}, they are best matched with active owners who enjoy outdoor activities and can commit to regular exercise.` : eLow ? `As a calmer ${isHybrid ? 'hybrid' : 'breed'}, they suit owners who prefer a relaxed lifestyle and appreciate a dog content to lounge alongside them.` : `They strike a good balance — lively enough to enjoy playtime and adventures, but calm enough to settle indoors when the day is done.`}`;

  const p2 = `${tpct >= 70 ? `Training is generally a pleasure with ${bn}s — they are responsive, motivated, and pick up commands quickly.` : tpct >= 50 ? `${bn}s can be trained with patience and consistency, though they may occasionally test boundaries.` : `${bn}s have an independent streak that requires patient, experienced handling — but the effort is rewarding.`} ${kpct >= 75 ? `They are typically gentle and patient with children, making them a reliable family companion.` : kpct >= 55 ? `With proper socialization they can do well with children, though supervision is always wise.` : `They do better in households with older, respectful children rather than very young kids.`}`;

  const bullets = [
    eHigh  ? `Energetic and playful — needs daily outlets and consistent exercise to stay balanced`
           : eMid ? `Moderately active — enjoys exercise and playtime but appreciates downtime at home`
           : `Calm and relaxed — content with gentle activity and quality time with their people`,
    fpct >= 70 ? `Affectionate and people-oriented — thrives on closeness with their family`
               : `More reserved with strangers but deeply loyal and devoted to their inner circle`,
    kpct >= 75 ? `Patient and gentle with children — a dependable family companion`
               : kpct >= 55 ? `Generally good with kids when properly socialized from puppyhood`
               : `Better suited for homes with older children or adults`,
    tpct >= 70 ? `Intelligent and eager to learn — responds enthusiastically to positive training methods`
               : tpct >= 50 ? `Capable learner who benefits from short, varied training sessions`
               : `Independent thinker — consistent rules and calm leadership work best`,
    isHybrid ? `Personality can vary depending on which parent breed's traits dominate — early socialization is key`
             : `Breed-typical personality is reliable and predictable — makes planning your lifestyle together easier`,
    eHigh ? `Mental stimulation is as important as physical exercise — puzzle toys and training prevent boredom`
          : `Genuinely enjoys relaxing — equally happy on a couch as on a trail with the right owner`,
  ];

  return `
          <div class="breed-section">
            <h2>😊 Temperament &amp; Personality</h2>
            <p>${p1}</p>
            <p>${p2}</p>
            <ul>
              ${bullets.map(b => `<li>${b}</li>`).join('\n              ')}
            </ul>
          </div>`;
}

function secExercise(bn, traits, grp, stats) {
  const epct = traits['energy level'] || traits['energy'] || 65;
  const minW = getMinWeight(stats.weight);
  const sz   = sizeLabel(minW);

  const dur  = epct >= 85 ? '1.5 – 2+ hours' : epct >= 70 ? '1 – 1.5 hours' : epct >= 50 ? '45 – 60 minutes' : epct >= 35 ? '30 – 45 minutes' : '20 – 30 minutes';
  const intens= epct >= 70 ? 'vigorous' : epct >= 45 ? 'moderate' : 'gentle';

  const p1 = epct >= 75
    ? `${bn}s are high-energy dogs that need significant daily exercise to stay physically and mentally healthy. Without adequate activity they can become restless, vocal, or destructive. They are happiest with owners who genuinely enjoy an active lifestyle.`
    : epct >= 45
    ? `${bn}s need regular daily exercise to maintain a healthy weight and an even temperament. They are versatile companions who enjoy active outings but are equally content to relax at home after their needs are met.`
    : `${bn}s have modest exercise requirements that suit many different lifestyles. Short daily walks and gentle play sessions keep them happy and healthy without demanding a major time commitment.`;

  let bullets;
  if (epct >= 75) {
    bullets = [
      `Daily exercise: ${dur} of ${intens} activity — split into morning and evening sessions`,
      grp.exercise.charAt(0).toUpperCase() + grp.exercise.slice(1),
      `Off-leash time in a securely fenced yard or dog park is highly beneficial`,
      `Mental enrichment (puzzle feeders, scent games, obedience training) is as important as physical activity`,
      `Without adequate exercise they may develop destructive habits from boredom`,
      `Puppies: limit impact exercise to 5 minutes per month of age to protect developing joints`,
    ];
  } else if (epct >= 45) {
    bullets = [
      `Daily exercise: ${dur} of ${intens} activity`,
      grp.exercise.charAt(0).toUpperCase() + grp.exercise.slice(1),
      `Daily walks, play sessions, and occasional trips to a dog park are ideal`,
      `Mental enrichment (puzzle toys, training) complements physical exercise`,
      `Adjust intensity based on age — puppies and seniors need gentler, shorter sessions`,
      `${sz === 'small' || sz === 'medium' ? 'Indoor play can substitute on days with extreme weather' : 'Aim for a mix of on-leash walks and free play'}`,
    ];
  } else {
    bullets = [
      `Daily exercise: ${dur} of ${intens} activity is usually sufficient`,
      `Short walks and gentle indoor play keep them content`,
      `Avoid over-exercising — they tire more quickly and prefer a relaxed pace`,
      `Mental stimulation (gentle puzzle games, sniff walks) keeps their mind active without overexertion`,
      `Watch for signs of fatigue and always let your dog set the pace`,
      `${sz === 'small' ? 'Indoor playtime in a safe space can meet most of their exercise needs' : 'A calm, consistent routine suits them better than intense sporadic activity'}`,
    ];
  }

  return `
          <div class="breed-section">
            <h2>🏃 Exercise &amp; Activity Needs</h2>
            <p>${p1}</p>
            <ul>
              ${bullets.map(b => `<li>${b}</li>`).join('\n              ')}
            </ul>
          </div>`;
}

function secGrooming(bn, traits, grp, facts) {
  const coat = (facts['coat'] || facts['coat type'] || '').toLowerCase();
  const shed = (facts['shedding'] || '').toLowerCase();
  const groomPct = traits['grooming needs'] || traits['grooming'] || 0;

  let p, bullets;

  const isLong   = coat.includes('long') || coat.includes('silky') || coat.includes('wavy') || coat.includes('flowing') || coat.includes('feather');
  const isCurly  = coat.includes('curly') || coat.includes('wooly') || coat.includes('woolly') || coat.includes('poodle');
  const isDouble = coat.includes('double') || coat.includes('dense') || coat.includes('thick') || coat.includes('plush') || shed.includes('high') || shed.includes('heavy');
  const isWire   = coat.includes('wire') || coat.includes('rough') || coat.includes('wiry') || coat.includes('harsh');
  const isShort  = !isLong && !isCurly && !isDouble && !isWire;

  if (isCurly) {
    p = `${bn}s have a curly or wavy coat that grows continuously and does not shed the way most breeds do. Without regular grooming, the coat will mat and tangle — professional trims every 6–8 weeks are essential, along with daily or every-other-day brushing at home.`;
    bullets = [
      'Brush daily or every other day to prevent mats — use a slicker brush and metal comb',
      'Professional grooming every 6–8 weeks to trim and shape the coat',
      'Bathe every 4–6 weeks using a dog-specific moisturizing shampoo',
      'Check and clean inside the ears weekly — curly-coated dogs trap moisture and debris',
      'Trim nails every 3–4 weeks',
      'Keep the face trimmed around the eyes to maintain visibility and prevent tear stains',
    ];
  } else if (isWire) {
    p = `${bn}s have a distinctive wiry, rough coat that benefits from hand-stripping to maintain its correct texture and weather-resistant properties. Clipping changes the coat texture over time and removes the protective outer layer.`;
    bullets = [
      'Hand-strip the coat 1–2 times per year to maintain proper wire texture',
      'Brush weekly to remove loose dead hair and keep the undercoat tidy',
      'Bathe every 6–8 weeks — overbathing softens the harsh outer coat',
      'Check and clean beard and leg furnishings regularly for trapped food or dirt',
      'Trim nails every 3–4 weeks and clean ears weekly',
      'If hand-stripping is not preferred, regular clipping is an acceptable alternative — just know the coat texture will change',
    ];
  } else if (isDouble) {
    p = `${bn}s have a dense double coat built for protection against the elements. They shed year-round with two major blow-out seasons in spring and fall. Regular brushing dramatically reduces the amount of hair around your home and keeps the coat healthy.`;
    bullets = [
      'Brush 2–3 times per week; daily during heavy shedding seasons',
      'Use a slicker brush followed by an undercoat rake to reach the dense undercoat',
      'Bathe every 6–8 weeks — avoid overbathing as it strips the natural protective oils',
      'Never shave a double coat — it disrupts insulation and the coat may grow back unevenly',
      'Clean ears weekly and check for signs of infection',
      'Trim nails every 3–4 weeks — they rarely wear down naturally indoors',
    ];
  } else if (isLong) {
    p = `${bn}s have a longer coat that requires consistent grooming to stay mat-free and healthy. Establishing a grooming routine early ensures your dog is comfortable being handled and brushed, which makes the process enjoyable for both of you.`;
    bullets = [
      'Brush daily or every other day to prevent tangles and matting — especially behind the ears and under the legs',
      'Professional grooming every 6–8 weeks helps maintain coat shape and length',
      'Bathe every 4–6 weeks using a detangling shampoo and conditioner',
      'Clean eyes and the area around the face regularly to prevent staining',
      'Check and clean ears weekly — longer-eared breeds are prone to moisture buildup',
      'Trim nails every 3–4 weeks',
    ];
  } else {
    // Default short/smooth
    p = `${bn}s have a short, low-maintenance coat that requires minimal grooming compared to longer-haired breeds. A consistent basic routine keeps them clean, comfortable, and healthy.`;
    bullets = [
      'Brush once a week with a soft bristle brush or rubber grooming mitt',
      'Bathe every 6–8 weeks, or when dirty — overbathing strips natural coat oils',
      'Clean ears weekly and check for redness or odor that may indicate infection',
      'Trim nails every 3–4 weeks — they often don\'t wear down naturally indoors',
      'Wipe down with a damp cloth between baths to keep the coat gleaming',
      grp.groomNote,
    ];
  }

  return `
          <div class="breed-section">
            <h2>✂️ Grooming &amp; Coat Care</h2>
            <p>${p}</p>
            <ul>
              ${bullets.map(b => `<li>${b}</li>`).join('\n              ')}
            </ul>
          </div>`;
}

function secTraining(bn, traits, grp) {
  const tpct = traits['trainability'] || traits['intelligence'] || 65;
  const epct = traits['energy level'] || traits['energy'] || 65;

  let p1, p2;
  if (tpct >= 80) {
    p1 = `${bn}s are highly responsive to training and genuinely enjoy learning. Their combination of intelligence and eagerness to please makes them a joy to work with — they pick up new commands quickly and retain them well.`;
    p2 = `Keep training sessions varied and engaging to prevent boredom. ${bn}s can handle advanced training — agility, nose work, therapy work, or competitive obedience are all excellent options for channeling their intelligence.`;
  } else if (tpct >= 60) {
    p1 = `${bn}s are moderately trainable and respond well to patient, consistent positive reinforcement. They benefit from clear expectations and a calm, confident trainer who establishes routines early.`;
    p2 = `Keep sessions short — 10 to 15 minutes — and always end on a success. Enrolling in a puppy or adult obedience class provides structured learning and valuable socialization.`;
  } else {
    p1 = `${bn}s have an independent side that can make training a test of patience. They are intelligent, but they may decide when (or if) they want to cooperate. Harsh corrections make this worse — they simply disengage.`;
    p2 = `High-value food rewards, very short sessions, and variety are your best tools. Consider working with a professional trainer who has experience with independent breeds. Once they understand what\'s expected, they can be reliably trained.`;
  }

  const bullets = [
    'Begin training and socialization as early as possible — the puppy window is critical',
    tpct >= 70 ? 'Reward-based training (treats, praise, play) produces the best and fastest results'
               : 'Use high-value rewards (real meat, cheese) to compete with distractions',
    'Be consistent — the same rules must apply every session and every family member must agree',
    grp.trainNote,
    'Crate training establishes boundaries, aids house training, and gives your dog a safe personal space',
    epct >= 70 ? 'A well-exercised dog is a focused dog — always exercise before training sessions for best results'
               : 'Short, positive sessions daily beat long, infrequent sessions every time',
  ];

  return `
          <div class="breed-section">
            <h2>🎓 Training</h2>
            <p>${p1}</p>
            <p>${p2}</p>
            <ul>
              ${bullets.map(b => `<li>${b}</li>`).join('\n              ')}
            </ul>
          </div>`;
}

function secHealth(bn, traits, grp, stats, facts, isHybrid) {
  const lifespan = stats.lifespan || (facts['lifespan'] || '10–14 years');
  const minW     = getMinWeight(stats.weight);
  const sz       = sizeLabel(minW);

  const p = isHybrid
    ? `${bn}s may benefit from hybrid vigor, which can reduce the incidence of some hereditary conditions found in the parent breeds. That said, they can still inherit health issues from either side. Choosing a reputable breeder who health-tests both parents — and scheduling regular veterinary check-ups — is the best protection.`
    : `${bn}s are generally ${sz === 'giant' ? 'large dogs whose size brings certain structural stresses' : sz === 'large' ? 'robust dogs but like all breeds they carry some genetic predispositions' : 'healthy for their size, though regular screening helps catch issues early'}. Responsible breeders screen breeding stock for the most common conditions, significantly reducing risk in puppies from health-tested parents.`;

  const tags = [...grp.health, 'Dental disease', 'Obesity (if under-exercised)'];

  const grid = [
    ['Average Lifespan', lifespan],
    ['Size Category', sz.charAt(0).toUpperCase() + sz.slice(1) + ' — ' + (stats.weight || 'see breed standards')],
    ['Vet Visits', 'Annual wellness exams + vaccinations'],
    ['Pet Insurance', 'Strongly recommended for all breeds'],
  ];

  return `
          <div class="breed-section">
            <h2>🏥 Health &amp; Common Issues</h2>
            <p>${p}</p>
            <div class="health-tags">
              ${tags.map(t => `<span class="health-tag">${t}</span>`).join('\n              ')}
            </div>
            <div class="info-grid" style="margin-top:16px">
              ${grid.map(([l,v]) => `<div class="info-box"><div class="info-box-label">${l}</div><div class="info-box-value">${v}</div></div>`).join('\n              ')}
            </div>
          </div>`;
}

function secCompat(bn, traits, grp, stats, facts, isHybrid) {
  const epct = traits['energy level'] || traits['energy'] || 65;
  const tpct = traits['trainability'] || traits['intelligence'] || 65;
  const kpct = traits['good with kids'] || 65;
  const fpct = traits['friendliness'] || traits['affection'] || traits['loyalty'] || 70;

  const minW = getMinWeight(stats.weight);
  const sz   = sizeLabel(minW);
  const coat = (facts['coat'] || facts['coat type'] || '').toLowerCase();
  const isDouble = coat.includes('double') || coat.includes('thick') || coat.includes('dense');

  // Derived compat scores
  const aptPct  = Math.max(20, Math.min(95, (100 - epct) * 0.65 + (sz === 'small' ? 28 : sz === 'medium' ? 12 : sz === 'large' ? -5 : -20)));
  const ftoPct  = Math.max(20, Math.min(90, tpct * 0.75 + (epct > 80 ? -8 : 0) + (sz === 'giant' ? -12 : 0)));
  const catsPct = Math.max(20, Math.min(90, fpct * 0.8 - (grp === GRP.terrier || grp === GRP.hound ? 18 : 0)));
  const dogsPct = Math.max(25, Math.min(90, Math.round((fpct + kpct) / 2)));
  const hotPct  = isDouble ? 30 : sz === 'giant' ? 40 : 65;

  let p;
  if (isHybrid) {
    p = `A ${bn} is a wonderful choice for families seeking a companion that blends the best qualities of both parent breeds. They tend to thrive with engaged owners who provide consistent exercise, training, and socialization. As hybrids, individual traits can vary — meeting the specific dog before adopting is always a smart move.`;
  } else if (epct >= 75 && tpct >= 65) {
    p = `A ${bn} is ideal for active families or individuals who genuinely enjoy outdoor activities and can commit to daily vigorous exercise. Their trainability makes them approachable for first-time owners who are prepared for an engaged lifestyle. Not the right fit for sedentary households or those with very limited time for exercise.`;
  } else if (epct < 50) {
    p = `A ${bn} suits someone looking for a calmer, lower-energy companion. They are excellent for apartment living, retirees, or households with a quieter routine. They still benefit from daily walks and mental stimulation, but they won't demand the intensive commitment of high-energy breeds.`;
  } else {
    p = `A ${bn} fits well with families or individuals who can provide moderate daily exercise and consistent companionship. They adapt reasonably well to various living situations as long as their exercise and social needs are met. Not ideal for owners away from home for long hours without a pet care solution in place.`;
  }

  const compat = [
    ['👶', 'With Kids',        stars(kpct)],
    ['🐕', 'With Dogs',        stars(dogsPct)],
    ['🐈', 'With Cats',        stars(catsPct)],
    ['🏠', 'Apartment',        stars(Math.round(aptPct))],
    ['🔰', 'First-Time Owner', stars(Math.round(ftoPct))],
    ['🌡️', 'Hot Climates',     stars(hotPct)],
  ];

  return `
          <div class="breed-section">
            <h2>🏠 Is a ${bn} Right for You?</h2>
            <p>${p}</p>
            <div class="compat-grid">
              ${compat.map(([ic,lb,st]) => `<div class="compat-item"><span class="compat-icon">${ic}</span><span class="compat-label">${lb}</span><span class="compat-stars">${st}</span></div>`).join('\n              ')}
            </div>
          </div>`;
}

function secRelated(grp) {
  const rels = grp.related || GRP.default.related;
  return `
          <div class="breed-section">
            <h2>🐾 Related Breeds</h2>
            <div class="related-breeds">
              ${rels.map(([slug,em,name]) => `<a href="${slug}.html" class="related-card"><span class="rel-emoji">${em}</span><span>${name}</span></a>`).join('\n              ')}
            </div>
          </div>`;
}

// ─── Main: update each page ───────────────────────────────────────────────────

const GALLERY_MARKER = '\n          <div class="breed-section">\n            <h2>📸 Photo Gallery</h2>';
const NEEDS_ENRICH   = (html) => !html.includes('😊 Temperament') && html.includes(GALLERY_MARKER);

const files = fs.readdirSync(breedsDir).filter(f => f.endsWith('.html') && f !== 'index.html');
let updated = 0, skipped = 0;

for (const file of files) {
  const fp   = path.join(breedsDir, file);
  const html = fs.readFileSync(fp, 'utf8');

  if (!NEEDS_ENRICH(html)) { skipped++; continue; }

  const bn     = extractBreedName(html);
  const traits = extractTraits(html);
  const facts  = extractFacts(html);
  const stats  = extractStats(html);
  const { group, type } = extractGroupInfo(html);
  const isHybrid = type.toLowerCase().includes('hybrid');
  const grp    = getGrp(group, type);

  // Build the 6 new sections to insert before the gallery
  const insert =
    secTemperament(bn, traits, grp, isHybrid) +
    secExercise(bn, traits, grp, stats) +
    secGrooming(bn, traits, grp, facts) +
    secTraining(bn, traits, grp) +
    secHealth(bn, traits, grp, stats, facts, isHybrid) +
    secCompat(bn, traits, grp, stats, facts, isHybrid) +
    secRelated(grp);

  // Also upgrade "Breed Overview" heading to emoji version
  let newHtml = html
    .replace('<h2>Breed Overview</h2>', '<h2>🐾 Overview</h2>')
    .replace(GALLERY_MARKER, insert + GALLERY_MARKER);

  fs.writeFileSync(fp, newHtml, 'utf8');
  console.log('✅  ' + file);
  updated++;
}

console.log('\n──────────────────────────────────────');
console.log('Enriched : ' + updated);
console.log('Skipped  : ' + skipped + '  (already have Temperament section)');
