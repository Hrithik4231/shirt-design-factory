
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <span className="text-brand-blue text-2xl font-bold">
            TeeDesigner
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-brand-blue font-medium">
            Home
          </Link>
          <Link to="/" className="text-gray-700 hover:text-brand-blue font-medium">
            Products
          </Link>
          <Link to="/" className="text-gray-700 hover:text-brand-blue font-medium">
            My Orders
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden md:inline-flex">
            Log In
          </Button>
          <Button className="bg-brand-blue hover:bg-brand-lightblue">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
