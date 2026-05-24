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
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 40px',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          paddingTop: 64,
        }}
      >
        <div
          ref={labelRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: '#968671',
            marginBottom: 32,
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          A DIGITAL ARCHIVE
        </div>
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 400,
            color: '#282b2f',
            maxWidth: 700,
            lineHeight: 1.1,
            opacity: 0,
            transform: 'translateY(30px)',
          }}
        >
          The Visionaries Who Shaped Our World
        </h1>
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: '#968671',
            maxWidth: 480,
            marginTop: 24,
            lineHeight: 1.6,
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          303 stories of visionaries across technology, markets, sports, cricket, and science — the people who shaped our world.
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToLegends}
          style={{
            marginTop: 48,
            border: '1px solid #282b2f',
            borderRadius: 99,
            padding: '14px 36px',
            background: 'transparent',
            color: '#282b2f',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#282b2f';
            e.currentTarget.style.color = '#f1f1ee';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#282b2f';
          }}
        >
          Explore the Legends
        </button>
      </div>
    </section>
  );
}
