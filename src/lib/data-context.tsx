
import React, { createContext, useContext, useState } from "react";
import { companyInfo as defaultCompanyInfo, products as defaultProducts, galleryImages as defaultGalleryImages } from "./data";
import { CompanyInfo, Product, GalleryImage } from "./types";
import { useToast } from "@/components/ui/use-toast";

interface DataContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  galleryImages: GalleryImage[];
  setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addGalleryImage: (image: Omit<GalleryImage, "id">) => void;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultCompanyInfo);
  const { toast } = useToast();

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    
    setProducts((prev) => [...prev, newProduct]);
    toast({
      title: "Product added",
      description: `${product.name} has been added successfully`,
    });
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) => 
      prev.map((p) => (p.id === id ? { ...p, ...product } : p))
    );
    
    toast({
      title: "Product updated",
      description: `The product has been updated successfully`,
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    
    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully",
    });
  };

  const addGalleryImage = (image: Omit<GalleryImage, "id">) => {
    const newImage = {
      ...image,
      id: Date.now().toString()
    };
    
    setGalleryImages((prev) => [...prev, newImage]);
    toast({
      title: "Image added",
      description: `${image.title} has been added to the gallery`,
    });
  };

  const updateGalleryImage = (id: string, image: Partial<GalleryImage>) => {
    setGalleryImages((prev) => 
      prev.map((img) => (img.id === id ? { ...img, ...image } : img))
    );
    
    toast({
      title: "Gallery image updated",
      description: "The gallery image has been updated successfully",
    });
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
    
    toast({
      title: "Gallery image deleted",
      description: "The image has been removed from the gallery",
    });
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo((prev) => ({ ...prev, ...info }));
    
    toast({
      title: "Company info updated",
      description: "Company information has been updated successfully",
    });
  };

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        galleryImages,
        setGalleryImages,
        companyInfo,
        setCompanyInfo,
        addProduct,
        updateProduct,
        deleteProduct,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        updateCompanyInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
