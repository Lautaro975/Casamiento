"use client"

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AnimatedTitle = ({ text, className = "" }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Seleccionamos todos los spans con la clase 'letter' dentro de este componente
    gsap.from(".letter", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Arranca cuando el elemento llega al 85% de la pantalla
        toggleActions: "play none none reverse", // Se reproduce al bajar y se revierte al subir
      },
      y: 50,           // Viene desde 50px abajo
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)", // Efecto rebote suave
      stagger: 0.05,   // Retraso de 0.05s entre cada letra
    });
  }, { scope: containerRef });

  return (
    <h1 ref={containerRef} className={className} style={{ margin: 0 }}>
      {text.split("").map((char: string, index: number) => (
        <span
          key={index}
          className="letter"
          style={{ 
            display: 'inline-block',
            whiteSpace: 'pre' 
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

