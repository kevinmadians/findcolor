
import React, { useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Upload, Plus, Trash } from 'lucide-react';
import ColorSwatch from '@/components/ColorSwatch';
import { Color } from '@/data/palettes';

const MAX_COLORS = 5;

interface FormData {
  title: string;
  tags: string;
}

const CreatePalettePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual');
  const [colors, setColors] = useState<Color[]>([
    { hex: '#5D8CAE' },
    { hex: '#FF9B71' },
  ]);
  const [currentColor, setCurrentColor] = useState('#5D8CAE');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    tags: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add current color to the palette
  const addColor = () => {
    if (colors.length < MAX_COLORS) {
      setColors(prev => [...prev, { hex: currentColor }]);
      setCurrentColor('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    }
  };

  // Remove a color from the palette
  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  // Update a color in the palette
  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index] = { hex };
    setColors(newColors);
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          
          // Mock extraction of colors
          // In a real app, we would use color-thief or another library here
          // For this demo, we'll use placeholder colors
          setTimeout(() => {
            setColors([
              { hex: '#4A6D7C' },
              { hex: '#CDA34F' },
              { hex: '#E7E6F7' },
              { hex: '#3D3B30' },
            ]);
          }, 500);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save the palette to a database
    // For this demo, we'll just redirect to the home page
    alert(`Palette "${formData.title}" created successfully!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a Palette</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'manual'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('manual')}
            >
              Manual Creation
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              Extract from Image
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {activeTab === 'manual' ? (
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4">
                      <h2 className="text-lg font-medium text-gray-800 mb-2">Pick Colors</h2>
                      <p className="text-gray-600 mb-4">
                        Choose up to {MAX_COLORS} colors for your palette
                      </p>
                      
                      <div className="mb-4">
                        {/* Simple color picker input instead of react-colorful */}
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
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Your Palette</h2>
                    
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
                    
                    <div className="h-16 flex rounded-md overflow-hidden shadow-sm mb-4">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-800 mb-2">Upload an Image</h2>
                <p className="text-gray-600 mb-4">
                  Upload an image to extract colors (JPG, PNG, max 5MB)
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-gray-300 hover:border-gray-400">
                      <input 
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-gray-500">
                          Click to select an image
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          JPG, PNG (max 5MB)
                        </p>
                      </label>
                    </div>
                    
                    {selectedImage && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
                        <img 
                          src={selectedImage} 
                          alt="Preview" 
                          className="max-h-48 rounded-md object-contain" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                      {selectedImage ? 'Extracted Colors' : 'Your Palette'}
                    </h2>
                    
                    {colors.length === 0 ? (
                      <div className="text-center p-8 bg-gray-50 rounded-lg text-gray-500">
                        Upload an image to extract colors
                      </div>
                    ) : (
                      <div>
                        <div className="h-16 flex rounded-md overflow-hidden shadow-sm mb-4">
                          {colors.map((color, index) => (
                            <div
                              key={index}
                              className="flex-1"
                              style={{ backgroundColor: color.hex }}
                            ></div>
                          ))}
                        </div>
                        
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t pt-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Palette Details</h2>
              
              <div className="space-y-4 max-w-lg">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a title for your palette"
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
                    className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Create Palette
                  </button>
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
