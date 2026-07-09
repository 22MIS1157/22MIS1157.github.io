import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Float } from '@react-three/drei';
import { useTheme } from './ThemeContext';

const skills = [
  "Python", "Java", "JavaScript", "C", "C++", "SQL",
  "React", "Next.js", "Framer Motion", "Tailwind", "Three.js",
  "Node.js", "Express", "FastAPI", "REST API",
  "PyTorch", "TensorFlow", "YOLOv8", "OpenCV", "Scikit-Learn",
  "AWS Lambda", "DynamoDB", "S3", "MySQL", "MongoDB",
  "Git", "Docker", "Agile", "IoT", "Arduino"
];

function SkillNode({ skill, position, accentColor }) {
  const ref = useRef();
  
  // Orbit logic
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t / 4) * 0.5;
    ref.current.rotation.x = Math.cos(t / 4) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <group ref={ref}>
        {/* Core glowing sphere */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
        </mesh>
        
        {/* HTML Tag hovering over the sphere */}
        <Html center distanceFactor={15} zIndexRange={[100, 0]}>
          <div className="px-3 py-1.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md text-[var(--fg)] font-bold text-sm whitespace-nowrap shadow-xl hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors duration-300 cursor-pointer">
            {skill}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function SkillCloud({ accentColor }) {
  const groupRef = useRef();

  // Rotate the entire cloud slowly
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  // Distribute skills spherically
  const nodes = useMemo(() => {
    return skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const r = 8; // Radius of the cloud
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      return { skill, position: [x, y, z] };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <SkillNode key={i} skill={node.skill} position={node.position} accentColor={accentColor} />
      ))}
    </group>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#FFEA00' : '#1E56CD';

  return (
    <section className="relative w-full h-[800px] flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden" id="skills">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          {theme === 'dark' && <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}
          <SkillCloud accentColor={accentColor} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false}
          />
        </Canvas>
      </div>

      <div className="absolute bottom-10 z-10 w-full text-center pointer-events-none">
        <p className="font-mono text-[var(--text-muted)] text-sm tracking-widest uppercase">
          Drag to rotate the technology constellation
        </p>
      </div>
    </section>
  );
}
