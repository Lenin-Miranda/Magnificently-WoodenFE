import { StaticImageData } from "next/image";

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  description: string;
  price: number;
  rating: number;
  category: string;
  inStock: number;
  isFeatured?: boolean;
  isActive?: boolean;
  status: string | "available";
  image: string | StaticImageData | undefined;
  name: string;
  quantity?: number;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface ProductContextType {
  products: Product[];
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;
  fetchProductsBySlug: (slug: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createNewProduct: (productData: FormData) => Promise<void>;
  updateExistingProduct: (id: number, productData: FormData) => Promise<void>;
  deleteExistingProduct: (id: number) => Promise<void>;
  isLoading: boolean;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}
