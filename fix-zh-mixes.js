const fs = require('fs');
const path = require('path');

// Breed name translations (English → Chinese)
const breedNames = {
  'Affenpinscher': '猴面梗',
  'Airedale Terrier': '艾尔谷梗',
  'Akita': '秋田犬',
  'American Eskimo Dog': '美国爱斯基摩犬',
  'Australian Shepherd': '澳大利亚牧羊犬',
  'Basset Hound': '巴吉度猎犬',
  'Beagle': '比格犬',
  'Bernese Mountain Dog': '伯尔尼兹山地犬',
  'Bichon Frise': '比熊犬',
  'Border Collie': '边境牧羊犬',
  'Boston Terrier': '波士顿梗',
  'Bouvier des Flandres': '法兰德斯牧牛犬',
  'Boxer': '拳师犬',
  'Cairn Terrier': '凯恩梗',
  'Cavalier King Charles': '骑士查理王猎犬',
  'Chihuahua': '吉娃娃',
  'Chow Chow': '松狮犬',
  'Cocker Spaniel': '可卡犬',
  'Collie': '柯利牧羊犬',
  'Corgi': '柯基犬',
  'Coton de Tulear': '棉花面纱犬',
  'Dachshund': '腊肠犬',
  'Dalmatian': '大麦町犬',
  'Doberman Pinscher': '杜宾犬',
  'English Bulldog': '英国斗牛犬',
  'Fox Terrier': '猎狐梗',
  'French Bulldog': '法国斗牛犬',
  'German Shepherd': '德国牧羊犬',
  'Golden Retriever': '金毛寻回犬',
  'Goldendoodle': '黄金贵宾犬',
  'Great Dane': '大丹犬',
  'Great Pyrenees': '大白熊犬',
  'Irish Setter': '爱尔兰雪达犬',
  'Irish Wolfhound': '爱尔兰猎狼犬',
  'Jack Russell Terrier': '杰克罗素梗',
  'Labradoodle': '拉布拉多贵宾犬',
  'Labrador Retriever': '拉布拉多寻回犬',
  'Lhasa Apso': '拉萨犬',
  'Maltese': '马耳他犬',
  'Mastiff': '獒犬',
  'Newfoundland': '纽芬兰犬',
  'Pekingese': '北京犬',
  'Pit Bull': '比特斗牛犬',
  'Pomeranian': '博美犬',
  'Poodle': '贵宾犬',
  'Poodle/Bichon': '贵宾犬/比熊犬',
  'Portuguese Water Dog': '葡萄牙水犬',
  'Pug': '巴哥犬',
  'Rat Terrier': '捕鼠梗',
  'Rottweiler': '罗威纳犬',
  'Samoyed': '萨摩耶犬',
  'Scottish Terrier': '苏格兰梗',
  'Shiba Inu': '柴犬',
  'Shih Tzu': '西施犬',
  'Siberian Husky': '西伯利亚哈士奇',
  'Weimaraner': '魏玛猎犬',
  'Welsh Terrier': '威尔士梗',
  'Wheaten Terrier': '麦色梗',
  // wrongly translated "Great" → fix 良好
  '良好 Dane': '大丹犬',
  '良好 Pyrenees': '大白熊犬',
};

const dir = 'zh/breeds';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

let filesChanged = 0;

for (const fn of files) {
  const filePath = path.join(dir, fn);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Fix "The [Breed] 是a designer crossbreed, not AKC-recognized.
  //    Individual dogs vary [widely]于appearance 和 temperament depending on which parent's traits dominate."
  // Replace whole sentence with clean Chinese
  content = content.replace(
    /The \S+ 是a designer crossbreed, not AKC-recognized\. Individual dogs vary(?: widely)?于appearance 和 temperament depending on which parent's traits dominate\./g,
    (match) => {
      // Extract breed name
      const breedMatch = match.match(/^The (\S+) 是a/);
      const breedEn = breedMatch ? breedMatch[1] : '';
      const breedZh = breedNames[breedEn] || breedEn;
      return `${breedZh}是一种设计师混血犬，未获AKC认可。个体犬只在外貌和性格上差异较大，取决于哪一方亲本特征占主导。`;
    }
  );

  // 2. Fix "50% X, 50% Y。第一代杂交犬..." — translate breed names
  content = content.replace(
    /50% ([^,。]+), 50% ([^。]+)。第一代杂交犬/g,
    (match, b1, b2) => {
      const zh1 = breedNames[b1.trim()] || b1.trim();
      const zh2 = breedNames[b2.trim()] || b2.trim();
      return `50% ${zh1}，50% ${zh2}。第一代杂交犬`;
    }
  );

  // 3. Fix german-pinscher "极高 high-drive working dog blend"
  content = content.replace('极高 high-drive working dog blend', '极高驱动力的工作犬混血');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesChanged++;
  }
}

console.log(`Done. Updated ${filesChanged} files.`);
