"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/lib/store";

interface Feather {
  x: number;
  y: number;
  length: number;
  speedX: number;
  speedY: number;
  angle: number;
  spin: number;
  opacity: number;
}

export default function CrowFeathers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeMode = usePortfolioStore((s) => s.themeMode);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const lowFxMode = usePortfolioStore((s) => s.lowFxMode);

  useEffect(() => {
    if (themeMode !== "akatsuki" || reducedMotion || lowFxMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize feathers
    const feathers: Feather[] = [];
    const maxFeathers = 25;

    for (let i = 0; i < maxFeathers; i++) {
      feathers.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        length: Math.random() * 15 + 10,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: Math.random() * 0.8 + 0.4,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animationFrameId: number;

    const drawFeather = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      len: number,
      angle: number,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.globalAlpha = opacity;

      c.beginPath();
      // Draw center stem
      c.moveTo(0, -len / 2);
      c.lineTo(0, len / 2);
      c.strokeStyle = "rgba(10, 10, 15, 0.9)";
      c.lineWidth = 1;
      c.stroke();

      // Draw feather body (curves left/right)
      c.beginPath();
      c.moveTo(0, -len / 2);
      c.quadraticCurveTo(-len * 0.25, -len * 0.1, -len * 0.05, len / 2);
      c.quadraticCurveTo(len * 0.2, len * 0.1, 0, -len / 2);
      c.fillStyle = "rgba(7, 7, 10, 0.95)";
      c.fill();

      // Accent highlight stroke (Itachi crimson glow reflections)
      c.beginPath();
      c.moveTo(0, -len / 4);
      c.quadraticCurveTo(-len * 0.15, 0, 0, len / 4);
      c.strokeStyle = "rgba(214, 40, 40, 0.35)";
      c.lineWidth = 0.5;
      c.stroke();

      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < feathers.length; i++) {
        const f = feathers[i];
        
        // Update positions with swaying motion
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.y * 0.01) * 0.3;
        f.angle += f.spin;

        // Wrap around borders
        if (f.y > canvas.height + 20) {
          f.y = -30;
          f.x = Math.random() * canvas.width;
          f.angle = Math.random() * Math.PI * 2;
        }
        if (f.x > canvas.width + 20) {
          f.x = -20;
        } else if (f.x < -20) {
          f.x = canvas.width + 20;
        }

        drawFeather(ctx, f.x, f.y, f.length, f.angle, f.opacity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode, reducedMotion, lowFxMode]);

  if (themeMode !== "akatsuki" || reducedMotion || lowFxMode) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5, // right above standard backgrounds
      }}
    />
  );
}
