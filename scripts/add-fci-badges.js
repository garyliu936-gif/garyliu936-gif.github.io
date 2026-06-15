#!/usr/bin/env node
/**
 * add-fci-badges.js
 * Adds "FCI G#" badges to all 360 FCI breeds in breeds/index.html and zh/breeds/index.html
 *
 * Badge rules:
 *   AKC+FCI breed  → teal badge (#0d9488):  "AKC #N<br>FCI G#"   (replace KCI G# with FCI G#)
 *   FCI-only breed → purple badge (#6366f1): "FCI G#"
 *
 * Run: node scripts/add-fci-badges.js
 */

const fs = require('fs');
const path = require('path');

// ─── FCI DATA (359 breeds from spreadsheet) ────────────────────────────────
const FCI_RAW = `AUSTRALIAN CATTLE DOG|1
AUSTRALIAN KELPIE|1
AUSTRALIAN SHEPHERD|1
AUSTRALIAN STUMPY TAIL CATTLE DOG|1
BEARDED COLLIE|1
BEAUCE SHEEPDOG|1
BELGIAN SHEPHERD DOG|1
BERGAMASCO SHEPHERD DOG|1
BOHEMIAN SHEPHERD DOG|1
BORDER COLLIE|1
BOUVIER DES ARDENNES|1
BOUVIER DES FLANDRES|1
BRIARD|1
CATALAN SHEEPDOG|1
COLLIE ROUGH|1
COLLIE SMOOTH|1
CROATIAN SHEPHERD DOG|1
CZECHOSLOVAKIAN WOLFDOG|1
DUTCH SCHAPENDOES|1
DUTCH SHEPHERD DOG|1
GERMAN SHEPHERD DOG|1
KOMONDOR|1
KUVASZ|1
LANCASHIRE HEELER|1
LONG-HAIRED PYRENEAN SHEEPDOG|1
MAJORCA SHEPHERD DOG|1
MAREMMA AND THE ABRUZZES SHEEPDOG|1
MINIATURE AMERICAN SHEPHERD|1
MUDI|1
OLD ENGLISH SHEEPDOG|1
PICARDY SHEEPDOG|1
POLISH LOWLAND SHEEPDOG|1
POLISH TATRA SHEPHERD|1
PORTUGUESE SHEEPDOG|1
PULI|1
PUMI|1
PYRENEAN SHEEPDOG SMOOTH FACED|1
ROMANIAN CARPATHIAN SHEPHERD DOG|1
ROMANIAN MIORITIC SHEPHERD DOG|1
SAARLOOS WOLFHOND|1
SCHIPPERKE|1
SHETLAND SHEEPDOG|1
SLOVAKIAN CHUVACH|1
SOUTH RUSSIAN SHEPHERD DOG|1
WELSH CORGI CARDIGAN|1
WELSH CORGI PEMBROKE|1
WHITE SWISS SHEPHERD DOG|1
AFFENPINSCHER|2
APPENZELL CATTLE DOG|2
ATLAS MOUNTAIN DOG|2
AUSTRIAN PINSCHER|2
BERNESE MOUNTAIN DOG|2
BOSNIAN AND HERZEGOVINIAN CROATIAN SHEPHERD DOG|2
BOXER|2
BRAZILIAN CAMPEIRO BULLDOG|2
BROHOLMER|2
BULLDOG|2
BULLMASTIFF|2
CASTRO LABOREIRO DOG|2
CAUCASIAN SHEPHERD DOG|2
CENTRAL ASIA SHEPHERD DOG|2
CIMARRON URUGUAYO|2
CONTINENTAL BULLDOG|2
DANISH-SWEDISH FARMDOG|2
DOBERMANN|2
DOGO ARGENTINO|2
DOGUE DE BORDEAUX|2
DUTCH SMOUSHOND|2
ENTLEBUCH CATTLE DOG|2
ESTRELA MOUNTAIN DOG|2
FILA BRASILEIRO|2
GERMAN PINSCHER|2
GIANT SCHNAUZER|2
GREAT DANE|2
GREAT SWISS MOUNTAIN DOG|2
HOVAWART|2
ITALIAN CANE CORSO|2
KANGAL SHEPHERD DOG|2
KARST SHEPHERD DOG|2
LANDSEER EUROPEAN CONTINENTAL TYPE|2
LEONBERGER|2
MAJORCA MASTIFF|2
MASTIFF|2
MINIATURE PINSCHER|2
MINIATURE SCHNAUZER|2
NEAPOLITAN MASTIFF|2
NEWFOUNDLAND|2
PRESA CANARIO|2
PYRENEAN MASTIFF|2
PYRENEAN MOUNTAIN DOG|2
RAFEIRO OF ALENTEJO|2
ROMANIAN BUCOVINA SHEPHERD|2
ROMANIAN RAVEN SHEPHERD DOG|2
ROTTWEILER|2
SAINT BERNARD|2
SCHNAUZER|2
SHAR PEI|2
SPANISH MASTIFF|2
TIBETAN MASTIFF|2
TOSA|2
TRANSMONTANO MASTIFF|2
YUGOSLAVIAN SHEPHERD DOG SHARPLANINA|2
AIREDALE TERRIER|3
AMERICAN STAFFORDSHIRE TERRIER|3
AUSTRALIAN SILKY TERRIER|3
AUSTRALIAN TERRIER|3
BEDLINGTON TERRIER|3
BORDER TERRIER|3
BRAZILIAN TERRIER|3
BULL TERRIER|3
CAIRN TERRIER|3
CESKY TERRIER|3
CLUMBER SPANIEL|3
CURLY COATED RETRIEVER|3
DANDIE DINMONT TERRIER|3
ENGLISH COCKER SPANIEL|3
ENGLISH TOY TERRIER BLACK AND TAN|3
FOX TERRIER SMOOTH|3
FOX TERRIER WIRE|3
GERMAN HUNTING TERRIER|3
GOLDEN RETRIEVER|3
IRISH GLEN OF IMAAL TERRIER|3
IRISH SOFT COATED WHEATEN TERRIER|3
IRISH TERRIER|3
JACK RUSSELL TERRIER|3
JAPANESE TERRIER|3
KERRY BLUE TERRIER|3
LAKELAND TERRIER|3
MANCHESTER TERRIER|3
MINIATURE BULL TERRIER|3
NORFOLK TERRIER|3
NORWEGIAN LUNDEHUND|3
NORWICH TERRIER|3
PARSON RUSSELL TERRIER|3
SCOTTISH TERRIER|3
SEALYHAM TERRIER|3
SKYE TERRIER|3
STAFFORDSHIRE BULL TERRIER|3
VALENCIAN TERRIER|3
WELSH TERRIER|3
WEST HIGHLAND WHITE TERRIER|3
YORKSHIRE TERRIER|3
DACHSHUND|4
KANINCHEN DACHSHUND|4
MINIATURE DACHSHUND|4
STANDARD DACHSHUND|4
AKITA|5
ALASKAN MALAMUTE|5
AMERICAN AKITA|5
AMERICAN ESKIMO DOG|5
BASENJI|5
CANARIAN WARREN HOUND|5
CHOW CHOW|5
CIRNECO DELL ETNA|5
EAST SIBERIAN LAIKA|5
EURASIAN|5
FINNISH LAPPONIAN DOG|5
FINNISH SPITZ|5
GERMAN SPITZ|5
GREENLAND DOG|5
HOKKAIDO|5
IBIZAN PODENCO|5
ICELANDIC SHEEPDOG|5
ITALIAN VOLPINO|5
JAMTHUND|5
JAPANESE SPITZ|5
KAI|5
KARELIAN BEAR DOG|5
KINTAMANI-BALI DOG|5
KISHU|5
KOREA JINDO DOG|5
LAPPONIAN HERDER|5
NORRBOTTENSPITZ|5
NORWEGIAN BUHUND|5
NORWEGIAN ELKHOUND BLACK|5
NORWEGIAN ELKHOUND GREY|5
PERUVIAN HAIRLESS DOG|5
PHARAOH HOUND|5
PORTUGUESE WARREN HOUND|5
RUSSIAN-EUROPEAN LAIKA|5
SAMOYED|5
SHIBA|5
SHIKOKU|5
SIBERIAN HUSKY|5
ST BERNARD|5
SWEDISH LAPPHUND|5
SWEDISH VALLHUND|5
TAIWAN DOG|5
THAI BANGKAEW DOG|5
THAI RIDGEBACK DOG|5
WEST SIBERIAN LAIKA|5
XOLOITZCUINTLE|5
YAKUTIAN LAIKA|5
ALPINE DACHSBRACKE|6
AMERICAN FOXHOUND|6
ARIEGEOIS|6
ARTOIS HOUND|6
AUSTRIAN BLACK AND TAN HOUND|6
BASSET FAUVE DE BRETAGNE|6
BASSET HOUND|6
BAVARIAN MOUNTAIN SCENT HOUND|6
BEAGLE|6
BEAGLE HARRIER|6
BILLY|6
BLACK AND TAN COONHOUND|6
BLOODHOUND|6
BLUE GASCONY BASSET|6
BLUE GASCONY GRIFFON|6
BLUETICK COONHOUND|6
BOSNIAN BROKEN-HAIRED HOUND|6
BRIQUET GRIFFON VENDEEN|6
BRUNO JURA HOUND|6
CHART POLSKI|6
DALMATIAN|6
DREVER|6
DUNKER|6
ENGLISH FOXHOUND|6
ERDELY KOPOV|6
ESTONIAN HOUND|6
FAUVE DE BRETAGNE|6
FINNISH HOUND|6
FOXHOUND|6
FRENCH TRICOLOUR HOUND|6
FRENCH WHITE AND BLACK HOUND|6
FRENCH WHITE AND ORANGE HOUND|6
GASCON SAINTONGEOIS|6
GRAND BASSET GRIFFON VENDEEN|6
GRAND BLEU DE GASCOGNE|6
GRAND GRIFFON VENDEEN|6
GREEK HAREHOUND|6
HALDEN HOUND|6
HAMILTONSTOVARE|6
HANOVER SCENT HOUND|6
HELLENIKOS ICHNILATIS|6
HYGENHUND|6
ICELANDIC HOUND|6
ISTRIAN COARSE-HAIRED HOUND|6
ISTRIAN SHORT-HAIRED HOUND|6
KERRY BEAGLE|6
LARGE VENDEEN GRIFFON|6
LATVIAN HOUND|6
LUZERNER LAUFHUND|6
MONTENEGRIN MOUNTAIN HOUND|6
MUENSTERLANDER|6
NORRBOTTEN HOUND|6
NORWEGIAN HOUND|6
PETIT BASSET GRIFFON VENDEEN|6
PETIT BLEU DE GASCOGNE|6
PLOTT HOUND|6
POITEVIN|6
POLISH HUNTING DOG|6
PORCELAINE|6
POSAVAC HOUND|6
REDBONE COONHOUND|6
RHODESIAN RIDGEBACK|6
ROMANIAN HUNTING DOG|6
ROTTWEILER|6
RUSSIAN HOUND|6
SAVA VALLEY HOUND|6
SCHILLERSTOVARE|6
SCHWARZWILD BRACKE|6
SERBIAN HOUND|6
SERBIAN TRICOLORED HOUND|6
SIBERIAN HUSKY|6
SLOVAKIAN HOUND|6
SLOVENSKY KOPOV|6
SMÅLANDSSTÖVARE|6
SPANISH HOUND|6
STEINBRACKE|6
STYRIAN COARSE-HAIRED HOUND|6
SWISS HOUND|6
TREEING WALKER COONHOUND|6
TYROLEAN HOUND|6
WESTPHALIAN DACHSBRACKE|6
BURGOS POINTING DOG|7
CHESAPEAKE BAY RETRIEVER|7
DEUTSCH LANGHAAR|7
DEUTSCH STICHELHAAR|7
DRENTSCHE PARTRIDGE DOG|7
ENGLISH POINTER|7
ENGLISH SETTER|7
FRENCH POINTING DOG GASCOGNE TYPE|7
FRENCH POINTING DOG PYRENEAN TYPE|7
FRENCH SPANIEL|7
GERMAN SHORT-HAIRED POINTING DOG|7
GERMAN WIRE-HAIRED POINTING DOG|7
GORDON SETTER|7
HUNGARIAN SHORT-HAIRED POINTER VIZSLA|7
HUNGARIAN WIRE-HAIRED POINTER|7
IRISH RED AND WHITE SETTER|7
IRISH RED SETTER|7
ITALIAN POINTING DOG|7
ITALIAN SPINONE|7
KLEINER MUNSTERLANDER|7
LARGE MUNSTERLANDER|7
OLD DANISH POINTING DOG|7
PICARDY SPANIEL|7
PONT-AUDEMER SPANIEL|7
PORTUGUESE POINTING DOG|7
PUDELPOINTER|7
SAINT GERMAIN POINTER|7
STABIJHOUN|7
WEIMARANER|7
WIRE-HAIRED POINTING GRIFFON KORTHALS|7
WIREHAIRED SLOVAKIAN POINTER|7
AMERICAN COCKER SPANIEL|8
AMERICAN WATER SPANIEL|8
ENGLISH SPRINGER SPANIEL|8
FIELD SPANIEL|8
FLAT COATED RETRIEVER|8
FRENCH WATER DOG|8
GERMAN SPANIEL|8
IRISH WATER SPANIEL|8
LABRADOR RETRIEVER|8
NEDERLANDSE KOOIKERHONDJE|8
NOVA SCOTIA DUCK TOLLING RETRIEVER|8
PORTUGUESE WATER DOG|8
ROMAGNA WATER DOG|8
SPANISH WATER DOG|8
SUSSEX SPANIEL|8
WELSH SPRINGER SPANIEL|8
WETTERHOUN|8
BICHON FRISE|9
BOLOGNESE|9
BOSTON TERRIER|9
CAVALIER KING CHARLES SPANIEL|9
CHIHUAHUA|9
CHINESE CRESTED DOG|9
CONTINENTAL TOY SPANIEL|9
COTON DE TULEAR|9
FRENCH BULLDOG|9
GRIFFON BELGE|9
GRIFFON BRUXELLOIS|9
HAVANESE|9
JAPANESE CHIN|9
KING CHARLES SPANIEL|9
KROMFORLANDER|9
LHASA APSO|9
LITTLE LION DOG|9
MALTESE|9
PEKINGESE|9
PETIT BRABANCON|9
POODLE|9
PRAGUE RATTER|9
PUG|9
RUSSIAN TOY|9
SHIH TZU|9
TIBETAN SPANIEL|9
TIBETAN TERRIER|9
AFGHAN HOUND|10
AZAWAKH|10
BORZOI RUSSIAN HUNTING SIGHTHOUND|10
DEERHOUND|10
GREYHOUND|10
HUNGARIAN GREYHOUND|10
IRISH WOLFHOUND|10
ITALIAN SIGHTHOUND|10
KAZAKH TAZY|10
POLISH GREYHOUND|10
SALUKI|10
SLOUGHI|10
SPANISH GREYHOUND|10
WHIPPET|10`;

