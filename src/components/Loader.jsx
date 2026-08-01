import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  'Hello',
  'Namaste',
  'नमस्ते',
  'Bonjour',
  'Hola',
  'こんにちは',
  '안녕하세요',
  'Ciao',
  'Olá',
  'مرحبا',
  'Hallo'
];

const Loader = ({ onLoadingComplete }) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 11 greetings, total duration ~3.5s => ~300ms per greeting
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Wait a bit on the last greeting before sliding up
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <AnimatePresence onExitComplete={onLoadingComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="text-4xl md:text-5xl font-grotesk font-bold"
            >
              {greetings[index]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
