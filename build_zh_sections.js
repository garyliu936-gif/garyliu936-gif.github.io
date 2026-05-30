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
  // All sections
  'All Guides': '全部指南',
  'All': '全部',
  // Training
  'Basic Commands': '基础口令',
  'Puppy Training': '幼犬训练',
  'Leash &amp; Walking': '牵绳与散步',
  'Leash & Walking': '牵绳与散步',
  'Behavior Problems': '行为问题',
  'Advanced': '高级',
  'Professional': '专业',
  'Beginner': '入门',
  'Intermediate': '进阶',
  // Health
  'Symptoms': '症状',
  'Preventive Care': '预防保健',
  'Common Illnesses': '常见疾病',
  'Dental Health': '牙齿健康',
  'Senior Dogs': '老年犬',
  // Nutrition (exact chip text from HTML)
  'Feeding Guide': '喂食指南',
  'Food Types': '食物类型',
  'Toxic &amp; Safe Foods': '有毒与安全食物',
  'Toxic & Safe Foods': '有毒与安全食物',
  'Treats &amp; Chews': '零食与咬胶',
  'Treats & Chews': '零食与咬胶',
  'Supplements': '营养补充剂',
  // Grooming (exact chip text from HTML)
  'Bathing': '洗浴',
  'Brushing &amp; Coat': '梳毛与毛发',
  'Brushing & Coat': '梳毛与毛发',
  'Nail Care': '指甲护理',
  'Ear &amp; Eye Care': '耳眼护理',
  'Ear & Eye Care': '耳眼护理',
  // Getting a Dog (exact chip text from HTML)
  'Find Your Breed': '寻找适合的犬种',
  'Costs &amp; Budget': '费用与预算',
  'Costs & Budget': '费用与预算',
  'Adoption &amp; Breeders': '领养与繁育者',
  'Adoption & Breeders': '领养与繁育者',
  'Prepare Your Home': '家庭准备',
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
  'Essential': '必读',
  'Important': '重要',
  'Overlooked': '常被忽视',
  'Must Know': '必须了解',
};

/* ── Topic badge color labels (exact text inside gi-topic spans) ─────────── */
const TOPIC_BADGES = {
  // Training
  'Basic Commands': '基础口令',
  'Puppy Training': '幼犬训练',
  'Leash & Walking': '牵绳与散步',
  'Behavior Problems': '行为问题',
  // Health
  'Symptoms': '症状',
  'Preventive Care': '预防保健',
  'Common Illnesses': '常见疾病',
  'Dental Health': '牙齿健康',
  'Senior Dogs': '老年犬',
  // Nutrition (exact badge text — HTML uses literal &)
  'Food Types': '食物类型',
  'Toxic & Safe': '有毒与安全',
  'Toxic &amp; Safe': '有毒与安全',
  'Feeding Guide': '喂食指南',
  'Treats & Chews': '零食与咬胶',
  'Treats &amp; Chews': '零食与咬胶',
  'Supplements': '营养补充剂',
  // Grooming (exact badge text)
  'Bathing': '洗浴',
  'Brushing & Coat': '梳毛与毛发',
  'Brushing &amp; Coat': '梳毛与毛发',
  'Nail Care': '指甲护理',
  'Ear & Eye Care': '耳眼护理',
  'Ear &amp; Eye Care': '耳眼护理',
  'Professional': '专业美容',
  // Getting a Dog (exact badge text)
  'Find Your Breed': '寻找适合的犬种',
  'Costs & Budget': '费用与预算',
  'Costs &amp; Budget': '费用与预算',
  'Adoption & Breeders': '领养与繁育者',
  'Adoption &amp; Breeders': '领养与繁育者',
  'Prepare Your Home': '家庭准备',
};

