"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/lib/store";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function ChakraCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [hoverColor, setHoverColor] = useState("var(--rasengan, #3AA0FF)");

  const themeMode = usePortfolioStore((s) => s.themeMode);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const lowFxMode = usePortfolioStore((s) => s.lowFxMode);

  useEffect(() => {
    // Detect touch device or reduced motion / low FX mode
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || reducedMotion || lowFxMode) {
      setIsHidden(true);
      return;
    }

    setIsHidden(false);

    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const particles: Particle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);

      // Create new chakra wisp particles
      const particleColor = isHovering 
        ? hoverColor 
        : (themeMode === "konoha" ? "rgba(46, 83, 57, 0.6)" : "rgba(127, 219, 255, 0.6)");
      
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5, // slightly drifting upwards
          alpha: 1,
          size: Math.random() * 4 + 2,
          color: particleColor,
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track hovered elements to trigger Rinnegan morph and color change
    const updateHoverState = () => {
      const hoverTargets = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .element-card, .mission-scroll-card, .rank-card, .academy-card, .cert-scroll, .village-card"
      );

      const onEnter = (e: Event) => {
        setIsHovering(true);
        const target = e.currentTarget as HTMLElement;
        if (target.classList.contains("hero-cta--primary") || target.classList.contains("form-submit")) {
          setHoverColor("var(--katon, #FF4E00)"); // Red-orange for primary CTAs
        } else if (target.classList.contains("element-card")) {
          const cardColor = target.style.getPropertyValue("--card-color");
          setHoverColor(cardColor || "var(--theme-accent)");
        } else if (target.classList.contains("mission-scroll-card")) {
          const missionColor = target.style.getPropertyValue("--mission-color");
          setHoverColor(missionColor || "var(--theme-accent)");
        } else {
          setHoverColor("var(--theme-accent)");
        }
      };

      const onLeave = () => {
        setIsHovering(false);
      };

      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", onEnter);
        target.addEventListener("mouseleave", onLeave);
      });

      return () => {
        hoverTargets.forEach((target) => {
          target.removeEventListener("mouseenter", onEnter);
          target.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    const cleanupHovers = updateHoverState();

    // Re-bind hover states if DOM changes
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation Loop
    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth custom cursor follow (Lerp)
      const ease = 0.15;
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

      // Render particles (Chakra Trail)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02; // Fading
        p.size *= 0.98;  // Shrinking

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        // Subtle glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cleanupHovers();
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode, reducedMotion, lowFxMode, isHovering, hoverColor]);

  if (isHidden || reducedMotion || lowFxMode) return null;

  return (
    <>
      {/* Canvas for Chakra wisp trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Floating custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "36px" : "24px",
          height: isHovering ? "36px" : "24px",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      >
        {isHovering ? (
          /* Rinnegan (concentric rings) on hover */
          <svg
            viewBox="0 0 100 100"
            style={{
              width: "100%",
              height: "100%",
              filter: `drop-shadow(0 0 8px ${hoverColor})`,
            }}
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke={hoverColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={hoverColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke={hoverColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke={hoverColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="5" fill={hoverColor} />
          </svg>
        ) : (
          /* Sharingan (3-tomoe) standard cursor */
          <svg
            viewBox="0 0 100 100"
            style={{
              width: "100%",
              height: "100%",
              animation: "sharinganRotate 12s linear infinite",
              filter: "drop-shadow(0 0 6px var(--sharingan-red))",
            }}
          >
            {/* Outer Ring */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--sharingan-red)" strokeWidth="3" />
            {/* Iris Inner track */}
            <circle cx="50" cy="50" r="26" fill="none" stroke="var(--sharingan-red)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Central Pupil */}
            <circle cx="50" cy="50" r="8" fill="var(--sharingan-red)" />
            
            {/* 3 Tomoe arranged at 120 degree angles */}
            <g transform="translate(50, 24)">
              <path d="M0,0 Q3,4 0,9 Q-2,4 0,0Z" fill="var(--sharingan-red)" />
              <circle cx="-1" cy="4" r="2" fill="var(--sharingan-red)" />
            </g>
            <g transform="translate(73, 63) rotate(120 0 0)">
              <path d="M0,0 Q3,4 0,9 Q-2,4 0,0Z" fill="var(--sharingan-red)" />
              <circle cx="-1" cy="4" r="2" fill="var(--sharingan-red)" />
            </g>
            <g transform="translate(27, 63) rotate(240 0 0)">
              <path d="M0,0 Q3,4 0,9 Q-2,4 0,0Z" fill="var(--sharingan-red)" />
              <circle cx="-1" cy="4" r="2" fill="var(--sharingan-red)" />
            </g>
          </svg>
        )}
      </div>

      <style jsx global>{`
        /* Hide standard cursor when custom cursor is active */
        body:not(.touch-device) {
          cursor: none !important;
        }
        body:not(.touch-device) a,
        body:not(.touch-device) button,
        body:not(.touch-device) input,
        body:not(.touch-device) textarea,
        body:not(.touch-device) [role='button'] {
          cursor: none !important;
        }

        @keyframes sharinganRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
