/* ============================================
   AFNAAN AHMED P — ELITE AGENCY
   GSAP Iris Reveal & Horizontal Scroll
   ============================================ */

(function () {
  "use strict";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;

  // 1. LENIS SMOOTH SCROLL
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // 2. TEXT SPLITTING (Vanilla)
  const splitText = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.innerHTML; el.innerHTML = '';
      text.split('<br>').forEach((line, i, arr) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden';
        lineDiv.style.paddingBottom = '0.3em';
        lineDiv.style.marginBottom = '-0.3em';
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

  // 3. IRIS REVEAL LOADER
  const initLoader = () => {
    splitText('.split-text');
    gsap.set('.char', { y: '110%' });
    gsap.set('.fade-up', { autoAlpha: 0, y: 30 });
    gsap.set('.fade-up-nav', { autoAlpha: 0, y: -20 });
    gsap.set('#smooth-content', { autoAlpha: 0 });

    const counter = { val: 0 };
    const counterEl = document.getElementById('counter');
    const tl = gsap.timeline();

    tl.to(counter, {
      val: 100, duration: 2, ease: 'power3.inOut',
      onUpdate: () => { counterEl.innerText = Math.round(counter.val); }
    })
    .to('.loader-circle', { strokeDashoffset: 0, duration: 2, ease: 'power3.inOut' }, 0)
    .to('.loader-content', { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
    // The Iris Reveal
    .set('#smooth-content', { autoAlpha: 1 })
    .to('#irisMask', { 
        width: '300vw', height: '300vw', duration: 1.5, ease: 'power4.inOut' 
    })
    .to('#loader-wrapper', { autoAlpha: 0, duration: 0.1 })
    // Hero Elements
    .to('.char', { y: '0%', duration: 1, stagger: 0.02, ease: 'expo.out' }, "-=0.5")
    .to('.fade-up', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }, "-=0.8")
    .to('.fade-up-nav', { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.8");
  };

  // 4. HORIZONTAL SCROLL (The Elite Gallery)
  const initHorizontalScroll = () => {
    if(prefersReducedMotion || isMobile) {
        // Standard fade ups for mobile/reduced motion
        gsap.utils.toArray('.fade-up').forEach(el => {
            gsap.fromTo(el, { autoAlpha: 0, y: 40 }, { scrollTrigger: { trigger: el, start: 'top 85%' }, autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' });
        });
        return;
    }

    // Standard fade ups for vertical sections
    gsap.utils.toArray('section:not(.horizontal-scroll-wrapper) .fade-up').forEach(el => {
        gsap.fromTo(el, { autoAlpha: 0, y: 40 }, { scrollTrigger: { trigger: el, start: 'top 85%' }, autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' });
    });

    const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');
    const panels = gsap.utils.toArray('.panel');

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalWrapper,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + horizontalContainer.offsetWidth
      }
    });
  };

  // 5. ADVANCED SVG ANIMATIONS
  const initSVGAnimations = () => {
    
    // A. VPark (Motion Path simulated)
    const vparkTl = gsap.timeline({ repeat: -1, yoyo: false });
    vparkTl.to('#svgCar', { y: 250, duration: 4, ease: 'none' })
           .set('#svgCar', { y: -50 });
           
    const yoloTl = gsap.timeline({ repeat: -1 });
    yoloTl.to(['#yoloBox', '#yoloText'], { autoAlpha: 1, duration: 0.2 }, 1)
          .to(['#yoloBox', '#yoloText'], { autoAlpha: 0, duration: 0.2 }, 3.5);

    // B. Anemia (Clip-path sweep)
    const anemiaTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    anemiaTl.to('#scanRect', { height: 300, duration: 3, ease: 'power1.inOut' })
            .to('#scanLine', { autoAlpha: 1, duration: 0.1 }, 0)
            .to('#scanLine', { y: 300, duration: 3, ease: 'power1.inOut' }, 0)
            .to('#anemiaText', { autoAlpha: 1, duration: 0.5 }, 2)
            .to(['#scanRect', '#scanLine', '#anemiaText'], { autoAlpha: 0, duration: 0.5 })
            .set('#scanRect', { height: 0 })
            .set('#scanLine', { y: 0 });

    // C. ECG Draw (Sepsis)
    // Achieved via CSS, but GSAP can control the text
    gsap.to('#ecgLine', { strokeDashoffset: -1000, duration: 5, ease: 'none', repeat: -1 });
  };

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initHorizontalScroll();
    initSVGAnimations();
    initLoader(); // Run loader last
    
    // Refresh ScrollTrigger after loader in case DOM changes
    setTimeout(() => { ScrollTrigger.refresh(); }, 3000);
  });
})();
