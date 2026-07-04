"use client";

import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";

export default function AwakeningEye() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initScrollAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const eye = eyeRef.current;
      if (!eye) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Eye lid opens, iris fills red, pupil appears, tomoe appears
      tl.fromTo(eye.querySelector(".eye-lid-top"), { attr: { d: "M20,50 Q50,50 80,50" } }, { attr: { d: "M20,50 Q50,20 80,50" }, duration: 0.3 })
        .fromTo(eye.querySelector(".eye-lid-bottom"), { attr: { d: "M20,50 Q50,50 80,50" } }, { attr: { d: "M20,50 Q50,80 80,50" }, duration: 0.3 }, "<")
        // Iris fills red
        .fromTo(eye.querySelector(".eye-iris"), { fill: "#333", scale: 0.5, transformOrigin: "center" }, { fill: "#D62828", scale: 1, duration: 0.3 })
        // Pupil appears
        .fromTo(eye.querySelector(".eye-pupil"), { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.2 })
        // Tomoe appear one by one
        .fromTo(eye.querySelectorAll(".eye-tomoe"), { scale: 0, opacity: 0, transformOrigin: "center" }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.15 })
        // Morph to Itachi's Mangekyou Sharingan (tomoe fade out, pinwheel blades rotate and fade in)
        .to(eye.querySelectorAll(".eye-tomoe"), { opacity: 0, scale: 0.3, duration: 0.2 })
        .to(eye.querySelector(".eye-mangekyou"), { opacity: 1, scale: 1, rotation: 360, transformOrigin: "center", duration: 0.4 }, "<");

      // Fade in about content
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".about-item") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    };

    initScrollAnimation();
  }, []);

  return (
    <section ref={sectionRef} id="ninja-profile" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">一</span>
        <h2 className="section-title">Ninja Profile</h2>
        <p className="section-subtitle">Bingo Book Entry</p>
      </div>

      <div className="about-layout">
        {/* Eye glyph background */}
        <div className="about-eye-container" aria-hidden="true">
          <svg ref={eyeRef} viewBox="0 0 100 100" className="awakening-eye-svg">
            {/* Outer eye shape */}
            <path className="eye-lid-top" d="M20,50 Q50,50 80,50" fill="none" stroke="var(--sharingan-red, #D62828)" strokeWidth="1.5" />
            <path className="eye-lid-bottom" d="M20,50 Q50,50 80,50" fill="none" stroke="var(--sharingan-red, #D62828)" strokeWidth="1.5" />
            {/* Iris */}
            <circle className="eye-iris" cx="50" cy="50" r="15" fill="#333" />
            {/* Pupil */}
            <circle className="eye-pupil" cx="50" cy="50" r="4" fill="#0B0B0F" />
            {/* Tomoe marks */}
            <g className="eye-tomoe" transform="translate(50,35)">
              <path d="M0,0 Q4,6 0,12 Q-2,6 0,0Z" fill="var(--sharingan-glow, #FF1E1E)" />
            </g>
            <g className="eye-tomoe" transform="translate(63,57) rotate(120 0 0)">
              <path d="M0,0 Q4,6 0,12 Q-2,6 0,0Z" fill="var(--sharingan-glow, #FF1E1E)" />
            </g>
            <g className="eye-tomoe" transform="translate(37,57) rotate(240 0 0)">
              <path d="M0,0 Q4,6 0,12 Q-2,6 0,0Z" fill="var(--sharingan-glow, #FF1E1E)" />
            </g>
            {/* Itachi's Mangekyou blades (hidden by default) */}
            <g className="eye-mangekyou" style={{ opacity: 0, transform: "scale(0.5)" }}>
              <path d="M50 50 Q35 15 50 8 Q55 25 65 35 Z" fill="#0B0B0F" />
              <path d="M50 50 Q85 35 92 50 Q75 55 65 65 Z" fill="#0B0B0F" transform="rotate(120 50 50)" />
              <path d="M50 50 Q65 85 50 92 Q45 75 35 65 Z" fill="#0B0B0F" transform="rotate(240 50 50)" />
            </g>
            {/* Glow ring */}
            <circle cx="50" cy="50" r="22" fill="none" stroke="var(--sharingan-glow, #FF1E1E)" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        <div className="about-content">
          <div className="about-item about-item--summary">
            <h3>Profile</h3>
            <p>
              Pre-final year M.Tech Integrated CSE student at VIT Chennai, specializing in
              Data Intelligence, RAG pipelines, and AI-driven systems. I turn raw, chaotic data
              into structured intelligence — building production-grade ML pipelines, serverless
              architectures, and computer vision systems that solve real problems.
            </p>
          </div>

          <div className="about-stats">
            <div className="about-item stat-card">
              <span className="stat-label">Rank</span>
              <span className="stat-value">Chunin</span>
              <span className="stat-desc">Research Intern Level</span>
            </div>
            <div className="about-item stat-card">
              <span className="stat-label">Village</span>
              <span className="stat-value">VIT Chennai</span>
              <span className="stat-desc">Academy: 2022–2027</span>
            </div>
            <div className="about-item stat-card">
              <span className="stat-label">CGPA</span>
              <span className="stat-value">7.92</span>
              <span className="stat-desc">M.Tech Integrated CSE</span>
            </div>
            <div className="about-item stat-card">
              <span className="stat-label">Missions</span>
              <span className="stat-value">4</span>
              <span className="stat-desc">S & A Rank Completed</span>
            </div>
          </div>

          <div className="about-item about-item--strengths">
            <h3>Core Strengths</h3>
            <div className="strength-tags">
              {["RAG Pipelines", "Feature Engineering", "Computer Vision", "AWS Serverless", "Clinical ML", "Real-time Systems"].map((s) => (
                <span key={s} className="strength-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Itachi Uchiha transparent render background */}
        <div
          className="absolute right-0 bottom-0 pointer-events-none opacity-[0.09] select-none hidden lg:block"
          style={{
            maxWidth: "280px",
            zIndex: 0,
            transform: "translate(20px, 40px)",
            mixBlendMode: "luminosity",
            filter: "contrast(1.2) brightness(0.85)",
          }}
        >
          <img
            src="https://pngimg.com/uploads/naruto/naruto_PNG65.png"
            alt="Itachi Uchiha"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
