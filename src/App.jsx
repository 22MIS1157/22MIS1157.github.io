import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeContext';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import FullscreenMenu from './components/FullscreenMenu';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Offerings from './components/Offerings';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import ExperienceEducation from './components/ExperienceEducation';
import Certifications from './components/Certifications';
import Activities from './components/Activities';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (loading || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading, isMenuOpen]);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative w-full min-h-screen selection:bg-[var(--fg)] selection:text-[var(--bg)] bg-[var(--bg)]">

          {/* Custom Target Reticle Cursor */}
          <MagneticCursor />

          {/* Preloader */}
          <AnimatePresence mode="wait">
            {loading && (
              <Loader
                key="loader"
                onLoadingComplete={() => setLoading(false)}
              />
            )}
          </AnimatePresence>

          {/* Sticky Header Nav */}
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoaded={!loading} />
          <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          {/* Main Content Sections */}
          <AnimatePresence>
            {!loading && (
              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-[1] flex flex-col space-y-[40px]"
              >
                <Hero />
                <Offerings />
                <TechStack />
                <Projects />
                <ExperienceEducation />
                <Certifications />
                <Activities />
                <Contact />

                {/* Scroll to Top FAB */}
                <ScrollToTop />
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

/* ── Scroll to Top Button (Floating Black Square with White Up Arrow) ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-lg bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
          data-cursor="pointer"
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default App;
