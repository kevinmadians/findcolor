
// Re-export the palettes data and types to maintain compatibility
import { palettes } from './palettesData';
import { categories } from './categories';
import type { Palette, Color, Category } from '@/types/palette';

export { palettes, categories };
export type { Palette, Color, Category };
