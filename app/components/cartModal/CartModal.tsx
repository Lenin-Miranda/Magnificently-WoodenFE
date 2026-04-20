"use client";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartModal() {
  const {
    isCartOpen,
    isCartLoading,
    closeCart,
    isCartItems,
    handleRemoveFromCart,
    updateQuantity,
    handleClearCart,
  } = useCart();

  const cartItems = isCartItems?.items ?? [];
  const hasItems = cartItems.length > 0;
  const totalPrice = Number(isCartItems?.total_price ?? 0);
  const totalItems = isCartItems?.total_items ?? 0;
  const estimatedTax = totalPrice * 0.08;

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const getCartItemImage = (mainImage?: string, fallbackImage?: string) =>
    mainImage || fallbackImage || "/placeholder.png";

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
            className="fixed inset-0 z-40 bg-cafe/55 dark:bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-[100dvh] w-full max-w-full overflow-y-auto overscroll-contain bg-blanco shadow-2xl sm:w-[32rem] dark:bg-cafe"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-madera/25 via-blanco to-azul/10 dark:from-verde/20 dark:via-cafe dark:to-azul/10" />

            {/* Header */}
            <div className="relative border-b border-madera/15 px-4 pb-4 pt-5 dark:border-verde/15 sm:px-6 sm:pb-5 sm:pt-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-madera/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cafe/70 shadow-sm dark:border-verde/15 dark:bg-cafe/80 dark:text-madera">
                    Woodcrafted Picks
                  </div>
                  <h2 className="text-[2.35rem] font-display font-bold tracking-tight text-cafe dark:text-blanco sm:text-3xl">
                    Your Cart
                  </h2>
                  <p className="mt-1 text-sm text-cafe/65 dark:text-blanco/60">
                    {hasItems
                      ? `${totalItems} ${totalItems === 1 ? "piece" : "pieces"} ready to bring home`
                      : "A calm place to review your handmade favorites"}
                  </p>
                </div>

                <button
                  onClick={closeCart}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-madera/20 bg-white/80 text-cafe shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-azul/40 hover:text-azul dark:border-verde/15 dark:bg-cafe/80 dark:text-blanco dark:hover:border-verde/40 dark:hover:text-verde"
                  aria-label="Close cart"
                >
                  <svg
                    className="h-5 w-5"
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

              <div className="rounded-2xl border border-madera/15 bg-white/80 p-4 shadow-lg dark:border-verde/15 dark:bg-blanco/5">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cafe/50 dark:text-blanco/45">
                      Order snapshot
                    </p>
                    <p className="mt-2 text-2xl font-display font-bold text-cafe dark:text-blanco">
                      {formatCurrency(totalPrice)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-azul to-azul/80 px-4 py-3 text-right text-white shadow-lg dark:from-verde dark:to-verde/85">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/75">
                      Shipping
                    </p>
                    <p className="text-lg font-bold">Free</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 border-t border-madera/10 pt-4 text-sm text-cafe/65 dark:border-verde/10 dark:text-blanco/60 sm:grid-cols-2 sm:gap-3">
                  <span>Secure checkout</span>
                  <span className="sm:text-right">
                    Estimated delivery in 3-5 days
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="relative min-h-0 bg-gradient-to-b from-transparent via-madera/5 to-madera/10 px-4 py-4 dark:via-blanco/[0.02] dark:to-blanco/[0.03] sm:px-6 sm:py-5">
              {isCartLoading ? (
                <div className="flex min-h-56 flex-col items-center justify-center rounded-[2rem] border border-dashed border-madera/20 bg-white/70 px-6 text-center shadow-inner dark:border-verde/15 dark:bg-blanco/5 sm:min-h-72">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-azul/20 border-t-azul dark:border-verde/20 dark:border-t-verde" />
                  <p className="mt-5 text-lg font-semibold text-cafe dark:text-blanco">
                    Updating your cart
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-cafe/60 dark:text-blanco/60">
                    We are refreshing quantities, prices, and handcrafted picks.
                  </p>
                </div>
              ) : (
                <>
                  {!hasItems ? (
                    <div className="flex min-h-56 flex-col items-center justify-center rounded-[2rem] border border-dashed border-madera/20 bg-white/80 p-8 text-center shadow-inner dark:border-verde/15 dark:bg-blanco/5 sm:min-h-72">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-madera/25 to-azul/15 text-cafe shadow-lg dark:from-verde/20 dark:to-azul/10 dark:text-blanco">
                        <svg
                          className="h-10 w-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.6}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <h3 className="mt-6 text-2xl font-display font-bold text-cafe dark:text-blanco">
                        Your cart is waiting
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-cafe/60 dark:text-blanco/60">
                        Add a few handcrafted pieces and this space will turn
                        into your personal collection board.
                      </p>
                      <Link
                        href="/products"
                        onClick={closeCart}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-azul to-azul/85 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:from-verde dark:to-verde/85"
                      >
                        Explore products
                      </Link>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {cartItems.map((item, index) => {
                        const itemQuantity = item.quantity || 1;
                        const itemUnitPrice = Number(item.product.price ?? 0);
                        const itemSubtotal = itemUnitPrice * itemQuantity;

                        return (
                          <motion.li
                            key={`${item.id}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="overflow-hidden rounded-[1.75rem] border border-madera/15 bg-white/85 shadow-lg shadow-cafe/5 transition-all duration-300 dark:border-verde/15 dark:bg-blanco/[0.04] dark:shadow-black/10"
                          >
                            <div className="flex gap-4 p-4 sm:p-5">
                              <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-madera/20 to-madera/5 dark:from-verde/20 dark:to-verde/5 sm:h-32 sm:w-28">
                                <img
                                  src={getCartItemImage(
                                    item.product.main_image,
                                    item.product.images?.[0]?.image,
                                  )}
                                  alt={item.product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <span className="inline-flex rounded-full bg-azul/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-azul dark:bg-verde/10 dark:text-verde">
                                      {item.product.category.name}
                                    </span>
                                    <h3 className="mt-3 truncate text-lg font-display font-bold text-cafe dark:text-blanco">
                                      {item.product.name}
                                    </h3>
                                  </div>

                                  <button
                                    onClick={() =>
                                      handleRemoveFromCart(item.id)
                                    }
                                    className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors duration-300 hover:bg-red-500/20 dark:text-red-300"
                                    aria-label={`Remove ${item.product.name}`}
                                  >
                                    <svg
                                      className="h-3.5 w-3.5"
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
                                    Remove
                                  </button>
                                </div>

                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cafe/60 dark:text-blanco/60">
                                  {item.product.description}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
                                  <div className="flex items-center rounded-full border border-madera/15 bg-madera/10 p-1 dark:border-verde/15 dark:bg-blanco/5">
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          itemQuantity - 1,
                                        )
                                      }
                                      disabled={itemQuantity <= 1}
                                      className="flex h-9 w-9 items-center justify-center rounded-full text-cafe transition-colors hover:bg-white hover:text-azul disabled:cursor-not-allowed disabled:opacity-35 dark:text-blanco dark:hover:bg-cafe dark:hover:text-verde"
                                    >
                                      <svg
                                        className="h-4 w-4"
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

                                    <span className="w-10 text-center text-sm font-bold text-cafe dark:text-blanco">
                                      {itemQuantity}
                                    </span>

                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item.id,
                                          itemQuantity + 1,
                                        )
                                      }
                                      className="flex h-9 w-9 items-center justify-center rounded-full text-cafe transition-colors hover:bg-white hover:text-azul dark:text-blanco dark:hover:bg-cafe dark:hover:text-verde"
                                    >
                                      <svg
                                        className="h-4 w-4"
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

                                  <div className="text-sm text-cafe/55 dark:text-blanco/55">
                                    {formatCurrency(itemUnitPrice)} each
                                  </div>
                                </div>

                                <div className="mt-4 flex items-end justify-between gap-4 border-t border-madera/10 pt-4 dark:border-verde/10">
                                  <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-cafe/45 dark:text-blanco/45">
                                      Item total
                                    </p>
                                    <p className="mt-1 text-xl font-display font-bold text-azul dark:text-verde">
                                      {formatCurrency(itemSubtotal)}
                                    </p>
                                  </div>
                                  <div className="text-right text-xs text-cafe/45 dark:text-blanco/45">
                                    {itemQuantity} x{" "}
                                    {formatCurrency(itemUnitPrice)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-madera/15 bg-white/90 px-4 pb-5 pt-4 dark:border-verde/15 dark:bg-cafe/90 sm:px-6 sm:pb-6 sm:pt-5">
              {hasItems && (
                <>
                  <div className="rounded-[1.75rem] border border-madera/15 bg-gradient-to-br from-madera/10 via-white to-azul/5 p-4 shadow-lg dark:border-verde/15 dark:from-blanco/[0.05] dark:via-cafe dark:to-verde/10 sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cafe/45 dark:text-blanco/45">
                          Summary
                        </p>
                        <p className="mt-1 text-lg font-display font-bold text-cafe dark:text-blanco">
                          Ready to checkout
                        </p>
                      </div>
                      <button
                        onClick={handleClearCart}
                        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600 transition-colors hover:text-red-500 dark:text-red-300 sm:text-xs"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="space-y-3 text-sm text-cafe/70 dark:text-blanco/70">
                      <div className="flex items-center justify-between">
                        <span>
                          Subtotal ({totalItems}{" "}
                          {totalItems === 1 ? "item" : "items"})
                        </span>
                        <span>{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Shipping</span>
                        <span className="font-semibold text-verde dark:text-madera">
                          Free
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Estimated tax</span>
                        <span>{formatCurrency(estimatedTax)}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-madera/10 pt-4 dark:border-verde/10">
                      <span className="text-base font-semibold text-cafe dark:text-blanco sm:text-lg">
                        Estimated total
                      </span>
                      <span className="text-[2rem] font-display font-bold text-azul dark:text-verde sm:text-3xl">
                        {formatCurrency(totalPrice + estimatedTax)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-4 space-y-3">
                <button
                  disabled={!hasItems}
                  className="w-full rounded-full bg-gradient-to-r from-azul to-azul/85 px-6 py-4 text-sm font-semibold text-blanco shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:from-verde dark:to-verde/85"
                >
                  {hasItems ? "Proceed to Checkout" : "Cart is Empty"}
                </button>

                <Link
                  href="/products"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center rounded-full border border-madera/20 bg-transparent px-6 py-3 text-sm font-semibold text-cafe transition-all duration-300 hover:border-azul/40 hover:text-azul dark:border-verde/20 dark:text-blanco dark:hover:border-verde/40 dark:hover:text-verde"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
