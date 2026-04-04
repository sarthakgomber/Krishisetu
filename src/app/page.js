import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden bg-cream">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-leaf-100 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-soil-100 rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-leaf-50 text-leaf-700 border border-leaf-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full" />
              Direct Farmer to Consumer
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-earth leading-[1.1] mb-6">
              Fresh from the<span className="text-leaf-600"> field,</span><br />straight to you.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl">
              KrishiSetu cuts out middlemen so farmers earn more and you pay less. Browse real listings, chat directly, and order fresh produce at fair prices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary text-base px-7 py-3.5">Browse produce</Link>
              <Link href="/register" className="btn-secondary text-base px-7 py-3.5">Sell your crops</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-leaf-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[{ number: "40%", label: "More for farmers" }, { number: "2–3×", label: "Cheaper for buyers" }, { number: "0", label: "Middlemen" }, { number: "Real-time", label: "Price negotiation" }].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold mb-1">{s.number}</div>
              <div className="text-leaf-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-earth mb-4">How it works</h2>
            <p className="text-muted max-w-lg mx-auto">Three steps from farm to your table.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Farmers list produce", desc: "Upload photos, set price, quantity, and location. Listings go live immediately.", icon: "🌾" },
              { step: "02", title: "Buyers browse & chat", desc: "Search by crop, location, or price. Chat directly with farmers to negotiate.", icon: "💬" },
              { step: "03", title: "Order & build trust", desc: "Place your order, track status, and leave a rating. Reliable farmers earn Gold merit.", icon: "⭐" },
            ].map((item) => (
              <div key={item.step} className="card p-7 relative">
                <span className="absolute top-5 right-5 font-display text-5xl font-bold text-soil-100 select-none">{item.step}</span>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl font-semibold text-earth mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-leaf-600">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-leaf-200 mb-8 text-lg">Join farmers and buyers already trading directly on KrishiSetu.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/register?role=FARMER" className="bg-white text-leaf-700 font-medium px-7 py-3.5 rounded-xl hover:bg-leaf-50 transition-colors">I&apos;m a Farmer</Link>
            <Link href="/register?role=BUYER" className="border border-leaf-400 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-leaf-700 transition-colors">I&apos;m a Buyer</Link>
          </div>
        </div>
      </section>

      <footer className="bg-earth py-8 text-center">
        <p className="text-soil-400 text-sm">© 2026 KrishiSetu — Dronacharya College of Engineering</p>
      </footer>
    </div>
  );
}
