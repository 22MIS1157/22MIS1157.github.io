/* ============================================
   AFNAAN AHMED P — PORTFOLIO JS
   Money Heist themed. All selectors match HTML.
   Features: Loader, particles, scroll reveals,
   typing, counters, parallax, section dividers,
   dynamic greeting, smooth anchor scroll.
   ============================================ */

(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ────────────────────────────
     LOADING SCREEN
     ──────────────────────────── */
  const loader = $('#loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1300);
  });

  /* ────────────────────────────
     DYNAMIC GREETING (time-based)
     ──────────────────────────── */
  const greetingEl = $('#heroGreeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    if (hour >= 5 && hour < 12) greeting = 'Good morning';
    else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    else if (hour >= 17 && hour < 21) greeting = 'Good evening';
    else greeting = 'Late night? Same here';
    greetingEl.textContent = greeting + ". I'm";
  }

  /* ────────────────────────────
     SCROLL PROGRESS BAR
     ──────────────────────────── */
  const progressBar = $('#scrollProgress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ────────────────────────────
     NAVIGATION
     ──────────────────────────── */
  const nav = $('#nav');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  const navLinks = $$('.nav__link');
  const sections = $$('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  $$('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Active section highlighting */
  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === id));
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ────────────────────────────
     SCROLL REVEAL (multiple types)
     IntersectionObserver with stagger
     ──────────────────────────── */
  const revealEls = $$('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const parent = entry.target.parentElement;
        const siblings = $$('.scroll-reveal', parent);
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ────────────────────────────
     SECTION DIVIDER ANIMATION
     Red line draws across on scroll
     ──────────────────────────── */
  const sectionDividers = $$('.section');
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.05 });
  sectionDividers.forEach(s => dividerObserver.observe(s));

  /* ────────────────────────────
     HERO TYPING EFFECT
     ──────────────────────────── */
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
  let roleIdx = 0;
  let charIdx = roles[0].length;
  let isDeleting = true;
  let typeSpeed = 2000;

  function typeRole() {
    const current = roles[roleIdx];
    if (!isDeleting) {
      heroRole.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { isDeleting = true; typeSpeed = 2200; }
      else typeSpeed = 55 + Math.random() * 35;
    } else {
      heroRole.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; typeSpeed = 350; }
      else typeSpeed = 25;
    }
    setTimeout(typeRole, typeSpeed);
  }
  setTimeout(typeRole, 2200);

  /* ────────────────────────────
     STAT COUNTER ANIMATION
     ──────────────────────────── */
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const divide = el.dataset.divide ? parseInt(el.dataset.divide) : 0;
        const duration = 1400;
        const start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(eased * target);
          el.textContent = divide > 0 ? (val / divide).toFixed(2) + suffix : val + suffix;
          if (p < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  $$('.stat__number').forEach(el => statObserver.observe(el));

  /* ────────────────────────────
     SMOOTH ANCHOR SCROLLING
     ──────────────────────────── */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
      }
    });
  });

  /* ────────────────────────────
     SCROLL TO TOP
     ──────────────────────────── */
  const scrollTopBtn = $('#scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ────────────────────────────
     PARALLAX HERO ORBS ON SCROLL
     ──────────────────────────── */
  const orbs = $$('.hero__orb');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      orb.style.marginTop = -(y * (i + 1) * 0.04) + 'px';
    });
  }, { passive: true });

  /* ────────────────────────────
     FLOATING PARTICLES (Money Heist paper confetti vibe)
     Canvas-based, subtle red/gold particles
     ──────────────────────────── */
  const particleContainer = $('#heroParticles');
  if (particleContainer) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
    particleContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 40;
    const colors = ['rgba(204,0,0,0.3)', 'rgba(196,163,90,0.2)', 'rgba(255,255,255,0.08)'];

    function resizeCanvas() {
      canvas.width = particleContainer.offsetWidth;
      canvas.height = particleContainer.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2
      };
    }
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.y > canvas.height + 10) { p.y = -10; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      // Draw faint connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(204,0,0,' + (0.04 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ────────────────────────────
     PROJECT MODULE HOVER EFFECTS
     ──────────────────────────── */
  $$('.pmod').forEach(mod => {
    const bar = mod.querySelector('.pmod__bar');
    mod.addEventListener('mouseenter', () => {
      bar.style.transition = 'box-shadow .2s, width .2s';
    });
    mod.addEventListener('mouseleave', () => {
      bar.style.transition = 'box-shadow .5s, width .3s';
    });
  });

  /* ────────────────────────────
     PAGE INIT
     ──────────────────────────── */
  window.addEventListener('load', () => {
    updateActiveNav();
    updateProgress();
  });

})();
