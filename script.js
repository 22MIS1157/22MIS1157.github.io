/* ═══════════════════════════════════════════════════
   SOLO LEVELING PORTFOLIO — ENHANCED JAVASCRIPT
   Shadow Particles · Arise Effect · Dungeon Scroll
   Level Up · Per-Project Animations
   ═══════════════════════════════════════════════════ */
(function () {
    'use strict';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    /* ═══════════════════════════
       1. SYSTEM BOOT LOADER
    ═══════════════════════════ */
    const loader = $('#loader');
    const loaderMsg = $('#loaderMsg');
    const ariseFlash = $('#ariseFlash');

    const bootMessages = [
        'SYSTEM INITIALIZING...',
        'SCANNING DATABASE...',
        'PROFILE DETECTED...',
        'LOADING DATA...',
        'ARISE.'
    ];

    let msgIndex = 0;
    const bootInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < bootMessages.length && loaderMsg) {
            loaderMsg.textContent = bootMessages[msgIndex];
            // On "ARISE" — make it flash blue
            if (msgIndex === bootMessages.length - 1) {
                loaderMsg.style.color = '#6fb3ff';
                loaderMsg.style.fontSize = '1.2rem';
                loaderMsg.style.textShadow = '0 0 20px rgba(79,156,247,0.8)';
            }
        }
        if (msgIndex >= bootMessages.length - 1) clearInterval(bootInterval);
    }, 700);

    window.addEventListener('load', () => {
        setTimeout(() => {
            // Trigger arise flash
            if (ariseFlash) {
                ariseFlash.classList.add('active');
                setTimeout(() => ariseFlash.classList.remove('active'), 1000);
            }
            if (loader) loader.classList.add('hidden');
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 1500);
        }, 4000);
    });

    /* ═══════════════════════════
       2. SHADOW PARTICLE SYSTEM — Blue energy floating upward
    ═══════════════════════════ */
    const shadowCanvas = $('#shadowCanvas');
    if (shadowCanvas) {
        const ctx = shadowCanvas.getContext('2d');
        let particles = [];
        const COUNT = 45;

        function resizeCanvas() {
            shadowCanvas.width = window.innerWidth;
            shadowCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class ShadowParticle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * shadowCanvas.width;
                this.y = shadowCanvas.height + Math.random() * 100;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -Math.random() * 0.6 - 0.15;
                this.opacity = Math.random() * 0.35 + 0.1;
                this.fadeSpeed = Math.random() * 0.002 + 0.001;
                this.hue = 200 + Math.random() * 60;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0 || this.y < -10) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue},80%,65%,${this.opacity})`;
                ctx.fill();
                // Glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue},80%,65%,${this.opacity * 0.12})`;
                ctx.fill();
            }
        }
        for (let i = 0; i < COUNT; i++) particles.push(new ShadowParticle());

        function animShadow() {
            ctx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animShadow);
        }
        animShadow();
    }

    /* ═══════════════════════════
       3. HERO PARTICLES — Concentrated rising energy
    ═══════════════════════════ */
    const heroCanvas = $('#heroParticles');
    if (heroCanvas) {
        const hCtx = heroCanvas.getContext('2d');
        let hParts = [];

        function resizeHero() {
            const p = heroCanvas.parentElement;
            heroCanvas.width = p.offsetWidth;
            heroCanvas.height = p.offsetHeight;
        }
        resizeHero();
        window.addEventListener('resize', resizeHero);

        class HeroParticle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * heroCanvas.width;
                this.y = heroCanvas.height + Math.random() * 50;
                this.size = Math.random() * 1.8 + 0.3;
                this.speedY = -Math.random() * 1.2 - 0.3;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.life = Math.random() * 200 + 100;
                this.age = 0;
                this.hue = 210 + Math.random() * 30;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.age++;
                if (this.age > this.life) this.opacity -= 0.015;
                if (this.opacity <= 0) this.reset();
            }
            draw() {
                hCtx.beginPath();
                hCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                hCtx.fillStyle = `hsla(${this.hue},90%,70%,${this.opacity})`;
                hCtx.fill();
            }
        }
        for (let i = 0; i < 50; i++) hParts.push(new HeroParticle());

        function animHero() {
            hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            hParts.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animHero);
        }
        animHero();
    }

    /* ═══════════════════════════
       4. PER-PROJECT CANVAS ANIMATIONS
    ═══════════════════════════ */
    $$('.quest__canvas').forEach(canvas => {
        const c = canvas.getContext('2d');
        const anim = canvas.dataset.anim;

        function resize() {
            canvas.width = canvas.offsetWidth || 180;
            canvas.height = canvas.offsetHeight || 300;
        }
        resize();
        window.addEventListener('resize', resize);

        const projParticles = [];
        const colors = {
            vpark: { h: 210, s: 90, l: 60 },    // Blue — IoT/Real-time
            anemia: { h: 140, s: 70, l: 55 },    // Green — Healthcare
            lexcloud: { h: 270, s: 70, l: 60 },   // Purple — Cloud
            sepsis: { h: 190, s: 80, l: 55 }      // Teal — Clinical
        };
        const col = colors[anim] || colors.vpark;

        for (let i = 0; i < 20; i++) {
            projParticles.push({
                x: Math.random() * 180,
                y: Math.random() * 300,
                size: Math.random() * 2 + 0.5,
                speedY: -Math.random() * 0.8 - 0.2,
                speedX: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        function animProj() {
            c.clearRect(0, 0, canvas.width, canvas.height);
            projParticles.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.opacity -= 0.002;
                if (p.opacity <= 0 || p.y < -5) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                    p.opacity = Math.random() * 0.5 + 0.1;
                }
                c.beginPath();
                c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                c.fillStyle = `hsla(${col.h},${col.s}%,${col.l}%,${p.opacity})`;
                c.fill();
                // Glow
                c.beginPath();
                c.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
                c.fillStyle = `hsla(${col.h},${col.s}%,${col.l}%,${p.opacity * 0.15})`;
                c.fill();
            });
            requestAnimationFrame(animProj);
        }
        animProj();
    });

    /* ═══════════════════════════
       5. SCROLL PROGRESS BAR
    ═══════════════════════════ */
    const scrollProgress = $('#scrollProgress');
    function updateProgress() {
        const top = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollProgress && h > 0) scrollProgress.style.width = (top / h * 100) + '%';
    }

    /* ═══════════════════════════
       6. SCROLL REVEAL + STAT BAR FILL
    ═══════════════════════════ */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                if (e.target.classList.contains('stat')) {
                    const fill = e.target.querySelector('.stat__fill');
                    if (fill) fill.style.width = fill.style.getPropertyValue('--w');
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    $$('.scroll-reveal').forEach(el => revealObs.observe(el));

    /* ═══════════════════════════
       7. STAT COUNTER + LEVEL UP TOAST
    ═══════════════════════════ */
    let levelUpShown = false;
    const counterObs = new IntersectionObserver((entries) => {
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
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                let current = Math.round(eased * target);
                el.textContent = divide ? (current / divide).toFixed(2) + suffix : current + suffix;
                if (progress < 1) requestAnimationFrame(tick);
                else if (!levelUpShown) {
                    // Show level up toast after first stat completes
                    levelUpShown = true;
                    showLevelUp();
                }
            }
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.5 });
    $$('.stat__number').forEach(el => counterObs.observe(el));

    function showLevelUp() {
        const toast = document.createElement('div');
        toast.className = 'level-up-toast show';
        toast.textContent = '⚡ LEVEL UP ⚡';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    /* ═══════════════════════════
       8. DUNGEON ENTER — Section scroll effect
    ═══════════════════════════ */
    const dungeonObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && !e.target.dataset.entered) {
                e.target.dataset.entered = '1';
                e.target.classList.add('active');
            }
        });
    }, { threshold: 0.05 });
    $$('.dungeon-enter').forEach(el => dungeonObs.observe(el));

    /* ═══════════════════════════
       9. SYSTEM WINDOW ENTRANCE
    ═══════════════════════════ */
    const winObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'none';
            }
        });
    }, { threshold: 0.1 });
    $$('.sys-window').forEach(win => {
        win.style.opacity = '0';
        win.style.transform = 'translateY(20px) scale(0.98)';
        win.style.transition = 'opacity .8s ease, transform .8s ease';
        winObs.observe(win);
    });

    /* ═══════════════════════════
       10. HERO TYPING EFFECT
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
                cIdx--;
                speed = 40;
                if (cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; speed = 200; }
            }
            setTimeout(typeRole, speed);
        }
        setTimeout(typeRole, 5500);
    }

    /* ═══════════════════════════
       11. DYNAMIC GREETING
    ═══════════════════════════ */
    const sysText = document.querySelector('.sys-notify__text');
    if (sysText) {
        const h = new Date().getHours();
        if (h >= 5 && h < 12) sysText.textContent = 'GOOD MORNING — WELCOME BACK';
        else if (h >= 12 && h < 17) sysText.textContent = 'GOOD AFTERNOON — WELCOME BACK';
        else if (h >= 17 && h < 21) sysText.textContent = 'GOOD EVENING — WELCOME BACK';
        else sysText.textContent = 'LATE NIGHT SESSION DETECTED';
    }

    /* ═══════════════════════════
       12. NAV SCROLL
    ═══════════════════════════ */
    const nav = $('#nav');
    function handleNav() {
        if (nav) nav.style.background = window.scrollY > 100 ? 'rgba(6,10,19,0.95)' : 'rgba(6,10,19,0.8)';
    }

    /* ═══════════════════════════
       13. QUEST CARD HOVER GLOW — Mouse tracking
    ═══════════════════════════ */
    $$('.quest').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            card.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(79,156,247,0.06), transparent), var(--bg-card-hover)`;
        });
        card.addEventListener('mouseleave', () => { card.style.background = ''; });
    });

    /* ═══════════════════════════
       14. SMOOTH SCROLL + SCROLL TOP
    ═══════════════════════════ */
    const scrollTopBtn = $('#scrollTopBtn');
    if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    $$('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const t = document.querySelector(href);
                if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ═══════════════════════════
       15. PARALLAX SCROLL — Subtle depth on bg-text
    ═══════════════════════════ */
    function parallaxBgText() {
        $$('.section__bg-text').forEach(el => {
            const rect = el.parentElement.getBoundingClientRect();
            const speed = 0.08;
            const offset = rect.top * speed;
            el.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
        });
    }

    /* ═══════════════════════════
       16. UNIFIED SCROLL
    ═══════════════════════════ */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                handleNav();
                parallaxBgText();
                ticking = false;
            });
            ticking = true;
        }
    });

})();
