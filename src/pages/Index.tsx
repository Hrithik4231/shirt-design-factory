
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TShirtCanvas from "@/components/TShirtCanvas";
import TShirtViewSelector from "@/components/TShirtViewSelector";
import CustomizationPanel from "@/components/CustomizationPanel";
import TextEditToolbar from "@/components/TextEditToolbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export interface Design {
  id: string;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  textAlign?: "left" | "center" | "right";
  isSelected?: boolean;
}

const Index = () => {
  const [tshirtColor, setTshirtColor] = useState("aqua");
  const [currentView, setCurrentView] = useState<"front" | "back" | "left" | "right">("front");
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  
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
      isBold: false,
      isItalic: false,
      isUnderline: false,
      textAlign: "center",
      isSelected: true,
    };
    
    // Deselect any previously selected design
    const updatedDesigns = designs.map(design => ({
      ...design,
      isSelected: false
    }));
    
    setDesigns([...updatedDesigns, newText]);
    setSelectedDesign(newText.id);
  };
  
  const handleAddDesign = (imageUrl: string) => {
    const newDesign: Design = {
      id: `design-${Date.now()}`,
      type: "image",
      content: imageUrl,
      x: 50, // Center of the T-shirt
      y: 50, // Center of the T-shirt
      isSelected: true,
    };
    
    // Deselect any previously selected design
    const updatedDesigns = designs.map(design => ({
      ...design,
      isSelected: false
    }));
    
    setDesigns([...updatedDesigns, newDesign]);
    setSelectedDesign(newDesign.id);
  };
  
  const handleSelectDesign = (id: string) => {
    setSelectedDesign(id);
    
    setDesigns(designs.map(design => ({
      ...design,
      isSelected: design.id === id
    })));
  };
  
  const handleDesignMove = (id: string, x: number, y: number) => {
    setDesigns(designs.map(design => 
      design.id === id ? { ...design, x, y } : design
    ));
  };
  
  const handleDesignUpdate = (id: string, updates: Partial<Design>) => {
    setDesigns(designs.map(design => 
      design.id === id ? { ...design, ...updates } : design
    ));
  };
  
  const handleDeleteDesign = (id: string) => {
    setDesigns(designs.filter(design => design.id !== id));
    setSelectedDesign(null);
  };
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Deselect when clicking on empty canvas space
    if ((e.target as HTMLElement).classList.contains('t-shirt-canvas-area')) {
      setSelectedDesign(null);
      setDesigns(designs.map(design => ({
        ...design,
        isSelected: false
      })));
    }
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
            <div className="bg-white p-4 rounded-lg shadow-sm relative">
              <TShirtCanvas 
                color={tshirtColor}
                view={currentView}
                designs={designs}
                onSelectDesign={handleSelectDesign}
                onDesignMove={handleDesignMove}
                onCanvasClick={handleCanvasClick}
              />
              
              {selectedDesign && designs.find(d => d.id === selectedDesign)?.type === "text" && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
                  <TextEditToolbar 
                    design={designs.find(d => d.id === selectedDesign)!}
                    onUpdate={updates => handleDesignUpdate(selectedDesign, updates)}
                    onDelete={() => handleDeleteDesign(selectedDesign)}
                  />
                </div>
              )}
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
