import { motion } from 'framer-motion';
import { Activity, Beaker, Shield, Code2 } from 'lucide-react';

const projects = [
  {
    title: 'Non-Invasive Anemia Detection',
    subtitle: 'AI System from Fingernail Photos',
    year: '2025',
    desc: 'Designed a two-step CV pipeline using PyTorch and OpenCV to detect anemia from hand photographs. Automatically crops the fingernail region using YOLOv8, followed by a CNN to classify the image as healthy or anemic with 96% accuracy on 852 test images.',
    tech: ['PyTorch', 'CNN', 'OpenCV', 'YOLOv8'],
    icon: <Activity className="w-8 h-8" />
  },
  {
    title: 'Sepsis Prediction Model',
    subtitle: 'Machine Learning Healthcare',
    year: '2024',
    desc: 'Developed a machine learning model to predict sepsis using patient health data. Explored Random Forest and Gradient Boosting algorithms, achieving high recall to minimize false negatives in critical care environments.',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'Pandas'],
    icon: <Beaker className="w-8 h-8" />
  },
  {
    title: 'Secure IoT Home System',
    subtitle: 'Hardware & Web Integration',
    year: '2023',
    desc: 'Built an end-to-end IoT system using Arduino Nano and Raspberry Pi. Designed a custom web dashboard with React and Node.js to monitor sensor data in real-time with end-to-end encryption.',
    tech: ['Arduino', 'React', 'Node.js', 'WebSockets'],
    icon: <Shield className="w-8 h-8" />
  }
];

export default function Projects() {
  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-[var(--bg)]" id="projects">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden flex justify-center z-0">
        <h2 className="text-[clamp(4.5rem,16vw,13rem)] font-black text-[var(--magic-title-color)] opacity-50 uppercase tracking-tighter leading-none select-none blur-[3px]">
          PROJECTS
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ y: -10 }}
            className="group glass-card flex flex-col h-full relative overflow-hidden p-8 hover:border-[var(--accent)] transition-all duration-300"
          >
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 group-hover:scale-150 transition-all duration-500 pointer-events-none">
              {proj.icon}
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[var(--glass-border)] text-[var(--accent)]">
                {proj.icon}
              </div>
              <span className="font-mono text-sm text-[var(--accent)] font-bold">{proj.year}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-[var(--fg)] mb-1 leading-tight">{proj.title}</h3>
            <p className="text-sm font-mono text-[var(--accent)] mb-4">{proj.subtitle}</p>
            
            <p className="text-[var(--text-muted)] text-sm mb-8 flex-grow">
              {proj.desc}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {proj.tech.map(t => (
                <span key={t} className="text-xs font-bold px-3 py-1 rounded-full border border-[var(--glass-border)] text-[var(--fg)] group-hover:border-[var(--accent)] transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
