import { Palette } from './types';

export const modernPalettes: Palette[] = [
  {
    id: 'urban-concrete',
    title: 'Urban Concrete',
    colors: [
      { hex: '#D8D9DA', name: 'Raw Concrete' },
      { hex: '#61677A', name: 'Steel Gray' },
      { hex: '#272829', name: 'Asphalt' },
      { hex: '#FFF6E0', name: 'City Light' },
      { hex: '#8B8B8B', name: 'Urban Gray' }
    ],
    likes: 145,
    tags: ['urban', 'modern', 'minimal', 'industrial'],
    createdAt: '2025-04-22',
    author: 'Urban Architect'
  },
  {
    id: 'cyber-neon',
    title: 'Cyber Neon',
    colors: [
      { hex: '#FF2E63', name: 'Neon Pink' },
      { hex: '#08F7FE', name: 'Cyber Blue' },
      { hex: '#712B75', name: 'Deep Purple' },
      { hex: '#140152', name: 'Night Core' },
      { hex: '#00FF9F', name: 'Matrix Green' }
    ],
    likes: 245,
    tags: ['cyberpunk', 'neon', 'futuristic', 'vibrant'],
    createdAt: '2025-04-22',
    author: 'Kai Zhang'
  },
  {
    id: 'retro-wave',
    title: 'Retro Wave',
    colors: [
      { hex: '#FF69B4', name: 'Hot Pink' },
      { hex: '#4B0082', name: 'Indigo' },
      { hex: '#00FFFF', name: 'Aqua' },
      { hex: '#9400D3', name: 'Violet' },
      { hex: '#FF1493', name: 'Deep Pink' }
    ],
    likes: 278,
    tags: ['retro', '80s', 'synthwave', 'vibrant'],
    createdAt: '2025-04-22',
    author: 'Mike Synthwave'
  }
];
