import { motion } from 'framer-motion';
import { Award, Code, Users } from 'lucide-react';

export default function Activities() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center bg-[var(--bg)]" id="activities">
      <div className="w-full flex justify-center mb-16">
        <h2 className="magic-title text-center">ACTIVITIES</h2>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-8 border-b border-[var(--glass-border)] pb-4">
            <Award className="w-8 h-8 text-[var(--accent)]" />
            <h3 className="text-3xl font-bold text-[var(--fg)]">Activities & Leadership</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* GDG Card */}
            <div className="group relative p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg)] hover:bg-[var(--accent)] transition-colors duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500">
                <Code className="w-24 h-24 text-[var(--fg)] group-hover:text-[var(--bg)]" />
              </div>
              <div className="relative z-10">
                <span className="font-mono text-sm text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors">Oct 2023 – Oct 2024</span>
                <h4 className="text-xl font-bold text-[var(--fg)] group-hover:text-[var(--bg)] mt-2 mb-3 transition-colors">Co-Lead & Web Lead</h4>
                <p className="text-lg font-semibold text-[var(--fg)] group-hover:text-[var(--bg)] transition-colors">Google Developer Groups (GDG) on Campus – VIT Chennai</p>
                <ul className="mt-4 space-y-2 text-[var(--text-muted)] group-hover:text-[var(--bg)] transition-colors text-sm">
                  <li>• Led a community of 500+ student developers.</li>
                  <li>• Organized hackathons, tech talks, and study jams.</li>
                  <li>• Oversaw the design and development of event platforms.</li>
                </ul>
              </div>
            </div>

            {/* Additional Activity (Placeholder / Example) */}
            <div className="group relative p-6 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg)] hover:bg-[var(--accent)] transition-colors duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500">
                <Users className="w-24 h-24 text-[var(--fg)] group-hover:text-[var(--bg)]" />
              </div>
              <div className="relative z-10">
                <span className="font-mono text-sm text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors">2022 – Present</span>
                <h4 className="text-xl font-bold text-[var(--fg)] group-hover:text-[var(--bg)] mt-2 mb-3 transition-colors">Tech Team Member</h4>
                <p className="text-lg font-semibold text-[var(--fg)] group-hover:text-[var(--bg)] transition-colors">Various Tech Clubs & Open Source</p>
                <ul className="mt-4 space-y-2 text-[var(--text-muted)] group-hover:text-[var(--bg)] transition-colors text-sm">
                  <li>• Actively contributing to open-source UI libraries.</li>
                  <li>• Mentoring juniors in web development paradigms.</li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
