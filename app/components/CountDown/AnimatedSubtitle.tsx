"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimatedSubtitleProps = {
    text: string;
    className?: string;
    id?: string;
};

const AnimatedSubtitle = ({ text, className = "", id }: AnimatedSubtitleProps) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            gsap.from(".countdown-subtitle-word", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                y: 16,
                opacity: 0,
                duration: 0.55,
                ease: "power3.out",
                stagger: 0.08,
            });
        },
        { scope: containerRef },
    );

    return (
        <h2 ref={containerRef} id={id} className={className}>
            {text.split(" ").map((word, index) => (
                <span
                    key={index}
                    className="countdown-subtitle-word inline-block mr-[0.25em]"
                >
                    {word}
                </span>
            ))}
        </h2>
    );
};

export default AnimatedSubtitle;
