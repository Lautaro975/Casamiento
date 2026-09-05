'use client'
import { cursorImages } from "../constants/cursorImages";
import AirplaneScroll from "./components/AnimationPlane/animationPlane";
import ImageTrail from "./components/Animations/cursorFollow";
import Hero from "./components/Hero";
import MobileHeroPhotos from "./components/Hero/MobileHeroPhotos";
import CountDown from './components/CountDown/index'
import EventDetails from './components/EventDetails'

export default function Home() {
  return (
    <div className="flex min-h-full flex-col flex-1 items-center content-surface dark:bg-black">
      <AirplaneScroll>
        <main className="relative w-full min-h-[400dvh]">
          <div className="relative h-screen w-full overflow-hidden hero-surface">
            <MobileHeroPhotos items={cursorImages.slice(0, 7)} />
            <div className="absolute inset-0 z-10 hidden md:block">
              <ImageTrail items={cursorImages} variant={1} />
            </div>
            <Hero />
            <div className="surface-blend" aria-hidden="true" />
          </div>
          <div className="content-surface py-10 sm:py-14">
            <CountDown targetDate="2026-11-14T20:30:00-03:00" />
            <EventDetails />
          </div>
        </main>
      </AirplaneScroll>
    </div>
  );
}
