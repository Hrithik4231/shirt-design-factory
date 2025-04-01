
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Phone, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  // Check localStorage to see if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(userLoggedIn);
    };

    // Check initially
    checkLoginStatus();
    
    // Listen for storage events (in case login happens in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event for login/logout within the same tab
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <span className="text-blue-500 text-2xl font-bold">
            TeeDesigner
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">
            Products
          </Link>
          <Link to="/my-orders" className="text-gray-700 hover:text-blue-500 font-medium">
            My Orders
          </Link>
          <Link to="/customize" className="text-gray-700 hover:text-blue-500 font-medium">
            Customize
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">+91 9989113115</span>
          </div>
          
          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hover:-translate-y-1 transition-transform">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button variant="3d" size="sm" className="flex items-center gap-1 font-medium">
                <UserPlus className="h-4 w-4" />
                Create Account
              </Button>
            </Link>
          )}
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="hover:-translate-y-1 transition-transform">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
