import { Palette } from './types';

export const naturePalettes: Palette[] = [
  {
    id: 'modern-mint',
    title: 'Modern Mint',
    colors: [
      { hex: '#00A878', name: 'Fresh Mint' },
      { hex: '#F0F3F4', name: 'Cloud White' },
      { hex: '#40514E', name: 'Deep Forest' },
      { hex: '#2B7A78', name: 'Ocean Teal' },
      { hex: '#DEF2F1', name: 'Mint Frost' },
    ],
    likes: 342,
    tags: ['modern', 'mint', 'minimal', 'fresh'],
    createdAt: '2025-04-20',
    author: 'Sarah Chen'
  },
  {
    id: 'forest-depths',
    title: 'Forest Depths',
    colors: [
      { hex: '#1A4D2E', name: 'Pine Needle' },
      { hex: '#9EC8B9', name: 'Moss Light' },
      { hex: '#5C8374', name: 'Forest Shade' },
      { hex: '#092635', name: 'Deep Woods' },
      { hex: '#B4CFB0', name: 'Fern Mist' }
    ],
    likes: 189,
    tags: ['forest', 'natural', 'deep', 'serene'],
    createdAt: '2025-04-22',
    author: 'Forest Green'
  },
  {
    id: 'monstera-leaf',
    title: 'Monstera Leaf',
    colors: [
      { hex: '#395144', name: 'Deep Leaf' },
      { hex: '#4E6C50', name: 'Forest Shadow' },
      { hex: '#AA8B56', name: 'Wooden Pot' },
      { hex: '#F0EBCE', name: 'Natural Light' },
      { hex: '#557153', name: 'Plant Life' }
    ],
    likes: 176,
    tags: ['plant', 'natural', 'green', 'organic'],
    createdAt: '2025-04-22',
    author: 'Plant Lover'
  },
  {
    id: 'ocean-depths',
    title: 'Ocean Depths',
    colors: [
      { hex: '#001C30', name: 'Deep Sea' },
      { hex: '#176B87', name: 'Ocean Current' },
      { hex: '#64CCC5', name: 'Shallow Waters' },
      { hex: '#DAFFFB', name: 'Sea Foam' },
      { hex: '#04364A', name: 'Midnight Waters' }
    ],
    likes: 245,
    tags: ['ocean', 'deep', 'blue', 'serene'],
    createdAt: '2025-04-22',
    author: 'Marina Blue'
  }
];
