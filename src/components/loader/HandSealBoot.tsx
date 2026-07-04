"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/lib/store";

const SEAL_SYMBOLS = ["卯", "辰", "巳", "午", "未"];

export default function HandSealBoot() {
  const [currentSeal, setCurrentSeal] = useState(0);
  const [phase, setPhase] = useState<"seals" | "gate" | "burst" | "done">("seals");
  const [progress, setProgress] = useState(0);
  const setLoaderComplete = usePortfolioStore((s) => s.setLoaderComplete);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if session already loaded
    if (sessionStorage.getItem("shinobi-loaded")) {
      setPhase("done");
      setLoaderComplete(true);
      return;
    }

    if (reducedMotion) {
      // Skip animations for reduced motion
      setTimeout(() => {
        setPhase("done");
        setLoaderComplete(true);
        sessionStorage.setItem("shinobi-loaded", "1");
      }, 300);
      return;
    }

    // Phase 1: Cycle through hand seals
    const sealInterval = setInterval(() => {
      setCurrentSeal((prev) => {
        if (prev >= SEAL_SYMBOLS.length - 1) {
          clearInterval(sealInterval);
          setTimeout(() => setPhase("gate"), 200);
          return prev;
        }
        return prev + 1;
      });
    }, 140);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 18);

    return () => {
      clearInterval(sealInterval);
      clearInterval(progressInterval);
    };
  }, [reducedMotion, setLoaderComplete]);

  // Phase transitions
  useEffect(() => {
    if (phase === "gate") {
      const t = setTimeout(() => setPhase("burst"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "burst") {
      const t = setTimeout(() => {
        setPhase("done");
        setLoaderComplete(true);
        sessionStorage.setItem("shinobi-loaded", "1");
      }, 400);
      return () => clearTimeout(t);
    }
  }, [phase, setLoaderComplete]);

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      className="loader-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--theme-bg, #0B0B0F)",
        transition: "opacity 0.4s ease",
        opacity: phase === "burst" ? 0 : 1,
      }}
    >
      {/* Background grid */}
      <div className="loader-grid" />

      {/* Official Naruto Shippuden Logo */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "180px",
          width: "40vw",
          opacity: 0.85,
          zIndex: 10,
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Logo_Naruto_Shipp%C5%ABden.svg"
          alt="Naruto Shippuden"
          style={{ width: "100%" }}
        />
      </div>

      {/* Concentric seal rings */}
      <div className="loader-rings">
        <div className="seal-ring seal-ring--outer" />
        <div className="seal-ring seal-ring--middle" />
        <div className="seal-ring seal-ring--inner" />
      </div>

      {/* Hand seal glyph */}
      <div className="loader-center">
        {phase === "seals" && (
          <div
            className="flex flex-col items-center justify-center animate-pulse"
            key={currentSeal}
          >
            <img
              src={`/svg/hand-seal-${currentSeal + 1}.svg`}
              alt={`Hand Seal ${currentSeal + 1}`}
              style={{
                width: "90px",
                height: "90px",
                filter: "drop-shadow(0 0 12px var(--sharingan-red, #D62828))",
                color: "var(--sharingan-red, #D62828)",
              }}
            />
            <div
              className="seal-glyph"
              style={{
                fontSize: "1.8rem",
                marginTop: "12px",
                color: "var(--sharingan-red, #D62828)",
              }}
            >
              {SEAL_SYMBOLS[currentSeal]}
            </div>
          </div>
        )}
        {phase === "gate" && (
          <div className="gate-reveal">
            <div className="gate-left" />
            <div className="gate-right" />
          </div>
        )}
      </div>

      {/* Console telemetry */}
      <div className="loader-telemetry loader-telemetry--left">
        <div className="telemetry-scroll">
          {[
            "INITIALIZING CHAKRA NETWORK...",
            "BINDING JUTSU MODULES...",
            "LOADING MISSION DATA...",
            "COMPILING SKILL MATRIX...",
            "CONNECTING NEURAL PATHWAYS...",
            "SYNCING ELEMENTAL CORES...",
            "DEPLOYING SHADOW CLONES...",
            "ACTIVATING VISUAL CORTEX...",
          ].map((line, i) => (
            <div
              key={i}
              className="telemetry-line"
              style={{
                opacity: progress > i * 12 ? 1 : 0.2,
                transition: "opacity 0.3s ease",
              }}
            >
              <span className="telemetry-prefix">[{String(i).padStart(2, "0")}]</span> {line}
            </div>
          ))}
        </div>
      </div>

      <div className="loader-telemetry loader-telemetry--right">
        <div className="telemetry-scroll">
          {[
            "STATUS: OPERATIONAL",
            "MEMORY: 94.2% ALLOCATED",
            "THREADS: 8/8 ACTIVE",
            "LATENCY: 0.3ms",
            "RENDERING ENGINE: READY",
            "PARTICLE SYSTEM: ARMED",
            "SCROLL TRIGGERS: MAPPED",
            "PORTFOLIO: ASSEMBLED",
          ].map((line, i) => (
            <div
              key={i}
              className="telemetry-line"
              style={{
                opacity: progress > i * 12 ? 1 : 0.2,
                transition: "opacity 0.3s ease",
              }}
            >
              <span className="telemetry-check">✓</span> {line}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="loader-progress">
        <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
        <span className="loader-progress-text">{progress}%</span>
      </div>
    </div>
  );
}
