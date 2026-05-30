import os, re

BASE = r"C:\Pet Website\breeds"

# ─── Shared HTML snippets ───────────────────────────────────────────────
TAB_NAV = """        <nav class="breed-tabs-nav">
          <button class="breed-tab active" data-tab="profile">🐾 Profile</button>
          <button class="breed-tab" data-tab="diet">🍽️ Diet &amp; Feeding</button>
          <button class="breed-tab" data-tab="cost">💰 Cost &amp; Price</button>
          <button class="breed-tab" data-tab="mixes">🧬 Mix Breeds</button>
          <button class="breed-tab" data-tab="facts">🎉 Fun Facts</button>
        </nav>

        <div class="breed-tab-panel active" id="tab-profile">
"""

TAB_JS = """  <script>
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
"""

DANGEROUS_FOODS = """            <div class="health-tags">
              <span class="health-tag">Chocolate</span>
              <span class="health-tag">Grapes &amp; Raisins</span>
              <span class="health-tag">Onions &amp; Garlic</span>
              <span class="health-tag">Xylitol (artificial sweetener)</span>
              <span class="health-tag">Macadamia Nuts</span>
              <span class="health-tag">Alcohol</span>
              <span class="health-tag">Avocado</span>
              <span class="health-tag">Raw yeast dough</span>
            </div>"""

HEALTHY_TREATS = """            <ul>
              <li>Carrots — low calorie and great for teeth</li>
              <li>Blueberries — antioxidants, dogs love them</li>
              <li>Plain cooked chicken or turkey (no seasoning)</li>
              <li>Apple slices (remove seeds and core)</li>
              <li>Green beans — filling and very low calorie</li>
              <li>Commercial treats sized for your dog's weight class</li>
            </ul>"""

# ─── HTML builders ──────────────────────────────────────────────────────
def ib(label, value):
    return f'              <div class="info-box"><div class="info-box-label">{label}</div><div class="info-box-value">{value}</div></div>'

def diet_panel(name, p1, p2, p3, p4, portions, notes, tip_h, tip_t):
    rows = "\n".join(ib(r[0], r[1]) for r in portions)
    nlist = "\n".join(f"              <li>{n}</li>" for n in notes)
    return f"""        <div class="breed-tab-panel" id="tab-diet">
          <div class="breed-section">
            <h2>🍽️ How Much to Feed a {name}</h2>
            <p>Portion control is one of the most important things you can do for your {name}'s long-term health. Use these as starting guidelines and adjust based on your individual dog's body condition score.</p>
            <div class="info-grid">
{ib("Puppy (8–12 weeks)", p1)}
{ib("Puppy (3–6 months)", p2)}
{ib("Adult (1+ year)", p3)}
{ib("Senior (7+ years)", p4)}
            </div>
          </div>
          <div class="breed-section">
            <h2>📏 Daily Portion Guide</h2>
            <p>These amounts are based on a standard quality dry kibble (~350 kcal/cup). Always check the feeding chart on your specific brand and adjust for your dog's activity level and metabolism.</p>
            <div class="info-grid">
{rows}
            </div>
          </div>
          <div class="breed-section">
            <h2>✅ Best Foods for {name}s</h2>
            <p>Look for foods where the first ingredient is a named animal protein (chicken, beef, salmon). The best diets for this breed also address their specific health tendencies:</p>
            <ul>
{nlist}
              <li>Avoid: artificial colors, BHA/BHT preservatives, and corn or soy as the primary ingredient</li>
            </ul>
          </div>
          <div class="breed-section">
            <h2>🚫 Foods Dangerous for Dogs</h2>
            <p>These common human foods can be toxic — even life-threatening — for your {name}. Keep them well out of reach.</p>
{DANGEROUS_FOODS}
          </div>
          <div class="breed-section">
            <h2>🦴 Healthy Treats</h2>
{HEALTHY_TREATS}
            <div class="travel-tip-box">
              <h4>💡 {tip_h}</h4>
              <p>{tip_t}</p>
            </div>
          </div>
        </div><!-- end tab-diet -->
"""

