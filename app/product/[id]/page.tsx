"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "../../data/products";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CartModal from "../../components/cartModal/CartModal";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  if (!product) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe/90 dark:to-cafe">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cafe dark:text-blanco mb-4">
            Product Not Found
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="bg-azul dark:bg-verde text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart([{ ...product, quantity }]);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const incrementQuantity = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe/90 dark:to-cafe font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-transparent">
        <NavBar />

        <div className="w-full py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div
              className="mb-8 flex items-center gap-2 text-cafe/60 dark:text-madera/60"
              data-aos="fade-down"
            >
              <button
                onClick={() => router.push("/")}
                className="hover:text-azul dark:hover:text-verde transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => router.push("/products")}
                className="hover:text-azul dark:hover:text-verde transition-colors"
              >
                Products
              </button>
              <span>/</span>
              <span className="text-cafe dark:text-blanco">{product.name}</span>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div
                className="relative aspect-square bg-gradient-to-br from-madera/20 to-madera/5 dark:from-verde/20 dark:to-verde/5 rounded-2xl overflow-hidden shadow-2xl"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.inStock < 15 && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Low Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-madera/90 dark:bg-verde/90 text-cafe dark:text-blanco">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cafe dark:text-blanco mb-4 tracking-tight"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  {product.name}
                </h1>

                {/* Rating */}
                <div
                  className="flex items-center gap-2 mb-6"
                  data-aos="fade-left"
                  data-aos-delay="400"
                >
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-current"
                            : "fill-gray-300 dark:fill-gray-600"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-medium text-cafe/70 dark:text-madera/70">
                    {product.rating} / 5.0
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6" data-aos="fade-left" data-aos-delay="500">
                  <span className="text-5xl font-bold text-azul dark:text-verde">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-lg text-cafe/50 dark:text-madera/50">
                    USD
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-lg text-cafe/80 dark:text-madera/80 mb-8 leading-relaxed"
                  data-aos="fade-left"
                  data-aos-delay="600"
                >
                  {product.description}
                </p>

                {/* Stock Info */}
                <div className="mb-8" data-aos="fade-left" data-aos-delay="700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cafe/70 dark:text-madera/70">
                      Availability:
                    </span>
                    <span
                      className={`font-semibold ${
                        product.inStock > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {product.inStock > 0
                        ? `${product.inStock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8" data-aos="fade-up" data-aos-delay="800">
                  <label className="block text-cafe/70 dark:text-madera/70 mb-3 font-medium">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-madera/30 dark:border-verde/30 rounded-full overflow-hidden">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-6 py-3 bg-madera/10 dark:bg-verde/10 hover:bg-madera/20 dark:hover:bg-verde/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-cafe dark:text-blanco font-bold"
                      >
                        -
                      </button>
                      <span className="px-8 py-3 text-lg font-semibold text-cafe dark:text-blanco">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= product.inStock}
                        className="px-6 py-3 bg-madera/10 dark:bg-verde/10 hover:bg-madera/20 dark:hover:bg-verde/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-cafe dark:text-blanco font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-cafe/60 dark:text-madera/60">
                      Max: {product.inStock}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock === 0 || isAdding}
                  className={`group/btn relative w-full bg-gradient-to-r from-azul to-azul/90 dark:from-verde dark:to-verde/90 text-white px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isAdding ? "animate-pulse scale-105 shadow-2xl" : ""
                  } ${product.inStock === 0 ? "opacity-50" : ""}`}
                  data-aos="zoom-in"
                  data-aos-delay="900"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg
                      className={`w-6 h-6 transition-transform ${
                        isAdding
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
                    {isAdding ? "✓ Added!" : "Add to Cart"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-madera to-madera/90 dark:from-verde/80 dark:to-verde opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Additional Info */}
                <div
                  className="mt-8 pt-8 border-t border-madera/20 dark:border-verde/20"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-cafe/70 dark:text-madera/70">
                        Handcrafted
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-cafe/70 dark:text-madera/70">
                        Fast Shipping
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-sm text-cafe/70 dark:text-madera/70">
                        Quality Guaranteed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        <CartModal />
      </main>
    </div>
  );
}
