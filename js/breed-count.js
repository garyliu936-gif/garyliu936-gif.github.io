/* ─────────────────────────────────────────────────────────────────────────────
   AllDogFacts — Breed Count Auto-Updater  v3
   ─────────────────────────────────────────────────────────────────────────────
   HOW IT WORKS
   • breeds/index.html  → counts actual .breed-card elements in the DOM
                          (always 100% accurate, no manual update needed)
   • All other pages    → reads counts saved to localStorage by the breeds page
                          Falls back to FALLBACK values if never visited.

   WHEN YOU ADD NEW BREEDS
   ✅  Just add the cards to breeds/index.html — everything updates automatically.
   ✅  Other pages update the moment anyone views the breeds page.
   ────────────────────────────────────────────────────────────────────────────── */
(function () {
  var FALLBACK_TOTAL    = 603;
  var FALLBACK_PUREBRED = 412;
  var FALLBACK_HYBRID   = 191;
  var FALLBACK_FCI      = 359;

  document.addEventListener('DOMContentLoaded', function () {
    var isZh = document.documentElement.lang === 'zh-CN' || location.pathname.startsWith('/zh/');
    var isBreedPage = !!document.getElementById('breedsGrid');
    var total, purebred, hybrid;

    if (isBreedPage) {
      /* Count directly from the DOM — always accurate */
      /* Count DISTINCT breeds — cards flagged data-dup="1" are intentional
         variety/synonym listings kept for search but not counted as separate breeds. */
      total    = document.querySelectorAll('a.breed-card:not([data-dup])').length;
      purebred = document.querySelectorAll('a.breed-card[data-type="purebred"]:not([data-dup])').length;
      hybrid   = document.querySelectorAll('a.breed-card[data-type="hybrid"]:not([data-dup])').length;

      /* Save for all other pages (versioned keys so old stale values are ignored) */
      localStorage.setItem('siteBreedTotal-v5',    total);
      localStorage.setItem('sitePurebredTotal-v5', purebred);
      localStorage.setItem('siteHybridTotal-v5',   hybrid);
    } else {
      /* Other pages — prefer localStorage so counts propagate automatically */
      total    = parseInt(localStorage.getItem('siteBreedTotal-v5'),    10) || FALLBACK_TOTAL;
      purebred = parseInt(localStorage.getItem('sitePurebredTotal-v5'), 10) || FALLBACK_PUREBRED;
      hybrid   = parseInt(localStorage.getItem('siteHybridTotal-v5'),   10) || FALLBACK_HYBRID;
    }

    /* Update the results-count badge on the breeds page (before any filter) */
    if (isBreedPage) {
      var rc = document.getElementById('resultsCount');
      if (rc) rc.textContent = isZh ? total + '个犬种' : total + ' breeds';
    }

    /* ── Update every marked element ─────────────────────────────── */

    document.querySelectorAll('.js-breed-total').forEach(function (el) {
      el.textContent = total;
    });

    document.querySelectorAll('.breed-count-live').forEach(function (el) {
      el.textContent = total + '+';
    });

    document.querySelectorAll('.js-breed-count').forEach(function (el) {
      el.textContent = isZh ? total + '个犬种' : total + ' breeds';
    });

    document.querySelectorAll('.js-breed-btn').forEach(function (el) {
      el.textContent = isZh ? '浏览全部' + total + '个犬种 →' : 'Browse All ' + total + ' Breeds →';
    });

    document.querySelectorAll('.js-breed-desc').forEach(function (el) {
      el.textContent = isZh
        ? '收录' + total + '个犬种资料——' + purebred + '个纯种犬和' + hybrid + '个混血犬。涵盖性格、体型、运动需求、美容护理、健康问题及养育费用。'
        : 'Profiles for ' + total + ' breeds — ' + purebred + ' purebreds and ' + hybrid + ' designer hybrids. Covers temperament, size, exercise needs, grooming, health issues, and cost to own.';
    });

    document.querySelectorAll('.js-breed-short-desc').forEach(function (el) {
      el.textContent = isZh
        ? '收录' + total + '个犬种档案——纯种犬与混血犬——性格、体型、护理、健康等全方位介绍。'
        : 'Profiles for ' + total + ' breeds — purebreds & hybrids — temperament, size, care, health, and more.';
    });

    document.querySelectorAll('.js-breed-dir-desc').forEach(function (el) {
      el.textContent = isZh
        ? '浏览顶级纯种犬和混血设计犬——完整目录收录' + total + '个犬种。'
        : 'Browse top purebreds and designer hybrids — ' + total + ' breeds in our full directory.';
    });

    document.querySelectorAll('.js-hybrid-count').forEach(function (el) {
      el.textContent = isZh ? '🌟 ' + hybrid + '个混血犬种' : '🌟 ' + hybrid + ' hybrid breeds';
    });

    document.querySelectorAll('.js-purebred-count').forEach(function (el) {
      el.textContent = isZh ? '🏆 ' + purebred + '个纯种犬' : '🏆 ' + purebred + ' purebred breeds';
    });

    /* FCI-recognized breed count — saved by the breeds page, shown on the
       homepage "Did You Know?" card. Falls back until the breeds page is visited. */
    var fci = parseInt(localStorage.getItem('siteFciTotal-v5'), 10) || FALLBACK_FCI;
    document.querySelectorAll('.js-fci-num').forEach(function (el) {
      el.textContent = fci;
    });
  });
})();
