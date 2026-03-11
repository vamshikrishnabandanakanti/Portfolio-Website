"use client";

import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useAnimationFrame,
    AnimatePresence,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GlowCard } from "../ui/spotlight-card";

const FONT_LINK =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap";

const SLIDES = [
    {
        id: "01",
        chapter: "ORIGIN",
        accent: "#C9A96E",
        text: "",
        keyword: "Student",
        year: "2024",
        tags: ["NIAT", "BITS Pilani", "CS"],
    },
    {
        id: "02",
        chapter: "PASSION",
        accent: "#E07B6A",
        text: "I am passionate about building real-world solutions using technology. My interests span Artificial Intelligence, Machine Learning, and Full-Stack Development.",
        keyword: "Builder",
        year: "2025",
        tags: ["Full-Stack", "Artificial Intelligence", "Machine Learning"],
    },
    {
        id: "03",
        chapter: "CRAFT",
        accent: "#6A9FE0",
        text: "I'm a creative developer who loves turning ideas into visually engaging digital experiences. Before building anything, I imagine how it can be crafted more creatively — especially through modern UI and 3D web design.",
        keyword: "Creator",
        year: "2026",
        tags: ["3D Experiences", "Creative Coding", "Modern UI"],
    },
    {
        id: "04",
        chapter: "FUTURE",
        accent: "#6EC99A",
        text: "Currently I'm deepening my skills in Full-Stack Development while experimenting with new ideas and technologies to build more creative and useful projects.",
        keyword: "Explorer",
        year: "2026+",
        tags: ["Ideas", "Experiments", "Growth", "Curiosity"],
    },
];

const PHOTO =
    "https://res.cloudinary.com/douw67vte/image/upload/v1729139059/Screenshot_2024-08-17_175531_rwjser.png";

const MARQUEE_CONTENT =
    "VAMSHI KRISHNA · CREATIVE DEV · BITS PILANI · NIAT · AI · ML · FULL-STACK · ";

// ── College paragraph texts ────────────────────────────────────────────────────
const NIAT_TEXT =
    "Hello, I’m Vamshi Krishna, a second-year student at NIAT (NxtWave Institute of Advanced Technologies). I’m building strong Full-Stack development skills through hands-on learning and real-world projects.";
const BITS_TEXT =
    "I’m pursuing a BSc in Computer Science from BITS Pilani, building a strong foundation in programming, algorithms, and system design.";

// ── Soft gradients ─────────────────────────────────────────────────────────────
const NIAT_BG = [
    "radial-gradient(ellipse 140% 90% at 20% 10%, #ffe4e6cc 0%, transparent 50%)",
    "radial-gradient(ellipse 100% 120% at 90% 85%, #fecdd3aa 0%, transparent 55%)",
    "radial-gradient(ellipse 70% 60% at 55% 50%, #fff1f2bb 0%, transparent 60%)",
    "radial-gradient(ellipse 50% 40% at 80% 15%, #fda4af55 0%, transparent 45%)",
    "linear-gradient(145deg, #fff5f6 0%, #ffe4e8 30%, #fecdd5 60%, #ffd6db 85%, #fff0f2 100%)",
].join(", ");

const BITS_BG = [
    "radial-gradient(ellipse 140% 90% at 80% 10%, #bae6fdcc 0%, transparent 50%)",
    "radial-gradient(ellipse 100% 120% at 10% 85%, #e0f2feaa 0%, transparent 55%)",
    "radial-gradient(ellipse 70% 60% at 45% 50%, #f0f9ffbb 0%, transparent 60%)",
    "radial-gradient(ellipse 50% 40% at 20% 15%, #7dd3fc55 0%, transparent 45%)",
    "linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 30%, #bae6fd 60%, #c9eeff 85%, #eef8ff 100%)",
].join(", ");

