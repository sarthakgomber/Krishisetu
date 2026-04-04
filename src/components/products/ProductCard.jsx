import Link from "next/link";
import Image from "next/image";
import MeritBadge from "@/components/merit/MeritBadge";

const CATEGORY_COLORS = {
  GRAINS: "bg-amber-50 text-amber-700",
  VEGETABLES: "bg-green-50 text-green-700",
  FRUITS: "bg-pink-50 text-pink-700",
  DAIRY: "bg-blue-50 text-blue-700",
  OTHER: "bg-soil-50 text-soil-600",
  Grains: "bg-amber-50 text-amber-700",
  Vegetables: "bg-green-50 text-green-700",
  Fruits: "bg-pink-50 text-pink-700",
  Dairy: "bg-blue-50 text-blue-700",
  Other: "bg-soil-50 text-soil-600",
};

export default function ProductCard({ product }) {
  const { id, name, category, pricePerUnit, unit, quantityAvailable, images, location } = product;
  const farmer = product.farmer || product.farmerId;
  const district = product.district || product.location?.district;
  const state = product.state || product.location?.state;

  const imageUrl = images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=75";

  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="card overflow-hidden hover:shadow-warm-lg transition-shadow duration-200">
        <div className="relative aspect-[4/3] bg-soil-50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span
            className={`absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[category] || CATEGORY_COLORS.Other}`}
          >
            {category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : ""}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-display font-semibold text-earth text-base leading-tight mb-1 group-hover:text-leaf-700 transition-colors line-clamp-1">
            {name}
          </h3>

          <p className="text-xs text-muted mb-3">
            {district && `${district}, `}{state}
          </p>

          <div className="flex items-end justify-between">
            <div>
              <span className="text-xl font-bold text-earth">₹{pricePerUnit}</span>
              <span className="text-xs text-muted ml-1">/{unit}</span>
            </div>
            <span className="text-xs text-muted">{quantityAvailable} {unit} left</span>
          </div>

          {farmer && (
            <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-muted truncate max-w-[120px]">
                {farmer?.farmName || farmer?.name}
              </span>
              <MeritBadge score={farmer?.meritScore || 0} size="sm" showScore={false} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
