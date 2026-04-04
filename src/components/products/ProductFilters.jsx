"use client";

const CATEGORIES = ["Grains", "Vegetables", "Fruits", "Dairy", "Other"];
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-earth mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={() => update("category", filters.category === cat ? "" : cat)}
                className="accent-leaf-600"
              />
              <span className="text-sm text-earth group-hover:text-leaf-700 transition-colors">{cat}</span>
            </label>
          ))}
          {filters.category && (
            <button
              onClick={() => update("category", "")}
              className="text-xs text-leaf-600 hover:underline mt-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-5">
        <h3 className="text-sm font-semibold text-earth mb-3">State</h3>
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

      <div className="border-t border-[var(--border)] pt-5">
        <h3 className="text-sm font-semibold text-earth mb-3">Price Range (₹)</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => update("minPrice", e.target.value)}
            className="input-base text-sm w-full"
            min="0"
          />
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

      <div className="border-t border-[var(--border)] pt-5">
        <h3 className="text-sm font-semibold text-earth mb-3">Min Merit Score</h3>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={filters.minMerit || 0}
          onChange={(e) => update("minMerit", e.target.value)}
          className="w-full accent-leaf-600"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>0</span>
          <span className="text-earth font-medium">{filters.minMerit || 0}+</span>
          <span>100</span>
        </div>
      </div>

      <button
        onClick={() => onChange({ page: 1, category: "", state: "", minPrice: "", maxPrice: "", minMerit: 0 })}
        className="w-full text-sm text-muted hover:text-earth transition-colors"
      >
        Reset all filters
      </button>
    </div>
  );
}