// ── Typewriter with native CSS glow (Massively improves performance) ───────────
function Typewriter({ text, color }: { text: string; color: string }) {
    const [displayed, setDisplayed] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed(0);
        setDone(false);
        const chars = text.length;
        let i = 0;
        let timer: ReturnType<typeof setTimeout>;
        function type() {
            i++;
            setDisplayed(i);
            if (i < chars) {
                // Type fast, otherwise it takes too long to finish reading
                timer = setTimeout(type, 10 + Math.random() * 8);
            } else {
                setDone(true);
            }
        }
        timer = setTimeout(type, 400); // initial delay before typing starts
        return () => clearTimeout(timer);
    }, [text]);

    return (
        <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
            lineHeight: 1.9,
            color: "#3d3530",
            fontWeight: 400,
            maxWidth: "38ch",
            margin: 0,
            minHeight: "3.6em",
        }}>
            {text.slice(0, displayed).split("").map((char, i) => (
                <span
                    key={`${text.length}-${i}`}
                    className="type-char"
                    style={{ "--glow-color": color } as any}
                >
                    {char}
                </span>
            ))}
            {!done && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.65, repeat: Infinity }}
                    style={{ color, fontWeight: 700, marginLeft: 1 }}
                >|</motion.span>
            )}
        </p>
    );
}

