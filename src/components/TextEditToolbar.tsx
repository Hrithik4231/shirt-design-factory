
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Design } from "@/pages/Index";

interface TextEditToolbarProps {
  design: Design;
  onUpdate: (updates: Partial<Design>) => void;
  onDelete: () => void;
}

const TextEditToolbar = ({ design, onUpdate, onDelete }: TextEditToolbarProps) => {
  const toggleBold = () => {
    onUpdate({ isBold: !design.isBold });
  };
  
  const toggleItalic = () => {
    onUpdate({ isItalic: !design.isItalic });
  };
  
  const toggleUnderline = () => {
    onUpdate({ isUnderline: !design.isUnderline });
  };
  
  const setAlignment = (alignment: "left" | "center" | "right") => {
    onUpdate({ textAlign: alignment });
  };
  
  return (
    <div className="bg-white rounded-full shadow-md flex items-center p-1">
      <div className="flex space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 rounded-full ${design.isBold ? 'bg-gray-200' : ''}`}
          onClick={toggleBold}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 rounded-full ${design.isItalic ? 'bg-gray-200' : ''}`}
          onClick={toggleItalic}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 rounded-full ${design.isUnderline ? 'bg-gray-200' : ''}`}
          onClick={toggleUnderline}
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              {design.textAlign === "left" ? (
                <AlignLeft className="h-4 w-4" />
              ) : design.textAlign === "right" ? (
                <AlignRight className="h-4 w-4" />
              ) : (
                <AlignCenter className="h-4 w-4" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1">
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${design.textAlign === 'left' ? 'bg-gray-200' : ''}`}
                onClick={() => setAlignment("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${design.textAlign === 'center' ? 'bg-gray-200' : ''}`}
                onClick={() => setAlignment("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${design.textAlign === 'right' ? 'bg-gray-200' : ''}`}
                onClick={() => setAlignment("right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TextEditToolbar;
