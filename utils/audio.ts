// Completion sound for timer
export const playCompletionSound = () => {
  // Create a pleasant bell sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const playNote = (frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };
  
  // Play a pleasant three-note chime
  const now = audioContext.currentTime;
  playNote(523.25, now, 0.3);        // C5
  playNote(659.25, now + 0.15, 0.3); // E5
  playNote(783.99, now + 0.3, 0.4);  // G5
};
