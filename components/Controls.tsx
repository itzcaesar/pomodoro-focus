import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { TimerMode } from '../types';
import { MODE_GRADIENTS, MODE_GLOW } from '../constants';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  mode: TimerMode;
}

export const Controls: React.FC<ControlsProps> = ({ isActive, onToggle, onReset, mode }) => {
  
  return (
    <div className="flex items-center gap-6 sm:gap-10 mt-12">
      
      {/* Reset Button (Subtle Glass) */}
      <button
        onClick={onReset}
        className="group p-4 rounded-2xl glass-button text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 active:scale-95 hover:bg-white/40"
        aria-label="Reset"
      >
        <RotateCcw size={22} className="group-hover:-rotate-180 transition-transform duration-700 ease-in-out" />
      </button>

      {/* Main Action Button (Liquid Gradient & Glow) */}
      <button
        onClick={onToggle}
        className={`
            relative p-8 rounded-[2.5rem] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center 
            ${MODE_GRADIENTS[mode]} ${MODE_GLOW[mode]} shadow-2xl text-white group overflow-hidden
        `}
        aria-label={isActive ? 'Pause' : 'Start'}
      >
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[2.5rem] pointer-events-none"></div>
        
        {isActive ? (
          <Pause size={42} fill="currentColor" className="opacity-95 relative z-10" />
        ) : (
          <Play size={42} fill="currentColor" className="opacity-95 ml-1 relative z-10" />
        )}
      </button>

    </div>
  );
};