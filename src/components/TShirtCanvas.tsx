
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import TShirt3DModel from "./TShirt3DModel";

interface TShirtCanvasProps {
  color: string;
  view: "front" | "back" | "left" | "right";
  designs: Array<{
    id: string;
    type: "text" | "image";
    content: string;
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
  }>;
}

const TShirtCanvas = ({ color, view, designs }: TShirtCanvasProps) => {
  const [show3D, setShow3D] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Use this to store the T-shirt image paths based on view and color
  const getTshirtImage = () => {
    // In a real app, you would have different images for different views and colors
    // For now, we'll use placeholders with different background colors
    return `/t-shirt-${view}.png`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Preview</h3>
        <button 
          onClick={() => setShow3D(!show3D)}
          className={cn(
            "px-3 py-1 rounded-md text-sm font-medium transition-colors",
            show3D 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          )}
        >
          {show3D ? "2D View" : "3D View"}
        </button>
      </div>

      <div className="relative w-full h-full aspect-[3/4] bg-white rounded-md shadow-sm overflow-hidden">
        {show3D ? (
          <>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <TShirt3DModel color={color} />
            )}
          </>
        ) : (
          <>
            {/* Base T-shirt with selected color */}
            <div 
              className={cn(
                "absolute inset-0 w-full h-full flex items-center justify-center",
                `bg-tshirt-${color.toLowerCase()}`
              )}
            >
              <img 
                src={getTshirtImage()} 
                alt={`T-shirt ${view} view`} 
                className="w-full h-full object-contain"
                style={{ opacity: 0.3 }} // This makes the color show through
              />
            </div>

            {/* Render designs (text and images) on top of the T-shirt */}
            {designs.map((design) => (
              <div
                key={design.id}
                className={design.type === "text" ? "tshirt-text" : "tshirt-design"}
                style={{
                  left: `${design.x}%`,
                  top: `${design.y}%`,
                  color: design.color,
                  fontSize: design.fontSize ? `${design.fontSize}px` : undefined,
                  fontFamily: design.fontFamily,
                }}
              >
                {design.type === "text" ? (
                  <p>{design.content}</p>
                ) : (
                  <img src={design.content} alt="Design" className="w-full h-full object-contain" />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TShirtCanvas;
