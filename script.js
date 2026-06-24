/* ============================================
   AFNAAN AHMED P — PORTFOLIO JS
   All interactivity: cursor, spotlight, scroll
   animations, typing, counters, terminal, nav
   ============================================ */

(function () {
  'use strict';

  // ── Utilities ──
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const lerp = (a, b, t) => a + (b - a) * t;

  // ── Custom Cursor ──
  const cursorGlow = $('#cursorGlow');
  const spotlight = $('#mouseSpotlight');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let spotX = 0, spotY = 0;
  const isMobile = window.matchMedia('(max-width: 600px)').matches || 'ontouchstart' in window;

  if (!isMobile) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Hover detection for magnetic elements and links
    const hoverTargets = 'a, button, .btn, .magnetic, .skill-tag, .project-panel__link, .contact__link, .legend-item';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) {
        cursorGlow.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) {
        cursorGlow.classList.remove('hovering');
      }
    });

    // Smooth cursor animation loop
    function animateCursor() {
      cursorX = lerp(cursorX, mouseX, 0.15);
      cursorY = lerp(cursorY, mouseY, 0.15);
      spotX = lerp(spotX, mouseX, 0.08);
      spotY = lerp(spotY, mouseY, 0.08);

      cursorGlow.style.left = cursorX + 'px';
      cursorGlow.style.top = cursorY + 'px';
      spotlight.style.left = spotX + 'px';
      spotlight.style.top = spotY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ── Magnetic Effect ──
  if (!isMobile) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ── Navigation ──
  const nav = $('#nav');
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  const navLinks = $$('.nav__link');
  const sections = $$('section[id]');

  // Scroll — add glass effect to nav
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  $$('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
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

  // ── Hero Role Typing Effect ──
  const roles = [
    'production APIs',
    'ML pipelines',
    'real-time systems',
    'AI applications',
    'cloud infrastructure',
    'full-stack products'
  ];
  const heroRole = $('#heroRole');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeRole() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      heroRole.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause before deleting
      } else {
        typeSpeed = 60 + Math.random() * 40;
      }
    } else {
      heroRole.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before next word
      } else {
        typeSpeed = 30;
      }
    }

    setTimeout(typeRole, typeSpeed);
  }
  setTimeout(typeRole, 1800);

  // ── Stat Counter Animation ──
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target;
          const target = parseInt(numEl.dataset.target);
          const suffix = numEl.dataset.suffix || '';
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            numEl.textContent = current + suffix;

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

  // ── Terminal Entries Animation ──
  const terminalObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const terminal = entry.target;
          const termEntries = $$('.terminal__entry', terminal);
          const endLine = $('.terminal__line--end', terminal);

          termEntries.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, (i + 1) * 500);
          });

          if (endLine) {
            setTimeout(() => {
              endLine.style.opacity = '1';
            }, (termEntries.length + 1) * 500);
          }

          terminalObserver.unobserve(terminal);
        }
      });
    },
    { threshold: 0.2 }
  );
  const terminalEl = $('#terminal');
  if (terminalEl) terminalObserver.observe(terminalEl);

  // Initially hide the end line
  const endLine = $('.terminal__line--end');
  if (endLine) endLine.style.opacity = '0';

  // ── Scroll to Top ──
  const scrollTopBtn = $('#scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Skill Constellation — Mouse Parallax ──
  if (!isMobile) {
    const constellation = $('#skillsConstellation');
    if (constellation) {
      constellation.addEventListener('mousemove', e => {
        const rect = constellation.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        $$('.skill-tag', constellation).forEach(tag => {
          const speed = parseFloat(getComputedStyle(tag).getPropertyValue('--drift')) || 15;
          const factor = speed / 15;
          tag.style.transform = `translate(${x * 15 * factor}px, ${y * 10 * factor}px)`;
        });
      });

      constellation.addEventListener('mouseleave', () => {
        $$('.skill-tag', constellation).forEach(tag => {
          tag.style.transform = '';
        });
      });
    }
  }

  // ── Legend Category Hover Highlight ──
  $$('.legend-item').forEach(legend => {
    const cat = legend.dataset.category;

    legend.addEventListener('mouseenter', () => {
      $$('.skill-tag').forEach(tag => {
        if (tag.dataset.category === cat) {
          tag.style.transform = 'scale(1.12)';
          tag.style.zIndex = '10';
        } else {
          tag.style.opacity = '0.2';
        }
      });
    });

    legend.addEventListener('mouseleave', () => {
      $$('.skill-tag').forEach(tag => {
        tag.style.transform = '';
        tag.style.zIndex = '';
        tag.style.opacity = '';
      });
    });
  });

  // ── Project Panel Sticky Scale Effect ──
  function updateProjectPanels() {
    const panels = $$('.project-panel');
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;

    panels.forEach((panel, i) => {
      const rect = panel.getBoundingClientRect();
      const stickyTop = navH + 20;

      // When panel is stuck at top
      if (rect.top <= stickyTop + 5 && i < panels.length - 1) {
        // Calculate how far the next panel has pushed this one
        const nextPanel = panels[i + 1];
        if (nextPanel) {
          const nextRect = nextPanel.getBoundingClientRect();
          const overlap = stickyTop + rect.height - nextRect.top;

          if (overlap > 0) {
            const progress = Math.min(overlap / rect.height, 1);
            const scale = 1 - progress * 0.04;
            const opacity = 1 - progress * 0.5;
            panel.querySelector('.project-panel__inner').style.transform = `scale(${scale})`;
            panel.querySelector('.project-panel__inner').style.opacity = opacity;
          } else {
            panel.querySelector('.project-panel__inner').style.transform = '';
            panel.querySelector('.project-panel__inner').style.opacity = '';
          }
        }
      } else {
        panel.querySelector('.project-panel__inner').style.transform = '';
        panel.querySelector('.project-panel__inner').style.opacity = '';
      }
    });
  }
  window.addEventListener('scroll', updateProjectPanels, { passive: true });

  // ── Smooth Anchor Scrolling ──
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        const top = target.offsetTop - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Page Load ──
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Trigger initial nav check
    updateActiveNav();
  });

})();