// ── Floating background curves ─────────────────────────────────────────────────
function FloatingCurves() {
    const t = useRef(0);
    const ref = useRef<SVGSVGElement>(null);
    useAnimationFrame((_, delta) => {
        t.current += delta * 0.00028;
        if (!ref.current) return;
        const s = Math.sin(t.current), c = Math.cos(t.current * 0.7);
        const s2 = Math.sin(t.current * 1.3 + 1), c2 = Math.cos(t.current * 0.5 + 2);
        const get = (id: string) => ref.current!.querySelector(`#${id}`) as SVGGElement | null;
        get("hw")?.setAttribute("transform", `translate(0, ${s * 10})`);
        get("dg")?.setAttribute("transform", `translate(${c * 8}, ${s2 * 6})`);
        get("lv")?.setAttribute("transform", `translate(${c2 * 5}, ${s * 7})`);
        get("rv")?.setAttribute("transform", `translate(${-c2 * 5}, ${-s * 7})`);
        get("tc")?.setAttribute("transform", `translate(${s2 * 6}, ${c * 5})`);
        get("bc")?.setAttribute("transform", `translate(${-s2 * 6}, ${-c * 5})`);
        const sc = 1 + s * 0.055;
        get("dots")?.setAttribute("transform", `scale(${sc}) translate(${(1 - sc) * 720}, ${(1 - sc) * 450})`);
    });
    return (
        <svg ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
                <radialGradient id="curveFade" cx="50%" cy="50%" r="75%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.0" />
                    <stop offset="38%" stopColor="white" stopOpacity="0.0" />
                    <stop offset="65%" stopColor="white" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="white" stopOpacity="1.0" />
                </radialGradient>
                <mask id="curveMask"><rect width="1440" height="900" fill="url(#curveFade)" /></mask>
                <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="white" stopOpacity="1" /><stop offset="42%" stopColor="white" stopOpacity="0" /></linearGradient>
                <mask id="leftMask"><rect width="1440" height="900" fill="url(#leftFade)" /></mask>
                <linearGradient id="rightFade" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="white" stopOpacity="1" /><stop offset="42%" stopColor="white" stopOpacity="0" /></linearGradient>
                <mask id="rightMask"><rect width="1440" height="900" fill="url(#rightFade)" /></mask>
                <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="white" stopOpacity="1" /><stop offset="48%" stopColor="white" stopOpacity="0" /></linearGradient>
                <mask id="topMask"><rect width="1440" height="900" fill="url(#topFade)" /></mask>
                <linearGradient id="botFade" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="white" stopOpacity="1" /><stop offset="48%" stopColor="white" stopOpacity="0" /></linearGradient>
                <mask id="botMask"><rect width="1440" height="900" fill="url(#botFade)" /></mask>
            </defs>
            <g id="hw" mask="url(#curveMask)" opacity="0.42">
                <path d="M -80 120 C 200 20,480 220,720 115 C 960 10,1240 210,1520 100" fill="none" stroke="#c0b9b0" strokeWidth="0.75" />
                <path d="M -80 210 C 200 110,480 310,720 205 C 960 100,1240 300,1520 190" fill="none" stroke="#c0b9b0" strokeWidth="0.55" />
                <path d="M -80 680 C 200 580,480 780,720 675 C 960 570,1240 770,1520 660" fill="none" stroke="#c0b9b0" strokeWidth="0.55" />
                <path d="M -80 770 C 200 670,480 870,720 765 C 960 660,1240 860,1520 750" fill="none" stroke="#c0b9b0" strokeWidth="0.45" />
            </g>
            <g id="dg" mask="url(#curveMask)" opacity="0.30">
                <path d="M -60 900 C 180 700,480 520,760 390 C 1020 270,1260 160,1500 30" fill="none" stroke="#bbb4ab" strokeWidth="0.8" />
                <path d="M -60 820 C 200 640,480 460,760 330 C 1020 200,1260 100,1500 -30" fill="none" stroke="#bbb4ab" strokeWidth="0.5" />
                <path d="M -60 80  C 180 260,480 380,760 510 C 1020 640,1260 740,1500 870" fill="none" stroke="#bbb4ab" strokeWidth="0.55" />
            </g>
            <g id="lv" mask="url(#leftMask)" opacity="0.5">
                <path d="M 95  -20 C 20  160,175 340,85  520 C -5  700,150 800,95  920" fill="none" stroke="#c2bbb2" strokeWidth="0.65" />
                <path d="M 170 -20 C 95  160,250 340,160 520 C 70  700,225 800,170 920" fill="none" stroke="#c2bbb2" strokeWidth="0.45" />
                <path d="M 240 -20 C 165 160,320 340,230 520 C 140 700,295 800,240 920" fill="none" stroke="#c2bbb2" strokeWidth="0.35" />
            </g>
            <g id="rv" mask="url(#rightMask)" opacity="0.45">
                <path d="M 1345 -20 C 1420 160,1265 340,1355 520 C 1445 700,1290 800,1345 920" fill="none" stroke="#c2bbb2" strokeWidth="0.65" />
                <path d="M 1270 -20 C 1345 160,1190 340,1280 520 C 1370 700,1215 800,1270 920" fill="none" stroke="#c2bbb2" strokeWidth="0.45" />
            </g>
            <g id="tc" mask="url(#topMask)" opacity="0.40">
                <path d="M -80 -10 C 240 120,560 -40,880 90  C 1100 180,1300 40, 1520 130" fill="none" stroke="#c2bbb2" strokeWidth="0.6" />
                <path d="M -80 -60 C 240 70, 560 -90,880 40  C 1100 130,1300 -10,1520 80" fill="none" stroke="#c2bbb2" strokeWidth="0.4" />
            </g>
            <g id="bc" mask="url(#botMask)" opacity="0.38">
                <path d="M -80 910 C 240 780,560 940,880 810 C 1100 720,1300 860,1520 770" fill="none" stroke="#c2bbb2" strokeWidth="0.6" />
                <path d="M -80 960 C 240 830,560 990,880 860 C 1100 770,1300 910,1520 820" fill="none" stroke="#c2bbb2" strokeWidth="0.4" />
            </g>
            <g id="dots" mask="url(#curveMask)" opacity="0.26">
                <circle cx="95" cy="115" r="1.6" fill="#b5ada4" /><circle cx="170" cy="208" r="1.2" fill="#b5ada4" />
                <circle cx="720" cy="115" r="1.6" fill="#b5ada4" /><circle cx="1345" cy="102" r="1.6" fill="#b5ada4" />
                <circle cx="95" cy="515" r="1.4" fill="#b5ada4" /><circle cx="1345" cy="520" r="1.4" fill="#b5ada4" />
                <circle cx="760" cy="388" r="1.6" fill="#b5ada4" /><circle cx="400" cy="680" r="1.2" fill="#b5ada4" />
                <circle cx="1040" cy="670" r="1.2" fill="#b5ada4" /><circle cx="720" cy="675" r="1.6" fill="#b5ada4" />
            </g>
        </svg>
    );
}

