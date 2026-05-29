// ── Language switcher — inject toggle + load i18n.js ─────────────────────────
(function () {
  const navContainer = document.querySelector('.nav-container');
  if (navContainer) {
    const savedLang = localStorage.getItem('adf-lang') || 'en';
    const btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.title = savedLang === 'zh' ? 'Switch to English' : '切换为简体中文';
    btn.innerHTML = savedLang === 'zh'
      ? '<span class="lang-icon">🌐</span> EN'
      : '<span class="lang-icon">🌐</span> 中文';
    btn.setAttribute('aria-label', 'Toggle language');
    const hamburgerBtn = navContainer.querySelector('.hamburger');
    if (hamburgerBtn) navContainer.insertBefore(btn, hamburgerBtn);
    else navContainer.appendChild(btn);
    btn.addEventListener('click', () => {
      if (window.i18n) window.i18n.apply(window.i18n.currentLang === 'zh' ? 'en' : 'zh');
    });
  }
  const mainSrc = (document.currentScript || document.querySelector('script[src*="main.js"]') || {}).src || '';
  const basePath = mainSrc.replace(/js\/main\.js.*/, '') || '/';
  const script = document.createElement('script');
  script.src = basePath + 'js/i18n.js';
  script.onload = () => { if (window.i18n) window.i18n.init(); };
  document.head.appendChild(script);
})();

// Sticky navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Tab switcher (How It Works)
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Open clicked if it wasn't already open
    if (!isOpen) item.classList.add('open');
  });
});

// Contact form — simple client-side handler
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate send (replace with real backend/Formspree later)
    setTimeout(() => {
      form.innerHTML = `
        <div class="form-success" style="display:block">
          <div class="success-icon">🎉</div>
          <h3>Message Received!</h3>
          <p>Thanks for reaching out. We'll get back to you within a few hours.<br/>
          In the meantime, check out <a href="https://www.pawsvip.com" style="color:var(--teal)">PawsVIP</a> to book your pet's stay.</p>
        </div>
      `;
    }, 1200);
  });
}

// Animate elements into view as user scrolls
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step, .review-card, .feature-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// ── Breed count — auto-updated by fix_sidebar.js ─────────────────────────────
(function () {
  const BREED_COUNT = 302;
  document.querySelectorAll('.breed-count-live').forEach(function (el) {
    el.textContent = BREED_COUNT + '+';
  });
})();
// end breed count
