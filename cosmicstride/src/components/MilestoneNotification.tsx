'use client';

import { useEffect, useState } from 'react';
import { Milestone } from '@/lib/mockData';

interface MilestoneNotificationProps {
  milestone: Milestone | null;
  isAnimating: boolean;
}

export default function MilestoneNotification({ milestone, isAnimating }: MilestoneNotificationProps) {
  const [show, setShow] = useState(false);
  const [prevMilestone, setPrevMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    if (!isAnimating) {
      setShow(false);
      setPrevMilestone(null);
      return;
    }

    // Show notification when milestone changes
    if (milestone && milestone !== prevMilestone) {
      setShow(true);
      setPrevMilestone(milestone);

      // Hide after 3 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [milestone, isAnimating, prevMilestone]);

  if (!show || !milestone) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Overlay fade */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />
      
      {/* Notification card */}
      <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500/50 shadow-2xl animate-scale-in max-w-lg mx-4">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse" />
        
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2 animate-bounce">
              🎉 Milestone Reached! 🎉
            </div>
            <div className="text-7xl mb-4 animate-bounce-slow">
              {milestone.emoji}
            </div>
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {milestone.name}
            </h2>
            <p className="text-2xl text-purple-200 font-semibold">
              {milestone.altitude}
            </p>
          </div>

          {/* Description */}
          {milestone.description && (
            <p className="text-center text-purple-100 text-lg italic mb-4">
              "{milestone.description}"
            </p>
          )}

          {/* Special reward badge */}
          {milestone.reward3D && (
            <div className="mt-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-4 text-center">
              <div className="text-yellow-300 text-sm font-bold uppercase mb-1">
                ✨ Special Reward Unlocked ✨
              </div>
              <div className="text-white font-semibold">
                {milestone.reward3D === 'iss' && '3D International Space Station'}
                {milestone.reward3D === 'satellite' && '3D GPS Satellite'}
                {milestone.reward3D === 'moon' && '3D Moon Model'}
                {milestone.reward3D === 'mars' && '3D Mars Planet'}
              </div>
            </div>
          )}

          {/* Sparkles */}
          <div className="absolute -top-4 -left-4 text-4xl animate-spin-slow">✨</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute -bottom-4 -left-4 text-4xl animate-spin-slow" style={{ animationDelay: '1s' }}>💫</div>
          <div className="absolute -bottom-4 -right-4 text-4xl animate-spin-slow" style={{ animationDelay: '1.5s' }}>🌟</div>
        </div>
      </div>
    </div>
  );
}