def cost_panel(name, pb, ps, pr, pbk, mr, fc, vc, ic, gc, tc, life, cnotes, ctip):
    nlist = "\n".join(f"              <li>{n}</li>" for n in cnotes)
    return f"""        <div class="breed-tab-panel" id="tab-cost">
          <div class="breed-section">
            <h2>💰 How Much Does a {name} Cost?</h2>
            <p>The purchase price is just the beginning. Here's a realistic breakdown of what it costs to buy and own a {name} over their lifetime.</p>
            <div class="info-grid">
{ib("Reputable Breeder", pb)}
{ib("Show / Champion Lines", ps)}
{ib("Rescue / Adoption", pr)}
{ib("Backyard Breeder ⚠️", pbk)}
            </div>
          </div>
          <div class="breed-section">
            <h2>📅 Monthly Cost of Owning a {name}</h2>
            <p>Beyond the purchase price, owning a {name} typically costs <strong>{mr} per month</strong>. Here's where the money goes:</p>
            <div class="info-grid">
{ib("Food (quality kibble)", fc)}
{ib("Vet visits (annual)", vc)}
{ib("Pet insurance", ic)}
{ib("Grooming", gc)}
{ib("Toys &amp; supplies", tc)}
{ib("Training classes", "$100 – $300 (one-time)")}
            </div>
          </div>
          <div class="breed-section">
            <h2>📊 Lifetime Cost Estimate</h2>
            <p>Over their full lifespan, a {name} typically costs <strong>{life} total</strong> — depending on health, lifestyle, and the services you use.</p>
            <ul>
{nlist}
              <li>Pet insurance is worth it — it pays for itself if your dog needs surgery</li>
              <li>Boarding costs: plan $50–$100/night at quality facilities when you travel</li>
            </ul>
            <div class="travel-tip-box">
              <h4>💡 Money-saving tip</h4>
              <p>{ctip}</p>
            </div>
          </div>
          <div class="breed-section">
            <h2>💡 How to Save Money as a {name} Owner</h2>
            <ul>
              <li>Get pet insurance before your dog turns 1 — lower premiums, fewer exclusions</li>
              <li>Buy food in bulk (large bags) — significantly cheaper per pound</li>
              <li>Learn basic grooming at home — brushing and nail trims add up fast</li>
              <li>Ask your vet about annual wellness plans — many clinics offer bundled packages</li>
              <li>Adopt instead of buying — rescue {name}s are just as loving at a fraction of the cost</li>
            </ul>
          </div>
        </div><!-- end tab-cost -->
"""

def mix_block(emoji, mname, desc, stats):
    shtml = "\n".join(ib(s[0], s[1]) for s in stats)
    return f"""          <div class="breed-section">
            <h2>{emoji} {mname}</h2>
            <p>{desc}</p>
            <div class="info-grid">
{shtml}
            </div>
          </div>"""

def mixes_panel(name, intro, mixes):
    blocks = "\n".join(mix_block(m[0], m[1], m[2], m[3]) for m in mixes)
    return f"""        <div class="breed-tab-panel" id="tab-mixes">
          <div class="breed-section">
            <h2>🧬 Popular {name} Mix Breeds</h2>
            <p>{intro}</p>
          </div>
{blocks}
        </div><!-- end tab-mixes -->
"""

def facts_panel(name, intro, facts, famous):
    flist = "\n".join(f"              <li>{f}</li>" for f in facts)
    famhtml = "\n".join(ib(f[0], f[1]) for f in famous)
    return f"""        <div class="breed-tab-panel" id="tab-facts">
          <div class="breed-section">
            <h2>🎉 Amazing Facts About {name}s</h2>
            <p>{intro}</p>
            <ul>
{flist}
            </ul>
          </div>
          <div class="breed-section">
            <h2>🌟 Famous {name}s</h2>
            <div class="info-grid">
{famhtml}
            </div>
          </div>
        </div><!-- end tab-facts -->
"""

# ═══════════════════════════════════════════════════════════════════════════
# BREED DATA
# ═══════════════════════════════════════════════════════════════════════════

data = {}

