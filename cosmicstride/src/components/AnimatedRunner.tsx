'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoutePoint } from '@/lib/mockData';

interface AnimatedRunnerProps {
  route: RoutePoint[];
  progress: number; // 0-100
  isAnimating: boolean;
}

export default function AnimatedRunner({ route, progress, isAnimating }: AnimatedRunnerProps) {
  const runnerRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Line>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Convert GPS coordinates to 3D sphere coordinates
  const routePoints = useMemo(() => {
    return route.map((point, index) => {
      const lat = (point.lat * Math.PI) / 180;
      const lng = (point.lng * Math.PI) / 180;
      
      const progressFactor = index / (route.length - 1);
      const arcHeight = Math.sin(progressFactor * Math.PI) * 0.3;
      const radius = 2.02 + arcHeight;
      
      const x = radius * Math.cos(lat) * Math.cos(lng);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lng);
      
      return new THREE.Vector3(x, y, z);
    });
  }, [route]);

  // Calculate current position based on progress
  const currentPosition = useMemo(() => {
    const index = Math.min(
      Math.floor((progress / 100) * (routePoints.length - 1)),
      routePoints.length - 1
    );
    return routePoints[index];
  }, [progress, routePoints]);

  // Get trail points (from start to current position)
  const trailPoints = useMemo(() => {
    const index = Math.min(
      Math.floor((progress / 100) * (routePoints.length - 1)),
      routePoints.length - 1
    );
    return routePoints.slice(0, index + 1);
  }, [progress, routePoints]);

  // Pulsing animation
  useFrame(({ clock }) => {
    if (runnerRef.current && isAnimating) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
      runnerRef.current.scale.setScalar(scale);
    }
    
    if (glowRef.current && isAnimating) {
      const glowScale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
      glowRef.current.scale.setScalar(glowScale);
      glowRef.current.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
    }
  });

  if (!isAnimating || progress === 0) return null;

  return (
    <group>
      {/* Runner position (pulsing dot) */}
      <mesh ref={runnerRef} position={currentPosition}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Glow effect around runner */}
      <mesh ref={glowRef} position={currentPosition}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial 
          color="#FFA500" 
          transparent 
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Trail effect (completed path) */}
      {trailPoints.length > 1 && (
        <line ref={trailRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={trailPoints.length}
              array={new Float32Array(trailPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#FFD700" 
            linewidth={4}
            transparent
            opacity={0.8}
          />
        </line>
      )}

      {/* "You are here" label */}
      {progress > 5 && progress < 95 && (
        <mesh position={[currentPosition.x * 1.15, currentPosition.y * 1.15, currentPosition.z * 1.15]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}
    </group>
  );
}