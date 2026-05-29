// gen_guides_training_pro.js — 6 Professional-level training guides
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'training');
const BG  = 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)';

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
      <li><a href="/training/index.html" style="color:var(--teal)">Training</a></li>
      <li><a href="/health/index.html">Health</a></li>
      <li><a href="/nutrition/index.html">Nutrition</a></li>
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
        <h4>Training Guides</h4>
        <ul>
          <li><a href="/training/canine-good-citizen.html">CGC Test Prep</a></li>
          <li><a href="/training/service-dog-training.html">Service Dog Training</a></li>
          <li><a href="/training/agility-training.html">Agility Training</a></li>
          <li><a href="/training/index.html">All Guides →</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>More Topics</h4>
        <ul>
          <li><a href="/health/index.html">Dog Health</a></li>
          <li><a href="/nutrition/index.html">Nutrition</a></li>
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
    <div class="ga-breadcrumb"><a href="/index.html">Home</a> › <a href="/training/index.html">Training</a> › ${cfg.crumb}</div>
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

// ─── 1. CANINE GOOD CITIZEN ───────────────────────────────────────────────
{
  file: 'canine-good-citizen.html',
  title: 'AKC Canine Good Citizen (CGC) Test — Complete Prep Guide',
  crumb: 'Canine Good Citizen Test',
  tag: '🏅 Professional',
  h1: 'AKC Canine Good Citizen (CGC) — Complete Prep Guide',
  desc: 'Everything you need to pass the AKC CGC test — all 10 skills explained, how to find an evaluator, what evaluators actually look for, and common reasons dogs fail.',
  meta: '⏱ 12 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#what">What the CGC Is</a></li>
        <li><a href="#10skills">The 10 CGC Skills</a></li>
        <li><a href="#training">How to Train Each Skill</a></li>
        <li><a href="#test-day">What Test Day Looks Like</a></li>
        <li><a href="#fail">Common Reasons Dogs Fail</a></li>`,
  related: `<li><a href="competitive-obedience.html">Competitive Obedience</a></li>
            <li><a href="therapy-dog-certification.html">Therapy Dog Certification</a></li>
            <li><a href="off-leash-recall.html">Off-Leash Recall</a></li>`,
  body: `
<p class="ga-lede">The AKC Canine Good Citizen certificate is the gold standard of dog behavior — proof that your dog is a calm, polite member of the community. It's also a prerequisite for therapy dog certification, some housing agreements, and many dog sport titles. Here's exactly how to prepare and pass.</p>

<h2 id="what">What the CGC Is (and Isn't)</h2>
<p>The Canine Good Citizen test is a 10-skill evaluation administered by AKC-approved evaluators — certified trainers, vets, and dog club members. It tests real-world manners: how your dog behaves in public, with strangers, around other dogs, and when left briefly with someone else.</p>
<p>It is <strong>not</strong> a competitive sport — there's no scoring, no ranking, no time pressure. You either pass or you don't. The bar is "reliably well-mannered dog" not "perfectly trained competition dog." Most dogs with consistent basic training can pass within 3–6 months of focused work.</p>
<div class="key-box"><strong>CGC is the entry point to:</strong> AKC Therapy Dog title, AKC Community Canine (CGCA), AKC Urban CGC (CGCU), Trick Dog titles, and many breed club advanced programs. Earning CGC first is strongly recommended before pursuing any of these.</div>

<h2 id="10skills">The 10 CGC Skills — What Each One Requires</h2>
<table class="ga-table">
  <thead><tr><th>#</th><th>Skill</th><th>What the Evaluator Does</th><th>What Your Dog Must Do</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Accepting a Friendly Stranger</td><td>Approaches and greets the handler; ignores the dog</td><td>Sit or stand calmly; no jumping, lunging, or shyness</td></tr>
    <tr><td>2</td><td>Sitting Politely for Petting</td><td>Pets the dog on the head and body</td><td>Sit still; accept petting from stranger without fear or aggression</td></tr>
    <tr><td>3</td><td>Appearance and Grooming</td><td>Lightly grooms with a brush; examines ears and lifts each paw</td><td>Tolerate grooming and handling without resistance</td></tr>
    <tr><td>4</td><td>Out for a Walk (Loose Leash)</td><td>Directs handler to walk a pattern (right turn, left turn, about turn, halt)</td><td>Walk on a loose leash; no pulling; stay near handler</td></tr>
    <tr><td>5</td><td>Walking Through a Crowd</td><td>Handler walks through 3+ people standing or milling around</td><td>Stay calm; no jumping on people, no pulling toward them</td></tr>
    <tr><td>6</td><td>Sit, Down, Stay on Command</td><td>Asks handler to demonstrate each; then stay while handler walks 20 ft away</td><td>Perform sit, down on first command; hold a stay while handler walks away and returns</td></tr>
    <tr><td>7</td><td>Coming When Called</td><td>Handler walks 10 ft, turns, calls dog</td><td>Come reliably on first call</td></tr>
    <tr><td>8</td><td>Reaction to Another Dog</td><td>Two handlers with dogs approach, greet, and walk away</td><td>Remain calm and focused on handler; no lunging, barking, or excessive interest</td></tr>
    <tr><td>9</td><td>Reaction to Distraction</td><td>Presents two distractions (loud noise, jogger, dropped item, person in wheelchair/crutches)</td><td>May startle but must recover quickly; no aggression, panic, or bolting</td></tr>
    <tr><td>10</td><td>Supervised Separation</td><td>Takes the leash; handler goes out of sight for 3 minutes</td><td>Stay calm with the evaluator; no sustained barking, whining, or extreme distress</td></tr>
  </tbody>
</table>

<h2 id="training">How to Train Each Skill — Key Points</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Skills 1–3 (Stranger Acceptance)</strong><p>Practice "stranger greetings" on every walk. Ask neighbors, friends, and strangers to approach calmly and pet your dog while you reward stillness. The grooming test requires weekly brushing and paw handling from puppyhood — start this habit immediately.</p></div>
  <div class="ga-hl-card"><strong>Skills 4–5 (Leash Manners & Crowds)</strong><p>Practice loose-leash walking in progressively busier environments. Start on a quiet street, move to a parking lot, then a farmers market. The crowd test is essentially socialization — dogs who get out regularly pass this easily.</p></div>
  <div class="ga-hl-card"><strong>Skill 6 (Stay)</strong><p>The 20-foot stay is the most commonly failed skill. Build duration before distance — your dog must hold a stay for 30+ seconds before you walk away. Practice in distracting locations. Use a long line, not voice corrections, to prevent breaking.</p></div>
  <div class="ga-hl-card"><strong>Skills 8–9 (Other Dogs & Distractions)</strong><p>Controlled dog-dog greetings on leash, maintaining focus on you. For distractions: deliberately expose your dog to bikes, skateboards, umbrellas, crutches, and loud noises in training. Desensitization over weeks is the only reliable fix.</p></div>
  <div class="ga-hl-card"><strong>Skill 10 (Supervised Separation)</strong><p>This fails more separation-anxious dogs than any other test item. Practice leaving your dog with a trusted friend for 3+ minutes from early on. Build up duration gradually. Dogs who are crate-trained typically pass this without issue.</p></div>
</div>
<div class="tip-box"><strong>Train in test-like conditions:</strong> In the weeks before testing, run "mock CGC tests" with a friend playing evaluator. Use a different location each time. Dogs who pass reliably in practice almost always pass the real test.</div>

<h2 id="test-day">What Test Day Looks Like</h2>
<ol class="step-list">
  <li>Find an AKC CGC evaluator or local test event at <strong>akc.org/products-services/training-programs/canine-good-citizen/find-a-cgc-evaluator-or-class/</strong></li>
  <li>Bring: AKC registration or mixed breed enrollment (required), flat collar or harness, a 20-foot leash (for the stay test)</li>
  <li>No choke chains, prong collars, or head halters during the test</li>
  <li>No treats during the test — your dog must perform without food reward</li>
  <li>The test takes 15–20 minutes; you'll know immediately if your dog passed</li>
  <li>Pass: the evaluator signs your certificate and you can submit for AKC official recording</li>
  <li>Fail: you can retest immediately or at a future event — there's no waiting period</li>
</ol>

<h2 id="fail">Common Reasons Dogs Fail CGC</h2>
<ul>
  <li><strong>Breaking the stay (Skill 6)</strong> — by far the most common; practice longer stays at home before attempting the 20-foot test version</li>
  <li><strong>Jumping on the evaluator (Skills 1–2)</strong> — dogs who jump greet everyone fail immediately; fix this before applying for a test</li>
  <li><strong>Barking or lunging at the neutral dog (Skill 8)</strong> — leash-reactive dogs cannot pass this; do reactive dog training first</li>
  <li><strong>Distress during separation (Skill 10)</strong> — sustained barking or excessive panting/pacing disqualifies the dog; this needs months of departure training to fix</li>
  <li><strong>Any growling, snapping, or aggressive display</strong> — immediate disqualification with no option to retest that day</li>
</ul>
`
},

// ─── 2. SERVICE DOG TRAINING ──────────────────────────────────────────────
{
  file: 'service-dog-training.html',
  title: 'Service Dog Training — What It Takes to Train a Service Dog',
  crumb: 'Service Dog Training',
  tag: '🦺 Professional',
  h1: 'Service Dog Training — What It Actually Takes',
  desc: 'The full roadmap for owner-training a service dog — legal requirements under the ADA, task training, public access standards, breed selection, and when to hire a professional trainer.',
  meta: '⏱ 14 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#ada">ADA Legal Basics</a></li>
        <li><a href="#types">Types of Service Dogs</a></li>
        <li><a href="#breeds">Best Breeds</a></li>
        <li><a href="#roadmap">The Training Roadmap</a></li>
        <li><a href="#public-access">Public Access Standards</a></li>
        <li><a href="#self-vs-pro">Owner-Training vs. Program Dogs</a></li>`,
  related: `<li><a href="canine-good-citizen.html">CGC Test Prep</a></li>
            <li><a href="therapy-dog-certification.html">Therapy Dog Certification</a></li>
            <li><a href="off-leash-recall.html">Off-Leash Recall</a></li>`,
  body: `
<p class="ga-lede">A fully trained service dog costs $20,000–$60,000 from a professional program — and wait lists stretch 2–4 years. Many people with disabilities choose to owner-train their own. It's legal, it's possible, and with the right foundation it can produce an exceptional working dog. Here's the complete roadmap.</p>

<h2 id="ada">ADA Legal Basics — What You Need to Know</h2>
<p>Under the Americans with Disabilities Act (ADA), a service dog is a dog individually trained to perform work or tasks directly related to a person's disability. Key legal points:</p>
<ul>
  <li>No certification, registration, or vest is required — these are not legally meaningful under federal law</li>
  <li>Businesses can only ask two questions: (1) Is this a service animal required for a disability? (2) What work or task has the dog been trained to perform?</li>
  <li>They cannot ask about your diagnosis, demand documentation, or require the dog to demonstrate the task</li>
  <li>The dog must be under control at all times — a business can ask an out-of-control dog to leave</li>
  <li>Owner-training is legal under the ADA — you do not need to use a professional program</li>
  <li>Emotional Support Animals (ESAs) are <strong>not</strong> the same as service dogs — they have no public access rights under the ADA</li>
</ul>
<div class="warning-box"><strong>Misrepresenting a pet as a service dog is a crime in most states.</strong> It also makes life harder for people with genuine service dogs when untrained dogs misbehave in public spaces.</div>

<h2 id="types">Types of Service Dogs and Their Tasks</h2>
<table class="ga-table">
  <thead><tr><th>Type</th><th>Tasks Performed</th><th>Common Breeds</th></tr></thead>
  <tbody>
    <tr><td>Guide Dog (Visual Impairment)</td><td>Navigation, obstacle avoidance, traffic signals</td><td>Labrador, Golden Retriever, German Shepherd</td></tr>
    <tr><td>Hearing Alert Dog</td><td>Alerts to sounds: doorbell, smoke alarm, name being called, baby crying</td><td>Cocker Spaniel, Labrador, any breed with sound sensitivity</td></tr>
    <tr><td>Mobility Assistance Dog</td><td>Brace/balance support, retrieve dropped items, open doors, press buttons</td><td>Standard Poodle, Golden Retriever, Labrador (must be large enough)</td></tr>
    <tr><td>Psychiatric Service Dog (PSD)</td><td>Interrupt self-harm, provide DPT (deep pressure therapy), create personal space, room checks, medication reminders</td><td>Any suitable breed; temperament is the main criterion</td></tr>
    <tr><td>Diabetic Alert Dog</td><td>Detect hypoglycemia/hyperglycemia via scent changes in breath/sweat; alert before symptoms appear</td><td>Labrador, Golden Retriever, Standard Poodle</td></tr>
    <tr><td>Seizure Response Dog</td><td>Alert before seizure, stay with person during seizure, activate alert device, get help</td><td>Labrador, Golden Retriever, German Shepherd</td></tr>
    <tr><td>Autism Support Dog</td><td>Tether to child, interrupt repetitive behaviors, provide DPT, track a child who wanders</td><td>Labrador, Golden Retriever, Standard Poodle</td></tr>
    <tr><td>Allergy Detection Dog</td><td>Detect allergens (peanuts, gluten) in environments, food, or on surfaces</td><td>Labrador, Poodle (high scent sensitivity breeds)</td></tr>
  </tbody>
</table>

<h2 id="breeds">Breed Selection for Service Work</h2>
<p>Not every dog can do this job. Service dog work requires a specific combination of traits that most dogs — even well-trained ones — don't fully possess:</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Temperament Essentials</strong><p>Calm under pressure, not reactive to sounds or people, confident without being dominant, biddable (wants to work with you), low environmental sensitivity (ignores other dogs, traffic, crowds).</p></div>
  <div class="ga-hl-card"><strong>Top Performing Breeds</strong><p>Labrador Retriever, Golden Retriever, Standard Poodle, German Shepherd, Border Collie (task-specific), Doberman (psychiatric), Bernese Mountain Dog (mobility). Labs and Goldens pass service dog temperament tests at the highest rate.</p></div>
  <div class="ga-hl-card"><strong>Avoid for Service Work</strong><p>Breeds with high prey drive, territoriality, reactivity, or independent nature without strong working bloodlines. This includes most sighthounds, many terriers, and hounds bred for solo work.</p></div>
  <div class="ga-hl-card"><strong>The Real Filter: Individual Temperament</strong><p>Breed is a starting point — individual temperament is everything. Wash rates at professional programs run 50–70% even with carefully selected dogs. Temperament testing at 7–8 weeks (Volhard method) predicts working ability.</p></div>
</div>

<h2 id="roadmap">The Owner-Training Roadmap</h2>
<ol class="step-list">
  <li><strong>Months 1–3 (Foundation):</strong> Socialization, basic obedience (sit, down, stay, come, heel), house manners, crate training. CGC-level skills should be solid before advancing. Expose to all public environments your life involves.</li>
  <li><strong>Months 3–6 (Public Access Foundation):</strong> Begin taking the dog into public places (pet-friendly stores, outdoor markets). Practice calm behavior in busy environments. The dog should be completely ignored — not soliciting attention from anyone.</li>
  <li><strong>Months 6–12 (Task Training):</strong> Begin training the specific tasks required for your disability. This is the most specialized phase — work with a trainer who has experience with your task type (especially for scent work, medical alerts, or balance support).</li>
  <li><strong>Months 12–18 (Proofing and Public Access):</strong> Proof all tasks in real-world environments with distractions. Begin public access in all the locations where the dog will work with you. Stress-test in challenging situations: crowded malls, restaurants, public transit.</li>
  <li><strong>Month 18–24 (Testing):</strong> Evaluate against public access standards (see below). Consider voluntary certifications through organizations like IAADP or ADI-accredited evaluators. The dog is ready for full-time work when tasks are performed reliably and public behavior is consistent across all environments.</li>
</ol>
<div class="tip-box"><strong>Keep a training log:</strong> Document every training session, task milestone, and public access outing. This protects you legally and helps identify skill gaps before they become problems in the field.</div>

<h2 id="public-access">Public Access Standards</h2>
<p>Even without legal certification requirements, a service dog in public should meet these standards — they're what separates a real working dog from a pet in a vest:</p>
<ul>
  <li>No soliciting attention from strangers (sitting near people hoping for pets)</li>
  <li>No sniffing merchandise, people, or food in stores</li>
  <li>No eliminating in public access areas</li>
  <li>Lie quietly under a table or at handler's feet during extended stays</li>
  <li>Perform all trained tasks on first command in a distracting environment</li>
  <li>No aggressive behavior toward people or other animals — ever</li>
  <li>Remain focused on handler even when the handler is distracted or having a medical episode</li>
</ul>
<p>The Assistance Dogs International (ADI) Public Access Test is the most widely used voluntary standard — it's available as a free PDF and an excellent checklist for evaluating readiness.</p>

<h2 id="self-vs-pro">Owner-Training vs. Program Dog — Honest Comparison</h2>
<table class="ga-table">
  <thead><tr><th></th><th>Owner-Trained</th><th>Program Dog</th></tr></thead>
  <tbody>
    <tr><td>Cost</td><td>$2,000–$8,000 (training help, equipment)</td><td>$20,000–$60,000 (often grant-funded)</td></tr>
    <tr><td>Timeline</td><td>18–24 months of active training</td><td>2–4 year wait list; delivered at ~18 months old</td></tr>
    <tr><td>Bond</td><td>Extremely strong — trained together from the start</td><td>Established after placement, strong but different</td></tr>
    <tr><td>Quality control</td><td>Depends entirely on handler skill and consistency</td><td>Professional standards, evaluated before placement</td></tr>
    <tr><td>Task customization</td><td>Fully customizable to specific needs</td><td>Trained for general task set for your disability type</td></tr>
    <tr><td>Risk</td><td>Dog may wash out; significant time investment lost</td><td>Program absorbs wash-out risk</td></tr>
  </tbody>
</table>
<div class="key-box"><strong>Recommendation:</strong> If your disability is severe and time is critical, pursue a program dog with grant funding while simultaneously exploring owner-training as a parallel path. Many people do both — owner-train a dog now and apply to programs simultaneously.</div>
`
},

// ─── 3. THERAPY DOG CERTIFICATION ─────────────────────────────────────────
{
  file: 'therapy-dog-certification.html',
  title: 'Therapy Dog Certification — How to Get Your Dog Certified',
  crumb: 'Therapy Dog Certification',
  tag: '❤️ Professional',
  h1: 'Therapy Dog Certification — The Complete Guide',
  desc: 'What therapy dogs do, the leading certification organizations compared, what the evaluation involves, and how to find placements once your dog is certified.',
  meta: '⏱ 10 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#what">What Therapy Dogs Do</a></li>
        <li><a href="#orgs">Certification Organizations</a></li>
        <li><a href="#requirements">Requirements & Evaluation</a></li>
        <li><a href="#training">How to Prepare</a></li>
        <li><a href="#placements">Finding Placements</a></li>`,
  related: `<li><a href="canine-good-citizen.html">CGC Test Prep</a></li>
            <li><a href="service-dog-training.html">Service Dog Training</a></li>
            <li><a href="socialization.html">Socialization Guide</a></li>`,
  body: `
<p class="ga-lede">Therapy dogs visit hospitals, schools, nursing homes, and disaster relief sites to provide comfort and emotional support. Unlike service dogs, they work with many people — not just their handler. If your dog is calm, friendly, and gentle with strangers, therapy work is one of the most rewarding things you can do together.</p>

<h2 id="what">What Therapy Dogs Do — and the Key Distinction</h2>
<p>Therapy dogs are not service dogs. They have no federal public access rights and are not covered by the ADA. They visit facilities by invitation, as part of organized programs, and are handled by their owner at all times during visits.</p>
<p>What makes a great therapy dog: bombproof around medical equipment, wheelchairs, and IV stands; gentle with people who may grab, hold, or squeeze awkwardly; calm in noisy, busy environments; comfortable being approached by strangers of all ages; able to ignore food dropped on the floor; no fear or aggression around any person.</p>
<div class="key-box"><strong>Best therapy dog candidates:</strong> Calm, social, confident dogs who love everyone equally. Golden Retrievers, Labrador Retrievers, Cavalier King Charles Spaniels, and Standard Poodles dominate therapy work — but any breed with the right temperament qualifies. The dog's demeanor matters infinitely more than breed.</div>

<h2 id="orgs">Major Certification Organizations Compared</h2>
<table class="ga-table">
  <thead><tr><th>Organization</th><th>CGC Required?</th><th>Annual Fee</th><th>Evaluation Style</th><th>Best For</th></tr></thead>
  <tbody>
    <tr><td>Alliance of Therapy Dogs (ATD)</td><td>No (but helps)</td><td>~$70</td><td>Observed visits with a tester</td><td>Hospitals, schools, nursing homes</td></tr>
    <tr><td>Pet Partners</td><td>No</td><td>~$60–$75/year</td><td>Skills test + online handler course</td><td>All facility types; most widely accepted</td></tr>
    <tr><td>Therapy Dogs International (TDI)</td><td>Yes (required)</td><td>~$20/year</td><td>CGC + TDI test</td><td>Schools, libraries, hospitals</td></tr>
    <tr><td>AKC Therapy Dog (ThD)</td><td>Yes (required)</td><td>One-time registration</td><td>Visit log (50+ visits with a certified org)</td><td>AKC title recognition; no standalone program</td></tr>
    <tr><td>Love on a Leash</td><td>No</td><td>~$30/year</td><td>Application-based assessment</td><td>Smaller scale; regional coverage</td></tr>
  </tbody>
</table>
<p><strong>Recommendation:</strong> Pet Partners is the most broadly recognized and accepted by the widest variety of facilities, including VA hospitals and major medical centers. TDI is excellent if you've already completed CGC. Start with one organization — you can add others later.</p>

<h2 id="requirements">What the Evaluation Involves</h2>
<p>Most evaluations test a core set of behaviors similar to CGC but with added therapy-specific scenarios. Expect:</p>
<ul>
  <li><strong>Basic obedience:</strong> Sit, down, stay, come, walking on a loose leash in crowded conditions</li>
  <li><strong>Accepting petting from strangers:</strong> Including children, elderly individuals, and people who pet awkwardly or clumsily</li>
  <li><strong>Medical equipment exposure:</strong> Walking past a wheelchair, walker, crutches, or cane without reaction</li>
  <li><strong>Crowd navigation:</strong> Moving through a group of people without jumping, pulling, or excessive excitement</li>
  <li><strong>Leave it around dropped food:</strong> Critical in healthcare settings; a dog that lunges for dropped items cannot safely visit</li>
  <li><strong>Noise tolerance:</strong> Alarms, intercom sounds, dropped items — the dog should startle but recover immediately</li>
  <li><strong>Hold still while being hugged or crowded:</strong> Some evaluators simulate an awkward embrace; the dog must tolerate this without growling or pulling away</li>
</ul>
<div class="warning-box"><strong>Automatic disqualifications:</strong> Any growling, snapping, or aggressive response — even once. Excessive barking that doesn't stop. Fear responses (tucked tail, cowering, refusing to enter the evaluation space). These are signs the dog genuinely doesn't enjoy the work — don't push a fearful dog into therapy work.</div>

<h2 id="training">How to Prepare Your Dog</h2>
<ol class="step-list">
  <li><strong>Pass CGC first</strong> — not required by all organizations but provides the right foundation and removes 90% of evaluation surprises</li>
  <li><strong>Hospital and clinic visits:</strong> Take your dog near (but not into) hospitals, clinics, and care facilities to acclimate to smells, sounds, and the types of people you'll encounter</li>
  <li><strong>Medical equipment desensitization:</strong> Rent or borrow a wheelchair from a pharmacy; have someone walk with crutches or a walker while you reward your dog for calm behavior near them</li>
  <li><strong>Child interactions:</strong> Practice supervised interactions with children of various ages, including toddlers who may grab or move erratically</li>
  <li><strong>Extended stays:</strong> Practice having strangers pet and hold your dog for 5–10 minutes continuously without you removing the dog. The dog should remain calm throughout, not escalate in excitement</li>
  <li><strong>Leave it — everywhere:</strong> Drop food on the floor in every environment; the dog must pass it by on command</li>
</ol>
<div class="tip-box"><strong>Watch for stress signals:</strong> Yawning, lip licking, whale eye, turning away, low tail. A dog showing these during training is telling you they're uncomfortable — this is important feedback. Therapy work should be genuinely enjoyable for the dog, not something they merely tolerate.</div>

<h2 id="placements">Finding Placements Once Certified</h2>
<p>Certification gets you access — finding actual visits takes active outreach:</p>
<ul>
  <li><strong>Your certification organization's facility directory</strong> — Pet Partners and TDI maintain lists of member facilities in each area</li>
  <li><strong>Local hospitals:</strong> Call the volunteer services department directly; many have formal therapy dog programs with coordinators</li>
  <li><strong>Libraries:</strong> "Read to a Dog" programs (children read aloud to therapy dogs) are hugely popular and easy to arrange</li>
  <li><strong>Schools:</strong> Contact the school counselor or principal; therapy dogs are particularly valued around exam periods and after traumatic events</li>
  <li><strong>Nursing homes and memory care facilities:</strong> These often have the most consistent need and deeply appreciative residents; call the activities director</li>
  <li><strong>Disaster relief:</strong> Organizations like the American Red Cross work with certified therapy dog teams after major disasters; register as a volunteer in advance through your certification organization</li>
</ul>
<p>Most therapy dog teams visit 2–4 times per month, for 1–2 hours per visit. Start with one consistent placement to establish a routine before adding more — burnout in both dog and handler is real.</p>
`
},

// ─── 4. COMPETITIVE OBEDIENCE ─────────────────────────────────────────────
{
  file: 'competitive-obedience.html',
  title: 'Competitive Dog Obedience — Getting Started with AKC Trials',
  crumb: 'Competitive Obedience',
  tag: '🏆 Professional',
  h1: 'Competitive Obedience — Getting Started with AKC Trials',
  desc: 'AKC obedience trial levels explained, exercises at each level, how to train for precision heelwork and retrieve, and how to find trials and clubs near you.',
  meta: '⏱ 12 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#levels">Trial Levels Explained</a></li>
        <li><a href="#exercises">Exercises at Each Level</a></li>
        <li><a href="#training">Training for Competition Precision</a></li>
        <li><a href="#clubs">Finding Clubs and Trials</a></li>
        <li><a href="#titles">Titles and What They Mean</a></li>`,
  related: `<li><a href="canine-good-citizen.html">CGC Test Prep</a></li>
            <li><a href="agility-training.html">Agility Training</a></li>
            <li><a href="off-leash-recall.html">Off-Leash Recall</a></li>`,
  body: `
<p class="ga-lede">Competitive obedience is where dog training becomes art. Dogs perform precise heelwork, drop-on-recall, scent discrimination, and directed jumping — all off leash, all without food or visible cues. If you're looking for a structured pursuit that deepens your bond and sharpens your dog's skills to a professional standard, obedience competition is it.</p>

<h2 id="levels">AKC Obedience Trial Levels</h2>
<table class="ga-table">
  <thead><tr><th>Level</th><th>Title Earned</th><th>What It Tests</th><th>Leash?</th></tr></thead>
  <tbody>
    <tr><td>Beginner Novice</td><td>BN</td><td>On-leash heeling, recall, sit/down in group</td><td>On leash for heeling</td></tr>
    <tr><td>Novice</td><td>CD (Companion Dog)</td><td>Heel on and off leash, stand for exam, recall, group sit/down (1 min/3 min)</td><td>Partially off leash</td></tr>
    <tr><td>Open</td><td>CDX (Companion Dog Excellent)</td><td>All off-leash: heel, drop on recall, retrieve on flat and over jump, broad jump, group sit/down (3 min/5 min, handler out of sight)</td><td>Fully off leash</td></tr>
    <tr><td>Utility</td><td>UD (Utility Dog)</td><td>Signal exercise (no verbal commands), scent discrimination (find handler's article by smell), directed retrieve, moving stand, directed jumping</td><td>Fully off leash</td></tr>
    <tr><td>Utility Dog Excellent</td><td>UDX</td><td>Qualify in both Open B and Utility B at the same trial, 10 times</td><td>Fully off leash</td></tr>
    <tr><td>Obedience Trial Champion</td><td>OTCH</td><td>Accumulate points by winning placements in Open B and Utility B</td><td>Fully off leash</td></tr>
  </tbody>
</table>
<div class="key-box"><strong>Start at Novice, not Beginners:</strong> Beginners Novice exists as an entry point but most serious competitors start at Novice. Get CGC first, train solid off-leash basics, then start entering Novice trials. You need three qualifying scores ("legs") under two different judges to earn each title.</div>

<h2 id="exercises">Key Exercises in Detail</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Heelwork</strong><p>Dog walks in exact heel position — shoulder aligned with handler's left leg, straight and attentive. Includes left turns, right turns, about-turns, slow, normal, and fast pace. Scored for position, attention, and smoothness of transitions.</p></div>
  <div class="ga-hl-card"><strong>Recall / Drop on Recall</strong><p>Dog stays while handler walks 40+ feet, turns, then calls the dog. In Open, the dog must also drop into a down on a signal mid-recall before being called to heel. Precision of the drop position is judged closely.</p></div>
  <div class="ga-hl-card"><strong>Retrieve on Flat & Over Jump</strong><p>Handler throws a dumbbell; dog retrieves it and delivers it to hand (no dropping, no mouthing). Jump version requires clearing the high jump cleanly on both send and return. Delivery must be clean — sitting straight in front, hold until taken.</p></div>
  <div class="ga-hl-card"><strong>Scent Discrimination (Utility)</strong><p>Handler scents one metal article and one leather article from a pile of 10. Dog must identify and retrieve handler's article by smell alone. One of the most impressive obedience exercises — dogs can do this reliably after 6–12 months of scent training.</p></div>
</div>

<h2 id="training">Training for Competition Precision</h2>
<p>Competition obedience demands a different level of training than everyday manners. Key principles that separate hobby training from competition preparation:</p>
<ul>
  <li><strong>Reward exact position, not approximate position:</strong> In competition, half an inch of crooked matters. Use targeting and shaping to build precisely straight sits, fronts, and finishes from the start</li>
  <li><strong>Fade food early in the proofing phase:</strong> Dogs must perform without visible treats in the ring. Transition to variable reinforcement and "gambling" (dog doesn't know which repetition earns the treat) well before your first trial</li>
  <li><strong>Proof against judge behavior:</strong> Judges walk near your dog, make notes on clipboards, stand close during the stand for exam. Expose your dog to strangers doing exactly these behaviors in practice</li>
  <li><strong>Train the long sit and down everywhere:</strong> A 3-minute sit or 5-minute down out of sight fails more teams than any other exercise. Practice in parks, parking lots, pet stores — anywhere with real distractions</li>
  <li><strong>Work on "ring nerves" — yours and your dog's:</strong> Dog sports are as much a mental game for the handler as the dog. Video your training sessions; many handlers are shocked to see how tense they are compared to their relaxed at-home self</li>
</ul>
<div class="tip-box"><strong>Join an obedience club:</strong> Training alone produces slower progress. Obedience clubs hold weekly training nights with experienced mentors, ring setups, and mock trials. Find an AKC-affiliated obedience club at akc.org/sports/obedience/clubs/.</div>

<h2 id="clubs">Finding Clubs and Trials</h2>
<p>AKC obedience trials are held year-round across the US. Most are hosted by all-breed dog clubs or specialty obedience clubs. To find events:</p>
<ul>
  <li><strong>AKC Events Search:</strong> apps.akc.org/apps/event_calendar — search by date, location, and event type (Obedience)</li>
  <li><strong>Local obedience clubs:</strong> Search "dog obedience club" + your city; most offer group classes specifically for competition preparation</li>
  <li><strong>AKC Club Search:</strong> akc.org/sports/obedience/clubs/ for affiliated clubs near you</li>
</ul>
<p>Before entering your first trial, attend several as a spectator. Watch how the patterns flow, how the judge communicates, and how experienced teams present their dogs. This eliminates most "first trial" surprises.</p>

<h2 id="titles">Titles, Points, and What They Mean</h2>
<p>AKC obedience titles appear as suffixes on your dog's registered name. Each trial exercise is scored out of points (typically 40 per exercise, 200 total). A "qualifying score" is 170+ with no individual exercise below 50% of its maximum. You need three qualifying scores under at least two judges for each title.</p>
<p>The OTCH (Obedience Trial Champion) is one of the rarest and most prestigious titles in all of dog sports — it requires consistent top placements, not just qualifying scores. Dogs who earn OTCH are performing at an elite level that represents years of intensive training.</p>
`
},

// ─── 5. AGILITY TRAINING ──────────────────────────────────────────────────
{
  file: 'agility-training.html',
  title: 'Dog Agility Training — Getting Started from Zero',
  crumb: 'Agility Training',
  tag: '🚀 Professional',
  h1: 'Dog Agility Training — Getting Started from Zero',
  desc: 'What agility involves, the equipment and obstacle types, how to train foundation skills before ever touching a jump, and how to get into your first trial.',
  meta: '⏱ 11 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#what">What Agility Is</a></li>
        <li><a href="#equipment">The Obstacles</a></li>
        <li><a href="#foundation">Foundation Skills First</a></li>
        <li><a href="#sequence">Building to Full Courses</a></li>
        <li><a href="#trials">Getting to Your First Trial</a></li>`,
  related: `<li><a href="canine-good-citizen.html">CGC Test Prep</a></li>
            <li><a href="competitive-obedience.html">Competitive Obedience</a></li>
            <li><a href="nose-work-scent-detection.html">Nose Work</a></li>`,
  body: `
<p class="ga-lede">Agility is the fastest-growing dog sport in the world — a team sport where handler and dog navigate an obstacle course together against the clock. It builds an extraordinary partnership, gives high-energy dogs a job, and is genuinely exhilarating to watch and do. Here's how to start from scratch.</p>

<h2 id="what">What Agility Is</h2>
<p>In agility competition, a dog runs a course of 14–20 obstacles in a specific order, directed only by the handler's body language and verbal cues. The handler runs alongside (or ahead or behind) and uses motion, position, and arm signals to guide the dog. Leashes, food, and toys are not permitted on course.</p>
<p>Courses are not known in advance — handlers walk the course alone (without dogs) for 8–10 minutes before competing, memorizing the sequence and planning their handling path. Then they run it with their dog, relying on trained cues and real-time communication.</p>
<div class="key-box"><strong>Agility is a team sport.</strong> The handler's skill matters as much as the dog's. Most agility "mistakes" are handler errors — being late with a signal, running the wrong path, or calling a cue at the wrong moment. This is what makes it fascinating and endlessly challenging.</div>

<h2 id="equipment">The Obstacles — What Your Dog Needs to Learn</h2>
<table class="ga-table">
  <thead><tr><th>Obstacle</th><th>Description</th><th>Height?</th><th>Training Difficulty</th></tr></thead>
  <tbody>
    <tr><td>Jump</td><td>Bar jump at measured height based on dog's height at withers</td><td>8–26" depending on class</td><td>Easy — most dogs jump naturally</td></tr>
    <tr><td>Tire Jump</td><td>Dog jumps through a suspended tire</td><td>Breed-height based</td><td>Moderate — precision needed to aim through</td></tr>
    <tr><td>Tunnel</td><td>Fabric tunnel, 10–20 feet, usually curved</td><td>N/A</td><td>Easy — most dogs love tunnels</td></tr>
    <tr><td>Weave Poles</td><td>12 upright poles; dog weaves through in a specific pattern</td><td>N/A</td><td>Hard — the most technically difficult obstacle; takes 3–12 months to master</td></tr>
    <tr><td>A-Frame</td><td>Two ramps forming an inverted V; dog climbs up and down, hitting the yellow contact zone</td><td>5'6" at apex</td><td>Moderate — the contact zone is the challenge</td></tr>
    <tr><td>Dog Walk</td><td>Narrow elevated plank 4" wide; dog walks up, across, down; hits contact zones at each end</td><td>4' elevated</td><td>Moderate — balance and contact zone training</td></tr>
    <tr><td>Teeter-Totter</td><td>Seesaw; dog walks to the end, teeter tips, dog hits contact zone</td><td>Pivots at 2'</td><td>Moderate-Hard — the tip is unpredictable; requires confidence training</td></tr>
    <tr><td>Table/Pause Box</td><td>Dog jumps on table, performs a 5-second sit or down</td><td>8–24"</td><td>Moderate — impulse control under excitement is hard</td></tr>
  </tbody>
</table>

<h2 id="foundation">Foundation Skills — Train These Before Touching Equipment</h2>
<p>Most beginner mistakes involve rushing to the obstacles before the dog has the foundational communication skills. A dog who can't do these things is not ready for equipment:</p>
<ol class="step-list">
  <li><strong>Target training (hand target):</strong> Dog touches nose to your hand palm on cue. This becomes your primary directional signal on course.</li>
  <li><strong>Wrap (left and right):</strong> Dog can wrap around a cone or object to either side on a single verbal cue. This is the foundation of all jump handling.</li>
  <li><strong>Body awareness:</strong> Dog knows where its hind feet are — essential for contact obstacles and weave poles. Train on balance boards, cavaletti poles, and foot target boxes.</li>
  <li><strong>Restrained recalls:</strong> High-speed recall toward you while you move away. Builds the drive and speed needed for competition.</li>
  <li><strong>Start line stay:</strong> Dog stays at the start line while you lead out 10–20 feet. This is your biggest tactical advantage on course.</li>
  <li><strong>Tunnel introduction:</strong> 90% of dogs will run a tunnel on day one. Introduce early; it builds drive and confidence.</li>
</ol>
<div class="warning-box"><strong>Do not jump puppies on full-height equipment.</strong> Growth plates in large breeds aren't closed until 12–18 months. Train contact obstacles and weave poles on low/modified equipment until your vet confirms growth plate closure. Premature jumping can cause permanent joint damage.</div>

<h2 id="sequence">Building from Obstacles to Full Courses</h2>
<p>Progression in agility: single obstacle → two obstacles in sequence → three → short sequences → half courses → full courses. This typically takes 12–18 months of regular training (2–3 sessions per week).</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Months 1–3</strong><p>Foundation skills + tunnel + low jumps. Focus entirely on communication and drive-building. No contact obstacles or weaves yet.</p></div>
  <div class="ga-hl-card"><strong>Months 3–6</strong><p>Introduce A-frame, dog walk, teeter at low/modified heights. Begin 2-pole weave introduction. Short 2–4 obstacle sequences.</p></div>
  <div class="ga-hl-card"><strong>Months 6–12</strong><p>Full-height contacts with solid contact zone behavior. Continue weave pole progression toward 12 poles. 6–10 obstacle sequences. First handling maneuvers (front cross, blind cross).</p></div>
  <div class="ga-hl-card"><strong>Months 12–18</strong><p>Full 12-pole weaves at speed. Full courses. Practice with different course maps. Mock trials. Ready for first competition.</p></div>
</div>

<h2 id="trials">Getting to Your First Trial</h2>
<p>The three major agility organizations in the US — AKC, USDAA, and CPE — all have beginner-friendly entry levels:</p>
<ul>
  <li><strong>AKC Agility Novice:</strong> Full course, 15 obstacles, faults allowed. Must be AKC registered (or use ILP/PAL for mixed breeds). Find events at akc.org</li>
  <li><strong>USDAA Starters:</strong> Simpler courses, more forgiving rules. Open to all breeds including mixed breeds</li>
  <li><strong>CPE (Canine Performance Events):</strong> Most beginner-friendly organization; level 1 courses are short and simple; all breeds welcome</li>
</ul>
<p>At your first trial: your goal is to complete the course without leaving the ring. Qualifying is a bonus. Most experienced handlers will tell you their first trial was a blur — you'll be nervous, your dog will sense it, and nothing will go as practiced. This is completely normal. The second trial is always better.</p>
`
},

// ─── 6. NOSE WORK / SCENT DETECTION ──────────────────────────────────────
{
  file: 'nose-work-scent-detection.html',
  title: 'Nose Work & Scent Detection — Dog Sniffing Sport Guide',
  crumb: 'Nose Work & Scent Detection',
  tag: '👃 Professional',
  h1: 'Nose Work & Scent Detection — Starting from Scratch',
  desc: 'AKC Scent Work and NACSW nose work explained — how to introduce the odors, build drive, and progress from boxes to vehicles and exteriors at competition level.',
  meta: '⏱ 11 min read &nbsp;|&nbsp; 🗓 Updated 2025',
  toc: `<li><a href="#what">What Nose Work Is</a></li>
        <li><a href="#odors">The Target Odors</a></li>
        <li><a href="#foundation">Foundation: Box Searches</a></li>
        <li><a href="#environments">Search Environments</a></li>
        <li><a href="#trials">Entering Your First Trial</a></li>`,
  related: `<li><a href="agility-training.html">Agility Training</a></li>
            <li><a href="competitive-obedience.html">Competitive Obedience</a></li>
            <li><a href="mental-stimulation.html">Mental Stimulation Games</a></li>`,
  body: `
<p class="ga-lede">A dog's nose is 10,000–100,000 times more sensitive than a human's. Nose work gives dogs the chance to use that superpower in a structured, rewarding way — and for the dog, it is genuinely joyful. It's also one of the few dog sports that any dog can do, regardless of age, breed, or physical limitation.</p>

<h2 id="what">What Nose Work Is</h2>
<p>Nose work is a sport based on professional scent detection work used by search-and-rescue and narcotics detection teams. Dogs are trained to find a specific odor hidden in various environments — boxes, interior rooms, vehicles, and outdoor areas — and indicate its location to their handler.</p>
<p>Unlike most dog sports, the handler's job in nose work is mostly to stay out of the way and trust the dog. The dog works independently, following the odor cone to its source. Handlers learn to read their dog's body language — the change in tail carriage, the head snap, the quickened breathing when the dog hits the odor plume — and call "alert" when the dog is on source.</p>
<div class="key-box"><strong>Who nose work is perfect for:</strong> Reactive dogs (searches are done one dog at a time — no other dogs present). Senior dogs (low physical demand). Fearful or shy dogs (builds confidence through success). High-drive working breeds that need a mental challenge. Any dog, any age, any physical ability. Nose work has no height or speed requirements.</div>

<h2 id="odors">The Target Odors</h2>
<p>AKC Scent Work and NACSW (National Association of Canine Scent Work) both use three birch essential oils as the target odors — plus anise and clove for more advanced levels. These odors were chosen because they're:</p>
<ul>
  <li>Distinct and easy for dogs to identify from competing environmental odors</li>
  <li>Not naturally found in most search environments (reduces false alerts)</li>
  <li>Safe and non-toxic for dogs when used in small amounts</li>
</ul>
<table class="ga-table">
  <thead><tr><th>Level</th><th>Odors Used</th><th>Organization</th></tr></thead>
  <tbody>
    <tr><td>Novice / NW1</td><td>Birch only</td><td>AKC & NACSW</td></tr>
    <tr><td>Advanced / NW2</td><td>Birch + Anise</td><td>AKC & NACSW</td></tr>
    <tr><td>Excellent / NW3</td><td>Birch + Anise + Clove</td><td>AKC & NACSW</td></tr>
    <tr><td>Elite / L4+</td><td>All three + specialized hides</td><td>AKC Elite</td></tr>
  </tbody>
</table>
<div class="tip-box"><strong>Start with birch only.</strong> Do not introduce multiple odors simultaneously — it confuses dogs early in training. Master birch to a high level of reliability before introducing anise, then clove, at least 2–3 months apart.</div>

<h2 id="foundation">Foundation Training: The Box Search</h2>
<p>Every dog starts nose work the same way: with boxes. This phase builds the crucial association that odor = reward, and establishes the dog's "alert" behavior (the way they signal they've found the source).</p>
<ol class="step-list">
  <li><strong>Set up 10–12 boxes in a room.</strong> Place a tin with a birch-scented cotton swab and a high-value treat in just one box. All other boxes are empty.</li>
  <li><strong>Let the dog investigate freely.</strong> When the dog sniffs the hot box, drop a treat into it. No verbal cue yet — let the dog discover the odor/reward connection through their own nose.</li>
  <li><strong>Repeat 5–10 repetitions per session,</strong> rotating which box is "hot" each time. The dog quickly learns: the specific smell = treats appear.</li>
  <li><strong>Introduce your alert cue.</strong> Once the dog is clearly pausing and sniffing at the hot box: add your verbal marker ("yes!" or a clicker) the moment they nose the source box, then reward.</li>
  <li><strong>Increase difficulty gradually:</strong> Move the hot box to harder-to-reach locations. Add elevation (on a shelf). Add "distractors" (food in a non-odor box). The dog learns to ignore distractors and follow the birch odor.</li>
  <li><strong>Introduce the search cue:</strong> "Find it!" said when the dog enters the search area. This becomes your consistent start signal for all future searches.</li>
</ol>

<h2 id="environments">The Four Search Environments</h2>
<p>AKC Scent Work tests dogs across four search environments, each with different challenges. Proof each environment to a high standard before entering trials:</p>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><strong>Containers</strong><p>Boxes, bags, luggage, or other objects. The foundational environment — most dogs are most confident here. Hides are placed in specific containers among a group.</p></div>
  <div class="ga-hl-card"><strong>Interiors</strong><p>Inside a room — hides placed on furniture, along walls, inside drawers. Odor pools and moves differently indoors due to HVAC flow; handlers must learn to read airflow patterns.</p></div>
  <div class="ga-hl-card"><strong>Exteriors</strong><p>Outside areas — parking lots, playgrounds, building perimeters. Wind is the variable. Odor disperses and pools unpredictably. Most advanced handlers find this the most difficult environment.</p></div>
  <div class="ga-hl-card"><strong>Vehicles</strong><p>Search the outside of 1–4 vehicles for a hide placed in the wheel well, bumper, seam, or undercarriage. Dogs search on leash; handlers must stay out of the dog's working path.</p></div>
</div>

<h2 id="trials">Entering Your First Trial</h2>
<p>Both AKC and NACSW offer beginner-level trials that are welcoming to new teams:</p>
<ul>
  <li><strong>AKC Scent Work — Novice level:</strong> One odor (birch), one hide per element, timed (3–4 minutes per search). Find events at akc.org. All breeds welcome (including mixed breeds via AKC Canine Partners enrollment).</li>
  <li><strong>NACSW NW1 trial:</strong> Three elements (Interior, Exterior, Containers), one hide each, birch only. Known number of hides (dogs always have one hide to find). Find events at nacsw.net.</li>
</ul>
<p>Key trial preparation:</p>
<ul>
  <li>Practice in locations you've never trained in — novel environments are what trials will feel like</li>
  <li>Do "cold searches" with no warm-up: walk your dog from the car directly to a novel search area, just as you will at a trial</li>
  <li>Practice your "alert" call timing — calling alert too early (before the dog is on source) is a false alert and a failure; wait for your dog to commit</li>
  <li>Attend a trial as a spectator first — watch how the search areas are run, how the handlers move, how judges score alerts</li>
</ul>
<div class="tip-box"><strong>Nose work is one of the only sports where handler nervousness actually helps.</strong> Your elevated heart rate and adrenaline excite the dog and increase drive. Many competitors report their dogs work faster at trials than in training — embrace the energy.</div>
`
}

]; // end GUIDES

GUIDES.forEach(cfg => {
  const html = page(cfg);
  const outPath = path.join(OUT, cfg.file);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Created:', outPath);
});
console.log(`Done: Professional training guides (${GUIDES.length} pages)`);
