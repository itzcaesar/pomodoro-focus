import React, { useRef, useEffect, useCallback, useState, memo } from 'react';
import { TimerMode } from '../types';

interface PictureInPictureProps {
  timeLeft: number;
  mode: TimerMode;
  isActive: boolean;
  onToggle: () => void;
  isEnabled: boolean;
  onClose: () => void;
}

// Mode colors matching the app theme
const MODE_COLORS = {
  [TimerMode.Focus]: { bg: '#fbbf24', text: '#78350f', label: 'Focus' },
  [TimerMode.ShortBreak]: { bg: '#2dd4bf', text: '#134e4a', label: 'Short Break' },
  [TimerMode.LongBreak]: { bg: '#38bdf8', text: '#0c4a6e', label: 'Long Break' },
};

export const PictureInPicture: React.FC<PictureInPictureProps> = memo(({
  timeLeft,
  mode,
  isActive,
  onToggle,
  isEnabled,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pipWindowRef = useRef<PictureInPictureWindow | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isPipActive, setIsPipActive] = useState(false);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, []);

  // Draw timer on canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { bg, text, label } = MODE_COLORS[mode];
    const width = canvas.width;
    const height = canvas.height;

    // Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Timer text
    ctx.fillStyle = text;
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatTime(timeLeft), width / 2, height / 2 - 10);

    // Mode label
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillText(label, width / 2, height / 2 + 45);

    // Status indicator
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = text + 'aa';
    ctx.fillText(isActive ? '▶ Running' : '⏸ Paused', width / 2, height / 2 + 75);

    // Progress bar background
    const barY = height - 20;
    const barHeight = 8;
    const barPadding = 20;
    ctx.fillStyle = text + '33';
    ctx.fillRect(barPadding, barY, width - barPadding * 2, barHeight);

    // Get total time for mode
    const totalSeconds = mode === TimerMode.Focus ? 25 * 60 :
                         mode === TimerMode.ShortBreak ? 5 * 60 : 15 * 60;
    const progress = 1 - (timeLeft / totalSeconds);

    // Progress bar fill
    ctx.fillStyle = text + 'cc';
    ctx.fillRect(barPadding, barY, (width - barPadding * 2) * progress, barHeight);
  }, [timeLeft, mode, isActive, formatTime]);

  // Update canvas and pipe to video
  useEffect(() => {
    if (!isEnabled || !canvasRef.current || !videoRef.current) return;

    drawCanvas();

    // Capture canvas stream to video
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video.srcObject) {
      const stream = canvas.captureStream(30);
      video.srcObject = stream;
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [isEnabled, drawCanvas, timeLeft]);

  // Handle PiP window actions
  useEffect(() => {
    if (!pipWindowRef.current) return;

    // Update action handlers for play/pause
    if ('setActionHandler' in navigator.mediaSession) {
      navigator.mediaSession.setActionHandler('play', onToggle);
      navigator.mediaSession.setActionHandler('pause', onToggle);
    }
  }, [onToggle, isPipActive]);

  // Open PiP
  const openPip = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !document.pictureInPictureEnabled) {
      console.warn('PiP not supported');
      return;
    }

    try {
      // Ensure video is playing
      await video.play();
      
      // Request PiP
      const pipWindow = await video.requestPictureInPicture();
      pipWindowRef.current = pipWindow;
      setIsPipActive(true);

      // Handle PiP close
      pipWindow.addEventListener('resize', () => {
        // Redraw on resize if needed
        drawCanvas();
      });

      video.addEventListener('leavepictureinpicture', () => {
        setIsPipActive(false);
        pipWindowRef.current = null;
        onClose();
      }, { once: true });

    } catch (err) {
      console.error('Failed to open PiP:', err);
    }
  }, [drawCanvas, onClose]);

  // Close PiP
  const closePip = useCallback(async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    }
    setIsPipActive(false);
    pipWindowRef.current = null;
  }, []);

  // Auto-open PiP when enabled
  useEffect(() => {
    if (isEnabled && !isPipActive) {
      // Small delay to ensure canvas is ready
      const timer = setTimeout(openPip, 100);
      return () => clearTimeout(timer);
    } else if (!isEnabled && isPipActive) {
      closePip();
    }
  }, [isEnabled, isPipActive, openPip, closePip]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch(() => {});
      }
    };
  }, []);

  // Don't render anything visible - canvas and video are hidden
  return (
    <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
      <canvas
        ref={canvasRef}
        width={300}
        height={180}
        className="hidden"
      />
      <video
        ref={videoRef}
        width={300}
        height={180}
        muted
        playsInline
        className="hidden"
      />
    </div>
  );
});

PictureInPicture.displayName = 'PictureInPicture';

// Check if PiP is supported
export const isPipSupported = () => {
  return typeof document !== 'undefined' && 
         'pictureInPictureEnabled' in document && 
         document.pictureInPictureEnabled;
};
