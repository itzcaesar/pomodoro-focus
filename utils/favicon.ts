// Dynamic favicon that shows timer progress

export const updateFavicon = (progress: number, mode: string) => {
  const canvas = document.createElement('canvas');
  const size = 32;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // Define colors based on mode
  const colors = {
    focus: '#fbbf24',      // Amber
    shortbreak: '#2dd4bf',  // Teal
    longbreak: '#38bdf8',   // Sky
  };

  const modeKey = mode.toLowerCase().replace(' ', '') as keyof typeof colors;
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
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL('image/png');
  document.getElementsByTagName('head')[0].appendChild(link);
};

export const resetFavicon = () => {
  const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (link) {
    link.href = '/favicon.ico';
  }
};
