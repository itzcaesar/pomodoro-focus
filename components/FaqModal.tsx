import React from 'react';
import { X, Timer, Coffee, RotateCw } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Glass Modal Card */}
      <div className="glass-panel w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-slide-up flex flex-col max-h-[85vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-white/20 dark:border-white/10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">What is the Pomodoro Technique?</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Introduction */}
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
              It uses a timer to break work into focused intervals, traditionally 25 minutes in length, separated by short breaks.
            </p>
          </div>

          {/* How it Works */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Timer size={20} className="text-rose-500" />
              How It Works
            </h3>
            <ol className="space-y-3 ml-2">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">1</span>
                <span><strong className="text-gray-800 dark:text-gray-100">Choose a task</strong> you want to work on</span>
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">2</span>
                <span><strong className="text-gray-800 dark:text-gray-100">Set the timer</strong> to 25 minutes (one "Pomodoro")</span>
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">3</span>
                <span><strong className="text-gray-800 dark:text-gray-100">Work on the task</strong> until the timer rings</span>
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-white text-sm font-bold flex items-center justify-center">4</span>
                <span><strong className="text-gray-800 dark:text-gray-100">Take a short break</strong> (5 minutes)</span>
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500 text-white text-sm font-bold flex items-center justify-center">5</span>
                <span><strong className="text-gray-800 dark:text-gray-100">After 4 Pomodoros</strong>, take a longer break (15-30 minutes)</span>
              </li>
            </ol>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Coffee size={20} className="text-cyan-500" />
              Benefits
            </h3>
            <ul className="space-y-2 ml-2">
              <li className="flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-rose-500">•</span>
                <span>Improves focus and concentration</span>
              </li>
              <li className="flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-rose-500">•</span>
                <span>Reduces mental fatigue through regular breaks</span>
              </li>
              <li className="flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-rose-500">•</span>
                <span>Enhances productivity and work quality</span>
              </li>
              <li className="flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-rose-500">•</span>
                <span>Helps prevent burnout</span>
              </li>
              <li className="flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-rose-500">•</span>
                <span>Makes large tasks more manageable</span>
              </li>
            </ul>
          </div>

          {/* Why Pomodoro */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl border border-rose-200/30 dark:border-rose-700/30">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <RotateCw size={20} className="text-orange-500" />
              Why "Pomodoro"?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              The technique is named after the tomato-shaped kitchen timer that Francesco Cirillo used as a university student. 
              "Pomodoro" is Italian for "tomato" 🍅
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
