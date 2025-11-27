import { Settings, TimerMode } from './types';

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  characterMessageInterval: 15,
  enableBackgrounds: true,
  spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
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

// Lofi Player color schemes based on mode
export const PLAYER_GRADIENTS = {
  [TimerMode.Focus]: 'from-rose-50/40 via-orange-50/30 to-red-50/40 dark:from-rose-900/20 dark:via-orange-900/20 dark:to-red-900/20',
  [TimerMode.ShortBreak]: 'from-cyan-50/40 via-teal-50/30 to-emerald-50/40 dark:from-cyan-900/20 dark:via-teal-900/20 dark:to-emerald-900/20',
  [TimerMode.LongBreak]: 'from-violet-50/40 via-purple-50/30 to-fuchsia-50/40 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-fuchsia-900/20',
};

export const PLAYER_BORDERS = {
  [TimerMode.Focus]: 'border-rose-200/30 dark:border-rose-900/30',
  [TimerMode.ShortBreak]: 'border-cyan-200/30 dark:border-cyan-900/30',
  [TimerMode.LongBreak]: 'border-violet-200/30 dark:border-violet-900/30',
};

export const PLAYER_ICON_GRADIENTS = {
  [TimerMode.Focus]: 'from-rose-400 to-orange-500 dark:from-rose-600 dark:to-orange-700',
  [TimerMode.ShortBreak]: 'from-cyan-400 to-emerald-500 dark:from-cyan-600 dark:to-emerald-700',
  [TimerMode.LongBreak]: 'from-violet-400 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-700',
};

export const PLAYER_TEXT_COLORS = {
  [TimerMode.Focus]: 'text-rose-900 dark:text-rose-100',
  [TimerMode.ShortBreak]: 'text-cyan-900 dark:text-cyan-100',
  [TimerMode.LongBreak]: 'text-violet-900 dark:text-violet-100',
};

export const PLAYER_SUBTITLE_COLORS = {
  [TimerMode.Focus]: 'text-rose-700/70 dark:text-rose-300/70',
  [TimerMode.ShortBreak]: 'text-cyan-700/70 dark:text-cyan-300/70',
  [TimerMode.LongBreak]: 'text-violet-700/70 dark:text-violet-300/70',
};

export const PLAYER_CHEVRON_COLORS = {
  [TimerMode.Focus]: 'text-rose-700 dark:text-rose-300',
  [TimerMode.ShortBreak]: 'text-cyan-700 dark:text-cyan-300',
  [TimerMode.LongBreak]: 'text-violet-700 dark:text-violet-300',
};

export const PLAYER_HOVER_BG = {
  [TimerMode.Focus]: 'hover:bg-rose-100/20 dark:hover:bg-rose-900/10',
  [TimerMode.ShortBreak]: 'hover:bg-cyan-100/20 dark:hover:bg-cyan-900/10',
  [TimerMode.LongBreak]: 'hover:bg-violet-100/20 dark:hover:bg-violet-900/10',
};
