"use client";

import { GIFT } from "../../../constants/gift";
import { AnimatedParagraph } from "../Animations/textAnimation";
import { AnimatedTitle } from "../Animations/titleAnimation";

const Gift = () => {
    return (
        <section
            className="wrapper gift mt-24 pb-12 sm:mt-60"
            data-plane-gift
            aria-labelledby="gift-heading"
        >
            <div className="gift__layout flex flex-col gap-10 md:flex-row md:items-start md:gap-16 lg:gap-24">
                <div className="gift__intro flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                    <AnimatedParagraph
                        text={GIFT.eyebrow}
                        className="gift__eyebrow"
                    />
                    <AnimatedTitle
                        id="gift-heading"
                        text={GIFT.title}
                        className="gift__title font-serif!"
                        y={16}
                        stagger={0.02}
                        ease="power2.out"
                    />
                </div>

                <div className="gift__details flex flex-1 flex-col gap-6 sm:gap-8 text-center md:text-left">
                    <AnimatedParagraph
                        text={GIFT.intro}
                        className="gift__text"
                    />
                    <div className="gift__transfer space-y-3 sm:space-y-4">
                        <AnimatedParagraph
                            text={GIFT.transfer.title}
                            className="gift__transfer-title font-serif!"
                        />
                        <AnimatedParagraph
                            text={GIFT.transfer.note}
                            className="gift__text gift__text--note"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gift;
