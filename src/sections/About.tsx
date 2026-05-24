import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          delay: 0.15,
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
      id="about"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48,
          alignItems: 'center',
        }}
      >
        <div ref={imageRef} style={{ opacity: 0 }}>
          <img
            src="/images/about-mission.jpg"
            alt="Modern library reading room"
            style={{
              width: '100%',
              aspectRatio: '4/5',
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </div>
        <div ref={textRef} style={{ opacity: 0 }}>
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
            ABOUT THE ARCHIVE
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              color: '#282b2f',
              lineHeight: 1.2,
              marginTop: 16,
            }}
          >
            Preserving the Stories Behind the Screens
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#282b2f',
              opacity: 0.75,
              lineHeight: 1.7,
              marginTop: 24,
            }}
          >
            Every device in your pocket, every app you open, every connection you make -- traces back to a human being who dared to imagine differently. This archive exists to ensure those names and stories endure.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#282b2f',
              opacity: 0.75,
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            From the mathematicians who defined computation before computers existed, to the builders wiring the world in garages and dorm rooms, to the visionaries today charting paths through artificial intelligence -- these are their stories.
          </p>
          <a
            href="#"
            style={{
              display: 'inline-block',
              marginTop: 32,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#ffcc00',
              textDecoration: 'none',
              transition: 'text-decoration 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            Read Our Story &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
