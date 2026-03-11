import { useLayoutEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { initHeroAnimation } from "./heroAnimation";
import bgImage from "../../assets/images/hero_bg.png";

export default function Hero() {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const textRefs = useRef([]);

    useLayoutEffect(() => {
        // Initialize GSAP context for the scrolling animation
        const ctx = initHeroAnimation(containerRef, bgRef, textRefs);

        // Cleanup phase: ensuring no memory leaks when component unmounts
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        // Strict 100vh container for the single-page experience
        <div ref={containerRef} className={styles.heroSection}>

            {/* 100vh layout pinned by GSAP */}
            <div className={styles.heroLayout}>

                {/* Fullscreen Background Image */}
                <div
                    ref={bgRef}
                    className={styles.heroBackground}
                    style={{ backgroundImage: `url(${bgImage})` }}
                />

                {/* Text Stack Overlayed in Center */}
                <div className={styles.textStack}>

                    <h1
                        ref={(el) => (textRefs.current[0] = el)}
                        className={`${styles.animatedText} ${styles.who}`}
                    >
                        WHO
                    </h1>

                    <h1
                        ref={(el) => (textRefs.current[1] = el)}
                        className={`${styles.animatedText} ${styles.am}`}
                    >
                        AM
                    </h1>

                    <h1
                        ref={(el) => (textRefs.current[2] = el)}
                        className={`${styles.animatedText} ${styles.i}`}
                    >
                        I
                    </h1>

                    <h1
                        ref={(el) => (textRefs.current[3] = el)}
                        className={`${styles.animatedText} ${styles.questionMark}`}
                    >
                        ?
                    </h1>

                </div>

            </div>
        </div>
    );
}
