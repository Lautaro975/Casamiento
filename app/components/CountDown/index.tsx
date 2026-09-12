"use client";

import useCountdown from "../../hooks/useCountdown";
import FoldBox from "../Animations/FoldBox";
import { AnimatedTitle } from "../Animations/titleAnimation";
import AnimatedSubtitle from "./AnimatedSubtitle";

interface TimeRemaining {
    días: number;
    horas: number;
    minutos: number;
    segundos: number;
}

const UNITS = ["días", "horas", "minutos", "segundos"] as const;

const Countdown: React.FC<{ targetDate: Date | string | number }> = ({ targetDate }) => {
    const time = useCountdown(targetDate) as TimeRemaining;

    return (
        <section className="wrapper py-12" aria-labelledby="countdown-title">
            <div className="plane-fade-card countdown-card">
                <div className="plane-fade-card__content flex flex-col items-center gap-8 text-center">
                    <div className="space-y-2 w-full">
                        <AnimatedTitle
                            text="Cuenta regresiva"
                            className="countdown-title font-serif!"
                            y={16}
                            stagger={0.02}
                            ease="power2.out"
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
                        {UNITS.map((label, index) => {
                            const value = time[label];

                            return (
                                <FoldBox
                                    key={label}
                                    className="countdown-tile flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-3 sm:px-5 sm:py-4 sm:min-w-[84px] sm:flex-none rounded-2xl bg-hero/50"
                                    hinge="top"
                                    trigger="scroll"
                                    duration={0.65}
                                    delay={index * 0.12}
                                >
                                    <strong className="countdown-number text-[2.6rem] sm:text-5xl font-extrabold leading-none">
                                        {String(value).padStart(2, "0")}
                                    </strong>
                                    <span className="countdown-label text-[1rem] sm:text-xs uppercase tracking-wider mt-1">
                                        {label}
                                    </span>
                                </FoldBox>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Countdown;
