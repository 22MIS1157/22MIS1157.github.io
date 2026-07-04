"use client";

import { useState, useRef } from "react";

interface SmokePuff {
  id: number;
  x: number;
  y: number;
}

export default function ShurikenTarget() {
  const [hits, setHits] = useState(0);
  const [isThrowing, setIsThrowing] = useState(false);
  const [smokePuffs, setSmokePuffs] = useState<SmokePuff[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleTargetClick = (e: React.MouseEvent) => {
    if (isThrowing) return;
    setIsThrowing(true);

    // Get click location relative to target center
    const rect = targetRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Trigger shuriken throw animation
    setTimeout(() => {
      // Shuriken hits target
      setHits((prev) => prev + 1);
      setIsThrowing(false);

      // Spawn smoke puff particles
      const newPuff = {
        id: Date.now(),
        x: rect.width / 2 + (Math.random() - 0.5) * 20,
        y: rect.height / 2 + (Math.random() - 0.5) * 20,
      };
      setSmokePuffs((prev) => [...prev, newPuff]);

      // Cleanup smoke puff after animation
      setTimeout(() => {
        setSmokePuffs((prev) => prev.filter((p) => p.id !== newPuff.id));
      }, 600);
    }, 450); // duration matches the throw animation
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 select-none">
      <p className="text-[10px] uppercase tracking-widest text-theme-muted mb-2">
        Target Training Range
      </p>

      <div className="relative flex items-center justify-center">
        {/* The Target */}
        <div
          ref={targetRef}
          onClick={handleTargetClick}
          className="relative cursor-crosshair w-12 h-12 rounded-full border-2 border-theme-border flex items-center justify-center hover:border-theme-accent transition-colors"
          style={{
            background: "radial-gradient(circle, var(--theme-accent) 0%, var(--theme-accent) 20%, transparent 20%, transparent 50%, var(--theme-accent) 50%, var(--theme-accent) 70%, transparent 70%)",
            boxShadow: "0 0 12px rgba(0,0,0,0.3)",
          }}
          title="Click to throw a Kunai!"
        >
          {/* Slashed center bullseye */}
          <div className="w-2 h-2 rounded-full bg-theme-text" />
          
          {/* Sticking Kunai after hits */}
          {hits > 0 && (
            <img
              src="/svg/kunai.svg"
              alt=""
              className="absolute pointer-events-none"
              style={{
                width: "24px",
                height: "24px",
                transform: `rotate(${45 + hits * 15}deg) translate(-2px, -2px)`,
                opacity: 0.85,
                filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))",
              }}
            />
          )}

          {/* Smoke puffs */}
          {smokePuffs.map((puff) => (
            <div
              key={puff.id}
              className="smoke-particle"
              style={{
                position: "absolute",
                top: puff.y,
                left: puff.x,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        {/* Flying Kunai in flight */}
        {isThrowing && (
          <div
            className="absolute pointer-events-none flying-kunai"
            style={{
              width: "28px",
              height: "28px",
              backgroundImage: "url('/svg/kunai.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              zIndex: 100,
            }}
          />
        )}
      </div>

      <span className="text-[10px] text-theme-muted mt-2 font-mono">
        Hits: {hits}
      </span>

      <style jsx>{`
        .flying-kunai {
          animation: throwKunai 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes throwKunai {
          0% {
            transform: scale(1.5) rotate(0deg) translate(-100px, 100px);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: scale(0.8) rotate(720deg) translate(0px, 0px);
            opacity: 0.9;
          }
        }

        :global(.smoke-particle) {
          width: 8px;
          height: 8px;
          background: rgba(200, 200, 205, 0.7);
          border-radius: 50%;
          box-shadow: 0 0 10px 10px rgba(200, 200, 205, 0.5);
          animation: puffUp 0.6s ease-out forwards;
        }

        @keyframes puffUp {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
