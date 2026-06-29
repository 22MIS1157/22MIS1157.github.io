/* ═══════════════════════════════════════════════════
   SOLO LEVELING PORTFOLIO — ADVANCED ANIMATION ENGINE
   System UI, Glitch Boot, Flame Particle Name Summon,
   3D front-coming section reveal, Per-Project simulations
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    /* ═══════════════════════════
       1. SYSTEM GLITCH INTRO
    ═══════════════════════════ */
    const intro = $('#intro');
    const ariseFlash = $('#ariseFlash');
    const introCanvas = $('#introCanvas');
    
    // Lines of terminal boot log
    const lines = [
        { id: '#iLine1', text: '[SYSTEM WARNING]: DOUBLE DUNGEON DETECTED.', class: 'intro__line--error' },
        { id: '#iLine2', text: 'Initializing profile extraction sequence...', class: '' },
        { id: '#iLine3', text: 'Accessing Hunter Registry... Success.', class: 'intro__line--success' },
        { id: '#iLine4', text: 'Preparing Awakening... PLAYER RANK: S', class: 'intro__line--success' }
    ];

    // Trigger typing lines sequentially
    let currentLine = 0;
    function typeIntroLines() {
        if (currentLine < lines.length) {
            const lineData = lines[currentLine];
            const el = $(lineData.id);
            if (el) {
                if (lineData.class) el.classList.add(lineData.class);
                let charIndex = 0;
                const typing = setInterval(() => {
                    el.textContent += lineData.text[charIndex];
                    charIndex++;
                    if (charIndex >= lineData.text.length) {
                        clearInterval(typing);
                        currentLine++;
                        setTimeout(typeIntroLines, 500);
                    }
                }, 30);
            } else {
                currentLine++;
                typeIntroLines();
            }
        } else {
            // Lines completed, trigger "ARISE" title glitch
            setTimeout(() => {
                const ariseText = $('#introArise');
                if (ariseText) {
                    ariseText.classList.add('active');
                    // Play glitch burst on intro canvas
                    triggerGlitchFlash();
                    
                    // Final Gate Open
                    setTimeout(() => {
                        if (ariseFlash) {
                            ariseFlash.classList.add('active');
                            setTimeout(() => ariseFlash.classList.remove('active'), 1000);
                        }
                        if (intro) {
                            intro.classList.add('hidden');
                            setTimeout(() => {
                                intro.style.display = 'none';
                                // Trigger Name Particle Summoning
                                triggerNameSummon();
                            }, 1500);
                        }
                    }, 1800);
                }
            }, 600);
        }
    }

    // Intro glitch background draw
    let introCtx = null;
    if (introCanvas) {
        introCtx = introCanvas.getContext('2d');
        introCanvas.width = window.innerWidth;
        introCanvas.height = window.innerHeight;
    }

    function triggerGlitchFlash() {
        if (!introCtx) return;
        let flashes = 0;
        const interval = setInterval(() => {
            introCtx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.15)' : 'rgba(157, 78, 221, 0.1)';
            introCtx.fillRect(0, 0, introCanvas.width, introCanvas.height);
            // Draw random horizontal static bars
            for (let i = 0; i < 5; i++) {
                introCtx.fillStyle = 'rgba(0, 212, 255, 0.4)';
                introCtx.fillRect(0, Math.random() * introCanvas.height, introCanvas.width, Math.random() * 8);
            }
            flashes++;
            if (flashes > 12) {
                clearInterval(interval);
                introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
            }
        }, 50);
    }

    // Start intro text sequence
    setTimeout(typeIntroLines, 500);


    /* ═══════════════════════════
       2. ARSENAL & PARTICLE NAME SUMMON
       Particles fly out in blue flames and assemble into letters
    ═══════════════════════════ */
    const nameCanvas = $('#nameCanvas');
    let nameCtx = null;
    let nameParticles = [];
    let nameSummonActive = false;

    // Define target positions for characters
    let letterTargets = [];

    function triggerNameSummon() {
        if (!nameCanvas) return;
        nameCtx = nameCanvas.getContext('2d');
        nameCanvas.width = nameCanvas.offsetWidth || 800;
        nameCanvas.height = nameCanvas.offsetHeight || 260;

        const nameWrapper = $('#heroNameWrap');
        const textElements = $$('.sl-letter');
        
        // Grab bounding boxes of letter spans relative to container
        const wrapRect = nameWrapper.getBoundingClientRect();
        letterTargets = Array.from(textElements).map(el => {
            const rect = el.getBoundingClientRect();
            return {
                element: el,
                x: (rect.left + rect.width / 2) - wrapRect.left,
                y: (rect.top + rect.height / 2) - wrapRect.top,
                assembled: false
            };
        });

        // Initialize particles exploding from central rift
        const particleCount = 220;
        for (let i = 0; i < particleCount; i++) {
            // Assign each particle to a target letter
            const targetIndex = i % letterTargets.length;
            const target = letterTargets[targetIndex];
            
            nameParticles.push({
                x: nameCanvas.width / 2 + (Math.random() - 0.5) * 50,
                y: nameCanvas.height / 2 + (Math.random() - 0.5) * 30,
                targetX: target.x,
                targetY: target.y,
                targetElement: target.element,
                size: Math.random() * 3 + 1,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 8 - 4,
                color: `hsla(${200 + Math.random() * 40}, 95%, ${65 + Math.random() * 20}%, `,
                life: Math.random() * 60 + 40,
                age: 0,
                summoned: false
            });
        }

        nameSummonActive = true;
        animateNameSummon();
    }

    function animateNameSummon() {
        if (!nameSummonActive || !nameCtx) return;
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        let allAssembled = true;

        nameParticles.forEach(p => {
            p.age++;
            if (p.age < 25) {
                // Outward burst
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.95;
                p.vy *= 0.95;
                allAssembled = false;
            } else {
                // Magnetize to letter positions
                const dx = p.targetX - p.x;
                const dy = p.targetY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist > 3) {
                    p.x += dx * 0.12;
                    p.y += dy * 0.12;
                    allAssembled = false;
                } else {
                    // Close enough to lock
                    p.x = p.targetX;
                    p.y = p.targetY;
                    if (!p.summoned) {
                        p.summoned = true;
                        // Turn HTML letter span visible
                        p.targetElement.classList.add('assembled');
                    }
                }
            }

            // Draw glowing flame particle
            const alpha = Math.max(0, 1 - p.age / 120);
            nameCtx.beginPath();
            nameCtx.arc(p.x, p.y, p.size * (1 + alpha), 0, Math.PI * 2);
            nameCtx.fillStyle = p.color + alpha + ')';
            nameCtx.fill();

            // Flare effect
            nameCtx.beginPath();
            nameCtx.arc(p.x, p.y, p.size * 3 * alpha, 0, Math.PI * 2);
            nameCtx.fillStyle = p.color + (alpha * 0.15) + ')';
            nameCtx.fill();
        });

        if (!allAssembled) {
            requestAnimationFrame(animateNameSummon);
        } else {
            // Final burst when completely assembled
            triggerNamePortalEnd();
        }
    }

    function triggerNamePortalEnd() {
        // Clean up or keep minimal flame particles floating around text
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        // Start floating ambient flames around the finalized name
        animateAmbientNameFlames();
    }

    function animateAmbientNameFlames() {
        if (!nameCtx) return;
        nameCtx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
        
        // Dynamically add a few vertical rising flames
        if (Math.random() < 0.3 && nameParticles.length < 50) {
            const target = letterTargets[Math.floor(Math.random() * letterTargets.length)];
            nameParticles.push({
                x: target.x + (Math.random() - 0.5) * 20,
                y: target.y + 10,
                targetX: target.x,
                targetY: target.y - 40,
                size: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -Math.random() * 0.8 - 0.4,
                color: `hsla(${200 + Math.random() * 40}, 90%, 70%, `,
                life: Math.random() * 40 + 20,
                age: 0,
                ambient: true
            });
        }

        nameParticles = nameParticles.filter(p => {
            if (p.ambient) {
                p.x += p.vx;
                p.y += p.vy;
                p.age++;
                if (p.age > p.life) return false;
                
                const alpha = 1 - p.age / p.life;
                nameCtx.beginPath();
                nameCtx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                nameCtx.fillStyle = p.color + (alpha * 0.6) + ')';
                nameCtx.fill();
                return true;
            }
            return false;
        });

        requestAnimationFrame(animateAmbientNameFlames);
    }


    /* ═══════════════════════════
       3. GLOBAL SHADOW PORTAL CANVAS
    ═══════════════════════════ */
    const globalCanvas = $('#globalCanvas');
    if (globalCanvas) {
        const ctx = globalCanvas.getContext('2d');
        let particles = [];
        const COUNT = 35;

        function resizeGlobal() {
            globalCanvas.width = window.innerWidth;
            globalCanvas.height = window.innerHeight;
        }
        resizeGlobal();
        window.addEventListener('resize', resizeGlobal);

        class ShadowParticle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * globalCanvas.width;
                this.y = globalCanvas.height + Math.random() * 80;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.25;
                this.speedY = -Math.random() * 0.5 - 0.1;
                this.opacity = Math.random() * 0.25 + 0.05;
                this.fade = Math.random() * 0.0015 + 0.0008;
                this.hue = 200 + Math.random() * 50;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= this.fade;
                if (this.opacity <= 0 || this.y < -10) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.opacity})`;
                ctx.fill();
            }
        }
        for (let i = 0; i < COUNT; i++) particles.push(new ShadowParticle());

        function animGlobal() {
            ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animGlobal);
        }
        animGlobal();
    }


    /* ═══════════════════════════
       4. HERO ATMOSPHERE
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

        class HP {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * heroCanvas.width;
                this.y = heroCanvas.height + 20;
                this.size = Math.random() * 1.5 + 0.3;
                this.vy = -Math.random() * 1.2 - 0.4;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.op = Math.random() * 0.4 + 0.1;
                this.life = Math.random() * 150 + 60;
                this.age = 0;
            }
            update() {
                this.x += this.vx; this.y += this.vy; this.age++;
                if (this.age > this.life) this.op -= 0.015;
                if (this.op <= 0) this.reset();
            }
            draw() {
                hCtx.beginPath();
                hCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                hCtx.fillStyle = `rgba(0, 212, 255, ${this.op})`;
                hCtx.fill();
            }
        }
        for (let i = 0; i < 40; i++) hParts.push(new HP());

        function animHero() {
            hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            hParts.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animHero);
        }
        animHero();
    }


    /* ═══════════════════════════
       5. HIGH-FIDELITY PROJECT CUSTOM SIMULATORS
    ═══════════════════════════ */
    $$('.quest__canvas').forEach(canvas => {
        const c = canvas.getContext('2d');
        const anim = canvas.dataset.anim;
        let w = 220, h = 300, frame = 0;

        function resizeCardCanvas() {
            w = canvas.width = canvas.offsetWidth || 220;
            h = canvas.height = canvas.offsetHeight || 300;
        }
        resizeCardCanvas();
        window.addEventListener('resize', resizeCardCanvas);

        // --- VPARK: Scanner + Vehicle detection + allocations ---
        function runVpark() {
            c.clearRect(0, 0, w, h);
            
            // Grid Background
            c.strokeStyle = 'rgba(0, 212, 255, 0.08)'; c.lineWidth = 1;
            for (let i = 0; i < w; i += 30) {
                c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
            }
            for (let j = 0; j < h; j += 30) {
                c.beginPath(); c.moveTo(0, j); c.lineTo(w, j); c.stroke();
            }

            // Radar Scan sweep
            const scanY = (frame * 2.5) % h;
            c.fillStyle = 'rgba(0, 212, 255, 0.06)';
            c.fillRect(0, scanY - 30, w, 30);
            
            c.beginPath(); c.moveTo(0, scanY); c.lineTo(w, scanY);
            c.strokeStyle = 'rgba(0, 212, 255, 0.5)'; c.lineWidth = 2; c.stroke();

            // Virtual vehicle boxes (Simulating Camera Stream objects)
            const objects = [
                { x: 30, y: 70, type: 'CAR', id: 'M-701' },
                { x: 45, y: 160, type: 'BIKE', id: 'B-240' }
            ];

            objects.forEach((obj, idx) => {
                const pulse = Math.sin(frame * 0.08 + idx) * 0.2 + 0.8;
                // bounding box
                c.strokeStyle = `rgba(52, 211, 153, ${pulse * 0.7})`;
                c.lineWidth = 1.5;
                c.strokeRect(obj.x, obj.y, w - 80, 45);

                // corners decoration
                c.fillStyle = 'rgba(52, 211, 153, 0.9)';
                c.fillRect(obj.x - 2, obj.y - 2, 6, 2);
                c.fillRect(obj.x - 2, obj.y - 2, 2, 6);

                // Info tags
                c.fillStyle = 'rgba(12, 17, 34, 0.85)';
                c.fillRect(obj.x + 4, obj.y + 4, 75, 14);
                
                c.fillStyle = 'rgba(52, 211, 153, 0.9)';
                c.font = '8px monospace';
                c.fillText(`${obj.type} [${obj.id}]`, obj.x + 8, obj.y + 14);

                // Status allocation indicator
                c.fillStyle = 'rgba(0, 212, 255, 0.7)';
                c.font = '7px monospace';
                c.fillText('LOT ALLOCATED', obj.x + 8, obj.y + 32);
            });

            // UI overlay indicators
            c.fillStyle = 'rgba(0, 212, 255, 0.6)'; c.font = 'bold 8px monospace';
            c.fillText('YOLOv8 LIVE INFERENCE', 12, 20);
            c.fillText(`FRAME RATE: 30 FPS`, 12, 32);
        }

        // --- ANEMIA: Nail Bed Segmentation + Classification ---
        function runAnemia() {
            c.clearRect(0, 0, w, h);
            
            // Draw nail bed outline
            const cx = w / 2, cy = h / 2 - 20, rx = 32, ry = 55;
            c.beginPath();
            c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            c.strokeStyle = 'rgba(0, 212, 255, 0.2)'; c.lineWidth = 1.5; c.stroke();
            c.fillStyle = 'rgba(0, 212, 255, 0.03)'; c.fill();

            // Check scanner line
            const scanLineY = cy - ry + ((frame * 1.5) % (ry * 2));
            c.beginPath();
            c.moveTo(cx - rx, scanLineY); c.lineTo(cx + rx, scanLineY);
            c.strokeStyle = 'rgba(0, 212, 255, 0.7)'; c.lineWidth = 1.5; c.stroke();

            // Draw bounding boxes indicating nail area detection
            c.strokeStyle = 'rgba(52, 211, 153, 0.6)'; c.lineWidth = 1;
            c.strokeRect(cx - rx - 8, cy - ry - 8, rx * 2 + 16, ry * 2 + 16);

            // Classification diagnostic details
            c.fillStyle = 'rgba(0, 212, 255, 0.5)'; c.font = '8px monospace';
            c.fillText('SEGMENTATION MASK ACTIVE', 12, 20);
            c.fillText(`N-PATIENT_REF: #${251 - Math.floor(frame * 0.05) % 251}`, 12, 32);

            // Results diagnosis fade-in
            const pulse = Math.sin(frame * 0.04);
            const status = pulse > 0 ? 'HEALTHY (96.0% ACC)' : 'DIAGNOSING...';
            c.fillStyle = pulse > 0 ? '#10b981' : '#ffbe0b';
            c.font = 'bold 9px monospace';
            c.fillText(status, cx - 45, cy + ry + 25);
        }

        // --- LEXCLOUD: AWS Serverless Node Flow ---
        const nodes = [
            { x: w / 2, y: 45, label: 'AWS API GW' },
            { x: 40, y: 120, label: 'LAMBDA' },
            { x: w - 40, y: 120, label: 'S3 STORE' },
            { x: w / 2, y: 195, label: 'DYNAMODB' },
            { x: w / 2, y: 260, label: 'RAG LLM' }
        ];
        function runLexcloud() {
            c.clearRect(0, 0, w, h);

            // Draw links
            const paths = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
            paths.forEach(([a, b]) => {
                c.beginPath();
                c.moveTo(nodes[a].x, nodes[a].y);
                c.lineTo(nodes[b].x, nodes[b].y);
                c.strokeStyle = 'rgba(157, 78, 221, 0.25)'; c.lineWidth = 1; c.stroke();

                // Data routing particle
                const offset = (frame * 0.015 + a * 0.2) % 1;
                const px = nodes[a].x + (nodes[b].x - nodes[a].x) * offset;
                const py = nodes[a].y + (nodes[b].y - nodes[a].y) * offset;
                c.beginPath(); c.arc(px, py, 2.5, 0, Math.PI * 2);
                c.fillStyle = 'rgba(0, 212, 255, 0.8)'; c.fill();
            });

            // Draw Node Circles
            nodes.forEach((node, i) => {
                const pulse = Math.sin(frame * 0.05 + i) * 0.15 + 0.85;
                c.beginPath(); c.arc(node.x, node.y, 14 * pulse, 0, Math.PI * 2);
                c.fillStyle = 'rgba(12, 17, 34, 0.9)'; c.fill();
                c.strokeStyle = 'rgba(157, 78, 221, 0.6)'; c.stroke();

                c.fillStyle = 'rgba(0, 212, 255, 0.7)'; c.font = 'bold 6px monospace';
                c.textAlign = 'center';
                c.fillText(node.label, node.x, node.y + 2);
                c.textAlign = 'left';
            });
        }

        // --- SEPSIS: ECG Beats + Clinical Diagnostics ---
        function runSepsis() {
            c.clearRect(0, 0, w, h);
            c.beginPath();
            c.strokeStyle = 'rgba(0, 212, 255, 0.5)'; c.lineWidth = 1.5;
            
            const midY = h / 2;
            for (let x = 0; x < w; x++) {
                const step = (x + frame * 2.2) % w;
                let y = midY;

                // Simulate QRS complex pulse
                const cycle = step % 90;
                if (cycle > 30 && cycle < 35) y = midY - 25;
                else if (cycle >= 35 && cycle < 38) y = midY + 35;
                else if (cycle >= 38 && cycle < 42) y = midY - 15;
                else if (cycle >= 42 && cycle < 46) y = midY + 5;
                else y = midY + Math.sin(x * 0.12) * 1.2;

                if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
            }
            c.stroke();

            // Heartbeat metrics
            c.fillStyle = 'rgba(0, 212, 255, 0.6)'; c.font = 'bold 8px monospace';
            c.fillText('REAL-TIME ICU ECG', 12, 20);
            c.fillText(`PRED. SURVIVAL: ${(88.5 + Math.sin(frame * 0.02) * 4.2).toFixed(1)}%`, 12, 32);
            c.fillText('XGBOOST CLASSIFIER', 12, 44);
        }

        const mapFn = { vpark: runVpark, anemia: runAnemia, lexcloud: runLexcloud, sepsis: runSepsis };
        const runFn = mapFn[anim];

        function step() {
            frame++;
            if (runFn) runFn();
            requestAnimationFrame(step);
        }
        step();
    });


    /* ═══════════════════════════
       6. SCROLL PROGRESS
    ═══════════════════════════ */
    const sp = $('#scrollProgress');
    function updateProgress() {
        const top = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (sp && total > 0) sp.style.width = (top / total * 100) + '%';
    }


    /* ═══════════════════════════
       7. 3D FRONT-COMING SECTION REVEALS
    ═══════════════════════════ */
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.section-gate').forEach(sec => sectionObserver.observe(sec));


    /* ═══════════════════════════
       8. GENERAL INTERSECTION REVEALS & STAT BAR FILLS
    ═══════════════════════════ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                if (e.target.classList.contains('stat')) {
                    const bar = e.target.querySelector('.stat__fill');
                    if (bar) bar.style.width = bar.style.getPropertyValue('--w');
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    $$('.scroll-reveal').forEach(el => revealObserver.observe(el));


    /* ═══════════════════════════
       9. STAT NUMERICAL COUNTERS
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
            const duration = 1500;
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
       10. HERO TYPING INITIATOR
    ═══════════════════════════ */
    const heroRole = $('#heroRole');
    if (heroRole) {
        const roles = ['intelligent systems', 'ML pipelines', 'cloud-native APIs', 'real-time dashboards', 'computer vision models'];
        let rIdx = 0, cIdx = 0, isDel = false, speed = 80;

        function typeRole() {
            const cur = roles[rIdx];
            if (!isDel) {
                heroRole.textContent = cur.substring(0, cIdx + 1);
                cIdx++;
                if (cIdx === cur.length) { isDel = true; speed = 2000; }
            } else {
                heroRole.textContent = cur.substring(0, cIdx - 1);
                cIdx--; speed = 40;
                if (cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; speed = 200; }
            }
            setTimeout(typeRole, speed);
        }
        setTimeout(typeRole, 6000);
    }


    /* ═══════════════════════════
       11. DYNAMIC SYSTEM GREETINGS
    ═══════════════════════════ */
    const sg = $('#sysGreeting');
    if (sg) {
        const h = new Date().getHours();
        if (h >= 5 && h < 12) sg.textContent = 'GOOD MORNING — DEVELOPER DETECTED';
        else if (h >= 12 && h < 17) sg.textContent = 'GOOD AFTERNOON — DEVELOPER DETECTED';
        else if (h >= 17 && h < 21) sg.textContent = 'GOOD EVENING — DEVELOPER DETECTED';
        else sg.textContent = 'LATE NIGHT CODING SESSION IN PROGRESS';
    }


    /* ═══════════════════════════
       12. PROJECT CARD RADIAL GLOW
    ═══════════════════════════ */
    $$('.quest').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            card.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0, 212, 255, 0.05), transparent), var(--bg-card-hover)`;
        });
        card.addEventListener('mouseleave', () => { card.style.background = ''; });
    });


    /* ═══════════════════════════
       13. HEADER SCROLL EFFECT & BG PARALLAX
    ═══════════════════════════ */
    const nav = $('#nav');
    function scrollTick() {
        if (nav) nav.style.background = window.scrollY > 80 ? 'rgba(4, 7, 18, 0.95)' : 'rgba(4, 7, 18, 0.8)';
        
        $$('.section__bg-text').forEach(el => {
            const top = el.parentElement.getBoundingClientRect().top;
            el.style.transform = `translate(-50%, calc(-50% + ${top * 0.05}px))`;
        });
    }


    /* ═══════════════════════════
       14. SMOOTH LANDINGS
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
       15. UNIFIED EVENTS SCROLLER
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

})();
