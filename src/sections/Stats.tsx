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
      className="relative z-[2] bg-brand-bg border-t border-b border-brand-border dark:bg-brand-bg-dark dark:border-brand-border-dark"
      style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}
    >
      <div
        className="max-w-[1200px] mx-auto text-center grid gap-12"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))' }}
      >
        {stats.map((stat, idx) => (
          <div key={stat.label}>
            <div className="font-instrument text-brand-dark dark:text-brand-text-dark leading-none" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
              {displayValues[idx]}
            </div>
            <div className="font-inter text-[13px] text-brand-muted dark:text-brand-muted-dark mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
