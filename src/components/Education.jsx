import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    id: 1,
    degree: "M.Tech Integrated Software Engineering",
    institution: "VIT Chennai",
    period: "2022 – 2027",
    score: "CGPA 7.92",
    description: "Focusing on software development methodologies, algorithms, and full-stack web technologies."
  },
  {
    id: 2,
    degree: "Class XII PCBM",
    institution: "Mazharul Uloom HSS Ambur",
    period: "2020 – 2021",
    score: "85.20%",
    description: "Completed higher secondary education with a focus on Physics, Chemistry, Biology, and Mathematics."
  }
];

const Education = () => {
  return (
    <section id="education" className="py-32 bg-[var(--bg)] relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <span className="section-label block mb-4 text-[var(--text-muted)] font-inter text-sm font-semibold tracking-widest uppercase">
            Academics
          </span>
          <h2 className="section-heading font-grotesk font-black text-5xl md:text-7xl text-[var(--text-primary)] uppercase tracking-tight">
            Education
          </h2>
        </div>

        <div className="relative">
          {/* Main vertical timeline line - CONTINUES from Experience */}
          <div className="absolute left-[30%] md:left-[25%] top-0 bottom-0 w-[2px] bg-[var(--border)]" />

          <div className="flex flex-col space-y-16">
            {educationData.map((edu, index) => (
              <motion.div 
                key={edu.id}
                className="relative flex w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Date Side */}
                <div className="w-[30%] md:w-[25%] pr-6 md:pr-12 flex flex-col justify-start items-end pt-1">
                  <span className="font-inter text-sm md:text-base font-medium text-[var(--text-secondary)] text-right">
                    {edu.period}
                  </span>
                  <span className="font-inter text-xs md:text-sm font-bold text-[var(--text-primary)] mt-1 px-2 py-1 border border-[var(--border)] rounded">
                    {edu.score}
                  </span>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-[30%] md:left-[25%] -translate-x-[50%] mt-2 flex items-center justify-center">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-[var(--bg)] border-2 border-[var(--text-primary)] z-10"
                    whileInView={{ backgroundColor: 'var(--text-primary)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  />
                  {/* Connecting horizontal line */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-4 md:w-8 h-[2px] bg-[var(--border)]" />
                </div>

                {/* Content Side */}
                <div className="w-[70%] md:w-[75%] pl-8 md:pl-12">
                  <div className="group border border-[var(--border)] p-6 md:p-8 hover:border-[var(--text-primary)] transition-colors duration-300 bg-[var(--bg)]">
                    <h3 className="font-grotesk text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                      {edu.degree}
                    </h3>
                    <h4 className="font-inter text-lg text-[var(--text-secondary)] mb-4">
                      {edu.institution}
                    </h4>
                    <p className="font-inter text-base text-[var(--text-muted)] leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
