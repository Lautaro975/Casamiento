"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

function buildFlightPath(
    startX: number,
    startY: number,
    width: number,
    height: number,
) {
    const midX = width / 2;
    const left = width * 0.16;
    const right = width * 0.84;
    const travel = Math.max(height - startY, 200);
    const y1 = startY + travel * 0.22;
    const y2 = startY + travel * 0.42;
    const y3 = startY + travel * 0.62;
    const y4 = startY + travel * 0.82;
    const endY = height + 140;

    return `
    M ${startX},${startY}
    C ${right},${startY - 30} ${right},${y1} ${midX},${y1}
    C ${left},${y1} ${left},${y2} ${midX},${y2}
    C ${right},${y2} ${right},${y3} ${midX},${y3}
    C ${left},${y3} ${left},${y4} ${midX},${y4}
    C ${midX + 24},${y4 + travel * 0.08} ${midX},${height - 24} ${midX},${endY}
  `;
}

const AirplaneScroll = ({ children }: { children?: ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const planeRef = useRef<SVGGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            const svg = svgRef.current;
            const plane = planeRef.current;
            const path = pathRef.current;
            if (!container || !svg || !plane || !path) return;

            let motionTween: gsap.core.Tween | undefined;
            let fadeTween: gsap.core.Tween | undefined;

            const layout = () => {
                const startEl = container.querySelector("[data-plane-start]");
                if (!startEl) return;

                const width = container.offsetWidth;
                const height = container.scrollHeight;
                const startBox = startEl.getBoundingClientRect();
                const containerBox = container.getBoundingClientRect();
                const startX = startBox.left - containerBox.left + startBox.width / 2;
                const startY = startBox.top - containerBox.top + startBox.height / 2;

                svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
                path.setAttribute("d", buildFlightPath(startX, startY, width, height));

                motionTween?.kill();
                fadeTween?.kill();

                motionTween = gsap.to(plane, {
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.2,
                        invalidateOnRefresh: true,
                    },
                    motionPath: {
                        path,
                        align: path,
                        autoRotate: 90,
                        alignOrigin: [0.5, 0.5],
                    },
                    ease: "power1.inOut",
                    immediateRender: true,
                });

                fadeTween = gsap.fromTo(
                    plane,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        scrollTrigger: {
                            trigger: container,
                            start: "bottom 90%",
                            end: "bottom top",
                            scrub: true,
                        },
                        ease: "power1.in",
                    },
                );

                ScrollTrigger.refresh();
            };

            layout();

            const observer = new ResizeObserver(layout);
            observer.observe(container);
            window.addEventListener("resize", layout);

            return () => {
                motionTween?.kill();
                fadeTween?.kill();
                observer.disconnect();
                window.removeEventListener("resize", layout);
            };
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="relative w-full overflow-x-hidden">
            {children}

            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                preserveAspectRatio="none"
                aria-hidden
            >
                <path
                    ref={pathRef}
                    fill="none"
                    stroke="rgba(23, 23, 23, 0.18)"
                    strokeWidth="3"
                    strokeDasharray="8, 8"
                />

                <g ref={planeRef}>
                    <g transform="translate(-40, -40) scale(0.4)">
                        <path d="M 88 70 L 15 115 L 15 130 L 88 105 Z" fill="#B0BEC5" />
                        <path d="M 112 70 L 185 115 L 185 130 L 112 105 Z" fill="#B0BEC5" />
                        <rect x="45" y="100" width="10" height="25" rx="4" fill="#78909C" />
                        <rect x="145" y="100" width="10" height="25" rx="4" fill="#78909C" />
                        <path d="M 95 155 L 45 175 L 45 185 L 95 170 Z" fill="#B0BEC5" />
                        <path d="M 105 155 L 155 175 L 155 185 L 105 170 Z" fill="#B0BEC5" />
                        <path
                            d="M 88 40 C 88 5, 112 5, 112 40 L 112 160 C 112 195, 88 195, 88 160 Z"
                            fill="#ECEFF1"
                        />
                        <ellipse cx="100" cy="28" rx="7" ry="12" fill="#90CAF9" />
                        <rect x="98" y="155" width="4" height="35" rx="2" fill="#90A4AE" />
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default AirplaneScroll;
