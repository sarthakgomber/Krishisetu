"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const TABS = ["all", "active", "soldout", "archived"];

export default function FarmerListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("active");

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    api.get(`/api/products/farmer/${user.id}?status=${tab}`)
      .then((d) => setListings(d || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [user?.id, tab]);

  async function handleArchive(id) {
    if (!confirm("Archive this listing?")) return;
    await api.delete(`/api/products/${id}`);
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-earth">My Listings</h1>
        <Link href="/farmer/listings/new"><Button>+ New Listing</Button></Link>
      </div>

      <div className="flex gap-1 mb-6 p-1 bg-soil-100 rounded-xl w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? "bg-white text-earth shadow-warm-sm" : "text-muted hover:text-earth"}`}>{t}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-3">🌾</div>
          <p className="font-display text-xl font-semibold text-earth mb-2">No {tab} listings</p>
          <Link href="/farmer/listings/new"><Button className="mt-2">Create your first listing</Button></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div key={listing.id} className="card p-4 flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-soil-50 shrink-0">
                {listing.images?.[0] ? (
                  <Image src={listing.images[0]} alt={listing.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🌾</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-earth">{listing.name}</p>
                <p className="text-sm text-muted">₹{listing.pricePerUnit}/{listing.unit} · {listing.quantityAvailable} available{listing.state && ` · ${listing.state}`}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${listing.status === "active" ? "bg-leaf-50 text-leaf-700" : listing.status === "soldout" ? "bg-amber-50 text-amber-700" : "bg-soil-100 text-muted"}`}>{listing.status}</span>
                <Link href={`/farmer/listings/${listing.id}/edit`}><Button variant="secondary" size="sm">Edit</Button></Link>
                {listing.status !== "archived" && (
                  <Button variant="ghost" size="sm" onClick={() => handleArchive(listing.id)} className="text-red-500 hover:bg-red-50 hover:text-red-600">Archive</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
