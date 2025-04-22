
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaletteGrid from '@/components/PaletteGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { palettes, Palette } from '@/data/palettes/index';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPalettes, setFilteredPalettes] = useState<Palette[]>(
    [...palettes].sort((a, b) => b.likes - a.likes).slice(0, 10)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = [...palettes].sort((a, b) => b.likes - a.likes).slice(0, 16);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Navbar />
      
      <main className={`flex-grow max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-8 sm:mb-12 text-center px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 animate-fade-in">
            Find Your Perfect Colors
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in px-2">
            Explore curated color combinations to inspire your next creative project
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
          <div className="space-y-8">
            <PaletteGrid palettes={filteredPalettes} />
            
            <div className="flex justify-center">
              <Link 
                to="/explore" 
                className="inline-flex items-center gap-2 px-6 py-3 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Explore All Color Palettes
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
