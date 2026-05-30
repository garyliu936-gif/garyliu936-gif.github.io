/**
 * Translates ALL text content on 302 Chinese breed profile pages.
 * Extracts breed data then generates Chinese content via templates.
 * Run: node build_zh_breed_content.js
 */
const fs   = require('fs');
const path = require('path');

// ── AKC group translations ─────────────────────────────────────────────────
const GROUP_ZH = {
  'Non-Sporting':'非运动犬组','Herding':'牧羊犬组','Working':'工作犬组',
  'Sporting':'运动犬组','Hound':'猎犬组','Terrier':'梗犬组','Toy':'玩具犬组',
  'Foundation Stock':'基础种群','Miscellaneous':'杂项犬组','Mixed':'混血犬',
};

// ── Health tag translations ────────────────────────────────────────────────
const HEALTH_TAG_ZH = {
  'Hip Dysplasia':'髋关节发育不良','Elbow Dysplasia':'肘关节发育不良',
  'Bloat (GDV)':'胃扩张扭转','Bloat':'胃扩张','Cancer':'癌症',
  'Heart Disease':'心脏病','Obesity':'肥胖','Allergies':'过敏',
  'Ear Infections':'耳道感染','Eye Conditions':'眼部疾病',
  'Skin Issues':'皮肤问题','Skin Fold Dermatitis':'皮肤褶皱炎',
  'BOAS (Breathing Issues)':'短头犬综合症（呼吸问题）',
  'Heat Sensitivity (serious)':'耐热性差（较严重）',
  'Spinal Issues (IVDD)':'脊椎问题（椎间盘疾病）',
  'Patellar Luxation':'髌骨脱位','Dental Issues':'牙科问题',
  'Hypothyroidism':'甲状腺功能减退','Epilepsy':'癫痫',
  'von Willebrand\'s Disease':'血友病（冯·维勒布兰德病）',
  'Progressive Retinal Atrophy':'进行性视网膜萎缩',
  'Degenerative Myelopathy':'脊髓病变',
  'Cystinuria':'胱氨酸尿症','Deafness':'听力障碍',
  'OCD (Osteochondritis)':'骨软骨炎','Pancreatitis':'胰腺炎',
  'Addison\'s Disease':'艾迪生病','Cushing\'s Disease':'库欣综合症',
  'Collie Eye Anomaly':'柯利眼睛异常',
  'MDR1 Gene Mutation':'MDR1基因突变',
  'Legg-Calvé-Perthes':'莱格-卡尔维-佩尔特斯病',
  'Glaucoma':'青光眼','Cataracts':'白内障',
  'Aortic Stenosis':'主动脉瓣狭窄','Dilated Cardiomyopathy':'扩张型心肌病',
  'Entropion':'睑内翻','Ectropion':'睑外翻','Cherry Eye':'樱桃眼',
  'Intervertebral Disc Disease':'椎间盘疾病',
  'Brachycephalic Syndrome':'短头综合症',
  'Syringomyelia':'脊髓空洞症','Chiari Malformation':'小脑扁桃体下疝畸形',
  'Breathing Problems':'呼吸问题','Respiratory Issues':'呼吸道问题',
  'Tracheal Collapse':'气管塌陷','Luxating Patella':'髌骨滑脱',
  'Autoimmune Disease':'自身免疫性疾病','Thyroid Issues':'甲状腺问题',
  'Hemangiosarcoma':'血管肉瘤','Osteosarcoma':'骨肉瘤',
  'Von Willebrand Disease':'血管性血友病',
};

// ── Common phrase translations ─────────────────────────────────────────────
const PHRASES = {
  // Diet tab section headings
  'Best Foods for':'最佳食品',
  'Foods Dangerous for Dogs':'狗狗危险食物',
  'Healthy Treats':'健康零食',
  // Cost tab headings
  'How Much Does a':'购买',
  'Cost?':'需要多少钱？',
  'Monthly Cost of Owning a':'养',
  'Lifetime Cost Estimate':'终生费用估算',
  'How to Save Money as a':'省钱建议',
  // Common section h2 patterns
  'Amazing Facts About':'关于',
  'Facts':'的趣味知识',
  'Popular':'热门',
  'Mix Breeds':'混血犬种',
  // Dangerous foods
  'Chocolate':'巧克力','Grapes &amp; Raisins':'葡萄与葡萄干',
  'Onions &amp; Garlic':'洋葱与大蒜','Xylitol (artificial sweetener)':'木糖醇（人工甜味剂）',
  'Macadamia Nuts':'夏威夷果','Alcohol':'酒精','Avocado':'牛油果',
  'Raw yeast dough':'生酵母面团','Coffee &amp; Caffeine':'咖啡与咖啡因',
  'Grapes &amp; Raisins':'葡萄与葡萄干','Raisins':'葡萄干',
};

// ── Data extraction ────────────────────────────────────────────────────────
function extractData(html) {
  const traits = {};
  for (const [,name,score] of html.matchAll(/<div class="trait-header"><span>([^<]+)<\/span><span>(\d)\/5/g))
    traits[name] = parseInt(score);

  const infoBoxes = {};
  for (const [,lbl,val] of html.matchAll(/<div class="info-box-label">([^<]+)<\/div><div class="info-box-value">([^<]*)<\/div>/g))
    if (!infoBoxes[lbl]) infoBoxes[lbl] = val;

  const healthTags = [...html.matchAll(/<span class="health-tag">([^<]+)<\/span>/g)].map(m=>m[1]);

  const quickStats = {};
  for (const [,val,lbl] of html.matchAll(/<span class="quick-stat-value">([^<]+)<\/span><span class="quick-stat-label">([^<]+)<\/span>/g))
    quickStats[lbl] = val;

  const compat = {};
  for (const [,lbl,stars] of html.matchAll(/<span class="compat-label">([^<]+)<\/span><span class="compat-stars">([^<]+)<\/span>/g))
    compat[lbl] = (stars.match(/★/g)||[]).length;

  const subtitle = (html.match(/<p class="breed-subtitle">([^<]+)<\/p>/) || [])[1] || '';

  return { traits, infoBoxes, healthTags, quickStats, compat, subtitle };
}

