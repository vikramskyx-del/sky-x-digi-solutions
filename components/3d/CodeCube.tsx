'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function CodeCube() {
  const outerBox = useRef<THREE.Mesh>(null);
  const innerBox = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerBox.current) {
      outerBox.current.rotation.x += delta * 0.35;
      outerBox.current.rotation.y += delta * 0.5;
    }
    if (innerBox.current) {
      innerBox.current.rotation.x -= delta * 0.6;
      innerBox.current.rotation.y -= delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.7;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <group>
        {/* Outer Wireframe Cyber Cube in Emerald Green */}
        <mesh ref={outerBox}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial
            color="#059669"
            wireframe
            roughness={0.1}
            emissive="#0D2016"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Inner Solid Core in Mint Emerald */}
        <mesh ref={innerBox}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Orbit Ring in Soft Celadon */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#34D399"
            emissive="#34D399"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>
    </Float>
  );
}
