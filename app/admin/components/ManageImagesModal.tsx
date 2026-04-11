"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/app/context/ProductContext";

export default function ManageImagesModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedProduct, addProductImages, removeProductImage, isLoading } =
    useProducts();

  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setPreviews([]);
    setIsOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
    // reset input so same file can be reselected
    e.target.value = "";
  };

  const removePreview = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (!selectedProduct || previews.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      previews.forEach(({ file }) => formData.append("images", file));
      await addProductImages(selectedProduct.id, formData);
      previews.forEach(({ url }) => URL.revokeObjectURL(url));
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!selectedProduct) return;
    setDeletingId(imageId);
    try {
      await removeProductImage(imageId, selectedProduct.id);
    } catch (err) {
      console.error(err);
      alert("Error deleting image. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

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
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-cafe/70"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
          >
            <div className="w-full max-w-2xl bg-blanco dark:bg-cafe rounded-2xl shadow-2xl border border-madera/20 dark:border-verde/20 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-madera/10 dark:border-verde/10 shrink-0">
                <div>
                  <h2 className="text-xl font-display font-bold text-cafe dark:text-madera">
                    Manage Images
                  </h2>
                  <p className="text-sm text-cafe/60 dark:text-madera/60 mt-0.5 line-clamp-1">
                    {selectedProduct.name}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-4 shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-cafe/10 dark:bg-blanco/10 hover:bg-cafe/20 dark:hover:bg-blanco/20 text-cafe dark:text-blanco transition-all duration-200 hover:scale-110"
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
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Existing Images */}
                <div>
                  <h3 className="text-sm font-semibold text-cafe/70 dark:text-madera/70 uppercase tracking-wider mb-3">
                    Current Images ({selectedProduct.images?.length ?? 0})
                  </h3>

                  {!selectedProduct.images ||
                  selectedProduct.images.length === 0 ? (
                    <div className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-madera/20 dark:border-verde/20 text-cafe/40 dark:text-madera/40 text-sm">
                      No additional images yet
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {selectedProduct.images.map((img) => (
                        <div
                          key={img.id}
                          className="group relative aspect-square rounded-xl overflow-hidden bg-madera/10 dark:bg-verde/10 border border-madera/20 dark:border-verde/20"
                        >
                          <img
                            src={img.image}
                            alt={img.alt || "Product image"}
                            className="w-full h-full object-cover"
                          />
                          {/* Delete overlay */}
                          <div className="absolute inset-0 bg-cafe/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <button
                              onClick={() => handleDelete(img.id)}
                              disabled={deletingId === img.id || isLoading}
                              className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                            >
                              {deletingId === img.id ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
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
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upload New Images */}
                <div>
                  <h3 className="text-sm font-semibold text-cafe/70 dark:text-madera/70 uppercase tracking-wider mb-3">
                    Upload New Images
                  </h3>

                  {/* Drop Zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-madera/30 dark:border-verde/30 bg-madera/5 dark:bg-verde/5 hover:bg-madera/10 dark:hover:bg-verde/10 cursor-pointer transition-colors duration-200 text-cafe/60 dark:text-madera/60"
                  >
                    <svg
                      className="w-7 h-7 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-sm font-medium">
                      Click to select images
                    </p>
                    <p className="text-xs mt-1 opacity-60">
                      PNG, JPG, WebP supported
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {/* Selected previews */}
                  {previews.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {previews.map((p, i) => (
                        <div
                          key={i}
                          className="group relative aspect-square rounded-xl overflow-hidden bg-madera/10 dark:bg-verde/10 border-2 border-azul/30 dark:border-verde/30"
                        >
                          <img
                            src={p.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-cafe/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <button
                              onClick={() => removePreview(i)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white hover:scale-110 transition-all duration-200"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          {/* "new" badge */}
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded bg-azul dark:bg-verde text-white">
                            NEW
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 px-6 py-4 border-t border-madera/10 dark:border-verde/10 flex items-center justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-cafe dark:text-blanco bg-cafe/10 dark:bg-blanco/10 hover:bg-cafe/20 dark:hover:bg-blanco/20 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={handleUpload}
                  disabled={previews.length === 0 || uploading}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-azul dark:bg-verde hover:bg-azul/90 dark:hover:bg-verde/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    <>
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
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload {previews.length > 0 ? `(${previews.length})` : ""}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
