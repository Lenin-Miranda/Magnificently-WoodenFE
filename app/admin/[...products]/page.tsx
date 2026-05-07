"use client";
import AdminNavBar from "@/app/components/NavBar/AdminNavBar";
import { useEffect, useState } from "react";
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
        <span className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
          Sin Stock
        </span>
      );
    if (stock <= 5)
      return (
        <span className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
          Stock Bajo
        </span>
      );
    return (
      <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
        Disponible
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-cafe dark:bg-[#1f1814] dark:text-blanco lg:pl-80">
      <AdminNavBar />
      <AddProductModal />
      {productToDelete !== null && <DeleteProductModal id={productToDelete} />}
      <ManageImagesModal
        isOpen={showManageImages}
        setIsOpen={setShowManageImages}
      />
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-5">
          <section className="rounded-2xl border border-madera/20 bg-white/90 p-5 shadow-sm dark:border-verde/20 dark:bg-cafe/50 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold">
                  Gestion de Productos
                </h1>
                <p className="mt-1 text-sm text-cafe/70 dark:text-blanco/70">
                  Vista minimal para administrar inventario y catalogo.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-azul px-4 py-2 text-sm font-semibold text-white transition hover:bg-azul/90 dark:bg-verde dark:hover:bg-verde/90"
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
                Agregar producto
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">Total</p>
                <p className="text-lg font-semibold">{products.length}</p>
              </div>
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">Disponibles</p>
                <p className="text-lg font-semibold">{availableProducts}</p>
              </div>
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">Stock bajo</p>
                <p className="text-lg font-semibold">{lowStockProducts}</p>
              </div>
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">Categorias</p>
                <p className="text-lg font-semibold">{activeCategoryCount}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-madera/20 bg-white/90 p-5 shadow-sm dark:border-verde/20 dark:bg-cafe/50 sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cafe/45 dark:text-blanco/45"
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
                  placeholder="Buscar por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-madera/20 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-azul/50 dark:border-verde/20 dark:bg-cafe/60 dark:text-blanco dark:focus:border-verde/60"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-madera/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-azul/50 dark:border-verde/20 dark:bg-cafe/60 dark:text-blanco dark:focus:border-verde/60"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Todas las categorias" : cat}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-madera/20 bg-white/95 shadow-sm dark:border-verde/20 dark:bg-cafe/50">
            <div className="border-b border-madera/10 px-5 py-3 text-sm text-cafe/70 dark:border-verde/20 dark:text-blanco/70">
              {filteredProducts.length} resultados
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-madera/8 dark:bg-verde/10">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-cafe/70 dark:text-blanco/70">
                      Producto
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-cafe/70 dark:text-blanco/70">
                      Categoria
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-cafe/70 dark:text-blanco/70">
                      Precio
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-cafe/70 dark:text-blanco/70">
                      Stock
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-cafe/70 dark:text-blanco/70">
                      Estado
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-cafe/70 dark:text-blanco/70">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-madera/10 dark:divide-verde/20">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-madera/5 dark:hover:bg-verde/5"
                    >
                      <td className="whitespace-nowrap px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 overflow-hidden rounded-md border border-madera/20 bg-madera/10 dark:border-verde/20 dark:bg-verde/10">
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
                            <p className="text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-cafe/60 dark:text-blanco/60">
                              ID #{product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-sm">
                        {getCategoryName(product.category)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-sm font-medium">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-sm">
                        {product.inStock}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">
                        {getStatusBadge(product.inStock)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowManageImages(true);
                            }}
                            title="Gestionar imagenes"
                            className="rounded-md p-2 text-madera hover:bg-madera/10 dark:hover:bg-madera/10"
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
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowAddModal(true);
                            }}
                            title="Editar producto"
                            className="rounded-md p-2 text-azul hover:bg-azul/10 dark:text-verde dark:hover:bg-verde/10"
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              setProductToDelete(product.id);
                              setShowDeleteModal(true);
                            }}
                            title="Eliminar producto"
                            className="rounded-md p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-cafe/60 dark:text-blanco/60">
                No se encontraron productos para los filtros actuales.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
