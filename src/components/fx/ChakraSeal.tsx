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

  const circumference = 2 * Math.PI * 42;
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
      <svg viewBox="0 0 100 100" className="chakra-seal-svg">
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--theme-border, #2A2A2E)"
          strokeWidth="3"
        />
        {/* Progress ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#kurama-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
        />
        
        {/* Official Eight Trigrams Sealing Formula Detail (glowing inside) */}
        <g stroke="var(--theme-muted, #6B6B7B)" strokeWidth="0.8" fill="none" opacity="0.45" style={{ transformOrigin: "center" }}>
          {/* Inner ring */}
          <circle cx="50" cy="50" r="32" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="18" />
          
          {/* 8 radiating lines */}
          <line x1="50" y1="8" x2="50" y2="18" strokeWidth="1.2" />
          <line x1="50" y1="82" x2="50" y2="92" strokeWidth="1.2" />
          <line x1="8" y1="50" x2="18" y2="50" strokeWidth="1.2" />
          <line x1="82" y1="50" x2="92" y2="50" strokeWidth="1.2" />
          
          {/* Diagonal lines */}
          <line x1="20.3" y1="20.3" x2="27" y2="27" />
          <line x1="79.7" y1="20.3" x2="73" y2="27" />
          <line x1="20.3" y1="79.7" x2="27" y2="73" />
          <line x1="79.7" y1="79.7" x2="73" y2="73" />
          
          {/* Triangles between rings */}
          <polygon points="50,22 44,32 56,32" strokeWidth="0.8" />
          <polygon points="78,50 68,44 68,56" strokeWidth="0.8" />
          <polygon points="50,78 56,68 44,68" strokeWidth="0.8" />
          <polygon points="22,50 32,56 32,44" strokeWidth="0.8" />
          
          {/* Center design */}
          <circle cx="50" cy="50" r="6" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="2" fill="var(--theme-muted, #6B6B7B)" />
          
          {/* Outer tick marks */}
          <g stroke="var(--theme-muted, #6B6B7B)" strokeWidth="0.6" opacity="0.3">
            <line x1="50" y1="2" x2="50" y2="6" />
            <line x1="73.7" y1="7.6" x2="72" y2="11" />
            <line x1="92.4" y1="26.3" x2="89" y2="28" />
            <line x1="98" y1="50" x2="94" y2="50" />
            <line x1="92.4" y1="73.7" x2="89" y2="72" />
            <line x1="73.7" y1="92.4" x2="72" y2="89" />
            <line x1="50" y1="98" x2="50" y2="94" />
            <line x1="26.3" y1="92.4" x2="28" y2="89" />
            <line x1="7.6" y1="73.7" x2="11" y2="72" />
            <line x1="2" y1="50" x2="6" y2="50" />
            <line x1="7.6" y1="26.3" x2="11" y2="28" />
            <line x1="26.3" y1="7.6" x2="28" y2="11" />
          </g>
        </g>
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
