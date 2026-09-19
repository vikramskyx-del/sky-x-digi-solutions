'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function StrategyScene() {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (beaconRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.25;
      beaconRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, -0.3, 0]}>
        {/* Curved Path Steps */}
        {[
          { pos: [-1.4, -0.6, 0.8], label: 'Audit' },
          { pos: [-0.6, -0.2, 0.3], label: 'Plan' },
          { pos: [0.2, 0.2, -0.2], label: 'Execute' },
          { pos: [1.0, 0.7, -0.6], label: 'Scale' },
        ].map((step, idx) => (
          <group key={idx} position={step.pos as [number, number, number]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.35, 0.1, 16]} />
              <meshStandardMaterial
                color="#f472b6"
                emissive="#9d174d"
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} />
            </mesh>
          </group>
        ))}

        {/* Path Connecting Tube */}
        <primitive
          object={
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-1.4, -0.5, 0.8),
                new THREE.Vector3(-0.6, -0.1, 0.3),
                new THREE.Vector3(0.2, 0.3, -0.2),
                new THREE.Vector3(1.0, 0.8, -0.6),
                new THREE.Vector3(1.4, 1.3, -0.8),
              ]),
              new THREE.LineBasicMaterial({
                color: 0xf472b6,
                linewidth: 2,
              })
            )
          }
        />

        {/* Glowing Ultimate Destination Beacon */}
        <group position={[1.4, 1.3, -0.8]}>
          <mesh ref={beaconRef}>
            <octahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.6, 0.02, 16, 32]} />
            <meshBasicMaterial color="#00d4ff" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
