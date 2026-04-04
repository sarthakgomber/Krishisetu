"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import OrderCard from "@/components/orders/OrderCard";
import Modal from "@/components/ui/Modal";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const TABS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [ratingModal, setRatingModal] = useState(null);
  const [rating, setRating] = useState({ stars: 0, review: "" });
  const [submitting, setSubmitting] = useState(false);
  const [ratedOrders, setRatedOrders] = useState(new Set());

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

  async function submitRating() {
    if (!rating.stars || !ratingModal) return;
    setSubmitting(true);
    try {
      await api.post("/api/ratings", { orderId: ratingModal.id, stars: rating.stars, review: rating.review });
      setRatedOrders((prev) => new Set([...prev, ratingModal.id]));
      setRatingModal(null);
      setRating({ stars: 0, review: "" });
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);
  const completedUnrated = orders.filter((o) => o.status === "completed" && !ratedOrders.has(o.id));

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-earth mb-6">My Orders</h1>

      {completedUnrated.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p className="text-sm font-medium text-amber-800 mb-2">⭐ Rate your recent orders</p>
          <div className="flex flex-wrap gap-2">
            {completedUnrated.slice(0, 3).map((o) => (
              <button key={o.id} onClick={() => setRatingModal(o)} className="text-xs bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Rate: {o.product?.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-1 mb-6 p-1 bg-soil-100 rounded-xl w-fit overflow-x-auto scrollbar-hide">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${tab === t ? "bg-white text-earth shadow-warm-sm" : "text-muted hover:text-earth"}`}>{t}</button>
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
            <div key={order.id}>
              <OrderCard order={order} role="buyer" onStatusChange={handleStatusChange} />
              {order.status === "completed" && !ratedOrders.has(order.id) && (
                <button onClick={() => setRatingModal(order)} className="text-xs text-leaf-600 hover:underline ml-1 mt-1 block">
                  Leave a rating for this order
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal open={!!ratingModal} onClose={() => setRatingModal(null)} title="Rate this farmer">
        {ratingModal && (
          <div className="space-y-4">
            <div className="bg-soil-50 rounded-xl p-4">
              <p className="font-medium text-earth text-sm">{ratingModal.product?.name}</p>
              <p className="text-xs text-muted">From {ratingModal.farmer?.farmName || ratingModal.farmer?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-earth mb-2">Your rating</p>
              <StarRating value={rating.stars} onChange={(s) => setRating((r) => ({ ...r, stars: s }))} size="lg" />
            </div>
            <div>
              <label className="text-sm font-medium text-earth block mb-1.5">Review (optional)</label>
              <textarea value={rating.review} onChange={(e) => setRating((r) => ({ ...r, review: e.target.value }))} rows={3} placeholder="Share your experience..." className="input-base resize-none text-sm" />
            </div>
            <Button onClick={submitRating} loading={submitting} disabled={!rating.stars} className="w-full justify-center">Submit Rating</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
