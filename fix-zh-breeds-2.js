const fs = require('fs');
const path = require('path');

const translations = [

  // ── AKC犬种组 / 犬种组 ────────────────────────────────────────────────────
  ["Mixed Breed (工作犬组 × 非运动犬组)", "混血犬种（工作犬组 × 非运动犬组）"],
  ["Mixed Breed (梗犬组 × 非运动犬组)", "混血犬种（梗犬组 × 非运动犬组）"],
  ["Mixed Breed (牧羊犬组 × 非运动犬组)", "混血犬种（牧羊犬组 × 非运动犬组）"],
  ["Mixed Breed (玩具犬组 × 工作犬组)", "混血犬种（玩具犬组 × 工作犬组）"],
  ["Mixed Breed (玩具犬组 × 非运动犬组)", "混血犬种（玩具犬组 × 非运动犬组）"],
  ["Mixed Breed (玩具犬组)", "混血犬种（玩具犬组）"],
  ["Mixed Breed (运动犬组 × 非运动犬组)", "混血犬种（运动犬组 × 非运动犬组）"],
  ["梗犬组 (Standard); 玩具犬组 (玩具犬组 variety)", "梗犬组（标准型）；玩具犬组（玩具型）"],
  ["非运动犬组 (Standard)", "非运动犬组（标准型）"],

  // ── AKC排名 ──────────────────────────────────────────────────────────────
  ["Newly recognized (2022)", "新认可（2022年）"],
  ["Newly recognized (2024)", "新认可（2024年）"],
  ["Not AKC recognized (mixed breed)", "未登记于AKC（混血犬）"],
  ["第185名最受欢迎 (one of the rarest)", "第185名最受欢迎（最稀有犬种之一）"],
  ["第191名最受欢迎 (one of the rarest)", "第191名最受欢迎（最稀有犬种之一）"],

  // ── 别名 — remove foreign-language secondary names ────────────────────────
  ["贵宾犬, Caniche", "贵宾犬"],
  ["意大利獒犬, Cane Corso Italiano", "意大利獒犬"],
  ["Idi, Hanshee（非洲原名）", "阿扎瓦克（非洲原名：Idi / Hanshee）"],

  // ── 侧边栏 毛发 字段 ───────────────────────────────────────────────────────
  ["丝滑至蓬松, 白色 或 奶油色, 非常 low 掉毛", "丝滑至蓬松，白色或奶油色，极低掉毛"],
  ["厚实, 卷毛, 完全防水——low 掉毛", "厚实卷毛，完全防水——低掉毛"],
  ["短毛, 浓密, 光泽——非常 low 护理", "短毛浓密光泽——极易打理"],
  ["短毛，光滑, 光亮光滑——银色-灰色, low-护理", "短毛光滑，亮泽银灰色——易于打理"],
  ["短毛，光滑, 和 紧密至the 全身; 非常 易于护理——所有犬种中护理需求最低的被毛之一", "短毛光滑，紧贴全身；极易护理——所有犬种中护理需求最低的被毛之一"],

  // ── 耐热能力 ──────────────────────────────────────────────────────────────
  ["Poor in extreme heat — limit exercise", "极度高温下表现差——需限制运动量"],
  ["Poor — keep cool in summer", "较差——夏季需保持凉爽"],
  ["Poor — limit outdoor time in heat", "较差——高温时需限制户外时间"],

  // ── 适合公寓 ──────────────────────────────────────────────────────────────
  ["否——高活力 和 may 嚎叫", "否——精力旺盛且可能嚎叫"],
  ["视情况——适中 运动, but 需要 脑力刺激", "视情况——运动量适中，但需要脑力刺激"],
  ["迷你型 yes; 标准型 需要 空间", "迷你型适合；标准型需要更多空间"],

  // ── 颜色 ─────────────────────────────────────────────────────────────────
  ["All色调 的 虎斑, 黑色, 浅黄褐色, 黄褐色", "所有色调的虎斑纹、黑色、浅黄褐色、黄褐色"],
  ["奶油色, 金色, 黑色, 巧克力色, 花斑色, tri", "奶油色、金色、黑色、巧克力色、花斑色、三色"],
  ["所有颜色——白色, 黑色, 金色, 花斑色, tri", "所有颜色——白色、黑色、金色、花斑色、三色"],
  ["椒盐色 和 黄褐色, 蓝色 和 黄褐色, 红色, 或 麦色; 深色耳朵和 口吻部 are 典型", "椒盐色与黄褐色、蓝色与黄褐色、红色或麦色；深色耳朵和口吻部为典型特征"],
  ["白色, 白色 和 橙色, 橙色 沙砾色, 白色 和 棕色, 或 棕色 沙砾色; any 棕色 斑块 须位于特定区域", "白色、白色和橙色、橙色沙砾色、白色和棕色或棕色沙砾色；任何棕色斑块须位于特定区域"],
  ["白色（唯一接受颜色）；靠近眼睛的少量深色斑点符合AKC标准", "白色（唯一认可颜色）；靠近眼睛的少量深色斑点符合AKC标准"],
  ["金色 锈红色 (仅 AKC-均可接受 颜色)", "金色锈红色（唯一AKC认可颜色）"],
  ["黑色（AKC唯一接受颜色）；部分机构接受其他纯色", "黑色（AKC唯一认可颜色）；部分机构接受其他纯色"],
];

const dir = 'zh/breeds';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

let filesChanged = 0;

for (const fn of files) {
  const filePath = path.join(dir, fn);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const [from, to] of translations) {
    if (from === to) continue;
    if (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesChanged++;
  }
}

console.log(`Done. Updated ${filesChanged} files.`);
