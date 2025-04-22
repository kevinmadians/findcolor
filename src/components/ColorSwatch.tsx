
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { Color, hexToRgb } from '@/data/palettes';

interface ColorSwatchProps {
  color: Color;
  large?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, large = false }) => {
  const [copied, setCopied] = useState<'hex' | 'rgb' | null>(null);
  const rgbValue = color.rgb || hexToRgb(color.hex);

  const copyToClipboard = (value: string, type: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-sm ${large ? 'flex-1' : 'w-full'}`}>
      <div 
        className={`${large ? 'h-48' : 'h-24'} w-full`}
        style={{ backgroundColor: color.hex }}
      ></div>
      <div className="bg-white p-3">
        {color.name && (
          <div className="text-sm font-medium text-gray-700 mb-1">{color.name}</div>
        )}
        
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-mono">{color.hex}</div>
          <button 
            onClick={() => copyToClipboard(color.hex, 'hex')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs font-mono text-gray-600">{rgbValue}</div>
          <button 
            onClick={() => copyToClipboard(rgbValue, 'rgb')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        {copied && (
          <div className="mt-1 text-xs text-green-600 font-medium">
            {copied === 'hex' ? 'HEX' : 'RGB'} copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorSwatch;
