/* ============================================
   AFNAAN AHMED P — MULTI-MORPHIC PORTFOLIO
   GSAP Motion, Theme System & Simulation loops
   ============================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ══════════════════════════════════════════
     1. LOADER — Diagnostic HUD Boot Sequence
     ══════════════════════════════════════════ */
  const loader = document.getElementById("loader");
  const loaderRingFill = document.getElementById("loaderRingFill");
  const loaderPercent = document.getElementById("loaderPercent");
  const loaderConsole = document.getElementById("loaderConsole");

  const diagnosticLogs = [
    "LOADING_SYSTEM_CONFIGS...",
    "INIT_CORE_COMPILER...",
    "DOCKER_IMAGE_BOOT_SEQUENCE...",
    "AWS_GATEWAY_HANDSHAKE_OK",
    "PULLING_CHROMADB_VECTORS...",
    "PARSING_YOLOV8_WEIGHTS...",
    "SYNAPSE_GRADIENTS_RESOLVED",
    "ATCC_VPARK_SERIAL_CONNECTING...",
    "ICU_SEPSIS_ML_MODEL_LOAD...",
    "LEXCLOUD_RAG_PIPELINE_INIT...",
    "ESTABLISHING_HUD_RENDERERS...",
    "BOOT_COMPLETED_SUCCESSFULLY"
  ];

  let progress = 0;
  const progressLimit = 100;
  const circumference = 314; // 2 * pi * 50

  const loaderInterval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= progressLimit) progress = progressLimit;

    const roundProgress = Math.round(progress);
    if (loaderPercent) loaderPercent.textContent = roundProgress + "%";
    
    if (loaderRingFill) {
      const offset = circumference - (progress / 100) * circumference;
      loaderRingFill.style.strokeDashoffset = offset;
    }

    const logIdx = Math.min(Math.floor((progress / 100) * diagnosticLogs.length), diagnosticLogs.length - 1);
    if (loaderConsole) loaderConsole.textContent = diagnosticLogs[logIdx];

    if (progress >= progressLimit) {
      clearInterval(loaderInterval);
      setTimeout(() => {
        if (loader) loader.classList.add("hidden");
        setTimeout(() => initGSAPAnimations(), 200);
      }, 700);
    }
  }, 120);

  // Failsafe
  setTimeout(() => {
    if (loader && !loader.classList.contains("hidden")) {
      loader.classList.add("hidden");
      setTimeout(() => initGSAPAnimations(), 100);
    }
  }, 4500);

  /* ══════════════════════════════════════════
     2. THEME SYSTEM (Light / Dark)
     ══════════════════════════════════════════ */
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "dark";

  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
      localStorage.setItem("theme", theme);
      initProjectCanvases();
    });
  }

  /* ══════════════════════════════════════════
     3. TYPING EFFECT
     ══════════════════════════════════════════ */
  const roleEl = document.getElementById("heroRole");
  const roles = ["intelligent systems", "ML pipelines", "cloud infrastructure", "real-time APIs", "AI applications"];
  let roleIdx = 0, charIdx = 0, isDeleting = false;

  function typeRole() {
    if (!roleEl) return;
    const current = roles[roleIdx];
    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeRole, 300);
        return;
      }
      setTimeout(typeRole, 30);
    } else {
      roleEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        setTimeout(() => { isDeleting = true; typeRole(); }, 2000);
        return;
      }
      setTimeout(typeRole, 60);
    }
  }

  /* ══════════════════════════════════════════
     4. HERO PARTICLES
     ══════════════════════════════════════════ */
  const heroCanvas = document.getElementById("heroParticles");
  if (heroCanvas) {
    const ctx = heroCanvas.getContext("2d");
    let particles = [];
    const count = window.innerWidth > 768 ? 50 : 25;

    function resizeHero() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }
    resizeHero();
    window.addEventListener("resize", resizeHero);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.15;
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
        const isLight = document.body.classList.contains("light-theme");
        ctx.fillStyle = isLight ? `rgba(0, 180, 216, ${this.opacity})` : `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    function connectParticles() {
      const isLight = document.body.classList.contains("light-theme");
      const lineAlpha = 0.05;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight ? `rgba(0, 180, 216, ${lineAlpha * (1 - dist / 100)})` : `rgba(0, 229, 255, ${lineAlpha * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function runParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(runParticles);
    }
    if (!prefersReducedMotion) runParticles();
  }

  /* ══════════════════════════════════════════
     5. PROJECT-SPECIFIC SIMULATION CANVASES
     ══════════════════════════════════════════ */
  let activeAnimations = [];

  function initProjectCanvases() {
    activeAnimations.forEach(cancelAnimationFrame);
    activeAnimations = [];

    const isLight = () => document.body.classList.contains("light-theme");
    const getAccent = () => isLight() ? "#00B4D8" : "#00E5FF";
    const getGridColor = () => isLight() ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)";

    // --- 1. VPark (Parking Simulation) ---
    const vpark = document.getElementById("vparkCanvas");
    if (vpark) {
      const ctx = vpark.getContext("2d");
      let width = vpark.width = vpark.offsetWidth;
      let height = vpark.height = vpark.offsetHeight;
      let gateAngle = 0;
      let gateTarget = 0;
      let timer = 0;
      let occupied = [true, false, true, false];

      function drawVPark() {
        ctx.clearRect(0, 0, width, height);

        const bayW = width / 5;
        const bayH = height * 0.4;
        ctx.strokeStyle = getGridColor();
        ctx.lineWidth = 1;

        timer++;
        if (timer % 120 === 0) {
          occupied = occupied.map(() => Math.random() > 0.4);
          gateTarget = occupied[1] ? Math.PI / 2 : 0;
        }

        for (let i = 0; i < 4; i++) {
          const x = bayW * (i + 0.5);
          const y = height * 0.15;
          ctx.strokeRect(x, y, bayW, bayH);
          
          ctx.beginPath();
          ctx.arc(x + bayW/2, y + bayH/2, 6, 0, Math.PI*2);
          ctx.fillStyle = occupied[i] ? "#EF4444" : getAccent();
          ctx.shadowBlur = 10;
          ctx.shadowColor = occupied[i] ? "#EF4444" : getAccent();
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.font = "8px monospace";
          ctx.fillStyle = isLight() ? "#475569" : "#94A3B8";
          ctx.fillText(`BAY 0${i+1}`, x + 6, y + 16);
        }

        gateAngle += (gateTarget - gateAngle) * 0.08;

        const gateX = width * 0.8;
        const gateY = height * 0.7;
        ctx.strokeStyle = "#FF006E";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(gateX, gateY);
        ctx.lineTo(gateX - Math.cos(gateAngle) * 45, gateY - Math.sin(gateAngle) * 45);
        ctx.stroke();

        ctx.fillStyle = isLight() ? "#1E293B" : "#F1F5F9";
        ctx.beginPath();
        ctx.arc(gateX, gateY, 6, 0, Math.PI*2);
        ctx.fill();

        ctx.font = "8px monospace";
        ctx.fillStyle = getAccent();
        ctx.fillText(`GATE: ${gateAngle > 0.2 ? "OPEN" : "LOCKED"}`, 12, height - 24);
        ctx.fillText(`METRICS: YOLOv8 RUNNING`, 12, height - 12);

        const id = requestAnimationFrame(drawVPark);
        activeAnimations.push(id);
      }
      drawVPark();
    }

    // --- 2. Anemia (Nail Laser Scan) ---
    const anemia = document.getElementById("anemiaCanvas");
    if (anemia) {
      const ctx = anemia.getContext("2d");
      let width = anemia.width = anemia.offsetWidth;
      let height = anemia.height = anemia.offsetHeight;
      let scanY = 20;
      let scanDirection = 1;
      let pulseVal = 0;

      function drawAnemia() {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = isLight() ? "#64748B" : "#475569";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(width/2, height/2 - 10, 30, Math.PI, 0, false);
        ctx.lineTo(width/2 + 30, height/2 + 50);
        ctx.lineTo(width/2 - 30, height/2 + 50);
        ctx.closePath();
        ctx.stroke();

        pulseVal += 0.05;
        const capillaryAlpha = 0.15 + Math.sin(pulseVal) * 0.06;
        ctx.fillStyle = `rgba(255, 0, 110, ${capillaryAlpha})`;
        ctx.beginPath();
        ctx.arc(width/2, height/2 - 5, 25, Math.PI, 0, false);
        ctx.lineTo(width/2 + 25, height/2 + 45);
        ctx.lineTo(width/2 - 25, height/2 + 45);
        ctx.closePath();
        ctx.fill();

        scanY += 1.2 * scanDirection;
        if (scanY > height * 0.8 || scanY < height * 0.2) scanDirection *= -1;

        ctx.strokeStyle = getAccent();
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width/2 - 40, scanY);
        ctx.lineTo(width/2 + 40, scanY);
        ctx.shadowBlur = 12;
        ctx.shadowColor = getAccent();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = "8px monospace";
        ctx.fillStyle = getAccent();
        ctx.fillText(`HEMOGLOBIN: 13.8 g/dL`, 12, height - 24);
        ctx.fillText(`SCAN STATUS: 96% CONF`, 12, height - 12);

        const id = requestAnimationFrame(drawAnemia);
        activeAnimations.push(id);
      }
      drawAnemia();
    }

    // --- 3. LexCloud (Cloud Data Packets) ---
    const lexcloud = document.getElementById("lexcloudCanvas");
    if (lexcloud) {
      const ctx = lexcloud.getContext("2d");
      let width = lexcloud.width = lexcloud.offsetWidth;
      let height = lexcloud.height = lexcloud.offsetHeight;
      
      const nodes = [
        { x: width * 0.2, y: height * 0.5, label: "DOC" },
        { x: width * 0.5, y: height * 0.3, label: "S3" },
        { x: width * 0.5, y: height * 0.7, label: "DB" },
        { x: width * 0.8, y: height * 0.5, label: "RAG" }
      ];

      let packets = [];

      function drawLexCloud() {
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = getGridColor();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);
        ctx.stroke();

        if (Math.random() < 0.03 && packets.length < 5) {
          packets.push({
            start: nodes[0],
            mid: Math.random() > 0.5 ? nodes[1] : nodes[2],
            end: nodes[3],
            progress: 0,
            speed: Math.random() * 0.01 + 0.008
          });
        }

        ctx.fillStyle = getAccent();
        packets.forEach((p, idx) => {
          p.progress += p.speed;
          let currentX, currentY;
          
          if (p.progress < 0.5) {
            const t = p.progress * 2;
            currentX = p.start.x + (p.mid.x - p.start.x) * t;
            currentY = p.start.y + (p.mid.y - p.start.y) * t;
          } else {
            const t = (p.progress - 0.5) * 2;
            currentX = p.mid.x + (p.end.x - p.mid.x) * t;
            currentY = p.mid.y + (p.end.y - p.mid.y) * t;
          }

          ctx.beginPath();
          ctx.arc(currentX, currentY, 4, 0, Math.PI*2);
          ctx.shadowBlur = 8;
          ctx.shadowColor = getAccent();
          ctx.fill();
          ctx.shadowBlur = 0;

          if (p.progress >= 1) packets.splice(idx, 1);
        });

        nodes.forEach((node) => {
          ctx.fillStyle = varColor(node.label);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, Math.PI*2);
          ctx.fill();

          ctx.font = "8px monospace";
          ctx.fillStyle = isLight() ? "#475569" : "#94A3B8";
          ctx.fillText(node.label, node.x - 8, node.y + 20);
        });

        const id = requestAnimationFrame(drawLexCloud);
        activeAnimations.push(id);
      }

      function varColor(lbl) {
        if (lbl === "DOC") return "#FFB000";
        if (lbl === "RAG") return getAccent();
        return "#FF006E";
      }

      drawLexCloud();
    }

    // --- 4. Sepsis Survival (ICU Vital Telemetry) ---
    const sepsis = document.getElementById("sepsisCanvas");
    if (sepsis) {
      const ctx = sepsis.getContext("2d");
      let width = sepsis.width = sepsis.offsetWidth;
      let height = sepsis.height = sepsis.offsetHeight;
      let ecgPoints = [];
      let step = 0;

      for (let i = 0; i < width; i++) {
        ecgPoints.push(height * 0.5);
      }

      function drawSepsis() {
        ctx.clearRect(0, 0, width, height);

        step++;
        let nextY = height * 0.5;

        if (step % 40 === 0) {
          nextY = height * 0.2;
        } else if (step % 40 === 2) {
          nextY = height * 0.85;
        } else if (step % 40 === 5) {
          nextY = height * 0.45;
        }

        ecgPoints.shift();
        ecgPoints.push(nextY);

        ctx.strokeStyle = getGridColor();
        ctx.lineWidth = 0.5;
        for (let i = 0; i < width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, height);
          ctx.stroke();
        }
        for (let i = 0; i < height; i += 20) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(width, i);
          ctx.stroke();
        }

        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < width; i++) {
          if (i === 0) ctx.moveTo(i, ecgPoints[i]);
          else ctx.lineTo(i, ecgPoints[i]);
        }
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#10B981";
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = "8px monospace";
        ctx.fillStyle = "#10B981";
        ctx.fillText(`HR: 82 BPM`, 12, height - 24);
        ctx.fillText(`SURVIVAL CONFIDENCE: 93.4%`, 12, height - 12);

        const id = requestAnimationFrame(drawSepsis);
        activeAnimations.push(id);
      }
      drawSepsis();
    }
  }

  /* ══════════════════════════════════════════
     6. GSAP ANIMATIONS
     ══════════════════════════════════════════ */
  function initGSAPAnimations() {
    typeRole();
    initProjectCanvases();

    if (prefersReducedMotion) {
      gsap.set(".hero__greeting, .hero__name-line, .hero__role-line, .hero__tagline, .hero__sys-status, .hero__cta, .hero__scroll-hint, .section-label, .section__title, .contact__title", { opacity: 1, y: 0, x: 0 });
      animateCounters();
      return;
    }

    /* ── HERO TIMELINE ── */
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(".hero__greeting", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .fromTo(".hero__name-line", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.15 }, "-=0.2")
      .fromTo(".hero__role-line", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .fromTo(".hero__tagline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero__sys-status", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero__cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero__scroll-hint", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");

    /* ── SCROLL TRIGGER SECTIONS ── */
    gsap.utils.toArray(".section-label").forEach((lbl) => {
      gsap.fromTo(lbl, 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: lbl, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    gsap.utils.toArray(".section__title, .contact__title").forEach((tit) => {
      gsap.fromTo(tit,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out",
          scrollTrigger: { trigger: tit, start: "top 85%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── ABOUT FADES ── */
    gsap.utils.toArray(".about__desc, .about__philosophy, .about__exploring").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── STATS CARDS STAGGER ── */
    gsap.utils.toArray(".stat").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.08, ease: "back.out(1.3)",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    animateCounters();

    /* ── PROJECT CARDS ── */
    gsap.utils.toArray(".pmod").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── TIMELINE ── */
    gsap.utils.toArray(".timeline__item").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    gsap.utils.toArray(".timeline__line").forEach((line) => {
      gsap.fromTo(line,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: line.parentElement, start: "top 80%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── LEADERSHIP ── */
    gsap.utils.toArray(".leadership-item").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 25, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.08, ease: "back.out(1.3)",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── CONTACT ITEMS ── */
    gsap.utils.toArray(".contact__item").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } }
      );
    });

    /* ── PARALLAX ORBS & WATERMARKS ── */
    gsap.utils.toArray(".hero__orb").forEach((orb, i) => {
      gsap.to(orb, {
        yPercent: (i + 1) * -10,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    });

    // Left moving watermarks
    gsap.utils.toArray(".watermark-left").forEach((w) => {
      gsap.fromTo(w,
        { xPercent: -15 },
        { xPercent: 15, ease: "none",
          scrollTrigger: { trigger: w.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5 } }
      );
    });

    // Right moving watermarks
    gsap.utils.toArray(".watermark-right").forEach((w) => {
      gsap.fromTo(w,
        { xPercent: 15 },
        { xPercent: -15, ease: "none",
          scrollTrigger: { trigger: w.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5 } }
      );
    });
  }

  /* ══════════════════════════════════════════
     7. COUNTERS LOOP
     ══════════════════════════════════════════ */
  function animateCounters() {
    document.querySelectorAll(".stat__number").forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      const divide = parseInt(el.getAttribute("data-divide")) || 1;
      const suffix = el.getAttribute("data-suffix") || "";
      const valObj = { val: 0 };

      gsap.to(valObj, {
        val: target,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          const formatted = divide > 1 ? (valObj.val / divide).toFixed(2) : Math.round(valObj.val);
          el.textContent = formatted + suffix;
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     8. GLOBAL LISTENERS
     ══════════════════════════════════════════ */
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("nav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);

    const scrollProgress = document.getElementById("scrollProgress");
    if (scrollProgress) {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = totalH > 0 ? (window.scrollY / totalH) * 100 + "%" : "0%";
    }

    const sections = document.querySelectorAll("section[id]");
    let currentSec = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) currentSec = sec.id;
    });

    document.querySelectorAll(".nav__link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-section") === currentSec);
    });
  });

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
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

  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const greetingEl = document.querySelector(".hero__greeting");
  if (greetingEl) {
    const hr = new Date().getHours();
    const greetStr = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
    greetingEl.textContent = `${greetStr}. I'm`;
  }

  /* ══════════════════════════════════════════
     9. MAGNETIC & TILT EFFECTS
     ══════════════════════════════════════════ */
  if (!prefersReducedMotion && window.innerWidth > 768) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const bounds = el.getBoundingClientRect();
        const mx = e.clientX - bounds.left - bounds.width / 2;
        const my = e.clientY - bounds.top - bounds.height / 2;
        gsap.to(el, { x: mx * 0.25, y: my * 0.25, duration: 0.3, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });
    });

    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const bounds = card.getBoundingClientRect();
        const mx = (e.clientX - bounds.left) / bounds.width - 0.5;
        const my = (e.clientY - bounds.top) / bounds.height - 0.5;
        gsap.to(card, {
          rotateY: mx * 6,
          rotateX: -my * 6,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
      });
    });
  }

})();
