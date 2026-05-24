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
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
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
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 80, opacity: 0 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: '#968671',
            }}
          >
            TIMELINE
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              color: '#282b2f',
              marginTop: 16,
            }}
          >
            Eight Eras of Innovation
          </h2>
        </div>
        <div
          ref={scrollRef}
          className="custom-scrollbar"
          style={{
            display: 'flex',
            gap: 24,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: 16,
          }}
        >
          {eras.map((era, idx) => (
            <div
              key={era.name}
              ref={el => { if (el) cardsRef.current[idx] = el; }}
              style={{
                opacity: 0,
                flexShrink: 0,
                width: 280,
                scrollSnapAlign: 'start',
                background: '#f1f1ee',
                border: '1px solid #e5e5e0',
                borderRadius: 12,
                padding: '40px 32px',
              }}
            >
              <h3
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 24,
                  color: '#282b2f',
                }}
              >
                {era.name}
              </h3>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: '#968671',
                  marginTop: 4,
                }}
              >
                {era.range}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#282b2f',
                  opacity: 0.7,
                  lineHeight: 1.6,
                  marginTop: 16,
                }}
              >
                {era.desc}
              </p>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: '#968671',
                  marginTop: 16,
                  fontStyle: 'italic',
                }}
              >
                {era.leaders}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
