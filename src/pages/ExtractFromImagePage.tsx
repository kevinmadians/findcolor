import React, { useState, ChangeEvent } from 'react';
import { Upload, FileImage } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ColorSwatch from '@/components/ColorSwatch';
import { Color } from '@/types/palette';

const ExtractFromImagePage = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setIsUploaded(true);
          
          // Mock extraction of colors
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Extract Colors from Image
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Upload any image and we'll extract a beautiful color palette that matches its mood and style
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {!isUploaded ? (
            <div className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors border-gray-300 hover:border-blue-400 group">
                <input 
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <FileImage className="mx-auto h-16 w-16 text-gray-400 group-hover:text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-gray-500">
                    or click to select a file
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports: JPG, PNG (max 5MB)
                  </p>
                </label>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Why extract colors from images?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">Perfect Match</h4>
                    <p className="text-gray-600 text-sm">Extract colors that perfectly match your image's mood and style</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">Instant Palette</h4>
                    <p className="text-gray-600 text-sm">Get a harmonious color palette in seconds</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">Design Inspiration</h4>
                    <p className="text-gray-600 text-sm">Find inspiration from your favorite photos and artwork</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Source Image</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={selectedImage || ''} 
                      alt="Uploaded" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Extracted Colors</h3>
                  <div className="space-y-4">
                    <div className="h-20 flex rounded-md overflow-hidden shadow-sm">
                      {colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <div 
                            className="w-8 h-8 rounded-md shadow-sm" 
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <input
                            type="text"
                            value={color.hex}
                            readOnly
                            className="bg-white border border-gray-200 rounded px-3 py-1 text-sm font-mono flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExtractFromImagePage;
