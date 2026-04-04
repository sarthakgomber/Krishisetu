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
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-earth">Welcome, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-muted text-sm mt-1">Find fresh produce directly from farmers.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Confirmed", value: stats.confirmed, color: "text-blue-600" },
          { label: "Completed", value: stats.completed, color: "text-leaf-600" },
          { label: "Total Orders", value: orders.length, color: "text-earth" },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-muted text-xs mb-1">{s.label}</p>
            <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-6 mb-6 bg-leaf-600 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold mb-1">Browse fresh produce</h2>
            <p className="text-leaf-200 text-sm">Directly from farms across India. No middlemen.</p>
          </div>
          <Link href="/products" className="shrink-0 bg-white text-leaf-700 font-medium px-5 py-2.5 rounded-xl hover:bg-leaf-50 transition-colors text-sm">Browse now →</Link>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-earth">Recent Orders</h2>
          <Link href="/buyer/orders" className="text-xs text-leaf-600 hover:underline">View all</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : orders.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-3">🛒</div>
            <p className="font-display text-lg font-semibold text-earth mb-1">No orders yet</p>
            <p className="text-muted text-sm mb-4">Start by browsing produce from farmers near you.</p>
            <Link href="/products" className="btn-primary inline-block">Browse Produce</Link>
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
