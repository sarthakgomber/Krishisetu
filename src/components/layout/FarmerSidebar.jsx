"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import clsx from "clsx";

const links = [
  {
    href: "/farmer/dashboard",
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
    href: "/farmer/listings",
    label: "My Listings",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    href: "/farmer/listings/new",
    label: "New Listing",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    accent: true,
  },
  {
    href: "/farmer/orders",
    label: "Orders",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    href: "/farmer/chat",
    label: "Messages",
    icon: (
      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function FarmerSidebar() {
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

        <div className="flex items-center gap-3 bg-leaf-50 border border-leaf-100 rounded-2xl px-3 py-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-leaf-200 to-leaf-300 flex items-center justify-center shrink-0 border-2 border-white shadow-warm-sm">
            <span className="text-leaf-800 font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-earth truncate">{user?.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full" />
              <span className="text-xs text-muted truncate">{user?.farmName || "Farmer"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-widest px-3 py-2">Navigation</p>
        {links.map((link) => {
          const active =
            link.href === "/farmer/dashboard"
              ? pathname === link.href
              : pathname.startsWith(link.href);

          if (link.accent) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 bg-leaf-600 text-white hover:bg-leaf-700 shadow-warm my-1"
              >
                {link.icon}
                {link.label}
                <svg className="ml-auto w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-leaf-50 text-leaf-700 border border-leaf-100 shadow-warm-sm"
                  : "text-muted hover:text-earth hover:bg-soil-50"
              )}
            >
              <span className={active ? "text-leaf-600" : "text-muted"}>{link.icon}</span>
              {link.label}
              {active && <div className="ml-auto w-1.5 h-1.5 bg-leaf-500 rounded-full" />}
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