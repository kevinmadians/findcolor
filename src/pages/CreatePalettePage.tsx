import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Plus, Trash, Upload } from 'lucide-react';
import { Color } from '@/types/palette';

const MAX_COLORS = 5;

interface FormData {
  title: string;
  tags: string;
}

const CreatePalettePage: React.FC = () => {
  const navigate = useNavigate();
  const [colors, setColors] = useState<Color[]>([
    { hex: '#5D8CAE' },
    { hex: '#FF9B71' },
  ]);
  const [currentColor, setCurrentColor] = useState('#5D8CAE');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    tags: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addColor = () => {
    if (colors.length < MAX_COLORS) {
      setColors(prev => [...prev, { hex: currentColor }]);
      setCurrentColor('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index] = { hex };
    setColors(newColors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Palette "${formData.title}" created successfully!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Create Your Perfect Palette
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Mix and match colors to create your unique color combination
          </p>
          
          <Link 
            to="/extract-from-image" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
          >
            <Upload size={20} />
            Extract colors from image instead
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Pick Colors</h2>
                  <p className="text-gray-600 mb-4">
                    Choose up to {MAX_COLORS} colors for your palette. Mix and match to create the perfect combination.
                  </p>
                  
                  <div className="mb-4">
                    <div className="mb-3">
                      <input 
                        type="color" 
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                        className="w-full h-[200px] cursor-pointer rounded border border-gray-300"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-md shadow-sm" 
                        style={{ backgroundColor: currentColor }}
                      ></div>
                      <input
                        type="text"
                        value={currentColor}
                        onChange={(e) => setCurrentColor(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm font-mono"
                      />
                      <button
                        type="button"
                        onClick={addColor}
                        disabled={colors.length >= MAX_COLORS}
                        className="ml-auto p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Tips for Creating Great Palettes</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Start with a base color that represents your main theme</li>
                    <li>• Add complementary colors for contrast and harmony</li>
                    <li>• Include both light and dark shades for balance</li>
                    <li>• Consider using analogous colors for a cohesive look</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Palette</h2>
                
                <div className="mb-4 p-4 bg-gray-50 rounded-lg min-h-[100px]">
                  {colors.length === 0 ? (
                    <div className="text-center text-gray-500">
                      Add colors to see your palette
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-md shadow-sm" 
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <input
                            type="text"
                            value={color.hex}
                            onChange={(e) => updateColor(index, e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm font-mono flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeColor(index)}
                            className="p-2 text-red-500 rounded-full hover:bg-red-50"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="h-32 flex rounded-md overflow-hidden shadow-lg mb-6">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Palette Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Give your palette a memorable name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="E.g., warm, nature, vintage (comma separated)"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={colors.length === 0 || !formData.title}
                      className="w-full px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Create Palette
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePalettePage;
