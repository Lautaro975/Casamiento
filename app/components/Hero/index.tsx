"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const TITLE = "Las Churris";
const DESCRIPTION =
    "Tenemos una historia que celebrar y nos encantaría compartirla contigo";

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-eyebrow", {
                y: 24,
                opacity: 0,
                duration: 0.7,
            })
                .from(
                    ".hero-letter",
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.75,
                        stagger: 0.04,
                        ease: "back.out(1.7)",
                    },
                    "-=0.35",
                )
                .from(
                    ".hero-word",
                    {
                        y: 12,
                        opacity: 0,
                        duration: 0.45,
                        stagger: 0.04,
                    },
                    "-=0.2",
                )
                .from(
                    ".hero-divider",
                    {
                        scaleX: 0,
                        opacity: 0,
                        duration: 0.5,
                        transformOrigin: "center",
                    },
                    "-=0.1",
                )
                .from(
                    ".hero-date-line",
                    {
                        y: 16,
                        opacity: 0,
                        duration: 0.55,
                        stagger: 0.12,
                    },
                    "-=0.15",
                );
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="hero-mobile-glow relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-6 py-14 text-center pointer-events-none select-none"
        >
            <p className="hero-eyebrow mb-4 md:mb-6">Nos casamos</p>

            <div className="flex max-w-full flex-nowrap items-center justify-center gap-4 sm:gap-10 lg:gap-14 my-2 lg:my-0">
                <h1 className="hero-title font-serif! m-0 shrink-0">
                    {TITLE.split("").map((char, index) => (
                        <span
                            key={index}
                            className="hero-letter inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>
                <span
                    data-plane-start
                    className="inline-block shrink-0 size-8 sm:size-14 lg:size-16 ml-2 sm:ml-4 lg:ml-6"
                    aria-hidden
                />
            </div>

            <p className="p1 max-w-md leading-[1.6] mt-6">
                {DESCRIPTION.split(" ").map((word, index) => (
                    <span
                        key={index}
                        className="hero-word inline-block mr-[0.25em]"
                    >
                        {word}
                    </span>
                ))}
            </p>

            <div className="hero-divider my-8 md:my-10" aria-hidden />


            <div className=" flex flex-col gap-1">
                <p className="p2 hero-date-line">Sábado 12 de diciembre de 2026</p>
                <p className="p3 hero-date-line">19 hs · Mar del Plata</p>
            </div>
        </section>
    );
};

export default Hero;
