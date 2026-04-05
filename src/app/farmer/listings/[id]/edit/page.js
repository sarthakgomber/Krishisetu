"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import ProductForm from "@/components/products/ProductForm";
import Spinner from "@/components/ui/Spinner";

export default function EditListingPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then((data) => setProduct(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center pt-32"><Spinner size="lg" /></div>;
  if (!product) return (
    <div className="p-6">
      <div className="card p-12 text-center max-w-sm">
        <div className="text-3xl mb-3">🌾</div>
        <p className="font-display text-lg font-semibold text-earth mb-1">Product not found</p>
        <p className="text-muted text-sm">This listing may have been removed.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-2xl animate-fade-in">
      <div className="mb-8">
        <span className="text-leaf-600 text-xs font-semibold uppercase tracking-widest">Farmer</span>
        <h1 className="font-display text-3xl font-bold text-earth mt-1">Edit Listing</h1>
        <p className="text-muted text-sm mt-1">Update your listing — changes go live immediately.</p>
      </div>
      <ProductForm initial={product} productId={product.id} />
    </div>
  );
}