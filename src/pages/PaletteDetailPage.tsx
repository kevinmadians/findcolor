
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ColorSwatch from '@/components/ColorSwatch';
import { palettes, Palette } from '@/data/palettes';
import { Download, Share, Heart } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

const PaletteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id) {
      const found = palettes.find(p => p.id === id);
      if (found) {
        setPalette(found);
      }
    }
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    toast(liked ? 'Removed from favorites' : 'Added to favorites', {
      duration: 1500,
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast('Link copied to clipboard!', {
      duration: 1500,
    });
  };

  const handleDownload = () => {
    if (!palette) return;
    
    const cssContent = palette.colors.map(color => 
      `--color-${palette.colors.indexOf(color) + 1}: ${color.hex};`
    ).join('\n');

    const element = document.createElement('a');
    const file = new Blob([`:root {\n${cssContent}\n}`], {type: 'text/css'});
    element.href = URL.createObjectURL(file);
    element.download = `${palette.title.toLowerCase().replace(/\s+/g, '-')}.css`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast('CSS file downloaded!', {
      duration: 1500,
    });
  };

  if (!palette) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">Palette not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            &larr; Back to palettes
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {palette.title}
            </h1>
            
            <div className="flex gap-3">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
              >
                <Share size={18} />
                <span>Share</span>
              </button>
              
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  liked 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-red-500' : ''} />
                <span>{palette.likes + (liked ? 1 : 0)}</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {palette.colors.map(color => (
              <ColorSwatch key={color.hex} color={color} large />
            ))}
          </div>
          
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-800 mb-3">Tags</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {palette.tags.map(tag => (
                  <Link
                    to={`/tags/${tag}`}
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">How to Use</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">CSS Variables</h3>
                <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono">
                    {`:root {
${palette.colors.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}
}`}
                  </pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Tailwind Config</h3>
                <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
                  <pre className="text-sm font-mono">
                    {`module.exports = {
  theme: {
    extend: {
      colors: {
${palette.colors.map((color, index) => `        color${index + 1}: '${color.hex}',`).join('\n')}
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaletteDetailPage;
