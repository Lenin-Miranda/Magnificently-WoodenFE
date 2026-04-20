import { Product } from "./products";

export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  inStock: number;
  main_image: string;
  isActive: boolean;
  isFeatured: boolean;
  rating: string;
  status: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  images: {
    id: number;
    image: string;
    alt_text: string;
  }[];
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  price: string;
  subtotal: string;
  added_at: string;
}

export interface Cart {
  id: number;
  user: number;
  items: CartItem[];
  total_items: number;
  total_price: string;
  created_at: string;
  updated_at: string;
}

export interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  fetchCart: () => Promise<void>;
  handleAddToCart: (productId: number, quantity: number) => void;
  handleRemoveFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  isCartItems: Cart | null;
}
