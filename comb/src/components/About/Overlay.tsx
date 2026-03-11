"use client";

import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

// ─── Scroll budget (out of 1000vh total) ──────────────────────────────────────
//   0%  → 45%  GSAP intro plays        (Section 1 entrance)
//  45%  → 56%  WAIT                    (Section 1 holds)
//  56%  → 60%  Section 1 fades OUT     (Framer)
//  60%  → 68%  WAIT
//  68%  → 80%  Section 2 fades IN & OUT
//  80%  → 82%  Black gap
//  82%  → 95%  Section 3 fades IN & OUT
//  95%  → 96%  Black gap
//  96%  → 100% Section 4 fades IN
// ─────────────────────────────────────────────────────────────────────────────

// SSR-safe hidden states applied as inline styles so elements are invisible
// on first paint before GSAP takes over.
const HIDDEN_WORD: React.CSSProperties = {
    opacity: 0,
    filter: "blur(18px)",
    transform: "translateY(28px) scale(1.06)",
    display: "inline",
};
const HIDDEN_CHAR: React.CSSProperties = {
    opacity: 0,
    filter: "blur(30px)",
    transform: "translateY(120px) rotateX(25deg)",
    display: "inline-block",
};


// ─── Real mouse parallax ─────────────────────────────────────────────────────
const useGlobalMouseParallax = () => {
    const [parallax, setParallax] = useState({
        rotateX: 0, rotateY: 0, xOffset: 0, yOffset: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;
            setParallax({
                rotateX: -dy * 3,
                rotateY: dx * 3,
                xOffset: dx * 8,
                yOffset: dy * 8,
            });
        };
        const handleMouseLeave = () =>
            setParallax({ rotateX: 0, rotateY: 0, xOffset: 0, yOffset: 0 });

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return parallax;
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const sec2ContainerRef = useRef<HTMLDivElement>(null);
    const sec2HeadingRef = useRef<HTMLHeadingElement>(null);
    const sec2TextRef = useRef<HTMLParagraphElement>(null);

    const sec3ContainerRef = useRef<HTMLDivElement>(null);
    const sec3HeadingRef = useRef<HTMLHeadingElement>(null);
    const sec3TextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !heroRef.current) return;

        // Stable height anchor — always exactly 1000vh regardless of content
        const totalHeight = () => window.innerHeight * 10;

        const ctx = gsap.context(() => {

            // ── Initial hidden state ──────────────────────────────────────────
            gsap.set(".main-blur-overlay", {
                backdropFilter: "blur(40px)", opacity: 1, backgroundColor: "transparent",
            });
            gsap.set(".reveal-hey-word-0, .reveal-hey-word-1", {
                opacity: 0, filter: "blur(18px)", y: 28, scale: 1.06,
            });
            gsap.set(".reveal-vamshi, .reveal-krishna", {
                opacity: 0, filter: "blur(30px)", y: 120, rotateX: 25, z: -150,
            });
            gsap.set(".reveal-sub-word", {
                opacity: 0, filter: "blur(18px)", y: 24, scale: 1.04,
            });

            gsap.set(".title-container", { letterSpacing: "0.15em" });

            // ── Section 1 scrubbed intro ──────────────────────────────────────
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current!,
                    start: "top top",
                    end: () => `+=${totalHeight() * 0.45}`,
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                },
            });

            tl.fromTo(".main-blur-overlay",
                { backdropFilter: "blur(40px)", opacity: 1 },
                { backdropFilter: "blur(0px)", opacity: 0, ease: "power2.inOut", duration: 2.5 }, 0.0
            );
            tl.fromTo(".reveal-hey-word-0",
                { opacity: 0, filter: "blur(18px)", y: 28, scale: 1.06 },
                { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, ease: "power2.out", duration: 3.0 }, 2.5
            );
            tl.fromTo(".reveal-hey-word-1",
                { opacity: 0, filter: "blur(18px)", y: 28, scale: 1.06 },
                { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, ease: "power2.out", duration: 3.0 }, 3.7
            );
            tl.fromTo(".reveal-vamshi",
                { opacity: 0, filter: "blur(30px)", y: 120, rotateX: 25, z: -150 },
                { opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, z: 0, stagger: 0.08, duration: 2.5, ease: "power4.out" }, 5.0
            );
            tl.fromTo(".reveal-krishna",
                { opacity: 0, filter: "blur(30px)", y: 120, rotateX: 25, z: -150 },
                { opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, z: 0, stagger: 0.08, duration: 2.5, ease: "power4.out" }, 6.3
            );
            tl.fromTo(".title-container",
                { letterSpacing: "0.15em" },
                { letterSpacing: "normal", duration: 2.5, ease: "power4.out" }, 5.0
            );
            tl.fromTo(".reveal-sub-word",
                { opacity: 0, filter: "blur(18px)", y: 24, scale: 1.04 },
                { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, ease: "power3.out", duration: 1.5, stagger: 0.08 }, 8.0
            );


            // ── Section 2 IN (62→70%) OUT (76→80%) ───────────────────────────
            if (sec2HeadingRef.current && sec2TextRef.current && sec2ContainerRef.current) {
                gsap.set(sec2ContainerRef.current, { visibility: "hidden" });
                gsap.set([sec2HeadingRef.current, sec2TextRef.current], { opacity: 0, filter: "blur(20px)" });

                const tl2In = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current!,
                        start: () => `top+=${totalHeight() * 0.62} top`,
                        end: () => `top+=${totalHeight() * 0.70} top`,
                        scrub: 1, invalidateOnRefresh: true,
                        onEnter: () => gsap.set(sec2ContainerRef.current, { visibility: "visible" }),
                        onLeaveBack: () => gsap.set(sec2ContainerRef.current, { visibility: "hidden" }),
                    },
                });
                tl2In.fromTo(sec2HeadingRef.current,
                    { opacity: 0, filter: "blur(20px)", scale: 0.8 },
                    { opacity: 1, filter: "blur(0px)", scale: 1, ease: "power3.out", duration: 1 }, 0
                );
                tl2In.fromTo(sec2TextRef.current,
                    { opacity: 0, filter: "blur(20px)", y: 40 },
                    { opacity: 1, filter: "blur(0px)", y: 0, ease: "power3.out", duration: 1 }, 0.5
                );

                const tl2Out = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current!,
                        start: () => `top+=${totalHeight() * 0.76} top`,
                        end: () => `top+=${totalHeight() * 0.80} top`,
                        scrub: 1, invalidateOnRefresh: true,
                        onLeave: () => gsap.set(sec2ContainerRef.current, { visibility: "hidden" }),
                        onEnterBack: () => gsap.set(sec2ContainerRef.current, { visibility: "visible" }),
                    },
                });
                tl2Out.to(sec2HeadingRef.current,
                    { opacity: 0, filter: "blur(20px)", scale: 0.95, ease: "power2.in", duration: 1 }, 0
                );
                tl2Out.to(sec2TextRef.current,
                    { opacity: 0, filter: "blur(20px)", y: -30, ease: "power2.in", duration: 1 }, 0
                );
            }

            // ── Section 3 IN (82→88%) OUT (91→95%) ───────────────────────────
            if (sec3HeadingRef.current && sec3TextRef.current && sec3ContainerRef.current) {
                gsap.set(sec3ContainerRef.current, { visibility: "hidden" });
                gsap.set([sec3HeadingRef.current, sec3TextRef.current], { opacity: 0, filter: "blur(20px)" });

                const tl3In = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current!,
                        start: () => `top+=${totalHeight() * 0.82} top`,
                        end: () => `top+=${totalHeight() * 0.88} top`,
                        scrub: 1, invalidateOnRefresh: true,
                        onEnter: () => gsap.set(sec3ContainerRef.current, { visibility: "visible" }),
                        onLeaveBack: () => gsap.set(sec3ContainerRef.current, { visibility: "hidden" }),
                    },
                });
                tl3In.fromTo(sec3HeadingRef.current,
                    { opacity: 0, filter: "blur(20px)", scale: 0.8 },
                    { opacity: 1, filter: "blur(0px)", scale: 1, ease: "power3.out", duration: 1 }, 0
                );
                tl3In.fromTo(sec3TextRef.current,
                    { opacity: 0, filter: "blur(20px)", y: 40 },
                    { opacity: 1, filter: "blur(0px)", y: 0, ease: "power3.out", duration: 1 }, 0.5
                );

                const tl3Out = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current!,
                        start: () => `top+=${totalHeight() * 0.91} top`,
                        end: () => `top+=${totalHeight() * 0.95} top`,
                        scrub: 1, invalidateOnRefresh: true,
                        onLeave: () => gsap.set(sec3ContainerRef.current, { visibility: "hidden" }),
                        onEnterBack: () => gsap.set(sec3ContainerRef.current, { visibility: "visible" }),
                    },
                });
                tl3Out.to(sec3HeadingRef.current,
                    { opacity: 0, filter: "blur(20px)", scale: 0.95, ease: "power2.in", duration: 1 }, 0
                );
                tl3Out.to(sec3TextRef.current,
                    { opacity: 0, filter: "blur(20px)", y: -30, ease: "power2.in", duration: 1 }, 0
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // ── Framer scroll progress ────────────────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80, damping: 25, mass: 1, restDelta: 0.001,
    });

    const bgOpacity = useTransform(smoothProgress, [0, 0.45], [0, 0.4]);
    // Framer owns the Section 1 wrapper; GSAP owns its children — no conflict
    const opacity1 = useTransform(smoothProgress, [0.56, 0.60], [1, 0]);
    const y1 = useTransform(smoothProgress, [0.56, 0.60], ["0px", "-60px"]);
    const opacity4 = useTransform(smoothProgress, [0.97, 1], [0, 1]);
    const y4 = useTransform(smoothProgress, [0.97, 1], ["80px", "0px"]);

    const { rotateX, rotateY, xOffset, yOffset } = useGlobalMouseParallax();

    const subtitleWords = "Turning curiosity into code — building real-world, performance-focused web applications.".split(" ");

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 h-[1000vh] w-full pointer-events-none z-20"
        >
            {/* ── Sticky viewport ─────────────────────────────────────────── */}
            <div
                className="sticky top-0 h-screen w-full overflow-clip"
                style={{ perspective: "1500px" }}
            >
                <motion.div
                    style={{ opacity: bgOpacity }}
                    className="absolute inset-0 bg-black/30 z-0 pointer-events-none"
                />

                {/* ============================================================
                    SECTION 1 — HERO

                    KEY FIX: padding is now a clamp() on the motion.div itself.
                    Previously padding was on ancestors that were absolute/inset-0
                    without explicit width, so Tailwind's px-* classes had no
                    effect. clamp() guarantees visible margin at every viewport.
                ============================================================ */}
                <motion.div
                    ref={heroRef}
                    className="absolute inset-0 flex flex-col justify-center z-10 pointer-events-auto"
                    style={{
                        opacity: opacity1,
                        y: y1,
                        overflow: "visible",
                        paddingLeft: "max(2rem, 6vw)",
                        paddingRight: "max(2rem, 6vw)",
                    }}
                >
                    <div className="main-blur-overlay absolute inset-0 z-50 pointer-events-none" />

                    <motion.div
                        className="max-w-5xl relative z-10"
                        style={{
                            rotateX, rotateY,
                            x: xOffset, y: yOffset,
                            transformStyle: "preserve-3d",
                        }}
                        transition={SPRING}
                    >
                        {/* "Hey, I'm" */}
                        <div
                            aria-label="Hey, I'm"
                            style={{ display: "flex", gap: "0.4em", marginBottom: "clamp(0.375rem, 1.2vw, 1.25rem)", marginLeft: "0.25rem" }}
                        >
                            {["Hey,", "I'm"].map((word, i) => (
                                <span
                                    key={word}
                                    className={`reveal-hey-word-${i} font-sans font-medium text-gray-700 tracking-wider`}
                                    style={{
                                        ...HIDDEN_WORD,
                                        fontSize: "clamp(1rem, 2vw, 1.5rem)",
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>

                        {/* Name block */}
                        <div
                            className="relative"
                            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                        >
                            {/* VAMSHI */}
                            <div
                                className="title-container leading-none flex"
                                style={{ overflow: "visible" }}
                                aria-label="VAMSHI"
                            >
                                {"VAMSHI".split("").map((char, i) => (
                                    <span
                                        key={`v-${i}`}
                                        className="reveal-vamshi font-black tracking-tighter text-black uppercase"
                                        style={{
                                            ...HIDDEN_CHAR,
                                            fontSize: "clamp(3.5rem, 10vw, 9rem)",
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>

                            {/* KRISHNA — indented right for stagger effect */}
                            <div
                                className="title-container leading-none flex"
                                style={{
                                    overflow: "visible",
                                    paddingLeft: "clamp(0.75rem, 2.5vw, 3rem)",
                                    marginTop: "clamp(-6px, -1vw, -20px)",
                                }}
                                aria-label="KRISHNA"
                            >
                                {"KRISHNA".split("").map((char, i) => (
                                    <span
                                        key={`k-${i}`}
                                        className="reveal-krishna font-black tracking-tighter text-black uppercase"
                                        style={{
                                            ...HIDDEN_CHAR,
                                            fontSize: "clamp(3.5rem, 10vw, 9rem)",
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Subtitle
                            KEY FIX: words are inline spans inside a normal-flow <p>,
                            with a text space character between each span. The old
                            approach (inline-block + mr-[0.28em]) collapsed word gaps
                            because inline-block elements don't preserve whitespace. */}
                        <div
                            className="max-w-2xl border-l-4 border-black/40 pl-6"
                            style={{
                                overflow: "visible",
                                marginTop: "clamp(1.5rem, 3vw, 3rem)",
                            }}
                        >
                            <p
                                className="m-0 p-0 font-light text-gray-700"
                                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: "1.9", paddingLeft: "0.5rem" }}
                            >
                                {subtitleWords.map((word, i) => (
                                    <React.Fragment key={i}>
                                        <span className="reveal-sub-word" style={HIDDEN_WORD}>
                                            {word}
                                        </span>
                                        {/* Literal space so words don't merge */}
                                        {i < subtitleWords.length - 1 && " "}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>


                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer z-20"
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                    >
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 mb-4 font-medium whitespace-nowrap">
                            Scroll to explore
                        </p>
                        <div className="w-[1px] h-12 md:h-16 bg-black/10 relative overflow-hidden">
                            <motion.div
                                animate={{ y: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-full h-1/2 bg-gradient-to-b from-transparent via-black/60 to-transparent absolute top-0 left-0"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* ============================================================
                    SECTION 2 — Left-aligned, fluid width
                ============================================================ */}
                <div
                    ref={sec2ContainerRef}
                    className="absolute inset-0 flex flex-col justify-center z-10 pointer-events-none"
                    style={{ paddingLeft: "max(2rem, 6vw)" }}
                >
                    <div style={{ width: "clamp(260px, 42vw, 500px)" }} className="flex flex-col items-start text-left">
                        <h2
                            ref={sec2HeadingRef}
                            className="font-black tracking-tight text-black uppercase leading-tight"
                            style={{ opacity: 0, filter: "blur(20px)", fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                        >
                            I build{" "}
                            <span className="text-[#E63946]">digital<br />experiences.</span>
                        </h2>
                        <p
                            ref={sec2TextRef}
                            className="text-gray-700 border-l-4 border-[#E63946] font-light leading-relaxed"
                            style={{ opacity: 0, filter: "blur(20px)", marginTop: "1.25rem", fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)", paddingLeft: "1.25rem", lineHeight: "1.8" }}
                        >
                            Crafting ultra-smooth scrolling, immersive interfaces, and seamless interactions using modern web technologies.
                        </p>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 3 — Right-aligned, fluid width
                ============================================================ */}
                <div
                    ref={sec3ContainerRef}
                    className="absolute inset-0 flex flex-col justify-center items-end z-10 pointer-events-none"
                    style={{ paddingRight: "max(3rem, 8vw)" }}
                >
                    <div style={{ width: "clamp(260px, 42vw, 500px)" }} className="flex flex-col items-end text-right">
                        <h2
                            ref={sec3HeadingRef}
                            className="font-black tracking-tight text-black uppercase leading-tight"
                            style={{ opacity: 0, filter: "blur(20px)", fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                        >
                            Bridging{" "}
                            <span className="text-gray-500">design</span>{" "}&amp;{" "}engineering.
                        </h2>
                        <p
                            ref={sec3TextRef}
                            className="text-gray-700 border-r-4 border-gray-400 font-light leading-relaxed"
                            style={{ opacity: 0, filter: "blur(20px)", marginTop: "1.25rem", fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)", paddingRight: "1.25rem", lineHeight: "1.8" }}
                        >
                            I transform ideas into polished, highly-performant interactive realities that defy gravity.
                        </p>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 4 — Centered CTA
                    Dark scrim guarantees white text legibility
                ============================================================ */}
                <motion.div
                    style={{ opacity: opacity4, y: y4 }}
                    className="absolute inset-0 flex flex-col justify-end items-center pb-24 md:pb-32 text-center pointer-events-auto z-10"
                >
                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    <p
                        className="relative text-xl md:text-2xl font-light text-white tracking-[0.2em] uppercase border-b border-transparent hover:border-white transition-colors cursor-pointer z-10"
                        onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" })}
                    >
                        SCROLL DOWN TO KNOW MORE
                    </p>
                    <div className="relative mt-10 md:mt-12 w-[1px] h-24 md:h-32 bg-gradient-to-b from-white/60 to-transparent mx-auto z-10" />
                </motion.div>
            </div>
        </div>
    );
}