"use client";

import { useEffect, ReactNode } from "react";
import { usePortfolioStore } from "@/lib/store";
import Lenis from "lenis";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeMode = usePortfolioStore((s) => s.themeMode);
  const setReducedMotion = usePortfolioStore((s) => s.setReducedMotion);
  const sageModeActive = usePortfolioStore((s) => s.sageModeActive);
  const setSageModeActive = usePortfolioStore((s) => s.setSageModeActive);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Sync theme to document
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setReducedMotion]);

  // Konami Code Detection
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const targetKey = konamiCode[index].toLowerCase();

      if (key === targetKey) {
        index++;
        if (index === konamiCode.length) {
          // Trigger Sage Mode
          setSageModeActive(true);
          document.body.classList.add("sage-mode");
          index = 0;

          // Deactivate after 5 seconds
          setTimeout(() => {
            setSageModeActive(false);
            document.body.classList.remove("sage-mode");
          }, 5000);
        }
      } else {
        index = 0; // Reset on incorrect key
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSageModeActive]);

  return (
    <>
      {children}
      {sageModeActive && <div className="sage-mode-overlay" aria-hidden="true" />}
    </>
  );
}
