// gen_guides_nutrition.js — generates 10 Nutrition guide pages
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'nutrition');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const BG = 'linear-gradient(135deg,#0f172a 0%,#1a2e1a 100%)';

function nav() {
  return `<nav class="navbar" id="navbar">
  <div class="nav-container">
    <a href="/index.html" class="nav-logo">
      <span class="logo-paw">🐾</span>
      <span class="logo-text">AllDog<span class="logo-accent">Facts</span></span>
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="/index.html">Home</a></li>
      <li><a href="/breeds/index.html">Dog Breeds</a></li>
      <li><a href="/getting-a-dog/index.html">Getting a Dog</a></li>
      <li><a href="/training/index.html">Training</a></li>
      <li><a href="/health/index.html">Health</a></li>
      <li><a href="/nutrition/index.html" style="color:var(--teal)">Nutrition</a></li>
      <li><a href="/grooming/index.html">Grooming</a></li>
    </ul>
    <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
  </div>
</nav>`;
}

function footer() {
  return `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div>
        <p>A free, in-depth encyclopedia for dog owners and lovers.</p>
      </div>
      <div class="footer-col">
        <h4>Nutrition Guides</h4>
        <ul>
          <li><a href="/nutrition/choose-dog-food.html">Choose Dog Food</a></li>
          <li><a href="/nutrition/toxic-foods.html">Toxic Foods</a></li>
          <li><a href="/nutrition/daily-feeding-guide.html">Daily Feeding</a></li>
          <li><a href="/nutrition/puppy-feeding-guide.html">Puppy Feeding</a></li>
          <li><a href="/nutrition/index.html">All Guides →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>More Topics</h4>
        <ul>
          <li><a href="/health/index.html">Dog Health</a></li>
          <li><a href="/training/index.html">Training</a></li>
          <li><a href="/grooming/index.html">Grooming</a></li>
          <li><a href="/breeds/index.html">Dog Breeds</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 AllDogFacts — The Complete Dog Encyclopedia. All rights reserved.</p>
    </div>
  </div>
</footer>`;
}

function page(cfg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${cfg.title} | AllDogFacts</title>
  <meta name="description" content="${cfg.desc}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../css/styles.css"/>
  <link rel="stylesheet" href="../css/guide-article.css"/>
</head>
<body>
${nav()}
<section class="ga-hero" style="background:${BG}">
  <div class="container">
    <div class="ga-breadcrumb"><a href="/index.html">Home</a> › <a href="/nutrition/index.html">Nutrition</a> › ${cfg.crumb}</div>
    <div class="ga-hero-tag">${cfg.tag}</div>
    <h1>${cfg.h1}</h1>
    <p class="ga-hero-desc">${cfg.desc}</p>
    <div class="ga-meta">${cfg.meta}</div>
  </div>
</section>
<div class="ga-wrap">
  <div class="ga-layout">
    <main class="ga-main">
      ${cfg.body}
    </main>
    <aside class="ga-sidebar">
      <div class="ga-scard">
        <h3>On This Page</h3>
        <ul class="toc-list">${cfg.toc}</ul>
      </div>
      <div class="ga-scard">
        <h3>Related Guides</h3>
        <ul class="ga-related-list">${cfg.related}</ul>
      </div>
    </aside>
  </div>
</div>
${footer()}
<script src="../js/main.js"></script>
</body>
</html>`;
}

const GUIDES = [

// ─── 1. CHOOSE DOG FOOD ────────────────────────────────────────────────────
{
  file: 'choose-dog-food.html',
  title: 'How to Choose the Best Dog Food',
  crumb: 'How to Choose Dog Food',
  tag: '🍽️ Nutrition Basics',
  h1: 'How to Choose the Best Dog Food',
  desc: 'AAFCO labels, ingredient lists, life stage formulas, and the wet vs. dry vs. raw debate — a practical guide to picking the right food for your dog.',
  meta: '⏱ 10 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#labels">Reading the Label</a></li>
        <li><a href="#lifestage">Life Stage Matters</a></li>
        <li><a href="#formats">Dry vs. Wet vs. Raw</a></li>
        <li><a href="#ingredients">Ingredient Red Flags</a></li>
        <li><a href="#budget">Budget vs. Premium</a></li>`,
  related: `<li><a href="daily-feeding-guide.html">Daily Feeding Guide</a></li>
            <li><a href="toxic-foods.html">Toxic Foods</a></li>
            <li><a href="switch-dog-food.html">How to Switch Foods</a></li>`,
  body: `
<p class="ga-lede">Walk into any pet store and you'll face an entire wall of dog food — boutique, grain-free, raw-inspired, breed-specific, freeze-dried, limited ingredient. Most of it is marketing. Here's how to cut through the noise and pick food your dog will thrive on.</p>

<h2 id="labels">Reading the AAFCO Label</h2>
<p>The single most important thing on any dog food bag is the AAFCO nutritional adequacy statement. Look for: <em>"formulated to meet the nutritional levels established by AAFCO Dog Food Nutrient Profiles for [life stage]."</em> If it doesn't say this, the food isn't complete and balanced.</p>
<p>The statement must also specify the life stage: "puppy," "adult maintenance," "all life stages," or "senior." "All life stages" meets the higher puppy standard and is safe for adults too.</p>
<div class="key-box"><strong>Tip:</strong> "Feeding trials" on the label means the food was actually fed to dogs and tested — a higher bar than "formulated to meet." Both are acceptable; feeding-trial tested is slightly preferred.</div>

<h2 id="lifestage">Life Stage Formulas</h2>
<table class="ga-table">
  <thead><tr><th>Life Stage</th><th>Key Needs</th><th>Look For</th></tr></thead>
  <tbody>
    <tr><td>Puppy (under 12 months)</td><td>Higher protein, calcium, DHA for brain</td><td>"Puppy" or "All Life Stages" AAFCO statement</td></tr>
    <tr><td>Adult (1–7 years)</td><td>Maintenance energy, joint support</td><td>"Adult Maintenance" AAFCO statement</td></tr>
    <tr><td>Large Breed Puppy</td><td>Controlled calcium/phosphorus to slow bone growth</td><td>"Large Breed Puppy" specific formula</td></tr>
    <tr><td>Senior (7+ years)</td><td>Lower calories, higher fiber, joint nutrients</td><td>Lower fat, added glucosamine</td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>Important:</strong> Don't feed a puppy adult food — especially large breed puppies. Too much calcium causes developmental bone problems. Feed a large-breed puppy formula until 12–18 months.</div>

<h2 id="formats">Dry vs. Wet vs. Raw</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Dry Kibble</strong><p>Most convenient and affordable. Good for dental health (slightly). Calorie-dense — easy to overfeed. Best when stored in airtight container.</p></div>
  <div class="ga-hl-card"><strong>Wet/Canned</strong><p>Higher moisture (great for hydration), more palateable. Higher cost per calorie. Requires refrigeration after opening. Good for picky eaters or senior dogs with dental issues.</p></div>
  <div class="ga-hl-card"><strong>Raw (BARF)</strong><p>Possible benefits for coat and digestion, but significant risks: Salmonella contamination, nutritional imbalance, bone injuries. Requires careful sourcing and knowledge. Not recommended without vet guidance.</p></div>
  <div class="ga-hl-card"><strong>Freeze-Dried / Dehydrated</strong><p>Minimally processed, long shelf life. Often used as a topper to enhance kibble. Expensive as a sole diet. Check AAFCO statement before using as primary food.</p></div>
</div>

<h2 id="ingredients">Ingredient List Red Flags</h2>
<p>Ingredients are listed by weight before processing. A named meat source (chicken, beef, salmon) should appear first. Be cautious of:</p>
<ul>
  <li><strong>Corn syrup or added sugars</strong> — unnecessary and can contribute to obesity</li>
  <li><strong>Generic "animal fat" or "meat meal"</strong> without a named species — lower quality protein</li>
  <li><strong>Artificial colors (Red 40, Yellow 5)</strong> — no nutritional value, added for human appeal</li>
  <li><strong>BHA, BHT, Ethoxyquin</strong> — synthetic preservatives; natural alternatives (tocopherols) are preferable</li>
  <li><strong>Propylene glycol</strong> — used in some semi-moist foods; toxic to cats and potentially harmful to dogs</li>
</ul>
<div class="tip-box"><strong>Grain-free myth:</strong> Despite the marketing, grain-free diets are not inherently healthier. The FDA investigated a potential link between grain-free diets and dilated cardiomyopathy (DCM) in dogs. Unless your dog has a diagnosed grain allergy (rare), whole grains like brown rice and oatmeal are beneficial, not harmful.</div>

<h2 id="budget">Budget vs. Premium Foods</h2>
<p>You don't need to spend $90/bag. Many mid-range foods ($40–$60 for a 30 lb bag) from established brands like Purina Pro Plan, Royal Canin, and Hill's Science Diet have decades of feeding research behind them and meet or exceed AAFCO standards. These brands employ veterinary nutritionists and run long-term feeding studies — something most boutique brands don't do.</p>
<p>If budget is a concern, Purina Dog Chow and Pedigree are AAFCO complete and far better than feeding inappropriate homemade diets. What matters most is that the food is nutritionally complete and your dog maintains a healthy weight and coat.</p>
`
},