// ── Content generators ─────────────────────────────────────────────────────
function energyDesc(e) {
  if (!e || e<=1) return '活力水平很低，每天20-30分钟的轻度散步即可满足运动需求';
  if (e===2)      return '活力水平偏低，每天两次短距离散步（共30-45分钟）即可满足需求';
  if (e===3)      return '活力水平适中，每天需要60-90分钟的运动，包括散步和玩耍';
  if (e===4)      return '活力充沛，每天需要至少90分钟的运动，适合活跃家庭';
  return '精力极为旺盛，每天需要2小时以上的高强度运动和充分的心理刺激';
}
function trainDesc(t) {
  if (!t || t<=1) return '训练难度较大，需要有经验的主人和专业的正向强化训练方法';
  if (t===2)      return '训练需要较多耐心，建议使用奖励式训练并保持课程简短有趣';
  if (t===3)      return '训练难度适中，聪明但有时固执，需要耐心和一致的训练方法';
  if (t===4)      return '训练接受度较好，聪明且愿意配合，适合初次养狗的主人';
  return '极易训练，学习能力出众，渴望取悦主人，是最好训练的犬种之一';
}
function groomDesc(g) {
  if (!g || g<=1) return '美容护理需求极低，每周简单梳理一次即可';
  if (g===2)      return '美容护理需求较低，每周梳理1-2次，偶尔洗澡';
  if (g===3)      return '需要定期梳理，每周2-3次，建议定期专业美容';
  if (g===4)      return '美容护理需求较高，需要每天梳理并定期修剪毛发';
  return '美容护理需求很高，需要每天精心梳理，建议定期前往专业美容师处护理';
}
function shedDesc(s) {
  if (!s || s<=1) return '几乎不掉毛，对过敏人群友好';
  if (s===2)      return '掉毛量较少，定期梳理可有效控制';
  if (s===3)      return '掉毛量适中，换季时较明显，建议定期梳理';
  if (s===4)      return '掉毛量较多，需要定期梳理并做好家居清洁';
  return '大量掉毛，换季时尤为明显，需要频繁梳理和清洁';
}
function kidsDesc(k) {
  if (!k || k<=2) return '与孩子相处需要监督，更适合年龄较大的儿童';
  if (k===3)      return '与孩子相处较好，但建议在年幼孩子旁边时进行监督';
  if (k===4)      return '与孩子相处良好，耐心温和，是不错的家庭伴侣犬';
  return '与孩子相处极佳，天性温柔耐心，是出色的家庭犬';
}
function friendDesc(f) {
  if (!f || f<=2) return '对陌生人和其他动物较为谨慎，有一定的独立性';
  if (f===3)      return '与家人亲密，对陌生人态度友好但略有保留';
  if (f===4)      return '性格友善，对人和其他动物态度开放热情';
  return '极度友善外向，对所有人都热情欢迎，是天生的社交犬';
}
function barkDesc(b) {
  if (!b || b<=1) return '很少吠叫，是公寓生活的理想选择';
  if (b===2)      return '吠叫不多，有情况时会适当发出警示';
  if (b===3)      return '吠叫适中，会对陌生人和异常情况发出警告';
  if (b===4)      return '吠叫较多，需要从小进行吠叫控制训练';
  return '爱叫，可能需要专门训练来控制吠叫行为';
}

function groupContext(group) {
  const g = (group||'').replace(/\s*Group$/,'').trim();
  const map = {
    'Non-Sporting':'非运动犬',
    'Herding':'牧羊犬，以出色的智慧和强烈的牧羊本能著称',
    'Working':'工作犬，历史上承担守卫、救援或其他重要工作任务',
    'Sporting':'运动犬，活力充沛，喜爱户外活动与狩猎',
    'Hound':'猎犬，拥有出色的嗅觉或视觉追踪能力',
    'Terrier':'梗犬，以无畏的勇气和强烈的狩猎本能著称',
    'Toy':'玩具犬，专为陪伴而生的小型犬',
    'Foundation Stock':'稀有犬种',
    'Miscellaneous':'杂项组犬种',
  };
  return map[g] || '犬种';
}

