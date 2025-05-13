
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  foundedYear: number;
  address: string;
  email: string;
  phone: string;
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  }
}

export interface User {
  id: string;
  email: string;
  role: "admin" | "viewer";
}
