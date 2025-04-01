
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Group } from "three";
import * as THREE from 'three';

interface TShirtModelProps {
  color: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

function TShirtModel({ color, position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }: TShirtModelProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
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

  // Simple t-shirt shape using primitives since we don't have a real t-shirt model
  return (
    <group 
      ref={groupRef}
      position={position as any}
      scale={scale as any}
      rotation={rotation as any}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* T-shirt body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.8, 3, 32, 1, true]} />
        <meshStandardMaterial color={threeColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Left sleeve */}
      <mesh castShadow receiveShadow position={[-1.7, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.5, 0.4, 1.5, 32, 1, true]} />
        <meshStandardMaterial color={threeColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Right sleeve */}
      <mesh castShadow receiveShadow position={[1.7, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.5, 0.4, 1.5, 32, 1, true]} />
        <meshStandardMaterial color={threeColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Neck */}
      <mesh castShadow receiveShadow position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32, 1, true]} />
        <meshStandardMaterial color={threeColor} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface TShirt3DModelProps {
  color: string;
}

const TShirt3DModel = ({ color }: TShirt3DModelProps) => {
  return (
    <div className="w-full h-full aspect-square rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <TShirtModel color={color} rotation={[0.2, -0.3, 0]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 4}
        />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default TShirt3DModel;
