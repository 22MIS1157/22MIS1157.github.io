import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: "What Is Generative AI?",
      issuer: "LinkedIn Learning",
      date: "Dec 2023",
      link: "https://www.linkedin.com/learning/certificates/445249dd4f20558f97fb2cb4f7e9d96e78b412ac7a17ce1378900751e4bd8acd"
    },
    {
      title: "Research Internship Completion Certificate",
      issuer: "CHAIR, VIT Chennai",
      date: "Aug 2025",
      link: "https://vitchennaievents.com/certificates/generate.php?c=VDJPc09rRXRJbDhoSUJrK1Fqc2xnVXFWQWcybS9ZT01KOGcyV3ZPSmNORGFjM2Zuakxaall1bVVoME00ZHFxUllhQmh5S1dLbjZqcVpxSXVIMDhXQjZVS3g1UUxkeENkRml1RmVmTXZqVUJSdWtXMGVoWXNTUEpSc0VSZVdSNUF2ejBqYVk0ajE4Zm82Wmxkbm9HaCt6MW9GS0ZES1AyOVBwVlltQTJtTEdRPQ=="
    }
  ];

  return (
    <section className="relative w-full py-20 flex flex-col items-center justify-center bg-[var(--bg)]" id="certifications">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <motion.a 
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="glass-card flex items-center gap-6 group hover:border-[var(--accent)] hover:bg-[var(--glass-bg)] transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex flex-shrink-0 items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors">{cert.title}</h3>
                <div className="flex items-center gap-4 text-sm font-mono text-[var(--text-muted)]">
                  <span>{cert.issuer}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                  <span>{cert.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
