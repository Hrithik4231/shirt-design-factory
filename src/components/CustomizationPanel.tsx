
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Type, 
  Shirt, 
  Image as ImageIcon, 
  Info, 
  Share as ShareIcon 
} from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface CustomizationPanelProps {
  onColorChange: (color: string) => void;
  onAddText: (text: string, fontSize: number, color: string) => void;
  onAddDesign: (imageUrl: string) => void;
}

const CustomizationPanel = ({ 
  onColorChange, 
  onAddText, 
  onAddDesign 
}: CustomizationPanelProps) => {
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");

  const colors = [
    { name: "Aqua", value: "aqua" },
    { name: "White", value: "white" },
    { name: "Black", value: "black" },
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Yellow", value: "yellow" },
    { name: "Purple", value: "purple" },
    { name: "Gray", value: "gray" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server and get a URL back
      // For now, let's use a local URL
      const imageUrl = URL.createObjectURL(file);
      onAddDesign(imageUrl);
      toast.success("Design uploaded successfully!");
    }
  };

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput, fontSize, textColor);
      setTextInput("");
      toast.success("Text added to design!");
    } else {
      toast.error("Please enter some text first!");
    }
  };

  const handleSaveProduct = () => {
    toast.success("Your design has been saved!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Upload Design */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="h-10 w-10 text-brand-blue mb-2" />
              <span className="text-sm font-medium">Upload Design</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Your Design</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="design-upload"
                  onChange={handleFileUpload}
                />
                <Label 
                  htmlFor="design-upload" 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-sm font-medium">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 2MB)</span>
                </Label>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Text */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Type className="h-10 w-10 text-brand-blue mb-2" />
              <span className="text-sm font-medium">Add Text</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Text to Your Design</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Your Text</Label>
                <Textarea 
                  id="text-input" 
                  placeholder="Enter your text here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Input 
                    id="font-size" 
                    type="number" 
                    min="12" 
                    max="72" 
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-color">Text Color</Label>
                  <Input 
                    id="text-color" 
                    type="color" 
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-9 p-1"
                  />
                </div>
              </div>
              <Button className="w-full" onClick={handleAddText}>Add Text to Design</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Change Color */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Shirt className="h-10 w-10 text-brand-blue mb-2" />
              <span className="text-sm font-medium">Change Color</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose T-Shirt Color</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-3 py-4">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-full h-14 rounded-md border flex flex-col items-center justify-center`}
                  style={{ backgroundColor: `var(--tshirt-${color.value}, ${color.value})` }}
                  onClick={() => {
                    onColorChange(color.value);
                    toast.success(`Color changed to ${color.name}`);
                  }}
                >
                  <span className={`text-xs font-medium ${color.value === 'white' || color.value === 'yellow' ? 'text-black' : 'text-white'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Templates */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <ImageIcon className="h-10 w-10 text-brand-blue mb-2" />
              <span className="text-sm font-medium">Template</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose from Templates</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Example Templates */}
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center"
                  onClick={() => {
                    onAddDesign(`/template-${i}.png`);
                    toast.success("Template added to your design!");
                  }}
                >
                  <span className="text-gray-400">Template {i}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Product Details */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Info className="h-10 w-10 text-brand-blue mb-2" />
              <span className="text-sm font-medium">Product Details</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <h3 className="font-bold text-xl">Premium Cotton T-Shirt</h3>
              <p className="text-gray-600">Our premium cotton t-shirts are made from 100% organic cotton for maximum comfort and durability.</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>100% organic cotton</li>
                  <li>Reinforced stitching</li>
                  <li>Pre-shrunk fabric</li>
                  <li>Available in sizes XS to 3XL</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Washing Instructions:</h4>
                <p className="text-gray-600">Machine wash cold, tumble dry low</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold">Price:</h4>
                <p className="text-xl font-bold">$24.99</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <ShareIcon className="h-10 w-10 text-brand-blue mb-2" />
              <span className="text-sm font-medium">Share</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Design</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-gray-600">Share your design with friends and family:</p>
              
              <div className="flex justify-center space-x-6">
                <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
                
                <button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </button>
                
                <button className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
                  </svg>
                </button>
                
                <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                  </svg>
                </button>
              </div>
              
              <div className="pt-4 space-y-2">
                <Label htmlFor="share-link">Direct Link:</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="share-link" 
                    value="https://teedesigner.com/designs/abcd1234" 
                    readOnly
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText("https://teedesigner.com/designs/abcd1234");
                      toast.success("Link copied to clipboard!");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proceed Button */}
      <div className="mt-8">
        <Button 
          className="w-full bg-brand-blue hover:bg-brand-lightblue py-6 text-lg"
          onClick={handleSaveProduct}
        >
          Save & Proceed
        </Button>
      </div>
    </div>
  );
};

export default CustomizationPanel;
