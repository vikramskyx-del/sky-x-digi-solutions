'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function AbstractSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Nodes on sphere surface
  const nodes = useMemo(() => {
    const pts = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.35;
      pts.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number]);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;

    if (groupRef.current) {
      // Subtle mouse reaction and continuous rotation
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.3,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouseX * 0.3,
        0.05
      );
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.4;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.3;
      ring3Ref.current.rotation.z += delta * 0.4;
    }

    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Glowing Distorted Inner Core */}
        <mesh ref={coreRef} scale={1.05}>
          <sphereGeometry args={[1.1, 48, 48]} />
          <MeshDistortMaterial
            color="#059669"
            emissive="#047857"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            distort={0.35}
            speed={2.2}
            wireframe={true}
          />
        </mesh>

        {/* Semi-transparent Inner Hologram */}
        <mesh scale={0.92}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
            roughness={0.2}
          />
        </mesh>

        {/* Outer Orbit Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.75, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#059669"
            emissive="#059669"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>

        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.95, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>

        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.15, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#34D399"
            emissive="#34D399"
            emissiveIntensity={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Surface Connected Nodes */}
        <group ref={nodesGroupRef}>
          {nodes.map((pos, idx) => (
            <mesh key={idx} position={pos}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial
                color={idx % 3 === 0 ? '#059669' : idx % 3 === 1 ? '#10B981' : '#34D399'}
                emissive={idx % 3 === 0 ? '#059669' : idx % 3 === 1 ? '#10B981' : '#34D399'}
                emissiveIntensity={1.5}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}
