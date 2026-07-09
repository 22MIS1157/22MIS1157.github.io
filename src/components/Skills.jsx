import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

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

/* ── 3D-tilt skill card (hover-driven) ─────────────────── */
function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 20 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md cursor-pointer hover:border-[var(--accent)] transition-colors duration-300"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 70%)', opacity: 0.08 }}
      />

      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-lg font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-300">{skill.name}</span>
        <span className="font-mono text-sm text-[var(--accent)] font-bold">{skill.level}%</span>
      </div>

      {/* Animated progress bar */}
      <div className="w-full h-2 rounded-full bg-[var(--glass-border)] overflow-hidden relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--accent), var(--fg))' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { theme } = useTheme();

  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden" id="skills">

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'var(--accent)',
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">

        {/* Category tabs — HOVER driven, not click */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
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

        {/* Skill cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {categories[activeCategory].skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Average proficiency display */}
        <motion.div
          key={`avg-${activeCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-[var(--text-muted)] text-sm tracking-widest uppercase">
            Average Proficiency: <span className="text-[var(--accent)] font-bold text-lg">
              {Math.round(categories[activeCategory].skills.reduce((a, s) => a + s.level, 0) / categories[activeCategory].skills.length)}%
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
