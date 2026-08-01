import React from 'react';
import { motion } from 'framer-motion';

const certifications = [
  {
    name: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning',
    year: 'Dec 2023',
    link: 'https://www.linkedin.com/learning/certificates/'
  },
  {
    name: 'Research Internship Completion Certificate',
    issuer: 'CHAIR, VIT Chennai',
    year: 'Aug 2025',
    link: 'https://vitchennaievents.com/certificates/generate.php?c=VDJPc09rRXRJbDhoSUJrK1Fqc2xnVXFWQWcybS9ZT01KOGcyV3ZPSmNORGFjM2Zuakxaall1bVVoME00ZHFxUllhQmh5S1dLbjZqcVpxSXVIMDhXQjZVS3g1UUxkeENkRml1RmVmTXZqVUJSdWtXMGVoWXNTUEpSc0VSZVdSNUF2ejBqYVk0ajE4Zm82Wmxkbm9HaCt6MW9GS0ZES1AyOVBwVlltQTJtTEdRPQ=='
  }
];

export default function Certifications() {
  return (
    <section className="section-spacer relative w-full bg-[var(--bg)] text-[var(--fg)]" style={{ paddingTop: '60px', paddingBottom: '60px' }} id="certifications">
      <div className="container-custom">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[var(--fg)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--fg)] uppercase">CREDENTIALS</span>
            </div>
            <h2 className="section-heading whitespace-pre-line m-0">
              {"CERTIFICATIONS &\nCREDENTIALS"}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-inter text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Industry-recognized certifications validating expertise in Cloud Architecture, Artificial Intelligence, and modern software development.
            </p>
          </div>
        </div>

        {/* Certifications List - Indented & Entire Card Clickable */}
        <div className="max-w-5xl mx-auto pl-8 md:pl-16 pr-2 md:pr-4 flex flex-col gap-10 md:gap-14">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-cursor="pointer"
              className="relative rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--fg)] hover:shadow-2xl transition-all duration-500 text-left group overflow-hidden block text-decoration-none"
              style={{ padding: '44px 52px' }}
            >
              {/* Interior Content Div with 24px Left Padding Offset */}
              <div style={{ paddingLeft: '24px' }}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black font-mono text-[var(--fg)] opacity-25 group-hover:opacity-60 transition-opacity">
                      0{i + 1}
                    </span>
                    <h3 className="font-grotesk font-black text-2xl md:text-3xl text-[var(--text-primary)] leading-snug tracking-tight group-hover:text-[var(--fg)] transition-colors max-w-2xl">
                      {cert.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start">
                    <span className="font-mono text-xs font-semibold px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)]">
                      {cert.year}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] group-hover:border-[var(--fg)] flex items-center justify-center text-[var(--fg)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                      ↗
                    </span>
                  </div>
                </div>

                <p className="font-inter text-sm md:text-base text-[var(--text-secondary)] font-medium opacity-85 leading-relaxed group-hover:opacity-100 transition-opacity max-w-2xl" style={{ paddingLeft: '44px' }}>
                  Issued by {cert.issuer}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
