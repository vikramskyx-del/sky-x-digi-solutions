'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function MarketingScene() {
  const barsRef = useRef<THREE.Group>(null);
  const chartGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (chartGroup.current) {
      chartGroup.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    }
    if (barsRef.current) {
      barsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const targetScaleY = 1 + Math.sin(t * 2 + i * 0.6) * 0.45;
        mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, targetScaleY, 0.1);
      });
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
      <group ref={chartGroup}>
        {/* Holographic Dashboard Plane Base */}
        <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[3.2, 0.05, 2]} />
          <meshStandardMaterial
            color="#002b40"
            metalness={0.8}
            roughness={0.2}
            emissive="#001a28"
          />
        </mesh>

        {/* 3D Bar Chart */}
        <group ref={barsRef} position={[-1.2, -0.6, 0]}>
          {[0.8, 1.3, 1.0, 1.7, 1.4, 2.1, 2.5].map((h, i) => (
            <mesh
              key={i}
              position={[i * 0.4, h / 2, 0]}
              scale={[1, 1, 1]}
            >
              <boxGeometry args={[0.22, h, 0.22]} />
              <meshStandardMaterial
                color="#00d4ff"
                emissive="#0096cc"
                emissiveIntensity={0.8}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>

        {/* Analytics Growth Line */}
        <mesh position={[0, 0.4, 0.3]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.03, 0.03, 2.6, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Floating Stat Spheres */}
        <mesh position={[1.1, 1.1, 0.5]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1.2}
          />
        </mesh>

        <mesh position={[-1.1, 0.9, 0.3]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={1.2}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}