# ── 1. GOLDEN RETRIEVER ────────────────────────────────────────────────────
data["golden-retriever"] = {
    "diet": diet_panel(
        "Golden Retriever",
        "3–4 small meals/day", "3 meals/day", "2 meals/day", "2 smaller meals/day",
        [("50 lbs (light activity)", "2 – 2½ cups/day"),
         ("60 lbs (average)", "2½ – 3 cups/day"),
         ("70 lbs (active)", "3 – 3½ cups/day"),
         ("80 lbs (very active)", "3½ – 4 cups/day")],
        ["Real animal protein (chicken or salmon) as the first ingredient",
         "Omega-3 fatty acids (fish oil) — supports their dense double coat and reduces shedding",
         "Glucosamine &amp; chondroitin — essential for a breed prone to hip dysplasia",
         "Large-breed formula for puppies — controls growth rate and protects developing joints",
         "Portion control is critical — Goldens are extremely food-motivated and prone to obesity"],
        "Boarding your Golden?",
        "Always bring your Golden's regular food when boarding. Switching food suddenly can cause stomach upset. Provide the facility with exact portion sizes — Goldens will happily overeat if given the chance!"
    ),
    "cost": cost_panel(
        "Golden Retriever",
        "$1,000 – $3,500", "$3,500 – $5,000+", "$50 – $300", "$400 – $800 (risky)",
        "$150 – $300",
        "$50 – $80/month", "$500 – $1,200/year", "$40 – $80/month",
        "$50 – $100/month", "$20 – $40/month",
        "$18,000 – $35,000",
        ["First year is the most expensive — puppy purchase + vaccinations + spay/neuter + supplies",
         "Budget for cancer screening — Goldens have a ~60% cancer rate, the highest of any breed",
         "Grooming costs are higher than average due to their heavy shedding double coat"],
        "Pet insurance is especially important for Goldens given their high cancer rate. Buy before age 1 for the best rates and fewest pre-existing condition exclusions."
    ),
    "mixes": mixes_panel(
        "Golden Retriever",
        "Because of their extraordinary temperament, Golden Retrievers are one of the most popular dogs to mix. Here are the most loved Golden crosses.",
        [
            ("🐩", "Goldendoodle (Golden + Poodle)",
             "The world's most popular designer dog — combines the Golden's loving personality with the Poodle's low-shedding coat. Goldendoodles make outstanding therapy dogs and family companions.",
             [("Size", "25 – 80 lbs (varies)"), ("Shedding", "Low to minimal"), ("Trainability", "Excellent"), ("Price", "$1,500 – $3,500")]),
            ("🦮", "Goldador (Golden + Labrador Retriever)",
             "The ultimate service and family dog. Goldadors blend the best traits of both retrievers and are frequently used as guide dogs, therapy dogs, and search-and-rescue workers.",
             [("Size", "55 – 80 lbs"), ("Energy", "High"), ("With Kids", "Outstanding"), ("Shedding", "Moderate – High")]),
            ("🐕‍🦺", "Golden Shepherd (Golden + German Shepherd)",
             "Intelligent, loyal, and athletic. Golden Shepherds are devoted family dogs with a natural protective instinct. They need experienced owners and plenty of daily exercise.",
             [("Size", "55 – 85 lbs"), ("Energy", "Very High"), ("Trainability", "Excellent"), ("Shedding", "High")]),
            ("🐺", "Goberian (Golden + Siberian Husky)",
             "A stunning mix combining the Golden's warmth with the Husky's striking looks and athleticism. Goberians are outgoing, energetic, and often inherit the Husky's blue eyes.",
             [("Size", "45 – 80 lbs"), ("Energy", "Very High"), ("Eye Color", "Often blue or bi-colored"), ("Best For", "Active families")]),
        ]
    ),
    "facts": facts_panel(
        "Golden Retriever",
        "One of the most universally loved dogs on the planet — here are some of the most fascinating facts about the Golden Retriever.",
        [
            "🏆 The Golden Retriever ranks <strong>#3 most popular breed in the USA</strong> — and has been in the top 5 for over 30 consecutive years.",
            "🎬 Goldens appear in more Hollywood films and TV commercials than any other breed — their friendly, photogenic expression makes them advertising gold.",
            "🧬 Approximately <strong>60% of all Golden Retrievers develop cancer</strong> — the highest rate of any breed. The Morris Animal Foundation enrolled 3,000+ Goldens in a lifetime cancer study to find a cure.",
            "🤝 Goldens are the <strong>#2 guide dog breed in the world</strong>, behind only the Labrador. Their calm temperament and trainability make them exceptional service animals.",
            "🥚 Goldens were bred with an incredibly <strong>\"soft mouth\"</strong> to retrieve birds without damaging them — so gentle they can carry a raw egg without breaking it.",
            "🌍 The breed was developed in <strong>Scotland in the 1860s</strong> by Lord Tweedmouth, crossing a yellow Flat-Coated Retriever with a now-extinct Tweed Water Spaniel.",
            "🧠 Golden Retrievers consistently score in the <strong>top 5 most intelligent breeds</strong> and can learn over 165 commands — some exceptional individuals know 200+.",
            "🏊 Their <strong>water-repellent double coat and webbed feet</strong> make them natural-born swimmers, capable of retrieving from cold water for hours without fatigue.",
            "🌟 Goldens are among the most popular <strong>therapy and emotional support dogs</strong> — hospitals and schools use them specifically because they lower anxiety in patients and students.",
        ],
        [("Air Buddy", "Golden who played basketball in the 1997 film 'Air Bud,' launching a multi-movie franchise"),
         ("Shadow (Homeward Bound)", "Wise, devoted Golden in the 1993 film — one of cinema's most beloved dog characters"),
         ("Liberty", "First Golden Retriever to live in the White House — owned by President Gerald Ford"),
         ("Bretagne", "Last known surviving 9/11 search-and-rescue dog, a Golden who worked at Ground Zero for 10 days")]
    ),
}

