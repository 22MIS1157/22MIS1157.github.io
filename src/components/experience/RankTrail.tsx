"use client";

import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";

const RANK_ICONS: Record<string, string> = {
  Chunin: "🔷",
  Genin: "🔹",
};

export default function RankTrail() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initTimeline = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Animate the trail path
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }

      // Animate badges
      const badges = sectionRef.current?.querySelectorAll(".rank-badge-container");
      badges?.forEach((badge, i) => {
        gsap.fromTo(
          badge,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badge,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate content cards
      const cards = sectionRef.current?.querySelectorAll(".rank-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    };
    initTimeline();
  }, []);

  return (
    <section ref={sectionRef} id="rank-history" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">四</span>
        <h2 className="section-title">Rank History</h2>
        <p className="section-subtitle">Mission Trail & Experience</p>
      </div>

      <div className="timeline-container">
        {/* SVG trail path */}
        <svg className="timeline-path-svg" viewBox="0 0 40 400" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M20,0 L20,400"
            stroke="var(--theme-accent, #FF7A00)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="8 4"
          />
        </svg>

        <div className="timeline-entries">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="timeline-entry">
              <div className="rank-badge-container flex flex-col items-center justify-center">
                <div className="rank-badge" style={{ opacity: 0, width: "64px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src="/svg/headband.svg"
                    alt="Headband"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "var(--theme-accent, #C81E1E)",
                      filter: "drop-shadow(0 0 4px var(--theme-accent, #C81E1E))"
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.55rem", color: "var(--theme-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                  {exp.rank}
                </span>
              </div>

              <div className="rank-card" style={{ opacity: 0 }}>
                <div className="rank-card-header">
                  <h3 className="rank-card-title">{exp.title}</h3>
                  <span className="rank-card-period">{exp.period}</span>
                </div>
                <p className="rank-card-org">{exp.organization}</p>
                <p className="rank-card-desc">{exp.description}</p>
                {"certificate" in exp && exp.certificate && (
                  <a
                    href={exp.certificate as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rank-card-cert"
                  >
                    View Certificate →
                  </a>
                )}
                {"grade" in exp && exp.grade && (
                  <div className="rank-card-grade">
                    Grade: <strong>{exp.grade as string}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
