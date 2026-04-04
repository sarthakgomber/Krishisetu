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
  if (!product) return <div className="p-6 text-muted">Product not found.</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-earth mb-2">Edit Listing</h1>
      <p className="text-muted text-sm mb-8">Update your listing details.</p>
      <div className="card p-6">
        <ProductForm initial={product} productId={product.id} />
      </div>
    </div>
  );
}
