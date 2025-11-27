import React from 'react';
import { Keyboard, X } from 'lucide-react';
import { TimerMode } from '../types';
import { MODE_COLORS } from '../constants';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
  mode: TimerMode;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({ isOpen, onClose, mode }) => {

  const shortcuts = [
    { key: 'Space', action: 'Play / Pause timer' },
    { key: 'R', action: 'Reset timer' },
    { key: '1', action: 'Switch to Focus mode' },
    { key: '2', action: 'Switch to Short Break' },
    { key: '3', action: 'Switch to Long Break' },
    { key: 'Esc', action: 'Close modals' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <div className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in" />
          
          <div 
            className="glass-panel max-w-md w-full rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-white/20 dark:border-white/10">
              <div className="flex items-center gap-3">
                <Keyboard size={24} className={MODE_COLORS[mode].text} />
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass-button text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 active:scale-95"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl glass-input hover:bg-white/40 dark:hover:bg-white/5 transition-all"
                >
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{shortcut.action}</span>
                  <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-100 bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="p-6 pt-0 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Use these shortcuts for quick navigation and control
              </p>
            </div>
          </div>
        </div>
  );
};
