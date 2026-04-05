"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ImageCarousel from "@/components/ui/ImageCarousel";
import MeritBadge from "@/components/merit/MeritBadge";
import StarRating from "@/components/ui/StarRating";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherListings, setOtherListings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [orderModal, setOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ quantity: 1, agreedPrice: "" });
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get(`/api/products/${id}`);
        setProduct(data);
        setOrderForm((f) => ({ ...f, agreedPrice: data.pricePerUnit }));
        const [listingsData, ratingsData] = await Promise.all([
          api.get(`/api/products/farmer/${data.farmer.id}?status=active`),
          api.get(`/api/ratings?farmerId=${data.farmer.id}`),
        ]);
        setOtherListings(listingsData.filter((p) => p.id !== id).slice(0, 3));
        setRatings(ratingsData.slice(0, 5));
      } catch { } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleOrder() {
    if (!user) { router.push("/login"); return; }
    setOrdering(true);
    setOrderError("");
    try {
      await api.post("/api/orders", {
        productId: id,
        quantity: Number(orderForm.quantity),
        agreedPrice: Number(orderForm.agreedPrice),
      });
      setOrderModal(false);
      router.push("/buyer/orders");
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setOrdering(false);
    }
  }

  const chatRoomId = user && product ? `${user.id}_${id}` : null;
  const isBuyer = user?.role === "BUYER";
  const farmer = product?.farmer;

  if (loading) return (
    <div className="min-h-screen bg-cream flex justify-center pt-32">
      <Spinner size="lg" />
    </div>
  );
  if (!product) return (
    <div className="min-h-screen bg-cream flex justify-center items-center">
      <div className="card p-12 text-center max-w-sm">
        <div className="text-4xl mb-3">🌾</div>
        <p className="font-display text-xl font-semibold text-earth mb-1">Product not found</p>
        <p className="text-muted text-sm mb-5">This listing may have been removed.</p>
        <Link href="/products" className="btn-primary text-sm">Browse all produce</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/products" className="hover:text-earth transition-colors flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            Browse
          </Link>
          <span>/</span>
          <span className="text-earth font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main product block */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <ImageCarousel images={product.images} alt={product.name} />

          <div>
            <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
              <h1 className="font-display text-3xl font-bold text-earth leading-tight">{product.name}</h1>
              <span className="shrink-0 bg-leaf-50 text-leaf-700 text-xs font-semibold px-3 py-1 rounded-full border border-leaf-200">
                {product.category?.charAt(0).toUpperCase() + product.category?.slice(1).toLowerCase()}
              </span>
            </div>

            <p className="text-muted text-sm mb-5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {product.district && `${product.district}, `}{product.state}
              {product.harvestDate && (
                <span className="ml-1 pl-1 border-l border-[var(--border)]">
                  Harvested {new Date(product.harvestDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              )}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-bold text-earth">₹{product.pricePerUnit}</span>
              <span className="text-muted text-lg">/{product.unit}</span>
            </div>

            {product.description && (
              <p className="text-sm text-muted leading-relaxed mb-6 bg-soil-50 rounded-2xl p-4 border border-[var(--border)]">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-sm mb-8 flex-wrap">
              <span className="text-muted bg-soil-50 border border-[var(--border)] px-3 py-1.5 rounded-xl">
                {product.quantityAvailable} {product.unit} available
              </span>
              <span className={`font-semibold px-3 py-1.5 rounded-xl text-xs border ${
                product.status === "active"
                  ? "bg-leaf-50 text-leaf-700 border-leaf-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}>
                {product.status === "active" ? "✓ Available" : "Sold out"}
              </span>
            </div>

            {isBuyer && product.status === "active" && (
              <div className="flex gap-3 flex-wrap">
                <Button onClick={() => setOrderModal(true)} size="lg" className="flex items-center gap-2">
                  Place Order
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Button>
                {chatRoomId && (
                  <Link href={`/buyer/chat?room=${chatRoomId}&farmer=${farmer.id}`}>
                    <Button variant="secondary" size="lg" className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      Chat with Farmer
                    </Button>
                  </Link>
                )}
              </div>
            )}
            {!user && (
              <Link href="/login">
                <Button size="lg" className="flex items-center gap-2">
                  Sign in to order
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Lower section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {ratings.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-semibold text-earth mb-5">Buyer Reviews</h2>
                <div className="divide-y divide-[var(--border)]">
                  {ratings.map((r) => (
                    <div key={r.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1.5 gap-3 flex-wrap">
                        <span className="text-sm font-semibold text-earth">{r.buyer?.name}</span>
                        <div className="flex items-center gap-2">
                          <StarRating value={r.stars} readonly size="sm" />
                          <span className="text-xs text-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                        </div>
                      </div>
                      {r.review && <p className="text-sm text-muted leading-relaxed">{r.review}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {otherListings.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-semibold text-earth mb-4">More from this farmer</h2>
                <div className="divide-y divide-[var(--border)]">
                  {otherListings.map((p) => (
                    <Link key={p.id} href={`/products/${p.id}`} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-soil-50 -mx-2 px-2 rounded-xl transition-colors group">
                      <span className="text-sm font-medium text-earth group-hover:text-leaf-700 transition-colors">{p.name}</span>
                      <span className="text-sm font-bold text-leaf-700">₹{p.pricePerUnit}/{p.unit}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Farmer card */}
          <div className="card p-5 h-fit">
            <h2 className="font-display text-lg font-semibold text-earth mb-4">About the Farmer</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-leaf-100 flex items-center justify-center border border-leaf-200 shrink-0">
                <span className="text-leaf-700 font-bold text-lg">{farmer.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-earth truncate">{farmer.farmName || farmer.name}</p>
                <p className="text-xs text-muted">{farmer.district && `${farmer.district}, `}{farmer.state}</p>
              </div>
            </div>
            <MeritBadge score={farmer.meritScore || 0} size="md" />
            <div className="mt-4 space-y-2">
              <Link href={`/profile/${farmer.id}`}>
                <Button variant="secondary" className="w-full justify-center text-sm">View Full Profile →</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <Modal open={orderModal} onClose={() => setOrderModal(false)} title="Place Order">
        <div className="space-y-4">
          <div className="bg-leaf-50 border border-leaf-200 rounded-xl p-4 text-sm">
            <p className="font-semibold text-earth">{product.name}</p>
            <p className="text-muted mt-0.5">Listed at ₹{product.pricePerUnit}/{product.unit}</p>
          </div>
          {orderError && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2">
              <span>⚠️</span> {orderError}
            </p>
          )}
          <div>
            <label className="text-sm font-medium text-earth block mb-1.5">Quantity ({product.unit})</label>
            <input type="number" min="1" max={product.quantityAvailable}
              value={orderForm.quantity}
              onChange={(e) => setOrderForm((f) => ({ ...f, quantity: e.target.value }))}
              className="input-base" />
            <p className="text-xs text-muted mt-1">Max: {product.quantityAvailable} {product.unit} available</p>
          </div>
          <div>
            <label className="text-sm font-medium text-earth block mb-1.5">Agreed Price (₹/{product.unit})</label>
            <input type="number" min="1"
              value={orderForm.agreedPrice}
              onChange={(e) => setOrderForm((f) => ({ ...f, agreedPrice: e.target.value }))}
              className="input-base" />
            <p className="text-xs text-muted mt-1">Edit if you negotiated a different price via chat</p>
          </div>
          <div className="bg-soil-50 border border-[var(--border)] rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm text-muted font-medium">Total amount</span>
            <span className="font-display font-bold text-earth text-xl">₹{(Number(orderForm.quantity) * Number(orderForm.agreedPrice)).toFixed(2)}</span>
          </div>
          <Button onClick={handleOrder} loading={ordering} className="w-full justify-center">
            Confirm Order →
          </Button>
        </div>
      </Modal>
    </div>
  );
}