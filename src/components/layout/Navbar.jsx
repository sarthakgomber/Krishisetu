"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const dashboardHref = user?.role === "FARMER" ? "/farmer/dashboard" : "/buyer/dashboard";

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="sticky top-0 z-40 bg-leaf-900/95 backdrop-blur-md border-b border-leaf-700/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-leaf-400 rounded-lg flex items-center justify-center">
            <span className="text-leaf-900 text-sm font-bold font-display">K</span>
          </div>
          <span className="font-display text-xl font-semibold text-white">KrishiSetu</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/products")
                ? "text-leaf-300"
                : "text-leaf-100/70 hover:text-white"
            }`}
          >
            Browse
          </Link>
          {user ? (
            <>
              <Link
                href={dashboardHref}
                className="text-sm font-medium text-leaf-100/70 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-leaf-100/70 hover:text-white transition-colors"
              >
                Sign out
              </button>
              <Link
                href={dashboardHref}
                className="text-sm bg-leaf-400 text-leaf-900 px-4 py-2 rounded-xl font-semibold hover:bg-leaf-300 transition-colors"
              >
                {user.name?.split(" ")[0]}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-leaf-100/70 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm bg-leaf-400 text-leaf-900 px-4 py-2 rounded-xl font-semibold hover:bg-leaf-300 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-leaf-700/50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-leaf-900 border-t border-leaf-700/60 px-4 py-4 flex flex-col gap-3 animate-slide-up">
          <Link
            href="/products"
            className="text-sm font-medium text-white"
            onClick={() => setMenuOpen(false)}
          >
            Browse Products
          </Link>
          {user ? (
            <>
              <Link
                href={dashboardHref}
                className="text-sm font-medium text-white"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-left text-leaf-100/70">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-leaf-400"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
