import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
import { useTimer } from './hooks/useTimer';
import { Settings, TimerMode, PixabayImage } from './types';
import { DEFAULT_SETTINGS, MODE_COLORS, MODE_GRADIENTS } from './constants';
import { ProgressRing } from './components/ProgressRing';
import { Controls } from './components/Controls';
import { ModeSelector } from './components/ModeSelector';
import { fetchAestheticBackground, getPhotographerUrl, getPixabayUrl } from './utils/pixabay';
import { requestNotificationPermission } from './utils/notifications';
import { updateFavicon } from './utils/favicon';

// Lazy load heavy components
const SettingsModal = lazy(() => import('./components/SettingsModal').then(m => ({ default: m.SettingsModal })));
const MusicPlayer = lazy(() => import('./components/MusicPlayer').then(m => ({ default: m.MusicPlayer })));
const FaqModal = lazy(() => import('./components/FaqModal').then(m => ({ default: m.FaqModal })));
const FaqInline = lazy(() => import('./components/FaqInline').then(m => ({ default: m.FaqInline })));
const MotivationalCharacter = lazy(() => import('./components/MotivationalCharacter').then(m => ({ default: m.MotivationalCharacter })));
const AboutModal = lazy(() => import('./components/AboutModal').then(m => ({ default: m.AboutModal })));
const Confetti = lazy(() => import('./components/Confetti').then(m => ({ default: m.Confetti })));
const KeyboardShortcutsHelp = lazy(() => import('./components/KeyboardShortcutsHelp').then(m => ({ default: m.KeyboardShortcutsHelp })));
const StatisticsModal = lazy(() => import('./components/StatisticsModal').then(m => ({ default: m.StatisticsModal })));

