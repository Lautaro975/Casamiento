"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useCountdown from "../../hooks/useCountdown";
import { AnimatedTitle } from "../Animations/titleAnimation";
import AnimatedSubtitle from "./AnimatedSubtitle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TimeRemaining {
    días: number;
    horas: number;
    minutos: number;
    segundos: number;
}

const UNITS = ["días", "horas", "minutos", "segundos"] as const;

const Countdown: React.FC<{ targetDate: Date | string | number }> = ({ targetDate }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const time = useCountdown(targetDate) as TimeRemaining;

    useGSAP(
        () => {
            gsap.from(".countdown-tile", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                rotateX: -28,
                y: 10,
                opacity: 0,
                scale: 0.97,
                duration: 0.9,
                stagger: 0.1,
                ease: "sine.out",
                transformOrigin: "center bottom",
            });
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="wrapper py-12" aria-labelledby="countdown-title">
            <div className="plane-fade-card countdown-card">
                <div className="plane-fade-card__veil" aria-hidden="true" />
                <div className="plane-fade-card__content flex flex-col items-center gap-8 text-center">
                    <div className="space-y-2 w-full">
                        <AnimatedTitle
                            text="Cuenta regresiva"
                            className="countdown-title font-serif!"
                        />
                        <AnimatedSubtitle
                            id="countdown-title"
                            text="Cada vez falta menos."
                            className="countdown-subtitle text-2xl sm:text-3xl font-bold tracking-tight"
                        />
                    </div>

                    <div
                        className="countdown-tiles flex w-full max-w-full flex-nowrap justify-center gap-2 sm:gap-6 md:gap-10"
                        aria-label="Tiempo restante para la boda"
                    >
                        {UNITS.map((label) => {
                            const value = time[label];

                            return (
                                <div
                                    className="countdown-tile flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-3 sm:px-5 sm:py-4 sm:min-w-[84px] sm:flex-none rounded-2xl bg-hero/50"
                                    key={label}
                                >
                                    <strong className="countdown-number text-[2.6rem] sm:text-5xl font-extrabold leading-none">
                                        {String(value).padStart(2, "0")}
                                    </strong>
                                    <span className="countdown-label text-[1rem] sm:text-xs uppercase tracking-wider mt-1">
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Countdown;
