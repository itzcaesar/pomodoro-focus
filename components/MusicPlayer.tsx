import React, { useState, memo, useCallback, useMemo } from 'react';
import { Music, ChevronDown, ChevronUp } from 'lucide-react';
import { TimerMode, MusicPlatform } from '../types';
import { 
  PLAYER_GRADIENTS, 
  PLAYER_BORDERS, 
  PLAYER_ICON_GRADIENTS, 
  PLAYER_TEXT_COLORS, 
  PLAYER_SUBTITLE_COLORS, 
  PLAYER_CHEVRON_COLORS,
  PLAYER_HOVER_BG 
} from '../constants';

interface MusicPlayerProps {
  mode: TimerMode;
  platform: MusicPlatform;
  spotifyUrl: string;
  youtubeUrl: string;
  onExpandChange?: (isExpanded: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = memo(({ mode, platform, spotifyUrl, youtubeUrl, onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract Spotify playlist ID from URL
  const extractSpotifyId = (url: string) => {
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    return match ? match[1] : '37i9dQZF1DWWQRwui0ExPn'; // fallback to default
  };
  
  // Extract YouTube video/playlist ID from URL
  const extractYoutubeId = (url: string) => {
    // Handle playlist URLs
    let match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (match) return { type: 'playlist', id: match[1] };
    
    // Handle video URLs
    match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (match) return { type: 'video', id: match[1] };
    
    // Fallback to lofi girl stream
    return { type: 'video', id: 'jfKfPfyJRdk' };
  };
  
  const spotifyId = useMemo(() => extractSpotifyId(spotifyUrl), [spotifyUrl]);
  const youtubeData = useMemo(() => extractYoutubeId(youtubeUrl), [youtubeUrl]);
  
  const youtubeEmbedUrl = useMemo(() => {
    if (youtubeData.type === 'playlist') {
      return `https://www.youtube.com/embed/videoseries?list=${youtubeData.id}&autoplay=1&mute=0`;
    }
    return `https://www.youtube.com/embed/${youtubeData.id}?autoplay=1&mute=0`;
  }, [youtubeData]);

  const platformName = platform === MusicPlatform.Spotify ? 'Spotify' : 'YouTube';
  
  const handleToggle = useCallback(() => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onExpandChange?.(newState);
  }, [isExpanded, onExpandChange]);

  return (
    <div className="w-full">
      <div className="glass-button rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <button
          onClick={handleToggle}
          className={`w-full p-3 sm:p-4 flex items-center justify-between ${PLAYER_HOVER_BG[mode]} transition-colors`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${PLAYER_ICON_GRADIENTS[mode]} flex items-center justify-center shadow-md`}>
              <Music size={18} className="sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className={`text-xs sm:text-sm font-semibold ${PLAYER_TEXT_COLORS[mode]}`}>
                {platformName} Music
              </h3>
              <p className={`text-[10px] sm:text-xs ${PLAYER_SUBTITLE_COLORS[mode]}`}>
                Focus & Study Music
              </p>
            </div>
          </div>
          <div className={PLAYER_CHEVRON_COLORS[mode]}>
            {isExpanded ? <ChevronUp size={18} className="sm:w-5 sm:h-5" /> : <ChevronDown size={18} className="sm:w-5 sm:h-5" />}
          </div>
        </button>

        {/* Expanded Player */}
        {isExpanded && (
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            {platform === MusicPlatform.Spotify ? (
              <iframe
                key={`spotify-expanded-${spotifyId}`}
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="shadow-lg"
              />
            ) : (
              <iframe
                key={`youtube-expanded-${youtubeData.id}`}
                style={{ borderRadius: '12px' }}
                src={youtubeEmbedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="shadow-lg"
              />
            )}
          </div>
        )}

        {/* Compact Player (when collapsed) */}
        {!isExpanded && (
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            {platform === MusicPlatform.Spotify ? (
              <iframe
                key={`spotify-compact-${spotifyId}`}
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="shadow-md"
              />
            ) : (
              <iframe
                key={`youtube-compact-${youtubeData.id}`}
                style={{ borderRadius: '12px' }}
                src={youtubeEmbedUrl}
                width="100%"
                height="80"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="shadow-md"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
