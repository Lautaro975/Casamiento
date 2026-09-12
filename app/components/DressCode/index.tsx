"use client";

import { DRESS_CODE } from "../../../constants/dressCode";
import { AnimatedParagraph } from "../Animations/textAnimation";
import { AnimatedTitle } from "../Animations/titleAnimation";

const DressCode = () => {
    return (
        <section
            className="wrapper dress-code mt-24 pb-12 sm:mt-60"
            aria-labelledby="dress-code-heading"
        >
            <div className="dress-code__layout flex flex-col gap-10 md:flex-row md:items-start md:gap-16 lg:gap-24">
                <div className="dress-code__intro flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                    <AnimatedParagraph
                        text={DRESS_CODE.eyebrow}
                        className="dress-code__eyebrow"
                    />
                    <AnimatedTitle
                        id="dress-code-heading"
                        text={DRESS_CODE.title}
                        className="dress-code__title font-serif!"
                        y={16}
                        stagger={0.02}
                        ease="power2.out"
                    />
                    <AnimatedParagraph
                        id="dress-code-title"
                        text={DRESS_CODE.code}
                        className="dress-code__code font-serif! mt-6 sm:mt-8"
                    />
                </div>

                <div className="dress-code__details flex flex-1 flex-col gap-6 sm:gap-8 text-center md:text-left">
                    <AnimatedParagraph
                        text={DRESS_CODE.comfort}
                        className="dress-code__text"
                    />
                    <AnimatedParagraph
                        text={DRESS_CODE.colors}
                        className="dress-code__text dress-code__text--note"
                    />
                </div>
            </div>
        </section>
    );
};

export default DressCode;
