
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  
  const categories = [
    { id: 1, name: "Custom Oversized T-shirt", image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" },
    { id: 2, name: "Custom Polo", image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" },
    { id: 3, name: "Custom Round Neck", image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" },
    { id: 4, name: "Custom Tipped Polo", image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" },
  ];
  
  const colorOptions = [
    { id: 1, color: "bg-teal-300" },
    { id: 2, color: "bg-red-800" },
    { id: 3, color: "bg-red-500" },
  ];
  
  const products = [
    { 
      id: 1, 
      name: "Premium Cotton Polo", 
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png",
      rating: 4.5,
      ratingCount: 15,
      price: 599,
      description: "100% Cotton, Polo Neck",
      colors: ["bg-green-700", "bg-blue-600", "bg-black", "bg-red-500"]
    },
    { 
      id: 2, 
      name: "Premium Cotton T-Shirt", 
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png",
      rating: 4.2,
      ratingCount: 12,
      price: 499,
      description: "100% Cotton, Round Neck",
      colors: ["bg-blue-500", "bg-black", "bg-red-600", "bg-yellow-400"]
    },
    { 
      id: 3, 
      name: "Tipped Collar Polo", 
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png",
      rating: 4.8,
      ratingCount: 18,
      price: 699,
      description: "100% Cotton, Polo Neck",
      colors: ["bg-black", "bg-blue-500", "bg-green-700", "bg-red-500"]
    },
    { 
      id: 4, 
      name: "Premium Cotton Hoodie", 
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png",
      rating: 4.6,
      ratingCount: 20,
      price: 999,
      description: "80% Cotton 20% Polyester, Hoodie",
      colors: ["bg-black", "bg-yellow-500", "bg-red-800", "bg-gray-700"]
    },
  ];
  
  const customCategories = [
    { 
      id: 1,
      name: "T-shirt/Round Printing",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
    { 
      id: 2,
      name: "Customized Hoodie Printing",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
    { 
      id: 3,
      name: "Custom College Merchandise",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
    { 
      id: 4,
      name: "Custom Sweatshirts",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
  ];
  
  const winterCollection = [
    { 
      id: 1,
      name: "Premium Cotton Hoodie",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
    { 
      id: 2,
      name: "Premium Cotton Jacket",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
    { 
      id: 3,
      name: "Regular Cotton Hoodie",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
    { 
      id: 4,
      name: "Regular Cotton Jacket",
      image: "/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png"
    },
  ];
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full">
              <img 
                src="/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" 
                alt="T-shirt Left View" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/3 h-full">
              <img 
                src="/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" 
                alt="T-shirt Front View" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/3 h-full">
              <img 
                src="/lovable-uploads/1662ffb0-c160-462c-80bf-ad800276b298.png" 
                alt="T-shirt Right View" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="relative z-10 text-center px-4">
            <p className="text-lg uppercase tracking-wider mb-2">GET BEST DEALS ON</p>
            <h1 className="text-5xl font-bold text-red-800 mb-6">Custom T-SHIRT</h1>
            <Link to="/customize">
              <Button className="bg-red-800 hover:bg-red-900 text-white text-lg py-6 px-8">
                Customize Now
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Categories Carousel */}
        <section className="py-8 px-4 container mx-auto relative">
          <div className="flex overflow-x-auto pb-4 gap-4 -mx-2 px-2 scrollbar-hide">
            {categories.map((category) => (
              <div key={category.id} className="flex-none w-64 min-w-64">
                <div className="relative group h-48 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                    <h3 className="text-white font-medium text-center w-full">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 bg-white rounded-full p-2 shadow-md">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>
        
        {/* Complete your designs */}
        <section className="py-8 px-4 container mx-auto">
          <h2 className="text-xl font-bold mb-6">Complete your designs</h2>
          
          <div className="grid grid-cols-3 gap-6">
            {colorOptions.map((option) => (
              <div key={option.id} className="aspect-square">
                <div className={`w-full h-full ${option.color} rounded-md shadow-sm`}></div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Most Viewed Products */}
        <section className="py-8 px-4 container mx-auto relative">
          <h2 className="text-xl font-bold mb-6">Most Viewed Product</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-0 shadow-sm overflow-hidden">
                <div className="relative h-72 bg-gray-100">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-1">
                    {renderStars(product.rating)}
                    <span className="text-xs text-gray-500 ml-1">({product.ratingCount})</span>
                  </div>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">₹{product.price}</p>
                    <div className="flex gap-1">
                      {product.colors.map((color, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${color}`}></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Free Shipping</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>
        
        {/* Explore All Categories */}
        <section className="py-8 px-4 container mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore All Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customCategories.map((category) => (
              <Link key={category.id} to="/customize">
                <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-80 p-3 text-center">
                    <h3 className="text-sm font-medium">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Winter Collection */}
        <section className="py-8 px-4 container mx-auto relative">
          <h2 className="text-xl font-bold mb-6">Winter Collections</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {winterCollection.map((item) => (
              <div key={item.id} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-80 p-3 text-center">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>
      </main>
      
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">PRODUCTS</h3>
            <ul className="space-y-2 text-sm">
              <li>+ T-SHIRTS</li>
              <li>+ POITYMAPPAY</li>
              <li>+ ACIERYEMPAR</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">PRINTSHARK</h3>
            <ul className="space-y-2 text-sm">
              <li>+ ABOUT US</li>
              <li>+ DELIVERY POLICY</li>
              <li>+ RETURN & REFUND POLICY</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">OUR POLICIES</h3>
            <ul className="space-y-2 text-sm">
              <li>+ PRIVACY POLICY</li>
              <li>+ TERMS AND CONDITIONS</li>
              <li>+ FAQs</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-2 text-sm">
              <li>EMAIL: 941 7010601728</li>
              <li>support@printshark.in</li>
              <li>WhatsApp: 941 7705012938</li>
            </ul>
            <Button className="bg-blue-500 hover:bg-blue-600 mt-4 w-full">Contact Us</Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-8 mt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">Copyright 2023 © Printshark. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <span className="w-8 h-6 bg-gray-300 rounded-sm"></span>
              <span className="w-8 h-6 bg-gray-300 rounded-sm"></span>
              <span className="w-8 h-6 bg-gray-300 rounded-sm"></span>
              <span className="w-8 h-6 bg-gray-300 rounded-sm"></span>
              <span className="w-8 h-6 bg-gray-300 rounded-sm"></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
