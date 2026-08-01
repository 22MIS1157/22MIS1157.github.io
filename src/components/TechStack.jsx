import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// SVG Icon Helper for custom skills to guarantee 100% crisp, flawless rendering with 0 CDN dependencies
const SkillIcon = ({ iconType }) => {
  switch (iconType) {
    case 'mimic':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          <circle cx="19" cy="5" r="2" fill="currentColor"/>
        </svg>
      );
    case 'antigravity':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
          <path d="M12 7l-5 8h10l-5-8z" fill="currentColor" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'deeplearning':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="6" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="19" cy="18" r="2" />
          <line x1="7" y1="6" x2="10" y2="11" />
          <line x1="7" y1="18" x2="10" y2="13" />
          <line x1="14" y1="11" x2="17" y2="6" />
          <line x1="14" y1="13" x2="17" y2="18" />
        </svg>
      );
    case 'huggingface':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-6.5 6a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>
      );
    case 'kaggle':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.825 23.859h-5.558l-5.719-7.98-2.43 2.278v5.702H0V.141h5.118v12.78l7.558-7.78h6.292l-8.026 8.016 7.883 10.702z"/>
        </svg>
      );
    case 'css':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625h11.238l.231-2.625H5.438l.696 7.875h9.394l-.391 4.375-3.167.859-3.168-.859-.203-2.25H6.012l.391 4.375 5.567 1.547 5.568-1.547.777-8.75H8.531z"/>
        </svg>
      );
    case 'powerbi':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="7" width="4" height="14" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      );
    case 'tableau':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2h2v4h-2zM11 18h2v4h-2zM2 11h4v2H2zM18 11h4v2h-4zM6 6h3v2H6zM15 6h3v2h-3zM6 16h3v2H6zM15 16h3v2H6zM10 8h4v8h-4z"/>
        </svg>
      );
    case 'vscode':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.12a.999.999 0 0 0-1.276.06L.367 7.252a1.002 1.002 0 0 0-.057 1.425l3.86 4.195-3.86 4.195a1.002 1.002 0 0 0 .057 1.425l1.282 1.182a.999.999 0 0 0 1.276.06l4.12-3.12 9.46 8.63a1.494 1.494 0 0 0 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 21.848V3.916a1.5 1.5 0 0 0-.85-1.329zM18 17.59l-6.84-5.59L18 6.41v11.18z"/>
        </svg>
      );
    case 'rag':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
          <path d="M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12"/>
        </svg>
      );
    case 'xgboost':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      );
    case 'yolo':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      );
  }
};

// Symmetrical 7x4 Grid Matrix Categorized in Logical Domain Rows (28 skills total)
const techRows = [
  // ROW 1: Core Programming Languages & Web Standards (7 items)
  [
    { name: 'Python', slug: 'python' },
    { name: 'C', slug: 'c' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'SQL', slug: 'postgresql' },
    { name: 'HTML5', slug: 'html5' },
    { name: 'CSS', iconType: 'css' }
  ],
  // ROW 2: AI, LLMs, Deep Learning & Agentic Frameworks (7 items)
  [
    { name: 'PyTorch', slug: 'pytorch' },
    { name: 'Deep Learning', iconType: 'deeplearning' },
    { name: 'Arduino IDE', slug: 'arduino' }, // Replaced Claude Code with Arduino IDE!
    { name: 'Google Antigravity', iconType: 'antigravity' },
    { name: 'Meta LLaMA 3', slug: 'meta' },
    { name: 'Hugging Face', iconType: 'huggingface' },
    { name: 'RAG Architecture', iconType: 'rag' }
  ],
  // ROW 3: Data Science, Computer Vision & Clinical Datasets (7 items)
  [
    { name: 'MIMIC-IV Clinical DB', iconType: 'mimic' },
    { name: 'Scikit-learn', slug: 'scikitlearn' },
    { name: 'Pandas', slug: 'pandas' },
    { name: 'NumPy', slug: 'numpy' },
    { name: 'OpenCV', slug: 'opencv' },
    { name: 'YOLOv8', iconType: 'yolo' },
    { name: 'XGBoost', iconType: 'xgboost' }
  ],
  // ROW 4: Data Analytics, DevOps, Game Engines & Tools (7 items)
  [
    { name: 'Power BI', iconType: 'powerbi' },
    { name: 'Tableau', iconType: 'tableau' },
    { name: 'Kaggle', iconType: 'kaggle' },
    { name: 'Unity', slug: 'unity' },
    { name: 'FastAPI', slug: 'fastapi' },
    { name: 'Docker', slug: 'docker' },
    { name: 'VS Code', iconType: 'vscode' }
  ]
];

