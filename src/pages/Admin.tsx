
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminCompanyInfo from "@/components/admin/AdminCompanyInfo";

const Admin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your website content here</p>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="company">Company Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="bg-white p-6 rounded-lg shadow-md">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="gallery" className="bg-white p-6 rounded-lg shadow-md">
            <AdminGallery />
          </TabsContent>
          
          <TabsContent value="company" className="bg-white p-6 rounded-lg shadow-md">
            <AdminCompanyInfo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
