const fs = require('fs');
const path = require('path');
function nav(active) {
  const items = [['/', 'Home'],['/breeds/index.html','Dog Breeds'],['/getting-a-dog/index.html','Getting a Dog'],['/training/index.html','Training'],['/health/index.html','Health'],['/nutrition/index.html','Nutrition'],['/grooming/index.html','Grooming']];
  const links = items.map(([href, label]) => `<li><a href="${href}"${href.includes(active) && active !== '/' ? ' style="color:var(--teal)"' : ''}>${label}</a></li>`).join('');
  return `<nav class="navbar" id="navbar"><div class="nav-container"><a href="/index.html" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></a><ul class="nav-links" id="navLinks">${links}</ul><button class="hamburger" id="hamburger"><span></span><span></span><span></span></button></div></nav>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div><p>A free, in-depth encyclopedia for dog owners and lovers.</p></div><div class="footer-col"><h4>Health</h4><ul><li><a href="/health/vaccination-schedule.html">Vaccination Schedule</a></li><li><a href="/health/is-my-dog-sick.html">Is My Dog Sick?</a></li><li><a href="/health/dog-health-baseline.html">Health Baseline</a></li></ul></div><div class="footer-col"><h4>Dog Care</h4><ul><li><a href="/training/index.html">Training</a></li><li><a href="/nutrition/index.html">Nutrition</a></li><li><a href="/grooming/index.html">Grooming</a></li></ul></div><div class="footer-col"><h4>Breeds</h4><ul><li><a href="/breeds/index.html">All 302 Breeds</a></li></ul></div></div><div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div></div></footer>`;
}
function page(cfg) {
  const tocHtml = cfg.toc.map(t => `<li><a href="#${t.id}">${t.label}</a></li>`).join('');
  const relHtml = cfg.related.map(r => `<li><a href="${r.url}">${r.title}</a></li>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-C8QDN9HH5F');</script>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${cfg.title} | AllDogFacts</title>
  <meta name="description" content="${cfg.metaDesc}"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/css/styles.css"/>
  <link rel="stylesheet" href="/css/guide-article.css"/>
</head>
<body>
  ${nav('health')}
  <section class="ga-hero" style="background:${cfg.heroBg}">
    <div class="container">
      <nav class="ga-breadcrumb"><a href="/index.html">Home</a><span>›</span><a href="/health/index.html">Health</a><span>›</span>${cfg.title}</nav>
      <div class="ga-hero-tag">${cfg.heroTag}</div>
      <h1>${cfg.h1}</h1>
      <p class="ga-hero-desc">${cfg.desc}</p>
      <div class="ga-meta"><span>📖 ${cfg.readTime}</span>${cfg.level ? `<span>🏷️ ${cfg.level}</span>` : ''}</div>
    </div>
  </section>
  <div class="ga-wrap"><div class="container"><div class="ga-layout">
    <main class="ga-main">${cfg.body}</main>
    <aside class="ga-sidebar">
      <div class="ga-scard"><h4>In This Guide</h4><ul class="toc-list">${tocHtml}</ul></div>
      <div class="ga-scard"><h4>Related Guides</h4><ul class="ga-related-list">${relHtml}</ul></div>
    </aside>
  </div></div></div>
  ${footer()}
  <script src="/js/main.js"></script>
</body>
</html>`;
}

const BG = 'linear-gradient(135deg,#0f172a 0%,#4c1d2f 100%)';

const GUIDES = [
  {
    slug:'dog-health-baseline',
    title:"Your Dog's Health Baseline — Normal vs. Not",
    metaDesc:"How to know what's normal for your dog — body temperature, heart rate, breathing, coat, eyes, and stools. The foundation of early illness detection.",
    heroTag:'Know Your Dog',heroBg:BG,
    h1:'Your Dog\'s Health Baseline — <span class="hl">Normal vs. Not</span>',
    desc:"The earlier you catch a health problem, the easier and cheaper it is to treat. This guide teaches you what healthy looks like for your specific dog.",
    readTime:'6 min read',level:null,
    toc:[{id:'vitals',label:'Normal Vital Signs'},{id:'physical',label:'Physical Health Markers'},{id:'behavior',label:'Behavioral Baselines'},{id:'record',label:'Keeping a Health Log'}],
    body:`<p class="ga-lede">The best person to detect early illness in your dog isn't your vet — it's you. You see your dog every day. You know their normal energy level, appetite, gait, and personality. The challenge is knowing what "normal" actually looks like in objective terms, so that changes register as flags rather than going unnoticed until they're serious. This guide establishes the baselines you should know for your dog specifically.</p>
<h2 id="vitals">Normal Vital Signs</h2>
<table class="ga-table">
  <thead><tr><th>Vital Sign</th><th>Normal Range</th><th>How to Measure</th></tr></thead>
  <tbody>
    <tr><td>Body temperature</td><td>101–102.5°F (38.3–39.2°C)</td><td>Rectal thermometer; ear thermometers less accurate</td></tr>
    <tr><td>Heart rate (small dog)</td><td>100–140 bpm</td><td>Feel inside back leg at femoral artery, count 15 sec × 4</td></tr>
    <tr><td>Heart rate (large dog)</td><td>60–100 bpm</td><td>Same method</td></tr>
    <tr><td>Respiratory rate</td><td>15–30 breaths/minute</td><td>Count chest rises for 30 seconds × 2</td></tr>
    <tr><td>Capillary refill time</td><td>Under 2 seconds</td><td>Press gum above tooth, release, count until pink returns</td></tr>
    <tr><td>Gum color</td><td>Bubble-gum pink and moist</td><td>Lift lip and check color and moisture of gums</td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>⚠️ Emergency signs:</strong> White/pale gums, blue-tinged gums, or gums that are brick red indicate immediate emergencies. Temperature above 104°F or below 99°F also requires immediate vet contact.</div>
<h2 id="physical">Physical Health Markers</h2>
<ul>
  <li><strong>Coat:</strong> Should be glossy (for short coats) or full and fluffy (for long coats). Dull, brittle, or excessively shedding coat signals nutritional deficiency, thyroid issues, or skin conditions.</li>
  <li><strong>Eyes:</strong> Should be clear, bright, and free of discharge. A small amount of "sleep" (dried discharge) in corners is normal. Cloudy eyes, excessive tearing, red whites, or squinting are not.</li>
  <li><strong>Ears:</strong> Should be pale pink inside with minimal odor. Dark discharge, strong odor, head shaking, or pawing at ears indicates infection.</li>
  <li><strong>Nose:</strong> Can be wet or dry — both are normal. Cold and wet is a myth. Cracking, bleeding, or significant discharge is not normal.</li>
  <li><strong>Stools:</strong> Should be firm, formed, chocolate brown, and passed with little straining. A useful reference: ideal stools score 2–3 on the Purina Fecal Scoring Chart (Google it — it's genuinely useful).</li>
  <li><strong>Weight/Body Condition:</strong> You should be able to feel ribs easily without pressing hard, but not see them from a distance. See our <a href="/health/healthy-weight.html">healthy weight guide</a>.</li>
</ul>
<h2 id="behavior">Behavioral Baselines</h2>
<p>Changes in behavior are often the earliest indicator of illness — before any physical symptoms appear. Know your dog's normal in these areas:</p>
<ul>
  <li><strong>Appetite:</strong> How much do they typically eat per meal? Skipping one meal occasionally is normal; skipping two or eating significantly less for 48+ hours is a flag.</li>
  <li><strong>Water intake:</strong> Approximate normal consumption. Drinking significantly more (polydipsia) is a symptom of diabetes, kidney disease, and Cushing's disease.</li>
  <li><strong>Energy level:</strong> What's their typical activity level at 7 AM? 7 PM? After a walk? Lethargy below their normal baseline for 24+ hours warrants attention.</li>
  <li><strong>Sleep:</strong> Dogs sleep 12–14 hours daily. Sleeping significantly more or less than usual is notable.</li>
  <li><strong>Gait:</strong> Any limping, stiffness getting up, reluctance to climb stairs, or asymmetrical movement is a musculoskeletal flag.</li>
</ul>
<h2 id="record">Keeping a Simple Health Log</h2>
<p>You don't need a formal system — just a note in your phone with your dog's baseline numbers (weight, typical appetite, normal energy level) updated annually at vet visits. When something changes, you'll have a reference point that helps your vet understand how significant the change is.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Early detection is the single most effective tool in veterinary medicine — and it requires knowing what "normal" looks like for your specific dog. Check your dog's gums, eyes, ears, and overall demeanor weekly. An annual vet-recorded weight makes tracking gradual changes possible.</div>`,
    related:[{url:'/health/is-my-dog-sick.html',title:'Is My Dog Sick?'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'},{url:'/health/healthy-weight.html',title:'Is My Dog a Healthy Weight?'}]
  },

  {
    slug:'is-my-dog-sick',
    title:'Is My Dog Sick? Symptoms to Watch For',
    metaDesc:'How to tell if your dog is sick. Key symptoms explained — lethargy, vomiting, limping, appetite loss — and when to call the vet.',
    heroTag:'Symptoms',heroBg:BG,
    h1:'Is My Dog Sick? <span class="hl">Symptoms to Watch For</span>',
    desc:"Something seems off. Here's how to assess your dog's symptoms and decide whether to wait, call, or go to the emergency vet.",
    readTime:'8 min read',level:null,
    toc:[{id:'mild',label:'Mild Symptoms — Monitor at Home'},{id:'call',label:'Call Your Vet'},{id:'emergency',label:'Go to Emergency Vet Now'},{id:'common',label:'Common Symptom Guide'}],
    body:`<p class="ga-lede">Every dog owner faces the same question eventually: "Is this serious, or am I overreacting?" The answer depends on which symptoms are present, how long they've lasted, and your dog's baseline. This guide gives you a framework for making that call — without automatically rushing to the ER for a mild stomach upset or ignoring a symptom that needs same-day attention.</p>
<h2 id="mild">Mild Symptoms — Monitor at Home (24–48 hours)</h2>
<ul>
  <li>Soft stool (once) without blood</li>
  <li>Mild vomiting (once or twice) without blood or foreign material</li>
  <li>Skipping one meal</li>
  <li>Slightly quieter than usual for one day</li>
  <li>Sneezing (1–2 days without discharge)</li>
  <li>Minor limping that resolves with rest within 24 hours</li>
</ul>
<p>For these symptoms: withhold food for 6–12 hours, offer water freely, and monitor. If symptoms resolve, no vet visit needed. If they persist beyond 48 hours or worsen, call your vet.</p>
<h2 id="call">Call Your Vet — Same Day or Next Day</h2>
<ul>
  <li>Vomiting or diarrhea more than 3 times in 24 hours</li>
  <li>Any blood in vomit or diarrhea</li>
  <li>Limping that persists beyond 24 hours or is severe</li>
  <li>Lethargy lasting more than 24 hours</li>
  <li>Refusing food for 48+ hours</li>
  <li>Unusual lumps or swelling</li>
  <li>Cloudy eyes, discharge, or squinting</li>
  <li>Excessive scratching, licking, or hair loss</li>
  <li>Coughing for more than 2 days</li>
  <li>Straining to urinate or defecate</li>
</ul>
<h2 id="emergency">Emergency Vet — Go Now</h2>
<ul>
  <li>Pale, white, or blue gums</li>
  <li>Collapse or extreme weakness</li>
  <li>Difficulty breathing, open-mouth breathing (in dogs)</li>
  <li>Suspected toxin ingestion (chocolate, xylitol, grapes, medications)</li>
  <li>Bloated, distended abdomen with unproductive retching (GDV in large breeds — can be fatal within hours)</li>
  <li>Seizure lasting more than 3 minutes, or multiple seizures in one day</li>
  <li>Trauma (hit by car, fall from height, animal attack)</li>
  <li>Inability to urinate with straining (especially male cats — also applicable to some dogs)</li>
  <li>Eye injury or sudden vision loss</li>
</ul>
<div class="warning-box"><strong>⚠️ When in doubt, call.</strong> Most vet offices have a phone triage — describe the symptoms and they'll tell you whether to come in. A 5-minute phone call can save you hours of worry or prevent a missed emergency.</div>
<h2 id="common">Common Symptom Quick Reference</h2>
<table class="ga-table">
  <thead><tr><th>Symptom</th><th>Likely Cause</th><th>Action</th></tr></thead>
  <tbody>
    <tr><td>Vomiting (once, no blood)</td><td>Ate too fast, mild upset</td><td>Monitor 24 hours</td></tr>
    <tr><td>Bloody vomit</td><td>Ulcer, foreign body, parvo</td><td>Call vet now</td></tr>
    <tr><td>Yellow/white foam vomit</td><td>Bile vomiting (empty stomach)</td><td>Feed smaller meals; call if recurring</td></tr>
    <tr><td>Diarrhea (once, no blood)</td><td>Dietary indiscretion</td><td>Monitor, bland diet</td></tr>
    <tr><td>Lethargy only</td><td>Overheating, mild illness</td><td>Monitor 24 hours</td></tr>
    <tr><td>Lethargy + not eating</td><td>Multiple possibilities</td><td>Call vet same day</td></tr>
    <tr><td>Limping (mild, weight-bearing)</td><td>Strain, minor injury</td><td>Rest 24 hours, then vet if persisting</td></tr>
    <tr><td>Limping (non-weight-bearing)</td><td>Break, severe sprain</td><td>Call vet same day</td></tr>
    <tr><td>Excessive drinking</td><td>Diabetes, kidney disease, Cushing's</td><td>Call vet</td></tr>
    <tr><td>Distended abdomen + retching</td><td>GDV (Bloat) — life-threatening</td><td>Emergency vet immediately</td></tr>
  </tbody>
</table>
<div class="key-box"><strong>Key Takeaway:</strong> Most dog illnesses that owners worry about are minor and self-resolving. But a handful of symptoms (pale gums, bloat, toxin ingestion, seizures) are life-threatening emergencies. Know the emergency list cold. For everything else, observe for 24–48 hours and call your vet when in doubt.</div>`,
    related:[{url:'/health/vomiting-diarrhea.html',title:'Vomiting & Diarrhea Guide'},{url:'/health/limping.html',title:'Dog Limping Guide'},{url:'/health/dog-health-baseline.html',title:'Health Baseline'}]
  },

  {
    slug:'limping',
    title:'Dog Limping — Causes and When to See a Vet',
    metaDesc:'Why is my dog limping? Common causes of dog limping and when it requires immediate vet care vs. home rest.',
    heroTag:'Symptoms',heroBg:BG,
    h1:'Dog Limping — <span class="hl">Causes & When to Act</span>',
    desc:"A limping dog can mean anything from a minor paw scratch to a broken bone. Here's how to tell the difference.",
    readTime:'7 min read',level:null,
    toc:[{id:'assess',label:'First Assessment'},{id:'causes',label:'Common Causes'},{id:'emergency',label:'Emergency Limping Signs'},{id:'home',label:'Home Care for Mild Limping'},{id:'vet',label:'When to See the Vet'}],
    body:`<p class="ga-lede">Limping is one of the most common reasons dog owners call their vet — and one of the most anxiety-inducing because the causes range widely from a thorn in the paw to a broken leg to cancer. The key variables that determine urgency: Is the dog bearing weight? How suddenly did it start? Is there visible injury? And how is the dog's overall demeanor?</p>
<h2 id="assess">First Assessment at Home</h2>
<p>Before panicking, do a calm, systematic check:</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Check the paw first</strong><br>Most sudden limping in active dogs is a paw issue. Gently examine: between toes for foxtails or debris, paw pads for cuts or burns, nails for breakage or overgrowth.</div></li>
  <li><div class="step-content"><strong>Is the dog bearing weight?</strong><br>Weight-bearing limps (dog uses the leg but favors it) are generally less urgent. Non-weight-bearing (leg held up completely) is more serious.</div></li>
  <li><div class="step-content"><strong>Check for visible swelling, wounds, or deformity</strong><br>Swelling, heat, an open wound, or a limb at an abnormal angle = call vet immediately. No visible injury and weight-bearing = likely okay to monitor briefly.</div></li>
  <li><div class="step-content"><strong>Assess overall demeanor</strong><br>Is the dog otherwise alert, eating, and interested in their surroundings? Or are they lethargic and refusing food alongside the limp? Limp + systemic illness = more urgent.</div></li>
</ol>
<h2 id="causes">Common Causes of Limping</h2>
<table class="ga-table">
  <thead><tr><th>Cause</th><th>Signs</th><th>Age/Breed Tendency</th></tr></thead>
  <tbody>
    <tr><td>Paw injury (cut, thorn, burn)</td><td>Sudden onset, licking paw</td><td>Any dog</td></tr>
    <tr><td>Muscle strain/sprain</td><td>After exercise, weight-bearing</td><td>Any dog</td></tr>
    <tr><td>Broken nail</td><td>Sudden, bloody, obvious</td><td>Any dog</td></tr>
    <tr><td>Hip dysplasia</td><td>Gradual, worse after rest</td><td>Large breeds, young adults</td></tr>
    <tr><td>Elbow dysplasia</td><td>Front leg, gradual</td><td>Large breeds, puppies</td></tr>
    <tr><td>Patellar luxation</td><td>Intermittent skipping</td><td>Small breeds</td></tr>
    <tr><td>Arthritis</td><td>Morning stiffness, gradual</td><td>Senior dogs</td></tr>
    <tr><td>Ligament tear (CCL/ACL)</td><td>Sudden non-weight-bearing</td><td>Any, often active dogs</td></tr>
    <tr><td>Bone fracture</td><td>Sudden, non-weight-bearing, obvious pain</td><td>Any dog</td></tr>
    <tr><td>Bone cancer (osteosarcoma)</td><td>Progressive, large breeds</td><td>Giant breeds, middle-aged+</td></tr>
  </tbody>
</table>
<h2 id="emergency">Emergency Signs — Go Now</h2>
<ul>
  <li>Non-weight-bearing with visible bone deformity or wound</li>
  <li>Extreme pain: crying, snapping, won't let you near</li>
  <li>Swelling that is growing rapidly</li>
  <li>Limping after a car accident, fall from height, or animal attack</li>
  <li>Sudden paralysis of one or more limbs</li>
</ul>
<h2 id="home">Home Care for Mild Limping</h2>
<p>For mild, weight-bearing limping with no visible injury:</p>
<ul>
  <li>Restrict activity for 24–48 hours (leash walks only, no running or stairs)</li>
  <li>No human NSAIDs (ibuprofen, Tylenol) — these are toxic to dogs</li>
  <li>Apply a cold pack wrapped in cloth for 10 minutes, 2–3 times daily if swelling present</li>
  <li>Monitor closely for worsening</li>
</ul>
<h2 id="vet">When to See the Vet</h2>
<ul>
  <li>Any non-weight-bearing limp lasting more than a few hours</li>
  <li>Weight-bearing limp lasting more than 24–48 hours</li>
  <li>Limping in large/giant breed puppies (could be growth condition)</li>
  <li>Limping that comes and goes repeatedly</li>
  <li>Any limp in a senior dog (gradual arthritis can be managed effectively when caught early)</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Check the paw first — it's the cause of most sudden limping. If the dog is bearing weight and you find no obvious injury, 24–48 hours of restricted activity and monitoring is reasonable. Any non-weight-bearing limping, or weight-bearing limping that persists beyond 48 hours, warrants a vet call.</div>`,
    related:[{url:'/health/hip-dysplasia.html',title:'Hip Dysplasia in Dogs'},{url:'/health/dog-arthritis.html',title:'Arthritis in Senior Dogs'},{url:'/health/is-my-dog-sick.html',title:'Is My Dog Sick?'}]
  },

  {
    slug:'vomiting-diarrhea',
    title:'Dog Vomiting and Diarrhea — When to Worry',
    metaDesc:'Dog vomiting and diarrhea guide — what causes it, when it\'s normal, and exactly when to call the vet or go to emergency.',
    heroTag:'Symptoms',heroBg:BG,
    h1:'Dog Vomiting & Diarrhea — <span class="hl">When to Worry</span>',
    desc:"Most vomiting and diarrhea is minor and self-resolving. But some causes are life-threatening. Here's how to tell the difference.",
    readTime:'8 min read',level:null,
    toc:[{id:'vomiting',label:'Types of Vomit'},{id:'diarrhea',label:'Types of Diarrhea'},{id:'home-care',label:'Home Treatment'},{id:'emergency',label:'Emergency Signs'},{id:'bland-diet',label:'The Bland Diet'}],
    body:`<p class="ga-lede">Dogs vomit more readily than almost any other mammal — it's an evolutionary adaptation that helped them survive as opportunistic scavengers. Most vomiting and diarrhea episodes in otherwise healthy dogs resolve on their own within 24–48 hours. But a subset of causes are serious or life-threatening, and knowing how to distinguish them prevents both unnecessary worry and dangerous delays in treatment.</p>
<h2 id="vomiting">Types of Vomit — What They Mean</h2>
<table class="ga-table">
  <thead><tr><th>What You See</th><th>Likely Cause</th><th>Urgency</th></tr></thead>
  <tbody>
    <tr><td>Undigested food shortly after eating</td><td>Ate too fast, regurgitation</td><td>Monitor</td></tr>
    <tr><td>Partially digested food, bile</td><td>Standard vomiting (stomach upset)</td><td>Monitor if once</td></tr>
    <tr><td>Yellow/white foam on empty stomach</td><td>Bile vomiting (bilious vomiting syndrome)</td><td>Call vet if recurring daily</td></tr>
    <tr><td>Bright red blood</td><td>Upper GI irritation or bleeding</td><td>Call vet today</td></tr>
    <tr><td>Coffee-ground appearance (dark red/brown)</td><td>Digested blood — internal bleeding</td><td>Emergency vet</td></tr>
    <tr><td>Foreign material (plastic, fabric)</td><td>Ingested object — possible obstruction</td><td>Call vet immediately</td></tr>
    <tr><td>Repeated vomiting (5+ times) with bloated abdomen</td><td>GDV (bloat) — life-threatening</td><td>Emergency vet now</td></tr>
  </tbody>
</table>
<h2 id="diarrhea">Types of Diarrhea</h2>
<table class="ga-table">
  <thead><tr><th>Appearance</th><th>Likely Cause</th><th>Urgency</th></tr></thead>
  <tbody>
    <tr><td>Soft, formed, no blood</td><td>Dietary change, mild upset</td><td>Monitor, bland diet</td></tr>
    <tr><td>Liquid, watery</td><td>Infection, stress, dietary indiscretion</td><td>Monitor if once; call if persisting</td></tr>
    <tr><td>Bright red blood coating stool</td><td>Lower bowel (colon) irritation</td><td>Call vet same day</td></tr>
    <tr><td>Bloody and very frequent (10+ times)</td><td>Hemorrhagic gastroenteritis or parvo</td><td>Emergency vet</td></tr>
    <tr><td>Black, tarry stool</td><td>Digested blood (upper GI bleed)</td><td>Emergency vet</td></tr>
  </tbody>
</table>
<h2 id="home-care">Home Treatment for Mild Upset</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Withhold food for 6–12 hours (adults only — never fast puppies)</strong><br>Let the GI tract rest. Always keep fresh water available — dehydration is the main risk with vomiting and diarrhea.</div></li>
  <li><div class="step-content"><strong>Transition to bland diet</strong><br>After the fast: boiled chicken breast (no skin/bones) + plain white rice in a 1:3 ratio (chicken:rice). Feed small amounts every 4–6 hours for 2–3 days, then gradually reintroduce regular food.</div></li>
  <li><div class="step-content"><strong>Monitor for dehydration</strong><br>Pinch the skin on the back of the neck — if it doesn't spring back quickly, the dog may be dehydrated. Also check gum moisture (should be wet). Call vet if dehydration signs present.</div></li>
</ol>
<h2 id="emergency">Emergency Signs — Go Now</h2>
<ul>
  <li>Bloated abdomen with retching (GDV/bloat)</li>
  <li>Blood in vomit that looks like coffee grounds</li>
  <li>Profuse bloody diarrhea</li>
  <li>Vomiting + lethargy + pale gums</li>
  <li>Known or suspected toxin ingestion</li>
  <li>Unvaccinated puppy with bloody diarrhea (suspect parvo)</li>
  <li>Foreign object known to have been swallowed</li>
  <li>Signs of dehydration in a small dog or puppy</li>
</ul>
<h2 id="bland-diet">The Bland Diet in Detail</h2>
<p>Boiled chicken and rice works because it's highly digestible, low in fat, and low in fiber — giving the GI tract minimal work to do while recovering.</p>
<ul>
  <li><strong>Chicken:</strong> Boneless, skinless breast. Boil until fully cooked. Shred or dice.</li>
  <li><strong>Rice:</strong> Plain white rice (not brown — too much fiber). Cook fully, no seasoning, no butter.</li>
  <li><strong>Ratio:</strong> 1 part chicken to 3 parts rice by volume</li>
  <li><strong>Amount:</strong> Same daily calories as normal food, split into 3–4 small meals</li>
  <li><strong>Transition back:</strong> Day 3–4 mix 75% bland + 25% regular food; Day 5–6 mix 50/50; Day 7 back to regular</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> One or two vomiting episodes or one episode of loose stool in an otherwise healthy, alert dog is almost always minor. A 6–12 hour fast followed by bland diet resolves most cases. Blood in vomit or stool, bloated abdomen, lethargy alongside GI symptoms, or an unvaccinated puppy require immediate vet contact.</div>`,
    related:[{url:'/health/is-my-dog-sick.html',title:'Is My Dog Sick?'},{url:'/health/parvovirus.html',title:'Parvovirus in Dogs'},{url:'/nutrition/toxic-foods.html',title:'Toxic Foods for Dogs'}]
  },

  {
    slug:'vaccination-schedule',
    title:'Dog Vaccination Schedule — Puppy & Adult',
    metaDesc:'Complete dog vaccination schedule for puppies and adult dogs. Core vs. non-core vaccines, timing, and what each vaccine protects against.',
    heroTag:'Preventive Care',heroBg:BG,
    h1:'Dog Vaccination Schedule — <span class="hl">Puppy & Adult</span>',
    desc:"Core vaccines, booster timing, and what each shot actually protects against. Everything you need to know in one place.",
    readTime:'7 min read',level:null,
    toc:[{id:'core',label:'Core vs. Non-Core Vaccines'},{id:'puppy',label:'Puppy Schedule'},{id:'adult',label:'Adult Booster Schedule'},{id:'each',label:'What Each Vaccine Does'}],
    body:`<p class="ga-lede">Vaccines are one of the most cost-effective things you'll ever do for your dog's health. The diseases they prevent — parvovirus, distemper, rabies — are highly contagious, difficult to treat, and often fatal. Understanding the schedule helps you ensure nothing is missed and gives you context for why certain boosters are given at certain intervals.</p>
<h2 id="core">Core vs. Non-Core Vaccines</h2>
<p><strong>Core vaccines</strong> are recommended for all dogs regardless of lifestyle. <strong>Non-core vaccines</strong> depend on your dog's risk factors (lifestyle, location, exposure).</p>
<table class="ga-table">
  <thead><tr><th>Vaccine</th><th>Type</th><th>Protects Against</th></tr></thead>
  <tbody>
    <tr><td>Rabies</td><td>Core — legally required in most states</td><td>Rabies virus (fatal, transmissible to humans)</td></tr>
    <tr><td>DHPP (or DA2PP)</td><td>Core — combination vaccine</td><td>Distemper, Hepatitis, Parvovirus, Parainfluenza</td></tr>
    <tr><td>Bordetella</td><td>Non-core (required by most daycares/boarding)</td><td>Kennel cough</td></tr>
    <tr><td>Leptospirosis</td><td>Non-core (recommended for outdoor/water exposure)</td><td>Leptospira bacteria (also transmissible to humans)</td></tr>
    <tr><td>Lyme</td><td>Non-core (tick-endemic areas)</td><td>Borrelia burgdorferi</td></tr>
    <tr><td>Canine Influenza</td><td>Non-core (high-exposure dogs)</td><td>H3N8 and H3N2 flu strains</td></tr>
  </tbody>
</table>
<h2 id="puppy">Puppy Vaccination Schedule</h2>
<table class="ga-table">
  <thead><tr><th>Age</th><th>Vaccines</th></tr></thead>
  <tbody>
    <tr><td>6–8 weeks</td><td>DHPP #1 (given by breeder/shelter)</td></tr>
    <tr><td>10–12 weeks</td><td>DHPP #2, Bordetella, Leptospirosis #1 (optional)</td></tr>
    <tr><td>14–16 weeks</td><td>DHPP #3, Rabies, Leptospirosis #2 (optional)</td></tr>
    <tr><td>12–16 months</td><td>DHPP booster, Rabies booster, Leptospirosis annual (if doing)</td></tr>
  </tbody>
</table>
<div class="warning-box"><strong>⚠️ Until 16 weeks:</strong> Puppies are not fully protected until 1–2 weeks after their final puppy DHPP. Limit exposure to unknown dogs and public areas until then. This does not mean isolation — controlled socialization is still important.</div>
<h2 id="adult">Adult Booster Schedule</h2>
<ul>
  <li><strong>DHPP:</strong> Booster at 1 year, then every 3 years (or titer testing to confirm ongoing immunity)</li>
  <li><strong>Rabies:</strong> State law varies — 1-year or 3-year rabies vaccines available. Your vet will follow local requirements.</li>
  <li><strong>Bordetella:</strong> Annually, or every 6 months for dogs frequently in boarding/daycare</li>
  <li><strong>Leptospirosis:</strong> Annually if recommended for your area</li>
  <li><strong>Lyme:</strong> Annually if in tick-endemic area</li>
</ul>
<h2 id="each">What Each Vaccine Actually Does</h2>
<ul>
  <li><strong>Distemper:</strong> Attacks respiratory, GI, and nervous systems. Highly contagious, often fatal. No cure — only supportive care.</li>
  <li><strong>Parvovirus:</strong> Destroys intestinal lining causing massive hemorrhagic diarrhea. Survival rate without intensive treatment is low. Virus survives in environment for over a year.</li>
  <li><strong>Adenovirus/Hepatitis:</strong> Viral liver disease. Rare in vaccinated populations.</li>
  <li><strong>Rabies:</strong> 100% fatal once neurological symptoms appear. Legally required because it's also fatal in humans.</li>
  <li><strong>Bordetella:</strong> Causes kennel cough — highly contagious respiratory illness. Rarely fatal in healthy adults; dangerous for puppies and immunocompromised dogs.</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> The core puppy series (DHPP + Rabies) is non-negotiable for all dogs. Non-core vaccines should be discussed with your vet based on your dog's lifestyle. An annual wellness exam is the best time to review the vaccination schedule and make adjustments.</div>`,
    related:[{url:'/health/parvovirus.html',title:'Parvovirus in Dogs'},{url:'/health/kennel-cough.html',title:'Kennel Cough'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'}]
  },

  {
    slug:'flea-tick-heartworm',
    title:'Flea, Tick & Heartworm Prevention Guide',
    metaDesc:'Complete guide to flea, tick, and heartworm prevention for dogs. Types of preventives, how they work, and what to use.',
    heroTag:'Preventive Care',heroBg:BG,
    h1:'Flea, Tick & Heartworm <span class="hl">Prevention</span>',
    desc:"Prevention is dramatically easier and cheaper than treatment. Here's what to use, how it works, and how often.",
    readTime:'8 min read',level:null,
    toc:[{id:'why',label:'Why Prevention Matters'},{id:'heartworm',label:'Heartworm Prevention'},{id:'flea-tick',label:'Flea & Tick Prevention'},{id:'types',label:'Types of Preventives'},{id:'year-round',label:'Year-Round vs. Seasonal'}],
    body:`<p class="ga-lede">Flea infestations, tick-borne diseases, and heartworm are all far easier — and cheaper — to prevent than to treat. A $50/year heartworm preventive replaces an $800–$1,500 heartworm treatment. A monthly flea preventive replaces a 3-month battle to rid your home of a flea infestation. Prevention is one of the most financially sound investments in your dog's health.</p>
<h2 id="why">Why Prevention Matters</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><div class="hl-emoji">🦟</div><strong>Heartworm</strong><span>Transmitted by mosquitoes. Lives in heart & lungs. Treatment: $800–$1,500+ and months of restricted activity.</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🦟</div><strong>Fleas</strong><span>One flea becomes 50 in 3 weeks. Infest home, carpets, and furniture. Treatment: weeks to months.</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🕷️</div><strong>Ticks</strong><span>Carry Lyme disease, ehrlichiosis, anaplasmosis. Can transmit within 24–48 hours of attachment.</span></div>
</div>
<h2 id="heartworm">Heartworm Prevention</h2>
<p>Heartworm (Dirofilaria immitis) is a potentially fatal parasite transmitted by mosquito bites. The larvae (microfilariae) migrate through the bloodstream and mature into worms in the heart and pulmonary arteries. A heavily infected dog may have 30–250 worms.</p>
<p><strong>Prevention:</strong> Monthly oral preventives (Heartgard, Interceptor, Simparica Trio) or a 12-month injectable (ProHeart 12). Preventives kill larvae from the previous month — they don't repel mosquitoes or kill adult worms.</p>
<p><strong>Testing:</strong> Annual heartworm blood test is essential. If a dog on preventive has a lapse and acquires heartworm, giving preventive to a heartworm-positive dog can trigger a severe reaction.</p>
<h2 id="flea-tick">Flea & Tick Prevention</h2>
<p>Fleas and ticks are year-round concerns in most of the US. Even indoor dogs can get fleas (carried in on shoes, other pets, or by squirrels on the property).</p>
<p><strong>How flea infestations work:</strong> The adult flea on your dog is only 5% of the flea population. The other 95% are eggs, larvae, and pupae in your carpets, furniture, and yard. This is why treating the dog alone doesn't resolve an infestation — the environment must be treated too.</p>
<h2 id="types">Types of Preventives Compared</h2>
<table class="ga-table">
  <thead><tr><th>Product</th><th>Covers</th><th>Form</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>Simparica Trio</td><td>Heartworm, fleas, ticks, mites, intestinal worms</td><td>Oral chew</td><td>Monthly</td></tr>
    <tr><td>NexGard</td><td>Fleas, ticks</td><td>Oral chew</td><td>Monthly</td></tr>
    <tr><td>Bravecto</td><td>Fleas, ticks</td><td>Oral chew or topical</td><td>3 months (oral) / 12 weeks (topical)</td></tr>
    <tr><td>Heartgard Plus</td><td>Heartworm, hookworms, roundworms</td><td>Oral chew</td><td>Monthly</td></tr>
    <tr><td>Frontline Plus</td><td>Fleas, ticks</td><td>Topical</td><td>Monthly</td></tr>
    <tr><td>Seresto Collar</td><td>Fleas, ticks</td><td>Collar</td><td>8 months</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>💡 Combination products</strong> (Simparica Trio, Sentinel Spectrum, Revolution Plus) cover multiple parasites in one dose and are often more cost-effective than multiple separate products. Ask your vet what's appropriate for your region.</div>
<h2 id="year-round">Year-Round vs. Seasonal</h2>
<p>Year-round prevention is recommended by most veterinary organizations because:</p>
<ul>
  <li>Mosquitoes can be active above 50°F — a warm winter day can expose dogs to heartworm risk</li>
  <li>Indoor dogs are not immune — fleas and mosquitoes enter homes</li>
  <li>Consistency reduces the risk of forgetting to restart at the right time</li>
  <li>Some products offer broader spectrum coverage when used continuously</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Year-round heartworm, flea, and tick prevention is one of the highest-ROI investments in your dog's health. A single product like Simparica Trio or Sentinel Spectrum covers most of the major parasites in one monthly dose for $50–$100/year — a fraction of what treating any of these conditions costs.</div>`,
    related:[{url:'/health/vaccination-schedule.html',title:'Vaccination Schedule'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'},{url:'/health/kennel-cough.html',title:'Kennel Cough'}]
  },

  {
    slug:'vet-visit-frequency',
    title:'How Often Should Your Dog See a Vet?',
    metaDesc:'How often do dogs need to go to the vet? Puppy schedule, adult annual exams, senior dog frequency, and what each visit includes.',
    heroTag:'Preventive Care',heroBg:BG,
    h1:'How Often Should Your Dog <span class="hl">See a Vet?</span>',
    desc:"Puppies need frequent vet visits. Adults need annual exams. Seniors need biannual checkups. Here's exactly what to expect at each stage.",
    readTime:'6 min read',level:null,
    toc:[{id:'puppy',label:'Puppy Visits'},{id:'adult',label:'Adult Wellness Exams'},{id:'senior',label:'Senior Dogs'},{id:'what-included',label:'What\'s Included in a Wellness Exam'},{id:'cost',label:'What It Costs'}],
    body:`<p class="ga-lede">The frequency of vet visits changes dramatically through your dog's life stages. Puppies need visits nearly monthly; healthy adult dogs need a single annual wellness exam; senior dogs benefit from twice-yearly checkups. Understanding what each visit covers helps you make the most of every appointment and catch problems early.</p>
<h2 id="puppy">Puppy Visits (0–12 months)</h2>
<p>Puppies need the most frequent vet visits because their vaccine series requires multiple appointments and because this is the period when congenital defects and early health issues are most often detected.</p>
<table class="ga-table">
  <thead><tr><th>Timing</th><th>What Happens</th></tr></thead>
  <tbody>
    <tr><td>6–8 weeks</td><td>First exam, first DHPP, deworming, health record established</td></tr>
    <tr><td>10–12 weeks</td><td>DHPP booster, optional non-core vaccines, discuss nutrition and training</td></tr>
    <tr><td>14–16 weeks</td><td>Final puppy DHPP, rabies vaccine, discuss spay/neuter timing</td></tr>
    <tr><td>5–6 months</td><td>Spay/neuter consultation; pre-surgical bloodwork</td></tr>
    <tr><td>12 months</td><td>First annual wellness exam, DHPP booster, rabies booster if due</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>💡 Happy visits:</strong> Take your puppy to the vet just for treats and petting — no procedures — 1–2 times during the puppy stage. This makes the vet office a positive place and dramatically reduces anxiety at real appointments.</div>
<h2 id="adult">Adult Wellness Exams (1–7 years)</h2>
<p>Healthy adult dogs need one annual wellness exam. This is not the same as a "shots appointment" — it's a full-body physical examination plus whatever vaccines are due, plus discussion of diet, weight, dental health, and any concerns.</p>
<p>The annual exam is valuable because dogs age roughly 5–7 times faster than humans — a year between exams is equivalent to 5–7 years between human physicals. Conditions like heart disease, dental disease, joint problems, and tumors can progress significantly in that time.</p>
<h2 id="senior">Senior Dogs (7+ years, or earlier for large breeds)</h2>
<p>Senior dogs benefit from twice-yearly wellness exams. Many vets recommend biannual bloodwork and urinalysis for seniors to catch kidney disease, liver disease, diabetes, and thyroid conditions before they progress to symptomatic stages.</p>
<p>Large breeds are considered senior at 5–6 years; small breeds at 7–8 years. See our <a href="/health/when-is-dog-senior.html">senior dog guide</a> for more detail.</p>
<h2 id="what-included">What's Included in a Wellness Exam</h2>
<ul>
  <li>Full nose-to-tail physical examination (eyes, ears, mouth, lymph nodes, heart, lungs, abdomen, skin, joints)</li>
  <li>Weight check and body condition scoring</li>
  <li>Vaccines due per schedule</li>
  <li>Heartworm test (annual)</li>
  <li>Fecal test (checks for intestinal parasites)</li>
  <li>Dental assessment</li>
  <li>Discussion of any behavioral or health concerns</li>
  <li>Prescription renewals for medications/preventives</li>
</ul>
<h2 id="cost">What a Wellness Exam Costs</h2>
<p>Annual wellness exam (exam fee + core vaccines + heartworm test): $150–$400 depending on your region and clinic type. Adding bloodwork for seniors: $100–$300 more. Veterinary specialty clinics and emergency hospitals charge more; low-cost clinics and humane societies often offer reduced-cost vaccine clinics.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Puppies: every 3–4 weeks until 16 weeks. Adult dogs: annually. Seniors: every 6 months. The annual exam is not optional if you want to catch problems early — most serious conditions detected at a wellness exam are treatable; the same conditions found a year later when symptoms appear may not be.</div>`,
    related:[{url:'/health/vaccination-schedule.html',title:'Vaccination Schedule'},{url:'/health/when-is-dog-senior.html',title:'When Is a Dog Senior?'},{url:'/health/healthy-weight.html',title:'Is My Dog a Healthy Weight?'}]
  },

  {
    slug:'healthy-weight',
    title:'Is My Dog a Healthy Weight? Body Condition Score Guide',
    metaDesc:'How to tell if your dog is overweight, underweight, or ideal weight using body condition scoring. Plus how to help an overweight dog lose weight safely.',
    heroTag:'Preventive Care',heroBg:BG,
    h1:'Is My Dog a <span class="hl">Healthy Weight?</span>',
    desc:"Scale weight alone doesn't tell the story. Here's how to assess body condition and what to do if your dog is overweight.",
    readTime:'7 min read',level:null,
    toc:[{id:'bcs',label:'Body Condition Score'},{id:'assess',label:'How to Assess at Home'},{id:'overweight',label:'If Your Dog Is Overweight'},{id:'risks',label:'Health Risks of Obesity'},{id:'weight-loss',label:'Safe Weight Loss'}],
    body:`<p class="ga-lede">Over 55% of dogs in the US are overweight or obese according to veterinary surveys — and most of their owners don't realize it. "My vet said they need to lose weight" is one of the most common surprises at annual exams. Scale weight is an imperfect measure because healthy weights vary enormously even within a breed. Body Condition Scoring (BCS) is the gold-standard assessment and can be done at home in 60 seconds.</p>
<h2 id="bcs">The Body Condition Score (BCS) Scale</h2>
<p>BCS is scored on a 9-point scale (or 5-point scale at some vets). The ideal score is 4–5 out of 9.</p>
<table class="ga-table">
  <thead><tr><th>Score</th><th>Description</th><th>What You See/Feel</th></tr></thead>
  <tbody>
    <tr><td>1–2</td><td>Severely underweight</td><td>Ribs, spine, hip bones visible from across the room; no fat cover</td></tr>
    <tr><td>3</td><td>Underweight</td><td>Ribs easily visible, pronounced waist</td></tr>
    <tr><td>4–5</td><td>Ideal</td><td>Ribs felt easily without pressing, visible waist from above, abdominal tuck when viewed from side</td></tr>
    <tr><td>6–7</td><td>Overweight</td><td>Ribs felt only with firm pressure, waist barely discernible, no abdominal tuck</td></tr>
    <tr><td>8–9</td><td>Obese</td><td>Ribs cannot be felt under fat cover; no waist; distended abdomen</td></tr>
  </tbody>
</table>
<h2 id="assess">How to Assess at Home</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Rib check</strong><br>Run your thumbs along the spine and fingers along the ribcage with gentle pressure. You should feel individual ribs easily without pressing hard. If you have to push to find them — overweight. If you can see them from across the room — underweight.</div></li>
  <li><div class="step-content"><strong>Overhead view</strong><br>Look down at your dog from above. An ideal dog has a visible waist — the body narrows between the ribcage and hips. An overweight dog looks oval or rectangular from above.</div></li>
  <li><div class="step-content"><strong>Side view</strong><br>Look at the dog from the side. The abdomen should tuck up slightly behind the ribcage. A "hanging belly" suggests excess weight; a severely tucked abdomen suggests underweight.</div></li>
</ol>
<h2 id="overweight">If Your Dog Is Overweight</h2>
<p>Two main causes, in order of importance:</p>
<ul>
  <li><strong>Too many calories in:</strong> Overfeeding (measuring by "looks about right" vs. actual serving size), too many treats, table scraps, calorie-dense food</li>
  <li><strong>Too few calories out:</strong> Insufficient exercise for the dog's age and breed</li>
</ul>
<p>Less common but worth ruling out with bloodwork: hypothyroidism, Cushing's disease, and certain medications cause weight gain regardless of diet.</p>
<h2 id="risks">Health Risks of Excess Weight</h2>
<ul>
  <li>Joint disease and arthritis — significantly accelerated</li>
  <li>Diabetes mellitus</li>
  <li>Breathing difficulties (especially brachycephalic breeds)</li>
  <li>Reduced lifespan — studies show dogs at ideal BCS live 1.5–2 years longer than overweight counterparts</li>
  <li>Increased surgical risk (fat increases complications under anesthesia)</li>
  <li>Heart disease and high blood pressure</li>
</ul>
<h2 id="weight-loss">Safe Weight Loss</h2>
<ul>
  <li><strong>Target 1–2% body weight loss per week</strong> — faster is unsafe and often rebounds</li>
  <li><strong>Measure all food accurately</strong> — use a kitchen scale, not a measuring cup (cups have high variability)</li>
  <li><strong>Reduce treats to 10% or less of daily calories</strong> — or use the dog's kibble as treats during training</li>
  <li><strong>Switch to a weight management or high-protein, lower-fat formula</strong> — your vet can recommend specific prescription options for significant weight issues</li>
  <li><strong>Add 10–15 minutes of additional daily exercise</strong> — even a slow walk adds to calorie deficit</li>
  <li><strong>Recheck weight monthly</strong> — adjust food amount if progress stalls</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> If you can't easily feel your dog's ribs with gentle pressure, they're likely overweight. The rib check takes 10 seconds and is more accurate than scale weight alone. A 10–15% reduction in daily calories combined with increased exercise resolves most mild cases within 3–4 months.</div>`,
    related:[{url:'/nutrition/dog-overweight.html',title:'Dog Weight Loss Diet Guide'},{url:'/nutrition/daily-feeding-guide.html',title:'Daily Feeding Guide'},{url:'/health/dog-arthritis.html',title:'Arthritis in Dogs'}]
  },

  {
    slug:'kennel-cough',
    title:'Kennel Cough — Symptoms, Treatment & Prevention',
    metaDesc:'Kennel cough symptoms, treatment options, and how to prevent it. What it sounds like, how long it lasts, and when to see a vet.',
    heroTag:'Common Illnesses',heroBg:BG,
    h1:'Kennel Cough — <span class="hl">Symptoms & Treatment</span>',
    desc:"That distinctive honking cough after boarding or the dog park. What kennel cough is, how long it lasts, and when to worry.",
    readTime:'6 min read',level:null,
    toc:[{id:'what',label:'What Is Kennel Cough?'},{id:'symptoms',label:'Symptoms'},{id:'treatment',label:'Treatment at Home'},{id:'vet',label:'When to See the Vet'},{id:'prevention',label:'Prevention'}],
    body:`<p class="ga-lede">Kennel cough is the canine equivalent of a common cold — highly contagious, typically self-limiting, and miserable for a week or two but rarely dangerous in healthy adult dogs. The name comes from its traditional association with boarding facilities, though it can be contracted anywhere dogs gather: dog parks, grooming salons, obedience classes, and vet waiting rooms.</p>
<h2 id="what">What Is Kennel Cough?</h2>
<p>Kennel cough (Canine Infectious Respiratory Disease Complex, or CIRD) is a catch-all term for highly contagious respiratory infections in dogs. The most common pathogen is <em>Bordetella bronchiseptica</em> bacteria, often combined with other viruses including Parainfluenza and Adenovirus-2. It spreads through airborne droplets, direct contact, and contaminated surfaces.</p>
<p>Transmission is rapid in group settings — one infected dog can infect dozens within days.</p>
<h2 id="symptoms">Symptoms</h2>
<ul>
  <li><strong>Distinctive "honking" cough</strong> — the most characteristic sign. Often sounds like something is stuck in the throat. Can be triggered by excitement, exercise, or pressure on the collar.</li>
  <li>Retching after coughing (may produce white foam)</li>
  <li>Mild nasal discharge</li>
  <li>Otherwise normal energy, appetite, and temperature in mild cases</li>
  <li>Symptoms typically begin 3–10 days after exposure</li>
</ul>
<div class="warning-box"><strong>⚠️ Not classic kennel cough:</strong> Lethargy, fever, loss of appetite, or difficulty breathing alongside coughing suggests pneumonia or a more serious condition. See your vet same day.</div>
<h2 id="treatment">Treatment at Home</h2>
<p>For mild kennel cough in healthy adult dogs:</p>
<ul>
  <li>Rest and avoid exercise that triggers coughing</li>
  <li>Switch to a harness instead of collar (collar pressure worsens coughing)</li>
  <li>Use a humidifier or steam from a hot shower to ease irritation</li>
  <li>Honey (1 teaspoon for medium dogs) can soothe throat irritation</li>
  <li>Keep the dog away from other dogs for 14 days or until 2 weeks after coughing resolves</li>
</ul>
<p>Most cases resolve on their own within 10–14 days.</p>
<h2 id="vet">When to See the Vet</h2>
<ul>
  <li>Puppies under 6 months — more susceptible to serious complications</li>
  <li>Senior or immunocompromised dogs</li>
  <li>Brachycephalic breeds (Bulldogs, Pugs) — reduced airway reserve makes respiratory illness more serious</li>
  <li>Symptoms lasting more than 3 weeks</li>
  <li>Fever, lethargy, or loss of appetite alongside coughing</li>
  <li>Breathing appears labored or dog is breathing with open mouth</li>
</ul>
<p>Antibiotics (typically doxycycline) are sometimes prescribed to address the Bordetella component and may shorten duration and reduce complications. Cough suppressants are occasionally appropriate but should not be used without vet guidance — suppressing the cough in cases with mucus can worsen pneumonia risk.</p>
<h2 id="prevention">Prevention</h2>
<ul>
  <li><strong>Bordetella vaccine:</strong> Reduces risk and severity. Available as intranasal, oral, and injectable forms. Required by most boarding facilities and doggy daycares.</li>
  <li><strong>DHPP vaccine:</strong> Covers Parainfluenza and Adenovirus-2, two components of kennel cough complex</li>
  <li><strong>Avoid high-density dog areas</strong> during local outbreaks</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Kennel cough in a healthy adult dog is generally a 10–14 day inconvenience, not a crisis. Rest, harness instead of collar, and isolation from other dogs. See the vet if: puppies, seniors, or immunocompromised dogs are affected; breathing seems labored; or symptoms persist beyond 3 weeks.</div>`,
    related:[{url:'/health/vaccination-schedule.html',title:'Vaccination Schedule'},{url:'/health/is-my-dog-sick.html',title:'Is My Dog Sick?'},{url:'/health/flea-tick-heartworm.html',title:'Parasite Prevention'}]
  },

  {
    slug:'hip-dysplasia',
    title:'Hip Dysplasia in Dogs — Signs, Treatment & Management',
    metaDesc:'Hip dysplasia in dogs explained — what it is, which breeds are affected, signs to watch for, and treatment options from conservative to surgical.',
    heroTag:'Joint Health',heroBg:BG,
    h1:'Hip Dysplasia in Dogs — <span class="hl">Signs & Treatment</span>',
    desc:"Hip dysplasia affects millions of dogs, especially large breeds. Catching it early dramatically improves outcomes.",
    readTime:'8 min read',level:null,
    toc:[{id:'what',label:'What Is Hip Dysplasia?'},{id:'signs',label:'Signs to Watch For'},{id:'diagnosis',label:'Diagnosis'},{id:'treatment',label:'Treatment Options'},{id:'management',label:'Long-Term Management'}],
    body:`<p class="ga-lede">Hip dysplasia is one of the most common orthopedic conditions in dogs — and one of the most misunderstood. It's often thought of as an "old dog problem," but the structural abnormality develops during growth and signs can appear in puppies as young as 4–6 months. Early intervention can dramatically slow progression and preserve quality of life for years. This guide explains what's actually happening, what to look for, and what the treatment options are.</p>
<h2 id="what">What Is Hip Dysplasia?</h2>
<p>The hip joint is a ball-and-socket joint. In a normal hip, the ball (femoral head) fits snugly into the socket (acetabulum), allowing smooth, pain-free movement. In hip dysplasia, the joint doesn't develop correctly — the ball and socket don't fit properly, causing instability, abnormal wear, and eventually severe osteoarthritis.</p>
<p>Hip dysplasia has a significant genetic component and is especially common in large and giant breeds: German Shepherds, Golden Retrievers, Labrador Retrievers, Rottweilers, Great Danes, and Saint Bernards. It also occurs in medium and small breeds, though less frequently.</p>
<h2 id="signs">Signs to Watch For</h2>
<p>Signs vary by age:</p>
<h3>Young dogs (4 months – 2 years)</h3>
<ul>
  <li>Bunny-hopping gait when running (using both back legs simultaneously)</li>
  <li>Reluctance to exercise or play, tiring quickly</li>
  <li>Difficulty rising after rest</li>
  <li>"Waddling" when walking</li>
  <li>Pain when hips are manipulated</li>
</ul>
<h3>Adult and senior dogs</h3>
<ul>
  <li>Stiffness getting up in the morning, improving with movement</li>
  <li>Progressive exercise intolerance</li>
  <li>Visible muscle loss over the hindquarters (disuse atrophy)</li>
  <li>Reluctance to climb stairs, jump, or squat for bowel movements</li>
  <li>Clicking sound from hip during movement</li>
</ul>
<h2 id="diagnosis">Diagnosis</h2>
<p>Diagnosis requires X-rays under sedation or anesthesia (muscle tension when awake affects positioning). A vet can often detect hip laxity during a physical exam with the Ortolani sign test, but X-rays confirm severity. The OFA (Orthopedic Foundation for Animals) rates hips as Excellent, Good, Fair, Borderline, Mild, Moderate, or Severe.</p>
<h2 id="treatment">Treatment Options</h2>
<p>Treatment depends on age, severity, and the dog's quality of life:</p>
<h3>Non-Surgical (Conservative) Management</h3>
<ul>
  <li>Weight management — every extra pound increases joint stress significantly</li>
  <li>Low-impact exercise (swimming, controlled leash walks) to maintain muscle without joint impact</li>
  <li>NSAIDs (Carprofen, Meloxicam) for pain and inflammation — prescription only, never human NSAIDs</li>
  <li>Joint supplements: glucosamine, chondroitin, omega-3 fatty acids (modest evidence of benefit)</li>
  <li>Physical rehabilitation (canine physiotherapy)</li>
</ul>
<h3>Surgical Options</h3>
<ul>
  <li><strong>Triple Pelvic Osteotomy (TPO):</strong> For young dogs with no arthritis yet — reshapes the socket for better joint coverage. Best results before 18 months.</li>
  <li><strong>Femoral Head Ostectomy (FHO):</strong> Removes the femoral head, allowing scar tissue to form a "false joint." Good for smaller dogs and those not candidates for total hip replacement.</li>
  <li><strong>Total Hip Replacement (THR):</strong> The most effective surgical option — replaces the entire hip joint with a prosthetic. Success rate over 95% in appropriate candidates. Cost: $3,500–$7,000 per hip.</li>
</ul>
<h2 id="management">Long-Term Management</h2>
<ul>
  <li>Maintain ideal body weight (the most impactful single thing you can do)</li>
  <li>Non-slip surfaces at home (rugs over hardwood/tile)</li>
  <li>Ramps for cars and furniture access</li>
  <li>Orthopedic foam beds (reduce pressure on joints)</li>
  <li>Regular, low-impact daily exercise (inactivity worsens muscle atrophy)</li>
  <li>Monitor pain levels and adjust medication with your vet as needed</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Hip dysplasia is manageable, not a death sentence. Caught early, with weight management, appropriate exercise, and pain control, most dogs with mild-to-moderate hip dysplasia live comfortable, active lives. Severe cases benefit from surgical intervention, especially when performed before significant arthritis develops.</div>`,
    related:[{url:'/health/dog-arthritis.html',title:'Arthritis in Dogs'},{url:'/health/limping.html',title:'Dog Limping'},{url:'/health/healthy-weight.html',title:'Is My Dog a Healthy Weight?'}]
  },

  {
    slug:'dog-allergies',
    title:'Dog Allergies — Skin, Food & Environmental',
    metaDesc:'Dog allergies explained — signs of skin, food, and environmental allergies in dogs, how they\'re diagnosed, and treatment options.',
    heroTag:'Common Illnesses',heroBg:BG,
    h1:'Dog Allergies — <span class="hl">Skin, Food & Environmental</span>',
    desc:"Itching, ear infections, paw licking — allergies are one of the most common chronic conditions in dogs. Here's how to identify and manage them.",
    readTime:'9 min read',level:null,
    toc:[{id:'types',label:'Types of Allergies'},{id:'signs',label:'Signs of Allergies'},{id:'food',label:'Food Allergies'},{id:'environmental',label:'Environmental Allergies'},{id:'treatment',label:'Treatment Options'}],
    body:`<p class="ga-lede">Allergies are one of the most common chronic conditions veterinarians treat — and one of the most frustrating for owners, because the same symptoms (itching, ear infections, paw licking) can have multiple different causes, and identifying the specific trigger requires detective work. This guide explains what dog allergies actually are, how they differ from each other, and what treatment options actually work.</p>
<h2 id="types">Types of Allergies in Dogs</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><div class="hl-emoji">🍗</div><strong>Food Allergy</strong><span>Reaction to a specific protein (usually chicken, beef, dairy, or wheat)</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🌿</div><strong>Environmental (Atopy)</strong><span>Reaction to pollen, dust mites, mold, grass</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🦟</div><strong>Flea Allergy Dermatitis</strong><span>Allergic reaction to flea saliva — even one bite can cause severe reaction</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🧴</div><strong>Contact Allergy</strong><span>Reaction to something the skin touches (cleaning products, synthetic materials)</span></div>
</div>
<h2 id="signs">Signs Your Dog Has Allergies</h2>
<ul>
  <li>Persistent itching (scratching, biting, rubbing against furniture)</li>
  <li>Recurrent ear infections (often the first sign of food or environmental allergies)</li>
  <li>Paw licking or chewing (red-stained fur between toes)</li>
  <li>Skin redness, hives, or rash</li>
  <li>Hair loss from excessive scratching</li>
  <li>Chronic skin infections (secondary to scratching-related bacteria and yeast)</li>
  <li>Anal scooting (can be allergy-related pruritus)</li>
</ul>
<p>Seasonal pattern suggests environmental (pollen) allergies. Year-round symptoms suggest food allergy or dust mite allergy. Symptoms that clear up with flea treatment point to flea allergy dermatitis.</p>
<h2 id="food">Food Allergies</h2>
<p>True food allergies in dogs are an immune response to a specific protein. The most common culprits: beef, chicken, dairy, wheat, and eggs. Note that "food sensitivity" (GI upset) is different from a true immune-mediated food allergy (skin symptoms).</p>
<p><strong>Diagnosis:</strong> The only reliable way to diagnose a food allergy is a strict elimination diet trial (8–12 weeks) using a novel protein diet (a protein the dog has never eaten) or a hydrolyzed protein diet. Commercial allergy testing through blood or saliva is not scientifically validated — avoid it.</p>
<p><strong>Treatment:</strong> Avoidance of the allergen. Once the trigger protein is identified, feed a diet that doesn't contain it. Read ingredient labels carefully — "chicken flavor" products often contain chicken proteins.</p>
<h2 id="environmental">Environmental Allergies (Atopy)</h2>
<p>Environmental allergies are the most common type in dogs. The dog's immune system overreacts to inhaled or skin-contact environmental proteins (pollen, dust mites, mold spores). Atopy typically develops between 1–3 years of age and is often breed-specific (Golden Retrievers, Bulldogs, Boxers, and West Highland Terriers are highly predisposed).</p>
<p><strong>Diagnosis:</strong> Intradermal skin testing (performed by a veterinary dermatologist) or serum allergy testing identifies specific triggers. Blood testing is more available but less accurate than skin testing.</p>
<p><strong>Treatment options:</strong></p>
<ul>
  <li><strong>Apoquel (oclacitinib)</strong> — oral daily medication. Fast-acting, highly effective for reducing itch. Requires prescription.</li>
  <li><strong>Cytopoint (lokivetmab)</strong> — monthly injection. Targets the itch signal directly. Excellent safety profile, no daily pill required.</li>
  <li><strong>Immunotherapy (allergy shots/drops)</strong> — gradually desensitizes the dog to specific allergens. Takes 6–12 months to see results but can reduce or eliminate need for medication long-term.</li>
  <li><strong>Fatty acid supplementation</strong> — omega-3s support skin barrier function and have modest anti-inflammatory effects</li>
  <li><strong>Regular bathing</strong> — washing off environmental allergens from the coat can significantly reduce symptoms</li>
</ul>
<h2 id="treatment">Finding the Right Treatment Plan</h2>
<p>Most dogs with allergies need a combination approach and may need periodic adjustments. Work with your vet to identify the likely allergy type first, then build a management plan. A veterinary dermatologist referral is worth it for complex or uncontrolled cases — they're the specialists in this area.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Chronic itching is not something dogs should just "live with." Effective treatments exist — Apoquel and Cytopoint have transformed allergy management for millions of dogs. Start with your primary vet, rule out flea allergy first (it's the most treatable), then work systematically toward food or environmental causes.</div>`,
    related:[{url:'/health/is-my-dog-sick.html',title:'Is My Dog Sick?'},{url:'/grooming/how-often-bathe-dog.html',title:'How Often to Bathe Your Dog'},{url:'/nutrition/choose-dog-food.html',title:'How to Choose the Best Dog Food'}]
  },

  {
    slug:'parvovirus',
    title:'Parvovirus in Dogs — Symptoms, Prevention & Survival',
    metaDesc:'Everything about parvovirus in dogs — symptoms, how it spreads, survival rates, and why vaccination is so critical.',
    heroTag:'Serious Illnesses',heroBg:BG,
    h1:'Parvovirus in Dogs — <span class="hl">Symptoms & Prevention</span>',
    desc:"Parvo is one of the most dangerous diseases for unvaccinated puppies. Here's what it is, what it looks like, and how to prevent it.",
    readTime:'7 min read',level:null,
    toc:[{id:'what',label:'What Is Parvo?'},{id:'symptoms',label:'Symptoms'},{id:'survival',label:'Survival Rates'},{id:'prevention',label:'Prevention'},{id:'environment',label:'Environmental Persistence'}],
    body:`<p class="ga-lede">Canine parvovirus is one of the most feared puppy diseases for good reason. It's highly contagious, extremely hardy in the environment (can survive 6–12 months outdoors), and was once nearly always fatal. Today, with intensive veterinary care, survival rates of 80–95% are achievable — but treatment is expensive, intense, and not always successful. Prevention through vaccination is vastly preferable.</p>
<h2 id="what">What Is Parvovirus?</h2>
<p>Parvovirus type 2 (CPV-2) attacks rapidly dividing cells — primarily the intestinal lining and bone marrow. The destruction of intestinal cells causes the intestinal barrier to fail, allowing bacteria from the gut to enter the bloodstream (sepsis). Simultaneously, bone marrow destruction reduces white blood cells, crippling the immune response. This combination is what makes parvo so lethal without intensive support.</p>
<p>The virus spreads through feces of infected dogs. Direct dog-to-dog contact is not required — the virus lives on surfaces, soil, clothing, and shoes. An unvaccinated puppy can contract parvo from a yard that hasn't had a sick dog for months.</p>
<h2 id="symptoms">Symptoms</h2>
<p>Symptoms typically appear 3–7 days after exposure and progress rapidly:</p>
<ul>
  <li><strong>Day 1–2:</strong> Lethargy, loss of appetite, vomiting</li>
  <li><strong>Day 2–3:</strong> Severe, watery diarrhea — often bloody, with a distinctive foul smell</li>
  <li><strong>Rapidly:</strong> Dehydration, weakness, pale gums, collapse</li>
</ul>
<div class="warning-box"><strong>⚠️ Emergency:</strong> An unvaccinated or incompletely vaccinated puppy with bloody diarrhea and vomiting must be treated as a potential parvo emergency. Time is critical — survival rates drop significantly with each hour of delayed treatment.</div>
<h2 id="survival">Survival Rates & Treatment</h2>
<p>Untreated parvo: approximately 10–20% survival.<br>With intensive veterinary care: 80–95% survival.</p>
<p>Treatment is supportive — there's no antiviral drug. Dogs are hospitalized for IV fluids to combat dehydration, antibiotics to prevent secondary bacterial infection (due to compromised intestinal barrier), anti-nausea medication, nutritional support, and sometimes plasma transfusions. Treatment typically costs $1,500–$4,000+ and lasts 5–7 days minimum.</p>
<p>Some clinics offer outpatient protocols for resource-limited situations — ask your vet if this is an option when cost is a barrier. Outpatient treatment has lower survival rates than full hospitalization.</p>
<h2 id="prevention">Prevention — Vaccination</h2>
<p>The parvovirus vaccine (included in the DHPP combination) is one of the most effective vaccines in all of veterinary medicine. A fully vaccinated dog has over 99% protection against clinical parvovirus disease.</p>
<p><strong>Puppy vaccination series:</strong></p>
<ul>
  <li>First dose: 6–8 weeks</li>
  <li>Second dose: 10–12 weeks</li>
  <li>Third dose: 14–16 weeks</li>
  <li>Puppies are not fully protected until 1–2 weeks after the final dose in the series</li>
</ul>
<p><strong>Until fully vaccinated:</strong> Avoid areas where unknown dogs have been (dog parks, sidewalks in high-dog-traffic areas, pet stores). Safe options: homes of vaccinated dogs, carrying the puppy in arms outdoors for socialization.</p>
<h2 id="environment">Environmental Persistence</h2>
<p>Parvovirus is extraordinarily hardy in the environment:</p>
<ul>
  <li>Survives outdoors in soil and surfaces for 6–12 months</li>
  <li>Resistant to most household cleaners — only bleach (1:32 dilution) reliably kills it on surfaces</li>
  <li>Survives freezing temperatures</li>
  <li>Can be carried on shoes, clothing, and hands from contaminated areas</li>
</ul>
<p>If you've had a parvo case in your home, treat all surfaces with bleach solution and avoid bringing unvaccinated puppies to the property for at least 12 months.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Parvo is preventable with vaccination and devastating without it. The puppy DHPP vaccine series is the single most important medical intervention for puppies under 4 months. Never skip it, never delay it, and keep puppies away from unknown dogs until the series is complete.</div>`,
    related:[{url:'/health/vaccination-schedule.html',title:'Vaccination Schedule'},{url:'/health/vomiting-diarrhea.html',title:'Vomiting & Diarrhea'},{url:'/health/is-my-dog-sick.html',title:'Is My Dog Sick?'}]
  },

  {
    slug:'brush-dog-teeth',
    title:'How to Brush Your Dog\'s Teeth — Step by Step',
    metaDesc:'How to brush your dog\'s teeth correctly. Step-by-step guide for dogs that hate teeth brushing, what toothpaste to use, and how often.',
    heroTag:'Dental Health',heroBg:BG,
    h1:'How to Brush Your Dog\'s <span class="hl">Teeth</span>',
    desc:"80% of dogs have gum disease by age 3. Brushing prevents it — here's how to actually get your dog to cooperate.",
    readTime:'7 min read',level:'Beginner',
    toc:[{id:'why',label:'Why It Matters'},{id:'supplies',label:'What You Need'},{id:'steps',label:'Step-by-Step Process'},{id:'resistant',label:'Dogs That Resist'},{id:'frequency',label:'How Often'}],
    body:`<p class="ga-lede">Dental disease is the most common health condition in dogs — 80% of dogs over age 3 have some degree of periodontal disease. Left untreated, it doesn't just cause bad breath and tooth loss; bacteria from infected gum tissue can enter the bloodstream and damage the heart, kidneys, and liver. Daily toothbrushing is the single most effective thing you can do for your dog's dental health — if you can get them to cooperate. Here's how.</p>
<h2 id="why">Why Brushing Matters</h2>
<p>Plaque forms on teeth within hours of eating. If not removed within 24–48 hours, it mineralizes into tartar (calculus) — a hard substance that cannot be removed by brushing and requires professional dental cleaning under anesthesia. Daily brushing removes plaque before it becomes tartar. Even brushing 3–4 times per week is significantly better than not brushing at all.</p>
<h2 id="supplies">What You Need</h2>
<ul>
  <li><strong>Dog toothpaste:</strong> Never use human toothpaste — fluoride and xylitol are toxic to dogs. Dog toothpaste comes in flavors like chicken, beef, and peanut butter. Dogs typically love it.</li>
  <li><strong>Toothbrush:</strong> Angled dog toothbrush, finger brush, or a small child's soft toothbrush. Finger brushes work well for dogs new to brushing.</li>
  <li><strong>High-value treats:</strong> Used as rewards throughout the training process.</li>
</ul>
<h2 id="steps">Step-by-Step Introduction</h2>
<p>Don't start by forcing a toothbrush into a dog's mouth. Spend 1–2 weeks on each stage:</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Week 1: Touch the muzzle</strong><br>Gently touch the outside of the dog's muzzle and lips for a few seconds. Reward with a treat. Repeat daily until the dog is relaxed with this touch.</div></li>
  <li><div class="step-content"><strong>Week 2: Touch the gums</strong><br>Gently lift the lip and touch a finger to the gum line. Hold for 2 seconds, release, reward. Progress around the mouth over several sessions.</div></li>
  <li><div class="step-content"><strong>Week 3: Introduce the toothpaste</strong><br>Put a small amount of toothpaste on your finger and let the dog lick it. This is the reward now — most dogs love the taste.</div></li>
  <li><div class="step-content"><strong>Week 4: Finger brush</strong><br>Wrap a washcloth or use a finger brush with toothpaste. Move it gently along the outside of the teeth at the gum line. Start with the canine teeth, then progress to the back molars.</div></li>
  <li><div class="step-content"><strong>Week 5+: Full toothbrush</strong><br>Introduce the toothbrush with toothpaste. Use the same circular or back-and-forth motion at the gum line. Focus on the outer surfaces (inside surfaces are less critical — the tongue cleans them naturally).</div></li>
</ol>
<h2 id="resistant">Dogs That Resist Brushing</h2>
<p>Never force the mouth open or hold the dog still against their will — this creates lasting aversion. Instead:</p>
<ul>
  <li>Go back one step in the introduction sequence and slow down</li>
  <li>Make every session end positively, even if you only managed 10 seconds</li>
  <li>Practice the motion on the outside of closed lips first</li>
  <li>Use the highest-value toothpaste flavor available</li>
  <li>If acceptance never comes: dental chews, water additives, and prescription dental diets provide supplementary benefit (though not equivalent to brushing)</li>
</ul>
<h2 id="frequency">How Often?</h2>
<p>Daily is ideal. Every other day is good. Three times a week shows significant benefit over no brushing. Once a week is better than nothing but doesn't prevent tartar accumulation well. Even consistent partial brushing (some teeth, some days) is better than no brushing at all.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Dental disease is expensive to treat ($300–$800 for a professional dental cleaning) and damaging to overall health. Daily brushing is free. Start the introduction process slowly — rushing it creates resistance that can last the dog's lifetime. Patient, positive introduction takes 4–6 weeks and pays off for years.</div>`,
    related:[{url:'/health/dental-disease.html',title:'Signs of Dental Disease'},{url:'/health/dental-chews.html',title:'Do Dental Chews Work?'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'}]
  },

  {
    slug:'dental-disease',
    title:'Signs of Dental Disease in Dogs',
    metaDesc:'How to spot dental disease in dogs early — signs of gum disease, tooth pain, and tartar buildup before they cause serious problems.',
    heroTag:'Dental Health',heroBg:BG,
    h1:'Signs of Dental Disease <span class="hl">in Dogs</span>',
    desc:"Dogs hide dental pain well. Here's how to spot gum disease, tooth pain, and tartar buildup before they become serious.",
    readTime:'6 min read',level:null,
    toc:[{id:'signs',label:'Signs of Dental Disease'},{id:'stages',label:'Stages of Periodontal Disease'},{id:'consequences',label:'Systemic Consequences'},{id:'treatment',label:'Treatment & Prevention'}],
    body:`<p class="ga-lede">Dogs are masters at hiding pain — dental pain especially. A dog with significant dental disease will still eat enthusiastically (or rather, they'll eat because the hunger drive outweighs the pain). This means dental disease often goes unnoticed until it's advanced. Knowing what to look for during routine at-home checks can catch problems early, when treatment is simpler and less expensive.</p>
<h2 id="signs">Signs of Dental Disease</h2>
<ul>
  <li><strong>Bad breath:</strong> The most universally noticed sign. Some "dog breath" is normal, but a strong, foul, or distinctly rotten odor is a sign of bacterial overgrowth from dental disease.</li>
  <li><strong>Yellow or brown tartar visible on teeth:</strong> Tartar accumulates most visibly on the upper back teeth (carnassial teeth) and upper canines. Brown discoloration at the gum line indicates calculus buildup.</li>
  <li><strong>Red, swollen, or bleeding gums:</strong> Healthy gums are pale pink and firm. Inflamed gums appear red, may bleed with gentle pressure, and often have a distinctive line of redness at the gum-tooth junction.</li>
  <li><strong>Loose or missing teeth</strong></li>
  <li><strong>Drooling more than usual</strong></li>
  <li><strong>Dropping food or chewing on one side:</strong> A subtle sign that one area of the mouth is painful</li>
  <li><strong>Facial swelling:</strong> Especially under the eye — can indicate a tooth root abscess</li>
  <li><strong>Reluctance to chew toys or hard treats they previously enjoyed</strong></li>
  <li><strong>Pawing at the mouth</strong></li>
</ul>
<h2 id="stages">Stages of Periodontal Disease</h2>
<table class="ga-table">
  <thead><tr><th>Stage</th><th>Description</th><th>Reversible?</th></tr></thead>
  <tbody>
    <tr><td>Stage 1 — Gingivitis</td><td>Inflammation of gums only; no bone loss</td><td>Yes, with professional cleaning + home care</td></tr>
    <tr><td>Stage 2 — Early Periodontitis</td><td>Less than 25% bone loss; pockets begin forming</td><td>Partially; professional cleaning + intensive home care</td></tr>
    <tr><td>Stage 3 — Moderate Periodontitis</td><td>25–50% bone loss; root exposure possible</td><td>No, but progression can be slowed</td></tr>
    <tr><td>Stage 4 — Advanced Periodontitis</td><td>Over 50% bone loss; teeth may need extraction</td><td>No; extractions + aggressive management</td></tr>
  </tbody>
</table>
<h2 id="consequences">Systemic Consequences of Untreated Dental Disease</h2>
<p>Dental disease is not just a mouth problem. Research in both human and veterinary medicine shows that chronic oral infections contribute to:</p>
<ul>
  <li><strong>Heart disease:</strong> Endocarditis (heart valve infection) linked to oral bacteria in dogs</li>
  <li><strong>Kidney disease:</strong> Chronic bacterial seeding from the mouth damages kidney tissue over time</li>
  <li><strong>Liver damage:</strong> Same mechanism as kidney</li>
  <li><strong>Chronic pain:</strong> Even when not visibly expressed, dental pain causes measurable stress and reduced quality of life</li>
</ul>
<h2 id="treatment">Treatment & Prevention</h2>
<ul>
  <li><strong>Professional dental cleaning:</strong> Under general anesthesia, tartar is removed above and below the gum line. Damaged teeth are extracted if needed. Recommended every 1–3 years depending on the dog.</li>
  <li><strong>Daily toothbrushing:</strong> The most effective prevention. See our <a href="/health/brush-dog-teeth.html">tooth brushing guide</a>.</li>
  <li><strong>VOHC-approved products:</strong> The Veterinary Oral Health Council (VOHC) certifies dental chews, water additives, and foods that meet standards for plaque/tartar reduction. Look for the VOHC seal.</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Check your dog's mouth monthly — lift the lips and look at gums and teeth. Bad breath, red gums, and visible tartar are not normal and deserve a dental evaluation. Early-stage dental disease is reversible; advanced disease is not. The cost of prevention (brushing + annual exams) is a fraction of the cost of treating advanced dental disease.</div>`,
    related:[{url:'/health/brush-dog-teeth.html',title:'How to Brush Dog\'s Teeth'},{url:'/health/dental-chews.html',title:'Do Dental Chews Work?'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'}]
  },

  {
    slug:'dental-chews',
    title:'Do Dental Chews for Dogs Actually Work?',
    metaDesc:'Are dental chews for dogs effective? An honest look at the evidence — VOHC-approved options, what works, and what doesn\'t.',
    heroTag:'Dental Health',heroBg:BG,
    h1:'Do Dental Chews for Dogs <span class="hl">Actually Work?</span>',
    desc:"Greenies, OraVet, Whimzees — an honest look at the evidence for dental chews and which ones are actually worth buying.",
    readTime:'6 min read',level:null,
    toc:[{id:'do-they',label:'Do They Actually Work?'},{id:'vohc',label:'The VOHC Seal'},{id:'top-picks',label:'Top Dental Chews'},{id:'vs-brushing',label:'vs. Toothbrushing'},{id:'risks',label:'Risks & Considerations'}],
    body:`<p class="ga-lede">Dental chews are a $1 billion+ industry with a wide range of effectiveness — from genuinely helpful to completely useless. The majority of dental chews on the market make marketing claims that aren't backed by independent evidence. But a subset — those carrying the Veterinary Oral Health Council (VOHC) seal — have demonstrated meaningful plaque and tartar reduction in peer-reviewed studies. Here's how to tell which is which.</p>
<h2 id="do-they">Do Dental Chews Work?</h2>
<p>Short answer: some do, most don't as claimed.</p>
<p>Dental chews work through mechanical action — the dog chewing on the product physically scrubs plaque from tooth surfaces. The key variable is: does the chew actually contact the teeth for long enough to have effect, and does the texture actually scrub?</p>
<p>Hard chews (rawhide, bully sticks, bones) can reduce plaque but don't specifically target the subgingival areas where periodontal disease develops. Very soft chews provide little to no mechanical benefit. Medium-firmness, specially textured chews designed to flex and grip the tooth provide the best mechanical cleaning.</p>
<div class="warning-box"><strong>⚠️ Bones and antlers can fracture teeth.</strong> The "10-second rule": if you can't make a dent in the chew with your thumbnail, it's hard enough to fracture a tooth (the upper 4th premolar is the most commonly fractured tooth). Real bone, elk antler, and hard nylon chews all carry this risk.</div>
<h2 id="vohc">The VOHC Seal — What It Means</h2>
<p>The Veterinary Oral Health Council (VOHC) is an independent body that reviews and certifies dental products that have met pre-set standards in clinical trials for reducing plaque or tartar. A VOHC seal means the product has actually been tested — not just claimed — to work.</p>
<p>Products receive separate seals for "reduces plaque" and/or "reduces tartar." Look for the VOHC seal on the packaging.</p>
<h2 id="top-picks">VOHC-Approved Dental Chews</h2>
<table class="ga-table">
  <thead><tr><th>Product</th><th>VOHC Claim</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Greenies Dental Chews</td><td>Reduces tartar & plaque</td><td>Most popular; use size-appropriate; high calorie</td></tr>
    <tr><td>OraVet Dental Hygiene Chews</td><td>Reduces plaque & calculus</td><td>Contains delmopinol, which disrupts biofilm formation</td></tr>
    <tr><td>Whimzees</td><td>Reduces tartar</td><td>Vegetable-based; low calorie</td></tr>
    <tr><td>Purina DentaLife</td><td>Reduces tartar</td><td>Widely available; affordable</td></tr>
    <tr><td>Virbac C.E.T. Chews</td><td>Reduces plaque & tartar</td><td>Enzymatic chews; also available as toothpaste</td></tr>
  </tbody>
</table>
<h2 id="vs-brushing">Dental Chews vs. Toothbrushing</h2>
<p>Dental chews are a supplement to toothbrushing, not a replacement. Studies consistently show that daily toothbrushing is more effective than any chew. However, in dogs where brushing is genuinely not possible, VOHC-approved chews provide meaningful benefit.</p>
<table class="ga-table">
  <thead><tr><th>Method</th><th>Effectiveness</th><th>Practicality</th></tr></thead>
  <tbody>
    <tr><td>Daily toothbrushing</td><td>Highest</td><td>Requires training</td></tr>
    <tr><td>VOHC dental chews (daily)</td><td>Moderate — ~70–80% as effective as brushing in some studies</td><td>Easy; dogs love them</td></tr>
    <tr><td>Water additives (VOHC)</td><td>Mild</td><td>Very easy; add to water bowl</td></tr>
    <tr><td>Dental diets (VOHC)</td><td>Moderate</td><td>Easy if used as main food</td></tr>
    <tr><td>Non-VOHC chews</td><td>Minimal to none</td><td>N/A</td></tr>
  </tbody>
</table>
<h2 id="risks">Risks & Considerations</h2>
<ul>
  <li><strong>Calorie count:</strong> A large Greenie can be 70–100 calories — significant for a small dog on a weight management diet</li>
  <li><strong>Choking:</strong> Always supervise; use size-appropriate chews; remove if the dog is swallowing large pieces</li>
  <li><strong>GI upset:</strong> New chews can cause loose stool; introduce gradually</li>
  <li><strong>Not a substitute for professional cleaning:</strong> Existing tartar cannot be removed by chewing; a professional dental under anesthesia is needed to start fresh</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Dental chews work — when they carry the VOHC seal and are used daily. They're not as effective as toothbrushing, but for dogs where brushing isn't possible, VOHC-approved chews (Greenies, OraVet, Whimzees) provide genuine benefit. Use them daily, account for calories, and supervise chewing.</div>`,
    related:[{url:'/health/brush-dog-teeth.html',title:'How to Brush Dog\'s Teeth'},{url:'/health/dental-disease.html',title:'Signs of Dental Disease'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'}]
  },

  {
    slug:'when-is-dog-senior',
    title:'When Is a Dog Considered Senior? Age by Breed Size',
    metaDesc:'When does a dog become a senior? The answer depends on breed size. Life stage changes, what to watch for, and how care changes.',
    heroTag:'Senior Dogs',heroBg:BG,
    h1:'When Is a Dog Considered <span class="hl">Senior?</span>',
    desc:"A Chihuahua and a Great Dane age very differently. Here's when dogs enter their senior years and what changes to expect.",
    readTime:'6 min read',level:null,
    toc:[{id:'by-size',label:'Senior Age by Breed Size'},{id:'changes',label:'Changes to Watch For'},{id:'care',label:'How Care Changes'},{id:'quality',label:'Quality of Life Assessment'}],
    body:`<p class="ga-lede">The idea that one year of a dog's life equals seven human years is a popular simplification that doesn't hold up to scrutiny. In reality, dogs age at dramatically different rates depending on their size — and large breeds enter their senior years while small breeds are still in their prime. Understanding when your dog is entering the senior life stage helps you adjust care proactively rather than reactively.</p>
<h2 id="by-size">Senior Age by Breed Size</h2>
<table class="ga-table">
  <thead><tr><th>Size Category</th><th>Weight</th><th>Senior Age</th><th>Average Lifespan</th></tr></thead>
  <tbody>
    <tr><td>Small breeds</td><td>Under 20 lbs</td><td>10–12 years</td><td>14–18 years</td></tr>
    <tr><td>Medium breeds</td><td>20–50 lbs</td><td>8–10 years</td><td>12–14 years</td></tr>
    <tr><td>Large breeds</td><td>50–90 lbs</td><td>7–8 years</td><td>10–13 years</td></tr>
    <tr><td>Giant breeds</td><td>90+ lbs</td><td>5–6 years</td><td>8–10 years</td></tr>
  </tbody>
</table>
<p>Why do larger dogs age faster? The exact mechanism isn't fully understood, but larger bodies appear to experience faster cell aging and are more susceptible to age-related diseases like cancer, heart disease, and orthopedic conditions.</p>
<h2 id="changes">Changes to Watch For in Senior Dogs</h2>
<p>The following changes are common in senior dogs — many are manageable, but all deserve monitoring:</p>
<ul>
  <li><strong>Reduced activity and exercise tolerance:</strong> Tires more quickly; slower on walks; reluctant to play as long</li>
  <li><strong>Weight changes:</strong> Often gain weight due to reduced metabolism and activity; some conditions cause weight loss</li>
  <li><strong>Stiffness and mobility issues:</strong> Especially after rest; difficulty with stairs or getting up</li>
  <li><strong>Sensory changes:</strong> Hearing loss is common; vision may decline; cloudy eyes (nuclear sclerosis) is normal aging, not blindness</li>
  <li><strong>Behavioral changes:</strong> More sleep, less interest in play, possible confusion or changed sleep-wake cycle</li>
  <li><strong>Increased water intake:</strong> Can indicate kidney disease, diabetes, or Cushing's disease — worth noting and discussing with your vet</li>
  <li><strong>Lumps and bumps:</strong> More common with age; most are benign (lipomas), but any new growth should be evaluated</li>
</ul>
<h2 id="care">How Care Changes for Senior Dogs</h2>
<ul>
  <li><strong>Vet visits:</strong> Increase to every 6 months. Blood work and urinalysis at least annually to catch organ changes early.</li>
  <li><strong>Diet:</strong> Senior formulas have lower calorie density (for weight management) and often added joint support. Discuss with your vet whether a formula change is appropriate.</li>
  <li><strong>Exercise:</strong> Shorter, more frequent walks rather than one long one. Low-impact options (swimming, gentle walks) preserve muscle without stressing joints.</li>
  <li><strong>Joint support:</strong> Orthopedic bed, ramps for cars/couches, non-slip surfaces on hardwood floors</li>
  <li><strong>Dental care:</strong> Dental disease accelerates with age; professional cleaning may be more frequent</li>
  <li><strong>Mental stimulation:</strong> Cognitive decline (canine cognitive dysfunction) is real; enrichment activities, puzzle feeders, and maintained social contact slow progression</li>
</ul>
<h2 id="quality">Quality of Life Assessment</h2>
<p>For senior dogs approaching the end of life, the HHHHHMM Quality of Life Scale (developed by Dr. Alice Villalobos) provides a framework: Hurt, Hunger, Hydration, Hygiene, Happiness, Mobility, and More good days than bad. This scale helps families and vets make difficult decisions based on the dog's experience rather than purely on owner emotion.</p>
<div class="key-box"><strong>Key Takeaway:</strong> "Senior" doesn't mean sick — many dogs are active, healthy, and engaged well into their senior years. It means proactive: more frequent vet visits, earlier detection, and small lifestyle adjustments that preserve quality of life for as long as possible.</div>`,
    related:[{url:'/health/dog-arthritis.html',title:'Arthritis in Senior Dogs'},{url:'/health/dog-dementia.html',title:'Dog Dementia'},{url:'/health/vet-visit-frequency.html',title:'How Often to See the Vet'}]
  },

  {
    slug:'dog-arthritis',
    title:'Arthritis in Dogs — Signs, Treatment & Pain Management',
    metaDesc:'Dog arthritis signs, treatment options, and daily management to keep arthritic dogs comfortable. Practical guide for owners.',
    heroTag:'Senior Dogs',heroBg:BG,
    h1:'Arthritis in Dogs — <span class="hl">Signs & Management</span>',
    desc:"Arthritis affects 1 in 5 adult dogs. Caught early, it's manageable — most arthritic dogs can live comfortable, active lives.",
    readTime:'8 min read',level:null,
    toc:[{id:'what',label:'What Is Canine Arthritis?'},{id:'signs',label:'Signs of Arthritis'},{id:'treatment',label:'Treatment Options'},{id:'home',label:'Home Management'},{id:'supplements',label:'Supplements'}],
    body:`<p class="ga-lede">Arthritis (osteoarthritis) affects an estimated 1 in 5 adult dogs — and many owners miss the early signs because dogs instinctively hide pain. By the time obvious limping appears, arthritis is often moderate-to-severe. The good news: with the right combination of medication, lifestyle modification, and supportive care, most arthritic dogs can maintain good quality of life and remain active for years.</p>
<h2 id="what">What Is Canine Arthritis?</h2>
<p>Osteoarthritis is a degenerative joint disease — the protective cartilage that cushions joints breaks down over time, leading to bone-on-bone contact, inflammation, pain, and reduced range of motion. It can affect any joint but is most common in hips, elbows, knees, and the spine. It's progressive — it doesn't get better, but its progression can be significantly slowed and its symptoms managed.</p>
<h2 id="signs">Signs of Arthritis</h2>
<ul>
  <li><strong>Stiffness after rest:</strong> The dog gets up slowly, especially in the morning or after lying down, and "warms up" as they move</li>
  <li><strong>Reduced activity and exercise tolerance:</strong> Tires faster on walks; reluctant to play or run</li>
  <li><strong>Difficulty with stairs, jumping, or getting in/out of cars</strong></li>
  <li><strong>Limping that's worse after rest and improves with movement</strong> (the opposite of soft tissue injuries, which worsen with movement)</li>
  <li><strong>Licking, biting, or chewing at joints</strong></li>
  <li><strong>Behavioral changes:</strong> Irritability, reluctance to be touched near painful areas, reduced engagement</li>
  <li><strong>Muscle loss:</strong> The dog uses the painful limb less; the muscles over time atrophy</li>
</ul>
<div class="tip-box"><strong>💡 Early detection matters:</strong> Most arthritic dogs will keep eating, greet you enthusiastically, and not cry in pain. The early signs are subtle: slightly stiffer mornings, slightly shorter play sessions, a brief hesitation before jumping up. These are the moments to mention to your vet.</div>
<h2 id="treatment">Medical Treatment Options</h2>
<ul>
  <li><strong>NSAIDs (Carprofen, Meloxicam, Galliprant):</strong> Prescription anti-inflammatory pain medications. First-line treatment for moderate-to-severe arthritis. Require regular bloodwork monitoring (effect on liver and kidneys). Never substitute human NSAIDs — ibuprofen and Tylenol are toxic to dogs.</li>
  <li><strong>Librela (bedinvetmab):</strong> Monthly injection targeting nerve growth factor (a key pain signal in arthritis). Relatively new but showing excellent results for chronic pain without the GI/kidney risks of NSAIDs.</li>
  <li><strong>Gabapentin:</strong> Adjunct pain medication, especially for neuropathic pain. Commonly combined with NSAIDs for severe arthritis.</li>
  <li><strong>Corticosteroids:</strong> For severe flares; not for long-term use due to side effects.</li>
  <li><strong>Acupuncture:</strong> Growing evidence base; some dogs respond very well, especially when combined with traditional medications.</li>
  <li><strong>Canine rehabilitation therapy:</strong> Hydrotherapy, underwater treadmill, and targeted exercises preserve muscle mass and joint mobility.</li>
</ul>
<h2 id="home">Home Management</h2>
<ul>
  <li>Orthopedic memory foam bed — reduces pressure on joints during sleep</li>
  <li>Non-slip rugs on all hard floors — arthritic dogs lose footing on tile and hardwood</li>
  <li>Ramps or steps for cars and furniture — reduces impact from jumping</li>
  <li>Raised food and water bowls — reduces neck strain for dogs with spinal arthritis</li>
  <li>Short, frequent walks rather than one long session — keeps joints moving without overdoing it</li>
  <li>Weight management — the single most impactful modifiable factor; every extra pound increases joint load significantly</li>
  <li>Warm environment — cold and damp worsen arthritis symptoms</li>
</ul>
<h2 id="supplements">Supplements — What Has Evidence</h2>
<table class="ga-table">
  <thead><tr><th>Supplement</th><th>Evidence Level</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Omega-3 fatty acids (fish oil)</td><td>Moderate</td><td>Anti-inflammatory; dose matters: EPA+DHA combined</td></tr>
    <tr><td>Glucosamine + Chondroitin</td><td>Mixed — some studies show modest benefit</td><td>Safe; often combined</td></tr>
    <tr><td>Green-lipped mussel</td><td>Some positive evidence</td><td>Source of omega-3s and glycosaminoglycans</td></tr>
    <tr><td>UC-II (undenatured collagen)</td><td>Promising early studies</td><td>May modulate cartilage immune response</td></tr>
    <tr><td>CBD oil</td><td>Insufficient veterinary data</td><td>Some owners report benefit; not FDA-approved for dogs</td></tr>
  </tbody>
</table>
<div class="key-box"><strong>Key Takeaway:</strong> Arthritis is manageable, not hopeless. A dog that's diagnosed early, started on appropriate pain management, and given supportive home accommodations can remain comfortable and active for years. If you notice stiffness after rest or reduced enthusiasm for activity, mention it at your next vet visit — don't wait for visible limping.</div>`,
    related:[{url:'/health/hip-dysplasia.html',title:'Hip Dysplasia in Dogs'},{url:'/health/when-is-dog-senior.html',title:'When Is a Dog Senior?'},{url:'/health/dog-dementia.html',title:'Dog Dementia'}]
  },

  {
    slug:'dog-dementia',
    title:'Dog Dementia (Canine Cognitive Dysfunction) — Signs & Care',
    metaDesc:'Canine cognitive dysfunction (dog dementia) — signs, how it\'s diagnosed, and how to support a dog with CCD at home.',
    heroTag:'Senior Dogs',heroBg:BG,
    h1:'Dog Dementia — <span class="hl">Canine Cognitive Dysfunction</span>',
    desc:"If your senior dog wanders at night, seems confused, or stares at walls — it may be canine cognitive dysfunction. Here's what to do.",
    readTime:'7 min read',level:null,
    toc:[{id:'what',label:'What Is CCD?'},{id:'signs',label:'Signs (DISHA)'},{id:'diagnosis',label:'Diagnosis'},{id:'treatment',label:'Treatment & Management'},{id:'support',label:'Supporting Your Dog'}],
    body:`<p class="ga-lede">Canine Cognitive Dysfunction (CCD) is the dog equivalent of Alzheimer's disease — a progressive neurodegenerative condition caused by physical and chemical changes in the aging brain. It affects an estimated 14–35% of dogs over age 8, increasing to over 50% in dogs aged 15 and older. Like Alzheimer's, it cannot be reversed, but it can be slowed and managed — and understanding what's happening helps owners provide better support through the process.</p>
<h2 id="what">What Is Canine Cognitive Dysfunction?</h2>
<p>CCD is characterized by the abnormal accumulation of amyloid beta plaques in the brain — the same type found in human Alzheimer's disease. These plaques disrupt normal neuron function, leading to progressive cognitive decline. The condition is gradual and worsening, though the rate of progression varies significantly between dogs.</p>
<h2 id="signs">Signs of CCD — The DISHA Acronym</h2>
<p>Veterinarians use DISHA as a framework for recognizing CCD symptoms:</p>
<ul>
  <li><strong>D — Disorientation:</strong> Getting stuck in corners, wandering aimlessly, staring at walls, standing at the wrong side of doors, appearing lost in familiar places</li>
  <li><strong>I — Interactions changed:</strong> Reduced interest in greeting family members, decreased social engagement, loss of previous affection toward owners</li>
  <li><strong>S — Sleep-wake cycle disruption:</strong> Wandering and vocalization at night, sleeping more during the day, reversed day/night cycle</li>
  <li><strong>H — House soiling:</strong> Accidents indoors despite being fully house-trained; going outside then returning to soil indoors</li>
  <li><strong>A — Activity changes:</strong> Reduced exploration and play, repetitive behaviors, increased anxiety, sometimes increased aimless wandering</li>
</ul>
<div class="tip-box"><strong>💡 Not just "old age":</strong> Many CCD signs are dismissed as "just getting old." While aging does cause some changes, the DISHA symptoms above — especially night wandering, confusion in familiar spaces, and social disengagement — warrant a specific veterinary evaluation, not just acceptance.</div>
<h2 id="diagnosis">Diagnosis</h2>
<p>There's no definitive blood test for CCD. Diagnosis is clinical — based on ruling out other conditions (hypothyroidism, brain tumor, pain, hearing/vision loss) that can mimic CCD symptoms, and then confirming the DISHA pattern. Your vet will likely recommend bloodwork, urinalysis, and possibly imaging (MRI) to rule out other causes.</p>
<p>A CCD questionnaire (like the CCDR scale) helps quantify symptom severity and track progression over time.</p>
<h2 id="treatment">Treatment & Management</h2>
<ul>
  <li><strong>Selegiline (Anipryl):</strong> The only FDA-approved medication for CCD in dogs. Inhibits MAO-B to increase dopamine in the brain. Shows improvement in 70% of treated dogs, though response varies. Requires prescription.</li>
  <li><strong>Dietary interventions:</strong> Hill's b/d (Brain Diet) was formulated specifically for cognitive support and has clinical evidence of efficacy. Rich in antioxidants, omega-3s, and medium-chain triglycerides.</li>
  <li><strong>Supplements:</strong> SAMe (S-adenosylmethionine), omega-3 fatty acids, and medium-chain triglycerides (MCT oil) have some supporting evidence for cognitive function.</li>
  <li><strong>Melatonin:</strong> For sleep-wake cycle disruption; low dose 30 minutes before bed often helps with night wandering.</li>
  <li><strong>Adaptil:</strong> Pheromone diffuser/collar that reduces anxiety associated with confusion.</li>
</ul>
<h2 id="support">Supporting Your Dog Day-to-Day</h2>
<ul>
  <li><strong>Maintain routine:</strong> Consistent feeding times, walk times, and sleep locations reduce confusion</li>
  <li><strong>Keep the layout familiar:</strong> Avoid rearranging furniture; add nightlights to help with night navigation</li>
  <li><strong>Mental stimulation:</strong> Gentle puzzle feeding, sniff activities, and short training sessions (review known commands) can slow cognitive decline</li>
  <li><strong>Safety:</strong> Baby gates on stairs, outdoor supervision (CCD dogs can wander and become lost even in familiar yards)</li>
  <li><strong>Patience:</strong> A dog with CCD is not being stubborn or willfully difficult — they're genuinely confused. Gentle reassurance and calm environments are the most helpful response to confusion episodes</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> CCD is real, common, and manageable. If your senior dog shows any of the DISHA signs, mention them at your next vet appointment. Selegiline and dietary management can meaningfully slow progression. Supporting a CCD dog requires patience and environmental management — but many dogs live comfortably for months to years after diagnosis.</div>`,
    related:[{url:'/health/when-is-dog-senior.html',title:'When Is a Dog Senior?'},{url:'/health/dog-arthritis.html',title:'Arthritis in Dogs'},{url:'/training/mental-stimulation.html',title:'Mental Stimulation & Enrichment'}]
  }
];

const OUT_DIR = path.join(__dirname, 'health');
GUIDES.forEach(g => {
  const html = page(g);
  const fp = path.join(OUT_DIR, g.slug + '.html');
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Created:', fp);
});
console.log('Done: Health guides (18 pages)');
