import React from 'react';
import { Timer, Coffee, RotateCw, HelpCircle } from 'lucide-react';
import { TimerMode } from '../types';
import { MODE_GRADIENTS, MODE_COLORS } from '../constants';

interface FaqInlineProps {
  mode: TimerMode;
}

export const FaqInline: React.FC<FaqInlineProps> = ({ mode }) => {
  const modeColorClasses = {
    [TimerMode.Focus]: 'border-rose-200 dark:border-rose-700',
    [TimerMode.ShortBreak]: 'border-cyan-200 dark:border-cyan-700',
    [TimerMode.LongBreak]: 'border-violet-200 dark:border-violet-700',
  };
  
  const modeBgClasses = {
    [TimerMode.Focus]: 'from-rose-50/40 to-orange-50/40 dark:from-rose-900/20 dark:to-orange-900/20 border-rose-200/30 dark:border-rose-700/30',
    [TimerMode.ShortBreak]: 'from-cyan-50/40 to-emerald-50/40 dark:from-cyan-900/20 dark:to-emerald-900/20 border-cyan-200/30 dark:border-cyan-700/30',
    [TimerMode.LongBreak]: 'from-violet-50/40 to-fuchsia-50/40 dark:from-violet-900/20 dark:to-fuchsia-900/20 border-violet-200/30 dark:border-violet-700/30',
  };
  return (
    <div className="glass-button rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-5">
      <div className="w-full max-h-[395px] overflow-y-auto space-y-3">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <div className={`w-6 h-6 rounded-lg ${MODE_GRADIENTS[mode]} flex items-center justify-center shadow-md flex-shrink-0`}>
          <HelpCircle size={12} className="text-white" />
        </div>
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">About Pomodoro</h2>
      </div>

      {/* Introduction */}
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          A time management method using 25-minute focused work intervals separated by short breaks.
        </p>
      </div>

      {/* How it Works */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 uppercase tracking-wider">
          <Timer size={11} className="text-rose-500" />
          How It Works
        </h3>
        <ol className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">1</span>
            <span className="leading-relaxed">Choose a task to work on</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">2</span>
            <span className="leading-relaxed">Set timer to 25 minutes</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">3</span>
            <span className="leading-relaxed">Work until timer rings</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-cyan-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">4</span>
            <span className="leading-relaxed">Take a 5-minute break</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">5</span>
            <span className="leading-relaxed">After 4 cycles, take 15-30 min break</span>
          </li>
        </ol>
      </div>

      {/* Benefits */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 uppercase tracking-wider">
          <Coffee size={11} className="text-cyan-500" />
          Benefits
        </h3>
        <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex gap-1.5 items-start">
            <span className="text-rose-500 flex-shrink-0 mt-0.5">•</span>
            <span className="leading-relaxed">Improves focus and concentration</span>
          </li>
          <li className="flex gap-1.5 items-start">
            <span className="text-rose-500 flex-shrink-0 mt-0.5">•</span>
            <span className="leading-relaxed">Reduces mental fatigue</span>
          </li>
          <li className="flex gap-1.5 items-start">
            <span className="text-rose-500 flex-shrink-0 mt-0.5">•</span>
            <span className="leading-relaxed">Enhances productivity</span>
          </li>
          <li className="flex gap-1.5 items-start">
            <span className="text-rose-500 flex-shrink-0 mt-0.5">•</span>
            <span className="leading-relaxed">Prevents burnout</span>
          </li>
          <li className="flex gap-1.5 items-start">
            <span className="text-rose-500 flex-shrink-0 mt-0.5">•</span>
            <span className="leading-relaxed">Makes tasks manageable</span>
          </li>
        </ul>
      </div>

      {/* Fun Fact */}
      <div className={`p-2.5 bg-gradient-to-br ${modeBgClasses[mode]} rounded-xl border`}>
        <h3 className="text-[10px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
          <RotateCw size={11} className="text-orange-500" />
          Why "Pomodoro"?
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Named after the tomato-shaped timer Francesco Cirillo used as a student. "Pomodoro" means "tomato" in Italian 🍅
        </p>
      </div>
      </div>
    </div>
  );
};
