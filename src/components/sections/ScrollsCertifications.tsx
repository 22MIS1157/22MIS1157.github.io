"use client";

import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";

export default function ScrollsCertifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".cert-scroll") ?? [],
        { scale: 0.8, opacity: 0, rotation: -5 },
        {
          scale: 1, opacity: 1, rotation: 0,
          duration: 0.6, stagger: 0.15, ease: "back.out(1.7)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} id="scrolls-certifications" className="portfolio-section">
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">六</span>
        <h2 className="section-title">Scrolls & Certifications</h2>
        <p className="section-subtitle">Acquired Knowledge Scrolls</p>
      </div>

      <div className="certs-grid">
        {resumeData.certifications.map((cert, i) => (
          <div key={i} className="cert-scroll">
            <div className="cert-seal" aria-hidden="true">📜</div>
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <span className="cert-year">{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