# ── 2. GERMAN SHEPHERD ────────────────────────────────────────────────────
data["german-shepherd"] = {
    "diet": diet_panel(
        "German Shepherd",
        "3–4 meals/day", "3 meals/day", "2 meals/day", "2 smaller meals/day",
        [("50 lbs (working)", "2½ – 3 cups/day"),
         ("65 lbs (average)", "3 – 3½ cups/day"),
         ("75 lbs (active)", "3½ – 4 cups/day"),
         ("90 lbs (very active)", "4 – 4½ cups/day")],
        ["High-protein formula (26%+ protein) to support their athletic, muscular build",
         "Omega-3 fatty acids (fish oil) for their dense double coat and skin health",
         "Large-breed puppy formula — controls growth rate to protect developing hips",
         "Probiotics can help manage their famously sensitive digestive systems",
         "Avoid feeding one large meal — split into 2 portions to reduce bloat risk"],
        "Traveling with your German Shepherd?",
        "GSDs are creatures of routine — sudden food changes during travel can trigger digestive issues. Pack their regular food and maintain their exact feeding schedule when away from home."
    ),
    "cost": cost_panel(
        "German Shepherd",
        "$1,500 – $3,500", "$4,000 – $8,000+", "$50 – $400", "$500 – $1,000 (risky)",
        "$150 – $350",
        "$60 – $100/month", "$500 – $1,200/year", "$40 – $80/month",
        "$30 – $60/month", "$20 – $50/month",
        "$20,000 – $40,000",
        ["First-year costs are high — obedience training classes are essential and non-optional for GSDs",
         "Budget for hip and elbow dysplasia screening — OFA-certified parents are a must from reputable breeders",
         "Working-line GSDs cost significantly more than pet-line dogs — know the difference before buying"],
        "A cheaper GSD puppy from untested parents may cost thousands in vet bills later. OFA hip and elbow certification from both parents is worth paying extra for upfront."
    ),
    "mixes": mixes_panel(
        "German Shepherd",
        "German Shepherds are mixed with many breeds to combine their intelligence and loyalty with other desirable traits. Here are the most popular GSD crosses.",
        [
            ("🦮", "Sheprador (German Shepherd + Labrador)",
             "One of the most popular working dog mixes — intelligent, friendly, and highly trainable. Shepradors are widely used as police, military, and service dogs worldwide.",
             [("Size", "55 – 80 lbs"), ("Energy", "Very High"), ("Trainability", "Excellent"), ("With Kids", "Yes, great")]),
            ("🐺", "Shepsky (German Shepherd + Siberian Husky)",
             "Stunning and athletic, Shepskies combine the GSD's loyalty with the Husky's striking blue eyes and boundless energy. They need very experienced owners and serious daily exercise.",
             [("Size", "45 – 88 lbs"), ("Energy", "Extreme"), ("Shedding", "Very High"), ("Best For", "Experienced owners")]),
            ("🐕", "Shollie (German Shepherd + Border Collie)",
             "Possibly the most intelligent mix ever bred — combining two of the world's smartest working breeds. Shollies need a job, intense mental stimulation, and an experienced handler.",
             [("Size", "45 – 80 lbs"), ("Intelligence", "Exceptional"), ("Energy", "Very High"), ("Trainability", "Excellent")]),
            ("💪", "Shepweiler (German Shepherd + Rottweiler)",
             "Powerful, loyal, and protective. Shepweilers are natural guardian dogs devoted to their family. They require firm, experienced ownership and extensive early socialization from puppyhood.",
             [("Size", "75 – 115 lbs"), ("Protective Drive", "Very High"), ("Energy", "High"), ("Experience Needed", "High")]),
        ]
    ),
    "facts": facts_panel(
        "German Shepherd",
        "One of the world's most versatile and capable dog breeds — here are some of the most impressive facts about the German Shepherd.",
        [
            "🔢 German Shepherds are the <strong>#2 most popular breed in the USA</strong> and consistently rank in the top 3 worldwide — a position they've held for decades.",
            "🪖 GSDs are the <strong>most widely used breed in police and military work globally</strong> — serving in drug detection, bomb detection, search and rescue, and personal protection.",
            "🎬 Rin Tin Tin, a German Shepherd rescued from a WWI battlefield in France, became <strong>Hollywood's first major animal star</strong> and single-handedly saved Warner Bros. from bankruptcy in the 1920s.",
            "🦴 German Shepherds were <strong>the first breed selected as guide dogs for the blind</strong> — the program began in Germany after WWI to help veterans who lost their eyesight.",
            "🧠 GSDs rank <strong>3rd in canine intelligence</strong> (behind only Border Collies and Poodles) — they can learn a new command in fewer than 5 repetitions.",
            "🐺 The breed was standardized in <strong>1899 by Captain Max von Stephanitz</strong>, who spent 35 years developing the \"perfect\" German working dog from regional herding breeds.",
            "🌍 During WWII, the US renamed them <strong>\"Alsatians\"</strong> to avoid anti-German sentiment — a name still used in parts of the UK today.",
            "⚕️ German Shepherds are one of the leading breeds used for <strong>medical scent detection</strong> — research shows they can identify certain cancers with up to 98% accuracy.",
            "🏃 A healthy adult GSD can run at speeds of <strong>up to 30 mph</strong> and sustain a working pace for hours — making them the preferred breed for K9 pursuit work.",
        ],
        [("Rin Tin Tin", "WWI rescued GSD turned Hollywood star — appeared in 26 films and saved Warner Bros. from bankruptcy"),
         ("Bullet", "Roy Rogers's German Shepherd who appeared on his beloved TV show throughout the 1950s"),
         ("Chips", "Most decorated U.S. military dog of WWII — served in North Africa, Sicily, and Germany"),
         ("Rex (Kommissar Rex)", "Famous fictional police GSD who starred in a long-running Austrian TV series with millions of fans")]
    ),
}

