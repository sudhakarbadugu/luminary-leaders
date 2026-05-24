import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] bg-brand-bg dark:bg-brand-bg-dark"
      style={{ padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)' }}
    >
      <div
        ref={quoteRef}
        className="max-w-[800px] mx-auto text-center opacity-0"
      >
        <div className="w-10 h-0.5 bg-brand-accent mx-auto mb-8" />
        <blockquote className="font-instrument italic text-brand-dark dark:text-brand-text-dark leading-snug" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
          "The people who are crazy enough to think they can change the world are the ones who do."
        </blockquote>
        <div className="font-inter text-sm text-brand-muted dark:text-brand-muted-dark mt-8">
          -- Steve Jobs, 1997
        </div>
      </div>
    </section>
  );
}
