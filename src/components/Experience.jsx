import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: "Research Intern -- Smart Healthcare 2025",
      company: "Centre for Healthcare Advancement, Innovation & Research (CHAIR), VIT Chennai",
      location: "Chennai, Tamil Nadu",
      date: "May 2025 -- Aug 2025",
      points: [
        "Led an independent research project applying programming fundamentals to build a computer vision model from scratch; collected and preprocessed 4,260 images and wrote validation test cases.",
        "Delivered a working deep learning model with 96% accuracy and presented weekly technical updates to the faculty supervisor."
      ],
      link: "https://vitchennaievents.com/certificates/generate.php?c=VDJPc09rRXRJbDhoSUJrK1Fqc2xnVXFWQWcybS9ZT01KOGcyV3ZPSmNORGFjM2Zuakxaall1bVVoME00ZHFxUllhQmh5S1dLbjZqcVpxSXVIMDhXQjZVS3g1UUxkeENkRml1RmVmTXZqVUJSdWtXMGVoWXNTUEpSc0VSZVdSNUF2ejBqYVk0ajE4Zm82Wmxkbm9HaCt6MW9GS0ZES1AyOVBwVlltQTJtTEdRPQ=="
    },
    {
      title: "Python Training Intern",
      company: "Colan Infotech Private Limited",
      location: "Pernambut, Tamil Nadu (Full-time, On-site)",
      date: "Jun 2024 -- Jul 2024",
      points: [
        "Completed structured enterprise training focused on core Python programming, Java, SQL databases, and software testing practices to debug, test, and enhance existing systems.",
        "Gained practical exposure to standard industry workflows including Git version control, code reviews, and Agile team collaboration."
      ]
    }
  ];

  return (
    <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[var(--bg)]" id="experience">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="glass-card flex gap-6 md:gap-8 flex-col md:flex-row relative overflow-hidden group hover:border-[var(--accent)] transition-colors duration-500"
          >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
              <Briefcase className="w-64 h-64 text-[var(--accent)]" />
            </div>
            
            <div className="flex-shrink-0 pt-2">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                <Briefcase className="w-8 h-8" />
              </div>
            </div>
            
            <div className="relative z-10 w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className="text-2xl font-bold text-[var(--fg)]">{exp.title}</h3>
                <span className="font-mono text-sm px-4 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10 whitespace-nowrap">{exp.date}</span>
              </div>
              <p className="text-xl text-[var(--accent)] font-semibold mb-2">{exp.company}</p>
              <p className="text-sm font-mono text-[var(--text-muted)] mb-6">{exp.location}</p>
              
              <ul className="space-y-4 text-[var(--text-muted)] text-base leading-relaxed mb-6">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[var(--accent)] mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {exp.link && (
                <a 
                  href={exp.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-bold text-sm hover:bg-[var(--accent)] transition-colors duration-300"
                >
                  View Certificate
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
