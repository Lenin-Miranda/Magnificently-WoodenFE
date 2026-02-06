"use client";
import type { Product, ProductContextType } from "../interfaces/products";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../lib/productApi";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductsBySlug = async (slug: string) => {
    setIsLoading(true);
    try {
      const productData = await getProductBySlug(slug);
      return productData;
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      throw new Error("Failed to fetch product");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewProduct = async (productData: FormData) => {
    setIsLoading(true);
    try {
      const newProduct = await createProduct(productData);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const updateExistingProduct = async (id: number, productData: FormData) => {
    setIsLoading(true);
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product,
        ),
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExistingProduct = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        fetchProductsBySlug,
        createNewProduct,
        updateExistingProduct,
        deleteExistingProduct,
        isLoading,
        showEditModal,
        setShowEditModal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return ctx;
}
