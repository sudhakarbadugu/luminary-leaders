import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import LeadersGrid from '../sections/LeadersGrid';
import Blog from '../sections/Blog';
import About from '../sections/About';
import Methodology from '../sections/Methodology';
import Timeline from '../sections/Timeline';
import Stats from '../sections/Stats';
import Quote from '../sections/Quote';

import TradersGrid from '../sections/TradersGrid';
import SportsGrid from '../sections/SportsGrid';
import CricketGrid from '../sections/CricketGrid';
import ScientistsGrid from '../sections/ScientistsGrid';
import Bookmarks from '../sections/Bookmarks';
import ProfileOfTheDay from '../sections/ProfileOfTheDay';
import Submit from '../sections/Submit';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollY = useRef(0);
  const scrollSpeed = useRef(0);
  const scrollDirection = useRef(1);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', (e: any) => {
      scrollY.current = e.scroll;
      scrollSpeed.current = e.velocity;
      scrollDirection.current = e.direction === 1 ? 1 : -1;
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <ParticleCanvas
        scrollY={scrollY}
        scrollSpeed={scrollSpeed}
        scrollDirection={scrollDirection}
      />
      <Navigation lenisRef={lenisRef} />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, var(--hero-gradient-overlay) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero lenisRef={lenisRef} />
        <ProfileOfTheDay />
        <LeadersGrid />
        <Blog />
        <About />
        <Methodology />
        <Timeline />
        <Stats />
        <Quote />
        <TradersGrid />
        <SportsGrid />
        <CricketGrid />
        <ScientistsGrid />
        <Bookmarks />
        <Submit />
        <Footer />
      </div>
    </div>
  );
}
