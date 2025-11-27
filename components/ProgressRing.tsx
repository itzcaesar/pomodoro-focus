import React from 'react';
import { TimerMode } from '../types';
import { MODE_COLORS } from '../constants';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number; // 0 to 100
  mode: TimerMode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ radius, stroke, progress, mode }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Gradient IDs based on mode
  const gradientId = `gradient-${mode}`;
  const glowId = `glow-${mode}`;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-all duration-300 overflow-visible"
      >
        <defs>
          {/* Gradient for Focus mode - Amber to Orange */}
          <linearGradient id="gradient-focus" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          
          {/* Gradient for Short Break - Teal to Emerald */}
          <linearGradient id="gradient-shortBreak" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          {/* Gradient for Long Break - Sky to Blue */}
          <linearGradient id="gradient-longBreak" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Enhanced glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Track with subtle glow */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-gray-200/60 dark:text-white/8"
          style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))' }}
        />

        {/* Progress Circle with Gradient and Enhanced Glow */}
        <circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={stroke + 1}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
          strokeLinecap="round"
          filter={`url(#${glowId})`}
        />
      </svg>
    </div>
  );
};