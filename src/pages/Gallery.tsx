
import { useState } from "react";
import { useData } from "@/lib/data-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Gallery = () => {
  const { galleryImages } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    setSelectedImage(imageId);
  };

  const selectedImageData = galleryImages.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="section-heading text-center mx-auto">Beauty Gallery</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Get inspired by our collection of stunning beauty looks and product highlights
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer h-72 transition-transform hover:scale-[1.02] duration-300"
              onClick={() => handleImageClick(image.id)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-semibold text-xl">{image.title}</h3>
                {image.description && (
                  <p className="text-white/80 text-sm mt-2">{image.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          {selectedImageData && (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedImageData.title}</DialogTitle>
                {selectedImageData.description && (
                  <DialogDescription className="text-base mt-2">
                    {selectedImageData.description}
                  </DialogDescription>
                )}
              </DialogHeader>
              <div className="mt-4 overflow-hidden rounded-lg">
                <img
                  src={selectedImageData.url}
                  alt={selectedImageData.title}
                  className="w-full h-auto"
                />
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Gallery;
