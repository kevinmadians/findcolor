
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PaletteGrid from '@/components/PaletteGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { palettes, Palette } from '@/data/palettes';
import { Album, Heart, Paintbrush } from 'lucide-react';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>(palettes);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = [...palettes];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(palette => 
        palette.tags.includes(selectedCategory)
      );
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(palette => 
        palette.title.toLowerCase().includes(term) || 
        palette.tags.some(tag => tag.toLowerCase().includes(term)) ||
        palette.colors.some(color => 
          color.name?.toLowerCase().includes(term) || 
          color.hex.toLowerCase().includes(term)
        )
      );
    }
    
    setFilteredPalettes(filtered);
  }, [selectedCategory, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar onSearch={handleSearch} />
      
      <main className={`max-w-7xl mx-auto px-4 py-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Find Your Perfect Colors
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Explore curated color combinations to inspire your next creative project
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Album className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Curated Palettes</h3>
              <p className="text-gray-600 text-sm">Hand-picked color combinations for your designs</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Heart className="w-8 h-8 text-rose-500 mb-3 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600 text-sm">Keep track of the palettes you love</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Paintbrush className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Create Custom</h3>
              <p className="text-gray-600 text-sm">Design your own unique color schemes</p>
            </div>
          </div>
        </div>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        {filteredPalettes.length === 0 ? (
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
