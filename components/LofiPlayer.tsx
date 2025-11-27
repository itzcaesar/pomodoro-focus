import React, { useState } from 'react';
import { Music, ChevronDown, ChevronUp } from 'lucide-react';
import { TimerMode } from '../types';
import { 
  PLAYER_GRADIENTS, 
  PLAYER_BORDERS, 
  PLAYER_ICON_GRADIENTS, 
  PLAYER_TEXT_COLORS, 
  PLAYER_SUBTITLE_COLORS, 
  PLAYER_CHEVRON_COLORS,
  PLAYER_HOVER_BG 
} from '../constants';

interface LofiPlayerProps {
  mode: TimerMode;
}

export const LofiPlayer: React.FC<LofiPlayerProps> = ({ mode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Playlist ID from the URL: https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn
  const playlistId = '37i9dQZF1DWWQRwui0ExPn';

  return (
    <div className="w-full">
      <div className="glass-button rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full p-3 sm:p-4 flex items-center justify-between ${PLAYER_HOVER_BG[mode]} transition-colors`}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${PLAYER_ICON_GRADIENTS[mode]} flex items-center justify-center shadow-md`}>
              <Music size={18} className="sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className={`text-xs sm:text-sm font-semibold ${PLAYER_TEXT_COLORS[mode]}`}>
                Lofi Beats
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

        {/* Spotify Embed Player */}
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="shadow-lg"
            />
          </div>
        </div>

        {/* Compact Player (when collapsed) */}
        {!isExpanded && (
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};