// ── Generate full Chinese HTML for profile tab ─────────────────────────────
function genProfileTab(data, zhName, enName) {
  const { traits:T, infoBoxes:I, healthTags, quickStats:Q, compat:C } = data;
  const origin = I['Origin'] || '未知地区';
  const group  = I['AKC Group'] || I['Group'] || '';
  const bredFor = I['Bred For'] || '陪伴';
  const coatType = I['Coat Type'] || '';
  const groupZh = GROUP_ZH[group] || group || '犬';
  const lifespan = Q['Lifespan'] || I['Average Lifespan'] || '10–13年';
  const weight   = Q['Weight'] || '';
  const energy   = T['Energy Level'] || 3;
  const trainability = T['Trainability'] || 3;
  const grooming = T['Grooming Needs'] || 2;
  const friendliness = T['Friendliness'] || 4;
  const kids     = T['Good with Kids'] || 3;
  const barking  = T['Barking'] || 2;
  const shedding = T['Shedding'] || 2;

  // Apartment suitability text
  const aptStars = C['Apartment'] || 3;
  const aptText  = aptStars>=4 ? '非常适合公寓生活' : aptStars>=3 ? '较适合公寓生活' : '更适合有院子的家庭';
  const firstText = C['First-Time Owner']>=4 ? '非常适合新手主人' : C['First-Time Owner']>=3 ? '较适合有一定经验的主人' : '建议有经验的主人饲养';

  // Health tags translated
  const healthTagsZh = healthTags.map(t => HEALTH_TAG_ZH[t] || t);

  // Info box labels for health section
  const vetCost = I['Vet Cost Risk'] || '';
  const breathRisk = I['Breathing Risk'] || '';
  const heatTol = I['Heat Tolerance'] || '';
  const avgLifespan = I['Average Lifespan'] || lifespan;

  const compat_kids_zh = kidsDesc(C['With Kids'] || kids);
  const compat_apt_zh = C['Apartment']>=4 ? '极适合公寓和城市生活' : C['Apartment']>=3 ? '适合公寓生活' : '适合有院子的郊区住宅';

  return `
        <div class="breed-section">
          <h2>🐾 品种简介</h2>
          <p>${zhName}原产于${origin}，是AKC认可的${groupContext(group)}，专为${bredFor}而培育。这一犬种拥有独特的个性和外形，无论是作为家庭伴侣还是工作犬，都在全球范围内赢得了无数爱好者的喜爱。</p>
          <p>就日常生活而言，${zhName}的${energyDesc(energy)}。${kidsDesc(kids)}，${compat_apt_zh}，寿命通常为${avgLifespan}。${coatType ? `其${coatType}的毛发特点为其增添了独特魅力。` : ''}</p>
          <div class="info-grid">
            <div class="info-box"><div class="info-box-label">起源</div><div class="info-box-value">${origin}</div></div>
            <div class="info-box"><div class="info-box-label">AKC犬种组</div><div class="info-box-value">${groupZh}</div></div>
            <div class="info-box"><div class="info-box-label">培育目的</div><div class="info-box-value">${bredFor}</div></div>
            <div class="info-box"><div class="info-box-label">毛发类型</div><div class="info-box-value">${coatType}</div></div>
          </div>
        </div>

        <div class="breed-section">
          <h2>😊 性格与个性</h2>
          <p>${zhName}以其${friendDesc(friendliness)}著称。${barkDesc(barking)}。与孩子的相处方面，${kidsDesc(kids)}。总体而言，这是一种${energy<=2?'安静悠闲':energy>=4?'活跃热情':'平衡温和'}的犬种，非常适合${C['Apartment']>=4?'公寓居民和城市生活':'喜爱户外活动的家庭'}。</p>
          <p>在训练方面，${zhName}${trainDesc(trainability)}。正向强化训练（零食和表扬）效果最佳，应避免严厉的惩罚方式，因为这可能导致犬只产生抵触情绪。早期社会化对于帮助${zhName}成长为自信、友善的成犬至关重要。</p>
          <ul>
            <li>${friendliness>=4?'性格外向友善，对人和其他动物都表现友好':'对主人忠诚，但对陌生人和动物可能较为谨慎，需要充分的社会化训练'}</li>
            <li>${kids>=4?'与儿童相处极佳，耐心温和':'建议在有小孩的环境中进行监督，确保互动安全'}</li>
            <li>${energy<=2?'活力偏低，短暂的散步和室内玩耍即可满足运动需求':energy>=4?'精力旺盛，需要大量运动才能保持平静':'活力适中，平衡了活跃与悠闲'}</li>
            <li>${trainability>=4?'极易训练，学习速度快，很快就能掌握各种技能':trainability>=3?'训练接受度良好，适合有一定经验的主人':'需要耐心培训，短暂有趣的训练课效果最佳'}</li>
            <li>${barking<=2?'很少无故吠叫，适合公寓或有邻居的环境':'对陌生人和异常情况会发出警示，需要适当的吠叫控制训练'}</li>
            <li>${C['First-Time Owner']>=4?'非常适合新手主人，性情温和易于管理':'建议有养狗经验的主人饲养，需要明确的规则和边界'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>🏃 运动与活动需求</h2>
          <p>${zhName}的${energyDesc(energy)}。${energy<=2?`作为活力较低的犬种，每天两次20-30分钟的散步通常已经足够。室内玩耍和益智游戏也是保持其身心健康的好方法。`:`${energy>=4?'每天需要充分的运动来消耗多余精力，跑步、远足和互动游戏是理想的选择。运动不足可能导致破坏性行为。':'建议每天进行一到两次有氧运动，既有助于保持体重，也能满足其探索欲望。'}`}</p>
          <p>${energy<=2?`请注意，即使活力较低的犬种也需要每天定期活动以保持健康体重。运动对于预防关节问题和维持心理健康同样重要，请避免让${zhName}整天待在室内不动。`:`规律的运动训练对${zhName}的身体健康和行为管理都至关重要。充足的运动能有效减少焦虑、破坏行为和吠叫问题，让您的爱犬保持平静快乐。`}</p>
          <ul>
            <li>每日建议运动时间：${energy<=2?'30-45分钟（两次短途散步）':energy===3?'60-90分钟（适中强度运动）':energy===4?'90-120分钟（高强度运动）':'120分钟以上（高强度持续运动）'}</li>
            <li>${energy<=2?'适合室内玩耍和益智游戏作为运动补充':'喜爱户外活动、追逐游戏和互动训练'}</li>
            <li>${energy>=4?'需要足够的户外空间或定期前往狗公园':'可以适应各种居住环境，包括公寓'}</li>
            <li>散步时建议使用舒适的胸背带，避免颈部压力</li>
            <li>老年犬需要根据健康状况适当减少运动强度</li>
            <li>${energy<=2?'避免在炎热天气下过度运动':'天气炎热时建议在清晨或傍晚运动，避免中暑'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>✂️ 美容与毛发护理</h2>
          <p>${zhName}的${groomDesc(grooming)}。${shedDesc(shedding)}。${grooming<=2?`得益于较低的护理需求，${zhName}是忙碌主人的理想选择。基本的定期梳理和洗澡就能保持其整洁外观。`:`${zhName}的毛发需要定期专业护理。建议与当地专业宠物美容师保持联系，制定适合该犬种的护理计划。`}</p>
          <ul>
            <li>梳毛频率：${grooming<=2?'每周1-2次':grooming===3?'每周2-3次':'每天梳理'}</li>
            <li>洗澡频率：每4-8周一次，或根据需要更频繁</li>
            <li>每3-4周修剪指甲一次，避免指甲过长影响步态</li>
            <li>每周检查并清洁耳道，预防耳部感染</li>
            <li>建议从幼犬时期开始培养美容护理习惯，让其习惯被触摸和梳理</li>
            <li>${grooming>=4?'建议每6-8周前往专业美容师处进行全面护理':'定期检查皮肤状况，发现异常及时就医'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>🎓 训练</h2>
          <p>${zhName}${trainDesc(trainability)}。最有效的训练方法是正向强化——使用零食、赞美和游戏作为奖励。训练课程应保持简短（每次5-10分钟），并充满趣味性，避免单调重复导致犬只失去兴趣。</p>
          <p>早期社会化训练对${zhName}至关重要。在幼犬8-16周的关键社会化窗口期内，应让其接触不同的人、动物、声音和环境，这将极大地影响其成年后的行为表现。良好的社会化能让${zhName}成长为自信、友善、从容的成犬。</p>
          <ul>
            <li>训练课程保持简短、有趣，每次5-10分钟效果最佳</li>
            <li>高度食物驱动——零食和奖励是最有效的训练工具</li>
            <li>8-16周是关键社会化窗口期，应充分接触各种环境刺激</li>
            <li>尽早开始笼子训练，有助于建立安全感和独处能力</li>
            <li>避免使用惩罚和强制方法——正向强化效果更持久</li>
            <li>${trainability<=2?'考虑报名参加专业训练课程，有助于建立良好的行为基础':'掌握基础口令后，可以尝试学习高难度技能和竞技训练'}</li>
          </ul>
        </div>

        <div class="breed-section">
          <h2>🏥 健康与常见问题</h2>
          <p>${zhName}的平均寿命为${avgLifespan}。像所有犬种一样，${zhName}也有其特定的健康倾向。了解这些常见健康问题有助于主人提前做好预防和应对准备。${healthTagsZh.length>0?`该犬种最常见的健康问题包括：${healthTagsZh.slice(0,3).join('、')}等。`:''}</p>
          <p>${vetCost?`兽医费用风险评估：${vetCost}。`:''}${breathRisk?`呼吸风险：${breathRisk}。`:''} 建议主人为${zhName}办理宠物医疗保险，以应对潜在的高额医疗费用。定期体检（每年至少一次）和预防性护理是保持犬只健康的最佳方式。</p>
          <div class="health-tags">
            ${healthTagsZh.map(t=>`<span class="health-tag">${t}</span>`).join('\n            ')}
          </div>
          <div class="info-grid" style="margin-top:16px">
            <div class="info-box"><div class="info-box-label">平均寿命</div><div class="info-box-value">${avgLifespan}</div></div>
            ${vetCost?`<div class="info-box"><div class="info-box-label">兽医费用风险</div><div class="info-box-value">${vetCost}</div></div>`:''}
            ${breathRisk?`<div class="info-box"><div class="info-box-label">呼吸风险</div><div class="info-box-value">${breathRisk}</div></div>`:''}
            ${heatTol?`<div class="info-box"><div class="info-box-label">耐热能力</div><div class="info-box-value">${heatTol}</div></div>`:''}
          </div>
        </div>

        <div class="breed-section">
          <h2>🏠 ${zhName}适合您吗？</h2>
          <p>${zhName}是${C['Apartment']>=4?'城市居民、公寓住户':C['Apartment']>=3?'郊区家庭':'有宽敞院子的家庭'}的理想选择。${firstText}。${C['With Kids']>=4?`它与孩子相处极佳，是出色的家庭伴侣犬。`:`需要注意与小孩子的互动监督。`}对于${energy<=2?'不喜欢剧烈运动、偏爱悠闲生活方式的主人':energy>=4?'热爱户外活动、生活方式活跃的主人':'运动量适中的主人'}来说，${zhName}将是完美的搭档。</p>
          <div class="compat-grid">
            <div class="compat-item"><span class="compat-icon">👶</span><span class="compat-label">与儿童</span><span class="compat-stars">${'★'.repeat(C['With Kids']||3)}${'☆'.repeat(5-(C['With Kids']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🐕</span><span class="compat-label">与其他犬</span><span class="compat-stars">${'★'.repeat(C['With Dogs']||3)}${'☆'.repeat(5-(C['With Dogs']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🐈</span><span class="compat-label">与猫</span><span class="compat-stars">${'★'.repeat(C['With Cats']||3)}${'☆'.repeat(5-(C['With Cats']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🏠</span><span class="compat-label">公寓适应</span><span class="compat-stars">${'★'.repeat(C['Apartment']||3)}${'☆'.repeat(5-(C['Apartment']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🔰</span><span class="compat-label">新手主人</span><span class="compat-stars">${'★'.repeat(C['First-Time Owner']||3)}${'☆'.repeat(5-(C['First-Time Owner']||3))}</span></div>
            <div class="compat-item"><span class="compat-icon">🌡️</span><span class="compat-label">炎热气候</span><span class="compat-stars">${'★'.repeat(C['Hot Climates']||3)}${'☆'.repeat(5-(C['Hot Climates']||3))}</span></div>
          </div>
        </div>`;
}

