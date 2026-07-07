/* ============================================
   AFNAAN AHMED P — KINETIC BRUTALISM
   GSAP Shatter Physics & Z-Index Parallax
   ============================================ */

(function () {
  "use strict";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        const lineDiv = document.createElement('div'); lineDiv.style.overflow = 'hidden';
        const temp = document.createElement('div'); temp.innerHTML = line;
        
        Array.from(temp.childNodes).forEach(node => {
          if(node.nodeType === 3) {
            node.textContent.split(' ').forEach(word => {
              if(!word) return;
              const wordDiv = document.createElement('div'); wordDiv.style.display = 'inline-block'; wordDiv.style.marginRight = '0.4em';
              word.split('').forEach(char => {
                const charSpan = document.createElement('span'); charSpan.className = 'char'; charSpan.style.display = 'inline-block'; charSpan.innerHTML = char;
                wordDiv.appendChild(charSpan);
              });
              lineDiv.appendChild(wordDiv);
            });
          } else if(node.nodeType === 1) {
             const styledSpan = document.createElement('span'); styledSpan.className = node.className;
             node.textContent.split(' ').forEach(word => {
               if(!word) return;
               const wordDiv = document.createElement('div'); wordDiv.style.display = 'inline-block'; wordDiv.style.marginRight = '0.4em';
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

  // 3. JAW-DROPPING GRID SHATTER LOADER
  const initLoader = () => {
    splitText('.split-text');
    gsap.set('.char', { y: '110%' });
    gsap.set('.fade-up', { autoAlpha: 0, y: 30 });
    gsap.set('#smooth-content', { autoAlpha: 0 }); 

    const grid = document.getElementById('loaderGrid');
    const cells = [];
    for(let i=0; i<100; i++) {
        const cell = document.createElement('div');
        cell.className = 'loader-cell';
        grid.appendChild(cell);
        cells.push(cell);
    }

    const counter = { val: 0 };
    const counterEl = document.getElementById('counter');
    const tl = gsap.timeline();

    tl.to(counter, {
      val: 100, duration: 2.5, ease: 'power4.inOut',
      onUpdate: () => { counterEl.innerText = Math.round(counter.val); }
    })
    .to('.loader-counter', { scale: 1.5, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
    .to('.loader-text', { autoAlpha: 0, duration: 0.2 }, "-=0.2")
    // Grid Shatter (Explode outwards)
    .set('#smooth-content', { autoAlpha: 1 })
    .to(cells, {
        scale: 0, rotation: () => Math.random() * 90 - 45,
        x: () => (Math.random() - 0.5) * window.innerWidth,
        y: () => (Math.random() - 0.5) * window.innerHeight,
        autoAlpha: 0, duration: 1.5, stagger: { amount: 0.5, from: "center" }, ease: "expo.out"
    }, "shatter")
    .to('#loader', { autoAlpha: 0, duration: 0.1 })
    // Hero Text Reveal
    .to('.char', { y: '0%', duration: 1.2, stagger: 0.02, ease: 'expo.out' }, "-=1")
    .to('.fade-up', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }, "-=0.8");
  };

  // 4. SCROLL PHYSICS (Z-Index Tunnels & Skew)
  const initScrollPhysics = () => {
    if(prefersReducedMotion) return;

    // Skew Velocity
    let proxy = { skew: 0 }, skewSetter = gsap.quickSetter(".skew-elem", "skewY", "deg"), clamp = gsap.utils.clamp(-5, 5);
    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
        }
      }
    });

    // Z-Index Parallax Titles (NO OVERLAP)
    const titles = ['about', 'projects', 'experience'];
    titles.forEach(id => {
      const section = document.getElementById(id);
      const bgTitle = document.getElementById(`bg-title-${id}`);
      if(section && bgTitle) {
        gsap.to(bgTitle, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse'
          },
          autoAlpha: 0.15,
          scale: 1.1,
          duration: 1,
          ease: 'power2.out'
        });
      }
    });

    // Fade ups
    gsap.utils.toArray('.fade-up:not(.hero-sub)').forEach(el => {
      gsap.fromTo(el, { autoAlpha: 0, y: 50 }, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out'
      });
    });
  };

  // 5. MASTER-LEVEL CANVAS ENGINE
  const initCanvas = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { entry.target.dataset.active = entry.isIntersecting ? 'true' : 'false'; });
    }, { threshold: 0.1 });

    const setupCanvas = (id) => {
      const cvs = document.getElementById(id); if (!cvs) return null;
      observer.observe(cvs); const ctx = cvs.getContext('2d');
      const resize = () => { cvs.width = cvs.parentElement.clientWidth; cvs.height = cvs.parentElement.clientHeight; };
      window.addEventListener('resize', resize); resize();
      return { cvs, ctx, w: () => cvs.width, h: () => cvs.height };
    };

    const bg = '#1C2541'; const accent = '#DFE104'; const fg = '#F0F4F8';

    // A. VPark (2D Simulation: Car gets scanned & parks)
    const vpark = setupCanvas('vparkCanvas');
    if (vpark) {
      let carY = -50; let state = 0; let timer = 0;
      const drawVPark = () => {
        if(vpark.cvs.dataset.active === 'true') {
          vpark.ctx.fillStyle = bg; vpark.ctx.fillRect(0, 0, vpark.w(), vpark.h());
          let cx = vpark.w()/2;
          
          vpark.ctx.strokeStyle = fg; vpark.ctx.lineWidth = 2;
          vpark.ctx.strokeRect(cx - 80, vpark.h()/2 - 120, 160, 240); // Parking Spot
          
          if(state === 0) { carY += 3; if(carY > vpark.h()/2 - 40) state = 1; }
          else if(state === 1) { timer++; if(timer > 80) { state = 2; timer = 0; } }
          else if(state === 2) { carY -= 1.5; if(carY < vpark.h()/2 - 90) { state = 3; timer = 0; } }
          else if(state === 3) { timer++; if(timer > 120) { state = 0; carY = -50; timer = 0; } }

          // Car
          vpark.ctx.fillStyle = '#2563EB'; vpark.ctx.fillRect(cx - 40, carY, 80, 140);
          
          // YOLO Scanning
          if(state === 1 || state === 2) {
            vpark.ctx.strokeStyle = '#22c55e'; vpark.ctx.lineWidth = 3;
            vpark.ctx.strokeRect(cx - 45, carY - 5, 90, 150);
            vpark.ctx.fillStyle = '#22c55e'; vpark.ctx.font = '14px monospace';
            vpark.ctx.fillText('CAR: 0.98', cx - 45, carY - 15);
          }
          
          vpark.ctx.fillStyle = accent; vpark.ctx.font = 'bold 20px monospace';
          if(state === 3) vpark.ctx.fillText('SPACE ALLOCATED', cx - 90, vpark.h() - 40);
          else vpark.ctx.fillText('YOLOv8 SCANNING...', cx - 100, vpark.h() - 40);
        } requestAnimationFrame(drawVPark);
      }; drawVPark();
    }

    // B. LexCloud (Decentralized Node Flow)
    const lex = setupCanvas('lexcloudCanvas');
    if (lex) {
      let packets = [];
      const drawLex = () => {
        if(lex.cvs.dataset.active === 'true') {
          lex.ctx.fillStyle = bg; lex.ctx.fillRect(0, 0, lex.w(), lex.h());
          let cx = lex.w()/2; let cy = lex.h()/2;

          lex.ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`; lex.ctx.lineWidth = 2; lex.ctx.beginPath();
          lex.ctx.moveTo(cx - 150, cy); lex.ctx.lineTo(cx, cy - 80); lex.ctx.lineTo(cx + 150, cy); lex.ctx.stroke();
          lex.ctx.moveTo(cx - 150, cy); lex.ctx.lineTo(cx, cy + 80); lex.ctx.lineTo(cx + 150, cy); lex.ctx.stroke();

          if(Math.random() > 0.94) packets.push({ p: 0, path: Math.random() > 0.5 ? 1 : 2 });
          lex.ctx.fillStyle = accent;
          for(let i=packets.length-1; i>=0; i--) {
            let pk = packets[i]; pk.p += 0.015;
            if(pk.p >= 1) { packets.splice(i, 1); continue; }
            let px = cx - 150 + (300 * pk.p);
            let py = pk.path === 1 ? cy - (80 * Math.sin(pk.p * Math.PI)) : cy + (80 * Math.sin(pk.p * Math.PI));
            lex.ctx.beginPath(); lex.ctx.arc(px, py, 5, 0, Math.PI*2); lex.ctx.fill();
          }

          lex.ctx.fillStyle = bg; lex.ctx.strokeStyle = '#2563EB'; lex.ctx.lineWidth = 4;
          lex.ctx.beginPath(); lex.ctx.arc(cx - 150, cy, 20, 0, Math.PI*2); lex.ctx.fill(); lex.ctx.stroke();
          lex.ctx.beginPath(); lex.ctx.arc(cx + 150, cy, 20, 0, Math.PI*2); lex.ctx.fill(); lex.ctx.stroke();
          
          lex.ctx.fillStyle = fg; lex.ctx.font = '14px monospace';
          lex.ctx.fillText('API_GATEWAY', cx - 180, cy + 45); lex.ctx.fillText('RAG_LLaMA3', cx + 110, cy + 45);
        } requestAnimationFrame(drawLex);
      }; drawLex();
    }

    // C. Anemia (Laser Hand Scan)
    const anemia = setupCanvas('anemiaCanvas');
    if (anemia) {
      let scanY = 0;
      const drawAnemia = () => {
        if(anemia.cvs.dataset.active === 'true') {
          anemia.ctx.fillStyle = bg; anemia.ctx.fillRect(0, 0, anemia.w(), anemia.h());
          let cx = anemia.w()/2; let cy = anemia.h()/2;
          
          anemia.ctx.strokeStyle = fg; anemia.ctx.lineWidth = 3; anemia.ctx.beginPath();
          anemia.ctx.arc(cx, cy + 60, 50, Math.PI, 0); // Palm
          anemia.ctx.moveTo(cx - 40, cy + 60); anemia.ctx.lineTo(cx - 40, cy - 60); // Finger 1
          anemia.ctx.moveTo(cx, cy + 60); anemia.ctx.lineTo(cx, cy - 80); // Finger 2
          anemia.ctx.moveTo(cx + 40, cy + 60); anemia.ctx.lineTo(cx + 40, cy - 50); // Finger 3
          anemia.ctx.stroke();

          scanY += 3; if(scanY > anemia.h()) scanY = 0;
          anemia.ctx.fillStyle = `rgba(223, 225, 4, 0.1)`; anemia.ctx.fillRect(0, 0, anemia.w(), scanY);
          anemia.ctx.strokeStyle = accent; anemia.ctx.lineWidth = 2;
          anemia.ctx.beginPath(); anemia.ctx.moveTo(0, scanY); anemia.ctx.lineTo(anemia.w(), scanY); anemia.ctx.stroke();
          
          anemia.ctx.fillStyle = bg; anemia.ctx.fillRect(cx - 110, cy + 100, 220, 45);
          anemia.ctx.strokeStyle = accent; anemia.ctx.strokeRect(cx - 110, cy + 100, 220, 45);
          anemia.ctx.fillStyle = accent; anemia.ctx.font = 'bold 16px monospace';
          anemia.ctx.fillText(scanY > cy ? 'DIAGNOSIS: NEGATIVE' : 'SCANNING NAIL BED...', cx - 95, cy + 128);
        } requestAnimationFrame(drawAnemia);
      }; drawAnemia();
    }

    // D. Sepsis (ICU ECG)
    const sepsis = setupCanvas('sepsisCanvas');
    if (sepsis) {
      let ecg = []; let x = 0;
      const drawSepsis = () => {
        if(sepsis.cvs.dataset.active === 'true') {
          sepsis.ctx.fillStyle = bg; sepsis.ctx.fillRect(0, 0, sepsis.w(), sepsis.h());
          let cy = sepsis.h()/3;
          
          x += 3; if(x > sepsis.w()) { x = 0; ecg = []; }
          let y = cy;
          if(x % 150 < 30) {
             if(x % 150 < 10) y = cy - 30;
             else if(x % 150 < 20) y = cy + 60;
             else if(x % 150 < 30) y = cy - 15;
          }
          ecg.push({x, y});

          sepsis.ctx.strokeStyle = accent; sepsis.ctx.lineWidth = 3; sepsis.ctx.beginPath();
          if(ecg.length > 0) {
            sepsis.ctx.moveTo(ecg[0].x, ecg[0].y);
            ecg.forEach(pt => sepsis.ctx.lineTo(pt.x, pt.y));
            sepsis.ctx.stroke();
          }

          let tx = sepsis.w()/2; let ty = sepsis.h() * 0.65;
          sepsis.ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`; sepsis.ctx.lineWidth = 2;
          sepsis.ctx.beginPath(); sepsis.ctx.moveTo(tx, ty); sepsis.ctx.lineTo(tx - 60, ty + 60); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.moveTo(tx, ty); sepsis.ctx.lineTo(tx + 60, ty + 60); sepsis.ctx.stroke();
          
          sepsis.ctx.fillStyle = bg; sepsis.ctx.strokeStyle = '#2563EB'; sepsis.ctx.lineWidth = 3;
          sepsis.ctx.beginPath(); sepsis.ctx.arc(tx, ty, 15, 0, Math.PI*2); sepsis.ctx.fill(); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.arc(tx - 60, ty + 60, 15, 0, Math.PI*2); sepsis.ctx.fill(); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.arc(tx + 60, ty + 60, 15, 0, Math.PI*2); sepsis.ctx.fill(); sepsis.ctx.stroke();

          sepsis.ctx.fillStyle = fg; sepsis.ctx.font = '14px monospace';
          sepsis.ctx.fillText('XGBOOST EVALUATION: SURVIVAL 96%', 20, sepsis.h() - 30);
        } requestAnimationFrame(drawSepsis);
      }; drawSepsis();
    }
  };

  // INIT
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    initScrollPhysics();
    initCanvas();
    initLoader(); // Run loader last
  });
})();
