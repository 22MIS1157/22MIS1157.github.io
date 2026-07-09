import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

function AbstractShape() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <Sphere args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="var(--accent)"
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--bg)]">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <AbstractShape />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Hero Typography Foreground */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-mono text-[var(--accent)] text-lg md:text-xl tracking-[0.2em] mb-4 uppercase"
        >
          Cinematic Portfolio
        </motion.p>
        
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex space-x-2 md:space-x-4 mb-2"
          >
            {"AFNAAN".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.8 + index * 0.1, type: "spring", bounce: 0.5 }}
                className="text-6xl md:text-8xl font-black text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent)] uppercase"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="flex space-x-1 md:space-x-3"
          >
            {"AHMED P".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 1.2 + index * 0.1, type: "spring", bounce: 0.5 }}
                className="text-7xl md:text-9xl font-black text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent)] uppercase"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 flex flex-col items-center z-10"
      >
        <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] mb-2 uppercase">Scroll Down</span>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-[var(--accent)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
