import React, { memo } from 'react';
import { TimerMode } from '../types';
import { MODE_LABELS, MODE_GRADIENTS } from '../constants';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onSelectMode: (mode: TimerMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = memo(({ currentMode, onSelectMode }) => {
  return (
    <div className="flex gap-3 bg-white/25 dark:bg-black/25 backdrop-blur-md p-2 rounded-full relative border border-white/30 dark:border-white/10 mx-auto max-w-lg" style={{
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
    }}>
      {Object.values(TimerMode).map((mode) => {
        const isActive = currentMode === mode;

        return (
          <button
            key={mode}
            onClick={() => onSelectMode(mode)}
            className={`
                relative z-10 flex-1 py-3 px-4 sm:px-6 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 transform glass-button whitespace-nowrap
                ${isActive 
                  ? `text-gray-700 dark:text-gray-200 scale-105` 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 active:scale-95'
                }
            `}
          >
            <span className="relative z-10">{MODE_LABELS[mode]}</span>
          </button>
        );
      })}
    </div>
  );
});

ModeSelector.displayName = 'ModeSelector';