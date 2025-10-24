"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [imageSrc, setImageSrc] = useState("/hero.png");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setImageSrc("/image.png");
      } else {
        setImageSrc("/hero.png");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section aria-label="Hero" className="w-full">
      <div className="relative w-full h-[60vh] md:h-[80vh] xl:h-screen">
        <Image
          src={imageSrc}
          alt="Hero image"
          fill
          priority
          className="object-cover object-center w-full"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 100vw,
                 100vw"
          quality={100}
        />
      </div>
    </section>
  );
}