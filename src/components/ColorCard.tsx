
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette } from '@/data/palettes/index';
import { Copy, Heart } from 'lucide-react';
import { getLikesCount, incrementLikes, onLikesUpdate, hasUserLikedPalette } from '@/lib/supabase';

interface ColorCardProps {
  palette: Palette;
}

const ColorCard: React.FC<ColorCardProps> = ({ palette }) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Initial likes count and check if user has liked
    Promise.all([
      getLikesCount(palette.id),
      hasUserLikedPalette(palette.id)
    ]).then(([count, liked]) => {
      setLikesCount(count);
      setHasLiked(liked);
    });

    // Subscribe to real-time updates
    const cleanup = onLikesUpdate((updatedPaletteId, newCount) => {
      if (updatedPaletteId === palette.id) {
        setLikesCount(newCount);
      }
    });

    // Cleanup subscription
    return () => {
      cleanup();
    };
  }, [palette.id]);

  const copyToClipboard = (color: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasLiked) return; // Prevent liking if already liked
    
    try {
      const newCount = await incrementLikes(palette.id);
      setLikesCount(newCount);
      setHasLiked(true); // Update local state immediately
    } catch (error) {
      if (error instanceof Error && error.message === 'User has already liked this palette') {
        setHasLiked(true); // Update state if we found out it was already liked
      } else {
        console.error('Error incrementing likes:', error);
      }
    }
  };

  return (
    <Link to={`/palette/${palette.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
        <div className="h-24 md:h-32 flex">
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
        <div className="p-3 md:p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800 text-sm md:text-base">{palette.title}</h3>
            <Heart
              className={`w-4 h-4 cursor-pointer ${hasLiked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500 hover:text-red-500'}`}
              onClick={handleLikeClick}
            />
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {palette.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            {likesCount} likes
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ColorCard;
