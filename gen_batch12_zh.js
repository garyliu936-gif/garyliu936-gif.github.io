/**
 * Generate Chinese breed pages for Batch 12
 * Run: node gen_batch12_zh.js
 */

const fs = require('fs');
const path = require('path');

const breedTranslations = {
  'austrian-black-and-tan-hound': {
    name: '奥地利黑褐猎犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 奥地利优雅的阿尔卑斯猎犬——一种中等体型的黑褐色嗅觉猎犬，为在山地森林中狩猎而培育',
    emoji: '🏔️',
  },
  'barak-hound': {
    name: '巴拉克猎犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 克罗地亚稀有的森林猎手——一种中等体型的嗅觉猎犬，具有非凡的嗅觉，为巴尔干山地森林狩猎而培育',
    emoji: '🇭🇷',
  },
  'basset-artesien-normand': {
    name: '阿图瓦诺曼底长腿犬',
    subtitle: '长腿猎犬 / FCI第6组 · 纯种犬 · 法国魅力十足的短腿猎手——一种低位长腿嗅觉猎犬，为在法国山谷和平原中猎兔而培育',
    emoji: '🇫🇷',
  },
  'basset-fauve-de-bretagne': {
    name: '布列塔尼金红长腿犬',
    subtitle: '长腿猎犬 / FCI第6组 · 纯种犬 · 法国金红色短腿猎手——一种低位金红色嗅觉猎犬，具有非凡的嗅觉，为猎兔而培育',
    emoji: '🇫🇷',
  },
  'bavarian-mountain-hound': {
    name: '巴伐利亚山地猎犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 德国阿尔卑斯追踪专家——一种中等体型的红褐色猎犬，专门为在山地地形中追踪而培育',
    emoji: '🏔️',
  },
};

function createChineseBreedPage(breedFile, breedKey) {
  const enFile = path.join(__dirname, 'breeds', breedFile);
  const zhFile = path.join(__dirname, 'zh', 'breeds', breedFile);

  if (!fs.existsSync(enFile)) {
    console.log(`⚠️  ${breedFile} not found`);
    return false;
  }

  const enContent = fs.readFileSync(enFile, 'utf8');
  const translation = breedTranslations[breedKey];

  if (!translation) {
    console.log(`⚠️  No translation found for ${breedKey}`);
    return false;
  }

  let zhContent = enContent
    .replace(/lang="en"/g, 'lang="zh-CN"')
    .replace(/<title>.*?<\/title>/, `<title>${translation.name} — 犬种介绍、性格、护理与健康 | AllDogFacts</title>`)
    .replace(/name="description" content="[^"]*"/, `name="description" content="${translation.name}品种介绍：${translation.subtitle}FCI认可犬种。"`)
    .replace(/href="\.\.\/css\/styles\.css"/g, 'href="../../css/styles.css"')
    .replace(/href="\.\.\/css\/breeds\.css"/g, 'href="../../css/breeds.css"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/zh/index.html"')
    .replace(/href="\/breeds\/index\.html"/g, 'href="/zh/breeds/index.html"')
    .replace(/href="\/getting-a-dog\/index\.html"/g, 'href="/zh/getting-a-dog/index.html"')
    .replace(/href="\/training\/index\.html"/g, 'href="/zh/training/index.html"')
    .replace(/href="\/health\/index\.html"/g, 'href="/zh/health/index.html"')
    .replace(/href="\/nutrition\/index\.html"/g, 'href="/zh/nutrition/index.html"')
    .replace(/href="\/grooming\/index\.html"/g, 'href="/zh/grooming/index.html"')
    .replace(/src="\.\.\/js\/main\.js"/g, 'src="../../js/main.js"')
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
    zhContent = zhContent.replace(
      /<script>window\.dataLayer/,
      `<script>localStorage.setItem('adf-lang','zh');window.dataLayer`
    );
  }

  fs.writeFileSync(zhFile, zhContent, 'utf8');
  console.log(`✅ Created ${breedFile} (ZH)`);
  return true;
}

const batch12Breeds = [
  { file: 'austrian-black-and-tan-hound.html', key: 'austrian-black-and-tan-hound' },
  { file: 'barak-hound.html', key: 'barak-hound' },
  { file: 'basset-artesien-normand.html', key: 'basset-artesien-normand' },
  { file: 'basset-fauve-de-bretagne.html', key: 'basset-fauve-de-bretagne' },
  { file: 'bavarian-mountain-hound.html', key: 'bavarian-mountain-hound' },
];

console.log('🚀 Generating Batch 12 Chinese breed pages...\n');

let created = 0;
batch12Breeds.forEach(breed => {
  if (createChineseBreedPage(breed.file, breed.key)) {
    created++;
  }
});

console.log(`\n✨ Generated ${created} Chinese breed pages for Batch 12`);
