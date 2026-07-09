/* ============================================
   AFNAAN AHMED P — CINEMATIC ENGINE
   ============================================ */

(function () {
  "use strict";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. SMOOTH SCROLLING (Lenis)
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // 2. THEME SWITCHER
  const themeBtn = document.getElementById('theme-btn');
  const html = document.documentElement;
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
      }
    });
  }

  // 3. TEXT SPLITTING UTILITY
  const splitText = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.innerHTML; el.innerHTML = '';
      text.split('<br>').forEach((line, i, arr) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.display = 'inline-block';
        const temp = document.createElement('div'); temp.innerHTML = line;
        Array.from(temp.childNodes).forEach(node => {
          if(node.nodeType === 3) {
            node.textContent.split(' ').forEach(word => {
              if(!word) return;
              const wordDiv = document.createElement('div'); wordDiv.style.display = 'inline-block'; wordDiv.style.marginRight = '0.35em';
              word.split('').forEach(char => {
                const charSpan = document.createElement('span'); charSpan.className = 'char'; charSpan.style.display = 'inline-block'; charSpan.innerHTML = char;
                wordDiv.appendChild(charSpan);
              });
              lineDiv.appendChild(wordDiv);
            });
          }
        });
        el.appendChild(lineDiv);
        if(i < arr.length - 1) el.appendChild(document.createElement('br'));
      });
    });
  };

  // 4. CINEMATIC RANDOMIZED LOADER
  // 4. KINETIC MORPHING TITLE CARD LOADER
  const initLoader = () => {
    const loaderContainer = document.getElementById('loader-content-container');
    const loaderWrapper = document.getElementById('loader-wrapper');

    const loaderHtml = `
      <div class="kinetic-loader">
        <div class="kinetic-center">
          <div class="kinetic-letter-shield" id="kinetic-shield">A</div>
          <div class="kinetic-name-row" id="kinetic-name"></div>
          <div class="kinetic-progress-bar">
            <div class="kinetic-progress-fill" id="kinetic-progress"></div>
          </div>
        </div>
      </div>
    `;

    loaderContainer.innerHTML = loaderHtml;
    const shield = document.getElementById('kinetic-shield');
    const nameRow = document.getElementById('kinetic-name');
    const progressFill = document.getElementById('kinetic-progress');

    // Split target name: "AFNAAN AHMED P"
    const name = "AFNAAN AHMED P";
    nameRow.innerHTML = '';
    name.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'kinetic-char';
      span.innerText = char === ' ' ? '\u00A0' : char;
      nameRow.appendChild(span);
    });

    const chars = nameRow.querySelectorAll('.kinetic-char');

    // Initialize states
    gsap.set(chars, {
      opacity: 0,
      scale: 3,
      rotationY: 90,
      display: 'inline-block'
    });

    const tl = gsap.timeline({
      onComplete: () => {
        initHero();
        initMagicScroll();
        initBentoHover();
        initCinematicScenes();
      }
    });

    // 1. Zoom and pulse the central letter shield "A"
    tl.fromTo(shield, 
      { scale: 0.2, opacity: 0, rotationY: -180 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "elastic.out(1, 0.75)" }
    )
    .to(shield, {
      scale: 1.1,
      textShadow: '0 0 30px var(--accent-secondary)',
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })
    
    // 2. Morph: Shield collapses, name row staggers open in 3D Y-axis
    .to(shield, {
      scale: 0,
      opacity: 0,
      rotationY: 180,
      duration: 0.5,
      ease: "power3.in"
    })
    .to(progressFill, {
      width: '100%',
      duration: 1.8,
      ease: "power2.inOut"
    }, "-=0.2")
    .to(chars, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(2.2)"
    }, "-=1.5")
    
    // 3. Flash fade wrapper out
    .to(loaderWrapper, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.3");
  };

  // 5. CINEMATIC RANDOMIZED HERO
  const initHero = () => {
    const heroContainer = document.getElementById('hero-dynamic-container');
    const heroes = [
      {
        id: 'leo-movie',
        html: `
          <div class="leo-hero-container">
            <div class="leo-flash-screen" id="leo-flash-screen"></div>
            <div class="leo-slash" id="leo-slash"></div>
            <div class="leo-slash-2" id="leo-slash-2"></div>
            <div class="leo-logo-box" id="hero-logo-box">
              <div class="leo-line-1" id="hero-line-1"></div>
              <div class="leo-line-2" id="hero-line-2"></div>
            </div>
          </div>
        `,
        run: (htmlCode) => {
          heroContainer.innerHTML = htmlCode;
          const line1 = document.getElementById('hero-line-1');
          const line2 = document.getElementById('hero-line-2');
          const slash = document.getElementById('leo-slash');
          const slash2 = document.getElementById('leo-slash-2');
          const flashScreen = document.getElementById('leo-flash-screen');

          line1.innerHTML = '';
          line2.innerHTML = '';

          // Split "AFNAAN" into line 1
          "AFNAAN".split('').forEach(c => {
            const span = document.createElement('span');
            span.className = 'leo-char-1';
            span.innerText = c;
            line1.appendChild(span);
          });

          // Split "AHMED P" into line 2
          "AHMED P".split('').forEach(c => {
            const span = document.createElement('span');
            span.className = 'leo-char-2';
            span.innerText = c === ' ' ? '\u00A0' : c;
            line2.appendChild(span);
          });

          const chars1 = line1.querySelectorAll('.leo-char-1');
          const chars2 = line2.querySelectorAll('.leo-char-2');
          const allChars = [...chars1, ...chars2];

          // Initialize states in deep Z space with rotation
          allChars.forEach(span => {
            if (span.innerText === '\u00A0') return;
            gsap.set(span, {
              scale: 15,
              z: -1500,
              opacity: 0,
              filter: 'blur(30px)',
              rotationX: -90,
              rotationY: 45,
              rotationZ: -15,
              y: -50,
              transformOrigin: "50% 50% -150px"
            });
          });

          const triggerRumble = () => {
            document.body.classList.add('rumble');
            setTimeout(() => document.body.classList.remove('rumble'), 250);
          };

          const spawnSparks = (charEl) => {
            const container = document.querySelector('.leo-hero-container');
            if (!container || !charEl) return;
            const containerRect = container.getBoundingClientRect();
            const rect = charEl.getBoundingClientRect();

            // Center of slamming letter relative to container
            const cx = rect.left - containerRect.left + rect.width / 2;
            const cy = rect.top - containerRect.top + rect.height / 2;

            for (let i = 0; i < 20; i++) {
              const spark = document.createElement('div');
              spark.className = 'leo-spark';
              container.appendChild(spark);

              // Emulate metal impact spray (spawning outwards with physics-based gravity drag)
              const angle = Math.random() * Math.PI * 2;
              const force = 80 + Math.random() * 200;
              const tx = cx + Math.cos(angle) * force;
              const ty = cy + Math.sin(angle) * force + (100 + Math.random() * 150); // Gravity drop pull

              gsap.set(spark, {
                x: cx + (Math.random() - 0.5) * 12,
                y: cy + (Math.random() - 0.5) * 12,
                scale: Math.random() * 1.6 + 0.6
              });

              gsap.to(spark, {
                x: tx,
                y: ty,
                opacity: 0,
                scale: 0.05,
                duration: 0.6 + Math.random() * 0.6,
                ease: 'power3.out',
                onComplete: () => spark.remove()
              });
            }
          };

          const tl = gsap.timeline();

          // A. Cinematic screen flashes before the main cut
          tl.to(flashScreen, { opacity: 0.8, duration: 0.04 })
            .to(flashScreen, { opacity: 0, duration: 0.04 })
            .to(flashScreen, { opacity: 0.6, duration: 0.04, delay: 0.08 })
            .to(flashScreen, { opacity: 0, duration: 0.04 })
            
            // B. Crossed sword slashes
            .set(slash, { opacity: 1 })
            .fromTo(slash, 
              { left: '-120%' }, 
              { left: '120%', duration: 0.6, ease: 'power3.inOut', onStart: triggerRumble }
            )
            .to(slash, { opacity: 0, duration: 0.1 }, '-=0.1')
            .set(slash2, { opacity: 1 }, '-=0.3')
            .fromTo(slash2,
              { left: '-120%' },
              { left: '120%', duration: 0.6, ease: 'power3.inOut', onStart: triggerRumble },
              '-=0.3'
            )
            .to(slash2, { opacity: 0, duration: 0.1 }, '-=0.1')

            // C. Letters slam down with localized sparks and heavy 3D assembly
            .to(allChars, {
              scale: 1,
              z: 0,
              opacity: 1,
              filter: 'blur(0px)',
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              y: 0,
              duration: 0.7,
              stagger: {
                amount: 0.7,
                from: 'start',
                onStart: function() {
                  const targetChar = this.targets()[0];
                  if (targetChar && targetChar.innerText !== '\u00A0') {
                    triggerRumble();
                    spawnSparks(targetChar);
                  }
                }
              },
              ease: 'back.out(2.2)'
            }, '-=0.25')

            // D. Reveal aura, shockwave, scroll down indicator
            .call(() => {
              const wave = document.createElement('div');
              wave.className = 'shockwave';
              heroContainer.appendChild(wave);
              gsap.to(wave, { scale: 8, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => wave.remove() });
              triggerRumble();
            })
            .to('.hero-glow', { opacity: 0.95, scale: 2.2, duration: 1.2, ease: 'power2.out' }, '-=0.2')
            .to('.scroll-down-indicator', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
        }
      },
      {
        id: 'cyber-decrypt',
        html: `
          <div class="decoder-hero-container" id="hero-decoder-text" style="position:relative;">
            <div class="cyber-scanner-line" id="hero-scanner"></div>
            <!-- Character spans will be injected dynamically -->
          </div>
        `,
        run: (htmlCode) => {
          heroContainer.innerHTML = htmlCode;
          const textEl = document.getElementById('hero-decoder-text');
          const scanner = document.getElementById('hero-scanner');
          const originalText = "AFNAAN AHMED P";
          
          textEl.innerHTML = '';
          textEl.appendChild(scanner);

          // Build character cards
          const spans = [];
          originalText.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'decoder-char';
            span.style.opacity = '0';
            span.innerText = char === ' ' ? '\u00A0' : '#';
            textEl.appendChild(span);
            spans.push({ el: span, final: char });
          });

          // Scanner sweep animation
          gsap.set(scanner, { left: '0%', opacity: 1 });
          const tl = gsap.timeline();
          tl.to(scanner, {
            left: '100%',
            duration: 2.0,
            ease: 'power2.inOut',
            onUpdate: function() {
              const progress = this.progress();
              const activeIndex = Math.floor(progress * spans.length);
              
              spans.forEach((s, idx) => {
                if (idx <= activeIndex) {
                  s.el.innerText = s.final === ' ' ? '\u00A0' : s.final;
                  s.el.style.opacity = '1';
                  s.el.style.color = 'var(--fg)';
                  s.el.style.textShadow = '0 0 15px var(--accent)';
                } else if (s.final !== ' ') {
                  s.el.innerText = String.fromCharCode(33 + Math.floor(Math.random() * 93));
                  s.el.style.opacity = '0.5';
                  s.el.style.color = 'var(--accent)';
                }
              });
            }
          })
          .to(scanner, { opacity: 0, duration: 0.3 })
          .to('.hero-glow', { opacity: 0.6, scale: 1.6, duration: 1.0 }, '-=0.5')
          .to('.scroll-down-indicator', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
        }
      },
      {
        id: '3d-shatter',
        html: `
          <div class="shatter-hero-container" id="hero-shatter-text" style="perspective:1000px; transform-style:preserve-3d;">
            <!-- Letters split and styled for 3D snap -->
          </div>
        `,
        run: (htmlCode) => {
          heroContainer.innerHTML = htmlCode;
          const textEl = document.getElementById('hero-shatter-text');
          const originalText = "AFNAAN AHMED P";

          textEl.innerHTML = '';
          const chars = originalText.split('');
          chars.forEach(c => {
            const span = document.createElement('span');
            span.className = 'shatter-char';
            span.style.display = 'inline-block';
            span.style.transformStyle = 'preserve-3d';
            span.innerText = c === ' ' ? '\u00A0' : c;
            textEl.appendChild(span);
          });

          const spanEls = textEl.querySelectorAll('.shatter-char');

          // Scatter characters in deep Z space
          spanEls.forEach(span => {
            if (span.innerText === '\u00A0') return;
            const rx = (Math.random() - 0.5) * 600;
            const ry = (Math.random() - 0.5) * 600;
            const rz = -1200 - Math.random() * 800;
            const rotX = (Math.random() - 0.5) * 720;
            const rotY = (Math.random() - 0.5) * 720;

            gsap.set(span, {
              x: rx,
              y: ry,
              z: rz,
              rotationX: rotX,
              rotationY: rotY,
              opacity: 0,
              filter: 'blur(20px)'
            });
          });

          const triggerRumble = () => {
            document.body.classList.add('rumble');
            setTimeout(() => document.body.classList.remove('rumble'), 250);
          };

          const tl = gsap.timeline();
          tl.to(spanEls, {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.8,
            stagger: {
              amount: 0.8,
              from: 'random'
            },
            ease: 'elastic.out(1.0, 0.75)',
            onComplete: () => {
              triggerRumble();
              // Create dynamic shockwave circle
              const wave = document.createElement('div');
              wave.className = 'shockwave';
              heroContainer.appendChild(wave);
              gsap.to(wave, { scale: 8, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => wave.remove() });
            }
          })
          .to('.hero-glow', { opacity: 0.7, scale: 2.0, duration: 1.0 }, '-=0.5')
          .to('.scroll-down-indicator', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
        }
      }
    ];

    splitText('.split-hero');
    gsap.set('.split-hero .char', { opacity: 0, y: 30 });
    
    // Subtitle reveal
    gsap.to('.split-hero .char', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: { amount: 0.4, from: 'center' },
      ease: 'power3.out'
    });

    const chosenHero = heroes.find(h => h.id === 'leo-movie') || heroes[0];
    chosenHero.run(chosenHero.html);
  };

  // 6. MAGIC SCROLL TITLE INTERACTION (BUG-FREE & NO OVERLAPS)
  const initMagicScroll = () => {
    // Single robust ScrollTrigger for each section to handle the sticky section title card reveal
    gsap.utils.toArray('.content-section').forEach(section => {
      const title = section.querySelector('.magic-title');
      if (!title) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 90%', // Starts fading in when section top enters viewport
          end: 'top 0%',   // Fully vanishes when section top hits the viewport top
          scrub: true
        }
      });

      tl.fromTo(title,
        { opacity: 0, scale: 0.85, filter: 'blur(12px)', y: 40 },
        { opacity: 0.95, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.35, ease: 'power2.out' }
      )
      .to({}, { duration: 0.25 }) // Keep it completely visible and static in the center
      .to(title, {
        opacity: 0,
        scale: 1.12,
        filter: 'blur(20px)',
        y: -90,
        duration: 0.4,
        ease: 'power2.in'
      });
    });

    // Stagger Entrance for Bento Cards and inner tags
    gsap.utils.toArray('.bento-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.bento-card');
      
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid, start: 'top 85%' }
      });
      
      tl.fromTo(cards, 
        { opacity: 0, y: 50, scale: 0.95, rotationX: 10 }, 
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
      
      const tags = grid.querySelectorAll('.bento-tag');
      tl.fromTo(tags,
        { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.02, ease: "back.out(1.5)" },
        '-=0.4'
      );
    });

    // Stagger slide-in for resume items
    gsap.utils.toArray('.resume-item').forEach(el => {
      gsap.fromTo(el, { opacity: 0, x: -30 }, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        opacity: 1, x: 0, duration: 1, ease: 'power2.out'
      });
    });

    // 3D slide-up transitions for project blocks
    gsap.utils.toArray('.project-block').forEach(block => {
      gsap.fromTo(block, 
        { opacity: 0, y: 70, rotationX: 8, transformPerspective: 1000 }, 
        {
          scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, rotationX: 0, duration: 1.0, ease: 'power2.out'
        }
      );
    });

    // 3D slide-up transitions for glass cards
    gsap.utils.toArray('.glass-card').forEach(card => {
      gsap.fromTo(card, 
        { opacity: 0, y: 60, rotationX: 8, transformPerspective: 1000 }, 
        {
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, rotationX: 0, duration: 1.0, ease: 'power2.out'
        }
      );
    });

    // General fade-up for other elements
    gsap.utils.toArray('.fade-up:not(.glass-card):not(.project-block)').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
      });
    });
  };

  // 7. HIGH-LEVEL INTERACTIVE BENTO GRID (3D TILT & GLOW CURSOR TETHER)
  const initBentoHover = () => {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Pass coordinates to CSS custom properties
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Calculate rotation angles based on cursor offset from card center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -(y - centerY) / (rect.height / 12); // subtle rotation
        const rotateY = (x - centerX) / (rect.width / 12);

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          scale: 1.02,
          y: -8,
          duration: 0.25,
          ease: 'power1.out'
        });

        // Magnetic Parallax pull for the tags inside this card
        const tags = card.querySelectorAll('.bento-tag');
        tags.forEach(tag => {
          const depthX = (x - centerX) * 0.08;
          const depthY = (y - centerY) * 0.08;
          gsap.to(tag, {
            x: depthX,
            y: depthY,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });

        // Reset magnetic offsets
        const tags = card.querySelectorAll('.bento-tag');
        tags.forEach(tag => {
          gsap.to(tag, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    });

    // Scroll Progress bar updater
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = scrolled + "%";
    });
  };

  // 8. HYPER-DETAILED CINEMATIC SCENES (SVGs)
  const initCinematicScenes = () => {
    if (prefersReducedMotion) return;

    // A. ANEMIA DETECTION (The Zoom & Color Shift Scene)
    const anemiaTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-anemia', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });

    // Setup initial state
    gsap.set('#nailbed', { fill: '#FFB6C1' });
    gsap.set('#laser-glow-group', { y: 80, opacity: 0 });
    gsap.set('#anemia-zoom-view', { opacity: 0 });
    gsap.set('#anemia-hud', { opacity: 0 });
    gsap.set(['#an-log-1', '#an-log-2', '#an-log-3', '#an-log-4', '#an-log-result'], { opacity: 0 });

    anemiaTl
      .to('#anemia-scene', { scale: 1.5, x: -150, y: -50, duration: 1.5, ease: "power2.inOut" })
      .to('#anemia-zoom-view', { opacity: 1, duration: 0.8 }, "-=0.5")
      .to('#anemia-hud', { opacity: 1, duration: 0.5 }, "-=0.3")
      .to('#an-log-1', { opacity: 1, duration: 0.2 })
      .to('#anemia-reticle', { rotation: 180, duration: 1.5, ease: "power1.inOut" }, "-=0.2")
      .to('#laser-glow-group', { opacity: 1, duration: 0.2 })
      .to('#an-log-2', { opacity: 1, duration: 0.2 })
      .to('#laser-glow-group', { y: 420, duration: 2, ease: "none" })
      .to('#nailbed', { fill: '#F5F5DC', duration: 1.5, ease: "power1.inOut" }, "-=1.8")
      .to('#an-log-3', { opacity: 1, duration: 0.2 }, "-=0.5")
      .to('#laser-glow-group', { opacity: 0, duration: 0.3 })
      .to('#an-log-4', { opacity: 1, duration: 0.2 })
      .to('#an-log-result', { opacity: 1, duration: 0.4 })
      .to('#an-log-result', { opacity: 0.2, duration: 0.2, repeat: 5, yoyo: true })
      .to({}, { duration: 3.5 })
      .to(['#anemia-zoom-view', '#anemia-hud'], { opacity: 0, duration: 1 })
      .to('#anemia-scene', { scale: 1, x: 0, y: 0, duration: 1.2, ease: "power2.inOut" })
      .set('#nailbed', { fill: '#FFB6C1' })
      .set('#laser-glow-group', { y: 80, opacity: 0 });

    // B. ATCC VPARK
    gsap.registerPlugin(MotionPathPlugin);
    const vparkTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-vpark', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });
    vparkTl
      .to('#vpark-car', {
          duration: 3, ease: "power1.inOut",
          motionPath: { path: "#vpark-car-path", align: "#vpark-car-path", alignOrigin: [0.5, 0.5], autoRotate: true }
      })
      .to('#vpark-yolo', { opacity: 1, duration: 0.2 }, 1)
      .to('#vpark-yolo', { opacity: 0, duration: 0.2 }, 3.5)
      .to('#vpark-guide', { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 1.5)
      .to('#vpark-ui', { opacity: 1, duration: 0.5 }, 3)
      .to({}, { duration: 3 })
      .to(['#vpark-ui', '#vpark-guide'], { opacity: 0, duration: 1 })
      .set('#vpark-guide', { strokeDashoffset: 1000 })
      .set('#vpark-car', { x: -100, y: 300, rotation: 0 });

    // C. LEXCLOUD AWS DATA FLOW
    const lexTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-lexcloud', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 1.5
    });
    gsap.to('#lex-ring', { rotation: 360, duration: 10, ease: "none", repeat: -1, transformOrigin: "500px 200px" });

    lexTl
      .to('#lex-packet-doc', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-doc', { x: 380, y: 200, duration: 1, ease: "power1.inOut" })
      .to('#lex-packet-doc', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-doc', { x: 380, y: 200, opacity: 1 })
      .to('#lex-packet-doc', { y: 400, duration: 0.8, ease: "power1.inOut" })
      .to('#lex-packet-doc', { opacity: 0, duration: 0.1 })
      .to('#lex-packet-db', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-db', { x: 620, duration: 1, ease: "power1.inOut" })
      .to('#lex-packet-db', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-db', { x: 380 })
      .to('#lex-packet-llama', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-llama', { x: 620, y: 200, duration: 1, ease: "power1.inOut" })
      .to('#lex-packet-llama', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-llama', { x: 380, y: 400 })
      .to('#lex-llama-pulse', { opacity: 0.8, scale: 1.5, duration: 0.5, ease: "power1.out" })
      .to('#lex-llama-pulse', { opacity: 0, scale: 2.2, duration: 0.5, ease: "power1.in" }, "-=0.2")
      .to('#lex-overlay', { opacity: 1, duration: 0.5 })
      .to('#lex-packet-resp', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-resp', { x: 150, y: 300, duration: 1.5, ease: "power1.inOut" })
      .to('#lex-packet-resp', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-resp', { x: 620, y: 200 })
      .to({}, { duration: 3 })
      .to('#lex-overlay', { opacity: 0, duration: 0.5 });

    // D. SEPSIS PREDICTION
    const sepsisTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-sepsis', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });
    gsap.to('#sepsis-pulse-line', { strokeDashoffset: -120, duration: 2, ease: "none", repeat: -1 });

    sepsisTl
      .to('#sepsis-features', { opacity: 1, y: -20, duration: 0.8 })
      .to('#sepsis-tree-node', { opacity: 1, duration: 0.8 })
      .to('#tree-root', { scale: 1.15, stroke: 'var(--accent)', duration: 0.5 })
      .to('#tree-root', { scale: 1, duration: 0.2 })
      .to('#tree-left', { scale: 1.15, stroke: 'var(--accent)', duration: 0.5 })
      .to('#tree-left', { scale: 1, duration: 0.2 })
      .to('#tree-leaf-1', { scale: 1.15, stroke: '#EF4444', duration: 0.5 })
      .to('#tree-leaf-1', { scale: 1, duration: 0.2 })
      .to('#sepsis-shap', { opacity: 1, y: -10, duration: 0.5 })
      .to({}, { duration: 4.5 })
      .to(['#sepsis-features', '#sepsis-tree-node', '#sepsis-shap'], { opacity: 0, duration: 0.8 })
      .set(['#tree-root', '#tree-left', '#tree-leaf-1'], { scale: 1, stroke: '' });
  };

  // 12. MAGNETIC MICRO-INTERACTIONS (Emil Kowalski style)
  const initMagneticElements = () => {
    const magnetics = document.querySelectorAll('.theme-btn, .social-btn, .contact-value.link');
    
    magnetics.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        
        gsap.to(el, {
          x: dx * 0.35,
          y: dy * 0.35,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1.1, 0.4)"
        });
      });
    });
  };

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initLoader(); // Run loader -> hero -> animations sequentially
    initMagneticElements();
  });
})();
