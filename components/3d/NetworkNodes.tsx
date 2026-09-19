'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function NetworkNodes({ count = 24 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const [nodes, connections] = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      pts.push([
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      ]);
    }

    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const v1 = new THREE.Vector3(...pts[i]);
        const v2 = new THREE.Vector3(...pts[j]);
        if (v1.distanceTo(v2) < 1.6) {
          lines.push([v1, v2]);
        }
      }
    }
    return [pts, lines];
  }, [count]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef}>
        {nodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#059669' : '#10B981'}
              emissive={idx % 2 === 0 ? '#059669' : '#10B981'}
              emissiveIntensity={1.8}
            />
          </mesh>
        ))}

        {connections.map((pair, idx) => {
          const geom = new THREE.BufferGeometry().setFromPoints(pair);
          return (
            <primitive
              key={idx}
              object={
                new THREE.Line(
                  geom,
                  new THREE.LineBasicMaterial({
                    color: 0x059669,
                    transparent: true,
                    opacity: 0.35,
                  })
                )
              }
            />
          );
        })}
      </group>
    </Float>
  );
}
