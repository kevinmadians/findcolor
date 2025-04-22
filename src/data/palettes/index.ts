import { Palette } from './types';
import { naturePalettes } from './nature';
import { modernPalettes } from './modern';
import { culturalPalettes } from './cultural';
import { sweetPalettes } from './sweet';
import { cosmicPalettes } from './cosmic';
import { minimalPalettes } from './minimal';
import { coolPalettes } from './cool';
import { pastelPalettes } from './pastel';
import { warmPalettes } from './warm';

export * from './types';

export const palettes: Palette[] = [
  ...naturePalettes,
  ...modernPalettes,
  ...culturalPalettes,
  ...sweetPalettes,
  ...cosmicPalettes,
  ...minimalPalettes,
  ...coolPalettes,
  ...pastelPalettes,
  ...warmPalettes
];
