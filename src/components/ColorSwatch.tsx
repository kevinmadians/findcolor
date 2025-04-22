
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { Color } from '@/data/palettes/index';
import { hexToRgb } from '@/utils/colorUtils';
import { toast } from "@/components/ui/sonner";

interface ColorSwatchProps {
  color: Color;
  large?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, large = false }) => {
  const [copied, setCopied] = useState<'hex' | 'rgb' | null>(null);
  const rgbValue = hexToRgb(color.hex);

  const copyToClipboard = (value: string, type: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    toast(`${type.toUpperCase()} code copied to clipboard!`, {
      duration: 1500,
    });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-sm transition-transform hover:scale-105 ${
        large ? 'flex-1' : 'w-full'
      }`}
    >
      <div 
        className={`${large ? 'h-32 sm:h-40 md:h-48' : 'h-20 sm:h-24'} w-full cursor-pointer`}
        style={{ backgroundColor: color.hex }}
        onClick={() => copyToClipboard(color.hex, 'hex')}
      ></div>
      <div className="bg-white p-2 sm:p-3">
        {color.name && (
          <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">{color.name}</div>
        )}
        
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs sm:text-sm font-mono cursor-pointer hover:text-blue-600"
               onClick={() => copyToClipboard(color.hex, 'hex')}>
            {color.hex}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(color.hex, 'hex');
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div 
            className="text-[10px] sm:text-xs font-mono text-gray-600 cursor-pointer hover:text-blue-600"
            onClick={() => copyToClipboard(rgbValue, 'rgb')}
          >
            {rgbValue}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(rgbValue, 'rgb');
            }}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
