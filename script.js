/* ============================================
   AFNAAN AHMED P — AWWWARDS MASTERPIECE
   Ultimate GSAP Physics Engine
   ============================================ */

(function () {
  "use strict";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. LENIS SMOOTH SCROLL (Awwwards Butter Smooth)
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // 2. CUSTOM CURSOR
  const initCursor = () => {
    if(prefersReducedMotion || window.innerWidth < 1024) return;
    const cursor = document.getElementById('cursor');
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    
    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    
    gsap.ticker.add(() => {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      gsap.set(cursor, { x: posX, y: posY });
    });

    document.querySelectorAll('a, .magnetic-wrap, canvas').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  };

  // 3. MAGNETIC BUTTONS
  const initMagnetic = () => {
    if(prefersReducedMotion || window.innerWidth < 1024) return;
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
      const btn = wrap.querySelector('.magnetic-btn');
      wrap.addEventListener('mousemove', e => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power2.out' });
      });
      wrap.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      });
    });
  };

  // 4. TEXT SPLITTING (Vanilla)
  const splitText = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.innerHTML; el.innerHTML = '';
      text.split('<br>').forEach((line, i, arr) => {
        const lineDiv = document.createElement('div');
        lineDiv.style.overflow = 'hidden';
        
        // Handle nested span for accent
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
          } else if(node.nodeType === 1) {
             const styledSpan = document.createElement('span');
             styledSpan.className = node.className;
             node.textContent.split(' ').forEach(word => {
               if(!word) return;
               const wordDiv = document.createElement('div'); wordDiv.style.display = 'inline-block'; wordDiv.style.marginRight = '0.3em';
               word.split('').forEach(char => {
                 const charSpan = document.createElement('span'); charSpan.className = 'char'; charSpan.style.display = 'inline-block'; charSpan.innerHTML = char;
                 wordDiv.appendChild(charSpan);
               });
               styledSpan.appendChild(wordDiv);
             });
             lineDiv.appendChild(styledSpan);
          }
        });
        
        el.appendChild(lineDiv);
        if(i < arr.length - 1) el.appendChild(document.createElement('br'));
      });
    });
  };

  // 5. JAW-DROPPING LOADER
  const initLoader = () => {
    splitText('.split-lines');
    gsap.set('.char', { y: '110%' });
    gsap.set('.fade-up', { autoAlpha: 0, y: 30 });
    gsap.set('#smooth-content', { autoAlpha: 0 }); // Hide until curtain drops

    const counter = { val: 0 };
    const counterEl = document.getElementById('counter');
    const tl = gsap.timeline();

    tl.to(counter, {
      val: 100, duration: 2.5, ease: 'power4.inOut',
      onUpdate: () => { counterEl.innerText = Math.round(counter.val); }
    })
    .to('.loader-brand', { autoAlpha: 1, duration: 0.5 }, "-=0.5")
    .to('.loader-counter', { scale: 1.5, autoAlpha: 0, duration: 0.8, ease: 'power3.inOut' })
    // Curtain Split
    .set('#smooth-content', { autoAlpha: 1 })
    .to('.loader-curtain-top', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' }, "split")
    .to('.loader-curtain-bottom', { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, "split")
    // Brand flies to Nav
    .to('.loader-brand', { 
        top: '40px', left: '50px', scale: 1, duration: 1.2, ease: 'expo.inOut',
        onComplete: () => { document.getElementById('navLogo').innerText = "AFNAAN AHMED P."; document.getElementById('loaderBrand').style.display = 'none'; }
    }, "split")
    .to('#loader-wrapper', { autoAlpha: 0, duration: 0.1 })
    // Hero Text Reveal
    .to('.char', { y: '0%', duration: 1.2, stagger: 0.02, ease: 'expo.out' }, "-=0.6")
    .to('.fade-up', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }, "-=0.8");
  };

  // 6. SCROLL PHYSICS (Parallax, Skew, Pinned Titles)
  const initScrollPhysics = () => {
    if(prefersReducedMotion) return;

    // Skew Velocity
    let proxy = { skew: 0 }, skewSetter = gsap.quickSetter(".skew-elem", "skewY", "deg"), clamp = gsap.utils.clamp(-8, 8);
    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -200);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, { skew: 0, duration: 1, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
        }
      }
    });

    // Pinned Parallax Titles (Massive Awwwards Effect)
    const titles = ['about', 'projects', 'skills'];
    titles.forEach(id => {
      const trigger = document.getElementById(`${id}-title-trigger`);
      const title = document.getElementById(`${id}-title`);
      if(trigger && title) {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top top',
          end: 'bottom top',
          pin: trigger,
          pinSpacing: false
        });
        
        // Dissolve when leaving
        gsap.to(title, {
          scrollTrigger: {
            trigger: `#${id}`,
            start: 'bottom 50%',
            end: 'bottom top',
            scrub: true
          },
          autoAlpha: 0,
          scale: 1.2
        });
      }
    });

    // Image Parallax
    gsap.utils.toArray('[data-speed]').forEach(el => {
      gsap.to(el, {
        y: () => (1 - parseFloat(el.getAttribute('data-speed'))) * (ScrollTrigger.maxScroll(window) - (ScrollTrigger.maxScroll(window) / 2)),
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    // Marquee
    gsap.to('#marquee-1', { xPercent: -20, ease: 'none', scrollTrigger: { trigger: '.skills-section', scrub: 1 } });
    gsap.to('#marquee-2', { xPercent: 20, ease: 'none', scrollTrigger: { trigger: '.skills-section', scrub: 1 } });
  };

  // 7. ELITE CANVAS SIMULATIONS
  const initCanvas = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { entry.target.dataset.active = entry.isIntersecting ? 'true' : 'false'; });
    }, { threshold: 0.1 });

    const setupCanvas = (id) => {
      const cvs = document.getElementById(id); if (!cvs) return null;
      observer.observe(cvs); 
      const ctx = cvs.getContext('2d');
      const resize = () => { cvs.width = cvs.parentElement.clientWidth; cvs.height = cvs.parentElement.clientHeight; };
      window.addEventListener('resize', resize); resize();
      return { cvs, ctx, w: () => cvs.width, h: () => cvs.height };
    };

    const accent = '#D6FF00';
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    // A. VPark (Mouse Reactive Radar)
    const vpark = setupCanvas('vparkCanvas');
    if (vpark) {
      let angle = 0;
      const drawVPark = () => {
        if(vpark.cvs.dataset.active === 'true') {
          vpark.ctx.fillStyle = '#050505'; vpark.ctx.fillRect(0, 0, vpark.w(), vpark.h());
          
          let cx = vpark.w()/2; let cy = vpark.h()/2; 
          // Parallax center based on mouse
          cx += (mouseX - window.innerWidth/2) * 0.05;
          cy += (mouseY - window.innerHeight/2) * 0.05;
          
          let radius = Math.min(vpark.w(), vpark.h())/2 - 40;

          vpark.ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`; vpark.ctx.lineWidth = 1;
          for(let i=0; i<vpark.w(); i+=40) { vpark.ctx.beginPath(); vpark.ctx.moveTo(i,0); vpark.ctx.lineTo(i,vpark.h()); vpark.ctx.stroke(); }
          for(let i=0; i<vpark.h(); i+=40) { vpark.ctx.beginPath(); vpark.ctx.moveTo(0,i); vpark.ctx.lineTo(vpark.w(),i); vpark.ctx.stroke(); }

          vpark.ctx.strokeStyle = accent; vpark.ctx.lineWidth = 1;
          vpark.ctx.beginPath(); vpark.ctx.arc(cx, cy, radius, 0, Math.PI*2); vpark.ctx.stroke();
          
          angle += 0.04;
          vpark.ctx.fillStyle = `rgba(214, 255, 0, 0.15)`;
          vpark.ctx.beginPath(); vpark.ctx.moveTo(cx, cy); vpark.ctx.arc(cx, cy, radius, angle, angle + 0.8); vpark.ctx.fill();
        } requestAnimationFrame(drawVPark);
      }; drawVPark();
    }

    // B. LexCloud (Scroll Reactive Nodes)
    const lex = setupCanvas('lexcloudCanvas');
    if (lex) {
      let packets = []; let scrollVel = 0;
      if(!prefersReducedMotion) {
        ScrollTrigger.create({ onUpdate: (self) => { scrollVel = Math.abs(self.getVelocity()); } });
      }

      const drawLex = () => {
        if(lex.cvs.dataset.active === 'true') {
          lex.ctx.fillStyle = '#050505'; lex.ctx.fillRect(0, 0, lex.w(), lex.h());
          let nodes = [ {x: 80, y: lex.h()/2}, {x: lex.w()/2, y: 80}, {x: lex.w()-80, y: lex.h()/2} ];
          
          lex.ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`; lex.ctx.lineWidth = 1; lex.ctx.beginPath();
          lex.ctx.moveTo(nodes[0].x, nodes[0].y); lex.ctx.lineTo(nodes[1].x, nodes[1].y); lex.ctx.lineTo(nodes[2].x, nodes[2].y); lex.ctx.stroke();

          let spawnRate = scrollVel > 500 ? 0.8 : 0.96;
          let speedMulti = scrollVel > 500 ? 3 : 1;

          if(Math.random() > spawnRate) packets.push({ p: 0, f: 0, t: 1 });
          lex.ctx.fillStyle = accent;
          for(let i=packets.length-1; i>=0; i--) {
            let pk = packets[i]; pk.p += 0.015 * speedMulti;
            if(pk.p >= 1) { if(pk.t === 1) { pk.f = 1; pk.t = 2; pk.p = 0; } else { packets.splice(i, 1); continue; } }
            let start = nodes[pk.f]; let end = nodes[pk.t];
            let px = start.x + (end.x - start.x) * pk.p; let py = start.y + (end.y - start.y) * pk.p;
            lex.ctx.beginPath(); lex.ctx.arc(px, py, 3, 0, Math.PI*2); lex.ctx.fill();
          }

          nodes.forEach(n => {
            lex.ctx.strokeStyle = accent; lex.ctx.beginPath(); lex.ctx.arc(n.x, n.y, 8, 0, Math.PI*2); lex.ctx.stroke();
          });
        } requestAnimationFrame(drawLex);
      }; drawLex();
    }

    // C. Anemia (Scroll Sync Laser)
    const anemia = setupCanvas('anemiaCanvas');
    if (anemia) {
      let scrollY = 0;
      window.addEventListener('scroll', () => { scrollY = window.scrollY; });
      const drawAnemia = () => {
        if(anemia.cvs.dataset.active === 'true') {
          anemia.ctx.fillStyle = '#050505'; anemia.ctx.fillRect(0, 0, anemia.w(), anemia.h());
          
          anemia.ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`; anemia.ctx.lineWidth = 1;
          let cx = anemia.w()/2;
          for(let i=0; i<15; i++) { anemia.ctx.beginPath(); anemia.ctx.arc(cx, anemia.h()/2, 10 + i*15, 0, Math.PI*2); anemia.ctx.stroke(); }

          // Laser syncs with scroll
          let scanY = (scrollY * 0.5) % anemia.h();
          
          anemia.ctx.fillStyle = `rgba(214, 255, 0, 0.1)`; anemia.ctx.fillRect(0, 0, anemia.w(), scanY);
          anemia.ctx.strokeStyle = accent; anemia.ctx.lineWidth = 2;
          anemia.ctx.beginPath(); anemia.ctx.moveTo(0, scanY); anemia.ctx.lineTo(anemia.w(), scanY); anemia.ctx.stroke();
        } requestAnimationFrame(drawAnemia);
      }; drawAnemia();
    }

    // D. Sepsis
    const sepsis = setupCanvas('sepsisCanvas');
    if (sepsis) {
      let cols = []; 
      const drawSepsis = () => {
        if(sepsis.cvs.dataset.active === 'true') {
          sepsis.ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'; sepsis.ctx.fillRect(0, 0, sepsis.w(), sepsis.h());
          
          if(cols.length === 0) { for(let i=0; i<sepsis.w()/20; i++) cols.push({x: i*20, y: Math.random()*sepsis.h()}); }
          
          sepsis.ctx.font = "bold 12px monospace";
          cols.forEach(c => {
            let char = Math.random() > 0.5 ? '1' : '0';
            sepsis.ctx.fillStyle = Math.random() > 0.98 ? accent : '#333';
            sepsis.ctx.fillText(char, c.x, c.y);
            c.y += 18; if(c.y > sepsis.h()) c.y = 0;
          });
        } requestAnimationFrame(drawSepsis);
      }; drawSepsis();
    }
  };

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initCursor();
    initMagnetic();
    initScrollPhysics();
    initCanvas();
    initLoader(); // Run loader last
  });
})();
