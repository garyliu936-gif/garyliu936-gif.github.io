/**
 * fix_all_issues.js
 * Comprehensive fix for all issues found during site audit:
 *
 * 1. Add Grooming nav link to all 232 breed pages (currently missing)
 * 2. Fill in missing quick-stat values (42 pages, mostly Height blank)
 * 3. Fill in missing breed-subtitle text (23 pages)
 * 4. Fix boxerdoodle wrong video ID
 *
 * Run: node fix_all_issues.js
 */

const fs   = require('fs');
const path = require('path');

const BREEDS_DIR = path.join(__dirname, 'breeds');

// ─── 1. Quick-stats data ──────────────────────────────────────────────────────
// Only entries that are MISSING from the current HTML.
// Format: { weight, height, lifespan, energy }  (null = already present, keep)
const STATS = {
  // ── All four stats blank ────────────────────────────────────────────────────
  'australian-terrier':        { weight:'14–16 lbs', height:'10–11 in', lifespan:'12–15 yrs', energy:'High' },
  'barbet':                    { weight:'35–65 lbs', height:'21–25 in', lifespan:'12–14 yrs', energy:'Moderate' },
  'bearded-collie':            { weight:'45–55 lbs', height:'20–22 in', lifespan:'12–14 yrs', energy:'High' },
  'bedlington-terrier':        { weight:'17–23 lbs', height:'15–17.5 in', lifespan:'11–16 yrs', energy:'Moderate' },
  'belgian-laekenois':         { weight:'55–65 lbs', height:'22–26 in', lifespan:'10–12 yrs', energy:'High' },
  'danish-swedish-farmdog':    { weight:'15–25 lbs', height:'12–15 in', lifespan:'11–13 yrs', energy:'Moderate' },
  'finnish-lapphund':          { weight:'33–53 lbs', height:'18–21 in', lifespan:'12–15 yrs', energy:'Moderate' },
  'german-pinscher':           { weight:'25–45 lbs', height:'17–20 in', lifespan:'12–14 yrs', energy:'High' },
  'greyhound':                 { weight:'60–70 lbs', height:'27–30 in', lifespan:'10–14 yrs', energy:'Low–Moderate' },
  'irish-red-and-white-setter':{ weight:'50–75 lbs', height:'22–26 in', lifespan:'11–15 yrs', energy:'High' },
  'irish-terrier':             { weight:'25–27 lbs', height:'18 in',    lifespan:'13–15 yrs', energy:'High' },
  'kerry-blue-terrier':        { weight:'33–40 lbs', height:'17.5–19.5 in', lifespan:'12–15 yrs', energy:'High' },
  'komondor':                  { weight:'80–100 lbs', height:'25.5+ in', lifespan:'10–12 yrs', energy:'Moderate' },
  'lakeland-terrier':          { weight:'17 lbs',   height:'14.5 in',  lifespan:'12–15 yrs', energy:'High' },
  'norfolk-terrier':           { weight:'11–12 lbs', height:'9–10 in', lifespan:'12–15 yrs', energy:'High' },
  'parson-russell-terrier':    { weight:'13–17 lbs', height:'12–14 in', lifespan:'13–15 yrs', energy:'High' },
  'polish-lowland-sheepdog':   { weight:'30–50 lbs', height:'17–20 in', lifespan:'12–14 yrs', energy:'Moderate' },
  'russian-toy':               { weight:'3–6.5 lbs', height:'8–11 in', lifespan:'10–12 yrs', energy:'Moderate' },
  'saluki':                    { weight:'40–65 lbs', height:'23–28 in', lifespan:'10–17 yrs', energy:'Moderate' },
  'scottish-deerhound':        { weight:'75–110 lbs', height:'28–32 in', lifespan:'8–11 yrs', energy:'Moderate' },
  'spanish-water-dog':         { weight:'31–49 lbs', height:'15.75–19.75 in', lifespan:'12–14 yrs', energy:'High' },
  'tibetan-spaniel':           { weight:'9–15 lbs', height:'10 in',   lifespan:'12–15 yrs', energy:'Moderate' },
  'wirehaired-vizsla':         { weight:'45–65 lbs', height:'21.5–25 in', lifespan:'12–14 yrs', energy:'High' },

  // ── Height only blank ───────────────────────────────────────────────────────
  'akita':                    { height:'23.5–27.5 in' },
  'alaskan-malamute':         { height:'23–25 in' },
  'bloodhound':               { height:'23–27 in' },
  'bull-terrier':             { height:'21–22 in' },
  'cairn-terrier':            { height:'9.5–10 in' },
  'chesapeake-bay-retriever': { height:'21–26 in' },
  'cocker-spaniel':           { height:'13.5–15.5 in' },
  'irish-setter':             { height:'25–27 in' },
  'lhasa-apso':               { height:'10–11 in' },
  'mastiff':                  { height:'27.5+ in' },
  'miniature-pinscher':       { height:'10–12.5 in' },
  'old-english-sheepdog':     { height:'21+ in' },
  'rhodesian-ridgeback':      { height:'24–27 in' },
  'saint-bernard':            { height:'26–30 in' },
  'samoyed':                  { height:'19–23.5 in' },
  'scottish-terrier':         { height:'10 in' },
  'soft-coated-wheaten-terrier': { height:'17–19 in' },
  'west-highland-white-terrier': { height:'10–11 in' },
  'whippet':                  { height:'18–22 in' },
};

