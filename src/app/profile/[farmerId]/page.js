"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MeritBadge from "@/components/merit/MeritBadge";
import MeritBreakdown from "@/components/merit/MeritBreakdown";
import ProductCard from "@/components/products/ProductCard";
import StarRating from "@/components/ui/StarRating";
import Spinner from "@/components/ui/Spinner";
import { api } from "@/lib/api";

export default function FarmerProfilePage() {
  const { farmerId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/farmers/${farmerId}`)
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [farmerId]);

  if (loading) return (
    <div className="min-h-screen bg-cream flex justify-center pt-32">
      <Spinner size="lg" />
    </div>
  );
  if (!data) return (
    <div className="min-h-screen bg-cream flex justify-center items-center">
      <div className="card p-12 text-center max-w-sm">
        <div className="text-4xl mb-3">🌾</div>
        <p className="font-display text-xl font-semibold text-earth mb-1">Farmer not found</p>
        <p className="text-muted text-sm">This profile may have been removed.</p>
      </div>
    </div>
  );

  const { farmer, activeListings, recentRatings } = data;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero banner */}
      <div className="bg-earth pt-8 pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-3xl bg-leaf-400 flex items-center justify-center shrink-0 shadow-warm-lg border-4 border-leaf-300">
              <span className="font-display text-3xl font-bold text-leaf-900">{farmer.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-soil-400 text-xs font-semibold uppercase tracking-widest">Farmer Profile</span>
                  <h1 className="font-display text-3xl font-bold text-white mt-1">{farmer.farmName || farmer.name}</h1>
                  <p className="text-soil-300 mt-1 text-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {farmer.district && `${farmer.district}, `}{farmer.state}
                  </p>
                </div>
                <MeritBadge score={Math.round(farmer.meritScore || 0)} size="lg" />
              </div>
              <div className="flex flex-wrap gap-6 mt-6">
                {[
                  { value: farmer.completedOrders || 0, label: "Completed Orders", icon: "✅" },
                  { value: activeListings.length, label: "Active Listings", icon: "🌾" },
                  { value: recentRatings.length, label: "Reviews", icon: "⭐" },
                  ...(farmer.avgRating > 0 ? [{ value: farmer.avgRating.toFixed(1), label: "Avg Rating", icon: "📊" }] : []),
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-leaf-800/60 rounded-xl flex items-center justify-center text-sm border border-leaf-700/40">{s.icon}</div>
                    <div>
                      <p className="font-bold text-white text-base leading-none">{s.value}</p>
                      <p className="text-soil-400 text-xs mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {activeListings.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-earth mb-4">Active Listings</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeListings.map((product) => (
                    <ProductCard key={product.id} product={{ ...product, farmer }} />
                  ))}
                </div>
              </div>
            )}

            {recentRatings.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-earth mb-4">Reviews</h2>
                <div className="card divide-y divide-[var(--border)]">
                  {recentRatings.map((r) => (
                    <div key={r.id} className="p-5">
                      <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                        <p className="font-semibold text-earth text-sm">{r.buyer?.name}</p>
                        <div className="flex items-center gap-2">
                          <StarRating value={r.stars} readonly size="sm" />
                          <span className="text-xs text-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                      </div>
                      {r.review && <p className="text-sm text-muted leading-relaxed">{r.review}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeListings.length === 0 && recentRatings.length === 0 && (
              <div className="card p-16 text-center">
                <div className="w-16 h-16 bg-leaf-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-leaf-200">🌱</div>
                <p className="font-display text-xl font-semibold text-earth mb-1">New farmer</p>
                <p className="text-muted text-sm">No listings or reviews yet — check back soon.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <MeritBreakdown
              score={Math.round(farmer.meritScore || 0)}
              breakdown={{ avgRating: farmer.avgRating || 0, txScore: farmer.completedOrders || 0 }}
            />
            <div className="card p-5">
              <h3 className="font-display text-base font-semibold text-earth mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-leaf-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14h-.08z"/></svg>
                Contact
              </h3>
              {farmer.phone
                ? <p className="text-sm text-earth font-medium bg-soil-50 border border-[var(--border)] px-3 py-2 rounded-xl">{farmer.phone}</p>
                : <p className="text-sm text-muted italic">Chat via a product listing to get in touch.</p>
              }
              <Link href="/products" className="btn-secondary w-full text-center text-sm mt-4 block">
                Browse all produce →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}