"use client";

const CATEGORIES = ["Grains", "Vegetables", "Fruits", "Dairy", "Other"];
const CATEGORY_EMOJI = { Grains: "🌾", Vegetables: "🥬", Fruits: "🍎", Dairy: "🥛", Other: "📦" };
const STATES = [
  "Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Karnataka",
  "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "West Bengal",
];

export default function ProductFilters({ filters, onChange }) {
  const update = (key, value) => {
    const finalValue = key === "category" && value ? value.toUpperCase() : value;
    onChange({ ...filters, [key]: finalValue, page: 1 });
  };

  const hasActiveFilters = filters.category || filters.state || filters.minPrice || filters.maxPrice || filters.minMerit > 0;

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-semibold text-earth">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ page: 1, category: "", state: "", minPrice: "", maxPrice: "", minMerit: 0 })}
            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-4 shadow-warm-sm">
        <h4 className="text-xs font-semibold text-earth uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.toUpperCase() || filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => update("category", isActive ? "" : cat)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 text-left ${
                  isActive
                    ? "bg-leaf-50 text-leaf-700 font-semibold border border-leaf-200"
                    : "text-earth hover:bg-soil-50"
                }`}
              >
                <span className="text-base">{CATEGORY_EMOJI[cat]}</span>
                {cat}
                {isActive && (
                  <svg className="ml-auto w-3.5 h-3.5 text-leaf-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* State */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-4 shadow-warm-sm">
        <h4 className="text-xs font-semibold text-earth uppercase tracking-wider mb-3">State</h4>
        <select
          value={filters.state || ""}
          onChange={(e) => update("state", e.target.value)}
          className="input-base text-sm"
        >
          <option value="">All states</option>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-4 shadow-warm-sm">
        <h4 className="text-xs font-semibold text-earth uppercase tracking-wider mb-3">Price Range (₹/unit)</h4>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => update("minPrice", e.target.value)}
            className="input-base text-sm w-full"
            min="0"
          />
          <span className="text-muted text-sm shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="input-base text-sm w-full"
            min="0"
          />
        </div>
      </div>

      {/* Merit Score */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-4 shadow-warm-sm">
        <h4 className="text-xs font-semibold text-earth uppercase tracking-wider mb-3">Min Merit Score</h4>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={filters.minMerit || 0}
          onChange={(e) => update("minMerit", e.target.value)}
          className="w-full accent-leaf-600"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted">Any</span>
          <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg border ${
            (filters.minMerit || 0) >= 80 ? "text-amber-700 bg-amber-50 border-amber-200" :
            (filters.minMerit || 0) >= 60 ? "text-slate-700 bg-slate-50 border-slate-200" :
            (filters.minMerit || 0) >= 40 ? "text-orange-700 bg-orange-50 border-orange-200" :
            "text-earth bg-soil-50 border-soil-200"
          }`}>
            {filters.minMerit || 0}+
          </span>
          <span className="text-xs text-muted">100</span>
        </div>
      </div>
    </div>
  );
}