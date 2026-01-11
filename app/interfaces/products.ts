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

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
