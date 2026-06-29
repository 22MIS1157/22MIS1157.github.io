/* ═══════════════════════════════════════════════════
   JJK ANIME PORTFOLIO — ADVANCED ANIMATION ENGINE
   Domain Expansion Arrival Sequence, Innate Skill Core Web,
   Cursed Energy Canvas Embers, Custom Project Simulators
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    /* ═══════════════════════════
       1. DYNAMIC CURSOR CREATION & TRACKING
    ═══════════════════════════ */
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.id = 'customCursor';

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.id = 'customCursorDot';

    const cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    cursorRing.id = 'customCursorRing';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Lagged ring follower
    function updateRing() {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        ringX += dx * 0.15;
        ringY += dy * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(updateRing);
    }
    updateRing();

    // Hover interactive state
    const interactives = 'a, button, .hex-node, .project-card, .timeline-content-card, .guild-card';
    document.body.addEventListener('mouseover', e => {
        if (e.target.closest(interactives)) {
            cursor.classList.add('hovered');
        }
    });
    document.body.addEventListener('mouseout', e => {
        if (e.target.closest(interactives)) {
            cursor.classList.remove('hovered');
        }
    });


    /* ═══════════════════════════
       2. DOMAIN EXPANSION ENTRY LOADER (GSAP + ANIME.JS)
    ═══════════════════════════ */
    function playDomainEntrance() {
        // Skip arrival animation if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const loader = $('#domainLoader');
            if (loader) loader.style.display = 'none';
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                const loader = $('#domainLoader');
                if (loader) {
                    gsap.to(loader, {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                        duration: 1.2,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            loader.style.display = 'none';
                            // Trigger hero numbers countup
                            triggerStatsCountup();
                        }
                    });
                }
            }
        });

        // Setup starting values
        gsap.set('#loaderPulseRing', { scale: 0, opacity: 0 });
        gsap.set('#hollowPurpleOrb', { scale: 0, opacity: 0 });
        gsap.set('#cursedVeins', { opacity: 0 });
        gsap.set('#infinityBarrier', { scale: 0.6, opacity: 0 });
        gsap.set('#loaderKanji', { scale: 0.8, opacity: 0 });
        gsap.set('#loaderSub', { opacity: 0 });

        // Phase 2: Pulse & Hollow Purple Orb
        tl.to('#loaderPulseRing', { scale: 12, opacity: 0.35, duration: 1, ease: 'power2.out' })
          .to('#hollowPurpleOrb', { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, '-=0.4')
          .to('#cursedVeins', { opacity: 0.45, duration: 0.6 })
          .to('.vein-path', { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut', stagger: 0.08 }, '-=0.5');

        // Phase 3: Barrier & Star
        tl.to('#infinityBarrier', { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
          .to('#loaderKanji', { scale: 1, opacity: 0.05, duration: 1.2, ease: 'power2.out' }, '-=0.6');

        // Phase 4: Explosion & Name Stagger
        tl.to('#loaderPulseRing, #hollowPurpleOrb, #cursedVeins, #infinityBarrier', {
            scale: 12,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.in',
            stagger: 0.05
        }, '+=0.4');

        tl.to('#loaderNameContainer', { opacity: 1, duration: 0.2 }, '-=0.3');

        // Stagger characters inside name
        const chars = $$('.l-char');
        if (chars.length > 0) {
            tl.to(chars, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                stagger: 0.06
            }, '-=0.1');
        }

        // Subtitle & Typewriter Role
        tl.to('#loaderSub', { opacity: 0.8, y: 0, duration: 0.4 }, '-=0.2');
        tl.add(() => {
            const roleEl = $('#loaderTypewriter');
            if (roleEl) {
                const text = "SOFTWARE ENGINEER & AI DEVELOPER";
                let i = 0;
                const typing = setInterval(() => {
                    roleEl.textContent += text[i];
                    i++;
                    if (i >= text.length) clearInterval(typing);
                }, 40);
            }
        });

        // Wait a bit to showcase title
        tl.to({}, { duration: 1.4 });
    }

    // Trigger on load
    window.addEventListener('DOMContentLoaded', playDomainEntrance);


    /* ═══════════════════════════
       3. AMBIENT CURSED ENERGY PARTICLES CANVAS
    ═══════════════════════════ */
    const globalCanvas = $('#globalCanvas');
    let particles = [];
    const maxParticles = window.innerWidth < 768 ? 30 : 70;

    if (globalCanvas) {
        const ctx = globalCanvas.getContext('2d');

        const resize = () => {
            globalCanvas.width = window.innerWidth;
            globalCanvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const colors = [
            'rgba(192, 132, 252, ',  // Hollow purple
            'rgba(125, 211, 252, ',  // Gojo blue
            'rgba(165, 243, 252, ',  // Gojo cyan
            'rgba(249, 168, 212, '   // Sukuna pink
        ];

        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * globalCanvas.width,
                y: Math.random() * globalCanvas.height,
                size: Math.random() * 1.6 + 0.5,
                vy: -Math.random() * 0.35 - 0.15,
                vx: (Math.random() - 0.5) * 0.25,
                baseColor: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        // Click Black Flash particle burst
        window.addEventListener('click', e => {
            const clickParticlesCount = 8;
            for (let i = 0; i < clickParticlesCount; i++) {
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 2 + 1,
                    vy: (Math.random() - 0.5) * 8,
                    vx: (Math.random() - 0.5) * 8,
                    baseColor: Math.random() > 0.5 ? 'rgba(192, 132, 252, ' : 'rgba(165, 243, 252, ',
                    opacity: 0.95,
                    life: 25,
                    age: 0,
                    isSpurt: true
                });
            }
        });

        function animateCursedEnergy() {
            ctx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);

            // Update particles
            particles = particles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;

                // Repelled by mouse cursor
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) * 0.015;
                    p.x -= (dx / dist) * force;
                    p.y -= (dy / dist) * force;
                }

                if (p.isSpurt) {
                    p.age++;
                    if (p.age > p.life) return false;
                    p.opacity = 1 - p.age / p.life;
                } else {
                    if (p.y < -10) {
                        p.y = globalCanvas.height + 10;
                        p.x = Math.random() * globalCanvas.width;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.baseColor + p.opacity + ')';
                ctx.fill();
                return true;
            });

            // Draw network connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 90) {
                        const alpha = (1 - dist / 90) * 0.05;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCursedEnergy);
        }
        animateCursedEnergy();
    }


    /* ═══════════════════════════
       4. INNATE SKILLS CONSTELLATION WEB PACKETS
    ═══════════════════════════ */
    const webCanvas = $('#skillsWebCanvas');
    const telemetryName = $('#telemetryName');
    const telemetryDesc = $('#telemetryDesc');
    const telemetryVal = $('#telemetryVal');
    const telemetryFill = $('#telemetryFill');

    // Telemetry Hover Updates
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

    if (webCanvas) {
        const wCtx = webCanvas.getContext('2d');
        let coreNode = null;
        let clusterHeaders = [];
        let energyPackets = [];

        function resizeWeb() {
            webCanvas.width = webCanvas.parentElement.offsetWidth;
            webCanvas.height = webCanvas.parentElement.offsetHeight;
            initWebNodes();
        }

        function initWebNodes() {
            clusterHeaders = [];
            const container = $('.skill-constellation-container');
            if (!container) return;
            const parentRect = container.getBoundingClientRect();

            const coreEl = $('.skill-core-center');
            if (coreEl) {
                const rect = coreEl.getBoundingClientRect();
                coreNode = {
                    x: (rect.left + rect.width / 2) - parentRect.left,
                    y: (rect.top + rect.height / 2) - parentRect.top
                };
            }

            $$('.skill-group-cluster').forEach(cluster => {
                const headerEl = cluster.querySelector('.cluster-title');
                let hNode = null;
                if (headerEl) {
                    const rect = headerEl.getBoundingClientRect();
                    hNode = {
                        x: (rect.left + rect.width / 2) - parentRect.left,
                        y: (rect.top + rect.height / 2) - parentRect.top,
                        skills: []
                    };
                    clusterHeaders.push(hNode);
                }

                cluster.querySelectorAll('.hex-node').forEach(hex => {
                    const rect = hex.getBoundingClientRect();
                    const sNode = {
                        x: (rect.left + rect.width / 2) - parentRect.left,
                        y: (rect.top + rect.height / 2) - parentRect.top
                    };
                    if (hNode) hNode.skills.push(sNode);
                });
            });
        }

        setTimeout(resizeWeb, 250);
        window.addEventListener('resize', resizeWeb);

        // Update signals routing
        function updateWebPackets() {
            if (Math.random() < 0.045 && coreNode && clusterHeaders.length > 0) {
                const targetHeader = clusterHeaders[Math.floor(Math.random() * clusterHeaders.length)];
                energyPackets.push({
                    x: coreNode.x,
                    y: coreNode.y,
                    tx: targetHeader.x,
                    ty: targetHeader.y,
                    speed: 2.2 + Math.random() * 1.8,
                    progress: 0,
                    type: 'core-to-cluster',
                    targetHeader: targetHeader
                });
            }

            energyPackets = energyPackets.filter(p => {
                p.progress += 0.012 * p.speed;
                if (p.progress >= 1) {
                    if (p.type === 'core-to-cluster') {
                        p.targetHeader.skills.forEach(skill => {
                            energyPackets.push({
                                x: p.targetHeader.x,
                                y: p.targetHeader.y,
                                tx: skill.x,
                                ty: skill.y,
                                speed: 1.5 + Math.random() * 1.5,
                                progress: 0,
                                type: 'cluster-to-skill'
                            });
                        });
                    }
                    return false;
                }
                p.cx = p.x + (p.tx - p.x) * p.progress;
                p.cy = p.y + (p.ty - p.y) * p.progress;
                return true;
            });
        }

        function drawWebLines() {
            if (!wCtx) return;
            wCtx.clearRect(0, 0, webCanvas.width, webCanvas.height);

            // Draw core connections
            if (coreNode) {
                clusterHeaders.forEach(ch => {
                    wCtx.beginPath();
                    wCtx.moveTo(coreNode.x, coreNode.y);
                    wCtx.lineTo(ch.x, ch.y);
                    wCtx.strokeStyle = 'rgba(139, 92, 246, 0.16)';
                    wCtx.lineWidth = 1.5;
                    wCtx.stroke();
                });
            }

            // Draw category links
            clusterHeaders.forEach(ch => {
                ch.skills.forEach(sn => {
                    wCtx.beginPath();
                    wCtx.moveTo(ch.x, ch.y);
                    wCtx.lineTo(sn.x, sn.y);
                    wCtx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
                    wCtx.lineWidth = 1;
                    wCtx.stroke();
                });
            });

            // Update packets
            updateWebPackets();
            energyPackets.forEach(p => {
                wCtx.beginPath();
                wCtx.arc(p.cx, p.cy, 3, 0, Math.PI * 2);
                wCtx.fillStyle = '#C084FC';
                wCtx.shadowColor = '#C084FC';
                wCtx.shadowBlur = 8;
                wCtx.fill();
                wCtx.shadowBlur = 0;
            });

            requestAnimationFrame(drawWebLines);
        }
        setTimeout(drawWebLines, 450);
    }


    /* ═══════════════════════════
       5. HIGH-FIDELITY PROJECT CANVASES
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
            c.strokeStyle = 'rgba(125, 211, 252, 0.06)'; c.lineWidth = 1;
            for (let i = 0; i < w; i += 25) {
                c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
            }
            const scanY = (frame * 2.8) % h;
            c.fillStyle = 'rgba(125, 211, 252, 0.06)'; c.fillRect(0, scanY - 20, w, 20);
            c.beginPath(); c.moveTo(0, scanY); c.lineTo(w, scanY);
            c.strokeStyle = 'rgba(125, 211, 252, 0.5)'; c.lineWidth = 2; c.stroke();

            const objY = [60, 140, 220];
            objY.forEach((y, i) => {
                const detected = scanY > y - 20;
                c.strokeStyle = detected ? '#10b981' : 'rgba(252, 211, 77, 0.3)';
                c.strokeRect(30, y, w - 60, 36);
                c.fillStyle = detected ? 'rgba(16, 185, 129, 0.9)' : 'rgba(252, 211, 77, 0.8)';
                c.font = '8px monospace';
                c.fillText(detected ? `CAR DETECTED [L${i+1}]` : `SCANNING L${i+1}...`, 38, y + 15);
                c.fillStyle = 'rgba(125, 211, 252, 0.5)';
                c.fillText(detected ? 'STATE: ALLOCATED' : 'STATE: VACANT', 38, y + 27);
            });
        }

        function runAnemia() {
            c.clearRect(0, 0, w, h);
            const cx = w/2, cy = h/2 - 20, rx = 30, ry = 50;
            c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            c.strokeStyle = 'rgba(192, 132, 252, 0.2)'; c.stroke();
            
            const scanY = cy - ry + ((frame * 2) % (ry * 2));
            c.beginPath(); c.moveTo(cx - rx, scanY); c.lineTo(cx + rx, scanY);
            c.strokeStyle = 'rgba(192, 132, 252, 0.65)'; c.lineWidth = 1.5; c.stroke();

            c.strokeStyle = '#10b981'; c.strokeRect(cx - rx - 6, cy - ry - 6, rx*2+12, ry*2+12);
            c.fillStyle = 'rgba(192, 132, 252, 0.5)'; c.font = '8px monospace';
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
                c.strokeStyle = 'rgba(99, 102, 241, 0.2)'; c.stroke();
                const progress = (frame * 0.015 + a * 0.2) % 1;
                const px = nodes[a].x + (nodes[b].x - nodes[a].x) * progress;
                const py = nodes[a].y + (nodes[b].y - nodes[a].y) * progress;
                c.beginPath(); c.arc(px, py, 2.5, 0, Math.PI * 2);
                c.fillStyle = 'rgba(99, 102, 241, 0.7)'; c.fill();
            });
            nodes.forEach(node => {
                c.beginPath(); c.arc(node.x, node.y, 11, 0, Math.PI * 2);
                c.fillStyle = '#fafaff'; c.fill();
                c.strokeStyle = 'rgba(99, 102, 241, 0.7)'; c.stroke();
                c.fillStyle = 'rgba(99, 102, 241, 0.7)'; c.font = 'bold 6px monospace';
                c.textAlign = 'center'; c.fillText(node.label, node.x, node.y + 2);
                c.textAlign = 'left';
            });
        }

        function runSepsis() {
            c.clearRect(0, 0, w, h);
            c.beginPath();
            c.strokeStyle = 'rgba(249, 168, 212, 0.55)'; c.lineWidth = 1.5;
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
            c.fillStyle = 'rgba(249, 168, 212, 0.5)'; c.font = 'bold 8px monospace';
            c.fillText('ECG HEARTBEAT', 12, 20);
            c.fillText(`SURVIVAL RATE: ${(89 + Math.sin(frame*0.03)*3).toFixed(1)}%`, 12, 32);
        }

        const simMap = { vpark: runVpark, anemia: runAnemia, lexcloud: runLexcloud, sepsis: runSepsis };
        const runFn = simMap[sim];
        function loop() { frame++; if (runFn) runFn(); requestAnimationFrame(loop); }
        loop();
    });


    /* ═══════════════════════════
       6. SCROLL DETECTOR & PROGRESS BAR
    ═══════════════════════════ */
    const progressBar = $('#scrollProgress');
    const nav = $('#sysNav');
    const navLocation = $('#navLocation');

    function handleScroll() {
        const top = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        
        if (progressBar && total > 0) {
            progressBar.style.width = (top / total * 100) + '%';
        }

        if (nav) {
            if (top > 80) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }

        // Active section tracker
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


    /* ═══════════════════════════
       7. STATS NUMERICAL COUNTUP ANIMATION
    ═══════════════════════════ */
    function triggerStatsCountup() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    if (e.target.classList.contains('stat-hud-box')) {
                        const fill = e.target.querySelector('.stat-progress-fill');
                        if (fill) fill.style.width = fill.style.getPropertyValue('--w');
                    }
                }
            });
        }, { threshold: 0.15, rootMargin: '0px' });

        $$('.scroll-reveal-node').forEach(el => revealObserver.observe(el));

        // Easing stats count up
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

        $$('.hud-stat-num, .stat-num').forEach(el => counterObserver.observe(el));
    }


    /* ═══════════════════════════
       8. HERO & UTILITY SCROLL ACTION LINKS
    ═══════════════════════════ */
    const scrollTop = $('#scrollTopBtn');
    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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

})();
