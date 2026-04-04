import ProductCard from "./ProductCard";
import Spinner from "@/components/ui/Spinner";

export default function ProductGrid({ products, loading, pagination, onPageChange }) {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🌾</div>
        <h3 className="font-display text-xl font-semibold text-earth mb-2">No listings found</h3>
        <p className="text-muted text-sm">Try adjusting your filters or search term.</p>
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

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium text-earth disabled:opacity-40 hover:bg-soil-50 transition-colors"
          >
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
                  <span key={`ellipsis-${i}`} className="px-2 py-2 text-muted text-sm">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => onPageChange(item)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                      item === pagination.page
                        ? "bg-leaf-600 text-white"
                        : "text-earth hover:bg-soil-50 border border-[var(--border)]"
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
            className="px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium text-earth disabled:opacity-40 hover:bg-soil-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
