"use client";
import { useState } from "react";
import { Product } from "../../interfaces/products";
import { useProducts } from "@/app/context/ProductContext";

export default function AddProductModal() {
  const { showAddModal, setShowAddModal, createNewProduct, isLoading } =
    useProducts();
  const [productModal, setProductModal] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    inStock: 0,
    isFeatured: false,
    category: "",
    rating: 0,
    status: "active",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof Product,
    value: string | number | boolean,
  ) => {
    setProductModal({ ...productModal, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create FormData for the API call
      const formData = new FormData();

      // Add all product data to FormData
      formData.append("name", productModal.name || "");
      formData.append("description", productModal.description || "");
      formData.append("price", productModal.price?.toString() || "0");
      formData.append("inStock", productModal.inStock?.toString() || "0");
      formData.append("category", productModal.category || "");
      formData.append(
        "isFeatured",
        productModal.isFeatured?.toString() || "false",
      );
      formData.append("status", productModal.status || "active");
      formData.append("rating", productModal.rating?.toString() || "0");

      // Add image if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Call the create function from context
      await createNewProduct(formData);

      // Reset form and close modal
      setProductModal({
        name: "",
        description: "",
        price: 0,
        inStock: 0,
        isFeatured: false,
        category: "",
        rating: 0,
        status: "active",
      });
      setImageFile(null);
      setImagePreview(null);
      setShowAddModal(false);

      // Success notification
    } catch (error) {
      console.error("Error creating product:", error);
      // You could add an error notification here
      alert("Error creating product. Please try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
        showAddModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{
        background: showAddModal
          ? "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)"
          : "transparent",
      }}
    >
      <div
        className={`bg-gradient-to-br from-blanco to-madera/5 dark:from-cafe dark:to-verde/10 rounded-2xl shadow-2xl w-full max-w-4xl mx-4 my-4 transform transition-all duration-300 ${
          showAddModal ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-cafe dark:text-blanco font-display">
              Create New Product
            </h2>
            <p className="text-cafe/60 dark:text-madera/60 text-sm">
              Add a new product to your inventory
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 rounded-full bg-cafe/10 dark:bg-verde/10 text-cafe dark:text-blanco hover:bg-cafe/20 dark:hover:bg-verde/20 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
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

        {/* Form */}
        <div className="px-6">
          <form className="space-y-4 pb-6" onSubmit={handleSubmit}>
            {/* Grid Layout for compact form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Product Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-cafe dark:text-blanco mb-2">
                    Product Name
                  </label>
                  <input
                    value={productModal?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    type="text"
                    className="w-full px-3 py-2 border-2 border-madera/20 dark:border-verde/20 rounded-lg bg-transparent text-cafe dark:text-blanco placeholder:text-cafe/40 dark:placeholder:text-madera/40 focus:border-blue-500 dark:focus:border-green-500 focus:outline-none transition-all duration-200"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Price and Stock Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="group">
                    <label className="block text-sm font-semibold text-cafe dark:text-blanco mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={productModal?.price || ""}
                      onChange={(e) =>
                        handleInputChange("price", parseFloat(e.target.value))
                      }
                      className="w-full px-3 py-2 border-2 border-madera/20 dark:border-verde/20 rounded-lg bg-transparent text-cafe dark:text-blanco placeholder:text-cafe/40 dark:placeholder:text-madera/40 focus:border-blue-500 dark:focus:border-green-500 focus:outline-none transition-all duration-200"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-cafe dark:text-blanco mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={productModal?.inStock || ""}
                      onChange={(e) =>
                        handleInputChange("inStock", parseInt(e.target.value))
                      }
                      className="w-full px-3 py-2 border-2 border-madera/20 dark:border-verde/20 rounded-lg bg-transparent text-cafe dark:text-blanco placeholder:text-cafe/40 dark:placeholder:text-madera/40 focus:border-blue-500 dark:focus:border-green-500 focus:outline-none transition-all duration-200"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="group">
                  <label className="block text-sm font-semibold text-cafe dark:text-blanco mb-2">
                    Category
                  </label>
                  <select
                    value={productModal?.category || ""}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border-2 border-madera/20 dark:border-verde/20 rounded-lg bg-transparent text-cafe dark:text-blanco focus:border-blue-500 dark:focus:border-green-500 focus:outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Toys">Toys</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Decor">Decor</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Games">Games</option>
                  </select>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between p-3 bg-madera/5 dark:bg-verde/5 rounded-lg border border-madera/20 dark:border-verde/20">
                  <div>
                    <label className="text-sm font-semibold text-cafe dark:text-blanco">
                      Featured Product
                    </label>
                    <p className="text-xs text-cafe/60 dark:text-madera/60">
                      Display prominently
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("isFeatured", !productModal?.isFeatured)
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      productModal?.isFeatured
                        ? "bg-blue-500 dark:bg-green-500"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        productModal?.isFeatured
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-between">
                {/* Description */}
                <div className="group">
                  <label className="block text-sm font-semibold text-cafe dark:text-blanco mb-2">
                    Description
                  </label>
                  <textarea
                    value={productModal?.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border-2 border-madera/20 dark:border-verde/20 rounded-lg bg-transparent text-cafe dark:text-blanco placeholder:text-cafe/40 dark:placeholder:text-madera/40 focus:border-blue-500 dark:focus:border-green-500 focus:outline-none transition-all duration-200 resize-none"
                    placeholder="Enter product description"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="group">
                  <label className="block text-sm font-semibold text-cafe dark:text-blanco mb-2">
                    Product Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          // Create preview URL
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-madera/30 dark:border-verde/30 rounded-lg bg-madera/5 dark:bg-verde/5 hover:bg-madera/10 dark:hover:bg-verde/10 transition-colors duration-200">
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <p className="text-white text-xs">
                              Click to change
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <svg
                            className="w-6 h-6 mx-auto text-cafe/50 dark:text-madera/50 mb-1"
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
                          <p className="text-xs text-cafe/70 dark:text-madera/70">
                            Click to upload image
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                disabled={isLoading}
                className="flex-1 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#DC2626",
                  color: "white",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-blue-600 dark:bg-green-600 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
