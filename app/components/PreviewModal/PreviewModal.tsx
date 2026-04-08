"use client";

import { useProducts } from "@/app/context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function PreviewModal({
  isOpen,
  setIsPreviewOpen,
}: {
  isOpen: boolean;
  setIsPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedProduct } = useProducts();
  const [activeIdx, setActiveIdx] = useState(0);

  const handleClose = () => setIsPreviewOpen(false);

  // Build full image list: main image first, then deduplicated extras
  const allImages = useMemo(() => {
    const main = selectedProduct?.image as string | undefined;
    const extras = (selectedProduct?.images ?? [])
      .map((img) => img.image)
      .filter(Boolean) as string[];
    if (!main) return extras;
    // Avoid showing main image twice if backend includes it in extras too
    const deduped = extras.filter((url) => url !== main);
    return [main, ...deduped];
  }, [selectedProduct]);

  // Reset carousel index when product changes
  useEffect(() => {
    setActiveIdx(0);
  }, [selectedProduct?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight")
        setActiveIdx((i) => (i + 1) % allImages.length);
      if (e.key === "ArrowLeft")
        setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, allImages.length]);

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
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close preview"
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-cafe/10 dark:bg-blanco/10 hover:bg-cafe/20 dark:hover:bg-blanco/20 text-cafe dark:text-blanco transition-all duration-200 hover:scale-110"
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

              {/* Main Image */}
              <div className="relative w-full h-80 overflow-hidden bg-madera/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    src={allImages[activeIdx]}
                    alt={selectedProduct.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>

                {/* Prev/Next arrows — only show when multiple images */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveIdx(
                          (i) => (i - 1 + allImages.length) % allImages.length,
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-blanco/80 dark:bg-cafe/80 hover:bg-blanco dark:hover:bg-cafe text-cafe dark:text-blanco shadow-md transition-all duration-200 hover:scale-110"
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
                          strokeWidth={2.5}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setActiveIdx((i) => (i + 1) % allImages.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-blanco/80 dark:bg-cafe/80 hover:bg-blanco dark:hover:bg-cafe text-cafe dark:text-blanco shadow-md transition-all duration-200 hover:scale-110"
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
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Dot indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIdx(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            i === activeIdx
                              ? "bg-blanco w-4"
                              : "bg-blanco/50 hover:bg-blanco/80"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blanco dark:from-cafe to-transparent pointer-events-none" />
              </div>

              {/* Thumbnail strip — only when multiple images */}
              {allImages.length > 1 && (
                <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                  {allImages.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        i === activeIdx
                          ? "border-azul dark:border-verde scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Name + Price */}
              <div
                className={`px-6 py-5 flex items-center justify-between gap-4 ${
                  allImages.length > 1 ? "pt-3" : ""
                }`}
              >
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
