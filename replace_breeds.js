const fs = require('fs');
let content = fs.readFileSync('breeds/index.html', 'utf8');

const replacements = [
  ['Bichon Frisé', 'Bichon Frise'],
  ['Coton de Tuléar', 'Coton de Tulear'],
  ['Hamiltонstövare', 'Hamiltonstovare'],
  ['Löwchen', 'Lowchen'],
  ['Petit Basset Griffon Vendéen', 'Petit Basset Griffon Vendeen'],
  ['Grand Basset Griffon Vendéen', 'Grand Basset Griffon Vendeen'],
  ['Cimarrón Uruguayo', 'Cimarron Uruguayo'],
  ['Large Münsterlander', 'Large Munsterlander'],
  ['Small Münsterlander', 'Small Munsterlander'],
  ['Anglo-Français de Petite Vénerie', 'Anglo-Francais de Petite Venerie'],
  ['Ariège Pointer', 'Ariege Pointer'],
  ['Ariégeois', 'Ariegeois'],
  ['Basset Artésien Normand', 'Basset Artesien Normand'],
  ['Braque Français (Type Gascogne)', 'Braque Francais (Type Gascogne)'],
  ['Braque Français (Type Pyrénées)', 'Braque Francais (Type Pyrenees)'],
  ['Braque Français', 'Braque Francais'],
  ['Briquet Griffon Vendéen', 'Briquet Griffon Vendeen'],
  ['Cão de Castro Laboreiro', 'Cao de Castro Laboreiro'],
  ['Cão de Gado Transmontano', 'Cao de Gado Transmontano'],
  ['Cão Fila de São Miguel', 'Cao Fila de Sao Miguel'],
  ['Český Fousek', 'Cesky Fousek'],
  ['Chien Français Blanc et Noir', 'Chien Francais Blanc et Noir'],
  ['Chien Français Blanc et Orange', 'Chien Francais Blanc et Orange'],
  ['Chien Français Tricolore', 'Chien Francais Tricolore'],
  ['Galgo Español', 'Galgo Espanol'],
  ['Gończy Polski', 'Gonczy Polski'],
  ['Grand Anglo-Français Blanc et Noir', 'Grand Anglo-Francais Blanc et Noir'],
  ['Grand Anglo-Français Blanc et Orange', 'Grand Anglo-Francais Blanc et Orange'],
  ['Grand Anglo-Français Tricolore', 'Grand Anglo-Francais Tricolore'],
  ['Grand Griffon Vendéen', 'Grand Griffon Vendeen'],
  ['Jämthund', 'Jamthund'],
  ['Schillerstövare', 'Schillerstovare'],
  ['Smålandss tövare', 'Smalandsstovare'],
  ['Smålandssövare', 'Smalandsstovare'],
  ['Smålandstövare', 'Smalandsstovare'],
  ['Smålandss tövare', 'Smalandsstovare'],
  ['Slovenský Kopov', 'Slovensky Kopov'],
  ['Kromfohrländer', 'Kromfohrlander'],
  ['Kromfohrländer', 'Kromfohrlander'],
  ['Kromfohrländer', 'Kromfohrlander'],
  ['Magyar Agár', 'Magyar Agar'],
  ['Petit Brabançon', 'Petit Brabancon'],
  ['Šarplaninac', 'Sarplaninac'],
];

let total = 0;
for (const [old, neu] of replacements) {
  const n = (content.split(old)).length - 1;
  if (n) { content = content.split(old).join(neu); console.log(n + 'x  ' + old + '  ->  ' + neu); total += n; }
}

fs.writeFileSync('breeds/index.html', content, 'utf8');
console.log('Done - ' + total + ' replacements total');
