import { Settings, TimerMode, MusicPlatform } from './types';

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  characterMessageInterval: 15,
  enableBackgrounds: true,
  musicPlatform: MusicPlatform.YouTube,
  spotifyPlaylistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
  youtubePlaylistUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  enableSounds: true,
  enableNotifications: true,
};

// Text colors for minimal accents
export const MODE_COLORS = {
  [TimerMode.Focus]: {
    text: 'text-amber-500 dark:text-amber-400',
    hover: 'hover:text-amber-500 dark:hover:text-amber-400',
    ring: 'focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400',
  },
  [TimerMode.ShortBreak]: {
    text: 'text-teal-500 dark:text-teal-400',
    hover: 'hover:text-teal-500 dark:hover:text-teal-400',
    ring: 'focus-visible:ring-teal-500 dark:focus-visible:ring-teal-400',
  },
  [TimerMode.LongBreak]: {
    text: 'text-sky-500 dark:text-sky-400',
    hover: 'hover:text-sky-500 dark:hover:text-sky-400',
    ring: 'focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400',
  },
};

// Liquid Gradients for backgrounds and buttons
export const MODE_GRADIENTS = {
  [TimerMode.Focus]: 'bg-gradient-to-br from-amber-400 to-orange-500',
  [TimerMode.ShortBreak]: 'bg-gradient-to-br from-teal-400 to-emerald-500',
  [TimerMode.LongBreak]: 'bg-gradient-to-br from-sky-400 to-blue-500',
};

// Glow styles (colored shadows)
export const MODE_GLOW = {
  [TimerMode.Focus]: 'shadow-amber-500/40',
  [TimerMode.ShortBreak]: 'shadow-teal-500/40',
  [TimerMode.LongBreak]: 'shadow-sky-500/40',
};

export const MODE_LABELS = {
  [TimerMode.Focus]: 'Focus',
  [TimerMode.ShortBreak]: 'Short Break',
  [TimerMode.LongBreak]: 'Long Break',
};

// Lofi Player color schemes based on mode
export const PLAYER_GRADIENTS = {
  [TimerMode.Focus]: 'from-amber-50/40 via-orange-50/30 to-yellow-50/40 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20',
  [TimerMode.ShortBreak]: 'from-teal-50/40 via-emerald-50/30 to-green-50/40 dark:from-teal-900/20 dark:via-emerald-900/20 dark:to-green-900/20',
  [TimerMode.LongBreak]: 'from-sky-50/40 via-blue-50/30 to-cyan-50/40 dark:from-sky-900/20 dark:via-blue-900/20 dark:to-cyan-900/20',
};

export const PLAYER_BORDERS = {
  [TimerMode.Focus]: 'border-amber-200/30 dark:border-amber-900/30',
  [TimerMode.ShortBreak]: 'border-teal-200/30 dark:border-teal-900/30',
  [TimerMode.LongBreak]: 'border-sky-200/30 dark:border-sky-900/30',
};

export const PLAYER_ICON_GRADIENTS = {
  [TimerMode.Focus]: 'from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700',
  [TimerMode.ShortBreak]: 'from-teal-400 to-emerald-500 dark:from-teal-600 dark:to-emerald-700',
  [TimerMode.LongBreak]: 'from-sky-400 to-blue-500 dark:from-sky-600 dark:to-blue-700',
};

export const PLAYER_TEXT_COLORS = {
  [TimerMode.Focus]: 'text-amber-900 dark:text-amber-100',
  [TimerMode.ShortBreak]: 'text-teal-900 dark:text-teal-100',
  [TimerMode.LongBreak]: 'text-sky-900 dark:text-sky-100',
};

export const PLAYER_SUBTITLE_COLORS = {
  [TimerMode.Focus]: 'text-amber-700/70 dark:text-amber-300/70',
  [TimerMode.ShortBreak]: 'text-teal-700/70 dark:text-teal-300/70',
  [TimerMode.LongBreak]: 'text-sky-700/70 dark:text-sky-300/70',
};

export const PLAYER_CHEVRON_COLORS = {
  [TimerMode.Focus]: 'text-amber-700 dark:text-amber-300',
  [TimerMode.ShortBreak]: 'text-teal-700 dark:text-teal-300',
  [TimerMode.LongBreak]: 'text-sky-700 dark:text-sky-300',
};

export const PLAYER_HOVER_BG = {
  [TimerMode.Focus]: 'hover:bg-amber-100/20 dark:hover:bg-amber-900/10',
  [TimerMode.ShortBreak]: 'hover:bg-teal-100/20 dark:hover:bg-teal-900/10',
  [TimerMode.LongBreak]: 'hover:bg-sky-100/20 dark:hover:bg-sky-900/10',
};
