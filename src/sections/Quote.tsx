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
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: '140px 40px',
      }}
    >
      <div
        ref={quoteRef}
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 2,
            background: '#ffcc00',
            margin: '0 auto 32px',
          }}
        />
        <blockquote
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(24px, 3vw, 40px)',
            fontStyle: 'italic',
            color: '#282b2f',
            lineHeight: 1.4,
          }}
        >
          "The people who are crazy enough to think they can change the world are the ones who do."
        </blockquote>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: '#968671',
            marginTop: 32,
          }}
        >
          -- Steve Jobs, 1997
        </div>
      </div>
    </section>
  );
}
