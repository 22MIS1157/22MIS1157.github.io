"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { resumeData } from "@/lib/resumeData";
import { usePortfolioStore } from "@/lib/store";

const RasenganOrb3D = dynamic(() => import("./RasenganOrb3D"), { ssr: false });

export default function PrologueHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const loaderComplete = usePortfolioStore((s) => s.loaderComplete);
  const themeMode = usePortfolioStore((s) => s.themeMode);

  useEffect(() => {
    if (!loaderComplete || typeof window === "undefined") return;
    // GSAP animations will be initialized here after GSAP loads
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        el.querySelector(".hero-name"),
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 }
      )
        .fromTo(
          el.querySelector(".hero-tagline"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          el.querySelector(".hero-title"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          el.querySelectorAll(".hero-cta"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          el.querySelector(".hero-scroll-indicator"),
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    };
    initGSAP();
  }, [loaderComplete]);

  return (
    <section
      ref={sectionRef}
      id="prologue"
      className="hero-section"
    >
      {/* Decorative background elements */}
      <div className="hero-bg-particles" />
      <div className="hero-bg-grid" />
      <RasenganOrb3D />

      {/* Kanji section numeral */}
      <div className="section-kanji" aria-hidden="true">
        序
      </div>

      <div className="hero-content">
        <h1 className="hero-name" style={{ opacity: 0 }}>
          <span className="hero-name-line">{resumeData.personal.name.split(" ").slice(0, 2).join(" ")}</span>
          <span className="hero-name-line hero-name-line--surname">{resumeData.personal.name.split(" ").slice(2).join(" ")}</span>
        </h1>

        <p className="hero-tagline" style={{ opacity: 0 }}>
          {resumeData.personal.tagline}
        </p>

        <p className="hero-title" style={{ opacity: 0 }}>
          {resumeData.personal.realTitle}
        </p>

        <div className="hero-cta-group">
          <a
            href="#summon-hawk"
            className="hero-cta hero-cta--primary"
            style={{ opacity: 0 }}
          >
            <span className="cta-orb" aria-hidden="true" />
            Contact Me
          </a>
          <a
            href="#mission-log"
            className="hero-cta hero-cta--secondary"
            style={{ opacity: 0 }}
          >
            View Missions
          </a>
        </div>

        <div className="hero-scroll-indicator" style={{ opacity: 0 }}>
          <div className="scroll-chevron" />
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Decorative seal in background */}
      <div className="hero-seal" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="hero-seal-svg">
          {/* Inner rings */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.08" />
          <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          
          {/* 8 radiating lines */}
          <line x1="50" y1="8" x2="50" y2="18" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
          <line x1="50" y1="82" x2="50" y2="92" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
          <line x1="8" y1="50" x2="18" y2="50" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
          <line x1="82" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="0.4" opacity="0.1" />
          
          {/* Diagonal lines */}
          <line x1="20.3" y1="20.3" x2="27" y2="27" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <line x1="79.7" y1="20.3" x2="73" y2="27" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <line x1="20.3" y1="79.7" x2="27" y2="73" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          <line x1="79.7" y1="79.7" x2="73" y2="73" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          
          {/* Triangles between rings */}
          <polygon points="50,22 44,32 56,32" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          <polygon points="78,50 68,44 68,56" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          <polygon points="50,78 56,68 44,68" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          <polygon points="22,50 32,56 32,44" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          
          {/* Center design */}
          <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.08" />
          <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.08" />
        </svg>
      </div>
    </section>
  );
}
