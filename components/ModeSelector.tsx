import React from 'react';
import { TimerMode } from '../types';
import { MODE_LABELS, MODE_GRADIENTS } from '../constants';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onSelectMode: (mode: TimerMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="flex bg-white/20 dark:bg-black/20 backdrop-blur-md p-1.5 rounded-full relative shadow-inner border border-white/20 dark:border-white/5 mx-auto max-w-sm">
      {Object.values(TimerMode).map((mode) => {
        const isActive = currentMode === mode;

        return (
          <button
            key={mode}
            onClick={() => onSelectMode(mode)}
            className={`
                relative z-10 flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300
                ${isActive ? 'text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}
            `}
          >
            <span className="relative z-10">{MODE_LABELS[mode]}</span>
            
            {/* Active Background - Simulated liquid fill */}
            {isActive && (
                <div className={`absolute inset-0 z-0 rounded-full ${MODE_GRADIENTS[mode]} animate-fade-in`}></div>
            )}
          </button>
        );
      })}
    </div>
  );
};