// ─── BUILD SLUG → GROUP MAP ─────────────────────────────────────────────────
function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[ß]/g, 'ss')
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')       // spaces to hyphens
    .replace(/-+/g, '-')        // collapse multiple hyphens
    .replace(/^-|-$/g, '');     // trim leading/trailing hyphens
}

const fciSlugMap = {}; // slug → group number
const fciNameMap = {}; // normalized name → group number (for debugging)

for (const line of FCI_RAW.split('\n')) {
  const [name, group] = line.split('|');
  if (!name || !group) continue;
  const slug = toSlug(name);
  fciSlugMap[slug] = parseInt(group);
  fciNameMap[name] = parseInt(group);
}

// Additional manual slug aliases for tricky breed names
// Format: 'actual-html-slug': groupNumber
const MANUAL_OVERRIDES = {
  // Group 1 — Sheepdogs & Herding
  'collie-rough': 1,
  'collie-smooth': 1,
  'collie': 1,
  'dutch-schapendoes': 1,
  'schapendoes': 1,
  'pyrenean-sheepdog-smooth-faced': 1,
  'pyrenean-shepherd': 1,
  'long-haired-pyrenean-sheepdog': 1,
  'german-shepherd': 1,
  'belgian-malinois': 1,
  'belgian-tervuren': 1,
  'belgian-sheepdog': 1,
  'belgian-laekenois': 1,
  'corgi': 1,
  'cardigan-welsh-corgi': 1,
  'pembroke-welsh-corgi': 1,
  'maremma-sheepdog': 1,
  'bergamasco-sheepdog': 1,
  'beauceron': 1,
  'bohemian-shepherd': 1,
  'berger-blanc-suisse': 1,
  'berger-picard': 1,
  'saarlos-wolfdog': 1,
  'slovak-cuvac': 1,
  'miniature-american-shepherd': 1,
  // Group 2 — Working / Molossians
  'atlas-mountain-dog-aidi': 2,
  'cimarron-uruguayo': 2,
  'cane-corso': 2,
  'italian-cane-corso': 2,
  'landseer': 2,
  'bosnian-and-herzegovinian-croatian-shepherd-dog': 2,
  'doberman-pinscher': 2,
  'dobermann': 2,
  'great-pyrenees': 2,
  'greater-swiss-mountain-dog': 2,
  'chinese-shar-pei': 2,
  'shar-pei': 2,
  'standard-schnauzer': 2,
  'schnauzer': 2,
  'entlebucher-mountain-dog': 2,
  'karst-shepherd': 2,
  'anatolian-shepherd-dog': 2,
  'kangal-shepherd-dog': 2,
  'black-russian-terrier': 2,
  'boerboel': 2,
  // Group 3 — Terriers
  'fox-terrier-smooth': 3,
  'fox-terrier-wire': 3,
  'wire-fox-terrier': 3,
  'smooth-fox-terrier': 3,
  'english-toy-terrier': 3,
  'german-hunting-terrier': 3,
  'silky-terrier': 3,
  'australian-silky-terrier': 3,
  'soft-coated-wheaten-terrier': 3,
  'irish-soft-coated-wheaten-terrier': 3,
  'glen-of-imaal-terrier': 3,
  'russell-terrier': 3,
  'jack-russell-terrier': 3,
  'golden-retriever': 3,
  'curly-coated-retriever': 3,
  'english-cocker-spaniel': 3,
  'clumber-spaniel': 3,
  // Group 4 — Dachshunds
  'dachshund': 4,
  'miniature-dachshund': 4,
  'kaninchen-dachshund': 4,
  'standard-dachshund': 4,
  // Group 5 — Spitz
  'shiba-inu': 5,
  'shiba': 5,
  'cirneco-delletna': 5,
  'cirneco-dell-etna': 5,
  'jämthund': 5,
  'jamthund': 5,
  'korea-jindo-dog': 5,
  'korean-jindo': 5,
  'jindo': 5,
  'portuguese-podengo': 5,
  'portuguese-podengo-pequeno': 5,
  'pharaoh-hound': 5,
  'ibizan-hound': 5,
  'ibizan-podenco': 5,
  'pomeranian': 5,
  'german-spitz': 5,
  'norrbottenspets': 5,
  'norrbottenspitz': 5,
  'finnish-lapphund': 5,
  'finnish-lapponian-dog': 5,
  'norwegian-elkhound': 5,
  'thai-ridgeback': 5,
  'peruvian-inca-orchid': 5,
  'xoloitzcuintli': 5,
  'eurasier': 5,
  'kishu-ken': 5,
  'volpino-italiano': 5,
  'kai-ken': 5,
  'canarian-warren-hound': 5,
  // Group 6 — Scent Hounds
  'porcelaine': 6,
  'petit-basset-griffon-vendeen': 6,
  'grand-basset-griffon-vendeen': 6,
  'briquet-griffon-vendeen': 6,
  'grand-griffon-vendeen': 6,
  'smalandsstovare': 6,
  'segugio-italiano': 6,
  'otterhound': 6,
  'harrier': 6,
  'colombian-fino-hound': 6,
  'american-english-coonhound': 6,
  // Group 7 — Pointing Dogs
  'vizsla': 7,
  'hungarian-vizsla': 7,
  'wirehaired-vizsla': 7,
  'hungarian-wire-haired-pointer': 7,
  'german-shorthaired-pointer': 7,
  'german-wirehaired-pointer': 7,
  'kleiner-munsterlander': 7,
  'small-munsterlander': 7,
  'large-munsterlander': 7,
  'english-pointer': 7,
  'pointer': 7,
  'braque-du-bourbonnais': 7,
  'brittany': 7,
  'spinone-italiano': 7,
  'bracco-italiano': 7,
  'irish-setter': 7,
  'wirehaired-pointing-griffon': 7,
  'stabyhoun': 7,
  // Group 8 — Retrievers, Flushing & Water Dogs
  'cocker-spaniel': 8,
  'english-cocker-spaniel-g8': 8,
  'american-cocker-spaniel': 8,
  'flat-coated-retriever': 8,
  'lagotto-romagnolo': 8,
  'barbet': 8,
  'boykin-spaniel': 8,
  // Group 9 — Companion & Toy Dogs
  'cromforlander': 9,
  'kromforlander': 9,
  'kromfohrländer': 9,
  'petit-brabancon': 9,
  'griffon-bruxellois': 9,
  'griffon-belge': 9,
  'brussels-griffon': 9,
  'little-lion-dog': 9,
  'lowchen': 9,
  'papillon': 9,
  'continental-toy-spaniel': 9,
  'english-toy-spaniel': 9,
  'king-charles-spaniel': 9,
  'cavalier-king-charles': 9,
  'chinese-crested': 9,
  // Group 10 — Sighthounds
  'borzoi': 10,
  'deerhound': 10,
  'scottish-deerhound': 10,
  'spanish-greyhound': 10,
  'galgo-espanol': 10,
  'italian-greyhound': 10,
  'italian-sighthound': 10,
  'magyar-agar': 10,
  'hungarian-greyhound': 10,
  'kazakh-tazy': 10,
  'polish-greyhound': 10,

  // ── Additional no-badge FCI breeds found in HTML ──────────────────────────
  // G1 — Herding
  'dutch-shepherd': 1,
  'rough-collie': 1,
  'smooth-collie': 1,
  'belgian-shepherd': 1,
  'bergamasco-shepherd': 1,
  'croatian-sheepdog': 1,
  'carpathian-shepherd-dog': 1,
  'mioritic-shepherd-dog': 1,
  'south-russian-ovcharka': 1,
  'slovensky-cuvac': 1,
  // G2 — Working
  'appenzeller-sennenhund': 2,
  'aidi': 2,
  'ca-de-bou': 2,
  'campeiro-bulldog': 2,
  'cao-de-castro-laboreiro': 2,
  'cao-de-gado-transmontano': 2,
  'rafeiro-do-alentejo': 2,
  'central-asian-shepherd-dog': 2,
  'bucovina-shepherd-dog': 2,
  'english-mastiff': 2,
  'russian-black-terrier': 2,
  'sarplaninac': 2,
  'tornjak': 2,
  'ca-de-bestiar': 2,
  'cao-fila-de-sao-miguel': 2,
  // G3 — Terriers
  'jagdterrier': 3,
  'andalusian-terrier': 3,
  // G5 — Spitz
  'kintamani': 5,
  'black-norwegian-elkhound': 5,
  // G6 — Scent Hounds
  'anglo-francais-de-petite-venerie': 6,
  'arigeois': 6,
  'basset-artesien-normand': 6,
  'basset-bleu-de-gascogne': 6,
  'bavarian-mountain-hound': 6,
  'barak-hound': 6,
  'chien-dartois': 6,
  'chien-francais-blanc-et-noir': 6,
  'chien-francais-blanc-et-orange': 6,
  'chien-francais-tricolore': 6,
  'grand-anglo-francais-blanc-et-noir': 6,
  'grand-anglo-francais-blanc-et-orange': 6,
  'grand-anglo-francais-tricolore': 6,
  'griffon-bleu-de-gascogne': 6,
  'griffon-fauve-de-bretagne': 6,
  'griffon-nivernais': 6,
  'halden-hound': 6,
  'hanover-hound': 6,
  'hellenic-hound': 6,
  'hygen-hound': 6,
  'istrian-shorthaired-hound': 6,
  'istrian-wirehaired-hound': 6,
  'german-hound': 6,
  'gonczy-polski': 6,
  'polish-hound': 6,
  'serbian-tricolour-hound': 6,
  'small-swiss-hound': 6,
  'transylvanian-hound': 6,
  // G7 — Pointing Dogs
  'ariege-pointer': 7,
  'blue-picardy-spaniel': 7,
  'braque-dauvergne': 7,
  'braque-francais': 7,
  'braque-francais-pointer': 7,
  'braque-saint-germain': 7,
  'brittany-spaniel': 7,
  'brittany': 7,
  'burgos-pointer': 7,
  'cesky-fousek': 7,
  'drentsche-patrijshond': 7,
  'drentse-patrijshond': 7,
  'german-longhaired-pointer': 7,
  'grosser-munsterlander': 7,
  'portuguese-pointer': 7,
  'wirehaired-slovak-pointer': 7,
};