function MagneticTag({ label, accent }: { label: string; accent: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0), y = useMotionValue(0);
    return (
        <motion.span ref={ref}
            onMouseMove={(e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x, y, display: "inline-block" }} whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 340, damping: 18 }}
        >
            <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 100, border: `1.5px solid ${accent}`, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: accent, fontWeight: 500, cursor: "default", whiteSpace: "nowrap", transition: "border-color 0.4s, color 0.4s" }}>
                {label}
            </span>
        </motion.span>
    );
}

function WordReveal({ text, accent }: { text: string; accent: string }) {
    const words = text.split(" ");
    return (
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1rem, 1.3vw, 1.18rem)", lineHeight: 2.0, color: "#3d3530", fontWeight: 400, maxWidth: "44ch", margin: 0 }}>
            {words.map((word, i) => (
                <motion.span key={`${text.slice(0, 6)}-w${i}`}
                    initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: i * 0.022, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "inline-block", marginRight: "0.25em", color: i === 0 ? accent : "#3d3530", fontStyle: i === 0 ? "italic" : "normal", fontWeight: i === 0 ? 700 : 400 }}
                >{word}</motion.span>
            ))}
        </p>
    );
}

function PhotoCard({ accent, chapter }: { accent: string; chapter: string }) {
    // Determine glow color based on accent or chapter, otherwise fallback to orange
    let cardGlow: "blue" | "purple" | "green" | "red" | "orange" = "orange";
    if (accent === "#C9A96E" || accent === "#E07B6A") cardGlow = "orange";
    else if (accent === "#6A9FE0") cardGlow = "blue";
    else if (accent === "#6EC99A") cardGlow = "green";

    return (
        <GlowCard customSize={true} glowColor={cardGlow} className="w-full h-full !p-0 !gap-0 border-0 rounded-[20px] overflow-hidden">
            <div style={{ width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 50px 120px rgba(0,0,0,0.16), 0 16px 40px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)" }}>
                <img src={PHOTO} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                <motion.div animate={{ background: `linear-gradient(150deg, ${accent}28 0%, transparent 55%)` }} transition={{ duration: 0.9 }} style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(10,6,2,0.75) 0%, transparent 100%)", padding: "3rem 1.8rem 1.6rem" }}>
                    <motion.p animate={{ color: accent }} transition={{ duration: 0.5 }} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: 5, opacity: 0.9 }}>{chapter}</motion.p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, color: "rgba(255,255,255,0.93)", lineHeight: 1.1 }}>Vamshi Krishna</p>
                </div>
                <motion.div animate={{ background: accent }} transition={{ duration: 0.5 }} style={{ position: "absolute", top: 18, right: 18, width: 10, height: 10, borderRadius: "50%" }} />
            </div>
        </GlowCard>
    );
}

function ChapterNum({ id, accent }: { id: string; accent: string }) {
    return (
        <motion.div key={id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} style={{ position: "absolute", top: "-4%", right: "2%", zIndex: 0, userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(7rem, 16vw, 15rem)", fontWeight: 900, letterSpacing: "-0.04em", color: accent, opacity: 0.3, display: "block", transition: "color 0.5s", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)" }}>{id}</span>
        </motion.div>
    );
}

function ChapterDots({ current, accent }: { current: number; accent: string }) {
    return (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
                <motion.div key={i} animate={{ width: i === current ? 30 : 8, height: 8, borderRadius: 4, background: i === current ? accent : "#e2d9d0" }} transition={{ duration: 0.38, ease: [0.34, 1.26, 0.64, 1] }} />
            ))}
        </div>
    );
}

