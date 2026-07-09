import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center bg-[var(--bg)]" id="projects">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col gap-40">
        
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
          
          <div className="w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              
              {/* Abstract Hand/Fingernail */}
              <g transform="translate(100, 150)">
                <path d="M50,300 C50,200 100,100 200,50 C300,50 350,150 350,300" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="4"/>
                {/* Fingernail */}
                <path d="M150,80 C150,50 250,50 250,80 C250,120 150,120 150,80 Z" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                
                {/* YOLOv8 Bounding Box animating */}
                <motion.rect 
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [2, 1, 1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                  x="130" y="40" width="140" height="90" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="10 5"
                />
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                  x="130" y="30" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold"
                >
                  YOLOv8: Fingernail (0.98)
                </motion.text>
              </g>

              {/* Data flow to CNN */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                d="M400,200 L550,200" stroke="var(--accent)" strokeWidth="4" strokeDasharray="15 10" fill="none"
              />

              {/* CNN Layers Visualization */}
              <g transform="translate(550, 50)">
                <rect x="0" y="100" width="40" height="100" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="2"/>
                <rect x="60" y="75" width="40" height="150" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="2"/>
                <rect x="120" y="50" width="40" height="200" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="2"/>
                
                {/* CNN Connections */}
                <motion.path 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  d="M40,150 L60,100 M40,150 L60,200 M100,150 L120,70 M100,150 L120,230" stroke="var(--accent)" strokeWidth="2" fill="none"
                />

                <text x="0" y="300" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="16">CNN CLASSIFIER</text>
              </g>

              {/* Final Output */}
              <motion.g 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 0, 1, 1], x: [0, 0, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.6, 1] }}
                transform="translate(750, 150)"
              >
                <rect x="0" y="0" width="200" height="100" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" rx="10"/>
                <text x="20" y="40" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14">Prediction:</text>
                <text x="20" y="75" fill="var(--accent)" fontFamily="var(--font-outfit)" fontSize="24" fontWeight="bold">HEALTHY (96%)</text>
              </motion.g>

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
          <div className="order-2 lg:order-1 w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              
              {/* Road & Parking Bay */}
              <path d="M0,450 L1000,450 M0,550 L1000,550" stroke="var(--glass-border)" strokeWidth="4" strokeDasharray="20 20"/>
              <rect x="700" y="100" width="180" height="350" fill="none" stroke="var(--fg)" strokeWidth="6" strokeDasharray="30 15"/>
              <text x="730" y="80" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="24" fontWeight="bold">BAY 4</text>

              {/* Camera / YOLOv8 */}
              <g transform="translate(100, 100)">
                <rect x="0" y="0" width="80" height="50" fill="var(--bg)" stroke="var(--fg)" strokeWidth="4" rx="8"/>
                <circle cx="60" cy="25" r="15" fill="var(--bg)" stroke="var(--accent)" strokeWidth="4"/>
                <text x="0" y="-15" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="16">Mobile Camera</text>
                
                {/* Camera Vision Cone */}
                <motion.path 
                  animate={{ opacity: [0.1, 0.3, 0.1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  d="M75,25 L350,300 L350,450 Z" fill="var(--accent)" stroke="none"
                />
              </g>

              {/* Arduino Nano Box */}
              <g transform="translate(450, 100)">
                <rect x="0" y="0" width="100" height="60" fill="var(--bg)" stroke="#00979D" strokeWidth="4" rx="4"/>
                <circle cx="15" cy="15" r="5" fill="#00979D"/>
                <circle cx="85" cy="15" r="5" fill="#00979D"/>
                <circle cx="15" cy="45" r="5" fill="#00979D"/>
                <circle cx="85" cy="45" r="5" fill="#00979D"/>
                <text x="15" y="35" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">ARDUINO</text>
              </g>

              {/* Communication Lines */}
              <path d="M180,125 L450,125" stroke="var(--text-muted)" strokeWidth="3" strokeDasharray="10 10"/>
              <text x="240" y="115" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12">PySerial API</text>

              {/* Servo Gate */}
              <g transform="translate(580, 450)">
                <rect x="-10" y="-80" width="20" height="100" fill="var(--bg)" stroke="var(--fg)" strokeWidth="4"/>
                {/* Gate Arm - Animates opening and closing */}
                <motion.rect 
                  animate={{ rotate: [0, -90, -90, 0, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  originX="10px" originY="10px"
                  x="10" y="-70" width="200" height="15" fill="var(--accent)" stroke="var(--fg)" strokeWidth="2"
                />
              </g>

              {/* Car */}
              <motion.g 
                animate={{ x: [-200, 300, 740, 740, -200], y: [480, 480, 480, 250, 250], rotate: [0, 0, -90, -90, -90] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="-60" y="-30" width="120" height="60" rx="15" fill="var(--fg)"/>
                <rect x="-30" y="-25" width="60" height="50" rx="5" fill="var(--bg)"/>
                {/* YOLOv8 Detection Box around car */}
                <motion.rect 
                  animate={{ opacity: [0, 1, 0, 0, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  x="-70" y="-40" width="140" height="80" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="5 5"
                />
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
          
          <div className="w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              
              {/* Architecture Lines */}
              <path d="M150,300 L350,150 M350,150 L650,150 M150,300 L350,450 M350,450 L650,450 M650,150 L800,300 L650,450 M350,150 L350,450" stroke="var(--glass-border)" strokeWidth="4" strokeDasharray="10 10"/>

              {/* Data Packets Animating */}
              <motion.circle animate={{ cx: [150, 350, 650, 800], cy: [300, 150, 150, 300] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} r="6" fill="var(--accent)"/>
              <motion.circle animate={{ cx: [150, 350, 650, 800], cy: [300, 450, 450, 300] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} r="6" fill="var(--fg)"/>
              <motion.circle animate={{ cx: [350, 350], cy: [150, 450] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }} r="6" fill="var(--accent)"/>

              {/* USER / FASTAPI */}
              <g transform="translate(150, 300)">
                <rect x="-60" y="-40" width="120" height="80" fill="var(--bg)" stroke="var(--fg)" strokeWidth="4" rx="10"/>
                <text x="-35" y="5" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold">CLIENT</text>
              </g>

              {/* API GATEWAY */}
              <g transform="translate(350, 150)">
                <polygon points="0,-40 50,0 0,40 -50,0" fill="var(--bg)" stroke="var(--accent)" strokeWidth="4"/>
                <text x="-40" y="60" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="16" fontWeight="bold">API Gateway</text>
              </g>

              {/* LAMBDA */}
              <g transform="translate(350, 450)">
                <rect x="-50" y="-50" width="100" height="100" fill="var(--bg)" stroke="#FF9900" strokeWidth="4" rx="20"/>
                <text x="-15" y="10" fill="#FF9900" fontFamily="var(--font-mono)" fontSize="32" fontWeight="bold">λ</text>
                <text x="-35" y="75" fill="#FF9900" fontFamily="var(--font-mono)" fontSize="16" fontWeight="bold">AWS Lambda</text>
              </g>

              {/* S3 BUCKET */}
              <g transform="translate(650, 150)">
                <path d="M-40,-20 C-40,-40 40,-40 40,-20 L30,40 C30,60 -30,60 -30,40 Z" fill="var(--bg)" stroke="#569A31" strokeWidth="4"/>
                <ellipse cx="0" cy="-20" rx="40" ry="10" fill="var(--bg)" stroke="#569A31" strokeWidth="4"/>
                <text x="-12" y="15" fill="#569A31" fontFamily="var(--font-mono)" fontSize="20" fontWeight="bold">S3</text>
              </g>

              {/* DYNAMODB */}
              <g transform="translate(650, 450)">
                <ellipse cx="0" cy="-30" rx="50" ry="15" fill="var(--bg)" stroke="#4053D6" strokeWidth="4"/>
                <path d="M-50,-30 L-50,30 C-50,45 50,45 50,30 L50,-30" fill="var(--bg)" stroke="#4053D6" strokeWidth="4"/>
                <ellipse cx="0" cy="0" rx="50" ry="15" fill="none" stroke="#4053D6" strokeWidth="2" strokeDasharray="5 5"/>
                <text x="-35" y="15" fill="#4053D6" fontFamily="var(--font-mono)" fontSize="16" fontWeight="bold">DynamoDB</text>
              </g>

              {/* LLAMA-3 */}
              <g transform="translate(800, 300)">
                <rect x="-50" y="-50" width="100" height="100" fill="var(--bg)" stroke="var(--fg)" strokeWidth="4" rx="10"/>
                <text x="-40" y="-5" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="20" fontWeight="bold">LLaMA-3</text>
                <text x="-20" y="25" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="14">AI Core</text>
              </g>

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
          <div className="order-2 lg:order-1 w-full aspect-video rounded-3xl border-2 border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-2xl overflow-hidden relative flex items-center justify-center p-4">
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              
              {/* XGBoost Decision Tree */}
              <g transform="translate(300, 100)">
                {/* Branches */}
                <path d="M0,40 L-150,150 M0,40 L150,150 M-150,190 L-220,300 M-150,190 L-80,300 M150,190 L80,300 M150,190 L220,300" stroke="var(--glass-border)" strokeWidth="4"/>
                
                {/* Highlighted path (Prediction trace) */}
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  d="M0,40 L-150,150 M-150,190 L-80,300" stroke="var(--accent)" strokeWidth="6" fill="none"
                />

                {/* Nodes */}
                <rect x="-60" y="0" width="120" height="40" rx="20" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <text x="-30" y="25" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="16">BP &lt; 90</text>

                <rect x="-210" y="150" width="120" height="40" rx="20" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3"/>
                <text x="-195" y="175" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="16">Temp &gt; 38</text>

                <rect x="90" y="150" width="120" height="40" rx="20" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <text x="105" y="175" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="16">Age &gt; 65</text>

                {/* Leaf Nodes */}
                <circle cx="-220" cy="320" r="20" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <text x="-225" y="325" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14">0</text>

                <circle cx="-80" cy="320" r="20" fill="var(--bg)" stroke="var(--accent)" strokeWidth="5"/>
                <text x="-85" y="325" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">1</text>

                <circle cx="80" cy="320" r="20" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <text x="75" y="325" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14">1</text>

                <circle cx="220" cy="320" r="20" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                <text x="215" y="325" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14">0</text>
              </g>

              {/* MIMIC-IV Data Table visualization */}
              <g transform="translate(650, 80)">
                <rect x="0" y="0" width="250" height="150" fill="var(--bg)" stroke="var(--glass-border)" strokeWidth="2" rx="10"/>
                <text x="20" y="30" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">MIMIC-IV PATIENT DATA</text>
                <line x1="0" y1="45" x2="250" y2="45" stroke="var(--glass-border)" strokeWidth="2"/>
                <text x="20" y="70" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12">ID  | HR  | SYS | TEMP</text>
                <text x="20" y="90" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12">P01 | 110 | 85  | 39.1</text>
                <text x="20" y="110" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12">P02 | 80  | 120 | 36.8</text>
                <text x="20" y="130" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12">P03 | 140 | 75  | 40.2</text>
                
                {/* Highlight row */}
                <motion.rect 
                  animate={{ y: [75, 115, 95, 75] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  x="15" y="75" width="220" height="20" fill="var(--accent)" opacity="0.2" rx="4"
                />
              </g>

              {/* ECG Line Animating */}
              <g transform="translate(100, 450)">
                <motion.path 
                  animate={{ strokeDashoffset: [-800, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  d="M0,50 L200,50 L220,20 L240,100 L260,10 L280,70 L300,50 L800,50" 
                  fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="800"
                />
              </g>

              {/* Final Mortality Risk */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                transform="translate(650, 270)"
              >
                <rect x="0" y="0" width="250" height="80" fill="var(--bg)" stroke="#EF4444" strokeWidth="3" rx="10"/>
                <text x="20" y="30" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="14">MORTALITY RISK</text>
                <text x="20" y="60" fill="#EF4444" fontFamily="var(--font-outfit)" fontSize="24" fontWeight="bold">93.4% HIGH</text>
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
