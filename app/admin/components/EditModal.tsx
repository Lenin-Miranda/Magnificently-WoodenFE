"use client";
import { useState } from "react";
import { Product, ProductFormData } from "../../interfaces/products";
import { useProducts } from "@/app/context/ProductContext";

export default function EditModal() {
  const { showEditModal, setShowEditModal } = useProducts();
  const [productModal, setProductModal] = useState<ProductFormData | null>({
    name: "",
    slug: "",
    price: 0,
    description: "",
    inStock: 0,
    mainImage: null,
    isFeatured: false,
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        showEditModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-cafe rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-cafe dark:text-blanco">
          Edit Product
        </h2>
        {/* Form fields for editing product details */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              value={productModal?.name}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              value={productModal?.price}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={productModal?.description}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock
            </label>
            <input
              type="number"
              value={productModal?.inStock}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured
            </label>
            <input
              type="checkbox"
              checked={productModal?.isFeatured}
              className="mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Main Image
            </label>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors duration-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
