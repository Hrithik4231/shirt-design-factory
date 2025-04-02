
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import TShirt3DModel from "./TShirt3DModel";
import { Design } from "@/pages/Index";
import DesignContextMenu from "./DesignContextMenu";

interface TShirtCanvasProps {
  color: string;
  view: "front" | "back" | "left" | "right";
  designs: Design[];
  onSelectDesign: (id: string) => void;
  onDesignMove: (id: string, x: number, y: number) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
}

const TShirtCanvas = ({ 
  color, 
  view, 
  designs, 
  onSelectDesign, 
  onDesignMove, 
  onCanvasClick 
}: TShirtCanvasProps) => {
  const [show3D, setShow3D] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    designId: string | null;
    initialX: number;
    initialY: number;
    offsetX: number;
    offsetY: number;
  }>({
    isDragging: false,
    designId: null,
    initialX: 0,
    initialY: 0,
    offsetX: 0,
    offsetY: 0
  });
  
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    designId: string | null;
    initialWidth: number;
    initialHeight: number;
    corner: string | null;
  }>({
    isResizing: false,
    designId: null,
    initialWidth: 0,
    initialHeight: 0,
    corner: null
  });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (resizeState.isResizing) {
      const handleMouseMove = (e: MouseEvent) => {
        if (resizeState.isResizing && resizeState.designId && canvasRef.current) {
          const design = designs.find(d => d.id === resizeState.designId);
          if (!design) return;
          
          const rect = canvasRef.current.getBoundingClientRect();
          const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
          const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
          
          // Calculate distance from center as a scaling factor
          const designX = design.x;
          const designY = design.y;
          
          // Determine the distance which will be used as a scale factor
          const dx = Math.abs(mouseX - designX) / 25; // Adjust divisor to control sensitivity
          const dy = Math.abs(mouseY - designY) / 25;
          
          // Use the larger of the two dimensions to determine scale
          const newScale = Math.max(0.5, Math.min(2, Math.max(dx, dy)));
          
          const updatedDesigns = designs.map(d => 
            d.id === resizeState.designId ? { ...d, scale: newScale } : d
          );
        }
        
        e.preventDefault();
      };
      
      const handleMouseUp = () => {
        setResizeState({
          isResizing: false,
          designId: null,
          initialWidth: 0,
          initialHeight: 0,
          corner: null
        });
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizeState, designs]);

  const getTshirtImage = () => {
    const viewMap = {
      front: "/lovable-uploads/cbba3879-73cb-44b6-95e5-0ae6fdfc3cb6.png",
      back: "/lovable-uploads/84f13507-a711-4b89-92e1-7207b8e01500.png",
      left: "/lovable-uploads/573932bb-65fa-4af0-953a-bdb373a1e8f5.png",
      right: "/lovable-uploads/8c1c7476-cbae-4954-8551-7297522c3d35.png"
    };
    
    return viewMap[view] || viewMap.front;
  };

  const getColorStyle = () => {
    if (color.toLowerCase() === "white") {
      return { backgroundColor: "transparent" };
    }

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
  
  const handleMouseDown = (e: React.MouseEvent, design: Design) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      
      setDragState({
        isDragging: true,
        designId: design.id,
        initialX: e.clientX,
        initialY: e.clientY,
        offsetX: ((e.clientX - rect.left) / rect.width) * 100 - design.x,
        offsetY: ((e.clientY - rect.top) / rect.height) * 100 - design.y
      });
      
      onSelectDesign(design.id);
      e.stopPropagation();
    }
  };
  
  const handleResizeMouseDown = (e: React.MouseEvent, design: Design, corner: string) => {
    if (canvasRef.current) {
      e.stopPropagation();
      
      setResizeState({
        isResizing: true,
        designId: design.id,
        initialWidth: 0,
        initialHeight: 0,
        corner: corner
      });
      
      onSelectDesign(design.id);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState.isDragging && dragState.designId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      
      let newX = ((e.clientX - rect.left) / rect.width) * 100 - dragState.offsetX;
      let newY = ((e.clientY - rect.top) / rect.height) * 100 - dragState.offsetY;
      
      newX = Math.max(10, Math.min(90, newX));
      newY = Math.max(10, Math.min(90, newY));
      
      onDesignMove(dragState.designId, newX, newY);
      e.stopPropagation();
    }
  };
  
  const handleMouseUp = () => {
    setDragState({
      ...dragState,
      isDragging: false
    });
  };
  
  const renderTextDesign = (design: Design) => {
    const textStyle: React.CSSProperties = {
      fontFamily: design.fontFamily,
      fontSize: design.fontSize ? `${design.fontSize}px` : undefined,
      color: design.color,
      fontWeight: design.isBold ? 'bold' : 'normal',
      fontStyle: design.isItalic ? 'italic' : 'normal',
      textDecoration: design.isUnderline ? 'underline' : 'none',
      textAlign: design.textAlign || 'center',
      cursor: 'move',
      transform: `scale(${design.scale || 1})`,
      transformOrigin: 'center center',
      maxWidth: '200px',
      position: 'relative'
    };
    
    return (
      <DesignContextMenu 
        design={design} 
        onUpdate={(updates) => {
          const designId = design.id;
          const updatedDesigns = designs.map(d => 
            d.id === designId ? { ...d, ...updates } : d
          );
          const updatedDesign = updatedDesigns.find(d => d.id === designId);
          if (updatedDesign) {
            onSelectDesign(designId);
          }
        }}
        onDelete={() => {
          const designId = design.id;
          const updatedDesigns = designs.filter(d => d.id !== designId);
        }}
      >
        <div className="relative group">
          <div 
            style={textStyle}
            onMouseDown={(e) => handleMouseDown(e, design)}
            className={cn(
              "select-none", 
              design.isSelected && "outline outline-2 outline-blue-500"
            )}
          >
            {design.content}
          </div>
          
          {design.isSelected && (
            <>
              {/* Resize handles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-nw-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'top-left')} />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-ne-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'top-right')} />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-sw-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'bottom-left')} />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-se-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'bottom-right')} />
            </>
          )}
        </div>
      </DesignContextMenu>
    );
  };
  
  const renderImageDesign = (design: Design) => {
    const imageStyle: React.CSSProperties = {
      transform: `scale(${design.scale || 1})`,
      transformOrigin: 'center center',
    };
    
    return (
      <DesignContextMenu 
        design={design} 
        onUpdate={(updates) => {
          const designId = design.id;
          const updatedDesigns = designs.map(d => 
            d.id === designId ? { ...d, ...updates } : d
          );
          const updatedDesign = updatedDesigns.find(d => d.id === designId);
          if (updatedDesign) {
            onSelectDesign(designId);
          }
        }}
        onDelete={() => {
          const designId = design.id;
          const updatedDesigns = designs.filter(d => d.id !== designId);
        }}
      >
        <div className="relative group">
          <img 
            src={design.content} 
            alt="Design" 
            style={imageStyle}
            className={cn(
              "w-full h-full object-contain select-none cursor-move",
              design.isSelected && "outline outline-2 outline-blue-500"
            )}
            onMouseDown={(e) => handleMouseDown(e, design)}
          />
          
          {design.isSelected && (
            <>
              {/* Resize handles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-nw-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'top-left')} />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-ne-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'top-right')} />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-sw-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'bottom-left')} />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border border-blue-500 rounded-full cursor-se-resize z-20"
                   onMouseDown={(e) => handleResizeMouseDown(e, design, 'bottom-right')} />
            </>
          )}
        </div>
      </DesignContextMenu>
    );
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

      <div 
        ref={canvasRef}
        className="relative w-full h-full aspect-[3/4] bg-white rounded-md shadow-sm overflow-hidden t-shirt-canvas-area"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={onCanvasClick}
      >
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

            {designs.map((design) => (
              <div
                key={design.id}
                className={design.type === "text" ? "tshirt-text absolute" : "tshirt-design absolute"}
                style={{
                  left: `${design.x}%`,
                  top: `${design.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: design.isSelected ? 20 : 10,
                  maxWidth: "80%"
                }}
              >
                {design.type === "text" ? renderTextDesign(design) : renderImageDesign(design)}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TShirtCanvas;
