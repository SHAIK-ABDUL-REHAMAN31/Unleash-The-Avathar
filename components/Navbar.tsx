"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#06070a]/60 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-[0.25em] text-white">
              UNLEASH
              <span className="text-[#d4af37]"> THE </span>
              AVATAR
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {["LORE", "AVATARS", "GAMEPLAY", "FACTIONS"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans text-xs font-semibold tracking-widest text-zinc-400 transition-colors duration-200 hover:text-white relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#aa7c11] to-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Play Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#play"
              className="relative px-6 py-2.5 overflow-hidden group rounded-sm border border-[#d4af37]/40 text-xs font-bold tracking-widest text-[#d4af37] transition-all duration-300 hover:text-[#06070a]"
            >
              {/* Gold sliding background overlay */}
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#aa7c11] to-[#d4af37] transition-all duration-300 ease-out group-hover:w-full -z-10"></span>
              PLAY NOW
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/5 bg-[#06070a]/95 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {["LORE", "AVATARS", "GAMEPLAY", "FACTIONS"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm font-semibold tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="px-3 pt-4 border-t border-white/5">
            <a
              href="#play"
              onClick={() => setIsOpen(false)}
              className="flex justify-center w-full py-2.5 rounded-sm border border-[#d4af37]/60 text-xs font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37] hover:text-[#06070a] transition-all duration-300"
            >
              PLAY NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
