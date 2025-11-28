import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { TimerMode } from '../types';

interface MotivationalCharacterProps {
  mode: TimerMode;
  isTimerActive: boolean;
  messageInterval: number;
}

const MOTIVATIONAL_QUOTES = [
  "You're doing great! Keep going! 💪",
  "One step at a time! 🌟",
  "Believe in yourself! ✨",
  "Stay focused, you've got this! 🎯",
  "Progress, not perfection! 🚀",
  "You're stronger than you think! 💫",
  "Small steps lead to big changes! 🌱",
  "Keep pushing forward! 🔥",
  "Your effort matters! 🌈",
  "You're making it happen! ⭐"
];

const FUN_FACTS = [
  "Tomatoes are actually fruits! 🍅",
  "Honey never spoils! 🍯",
  "Octopuses have 3 hearts! 🐙",
  "Bananas are berries! 🍌",
  "A cloud can weigh over 1 million pounds! ☁️",
  "Sharks existed before trees! 🦈",
  "Hot water freezes faster than cold! ❄️",
  "The Eiffel Tower grows in summer! 🗼",
  "Wombat poop is cube-shaped! 🐨",
  "Venus has days longer than its years! 🪐"
];

const BREAK_MESSAGES = [
  "Time to recharge! ☕",
  "You earned this break! 🌸",
  "Relax and breathe! 🌺",
  "Rest is productive too! 🌿",
  "Enjoy your break! 🦋",
  "Stretch and refresh! 🌞",
  "Take it easy! 🌼",
  "You deserve this! 🎈"
];

export const MotivationalCharacter: React.FC<MotivationalCharacterProps> = memo(({ mode, isTimerActive, messageInterval }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Memoize the message getter
  const getRandomMessage = useCallback(() => {
    if (mode === TimerMode.Focus) {
      const useFunFact = Math.random() > 0.5;
      const array = useFunFact ? FUN_FACTS : MOTIVATIONAL_QUOTES;
      return array[Math.floor(Math.random() * array.length)];
    } else {
      return BREAK_MESSAGES[Math.floor(Math.random() * BREAK_MESSAGES.length)];
    }
  }, [mode]);

  useEffect(() => {
    // Set initial message
    setMessage(getRandomMessage());

    // Change message at the user-defined interval when timer is active
    if (isTimerActive) {
      const interval = setInterval(() => {
        setMessage(getRandomMessage());
      }, messageInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [mode, isTimerActive, messageInterval, getRandomMessage]);

  // Memoize border color class
  const borderColorClass = useMemo(() => {
    if (mode === TimerMode.Focus) return 'border-amber-200/30 dark:border-amber-700/30';
    if (mode === TimerMode.ShortBreak) return 'border-teal-200/30 dark:border-teal-700/30';
    return 'border-sky-200/30 dark:border-sky-700/30';
  }, [mode]);

  const handleToggleMinimize = useCallback(() => setIsMinimized(prev => !prev), []);
  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-1  right-6 z-50 flex flex-col items-end gap-2">
      {/* Speech Bubble */}
      {!isMinimized && (
        <div className="relative animate-bounce-subtle">
          <div className={`glass-panel rounded-2xl px-4 py-3 shadow-xl border ${borderColorClass} max-w-[200px] relative backdrop-blur-xl`}>
            <p className="text-sm text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
              {message}
            </p>
            {/* Speech bubble tail pointing down */}
            <div className={`glass-panel absolute -bottom-2 right-8 w-4 h-4 backdrop-blur-xl bg-white/40 dark:bg-black/40 border-r border-b ${borderColorClass} rotate-45 transform origin-center overflow-hidden`}></div>
          </div>
        </div>
      )}

      {/* Character */}
      <div className="relative group">
        <div 
          className="cursor-pointer transition-transform hover:scale-110 will-change-transform"
          onClick={handleToggleMinimize}
        >
          <img 
            src="https://iili.io/fB6nUbV.png" 
            alt="Motivational Character" 
            className="w-32 h-32 object-contain drop-shadow-2xl"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
        
        {/* Control buttons on hover */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleClose}
            className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <X size={14} className="text-white dark:text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
});

MotivationalCharacter.displayName = 'MotivationalCharacter';