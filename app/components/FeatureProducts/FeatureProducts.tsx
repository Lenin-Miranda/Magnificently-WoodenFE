import { Product } from "../../interfaces/products";
import { useRouter } from "next/navigation";

export default function FeatureProducts({
  products,
}: {
  products?: Product[];
}) {
  console.log("Received products in FeatureProducts:", products);
  const router = useRouter();

  // Filter featured products and limit to last 4 added
  const featuredProducts =
    products?.filter((product) => product.isFeatured === true).slice(-4) || [];

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div
      data-aos="fade-up"
      className="dark:text-white w-full min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center"
    >
      <div className="mb-8" data-aos="fade-down">
        <h1 className="text-3xl mb-6 font-display font-bold text-cafe dark:text-madera text-center ">
          Featured Products
        </h1>
        <p className="text-center text-cafe dark:text-blanco/80 max-w-2xl px-4">
          Explore our curated selection of exquisitely crafted wooden products
          that combine timeless design with exceptional quality. Each piece is a
          testament to our commitment to craftsmanship and sustainability,
          perfect for adding a touch of natural elegance to your home or gifting
          to loved ones.
        </p>
      </div>

      <div className="w-full max-w-7xl px-4 md:px-6 flex justify-center">
        {featuredProducts.length > 0 ? (
          <div className="w-full max-w-fit">
            <ul
              data-aos="fade-up"
              className={`grid gap-8 justify-items-center ${
                featuredProducts.length === 1
                  ? "grid-cols-1"
                  : featuredProducts.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : featuredProducts.length === 3
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {featuredProducts.map((product, index) => (
                <li
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group relative bg-gradient-to-br from-madera/20 to-madera/10 dark:from-madera dark:to-madera/90 w-full min-w-[320px] max-w-[350px] rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-lg shadow-azul/20 hover:shadow-2xl hover:shadow-azul/30 dark:shadow-verde/20 dark:hover:shadow-verde/30 border border-madera/10 dark:border-verde/20 cursor-pointer"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-azul to-azul/80 dark:from-verde dark:to-verde/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Featured
                    </div>
                  </div>

                  {/* Stock Badge */}
                  {product.inStock < 10 && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                        Low Stock
                      </div>
                    </div>
                  )}

                  {/* Image Container with Overlay */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        typeof product.image === "string"
                          ? product.image
                          : product.image?.src || "/placeholder.jpg"
                      }
                      alt={product.name}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 dark:bg-cafe/90 text-cafe dark:text-blanco px-6 py-2 rounded-full font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white dark:hover:bg-cafe"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Tag and Rating */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-block bg-madera/20 dark:bg-verde/20 text-cafe dark:text-verde px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-cafe/60 dark:text-blanco/60 ml-1">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-xl font-display font-bold text-cafe dark:text-blanco mb-3 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                      }}
                    >
                      {product.name}
                    </h2>

                    {/* Description */}
                    <p
                      className="text-cafe/70 dark:text-blanco/70 text-sm leading-relaxed mb-4 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                      }}
                    >
                      {product.description}
                    </p>

                    {/* Price and Stock Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-azul dark:text-verde">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-sm text-cafe/60 dark:text-blanco/60">
                        <span className="text-xs text-cafe/50 font-bold dark:text-blanco/80">
                          {product.inStock} in stock
                        </span>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-green-500 dark:text-green-800"
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
                          <span className="font-bold text-cafe dark:text-blanco">
                            Handcrafted
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-gradient-to-r from-azul to-azul/90 dark:from-verde dark:to-verde/90 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-azul/90 hover:to-azul dark:hover:from-verde/90 dark:hover:to-verde transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-madera/10 to-transparent dark:from-verde/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-azul/10 to-transparent dark:from-verde/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // Empty state when no featured products
          <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 bg-madera/10 dark:bg-verde/10 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-madera/40 dark:text-verde/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold text-cafe dark:text-madera mb-3">
              No Featured Products Yet
            </h3>
            <p className="text-cafe/60 dark:text-blanco/60 max-w-md leading-relaxed">
              We're currently updating our featured collection. Check back soon
              to discover our latest handcrafted wooden treasures!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
