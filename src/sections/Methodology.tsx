import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const criteria = [
  { num: '01', title: 'Impact', body: 'Measured by lasting influence on technology, industry, and society. Not fame -- transformative power.' },
  { num: '02', title: 'Innovation', body: 'Breakthrough thinking that created new paradigms, not incremental improvement.' },
  { num: '03', title: 'Resilience', body: 'Overcoming adversity -- personal, professional, or systemic -- to bring ideas to life.' },
  { num: '04', title: 'Inspiration', body: 'The ability to mobilize others, spark movements, and expand what humanity believes is possible.' },
];

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          stagger: 0.12,
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
      id="methodology"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#282b2f',
        color: '#f1f1ee',
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
            HOW WE CHOSE
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              color: '#f1f1ee',
              marginTop: 16,
            }}
          >
            Our Selection Methodology
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
            gap: 48,
          }}
        >
          {criteria.map((c, idx) => (
            <div
              key={c.num}
              ref={el => { if (el) cardsRef.current[idx] = el; }}
              style={{
                opacity: 0,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '40px 32px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 48,
                  color: '#ffcc00',
                  lineHeight: 1,
                }}
              >
                {c.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#f1f1ee',
                  marginTop: 16,
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#968671',
                  lineHeight: 1.6,
                  marginTop: 12,
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
