"use client";

import Link from "next/link";
import { EVENT_DETAILS } from "../../../constants/eventDetails";
import { AnimatedParagraph } from "../Animations/textAnimation";
import { AnimatedTitle } from "../Animations/titleAnimation";
import { CalendarIcon, MapPinIcon } from "./icons";

const EventDetails = () => {
    return (
        <section
            className="wrapper mt-60 pb-12"
            aria-labelledby="event-details-title"
        >
            <div className="plane-fade-card event-card">
                <div className="plane-fade-card__veil" aria-hidden="true" />
                <div className="plane-fade-card__content flex flex-col items-center gap-10 sm:gap-12 text-center">
                    <div className="w-full">
                        <AnimatedTitle
                            text={EVENT_DETAILS.title}
                            className="event-title font-serif!"
                        />
                        <AnimatedParagraph
                            id="event-details-title"
                            text={EVENT_DETAILS.celebration}
                            className="event-label mt-10 sm:mt-12"
                        />
                    </div>

                    <div className="flex w-full max-w-lg flex-col gap-7 sm:gap-8">
                        <AnimatedParagraph
                            text={EVENT_DETAILS.dateLabel}
                            className="event-date"
                        />
                        <AnimatedParagraph
                            text={EVENT_DETAILS.time}
                            className="event-time"
                        />
                        <div className="event-venue space-y-4">
                            <AnimatedParagraph
                                text={EVENT_DETAILS.venue}
                                className="event-venue-name"
                            />
                            <AnimatedParagraph
                                text={EVENT_DETAILS.address}
                                className="event-address"
                            />
                        </div>
                    </div>

                    <div className="flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href={EVENT_DETAILS.calendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            prefetch={false}
                            className="event-button"
                        >
                            <CalendarIcon className="event-button__icon" />
                            <span className="event-button__label">Agendar la fecha</span>
                            <span className="sr-only"> (Google Calendar)</span>
                        </Link>
                        <Link
                            href={EVENT_DETAILS.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            prefetch={false}
                            className="event-button event-button--maps"
                        >
                            <MapPinIcon className="event-button__icon" />
                            <span className="event-button__label">Cómo llegar</span>
                            <span className="sr-only"> (Google Maps)</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetails;
