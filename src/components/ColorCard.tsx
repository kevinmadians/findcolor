
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette } from '@/data/palettes';
import { Copy, Heart } from 'lucide-react';

interface ColorCardProps {
  palette: Palette;
}

const ColorCard: React.FC<ColorCardProps> = ({ palette }) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1500);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
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
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">{palette.title}</h3>
            <button 
              onClick={toggleLike}
              className="group/like"
            >
              <Heart 
                className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/like:text-red-500'}`} 
              />
            </button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {palette.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            {palette.likes} likes
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ColorCard;
