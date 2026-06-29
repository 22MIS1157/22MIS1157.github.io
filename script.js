/* ═══════════════════════════════════════════════════
   SOLO LEVELING PORTFOLIO — PREMIUM ANIMATION ENGINE
   Instant Loader Mount, Particle Text Summon Portal,
   Custom Canvas Simulation Visualizers
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    /* ═══════════════════════════
       1. CANVAS NAME AWAKENING (Blue Flame Assembly)
    ═══════════════════════════ */
    const nameCanvas = $('#nameCanvas');
    let nameCtx = null;
    let nameParticles = [];
    let nameSummonActive = false;
    let letterTargets = [];

    function triggerNameSummon() {
        if (!nameCanvas) return;
        nameCtx = nameCanvas.getContext('2d');
        
        // Match bounds
        nameCanvas.width = nameCanvas.offsetWidth || 800;
        nameCanvas.height = nameCanvas.offsetHeight || 240;

        const nameWrapper = $('.hero__name-container');
        const spans = $$('.summon-letter');
        
        const wrapRect = nameWrapper.getBoundingClientRect();
        letterTargets = Array.from(spans).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                element: el,
                x: (rect.left + rect.width / 2) - wrapRect.left,
                y: (rect.top + rect.height / 2) - wrapRect.top,
                assembled: false
            };
        });

        // Initialize particles exploding from center portal
        const pCount = 180;
        for (let i = 0; i < pCount; i++) {
            const tIdx = i % letterTargets.length;
            const target = letterTargets[tIdx];
            
            nameParticles.push({
                x: nameCanvas.width / 2 + (Math.random() - 0.5) * 60,
                y: nameCanvas.height / 2 + (Math.random() - 0.5) * 40,
                tx: target.x,
                ty: target.y,
                el: target.element,
                size: Math.random() * 2.5 + 1.2,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 12 - 4,
                color: `hsla(${200 + Math.random() * 40}, 95%, ${65 + Math.random() * 15}%, `,
                life: Math.random() * 55 + 25,
                age: 0,
                locked: false
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
            if (p.age < 18) {
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
                    if (!p.locked) {
                        p.locked = true;
                        p.el.classList.add('assembled');
                    }
                }
            }

            const alpha = Math.max(0, 1 - p.age / 80);
            nameCtx.beginPath();
            nameCtx.arc(p.x, p.y, p.size * (1 + alpha), 0, Math.PI * 2);
            nameCtx.fillStyle = p.color + alpha + ')';
            nameCtx.fill();
        });

        if (!completed) {
            requestAnimationFrame(animateNameSummon);
        } else {
            animateAmbientFlames();
        }
    }

    function animateAmbientFlames() {
        if (!nameCtx) return;
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);

        // Continuous atmospheric blue fire trail
        if (Math.random() < 0.4 && nameParticles.length < 60) {
            const target = letterTargets[Math.floor(Math.random() * letterTargets.length)];
            nameParticles.push({
                x: target.x + (Math.random() - 0.5) * 24,
                y: target.y + 12,
                vy: -Math.random() * 0.8 - 0.4,
                vx: (Math.random() - 0.5) * 0.25,
                size: Math.random() * 2 + 1,
                color: `hsla(${205 + Math.random() * 30}, 90%, 75%, `,
                life: Math.random() * 25 + 15,
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
                nameCtx.fillStyle = p.color + (alpha * 0.4) + ')';
                nameCtx.fill();
                return true;
            }
            return false;
        });

        requestAnimationFrame(animateAmbientFlames);
    }


    /* ═══════════════════════════
       2. GLOBAL LIGHTNING STRIKES & PARTICLES
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

        // Ambient cyber dust
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * globalCanvas.width,
                y: Math.random() * globalCanvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedY: -Math.random() * 0.3 - 0.1,
                speedX: (Math.random() - 0.5) * 0.15,
                opacity: Math.random() * 0.2 + 0.05
            });
        }

        function triggerLightning() {
            const startX = Math.random() * globalCanvas.width;
            const segments = [];
            let currY = 0;
            let currX = startX;
            while (currY < globalCanvas.height) {
                const nextY = currY + Math.random() * 50 + 20;
                const nextX = currX + (Math.random() - 0.5) * 25;
                segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY });
                currY = nextY;
                currX = nextX;
            }
            lightning = { segments, opacity: 0.85 };
        }

        setInterval(() => {
            if (Math.random() < 0.1) triggerLightning();
        }, 3000);

        function drawGlobal() {
            ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
            
            // Draw dust
            particles.forEach(p => {
                p.y += p.speedY; p.x += p.speedX;
                if (p.y < -10) { p.y = globalCanvas.height + 10; p.x = Math.random() * globalCanvas.width; }
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`; ctx.fill();
            });

            // Draw lightning
            if (lightning && lightning.opacity > 0) {
                ctx.strokeStyle = `rgba(0, 212, 255, ${lightning.opacity})`;
                ctx.lineWidth = 2;
                ctx.shadowColor = 'rgba(0, 212, 255, 0.7)';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                lightning.segments.forEach(seg => {
                    ctx.moveTo(seg.x1, seg.y1);
                    ctx.lineTo(seg.x2, seg.y2);
                });
                ctx.stroke();
                ctx.shadowBlur = 0;
                lightning.opacity -= 0.08;
            }

            requestAnimationFrame(drawGlobal);
        }
        drawGlobal();
    }


    /* ═══════════════════════════
       3. HERO CANVAS BACKGROUND
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

        for (let i = 0; i < 30; i++) {
            hParts.push({
                x: Math.random() * heroCanvas.width,
                y: heroCanvas.height + 20,
                size: Math.random() * 1.5 + 0.3,
                vy: -Math.random() * 1.1 - 0.3,
                vx: (Math.random() - 0.5) * 0.25,
                op: Math.random() * 0.35 + 0.1,
                life: Math.random() * 130 + 50,
                age: 0
            });
        }

        function drawHero() {
            hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            hParts.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.age++;
                if (p.age > p.life) {
                    p.x = Math.random() * heroCanvas.width; p.y = heroCanvas.height + 20;
                    p.age = 0; p.op = Math.random() * 0.35 + 0.1;
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
       4. HIGH-FIDELITY PROJECT CUSTOM SIMULATORS
    ═══════════════════════════ */
    $$('.quest__canvas').forEach(canvas => {
        const c = canvas.getContext('2d');
        const anim = canvas.dataset.anim;
        let w = 220, h = 300, frame = 0;

        function resize() {
            w = canvas.width = canvas.offsetWidth || 220;
            h = canvas.height = canvas.offsetHeight || 300;
        }
        resize();
        window.addEventListener('resize', resize);

        // VPark
        function runVpark() {
            c.clearRect(0, 0, w, h);
            c.strokeStyle = 'rgba(0, 212, 255, 0.06)'; c.lineWidth = 1;
            for (let i = 0; i < w; i += 25) {
                c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
            }
            const scanY = (frame * 2.8) % h;
            c.fillStyle = 'rgba(0, 212, 255, 0.08)'; c.fillRect(0, scanY - 18, w, 18);
            c.beginPath(); c.moveTo(0, scanY); c.lineTo(w, scanY);
            c.strokeStyle = 'rgba(0, 212, 255, 0.6)'; c.lineWidth = 2; c.stroke();

            const slots = [70, 150, 230];
            slots.forEach((y, idx) => {
                const detected = scanY > y - 10;
                c.strokeStyle = detected ? '#10b981' : 'rgba(255, 190, 11, 0.35)';
                c.strokeRect(30, y, w - 60, 36);
                c.fillStyle = detected ? 'rgba(16, 185, 129, 0.9)' : 'rgba(255, 190, 11, 0.8)';
                c.font = '8px monospace';
                c.fillText(detected ? `CAR LOCATED [L0${idx+1}]` : `SCANNING SLOT L0${idx+1}...`, 38, y + 14);
                c.fillStyle = 'rgba(0, 212, 255, 0.6)';
                c.fillText(detected ? 'STATUS: ALLOCATED' : 'STATUS: VACANT', 38, y + 26);
            });
        }

        // Anemia
        function runAnemia() {
            c.clearRect(0, 0, w, h);
            const cx = w/2, cy = h/2 - 20, rx = 28, ry = 48;
            c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            c.strokeStyle = 'rgba(0, 212, 255, 0.25)'; c.stroke();
            
            const scanY = cy - ry + ((frame * 1.8) % (ry * 2));
            c.beginPath(); c.moveTo(cx - rx, scanY); c.lineTo(cx + rx, scanY);
            c.strokeStyle = 'rgba(0, 212, 255, 0.7)'; c.lineWidth = 1.5; c.stroke();

            c.strokeStyle = '#10b981'; c.strokeRect(cx - rx - 6, cy - ry - 6, rx*2+12, ry*2+12);
            c.fillStyle = 'rgba(0, 212, 255, 0.6)'; c.font = '8px monospace';
            c.fillText('NAIL BIO-SEGMENTATION', 12, 20);
            
            const classified = scanY > cy + 8;
            c.fillStyle = classified ? '#10b981' : '#ffbe0b';
            c.font = 'bold 9px monospace';
            c.fillText(classified ? 'NORMAL (96% ACC)' : 'DIAGNOSING MASK...', cx - 45, cy + ry + 25);
        }

        // LexCloud
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
                c.strokeStyle = 'rgba(157, 78, 221, 0.25)'; c.stroke();
                const progress = (frame * 0.016 + a * 0.2) % 1;
                const px = nodes[a].x + (nodes[b].x - nodes[a].x) * progress;
                const py = nodes[a].y + (nodes[b].y - nodes[a].y) * progress;
                c.beginPath(); c.arc(px, py, 2.5, 0, Math.PI * 2);
                c.fillStyle = 'rgba(0, 212, 255, 0.85)'; c.fill();
            });
            nodes.forEach(node => {
                c.beginPath(); c.arc(node.x, node.y, 11, 0, Math.PI * 2);
                c.fillStyle = '#0c1122'; c.fill();
                c.strokeStyle = 'rgba(157, 78, 221, 0.7)'; c.stroke();
                c.fillStyle = 'rgba(0, 212, 255, 0.7)'; c.font = 'bold 6px monospace';
                c.textAlign = 'center'; c.fillText(node.label, node.x, node.y + 2);
                c.textAlign = 'left';
            });
        }

        // Sepsis
        function runSepsis() {
            c.clearRect(0, 0, w, h);
            c.beginPath();
            c.strokeStyle = 'rgba(0, 212, 255, 0.55)'; c.lineWidth = 1.5;
            const midY = h/2;
            for(let x=0; x<w; x++){
                const step = (x + frame * 2.3) % w;
                let y = midY;
                const cyc = step % 80;
                if (cyc > 20 && cyc < 25) y = midY - 22;
                else if (cyc >= 25 && cyc < 28) y = midY + 32;
                else if (cyc >= 28 && cyc < 32) y = midY - 12;
                else y = midY + Math.sin(x*0.1)*1;
                if(x===0)c.moveTo(x,y); else c.lineTo(x,y);
            }
            c.stroke();
            c.fillStyle = 'rgba(0, 212, 255, 0.5)'; c.font = 'bold 8px monospace';
            c.fillText('ECG PATIENT VITAL', 12, 20);
            c.fillText(`PREDICTED SURVIVAL: ${(89.4 + Math.sin(frame*0.035)*3.5).toFixed(1)}%`, 12, 32);
        }

        const map = { vpark: runVpark, anemia: runAnemia, lexcloud: runLexcloud, sepsis: runSepsis };
        const run = map[anim];
        function loop() { frame++; if (run) run(); requestAnimationFrame(loop); }
        loop();
    });

    /* ═══════════════════════════
       5. SCROLL PROGRESS
    ═══════════════════════════ */
    const sp = $('#scrollProgress');
    function updateProgress() {
        const top = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (sp && total > 0) sp.style.width = (top / total * 100) + '%';
    }


    /* ═══════════════════════════
       6. SCROLL REVEAL OBSERVER & STAT FILL
    ═══════════════════════════ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                if (e.target.classList.contains('stat')) {
                    const fill = e.target.querySelector('.stat__fill');
                    if (fill) fill.style.width = fill.style.getPropertyValue('--w');
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.scroll-reveal').forEach(el => revealObserver.observe(el));


    /* ═══════════════════════════
       7. STAT NUMERICAL COUNTERS
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

    $$('.stat__number').forEach(el => counterObserver.observe(el));


    /* ═══════════════════════════
       8. HERO TYPING ROLE
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
       9. NAV SCROLL TRANSITIONS & BG PARALLAX
    ═══════════════════════════ */
    const nav = $('#nav');
    function scrollTick() {
        if (nav) nav.style.background = window.scrollY > 80 ? 'rgba(4, 7, 18, 0.95)' : 'rgba(4, 7, 18, 0.85)';
        
        $$('.section__bg-text').forEach(el => {
            const top = el.parentElement.getBoundingClientRect().top;
            el.style.transform = `translate(-50%, calc(-50% + ${top * 0.04}px))`;
        });
    }


    /* ═══════════════════════════
       10. SMOOTH SCROLLS
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


    /* ═══════════════════════════
       11. INITIALIZATION & LISTENERS
    ═══════════════════════════ */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                scrollTick();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Instant name summoning execution on load
    triggerNameSummon();

})();