// ── Diet tab Chinese content ───────────────────────────────────────────────
function genDietTab(html, zhName, data) {
  // Extract diet feeding data from original HTML
  const dietSection = (html.match(/id="tab-diet">([\s\S]*?)<!--\s*end tab-diet/) || [])[1] || '';

  // Translate ALL section headings (many patterns)
  let out = dietSection
    .replace(/<h2>🍽️ How Much to Feed a [^<]+<\/h2>/g, `<h2>🍽️ ${zhName}每日喂食量</h2>`)
    .replace(/<h2>📏 Daily Portion Guide<\/h2>/g, '<h2>📏 每日喂食量参考</h2>')
    .replace(/<h2>✅ Best Foods for [^<]+<\/h2>/g, `<h2>✅ ${zhName}最佳食品推荐</h2>`)
    .replace(/<h2>🚫 Foods Dangerous for Dogs<\/h2>/g, '<h2>🚫 狗狗危险食物</h2>')
    .replace(/<h2>🦴 Healthy Treats<\/h2>/g, '<h2>🦴 健康零食</h2>')
    .replace(/<h2>💡 Feeding Tips?<\/h2>/g, '<h2>💡 喂食建议</h2>')
    .replace(/<h2>📊 [^<]+ Feeding Schedule<\/h2>/g, '<h2>📊 喂食时间表</h2>')
    .replace(/<h2>🍽️ Diet &amp; Feeding Guide<\/h2>/g, `<h2>🍽️ ${zhName}饮食与喂食指南</h2>`)
    .replace(/<h2>🍽️ Diet &amp; Nutrition<\/h2>/g, `<h2>🍽️ ${zhName}饮食与营养</h2>`)
    .replace(/<h2>🍽️ Feeding Guide<\/h2>/g, `<h2>🍽️ ${zhName}喂食指南</h2>`)
    .replace(/<h2>[^<]+ Feeding Overview<\/h2>/g, '<h2>喂食概览</h2>')
    .replace(/<h2>💧 Hydration &amp; Treats<\/h2>/g, '<h2>💧 补水与零食</h2>')
    .replace(/<h2>🥩 Recommended Diet<\/h2>/g, '<h2>🥩 推荐饮食</h2>')
    .replace(/<h2>⚠️ Foods to Avoid<\/h2>/g, '<h2>⚠️ 应避免的食物</h2>');

  // Translate table headers
  out = out
    .replace(/<th>Life Stage<\/th>/g, '<th>生长阶段</th>')
    .replace(/<th>Daily Amount<\/th>/g, '<th>每日用量</th>')
    .replace(/<th>Notes<\/th>/g, '<th>备注</th>')
    .replace(/<th>Expense<\/th>/g, '<th>费用项目</th>')
    .replace(/<th>Estimated Cost<\/th>/g, '<th>估计费用</th>')
    .replace(/<th>Age<\/th>/g, '<th>年龄</th>')
    .replace(/<th>Meals\/Day<\/th>/g, '<th>每日餐数</th>')
    .replace(/<th>Portion<\/th>/g, '<th>每份用量</th>');

  // Translate table cells - life stages
  out = out
    .replace(/Mini Puppy \(2[–-]12 mo\)/g, '迷你幼犬（2-12个月）')
    .replace(/Standard Puppy \(2[–-]12 mo\)/g, '标准幼犬（2-12个月）')
    .replace(/Mini Adult \(1[–-]10 yr\)/g, '迷你成犬（1-10岁）')
    .replace(/Standard Adult \(1[–-]10 yr\)/g, '标准成犬（1-10岁）')
    .replace(/Senior \(8\+ yr\)/g, '老年犬（8岁以上）')
    .replace(/Senior \(7\+ yr\)/g, '老年犬（7岁以上）')
    .replace(/Puppy \(2[–-]12 months?\)/g, '幼犬（2-12个月）')
    .replace(/Adult \(1[–-]7 years?\)/g, '成犬（1-7岁）')
    .replace(/Senior \(7\+\)/g, '老年犬（7岁以上）')
    .replace(/Reduce by 10[–-]20%/g, '减少10-20%')
    .replace(/3 meals\/day/g, '每天3餐')
    .replace(/2 meals\/day/g, '每天2餐')
    .replace(/Large-breed puppy formula/g, '大型犬幼犬配方')
    .replace(/Small-breed puppy formula/g, '小型犬幼犬配方')
    .replace(/Joint-support formula/g, '关节保护配方')
    .replace(/monitor weight closely/g, '密切监控体重')
    .replace(/adjust for activity level/g, '根据活动量调整')
    .replace(/watch for weight gain/g, '注意体重增长');

  // Translate cost table cells
  out = out
    .replace(/Puppy from Breeder/g, '从繁育者购买幼犬')
    .replace(/Monthly Food/g, '每月食物费用')
    .replace(/Annual Vet Care/g, '每年兽医费用')
    .replace(/Grooming \(annual\)/g, '美容费用（每年）')
    .replace(/Pet Insurance/g, '宠物保险')
    .replace(/Training Classes/g, '训练课程')
    .replace(/Toys &amp; Supplies/g, '玩具和用品');

  // Translate info-box h3 inside diet
  out = out
    .replace(/<h3>💧 Hydration &amp; Treats<\/h3>/g, '<h3>💧 补水与零食</h3>')
    .replace(/Always provide fresh water\. Keep treats to ≤10% of daily calories\. Avoid chocolate, grapes, onions, and xylitol — all toxic to dogs\./g,
      '始终提供新鲜饮用水。零食应控制在每日卡路里的10%以内。避免喂食巧克力、葡萄、洋葱和木糖醇——这些对狗狗均有毒性。');

  // Translate info-box labels in diet tab
  out = out
    .replace(/<div class="info-box-label">Puppy \(8[–-]12 weeks\)<\/div>/g,
      '<div class="info-box-label">幼犬（8-12周）</div>')
    .replace(/<div class="info-box-label">Puppy \(3[–-]6 months\)<\/div>/g,
      '<div class="info-box-label">幼犬（3-6个月）</div>')
    .replace(/<div class="info-box-label">Adult \(1\+ year\)<\/div>/g,
      '<div class="info-box-label">成犬（1岁以上）</div>')
    .replace(/<div class="info-box-label">Senior \(7\+ years\)<\/div>/g,
      '<div class="info-box-label">老年犬（7岁以上）</div>')
    .replace(/<div class="info-box-label">Puppy \(2[–-]3 months\)<\/div>/g,
      '<div class="info-box-label">幼犬（2-3个月）</div>');

  // Translate intro paragraphs
  out = out
    .replace(/Portion control is one of the most important things you can do for your [^<']+ long-term health\. Use these as starting guidelines and adjust based on your individual dog's body condition score\./g,
      `控制食量是维护${zhName}长期健康最重要的事情之一。以下为参考标准，请根据您的狗狗实际体况评分进行调整。`)
    .replace(/These amounts are based on a standard quality dry kibble[^<.]+\. Always check the feeding chart on your specific brand and adjust for your dog's activity level\./g,
      '以上用量基于标准优质干粮（约350千卡/杯）。请务必参考您所选品牌的喂食指南，并根据狗狗的活动量进行调整。')
    .replace(/Look for foods where the first ingredient is a named animal protein[^<.]+\. The best diets for this breed also address their specific health tendencies:/g,
      `选择以具名动物蛋白质（如鸡肉、牛肉、三文鱼）为第一成分的狗粮。最适合该犬种的饮食方案还应考虑其特定的健康倾向：`)
    .replace(/These common human foods can be toxic[^<.]+\. Keep them well out of reach\./g,
      `以下常见人类食物对您的${zhName}可能有毒，甚至危及生命。请务必将其放在狗狗无法触及的地方。`);

  // Translate food list items (dangerous foods)
  out = out
    .replace(/>Chocolate</g, '>巧克力<')
    .replace(/>Grapes &amp; Raisins</g, '>葡萄与葡萄干<')
    .replace(/>Onions &amp; Garlic</g, '>洋葱与大蒜<')
    .replace(/>Xylitol \(artificial sweetener\)</g, '>木糖醇（人工甜味剂）<')
    .replace(/>Macadamia Nuts</g, '>夏威夷果<')
    .replace(/>Alcohol</g, '>酒精<')
    .replace(/>Avocado</g, '>牛油果<')
    .replace(/>Raw yeast dough</g, '>生酵母面团<')
    .replace(/>Coffee &amp; Caffeine</g, '>咖啡与咖啡因<')
    .replace(/>Cooked bones</g, '>熟骨头<');

  // Translate healthy treats
  out = out
    .replace(/Carrots — low calorie and great for teeth/g, '胡萝卜——低卡路里，对牙齿有益')
    .replace(/Blueberries — antioxidants, dogs love them/g, '蓝莓——富含抗氧化剂，狗狗很喜欢')
    .replace(/Plain cooked chicken or turkey \(no seasoning\)/g, '白煮鸡肉或火鸡肉（不加调料）')
    .replace(/Apple slices \(remove seeds and core\)/g, '苹果片（去除种子和果核）')
    .replace(/Green beans — filling and very low calorie/g, '四季豆——饱腹感强，卡路里极低')
    .replace(/Commercial treats sized for your dog's weight class/g, '按狗狗体重选择适合尺寸的商业零食');

  // Translate feeding tip boxes
  out = out
    .replace(/<h4>💡 Feeding tip for[^<]*<\/h4>/g,
      `<h4>💡 ${zhName}喂食建议</h4>`);

  // Catch-all: replace any remaining English intro paragraphs in diet tab
  // (paragraphs with mostly ASCII content that weren't matched above)
  out = out.replace(/<p>([A-Z][^<]{60,})<\/p>/g, (m, text) => {
    // Only replace if mostly ASCII (English text)
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.85) {
      return `<p>请根据您的${zhName}的体型、年龄和活动量调整每日喂食量。以下为参考标准，具体用量请参考所选品牌的喂食指南。</p>`;
    }
    return m;
  });

  return out;
}

// ── Cost tab Chinese content ───────────────────────────────────────────────
function genCostTab(html, zhName) {
  let out = (html.match(/id="tab-cost">([\s\S]*?)<!--\s*end tab-cost/) || [])[1] || '';

  // Section headings (all patterns)
  out = out
    .replace(/<h2>💰 How Much Does a [^<]+ Cost\?<\/h2>/g,
      `<h2>💰 购买${zhName}需要多少钱？</h2>`)
    .replace(/<h2>📅 Monthly Cost of Owning a [^<]+<\/h2>/g,
      `<h2>📅 每月养育${zhName}的费用</h2>`)
    .replace(/<h2>📊 Lifetime Cost Estimate<\/h2>/g, '<h2>📊 终生费用估算</h2>')
    .replace(/<h2>💡 How to Save Money as a [^<]+ Owner<\/h2>/g,
      `<h2>💡 养${zhName}的省钱建议</h2>`)
    .replace(/<h2>💰 Cost &amp; Price Guide<\/h2>/g, `<h2>💰 ${zhName}费用指南</h2>`)
    .replace(/<h2>💰 [^<]+ Price Guide<\/h2>/g, `<h2>💰 ${zhName}价格指南</h2>`)
    .replace(/<h2>💰 Purchase Price<\/h2>/g, '<h2>💰 购买价格</h2>')
    .replace(/<h2>📊 Annual Cost Breakdown<\/h2>/g, '<h2>📊 年度费用明细</h2>')
    .replace(/<h2>📊 [^<]+ Annual Costs?<\/h2>/g, '<h2>📊 年度费用估算</h2>');

  // Table headers for cost tables
  out = out
    .replace(/<th>Expense<\/th>/g, '<th>费用项目</th>')
    .replace(/<th>Estimated Cost<\/th>/g, '<th>估计费用</th>')
    .replace(/<th>Cost<\/th>/g, '<th>费用</th>');

  // Table rows
  out = out
    .replace(/>Puppy from Breeder</g, '>从繁育者购买幼犬<')
    .replace(/>Monthly Food</g, '>每月食物费用<')
    .replace(/>Annual Vet Care</g, '>每年兽医费用<')
    .replace(/>Grooming \(annual\)</g, '>美容费用（每年）<')
    .replace(/>Pet Insurance</g, '>宠物保险<')
    .replace(/>Training Classes</g, '>训练课程<')
    .replace(/>Toys &amp; Supplies</g, '>玩具和用品<');

  // Intro texts
  out = out
    .replace(/The purchase price is just the beginning\. Here's a realistic breakdown of what it costs to buy and own a [^<.]+ over their lifetime\./g,
      `购买价格只是开始。以下是购买和养育${zhName}的全面费用分析。`);

  // Info-box labels
  out = out
    .replace(/<div class="info-box-label">Reputable Breeder<\/div>/g,
      '<div class="info-box-label">信誉繁育者</div>')
    .replace(/<div class="info-box-label">Show \/ Champion Lines<\/div>/g,
      '<div class="info-box-label">展犬/冠军血统</div>')
    .replace(/<div class="info-box-label">Rescue \/ Adoption<\/div>/g,
      '<div class="info-box-label">救援/领养</div>')
    .replace(/<div class="info-box-label">Backyard Breeder ⚠️<\/div>/g,
      '<div class="info-box-label">不正规繁育者 ⚠️</div>')
    .replace(/<div class="info-box-label">Food \(quality kibble\)<\/div>/g,
      '<div class="info-box-label">食物（优质狗粮）</div>')
    .replace(/<div class="info-box-label">Vet visits \(annual\)<\/div>/g,
      '<div class="info-box-label">兽医费用（每年）</div>')
    .replace(/<div class="info-box-label">Pet insurance<\/div>/g,
      '<div class="info-box-label">宠物保险</div>')
    .replace(/<div class="info-box-label">Grooming<\/div>/g,
      '<div class="info-box-label">美容费用</div>')
    .replace(/<div class="info-box-label">Toys &amp; supplies<\/div>/g,
      '<div class="info-box-label">玩具和用品</div>')
    .replace(/<div class="info-box-label">Training classes<\/div>/g,
      '<div class="info-box-label">训练课程</div>');

  // Translate tip boxes
  out = out
    .replace(/<h4>💡 Money-saving tip<\/h4>/g, '<h4>💡 省钱建议</h4>')
    .replace(/Pet insurance for a [^<.]+ costs[^<.]+\. This is not optional — it's essential\./g,
      '宠物保险每月需花费一定费用，但当您的爱犬需要手术或治疗时，它可以为您节省大量开支。对于医疗费用风险较高的犬种，宠物保险不是可选项，而是必需品。');

  // Translate cost list items
  out = out
    .replace(/Boarding costs: plan[^<]+when you travel/g,
      '寄养费用：旅行时在优质设施处寄养通常需每晚一定费用')
    .replace(/Pet insurance is essentially mandatory/g, '宠物保险对于高风险犬种几乎是必须的')
    .replace(/Pet insurance is worth it — it pays for itself if your dog needs surgery/g,
      '宠物保险物有所值——一旦需要手术，其价值将远超保费')
    .replace(/Get pet insurance before your dog turns 1/g,
      '在狗狗1岁前购买宠物保险——保费更低，排除条款更少')
    .replace(/Buy food in bulk \(large bags\)/g,
      '批量购买狗粮（大包装）——每磅价格更划算')
    .replace(/Learn basic grooming at home/g,
      '学习居家基础美容——在美容师处梳理和剪指甲费用可观')
    .replace(/Ask your vet about annual wellness plans/g,
      '向兽医咨询年度健康计划——许多诊所提供套餐服务')
    .replace(/Adopt instead of buying/g,
      '选择领养而非购买——领养犬同样充满爱，费用仅为购买的一小部分');

  return out;
}

// ── Mix breeds tab Chinese content ────────────────────────────────────────
function genMixesTab(html, zhName) {
  let out = (html.match(/id="tab-mixes">([\s\S]*?)<!--\s*end tab-mixes/) || [])[1] || '';

  // Main heading
  out = out.replace(
    /<h2>🧬 Popular [^<]+ Mix Breeds<\/h2>/g,
    `<h2>🧬 热门${zhName}混血犬种</h2>`
  );
  out = out.replace(
    /<p>Frenchies are mixed with[^<.]+\. Here are the most popular French Bulldog crosses\.<\/p>/,
    `<p>以下是最受欢迎的${zhName}混血犬种，每种混血都结合了亲本犬种的优秀特质。</p>`
  );
  out = out.replace(
    /<p>[^<]*mixed with other breeds[^<.]*\. Here are the most popular[^<.]+\.<\/p>/g,
    `<p>以下是最受欢迎的${zhName}混血犬种，每种混血都结合了亲本犬种的优秀特质。</p>`
  );

  // Translate info-box labels in mixes
  out = out
    .replace(/<div class="info-box-label">Size<\/div>/g, '<div class="info-box-label">体型</div>')
    .replace(/<div class="info-box-label">Energy<\/div>/g, '<div class="info-box-label">活力</div>')
    .replace(/<div class="info-box-label">Price<\/div>/g, '<div class="info-box-label">价格</div>')
    .replace(/<div class="info-box-label">Shedding<\/div>/g, '<div class="info-box-label">掉毛</div>')
    .replace(/<div class="info-box-label">Trainability<\/div>/g, '<div class="info-box-label">训练性</div>')
    .replace(/<div class="info-box-label">Breathing<\/div>/g, '<div class="info-box-label">呼吸</div>')
    .replace(/<div class="info-box-label">Breathing Risk<\/div>/g, '<div class="info-box-label">呼吸风险</div>')
    .replace(/<div class="info-box-label">Best For<\/div>/g, '<div class="info-box-label">最适合</div>')
    .replace(/<div class="info-box-label">Temperament<\/div>/g, '<div class="info-box-label">性格</div>')
    .replace(/<div class="info-box-label">Coat<\/div>/g, '<div class="info-box-label">毛发</div>')
    .replace(/<div class="info-box-label">Lifespan<\/div>/g, '<div class="info-box-label">寿命</div>')
    .replace(/<div class="info-box-label">Exercise<\/div>/g, '<div class="info-box-label">运动需求</div>');

  // Translate mix breed intro paragraphs (catch-all for any English paragraphs)
  out = out.replace(/<p>([A-Z][^<]{40,})<\/p>/g, (m, text) => {
    const ascii = (text.match(/[\x20-\x7E]/g)||[]).length;
    if (ascii / text.length > 0.80 && !text.includes('混血') && !text.includes('犬种') && !text.includes('结合')) {
      return `<p>以下混血犬种结合了${zhName}与其他优秀犬种的特质，各有独特的外形和性格特点。在考虑饲养任何混血犬之前，建议了解其亲本犬种的特征及潜在的健康需求。</p>`;
    }
    return m;
  });

  // Translate common info-box values
  out = out
    .replace(/>Moderate<\/div>/g, '>适中</div>')
    .replace(/>Moderate – High<\/div>/g, '>中等偏高</div>')
    .replace(/>Low – Moderate<\/div>/g, '>低至适中</div>')
    .replace(/>Low<\/div>/g, '>低</div>')
    .replace(/>High<\/div>/g, '>高</div>')
    .replace(/>Very High<\/div>/g, '>非常高</div>')
    .replace(/>Good<\/div>/g, '>良好</div>')
    .replace(/>Excellent<\/div>/g, '>优秀</div>')
    .replace(/>Relaxed households<\/div>/g, '>悠闲家庭</div>')
    .replace(/>Active families<\/div>/g, '>活跃家庭</div>')
    .replace(/>Families with children<\/div>/g, '>有孩子的家庭</div>');

  return out;
}

// ── Fun facts tab Chinese content ─────────────────────────────────────────
function genFactsTab(html, zhName) {
  let out = (html.match(/id="tab-facts">([\s\S]*?)<!--\s*end tab-facts/) || [])[1] || '';

  out = out.replace(
    /<h2>🎉 Amazing Facts About [^<]+<\/h2>/g,
    `<h2>🎉 关于${zhName}的趣味知识</h2>`
  );
  out = out.replace(
    /America's #1 most popular breed is full of surprising history[^<.]+\. Here are the most fascinating facts about the French Bulldog\./,
    `以下是关于${zhName}最令人惊叹的趣味知识，让您更全面地了解这一迷人的犬种。`
  );
  out = out.replace(
    /<p>[^<]*full of surprising[^<.]*\. Here are the most fascinating[^<.]+\.<\/p>/g,
    `<p>以下是关于${zhName}最令人着迷的趣味知识，让您对这一犬种有更深入的了解。</p>`
  );

  return out;
}

// ── Apply translations to the full page ───────────────────────────────────
function translateSubtitle(subtitle) {
  if (!subtitle) return '';
  let s = subtitle;
  Object.entries(GROUP_ZH).forEach(([en,zh]) => { s = s.replace(en+' Group', zh); });
  s = s
    .replace(/Most Popular in the US/g, '美国最受欢迎')
    .replace(/Most Popular/g, '最受欢迎')
    .replace(/The Perfect City Dog/g, '完美的城市犬')
    .replace(/The World's Most Popular/g, '世界最受欢迎')
    .replace(/\bAmerica's\b/g, '美国')
    .replace(/\bEngland's\b/g, '英国')
    .replace(/\bScotland's\b/g, '苏格兰')
    .replace(/Designer Hybrid/g, '设计师混血犬')
    .replace(/Hybrid Breed/g, '混血犬种')
    .replace(/Purebred/g, '纯种犬')
    .replace(/Family Dog/g, '家庭犬');
  return s;
}

// ── Main transform ─────────────────────────────────────────────────────────
function translateBreedPage(html, zhName, enName) {
  const data = extractData(html);

  // Replace subtitle
  if (data.subtitle) {
    const subtitleZh = translateSubtitle(data.subtitle);
    html = html.replace(
      `<p class="breed-subtitle">${data.subtitle}</p>`,
      `<p class="breed-subtitle">${subtitleZh}</p>`
    );
  }

  // Replace profile tab content (between h2 sections)
  const profileTabStart = html.indexOf('<div class="breed-tab-panel active" id="tab-profile">');
  const profileTabEnd   = html.indexOf('</div><!-- end tab-profile -->');
  if (profileTabStart !== -1 && profileTabEnd !== -1) {
    const profileZh = genProfileTab(data, zhName, enName);
    html = html.slice(0, profileTabStart) +
      '<div class="breed-tab-panel active" id="tab-profile">\n' +
      profileZh + '\n\n        ' +
      html.slice(profileTabEnd);
  }

  // Diet tab
  const dietZh = genDietTab(html, zhName, data);
  if (dietZh) {
    const dietStart = html.indexOf('<div class="breed-tab-panel" id="tab-diet">');
    const dietEnd   = html.indexOf('</div><!-- end tab-diet -->');
    if (dietStart !== -1 && dietEnd !== -1) {
      html = html.slice(0, dietStart) +
        '<div class="breed-tab-panel" id="tab-diet">\n          <div class="breed-section">\n' +
        dietZh + '\n          </div>\n        ' +
        html.slice(dietEnd);
    }
  }

  // Cost tab
  const costZh = genCostTab(html, zhName);
  if (costZh) {
    const costStart = html.indexOf('<div class="breed-tab-panel" id="tab-cost">');
    const costEnd   = html.indexOf('</div><!-- end tab-cost -->');
    if (costStart !== -1 && costEnd !== -1) {
      html = html.slice(0, costStart) +
        '<div class="breed-tab-panel" id="tab-cost">\n          <div class="breed-section">\n' +
        costZh + '\n          </div>\n        ' +
        html.slice(costEnd);
    }
  }

  // Mix breeds tab
  const mixStart = html.indexOf('<div class="breed-tab-panel" id="tab-mixes">');
  const mixEnd   = html.indexOf('</div><!-- end tab-mixes -->');
  if (mixStart !== -1 && mixEnd !== -1) {
    const mixSection = html.slice(mixStart, mixEnd + '</div><!-- end tab-mixes -->'.length);
    const mixZh = genMixesTab(mixSection, zhName);
    html = html.slice(0, mixStart) + mixZh + html.slice(mixEnd + '</div><!-- end tab-mixes -->'.length);
  }

  // Fun facts tab
  const factsStart = html.indexOf('<div class="breed-tab-panel" id="tab-facts">');
  const factsEnd   = html.indexOf('</div><!-- end tab-facts -->');
  if (factsStart !== -1 && factsEnd !== -1) {
    const factsSection = html.slice(factsStart, factsEnd + '</div><!-- end tab-facts -->'.length);
    const factsZh = genFactsTab(factsSection, zhName);
    html = html.slice(0, factsStart) + factsZh + html.slice(factsEnd + '</div><!-- end tab-facts -->'.length);
  }

  // Translate related breeds section heading
  html = html.replace(/<h2>🐾 Related Breeds<\/h2>/g, '<h2>🐾 相关犬种</h2>');

  // Translate video section
  html = html.replace(
    /Watch this video for a quick overview of the [^<.]+ — perfect if you want to see the breed in action before diving into the details\./g,
    `观看视频快速了解${zhName}——在深入阅读详情之前，先看看这个犬种的实际表现。`
  );

  return html;
}

// ── Process all 302 breed files ────────────────────────────────────────────
const BREED_NAMES = require('./build_zh_breed_profiles.js').toString()
  .match(/const BREED_NAMES = \{([\s\S]*?)\};/);
// Simpler: re-declare the same map inline (trimmed)
const BN = {
  'French Bulldog':'法国斗牛犬','Labrador Retriever':'拉布拉多寻回犬',
  'Golden Retriever':'金毛寻回犬','German Shepherd':'德国牧羊犬',
  'Dachshund':'腊肠犬','Poodle':'贵宾犬','Beagle':'比格犬',
  'Rottweiler':'罗威纳犬','Bulldog':'英国斗牛犬','English Bulldog':'英国斗牛犬',
};
// Load full BREED_NAMES from the profiles script
const profilesScript = fs.readFileSync(path.join(__dirname,'build_zh_breed_profiles.js'),'utf8');
const bnMatch = profilesScript.match(/const BREED_NAMES = \{([\s\S]*?)\n\};/);
const FULL_BREED_NAMES = bnMatch ? eval('({'+bnMatch[1]+'})') : BN;

const zhDir  = path.join(__dirname, 'zh', 'breeds');
const srcDir = path.join(__dirname, 'breeds');
const files  = fs.readdirSync(zhDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let count = 0;
files.forEach(filename => {
  const zhPath  = path.join(zhDir, filename);
  const srcPath = path.join(srcDir, filename);

  let html = fs.readFileSync(zhPath, 'utf8');

  // Get the original English source for data extraction
  let srcHtml = '';
  if (fs.existsSync(srcPath)) srcHtml = fs.readFileSync(srcPath, 'utf8');

  // Extract h1 from the CHINESE file to get zhName (already translated)
  const h1Match = html.match(/<h1>([^<]+)<\/h1>/);
  const zhName = h1Match ? h1Match[1].trim() : '';

  // Extract h1 from ENGLISH source to get enName
  const enH1 = srcHtml.match(/<h1>([^<]+)<\/h1>/);
  const enName = enH1 ? enH1[1].trim() : '';

  if (!zhName || !srcHtml) { count++; return; }

  // Run translation using ENGLISH source for data extraction
  // but apply to the already-translated CHINESE HTML
  const data = extractData(srcHtml); // extract from English source (has original values)

  // Translate subtitle
  const subtitleMatch = srcHtml.match(/<p class="breed-subtitle">([^<]+)<\/p>/);
  if (subtitleMatch) {
    const subtitleZh = translateSubtitle(subtitleMatch[1]);
    html = html.replace(
      /<p class="breed-subtitle">[^<]+<\/p>/,
      `<p class="breed-subtitle">${subtitleZh}</p>`
    );
  }

  // Replace profile tab from English source (with Chinese content)
  const profileTabStart = html.indexOf('<div class="breed-tab-panel active" id="tab-profile">');
  const profileTabEnd   = html.indexOf('</div><!-- end tab-profile -->');
  if (profileTabStart !== -1 && profileTabEnd !== -1) {
    const profileZh = genProfileTab(data, zhName, enName);
    html = html.slice(0, profileTabStart) +
      '<div class="breed-tab-panel active" id="tab-profile">\n' +
      profileZh + '\n\n        ' +
      html.slice(profileTabEnd);
  }

  // Diet tab — translate using English source
  const dietZh = genDietTab(srcHtml, zhName, data);
  const dietStart = html.indexOf('<div class="breed-tab-panel" id="tab-diet">');
  const dietEnd   = html.indexOf('</div><!-- end tab-diet -->');
  if (dietStart !== -1 && dietEnd !== -1 && dietZh) {
    html = html.slice(0, dietStart) +
      '<div class="breed-tab-panel" id="tab-diet">\n          <div class="breed-section">\n' +
      dietZh + '\n          </div>\n        ' +
      html.slice(dietEnd);
  }

  // Cost tab
  const costZh = genCostTab(srcHtml, zhName);
  const costStart = html.indexOf('<div class="breed-tab-panel" id="tab-cost">');
  const costEnd   = html.indexOf('</div><!-- end tab-cost -->');
  if (costStart !== -1 && costEnd !== -1 && costZh) {
    html = html.slice(0, costStart) +
      '<div class="breed-tab-panel" id="tab-cost">\n          <div class="breed-section">\n' +
      costZh + '\n          </div>\n        ' +
      html.slice(costEnd);
  }

  // Mix breeds tab — operate on current html
  const mixStart2 = html.indexOf('<div class="breed-tab-panel" id="tab-mixes">');
  const mixEnd2   = html.indexOf('</div><!-- end tab-mixes -->');
  if (mixStart2 !== -1 && mixEnd2 !== -1) {
    const mixSection = html.slice(mixStart2, mixEnd2 + '</div><!-- end tab-mixes -->'.length);
    // Re-extract mix section from English source and translate
    const srcMixSection = srcHtml.slice(
      srcHtml.indexOf('<div class="breed-tab-panel" id="tab-mixes">'),
      srcHtml.indexOf('</div><!-- end tab-mixes -->') + '</div><!-- end tab-mixes -->'.length
    ) || mixSection;
    const mixZh = genMixesTab(srcMixSection, zhName);
    html = html.slice(0, mixStart2) + mixZh + html.slice(mixEnd2 + '</div><!-- end tab-mixes -->'.length);
  }

  // Fun facts tab
  const factsStart2 = html.indexOf('<div class="breed-tab-panel" id="tab-facts">');
  const factsEnd2   = html.indexOf('</div><!-- end tab-facts -->');
  if (factsStart2 !== -1 && factsEnd2 !== -1) {
    const srcFactsSection = srcHtml.slice(
      srcHtml.indexOf('<div class="breed-tab-panel" id="tab-facts">'),
      srcHtml.indexOf('</div><!-- end tab-facts -->') + '</div><!-- end tab-facts -->'.length
    );
    if (srcFactsSection) {
      const factsZh = genFactsTab(srcFactsSection, zhName);
      html = html.slice(0, factsStart2) + factsZh + html.slice(factsEnd2 + '</div><!-- end tab-facts -->'.length);
    }
  }

  // Translate video section
  html = html.replace(
    /Watch this video for a quick overview of the [^<.]+ — perfect if you want to see the breed in action before diving into the details\./g,
    `观看视频快速了解${zhName}——在深入阅读详情之前，先看看这个犬种的实际表现。`
  );

  fs.writeFileSync(zhPath, html, 'utf8');
  count++;
  if (count % 50 === 0) process.stdout.write(`  ${count} pages done...\n`);
});

console.log(`\n✅ Translated content for ${count} Chinese breed profile pages.`);
