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
    <div className="absolute top-4 left-4 z-10 pointer-events-none max-w-xs">
      <div className="space-y-3">
        
        {/* Main Distance Card */}
        <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-4 border border-slate-700/30 shadow-xl pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-medium text-slate-400">Your Run</h2>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold text-white">
              {distanceKm.toFixed(2)}
              <span className="text-lg text-slate-400 ml-1">km</span>
            </div>
            <div className="text-sm text-cyan-400">
              Space distance (1km run = 100km space)
            </div>
          </div>
        </div>

        {/* Current Milestone Achievement */}
        {currentMilestone && (
          <div className="bg-gradient-to-br from-purple-900/70 to-indigo-900/70 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 shadow-xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h3 className="text-xs font-medium text-purple-200">Achievement!</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentMilestone.emoji}</span>
              <div>
                <div className="text-sm font-bold text-white">
                  {currentMilestone.name}
                </div>
                <div className="text-xs text-purple-300">
                  {currentMilestone.altitude}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Milestone Progress */}
        {nextMilestone && (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-4 border border-slate-700/30 shadow-xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-medium text-slate-400">Next Goal</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{nextMilestone.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {nextMilestone.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {nextMilestone.altitude}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-400">
                    {(nextMilestone.distance - distanceKm).toFixed(1)} km
                  </div>
                  <div className="text-xs text-slate-400">to go</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Cosmic Conditions */}
        <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-4 border border-slate-700/30 shadow-xl pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <h3 className="text-xs font-medium text-slate-400">Cosmic Conditions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-slate-500 mb-1">UV Index</div>
              <div className="text-sm font-semibold text-orange-400">
                {mockCosmicConditions.uvIndex}/11
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Solar Wind</div>
              <div className="text-sm font-semibold text-purple-400">
                {mockCosmicConditions.solarWind} km/s
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Kp Index</div>
              <div className="text-sm font-semibold text-green-400">
                {mockCosmicConditions.kpIndex}/9
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Temp</div>
              <div className="text-sm font-semibold text-blue-400">
                {mockCosmicConditions.temperature}°C
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}