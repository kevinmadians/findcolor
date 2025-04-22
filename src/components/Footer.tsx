
import React from 'react';
import { Palette, SwatchBook, ColorPicker } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <span className="h-4 w-4 rounded-full bg-blue-500"></span>
                <span className="h-4 w-4 rounded-full bg-green-500"></span>
                <span className="h-4 w-4 rounded-full bg-purple-500"></span>
                <span className="h-4 w-4 rounded-full bg-yellow-500"></span>
              </div>
              <span className="font-bold text-gray-800">FindColor</span>
            </div>
            <p className="text-sm text-gray-600">
              Your go-to destination for discovering beautiful color combinations
              and palettes for your creative projects.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Features</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/explore" className="hover:text-blue-500 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Explore Palettes
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-blue-500 flex items-center gap-2">
                  <ColorPicker className="w-4 h-4" />
                  Create Custom
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-blue-500 flex items-center gap-2">
                  <SwatchBook className="w-4 h-4" />
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/guides" className="hover:text-blue-500">Color Theory Guide</Link>
              </li>
              <li>
                <Link to="/trends" className="hover:text-blue-500">Color Trends</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-500">Blog</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="mailto:hello@findcolor.app" className="hover:text-blue-500">
                  hello@findcolor.app
                </a>
              </li>
              <li>
                <a href="https://twitter.com/findcolor" className="hover:text-blue-500">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com/findcolor" className="hover:text-blue-500">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} FindColor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
