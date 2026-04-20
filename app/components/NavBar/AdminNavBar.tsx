"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "@/app/context/LoginContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.75 4.5h7.5v7.5h-7.5V4.5Zm9 0h7.5v4.5h-7.5V4.5Zm0 6h7.5v9h-7.5v-9Zm-9 3h7.5v6h-7.5v-6Z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="m20.25 7.5-8.25 4.5-8.25-4.5m16.5 0L12 3l-8.25 4.5m16.5 0v9L12 21l-8.25-4.5v-9m8.25 4.5V21"
        />
      </svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8.25 7.5h7.5M8.25 12h7.5m-7.5 4.5h4.5M6.75 3.75h10.5a2.25 2.25 0 0 1 2.25 2.25v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M18 18.75a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3m12-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-8.25 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm12 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3.75 19.5h16.5M7.5 16.5V9m4.5 7.5V4.5m4.5 12V12m4.5 4.5V7.5"
        />
      </svg>
    ),
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname.startsWith(href);
}

type SidebarContentProps = {
  isUserMenuOpen: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
  onToggleUserMenu: () => void;
  pathname: string;
  user: ReturnType<typeof useLogin>["user"];
};

function SidebarContent({
  isUserMenuOpen,
  onNavigate,
  onLogout,
  onToggleUserMenu,
  pathname,
  user,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-blanco via-madera/10 to-madera/20 px-5 py-6 dark:from-cafe dark:via-cafe dark:to-cafe/95">
      <div className="rounded-[1.75rem] border border-madera/20 bg-white/80 p-5 shadow-lg dark:border-verde/15 dark:bg-cafe/90">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cafe/55 dark:text-madera/80">
              Admin workspace
            </p>
            <Link
              href="/admin"
              onClick={onNavigate}
              className="mt-2 block font-display text-2xl font-bold leading-tight text-cafe dark:text-blanco"
            >
              Magnificently Wooden
            </Link>
          </div>
          <span className="rounded-full bg-azul px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blanco dark:bg-verde">
            Admin
          </span>
        </div>

        <Link
          href="/"
          onClick={onNavigate}
          className="mt-5 flex items-center justify-center gap-2 rounded-full border border-madera/20 px-4 py-3 text-sm font-semibold text-cafe transition-colors duration-300 hover:border-azul/40 hover:text-azul dark:border-verde/20 dark:text-blanco dark:hover:border-verde/40 dark:hover:text-verde"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M3 12 12 4.5 21 12m-2.25-.75v8.25a.75.75 0 0 1-.75.75H14.25v-5.25a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v5.25H6a.75.75 0 0 1-.75-.75V11.25"
            />
          </svg>
          View Store
        </Link>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-madera/20 bg-white/85 p-4 shadow-lg dark:border-verde/15 dark:bg-cafe/90">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-cafe/45 dark:text-blanco/45">
          Navigation
        </p>

        <nav className="mt-3 space-y-2">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-azul to-azul/85 text-blanco shadow-lg dark:from-verde dark:to-verde/85"
                    : "text-cafe hover:bg-madera/10 hover:text-azul dark:text-blanco dark:hover:bg-verde/10 dark:hover:text-verde"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-madera/10 text-cafe dark:bg-verde/10 dark:text-blanco"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {user && (
        <div className="mt-auto pt-6">
          <div className="rounded-[1.75rem] border border-madera/20 bg-white/90 p-4 shadow-lg dark:border-verde/15 dark:bg-cafe/90">
            <button
              onClick={onToggleUserMenu}
              className="flex w-full items-center gap-3 rounded-2xl bg-madera/10 px-3 py-3 text-left transition-colors duration-300 hover:bg-madera/15 dark:bg-verde/10 dark:hover:bg-verde/15"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-azul text-sm font-bold text-blanco dark:bg-verde">
                {(user.first_name || user.username).charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-cafe dark:text-blanco">
                  {user.first_name || user.username}
                </p>
                <p className="truncate text-xs text-cafe/55 dark:text-blanco/55">
                  {user.email}
                </p>
              </div>
              <svg
                className={`h-4 w-4 text-cafe transition-transform duration-300 dark:text-blanco ${
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
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 border-t border-madera/15 pt-3 dark:border-verde/15">
                    <Link
                      href="/profile"
                      onClick={() => {
                        onNavigate?.();
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-cafe transition-colors duration-300 hover:bg-madera/10 hover:text-azul dark:text-blanco dark:hover:bg-verde/10 dark:hover:text-verde"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => {
                        onNavigate?.();
                      }}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-cafe transition-colors duration-300 hover:bg-madera/10 hover:text-azul dark:text-blanco dark:hover:bg-verde/10 dark:hover:text-verde"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors duration-300 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminNavBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useLogin();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    setIsSidebarOpen(false);
    router.push("/");
  };

  return (
    <>
      <div className="lg:hidden sticky top-0 z-30 border-b border-madera/20 bg-blanco/95 px-4 py-4 shadow-sm dark:border-verde/15 dark:bg-cafe/95">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cafe/50 dark:text-madera/80">
              Admin workspace
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-cafe dark:text-blanco">
              Dashboard
            </p>
          </div>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-madera/20 bg-white text-cafe shadow-sm transition-colors duration-300 hover:border-azul/40 hover:text-azul dark:border-verde/20 dark:bg-cafe dark:text-blanco dark:hover:border-verde/40 dark:hover:text-verde"
            aria-label="Open admin navigation"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-80 border-r border-madera/20 bg-blanco shadow-xl dark:border-verde/15 dark:bg-cafe lg:block">
        <SidebarContent
          isUserMenuOpen={isUserMenuOpen}
          onLogout={handleLogout}
          onToggleUserMenu={() => setIsUserMenuOpen((prev) => !prev)}
          pathname={pathname}
          user={user}
        />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-cafe/55 lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-[19rem] max-w-[85vw] border-r border-madera/20 bg-blanco shadow-2xl dark:border-verde/15 dark:bg-cafe lg:hidden"
            >
              <SidebarContent
                isUserMenuOpen={isUserMenuOpen}
                onNavigate={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
                onToggleUserMenu={() => setIsUserMenuOpen((prev) => !prev)}
                pathname={pathname}
                user={user}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
