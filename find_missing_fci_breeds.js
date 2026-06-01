/**
 * Find FCI breeds not yet in the breeds directory
 */

const fs = require('fs');
const path = require('path');

// Complete FCI breed list (from Wikipedia FCI category)
const FCIBreeds = [
  // A
  "Affenpinscher", "Afghan Hound", "Aidi", "Airedale Terrier", "Akita",
  "Alaskan Malamute", "Alpine Dachsbracke", "American Cocker Spaniel", "American Foxhound",
  "American Staffordshire Terrier", "American Water Spaniel", "Andalusian Terrier",
  "Anglo-Français de Petite Vénerie", "Appenzeller Sennenhund", "Ariège Pointer", "Ariégeois",
  "Artois Hound", "Australian Cattle Dog", "Australian Kelpie", "Australian Shepherd",
  "Australian Silky Terrier", "Australian Stumpy Tail Cattle Dog", "Australian Terrier",
  "Austrian Black and Tan Hound", "Azawakh",
  // B
  "Barak Hound", "Barbet", "Basenji", "Basset Artésien Normand", "Basset Bleu de Gascogne",
  "Basset Fauve de Bretagne", "Basset Hound", "Bavarian Mountain Hound", "Beagle",
  "Beagle-Harrier", "Bearded Collie", "Beauceron", "Bedlington Terrier", "Belgian Shepherd",
  "Bergamasco Shepherd", "Berger Picard", "Bernese Mountain Dog", "Bichon Frisé", "Billy",
  "Black and Tan Coonhound", "Black Norwegian Elkhound", "Black Russian Terrier", "Bloodhound",
  "Blue Picardy Spaniel", "Bohemian Shepherd", "Bolognese", "Border Collie", "Border Terrier",
  "Borzoi", "Boston Terrier", "Bouvier des Ardennes", "Bouvier des Flandres", "Boxer",
  "Bracco Italiano", "Braque d'Auvergne", "Braque du Bourbonnais", "Braque Français",
  "Braque Saint-Germain", "Brazilian Terrier", "Briard", "Briquet Griffon Vendéen",
  "Brittany Spaniel", "Broholmer", "Bucovina Shepherd Dog", "Bull Terrier", "Bulldog",
  "Bullmastiff", "Burgos Pointer",
  // C
  "Ca de Bestiar", "Ca de Bou", "Cairn Terrier", "Campeiro Bulldog", "Canaan Dog",
  "Canadian Eskimo Dog", "Cane Corso", "Cão de Gado Transmontano", "Carpathian Shepherd Dog",
  "Castro Laboreiro Dog", "Catalan Sheepdog", "Caucasian Shepherd Dog", "Cavalier King Charles Spaniel",
  "Central Asian Shepherd Dog", "Český fousek", "Cesky Terrier", "Chesapeake Bay Retriever",
  "Chien Français Blanc et Noir", "Chien Français Blanc et Orange", "Chien Français Tricolore",
  "Chihuahua", "Chinese Crested Dog", "Chow Chow", "Cimarrón Uruguayo", "Cirneco dell'Etna",
  "Clumber Spaniel", "Colombian Fino Hound", "Continental Bulldog", "Coton de Tulear",
  "Croatian Sheepdog", "Curly-coated Retriever", "Czechoslovakian Wolfdog",
  // D
  "Dalmatian", "Dandie Dinmont Terrier", "Danish–Swedish Farmdog", "Dobermann", "Dogo Argentino",
  "Dogue de Bordeaux", "Drentse Patrijshond", "Drever", "Dunker", "Dutch Shepherd",
  // E
  "East Siberian Laika", "English Cocker Spaniel", "English Foxhound", "English Mastiff",
  "English Setter", "English Springer Spaniel", "English Toy Terrier", "Entlebucher Mountain Dog",
  "Estonian Hound", "Estrela Mountain Dog", "Eurasier",
  // F
  "Field Spaniel", "Fila Brasileiro", "Finnish Hound", "Finnish Lapphund", "Finnish Spitz",
  "Flat-coated Retriever", "French Bulldog", "French Spaniel",
  // G
  "Galgo Español", "Gascon Saintongeois", "German Hound", "German Longhaired Pointer",
  "German Pinscher", "German Shepherd", "German Shorthaired Pointer", "German Spaniel",
  "German Spitz", "German Wirehaired Pointer", "Giant Schnauzer", "Glen of Imaal Terrier",
  "Golden Retriever", "Gończy Polski", "Gordon Setter", "Grand Anglo-Français Blanc et Noir",
  "Grand Anglo-Français Blanc et Orange", "Grand Anglo-Français Tricolore", "Grand Basset Griffon Vendéen",
  "Grand Bleu de Gascogne", "Grand Griffon Vendéen", "Great Dane", "Greater Swiss Mountain Dog",
  "Greek Harehound", "Greenland Dog", "Greyhound", "Griffon Bleu de Gascogne", "Griffon Bruxellois",
  "Griffon Fauve de Bretagne", "Griffon Nivernais",
  // H
  "Halden Hound", "Hamiltonstövare", "Hanover Hound", "Harrier", "Havanese", "Hovawart",
  "Hygen Hound",
  // I
  "Ibizan Hound", "Icelandic Sheepdog", "Irish Red and White Setter", "Irish Setter",
  "Irish Terrier", "Irish Water Spaniel", "Irish Wolfhound", "Istrian Coarse-haired Hound",
  "Istrian Shorthaired Hound", "Italian Greyhound",
  // J
  "Jack Russell Terrier", "Jagdterrier", "Jämthund", "Japanese Chin", "Japanese Spitz",
  "Japanese Terrier",
  // K
  "Kai Ken", "Kangal Shepherd Dog", "Karelian Bear Dog", "Karst Shepherd", "Kazakh Tazy",
  "Keeshond", "Kerry Blue Terrier", "King Charles Spaniel", "Kintamani", "Kishu", "Komondor",
  "Kooikerhondje",
  // L-Z (abbreviated for now)
  "Labrador Retriever", "Lagotto Romagnolo", "Lakeland Terrier", "Lancashire Heeler",
  "Lapponian Herder", "Large Münsterlander", "Leonberger", "Lhasa Apso", "Lowchen",
  "Lundehund", "Lurcher",
  // M
  "Maltese", "Manchester Terrier", "Maremma Sheepdog", "Mastiff", "Miniature American Shepherd",
  "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer", "Mioritic Shepherd Dog",
  "Molossian Hound",
  // N
  "Neapolitan Mastiff", "Newfoundland", "Norfolk Terrier", "Norrbottenspitz", "North Country Beagle",
  "Norwegian Buhund", "Norwegian Elkhound", "Norwegian Lundehund", "Norwich Terrier",
  "Nova Scotia Duck Tolling Retriever",
  // P
  "Papillon", "Parson Russell Terrier", "Patterdale Terrier", "Pekingese", "Pembroke Welsh Corgi",
  "Perro de Presa Canario", "Peruvian Hairless Dog", "Petit Basset Griffon Vendéen",
  "Petit Bleu de Gascogne", "Pharaoh Hound", "Picardy Spaniel", "Pointer", "Polish Hound",
  "Polish Owczarek Nizinny", "Polish Tatra Sheepdog", "Poodle", "Portuguese Pointer",
  "Portuguese Water Dog", "Posavac Hound", "Pudelpointer", "Pug", "Puli", "Pumi",
  // Q
  "Rafeiro do Alentejo",
  // R
  "Ratonero Valenciano", "Rhodesian Ridgeback", "Rottweiler", "Rough Collie", "Rouvier",
  "Russian Black Terrier", "Russian Toy",
  // S
  "Saarlos Wolfdog", "Saluki", "Samoyed", "Sapsali", "Schipperke", "Schnauzer", "Schnauzers",
  "Scottish Deerhound", "Scottish Terrier", "Sealyham Terrier", "Segugio Italiano",
  "Serbian Hound", "Serbian Mastiff", "Serbian Tricolore Hound", "Shar Pei", "Shetland Sheepdog",
  "Shiba Inu", "Shih Tzu", "Shikoku", "Siberian Husky", "Silken Windhound", "Skye Terrier",
  "Sloughi", "Slovak Hound", "Slovakian Rough-coated Pointer", "Sluchai", "Small Blue de Gascogne",
  "Small Münsterlander", "Smooth Collie", "Soft Coated Wheaten Terrier", "Sostenko Hound",
  "Spanish Hound", "Spanish Mastiff", "Spanish Water Dog", "Spaniel", "Spitz", "Springer Spaniel",
  "St. Bernard", "Staffordshire Bull Terrier", "Stichelhaar", "Støllebengel", "Suomenkari",
  "Sussex Spaniel", "Swedish Elkhound", "Swedish Lapphund", "Swedish Vallhund", "Swiss Hound",
  "Swiss Laufhund", "Swornoye Hound",
  // T
  "Tahltan Bear Dog", "Talbot Hound", "Tamaskan Dog", "Tatouay", "Teddy Roosevelt Terrier",
  "Telomian", "Tenterfield Terrier", "Terrier", "Tibetan Mastiff", "Tibetan Spaniel",
  "Tibetan Terrier", "Toy Fox Terrier", "Toy Manchester Terrier", "Toy Poodle", "Toy Terrier",
  "Transylvanian Hound", "Trigg Hound", "Tricolore de Périgord", "Tricolore Francaise",
  "Tricolore Gascon", "Triquet", "Tyrolean Hound",
  // U
  "Ukrainian Shepherd Dog",
  // V
  "Vallhund", "Vizsla",
  // W
  "Weimaraner", "Welsh Cob", "Welsh Hound", "Welsh Springer Spaniel", "Welsh Terrier",
  "West Highland White Terrier", "Westphalian Dachsbracke", "Wetterhoun", "Whippet",
  "Whippet Italiano", "Whippet Racing", "Wirehaired Griffon", "Wirehaired Slovakian Pointer",
  "Wirehaired Pointing Griffon", "Wirehaired Vizsla", "Wire Fox Terrier", "Wire-haired Dachshund",
  "Wurttemberg Pointer",
  // X
  // Y
  "Yorkshire Terrier",
  // Z
  "Zerdava", "Zulu Hound"
];

