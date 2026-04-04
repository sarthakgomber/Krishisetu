import ProductForm from "@/components/products/ProductForm";

export default function NewListingPage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-earth mb-2">New Listing</h1>
      <p className="text-muted text-sm mb-8">Fill in the details about your produce.</p>
      <div className="card p-6">
        <ProductForm />
      </div>
    </div>
  );
}
