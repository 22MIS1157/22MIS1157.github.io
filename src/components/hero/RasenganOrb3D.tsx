"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/lib/store";
import * as THREE from "three";

// Custom shader for the Rasengan swirling vortex effect
const RasenganShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorCore: { value: new THREE.Color("#ffffff") },
    uColorEdge: { value: new THREE.Color("#3AA0FF") },
    uColorOuter: { value: new THREE.Color("#0055ff") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Add subtle noise displacement to make the sphere feel alive
      vec3 displacedPos = position + normal * sin(position.y * 10.0 + uTime * 5.0) * 0.03;
      vPosition = displacedPos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColorCore;
    uniform vec3 uColorEdge;
    uniform vec3 uColorOuter;

    // Simple noise generator
    float noise(vec2 p) {
      return sin(p.x * 10.0 + uTime * 2.0) * cos(p.y * 10.0 - uTime * 2.0);
    }

    void main() {
      // Swirling coordinate math
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = vUv - center;
      float dist = length(toCenter);
      
      // Calculate angle for spiral swirl
      float angle = atan(toCenter.y, toCenter.x);
      float swirl = sin(angle * 5.0 - dist * 30.0 + uTime * 8.0);
      
      // Fresnel effect for edge glow
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      // Swirl texture map
      float pattern = smoothstep(0.1, 0.8, swirl * 0.5 + 0.5);
      
      // Mix colors based on center distance, swirl pattern, and fresnel glow
      vec3 color = mix(uColorCore, uColorEdge, dist * 2.0);
      color = mix(color, uColorOuter, pattern * 0.5);
      color += uColorEdge * fresnel * 1.5; // intense edge glow
      
      // Fade out at extreme borders for gaseous look
      float alpha = smoothstep(0.5, 0.2, dist) + fresnel * 0.5;
      
      gl_FragColor = vec4(color, alpha * 0.85);
    }
  `,
};

function SwirlingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Swirl rotation
      meshRef.current.rotation.y = time * 2.0;
      meshRef.current.rotation.x = time * 0.5;
      
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = time;
      }
    }
    
    if (outerMeshRef.current) {
      // Counter rotation for outer shell
      outerMeshRef.current.rotation.y = -time * 1.2;
      outerMeshRef.current.rotation.z = time * 0.8;
      
      const material = outerMeshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = time * 1.5;
      }
    }
  });

  return (
    <group>
      {/* Rasengan Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <shaderMaterial
          args={[
            {
              ...RasenganShader,
              transparent: true,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </mesh>

      {/* Swirling Outer Ring Layer */}
      <mesh ref={outerMeshRef} scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <shaderMaterial
          args={[
            {
              ...RasenganShader,
              transparent: true,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide,
            },
          ]}
        />
      </mesh>
    </group>
  );
}

export default function RasenganOrb3D() {
  const lowFxMode = usePortfolioStore((s) => s.lowFxMode);

  if (lowFxMode) {
    // Fallback static design for performance mode
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffffff 0%, var(--rasengan) 40%, transparent 70%)",
            boxShadow: "0 0 50px var(--rasengan)",
            animation: "pulse 2s infinite alternate",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.8,
        mixBlendMode: "screen",
      }}
    >
      <Canvas camera={{ position: [0, 0, 4.2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <SwirlingSphere />
      </Canvas>
    </div>
  );
}
