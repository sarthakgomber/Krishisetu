import Link from "next/link";
import Image from "next/image";
import MeritBadge from "@/components/merit/MeritBadge";

const CATEGORY_COLORS = {
  GRAINS: "bg-amber-50 text-amber-700 border-amber-100",
  VEGETABLES: "bg-green-50 text-green-700 border-green-100",
  FRUITS: "bg-pink-50 text-pink-700 border-pink-100",
  DAIRY: "bg-blue-50 text-blue-700 border-blue-100",
  OTHER: "bg-soil-50 text-soil-600 border-soil-100",
  Grains: "bg-amber-50 text-amber-700 border-amber-100",
  Vegetables: "bg-green-50 text-green-700 border-green-100",
  Fruits: "bg-pink-50 text-pink-700 border-pink-100",
  Dairy: "bg-blue-50 text-blue-700 border-blue-100",
  Other: "bg-soil-50 text-soil-600 border-soil-100",
};

const CATEGORY_EMOJI = {
  GRAINS: "🌾", Grains: "🌾",
  VEGETABLES: "🥬", Vegetables: "🥬",
  FRUITS: "🍎", Fruits: "🍎",
  DAIRY: "🥛", Dairy: "🥛",
  OTHER: "📦", Other: "📦",
};

export default function ProductCard({ product }) {
  const { id, name, category, pricePerUnit, unit, quantityAvailable, images } = product;
  const farmer = product.farmer || product.farmerId;
  const district = product.district || product.location?.district;
  const state = product.state || product.location?.state;

  const imageUrl = images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=75";
  const categoryColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  const categoryEmoji = CATEGORY_EMOJI[category] || "📦";
  const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : "";

  const isLowStock = quantityAvailable <= 10;

  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="card overflow-hidden hover:shadow-warm-lg transition-all duration-200 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-soil-50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${categoryColor}`}>
              <span>{categoryEmoji}</span>
              {categoryLabel}
            </span>
          </div>

          {/* Low stock warning */}
          {isLowStock && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold px-2 py-1 bg-red-500 text-white rounded-full shadow-warm-sm">
                Low stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-earth text-base leading-tight mb-1 group-hover:text-leaf-700 transition-colors line-clamp-1">
            {name}
          </h3>

          {(district || state) && (
            <p className="text-xs text-muted mb-3 flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {district && `${district}, `}{state}
            </p>
          )}

          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-earth">₹{pricePerUnit}</span>
              <span className="text-xs text-muted ml-1">/{unit}</span>
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-lg border ${isLowStock ? "text-red-600 bg-red-50 border-red-100" : "text-muted bg-soil-50 border-[var(--border)]"}`}>
              {quantityAvailable} {unit} left
            </span>
          </div>

          {farmer && (
            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-leaf-100 border border-leaf-200 flex items-center justify-center shrink-0">
                  <span className="text-leaf-700 text-[9px] font-bold">
                    {(farmer?.farmName || farmer?.name)?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-muted truncate">
                  {farmer?.farmName || farmer?.name}
                </span>
              </div>
              <MeritBadge score={farmer?.meritScore || 0} size="sm" showScore={false} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}