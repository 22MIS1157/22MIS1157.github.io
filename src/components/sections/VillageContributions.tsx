"use client";

import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";

export default function VillageContributions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".village-card") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} id="village-contributions" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">七</span>
        <h2 className="section-title">Village Contributions</h2>
        <p className="section-subtitle">Leadership & Activities</p>
      </div>

      <div className="village-grid">
        {resumeData.activities.map((act, i) => (
          <div key={i} className="village-card">
            <div className="village-card-icon" aria-hidden="true">{act.icon}</div>
            <h3 className="village-card-role">{act.role}</h3>
            <p className="village-card-org">{act.organization}</p>
            <p className="village-card-desc">{act.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
