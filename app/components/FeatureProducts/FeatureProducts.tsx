import Image from "next/image";
import { Product } from "../../interfaces/products";

export default function FeatureProducts({
  products,
}: {
  products?: Product[];
}) {
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
      <div className="w-full max-w-7xl px-4 md:px-6">
        <ul
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
        >
          {products?.map((product, index) => (
            <li
              key={index}
              className="bg-blanco dark:bg-madera w-full min-w-[300px] max-w-[325px] px-4 py-2 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-400 flex flex-col"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
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
    </div>
  );
}
