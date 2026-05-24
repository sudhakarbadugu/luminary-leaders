import { useCallback, useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from '../components/DarkModeToggle';
import { useIsMobile } from '../hooks/useMediaQuery';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const scrollTo = useCallback((target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    }
    setMenuOpen(false);
  }, [lenisRef]);

  const links = [
    { label: 'Legends', target: '#legends' },
    { label: 'Traders', target: '#traders' },
    { label: 'Athletes', target: '#sports' },
    { label: 'Cricket', target: '#cricket' },
    { label: 'Science', target: '#scientists' },
    { label: 'Stories', target: '#blog' },
    { label: 'About', target: '#about' },
    { label: 'Submit', target: '#submit' },
  ];

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
        padding: isMobile ? '0 20px' : '0 40px',
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
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#282b2f'; }}
      >
        LUMINARY
      </a>

      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#282b2f',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {links.map((link) => (
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
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffcc00'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#282b2f'; }}
            >
              {link.label}
            </button>
          ))}
          <DarkModeToggle />
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            background: 'rgba(241,241,238,0.98)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: '1px solid #e5e5e0',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 99,
          }}
        >
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                letterSpacing: 0.5,
                color: '#282b2f',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.2s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffcc00'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#282b2f'; }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
