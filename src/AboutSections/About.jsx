"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const lines = [
  "A WORLD OF GODS,",
  "CURSES, AND WAR"
];

const p1Text = "Journey through a fractured realm inspired by ancient India. Face mythical warriors, cursed kings, celestial beasts, and forgotten gods.";
const p2Text = "Every battle tests your skill.<br/>Every victory unlocks greater power.";

const imagesForTrail = [
  "/Assets/Images/ABOUT_ASSET1.png",
  "/Assets/Images/ABOUT_ASSET2.png",
  "/Assets/Images/ABOUT_ASSET3.png"
];
const TRAIL_LENGTH = 15; // Number of images to recycle in the trail

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  
  const trailRefs = useRef([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const currentTrailIndex = useRef(0);
  const zIndexCounter = useRef(1);

  useGSAP(() => {
    const words = textRef.current.querySelectorAll('.word');
    
    // Header word-by-word reveal
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
          start: "top 90%", // Starts earlier
          end: "top 10%",   // Ends later, spreading the animation over a larger scroll area
          scrub: 2,         // Adds more smoothing/delay to slow it down
        },
      }
    );

    // Paragraph 1 Typing effect
    gsap.to(p1Ref.current, {
      text: p1Text,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "top 25%",
        scrub: 1,
      },
    });

    // Paragraph 2 Typing effect
    gsap.to(p2Ref.current, {
      text: p2Text,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 25%",
        end: "top 5%",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Only spawn a new image if the mouse moved a certain distance
    if (dist > 120) {
      lastMousePos.current = { x, y };

      const img = trailRefs.current[currentTrailIndex.current];
      if (img) {
        // Random slight rotation for an organic feel
        const rotation = Math.random() * 20 - 10;

        // Reset previous animations
        gsap.killTweensOf(img);
        
        // Position at cursor instantly, scaled down and transparent
        gsap.set(img, {
          x: x,
          y: y,
          xPercent: -50,
          yPercent: -50,
          rotation: rotation,
          scale: 0.5,
          opacity: 1,
          zIndex: zIndexCounter.current++,
        });

        // Pop in animation (Smoother and slower)
        gsap.to(img, {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });

        // Fade out and move slightly down (with more delay and slower fade)
        gsap.to(img, {
          opacity: 0,
          y: y + 60,
          duration: 1.2,
          delay: 0.6,
          ease: "power2.out",
        });

        // Move to the next image in the pool
        currentTrailIndex.current = (currentTrailIndex.current + 1) % TRAIL_LENGTH;
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 w-full min-h-screen bg-white text-[#0a0a0a] rounded-t-[2rem] md:rounded-t-[3rem] flex flex-col justify-center px-8 py-32 md:px-12 lg:px-24 overflow-hidden"
      style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* Image Trail Pool */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <img
          key={i}
          ref={el => trailRefs.current[i] = el}
          src={imagesForTrail[i % imagesForTrail.length]}
          alt=""
          className="absolute top-0 left-0 w-[150px] sm:w-[200px] md:w-[250px] h-auto object-cover pointer-events-none opacity-0 z-0"
        />
      ))}

      <div className="w-full max-w-6xl mx-auto flex flex-col items-start relative z-10 pointer-events-none">
        
        {/* Typography Section (Left Aligned, Smaller) */}
        <h2 
          ref={textRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] uppercase tracking-[-0.02em] mb-12 pointer-events-auto"
        >
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="block overflow-hidden pb-1 relative">
              {line.split(" ").map((word, wordIndex) => (
                <span key={`${lineIndex}-${wordIndex}`} className="word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h2>

        {/* Paragraph section (Smaller size, Typing effect) */}
        <div className="max-w-3xl text-base md:text-lg lg:text-xl font-normal leading-relaxed text-[#1a1a1a] pointer-events-auto">
          <div className="relative mb-6">
            <p className="opacity-0 pointer-events-none select-none" aria-hidden="true">{p1Text}</p>
            <p ref={p1Ref} className="absolute top-0 left-0 w-full h-full"></p>
          </div>
          <div className="relative">
            <p className="opacity-0 pointer-events-none select-none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: p2Text }}></p>
            <p ref={p2Ref} className="absolute top-0 left-0 w-full h-full"></p>
          </div>
        </div>

      </div>
    </div>
  );
}

