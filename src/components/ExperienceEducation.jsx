import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const educationData = [
  {
    id: 'mtech',
    date: 'Aug 2022 –\nJul 2027',
    title: 'M.Tech Integrated Software Engineering',
    institution: 'Vellore Institute of Technology (VIT), Vellore • Full-time',
    bullets: [
      'Pursuing M.Tech Integrated Software Engineering with strong academic standing and specialization in AI/ML & Cloud Architecture.',
      'Relevant coursework includes Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Web Technologies, and Machine Learning.',
      'Serving as Student Tech Lead, managing software architecture and technical event platform infrastructure.',
      'Contributing as Full-Stack & AI Developer for automated computer vision platforms and cloud microservices.',
      'Actively balancing academics with internships, competitive programming, and production-scale full-stack development projects.'
    ]
  },
  {
    id: 'hsc',
    date: 'Jun 2020 –\nMay 2022',
    title: 'Higher Secondary Certificate (HSC)',
    institution: 'Mazharul Uloom Higher Secondary School, Ambur • Full-time',
    bullets: [
      'Completed Higher Secondary education with distinction in the Science stream, focusing on Physics, Chemistry, Mathematics, and Computer Science.',
      'Strengthened analytical and quantitative reasoning through rigorous coursework and algorithmic problem-solving.',
      'Built a strong foundation in programming and computational thinking, preparing for higher studies in Software Engineering.'
    ]
  }
];

const experienceData = [
  {
    id: 'lead-dev',
    date: '2023 –\nPresent',
    title: 'AI & Full-Stack Systems Lead',
    institution: 'VIT Developer Community & Independent Projects • Full-time',
    bullets: [
      'Architected ATCC VPARK: Real-time AI smart parking solution with YOLOv8 camera detection, Arduino servo gate actuation (< 1s), and FastAPI WebSocket dashboard.',
      'Developed Anemia Detect: Non-invasive diagnostic AI pipeline using YOLOv8 nail cropping, ResNet-50 CNN, and Grad-CAM heatmap visualization (96% accuracy, AUC 0.98).',
      'Engineered LexCloud AI: Cloud-native serverless NLP pipeline ingesting PDFs & audio via AWS Lambda, Groq Whisper, LLaMA-3 RAG Vector DB with sub-second API latency (< 240ms).',
      'Implemented modular OOP design, schema validation, error logging, and Git version control across cloud-scale software architectures.',
      'Actively balancing development tasks with AI research, open-source contributions, and production deployment pipelines.'
    ]
  },
  {
    id: 'ml-research',
    date: '2023 –\n2024',
    title: 'Machine Learning & Clinical Data Researcher',
    institution: 'Healthcare Analytics & MIMIC-IV Clinical Research • Full-time',
    bullets: [
      'Engineered ICU Mortality Predictor utilizing XGBoost classifier on MIMIC-IV hospital dataset across 172 features from 43 clinical measurements.',
      'Implemented SHAP (SHapley Additive exPlanations) for clinical explainability, achieving AUC-ROC 0.96 and 93.4% survival prediction accuracy.',
      'Utilized PyTorch, Scikit-learn, Pandas, NumPy, and Seaborn for rigorous exploratory data analysis, feature engineering, and statistical model validation.'
    ]
  }
];

