/* ============================================
   AFNAAN AHMED P — PORTFOLIO JS
   All class selectors match index.html exactly.
   NO custom cursor. Clean interactivity only.
   ============================================ */

(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ── Scroll Progress Bar ──
  const progressBar = $('#scrollProgress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ── Navigation ──
  const nav = $('#nav');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  const navLinks = $$('.nav__link');
  const sections = $$('section[id]');

  // Glass effect on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  $$('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active section highlighting
  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.scroll-reveal').forEach(el => revealObserver.observe(el));

  // ── Hero Typing Effect ──
  const roles = [
    'intelligent systems',
    'production APIs',
    'ML pipelines',
    'real-time systems',
    'AI applications',
    'cloud infrastructure',
    'full-stack products'
  ];
  const heroRole = $('#heroRole');
  let roleIndex = 0;
  let charIndex = roles[0].length; // Start with first role fully typed
  let isDeleting = true;
  let typeSpeed = 2000; // Initial pause before starting to delete

  function typeRole() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      heroRole.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typeSpeed = 2200;
      } else {
        typeSpeed = 55 + Math.random() * 35;
      }
    } else {
      heroRole.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 350;
      } else {
        typeSpeed = 25;
      }
    }
    setTimeout(typeRole, typeSpeed);
  }
  setTimeout(typeRole, 2200);

  // ── Stat Counter Animation ──
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target;
          const target = parseInt(numEl.dataset.target);
          const suffix = numEl.dataset.suffix || '';
          const divide = numEl.dataset.divide ? parseInt(numEl.dataset.divide) : 0;
          const duration = 1400;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            let current = Math.round(eased * target);

            if (divide > 0) {
              numEl.textContent = (current / divide).toFixed(2) + suffix;
            } else {
              numEl.textContent = current + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }
          requestAnimationFrame(update);
          statObserver.unobserve(numEl);
        }
      });
    },
    { threshold: 0.5 }
  );
  $$('.stat__number').forEach(el => statObserver.observe(el));

  // ── Smooth Anchor Scrolling ──
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
        const top = target.offsetTop - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll to Top ──
  const scrollTopBtn = $('#scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Parallax Hero Orbs on Scroll ──
  const orbs = $$('.hero__orb');
  if (orbs.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.04;
        orb.style.transform += ''; // reset handled by CSS keyframes
        orb.style.marginTop = -(scrollY * speed) + 'px';
      });
    }, { passive: true });
  }

  // ── Project Module Hover — Accent Glow Pulse ──
  $$('.pmod').forEach(mod => {
    const bar = mod.querySelector('.pmod__bar');
    mod.addEventListener('mouseenter', () => {
      bar.style.transition = 'box-shadow .2s, width .2s';
    });
    mod.addEventListener('mouseleave', () => {
      bar.style.transition = 'box-shadow .5s, width .3s';
    });
  });

  // ── Page Load ──
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    updateActiveNav();
    updateProgress();
  });

})();
