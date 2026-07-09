import { ThemeProvider } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Education from './components/Education';

import { AnimatePresence, motion } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <div className="relative w-full min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg)]">
        <ThemeSwitcher />
        
        <AnimatePresence>
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-24 md:gap-40 pb-40 overflow-hidden"
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

            <Skills />
            <Activities />
            <Projects />
            <Education />
          </motion.main>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;
