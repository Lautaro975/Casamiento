'use client'
import { useRef } from "react";
import { cursorImages } from "../constants/cursorImages";
import AirplaneScroll from "./components/AnimationPlane/animationPlane";
import ImageTrail from "./components/Animations/cursorFollow";
import Hero from "./components/Hero";
import MobileHeroPhotos from "./components/Hero/MobileHeroPhotos";
import CountDown from './components/CountDown/index'
import EventDetails from './components/EventDetails'
import DressCode from './components/DressCode'
import Gift from './components/Gift'
import Rsvp from './components/Rsvp'
import ScrollFloat from './components/Animations/ScrollFloat'

export default function Home() {
  const scrollFloatSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="flex min-h-full flex-col flex-1 items-center content-surface dark:bg-black">
      <AirplaneScroll>
        <main className="relative w-full">
          <div className="relative h-screen w-full hero-surface page-content-stack">
            <MobileHeroPhotos items={cursorImages.slice(0, 7)} />
            <div className="absolute inset-0 z-10 hidden md:block">
              <ImageTrail items={cursorImages} variant={1} />
            </div>
            <Hero />
          </div>
          <div className="page-content-stack py-10 sm:py-14">
            <CountDown targetDate="2026-12-12T19:00:00-03:00" />
            <EventDetails />
            <DressCode />
            <Rsvp />
            <Gift />
          </div>
          <section
            ref={scrollFloatSectionRef}
            data-plane-fade
            className="scroll-float-section content-surface"
            aria-label="Mensaje final"
          >
            <ScrollFloat
              triggerRef={scrollFloatSectionRef}
              containerClassName="scroll-float-title"
              textClassName="font-serif text-accent"
              scrollStart="top bottom"
              scrollEnd="bottom bottom"
              stagger={0.02}
            >
              Te esperamos para
              perrear hasta el piso
            </ScrollFloat>
          </section>
        </main>
      </AirplaneScroll>
    </div>
  );
}
