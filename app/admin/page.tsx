"use client";

import AdminNavBar from "../components/NavBar/AdminNavBar";
import { useLogin } from "../context/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
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
      badge:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
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
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const uniqueCustomers = new Set(orders.map((order) => order.userId)).size;
  const pendingOrders = orders.filter((order) => {
    const status = order.status.toLowerCase();
    return status === "pending" || status === "processing";
  }).length;
  const lowStockProducts = products
    .filter((product) => product.inStock <= 10)
    .sort((a, b) => a.inStock - b.inStock);
  const outOfStockProducts = products.filter((product) => product.inStock === 0);
  const activeProducts = products.filter((product) => product.inStock > 0).length;
  const inventoryHealth = products.length
    ? Math.round((activeProducts / products.length) * 100)
    : 0;

  const statusOverview = [
    {
      key: "processing",
      label: "In progress",
      count: orders.filter((order) =>
        ["processing", "pending"].includes(order.status.toLowerCase()),
      ).length,
      color: "bg-yellow-500",
    },
    {
      key: "shipped",
      label: "On the way",
      count: orders.filter((order) => order.status.toLowerCase() === "shipped")
        .length,
      color: "bg-green-500",
    },
    {
      key: "delivered",
      label: "Delivered",
      count: orders.filter((order) => order.status.toLowerCase() === "delivered")
        .length,
      color: "bg-blue-500",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: orders.filter((order) => order.status.toLowerCase() === "cancelled")
        .length,
      color: "bg-red-500",
    },
  ];

  const statCards = [
    {
      label: "Total revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      note: `${orders.length} recorded orders`,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 6v12m0 0-3-3m3 3 3-3M6.75 9.75h10.5a2.25 2.25 0 0 1 2.25 2.25v0a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 14.25v0A2.25 2.25 0 0 1 6.75 12h10.5"
          />
        </svg>
      ),
      tone:
        "from-azul to-azul/85 text-white dark:from-verde dark:to-verde/85",
    },
    {
      label: "Products live",
      value: `${products.length}`,
      note: `${outOfStockProducts.length} currently out of stock`,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="m20.25 7.5-8.25 4.5-8.25-4.5m16.5 0L12 3l-8.25 4.5m16.5 0v9L12 21l-8.25-4.5v-9m8.25 4.5V21"
          />
        </svg>
      ),
      tone:
        "from-madera/30 to-madera/10 text-cafe dark:from-verde/20 dark:to-verde/5 dark:text-blanco",
    },
    {
      label: "Action needed",
      value: `${lowStockProducts.length}`,
      note: "Items with low inventory",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008Zm8.25-.758L13.5 4.5c-.644-1.115-2.356-1.115-3 0L3.75 16.492c-.643 1.114.16 2.508 1.5 2.508h13.5c1.34 0 2.143-1.394 1.5-2.508Z"
          />
        </svg>
      ),
      tone:
        "from-orange-100 to-orange-50 text-orange-700 dark:from-orange-900/20 dark:to-orange-900/5 dark:text-orange-300",
    },
    {
      label: "Active customers",
      value: `${uniqueCustomers}`,
      note: `${pendingOrders} orders awaiting action`,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M18 18.75a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3m12-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
      tone:
        "from-white to-madera/10 text-cafe dark:from-cafe/80 dark:to-cafe dark:text-blanco",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blanco via-madera/10 to-blanco dark:from-cafe dark:via-cafe dark:to-cafe lg:pl-80">
      <AdminNavBar />
      <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <section
            data-aos="fade-down"
            className="overflow-hidden rounded-[2rem] border border-madera/20 bg-gradient-to-br from-cafe via-cafe/95 to-cafe/85 px-6 py-7 text-white shadow-2xl dark:border-verde/15 sm:px-8"
          >
            <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr] xl:items-end">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-madera">
                  Operations overview
                </div>
                <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-blanco sm:text-5xl">
                  Welcome back, {user.first_name || user.username}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Your workshop is moving well today. Track revenue, inventory,
                  and order activity from one calm control center.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/admin/products"
                    className="rounded-full bg-azul px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-azul/90 dark:bg-verde dark:hover:bg-verde/90"
                  >
                    Manage products
                  </Link>
                  <Link
                    href="/"
                    className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                  >
                    Open storefront
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                    Inventory health
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-display font-bold text-white">
                        {inventoryHealth}%
                      </p>
                      <p className="mt-1 text-sm text-white/65">
                        Products available for sale right now
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-madera">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3.75 12h16.5m-8.25-8.25v16.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/15 to-white/5 p-5 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                    Next priority
                  </p>
                  <p className="mt-3 text-2xl font-display font-bold text-white">
                    {lowStockProducts.length > 0
                      ? `${lowStockProducts.length} items need stock review`
                      : "Inventory is looking healthy"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {lowStockProducts.length > 0
                      ? "Start with the products that are almost gone to keep the storefront ready."
                      : "No urgent restock alerts right now. Great moment to focus on growth."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            data-aos="fade-up"
            className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {statCards.map((card) => (
              <article
                key={card.label}
                className={`rounded-[1.75rem] border border-madera/15 bg-gradient-to-br p-5 shadow-lg ${card.tone}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                      {card.label}
                    </p>
                    <p className="mt-3 font-display text-3xl font-bold">
                      {card.value}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    {card.icon}
                  </div>
                </div>
                <p className="mt-4 text-sm opacity-80">{card.note}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
            <div
              data-aos="fade-right"
              className="rounded-[2rem] border border-madera/20 bg-white/90 p-6 shadow-xl dark:border-verde/15 dark:bg-cafe/85"
            >
              <div className="flex flex-col gap-3 border-b border-madera/15 pb-5 dark:border-verde/15 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
                    Recent orders
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-cafe dark:text-blanco">
                    Order flow
                  </h2>
                  <p className="mt-2 text-sm text-cafe/60 dark:text-blanco/60">
                    Keep an eye on the latest customer activity and fulfillment
                    status.
                  </p>
                </div>
                <div className="rounded-full bg-madera/10 px-4 py-2 text-sm font-semibold text-cafe dark:bg-verde/10 dark:text-blanco">
                  Showing {visibleOrders.length} of {orders.length}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {visibleOrders.map((order) => {
                  const statusMeta = getOrderStatusMeta(order.status);

                  return (
                    <div
                      key={order.id}
                      className="rounded-[1.5rem] border border-madera/15 bg-gradient-to-r from-madera/10 to-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-verde/10 dark:from-blanco/[0.03] dark:to-cafe"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-cafe dark:text-blanco">
                              #{order.id}
                            </span>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusMeta.badge}`}
                            >
                              {statusMeta.label}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-cafe/60 dark:text-blanco/60">
                            Customer {order.userId} placed {order.items.length}{" "}
                            {order.items.length === 1 ? "item" : "items"}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-xs uppercase tracking-[0.18em] text-cafe/45 dark:text-blanco/45">
                            Total
                          </p>
                          <p className="mt-1 text-2xl font-display font-bold text-cafe dark:text-blanco">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 border-t border-madera/10 pt-4 text-sm text-cafe/65 dark:border-verde/10 dark:text-blanco/60 sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-cafe/45 dark:text-blanco/45">
                            Date
                          </p>
                          <p className="mt-1 font-medium">
                            {order.orderDate.toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-cafe/45 dark:text-blanco/45">
                            Items
                          </p>
                          <p className="mt-1 font-medium">{order.items.length}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-cafe/45 dark:text-blanco/45">
                            Fulfillment
                          </p>
                          <div className="mt-2 h-2 rounded-full bg-madera/10 dark:bg-verde/10">
                            <div
                              className={`h-2 rounded-full ${statusMeta.accent}`}
                              style={{
                                width:
                                  statusMeta.label === "Delivered"
                                    ? "100%"
                                    : statusMeta.label === "Shipped"
                                      ? "78%"
                                      : statusMeta.label === "Processing"
                                        ? "56%"
                                        : statusMeta.label === "Pending"
                                          ? "30%"
                                          : "18%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-madera/15 pt-5 dark:border-verde/15 sm:flex-row">
                {orders.length > index ? (
                  <button
                    onClick={seeMoreOrders}
                    className="flex-1 rounded-full bg-azul px-5 py-3 text-sm font-semibold text-blanco transition-colors duration-300 hover:bg-azul/90 dark:bg-verde dark:hover:bg-verde/90"
                  >
                    Load more orders
                  </button>
                ) : (
                  <button
                    onClick={seeLessOrders}
                    className="flex-1 rounded-full bg-madera/15 px-5 py-3 text-sm font-semibold text-cafe transition-colors duration-300 hover:bg-madera/25 dark:bg-verde/15 dark:text-blanco dark:hover:bg-verde/25"
                  >
                    Show fewer orders
                  </button>
                )}

                <Link
                  href="/admin/products"
                  className="flex-1 rounded-full border border-madera/20 px-5 py-3 text-center text-sm font-semibold text-cafe transition-colors duration-300 hover:border-azul/40 hover:text-azul dark:border-verde/20 dark:text-blanco dark:hover:border-verde/40 dark:hover:text-verde"
                >
                  Review catalog
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <section
                data-aos="fade-left"
                className="rounded-[2rem] border border-madera/20 bg-white/90 p-6 shadow-xl dark:border-verde/15 dark:bg-cafe/85"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
                  Performance split
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-cafe dark:text-blanco">
                  Status overview
                </h2>

                <div className="mt-6 space-y-4">
                  {statusOverview.map((item) => {
                    const width = orders.length
                      ? `${Math.max((item.count / orders.length) * 100, item.count ? 12 : 0)}%`
                      : "0%";

                    return (
                      <div key={item.key}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-cafe dark:text-blanco">
                            {item.label}
                          </span>
                          <span className="text-cafe/60 dark:text-blanco/60">
                            {item.count}
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-madera/10 dark:bg-verde/10">
                          <div
                            className={`h-2.5 rounded-full ${item.color}`}
                            style={{ width }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section
                data-aos="fade-left"
                data-aos-delay="80"
                className="rounded-[2rem] border border-madera/20 bg-white/90 p-6 shadow-xl dark:border-verde/15 dark:bg-cafe/85"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
                      Inventory watch
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold text-cafe dark:text-blanco">
                      Restock radar
                    </h2>
                  </div>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    {lowStockProducts.length} alerts
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {lowStockProducts.length > 0 ? (
                    lowStockProducts.slice(0, 5).map((product) => (
                      <div
                        key={product.id}
                        className="rounded-[1.35rem] border border-madera/15 bg-gradient-to-r from-madera/10 to-white p-4 dark:border-verde/10 dark:from-blanco/[0.03] dark:to-cafe"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-cafe dark:text-blanco">
                              {product.name}
                            </p>
                            <p className="mt-1 text-sm text-cafe/60 dark:text-blanco/60">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              product.inStock === 0
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : product.inStock <= 5
                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                            }`}
                          >
                            {product.inStock === 0
                              ? "Out of stock"
                              : `${product.inStock} left`}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-madera/20 px-5 py-8 text-center dark:border-verde/15">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300">
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="mt-4 font-semibold text-cafe dark:text-blanco">
                        Inventory is healthy
                      </p>
                      <p className="mt-2 text-sm text-cafe/60 dark:text-blanco/60">
                        No products need urgent restocking right now.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
