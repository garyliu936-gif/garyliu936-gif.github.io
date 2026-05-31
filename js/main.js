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
