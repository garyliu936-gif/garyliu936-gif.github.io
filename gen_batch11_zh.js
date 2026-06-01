/**
 * Generate Chinese breed pages for Batch 11
 * Run: node gen_batch11_zh.js
 */

const fs = require('fs');
const path = require('path');

const breedTranslations = {
  'arigeois': {
    name: '阿里埃日犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 法国活力十足的群猎犬——一种中等体型的三色群猎犬，在阿里埃日地区饲养用于狩猎',
    emoji: '🦌',
  },
  'artois-hound': {
    name: '阿图瓦猎犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 法国活力十足的小猎物猎犬——来自阿图瓦地区的三色群猎犬，具有出色的嗅觉和不懈的工作动力',
    emoji: '🦌',
  },
  'australian-kelpie': {
    name: '澳大利亚凯尔皮犬',
    subtitle: '牧羊犬 / FCI第1组 · 纯种犬 · 澳大利亚不知疲倦的牧羊犬——一种小型、运动型的牧羊犬，为在苛刻的澳大利亚内陆条件下工作而培育',
    emoji: '🐑',
  },
  'australian-silky-terrier': {
    name: '澳大利亚丝毛梗',
    subtitle: '玩具梗犬 / FCI第3组 · 纯种犬 · 澳大利亚优雅的小型捕鼠犬——一种小型、活力十足的梗犬，毛发丝滑，为控制啮齿动物和蛇而培育',
    emoji: '🇦🇺',
  },
  'australian-stumpy-tail-cattle-dog': {
    name: '澳大利亚断尾牧牛犬',
    subtitle: '牧牛犬 / FCI第1组 · 纯种犬 · 澳大利亚紧凑的断尾牧羊人——一种不知疲倦的牧场工人，天生短尾，为在苛刻的澳大利亚条件下控制牲畜而培育',
    emoji: '🐑',
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

const batch11Breeds = [
  { file: 'arigeois.html', key: 'arigeois' },
  { file: 'artois-hound.html', key: 'artois-hound' },
  { file: 'australian-kelpie.html', key: 'australian-kelpie' },
  { file: 'australian-silky-terrier.html', key: 'australian-silky-terrier' },
  { file: 'australian-stumpy-tail-cattle-dog.html', key: 'australian-stumpy-tail-cattle-dog' },
];

console.log('🚀 Generating Batch 11 Chinese breed pages...\n');

let created = 0;
batch11Breeds.forEach(breed => {
  if (createChineseBreedPage(breed.file, breed.key)) {
    created++;
  }
});

console.log(`\n✨ Generated ${created} Chinese breed pages for Batch 11`);
