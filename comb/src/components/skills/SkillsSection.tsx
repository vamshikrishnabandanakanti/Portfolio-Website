"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
    { name: "React", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054631/react_lystbx.png", accent: "#0ea5e9", dark: "#0369a1" },
    { name: "TypeScript", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054631/typescript_isqemi.png", accent: "#3178C6", dark: "#1e4d8c" },
    { name: "Node.js", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054630/nodejs_hf2m5v.png", accent: "#16a34a", dark: "#14532d" },
    { name: "Python", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773057970/python_tlu5p1.png", accent: "#ca8a04", dark: "#713f12" },
    { name: "Tailwind", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054631/tailwind_bxyk5p.png", accent: "#0891b2", dark: "#164e63" },
    { name: "JavaScript", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054165/javascript_ut8wob.png", accent: "#b45309", dark: "#78350f" },
    { name: "MongoDB", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054631/mongo-db_e8wzg6.png", accent: "#15803d", dark: "#14532d" },
    { name: "HTML", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054168/html_xe3zux.png", accent: "#ea580c", dark: "#7c2d12" },
    { name: "CSS", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054165/css_muwpri.png", accent: "#2563eb", dark: "#1e3a8a" },
    { name: "SQL", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054168/sql_nbpyic.png", accent: "#7c3aed", dark: "#4c1d95" },
    { name: "SQLite", image: "https://res.cloudinary.com/douw67vte/image/upload/v1773054630/sqlite_mo6pfp.png", accent: "#475569", dark: "#1e293b" },
];

const POSITIONS = [
    { x: 15, y: 14 }, { x: 55, y: 8 }, { x: 82, y: 18 },
    { x: 28, y: 38 }, { x: 68, y: 34 }, { x: 88, y: 52 },
    { x: 8, y: 60 }, { x: 44, y: 62 }, { x: 76, y: 70 },
    { x: 22, y: 82 }, { x: 60, y: 85 },
];

/* ── Floating dust dots ── */
function DustField() {
    const dots = useRef(
        Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: 1.5 + Math.random() * 3,
            base: 0.05 + Math.random() * 0.14,
            dur: 2.5 + Math.random() * 4,
            delay: Math.random() * 5,
        }))
    ).current;

    return (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
            {dots.map(d => (
                <motion.div
                    key={d.id}
                    style={{
                        position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
                        width: d.r, height: d.r, borderRadius: "50%",
                        background: "#a8b4c8",
                    }}
                    animate={{ opacity: [d.base, d.base * 0.15, d.base] }}
                    transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
                />
            ))}
        </div>
    );
}

/* ── Drifting streak (light mode "shooting star") ── */
function Streaks() {
    const [shots, setShots] = useState<{ id: number; y: number }[]>([]);
    useEffect(() => {
        const fire = () => {
            setShots(p => [...p, { id: Date.now(), y: 10 + Math.random() * 70 }]);
            setTimeout(fire, 4000 + Math.random() * 6000);
        };
        const t = setTimeout(fire, 3000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
            {shots.map(s => (
                <motion.div
                    key={s.id}
                    style={{
                        position: "absolute", top: `${s.y}%`, left: "-5%",
                        width: 70, height: 1,
                        background: "linear-gradient(to right, transparent, rgba(100,120,160,0.4), transparent)",
                        borderRadius: 1,
                    }}
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: "110vw", opacity: [0, 0.7, 0] }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    onAnimationComplete={() => setShots(p => p.filter(x => x.id !== s.id))}
                />
            ))}
        </div>
    );
}

/* ── Single orb ── */
function Orb({
    skill, index, hovered, onEnter, onLeave,
}: {
    skill: typeof skills[0];
    index: number;
    hovered: number | null;
    onEnter: (i: number) => void;
    onLeave: () => void;
}) {
    const isActive = hovered === index;
    const isMuted = hovered !== null && !isActive;
    const pos = POSITIONS[index];

    const ax = 10 + (index % 5) * 3;
    const ay = 8 + (index % 4) * 2.5;
    const tx = 5 + index * 1.3;
    const ty = 6 + index * 1.1;
    const ph = index * 0.55;

    const SIZE_IDLE = 76;
    const SIZE_ACTIVE = 115;

    return (
        <motion.div
            style={{
                position: "absolute",
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                zIndex: isActive ? 40 : 10,
                cursor: "pointer",
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                x: isActive ? 0 : [`0px`, `${ax}px`, `${-ax * 0.5}px`, `${ax * 0.3}px`, `0px`],
                y: isActive ? 0 : [`0px`, `${ay}px`, `${ay * 0.6}px`, `${-ay * 0.4}px`, `0px`],
                opacity: isMuted ? 0.15 : 1,
                scale: isMuted ? 0.72 : 1,
            }}
            transition={isActive
                ? { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                : {
                    x: { duration: tx, repeat: Infinity, ease: "easeInOut", delay: ph },
                    y: { duration: ty, repeat: Infinity, ease: "easeInOut", delay: ph * 0.8 },
                    opacity: { duration: 0.45 },
                    scale: { duration: 0.4 },
                }
            }
            onMouseEnter={() => onEnter(index)}
            onMouseLeave={onLeave}
        >
            {/* Soft ambient glow */}
            <motion.div
                style={{
                    position: "absolute", borderRadius: "50%", pointerEvents: "none",
                    background: `radial-gradient(circle, ${skill.accent}28 0%, transparent 72%)`,
                    top: "50%", left: "50%", translateX: "-50%", translateY: "-50%",
                }}
                animate={{ width: isActive ? 220 : 90, height: isActive ? 220 : 90 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Orbit rings */}
            <AnimatePresence>
                {isActive && [110, 158].map((sz, ri) => (
                    <motion.div key={ri}
                        style={{
                            position: "absolute",
                            width: sz, height: sz,
                            top: "50%", left: "50%",
                            translateX: "-50%", translateY: "-50%",
                            borderRadius: "50%",
                            border: `1px solid ${skill.accent}${ri === 0 ? "55" : "28"}`,
                            pointerEvents: "none",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: ri === 0 ? 360 : -360 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.3 },
                            rotate: { duration: ri === 0 ? 5 : 8, repeat: Infinity, ease: "linear" },
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Orb disc */}
            <motion.div
                style={{
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isActive
                        ? `radial-gradient(circle at 35% 32%, #ffffff, #f0f4ff)`
                        : `radial-gradient(circle at 35% 32%, #ffffff, #eef2f8)`,
                    position: "relative",
                    flexShrink: 0,
                }}
                animate={{
                    width: isActive ? SIZE_ACTIVE : SIZE_IDLE,
                    height: isActive ? SIZE_ACTIVE : SIZE_IDLE,
                    boxShadow: isActive
                        ? `0 0 0 2px ${skill.accent}, 0 8px 40px ${skill.accent}45, 0 20px 60px ${skill.accent}20, 0 4px 16px rgba(0,0,0,0.1)`
                        : `0 0 0 1.5px ${skill.accent}30, 0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)`,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.img
                    src={skill.image} alt={skill.name}
                    style={{ objectFit: "contain", pointerEvents: "none", display: "block" }}
                    animate={{
                        width: isActive ? 66 : 42,
                        height: isActive ? 66 : 42,
                        filter: isActive ? "none" : "grayscale(0.3) brightness(0.85)",
                    }}
                    transition={{ duration: 0.4 }}
                />
            </motion.div>

            {/* Name tag */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    translateX: "-50%",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    textAlign: "center",
                    fontFamily: "'DM Mono', monospace",
                }}
                animate={{ opacity: isActive ? 1 : isMuted ? 0 : 0.4 }}
                transition={{ duration: 0.3 }}
            >
                <span style={{
                    fontSize: isActive ? 11 : 9,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? skill.dark : "#8896aa",
                    fontWeight: isActive ? 500 : 400,
                    transition: "all 0.3s",
                }}>
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    );
}

/* ── Main ── */
export default function SkillsSection() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [size, setSize] = useState({ w: 800, h: 500 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const obs = new ResizeObserver(([e]) => {
            setSize({ w: e.contentRect.width, h: e.contentRect.height });
        });
        if (containerRef.current) obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = containerRef.current!.getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    }, []);

    const px = (mouse.x - 0.5) * 14;
    const py = (mouse.y - 0.5) * 10;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

            <section style={{
                width: "100%", minHeight: "100vh",
                background: "#f4f6fb",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "60px 24px",
                fontFamily: "'Syne', sans-serif",
            }}>

                {/* Header */}
                <motion.div
                    style={{ textAlign: "center", marginBottom: 48, zIndex: 2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div style={{
                        fontFamily: "'DM Mono', monospace", fontSize: 10,
                        letterSpacing: "0.4em", color: "#a0aab8",
                        textTransform: "uppercase", marginBottom: 12,
                    }}>
            // tech stack
                    </div>
                    <h2 style={{
                        fontSize: "clamp(2.2rem, 5vw, 4rem)",
                        fontWeight: 800, color: "#0f172a",
                        letterSpacing: "-0.04em", lineHeight: 1,
                    }}>
                        My Skills
                    </h2>
                </motion.div>

                {/* Container */}
                <motion.div
                    ref={containerRef}
                    onMouseMove={onMouseMove}
                    onMouseLeave={() => { setHovered(null); setMouse({ x: 0.5, y: 0.5 }); }}
                    style={{
                        position: "relative",
                        width: "100%", maxWidth: 900,
                        aspectRatio: "16 / 9",
                        borderRadius: 20,
                        overflow: "hidden",
                        border: "1px solid #dde3ee",
                        background: "#eef2f8",
                        boxShadow: "0 2px 0 #fff inset, 0 20px 80px rgba(15,23,42,0.1), 0 4px 16px rgba(15,23,42,0.06)",
                    }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Soft gradient atmosphere */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                        background: `
              radial-gradient(ellipse at 18% 22%, #dbeafe80 0%, transparent 50%),
              radial-gradient(ellipse at 80% 75%, #ede9fe80 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, #f0f4ff 0%, #e8edf8 100%)
            `,
                    }} />

                    {/* Grid lines */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                        backgroundImage: `linear-gradient(rgba(100,116,139,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.05) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }} />

                    {/* Soft inner vignette */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
                        background: "radial-gradient(ellipse at 50% 50%, transparent 42%, #e2e8f055 100%)",
                    }} />

                    <DustField />
                    <Streaks />

                    {/* Parallax layer */}
                    <motion.div
                        style={{ position: "absolute", inset: 0, zIndex: 10 }}
                        animate={{ x: px, y: py }}
                        transition={{ type: "spring", stiffness: 40, damping: 18 }}
                    >
                        {skills.map((skill, i) => (
                            <Orb
                                key={skill.name}
                                skill={skill}
                                index={i}
                                hovered={hovered}
                                onEnter={setHovered}
                                onLeave={() => setHovered(null)}
                            />
                        ))}
                    </motion.div>

                    {/* Active skill name — bottom reveal */}
                    <AnimatePresence>
                        {hovered !== null && (
                            <motion.div
                                key={hovered}
                                style={{
                                    position: "absolute", bottom: 24, left: "50%",
                                    translateX: "-50%",
                                    zIndex: 50, textAlign: "center", pointerEvents: "none",
                                }}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div style={{
                                    fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                                    fontWeight: 800, letterSpacing: "-0.04em",
                                    color: skills[hovered].dark,
                                    lineHeight: 1,
                                }}>
                                    {skills[hovered].name}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Idle hint */}
                    <AnimatePresence>
                        {hovered === null && (
                            <motion.div
                                style={{
                                    position: "absolute", inset: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    zIndex: 5, pointerEvents: "none",
                                }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div style={{
                                    fontFamily: "'DM Mono', monospace", fontSize: 10,
                                    letterSpacing: "0.35em", color: "#c4cdd8",
                                    textTransform: "uppercase",
                                }}>
                                    hover to explore
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Corner brackets */}
                    {[
                        { top: 14, left: 14, borderTop: "1.5px solid", borderLeft: "1.5px solid" },
                        { top: 14, right: 14, borderTop: "1.5px solid", borderRight: "1.5px solid" },
                        { bottom: 14, left: 14, borderBottom: "1.5px solid", borderLeft: "1.5px solid" },
                        { bottom: 14, right: 14, borderBottom: "1.5px solid", borderRight: "1.5px solid" },
                    ].map((s, i) => (
                        <div key={i} style={{ position: "absolute", width: 18, height: 18, borderColor: "#c8d2e0", zIndex: 20, pointerEvents: "none", ...s }} />
                    ))}

                    {/* Count badge */}
                    <div style={{
                        position: "absolute", top: 16, left: "50%", translateX: "-50%",
                        fontFamily: "'DM Mono', monospace", fontSize: 9,
                        letterSpacing: "0.3em", color: "#c4cdd8",
                        zIndex: 20, textTransform: "uppercase",
                    }}>
                        {skills.length} technologies
                    </div>
                </motion.div>

                {/* Skill name list below */}
                <motion.div
                    style={{
                        display: "flex", flexWrap: "wrap",
                        gap: "6px 18px", justifyContent: "center",
                        marginTop: 32, maxWidth: 900,
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    {skills.map((s, i) => (
                        <motion.span
                            key={s.name}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "default" }}
                            animate={{ color: hovered === i ? s.dark : "#c4cdd8" }}
                            transition={{ duration: 0.3 }}
                        >
                            {s.name}
                        </motion.span>
                    ))}
                </motion.div>
            </section>
        </>
    );
}