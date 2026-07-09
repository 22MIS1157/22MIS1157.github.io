import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories = [
  { id: 'core', name: 'Core Languages', skills: ['Python', 'Java', 'JavaScript', 'C', 'SQL', 'HTML/CSS', 'PHP', 'Perl'] },
  { id: 'ai', name: 'AI & ML', skills: ['PyTorch', 'YOLOv8', 'OpenCV', 'scikit-learn', 'XGBoost'] },
  { id: 'web', name: 'Full-Stack', skills: ['FastAPI', 'React', 'Node.js', 'REST API'] },
  { id: 'data', name: 'Data', skills: ['SQL', 'Dashboards', 'Data Analysis'] },
  { id: 'eng', name: 'Engineering', skills: ['Data Structures', 'Git', 'Agile/Scrum'] },
  { id: 'test', name: 'Testing & IoT', skills: ['Selenium', 'Unit Testing', 'Arduino Nano'] },
];

export default function Skills() {
  const [activeCat, setActiveCat] = useState('core');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const currentSkills = skillCategories.find(c => c.id === activeCat)?.skills || [];

  return (
    <section className="relative w-full min-h-screen py-32 flex flex-col items-center justify-center bg-[var(--bg)]" id="skills">
      
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden flex justify-center z-0">
        <h2 className="text-[clamp(4.5rem,16vw,13rem)] font-black text-[var(--magic-title-color)] opacity-50 uppercase tracking-tighter leading-none select-none blur-[3px]">
          SKILLS
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Category Selector */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {skillCategories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`flex items-center gap-4 text-left font-outfit text-xl transition-all duration-300 ${activeCat === cat.id ? 'text-[var(--fg)] translate-x-4' : 'text-[var(--accent)] opacity-60 hover:opacity-100 hover:translate-x-2'}`}
            >
              <span className={`font-mono text-sm ${activeCat === cat.id ? 'opacity-100' : 'opacity-0'}`}>0{idx + 1} //</span>
              <span className="font-bold">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Right: Floating Skill Constellation */}
        <div className="lg:col-span-8 relative h-[500px] w-full bg-[var(--bg-card)] border-[1.5px] border-[var(--glass-border)] rounded-[40px] shadow-2xl p-10 flex flex-wrap content-center justify-center gap-6 overflow-hidden backdrop-blur-md">
          
          <AnimatePresence mode="popLayout">
            {currentSkills.map((skill, index) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0, rotate: Math.random() * 45 - 22.5 }}
                animate={{ 
                  opacity: hoveredSkill && hoveredSkill !== skill ? 0.3 : 1, 
                  scale: hoveredSkill === skill ? 1.2 : 1,
                  rotate: hoveredSkill === skill ? 0 : Math.random() * 10 - 5,
                  filter: hoveredSkill && hoveredSkill !== skill ? 'blur(4px)' : 'blur(0px)'
                }}
                exit={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20, 
                  mass: 1,
                  delay: index * 0.05 
                }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`px-8 py-4 rounded-full border-2 cursor-crosshair backdrop-blur-sm transition-colors duration-300 ${
                  hoveredSkill === skill 
                    ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)] shadow-[0_0_30px_var(--accent)] z-20' 
                    : 'bg-transparent border-[var(--glass-border)] text-[var(--fg)] z-10'
                }`}
              >
                <span className="font-bold text-lg">{skill}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Grid Background inside card */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at center, var(--accent) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />

        </div>
      </div>
    </section>
  );
}
