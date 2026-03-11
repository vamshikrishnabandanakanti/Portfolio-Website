import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initHeroAnimation = (containerRef, bgRef, textRefs) => {
    const ctx = gsap.context(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", // Keep the stretched scroll distance for smoothness
                scrub: 1.5, // Decreased so reverse scrolls catch up fast and don't hide 'WHO'
                pin: true,
                anticipatePin: 1,
            },
        });

        const [who, am, i, questionMark] = textRefs.current;

        const duration = 1;

        /* ---------------- Background Scale ---------------- */

        tl.to(
            bgRef.current,
            {
                scale: 1.14, // IMPORTANT (prevents black edges)
                ease: "none",
                duration: 1,
            },
            0
        );

        /* ---------------- Text Sequence ---------------- */

        tl.to(who, {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: duration * 0.15,
        }, 0);

        tl.to(who, {
            opacity: 0,
            filter: "blur(20px)",
            ease: "power3.in",
            duration: duration * 0.1,
        }, duration * 0.25);

        tl.to(am, {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: duration * 0.15,
        }, duration * 0.35);

        tl.to(am, {
            opacity: 0,
            filter: "blur(20px)",
            ease: "power3.in",
            duration: duration * 0.1,
        }, duration * 0.55);

        tl.to(i, {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: duration * 0.15,

        }, duration * 0.65);

        tl.to(i, {
            opacity: 0,
            filter: "blur(20px)",
            ease: "power3.in",
            duration: duration * 0.1,
        }, duration * 0.75);

        tl.to(questionMark, {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: duration * 0.25,  // longer fade-in
        }, duration * 0.86);           // start earlier
        /* ---------------- Smooth Opposite Tilt ---------------- */

        tl.to(
            questionMark,
            {
                rotation: 10,
                scale: 1.32,   // tiny punch
                transformOrigin: "50% 50%",
                ease: "none",
                duration: duration * 0.15,
            },
            duration * 0.85
        );

        tl.to(
            bgRef.current,
            {
                rotation: -4,
                transformOrigin: "50% 50%",
                ease: "power1.out",
                duration: duration * 0.35,
            },
            duration * 0.99
        );

    }, containerRef);

    return ctx;
};