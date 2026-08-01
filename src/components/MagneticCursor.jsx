import React, { useEffect, useState, useRef } from 'react';

export default function MagneticCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredEl, setHoveredEl] = useState(null);

  const bracketsRef = useRef(null);
  const dotRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const bracketsPos = useRef({ x: -100, y: -100, w: 40, h: 40, rot: 0 });

  const rafId = useRef(null);
  const hoveredRef = useRef(null);

  const defaultSize = 40;

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor="pointer"]');
      if (target) {
        setHoveredEl(target);
        hoveredRef.current = target;
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor="pointer"]');
      if (target && target === hoveredRef.current) {
        setHoveredEl(null);
        hoveredRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    // 60FPS RAF Animation Loop
    let lastTime = performance.now();
    const animateCursor = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const target = hoveredRef.current;

      // 1. CENTER DOT: Always follows the exact mouse position smoothly everywhere!
      const dotEase = 0.35;
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * dotEase;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * dotEase;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px, 0)`;
      }

      // 2. OUTER BRACKETS: Snaps & expands around hovered card or tracks mouse
      let targetX, targetY, targetW, targetH;

      if (target) {
        const rect = target.getBoundingClientRect();
        const padding = 8;
        targetX = rect.left - padding / 2;
        targetY = rect.top - padding / 2;
        targetW = rect.width + padding;
        targetH = rect.height + padding;
        bracketsPos.current.rot = 0; // Static 0° when hovering over a card
      } else {
        targetX = mousePos.current.x - defaultSize / 2;
        targetY = mousePos.current.y - defaultSize / 2;
        targetW = defaultSize;
        targetH = defaultSize;
        bracketsPos.current.rot = (bracketsPos.current.rot + delta * 45) % 360; // 360° rotation when free
      }

      // Smooth lerp interpolation for brackets
      const bracketsEase = target ? 0.28 : 0.2;
      bracketsPos.current.x += (targetX - bracketsPos.current.x) * bracketsEase;
      bracketsPos.current.y += (targetY - bracketsPos.current.y) * bracketsEase;
      bracketsPos.current.w += (targetW - bracketsPos.current.w) * bracketsEase;
      bracketsPos.current.h += (targetH - bracketsPos.current.h) * bracketsEase;

      if (bracketsRef.current) {
        bracketsRef.current.style.transform = `translate3d(${bracketsPos.current.x}px, ${bracketsPos.current.y}px, 0) rotate(${bracketsPos.current.rot}deg)`;
        bracketsRef.current.style.width = `${bracketsPos.current.w}px`;
        bracketsRef.current.style.height = `${bracketsPos.current.h}px`;
      }

      rafId.current = requestAnimationFrame(animateCursor);
    };

    rafId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (isMobile) return null;

  const cornerSize = hoveredEl ? 14 : 10;

  return (
    <>
      {/* LAYER 1: OUTER RETICLE BRACKETS (Snaps to hovered box or rotates when free) */}
      <div
        ref={bracketsRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          width: `${defaultSize}px`,
          height: `${defaultSize}px`,
        }}
      >
        {/* Top Left Bracket */}
        <div 
          className="absolute top-0 left-0 border-t-[2.5px] border-l-[2.5px] border-[var(--fg)] transition-all duration-150"
          style={{ width: cornerSize, height: cornerSize }}
        />
        {/* Top Right Bracket */}
        <div 
          className="absolute top-0 right-0 border-t-[2.5px] border-r-[2.5px] border-[var(--fg)] transition-all duration-150"
          style={{ width: cornerSize, height: cornerSize }}
        />
        {/* Bottom Left Bracket */}
        <div 
          className="absolute bottom-0 left-0 border-b-[2.5px] border-l-[2.5px] border-[var(--fg)] transition-all duration-150"
          style={{ width: cornerSize, height: cornerSize }}
        />
        {/* Bottom Right Bracket */}
        <div 
          className="absolute bottom-0 right-0 border-b-[2.5px] border-r-[2.5px] border-[var(--fg)] transition-all duration-150"
          style={{ width: cornerSize, height: cornerSize }}
        />
      </div>

      {/* LAYER 2: CENTER RETICLE DOT — ALWAYS TRACKS MOUSE POSITION FREELY EVEN INSIDE HOVERED BOXES */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--fg)] rounded-full pointer-events-none z-[9999] will-change-transform shadow-sm"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
}
