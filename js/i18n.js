/* AllDogFacts — Simplified Chinese (zh-CN) translations */
(function () {
  const DICT = {
    'Home': '首页',
    'Dog Breeds': '犬种大全',
    'Getting a Dog': '养狗入门',
    'Training': '训练指南',
    'Health': '健康',
    'Nutrition': '营养',
    'Grooming': '美容护理',
    'Free · Trusted · In-Depth': '免费 · 权威 · 深入',
    'The Complete': '完整的',
    'Dog Encyclopedia': '犬类百科全书',
    'Everything you need to know about dogs — breeds, training, health, nutrition, and more. Written for dog lovers, by dog lovers.': '关于狗狗的一切知识——犬种、训练、健康、营养等等。由爱狗人士，为爱狗人士撰写。',
    'Search': '搜索',
    'Popular:': '热门：',
    'Browse Topics': '浏览主题',
    'What Would You Like to Learn?': '您想了解什么？',
    'Choose a topic to explore our in-depth guides and articles.': '选择一个主题，探索我们的深度指南和文章。',
    'Profiles for 302 breeds — purebreds & hybrids — temperament, size, care, health, and more.': '收录302个犬种资料——纯种犬与混血犬——性格、体型、护理、健康等全方位介绍。',
    'Choosing a breed, adoption vs. breeder, puppy prep, first week home, and costs.': '选犬、领养与购买、幼犬准备、回家第一周及养犬费用。',
    'Basic commands, puppy training, leash manners, and fixing behavior problems.': '基础口令、幼犬训练、牵引绳礼仪及行为问题矫正。',
    'Common illnesses, what symptoms mean, vet visit guides, and preventive care.': '常见疾病、症状解读、就医指南及预防保健。',
    'Feeding guides by breed and age, best foods, toxic foods, and treats.': '按犬种和年龄的喂食指南、优质狗粮、有毒食物及零食推荐。',
    'At-home grooming tips, breed-specific coat care, and tool recommendations.': '居家美容技巧、犬种专属毛发护理及工具推荐。',
    '8 guides': '8篇指南',
    'Full guides': '完整指南',
    '12 guides': '12篇指南',
    '302 breeds': '302个犬种',
    'Explore Popular Breeds': '探索热门犬种',
    'Browse top purebreds and designer hybrids — 302 breeds in our full directory.': '浏览热门纯种犬和设计师混血犬——完整目录收录302个犬种。',
    'All Breeds': '全部犬种',
    'Purebred': '纯种犬',
    'Hybrid / Mix': '混血犬',
    'Hybrid': '混血犬',
    'Read full profile →': '查看完整资料 →',
    '#1 Most Popular': '#1 最受欢迎',
    '#2 Most Popular': '#2 最受欢迎',
    '#3 Most Popular': '#3 最受欢迎',
    '#4 Most Popular': '#4 最受欢迎',
    'Playful, adaptable, and full of personality. The #1 city dog in America.': '活泼、适应力强、个性十足。美国城市养犬榜第一名。',
    'Friendly, loyal, and endlessly energetic. America\'s beloved family dog.': '友好、忠诚、精力充沛。美国最受喜爱的家庭犬。',
    'Gentle, loving, and deeply loyal. One of the world\'s best family dogs.': '温柔、亲切、极度忠诚。世界最佳家庭犬之一。',
    'Intelligent, courageous, and devoted. The world\'s top working dog.': '聪明、勇敢、忠诚。全球顶尖工作犬。',
    'All Guides': '全部指南',
    'Beginner': '入门',
    'Intermediate': '进阶',
    'Advanced': '高级',
    'Professional': '专业',
    'Read Guide →': '阅读指南 →',
    'min read': '分钟阅读',
    'Health & Symptoms': '健康与症状',
    'Nutrition & Diet': '营养与饮食',
    'Health & Care': '健康与护理',
    'Quick Facts': '快速概览',
    'Overview': '简介',
    'History': '历史',
    'Temperament': '性格特点',
    'Training': '训练',
    'Feeding': '喂食',
    'Pros & Cons': '优缺点',
    'Size': '体型',
    'Weight': '体重',
    'Height': '身高',
    'Life Expectancy': '寿命',
    'Energy Level': '活力水平',
    'Good with Kids': '适合儿童',
    'Good with Other Dogs': '与其他犬相处',
    'Shedding': '掉毛程度',
    'Barking Level': '吠叫程度',
    'Easy to Train': '训练难度',
    'Table of Contents': '目录',
    'Key Takeaways': '核心要点',
    'Related Guides': '相关指南',
    'Related Breeds': '相关犬种',
    'Back to all breeds': '← 返回犬种列表',
    'Back to Breeds': '← 返回犬种页',
    '← Back to Breeds': '← 返回犬种页',
    '← Back to all breeds': '← 返回犬种列表',
    'Quick Links': '快速链接',
    'Topics': '主题',
    'About': '关于我们',
    'Contact': '联系我们',
    'Privacy Policy': '隐私政策',
    'Terms of Use': '使用条款',
    '© 2025 AllDogFacts. All rights reserved.': '© 2025 AllDogFacts. 版权所有。',
    '© 2024 AllDogFacts. All rights reserved.': '© 2024 AllDogFacts. 版权所有。',
    'View All': '查看全部',
    'See All Breeds': '查看全部犬种',
    'Learn More': '了解更多',
    'Read More': '阅读更多',
    'minute read': '分钟阅读',
    'minutes read': '分钟阅读',
  };

  const PLACEHOLDERS = {
    'Search breeds, training tips, health topics...': '搜索犬种、训练技巧、健康话题...',
    'Search guides...': '搜索指南...',
    'Search breeds...': '搜索犬种...',
    'Search...': '搜索...',
  };

  function translateNode(node) {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (DICT[trimmed] !== undefined) node.nodeValue = raw.replace(trimmed, DICT[trimmed]);
  }

  function walkText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') return NodeFilter.FILTER_REJECT;
        if (p.id === 'langToggle' || p.closest('#langToggle')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(translateNode);
  }

  function translatePlaceholders(root) {
    root.querySelectorAll('[placeholder]').forEach(el => {
      const p = el.getAttribute('placeholder');
      if (PLACEHOLDERS[p]) el.setAttribute('placeholder', PLACEHOLDERS[p]);
    });
  }

  window.i18n = {
    currentLang: localStorage.getItem('adf-lang') || 'en',
    apply(lang) {
      this.currentLang = lang;
      localStorage.setItem('adf-lang', lang);
      if (lang === 'zh') {
        walkText(document.body);
        translatePlaceholders(document.body);
        document.documentElement.lang = 'zh-CN';
      } else {
        document.documentElement.lang = 'en';
        location.reload();
      }
      const btn = document.getElementById('langToggle');
      if (btn) {
        btn.innerHTML = lang === 'zh' ? '<span class="lang-icon">🌐</span> EN' : '<span class="lang-icon">🌐</span> 中文';
        btn.title = lang === 'zh' ? 'Switch to English' : '切换为简体中文';
      }
    },
    init() {
      if (this.currentLang === 'zh') this.apply('zh');
    }
  };
})();
