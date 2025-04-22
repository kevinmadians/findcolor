
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PaletteGrid from '@/components/PaletteGrid';
import { usePalettes } from '@/hooks/usePalettes';

const HomePage: React.FC = () => {
  const { tag } = useParams<{ tag?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: palettes, isLoading } = usePalettes(tag);

  const filteredPalettes = palettes?.filter(palette => 
    searchTerm ? (
      palette.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      palette.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : true
  ) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchTerm} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {tag ? `${tag} Palettes` : 'Discover Color Palettes'}
          </h1>
          <p className="text-gray-600">
            {tag 
              ? `Explore beautiful ${tag} color combinations`
              : 'Explore beautiful color combinations for your next project'
            }
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading palettes...</p>
          </div>
        ) : filteredPalettes.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 mb-2">No palettes found</h2>
            <p className="text-gray-500">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <PaletteGrid palettes={filteredPalettes} />
        )}
      </main>
    </div>
  );
};

export default HomePage;
