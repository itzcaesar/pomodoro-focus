export enum TimerMode {
  Focus = 'focus',
  ShortBreak = 'shortBreak',
  LongBreak = 'longBreak',
}

export interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  cycleCount: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}