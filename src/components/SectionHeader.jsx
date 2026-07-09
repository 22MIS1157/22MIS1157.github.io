import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SectionHeader({ title }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [80, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.5], [0.8, 1, 1, 1.15]);

  return (
    <div ref={ref} className="relative w-full h-40 flex items-center justify-center pointer-events-none overflow-visible mb-8">
      <motion.h2
        style={{ opacity, y, scale }}
        className="magic-title text-center whitespace-nowrap"
      >
        {title}
      </motion.h2>
    </div>
  );
}
