"use client";

import ImageSlider from "./ImageSlider";
import { ScrollIndicator } from "./ScrollIndicator";

export function Hero() {
  const targetId = "next";

  return (
    <section
      role="banner"
      className="relative h-svh w-full overflow-hidden bg-black text-white"
      id="hero"
    >
      {/* Background image */}
      <ImageSlider/>

      {/* Overlay gradient for better text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 sm:px-10 lg:px-12">
        <h1
          className="text-left font-sans font-extrabold uppercase leading-[1.1]
                     tracking-tight text-white drop-shadow-lg
                     text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          LET&apos;S CREATE
          <br />
          A STORY
          <br />
          TOGETHER
        </h1>

        <p className="mt-6 max-w-md text-sm sm:text-base text-white/80">
          We craft digital experiences that connect, inspire, and transform your brand.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
