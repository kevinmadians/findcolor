
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="flex space-x-1">
            <span className="h-6 w-6 rounded-full bg-blue-500"></span>
            <span className="h-6 w-6 rounded-full bg-green-500"></span>
            <span className="h-6 w-6 rounded-full bg-purple-500"></span>
            <span className="h-6 w-6 rounded-full bg-yellow-500"></span>
          </div>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Find<span className="text-blue-500">Color</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search palettes..."
              className="py-2 px-4 pr-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search size={18} />
            </button>
          </form>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Explore
            </Link>
            <Link to="/create" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition duration-200">
              Create
            </Link>
          </div>
        </div>
      </div>
      
      <div className="md:hidden mt-4 flex justify-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Explore
        </Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium">
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
