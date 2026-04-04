"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { api } from "@/lib/api";

const CATEGORIES = ["Grains", "Vegetables", "Fruits", "Dairy", "Other"];
const UNITS = ["kg", "quintal", "dozen", "litre"];
const STATES = [
  "Andhra Pradesh","Bihar","Gujarat","Haryana","Karnataka",
  "Madhya Pradesh","Maharashtra","Punjab","Rajasthan","Tamil Nadu",
  "Telangana","Uttar Pradesh","West Bengal",
];

export default function ProductForm({ initial = {}, productId = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial.name || "",
    category: initial.category
      ? initial.category.charAt(0).toUpperCase() + initial.category.slice(1).toLowerCase()
      : "Vegetables",
    description: initial.description || "",
    pricePerUnit: initial.pricePerUnit || "",
    unit: initial.unit ? initial.unit.toLowerCase() : "kg",
    quantityAvailable: initial.quantityAvailable || "",
    harvestDate: initial.harvestDate ? initial.harvestDate.slice(0, 10) : "",
    location: {
      district: initial.district || initial.location?.district || "",
      state: initial.state || initial.location?.state || "",
    },
    images: initial.images || [],
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.pricePerUnit || Number(form.pricePerUnit) <= 0) e.pricePerUnit = "Must be > 0";
    if (!form.quantityAvailable || Number(form.quantityAvailable) <= 0) e.quantityAvailable = "Must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (form.images.length + files.length > 5) {
      setErrors((er) => ({ ...er, images: "Max 5 images" }));
      return;
    }
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const fd = new FormData();
          const uploadedData = await api.upload(file);
          
          
          return uploadedData.url;
        })
      );
      set("images", [...form.images, ...uploaded]);
      setErrors((er) => ({ ...er, images: undefined }));
    } catch {
      setErrors((er) => ({ ...er, images: "Upload failed, try again" }));
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => set("images", form.images.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        category: form.category.toUpperCase(),
        unit: form.unit.toUpperCase(),
        district: form.location?.district || "",
        state: form.location?.state || "",
        pricePerUnit: Number(form.pricePerUnit),
        quantityAvailable: Number(form.quantityAvailable),
      };
      if (productId) {
        await api.put(`/api/products/${productId}`, payload);
      } else {
        await api.post("/api/products", payload);
      }
      router.push("/farmer/listings");
      router.refresh();
    } catch (err) {
      setErrors((er) => ({ ...er, submit: err.message }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Product Name" required value={form.name} onChange={(e) => set("name", e.target.value)} error={errors.name} placeholder="e.g. Organic Basmati Rice" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-earth">Category <span className="text-red-500">*</span></label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="input-base">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Input label="Price per Unit (₹)" required type="number" min="0" step="0.01" value={form.pricePerUnit} onChange={(e) => set("pricePerUnit", e.target.value)} error={errors.pricePerUnit} placeholder="e.g. 45" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-earth">Unit <span className="text-red-500">*</span></label>
          <select value={form.unit} onChange={(e) => set("unit", e.target.value)} className="input-base">
            {UNITS.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <Input label="Quantity Available" required type="number" min="1" value={form.quantityAvailable} onChange={(e) => set("quantityAvailable", e.target.value)} error={errors.quantityAvailable} placeholder="e.g. 100" />
        <Input label="Harvest Date" type="date" value={form.harvestDate} onChange={(e) => set("harvestDate", e.target.value)} />
        <Input label="District" value={form.location.district} onChange={(e) => set("location", { ...form.location, district: e.target.value })} placeholder="e.g. Amritsar" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-earth">State</label>
          <select value={form.location.state} onChange={(e) => set("location", { ...form.location, state: e.target.value })} className="input-base">
            <option value="">Select state</option>
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <Input label="Description" as="textarea" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe your produce — freshness, farming method, etc." />

      <div>
        <label className="text-sm font-medium text-earth block mb-2">Photos <span className="text-muted font-normal">(up to 5)</span></label>
        <div className="flex flex-wrap gap-3">
          {form.images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden group border border-[var(--border)]">
              <Image src={url} alt={`img ${i}`} fill className="object-cover" />
              <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl">×</button>
            </div>
          ))}
          {form.images.length < 5 && (
            <label className="w-24 h-24 rounded-xl border-2 border-dashed border-soil-300 flex flex-col items-center justify-center cursor-pointer hover:border-leaf-400 hover:bg-leaf-50 transition-colors">
              {uploading ? (
                <svg className="animate-spin w-5 h-5 text-leaf-600" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
              ) : (
                <><span className="text-2xl text-soil-400">+</span><span className="text-xs text-muted mt-0.5">Add photo</span></>
              )}
              <input type="file" accept="image/*" multiple className="sr-only" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
        </div>
        {errors.images && <p className="text-xs text-red-500 mt-1.5">{errors.images}</p>}
      </div>

      {errors.submit && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{errors.submit}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={saving}>{productId ? "Save changes" : "Create listing"}</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
