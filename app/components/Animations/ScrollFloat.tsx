"use client";

import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  triggerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat = ({
  children,
  scrollContainerRef,
  triggerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let charIndex = 0;

    return lines.map((line, lineIndex) => {
      const words = line.split(/\s+/).filter(Boolean);

      return (
        <span key={`line-${lineIndex}`} className="block">
          {words.map((word, wordIndex) => (
            <span key={`word-${lineIndex}-${wordIndex}`} className="contents">
              {wordIndex > 0 ? (
                <span className="scroll-float-char inline-block" key={charIndex++}>
                  {"\u00A0"}
                </span>
              ) : null}
              <span className="scroll-float-word inline-block whitespace-nowrap">
                {word.split("").map((char) => (
                  <span className="scroll-float-char inline-block" key={charIndex++}>
                    {char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    const trigger = triggerRef?.current ?? el;
    if (!el || !trigger) return;

    const scroller =
      scrollContainerRef?.current != null ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll(".scroll-float-char");
    const mm = gsap.matchMedia();

    const createTween = (duration: number, charStagger: number) =>
      gsap.fromTo(
        charElements,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: charStagger,
          scrollTrigger: {
            trigger,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

    mm.add("(max-width: 639px)", () => {
      createTween(Math.min(animationDuration, 0.75), Math.min(stagger, 0.012));
    });

    mm.add("(min-width: 640px)", () => {
      createTween(animationDuration, stagger);
    });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      mm.revert();
    };
  }, [
    scrollContainerRef,
    triggerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  return (
    <h2
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span
        className={`inline-block text-[clamp(2.8rem,10vw,7rem)] leading-[1.2] ${textClassName}`}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;