// Normalize breed name to URL format
function normalizeBreed(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/-+/g, '-')
    .trim();
}

// Get existing breeds
const breedsDir = path.join(__dirname, 'breeds');
const existingFiles = fs.readdirSync(breedsDir)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .map(f => f.replace('.html', ''))
  .sort();

const existingSet = new Set(existingFiles);

// Find missing FCI breeds
const missingBreeds = FCIBreeds.filter(breed => {
  const normalized = normalizeBreed(breed);
  return !existingSet.has(normalized);
});

console.log(`📊 Breed Analysis:`);
console.log(`   FCI Total: ${FCIBreeds.length} breeds`);
console.log(`   You Have: ${existingFiles.length} breeds`);
console.log(`   Missing: ${missingBreeds.length} breeds\n`);

console.log(`🔍 First 10 Missing FCI Breeds:`);
missingBreeds.slice(0, 10).forEach((breed, i) => {
  console.log(`   ${i + 1}. ${breed} (${normalizeBreed(breed)})`);
});

console.log(`\n💾 Saving complete missing breeds list...`);
fs.writeFileSync(
  path.join(__dirname, 'missing_fci_breeds.json'),
  JSON.stringify(missingBreeds, null, 2),
  'utf8'
);

console.log(`✅ Found ${missingBreeds.length} missing breeds. Saved to missing_fci_breeds.json`);
