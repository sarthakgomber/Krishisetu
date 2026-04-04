"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import OrderCard from "@/components/orders/OrderCard";
import Spinner from "@/components/ui/Spinner";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/orders")
      .then((d) => setOrders(d || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(orderId, status) {
    const updated = await api.patch(`/api/orders/${orderId}`, { status });
    setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
  }

  const stats = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="p-6 max-w-4xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <span className="text-leaf-600 text-xs font-semibold uppercase tracking-widest">Buyer Dashboard</span>
        <h1 className="font-display text-3xl font-bold text-earth mt-1">
          Welcome, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted text-sm mt-1">Find fresh produce directly from farmers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pending", value: stats.pending, color: "text-amber-600", bg: "bg-amber-50", icon: "⏳" },
          { label: "Confirmed", value: stats.confirmed, color: "text-blue-600", bg: "bg-blue-50", icon: "✅" },
          { label: "Completed", value: stats.completed, color: "text-leaf-600", bg: "bg-leaf-50", icon: "🎉" },
          { label: "Total Orders", value: orders.length, color: "text-earth", bg: "bg-soil-50", icon: "📦" },
        ].map((s) => (
          <div key={s.label} className="card p-5 hover:shadow-warm-lg transition-shadow">
            <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center mb-3 text-sm`}>{s.icon}</div>
            <p className="text-muted text-xs mb-1">{s.label}</p>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Browse CTA banner */}
      <div className="relative bg-leaf-700 rounded-3xl p-6 mb-8 overflow-hidden border-0 shadow-warm-lg">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(56,152,54,0.3) 0%, transparent 60%)" }} />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-white mb-1">Browse fresh produce</h2>
            <p className="text-leaf-200 text-sm">Directly from farms across India. No middlemen.</p>
          </div>
          <Link href="/products" className="shrink-0 bg-leaf-400 text-leaf-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-leaf-300 transition-colors text-sm whitespace-nowrap shadow-warm">
            Browse now →
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-earth">Recent Orders</h2>
          <Link href="/buyer/orders" className="text-xs text-leaf-600 font-medium hover:underline">View all →</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : orders.length === 0 ? (
          <div className="card p-10 text-center">
            <div className="w-16 h-16 bg-soil-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🛒</div>
            <p className="font-display text-lg font-semibold text-earth mb-1">No orders yet</p>
            <p className="text-muted text-sm mb-6">Start by browsing produce from farmers near you.</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-leaf-600 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-leaf-700 transition-all text-sm shadow-warm">
              Browse Produce
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <OrderCard key={order.id} order={order} role="buyer" onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}