function ProgressBar({ progress, accent }: { progress: any; accent: string }) {
    const h = useTransform(progress, [0, 1], ["0%", "100%"]);
    return (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#ede9e3", zIndex: 10 }}>
            <motion.div animate={{ background: accent }} style={{ width: "100%", height: h, borderRadius: 3, transition: "background 0.55s" }} />
        </div>
    );
}

// Cursor component removed to improve performance

// ── MAIN ───────────────────────────────────────────────────────────────────────
export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [college, setCollege] = useState<"niat" | "bits">("niat");

    useEffect(() => {
        if (document.querySelector("[data-about-fonts]")) return;
        const link = document.createElement("link");
        link.rel = "stylesheet"; link.href = FONT_LINK;
        link.setAttribute("data-about-fonts", "1");
        document.head.appendChild(link);
    }, []);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const smooth = useSpring(scrollYProgress, { stiffness: 52, damping: 22 });

    // ── SCROLL MAP ─────────────────────────────────────────────────────────────
    // ORIGIN slide gets 0 → 0.45 of total scrollYProgress (much more scroll room).
    // local remaps that to 0→1 for clean keyframe math.
    //
    // Timeline (local 0→1):
    //   NIAT fades IN   : 0.00 → 0.18  (slow entrance)
    //   NIAT holds      : 0.18 → 0.38
    //   NIAT fades OUT  : 0.38 → 0.52  (slow exit)
    //   gap             : 0.52 → 0.58
    //   BITS fades IN   : 0.58 → 0.76  (slow entrance)
    //   BITS holds      : 0.76 → 0.90
    //   BITS fades OUT  : 0.90 → 1.00
    //
    // Spring stiffness 8 = extremely lazy, barely responsive to fast scroll.
    // This means even if the user scrolls fast, the card eases in/out slowly.

    // Local scroll mapped wider for even smoother transition pacing
    const local = useTransform(scrollYProgress, [0, 0.50], [0, 1]);

    // Faster, smoother spring — less stiffness/damping means it catches up faster (less laggy feeling)
    const SP = { stiffness: 40, damping: 25, mass: 0.8 };   // Tuned for responsive but soft motion

    // Refined ranges: The fade happens more gradually and holds longer
    const niatRaw = useTransform(local, [0.00, 0.12, 0.44, 0.50], [0, 1, 1, 0]);
    const bitsRaw = useTransform(local, [0.50, 0.62, 0.94, 1.00], [0, 1, 1, 0]);
    const niatScaleRaw = useTransform(local, [0.00, 0.12, 0.44, 0.50], [0.96, 1, 1, 0.96]);
    const niatYRaw = useTransform(local, [0.00, 0.12, 0.44, 0.50], [8, 0, 0, -8]);

    // Significantly reduced blur for a "soft" feel and better performance
    const niatBlurRaw = useTransform(local, [0.00, 0.12, 0.44, 0.50], [4, 0, 0, 4]);
    const bitsScaleRaw = useTransform(local, [0.50, 0.62, 0.94, 1.00], [0.96, 1, 1, 0.96]);
    const bitsYRaw = useTransform(local, [0.50, 0.62, 0.94, 1.00], [8, 0, 0, -8]);
    const bitsBlurRaw = useTransform(local, [0.50, 0.62, 0.94, 1.00], [4, 0, 0, 4]);

    const niatOp = useSpring(niatRaw, SP);
    const bitsOp = useSpring(bitsRaw, SP);
    const niatScale = useSpring(niatScaleRaw, SP);
    const niatY = useSpring(niatYRaw, SP);
    const bitsScale = useSpring(bitsScaleRaw, SP);
    const bitsY = useSpring(bitsYRaw, SP);

    // Sync blur arrays to identical spring physics so they never misalign, 
    // eliminating visual lag or jagged fade-ins.
    const niatBlurSp = useSpring(niatBlurRaw, SP);
    const bitsBlurSp = useSpring(bitsBlurRaw, SP);
    const niatBlur = useTransform(niatBlurSp, (v) => `blur(${v}px)`);
    const bitsBlur = useTransform(bitsBlurSp, (v) => `blur(${v}px)`);

    // Track which college is dominant to drive the typewriter text
    useEffect(() => {
        const unsub1 = niatOp.on("change", (v) => { if (active === 0 && v >= 0.45) setCollege("niat"); });
        const unsub2 = bitsOp.on("change", (v) => { if (active === 0 && v >= 0.45) setCollege("bits"); });
        return () => { unsub1(); unsub2(); };
    }, [niatOp, bitsOp, active]);

    useEffect(
        () => smooth.on("change", (v) => {
            // Mapping scroll properly across the 4 slides:
            // Custom breaks to let ORIGIN hold exactly during the NIAT/BITS cycle (0 to 0.50)
            if (v < 0.52) setActive(0);
            else if (v < 0.68) setActive(1);
            else if (v < 0.84) setActive(2);
            else setActive(3);
        }),
        [smooth]
    );

    // Reset to NIAT whenever we re-enter slide 01
    useEffect(() => {
        if (active === 0) setCollege("niat");
    }, [active]);

    const slide = SLIDES[active];
    const typeText = college === "bits" ? BITS_TEXT : NIAT_TEXT;
    const typeColor = "#38bdf8"; // Both use typography blue effect

    return (
        <>
            <style>{`
                * { box-sizing: border-box; }
                @keyframes wave-hand {
                    0%  { transform: rotate(0deg);  } 8%  { transform: rotate(14deg); }
                    16% { transform: rotate(-6deg); } 24% { transform: rotate(14deg); }
                    32% { transform: rotate(-4deg); } 40% { transform: rotate(10deg); }
                    50% { transform: rotate(0deg);  } 100%{ transform: rotate(0deg);  }
                }
                .wave-emoji { display: inline-block; transform-origin: 70% 80%; animation: wave-hand 2.2s ease-in-out infinite; will-change: transform; }
                
                @keyframes type-glow {
                    0% { opacity: 0; filter: blur(4px); color: var(--glow-color); }
                    100% { opacity: 1; filter: blur(0px); color: #3d3530; }
                }
                .type-char {
                    display: inline;
                    opacity: 0;
                    animation: type-glow 0.45s ease-out forwards;
                    will-change: opacity, filter, color;
                }
            `}</style>



            <div data-about-root ref={containerRef} style={{ background: "#ffffff", position: "relative", minHeight: `${150 + SLIDES.length * 200}vh` }}>
                <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#ffffff" }}>

                    <FloatingCurves />

                    {/* Full-page gradient wash — NIAT rose then BITS sky-blue */}
                    <motion.div style={{ position: "absolute", inset: 0, background: NIAT_BG, opacity: niatOp, zIndex: 0, pointerEvents: "none" }} />
                    <motion.div style={{ position: "absolute", inset: 0, background: BITS_BG, opacity: bitsOp, zIndex: 0, pointerEvents: "none" }} />

                    {/* Per-slide accent washes */}
                    <motion.div animate={{ background: `radial-gradient(ellipse at 85% 0%, ${slide.accent}14 0%, transparent 45%)` }} transition={{ duration: 1.0 }} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
                    <motion.div animate={{ background: `radial-gradient(ellipse at 5% 100%, ${slide.accent}0b 0%, transparent 42%)` }} transition={{ duration: 1.2 }} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
                    <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 75%)" }} />

                    {/* Split grid */}
                    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "50% 50%", zIndex: 1 }}>

                        {/* ── LEFT: Photo ── */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1.5rem, 3.5vw, 3.5rem)", position: "relative" }}>
                            <AnimatePresence mode="wait">
                                <motion.div key={`since-${active}`} initial={{ opacity: 0, x: -14, rotate: -8 }} animate={{ opacity: 1, x: 0, rotate: -3 }} exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} style={{ position: "absolute", top: "clamp(4rem, 8vh, 7rem)", right: "clamp(0.8rem, 2.5vw, 2.2rem)", background: "#fff", border: `2px solid ${slide.accent}`, borderRadius: 10, padding: "7px 16px", boxShadow: "0 8px 28px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)", zIndex: 5 }}>
                                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.22em", color: "#9c9186", marginBottom: 3, textTransform: "uppercase" }}>SINCE</p>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: slide.accent, lineHeight: 1, transition: "color 0.5s" }}>{slide.year}</p>
                                </motion.div>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.div key={`photo-${active}`} initial={{ opacity: 0, scale: 0.94, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.03, y: -16 }} transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", maxWidth: 400, height: "clamp(330px, 56vh, 500px)" }}>
                                    <PhotoCard accent={slide.accent} chapter={slide.chapter} />
                                </motion.div>
                            </AnimatePresence>
                            <div style={{ position: "absolute", bottom: "1.8rem", left: "50%", transform: "translateX(-50%)" }}>
                                <ChapterDots current={active} accent={slide.accent} />
                            </div>
                        </div>

                        {/* ── RIGHT: Text ── */}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(1.5rem, 4vw, 4rem) clamp(2rem, 4vw, 4.5rem) clamp(2rem, 4vw, 4rem) clamp(1rem, 2vw, 2rem)", position: "relative", overflow: "hidden" }}>
                            <AnimatePresence mode="wait">
                                <ChapterNum key={slide.id} id={slide.id} accent={slide.accent} />
                            </AnimatePresence>

                            {/* Chapter tag row */}
                            <AnimatePresence mode="wait">
                                <motion.div key={`tag-${active}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.38 }} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1.2rem", position: "relative", zIndex: 1 }}>
                                    <motion.div animate={{ background: slide.accent }} style={{ width: 34, height: 2.5, borderRadius: 2, flexShrink: 0, transition: "background 0.5s" }} />
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.35em", color: slide.accent, textTransform: "uppercase", fontWeight: 500, transition: "color 0.5s" }}>{slide.chapter}</span>
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "#b8afa6", textTransform: "uppercase" }}>{slide.id} / {String(SLIDES.length).padStart(2, "0")}</span>
                                </motion.div>
                            </AnimatePresence>

                            {/* ── Heading ── */}
                            <div style={{ marginBottom: "1rem", position: "relative", zIndex: 1 }}>
                                <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 6rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", color: "#1a1208", margin: 0, display: "flex", alignItems: "center", gap: "0.2em" }}>
                                    Hey There <span className="wave-emoji">👋</span>
                                </h1>
                            </div>

                            {/* ── Content area ── */}
                            <div style={{ position: "relative", zIndex: 1, minHeight: 230 }}>
                                <AnimatePresence mode="wait">
                                    <motion.div key={`content-${active}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.38 }}>

                                        {active === 0 ? (
                                            // ── ORIGIN slide ─────────────────────────────────────
                                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                                                {/* Typewriter paragraph — switches dynamically as NIAT/BITS card comes in */}
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={typeText}
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -6 }}
                                                        transition={{ duration: 0.28 }}
                                                    >
                                                        <Typewriter text={typeText} color={typeColor} />
                                                    </motion.div>
                                                </AnimatePresence>

                                                {/* College logo + name — NIAT then BITS, scroll-driven */}
                                                <div style={{ position: "relative", height: 100, marginTop: "0.2rem" }}>

                                                    {/* NIAT card */}
                                                    <motion.div style={{
                                                        position: "absolute", inset: 0,
                                                        display: "flex", alignItems: "center", gap: 20,
                                                        opacity: niatOp, scale: niatScale, y: niatY, filter: niatBlur,
                                                        willChange: "opacity, transform, filter"
                                                    }}>
                                                        <div style={{ width: 72, height: 72, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.2)" }}>
                                                            <img src="https://res.cloudinary.com/douw67vte/image/upload/v1773036196/channels4_profile_qh0wzr.jpg" alt="NIAT" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                                            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.9rem, 1.25vw, 1rem)", fontWeight: 700, color: "#1a1208", margin: 0, lineHeight: 1.3, maxWidth: "24ch" }}>
                                                                Nxtwave Institute of Advanced Technologies
                                                            </p>
                                                            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", fontWeight: 500, color: "#7a6f66", margin: 0, textTransform: "uppercase" }}>
                                                                Tech Skills
                                                            </p>
                                                        </div>
                                                    </motion.div>

                                                    {/* BITS card */}
                                                    <motion.div style={{
                                                        position: "absolute", inset: 0,
                                                        display: "flex", alignItems: "center", gap: 20,
                                                        opacity: bitsOp, scale: bitsScale, y: bitsY, filter: bitsBlur,
                                                        willChange: "opacity, transform, filter"
                                                    }}>
                                                        <div style={{ width: 72, height: 72, borderRadius: 16, overflow: "hidden", flexShrink: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.2)" }}>
                                                            <img src="https://res.cloudinary.com/douw67vte/image/upload/v1773036196/f56bcd8133f436b410b33637e90a540d_s0m1co.jpg" alt="BITS" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                                            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.9rem, 1.25vw, 1rem)", fontWeight: 700, color: "#1a1208", margin: 0, lineHeight: 1.3, maxWidth: "24ch" }}>
                                                                Birla Institute of Technology and Science, Pilani
                                                            </p>
                                                            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", fontWeight: 500, color: "#7a6f66", margin: 0, textTransform: "uppercase" }}>
                                                                BSc Computer Science
                                                            </p>
                                                        </div>
                                                    </motion.div>

                                                </div>

                                                {/* Keyword and Tags for ORIGIN slide */}
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} style={{ marginTop: "1.4rem", marginBottom: "0.9rem" }}>
                                                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 900, fontStyle: "italic", color: slide.accent, opacity: 0.18, lineHeight: 1, display: "block", transition: "color 0.5s" }}>{slide.keyword}</span>
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                    {slide.tags.map((t) => <MagneticTag key={t} label={t} accent={slide.accent} />)}
                                                </motion.div>
                                            </div>
                                        ) : (
                                            // ── Slides 02 / 03 / 04 — completely untouched ──
                                            <div>
                                                <WordReveal text={slide.text} accent={slide.accent} />
                                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} style={{ marginTop: "1.4rem", marginBottom: "0.9rem" }}>
                                                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", fontWeight: 900, fontStyle: "italic", color: slide.accent, opacity: 0.18, lineHeight: 1, display: "block", transition: "color 0.5s" }}>{slide.keyword}</span>
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                    {slide.tags.map((t) => <MagneticTag key={t} label={t} accent={slide.accent} />)}
                                                </motion.div>
                                            </div>
                                        )}

                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Closing quote — slide 04 only */}
                            <AnimatePresence>
                                {active === SLIDES.length - 1 && (
                                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.65, duration: 0.5 }} style={{ marginTop: "1.6rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.08)", position: "relative", zIndex: 1 }}>
                                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 1.65vw, 1.38rem)", fontWeight: 700, fontStyle: "italic", color: "#3d3530", lineHeight: 1.4, marginBottom: 10 }}>
                                            "Learning something new every day{" "}
                                            <motion.span animate={{ color: slide.accent }} style={{ transition: "color 0.5s" }}>and building something unique</motion.span>{" "}
                                            every time."
                                        </p>
                                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#b8afa6", textTransform: "uppercase" }}>— Vamshi Krishna · NIAT · BITS Pilani</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Scroll hint — slide 01 only */}
                            <AnimatePresence>
                                {active === 0 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", bottom: "1.6rem", left: "clamp(1rem, 2vw, 2rem)", display: "flex", alignItems: "center", gap: 12, zIndex: 2 }}>
                                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} style={{ width: 20, height: 32, borderRadius: 10, border: `2px solid ${slide.accent}`, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 5 }}>
                                            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} style={{ width: 4, height: 4, borderRadius: "50%", background: slide.accent }} />
                                        </motion.div>
                                        {/* <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.28em", color: "#b8afa6", textTransform: "uppercase" }}>Scroll to explore</span> */}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <ProgressBar progress={smooth} accent={slide.accent} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}