// ─── 2. TOXIC FOODS ────────────────────────────────────────────────────────
{
  file: 'toxic-foods.html',
  title: 'Foods Toxic to Dogs — Complete List',
  crumb: 'Toxic Foods',
  tag: '⚠️ Safety',
  h1: 'Foods Toxic to Dogs — Complete List',
  desc: 'Grapes, xylitol, chocolate, onions, and more — a complete, vet-verified list of foods that are dangerous or deadly to dogs, with symptoms and what to do.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#deadly">Immediately Deadly</a></li>
        <li><a href="#harmful">Harmful in Quantity</a></li>
        <li><a href="#symptoms">Poisoning Symptoms</a></li>
        <li><a href="#ifyoueat">What to Do</a></li>
        <li><a href="#safe">Safe Human Foods</a></li>`,
  related: `<li><a href="safe-human-foods.html">Safe Human Foods</a></li>
            <li><a href="choose-dog-food.html">Choose Dog Food</a></li>
            <li><a href="/health/is-my-dog-sick.html">Is My Dog Sick?</a></li>`,
  body: `
<p class="ga-lede">Many common human foods are toxic to dogs — some cause kidney failure within 24 hours, others can kill a small dog with a single piece of gum. Memorize this list. Post it on your fridge.</p>

<h2 id="deadly">Immediately Dangerous — Never Feed These</h2>
<table class="ga-table">
  <thead><tr><th>Food</th><th>Toxic Compound</th><th>Risk</th></tr></thead>
  <tbody>
    <tr><td>Grapes & Raisins</td><td>Unknown (tartaric acid suspected)</td><td>Acute kidney failure — even tiny amounts can be fatal</td></tr>
    <tr><td>Xylitol (sugar-free gum, peanut butter, candy)</td><td>Xylitol</td><td>Severe hypoglycemia and liver failure — very fast acting</td></tr>
    <tr><td>Chocolate</td><td>Theobromine, caffeine</td><td>Seizures, heart arrhythmia, death — dark chocolate is most dangerous</td></tr>
    <tr><td>Macadamia Nuts</td><td>Unknown</td><td>Weakness, hyperthermia, vomiting, tremors</td></tr>
    <tr><td>Onions, Garlic, Leeks, Chives</td><td>N-propyl disulfide</td><td>Destroys red blood cells → anemia; garlic is 5x more toxic than onion</td></tr>
    <tr><td>Alcohol</td><td>Ethanol</td><td>Liver and brain damage; much lower tolerance than humans</td></tr>
    <tr><td>Coffee, Tea, Energy Drinks</td><td>Caffeine</td><td>Restlessness, tremors, rapid heart rate, collapse</td></tr>
    <tr><td>Raw yeast dough</td><td>Ethanol (from fermentation)</td><td>Bloat, alcohol poisoning; dough expands in stomach</td></tr>
    <tr><td>Nutmeg</td><td>Myristicin</td><td>Hallucinations, high heart rate, seizures</td></tr>
    <tr><td>Avocado (fruit & pit)</td><td>Persin</td><td>Vomiting, diarrhea, heart failure in large quantities; pit is a choking hazard</td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>Xylitol is hidden in many products:</strong> sugar-free peanut butter (check before giving as a treat!), chewing gum, mouthwash, vitamins, baked goods, yogurt, and some medications. Always check labels.</div>

<h2 id="harmful">Harmful in Larger Quantities</h2>
<ul>
  <li><strong>Cooked bones</strong> — splinter and perforate intestines; raw bones are generally safer but still carry risk</li>
  <li><strong>Salt / salty snacks</strong> — excessive salt causes sodium ion poisoning: vomiting, diarrhea, tremors, seizures</li>
  <li><strong>Dairy</strong> — most dogs are lactose intolerant; causes gas, diarrhea; small amounts of plain cheese are usually tolerated</li>
  <li><strong>Cherries, peaches, plums</strong> — pits contain cyanide; fruit flesh is not toxic but pits are dangerous</li>
  <li><strong>Raw potatoes</strong> — contain solanine; cooked plain potatoes are fine in small amounts</li>
  <li><strong>Tomato leaves and stems</strong> — contain solanine; ripe tomato fruit is generally safe in small amounts</li>
  <li><strong>Corn on the cob</strong> — not toxic, but the cob is a common intestinal obstruction cause</li>
  <li><strong>Nutmeg</strong> — toxic in any quantity</li>
</ul>

<h2 id="symptoms">Signs of Poisoning</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Mild</strong><p>Vomiting, diarrhea, drooling, lethargy, loss of appetite</p></div>
  <div class="ga-hl-card"><strong>Moderate</strong><p>Trembling, weakness, pale gums, abdominal pain, rapid breathing</p></div>
  <div class="ga-hl-card"><strong>Severe</strong><p>Seizures, collapse, unconsciousness, bloody stool, jaundice</p></div>
</div>

<h2 id="ifyoueat">What to Do If Your Dog Ate Something Toxic</h2>
<ol class="step-list">
  <li>Don't panic — assess how much was eaten and when</li>
  <li>Call your vet or <strong>ASPCA Poison Control: (888) 426-4435</strong> immediately (24/7, small fee)</li>
  <li>Note the exact food, estimated amount, and your dog's weight — the vet will need this</li>
  <li>Do NOT induce vomiting unless specifically instructed — for some toxins it makes things worse</li>
  <li>Bring the food packaging to the emergency vet if going in</li>
</ol>
<div class="tip-box"><strong>Prevention:</strong> Keep trash cans locked or inside a cabinet. Use baby locks on low cabinets. Educate every household member and guests — especially around holidays when dangerous foods are everywhere.</div>

<h2 id="safe">Quick Reference — Safe Human Foods</h2>
<p>Many human foods are perfectly safe for dogs in moderation. See our full guide: <a href="safe-human-foods.html">Safe Human Foods for Dogs →</a></p>
<p>Quick safe list: plain cooked chicken or turkey, cooked eggs, carrots, blueberries, watermelon (no seeds/rind), plain cooked rice, pumpkin, cucumber, sweet potato (cooked), plain oatmeal, green beans, peas.</p>
`
},

// ─── 3. DAILY FEEDING GUIDE ────────────────────────────────────────────────
{
  file: 'daily-feeding-guide.html',
  title: 'Dog Daily Feeding Guide — How Much to Feed',
  crumb: 'Daily Feeding Guide',
  tag: '🍽️ Nutrition Basics',
  h1: 'How Much to Feed Your Dog — Daily Feeding Guide',
  desc: 'Feeding amounts by weight, age, and activity level. Includes free-feeding vs. scheduled meals, how to measure properly, and signs you\'re over or under feeding.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#amounts">How Much Per Day</a></li>
        <li><a href="#meals">Meals vs. Free Feeding</a></li>
        <li><a href="#measuring">Measuring Correctly</a></li>
        <li><a href="#signs">Over vs. Under Feeding</a></li>
        <li><a href="#treats">Counting Treats</a></li>`,
  related: `<li><a href="choose-dog-food.html">Choose Dog Food</a></li>
            <li><a href="dog-overweight.html">Is My Dog Overweight?</a></li>
            <li><a href="puppy-feeding-guide.html">Puppy Feeding Guide</a></li>`,
  body: `
<p class="ga-lede">The number-one cause of obesity in dogs is simply eating too much. Most owners are overfeeding by 20–30% — often unintentionally. This guide gives you the real numbers for your dog's size and age.</p>

<h2 id="amounts">Daily Feeding Amounts by Weight</h2>
<p>These are general guidelines for adult dogs eating standard-quality dry kibble (~350–400 kcal/cup). Always check the specific calorie count on your food's bag.</p>
<table class="ga-table">
  <thead><tr><th>Dog Weight</th><th>Cups per Day (sedentary)</th><th>Cups per Day (active)</th></tr></thead>
  <tbody>
    <tr><td>5–10 lbs (toy breeds)</td><td>¼ – ½ cup</td><td>½ – ¾ cup</td></tr>
    <tr><td>10–20 lbs (small breeds)</td><td>¾ – 1 cup</td><td>1 – 1⅓ cups</td></tr>
    <tr><td>20–40 lbs (medium breeds)</td><td>1½ – 2 cups</td><td>2 – 2½ cups</td></tr>
    <tr><td>40–60 lbs (medium-large)</td><td>2 – 2½ cups</td><td>2½ – 3 cups</td></tr>
    <tr><td>60–80 lbs (large breeds)</td><td>2½ – 3 cups</td><td>3 – 3½ cups</td></tr>
    <tr><td>80–100 lbs (giant breeds)</td><td>3 – 4 cups</td><td>4 – 4½ cups</td></tr>
    <tr><td>100+ lbs</td><td>4 – 5 cups</td><td>5 – 6 cups</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Use the bag as a starting point, not a rule:</strong> Bag guidelines are often generous (companies want you to buy more food). Start at the low end and monitor your dog's weight monthly. Adjust by ¼ cup increments.</div>

<h2 id="meals">Meals vs. Free Feeding</h2>
<p><strong>Scheduled meals</strong> (2x/day for adults, 3x/day for puppies) are strongly preferred by vets. Benefits: helps with weight control, lets you notice appetite changes (an early illness sign), and reduces bloat risk in large breeds. Feed at consistent times each day.</p>
<p><strong>Free feeding</strong> (food available all day) works for some dogs who self-regulate, but most dogs will overeat. It also makes it impossible to track intake or notice when a dog stops eating. Not recommended for multi-dog households.</p>
<div class="key-box"><strong>Large breed tip:</strong> For dogs over 40 lbs, split daily food into 2 meals instead of 1 large meal. Single large meals increase the risk of bloat (GDV), a potentially fatal condition where the stomach twists.</div>

<h2 id="measuring">Measuring Correctly</h2>
<p>Most "scoops" are not standard measuring cups. Always use a proper dry measuring cup or kitchen scale. Weigh your dog monthly and adjust portions accordingly.</p>
<ol class="step-list">
  <li>Check the calorie density on your food's bag (kcal/cup or kcal/kg)</li>
  <li>Calculate your dog's Resting Energy Requirement (RER): RER = 70 × (body weight in kg)^0.75</li>
  <li>Multiply by 1.6 for sedentary adults, 2.0 for active adults, 1.2 for obese-prone dogs</li>
  <li>Divide total kcal needed by kcal/cup to get daily cup amount</li>
  <li>Split into 2 meals; weigh dog monthly and adjust by ¼ cup if needed</li>
</ol>
<p>If math isn't your thing: use an online dog calorie calculator (many vet school websites offer free ones), then work backward to cups.</p>

<h2 id="signs">Signs You're Over or Under Feeding</h2>
<table class="ga-table">
  <thead><tr><th>Check</th><th>Ideal</th><th>Overweight Sign</th><th>Underweight Sign</th></tr></thead>
  <tbody>
    <tr><td>Ribs</td><td>Felt easily, not visible</td><td>Hard to feel under fat layer</td><td>Visible from a distance</td></tr>
    <tr><td>Waist</td><td>Visible tuck behind ribs from above</td><td>No waist — looks like sausage</td><td>Extreme hourglass</td></tr>
    <tr><td>Spine</td><td>Felt but not prominent</td><td>Buried under fat</td><td>Visible bumps from a distance</td></tr>
    <tr><td>Energy</td><td>Playful, engaged</td><td>Reluctant to exercise, tired</td><td>Low energy, dull coat</td></tr>
  </tbody>
</table>

<h2 id="treats">Counting Treats in the Total</h2>
<p>Treats should account for no more than 10% of daily caloric intake. Most treats run 3–10 kcal each. If you give 10 treats a day (50–100 kcal), that's enough to cause 1 lb of weight gain per month in a small dog.</p>
<p>Training-heavy days? Use kibble from the daily ration as treats. Use low-calorie treats: baby carrots, cucumber slices, blueberries. They work just as well as commercial treats for training.</p>
`
},

