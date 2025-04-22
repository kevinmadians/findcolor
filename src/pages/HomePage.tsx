import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaletteGrid from '@/components/PaletteGrid';
import { palettes } from '@/data/palettes';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getLikesCountBatch } from '@/lib/supabase';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'name'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch initial likes counts
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likes = await getLikesCountBatch(palettes.map(p => p.id));
        setLikesMap(likes);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching likes:', error);
        setIsLoaded(true);
      }
    };
    fetchLikes();
  }, []);

  // Get all unique tags from palettes
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    palettes.forEach(palette => {
      palette.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort palettes
  const filteredPalettes = useMemo(() => {
    let filtered = [...palettes];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(palette =>
        palette.title.toLowerCase().includes(query) ||
        palette.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(palette =>
        selectedTags.every(tag => palette.tags.includes(tag))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        // You would need to integrate this with your likes system
        filtered.sort((a, b) => (likesMap[b.id] || 0) - (likesMap[a.id] || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        // Assuming newer items are at the end of the array
        // You might want to add a timestamp to your palette data
        break;
    }

    return filtered;
  }, [searchQuery, selectedTags, sortBy, likesMap]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 sm:mb-12 text-center px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 animate-fade-in">
            Find Your Perfect Colors
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in px-2">
            Explore curated color combinations to inspire your next creative project
          </p>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search palettes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filter Palettes</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTags([...selectedTags, tag]);
                            } else {
                              setSelectedTags(selectedTags.filter(t => t !== tag));
                            }
                          }}
                        />
                        <Label htmlFor={tag}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    {sortBy === 'newest' ? 'Newest' : sortBy === 'popular' ? 'Most Popular' : 'Name'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('popular')}>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>


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
