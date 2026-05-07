"use client";
import type {
  Product,
  ProductContextType,
  Category,
} from "../interfaces/products";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  deleteProduct,
  updateProduct,
  getCategories,
  uploadProductImages,
  deleteProductImage,
} from "../lib/productApi";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      const parsedProducts = productArray.map((product: any) => ({
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
        // Map main_image from backend to image expected by frontend
        image: product.main_image || product.image,
        // Map additional images array
        images: product.images || [],
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

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      // First try to fetch from API
      const categoriesData = await getCategories();

      if (!categoriesData) {
        throw new Error("Failed to fetch categories");
      }

      const categoryArray = Array.isArray(categoriesData)
        ? categoriesData
        : categoriesData.results ||
          categoriesData.data ||
          categoriesData.categories ||
          [];

      const parsedCategories = categoryArray
        .map((category: any) => ({
          id: Number(category?.id ?? category?.pk ?? category?.value ?? 0),
          name: String(
            category?.name ?? category?.title ?? category?.slug ?? "",
          ),
        }))
        .filter((category: Category) => category.id > 0 && category.name);

      setCategories(parsedCategories);
    } catch (e) {
      console.error("Error fetching categories:", e);
      setCategories([]);
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
        // Map main_image from backend to image expected by frontend
        image: newProduct.main_image || newProduct.image,
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
        // Map main_image from backend to image expected by frontend
        image: updatedProduct.main_image || updatedProduct.image,
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

  // Internal helper: re-fetch all products and sync selectedProduct for a given id
  const refreshAfterImageOp = async (productId: number) => {
    try {
      const raw = await getProducts();
      const arr = Array.isArray(raw)
        ? raw
        : raw.results || raw.data || raw.products || [];
      const parsed = arr.map((p: any) => ({
        ...p,
        price: typeof p.price === "string" ? parseFloat(p.price) : p.price,
        inStock:
          typeof p.inStock === "string" ? parseInt(p.inStock) : p.inStock,
        rating: typeof p.rating === "string" ? parseFloat(p.rating) : p.rating,
        category:
          typeof p.category === "object" && p.category !== null
            ? (p.category as any)?.name ||
              (p.category as any)?.slug ||
              "Unknown"
            : p.category,
        image: p.main_image || p.image,
        images: p.images || [],
      }));
      setProducts(parsed);
      const updated = parsed.find((p: any) => p.id === productId) ?? null;
      if (updated) setSelectedProduct(updated);
    } catch (err) {
      console.error("Failed to refresh products after image operation:", err);
    }
  };

  const addProductImages = async (productId: number, formData: FormData) => {
    setIsLoading(true);
    try {
      await uploadProductImages(productId, formData);
      await refreshAfterImageOp(productId);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  };

  const removeProductImage = async (imageId: number, productId: number) => {
    setIsLoading(true);
    try {
      await deleteProductImage(imageId);
      await refreshAfterImageOp(productId);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw new Error("Failed to delete image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        setProducts,
        fetchProducts,
        fetchProductsBySlug,
        fetchCategories,
        createNewProduct,
        updateExistingProduct,
        deleteExistingProduct,
        isLoading,
        showAddModal,
        setShowAddModal,
        showDeleteModal,
        setShowDeleteModal,
        selectedProduct,
        setSelectedProduct,
        addProductImages,
        removeProductImage,
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
