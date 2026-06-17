/* ─────────────────────────────────────────────────────────────────────────────
   AllDogFacts — Breed Count Auto-Updater
   ─────────────────────────────────────────────────────────────────────────────
   HOW IT WORKS
   • breeds/index.html  → counts actual .breed-card elements in the DOM
                          (always 100% accurate, no manual update needed)
   • All other pages    → reads the count saved to localStorage by the breeds page
                          Falls back to FALLBACK_TOTAL if never visited.

   WHEN YOU ADD NEW BREEDS
   ✅  Just add the cards to breeds/index.html — everything updates automatically.
   ✅  Other pages update the moment anyone views the breeds page.
   ────────────────────────────────────────────────────────────────────────────── */
(function () {
  var EN_FALLBACK      = 488;   // English total — update if you add more breeds
  var ZH_FALLBACK      = 386;   // Chinese total
  var HYBRID_TOTAL     = 100;   // hybrid/designer breeds
  var PUREBRED_TOTAL   = 386;   // purebred breeds

  document.addEventListener('DOMContentLoaded', function () {
    var isZh = document.documentElement.lang === 'zh-CN' || location.pathname.startsWith('/zh/');
    var isBreedPage = !!document.getElementById('breedsGrid');
    var storageKey = isZh ? 'siteBreedTotal-zh' : 'siteBreedTotal-en';
    var fallback   = isZh ? ZH_FALLBACK : EN_FALLBACK;
    var total;

    if (isBreedPage) {
      /* Count every breed card on the breeds page — zero manual work */
      total = document.querySelectorAll('a.breed-card').length;
      localStorage.setItem(storageKey, total);
      localStorage.setItem('siteHybridTotal',   HYBRID_TOTAL);
      localStorage.setItem('sitePurebredTotal', PUREBRED_TOTAL);

      /* Update the results-count badge (before any filter is applied) */
      var rc = document.getElementById('resultsCount');
      if (rc) rc.textContent = isZh ? total + '个犬种' : total + ' breeds';
    } else {
      /* Other pages — prefer localStorage so live count propagates */
      var stored = parseInt(localStorage.getItem(storageKey), 10);
      total = (stored && stored > 0) ? stored : fallback;
    }

    /* ── Update every marked element ─────────────────────────────── */

    /* Plain number spans: <span class="js-breed-total">506</span> */
    document.querySelectorAll('.js-breed-total').forEach(function (el) {
      el.textContent = total;
    });

    /* "N+ breeds" spans with breed-count-live class (used in breed profile CTAs) */
    document.querySelectorAll('.breed-count-live').forEach(function (el) {
      el.textContent = total + '+';
    });

    /* "N breeds" spans: <span class="js-breed-count">506 breeds</span> */
    document.querySelectorAll('.js-breed-count').forEach(function (el) {
      el.textContent = isZh ? total + '个犬种' : total + ' breeds';
    });

    /* CTA buttons: <a class="js-breed-btn …">Browse All 506 Breeds →</a> */
    document.querySelectorAll('.js-breed-btn').forEach(function (el) {
      el.textContent = isZh ? '浏览全部' + total + '个犬种 →' : 'Browse All ' + total + ' Breeds →';
    });

    /* Description paragraphs in tab panels */
    document.querySelectorAll('.js-breed-desc').forEach(function (el) {
      el.textContent = isZh
        ? '收录' + total + '个犬种资料——' + PUREBRED_TOTAL + '个纯种犬和' + HYBRID_TOTAL + '个混血犬。涵盖性格、体型、运动需求、美容护理、健康问题及养育费用。'
        : 'Profiles for ' + total + ' breeds — ' + PUREBRED_TOTAL + ' purebreds and ' + HYBRID_TOTAL + ' designer hybrids. Covers temperament, size, exercise needs, grooming, health issues, and cost to own.';
    });

    /* Short description on home topic card */
    document.querySelectorAll('.js-breed-short-desc').forEach(function (el) {
      el.textContent = isZh
        ? '收录' + total + '个犬种资料——纯种犬与混血犬——性格、体型、护理、健康等全方位介绍。'
        : 'Profiles for ' + total + ' breeds — purebreds & hybrids — temperament, size, care, health, and more.';
    });

    /* Section header sub-text on home breeds section */
    document.querySelectorAll('.js-breed-dir-desc').forEach(function (el) {
      el.textContent = isZh
        ? '浏览顶级纯种犬和混血设计犬——完整目录收录' + total + '个犬种。'
        : 'Browse top purebreds and designer hybrids — ' + total + ' breeds in our full directory.';
    });

    /* Tab panel highlights: <span class="ttp-highlight js-hybrid-count"> */
    document.querySelectorAll('.js-hybrid-count').forEach(function (el) {
      el.textContent = isZh ? '🌟 ' + HYBRID_TOTAL + '个混血犬种' : '🌟 ' + HYBRID_TOTAL + ' hybrid breeds';
    });
    document.querySelectorAll('.js-purebred-count').forEach(function (el) {
      el.textContent = isZh ? '🏆 ' + PUREBRED_TOTAL + '个纯种犬' : '🏆 ' + PUREBRED_TOTAL + ' purebred breeds';
    });
  });
})();
