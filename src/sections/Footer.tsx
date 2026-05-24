import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    color: '#968671',
    textDecoration: 'none',
    display: 'block',
    marginBottom: 12,
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'left',
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#1e2023',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px) clamp(20px, 3vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#f1f1ee',
              }}
            >
              LUMINARY
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: '#968671',
                marginTop: 16,
                lineHeight: 1.6,
              }}
            >
              303 stories of human excellence. Deeply researched biographies of the pioneers who shaped our world across every field.
            </p>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#968671',
                marginBottom: 16,
              }}
            >
              Explore
            </div>
            {[
              { label: 'All Legends', action: () => scrollToSection('legends') },
              { label: 'Stories', action: () => navigate('/blog') },
              { label: 'By Era', action: () => scrollToSection('legends') },
              { label: 'Bookmarks', action: () => scrollToSection('bookmarks') },
            ].map(link => (
              <button
                key={link.label}
                onClick={link.action}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.color = '#f1f1ee'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#968671',
                marginBottom: 16,
              }}
            >
              About
            </div>
            {[
              { label: 'Our Story', action: () => scrollToSection('about') },
              { label: 'Methodology', action: () => scrollToSection('methodology') },
              { label: 'Editorial Standards', action: () => navigate('/blog') },
              { label: 'Submit a Legend', action: () => scrollToSection('submit') },
            ].map(link => (
              <button
                key={link.label}
                onClick={link.action}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.color = '#f1f1ee'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#968671',
                marginBottom: 16,
              }}
            >
              Legal
            </div>
            {[
              { label: 'Privacy Policy', action: () => navigate('/privacy') },
              { label: 'Terms of Use', action: () => navigate('/terms') },
              { label: 'Disclaimer', action: () => navigate('/terms') },
              { label: 'Install App', action: () => { window.dispatchEvent(new CustomEvent('install-pwa')); } },
            ].map(link => (
              <button
                key={link.label}
                onClick={link.action}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.color = '#f1f1ee'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            marginTop: 60,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: '#968671',
            }}
          >
            2026 The Luminary Archive. All stories are editorially independent.
          </span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy', path: '/privacy' },
              { label: 'Terms of Use', path: '/terms' },
            ].map(link => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: '#968671',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f1f1ee'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
