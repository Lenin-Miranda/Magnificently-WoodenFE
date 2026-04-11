"use client";

import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import CartModal from "../components/cartModal/CartModal";
import SearchBar from "../components/searchBar/SearchBar";
import AOS from "aos";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease",
    });
    fetchProducts();
  }, []);

  const router = useRouter();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-madera dark:via-madera/90 dark:to-madera font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-transparent sm:items-start">
        <NavBar />

        <div className="w-full py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-cafe dark:text-blanco mb-4 tracking-tight">
                Our Products
              </h1>
              <p className="text-lg md:text-xl text-azul dark:text-cafe max-w-2xl mx-auto mb-8 leading-relaxed">
                Discover our carefully crafted collection of handmade wooden
                treasures
              </p>
            </div>
            <div className="mb-12 max-w-md mx-auto">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-white/80 dark:bg-cafe/80 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-madera/20 dark:border-verde/20 cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <div className="relative aspect-square bg-gradient-to-br from-madera/20 to-madera/5 dark:from-verde/20 dark:to-verde/5 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={product.image as string}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-madera/90 dark:bg-verde/90 text-cafe dark:text-blanco">
                        {product.category}
                      </span>
                    </div>
                    {product.inStock < 15 && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-display font-bold text-cafe dark:text-blanco group-hover:text-azul dark:group-hover:text-madera transition-colors duration-300">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-sm font-medium text-cafe/70 dark:text-madera/70">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-cafe/70 dark:text-madera/70 mb-4 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-azul dark:text-blanco">
                          ${product.price}
                        </span>
                        <span className="text-xs text-cafe/50 dark:text-madera/50">
                          {product.inStock} in stock
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddingProductId(product.id);
                          addToCart([product]);
                          setTimeout(() => {
                            setAddingProductId(null);
                          }, 1000);
                        }}
                        disabled={addingProductId === product.id}
                        className={`group/btn relative bg-gradient-to-r from-azul to-azul/90 dark:from-verde dark:to-verde/90 text-white px-6 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
                          addingProductId === product.id ? "animate-pulse" : ""
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              addingProductId === product.id
                                ? "animate-bounce"
                                : "group-hover/btn:rotate-12"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                            />
                          </svg>
                          {addingProductId === product.id
                            ? "✓ Added!"
                            : "Add to Cart"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-madera to-madera/90 dark:from-verde/80 dark:to-verde opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
        <CartModal />
      </main>
    </div>
  );
}