// ─── 4. PUPPY FEEDING GUIDE ────────────────────────────────────────────────
{
  file: 'puppy-feeding-guide.html',
  title: 'Puppy Feeding Guide — Schedules, Amounts & Transitions',
  crumb: 'Puppy Feeding Guide',
  tag: '🐶 Puppy Nutrition',
  h1: 'Puppy Feeding Guide — Schedules, Amounts & Transitions',
  desc: 'How much to feed a puppy by age, 3x vs. 2x daily schedules, when to transition to adult food, and what to do if your puppy won\'t eat.',
  meta: '⏱ 9 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#schedule">Feeding Schedule by Age</a></li>
        <li><a href="#amounts">How Much to Feed</a></li>
        <li><a href="#transition">Adult Food Transition</a></li>
        <li><a href="#woneat">Puppy Won't Eat</a></li>
        <li><a href="#avoid">What to Avoid</a></li>`,
  related: `<li><a href="daily-feeding-guide.html">Adult Feeding Guide</a></li>
            <li><a href="choose-dog-food.html">Choose Dog Food</a></li>
            <li><a href="/getting-a-dog/new-puppy-checklist.html">New Puppy Checklist</a></li>`,
  body: `
<p class="ga-lede">Puppies have very different nutritional needs from adult dogs — they need more protein, more fat, more calcium, and more frequent meals. Get this right during the first year and you set them up for a lifetime of good health.</p>

<h2 id="schedule">Feeding Schedule by Age</h2>
<table class="ga-table">
  <thead><tr><th>Age</th><th>Meals Per Day</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>8–12 weeks</td><td>4 meals/day</td><td>Tiny stomach, needs frequent feeding; watch for hypoglycemia in toy breeds</td></tr>
    <tr><td>3–6 months</td><td>3 meals/day</td><td>Drop to 3 meals; keep on puppy formula</td></tr>
    <tr><td>6–12 months</td><td>2–3 meals/day</td><td>Can shift to 2 meals; most small breeds switch to adult food at 9–12 months</td></tr>
    <tr><td>12–18 months</td><td>2 meals/day</td><td>Transition to adult food for most breeds; large/giant breeds wait until 18–24 months</td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>Toy breed alert:</strong> Puppies under 5 lbs (Chihuahuas, Yorkies, Pomeranians) can develop hypoglycemia (dangerously low blood sugar) if they skip meals. Feed 4 times a day until 6 months and monitor for wobbling, glassy eyes, or seizures.</div>

<h2 id="amounts">How Much to Feed</h2>
<p>Puppy food bags typically have a chart on the back based on expected adult weight. Use the <em>expected adult weight</em> column, not current puppy weight. If your puppy is a mixed breed, estimate based on similar breeds.</p>
<p>A rough guide for puppies eating quality puppy kibble (~400 kcal/cup):</p>
<table class="ga-table">
  <thead><tr><th>Expected Adult Weight</th><th>8–12 weeks (daily)</th><th>3–6 months (daily)</th><th>6–12 months (daily)</th></tr></thead>
  <tbody>
    <tr><td>Under 10 lbs</td><td>¼ – ½ cup</td><td>¼ – ½ cup</td><td>⅓ – ½ cup</td></tr>
    <tr><td>10–25 lbs</td><td>½ – 1 cup</td><td>¾ – 1¼ cups</td><td>¾ – 1¼ cups</td></tr>
    <tr><td>25–50 lbs</td><td>¾ – 1½ cups</td><td>1½ – 2½ cups</td><td>1½ – 3 cups</td></tr>
    <tr><td>50–75 lbs</td><td>1½ – 2 cups</td><td>2 – 3 cups</td><td>2½ – 3½ cups</td></tr>
    <tr><td>75–100 lbs</td><td>2 – 3 cups</td><td>3 – 4 cups</td><td>3½ – 5 cups</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Adjust based on body condition:</strong> Puppies should be a bit lean (ribs slightly palpable) — not chubby. Overfeeding large-breed puppies causes rapid bone growth that leads to joint problems. Leaner is genuinely better during the growth phase.</div>

<h2 id="transition">Transitioning to Adult Food</h2>
<p>Switching too early or too abruptly can cause digestive upset and nutritional gaps. Here's how to do it right:</p>
<ol class="step-list">
  <li>Confirm your dog is ready — small breeds at 9–12 months, medium at 12 months, large at 12–18 months, giant at 18–24 months</li>
  <li>Mix 75% puppy food + 25% adult food for days 1–3</li>
  <li>Mix 50% puppy + 50% adult for days 4–6</li>
  <li>Mix 25% puppy + 75% adult for days 7–9</li>
  <li>100% adult food from day 10 onward</li>
</ol>
<p>Watch for soft stools or vomiting during the transition — a sign of moving too fast. Slow down if this happens.</p>

<h2 id="woneat">My Puppy Won't Eat — What to Do</h2>
<p>A puppy skipping a meal in the first few days home is very common — new environment stress. If it continues beyond 48 hours:</p>
<ul>
  <li>Offer the same food at regular times; don't rotate through foods — this creates picky eaters</li>
  <li>Add a tablespoon of warm water or low-sodium chicken broth to increase palatability</li>
  <li>Make sure the food hasn't gone stale (store opened bags in airtight container, use within 6 weeks)</li>
  <li>Check for mouth pain — puppies teething may find eating uncomfortable</li>
  <li>If no food for 24 hours (toy breeds) or 48 hours (other breeds), call the vet</li>
</ul>

<h2 id="avoid">What Not to Feed Puppies</h2>
<ul>
  <li><strong>Adult dog food</strong> — doesn't meet puppy calcium and protein requirements</li>
  <li><strong>Homemade diets without vet guidance</strong> — very difficult to balance; common to create deficiencies</li>
  <li><strong>Rawhides</strong> — choking hazard and potential Salmonella; use safer alternatives like bully sticks (supervised)</li>
  <li><strong>Raw diets</strong> — immune systems are still developing; high risk of bacterial infection</li>
  <li><strong>Table scraps</strong> — establishes begging behavior and can cause vomiting and pancreatitis</li>
</ul>
`
},

// ─── 5. DOG OVERWEIGHT ─────────────────────────────────────────────────────
{
  file: 'dog-overweight.html',
  title: 'Is My Dog Overweight? How to Help Them Lose Weight Safely',
  crumb: 'Dog Overweight',
  tag: '⚖️ Weight Management',
  h1: 'Is My Dog Overweight? A Guide to Safe Weight Loss',
  desc: 'Body condition scoring, safe calorie reduction, the best exercise plan for overweight dogs, and foods to avoid. Help your dog lose weight without making them miserable.',
  meta: '⏱ 9 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#bcs">Body Condition Score</a></li>
        <li><a href="#causes">Why Dogs Get Overweight</a></li>
        <li><a href="#loseweight">How to Help Them Lose Weight</a></li>
        <li><a href="#exercise">Safe Exercise Plan</a></li>
        <li><a href="#timeline">Realistic Timeline</a></li>`,
  related: `<li><a href="daily-feeding-guide.html">Daily Feeding Guide</a></li>
            <li><a href="choose-dog-food.html">Choose Dog Food</a></li>
            <li><a href="/health/healthy-weight.html">Healthy Weight Health Guide</a></li>`,
  body: `
<p class="ga-lede">Over 60% of dogs in the US are overweight or obese. It shortens their life by up to 2 years, worsens joint pain, increases cancer risk, and makes breathing harder. The good news: modest weight loss makes a dramatic difference fast.</p>

<h2 id="bcs">Body Condition Score — Is Your Dog Overweight?</h2>
<p>Vets use a 1–9 scale (or 1–5) called Body Condition Score (BCS). The goal is 4–5 out of 9. You don't need a scale to assess this — feel and look.</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Too Thin (BCS 1–3)</strong><p>Ribs, spine, and hip bones clearly visible. No fat cover. Waist and tuck extremely pronounced.</p></div>
  <div class="ga-hl-card"><strong>Ideal (BCS 4–5)</strong><p>Ribs easily felt with light pressure but not visible. Clear waist tuck from above and behind. Minimal fat cover.</p></div>
  <div class="ga-hl-card"><strong>Overweight (BCS 6–7)</strong><p>Ribs hard to feel under fat. Waist barely visible. Abdomen rounding. Dog looks "wide" from above.</p></div>
  <div class="ga-hl-card"><strong>Obese (BCS 8–9)</strong><p>Ribs not palpable under heavy fat. No waist. Abdomen distended. Neck thick. Difficulty breathing on walks.</p></div>
</div>
<div class="tip-box"><strong>Vet check first:</strong> Before starting any weight loss program, rule out underlying causes like hypothyroidism or Cushing's disease, which cause weight gain independently. A simple blood test can confirm or rule these out.</div>

<h2 id="causes">Why Dogs Get Overweight</h2>
<ul>
  <li><strong>Overfeeding</strong> — the most common cause; even 10% too much food daily causes gradual weight gain</li>
  <li><strong>Too many treats</strong> — especially during training; treats add up fast</li>
  <li><strong>Table scraps</strong> — high in fat, calorie-dense, and habituating</li>
  <li><strong>Not enough exercise</strong> — especially after puppyhood energy decreases</li>
  <li><strong>Spaying/neutering</strong> — reduces metabolic rate by ~20–30%; adjust calories accordingly after the procedure</li>
  <li><strong>Age</strong> — senior dogs burn fewer calories and lose muscle; they need fewer total calories but the same protein</li>
  <li><strong>Breed predisposition</strong> — Labradors, Beagles, Dachshunds, Cocker Spaniels, and Basset Hounds are genetically prone to obesity</li>
</ul>

<h2 id="loseweight">How to Help Your Dog Lose Weight</h2>
<ol class="step-list">
  <li><strong>Get a vet weigh-in</strong> — establish a baseline and rule out medical causes</li>
  <li><strong>Calculate target calories</strong> — feed based on target weight, not current weight (reduces intake 20–25%)</li>
  <li><strong>Eliminate all table scraps</strong> — one cheese slice for a 20 lb dog equals about a full hamburger for a human</li>
  <li><strong>Switch to a weight-management food</strong> — higher fiber, lower fat; keeps dog feeling full with fewer calories</li>
  <li><strong>Measure every meal</strong> — use a kitchen scale, not a cup; kibble density varies by brand</li>
  <li><strong>Switch treats to vegetables</strong> — carrots, green beans, cucumber, broccoli florets are very low calorie and most dogs love them</li>
  <li><strong>Weigh monthly, adjust accordingly</strong> — target 1–2% body weight loss per month</li>
</ol>
<div class="warning-box"><strong>Don't crash diet your dog:</strong> Cutting calories by more than 25% too quickly causes muscle loss and hunger-driven behavior problems. Slow and steady wins — 1–2% body weight per month is the veterinary recommendation.</div>

<h2 id="exercise">Safe Exercise for Overweight Dogs</h2>
<p>Start low and go slow. Overweight dogs have extra stress on joints and cardiovascular system. Rapid exercise increases injury risk.</p>
<table class="ga-table">
  <thead><tr><th>Week</th><th>Activity</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>1–2</td><td>Gentle flat walks at comfortable pace</td><td>10–15 min, twice daily</td></tr>
    <tr><td>3–4</td><td>Slightly longer walks; add gentle hills if tolerated</td><td>15–20 min, twice daily</td></tr>
    <tr><td>5–8</td><td>Brisk walks; optional gentle swimming (excellent low-impact)</td><td>20–30 min, twice daily</td></tr>
    <tr><td>8+</td><td>Maintain active lifestyle; add play sessions</td><td>30+ min, twice daily</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Swimming is ideal:</strong> For overweight dogs or those with joint pain, water supports body weight while providing full-body exercise. Find a dog-friendly pool or lake for off-leash swimming.</div>

<h2 id="timeline">Realistic Weight Loss Timeline</h2>
<p>A dog that needs to lose 10 lbs should take 5–10 months. That sounds slow, but rushing causes muscle loss and failure to maintain the loss. Dogs who lose weight gradually and through lifestyle change (not starvation) keep it off. Celebrate each monthly weigh-in — even half a pound loss is progress worth reinforcing.</p>
`
},

