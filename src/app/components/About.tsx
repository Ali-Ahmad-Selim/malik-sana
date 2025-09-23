import React from 'react'

export default function About() {
  return (
    <section aria-label="About" className="w-full py-12 sm:py-16 md:py-20 bg-[var(--back)] text-[var(--text)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base opacity-80">
            Fast service, personalized style, and elegant design in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 - Fast Delivery */}
          <div className="group relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--vibe)] p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-[rgba(198,151,73,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--custom)] text-[var(--back)]">
                {/* Truck icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h7.5A2.25 2.25 0 0 1 15 5.25V9h2.86c.6 0 1.16.27 1.54.73l2.16 2.59c.29.35.44.79.44 1.25V17.5a1.5 1.5 0 0 1-1.5 1.5h-1.06a2.75 2.75 0 1 1-5.38 0H9.25a2.75 2.75 0 1 1-5.38 0H3A1.5 1.5 0 0 1 1.5 17.5v-12Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Fast Delivery</h3>
            </div>
            <p className="mt-4 opacity-80 text-sm leading-6">
              Quick turnaround without compromising quality. Timely stitching and on-schedule drop-offs.
            </p>
          </div>

          {/* Card 2 - Style of Your Choice */}
          <div className="group relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--vibe)] p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-[rgba(198,151,73,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--custom)] text-[var(--back)]">
                {/* Sparkles icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M9.813 3.187a.75.75 0 0 1 1.374 0l.843 2.248a4.5 4.5 0 0 0 2.535 2.535l2.248.843a.75.75 0 0 1 0 1.374l-2.248.843a4.5 4.5 0 0 0-2.535 2.535l-.843 2.248a.75.75 0 0 1-1.374 0l-.843-2.248a4.5 4.5 0 0 0-2.535-2.535l-2.248-.843a.75.75 0 0 1 0-1.374l2.248-.843a4.5 4.5 0 0 0 2.535-2.535l.843-2.248Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Style of Your Choice</h3>
            </div>
            <p className="mt-4 opacity-80 text-sm leading-6">
              Made-to-measure designs tailored to your preferences—classic, casual, or contemporary.
            </p>
          </div>

          {/* Card 3 - Elegant Design */}
          <div className="group relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--vibe)] p-6 shadow-sm transition-all hover:shadow-xl hover:shadow-[rgba(198,151,73,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--custom)] text-[var(--back)]">
                {/* Diamond icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M11.47 3.84a1 1 0 0 1 1.06 0l7.5 4.5a1 1 0 0 1 .35 1.36l-7.5 12a1 1 0 0 1-1.71 0l-7.5-12a1 1 0 0 1 .35-1.36l7.5-4.5Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Elegant Design</h3>
            </div>
            <p className="mt-4 opacity-80 text-sm leading-6">
              Clean lines, premium finishing, and refined cuts for a truly polished look.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}