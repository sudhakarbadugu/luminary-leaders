import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cricketers } from '../data/cricket';
import { Search, X, Trophy } from 'lucide-react';
import BookmarkButton from '../components/BookmarkButton';
import CompareToggleButton from '../components/CompareToggleButton';
import { getCategoryStyle } from '../utils/categoryStyles';

gsap.registerPlugin(ScrollTrigger);

const GRADIENT_COLORS = [
  ['#1a472a', '#2e7d32'], ['#0d47a1', '#1976d2'], ['#b71c1c', '#d32f2f'],
  ['#4a148c', '#7b1fa2'], ['#e65100', '#f57c00'], ['#1b5e20', '#388e3c'],
  ['#006064', '#0097a7'], ['#311b92', '#5e35b1'], ['#880e4f', '#c2185b'],
  ['#3e2723', '#5d4037'], ['#263238', '#455a64'], ['#01579b', '#0288d1'],
  ['#bf360c', '#e64a19'], ['#33691e', '#558b2f'], ['#4e342e', '#6d4c41'],
];

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function getGradient(id: number): string {
  const colors = GRADIENT_COLORS[id % GRADIENT_COLORS.length];
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

export default function CricketGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [visibleCount, setVisibleCount] = useState(24);
  const [eraFilter, setEraFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const eras = useMemo(() => ['All', ...Array.from(new Set(cricketers.map(c => c.era))).sort()], []);
  const roles = useMemo(() => {
    const set = new Set(cricketers.map(c => c.role));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    let result = cricketers;
    if (eraFilter !== 'All') result = result.filter(c => c.era === eraFilter);
    if (roleFilter !== 'All') result = result.filter(c => c.role === roleFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.nickname.toLowerCase().includes(q) || c.nationality.toLowerCase().includes(q) || c.role.toLowerCase().includes(q));
    }
    return result;
  }, [eraFilter, roleFilter, searchQuery]);

  const displayed = filtered.slice(0, visibleCount);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.08, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
    });
    return () => ctx.revert();
  }, [displayed]);

  const reset = () => { setEraFilter('All'); setRoleFilter('All'); setSearchQuery(''); setVisibleCount(24); };
  const hasActive = eraFilter !== 'All' || roleFilter !== 'All' || searchQuery;

  return (
    <section ref={sectionRef} id="cricket" style={{ position: 'relative', zIndex: 2, background: '#f1f1ee', padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)', borderTop: '1px solid #e5e5e0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: getCategoryStyle('cricketer').accent, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}><Trophy size={14} /> THE GENTLEMEN'S GAME</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#282b2f', marginBottom: 16 }}>51 Greatest Cricketers</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#968671', maxWidth: 600, margin: '0 auto 40px' }}>From the village greens of England to the maidans of Mumbai — the batsmen, bowlers, and all-rounders who made cricket the world's second-most popular sport.</p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: 700, margin: '0 auto 24px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#968671', pointerEvents: 'none' }} />
          <input type="text" placeholder="Search cricketers by name, nickname, nationality, or role..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setVisibleCount(24); }}
            style={{ width: '100%', padding: '14px 48px', borderRadius: 99, border: '1px solid #e5e5e0', background: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#282b2f', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#ffcc00'; }} onBlur={e => { e.currentTarget.style.borderColor = '#e5e5e0'; }} />
          {searchQuery && <button onClick={() => { setSearchQuery(''); setVisibleCount(24); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#968671' }}><X size={16} /></button>}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setVisibleCount(24); }} style={{ padding: '10px 36px 10px 16px', borderRadius: 99, border: '1px solid #e5e5e0', background: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#282b2f', outline: 'none', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23968671' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
            {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
          </select>
          {hasActive && <button onClick={reset} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear all</button>}
        </div>

        {/* Era buttons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {eras.map(era => <button key={era} onClick={() => { setEraFilter(era); setVisibleCount(24); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, padding: '8px 16px', borderRadius: 99, border: '1px solid', borderColor: eraFilter === era ? '#282b2f' : '#e5e5e0', background: eraFilter === era ? '#282b2f' : 'transparent', color: eraFilter === era ? '#f1f1ee' : '#968671', cursor: 'pointer', transition: 'all 0.2s' }}>{era}</button>)}
        </div>

        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginBottom: 24, textAlign: 'center' }}>Showing {displayed.length} of {filtered.length} cricketers</div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 48, marginBottom: 64 }}>
            {displayed.map((cricketer, idx) => (
              <div key={cricketer.id} ref={el => { if (el) cardsRef.current[idx] = el; }} onClick={() => navigate(`/cricketer/${cricketer.id}`)} style={{ opacity: 0, cursor: 'pointer' }}>
                <div style={{ aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', position: 'relative', background: cricketer.image ? undefined : getGradient(cricketer.id) }}>
                  {cricketer.image ? (
                    <img src={cricketer.image} alt={cricketer.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 48 }}>{getInitials(cricketer.name)}</div>
                  )}
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(40,43,47,0.85)', backdropFilter: 'blur(4px)', color: '#f1f1ee', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 99, letterSpacing: 0.5 }}>{cricketer.role}</div>
                  {/* Action buttons */}
                  <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: 6, zIndex: 2 }}>
                    <BookmarkButton id={cricketer.id} category="cricketer" name={cricketer.name} nickname={cricketer.nickname} />
                    <CompareToggleButton item={{ id: cricketer.id, name: cricketer.name, nickname: cricketer.nickname, category: 'cricketer', field: cricketer.role, nationality: cricketer.nationality, born: cricketer.born, era: cricketer.era, image: cricketer.image }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: '#282b2f', marginTop: 16 }}>{cricketer.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginTop: 4 }}>{cricketer.nickname}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', opacity: 0.7, marginTop: 2 }}>{cricketer.nationality}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#968671', fontFamily: "'Inter', sans-serif" }}>
            <Trophy size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
            <p style={{ fontSize: 18 }}>No cricketers match your filters</p>
            <button onClick={reset} style={{ marginTop: 24, padding: '12px 32px', borderRadius: 99, border: 'none', background: '#282b2f', color: '#f1f1ee', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Reset All Filters</button>
          </div>
        )}

        {visibleCount < filtered.length && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setVisibleCount(prev => Math.min(prev + 12, filtered.length))} style={{ border: '1px solid #282b2f', borderRadius: 99, padding: '14px 36px', background: 'transparent', color: '#282b2f', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#282b2f'; e.currentTarget.style.color = '#f1f1ee'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#282b2f'; }}>Load More ({filtered.length - visibleCount} remaining)</button>
          </div>
        )}
      </div>
    </section>
  );
}
