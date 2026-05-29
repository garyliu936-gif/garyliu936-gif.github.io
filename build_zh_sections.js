/**
 * Generates Chinese section index pages for all 5 content sections.
 * Run: node build_zh_sections.js
 */
const fs = require('fs');
const path = require('path');

/* ── Guide title translations ─────────────────────────────────────────────── */
const TITLES = {
  // Training
  'Sit, Stay, Come — The Core 3': '坐下、等待、过来——三大核心口令',
  'Teaching "Down" and "Leave It"': '教授"趴下"与"放开"口令',
  'Door Manners & Jumping Up': '门口礼仪与阻止扑人',
  'Place and Off Command': '"去床"与"下去"口令训练',
  'First Week Home — Day by Day': '回家第一周——逐日指南',
  'Potty Training Your Puppy': '幼犬如厕训练',
  'Crate Training Step by Step': '狗笼训练步骤详解',
  'Puppy Biting & Mouthing': '幼犬咬人与啃咬行为矫正',
  'Socialization — The Critical Window': '社会化训练——关键时间窗口',
  'Stop Leash Pulling — For Good': '彻底解决牵绳拉拽问题',
  'Choosing the Right Harness or Collar': '如何选择适合的胸背带或项圈',
  'Excessive Barking': '过度吠叫的矫正方法',
  'Reactive Dog on Leash': '牵绳应激犬的训练方法',
  'Counter Surfing & Stealing Food': '阻止狗狗扒台偷食',
  'Separation Anxiety': '分离焦虑症的处理',
  'Mental Stimulation Games': '大脑刺激游戏',
  'Fun Tricks — 10 Impressive Commands': '有趣把戏——10个令人印象深刻的技能',
  'Off-Leash Recall Training': '离绳召回训练',
  'Nose Work & Scent Detection': '嗅探工作与气味侦测训练',
  'Agility Training from Zero': '从零开始的敏捷训练',
  'AKC Canine Good Citizen (CGC) Test': 'AKC优良公民（CGC）测试',
  'Competitive Obedience — AKC Trials': '竞技服从训练——AKC比赛',
  'Therapy Dog Certification': '治疗犬认证指南',
  'Service Dog Training — The Full Roadmap': '服务犬训练——完整路线图',
  // Health
  "What's Normal vs. What's Not": '正常与异常——如何判断狗狗健康',
  "Is My Dog Sick? — Symptom Checker": '我的狗狗生病了吗？——症状自查',
  'Limping and Joint Pain': '跛行与关节疼痛',
  'Vomiting & Diarrhea — When to Worry': '呕吐与腹泻——何时需要担心',
  'How to Brush Your Dog\'s Teeth': '如何给狗狗刷牙',
  'Best Dental Chews — What Actually Works': '最佳洁齿零食——真正有效的产品',
  'Signs of Dental Disease': '牙周病的早期迹象',
  'Fleas, Ticks & Heartworm Prevention': '跳蚤、蜱虫与心丝虫的预防',
  'Vaccination Schedule — Puppy to Adult': '疫苗接种时间表——从幼犬到成犬',
  'How Often Should I Take My Dog to the Vet?': '应该多久带狗狗去看兽医？',
  'Keeping Your Dog at a Healthy Weight': '保持狗狗健康体重',
  'Allergies in Dogs — Skin, Food & Environment': '犬类过敏——皮肤、食物与环境过敏',
  'Hip Dysplasia — Breeds, Signs & Options': '髋关节发育不良——犬种、症状与应对',
  'Kennel Cough — Causes & Treatment': '犬舍咳——病因与治疗',
  'Parvovirus — Prevention is Everything': '细小病毒——预防是关键',
  'Arthritis & Joint Pain in Older Dogs': '老年犬的关节炎与关节疼痛',
  'Canine Cognitive Dysfunction (Dog Dementia)': '犬认知功能障碍（犬类痴呆）',
  "When Is a Dog \"Senior\"?": '狗狗什么时候算"老年犬"？',
  // Nutrition
  'How to Choose the Best Dog Food': '如何选择最适合的狗粮',
  'Daily Feeding Guide by Dog Size': '按体型分类的每日喂食指南',
  'Puppy Feeding Guide — Week by Week': '幼犬喂食指南——按周详解',
  'Is My Dog Overweight? How to Tell & Fix It': '我的狗狗超重了吗？如何判断与改善',
  'Large Breed vs. Small Breed Food': '大型犬粮与小型犬粮的区别',
  'Safe Human Foods for Dogs': '狗狗可以吃的人类食物',
  'Foods That Are Toxic to Dogs': '对狗狗有毒的食物',
  'Best Dog Treats — Healthy vs. Harmful': '最佳狗狗零食——健康与有害的区别',
  'Dog Supplements — What Actually Works': '狗狗营养补充剂——真正有效的产品',
  'How to Switch Dog Food Without Stomach Upset': '如何在不引起肠胃不适的情况下换粮',
  // Grooming
  'How to Brush Your Dog — By Coat Type': '如何给狗狗梳毛——按毛发类型',
  'How Often Should You Bathe Your Dog?': '应该多久给狗狗洗澡一次？',
  'How to Bathe a Dog Who Hates Water': '如何给怕水的狗狗洗澡',
  'Best Dog Shampoos — By Coat Type': '最佳狗狗洗毛精——按毛发类型推荐',
  'How to Trim Dog Nails Without the Drama': '如何轻松给狗狗剪指甲',
  'Signs Your Dog\'s Nails Are Too Long': '狗狗指甲过长的迹象',
  'How to Clean Your Dog\'s Ears': '如何清洁狗狗耳朵',
  'Tear Stains — Causes & How to Remove Them': '泪痕——成因与去除方法',
  'Managing Shedding — Tips That Actually Work': '控制掉毛——真正有效的技巧',
  'When Does Your Dog Need a Haircut?': '狗狗什么时候需要修剪毛发？',
  'How to Find a Good Dog Groomer': '如何找到一位好的宠物美容师',
  'At-Home vs. Professional Grooming': '居家美容与专业美容的对比',
  // Getting a Dog
  'Best Dog Breeds for First-Time Owners': '最适合新手养的犬种',
  'Best Dog Breeds for Families with Kids': '最适合有孩子的家庭的犬种',
  'Best Dog Breeds for Apartments': '最适合公寓居住的犬种',
  'Adopting vs. Buying From a Breeder': '领养与向繁殖者购买的对比',
  'How to Find a Reputable Breeder': '如何找到信誉良好的犬只繁殖者',
  'The Real Cost of Owning a Dog': '养狗的真实费用',
  'New Puppy Checklist — Everything You Need': '新幼犬清单——您需要准备的一切',
  'Preparing Your Home for a Puppy': '为幼犬入住做好家庭准备',
};

