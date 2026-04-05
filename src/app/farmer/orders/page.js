"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import OrderCard from "@/components/orders/OrderCard";
import Spinner from "@/components/ui/Spinner";

const TABS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function FarmerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

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

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="p-6 max-w-3xl animate-fade-in">
      <div className="mb-6">
        <span className="text-leaf-600 text-xs font-semibold uppercase tracking-widest">Farmer</span>
        <h1 className="font-display text-3xl font-bold text-earth mt-1">Orders</h1>
        <p className="text-muted text-sm mt-1">Manage incoming orders from buyers.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-soil-100 rounded-xl w-fit overflow-x-auto scrollbar-hide border border-[var(--border)]">
        {TABS.map((t) => {
          const count = orders.filter((o) => o.status === t).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                tab === t ? "bg-white text-earth shadow-warm-sm" : "text-muted hover:text-earth"
              }`}
            >
              {t}
              {t !== "all" && count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  tab === t ? "bg-leaf-100 text-leaf-700" : "bg-soil-200 text-muted"
                }`}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="w-16 h-16 bg-soil-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-[var(--border)]">📦</div>
          <p className="font-display text-xl font-semibold text-earth">No {tab} orders</p>
          <p className="text-muted text-sm mt-2">Nothing to show here yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} role="farmer" onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}