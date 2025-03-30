
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">TeeDesigner</h3>
            <p className="text-sm">
              Custom t-shirts and apparel for individuals, teams, and businesses. Express yourself with our easy-to-use design tools.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white">All Products</Link></li>
              <li><Link to="/category/tshirts" className="text-gray-400 hover:text-white">T-Shirts</Link></li>
              <li><Link to="/category/polos" className="text-gray-400 hover:text-white">Polo Shirts</Link></li>
              <li><Link to="/category/hoodies" className="text-gray-400 hover:text-white">Hoodies</Link></li>
              <li><Link to="/customize" className="text-gray-400 hover:text-white">Custom Designs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/policy/shipping" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/policy/returns" className="text-gray-400 hover:text-white">Returns & Refunds</Link></li>
              <li><Link to="/policy/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Subscribe</h3>
            <p className="text-sm mb-4">Get the latest updates and offers straight to your inbox.</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
            <p className="text-xs mt-4 text-gray-500">
              By subscribing, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 TeeDesigner. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <img src="https://via.placeholder.com/40x24" alt="Payment method" className="h-6" />
            <img src="https://via.placeholder.com/40x24" alt="Payment method" className="h-6" />
            <img src="https://via.placeholder.com/40x24" alt="Payment method" className="h-6" />
            <img src="https://via.placeholder.com/40x24" alt="Payment method" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
