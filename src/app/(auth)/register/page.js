"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const STATES = [
  "Andhra Pradesh","Bihar","Gujarat","Haryana","Karnataka",
  "Madhya Pradesh","Maharashtra","Punjab","Rajasthan","Tamil Nadu",
  "Telangana","Uttar Pradesh","West Bengal",
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
    role: "BUYER", farmName: "", district: "", state: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.role === "FARMER" && !form.farmName.trim()) e.farmName = "Farm name is required";
    if (form.role === "FARMER" && !form.state) e.state = "State is required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const data = await api.post("/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone,
        role: form.role,
        farmName: form.farmName.trim() || null,
        district: form.district.trim() || null,
        state: form.state || null,
      });
      login(data.token, data);
      router.push(data.role === "FARMER" ? "/farmer/dashboard" : "/buyer/dashboard");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-leaf-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold font-display">K</span>
          </div>
          <span className="font-display text-xl font-semibold text-earth">KrishiSetu</span>
        </div>

        <h2 className="font-display text-3xl font-bold text-earth mb-1">Create account</h2>
        <p className="text-muted text-sm mb-6">Join farmers and buyers trading directly</p>

        <div className="flex gap-2 mb-6 p-1 bg-soil-100 rounded-xl">
          {[{ val: "BUYER", label: "🛒 Buyer" }, { val: "FARMER", label: "🌾 Farmer" }].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => set("role", r.val)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                form.role === r.val ? "bg-white text-earth shadow-warm-sm" : "text-muted hover:text-earth"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Rajesh Kumar" error={errors.name} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" error={errors.email} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min 6 characters" error={errors.password} required />
          <Input label="Phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />

          {form.role === "FARMER" && (
            <>
              <Input label="Farm Name" value={form.farmName} onChange={(e) => set("farmName", e.target.value)} placeholder="e.g. Rajesh Organic Farm" error={errors.farmName} required />
              <Input label="District" value={form.district} onChange={(e) => set("district", e.target.value)} placeholder="e.g. Karnal" />
              <div>
                <label className="text-sm font-medium text-earth block mb-1.5">State <span className="text-red-500">*</span></label>
                <select value={form.state} onChange={(e) => set("state", e.target.value)} className={`input-base ${errors.state ? "!border-red-400" : ""}`}>
                  <option value="">Select state</option>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
              </div>
            </>
          )}

          <Button type="submit" loading={loading} className="w-full justify-center mt-2">
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-leaf-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
