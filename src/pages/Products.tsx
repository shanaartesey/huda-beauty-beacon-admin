
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/data-context";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Products = () => {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle view details button click
  const handleViewDetails = (productId: string, productName: string) => {
    toast({
      title: "Product Selected",
      description: `You selected ${productName}. Product details view coming soon!`,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="section-heading text-center mx-auto">Our Products</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our full range of high-quality beauty products designed to enhance your natural beauty
        </p>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-beauty-pink"
            />
          </div>
          <div className="w-full md:w-1/4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No products found matching your criteria.</p>
            <Button 
              onClick={resetFilters}
              variant="link"
              className="text-beauty-pink mt-2"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                id={product.id}
                className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1591985785613-50580c8c1194?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-beauty-pink font-bold text-lg">${product.price}</span>
                    <Button onClick={() => handleViewDetails(product.id, product.name)}>View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
