"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const headingLines = [
  "WATCH THE REVEAL TRAILER"
];

export default function Trailer() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const cursorBtnRef = useRef(null);
  const videoRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // Continuously animate button toward cursor
  const animateBtn = useCallback(() => {
    if (cursorBtnRef.current) {
      gsap.to(cursorBtnRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    }
    rafId.current = requestAnimationFrame(animateBtn);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animateBtn);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animateBtn]);

  useGSAP(() => {
    // Zoom in animation for the video container
    gsap.fromTo(
      videoWrapperRef.current,
      { scale: 0.85, opacity: 0.2 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
        },
      }
    );

    // Word-by-word heading reveal (same style as About section)
    const words = headingRef.current?.querySelectorAll('.word');
    if (words?.length) {
      gsap.fromTo(
        words,
        { opacity: 0.1, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );
    }
  }, { scope: containerRef });

  // Track mouse relative to the video wrapper
  const handleVideoMouseMove = (e) => {
    const rect = videoWrapperRef.current?.getBoundingClientRect();
    if (rect) {
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full min-h-screen bg-white text-[#0a0a0a] flex flex-col items-center justify-center px-4 py-20 md:px-8 overflow-hidden"
      style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <div className="w-full max-w-[95vw] 2xl:max-w-[1600px] mx-auto flex flex-col items-center relative z-10">
        {/* Heading — word-by-word reveal, same style as About section but smaller */}
        <h2
          ref={headingRef}
          className="mb-10 md:mb-14 text-center text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.1] uppercase tracking-[0.05em]"
        >
          {headingLines.map((line, lineIndex) => (
            <div key={lineIndex} className="block overflow-hidden pb-1 relative">
              {line.split(" ").map((word, wordIndex) => (
                <span key={`${lineIndex}-${wordIndex}`} className="word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h2>

        {/* Video Container — cursor button only inside here */}
        <div
          ref={videoWrapperRef}
          className="relative w-full aspect-video rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden bg-[#050505] group"
          onMouseMove={handleVideoMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Local HTML5 Video — always muted, no sound */}
          <video
            ref={videoRef}
            src="/Assets/Videos/Video Project 1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Clickable overlay — opens YouTube trailer */}
          <a
            href="https://www.youtube.com/watch?v=Y_zBp21BWI0&t=92s"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-none"
          />

          {/* Floating "Watch Full Trailer" button — inside video, follows cursor */}
          <div
            ref={cursorBtnRef}
            className={`absolute z-20 pointer-events-none flex items-center justify-center gap-3 bg-white text-black font-semibold text-sm md:text-base px-6 py-3 rounded-full transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            style={{
              top: 0,
              left: 0,
              transform: 'translate(-50%, -50%)',
              fontFamily: "system-ui, -apple-system, sans-serif",
              boxShadow: '0 8px 30px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Watch Full Trailer
          </div>
        </div>
      </div>
    </div>
  );
}
