
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RotatingTShirt from "./RotatingTShirt";

const HeroSection = () => {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-900 to-purple-900 flex items-center overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="z-10 text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Design Your Perfect <span className="text-yellow-400">T-Shirt</span></h1>
          <p className="text-lg md:text-xl opacity-90">Create personalized t-shirts with our easy-to-use designer. Express yourself with custom prints, colors, and styles.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/customize">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Start Designing
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 border-2 border-white">
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center items-center relative">
          <div className="relative w-80 h-80">
            <RotatingTShirt 
              imageUrl="/lovable-uploads/9a30defd-c470-4305-9cf9-14bf4a859a41.png"
              className="absolute w-full h-full transform transition-all duration-500 hover:scale-110 z-10" 
            />
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-40 h-40 bg-blue-300 rounded-full top-20 left-20 blur-3xl"></div>
        <div className="absolute w-60 h-60 bg-purple-400 rounded-full bottom-10 right-10 blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
