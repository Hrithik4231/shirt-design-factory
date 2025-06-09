import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TShirtCanvas from "@/components/TShirtCanvas";
import TShirtViewSelector from "@/components/TShirtViewSelector";
import CustomizationPanel from "@/components/CustomizationPanel";
import TextEditToolbar from "@/components/TextEditToolbar";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale3d } from "lucide-react";
import TShirt3DPreviewModal from "@/components/TShirt3DPreviewModal";

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
  scale?: number;
}

export interface DesignsByView {
  front: Design[];
  back: Design[];
  left: Design[];
  right: Design[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  designs: any[];
  currentView: string;
  quantity: number;
  addedAt: string;
}

const Index = () => {
  const [tshirtColor, setTshirtColor] = useState("aqua");
  const [currentView, setCurrentView] = useState<"front" | "back" | "left" | "right">("front");
  const [designsByView, setDesignsByView] = useState<DesignsByView>({
    front: [],
    back: [],
    left: [],
    right: []
  });
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [is3DPreviewOpen, setIs3DPreviewOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Get current view's designs
  const designs = designsByView[currentView];
  
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
      scale: 1,
    };
    
    // Deselect any previously selected design
    const updatedDesigns = designs.map(design => ({
      ...design,
      isSelected: false
    }));
    
    // Update designs for current view only
    setDesignsByView({
      ...designsByView,
      [currentView]: [...updatedDesigns, newText]
    });
    
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
      scale: 1,
    };
    
    // Deselect any previously selected design
    const updatedDesigns = designs.map(design => ({
      ...design,
      isSelected: false
    }));
    
    // Update designs for current view only
    setDesignsByView({
      ...designsByView,
      [currentView]: [...updatedDesigns, newDesign]
    });
    
    setSelectedDesign(newDesign.id);
  };
  
  const handleSelectDesign = (id: string) => {
    setSelectedDesign(id);
    
    // Update designs for current view only
    setDesignsByView({
      ...designsByView,
      [currentView]: designs.map(design => ({
        ...design,
        isSelected: design.id === id
      }))
    });
  };
  
  const handleDesignMove = (id: string, x: number, y: number) => {
    // Update designs for current view only
    setDesignsByView({
      ...designsByView,
      [currentView]: designs.map(design => 
        design.id === id ? { ...design, x, y } : design
      )
    });
  };
  
  const handleDesignUpdate = (id: string, updates: Partial<Design>) => {
    // Update designs for current view only
    setDesignsByView({
      ...designsByView,
      [currentView]: designs.map(design => 
        design.id === id ? { ...design, ...updates } : design
      )
    });
  };
  
  const handleDeleteDesign = (id: string) => {
    // Update designs for current view only
    setDesignsByView({
      ...designsByView,
      [currentView]: designs.filter(design => design.id !== id)
    });
    
    setSelectedDesign(null);
  };
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Improved canvas click handler to deselect all designs when clicking on empty canvas
    const target = e.target as HTMLElement;
    
    // Check if the click is directly on the canvas or t-shirt background
    if (
      target.classList.contains('t-shirt-canvas-area') || 
      target.classList.contains('t-shirt-background')
    ) {
      setSelectedDesign(null);
      
      // Update designs for current view only
      setDesignsByView({
        ...designsByView,
        [currentView]: designs.map(design => ({
          ...design,
          isSelected: false
        }))
      });
    }
  };
  
  // Handler for view change
  const handleViewChange = (view: "front" | "back" | "left" | "right") => {
    // Deselect any selected design before changing view
    if (selectedDesign) {
      setDesignsByView({
        ...designsByView,
        [currentView]: designs.map(design => ({
          ...design,
          isSelected: false
        }))
      });
      setSelectedDesign(null);
    }
    
    // Change view
    setCurrentView(view);
  };

  const handleSaveToCart = (cartItem: CartItem) => {
    setCartItems(prevItems => [...prevItems, cartItem]);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleEditCartItem = (id: string) => {
    // Find the cart item and load its design back to the editor
    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
      setTshirtColor(cartItem.color);
      setCurrentView(cartItem.currentView as "front" | "back" | "left" | "right");
      setDesignsByView({
        front: cartItem.currentView === "front" ? cartItem.designs : [],
        back: cartItem.currentView === "back" ? cartItem.designs : [],
        left: cartItem.currentView === "left" ? cartItem.designs : [],
        right: cartItem.currentView === "right" ? cartItem.designs : []
      });
      // Remove the item from cart since we're editing it
      handleRemoveFromCart(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="bg-white shadow-sm py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-500">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Shop</span>
          </Link>
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onEditItem={handleEditCartItem}
          />
        </div>
      </div>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Design Your Custom T-Shirt</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left sidebar - View selector */}
          <div className="hidden md:block">
            <TShirtViewSelector 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>
          
          {/* Center - T-shirt Canvas */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex md:hidden">
              <TShirtViewSelector 
                currentView={currentView}
                onViewChange={handleViewChange}
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
            
            {/* 3D Preview Button */}
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={() => setIs3DPreviewOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                <Scale3d className="mr-2 h-5 w-5" />
                View Final Design in 3D
              </Button>
            </div>
          </div>
          
          {/* Right sidebar - Customization Panel */}
          <div className="md:col-span-1">
            <CustomizationPanel 
              onColorChange={handleColorChange}
              onAddText={handleAddText}
              onAddDesign={handleAddDesign}
              onSaveToCart={handleSaveToCart}
              tshirtColor={tshirtColor}
              designs={designs}
              currentView={currentView}
            />
          </div>
        </div>
      </main>
      
      {/* 3D Preview Modal */}
      <TShirt3DPreviewModal
        isOpen={is3DPreviewOpen}
        onClose={() => setIs3DPreviewOpen(false)}
        tshirtColor={tshirtColor}
        designsByView={designsByView}
      />
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 TeeDesigner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
