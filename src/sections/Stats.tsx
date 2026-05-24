import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, label: 'Visionaries Documented' },
  { value: 8, label: 'Decades of Innovation' },
  { value: 23, label: 'Countries Represented' },
  { value: 1843, label: 'Starting with Ada' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayValues, setDisplayValues] = useState(stats.map(() => 0));
  const animatedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (animatedRef.current) return;
          animatedRef.current = true;

          stats.forEach((stat, idx) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                setDisplayValues(prev => {
                  const next = [...prev];
                  next[idx] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        },
      });
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
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)',
        borderTop: '1px solid #e5e5e0',
        borderBottom: '1px solid #e5e5e0',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          textAlign: 'center',
        }}
      >
        {stats.map((stat, idx) => (
          <div key={stat.label}>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(40px, 5vw, 64px)',
                color: '#282b2f',
                lineHeight: 1,
              }}
            >
              {displayValues[idx]}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: '#968671',
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
