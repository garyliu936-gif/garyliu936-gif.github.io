#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────────
   IndexNow submitter for alldogfacts.com
   ─────────────────────────────────────────────────────────────────────────────
   WHAT IT DOES
   Tells Bing (and Yandex, Seznam, Naver — they share the IndexNow network)
   that pages have changed, so they re-crawl in minutes/hours instead of
   waiting days for a normal crawl. Google does NOT use IndexNow.

   HOW TO USE
     node tools/indexnow-submit.js              → submits every URL in sitemap.xml
     node tools/indexnow-submit.js /breeds/beagle.html /zh/breeds/beagle.html
                                                → submits just those pages

   WHEN TO USE
   After a Netlify deploy that changed or added pages. Submitting unchanged
   pages repeatedly is pointless (and discouraged), so prefer passing the
   specific pages you changed when you only touched a few.

   THE KEY
   6a298b473bb4f627866ca49c52b3bb05 — this is PUBLIC by design. It is verified
   by fetching https://alldogfacts.com/6a298b473bb4f627866ca49c52b3bb05.txt
   That file must stay in the site root or submissions will be rejected.
   ────────────────────────────────────────────────────────────────────────── */

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'alldogfacts.com';
const KEY = '6a298b473bb4f627866ca49c52b3bb05';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'api.indexnow.org';
const BATCH_SIZE = 10000; // IndexNow allows up to 10,000 URLs per request

const ROOT = path.resolve(__dirname, '..');

function urlsFromSitemap() {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const locs = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return locs.map(l => l.replace(/<\/?loc>/g, '').trim());
}

function normalize(arg) {
  if (/^https?:\/\//i.test(arg)) return arg;
  return `https://${HOST}${arg.startsWith('/') ? '' : '/'}${arg}`;
}

function submit(urlList) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    });
    const req = https.request(
      {
        hostname: ENDPOINT,
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      res => {
        let data = '';
        res.on('data', d => (data += d));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const args = process.argv.slice(2);
  const urls = args.length ? args.map(normalize) : urlsFromSitemap();

  if (!urls.length) {
    console.error('No URLs to submit.');
    process.exit(1);
  }

  console.log(`Submitting ${urls.length} URL(s) to IndexNow…`);
  console.log(`  key file: ${KEY_LOCATION}`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const r = await submit(batch);
    // 200 = accepted, 202 = accepted but key still being validated
    const ok = r.status === 200 || r.status === 202;
    console.log(
      `  batch ${i / BATCH_SIZE + 1}: ${batch.length} URLs → HTTP ${r.status} ${ok ? '✓' : '✗'}${r.body ? ' ' + r.body.slice(0, 200) : ''}`
    );
    if (!ok) process.exitCode = 1;
  }
})();
