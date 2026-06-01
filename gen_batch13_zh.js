const fs = require('fs');
const path = require('path');

const breedTranslations = {
  'beagle-harrier': { name: '比格-哈里犬', subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 法国多功能群猎犬——一种中等体型的嗅觉猎犬，结合了比格犬和哈里犬的特征', emoji: '🦌' },
  'belgian-shepherd': { name: '比利时牧羊犬', subtitle: '牧羊犬 / FCI第1组 · 纯种犬 · 比利时多功能工作犬——一种聪慧、运动型的牧羊犬，因警务和军事工作而闻名', emoji: '🇧🇪' },
  'bergamasco-shepherd': { name: '伯格马斯卡牧羊犬', subtitle: '牧羊犬 / FCI第1组 · 纯种犬 · 意大利独特的毛绒牧羊人——一种具有独特毛毡状外套的中等大小的意大利牧羊犬', emoji: '🇮🇹' },
  'bichon-frise': { name: '比雄犬', subtitle: '玩具伴侣犬 / FCI第9组 · 纯种犬 · 法国欢快的白色伴侣——一只小型、蓬松的玩具犬，性格开朗、低掉毛的低过敏毛发', emoji: '☁️' },
  'billy': { name: '比利犬', subtitle: '大型嗅觉猎犬 / FCI第6组 · 纯种犬 · 法国稀有的白色群猎犬——一种大型白色嗅觉猎犬，为在法国森林中狩猎大型野生动物而培育', emoji: '🇫🇷' }
};

function createChineseBreedPage(breedFile, breedKey) {
  const enFile = path.join(__dirname, 'breeds', breedFile);
  const zhFile = path.join(__dirname, 'zh', 'breeds', breedFile);

  if (!fs.existsSync(enFile)) return false;

  const enContent = fs.readFileSync(enFile, 'utf8');
  const translation = breedTranslations[breedKey];

  if (!translation) return false;

  let zhContent = enContent
    .replace(/lang="en"/g, 'lang="zh-CN"')
    .replace(/<title>.*?<\/title>/, `<title>${translation.name} — 犬种介绍、性格、护理与健康 | AllDogFacts</title>`)
    .replace(/name="description" content="[^"]*"/, `name="description" content="${translation.name}品种介绍：${translation.subtitle}FCI认可犬种。"`)
    .replace(/href="\.\.\/css\//g, 'href="../../css/')
    .replace(/href="\/breeds\//g, 'href="/zh/breeds/')
    .replace(/href="\/getting-a-dog\//g, 'href="/zh/getting-a-dog/')
    .replace(/href="\/training\//g, 'href="/zh/training/')
    .replace(/href="\/health\//g, 'href="/zh/health/')
    .replace(/href="\/nutrition\//g, 'href="/zh/nutrition/')
    .replace(/href="\/grooming\//g, 'href="/zh/grooming/')
    .replace(/src="\.\.\/js\//g, 'src="../../js/')
    .replace(/Home<\/a>/g, '首页</a>')
    .replace(/Dog Breeds<\/a>/g, '犬种大全</a>')
    .replace(/Getting a Dog<\/a>/g, '养狗入门</a>')
    .replace(/Training<\/a>/g, '训练指南</a>')
    .replace(/Health<\/a>/g, '健康</a>')
    .replace(/Nutrition<\/a>/g, '营养</a>')
    .replace(/Grooming<\/a>/g, '美容护理</a>')
    .replace(/<h1>.*?<\/h1>/, `<h1>${translation.name}</h1>`)
    .replace(/class="breed-subtitle">.*?<\/p>/, `class="breed-subtitle">${translation.subtitle}</p>`)
    .replace(/id="breedEmoji">[^<]*<\/span>/, `id="breedEmoji">${translation.emoji}</span>`)
    .replace(/localStorage\.setItem\('adf-lang','en'\);/, `localStorage.setItem('adf-lang','zh');`);

  if (!zhContent.includes("localStorage.setItem('adf-lang','zh')")) {
    zhContent = zhContent.replace(/<script>window\.dataLayer/, `<script>localStorage.setItem('adf-lang','zh');window.dataLayer`);
  }

  fs.writeFileSync(zhFile, zhContent, 'utf8');
  console.log(`✅ Created ${breedFile} (ZH)`);
  return true;
}

const batch13Breeds = [
  { file: 'beagle-harrier.html', key: 'beagle-harrier' },
  { file: 'belgian-shepherd.html', key: 'belgian-shepherd' },
  { file: 'bergamasco-shepherd.html', key: 'bergamasco-shepherd' },
  { file: 'bichon-frise.html', key: 'bichon-frise' },
  { file: 'billy.html', key: 'billy' }
];

console.log('🚀 Generating Batch 13 Chinese breed pages...\n');

let created = 0;
batch13Breeds.forEach(breed => {
  if (createChineseBreedPage(breed.file, breed.key)) created++;
});

console.log(`\n✨ Generated ${created} Chinese breed pages for Batch 13`);
