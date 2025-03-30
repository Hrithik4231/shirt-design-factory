
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TShirtCanvas from "@/components/TShirtCanvas";
import TShirtViewSelector from "@/components/TShirtViewSelector";
import CustomizationPanel from "@/components/CustomizationPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Design {
  id: string;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
}

const Index = () => {
  const [tshirtColor, setTshirtColor] = useState("aqua");
  const [currentView, setCurrentView] = useState<"front" | "back" | "left" | "right">("front");
  const [designs, setDesigns] = useState<Design[]>([]);
  
  const handleColorChange = (color: string) => {
    setTshirtColor(color);
  };
  
  const handleAddText = (text: string, fontSize: number, color: string) => {
    const newText: Design = {
      id: `text-${Date.now()}`,
      type: "text",
      content: text,
      x: 50, // Center of the T-shirt
      y: 50, // Center of the T-shirt
      fontSize,
      color,
      fontFamily: "Arial, sans-serif",
    };
    
    setDesigns([...designs, newText]);
  };
  
  const handleAddDesign = (imageUrl: string) => {
    const newDesign: Design = {
      id: `design-${Date.now()}`,
      type: "image",
      content: imageUrl,
      x: 50, // Center of the T-shirt
      y: 50, // Center of the T-shirt
    };
    
    setDesigns([...designs, newDesign]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="bg-white shadow-sm py-3 px-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-500">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Design Your Custom T-Shirt</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left sidebar - View selector */}
          <div className="hidden md:block">
            <TShirtViewSelector 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
          </div>
          
          {/* Center - T-shirt Canvas */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex md:hidden">
              <TShirtViewSelector 
                currentView={currentView}
                onViewChange={setCurrentView}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <TShirtCanvas 
                color={tshirtColor}
                view={currentView}
                designs={designs}
              />
            </div>
          </div>
          
          {/* Right sidebar - Customization Panel */}
          <div className="md:col-span-1">
            <CustomizationPanel 
              onColorChange={handleColorChange}
              onAddText={handleAddText}
              onAddDesign={handleAddDesign}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 TeeDesigner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
