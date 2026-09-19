'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function MobileScene() {
  const phone1Ref = useRef<THREE.Group>(null);
  const phone2Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (phone1Ref.current) {
      phone1Ref.current.rotation.y = -0.3 + Math.sin(t * 0.5) * 0.3;
      phone1Ref.current.rotation.x = 0.15 + Math.cos(t * 0.4) * 0.1;
    }
    if (phone2Ref.current) {
      phone2Ref.current.rotation.y = 0.35 + Math.cos(t * 0.5) * 0.3;
      phone2Ref.current.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.1;
    }
  });

  return (
    <group>
      {/* Phone 1 - Left / Front */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={phone1Ref} position={[-0.7, 0.1, 0.4]}>
          {/* Phone Body */}
          <mesh>
            <boxGeometry args={[1.2, 2.3, 0.12]} />
            <meshStandardMaterial
              color="#0d0d1a"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Screen */}
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[1.08, 2.15]} />
            <meshStandardMaterial
              color="#061226"
              emissive="#00d4ff"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Glowing App Elements on Screen */}
          <mesh position={[0, 0.7, 0.07]}>
            <planeGeometry args={[0.9, 0.35]} />
            <meshStandardMaterial color="#c9a227" emissive="#c9a227" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0.1, 0.07]}>
            <planeGeometry args={[0.9, 0.5]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} wireframe />
          </mesh>
          <mesh position={[0, -0.6, 0.07]}>
            <planeGeometry args={[0.9, 0.45]} />
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.6} />
          </mesh>

          {/* Edge Glow */}
          <mesh>
            <boxGeometry args={[1.22, 2.32, 0.14]} />
            <meshBasicMaterial color="#c9a227" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Phone 2 - Right / Back */}
      <Float speed={2.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <group ref={phone2Ref} position={[0.9, -0.2, -0.4]}>
          {/* Phone Body */}
          <mesh>
            <boxGeometry args={[1.2, 2.3, 0.12]} />
            <meshStandardMaterial
              color="#100b24"
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Screen */}
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[1.08, 2.15]} />
            <meshStandardMaterial
              color="#130728"
              emissive="#7c3aed"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Screen Content */}
          <mesh position={[0, 0.5, 0.07]}>
            <planeGeometry args={[0.85, 0.5]} />
            <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, -0.2, 0.07]}>
            <planeGeometry args={[0.85, 0.5]} />
            <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.7} />
          </mesh>

          {/* Edge Glow */}
          <mesh>
            <boxGeometry args={[1.22, 2.32, 0.14]} />
            <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
