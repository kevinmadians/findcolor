
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex justify-center mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm sm:text-base text-gray-700 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors border"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Palettes
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {palette.title}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button 
                onClick={handleDownload}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all text-sm sm:text-base"
              >
                <Share size={18} />
                <span>Share</span>
              </button>
              
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
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
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>


          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaletteDetailPage;
