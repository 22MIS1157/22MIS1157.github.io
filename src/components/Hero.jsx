import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingIcons from './FloatingIcons';

const titles = [
  'ENGINEER',
  'DEVELOPER',
  'BUILDER',
  'CREATOR',
  'INNOVATOR'
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden pt-12">
      
      {/* 360° Rotating Circular Orbit of Programming Language SVG Logos */}
      <FloatingIcons />

      {/* Hero Content */}
      <div className="container-custom relative z-10 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Subtitle / Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-lg md:text-2xl text-[var(--text-secondary)] font-light tracking-wide mb-6"
        >
          Hello! I'm Afnaan Ahmed. A Creative Full-Stack
        </motion.p>

        {/* DYNAMIC ROTATING TITLE (ENGINEER -> DEVELOPER -> BUILDER -> CREATOR -> INNOVATOR) */}
        <div className="h-[14vw] md:h-[9.5rem] flex items-center justify-center w-full mb-6 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.h1
              key={titles[index]}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-grotesk font-black text-[13vw] md:text-[9.5rem] leading-[0.85] tracking-tighter uppercase text-[var(--fg)] select-none text-center absolute"
              style={{ fontWeight: 900 }}
            >
              {titles[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Paragraph Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-inter text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8 text-center"
        >
          I'm a full-stack developer focused on building modern, scalable, and performant web applications. I enjoy working across the stack from clean, intuitive interfaces to robust backend systems with an emphasis on performance, reliability, and real-world impact.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-5 w-full"
        >
          <a
            href="mailto:afnaanahmed.k391@gmail.com"
            className="btn-primary min-w-[150px] justify-center px-6 py-3"
            data-cursor="pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 7l-10 7L2 7"/>
            </svg>
            Let's Talk
          </a>
          <a
            href="#"
            className="btn-outline min-w-[150px] justify-center px-6 py-3"
            data-cursor="pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
        </motion.div>

      </div>

    </section>
  );
}
