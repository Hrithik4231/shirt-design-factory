
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

  // Get the appropriate t-shirt image based on the selected view
  const getTshirtImage = () => {
    // Map view to the corresponding image paths
    const viewMap = {
      front: "/lovable-uploads/22574715-9479-40a0-b2fd-ad7bf7212575.png",
      back: "/lovable-uploads/a9685395-ef50-4e65-86a0-b3cc4dd15cd8.png",
      left: "/lovable-uploads/654ff394-ccf2-4197-a335-ad0cb1efcc32.png",
      right: "/lovable-uploads/8c1c7476-cbae-4954-8551-7297522c3d35.png" // Updated right view image with new upload
    };
    
    return viewMap[view] || viewMap.front;
  };

  // Function to get appropriate color overlay based on selected color
  const getColorStyle = () => {
    // Don't apply any color overlay if color is white
    if (color.toLowerCase() === "white") {
      return { backgroundColor: "transparent" }; // Use transparent instead of a color
    }

    // Map color names to their CSS color values
    const colorMap: Record<string, string> = {
      "aqua": "#5CE1E6",
      "white": "#FFFFFF",
      "black": "#000000",
      "red": "#FF3B30",
      "blue": "#0A84FF",
      "green": "#30D158",
      "yellow": "#FFD60A",
      "purple": "#BF5AF2",
      "gray": "#8E8E93",
    };
    
    return { backgroundColor: colorMap[color.toLowerCase()] || colorMap.white };
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
            {/* Base T-shirt image with color overlay */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                {color.toLowerCase() !== "white" && (
                  <div 
                    className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply" 
                    style={getColorStyle()}
                  ></div>
                )}
                <img 
                  src={getTshirtImage()} 
                  alt={`T-shirt ${view} view`} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Render designs (text and images) on top of the T-shirt */}
            {designs.map((design) => (
              <div
                key={design.id}
                className={design.type === "text" ? "tshirt-text absolute" : "tshirt-design absolute"}
                style={{
                  left: `${design.x}%`,
                  top: `${design.y}%`,
                  color: design.color,
                  fontSize: design.fontSize ? `${design.fontSize}px` : undefined,
                  fontFamily: design.fontFamily,
                  transform: "translate(-50%, -50%)",
                  zIndex: 10
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
