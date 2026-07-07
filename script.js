/* ============================================
   AFNAAN AHMED P — DENSE ACADEMIC / SWE PORTFOLIO
   Strict 3s Loader + Advanced Canvas Simulations
   ============================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. LENIS SMOOTH SCROLL SETUP
  let lenis;
  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // 2. STRICT 3-SECOND ADVANCED TERMINAL LOADER
  const initLoader = () => {
    if (prefersReducedMotion) {
      document.getElementById("loader").style.display = "none";
      return;
    }

    if(lenis) lenis.stop();
    document.body.style.overflow = "hidden"; // Prevent native scroll
    
    const logsEl = document.getElementById('termLogs');
    const progressEl = document.getElementById('termProgress');
    const statusEl = document.getElementById('termStatus');
    
    const logs = [
      { t: 100, msg: "Initializing kernel... [OK]" },
      { t: 300, msg: "Mounting virtual file systems... [OK]" },
      { t: 600, msg: "Checking memory allocation... [OK]" },
      { t: 800, msg: "Loading portfolio dependencies... [WARN: Heavy load]" },
      { t: 1100, msg: "Establishing secure connection to LexCloud nodes..." },
      { t: 1500, msg: "LexCloud handshake successful. [OK]" },
      { t: 1800, msg: "Compiling V-Park computer vision models..." },
      { t: 2200, msg: "Loading CNN weights for Anemia Detection... [OK]" },
      { t: 2500, msg: "Starting XGBoost clinical decision engine..." },
      { t: 2800, msg: "System fully operational. Launching UI..." }
    ];

    let start = Date.now();
    let interval = setInterval(() => {
      let elapsed = Date.now() - start;
      let percent = Math.min(100, (elapsed / 3000) * 100);
      progressEl.style.width = percent + "%";
      statusEl.innerText = Math.floor(percent) + "%";

      if (elapsed >= 3000) {
        clearInterval(interval);
        // Loader Exit Animation
        gsap.to('#loader', {
          opacity: 0,
          scale: 1.05,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            document.getElementById("loader").style.display = "none";
            document.body.style.overflow = "";
            if(lenis) lenis.start();
          }
        });
      }
    }, 30);

    // Inject logs based on time
    logs.forEach(log => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'log-line';
        
        let statusHtml = '';
        if (log.msg.includes('[OK]')) {
          log.msg = log.msg.replace('[OK]', '');
          statusHtml = '<span class="status ok">[OK]</span>';
        } else if (log.msg.includes('[WARN')) {
          let warnMsg = log.msg.substring(log.msg.indexOf('[WARN'));
          log.msg = log.msg.replace(warnMsg, '');
          statusHtml = `<span class="status warn">${warnMsg}</span>`;
        }

        const date = new Date();
        const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
        
        line.innerHTML = `<span class="time">[${timeStr}]</span>${log.msg}${statusHtml}`;
        logsEl.appendChild(line);
        logsEl.scrollTop = logsEl.scrollHeight; // Auto-scroll
      }, log.t);
    });
  };

  // 3. THEME TOGGLE LOGIC
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

  // 4. HIGHLY ADVANCED CANVAS ANIMATIONS
  const initCanvas = () => {
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

    const isLight = () => document.body.classList.contains('light-theme');

    // 4A: V-PARK (Pathfinding & YOLO Box Simulation)
    const vpark = setupCanvas('vparkCanvas');
    if (vpark) {
      let cars = Array.from({length: 5}, () => ({
        x: Math.random() * vpark.w(), y: -20,
        targetX: Math.random() * vpark.w(), targetY: vpark.h() * (0.2 + Math.random()*0.6),
        speed: 1 + Math.random(),
        parked: false, parkTime: 0
      }));

      const drawVPark = () => {
        vpark.ctx.fillStyle = isLight() ? '#f6f8fa' : '#0d1117';
        vpark.ctx.fillRect(0, 0, vpark.w(), vpark.h());

        // Draw Grid
        vpark.ctx.strokeStyle = isLight() ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
        vpark.ctx.lineWidth = 1;
        for (let i=0; i<vpark.w(); i+=40) { vpark.ctx.beginPath(); vpark.ctx.moveTo(i,0); vpark.ctx.lineTo(i,vpark.h()); vpark.ctx.stroke(); }
        for (let i=0; i<vpark.h(); i+=40) { vpark.ctx.beginPath(); vpark.ctx.moveTo(0,i); vpark.ctx.lineTo(vpark.w(),i); vpark.ctx.stroke(); }

        cars.forEach(car => {
          if (!car.parked) {
            let dx = car.targetX - car.x;
            let dy = car.targetY - car.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 5) {
              car.parked = true; car.parkTime = Date.now();
            } else {
              car.x += (dx/dist) * car.speed;
              car.y += (dy/dist) * car.speed;
            }
          } else {
            if (Date.now() - car.parkTime > 3000) {
              car.parked = false; car.y = -20; car.x = Math.random() * vpark.w();
              car.targetX = Math.random() * vpark.w(); car.targetY = vpark.h() * (0.2 + Math.random()*0.6);
            }
          }

          // Draw Car
          vpark.ctx.fillStyle = isLight() ? '#0969da' : '#58a6ff';
          vpark.ctx.fillRect(car.x - 5, car.y - 10, 10, 20);

          // Draw YOLO Box
          if (car.parked) {
            vpark.ctx.strokeStyle = '#7ee787'; // Green box
            vpark.ctx.lineWidth = 1.5;
            vpark.ctx.strokeRect(car.x - 15, car.y - 20, 30, 40);
            vpark.ctx.fillStyle = '#7ee787';
            vpark.ctx.font = '10px monospace';
            vpark.ctx.fillText("SLOT_FULL: 98%", car.x - 15, car.y - 25);
          } else {
            vpark.ctx.strokeStyle = '#ff7b72'; // Red box tracking
            vpark.ctx.lineWidth = 1;
            vpark.ctx.strokeRect(car.x - 12, car.y - 15, 24, 30);
          }
        });
        requestAnimationFrame(drawVPark);
      };
      drawVPark();
    }

    // 4B: ANEMIA (Eye Scanning & CNN Feature Maps)
    const anemia = setupCanvas('anemiaCanvas');
    if (anemia) {
      let scanLineY = 0;
      const drawAnemia = () => {
        anemia.ctx.fillStyle = isLight() ? '#f6f8fa' : '#0d1117';
        anemia.ctx.fillRect(0, 0, anemia.w(), anemia.h());

        const cx = anemia.w()/2;
        const cy = anemia.h()/2;

        // Draw Eye Wireframe
        anemia.ctx.strokeStyle = isLight() ? '#24292f' : '#c9d1d9';
        anemia.ctx.lineWidth = 2;
        anemia.ctx.beginPath();
        anemia.ctx.ellipse(cx, cy, 80, 40, 0, 0, 2*Math.PI);
        anemia.ctx.stroke();
        anemia.ctx.beginPath();
        anemia.ctx.arc(cx, cy, 20, 0, 2*Math.PI);
        anemia.ctx.stroke();

        // Draw Scan Line
        anemia.ctx.strokeStyle = 'rgba(88, 166, 255, 0.8)';
        anemia.ctx.lineWidth = 2;
        anemia.ctx.beginPath();
        anemia.ctx.moveTo(cx - 100, scanLineY);
        anemia.ctx.lineTo(cx + 100, scanLineY);
        anemia.ctx.stroke();
        
        // Scan glow
        anemia.ctx.fillStyle = 'rgba(88, 166, 255, 0.1)';
        anemia.ctx.fillRect(cx - 100, 0, 200, scanLineY);

        scanLineY += 2;
        if (scanLineY > anemia.h()) scanLineY = 0;

        // CNN Matrix overlay (fake)
        anemia.ctx.fillStyle = isLight() ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
        anemia.ctx.font = '8px monospace';
        if (Math.random() > 0.8) {
          anemia.ctx.fillText(`Conv2D [${Math.floor(Math.random()*255)}]`, cx + 90, scanLineY);
        }

        requestAnimationFrame(drawAnemia);
      };
      drawAnemia();
    }

    // 4C: LEXCLOUD (Decentralized Node Graph Encryption)
    const lex = setupCanvas('lexcloudCanvas');
    if (lex) {
      const nodes = Array.from({length: 15}, () => ({
        x: Math.random() * lex.w(), y: Math.random() * lex.h(),
        vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5
      }));
      let t = 0;

      const drawLex = () => {
        lex.ctx.fillStyle = isLight() ? '#f6f8fa' : '#0d1117';
        lex.ctx.fillRect(0, 0, lex.w(), lex.h());

        nodes.forEach(n => {
          n.x += n.vx; n.y += n.vy;
          if(n.x < 0 || n.x > lex.w()) n.vx *= -1;
          if(n.y < 0 || n.y > lex.h()) n.vy *= -1;
          
          lex.ctx.fillStyle = isLight() ? '#0969da' : '#58a6ff';
          lex.ctx.beginPath(); lex.ctx.arc(n.x, n.y, 3, 0, 2*Math.PI); lex.ctx.fill();
        });

        lex.ctx.strokeStyle = isLight() ? 'rgba(9, 105, 218, 0.15)' : 'rgba(88, 166, 255, 0.15)';
        for(let i=0; i<nodes.length; i++) {
          for(let j=i+1; j<nodes.length; j++) {
            let dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (dist < 100) {
              lex.ctx.lineWidth = 1 - (dist/100);
              lex.ctx.beginPath(); lex.ctx.moveTo(nodes[i].x, nodes[i].y); lex.ctx.lineTo(nodes[j].x, nodes[j].y); lex.ctx.stroke();
              
              // Packets moving along lines
              if (Math.random() > 0.95) {
                let pPos = (t % 100) / 100;
                let px = nodes[i].x + (nodes[j].x - nodes[i].x) * pPos;
                let py = nodes[i].y + (nodes[j].y - nodes[i].y) * pPos;
                lex.ctx.fillStyle = '#7ee787';
                lex.ctx.beginPath(); lex.ctx.arc(px, py, 2, 0, 2*Math.PI); lex.ctx.fill();
              }
            }
          }
        }
        t++;
        requestAnimationFrame(drawLex);
      };
      drawLex();
    }

    // 4D: SEPSIS (ECG Monitor + XGBoost Tree)
    const sepsis = setupCanvas('sepsisCanvas');
    if (sepsis) {
      let ecg = [];
      let t = 0;
      const drawSepsis = () => {
        sepsis.ctx.fillStyle = isLight() ? '#f6f8fa' : '#0d1117';
        sepsis.ctx.fillRect(0, 0, sepsis.w(), sepsis.h());

        // Background Decision Tree Nodes (Fake)
        sepsis.ctx.strokeStyle = isLight() ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
        sepsis.ctx.lineWidth = 1;
        const drawTree = (x, y, level, spacing) => {
          if (level === 0) return;
          sepsis.ctx.beginPath(); sepsis.ctx.arc(x, y, 4, 0, 2*Math.PI); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.moveTo(x, y); sepsis.ctx.lineTo(x - spacing, y + 30); sepsis.ctx.stroke();
          sepsis.ctx.beginPath(); sepsis.ctx.moveTo(x, y); sepsis.ctx.lineTo(x + spacing, y + 30); sepsis.ctx.stroke();
          drawTree(x - spacing, y + 30, level - 1, spacing / 2);
          drawTree(x + spacing, y + 30, level - 1, spacing / 2);
        };
        drawTree(sepsis.w()/2, 20, 4, 60);

        // Active ECG Line
        let ecgY = sepsis.h() / 2;
        if (t % 100 < 10) ecgY -= 40;
        else if (t % 100 < 20) ecgY += 20;
        else ecgY += (Math.random() - 0.5) * 5;

        ecg.push(ecgY);
        if (ecg.length > sepsis.w() / 2) ecg.shift();

        sepsis.ctx.strokeStyle = '#ff7b72'; // Red warning color
        sepsis.ctx.lineWidth = 2;
        sepsis.ctx.beginPath();
        for(let i=0; i<ecg.length; i++) {
          let px = i * 2;
          if (i === 0) sepsis.ctx.moveTo(px, ecg[i]);
          else sepsis.ctx.lineTo(px, ecg[i]);
        }
        sepsis.ctx.stroke();

        // Readout text
        sepsis.ctx.fillStyle = '#ff7b72';
        sepsis.ctx.font = '12px monospace';
        sepsis.ctx.fillText(`HR: ${Math.floor(80 + Math.random()*20)} | RISK: HIGH`, 10, sepsis.h() - 10);

        t++;
        requestAnimationFrame(drawSepsis);
      };
      drawSepsis();
    }
  };

  // INIT ALL
  window.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initCanvas();
    initLoader(); 
  });

})();
