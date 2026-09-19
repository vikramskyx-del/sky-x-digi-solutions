'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function WebsiteScene() {
  const browserRef = useRef<THREE.Group>(null);
  const card1Ref = useRef<THREE.Mesh>(null);
  const card2Ref = useRef<THREE.Mesh>(null);
  const card3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (browserRef.current) {
      browserRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
      browserRef.current.rotation.x = Math.cos(t * 0.25) * 0.1;
    }
    if (card1Ref.current) {
      card1Ref.current.position.z = 0.3 + Math.sin(t * 1.5) * 0.15;
    }
    if (card2Ref.current) {
      card2Ref.current.position.z = 0.5 + Math.cos(t * 1.5) * 0.15;
    }
    if (card3Ref.current) {
      card3Ref.current.position.z = 0.4 + Math.sin(t * 1.8 + 1) * 0.12;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.6}>
      <group ref={browserRef}>
        {/* Main Browser Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 2.1, 0.08]} />
          <meshStandardMaterial
            color="#080816"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Browser Top Bar */}
        <mesh position={[0, 0.95, 0.05]}>
          <boxGeometry args={[3.1, 0.18, 0.03]} />
          <meshStandardMaterial color="#1a1a30" />
        </mesh>

        {/* Traffic Light Dots */}
        {[-1.3, -1.15, -1.0].map((x, i) => (
          <mesh key={i} position={[x, 0.95, 0.08]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial
              color={i === 0 ? '#ef4444' : i === 1 ? '#eab308' : '#22c55e'}
              emissive={i === 0 ? '#ef4444' : i === 1 ? '#eab308' : '#22c55e'}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* Floating UI Layer 1 - Hero Block */}
        <mesh ref={card1Ref} position={[-0.6, 0.3, 0.3]}>
          <boxGeometry args={[1.5, 0.8, 0.06]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#43148f"
            emissiveIntensity={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>

        {/* Floating UI Layer 2 - Side Component */}
        <mesh ref={card2Ref} position={[0.8, 0.3, 0.5]}>
          <boxGeometry args={[0.9, 0.8, 0.06]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#0080aa"
            emissiveIntensity={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Floating UI Layer 3 - Feature Cards */}
        <mesh ref={card3Ref} position={[0, -0.45, 0.4]}>
          <boxGeometry args={[2.5, 0.45, 0.06]} />
          <meshStandardMaterial
            color="#c9a227"
            emissive="#6e5509"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Neon Wireframe Outline */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[3.25, 2.15, 0.01]} />
          <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}
