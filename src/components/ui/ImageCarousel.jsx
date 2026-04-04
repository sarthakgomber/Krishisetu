"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageCarousel({ images = [], alt = "Product image" }) {
  const [current, setCurrent] = useState(0);
  const fallback = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80";
  const list = images.length > 0 ? images : [fallback];

  return (
    <div className="relative w-full aspect-[4/3] bg-soil-50 rounded-2xl overflow-hidden group">
      <Image
        src={list[current]}
        alt={`${alt} ${current + 1}`}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {list.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + list.length) % list.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-warm-sm"
          >
            <svg className="w-4 h-4 text-earth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % list.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-warm-sm"
          >
            <svg className="w-4 h-4 text-earth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${
                  i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
