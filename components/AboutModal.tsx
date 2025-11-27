import React from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { TimerMode } from '../types';
import { MODE_COLORS } from '../constants';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: TimerMode;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, mode }) => {
  if (!isOpen) return null;

  const accentColor = MODE_COLORS[mode].text;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="glass-panel max-w-md w-full rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <h2 className={`text-2xl font-bold text-center ${accentColor}`}>
            About Developer
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-button text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-all duration-300 active:scale-95"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Developer Info */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-violet-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                IC
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                itzcaesar
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learning Developer & Student
              </p>
            </div>

            {/* GitHub Profile */}
            <a
              href="https://github.com/itzcaesar"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-button hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 active:scale-95 ${accentColor} font-medium group`}
            >
              <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              View GitHub Profile
              <ExternalLink size={16} className="opacity-60" />
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Project Info */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
              About This Project
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed">
              A modern Pomodoro timer with integrated music player, aesthetic backgrounds, and motivational features to boost your productivity.
            </p>
            
            {/* Project Repository */}
            <a
              href="https://github.com/itzcaesar/pomodoro-focus"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-button hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300 active:scale-95 ${accentColor} font-medium group w-full`}
            >
              <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              View Source Code
              <ExternalLink size={16} className="opacity-60" />
            </a>
          </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Built with ❤️ using React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
