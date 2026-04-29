"use client";
import AdminNavBar from "@/app/components/NavBar/AdminNavBar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import { useProducts } from "@/app/context/ProductContext";
import AddProductModal from "../components/AddProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import ManageImagesModal from "../components/ManageImagesModal";

export default function AdminProductsPage() {
  const {
    products,
    setShowAddModal,
    fetchProducts,
    setShowDeleteModal,
    setSelectedProduct,
  } = useProducts();
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [showManageImages, setShowManageImages] = useState(false);

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
  const availableProducts = products.filter((p) => p.inStock > 5).length;
  const lowStockProducts = products.filter(
    (p) => p.inStock > 0 && p.inStock <= 5,
  ).length;
  const outOfStockProducts = products.filter((p) => p.inStock === 0).length;
  const activeCategoryCount = Math.max(categories.length - 1, 0);

  const getStatusBadge = (stock: number) => {
    if (stock === 0)
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
          Sin Stock
        </span>
      );
    if (stock <= 5)
      return (
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
          Stock Bajo
        </span>
      );
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
        Disponible
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(31,119,164,0.12),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(151,113,74,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,251,247,1)_0%,_rgba(249,242,234,1)_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(121,195,126,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(151,113,74,0.1),_transparent_28%),linear-gradient(180deg,_rgba(43,29,21,1)_0%,_rgba(27,20,16,1)_100%)] lg:pl-80">
      <AdminNavBar />
      <AddProductModal />
      {productToDelete !== null && <DeleteProductModal id={productToDelete} />}
      <ManageImagesModal
        isOpen={showManageImages}
        setIsOpen={setShowManageImages}
      />
      <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <section
            data-aos="fade-down"
            className="overflow-hidden rounded-[2rem] border border-madera/20 bg-white/75 p-6 shadow-[0_25px_80px_-35px_rgba(61,42,31,0.45)] dark:border-verde/15 dark:bg-cafe/45 sm:p-8"
          >
            <div className="grid gap-8 xl:grid-cols-[1.45fr_0.85fr] xl:items-end">
              <div>
                <div className="inline-flex rounded-full border border-madera/20 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-azul shadow-sm dark:border-verde/15 dark:bg-cafe/60 dark:text-verde">
                  Catalog workspace
                </div>
                <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-cafe dark:text-blanco sm:text-5xl">
                  Gestion de Productos
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-cafe/65 dark:text-madera/80">
                  Administra tu catalogo con una vista mas limpia para buscar,
                  editar y controlar inventario sin tocar la logica que ya
                  funciona.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setShowAddModal(true);
                    }}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-azul px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-azul/90 hover:shadow-xl dark:bg-verde dark:hover:bg-verde/90"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Agregar Producto
                  </button>
                  <div className="inline-flex items-center rounded-full border border-madera/20 bg-madera/8 px-4 py-3 text-sm font-medium text-cafe/75 dark:border-verde/15 dark:bg-verde/10 dark:text-blanco/75">
                    {filteredProducts.length} visibles de {products.length}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-[1.5rem] border border-madera/15 bg-gradient-to-br from-white to-madera/10 p-5 shadow-md dark:border-verde/15 dark:from-cafe/70 dark:to-cafe/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
                    Categorias activas
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-display text-4xl font-bold text-cafe dark:text-blanco">
                        {activeCategoryCount}
                      </p>
                      <p className="mt-1 text-sm text-cafe/60 dark:text-madera/75">
                        Filtros listos para navegar mas rapido
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azul/10 text-azul dark:bg-verde/10 dark:text-verde">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3 4.5h18M6.75 9.75h10.5M9.75 15h4.5M10.5 19.5h3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-madera/15 bg-white/70 p-5 shadow-md dark:border-verde/15 dark:bg-cafe/45">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
                    Prioridad
                  </p>
                  <p className="mt-3 text-2xl font-display font-bold text-cafe dark:text-blanco">
                    {outOfStockProducts > 0
                      ? `${outOfStockProducts} productos agotados`
                      : "Catalogo estable"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cafe/60 dark:text-madera/75">
                    {outOfStockProducts > 0
                      ? "Conviene revisar primero los productos fuera de stock para evitar huecos en la tienda."
                      : "No hay alertas criticas. Buen momento para ajustes pequenos en el catalogo."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            data-aos="fade-up"
            className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            <div className="rounded-[1.5rem] border border-madera/20 bg-white/75 p-5 shadow-md dark:border-verde/15 dark:bg-cafe/45">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cafe/45 dark:text-blanco/45">
                    Total Productos
                  </p>
                  <p className="mt-3 text-3xl font-bold text-cafe dark:text-blanco">
                    {products.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-azul/10 text-azul dark:bg-verde/10 dark:text-verde">
                  <svg
                    className="h-6 w-6"
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

            <div className="rounded-[1.5rem] border border-madera/20 bg-white/75 p-5 shadow-md dark:border-verde/15 dark:bg-cafe/45">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cafe/45 dark:text-blanco/45">
                    En Stock
                  </p>
                  <p className="mt-3 text-3xl font-bold text-green-600 dark:text-green-400">
                    {availableProducts}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                  <svg
                    className="h-6 w-6"
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

            <div className="rounded-[1.5rem] border border-madera/20 bg-white/75 p-5 shadow-md dark:border-verde/15 dark:bg-cafe/45">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cafe/45 dark:text-blanco/45">
                    Stock Bajo
                  </p>
                  <p className="mt-3 text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {lowStockProducts}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                  <svg
                    className="h-6 w-6"
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

            <div className="rounded-[1.5rem] border border-madera/20 bg-white/75 p-5 shadow-md dark:border-verde/15 dark:bg-cafe/45">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cafe/45 dark:text-blanco/45">
                    Sin Stock
                  </p>
                  <p className="mt-3 text-3xl font-bold text-red-600 dark:text-red-400">
                    {outOfStockProducts}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  <svg
                    className="h-6 w-6"
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
          </section>

          <section
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-8 rounded-[1.75rem] border border-madera/20 bg-white/75 p-6 shadow-md dark:border-verde/15 dark:bg-cafe/45"
          >
            <div className="flex flex-col gap-3 border-b border-madera/15 pb-5 dark:border-verde/15 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
                  Filtros
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-cafe dark:text-blanco">
                  Busca y organiza
                </h2>
                <p className="mt-2 text-sm text-cafe/60 dark:text-madera/75">
                  Encuentra productos por nombre o categoria sin salir de esta
                  vista.
                </p>
              </div>
              <div className="rounded-full bg-madera/10 px-4 py-2 text-sm font-semibold text-cafe dark:bg-verde/10 dark:text-blanco">
                {selectedCategory === "all"
                  ? "Todas las categorias"
                  : selectedCategory}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cafe/35 dark:text-blanco/35"
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
                  className="w-full rounded-2xl border border-madera/20 bg-white/80 py-3 pl-11 pr-4 text-cafe outline-none transition duration-300 placeholder:text-cafe/45 focus:border-azul/50 focus:ring-4 focus:ring-azul/10 dark:border-verde/20 dark:bg-cafe/60 dark:text-blanco dark:placeholder:text-blanco/40 dark:focus:border-verde/60 dark:focus:ring-verde/10"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-2xl border border-madera/20 bg-white/80 px-4 py-3 text-cafe outline-none transition duration-300 focus:border-azul/50 focus:ring-4 focus:ring-azul/10 dark:border-verde/20 dark:bg-cafe/60 dark:text-blanco dark:focus:border-verde/60 dark:focus:ring-verde/10"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Todas las categorias" : cat}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 overflow-hidden rounded-[1.9rem] border border-madera/20 bg-white/80 shadow-lg dark:border-verde/15 dark:bg-cafe/45"
          >
            <div className="flex items-center justify-between border-b border-madera/10 px-6 py-5 dark:border-verde/10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cafe/45 dark:text-blanco/45">
                  Tabla de productos
                </p>
                <h3 className="mt-2 text-xl font-display font-bold text-cafe dark:text-blanco">
                  Inventario actual
                </h3>
              </div>
              <div className="hidden rounded-full bg-madera/10 px-4 py-2 text-sm font-semibold text-cafe dark:bg-verde/10 dark:text-blanco sm:block">
                {filteredProducts.length} resultados
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px]">
                <thead className="bg-madera/8 dark:bg-verde/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-cafe/65 dark:text-blanco/65">
                      Producto
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-cafe/65 dark:text-blanco/65">
                      Categoría
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-cafe/65 dark:text-blanco/65">
                      Precio
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-cafe/65 dark:text-blanco/65">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.22em] text-cafe/65 dark:text-blanco/65">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.22em] text-cafe/65 dark:text-blanco/65">
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
                        className="transition-colors duration-200 hover:bg-madera/5 dark:hover:bg-verde/5"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-madera/15 bg-madera/10 dark:border-verde/15 dark:bg-verde/10">
                              <img
                                src={
                                  typeof product.image === "string"
                                    ? product.image
                                    : product.image?.src || "/placeholder.jpg"
                                }
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-cafe dark:text-blanco">
                                {product.name}
                              </p>
                              <p className="mt-1 text-xs text-cafe/55 dark:text-blanco/55">
                                ID: #{product.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="rounded-full bg-madera/8 px-3 py-1 text-sm text-cafe dark:bg-verde/8 dark:text-blanco">
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
                            {/* Manage Images */}
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowManageImages(true);
                              }}
                              title="Manage images"
                              className="rounded-xl p-2 text-madera transition-all duration-300 hover:bg-madera/10 dark:text-madera dark:hover:bg-madera/10"
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
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowAddModal(true);
                              }}
                              title="Edit product"
                              className="rounded-xl p-2 text-azul transition-all duration-300 hover:bg-azul/10 dark:text-verde dark:hover:bg-verde/10"
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
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setProductToDelete(product.id);
                                setShowDeleteModal(true);
                              }}
                              className="rounded-xl p-2 text-red-600 transition-all duration-300 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
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
              <div className="px-6 py-14 text-center">
                <svg
                  className="mx-auto mb-4 h-16 w-16 text-cafe/30 dark:text-blanco/30"
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
                <p className="font-medium text-cafe/60 dark:text-blanco/60">
                  No se encontraron productos
                </p>
                <p className="mt-2 text-sm text-cafe/45 dark:text-blanco/45">
                  Prueba con otro nombre o cambia la categoria seleccionada.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
