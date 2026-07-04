// ─── Structured Resume Data ───
// Single source of truth for all portfolio content

export const resumeData = {
  personal: {
    name: "Afnaan Ahmed P",
    tagline: "Shinobi of Data Intelligence — Turning Raw Chaos into Structured Chakra",
    realTitle: "Pre-final Year M.Tech Integrated (CSE) Student · Data Intelligence / RAG / AI Pipelines",
    phone: "+91 9150713929",
    email: "Afnaanahmed.k391@gmail.com",
    location: "Ambur, Tamil Nadu",
    linkedin: "https://www.linkedin.com/in/afnaan22mis1157/",
    github: "https://github.com/22MIS1157",
    portfolio: "https://22MIS1157.github.io",
  },

  education: [
    {
      degree: "M.Tech Integrated — Computer Science & Engineering",
      institution: "VIT Chennai",
      period: "2022 – 2027",
      cgpa: "7.92 / 10.00",
      description: "Specializing in Data Intelligence, AI Pipelines, and Cloud Architecture.",
    },
    {
      degree: "Class XII — PCBM",
      institution: "Mazharul Uloom HSS, Ambur",
      period: "2021",
      score: "85.20%",
      description: "",
    },
  ],

  skills: {
    katon: {
      label: "Katon — AI / NLP / RAG",
      element: "fire",
      color: "#FF4E00",
      items: [
        { name: "Python", level: 95 },
        { name: "PyTorch & CNN", level: 94 },
        { name: "LangChain", level: 88 },
        { name: "RAG Pipelines", level: 90 },
        { name: "Embeddings", level: 87 },
        { name: "YOLOv8 & OpenCV", level: 92 },
        { name: "XGBoost", level: 90 },
        { name: "SHAP & Grad-CAM", level: 88 },
      ],
    },
    suiton: {
      label: "Suiton — Databases / SQL",
      element: "water",
      color: "#2EC4B6",
      items: [
        { name: "SQL", level: 90 },
        { name: "Pandas", level: 96 },
        { name: "NumPy", level: 94 },
        { name: "ChromaDB", level: 85 },
        { name: "DynamoDB", level: 88 },
        { name: "Data Cleaning", level: 92 },
      ],
    },
    raiton: {
      label: "Raiton — Cloud / AWS / APIs",
      element: "lightning",
      color: "#7FDBFF",
      items: [
        { name: "AWS Lambda", level: 90 },
        { name: "S3 & DynamoDB", level: 91 },
        { name: "FastAPI", level: 92 },
        { name: "WebSocket Streaming", level: 88 },
        { name: "REST APIs", level: 93 },
        { name: "Git", level: 94 },
      ],
    },
    doton: {
      label: "Doton — Data Engineering / EDA",
      element: "earth",
      color: "#8D6748",
      items: [
        { name: "Feature Engineering", level: 93 },
        { name: "EDA & Visualization", level: 90 },
        { name: "Scikit-learn", level: 91 },
        { name: "Web Scraping", level: 75 },
        { name: "Data Pipelines", level: 88 },
        { name: "Statistical Analysis", level: 86 },
      ],
    },
  },

  projects: [
    {
      id: "lexcloud",
      title: "LexCloud — Serverless REST API with RAG Intelligence",
      subtitle: "AWS Serverless Architecture · LLaMA-3 + ChromaDB Pipeline",
      rank: "S-Rank",
      description:
        "Architected REST endpoints on AWS Lambda, storing assets in S3 & DynamoDB. Integrated LLaMA-3 and ChromaDB vector store RAG pipelines for serverless document searches with semantic retrieval capabilities.",
      tech: ["Python", "FastAPI", "AWS Lambda", "S3", "DynamoDB", "LLaMA-3", "RAG", "ChromaDB"],
      metrics: [
        { value: "5", label: "AWS Integrations" },
        { value: "RAG", label: "Retrieval Engine" },
        { value: "100%", label: "Serverless" },
      ],
      year: "2024",
      github: "https://github.com/22MIS1157",
      element: "lightning",
    },
    {
      id: "sepsis",
      title: "ICU Patient Mortality Prediction — Clinical ML",
      subtitle: "XGBoost on MIMIC-IV · 172 Clinical Features",
      rank: "S-Rank",
      description:
        "Engineered 172 clinical features from 43 patient measurements in MIMIC-IV. XGBoost classifier achieved 0.96 AUC-ROC and 93.4% survival classification accuracy. Validated via SHAP values for clinical interpretability.",
      tech: ["Python", "XGBoost", "SHAP", "Scikit-learn", "Pandas", "NumPy", "MIMIC-IV"],
      metrics: [
        { value: "0.96", label: "AUC-ROC" },
        { value: "172", label: "Features" },
        { value: "+16%", label: "vs Baselines" },
      ],
      year: "2026",
      github: "https://github.com/22MIS1157",
      element: "earth",
    },
    {
      id: "anemia",
      title: "Non-Invasive Anemia Detection from Fingernail Images",
      subtitle: "Deep Learning Medical AI · Grad-CAM Explainability",
      rank: "A-Rank",
      description:
        "Built two-stage AI pipeline. Stage 1: automatic nail bed localized cropping (93.5% accuracy). Stage 2: anemia classifier (96% accuracy, 0.98 AUC). Validated on 251 patients with Grad-CAM activation mapping.",
      tech: ["Python", "PyTorch", "YOLOv8", "OpenCV", "CNN", "Grad-CAM"],
      metrics: [
        { value: "0.98", label: "AUC Score" },
        { value: "251", label: "Patients" },
        { value: "Grad-CAM", label: "XAI" },
      ],
      year: "2025",
      github: "https://github.com/22MIS1157",
      element: "fire",
    },
    {
      id: "vpark",
      title: "ATCC VPark — Real-time Parking Intelligence System",
      subtitle: "AI + IoT Vehicle Detection & Automated Gate Control",
      rank: "A-Rank",
      description:
        "Deployed YOLOv8 on mobile camera streams for real-time vehicle classification, sending immediate gate actuation signals to an Arduino Nano within 1 second. Built full FastAPI WebSocket streaming dashboards.",
      tech: ["Python", "YOLOv8", "Arduino Nano", "FastAPI", "WebSocket", "PySerial"],
      metrics: [
        { value: "<1s", label: "Gate Actuation" },
        { value: "Real-time", label: "Dashboard" },
        { value: "Full-Stack", label: "HW+SW" },
      ],
      year: "2026",
      github: "https://github.com/22MIS1157",
      element: "lightning",
    },
  ],

  experience: [
    {
      title: "Research Intern — Smart Healthcare AI",
      organization: "CHAIR, VIT Chennai",
      period: "May – August 2025",
      rank: "Chunin",
      description:
        "Led independent deep learning research project. Trained PyTorch CNN pipeline on 4,260 medical images. Achieved 96% classification accuracy and AUC 0.98. Fully autonomous from data collection through model deployment.",
      certificate:
        "https://vitchennaievents.com/certificates/generate.php?c=VDJPc09rRXRJbDgoSUJrK1Fqc2xnVXFWQWcybS9ZT01KOGcyV3ZPSmNORGFjM2Zuakxaall1bVVoME00ZHFxUllhQmh5S1dLbjZqcVpxSXVIMDhXQjZVS3g1UUxkeENkRml1RmVmTXZqVUJSdWtXMGVoWXNTUEpSc0VSZVdSNUF2ejBqYVk0ajE4Zm82Wmxkbm9HaCt6MW9GS0ZFS1AyOVBwVlltQTJtTEdRPQ==",
    },
    {
      title: "Python Training Intern",
      organization: "Colan Infotech Pvt Ltd",
      period: "June – July 2024",
      rank: "Genin",
      grade: "S (Outstanding)",
      description:
        "Professional Python training program covering software development lifecycle, Git version control, and Agile methodology. Received highest possible performance grade.",
    },
  ],

  certifications: [
    {
      title: "Generative AI Foundations",
      issuer: "LinkedIn Learning",
      year: "2024",
    },
    {
      title: "CHAIR Research Internship Certificate",
      issuer: "VIT Chennai",
      year: "2025",
    },
  ],

  activities: [
    {
      role: "Cybersecurity Core Member",
      organization: "Microsoft Innovations Club",
      description: "Organized CTF events with 500+ participants.",
      icon: "⚔",
    },
    {
      role: "Marketing Lead",
      organization: "AR/VR Club",
      description: "Achieved 30% registration growth through targeted campaigns.",
      icon: "🥽",
    },
    {
      role: "Operations Member",
      organization: "Fraternity of Young Innovators",
      description: "Coordinated university-level hackathons and innovation events.",
      icon: "💡",
    },
  ],
} as const;

export type ResumeData = typeof resumeData;
