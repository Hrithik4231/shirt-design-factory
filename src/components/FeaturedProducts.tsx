
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";

const products = [
  { 
    id: 1, 
    name: "Premium Cotton Polo", 
    image: "/lovable-uploads/a9685395-ef50-4e65-86a0-b3cc4dd15cd8.png",
    rating: 4.5,
    reviewCount: 124,
    price: 599,
    originalPrice: 899,
    colors: ["bg-blue-600", "bg-red-600", "bg-black"],
    isNew: true,
    isBestseller: false
  },
  { 
    id: 2, 
    name: "Classic White Tee", 
    image: "/lovable-uploads/7e1a891e-e2f0-40b9-a69a-da8b29d2bd09.png",
    rating: 4.8,
    reviewCount: 245,
    price: 399,
    originalPrice: 499,
    colors: ["bg-white", "bg-gray-200", "bg-black"],
    isNew: false,
    isBestseller: true
  },
  { 
    id: 3, 
    name: "Oversized Graphic Tee", 
    image: "/lovable-uploads/3cd57992-4245-4eb0-b1b9-68da7fae6eea.png",
    rating: 4.6,
    reviewCount: 89,
    price: 699,
    originalPrice: 899,
    colors: ["bg-black", "bg-gray-600", "bg-blue-800"],
    isNew: true,
    isBestseller: false
  },
  { 
    id: 4, 
    name: "Striped Polo", 
    image: "/lovable-uploads/dca7abda-68f8-4fad-b0a2-33ddd7c18c4d.png",
    rating: 4.3,
    reviewCount: 67,
    price: 799,
    originalPrice: 999,
    colors: ["bg-blue-500", "bg-red-500", "bg-green-600"],
    isNew: false,
    isBestseller: false
  },
];

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="border-0 shadow-sm overflow-hidden bg-white rounded-xl hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square bg-gray-50 p-6">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {(product.isNew || product.isBestseller) && (
                  <div className="absolute top-3 left-3">
                    {product.isNew && (
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">NEW</span>
                    )}
                    {product.isBestseller && (
                      <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">BESTSELLER</span>
                    )}
                  </div>
                )}
                
                <div className={`absolute top-3 right-3 transition-opacity duration-200 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <Button size="icon" variant="ghost" className="rounded-full bg-white shadow-sm hover:bg-gray-100">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
                
                <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-4 transition-transform duration-300 ${hoveredProduct === product.id ? 'translate-y-0' : 'translate-y-full'}`}>
                  <Button className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-green-600 font-medium">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className={`w-4 h-4 rounded-full border ${color} ${color === 'bg-white' ? 'border-gray-300' : 'border-transparent'}`}
                    ></div>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">+{product.colors.length} colors</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
