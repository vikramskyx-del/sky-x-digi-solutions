'use client';
import { Suspense, ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

interface SceneProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  interactive?: boolean;
}

function Loader() {
  return null;
}

export default function Scene({
  children,
  className = 'w-full h-full',
  cameraPosition = [0, 0, 5],
  fov = 50,
}: SceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`${className} flex items-center justify-center bg-transparent`}>
        <div className="w-8 h-8 rounded-full border border-[#C5A880]/30 border-t-[#FAF7F2] animate-spin" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d4ff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#ffffff" />
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
