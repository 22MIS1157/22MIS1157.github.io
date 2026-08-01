import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ════════════════════════════════════════════════════════════════════════
   PROJECT 1: ATCC VPARK — Advanced Technical Engineering CAD & AI Camera SVG Diagram
   Features:
   - High-Precision Technical CAD Vehicle Silhouettes (Car vs Motorcycle)
   - Laser Grid Scan & HUD Intersection Reticle
   - Servo Actuator Gear & Pivoting Barrier Arm
   - Dual Digital LED Segment Readouts (Cars vs Bikes)
   ════════════════════════════════════════════════════════════════════════ */
const VParkVisual = () => {
  const [step, setStep] = useState(0);
  const [vehicleType, setVehicleType] = useState('car'); // 'car' | 'bike'
  const [counts, setCounts] = useState({ cars: 14, bikes: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % 4;
        if (next === 0) {
          // Toggle vehicle type between car and bike
          setVehicleType((v) => (v === 'car' ? 'bike' : 'car'));
        }
        if (next === 3) {
          setCounts((c) => (vehicleType === 'car' ? { ...c, cars: c.cars + 1 } : { ...c, bikes: c.bikes + 1 }));
        }
        return next;
      });
    }, 2600);
    return () => clearInterval(timer);
  }, [vehicleType]);

  return (
    <div className="w-full aspect-[16/10] bg-[#0A0A0C] text-emerald-400 rounded-2xl border border-emerald-500/30 p-5 relative overflow-hidden flex flex-col justify-between font-mono select-none shadow-2xl">
      {/* Background CAD Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" width="100%" height="100%">
        <pattern id="cad-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#10b981" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cad-grid)" />
      </svg>

      {/* Technical HUD Top Bar */}
      <div className="flex items-center justify-between text-[11px] z-10 border-b border-emerald-500/20 pb-2">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span className="font-bold tracking-widest">YOLOV8-CAM-01 [1080P/60FPS]</span>
        </div>

        {/* Digital Segment Counters */}
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40">
            <span className="text-zinc-400">CAR_CNT:</span>
            <span className="text-emerald-300 font-bold tracking-wider">{String(counts.cars).padStart(3, '0')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/40 text-indigo-300">
            <span className="text-zinc-400">BIKE_CNT:</span>
            <span className="font-bold tracking-wider">{String(counts.bikes).padStart(3, '0')}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500 text-black font-bold">
            TOTAL: {counts.cars + counts.bikes}/50
          </div>
        </div>
      </div>

      {/* Main CAD Stage */}
      <div className="relative w-full h-full flex items-center justify-center my-auto overflow-hidden">
        {/* Road Track Lines */}
        <div className="absolute inset-x-0 h-16 border-y border-emerald-500/30 flex items-center justify-between opacity-40">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
        </div>

        {/* Laser Grid Detection Line */}
        <div className="absolute left-1/2 inset-y-0 w-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] z-10 flex flex-col justify-between items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[8px] bg-emerald-950 text-emerald-300 px-1 py-0.5 rounded border border-emerald-500/50">
            LASER_Y_INTERSECT
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Technical Vehicle CAD Representation (Car or Motorcycle Wireframe) */}
        <motion.div
          className="absolute z-20"
          animate={{
            x: step === 0 ? -160 : step === 1 ? 0 : step === 2 ? 90 : 190,
            opacity: step === 3 ? 0 : 1
          }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <div className="relative p-3 rounded-lg bg-black/80 border border-emerald-500/60 shadow-xl flex items-center gap-3">
            {vehicleType === 'car' ? (
              /* Technical Car CAD Vector */
              <svg width="40" height="24" viewBox="0 0 48 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M40 18h4c.6 0 1-.4 1-1v-4c0-1-.8-2-2-2h-3L34 5c-.6-1-1.6-1.5-2.8-1.5H12c-1.2 0-2.2.5-2.8 1.5L4 11H2c-1 0-2 1-2 2v4c0 .6.4 1 1 1h4" />
                <circle cx="12" cy="18" r="4" strokeWidth="2" />
                <circle cx="36" cy="18" r="4" strokeWidth="2" />
                <line x1="16" y1="11" x2="30" y2="11" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            ) : (
              /* Technical Motorcycle CAD Vector */
              <svg width="36" height="24" viewBox="0 0 40 24" fill="none" stroke="#6366f1" strokeWidth="2">
                <circle cx="8" cy="16" r="6" />
                <circle cx="32" cy="16" r="6" />
                <path d="M8 16L18 8H26L32 16M18 8L14 16M26 8L28 4H34" />
              </svg>
            )}

            <div className="flex flex-col text-[9px]">
              <span className="text-white font-bold">{vehicleType === 'car' ? 'CLASS: CAR_04' : 'CLASS: BIKE_09'}</span>
              <span className="text-emerald-400">VELOCITY: 12KM/H</span>
            </div>

            {/* YOLO HUD Reticle Corner Brackets */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-2 border-2 border-emerald-400 rounded pointer-events-none"
              >
                <div className="absolute -top-3 left-0 bg-emerald-400 text-black text-[8px] font-bold px-1 rounded">
                  {vehicleType === 'car' ? 'YOLOv8: CAR (98.6%)' : 'YOLOv8: MOTORCYCLE (97.2%)'}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Servo Motor Actuator & Barrier Gate Arm */}
        <div className="absolute right-1/4 bottom-4 z-30 flex flex-col items-center">
          <motion.div
            className={`w-2 h-24 ${step >= 2 ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-rose-500 shadow-[0_0_12px_#f43f5e]'} rounded-full origin-bottom`}
            animate={{ rotate: step >= 2 ? -85 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-emerald-500/50 flex flex-col items-center justify-center text-[8px] text-zinc-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
            </svg>
            <span>SERVO</span>
          </div>
        </div>
      </div>

      {/* Technical Pipeline Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 z-10 pt-2 border-t border-emerald-500/20">
        <div className="flex items-center gap-2">
          <span className={step === 1 ? 'text-emerald-300 font-bold' : ''}>[01] OPTICAL_SCAN</span>
          <span>➔</span>
          <span className={step === 2 ? 'text-emerald-300 font-bold' : ''}>[02] SERVO_PWM_PULSE</span>
          <span>➔</span>
          <span className={step === 3 ? 'text-emerald-300 font-bold' : ''}>[03] REGISTER_INCREMENT</span>
        </div>
        <span className="text-emerald-400 font-bold">LATENCY: &lt; 850MS</span>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   PROJECT 2: LEXCLOUD AI PIPELINE — AWS Serverless AI Technical Blueprint
   Features:
   - Input Payload Nodes (PDF Vector Parser & Audio FFT Spectrum Engine)
   - AWS API Gateway & Lambda Container Execution Node
   - LLaMA-3 LLM + Vector DB Vector Space Embedding Matrix
   - FastAPI Endpoint JSON Delivery Node
   ════════════════════════════════════════════════════════════════════════ */
const LexCloudVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full aspect-[16/10] bg-[#0A0A0C] text-amber-400 rounded-2xl border border-amber-500/30 p-5 relative overflow-hidden flex flex-col justify-between font-mono select-none shadow-2xl">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" width="100%" height="100%">
        <pattern id="cloud-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#f59e0b" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cloud-grid)" />
      </svg>

      {/* Header */}
      <div className="flex items-center justify-between text-[11px] z-10 border-b border-amber-500/20 pb-2">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
          <span className="font-bold tracking-widest text-amber-300">AWS_SERVERLESS_PIPELINE [REGION: US-EAST-1]</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
          FASTAPI REST [240MS]
        </span>
      </div>

      {/* Technical Blueprint Nodes Stage */}
      <div className="relative w-full h-full flex items-center justify-around my-auto z-10">
        {/* Node 1: Ingestion */}
        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${step === 0 ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-[0_0_15px_#f59e0b]' : 'border-zinc-800 bg-zinc-900/80 text-zinc-400'}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="text-[9px] font-bold">MULTI_INPUT</span>
        </div>

        {/* Data Stream Line 1 */}
        <div className="w-8 h-0.5 bg-zinc-800 relative overflow-hidden">
          {step >= 1 && <motion.div className="w-full h-full bg-amber-400" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.6, repeat: Infinity }} />}
        </div>

        {/* Node 2: AWS Lambda Execution Container */}
        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${step === 1 ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-[0_0_15px_#f59e0b]' : 'border-zinc-800 bg-zinc-900/80 text-zinc-400'}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span className="text-[9px] font-bold">AWS_LAMBDA</span>
        </div>

        {/* Data Stream Line 2 */}
        <div className="w-8 h-0.5 bg-zinc-800 relative overflow-hidden">
          {step >= 2 && <motion.div className="w-full h-full bg-amber-400" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.6, repeat: Infinity }} />}
        </div>

        {/* Node 3: LLaMA-3 + RAG Vector Database Point Cloud */}
        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${step === 2 ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-[0_0_15px_#f59e0b]' : 'border-zinc-800 bg-zinc-900/80 text-zinc-400'}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
          </svg>
          <span className="text-[9px] font-bold">LLAMA3_VECTOR_RAG</span>
        </div>

        {/* Data Stream Line 3 */}
        <div className="w-8 h-0.5 bg-zinc-800 relative overflow-hidden">
          {step >= 3 && <motion.div className="w-full h-full bg-emerald-400" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.6, repeat: Infinity }} />}
        </div>

        {/* Node 4: FastAPI JSON Response Endpoint */}
        <div className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${step === 3 ? 'border-emerald-400 bg-emerald-500/20 scale-105 shadow-[0_0_15px_#10b981] text-emerald-300' : 'border-zinc-800 bg-zinc-900/80 text-zinc-400'}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span className="text-[9px] font-bold">JSON_PAYLOAD_200</span>
        </div>
      </div>

      {/* Technical Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 z-10 pt-2 border-t border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className={step === 1 ? 'text-amber-300 font-bold' : ''}>[01] INGESTION</span>
          <span>➔</span>
          <span className={step === 2 ? 'text-amber-300 font-bold' : ''}>[02] VECTOR_EMBEDDING</span>
          <span>➔</span>
          <span className={step === 3 ? 'text-emerald-300 font-bold' : ''}>[03] FASTAPI_DELIVERY</span>
        </div>
        <span className="text-amber-300 font-bold">PARALLEL_SCALE</span>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   PROJECT 3: ANEMIA DETECT — Technical Computer Vision & Deep Learning Matrix
   Features:
   - Optical Image Matrix Reticle
   - YOLOv8 Spatial Region Auto-Cropping HUD
   - ResNet-50 Convolutional Feature Extraction & Grad-CAM Heatmap
   - Diagnostic Output Calibration Dial
   ════════════════════════════════════════════════════════════════════════ */
const AnemiaVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full aspect-[16/10] bg-[#0A0A0C] text-indigo-400 rounded-2xl border border-indigo-500/30 p-5 relative overflow-hidden flex flex-col justify-between font-mono select-none shadow-2xl">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" width="100%" height="100%">
        <pattern id="cv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6366f1" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cv-grid)" />
      </svg>

      {/* Header */}
      <div className="flex items-center justify-between text-[11px] z-10 border-b border-indigo-500/20 pb-2">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span className="font-bold tracking-widest text-indigo-300">NEURAL_VISION_CV_MATRIX</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold">
          AUC: 0.98 | ACC: 96.0%
        </span>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-full flex items-center justify-center my-auto z-10">
        <div className="relative w-48 h-32 bg-black/80 rounded-xl border border-indigo-500/40 p-2 flex items-center justify-center overflow-hidden">
          {/* Simulated Fingernail Matrix */}
          <div className="relative w-24 h-24 rounded-t-full border border-indigo-400/40 bg-indigo-950/40 flex items-center justify-center">
            {/* YOLO HUD Bounding Box */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-1 border-2 border-indigo-400 rounded-t-full pointer-events-none"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-black text-[7px] font-bold px-1 rounded">
                  YOLO_CROP [mAP: 0.935]
                </div>
              </motion.div>
            )}

            {/* Grad-CAM Heatmap Grid Mesh */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                className="absolute inset-2 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 rounded-t-full blur-xs mix-blend-screen"
              />
            )}
          </div>

          {/* Diagnostic Shield Overlay */}
          {step === 3 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center text-emerald-400 gap-1"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              <span className="text-[10px] font-bold text-white tracking-wider">DIAGNOSTIC: NORMAL</span>
              <span className="text-[8px] text-zinc-400">HEMOGLOBIN SCORE VALIDATED</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Technical Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 z-10 pt-2 border-t border-indigo-500/20">
        <div className="flex items-center gap-2">
          <span className={step === 1 ? 'text-indigo-300 font-bold' : ''}>[01] OPTICAL_INPUT</span>
          <span>➔</span>
          <span className={step === 2 ? 'text-indigo-300 font-bold' : ''}>[02] GRAD_CAM_HEATMAP</span>
          <span>➔</span>
          <span className={step === 3 ? 'text-emerald-300 font-bold' : ''}>[03] DIAGNOSTIC_OUTPUT</span>
        </div>
        <span className="text-indigo-300 font-bold">NON_INVASIVE</span>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   PROJECT 4: ICU MORTALITY PREDICTOR — Clinical Telemetry & XGBoost Graph
   Features:
   - 43-Clinical Feature Stream Matrix
   - 200 Estimators Decision Tree Traversal Graph
   - SHAP Importance Vector Readouts
   - Patient Survival Probability Output Gauge
   ════════════════════════════════════════════════════════════════════════ */
const ICUVisual = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full aspect-[16/10] bg-[#0A0A0C] text-cyan-400 rounded-2xl border border-cyan-500/30 p-5 relative overflow-hidden flex flex-col justify-between font-mono select-none shadow-2xl">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" width="100%" height="100%">
        <pattern id="icu-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#06b6d4" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#icu-grid)" />
      </svg>

      {/* Header */}
      <div className="flex items-center justify-between text-[11px] z-10 border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          <span className="font-bold tracking-widest text-cyan-300">ICU_CLINICAL_TELEMETRY [MIMIC-IV]</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
          XGBOOST [AUC-ROC: 0.96]
        </span>
      </div>

      {/* Center Stage */}
      <div className="relative w-full h-full flex flex-col items-center justify-center my-auto gap-2 z-10">
        {/* ECG Waveform */}
        <svg className="w-full h-10 text-cyan-400" viewBox="0 0 400 60" fill="none">
          <motion.path
            d="M0 30 L80 30 L95 5 L110 55 L125 15 L140 35 L155 30 L400 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* SHAP Importance Vector Weights */}
        <div className="w-full max-w-sm space-y-1.5 text-[10px]">
          <div>
            <div className="flex justify-between">
              <span className="text-zinc-400">SERUM_CREATININE</span>
              <span className="font-bold text-cyan-300">0.42</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <motion.div
                className="h-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? '88%' : '25%' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-zinc-400">SOFA_SEPSIS_SCORE</span>
              <span className="font-bold text-cyan-300">0.31</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <motion.div
                className="h-full bg-indigo-400"
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? '68%' : '20%' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Footer */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 z-10 pt-2 border-t border-cyan-500/20">
        <div className="flex items-center gap-2">
          <span className={step === 1 ? 'text-cyan-300 font-bold' : ''}>[01] 43_FEATURES</span>
          <span>➔</span>
          <span className={step === 2 ? 'text-cyan-300 font-bold' : ''}>[02] 200_TREES</span>
          <span>➔</span>
          <span className={step === 3 ? 'text-emerald-300 font-bold' : ''}>[03] ACC_93.4%</span>
        </div>
        <span className="text-cyan-300 font-bold">SHAP_EXPLAINABLE</span>
      </div>
    </div>
  );
};

const projects = [
  {
    id: 'atcc-vpark',
    num: '01',
    subCategory: 'AI + IoT Smart Parking System with Live Web Dashboard',
    title: 'ATCC VPARK',
    description: 'Designed and delivered a real-time AI parking system using a mobile camera and YOLOv8 to detect and count vehicles. Features an automated Arduino-controlled servo gate (actuation within 1 second) and a FastAPI WebSocket live dashboard.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'Arduino', 'WebSocket'],
    demoUrl: 'https://github.com/22MIS1157/Vpark-Project',
    codeUrl: 'https://github.com/22MIS1157/Vpark-Project',
    VisualComponent: VParkVisual
  },
  {
    id: 'lexcloud-ai',
    num: '02',
    subCategory: 'Cloud-Native AI Data Pipeline with Real-Time API Connectivity (2024)',
    title: 'LEXCLOUD AI PIPELINE',
    description: 'Designed and deployed a cloud-native, serverless data pipeline on AWS— ingesting multi-format inputs (PDFs, audio), processing through an NLP-driven connectivity layer (Groq Whisper, LLaMA-3, Vector DB RAG), and delivering AI responses via REST API endpoints (FastAPI) with sub-second latency.',
    tags: ['Python', 'AWS', 'FastAPI', 'REST API', 'LLaMA-3', 'Groq Whisper', 'RAG', 'Vector DB', 'Serverless'],
    demoUrl: 'https://github.com/22MIS1157',
    codeUrl: 'https://github.com/22MIS1157',
    VisualComponent: LexCloudVisual
  },
  {
    id: 'anemia-detection',
    num: '03',
    subCategory: 'AI System for Non-Invasive Anemia Detection',
    title: 'ANEMIA DETECT',
    description: 'Two-step AI pipeline to detect anemia from fingernail photos – no blood test required. Step 1 detects and crops nail region using YOLOv8 (mAP50: 0.935). Step 2 classifies fingernails using a CNN (96% accuracy, AUC 0.98).',
    tags: ['PyTorch', 'YOLOv8', 'OpenCV', 'Grad-CAM', 'CNN', 'Transfer Learning'],
    demoUrl: 'https://github.com/22MIS1157/Anemia-Detection-Using-Nails',
    codeUrl: 'https://github.com/22MIS1157/Anemia-Detection-Using-Nails',
    VisualComponent: AnemiaVisual
  },
  {
    id: 'icu-mortality',
    num: '04',
    subCategory: 'Machine Learning on Clinical Hospital Data (MIMIC-IV)',
    title: 'ICU MORTALITY PREDICTOR',
    description: 'XGBoost classifier predicting in-hospital mortality for ICU patients with kidney disease and sepsis. Engineered 172 features from 43 clinical measurements – achieving AUC-ROC 0.96 and 93.4% accuracy.',
    tags: ['XGBoost', 'SHAP', 'Scikit-learn', 'Pandas', 'NumPy', 'EDA'],
    demoUrl: 'https://github.com/22MIS1157/Sepsis-Mortality-Prediction',
    codeUrl: 'https://github.com/22MIS1157/Sepsis-Mortality-Prediction',
    VisualComponent: ICUVisual
  }
];

export default function Projects() {
  return (
    <section className="section-spacer w-full bg-[var(--bg)] text-[var(--fg)] relative" style={{ paddingTop: '60px', paddingBottom: '60px' }} id="projects">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[var(--fg)]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--fg)] uppercase">MY WORK</span>
            </div>
            <h2 className="section-heading whitespace-pre-line m-0">
              {"FEATURED\nPROJECTS"}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-inter text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
              Explore technical CAD schematics, cloud architecture blueprints, neural network matrix diagrams, and clinical telemetry HUD simulations.
            </p>
          </div>
        </div>

        {/* STICKY STACKED SCROLL EFFECT (One Project Shown at a Time) */}
        <div className="relative flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => {
            const Visual = project.VisualComponent;
            // Sticky top offset so cards stack gracefully on scroll
            const topOffset = 100 + index * 20;

            return (
              <div
                key={project.id}
                style={{ top: `${topOffset}px` }}
                className="sticky z-10 w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7 }}
                  className="glass-card rounded-3xl p-8 md:p-12 border border-[var(--border)] bg-[var(--bg-card)] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
                >
                  {/* Left Column: Details */}
                  <div className="lg:col-span-6 flex flex-col gap-4 text-left">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                      <span className="text-xs font-mono font-semibold text-[var(--text-secondary)] tracking-wider">
                        {project.subCategory}
                      </span>
                      <span className="font-mono text-xl font-black text-[var(--text-muted)] opacity-50">
                        {project.num}
                      </span>
                    </div>

                    <h3 className="font-grotesk font-black text-3xl md:text-5xl text-[var(--text-primary)] leading-tight uppercase tracking-tight m-0">
                      {project.title}
                    </h3>

                    <p className="font-inter text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-mono font-medium rounded border border-[var(--border)] text-[var(--text-primary)] bg-[var(--bg-elevated)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary group text-xs py-2.5 px-5 flex items-center gap-2"
                        data-cursor="pointer"
                      >
                        <span>View Demo</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                          <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary group text-xs py-2.5 px-5 flex items-center gap-2"
                        data-cursor="pointer"
                      >
                        <span>Source Code</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                          <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Advanced Engineering Schematics & Technical HUD */}
                  <div className="lg:col-span-6" data-cursor="pointer">
                    <Visual />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
