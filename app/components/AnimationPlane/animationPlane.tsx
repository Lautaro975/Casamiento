"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { PaperPlaneGraphic } from "../PaperPlane/PaperPlaneGraphic";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

function buildFlightPath(
    startX: number,
    startY: number,
    width: number,
    waveEndY: number,
    exitEndY: number,
    segmentLength: number,
) {
    const midX = width / 2;
    const left = width * 0.08;
    const right = width * 0.92;
    const endX = width + 180;

    const waveTravel = Math.max(waveEndY - startY, 200);
    // Largo de cada media-onda independiente del ancho, para que la ese se vea
    // igual (pocas y largas) tanto en desktop como en mobile.
    let segments = Math.max(3, Math.round(waveTravel / segmentLength));
    // Forzar cantidad par: así la última onda llega al centro yendo hacia la
    // derecha y la salida continúa suave, sin el rulo/vuelta.
    if (segments % 2 !== 0) segments += 1;
    const step = waveTravel / segments;

    let d = `M ${startX},${startY}`;
    let prevY = startY;
    let bulgeRight = true;

    for (let i = 1; i <= segments; i += 1) {
        const y = startY + step * i;
        const cx = bulgeRight ? right : left;
        const c1y = i === 1 ? startY - 30 : prevY;
        d += ` C ${cx},${c1y} ${cx},${y} ${midX},${y}`;
        prevY = y;
        bulgeRight = !bulgeRight;
    }

    // Salida final en Regalo: sigue el camino hacia la derecha, redondeado, sin rulo
    const exitTravel = Math.max(exitEndY - waveEndY, 120);
    const endY = waveEndY + exitTravel;
    d += ` C ${right},${prevY} ${right},${endY} ${endX},${endY}`;

    return {
        d,
        pathEndY: endY,
    };
}

function getPathProgressForY(
    path: SVGPathElement,
    targetY: number,
    minProgress = 0,
) {
    const totalLength = path.getTotalLength();
    if (totalLength <= 0) return minProgress;

    const minLength = minProgress * totalLength;
    let low = minLength;
    let high = totalLength;

    for (let i = 0; i < 28; i += 1) {
        const mid = (low + high) / 2;
        const point = path.getPointAtLength(mid);
        if (point.y < targetY) {
            low = mid;
        } else {
            high = mid;
        }
    }

    return Math.min((low + high) / 2 / totalLength, 1);
}