export default function TechStack() {
  const [theme, setTheme] = useState('light');
  const [hoveredKey, setHoveredKey] = useState(null);
  const [offsets, setOffsets] = useState({});
  const itemRefs = useRef({});

  useEffect(() => {
    const getTheme = () => document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(getTheme());

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(getTheme());
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (targetKey) => {
    setHoveredKey(targetKey);
    const targetEl = itemRefs.current[targetKey];
    if (!targetEl) return;

    const targetRect = targetEl.getBoundingClientRect();
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const newOffsets = {};
    const radius = 240; // 2D Proximity radius across rows

    Object.keys(itemRefs.current).forEach((key) => {
      const el = itemRefs.current[key];
      if (!el || key === targetKey) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - targetCenterX;
      const dy = centerY - targetCenterY;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < radius) {
        const pullStrength = (1 - dist / radius) * 16;
        newOffsets[key] = {
          x: -(dx / dist) * pullStrength,
          y: -(dy / dist) * pullStrength,
          scale: 1.06
        };
      }
    });

    setOffsets(newOffsets);
  };

  const handleMouseLeave = () => {
    setHoveredKey(null);
    setOffsets({});
  };

  return (
    <section id="tech" className="section-spacer w-full overflow-hidden relative bg-[var(--bg)]" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="container-custom max-w-5xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[var(--fg)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--fg)] uppercase">MY TECH STACK</span>
            </div>
            <h2 className="section-heading whitespace-pre-line m-0">
              {"WHAT I\nUSE"}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-inter text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Balanced technical skills spanning Programming Languages, AI/ML, Arduino Microcontrollers, Clinical Datasets, Analytics, DevOps, and Tooling.
            </p>
          </div>
        </div>

        {/* 7x4 Tech Matrix with Generous Left & Right Spacing */}
        <div className="flex flex-col items-center gap-6 md:gap-8 w-full px-4 md:px-12">
          {techRows.map((rowItems, rIdx) => (
            <div key={rIdx} className="flex flex-wrap items-center justify-between gap-4 md:gap-8 w-full max-w-4xl mx-auto">
              {rowItems.map((tech) => {
                const itemKey = `${rIdx}-${tech.name}`;
                const isHovered = hoveredKey === itemKey;
                const itemOffset = offsets[itemKey] || { x: 0, y: 0, scale: 1 };

                return (
                  <motion.div
                    key={tech.name}
                    ref={(el) => (itemRefs.current[itemKey] = el)}
                    data-cursor="pointer"
                    className="relative flex items-center justify-center p-3.5 md:p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--fg)] transition-colors cursor-pointer group select-none"
                    onMouseEnter={() => handleMouseEnter(itemKey)}
                    onMouseLeave={handleMouseLeave}
                    animate={{
                      scale: isHovered ? 1.25 : itemOffset.scale,
                      x: isHovered ? 0 : itemOffset.x,
                      y: isHovered ? 0 : itemOffset.y
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 25
                    }}
                  >
                    {/* Render SimpleIcon or Custom SVG Symbol */}
                    {tech.slug ? (
                      <img 
                        src={`https://cdn.simpleicons.org/${tech.slug}`}
                        alt={`${tech.name} logo`}
                        className="w-7 h-7 md:w-8 md:h-8 transition-all duration-300"
                        style={{
                          filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)'
                        }}
                        draggable={false}
                      />
                    ) : (
                      <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-[var(--fg)]">
                        <SkillIcon iconType={tech.iconType} />
                      </div>
                    )}
                    
                    {/* Tooltip */}
                    {isHovered && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--fg)] text-[var(--bg)] text-xs font-semibold rounded shadow-md pointer-events-none whitespace-nowrap z-50 font-inter"
                      >
                        {tech.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[var(--fg)]"></div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
