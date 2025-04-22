
// Mock data for color palettes
export interface Color {
  hex: string;
  rgb?: string;
  name?: string;
}

export interface Palette {
  id: string;
  title: string;
  colors: Color[];
  likes: number;
  tags: string[];
  createdAt: string;
  author: string;
}

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'warm', name: 'Warm' },
  { id: 'cool', name: 'Cool' },
  { id: 'pastel', name: 'Pastel' },
  { id: 'vibrant', name: 'Vibrant' },
  { id: 'dark', name: 'Dark' },
  { id: 'light', name: 'Light' },
  { id: 'monochrome', name: 'Monochrome' },
];

export const palettes: Palette[] = [
  {
    id: '1',
    title: 'Summer Sunset',
    colors: [
      { hex: '#FF9A8B', name: 'Salmon Pink' },
      { hex: '#FF6B6B', name: 'Bittersweet' },
      { hex: '#FFB347', name: 'Pastel Orange' },
      { hex: '#FFC837', name: 'Sunglow' },
    ],
    likes: 256,
    tags: ['warm', 'vibrant', 'sunset'],
    createdAt: '2023-05-12',
    author: 'ColorLover',
  },
  {
    id: '2',
    title: 'Ocean Breeze',
    colors: [
      { hex: '#48AAAD', name: 'Cadet Blue' },
      { hex: '#5B9BC9', name: 'Steel Blue' },
      { hex: '#9BC1BC', name: 'Opal' },
      { hex: '#BFD7EA', name: 'Beau Blue' },
    ],
    likes: 189,
    tags: ['cool', 'calm', 'blue'],
    createdAt: '2023-06-18',
    author: 'WaveDesigner',
  },
  {
    id: '3',
    title: 'Forest Dream',
    colors: [
      { hex: '#D0E3CC', name: 'Tea Green' },
      { hex: '#7CA982', name: 'Russian Green' },
      { hex: '#5D5E60', name: 'Davys Grey' },
      { hex: '#324851', name: 'Charcoal' },
    ],
    likes: 142,
    tags: ['green', 'nature', 'calm'],
    createdAt: '2023-07-24',
    author: 'EcoArtist',
  },
  {
    id: '4',
    title: 'Sweet Pastels',
    colors: [
      { hex: '#F8C0C8', name: 'Pink' },
      { hex: '#E3F8FA', name: 'Light Cyan' },
      { hex: '#C4F4C7', name: 'Tea Green' },
      { hex: '#FFE3B0', name: 'Papaya Whip' },
    ],
    likes: 213,
    tags: ['pastel', 'light', 'sweet'],
    createdAt: '2023-08-02',
    author: 'PastelPainter',
  },
  {
    id: '5',
    title: 'Midnight City',
    colors: [
      { hex: '#1A1B41', name: 'Space Cadet' },
      { hex: '#2E2D4D', name: 'Yankees Blue' },
      { hex: '#53354A', name: 'Dark Purple' },
      { hex: '#A64942', name: 'Chestnut' },
    ],
    likes: 178,
    tags: ['dark', 'night', 'urban'],
    createdAt: '2023-09-14',
    author: 'NightOwl',
  },
  {
    id: '6',
    title: 'Spring Bloom',
    colors: [
      { hex: '#E5FBB8', name: 'Light Green' },
      { hex: '#FFC4D0', name: 'Pink' },
      { hex: '#FFE9D6', name: 'Champagne' },
      { hex: '#C7DDCC', name: 'Honeydew' },
    ],
    likes: 165,
    tags: ['pastel', 'spring', 'light'],
    createdAt: '2023-10-05',
    author: 'BloomDesigns',
  },
  {
    id: '7',
    title: 'Tech Minimalist',
    colors: [
      { hex: '#F8F8F8', name: 'White Smoke' },
      { hex: '#DDDDDD', name: 'Gainsboro' },
      { hex: '#222222', name: 'Charleston Green' },
      { hex: '#2E77CC', name: 'Denim Blue' },
    ],
    likes: 192,
    tags: ['monochrome', 'minimal', 'tech'],
    createdAt: '2023-11-17',
    author: 'TechDesigner',
  },
  {
    id: '8',
    title: 'Autumn Warmth',
    colors: [
      { hex: '#E08E45', name: 'Persian Orange' },
      { hex: '#BE6E46', name: 'Copper Red' },
      { hex: '#7D4427', name: 'Caput Mortuum' },
      { hex: '#5F3324', name: 'Dark Brown' },
    ],
    likes: 149,
    tags: ['warm', 'autumn', 'earthy'],
    createdAt: '2023-12-09',
    author: 'AutumnLeaf',
  },
  {
    id: '9',
    title: 'Neon Dreams',
    colors: [
      { hex: '#FF1493', name: 'Deep Pink' },
      { hex: '#00FFFF', name: 'Cyan' },
      { hex: '#39FF14', name: 'Neon Green' },
      { hex: '#FD01C1', name: 'Magenta' },
    ],
    likes: 223,
    tags: ['vibrant', 'neon', 'bright'],
    createdAt: '2024-01-22',
    author: 'GlowMaster',
  },
  {
    id: '10',
    title: 'Monochrome Gray',
    colors: [
      { hex: '#F8F9FA', name: 'Cultured' },
      { hex: '#E9ECEF', name: 'Anti-Flash White' },
      { hex: '#DEE2E6', name: 'Gainsboro' },
      { hex: '#CED4DA', name: 'Light Gray' },
    ],
    likes: 134,
    tags: ['monochrome', 'minimal', 'gray'],
    createdAt: '2024-02-14',
    author: 'MinimalistCreator',
  },
  {
    id: '11',
    title: 'Berry Blast',
    colors: [
      { hex: '#9D65C9', name: 'Amethyst' },
      { hex: '#5D54A4', name: 'Liberty' },
      { hex: '#2A0D3C', name: 'Russian Violet' },
      { hex: '#CE1483', name: 'Magenta Dye' },
    ],
    likes: 176,
    tags: ['vibrant', 'berry', 'purple'],
    createdAt: '2024-03-02',
    author: 'PurpleTone',
  },
  {
    id: '12',
    title: 'Summer Citrus',
    colors: [
      { hex: '#FF7B00', name: 'Heat Wave' },
      { hex: '#FF8800', name: 'Dark Orange' },
      { hex: '#FF9500', name: 'Orange Peel' },
      { hex: '#FFA200', name: 'Chrome Yellow' },
    ],
    likes: 202,
    tags: ['warm', 'vibrant', 'orange'],
    createdAt: '2024-03-18',
    author: 'CitrusLover',
  },
];

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
}
