import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: "Research Intern",
    company: "CHAIR VIT Chennai",
    period: "May 2025 – Aug 2025",
    description: "Contributing to research initiatives and collaborating with faculty on cutting-edge technical projects."
  },
  {
    id: 2,
    role: "Python Training Intern",
    company: "Colan Infotech",
    period: "Jun 2024 – Jul 2024",
    description: "Developed and refined Python programming skills, participating in training modules focused on software engineering best practices."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 bg-[var(--bg)] relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <span className="section-label block mb-4 text-[var(--text-muted)] font-inter text-sm font-semibold tracking-widest uppercase">
            Work
          </span>
          <h2 className="section-heading font-grotesk font-black text-5xl md:text-7xl text-[var(--text-primary)] uppercase tracking-tight">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Main vertical timeline line */}
          <div className="absolute left-[30%] md:left-[25%] top-0 bottom-0 w-[2px] bg-[var(--border)]" />

          <div className="flex flex-col space-y-16">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="relative flex w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Date Side */}
                <div className="w-[30%] md:w-[25%] pr-6 md:pr-12 flex justify-end items-start pt-1">
                  <span className="font-inter text-sm md:text-base font-medium text-[var(--text-secondary)] text-right">
                    {exp.period}
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
                      {exp.role}
                    </h3>
                    <h4 className="font-inter text-lg text-[var(--text-secondary)] mb-4">
                      {exp.company}
                    </h4>
                    <p className="font-inter text-base text-[var(--text-muted)] leading-relaxed">
                      {exp.description}
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

export default Experience;
