/* ============================================
   AFNAAN AHMED P — ULTRA-PREMIUM PORTFOLIO
   Lenis Scroll + GSAP + Custom Canvas Animations
   ============================================ */

(function () {
  "use strict";

  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. LENIS SMOOTH SCROLL SETUP
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // 2. TEXT SCRAMBLE CLASS FOR LOADER
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="color:var(--accent-1);">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // 3. LOADER & REVEAL CHOREOGRAPHY
  const initLoader = () => {
    if (prefersReducedMotion) {
      document.getElementById("loader").style.display = "none";
      initScrollTriggers();
      return;
    }
    
    // Stop scrolling while loading
    if(lenis) lenis.stop();

    const loaderTextEl = document.getElementById('loaderText');
    const loaderBar = document.getElementById('loaderBar');
    const slices = document.querySelectorAll('.loader__slice');
    
    const fx = new TextScramble(loaderTextEl);
    
    // Fake loading progress
    gsap.to(loaderBar, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut'
    });

    // Scramble sequence
    const phrases = [
      'BOOTING_SYSTEM...',
      'LOADING_ASSETS...',
      'AFNAAN AHMED P.'
    ];

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        if (counter < phrases.length - 1) {
          counter++;
          setTimeout(next, 800);
        } else {
          // Final Loader Exit Animation
          const tl = gsap.timeline({
            onComplete: () => {
              document.getElementById("loader").style.display = "none";
              if(lenis) lenis.start();
              initScrollTriggers();
            }
          });

          tl.to(loaderTextEl, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in'
          }, "+=0.5")
          .to('.loader__progress', {
            opacity: 0,
            duration: 0.3
          }, "<")
          // The Curtain Split
          .to(slices, {
            yPercent: (i) => i % 2 === 0 ? -100 : 100, // Alternate up/down
            duration: 1.2,
            ease: 'power4.inOut',
            stagger: 0.1
          }, "+=0.2")
          // Hero entrance
          .from('.hero-greeting .reveal-text', { yPercent: 110, duration: 0.8, ease: 'power3.out' }, "-=0.8")
          .from('.hero-name .reveal-text', { yPercent: 110, duration: 0.8, ease: 'power3.out' }, "-=0.6")
          .from('.hero-role .reveal-text', { yPercent: 110, duration: 0.8, ease: 'power3.out' }, "-=0.5")
          .from('.hero-desc .reveal-text', { yPercent: 110, duration: 0.8, ease: 'power3.out' }, "-=0.4")
          .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4")
          .to('.hero-scroll-indicator', { opacity: 1, duration: 1 }, "-=0.2");
        }
      });
    };
    
    setTimeout(next, 500);
  };

  // 4. GSAP SCROLL TRIGGERS & PINNED HORIZONTAL
  const initScrollTriggers = () => {
    if (prefersReducedMotion) return;

    // Text Reveals
    const revealTexts = document.querySelectorAll('.section-title .reveal-text, .horizontal-spacer h2 .reveal-text');
    revealTexts.forEach((text) => {
      gsap.to(text, {
        scrollTrigger: {
          trigger: text.closest('.section-title') || text.closest('.horizontal-spacer'),
          start: "top 85%",
        },
        yPercent: -110, // from translateY(110%) to 0
        duration: 1,
        ease: 'power3.out'
      });
    });

    const revealParas = document.querySelectorAll('.reveal-para');
    revealParas.forEach((para) => {
      gsap.from(para, {
        scrollTrigger: {
          trigger: para,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Number counters
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      gsap.to(stat, {
        scrollTrigger: {
          trigger: '.about-stats',
          start: "top 85%",
        },
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        onUpdate: function() {
          stat.innerHTML = Math.round(this.targets()[0].innerHTML) + "+";
        }
      });
    });

    // --- PINNED HORIZONTAL SCROLL FOR PROJECTS ---
    const horizontalTrack = document.getElementById('horizontalTrack');
    const horizontalSection = document.getElementById('projects');
    
    if (horizontalTrack && horizontalSection) {
      // Calculate how far to move: track width - window width
      let getToValue = () => -(horizontalTrack.scrollWidth - window.innerWidth);
      
      gsap.to(horizontalTrack, {
        x: getToValue,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          start: "top top",
          end: () => "+=" + (horizontalTrack.scrollWidth - window.innerWidth),
        }
      });
    }
  };

  // 5. THEME TOGGLE LOGIC
  const initTheme = () => {
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
      document.body.classList.add('light-theme');
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      let theme = 'dark';
      if (document.body.classList.contains('light-theme')) {
        theme = 'light';
      }
      localStorage.setItem('theme', theme);
    });
  };

  // 6. CANVAS ANIMATIONS (SIMULATIONS)
  const initCanvas = () => {
    // Basic setup function for all canvases
    const setupCanvas = (id) => {
      const cvs = document.getElementById(id);
      if (!cvs) return null;
      const ctx = cvs.getContext('2d');
      const resize = () => {
        cvs.width = cvs.parentElement.clientWidth;
        cvs.height = cvs.parentElement.clientHeight;
      };
      window.addEventListener('resize', resize);
      resize();
      return { cvs, ctx, w: () => cvs.width, h: () => cvs.height };
    };

    // V-Park (Grid/Nodes)
    const vpark = setupCanvas('vparkCanvas');
    if (vpark) {
      let t = 0;
      const draw = () => {
        vpark.ctx.fillStyle = document.body.classList.contains('light-theme') ? '#f0f0f0' : '#050505';
        vpark.ctx.fillRect(0, 0, vpark.w(), vpark.h());
        vpark.ctx.strokeStyle = document.body.classList.contains('light-theme') ? 'rgba(0,0,0,0.1)' : 'rgba(0, 229, 255, 0.2)';
        vpark.ctx.lineWidth = 2;
        
        const size = 50;
        const offsetX = (t * 0.5) % size;
        const offsetY = (t * 0.5) % size;
        
        vpark.ctx.beginPath();
        for (let x = offsetX; x < vpark.w(); x += size) {
          vpark.ctx.moveTo(x, 0); vpark.ctx.lineTo(x, vpark.h());
        }
        for (let y = offsetY; y < vpark.h(); y += size) {
          vpark.ctx.moveTo(0, y); vpark.ctx.lineTo(vpark.w(), y);
        }
        vpark.ctx.stroke();
        t++;
        requestAnimationFrame(draw);
      };
      draw();
    }

    // Anemia (Pulse/Wave)
    const anemia = setupCanvas('anemiaCanvas');
    if (anemia) {
      let t = 0;
      const draw = () => {
        anemia.ctx.fillStyle = document.body.classList.contains('light-theme') ? '#e0e5ec' : '#0a0a0f';
        anemia.ctx.fillRect(0, 0, anemia.w(), anemia.h());
        anemia.ctx.strokeStyle = document.body.classList.contains('light-theme') ? '#FF2D55' : '#FF006E';
        anemia.ctx.lineWidth = 3;
        anemia.ctx.beginPath();
        for (let x = 0; x < anemia.w(); x += 5) {
          const y = anemia.h() / 2 + Math.sin((x + t) * 0.02) * 50 * Math.sin(t * 0.05);
          if (x === 0) anemia.ctx.moveTo(x, y);
          else anemia.ctx.lineTo(x, y);
        }
        anemia.ctx.stroke();
        t += 2;
        requestAnimationFrame(draw);
      };
      draw();
    }

    // LexCloud (Data Stream)
    const lex = setupCanvas('lexcloudCanvas');
    if (lex) {
      const drops = [];
      for (let i = 0; i < 100; i++) drops.push({ x: Math.random(), y: Math.random(), speed: Math.random() * 0.02 + 0.01 });
      const draw = () => {
        lex.ctx.fillStyle = document.body.classList.contains('light-theme') ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
        lex.ctx.fillRect(0, 0, lex.w(), lex.h());
        lex.ctx.fillStyle = document.body.classList.contains('light-theme') ? '#007AFF' : '#00E5FF';
        lex.ctx.font = '14px monospace';
        drops.forEach(d => {
          lex.ctx.fillText(Math.random() > 0.5 ? '1' : '0', d.x * lex.w(), d.y * lex.h());
          d.y += d.speed;
          if (d.y > 1) d.y = 0;
        });
        requestAnimationFrame(draw);
      };
      draw();
    }

    // Sepsis (Scatter Plot/Tree)
    const sepsis = setupCanvas('sepsisCanvas');
    if (sepsis) {
      const points = Array.from({length: 50}, () => ({x: Math.random(), y: Math.random(), vx: (Math.random()-0.5)*0.01, vy: (Math.random()-0.5)*0.01}));
      const draw = () => {
        sepsis.ctx.fillStyle = document.body.classList.contains('light-theme') ? '#f5f5f7' : '#050507';
        sepsis.ctx.fillRect(0, 0, sepsis.w(), sepsis.h());
        points.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if(p.x < 0 || p.x > 1) p.vx *= -1;
          if(p.y < 0 || p.y > 1) p.vy *= -1;
          sepsis.ctx.beginPath();
          sepsis.ctx.arc(p.x * sepsis.w(), p.y * sepsis.h(), 3, 0, Math.PI*2);
          sepsis.ctx.fillStyle = document.body.classList.contains('light-theme') ? '#1d1d1f' : '#fff';
          sepsis.ctx.fill();
        });
        sepsis.ctx.strokeStyle = document.body.classList.contains('light-theme') ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
        for(let i=0; i<points.length; i++) {
          for(let j=i+1; j<points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            if(dx*dx + dy*dy < 0.02) {
              sepsis.ctx.beginPath();
              sepsis.ctx.moveTo(points[i].x*sepsis.w(), points[i].y*sepsis.h());
              sepsis.ctx.lineTo(points[j].x*sepsis.w(), points[j].y*sepsis.h());
              sepsis.ctx.stroke();
            }
          }
        }
        requestAnimationFrame(draw);
      };
      draw();
    }
  };

  // 7. MAGNETIC BUTTONS (Basic Implementation without custom cursor)
  const initMagneticButtons = () => {
    if (prefersReducedMotion) return;
    const magnets = document.querySelectorAll('.magnetic-btn');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  };

  // INIT ALL
  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initCanvas();
    initMagneticButtons();
    initLoader(); // Triggers scroll triggers after load
  });

})();
