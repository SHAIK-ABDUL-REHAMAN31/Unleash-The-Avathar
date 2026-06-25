"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import styles from "./Combat.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

/* ─── Card 1: Master the Chakra ─── */
const card1 = {
  label: "Combat",
  headingWords: ["Master", "the", "Chakra"],
  video: "/Assets/Videos/RingFrisbee.mp4",
  description:
    "The heart of Unleash The Avatar's combat system. Throw with precision, curve around obstacles, blink to its position for aggressive repositioning, then rethrow at the perfect moment. A new mechanic designed with both a learning curve and satisfying mastery benefits for all players.",
};

/* ─── Card 2: Fast-paced Melee Combat ─── */
const card2 = {
  label: "Combat",
  headingWords: ["Fast-paced", "Melee", "Combat"],
  video: "/Assets/Videos/BackDeflects.mp4",
  description:
    "Unleash the Avatar demands constant movement, spatial awareness, and split-second decision making. Gap-close with a blink ability, reposition against an opponent's combo with a perfect dodge, and turn the battlefield into your playground. Timing successive parries rewards you cosmetically with more powers. We've spent a lot of time studying deflect mechanics from the great games that have preceded us, and have also added our own spin to it. Choose between restricted and flashy combat playstyles.",
};

/* ─── Card 3: Wield Godlike Powers ─── */
const card3 = {
  label: "Combat",
  headingWords: ["Wield", "Godlike", "Powers"],
  video: "/Assets/Videos/Transformation.mp4",
  description:
    "Transform into powerful forms that grant you temporary abilities beyond normal combat. Enter one of many forms, such as the Feather Prism Form to gain enhanced mobility and ethereal attacks that phase through defenses. These transformations are brief but game-changing, requiring strategic timing to maximize their impact. Each form offers unique advantages that can turn the tide of battle when used at the right moment.",
};

/* ─── Reusable Combat Card ─── */
function CombatCard({ data, sectionRef, zIndex }) {
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const videoRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // 1. Label slide up
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", force3D: true }
    );

    // 2. Heading words slide up one by one
    const words = headingRef.current?.querySelectorAll(".combat-word");
    if (words && words.length > 0) {
      tl.fromTo(
        words,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.0,
          ease: "power4.out",
          force3D: true,
        },
        "-=0.4"
      );
    }

    // 3. Video fade in and scale up
    tl.fromTo(
      videoRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", force3D: true },
      "-=0.6"
    );

    // 4. Smooth slide up for description
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", force3D: true },
      "-=0.6"
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className={styles.combatCard}
      style={{ zIndex: zIndex }}
    >
      <div className={styles.combatInner}>
        {/* Label */}
        <div>
          <p ref={labelRef} className={styles.combatLabel}>
            {data.label}
          </p>

          {/* Heading — word by word slide up */}
          <h2 ref={headingRef} className={styles.combatHeading}>
            {data.headingWords.map((word, i) => (
              <span
                key={i}
                className="combat-word inline-block overflow-hidden"
                style={{ marginRight: "0.3em" }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Content: Video + Description */}
        <div className={styles.combatContent}>
          {/* Video */}
          <div ref={videoRef} className={styles.videoWrapper}>
            <video
              src={data.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={styles.videoElement}
            />
          </div>

          {/* Description — smooth slide up */}
          <div className={styles.descriptionBlock}>
            <div className="overflow-hidden">
              <p ref={descRef} className={styles.descriptionText}>
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Combat Section: Stacked Cards ─── */
export default function Combat() {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className={styles.combatSection}>
      {/* Card 1: Sticky — stays in place while card 2 slides over it */}
      <CombatCard data={card1} sectionRef={sectionRef} zIndex={1} />

      {/* Card 2: Overlays on top as you scroll */}
      <CombatCard data={card2} sectionRef={sectionRef} zIndex={2} />

      {/* Card 3: Overlays on top of Card 2 as you scroll */}
      <CombatCard data={card3} sectionRef={sectionRef} zIndex={3} />
    </div>
  );
}
