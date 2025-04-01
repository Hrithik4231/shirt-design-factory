
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Get 30% Off on Custom Orders</h2>
            <p className="text-lg opacity-90">
              Create your own designs and get 30% off on all custom orders. Limited time offer for our valued customers.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</span>
                <span>Free shipping on orders above ₹999</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</span>
                <span>100% cotton premium quality</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">✓</span>
                <span>7-day easy returns</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/customize">
                <Button variant="3d-yellow" size="xl" className="font-semibold">
                  Design Your Own
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <div className="bg-white p-8 rounded-xl relative z-10">
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                <div className="bg-red-500 text-white text-xl font-bold w-24 h-24 flex items-center justify-center rounded-full">
                  <div className="text-center">
                    <div className="text-sm">SAVE</div>
                    <div className="text-2xl">30%</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/4f861f62-dd20-4d37-8564-f437f83338f7.png" 
                    alt="Front view of customizable t-shirt" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="aspect-square bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/654ff394-ccf2-4197-a335-ad0cb1efcc32.png" 
                    alt="Back view of customizable t-shirt" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-black">
                <p className="font-bold text-lg">Use code: <span className="text-blue-600">CUSTOM30</span></p>
                <p className="text-sm text-gray-600">Valid until June 30, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
