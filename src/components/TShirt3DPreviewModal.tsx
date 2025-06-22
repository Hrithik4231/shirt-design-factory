
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from 'three';
import { X } from "lucide-react";
import { DesignsByView } from "@/pages/Index";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TShirt3DModelWithDesignsProps {
  color: string;
  designsByView: DesignsByView;
}

function TShirt3DModelWithDesigns({ color, designsByView }: TShirt3DModelWithDesignsProps) {
  // Convert the color string to the format used by Three.js
  const getThreeColor = (colorName: string) => {
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
    return colorMap[colorName.toLowerCase()] || colorMap.white;
  };
  
  // Get the color as a THREE.Color object
  const threeColor = getThreeColor(color);

  return (
    <group>
      {/* Main t-shirt body - more realistic shape */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color={threeColor} />
      </mesh>
      
      {/* Left sleeve */}
      <mesh castShadow receiveShadow position={[-2.2, 1, 0]}>
        <boxGeometry args={[1.6, 2, 0.2]} />
        <meshStandardMaterial color={threeColor} />
      </mesh>
      
      {/* Right sleeve */}
      <mesh castShadow receiveShadow position={[2.2, 1, 0]}>
        <boxGeometry args={[1.6, 2, 0.2]} />
        <meshStandardMaterial color={threeColor} />
      </mesh>
      
      {/* Neck opening */}
      <mesh castShadow receiveShadow position={[0, 1.8, 0.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color={threeColor} />
      </mesh>
      
      {/* Front designs */}
      <group position={[0, 0, 0.11]}>
        {designsByView.front.map((design, index) => (
          <mesh 
            key={`front-${design.id}`} 
            position={[
              ((design.x - 50) / 50) * 1.2, 
              ((50 - design.y) / 50) * 1.5, 
              0
            ]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial transparent={true}>
              <canvasTexture 
                attach="map" 
                image={createCanvasWithDesign(design)} 
              />
            </meshBasicMaterial>
          </mesh>
        ))}
      </group>
      
      {/* Back designs */}
      <group position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
        {designsByView.back.map((design, index) => (
          <mesh 
            key={`back-${design.id}`} 
            position={[
              -((design.x - 50) / 50) * 1.2, 
              ((50 - design.y) / 50) * 1.5, 
              0
            ]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial transparent={true}>
              <canvasTexture 
                attach="map" 
                image={createCanvasWithDesign(design)} 
              />
            </meshBasicMaterial>
          </mesh>
        ))}
      </group>
      
      {/* Left side designs */}
      <group position={[-1.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {designsByView.left.map((design, index) => (
          <mesh 
            key={`left-${design.id}`} 
            position={[
              ((design.x - 50) / 50) * 1.2, 
              ((50 - design.y) / 50) * 1.5, 
              0
            ]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial transparent={true}>
              <canvasTexture 
                attach="map" 
                image={createCanvasWithDesign(design)} 
              />
            </meshBasicMaterial>
          </mesh>
        ))}
      </group>
      
      {/* Right side designs */}
      <group position={[1.51, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {designsByView.right.map((design, index) => (
          <mesh 
            key={`right-${design.id}`} 
            position={[
              -((design.x - 50) / 50) * 1.2, 
              ((50 - design.y) / 50) * 1.5, 
              0
            ]}
          >
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial transparent={true}>
              <canvasTexture 
                attach="map" 
                image={createCanvasWithDesign(design)} 
              />
            </meshBasicMaterial>
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Helper function to create a canvas with the design
function createCanvasWithDesign(design: any) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return canvas;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (design.type === 'text') {
    // Set text properties
    ctx.font = `${design.isBold ? 'bold' : ''} ${design.isItalic ? 'italic' : ''} ${(design.fontSize || 16) * (design.scale || 1)}px ${design.fontFamily || 'Arial'}`;
    ctx.fillStyle = design.color || 'black';
    ctx.textAlign = design.textAlign as CanvasTextAlign || 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text
    ctx.fillText(design.content, canvas.width / 2, canvas.height / 2);
    
    // Add underline if needed
    if (design.isUnderline) {
      const textWidth = ctx.measureText(design.content).width;
      const textHeight = design.fontSize || 16;
      ctx.beginPath();
      ctx.moveTo((canvas.width / 2) - (textWidth / 2), (canvas.height / 2) + (textHeight / 2));
      ctx.lineTo((canvas.width / 2) + (textWidth / 2), (canvas.height / 2) + (textHeight / 2));
      ctx.strokeStyle = design.color || 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  } else if (design.type === 'image') {
    // For images, we need to load the image first
    const img = new Image();
    img.src = design.content;
    
    // We're inside a helper function that returns immediately, so we'll draw a placeholder
    // In a real implementation, you'd want to handle loading asynchronously
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px Arial';
    ctx.fillText('Image', canvas.width / 2, canvas.height / 2);
    
    // This is a simple way to handle the async image loading
    // In a real app, you might want a more robust solution
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = design.scale || 1;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };
  }
  
  return canvas;
}

interface TShirt3DPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tshirtColor: string;
  designsByView: DesignsByView;
}

const TShirt3DPreviewModal = ({ 
  isOpen, 
  onClose, 
  tshirtColor, 
  designsByView 
}: TShirt3DPreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] h-[600px] p-0">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">3D Preview</h2>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="flex-1 w-full">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />
              <TShirt3DModelWithDesigns color={tshirtColor} designsByView={designsByView} />
              <OrbitControls 
                enablePan={true} 
                enableZoom={true} 
                autoRotate={true}
                autoRotateSpeed={1}
                maxDistance={15}
                minDistance={5}
              />
              <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={8} blur={2} far={4} />
              <Environment preset="studio" />
            </Canvas>
          </div>
          
          <div className="p-4 border-t">
            <p className="text-sm text-gray-500 text-center">
              Drag to rotate, scroll to zoom, double click to reset
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TShirt3DPreviewModal;
