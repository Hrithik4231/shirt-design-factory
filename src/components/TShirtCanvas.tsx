
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  // Use this to store the T-shirt image paths based on view and color
  const getTshirtImage = () => {
    // In a real app, you would have different images for different views and colors
    // For now, we'll use placeholders with different background colors
    return `/t-shirt-${view}.png`;
  };

  return (
    <div className="relative w-full h-full aspect-[3/4] bg-white rounded-md shadow-sm overflow-hidden">
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
    </div>
  );
};

export default TShirtCanvas;
