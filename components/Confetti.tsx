import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

interface Particle {
  id: number;
  left: number;
  backgroundColor: string;
  animationDelay: string;
  animationDuration: string;
}

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = [
        '#fbbf24', '#f97316', // Amber/Orange
        '#2dd4bf', '#10b981', // Teal/Emerald
        '#38bdf8', '#3b82f6', // Sky/Blue
        '#f43f5e', '#ec4899', // Rose/Pink
        '#a855f7', '#8b5cf6', // Purple/Violet
      ];

      const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: `${Math.random() * 0.3}s`,
        animationDuration: `${2 + Math.random() * 1}s`,
      }));

      setParticles(newParticles);

      // Clear after animation
      const timer = setTimeout(() => setParticles([]), 3500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 w-3 h-3 rounded-full animate-confetti-fall"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.backgroundColor,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  );
};
