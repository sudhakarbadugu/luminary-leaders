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
      className="fixed right-4 bottom-4 z-[210] flex items-center justify-center w-11 h-11 rounded-full border border-brand-dark/10 bg-brand-accent text-brand-dark shadow-lg transition-all duration-200 hover:shadow-xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <ArrowUp size={20} strokeWidth={2.2} />
    </button>
  );
}
