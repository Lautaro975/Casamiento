"use client"

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimatedTitleProps = {
  text: string;
  className?: string;
  id?: string;
  y?: number;
  stagger?: number;
  ease?: string;
};

export const AnimatedTitle = ({
  text,
  className = "",
  id,
  y = 50,
  stagger = 0.05,
  ease = "back.out(1.7)",
}: AnimatedTitleProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(".letter", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
      y,
      opacity: 0,
      duration: 0.8,
      ease,
      stagger,
    });
  }, { scope: containerRef });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <h1 ref={containerRef} id={id} className={className} style={{ margin: 0 }}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="title-word"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            marginRight: wordIndex < words.length - 1 ? "0.25em" : undefined,
          }}
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="letter"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};

