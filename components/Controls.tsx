import React from 'react';
import { Play, Pause, RotateCcw, Settings, Moon, Sun, HelpCircle, Smile, Info, TrendingUp, Keyboard } from 'lucide-react';
import { TimerMode } from '../types';
import { MODE_GRADIENTS, MODE_GLOW, MODE_COLORS } from '../constants';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  mode: TimerMode;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  onOpenFaq: () => void;
  onOpenAbout: () => void;
  onOpenStats: () => void;
  onOpenKeyboardShortcuts: () => void;
  showCharacter: boolean;
  onToggleCharacter: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  isActive, 
  onToggle, 
  onReset, 
  mode, 
  isDarkMode, 
  onToggleTheme, 
  onOpenSettings, 
  onOpenFaq,
  onOpenAbout,
  onOpenStats,
  onOpenKeyboardShortcuts,
  showCharacter, 
  onToggleCharacter 
}) => {
  return (
    <div className="mt-12 sm:mt-16 w-full flex flex-col items-center gap-6">
      {/* Main Action Button Row */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="group p-3.5 sm:p-4 rounded-2xl glass-button text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 active:scale-95 hover:bg-white/40"
          aria-label="Reset"
        >
          <RotateCcw 
            size={20} 
            className="sm:w-[22px] sm:h-[22px] group-hover:-rotate-180 transition-transform duration-700 ease-in-out" 
          />
        </button>

        {/* Main Action Button */}
        <button
          onClick={onToggle}
          className={`relative p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${MODE_GRADIENTS[mode]} ${MODE_GLOW[mode]} shadow-2xl text-white group overflow-hidden`}
          aria-label={isActive ? 'Pause' : 'Start'}
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[2rem] sm:rounded-t-[2.5rem] pointer-events-none" />
          
          {isActive ? (
            <Pause 
              size={36} 
              fill="currentColor" 
              className="sm:w-[42px] sm:h-[42px] opacity-95 relative z-10" 
            />
          ) : (
            <Play 
              size={36} 
              fill="currentColor" 
              className="sm:w-[42px] sm:h-[42px] opacity-95 ml-1 relative z-10" 
            />
          )}
        </button>
      </div>

      {/* Secondary Controls - Two Rows on Mobile, One Row on Desktop */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        {/* First Row / Group */}
        <div className="flex items-center justify-center gap-3">
          {/* FAQ Button - Mobile Only */}
          <button
            onClick={onOpenFaq}
            className={`lg:hidden p-2.5 rounded-full glass-button text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover} transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${MODE_COLORS[mode].ring}`}
            aria-label="FAQ"
          >
            <HelpCircle size={16} />
          </button>

          {/* Character Toggle */}
          <button
            onClick={onToggleCharacter}
            className={`p-2.5 rounded-full glass-button transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              showCharacter 
                ? MODE_COLORS[mode].text
                : `text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover}`
            } ${MODE_COLORS[mode].ring}`}
            aria-label="Toggle Character"
          >
            <Smile size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-full glass-button text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover} transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${MODE_COLORS[mode].ring}`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* About */}
          <button
            onClick={onOpenAbout}
            className={`p-2.5 rounded-full glass-button text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover} transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${MODE_COLORS[mode].ring}`}
            aria-label="About Developer"
          >
            <Info size={16} />
          </button>
        </div>

        {/* Second Row / Group */}
        <div className="flex items-center justify-center gap-3">
          {/* Statistics */}
          <button
            onClick={onOpenStats}
            className={`p-2.5 rounded-full glass-button text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover} transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${MODE_COLORS[mode].ring}`}
            aria-label="View Statistics"
          >
            <TrendingUp size={16} />
          </button>

          {/* Keyboard Shortcuts */}
          <button
            onClick={onOpenKeyboardShortcuts}
            className={`p-2.5 rounded-full glass-button text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover} transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${MODE_COLORS[mode].ring}`}
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard size={16} />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className={`p-2.5 rounded-full glass-button text-gray-600 dark:text-gray-300 ${MODE_COLORS[mode].hover} transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${MODE_COLORS[mode].ring}`}
            aria-label="Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};