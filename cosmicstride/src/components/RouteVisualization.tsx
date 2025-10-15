'use client';

import { useState, useEffect } from 'react';
import Earth3D from './Earth3D';
import StatsPanel from './StatsPanel';
import { mockRoute, calculateRouteDistance } from '@/lib/mockData';
// Icons will be emojis for now
// import { Rocket, Play, RotateCcw } from 'lucide-react';

export default function RouteVisualization() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(8);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  const totalDistance = calculateRouteDistance(mockRoute);
  const displayDistance = totalDistance * (animationProgress / 100);

  // Zoom out animation
  useEffect(() => {
    if (!isAnimating) return;

    const duration = 8000; // 8 seconds
    const startTime = Date.now();
    const startDistance = 8;
    const endDistance = 30;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setCameraDistance(startDistance + (endDistance - startDistance) * easeProgress);
      setAnimationProgress(progress * 100);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animate();
  }, [isAnimating]);

  const handleStart = () => {
    setIsAnimating(true);
    setCameraDistance(8);
    setAnimationProgress(0);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCameraDistance(8);
    setAnimationProgress(0);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col">
      {/* 3D Earth Visualization */}
      <Earth3D 
        route={mockRoute} 
        cameraDistance={cameraDistance}
        showRoute={true}
      />

      {/* Stats Overlay */}
      <StatsPanel 
        distanceKm={displayDistance}
        isAnimating={isAnimating}
      />

      {/* Control Buttons */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        {!isAnimating && animationProgress === 0 && (
          <button
            onClick={handleStart}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50"
          >
            <span className="text-2xl">🚀</span>
            <span className="text-lg">Launch Journey to Space</span>
          </button>
        )}

        {!isAnimating && animationProgress > 0 && (
          <button
            onClick={handleReset}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
          >
            <span className="text-2xl">🔄</span>
            <span className="text-lg">Restart Journey</span>
          </button>
        )}

        {isAnimating && (
          <div className="px-8 py-4 bg-slate-900/90 backdrop-blur-lg text-white font-semibold rounded-full shadow-2xl border border-cyan-500/30 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              <span>Traveling through space...</span>
              <span className="text-cyan-400">{animationProgress.toFixed(0)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
          CosmicStride
        </h1>
        <p className="text-slate-300 text-xs md:text-sm mt-1 drop-shadow-lg">
          Every step on Earth is a journey to space
        </p>
      </div>

      {/* Info Badge */}
      <div className="absolute bottom-8 right-8 z-10 bg-slate-900/80 backdrop-blur-lg px-4 py-2 rounded-full text-xs text-slate-300 border border-slate-700/50">
        🖱️ Drag to rotate • 🔍 Scroll to zoom
      </div>
    </div>
  );
}