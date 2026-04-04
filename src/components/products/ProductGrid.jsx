import ProductCard from "./ProductCard";
import Spinner from "@/components/ui/Spinner";

export default function ProductGrid({ products, loading, pagination, onPageChange }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-muted animate-pulse">Finding fresh produce…</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 bg-soil-50 border-2 border-soil-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5">
          🌾
        </div>
        <h3 className="font-display text-xl font-semibold text-earth mb-2">No listings found</h3>
        <p className="text-muted text-sm max-w-xs mx-auto leading-relaxed">
          Try adjusting your filters or search term. Farmers are adding new listings daily.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium text-earth disabled:opacity-40 hover:bg-soil-50 hover:border-soil-300 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - pagination.page) <= 2 || p === 1 || p === pagination.pages)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((item, i) =>
                item === "..." ? (
                  <span key={`ellipsis-${i}`} className="flex items-center px-2 text-muted text-sm">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => onPageChange(item)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                      item === pagination.page
                        ? "bg-leaf-600 text-white shadow-warm"
                        : "text-earth hover:bg-soil-50 border border-[var(--border)] hover:border-soil-300"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
          </div>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium text-earth disabled:opacity-40 hover:bg-soil-50 hover:border-soil-300 transition-all"
          >
            Next
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}