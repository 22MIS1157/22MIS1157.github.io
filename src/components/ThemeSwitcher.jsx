import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={toggleTheme}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md shadow-2xl overflow-hidden group transition-all duration-300 hover:scale-110 hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--accent)]"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Sun 
            className={`absolute w-6 h-6 text-[var(--fg)] group-hover:text-[var(--accent)] transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} 
          />
          <Moon 
            className={`absolute w-6 h-6 text-[var(--fg)] group-hover:text-[var(--accent)] transition-all duration-500 ${theme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} 
          />
        </div>
      </button>
    </div>
  );
}
