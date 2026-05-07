"use client";

import AdminNavBar from "../components/NavBar/AdminNavBar";
import { useLogin } from "../context/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { orders } from "../data/orders";
import { useProducts } from "../context/ProductContext";

function getOrderStatusMeta(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "shipped") {
    return {
      label: "Shipped",
      badge:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      accent: "bg-green-500",
    };
  }

  if (normalizedStatus === "processing") {
    return {
      label: "Processing",
      badge:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      accent: "bg-yellow-500",
    };
  }

  if (normalizedStatus === "pending") {
    return {
      label: "Pending",
      badge:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      accent: "bg-orange-500",
    };
  }

  if (normalizedStatus === "delivered") {
    return {
      label: "Delivered",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      accent: "bg-blue-500",
    };
  }

  if (normalizedStatus === "cancelled") {
    return {
      label: "Cancelled",
      badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      accent: "bg-red-500",
    };
  }

  return {
    label: status,
    badge: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    accent: "bg-gray-500",
  };
}

export default function AdminPage() {
  const { user, isLoading } = useLogin();
  const router = useRouter();
  const [index, setIndex] = useState(4);
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
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
    if (index + 2 < orders.length) {
      setIndex(index + 2);
    } else {
      setIndex(orders.length);
    }
  }

  function seeLessOrders() {
    if (index - 2 >= 4) {
      setIndex(index - 2);
    } else {
      setIndex(4);
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

  const sortedOrders = [...orders].sort(
    (a, b) => b.orderDate.getTime() - a.orderDate.getTime(),
  );
  const visibleOrders = sortedOrders.slice(0, index);
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0,
  );
  const uniqueCustomers = new Set(orders.map((order) => order.userId)).size;
  const pendingOrders = orders.filter((order) => {
    const status = order.status.toLowerCase();
    return status === "pending" || status === "processing";
  }).length;
  const lowStockProducts = products
    .filter((product) => product.inStock <= 10)
    .sort((a, b) => a.inStock - b.inStock);
  const outOfStockProducts = lowStockProducts.filter(
    (product) => product.inStock === 0,
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-cafe dark:bg-[#1f1814] dark:text-blanco lg:pl-80">
      <AdminNavBar />
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-5">
          <section className="rounded-2xl border border-madera/20 bg-white/90 p-5 shadow-sm dark:border-verde/20 dark:bg-cafe/50 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold">
                  Bienvenido, {user.first_name || user.username}
                </h1>
                <p className="mt-1 text-sm text-cafe/70 dark:text-blanco/70">
                  Panel admin simplificado para monitorear ventas, pedidos e
                  inventario.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/admin/products"
                  className="rounded-lg bg-azul px-4 py-2 text-sm font-semibold text-white transition hover:bg-azul/90 dark:bg-verde dark:hover:bg-verde/90"
                >
                  Gestionar productos
                </Link>
                <Link
                  href="/"
                  className="rounded-lg border border-madera/20 px-4 py-2 text-sm font-semibold text-cafe transition hover:bg-madera/10 dark:border-verde/20 dark:text-blanco dark:hover:bg-verde/10"
                >
                  Ver tienda
                </Link>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">Ingresos</p>
                <p className="text-lg font-semibold">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">
                  Pedidos pendientes
                </p>
                <p className="text-lg font-semibold">{pendingOrders}</p>
              </div>
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">
                  Clientes unicos
                </p>
                <p className="text-lg font-semibold">{uniqueCustomers}</p>
              </div>
              <div className="rounded-lg border border-madera/15 bg-madera/5 px-3 py-2 text-sm dark:border-verde/20 dark:bg-verde/10">
                <p className="text-cafe/60 dark:text-blanco/60">Sin stock</p>
                <p className="text-lg font-semibold">{outOfStockProducts}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
            <article className="rounded-2xl border border-madera/20 bg-white/95 p-5 shadow-sm dark:border-verde/20 dark:bg-cafe/50">
              <div className="flex items-center justify-between border-b border-madera/10 pb-3 dark:border-verde/20">
                <h2 className="text-lg font-semibold">Pedidos recientes</h2>
                <p className="text-sm text-cafe/65 dark:text-blanco/65">
                  {visibleOrders.length} de {orders.length}
                </p>
              </div>

              <div className="mt-3 space-y-2">
                {visibleOrders.map((order) => {
                  const statusMeta = getOrderStatusMeta(order.status);

                  return (
                    <div
                      key={order.id}
                      className="rounded-lg border border-madera/15 px-3 py-3 dark:border-verde/20"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            #{order.id}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-xs font-medium ${statusMeta.badge}`}
                          >
                            {statusMeta.label}
                          </span>
                        </div>
                        <span className="text-sm font-semibold">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-cafe/65 dark:text-blanco/65">
                        Cliente {order.userId} • {order.items.length} items •{" "}
                        {order.orderDate.toLocaleDateString("en-US")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-2">
                {orders.length > index ? (
                  <button
                    onClick={seeMoreOrders}
                    className="rounded-lg bg-azul px-4 py-2 text-sm font-semibold text-white transition hover:bg-azul/90 dark:bg-verde dark:hover:bg-verde/90"
                  >
                    Ver mas
                  </button>
                ) : (
                  <button
                    onClick={seeLessOrders}
                    className="rounded-lg border border-madera/20 px-4 py-2 text-sm font-semibold transition hover:bg-madera/10 dark:border-verde/20 dark:hover:bg-verde/10"
                  >
                    Ver menos
                  </button>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-madera/20 bg-white/95 p-5 shadow-sm dark:border-verde/20 dark:bg-cafe/50">
              <div className="flex items-center justify-between border-b border-madera/10 pb-3 dark:border-verde/20">
                <h2 className="text-lg font-semibold">Inventario critico</h2>
                <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  {lowStockProducts.length} alertas
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-lg border border-madera/15 px-3 py-2 dark:border-verde/20"
                    >
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-cafe/65 dark:text-blanco/65">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          product.inStock === 0
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                        }`}
                      >
                        {product.inStock === 0
                          ? "Sin stock"
                          : `${product.inStock} disponibles`}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg border border-madera/15 px-3 py-6 text-center text-sm text-cafe/65 dark:border-verde/20 dark:text-blanco/65">
                    Todo en orden. No hay productos con inventario critico.
                  </p>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
