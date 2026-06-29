/* ═══════════════════════════════════════════════════
   JJK ANIME PORTFOLIO — SYSTEM ENGINE (script.js)
   Domain Expansion Loader, Cursed Energy Particle Canvas,
   Skills Constellation Webs, Project Telemetries, and
   Gojo Six Eyes Split Mask Scroll Trigger.
   ═══════════════════════════════════════════════════ */

(function() {
    'use strict';

    // DOM Selectors
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    // Telemetry Configs
    let activeCategory = 'Languages';

    /* ═══════════════════════════
       1. GLOBAL SESSION STATE & MEDIA CHECK
       ═══════════════════════════ */
    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ═══════════════════════════
       2. SCROLL INDICATOR PROGRESS BAR
       ═══════════════════════════ */
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / docHeight) * 100;
        const progressEl = $('#scrollProgress');
        if (progressEl) {
            progressEl.style.width = scrollPercent + '%';
        }

        // Sticky Nav update
        const nav = $('#sysNav');
        if (nav) {
            if (window.scrollY > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    /* ═══════════════════════════
       3. HTML5 CANVAS: CURSED ENERGY BACKGROUND
       ═══════════════════════════ */
    const canvas = $('#globalCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = isMobile ? 25 : 75;
        let mouse = { x: -1000, y: -1000 };

        function resizeBg() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeBg();
        window.addEventListener('resize', resizeBg);

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Initialize particles
        for (let i = 0; i < maxParticles; i++) {
            // Colors matching our JJK palette
            const colors = ['rgba(125, 211, 252, ', 'rgba(192, 132, 252, ', 'rgba(252, 211, 77, '];
            const randColor = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 1.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(Math.random() * 0.3 + 0.1),
                color: randColor,
                alpha: Math.random() * 0.4 + 0.15,
                osc: Math.random() * 100,
                oscSpeed: Math.random() * 0.02 + 0.005
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Hollow Purple Attraction Core coordinates (centered in skills section)
            const skillsSec = $('#skills');
            let attractCore = null;
            if (skillsSec) {
                const sRect = skillsSec.getBoundingClientRect();
                if (sRect.top < window.innerHeight && sRect.bottom > 0) {
                    // Skills section is on screen, attract particles to central hub node
                    const coreNode = $('.skill-core-center');
                    if (coreNode) {
                        const cRect = coreNode.getBoundingClientRect();
                        attractCore = {
                            x: cRect.left + cRect.width / 2,
                            y: cRect.top + cRect.height / 2
                        };
                    }
                }
            }

            particles.forEach(p => {
                p.y += p.vy;
                p.x += p.vx;
                p.osc += p.oscSpeed;

                // Wave oscillation
                p.x += Math.sin(p.osc) * 0.15;

                // Attraction force to skills core (Hollow Purple charge effect)
                if (attractCore) {
                    const dx = attractCore.x - p.x;
                    const dy = attractCore.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > 50) {
                        p.x += (dx / dist) * 0.65;
                        p.y += (dy / dist) * 0.65;
                    }
                }

                // Repel away from mouse cursor
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const mDist = Math.sqrt(dx * dx + dy * dy);
                if (mDist < 120) {
                    const force = (120 - mDist) * 0.015;
                    p.x -= (dx / mDist) * force;
                    p.y -= (dy / mDist) * force;
                }

                // Warp coordinates on bounds exit
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                ctx.beginPath();
                const rad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                rad.addColorStop(0, p.color + p.alpha + ')');
                rad.addColorStop(1, p.color + '0)');
                ctx.fillStyle = rad;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }


    /* ═══════════════════════════
       4. HTML5 CANVAS: DOMAIN EXPANSION ENTRY SEQUENCE
       ═══════════════════════════ */
    function runDomainLoader() {
        const loader = $('#domainLoader');
        const lCanvas = $('#loaderCanvas');
        if (!loader || !lCanvas) return;

        // Skip animation on revisit
        if (sessionStorage.getItem('jjkArrived') === '1' || isReducedMotion) {
            loader.style.display = 'none';
            triggerAllCountUps();
            return;
        }

        const lCtx = lCanvas.getContext('2d');
        let frame = 0;
        let pulseRadius = 5;
        let lines = [];
        let running = true;

        function resizeLoader() {
            lCanvas.width = window.innerWidth;
            lCanvas.height = window.innerHeight;
        }
        resizeLoader();
        window.addEventListener('resize', resizeLoader);

        // Core central coordinates
        const cx = () => lCanvas.width / 2;
        const cy = () => lCanvas.height / 2;

        // Initialize expanding energy threads
        for (let i = 0; i < 90; i++) {
            const angle = Math.random() * Math.PI * 2;
            const targetDist = Math.max(lCanvas.width, lCanvas.height) * 0.75;
            lines.push({
                angle: angle,
                tx: cx() + Math.cos(angle) * targetDist,
                ty: cy() + Math.sin(angle) * targetDist,
                progress: 0,
                speed: 0.008 + Math.random() * 0.015,
                delay: Math.random() * 60,
                color: Math.random() > 0.4 ? 'rgba(125, 211, 252, ' : 'rgba(192, 132, 252, '
            });
        }

        function drawLoaderLoop() {
            if (!running) return;
            lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
            frame++;

            // Draw central cursed point (Phase 1)
            if (frame < 120) {
                pulseRadius = 4 + Math.sin(frame * 0.1) * 2;
                lCtx.beginPath();
                const rad = lCtx.createRadialGradient(cx(), cy(), 0, cx(), cy(), pulseRadius * 2);
                rad.addColorStop(0, '#ffffff');
                rad.addColorStop(0.3, 'rgba(125, 211, 252, 0.8)');
                rad.addColorStop(1, 'rgba(192, 132, 252, 0)');
                lCtx.fillStyle = rad;
                lCtx.arc(cx(), cy(), pulseRadius * 2, 0, Math.PI * 2);
                lCtx.fill();
            }

            // Draw expanding lines (Phase 2)
            if (frame > 40 && frame < 200) {
                lines.forEach(l => {
                    if (frame - 40 < l.delay) return;
                    if (l.progress < 1) l.progress += l.speed;

                    const curX = cx() + (l.tx - cx()) * l.progress;
                    const curY = cy() + (l.ty - cy()) * l.progress;

                    lCtx.beginPath();
                    lCtx.moveTo(cx(), cy());
                    lCtx.lineTo(curX, curY);
                    lCtx.strokeStyle = l.color + (1 - l.progress) * 0.6 + ')';
                    lCtx.lineWidth = 0.8;
                    lCtx.stroke();
                });
            }

            requestAnimationFrame(drawLoaderLoop);
        }
        drawLoaderLoop();

        // GSAP orchestrated Timeline
        const loaderTL = gsap.timeline({
            onComplete: () => {
                running = false;
                loader.style.display = 'none';
                sessionStorage.setItem('jjkArrived', '1');
                triggerAllCountUps();
            }
        });

        // Step 1: Draw lines & pulse center
        loaderTL.to({}, { duration: 1.2 }) // Initial pause
                .to('#loaderSeal', { opacity: 0.8, scale: 1, duration: 0.8, ease: 'back.out(1.5)' })
                .to('#loaderSeal', { rotation: 360, duration: 1.5, ease: 'power2.inOut' }, '-=0.4')
                // Step 2: Kanji "Ryōiki Tenkai" materials
                .to('#loaderKanji', { opacity: 0.05, scale: 1.05, duration: 0.6, ease: 'power3.out' }, '-=0.8')
                // Step 3: Void Blast Flash
                .to('#loaderFlash', { opacity: 0.8, duration: 0.15 })
                .to('#loaderFlash', { opacity: 0, duration: 0.4 })
                .add(() => {
                    if ($('#loaderSeal')) $('#loaderSeal').style.display = 'none';
                    if ($('#loaderKanji')) $('#loaderKanji').style.display = 'none';
                }, '-=0.4')
                // Step 4: Name reveals
                .to('#loaderNameWrap', { opacity: 1, duration: 0.3 }, '-=0.2')
                .from('.l-word', {
                    opacity: 0,
                    scaleY: 3,
                    skewX: -20,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'jjkSnap'
                }, '-=0.1')
                .to('#loaderSub', { opacity: 1, y: 0, duration: 0.4 }, '+=0.1')
                .to('#loaderType', {
                    text: "GRADE 1 SORCERER OF ENGINEERING",
                    duration: 1.2,
                    ease: "none"
                })
                .to({}, { duration: 1.0 }) // Hold name
                // Step 5: Screen Wipes dissolution
                .to(loader, {
                    clipPath: 'circle(0% at 50% 50%)',
                    duration: 0.85,
                    ease: 'power4.inOut'
                });
    }
    runDomainLoader();


    /* ═══════════════════════════
       5. INTERSECTION OBSERVER: GOJO EYEMASK SPLIT (ABOUT)
       ═══════════════════════════ */
    function initGojoEyesSplit() {
        const cover = $('#eyemaskCover');
        const triggerSec = $('#about');
        if (!cover || !triggerSec) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start eyes flash
                    const eyesLine = $('.eyemask-eyes-line');
                    if (eyesLine) {
                        eyesLine.style.opacity = '1';
                        
                        setTimeout(() => {
                            // Split open cover halves
                            const halves = $$('.eyemask-half');
                            if (halves[0]) halves[0].style.transform = 'translateY(-100%)';
                            if (halves[1]) halves[1].style.transform = 'translateY(100%)';
                            eyesLine.style.opacity = '0';

                            // Clean up DOM node to optimize layers
                            setTimeout(() => {
                                cover.style.display = 'none';
                                cover.remove();
                            }, 850);
                        }, 500);
                    }
                    observer.unobserve(triggerSec);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(triggerSec);
    }
    initGojoEyesSplit();


    /* ═══════════════════════════
       6. SKILLS CONSTELLATION WEB PACKET sparks
       ═══════════════════════════ */
    const sCanvas = $('#skillsWebCanvas');
    if (sCanvas) {
        const sCtx = sCanvas.getContext('2d');
        let packets = [];

        function resizeSkillsCanvas() {
            const container = $('.skill-constellation-container');
            if (container) {
                sCanvas.width = container.offsetWidth;
                sCanvas.height = container.offsetHeight;
            }
        }
        resizeSkillsCanvas();
        window.addEventListener('resize', resizeSkillsCanvas);

        // Populate packets along paths
        setInterval(() => {
            const coreNode = $('.skill-core-center');
            const nodes = $$('.hex-node');
            if (!coreNode || nodes.length === 0) return;

            const cRect = coreNode.getBoundingClientRect();
            const containerRect = $('.skill-constellation-container').getBoundingClientRect();
            const cx = (cRect.left + cRect.width / 2) - containerRect.left;
            const cy = (cRect.top + cRect.height / 2) - containerRect.top;

            // Pick a random destination node
            const destNode = nodes[Math.floor(Math.random() * nodes.length)];
            const dRect = destNode.getBoundingClientRect();
            const dx = (dRect.left + dRect.width / 2) - containerRect.left;
            const dy = (dRect.top + dRect.height / 2) - containerRect.top;

            packets.push({
                x: cx,
                y: cy,
                tx: dx,
                ty: dy,
                progress: 0,
                speed: 0.015 + Math.random() * 0.015,
                color: destNode.classList.contains('hex-node--cyan') ? '#A5F3FC' :
                       destNode.classList.contains('hex-node--purple') ? '#C084FC' :
                       destNode.classList.contains('hex-node--gold') ? '#FCD34D' : '#7DD3FC'
            });
        }, 300);

        function drawSkillsConstellation() {
            sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);

            const coreNode = $('.skill-core-center');
            const nodes = $$('.hex-node');
            if (coreNode && nodes.length > 0) {
                const cRect = coreNode.getBoundingClientRect();
                const containerRect = $('.skill-constellation-container').getBoundingClientRect();
                const cx = (cRect.left + cRect.width / 2) - containerRect.left;
                const cy = (cRect.top + cRect.height / 2) - containerRect.top;

                // Draw connector lines
                sCtx.beginPath();
                sCtx.strokeStyle = 'rgba(139, 92, 246, 0.06)';
                sCtx.lineWidth = 1;
                nodes.forEach(node => {
                    const dRect = node.getBoundingClientRect();
                    const dx = (dRect.left + dRect.width / 2) - containerRect.left;
                    const dy = (dRect.top + dRect.height / 2) - containerRect.top;
                    sCtx.moveTo(cx, cy);
                    sCtx.lineTo(dx, dy);
                });
                sCtx.stroke();
            }

            // Draw spark packets
            packets = packets.filter(p => {
                p.progress += p.speed;
                if (p.progress >= 1) return false;

                const curX = p.x + (p.tx - p.x) * p.progress;
                const curY = p.y + (p.ty - p.y) * p.progress;

                sCtx.beginPath();
                sCtx.arc(curX, curY, 2, 0, Math.PI * 2);
                sCtx.fillStyle = p.color;
                sCtx.shadowBlur = 6;
                sCtx.shadowColor = p.color;
                sCtx.fill();
                sCtx.shadowBlur = 0; // reset

                return true;
            });

            requestAnimationFrame(drawSkillsConstellation);
        }
        drawSkillsConstellation();
    }


    /* ═══════════════════════════
       7. SKILLS INSPECTOR HUD INTERACTION
       ═══════════════════════════ */
    const telemetryFill = $('#telemetryFill');
    const telemetryName = $('#telemetryName');
    const telemetryDesc = $('#telemetryDesc');
    const telemetryVal = $('#telemetryVal');

    $$('.hex-node').forEach(node => {
        node.addEventListener('mouseenter', () => {
            const skill = node.dataset.skill;
            const level = node.dataset.level;
            const desc = node.dataset.desc;

            if (telemetryName) telemetryName.textContent = skill.toUpperCase();
            if (telemetryDesc) telemetryDesc.textContent = desc;
            if (telemetryVal) telemetryVal.textContent = level;
            if (telemetryFill) telemetryFill.style.width = level;
        });
    });


    /* ═══════════════════════════
     * 8. PROJECT CANVASES DIAGNOSTIC LOOP
       ═══════════════════════════ */
    $$('.project-card-canvas').forEach(canvas => {
        const c = canvas.getContext('2d');
        const sim = canvas.dataset.sim;
        let w = 220, h = 300, frame = 0;

        function resizeCanvas() {
            w = canvas.width = canvas.offsetWidth || 220;
            h = canvas.height = canvas.offsetHeight || 300;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function drawVpark() {
            c.clearRect(0, 0, w, h);
            // Grid lines
            c.strokeStyle = 'rgba(125, 211, 252, 0.05)';
            c.lineWidth = 1;
            for (let i = 0; i < w; i += 20) {
                c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
            }

            // Radar sweeping line
            const sweepY = (frame * 2.5) % h;
            c.fillStyle = 'rgba(125, 211, 252, 0.08)';
            c.fillRect(0, sweepY - 20, w, 20);
            c.beginPath();
            c.moveTo(0, sweepY); c.lineTo(w, sweepY);
            c.strokeStyle = 'rgba(125, 211, 252, 0.6)';
            c.lineWidth = 1.5;
            c.stroke();

            // Detected vehicle bounding boxes
            const objects = [
                { y: 60, detected: sweepY > 60 },
                { y: 150, detected: sweepY > 150 },
                { y: 220, detected: sweepY > 220 }
            ];

            objects.forEach((obj, idx) => {
                c.strokeStyle = obj.detected ? '#10b981' : 'rgba(139, 92, 246, 0.2)';
                c.strokeRect(30, obj.y, w - 60, 36);
                c.fillStyle = obj.detected ? 'rgba(16, 185, 129, 0.7)' : 'rgba(139, 92, 246, 0.5)';
                c.font = '8px monospace';
                c.fillText(obj.detected ? `BOUNDING_BOX [V${idx+1}]` : `SCANNING AREA L${idx+1}...`, 35, obj.y + 14);
                c.fillStyle = 'rgba(91, 33, 182, 0.6)';
                c.fillText(obj.detected ? 'CONFIDENCE: 98.4%' : 'STATUS: CHECKING', 35, obj.y + 26);
            });
        }

        function drawAnemia() {
            c.clearRect(0, 0, w, h);
            // Draw schematic nail outline
            const cx = w/2, cy = h/2, rx = 24, ry = 40;
            c.beginPath();
            c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            c.strokeStyle = 'rgba(192, 132, 252, 0.2)';
            c.stroke();

            // Telemetry scanner line
            const scanY = cy - ry + ((frame * 1.5) % (ry * 2));
            c.beginPath();
            c.moveTo(cx - rx, scanY);
            c.lineTo(cx + rx, scanY);
            c.strokeStyle = 'rgba(192, 132, 252, 0.8)';
            c.lineWidth = 1.5;
            c.stroke();

            // Grad-CAM color heatmap simulation inside fingernail
            const completed = scanY > cy + 10;
            c.beginPath();
            c.ellipse(cx, cy, rx - 3, ry - 3, 0, 0, Math.PI * 2);
            const grad = c.createRadialGradient(cx, cy + 15, 0, cx, cy + 15, rx);
            grad.addColorStop(0, completed ? 'rgba(249, 168, 212, 0.5)' : 'rgba(125, 211, 252, 0.3)');
            grad.addColorStop(1, 'transparent');
            c.fillStyle = grad;
            c.fill();

            c.fillStyle = 'rgba(91, 33, 182, 0.6)';
            c.font = '8px monospace';
            c.fillText('EXPLAINABLE AI CLASSIFIER', 10, 16);
            c.fillText(completed ? 'AUC: 0.98' : 'DIAGNOSING...', 10, 26);
        }

        const nodes = [
            { x: w/2, y: 40, name: 'AWS' },
            { x: 30, y: 120, name: 'LAMBDA' },
            { x: w - 30, y: 120, name: 'S3' },
            { x: w/2, y: 200, name: 'DB' },
            { x: w/2, y: 260, name: 'RAG' }
        ];
        function drawLexcloud() {
            c.clearRect(0, 0, w, h);
            const links = [[0,1], [0,2], [1,3], [2,3], [3,4]];
            links.forEach(([a,b]) => {
                c.beginPath();
                c.moveTo(nodes[a].x, nodes[a].y);
                c.lineTo(nodes[b].x, nodes[b].y);
                c.strokeStyle = 'rgba(99, 102, 241, 0.1)';
                c.stroke();

                // Spark traveling
                const pct = (frame * 0.01 + a * 0.25) % 1;
                const px = nodes[a].x + (nodes[b].x - nodes[a].x) * pct;
                const py = nodes[a].y + (nodes[b].y - nodes[a].y) * pct;
                c.beginPath();
                c.arc(px, py, 2.5, 0, Math.PI * 2);
                c.fillStyle = '#6366F1';
                c.fill();
            });
            nodes.forEach(n => {
                c.beginPath();
                c.arc(n.x, n.y, 10, 0, Math.PI * 2);
                c.fillStyle = '#EDE9FE';
                c.fill();
                c.strokeStyle = 'rgba(99, 102, 241, 0.4)';
                c.stroke();
                c.fillStyle = 'rgba(91, 33, 182, 0.8)';
                c.font = 'bold 5.5px monospace';
                c.textAlign = 'center';
                c.fillText(n.name, n.x, n.y + 2);
                c.textAlign = 'left';
            });
        }

        function drawSepsis() {
            c.clearRect(0, 0, w, h);
            c.beginPath();
            c.strokeStyle = 'rgba(249, 168, 212, 0.6)';
            c.lineWidth = 1.5;
            
            const midY = h / 2;
            for (let x = 0; x < w; x++) {
                const shift = (x + frame * 2.5) % w;
                let y = midY;
                const cycleX = shift % 60;
                if (cycleX > 10 && cycleX < 14) y = midY - 15;
                else if (cycleX >= 14 && cycleX < 17) y = midY + 22;
                else if (cycleX >= 17 && cycleX < 20) y = midY - 6;
                else y = midY + Math.sin(x * 0.08) * 0.5;

                if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
            }
            c.stroke();

            c.fillStyle = 'rgba(91, 33, 182, 0.6)';
            c.font = '8px monospace';
            c.fillText('ICU SEPSIS MONITOR', 10, 16);
            c.fillText(`STABILITY: ${(92.5 + Math.sin(frame * 0.03) * 1.5).toFixed(1)}%`, 10, 26);
        }

        const simMap = { vpark: drawVpark, anemia: drawAnemia, lexcloud: drawLexcloud, sepsis: drawSepsis };
        const runSim = simMap[sim];

        function step() {
            frame++;
            if (runSim) runSim();
            requestAnimationFrame(step);
        }
        step();
    });


    /* ═══════════════════════════
       9. STATS & TELEMETRY NUMERICAL COUNT UPS
       ═══════════════════════════ */
    function triggerAllCountUps() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const el = e.target;
                    if (el.dataset.counted) return;
                    el.dataset.counted = '1';

                    const targetVal = +el.dataset.target;
                    const suffix = el.dataset.suffix || '';
                    const duration = 1200;
                    const startTime = performance.now();

                    function updateCount(now) {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                        el.textContent = Math.round(ease * targetVal) + suffix;
                        if (progress < 1) requestAnimationFrame(updateCount);
                    }
                    requestAnimationFrame(updateCount);
                }
            });
        }, { threshold: 0.5 });

        $$('.hud-stat-num, .metric-val').forEach(n => observer.observe(n));
    }


    /* ═══════════════════════════
       10. GLOBAL INTRINSIC SCROLL REVEALS
       ═══════════════════════════ */
    function initScrollReveals() {
        const nodes = $$('.scroll-reveal-node');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    
                    // Trigger Location indicator header tag
                    const sectionName = e.target.dataset.sectionName;
                    const loc = $('#navLocation');
                    if (loc && sectionName) {
                        loc.textContent = `LOCATION: ${sectionName}`;
                    }
                }
            });
        }, { threshold: 0.15 });

        nodes.forEach(n => observer.observe(n));
    }
    initScrollReveals();


    /* ═══════════════════════════
       11. MOBILE HAMBURGER NAVIGATION DRAWER
       ═══════════════════════════ */
    const menuBtn = $('#mobileMenuBtn');
    const navLinks = $('#navLinks');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'fixed';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(245, 243, 255, 0.96)';
                navLinks.style.padding = '30px';
                navLinks.style.gap = '16px';
                navLinks.style.alignItems = 'center';
                navLinks.style.borderBottom = '1px solid var(--border-dim)';
                
                // Animate drawer links in
                gsap.from(navLinks.children, {
                    opacity: 0,
                    y: -15,
                    stagger: 0.08,
                    duration: 0.4
                });
            } else {
                navLinks.style.display = '';
            }
        });
    }

    // Close mobile drawer on clicking links
    $$('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuBtn.click();
            }
        });
    });


    /* ═══════════════════════════
       12. BACK-TO-TOP BUTTON
       ═══════════════════════════ */
    const scrollTopBtn = $('#scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
