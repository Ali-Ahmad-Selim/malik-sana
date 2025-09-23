"use client";

import React from "react";
import Image from "next/image";

const IMAGES = ["/p1.jpg", "/p2.jpg", "/p3.jpg", "/p4.jpg"] as const;
const SWITCH_INTERVAL_MS = 4000; // 4 seconds (slower)

export default function Hero() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, SWITCH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-label="Hero" className="w-full">
      <div className="relative w-full overflow-hidden bg-black">
        {/* Stage fills viewport height to match screen aspect, ensure full image visible */}
        <div className="relative w-full" style={{ height: "100vh" }}>
          {/* Images crossfade with slow, smooth transition and object-fit contain */}
          {IMAGES.map((src, idx) => (
            <div
              key={src}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: activeIndex === idx ? 1 : 0,
                transition: "opacity 1500ms ease-in-out",
              }}
            >
              <Image
                src={src}
                alt="Hero image"
                fill
                priority={idx === 0}
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}

          {/* Dark overlay at 40% UNDER the text */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Text ABOVE overlay (bright) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-white drop-shadow text-3xl sm:text-4xl md:text-5xl font-semibold">
              Elegant Craftsmanship
            </h2>
            <p className="mt-3 text-white/95 text-sm sm:text-base md:text-lg">
              Bespoke fits, premium fabrics, timeless style.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
