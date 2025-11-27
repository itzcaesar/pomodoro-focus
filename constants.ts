import { Settings, TimerMode } from './types';

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
};

// Text colors for minimal accents
export const MODE_COLORS = {
  [TimerMode.Focus]: 'text-rose-500 dark:text-rose-400',
  [TimerMode.ShortBreak]: 'text-cyan-500 dark:text-cyan-400',
  [TimerMode.LongBreak]: 'text-violet-500 dark:text-violet-400',
};

// Liquid Gradients for backgrounds and buttons
export const MODE_GRADIENTS = {
  [TimerMode.Focus]: 'bg-gradient-to-br from-rose-400 to-orange-500',
  [TimerMode.ShortBreak]: 'bg-gradient-to-br from-cyan-400 to-emerald-500',
  [TimerMode.LongBreak]: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
};

// Glow styles (colored shadows)
export const MODE_GLOW = {
  [TimerMode.Focus]: 'shadow-rose-500/40',
  [TimerMode.ShortBreak]: 'shadow-cyan-500/40',
  [TimerMode.LongBreak]: 'shadow-violet-500/40',
};

export const MODE_LABELS = {
  [TimerMode.Focus]: 'Focus',
  [TimerMode.ShortBreak]: 'Short Break',
  [TimerMode.LongBreak]: 'Long Break',
};
