
import React from 'react';
import ColorCard from './ColorCard';
import { Palette } from '@/data/palettes';

interface PaletteGridProps {
  palettes: Palette[];
}

const PaletteGrid: React.FC<PaletteGridProps> = ({ palettes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {palettes.map((palette) => (
        <ColorCard key={palette.id} palette={palette} />
      ))}
    </div>
  );
};

export default PaletteGrid;
