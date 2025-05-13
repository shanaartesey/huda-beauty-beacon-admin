
import { useState } from "react";
import { useData } from "@/lib/data-context";
import { Product } from "@/lib/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Pencil, Trash } from "lucide-react";

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const { toast } = useToast();
  
  // State for dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form data
  const emptyForm = {
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    category: ""
  };
  const [formData, setFormData] = useState<Product>(emptyForm);
  
  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Parse price as a number if the field is price
    if (name === "price") {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: isNaN(parseFloat(value)) ? 0 : parseFloat(value) 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddProduct = () => {
    // Basic validation
    if (!formData.name || !formData.description || !formData.image || !formData.category) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Get values from form data (omitting id for add)
    const { id, ...newProduct } = formData;
    
    // Call add product function
    addProduct(newProduct);
    
    // Reset and close
    setFormData(emptyForm);
    setIsAddDialogOpen(false);
  };
  
  const handleEditProduct = () => {
    // Basic validation
    if (!formData.name || !formData.description || !formData.image || !formData.category) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Call update product function
    updateProduct(formData.id, formData);
    
    // Reset and close
    setFormData(emptyForm);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteProduct = () => {
    // Call delete product function
    deleteProduct(formData.id);
    
    // Reset and close
    setFormData(emptyForm);
    setIsDeleteDialogOpen(false);
  };
  
  const openAddDialog = () => {
    setFormData(emptyForm);
    setIsAddDialogOpen(true);
  };
  
  const openEditDialog = (product: Product) => {
    setFormData(product);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (product: Product) => {
    setFormData(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products available.</p>
          <Button onClick={openAddDialog}>Add Your First Product</Button>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 rounded object-cover" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name">Product Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category (e.g., Eyes, Lips, Face)"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="price">Price ($)</label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price.toString()}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image">Image URL</label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="editName">Product Name</label>
              <Input
                id="editName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editCategory">Category</label>
              <Input
                id="editCategory"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category (e.g., Eyes, Lips, Face)"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editPrice">Price ($)</label>
              <Input
                id="editPrice"
                name="price"
                type="number"
                value={formData.price.toString()}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editImage">Image URL</label>
              <Input
                id="editImage"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editDescription">Description</label>
              <Textarea
                id="editDescription"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Product Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{formData.name}" from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
