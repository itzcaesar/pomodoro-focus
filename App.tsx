import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
import { useTimer } from './hooks/useTimer';
import { Settings, TimerMode, PixabayImage } from './types';
import { DEFAULT_SETTINGS, MODE_COLORS, MODE_GRADIENTS } from './constants';
import { ProgressRing } from './components/ProgressRing';
import { Controls } from './components/Controls';
import { SettingsModal } from './components/SettingsModal';
import { ModeSelector } from './components/ModeSelector';
import { LofiPlayer } from './components/LofiPlayer';
import { FaqModal } from './components/FaqModal';
import { FaqInline } from './components/FaqInline';
import { MotivationalCharacter } from './components/MotivationalCharacter';
import { fetchAestheticBackground, getPhotographerUrl, getPixabayUrl } from './utils/pixabay';

function App() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('pomodoro-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old settings to include new spotifyPlaylistUrl field
        const migratedSettings = {
          ...DEFAULT_SETTINGS,
          ...parsed,
          spotifyPlaylistUrl: parsed.spotifyPlaylistUrl || DEFAULT_SETTINGS.spotifyPlaylistUrl
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
  const [showCharacter, setShowCharacter] = useState(() => {
    const saved = localStorage.getItem('pomodoro-show-character');
    return saved ? saved === 'true' : true;
  });
  const [backgroundImage, setBackgroundImage] = useState<PixabayImage | null>(null);
  const [showBackgroundCredit, setShowBackgroundCredit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
        <div className="relative w-full glass-panel rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 z-10 animate-slide-up flex flex-col items-center lg:sticky lg:top-6">

          {/* Mode Selector */}
          <div className="mb-8 sm:mb-12 w-full">
              <ModeSelector currentMode={mode} onSelectMode={(m) => {
                  setMode(m);
                  resetTimer();
              }} />
          </div>

          {/* Timer Display */}
          <div className={`relative transition-all duration-700 ease-out transform ${isCompleted ? 'scale-110' : ''}`}>
            <div className="relative flex flex-col items-center justify-center">
               <ProgressRing 
                 radius={140} 
                 stroke={8} 
                 progress={calculateProgress()} 
                 mode={mode}
               />
               
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                  <span className={`text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums transition-colors duration-500 ${MODE_COLORS[mode]} drop-shadow-md`}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className={`mt-2 text-sm font-bold uppercase tracking-[0.25em] transition-all duration-500 ${isCompleted ? 'text-emerald-500 scale-110' : 'text-gray-600 dark:text-gray-400'}`}>
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
              
              {/* Liquid Progress Bar */}
              <div className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                      className={`h-full ${MODE_GRADIENTS[mode]} transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`} 
                      style={{ width: `${(cycleProgress / settings.longBreakInterval) * 100}%` }}
                  ></div>
              </div>
          </div>

          {/* Lofi Music Player - Mobile Only */}
          <div className="mt-8 w-full lg:hidden">
            <LofiPlayer mode={mode} playlistUrl={settings.spotifyPlaylistUrl} />
          </div>

        </div>

        {/* Lofi Music Player - Desktop Only */}
        <div className="hidden lg:block w-full space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel rounded-[2.5rem] p-8 lg:p-10 sticky top-6">
            <LofiPlayer mode={mode} playlistUrl={settings.spotifyPlaylistUrl} />
          </div>
          
          {/* FAQ Section - Desktop Only */}
          <div className="glass-panel rounded-[2.5rem] p-8 lg:p-10">
            <FaqInline mode={mode} />
          </div>
        </div>

      </div>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      <FaqModal 
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />

      {showCharacter && <MotivationalCharacter mode={mode} isTimerActive={isActive} messageInterval={settings.characterMessageInterval} />}
    </div>
  );
}

export default App;