"use client";

import React, { useRef, useState, useEffect, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./ScrollGallery.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const VISHWAPUR_IMAGES = [
    {
        src: "/Assets/Images/VISHWAPUR_ASSET1.png",
        titleLine1: "Step into an",
        titleLine2: "Alternate India",
        description: "A reimagined India shaped by myth and memory. Experience India across time, space, and the three Lokas.",
    },
    {
        src: "/Assets/Images/VISHWAPUR_ASSET2.png",
        titleLine1: "Play as",
        titleLine2: "Vikram",
        description: "Arrogant at first, Vikram has to go through many trials and tribulations. Experience the journey of a hero who first corrects his path by gaining wisdom, and then strength.",
    },
    {
        src: "/Assets/Images/VISHWAPUR_ASSET3.png",
        titleLine1: "",
        titleLine2: "Thousands of Scanned Assets",
        description: "Authentic assets and materials with high fidelity, captured using high end cameras from various towns across India.",
    },
    {
        src: "/Assets/Images/VISHWAPUR_ASSET4.png",
        titleLine1: "Learn about",
        titleLine2: "The Lore Of Vishwapur",
        description: "Why are you here? Why is the town of Vishwapur almost deserted? The boundary between Naraka (hell) and Earth has broken, and you are the only one that can stop it.",
    },
];

/* ─── Word-wrap helper for canvas text ─── */
function wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (ctx.measureText(testLine).width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

/* ─── Generate both base and hover CanvasTextures per image ─── */
function useCardTextures(images) {
    const [textureData, setTextureData] = useState(null);

    useEffect(() => {
        let dead = false;
        const W = 840, H = 560;

        Promise.all(
            images.map(
                (img) =>
                    new Promise((res) => {
                        const el = new Image();
                        el.crossOrigin = "anonymous";
                        el.onload = () => {
                            // ─── Draw flipped base image with rounded corners ───
                            const RADIUS = 24; // ~10px at display scale
                            const drawFlippedImage = (canvas, ctx) => {
                                const sa = el.width / el.height, da = W / H;
                                let sx = 0, sy = 0, sw = el.width, sh = el.height;
                                if (sa > da) { sw = el.height * da; sx = (el.width - sw) / 2; }
                                else { sh = el.width / da; sy = (el.height - sh) / 2; }

                                // Clear with white bg for rounded corner transparency
                                ctx.clearRect(0, 0, W, H);

                                // Clip to rounded rectangle
                                ctx.save();
                                ctx.beginPath();
                                ctx.roundRect(0, 0, W, H, RADIUS);
                                ctx.clip();

                                // Flip horizontally and draw
                                ctx.translate(W, 0);
                                ctx.scale(-1, 1);
                                ctx.drawImage(el, sx, sy, sw, sh, 0, 0, W, H);
                                ctx.restore();
                            };

                            // ── Base texture (no text overlay) ──
                            const cBase = document.createElement("canvas");
                            cBase.width = W; cBase.height = H;
                            const ctxBase = cBase.getContext("2d");
                            drawFlippedImage(cBase, ctxBase);

                            const tBase = new THREE.CanvasTexture(cBase);
                            tBase.colorSpace = THREE.SRGBColorSpace;
                            tBase.minFilter = THREE.LinearFilter;

                            // ── Hover texture (with dark overlay + text) ──
                            const cHover = document.createElement("canvas");
                            cHover.width = W; cHover.height = H;
                            const ctxHover = cHover.getContext("2d");
                            drawFlippedImage(cHover, ctxHover);

                            // Re-apply rounded clip for overlay + text
                            ctxHover.save();
                            ctxHover.beginPath();
                            ctxHover.roundRect(0, 0, W, H, RADIUS);
                            ctxHover.clip();

                            // Dark overlay for text readability
                            const g = ctxHover.createLinearGradient(0, 0, 0, H);
                            g.addColorStop(0, "rgba(0,0,0,0.15)");
                            g.addColorStop(0.3, "rgba(0,0,0,0.5)");
                            g.addColorStop(0.6, "rgba(0,0,0,0.7)");
                            g.addColorStop(1, "rgba(0,0,0,0.85)");
                            ctxHover.fillStyle = g;
                            ctxHover.fillRect(0, 0, W, H);

                            // Text rendering
                            ctxHover.shadowColor = "rgba(0,0,0,0.8)";
                            ctxHover.shadowBlur = 12;
                            ctxHover.textAlign = "left";

                            let textY = H * 0.38;

                            // Title line 1 (smaller, lighter)
                            if (img.titleLine1) {
                                ctxHover.fillStyle = "rgba(255,255,255,0.7)";
                                ctxHover.font = "500 28px 'Inter', 'Outfit', Arial, sans-serif";
                                ctxHover.fillText(img.titleLine1, 40, textY);
                                textY += 48;
                            }

                            // Title line 2 (large, bold)
                            ctxHover.fillStyle = "#ffffff";
                            ctxHover.font = "bold 42px 'Inter', 'Outfit', Arial, sans-serif";
                            ctxHover.fillText(img.titleLine2, 40, textY);
                            textY += 52;

                            // Description (wrapped, smaller)
                            ctxHover.fillStyle = "rgba(255,255,255,0.65)";
                            ctxHover.font = "400 20px 'Inter', 'Outfit', Arial, sans-serif";
                            ctxHover.shadowBlur = 6;
                            const descLines = wrapText(ctxHover, img.description, W - 80);
                            for (const line of descLines) {
                                ctxHover.fillText(line, 40, textY);
                                textY += 28;
                            }

                            ctxHover.restore();

                            const tHover = new THREE.CanvasTexture(cHover);
                            tHover.colorSpace = THREE.SRGBColorSpace;
                            tHover.minFilter = THREE.LinearFilter;

                            res({ base: tBase, hover: tHover });
                        };
                        el.onerror = () => {
                            const c = document.createElement("canvas");
                            c.width = W; c.height = H;
                            const ctx = c.getContext("2d");
                            ctx.fillStyle = "#101015";
                            ctx.fillRect(0, 0, W, H);
                            ctx.fillStyle = "#ffffff";
                            ctx.font = "bold 28px Arial";
                            ctx.textAlign = "center";
                            ctx.fillText(img.titleLine2, W / 2, H / 2);
                            const t = new THREE.CanvasTexture(c);
                            res({ base: t, hover: t });
                        };
                        el.src = img.src;
                    })
            )
        ).then((r) => {
            if (!dead) setTextureData(r);
        });

        return () => { dead = true; };
    }, [images]);

    return textureData;
}

/* ─── Carousel: horizontal scrolling strip with cylindrical bend + hover raycasting ─── */
function CarouselScene({
    images,
    curvature,
    cardWidth,
    cardHeight,
    gap,
    speed,
}) {
    const meshes = useRef([]);
    const textureData = useCardTextures(images);
    const offsetRef = useRef(0);
    const hovRef = useRef(false);
    const dragRef = useRef(false);
    const dragSX = useRef(0);
    const dragOff = useRef(0);
    const hoveredCard = useRef(-1);
    const raycaster = useRef(new THREE.Raycaster());
    const pointer = useRef(new THREE.Vector2(9999, 9999));
    const n = images.length;
    const spacing = cardWidth + gap;
    const totalW = n * spacing;
    const R = curvature;

    const { gl, camera } = useThree();

    useFrame((_, delta) => {
        // Auto scroll
        if (!dragRef.current) {
            const s = hovRef.current ? speed * 0.15 : speed;
            offsetRef.current -= s * delta;
        }

        // Wrap
        while (offsetRef.current < -totalW) offsetRef.current += totalW;
        while (offsetRef.current > 0) offsetRef.current -= totalW;

        // Position each card on the curved path
        for (let idx = 0; idx < 3 * n; idx++) {
            const mesh = meshes.current[idx];
            if (!mesh) continue;

            const copy = Math.floor(idx / n) - 1;
            const i = idx % n;

            const linearX = i * spacing + copy * totalW + offsetRef.current;
            const angle = linearX / R;
            const x = R * Math.sin(angle);
            const z = R * Math.cos(angle) - R;

            mesh.position.set(x, 0, z);
            mesh.rotation.set(0, angle, 0);

            // Center pop scale
            const dist = Math.abs(angle);
            const t = Math.min(dist / 1.0, 1);
            const sc = THREE.MathUtils.lerp(1.08, 0.8, t);
            mesh.scale.set(sc, sc, 1);

            const mat = mesh.material;
            mat.opacity = 1.0;
            const br = THREE.MathUtils.lerp(1.0, 0.85, t);
            if (mat?.color) mat.color.setScalar(br);

            mesh.visible = dist < Math.PI * 0.8;
        }

        // Raycast for hover detection
        if (textureData && !dragRef.current) {
            raycaster.current.setFromCamera(pointer.current, camera);
            const visibleMeshes = meshes.current.filter(m => m && m.visible);
            const intersects = raycaster.current.intersectObjects(visibleMeshes, false);

            let newHovered = -1;
            if (intersects.length > 0) {
                const hit = intersects[0].object;
                const hitIdx = meshes.current.indexOf(hit);
                if (hitIdx >= 0) {
                    newHovered = hitIdx % n;
                }
            }

            // Swap textures when hover state changes
            if (newHovered !== hoveredCard.current) {
                // Restore old hovered card to base texture
                if (hoveredCard.current >= 0 && textureData[hoveredCard.current]) {
                    for (let copy = 0; copy < 3; copy++) {
                        const mesh = meshes.current[copy * n + hoveredCard.current];
                        if (mesh) mesh.material.map = textureData[hoveredCard.current].base;
                    }
                }
                // Set new hovered card to hover texture
                if (newHovered >= 0 && textureData[newHovered]) {
                    for (let copy = 0; copy < 3; copy++) {
                        const mesh = meshes.current[copy * n + newHovered];
                        if (mesh) mesh.material.map = textureData[newHovered].hover;
                    }
                }
                hoveredCard.current = newHovered;
            }
        }
    });

    // Drag + hover + pointer tracking events
    useEffect(() => {
        const c = gl.domElement;

        const down = (e) => {
            dragRef.current = true;
            dragSX.current = e.clientX;
            dragOff.current = offsetRef.current;
            c.setPointerCapture(e.pointerId);
        };

        const move = (e) => {
            // Update pointer for raycasting
            const rect = c.getBoundingClientRect();
            pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            if (dragRef.current) {
                offsetRef.current = dragOff.current + (e.clientX - dragSX.current) * 0.02;
            }
        };

        const up = () => { dragRef.current = false; };
        const ent = () => { hovRef.current = true; };
        const lv = () => {
            hovRef.current = false;
            dragRef.current = false;
            pointer.current.set(9999, 9999); // Move pointer off-screen to deselect
        };

        c.addEventListener("pointerdown", down);
        c.addEventListener("pointermove", move);
        c.addEventListener("pointerup", up);
        c.addEventListener("pointercancel", up);
        c.addEventListener("mouseenter", ent);
        c.addEventListener("mouseleave", lv);

        return () => {
            c.removeEventListener("pointerdown", down);
            c.removeEventListener("pointermove", move);
            c.removeEventListener("pointerup", up);
            c.removeEventListener("pointercancel", up);
            c.removeEventListener("mouseenter", ent);
            c.removeEventListener("mouseleave", lv);
        };
    }, [gl]);

    if (!textureData || textureData.length !== n) return null;

    const cards = [];
    for (let copy = -1; copy <= 1; copy++) {
        for (let i = 0; i < n; i++) {
            const idx = (copy + 1) * n + i;
            cards.push(
                <mesh
                    key={`${copy}-${i}`}
                    ref={(el) => { meshes.current[idx] = el; }}
                >
                    <planeGeometry args={[cardWidth, cardHeight]} />
                    <meshBasicMaterial
                        map={textureData[i].base}
                        side={THREE.FrontSide}
                        toneMapped={false}
                        transparent={true}
                    />
                </mesh>
            );
        }
    }

    return <>{cards}</>;
}

const headingLines = [
    "Welcome to Vishwapur"
];

/* ─── Main Component ─── */
export default function DeepDiveSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    // Smooth slide-up animation when section comes on screen
    useGSAP(() => {
        const heading = headingRef.current;
        if (heading) {
            gsap.fromTo(
                heading,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className={styles["gallery3d-wrapper"]} style={{ background: "#ffffff", minHeight: "calc(100vh + 16rem)", paddingTop: "15rem" }}>
            {/* Header — word-by-word animated, same style as About section */}
            <div className="absolute top-32 md:top-40 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none select-none w-full px-4">
                <h2
                    ref={headingRef}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] uppercase tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-geist-sans), 'Outfit', 'Inter', system-ui, -apple-system, sans-serif" }}
                >
                    {headingLines.map((line, lineIndex) => (
                        <div key={lineIndex} className="block overflow-hidden pb-1 relative">
                            {line.split(" ").map((word, wordIndex) => (
                                <span
                                    key={`${lineIndex}-${wordIndex}`}
                                    className="word inline-block mr-[0.25em] text-[#0a0a0a]"
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    ))}
                </h2>
            </div>

            {/* 3D WebGL Canvas */}
            <div className={styles["gallery3d-canvas"]} style={{ top: "8rem" }}>
                <Canvas camera={{ position: [0, 0, 4.8], fov: 55, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true }}>
                    <Suspense fallback={null}>
                        <CarouselScene
                            images={VISHWAPUR_IMAGES}
                            curvature={19}
                            cardWidth={2.8}
                            cardHeight={1.85}
                            gap={0.5}
                            speed={1.2}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
