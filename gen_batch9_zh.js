/**
 * Generate Chinese breed pages for Batch 9 (5 new FCI breeds)
 * Converts English pages to Chinese with translations
 * Run: node gen_batch9_zh.js
 */

const fs = require('fs');
const path = require('path');

// Translation mappings for Batch 9 breeds
const breedTranslations = {
  'transylvanian-hound': {
    name: '特兰西瓦尼亚猎犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 匈牙利古老的皇家猎犬——埃尔德利科波犬拥有1000年历史，在二战后险遭灭绝，由忠诚的匈牙利饲养者从幸存者手中重建',
    emoji: '🏰',
    description: '特兰西瓦尼亚猎犬（匈牙利语中的埃尔德利科波犬）是匈牙利最古老、历史最重要的品种之一，其根源可追溯到公元9世纪定居喀尔巴阡盆地的马扎尔部落。该犬种是在喀尔巴阡山脉（历史上称为特兰西瓦尼亚的地区）为匈牙利贵族开发的多功能猎犬，能够在崎岖的山地地形和茂密的喀尔巴阡森林中追捕包括熊、狼、山猫和野猪在内的大型野生动物。',
  },
  'polish-hound': {
    name: '波兰猎犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 波兰的古老国家犬种——一种中等大小的黑棕色嗅觉猎犬，有着8个世纪的波兰狩猎传统，是中欧最受尊敬的狩猎犬之一',
    emoji: '🏹',
    description: '波兰猎犬（波兰语中的奥加尔波斯基犬）是波兰最古老和最自豪的犬种之一，有着800多年的有文献记载的狩猎传统，可追溯到中世纪。该犬种是在波兰广阔的森林和平原中开发的，用于追踪鹿、野猪和其他大型野生动物。',
  },
  'braque-francais': {
    name: '法国布拉克犬',
    subtitle: '指示猎犬 / FCI第7组 · 纯种犬 · 法国最古老的指示犬品种——16世纪起源于布尔博讷地区，以其自然截断的尾巴而独特，一度濒临灭绝后在20世纪70年代重建',
    emoji: '🇫🇷',
    description: '法国布拉克犬（布尔博讷指示犬）是法国最古老的枪猎犬品种之一——一种体型紧凑、自然短尾的指示犬，其起源于布尔博讷地区中部法国，可追溯至至少16世纪。',
  },
  'wirehaired-slovak-pointer': {
    name: '有线毛斯洛伐克指示犬',
    subtitle: '指示猎犬 / FCI第7组 · 纯种犬 · 斯洛伐克现代开发的多功能猎犬——粗糙的金毛纹理，源自维兹拉犬和德国硬毛指示犬，以其耐用性和全能狩猎能力而闻名',
    emoji: '🌲',
    description: '有线毛斯洛伐克指示犬是20世纪中期在斯洛伐克开发的相对较新的犬种，是维兹拉犬和德国硬毛指示犬的杂交产物。该犬种设计用于在匈牙利平原和斯洛伐克森林中工作，是一种多功能的指示犬，既能在地面上工作，也能在水中工作。',
  },
  'hellenic-hound': {
    name: '地狱犬',
    subtitle: '嗅觉猎犬 / FCI第6组 · 纯种犬 · 希腊古老的国家犬种——一种中等大小的黑棕色嗅觉猎犬，起源于古老的希腊传统，直到20世纪末才得到国际认可',
    emoji: '🇬🇷',
    description: '地狱犬（希腊语中的埃莱尼科斯伊卡利犬）是希腊最古老的犬种之一，有着深厚的希腊狩猎传统。该犬种在希腊山地被开发用于追踪兔子、野猪和其他猎物，并因其卓越的嗅觉和对山地地形的适应性而受到珍视。',
  },
};

const tabTranslations = {
  profile: '资料',
  diet: '饮食与喂养',
  cost: '成本与价格',
  mixes: '混合犬',
  facts: '有趣事实',
};

