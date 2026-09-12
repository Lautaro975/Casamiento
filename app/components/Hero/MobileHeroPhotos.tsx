"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MobileHeroPhotosProps = {
  items: string[];
};

const PHOTO_LAYOUT = [
  {
    position: "top-[5%] left-[20%]",
    rotation: "-rotate-[11deg]",
    parallaxY: 90,
    parallaxX: 18,
    entranceX: -48,
    entranceY: -24,
  },
  {
    position: "top-[20%] left-[70%]",
    rotation: "rotate-[13deg]",
    parallaxY: 70,
    parallaxX: -22,
    entranceX: 48,
    entranceY: -20,
  },
  {
    position: "top-[20%] left-[0%]",
    rotation: "rotate-[8deg]",
    parallaxY: 110,
    parallaxX: 28,
    entranceX: -56,
    entranceY: 16,
  },
  {
    position: "top-[5%] right-[10%]",
    rotation: "rotate-[10deg]",
    parallaxY: 95,
    parallaxX: -26,
    entranceX: 56,
    entranceY: 12,
  },
  {
    position: "bottom-[5%] left-[20%]",
    rotation: "rotate-[7deg]",
    parallaxY: 150,
    parallaxX: 20,
    entranceX: -44,
    entranceY: 40,
  },
  {
    position: "bottom-[10%] right-[5%]",
    rotation: "-rotate-[9deg]",
    parallaxY: 130,
    parallaxX: -18,
    entranceX: 44,
    entranceY: 36,
  },
  {
    position: "bottom-[20%] -left-[5%]",
    rotation: "rotate-[12deg]",
    parallaxY: 170,
    parallaxX: 12,
    entranceX: 0,
    entranceY: 52,
  },
] as const;

export default function MobileHeroPhotos({ items }: MobileHeroPhotosProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const trigger = container.parentElement;
      if (!trigger) return;

      const photos = container.querySelectorAll<HTMLElement>("[data-parallax-photo]");
      const inners = container.querySelectorAll<HTMLElement>("[data-photo-inner]");

      inners.forEach((inner) => {
        gsap.set(inner, {
          opacity: 0,
          scale: 0.72,
          x: Number(inner.dataset.entranceX ?? 0),
          y: Number(inner.dataset.entranceY ?? 0),
        });
      });

      gsap.to(inners, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        delay: 0.55,
        ease: "power3.out",
      });

      photos.forEach((photo) => {
        const y = Number(photo.dataset.parallaxY ?? 100);
        const x = Number(photo.dataset.parallaxX ?? 0);

        gsap.fromTo(
          photo,
          { y: -y * 0.35, x: -x * 0.35 },
          {
            y: y * 0.65,
            x: x * 0.65,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top top",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const photos = PHOTO_LAYOUT.map((layout, index) => ({
    ...layout,
    src: items[index],
  })).filter((photo) => photo.src);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 md:hidden"
      aria-hidden
    >
      {photos.map((photo, index) => (
        <div
          key={index}
          data-parallax-photo
          data-parallax-y={photo.parallaxY}
          data-parallax-x={photo.parallaxX}
          className={`mobile-hero-photo absolute h-[16.5rem] w-[13rem] will-change-transform ${photo.position} ${photo.rotation}`}
        >
          <div
            data-photo-inner
            data-entrance-x={photo.entranceX}
            data-entrance-y={photo.entranceY}
            className="relative h-full w-full overflow-hidden rounded-[20px] opacity-0 shadow-[0_4px_20px_rgba(91,98,54,0.2)] will-change-transform"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="13rem"
              className="object-cover object-center"
              priority={index < 3}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
