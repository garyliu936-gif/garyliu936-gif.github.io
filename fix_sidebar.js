// fix_sidebar.js — node fix_sidebar.js
// 1. Fixes "24+" breed count → dynamic span + JS in main.js
// 2. Upgrades Quick Facts for 49 original pages from 4 → 8 rich fields

'use strict';
const fs   = require('fs');
const path = require('path');

const breedsDir = path.join(__dirname, 'breeds');
const mainJsPath = path.join(__dirname, 'js', 'main.js');

// ── Count actual breed pages ──────────────────────────────────────────────────
const BREED_COUNT = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html').length;

console.log('Actual breed pages:', BREED_COUNT);

// ── Rich Quick Facts data for all 49 original pages ──────────────────────────
// Format: filename → array of [label, value] pairs
const QUICK_FACTS = {
  'aussiedoodle.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Herding × Non-Sporting)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Aussiepoo, Aussie Poodle'],
    ['Size',              'Medium–Large (25–70 lbs)'],
    ['Coat',              'Wavy or curly, low-shedding'],
    ['Colors',            'Blue merle, red merle, black/tan, tricolor'],
    ['Good for Apartments', 'No — high energy, needs a yard'],
  ],
  'australian-shepherd.html': [
    ['AKC Rank',          '#12 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'United States (from European herding dogs)'],
    ['Also Known As',     'Aussie'],
    ['Size',              'Medium (40–65 lbs)'],
    ['Coat',              'Medium-length, wavy double coat'],
    ['Colors',            'Blue merle, red merle, black, red — often with white/tan'],
    ['Good for Apartments', 'No — very high energy breed'],
  ],
  'basset-hound.html': [
    ['AKC Rank',          '#39 most popular'],
    ['Group',             'Hound'],
    ['Origin',            'France'],
    ['Also Known As',     'Basset'],
    ['Size',              'Medium (40–65 lbs)'],
    ['Coat',              'Short, smooth, dense'],
    ['Colors',            'Tri-color, lemon/white, red/white'],
    ['Good for Apartments', 'Yes — low energy, calm indoors'],
  ],
  'beagle.html': [
    ['AKC Rank',          '#7 most popular'],
    ['Group',             'Hound'],
    ['Origin',            'England'],
    ['Also Known As',     'English Beagle'],
    ['Size',              'Small–Medium (20–30 lbs)'],
    ['Coat',              'Short, dense, weather-resistant'],
    ['Colors',            'Tri-color, lemon/white, red/white, chocolate/white'],
    ['Good for Apartments', 'Possible — can be vocal without exercise'],
  ],
  'belgian-malinois.html': [
    ['AKC Rank',          '#37 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'Belgium (city of Malines)'],
    ['Also Known As',     'Malinois, Mali'],
    ['Size',              'Large (40–80 lbs)'],
    ['Coat',              'Short, straight, dense — fawn to mahogany'],
    ['Colors',            'Fawn to mahogany with black mask and ears'],
    ['Good for Apartments', 'No — extremely high energy'],
  ],
  'bernedoodle.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Working × Non-Sporting)'],
    ['Origin',            'United States / Canada'],
    ['Also Known As',     'Bernese Mountain Poo'],
    ['Size',              'Standard 70–90 lbs; Mini 25–49 lbs'],
    ['Coat',              'Wavy to curly, low-shedding'],
    ['Colors',            'Tricolor (black/white/rust), bicolor, sable'],
    ['Good for Apartments', 'No — large size needs space'],
  ],
  'bernese-mountain-dog.html': [
    ['AKC Rank',          '#22 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Swiss Alps, Switzerland'],
    ['Also Known As',     'Berner, Berner Sennenhund'],
    ['Size',              'Giant (70–115 lbs)'],
    ['Coat',              'Long, silky, tricolor double coat'],
    ['Colors',            'Black with rust and white markings'],
    ['Good for Apartments', 'No — large breed needs space and cool climate'],
  ],
  'bichon-frise.html': [
    ['AKC Rank',          '#46 most popular'],
    ['Group',             'Non-Sporting'],
    ['Origin',            'Canary Islands / Mediterranean (France)'],
    ['Also Known As',     'Bichon à poil frisé, Teneriffe Dog'],
    ['Size',              'Small (12–18 lbs)'],
    ['Coat',              'Soft, curly, hypoallergenic double coat'],
    ['Colors',            'White (sometimes with buff or cream shading)'],
    ['Good for Apartments', 'Yes — ideal city companion'],
  ],
  'border-collie.html': [
    ['AKC Rank',          '#31 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'Anglo-Scottish border region'],
    ['Also Known As',     'Scottish Sheepdog'],
    ['Size',              'Medium (30–55 lbs)'],
    ['Coat',              'Rough (medium/long) or smooth — dense double coat'],
    ['Colors',            'Black/white, tricolor, red/white, blue merle, sable'],
    ['Good for Apartments', 'No — highest-energy breed, needs a job'],
  ],
  'boston-terrier.html': [
    ['AKC Rank',          '#23 most popular'],
    ['Group',             'Non-Sporting'],
    ['Origin',            'United States (Boston, Massachusetts)'],
    ['Also Known As',     'American Gentleman'],
    ['Size',              'Small (12–25 lbs)'],
    ['Coat',              'Short, smooth, fine-textured'],
    ['Colors',            'Black/white, brindle/white, seal/white'],
    ['Good for Apartments', 'Yes — great city dog'],
  ],
  'boxer.html': [
    ['AKC Rank',          '#14 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Germany'],
    ['Also Known As',     'Deutscher Boxer'],
    ['Size',              'Large (50–80 lbs)'],
    ['Coat',              'Short, shiny, tight-fitting'],
    ['Colors',            'Fawn, brindle — with white markings'],
    ['Good for Apartments', 'Possible — needs vigorous daily exercise'],
  ],
  'bulldog.html': [
    ['AKC Rank',          '#6 most popular'],
    ['Group',             'Non-Sporting'],
    ['Origin',            'England'],
    ['Also Known As',     'English Bulldog, British Bulldog'],
    ['Size',              'Medium (40–50 lbs)'],
    ['Coat',              'Short, smooth, dense, fine-textured'],
    ['Colors',            'Red brindle, white, fawn, piebald, brindle/white'],
    ['Good for Apartments', 'Yes — low energy, very adaptable'],
  ],
  'cane-corso.html': [
    ['AKC Rank',          '#21 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Italy'],
    ['Also Known As',     'Italian Mastiff, Cane Corso Italiano'],
    ['Size',              'Giant (85–110+ lbs)'],
    ['Coat',              'Short, stiff, dense double coat'],
    ['Colors',            'Black, grey, fawn, red, brindle'],
    ['Good for Apartments', 'No — large powerful breed needs space'],
  ],
  'cavalier-king-charles.html': [
    ['AKC Rank',          '#16 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'United Kingdom'],
    ['Also Known As',     'Cavalier, CKCS'],
    ['Size',              'Small (12–18 lbs)'],
    ['Coat',              'Long, silky, slightly wavy'],
    ['Colors',            'Blenheim, tricolor, ruby, black/tan'],
    ['Good for Apartments', 'Yes — calm and very adaptable'],
  ],
  'cavapoo.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Toy × Non-Sporting)'],
    ['Origin',            'Australia'],
    ['Also Known As',     'Cavadoodle, Cavoodle'],
    ['Size',              'Small–Medium (9–25 lbs)'],
    ['Coat',              'Soft, wavy to curly, low-shedding'],
    ['Colors',            'Gold, cream, chestnut, black, white, tricolor'],
    ['Good for Apartments', 'Yes — very adaptable'],
  ],
  'chihuahua.html': [
    ['AKC Rank',          '#36 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'Mexico (state of Chihuahua)'],
    ['Also Known As',     'Chi'],
    ['Size',              'Toy (2–6 lbs)'],
    ['Coat',              'Smooth-coat (short) or long-coat variety'],
    ['Colors',            'Virtually every color and pattern — enormous variety'],
    ['Good for Apartments', 'Yes — perfect for small spaces'],
  ],
  'cockapoo.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Sporting × Non-Sporting)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Cockerdoodle, Spoodle'],
    ['Size',              'Small–Medium (12–30 lbs)'],
    ['Coat',              'Wavy or curly, low-shedding'],
    ['Colors',            'Cream, golden, brown, black, merle, parti'],
    ['Good for Apartments', 'Yes — adaptable and affectionate'],
  ],
  'collie.html': [
    ['AKC Rank',          '#40 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'Scotland and Northern England'],
    ['Also Known As',     'Rough Collie, Lassie Dog'],
    ['Size',              'Large (50–75 lbs)'],
    ['Coat',              'Rough (long, dense) or smooth variety — double coat'],
    ['Colors',            'Sable/white, tricolor, blue merle, white'],
    ['Good for Apartments', 'No — active herding breed'],
  ],
  'corgi.html': [
    ['AKC Rank',          '#11 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'Wales, United Kingdom'],
    ['Also Known As',     'Pembroke, Corgi, Welsh Corgi'],
    ['Size',              'Small–Medium (20–30 lbs)'],
    ['Coat',              'Medium-length, weather-resistant double coat'],
    ['Colors',            'Red, sable, fawn, black/tan — often with white markings'],
    ['Good for Apartments', 'Yes — adaptable with daily exercise'],
  ],
  'dachshund.html': [
    ['AKC Rank',          '#9 most popular'],
    ['Group',             'Hound'],
    ['Origin',            'Germany'],
    ['Also Known As',     'Wiener Dog, Sausage Dog, Teckel, Dackel'],
    ['Size',              'Miniature under 11 lbs; Standard 16–32 lbs'],
    ['Coat',              'Smooth, long-haired, or wire-haired varieties'],
    ['Colors',            'Red, black/tan, chocolate/tan, cream, dapple, piebald'],
    ['Good for Apartments', 'Yes — adaptable to smaller spaces'],
  ],
  'dalmatian.html': [
    ['AKC Rank',          '#49 most popular'],
    ['Group',             'Non-Sporting'],
    ['Origin',            'Dalmatia, Croatia (Balkans)'],
    ['Also Known As',     'Coach Dog, Spotted Dick, Firehouse Dog'],
    ['Size',              'Large (45–70 lbs)'],
    ['Coat',              'Short, fine, dense — white with black or liver spots'],
    ['Colors',            'White with black spots; white with liver (brown) spots'],
    ['Good for Apartments', 'No — very high energy breed'],
  ],
  'doberman-pinscher.html': [
    ['AKC Rank',          '#16 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Germany (created by Louis Dobermann, 1890s)'],
    ['Also Known As',     'Doberman, Dobie'],
    ['Size',              'Large (60–100 lbs)'],
    ['Coat',              'Short, smooth, hard — minimal grooming needed'],
    ['Colors',            'Black/rust, red/rust, blue/rust, fawn/rust'],
    ['Good for Apartments', 'Possible — needs vigorous daily exercise'],
  ],
  'english-springer-spaniel.html': [
    ['AKC Rank',          '#27 most popular'],
    ['Group',             'Sporting'],
    ['Origin',            'England'],
    ['Also Known As',     'Springer, ESS'],
    ['Size',              'Medium (40–55 lbs)'],
    ['Coat',              'Medium-length, flat or wavy — dense, water-resistant'],
    ['Colors',            'Liver/white, black/white, tricolor'],
    ['Good for Apartments', 'Possible with sufficient daily exercise'],
  ],
  'french-bulldog.html': [
    ['AKC Rank',          '#1 (2022–2023), #2 (2024)'],
    ['Group',             'Non-Sporting'],
    ['Origin',            'England / France (crossed from English Bulldogs)'],
    ['Also Known As',     'Frenchie'],
    ['Size',              'Small (under 28 lbs)'],
    ['Coat',              'Short, smooth, fine-textured'],
    ['Colors',            'Brindle, fawn, white, cream, pied, blue/grey'],
    ['Good for Apartments', 'Yes — perfect city dog'],
  ],
  'german-shepherd.html': [
    ['AKC Rank',          '#2 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'Germany (Max von Stephanitz, 1899)'],
    ['Also Known As',     'GSD, Alsatian, Deutscher Schäferhund'],
    ['Size',              'Large (50–90 lbs)'],
    ['Coat',              'Double coat — dense outer; thick, soft undercoat'],
    ['Colors',            'Black/tan (most common), sable, solid black, bicolor'],
    ['Good for Apartments', 'No — needs extensive daily exercise'],
  ],
  'german-shorthaired-pointer.html': [
    ['AKC Rank',          '#11 most popular'],
    ['Group',             'Sporting'],
    ['Origin',            'Germany'],
    ['Also Known As',     'GSP, Deutscher Kurzhaariger Vorstehhund'],
    ['Size',              'Large (45–70 lbs)'],
    ['Coat',              'Short, flat, coarse, dense — water-repellent'],
    ['Colors',            'Liver, liver/white, liver roan, black, black/white'],
    ['Good for Apartments', 'No — extremely high energy breed'],
  ],
  'golden-retriever.html': [
    ['AKC Rank',          '#3 most popular'],
    ['Group',             'Sporting'],
    ['Origin',            'Scotland (Lord Tweedmouth, 1860s)'],
    ['Also Known As',     'Golden, Goldie'],
    ['Size',              'Large (55–75 lbs)'],
    ['Coat',              'Dense, water-resistant double coat — gold to dark gold'],
    ['Colors',            'Light golden, golden, dark golden'],
    ['Good for Apartments', 'Possible — needs 1–2 hours exercise daily'],
  ],
  'goldendoodle.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Sporting × Non-Sporting)'],
    ['Origin',            'United States / Australia'],
    ['Also Known As',     'Groodle'],
    ['Size',              'Standard 50–90 lbs; Mini 15–35 lbs'],
    ['Coat',              'Wavy to curly, low-shedding'],
    ['Colors',            'Gold, cream, apricot, red, chocolate, black, parti'],
    ['Good for Apartments', 'Yes (miniature) — Standard needs more space'],
  ],
  'great-dane.html': [
    ['AKC Rank',          '#17 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Germany (despite the name)'],
    ['Also Known As',     'German Mastiff, Deutsche Dogge, Apollo of Dogs'],
    ['Size',              'Giant (110–175+ lbs)'],
    ['Coat',              'Short, thick, smooth'],
    ['Colors',            'Fawn, brindle, blue, black, harlequin, merle, mantle'],
    ['Good for Apartments', 'Surprisingly yes — gentle and calm indoors'],
  ],
  'havanese.html': [
    ['AKC Rank',          '#24 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'Cuba (national dog of Cuba)'],
    ['Also Known As',     'Havana Silk Dog, Bichón Havanés'],
    ['Size',              'Small (7–13 lbs)'],
    ['Coat',              'Long, silky, double coat — low-shedding'],
    ['Colors',            'Black, white, chocolate, cream, silver, blue, parti'],
    ['Good for Apartments', 'Yes — ideal city companion'],
  ],
  'labradoodle.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Sporting × Non-Sporting)'],
    ['Origin',            'Australia (Wally Conron, 1989)'],
    ['Also Known As',     'Doodle'],
    ['Size',              'Standard 50–65 lbs; Medium 30–45 lbs; Mini 15–25 lbs'],
    ['Coat',              'Wavy to curly, low-shedding'],
    ['Colors',            'Cream, golden, chocolate, black, red, silver, parti'],
    ['Good for Apartments', 'Possible (miniature) — Standard needs more space'],
  ],
  'labrador-retriever.html': [
    ['AKC Rank',          '#2 most popular (was #1 for 31 years)'],
    ['Group',             'Sporting'],
    ['Origin',            'Newfoundland, Canada'],
    ['Also Known As',     'Lab, Labrador'],
    ['Size',              'Large (55–80 lbs)'],
    ['Coat',              'Short, dense, water-resistant double coat'],
    ['Colors',            'Yellow, black, chocolate'],
    ['Good for Apartments', 'Possible — needs 1–2 hours exercise daily'],
  ],
  'maltese.html': [
    ['AKC Rank',          '#37 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'Malta (Mediterranean island)'],
    ['Also Known As',     'Bichon Maltais, Maltese Lion Dog'],
    ['Size',              'Toy (4–7 lbs)'],
    ['Coat',              'Long, silky, straight — single coat, minimal shedding'],
    ['Colors',            'White'],
    ['Good for Apartments', 'Yes — perfect for small spaces'],
  ],
  'maltipoo.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Toy)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Maltese Poodle, Maltepoo'],
    ['Size',              'Toy–Small (5–20 lbs)'],
    ['Coat',              'Soft, wavy or curly, low-shedding'],
    ['Colors',            'White, cream, apricot, gold, silver, black'],
    ['Good for Apartments', 'Yes — ideal small-space companion'],
  ],
  'miniature-schnauzer.html': [
    ['AKC Rank',          '#18 most popular'],
    ['Group',             'Terrier'],
    ['Origin',            'Germany (19th century)'],
    ['Also Known As',     'Zwergschnauzer, Mini Schnauzer'],
    ['Size',              'Small (11–20 lbs)'],
    ['Coat',              'Double coat — hard, wiry outer; dense soft undercoat'],
    ['Colors',            'Salt/pepper, black/silver, solid black, white'],
    ['Good for Apartments', 'Yes — adaptable and spirited'],
  ],
  'newfoundland.html': [
    ['AKC Rank',          '#40 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Newfoundland, Canada'],
    ['Also Known As',     'Newf, Newfie, The Gentle Giant'],
    ['Size',              'Giant (100–150 lbs)'],
    ['Coat',              'Thick, flat, water-resistant double coat'],
    ['Colors',            'Black, brown, grey, Landseer (black/white)'],
    ['Good for Apartments', 'No — giant breed needs space and cool climate'],
  ],
  'pomeranian.html': [
    ['AKC Rank',          '#22 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'Pomerania region (Germany/Poland)'],
    ['Also Known As',     'Pom, Zwergspitz, Toy German Spitz'],
    ['Size',              'Toy (3–7 lbs)'],
    ['Coat',              'Long, fluffy double coat — heavy outer with dense undercoat'],
    ['Colors',            'Orange, red, cream, sable, black, blue, merle, parti'],
    ['Good for Apartments', 'Yes — perfect for small spaces'],
  ],
  'pomsky.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Toy × Working)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Pomeranian Husky'],
    ['Size',              'Small–Medium (15–30 lbs)'],
    ['Coat',              'Thick, fluffy, double coat — moderate to heavy shedding'],
    ['Colors',            'Grey/white, black/white, brown/white, merle, cream'],
    ['Good for Apartments', 'Possible with daily vigorous exercise'],
  ],
  'poodle.html': [
    ['AKC Rank',          '#4 most popular'],
    ['Group',             'Non-Sporting (Standard) / Toy (Toy Poodle)'],
    ['Origin',            'Germany / France'],
    ['Also Known As',     'Caniche, Barbone'],
    ['Size',              'Toy 4–6 lbs; Mini 10–15 lbs; Standard 40–70 lbs'],
    ['Coat',              'Curly, dense, low-shedding — hypoallergenic'],
    ['Colors',            'Black, white, apricot, red, silver, blue, cream, café au lait'],
    ['Good for Apartments', 'Yes (Toy/Mini) — Standard needs more space'],
  ],
  'rottweiler.html': [
    ['AKC Rank',          '#8 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Rottweil, Germany (descended from Roman drover dogs)'],
    ['Also Known As',     'Rottie, Rott'],
    ['Size',              'Large (80–135 lbs)'],
    ['Coat',              'Short, flat, coarse double coat'],
    ['Colors',            'Black with mahogany or rust markings only'],
    ['Good for Apartments', 'No — large, active breed needs space'],
  ],
  'schnoodle.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Terrier × Non-Sporting)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Schnauzer Poodle mix'],
    ['Size',              'Toy to Giant (6–75 lbs depending on parent size)'],
    ['Coat',              'Wavy or curly, low-shedding'],
    ['Colors',            'Grey, silver, black, brown, apricot, cream, parti'],
    ['Good for Apartments', 'Yes (toy/miniature variety)'],
  ],
  'shetland-sheepdog.html': [
    ['AKC Rank',          '#25 most popular'],
    ['Group',             'Herding'],
    ['Origin',            'Shetland Islands, Scotland'],
    ['Also Known As',     'Sheltie, Miniature Collie'],
    ['Size',              'Small (15–25 lbs)'],
    ['Coat',              'Long, rough double coat — profuse mane and frill'],
    ['Colors',            'Sable, tricolor, blue merle, black/white, black/tan'],
    ['Good for Apartments', 'Possible with daily exercise'],
  ],
  'shih-tzu.html': [
    ['AKC Rank',          '#22 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'Tibet / China'],
    ['Also Known As',     'Lion Dog, Chrysanthemum Dog'],
    ['Size',              'Small (9–16 lbs)'],
    ['Coat',              'Long, flowing, silky double coat — low-shedding'],
    ['Colors',            'Gold/white, black/white, solid brown, red/white, silver/white'],
    ['Good for Apartments', 'Yes — perfect indoor companion'],
  ],
  'shorkie.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Toy)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Shorkie Tzu, Yorkie Tzu'],
    ['Size',              'Toy (5–12 lbs)'],
    ['Coat',              'Long, silky to wavy, low-shedding'],
    ['Colors',            'Gold, black/tan, red/gold, parti-color'],
    ['Good for Apartments', 'Yes — perfect for small spaces'],
  ],
  'siberian-husky.html': [
    ['AKC Rank',          '#19 most popular'],
    ['Group',             'Working'],
    ['Origin',            'Siberia, Russia (bred by Chukchi people)'],
    ['Also Known As',     'Husky, Sibe'],
    ['Size',              'Medium (35–60 lbs)'],
    ['Coat',              'Thick, dense double coat — heavy seasonal shedder'],
    ['Colors',            'Black/white, grey/white, red/white, solid white, agouti'],
    ['Good for Apartments', 'No — very high energy escape artist'],
  ],
  'vizsla.html': [
    ['AKC Rank',          '#31 most popular'],
    ['Group',             'Sporting'],
    ['Origin',            'Hungary'],
    ['Also Known As',     'Hungarian Pointer, Magyar Vizsla'],
    ['Size',              'Medium–Large (44–60 lbs)'],
    ['Coat',              'Short, smooth, golden-rust — single coat, minimal shedding'],
    ['Colors',            'Golden rust (only AKC-accepted color)'],
    ['Good for Apartments', 'No — very high exercise needs'],
  ],
  'weimaraner.html': [
    ['AKC Rank',          '#36 most popular'],
    ['Group',             'Sporting'],
    ['Origin',            'Weimar, Germany (early 19th century)'],
    ['Also Known As',     'Grey Ghost, Weimaraner Vorstehhund'],
    ['Size',              'Large (55–90 lbs)'],
    ['Coat',              'Short, smooth, sleek — silver-grey, low-maintenance'],
    ['Colors',            'Silver-grey, mouse-grey, blue-grey'],
    ['Good for Apartments', 'No — needs extensive daily exercise'],
  ],
  'yorkipoo.html': [
    ['AKC Rank',          'Not AKC recognized (mixed breed)'],
    ['Group',             'Mixed Breed (Toy)'],
    ['Origin',            'United States'],
    ['Also Known As',     'Yorkiedoodle, Yorkapoo'],
    ['Size',              'Toy–Small (4–15 lbs)'],
    ['Coat',              'Wavy or curly, low-shedding'],
    ['Colors',            'Cream, apricot, red, gold, black/tan, parti'],
    ['Good for Apartments', 'Yes — ideal small-space companion'],
  ],
  'yorkshire-terrier.html': [
    ['AKC Rank',          '#13 most popular'],
    ['Group',             'Toy'],
    ['Origin',            'Yorkshire, England (Victorian era)'],
    ['Also Known As',     'Yorkie'],
    ['Size',              'Toy (4–7 lbs)'],
    ['Coat',              'Long, silky, floor-length — hypoallergenic, low-shedding'],
    ['Colors',            'Blue/tan (adult), black/gold (puppy)'],
    ['Good for Apartments', 'Yes — perfect city dog'],
  ],
};

