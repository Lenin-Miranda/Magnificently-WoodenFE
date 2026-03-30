"use client";
import AdminNavBar from "@/app/components/NavBar/AdminNavBar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import { useProducts } from "@/app/context/ProductContext";
import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import { deleteProduct } from "@/app/lib/productApi";

export default function AdminProductsPage() {
  const {
    products,
    setShowAddModal,
    fetchProducts,
    isLoading,
    setShowDeleteModal,
  } = useProducts();
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Helper function to extract category name from string or object
  const getCategoryName = (category: any) => {
    if (!category) return "Unknown";
    if (typeof category === "string") return category;
    if (typeof category === "object") {
      return category.name || category.slug || "Unknown";
    }
    return "Unknown";
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    // Cargar productos al montar el componente
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryValue = getCategoryName(product.category);
    const matchesCategory =
      selectedCategory === "all" || categoryValue === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...new Set(products.map((p) => getCategoryName(p.category))),
  ];

  const getStatusBadge = (stock: number) => {
    if (stock === 0)
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          Sin Stock
        </span>
      );
    if (stock <= 5)
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
          Stock Bajo
        </span>
      );
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
        Disponible
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-blanco dark:bg-cafe">
      <AdminNavBar />
      <AddProductModal />
      {productToDelete !== null && <DeleteProductModal id={productToDelete} />}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div
          data-aos="fade-down"
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-display font-bold text-cafe dark:text-madera mb-2">
              Gestión de Productos
            </h1>
            <p className="text-cafe/60 dark:text-blanco/60">
              Administra tu catálogo de productos
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-azul dark:bg-verde text-blanco rounded-xl hover:bg-azul/90 dark:hover:bg-verde/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Agregar Producto
          </button>
        </div>

        {/* Stats Cards */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-blanco dark:bg-cafe/80 rounded-xl p-6 border border-madera/20 dark:border-verde/20 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cafe/60 dark:text-blanco/60 text-sm mb-1">
                  Total Productos
                </p>
                <p className="text-3xl font-bold text-cafe dark:text-blanco">
                  {products.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-azul/10 dark:bg-verde/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-azul dark:text-verde"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-blanco dark:bg-cafe/80 rounded-xl p-6 border border-madera/20 dark:border-verde/20 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cafe/60 dark:text-blanco/60 text-sm mb-1">
                  En Stock
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {products.filter((p) => p.inStock > 5).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-blanco dark:bg-cafe/80 rounded-xl p-6 border border-madera/20 dark:border-verde/20 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cafe/60 dark:text-blanco/60 text-sm mb-1">
                  Stock Bajo
                </p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {
                    products.filter((p) => p.inStock > 0 && p.inStock <= 5)
                      .length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-blanco dark:bg-cafe/80 rounded-xl p-6 border border-madera/20 dark:border-verde/20 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cafe/60 dark:text-blanco/60 text-sm mb-1">
                  Sin Stock
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {products.filter((p) => p.inStock === 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
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
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-blanco dark:bg-cafe/80 rounded-xl p-6 border border-madera/20 dark:border-verde/20 shadow-md mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-cafe/40 dark:text-blanco/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-madera/30 dark:border-verde/30 bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco placeholder-cafe/60 dark:placeholder-blanco/60 focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border border-madera/30 dark:border-verde/30 bg-blanco/50 dark:bg-cafe/50 text-cafe dark:text-blanco focus:border-azul dark:focus:border-verde focus:ring-2 focus:ring-azul/20 dark:focus:ring-verde/20 transition-all duration-300"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-blanco dark:bg-cafe/80 rounded-xl border border-madera/20 dark:border-verde/20 shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-madera/10 dark:bg-verde/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cafe dark:text-blanco uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cafe dark:text-blanco uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cafe dark:text-blanco uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cafe dark:text-blanco uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-cafe dark:text-blanco uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-cafe dark:text-blanco uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-madera/10 dark:divide-verde/10">
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-madera/5 dark:hover:bg-verde/5 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-madera/20 dark:bg-verde/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-cafe dark:text-blanco"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-cafe dark:text-blanco">
                              {product.name}
                            </p>
                            <p className="text-xs text-cafe/60 dark:text-blanco/60">
                              ID: #{product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-cafe dark:text-blanco">
                          {getCategoryName(product.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-cafe dark:text-blanco">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-cafe dark:text-blanco">
                          {product.inStock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(product.inStock)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-azul dark:text-verde hover:bg-azul/10 dark:hover:bg-verde/10 rounded-lg transition-all duration-300">
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              setProductToDelete(product.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <svg
                className="w-16 h-16 mx-auto text-cafe/30 dark:text-blanco/30 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-cafe/60 dark:text-blanco/60 font-medium">
                No se encontraron productos
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
