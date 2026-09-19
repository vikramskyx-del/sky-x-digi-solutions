'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function DigitalGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Generate worldwide connection points
  const points = useMemo(() => {
    const pts: { pos: [number, number, number]; isIndia?: boolean }[] = [];
    const count = 120;
    const r = 1.6;

    for (let i = 0; i < count; i++) {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * 2 * Math.PI;
      pts.push({
        pos: [
          r * Math.cos(lat) * Math.sin(lon),
          r * Math.sin(lat),
          r * Math.cos(lat) * Math.cos(lon),
        ],
      });
    }

    // Explicit India Coordinate (approx Lat 12.5° N, Lon 78° E for Krishnagiri/Bengaluru region)
    const indiaLat = 12.5 * (Math.PI / 180);
    const indiaLon = 78.2 * (Math.PI / 180);
    pts.push({
      pos: [
        r * Math.cos(indiaLat) * Math.sin(indiaLon),
        r * Math.sin(indiaLat),
        r * Math.cos(indiaLat) * Math.cos(indiaLon),
      ],
      isIndia: true,
    });

    return pts;
  }, []);

  // Connected arcs between points
  const lines = useMemo(() => {
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < 28; i++) {
      const idx1 = Math.floor(Math.random() * (points.length - 1));
      const idx2 = (idx1 + Math.floor(Math.random() * 10) + 1) % points.length;
      segments.push([
        new THREE.Vector3(...points[idx1].pos),
        new THREE.Vector3(...points[idx2].pos),
      ]);
    }
    return segments;
  }, [points]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
      globeRef.current.rotation.x = 0.2;
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={globeRef}>
        {/* Wireframe Globe Sphere in Emerald Green */}
        <mesh>
          <sphereGeometry args={[1.6, 24, 24]} />
          <meshBasicMaterial
            color="#059669"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Inner Dark Shadow Core */}
        <mesh>
          <sphereGeometry args={[1.52, 32, 32]} />
          <meshStandardMaterial
            color="#0D2016"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Outer Latitude / Longitude Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.75, 0.008, 16, 80]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0.4, 0.6, 0]}>
          <torusGeometry args={[1.85, 0.006, 16, 80]} />
          <meshBasicMaterial color="#059669" transparent opacity={0.45} />
        </mesh>

        {/* Points & Hubs */}
        {points.map((pt, i) => (
          <group key={i} position={pt.pos}>
            {pt.isIndia ? (
              <>
                <mesh ref={pulseRef}>
                  <sphereGeometry args={[0.07, 16, 16]} />
                  <meshStandardMaterial
                    color="#10B981"
                    emissive="#10B981"
                    emissiveIntensity={2}
                  />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.12, 16, 16]} />
                  <meshBasicMaterial color="#059669" wireframe transparent opacity={0.6} />
                </mesh>
              </>
            ) : (
              <mesh>
                <sphereGeometry args={[0.022, 8, 8]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#059669' : '#10B981'}
                  emissive={i % 2 === 0 ? '#059669' : '#10B981'}
                  emissiveIntensity={1.2}
                />
              </mesh>
            )}
          </group>
        ))}

        {/* Global Connection Arcs */}
        {lines.map((line, idx) => {
          const curve = new THREE.QuadraticBezierCurve3(
            line[0],
            line[0].clone().add(line[1]).multiplyScalar(0.5).normalize().multiplyScalar(1.9),
            line[1]
          );
          const pts = curve.getPoints(20);
          const geom = new THREE.BufferGeometry().setFromPoints(pts);

          return (
            <primitive
              key={idx}
              object={
                new THREE.Line(
                  geom,
                  new THREE.LineBasicMaterial({
                    color: idx % 2 === 0 ? 0x059669 : 0x10B981,
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
