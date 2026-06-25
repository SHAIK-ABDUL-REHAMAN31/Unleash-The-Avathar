"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Calculate rotation for 3D tilt effect (max 3 degrees)
    const rotateX = -((y - 50) / 50) * 2;
    const rotateY = ((x - 50) / 50) * 2;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#06070a] px-4 md:px-12 pt-28 pb-16">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#1c2e4a]/15 blur-[150px] pointer-events-none" style={{ animationDelay: "2s" }}></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Cinematic Header Text above Card */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="font-sans text-xs md:text-sm font-bold tracking-[0.4em] text-[#d4af37] uppercase mb-3">
            Interactive Cinematic Experience
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-white leading-tight">
            BECOME THE LEGEND
          </h1>
        </div>

        {/* Notched Hero Card Container */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          className="hero-notched-clip w-full aspect-[16/9] bg-white p-[10px] md:p-[16px] shadow-2xl relative cursor-pointer group transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.15)]"
        >
          {/* Inner Image Container (also clipped to notch shape) */}
          <div className="hero-notched-clip w-full h-full relative overflow-hidden bg-[#06070a]">
            
            {/* Background Hero Image with Mouse Parallax */}
            <div 
              style={{
                transform: `scale(${isHovered ? 1.05 : 1.01}) translate(${(mousePos.x - 50) * -0.05}px, ${(mousePos.y - 50) * -0.05}px)`,
                transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="/Assets/Images/HERO.jpeg"
                alt="Unleash The Avatar Hero Background"
                fill
                priority
                className="object-cover object-center select-none"
              />
            </div>

            {/* Radial Gold Spotlight (Follows mouse cursor) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
              style={{
                opacity: isHovered ? 0.35 : 0,
                background: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, rgba(212, 175, 55, 0.25) 0%, rgba(0, 0, 0, 0) 80%)`,
              }}
            />

            {/* Highlight Spotlight Layer (Improves color/brightness under cursor) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay z-10"
              style={{
                opacity: isHovered ? 0.9 : 0,
                background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)`,
              }}
            />

            {/* Dark Gradient Overlay around edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 pointer-events-none z-10" />

            {/* Top-Left Capsule Badge */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
              <div className="flex items-center gap-2.5 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/10 hover:bg-[#f4f4f7] transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-widest text-[#06070a] uppercase">
                  ENTER REALM
                </span>
              </div>
            </div>

            {/* Bottom-Left Logo Overlay */}
            <div 
              style={{
                transform: `translate(${(mousePos.x - 50) * -0.015}px, ${(mousePos.y - 50) * -0.015}px)`,
                transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-20 w-[180px] sm:w-[240px] md:w-[320px] transition-all duration-500 hover:scale-105"
            >
              <Image
                src="/Assets/Images/HERO TEXT.avif"
                alt="Unleash The Avatar Logo"
                width={320}
                height={150}
                className="w-full h-auto filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-gold-pulse"
                priority
              />
            </div>

            {/* Interactive Card Corner Accents */}
            <div className="absolute bottom-4 right-4 z-20 hidden md:block">
              <div className="text-[10px] font-mono tracking-widest text-white/40">
                SYS_VER_1.09 // 2026
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 animate-bounce cursor-pointer z-20">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-[#d4af37]">SCROLL FOR LORE</span>
          <svg className="w-4 h-4 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
