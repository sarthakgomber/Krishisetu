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
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-leaf-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(42,123,40,0.18) 0%, transparent 65%)" }} />
        {/* Decorative emoji pattern */}
        <div className="absolute inset-0 opacity-[0.06] select-none pointer-events-none">
          {["🌿","🌾","🍃","🌱","🪴","🌿","🌾","🍃"].map((e, i) => (
            <span key={i} className="absolute text-7xl" style={{ top: `${10 + i * 11}%`, left: `${8 + (i % 4) * 22}%`, transform: `rotate(${i * 30 - 20}deg)` }}>{e}</span>
          ))}
        </div>
        <div className="relative text-center text-white animate-fade-in">
          <Link href="/" className="inline-flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-leaf-400 rounded-2xl flex items-center justify-center shadow-warm-lg">
              <span className="font-display text-3xl font-bold text-leaf-900">K</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-white">KrishiSetu</h1>
          </Link>
          <p className="text-leaf-300 text-base mt-3 leading-relaxed">Farm to table, directly.<br />No middlemen. No markups.</p>

          <div className="mt-12 bg-leaf-800/60 border border-leaf-700/60 rounded-2xl p-6 text-left backdrop-blur-sm max-w-xs mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-leaf-400 rounded-full flex items-center justify-center">
                <span className="text-leaf-900 text-xs font-bold">✓</span>
              </div>
              <span className="text-leaf-200 text-sm font-medium">Zero commission on sales</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-leaf-400 rounded-full flex items-center justify-center">
                <span className="text-leaf-900 text-xs font-bold">✓</span>
              </div>
              <span className="text-leaf-200 text-sm font-medium">Direct chat with farmers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-leaf-400 rounded-full flex items-center justify-center">
                <span className="text-leaf-900 text-xs font-bold">✓</span>
              </div>
              <span className="text-leaf-200 text-sm font-medium">Verified merit scores</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-cream">
        <div className="w-full max-w-sm animate-slide-up">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-leaf-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold font-display">K</span>
            </div>
            <span className="font-display text-xl font-semibold text-earth">KrishiSetu</span>
          </Link>

          <span className="inline-flex items-center gap-2 bg-leaf-50 text-leaf-700 border border-leaf-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full animate-pulse" />
            Welcome back
          </span>

          <h2 className="font-display text-3xl font-bold text-earth mb-1">Sign in</h2>
          <p className="text-muted text-sm mb-8">Access your KrishiSetu account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
              <span className="shrink-0">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" required autoComplete="email" />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder="••••••••" required autoComplete="current-password" />
            <Button type="submit" loading={loading} className="w-full justify-center mt-2">Sign in →</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-center text-sm text-muted">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-leaf-600 font-semibold hover:underline">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}