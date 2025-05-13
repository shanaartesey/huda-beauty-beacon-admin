
import { useState } from "react";
import { useData } from "@/lib/data-context";
import { GalleryImage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
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

const AdminGallery = () => {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useData();
  const { toast } = useToast();
  
  // State for dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form data
  const emptyForm = {
    id: "",
    url: "",
    title: "",
    description: ""
  };
  const [formData, setFormData] = useState<GalleryImage>(emptyForm);
  
  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddImage = () => {
    // Basic validation
    if (!formData.url || !formData.title) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Get values from form data (omitting id for add)
    const { id, ...newImage } = formData;
    
    // Call add image function
    addGalleryImage(newImage);
    
    // Reset and close
    setFormData(emptyForm);
    setIsAddDialogOpen(false);
  };
  
  const handleEditImage = () => {
    // Basic validation
    if (!formData.url || !formData.title) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Call update image function
    updateGalleryImage(formData.id, formData);
    
    // Reset and close
    setFormData(emptyForm);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteImage = () => {
    // Call delete image function
    deleteGalleryImage(formData.id);
    
    // Reset and close
    setFormData(emptyForm);
    setIsDeleteDialogOpen(false);
  };
  
  const openAddDialog = () => {
    setFormData(emptyForm);
    setIsAddDialogOpen(true);
  };
  
  const openEditDialog = (image: GalleryImage) => {
    setFormData(image);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (image: GalleryImage) => {
    setFormData(image);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Image
        </Button>
      </div>
      
      {galleryImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No gallery images available.</p>
          <Button onClick={openAddDialog}>Add Your First Gallery Image</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{image.description}</p>
                )}
                <div className="flex justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openEditDialog(image)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => openDeleteDialog(image)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Image Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Gallery Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter image title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="url">Image URL</label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description (Optional)</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter image description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddImage}>Add Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Image Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Gallery Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="editTitle">Title</label>
              <Input
                id="editTitle"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter image title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editUrl">Image URL</label>
              <Input
                id="editUrl"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editDescription">Description (Optional)</label>
              <Textarea
                id="editDescription"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Enter image description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditImage}>Update Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Image Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gallery image
              "{formData.title}" from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteImage} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminGallery;
