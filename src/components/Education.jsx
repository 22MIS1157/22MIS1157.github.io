import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

export default function Education() {
  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-[var(--bg)]" id="education">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden flex justify-center z-0">
        <h2 className="text-[clamp(4.5rem,16vw,13rem)] font-black text-[var(--magic-title-color)] opacity-50 uppercase tracking-tighter leading-none select-none blur-[3px]">
          EDUCATION
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-12 space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="glass-card flex gap-6 md:gap-8 flex-col md:flex-row relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <GraduationCap className="w-64 h-64 text-[var(--accent)]" />
          </div>
          
          <div className="flex-shrink-0 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
              <GraduationCap className="w-8 h-8" />
            </div>
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-sm text-[var(--accent)] font-bold mb-2 inline-block">2022 — 2027</span>
            <h3 className="text-2xl font-bold text-[var(--fg)] mb-2">Vellore Institute of Technology (VIT), Chennai</h3>
            <p className="text-xl text-[var(--text-muted)] mb-4">M.Tech Integrated -- Software Engineering</p>
            
            <div className="inline-block px-4 py-2 bg-[var(--bg)] border border-[var(--glass-border)] rounded-full text-sm font-bold text-[var(--fg)] mb-6 shadow-inner">
              CGPA: <span className="text-[var(--accent)]">7.92 / 10.0</span> | No Backlogs
            </div>
            
            <div className="space-y-4 text-[var(--text-muted)] text-sm leading-relaxed">
              <p>
                <strong className="text-[var(--fg)]">Key Coursework:</strong> Data Structures & Algorithms, Programming in Java, Object Oriented Programming, Object Oriented Analysis & Design, Design Patterns, Artificial Intelligence, Software Construction & Maintenance, Machine Learning, Web Technologies.
              </p>
              <p>
                <strong className="text-[var(--fg)]">Outstanding Grades (S):</strong> Industrial Internship, Technical Answers for Real World Problems, Lean Start-up Management.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card flex gap-6 md:gap-8 flex-col md:flex-row relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <BookOpen className="w-64 h-64 text-[var(--accent)]" />
          </div>

          <div className="flex-shrink-0 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
          
          <div className="relative z-10">
            <span className="font-mono text-sm text-[var(--accent)] font-bold mb-2 inline-block">2020 — 2021</span>
            <h3 className="text-2xl font-bold text-[var(--fg)] mb-2">Mazharul Uloom HSS, Ambur</h3>
            <p className="text-xl text-[var(--text-muted)] mb-4">Class XII -- PCBM</p>
            
            <div className="inline-block px-4 py-2 bg-[var(--bg)] border border-[var(--glass-border)] rounded-full text-sm font-bold text-[var(--fg)] shadow-inner">
              Score: <span className="text-[var(--accent)]">85.20%</span> | Tamil Nadu State Board
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
