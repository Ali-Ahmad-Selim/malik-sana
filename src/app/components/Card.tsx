"use client";

export default function ProductCard() {
  return (
    <div className="p-6 flex items-center justify-center bg-[var(--back)]">
      {/* Card Container */}
      <div className="group relative w-full max-w-sm rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[var(--vibe)] text-[var(--text)] shadow-sm transition-all hover:shadow-xl hover:shadow-[rgba(198,151,73,0.25)] hover:-translate-y-1">
        {/* Image Area (replace src later) */}
        <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
          <img
            src="https://placehold.co/800x1000/0D1B2A/FFFFFF?text=Your+Image+Here"
            alt="Product image placeholder"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/800x1000/0D1B2A/FFFFFF?text=Image+Not+Found";
            }}
          />

          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.25)] to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-[var(--custom)] text-[var(--back)] px-3 py-1 text-xs font-semibold shadow-md">
            New Arrival
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">Timeless Shairwani</h3>
          <p className="mt-2 text-sm opacity-80 leading-6">
            Premium tailoring with refined detailing for weddings and special occasions.
          </p>

          {/* Price + CTA */}
          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center rounded-md bg-[var(--custom)]/15 text-[var(--custom)] px-3 py-1 text-sm font-semibold">
              PKR 38,000
            </span>
            <button
              className="rounded-md bg-[var(--custom)] text-[var(--back)] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[color:var(--custom)]/90"
            >
              View Details
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-md border border-[var(--custom)]/40 text-[var(--text)] px-3 py-2 text-sm transition-colors hover:border-[var(--custom)] hover:bg-[var(--custom)]/10">
              Add to Wishlist
            </button>
            <button className="flex-1 rounded-md border border-[var(--custom)]/40 text-[var(--text)] px-3 py-2 text-sm transition-colors hover:border-[var(--custom)] hover:bg-[var(--custom)]/10">
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
