// Dynamic favicon that shows timer progress
// Optimized with canvas reuse and cached references

// Cache canvas and link element for reuse
let cachedCanvas: HTMLCanvasElement | null = null;
let cachedLink: HTMLLinkElement | null = null;
let lastProgress = -1;
let lastMode = '';

const getCanvas = () => {
  if (!cachedCanvas) {
    cachedCanvas = document.createElement('canvas');
    cachedCanvas.width = 32;
    cachedCanvas.height = 32;
  }
  return cachedCanvas;
};

const getLink = () => {
  if (!cachedLink) {
    cachedLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!cachedLink) {
      cachedLink = document.createElement('link');
      cachedLink.type = 'image/x-icon';
      cachedLink.rel = 'shortcut icon';
      document.head.appendChild(cachedLink);
    }
  }
  return cachedLink;
};

export const updateFavicon = (progress: number, mode: string) => {
  // Skip if no significant change (reduce redraws)
  const roundedProgress = Math.round(progress);
  if (roundedProgress === lastProgress && mode === lastMode) return;
  lastProgress = roundedProgress;
  lastMode = mode;

  const canvas = getCanvas();
  const size = 32;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // Define colors based on mode
  const colors: Record<string, string> = {
    focus: '#fbbf24',      // Amber
    shortbreak: '#2dd4bf',  // Teal
    longbreak: '#38bdf8',   // Sky
  };

  const modeKey = mode.toLowerCase().replace(' ', '');
  const color = colors[modeKey] || colors.focus;

  // Draw background circle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
  ctx.fillStyle = '#f3f4f6';
  ctx.fill();

  // Draw progress arc
  const startAngle = -Math.PI / 2; // Start from top
  const endAngle = startAngle + (2 * Math.PI * progress) / 100;
  
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, startAngle, endAngle);
  ctx.lineTo(size / 2, size / 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Draw center circle (white)
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 3, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Update favicon
  const link = getLink();
  link.href = canvas.toDataURL('image/png');
};

export const resetFavicon = () => {
  lastProgress = -1;
  lastMode = '';
  const link = getLink();
  link.href = '/favicon.ico';
};
