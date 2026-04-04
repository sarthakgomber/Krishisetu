"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const LANG_OPTIONS = [
  { code: "en", label: "EN", native: "English" },
  { code: "hi", label: "HI", native: "हिन्दी" },
  { code: "pa", label: "PA", native: "ਪੰਜਾਬੀ" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const dashboardHref = user?.role === "FARMER" ? "/farmer/dashboard" : "/buyer/dashboard";

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-leaf-900/95 backdrop-blur-md border-b border-leaf-700/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-leaf-400 rounded-lg flex items-center justify-center">
            <span className="text-leaf-900 text-sm font-bold font-display">K</span>
          </div>
          <span className="font-display text-xl font-semibold text-white">KrishiSetu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/products") ? "text-leaf-300" : "text-leaf-100/70 hover:text-white"
            }`}
          >
            {t.browse}
          </Link>

          {user ? (
            <>
              <Link href={dashboardHref} className="text-sm font-medium text-leaf-100/70 hover:text-white transition-colors">
                {t.dashboard}
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-leaf-100/70 hover:text-white transition-colors">
                {t.signOut}
              </button>
              <Link href={dashboardHref} className="text-sm bg-leaf-400 text-leaf-900 px-4 py-2 rounded-xl font-semibold hover:bg-leaf-300 transition-colors">
                {user.name?.split(" ")[0]}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-leaf-100/70 hover:text-white transition-colors">
                {t.signIn}
              </Link>
              <Link href="/register" className="text-sm bg-leaf-400 text-leaf-900 px-4 py-2 rounded-xl font-semibold hover:bg-leaf-300 transition-colors">
                {t.getStarted}
              </Link>
            </>
          )}

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-leaf-100/70 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-leaf-700/50 border border-leaf-700/60"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
              <span className="uppercase tracking-wide text-xs font-bold">{lang}</span>
              <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-warm-lg border border-[var(--border)] overflow-hidden min-w-[140px] animate-slide-up z-50">
                {LANG_OPTIONS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                      lang === l.code
                        ? "bg-leaf-50 text-leaf-700 font-semibold"
                        : "text-earth hover:bg-soil-50"
                    }`}
                  >
                    <span className="uppercase text-xs font-bold tracking-wider text-muted w-6">{l.code}</span>
                    <span>{l.native}</span>
                    {lang === l.code && (
                      <svg className="w-3.5 h-3.5 ml-auto text-leaf-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile: hamburger + lang pill */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="text-xs font-bold uppercase tracking-wider text-leaf-100/70 border border-leaf-700/60 px-2.5 py-1.5 rounded-lg hover:bg-leaf-700/50 transition-colors relative"
          >
            {lang}
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-warm-lg border border-[var(--border)] overflow-hidden min-w-[140px] z-50">
                {LANG_OPTIONS.map((l) => (
                  <button
                    key={l.code}
                    onClick={(e) => { e.stopPropagation(); setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                      lang === l.code ? "bg-leaf-50 text-leaf-700 font-semibold" : "text-earth hover:bg-soil-50"
                    }`}
                  >
                    <span className="uppercase text-xs font-bold tracking-wider text-muted w-6">{l.code}</span>
                    <span>{l.native}</span>
                    {lang === l.code && (
                      <svg className="w-3.5 h-3.5 ml-auto text-leaf-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-leaf-700/50 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-leaf-900 border-t border-leaf-700/60 px-4 py-4 flex flex-col gap-3 animate-slide-up">
          <Link href="/products" className="text-sm font-medium text-white" onClick={() => setMenuOpen(false)}>
            {t.browse}
          </Link>
          {user ? (
            <>
              <Link href={dashboardHref} className="text-sm font-medium text-white" onClick={() => setMenuOpen(false)}>
                {t.dashboard}
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-left text-leaf-100/70">
                {t.signOut}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white" onClick={() => setMenuOpen(false)}>
                {t.signIn}
              </Link>
              <Link href="/register" className="text-sm font-medium text-leaf-400" onClick={() => setMenuOpen(false)}>
                {t.getStarted}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}