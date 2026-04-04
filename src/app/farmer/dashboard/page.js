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
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-earth">Good morning, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted text-sm mt-1">{user?.farmName}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Listings", value: activeListings, href: "/farmer/listings", color: "text-leaf-600" },
          { label: "Pending Orders", value: pendingOrders, href: "/farmer/orders", color: "text-amber-600" },
          { label: "Completed Orders", value: data.profile?.completedOrders || 0, href: "/farmer/orders", color: "text-blue-600" },
          { label: "Merit Score", value: Math.round(data.profile?.meritScore || 0), href: "#merit", color: "text-soil-600" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href} className="card p-5 hover:shadow-warm-lg transition-shadow">
            <p className="text-muted text-xs mb-1">{stat.label}</p>
            <p className={`font-display text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div id="merit">
          <MeritBreakdown
            score={Math.round(data.profile?.meritScore || 0)}
            breakdown={{ avgRating: data.profile?.avgRating || 0, txScore: data.profile?.completedOrders || 0 }}
          />
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-earth">Recent Orders</h2>
            <Link href="/farmer/orders" className="text-xs text-leaf-600 hover:underline">View all</Link>
          </div>
          {data.orders.length === 0 ? (
            <p className="text-sm text-muted text-center py-6">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {data.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-earth">{order.product?.name}</p>
                    <p className="text-xs text-muted">{order.buyer?.name} · ₹{order.totalAmount}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-earth">My Listings</h2>
            <Link href="/farmer/listings/new" className="text-xs text-leaf-600 hover:underline">+ Add new</Link>
          </div>
          {data.listings.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted mb-3">No listings yet</p>
              <Link href="/farmer/listings/new" className="btn-primary text-sm">Create first listing</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {data.listings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-earth">{listing.name}</p>
                    <p className="text-xs text-muted">₹{listing.pricePerUnit}/{listing.unit} · {listing.quantityAvailable} left</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${listing.status === "active" ? "bg-leaf-50 text-leaf-700" : "bg-soil-100 text-muted"}`}>
                    {listing.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
