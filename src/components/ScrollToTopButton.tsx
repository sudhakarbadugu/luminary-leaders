import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 360);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 210,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1px solid rgba(40, 43, 47, 0.12)',
        background: '#ffcc00',
        color: '#282b2f',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.24)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
      }}
    >
      <ArrowUp size={20} strokeWidth={2.2} />
    </button>
  );
}
