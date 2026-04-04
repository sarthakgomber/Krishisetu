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
    <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-leaf-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold font-display">K</span>
          </div>
          <span className="font-display text-xl font-semibold text-earth">KrishiSetu</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/products" className={`text-sm font-medium transition-colors ${pathname.startsWith("/products") ? "text-leaf-600" : "text-muted hover:text-earth"}`}>Browse</Link>
          {user ? (
            <>
              <Link href={dashboardHref} className="text-sm font-medium text-muted hover:text-earth transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="text-sm font-medium text-muted hover:text-earth transition-colors">Sign out</button>
              <Link href={dashboardHref} className="text-sm bg-leaf-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-leaf-700 transition-colors">{user.name?.split(" ")[0]}</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted hover:text-earth transition-colors">Sign in</Link>
              <Link href="/register" className="text-sm bg-leaf-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-leaf-700 transition-colors">Get started</Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2 rounded-lg hover:bg-soil-50" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-5 h-5 text-earth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3 animate-slide-up">
          <Link href="/products" className="text-sm font-medium text-earth" onClick={() => setMenuOpen(false)}>Browse Products</Link>
          {user ? (
            <>
              <Link href={dashboardHref} className="text-sm font-medium text-earth" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="text-sm font-medium text-left text-muted">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-earth" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link href="/register" className="text-sm font-medium text-leaf-600" onClick={() => setMenuOpen(false)}>Get started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
