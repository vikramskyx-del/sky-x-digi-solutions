'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const nodes = [
  { name: 'Frontend', pos: [-1.8, 0, 0] as [number, number, number], color: '#059669' },
  { name: 'API', pos: [-0.9, 0, 0] as [number, number, number], color: '#10B981' },
  { name: 'Microservices', pos: [0, 0, 0] as [number, number, number], color: '#047857' },
  { name: 'Database', pos: [0.9, 0, 0] as [number, number, number], color: '#34D399' },
  { name: 'Cloud', pos: [1.8, 0, 0] as [number, number, number], color: '#059669' },
];

export default function SoftwareArchitecture() {
  const packetRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * 1.4) % 4; // 0 to 4
    if (packetRef.current) {
      // Map 0..4 to range -1.8 to 1.8
      packetRef.current.position.x = -1.8 + (t / 4) * 3.6;
      packetRef.current.position.y = Math.sin(t * Math.PI * 2) * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.x = 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Connection Highway Line */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.8, 16]} />
          <meshBasicMaterial color="#059669" transparent opacity={0.4} />
        </mesh>
        <primitive
          object={
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-1.9, 0, 0),
                new THREE.Vector3(1.9, 0, 0),
              ]),
              new THREE.LineDashedMaterial({
                color: 0x059669,
                dashSize: 0.1,
                gapSize: 0.05,
              })
            )
          }
        />

        {/* Architecture Nodes */}
        {nodes.map((node, i) => (
          <group key={i} position={node.pos}>
            {/* Outer Hexagon / Box */}
            <mesh>
              <boxGeometry args={[0.55, 0.55, 0.55]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.6}
                roughness={0.2}
                metalness={0.8}
                wireframe={i === 2}
              />
            </mesh>

            {/* Orbiting Halo */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.42, 0.015, 8, 32]} />
              <meshBasicMaterial color={node.color} />
            </mesh>
          </group>
        ))}

        {/* Traveling Glowing Data Packet */}
        <mesh ref={packetRef} position={[-1.8, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00d4ff"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>
    </Float>
  );
}
