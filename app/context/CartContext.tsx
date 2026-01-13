"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartContextType } from "../interfaces/cartModal";
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../lib/cartApi";
import { Product } from "../interfaces/products";
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartItems, setIsCartItems] = useState<Product[]>([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (products: Product[]) => {
    setIsCartItems((prev) => {
      const updatedCart = [...prev];

      products.forEach((product) => {
        const existingItem = updatedCart.find((item) => item.id === product.id);

        if (existingItem) {
          existingItem.quantity =
            (existingItem.quantity || 1) + (product.quantity || 1);
        } else {
          updatedCart.push({ ...product, quantity: product.quantity || 1 });
        }
      });

      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setIsCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setIsCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
