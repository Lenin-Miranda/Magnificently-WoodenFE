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
  status: string;
  isFeatured: boolean;
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
