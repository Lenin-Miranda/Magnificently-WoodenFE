import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  description: string;
  price: number;
  rating: number;
  category: string;
  inStock: number;
  image: string | StaticImageData | undefined;
  name: string;
  quantity?: number;
}

export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;
  fetchProductsBySlug: (slug: string) => Promise<Product>;
  createNewProduct: (productData: FormData) => Promise<void>;
  updateExistingProduct: (id: number, productData: FormData) => Promise<void>;
  deleteExistingProduct: (id: number) => Promise<void>;
  isLoading: boolean;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
