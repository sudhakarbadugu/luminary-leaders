import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const scrollToLegends = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#legends', { duration: 1.2 });
    }
  }, [lenisRef]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.5')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.7')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className="relative z-[1] flex items-start min-h-screen px-5 md:px-10"
    >
      <div className="max-w-[1200px] w-full mx-auto pt-16">
        <div
          ref={labelRef}
          className="font-inter text-[11px] font-medium tracking-widest uppercase text-brand-muted dark:text-brand-muted-dark mb-8 opacity-0 translate-y-5"
        >
          A DIGITAL ARCHIVE
        </div>
        <h1
          ref={headlineRef}
          className="font-instrument text-clamp-hero font-normal text-brand-dark dark:text-brand-text-dark max-w-[700px] leading-tight opacity-0 translate-y-[30px]"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
        >
          The Visionaries Who Shaped Our World
        </h1>
        <p
          ref={subtitleRef}
          className="font-inter text-lg font-normal text-brand-muted dark:text-brand-muted-dark max-w-[480px] mt-6 leading-relaxed opacity-0 translate-y-5"
        >
          303 stories of visionaries across technology, markets, sports, cricket, and science — the people who shaped our world.
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToLegends}
          className="mt-12 rounded-full border border-brand-dark bg-transparent text-brand-dark dark:text-brand-text-dark dark:border-brand-text-dark px-9 py-3.5 font-inter text-[13px] font-medium cursor-pointer transition-all duration-300 hover:bg-brand-dark hover:text-brand-inverse dark:hover:bg-brand-text-dark dark:hover:text-brand-bg opacity-0 translate-y-5"
        >
          Explore the Legends
        </button>
      </div>
    </section>
  );
}
