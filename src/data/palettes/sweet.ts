import { Palette } from './types';

export const sweetPalettes: Palette[] = [
  {
    id: 'candy-shop',
    title: 'Candy Shop',
    colors: [
      { hex: '#FF85B3', name: 'Cotton Candy' },
      { hex: '#FFA9A9', name: 'Bubblegum' },
      { hex: '#FFD6A5', name: 'Caramel' },
      { hex: '#FFFEC4', name: 'Lemon Drop' },
      { hex: '#CBFFA9', name: 'Apple Candy' }
    ],
    likes: 167,
    tags: ['sweet', 'pastel', 'playful', 'cute'],
    createdAt: '2025-04-22',
    author: 'Candy Wilson'
  },
  {
    id: 'berry-smoothie',
    title: 'Berry Smoothie',
    colors: [
      { hex: '#FF0075', name: 'Raspberry' },
      { hex: '#172774', name: 'Blueberry' },
      { hex: '#FF7B54', name: 'Peach' },
      { hex: '#FFB26B', name: 'Mango' },
      { hex: '#939B62', name: 'Kiwi' }
    ],
    likes: 189,
    tags: ['fruity', 'fresh', 'vibrant', 'summer'],
    createdAt: '2025-04-22',
    author: 'Lisa Berry'
  },
  {
    id: 'mint-chocolate',
    title: 'Mint Chocolate',
    colors: [
      { hex: '#98FF98', name: 'Fresh Mint' },
      { hex: '#45474B', name: 'Dark Chocolate' },
      { hex: '#D4F1F4', name: 'Cool Mint' },
      { hex: '#2D2424', name: 'Cocoa' },
      { hex: '#E7F6F2', name: 'Mint Cream' }
    ],
    likes: 167,
    tags: ['mint', 'chocolate', 'cool', 'sweet'],
    createdAt: '2025-04-22',
    author: 'Minty Fresh'
  },
  {
    id: 'coffee-house',
    title: 'Coffee House',
    colors: [
      { hex: '#65451F', name: 'Coffee Bean' },
      { hex: '#C38154', name: 'Caramel Latte' },
      { hex: '#F1DEC9', name: 'Cream Top' },
      { hex: '#A4907C', name: 'Mocha' },
      { hex: '#8B7355', name: 'Roasted' }
    ],
    likes: 198,
    tags: ['coffee', 'warm', 'cozy', 'brown'],
    createdAt: '2025-04-22',
    author: 'Joe Barista'
  }
];
