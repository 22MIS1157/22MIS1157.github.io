"use client";

import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";

export default function AcademyRecords() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".academy-card") ?? [],
        { y: 50, opacity: 0, rotateX: 10 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} id="academy-records" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">五</span>
        <h2 className="section-title">Academy Records</h2>
        <p className="section-subtitle">Education & Training</p>
      </div>

      <div className="academy-grid">
        {resumeData.education.map((edu, i) => (
          <div key={i} className="academy-card">
            <div className="academy-card-accent" aria-hidden="true" />
            <h3 className="academy-card-degree">{edu.degree}</h3>
            <p className="academy-card-institution">{edu.institution}</p>
            <div className="academy-card-meta">
              <span className="academy-period">{edu.period}</span>
              <span className="academy-score">{"cgpa" in edu ? (edu.cgpa as string) : "score" in edu ? (edu.score as string) : ""}</span>
            </div>
            {edu.description && <p className="academy-card-desc">{edu.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
