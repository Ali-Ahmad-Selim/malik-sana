"use client";

import React, { useEffect, useMemo, useState } from "react";

type Photo = {
  _id: string;
  url: string;           // image URL
  title: string;
  description?: string;
  alt?: string;
  option?: "home" | "waist coat" | "casual coat" | "shaiwani";
  createdAt?: string;
};

export default function NewArrival() {
  const [data, setData] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        // Expecting your /api/photos GET to return { items: Photo[] } or { photos: Photo[] }
        const res = await fetch("/api/photos", { signal: ac.signal, cache: "no-store" });
        const j = await res.json();
        if (!res.ok) throw new Error(j?.error || "Failed to load photos");
        const arr: Photo[] = j.items || j.photos || j.postings || [];
        setData(Array.isArray(arr) ? arr : []);
      } catch (e: any) {
        if (e.name !== "AbortError") setErr(e?.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  const items = useMemo(() => {
    // latest first if backend didn’t sort
    return [...data].sort((a, b) => {
      const at = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bt = b.createdAt ? Date.parse(b.createdAt) : 0;
      return bt - at;
    });
  }, [data]);

  return (
    <section aria-label="New Arrivals" className="w-full py-8 sm:py-12 bg-[var(--back)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="text-[var(--custom)]">New</span> Arrivals
        </h2>

        {/* Loading */}
        {loading && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <div className="h-44 bg-white/10" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-2/3 bg-white/10 rounded" />
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                  <div className="h-3 w-1/3 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && err && (
          <p className="mt-6 text-sm text-red-400">
            {err}
          </p>
        )}

        {/* Empty */}
        {!loading && !err && items.length === 0 && (
          <p className="mt-6 text-sm opacity-80">No arrivals yet.</p>
        )}

        {/* Grid */}
        {!loading && !err && items.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((p) => (
              <article
                key={p._id}
                className="group rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/10">
                  {/* You can switch to next/image if you want */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.alt || p.title || "photo"}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{p.title}</h3>

                  <div className="mt-1 flex items-center gap-2 text-xs opacity-80">
                    {p.option && <span className="px-2 py-0.5 rounded-full bg-[var(--custom)]/15 text-[var(--custom)]">{p.option}</span>}
                    {p.createdAt && (
                      <time dateTime={p.createdAt}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </time>
                    )}
                  </div>

                  {p.description && (
                    <p className="mt-2 text-sm opacity-80 line-clamp-2">{p.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
