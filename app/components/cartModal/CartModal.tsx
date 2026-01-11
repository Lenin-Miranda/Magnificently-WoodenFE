"use client";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CartModal() {
  const { isCartOpen, closeCart, isCartItems, removeFromCart, updateQuantity } =
    useCart();

  const totalPrice = isCartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const totalItems = isCartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

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
              {isCartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg
                    className="w-24 h-24 text-cafe/30 dark:text-blanco/30 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="text-cafe/60 dark:text-blanco/60 text-center">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {isCartItems.map((item, index) => (
                    <motion.li
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-madera/5 dark:bg-blanco/5 rounded-lg p-4 flex gap-4 relative group"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-blanco dark:bg-cafe">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-cafe dark:text-blanco truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-cafe/60 dark:text-blanco/60 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs px-2 py-1 bg-azul/10 dark:bg-verde/10 text-azul dark:text-verde rounded-full">
                            {item.category}
                          </span>
                          <span className="text-lg font-bold text-azul dark:text-verde">
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs text-cafe/50 dark:text-blanco/50">
                            Qty:
                          </span>
                          <div className="flex items-center gap-2 bg-madera/10 dark:bg-blanco/10 rounded-lg p-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (item.quantity || 1) - 1
                                )
                              }
                              disabled={(item.quantity || 1) <= 1}
                              className="w-6 h-6 flex items-center justify-center text-cafe dark:text-blanco hover:bg-azul/20 dark:hover:bg-verde/20 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-cafe dark:text-blanco">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (item.quantity || 1) + 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-cafe dark:text-blanco hover:bg-azul/20 dark:hover:bg-verde/20 rounded transition-colors"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>
                          <span className="text-xs text-cafe/40 dark:text-blanco/40">
                            ${item.price.toFixed(2)} each
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500/20"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-madera/20 space-y-4">
              {isCartItems.length > 0 && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-cafe/70 dark:text-blanco/70">
                      <span>
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"}):
                      </span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-cafe/70 dark:text-blanco/70">
                      <span>Shipping:</span>
                      <span className="text-verde dark:text-madera">Free</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-madera/20">
                    <span className="text-lg font-semibold text-cafe dark:text-blanco">
                      Total:
                    </span>
                    <span className="text-2xl font-display font-bold text-azul dark:text-verde">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
              <button
                disabled={isCartItems.length === 0}
                className="w-full py-3 bg-azul dark:bg-verde text-blanco dark:text-cafe rounded-lg font-semibold hover:bg-azul/90 dark:hover:bg-verde/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-azul dark:disabled:hover:bg-verde"
              >
                {isCartItems.length === 0
                  ? "Cart is Empty"
                  : "Proceed to Checkout"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
