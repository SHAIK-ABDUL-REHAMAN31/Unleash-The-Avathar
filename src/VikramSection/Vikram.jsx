"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import styles from "./Vikram.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const headingLines = ["VIKRAM"];
const chosenText = "Chosen by destiny.";

const statsData = [
  { label: "Combat", stars: 5 },
  { label: "Agility", stars: 4 },
  { label: "Wisdom", stars: 4 },
  { label: "Divine Power", stars: 5 },
];

const powerLines = [
  "Wield divine powers.",
  "Master ancient weapons.",
  "Uncover the truth behind the Avatar.",
];

export default function Vikram() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const chosenRef = useRef(null);
  const powersRef = useRef(null);
  const statsRef = useRef(null);
  
  const pose1Ref = useRef(null);
  const pose2Ref = useRef(null);
  const pose3Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 15%",
        toggleActions: "play none none none",
      },
    });

    // 1. Heading slide up (solid black text)
    const chars = headingRef.current?.querySelectorAll(".char-span");
    if (chars && chars.length > 0) {
      tl.fromTo(
        chars,
        { opacity: 0, yPercent: 100 },
        {
          opacity: 1.0, // Solid black heading as requested
          yPercent: 0,
          stagger: 0.08,
          duration: 1.0,
          ease: "power4.out",
        }
      );
    }

    // 2. Pose 1 (center) fade in and scale up
    tl.fromTo(
      pose1Ref.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out", force3D: true },
      "-=0.6"
    );

    // 3. Pose 2 slides left and Pose 3 slides right with fade from behind Pose 1
    tl.fromTo(
      pose2Ref.current,
      { opacity: 0, x: 80 }, // starts closer to center, slides left
      { opacity: 1, x: 0, duration: 1.4, ease: "power3.out", force3D: true },
      "-=0.8"
    );

    tl.fromTo(
      pose3Ref.current,
      { opacity: 0, x: -80 }, // starts closer to center, slides right
      { opacity: 1, x: 0, duration: 1.4, ease: "power3.out", force3D: true },
      "-=1.4"
    );

    // 4. Typewriter effect for "Chosen by destiny."
    tl.fromTo(
      chosenRef.current,
      { text: "" },
      { text: chosenText, duration: 1.2, ease: "none" },
      "-=0.8"
    );

    // 5. Power lines slide up and fade
    const powerItems = powersRef.current?.querySelectorAll(".power-line");
    if (powerItems) {
      tl.fromTo(
        powerItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );
    }

    // 6. Stats slide up and fade
    const statItems = statsRef.current?.querySelectorAll(".stat-item");
    if (statItems) {
      tl.fromTo(
        statItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );
    }
  }, { scope: sectionRef });

  // Generate star ratings
  const renderStars = (filled) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < filled ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  return (
    <div
      ref={sectionRef}
      className={styles.vikramSection}
    >
      {/* Background Heading Text "VIKRAM" */}
      <h2
        ref={headingRef}
        className={styles.vikramHeading}
        style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {headingLines.map((line, lineIndex) => (
          <div key={lineIndex} className="block overflow-hidden relative leading-none">
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="char-span inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
      </h2>

      <div className={styles.vikramInner}>
        {/* Left Column: Stats */}
        <div ref={statsRef} className={styles.leftColumn}>
          <div className="flex flex-col gap-3.5">
            {statsData.map((stat, i) => (
              <div key={i} className={`stat-item ${styles.statItem}`}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statStars}>{renderStars(stat.stars)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column: 3 layered Pose images */}
        <div className={styles.centerColumn}>
          <div className={styles.posesContainer}>
            {/* Pose 2: Left background figure wrapper (using POSE3.png which is the red sword image) */}
            <div ref={pose2Ref} className={`${styles.poseWrapper} ${styles.pose2}`}>
              <img
                src="/Assets/Images/POSE3.png"
                alt="Vikram Pose Left (Red Sword)"
                className={styles.poseImage}
              />
            </div>
            {/* Pose 3: Right background figure wrapper (using POSE2.png which is the blue flame image) */}
            <div ref={pose3Ref} className={`${styles.poseWrapper} ${styles.pose3}`}>
              <img
                src="/Assets/Images/POSE2.png"
                alt="Vikram Pose Right (Blue Flame)"
                className={styles.poseImage}
              />
            </div>
            {/* Pose 1: Center foreground figure wrapper (using POSE1.png which is the arms crossed image) */}
            <div ref={pose1Ref} className={`${styles.poseWrapper} ${styles.pose1}`}>
              <img
                src="/Assets/Images/POSE1.png"
                alt="Vikram Pose Center"
                className={styles.poseImage}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Descriptions */}
        <div className={styles.rightColumn}>
          <div className="flex flex-col gap-2">
            {/* Chosen by destiny — typewriter */}
            <div className={styles.chosenWrapper}>
              <p className={styles.chosenPlaceholder} aria-hidden="true">{chosenText}</p>
              <p ref={chosenRef} className={styles.chosenText}></p>
            </div>

            {/* Power lines */}
            <div ref={powersRef} className={styles.powersBlock}>
              {powerLines.map((line, i) => (
                <div key={i} className="overflow-hidden py-1">
                  <p className={`power-line ${styles.powerLine}`}>
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
