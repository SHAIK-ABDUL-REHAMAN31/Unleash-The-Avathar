"use client";

import React from "react";
import Image from "next/image";
import IntroReveal from "./IntroReveal";

export default function Hero() {
  return (
    <div className="w-screen h-screen bg-white pt-[12px] px-[12px] md:pt-[20px] md:px-[20px] pb-0 shadow-[0_24px_50px_rgba(0,0,0,0.8)] relative select-none">
      {/* Inner Image Container */}
      <div className="w-full h-full relative overflow-hidden bg-[#121318]">
        {/* Intro Reveal Overlay Animation */}
        <IntroReveal />

        {/* Background Hero Image - Static with no parallax or zoom */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Assets/Images/HERO.jpeg"
            alt="Unleash The Avatar"
            fill
            priority
            className="object-cover object-[center_10%] select-none"
          />
        </div>


        {/* The top-center trapezoidal white shape that blends with the top padding layer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-white z-20"
          style={{
            // Width and height of the notch extending into the image
            width: "180px",
            height: "20px",
            clipPath: "polygon(0 0, 100% 0, 83.33% 100%, 16.66% 100%)",
          }}
        />

        {/* Subtle line under the notch to make it look premium and integrated */}
        <div
          className="absolute top-[20px] left-1/2 -translate-x-1/2 bg-zinc-300/40 z-20"
          style={{
            width: "120px",
            height: "1px",
          }}
        />

        {/* Top-Left Capsule Badge */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <div className="bg-white px-3.5 py-1.5 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center">
            {/* Minimalist ticket/capsule design matching the mockup */}
            <div className="w-[18px] h-[10px] bg-[#0a0a0a] rounded-sm relative opacity-90">
              <div className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom-Left Title Logo Overlay */}
        <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-20 w-[180px] sm:w-[230px] md:w-[280px]">
          <Image
            src="/Assets/Images/HERO TEXT.avif"
            alt="Unleash The Avatar Logo"
            width={280}
            height={120}
            className="w-full h-auto filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] select-none pointer-events-none"
            priority
          />
        </div>

      </div>
    </div>
  );
}

