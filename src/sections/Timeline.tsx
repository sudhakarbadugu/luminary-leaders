import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eras } from '../data/leaders';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      id="timeline"
      className="relative z-[2] bg-brand-bg dark:bg-brand-bg-dark"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <div className="font-inter text-[11px] font-medium uppercase tracking-[2px] text-brand-muted dark:text-brand-muted-dark">
            TIMELINE
          </div>
          <h2 className="font-instrument font-normal text-[clamp(28px,3vw,40px)] text-brand-dark dark:text-brand-text-dark mt-4">
            Eight Eras of Innovation
          </h2>
        </div>
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {eras.map((era, idx) => (
            <div
              key={era.name}
              ref={el => { if (el) cardsRef.current[idx] = el; }}
              className="opacity-0 bg-brand-bg dark:bg-brand-card-dark border border-brand-border dark:border-brand-border-dark rounded-xl p-10 px-8"
            >
              <h3 className="font-instrument text-2xl text-brand-dark dark:text-brand-text-dark">
                {era.name}
              </h3>
              <div className="font-inter text-xs text-brand-muted dark:text-brand-muted-dark mt-1">
                {era.range}
              </div>
              <p className="font-inter text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed mt-4">
                {era.desc}
              </p>
              <div className="font-inter text-xs text-brand-muted dark:text-brand-muted-dark mt-4 italic">
                {era.leaders}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
