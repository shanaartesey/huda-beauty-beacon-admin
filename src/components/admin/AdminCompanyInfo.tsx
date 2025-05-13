
import { useState } from "react";
import { useData } from "@/lib/data-context";
import { CompanyInfo as CompanyInfoType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

const AdminCompanyInfo = () => {
  const { companyInfo, updateCompanyInfo } = useData();
  const { toast } = useToast();
  
  // Form data
  const [formData, setFormData] = useState<CompanyInfoType>(companyInfo);
  
  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle nested social fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CompanyInfoType],
          [child]: value
        }
      }));
    } else if (name === "foundedYear") {
      // Parse year as a number
      setFormData((prev) => ({ 
        ...prev, 
        [name]: isNaN(parseInt(value)) ? prev.foundedYear : parseInt(value) 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Update company info
    updateCompanyInfo(formData);
    
    toast({
      title: "Company Information Updated",
      description: "Your company information has been updated successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Company Information</h2>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="font-medium">Company Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tagline" className="font-medium">Tagline</label>
              <Input
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Enter company tagline"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="foundedYear" className="font-medium">Founded Year</label>
              <Input
                id="foundedYear"
                name="foundedYear"
                type="number"
                value={formData.foundedYear.toString()}
                onChange={handleChange}
                placeholder="Enter year founded"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="font-medium">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter company description"
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="address" className="font-medium">Address</label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter company address"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="font-medium">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter company email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="font-medium">Phone</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter company phone"
                required
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Social Media */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="instagram" className="font-medium">Instagram</label>
                <Input
                  id="instagram"
                  name="social.instagram"
                  value={formData.social.instagram}
                  onChange={handleChange}
                  placeholder="Enter Instagram URL"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="facebook" className="font-medium">Facebook</label>
                <Input
                  id="facebook"
                  name="social.facebook"
                  value={formData.social.facebook}
                  onChange={handleChange}
                  placeholder="Enter Facebook URL"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="twitter" className="font-medium">Twitter</label>
                <Input
                  id="twitter"
                  name="social.twitter"
                  value={formData.social.twitter}
                  onChange={handleChange}
                  placeholder="Enter Twitter URL"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="youtube" className="font-medium">YouTube</label>
                <Input
                  id="youtube"
                  name="social.youtube"
                  value={formData.social.youtube}
                  onChange={handleChange}
                  placeholder="Enter YouTube URL"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 text-right">
        <Button type="submit" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </form>
  );
};

export default AdminCompanyInfo;
