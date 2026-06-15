const fs = require('fs');

const breeds = [
  { file: 'anglo-francais-de-petite-venerie', old: ['Anglo-Français de Petite Vénerie', 'Anglo-Francais de Petite Venerie'], new: 'Small Anglo-French Hound' },
  { file: 'basset-artesien-normand',           old: ['Basset Artésien Normand', 'Basset Artesien Normand'],             new: 'Norman Artesian Basset' },
  { file: 'cao-de-castro-laboreiro',           old: ['Cão de Castro Laboreiro', 'Cao de Castro Laboreiro'],             new: 'Castro Laboreiro Dog' },
  { file: 'cao-de-gado-transmontano',          old: ['Cão de Gado Transmontano', 'Cao de Gado Transmontano'],           new: 'Transmontano Mastiff' },
  { file: 'cao-fila-de-sao-miguel',            old: ['Cão Fila de São Miguel', 'Cao Fila de Sao Miguel'],          new: 'Saint Miguel Cattle Dog' },
  { file: 'cesky-fousek',                      old: ['Český Fousek', 'Cesky Fousek'],                              new: 'Bohemian Wirehaired Pointing Griffon' },
  { file: 'chien-francais-blanc-et-noir',      old: ['Chien Français Blanc et Noir', 'Chien Francais Blanc et Noir'],  new: 'French White and Black Hound' },
  { file: 'chien-francais-blanc-et-orange',    old: ['Chien Français Blanc et Orange', 'Chien Francais Blanc et Orange'], new: 'French White and Orange Hound' },
  { file: 'chien-francais-tricolore',          old: ['Chien Français Tricolore', 'Chien Francais Tricolore'],          new: 'French Tricolour Hound' },
  { file: 'galgo-espanol',                     old: ['Galgo Español', 'Galgo Espanol'],                                new: 'Spanish Greyhound' },
  { file: 'gonczy-polski',                     old: ['Gończy Polski', 'Gonczy Polski'],                                new: 'Polish Hound' },
  { file: 'grand-anglo-francais-blanc-et-noir',    old: ['Grand Anglo-Français Blanc et Noir', 'Grand Anglo-Francais Blanc et Noir'],    new: 'Great Anglo-French White and Black Hound' },
  { file: 'grand-anglo-francais-blanc-et-orange',  old: ['Grand Anglo-Français Blanc et Orange', 'Grand Anglo-Francais Blanc et Orange'], new: 'Great Anglo-French White and Orange Hound' },
  { file: 'grand-anglo-francais-tricolore',        old: ['Grand Anglo-Français Tricolore', 'Grand Anglo-Francais Tricolore'],             new: 'Great Anglo-French Tricolour Hound' },
  { file: 'smalandsstovare',                   old: ['Smålandss tövare', 'Smålandssövare', 'Smålandstövare', 'Smålandssövare', 'Smalandsstovare', 'Smålandssövare'], new: 'Smaland Hound' },
  { file: 'slovensky-kopov',                   old: ['Slovenský Kopov', 'Slovensky Kopov'],                            new: 'Slovakian Hound' },
  { file: 'magyar-agar',                       old: ['Magyar Agár', 'Magyar Agar'],                                   new: 'Hungarian Greyhound' },
  { file: 'sarplaninac',                       old: ['Šarplaninac', 'Sarplaninac'],                                   new: 'Yugoslavian Shepherd Dog - Sharplanina' },
];

let totalFiles = 0, totalReplacements = 0;

for (const breed of breeds) {
  for (const dir of ['C:/Pet Website/breeds', 'C:/Pet Website/zh/breeds']) {
    const path = `${dir}/${breed.file}.html`;
    if (!fs.existsSync(path)) { console.log('MISSING: ' + path); continue; }
    let c = fs.readFileSync(path, 'utf8');
    let changed = 0;
    for (const oldName of breed.old) {
      const cnt = (c.split(oldName)).length - 1;
      if (cnt) { c = c.split(oldName).join(breed.new); changed += cnt; }
    }
    if (changed) {
      fs.writeFileSync(path, c, 'utf8');
      console.log(`${changed}x  [${breed.file}]  (${dir.includes('zh') ? 'ZH' : 'EN'})  -> ${breed.new}`);
      totalReplacements += changed;
      totalFiles++;
    }
  }
}

console.log(`\nDone — ${totalReplacements} replacements across ${totalFiles} files`);
