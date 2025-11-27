import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Target, Flame, Calendar, Clock } from 'lucide-react';
import { getStats, SessionStats } from '../utils/statistics';
import { TimerMode } from '../types';
import { MODE_COLORS } from '../constants';

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: TimerMode;
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({ isOpen, onClose, mode }) => {
  const [stats, setStats] = useState<SessionStats>(getStats());

  useEffect(() => {
    if (isOpen) {
      setStats(getStats());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const accentColor = MODE_COLORS[mode].text;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="glass-panel max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <TrendingUp className={accentColor} size={24} />
            <h2 className={`text-2xl font-bold ${accentColor}`}>
              Your Statistics
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-button text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-all duration-300 active:scale-95"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total Sessions */}
            <div className="glass-input p-4 rounded-2xl text-center">
              <Target className="mx-auto mb-2 text-amber-500 dark:text-amber-400" size={24} />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stats.totalSessions}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Total Sessions
              </div>
            </div>

            {/* Current Streak */}
            <div className="glass-input p-4 rounded-2xl text-center">
              <Flame className="mx-auto mb-2 text-orange-500 dark:text-orange-400" size={24} />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stats.currentStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Current Streak
              </div>
            </div>

            {/* Today's Sessions */}
            <div className="glass-input p-4 rounded-2xl text-center">
              <Calendar className="mx-auto mb-2 text-teal-500 dark:text-teal-400" size={24} />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stats.sessionsToday}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Today's Sessions
              </div>
            </div>

            {/* Longest Streak */}
            <div className="glass-input p-4 rounded-2xl text-center">
              <TrendingUp className="mx-auto mb-2 text-sky-500 dark:text-sky-400" size={24} />
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stats.longestStreak}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Best Streak
              </div>
            </div>
          </div>

          {/* Time Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-input p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="text-amber-500 dark:text-amber-400" size={20} />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Focus Time</h3>
              </div>
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                {formatTime(stats.totalFocusTime)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {Math.floor(stats.totalFocusTime / 60)} hours total
              </div>
            </div>

            <div className="glass-input p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="text-teal-500 dark:text-teal-400" size={20} />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Break Time</h3>
              </div>
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                {formatTime(stats.totalBreakTime)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Well-deserved rest
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          {stats.sessionHistory.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Recent Sessions</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {stats.sessionHistory.slice(0, 10).map((session, index) => {
                  const date = new Date(session.completedAt);
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className="glass-input p-3 rounded-xl flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          session.mode === 'focus' 
                            ? 'bg-amber-500' 
                            : session.mode === 'shortBreak'
                            ? 'bg-teal-500'
                            : 'bg-sky-500'
                        }`} />
                        <span className="font-medium text-gray-700 dark:text-gray-200 capitalize">
                          {session.mode === 'focus' ? 'Focus' : session.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {session.duration}m
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {isToday ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {stats.totalSessions === 0 && (
            <div className="text-center py-8">
              <Target className="mx-auto mb-4 text-gray-400 dark:text-gray-500" size={48} />
              <p className="text-gray-600 dark:text-gray-400 mb-2">No sessions yet!</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Complete your first Pomodoro to start tracking your productivity.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
