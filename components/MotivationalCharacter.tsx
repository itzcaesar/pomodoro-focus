import React, { useState, useEffect } from 'react';
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

export const MotivationalCharacter: React.FC<MotivationalCharacterProps> = ({ mode, isTimerActive, messageInterval }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const getRandomMessage = () => {
      if (mode === TimerMode.Focus) {
        // Alternate between motivational quotes and fun facts
        const useFunFact = Math.random() > 0.5;
        const array = useFunFact ? FUN_FACTS : MOTIVATIONAL_QUOTES;
        return array[Math.floor(Math.random() * array.length)];
      } else {
        return BREAK_MESSAGES[Math.floor(Math.random() * BREAK_MESSAGES.length)];
      }
    };

    // Set initial message
    setMessage(getRandomMessage());

    // Change message at the user-defined interval when timer is active
    if (isTimerActive) {
      const interval = setInterval(() => {
        setMessage(getRandomMessage());
      }, messageInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [mode, isTimerActive, messageInterval]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-1  right-6 z-50 flex flex-col items-end gap-2">
      {/* Speech Bubble */}
      {!isMinimized && (
        <div className="relative animate-bounce-subtle">
          <div className={`bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-xl border-2 ${
            mode === TimerMode.Focus ? 'border-rose-200 dark:border-rose-700' :
            mode === TimerMode.ShortBreak ? 'border-cyan-200 dark:border-cyan-700' :
            'border-violet-200 dark:border-violet-700'
          } max-w-[200px] relative`}>
            <p className="text-sm text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
              {message}
            </p>
            {/* Speech bubble tail pointing down */}
            <div className={`absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-gray-800 border-r-2 border-b-2 ${
              mode === TimerMode.Focus ? 'border-rose-200 dark:border-rose-700' :
              mode === TimerMode.ShortBreak ? 'border-cyan-200 dark:border-cyan-700' :
              'border-violet-200 dark:border-violet-700'
            } rotate-45 transform origin-center`}></div>
          </div>
        </div>
      )}

      {/* Character */}
      <div className="relative group">
        <div 
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <img 
            src="https://iili.io/fB6nUbV.png" 
            alt="Motivational Character" 
            className="w-32 h-32 object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Control buttons on hover */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <X size={14} className="text-white dark:text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
};