function App() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old settings to include new fields
        const migratedSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          musicPlatform: parsed.musicPlatform || DEFAULT_SETTINGS.musicPlatform,
          spotifyPlaylistUrl: parsed.spotifyPlaylistUrl || DEFAULT_SETTINGS.spotifyPlaylistUrl,
          youtubePlaylistUrl: parsed.youtubePlaylistUrl || DEFAULT_SETTINGS.youtubePlaylistUrl,
          enableSounds: parsed.enableSounds !== undefined ? parsed.enableSounds : DEFAULT_SETTINGS.enableSounds,
          enableNotifications: parsed.enableNotifications !== undefined ? parsed.enableNotifications : DEFAULT_SETTINGS.enableNotifications
        };
        console.log('Loaded settings:', migratedSettings);
        return migratedSettings;
      } catch (e) {
        console.error('Failed to parse settings:', e);
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pomodoro-theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false);
  const [showCharacter, setShowCharacter] = useState(() => {
    const saved = localStorage.getItem('pomodoro-show-character');
    return saved ? saved === 'true' : true;
  });
  const [isMusicPlayerExpanded, setIsMusicPlayerExpanded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<PixabayImage | null>(null);
  const [showBackgroundCredit, setShowBackgroundCredit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    mode,
    setMode,
    timeLeft,
    isActive,
    isCompleted,
    cycleCount,
    toggleTimer,
    resetTimer,
    totalTime
  } = useTimer(settings);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pomodoro-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pomodoro-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoro-show-character', showCharacter.toString());
  }, [showCharacter]);

  // Request notification permission on mount if enabled
  useEffect(() => {
    if (settings.enableNotifications) {
      requestNotificationPermission();
    }
  }, [settings.enableNotifications]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          toggleTimer();
          break;
        case 'r':
          e.preventDefault();
          resetTimer();
          break;
        case '1':
          e.preventDefault();
          setMode(TimerMode.Focus);
          resetTimer();
          break;
        case '2':
          e.preventDefault();
          setMode(TimerMode.ShortBreak);
          resetTimer();
          break;
        case '3':
          e.preventDefault();
          setMode(TimerMode.LongBreak);
          resetTimer();
          break;
        case 'escape':
          e.preventDefault();
          // Blur the currently focused element to remove focus ring
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          setIsSettingsOpen(false);
          setIsFaqOpen(false);
          setIsAboutOpen(false);
          setIsStatsOpen(false);
          setIsKeyboardShortcutsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTimer, resetTimer, setMode]);

  // Detect mobile/desktop for background orientation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch background image
  useEffect(() => {
    const loadBackground = async () => {
      console.log('loadBackground called', { enableBackgrounds: settings.enableBackgrounds, isMobile });
      
      if (!settings.enableBackgrounds) {
        setBackgroundImage(null);
        return;
      }

      const image = await fetchAestheticBackground(isMobile);
      console.log('Fetched image:', image);
      
      if (image) {
        setBackgroundImage(image);
        setShowBackgroundCredit(true);
        // Hide credit after 5 seconds
        setTimeout(() => setShowBackgroundCredit(false), 5000);
      }
    };

    loadBackground();
    
    // Refresh background every hour
    if (settings.enableBackgrounds) {
      const interval = setInterval(loadBackground, 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [settings.enableBackgrounds, isMobile]);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const status = isCompleted ? 'Completed!' : (mode === TimerMode.Focus ? 'Focus' : 'Break');
    document.title = `${timeString} - ${status}`;
    
    // Update favicon with progress
    const progress = calculateProgress();
    updateFavicon(progress, mode);
  }, [timeLeft, mode, isCompleted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (isCompleted) return 100;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Correct cycle calculation: 1-based index for display, modulo for progress bar
  const cycleProgress = (cycleCount - 1) % settings.longBreakInterval + 1;

  // Trigger confetti when completing a full cycle (before long break)
  useEffect(() => {
    if (isCompleted && mode === TimerMode.Focus && cycleProgress === settings.longBreakInterval) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  }, [isCompleted, mode, cycleProgress, settings.longBreakInterval]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-3 sm:p-6 font-sans relative overflow-hidden transition-all duration-700"
      style={backgroundImage && settings.enableBackgrounds ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage.largeImageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {/* Background Image Credit */}
      {backgroundImage && settings.enableBackgrounds && showBackgroundCredit && (
        <div className="fixed bottom-4 left-4 z-40 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg transition-opacity duration-500 animate-fade-in">
          Photo by{' '}
          <a
            href={getPhotographerUrl(backgroundImage.pageURL)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-300 transition-colors"
          >
            {backgroundImage.user}
          </a>
          {' '}on{' '}
          <a
            href={getPixabayUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-300 transition-colors"
          >
            Pixabay
          </a>
        </div>
      )}
      
      {/* Main Container - Responsive Grid Layout */}
      <div className="w-full max-w-7xl lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
        
        {/* Timer Card */}
        <div className={`relative w-full glass-panel rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 z-10 animate-slide-up flex flex-col items-center lg:sticky lg:top-6 transition-all duration-500 hover:shadow-2xl ${isMusicPlayerExpanded ? 'lg:max-h-screen' : ''}`} style={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.08)'
        }}>

          {/* Mode Selector */}
          <div className="mb-8 sm:mb-12 w-full">
              <ModeSelector currentMode={mode} onSelectMode={(m) => {
                  setMode(m);
                  resetTimer();
              }} />
          </div>

          {/* Timer Display */}
          <div className={`relative transition-all duration-700 ease-out transform ${isCompleted ? 'scale-110 animate-pulse-glow' : (!isActive ? 'animate-breathe' : '')}`}>
            <div className="relative flex flex-col items-center justify-center">
               <ProgressRing 
                 radius={140} 
                 stroke={8} 
                 progress={calculateProgress()} 
                 mode={mode}
               />
               
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                  <span className={`text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums transition-all duration-500 ${MODE_COLORS[mode].text} ${isCompleted ? 'animate-pulse-glow' : ''}`} style={{
                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
                    WebkitFontSmoothing: 'antialiased',
                    letterSpacing: '-0.02em'
                  }}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className={`mt-3 text-sm font-bold uppercase tracking-[0.3em] transition-all duration-500 ${isCompleted ? 'text-emerald-500 scale-110 animate-pulse-glow' : 'text-gray-600 dark:text-gray-400'}`} style={{
                    textShadow: isCompleted ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none'
                  }}>
                    {isCompleted ? 'Session Done' : (isActive ? 'Active' : 'Paused')}
                  </span>
               </div>
            </div>
          </div>

          {/* Controls */}
          <Controls 
            isActive={isActive} 
            onToggle={toggleTimer} 
            onReset={resetTimer} 
            mode={mode}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenFaq={() => setIsFaqOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
            onOpenStats={() => setIsStatsOpen(true)}
            onOpenKeyboardShortcuts={() => setIsKeyboardShortcutsOpen(true)}
            showCharacter={showCharacter}
            onToggleCharacter={() => setShowCharacter(!showCharacter)}
          />

          {/* Footer Info / Cycle Progress */}
          <div className="mt-12 w-full">
              <div className="flex justify-between items-end mb-3 px-1">
                  <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 font-bold">Cycle Progress</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {cycleProgress} <span className="text-gray-400">/</span> {settings.longBreakInterval}
                  </span>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="w-full h-2.5 bg-gray-200/60 dark:bg-gray-700/60 rounded-full overflow-hidden backdrop-blur-sm" style={{
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                  <div 
                      className={`h-full ${MODE_GRADIENTS[mode]} transition-all duration-700 ease-out rounded-full`} 
                      style={{ 
                        width: `${(cycleProgress / settings.longBreakInterval) * 100}%`,
                        boxShadow: '0 0 12px rgba(0, 0, 0, 0.2), 0 0 24px currentColor',
                        filter: 'brightness(1.1)'
                      }}
                  ></div>
              </div>
          </div>

          {/* Music Player - Mobile Only */}
          <div className={`w-full lg:hidden transition-all duration-300 ${isMusicPlayerExpanded ? 'mt-6' : 'mt-8'}`}>
            <Suspense fallback={<div className="glass-panel rounded-2xl p-4 h-32 animate-pulse" />}>
              <MusicPlayer 
                mode={mode} 
                platform={settings.musicPlatform}
                spotifyUrl={settings.spotifyPlaylistUrl}
                youtubeUrl={settings.youtubePlaylistUrl}
                onExpandChange={setIsMusicPlayerExpanded}
              />
            </Suspense>
          </div>

        </div>

        {/* Music Player - Desktop Only */}
        <div className="hidden lg:block w-full space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className={`glass-panel rounded-[2.5rem] p-8 lg:p-10 sticky top-6 transition-all duration-300`}>
            <Suspense fallback={<div className="h-32 animate-pulse" />}>
              <MusicPlayer 
                mode={mode} 
                platform={settings.musicPlatform}
                spotifyUrl={settings.spotifyPlaylistUrl}
                youtubeUrl={settings.youtubePlaylistUrl}
                onExpandChange={setIsMusicPlayerExpanded}
              />
            </Suspense>
          </div>
          
          {/* FAQ Section - Desktop Only */}
          <div className="glass-panel rounded-[2.5rem] p-8 lg:p-10">
            <Suspense fallback={<div className="h-64 animate-pulse" />}>
              <FaqInline mode={mode} />
            </Suspense>
          </div>
        </div>

      </div>

      <Suspense fallback={null}>
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={setSettings}
        />
      </Suspense>

      <Suspense fallback={null}>
        <FaqModal 
          isOpen={isFaqOpen}
          onClose={() => setIsFaqOpen(false)}
        />
      </Suspense>

      <Suspense fallback={null}>
        <AboutModal 
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          mode={mode}
        />
      </Suspense>

      <Suspense fallback={null}>
        <StatisticsModal 
          isOpen={isStatsOpen}
          onClose={() => setIsStatsOpen(false)}
          mode={mode}
        />
      </Suspense>

      <Suspense fallback={null}>
        <Confetti trigger={showConfetti} />
      </Suspense>

      <Suspense fallback={null}>
        <KeyboardShortcutsHelp 
          isOpen={isKeyboardShortcutsOpen}
          onClose={() => setIsKeyboardShortcutsOpen(false)}
          mode={mode}
        />
      </Suspense>

      <Suspense fallback={null}>
        {showCharacter && <MotivationalCharacter mode={mode} isTimerActive={isActive} messageInterval={settings.characterMessageInterval} />}
      </Suspense>
    </div>
  );
}

export default App;