export default function ExperienceEducation() {
  const [activeTab, setActiveTab] = useState('education'); // 'experience' | 'education'
  const sectionRef = useRef(null);

  // Dynamic Scroll progress line following checkpoints
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30
  });

  const items = activeTab === 'education' ? educationData : experienceData;

  return (
    <section className="section-spacer w-full bg-[var(--bg)] text-[var(--fg)] relative" style={{ paddingTop: '60px', paddingBottom: '60px' }} id="education">
      <div className="container-custom" ref={sectionRef}>
        
        {/* TOP CENTER TAB SWITCHER */}
        <div className="flex items-center justify-center gap-10 md:gap-14 mb-12 select-none">
          {/* EXPERIENCE TAB */}
          <button
            onClick={() => setActiveTab('experience')}
            className="relative font-grotesk font-black text-2xl md:text-3xl tracking-wider uppercase transition-all duration-300 focus:outline-none"
            data-cursor="pointer"
          >
            <span
              className={`block transition-all duration-500 ${
                activeTab === 'experience'
                  ? 'text-[var(--text-primary)] opacity-100 blur-0'
                  : 'text-[var(--text-muted)] opacity-35 blur-[3.5px] hover:opacity-60 hover:blur-[1px]'
              }`}
            >
              EXPERIENCE
            </span>

            {activeTab === 'experience' && (
              <motion.div
                layoutId="activeTabBracket"
                className="absolute -inset-x-3 -inset-y-1.5 pointer-events-none"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--fg)]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--fg)]" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--fg)]" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--fg)]" />
              </motion.div>
            )}
          </button>

          {/* EDUCATION TAB */}
          <button
            onClick={() => setActiveTab('education')}
            className="relative font-grotesk font-black text-2xl md:text-3xl tracking-wider uppercase transition-all duration-300 focus:outline-none"
            data-cursor="pointer"
          >
            <span
              className={`block transition-all duration-500 ${
                activeTab === 'education'
                  ? 'text-[var(--text-primary)] opacity-100 blur-0'
                  : 'text-[var(--text-muted)] opacity-35 blur-[3.5px] hover:opacity-60 hover:blur-[1px]'
              }`}
            >
              EDUCATION
            </span>

            {activeTab === 'education' && (
              <motion.div
                layoutId="activeTabBracket"
                className="absolute -inset-x-3 -inset-y-1.5 pointer-events-none"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--fg)]" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--fg)]" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--fg)]" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--fg)]" />
              </motion.div>
            )}
          </button>
        </div>

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[var(--fg)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--fg)] uppercase">MY JOURNEY</span>
            </div>
            <h2 className="section-heading whitespace-pre-line m-0">
              {activeTab === 'education' ? "EDUCATION &\nACADEMICS" : "WORK &\nEXPERIENCE"}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-inter text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              {activeTab === 'education'
                ? "My academic background, highlighting the foundational knowledge and coursework that shapes my approach to software engineering."
                : "My professional journey, building real-world AI applications, cloud infrastructure, and full-stack software systems."}
            </p>
          </div>
        </div>

        {/* TIMELINE LIST WITH HARD UNBREAKABLE INLINE PADDING FOR M.TECH, VELLORE, & BULLETS */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Vertical Dynamic Line (left-[64px] md:left-[116px] lg:left-[140px]) */}
          <div className="absolute left-[64px] md:left-[116px] lg:left-[140px] top-6 bottom-6 w-0.5 bg-[var(--border)] pointer-events-none z-0">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-[var(--fg)] shadow-[0_0_8px_var(--fg)]"
            />
          </div>

          <div className="flex flex-col gap-14 md:gap-20 w-full pl-20 md:pl-36 lg:pl-44">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start relative"
              >
                {/* Left Column: STICKY MONTH & YEAR + CHECKPOINT NODE */}
                <div className="md:col-span-4 sticky top-36 self-start flex items-center gap-4 relative z-10 py-1 pr-4">
                  {/* Timeline Checkpoint Circle Node 'o' Sitting Directly on the Line */}
                  <div className="absolute -left-[48px] md:-left-[56px] top-3 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--fg)] shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--fg)]" />
                  </div>

                  {/* Month & Year Text Pinning & Following with Scroll */}
                  <span className="font-inter text-xl md:text-2xl font-light text-[var(--text-secondary)] tracking-tight whitespace-pre-line leading-tight">
                    {item.date}
                  </span>
                </div>

                {/* Right Column: CARD BOX WITH HARD UNBREAKABLE INLINE PADDING (padding: '44px 52px') */}
                <div className="md:col-span-8">
                  <div 
                    data-cursor="pointer"
                    className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--fg)] hover:shadow-2xl transition-all duration-500 text-left group overflow-hidden"
                    style={{ padding: '44px 52px' }}
                  >
                    {/* Interior Content Div with extra 24px Left Padding Offset */}
                    <div style={{ paddingLeft: '24px' }}>
                      {/* Title */}
                      <h3 className="font-grotesk font-black text-2xl md:text-3xl text-[var(--text-primary)] leading-snug tracking-tight mb-3 group-hover:text-[var(--fg)] transition-colors">
                        {item.title}
                      </h3>

                      {/* Subtitle / Institution */}
                      <p className="font-inter text-sm md:text-base text-[var(--text-muted)] mb-8 font-medium">
                        {item.institution}
                      </p>

                      {/* Bullet Points List */}
                      <ul className="space-y-4 font-inter text-xs md:text-sm text-[var(--text-secondary)] opacity-75 leading-relaxed group-hover:opacity-95 transition-opacity" style={{ paddingLeft: '12px' }}>
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-4">
                            <span className="text-[var(--text-muted)] font-bold text-xs leading-none select-none mt-1">•</span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
