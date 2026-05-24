import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Submit() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', nominee: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
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
        infoRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '1px solid #282b2f',
    background: 'transparent',
    padding: '14px 0',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: '#282b2f',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    marginBottom: 24,
  };

  return (
    <section
      ref={sectionRef}
      id="submit"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: '140px 40px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 80,
        }}
      >
        <div ref={formRef} style={{ opacity: 0 }}>
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
            CONTRIBUTE
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              color: '#282b2f',
              marginTop: 16,
              marginBottom: 40,
            }}
          >
            Nominate a Legend
          </h2>
          {submitted ? (
            <div
              style={{
                padding: 40,
                background: 'rgba(255,204,0,0.1)',
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 500, color: '#282b2f' }}>
                Thank you for your nomination!
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671', marginTop: 8 }}>
                We will review it against our methodology.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                style={inputStyle}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Nominee Name"
                value={formData.nominee}
                onChange={e => setFormData(prev => ({ ...prev, nominee: e.target.value }))}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Why should this person be included?"
                value={formData.reason}
                onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: 100,
                  borderBottom: '1px solid #282b2f',
                }}
                required
              />
              <button
                type="submit"
                style={{
                  background: '#282b2f',
                  color: '#f1f1ee',
                  borderRadius: 99,
                  padding: '16px 48px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 32,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffcc00';
                  e.currentTarget.style.color = '#282b2f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#282b2f';
                  e.currentTarget.style.color = '#f1f1ee';
                }}
              >
                Submit Nomination
              </button>
            </form>
          )}
        </div>
        <div ref={infoRef} style={{ opacity: 0 }}>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              color: '#282b2f',
            }}
          >
            Who Belongs Here?
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#968671',
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            We welcome nominations for technology leaders -- living or historical -- whose work has fundamentally shaped how we live, work, and connect. Innovators, founders, researchers, engineers, investors, and advocates all have a place in this archive.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#968671',
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            Each nomination is reviewed against our four criteria: Impact, Innovation, Resilience, and Inspiration.
          </p>
        </div>
      </div>
    </section>
  );
}
