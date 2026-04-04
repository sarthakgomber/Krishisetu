"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
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
      } catch {
        /* handled below */
      } finally {
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

  if (loading) return <div className="min-h-screen bg-cream"><Navbar /><div className="flex justify-center pt-32"><Spinner size="lg" /></div></div>;
  if (!product) return <div className="min-h-screen bg-cream"><Navbar /><div className="text-center pt-32 text-muted">Product not found.</div></div>;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/products" className="hover:text-earth">Browse</Link>
          <span>/</span>
          <span className="text-earth">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <ImageCarousel images={product.images} alt={product.name} />
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h1 className="font-display text-3xl font-bold text-earth leading-tight">{product.name}</h1>
              <span className="shrink-0 bg-leaf-50 text-leaf-700 text-xs font-medium px-2.5 py-1 rounded-full border border-leaf-200">{product.category}</span>
            </div>
            <p className="text-muted text-sm mb-5">
              {product.district && `${product.district}, `}{product.state}
              {product.harvestDate && ` · Harvested ${new Date(product.harvestDate).toLocaleDateString("en-IN")}`}
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-bold text-earth">₹{product.pricePerUnit}</span>
              <span className="text-muted">/{product.unit}</span>
            </div>
            {product.description && <p className="text-sm text-muted leading-relaxed mb-6 bg-soil-50 rounded-xl p-4">{product.description}</p>}
            <div className="flex items-center gap-4 text-sm text-muted mb-8">
              <span>{product.quantityAvailable} {product.unit} available</span>
              <span className={`font-medium ${product.status === "active" ? "text-leaf-600" : "text-red-500"}`}>{product.status === "active" ? "Available" : "Sold out"}</span>
            </div>
            {isBuyer && product.status === "active" && (
              <div className="flex gap-3">
                <Button onClick={() => setOrderModal(true)} size="lg">Place Order</Button>
                {chatRoomId && (
                  <Link href={`/buyer/chat?room=${chatRoomId}&farmer=${farmer.id}`}>
                    <Button variant="secondary" size="lg">Chat with Farmer</Button>
                  </Link>
                )}
              </div>
            )}
            {!user && <Link href="/login"><Button size="lg">Sign in to order</Button></Link>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {ratings.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-semibold text-earth mb-4">Buyer Reviews</h2>
                <div className="space-y-4">
                  {ratings.map((r) => (
                    <div key={r.id} className="pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-earth">{r.buyer?.name}</span>
                        <StarRating value={r.stars} readonly size="sm" />
                      </div>
                      {r.review && <p className="text-sm text-muted">{r.review}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {otherListings.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-semibold text-earth mb-4">More from this farmer</h2>
                <div className="space-y-3">
                  {otherListings.map((p) => (
                    <Link key={p.id} href={`/products/${p.id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-soil-50 transition-colors">
                      <span className="text-sm font-medium text-earth">{p.name}</span>
                      <span className="text-sm text-muted">₹{p.pricePerUnit}/{p.unit}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="card p-5">
            <h2 className="font-display text-lg font-semibold text-earth mb-4">About the Farmer</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-leaf-100 flex items-center justify-center">
                <span className="text-leaf-700 font-bold text-lg">{farmer.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <div>
                <p className="font-medium text-earth">{farmer.farmName || farmer.name}</p>
                <p className="text-xs text-muted">{farmer.district && `${farmer.district}, `}{farmer.state}</p>
              </div>
            </div>
            <MeritBadge score={farmer.meritScore || 0} size="md" />
            <div className="mt-4">
              <Link href={`/profile/${farmer.id}`}>
                <Button variant="secondary" className="w-full justify-center text-sm">View Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal open={orderModal} onClose={() => setOrderModal(false)} title="Place Order">
        <div className="space-y-4">
          <div className="bg-soil-50 rounded-xl p-4 text-sm">
            <p className="font-medium text-earth">{product.name}</p>
            <p className="text-muted">Listed at ₹{product.pricePerUnit}/{product.unit}</p>
          </div>
          {orderError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200">{orderError}</p>}
          <div>
            <label className="text-sm font-medium text-earth block mb-1.5">Quantity</label>
            <input type="number" min="1" max={product.quantityAvailable} value={orderForm.quantity} onChange={(e) => setOrderForm((f) => ({ ...f, quantity: e.target.value }))} className="input-base" />
            <p className="text-xs text-muted mt-1">Max: {product.quantityAvailable} {product.unit}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-earth block mb-1.5">Agreed Price (₹)</label>
            <input type="number" min="1" value={orderForm.agreedPrice} onChange={(e) => setOrderForm((f) => ({ ...f, agreedPrice: e.target.value }))} className="input-base" />
            <p className="text-xs text-muted mt-1">Edit if you negotiated a different price in chat</p>
          </div>
          <div className="bg-leaf-50 rounded-xl p-3 text-sm">
            <span className="text-muted">Total: </span>
            <span className="font-bold text-earth">₹{(orderForm.quantity * orderForm.agreedPrice).toFixed(2)}</span>
          </div>
          <Button onClick={handleOrder} loading={ordering} className="w-full justify-center">Confirm Order</Button>
        </div>
      </Modal>
    </div>
  );
}
