import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, Settings } from '../types';
import { playNotificationSound } from '../utils/sound';
import { playCompletionSound } from '../utils/audio';
import { notifyTimerComplete } from '../utils/notifications';
import { recordSession } from '../utils/statistics';

export const useTimer = (settings: Settings) => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.Focus);
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cycleCount, setCycleCount] = useState(1);
  
  const endTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Helper to get duration based on current mode
  const getDurationForMode = useCallback((currentMode: TimerMode, currentSettings: Settings) => {
    switch (currentMode) {
      case TimerMode.Focus: return currentSettings.focusDuration * 60;
      case TimerMode.ShortBreak: return currentSettings.shortBreakDuration * 60;
      case TimerMode.LongBreak: return currentSettings.longBreakDuration * 60;
    }
  }, []);

  // Initialize or reset timer when settings/mode change, but only if not currently active
  useEffect(() => {
    if (!isActive && !isCompleted) {
      setTimeLeft(getDurationForMode(mode, settings));
    }
  }, [settings, mode, getDurationForMode, isActive, isCompleted]);

  const switchMode = useCallback(() => {
    setIsCompleted(false);
    let nextMode = TimerMode.Focus;
    let nextCycle = cycleCount;

    if (mode === TimerMode.Focus) {
      if (cycleCount % settings.longBreakInterval === 0) {
        nextMode = TimerMode.LongBreak;
      } else {
        nextMode = TimerMode.ShortBreak;
      }
    } else {
      // If coming from a break, go back to focus.
      if (mode === TimerMode.LongBreak) {
         nextCycle = 1; // Reset cycles after long break
      } else {
         nextCycle = cycleCount + 1;
      }
      nextMode = TimerMode.Focus;
    }

    setMode(nextMode);
    setCycleCount(nextCycle);
    setTimeLeft(getDurationForMode(nextMode, settings));
    
    // Auto-start logic
    const shouldAutoStart = nextMode === TimerMode.Focus 
      ? settings.autoStartPomodoros 
      : settings.autoStartBreaks;
      
    if (shouldAutoStart) {
      startTimer(getDurationForMode(nextMode, settings));
    } else {
      setIsActive(false);
      endTimeRef.current = null;
    }
  }, [mode, cycleCount, settings, getDurationForMode]);

  const tick = useCallback(() => {
    if (!endTimeRef.current) return;
    
    const now = Date.now();
    const remaining = Math.ceil((endTimeRef.current - now) / 1000);

    if (remaining <= 0) {
      setTimeLeft(0);
      setIsActive(false);
      setIsCompleted(true); // Trigger completion state
      
      // Record completed session
      const duration = getDurationForMode(mode, settings);
      recordSession(mode, Math.floor(duration / 60), true);
      
      // Play sound if enabled
      if (settings.enableSounds) {
        playCompletionSound();
      }
      
      // Show notification if enabled
      if (settings.enableNotifications) {
        notifyTimerComplete(mode);
      }
      
      endTimeRef.current = null;
      
      // Delay switch to allow visual cue of completion
      setTimeout(() => {
         switchMode();
      }, 1500);
    } else {
      setTimeLeft(remaining);
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [switchMode]);

  const startTimer = (duration?: number) => {
    if (isCompleted) setIsCompleted(false);
    const timeToUse = duration ?? timeLeft;
    setIsActive(true);
    // Calculate end time based on current time + remaining seconds
    endTimeRef.current = Date.now() + timeToUse * 1000;
    rafRef.current = requestAnimationFrame(tick);
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    endTimeRef.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setIsCompleted(false);
    setTimeLeft(getDurationForMode(mode, settings));
  };

  const toggleTimer = () => {
    if (isActive) pauseTimer();
    else startTimer();
  };

  return {
    mode,
    setMode,
    timeLeft,
    isActive,
    isCompleted,
    cycleCount,
    toggleTimer,
    resetTimer,
    totalTime: getDurationForMode(mode, settings)
  };
};