import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const orbitLogosInner = [
  { name: 'Python', slug: 'python' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'PyTorch', slug: 'pytorch' },
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Git', slug: 'git' }
];

const orbitLogosOuter = [
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'OpenCV', slug: 'opencv' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'GitHub', slug: 'github' },
  { name: 'HTML5', slug: 'html5' },
  { name: 'CSS3', slug: 'css3' }
];

export default function FloatingIcons() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };
    
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      
      {/* Concentric Subtle Orbital Ring 1 (Inner, 580px diameter) */}
      <div className="absolute w-[580px] h-[580px] rounded-full border border-[var(--border-strong)] opacity-15 pointer-events-none" />
      
      {/* Concentric Subtle Orbital Ring 2 (Outer, 780px diameter) */}
      <div className="absolute w-[780px] h-[780px] rounded-full border border-[var(--border-strong)] opacity-15 pointer-events-none" />

      {/* Orbit 1 Rotating Container (Inner, 580px diameter, 290px radius) */}
      <motion.div
        className="absolute w-[580px] h-[580px] flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {orbitLogosInner.map((logo, i, arr) => {
          const angle = (i / arr.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 290;
          const y = Math.sin(rad) * 290;

          return (
            <div
              key={logo.name}
              className="absolute flex items-center justify-center"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                className="p-3 rounded-xl bg-[var(--bg-card)]/30 border border-[var(--border)]/20 shadow-xs backdrop-blur-xs"
              >
                <img 
                  src={`https://cdn.simpleicons.org/${logo.slug}/000000`} 
                  alt={logo.name}
                  className="w-8 h-8 opacity-40"
                  style={{ filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Orbit 2 Rotating Container (Outer, 780px diameter, 390px radius, reverse direction) */}
      <motion.div
        className="absolute w-[780px] h-[780px] flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      >
        {orbitLogosOuter.map((logo, i, arr) => {
          const angle = (i / arr.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 390;
          const y = Math.sin(rad) * 390;

          return (
            <div
              key={logo.name}
              className="absolute flex items-center justify-center"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 55, ease: "linear", repeat: Infinity }}
                className="p-3 rounded-xl bg-[var(--bg-card)]/30 border border-[var(--border)]/20 shadow-xs backdrop-blur-xs"
              >
                <img 
                  src={`https://cdn.simpleicons.org/${logo.slug}/000000`} 
                  alt={logo.name}
                  className="w-8 h-8 opacity-40"
                  style={{ filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>

    </div>
  );
}
