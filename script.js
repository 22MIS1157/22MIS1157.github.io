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

  // 4. TERMINAL BOOT LOADER
  const initLoader = () => {
    const logsContainer = document.getElementById('terminal-logs');
    const progressBar = document.getElementById('progress-bar');
    const loaderWrapper = document.getElementById('loader-wrapper');

    const bootLogs = [
      "[SYS] INITIALIZING NEURAL FRAMEWORKS...",
      "[SYS] DETECTING INTEGRATED CV ENGINE...",
      "[SYS] LOADED: PyTorch (v2.3.0) & OpenCV (v4.9.0)",
      "[SYS] LOADED: YOLOv8 Object Detection Node (mAP: 93.5%)",
      "[SYS] LOADED: CNN Fingernail Classifier (Acc: 96%)",
      "[SYS] LOADED: XGBoost ICU Mortality Predictor (AUC: 0.96)",
      "[SYS] INTERFACING WITH ARDUINO NANO & SERVO SERVICES...",
      "[SYS] RESOLVING AWS API GATEWAY & DYNAMODB PIPELINES...",
      "[SYS] CONFIGURATION CHECKS VALIDATED. DECODING PORTFOLIO_OS...",
      "[SYS] BOOT COMPLETED // WELCOME TO AFNAAN AHMED PORTFOLIO"
    ];

    let logIndex = 0;
    const progressLimit = 100;
    let currentProgress = 0;

    const typeLog = () => {
      if (logIndex < bootLogs.length) {
        const line = document.createElement('div');
        line.style.marginBottom = '6px';
        line.innerHTML = bootLogs[logIndex];
        logsContainer.appendChild(line);
        logsContainer.scrollTop = logsContainer.scrollHeight;
        
        logIndex++;
        currentProgress = Math.min(100, Math.round((logIndex / bootLogs.length) * 100));
        progressBar.style.width = currentProgress + '%';

        setTimeout(typeLog, 250);
      } else {
        // Boot completed -> Slide reveal
        setTimeout(() => {
          gsap.timeline()
            .to(loaderWrapper, { autoAlpha: 0, duration: 0.8, ease: "power2.out" })
            .call(() => {
              // Trigger Hero entrance
              initHero();
              initMagicScroll();
              initCinematicScenes();
            });
        }, 500);
      }
    };

    typeLog();
  };

  // 5. HERO ENTRANCE (REVEAL FROM NEON BEAM)
  const initHero = () => {
    splitText('.split-hero');
    splitText('.split-name');

    gsap.set('.split-name .char', {
      scaleY: 0,
      opacity: 0,
      y: 10
    });
    gsap.set('.split-hero .char', {
      opacity: 0,
      y: 30
    });

    const tl = gsap.timeline();

    tl.to('.hero-neon-beam', {
      width: '100%',
      duration: 1,
      ease: 'power3.inOut'
    })
    .to('.split-name .char', {
      scaleY: 1,
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: { amount: 0.6, from: 'center' },
      ease: 'back.out(1.7)'
    }, "-=0.3")
    .to('.hero-neon-beam', {
      opacity: 0,
      duration: 0.5
    }, "-=0.5")
    .to('.split-hero .char', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: { amount: 0.4, from: 'center' },
      ease: 'power3.out'
    }, "-=1")
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

  // 7. HYPER-DETAILED CINEMATIC SCENES (SVGs)
  const initCinematicScenes = () => {
    if (prefersReducedMotion) return;

    // A. ANEMIA DETECTION (The Zoom & Color Shift Scene)
    const anemiaTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-anemia', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });

    anemiaTl
      // 1. Zoom into the Scanner chamber
      .to('#anemia-scene', { scale: 1.5, x: -150, y: -50, duration: 1.5, ease: "power2.inOut" })
      .to('#anemia-zoom-view', { opacity: 1, duration: 0.8 }, "-=0.5")
      .to('#anemia-hud', { opacity: 1, duration: 0.5 }, "-=0.3")
      
      // 2. Logging and crosshair rotation
      .to('#an-log-1', { opacity: 1, duration: 0.2 })
      .to('#anemia-reticle', { rotation: 180, duration: 1.5, ease: "power1.inOut" }, "-=0.2")
      
      // 3. Laser scanner activates & sweeps
      .to('#laser-glow-group', { opacity: 1, duration: 0.2 })
      .to('#an-log-2', { opacity: 1, duration: 0.2 })
      .to('#laser-glow-group', { y: 420, duration: 2, ease: "none" })
      
      // 4. Color shifting fingernail bed from pink to pale beige
      .to('#nailbed', { fill: '#F5F5DC', duration: 1.5, ease: "power1.inOut" }, "-=1.8")
      .to('#an-log-3', { opacity: 1, duration: 0.2 }, "-=0.5")
      
      // 5. Diagnostics processing
      .to('#laser-glow-group', { opacity: 0, duration: 0.3 })
      .to('#an-log-4', { opacity: 1, duration: 0.2 })
      .to('#an-log-result', { opacity: 1, duration: 0.4 })
      
      // 6. Alert blinking
      .to('#an-log-result', { opacity: 0.2, duration: 0.2, repeat: 5, yoyo: true })
      .to({}, { duration: 3.5 }) // hold view
      
      // 7. Reset and zoom back out
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
      // 1. Doc Upload User -> API
      .to('#lex-packet-doc', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-doc', { x: 380, y: 200, duration: 1, ease: "power1.inOut" })
      .to('#lex-packet-doc', { opacity: 0, duration: 0.1 })
      // 2. Forward to Lambda
      .set('#lex-packet-doc', { x: 380, y: 200, opacity: 1 })
      .to('#lex-packet-doc', { y: 400, duration: 0.8, ease: "power1.inOut" })
      .to('#lex-packet-doc', { opacity: 0, duration: 0.1 })
      // 3. Lambda -> DB chunking
      .to('#lex-packet-db', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-db', { x: 620, duration: 1, ease: "power1.inOut" })
      .to('#lex-packet-db', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-db', { x: 380 })
      // 4. Lambda -> LLaMA-3 trigger
      .to('#lex-packet-llama', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-llama', { x: 620, y: 200, duration: 1, ease: "power1.inOut" })
      .to('#lex-packet-llama', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-llama', { x: 380, y: 400 })
      // 5. LLaMA processes (RAG)
      .to('#lex-llama-pulse', { opacity: 0.8, scale: 1.5, duration: 0.5, ease: "power1.out" })
      .to('#lex-llama-pulse', { opacity: 0, scale: 2.2, duration: 0.5, ease: "power1.in" }, "-=0.2")
      .to('#lex-overlay', { opacity: 1, duration: 0.5 })
      // 6. Response LLaMA-3 -> User
      .to('#lex-packet-resp', { opacity: 1, duration: 0.1 })
      .to('#lex-packet-resp', { x: 150, y: 300, duration: 1.5, ease: "power1.inOut" })
      .to('#lex-packet-resp', { opacity: 0, duration: 0.1 })
      .set('#lex-packet-resp', { x: 620, y: 200 })
      // 7. Hold & Reset
      .to({}, { duration: 3 })
      .to('#lex-overlay', { opacity: 0, duration: 0.5 });

    // D. SEPSIS PREDICTION (Patient bed -> Decision Tree paths)
    const sepsisTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-sepsis', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });
    // Animate patient ECG monitor
    gsap.to('#sepsis-pulse-line', { strokeDashoffset: -120, duration: 2, ease: "none", repeat: -1 });

    sepsisTl
      // 1. Draw ECG and fade in dashboard clinical parameters
      .to('#sepsis-features', { opacity: 1, y: -20, duration: 0.8 })
      // 2. Fade in decision tree on right
      .to('#sepsis-tree-node', { opacity: 1, duration: 0.8 })
      
      // 3. Highlight decision path (Root -> Left -> Leaf)
      .to('#tree-root', { scale: 1.15, stroke: 'var(--accent)', duration: 0.5 })
      .to('#tree-root', { scale: 1, duration: 0.2 })
      .to('#tree-left', { scale: 1.15, stroke: 'var(--accent)', duration: 0.5 })
      .to('#tree-left', { scale: 1, duration: 0.2 })
      .to('#tree-leaf-1', { scale: 1.15, stroke: '#EF4444', duration: 0.5 })
      .to('#tree-leaf-1', { scale: 1, duration: 0.2 })
      
      // 4. Output SHAP classification probability HUD
      .to('#sepsis-shap', { opacity: 1, y: -10, duration: 0.5 })
      
      // 5. Hold and reset
      .to({}, { duration: 4.5 })
      .to(['#sepsis-features', '#sepsis-tree-node', '#sepsis-shap'], { opacity: 0, duration: 0.8 })
      .set(['#tree-root', '#tree-left', '#tree-leaf-1'], { scale: 1, stroke: '' });
  };

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initLoader(); // Runs loader first -> then triggers Hero and scenes
  });
})();
