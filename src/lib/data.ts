export interface ProductVariant {
  id: string;
  name: string; // e.g., "Nursery Pot", "Ceramic Pot"
  priceModifier: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  badge?: string;
  
  // Filtering attributes
  category: string;
  sunlight: "Low" | "Bright Indirect" | "Direct";
  maintenance: "Easy" | "Medium" | "High";
  petFriendly: boolean;
  size: "Small" | "Medium" | "Large";
  
  // Care info
  careInstructions: {
    water: string;
    light: string;
    petSafe: string;
  };
  
  variants: ProductVariant[];
}

export const mockProducts: Product[] = [];
