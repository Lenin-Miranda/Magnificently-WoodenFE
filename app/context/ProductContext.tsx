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
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const productsData = await getProducts();

      // Handle if response is wrapped in an object (e.g., { results: [...] })
      const productArray = Array.isArray(productsData)
        ? productsData
        : productsData.results ||
          productsData.data ||
          productsData.products ||
          [];

      // Ensure numeric fields are properly parsed and handle category objects
      const parsedProducts = productArray.map((product: Product) => ({
        ...product,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price,
        inStock:
          typeof product.inStock === "string"
            ? parseInt(product.inStock)
            : product.inStock,
        rating:
          typeof product.rating === "string"
            ? parseFloat(product.rating)
            : product.rating,
        // Handle category as object or string
        category:
          typeof product.category === "object" && product.category !== null
            ? (product.category as any)?.name ||
              (product.category as any)?.slug ||
              "Unknown"
            : product.category,
      }));
      setProducts(parsedProducts);
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
      // Ensure numeric fields are properly parsed
      const parsedProduct = {
        ...newProduct,
        price:
          typeof newProduct.price === "string"
            ? parseFloat(newProduct.price)
            : newProduct.price,
        inStock:
          typeof newProduct.inStock === "string"
            ? parseInt(newProduct.inStock)
            : newProduct.inStock,
        rating:
          typeof newProduct.rating === "string"
            ? parseFloat(newProduct.rating)
            : newProduct.rating,
        // Handle category as object or string
        category:
          typeof newProduct.category === "object" &&
          newProduct.category !== null
            ? (newProduct.category as any)?.name ||
              (newProduct.category as any)?.slug ||
              "Unknown"
            : newProduct.category,
      };
      setProducts((prevProducts) => [...prevProducts, parsedProduct]);
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
      // Ensure numeric fields are properly parsed
      const parsedProduct = {
        ...updatedProduct,
        price:
          typeof updatedProduct.price === "string"
            ? parseFloat(updatedProduct.price)
            : updatedProduct.price,
        inStock:
          typeof updatedProduct.inStock === "string"
            ? parseInt(updatedProduct.inStock)
            : updatedProduct.inStock,
        rating:
          typeof updatedProduct.rating === "string"
            ? parseFloat(updatedProduct.rating)
            : updatedProduct.rating,
        // Handle category as object or string
        category:
          typeof updatedProduct.category === "object" &&
          updatedProduct.category !== null
            ? (updatedProduct.category as any)?.name ||
              (updatedProduct.category as any)?.slug ||
              "Unknown"
            : updatedProduct.category,
      };
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? parsedProduct : product,
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
        showAddModal,
        setShowAddModal,
        showDeleteModal,
        setShowDeleteModal,
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
