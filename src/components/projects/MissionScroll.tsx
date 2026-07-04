"use client";

import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";

export default function MissionScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initScrollAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const scrollCards = sectionRef.current?.querySelectorAll(".mission-scroll-card");
      scrollCards?.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Scroll unfurl animation
        tl.fromTo(
          card,
          { scaleY: 0, opacity: 0, transformOrigin: "top center" },
          { scaleY: 1, opacity: 1, duration: 0.7, ease: "expo.out" }
        )
          // Title stroke draw
          .fromTo(
            card.querySelector(".mission-title-path"),
            { strokeDashoffset: 500 },
            { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
            "-=0.3"
          )
          // Description fade
          .fromTo(
            card.querySelector(".mission-description"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3"
          )
          // Tech tags stamp in
          .fromTo(
            card.querySelectorAll(".tech-seal"),
            { scale: 0, rotation: -15 },
            { scale: 1, rotation: 0, duration: 0.3, stagger: 0.06, ease: "back.out(1.7)" },
            "-=0.2"
          )
          // Metrics
          .fromTo(
            card.querySelectorAll(".mission-metric"),
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
            "-=0.2"
          );
      });
    };
    initScrollAnimation();
  }, []);

  return (
    <section ref={sectionRef} id="mission-log" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">三</span>
        <h2 className="section-title">Mission Log</h2>
        <p className="section-subtitle">S-Rank & A-Rank Completed Missions</p>
      </div>

      <div className="missions-container">
        {resumeData.projects.map((project, index) => (
          <article
            key={project.id}
            className={`mission-scroll-card mission-scroll-card--${project.element}`}
            style={{ "--mission-color": project.element === "fire" ? "#FF4E00" : project.element === "lightning" ? "#7FDBFF" : project.element === "earth" ? "#8D6748" : "#2EC4B6" } as React.CSSProperties}
          >
            {/* Rank badge */}
            <div className="mission-rank-badge">
              <span className="rank-letter">{project.rank}</span>
            </div>

            {/* Scroll paper texture overlay */}
            <div className="mission-paper-texture" aria-hidden="true" />

            <div className="mission-content">
              {/* Title with SVG stroke path animation */}
              <div className="mission-title-container">
                <h3 className="mission-title">{project.title}</h3>
                <svg className="mission-title-underline" viewBox="0 0 300 4" preserveAspectRatio="none">
                  <path
                    className="mission-title-path"
                    d="M0,2 L300,2"
                    stroke="var(--mission-color)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                  />
                </svg>
                <p className="mission-subtitle">{project.subtitle}</p>
              </div>

              <p className="mission-description">{project.description}</p>

              {/* Metrics */}
              <div className="mission-metrics">
                {project.metrics.map((m) => (
                  <div key={m.label} className="mission-metric">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack seals */}
              <div className="mission-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-seal">{t}</span>
                ))}
              </div>

              {/* Year and link */}
              <div className="mission-footer">
                <span className="mission-year">{project.year}</span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mission-link"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
