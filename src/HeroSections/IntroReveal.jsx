"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function IntroReveal({ onComplete }) {
  const containerRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useGSAP(() => {
    const stickyWrapper = containerRef.current?.closest(".sticky");
    if (stickyWrapper) {
      stickyWrapper.style.zIndex = "50";
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (stickyWrapper) {
          stickyWrapper.style.zIndex = "";
        }
        setIsDone(true);
        if (onComplete) onComplete();
      },
    });

    // 1. Text slide up animation
    tl.fromTo(
      ".intro-text-line",
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.2,
      }
    );

    // 2. Pause on screen
    tl.to({}, { duration: 1.2 });

    // 3. Text fade out and slight slide up
    tl.to(".intro-text-line", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.in",
      stagger: 0.1,
    });

    // 4. White bars slide/shrink up staggered from right to left
    // Since the columns are ordered left-to-right, we stagger "from end" to animate from right to left.
    tl.to(
      ".intro-bar",
      {
        scaleY: 0,
        duration: 1.4,
        ease: "power4.inOut",
        stagger: {
          each: 0.09,
          from: "end",
        },
      },
      "-=0.4" // overlap slightly with the text fade out for a smoother flow
    );
  }, { scope: containerRef });

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[99] select-none overflow-hidden bg-transparent"
    >
      {/* Background White Bars */}
      <div className="absolute inset-0 flex pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="intro-bar h-full bg-white flex-1 origin-top -mr-[1px]"
            style={{ willChange: "transform" }}
          />
        ))}
      </div>

      {/* Centered Text Reveal Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
        {/* Line 1: DIVE   INTO */}
        <div className="overflow-hidden py-1">
          <h1 className="intro-text-line text-[#06070a] font-sans text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide flex items-center justify-center">
            <span>DIVE</span>
            <span className="w-10 sm:w-16 md:w-24"></span>
            <span>INTO</span>
          </h1>
        </div>

        {/* Line 2: VISHWAPUR */}
        <div className="overflow-hidden py-1 mt-1 sm:mt-2">
          <h1 className="intro-text-line text-[#2b5a9e] font-sans text-5xl sm:text-7xl md:text-8xl font-semibold tracking-wide">
            VISHWAPUR
          </h1>
        </div>
      </div>
    </div>
  );
}
