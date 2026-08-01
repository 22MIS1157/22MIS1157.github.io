import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

export default function FullscreenMenu({ isOpen, onClose }) {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 flex flex-col justify-center items-center"
          style={{ backgroundColor: 'var(--bg)', zIndex: 45 }}
        >
          <div className="flex flex-col space-y-6 md:space-y-8 w-full max-w-4xl px-8">
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
                className="group flex items-center"
              >
                <div className="w-0 overflow-hidden group-hover:w-12 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="h-1 bg-[var(--fg)] w-8"></div>
                </div>
                <button
                  onClick={() => handleScroll(link.id)}
                  data-cursor="pointer"
                  className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-[var(--fg)] group-hover:translate-x-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] font-[family-name:var(--font-grotesk,'Space_Grotesk',sans-serif)]"
                >
                  {link.name}
                </button>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 flex space-x-8"
          >
            {['GitHub', 'LinkedIn', 'Email'].map((social) => (
              <a 
                key={social} 
                href="#" 
                data-cursor="pointer"
                className="text-[var(--text-secondary)] hover:text-[var(--fg)] transition-colors text-sm font-medium tracking-widest uppercase font-[family-name:var(--font-inter,'Inter',sans-serif)]"
              >
                {social}
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
