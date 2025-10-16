'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import AnimatedRunner from './AnimatedRunner';
import SpaceRewards from './SpaceRewards';
import { RoutePoint, Milestone } from '@/lib/mockData';

interface Earth3DProps {
  route: RoutePoint[];
  cameraDistance?: number;
  showRoute?: boolean;
}

function EarthGlobe({ route, showRoute = true }: { route: RoutePoint[], showRoute: boolean }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  // Rotate Earth slowly
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0012;
    }
  });

  // Convert GPS coordinates to 3D sphere coordinates with elevated arc
  const routePoints = useMemo(() => {
    return route.map((point, index) => {
      const lat = (point.lat * Math.PI) / 180;
      const lng = (point.lng * Math.PI) / 180;
      
      // Make the route arc upward - add extra height in the middle
      const progress = index / (route.length - 1);
      const arcHeight = Math.sin(progress * Math.PI) * 0.3; // Arc peaks at 0.3 units
      const radius = 2.02 + arcHeight;
      
      const x = radius * Math.cos(lat) * Math.cos(lng);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lng);
      
      return new THREE.Vector3(x, y, z);
    });
  }, [route]);

  return (
    <group>
      {/* Earth */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Clouds */}
      <Sphere ref={cloudRef} args={[2.01, 64, 64]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={1}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial
          color="#4d7cff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Route line */}
      {showRoute && routePoints.length > 1 && (
        <Line
          points={routePoints}
          color="#00ffff"
          lineWidth={5}
          transparent
          opacity={1}
        />
      )}

      {/* Route start point */}
      {showRoute && routePoints[0] && (
        <mesh position={routePoints[0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      )}

      {/* Route end point */}
      {showRoute && routePoints[routePoints.length - 1] && (
        <mesh position={routePoints[routePoints.length - 1]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </group>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 50;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Earth3D({ route, cameraDistance = 8, showRoute = true }: Earth3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [cameraDistance, 0, 0], fov: 45 }}
        className="bg-gradient-to-b from-black via-slate-900 to-slate-800"
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4d7cff" />

        {/* 3D Content */}
        <Stars />
        <EarthGlobe route={route} showRoute={showRoute} />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={50}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}