
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PaletteGrid from '@/components/PaletteGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { palettes, Palette } from '@/data/palettes';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>(palettes);

  useEffect(() => {
    let filtered = [...palettes];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(palette => 
        palette.tags.includes(selectedCategory)
      );
    }
    
    // Filter by search term
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
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Color Palettes</h1>
          <p className="text-gray-600">
            Explore beautiful color combinations for your next project
          </p>
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
