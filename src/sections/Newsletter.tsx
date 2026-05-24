import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // Simulate subscription success
    // In production, this would integrate with a service like Mailchimp, ConvertKit, or a custom API
    setStatus('success');
    setMessage('Welcome to the community! Check your inbox to confirm.');
    setEmail('');

    // Reset after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#282b2f',
        padding: '120px 40px',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }} ref={formRef}>
        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'rgba(255,204,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <Mail size={24} style={{ color: '#ffcc00' }} />
        </div>

        {/* Label */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: '#ffcc00',
            marginBottom: 20,
          }}
        >
          THE WEEKLY LEGEND
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 400,
            color: '#f1f1ee',
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          Stories That Inspire, Delivered Weekly
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: '#968671',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 520,
            margin: '0 auto 40px',
          }}
        >
          Every week, we publish one deeply researched story about a technology legend. Join 12,000+ readers who start their week with inspiration.
        </p>

        {/* Form */}
        {status === 'success' ? (
          <div
            style={{
              background: 'rgba(255,204,0,0.1)',
              border: '1px solid rgba(255,204,0,0.3)',
              borderRadius: 12,
              padding: '28px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            <Check size={24} style={{ color: '#ffcc00', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: '#f1f1ee' }}>
                You're subscribed!
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginTop: 4 }}>
                {message}
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: 12,
              maxWidth: 520,
              margin: '0 auto',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#968671',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  borderRadius: 99,
                  border: status === 'error' ? '1px solid #e74c3c' : '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: '#f1f1ee',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#ffcc00';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,204,0,0.1)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '14px 32px',
                borderRadius: 99,
                border: 'none',
                background: '#ffcc00',
                color: '#282b2f',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f1f1ee';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ffcc00';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        )}

        {status === 'error' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              marginTop: 12,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: '#e74c3c',
            }}
          >
            <AlertCircle size={14} /> {message}
          </div>
        )}

        {/* Trust signals */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            marginTop: 28,
            flexWrap: 'wrap',
          }}
        >
          {['No spam, ever', 'Unsubscribe anytime', 'Free forever'].map(item => (
            <span
              key={item}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: '#968671',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Check size={12} style={{ color: '#968671' }} /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
