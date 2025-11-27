// Statistics tracking for Pomodoro sessions

export interface SessionStats {
  totalSessions: number;
  totalFocusTime: number; // in minutes
  totalBreakTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  sessionsToday: number;
  sessionHistory: SessionRecord[];
}

export interface SessionRecord {
  mode: string;
  duration: number; // in minutes
  completedAt: string; // ISO date string
  wasCompleted: boolean;
}

const STATS_KEY = 'pomodoro-stats';

export const getStats = (): SessionStats => {
  const saved = localStorage.getItem(STATS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse stats:', e);
    }
  }
  
  return {
    totalSessions: 0,
    totalFocusTime: 0,
    totalBreakTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastSessionDate: null,
    sessionsToday: 0,
    sessionHistory: [],
  };
};

export const saveStats = (stats: SessionStats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const recordSession = (mode: string, duration: number, wasCompleted: boolean) => {
  const stats = getStats();
  const now = new Date();
  const today = now.toDateString();
  
  const session: SessionRecord = {
    mode,
    duration,
    completedAt: now.toISOString(),
    wasCompleted,
  };
  
  // Add to history (keep last 100 sessions)
  stats.sessionHistory = [session, ...stats.sessionHistory].slice(0, 100);
  
  if (wasCompleted) {
    stats.totalSessions++;
    
    if (mode === 'focus') {
      stats.totalFocusTime += duration;
      
      // Update streak
      if (stats.lastSessionDate === today) {
        // Same day, just increment sessions today
        stats.sessionsToday++;
      } else if (stats.lastSessionDate) {
        const lastDate = new Date(stats.lastSessionDate);
        const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day
          stats.currentStreak++;
          stats.sessionsToday = 1;
        } else if (daysDiff > 1) {
          // Streak broken
          stats.currentStreak = 1;
          stats.sessionsToday = 1;
        }
      } else {
        // First session ever
        stats.currentStreak = 1;
        stats.sessionsToday = 1;
      }
      
      stats.lastSessionDate = today;
      
      if (stats.currentStreak > stats.longestStreak) {
        stats.longestStreak = stats.currentStreak;
      }
    } else {
      stats.totalBreakTime += duration;
    }
  }
  
  saveStats(stats);
  return stats;
};

export const resetStats = () => {
  localStorage.removeItem(STATS_KEY);
};
