import React from 'react';
import { motion } from 'framer-motion';

const offerings = [
  {
    num: '01',
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    description: 'Building modern, responsive web applications with React, JavaScript, Python, FastAPI, and scalable frontend architectures.',
    image: '/images/offering_fullstack.jpg'
  },
  {
    num: '02',
    id: 'aiml',
    title: 'AI & Machine Learning Systems',
    description: 'Designing end-to-end ML pipelines with PyTorch, Scikit-learn, XGBoost, SHAP explainability, and predictive clinical models.',
    image: '/images/offering_aiml.jpg'
  },
  {
    num: '03',
    id: 'cviot',
    title: 'Computer Vision & IoT Solutions',
    description: 'Deploying real-time YOLOv8 object detection, OpenCV video analytics, Arduino hardware integration, and servo motor control.',
    image: '/images/offering_cviot.jpg'
  },
  {
    num: '04',
    id: 'cloudbackend',
    title: 'REST API & Cloud Architecture',
    description: 'Engineering high-throughput REST APIs, WebSocket real-time feeds, Docker containers, AWS deployment, and microservices.',
    image: '/images/offering_cloudbackend.jpg'
  },
  {
    num: '05',
    id: 'optimization',
    title: 'Performance & Database Engineering',
    description: 'Optimizing SQL queries, MySQL database schemas, memory efficiency, unit testing, and sub-second hardware-software actuation.',
    image: '/images/offering_optimization.jpg'
  }
];

// Duplicate items for continuous seamless loop without stopping
const marqueeOfferings = [...offerings, ...offerings];

export default function Offerings() {
  return (
    <section className="section-spacer w-full bg-[var(--bg)] overflow-hidden relative" style={{ paddingTop: '60px', paddingBottom: '60px' }} id="offerings">
      <div className="container-custom mb-12">
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[var(--fg)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--fg)] uppercase">MY EXPERTISE</span>
            </div>
            <h2 className="section-heading whitespace-pre-line m-0">
              {"WHAT I'M\nOFFERING"}
            </h2>
          </motion.div>
          
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-inter text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Full-stack software engineering, AI/ML deep learning pipelines, computer vision systems, and cloud infrastructure engineered for real-world impact.
            </p>
          </motion.div>
        </header>
      </div>

      {/* CONTINUOUS NON-STOPPING PARALLEL MARQUEE SLIDER (RIGHT TO LEFT) */}
      <div className="w-full overflow-hidden relative py-4">
        <motion.div
          className="flex items-stretch gap-8 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 35,
            ease: 'linear'
          }}
        >
          {marqueeOfferings.map((offering, index) => (
            <motion.div
              key={`${offering.id}-${index}`}
              data-cursor="pointer"
              className="glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-[var(--border)] hover:border-[var(--fg)] transition-all duration-300 shadow-sm group text-center bg-[var(--bg-card)] min-w-[320px] sm:min-w-[380px] md:min-w-[420px] max-w-[440px]"
            >
              <div className="flex flex-col items-center justify-center">
                {/* Seamless Floating Centered 3D Graphic (Matching Screenshot) */}
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={offering.image}
                    alt={offering.title}
                    className="w-full h-full object-contain mx-auto mix-blend-multiply dark:mix-blend-normal rounded-2xl grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                  />
                </div>
                
                {/* Title & Description */}
                <h3 className="font-grotesk font-black text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight leading-snug uppercase mb-4 text-center">
                  {offering.title}
                </h3>
                <p className="font-inter text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center">
                  {offering.description}
                </p>
              </div>

              {/* Large Step Number in Bottom Right Corner (Matching Screenshot) */}
              <div className="flex justify-end mt-8">
                <span className="font-mono text-4xl md:text-5xl font-light text-[var(--text-muted)] opacity-35 tracking-tighter">
                  {offering.num}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
