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

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-all duration-300 overflow-visible"
      >
        <defs>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-gray-200/50 dark:text-white/5"
        />

        {/* Progress Circle with Glow */}
        <circle
          stroke="var(--color-primary, currentColor)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-[stroke-dashoffset] duration-500 ease-linear"
          strokeLinecap="round"
          filter="url(#glow-filter)"
        />
      </svg>
    </div>
  );
};