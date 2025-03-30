
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Products = () => {
  const { categoryId } = useParams();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {categoryId ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ')}` : 'All Products'}
          </h1>
          
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">Product listing page coming soon...</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
