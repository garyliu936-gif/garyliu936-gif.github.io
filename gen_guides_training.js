const fs = require('fs');
const path = require('path');

function nav(active) {
  const items = [['/', 'Home'],['/breeds/index.html','Dog Breeds'],['/getting-a-dog/index.html','Getting a Dog'],['/training/index.html','Training'],['/health/index.html','Health'],['/nutrition/index.html','Nutrition'],['/grooming/index.html','Grooming']];
  const links = items.map(([href, label]) => `<li><a href="${href}"${href.includes(active) && active !== '/' ? ' style="color:var(--teal)"' : ''}>${label}</a></li>`).join('');
  return `<nav class="navbar" id="navbar"><div class="nav-container"><a href="/index.html" class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></a><ul class="nav-links" id="navLinks">${links}</ul><button class="hamburger" id="hamburger"><span></span><span></span><span></span></button></div></nav>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><div class="nav-logo"><span class="logo-paw">🐾</span><span class="logo-text">AllDog<span class="logo-accent">Facts</span></span></div><p>A free, in-depth encyclopedia for dog owners and lovers.</p></div><div class="footer-col"><h4>Training</h4><ul><li><a href="/training/sit-stay-come.html">Sit, Stay, Come</a></li><li><a href="/training/potty-training.html">Potty Training</a></li><li><a href="/training/crate-training.html">Crate Training</a></li></ul></div><div class="footer-col"><h4>Dog Care</h4><ul><li><a href="/health/index.html">Health Guides</a></li><li><a href="/nutrition/index.html">Nutrition</a></li><li><a href="/grooming/index.html">Grooming</a></li></ul></div><div class="footer-col"><h4>Dog Breeds</h4><ul><li><a href="/breeds/labrador-retriever.html">Labrador Retriever</a></li><li><a href="/breeds/index.html">All 302 Breeds</a></li></ul></div></div><div class="footer-bottom"><p>© 2025 AllDogFacts. All rights reserved.</p></div></div></footer>`;
}
function page(cfg) {
  const tocHtml = cfg.toc.map(t => `<li><a href="#${t.id}">${t.label}</a></li>`).join('');
  const relatedHtml = cfg.related.map(r => `<li><a href="${r.url}">${r.title}</a></li>`).join('');
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
  ${nav('training')}
  <section class="ga-hero" style="background:${cfg.heroBg}">
    <div class="container">
      <nav class="ga-breadcrumb"><a href="/index.html">Home</a><span>›</span><a href="/training/index.html">Training</a><span>›</span>${cfg.title}</nav>
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
      <div class="ga-scard"><h4>Related Guides</h4><ul class="ga-related-list">${relatedHtml}</ul></div>
    </aside>
  </div></div></div>
  ${footer()}
  <script src="/js/main.js"></script>
</body>
</html>`;
}

const BG = 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)';

const GUIDES = [
  {
    slug: 'sit-stay-come',
    title: 'Sit, Stay, Come — Teaching the Core 3 Commands',
    metaDesc: 'Step-by-step guide to teaching sit, stay, and come. The three commands every dog needs, with common mistakes to avoid.',
    heroTag: 'Basic Commands', heroBg: BG,
    h1: 'Sit, Stay, Come — <span class="hl">The Core 3 Commands</span>',
    desc: 'The three commands that form the foundation of all dog training. Master these first and everything else becomes easier.',
    readTime: '9 min read', level: 'Beginner',
    toc: [{id:'why',label:'Why These Three First?'},{id:'sit',label:'Teaching Sit'},{id:'stay',label:'Teaching Stay'},{id:'come',label:'Teaching Come'},{id:'mistakes',label:'Common Mistakes'},{id:'tips',label:'Practice Schedule'}],
    body: `<p class="ga-lede">Every training plan starts here. Sit, Stay, and Come (recall) are not just party tricks — they're safety commands. A reliable "come" can pull your dog back from a dangerous road. A solid "stay" keeps them calm at the door when guests arrive. A quick "sit" interrupts unwanted behavior instantly. Learn these three first and you'll have the tools to handle most everyday situations.</p>
<h2 id="why">Why These Three First?</h2>
<p>These commands share a key advantage: they create a default behavior. When your dog doesn't know what to do, they'll default to whatever you've rewarded most. A dog that sits automatically when uncertain is infinitely easier to manage than one that jumps, barks, or bolts. These three commands build that foundation.</p>
<div class="tip-box"><strong>💡 The golden rule of dog training:</strong> Reward what you want to see more of. Ignore (or redirect) what you don't. Punishment teaches fear; reward teaches behavior.</div>
<h2 id="sit">Teaching Sit</h2>
<p><strong>What you need:</strong> 10–15 small, soft treats. A quiet space with minimal distractions. Your dog on leash to prevent wandering.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Lure the sit</strong><br>Hold a treat at your dog's nose. Slowly move it up and back over their head. As their nose follows the treat up, their bottom naturally goes down. The moment their bottom touches the floor — click or say "yes!" and give the treat.</div></li>
  <li><div class="step-content"><strong>Repeat 5–10 times per session</strong><br>Do this until your dog follows the lure reliably. Don't add the verbal cue yet — wait until the behavior is happening consistently.</div></li>
  <li><div class="step-content"><strong>Add the word "sit"</strong><br>Once they're sitting reliably with the hand lure, say "sit" just before you begin the lure motion. Over time, the word becomes the cue and the hand motion fades.</div></li>
  <li><div class="step-content"><strong>Fade the lure</strong><br>Gradually reduce the treat in your hand. Use the same hand motion (now an empty hand signal) and reward from your other hand or treat pouch. Most dogs make this transition in 3–5 sessions.</div></li>
</ol>
<h2 id="stay">Teaching Stay</h2>
<p>Stay is taught in three parts — duration (how long), distance (how far you move away), and distraction (what's happening around them). Master duration first; never rush to distance.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Start with one second</strong><br>Ask for sit. Open palm toward dog, say "stay." Wait one second. Reward while they're still in position. That's the key — reward BEFORE they move, not after.</div></li>
  <li><div class="step-content"><strong>Build duration slowly</strong><br>Increase to 2 seconds, then 3, then 5, then 10. If they break at 8 seconds, go back to 5 and build more slowly. Never increase by more than 50% at a time.</div></li>
  <li><div class="step-content"><strong>Add a release word</strong><br>Use a word like "free" or "okay" to signal that stay is over. Always release them clearly — otherwise they learn to break stay whenever they feel like it.</div></li>
  <li><div class="step-content"><strong>Add distance</strong><br>Only after they can hold stay for 30+ seconds with you right next to them. Take one step back, return, reward. Gradually increase to 5 feet, 10 feet, and eventually out of sight.</div></li>
</ol>
<h2 id="come">Teaching Come (Recall)</h2>
<p>Recall is the most important command your dog will learn — and the one most owners accidentally teach wrong. The #1 mistake: calling your dog to you and then doing something unpleasant (clipping nails, ending play, scolding them). After a few of those, "come" starts meaning "bad things happen."</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Make coming to you the best thing ever</strong><br>Start indoors. Say your dog's name + "come!" in a happy, excited voice. When they arrive, throw a party — treats, praise, petting, excitement. Every single time.</div></li>
  <li><div class="step-content"><strong>Practice on a long line outdoors</strong><br>Use a 15–30 foot training leash. Let them wander, then call. If they don't come, gently guide them in with the leash — never punish them for a slow recall. When they arrive, reward generously.</div></li>
  <li><div class="step-content"><strong>Never call them for something they dislike</strong><br>If you need to give a bath, trim nails, or end play — go get them. Don't call them. Protect the recall command by reserving it for positive associations only.</div></li>
  <li><div class="step-content"><strong>Practice everywhere</strong><br>Call them randomly throughout the day indoors — just for a treat. This builds the habit of running toward you the instant they hear their name + "come."</div></li>
</ol>
<h2 id="mistakes">Common Mistakes</h2>
<ul>
  <li><strong>Repeating commands</strong> — "Sit... sit... SIT..." teaches the dog that the first cue is optional. Say it once, then help them succeed.</li>
  <li><strong>Punishing a slow recall</strong> — If your dog finally comes to you after ignoring the first call, you must still reward them. The reward is for coming, not for speed.</li>
  <li><strong>Training when frustrated</strong> — Dogs read emotion perfectly. Frustration turns training into stress. End sessions before you get frustrated.</li>
  <li><strong>Sessions too long</strong> — Puppies have 3–5 minute attention spans. Adults can do 10–15 minute sessions. Stopping early beats grinding past the dog's focus limit.</li>
</ul>
<h2 id="tips">Practice Schedule</h2>
<p>For fastest results: 3–5 minute sessions, 2–3 times per day. That's just 10–15 minutes daily — less than one TV commercial break. Consistency beats length every time.</p>
<div class="key-box"><strong>Key Takeaway:</strong> These three commands will serve your dog for life. A dog that reliably sits, stays, and comes when called is safe in almost any situation. Invest in these first and training everything else becomes dramatically easier.</div>`,
    related: [{url:'/training/down-and-leave-it.html',title:'Down & Leave It Commands'},{url:'/training/potty-training.html',title:'Potty Training Your Puppy'},{url:'/training/leash-pulling.html',title:'Stop Leash Pulling'}]
  },

  {
    slug: 'down-and-leave-it',
    title: 'Teaching "Down" and "Leave It"',
    metaDesc: 'Step-by-step guide to teaching your dog Down and Leave It — two commands that can literally save your dog\'s life.',
    heroTag: 'Basic Commands', heroBg: BG,
    h1: '"Down" and <span class="hl">"Leave It"</span>',
    desc: 'Two commands that can literally save your dog\'s life. "Leave it" stops them from eating dangerous items on every walk.',
    readTime: '7 min read', level: 'Beginner',
    toc: [{id:'why-these',label:'Why These Two Matter'},{id:'down',label:'Teaching Down'},{id:'leave-it',label:'Teaching Leave It'},{id:'real-world',label:'Real-World Practice'}],
    body: `<p class="ga-lede">"Down" creates a calm, stable position your dog can hold for extended periods — great for restaurants, vet waiting rooms, and meal times. "Leave it" is a safety command: the moment your dog spots a chicken bone on the sidewalk, a dead animal in the yard, or your child's dropped medication, "leave it" overrides the dog's instinct to grab it. These two commands work together to create a calmer, safer dog.</p>
<h2 id="why-these">Why These Two Matter</h2>
<p>"Down" is more calming than "sit" because it's a more vulnerable, relaxed position — dogs are less likely to jump up from a down. It also works better for longer stays in public. "Leave it" is the emergency stop for your dog's nose and mouth. Every dog who walks on a public street needs this command.</p>
<h2 id="down">Teaching Down</h2>
<p>Down is often harder than sit because dogs feel vulnerable lying down. Go slowly, especially with nervous or dominant dogs.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Start from a sit</strong><br>Ask for sit first. Hold a treat at your dog's nose, then slowly move it straight down toward the floor between their front paws. As their nose follows the treat down, their elbows may follow — reward the moment any elbow movement happens.</div></li>
  <li><div class="step-content"><strong>Reward partial progress</strong><br>Some dogs won't go all the way down at first. That's fine — reward each incremental movement toward the floor. This is called "shaping." Over 2–3 sessions, raise the bar gradually until only a full down earns the reward.</div></li>
  <li><div class="step-content"><strong>Try the "under the leg" lure</strong><br>Sit on the floor, bend one knee to create a low tunnel. Lure the treat under your knee — the dog has to duck down to follow it. Many dogs find this easier than the straight-down lure.</div></li>
  <li><div class="step-content"><strong>Add the word "down"</strong><br>Once they're doing it consistently, add the verbal cue just before the hand motion. Fade the lure over the following sessions until the word alone does the job.</div></li>
</ol>
<div class="warning-box"><strong>⚠️ Never use "down" for jumping up.</strong> Use "off" for that instead. Mixing the two creates confusion — your dog won't know whether "down" means "lie down" or "get off the couch."</div>
<h2 id="leave-it">Teaching Leave It</h2>
<p>Leave it is taught in two phases: leave food on the floor, then leave anything anywhere.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Phase 1 — Closed hand</strong><br>Hold a treat in your closed fist. Present it to your dog. They'll sniff, lick, paw at it. The moment they pull back or stop trying — click/yes and reward with a different treat from your other hand. Repeat until they back away immediately when you present the closed fist.</div></li>
  <li><div class="step-content"><strong>Add the word "leave it"</strong><br>Say "leave it" as you present the closed fist. Practice until they hear "leave it" and immediately look away from your hand.</div></li>
  <li><div class="step-content"><strong>Phase 2 — Open hand / floor</strong><br>Place a treat on the floor and cover it with your hand. Say "leave it." Gradually move your hand away — if they go for it, cover it again. Reward only from your other hand, never the treat they were told to leave.</div></li>
  <li><div class="step-content"><strong>Build to real-world items</strong><br>Practice with food scraps on walks, dropped items at home, and interesting smells. Always reward with something better than what they left — this teaches them that "leave it" predicts something even better is coming.</div></li>
</ol>
<h2 id="real-world">Real-World Practice</h2>
<p>Practice "down" in gradually more distracting environments: living room → front yard → quiet sidewalk → busy park. Practice "leave it" on every walk — when you see something on the ground ahead, cue "leave it" before the dog reaches it. Reward generously when they walk past.</p>
<div class="key-box"><strong>Key Takeaway:</strong> "Leave it" is the command that most often prevents a vet emergency. A dog that reliably leaves items on cue could one day walk past rat poison, a dropped pill, or a dead animal without incident. Practice it on every walk.</div>`,
    related: [{url:'/training/sit-stay-come.html',title:'Sit, Stay, Come — The Core 3'},{url:'/training/door-manners-jumping.html',title:'Door Manners & Jumping'},{url:'/health/toxic-foods.html',title:'Toxic Foods for Dogs'}]
  },

  {
    slug: 'door-manners-jumping',
    title: 'Door Manners & Stopping Your Dog from Jumping',
    metaDesc: 'Teach your dog calm door manners and stop jumping on guests. Step-by-step guide using positive reinforcement.',
    heroTag: 'Basic Commands', heroBg: BG,
    h1: 'Door Manners & <span class="hl">Stopping Jumping</span>',
    desc: 'Stop your dog from rushing the door or jumping on guests. Teaches calm greetings that everyone appreciates.',
    readTime: '7 min read', level: 'Beginner',
    toc: [{id:'why-jump',label:'Why Dogs Jump'},{id:'stop-jump',label:'Stopping Jumping'},{id:'door',label:'Door Manners'},{id:'guests',label:'Training With Guests'}],
    body: `<p class="ga-lede">Jumping and door-rushing are among the most common complaints from dog owners — and the most commonly reinforced. Every time you push a jumping dog away with your hands, you're giving them attention. Every time you open the door to a dog in a frenzy, you're rewarding door-rushing. The fix isn't complicated, but it requires consistency from every person who interacts with your dog.</p>
<h2 id="why-jump">Why Dogs Jump — and Why "No" Doesn't Work</h2>
<p>Dogs jump for attention. The moment you look at them, touch them (even to push away), or say anything — you've rewarded the jump with attention. Telling a jumping dog "no," "down," or "off" while looking at them is still giving them what they wanted. The only thing that ends jumping is the complete removal of attention.</p>
<h2 id="stop-jump">How to Stop Jumping</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Turn your back completely</strong><br>The moment your dog jumps: turn your back, cross your arms, look at the ceiling, say nothing. No eye contact, no touch, no words. Wait for four paws on the floor.</div></li>
  <li><div class="step-content"><strong>Reward four paws immediately</strong><br>The instant all four paws are on the floor, calmly praise and give a treat. Don't get excited — excitement triggers jumping again. Keep the reward calm and low.</div></li>
  <li><div class="step-content"><strong>Ask for an incompatible behavior</strong><br>Once they're reliably keeping four paws down, ask for "sit" as you approach. A dog that's sitting cannot simultaneously be jumping. Reward the sit generously.</div></li>
  <li><div class="step-content"><strong>Consistency across all people</strong><br>This only works if everyone in your household does the same thing. One person who "lets it slide" with puppies or when they're excited undoes weeks of training.</div></li>
</ol>
<div class="warning-box"><strong>⚠️ Never knee a dog in the chest or step on their paws</strong> to stop jumping. These methods cause pain and damage trust without teaching an alternative behavior.</div>
<h2 id="door">Door Manners</h2>
<p>A dog that bolts for the door when it opens is both annoying and dangerous. The goal is a dog that sits automatically when anyone approaches the door.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Practice door approach without opening</strong><br>Walk toward the door — if your dog rushes ahead or gets excited, stop moving. Wait for them to settle, then proceed. Repeat until they walk calmly alongside you.</div></li>
  <li><div class="step-content"><strong>Ask for sit before the door opens</strong><br>Before touching the door handle, ask for sit and stay. Begin to open the door — if they break, close the door and wait. The door opening only continues when they hold their sit.</div></li>
  <li><div class="step-content"><strong>Release with a word</strong><br>Use "okay" or "free" to release them through the door. This teaches that the door open doesn't automatically mean they can go through — only your release word does.</div></li>
</ol>
<h2 id="guests">Training With Guests</h2>
<p>Guests are the hardest part because they haven't read the training guide. Before visitors arrive, brief them: "Please ignore him completely until he's sitting. Don't pet him, don't look at him, don't say anything until he has four paws on the floor." Most guests are happy to cooperate when they understand why.</p>
<div class="tip-box"><strong>💡 Management tip:</strong> Keep your dog on leash when guests first arrive, or put them in another room until greetings are over. Management prevents the bad behavior from being rehearsed while training catches up.</div>
<div class="key-box"><strong>Key Takeaway:</strong> Jumping and door-rushing are self-reinforcing — every time the dog does them, they get what they wanted. Fixing it requires every person to stop accidentally rewarding the behavior. Consistency is everything.</div>`,
    related: [{url:'/training/sit-stay-come.html',title:'Sit, Stay, Come'},{url:'/training/place-and-off.html',title:'Place & Off Command'},{url:'/training/separation-anxiety.html',title:'Separation Anxiety'}]
  },

  {
    slug: 'place-and-off',
    title: 'The Place Command and Teaching "Off"',
    metaDesc: 'Teach your dog "place" to go to their bed on command and stay there. Perfect for mealtimes and when guests arrive.',
    heroTag: 'Basic Commands', heroBg: BG,
    h1: '"Place" and <span class="hl">"Off" Commands</span>',
    desc: '"Place" sends your dog to their bed and keeps them there — perfect for mealtimes, guests, and creating calm.',
    readTime: '7 min read', level: 'Intermediate',
    toc: [{id:'what-place',label:'What Is Place?'},{id:'teach-place',label:'Teaching Place'},{id:'build',label:'Building Duration & Distance'},{id:'off',label:'Teaching "Off"'},{id:'uses',label:'Real-Life Uses'}],
    body: `<p class="ga-lede">"Place" is one of the most practical commands you can teach a dog. It means "go to your designated spot and stay there until released." A dog on place can't jump on guests, counter surf, beg at the table, or get underfoot in the kitchen. Once mastered, it's essentially an "off switch" that creates calm on demand.</p>
<h2 id="what-place">What "Place" Actually Means</h2>
<p>Place means: go to this specific physical location (a bed, mat, or platform), get on it with all four paws, and stay until I release you. The location gives the command concrete meaning — it's not just "stay somewhere over there," it's "go to your specific spot." This specificity is what makes it so reliable.</p>
<h2 id="teach-place">Teaching Place — Step by Step</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Choose and introduce the place</strong><br>Pick a dog bed, rubber mat, or low platform. Toss treats onto it and let your dog discover them. The goal is for the bed to become a treat-associated location before any training starts.</div></li>
  <li><div class="step-content"><strong>Lure them onto it</strong><br>Standing near the mat, lure your dog onto it with a treat. The moment all four paws are on the mat — click/yes and reward. Repeat until they're stepping onto it readily.</div></li>
  <li><div class="step-content"><strong>Add the word "place"</strong><br>Say "place" as they step toward the mat. Reward with treats delivered while they're standing on it. Don't reward the step off yet — they should be staying on it to eat the treat.</div></li>
  <li><div class="step-content"><strong>Ask for a down on place</strong><br>Once they're reliably getting on the mat, ask for "down" while they're on it. A dog in a down on their mat is the finished version of place. Reward the down + stay combination heavily.</div></li>
</ol>
<h2 id="build">Building Duration and Distance</h2>
<p>Follow the same rules as "stay" training: build duration first, then distance. Start rewarding every 5 seconds, then every 10, then every 30 seconds, then every minute. Never increase by more than 50% at a time.</p>
<p>Once they'll stay on place for 2+ minutes while you stand nearby, begin moving away — first one step, then five feet, then out of the room briefly. Always return to deliver the reward before they've broken.</p>
<div class="tip-box"><strong>💡 Tip:</strong> The mistake most people make is waiting too long before rewarding. The dog breaks place and then gets rewarded when they return to it — but they've already rehearsed breaking. Keep the reward rate high early on.</div>
<h2 id="off">Teaching "Off"</h2>
<p>"Off" means "get off whatever surface you're currently on" — the couch, the bed, the counter, a person. It's different from "down" (which means lie down) and must be kept separate.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Lure off with a treat</strong><br>When your dog is on the couch, hold a treat near their nose and move it toward the floor, saying "off." The moment all four paws hit the floor — reward. Repeat.</div></li>
  <li><div class="step-content"><strong>Fade the lure</strong><br>Use the same hand motion without the treat visible. When they respond to the gesture, add just the word. Reward from your treat pouch when they comply.</div></li>
</ol>
<h2 id="uses">Real-Life Uses for Place</h2>
<ul>
  <li><strong>Mealtimes</strong> — dog on place means no begging at the table</li>
  <li><strong>Guest arrivals</strong> — send the dog to place before opening the door</li>
  <li><strong>Kitchen cooking</strong> — dog on place outside the kitchen means no underfoot danger</li>
  <li><strong>Video calls</strong> — send them to place so you're not on camera trying to manage an excited dog</li>
  <li><strong>Vet waiting room</strong> — a dog that will down-stay on a mat is dramatically calmer and easier to manage</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Place is one of the highest-value commands you can invest time in. It creates a dog that self-regulates in high-stimulation situations — which means less management and more enjoyment for you.</div>`,
    related: [{url:'/training/sit-stay-come.html',title:'Sit, Stay, Come'},{url:'/training/door-manners-jumping.html',title:'Door Manners & Jumping'},{url:'/training/mental-stimulation.html',title:'Mental Stimulation & Enrichment'}]
  },

  {
    slug: 'first-week-home',
    title: 'First Week Home With a New Puppy — Day by Day',
    metaDesc: 'What to do on day 1, day 3, and day 7 with a new puppy. Routine, boundaries, and bonding in exactly the right order.',
    heroTag: 'Puppy Training', heroBg: BG,
    h1: 'First Week Home — <span class="hl">Day by Day</span>',
    desc: 'The first week sets the tone for months of training. Here\'s exactly what to do each day to start on the right foot.',
    readTime: '8 min read', level: 'Beginner',
    toc: [{id:'day1',label:'Day 1 — Arrival'},{id:'days2-3',label:'Days 2–3'},{id:'days4-5',label:'Days 4–5'},{id:'days6-7',label:'Days 6–7'},{id:'routine',label:'The Weekly Routine'}],
    body: `<p class="ga-lede">The first week with a new puppy is simultaneously the most exciting and most exhausting week of dog ownership. What you do in these seven days shapes habits, builds trust, and sets expectations that will persist for years. The mistake most new owners make is either being too permissive ("they're so cute, let the rules start later") or too strict ("every behavior must be perfect immediately"). The right balance: clear, gentle structure from day one.</p>
<h2 id="day1">Day 1 — Arrival Day</h2>
<p>Your main goal today is: calm introduction, no overwhelm, first successful potty trip, and first night in the crate.</p>
<ul>
  <li><strong>Potty first:</strong> Take the puppy straight from the car to the designated potty spot. Wait. Reward generously when they go.</li>
  <li><strong>One room at a time:</strong> Introduce the puppy to one room (their space) rather than the whole house. Curiosity is good; overwhelming freedom is not.</li>
  <li><strong>Keep visitors away:</strong> No friends and family on day one. Let the puppy bond with the immediate family first.</li>
  <li><strong>Introduce the crate:</strong> Leave the crate door open with treats inside. Let them discover it on their own. Don't force them in.</li>
  <li><strong>First night:</strong> The crate should be in your bedroom if possible. The puppy hearing and smelling you nearby dramatically reduces first-night whining. Expect to wake up once or twice for a potty trip.</li>
</ul>
<div class="warning-box"><strong>⚠️ First-night whining:</strong> If the puppy whines in the crate at night, wait 10 minutes before responding. If whining continues, take them out for a quiet potty trip (no play, no fuss), then back in the crate. Do not bring them into the bed — this creates a habit that's hard to undo.</div>
<h2 id="days2-3">Days 2–3 — Establishing Routine</h2>
<p>Routines are your most powerful training tool with puppies. A predictable schedule reduces anxiety, speeds potty training, and makes behavior more consistent.</p>
<p><strong>Sample daily schedule:</strong></p>
<ul>
  <li>7:00 AM — Wake up, immediate potty trip (before anything else)</li>
  <li>7:15 AM — Breakfast, then potty trip 15 minutes after eating</li>
  <li>8:00–9:00 AM — Supervised play and exploration</li>
  <li>9:00–11:00 AM — Crate nap</li>
  <li>11:00 AM — Potty trip, play, brief training session (5 minutes)</li>
  <li>12:00–2:00 PM — Crate rest</li>
  <li>2:00–5:00 PM — Supervised time, play, another potty trip every 45–60 minutes</li>
  <li>5:30 PM — Dinner, potty trip 15 minutes after</li>
  <li>7:00–9:00 PM — Calm family time, potty trip every 60 minutes</li>
  <li>10:30 PM — Final potty trip, crate for the night</li>
</ul>
<h2 id="days4-5">Days 4–5 — First Training Sessions</h2>
<p>By day 4, the puppy has oriented to the home, the schedule is taking hold, and they're ready to start learning. Begin with "sit" — it's the easiest command and gives you immediate success to build on.</p>
<ul>
  <li>Two 5-minute training sessions per day (morning and evening)</li>
  <li>Use high-value treats: pea-sized bits of chicken, hot dog, or commercial soft treats</li>
  <li>End every session while the puppy is still engaged and succeeding — not when they're bored or confused</li>
  <li>Begin basic socialization: let the puppy see/hear different sounds, surfaces, and gentle novel experiences</li>
</ul>
<h2 id="days6-7">Days 6–7 — Expanding Boundaries</h2>
<p>If the crate routine is going well and potty accidents are decreasing, you can begin gently expanding the puppy's access to one additional room. Continue to supervise every moment outside the crate or puppy zone — one unsupervised minute can mean an accident or a chewed cable.</p>
<p>By end of week one, you should have: a puppy that knows their crate is a safe place, a potty routine that's working most of the time, one basic command (sit) in progress, and a puppy that's bonding with and trusting their new family.</p>
<h2 id="routine">The Power of Routine</h2>
<p>The single most important thing you can do in week one is establish and stick to a routine. Puppies thrive on predictability. A puppy who knows when they'll eat, play, nap, and go outside is a calmer, more confident puppy — and a faster learner.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Week one isn't about perfect behavior — it's about building trust, routine, and the foundation for everything that follows. Be patient, be consistent, and let the puppy succeed at small things. Every small success is a brick in the wall of a well-trained adult dog.</div>`,
    related: [{url:'/training/potty-training.html',title:'Potty Training Your Puppy'},{url:'/training/crate-training.html',title:'Crate Training'},{url:'/training/socialization.html',title:'Socialization — The Critical Window'}]
  },

  {
    slug: 'potty-training',
    title: 'Potty Training Your Puppy — The Fastest Method',
    metaDesc: 'The fastest house-training method for puppies. Schedule, signals, and what to do when accidents happen.',
    heroTag: 'Puppy Training', heroBg: BG,
    h1: 'Potty Training <span class="hl">Your Puppy</span>',
    desc: 'The fastest house-training method — the schedule to follow, how to read your puppy\'s signals, and how to handle accidents.',
    readTime: '8 min read', level: 'Beginner',
    toc: [{id:'how-long',label:'How Long Does It Take?'},{id:'schedule',label:'The Potty Schedule'},{id:'signals',label:'Reading the Signals'},{id:'accidents',label:'Handling Accidents'},{id:'mistakes',label:'Why Training Stalls'}],
    body: `<p class="ga-lede">Potty training takes 4–8 weeks for most puppies — longer for small breeds, shorter for breeds with strong den instincts. The speed depends almost entirely on one thing: how consistent you are with the schedule. A puppy trained inconsistently takes twice as long. There are no shortcuts to the schedule — but the schedule itself is simple.</p>
<h2 id="how-long">How Long Does It Actually Take?</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><div class="hl-emoji">🐩</div><strong>Small breeds</strong><span>6–12 weeks (smaller bladder)</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🐕</div><strong>Medium breeds</strong><span>4–6 weeks typical</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🐕‍🦺</div><strong>Large breeds</strong><span>3–5 weeks typical</span></div>
</div>
<p>A puppy can hold their bladder approximately one hour per month of age, plus one. An 8-week puppy (2 months old) can hold it for about 3 hours maximum — less during play and right after waking up or eating.</p>
<h2 id="schedule">The Potty Schedule</h2>
<p>Take your puppy outside at every one of these trigger moments — no exceptions:</p>
<ul>
  <li>Immediately upon waking (from night sleep or any nap)</li>
  <li>Within 15–20 minutes after eating or drinking</li>
  <li>After any period of active play</li>
  <li>After any excitement (visitors, new stimulation)</li>
  <li>Every 45–60 minutes during active awake time</li>
  <li>Immediately before crate time</li>
  <li>Last thing before bed</li>
</ul>
<p>Always go to the same spot. The familiar scent triggers the elimination reflex. Use a consistent cue word ("go potty," "do your business") as they're sniffing — over time, this cue becomes usable in new locations.</p>
<div class="tip-box"><strong>💡 When they go:</strong> Praise immediately while they're still going (not after — the moment is important). Then give a high-value treat the second they finish. The faster you reward, the faster they connect outdoor = reward.</div>
<h2 id="signals">Reading the Signals</h2>
<p>Puppies give signals before they go. Learn to recognize them early:</p>
<ul>
  <li>Sniffing the floor in circles</li>
  <li>Walking away from play suddenly</li>
  <li>Squatting or getting low</li>
  <li>Restlessness or pacing</li>
  <li>Moving toward a corner or hidden area</li>
</ul>
<p>The moment you see any of these: pick up the puppy or move them quickly to the door. Don't chase them — you'll startle them into going right there.</p>
<h2 id="accidents">Handling Accidents</h2>
<p>Accidents will happen. How you respond matters:</p>
<ul>
  <li><strong>Catch them in the act:</strong> A calm, firm "ah-ah!" or clap hands — then immediately take them outside to finish. Praise if they do.</li>
  <li><strong>Find it after:</strong> Say nothing. Clean it thoroughly with enzymatic cleaner. The puppy has no connection between the old accident and your current reaction — scolding after the fact teaches nothing except to fear your unpredictable anger.</li>
  <li><strong>Never:</strong> Rub their nose in it. This is outdated, ineffective, and damages trust.</li>
</ul>
<h2 id="mistakes">Why Training Stalls</h2>
<ul>
  <li><strong>Too much freedom too soon</strong> — giving unsupervised access to the whole house before training is solid leads to hidden accidents that undermine progress</li>
  <li><strong>Inconsistent schedule</strong> — skipping outdoor trips because it's convenient means more accidents inside</li>
  <li><strong>Not cleaning accidents properly</strong> — if the scent remains, the spot will be used again. Enzymatic cleaner only.</li>
  <li><strong>Punishing after the fact</strong> — creates anxiety, which leads to more accidents, especially when the puppy feels nervous</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Potty training is 90% schedule and 10% everything else. Every accident is a management failure, not a training failure — it means the puppy was given an opportunity to go inside without being taken out first. Control the schedule, control the accidents.</div>`,
    related: [{url:'/training/crate-training.html',title:'Crate Training Step by Step'},{url:'/training/first-week-home.html',title:'First Week Home'},{url:'/getting-a-dog/new-puppy-checklist.html',title:'New Puppy Checklist'}]
  },

  {
    slug: 'crate-training',
    title: 'Crate Training Step by Step',
    metaDesc: 'How to crate train a dog or puppy so the crate feels like a safe den they love, not a punishment.',
    heroTag: 'Puppy Training', heroBg: BG,
    h1: 'Crate Training <span class="hl">Step by Step</span>',
    desc: 'A crate should feel like a safe den, not punishment. This guide makes your dog love their crate in 1–2 weeks.',
    readTime: '8 min read', level: 'Beginner',
    toc: [{id:'why-crate',label:'Why Crate Training Works'},{id:'right-crate',label:'Choosing the Right Crate'},{id:'intro',label:'Introducing the Crate'},{id:'duration',label:'Building Crate Duration'},{id:'overnight',label:'Overnight Crate Training'},{id:'mistakes',label:'Common Mistakes'}],
    body: `<p class="ga-lede">The crate, done right, becomes your dog's favorite spot in the house. Dogs are den animals — they naturally seek small, enclosed spaces for rest and safety. The crate meets this instinct perfectly. Crate training achieves three things simultaneously: it accelerates house-training, it prevents destructive behavior during unsupervised time, and it gives the dog a safe retreat when overwhelmed. The key is introducing it positively from the very first moment.</p>
<h2 id="why-crate">Why Crate Training Works</h2>
<p>A crate is not a cage used for punishment — it's a management tool and a safe space. Dogs that are crate trained are less anxious, house-train faster, travel more easily, and have a lower risk of injury from unsupervised chewing. When used correctly, most dogs seek out their crate voluntarily for naps.</p>
<div class="warning-box"><strong>⚠️ The crate is NOT for:</strong> punishment, extended confinement (more than 4 hours for adult dogs, less for puppies), or housing a dog with severe separation anxiety without professional guidance.</div>
<h2 id="right-crate">Choosing the Right Crate</h2>
<p>Size matters more than most people realize. The crate should be just large enough for the dog to stand up, turn around, and lie down comfortably — nothing more. Too much space allows the puppy to sleep in one corner and eliminate in another, defeating the house-training purpose.</p>
<p>For puppies, buy the adult-size crate and use a divider panel to reduce the space — then expand it as they grow. Wire crates with dividers are the most economical long-term option.</p>
<h2 id="intro">Introducing the Crate</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Set it up and ignore it</strong><br>Place the crate with the door open in a common area. Put a soft blanket inside and a few treats near (not inside) the entrance. Let the dog investigate on their own. No pushing or guiding — all exploration must be voluntary.</div></li>
  <li><div class="step-content"><strong>Toss treats inside</strong><br>Randomly toss treats into the crate throughout the day. Let the dog go in, get the treat, and come back out. Don't close the door yet — the goal right now is simply "going into the crate is great."</div></li>
  <li><div class="step-content"><strong>Feed meals near, then inside the crate</strong><br>Start feeding meals just outside the door. Over 2–3 meals, move the bowl to just inside the entrance, then deeper inside. Close the door briefly while they eat — open it before they finish. Gradually extend the closed time.</div></li>
  <li><div class="step-content"><strong>First closed-door session</strong><br>Once they're eating in the crate calmly, try a short session: dog in crate, door closed, you sit right next to it. 2–3 minutes. Open before whining starts. Reward with a treat when you open it — not before (this would reward any whining).</div></li>
</ol>
<h2 id="duration">Building Crate Duration</h2>
<p>Increase crate time in small increments:</p>
<ul>
  <li>Day 3–4: 5–10 minutes closed while you're in the room</li>
  <li>Day 5–6: 15–30 minutes while you're in another room</li>
  <li>Day 7–10: 30–90 minutes</li>
  <li>Week 2+: Up to the age-appropriate limit (1 hour per month of age + 1)</li>
</ul>
<p>A stuffed, frozen KONG is the most powerful crate tool available. A KONG filled with peanut butter and kibble and then frozen takes 20–30 minutes to consume and makes the crate an intensely positive experience.</p>
<h2 id="overnight">Overnight Crate Training</h2>
<p>Place the crate in your bedroom for the first 2–4 weeks. The sound and smell of you nearby prevents most whining. A puppy 8–10 weeks old will need one potty trip per night — typically around 2–3 AM. Wake them before they cry if possible, take out for a quiet potty trip (no excitement, no play), then back in the crate.</p>
<h2 id="mistakes">Common Mistakes</h2>
<ul>
  <li><strong>Crating too long</strong> — exceeding age-appropriate limits causes accidents and creates negative associations</li>
  <li><strong>Using the crate as punishment</strong> — sending the dog to the crate when you're angry teaches them that crate = bad things happen</li>
  <li><strong>Releasing on whining</strong> — if you open the crate while the dog is crying, you've taught them that crying opens the door</li>
  <li><strong>Progressing too fast</strong> — if the dog is stressed at any stage, go back to the previous stage and slow down</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> The crate becomes a sanctuary, not a jail, when introduced at the dog's pace with positive associations. Most dogs that are crate trained from puppyhood will sleep in their crate voluntarily for the rest of their lives.</div>`,
    related: [{url:'/training/potty-training.html',title:'Potty Training Your Puppy'},{url:'/training/separation-anxiety.html',title:'Separation Anxiety'},{url:'/training/first-week-home.html',title:'First Week Home'}]
  },

  {
    slug: 'socialization',
    title: 'Puppy Socialization — The Critical Window',
    metaDesc: 'The puppy socialization window closes at 14 weeks. How to socialize safely before full vaccination and what happens if you miss it.',
    heroTag: 'Puppy Training', heroBg: BG,
    h1: 'Puppy Socialization — <span class="hl">The Critical Window</span>',
    desc: 'Puppies have a socialization window from 3–14 weeks. Miss it and you\'ll spend years fixing fear and reactivity.',
    readTime: '8 min read', level: 'Beginner',
    toc: [{id:'window',label:'The Socialization Window'},{id:'what-to-expose',label:'What to Socialize To'},{id:'safe',label:'Socializing Before Full Vaccines'},{id:'how',label:'How to Socialize Correctly'},{id:'missed',label:'If You Missed the Window'}],
    body: `<p class="ga-lede">There is a limited biological window — roughly 3 to 14 weeks of age — during which a puppy's brain is specifically primed to accept new experiences as normal. Experiences during this period become the puppy's "baseline" for what the world looks and sounds like. Miss this window and the dog will spend its life treating normal, everyday things as threatening. Get it right and you'll have a dog that handles new environments, people, and animals with confidence.</p>
<h2 id="window">The Socialization Window</h2>
<p>Between 3 and 14 weeks, a puppy's brain undergoes rapid development. Novel experiences during this period are filed as "normal." After 14 weeks, the brain shifts to treating new things with caution — a survival mechanism. This doesn't mean older dogs can't be socialized, but it's dramatically harder and less complete than socialization during the window.</p>
<p>Most puppies come home at 8 weeks — meaning you have approximately 6 weeks of prime socialization time. Those 6 weeks matter enormously.</p>
<h2 id="what-to-expose">What to Socialize To</h2>
<p>The goal isn't just exposure — it's positive exposure. Use treats to create good associations with each new experience.</p>
<ul>
  <li><strong>People:</strong> Men, women, children, elderly people, people with hats/glasses/beards, people in uniforms, people carrying things, people moving quickly</li>
  <li><strong>Dogs:</strong> Calm, vaccinated, friendly adult dogs and puppies. Puppy classes are excellent for this.</li>
  <li><strong>Sounds:</strong> Traffic, sirens, thunderstorms, fireworks (use recordings), garbage trucks, vacuum cleaners, hair dryers, crowds</li>
  <li><strong>Surfaces:</strong> Grass, gravel, tile, metal grating, sand, hardwood, carpet, stairs</li>
  <li><strong>Environments:</strong> Car rides, pet stores, outdoor cafes, parking lots, parks, the vet (for positive "happy visits")</li>
  <li><strong>Handling:</strong> Touching paws, ears, mouth, tail — this prevents sensitivity to grooming and vet exams</li>
</ul>
<div class="tip-box"><strong>💡 The rule:</strong> Keep experiences positive. If your puppy seems frightened, don't force them closer — move further away until they're comfortable, then reward calm behavior. Flooding a puppy with overwhelming stimuli can make fear worse, not better.</div>
<h2 id="safe">Socializing Before Full Vaccination</h2>
<p>The American Veterinary Society of Animal Behavior (AVSAB) recommends that puppies begin socialization before completing their full vaccine series. The behavioral risks of under-socialization outweigh the disease risks of careful, controlled exposure.</p>
<p>Safe pre-vaccination socialization options:</p>
<ul>
  <li>Puppy socialization classes held on sanitized surfaces (many vets run these)</li>
  <li>Homes of vaccinated dogs you know and trust</li>
  <li>Carrying the puppy in public areas (on pavement, not touching grass where unknown dogs have been)</li>
  <li>Inviting vaccinated, friendly adult dogs to your home</li>
</ul>
<h2 id="how">How to Socialize Correctly</h2>
<p>Socialization is not "throw the puppy at everything and let them figure it out." The quality of exposure matters as much as the quantity.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Let the puppy approach at their own pace</strong><br>For new people: ask them to crouch down, turn sideways, avoid direct eye contact, and let the puppy come to them. Forcing approach creates fear.</div></li>
  <li><div class="step-content"><strong>Pair everything with treats</strong><br>Hear a loud sound → get a treat. See a stranger → get a treat. This pairs neutral or potentially scary things with something great.</div></li>
  <li><div class="step-content"><strong>Read the puppy's body language</strong><br>Loose body, wagging tail = comfortable. Tucked tail, ears back, cowering = frightened. Never push a frightened puppy to interact — retreat to a comfortable distance and work from there.</div></li>
</ol>
<h2 id="missed">If You Missed the Window</h2>
<p>Older dogs and dogs with poor early socialization can still make significant progress — it just takes more time, more patience, and often professional help. A certified professional dog trainer (CPDT-KA) or veterinary behaviorist can create a desensitization and counter-conditioning plan for specific fears. Progress is possible, just slower than prevention.</p>
<div class="key-box"><strong>Key Takeaway:</strong> No single investment in your puppy's first year pays more long-term dividends than proper socialization. A well-socialized puppy becomes a dog that handles the world with confidence instead of fear — which means less stress for the dog and dramatically more enjoyment for you.</div>`,
    related: [{url:'/training/first-week-home.html',title:'First Week Home'},{url:'/training/puppy-biting.html',title:'Puppy Biting & Mouthing'},{url:'/training/reactive-dog.html',title:'Reactive Dog — Leash Reactivity'}]
  },

  {
    slug: 'leash-pulling',
    title: 'How to Stop Your Dog From Pulling on the Leash',
    metaDesc: 'The most effective method to stop leash pulling and teach your dog to walk nicely on a loose leash.',
    heroTag: 'Leash & Walking', heroBg: BG,
    h1: 'How to Stop <span class="hl">Leash Pulling</span>',
    desc: 'The most effective, frustration-free method to get a dog that walks calmly on a loose leash — at any age.',
    readTime: '8 min read', level: 'Beginner',
    toc: [{id:'why-pull',label:'Why Dogs Pull'},{id:'method',label:'The Stop-and-Wait Method'},{id:'equipment',label:'Equipment That Helps'},{id:'consistency',label:'Building Consistency'},{id:'timeline',label:'Realistic Timeline'}],
    body: `<p class="ga-lede">Leash pulling is the #1 training complaint from dog owners — and the most commonly approached incorrectly. Yanking back on the leash, using choke chains, or shouting "heel" creates opposition reflex (dogs naturally pull harder against pressure). The most effective method takes longer but builds reliable behavior that lasts: simply stop providing forward movement when there's tension on the leash.</p>
<h2 id="why-pull">Why Dogs Pull</h2>
<p>Dogs pull for one reason: it works. Every time a pulling dog moves forward, they're reinforced for pulling. The leash has inadvertently become the world's most effective pulling-reward mechanism. To stop pulling, you must break this equation: pulling must never move the dog forward again.</p>
<h2 id="method">The Stop-and-Wait Method</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>The moment the leash gets tight — stop completely</strong><br>Plant your feet. Don't yank back, don't say anything, don't make it dramatic. Just stop. The walk stops the instant there's leash tension.</div></li>
  <li><div class="step-content"><strong>Wait for the leash to go slack</strong><br>Eventually, the dog will look back, turn toward you, or take a step back — creating slack in the leash. The instant there's slack — move forward as the reward. Forward movement is the most powerful reward available on a walk.</div></li>
  <li><div class="step-content"><strong>Mark and reward check-ins</strong><br>When your dog glances back at you voluntarily while walking — click/yes and give a treat. These "check-ins" are what you want. A dog checking in with their owner naturally walks near them instead of straining ahead.</div></li>
  <li><div class="step-content"><strong>Change direction frequently</strong><br>Instead of following wherever your dog goes, randomly change direction. When they follow you or come to your side — reward. This teaches them to pay attention to where you're going instead of just forging ahead.</div></li>
</ol>
<div class="tip-box"><strong>💡 Early sessions:</strong> You may not make it more than 20 feet in your first 10-minute session. That's fine — you're rewriting a deeply ingrained habit. Progress happens faster than it feels.</div>
<h2 id="equipment">Equipment That Helps</h2>
<table class="ga-table">
  <thead><tr><th>Equipment</th><th>Best For</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Front-clip harness</td><td>Most dogs</td><td>Redirects forward momentum; doesn't punish</td></tr>
    <tr><td>Head halter (Gentle Leader, Halti)</td><td>Strong pullers</td><td>Controls direction of head; requires gradual introduction</td></tr>
    <tr><td>Standard flat collar</td><td>Dogs that rarely pull</td><td>Fine for trained dogs; minimal control for pullers</td></tr>
    <tr><td>Retractable leash</td><td>Never for training</td><td>Actively teaches pulling; provides no control</td></tr>
  </tbody>
</table>
<h2 id="consistency">Building Consistency</h2>
<p>The stop-and-wait method only works if it's 100% consistent. Every person who walks the dog must follow the same rule. One person who "just lets them pull sometimes" resets progress significantly. It's also harder work initially — short training walks (10–15 minutes) beat long-suffering 45-minute struggles.</p>
<h2 id="timeline">Realistic Timeline</h2>
<p>Most dogs show significant improvement in 2–3 weeks of consistent daily practice. A dog that has pulled for years may take 4–6 weeks. The timeline depends entirely on how consistently the rule is applied. Even one walk a day where pulling works buys another week of retraining.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Stop the walk the instant there's leash tension. Resume the instant there's slack. Reward check-ins. Do this every single walk for 2–3 weeks. It's not complicated — but it requires patience and consistency that most owners underestimate. The payoff (a dog you actually enjoy walking) is absolutely worth it.</div>`,
    related: [{url:'/training/reactive-dog.html',title:'Reactive Dog'},{url:'/training/harness-vs-collar.html',title:'Harness vs. Collar Guide'},{url:'/training/off-leash-recall.html',title:'Off-Leash Recall'}]
  },

  {
    slug: 'reactive-dog',
    title: 'Reactive Dog — How to Handle Leash Reactivity',
    metaDesc: 'How to manage and reduce leash reactivity in dogs — barking and lunging at other dogs or people. Step-by-step desensitization guide.',
    heroTag: 'Behavior Problems', heroBg: BG,
    h1: 'Reactive Dog — <span class="hl">Leash Reactivity</span>',
    desc: 'Does your dog bark and lunge at other dogs on leash? Here\'s what reactivity actually is and how to reduce it step by step.',
    readTime: '10 min read', level: 'Intermediate',
    toc: [{id:'what-reactive',label:'What Is Reactivity?'},{id:'threshold',label:'Understanding Threshold'},{id:'dscc',label:'Desensitization & Counter-Conditioning'},{id:'management',label:'Day-to-Day Management'},{id:'when-pro',label:'When to Get Professional Help'}],
    body: `<p class="ga-lede">Leash reactivity — barking, lunging, and spinning at other dogs or people while on leash — affects an estimated 30–40% of pet dogs. It looks like aggression, but in most cases it's fear or frustration, not predatory intent. The good news: reactivity is one of the most treatable behavior issues. With the right protocol and consistency, most reactive dogs show significant improvement.</p>
<h2 id="what-reactive">What Reactivity Actually Is</h2>
<p>Most leash-reactive dogs are not aggressive — they're overwhelmed. Common underlying causes:</p>
<ul>
  <li><strong>Fear:</strong> The trigger (other dog, stranger) is perceived as a threat. Lunging and barking are attempts to increase distance.</li>
  <li><strong>Frustrated greeting:</strong> The dog wants to interact but can't — the leash creates frustration that erupts as barking and lunging.</li>
  <li><strong>Learned behavior:</strong> The dog barked at something and it went away (the mail carrier leaves). Barking worked, so it became the go-to response.</li>
</ul>
<p>Understanding the cause helps with treatment, but the behavioral protocol is similar regardless.</p>
<h2 id="threshold">Understanding Threshold</h2>
<p>Threshold is the critical concept in reactivity training. A dog is <em>under threshold</em> when they can notice a trigger and remain calm enough to think. They're <em>over threshold</em> when they're too aroused to respond to anything. Training only happens under threshold — once a dog is over threshold, they're in survival mode and cannot learn.</p>
<p>Your job during training is to keep your dog consistently under threshold by managing distance from triggers. If your dog reacts at 20 feet, your training distance is 25–30 feet. As they improve, the distance at which they can stay calm will decrease.</p>
<h2 id="dscc">Desensitization and Counter-Conditioning (DS/CC)</h2>
<p>This is the gold-standard protocol for reactivity. It works by gradually exposing the dog to triggers at sub-threshold levels while pairing those triggers with something positive.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Find your dog's threshold distance</strong><br>The distance at which your dog first notices a trigger but hasn't reacted yet. This is your working distance — start 5–10 feet beyond it.</div></li>
  <li><div class="step-content"><strong>Dog sees trigger → immediate high-value treat</strong><br>The moment your dog notices the trigger (before any reaction): cheerful voice, immediate treats in rapid succession until the trigger is gone or you've moved away. You're teaching: "seeing a dog predicts amazing food."</div></li>
  <li><div class="step-content"><strong>Retreat before threshold is crossed</strong><br>If you see early signs of over-threshold behavior (stiffening, intense stare, held breath), move away immediately. Don't wait for the bark — prevent it.</div></li>
  <li><div class="step-content"><strong>Gradually decrease distance over weeks</strong><br>As the dog consistently stays calm at 25 feet, try 20 feet, then 15 feet. Never rush this — one over-threshold reaction can set progress back significantly.</div></li>
</ol>
<div class="warning-box"><strong>⚠️ What not to do:</strong> Don't punish reactivity — punishment increases arousal and makes the negative association with the trigger stronger. Don't force the dog to "say hi" to the trigger as a correction — flooding increases fear.</div>
<h2 id="management">Day-to-Day Management</h2>
<p>While training progresses, manage the environment to prevent over-threshold experiences:</p>
<ul>
  <li>Walk at off-peak times (early morning, late evening)</li>
  <li>Cross the street when you see triggers ahead</li>
  <li>Use a front-clip harness or head halter for better control</li>
  <li>Learn to read your dog's early stress signals so you can retreat before they react</li>
  <li>Practice "look at me" and "let's go" as emergency cues for redirecting attention</li>
</ul>
<h2 id="when-pro">When to Get Professional Help</h2>
<p>Work with a certified professional dog trainer (CPDT-KA) or veterinary behaviorist if: your dog has made contact (bitten), reactivity is escalating rather than improving, the reactivity is affecting your quality of life or the dog's welfare, or medication may be appropriate (a vet behaviorist can evaluate). Reactivity with a history of biting is not a DIY situation.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Reactivity is anxiety, not stubbornness. The most effective approach is to stay under threshold, pair trigger sights with food, and be endlessly patient with the process. Most reactive dogs improve dramatically with 3–6 months of consistent DS/CC work.</div>`,
    related: [{url:'/training/leash-pulling.html',title:'Stop Leash Pulling'},{url:'/training/separation-anxiety.html',title:'Separation Anxiety'},{url:'/training/harness-vs-collar.html',title:'Harness vs. Collar'}]
  },

  {
    slug: 'harness-vs-collar',
    title: 'Harness vs. Collar — Which Is Right for Your Dog?',
    metaDesc: 'Front-clip harness vs. collar vs. head halter — honest comparison of every type of dog walking equipment with recommendations by dog type.',
    heroTag: 'Leash & Walking', heroBg: BG,
    h1: 'Harness vs. Collar — <span class="hl">Which Is Right?</span>',
    desc: 'Front-clip harness, flat collar, head halter, back-clip — an honest comparison to help you pick the right equipment for your dog.',
    readTime: '6 min read', level: 'Beginner',
    toc: [{id:'collar',label:'Flat Collar'},{id:'back-harness',label:'Back-Clip Harness'},{id:'front-harness',label:'Front-Clip Harness'},{id:'head-halter',label:'Head Halter'},{id:'which',label:'Which to Choose'}],
    body: `<p class="ga-lede">The equipment you put on your dog for walks can either support your training or work against it. The most common mistake: using a back-clip harness on a puller because it seems kinder — then wondering why they pull more. The right tool depends on your dog's size, behavior, and training goals. Here's an honest breakdown of every type.</p>
<h2 id="collar">Flat Collar</h2>
<p>A flat buckle or snap collar is the standard. It holds ID tags and is fine for leash walking with dogs that don't pull. For pullers, collar pressure goes directly to the throat — over time this can cause trachea damage, especially in small breeds and brachycephalic (flat-faced) dogs.</p>
<p><strong>Best for:</strong> Dogs that walk well on leash and need ID tag attachment. <span class="cross">✗</span> Not ideal for pullers or small breeds.</p>
<h2 id="back-harness">Back-Clip Harness</h2>
<p>The clip on the back distributes pressure across the chest and shoulders. This is more comfortable than a collar for dogs that pull, but it provides minimal control — and in fact, the chest-forward design activates opposition reflex, making many dogs pull harder. Sled dogs wear this design for a reason.</p>
<p><strong>Best for:</strong> Small dogs or dogs that rarely pull. Good for casual walks when control isn't needed. <span class="cross">✗</span> Not recommended for training loose-leash walking in strong pullers.</p>
<h2 id="front-harness">Front-Clip Harness</h2>
<p>The clip on the chest is the most effective training harness for most dogs. When the dog pulls, the harness redirects them sideways toward you rather than allowing them to pull forward. It doesn't cause pain — it simply removes the mechanical advantage of pulling. Popular options: Ruffwear Front Range, PetSafe Easy Walk, Blue-9 Balance Harness.</p>
<p><strong>Best for:</strong> Most dogs, especially medium-to-large pullers who are in training. <span class="tick">✓</span> Highly recommended starting point for leash training.</p>
<div class="tip-box"><strong>💡 Fit matters:</strong> A front-clip harness must fit correctly to work. The front clip should sit on the sternum (chest bone), not at the armpit. Armpit placement causes rubbing and restricts normal shoulder movement.</div>
<h2 id="head-halter">Head Halter (Gentle Leader, Halti)</h2>
<p>A head halter fits over the dog's muzzle and behind the ears, similar to a horse halter. Because the head controls the body, a head halter gives more control over direction than any harness. Critically: it is not a muzzle — the dog can still eat, drink, pant, and bite while wearing it.</p>
<p>The main challenge: most dogs hate the head halter initially and need 1–2 weeks of gradual desensitization before accepting it. Introduced properly (lots of treats, incremental introduction), most dogs adapt well.</p>
<p><strong>Best for:</strong> Very strong pullers, dogs with reactivity, dogs that drag their owners. <span class="cross">✗</span> Not ideal for dogs with neck/spine issues; never allow a dog wearing a head halter to hit the end of the leash at speed.</p>
<h2 id="which">Which Should You Choose?</h2>
<table class="ga-table">
  <thead><tr><th>Dog Type</th><th>Recommendation</th></tr></thead>
  <tbody>
    <tr><td>Small dog, walks well</td><td>Flat collar or back-clip harness</td></tr>
    <tr><td>Small dog, brachycephalic (Pug, Frenchie)</td><td>Back or front-clip harness — never collar</td></tr>
    <tr><td>Medium/large dog, light puller</td><td>Front-clip harness</td></tr>
    <tr><td>Strong puller, in training</td><td>Front-clip harness</td></tr>
    <tr><td>Reactive, very strong puller</td><td>Head halter or front-clip harness with training</td></tr>
  </tbody>
</table>
<div class="key-box"><strong>Key Takeaway:</strong> The front-clip harness is the right starting point for 80% of dogs. It's comfortable, humane, and removes the mechanical advantage of pulling without causing pain. If you're struggling with a strong puller, switch to a front-clip harness before anything else and watch the difference on your next walk.</div>`,
    related: [{url:'/training/leash-pulling.html',title:'Stop Leash Pulling'},{url:'/training/reactive-dog.html',title:'Reactive Dog'},{url:'/training/off-leash-recall.html',title:'Off-Leash Recall'}]
  },

  {
    slug: 'stop-barking',
    title: 'How to Stop Excessive Barking',
    metaDesc: 'How to stop excessive dog barking — demand barking, alert barking, and boredom barking. What works and what makes it worse.',
    heroTag: 'Behavior Problems', heroBg: BG,
    h1: 'How to Stop <span class="hl">Excessive Barking</span>',
    desc: 'Demand barking, alert barking, boredom barking — different causes need different solutions. Here\'s what actually works.',
    readTime: '8 min read', level: 'Beginner',
    toc: [{id:'types',label:'Types of Barking'},{id:'demand',label:'Demand Barking'},{id:'alert',label:'Alert Barking'},{id:'boredom',label:'Boredom Barking'},{id:'what-not',label:'What Makes Barking Worse'}],
    body: `<p class="ga-lede">There's no single fix for excessive barking because different types of barking have different causes — and the fix that works for demand barking makes alert barking worse. Before you can solve barking, you need to identify what type it is. This guide covers the three most common types and exactly how to address each one.</p>
<h2 id="types">Types of Barking</h2>
<div class="ga-highlight-grid">
  <div class="ga-hl-card"><div class="hl-emoji">🎭</div><strong>Demand Barking</strong><span>"Give me what I want"</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">🚨</div><strong>Alert Barking</strong><span>"Something is out there"</span></div>
  <div class="ga-hl-card"><div class="hl-emoji">😴</div><strong>Boredom Barking</strong><span>"I have nothing to do"</span></div>
</div>
<h2 id="demand">Demand Barking</h2>
<p>Demand barking is when a dog barks to get something: attention, a treat, their food bowl filled, to go outside, or to initiate play. It's almost always accidentally trained by owners who respond to barking — even once.</p>
<p><strong>The fix:</strong> Complete extinction of the reinforcement. Every time you respond to demand barking — even to say "no" or "quiet" — you've reinforced it. The behavior must become 100% non-functional.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Do not respond to the barking in any way</strong><br>No eye contact, no speech, no gestures. Turn your back if needed. Wait for silence.</div></li>
  <li><div class="step-content"><strong>Reward silence immediately</strong><br>The moment there's a pause in barking — even 2 seconds — acknowledge it. "Good quiet" + treat. Gradually build the required silence before rewarding.</div></li>
  <li><div class="step-content"><strong>Expect an "extinction burst"</strong><br>When you first stop responding, the barking will get worse before it gets better. This is normal — the dog is trying harder at what used to work. Stay consistent through it.</div></li>
</ol>
<div class="warning-box"><strong>⚠️ The extinction burst is temporary</strong> — if you give in during the burst, you've taught the dog that barking harder and longer is what finally works. Consistency through the burst is everything.</div>
<h2 id="alert">Alert Barking</h2>
<p>Alert barking happens when the dog perceives something outside the window, hears sounds, or detects movement. Some alert barking is natural and appropriate — the problem is dogs that bark for extended periods at every minor stimulus.</p>
<p><strong>The fix:</strong> Management + "thank you" redirect.</p>
<ul>
  <li><strong>Manage visual triggers:</strong> Use frosted window film on lower windows, or restrict access to rooms where the dog watches the street. What the dog can't see, they can't bark at.</li>
  <li><strong>"Thank you" redirect:</strong> When the dog alerts, acknowledge it ("good dog, thank you"), then call them away from the window and reward coming to you. You're acknowledging their alert while teaching them that barking twice and coming to you is the protocol, not barking for 10 minutes.</li>
  <li><strong>Teach "quiet" as a trained cue:</strong> When barking starts, say "quiet" once, then prompt an incompatible behavior (sit or down). Reward the quiet behavior. Never repeat "quiet" more than once — say it once, then create the quiet yourself by interrupting behavior.</li>
</ul>
<h2 id="boredom">Boredom Barking</h2>
<p>Boredom barking is usually repetitive, rhythmic, and happens when the dog is alone or without stimulation for extended periods. The solution is simple in theory: more exercise and mental stimulation. In practice, many owners underestimate how much their dog needs.</p>
<ul>
  <li><strong>Physical exercise:</strong> A tired dog rarely barks from boredom. Most medium-to-large breeds need 45–90 minutes of real exercise daily — not just a backyard to wander in.</li>
  <li><strong>Mental enrichment:</strong> Puzzle feeders, sniff walks (letting the dog smell everything), frozen KONGs, and training sessions burn mental energy as effectively as physical exercise. See our <a href="/training/mental-stimulation.html">mental stimulation guide</a>.</li>
  <li><strong>Doggy daycare or dog walker:</strong> If the dog is home alone 8+ hours daily, no amount of training substitutes for the fundamental issue of unmet social and exercise needs.</li>
</ul>
<h2 id="what-not">What Makes Barking Worse</h2>
<ul>
  <li><strong>Shouting "quiet"</strong> — to the dog, you're joining in the barking. Speak calmly.</li>
  <li><strong>Shock/citronella bark collars</strong> — suppress the symptom without addressing the cause; can increase anxiety</li>
  <li><strong>Inconsistent responses</strong> — sometimes ignoring demand barking, sometimes responding</li>
  <li><strong>Punishment after the fact</strong> — the dog has no connection between the past barking and current punishment</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Identify the type of barking before you address it. Demand barking requires extinction (never reward it). Alert barking needs management plus a redirect. Boredom barking needs more exercise and enrichment. Applying the wrong fix makes it worse.</div>`,
    related: [{url:'/training/separation-anxiety.html',title:'Separation Anxiety'},{url:'/training/mental-stimulation.html',title:'Mental Stimulation & Enrichment'},{url:'/training/reactive-dog.html',title:'Reactive Dog'}]
  },

  {
    slug: 'separation-anxiety',
    title: 'Dog Separation Anxiety — Signs, Causes & Treatment',
    metaDesc: 'How to identify and treat separation anxiety in dogs. Signs, severity levels, and step-by-step desensitization protocol.',
    heroTag: 'Behavior Problems', heroBg: BG,
    h1: 'Separation Anxiety — <span class="hl">Signs & Treatment</span>',
    desc: 'If your dog panics when left alone, this guide explains why and exactly how to treat it — from mild cases to severe anxiety.',
    readTime: '10 min read', level: 'Intermediate',
    toc: [{id:'signs',label:'Signs of Separation Anxiety'},{id:'why',label:'Why It Happens'},{id:'mild',label:'Mild Anxiety — Graduated Departure'},{id:'severe',label:'Severe Anxiety'},{id:'medication',label:'Medication Options'}],
    body: `<p class="ga-lede">Separation anxiety is not disobedience — it's panic. A dog with true separation anxiety experiences a genuine stress response when left alone: elevated heart rate, cortisol spike, trembling, destructive behavior, and excessive vocalization. It's closer to a human panic attack than a child being "naughty" when parents are away. Treatment requires addressing the underlying anxiety, not punishing the symptoms.</p>
<h2 id="signs">Signs of Separation Anxiety</h2>
<p>Key signs, especially if they occur only when the owner is absent or about to leave:</p>
<ul>
  <li>Excessive barking, howling, or whining that starts shortly after departure</li>
  <li>Destructive behavior focused on exit points (doors, windows, doorframes)</li>
  <li>House soiling despite being fully house-trained</li>
  <li>Trembling, panting, or pacing when owner prepares to leave (pre-departure anxiety)</li>
  <li>Refusing food, toys, or treats when alone (even dogs that normally love food won't eat when panicked)</li>
  <li>Self-injury from attempting to escape</li>
</ul>
<div class="tip-box"><strong>💡 How to confirm it's separation anxiety:</strong> Set up a cheap webcam or leave your phone recording when you leave. Watch what happens in the first 30 minutes. If the dog panics immediately after your departure, it's separation anxiety. If they settle after 10 minutes and only react to external sounds, it may be boredom or alert barking.</div>
<h2 id="why">Why Separation Anxiety Happens</h2>
<p>Common contributing factors include: over-bonded relationships (dog follows owner from room to room, never has alone time), sudden schedule changes, a traumatic event while alone, re-homing or shelter history, and certain breeds predisposed to human-attachment (Vizsla, Belgian Malinois, German Shepherd).</p>
<p>Importantly, separation anxiety frequently develops or worsens after periods of increased together-time — like working from home for months, then returning to the office.</p>
<h2 id="mild">Mild Anxiety — Graduated Departure Training</h2>
<p>For dogs with mild-to-moderate separation anxiety, graduated departure training (systematic desensitization to being alone) is the foundation of treatment.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Practice pre-departure cues without leaving</strong><br>Pick up keys, put on shoes, and grab your bag — then sit back down and watch TV. Repeat dozens of times until the dog's anxiety response to these cues fades.</div></li>
  <li><div class="step-content"><strong>Absence training starts at seconds, not minutes</strong><br>Step out the door, count to 3, come back in. The dog must still be calm when you return (before the anxiety response peaks). If calm: great. If anxious: you've gone too long — next session, go to 1 second.</div></li>
  <li><div class="step-content"><strong>Build duration by tiny increments</strong><br>3 seconds → 5 seconds → 10 seconds → 30 seconds → 1 minute → 3 minutes → 10 minutes. Each step only happens when the dog is calm at the previous level. This is tedious but essential — any session that ends with the dog in a panic state sets back progress.</div></li>
  <li><div class="step-content"><strong>Teach independence in the home</strong><br>Stop reinforcing constant proximity. Put a baby gate between rooms sometimes. Require the dog to settle on their mat rather than on your lap. Practice short "alone time" multiple times daily, even when you're home.</div></li>
</ol>
<h2 id="severe">Severe Separation Anxiety</h2>
<p>Severe separation anxiety — where the dog panics within minutes of departure, injures themselves, or has shown no improvement with graduated departure training over 4+ weeks — typically requires professional intervention. A certified separation anxiety trainer (CSAT) or veterinary behaviorist can design a specific protocol. Self-treating severe separation anxiety often makes it worse.</p>
<h2 id="medication">Medication Options</h2>
<p>For moderate-to-severe cases, medication can be an important adjunct to training — not a replacement for it. Options include:</p>
<ul>
  <li><strong>Fluoxetine (Prozac) or clomipramine</strong> — prescription SSRIs that reduce baseline anxiety. Work over weeks. Require a vet visit.</li>
  <li><strong>Alprazolam or trazodone</strong> — situational medications for acute panic. Used for specific high-stress events.</li>
  <li><strong>Adaptil (DAP) diffusers</strong> — pheromone-based calming product. Works for some dogs; over-the-counter.</li>
</ul>
<p>Never adjust or discontinue psychiatric medications without vet guidance. Medication + behavior modification together produce significantly better outcomes than either alone.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Separation anxiety requires patience measured in weeks and months, not days. The graduated departure protocol is effective but only if done at the dog's pace — never faster. If progress has stalled after 4–6 weeks, get professional help rather than guessing at what to try next.</div>`,
    related: [{url:'/training/crate-training.html',title:'Crate Training'},{url:'/training/stop-barking.html',title:'Stop Excessive Barking'},{url:'/training/mental-stimulation.html',title:'Mental Stimulation & Enrichment'}]
  },

  {
    slug: 'puppy-biting',
    title: 'Puppy Biting & Mouthing — How to Stop It',
    metaDesc: 'How to stop puppy biting and mouthing using bite inhibition training. What\'s normal, what\'s not, and the fastest method to stop it.',
    heroTag: 'Puppy Training', heroBg: BG,
    h1: 'Puppy Biting & Mouthing — <span class="hl">How to Stop It</span>',
    desc: 'Puppy biting is normal — and temporary. Here\'s how to teach bite inhibition and stop mouthing behavior the right way.',
    readTime: '7 min read', level: 'Beginner',
    toc: [{id:'normal',label:'Is This Normal?'},{id:'inhibition',label:'Teaching Bite Inhibition'},{id:'stop',label:'Stopping Mouthing'},{id:'children',label:'Puppies and Children'},{id:'red-flags',label:'When to Worry'}],
    body: `<p class="ga-lede">Every puppy bites — it's how they explore the world, play with littermates, and test their environment. The problem isn't the biting itself; it's that puppy teeth are razor-sharp and puppies haven't yet learned how much pressure is appropriate. Your job isn't to eliminate mouthing entirely (that's nearly impossible before 4–5 months), but to teach the puppy to control the force of their bites — a skill called bite inhibition.</p>
<h2 id="normal">Is This Normal?</h2>
<p>Yes. Puppies use their mouths the way human toddlers use their hands. Biting during play, when excited, or when overstimulated is entirely normal behavior for puppies under 5 months. It usually peaks around 3–4 months and naturally decreases as the puppy matures, learns better, and adult teeth come in (5–7 months).</p>
<p>The concern isn't the frequency of mouthing — it's the force and the target. By teaching bite inhibition first, you ensure that if the puppy does bite in the future (out of fear or pain), the damage will be minimized.</p>
<h2 id="inhibition">Teaching Bite Inhibition</h2>
<p>In a litter, puppies learn bite inhibition from each other: bite too hard and the other puppy yelps and stops playing. You're replicating this feedback system.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Let play happen — then respond to hard bites only</strong><br>Allow mouthing during play. When the puppy bites hard enough to hurt: make a high-pitched "ouch!" or yelp, immediately go limp (stop moving your hand), and withdraw attention for 10–30 seconds. Resume play. This mimics littermate feedback.</div></li>
  <li><div class="step-content"><strong>Reduce threshold progressively</strong><br>Over several weeks, lower the bite force that triggers your "ouch." First, only the hardest bites get a response. Then medium bites. Then gentle bites. The goal is a puppy that understands all teeth pressure on skin is unwelcome.</div></li>
  <li><div class="step-content"><strong>Redirect to appropriate objects</strong><br>Keep a tug toy or chew toy nearby during all play. When teeth contact skin: "ouch," pause, then immediately offer the appropriate item. "Not that — this." Redirect consistently.</div></li>
</ol>
<h2 id="stop">Stopping Mouthing Behavior</h2>
<p>Once bite inhibition is established, work on stopping mouthing altogether:</p>
<ul>
  <li><strong>Yelp + time-out:</strong> The moment teeth touch skin, yelp and leave the room for 10–30 seconds. Return and resume interaction. The departure removes all attention — the ultimate punishment for a social animal.</li>
  <li><strong>Management during crazy time:</strong> Puppies have "witching hours" (usually evenings) when they're overtired and bitey. This is a crate nap moment, not a training opportunity — overstimulated puppies can't learn.</li>
  <li><strong>Avoid roughhousing with hands:</strong> Never use your hands as toys. Anyone who wrestles with a puppy using their hands is directly training the puppy that hands are toys. Use a tug toy instead.</li>
</ul>
<div class="tip-box"><strong>💡 Consistency requirement:</strong> Every person who interacts with the puppy must respond the same way. One person who "lets it slide because it doesn't really hurt" teaches the puppy that persistence pays off. Brief family meeting to align on the protocol.</div>
<h2 id="children">Puppies and Children</h2>
<p>Small children should never interact with a biting-age puppy unsupervised. A puppy bite that's a nuisance to an adult can be genuinely painful and frightening to a child. During interactions, supervise actively, keep play calm, and have the child offer treats or toys rather than using their hands for play. If the puppy is getting mouthy, the child should "be a tree" (stand still, arms crossed, no eye contact) and an adult ends the session.</p>
<h2 id="red-flags">When to Worry</h2>
<p>Most puppy biting is completely normal. However, consult a trainer if: the puppy grows from biting rather than stopping during redirection attempts, bites are accompanied by growling and a stiff body when you try to stop play, or the biting escalates in severity rather than decreasing after 2 weeks of consistent protocol.</p>
<div class="key-box"><strong>Key Takeaway:</strong> Bite inhibition is one of the most important things you'll ever teach your dog. A dog that's never learned to modulate bite pressure is a liability. A dog that has bite inhibition — even if they ever bite out of fear or pain — causes minimal damage. Teach this first, redirect consistently, and it will resolve naturally by 5–6 months.</div>`,
    related: [{url:'/training/socialization.html',title:'Socialization'},{url:'/training/first-week-home.html',title:'First Week Home'},{url:'/training/sit-stay-come.html',title:'Sit, Stay, Come'}]
  },

  {
    slug: 'counter-surfing',
    title: 'How to Stop Counter Surfing and Food Stealing',
    metaDesc: 'How to stop your dog from stealing food off counters and tables. Management and training strategies that actually work.',
    heroTag: 'Behavior Problems', heroBg: BG,
    h1: 'Stopping Counter Surfing <span class="hl">and Food Stealing</span>',
    desc: 'Counter surfing is one of the hardest habits to break — because it self-reinforces. Here\'s how to actually stop it.',
    readTime: '6 min read', level: 'Beginner',
    toc: [{id:'why-hard',label:'Why Counter Surfing Is Hard to Stop'},{id:'management',label:'Management First'},{id:'training',label:'Training Protocol'},{id:'long-term',label:'Long-Term Success'}],
    body: `<p class="ga-lede">Counter surfing is notoriously hard to eliminate because it's self-reinforcing on a variable schedule — sometimes the dog finds food, sometimes they don't. Variable reinforcement is the most powerful type; it's what makes slot machines addictive. Every time your dog successfully steals something, they're motivated to try 100 more times. The only reliable solution: ensure counter surfing NEVER works, combined with training an alternative behavior.</p>
<h2 id="why-hard">Why Counter Surfing Is Especially Hard</h2>
<p>Most behavior problems can be addressed purely through training. Counter surfing is different because the environment itself is the reward. If your dog ever successfully gets food from a counter — even once in 30 attempts — the behavior is reinforced enough to persist for months. You cannot train your way around a behavior that occasionally pays jackpots. Management must come first.</p>
<h2 id="management">Management — The Non-Negotiable First Step</h2>
<ul>
  <li><strong>No food on counters:</strong> Every item that might interest the dog must be off counters when unsupervised. No exceptions. This means actively adjusting household habits — not just during training, but permanently.</li>
  <li><strong>Block kitchen access when unsupervised:</strong> Baby gate, exercise pen, or crating. A dog that can't access the kitchen can't counter surf. Management prevents the behavior from being rehearsed while training catches up.</li>
  <li><strong>Booby traps (optional):</strong> Inverted baking sheets, scat mats, or cans of pennies balanced at the edge — these startle the dog when they touch the counter. They work only if the dog never successfully gets food; otherwise the occasional reward outweighs the occasional startle.</li>
</ul>
<h2 id="training">Training Protocol</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Teach "leave it" and "off"</strong><br>A dog that responds reliably to "leave it" can be redirected before they jump. "Off" removes them from surfaces when they've already made contact. Both commands are prerequisites. See our <a href="/training/down-and-leave-it.html">Leave It guide</a> and <a href="/training/place-and-off.html">Off guide</a>.</div></li>
  <li><div class="step-content"><strong>Teach "place" as a kitchen incompatible behavior</strong><br>A dog on their "place" mat outside the kitchen cannot simultaneously be counter surfing. Teaching a solid "place" during meal prep replaces the counter-surfing behavior with something rewarding and concrete.</div></li>
  <li><div class="step-content"><strong>Reward four paws on floor in the kitchen</strong><br>Randomly reward your dog for simply having four paws on the floor when food is present on counters. Make "ignoring the counter" more rewarding than counter surfing. This requires you to actively catch them being good.</div></li>
</ol>
<h2 id="long-term">Long-Term Success</h2>
<p>Counter surfing rarely "goes away" completely with heavily food-motivated dogs — it goes dormant when managed well. Long-term success comes from making it a household habit: food always put away or in containers, dog reliably sent to place during meal prep, and the kitchen gated when you can't supervise. Treat it like a permanent accommodation rather than a training problem you'll "fix" once.</p>
<div class="key-box"><strong>Key Takeaway:</strong> You cannot train a dog out of counter surfing if the counter occasionally has food on it. Management (nothing accessible, access blocked when unsupervised) must precede and accompany training. The training teaches the dog where to be; the management ensures the counter-surfing habit can't be practiced.</div>`,
    related: [{url:'/training/down-and-leave-it.html',title:'Down & Leave It'},{url:'/training/place-and-off.html',title:'Place & Off'},{url:'/nutrition/toxic-foods.html',title:'Toxic Foods for Dogs'}]
  },

  {
    slug: 'fun-tricks',
    title: 'Fun Dog Tricks — Shake, Roll Over, Play Dead & More',
    metaDesc: 'Step-by-step guide to teaching fun dog tricks: shake hands, roll over, spin, play dead, and more. For any age, any breed.',
    heroTag: 'Advanced Training', heroBg: BG,
    h1: 'Fun Dog Tricks — <span class="hl">Roll Over, Shake & More</span>',
    desc: 'Teaching tricks is one of the best ways to bond with your dog and provide mental stimulation. Here\'s how to teach 6 crowd-pleasers.',
    readTime: '8 min read', level: 'Intermediate',
    toc: [{id:'why',label:'Why Tricks Are Valuable'},{id:'shake',label:'Shake / Give Paw'},{id:'roll',label:'Roll Over'},{id:'spin',label:'Spin'},{id:'play-dead',label:'Play Dead'},{id:'bow',label:'Bow'},{id:'tips',label:'Trick Training Tips'}],
    body: `<p class="ga-lede">Trick training isn't just for show — it's one of the best forms of mental stimulation available. A 10-minute trick training session tires a dog more than a 20-minute walk because it requires sustained focus. Tricks also build confidence, reinforce the relationship, and give bored dogs a purpose. Best of all, tricks are fun — for both of you. Start with your dog knowing "sit" and "down," and these six tricks become achievable quickly.</p>
<h2 id="why">Why Tricks Are Valuable</h2>
<p>Trick training has practical side effects beyond entertainment: it improves the dog's body awareness, increases their engagement with training in general, and teaches them to learn new things — which transfers to all other training. Dogs that know 10 tricks tend to be more responsive and attentive overall because they've learned that training sessions predict good things.</p>
<h2 id="shake">Shake / Give Paw</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Ask for sit</strong><br>Start from a sit position. Hold a treat in your closed fist at the dog's paw level.</div></li>
  <li><div class="step-content"><strong>Wait for any paw movement</strong><br>The dog will sniff, nudge, and eventually paw at your fist. The instant a paw touches your hand — click/yes and open your hand to give the treat.</div></li>
  <li><div class="step-content"><strong>Add the cue</strong><br>Once they're pawing reliably, say "shake" just before they lift their paw. Transition to offering an open flat hand and rewarding them for placing their paw in it.</div></li>
</ol>
<h2 id="roll">Roll Over</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Start from down</strong><br>Ask for down. Hold a treat at your dog's nose.</div></li>
  <li><div class="step-content"><strong>Lure toward their shoulder</strong><br>Move the treat toward their shoulder on one side. Their head follows, their weight shifts, and their body tips sideways. When they're on their side — click/yes and treat.</div></li>
  <li><div class="step-content"><strong>Continue the arc</strong><br>Once they're reliably flopping on their side, continue moving the treat in a circle over their back. Their body will follow through to complete the roll. Reward the moment they return to all fours.</div></li>
  <li><div class="step-content"><strong>Add "roll over"</strong><br>Once fluent with the lure, add the verbal cue and gradually fade the hand motion.</div></li>
</ol>
<h2 id="spin">Spin</h2>
<p>Hold a treat at your dog's nose and move it in a tight circle, leading them to follow it 360 degrees. Click/yes when they complete the circle. Add "spin" once they're circling reliably. Teach both directions using different cues ("spin" = clockwise, "twist" = counterclockwise).</p>
<h2 id="play-dead">Play Dead ("Bang")</h2>
<ol class="step-list">
  <li><div class="step-content"><strong>Start from down, lure to side</strong><br>From a down, lure the dog onto their side (same as the start of roll over). Stop here and reward heavily. Repeat until they readily go to their side from a down.</div></li>
  <li><div class="step-content"><strong>Add "bang" cue</strong><br>Use a finger-gun gesture and say "bang" as you lure. The theatrical cue is part of the fun.</div></li>
  <li><div class="step-content"><strong>Add a release</strong><br>Keep them on their side for increasing duration before releasing with "alive!" or "okay." This is the dramatic part the audience loves.</div></li>
</ol>
<h2 id="bow">Bow (Take a Bow)</h2>
<p>Stand in front of your dog. Hold a treat at their nose and slowly lower it to the floor, keeping it pressed against their chest. As their front end goes down and their back end stays up — click/yes and reward. Add "take a bow" once they're doing it reliably. This one comes naturally to some dogs who do it on their own during play stretches.</p>
<h2 id="tips">Trick Training Tips</h2>
<ul>
  <li><strong>Short sessions:</strong> 5–10 minutes per trick, twice a day. End on success.</li>
  <li><strong>One trick at a time:</strong> Master one trick before starting the next. Two tricks simultaneously creates confusion.</li>
  <li><strong>Use jackpots for breakthroughs:</strong> When the dog "gets it" for the first time — give a jackpot (5–10 rapid treats). This marks the moment of understanding.</li>
  <li><strong>Any dog can learn tricks:</strong> Age, breed, and past training history matter much less than people assume. Senior dogs can learn new tricks. Stubborn breeds learn them. You may just need smaller steps.</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> 10 minutes of trick training provides more mental exercise than a 30-minute walk. A mentally tired dog is a calm, happy dog. Build a repertoire of 5–10 tricks and pull them out whenever your dog needs stimulation or when you have company to impress.</div>`,
    related: [{url:'/training/mental-stimulation.html',title:'Mental Stimulation & Enrichment'},{url:'/training/off-leash-recall.html',title:'Off-Leash Recall'},{url:'/training/sit-stay-come.html',title:'Sit, Stay, Come'}]
  },

  {
    slug: 'off-leash-recall',
    title: 'Reliable Off-Leash Recall — Teaching "Come" Under Distraction',
    metaDesc: 'How to build a reliable off-leash recall that works even with distractions. The protocol competitive trainers use.',
    heroTag: 'Advanced Training', heroBg: BG,
    h1: 'Reliable Off-Leash Recall — <span class="hl">Come Under Distraction</span>',
    desc: 'A recall that works in the backyard but fails at the dog park isn\'t a recall. Here\'s how to build one that works everywhere.',
    readTime: '9 min read', level: 'Advanced',
    toc: [{id:'foundation',label:'Foundation Recall'},{id:'why-fail',label:'Why Recall Fails'},{id:'3d',label:'Building with Distractions'},{id:'long-line',label:'Long Line Protocol'},{id:'rules',label:'The Golden Rules'}],
    body: `<p class="ga-lede">Recall is the most important command your dog will know — and the most commonly taught incorrectly. Most dogs learn a "backyard recall" that collapses immediately in the presence of other dogs, interesting smells, or exciting environments. A truly reliable recall requires years of reinforcement, careful proofing, and an unwavering commitment to never poisoning the cue. This guide explains the protocol used by competition trainers — adapted for everyday pet owners.</p>
<h2 id="foundation">Foundation Recall</h2>
<p>If you haven't yet built the foundation, start in our <a href="/training/sit-stay-come.html">Sit, Stay, Come guide</a>. The foundation steps are: name recognition in low-distraction environments, making "come" predict the best thing ever, and never using "come" for unpleasant associations. These are prerequisites for everything in this guide.</p>
<h2 id="why-fail">Why Recall Fails in Real Life</h2>
<p>Recall breaks down because the competing reward (other dog, squirrel, smell) is more valuable than the recall reward. To compete with high-value distractions, your recall reward must be extraordinary — higher value than anything in the environment. What works:</p>
<ul>
  <li>Real meat (chicken, hot dog, cheese)</li>
  <li>A chase game with you running away</li>
  <li>A favorite toy — reserved exclusively for recall rewards</li>
  <li>A massive praise party — jumping, celebrating, high energy</li>
</ul>
<p>A stale kibble treat will not outcompete a squirrel. Match your reward to the difficulty of the distraction.</p>
<h2 id="3d">Building Recall with the 3 D's</h2>
<p>The 3 D's of dog training — Duration, Distance, Distraction — must be built separately and combined gradually.</p>
<ol class="step-list">
  <li><div class="step-content"><strong>Duration first (no distraction)</strong><br>Practice recall in your living room, yard, and quiet hallway. 50+ successful repetitions at close range before moving to the next step.</div></li>
  <li><div class="step-content"><strong>Add distance gradually</strong><br>Use a 20–30 foot long line. Call from progressively greater distances in low-distraction environments. Reward generously every single time.</div></li>
  <li><div class="step-content"><strong>Add mild distractions first</strong><br>Near another person, near low-interest toys, in a new room. Only call when you're confident of success — an uncompleted recall tells the dog "sometimes I don't have to come."</div></li>
  <li><div class="step-content"><strong>Proof in high-distraction environments</strong><br>Near other dogs (behind a fence first), near smells, in parks. Start with the dog on a long line so you can ensure success. Always reward as if this is the most impressive thing the dog has ever done.</div></li>
</ol>
<h2 id="long-line">The Long Line Protocol</h2>
<p>A 30-foot long line is essential for proofing recall. It gives the dog apparent freedom while ensuring you can gently guide them back if they don't respond. Important rules:</p>
<ul>
  <li>Never let the dog hit the end of the line at full speed (tracheal damage risk)</li>
  <li>If the dog doesn't come on the first call, gently guide them in with the line — don't repeat the cue</li>
  <li>When guided in, still reward — you're rewarding the arrival, not the initial response</li>
  <li>Never call and then chase — if they don't come, go get them (quietly, positively) rather than turning it into a game</li>
</ul>
<h2 id="rules">The Golden Rules of Recall</h2>
<ul>
  <li><strong>Call only when you can enforce or have high confidence of success</strong> — an ignored recall weakens the cue</li>
  <li><strong>Never call for anything unpleasant</strong> — bath, nail trim, end of fun — go get them for these</li>
  <li><strong>Make every recall the best moment of the dog's day</strong> — even if they took 30 seconds to respond</li>
  <li><strong>Practice recall multiple times daily with no "reason"</strong> — call them, treat, release. Just builds the habit.</li>
  <li><strong>Never let your dog off leash somewhere until recall is reliable on a long line there</strong></li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> A reliable off-leash recall is not built in a week. It requires hundreds of rewarded repetitions across dozens of environments over months. But a dog with a truly reliable recall can enjoy freedoms (trails, beaches, dog parks) that other dogs can't, because their owner can actually trust them. The investment is worth it entirely.</div>`,
    related: [{url:'/training/leash-pulling.html',title:'Stop Leash Pulling'},{url:'/training/harness-vs-collar.html',title:'Harness vs. Collar'},{url:'/training/fun-tricks.html',title:'Fun Tricks'}]
  },

  {
    slug: 'mental-stimulation',
    title: 'Mental Stimulation & Enrichment for Dogs',
    metaDesc: 'The best mental stimulation and enrichment activities for dogs. Puzzle feeders, nose work, sniff walks, and more to tire out a bored dog.',
    heroTag: 'Advanced Training', heroBg: BG,
    h1: 'Mental Stimulation & <span class="hl">Enrichment</span>',
    desc: 'A mentally tired dog is a calm, well-behaved dog. These activities tire your dog out faster than a walk — with almost no effort from you.',
    readTime: '7 min read', level: 'Beginner',
    toc: [{id:'why',label:'Why Mental Exercise Matters'},{id:'feeding',label:'Food-Based Enrichment'},{id:'nosework',label:'Nose Work & Sniffing'},{id:'social',label:'Social Enrichment'},{id:'environment',label:'Environmental Enrichment'},{id:'schedule',label:'Building a Rotation'}],
    body: `<p class="ga-lede">A 10-minute training session or puzzle feeding session can tire a dog as much as a 30-minute walk — because the brain burns energy just as fast as the body. Most behavior problems in otherwise healthy dogs (destructive chewing, excessive barking, anxiety, hyperactivity) are rooted not in lack of physical exercise but in lack of mental stimulation. This guide covers practical, low-effort ways to provide it.</p>
<h2 id="why">Why Mental Exercise Matters</h2>
<p>Domestic dogs are cognitively evolved to think, solve problems, and use their nose — but most pet dogs spend 20+ hours a day doing none of these things. Boredom is stressful for dogs. A chronically under-stimulated dog redirects that cognitive energy into behaviors owners hate: chewing, digging, barking, and attention-seeking.</p>
<p>The good news: mental enrichment doesn't require much time or money. Most of the best options cost nothing.</p>
<h2 id="feeding">Food-Based Enrichment</h2>
<p>Instead of serving every meal in a bowl, make the dog work for it. Options:</p>
<ul>
  <li><strong>Puzzle feeders:</strong> Nina Ottosson, Kong Wobbler, Outward Hound — dogs manipulate a toy to release kibble. Start with easy levels; advanced puzzles can take 15–20 minutes.</li>
  <li><strong>Stuffed KONG:</strong> Fill with kibble soaked in water or mixed with peanut butter. Freeze for extended challenge. A frozen KONG lasts 20–30 minutes and occupies the dog during crate time or departure.</li>
  <li><strong>Scatter feeding:</strong> Sprinkle the meal across the grass in the backyard. Sniffing out every piece of kibble provides significant nose work stimulation. Free, and takes 10 minutes instead of 10 seconds.</li>
  <li><strong>Lick mats:</strong> Smear soft food (peanut butter, wet food, banana) on a lick mat. Licking releases serotonin and is calming — excellent for anxious dogs.</li>
  <li><strong>Snuffle mat:</strong> Kibble hidden in fabric strands. Combines smell + problem-solving.</li>
</ul>
<h2 id="nosework">Nose Work and Sniffing</h2>
<p>A dog's nose is 10,000–100,000 times more sensitive than a human's. Using it is cognitively exhausting in the best possible way.</p>
<ul>
  <li><strong>Sniff walks:</strong> Let the dog lead and sniff everything. A 15-minute sniff walk where the dog follows their nose provides more mental exercise than a 30-minute brisk structured walk. Stop stopping them from sniffing.</li>
  <li><strong>Hide and seek — with treats:</strong> While the dog is in another room, hide 10–15 small treats throughout a room. Release them and let them find every one. Takes 5 minutes to set up, 15 minutes for the dog to complete.</li>
  <li><strong>Find it game:</strong> Start with the dog watching you hide a treat, then release them to find it. Progress to hiding it while they wait in another room. This can be done with favorite toys too ("find it" + toy name).</li>
  <li><strong>Formal nose work:</strong> K9 Nose Work is a sport where dogs learn to find specific target odors. Many training facilities offer beginner classes. The sport is exceptional for anxious, reactive, and senior dogs.</li>
</ul>
<h2 id="social">Social Enrichment</h2>
<ul>
  <li><strong>Training sessions:</strong> Even 5 minutes of trick training or reviewing known commands provides significant mental stimulation. Dogs that "know everything" can still be challenged by asking for known behaviors in new environments or combinations.</li>
  <li><strong>Playdates:</strong> Interaction with compatible dogs provides social cognitive exercise that no amount of solo activities replicates. Even 30 minutes with a compatible dog friend is highly enriching.</li>
  <li><strong>Dog sports:</strong> Agility, flyball, herding, dock diving, rally obedience — all provide extreme mental and physical stimulation. Most dogs take to their breed-appropriate sport quickly.</li>
</ul>
<h2 id="environment">Environmental Enrichment</h2>
<ul>
  <li><strong>Novel walks:</strong> New routes, new neighborhoods, and new parks. New smells are inherently stimulating. Drive to a new park twice a week.</li>
  <li><strong>Dog TV / window perches:</strong> Some dogs are genuinely entertained by watching birds, squirrels, and movement outside. YouTube has "dog TV" content specifically designed for this. (Note: not for reactive dogs watching triggers through windows.)</li>
  <li><strong>Water play:</strong> Sprinklers, small pools, garden hoses. Many dogs find water intrinsically interesting.</li>
  <li><strong>New objects:</strong> Introducing novel objects (cardboard boxes, different textures, new shapes) for investigation provides exploratory enrichment.</li>
</ul>
<h2 id="schedule">Building an Enrichment Rotation</h2>
<p>The key to effective enrichment is variety — the same puzzle becomes less stimulating as the dog masters it. Build a weekly rotation:</p>
<ul>
  <li>Monday: Puzzle feeder for breakfast</li>
  <li>Tuesday: Training session (new trick or proofing)</li>
  <li>Wednesday: Frozen KONG, scatter feed dinner</li>
  <li>Thursday: Hide and seek with treats</li>
  <li>Friday: Sniff walk in a new location</li>
  <li>Weekend: Playdate or dog sport activity</li>
</ul>
<div class="key-box"><strong>Key Takeaway:</strong> Most behavior problems in healthy dogs are boredom and under-stimulation problems. Mental enrichment is not a luxury — it's a basic need. 15–20 minutes of mental exercise daily (puzzle feeding + a training session) replaces an extra 30 minutes of walking in terms of behavior improvement.</div>`,
    related: [{url:'/training/fun-tricks.html',title:'Fun Dog Tricks'},{url:'/training/stop-barking.html',title:'Stop Excessive Barking'},{url:'/training/separation-anxiety.html',title:'Separation Anxiety'}]
  }
];

const OUT_DIR = path.join(__dirname, 'training');
GUIDES.forEach(g => {
  const html = page(g);
  const fp = path.join(OUT_DIR, g.slug + '.html');
  fs.writeFileSync(fp, html, 'utf8');
  console.log('Created:', fp);
});
console.log('Done: Training guides (18 pages)');
