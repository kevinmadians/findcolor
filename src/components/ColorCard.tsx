
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Heart } from 'lucide-react';
import { usePaletteLike } from '@/hooks/usePaletteLike';
import { Palette } from '@/data/palettes';

interface ColorCardProps {
  palette: Palette;
}

const ColorCard: React.FC<ColorCardProps> = ({ palette }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const { mutate: toggleLike } = usePaletteLike();

  const copyToClipboard = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike({ paletteId: palette.id });
  };

  return (
    <Link to={`/palette/${palette.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="h-32 flex">
          {palette.colors.map((color) => (
            <div
              key={color.hex}
              className="flex-1 relative group/color"
              style={{ backgroundColor: color.hex }}
            >
              <button 
                onClick={(e) => copyToClipboard(color.hex, e)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity duration-200 bg-black bg-opacity-20"
              >
                <Copy className="text-white h-5 w-5" />
              </button>
              {copied === color.hex && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs font-medium">
                  Copied!
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2 flex-wrap">
              {palette.tags.map((tag) => (
                <Link 
                  key={tag}
                  to={`/tags/${tag}`}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {tag}
                </Link>
              ))}
            </div>
            <button 
              onClick={handleLike}
              className="group/like"
            >
              <Heart 
                className={`h-5 w-5 ${palette.likes > 0 ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/like:text-red-500'}`}
              />
              <span className="ml-1 text-sm text-gray-500">{palette.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ColorCard;
