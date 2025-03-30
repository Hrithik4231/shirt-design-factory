
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TShirtViewSelectorProps {
  currentView: "front" | "back" | "left" | "right";
  onViewChange: (view: "front" | "back" | "left" | "right") => void;
}

const TShirtViewSelector = ({ currentView, onViewChange }: TShirtViewSelectorProps) => {
  const views = [
    { id: "front", label: "Front" },
    { id: "back", label: "Back" },
    { id: "left", label: "Left" },
    { id: "right", label: "Right" },
  ] as const;

  return (
    <div className="flex flex-col space-y-2 w-full">
      {views.map((view) => (
        <Button
          key={view.id}
          variant="outline"
          className={cn(
            "flex items-center justify-center h-16 border bg-white shadow-sm",
            currentView === view.id 
              ? "border-brand-blue text-brand-blue" 
              : "border-gray-200 text-gray-600"
          )}
          onClick={() => onViewChange(view.id)}
        >
          {view.label}
        </Button>
      ))}
    </div>
  );
};

export default TShirtViewSelector;
