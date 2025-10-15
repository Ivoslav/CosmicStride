'use client';

import { Trophy, Zap, Activity, Gauge } from 'lucide-react';
import { 
  getCurrentMilestone, 
  getNextMilestone, 
  getMilestoneProgress,
  mockCosmicConditions 
} from '@/lib/mockData';

interface StatsPanelProps {
  distanceKm: number;
  isAnimating?: boolean;
}

export default function StatsPanel({ distanceKm, isAnimating = false }: StatsPanelProps) {
  const currentMilestone = getCurrentMilestone(distanceKm);
  const nextMilestone = getNextMilestone(distanceKm);
  const progress = getMilestoneProgress(distanceKm);
  const spaceDistance = distanceKm * 1000; // Convert to km in space (1m run = 1km space)

  return (
    <div className="absolute top-6 left-6 right-6 z-10 pointer-events-none">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* Main Distance Card */}
        <div className="bg-slate-900/90 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl pointer-events-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-400">Your Run</h2>
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          
          <div className="space-y-1">
            <div className="text-5xl font-bold text-white">
              {distanceKm.toFixed(2)}
              <span className="text-2xl text-slate-400 ml-2">km</span>
            </div>
            <div className="text-lg text-cyan-400">
              = {spaceDistance.toLocaleString()} km toward space
            </div>
          </div>
        </div>

        {/* Current Milestone Achievement */}
        {currentMilestone && (
          <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h3 className="text-sm font-medium text-purple-200">Achievement Unlocked!</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentMilestone.emoji}</span>
                <div>
                  <div className="text-xl font-bold text-white">
                    {currentMilestone.name}
                  </div>
                  <div className="text-sm text-purple-300">
                    {currentMilestone.altitude}
                  </div>
                </div>
              </div>
              {currentMilestone.description && (
                <p className="text-sm text-purple-200/80 italic">
                  {currentMilestone.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Next Milestone Progress */}
        {nextMilestone && (
          <div className="bg-slate-900/90 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-medium text-slate-400">Next Goal</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{nextMilestone.emoji}</span>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {nextMilestone.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {nextMilestone.altitude}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-400">
                    {(nextMilestone.distance - distanceKm).toFixed(1)} km
                  </div>
                  <div className="text-xs text-slate-400">to go</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-right text-slate-400">
                {progress.toFixed(1)}% complete
              </div>
            </div>
          </div>
        )}

        {/* Cosmic Conditions */}
        <div className="bg-slate-900/90 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-medium text-slate-400">Cosmic Conditions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">UV Index</div>
              <div className="text-lg font-semibold text-orange-400">
                {mockCosmicConditions.uvIndex}/11
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Solar Wind</div>
              <div className="text-lg font-semibold text-purple-400">
                {mockCosmicConditions.solarWind} km/s
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Kp Index</div>
              <div className="text-lg font-semibold text-green-400">
                {mockCosmicConditions.kpIndex}/9
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Temperature</div>
              <div className="text-lg font-semibold text-blue-400">
                {mockCosmicConditions.temperature}°C
              </div>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 mt-3 italic">
            Perfect conditions for your cosmic journey! ⚡
          </p>
        </div>

      </div>
    </div>
  );
}