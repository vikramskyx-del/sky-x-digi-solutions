'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlowingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = (gridRef.current.position.z + delta * 0.8) % 1;
    }
  });

  return (
    <group position={[0, -2, 0]} rotation={[0.2, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[30, 30, '#C5A880', '#4E4437']}
        position={[0, 0, 0]}
      />
    </group>
  );
}