const AirplaneScroll = ({ children }: { children?: ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const flightSvgRef = useRef<SVGSVGElement>(null);
    const planeRef = useRef<SVGGElement>(null);
    const planeEntranceRef = useRef<SVGGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(
        () => {
            const container = containerRef.current;
            const flightSvg = flightSvgRef.current;
            const plane = planeRef.current;
            const planeEntrance = planeEntranceRef.current;
            const path = pathRef.current;
            if (!container || !flightSvg || !plane || !planeEntrance || !path)
                return;

            let motionTrigger: ScrollTrigger | undefined;
            let fadeTween: gsap.core.Tween | undefined;
            let entranceTween: gsap.core.Timeline | undefined;
            let lastProgress = 0;
            let hasEntrancePlayed = false;

            const layout = () => {
                const startEl = container.querySelector("[data-plane-start]");
                if (!startEl) return;

                const giftSection = container.querySelector(
                    "[data-plane-gift]",
                ) as HTMLElement | null;
                const fadeSection = container.querySelector(
                    "[data-plane-fade]",
                ) as HTMLElement | null;

                const width = container.offsetWidth;
                const height = container.scrollHeight;
                const startBox = startEl.getBoundingClientRect();
                const containerBox = container.getBoundingClientRect();
                const startX =
                    startBox.left - containerBox.left + startBox.width / 2;
                const startY =
                    startBox.top - containerBox.top + startBox.height / 2;

                const fallbackWaveEnd =
                    startY + Math.max(height - startY, 200) * 0.82;
                // Medir Gift con getBoundingClientRect (relativo al contenedor),
                // igual que el inicio; offsetTop es relativo a otro padre y
                // desfasaba el final ~1 pantalla (caía en DressCode).
                const giftBox = giftSection?.getBoundingClientRect();
                const giftTop = giftBox
                    ? giftBox.top - containerBox.top
                    : fallbackWaveEnd;
                const giftHeight = giftBox?.height ?? 240;
                // La ese sigue hasta dentro de Regalo y recién ahí se va a la derecha
                const waveEndY = giftTop + giftHeight * 0.55;
                const exitEndY = giftTop + giftHeight * 0.95;

                // Largo de la ese basado en el alto de la ventana (no en el ancho),
                // así en mobile no salen muchas eses cortas y apretadas.
                const segmentLength = Math.max(window.innerHeight * 1.4, 700);

                const { d: pathD, pathEndY } = buildFlightPath(
                    startX,
                    startY,
                    width,
                    waveEndY,
                    exitEndY,
                    segmentLength,
                );

                flightSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
                path.setAttribute("d", pathD.trim());

                motionTrigger?.kill();
                fadeTween?.scrollTrigger?.kill();
                fadeTween?.kill();

                const verticalTravel = Math.max(pathEndY - startY, 1);
                const viewportAnchor = () => window.innerHeight * 0.42;

                const applyPlanePosition = (minProgress = lastProgress) => {
                    const containerBox = container.getBoundingClientRect();
                    const targetY = gsap.utils.clamp(
                        startY,
                        pathEndY,
                        viewportAnchor() - containerBox.top,
                    );
                    const scrollProgress =
                        (targetY - startY) / verticalTravel;
                    const progress = getPathProgressForY(
                        path,
                        targetY,
                        scrollProgress < 0.02 ? 0 : minProgress,
                    );
                    lastProgress = progress;

                    gsap.set(plane, {
                        opacity: 1,
                        transformOrigin: "50% 50%",
                        xPercent: 0,
                        yPercent: 0,
                        motionPath: {
                            path,
                            align: path,
                            autoRotate: 90,
                            alignOrigin: [0.5, 0.5],
                            start: progress,
                            end: progress,
                        },
                    });
                };

                if (!hasEntrancePlayed) {
                    entranceTween?.kill();
                    gsap.set(planeEntrance, {
                        opacity: 0,
                        x: 0,
                        y: 0,
                        scale: 0.55,
                        rotation: -22,
                        transformOrigin: "50% 50%",
                    });
                    gsap.set(path, { opacity: 0 });
                }

                applyPlanePosition(0);

                motionTrigger = ScrollTrigger.create({
                    trigger: container,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    onUpdate: () => applyPlanePosition(),
                });

                const fadeTrigger = fadeSection ?? container;

                fadeTween = gsap.fromTo(
                    plane,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        scrollTrigger: {
                            trigger: fadeTrigger,
                            start: fadeSection ? "top 78%" : "bottom 90%",
                            end: fadeSection ? "top 42%" : "bottom top",
                            scrub: true,
                        },
                        ease: "power1.in",
                    },
                );

                if (!hasEntrancePlayed) {
                    entranceTween = gsap.timeline({ delay: 0.35 });
                    entranceTween
                        .to(planeEntrance, {
                            opacity: 1,
                            rotation: 0,
                            scale: 1,
                            duration: 1.05,
                            ease: "power3.out",
                        })
                        .to(
                            path,
                            {
                                opacity: 1,
                                duration: 0.85,
                                ease: "power2.out",
                            },
                            "-=0.55",
                        );
                    hasEntrancePlayed = true;
                }

                ScrollTrigger.refresh();
            };

            layout();
            requestAnimationFrame(() => ScrollTrigger.refresh());

            const observer = new ResizeObserver(layout);
            observer.observe(container);
            window.addEventListener("resize", layout);

            return () => {
                motionTrigger?.kill();
                fadeTween?.scrollTrigger?.kill();
                fadeTween?.kill();
                entranceTween?.kill();
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
                ref={flightSvgRef}
                className="plane-flight-layer pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
                aria-hidden
            >
                <path
                    ref={pathRef}
                    fill="none"
                    stroke="rgba(23, 23, 23, 0.18)"
                    strokeWidth="3"
                    strokeDasharray="8, 8"
                    vectorEffect="non-scaling-stroke"
                />

                <g ref={planeRef}>
                    <g ref={planeEntranceRef}>
                        <g transform="translate(-300, -400) scale(0.1)">
                            <PaperPlaneGraphic
                                idPrefix="scrollPlane"
                                nested
                            />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default AirplaneScroll;