# ── 3. FRENCH BULLDOG ─────────────────────────────────────────────────────
data["french-bulldog"] = {
    "diet": diet_panel(
        "French Bulldog",
        "3–4 small meals/day", "3 meals/day", "2 meals/day", "2 smaller meals/day",
        [("16 lbs (small female)", "¾ – 1 cup/day"),
         ("20 lbs (average)", "1 – 1¼ cups/day"),
         ("24 lbs (larger)", "1¼ – 1½ cups/day"),
         ("28 lbs (maximum)", "1½ – 1¾ cups/day")],
        ["Real animal protein as the first ingredient — chicken or fish work well for most Frenchies",
         "Limit fat content — Frenchies gain weight easily, which directly worsens breathing problems",
         "Grain-free or limited-ingredient diets can help — French Bulldogs have some of the <em>highest food allergy rates</em> of any breed",
         "Small-breed kibble or small pieces — their flat face makes picking up large kibble difficult",
         "Always use a slow-feed bowl to prevent gulping air, which causes bloating and discomfort"],
        "Feeding tip for Frenchie owners",
        "Never feed your French Bulldog right before or after exercise. Their flat face already makes breathing harder — a full stomach makes it worse. Wait at least 30 minutes each side of activity."
    ),
    "cost": cost_panel(
        "French Bulldog",
        "$3,000 – $6,000", "$6,000 – $12,000+", "$100 – $600", "$1,500 – $2,500 (very risky)",
        "$200 – $400",
        "$30 – $60/month", "$1,000 – $3,000/year", "$60 – $120/month",
        "$30 – $60/month", "$15 – $30/month",
        "$25,000 – $60,000",
        ["French Bulldogs are the most expensive common breed to buy — most require artificial insemination and C-section births, which breeders pass on in the price",
         "Veterinary costs are significantly higher than average due to brachycephalic health issues — budget $2,000–$5,000 for potential airway surgery in their lifetime",
         "Pet insurance is essentially mandatory for Frenchies — health issues are a near certainty, not just a possibility"],
        "Pet insurance for a French Bulldog costs $60–$120/month but can save you $5,000–$10,000 when airway surgery, spinal issues, or eye problems arise. This is not optional — it's essential."
    ),
    "mixes": mixes_panel(
        "French Bulldog",
        "Frenchies are mixed with other breeds to try to improve breathing, add athleticism, or create unique looks. Here are the most popular French Bulldog crosses.",
        [
            ("🐕", "Frenchton (French Bulldog + Boston Terrier)",
             "One of the most popular Frenchie mixes — slightly more athletic than a purebred Frenchie with a marginally longer snout and better breathing. Frenchtons share the Frenchie's personality with a bit more energy.",
             [("Size", "15 – 25 lbs"), ("Breathing", "Somewhat better than Frenchie"), ("Energy", "Moderate"), ("Price", "$1,500 – $3,500")]),
            ("🐾", "Frug (French Bulldog + Pug)",
             "Double the flat-face cuteness — but also double the breathing concerns. Frugs are charming, funny, and compact city dogs. Vet breathing checks before buying are essential for this mix.",
             [("Size", "14 – 24 lbs"), ("Energy", "Low – Moderate"), ("Breathing Risk", "High"), ("Best For", "Relaxed households")]),
            ("🐩", "French Boodle (French Bulldog + Poodle)",
             "A popular mix that attempts to combine the Frenchie's personality with the Poodle's low-shedding coat and slightly better breathing due to a longer snout. Often called a Froodle.",
             [("Size", "15 – 25 lbs"), ("Shedding", "Low"), ("Energy", "Moderate"), ("Trainability", "Good")]),
            ("🐶", "Frengle (French Bulldog + Beagle)",
             "A surprisingly athletic and curious mix. Frengles combine the Frenchie's affection with the Beagle's nose and tenacity — and tend to have a longer snout, which is better for breathing.",
             [("Size", "18 – 30 lbs"), ("Energy", "Moderate – High"), ("Snout Length", "Longer — better breathing"), ("Trainability", "Moderate")]),
        ]
    ),
    "facts": facts_panel(
        "French Bulldog",
        "America's #1 most popular breed is full of surprising history and quirky biology. Here are the most fascinating facts about the French Bulldog.",
        [
            "🏆 In 2022, the French Bulldog <strong>dethroned the Labrador Retriever as America's most popular dog</strong> — ending the Lab's extraordinary 31-year streak at #1.",
            "🇬🇧 Despite the name, French Bulldogs were actually <strong>developed in England</strong>. English lace workers created miniature Bulldogs, then brought them to France when they relocated for work. Parisians fell in love.",
            "✈️ Most airlines <strong>ban French Bulldogs from cargo holds</strong> due to their breathing issues — they can only fly in-cabin (in approved carriers) or not at all.",
            "👶 French Bulldogs <strong>cannot reproduce naturally in most cases</strong> — their puppies' large heads can't pass through the birth canal. Most litters require C-section delivery, driving up puppy prices significantly.",
            "🌡️ Frenchies are <strong>extremely heat-sensitive</strong> — they can suffer heatstroke within minutes in a hot car. Their flat faces prevent efficient panting, their primary cooling mechanism.",
            "👂 The <strong>bat ear</strong> is the breed's defining feature and was developed in Paris. The \"rose ear\" style was common in England but fell out of fashion when French breeders standardized the upright ear.",
            "🏙️ Frenchies are the <strong>ultimate city dog</strong> — minimal exercise needs, quiet demeanor, compact size, and total devotion to their owner. No wonder they're beloved in Paris, NYC, and London.",
            "🧬 The flat-face trait is caused by a <strong>single gene mutation (BMP3)</strong> that breeders have intensified since the 1800s — a reminder of how selective breeding shapes health outcomes.",
            "💎 French Bulldogs are <strong>owned by more celebrities</strong> than any other breed — Lady Gaga, The Rock, Leonardo DiCaprio, Hugh Jackman, and Reese Witherspoon are all Frenchie fans.",
        ],
        [("Koji & Gustav (Lady Gaga's Frenchies)", "Famously stolen at gunpoint in 2021 — the thief was eventually convicted and the dogs recovered"),
         ("Stella (Modern Family)", "Jay Pritchett's beloved Frenchie on the hit TV series, starring in multiple memorable episodes"),
         ("Grimm (Martha Stewart's Frenchie)", "Martha Stewart's French Bulldog became a social media star in her own right"),
         ("Gigi (The Rock's Frenchie)", "Dwayne Johnson's French Bulldog who achieved viral fame and inspired a heartfelt tribute after her passing")]
    ),
}

