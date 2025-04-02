
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

const Products = () => {
  const { categoryId } = useParams();
  
  // Format category name for display
  const formatCategoryName = (id: string) => {
    return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Sample products based on category
  const getCategoryProducts = () => {
    const productsByCategory: Record<string, any[]> = {
      'cotton-tees': [
        {
          id: 1,
          name: "Classic Cotton Tee",
          image: "/lovable-uploads/7e1a891e-e2f0-40b9-a69a-da8b29d2bd09.png",
          price: 499,
          originalPrice: 699
        },
        {
          id: 2,
          name: "Relaxed Fit Cotton Tee",
          image: "/lovable-uploads/cbba3879-73cb-44b6-95e5-0ae6fdfc3cb6.png",
          price: 399,
          originalPrice: 599
        }
      ],
      'polos': [
        {
          id: 3,
          name: "Premium Polo",
          image: "/lovable-uploads/a9685395-ef50-4e65-86a0-b3cc4dd15cd8.png",
          price: 899,
          originalPrice: 1299
        },
        {
          id: 4,
          name: "Striped Polo",
          image: "/lovable-uploads/dca7abda-68f8-4fad-b0a2-33ddd7c18c4d.png",
          price: 799,
          originalPrice: 999
        }
      ],
      'hoodies': [
        {
          id: 5,
          name: "Classic Hoodie",
          image: "/lovable-uploads/65186a80-a920-449a-aec0-8604fca41066.png",
          price: 1299,
          originalPrice: 1799
        }
      ],
      'limited-edition': [
        {
          id: 6,
          name: "Limited Edition Designer Tee",
          image: "/lovable-uploads/7e1a891e-e2f0-40b9-a69a-da8b29d2bd09.png",
          price: 1999,
          originalPrice: 2499
        }
      ],
      'graphic-tees': [
        {
          id: 7,
          name: "Artistic Graphic Tee",
          image: "/lovable-uploads/3cd57992-4245-4eb0-b1b9-68da7fae6eea.png",
          price: 799,
          originalPrice: 999
        }
      ]
    };
    
    return categoryId ? productsByCategory[categoryId] || [] : [];
  };
  
  const products = getCategoryProducts();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {categoryId ? formatCategoryName(categoryId) : 'All Products'}
          </h1>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="border-0 shadow-sm overflow-hidden bg-white rounded-xl hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-square bg-gray-50 p-6">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    
                    <div className="absolute top-3 right-3">
                      <Button size="icon" variant="ghost" className="rounded-full bg-white shadow-sm hover:bg-gray-100">
                        <Heart className="h-5 w-5 text-gray-700" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    
                    <div className="flex items-center gap-2">
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
                    
                    <Button className="w-full gap-2 mt-4">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
