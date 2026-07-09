import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 800);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--grid-color)] to-transparent opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[15vw] md:text-[12rem] font-black leading-none text-[var(--fg)] tracking-tighter"
        >
          {progress}<span className="text-[var(--accent)]">%</span>
        </motion.div>
        
        <div className="h-1 w-64 bg-[var(--glass-border)] rounded-full mt-8 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[var(--accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-6 font-mono text-sm tracking-widest text-[var(--text-muted)] uppercase"
        >
          Initializing Experience
        </motion.p>
      </div>
    </motion.div>
  );
}
