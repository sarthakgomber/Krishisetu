"use client";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { api } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "", category: "", state: "",
    minPrice: "", maxPrice: "", minMerit: 0, page: 1,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      const data = await api.get(`/api/products?${params}`);
      setProducts(data.data);
      setPagination(data.pagination);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, filters.search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchProducts, filters.search]);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-earth">Browse Produce</h1>
            {pagination && <p className="text-muted text-sm mt-1">{pagination.total} listings available</p>}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search produce..." value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))} className="input-base pl-9 text-sm" />
            </div>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden btn-secondary flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
              Filters
            </button>
          </div>
        </div>
        <div className="flex gap-8">
          <aside className={`w-60 shrink-0 ${filtersOpen ? "block" : "hidden"} lg:block`}>
            <div className="card p-5 sticky top-24">
              <h2 className="font-semibold text-earth mb-4 text-sm">Filters</h2>
              <ProductFilters filters={filters} onChange={setFilters} />
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <ProductGrid products={products} loading={loading} pagination={pagination} onPageChange={(page) => setFilters((f) => ({ ...f, page }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
