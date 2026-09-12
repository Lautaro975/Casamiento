"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Hinge = "top" | "bottom" | "left" | "right";
type Trigger = "mount" | "scroll";

export interface FoldBoxProps {
  children: ReactNode;
  hinge?: Hinge;
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: Trigger;
  className?: string;
  style?: CSSProperties;
}

const HINGE_CONFIG = {
  top: { origin: "50% 0%", rotateX: -92, rotateY: 0 },
  bottom: { origin: "50% 100%", rotateX: 92, rotateY: 0 },
  left: { origin: "0% 50%", rotateX: 0, rotateY: 92 },
  right: { origin: "100% 50%", rotateX: 0, rotateY: -92 },
} as const;

const FoldBox = ({
  children,
  hinge = "top",
  duration = 0.65,
  delay = 0,
  ease = "power3.out",
  trigger = "scroll",
  className = "",
  style = {},
}: FoldBoxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return undefined;

    const config = HINGE_CONFIG[hinge];
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const fromVars = {
      opacity: 0,
      rotateX: reduceMotion ? 0 : config.rotateX,
      rotateY: reduceMotion ? 0 : config.rotateY,
      transformOrigin: config.origin,
      force3D: true,
    };

    const toVars = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      duration: reduceMotion ? 0.22 : duration,
      delay,
      ease: reduceMotion ? "power1.out" : ease,
      clearProps: "willChange",
    };

    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;

    const play = () => {
      gsap.fromTo(el, fromVars, toVars);
    };

    if (trigger === "scroll") {
      gsap.set(el, fromVars);
      scrollTrigger = ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: play,
      });
    } else {
      play();
    }

    return () => {
      scrollTrigger?.kill();
      gsap.killTweensOf(el);
    };
  }, [hinge, duration, delay, ease, trigger]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default FoldBox;
