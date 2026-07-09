import { ThemeProvider } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Education from './components/Education';

function App() {
  return (
    <ThemeProvider>
      <div className="relative w-full min-h-screen selection:bg-[var(--accent)] selection:text-[var(--bg)]">
        <ThemeSwitcher />
        
        <main>
          <Hero />
          
          {/* About Section */}
          <section className="relative w-full py-24 flex flex-col items-center justify-center bg-[var(--bg)] z-10">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-xl md:text-3xl leading-relaxed text-[var(--text-muted)] font-light">
                Software Engineer specializing in Full-Stack Web Development and Machine Learning. Passionate about building robust applications, designing scalable APIs, and applying data-driven solutions to real-world challenges.
              </p>
            </div>
          </section>

          <Skills />
          <Activities />
          <Projects />
          <Education />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
