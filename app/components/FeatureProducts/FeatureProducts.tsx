import { Product } from "../../interfaces/products";

export default function FeatureProducts({
  products,
}: {
  products?: Product[];
}) {
  console.log("Received products in FeatureProducts:", products);
  // Filter featured products and limit to last 4 added
  const featuredProducts =
    products?.filter((product) => product.isFeatured === true).slice(-4) || [];

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
                  className="bg-blanco dark:bg-madera w-full min-w-[300px] max-w-[325px] p-4 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-400 flex flex-col"
                >
                  <img
                    src={
                      typeof product.image === "string"
                        ? product.image
                        : product.image?.src || "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-display font-semibold text-cafe dark:text-cafe mb-2">
                      {product.name}
                    </h2>
                    <p className="text-cafe dark:text-cafe/80 text-sm flex-1">
                      {product.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center text-azul dark:text-verde font-bold text-lg">
                      <button className="self-start bg-azul dark:bg-verde text-blanco py-2 px-4 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-600 linear">
                        Add to Cart
                      </button>{" "}
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                  </div>
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