// ── Helper: build new Quick Facts card HTML ───────────────────────────────────
function buildQuickFactsCard(facts) {
  const boxes = facts.map(([k, v], i) =>
    `          <div class="info-box"${i > 0 ? ' style="margin-top:8px"' : ''}><div class="info-box-label">${k}</div><div class="info-box-value">${v}</div></div>`
  ).join('\n');
  return `<div class="sidebar-card">
          <h4>Quick Facts</h4>
${boxes}
        </div>`;
}

// ── Helper: replace the Quick Facts sidebar card ──────────────────────────────
function replaceQuickFactsCard(html, facts) {
  const h4Marker = '<h4>Quick Facts</h4>';
  const h4Pos = html.indexOf(h4Marker);
  if (h4Pos === -1) return null; // no Quick Facts card

  // Find the <div class="sidebar-card"> immediately before h4
  const cardOpen = '<div class="sidebar-card">';
  const cardOpenPos = html.lastIndexOf(cardOpen, h4Pos);
  if (cardOpenPos === -1) return null;

  // Find </aside> — the Quick Facts card is always the last one
  const asideClosePos = html.indexOf('</aside>', h4Pos);
  if (asideClosePos === -1) return null;

  // Find the closing </div> of the Quick Facts card (last </div> before </aside>)
  const cardCloseEnd = html.lastIndexOf('</div>', asideClosePos - 1) + '</div>'.length;

  return html.slice(0, cardOpenPos) + buildQuickFactsCard(facts) + html.slice(cardCloseEnd);
}

