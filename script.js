/* ═══════════════════════════════════════════════════
   SOLO LEVELING PORTFOLIO — ADVANCED ANIMATION ENGINE
   Malevolent Shrine Slash Engine, Live Location HUD Tracker,
   Upgraded Skills Telemetry, Custom Canvas Simulators
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    /* ═══════════════════════════
       1. HERO NAME SUMMONING & MALEVOLENT SHRINE SLASHES
    ═══════════════════════════ */
    const nameCanvas = $('#nameCanvas');
    let nameCtx = null;
    let nameParticles = [];
    let nameSummonActive = false;
    let letterTargets = [];

    function triggerNameSummon() {
        const nameWrapper = $('#heroNameWrap');
        if (nameWrapper) {
            nameWrapper.classList.add('shrine-active');
            triggerSlashDischarge();
        }

        if (!nameCanvas) return;
        nameCtx = nameCanvas.getContext('2d');
        
        nameCanvas.width = nameCanvas.offsetWidth || 800;
        nameCanvas.height = nameCanvas.offsetHeight || 240;

        const chars = $$('.sl-char');
        if (chars.length > 0 && nameWrapper) {
            const wrapRect = nameWrapper.getBoundingClientRect();
            letterTargets = Array.from(chars).map(el => {
                const rect = el.getBoundingClientRect();
                return {
                    element: el,
                    x: (rect.left + rect.width / 2) - wrapRect.left,
                    y: (rect.top + rect.height / 2) - wrapRect.top
                };
            });
        }

        const pCount = 180;
        for (let i = 0; i < pCount; i++) {
            const tIdx = letterTargets.length > 0 ? i % letterTargets.length : 0;
            const target = letterTargets[tIdx] || { x: nameCanvas.width/2, y: nameCanvas.height/2 };
            
            nameParticles.push({
                x: nameCanvas.width / 2 + (Math.random() - 0.5) * 80,
                y: nameCanvas.height / 2 + (Math.random() - 0.5) * 50,
                tx: target.x,
                ty: target.y,
                size: Math.random() * 2.8 + 1.2,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 12 - 4,
                color: `hsla(${195 + Math.random() * 45}, 95%, ${65 + Math.random() * 20}%, `,
                life: Math.random() * 50 + 30,
                age: 0
            });
        }

        nameSummonActive = true;
        animateNameSummon();
    }

    function animateNameSummon() {
        if (!nameSummonActive || !nameCtx) return;
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        let completed = true;

        nameParticles.forEach(p => {
            p.age++;
            if (p.age < 20) {
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.93; p.vy *= 0.93;
                completed = false;
            } else {
                const dx = p.tx - p.x;
                const dy = p.ty - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 2) {
                    p.x += dx * 0.16;
                    p.y += dy * 0.16;
                    completed = false;
                } else {
                    p.x = p.tx; p.y = p.ty;
                }
            }

            const alpha = Math.max(0, 1 - p.age / 90);
            nameCtx.beginPath();
            nameCtx.arc(p.x, p.y, p.size * (1 + alpha), 0, Math.PI * 2);
            nameCtx.fillStyle = p.color + alpha + ')';
            nameCtx.fill();
        });

        if (!completed) {
            requestAnimationFrame(animateNameSummon);
        } else {
            animateAmbientNameFlames();
        }
    }

    function animateAmbientNameFlames() {
        if (!nameCtx) return;
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

        if (Math.random() < 0.4 && nameParticles.length < 70) {
            const target = letterTargets.length > 0 ? letterTargets[Math.floor(Math.random() * letterTargets.length)] : { x: nameCanvas.width/2, y: nameCanvas.height/2 };
            nameParticles.push({
                x: target.x + (Math.random() - 0.5) * 26,
                y: target.y + 14,
                vy: -Math.random() * 0.8 - 0.4,
                vx: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 1,
                color: `hsla(${200 + Math.random() * 40}, 90%, 75%, `,
                life: Math.random() * 30 + 15,
                age: 0,
                ambient: true
            });
        }

        nameParticles = nameParticles.filter(p => {
            if (p.ambient) {
                p.x += p.vx; p.y += p.vy; p.age++;
                if (p.age > p.life) return false;
                const alpha = 1 - p.age / p.life;
                nameCtx.beginPath();
                nameCtx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                nameCtx.fillStyle = p.color + (alpha * 0.45) + ')';
                nameCtx.fill();
                return true;
            }
            return false;
        });

        requestAnimationFrame(animateAmbientNameFlames);
    }


    /* ═══════════════════════════
       2. SLASH CANVAS DISCHARGE (MALEVOLENT SHRINE SPARKS)
    ═══════════════════════════ */
    const slashCanvas = $('#slashCanvas');
    let slashCtx = null;
    let sparkParticles = [];

    function triggerSlashDischarge() {
        if (!slashCanvas) return;
        slashCtx = slashCanvas.getContext('2d');
        slashCanvas.width = window.innerWidth;
        slashCanvas.height = window.innerHeight;

        for (let i = 0; i < 60; i++) {
            sparkParticles.push({
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                y: window.innerHeight / 3 + (Math.random() - 0.5) * 150,
                vx: (Math.random() - 0.5) * 25,
                vy: (Math.random() - 0.5) * 25,
                color: Math.random() > 0.5 ? '#ff0055' : '#00d4ff',
                size: Math.random() * 3 + 1,
                life: Math.random() * 25 + 10,
                age: 0
            });
        }
        animateSparks();
    }

    function animateSparks() {
        if (!slashCtx || sparkParticles.length === 0) return;
        slashCtx.clearRect(0, 0, slashCanvas.width, slashCanvas.height);

        sparkParticles = sparkParticles.filter(p => {
            p.x += p.vx; p.y += p.vy; p.age++;
            if (p.age > p.life) return false;
            const alpha = 1 - p.age / p.life;
            slashCtx.beginPath();
            slashCtx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            slashCtx.fillStyle = p.color;
            slashCtx.shadowColor = p.color;
            slashCtx.shadowBlur = 10;
            slashCtx.fill();
            slashCtx.shadowBlur = 0;
            return true;
        });

        if (sparkParticles.length > 0) {
            requestAnimationFrame(animateSparks);
        }
    }


    /* ═══════════════════════════
       3. LIVE SECTION INDICATOR TRACKER IN NAV
    ═══════════════════════════ */
    const navLocation = $('#navLocation');
    function updateActiveSection() {
        const viewHeight = window.innerHeight;
        let currentSection = 'SYSTEM ONLINE';

        $$('.sys-section').forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= viewHeight * 0.4 && rect.bottom >= viewHeight * 0.2) {
                const name = sec.dataset.sectionName;
                if (name) currentSection = `LOCATION: ${name}`;
            }
        });

        if (navLocation && navLocation.textContent !== currentSection) {
            navLocation.textContent = currentSection;
        }
    }


    /* ═══════════════════════════
       4. GLOBAL CANVAS & LIGHTNING ATMOSPHERE
    ═══════════════════════════ */
    const globalCanvas = $('#globalCanvas');
    if (globalCanvas) {
        const ctx = globalCanvas.getContext('2d');
        let particles = [];
        let lightning = null;

        function resizeGlobal() {
            globalCanvas.width = window.innerWidth;
            globalCanvas.height = window.innerHeight;
        }
        resizeGlobal();
        window.addEventListener('resize', resizeGlobal);

        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * globalCanvas.width,
                y: Math.random() * globalCanvas.height,
                size: Math.random() * 1.6 + 0.4,
                speedY: -Math.random() * 0.35 - 0.1,
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.25 + 0.05
            });
        }

        function triggerLightning() {
            const startX = Math.random() * globalCanvas.width;
            const segments = [];
            let currY = 0;
            let currX = startX;
            while (currY < globalCanvas.height) {
                const nextY = currY + Math.random() * 40 + 20;
                const nextX = currX + (Math.random() - 0.5) * 30;
                segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });
                currY = nextY;
                currX = nextX;
            }
            lightning = { segments, opacity: 0.9 };
        }

        setInterval(() => {
            if (Math.random() < 0.15) triggerLightning();
        }, 2500);

        function drawGlobal() {
            ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
            
            particles.forEach(p => {
                p.y += p.speedY; p.x += p.speedX;
                if (p.y < -10) { p.y = globalCanvas.height + 10; p.x = Math.random() * globalCanvas.width; }
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`; ctx.fill();
            });

            if (lightning && lightning.opacity > 0) {
                ctx.strokeStyle = `rgba(0, 212, 255, ${lightning.opacity})`;
                ctx.lineWidth = 2;
                ctx.shadowColor = 'rgba(0, 212, 255, 0.8)';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                lightning.segments.forEach(seg => {
                    ctx.moveTo(seg.x1, seg.y1);
                    ctx.lineTo(seg.x2, seg.y2);
                });
                ctx.stroke();
                ctx.shadowBlur = 0;
                lightning.opacity -= 0.07;
            }

            requestAnimationFrame(drawGlobal);
        }
        drawGlobal();
    }


    /* ═══════════════════════════
       5. HERO ENERGY ATMOSPHERE
    ═══════════════════════════ */
    const heroCanvas = $('#heroCanvas');
    if (heroCanvas) {
        const hCtx = heroCanvas.getContext('2d');
        let hParts = [];

        function resizeHero() {
            heroCanvas.width = heroCanvas.parentElement.offsetWidth;
            heroCanvas.height = heroCanvas.parentElement.offsetHeight;
        }
        resizeHero();
        window.addEventListener('resize', resizeHero);

        for (let i = 0; i < 35; i++) {
            hParts.push({
                x: Math.random() * heroCanvas.width,
                y: heroCanvas.height + 20,
                size: Math.random() * 1.5 + 0.3,
                vy: -Math.random() * 1.2 - 0.4,
                vx: (Math.random() - 0.5) * 0.3,
                op: Math.random() * 0.4 + 0.15,
                life: Math.random() * 140 + 60,
                age: 0
            });
        }

        function drawHero() {
            hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            hParts.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.age++;
                if (p.age > p.life) {
                    p.x = Math.random() * heroCanvas.width; p.y = heroCanvas.height + 20;
                    p.age = 0; p.op = Math.random() * 0.4 + 0.15;
                }
                const alpha = Math.max(0, p.op * (1 - p.age / p.life));
                hCtx.beginPath(); hCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                hCtx.fillStyle = `rgba(0, 212, 255, ${alpha})`; hCtx.fill();
            });
            requestAnimationFrame(drawHero);
        }
        drawHero();
    }


    /* ═══════════════════════════
       6. PROJECT CANVAS SIMULATORS
    ═══════════════════════════ */
    $$('.project-card-canvas').forEach(canvas => {
        const c = canvas.getContext('2d');
        const sim = canvas.dataset.sim;
        let w = 220, h = 300, frame = 0;

        function resize() {
            w = canvas.width = canvas.offsetWidth || 220;
            h = canvas.height = canvas.offsetHeight || 300;
        }
        resize();
        window.addEventListener('resize', resize);

        function runVpark() {
            c.clearRect(0, 0, w, h);
            c.strokeStyle = 'rgba(0, 212, 255, 0.08)'; c.lineWidth = 1;
            for (let i = 0; i < w; i += 25) {
                c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
            }
            const scanY = (frame * 2.8) % h;
            c.fillStyle = 'rgba(0, 212, 255, 0.08)'; c.fillRect(0, scanY - 20, w, 20);
            c.beginPath(); c.moveTo(0, scanY); c.lineTo(w, scanY);
            c.strokeStyle = 'rgba(0, 212, 255, 0.6)'; c.lineWidth = 2; c.stroke();

            const objY = [60, 140, 220];
            objY.forEach((y, i) => {
                const detected = scanY > y - 20;
                c.strokeStyle = detected ? '#10b981' : 'rgba(255, 190, 11, 0.4)';
                c.strokeRect(30, y, w - 60, 36);
                c.fillStyle = detected ? 'rgba(16, 185, 129, 0.9)' : 'rgba(255, 190, 11, 0.8)';
                c.font = '8px monospace';
                c.fillText(detected ? `CAR DETECTED [L${i+1}]` : `SCANNING L${i+1}...`, 38, y + 15);
                c.fillStyle = 'rgba(0, 212, 255, 0.6)';
                c.fillText(detected ? 'STATE: ALLOCATED' : 'STATE: VACANT', 38, y + 27);
            });
        }

        function runAnemia() {
            c.clearRect(0, 0, w, h);
            const cx = w/2, cy = h/2 - 20, rx = 30, ry = 50;
            c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            c.strokeStyle = 'rgba(0, 212, 255, 0.25)'; c.stroke();
            
            const scanY = cy - ry + ((frame * 2) % (ry * 2));
            c.beginPath(); c.moveTo(cx - rx, scanY); c.lineTo(cx + rx, scanY);
            c.strokeStyle = 'rgba(0, 212, 255, 0.75)'; c.lineWidth = 1.5; c.stroke();

            c.strokeStyle = '#10b981'; c.strokeRect(cx - rx - 6, cy - ry - 6, rx*2+12, ry*2+12);
            c.fillStyle = 'rgba(0, 212, 255, 0.6)'; c.font = '8px monospace';
            c.fillText('NAIL SEGMENTATION', 12, 20);
            
            const classified = scanY > cy + 10;
            c.fillStyle = classified ? '#10b981' : '#ffbe0b';
            c.font = 'bold 9px monospace';
            c.fillText(classified ? 'HEALTHY (96% ACC)' : 'DIAGNOSING NAIL...', cx - 45, cy + ry + 25);
        }

        const nodes = [
            { x: w/2, y: 40, label: 'GW' },
            { x: 35, y: 110, label: 'LAMBDA' },
            { x: w - 35, y: 110, label: 'S3' },
            { x: w/2, y: 180, label: 'DB' },
            { x: w/2, y: 250, label: 'RAG' }
        ];
        function runLexcloud() {
            c.clearRect(0, 0, w, h);
            const paths = [[0,1],[0,2],[1,3],[2,3],[3,4]];
            paths.forEach(([a,b]) => {
                c.beginPath(); c.moveTo(nodes[a].x, nodes[a].y); c.lineTo(nodes[b].x, nodes[b].y);
                c.strokeStyle = 'rgba(157, 78, 221, 0.3)'; c.stroke();
                const progress = (frame * 0.015 + a * 0.2) % 1;
                const px = nodes[a].x + (nodes[b].x - nodes[a].x) * progress;
                const py = nodes[a].y + (nodes[b].y - nodes[a].y) * progress;
                c.beginPath(); c.arc(px, py, 2.5, 0, Math.PI * 2);
                c.fillStyle = 'rgba(0, 212, 255, 0.85)'; c.fill();
            });
            nodes.forEach(node => {
                c.beginPath(); c.arc(node.x, node.y, 12, 0, Math.PI * 2);
                c.fillStyle = '#0c1122'; c.fill();
                c.strokeStyle = 'rgba(157, 78, 221, 0.8)'; c.stroke();
                c.fillStyle = 'rgba(0, 212, 255, 0.7)'; c.font = 'bold 6px monospace';
                c.textAlign = 'center'; c.fillText(node.label, node.x, node.y + 2);
                c.textAlign = 'left';
            });
        }

        function runSepsis() {
            c.clearRect(0, 0, w, h);
            c.beginPath();
            c.strokeStyle = 'rgba(0, 212, 255, 0.6)'; c.lineWidth = 1.5;
            const midY = h/2;
            for(let x=0; x<w; x++){
                const step = (x + frame * 2.5) % w;
                let y = midY;
                const cyc = step % 80;
                if (cyc > 20 && cyc < 25) y = midY - 20;
                else if (cyc >= 25 && cyc < 28) y = midY + 30;
                else if (cyc >= 28 && cyc < 32) y = midY - 10;
                else y = midY + Math.sin(x*0.1)*1;
                if(x===0)c.moveTo(x,y); else c.lineTo(x,y);
            }
            c.stroke();
            c.fillStyle = 'rgba(0, 212, 255, 0.5)'; c.font = 'bold 8px monospace';
            c.fillText('ECG HEARTBEAT', 12, 20);
            c.fillText(`SURVIVAL RATE: ${(89 + Math.sin(frame*0.03)*3).toFixed(1)}%`, 12, 32);
        }

        const simMap = { vpark: runVpark, anemia: runAnemia, lexcloud: runLexcloud, sepsis: runSepsis };
        const runFn = simMap[sim];
        function loop() { frame++; if (runFn) runFn(); requestAnimationFrame(loop); }
        loop();
    });


    /* ═══════════════════════════
       7. SCROLL REVEALS & PROGRESS BAR
    ═══════════════════════════ */
    const progressBar = $('#scrollProgress');
    function handleScroll() {
        const top = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar && total > 0) {
            progressBar.style.width = (top / total * 100) + '%';
        }

        const nav = $('#sysNav');
        if (nav) {
            nav.style.background = top > 80 ? 'rgba(4, 7, 18, 0.95)' : 'rgba(4, 7, 18, 0.85)';
        }

        updateActiveSection();
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                if (e.target.classList.contains('stat-hud-box')) {
                    const fill = e.target.querySelector('.stat-progress-fill');
                    if (fill) fill.style.width = fill.style.getPropertyValue('--w');
                }
                if (e.target.classList.contains('domain-card')) {
                    const fills = e.querySelectorAll('.skill-meter-fill');
                    fills.forEach(f => f.style.width = f.style.getPropertyValue('--w'));
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    $$('.scroll-reveal-node, .domain-card').forEach(el => revealObserver.observe(el));


    /* ═══════════════════════════
       8. STAT NUMERICAL COUNTERS
    ═══════════════════════════ */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            if (el.dataset.counted) return;
            el.dataset.counted = '1';

            const target = +el.dataset.target;
            const divide = +el.dataset.divide || 0;
            const suffix = el.dataset.suffix || '';
            const duration = 1400;
            const start = performance.now();

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                let val = Math.round(ease * target);
                el.textContent = divide ? (val / divide).toFixed(2) + suffix : val + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.5 });

    $$('.stat-num').forEach(el => counterObserver.observe(el));


    /* ═══════════════════════════
       9. HERO ROLE TYPING LOOPER
    ═══════════════════════════ */
    const heroRole = $('#heroRole');
    if (heroRole) {
        const roles = ['intelligent systems', 'ML pipelines', 'cloud-native APIs', 'real-time dashboards', 'computer vision models'];
        let rIdx = 0, cIdx = 0, isDel = false, speed = 80;

        function type() {
            const cur = roles[rIdx];
            if (!isDel) {
                heroRole.textContent = cur.substring(0, cIdx + 1);
                cIdx++;
                if (cIdx === cur.length) { isDel = true; speed = 2000; }
            } else {
                heroRole.textContent = cur.substring(0, cIdx - 1);
                cIdx--; speed = 45;
                if (cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; speed = 200; }
            }
            setTimeout(type, speed);
        }
        setTimeout(type, 1500);
    }


    /* ═══════════════════════════
       10. SMOOTH SCROLL ACTIONS
    ═══════════════════════════ */
    const scrollTop = $('#scrollTopBtn');
    if (scrollTop) scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    $$('a[href^="#"]').forEach(lnk => {
        lnk.addEventListener('click', e => {
            const h = lnk.getAttribute('href');
            if (h && h.startsWith('#')) {
                e.preventDefault();
                const t = $(h);
                if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Instant name summoning execution on load
    triggerNameSummon();

})();
