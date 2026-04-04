"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
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

  if (loading) return <div className="min-h-screen bg-cream"><Navbar /><div className="flex justify-center pt-32"><Spinner size="lg" /></div></div>;
  if (!data) return <div className="min-h-screen bg-cream"><Navbar /><div className="text-center pt-32 text-muted">Farmer not found.</div></div>;

  const { farmer, activeListings, recentRatings } = data;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="card p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl bg-leaf-100 flex items-center justify-center shrink-0">
              <span className="font-display text-3xl font-bold text-leaf-700">{farmer.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-display text-3xl font-bold text-earth">{farmer.farmName || farmer.name}</h1>
                  <p className="text-muted mt-1">{farmer.district && `${farmer.district}, `}{farmer.state}</p>
                </div>
                <MeritBadge score={Math.round(farmer.meritScore || 0)} size="lg" />
              </div>
              <div className="flex flex-wrap gap-6 mt-5 text-sm">
                {[
                  { value: farmer.completedOrders || 0, label: "Completed Orders" },
                  { value: activeListings.length, label: "Active Listings" },
                  { value: recentRatings.length, label: "Reviews" },
                  ...(farmer.avgRating > 0 ? [{ value: farmer.avgRating.toFixed(1), label: "Avg Rating" }] : []),
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-bold text-earth text-xl">{s.value}</p>
                    <p className="text-muted text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeListings.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-earth mb-4">Active Listings</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeListings.map((product) => (
                    <ProductCard key={product.id} product={{ ...product, farmerId: farmer }} />
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
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-earth text-sm">{r.buyer?.name}</p>
                        <div className="flex items-center gap-2">
                          <StarRating value={r.stars} readonly size="sm" />
                          <span className="text-xs text-muted">{new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
                        </div>
                      </div>
                      {r.review && <p className="text-sm text-muted leading-relaxed">{r.review}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeListings.length === 0 && recentRatings.length === 0 && (
              <div className="card p-12 text-center">
                <div className="text-5xl mb-3">🌱</div>
                <p className="font-display text-xl font-semibold text-earth mb-1">New farmer</p>
                <p className="text-muted text-sm">No listings or reviews yet.</p>
              </div>
            )}
          </div>
          <div>
            <MeritBreakdown
              score={Math.round(farmer.meritScore || 0)}
              breakdown={{ avgRating: farmer.avgRating || 0, txScore: farmer.completedOrders || 0 }}
            />
            <div className="card p-5 mt-4">
              <h3 className="font-semibold text-earth text-sm mb-3">Contact</h3>
              {farmer.phone ? <p className="text-sm text-muted">{farmer.phone}</p> : <p className="text-sm text-muted italic">Chat to get in touch.</p>}
              <Link href="/products" className="btn-secondary w-full text-center text-sm mt-4 block">Browse all produce</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
