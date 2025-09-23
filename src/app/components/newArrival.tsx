import React from 'react'

export default function NewArrival() {
  return (
    <section aria-label="New Arrivals" className="w-full py-8 sm:py-12 bg-[var(--back)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="text-[var(--custom)]">New</span> Arrivals
        </h2>
      </div>
    </section>
  )
}
