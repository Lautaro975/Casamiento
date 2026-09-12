"use client";

import { useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DIETARY_RESTRICTIONS } from "../../../constants/dietaryRestrictions";
import { buildWhatsAppUrl, RSVP } from "../../../constants/rsvp";
import { AnimatedParagraph } from "../Animations/textAnimation";
import { AnimatedTitle } from "../Animations/titleAnimation";
import EventButton from "../EventButton";
import DietarySelect from "./DietarySelect";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DEFAULT_DIETARY_VALUE = DIETARY_RESTRICTIONS.options[0].value;

function getDietaryLabel(value: string) {
    return (
        DIETARY_RESTRICTIONS.options.find((option) => option.value === value)
            ?.label ?? DIETARY_RESTRICTIONS.options[0].label
    );
}

const Rsvp = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const dietaryBlockRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const selectWrapRef = useRef<HTMLDivElement>(null);
    const dietarySelectId = useId();
    const dietaryLabelId = useId();
    const [dietaryRestriction, setDietaryRestriction] =
        useState<string>(DEFAULT_DIETARY_VALUE);

    const dietaryLabel = getDietaryLabel(dietaryRestriction);

    const whatsappLinks = useMemo(
        () =>
            RSVP.contacts.map((contact) => ({
                ...contact,
                whatsappUrl: buildWhatsAppUrl(contact.phone, dietaryLabel),
            })),
        [dietaryLabel],
    );

    useGSAP(
        () => {
            const trigger = dietaryBlockRef.current ?? sectionRef.current;
            const dietaryTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger,
                    start: "top 85%",
                    once: true,
                },
            });

            dietaryTimeline
                .from(labelRef.current, {
                    y: 12,
                    opacity: 0,
                    duration: 0.65,
                    ease: "power2.out",
                })
                .from(
                    selectWrapRef.current,
                    {
                        y: 18,
                        opacity: 0,
                        scale: 0.96,
                        duration: 0.85,
                        ease: "back.out(1.4)",
                    },
                    "-=0.35",
                );

            gsap.from(".rsvp-button", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    once: true,
                },
                y: 16,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="wrapper rsvp mt-16 pb-8 sm:mt-60 sm:pb-12"
            aria-labelledby="rsvp-heading"
        >
            <div className="plane-fade-card rsvp-card">
                <div className="plane-fade-card__content rsvp-card__content">
                    <AnimatedTitle
                        id="rsvp-heading"
                        text={RSVP.title}
                        className="rsvp-title mx-auto text-balance text-center font-serif!"
                        y={16}
                        stagger={0.02}
                        ease="power2.out"
                    />
                    <div className="rsvp-intro">
                        <AnimatedParagraph
                            text={RSVP.subtitle}
                            className="rsvp-subtitle text-center!"
                        />
                    </div>

                    <div
                        ref={dietaryBlockRef}
                        className="rsvp-dietary w-full max-w-lg text-center md:text-left"
                    >
                        <label
                            ref={labelRef}
                            id={dietaryLabelId}
                            htmlFor={dietarySelectId}
                            className="rsvp-dietary__label"
                        >
                            {DIETARY_RESTRICTIONS.label}
                        </label>
                        <DietarySelect
                            value={dietaryRestriction}
                            onChange={setDietaryRestriction}
                            triggerId={dietarySelectId}
                            labelId={dietaryLabelId}
                            rootRef={selectWrapRef}
                        />
                    </div>

                    <div className="rsvp-buttons flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:justify-center">
                        {whatsappLinks.map((contact) => (
                            <div
                                key={contact.label}
                                className="rsvp-button flex flex-1 min-w-0 sm:flex-none"
                            >
                                <EventButton
                                    href={contact.whatsappUrl}
                                    label={contact.label}
                                    variant={contact.variant}
                                    srSuffix=" (WhatsApp)"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rsvp;
