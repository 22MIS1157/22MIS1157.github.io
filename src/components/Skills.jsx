import { useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  { category: 'AI & Machine Learning', items: ['PyTorch', 'TensorFlow', 'YOLOv8', 'scikit-learn', 'OpenCV'], colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { category: 'Frontend', items: ['React', 'Next.js', 'Framer Motion', 'Tailwind', 'Three.js'], colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { category: 'Backend & APIs', items: ['FastAPI', 'Node.js', 'Express', 'REST API'], colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { category: 'Core Languages', items: ['Python', 'Java', 'JavaScript', 'C', 'SQL', 'C++'], colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
  { category: 'Cloud & Database', items: ['AWS Lambda', 'DynamoDB', 'S3', 'MySQL', 'MongoDB'], colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
  { category: 'Engineering Tools', items: ['Git', 'Docker', 'Agile', 'IoT / Arduino'], colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
];

export default function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center bg-[var(--bg)]" id="skills">
      <div className="w-full flex justify-center mb-16">
        <h2 className="magic-title text-center">SKILLS</h2>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          {skillsData.map((group, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOtherHovered = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative flex flex-col p-8 rounded-3xl border border-[var(--glass-border)] transition-all duration-500 overflow-hidden ${group.colSpan} ${group.rowSpan}`}
                style={{
                  background: isHovered ? 'var(--bg-card)' : 'transparent',
                  transform: isHovered ? 'scale(1.02)' : isOtherHovered ? 'scale(0.98)' : 'scale(1)',
                  opacity: isOtherHovered ? 0.3 : 1,
                  filter: isOtherHovered ? 'blur(4px)' : 'blur(0px)',
                  boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                  borderColor: isHovered ? 'var(--accent)' : 'var(--glass-border)',
                  zIndex: isHovered ? 20 : 10
                }}
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-10' : ''}`} />

                <h3 className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-6 uppercase">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {group.items.map((skill, sIdx) => (
                    <motion.div
                      key={skill}
                      initial={false}
                      animate={{ 
                        y: isHovered ? [10, 0] : 0, 
                        opacity: isHovered ? [0, 1] : 1 
                      }}
                      transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors duration-300 ${isHovered ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]' : 'bg-[var(--glass-bg)] text-[var(--fg)] border-[var(--glass-border)]'}`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
