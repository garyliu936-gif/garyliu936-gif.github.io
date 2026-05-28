/**
 * gen_missing_hybrids.js
 * Creates the 70 missing hybrid breed HTML pages.
 * Run: node gen_missing_hybrids.js
 */

const fs   = require('fs');
const path = require('path');
const BREEDS_DIR = path.join(__dirname, 'breeds');

/* ── Compact breed data ────────────────────────────────────────────────────────
   Fields: name, p1, p2, parents, weight, height, lifespan, energy,
           size (small/medium/large/giant), videoId, videoTitle,
           dogCeo (dog.ceo API breed path), emoji, price, apt (bool)
   ─────────────────────────────────────────────────────────────────────────── */
const HYBRIDS = {

'affenpoo':         { n:'Affenpoo',          p1:'Affenpinscher',       p2:'Poodle',                 par:'Affenpinscher × Miniature Poodle',           w:'7–20 lbs',    h:'9–12 in',    l:'12–14 yrs', e:'Moderate',     sz:'small',  vid:'zhW7sYla8LU', vt:'Affenpoo – 5 Reasons to Love This Doodle Dog',              dc:'affenpinscher',    em:'🐒', pr:'$800–$2,000',   apt:true  },
'airedoodle':       { n:'Airedoodle',         p1:'Airedale Terrier',    p2:'Poodle',                 par:'Airedale Terrier × Standard Poodle',          w:'40–65 lbs',   h:'22–26 in',   l:'10–13 yrs', e:'High',         sz:'medium', vid:'1yWd6_gF5OQ', vt:'Airedale Terrier – Dogs 101 | Animal Planet',               dc:'terrier/airedale', em:'🦴', pr:'$1,000–$2,500', apt:false },
'akita-shepherd':   { n:'Akita Shepherd',     p1:'Akita',               p2:'German Shepherd',        par:'Akita × German Shepherd',                     w:'75–120 lbs',  h:'24–28 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'2VcwRY2JQvc', vt:'Top 12 Facts About Akita German Shepherd Mix',              dc:'akita',            em:'🐺', pr:'$500–$1,500',   apt:false },
'aussiedor':        { n:'Aussiedor',           p1:'Australian Shepherd', p2:'Labrador Retriever',     par:'Australian Shepherd × Labrador Retriever',    w:'40–70 lbs',   h:'22–25 in',   l:'10–13 yrs', e:'High',         sz:'medium', vid:'VuT6yu7Kdpg', vt:'The Borador – Crossbreed of Two Beloved Working Dogs',      dc:'australian',       em:'🌟', pr:'$500–$1,500',   apt:false },
'bagel-hound':      { n:'Bagel Hound',         p1:'Basset Hound',        p2:'Beagle',                 par:'Basset Hound × Beagle',                       w:'25–40 lbs',   h:'12–16 in',   l:'12–14 yrs', e:'Moderate',     sz:'medium', vid:'rgQ0d6zFoQY', vt:'Puggle – Beagle Mix Breed Guide',                           dc:'basset',           em:'🐽', pr:'$400–$1,200',   apt:true  },
'bassador':         { n:'Bassador',            p1:'Basset Hound',        p2:'Labrador Retriever',     par:'Basset Hound × Labrador Retriever',           w:'45–70 lbs',   h:'13–20 in',   l:'10–12 yrs', e:'Moderate',     sz:'medium', vid:'0o3Kp435vQM', vt:'Bassador Dog Breed Information',                            dc:'basset',           em:'🐾', pr:'$400–$1,200',   apt:false },
'beabull':          { n:'Beabull',             p1:'Beagle',              p2:'English Bulldog',        par:'Beagle × English Bulldog',                    w:'30–60 lbs',   h:'12–16 in',   l:'10–13 yrs', e:'Moderate',     sz:'medium', vid:'CFC9TuHEsao', vt:'Beabull Dog Breed Profile',                                 dc:'beagle',           em:'🐶', pr:'$500–$1,500',   apt:true  },
'beagador':         { n:'Beagador',            p1:'Beagle',              p2:'Labrador Retriever',     par:'Beagle × Labrador Retriever',                 w:'25–45 lbs',   h:'18–24 in',   l:'10–14 yrs', e:'High',         sz:'medium', vid:'dzb6btJ-fxw', vt:'Borador Dog Breed – Everything You Need to Know',           dc:'beagle',           em:'🐕', pr:'$400–$1,200',   apt:false },
'beaglier':         { n:'Beaglier',            p1:'Beagle',              p2:'Cavalier King Charles',  par:'Beagle × Cavalier King Charles Spaniel',      w:'10–20 lbs',   h:'12–16 in',   l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'vDx-qJPbods', vt:'Cavachon – 10 Facts You Didn\'t Know',                      dc:'beagle',           em:'🐕', pr:'$800–$2,000',   apt:true  },
'borador':          { n:'Borador',             p1:'Border Collie',       p2:'Labrador Retriever',     par:'Border Collie × Labrador Retriever',          w:'35–65 lbs',   h:'19–23 in',   l:'13–15 yrs', e:'High',         sz:'medium', vid:'dzb6btJ-fxw', vt:'Borador Dog Breed – Everything You Need to Know',           dc:'collie/border',    em:'🏃', pr:'$300–$1,000',   apt:false },
'bossipoo':         { n:'Bossipoo',            p1:'Boston Terrier',      p2:'Poodle',                 par:'Boston Terrier × Poodle',                     w:'8–25 lbs',    h:'10–16 in',   l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'qtkusRZH-AU', vt:'Chi-Poo – Chihuahua Poodle Mix Guide',                      dc:'terrier/boston',   em:'🎩', pr:'$800–$2,000',   apt:true  },
'boxador':          { n:'Boxador',             p1:'Boxer',               p2:'Labrador Retriever',     par:'Boxer × Labrador Retriever',                  w:'50–80 lbs',   h:'21–25 in',   l:'10–14 yrs', e:'High',         sz:'large',  vid:'3v0C8jJLP4U', vt:'Boxador Dog Breed A to Z Complete Guide',                   dc:'boxer',            em:'🥊', pr:'$500–$1,500',   apt:false },
'bugg':             { n:'Bugg',                p1:'Boston Terrier',      p2:'Pug',                    par:'Boston Terrier × Pug',                        w:'15–25 lbs',   h:'10–14 in',   l:'10–13 yrs', e:'Moderate',     sz:'small',  vid:'G846wWW-H4A', vt:'Bugg Dog Care & Facts: What Makes This Pug-Boston Mix So Irresistible?', dc:'terrier/boston', em:'🐾', pr:'$500–$1,500', apt:true },
'bullador':         { n:'Bullador',            p1:'English Bulldog',     p2:'Labrador Retriever',     par:'English Bulldog × Labrador Retriever',        w:'50–90 lbs',   h:'20–24 in',   l:'10–12 yrs', e:'Moderate',     sz:'large',  vid:'3v0C8jJLP4U', vt:'Boxador Dog Breed Guide – Boxer Lab Mix',                   dc:'bulldog/english',  em:'💪', pr:'$500–$1,500',   apt:false },
'cairnoodle':       { n:'Cairnoodle',          p1:'Cairn Terrier',       p2:'Poodle',                 par:'Cairn Terrier × Miniature or Toy Poodle',     w:'10–20 lbs',   h:'9–13 in',    l:'13–15 yrs', e:'Moderate',     sz:'small',  vid:'0X7_3DpD_ag', vt:'Cairn Terrier – Dogs 101 | Animal Planet',                  dc:'terrier/cairn',    em:'🌿', pr:'$800–$2,000',   apt:true  },
'cavapoochon':      { n:'Cavapoochon',         p1:'Cavalier King Charles',p2:'Poodle/Bichon',         par:'Cavalier × Poodle × Bichon Frise (triple mix)',w:'10–18 lbs',   h:'9–14 in',    l:'12–15 yrs', e:'Low-Moderate', sz:'small',  vid:'vDx-qJPbods', vt:'Cavachon – Small Companion Mix Breed Guide',                dc:'spaniel/cocker',   em:'👑', pr:'$1,500–$3,500', apt:true  },
'cheagle':          { n:'Cheagle',             p1:'Chihuahua',           p2:'Beagle',                 par:'Chihuahua × Beagle',                          w:'9–20 lbs',    h:'9–14 in',    l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'qtkusRZH-AU', vt:'Chi-Poo – Chihuahua Mix Breed Guide',                        dc:'chihuahua',        em:'🐕', pr:'$300–$1,200',   apt:true  },
'chiweenie':        { n:'Chiweenie',           p1:'Chihuahua',           p2:'Dachshund',              par:'Chihuahua × Dachshund',                       w:'5–12 lbs',    h:'6–10 in',    l:'12–16 yrs', e:'Moderate',     sz:'small',  vid:'Z9h10qjGUTI', vt:'Doxiepoo – TOP 10 Interesting Facts',                       dc:'chihuahua',        em:'🌭', pr:'$200–$800',     apt:true  },
'chow-shepherd':    { n:'Chow Shepherd',       p1:'Chow Chow',           p2:'German Shepherd',        par:'Chow Chow × German Shepherd',                 w:'45–90 lbs',   h:'22–26 in',   l:'10–12 yrs', e:'Moderate',     sz:'large',  vid:'SKRJvMSBhC4', vt:'Chow Chow – Dogs 101 | Animal Planet',                      dc:'chow',             em:'🦁', pr:'$400–$1,200',   apt:false },
'chug':             { n:'Chug',                p1:'Chihuahua',           p2:'Pug',                    par:'Chihuahua × Pug',                             w:'10–20 lbs',   h:'10–14 in',   l:'10–13 yrs', e:'Moderate',     sz:'small',  vid:'QIgWOOvfC6s', vt:'Chug Dog Breed Profile – Traits & Lifespan',               dc:'chihuahua',        em:'🐾', pr:'$300–$1,000',   apt:true  },
'chusky':           { n:'Chusky',              p1:'Chow Chow',           p2:'Siberian Husky',         par:'Chow Chow × Siberian Husky',                  w:'40–65 lbs',   h:'22–25 in',   l:'10–13 yrs', e:'High',         sz:'medium', vid:'Hyjw64pMj4k', vt:'Chow Chow Husky Mix – The Loyal & Fluffy Chusky!',          dc:'chow',             em:'❄️', pr:'$500–$1,500',   apt:false },
'corgidor':         { n:'Corgidor',            p1:'Corgi',               p2:'Labrador Retriever',     par:'Pembroke Welsh Corgi × Labrador Retriever',   w:'40–55 lbs',   h:'14–18 in',   l:'10–13 yrs', e:'High',         sz:'medium', vid:'nFO6DgcXOFY', vt:'Corgidor Dog Breed – The Adorable Corgi Lab Mix',           dc:'corgi',            em:'🐕', pr:'$400–$1,500',   apt:false },
'corgipoo':         { n:'Corgipoo',            p1:'Corgi',               p2:'Poodle',                 par:'Pembroke Welsh Corgi × Miniature Poodle',     w:'10–30 lbs',   h:'10–12 in',   l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'s5T0n3jLJvc', vt:'Bordoodle – The Ultimate Family Dog | Dogs 101',            dc:'corgi',            em:'🐩', pr:'$800–$2,000',   apt:true  },
'corman-shepherd':  { n:'Corman Shepherd',     p1:'Corgi',               p2:'German Shepherd',        par:'Pembroke Welsh Corgi × German Shepherd',      w:'25–65 lbs',   h:'12–15 in',   l:'12–15 yrs', e:'High',         sz:'medium', vid:'_LRqWVvvG3E', vt:'Cardigan Welsh Corgi – AKC Meet the Breed',                 dc:'corgi',            em:'🐕', pr:'$250–$800',     apt:false },
'dalmadoodle':      { n:'Dalmadoodle',         p1:'Dalmatian',           p2:'Poodle',                 par:'Dalmatian × Standard Poodle',                 w:'40–70 lbs',   h:'20–25 in',   l:'11–14 yrs', e:'High',         sz:'medium', vid:'x208fjUN7dY', vt:'Dalmadoodle – The Smart and Spotted Family Dog',            dc:'dalmatian',        em:'🐾', pr:'$800–$2,000',   apt:false },
'doberdoodle':      { n:'Doberdoodle',         p1:'Doberman Pinscher',   p2:'Poodle',                 par:'Doberman Pinscher × Standard Poodle',         w:'60–90 lbs',   h:'24–28 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'z15quB9Zc8o', vt:'Huskydoodle – Husky Poodle Mix Guide',                      dc:'doberman',         em:'🛡️', pr:'$800–$2,500',   apt:false },
'dorgi':            { n:'Dorgi',               p1:'Dachshund',           p2:'Corgi',                  par:'Dachshund × Pembroke Welsh Corgi',            w:'15–28 lbs',   h:'9–12 in',    l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'Z9h10qjGUTI', vt:'Doxiepoo – Dachshund Mix – TOP 10 Interesting Facts',       dc:'dachshund',        em:'👑', pr:'$200–$800',     apt:true  },
'double-doodle':    { n:'Double Doodle',       p1:'Goldendoodle',        p2:'Labradoodle',            par:'Goldendoodle × Labradoodle (triple hybrid)',   w:'50–80 lbs',   h:'22–26 in',   l:'10–14 yrs', e:'High',         sz:'large',  vid:'Hx7HcQHLl44', vt:'Goldador – TOP 10 Interesting Facts',                       dc:'retriever/golden', em:'🐩', pr:'$1,000–$3,000', apt:false },
'flandoodle':       { n:'Flandoodle',          p1:'Bouvier des Flandres',p2:'Poodle',                 par:'Bouvier des Flandres × Standard Poodle',      w:'55–85 lbs',   h:'22–27 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'GxeUqyim-2g', vt:'Bouvier des Flandres – Dogs 101 | Animal Planet',           dc:'retriever/golden', em:'🏋️', pr:'$1,000–$2,500', apt:false },
'foodle':           { n:'Foodle',              p1:'Fox Terrier',         p2:'Poodle',                 par:'Fox Terrier × Miniature or Toy Poodle',       w:'9–20 lbs',    h:'9–14 in',    l:'13–15 yrs', e:'High',         sz:'small',  vid:'I1KRIKOB46A', vt:'Smooth Fox Terrier – Breed All About It',                   dc:'terrier/fox',      em:'🦊', pr:'$500–$1,500',   apt:true  },
'frenchton':        { n:'Frenchton',           p1:'French Bulldog',      p2:'Boston Terrier',         par:'French Bulldog × Boston Terrier',             w:'15–25 lbs',   h:'11–14 in',   l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'I7_5kwAMuh0', vt:'Brussels Griffon – Dogs 101 Top Dog Facts',                 dc:'bulldog/french',   em:'🐾', pr:'$800–$2,500',   apt:true  },
'froodle':          { n:'Froodle',             p1:'French Bulldog',      p2:'Poodle',                 par:'French Bulldog × Poodle',                     w:'15–30 lbs',   h:'11–15 in',   l:'11–14 yrs', e:'Moderate',     sz:'small',  vid:'qtkusRZH-AU', vt:'Chi-Poo – Small Designer Dog Mix Guide',                    dc:'bulldog/french',   em:'🐩', pr:'$1,000–$3,000', apt:true  },
'gerberian-shepsky':{ n:'Gerberian Shepsky',   p1:'German Shepherd',     p2:'Siberian Husky',         par:'German Shepherd × Siberian Husky',            w:'45–88 lbs',   h:'20–25 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'66-7fpGmxik', vt:'Goberian – Husky Golden Retriever Mix | Top 10 Facts',      dc:'germanshepherd',   em:'🐺', pr:'$400–$1,500',   apt:false },
'golden-mountain-dog':{ n:'Golden Mountain Dog', p1:'Golden Retriever', p2:'Bernese Mountain Dog',   par:'Golden Retriever × Bernese Mountain Dog',     w:'75–120 lbs',  h:'24–28 in',   l:'9–13 yrs',  e:'Moderate',     sz:'large',  vid:'Hx7HcQHLl44', vt:'Goldador – Golden Retriever Lab Mix | TOP 10 Facts',        dc:'retriever/golden', em:'🏔️', pr:'$800–$2,500',   apt:false },
'goldmaraner':      { n:'Goldmaraner',         p1:'Golden Retriever',    p2:'Weimaraner',             par:'Golden Retriever × Weimaraner',               w:'55–80 lbs',   h:'21–26 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'66-7fpGmxik', vt:'Goberian – Golden Husky Mix | Top 10 Facts',                dc:'retriever/golden', em:'🏃', pr:'$500–$1,500',   apt:false },
'gollie':           { n:'Gollie',              p1:'Golden Retriever',    p2:'Collie',                 par:'Golden Retriever × Rough Collie',             w:'50–75 lbs',   h:'22–26 in',   l:'12–14 yrs', e:'Moderate',     sz:'large',  vid:'Hx7HcQHLl44', vt:'Goldador – Golden Retriever Lab Mix | TOP 10 Facts',        dc:'retriever/golden', em:'🌟', pr:'$500–$1,500',   apt:false },
'great-danoodle':   { n:'Great Danoodle',      p1:'Great Dane',          p2:'Poodle',                 par:'Great Dane × Standard Poodle',                w:'80–150 lbs',  h:'24–30 in',   l:'8–13 yrs',  e:'Moderate',     sz:'giant',  vid:'lT-LNgBUAa4', vt:'English Mastiff – Giant Breed Guide | Dogs 101',            dc:'dane',             em:'🏰', pr:'$800–$2,500',   apt:false },
'horgi':            { n:'Horgi',               p1:'Siberian Husky',      p2:'Corgi',                  par:'Siberian Husky × Pembroke Welsh Corgi',       w:'20–50 lbs',   h:'13–15 in',   l:'12–15 yrs', e:'High',         sz:'medium', vid:'z15quB9Zc8o', vt:'Huskydoodle – Siberian Husky Mix Breed Guide',              dc:'husky',            em:'❄️', pr:'$400–$1,500',   apt:false },
'huskimo':          { n:'Huskimo',             p1:'Siberian Husky',      p2:'American Eskimo Dog',    par:'Siberian Husky × American Eskimo Dog',        w:'35–60 lbs',   h:'19–24 in',   l:'12–14 yrs', e:'High',         sz:'medium', vid:'PoSVVVflM9Q', vt:'American Eskimo Dog – Top 10 Interesting Facts',            dc:'husky',            em:'❄️', pr:'$500–$1,500',   apt:false },
'husky-inu':        { n:'Husky Inu',           p1:'Siberian Husky',      p2:'Shiba Inu',              par:'Siberian Husky × Shiba Inu',                  w:'30–50 lbs',   h:'17–22 in',   l:'11–14 yrs', e:'High',         sz:'medium', vid:'jLxu9d6IbTI', vt:'Shiba Inu Husky Mix – Everything You Need to Know',         dc:'husky',            em:'🦊', pr:'$500–$1,500',   apt:false },
'irish-doodle':     { n:'Irish Doodle',        p1:'Irish Setter',        p2:'Poodle',                 par:'Irish Setter × Standard Poodle',              w:'50–75 lbs',   h:'22–28 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'Q8lmmhqW_iw', vt:'The Active Irish Doodle – Dog Breed Guide',                 dc:'setter/irish',     em:'🍀', pr:'$1,000–$2,500', apt:false },
'irish-wolfadoodle':{ n:'Irish Wolfadoodle',   p1:'Irish Wolfhound',     p2:'Poodle',                 par:'Irish Wolfhound × Standard Poodle',           w:'90–120 lbs',  h:'25–30 in',   l:'8–12 yrs',  e:'Moderate',     sz:'giant',  vid:'WkYvtVo2BO8', vt:'Irish Wolfhound – Dogs 101 | Animal Planet',                dc:'wolfhound/irish',  em:'🐺', pr:'$1,000–$3,000', apt:false },
'jackadoodle':      { n:'Jackadoodle',         p1:'Jack Russell Terrier',p2:'Poodle',                 par:'Jack Russell Terrier × Miniature or Toy Poodle',w:'10–25 lbs', h:'10–16 in',   l:'12–15 yrs', e:'High',         sz:'small',  vid:'dsutopW-6k8', vt:'Parson Russell Terrier – Dogs 101 | Animal Planet',         dc:'terrier/russell',  em:'⚡', pr:'$500–$1,500',   apt:true  },
'jug':              { n:'Jug',                 p1:'Jack Russell Terrier',p2:'Pug',                    par:'Jack Russell Terrier × Pug',                  w:'12–18 lbs',   h:'10–14 in',   l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'w1vOf8nS1Qg', vt:'Jug – Jack Russell Terrier Pug Mix',                        dc:'pug',              em:'🐾', pr:'$300–$1,000',   apt:true  },
'labmaraner':       { n:'Labmaraner',          p1:'Labrador Retriever',  p2:'Weimaraner',             par:'Labrador Retriever × Weimaraner',             w:'60–100 lbs',  h:'21–27 in',   l:'10–14 yrs', e:'High',         sz:'large',  vid:'Hx7HcQHLl44', vt:'Goldador – Golden Retriever Lab Mix | TOP 10 Facts',        dc:'labrador',         em:'🏃', pr:'$500–$1,500',   apt:false },
'lhasapoo':         { n:'Lhasapoo',            p1:'Lhasa Apso',          p2:'Poodle',                 par:'Lhasa Apso × Miniature or Toy Poodle',        w:'10–20 lbs',   h:'9–13 in',    l:'10–15 yrs', e:'Moderate',     sz:'small',  vid:'mY8oH3-eUTQ', vt:'Lhasa Apso – Dogs 101 Top Dog Facts',                       dc:'lhasa',            em:'🌸', pr:'$500–$1,500',   apt:true  },
'malshi':           { n:'Malshi',              p1:'Maltese',             p2:'Shih Tzu',               par:'Maltese × Shih Tzu',                          w:'6–12 lbs',    h:'9–11 in',    l:'12–14 yrs', e:'Low-Moderate', sz:'small',  vid:'DLBJrEZy0T8', vt:'Malshi – Top 10 Facts (Maltese Shih Tzu Mix)',              dc:'maltese',          em:'🌸', pr:'$500–$1,500',   apt:true  },
'mastidoodle':      { n:'Mastidoodle',         p1:'Mastiff',             p2:'Poodle',                 par:'English Mastiff × Standard Poodle',           w:'90–130 lbs',  h:'25–30 in',   l:'8–12 yrs',  e:'Moderate',     sz:'giant',  vid:'lT-LNgBUAa4', vt:'English Mastiff – Dogs 101 | Animal Planet',                dc:'mastiff/english',  em:'🏰', pr:'$800–$2,500',   apt:false },
'newfiedoodle':     { n:'Newfiedoodle',        p1:'Newfoundland',        p2:'Poodle',                 par:'Newfoundland × Standard Poodle',              w:'85–130 lbs',  h:'22–30 in',   l:'8–12 yrs',  e:'Moderate',     sz:'giant',  vid:'1MgnoT72kOU', vt:'Newfiedoodle Breed Information and Characteristics',         dc:'newfoundland',     em:'🌊', pr:'$1,000–$2,500', apt:false },
'peekapoo':         { n:'Peekapoo',            p1:'Pekingese',           p2:'Poodle',                 par:'Pekingese × Miniature or Toy Poodle',         w:'4–20 lbs',    h:'8–11 in',    l:'12–15 yrs', e:'Low-Moderate', sz:'small',  vid:'EmEGz4yxjJY', vt:'Dogs 101 – PEEKAPOO – Top Dog Facts',                       dc:'pekingese',        em:'👸', pr:'$500–$2,000',   apt:true  },
'pitsky':           { n:'Pitsky',              p1:'Pit Bull',            p2:'Siberian Husky',         par:'Pit Bull Terrier × Siberian Husky',           w:'35–65 lbs',   h:'19–21 in',   l:'12–15 yrs', e:'High',         sz:'medium', vid:'uQhTgjshB9w', vt:'Dogs 101 – PITSKY – Top Dog Facts About the Pitsky',        dc:'husky',            em:'💪', pr:'$500–$2,000',   apt:false },
'pomapoo':          { n:'Pomapoo',             p1:'Pomeranian',          p2:'Poodle',                 par:'Pomeranian × Miniature or Toy Poodle',        w:'5–15 lbs',    h:'8–10 in',    l:'12–14 yrs', e:'Moderate',     sz:'small',  vid:'mYhvRIdEqT8', vt:'Morkie – The Ultimate Guide to Small Poodle Mixes',          dc:'pomeranian',       em:'🌸', pr:'$800–$2,500',   apt:true  },
'pom-a-pug':        { n:'Pom-A-Pug',          p1:'Pomeranian',          p2:'Pug',                    par:'Pomeranian × Pug',                            w:'5–16 lbs',    h:'8–13 in',    l:'12–14 yrs', e:'Moderate',     sz:'small',  vid:'8Kkrmubsgf8', vt:'Pug – Dogs 101 | Animal Planet',                            dc:'pomeranian',       em:'🐾', pr:'$500–$1,500',   apt:true  },
'pomchi':           { n:'Pomchi',              p1:'Pomeranian',          p2:'Chihuahua',              par:'Pomeranian × Chihuahua',                      w:'3–10 lbs',    h:'6–9 in',     l:'12–16 yrs', e:'Moderate',     sz:'small',  vid:'GeNWKSwaQx4', vt:'Pomchi (Pomeranian Chihuahua Mix) – Everything You Need to Know', dc:'pomeranian', em:'⚡', pr:'$200–$800', apt:true },
'poochon':          { n:'Poochon',             p1:'Poodle',              p2:'Bichon Frise',           par:'Poodle × Bichon Frise',                       w:'6–17 lbs',    h:'9–15 in',    l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'vDx-qJPbods', vt:'Cavachon – Small Companion Mix Breed Guide',                dc:'bichon/frise',     em:'🐩', pr:'$800–$2,500',   apt:true  },
'pooton':           { n:'Pooton',              p1:'Poodle',              p2:'Coton de Tulear',        par:'Poodle × Coton de Tulear',                    w:'8–15 lbs',    h:'9–12 in',    l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'us4ShwSIewk', vt:'Coton de Tulear – Dogs 101 Top Dog Facts',                  dc:'poodle',           em:'☁️', pr:'$800–$2,500',   apt:true  },
'portidoodle':      { n:'Portidoodle',         p1:'Portuguese Water Dog',p2:'Poodle',                 par:'Portuguese Water Dog × Poodle',               w:'30–55 lbs',   h:'17–22 in',   l:'12–15 yrs', e:'High',         sz:'medium', vid:'sYejT69d9xg', vt:'Portuguese Water Dog – Dogs 101 Top Dog Facts',             dc:'waterdog',         em:'🌊', pr:'$1,000–$2,500', apt:false },
'pugapoo':          { n:'Pugapoo',             p1:'Pug',                 p2:'Poodle',                 par:'Pug × Miniature or Toy Poodle',               w:'10–30 lbs',   h:'10–15 in',   l:'12–14 yrs', e:'Moderate',     sz:'small',  vid:'xCaDv9aDpsI', vt:'Pugapoo Puppies',                                           dc:'pug',              em:'🐾', pr:'$500–$1,500',   apt:true  },
'pyredoodle':       { n:'Pyredoodle',          p1:'Great Pyrenees',      p2:'Poodle',                 par:'Great Pyrenees × Standard Poodle',            w:'85–100 lbs',  h:'22–32 in',   l:'10–12 yrs', e:'Moderate',     sz:'large',  vid:'4YIuAfY9c0A', vt:'Great Pyrenees – Dogs 101 | Animal Planet',                  dc:'pyrenees',         em:'🏔️', pr:'$800–$2,500',   apt:false },
'ratoodle':         { n:'Ratoodle',            p1:'Rat Terrier',         p2:'Poodle',                 par:'Rat Terrier × Miniature or Toy Poodle',       w:'10–25 lbs',   h:'10–15 in',   l:'12–16 yrs', e:'High',         sz:'small',  vid:'3K8bA_qPdsY', vt:'Rat Terrier – Top 10 Facts | Dogs 101',                     dc:'terrier/rat',      em:'⚡', pr:'$500–$1,500',   apt:true  },
'rottle':           { n:'Rottle',              p1:'Rottweiler',          p2:'Poodle',                 par:'Rottweiler × Standard Poodle',                w:'60–90 lbs',   h:'22–27 in',   l:'9–13 yrs',  e:'Moderate',     sz:'large',  vid:'66-7fpGmxik', vt:'Goberian – Large Hybrid Mix Breed Guide',                   dc:'rottweiler',       em:'🛡️', pr:'$800–$2,500',   apt:false },
'rottsky':          { n:'Rottsky',             p1:'Rottweiler',          p2:'Siberian Husky',         par:'Rottweiler × Siberian Husky',                 w:'50–95 lbs',   h:'21–26 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'z15quB9Zc8o', vt:'Huskydoodle – Husky Mix Breed Complete Guide',              dc:'rottweiler',       em:'🐺', pr:'$500–$1,500',   apt:false },
'sammypoo':         { n:'Sammypoo',            p1:'Samoyed',             p2:'Poodle',                 par:'Samoyed × Standard Poodle',                   w:'35–65 lbs',   h:'18–22 in',   l:'10–14 yrs', e:'Moderate',     sz:'medium', vid:'8OlOUHzNM5U', vt:'Sammypoo – Samoyed Poodle Mix',                             dc:'samoyed',          em:'☁️', pr:'$1,000–$3,000', apt:false },
'scoodle':          { n:'Scoodle',             p1:'Scottish Terrier',    p2:'Poodle',                 par:'Scottish Terrier × Miniature Poodle',         w:'9–20 lbs',    h:'10–14 in',   l:'12–15 yrs', e:'Moderate',     sz:'small',  vid:'lWOJR2U0aOM', vt:'Scottish Terrier – Dogs 101 Top Dog Facts',                 dc:'terrier/scottish', em:'🏴', pr:'$800–$2,000',   apt:true  },
'shepadoodle':      { n:'Shepadoodle',         p1:'German Shepherd',     p2:'Poodle',                 par:'German Shepherd × Standard Poodle',           w:'50–90 lbs',   h:'22–28 in',   l:'12–14 yrs', e:'High',         sz:'large',  vid:'O1S_m_q4uR8', vt:'Shepadoodle Dog Breed Profile – Traits & Grooming',         dc:'germanshepherd',   em:'🐕', pr:'$800–$2,500',   apt:false },
'sheprador':        { n:'Sheprador',           p1:'German Shepherd',     p2:'Labrador Retriever',     par:'German Shepherd × Labrador Retriever',        w:'50–80 lbs',   h:'20–27 in',   l:'10–14 yrs', e:'High',         sz:'large',  vid:'66-7fpGmxik', vt:'Goberian – Smart Working Dog Hybrid Guide',                  dc:'germanshepherd',   em:'🐕', pr:'$400–$1,500',   apt:false },
'spoodle':          { n:'Spoodle',             p1:'Cocker Spaniel',      p2:'Poodle',                 par:'Cocker Spaniel × Poodle (Cockapoo)',           w:'12–28 lbs',   h:'14–15 in',   l:'14–16 yrs', e:'Moderate',     sz:'small',  vid:'wtAiW7rhCeI', vt:'Cocker Spaniel – Everything You Need to Know',              dc:'spaniel/cocker',   em:'🐩', pr:'$800–$2,500',   apt:true  },
'weimardoodle':     { n:'Weimardoodle',        p1:'Weimaraner',          p2:'Poodle',                 par:'Weimaraner × Standard Poodle',                w:'50–70 lbs',   h:'20–27 in',   l:'10–13 yrs', e:'High',         sz:'large',  vid:'N2atlYD37vQ', vt:'Weimardoodle Dog Breed Information',                         dc:'weimaraner',       em:'🏃', pr:'$800–$2,500',   apt:false },
'whoodle':          { n:'Whoodle',             p1:'Wheaten Terrier',     p2:'Poodle',                 par:'Soft-Coated Wheaten Terrier × Poodle',        w:'20–45 lbs',   h:'18–20 in',   l:'12–15 yrs', e:'High',         sz:'medium', vid:'6X3T1QHaPJM', vt:'Soft-Coated Wheaten Terrier – Dogs 101 | Animal Planet',    dc:'terrier/wheaten',  em:'🌾', pr:'$1,000–$2,500', apt:false },
'woodle':           { n:'Woodle',              p1:'Welsh Terrier',       p2:'Poodle',                 par:'Welsh Terrier × Miniature or Standard Poodle',w:'15–35 lbs',   h:'13–18 in',   l:'12–14 yrs', e:'High',         sz:'small',  vid:'T0qBuzxBkZ0', vt:'Welsh Terrier – Dogs 101 Top Dog Facts',                    dc:'terrier/welsh',    em:'🏴', pr:'$800–$2,000',   apt:true  },
};

// ── Size-based diet portions ────────────────────────────────────────────────
function dietGrid(sz, w) {
  if (sz === 'small') return [
    ['20 lbs (inactive)','¾ cup/day'], ['25 lbs (average)','1 cup/day'],
    ['30 lbs (active)','1¼ cups/day'], ['35 lbs (very active)','1½ cups/day'],
  ];
  if (sz === 'giant') return [
    ['90 lbs (inactive)','4 cups/day'], ['110 lbs (average)','4½ cups/day'],
    ['130 lbs (active)','5 cups/day'], ['150 lbs (very active)','5½ cups/day'],
  ];
  if (sz === 'large') return [
    ['60 lbs (inactive)','2½ cups/day'], ['70 lbs (average)','3 cups/day'],
    ['80 lbs (active)','3½ cups/day'], ['90 lbs (very active)','4 cups/day'],
  ];
  return [ // medium
    ['30 lbs (inactive)','1½ cups/day'], ['40 lbs (average)','2 cups/day'],
    ['50 lbs (active)','2½ cups/day'], ['60 lbs (very active)','3 cups/day'],
  ];
}

function dietLifetime(sz) {
  if (sz === 'small')  return ['10–15', '$8,000–$18,000'];
  if (sz === 'medium') return ['10–15', '$10,000–$22,000'];
  if (sz === 'large')  return ['8–13',  '$12,000–$25,000'];
  return                      ['8–12',  '$15,000–$30,000'];
}

function exerciseText(e, n) {
  if (e === 'High') return `${n}s are high-energy dogs that need at least 1.5–2 hours of vigorous daily exercise to stay physically and mentally balanced. Without adequate activity they can become restless, vocal, or destructive. They thrive with active owners who enjoy outdoor activities year-round.`;
  if (e === 'Low-Moderate') return `${n}s have a gentle energy level that suits a calm, relaxed lifestyle. Short daily walks (20–30 minutes) plus indoor play sessions are enough to keep them happy and healthy. They are well-suited to apartment life and less active owners.`;
  return `${n}s have a moderate energy level — they enjoy daily walks and playtime but are equally happy relaxing at home. Around 45–60 minutes of daily activity keeps them content. They adapt well to both active and more relaxed households.`;
}

function groomingText(d) {
  const isDoodle = d.p2 === 'Poodle' || d.p1 === 'Poodle';
  if (isDoodle) return `${d.n}s have a wavy or curly coat that requires consistent maintenance. Without regular grooming the coat will mat and tangle — professional trims every 6–8 weeks are essential, along with brushing several times a week at home.`;
  return `${d.n}s have a ${d.coat.toLowerCase()} that needs regular brushing to stay healthy. Depending on coat type, they may require weekly to bi-weekly brushing plus periodic baths and nail trims every 3–4 weeks.`;
}

// ── HTML template ────────────────────────────────────────────────────────────
function makePage(slug, d) {
  const name = d.n;
  const energyLabel = d.e;
  const [lifeYrs, lifetimeCost] = dietLifetime(d.sz);
  const dg = dietGrid(d.sz, d.w);
  const isDoodle = d.p1 === 'Poodle' || d.p2 === 'Poodle';
  const coatFood  = isDoodle ? 'Omega-3 fatty acids for coat and skin health' : 'Omega-3 fatty acids for a healthy, shiny coat';
  const foodFormula = d.sz === 'small' ? 'Small-breed formula' : d.sz === 'giant' ? 'Large-breed or giant-breed formula' : 'Large-breed formula';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C8QDN9HH5F');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — Breed Profile, Temperament, Care &amp; Health | AllDogFacts</title>
  <meta name="description" content="${name} breed profile: ${d.par} — learn about temperament, care, health, and whether this hybrid is right for you." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/styles.css" />
  <link rel="stylesheet" href="../css/breeds.css" />
</head>
<body>

  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Home</a></li>
        <li><a href="/breeds/index.html" style="color:var(--teal)">Dog Breeds</a></li>
        <li><a href="/getting-a-dog/index.html">Getting a Dog</a></li>
        <li><a href="/training/index.html">Training</a></li>
        <li><a href="/health/index.html">Health</a></li>
        <li><a href="/nutrition/index.html">Nutrition</a></li>
        <li><a href="/grooming/index.html">Grooming</a></li>
      </ul>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <section class="breed-page-hero">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Home</a><span>›</span>
        <a href="index.html">Dog Breeds</a><span>›</span>
        <span style="color:rgba(255,255,255,.8)">${name}</span>
      </div>
      <div class="breed-hero-layout">
        <div class="breed-hero-emoji" id="breedPhotoWrap">
          <img class="breed-hero-real-photo" id="breedPhoto" alt="${name}" />
          <span class="breed-emoji-fallback" id="breedEmoji">${d.em}</span>
        </div>
        <div class="breed-hero-text">
          <h1>${name}</h1>
          <p class="breed-subtitle">${d.subtitle}</p>
          <div class="breed-quick-stats">
            <div class="quick-stat"><span class="quick-stat-value">${d.w}</span><span class="quick-stat-label">Weight</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${d.h}</span><span class="quick-stat-label">Height</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${d.l}</span><span class="quick-stat-label">Lifespan</span></div>
            <div class="quick-stat"><span class="quick-stat-value">${d.e}</span><span class="quick-stat-label">Energy</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="breed-content-wrap">
      <div class="breed-main">

        <div class="breed-section">
          <h2>🎬 ${name} Facts</h2>
          <p>Watch this video for a quick overview of the ${name} — see the breed in action before diving into the details below.</p>
          <div class="video-embed">
            <iframe src="https://www.youtube.com/embed/${d.vid}" title="${d.vt}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>

        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <!-- PROFILE TAB -->
        <div class="breed-tab-panel active" id="tab-profile">

          <div class="breed-section">
            <h2>🐾 Overview</h2>
            <p>The ${name} is a hybrid cross between the ${d.p1} and the ${d.p2}. The ${d.p1} contributes its natural temperament, physical traits, and instincts, while the ${d.p2} adds complementary qualities to create a well-rounded companion. As with all hybrids, individual ${name}s can vary widely — some lean toward one parent breed, others blend both equally.</p>
            <p>${name}s appeal to families and individuals looking for a dog that combines the best of two beloved breeds. Their hybrid nature can bring health benefits through genetic diversity, and their personality tends to be adaptable and affectionate when properly socialized from a young age. ${d.apt ? 'Their size makes them well-suited to apartment living.' : 'They do best with access to outdoor space and an active daily routine.'}</p>
          </div>

          <div class="breed-section">
            <h2>📸 Photo Gallery</h2>
            <p>Real ${name}s — browse photos showcasing their look, size, and personality.</p>
            <div class="breed-gallery" id="breedGallery">
              <img class="gallery-photo" id="gp1" alt="${name} photo 1" />
              <img class="gallery-photo" id="gp2" alt="${name} photo 2" />
              <img class="gallery-photo" id="gp3" alt="${name} photo 3" />
              <img class="gallery-photo" id="gp4" alt="${name} photo 4" />
              <img class="gallery-photo" id="gp5" alt="${name} photo 5" />
              <img class="gallery-photo" id="gp6" alt="${name} photo 6" />
            </div>
          </div>

          <div class="breed-section">
            <h2>😊 Temperament &amp; Personality</h2>
            <p>${name}s are known for being sociable and adaptable. They form deep bonds with their families and thrive on consistent human connection. Personality can vary depending on which parent's traits dominate, so meeting the specific dog before adopting is always a smart move.</p>
            <ul>
              <li>Affectionate and loyal — forms strong bonds with family members</li>
              <li>Energetic and playful — needs regular outlets matched to their ${energyLabel.toLowerCase()} energy level</li>
              <li>Intelligent and responsive — picks up commands well with reward-based training</li>
              <li>Social and friendly — generally good with children and other dogs when socialized early</li>
              <li>Personality varies between litters — individual traits depend on which parent is dominant</li>
              <li>Early socialization is key to bringing out the best in this hybrid breed</li>
            </ul>
          </div>

          <div class="breed-section">
            <h2>🏃 Exercise &amp; Activity Needs</h2>
            <p>${exerciseText(d.e, name)}</p>
            <ul>
              <li>${d.e === 'High' ? 'Daily exercise: 1.5–2+ hours split into morning and evening sessions' : d.e === 'Low-Moderate' ? 'Daily exercise: 20–30 minutes of walking plus indoor play' : 'Daily exercise: 45–60 minutes of walks plus playtime'}</li>
              <li>Mental enrichment (puzzle feeders, training sessions, scent games) prevents boredom</li>
              <li>${d.apt ? 'Indoor play and short walks meet their daily activity needs' : 'Off-leash time in a securely fenced yard is highly beneficial'}</li>
              <li>Consistent daily routine keeps ${name}s balanced and well-behaved</li>
              <li>Without adequate exercise, they may develop destructive habits from frustration</li>
              <li>Puppies: limit impact exercise to 5 minutes per month of age to protect developing joints</li>
            </ul>
          </div>

          <div class="breed-section">
            <h2>✂️ Grooming &amp; Coat Care</h2>
            <p>${groomingText(d)}</p>
            <ul>
              <li>${isDoodle ? 'Brush several times per week to prevent mats — use a slicker brush and metal comb' : 'Brush weekly to remove loose fur and keep the coat healthy'}</li>
              <li>${isDoodle ? 'Professional grooming every 6–8 weeks to trim and shape the coat' : 'Bathe every 4–6 weeks or as needed'}</li>
              <li>Check and clean ears weekly — especially important for drop-eared dogs</li>
              <li>Trim nails every 3–4 weeks to prevent discomfort and joint issues</li>
              <li>Brush teeth 2–3 times per week using dog-safe toothpaste</li>
              <li>${d.sz === 'small' ? 'Small breeds are prone to dental disease — regular dental care is especially important' : 'Regular grooming sessions double as health checks — look for lumps, redness, or irritation'}</li>
            </ul>
          </div>

          <div class="breed-section">
            <h2>🎓 Training</h2>
            <p>${name}s respond well to positive, reward-based training. Their hybrid background typically brings good trainability, especially when training starts early. Consistency across all family members is essential — mixed signals lead to confusion and slower progress.</p>
            <ul>
              <li>Begin training and socialization as early as 8 weeks — the puppy window is critical</li>
              <li>Reward-based training (treats, praise, play) produces the fastest and most lasting results</li>
              <li>Keep sessions short (10–15 minutes) and varied to maintain focus</li>
              <li>Crate training establishes boundaries, aids house training, and gives your dog a safe space</li>
              <li>Puppy classes are an excellent investment for socialization and basic obedience</li>
              <li>A well-exercised dog is a focused dog — always exercise before training sessions</li>
            </ul>
          </div>

          <div class="breed-section">
            <h2>🏥 Health &amp; Common Issues</h2>
            <p>${name}s may benefit from hybrid vigor, which can reduce the incidence of some hereditary conditions found in the parent breeds. That said, they can still inherit health issues from either side. Choosing a reputable breeder who health-tests both parents is the best protection.</p>
            <div class="health-tags">
              <span class="health-tag">Hybrid vigor may reduce some conditions</span>
              <span class="health-tag">Hip dysplasia</span>
              <span class="health-tag">Eye conditions</span>
              <span class="health-tag">Dental disease</span>
              <span class="health-tag">Obesity if under-exercised</span>
              <span class="health-tag">Inherits parent-breed health risks</span>
            </div>
            <div class="info-grid" style="margin-top:16px">
              <div class="info-box"><div class="info-box-label">Average Lifespan</div><div class="info-box-value">${d.l}</div></div>
              <div class="info-box"><div class="info-box-label">Size Category</div><div class="info-box-value">${d.sz.charAt(0).toUpperCase()+d.sz.slice(1)} — ${d.w}</div></div>
              <div class="info-box"><div class="info-box-label">Vet Visits</div><div class="info-box-value">Annual wellness exams + vaccinations</div></div>
              <div class="info-box"><div class="info-box-label">Pet Insurance</div><div class="info-box-value">Strongly recommended for all breeds</div></div>
            </div>
          </div>

          <div class="breed-section">
            <h2>🏠 Is a ${name} Right for You?</h2>
            <p>A ${name} is an excellent choice for ${d.apt ? 'owners in apartments or smaller homes who want a compact, affectionate companion.' : 'active families with space to run and a commitment to daily exercise.'} They thrive with engaged owners who provide consistent training, socialization, and care. As a hybrid, individual traits can vary — meeting the specific dog before adopting is always a smart move.</p>
            <div class="compat-grid">
              <div class="compat-item"><span class="compat-icon">👶</span><span class="compat-label">With Kids</span><span class="compat-stars">★★★★☆</span></div>
              <div class="compat-item"><span class="compat-icon">🐕</span><span class="compat-label">With Dogs</span><span class="compat-stars">★★★★☆</span></div>
              <div class="compat-item"><span class="compat-icon">🐈</span><span class="compat-label">With Cats</span><span class="compat-stars">★★★☆☆</span></div>
              <div class="compat-item"><span class="compat-icon">🏠</span><span class="compat-label">Apartment</span><span class="compat-stars">${d.apt ? '★★★★☆' : '★★☆☆☆'}</span></div>
              <div class="compat-item"><span class="compat-icon">🔰</span><span class="compat-label">First-Time Owner</span><span class="compat-stars">${d.e === 'High' ? '★★★☆☆' : '★★★★☆'}</span></div>
              <div class="compat-item"><span class="compat-icon">🌡️</span><span class="compat-label">Hot Climates</span><span class="compat-stars">★★★☆☆</span></div>
            </div>
          </div>

          <div class="breed-section">
            <h2>🐾 Related Breeds</h2>
            <div class="related-breeds">
              <a href="goldendoodle.html" class="related-card"><span class="rel-emoji">🐩</span><span>Goldendoodle</span></a>
              <a href="labradoodle.html" class="related-card"><span class="rel-emoji">🐕</span><span>Labradoodle</span></a>
              <a href="cavapoo.html" class="related-card"><span class="rel-emoji">🐕</span><span>Cavapoo</span></a>
            </div>
          </div>

        </div><!-- end tab-profile -->

        <!-- DIET TAB -->
        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ How Much to Feed a ${name}</h2>
            <p>${name}s need consistent, well-portioned meals matched to their life stage. Overfeeding is one of the biggest health risks for any dog — use these guidelines and adjust based on your dog's activity level and body condition.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Puppy (8–12 weeks)</div><div class="info-box-value">3–4 small meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Puppy (3–6 months)</div><div class="info-box-value">3 meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Adult (1+ year)</div><div class="info-box-value">2 meals per day</div></div>
              <div class="info-box"><div class="info-box-label">Senior (7+ years)</div><div class="info-box-value">2 smaller meals per day</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📏 Daily Portion Guide by Weight</h2>
            <p>These are general guidelines. Always check the feeding instructions on your specific food brand and adjust based on activity level and body condition score.</p>
            <div class="info-grid">
              ${dg.map(([label,val])=>`<div class="info-box"><div class="info-box-label">${label}</div><div class="info-box-value">${val}</div></div>`).join('\n              ')}
            </div>
          </div>
          <div class="breed-section">
            <h2>✅ Best Foods for ${name}s</h2>
            <p>Look for dog foods where the first ingredient is a named protein — chicken, beef, salmon, or lamb. ${foodFormula} provides the right nutrient balance for their size and metabolism.</p>
            <ul>
              <li>High-quality protein as the first ingredient to support muscle mass</li>
              <li>${coatFood}</li>
              <li>Two meals daily (no free-feeding) to maintain a healthy weight and reduce bloat risk</li>
              <li>Glucosamine and chondroitin for joint support — important for ${d.sz === 'giant' || d.sz === 'large' ? 'large-breed hybrids prone to hip issues' : 'hybrid breeds with active lifestyles'}</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🚫 Foods That Are Dangerous for ${name}s</h2>
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
            <h2>🦴 Healthy Treats for ${name}s</h2>
            <ul>
              <li>Carrots — low calorie, great for dental health</li>
              <li>Blueberries — antioxidants and a naturally sweet reward</li>
              <li>Plain cooked chicken or turkey (no seasoning)</li>
              <li>Apple slices (remove seeds and core)</li>
              <li>Plain rice cakes — low-calorie training reward</li>
              <li>Commercial treats sized appropriately for a ${d.sz}-breed dog</li>
            </ul>
            <div class="travel-tip-box">
              <h4>💡 Tip: Boarding your ${name}?</h4>
              <p>Always bring your ${name}'s regular food when boarding. Switching food suddenly can cause digestive upset. Provide the facility your exact feeding schedule and portion sizes.</p>
            </div>
          </div>
        </div><!-- end tab-diet -->

        <!-- COST TAB -->
        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 How Much Does a ${name} Cost?</h2>
            <p>The upfront cost of a ${name} is just the beginning. Here's a realistic breakdown of what to expect — both to acquire one and to own one for their lifetime.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Reputable Breeder</div><div class="info-box-value">${d.pr}</div></div>
              <div class="info-box"><div class="info-box-label">Show / Champion Lines</div><div class="info-box-value">Up to $4,000+</div></div>
              <div class="info-box"><div class="info-box-label">Rescue / Adoption</div><div class="info-box-value">$50–$500</div></div>
              <div class="info-box"><div class="info-box-label">Backyard Breeder ⚠️</div><div class="info-box-value">$200–$500 (risky)</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📅 Monthly Cost of Owning a ${name}</h2>
            <p>Beyond the purchase price, owning a ${name} costs between <strong>${d.sz === 'small' ? '$80–$180' : d.sz === 'giant' ? '$200–$400' : '$120–$280'} per month</strong> on average. Here's where the money goes:</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Food (quality kibble)</div><div class="info-box-value">${d.sz === 'small' ? '$25–$50/month' : d.sz === 'giant' ? '$80–$150/month' : '$45–$90/month'}</div></div>
              <div class="info-box"><div class="info-box-label">Vet visits (annual)</div><div class="info-box-value">$400–$800/year</div></div>
              <div class="info-box"><div class="info-box-label">Pet insurance</div><div class="info-box-value">$25–$70/month</div></div>
              <div class="info-box"><div class="info-box-label">Grooming</div><div class="info-box-value">${isDoodle ? '$60–$120/month' : '$20–$60/month'}</div></div>
              <div class="info-box"><div class="info-box-label">Toys &amp; supplies</div><div class="info-box-value">$15–$35/month</div></div>
              <div class="info-box"><div class="info-box-label">Training classes</div><div class="info-box-value">$100–$300 (one-time)</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>📊 Lifetime Cost Estimate</h2>
            <p>Over a ${lifeYrs}-year lifespan, a ${name} typically costs between <strong>${lifetimeCost} total</strong> — depending on health, lifestyle, and the services you use.</p>
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
            <h2>💡 How to Save Money as a ${name} Owner</h2>
            <ul>
              <li>Get pet insurance before your dog turns 1 — premiums are lower and exclusions are fewer</li>
              <li>Buy food in larger bags when possible — significantly cheaper per pound</li>
              <li>Learn basic grooming at home — brushing, ear cleaning, and nail trimming save groomer fees</li>
              <li>Ask your vet about wellness plans — many clinics offer annual packages for routine care</li>
              <li>Adopt instead of buying — rescue ${name}s are just as loving and cost a fraction of breeder prices</li>
            </ul>
          </div>
        </div><!-- end tab-cost -->

        <!-- MIXES TAB -->
        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 ${name} Variations &amp; Generations</h2>
            <p>Because ${name}s combine two distinct breeds, breeders produce several generations and size variations. Here are the most common types you'll encounter.</p>
          </div>
          <div class="breed-section">
            <h2>🐩 F1 ${name}</h2>
            <p>50% ${d.p1}, 50% ${d.p2}. The first-generation cross — the most common type and the widest range of trait variation.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Size</div><div class="info-box-value">${d.w}</div></div>
              <div class="info-box"><div class="info-box-label">Energy</div><div class="info-box-value">${d.e}</div></div>
              <div class="info-box"><div class="info-box-label">Coat</div><div class="info-box-value">${d.coat.split(',')[0]}</div></div>
              <div class="info-box"><div class="info-box-label">Price</div><div class="info-box-value">${d.pr}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🐩 F1B ${name}</h2>
            <p>F1 ${name} × ${d.p2}. Back-crossed to the ${d.p2} — results in a curlier, lower-shedding coat. Popular for allergy-sensitive homes.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Size</div><div class="info-box-value">${d.w}</div></div>
              <div class="info-box"><div class="info-box-label">Energy</div><div class="info-box-value">${d.e}</div></div>
              <div class="info-box"><div class="info-box-label">Shedding</div><div class="info-box-value">Lower than F1</div></div>
              <div class="info-box"><div class="info-box-label">Price</div><div class="info-box-value">${d.pr}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🐩 F2 ${name}</h2>
            <p>F1 ${name} × F1 ${name}. Second-generation cross — traits are more unpredictable but can produce a wider range of coat types and sizes.</p>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Size</div><div class="info-box-value">${d.w}</div></div>
              <div class="info-box"><div class="info-box-label">Energy</div><div class="info-box-value">${d.e}</div></div>
              <div class="info-box"><div class="info-box-label">Shedding</div><div class="info-box-value">Variable</div></div>
              <div class="info-box"><div class="info-box-label">Price</div><div class="info-box-value">${d.pr}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>🐾 ${d.p1} × ${d.p2} Compared to Similar Hybrids</h2>
            <p>If you love what the ${name} offers, these similar hybrids are worth exploring too:</p>
            <div class="related-breeds">
              <a href="goldendoodle.html" class="related-card"><span class="rel-emoji">🐩</span><span>Goldendoodle</span></a>
              <a href="labradoodle.html" class="related-card"><span class="rel-emoji">🐕</span><span>Labradoodle</span></a>
              <a href="cavapoo.html" class="related-card"><span class="rel-emoji">🐕</span><span>Cavapoo</span></a>
            </div>
          </div>
        </div><!-- end tab-mixes -->

        <!-- FACTS TAB -->
        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Amazing Facts About ${name}s</h2>
            <p>${name}s are full of surprises. Here are some of the most fascinating facts about this hybrid breed and its parent dogs.</p>
            <ul>
              <li>🐕 The ${name} is a cross between the ${d.p1} and the ${d.p2} — combining two distinct breed personalities into one unique companion</li>
              <li>🧬 As a hybrid, ${name}s may benefit from heterosis (hybrid vigor) — potentially enjoying fewer of the hereditary issues common in purebred parents</li>
              <li>🎓 The ${d.p2 === 'Poodle' || d.p1 === 'Poodle' ? 'Poodle ancestry makes them highly intelligent and trainable — one of the top 5 smartest dog breeds' : `${d.p1} and ${d.p2} both bring strong working instincts that make ${name}s capable and responsive`}</li>
              <li>❤️ ${name}s typically form deep bonds with their primary family and do not thrive when left alone for long periods</li>
              <li>🌍 Designer hybrid breeds like the ${name} have grown dramatically in popularity over the past two decades as families seek dogs with specific trait combinations</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>📋 ${name} At a Glance</h2>
            <div class="info-grid">
              <div class="info-box"><div class="info-box-label">Hybrid</div><div class="info-box-value">${d.par}</div></div>
              <div class="info-box"><div class="info-box-label">Weight</div><div class="info-box-value">${d.w}</div></div>
              <div class="info-box"><div class="info-box-label">Height</div><div class="info-box-value">${d.h}</div></div>
              <div class="info-box"><div class="info-box-label">Lifespan</div><div class="info-box-value">${d.l}</div></div>
              <div class="info-box"><div class="info-box-label">Energy</div><div class="info-box-value">${d.e}</div></div>
              <div class="info-box"><div class="info-box-label">Coat</div><div class="info-box-value">${d.coat}</div></div>
            </div>
          </div>
          <div class="breed-section">
            <h2>❤️ Why People Love the ${name}</h2>
            <ul>
              <li>Combines the best traits of the ${d.p1} and ${d.p2} in one dog</li>
              <li>Adaptable and affectionate — thrives in a variety of home environments</li>
              <li>${d.apt ? 'Compact enough for apartment living while still being playful and energetic' : 'Athletic and versatile — great for active families who love the outdoors'}</li>
              <li>Consistently ranked among the most rewarding hybrid breeds to live with</li>
            </ul>
          </div>
        </div><!-- end tab-facts -->

      </div><!-- end breed-main -->

      <aside class="breed-sidebar">
        <div class="sidebar-card">
          <h4>Breed Traits</h4>
          <div class="trait-row">
            <div class="trait-item"><div class="trait-header"><span>Gentleness</span><span>4/5</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:78%"></div></div></div>
            <div class="trait-item"><div class="trait-header"><span>Friendliness</span><span>4/5</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:82%"></div></div></div>
            <div class="trait-item"><div class="trait-header"><span>Energy Level</span><span>${d.e === 'High' ? '5/5' : d.e === 'Low-Moderate' ? '2/5' : '3/5'}</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:${d.e === 'High' ? '88' : d.e === 'Low-Moderate' ? '40' : '60'}%"></div></div></div>
            <div class="trait-item"><div class="trait-header"><span>Trainability</span><span>${d.p2 === 'Poodle' || d.p1 === 'Poodle' ? '5/5' : '4/5'}</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:${d.p2 === 'Poodle' || d.p1 === 'Poodle' ? '90' : '80'}%"></div></div></div>
            <div class="trait-item"><div class="trait-header"><span>Good with Kids</span><span>4/5</span></div><div class="trait-bar-bg"><div class="trait-bar-fill" style="width:80%"></div></div></div>
          </div>
        </div>
        <div class="sidebar-card" style="background:var(--teal-light); border-color:var(--teal)">
          <h4 style="color:var(--teal-dark)">Explore More Breeds</h4>
          <p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">Browse our full directory of <strong class="breed-count-live">302+</strong> dog breeds with detailed profiles.</p>
          <a href="/breeds/index.html" style="display:block; text-align:center; background:var(--teal); color:white; padding:11px 16px; border-radius:10px; font-weight:700; font-size:.88rem;">Browse All Breeds →</a>
        </div>
        <div class="sidebar-card">
          <h4>Quick Facts</h4>
          <div class="info-box"><div class="info-box-label">Hybrid</div><div class="info-box-value">${d.par}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Weight</div><div class="info-box-value">${d.w}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Coat</div><div class="info-box-value">${d.coat}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Energy</div><div class="info-box-value">${d.e}</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Recognition</div><div class="info-box-value">Not AKC recognized (hybrid)</div></div>
          <div class="info-box" style="margin-top:8px"><div class="info-box-label">Good for Apartments</div><div class="info-box-value">${d.apt ? 'Yes — well-suited to smaller spaces' : 'No — needs outdoor space and exercise'}</div></div>
        </div>
      </aside>

    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div><p>Your complete guide to dog breeds, pet boarding in Seattle, and nationwide pet transportation.</p></div>
        <div class="footer-col"><h4>More Breeds</h4><ul><li><a href="golden-retriever.html">Golden Retriever</a></li><li><a href="labrador-retriever.html">Labrador Retriever</a></li><li><a href="german-shepherd.html">German Shepherd</a></li><li><a href="index.html">All Breeds →</a></li></ul></div>
        <div class="footer-col"><h4>Our Services</h4><ul><li><a href="https://www.pawsvip.com" target="_blank">Pet Hotel Seattle</a></li><li><a href="../index.html#transport">Nationwide Transport</a></li><li><a href="../index.html#contact">Get a Quote</a></li></ul></div>
      </div>
      <div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div>
    </div>
  </footer>

  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <button class="lightbox-prev" id="lightboxPrev">&#9664;</button>
    <img id="lightboxImg" src="" alt="Enlarged ${name} photo" />
    <button class="lightbox-next" id="lightboxNext">&#9654;</button>
  </div>

  <script src="../js/main.js"></script>
  <script>
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
  <script>
    let galleryPhotos = [];
    let currentPhotoIndex = 0;

    fetch('https://dog.ceo/api/breed/${d.dc}/images')
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data.message) || !data.message.length) return;
        const photos = data.message;
        const hero = document.getElementById('breedPhoto');
        hero.src = photos[2] || photos[0];
        hero.onload = () => { hero.style.display = 'block'; document.getElementById('breedEmoji').style.display = 'none'; };
        const picks = [5, 15, 25, 35, 45, 55];
        picks.forEach((index, i) => {
          const el = document.getElementById('gp' + (i + 1));
          const src = photos[index] || photos[i] || photos[0];
          if (el && src) { galleryPhotos.push(src); el.src = src; el.addEventListener('click', () => openLightbox(i)); }
        });
      }).catch(() => {});

    function openLightbox(index) { currentPhotoIndex = index; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; document.getElementById('lightbox').classList.add('open'); }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; });
    document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('open')) return;
      if (e.key === 'ArrowLeft') { currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'ArrowRight') { currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length; document.getElementById('lightboxImg').src = galleryPhotos[currentPhotoIndex]; }
      else if (e.key === 'Escape') { closeLightbox(); }
    });
  </script>
</body>
</html>`;
}

// ── Main ─────────────────────────────────────────────────────────────────────
let created = 0, skipped = 0;

for (const [slug, d] of Object.entries(HYBRIDS)) {
  // Ensure required fields have fallbacks
  d.coat  = d.coat  || 'Mixed coat, moderate shedding';
  d.colors= d.colors|| 'Varies';
  d.pr    = d.pr    || '$500–$2,000';
  d.em    = d.em    || '🐕';

  const fpath = path.join(BREEDS_DIR, slug + '.html');
  if (fs.existsSync(fpath)) { console.log(`⏭️  Exists: ${slug}`); skipped++; continue; }
  try {
    fs.writeFileSync(fpath, makePage(slug, d), 'utf8');
    console.log(`✅  Created: ${slug}`);
    created++;
  } catch(err) {
    console.error(`❌  FAILED: ${slug} — ${err.message}`);
  }
}

console.log(`\n📊 Done — ${created} pages created, ${skipped} already existed.`);
