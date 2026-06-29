(function() {
    'use strict';

    // Helper Selectors
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    // Globals & Preferences
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let threeParticles = null; // ThreeJS instance reference

    /* ═══════════════════════════
       1. SCROLL PROGRESS & STICKY NAV
       ═══════════════════════════ */
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const scrollPercent = (window.scrollY / docHeight) * 100;
            const progressEl = $('#scrollProgress');
            if (progressEl) progressEl.style.width = scrollPercent + '%';
        }

        const nav = $('#sysNav');
        if (nav) {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    /* ═══════════════════════════
       2. SUKUNA ARRIVAL ENTRANCE SEQUENCE
       ═══════════════════════════ */
    function runSukunaEntrance() {
        const overlay = $('#entranceLoader');
        if (!overlay) return;

        // Skip animation on revisit or reduced motion
        if (sessionStorage.getItem('sukunaArrived') === '1' || prefersReducedMotion) {
            overlay.style.display = 'none';
            triggerAllObservers();
            if (!isMobile) initThreeJsParticles();
            return;
        }

        if (isMobile) {
            // Simplified Mobile Entrance (2 Lines)
            const entLine1 = $('#entNameLine1');
            const entLine2 = $('#entNameLine2');
            if (entLine1 && entLine2) {
                entLine1.innerHTML = `<span class="ent-char ent-char-glow">AFNAAN</span>`;
                entLine2.innerHTML = `<span class="ent-char ent-char-glow">AHMED P</span>`;
            }
            
            const mobileTL = gsap.timeline({
                onComplete: () => {
                    overlay.style.display = 'none';
                    sessionStorage.setItem('sukunaArrived', '1');
                    triggerAllObservers();
                }
            });

            mobileTL.to('#entranceNameWrap', { opacity: 1, duration: 0.6 })
                    .to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, '+=0.8');
            return;
        }

        // --- Desktop Cinematic Entrance Sequence ---
        const pulseCanvas = $('#pulseCanvas');
        const pulseCtx = pulseCanvas.getContext('2d');
        const impactCanvas = $('#impactCanvas');
        const impactCtx = impactCanvas.getContext('2d');

        function resizeOverlayCanvases() {
            pulseCanvas.width = window.innerWidth;
            pulseCanvas.height = window.innerHeight;
            impactCanvas.width = window.innerWidth;
            impactCanvas.height = window.innerHeight;
        }
        resizeOverlayCanvases();
        window.addEventListener('resize', resizeOverlayCanvases);

        // Core variables
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        // Phase 1 Pulse Ring Setup
        let pulseRadius = 0;
        let pulseActive = true;
        function drawPulseRing() {
            if (!pulseActive) return;
            pulseCtx.clearRect(0, 0, pulseCanvas.width, pulseCanvas.height);
            if (pulseRadius > 0) {
                pulseCtx.beginPath();
                pulseCtx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
                pulseCtx.strokeStyle = 'rgba(153, 27, 27, 0.25)'; // --sukuna-crimson
                pulseCtx.lineWidth = 1;
                pulseCtx.stroke();
            }
            requestAnimationFrame(drawPulseRing);
        }
        drawPulseRing();

        // Phase 4 Impact Frame Setup
        let impactLines = [];
        let drawImpact = false;
        function generateImpactLines() {
            impactLines = [];
            const count = 120;
            const maxRadius = Math.max(window.innerWidth, window.innerHeight);
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const thickness = Math.random() * 1.5 + 0.5; // 0.5px to 2px
                impactLines.push({
                    angle: angle,
                    thickness: thickness,
                    maxRadius: maxRadius
                });
            }
        }
        function drawImpactFrame() {
            if (!drawImpact) return;
            impactCtx.clearRect(0, 0, impactCanvas.width, impactCanvas.height);
            impactCtx.strokeStyle = 'rgba(248, 250, 252, 0.1)'; // --infinity-white
            impactLines.forEach(l => {
                impactCtx.beginPath();
                impactCtx.lineWidth = l.thickness;
                impactCtx.moveTo(cx, cy);
                impactCtx.lineTo(cx + Math.cos(l.angle) * l.maxRadius, cy + Math.sin(l.angle) * l.maxRadius);
                impactCtx.stroke();
            });
        }

        // Setup Name Char Nodes for Phase 5 (2 Lines)
        const entLine1 = $('#entNameLine1');
        const entLine2 = $('#entNameLine2');
        if (entLine1 && entLine2) {
            const splitEntName = (el) => {
                const text = el.textContent.trim();
                el.innerHTML = text.split('').map(char => {
                    if (char === ' ') return '&nbsp;';
                    return `<span class="ent-char">${char}<span class="ent-underline"></span></span>`;
                }).join('');
            };
            splitEntName(entLine1);
            splitEntName(entLine2);
        }
        const nameChars = $$('.ent-char');

        // GSAP orchestrated Entrance Sequence
        const entranceTL = gsap.timeline({
            onComplete: () => {
                pulseActive = false;
                overlay.style.display = 'none';
                sessionStorage.setItem('sukunaArrived', '1');
                triggerAllObservers();
                initThreeJsParticles();
            }
        });

        // Phase 1: Crimson expanding pulse
        entranceTL.to({}, {
            duration: 0.3,
            onUpdate: function() {
                pulseRadius = this.progress() * (window.innerWidth * 0.5);
            },
            onComplete: () => { pulseRadius = 0; }
        });

        // Phase 2: Materialize Cursed Mark
        entranceTL.to('#cursedMarkWrap', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '+=0.1');
        // Concentric shockwave rings expansion
        entranceTL.to('#ringCrimson', {
            width: '80vw',
            height: '80vw',
            opacity: 0.3,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
                const el = $('#ringCrimson');
                el.style.left = '50%'; el.style.top = '50%'; el.style.transform = 'translate(-50%, -50%)';
            }
        }, '-=0.4');
        entranceTL.to('#ringPurple', {
            width: '80vw',
            height: '80vw',
            opacity: 0.3,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
                const el = $('#ringPurple');
                el.style.left = '50%'; el.style.top = '50%'; el.style.transform = 'translate(-50%, -50%)';
            }
        }, '-=0.35');
        entranceTL.to('#ringBlue', {
            width: '80vw',
            height: '80vw',
            opacity: 0.3,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
                const el = $('#ringBlue');
                el.style.left = '50%'; el.style.top = '50%'; el.style.transform = 'translate(-50%, -50%)';
            }
        }, '-=0.3');

        // Shockwaves fade out
        entranceTL.to('.shockwave-ring', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.25');

        // Phase 3: Domain Grid rises
        entranceTL.to('#perspectiveGridWrap', { opacity: 1, duration: 0.3 }, '-=0.2');
        entranceTL.to('.domain-grid-plane', {
            rotationX: 0,
            translateY: 0,
            duration: 0.7,
            ease: 'power4.out' // matches cubic-bezier(.16,1,.3,1)
        }, '-=0.3');

        // Phase 4: Impact frame 40ms flash
        entranceTL.add(() => {
            generateImpactLines();
            drawImpact = true;
            drawImpactFrame();
        }, '+=0.2');
        entranceTL.to({}, { duration: 0.04 }); // 40ms flash hold
        entranceTL.add(() => {
            drawImpact = false;
            impactCtx.clearRect(0, 0, impactCanvas.width, impactCanvas.height);
        });
        
        // Hide initial overlay elements during flash
        entranceTL.to(['#cursedMarkWrap', '#perspectiveGridWrap'], { opacity: 0, duration: 0.2 }, '-=0.04');

        // Phase 5: Name burns in character-by-character
        entranceTL.to('#entranceNameWrap', { opacity: 1, duration: 0.1 });
        
        nameChars.forEach((nc, idx) => {
            const letterTL = gsap.timeline();
            letterTL.fromTo(nc, 
                { opacity: 0, scaleY: 2.2, skewX: -10 },
                { opacity: 1, scaleY: 1, skewX: 0, duration: 0.3, ease: 'power2.out' }
            );
            letterTL.add(() => { nc.classList.add('ent-char-glow'); });
            const line = nc.querySelector('.ent-underline');
            if (line) {
                letterTL.to(line, { width: '100%', duration: 0.04, ease: 'none' });
            }
            entranceTL.add(letterTL, `-=${0.24 - idx * 0.06}`);
        });

        // Subtitle word-by-word reveal
        const subWords = ["SOFTWARE", "ENGINEER", "&", "AI", "DEVELOPER"];
        const roleEl = $('#entRoleType');
        subWords.forEach((word, idx) => {
            entranceTL.add(() => {
                const span = document.createElement('span');
                span.style.color = 'var(--text-accent)';
                span.style.opacity = '0';
                span.style.marginRight = '8px';
                span.textContent = word;
                roleEl.appendChild(span);
                
                gsap.timeline()
                    .to(span, { opacity: 1, duration: 0.1 })
                    .to(span, { color: 'var(--text-accent)', duration: 0.3 });
            }, `+=${0.1 * idx}`);
        });

        // Phase 6: Reality tears open via horizontal slice
        entranceTL.to(overlay, {
            clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
            duration: 0.7,
            ease: 'power4.inOut' // matches cubic-bezier(.87,0,.13,1)
        }, '+=1.0');
    }

    /* ═══════════════════════════
       3. THREE.JS GLOBAL CANVAS BACKGROUND
       ═══════════════════════════ */
    function initThreeJsParticles() {
        const container = $('#threeJsContainer');
        if (!container || prefersReducedMotion) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle configuration variables
        const count = 90;
        const positions = new Float32Array(count * 3);
        const properties = []; // Custom metadata for sways and shapes

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5; // z

            properties.push({
                speedY: Math.random() * 0.008 + 0.003,
                swaySeed: Math.random() * 100,
                swaySpeed: Math.random() * 0.01 + 0.004,
                colorIdx: Math.floor(Math.random() * 3)
            });
        }

        // Particle material definitions using our custom JJK colors
        const colors = [
            new THREE.Color('#0EA5E9'), // --blue-technique
            new THREE.Color('#7C3AED'), // --hollow-purple
            new THREE.Color('#FBBF24')  // --malevolent-gold
        ];

        const particleColors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const color = colors[properties[i].colorIdx];
            particleColors[i * 3] = color.r;
            particleColors[i * 3 + 1] = color.g;
            particleColors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        // Draw circles for particles rather than square frames
        const canvasSprite = document.createElement('canvas');
        canvasSprite.width = 16;
        canvasSprite.height = 16;
        const spriteCtx = canvasSprite.getContext('2d');
        const grad = spriteCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        spriteCtx.fillStyle = grad;
        spriteCtx.beginPath();
        spriteCtx.arc(8, 8, 8, 0, Math.PI * 2);
        spriteCtx.fill();
        const texture = new THREE.CanvasTexture(canvasSprite);

        const material = new THREE.PointsMaterial({
            size: 0.16,
            map: texture,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        threeParticles = {
            scene: scene,
            points: points,
            properties: properties,
            positions: positions,
            velocityMultiplier: 1.0
        };

        // Scroll velocity surge loop
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (threeParticles) threeParticles.velocityMultiplier = 2.5;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (threeParticles) threeParticles.velocityMultiplier = 1.0;
            }, 400);
        });

        // Animation Loop
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.05;

            const posArr = points.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                // Upward drift
                posArr[i * 3 + 1] += properties[i].speedY * threeParticles.velocityMultiplier;

                // Sway lateral sway (sine noise representation)
                posArr[i * 3] += Math.sin(time * 0.1 + properties[i].swaySeed) * 0.005;

                // Reset position if drifting out of camera view bounds
                if (posArr[i * 3 + 1] > 8) {
                    posArr[i * 3 + 1] = -8;
                    posArr[i * 3] = (Math.random() - 0.5) * 20;
                }
            }
            points.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        }
        animate();

        // Responsive Resizing
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Trigger Particle surges when entering a new section
    function burstNewParticles() {
        if (!threeParticles) return;
        const count = 15;
        const posArr = threeParticles.points.geometry.attributes.position.array;
        const total = posArr.length / 3;

        // Reset 15 random particles back to camera view top edge to drift
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * total);
            posArr[idx * 3 + 1] = 6.0; // peak top edge
            posArr[idx * 3] = (Math.random() - 0.5) * 16;
        }
        threeParticles.points.geometry.attributes.position.needsUpdate = true;
    }

    /* ═══════════════════════════
       4. BACKGROUND GRID PARALLAX
       ═══════════════════════════ */
    let lastScrollY = window.scrollY;
    function runParallaxLoop() {
        if (isMobile) return;
        const scrolled = window.scrollY;

        // Layer 1: Void Grid Background
        const gridBg = $('#parallaxGridBg');
        if (gridBg) {
            gridBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }

        // Layer 2: Kanji watermarks
        $$('.kanji-watermark').forEach(k => {
            const depth = +k.dataset.depth || 0.4;
            k.style.transform = `translateY(${scrolled * depth}px) ${k.classList.contains('vertical-watermark') ? '' : 'translateX(-50%)'}`;
        });

        // Layer 3: Decorative rotating seals
        $$('.decorative-seal-circle').forEach(s => {
            const depth = +s.dataset.depth || 0.65;
            s.style.transform = `translateY(${scrolled * depth}px)`;
        });

        lastScrollY = scrolled;
        requestAnimationFrame(runParallaxLoop);
    }
    if (!isMobile) requestAnimationFrame(runParallaxLoop);


    /* ═══════════════════════════
       5. HERO COMPONENT INTERACTION
       ═══════════════════════════ */
    function initHeroInteractions() {
        // Render name blocks (2 Lines)
        const heroLine1 = $('#heroNameLine1');
        const heroLine2 = $('#heroNameLine2');
        if (heroLine1 && heroLine2) {
            const splitHeroName = (el) => {
                const text = el.textContent.trim();
                el.innerHTML = text.split('').map(char => {
                    if (char === ' ') return '&nbsp;';
                    return `<span class="hero-letter">${char}</span>`;
                }).join('');
            };
            splitHeroName(heroLine1);
            splitHeroName(heroLine2);
        }
        const heroLetters = $$('.hero-letter');

        if (heroLetters.length > 0) {
            // Hover elastic repelling effect (Gojo Infinity simulation)
            heroLetters.forEach(l => {
                l.addEventListener('mouseenter', () => {
                    gsap.to(l, {
                        x: (Math.random() - 0.5) * 16,
                        y: (Math.random() - 0.5) * 16,
                        duration: 0.1,
                        ease: 'none',
                        onComplete: () => {
                            gsap.to(l, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
                        }
                    });
                });
            });
        }

        // Title Line floats
        const titleLine = $('#heroTitleLine');
        if (titleLine) {
            const text = "SOFTWARE ENGINEER & AI DEVELOPER";
            titleLine.innerHTML = text.split(' ').map(word => {
                return `<span class="hero-word">${word}</span>&nbsp;`;
            }).join('');

            titleLine.addEventListener('mouseenter', () => {
                gsap.fromTo('.hero-word',
                    { y: 0 },
                    { y: -5, stagger: 0.06, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 }
                );
            });
        }
    }
    initHeroInteractions();

    /* ═══════════════════════════
       6. SKILLS DETAIL INSPECTOR
       ═══════════════════════════ */
    function initSkillsInspector() {
        const inspector = $('#techInspector');
        const inspectCat = $('#inspectCat');
        const inspectTitle = $('#inspectTitle');
        const inspectRank = $('#inspectRank');
        const inspectDesc = $('#inspectDesc');

        if (!inspector) return;

        $$('.skill-pill-node').forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();

                const rect = node.getBoundingClientRect();
                const skill = node.dataset.skill;
                const level = node.dataset.level;
                const desc = node.dataset.desc;
                const cat = node.closest('.domain-card').dataset.category;

                // Set content
                inspectCat.textContent = cat.toUpperCase();
                inspectTitle.textContent = skill.toUpperCase();
                inspectDesc.textContent = desc;

                // Mastery translations
                let mastery = "Novice Grade";
                const lvlPct = parseInt(level);
                if (lvlPct >= 95) mastery = "Domain Expansion Level";
                else if (lvlPct >= 90) mastery = "Binding Vow Mastery";
                else if (lvlPct >= 85) mastery = "Intermediate Grade";

                inspectRank.textContent = `${mastery} (${level})`;

                // Calculate overlay coordinate placement
                const containerRect = $('.skills-grid').getBoundingClientRect();
                const top = (rect.bottom - containerRect.top) + window.scrollY + 10;
                const left = Math.max(10, Math.min(window.innerWidth - 340, rect.left - containerRect.left));

                inspector.style.top = top + 'px';
                inspector.style.left = left + 'px';
                inspector.classList.add('active');
            });
        });

        $('#closeInspectorBtn').addEventListener('click', () => {
            inspector.classList.remove('active');
        });

        // Close inspector on global layout clicks
        document.addEventListener('click', (e) => {
            if (!inspector.contains(e.target)) {
                inspector.classList.remove('active');
            }
        });
    }
    initSkillsInspector();

    /* ═══════════════════════════
       7. MISSION TELEMETRY SIMULATIONS (CANVASES)
       ═══════════════════════════ */
    $$('.telemetry-sim-canvas').forEach(canvas => {
        const c = canvas.getContext('2d');
        const sim = canvas.dataset.sim;
        let w = canvas.width = canvas.offsetWidth || 400;
        let h = canvas.height = canvas.offsetHeight || 140;
        let frame = 0;

        window.addEventListener('resize', () => {
            w = canvas.width = canvas.offsetWidth || 400;
            h = canvas.height = canvas.offsetHeight || 140;
        });

        function drawVPark() {
            c.clearRect(0, 0, w, h);
            c.strokeStyle = 'rgba(14, 165, 233, 0.05)';
            c.lineWidth = 1;
            // Draw grid
            for (let i = 0; i < w; i += 20) {
                c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
            }

            // Radar sweep
            const sweepX = (frame * 2) % w;
            c.fillStyle = 'rgba(14, 165, 233, 0.06)';
            c.fillRect(sweepX - 25, 0, 25, h);
            c.beginPath();
            c.moveTo(sweepX, 0); c.lineTo(sweepX, h);
            c.strokeStyle = 'rgba(14, 165, 233, 0.4)';
            c.lineWidth = 1.5;
            c.stroke();

            // Mock bounding box detection
            const active = sweepX > 180;
            c.strokeStyle = active ? '#10B981' : 'rgba(255, 255, 255, 0.15)';
            c.strokeRect(100, 30, 80, 50);
            c.fillStyle = active ? '#10B981' : 'rgba(255, 255, 255, 0.3)';
            c.font = '8px monospace';
            c.fillText(active ? 'CAR DETECTED [98.2%]' : 'SCANNING FOR OBJECTS...', 105, 42);
        }

        function drawAnemia() {
            c.clearRect(0, 0, w, h);
            c.strokeStyle = 'rgba(124, 58, 237, 0.05)';
            c.lineWidth = 1;
            for (let i = 0; i < h; i += 15) {
                c.beginPath(); c.moveTo(0, i); c.lineTo(w, i); c.stroke();
            }

            // Medical scan line
            const scanY = (frame * 1.5) % h;
            c.beginPath();
            c.moveTo(0, scanY); c.lineTo(w, scanY);
            c.strokeStyle = 'rgba(124, 58, 237, 0.6)';
            c.lineWidth = 1.5;
            c.stroke();

            // Heartbeat spikes in back
            c.beginPath();
            c.strokeStyle = 'rgba(124, 58, 237, 0.15)';
            c.moveTo(0, h/2);
            for (let i = 0; i < w; i++) {
                let offset = 0;
                if ((i + frame) % 100 < 10) {
                    offset = Math.sin((i + frame) * 0.5) * 20;
                }
                c.lineTo(i, h/2 + offset);
            }
            c.stroke();

            c.fillStyle = 'rgba(124, 58, 237, 0.5)';
            c.font = '8px monospace';
            c.fillText('GRAD-CAM NAIL BED SEGMENTATION LOOP', 15, 20);
        }

        const nodes = [
            { x: 50, y: 70 },
            { x: 120, y: 40 },
            { x: 120, y: 100 },
            { x: 200, y: 70 },
            { x: 280, y: 70 }
        ];
        function drawLexCloud() {
            c.clearRect(0, 0, w, h);
            // Draw link webs
            c.strokeStyle = 'rgba(13, 148, 136, 0.15)';
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(nodes[0].x, nodes[0].y);
            c.lineTo(nodes[1].x, nodes[1].y);
            c.lineTo(nodes[3].x, nodes[3].y);
            c.moveTo(nodes[0].x, nodes[0].y);
            c.lineTo(nodes[2].x, nodes[2].y);
            c.lineTo(nodes[3].x, nodes[3].y);
            c.lineTo(nodes[4].x, nodes[4].y);
            c.stroke();

            // Draw pulses
            nodes.forEach((n, idx) => {
                c.beginPath();
                c.arc(n.x, n.y, 6 + Math.sin(frame * 0.1 + idx) * 2, 0, Math.PI * 2);
                c.fillStyle = 'rgba(13, 148, 136, 0.3)';
                c.fill();
            });

            c.fillStyle = 'rgba(13, 148, 136, 0.6)';
            c.font = '8px monospace';
            c.fillText('RAG NODE RETRIEVAL PATHWAYS ACTIVE', 15, 20);
        }

        function drawSepsis() {
            c.clearRect(0, 0, w, h);
            c.beginPath();
            c.strokeStyle = 'var(--sukuna-crimson)';
            c.lineWidth = 1.2;

            const mid = h / 2;
            for (let x = 0; x < w; x++) {
                const shift = (x + frame * 3) % w;
                let y = mid;
                const cycle = shift % 80;
                if (cycle > 12 && cycle < 18) y = mid - 25;
                else if (cycle >= 18 && cycle < 24) y = mid + 30;
                else if (cycle >= 24 && cycle < 28) y = mid - 8;

                if (x === 0) c.moveTo(x, y); else c.lineTo(x, y);
            }
            c.stroke();

            c.fillStyle = 'rgba(153, 27, 27, 0.5)';
            c.font = '8px monospace';
            c.fillText('MIMIC-IV PATIENT VIABILITY STREAM', 15, 20);
        }

        const runSim = { vpark: drawVPark, anemia: drawAnemia, lexcloud: drawLexCloud, sepsis: drawSepsis }[sim];
        function loop() {
            frame++;
            if (runSim) runSim();
            requestAnimationFrame(loop);
        }
        loop();
    });

    /* ═══════════════════════════
       8. INTERSECTION OBSERVERS: LAZY SCROLL ANIMATIONS
       ═══════════════════════════ */
    function triggerAllObservers() {
        // 1. General Scroll Reveal Nodes
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    
                    // Fire global particle burst on new section enters
                    burstNewParticles();
                }
            });
        }, { threshold: 0.1 });
        $$('.scroll-reveal-node').forEach(n => revealObserver.observe(n));

        // 2. Headings Kanji wipe animations
        const headingObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const sec = e.target;
                    const watermark = sec.querySelector('.section-kanji-bg');
                    const heading = sec.querySelector('.section-heading');

                    const tl = gsap.timeline();
                    if (watermark) {
                        tl.fromTo(watermark, { opacity: 0, scale: 0.9 }, { opacity: 0.03, scale: 1, duration: 0.4 });
                    }
                    if (heading) {
                        heading.style.clipPath = 'inset(0 100% 0 0)';
                        tl.to(heading, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out' }, '-=0.2');
                    }
                    headingObserver.unobserve(sec);
                }
            });
        }, { threshold: 0.1 });
        $$('.sys-section').forEach(sec => headingObserver.observe(sec));

        // 3. Stats and Telemetry Number Count-ups
        const statObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const el = e.target;
                    if (el.dataset.counted) return;
                    el.dataset.counted = '1';

                    const target = +el.dataset.target;
                    const suffix = el.dataset.suffix || '';
                    const start = { val: 0 };
                    
                    // Accelerate and sudden lock deceleration (JJK tech lock-in)
                    gsap.to(start, {
                        val: target,
                        duration: 1.5,
                        ease: 'power4.out',
                        onUpdate: () => {
                            el.textContent = Math.round(start.val) + suffix;
                        }
                    });
                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        $$('.hud-stat-num, .m-val').forEach(n => statObserver.observe(n));

        // 4. Projects First-Entry Speed Lines trigger
        let speedLinesTriggered = false;
        const projectSec = $('#missions');
        if (projectSec) {
            const speedObserver = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting && !speedLinesTriggered) {
                        speedLinesTriggered = true;
                        triggerMangaSpeedLines();
                        speedObserver.unobserve(projectSec);
                    }
                });
            }, { threshold: 0.1 });
            speedObserver.observe(projectSec);
        }
    }

    /* ═══════════════════════════
       9. 2D ANIME MOTION EFFECTS
       ═══════════════════════════ */
    // Speed lines burst
    function triggerMangaSpeedLines() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '800';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const count = 120;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const maxRadius = Math.max(window.innerWidth, window.innerHeight);

        // All lines draw instantly
        ctx.strokeStyle = 'rgba(248, 250, 252, 0.12)'; // --infinity-white
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            ctx.beginPath();
            ctx.lineWidth = Math.random() * 1.5 + 0.5;
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * maxRadius, cy + Math.sin(angle) * maxRadius);
            ctx.stroke();
        }

        // Fade out lines over 200ms
        gsap.to(canvas, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => canvas.remove()
        });
    }

    // Impact White Flash (CTA buttons)
    function triggerImpactFlash() {
        const flash = $('#domainFlash');
        if (!flash) return;
        gsap.timeline()
            .to(flash, { opacity: 0.12, duration: 0.04 })
            .to(flash, { opacity: 0, duration: 0.04 });
    }

    // Connect button click triggers
    $$('.sys-btn, .mission-link, .timeline-link').forEach(btn => {
        btn.addEventListener('click', triggerImpactFlash);
    });

    // Back to top expansion flash
    const scrollTopBtn = $('#scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            // Flash screen
            triggerImpactFlash();
            
            // Core hexagonal visual flash at center screen
            const burst = document.createElement('div');
            burst.style.position = 'fixed';
            burst.style.left = '50%';
            burst.style.top = '50%';
            burst.style.transform = 'translate(-50%, -50%) scale(0)';
            burst.style.width = '100px';
            burst.style.height = '100px';
            burst.style.border = '2px solid var(--hollow-purple)';
            burst.style.borderRadius = '50%';
            burst.style.zIndex = '9999';
            burst.style.pointerEvents = 'none';
            document.body.appendChild(burst);

            gsap.to(burst, {
                scale: 12,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.out',
                onComplete: () => burst.remove()
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ═══════════════════════════
       10. MOBILE NAVIGATION DRAWER
       ═══════════════════════════ */
    const mobileBtn = $('#mobileMenuBtn');
    const overlayNav = $('#mobileNavOverlay');
    if (mobileBtn && overlayNav) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            overlayNav.classList.toggle('active');
            
            const isOpen = overlayNav.classList.contains('active');
            const lines = mobileBtn.querySelectorAll('.hamburger-line');
            
            if (isOpen) {
                // transform lines to X
                gsap.to(lines[0], { y: 6, rotation: 45, duration: 0.2 });
                gsap.to(lines[1], { opacity: 0, duration: 0.1 });
                gsap.to(lines[2], { y: -6, rotation: -45, duration: 0.2 });

                // stagger animate mobile links in
                gsap.fromTo('.mob-nav-item',
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: 'power2.out' }
                );
            } else {
                // transform back
                gsap.to(lines[0], { y: 0, rotation: 0, duration: 0.2 });
                gsap.to(lines[1], { opacity: 1, duration: 0.1 });
                gsap.to(lines[2], { y: 0, rotation: 0, duration: 0.2 });
            }
        });
    }

    // Close mobile overlay on drawer click link
    $$('.mob-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (overlayNav.classList.contains('active')) {
                mobileBtn.click();
            }
        });
    });

    /* ═══════════════════════════
       11. TIMELINE GRADIENT spine tracker
       ═══════════════════════════ */
    // Ensure nodes stagger-in when scrolling
    const timelineNodesObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const node = e.target.querySelector('.timeline-node');
                const card = e.target.querySelector('.timeline-content-card');

                if (node && card) {
                    gsap.timeline()
                        .fromTo(node, { scale: 0 }, { scale: 1.3, duration: 0.3, ease: 'back.out(1.5)' })
                        .to(node, { scale: 1, duration: 0.1 })
                        .fromTo(card,
                            { opacity: 0, x: e.target.classList.contains('entry--left') ? -50 : 50 },
                            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
                            '-=0.1'
                        );
                }
                timelineNodesObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    $$('.timeline-entry').forEach(entry => timelineNodesObserver.observe(entry));

    // Initialize loader
    runSukunaEntrance();

})();
