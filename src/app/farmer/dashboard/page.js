"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import MeritBreakdown from "@/components/merit/MeritBreakdown";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import Spinner from "@/components/ui/Spinner";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ listings: [], orders: [], profile: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      try {
        const [listings, orders, profileData] = await Promise.all([
          api.get(`/api/products/farmer/${user.id}?status=all`),
          api.get("/api/orders"),
          api.get(`/api/farmers/${user.id}`),
        ]);
        setData({
          listings: (listings || []).slice(0, 5),
          orders: (orders || []).slice(0, 5),
          profile: profileData?.farmer || null,
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user?.id]);

  if (loading) return <div className="flex justify-center pt-32"><Spinner size="lg" /></div>;

  const activeListings = data.listings.filter((l) => l.status === "active").length;
  const pendingOrders = data.orders.filter((o) => o.status === "pending").length;

  return (
    <div className="p-6 max-w-5xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <span className="text-leaf-600 text-xs font-semibold uppercase tracking-widest">Farmer Dashboard</span>
        <h1 className="font-display text-3xl font-bold text-earth mt-1">
          Welcome, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted text-sm mt-1">{user?.farmName || "Manage your listings and orders."}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Listings", value: activeListings, href: "/farmer/listings", color: "text-leaf-600", bg: "bg-leaf-50", icon: "🌾" },
          { label: "Pending Orders", value: pendingOrders, href: "/farmer/orders", color: "text-amber-600", bg: "bg-amber-50", icon: "⏳" },
          { label: "Completed Orders", value: data.profile?.completedOrders || 0, href: "/farmer/orders", color: "text-blue-600", bg: "bg-blue-50", icon: "✅" },
          { label: "Merit Score", value: Math.round(data.profile?.meritScore || 0), href: "#merit", color: "text-soil-600", bg: "bg-soil-50", icon: "🏆" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href} className="card p-5 hover:shadow-warm-lg transition-all group">
            <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-3 text-sm`}>{stat.icon}</div>
            <p className="text-muted text-xs mb-1">{stat.label}</p>
            <p className={`font-display text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick action banner */}
      <div className="relative bg-earth rounded-3xl p-6 mb-8 overflow-hidden shadow-warm-lg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(56,152,54,0.15) 0%, transparent 60%)" }} />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-xl font-semibold text-white mb-1">List new produce</h2>
            <p className="text-soil-300 text-sm">Reach buyers across India directly. No middlemen.</p>
          </div>
          <Link href="/farmer/listings/new" className="shrink-0 bg-leaf-400 text-leaf-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-leaf-300 transition-colors text-sm whitespace-nowrap shadow-warm flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            New Listing
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Merit */}
        <div id="merit">
          <MeritBreakdown
            score={Math.round(data.profile?.meritScore || 0)}
            breakdown={{ avgRating: data.profile?.avgRating || 0, txScore: data.profile?.completedOrders || 0 }}
          />
        </div>

        {/* Recent Orders */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-earth">Recent Orders</h2>
            <Link href="/farmer/orders" className="text-xs text-leaf-600 font-medium hover:underline">View all →</Link>
          </div>
          {data.orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-sm text-muted">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {data.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm p-3 rounded-xl hover:bg-soil-50 transition-colors border border-transparent hover:border-[var(--border)]">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-earth truncate">{order.product?.name}</p>
                    <p className="text-xs text-muted">{order.buyer?.name} · ₹{order.totalAmount}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Listings */}
        <div className="card p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-semibold text-earth">My Listings</h2>
            <Link href="/farmer/listings/new" className="text-xs text-leaf-600 font-medium hover:underline flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Add new
            </Link>
          </div>
          {data.listings.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-3">🌱</div>
              <p className="text-sm text-muted mb-4">No listings yet — start selling today.</p>
              <Link href="/farmer/listings/new" className="inline-flex items-center gap-2 bg-leaf-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-leaf-700 transition-all text-sm shadow-warm">
                Create first listing
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {data.listings.map((listing) => (
                <Link key={listing.id} href={`/farmer/listings/${listing.id}/edit`} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] hover:border-leaf-300 hover:bg-leaf-50/50 transition-all group">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-earth text-sm truncate group-hover:text-leaf-700 transition-colors">{listing.name}</p>
                    <p className="text-xs text-muted">₹{listing.pricePerUnit}/{listing.unit} · {listing.quantityAvailable} left</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ml-2 shrink-0 ${
                    listing.status === "active" ? "bg-leaf-50 text-leaf-700 border-leaf-200" : "bg-soil-100 text-muted border-soil-200"
                  }`}>
                    {listing.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}