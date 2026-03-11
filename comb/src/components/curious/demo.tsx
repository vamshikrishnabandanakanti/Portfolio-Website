"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { AnimatedLetterText } from "../ui/potfolio-text"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const containerRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=150%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            })

            // Header Animation
            tl.fromTo(
                headerRef.current,
                { opacity: 0, filter: "blur(20px)", scale: 0.8 },
                { opacity: 1, filter: "blur(0px)", scale: 1, ease: "power3.out", duration: 1 },
                0
            )

            // Subtitle Animation
            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, filter: "blur(20px)", y: 40 },
                { opacity: 1, filter: "blur(0px)", y: 0, ease: "power3.out", duration: 1 },
                0.5 // Start halfway through header animation
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <main ref={containerRef} className="min-h-screen flex flex-col items-center justify-center gap-16 p-8 w-full bg-white">
            <div className="flex flex-col items-center gap-8">
                <div ref={headerRef} className="opacity-0">
                    <AnimatedLetterText text="Curious?" letterToReplace="o" className="text-7xl md:text-9xl text-black" />
                </div>

                <p ref={subtitleRef} className="opacity-0 text-muted-foreground text-4xl text-black max-w-md text-center">
                    To Know Who I Am.
                </p>
            </div>
        </main>
    )
}
