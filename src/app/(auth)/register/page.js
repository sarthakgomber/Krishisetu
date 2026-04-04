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
        name: form.name.trim(), email: form.email.trim(),
        password: form.password, phone: form.phone, role: form.role,
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
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-leaf-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold font-display">K</span>
          </div>
          <span className="font-display text-xl font-semibold text-earth">KrishiSetu</span>
        </Link>

        <span className="inline-flex items-center gap-2 bg-leaf-50 text-leaf-700 border border-leaf-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full animate-pulse" />
          Free to join
        </span>

        <h2 className="font-display text-3xl font-bold text-earth mb-1">Create account</h2>
        <p className="text-muted text-sm mb-6">Join farmers and buyers trading directly</p>

        {/* Role toggle */}
        <div className="flex gap-1.5 mb-6 p-1.5 bg-soil-100 rounded-2xl border border-[var(--border)]">
          {[
            { val: "BUYER", label: "🛒 I'm a Buyer", desc: "Buy fresh produce" },
            { val: "FARMER", label: "🌾 I'm a Farmer", desc: "Sell your harvest" },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => set("role", r.val)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                form.role === r.val
                  ? "bg-white text-earth shadow-warm border border-[var(--border)]"
                  : "text-muted hover:text-earth"
              }`}
            >
              <div>{r.label}</div>
              <div className={`text-xs font-normal mt-0.5 ${form.role === r.val ? "text-muted" : "text-muted/60"}`}>{r.desc}</div>
            </button>
          ))}
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
            <span>⚠️</span> {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Rajesh Kumar" error={errors.name} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" error={errors.email} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min 6 characters" error={errors.password} required />
          <Input label="Phone (optional)" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />

          {form.role === "FARMER" && (
            <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-4 space-y-4">
              <p className="text-xs font-semibold text-leaf-700 uppercase tracking-wider">Farm Details</p>
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
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full justify-center mt-2">
            Create account →
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-leaf-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}