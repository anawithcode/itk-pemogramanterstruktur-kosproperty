/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersectfing) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════════
   PARALLAX HERO
══════════════════════════════════════════════════════════════ */
function initParallax() {
  const hero = document.getElementById('hero');
  const video = hero.querySelector('.hero-video');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.4;
    if (video) video.style.transform = `scale(1.1) translateY(${rate * 0.2}px)`;
    
    const content = hero.querySelector('.hero-content');
    if (content) content.style.transform = `translateY(${scrolled * 0.15}px)`;
    if (content) content.style.opacity = 1 - (scrolled / 700);
  });

  // Trigger hero animations
  setTimeout(() => {
    document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-sub, #hero-cta').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
    hero.classList.add('loaded');
  }, 300);
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════════════════════════ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}