// Sitewide search — inject nav icon that opens the search page directly
(function () {
  const navContainer = document.querySelector('.nav-container');
  if (!navContainer) return;
  const isZhPage = document.documentElement.lang === 'zh-CN' || location.pathname.startsWith('/zh/');
  const PAW_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"></circle><line x1="20.5" y1="20.5" x2="15" y2="15"></line><circle cx="10" cy="11.6" r="1.7" fill="currentColor" stroke="none"></circle><circle cx="7.1" cy="8.6" r="1" fill="currentColor" stroke="none"></circle><circle cx="10" cy="7.1" r="1" fill="currentColor" stroke="none"></circle><circle cx="12.9" cy="8.6" r="1" fill="currentColor" stroke="none"></circle></svg>';

  const searchBtn = document.createElement('button');
  searchBtn.id = 'navSearchBtn';
  searchBtn.className = 'nav-search-btn';
  searchBtn.type = 'button';
  searchBtn.setAttribute('aria-label', isZhPage ? '搜索' : 'Search');
  searchBtn.innerHTML = PAW_ICON;
  const hamburgerAnchor = navContainer.querySelector('.hamburger');
  if (hamburgerAnchor) navContainer.insertBefore(searchBtn, hamburgerAnchor);
  else navContainer.appendChild(searchBtn);

  searchBtn.addEventListener('click', function () {
    window.location.href = isZhPage ? '/zh/search/' : '/search/';
  });
})();

// Language switcher — inject toggle + load i18n.js
(function () {
  const navContainer = document.querySelector('.nav-container');
  if (navContainer) {
    // Use HTML lang attribute as the source of truth — not localStorage
    const isZhPage = document.documentElement.lang === 'zh-CN' || location.pathname.startsWith('/zh/');
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.title = isZhPage ? 'Switch to English' : 'Switch to Chinese';
    btn.innerHTML = isZhPage
      ? '<span class="lang-icon">🌐</span> EN'
      : '<span class="lang-icon">🌐</span> 中文';
    btn.setAttribute('aria-label', 'Toggle language');
    const hamburgerBtn = navContainer.querySelector('.hamburger');
    if (hamburgerBtn) navContainer.insertBefore(btn, hamburgerBtn);
    else navContainer.appendChild(btn);
    btn.addEventListener('click', function () {
      var onZh = document.documentElement.lang === 'zh-CN' || location.pathname.startsWith('/zh/');
      var p = location.pathname;
      if (onZh) {
        // Switch to English
        localStorage.setItem('adf-lang', 'en');
        if (p.startsWith('/zh/')) {
          location.href = p.replace('/zh/', '/');
        } else {
          location.href = '/index.html';
        }
      } else {
        // Switch to Chinese
        localStorage.setItem('adf-lang', 'zh');
        if (p === '/' || p === '/index.html' || p === '') {
          location.href = '/zh/index.html';
        } else {
          location.href = '/zh' + p;
        }
      }
    });
  }
  var mainSrc = (document.currentScript || document.querySelector('script[src*="main.js"]') || {}).src || '';
  var basePath = mainSrc.replace(/js\/main\.js.*/, '') || '/';
  var script = document.createElement('script');
  script.src = basePath + 'js/i18n.js';
  script.onload = function () { if (window.i18n) window.i18n.init(); };
  document.head.appendChild(script);
})();

// Sticky navbar shadow on scroll
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile hamburger menu
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
  var spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// Tab switcher
document.querySelectorAll('.tab-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.parentElement;
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!isOpen) item.classList.add('open');
  });
});

// Contact form
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(function () {
      form.innerHTML = '<div class="form-success" style="display:block"><div class="success-icon">🎉</div><h3>Message Received!</h3><p>Thanks for reaching out. We\'ll get back to you within a few hours.</p></div>';
    }, 1200);
  });
}

// Animate elements into view
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step, .review-card, .feature-item').forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// Breed count
(function () {
  var BREED_COUNT = 302;
  document.querySelectorAll('.breed-count-live').forEach(function (el) {
    el.textContent = BREED_COUNT + '+';
  });
})();

// De-duplicate breed photo galleries: some Dog CEO API breeds have very few
// images, so a gallery can repeat the same photo in every slot. Hide any
// gallery photo whose image repeats one already shown (keeps the first).
(function () {
  function dedupeGallery() {
    var imgs = Array.prototype.slice.call(document.querySelectorAll('.gallery-photo'));
    if (!imgs.length) return true; // nothing to do
    var seen = {}, allHaveSrc = true;
    imgs.forEach(function (img) {
      var src = img.getAttribute('src');
      if (!src) { allHaveSrc = false; return; }
      if (seen[src]) { img.style.display = 'none'; }
      else { seen[src] = 1; img.style.display = ''; }
    });
    return allHaveSrc;
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('.gallery-photo')) return;
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (dedupeGallery() || tries > 20) clearInterval(iv); // up to ~10s
    }, 500);
  });
})();
