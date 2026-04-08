"use client";

import { useProducts } from "@/app/context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function PreviewModal({
  isOpen,
  setIsPreviewOpen,
}: {
  isOpen: boolean;
  setIsPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedProduct } = useProducts();

  const handleClose = () => setIsPreviewOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && selectedProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-cafe/60"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
          >
            <div className="relative pointer-events-auto w-full max-w-lg bg-blanco dark:bg-cafe rounded-3xl overflow-hidden shadow-2xl border border-madera/20 dark:border-madera/30">
              <button
                onClick={handleClose}
                aria-label="Close preview"
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-cafe/10 dark:bg-blanco/10 hover:bg-cafe/20 dark:hover:bg-blanco/20 text-cafe dark:text-blanco transition-all duration-200 hover:scale-110"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image */}
              <div className="relative w-full h-100 overflow-hidden bg-madera/10">
                <img
                  src={selectedProduct.image as string}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blanco dark:from-cafe to-transparent" />
              </div>

              {/* Name + Price */}
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-display font-bold text-cafe dark:text-madera leading-tight">
                  {selectedProduct.name}
                </h2>
                <span className="shrink-0 text-lg font-semibold text-azul dark:text-verde">
                  ${selectedProduct.price.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
