
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ColorSwatch from '@/components/ColorSwatch';
import { palettes, Palette } from '@/data/palettes';
import { Download, Share, Heart } from 'lucide-react';

const PaletteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [liked, setLiked] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

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
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShareLink(url);
    setTimeout(() => setShareLink(null), 3000);
  };

  const handleDownload = () => {
    if (!palette) return;
    
    // Create CSS content
    const cssContent = palette.colors.map(color => 
      `--color-${palette.colors.indexOf(color) + 1}: ${color.hex};`
    ).join('\n');

    // Create file and download
    const element = document.createElement('a');
    const file = new Blob([`:root {\n${cssContent}\n}`], {type: 'text/css'});
    element.href = URL.createObjectURL(file);
    element.download = `${palette.title.toLowerCase().replace(/\s+/g, '-')}.css`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            &larr; Back to palettes
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{palette.title}</h1>
              <p className="text-gray-600">
                Created by {palette.author} on {new Date(palette.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
              >
                <Share size={18} />
                <span>Share</span>
              </button>
              
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  liked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-red-500' : ''} />
                <span>{palette.likes + (liked ? 1 : 0)}</span>
              </button>
            </div>
          </div>
          
          {shareLink && (
            <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md flex justify-between items-center">
              <span>Link copied to clipboard!</span>
              <button className="text-sm underline" onClick={() => setShareLink(null)}>
                Dismiss
              </button>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {palette.colors.map(color => (
              <ColorSwatch key={color.hex} color={color} large />
            ))}
          </div>
          
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {palette.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4">How to Use</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">CSS Variables</h3>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              <pre className="text-sm font-mono">
                {`:root {
${palette.colors.map((color, index) => `  --color-${index + 1}: ${color.hex};`).join('\n')}
}`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Tailwind Config</h3>
            <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
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
      </main>
    </div>
  );
};

export default PaletteDetailPage;
