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
              
              {/* Background Grid & Particles */}
              <g opacity="0.15">
                <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500" stroke="var(--fg)" strokeWidth="1"/>
                <path d="M100,0 L100,600 M200,0 L200,600 M300,0 L300,600 M400,0 L400,600 M500,0 L500,600 M600,0 L600,600 M700,0 L700,600 M800,0 L800,600 M900,0 L900,600" stroke="var(--fg)" strokeWidth="1"/>
                <circle cx="150" cy="150" r="3" fill="var(--fg)" />
                <circle cx="850" cy="450" r="3" fill="var(--fg)" />
                <circle cx="450" cy="50" r="3" fill="var(--fg)" />
              </g>

              {/* 1. Patient Scan Phase */}
              <motion.g 
                transform="translate(40, 200)"
                style={{ transformOrigin: "180px 150px" }}
                animate={{ 
                  scale: [1, 1, 2.5, 2.5, 0.8, 0.8, 1], 
                  opacity: [0, 1, 1, 0, 0, 0, 0] 
                }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.05, 0.15, 0.25, 0.3, 0.9, 1] }}
              >
                <circle cx="60" cy="50" r="30" fill="var(--glass-bg)" stroke="var(--fg)" strokeWidth="3"/>
                <path d="M20,130 C20,90 100,90 100,130 L110,200 L10,200 Z" fill="var(--glass-bg)" stroke="var(--fg)" strokeWidth="3"/>
                <path d="M105,150 Q160,180 180,150" fill="none" stroke="var(--fg)" strokeWidth="3"/>
                {/* Finger being picked/scanned */}
                <circle cx="180" cy="150" r="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3"/>
                
                {/* Scan rays zooming in */}
                <motion.path 
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  d="M170,140 L200,100 M190,150 L230,140 M180,160 L210,190" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
                />
                <text x="60" y="230" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold" textAnchor="middle">1. PATIENT INPUT</text>
              </motion.g>

              {/* Data Flow Line 1 */}
              <motion.path 
                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.2, 0.22, 0.35, 0.4, 1] }}
                d="M250,350 L310,250" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 5" fill="none"
              />

              {/* 2. YOLOv8 ROI Extraction (Zoomed Nail) */}
              <motion.g 
                transform="translate(250, 80)"
                style={{ transformOrigin: "100px 100px" }}
                animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.5, 0.5, 1, 1, 0.8, 0.5] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.2, 0.25, 0.45, 0.5, 1] }}
              >
                <circle cx="100" cy="100" r="90" fill="var(--glass-bg)" stroke="var(--fg)" strokeWidth="3" strokeDasharray="10 5"/>
                {/* Nail Shape */}
                <path d="M55,120 C55,70 145,70 145,120 C145,170 55,170 55,120 Z" fill="var(--bg)" stroke="var(--fg)" strokeWidth="3"/>
                
                {/* YOLO Bounding Box */}
                <motion.rect 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  x="45" y="60" width="110" height="120" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4"
                />
                
                {/* Laser Scanner */}
                <motion.line 
                  animate={{ y1: [65, 175, 65], y2: [65, 175, 65] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  x1="50" x2="150" stroke="var(--accent)" strokeWidth="4"
                />
                <text x="100" y="-10" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold" textAnchor="middle">2. YOLOv8 ROI CROP</text>
              </motion.g>

              {/* Data Flow Line 2 */}
              <motion.path 
                initial={{ strokeDashoffset: 20 }}
                animate={{ strokeDashoffset: 0, opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.4, 0.45, 0.6, 0.65, 1] }}
                d="M450,180 L520,180" stroke="var(--fg)" strokeWidth="3" strokeDasharray="5 5" fill="none"
              />

              {/* 3. Computer Vision Preprocessing Pipeline */}
              <motion.g 
                transform="translate(520, 90)"
                style={{ transformOrigin: "80px 90px" }}
                animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.8, 0.8, 1, 1, 0.9, 0.8] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.4, 0.45, 0.6, 0.65, 1] }}
              >
                <rect x="0" y="0" width="160" height="180" fill="var(--glass-bg)" stroke="var(--fg)" strokeWidth="2" rx="10" opacity="0.8"/>
                <text x="80" y="30" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold" textAnchor="middle">3. CV PIPELINE</text>
                
                {/* Grayscale Block */}
                <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <rect x="15" y="50" width="130" height="40" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" rx="5"/>
                  <text x="80" y="75" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold" textAnchor="middle">GRAYSCALING</text>
                </motion.g>
                <path d="M80,90 L80,110" stroke="var(--fg)" strokeWidth="2" strokeDasharray="3 3"/>
                {/* Convex Hull Block */}
                <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                  <rect x="15" y="110" width="130" height="40" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" rx="5"/>
                  <text x="80" y="135" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="bold" textAnchor="middle">CONVEX HULL</text>
                </motion.g>
              </motion.g>

              {/* Data Flow Line 3 */}
              <motion.path 
                initial={{ strokeDashoffset: 20 }}
                animate={{ strokeDashoffset: 0, opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.55, 0.6, 0.75, 0.8, 1] }}
                d="M680,180 Q730,180 730,230 L730,270" stroke="var(--fg)" strokeWidth="3" strokeDasharray="5 5" fill="none"
              />

              {/* 4. Deep Learning CNN Classification */}
              <motion.g 
                transform="translate(730, 290)"
                animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.8, 0.8, 1, 1, 0.9, 0.8] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.55, 0.6, 0.75, 0.8, 1] }}
              >
                <rect x="-40" y="-80" width="20" height="160" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="2" rx="3"/>
                <rect x="0" y="-120" width="20" height="240" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="2" rx="3"/>
                <rect x="40" y="-60" width="20" height="120" fill="var(--glass-border)" stroke="var(--fg)" strokeWidth="2" rx="3"/>
                <rect x="80" y="-20" width="20" height="40" fill="var(--accent)" stroke="var(--fg)" strokeWidth="2" rx="3"/>
                
                <motion.path 
                  animate={{ opacity: [0.1, 1, 0.1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  d="M-20,-40 L0,-80 M-20,40 L0,80 M20,-80 L40,-40 M20,80 L40,40 M60,-40 L80,-10 M60,40 L80,10" stroke="var(--accent)" strokeWidth="2" fill="none"
                />
                <text x="25" y="150" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold" textAnchor="middle">4. PyTorch CNN</text>
              </motion.g>

              {/* 5. Final Output Diagnostic Panel */}
              <motion.g 
                transform="translate(850, 200)"
                style={{ transformOrigin: "65px 55px" }}
                animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.5, 0.5, 1.1, 1, 0.9, 0.5] }}
                transition={{ duration: 12, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.95, 1] }}
              >
                <rect x="0" y="0" width="130" height="110" fill="var(--bg)" stroke="#FF3B30" strokeWidth="3" rx="8" style={{ filter: 'drop-shadow(0 0 15px rgba(255,59,48,0.5))' }}/>
                <text x="65" y="30" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold" textAnchor="middle">DIAGNOSIS:</text>
                <text x="65" y="65" fill="#FF3B30" fontFamily="var(--font-outfit)" fontSize="24" fontWeight="bold" textAnchor="middle">ANEMIC</text>
                <text x="65" y="90" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="10" textAnchor="middle">Conf: 98.2%</text>
              </motion.g>

              {/* System Console Logs (Bottom) */}
              <motion.g 
                transform="translate(100, 480)"
                animate={{ opacity: [1, 1, 1] }}
              >
                <rect x="0" y="0" width="800" height="90" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" rx="8"/>
                <text x="20" y="30" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">SYSTEM_LOGS &gt;_</text>
                <line x1="20" y1="45" x2="780" y2="45" stroke="var(--glass-border)" strokeWidth="2"/>
                
                {/* Animated typing logs based on timeline */}
                <motion.text x="20" y="65" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12"
                  animate={{ opacity: [0, 1, 1, 0, 0, 0] }}
                  transition={{ duration: 12, repeat: Infinity, times: [0, 0.1, 0.25, 0.3, 0.9, 1] }}
                >
                  &gt; Initializing patient scan... Target acquired. Zooming...
                </motion.text>
                
                <motion.text x="20" y="65" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12"
                  animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                  transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.35, 0.5, 0.55, 1] }}
                >
                  &gt; YOLOv8: Detected fingernail ROI (0.98). Extracted successfully.
                </motion.text>
                
                <motion.text x="20" y="65" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12"
                  animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                  transition={{ duration: 12, repeat: Infinity, times: [0, 0.55, 0.6, 0.7, 0.75, 1] }}
                >
                  &gt; Preprocessing: Grayscale &amp; Convex Hull. Feeding to CNN...
                </motion.text>
                
                <motion.text x="20" y="65" fill="#FF3B30" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold"
                  animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                  transition={{ duration: 12, repeat: Infinity, times: [0, 0.75, 0.8, 0.95, 0.98, 1] }}
                >
                  &gt; DIAGNOSIS: ANEMIC DETECTED (Confidence: 98.2%)
                </motion.text>
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
              
              {/* Background Grid */}
              <g opacity="0.05">
                <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500" stroke="var(--fg)" strokeWidth="1"/>
                <path d="M100,0 L100,600 M200,0 L200,600 M300,0 L300,600 M400,0 L400,600 M500,0 L500,600 M600,0 L600,600 M700,0 L700,600 M800,0 L800,600 M900,0 L900,600" stroke="var(--fg)" strokeWidth="1"/>
              </g>

              {/* Road & Parking Bays */}
              <path d="M0,450 L1000,450 M0,550 L1000,550" stroke="var(--glass-border)" strokeWidth="4" strokeDasharray="20 20"/>
              <rect x="700" y="100" width="140" height="350" fill="none" stroke="var(--fg)" strokeWidth="6" strokeDasharray="30 15"/>
              <text x="730" y="80" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="20" fontWeight="bold">BAY 4 (CAR)</text>

              <rect x="850" y="100" width="120" height="350" fill="none" stroke="var(--fg)" strokeWidth="6" strokeDasharray="30 15"/>
              <text x="860" y="80" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="20" fontWeight="bold">BAY 5 (BIKE)</text>

              {/* Camera / YOLOv8 */}
              <g transform="translate(100, 100)">
                <rect x="0" y="0" width="80" height="50" fill="var(--bg)" stroke="var(--fg)" strokeWidth="4" rx="8"/>
                <circle cx="60" cy="25" r="15" fill="var(--bg)" stroke="var(--accent)" strokeWidth="4"/>
                <text x="-10" y="-15" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="16" fontWeight="bold">Camera (YOLOv8)</text>
                
                {/* Camera Vision Cone */}
                <motion.path 
                  animate={{ opacity: [0.05, 0.2, 0.05] }} 
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
              
              {/* API Signals */}
              <motion.circle 
                animate={{ cx: [180, 450] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                cy="125" r="5" fill="var(--accent)"
              />
              <text x="240" y="115" fill="var(--text-muted)" fontFamily="var(--font-mono)" fontSize="12">PySerial API</text>

              {/* Servo Gate */}
              <g transform="translate(580, 450)">
                <rect x="-10" y="-80" width="20" height="100" fill="var(--bg)" stroke="var(--fg)" strokeWidth="4"/>
                {/* Gate Arm - Animates opening and closing. Rotate around its pivot (10, -62.5) */}
                <motion.rect 
                  animate={{ rotate: [0, -90, -90, 0, 0, -90, -90, 0, 0] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 1] }}
                  style={{ transformOrigin: "10px -62.5px" }}
                  x="10" y="-70" width="350" height="15" fill="var(--accent)" stroke="var(--fg)" strokeWidth="2"
                  rx="5"
                />
              </g>

              {/* Car (First half of animation) */}
              <motion.g 
                animate={{ 
                  x: [-200, 400, 770, 770, 770, -200, -200, -200, -200], 
                  y: [500, 500, 500, 250, 250, 250, 250, 250, 250], 
                  rotate: [0, 0, -90, -90, -90, -90, -90, -90, -90] 
                }} 
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.45, 0.5, 0.5, 1, 1] }}
              >
                <rect x="-60" y="-30" width="120" height="60" rx="15" fill="var(--fg)"/>
                <rect x="-30" y="-25" width="60" height="50" rx="5" fill="var(--bg)"/>
                
                {/* YOLOv8 Detection Box tracking the car exactly */}
                <motion.g
                  animate={{ opacity: [0, 1, 1, 0, 0, 0, 0, 0, 0] }}
                  transition={{ duration: 16, repeat: Infinity, times: [0, 0.05, 0.2, 0.25, 0.5, 0.5, 1, 1, 1] }}
                >
                  <rect x="-70" y="-40" width="140" height="80" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="5 5" />
                  <rect x="-70" y="-60" width="90" height="20" fill="var(--accent)" />
                  <text x="-65" y="-46" fill="var(--bg)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold">CAR 0.99</text>
                </motion.g>
              </motion.g>

              {/* Bike (Second half of animation) */}
              <motion.g 
                animate={{ 
                  x: [-200, -200, -200, -200, 400, 910, 910, 910, -200], 
                  y: [500, 500, 500, 500, 500, 500, 250, 250, 250], 
                  rotate: [0, 0, 0, 0, 0, -90, -90, -90, -90] 
                }} 
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.5, 0.5, 0.6, 0.7, 0.8, 0.95, 1] }}
              >
                <rect x="-30" y="-15" width="60" height="30" rx="10" fill="var(--fg)"/>
                <circle cx="-20" cy="0" r="12" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2"/>
                <circle cx="20" cy="0" r="12" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2"/>
                
                {/* YOLOv8 Detection Box tracking the bike exactly */}
                <motion.g
                  animate={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0, 0] }}
                  transition={{ duration: 16, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 0.6, 0.7, 0.75, 1, 1] }}
                >
                  <rect x="-40" y="-25" width="80" height="50" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="5 5" />
                  <rect x="-40" y="-45" width="95" height="20" fill="var(--accent)" />
                  <text x="-35" y="-31" fill="var(--bg)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="bold">BIKE 0.95</text>
                </motion.g>
              </motion.g>

              {/* YOLO Detection Logs */}
              <motion.g 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0, 0, 1, 1, 0, 0] }}
                transition={{ duration: 16, repeat: Infinity, times: [0, 0.05, 0.2, 0.25, 0.5, 0.55, 0.7, 0.75, 1] }}
                transform="translate(450, 200)"
              >
                <rect x="0" y="0" width="240" height="70" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" rx="5"/>
                <text x="10" y="25" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="bold">YOLOv8_DETECT()</text>
                {/* Changes text based on which part of the loop we're in */}
                <motion.text 
                  animate={{ opacity: [1, 1, 1, 1, 0, 1, 1, 1, 1] }}
                  transition={{ duration: 16, repeat: Infinity, times: [0, 0.45, 0.46, 0.5, 0.5, 0.55, 0.95, 0.96, 1] }}
                  x="10" y="45" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12"
                >
                  &gt; Object Detected...
                </motion.text>
                <text x="10" y="60" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="12">&gt; Command: GATE_OPEN</text>
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
