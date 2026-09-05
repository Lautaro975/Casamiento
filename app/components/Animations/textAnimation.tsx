"use client"
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimatedParagraphProps = {
  text: string;
  className?: string;
  id?: string;
};

export const AnimatedParagraph = ({ text, className = "", id }: AnimatedParagraphProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.from(".word", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 10,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out", // Suavidad sin rebote para textos largos
      stagger: 0.05,      // Retraso entre cada palabra
    });
  }, { scope: containerRef });

  return (
    <p ref={containerRef} id={id} className={className} style={{ lineHeight: 1.6 }}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="word"
          style={{
            display: 'inline-block', // Permite transformar cada palabra
            marginRight: '0.25em'    // Espaciado entre palabras
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};