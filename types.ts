export enum TimerMode {
  Focus = 'focus',
  ShortBreak = 'shortBreak',
  LongBreak = 'longBreak',
}

export enum MusicPlatform {
  Spotify = 'spotify',
  YouTube = 'youtube',
}

export interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  characterMessageInterval: number;
  enableBackgrounds: boolean;
  musicPlatform: MusicPlatform;
  spotifyPlaylistUrl: string;
  youtubePlaylistUrl: string;
  enableSounds: boolean;
  enableNotifications: boolean;
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  cycleCount: number;
}

export interface PixabayImage {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  imageWidth: number;
  imageHeight: number;
  user: string;
  userImageURL: string;
  pageURL: string;
}

export interface PexelsImage {
  id: number;
  src: {
    original: string;
    large: string;
    large2x: string;
  };
  photographer: string;
  photographer_url: string;
  url: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}