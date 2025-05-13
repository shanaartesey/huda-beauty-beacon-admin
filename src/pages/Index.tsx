
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/data-context";
import { Link } from "react-router-dom";

const Index = () => {
  const { products, companyInfo } = useData();
  
  // Get featured products (just the first 3)
  const featuredProducts = products.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-[80vh] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block animate-enter">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {companyInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              {companyInfo.tagline}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mx-auto">Featured Products</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our most popular beauty products loved by makeup enthusiasts worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-beauty-pink font-bold text-lg">${product.price}</span>
                    <Button asChild>
                      <Link to={`/products#${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="section-heading">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in {companyInfo.foundedYear}, Huda Beauty has quickly become one of the world's 
                fastest-growing beauty brands. What started as a blog in 2010, then false lashes in 2013, 
                has evolved into one of the most coveted beauty brands around the globe.
              </p>
              <p className="text-gray-600 mb-8">
                {companyInfo.description}
              </p>
              <Button asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-beauty-pink rounded-lg transform translate-x-4 translate-y-4"></div>
                <img 
                  src="https://images.unsplash.com/photo-1596704017254-9a89c0e9a630?q=80&w=2670&auto=format&fit=crop" 
                  alt="Huda Beauty Story" 
                  className="rounded-lg relative z-10 w-full h-auto shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-beauty-pink text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Beauty Community</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about our new product launches, 
            exclusive offers, and beauty tips.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-md flex-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-beauty-pink focus:ring-opacity-50"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-beauty-pink hover:bg-gray-100 md:whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