// ─── 6. BEST DOG TREATS ────────────────────────────────────────────────────
{
  file: 'best-dog-treats.html',
  title: 'Best Dog Treats — Healthy Choices for Training and Rewards',
  crumb: 'Best Dog Treats',
  tag: '🦴 Treats',
  h1: 'Best Dog Treats — Healthy Options for Training & Rewards',
  desc: 'What to look for in a treat, which ingredients to avoid, the best low-calorie options for training, and healthy homemade alternatives to commercial treats.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#what">What Makes a Good Treat</a></li>
        <li><a href="#types">Types of Treats</a></li>
        <li><a href="#training">Training Treats</a></li>
        <li><a href="#avoid">Treats to Avoid</a></li>
        <li><a href="#homemade">Healthy Homemade Options</a></li>`,
  related: `<li><a href="safe-human-foods.html">Safe Human Foods</a></li>
            <li><a href="dog-overweight.html">Is My Dog Overweight?</a></li>
            <li><a href="/training/sit-stay-come.html">Basic Commands</a></li>`,
  body: `
<p class="ga-lede">Treats are one of the most powerful tools in dog training — and one of the sneakiest causes of weight gain. Here's how to choose treats your dog will go crazy for without blowing their diet.</p>

<h2 id="what">What Makes a Good Treat</h2>
<ul>
  <li><strong>Single or few ingredients</strong> — the shorter the list, the better</li>
  <li><strong>Named protein source first</strong> — "chicken," not "meat by-products"</li>
  <li><strong>Low calorie density</strong> — especially for training use (you'll give many)</li>
  <li><strong>Appropriate size</strong> — pea-sized for training; larger for slow chewing</li>
  <li><strong>Soft texture for training</strong> — dogs can eat soft treats quickly and stay engaged; crunchy treats slow training sessions</li>
</ul>
<div class="tip-box"><strong>The 10% rule:</strong> Treats should be no more than 10% of total daily calories. For a 30 lb dog eating 800 kcal/day, that's 80 kcal in treats — about 8–16 small training treats, or 1–2 larger bully sticks.</div>

<h2 id="types">Types of Dog Treats</h2>
<table class="ga-table">
  <thead><tr><th>Type</th><th>Best For</th><th>Watch Out For</th></tr></thead>
  <tbody>
    <tr><td>Soft training treats (Zuke's, Cloud Star)</td><td>High-reward training sessions</td><td>Can be high sodium; check labels</td></tr>
    <tr><td>Freeze-dried meat (liver, chicken)</td><td>High-value rewards for difficult tasks</td><td>Very calorie-dense — use sparingly</td></tr>
    <tr><td>Dental chews (Greenies, OraVet)</td><td>Dental health + chewing satisfaction</td><td>High calorie; count as a meal replacement</td></tr>
    <tr><td>Bully sticks</td><td>Long chew sessions, boredom prevention</td><td>400–800 kcal each; give max 1–2 per week</td></tr>
    <tr><td>Vegetable treats (carrots, cucumber)</td><td>Low-calorie rewards, dental crunch</td><td>None significant; very low risk</td></tr>
    <tr><td>Commercial biscuits (Milk-Bone)</td><td>Occasional reward</td><td>Often high in salt, sugar, artificial colors</td></tr>
  </tbody>
</table>

<h2 id="training">Best Treats for Training</h2>
<p>Training treats need to be: tiny (pea-sized), instantly swallowable (no chewing), and highly motivating. The ideal training treat is whatever your dog goes most crazy for — don't be too healthy if your dog isn't motivated. High-value = better focus = faster learning.</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Low Value</strong><p>Kibble, plain cheerios. Use for easy behaviors your dog already knows.</p></div>
  <div class="ga-hl-card"><strong>Medium Value</strong><p>Commercial soft treats, cheese cubes. Use for new commands and distractions.</p></div>
  <div class="ga-hl-card"><strong>High Value</strong><p>Freeze-dried liver, real chicken, hot dog slices. Use for recall, reactive dog work, difficult environments.</p></div>
</div>

<h2 id="avoid">Treats to Avoid</h2>
<ul>
  <li><strong>Rawhide</strong> — choking hazard, contamination risk, digestive blockages; use safer alternatives</li>
  <li><strong>Treats made in China</strong> — multiple recalls related to kidney failure; check country of manufacture</li>
  <li><strong>Jerky treats</strong> — soft jerky has been linked to kidney disease; stick to freeze-dried or air-dried</li>
  <li><strong>Treats with xylitol</strong> — check "sugar-free" items; xylitol is toxic even in tiny amounts</li>
  <li><strong>Cooked bones (chicken, pork, beef)</strong> — splinter and perforate intestines; dangerous regardless of how they're marketed</li>
</ul>

<h2 id="homemade">Healthy Homemade Treat Options</h2>
<p>These require zero preparation and are some of the best treats you can give:</p>
<ul>
  <li><strong>Baby carrots</strong> — 4 kcal each, satisfying crunch, great for dental health</li>
  <li><strong>Cucumber slices</strong> — almost zero calories, refreshing, dogs love them</li>
  <li><strong>Blueberries</strong> — antioxidant-rich, tiny, perfect training treats</li>
  <li><strong>Plain cooked chicken breast</strong> — cut into pea-sized pieces, frozen, and stored in fridge; the ultimate high-value training treat</li>
  <li><strong>Watermelon chunks (seedless, no rind)</strong> — hydrating, very low calorie, great in summer</li>
  <li><strong>Banana slices</strong> — higher in sugar than other options; give in moderation</li>
</ul>
`
},

// ─── 7. DOG SUPPLEMENTS ────────────────────────────────────────────────────
{
  file: 'dog-supplements.html',
  title: 'Dog Supplements — What Works and What\'s a Waste of Money',
  crumb: 'Dog Supplements',
  tag: '🧪 Supplements',
  h1: 'Dog Supplements — What Works and What\'s a Waste of Money',
  desc: 'Fish oil, joint supplements, probiotics, and vitamins — the evidence behind popular dog supplements, which ones vets actually recommend, and what to avoid.',
  meta: '⏱ 9 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#needed">Do Dogs Need Supplements?</a></li>
        <li><a href="#joint">Joint Supplements</a></li>
        <li><a href="#omega">Fish Oil & Omega-3s</a></li>
        <li><a href="#probiotic">Probiotics</a></li>
        <li><a href="#avoid">Skip These</a></li>`,
  related: `<li><a href="choose-dog-food.html">Choose Dog Food</a></li>
            <li><a href="/health/dog-arthritis.html">Arthritis in Senior Dogs</a></li>
            <li><a href="dog-overweight.html">Weight Management</a></li>`,
  body: `
<p class="ga-lede">The pet supplement industry is worth billions — and most of it is poorly regulated. Unlike human medications, pet supplements don't require FDA approval before going to market. Here's what the evidence actually shows.</p>

<h2 id="needed">Do Dogs on Commercial Food Need Supplements?</h2>
<p>If your dog eats an AAFCO-complete commercial food: <strong>usually no</strong>. Quality dog food is formulated to meet all nutritional requirements. Adding a multivitamin to a complete diet can actually cause imbalances — fat-soluble vitamins (A, D, E, K) accumulate and become toxic in excess.</p>
<p>Supplements are most warranted when: feeding a homemade diet, managing a specific health condition, senior dogs with age-related needs, or on vet recommendation after bloodwork shows a deficiency.</p>
<div class="warning-box"><strong>Always tell your vet what supplements you're giving:</strong> Many supplements interact with medications. Fish oil, for example, is a blood thinner and should be stopped before any surgery.</div>

<h2 id="joint">Joint Supplements — Glucosamine & Chondroitin</h2>
<p>The most evidence-backed supplements for dogs. Most useful for: dogs with arthritis, large and giant breeds over 5 years, dogs recovering from orthopedic surgery, and as preventive for high-risk breeds (Labs, German Shepherds, Golden Retrievers).</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Glucosamine</strong><p>Building block for cartilage. Some studies show modest improvement in mobility. Effect takes 4–8 weeks to appear. Look for 500–1000 mg/day for medium-large dogs.</p></div>
  <div class="ga-hl-card"><strong>Chondroitin</strong><p>Helps retain water in cartilage, reducing friction. Most effective when combined with glucosamine. Look for NASC-seal products for quality assurance.</p></div>
  <div class="ga-hl-card"><strong>MSM</strong><p>Anti-inflammatory; often combined with glucosamine/chondroitin. Limited standalone evidence, but part of most quality joint supplements.</p></div>
  <div class="ga-hl-card"><strong>Green-lipped mussel</strong><p>Strong evidence base. Anti-inflammatory fatty acids (ETA) that rival some NSAIDs in studies. Good option for dogs who can't tolerate medications.</p></div>
</div>
<div class="tip-box"><strong>Cosequin DS and Dasuquin</strong> are the two most research-backed joint supplement brands for dogs. Both have published clinical trials and NASC quality seals.</div>

<h2 id="omega">Fish Oil & Omega-3 Fatty Acids</h2>
<p>Among the most useful general supplements for dogs — backed by multiple studies. Benefits include: reduced inflammation, improved coat and skin quality, joint support, possible cognitive benefits in seniors, and reduced triglycerides in dogs prone to pancreatitis.</p>
<p>Dose: 20–55 mg EPA+DHA per kg of body weight per day. A 50 lb (23 kg) dog needs ~500–1200 mg EPA+DHA daily. Most fish oil capsules contain 300–360 mg EPA+DHA — so 2–3 per day for a medium-large dog.</p>
<p>Use fish oil (salmon, sardine), not flaxseed oil — dogs can't efficiently convert the ALA in plant oils to EPA/DHA. Look for products with IFOS (International Fish Oil Standards) certification for purity.</p>

<h2 id="probiotic">Probiotics</h2>
<p>Good evidence for dogs with frequent loose stools, stress-related GI issues, or recovering from antibiotics (which wipe out gut flora). Less evidence for routine use in healthy dogs eating complete food.</p>
<p>Recommended strains for dogs: <em>Lactobacillus acidophilus</em>, <em>Bifidobacterium animalis</em>, <em>Enterococcus faecium</em>. Look for products labeled for pets (human probiotics often use different strains). FortiFlora (Purina) is vet-recommended and has published trials.</p>
<div class="tip-box"><strong>Plain unsweetened yogurt or kefir</strong> (no xylitol) works as a natural probiotic source — a tablespoon with meals is enough for most dogs.</div>

<h2 id="avoid">Supplements to Skip</h2>
<ul>
  <li><strong>Multivitamins for dogs on complete food</strong> — can cause toxicity; not needed</li>
  <li><strong>Biotin for coat</strong> — only helps if deficient; most commercial foods provide adequate biotin</li>
  <li><strong>Colloidal silver</strong> — no evidence of benefit; potential for toxicity</li>
  <li><strong>Essential oils internally</strong> — many are toxic to dogs; never give orally without specific vet guidance</li>
  <li><strong>Weight-loss supplements</strong> — none have meaningful evidence; diet and exercise are the only proven interventions</li>
  <li><strong>Cheap generic supplements without NASC seal</strong> — third-party testing found many contain far less (or more) than labeled amounts</li>
</ul>
`
},

// ─── 8. SAFE HUMAN FOODS ───────────────────────────────────────────────────
{
  file: 'safe-human-foods.html',
  title: 'Safe Human Foods for Dogs — What Can My Dog Eat?',
  crumb: 'Safe Human Foods',
  tag: '✅ Safe Foods',
  h1: 'Safe Human Foods for Dogs — What Can My Dog Eat?',
  desc: 'A complete list of human foods that are safe for dogs — fruits, vegetables, proteins, and grains — with serving size guidelines and what to watch for.',
  meta: '⏱ 8 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#proteins">Safe Proteins</a></li>
        <li><a href="#fruits">Safe Fruits</a></li>
        <li><a href="#vegetables">Safe Vegetables</a></li>
        <li><a href="#grains">Safe Grains & Starches</a></li>
        <li><a href="#rules">Key Rules</a></li>`,
  related: `<li><a href="toxic-foods.html">Toxic Foods List</a></li>
            <li><a href="best-dog-treats.html">Best Dog Treats</a></li>
            <li><a href="daily-feeding-guide.html">Daily Feeding Guide</a></li>`,
  body: `
<p class="ga-lede">Sharing food with your dog can be a great bonding moment — and many human foods are genuinely healthy for dogs. Here's a comprehensive, vet-reviewed list of what's safe, with the right amounts to give.</p>

<h2 id="proteins">Safe Protein Sources</h2>
<table class="ga-table">
  <thead><tr><th>Food</th><th>Safe?</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Cooked chicken (plain)</td><td>✅ Yes</td><td>No seasoning, no bones; excellent lean protein</td></tr>
    <tr><td>Cooked turkey (plain)</td><td>✅ Yes</td><td>Remove skin (too fatty); great in moderation</td></tr>
    <tr><td>Cooked salmon</td><td>✅ Yes</td><td>Never raw (Pacific salmon can carry parasites); cooked is great for coat</td></tr>
    <tr><td>Cooked eggs</td><td>✅ Yes</td><td>Excellent protein; scrambled or hard-boiled, no salt or butter</td></tr>
    <tr><td>Plain cooked beef</td><td>✅ Yes</td><td>Lean ground beef or steak, no seasoning</td></tr>
    <tr><td>Plain cooked shrimp</td><td>✅ Yes</td><td>Remove shell and tail; high protein, low fat</td></tr>
    <tr><td>Cottage cheese</td><td>✅ Yes (small amounts)</td><td>High in protein; low-fat variety; some dogs are lactose intolerant</td></tr>
    <tr><td>Plain yogurt (no xylitol)</td><td>✅ Yes</td><td>Check for artificial sweeteners; good probiotic source</td></tr>
  </tbody>
</table>

<h2 id="fruits">Safe Fruits</h2>
<table class="ga-table">
  <thead><tr><th>Fruit</th><th>Safe?</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Blueberries</td><td>✅ Yes</td><td>Antioxidant-rich; perfect training treats</td></tr>
    <tr><td>Watermelon</td><td>✅ Yes</td><td>Remove seeds and rind; mostly water — great summer treat</td></tr>
    <tr><td>Apple slices</td><td>✅ Yes</td><td>Remove seeds and core (seeds contain cyanide); great for teeth</td></tr>
    <tr><td>Banana</td><td>✅ Yes (small amounts)</td><td>High in sugar; limit to a few slices</td></tr>
    <tr><td>Strawberries</td><td>✅ Yes</td><td>High in vitamin C; cut into small pieces for small dogs</td></tr>
    <tr><td>Mango</td><td>✅ Yes</td><td>Remove pit; high in sugar — moderation only</td></tr>
    <tr><td>Pineapple</td><td>✅ Yes</td><td>Remove rind and core; contains bromelain (digestive enzyme)</td></tr>
    <tr><td>Cantaloupe</td><td>✅ Yes</td><td>Remove rind; high in water and vitamins</td></tr>
    <tr><td>Grapes / Raisins</td><td>❌ NO</td><td>Toxic — can cause kidney failure</td></tr>
    <tr><td>Cherries</td><td>❌ NO</td><td>Pits contain cyanide; flesh is marginally safe but not worth the risk</td></tr>
  </tbody>
</table>

<h2 id="vegetables">Safe Vegetables</h2>
<table class="ga-table">
  <thead><tr><th>Vegetable</th><th>Safe?</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Carrots (raw or cooked)</td><td>✅ Yes</td><td>Great low-calorie treat; good for teeth; high in fiber</td></tr>
    <tr><td>Green beans (plain)</td><td>✅ Yes</td><td>Excellent low-calorie filler for dieting dogs</td></tr>
    <tr><td>Cucumber</td><td>✅ Yes</td><td>Almost zero calories; refreshing; safe for all dogs</td></tr>
    <tr><td>Sweet potato (cooked, no seasoning)</td><td>✅ Yes</td><td>Rich in fiber and vitamins; limit in diabetic-prone dogs</td></tr>
    <tr><td>Peas (fresh or frozen)</td><td>✅ Yes</td><td>Good source of protein, fiber, vitamins; avoid canned (high sodium)</td></tr>
    <tr><td>Pumpkin (plain, canned)</td><td>✅ Yes</td><td>Excellent for digestion; 1–4 tablespoons for diarrhea or constipation</td></tr>
    <tr><td>Broccoli (small amounts)</td><td>✅ Yes</td><td>High in fiber; too much causes gas; keep under 10% of diet</td></tr>
    <tr><td>Celery</td><td>✅ Yes</td><td>Very low calorie; freshens breath</td></tr>
    <tr><td>Onions / Garlic / Chives</td><td>❌ NO</td><td>Toxic — destroys red blood cells</td></tr>
    <tr><td>Corn on the cob</td><td>⚠️ Caution</td><td>Cob = obstruction risk; corn kernels off cob are fine</td></tr>
  </tbody>
</table>

<h2 id="grains">Safe Grains & Starches</h2>
<ul>
  <li><strong>Plain cooked rice</strong> — white or brown; excellent for upset stomachs; classic bland diet with plain chicken</li>
  <li><strong>Plain cooked oatmeal</strong> — good fiber; use plain (no sugar, no flavoring); great for skin health too</li>
  <li><strong>Plain cooked pasta</strong> — fine in small amounts; not a nutritional standout</li>
  <li><strong>Plain cooked quinoa</strong> — high protein grain; safe in small amounts</li>
  <li><strong>Plain popcorn (unsalted, unbuttered)</strong> — fine as an occasional snack; avoid microwave varieties</li>
</ul>

<h2 id="rules">Key Rules for Sharing Human Food</h2>
<ol class="step-list">
  <li>Always plain — no seasoning, salt, garlic, onion powder, or sauces</li>
  <li>Keep portions small — treats + human food should be under 10% of daily calories</li>
  <li>Introduce new foods one at a time — watch for allergic reactions (itching, GI upset) for 24–48 hours</li>
  <li>When in doubt, check the toxic foods list before giving anything new</li>
  <li>Never feed from the table — establishes begging behavior; always give in their bowl</li>
</ol>
`
},

// ─── 9. LARGE VS SMALL BREED FOOD ─────────────────────────────────────────
{
  file: 'large-vs-small-breed-food.html',
  title: 'Large vs. Small Breed Dog Food — Does Size Really Matter?',
  crumb: 'Large vs. Small Breed Food',
  tag: '🐕 Breed Nutrition',
  h1: 'Large vs. Small Breed Dog Food — Does Size Matter?',
  desc: 'The real nutritional differences between large and small breed formulas — why large breed puppies need specific food, and whether size-specific adult food is worth the price.',
  meta: '⏱ 7 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#puppies">Why Puppies Need Size-Specific Food</a></li>
        <li><a href="#adult">Adult Breed Formulas</a></li>
        <li><a href="#kibble">Kibble Size Differences</a></li>
        <li><a href="#senior">Senior Differences</a></li>
        <li><a href="#verdict">The Verdict</a></li>`,
  related: `<li><a href="choose-dog-food.html">How to Choose Dog Food</a></li>
            <li><a href="puppy-feeding-guide.html">Puppy Feeding Guide</a></li>
            <li><a href="daily-feeding-guide.html">Daily Feeding Guide</a></li>`,
  body: `
<p class="ga-lede">Walk the pet store aisle and you'll see food for every size imaginable — toy, small, medium, large, giant. Some of it is meaningful; some is pure marketing. Here's what's actually different and when it matters.</p>

<h2 id="puppies">Large Breed Puppy Food — This One Really Matters</h2>
<p>Large breed puppy food is NOT just a marketing gimmick. The calcium-to-phosphorus ratio and calorie density are genuinely different, and feeding a large breed puppy the wrong food can cause developmental orthopedic disease (DOD) — painful joint malformations during growth.</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Large Breed Puppy</strong><p>Lower calcium (0.9–1.5%), lower phosphorus, lower calorie density, controlled fat. Slows growth rate to allow joints to develop properly.</p></div>
  <div class="ga-hl-card"><strong>Small Breed Puppy</strong><p>Higher calorie density (tiny stomach, high metabolism), smaller kibble size, higher fat. Designed for fast metabolism without the bone growth concern.</p></div>
  <div class="ga-hl-card"><strong>All Breeds Puppy</strong><p>Must meet large breed puppy minimums by AAFCO rules. Safe for all puppies, including large breeds. A good default if you're unsure.</p></div>
</div>
<div class="warning-box"><strong>Large breed puppies = breeds expected to be over 50 lbs as adults.</strong> This includes Labs, Goldens, German Shepherds, Rottweilers, Great Danes, and any mix with a large breed parent. Don't guess — if in doubt, use large breed puppy food or all-life-stages formula.</div>

<h2 id="adult">Adult Breed-Specific Formulas — Worth It?</h2>
<p>For adult dogs, the differences between large and small breed formulas are less critical but still meaningful:</p>
<table class="ga-table">
  <thead><tr><th>Feature</th><th>Small Breed Adult</th><th>Large Breed Adult</th></tr></thead>
  <tbody>
    <tr><td>Calorie density</td><td>Higher (faster metabolism)</td><td>Lower per cup (prevent overeating)</td></tr>
    <tr><td>Kibble size</td><td>Smaller (easier for small mouths)</td><td>Larger (promotes chewing, slows eating)</td></tr>
    <tr><td>Joint support (glucosamine)</td><td>Minimal or none</td><td>Often added; large breeds need it more</td></tr>
    <tr><td>Protein level</td><td>Slightly higher (small dogs need more per kg)</td><td>Standard protein</td></tr>
    <tr><td>Fiber</td><td>Standard</td><td>Slightly higher (helps weight management)</td></tr>
  </tbody>
</table>
<p>Bottom line for adults: size-specific formulas are helpful but not essential if you're managing portion sizes carefully. The main practical benefit is kibble size — small dogs can struggle with oversized kibble, and large dogs can gulp tiny kibble without chewing.</p>

<h2 id="kibble">The Kibble Size Issue</h2>
<p>Small dogs have small mouths — oversized kibble makes it harder to eat and may be swallowed whole. Large dogs have a tendency to gulp food, and large kibble encourages some chewing and slows eating (reducing bloat risk).</p>
<p>If you're feeding a large breed dog a food marketed for "all breeds" with small kibble: consider using a slow-feeder bowl or puzzle feeder to prevent gulping and reduce bloat risk.</p>

<h2 id="senior">Senior Size Differences</h2>
<p>Large breed seniors (7+ years) genuinely benefit from formulas with added joint support (glucosamine, chondroitin), lower calories, and high digestibility. Small breed seniors age more slowly (many aren't "senior" until 10–12) and may benefit from higher calorie density if weight maintenance is a concern.</p>
<div class="tip-box"><strong>Large breed seniors:</strong> Look for foods with 300–400 mg/kg glucosamine and chondroitin added. Hill's Science Diet, Royal Canin, and Purina Pro Plan all make well-researched large breed senior formulas.</div>

<h2 id="verdict">The Verdict</h2>
<ul>
  <li><strong>Large breed puppy food:</strong> Essential — don't skip this. Use it until 12–18 months for large breeds, 18–24 months for giant breeds.</li>
  <li><strong>Small breed puppy food:</strong> Helpful, especially for kibble size — but any "all life stages" puppy food works.</li>
  <li><strong>Adult large breed food:</strong> Useful for joint support additions and calorie control — worth using for Labs, Goldens, and other obesity-prone large breeds.</li>
  <li><strong>Adult small breed food:</strong> Mainly useful for kibble size. Not essential if you manage portions and your small dog does well on regular food.</li>
  <li><strong>Breed-specific formulas (e.g., Royal Canin breed-specific):</strong> Generally overpriced marketing unless your dog has a confirmed issue the formula addresses.</li>
</ul>
`
},

// ─── 10. SWITCH DOG FOOD ───────────────────────────────────────────────────
{
  file: 'switch-dog-food.html',
  title: 'How to Switch Dog Food Without Upset Stomach',
  crumb: 'How to Switch Dog Food',
  tag: '🔄 Transitions',
  h1: 'How to Switch Dog Food Without Causing Upset Stomach',
  desc: 'The 7–10 day transition schedule that prevents diarrhea and vomiting when changing your dog\'s food — and what to do when the transition goes wrong.',
  meta: '⏱ 6 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#why">Why Slow Transitions Matter</a></li>
        <li><a href="#schedule">The 7-Day Schedule</a></li>
        <li><a href="#problems">When Problems Happen</a></li>
        <li><a href="#special">Special Cases</a></li>
        <li><a href="#picky">Handling Picky Eaters</a></li>`,
  related: `<li><a href="choose-dog-food.html">Choose Dog Food</a></li>
            <li><a href="puppy-feeding-guide.html">Puppy Feeding Guide</a></li>
            <li><a href="/health/vomiting-diarrhea.html">Vomiting & Diarrhea Guide</a></li>`,
  body: `
<p class="ga-lede">Switching dog food too abruptly is the most common cause of sudden diarrhea and vomiting — and it's 100% preventable. Follow this simple schedule and your dog's gut bacteria will have time to adjust without any drama.</p>

<h2 id="why">Why Slow Transitions Matter</h2>
<p>Your dog's gut microbiome is adapted to their current food. Each food has a different protein source, fat content, fiber type, and carbohydrate profile. When you switch abruptly, the bacteria that were thriving on the old food can't immediately handle the new composition. The result: gas, diarrhea, sometimes vomiting.</p>
<p>A slow transition gives gut bacteria time to shift their populations. It also helps you identify if the new food disagrees with your dog before they've eaten a full bag of it.</p>
<div class="tip-box"><strong>There's one exception:</strong> If your vet prescribes a therapeutic diet urgently (e.g., for pancreatitis or kidney disease), they may direct an immediate switch. In that case, follow your vet's specific instructions.</div>

<h2 id="schedule">The Standard 7-Day Transition Schedule</h2>
<table class="ga-table">
  <thead><tr><th>Day</th><th>Old Food</th><th>New Food</th></tr></thead>
  <tbody>
    <tr><td>1–2</td><td>75%</td><td>25%</td></tr>
    <tr><td>3–4</td><td>50%</td><td>50%</td></tr>
    <tr><td>5–6</td><td>25%</td><td>75%</td></tr>
    <tr><td>7+</td><td>0%</td><td>100%</td></tr>
  </tbody>
</table>
<p>For dogs with sensitive stomachs, IBD, or food sensitivities — extend this to 10–14 days by moving more slowly through each phase.</p>
<div class="key-box"><strong>Sensitive stomach protocol:</strong> Add 1–2 teaspoons of plain canned pumpkin per meal during the transition. The fiber acts as a prebiotic and helps normalize stool consistency.</div>

<h2 id="problems">When the Transition Causes Problems</h2>
<p>Some soft stool during the transition is normal and expected. When to slow down or stop:</p>
<ul>
  <li><strong>Liquid diarrhea</strong> — back up one step in the schedule; hold at that ratio for 3 days before continuing</li>
  <li><strong>Vomiting</strong> — skip the new food entirely for 24 hours, then restart at 25% new food more slowly</li>
  <li><strong>Blood in stool</strong> — call your vet; may indicate colitis or a food intolerance that needs investigation</li>
  <li><strong>Refuses to eat new food</strong> — see "picky eaters" section below</li>
</ul>
<p>If diarrhea persists for more than 3 days despite slowing the transition, the new food may simply not agree with your dog. Consider a different protein source or a limited-ingredient diet.</p>

<h2 id="special">Special Cases</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Puppy to Adult Food</strong><p>Follow the same 7-day schedule. Puppies are often more tolerant than adults but still benefit from a gradual transition.</p></div>
  <div class="ga-hl-card"><strong>Kibble to Wet Food</strong><p>Go slower — 10 days minimum. Wet food has very different moisture and fat content; GI adjustment takes longer.</p></div>
  <div class="ga-hl-card"><strong>Dry to Raw</strong><p>14+ day transition minimum. Consult your vet. Never mix raw with kibble in the same bowl — different digestion rates and contamination risk.</p></div>
  <div class="ga-hl-card"><strong>After Illness / Antibiotics</strong><p>Wait until stools have been normal for 3 days before beginning any food transition. Add a probiotic during the transition to restore gut flora.</p></div>
</div>

<h2 id="picky">Handling Picky Eaters During Transitions</h2>
<p>Some dogs will hold out and refuse the new food. Don't negotiate — doing so teaches them that refusing food gets them something better.</p>
<ol class="step-list">
  <li>Offer the mixed meal, leave it for 20 minutes, then pick it up whether eaten or not</li>
  <li>No treats or table scraps between meals during the transition</li>
  <li>Warm the new food slightly — increases aroma and palatability</li>
  <li>Add a small amount of low-sodium broth to make the new food more appealing</li>
  <li>A healthy dog will not starve itself — most hold-outs give in within 1–2 days</li>
</ol>
<p>If your dog truly refuses to eat for more than 48 hours, consult your vet. In rare cases, there's a medical reason (nausea, pain) rather than stubbornness.</p>
`
}

]; // end GUIDES

GUIDES.forEach(cfg => {
  const html = page(cfg);
  const outPath = path.join(OUT, cfg.file);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Created:', outPath);
});
console.log(`Done: Nutrition guides (${GUIDES.length} pages)`);
