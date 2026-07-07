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
  const themeSwitch = document.getElementById('checkbox');
  const html = document.documentElement;
  themeSwitch.addEventListener('change', (e) => {
    if(e.target.checked) html.setAttribute('data-theme', 'light');
    else html.setAttribute('data-theme', 'dark');
  });

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

  // 4. ADVANCED CYBER-HUD LOADER
  const initLoader = () => {
    const loaderPercent = document.getElementById('loader-percent');
    const progressBar = document.getElementById('progress-bar');
    const loaderWrapper = document.getElementById('loader-wrapper');
    const hud = document.querySelector('.holographic-hud');

    let percent = 0;
    const duration = 2800; // 2.8s loader
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const updateLoader = () => {
      percent = Math.min(100, percent + increment);
      const roundedPercent = Math.floor(percent);
      loaderPercent.innerText = roundedPercent;
      progressBar.style.width = roundedPercent + '%';

      if (percent < 100) {
        setTimeout(updateLoader, intervalTime);
      } else {
        // Core collapse transition
        gsap.timeline()
          .to(hud, { scale: 0.1, rotation: 360, opacity: 0, duration: 0.6, ease: "back.in(2)" })
          .to(loaderWrapper, { autoAlpha: 0, duration: 0.8, ease: "power2.out" }, "-=0.2")
          .call(() => {
            initHero();
            initMagicScroll();
            initCinematicScenes();
            initMagneticSkills();
          });
      }
    };

    updateLoader();
  };

  // 5. HERO ENTRANCE (MAGNETIC MATRIX SHATTER REVEAL)
  const initHero = () => {
    splitText('.split-hero');
    splitText('.split-name');

    const chars = document.querySelectorAll('.split-name .char');

    // Scatter characters randomly in 3D Space
    chars.forEach((char, index) => {
      const scatterX = (Math.random() - 0.5) * 800;
      const scatterY = (Math.random() - 0.5) * 500;
      const scatterZ = -500 - Math.random() * 500;
      const scatterRot = (Math.random() - 0.5) * 360;
      const scatterSkew = (Math.random() - 0.5) * 90;

      gsap.set(char, {
        x: scatterX,
        y: scatterY,
        z: scatterZ,
        rotationX: scatterRot,
        rotationY: scatterRot,
        skewX: scatterSkew,
        opacity: 0,
        filter: "blur(20px)"
      });
    });

    gsap.set('.split-hero .char', { opacity: 0, y: 30 });
    gsap.set('.hero-neon-beam', { xPercent: -100, width: '100%', opacity: 1 });

    const tl = gsap.timeline();

    // Laser bar sweeps across name container
    tl.to('.hero-neon-beam', {
      xPercent: 100,
      duration: 1.6,
      ease: 'power2.inOut'
    })
    // Characters snap into place stagger-linked to the sweep
    .to(chars, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      skewX: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.5,
      stagger: {
        amount: 1.1,
        from: 'left'
      },
      ease: 'elastic.out(1, 0.75)'
    }, "-=1.4")
    .to('.hero-neon-beam', {
      opacity: 0,
      duration: 0.4
    }, "-=0.4")
    .to('.split-hero .char', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: { amount: 0.4, from: 'center' },
      ease: 'power3.out'
    }, "-=0.8")
    .to('.hero-glow', {
      opacity: 0.6,
      scale: 1.8,
      duration: 2,
      ease: 'power2.out'
    }, "-=1.5")
    .to('.scroll-down-indicator', {
      opacity: 1,
      y: 0,
      duration: 1
    }, "-=1");
  };

  // 6. MAGIC SCROLL TITLE INTERACTION
  const initMagicScroll = () => {
    gsap.utils.toArray('.magic-title-container').forEach(container => {
      const title = container.querySelector('.magic-title');
      
      // Title fades in when section enters
      gsap.fromTo(title, { opacity: 0, scale: 0.85, filter: 'blur(15px)' }, {
        scrollTrigger: { 
          trigger: container, 
          start: 'top 85%', 
          end: 'top 45%', 
          scrub: true 
        },
        opacity: 0.15, 
        scale: 1, 
        filter: 'blur(0px)'
      });

      // Title dissolves completely before content overlaps it
      gsap.to(title, {
        scrollTrigger: {
            trigger: container.nextElementSibling, 
            start: 'top 85%', 
            end: 'top 55%',   
            scrub: true
        },
        opacity: 0, 
        filter: 'blur(20px)', 
        scale: 1.1,
        y: -100
      });
    });

    // 3D Stagger Entrance for Skill Tags
    gsap.utils.toArray('.skills-category-group').forEach(group => {
      const tags = group.querySelectorAll('.skill-tag');
      gsap.fromTo(tags, 
        { 
          opacity: 0, 
          rotationY: 90, 
          scale: 0.3, 
          y: 40,
          transformOrigin: "center center -50px"
        }, 
        {
          scrollTrigger: {
            trigger: group,
            start: 'top 92%'
          },
          opacity: 1,
          rotationY: 0,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(1.5)"
        }
      );
    });

    // Stagger slide-in for resume items
    gsap.utils.toArray('.resume-item').forEach(el => {
      gsap.fromTo(el, { opacity: 0, x: -30 }, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        opacity: 1, x: 0, duration: 1, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.fade-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
      });
    });
  };

  // 7. HIGH-LEVEL INTERACTIVE CONSTELLATION SKILL GRID
  const initMagneticSkills = () => {
    const tags = document.querySelectorAll('.skill-tag');
    const svg = document.getElementById('skills-connections-svg');
    if (!svg || prefersReducedMotion) return;

    // Helper to calculate element center coordinates relative to Connection SVG canvas
    const getCenter = (el) => {
      const rect = el.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top
      };
    };

    tags.forEach(tag => {
      tag.addEventListener('mousemove', (e) => {
        const rect = tag.getBoundingClientRect();
        // Magnetic follow/tilt values
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);

        const rotX = -(y / (rect.height / 2)) * 18;
        const rotY = (x / (rect.width / 2)) * 18;

        gsap.to(tag, {
          rotationX: rotX,
          rotationY: rotY,
          x: x * 0.45,
          y: y * 0.45,
          z: 25,
          duration: 0.2,
          ease: "power1.out"
        });

        // 3D Constellation algorithm: Find nearest neighbors
        const activeCenter = getCenter(tag);
        const neighbors = [];

        tags.forEach(other => {
          if (other === tag) return;
          const otherCenter = getCenter(other);
          const dist = Math.hypot(otherCenter.x - activeCenter.x, otherCenter.y - activeCenter.y);
          neighbors.push({ el: other, center: otherCenter, dist: dist });
        });

        // Sort by distance and extract top 3 neighbors
        neighbors.sort((a, b) => a.dist - b.dist);
        const nearest = neighbors.slice(0, 3);

        // Clear and redraw vector connections
        svg.innerHTML = '';
        nearest.forEach(n => {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', `M ${activeCenter.x} ${activeCenter.y} L ${n.center.x} ${n.center.y}`);
          path.style.stroke = 'var(--accent)';
          path.style.strokeWidth = '1.5px';
          path.style.fill = 'none';
          path.style.opacity = '0.35';
          svg.appendChild(path);
        });
      });

      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
          rotationX: 0,
          rotationY: 0,
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        svg.innerHTML = ''; // Clear constellation connections
      });
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

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initLoader(); // Run loader -> hero -> animations sequentially
  });
})();
