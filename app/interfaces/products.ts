import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  description: string;
  price: number;
  rating: number;
  category: string;
  inStock: number;
  image: string | StaticImageData;
  name: string;
}
