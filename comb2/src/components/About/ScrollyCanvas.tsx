"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

interface ScrollyCanvasProps {
    frameCount: number;
}

export default function ScrollyCanvas({ frameCount = 240 }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 25,
        mass: 0.5,
        restDelta: 0.0001
    });

    // Scale scroll progress (0-1) to frame index (1-frameCount)
    const currentFrame = useTransform(smoothProgress, [0, 1], [1, frameCount]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // ezgif-frame-001.jpg format
            const indexStr = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${indexStr}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    // All images loaded, trigger initial draw
                    setImages(loadedImages);
                    drawFrame(1, loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, [frameCount]);

    const lastDrawnCheck = useRef<number>(-1);

    // Draw frame when scroll changes
    useEffect(() => {
        let reqId: number;
        return currentFrame.on("change", (latest) => {
            let frameIndex = Math.min(Math.floor(latest), Number(frameCount));
            if (!frameIndex) return;

            if (reqId) cancelAnimationFrame(reqId);

            reqId = requestAnimationFrame(() => {
                if (images.length > 0 && frameIndex !== lastDrawnCheck.current) {
                    lastDrawnCheck.current = frameIndex;
                    drawFrame(frameIndex, images);
                }
            });
        });
    }, [currentFrame, images, frameCount]);

    // Resize handler for canvas
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            if (images.length > 0) {
                drawFrame(Math.min(Math.max(1, Math.floor(currentFrame.get())), frameCount), images);
            }
        };
        handleResize(); // Initialize size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images, currentFrame, frameCount]);

    const drawFrame = (frameIndex: number, imgs: HTMLImageElement[]) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // ensure image exists
        const img = imgs[frameIndex - 1];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    return (
        <div ref={containerRef} className="relative h-[1000vh] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#afafaf]">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />
                {/* Magic Overlay - ensure correct stacking context */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-transparent" />
            </div>
        </div>
    );
}
