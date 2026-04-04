import ProductForm from "@/components/products/ProductForm";

export default function NewListingPage() {
  return (
    <div className="p-6 max-w-2xl animate-fade-in">
      <div className="mb-8">
        <span className="text-leaf-600 text-xs font-semibold uppercase tracking-widest">Farmer</span>
        <h1 className="font-display text-3xl font-bold text-earth mt-1">New Listing</h1>
        <p className="text-muted text-sm mt-1">Fill in the details about your produce.</p>
      </div>
      <div className="card p-6">
        <ProductForm />
      </div>
    </div>
  );
}