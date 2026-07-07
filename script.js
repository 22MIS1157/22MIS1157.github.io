/* ============================================
   AFNAAN AHMED P — CINEMATIC ENGINE
   GSAP 3D Assembly & Complex SVG Scenes
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

  // 4. CINEMATIC HERO ASSEMBLY (3D ELASTIC REVEAL)
  const initHero = () => {
    splitText('.split-hero');
    splitText('.split-name');
    
    const tl = gsap.timeline();
    
    // Initial State sets
    gsap.set('.split-name .char', {
        scale: 3,
        filter: "blur(20px)",
        opacity: 0,
        rotationX: 45,
        rotationY: -45,
        z: -300
    });
    
    // 3D elastic zoom in
    tl.to('.split-name .char', {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        duration: 1.8,
        stagger: { amount: 0.8, from: "center" },
        ease: "elastic.out(1, 0.75)"
    })
    .to('.split-hero .char', {
        y: 0, opacity: 1, duration: 1,
        stagger: { amount: 0.4, from: "center" }, ease: "power3.out"
    }, "-=1.2")
    // Glowing background shockwave
    .to('.hero-glow', {
        opacity: 0.6, scale: 1.8, duration: 2.2, ease: "power2.out"
    }, "-=1.5")
    .to('.scroll-down-indicator', { opacity: 1, y: 0, duration: 1 }, "-=1");
  };

  // 5. MAGIC SCROLL HEADERS (In-Front Fade Out)
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
        opacity: 0.12, 
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

    gsap.utils.toArray('.fade-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
      });
    });
  };

  // 6. HYPER-DETAILED CINEMATIC SCENES (SVGs)
  const initCinematicScenes = () => {
    if (prefersReducedMotion) return;

    // A. ANEMIA DETECTION (The Zoom & Color Shift Scene)
    const anemiaTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-anemia', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });

    // Setup initial state
    gsap.set('#nailbed', { fill: '#FFB6C1' }); // healthy pink
    gsap.set('#laser-glow-group', { y: 80, opacity: 0 });
    gsap.set('#anemia-zoom-view', { opacity: 0 });
    gsap.set('#anemia-hud', { opacity: 0 });
    gsap.set(['#an-log-1', '#an-log-2', '#an-log-3', '#an-log-4', '#an-log-result'], { opacity: 0 });

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

    // B. VPARK (Smart Lot)
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

    // C. LEXCLOUD (Data Flow)
    const lexTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-lexcloud', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1
    });
    gsap.to('#lex-ring', { rotation: 360, duration: 10, ease: "none", repeat: -1, transformOrigin: "500px 200px" });
    lexTl.to('#lex-glow-1', { strokeDashoffset: -400, duration: 2, ease: "none" })
         .to('#lex-glow-2', { strokeDashoffset: -400, duration: 2, ease: "none" }, 1);

    // D. SEPSIS (ECG to XGBoost)
    const sepsisTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-sepsis', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });
    sepsisTl
      .to('#sepsis-ecg', { strokeDashoffset: 0, duration: 3, ease: "none" })
      .to('#sepsis-tree', { opacity: 1, y: -20, duration: 1, ease: "power2.out" })
      .to({}, { duration: 3 })
      .to(['#sepsis-ecg', '#sepsis-tree'], { opacity: 0, duration: 1 })
      .set('#sepsis-ecg', { strokeDashoffset: 1200 })
      .set('#sepsis-tree', { y: 0 });
  };

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initHero();
    initMagicScroll();
    initCinematicScenes();
  });
})();
