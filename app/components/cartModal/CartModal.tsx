"use client";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-cafe/50 dark:bg-blanco/10 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-blanco dark:bg-cafe shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-madera/20">
              <h2 className="text-2xl font-display font-bold text-cafe dark:text-blanco">
                Shopping Cart
              </h2>
              <button
                onClick={closeCart}
                className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-cafe/60 dark:text-blanco/60 text-center mt-8">
                Your cart is empty
              </p>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-madera/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-cafe dark:text-blanco">
                  Total:
                </span>
                <span className="text-2xl font-display font-bold text-azul dark:text-verde">
                  $0.00
                </span>
              </div>
              <button className="w-full py-3 bg-azul dark:bg-verde text-blanco dark:text-cafe rounded-lg font-semibold hover:bg-azul/90 dark:hover:bg-verde/90 transition-all duration-300">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
