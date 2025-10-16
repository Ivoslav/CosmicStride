'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Milestone } from '@/lib/mockData';

interface SpaceRewardsProps {
  currentMilestone: Milestone | null;
  cameraDistance: number;
}

// ISS Model (simplified)
function ISSModel({ position }: { position: THREE.Vector3 }) {
  const issRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (issRef.current) {
      issRef.current.rotation.y += 0.005;
      issRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={issRef} position={position}>
      {/* Main body */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Solar panels - left */}
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Solar panels - right */}
      <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.4, 0.02, 0.15]} />
        <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 6]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Glow effect */}
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={0.5} distance={2} />
    </group>
  );
}

// Moon Model
function MoonModel({ position }: { position: THREE.Vector3 }) {
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#D3D3D3" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Craters */}
      <mesh position={[0.25, 0.1, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>
      <mesh position={[-0.2, -0.15, 0.32]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>
      
      {/* Glow */}
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={1} distance={3} />
    </group>
  );
}

// Mars Model
function MarsModel({ position }: { position: THREE.Vector3 }) {
  const marsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (marsRef.current) {
      marsRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group position={position}>
      <mesh ref={marsRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#CD5C5C" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Polar ice cap */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Glow */}
      <pointLight position={[0, 0, 0]} color="#ff6b6b" intensity={0.8} distance={3} />
    </group>
  );
}

// Satellite Model
function SatelliteModel({ position }: { position: THREE.Vector3 }) {
  const satRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (satRef.current) {
      satRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={satRef} position={position}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#4B5563" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
        <meshStandardMaterial color="#9CA3AF" />
      </mesh>
      
      {/* Dish */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.05, 0.05, 16]} />
        <meshStandardMaterial color="#E5E7EB" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Particle effects for achievement
function AchievementParticles({ position }: { position: THREE.Vector3 }) {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFD700"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function SpaceRewards({ currentMilestone, cameraDistance }: SpaceRewardsProps) {
  // Position rewards near Earth but visible
  const rewardPosition = useMemo(() => {
    const distance = 3 + (cameraDistance - 8) * 0.1; // Move with camera
    return new THREE.Vector3(distance, 1, 0);
  }, [cameraDistance]);

  if (!currentMilestone?.reward3D) return null;

  return (
    <group>
      {currentMilestone.reward3D === 'iss' && (
        <>
          <ISSModel position={rewardPosition} />
          <AchievementParticles position={rewardPosition} />
        </>
      )}
      
      {currentMilestone.reward3D === 'moon' && (
        <>
          <MoonModel position={rewardPosition} />
          <AchievementParticles position={rewardPosition} />
        </>
      )}
      
      {currentMilestone.reward3D === 'mars' && (
        <>
          <MarsModel position={rewardPosition} />
          <AchievementParticles position={rewardPosition} />
        </>
      )}
      
      {currentMilestone.reward3D === 'satellite' && (
        <>
          <SatelliteModel position={rewardPosition} />
          <AchievementParticles position={rewardPosition} />
        </>
      )}
    </group>
  );
}