/* ── Guide card descriptions ─────────────────────────────────────────────── */
const DESCRIPTIONS = {
  // Getting a Dog
  'Not every breed is beginner-friendly. These 8 breeds are forgiving, easy to train, and perfect for new dog owners.':
    '不是每个犬种都适合新手。这8个犬种宽容、易训，非常适合第一次养狗的主人。',
  'Puppy price is just the beginning. A complete breakdown of what you\'ll actually spend in year one and every year after.':
    '幼犬价格只是起点。完整解析第一年及此后每年的真实支出。',
  'Both are great options — but they\'re very different. Pros, cons, costs, and what to watch out for with each path.':
    '两种方式都很好——但大不相同。各自的优缺点、费用及注意事项。',
  'Avoid puppy mills and scams. The exact questions to ask, red flags to watch for, and what a responsible breeder looks like.':
    '远离黑心繁殖场和诈骗。需要询问的问题、应警惕的红旗信号及负责任繁育者的特征。',
  'A complete puppy-proofing guide — what to buy, what to put away, and how to set up your space before day one.':
    '完整的幼犬入住准备指南——需要购买什么、收好什么，以及如何在幼犬到来前布置好家。',
  'Live in a small space? These breeds thrive in apartments — low noise, lower energy, and perfectly sized for city living.':
    '住小空间？这些犬种非常适合公寓——安静、活力适中，体型完美适合城市生活。',
  'Safety, patience, and playfulness — breeds proven to be gentle and loving with children of all ages.':
    '安全、耐心、活泼——这些犬种经过验证，对各年龄段的儿童都温柔友善。',
  'Everything you need to buy before your puppy comes home. From crates to food bowls — a complete, printable checklist.':
    '幼犬回家前需要准备的一切。从狗笼到食碗——一份完整的可打印清单。',
  // Training
  'The three commands that form the foundation of everything else. Step-by-step with common mistakes to avoid.':
    '构成其他一切训练基础的三个口令。逐步详解并列出常见错误。',
  'Two commands that can literally save your dog\'s life. "Leave it" stops them from eating dangerous items on walks.':
    '两个可以真正救狗狗一命的口令。"放开"能阻止它们在散步时误食危险物品。',
  'Stop your dog from rushing the door or jumping on guests. Teaches calm greetings that impress everyone.':
    '阻止狗狗冲向门口或扑向客人。教会它以冷静的方式打招呼，让所有人都印象深刻。',
  '"Place" sends your dog to their bed and keeps them there — perfect for mealtimes and when guests arrive.':
    '"去床"让狗狗到床上并待着不动——非常适合用餐时间和客人到访时。',
  'What to do on day 1, day 3, and day 7. Routine, boundaries, and bonding — in exactly the right order.':
    '第1天、第3天、第7天分别该做什么。按正确顺序建立日常规律、界限和感情。',
  'The fastest house-training method — schedule, signals, and what to do when accidents happen (they will).':
    '最快的如厕训练方法——时间表、信号，以及意外发生时该怎么做。',
  'A crate should feel like a safe den, not a punishment. This guide makes your dog love their crate in 1–2 weeks.':
    '狗笼应像安全的巢穴，而不是惩罚工具。本指南能让狗狗在1-2周内爱上它的笼子。',
  'Puppies have a socialization window from 3–14 weeks. Miss it, and you\'ll spend years fixing fear and anxiety.':
    '幼犬有一个3-14周的社会化窗口期。错过它，您将花费数年时间纠正恐惧和焦虑。',
  'The method that works even for the strongest pullers. No pain, no pinch collars — just one simple technique.':
    '即使是最强力的拉绳狗也有效的方法。无痛苦、不用刺激项圈——只需一个简单技巧。',
  'Does your dog bark or lunge at other dogs? This is leash reactivity — and it\'s very fixable with the right approach.':
    '您的狗狗会对其他狗吠叫或冲扑吗？这是牵绳应激——用正确方法完全可以改善。',
  'Front-clip vs back-clip vs collar vs head halter — which is right for your dog and your situation.':
    '前扣式、后扣式、项圈与头部控制绳——哪种最适合您的狗狗和您的情况。',
  'Demand, alert, boredom barking — each type needs a different solution. We cover all of them with clear steps.':
    '需求性、警觉性、无聊性吠叫——每种类型需要不同的解决方案。我们用清晰步骤逐一介绍。',
  'If your dog panics when you leave, this is a real condition — not bad behavior. Here\'s how to treat it properly.':
    '如果您的狗狗在您离开时惊慌失措，这是真实症状——而非坏习惯。正确治疗方法在此。',
  'All puppies bite — but it must be addressed early. Techniques that teach bite inhibition and stop nipping fast.':
    '所有幼犬都会咬人——但必须尽早处理。教授咬力抑制并快速阻止啃咬的技巧。',
  'A management and training combo that stops counter surfing without making your dog anxious around food.':
    '管理与训练的组合，有效阻止扒台偷食，同时不让狗狗对食物产生焦虑。',
  'Roll over, shake hands, spin, play dead — great mental exercise and a fantastic way to bond with your dog.':
    '翻滚、握手、转圈、装死——极佳的大脑锻炼，也是与狗狗增进感情的绝佳方式。',
  'A reliable "come" command that works even with distractions. The most important advanced skill your dog can learn.':
    '即使有干扰也可靠的"过来"口令。这是狗狗能学到的最重要的高级技能。',
  'Puzzle feeders, nose work, hide-and-seek — mental exercise tires dogs out faster than physical and reduces problem behaviors.':
    '益智喂食器、嗅探训练、捉迷藏——大脑锻炼比体力运动更能让狗狗疲惫，并减少问题行为。',
  'All 10 CGC skills explained, what evaluators look for, and the most common reasons dogs fail. The entry point to every advanced title.':
    '10项CGC技能详解，评审员关注的要点，以及狗狗最常见的失败原因。所有高级头衔的起点。',
  'How to get your dog certified for hospital and school visits — organizations compared, evaluation requirements, and finding placements.':
    '如何让狗狗获得医院和学校探访认证——机构比较、评估要求及寻找安置机会。',
  'ADA legal basics, task types, breed selection, the 18-month training roadmap, and public access standards for owner-trained service dogs.':
    'ADA法律基础、任务类型、犬种选择、18个月训练路线图及主人自训服务犬的公共场所标准。',
  'Trial levels from Novice to OTCH, key exercises explained, how to train for competition precision, and where to find clubs and trials.':
    '从初级到OTCH的比赛级别、核心项目详解、如何训练竞赛精准度及寻找俱乐部和比赛。',
  'Every obstacle explained, foundation skills to train before touching equipment, 18-month progression plan, and entering your first trial.':
    '每个障碍物详解、上器材前需要训练的基础技能、18个月进阶计划及参加第一场比赛。',
  'Teach your dog to find hidden birch odor in boxes, rooms, vehicles, and outdoor areas. Works for any dog — any breed, age, or ability.':
    '教您的狗狗找出藏在箱子、房间、车辆和户外区域的桦木气味。适用于任何狗——任何品种、年龄或能力。',
  // Health
  'A complete guide to your dog\'s baseline health — what stool, eyes, ears, coat, and energy should look like when they\'re healthy.':
    '狗狗基础健康完整指南——健康状态下粪便、眼睛、耳朵、毛发和精力应该是什么样的。',
  'Lethargy, loss of appetite, limping, coughing — what each symptom means and when it warrants a vet visit.':
    '嗜睡、食欲不振、跛行、咳嗽——每种症状的含义及何时需要就医。',
  'Occasional limping vs. chronic lameness — causes, at-home assessment, and when to seek treatment.':
    '偶尔跛行与长期跛行——原因、居家评估及何时寻求治疗。',
  'A clear decision guide: treat at home vs. call the vet now. Includes hydration tips and what to feed a sick dog.':
    '清晰决策指南：居家处理还是立即致电兽医。包含补水技巧和病犬喂食建议。',
  'Which vaccines your dog needs, when to give them, which are required by law, and what to expect after each shot.':
    '狗狗需要哪些疫苗、何时接种、哪些是法律要求的，以及每次注射后的预期反应。',
  'Monthly prevention options compared — oral pills vs. topicals vs. collars. What works, what doesn\'t, what\'s safe.':
    '每月预防方案对比——口服药物、外用药与项圈。哪些有效、哪些无效、哪些安全。',
  'Annual vs. bi-annual checkups, what the vet checks at each visit, and how to get the most out of your appointment.':
    '年度与半年度体检对比、每次就诊兽医检查的内容，以及如何充分利用您的预约。',
  '60% of US dogs are overweight. How to assess your dog\'s body condition, reduce weight safely, and prevent gain.':
    '美国60%的狗狗超重。如何评估体况、安全减重及预防体重增加。',
  'The most common respiratory illness in dogs. Highly contagious but usually mild — here\'s what to do if your dog gets it.':
    '狗狗最常见的呼吸道疾病。传染性极强但通常症状轻微——狗狗感染时该怎么做。',
  'Affects 15–20% of large breed dogs. Understanding the condition, managing pain, and what treatment looks like.':
    '影响15-20%的大型犬。了解该病症、疼痛管理及治疗方案。',
  'Itching, paw licking, and ear infections can all be allergies. How to identify the trigger and find lasting relief.':
    '瘙痒、舔爪和耳朵感染都可能是过敏反应。如何找出诱因并获得持久缓解。',
  'A deadly virus in unvaccinated puppies. Understanding parvo, the vaccination timeline, and what to do if exposed.':
    '未接种疫苗幼犬面临的致命病毒。了解细小病毒、接种时间表及暴露后的处理方法。',
  'Step-by-step for dogs who hate teeth-brushing. Takes 2 minutes a day and prevents thousands in vet bills.':
    '专为不喜欢刷牙的狗狗设计的逐步指南。每天2分钟，可节省数千元兽医费用。',
  'Bad breath is not normal — it\'s a symptom. How to spot gum disease, tooth pain, and when a dental cleaning is needed.':
    '口臭不正常——那是症状。如何发现牙龈病、牙痛，以及何时需要洗牙。',
  'Not all dental chews are equal. We review the ones with actual clinical evidence vs. the marketing hype.':
    '并非所有洁齿零食都一样。我们评测有真实临床证据的产品，而非单纯的营销宣传。',
  'Small breeds age slower than large breeds. A full breakdown by size — and what health changes to expect at each stage.':
    '小型犬比大型犬老化慢。按体型完整分析——以及每个阶段应预期的健康变化。',
  'The most common condition in senior dogs. Symptoms, treatments, supplements, and home modifications that help.':
    '老年犬最常见的病症。症状、治疗方案、营养补充剂及有助于改善的家庭改造。',
  'Signs of doggy dementia — confusion, night wandering, changed behavior. Management strategies that improve quality of life.':
    '犬类痴呆的症状——迷失方向、夜间游荡、行为改变。提高生活质量的管理策略。',
  // Nutrition
  'How to read a dog food label, what ingredients to look for, which to avoid, and what the AAFCO statement means.':
    '如何阅读狗粮标签、应寻找哪些成分、应避免哪些，以及AAFCO声明的含义。',
  'Chocolate, grapes, xylitol, onions — these can cause serious illness or death. Every owner needs to know this list.':
    '巧克力、葡萄、木糖醇、洋葱——这些可能导致严重疾病或死亡。每位主人都需要了解这份清单。',
  'Toy to giant breeds — how many cups per day, how many meals, and how to adjust for activity level and age.':
    '从玩具犬到超大型犬——每天几杯、几餐，以及如何根据活动量和年龄进行调整。',
  'When to switch from mother\'s milk, how often to feed, and how to transition to adult food at the right time.':
    '何时从母乳转换、喂食频率，以及如何在正确时机过渡到成犬食品。',
  'How to assess body condition score, calculate calories, and safely reduce weight without nutritional deficiency.':
    '如何评估体况评分、计算卡路里，以及在不造成营养缺乏的情况下安全减重。',
  'Treats should be under 10% of daily calories. The safest options, what to avoid, and how to use them in training.':
    '零食应占每日卡路里的10%以下。最安全的选择、应避免的零食及如何在训练中使用零食。',
  'Fish oil, glucosamine, probiotics, and more — which supplements have real science behind them and who needs them.':
    '鱼油、氨基葡萄糖、益生菌等——哪些补充剂有真正的科学依据，以及哪些狗狗需要它们。',
  'Which human foods dogs can safely eat as treats — carrots, blueberries, chicken, eggs, and more with serving tips.':
    '狗狗可以安全食用哪些人类食物作为零食——胡萝卜、蓝莓、鸡肉、鸡蛋等，附食用建议。',
  'Large breed puppies need different calcium ratios to prevent joint problems. Why breed-specific food actually matters.':
    '大型犬幼犬需要不同的钙比例以预防关节问题。为何按犬种选择食品真的很重要。',
  'Sudden food changes cause diarrhea in 90% of dogs. A proven 7-day transition plan that works with every food type.':
    '突然换粮会导致90%的狗狗腹泻。一个经过验证的7天过渡计划，适用于所有食品类型。',
  // Grooming
  'Not all dogs need the same bath schedule. A guide to bathing frequency by coat type, activity level, and breed.':
    '并非所有狗狗都需要相同的洗澡频率。按毛发类型、活动量和犬种制定的洗澡频率指南。',
  'Sensitive skin, heavy shedding, whitening, and medicated options compared. What actually works for each coat.':
    '敏感肌肤、大量掉毛、美白和药用洗毛精对比。每种毛发真正有效的产品。',
  'Step-by-step for bath-resistant dogs. Desensitization techniques that turn a stressful bath into a calm routine.':
    '专为抗拒洗澡的狗狗设计的逐步指南。脱敏技巧将紧张的洗澡变成平静的日常。',
  'The right brushes and technique for short, long, curly, double, and wire coats. Includes a step-by-step routine.':
    '短毛、长毛、卷毛、双层毛和刚毛的正确梳理工具和技巧。包含逐步日常护理程序。',
  'The right tools, brushing frequency, and simple diet tips that genuinely reduce the hair on your sofa and clothes.':
    '正确的工具、梳毛频率和简单的饮食建议，真正减少沙发和衣物上的毛发。',
  'Breed-specific grooming schedules — which dogs need cuts, how often, and what to expect at the groomer.':
    '按犬种制定的美容时间表——哪些狗需要修剪、多久一次，以及在美容师处的预期。',
  'The right tools, the correct angle, how to avoid the quick — plus a step-by-step for dogs who fight nail trims.':
    '正确工具、正确角度、如何避开血管——以及专为抗拒剪甲的狗狗设计的逐步指南。',
  'Clicking on floors, curved nails, changes in gait — how overgrown nails affect posture, joints, and comfort over time.':
    '踩地发出响声、指甲弯曲、步态改变——过长指甲如何影响姿势、关节和长期舒适度。',
  'Safe technique, the right solution, which dogs need it most (floppy-eared breeds), and how to spot early infection.':
    '安全技巧、正确清洁液、哪些狗最需要清洁耳朵（垂耳犬种），以及如何发现早期感染。',
  'Why Maltese, Shih Tzus, and Bulldogs get reddish-brown stains — and the safest, most effective ways to clean them.':
    '为何马耳他犬、西施犬和斗牛犬会产生红褐色泪痕——以及最安全、最有效的清洁方法。',
  'What to look for in a groomer, the right questions to ask, and red flags that tell you to walk away.':
    '在美容师身上应寻找什么、应询问的正确问题，以及让您立即离开的红旗信号。',
  'Cost comparison, which breeds really need a pro, and what tools you\'d need to do it yourself safely at home.':
    '费用比较、哪些犬种真正需要专业美容，以及在家安全自己操作所需的工具。',
};