/* ── Topic chip translations ─────────────────────────────────────────────── */
const TOPICS = {
  // Training
  'All Guides': '全部指南',
  'Basic Commands': '基础口令',
  'Puppy Training': '幼犬训练',
  'Leash &amp; Walking': '牵绳与散步',
  'Leash & Walking': '牵绳与散步',
  'Behavior Problems': '行为问题',
  'Advanced': '高级',
  'Professional': '专业',
  // Health
  'Symptoms': '症状',
  'Preventive Care': '预防保健',
  'Common Illnesses': '常见疾病',
  'Dental Health': '牙齿健康',
  'Senior Dogs': '老年犬',
  // Nutrition
  'Feeding Basics': '喂食基础',
  'Food Choices': '食物选择',
  'Special Diets': '特殊饮食',
  // Grooming
  'Coat Care': '毛发护理',
  'Bathing': '洗浴',
  'Nail & Ear Care': '指甲与耳朵护理',
  'Finding a Groomer': '寻找美容师',
  // Getting a Dog
  'Choosing a Breed': '选择犬种',
  'Adoption &amp; Breeders': '领养与繁育者',
  'Adoption & Breeders': '领养与繁育者',
  'Costs': '费用',
  'Preparing': '准备工作',
  // Level chips (used in training)
  'All': '全部',
  'Beginner': '入门',
  'Intermediate': '进阶',
};

/* ── Level badge text ────────────────────────────────────────────────────── */
const LEVELS = {
  'Beginner': '入门',
  'Intermediate': '进阶',
  'Advanced': '高级',
  'Professional': '专业',
  'Start Here': '从这里开始',
  'Read First': '先阅读此文',
  'Week 1': '第一周',
};

/* ── Topic badge color labels ────────────────────────────────────────────── */
const TOPIC_BADGES = {
  'Basic Commands': '基础口令',
  'Puppy Training': '幼犬训练',
  'Leash & Walking': '牵绳与散步',
  'Behavior Problems': '行为问题',
  'Symptoms': '症状',
  'Preventive Care': '预防保健',
  'Common Illnesses': '常见疾病',
  'Dental Health': '牙齿健康',
  'Senior Dogs': '老年犬',
  'Feeding Basics': '喂食基础',
  'Food Choices': '食物选择',
  'Special Diets': '特殊饮食',
  'Coat Care': '毛发护理',
  'Bathing': '洗浴',
  'Nail &amp; Ear Care': '指甲与耳朵护理',
  'Finding a Groomer': '寻找美容师',
  'Choosing a Breed': '选择犬种',
  'Adoption &amp; Breeders': '领养与繁育者',
  'Costs': '费用',
  'Preparing': '准备工作',
};

