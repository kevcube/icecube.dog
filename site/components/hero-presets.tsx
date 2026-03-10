'use client';

import { WebGPUHero } from './webgpu-hero';

export const colorSchemes = {
  default: [
    [0.2, 0.4, 0.9],  // Blue
    [0.5, 0.2, 0.8],  // Purple
    [0.9, 0.3, 0.5],  // Pink
  ],
  sunset: [
    [1.0, 0.4, 0.0],  // Orange
    [1.0, 0.2, 0.4],  // Pink
    [0.5, 0.1, 0.5],  // Purple
  ],
  ocean: [
    [0.0, 0.4, 0.8],  // Deep Blue
    [0.2, 0.7, 0.9],  // Sky Blue
    [0.3, 0.9, 0.8],  // Cyan
  ],
  forest: [
    [0.2, 0.5, 0.2],  // Green
    [0.4, 0.7, 0.3],  // Light Green
    [0.1, 0.3, 0.2],  // Dark Green
  ],
  fire: [
    [1.0, 0.2, 0.0],  // Red
    [1.0, 0.5, 0.0],  // Orange
    [1.0, 0.8, 0.0],  // Yellow
  ],
  midnight: [
    [0.1, 0.1, 0.3],  // Dark Blue
    [0.2, 0.0, 0.4],  // Purple
    [0.0, 0.0, 0.2],  // Almost Black
  ],
  candy: [
    [1.0, 0.4, 0.7],  // Pink
    [0.6, 0.3, 1.0],  // Purple
    [0.4, 0.8, 1.0],  // Light Blue
  ],
  aurora: [
    [0.0, 0.8, 0.6],  // Teal
    [0.3, 0.6, 0.9],  // Blue
    [0.6, 0.3, 0.8],  // Purple
  ],
} as const;

type ColorScheme = keyof typeof colorSchemes;

interface HeroWithPresetProps {
  scheme?: ColorScheme;
  className?: string;
}

export function HeroWithPreset({
  scheme = 'default',
  className
}: HeroWithPresetProps) {
  const colors = [...colorSchemes[scheme].map(c => [...c])] as [number, number, number][];
  return (
    <WebGPUHero
      className={className}
      colors={colors}
    />
  );
}
