import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Activities from './components/Activities';
import Education from './components/Education';
import Loader from './components/Loader';
import Contact from './components/Contact';
import SectionHeader from './components/SectionHeader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <ThemeProvider>
      <div className="relative w-full min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg)]">
        
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" onLoadingComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <ThemeSwitcher />
        
        <AnimatePresence>
          {!loading && (
            <motion.main 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col pb-40 overflow-hidden"
            >
              <Hero />
              
              {/* About Section */}
              <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative w-full py-32 flex flex-col items-center justify-center bg-[var(--bg)] z-10"
              >
                <div className="max-w-4xl mx-auto px-6 text-center">
                  <p className="text-2xl md:text-4xl leading-relaxed text-[var(--text-muted)] font-light tracking-wide">
                    Software Engineer specializing in <span className="text-[var(--fg)] font-semibold">Full-Stack Web Development</span> and <span className="text-[var(--fg)] font-semibold">Machine Learning</span>. Passionate about building robust applications, designing scalable APIs, and applying data-driven solutions to real-world challenges.
                  </p>
                </div>
              </motion.section>

              {/* Education right after About */}
              <SectionHeader title="EDUCATION" />
              <Education />

              <SectionHeader title="SKILLS" />
              <Skills />

              <SectionHeader title="PROJECTS" />
              <Projects />

              <SectionHeader title="EXPERIENCE" />
              <Experience />

              <SectionHeader title="CERTIFICATIONS" />
              <Certifications />

              <SectionHeader title="ACTIVITIES" />
              <Activities />

              <SectionHeader title="CONTACT" />
              <Contact />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
