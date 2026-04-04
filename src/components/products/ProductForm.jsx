"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { api } from "@/lib/api";

const CATEGORIES = ["Grains", "Vegetables", "Fruits", "Dairy", "Other"];
const CATEGORY_EMOJI = { Grains: "🌾", Vegetables: "🥬", Fruits: "🍎", Dairy: "🥛", Other: "📦" };
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
    <form onSubmit={handleSubmit} className="space-y-7">

      {/* Basic info section */}
      <div className="card p-6">
        <h3 className="font-display text-base font-semibold text-earth mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-leaf-100 rounded-lg flex items-center justify-center text-sm">📋</span>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Product Name"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            error={errors.name}
            placeholder="e.g. Organic Basmati Rice"
          />

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-earth">Category <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-5 gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("category", c)}
                  className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    form.category === c
                      ? "bg-leaf-50 border-leaf-400 text-leaf-700"
                      : "bg-white border-[var(--border)] text-muted hover:border-leaf-200 hover:bg-soil-50"
                  }`}
                >
                  <span className="text-lg">{CATEGORY_EMOJI[c]}</span>
                  <span className="truncate w-full text-center px-0.5">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Price per Unit (₹)"
            required
            type="number"
            min="0"
            step="0.01"
            value={form.pricePerUnit}
            onChange={(e) => set("pricePerUnit", e.target.value)}
            error={errors.pricePerUnit}
            placeholder="e.g. 45"
          />

          {/* Unit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-earth">Unit <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-4 gap-1.5">
              {UNITS.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => set("unit", u)}
                  className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    form.unit === u
                      ? "bg-leaf-50 border-leaf-400 text-leaf-700"
                      : "bg-white border-[var(--border)] text-muted hover:border-leaf-200"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Quantity Available"
            required
            type="number"
            min="1"
            value={form.quantityAvailable}
            onChange={(e) => set("quantityAvailable", e.target.value)}
            error={errors.quantityAvailable}
            placeholder="e.g. 100"
          />

          <Input
            label="Harvest Date"
            type="date"
            value={form.harvestDate}
            onChange={(e) => set("harvestDate", e.target.value)}
          />
        </div>

        <div className="mt-5">
          <Input
            label="Description"
            as="textarea"
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Describe your produce — freshness, farming method, packaging, etc."
          />
        </div>
      </div>

      {/* Location section */}
      <div className="card p-6">
        <h3 className="font-display text-base font-semibold text-earth mb-5 flex items-center gap-2">
          <span className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center text-sm">📍</span>
          Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="District"
            value={form.location.district}
            onChange={(e) => set("location", { ...form.location, district: e.target.value })}
            placeholder="e.g. Amritsar"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-earth">State</label>
            <select
              value={form.location.state}
              onChange={(e) => set("location", { ...form.location, state: e.target.value })}
              className="input-base"
            >
              <option value="">Select state</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Photos section */}
      <div className="card p-6">
        <h3 className="font-display text-base font-semibold text-earth mb-1 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-sm">📸</span>
          Photos
          <span className="text-muted font-normal text-sm">(up to 5)</span>
        </h3>
        <p className="text-xs text-muted mb-4">Clear photos help buyers trust your listing. Add at least one.</p>
        <div className="flex flex-wrap gap-3">
          {form.images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden group border border-[var(--border)] shadow-warm-sm">
              <Image src={url} alt={`img ${i}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute inset-0 bg-earth/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              {i === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-leaf-600/80 text-white text-[9px] text-center py-0.5 font-medium">
                  Cover
                </div>
              )}
            </div>
          ))}
          {form.images.length < 5 && (
            <label className="w-24 h-24 rounded-xl border-2 border-dashed border-soil-300 flex flex-col items-center justify-center cursor-pointer hover:border-leaf-400 hover:bg-leaf-50 transition-all group">
              {uploading ? (
                <svg className="animate-spin w-5 h-5 text-leaf-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <>
                  <svg className="w-6 h-6 text-soil-400 group-hover:text-leaf-500 transition-colors mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span className="text-xs text-muted group-hover:text-leaf-600 transition-colors">Add photo</span>
                </>
              )}
              <input type="file" accept="image/*" multiple className="sr-only" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
        </div>
        {errors.images && <p className="text-xs text-red-500 mt-2">{errors.images}</p>}
      </div>

      {/* Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <span>⚠️</span> {errors.submit}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={saving}>
          {productId ? "Save changes" : "Create listing"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}