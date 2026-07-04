"use client";

import { useRef, useEffect, useState } from "react";
import { resumeData } from "@/lib/resumeData";

type ElementKey = keyof typeof resumeData.skills;

const ELEMENT_PARTICLES: Record<string, string> = {
  fire: "🔥",
  water: "💧",
  lightning: "⚡",
  earth: "🪨",
};

function ChakraMeter({ level, color, animate }: { level: number; color: string; animate: boolean }) {
  return (
    <div className="chakra-meter">
      <div className="chakra-meter-track">
        <div
          className="chakra-meter-fill"
          style={{
            width: animate ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}44, ${color})`,
            boxShadow: animate ? `0 0 12px ${color}88, 0 0 4px ${color}44` : "none",
            transition: "width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>
      <span className="chakra-meter-value" style={{ color }}>{level}%</span>
    </div>
  );
}

function SkillChip({
  name,
  level,
  color,
  element,
  animate,
}: {
  name: string;
  level: number;
  color: string;
  element: string;
  animate: boolean;
}) {
  const [showBurst, setShowBurst] = useState(false);

  return (
    <div
      className="skill-chip"
      onMouseEnter={() => setShowBurst(true)}
      onMouseLeave={() => setShowBurst(false)}
      style={{ "--element-color": color } as React.CSSProperties}
    >
      <div className="skill-chip-header">
        <span className="skill-chip-name">{name}</span>
        {showBurst && (
          <span className="skill-chip-burst" aria-hidden="true">
            {ELEMENT_PARTICLES[element]}
          </span>
        )}
      </div>
      <ChakraMeter level={level} color={color} animate={animate} />
    </div>
  );
}

export default function JutsuArsenal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initScrollAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = sectionRef.current?.querySelectorAll(".element-card");
      cards?.forEach((card) => {
        const id = card.getAttribute("data-element") ?? "";
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => setVisibleCards((prev) => new Set(prev).add(id)),
              onLeaveBack: () =>
                setVisibleCards((prev) => {
                  const next = new Set(prev);
                  next.delete(id);
                  return next;
                }),
            },
          }
        );
      });
    };
    initScrollAnimation();
  }, []);

  return (
    <section ref={sectionRef} id="jutsu-arsenal" className="portfolio-section relative">
      {/* Kurama Nine-Tails transparent render background */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none opacity-[0.05] select-none hidden lg:block"
        style={{
          maxWidth: "250px",
          zIndex: 0,
          transform: "translate(40px, 20px)",
          mixBlendMode: "screen",
          filter: "contrast(1.2) brightness(0.9) drop-shadow(0 0 12px var(--kurama, #FFB000))",
        }}
      >
        <img
          src="https://pngimg.com/uploads/naruto/naruto_PNG9.png"
          alt="Kurama Nine-Tails"
          style={{ width: "100%" }}
        />
      </div>
      <div className="section-header">
        <span className="section-kanji" aria-hidden="true">二</span>
        <h2 className="section-title">Jutsu Arsenal</h2>
        <p className="section-subtitle">Technical Skills Matrix</p>
      </div>

      <div className="skills-grid">
        {(Object.keys(resumeData.skills) as ElementKey[]).map((key) => {
          const group = resumeData.skills[key];
          return (
            <div
              key={key}
              className={`element-card element-card--${group.element}`}
              data-element={key}
              style={{ "--card-color": group.color } as React.CSSProperties}
            >
              <div className="element-card-header">
                <div className="element-icon" aria-hidden="true">
                  {ELEMENT_PARTICLES[group.element]}
                </div>
                <h3 className="element-card-title">{group.label}</h3>
              </div>
              <div className="element-card-skills">
                {group.items.map((skill) => (
                  <SkillChip
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={group.color}
                    element={group.element}
                    animate={visibleCards.has(key)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
