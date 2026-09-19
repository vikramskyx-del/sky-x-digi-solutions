'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const stages = [
  { name: 'Customer', pos: [-1.8, 0, 0] as [number, number, number], color: '#22c55e' },
  { name: 'WhatsApp', pos: [-0.9, 0, 0] as [number, number, number], color: '#25D366' },
  { name: 'AI Bot', pos: [0, 0, 0] as [number, number, number], color: '#00d4ff' },
  { name: 'CRM', pos: [0.9, 0, 0] as [number, number, number], color: '#7c3aed' },
  { name: 'Business', pos: [1.8, 0, 0] as [number, number, number], color: '#c9a227' },
];

export default function WhatsAppScene() {
  const pulseGroup = useRef<THREE.Group>(null);
  const msg1 = useRef<THREE.Mesh>(null);
  const msg2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 1.5;
    if (msg1.current) {
      const p = (t % 3) / 3;
      msg1.current.position.x = -1.8 + p * 3.6;
      msg1.current.position.y = Math.sin(p * Math.PI) * 0.4;
    }
    if (msg2.current) {
      const p = ((t + 1.5) % 3) / 3;
      msg2.current.position.x = -1.8 + p * 3.6;
      msg2.current.position.y = -Math.sin(p * Math.PI) * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={pulseGroup}>
        {/* Stages */}
        {stages.map((st, i) => (
          <group key={i} position={st.pos}>
            {/* Stage Sphere */}
            <mesh>
              <sphereGeometry args={[0.3, 24, 24]} />
              <meshStandardMaterial
                color={st.color}
                emissive={st.color}
                emissiveIntensity={0.7}
                roughness={0.2}
              />
            </mesh>

            {/* Orbiting Halo */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.42, 0.015, 8, 32]} />
              <meshBasicMaterial color={st.color} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}

        {/* Messaging Arcs */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 3.8, 16]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.3} />
        </mesh>

        {/* Message Particles */}
        <mesh ref={msg1} position={[-1.8, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#25D366"
            emissive="#25D366"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh ref={msg2} position={[-1.8, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}
