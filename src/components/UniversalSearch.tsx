import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X, Users, TrendingUp, Trophy, FlaskConical, Crosshair, ArrowRight } from 'lucide-react';
import { leaders, traders, athletes, cricketers, scientists, bioData, traderBioData, athleteBioData, cricketerBioData, scientistBioData } from '../data';
import { getInitials } from '../utils/visual';

interface SearchResult {
  id: string;
  name: string;
  role: string;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  nationality?: string;
  born?: string;
  era?: string;
  image?: string;
  matchScore: number;
}

const CATEGORY_CONFIG = {
  leader: { label: 'Leader', icon: Users, color: '#7b1fa2', route: 'leader' },
  trader: { label: 'Trader', icon: TrendingUp, color: '#e65100', route: 'trader' },
  athlete: { label: 'Athlete', icon: Trophy, color: '#2e7d32', route: 'athlete' },
  cricketer: { label: 'Cricketer', icon: Crosshair, color: '#1976d2', route: 'cricketer' },
  scientist: { label: 'Scientist', icon: FlaskConical, color: '#7b1fa2', route: 'scientist' },
};


export default function UniversalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Build searchable index
  const allFigures = useMemo(() => {
    const results: SearchResult[] = [];
    
    leaders.forEach((l) => {
      const bio = bioData[l.id];
      results.push({
        id: l.id,
        name: l.name,
        role: l.role,
        category: 'leader',
        nationality: bio?.nationality,
        born: bio?.born,
        era: l.era,
        image: l.image,
        matchScore: 0,
      });
    });
    
    traders.forEach((t) => {
      const bio = traderBioData[t.id];
      results.push({
        id: t.id,
        name: t.name,
        role: t.role,
        category: 'trader',
        nationality: bio?.nationality,
        born: bio?.born,
        era: t.era,
        image: t.image,
        matchScore: 0,
      });
    });
    
    athletes.forEach((a) => {
      const bio = athleteBioData[a.id];
      results.push({
        id: a.id,
        name: a.name,
        role: a.role,
        category: 'athlete',
        nationality: bio?.nationality,
        born: bio?.born,
        era: a.era,
        image: a.image,
        matchScore: 0,
      });
    });
    
    cricketers.forEach((c) => {
      const bio = cricketerBioData[c.id];
      results.push({
        id: c.id,
        name: c.name,
        role: c.role,
        category: 'cricketer',
        nationality: bio?.nationality,
        born: bio?.born,
        era: c.era,
        image: c.image,
        matchScore: 0,
      });
    });
    
    scientists.forEach((s) => {
      const bio = scientistBioData[s.id];
      results.push({
        id: s.id,
        name: s.name,
        role: s.role,
        category: 'scientist',
        nationality: bio?.nationality,
        born: bio?.born,
        era: s.era,
        image: s.image,
        matchScore: 0,
      });
    });
    
    return results;
  }, []);

  // Search logic
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase().trim();
    const scored = allFigures.map(figure => {
      let score = 0;
      const nameLower = figure.name.toLowerCase();
      const roleLower = figure.role.toLowerCase();
      
      // Name match (highest priority)
      if (nameLower === q) score += 100;
      else if (nameLower.startsWith(q)) score += 80;
      else if (nameLower.includes(q)) score += 60;
      
      // Role match
      if (roleLower.includes(q)) score += 40;
      
      // Nationality match
      if (figure.nationality?.toLowerCase().includes(q)) score += 30;
      
      // Era match
      if (figure.era?.toLowerCase().includes(q)) score += 20;
      
      // Born date match
      if (figure.born?.includes(q)) score += 20;
      
      return { ...figure, matchScore: score };
    }).filter(f => f.matchScore > 0);
    
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 20);
  }, [query, allFigures]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (result: SearchResult) => {
    const config = CATEGORY_CONFIG[result.category];
    navigate(`/${config.route}/${result.id}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 99,
          border: '1px solid #e5e5e0',
          background: 'white',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#968671',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffcc00'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,204,0,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e0'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <Search size={16} />
        <span>Search all 288 legends...</span>
        <kbd style={{ marginLeft: 8, padding: '2px 6px', borderRadius: 4, background: '#f1f1ee', fontSize: 11, fontFamily: 'monospace' }}>⌘K</kbd>
      </button>

      {/* Search overlay */}
      {isOpen && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(40,43,47,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh',
          }}
          onClick={() => { setIsOpen(false); setQuery(''); }}
        >
          <div
            style={{
              width: 'min(600px, 90vw)',
              background: 'white',
              borderRadius: 16,
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <Search size={20} style={{ color: '#968671' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search across all 288 leaders, traders, athletes, cricketers, scientists..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  color: '#282b2f',
                }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <X size={18} style={{ color: '#968671' }} />
                </button>
              )}
              <kbd style={{ padding: '4px 8px', borderRadius: 4, background: '#f1f1ee', fontSize: 11, fontFamily: 'monospace', color: '#968671' }}>ESC</kbd>
            </div>

            {/* Results */}
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {results.length > 0 ? (
                <div style={{ padding: '8px 0' }}>
                  {results.map((result, i) => {
                    const config = CATEGORY_CONFIG[result.category];
                    const Icon = config.icon;
                    return (
                      <button
                        key={`${result.category}-${result.id}`}
                        onClick={() => handleSelect(result)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          width: '100%',
                          padding: '12px 20px',
                          border: 'none',
                          background: i === 0 ? '#faf8f3' : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#faf8f3'; }}
                        onMouseLeave={e => { if (i !== 0) e.currentTarget.style.background = 'transparent'; }}
                      >
                        {/* Avatar */}
                        <div style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: result.image ? `url(${result.image}) center/cover` : config.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 14,
                          fontWeight: 600,
                          flexShrink: 0,
                        }}>
                          {!result.image && getInitials(result.name)}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#282b2f' }}>
                              {result.name}
                            </span>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '2px 8px',
                              borderRadius: 99,
                              fontSize: 11,
                              fontWeight: 500,
                              background: `${config.color}15`,
                              color: config.color,
                            }}>
                              <Icon size={10} />
                              {config.label}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: '#968671', display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span>{result.role}</span>
                            {result.nationality && <span>• {result.nationality}</span>}
                            {result.born && <span>• {result.born}</span>}
                            {result.era && <span>• {result.era}</span>}
                          </div>
                        </div>

                        <ArrowRight size={16} style={{ color: '#968671', flexShrink: 0 }} />
                      </button>
                    );
                  })}
                </div>
              ) : query.trim() ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#968671', fontFamily: "'Inter', sans-serif" }}>
                  <Search size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <div style={{ fontSize: 14 }}>No results found for "{query}"</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Try a different name, role, or nationality</div>
                </div>
              ) : (
                <div style={{ padding: '20px 20px 12px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#968671', marginBottom: 12 }}>
                    Categories
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                      const Icon = config.icon;
                      const counts = { leader: 143, trader: 73, athlete: 26, cricketer: 5, scientist: 41 };
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setQuery(config.label);
                            inputRef.current?.focus();
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '12px 16px',
                            borderRadius: 10,
                            border: '1px solid #f0f0f0',
                            background: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = config.color; e.currentTarget.style.background = `${config.color}08`; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.background = 'white'; }}
                        >
                          <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: `${config.color}15`,
                            color: config.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#282b2f' }}>{config.label}s</div>
                            <div style={{ fontSize: 11, color: '#968671' }}>{counts[key as keyof typeof counts]} figures</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '8px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#968671', fontFamily: "'Inter', sans-serif" }}>
              <span>{allFigures.length} total figures indexed</span>
              <span>{results.length} results</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
