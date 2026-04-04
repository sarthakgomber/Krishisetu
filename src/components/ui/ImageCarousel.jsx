"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageCarousel({ images = [], alt = "Product image" }) {
  const [current, setCurrent] = useState(0);
  const fallback = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";
  const list = images.length > 0 ? images : [fallback];

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-[4/3] bg-soil-50 rounded-2xl overflow-hidden group border border-[var(--border)] shadow-warm">
        <Image src={list[current]} alt={`${alt} ${current + 1}`} fill className="object-cover transition-opacity duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {list.length > 1 && (
          <>
            <button onClick={() => setCurrent((c) => (c - 1 + list.length) % list.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-warm hover:bg-white active:scale-95">
              <svg className="w-4 h-4 text-earth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => setCurrent((c) => (c + 1) % list.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-warm hover:bg-white active:scale-95">
              <svg className="w-4 h-4 text-earth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-earth/30 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
              {list.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 ${i === current ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`} />
              ))}
            </div>
            <div className="absolute top-3 right-3 bg-earth/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {current + 1} / {list.length}
            </div>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {list.map((src, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${i === current ? "border-leaf-500 shadow-warm" : "border-transparent opacity-60 hover:opacity-90"}`}>
              <Image src={src} alt={`${alt} ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}