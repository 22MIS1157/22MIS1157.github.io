"use client";

import { usePortfolioStore } from "@/lib/store";

export default function SusanooBackground() {
  const themeMode = usePortfolioStore((s) => s.themeMode);
  const lowFxMode = usePortfolioStore((s) => s.lowFxMode);

  if (themeMode !== "akatsuki" || lowFxMode) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
        opacity: 0.04,
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    >
      {/* Left Ribcage */}
      <svg
        viewBox="0 0 100 200"
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "35%",
          height: "80%",
          color: "var(--susanoo-violet, #6D28D9)",
          filter: "drop-shadow(0 0 15px var(--susanoo-violet, #6D28D9))",
        }}
      >
        <path
          d="M0,20 Q40,40 50,80 T20,140 T0,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M0,45 Q30,60 40,95 T10,145"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M0,70 Q20,80 30,110 T0,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Flame auras */}
        <path
          d="M50,80 Q60,60 45,40 T30,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M20,140 Q35,120 25,100 T10,70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Right Ribcage */}
      <svg
        viewBox="0 0 100 200"
        style={{
          position: "absolute",
          top: "15%",
          right: "-5%",
          width: "35%",
          height: "80%",
          color: "var(--susanoo-violet, #6D28D9)",
          filter: "drop-shadow(0 0 15px var(--susanoo-violet, #6D28D9))",
          transform: "scaleX(-1)",
        }}
      >
        <path
          d="M0,20 Q40,40 50,80 T20,140 T0,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M0,45 Q30,60 40,95 T10,145"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M0,70 Q20,80 30,110 T0,150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Flame auras */}
        <path
          d="M50,80 Q60,60 45,40 T30,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