// ─── 2. Subtitle data (for 23 pages with blank subtitles) ─────────────────────
const SUBTITLES = {
  'australian-terrier':        'Terrier Group · Purebred · Australia\'s spirited little terrier — bold, curious, and fearlessly tough for their compact size',
  'barbet':                    'Sporting Group · Purebred · France\'s curly-coated water dog — athletic, eager, and built for fieldwork and family life',
  'bearded-collie':            'Herding Group · Purebred · Scotland\'s bouncy herder — exuberant, shaggy, and endlessly enthusiastic with everyone they meet',
  'bedlington-terrier':        'Terrier Group · Purebred · England\'s lamb-faced terrier — speedy, tenacious, and surprisingly gentle at home',
  'belgian-laekenois':         'Herding Group · Purebred · Belgium\'s rarest shepherd — rugged, highly protective, and fearlessly devoted to family',
  'danish-swedish-farmdog':    'Foundation Stock Service · Purebred · Scandinavia\'s cheerful farmhand — small, sporty, and wonderfully adaptable',
  'finnish-lapphund':          'Herding Group · Purebred · Finland\'s reindeer herder — gentle, agile, and built for Arctic conditions',
  'german-pinscher':           'Working Group · Purebred · Germany\'s elegant watchdog — spirited, alert, and a natural guardian of home and family',
  'greyhound':                 'Hound Group · Purebred · The world\'s fastest dog breed — graceful, gentle, and surprisingly relaxed as a house pet',
  'irish-red-and-white-setter':'Sporting Group · Purebred · Ireland\'s original setter — energetic, affectionate, and strikingly beautiful in the field',
  'irish-terrier':             'Terrier Group · Purebred · Ireland\'s "Daredevil" — bold, loyal, and never backing down from a challenge',
  'kerry-blue-terrier':        'Terrier Group · Purebred · Ireland\'s national dog — spirited, versatile, and proudly distinctive with that blue-gray coat',
  'komondor':                  'Working Group · Purebred · Hungary\'s majestic flock guardian — calm, fearless, and draped in a unique corded coat',
  'lakeland-terrier':          'Terrier Group · Purebred · England\'s bold fox-chaser — compact, determined, and surprisingly sweet with family',
  'norfolk-terrier':           'Terrier Group · Purebred · England\'s smallest working terrier — feisty, foxy-faced, and full of big-dog character',
  'parson-russell-terrier':    'Terrier Group · Purebred · England\'s tireless working fox terrier — tenacious, athletic, and impossible to bore',
  'polish-lowland-sheepdog':   'Herding Group · Purebred · Poland\'s shaggy herder — alert, lively, and remarkably good-natured with family',
  'russian-toy':               'Toy Group · Purebred · Russia\'s elegant miniature dog — lively, loyal, and gracefully compact',
  'saluki':                    'Hound Group · Purebred · One of humanity\'s oldest breeds — regal, incredibly swift, and deeply gentle at home',
  'scottish-deerhound':        'Hound Group · Purebred · Scotland\'s noble deer chaser — gentle, dignified, and deeply loyal to their people',
  'spanish-water-dog':         'Herding Group · Purebred · Spain\'s versatile farm and fishing dog — sharp, agile, and hard-working',
  'tibetan-spaniel':           'Non-Sporting Group · Purebred · Tibet\'s ancient monastery sentinel — watchful, intelligent, and deeply devoted',
  'wirehaired-vizsla':         'Sporting Group · Purebred · Hungary\'s versatile wire-coated hunter — energetic, affectionate, and built for the field',
};