// Merge manual overrides into fciSlugMap
Object.assign(fciSlugMap, MANUAL_OVERRIDES);

// ─── BADGE HTML BUILDERS ────────────────────────────────────────────────────
const BADGE_STYLE_AKC_FCI = 'position:absolute;top:8px;left:8px;background:#0d9488;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em';
const BADGE_STYLE_FCI_ONLY = 'position:absolute;top:8px;left:8px;background:#6366f1;color:#fff;font-size:.68rem;font-weight:800;padding:3px 9px;border-radius:20px;z-index:3;line-height:1.5;letter-spacing:.02em';

// ─── PROCESS AN HTML FILE ───────────────────────────────────────────────────
function processFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);
  let html = fs.readFileSync(filePath, 'utf8');

  let updated = 0;
  let skipped = 0;
  let noMatch = 0;

  // Match each breed card: <a href="..." class="breed-card" ...>...</a>
  // href and class can be in either order
  html = html.replace(
    /(<a\s[^>]*class="[^"]*breed-card[^"]*"[^>]*>)([\s\S]*?)(<\/a>)/g,
    (fullMatch, openTag, inner, closeTag) => {
      // Extract href from openTag
      const hrefMatch = openTag.match(/href="([^"]+)"/);
      if (!hrefMatch) return fullMatch;
      const href = hrefMatch[1];
      // Extract slug from href
      const slug = href.replace(/\.html$/, '').split('/').pop().toLowerCase();
      const fciGroup = fciSlugMap[slug];

      if (!fciGroup) {
        noMatch++;
        return fullMatch; // no FCI data for this breed
      }

      // Check current badge span inside breed-emoji-wrap
      const emojiWrapMatch = inner.match(/<div class="breed-emoji-wrap"[^>]*>([\s\S]*?)<\/div>/);
      if (!emojiWrapMatch) {
        noMatch++;
        return fullMatch;
      }

      const emojiWrapContent = emojiWrapMatch[1];

      // Check if there's already a badge span (first span inside emoji-wrap)
      const badgeSpanMatch = emojiWrapContent.match(/<span style="[^"]*position:absolute[^"]*">([\s\S]*?)<\/span>/);

      if (badgeSpanMatch) {
        const badgeText = badgeSpanMatch[1];

        // Check if badge already has correct FCI G#
        if (/FCI\s*G\d+/i.test(badgeText)) {
          skipped++;
          return fullMatch; // already has FCI G# badge
        }

        // Check if it has AKC rank (AKC+FCI breed)
        const akcMatch = badgeText.match(/AKC\s*#(\d+)/i);
        if (akcMatch) {
          // AKC+FCI breed: update KCI G# to FCI G# (or add FCI G# if only AKC)
          let newBadgeText = badgeText
            .replace(/KCI\s*G\d+/gi, `FCI G${fciGroup}`)
            .replace(/FCI(?!\s*G)/gi, `FCI G${fciGroup}`);

          // If no FCI group was added yet, append it
          if (!/FCI\s*G\d+/i.test(newBadgeText)) {
            newBadgeText = newBadgeText.trimEnd() + `<br>FCI G${fciGroup}`;
          }

          const newBadgeSpan = `<span style="${BADGE_STYLE_AKC_FCI}">${newBadgeText}</span>`;
          const newInner = inner.replace(badgeSpanMatch[0], newBadgeSpan);
          updated++;
          return openTag + newInner + closeTag;
        }

        // FCI-only breed with some badge (plain "FCI" or other text)
        const newBadgeSpan = `<span style="${BADGE_STYLE_FCI_ONLY}">FCI G${fciGroup}</span>`;
        const newInner = inner.replace(badgeSpanMatch[0], newBadgeSpan);
        updated++;
        return openTag + newInner + closeTag;

      } else {
        // No badge at all — insert FCI-only badge into breed-emoji-wrap
        const newBadgeSpan = `<span style="${BADGE_STYLE_FCI_ONLY}">FCI G${fciGroup}</span>`;
        const newEmojiWrapContent = newBadgeSpan + emojiWrapContent;
        const newInner = inner.replace(emojiWrapMatch[1], newEmojiWrapContent);
        updated++;
        return openTag + newInner + closeTag;
      }
    }
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  ✅ Updated: ${updated} cards`);
  console.log(`  ⏭  Skipped (already correct): ${skipped} cards`);
  console.log(`  ❓ No FCI match found: ${noMatch} cards`);
  return { updated, skipped, noMatch };
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
const ROOT = path.join(__dirname, '..');

console.log('FCI slug map has', Object.keys(fciSlugMap).length, 'entries');

const enResult = processFile(path.join(ROOT, 'breeds', 'index.html'));
const zhResult = processFile(path.join(ROOT, 'zh', 'breeds', 'index.html'));

console.log('\n─── SUMMARY ───────────────────────────────────');
console.log(`EN: ${enResult.updated} updated, ${enResult.skipped} skipped, ${enResult.noMatch} no-match`);
console.log(`ZH: ${zhResult.updated} updated, ${zhResult.skipped} skipped, ${zhResult.noMatch} no-match`);
console.log('\nDone! Now update getFciGroupFromBadge() to match FCI G# format.');
