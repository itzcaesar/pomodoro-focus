// Browser notification utilities

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, body: string, icon?: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'pomodoro-timer',
      requireInteraction: false,
    });
  }
};

export const notifyTimerComplete = (mode: string) => {
  const titles = {
    focus: '🎯 Focus Session Complete!',
    shortBreak: '☕ Short Break Complete!',
    longBreak: '🌟 Long Break Complete!',
  };

  const bodies = {
    focus: 'Great work! Time for a well-deserved break.',
    shortBreak: 'Break time is over. Ready to focus again?',
    longBreak: 'Long break finished! Feeling refreshed?',
  };

  const modeKey = mode.toLowerCase().replace(' ', '') as keyof typeof titles;
  showNotification(titles[modeKey] || 'Timer Complete!', bodies[modeKey] || 'Your session has ended.');
};
