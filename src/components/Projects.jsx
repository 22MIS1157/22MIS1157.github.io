import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section className="relative w-full py-40 flex flex-col items-center justify-center bg-[var(--bg)]" id="projects">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none overflow-hidden flex justify-center z-0">
        <h2 className="magic-title">PROJECTS</h2>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-20 flex flex-col gap-40">
        
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
          
          <div className="w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[#000000] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
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
                <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                <path d="M200,0 L200,600 M400,0 L400,600 M600,0 L600,600 M800,0 L800,600" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>

                <g transform="translate(100, 150)">
                  <motion.line initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} x1="50" y1="350" x2="400" y2="350" stroke="#FFF" strokeWidth="4"/>
                  <rect x="80" y="150" width="160" height="110" fill="none" stroke="#FFF" strokeWidth="3" rx="5"/>
                  <path d="M90,190 L120,170 L150,210 L190,180 L230,220" fill="none" stroke="var(--accent)" strokeWidth="2"/>
                  <path d="M80,350 C80,310 100,280 120,280 C140,280 150,300 150,350" fill="none" stroke="#FFF" strokeWidth="3"/>
                  <circle cx="120" cy="250" r="22" fill="none" stroke="#FFF" strokeWidth="3"/>
                </g>

                <g transform="translate(480, 120)">
                  <rect x="50" y="120" width="350" height="280" fill="none" stroke="#FFF" strokeWidth="4" rx="20"/>
                  <circle cx="225" cy="260" r="80" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="10 10"/>
                  <motion.circle animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} cx="225" cy="260" r="10" fill="var(--accent)" />
                </g>

                <motion.g initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                  <circle cx="500" cy="300" r="280" fill="#0D0D11" stroke="var(--accent)" strokeWidth="4"/>
                  <g clipPath="url(#zoom-clip)">
                    <circle cx="500" cy="300" r="240" fill="url(#scan-glow)"/>
                    <g transform="translate(500, 300)">
                      <path d="M-80,240 L-80,-60 C-80,-140 80,-140 80,-60 L80,240" fill="none" stroke="#FFF" strokeWidth="8"/>
                      <path d="M-50,-50 C-50,-110 50,-110 50,-50 L40,40 C40,45 -40,45 -40,40 Z" fill="#FFB6C1" stroke="none"/>
                      <path d="M-50,-50 C-50,-110 50,-110 50,-50 L40,40 C40,45 -40,45 -40,40 Z" fill="none" stroke="#FFF" strokeWidth="4"/>
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
                
                <motion.g initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.5 }}>
                  <rect x="40" y="40" width="320" height="240" fill="rgba(0,0,0,0.85)" stroke="var(--accent)" strokeWidth="2" rx="8" />
                  <path d="M40,80 L360,80" stroke="var(--accent)" strokeWidth="1.5"/>
                  <text x="60" y="65" fill="#FFF" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">SPECTRAL_BIOMETRIC_LOG</text>
                  <motion.text initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} x="60" y="110" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="12">&gt; CAMERA ZOOM: 400%</motion.text>
                  <motion.text initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.1 }} x="60" y="140" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="12">&gt; EXTRACTING SPECTRUM...</motion.text>
                  <motion.text initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.4 }} x="60" y="170" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="12">&gt; ESTIMATED Hb: 8.5 g/dL (LOW)</motion.text>
                  <motion.text initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.7 }} x="60" y="200" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="12">&gt; CLASSIFYING... CNN OUT: 96%</motion.text>
                  <motion.text initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 3.0 }} x="60" y="240" fill="#EF4444" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold">DIAGNOSIS: ANEMIA DETECTED</motion.text>
                </motion.g>
              </g>
            </svg>
          </div>
        </motion.div>

        {/* 2. ATCC VPARK (Smart Lot) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1 w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[#000000] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <rect x="600" y="100" width="150" height="400" fill="none" stroke="#FFF" strokeWidth="4" strokeDasharray="20 20"/>
              <text x="650" y="90" fill="#AAA" fontFamily="var(--font-mono)" fontSize="20">BAY 4</text>
              <motion.path 
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                d="M0,300 L400,300 C500,300 550,250 675,250 L675,100" fill="none" stroke="var(--accent)" strokeWidth="6" strokeDasharray="10 10"
              />
              
              <motion.g 
                initial={{ x: -100, y: 300 }} 
                animate={{ x: [ -100, 400, 675, 675 ], y: [300, 300, 250, 150] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="-40" y="-25" width="80" height="50" rx="10" fill="#FFF"/>
                <rect x="-20" y="-20" width="40" height="40" rx="5" fill="#333"/>
              </motion.g>

              <motion.g 
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="250" y="240" width="100" height="120" fill="none" stroke="var(--accent)" strokeWidth="3"/>
                <rect x="250" y="220" width="90" height="20" fill="var(--accent)"/>
                <text x="255" y="234" fill="#000" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold">CAR: 0.98</text>
              </motion.g>

              <motion.g 
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="700" y="300" width="200" height="60" fill="#111" stroke="var(--accent)" strokeWidth="2" rx="5"/>
                <text x="720" y="335" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="16" fontWeight="bold">BAY 4 ALLOCATED</text>
              </motion.g>
            </svg>
          </div>

          <div className="order-1 lg:order-2 flex flex-col">
            <span className="font-mono text-xl text-[var(--accent)] font-bold mb-2">2026</span>
            <h3 className="text-4xl font-bold text-[var(--fg)] mb-4 leading-tight">ATCC VPark -- IoT Smart Parking</h3>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Built web applications (frontend + backend) for a smart parking system using a React frontend and Python FastAPI & Node.js backend. Integrated APIs to connect a YOLOv8 CV model via a mobile camera to an Arduino Nano using PySerial, automatically controlling a physical servo gate.
            </p>
            <div className="flex flex-wrap gap-3">
              {['FastAPI', 'YOLOv8', 'Arduino', 'React', 'Node.js'].map(t => (
                <span key={t} className="text-sm font-bold px-4 py-2 rounded-full border border-[var(--glass-border)] text-[var(--fg)] bg-[var(--bg)] shadow-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3. LEXCLOUD (AWS Data Flow) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col">
            <span className="font-mono text-xl text-[var(--accent)] font-bold mb-2">2024</span>
            <h3 className="text-4xl font-bold text-[var(--fg)] mb-4 leading-tight">LexCloud -- AWS Backend</h3>
            <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
              Developed a backend Python application utilizing APIs and data services deployed on AWS to process and store structured data files. Used FastAPI to build REST endpoints and integrated AWS serverless services (Lambda, API Gateway, S3, DynamoDB). Added an AI feature using LLaMA-3.
            </p>
            <div className="flex flex-wrap gap-3">
              {['AWS Lambda', 'FastAPI', 'LLaMA-3', 'DynamoDB', 'S3'].map(t => (
                <span key={t} className="text-sm font-bold px-4 py-2 rounded-full border border-[var(--glass-border)] text-[var(--fg)] bg-[var(--bg)] shadow-md">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[#000000] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <g id="lex-node-user" transform="translate(150, 300)">
                <circle cx="0" cy="0" r="35" fill="none" stroke="#FFF" strokeWidth="3"/>
                <text x="-20" y="5" fill="#FFF" fontFamily="Outfit" fontSize="14">USER</text>
              </g>
              <g id="lex-node-api" transform="translate(380, 200)">
                <circle cx="0" cy="0" r="35" fill="none" stroke="#FFF" strokeWidth="3"/>
                <text x="-15" y="5" fill="#FFF" fontFamily="Outfit" fontSize="14">API</text>
              </g>
              <g id="lex-node-lambda" transform="translate(380, 400)">
                <circle cx="0" cy="0" r="35" fill="none" stroke="var(--accent)" strokeWidth="3"/>
                <text x="-25" y="5" fill="var(--accent)" fontFamily="Outfit" fontSize="14">LAMBDA</text>
              </g>
              <g id="lex-node-db" transform="translate(620, 400)">
                <circle cx="0" cy="0" r="35" fill="none" stroke="#FFF" strokeWidth="3"/>
                <text x="-12" y="5" fill="#FFF" fontFamily="Outfit" fontSize="14">DB</text>
              </g>
              <g id="lex-node-llama" transform="translate(620, 200)">
                <circle cx="0" cy="0" r="35" fill="none" stroke="var(--accent)" strokeWidth="3"/>
                <text x="-22" y="5" fill="var(--accent)" fontFamily="Outfit" fontSize="14">LLaMA3</text>
              </g>

              <path d="M185,300 L345,200" stroke="#555" strokeWidth="2" strokeDasharray="5 5"/>
              <path d="M380,235 L380,365" stroke="#555" strokeWidth="2" strokeDasharray="5 5"/>
              <path d="M415,400 L585,400" stroke="#555" strokeWidth="2" strokeDasharray="5 5"/>
              <path d="M415,400 L585,200" stroke="#555" strokeWidth="2" strokeDasharray="5 5"/>
              <path d="M585,200 L185,300" stroke="#555" strokeWidth="2" strokeDasharray="5 5"/>

              <motion.circle animate={{ cx: [185, 345, 380, 585], cy: [300, 200, 365, 400], opacity: [1, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} r="8" fill="var(--accent)"/>
              <motion.circle animate={{ cx: [380, 415, 585, 620], cy: [400, 400, 200, 200], opacity: [0, 0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }} r="8" fill="var(--accent)"/>
              <motion.circle animate={{ cx: [585, 185], cy: [200, 300], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2.5 }} r="8" fill="#FFF"/>

              <motion.circle cx="620" cy="200" r="35" fill="none" stroke="var(--accent)" strokeWidth="2" animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}/>
              
              <motion.g transform="translate(680, 250)" animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <rect x="0" y="0" width="160" height="80" fill="#111" stroke="var(--accent)" strokeWidth="2" rx="5"/>
                <text x="15" y="30" fill="#FFF" fontFamily="var(--font-mono)" fontSize="12">QUERY RESOLVED</text>
                <text x="15" y="55" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="11">RAG CONFIDENCE: 98%</text>
              </motion.g>
            </svg>
          </div>
        </motion.div>

        {/* 4. SEPSIS PREDICTION */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 lg:order-1 w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[#000000] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(100, 150)">
                <path d="M50,300 L250,300 M50,300 L50,220 M250,300 L250,250" stroke="#FFF" strokeWidth="4"/>
                <path d="M80,280 C90,260 110,260 130,270 L230,270" fill="none" stroke="#FFF" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="105" cy="245" r="12" fill="none" stroke="#FFF" strokeWidth="3"/>
                <line x1="280" y1="120" x2="280" y2="300" stroke="#FFF" strokeWidth="3"/>
                <rect x="230" y="80" width="100" height="70" fill="none" stroke="#FFF" strokeWidth="3" rx="5"/>
                <motion.path 
                  animate={{ strokeDashoffset: [-120, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  d="M235,115 L255,115 L260,95 L265,135 L270,115 L295,115 L300,95 L305,135 L310,115 L325,115" 
                  fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="120"
                />
              </g>

              <motion.g transform="translate(50, 480)" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <rect x="0" y="0" width="380" height="80" fill="#111" stroke="var(--glass-border)" strokeWidth="2" rx="5"/>
                <text x="20" y="30" fill="#AAA" fontFamily="var(--font-mono)" fontSize="12">FEATURES EXTRACTION:</text>
                <motion.text initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} x="20" y="55" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="14">&gt; BP: 82 mmHg (LOW)   &gt; TEMP: 38.9 C (HIGH)</motion.text>
              </motion.g>

              <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} transform="translate(550, 100)">
                <path d="M150,100 L70,220 M150,100 L230,220" stroke="#FFF" strokeWidth="3"/>
                <path d="M70,220 L30,320 M70,220 L110,320" stroke="#FFF" strokeWidth="2"/>
                
                <motion.circle animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} cx="150" cy="100" r="28" fill="#111" stroke="var(--accent)" strokeWidth="4"/>
                <text x="128" y="105" fill="var(--accent)" fontFamily="var(--font-outfit)" fontSize="14" fontWeight="bold">BP &lt; 90</text>
                
                <circle cx="70" cy="220" r="25" fill="#111" stroke="#FFF" strokeWidth="3"/>
                <text x="45" y="225" fill="#FFF" fontFamily="var(--font-outfit)" fontSize="12">Temp &gt; 38</text>
                
                <circle cx="230" cy="220" r="25" fill="#111" stroke="#FFF" strokeWidth="3"/>
                <text x="210" y="225" fill="#FFF" fontFamily="var(--font-outfit)" fontSize="12">Age &gt; 65</text>

                <circle cx="30" cy="320" r="18" fill="#111" stroke="var(--accent)" strokeWidth="3"/>
                <text x="18" y="324" fill="var(--accent)" fontFamily="var(--font-outfit)" fontSize="11">Sepsis</text>
                <circle cx="110" cy="320" r="18" fill="#111" stroke="#FFF" strokeWidth="2"/>
                
                <motion.g transform="translate(-20, 380)" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                  <rect x="0" y="0" width="300" height="90" fill="#111" stroke="var(--accent)" strokeWidth="2" rx="8"/>
                  <text x="20" y="30" fill="#FFF" fontFamily="var(--font-mono)" fontSize="14">MORTALITY PREDICTION</text>
                  <text x="20" y="55" fill="#EF4444" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold">RISK: 93.4% (CRITICAL)</text>
                  <rect x="20" y="70" width="220" height="8" fill="#FFF" rx="4"/>
                  <rect x="20" y="70" width="205" height="8" fill="#EF4444" rx="4"/>
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