const sectionTranslations = {
  'Overview': '概述',
  'Photo Gallery': '照片库',
  'Temperament & Personality': '性格与个性',
  'Exercise & Activity Needs': '运动与活动需求',
  'Grooming & Coat Care': '美容与毛发护理',
  'Training': '训练',
  'Health & Common Issues': '健康与常见问题',
  'Is a Transylvanian Hound Right for You?': '特兰西瓦尼亚猎犬是否适合您？',
  'Is a Polish Hound Right for You?': '波兰猎犬是否适合您？',
  'Is a Braque Français Right for You?': '法国布拉克犬是否适合您？',
  'Is a Wirehaired Slovak Pointer Right for You?': '有线毛斯洛伐克指示犬是否适合您？',
  'Is a Hellenic Hound Right for You?': '地狱犬是否适合您？',
  'Related Breeds': '相关犬种',
  'How Much to Feed': '喂食量',
  'Daily Portion Guide': '每日份量指南',
  'Best Foods': '最佳食物',
  'Dangerous Foods': '危险食物',
  'How Much Does a Transylvanian Hound Cost?': '特兰西瓦尼亚猎犬需要花多少钱？',
  'How Much Does a Polish Hound Cost?': '波兰猎犬需要花多少钱？',
  'How Much Does a Braque Français Cost?': '法国布拉克犬需要花多少钱？',
  'How Much Does a Wirehaired Slovak Pointer Cost?': '有线毛斯洛伐克指示犬需要花多少钱？',
  'How Much Does a Hellenic Hound Cost?': '地狱犬需要花多少钱？',
  'Monthly Cost': '月费',
  'Amazing Facts': '惊人事实',
  'At a Glance': '概览',
  'Breed Traits': '犬种特征',
  'Quick Facts': '快速事实',
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
    .replace(/name="description" content="[^"]*"/, `name="description" content="${translation.name}（${translation.emoji}）品种介绍：${translation.subtitle}FCI认可犬种。"`)
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
    .replace(/id="breedEmoji">\d*<\/span>/, `id="breedEmoji">${translation.emoji}</span>`)
    .replace(/localStorage\.setItem\('adf-lang','en'\);/, `localStorage.setItem('adf-lang','zh');`)
    .replace(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-C8QDN9HH5F"><\/script>/g,
      `<!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>`);

  // Add navigation localStorage if missing
  if (!zhContent.includes("localStorage.setItem('adf-lang','zh')")) {
    zhContent = zhContent.replace(
      /<script>window\.dataLayer/,
      `<script>localStorage.setItem('adf-lang','zh');window.dataLayer`
    );
  }

  // Ensure GA tracking
  if (!zhContent.includes('G-C8QDN9HH5F')) {
    zhContent = zhContent.replace(
      /<head>/,
      `<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8QDN9HH5F"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-C8QDN9HH5F');
  </script>`
    );
  }

  fs.writeFileSync(zhFile, zhContent, 'utf8');
  console.log(`✅ Created ${breedFile} (ZH)`);
  return true;
}

// Create all 5 Batch 9 Chinese breed pages
const batch9Breeds = [
  { file: 'transylvanian-hound.html', key: 'transylvanian-hound' },
  { file: 'polish-hound.html', key: 'polish-hound' },
  { file: 'braque-francais.html', key: 'braque-francais' },
  { file: 'wirehaired-slovak-pointer.html', key: 'wirehaired-slovak-pointer' },
  { file: 'hellenic-hound.html', key: 'hellenic-hound' },
];

console.log('🚀 Generating Batch 9 Chinese breed pages...\n');

let created = 0;
batch9Breeds.forEach(breed => {
  if (createChineseBreedPage(breed.file, breed.key)) {
    created++;
  }
});

console.log(`\n✨ Generated ${created} Chinese breed pages for Batch 9`);
