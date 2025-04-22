
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaletteGrid from '@/components/PaletteGrid';
import { Badge } from "@/components/ui/badge";
import { palettes, categories } from '@/data/palettes';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

const ExplorePage = () => {
  const { tag } = useParams();
  const allTags = [...new Set(palettes.flatMap(palette => palette.tags))];
  
  const filteredPalettes = tag
    ? palettes.filter(palette => palette.tags.includes(tag))
    : palettes;

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

        {!tag && (
          <div className="mb-12">
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

        <PaletteGrid palettes={filteredPalettes} />

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