/* ── Shared page sections (quiz, facts, sidebar tabs, footer cols) ────────── */
function applySharedTranslations(html) {
  // Special card CTAs
  html = html
    .replace(/Browse small breeds <span>/g, '浏览小型犬种 <span>')
    .replace(/Browse breeds great with kids <span>/g, '浏览适合儿童的犬种 <span>');

  // Quiz section
  html = html
    .replace('>Find Your Perfect Dog Breed<', '>找到您最适合的犬种<')
    .replace('>Question 1 of 5<', '>第1题，共5题<')
    .replace('>Question 2 of 5<', '>第2题，共5题<')
    .replace('>Question 3 of 5<', '>第3题，共5题<')
    .replace('>Question 4 of 5<', '>第4题，共5题<')
    .replace('>Question 5 of 5<', '>第5题，共5题<')
    .replace('>Where do you live?<', '>您住在哪里？<')
    .replace('>How active are you?<', '>您的活动量如何？<')
    .replace('>Do you have children at home?<', '>家里有小孩吗？<')
    .replace('>How much grooming are you willing to do?<', '>您愿意花多少时间在美容上？<')
    .replace('>Have you owned a dog before?<', '>您以前养过狗吗？<')
    .replace('>Your Best Breed Matches<', '>最适合您的犬种<')
    .replace('>↺ Retake the Quiz<', '>↺ 重新测试<')
    .replace(/🏢 Apartment or small space/g, '🏢 公寓或小空间')
    .replace(/🏠 House with a small yard/g, '🏠 有小院子的房子')
    .replace(/🌳 House with a large yard/g, '🌳 有大院子的房子')
    .replace(/🌾 Rural \/ farm \/ lots of space/g, '🌾 农村/农场/大空间')
    .replace(/🛋️ I prefer relaxing — short walks only/g, '🛋️ 我喜欢休闲——只需短距离散步')
    .replace(/🚶 Moderate — daily walks, occasional hikes/g, '🚶 适中——每日散步，偶尔远足')
    .replace(/🏃 Very active — running, hiking, outdoor sports/g, '🏃 非常活跃——跑步、远足、户外运动')
    .replace(/👶 Yes — young children \(under 8\)/g, '👶 有——8岁以下小孩')
    .replace(/🧒 Yes — older children \(8\+\)/g, '🧒 有——8岁以上小孩')
    .replace(/🚫 No children/g, '🚫 没有小孩')
    .replace(/✂️ As little as possible — low maintenance/g, '✂️ 尽量少——低维护')
    .replace(/🪮 Some brushing — weekly grooming is fine/g, '🪮 一些梳理——每周美容可以接受')
    .replace(/💅 I love grooming — no problem with high maintenance/g, '💅 我喜欢美容——高维护没问题')
    .replace(/🐾 First-time dog owner/g, '🐾 第一次养狗')
    .replace(/🐕 Some experience/g, '🐕 有一些经验')
    .replace(/🏆 Very experienced dog owner/g, '🏆 非常有经验的养狗人');

  // Good to Know / Before You Decide section
  html = html
    .replace('>Good to Know<', '>须知<')
    .replace('>Before You Decide<', '>做决定之前<')
    .replace('>Honest facts every future dog owner should know.<', '>每位未来养狗人都应了解的真实数据。<')
    .replace('>10–15 Years<', '>10–15年<')
    .replace('>The average dog lives 10–15 years. This is a long-term commitment — make sure you\'re ready for the full journey.<',
      '>狗狗平均寿命10-15年。这是长期承诺——请确保您已准备好走完全程。<')
    .replace('>$1,000–$3,000 / year<', '>¥7,000–¥21,000 / 年<')
    .replace('>The average annual cost of owning a dog including food, vet, grooming, and supplies. Larger breeds cost more.<',
      '>养狗每年平均费用，包括食物、兽医、美容和用品。大型犬费用更高。<')
    .replace('>2+ Hours Daily<', '>每天2小时以上<')
    .replace('>Most dogs need at least 1–2 hours of attention and activity every single day — exercise, playtime, and interaction.<',
      '>大多数狗狗每天至少需要1-2小时的陪伴和活动——运动、玩耍和互动。<')
    .replace('>Personality Over Looks<', '>性格比外貌更重要<')
    .replace('>The most common mistake: choosing a breed based on appearance. Always research temperament and energy level first.<',
      '>最常见的错误：根据外貌选择犬种。请先研究性格和活力水平。<');

  // Explore All Topics section
  html = html
    .replace('>Explore All Topics<', '>探索所有主题<')
    .replace('>Everything you need to know about dogs — all in one place.<', '>关于狗狗您需要了解的一切——尽在此处。<')
    // Tab buttons
    .replace(/<span class="ttb-label">Dog Breeds<\/span>/g, '<span class="ttb-label">犬种大全</span>')
    .replace(/<span class="ttb-label">Getting a Dog<\/span>/g, '<span class="ttb-label">养狗入门</span>')
    .replace(/<span class="ttb-label">Training<\/span>/g, '<span class="ttb-label">训练指南</span>')
    .replace(/<span class="ttb-label">Health<\/span>/g, '<span class="ttb-label">健康</span>')
    .replace(/<span class="ttb-label">Nutrition<\/span>/g, '<span class="ttb-label">营养</span>')
    .replace(/<span class="ttb-label">Grooming<\/span>/g, '<span class="ttb-label">美容护理</span>')
    // Tab panel tags
    .replace(/<span class="ttp-tag">Dog Breeds<\/span>/g, '<span class="ttp-tag">犬种大全</span>')
    .replace(/<span class="ttp-tag">Getting a Dog<\/span>/g, '<span class="ttp-tag">养狗入门</span>')
    .replace(/<span class="ttp-tag">Training<\/span>/g, '<span class="ttp-tag">训练指南</span>')
    .replace(/<span class="ttp-tag">Health &amp; Symptoms<\/span>/g, '<span class="ttp-tag">健康与症状</span>')
    .replace(/<span class="ttp-tag">Nutrition &amp; Diet<\/span>/g, '<span class="ttp-tag">营养与饮食</span>')
    .replace(/<span class="ttp-tag">Grooming<\/span>/g, '<span class="ttp-tag">美容护理</span>')
    // Tab panel h3
    .replace('>Find Your Perfect Breed</', '>寻找您的完美犬种</')
    .replace('>Get It Right From Day One</', '>从第一天就做对</')
    .replace('>Train Any Dog, Any Age</', '>任何犬、任何年龄都可以训练</')
    .replace('>Spot Problems Early</', '>及早发现问题</')
    .replace('>Feed Them Right</', '>科学喂养</')
    .replace('>Keep Them Looking Great</', '>保持最佳状态</')
    // Tab panel descriptions
    .replace(/>Profiles for 302 breeds — 202 purebreds and 100 designer hybrids\. Covers temperament, size, exercise needs, grooming, health issues, and cost to own\.</, '>收录302个犬种资料——202个纯种犬和100个混血犬。涵盖性格、体型、运动需求、美容、健康问题和养育费用。<')
    .replace(/>Find your perfect breed, understand the real costs, choose adoption or a breeder, and prepare your home\. Includes an interactive breed-finder quiz\.</, '>找到您的完美犬种、了解真实费用、选择领养还是购买、做好家庭准备。包含互动犬种匹配测验。<')
    .replace(/>Step-by-step guides for basic commands, puppy training, leash manners, crate training, and fixing behavior problems — for beginners to advanced owners\.</, '>从基础口令到行为问题矫正的逐步指南——适合从新手到高级养狗人。<')
    .replace(/>Common illnesses, what symptoms really mean, vaccination schedules, dental care, and senior dog guides — so you know when to act and when to relax\.</, '>常见疾病、症状真正含义、疫苗接种时间表、牙齿护理和老年犬指南——让您知道何时采取行动、何时放心。<')
    .replace(/>How much to feed, best foods by age and size, dry vs\. raw vs\. wet, foods that are toxic to dogs, and practical treat and supplement guidance\.</, '>喂食量、按年龄和体型推荐最佳食品、干粮与生骨肉与湿粮的对比、对狗狗有毒的食物，以及实用的零食和补充剂建议。<')
    .replace(/>Bathing, brushing, nail trims, ear care, and managing shedding — guides for every coat type, plus when your dog needs a professional groomer\.</, '>洗澡、梳毛、剪指甲、耳朵护理和控制掉毛——适用于各种毛发类型的指南，以及何时需要专业美容师。<')
    // Tab highlights
    .replace(/>🏆 202 purebred breeds</g, '>🏆 202个纯种犬<')
    .replace(/>🌟 100 hybrid breeds</g, '>🌟 100个混血犬<')
    .replace(/>📊 AKC 2025 ranked</g, '>📊 AKC 2025排名<')
    .replace(/>🎯 Breed-finder quiz</g, '>🎯 犬种匹配测验<')
    .replace(/>💰 Real cost breakdown</g, '>💰 真实费用分析<')
    .replace(/>🏠 Adopt vs\. breeder</g, '>🏠 领养还是购买<')
    .replace(/>📖 Basic commands</g, '>📖 基础口令<')
    .replace(/>🐕 Puppy training</g, '>🐕 幼犬训练<')
    .replace(/>🚶 Leash & recall</g, '>🚶 牵绳与召回<')
    .replace(/>🩺 Symptom guides</g, '>🩺 症状指南<')
    .replace(/>💉 Vaccine schedules</g, '>💉 疫苗时间表<')
    .replace(/>🐾 Senior dog care</g, '>🐾 老年犬护理<')
    .replace(/>📏 Feeding by size & age</g, '>📏 按体型和年龄喂食<')
    .replace(/>☠️ Toxic foods list</g, '>☠️ 有毒食物清单<')
    .replace(/>🧪 Raw vs\. dry debate</g, '>🧪 生骨肉与干粮之争<')
    .replace(/>🪮 All 6 coat types</g, '>🪮 全部6种毛发类型<')
    .replace(/>💅 Nail & ear care</g, '>💅 指甲与耳朵护理<')
    .replace(/>✨ Shedding control</g, '>✨ 掉毛控制<')
    // Tab CTAs
    .replace(/Browse All 302 Breeds →/g, '浏览全部302个犬种 →')
    .replace(/Explore Getting a Dog →/g, '探索养狗入门 →')
    .replace(/Explore Training Guides →/g, '探索训练指南 →')
    .replace(/Explore Health Guides →/g, '探索健康指南 →')
    .replace(/Explore Nutrition Guides →/g, '探索营养指南 →')
    .replace(/Explore Grooming Guides →/g, '探索美容指南 →');

  // Footer brand tagline
  html = html.replace(
    '>A free, in-depth encyclopedia for dog owners and lovers.<',
    '>为爱狗人士提供的免费深度百科全书。<'
  );

  // Footer column headings and links
  html = html
    .replace(/<h4>Getting a Dog<\/h4>/g, '<h4>养狗入门</h4>')
    .replace(/<h4>Dog Breeds<\/h4>/g, '<h4>犬种大全</h4>')
    .replace(/<h4>Training<\/h4>/g, '<h4>训练指南</h4>')
    .replace(/<h4>Health<\/h4>/g, '<h4>健康</h4>')
    .replace(/<h4>Nutrition<\/h4>/g, '<h4>营养</h4>')
    .replace(/<h4>Grooming<\/h4>/g, '<h4>美容护理</h4>')
    .replace(/>Breed Finder Quiz</g, '>犬种匹配测验<')
    .replace(/>Best for First-Timers</g, '>新手最佳犬种<')
    .replace(/>Cost of a Dog</g, '>养狗费用<')
    .replace(/>Adopt vs\. Buy</g, '>领养还是购买<')
    .replace(/>Labrador Retriever</g, '>拉布拉多寻回犬<')
    .replace(/>Golden Retriever</g, '>金毛寻回犬<')
    .replace(/>French Bulldog</g, '>法国斗牛犬<')
    .replace(/>German Shepherd</g, '>德国牧羊犬<')
    .replace(/>Sit, Stay, Come</g, '>坐下、等待、过来<')
    .replace(/>Potty Training</g, '>如厕训练<')
    .replace(/>Stop Leash Pulling</g, '>停止牵绳拉拽<')
    .replace(/>Crate Training</g, '>狗笼训练<')
    .replace(/>Vaccination Schedule</g, '>疫苗接种时间表<')
    .replace(/>Dental Care</g, '>牙齿护理<')
    .replace(/>Dog Food Guide</g, '>狗粮指南<')
    .replace(/>Toxic Foods</g, '>有毒食物<')
    .replace(/>Bathing Guide</g, '>洗澡指南<')
    .replace(/>Nail Trimming</g, '>指甲修剪<');

  return html;
}

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
      tag: '循证喂食建议',
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

  // 5. Hero section — use indexOf for reliable multi-line replacement
  const heroTagOpen = '<div class="si-hero-tag">';
  const heroTagClose = '</div>';
  const tagStart = html.indexOf(heroTagOpen);
  if (tagStart !== -1) {
    const tagEnd = html.indexOf(heroTagClose, tagStart) + heroTagClose.length;
    html = html.slice(0, tagStart) + heroTagOpen + cfg.hero.tag + heroTagClose + html.slice(tagEnd);
  }
  const h1Start = html.indexOf('<h1>');
  if (h1Start !== -1) {
    const h1End = html.indexOf('</h1>', h1Start) + '</h1>'.length;
    html = html.slice(0, h1Start) + `<h1>${cfg.hero.h1}</h1>` + html.slice(h1End);
  }
  // Hero paragraph (before search wrap)
  const searchWrapIdx = html.indexOf('<div class="si-search-wrap">');
  if (searchWrapIdx !== -1) {
    const pEnd = html.lastIndexOf('</p>', searchWrapIdx) + '</p>'.length;
    const pStart = html.lastIndexOf('<p>', pEnd);
    if (pStart !== -1) html = html.slice(0, pStart) + `<p>${cfg.hero.p}</p>` + html.slice(pEnd);
  }
  html = html.replace(/placeholder="Search guides[^"]*"/, `placeholder="${cfg.hero.placeholder}"`);

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

  // 13b. Guide card descriptions
  Object.entries(DESCRIPTIONS).forEach(([en, zh]) => {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`<p>${escaped}<\\/p>`, 'g'), `<p>${zh}</p>`);
  });

  // 13c. Shared sections (quiz, facts, explore-tabs, footer cols)
  html = applySharedTranslations(html);

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
