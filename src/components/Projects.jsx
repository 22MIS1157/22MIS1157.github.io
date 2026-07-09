import { motion } from 'framer-motion';
import { Activity, Beaker, Shield, Code2 } from 'lucide-react';

export default function Projects() {
  return (
    <section className="relative w-full py-40 flex flex-col items-center justify-center bg-[var(--bg)]" id="projects">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden flex justify-center z-0">
        <h2 className="text-[clamp(4.5rem,16vw,13rem)] font-black text-[var(--magic-title-color)] opacity-50 uppercase tracking-tighter leading-none select-none blur-[3px]">
          PROJECTS
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-20 flex flex-col gap-32">
        
        {/* 1. ANEMIA DETECTION */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col">
            <span className="font-mono text-xl text-[var(--accent)] font-bold mb-2">2025</span>
            <h3 className="text-4xl font-bold text-[var(--fg)] mb-4 leading-tight">Non-Invasive Anemia Detection</h3>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Designed a two-step CV pipeline using PyTorch and OpenCV to detect anemia from hand photographs. Automatically crops the fingernail region using YOLOv8, followed by a CNN to classify the image as healthy or anemic with 96% accuracy on 852 test images.
            </p>
            <div className="flex flex-wrap gap-3">
              {['PyTorch', 'CNN', 'OpenCV', 'YOLOv8'].map(t => (
                <span key={t} className="text-sm font-bold px-4 py-2 rounded-full border border-[var(--glass-border)] text-[var(--fg)] bg-[var(--bg)] shadow-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[var(--bg-card)] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="scan-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
                </radialGradient>
                <clipPath id="zoom-clip">
                  <circle cx="500" cy="300" r="280"/>
                </clipPath>
              </defs>

              <g transformOrigin="500 300">
                <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500" stroke="rgba(150,150,150,0.05)" strokeWidth="1"/>
                <path d="M200,0 L200,600 M400,0 L400,600 M600,0 L600,600 M800,0 L800,600" stroke="rgba(150,150,150,0.05)" strokeWidth="1"/>

                <g transform="translate(100, 150)">
                  <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} x1="50" y1="350" x2="400" y2="350" stroke="var(--fg)" strokeWidth="4"/>
                  <rect x="80" y="150" width="160" height="110" fill="none" stroke="var(--fg)" strokeWidth="3" rx="5"/>
                  <path d="M90,190 L120,170 L150,210 L190,180 L230,220" fill="none" stroke="var(--accent)" strokeWidth="2"/>
                  <path d="M80,350 C80,310 100,280 120,280 C140,280 150,300 150,350" fill="none" stroke="var(--fg)" strokeWidth="3"/>
                  <circle cx="120" cy="250" r="22" fill="none" stroke="var(--fg)" strokeWidth="3"/>
                </g>

                <g transform="translate(480, 120)">
                  <rect x="50" y="120" width="350" height="280" fill="none" stroke="var(--fg)" strokeWidth="4" rx="20"/>
                  <circle cx="225" cy="260" r="80" fill="none" stroke="var(--fg)" strokeWidth="2" strokeDasharray="10 10"/>
                  <motion.circle 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} 
                    transition={{ duration: 2, repeat: Infinity }} 
                    cx="225" cy="260" r="10" fill="var(--accent)" 
                  />
                </g>

                <motion.g 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <circle cx="500" cy="300" r="280" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="4"/>
                  <g clipPath="url(#zoom-clip)">
                    <circle cx="500" cy="300" r="240" fill="url(#scan-glow)"/>
                    <g transform="translate(500, 300)">
                      <path d="M-80,240 L-80,-60 C-80,-140 80,-140 80,-60 L80,240" fill="none" stroke="var(--fg)" strokeWidth="8"/>
                      <path d="M-50,-50 C-50,-110 50,-110 50,-50 L40,40 C40,45 -40,45 -40,40 Z" fill="var(--accent)" opacity="0.5" stroke="none"/>
                      <path d="M-50,-50 C-50,-110 50,-110 50,-50 L40,40 C40,45 -40,45 -40,40 Z" fill="none" stroke="var(--fg)" strokeWidth="4"/>
                    </g>
                    <motion.g transform="translate(500, 240)" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                      <circle cx="0" cy="0" r="110" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="15 5"/>
                    </motion.g>
                    <motion.g transform="translate(0, 80)" animate={{ y: [-150, 150, -150] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                      <line x1="200" y1="0" x2="800" y2="0" stroke="var(--accent)" strokeWidth="5"/>
                      <rect x="200" y="-15" width="600" height="15" fill="url(#scan-glow)"/>
                    </motion.g>
                  </g>
                </motion.g>
                
                {/* HUD */}
                <motion.g initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.5 }}>
                  <rect x="40" y="40" width="320" height="240" fill="var(--glass-bg)" stroke="var(--accent)" strokeWidth="2" rx="8" />
                  <text x="60" y="65" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">SPECTRAL_LOG</text>
                  <text x="60" y="110" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="12">&gt; CAMERA ZOOM: 400%</text>
                  <text x="60" y="140" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="12">&gt; EXTRACTING SPECTRUM...</text>
                  <text x="60" y="240" fill="#EF4444" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold">DIAGNOSIS: ANEMIA DETECTED</text>
                </motion.g>
              </g>
            </svg>
          </div>
        </motion.div>

        {/* 2. SEPSIS PREDICTION */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1 w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[var(--bg-card)] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(100, 150)">
                <path d="M50,300 L250,300 M50,300 L50,220 M250,300 L250,250" stroke="var(--fg)" strokeWidth="4"/>
                <path d="M80,280 C90,260 110,260 130,270 L230,270" fill="none" stroke="var(--fg)" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="105" cy="245" r="12" fill="none" stroke="var(--fg)" strokeWidth="3"/>
                <line x1="280" y1="120" x2="280" y2="300" stroke="var(--fg)" strokeWidth="3"/>
                <rect x="230" y="80" width="100" height="70" fill="none" stroke="var(--fg)" strokeWidth="3" rx="5"/>
                <motion.path 
                  animate={{ strokeDashoffset: [-120, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  d="M235,115 L255,115 L260,95 L265,135 L270,115 L295,115 L300,95 L305,135 L310,115 L325,115" 
                  fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="120"
                />
              </g>

              <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} transform="translate(550, 100)">
                <path d="M150,100 L70,220 M150,100 L230,220" stroke="var(--fg)" strokeWidth="3"/>
                <path d="M70,220 L30,320 M70,220 L110,320" stroke="var(--fg)" strokeWidth="2"/>
                
                <motion.circle animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} cx="150" cy="100" r="28" fill="var(--bg)" stroke="var(--accent)" strokeWidth="4"/>
                <text x="128" y="105" fill="var(--accent)" fontFamily="var(--font-outfit)" fontSize="14" fontWeight="bold">BP &lt; 90</text>
                
                <circle cx="70" cy="220" r="25" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <text x="45" y="225" fill="var(--fg)" fontFamily="var(--font-outfit)" fontSize="12">Temp &gt; 38</text>
                
                <circle cx="230" cy="220" r="25" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <circle cx="30" cy="320" r="18" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3"/>
                <text x="18" y="324" fill="var(--accent)" fontFamily="var(--font-outfit)" fontSize="11">Sepsis</text>
                
                <motion.g transform="translate(-20, 380)" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                  <rect x="0" y="0" width="300" height="90" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" rx="8"/>
                  <text x="20" y="30" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14">MORTALITY PREDICTION</text>
                  <text x="20" y="55" fill="#EF4444" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold">RISK: 93.4% (CRITICAL)</text>
                </motion.g>
              </motion.g>
            </svg>
          </div>

          <div className="order-1 lg:order-2 flex flex-col">
            <span className="font-mono text-xl text-[var(--accent)] font-bold mb-2">2026</span>
            <h3 className="text-4xl font-bold text-[var(--fg)] mb-4 leading-tight">Predicting ICU Patient Mortality</h3>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Analyzed real-world datasets (MIMIC-IV) using Python, cleaning 305 patient records and extracting 172 clinical features. Supported AI development by training an XGBoost classifier to predict in-hospital mortality with an AUC-ROC of 0.96.
            </p>
            <div className="flex flex-wrap gap-3">
              {['XGBoost', 'Scikit-learn', 'SHAP', 'MIMIC-IV'].map(t => (
                <span key={t} className="text-sm font-bold px-4 py-2 rounded-full border border-[var(--glass-border)] text-[var(--fg)] bg-[var(--bg)] shadow-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
