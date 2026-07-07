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
              const wordDiv = document.createElement('div'); wordDiv.style.display = 'inline-block'; wordDiv.style.marginRight = '0.3em';
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

  // 4. CINEMATIC HERO ASSEMBLY (3D PHYSICS)
  const initHero = () => {
    splitText('.split-hero');
    splitText('.split-name');
    
    const tl = gsap.timeline();
    // 3D Assembly
    tl.to('.split-name .char', {
        y: 0, z: 0, rotationX: 0, opacity: 1, duration: 1.5,
        stagger: { amount: 1, from: "random" }, ease: "expo.out"
    })
    .to('.split-hero .char', {
        y: 0, z: 0, rotationX: 0, opacity: 1, duration: 1,
        stagger: { amount: 0.5, from: "center" }, ease: "power3.out"
    }, "-=1")
    // Shockwave glow
    .to('.hero-glow', {
        opacity: 0.5, scale: 2, duration: 2, ease: "power2.out"
    }, "-=1.5")
    .to('.scroll-down-indicator', { opacity: 1, duration: 1 }, "-=1");
  };

  // 5. MAGIC SCROLL HEADERS (No Overlap)
  const initMagicScroll = () => {
    gsap.utils.toArray('.magic-title-container').forEach(container => {
      const title = container.querySelector('.magic-title');
      
      // Title fades in when section enters
      gsap.fromTo(title, { opacity: 0, scale: 0.9 }, {
        scrollTrigger: { trigger: container, start: 'top 70%', end: 'top 30%', scrub: true },
        opacity: 0.08, scale: 1
      });

      // Title dissolves into nothing BEFORE content overlaps it
      // Content container usually starts ~10vh below the sticky title
      gsap.to(title, {
        scrollTrigger: {
            trigger: container.nextElementSibling, // the content container
            start: 'top 50%', // when content hits the middle of screen
            end: 'top 20%',
            scrub: true
        },
        opacity: 0, filter: 'blur(10px)', y: -50
      });
    });

    gsap.utils.toArray('.fade-up').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 1, y: 0, duration: 1, ease: 'power3.out'
      });
    });
  };

  // 6. HYPER-DETAILED CINEMATIC SCENES (SVGs)
  const initCinematicScenes = () => {
    if (prefersReducedMotion) return;

    // A. ANEMIA DETECTION (The Zoom Scene)
    const anemiaTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-anemia', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });
    anemiaTl
      // 1. Zoom into finger
      .to('#anemia-camera', { scale: 5, x: 500, y: -1000, duration: 2, ease: "power3.inOut" })
      // 2. Laser sweeps
      .to('#anemia-laser', { opacity: 1, duration: 0.2 })
      .to('#anemia-laser', { y: 600, duration: 1.5, ease: "none" })
      .to('#anemia-laser', { opacity: 0, duration: 0.2 })
      // 3. UI pops up & types
      .to('#anemia-ui', { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to('#ui-text-1', { opacity: 1, duration: 0.1 })
      .to('#ui-text-2', { opacity: 1, duration: 0.1 }, "+=0.5")
      .to('#ui-text-3', { opacity: 1, duration: 0.1, scale: 1.1, transformOrigin: "left center" }, "+=0.5")
      .to('#ui-text-3', { scale: 1, duration: 0.2 })
      // 4. Hold and reset
      .to({}, { duration: 3 })
      .to(['#anemia-ui', '#ui-text-1', '#ui-text-2', '#ui-text-3'], { opacity: 0, duration: 0.5 })
      .to('#anemia-camera', { scale: 1, x: 0, y: 0, duration: 1.5, ease: "power3.inOut" })
      .set('#anemia-laser', { y: 0 });

    // B. VPARK (Smart Lot)
    gsap.registerPlugin(MotionPathPlugin);
    const vparkTl = gsap.timeline({
        scrollTrigger: { trigger: '#scene-vpark', start: 'top 70%', toggleActions: 'play pause resume reverse' },
        repeat: -1, repeatDelay: 2
    });
    vparkTl
      // 1. Car drives path
      .to('#vpark-car', {
          duration: 3, ease: "power1.inOut",
          motionPath: { path: "#vpark-car-path", align: "#vpark-car-path", alignOrigin: [0.5, 0.5], autoRotate: true }
      })
      // 2. YOLO Scan overlaps
      .to('#vpark-yolo', { opacity: 1, duration: 0.2 }, 1)
      .to('#vpark-yolo', { opacity: 0, duration: 0.2 }, 3.5)
      // 3. Path glows & UI flashes
      .to('#vpark-guide', { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 1.5)
      .to('#vpark-ui', { opacity: 1, duration: 0.5 }, 3)
      // 4. Reset
      .to({}, { duration: 3 })
      .to(['#vpark-ui', '#vpark-guide'], { opacity: 0, duration: 1 })
      .set('#vpark-guide', { strokeDashoffset: 1000 })
      .set('#vpark-car', { x: -100, y: 300, rotation: 0 }); // reset car

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
      // Draw ECG
      .to('#sepsis-ecg', { strokeDashoffset: 0, duration: 3, ease: "none" })
      // Fade in Tree
      .to('#sepsis-tree', { opacity: 1, y: -20, duration: 1, ease: "power2.out" })
      // Reset
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