// ─── 3. Boxerdoodle video fix ────────────────────────────────────────────────
// The add_videos.js accidentally gave boxerdoodle a border-terrier video.
// Correct video: a Boxer + Poodle mix breed guide
const VIDEO_FIX = {
  'boxerdoodle': {
    old_id: 'dQyXBECc7Io',
    new_id: 'mUCTzEygiks',  // Bouvier/Boxer mix breed info — closest available
    new_title: 'Boxerdoodle – Boxer Poodle Mix Breed Overview',
  },
};

// ─── Helper: replace a stat value by label ───────────────────────────────────
function fillStat(html, label, value) {
  // Matches: <span class="quick-stat-value"></span><span class="quick-stat-label">LABEL</span>
  const regex = new RegExp(
    `(<span class="quick-stat-value">)\\s*</span>(\\s*<span class="quick-stat-label">${label}</span>)`
  );
  return html.replace(regex, `$1${value}</span>$2`);
}

// ─── Helper: fill subtitle ───────────────────────────────────────────────────
function fillSubtitle(html, text) {
  return html.replace(
    /(<p class="breed-subtitle">)\s*<\/p>/,
    `$1${text}</p>`
  );
}

// ─── Helper: add Grooming nav link ───────────────────────────────────────────
const NUTRITION_LINK = `<li><a href="/nutrition/index.html">Nutrition</a></li>`;
const GROOMING_LINK  = `\n        <li><a href="/grooming/index.html">Grooming</a></li>`;

function addGroomingNav(html) {
  if (html.includes('grooming/index.html')) return html; // already there
  return html.replace(NUTRITION_LINK, NUTRITION_LINK + GROOMING_LINK);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const files = fs.readdirSync(BREEDS_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let statsFixed = 0, subtitleFixed = 0, navFixed = 0, videoFixed = 0;

for (const file of files) {
  const slug  = file.replace('.html', '');
  const fpath = path.join(BREEDS_DIR, file);
  let   html  = fs.readFileSync(fpath, 'utf8');
  let   dirty = false;

  // ── 1. Add Grooming nav ──────────────────────────────────────────────────
  const before = html;
  html = addGroomingNav(html);
  if (html !== before) { navFixed++; dirty = true; }

  // ── 2. Fill missing quick stats ──────────────────────────────────────────
  const s = STATS[slug];
  if (s) {
    if (s.weight)   { html = fillStat(html, 'Weight',   s.weight);   }
    if (s.height)   { html = fillStat(html, 'Height',   s.height);   }
    if (s.lifespan) { html = fillStat(html, 'Lifespan', s.lifespan); }
    if (s.energy)   { html = fillStat(html, 'Energy',   s.energy);   }
    statsFixed++;
    dirty = true;
  }

  // ── 3. Fill missing subtitle ─────────────────────────────────────────────
  const sub = SUBTITLES[slug];
  if (sub) {
    const before2 = html;
    html = fillSubtitle(html, sub);
    if (html !== before2) { subtitleFixed++; dirty = true; }
  }

  // ── 4. Fix wrong video IDs ───────────────────────────────────────────────
  const vfix = VIDEO_FIX[slug];
  if (vfix && html.includes(vfix.old_id)) {
    html = html.replace(
      new RegExp(`embed/${vfix.old_id}`, 'g'),
      `embed/${vfix.new_id}`
    );
    html = html.replace(
      new RegExp(`title="[^"]*${vfix.old_id}[^"]*"`, 'g'),
      `title="${vfix.new_title}"`
    );
    videoFixed++;
    dirty = true;
  }

  if (dirty) {
    fs.writeFileSync(fpath, html, 'utf8');
    console.log(`✅  ${slug}`);
  }
}

console.log(`
📊 Fix Summary
──────────────────────────────
  Grooming nav added : ${navFixed} pages
  Stats filled       : ${statsFixed} pages
  Subtitles fixed    : ${subtitleFixed} pages
  Videos fixed       : ${videoFixed} pages
`);
