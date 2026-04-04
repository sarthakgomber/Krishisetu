"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import clsx from "clsx";

const links = [
  {
    href: "/buyer/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/products",
    label: "Browse",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    href: "/buyer/orders",
    label: "My Orders",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    href: "/buyer/chat",
    label: "Messages",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function BuyerSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[var(--border)] min-h-screen flex flex-col shadow-warm-sm">
      {/* Brand + user */}
      <div className="p-5 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
          <div className="w-8 h-8 bg-leaf-600 rounded-xl flex items-center justify-center shadow-warm group-hover:bg-leaf-700 transition-colors">
            <span className="text-white text-sm font-bold font-display">K</span>
          </div>
          <span className="font-display text-lg font-semibold text-earth">KrishiSetu</span>
        </Link>

        <div className="flex items-center gap-3 bg-soil-50 border border-[var(--border)] rounded-2xl px-3 py-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-soil-200 to-soil-300 flex items-center justify-center shrink-0 border-2 border-white shadow-warm-sm">
            <span className="text-soil-700 font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-earth truncate">{user?.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span className="text-xs text-muted">Buyer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-widest px-3 py-2">Navigation</p>
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/products" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-soil-100 text-earth shadow-warm-sm border border-soil-200/60"
                  : "text-muted hover:text-earth hover:bg-soil-50"
              )}
            >
              <span className={active ? "text-soil-600" : "text-muted"}>{link.icon}</span>
              {link.label}
              {active && <div className="ml-auto w-1.5 h-1.5 bg-soil-500 rounded-full" />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-[var(--border)]">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-600 hover:bg-red-50 transition-all duration-150 group"
        >
          <svg className="w-4.5 h-4.5 group-hover:text-red-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
}