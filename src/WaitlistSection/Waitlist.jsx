"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import styles from "./Waitlist.module.css";
import PixelBackground from "./pixelsBaground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function Waitlist() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const bgTextRef = useRef(null);

  const headingWords = ["Unleash", "The", "Avatar"];
  const description = "Embark on an epic journey to unleash your true avatar. Control the storm, master ancient artifacts, and conquer the dark fantasy realm. Wishlist now on Steam or subscribe to get beta access and launch updates!";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 1. Giant background typography slide up
    tl.fromTo(
      bgTextRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    // 2. Label slide up
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
      "-=1.0"
    );

    // 3. Heading image slide up and fade in
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power4.out",
      },
      "-=0.6"
    );

    // 4. Description fade in and slide up (No typewriter animation)
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 0.7, y: 0, duration: 1.0, ease: "power3.out" },
      "-=0.6"
    );

    // 5. Buttons fade in and slide up
    tl.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: sectionRef });

  return (
    <PixelBackground className={styles.waitlistSection}>
      {/* Giant Background Typography Layer */}
      <div ref={bgTextRef} className={styles.waitlistBgText}>
        AVATAR
      </div>

      <div ref={sectionRef} className={styles.waitlistInner}>
        {/* Label */}
        <p ref={labelRef} className={styles.waitlistLabel}>
          Wishlist & Subscribe
        </p>

        {/* Heading Image */}
        <img
          ref={headingRef}
          src="/Assets/Images/HERO TEXT.avif"
          alt="Unleash The Avatar"
          className={styles.waitlistHeadingImage}
        />

        {/* Description Block (No typewriter placeholder wrappers) */}
        <p ref={descRef} className={styles.waitlistDesc}>
          {description}
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className={styles.buttonGroup}>
          <a
            href="https://store.steampowered.com/app/4054220/Unleash_The_Avatar/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.steamBtn}
          >
            {/* Steam Logo SVG */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.372 0 12c0 5.561 3.788 10.237 8.948 11.621l1.503-5.32c-.08-.052-.162-.1-.237-.156-.84-.52-1.397-1.46-1.397-2.529 0-1.653 1.343-2.997 2.997-2.997.359 0 .699.066 1.018.183l3.076-4.478a2.98 2.98 0 0 1-.098-.75c0-1.654 1.343-2.997 2.997-2.997s2.997 1.343 2.997 2.997-1.343 2.997-2.997 2.997c-.36 0-.701-.067-1.02-.184l-3.076 4.478c.038.122.067.247.086.375l5.011 1.416a2.985 2.985 0 0 1 1.776-.583c1.654 0 2.997 1.343 2.997 2.997s-1.343 2.997-2.997 2.997c-1.488 0-2.721-1.092-2.955-2.526l-5.016-1.417c-.309.288-.698.472-1.129.537l-1.503 5.32C18.212 22.237 22 17.561 22 12c0-6.628-5.372-12-12-12zm4.316 11.23c-.768 0-1.392-.624-1.392-1.392s.624-1.392 1.392-1.392 1.392.624 1.392 1.392-.624 1.392-1.392 1.392z"/>
            </svg>
            Wishlist on Steam
          </a>
          <a
            href="https://tally.so/r/w2QoNA"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.emailBtn}
          >
            {/* Email Icon SVG */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Join Email List
          </a>
        </div>
      </div>
    </PixelBackground>
  );
}
