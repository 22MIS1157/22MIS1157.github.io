/* ═══════════════════════════════════════════════════
   SOLO LEVELING — PORTFOLIO JAVASCRIPT
   Shadow Particles · System Boot · Scroll Engine
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
    const loaderSub = $('#loaderSub');

    const bootMessages = [
        'SYSTEM INITIALIZING...',
        'SCANNING HUNTER DATABASE...',
        'HUNTER PROFILE DETECTED...',
        'LOADING COMBAT DATA...',
        'ARISE.'
    ];

    let msgIndex = 0;
    const bootInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < bootMessages.length) {
            if (loaderMsg) loaderMsg.textContent = bootMessages[msgIndex];
        }
        if (msgIndex >= bootMessages.length - 1) clearInterval(bootInterval);
    }, 700);

    // Auto-hide loader after boot sequence
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
            // Remove loader from DOM after transition
            setTimeout(() => {
                if (loader) loader.style.display = 'none';
            }, 1500);
        }, 4000);
    });

    /* ═══════════════════════════
       2. SHADOW PARTICLE SYSTEM
       Blue/cyan floating particles like shadow soldiers
    ═══════════════════════════ */
    const shadowCanvas = $('#shadowCanvas');
    if (shadowCanvas) {
        const ctx = shadowCanvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 50;

        function resizeCanvas() {
            shadowCanvas.width = window.innerWidth;
            shadowCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class ShadowParticle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * shadowCanvas.width;
                this.y = Math.random() * shadowCanvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -Math.random() * 0.5 - 0.1; // float upward
                this.opacity = Math.random() * 0.4 + 0.1;
                this.fadeSpeed = Math.random() * 0.003 + 0.001;
                // Blue/cyan/purple spectrum
                const hue = 200 + Math.random() * 60; // 200-260 range
                this.color = `hsla(${hue}, 80%, 65%, `;
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
                ctx.fillStyle = this.color + this.opacity + ')';
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color + (this.opacity * 0.15) + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new ShadowParticle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* ═══════════════════════════
       3. HERO PARTICLES — Concentrated blue energy
    ═══════════════════════════ */
    const heroCanvas = $('#heroParticles');
    if (heroCanvas) {
        const hCtx = heroCanvas.getContext('2d');
        let heroParticles = [];

        function resizeHeroCanvas() {
            const hero = heroCanvas.parentElement;
            heroCanvas.width = hero.offsetWidth;
            heroCanvas.height = hero.offsetHeight;
        }
        resizeHeroCanvas();
        window.addEventListener('resize', resizeHeroCanvas);

        class HeroParticle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * heroCanvas.width;
                this.y = heroCanvas.height + Math.random() * 50;
                this.size = Math.random() * 1.8 + 0.3;
                this.speedY = -Math.random() * 1.5 - 0.3;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.life = Math.random() * 200 + 100;
                this.age = 0;
                const hue = 210 + Math.random() * 30;
                this.color = `hsla(${hue}, 90%, 70%, `;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.age++;
                if (this.age > this.life) this.opacity -= 0.02;
                if (this.opacity <= 0) this.reset();
            }
            draw() {
                hCtx.beginPath();
                hCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                hCtx.fillStyle = this.color + this.opacity + ')';
                hCtx.fill();
            }
        }

        for (let i = 0; i < 60; i++) heroParticles.push(new HeroParticle());

        function animateHeroParticles() {
            hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            heroParticles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateHeroParticles);
        }
        animateHeroParticles();
    }

    /* ═══════════════════════════
       4. SCROLL PROGRESS BAR
    ═══════════════════════════ */
    const scrollProgress = $('#scrollProgress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = percent + '%';
    }

    /* ═══════════════════════════
       5. SCROLL REVEAL — Intersection Observer
    ═══════════════════════════ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Trigger stat bar fills
                if (entry.target.classList.contains('stat')) {
                    const fill = entry.target.querySelector('.stat__fill');
                    if (fill) fill.style.width = fill.style.getPropertyValue('--w');
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    $$('.scroll-reveal').forEach(el => revealObserver.observe(el));

    /* ═══════════════════════════
       6. STAT COUNTER ANIMATION
    ═══════════════════════════ */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
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
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                let current = Math.round(eased * target);
                if (divide) {
                    el.textContent = (current / divide).toFixed(2) + suffix;
                } else {
                    el.textContent = current + suffix;
                }
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }, { threshold: 0.5 });

    $$('.stat__number').forEach(el => counterObserver.observe(el));

    /* ═══════════════════════════
       7. HERO TYPING EFFECT
    ═══════════════════════════ */
    const heroRole = $('#heroRole');
    if (heroRole) {
        const roles = [
            'intelligent systems',
            'ML pipelines',
            'cloud-native APIs',
            'real-time dashboards',
            'computer vision models'
        ];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeRole() {
            const current = roles[roleIdx];
            if (!isDeleting) {
                heroRole.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    isDeleting = true;
                    typeSpeed = 2000; // pause at end
                }
            } else {
                heroRole.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                typeSpeed = 40;
                if (charIdx === 0) {
                    isDeleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    typeSpeed = 200;
                }
            }
            setTimeout(typeRole, typeSpeed);
        }
        // Start typing after loader
        setTimeout(typeRole, 5000);
    }

    /* ═══════════════════════════
       8. DYNAMIC GREETING
    ═══════════════════════════ */
    const sysNotifyText = document.querySelector('.sys-notify__text');
    if (sysNotifyText) {
        const hour = new Date().getHours();
        let greeting = 'A NEW HUNTER HAS BEEN DETECTED';
        if (hour >= 5 && hour < 12) greeting = 'GOOD MORNING, HUNTER';
        else if (hour >= 12 && hour < 17) greeting = 'GOOD AFTERNOON, HUNTER';
        else if (hour >= 17 && hour < 21) greeting = 'GOOD EVENING, HUNTER';
        else greeting = 'LATE NIGHT GRINDING, HUNTER?';
        sysNotifyText.textContent = greeting;
    }

    /* ═══════════════════════════
       9. NAV SCROLL BEHAVIOR
    ═══════════════════════════ */
    const nav = $('#nav');
    let lastScroll = 0;
    function handleNavScroll() {
        const currentScroll = window.scrollY;
        if (nav) {
            if (currentScroll > 100) {
                nav.style.background = 'rgba(6, 10, 19, 0.95)';
            } else {
                nav.style.background = 'rgba(6, 10, 19, 0.8)';
            }
        }
        lastScroll = currentScroll;
    }

    /* ═══════════════════════════
       10. SCROLL TO TOP
    ═══════════════════════════ */
    const scrollTopBtn = $('#scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ═══════════════════════════
       11. SMOOTH SCROLL FOR NAV LINKS
    ═══════════════════════════ */
    $$('.nav__link, a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* ═══════════════════════════
       12. UNIFIED SCROLL HANDLER
    ═══════════════════════════ */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                handleNavScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    /* ═══════════════════════════
       13. QUEST CARD HOVER GLOW — Mouse tracking
    ═══════════════════════════ */
    $$('.quest').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mx', x + 'px');
            card.style.setProperty('--my', y + 'px');
            card.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(79,156,247,0.06), transparent), var(--bg-card-hover)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    /* ═══════════════════════════
       14. SYSTEM WINDOW ENTRANCE
    ═══════════════════════════ */
    const windowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
        });
    }, { threshold: 0.1 });

    $$('.sys-window').forEach(win => {
        win.style.opacity = '0';
        win.style.transform = 'translateY(20px) scale(0.98)';
        win.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        windowObserver.observe(win);
    });

})();
