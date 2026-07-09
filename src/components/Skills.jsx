import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    name: "AI & ML",
    icon: "🧠",
    skills: [
      { name: "PyTorch", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "YOLOv8", level: 92 },
      { name: "OpenCV", level: 88 },
      { name: "Scikit-Learn", level: 80 },
    ]
  },
  {
    name: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Framer Motion", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Three.js", level: 75 },
    ]
  },
  {
    name: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 90 },
      { name: "FastAPI", level: 82 },
      { name: "REST API", level: 95 },
    ]
  },
  {
    name: "Languages",
    icon: "💻",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "Java", level: 85 },
      { name: "C++", level: 78 },
      { name: "SQL", level: 88 },
    ]
  },
  {
    name: "Cloud & DB",
    icon: "☁️",
    skills: [
      { name: "AWS Lambda", level: 80 },
      { name: "DynamoDB", level: 78 },
      { name: "S3", level: 82 },
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 85 },
    ]
  },
  {
    name: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 78 },
      { name: "Arduino", level: 80 },
      { name: "Agile", level: 85 },
      { name: "IoT", level: 82 },
    ]
  },
];

/* ── Orbital System Component ─────────────────── */
function OrbitalSystem({ category }) {
  const numSkills = category.skills.length;
  const radiusX = 300;
  const radiusY = 120;

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center pointer-events-none">
      
      {/* Central Hub */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
        className="absolute z-20 flex flex-col items-center justify-center w-32 h-32 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_0_40px_var(--glass-border)]"
      >
        <span className="text-4xl mb-1">{category.icon}</span>
        <span className="font-bold text-[var(--fg)] text-sm">{category.name}</span>
      </motion.div>

      {/* Orbits */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-400 -250 800 500">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit Rings */}
        <motion.ellipse
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          cx="0" cy="0" rx={radiusX} ry={radiusY}
          fill="none" stroke="var(--fg)" strokeWidth="1" strokeDasharray="4 8"
        />
        <motion.ellipse
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          cx="0" cy="0" rx={radiusX * 0.7} ry={radiusY * 0.7}
          fill="none" stroke="var(--fg)" strokeWidth="1" strokeDasharray="4 8"
        />

        {/* Orbiting Skill Nodes */}
        {category.skills.map((skill, index) => {
          const angleOffset = (index / numSkills) * Math.PI * 2;
          // Alternate rings
          const rx = index % 2 === 0 ? radiusX : radiusX * 0.7;
          const ry = index % 2 === 0 ? radiusY : radiusY * 0.7;
          const duration = index % 2 === 0 ? 20 : 15;
          const direction = index % 2 === 0 ? 1 : -1;

          return (
            <motion.g
              key={skill.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              <motion.g
                animate={{
                  rotate: [0, 360 * direction]
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <g transform={`translate(${rx * Math.cos(angleOffset)}, ${ry * Math.sin(angleOffset)})`}>
                  {/* Counter-rotate to keep text upright */}
                  <motion.g
                    animate={{ rotate: [0, -360 * direction] }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <circle cx="0" cy="0" r="40" fill="url(#glow)" />
                    <circle cx="0" cy="0" r="4" fill="var(--accent)" />
                    <foreignObject x="-60" y="10" width="120" height="40" className="pointer-events-auto">
                      <div className="flex flex-col items-center justify-center">
                        <span className="px-3 py-1 bg-[var(--bg)] border border-[var(--accent)] text-[var(--fg)] text-xs font-bold rounded-full shadow-lg hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors cursor-pointer">
                          {skill.name}
                        </span>
                      </div>
                    </foreignObject>
                  </motion.g>
                </g>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden" id="skills">

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'var(--accent)',
              opacity: 0.1,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.05, 0.3, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">

        {/* Category tabs — HOVER driven */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              onMouseEnter={() => setActiveCategory(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 border ${
                activeCategory === i
                  ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] shadow-xl scale-105'
                  : 'bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[var(--accent)] hover:text-[var(--fg)]'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}

              {activeCategory === i && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute inset-0 rounded-xl border-2 border-[var(--accent)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Orbital System */}
        <div className="w-full h-[550px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <OrbitalSystem category={categories[activeCategory]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Average proficiency display */}
        <motion.div
          key={`avg-${activeCategory}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center z-20"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-lg">
            <span className="font-mono text-[var(--text-muted)] text-sm tracking-widest uppercase">
              Average Proficiency
            </span>
            <div className="h-4 w-[1px] bg-[var(--glass-border)]"></div>
            <span className="text-[var(--accent)] font-bold text-xl">
              {Math.round(categories[activeCategory].skills.reduce((a, s) => a + s.level, 0) / categories[activeCategory].skills.length)}%
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
