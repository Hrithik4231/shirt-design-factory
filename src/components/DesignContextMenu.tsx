
import { useState } from "react";
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem
} from "@/components/ui/context-menu";
import { Design } from "@/pages/Index";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Trash2,
  Move,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface DesignContextMenuProps {
  design: Design;
  onUpdate: (updates: Partial<Design>) => void;
  onDelete: () => void;
  children: React.ReactNode;
}

const DesignContextMenu = ({ design, onUpdate, onDelete, children }: DesignContextMenuProps) => {
  // Only showing text formatting options for text elements
  const isText = design.type === "text";
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {isText && (
          <>
            <ContextMenuItem onClick={() => onUpdate({ isBold: !design.isBold })}>
              <Bold className="mr-2 h-4 w-4" />
              <span>{design.isBold ? "Remove Bold" : "Bold"}</span>
            </ContextMenuItem>
            
            <ContextMenuItem onClick={() => onUpdate({ isItalic: !design.isItalic })}>
              <Italic className="mr-2 h-4 w-4" />
              <span>{design.isItalic ? "Remove Italic" : "Italic"}</span>
            </ContextMenuItem>
            
            <ContextMenuItem onClick={() => onUpdate({ isUnderline: !design.isUnderline })}>
              <Underline className="mr-2 h-4 w-4" />
              <span>{design.isUnderline ? "Remove Underline" : "Underline"}</span>
            </ContextMenuItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem onClick={() => onUpdate({ textAlign: "left" })}>
              <AlignLeft className="mr-2 h-4 w-4" />
              <span>Align Left</span>
            </ContextMenuItem>
            
            <ContextMenuItem onClick={() => onUpdate({ textAlign: "center" })}>
              <AlignCenter className="mr-2 h-4 w-4" />
              <span>Align Center</span>
            </ContextMenuItem>
            
            <ContextMenuItem onClick={() => onUpdate({ textAlign: "right" })}>
              <AlignRight className="mr-2 h-4 w-4" />
              <span>Align Right</span>
            </ContextMenuItem>
            
            <ContextMenuSeparator />
          </>
        )}
        
        {/* Size controls for all design types */}
        <div className="px-2 py-1.5">
          <div className="mb-1 text-sm">Size</div>
          <div className="flex items-center mt-1 px-1">
            <Minimize2 className="h-3 w-3 text-gray-500" />
            <Slider 
              value={[design.scale ? design.scale * 100 : 100]}
              min={50}
              max={200}
              step={5}
              className="mx-2"
              onValueChange={(values) => {
                const newScale = values[0] / 100;
                onUpdate({ scale: newScale });
              }}
            />
            <Maximize2 className="h-3 w-3 text-gray-500" />
          </div>
          <div className="text-center text-xs text-gray-500 mt-1">
            {Math.round((design.scale || 1) * 100)}%
          </div>
        </div>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem className="text-red-500 hover:text-red-500 focus:text-red-500" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default DesignContextMenu;
