"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/api/auth/login", form);
      login(data.token, data);
      router.push(data.role === "FARMER" ? "/farmer/dashboard" : "/buyer/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <div className="hidden lg:flex lg:w-1/2 bg-leaf-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          {["🌿","🌾","🍃","🌱"].map((e, i) => (
            <span key={i} className="absolute text-6xl" style={{ top: `${20 + i * 20}%`, left: `${15 + i * 18}%`, transform: `rotate(${i * 45}deg)` }}>{e}</span>
          ))}
        </div>
        <div className="relative text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-3xl font-bold">K</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">KrishiSetu</h1>
          <p className="text-leaf-200 text-lg">Farm to table, directly.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-leaf-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold font-display">K</span>
            </div>
            <span className="font-display text-xl font-semibold text-earth">KrishiSetu</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-earth mb-1">Welcome back</h2>
          <p className="text-muted text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" required autoComplete="email" />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="••••••••" required autoComplete="current-password" />
            <Button type="submit" loading={loading} className="w-full justify-center">Sign in</Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-leaf-600 font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
