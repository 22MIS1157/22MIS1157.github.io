/* ============================================
   AFNAAN AHMED P — INTERACTIVE RESUME
   GSAP Animations & Canvas Engine
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

  // 2. THEME SWITCHER
  const themeToggle = document.getElementById('theme-toggle');
  const iconDark = document.querySelector('.icon-dark');
  const iconLight = document.querySelector('.icon-light');
  let currentTheme = 'dark';
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark') { iconDark.style.display = 'block'; iconLight.style.display = 'none'; }
    else { iconDark.style.display = 'none'; iconLight.style.display = 'block'; }
  });

  // 3. TEXT SPLITTING (Vanilla)
  const splitText = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.innerText; el.innerHTML = '';
      text.split(' ').forEach(word => {
        if(!word) return;
        const wordDiv = document.createElement('div'); wordDiv.style.display = 'inline-block'; wordDiv.style.marginRight = '0.3em'; wordDiv.style.overflow = 'hidden';
        word.split('').forEach(char => {
          const charSpan = document.createElement('span'); charSpan.className = 'char'; charSpan.style.display = 'inline-block'; charSpan.innerHTML = char;
          wordDiv.appendChild(charSpan);
        });
        el.appendChild(wordDiv);
      });
    });
  };

  // 4. JAW-DROPPING HERO ASSEMBLY
  const initHero = () => {
    splitText('.split-name');
    splitText('.split-text');
    gsap.set('.char', { y: '110%' });
    gsap.set('.fade-up-hero', { autoAlpha: 0, y: 30 });
    gsap.set('.fade-up-nav', { autoAlpha: 0, y: -30 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.split-name .char', { y: '0%', duration: 1.2, stagger: 0.04, ease: 'expo.out' })
      .to('.split-text .char', { y: '0%', duration: 0.8, stagger: 0.02, ease: 'power3.out' }, "-=0.8")
      .to('.fade-up-hero', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }, "-=0.5")
      .to('.fade-up-nav', { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.8");
  };

  // 5. RESUME SCROLL ANIMATIONS (No Overlaps)
  const initScrollAnim = () => {
    if(prefersReducedMotion) return;
    
    // Standard fade-ups for content
    gsap.utils.toArray('.fade-up-content').forEach(el => {
      gsap.fromTo(el, { autoAlpha: 0, y: 40 }, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out'
      });
    });

    // Section Titles animate in, but stay in flow (no overlapping fixed layers)
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header, { autoAlpha: 0, x: -30 }, {
        scrollTrigger: { trigger: header, start: 'top 90%' },
        autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out'
      });
      gsap.fromTo(header.querySelector('.header-line'), { scaleX: 0 }, {
        scrollTrigger: { trigger: header, start: 'top 90%' },
        scaleX: 1, transformOrigin: 'left', duration: 1.5, ease: 'power4.out'
      });
    });
  };

  // 6. COMPLEX ILLUSTRATIVE CANVASES
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

    const getColors = () => currentTheme === 'dark' ? { bg: '#111a2f', fg: '#94a3b8', accent: '#00e5ff' } : { bg: '#ffffff', fg: '#475569', accent: '#1d4ed8' };

    // A. VPark (2D Top-Down Car Scan)
    const vpark = setupCanvas('vparkCanvas');
    if (vpark) {
      let carY = -50; let state = 0; let timer = 0;
      const drawVPark = () => {
        if(vpark.cvs.dataset.active === 'true') {
          const c = getColors(); vpark.ctx.fillStyle = c.bg; vpark.ctx.fillRect(0, 0, vpark.w(), vpark.h());
          let cx = vpark.w()/2;
          
          // Draw parking lines
          vpark.ctx.strokeStyle = c.fg; vpark.ctx.lineWidth = 2;
          vpark.ctx.strokeRect(cx - 60, vpark.h()/2 - 100, 120, 200);
          
          // Animation Logic
          if(state === 0) { carY += 2; if(carY > vpark.h()/2 - 40) state = 1; }
          else if(state === 1) { timer++; if(timer > 60) { state = 2; timer = 0; } }
          else if(state === 2) { carY -= 1; if(carY < vpark.h()/2 - 80) { state = 3; timer = 0; } }
          else if(state === 3) { timer++; if(timer > 100) { state = 0; carY = -50; timer = 0; } }

          // Draw Car
          vpark.ctx.fillStyle = c.fg; vpark.ctx.fillRect(cx - 30, carY, 60, 100);
          
          // YOLO Box
          if(state === 1 || state === 2) {
            vpark.ctx.strokeStyle = '#22c55e'; vpark.ctx.lineWidth = 3;
            vpark.ctx.strokeRect(cx - 35, carY - 5, 70, 110);
            vpark.ctx.fillStyle = '#22c55e'; vpark.ctx.font = '12px monospace';
            vpark.ctx.fillText('CAR: 0.98', cx - 35, carY - 10);
          }
          
          // UI Text
          vpark.ctx.fillStyle = c.accent; vpark.ctx.font = 'bold 16px monospace';
          if(state === 3) vpark.ctx.fillText('SPACE ALLOCATED', cx - 70, vpark.h() - 30);
          else vpark.ctx.fillText('SCANNING...', cx - 45, vpark.h() - 30);

        } requestAnimationFrame(drawVPark);
      }; drawVPark();
    }

    // B. Anemia (2D Hand & Laser)
    const anemia = setupCanvas('anemiaCanvas');
    if (anemia) {
      let scanY = 0;
      const drawAnemia = () => {
        if(anemia.cvs.dataset.active === 'true') {
          const c = getColors(); anemia.ctx.fillStyle = c.bg; anemia.ctx.fillRect(0, 0, anemia.w(), anemia.h());
          let cx = anemia.w()/2; let cy = anemia.h()/2;
          
          // Draw Hand Outline
          anemia.ctx.strokeStyle = c.fg; anemia.ctx.lineWidth = 3; anemia.ctx.beginPath();
          anemia.ctx.arc(cx, cy + 50, 40, Math.PI, 0); // Palm
          anemia.ctx.moveTo(cx - 30, cy + 50); anemia.ctx.lineTo(cx - 30, cy - 40); // Finger 1
          anemia.ctx.moveTo(cx, cy + 50); anemia.ctx.lineTo(cx, cy - 50); // Finger 2
          anemia.ctx.moveTo(cx + 30, cy + 50); anemia.ctx.lineTo(cx + 30, cy - 30); // Finger 3
          anemia.ctx.stroke();

          // Laser
          scanY += 2; if(scanY > anemia.h()) scanY = 0;
          anemia.ctx.fillStyle = `rgba(0, 229, 255, 0.2)`; anemia.ctx.fillRect(0, 0, anemia.w(), scanY);
          anemia.ctx.strokeStyle = c.accent; anemia.ctx.lineWidth = 2;
          anemia.ctx.beginPath(); anemia.ctx.moveTo(0, scanY); anemia.ctx.lineTo(anemia.w(), scanY); anemia.ctx.stroke();
          
          // Output terminal
          anemia.ctx.fillStyle = c.bg; anemia.ctx.fillRect(cx - 90, cy + 80, 180, 40);
          anemia.ctx.strokeStyle = c.accent; anemia.ctx.strokeRect(cx - 90, cy + 80, 180, 40);
          anemia.ctx.fillStyle = c.accent; anemia.ctx.font = 'bold 14px monospace';
          anemia.ctx.fillText(scanY > cy ? 'ANEMIA: NEGATIVE' : 'ANALYZING...', cx - 75, cy + 105);

        } requestAnimationFrame(drawAnemia);
      }; drawAnemia();
    }

    // C. LexCloud (Cloud Data Flow)
    const lex = setupCanvas('lexcloudCanvas');
    if (lex) {
      let packets = [];
      const drawLex = () => {
        if(lex.cvs.dataset.active === 'true') {
          const c = getColors(); lex.ctx.fillStyle = c.bg; lex.ctx.fillRect(0, 0, lex.w(), lex.h());
          let cx = lex.w()/2; let cy = lex.h()/2;

          // Lines
          lex.ctx.strokeStyle = c.fg; lex.ctx.lineWidth = 2; lex.ctx.beginPath();
          lex.ctx.moveTo(cx - 100, cy); lex.ctx.lineTo(cx, cy - 50); lex.ctx.lineTo(cx + 100, cy); lex.ctx.stroke();
          lex.ctx.moveTo(cx - 100, cy); lex.ctx.lineTo(cx, cy + 50); lex.ctx.lineTo(cx + 100, cy); lex.ctx.stroke();

          // Packets
          if(Math.random() > 0.95) packets.push({ p: 0, path: Math.random() > 0.5 ? 1 : 2 });
          lex.ctx.fillStyle = c.accent;
          for(let i=packets.length-1; i>=0; i--) {
            let pk = packets[i]; pk.p += 0.01;
            if(pk.p >= 1) { packets.splice(i, 1); continue; }
            let px = cx - 100 + (200 * pk.p);
            let py = pk.path === 1 ? cy - (50 * Math.sin(pk.p * Math.PI)) : cy + (50 * Math.sin(pk.p * Math.PI));
            lex.ctx.beginPath(); lex.ctx.arc(px, py, 4, 0, Math.PI*2); lex.ctx.fill();
          }

          // Nodes
          lex.ctx.fillStyle = c.bg; lex.ctx.strokeStyle = c.accent; lex.ctx.lineWidth = 3;
          lex.ctx.beginPath(); lex.ctx.arc(cx - 100, cy, 15, 0, Math.PI*2); lex.ctx.fill(); lex.ctx.stroke();
          lex.ctx.beginPath(); lex.ctx.arc(cx + 100, cy, 15, 0, Math.PI*2); lex.ctx.fill(); lex.ctx.stroke();
          
          lex.ctx.fillStyle = c.accent; lex.ctx.font = '12px monospace';
          lex.ctx.fillText('API', cx - 110, cy + 35); lex.ctx.fillText('RAG', cx + 90, cy + 35);

        } requestAnimationFrame(drawLex);
      }; drawLex();
    }

    // D. Sepsis (ECG & Tree)
    const sepsis = setupCanvas('sepsisCanvas');
    if (sepsis) {
      let ecg = []; let x = 0;
      const drawSepsis = () => {
        if(sepsis.cvs.dataset.active === 'true') {
          const c = getColors(); sepsis.ctx.fillStyle = c.bg; sepsis.ctx.fillRect(0, 0, sepsis.w(), sepsis.h());
          let cy = sepsis.h()/3;
          
          // ECG
          x += 2; if(x > sepsis.w()) { x = 0; ecg = []; }
          let y = cy;
          if(x % 100 < 20) {
             if(x % 100 < 5) y = cy - 20;
             else if(x % 100 < 10) y = cy + 40;
             else if(x % 100 < 15) y = cy - 10;
          }
          ecg.push({x, y});

          sepsis.ctx.strokeStyle = c.accent; sepsis.ctx.lineWidth = 2; sepsis.ctx.beginPath();
          if(ecg.length > 0) {
            sepsis.ctx.moveTo(ecg[0].x, ecg[0].y);
            ecg.forEach(pt => sepsis.ctx.lineTo(pt.x, pt.y));
            sepsis.ctx.stroke();
          }

          // Decision Tree Nodes
          let tx = sepsis.w()/2; let ty = sepsis.h() * 0.6;
          sepsis.ctx.strokeStyle = c.fg;
          sepsis.ctx.beginPath(); sepsis.ctx.moveTo(tx, ty); sepsis.ctx.lineTo(tx - 40, ty + 40); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.moveTo(tx, ty); sepsis.ctx.lineTo(tx + 40, ty + 40); sepsis.ctx.stroke();
          
          sepsis.ctx.fillStyle = c.bg; sepsis.ctx.strokeStyle = c.accent; sepsis.ctx.lineWidth = 2;
          sepsis.ctx.beginPath(); sepsis.ctx.arc(tx, ty, 10, 0, Math.PI*2); sepsis.ctx.fill(); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.arc(tx - 40, ty + 40, 10, 0, Math.PI*2); sepsis.ctx.fill(); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.arc(tx + 40, ty + 40, 10, 0, Math.PI*2); sepsis.ctx.fill(); sepsis.ctx.stroke();

          sepsis.ctx.fillStyle = c.fg; sepsis.ctx.font = '12px monospace';
          sepsis.ctx.fillText('XGBOOST: SURVIVAL 96%', 10, sepsis.h() - 20);

        } requestAnimationFrame(drawSepsis);
      }; drawSepsis();
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    initHero();
    initScrollAnim();
    initCanvas();
  });
})();
