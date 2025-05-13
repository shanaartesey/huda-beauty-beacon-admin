
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { 
  MenuIcon, 
  X as CloseIcon, 
  User,
  ShoppingCart 
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-beauty-pink">
              Huda Beauty
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-beauty-pink transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-beauty-pink transition-colors">
              Products
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-beauty-pink transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-beauty-pink transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-beauty-pink transition-colors">
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button asChild variant="ghost">
                  <Link to="/admin" className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                </Button>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/login">Admin Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700" aria-label="Toggle Menu">
              {isOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-beauty-pink transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-beauty-pink transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/gallery" 
                className="text-gray-700 hover:text-beauty-pink transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-beauty-pink transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-beauty-pink transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="ghost">
                    <Link 
                      to="/admin" 
                      className="flex items-center" 
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="mr-1 w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => { logout(); setIsOpen(false); }}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/login">Admin Login</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
