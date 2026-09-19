'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingObjects() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.4;
      mesh1.current.rotation.y += delta * 0.3;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y -= delta * 0.5;
      mesh2.current.rotation.z += delta * 0.2;
    }
    if (mesh3.current) {
      mesh3.current.rotation.x += delta * 0.3;
      mesh3.current.rotation.z -= delta * 0.4;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={mesh1} position={[-2.2, 1.2, -1]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#005277"
            wireframe
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh ref={mesh2} position={[2.4, -1, -0.5]}>
          <torusKnotGeometry args={[0.4, 0.12, 64, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#3b1d75"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={mesh3} position={[-1.8, -1.5, 0.5]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#c9a227"
            emissive="#614a05"
            wireframe
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}
