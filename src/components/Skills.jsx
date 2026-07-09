import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const skillCategories = [
  {
    name: 'AI & ML',
    color: '#FF6B6B',
    skills: [
      { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 85 },
      { name: 'YOLOv8', level: 88 },
      { name: 'scikit-learn', level: 92 },
      { name: 'OpenCV', level: 87 },
    ]
  },
  {
    name: 'Frontend',
    color: '#4ECDC4',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 85 },
      { name: 'Framer Motion', level: 90 },
      { name: 'Tailwind', level: 95 },
      { name: 'Three.js', level: 75 },
    ]
  },
  {
    name: 'Backend',
    color: '#45B7D1',
    skills: [
      { name: 'FastAPI', level: 90 },
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'REST API', level: 95 },
    ]
  },
  {
    name: 'Languages',
    color: '#96CEB4',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Java', level: 88 },
      { name: 'JavaScript', level: 92 },
      { name: 'C', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'C++', level: 78 },
    ]
  },
  {
    name: 'Cloud & DB',
    color: '#FFEAA7',
    skills: [
      { name: 'AWS Lambda', level: 82 },
      { name: 'DynamoDB', level: 80 },
      { name: 'S3', level: 85 },
      { name: 'MySQL', level: 88 },
      { name: 'MongoDB', level: 83 },
    ]
  },
  {
    name: 'DevOps',
    color: '#DDA0DD',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 78 },
      { name: 'Agile', level: 85 },
      { name: 'IoT / Arduino', level: 80 },
    ]
  },
];

function SkillCard({ skill, isActive, categoryColor, delay }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
      transition={{ duration: 0.4, delay: delay * 0.08, type: "spring", bounce: 0.4 }}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-default"
    >
      <div className="relative p-5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]">
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
          style={{ background: `radial-gradient(circle at center, ${categoryColor}, transparent 70%)` }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-[var(--fg)]">{skill.name}</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">{skill.level}%</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--glass-border)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isActive ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: delay * 0.08 + 0.3, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[var(--bg)]" id="skills">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        
        {/* Category Tabs - Horizontal scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {skillCategories.map((cat, idx) => (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCategory(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategory === idx
                  ? 'text-[var(--bg)] shadow-lg'
                  : 'text-[var(--fg)] border border-[var(--glass-border)] hover:border-[var(--accent)]'
              }`}
              style={{
                backgroundColor: activeCategory === idx ? cat.color : 'transparent',
              }}
            >
              {/* Active indicator ring */}
              {activeCategory === idx && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories[activeCategory].skills.map((skill, idx) => (
            <SkillCard
              key={`${activeCategory}-${skill.name}`}
              skill={skill}
              isActive={true}
              categoryColor={skillCategories[activeCategory].color}
              delay={idx}
            />
          ))}
        </div>

        {/* Category Stats */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center gap-12"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--fg)]">{skillCategories[activeCategory].skills.length}</div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black" style={{ color: skillCategories[activeCategory].color }}>
              {Math.round(skillCategories[activeCategory].skills.reduce((a, b) => a + b.level, 0) / skillCategories[activeCategory].skills.length)}%
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">Avg Proficiency</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
