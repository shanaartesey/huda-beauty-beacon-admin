
import { CompanyInfo, GalleryImage, Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Legit Lashes Double-Ended Mascara",
    description: "A dual-ended volumizing and lengthening mascara for the ultimate false lash effect.",
    price: 29,
    image: "https://images.unsplash.com/photo-1631214524020-3c587f9e4064?q=80&w=800&auto=format&fit=crop",
    category: "Eyes"
  },
  {
    id: "2",
    name: "Easy Bake Loose Powder",
    description: "A loose powder that brightens and sets makeup for a flawless finish.",
    price: 34,
    image: "https://images.unsplash.com/photo-1599733589046-d99f00fa4ea5?q=80&w=800&auto=format&fit=crop",
    category: "Face"
  },
  {
    id: "3",
    name: "Power Bullet Matte Lipstick",
    description: "A highly-pigmented, comfortable matte lipstick with one-stroke application.",
    price: 25,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop",
    category: "Lips"
  },
  {
    id: "4",
    name: "New Nude Eyeshadow Palette",
    description: "A revolutionized neutral eyeshadow palette with innovative textures and finishes.",
    price: 65,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
    category: "Eyes"
  },
  {
    id: "5",
    name: "Wishful Yo Glow Enzyme Scrub",
    description: "A gentle exfoliating scrub that reveals smooth, glowing skin.",
    price: 39,
    image: "https://images.unsplash.com/photo-1607602160048-d0f67066a4c3?q=80&w=800&auto=format&fit=crop",
    category: "Skincare"
  },
  {
    id: "6",
    name: "Life Liner Double Ended Eyeliner",
    description: "A double-ended liquid and pencil eyeliner for versatile eye looks.",
    price: 25,
    image: "https://images.unsplash.com/photo-1631214450975-cf2ec283b603?q=80&w=800&auto=format&fit=crop",
    category: "Eyes"
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1596704017254-9a89c0e9a630?q=80&w=2670&auto=format&fit=crop",
    title: "Summer Glow Collection",
    description: "Introducing our new summer-ready looks featuring golden highlights"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2670&auto=format&fit=crop",
    title: "Bold Lips Series",
    description: "Make a statement with our collection of vibrant lip colors"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1526045233731-7371559e3636?q=80&w=2670&auto=format&fit=crop",
    title: "Classic Beauty",
    description: "Timeless looks that never go out of style"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1461395386098-e00ff7afe9b3?q=80&w=2680&auto=format&fit=crop",
    title: "Runway Inspiration",
    description: "Looks inspired by our latest fashion show appearances"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2574&auto=format&fit=crop",
    title: "Everyday Elegance",
    description: "Simple yet stunning looks for your everyday beauty routine"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop",
    title: "Fashion Forward",
    description: "Cutting edge beauty to complement the latest fashion trends"
  }
];

export const companyInfo: CompanyInfo = {
  name: "Huda Beauty",
  tagline: "For Every Beauty Enthusiast",
  description: "Founded by award-winning beauty blogger Huda Kattan, Huda Beauty has shaken up the beauty industry through its innovative approach to beauty and makeup. Starting with a line of false lashes that revolutionized the market, the brand has expanded to include a full range of makeup products that are high-quality, innovative, and accessible to beauty lovers worldwide.",
  foundedYear: 2013,
  address: "Dubai Design District, Building 8, Dubai, UAE",
  email: "info@hudabeauty.com",
  phone: "+971 4 123 4567",
  social: {
    instagram: "https://www.instagram.com/hudabeauty/",
    facebook: "https://www.facebook.com/hudabeauty/",
    twitter: "https://twitter.com/hudabeauty",
    youtube: "https://www.youtube.com/hudabeauty"
  }
};
