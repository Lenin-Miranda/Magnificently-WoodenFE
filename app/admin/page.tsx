"use client";
import AdminNavBar from "../components/NavBar/AdminNavBar";
import { useLogin } from "../context/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AOS from "aos";
import { orders } from "../data/orders";
import { useProducts } from "../context/ProductContext";

export default function AdminPage() {
  const { user, isLoading } = useLogin();
  const router = useRouter();
  const [index, setIndex] = useState(3);
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      (!user || (user.role !== "superuser" && user.role !== "staff"))
    ) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  function seeMoreOrders() {
    if (index + 3 < orders.length) {
      setIndex(index + 3);
    } else {
      setIndex(orders.length);
    }
  }

  function seeLessOrders() {
    if (index - 3 >= 3) {
      setIndex(index - 3);
    } else {
      setIndex(3);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blanco dark:bg-cafe flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-azul dark:border-verde border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || (user.role !== "superuser" && user.role !== "staff")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blanco dark:bg-cafe">
      <AdminNavBar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1
          data-aos="fade-down"
          className="text-4xl font-display font-bold text-cafe dark:text-madera mb-8"
        >
          Admin Dashboard
        </h1>

        <div className="bg-blanco dark:bg-cafe/80 rounded-2xl shadow-lg border border-madera/20 dark:border-verde/20 p-8 mb-4">
          <p
            data-aos="fade-left"
            className="text-cafe dark:text-blanco text-xl font-display"
          >
            Welcome to the admin panel. Here you will be able to manage
            products, users, and orders.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            data-aos="fade-right"
            className="bg-blanco dark:bg-cafe/80 rounded-2xl shadow-lg border border-madera/20 dark:border-verde/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-cafe dark:text-blanco text-2xl font-display font-bold">
                Recent Orders
              </h2>
              <span className="text-sm text-cafe/60 dark:text-blanco/60 font-medium">
                {index} de {orders.length}
              </span>
            </div>
            <p className="text-cafe dark:text-blanco/60 mb-4">
              Here you can view and manage the recent orders placed in the
              store.
            </p>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {orders.slice(0, index).map((order, idx) => (
                <div
                  key={order.id}
                  className="bg-madera/5 dark:bg-verde/5 rounded-xl p-4 border border-madera/10 dark:border-verde/10 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-cafe dark:text-blanco font-bold text-lg">
                        #{order.id}
                      </p>
                      <p className="text-cafe/60 dark:text-blanco/60 text-sm">
                        Usuario: {order.userId}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "shipped"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : order.status === "Processing"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          : order.status === "pending"
                          ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                          : order.status === "delivered"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : order.status === "cancelled"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-cafe/50 dark:text-blanco/50 text-xs mb-1">
                        Monto Total
                      </p>
                      <p className="text-cafe dark:text-blanco font-semibold text-lg">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-cafe/50 dark:text-blanco/50 text-xs mb-1">
                        Fecha
                      </p>
                      <p className="text-cafe dark:text-blanco font-medium text-sm">
                        {order.orderDate.toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-madera/20 dark:border-verde/20">
              {orders.length > index ? (
                <button
                  onClick={seeMoreOrders}
                  className="w-full px-4 py-3 bg-azul dark:bg-verde text-blanco rounded-xl hover:bg-azul/90 dark:hover:bg-verde/90 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                >
                  Ver más pedidos
                </button>
              ) : (
                <button
                  onClick={seeLessOrders}
                  className="w-full px-4 py-3 bg-madera/20 dark:bg-verde/20 text-cafe dark:text-blanco rounded-xl hover:bg-madera/30 dark:hover:bg-verde/30 transition-all duration-300 font-semibold"
                >
                  Ver menos pedidos
                </button>
              )}
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="bg-blanco dark:bg-cafe/80 rounded-2xl shadow-lg border border-madera/20 dark:border-verde/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-cafe dark:text-blanco text-2xl font-display font-bold">
                Low Stock Products
              </h2>
              <span className="text-sm text-cafe/60 dark:text-blanco/60 font-medium">
                {products.filter((p) => p.inStock <= 10).length} products
              </span>
            </div>
            <p className="text-cafe dark:text-blanco/60 mb-4">
              Products that need to be restocked urgently.
            </p>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {products.filter((p) => p.inStock <= 10).length > 0 ? (
                products
                  .filter((p) => p.inStock <= 10)
                  .map((product, idx) => (
                    <div
                      key={product.id}
                      className="bg-madera/5 dark:bg-verde/5 rounded-xl p-4 border border-madera/10 dark:border-verde/10 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-cafe dark:text-blanco font-bold">
                          {product.name}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.inStock === 0
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                              : product.inStock <= 5
                              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          }`}
                        >
                          {product.inStock === 0
                            ? "Sin stock"
                            : `${product.inStock} unidades`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-cafe/60 dark:text-blanco/60 text-sm">
                          ${product.price.toFixed(2)}
                        </p>
                        <button className="text-azul dark:text-verde text-sm font-semibold hover:underline">
                          Reabastecer
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
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
                  <p className="text-cafe dark:text-blanco/60 text-center font-medium">
                    ¡Excelente! Todos los productos tienen stock adecuado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
