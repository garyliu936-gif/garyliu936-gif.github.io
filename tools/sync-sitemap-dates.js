#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────────
   sitemap <lastmod> 同步工具  —  alldogfacts.com
   ─────────────────────────────────────────────────────────────────────────────
   做什么
   把 sitemap.xml 里每条 URL 的 <lastmod> 改成「该文件在 git 里最后一次提交的
   日期」。搜索引擎靠这个字段判断要不要回来重新抓取；如果它一直是旧的，
   即使页面改过，爬虫也不知道。

   为什么不直接全部改成今天
   因为那是假的。搜索引擎会识别「每次所有页面都标成刚更新」这种模式，
   然后干脆不再信任这个字段——反而弄巧成拙。所以逐个文件取真实日期。

   怎么用
     node tools/sync-sitemap-dates.js                  预演，只显示会改什么
     node tools/sync-sitemap-dates.js --apply          实际写入 sitemap.xml
     node tools/sync-sitemap-dates.js --apply --print-changed
                                                       写入并打印改动的 URL，
                                                       可直接喂给 IndexNow：

     node tools/sync-sitemap-dates.js --apply --print-changed | node tools/indexnow-submit.js --stdin

   注意：日期来自 git 提交记录，所以请在提交之后再运行本工具。
   ────────────────────────────────────────────────────────────────────────── */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITEMAP = path.join(ROOT, 'sitemap.xml');
const APPLY = process.argv.includes('--apply');
const PRINT_CHANGED = process.argv.includes('--print-changed');
// --print-changed 时把说明文字走 stderr，stdout 只留纯 URL，方便管道
const log = PRINT_CHANGED ? (...a) => console.error(...a) : (...a) => console.log(...a);

// ── git 对含非 ASCII 的路径会加引号 + 八进制转义 ──────────────────────────────
//    "breeds/kromfohrl\303\244nder.html"  →  breeds/kromfohrländer.html
function decodeGitPath(p) {
  p = p.trim();
  if (!(p.startsWith('"') && p.endsWith('"'))) return p;
  p = p.slice(1, -1);
  const bytes = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '\\' && /[0-7]/.test(p[i + 1] || '')) {
      bytes.push(parseInt(p.substr(i + 1, 3), 8));
      i += 3;
    } else {
      bytes.push(p.charCodeAt(i));
    }
  }
  return Buffer.from(bytes).toString('utf8');
}

// ── 每个文件的最后提交日期 ───────────────────────────────────────────────────
function buildLastModifiedMap() {
  const out = execSync('git log --pretty=format:"COMMIT:%cs" --name-only', {
    cwd: ROOT,
    maxBuffer: 128 * 1024 * 1024,
    encoding: 'utf8',
  });
  const map = {};
  let cur = null;
  for (const line of out.split(/\r?\n/)) {
    const l = line.trim();
    if (l.startsWith('COMMIT:')) { cur = l.slice(7).replace(/"/g, '').trim(); continue; }
    if (!l || !cur) continue;
    const f = decodeGitPath(l);
    if (!map[f]) map[f] = cur;   // git log 是倒序的，首次出现即最新
  }
  return map;
}

// ── URL → 仓库内文件路径 ─────────────────────────────────────────────────────
function urlToFile(loc) {
  let p = loc.replace(/^https?:\/\/alldogfacts\.com/, '');
  if (p === '' || p === '/') return 'index.html';
  p = p.replace(/^\//, '');
  if (p.endsWith('/')) p += 'index.html';
  return p;
}

// ── 主流程 ───────────────────────────────────────────────────────────────────
const lastByFile = buildLastModifiedMap();
let sm = fs.readFileSync(SITEMAP, 'utf8');
const blocks = sm.match(/<url>[\s\S]*?<\/url>/g) || [];

let updated = 0, unchanged = 0;
const missing = [], changedUrls = [];

for (const b of blocks) {
  const loc = (b.match(/<loc>([^<]+)<\/loc>/) || [])[1];
  const curLm = (b.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
  if (!loc || !curLm) continue;

  const file = urlToFile(loc.trim());
  const gitDate = lastByFile[file];

  if (!gitDate) { missing.push(loc.trim() + '  (git 中找不到: ' + file + ')'); continue; }
  if (gitDate === curLm.trim()) { unchanged++; continue; }

  sm = sm.replace(b, b.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${gitDate}</lastmod>`));
  updated++;
  changedUrls.push(loc.trim());
}

log(APPLY ? '=== 已写入 sitemap.xml ===' : '=== 预演（未写入，加 --apply 才会改）===');
log('  需要更新的 lastmod :', updated);
log('  已经正确的         :', unchanged);
log('  git 中找不到的文件 :', missing.length);
missing.slice(0, 10).forEach(m => log('    - ' + m));

if (APPLY) {
  const open = (sm.match(/<url>/g) || []).length;
  const close = (sm.match(/<\/url>/g) || []).length;
  if (open !== close) {
    console.error('中止：XML 标签不配对 (<url> ' + open + ' vs </url> ' + close + ')，未写入。');
    process.exit(1);
  }
  fs.writeFileSync(SITEMAP, sm);
  log('  写入后 <url> 数    :', open, '（标签配对正常）');
  if (PRINT_CHANGED) changedUrls.forEach(u => console.log(u));  // stdout 只输出 URL
}
