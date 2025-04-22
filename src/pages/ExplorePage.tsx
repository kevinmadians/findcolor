
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaletteGrid from '@/components/PaletteGrid';
import { Badge } from "@/components/ui/badge";
import { palettes } from '@/data/palettes/index';
import { categories } from '@/data/categories';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

const ExplorePage = () => {
  const { tag } = useParams();
  const [visiblePalettes, setVisiblePalettes] = useState<typeof palettes>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const allTags = [...new Set(palettes.flatMap(palette => palette.tags))];
  
  const filteredPalettes = tag
    ? palettes.filter(palette => palette.tags.includes(tag))
    : palettes;

  const loadMore = React.useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newPalettes = filteredPalettes.slice(startIndex, endIndex);
    
    // Simulate network delay for smooth loading effect
    setTimeout(() => {
      setVisiblePalettes(prev => [...prev, ...newPalettes]);
      setHasMore(endIndex < filteredPalettes.length);
      setLoading(false);
      setPage(prev => prev + 1);
    }, 800);
  }, [page, filteredPalettes, loading]);

  // Reset when tag changes
  useEffect(() => {
    setVisiblePalettes([]);
    setPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [tag]);

  // Initial load
  useEffect(() => {
    if (isInitialLoad) {
      loadMore();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, loadMore]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {tag ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} Palettes` : 'Explore Color Palettes'}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {tag 
              ? `Discover beautiful color combinations tagged with "${tag}"`
              : 'Browse through our curated collection of color palettes'
            }
          </p>
        </div>

        <div className="space-y-8">
          <PaletteGrid palettes={visiblePalettes} />
          
          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className={`
                  inline-flex items-center gap-2 px-6 py-3 
                  ${loading ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'}
                  text-gray-700 rounded-lg shadow-sm transition-all
                  border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Feather effect when loading */}
          {loading && (
            <div className="relative h-32 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>
          )}
        </div>

        {!tag && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-3">
              {allTags.map((tagName) => (
                <Link to={`/tags/${tagName}`} key={tagName}>
                  <Badge 
                    variant="secondary"
                    className="px-3 py-1 hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    {tagName}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {tag && filteredPalettes.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600 mb-2">No palettes found</h2>
            <p className="text-gray-500">
              We couldn't find any palettes tagged with "{tag}"
            </p>
            <Link to="/explore" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
              View all palettes
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ExplorePage;