# ═══════════════════════════════════════════════════════════════════════════
# PROCESS FILES
# ═══════════════════════════════════════════════════════════════════════════

def process(filename, breed_key):
    path = os.path.join(BASE, filename)
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    d = data[breed_key]

    # 1. Insert tab nav + open tab-profile panel after video section
    old1 = '        </div>\n\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>'
    new1 = '        </div>\n\n' + TAB_NAV + '\n        <div class="breed-section">\n          <h2>🐾 Overview</h2>'
    assert old1 in html, f"Pattern 1 not found in {filename}"
    html = html.replace(old1, new1, 1)

    # 2. Close tab-profile + add 4 new panels before breed-main ends
    old2 = '        </div>\n\n      </div>\n\n      <aside class="breed-sidebar">'
    new2 = (
        '        </div>\n\n        </div><!-- end tab-profile -->\n\n'
        + d["diet"] + "\n"
        + d["cost"] + "\n"
        + d["mixes"] + "\n"
        + d["facts"]
        + '\n      </div>\n\n      <aside class="breed-sidebar">'
    )
    assert old2 in html, f"Pattern 2 not found in {filename}"
    html = html.replace(old2, new2, 1)

    # 3. Add tab-switching JS right after main.js script tag
    old3 = '  <script src="../js/main.js"></script>\n  <script>'
    new3 = '  <script src="../js/main.js"></script>\n' + TAB_JS + '  <script>'
    assert old3 in html, f"Pattern 3 not found in {filename}"
    html = html.replace(old3, new3, 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"✅ {filename} updated")

process("golden-retriever.html", "golden-retriever")
process("german-shepherd.html", "german-shepherd")
process("french-bulldog.html",  "french-bulldog")

print("\nBatch 1 complete: golden-retriever, german-shepherd, french-bulldog")
