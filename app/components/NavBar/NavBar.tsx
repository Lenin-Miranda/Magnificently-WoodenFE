"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { useLogin } from "@/app/context/LoginContext";
import Link from "next/link";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, isCartItems } = useCart();
  const { user, logout } = useLogin();

  return (
    <>
      <nav className="w-full py-6 px-4 md:px-6 bg-blanco dark:bg-cafe shadow-sm border-b border-madera/20 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-display font-bold text-cafe dark:text-blanco tracking-tight">
          <a href="/" className="">
            Magnificently Wooden
          </a>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <button
            onClick={toggleCart}
            className="relative text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde transition-all duration-300 ease-in-out hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-azul dark:bg-verde text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex space-x-12 font-sans font-medium text-base">
            <li className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 ease-in-out hover:scale-110">
              Home
            </li>
            <li className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 ease-in-out hover:scale-110">
              About
            </li>
            <li className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 ease-in-out hover:scale-110">
              <Link href="/products">Products</Link>
            </li>
            <li className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 ease-in-out hover:scale-110">
              Services
            </li>
            <li className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 ease-in-out hover:scale-110">
              Contact
            </li>
          </ul>

          {/* Auth Buttons - Desktop */}
          {!user && (
            <div className="flex items-center gap-3 border-r border-madera/40 pr-4">
              <Link
                href="/login"
                className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 font-medium"
              >
                Login
              </Link>
              <button className="bg-azul dark:bg-verde text-blanco px-4 py-2 rounded-full hover:bg-azul/90 dark:hover:bg-verde/90 transition-all duration-300 font-medium">
                Sign Up
              </button>
            </div>
          )}

          {/* User Menu - Desktop (when logged in) */}
          {user && (
            <div className="flex items-center gap-3 border-r border-madera/40 pr-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-azul dark:bg-verde rounded-full flex items-center justify-center">
                  <span className="text-blanco text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-cafe dark:text-blanco font-medium">
                  {user.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-cafe/70 dark:text-blanco/70 hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 text-sm"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={toggleCart}
            className="relative border-l border-madera/40 p-4 text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde transition-all duration-300 ease-in-out hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-azul dark:bg-verde text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {isCartItems.length}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-cafe/80 dark:bg-azul/80 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-full w-3/4 max-w-sm bg-blanco dark:bg-cafe shadow-2xl z-50 p-8"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mt-16">
                <h3 className="text-2xl font-display font-bold text-cafe dark:text-madera mb-8">
                  Menu
                </h3>
                <ul className="space-y-6 font-sans font-medium text-lg">
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2"
                  >
                    Home
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2"
                  >
                    About
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2"
                  >
                    <Link href="/products">Products</Link>
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2"
                  >
                    Services
                  </li>
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2"
                  >
                    Contact
                  </li>
                </ul>

                {/* Auth Section - Mobile */}
                <div className="mt-8 pt-6 border-t border-madera/20 dark:border-verde/20">
                  {!user ? (
                    <div className="space-y-4">
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-left text-cafe dark:text-blanco hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2 font-medium text-lg"
                      >
                        Login
                      </Link>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full bg-azul dark:bg-verde text-blanco px-4 py-3 rounded-full hover:bg-azul/90 dark:hover:bg-verde/90 transition-all duration-300 font-medium text-center"
                      >
                        Sign Up
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-azul dark:bg-verde rounded-full flex items-center justify-center">
                          <span className="text-blanco font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-cafe dark:text-blanco font-medium text-lg">
                          Welcome, {user.name}!
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="text-cafe/70 dark:text-blanco/70 hover:text-azul dark:hover:text-verde cursor-pointer transition-all duration-300 hover:translate-x-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
