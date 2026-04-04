"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const LANGS = [
  {
    code: "en",
    label: "English",
    native: "English",
    flag: "🇬🇧",
    tagline: "India's Direct Farm Marketplace",
  },
  {
    code: "hi",
    label: "Hindi",
    native: "हिन्दी",
    flag: "🇮🇳",
    tagline: "भारत का सीधा फार्म बाज़ार",
  },
  {
    code: "pa",
    label: "Punjabi",
    native: "ਪੰਜਾਬੀ",
    flag: "🌾",
    tagline: "ਭਾਰਤ ਦੀ ਸਿੱਧੀ ਖੇਤੀ ਮੰਡੀ",
  },
];

export default function LanguageModal() {
  const { showModal, setLang, t } = useLanguage();
  const [selected, setSelected] = useState("en");

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-earth/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-leaf-400 via-leaf-600 to-amber-500" />

        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-leaf-600 rounded-xl flex items-center justify-center shadow-warm">
              <span className="text-white text-base font-bold font-display">K</span>
            </div>
            <span className="font-display text-xl font-semibold text-earth">KrishiSetu</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-earth mb-2">
            {t.chooseLanguage}
          </h2>
          <p className="text-sm text-muted mb-7 leading-relaxed">
            {t.chooseLanguageSub}
          </p>

          {/* Language options */}
          <div className="space-y-3 mb-8">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setSelected(l.code)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-150 text-left ${
                  selected === l.code
                    ? "border-leaf-500 bg-leaf-50 shadow-warm"
                    : "border-[var(--border)] bg-white hover:border-leaf-200 hover:bg-soil-50"
                }`}
              >
                <span className="text-2xl">{l.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-earth text-sm">{l.native}</span>
                    {l.code !== "en" && (
                      <span className="text-xs text-muted">· {l.label}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">{l.tagline}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    selected === l.code
                      ? "border-leaf-500 bg-leaf-500"
                      : "border-soil-300"
                  }`}
                >
                  {selected === l.code && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={() => setLang(selected)}
            className="w-full bg-leaf-600 text-white font-semibold py-4 rounded-2xl hover:bg-leaf-700 active:scale-[0.98] transition-all shadow-warm flex items-center justify-center gap-2"
          >
            {t.continueBtn}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}