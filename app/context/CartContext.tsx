"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartContextType } from "../interfaces/cartModal";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../lib/cartApi";
import { Cart } from "../interfaces/cartModal";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isCartItems, setIsCartItems] = useState<Cart | null>(null);

  const openCart = () => {
    setIsCartOpen(true);
    void fetchCart();
  };

  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => {
    if (!isCartOpen) {
      void fetchCart();
    }

    setIsCartOpen((prev) => !prev);
  };

  const fetchCart = async () => {
    setIsCartLoading(true);

    try {
      const cartItems = await getCart();
      setIsCartItems(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      await addToCart(productId, quantity);
      await fetchCart(); // Refresh cart items after adding
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeFromCart(productId);
      await fetchCart(); // Refresh cart items after removing
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await updateCartItem(productId, quantity);
      await fetchCart(); // Refresh cart items after updating
    } catch (e) {
      console.error("Failed to update cart item:", e);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      await fetchCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        isCartLoading,
        fetchCart,
        openCart,
        closeCart,
        toggleCart,
        handleAddToCart,
        handleRemoveFromCart,
        updateQuantity,
        handleClearCart,
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
