import React from 'react';
import { Settings, MusicPlatform } from '../types';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (newSettings: Settings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onUpdateSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : Number(value),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Glass Modal Card */}
      <div className="glass-panel w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-slide-up flex flex-col max-h-[85vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-white/20 dark:border-white/10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Timer Durations */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Durations (min)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="group">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">Focus</label>
                <input
                  type="number"
                  name="focusDuration"
                  value={settings.focusDuration}
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 outline-none transition-all focus:ring-2 focus:ring-rose-400/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">Short Break</label>
                <input
                  type="number"
                  name="shortBreakDuration"
                  value={settings.shortBreakDuration}
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 outline-none transition-all focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">Long Break</label>
                <input
                  type="number"
                  name="longBreakDuration"
                  value={settings.longBreakDuration}
                  onChange={handleChange}
                  className="w-full glass-input rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 outline-none transition-all focus:ring-2 focus:ring-violet-400/50"
                />
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Preferences</h3>
             
             {/* Switches */}
             {[
               { label: 'Auto-start Breaks', name: 'autoStartBreaks', color: 'bg-emerald-500' },
               { label: 'Auto-start Pomodoros', name: 'autoStartPomodoros', color: 'bg-emerald-500' },
               { label: 'Aesthetic Backgrounds', name: 'enableBackgrounds', color: 'bg-rose-500' }
             ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-xl glass-input">
                    <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name={item.name}
                        checked={settings[item.name as keyof Settings] as boolean}
                        onChange={handleChange}
                        className="sr-only peer" 
                    />
                    <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:${item.color} shadow-inner`}></div>
                    </label>
                </div>
             ))}

             <div className="flex items-center justify-between p-3 rounded-xl glass-input">
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">Long Break Interval</span>
                <input
                  type="number"
                  name="longBreakInterval"
                  value={settings.longBreakInterval}
                  onChange={handleChange}
                  className="w-16 bg-white/50 dark:bg-black/20 border border-transparent focus:border-violet-400 rounded-lg px-2 py-1 text-center text-gray-800 dark:text-gray-100 outline-none"
                />
             </div>

             <div className="flex items-center justify-between p-3 rounded-xl glass-input">
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">Character Message Interval (sec)</span>
                <input
                  type="number"
                  name="characterMessageInterval"
                  value={settings.characterMessageInterval}
                  onChange={handleChange}
                  min="5"
                  max="120"
                  className="w-16 bg-white/50 dark:bg-black/20 border border-transparent focus:border-rose-400 rounded-lg px-2 py-1 text-center text-gray-800 dark:text-gray-100 outline-none"
                />
             </div>

             <div className="space-y-3">
               <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Music Platform</h3>
               
               <div className="flex gap-3">
                 <button
                   onClick={() => onUpdateSettings({ ...settings, musicPlatform: MusicPlatform.YouTube })}
                   className={`flex-1 p-3 rounded-xl transition-all ${
                     settings.musicPlatform === MusicPlatform.YouTube
                       ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg'
                       : 'glass-input text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10'
                   }`}
                 >
                   <div className="text-sm font-semibold">YouTube</div>
                   <div className="text-[10px] opacity-80">Full playback + volume</div>
                 </button>
                 
                 <button
                   onClick={() => onUpdateSettings({ ...settings, musicPlatform: MusicPlatform.Spotify })}
                   className={`flex-1 p-3 rounded-xl transition-all ${
                     settings.musicPlatform === MusicPlatform.Spotify
                       ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg'
                       : 'glass-input text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10'
                   }`}
                 >
                   <div className="text-sm font-semibold">Spotify</div>
                   <div className="text-[10px] opacity-80">Login required</div>
                 </button>
               </div>
             </div>

             <div className="p-3 rounded-xl glass-input space-y-2">
                <span className="text-gray-700 dark:text-gray-200 font-medium text-sm block">
                  {settings.musicPlatform === MusicPlatform.Spotify ? 'Spotify Playlist URL' : 'YouTube Video/Playlist URL'}
                </span>
                <input
                  type="text"
                  name={settings.musicPlatform === MusicPlatform.Spotify ? 'spotifyPlaylistUrl' : 'youtubePlaylistUrl'}
                  value={settings.musicPlatform === MusicPlatform.Spotify ? settings.spotifyPlaylistUrl : settings.youtubePlaylistUrl}
                  onChange={(e) => onUpdateSettings({ 
                    ...settings, 
                    [settings.musicPlatform === MusicPlatform.Spotify ? 'spotifyPlaylistUrl' : 'youtubePlaylistUrl']: e.target.value 
                  })}
                  placeholder={settings.musicPlatform === MusicPlatform.Spotify 
                    ? 'https://open.spotify.com/playlist/...' 
                    : 'https://www.youtube.com/watch?v=...'}
                  className="w-full bg-white/50 dark:bg-black/20 border border-transparent focus:border-emerald-400 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none"
                />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  {settings.musicPlatform === MusicPlatform.Spotify 
                    ? 'Paste any Spotify playlist URL to customize your music' 
                    : 'Paste any YouTube video or playlist URL for lofi music'}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};