// ── Helper: update Explore More Breeds paragraph ──────────────────────────────
function updateExploreMoreBreeds(html, count) {
  // Replace any existing paragraph inside the Explore More Breeds card
  // Works for: "24+ dog breeds", "dog breeds", etc.
  return html.replace(
    /<p style="color:var\(--teal-dark\); font-size:\.88rem; margin-bottom:14px">Browse our full directory of (?:[^<]*dog breeds)[^<]*<\/p>/,
    `<p style="color:var(--teal-dark); font-size:.88rem; margin-bottom:14px">Browse our full directory of <strong class="breed-count-live">${count}+</strong> dog breeds with detailed profiles.</p>`
  );
}

// ── Update main.js with breed count JS ───────────────────────────────────────
function updateMainJs(count) {
  let js = fs.readFileSync(mainJsPath, 'utf8');

  // Remove any existing breed count block
  js = js.replace(/\n\/\/ ── Breed count[\s\S]*?\/\/ end breed count\n/, '');

  // Append the breed count updater
  const snippet = `
// ── Breed count — auto-updated by fix_sidebar.js ─────────────────────────────
(function () {
  const BREED_COUNT = ${count};
  document.querySelectorAll('.breed-count-live').forEach(function (el) {
    el.textContent = BREED_COUNT + '+';
  });
})();
// end breed count
`;
  js = js.trimEnd() + '\n' + snippet;
  fs.writeFileSync(mainJsPath, js, 'utf8');
  console.log(`✓ main.js updated — BREED_COUNT = ${count}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
const files = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let countFixed = 0, factsFixed = 0, skipped = 0;

for (const file of files) {
  const fp = path.join(breedsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  // 1. Fix Explore More Breeds count
  const updated = updateExploreMoreBreeds(html, BREED_COUNT);
  if (updated !== html) {
    html = updated;
    changed = true;
    countFixed++;
  }

  // 2. Upgrade Quick Facts if we have data for this file
  if (QUICK_FACTS[file]) {
    const upgraded = replaceQuickFactsCard(html, QUICK_FACTS[file]);
    if (upgraded && upgraded !== html) {
      html = upgraded;
      changed = true;
      factsFixed++;
      console.log(`QF   ${file}`);
    }
  }

  if (changed) fs.writeFileSync(fp, html, 'utf8');
  else skipped++;
}

// 3. Update main.js
updateMainJs(BREED_COUNT);

console.log('\n──────────────────────────────────────');
console.log('Breed count updated : ' + countFixed + ' pages');
console.log('Quick Facts fixed   : ' + factsFixed + ' pages');
console.log('Unchanged           : ' + skipped);
console.log('BREED_COUNT set to  : ' + BREED_COUNT);
