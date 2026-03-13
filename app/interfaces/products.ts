import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  inStock: number;
  image: string | undefined;
  main_image?: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
  images?: Array<{ id: number; image: string; alt_text: string }>;
}

export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  fetchProducts: () => Promise<void>;
  fetchProductsBySlug: (slug: string) => Promise<Product>;
  createNewProduct: (productData: FormData) => Promise<void>;
  updateExistingProduct: (id: number, productData: FormData) => Promise<void>;
  deleteExistingProduct: (id: number) => Promise<void>;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface EditProductsModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export interface ProductFormData {
  name: string;
  slug: string;
  price: number;
  description: string;
  inStock: number;
  mainImage: File | null;
  isFeatured: boolean;
}
