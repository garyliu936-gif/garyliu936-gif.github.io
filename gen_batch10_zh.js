/**
 * Generate Chinese breed pages for Batch 10 (5 Missing FCI breeds)
 * Converts English pages to Chinese with translations
 * Run: node gen_batch10_zh.js
 */

const fs = require('fs');
const path = require('path');

// Translation mappings for Batch 10 breeds
const breedTranslations = {
  'aidi': {
    name: '艾迪犬',
    subtitle: '牲畜护卫犬 / FCI第2组 · 纯种犬 · 摩洛哥的强大山区保护者——一种古老的阿特拉斯猎犬，为了保护羊群免受豺狼和豹子的伤害而培育',
    emoji: '🏔️',
    description: '艾迪犬（也称为艾迪犬、阿特拉斯山犬）是北非首屈一指的牲畜护卫犬，在摩洛哥阿特拉斯山脉开发用于保护绵羊和山羊群免受大型肉食动物的伤害，包括豺狼、鬣狗和豹子。',
  },
  'american-cocker-spaniel': {
    name: '美国可卡犬',
    subtitle: '中等猎犬 / FCI第8组 · 纯种犬 · 美国适应性强的猎鸬鸠犬——一种中型猎犬，有着光滑的毛发、温柔的气质和渴望取悦的态度',
    emoji: '🦆',
    description: '美国可卡犬是英国可卡犬在美国精心改良的后代，开发成兼具有效的猎鸟犬和友善家庭伙伴的双重身份。相比英国表亲，美国可卡犬更小、毛发更长、性格更温柔。',
  },
  'andalusian-terrier': {
    name: '安达卢西亚梗',
    subtitle: '小梗犬 / FCI第3组 · 纯种犬 · 西班牙活泼的捕鼠犬——一只勇敢的小猎手，在安达卢西亚葡萄酒地下室和农场中育成用于控制啮齿动物数量',
    emoji: '🇪🇸',
    description: '安达卢西亚梗（Ratonero Bodeguero Andaluz）是一种小型西班牙梗犬，历史上在安达卢西亚的葡萄酒地下室和农场中培育用于控制啮齿动物数量。尽管体型较小，但该犬种以其无所畏惧的性格和非凡的狩猎能力而闻名。',
  },
  'anglo-francais-de-petite-venerie': {
    name: '小狩猎英法犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 法国活力十足的小猎物猎犬——一种中等体型的群猎嗅觉犬，专门为猎兔和野兔狩猎而开发',
    emoji: '🦌',
    description: '小狩猎英法犬是一种法国嗅觉猎犬，专门为小猎物狩猎而开发，特别是兔子和野兔。这个犬种是通过杂交法国和英国猎犬品种而创造的，结合了法国猎犬的耐力和嗅觉，以及英国狩猎传统。',
  },
  'ariege-pointer': {
    name: '阿里埃日指示犬',
    subtitle: '指示犬 / FCI第7组 · 纯种犬 · 法国优雅的猎鸟犬——一种中型指示犬，在阿里埃日比利牛斯山地区开发用于猎取野禽',
    emoji: '🏹',
    description: '阿里埃日指示犬是法国在阿里埃日比利牛斯山地区开发的猎犬。这种优雅的指示犬兼具出色的狩猎能力和温和、可训练的气质，使其在田间和作为家庭伙伴中都受到重视。',
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

  // Create Chinese version with translations
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

  // Add navigation localStorage if missing
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

// Create all 5 Batch 10 Chinese breed pages
const batch10Breeds = [
  { file: 'aidi.html', key: 'aidi' },
  { file: 'american-cocker-spaniel.html', key: 'american-cocker-spaniel' },
  { file: 'andalusian-terrier.html', key: 'andalusian-terrier' },
  { file: 'anglo-francais-de-petite-venerie.html', key: 'anglo-francais-de-petite-venerie' },
  { file: 'ariege-pointer.html', key: 'ariege-pointer' },
];

console.log('🚀 Generating Batch 10 Chinese breed pages...\n');

let created = 0;
batch10Breeds.forEach(breed => {
  if (createChineseBreedPage(breed.file, breed.key)) {
    created++;
  }
});

console.log(`\n✨ Generated ${created} Chinese breed pages for Batch 10`);
