"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "@/app/context/LoginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useLogin();
  const router = useRouter();

  return (
    <nav className="w-full py-4 px-6 bg-blanco dark:bg-cafe shadow-md border-b-2 border-azul/20 dark:border-verde/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo & Admin Badge */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-display font-bold text-cafe dark:text-blanco"
          >
            Magnificently Wooden
          </Link>
          <span className="px-3 py-1 bg-azul dark:bg-verde text-blanco text-xs font-bold rounded-full">
            ADMIN
          </span>
        </div>

        {/* Admin Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/admin"
            className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde font-semibold transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde font-semibold transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde font-semibold transition-colors duration-300"
          >
            Orders
          </Link>
          <Link
            href="/admin/users"
            className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde font-semibold transition-colors duration-300"
          >
            Users
          </Link>
          <Link
            href="/admin/analytics"
            className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde font-semibold transition-colors duration-300"
          >
            Analytics
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {/* View Store Button */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-cafe dark:text-blanco hover:bg-madera/10 dark:hover:bg-verde/10 rounded-lg transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-sm font-medium">View Store</span>
          </Link>

          {/* Admin User Profile */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-azul/10 dark:bg-verde/10 hover:bg-azul/20 dark:hover:bg-verde/20 rounded-xl transition-all duration-300 border border-azul/30 dark:border-verde/30"
              >
                <div className="w-8 h-8 bg-azul dark:bg-verde rounded-full flex items-center justify-center">
                  <span className="text-blanco text-sm font-bold">
                    {(user.first_name || user.username).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-cafe dark:text-blanco font-semibold text-sm">
                    {user.first_name || user.username}
                  </p>
                  <p className="text-cafe/60 dark:text-blanco/60 text-xs">
                    Administrator
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-cafe dark:text-blanco transition-transform duration-300 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-blanco dark:bg-cafe rounded-xl shadow-2xl border border-madera/20 dark:border-verde/20 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-madera/20 dark:border-verde/20">
                      <p className="text-cafe dark:text-blanco font-semibold text-sm">
                        {user.first_name || user.username}
                      </p>
                      <p className="text-cafe/60 dark:text-blanco/60 text-xs">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-cafe dark:text-blanco hover:bg-madera/10 dark:hover:bg-verde/10 transition-all duration-300 text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-cafe dark:text-blanco hover:bg-madera/10 dark:hover:bg-verde/10 transition-all duration-300 text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-madera/20 dark:border-verde/20 py-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          router.push("/");
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 font-medium text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
