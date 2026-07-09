
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

const letterVariants = {
  hidden: { opacity: 0, scale: 4, filter: "blur(20px)", z: 500, rotateX: 90 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    z: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 10, stiffness: 100 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
  }
};

export default function Hero() {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#FFEA00' : '#1E56CD';

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--bg)]">
      
      {/* 2D Framer Motion Stars Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(150)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[var(--accent)]"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </div>

      {/* Hero Typography Foreground */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center h-full w-full perspective-[1000px]">
        
        <div className="flex flex-col items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex space-x-2 md:space-x-4 mb-2"
          >
            {"AFNAAN".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-[12vw] md:text-[8rem] leading-none font-black text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent)] uppercase inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 1.2 }
              }
            }}
            initial="hidden"
            animate="visible"
            className="flex space-x-1 md:space-x-4"
          >
            {"AHMED P".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-[14vw] md:text-[9rem] leading-none font-black text-[var(--accent)] drop-shadow-[0_0_25px_var(--accent)] uppercase inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 3, type: "spring" }}
        className="absolute bottom-10 flex flex-col items-center z-10"
      >
        <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] mb-2 uppercase">Scroll Down</span>
        <div className="w-[1px] h-12 bg-[var(--text-muted)] relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-[var(--accent)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
