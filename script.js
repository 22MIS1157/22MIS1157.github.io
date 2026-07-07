/* ============================================
   AFNAAN AHMED P — $10K PREMIUM PORTFOLIO
   GSAP ScrollTrigger + Custom Cursor + 3D Tilt
   ============================================ */

(function () {
  "use strict";

  /* ── REDUCED MOTION CHECK ── */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── GSAP REGISTER ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ══════════════════════════════════════════
     1. LOADER — Matrix Boot Sequence
     ══════════════════════════════════════════ */
  const loader = document.getElementById("loader");
  const loaderFill = document.getElementById("loaderFill");
  const loaderStatus = document.getElementById("loaderStatus");
  const loaderText = document.getElementById("loaderText");
  const loaderTitle = document.getElementById("loaderTitle");

  const loadMessages = [
    "Loading modules...",
    "Initializing neural networks...",
    "Connecting to cloud services...",
    "Compiling shaders...",
    "Calibrating sensors...",
    "System ready."
  ];

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 18 + 5;
    if (loadProgress >= 100) loadProgress = 100;
    if (loaderFill) loaderFill.style.width = loadProgress + "%";
    const msgIndex = Math.min(Math.floor((loadProgress / 100) * loadMessages.length), loadMessages.length - 1);
    if (loaderStatus) loaderStatus.textContent = loadMessages[msgIndex];
    if (loaderText) {
      const states = ["INITIALIZING", "COMPILING", "LOADING", "DEPLOYING", "READY"];
      loaderText.textContent = states[Math.min(Math.floor((loadProgress / 100) * states.length), states.length - 1)];
    }
    if (loadProgress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        if (loader) loader.classList.add("hidden");
        setTimeout(() => initAnimations(), 300);
      }, 600);
    }
  }, 250);

  // Failsafe
  setTimeout(() => {
    if (loader && !loader.classList.contains("hidden")) {
      loader.classList.add("hidden");
      setTimeout(() => initAnimations(), 100);
    }
  }, 5000);

  /* ══════════════════════════════════════════
     2. CUSTOM CURSOR
     ══════════════════════════════════════════ */
  const cursor = document.getElementById("cursor");
  const cursorDot = cursor ? cursor.querySelector(".cursor__dot") : null;
  const cursorRing = cursor ? cursor.querySelector(".cursor__ring") : null;
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  if (cursor && !prefersReducedMotion && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
      if (cursorRing) {
        cursorRing.style.transform = `translate(${cursorX - 19}px, ${cursorY - 19}px)`;
      }
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover detection
    const hoverTargets = "a, button, .btn, .magnetic, .pmod, .stat, .contact__item, .leadership-item, .marquee-item, .nav__link, .timeline__item";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.add("hovering");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) cursor.classList.remove("hovering");
    });
  } else if (cursor) {
    cursor.style.display = "none";
  }

  /* ══════════════════════════════════════════
     3. MAGNETIC BUTTON EFFECT
     ══════════════════════════════════════════ */
  if (!prefersReducedMotion && window.innerWidth > 768) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      });
    });
  }

  /* ══════════════════════════════════════════
     4. 3D TILT EFFECT ON CARDS
     ══════════════════════════════════════════ */
  if (!prefersReducedMotion && window.innerWidth > 768) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 800,
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
      });
    });
  }

  /* ══════════════════════════════════════════
     5. HERO PARTICLES CANVAS
     ══════════════════════════════════════════ */
  const heroCanvas = document.getElementById("heroParticles");
  if (heroCanvas) {
    const ctx = heroCanvas.getContext("2d");
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth > 768 ? 60 : 30;

    function resizeCanvas() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > heroCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > heroCanvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }
    if (!prefersReducedMotion) animateParticles();
  }

  /* ══════════════════════════════════════════
     6. TYPING EFFECT
     ══════════════════════════════════════════ */
  const roleEl = document.getElementById("heroRole");
  const roles = ["intelligent systems", "ML pipelines", "cloud infrastructure", "real-time APIs", "AI applications"];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeRole() {
    if (!roleEl) return;
    const current = roles[roleIndex];
    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 40);
    } else {
      roleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(() => { isDeleting = true; typeRole(); }, 2200);
        return;
      }
      setTimeout(typeRole, 70);
    }
  }

  /* ══════════════════════════════════════════
     7. COUNTER ANIMATION
     ══════════════════════════════════════════ */
  function animateCounters() {
    document.querySelectorAll(".stat__number").forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      const divide = parseInt(el.getAttribute("data-divide")) || 1;
      const suffix = el.getAttribute("data-suffix") || "";
      const finalValue = divide > 1 ? (target / divide).toFixed(2) : target;
      const duration = 1.5;

      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          const v = divide > 1 ? (counter.val / divide).toFixed(2) : Math.round(counter.val);
          el.textContent = v + suffix;
        },
      });
    });
  }

  /* ══════════════════════════════════════════
     8. NAVIGATION
     ══════════════════════════════════════════ */
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  // Scroll state
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 80);

    // Scroll progress
    const scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = h > 0 ? (window.scrollY / h) * 100 + "%" : "0%";
    }

    // Active nav link
    const sections = document.querySelectorAll("section[id]");
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-section") === current);
    });
  });

  // Hamburger
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // Scroll to top
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Greeting
  const greetingEl = document.querySelector(".hero__greeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    greetingEl.textContent = greeting + ". I'm";
  }

  /* ══════════════════════════════════════════
     9. GSAP SCROLL ANIMATIONS — Main init
     ══════════════════════════════════════════ */
  function initAnimations() {
    if (prefersReducedMotion) {
      // Show everything immediately
      gsap.set(".hero__greeting, .hero__name-line, .hero__role-line, .hero__tagline, .hero__sys-status, .hero__cta, .hero__scroll-hint, .section-label, .section__title, .contact__title", { opacity: 1, y: 0, x: 0 });
      typeRole();
      animateCounters();
      return;
    }

    /* ── HERO ENTRANCE ── */
    const heroTl = gsap.timeline({ delay: 0.2 });

    heroTl
      .to(".hero__greeting", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(".hero__name-line", { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.15 }, "-=0.3")
      .to(".hero__role-line", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(".hero__tagline", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(".hero__sys-status", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(".hero__cta", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .to(".hero__scroll-hint", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .call(() => typeRole());

    /* ── SECTION HEADERS ── */
    gsap.utils.toArray(".section-label").forEach((el) => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });

    gsap.utils.toArray(".section__title, .contact__title").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });

    /* ── ABOUT TEXT ── */
    gsap.utils.toArray(".about__desc, .about__philosophy, .about__exploring").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── STAT CARDS ── */
    gsap.utils.toArray(".stat").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.08, ease: "back.out(1.4)",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── COUNTERS ── */
    animateCounters();

    /* ── PROJECT CARDS ── */
    gsap.utils.toArray(".pmod").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── TIMELINE ITEMS ── */
    gsap.utils.toArray(".timeline__item").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── LEADERSHIP ── */
    gsap.utils.toArray(".leadership-item").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.1, ease: "back.out(1.4)",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── CONTACT ITEMS ── */
    gsap.utils.toArray(".contact__item").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── MARQUEE ROWS ── */
    gsap.utils.toArray(".marquee-row").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── PARALLAX HERO ORBS ── */
    gsap.utils.toArray(".hero__orb").forEach((orb, i) => {
      gsap.to(orb, {
        yPercent: (i + 1) * -12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 },
      });
    });

    /* ── TIMELINE LINE DRAW ── */
    gsap.utils.toArray(".timeline__line").forEach((line) => {
      gsap.fromTo(line,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: line.parentElement, start: "top 80%", toggleActions: "play none none reverse" } }
      );
    });
  }
})();
