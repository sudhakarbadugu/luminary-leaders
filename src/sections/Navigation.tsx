import { useCallback } from 'react';
import DarkModeToggle from '../components/DarkModeToggle';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const scrollTo = useCallback((target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    }
  }, [lenisRef]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'rgba(241,241,238,0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e5e0',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          letterSpacing: 2,
          textTransform: 'uppercase' as const,
          color: '#282b2f',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#282b2f'; }}
      >
        LUMINARY
      </a>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { label: 'Legends', target: '#legends' },
          { label: 'Traders', target: '#traders' },
          { label: 'Athletes', target: '#sports' },
          { label: 'Cricket', target: '#cricket' },
          { label: 'Science', target: '#scientists' },
          { label: 'Stories', target: '#blog' },
          { label: 'About', target: '#about' },

          { label: 'Submit', target: '#submit' },
        ].map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.target)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: 0.5,
              color: '#282b2f',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffcc00'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#282b2f'; }}
          >
            {link.label}
          </button>
        ))}
      </div>
      <DarkModeToggle />
    </nav>
  );
}
