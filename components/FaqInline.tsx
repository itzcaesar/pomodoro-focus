import React from 'react';
import { Timer, Coffee, RotateCw, HelpCircle } from 'lucide-react';

export const FaqInline: React.FC = () => {
  return (
    <div className="w-full max-h-[438px] overflow-y-auto space-y-3">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-rose-400 to-orange-500 dark:from-rose-600 dark:to-orange-700 flex items-center justify-center shadow-md flex-shrink-0">
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
      <div className="p-2.5 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-xl border border-rose-200/30 dark:border-rose-700/30">
        <h3 className="text-[10px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
          <RotateCw size={11} className="text-orange-500" />
          Why "Pomodoro"?
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Named after the tomato-shaped timer Francesco Cirillo used as a student. "Pomodoro" means "tomato" in Italian 🍅
        </p>
      </div>
    </div>
  );
};
