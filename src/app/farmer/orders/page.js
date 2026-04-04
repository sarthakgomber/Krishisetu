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
    <div className="p-6 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-earth mb-6">Orders</h1>

      <div className="flex gap-1 mb-6 p-1 bg-soil-100 rounded-xl w-fit overflow-x-auto scrollbar-hide">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${tab === t ? "bg-white text-earth shadow-warm-sm" : "text-muted hover:text-earth"}`}>
            {t}
            {t !== "all" && orders.filter((o) => o.status === t).length > 0 && (
              <span className="ml-1.5 text-xs opacity-60">{orders.filter((o) => o.status === t).length}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-3">📦</div>
          <p className="font-display text-xl font-semibold text-earth">No {tab} orders</p>
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
