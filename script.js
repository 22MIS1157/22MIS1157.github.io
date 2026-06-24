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

  const isMobile = window.matchMedia('(max-width: 600px)').matches || 'ontouchstart' in window;

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

  // ── Scroll-Linked Blueprint Pipeline Path ──
  const projectsSection = $('#projects');
  const activePipelinePath = $('#activePipelinePath');

  if (projectsSection && activePipelinePath) {
    const pathLength = activePipelinePath.getTotalLength();
    activePipelinePath.style.strokeDasharray = pathLength;
    activePipelinePath.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
      const rect = projectsSection.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const startY = rect.top - viewHeight / 2;
      const scrollableHeight = rect.height;
      let progress = -startY / (scrollableHeight - viewHeight / 2);
      progress = Math.max(0, Math.min(1, progress));

      activePipelinePath.style.strokeDashoffset = pathLength - (progress * pathLength);
    }, { passive: true });
  }

  // ── Telemetry Dials Scroll Reveal ──
  const gaugeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const project = entry.target;
          $$('.gauge-fill', project).forEach(fill => {
            const val = parseInt(fill.dataset.value) || 0;
            // Total circumference is 2 * PI * r = 2 * 3.14159 * 40 = 251.2
            const offset = 251.2 * (1 - val / 100);
            fill.style.strokeDashoffset = offset;
          });
          gaugeObserver.unobserve(project);
        }
      });
    },
    { threshold: 0.15 }
  );
  $$('.schematic-project').forEach(p => gaugeObserver.observe(p));

  // ── Flowchart Hover Interaction & Debug Log Simulator ──
  $$('.schematic-project').forEach(project => {
    const nodes = $$('.flow-node', project);
    const dynamicLog = $('.c-dynamic', project);
    let typingTimeout;

    function typeLogText(text) {
      clearTimeout(typingTimeout);
      dynamicLog.textContent = '';
      let charIdx = 0;
      function type() {
        if (charIdx < text.length) {
          dynamicLog.textContent += text.charAt(charIdx);
          charIdx++;
          typingTimeout = setTimeout(type, 12);
        }
      }
      type();
    }

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        const desc = node.dataset.desc;
        const nodeName = node.dataset.node.toUpperCase();
        if (desc && dynamicLog) {
          typeLogText(`[TRACE // ${nodeName}] ${desc}`);
        }
      });
    });
  });

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
