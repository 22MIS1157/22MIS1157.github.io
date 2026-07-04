"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/lib/store";

export default function ChakraSeal() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollProgress]);

  const circumference = 2 * Math.PI * 18;
  const dashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`chakra-seal ${scrollProgress >= 99 ? "chakra-seal--complete" : ""}`}
      aria-label={`Scroll progress: ${Math.round(scrollProgress)}%`}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg viewBox="0 0 44 44" className="chakra-seal-svg">
        {/* Background ring */}
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="var(--theme-border, #2A2A2E)"
          strokeWidth="2"
        />
        {/* Progress ring */}
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="url(#kurama-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
        />
        {/* Inner decorative seal */}
        <circle
          cx="22"
          cy="22"
          r="12"
          fill="none"
          stroke="var(--theme-muted, #6B6B7B)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <circle
          cx="22"
          cy="22"
          r="6"
          fill="none"
          stroke="var(--theme-muted, #6B6B7B)"
          strokeWidth="0.5"
          opacity="0.2"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="kurama-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--kurama, #FFB000)" />
            <stop offset="100%" stopColor="var(--katon, #FF4E00)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="chakra-seal-percent">
        {Math.round(scrollProgress)}
      </span>
    </div>
  );
}