/* ── Section config ──────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    src: 'training/index.html',
    out: 'zh/training/index.html',
    enUrl: '/training/index.html',
    hreflang: '/zh/training/index.html',
    title: '狗狗训练指南——口令、幼犬技巧与行为指南 | AllDogFacts',
    desc: '完整的狗狗训练指南——基础口令、幼犬训练、牵绳礼仪、笼子训练及行为问题矫正。免费逐步指南。',
    hero: {
      tag: '免费逐步指南',
      h1: '狗狗<br /><span class="hero-highlight">训练</span>',
      p: '从基础口令到高级技能——为幼犬、新犬以及有坏习惯的狗狗提供逐步指南。全程正向强化训练。',
      placeholder: '搜索指南...（如 坐下、牵绳、吠叫）',
    },
    filterLabel: '主题：',
    levelLabel: '级别：',
    count: '24篇指南',
    banner: '您正在浏览中文训练指南',
  },
  {
    src: 'health/index.html',
    out: 'zh/health/index.html',
    enUrl: '/health/index.html',
    hreflang: '/zh/health/index.html',
    title: '狗狗健康——症状、预防保健与就医指南 | AllDogFacts',
    desc: '完整的狗狗健康指南——识别症状、预防保健、疫苗接种、常见疾病、牙齿健康、老年犬护理及就医时机。',
    hero: {
      tag: '权威狗狗健康资讯',
      h1: '狗狗<br /><span style="color:#86efac">健康</span>',
      p: '从幼犬疫苗到老年犬护理——了解正常状态，及早发现预警信号，明确何时需要联系兽医。',
      placeholder: '搜索指南...（如 呕吐、疫苗、牙齿）',
    },
    filterLabel: '主题：',
    levelLabel: null,
    count: '18篇指南',
    banner: '您正在浏览中文健康指南',
    emergencyZh: true,
  },
  {
    src: 'nutrition/index.html',
    out: 'zh/nutrition/index.html',
    enUrl: '/nutrition/index.html',
    hreflang: '/zh/nutrition/index.html',
    title: '狗狗营养——喂食指南、狗粮选择与饮食建议 | AllDogFacts',
    desc: '完整的狗狗营养指南——按犬种和年龄的喂食指南、优质狗粮选择、有毒食物及零食推荐。',
    hero: {
      tag: '权威营养资讯',
      h1: '狗狗<br /><span class="hero-highlight">营养</span>',
      p: '从幼犬喂食到老年犬特殊饮食——了解您的狗狗真正需要什么营养，避开常见饮食误区。',
      placeholder: '搜索指南...（如 狗粮、喂食、零食）',
    },
    filterLabel: '主题：',
    levelLabel: null,
    count: '10篇指南',
    banner: '您正在浏览中文营养指南',
  },
  {
    src: 'grooming/index.html',
    out: 'zh/grooming/index.html',
    enUrl: '/grooming/index.html',
    hreflang: '/zh/grooming/index.html',
    title: '狗狗美容——居家护理技巧与美容指南 | AllDogFacts',
    desc: '完整的狗狗美容指南——按毛发类型的梳理技巧、洗浴频率、指甲修剪、耳朵清洁及寻找美容师建议。',
    hero: {
      tag: '居家美容指南',
      h1: '狗狗<br /><span class="hero-highlight">美容</span>',
      p: '居家美容技巧、按犬种专属的毛发护理、工具推荐，以及何时该寻求专业美容师帮助。',
      placeholder: '搜索指南...（如 梳毛、洗澡、指甲）',
    },
    filterLabel: '主题：',
    levelLabel: null,
    count: '12篇指南',
    banner: '您正在浏览中文美容指南',
  },
  {
    src: 'getting-a-dog/index.html',
    out: 'zh/getting-a-dog/index.html',
    enUrl: '/getting-a-dog/index.html',
    hreflang: '/zh/getting-a-dog/index.html',
    title: '养狗入门——新手主人完整指南 | AllDogFacts',
    desc: '养狗前您需要了解的一切——找到适合您的犬种、了解真实费用、领养与购买的选择、如何为幼犬做好家庭准备。',
    hero: {
      tag: '完整主人指南',
      h1: '养狗<br /><span class="hero-highlight">入门</span>',
      p: '找到您的完美犬种、了解真实费用、选择领养还是购买、做好家庭准备——尽在此处。',
      placeholder: '搜索指南...（如 费用、犬种、幼犬）',
    },
    filterLabel: '主题：',
    levelLabel: null,
    count: '8篇指南',
    banner: '您正在浏览中文养狗入门指南',
  },
];

/* ── Core transform function ─────────────────────────────────────────────── */
function transform(src, cfg) {
  let html = fs.readFileSync(path.join(__dirname, src), 'utf8');

  // 1. Lang & meta
  html = html.replace('lang="en"', 'lang="zh-CN"');
  html = html.replace(/<title>.*?<\/title>/, `<title>${cfg.title}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${cfg.desc}" />`);

  // 2. Asset paths: ../ → ../../
  html = html.replace(/href="\.\.\/css\//g, 'href="../../css/');
  html = html.replace(/href="\.\.\/js\//g,  'href="../../js/');
  html = html.replace(/src="\.\.\/js\//g,   'src="../../js/');
  html = html.replace(/src="\.\.\/css\//g,  'src="../../css/');

  // 3. Nav
  html = html
    .replace(/>Home<\/a>/g, '>首页</a>')
    .replace(/>Dog Breeds<\/a>/g, '>犬种大全</a>')
    .replace(/>Getting a Dog<\/a>/g, '>养狗入门</a>')
    .replace(/>Training<\/a>/g, '>训练指南</a>')
    .replace(/>Health<\/a>/g, '>健康</a>')
    .replace(/>Nutrition<\/a>/g, '>营养</a>')
    .replace(/>Grooming<\/a>/g, '>美容护理</a>');

  // 4. Guide card hrefs — make absolute
  html = html.replace(/href="([a-z0-9-]+\.html)" class="gi-card"/g, (m, file) => {
    const section = src.split('/')[0];
    return `href="/${section}/${file}" class="gi-card"`;
  });

  // 5. Hero section
  html = html
    .replace(/<div class="si-hero-tag">.*?<\/div>/, `<div class="si-hero-tag">${cfg.hero.tag}</div>`)
    .replace(/<h1>.*?<\/h1>/s, `<h1>${cfg.hero.h1}</h1>`)
    .replace(/<p>.*?<\/p>(?=\s*<div class="si-search-wrap">)/, `<p>${cfg.hero.p}</p>`)
    .replace(/placeholder="Search guides\.[^"]*"/, `placeholder="${cfg.hero.placeholder}"`);

  // 6. Filter bar labels
  html = html
    .replace(/<span class="si-filter-label">Topic:<\/span>/g, `<span class="si-filter-label">${cfg.filterLabel}</span>`);
  if (cfg.levelLabel) {
    html = html.replace(/<span class="si-filter-label">Level:<\/span>/g,
      `<span class="si-filter-label">级别：</span>`);
  }

  // 7. Topic chips
  Object.entries(TOPICS).forEach(([en, zh]) => {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`>${escaped}<`, 'g'), `>${zh}<`);
  });

  // 8. Level/topic chips — inline button text
  html = html
    .replace(/data-value="all">All Guides</g,      'data-value="all">全部指南<')
    .replace(/data-value="all">All</g,              'data-value="all">全部<')
    .replace(/data-value="beginner">Beginner</g,    'data-value="beginner">入门<')
    .replace(/data-value="intermediate">Intermediate</g, 'data-value="intermediate">进阶<')
    .replace(/data-value="advanced">Advanced</g,    'data-value="advanced">高级<')
    .replace(/data-value="professional">Professional</g, 'data-value="professional">专业<');

  // 9. Results count
  const countRe = /<span class="si-results-count"[^>]*>[^<]*<\/span>/g;
  html = html.replace(countRe, m => m.replace(/>.*?</, `>${cfg.count}<`));

  // 10. Guide card titles (h3)
  Object.entries(TITLES).forEach(([en, zh]) => {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`<h3>${escaped}<\\/h3>`, 'g'), `<h3>${zh}</h3>`);
  });

  // 11. Topic badges inside cards (gi-topic spans)
  Object.entries(TOPIC_BADGES).forEach(([en, zh]) => {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`(class="gi-topic[^"]*">)${escaped}(<\\/span>)`, 'g'), `$1${zh}$2`);
  });

  // 12. Level badges inside cards
  Object.entries(LEVELS).forEach(([en, zh]) => {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`(class="gi-(?:level|start)[^"]*">)${escaped}(<\\/span>)`, 'g'), `$1${zh}$2`);
    // plain gi-start spans without class on level
    html = html.replace(new RegExp(`(<span class="gi-start">)${escaped}(<\\/span>)`, 'g'), `$1${zh}$2`);
  });

  // 13. Card footer link text
  html = html.replace(/Read guide <span>/g, '阅读指南 <span>');
  html = html.replace(/Read Guide <span>/g, '阅读指南 <span>');

  // 14. Health emergency section (Chinese)
  if (cfg.emergencyZh) {
    html = html
      .replace('>Emergency Warning Signs — Call Your Vet Immediately<', '>紧急预警信号——立即联系您的兽医<')
      .replace('>If your dog shows any of these symptoms, do not wait. Contact your vet or an emergency animal hospital right away.<',
        '>如果您的狗狗出现以下任何症状，请立即联系您的兽医或紧急动物医院，不要等待。<')
      .replace('>Difficulty Breathing<', '>呼吸困难<')
      .replace('>Gasping, blue-tinged gums, or labored breathing at rest<', '>喘息、牙龈发蓝或静息时呼吸费力<')
      .replace('>Bloated or Distended Belly<', '>腹部胀大或膨隆<')
      .replace('>Especially in large breeds — can be life-threatening bloat (GDV)<', '>尤其是大型犬——可能危及生命的胃扩张（GDV）<')
      .replace('>Seizures or Collapse<', '>癫痫发作或倒地<')
      .replace('>Any seizure lasting more than 2 minutes is a medical emergency<', '>任何持续超过2分钟的癫痫发作均属急症<')
      .replace('>Uncontrolled Bleeding<', '>无法控制的出血<')
      .replace('>Deep cuts, internal bleeding signs, or blood in vomit / stool<', '>深度割伤、内出血迹象，或呕吐物/粪便中带血<')
      .replace('>Repeated Vomiting or Diarrhea<', '>反复呕吐或腹泻<')
      .replace('>More than 2–3 times in a few hours, or with blood present<', '>数小时内超过2-3次，或伴有血迹<')
      .replace('>Loss of Consciousness<', '>意识丧失<')
      .replace('>Unresponsive, won\'t wake up, or extreme sudden weakness<', '>无反应、无法唤醒，或突然极度虚弱<')
      .replace('>Known Toxin Ingestion<', '>已知毒物摄入<')
      .replace('>Ate chocolate, grapes, xylitol, rat poison, or any medication<', '>误食巧克力、葡萄、木糖醇、鼠药或任何药物<')
      .replace('>Suspected Heatstroke<', '>疑似中暑<')
      .replace('>Excessive panting, drooling, stumbling — especially in hot weather<', '>过度喘气、流涎、步态不稳——尤其在高温天气<');
  }

  // 15. Footer
  html = html
    .replace(/>Your complete dog encyclopedia\.<\/p>/g, '>您的完整犬类百科全书。</p>')
    .replace(/>Quick Links</g, '>快速链接<')
    .replace(/>Privacy Policy</g, '>隐私政策<')
    .replace(/>Terms of Use</g, '>使用条款<')
    .replace(/© 202[45] AllDogFacts\. All rights reserved\./g, '© 2025 AllDogFacts. 版权所有。');

  // 16. Inject: set lang to zh, add hreflang, add banner
  html = html.replace(
    '</head>',
    `  <link rel="alternate" hreflang="en" href="${cfg.enUrl}" />
  <link rel="alternate" hreflang="zh-CN" href="${cfg.hreflang}" />
  <script>localStorage.setItem('adf-lang','zh');</script>
</head>`
  );

  const sectionName = src.split('/')[0];
  html = html.replace(
    '<section class="si-hero',
    `<div style="background:#0d9488;color:#fff;text-align:center;padding:8px 16px;font-size:.85rem">
    🌐 ${cfg.banner} · <a href="${cfg.enUrl}" style="color:#ccfbf1;text-decoration:underline">切换至英文版</a>
  </div>
  <section class="si-hero`
  );

  return html;
}

/* ── Build all sections ──────────────────────────────────────────────────── */
SECTIONS.forEach(cfg => {
  const html = transform(cfg.src, cfg);
  const outPath = path.join(__dirname, cfg.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✅ ${cfg.out} (${Math.round(html.length / 1024)} KB)`);
});

console.log('\nAll 5 Chinese section pages built.');
