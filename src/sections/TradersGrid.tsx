import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { traders, traderBioData } from '../data';
import { Search, X, TrendingUp, Layers } from 'lucide-react';
import BookmarkButton from '../components/BookmarkButton';
import CompareToggleButton from '../components/CompareToggleButton';
import { getCategoryStyle } from '../utils/categoryStyles';
import { getInitials, getGradient, SECTION_GRADIENT_COLORS } from '../utils/visual';

gsap.registerPlugin(ScrollTrigger);



export default function TradersGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [visibleCount, setVisibleCount] = useState(24);
  const [eraFilter, setEraFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [marketFilter, setMarketFilter] = useState('All');
  const [strategyFilter, setStrategyFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const eras = ['All', ...new Set(traders.map(t => t.era))];

  const markets = useMemo(() => {
    const set = new Set<string>();
    traders.forEach(t => t.markets.forEach(m => set.add(m)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const strategies = useMemo(() => {
    const set = new Set(traders.map(t => t.strategy));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filteredTraders = useMemo(() => {
    let result = traders;
    if (eraFilter !== 'All') result = result.filter(t => t.era === eraFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.nickname.toLowerCase().includes(q) || t.strategy.toLowerCase().includes(q));
    }
    if (marketFilter !== 'All') result = result.filter(t => t.markets.includes(marketFilter));
    if (strategyFilter !== 'All') result = result.filter(t => t.strategy === strategyFilter);
    return result;
  }, [eraFilter, searchQuery, marketFilter, strategyFilter]);

  const displayed = filteredTraders.slice(0, visibleCount);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.08, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } });
    });
    return () => ctx.revert();
  }, [displayed]);

  const resetFilters = () => { setEraFilter('All'); setSearchQuery(''); setMarketFilter('All'); setStrategyFilter('All'); setVisibleCount(24); };
  const hasActiveFilters = eraFilter !== 'All' || searchQuery || marketFilter !== 'All' || strategyFilter !== 'All';

  return (
    <section ref={sectionRef} id="traders" style={{ position: 'relative', zIndex: 2, background: '#f1f1ee', padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)', borderTop: '1px solid #e5e5e0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: getCategoryStyle('trader').accent, marginBottom: 16 }}>THE MARKET MASTERS</div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#282b2f', marginBottom: 16 }}>50 Greatest Traders of All Time</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#968671', maxWidth: 600, margin: '0 auto 40px' }}>From Jesse Livermore's bucket shops to Jim Simons' algorithms — the legends who conquered markets across every era and strategy.</p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: 700, margin: '0 auto 32px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#968671', pointerEvents: 'none' }} />
          <input type="text" placeholder="Search by name, nickname, or strategy..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setVisibleCount(24); }}
            style={{ width: '100%', padding: '14px 48px', borderRadius: 99, border: '1px solid #e5e5e0', background: '#fff', fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#282b2f', outline: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#ffcc00'; }} onBlur={e => { e.currentTarget.style.borderColor = '#e5e5e0'; }} />
          {searchQuery && <button onClick={() => { setSearchQuery(''); setVisibleCount(24); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#968671' }}><X size={16} /></button>}
        </div>

        {/* Filter Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, padding: '10px 20px', borderRadius: 99, border: '1px solid', borderColor: isFilterOpen ? '#282b2f' : '#e5e5e0', background: isFilterOpen ? '#282b2f' : 'transparent', color: isFilterOpen ? '#f1f1ee' : '#968671', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={14} /> Filters {hasActiveFilters && '(Active)'}
          </button>
          {hasActiveFilters && <button onClick={resetFilters} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear all filters</button>}
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="card-bg" style={{ maxWidth: 800, margin: "0 auto 40px", padding: "28px 32px", background: "#fff", borderRadius: 16, border: '1px solid #e5e5e0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: '#968671', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><TrendingUp size={12} /> Market</label>
              <select value={marketFilter} onChange={e => { setMarketFilter(e.target.value); setVisibleCount(24); }} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e5e0', background: '#f1f1ee', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#282b2f', outline: 'none', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23968671' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 32 }}>
                {markets.map(m => <option key={m} value={m}>{m === 'All' ? 'All Markets' : m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: '#968671', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Layers size={12} /> Strategy</label>
              <select value={strategyFilter} onChange={e => { setStrategyFilter(e.target.value); setVisibleCount(24); }} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e5e0', background: '#f1f1ee', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#282b2f', outline: 'none', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23968671' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 32 }}>
                {strategies.map(s => <option key={s} value={s}>{s === 'All' ? 'All Strategies' : s}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {marketFilter !== 'All' && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, padding: '6px 14px', borderRadius: 99, background: '#282b2f', color: '#f1f1ee', display: 'flex', alignItems: 'center', gap: 6 }}>{marketFilter}<button onClick={() => { setMarketFilter('All'); setVisibleCount(24); }} style={{ background: 'none', border: 'none', color: '#f1f1ee', cursor: 'pointer', padding: 0 }}><X size={12} /></button></span>}
            {strategyFilter !== 'All' && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, padding: '6px 14px', borderRadius: 99, background: '#282b2f', color: '#f1f1ee', display: 'flex', alignItems: 'center', gap: 6 }}>{strategyFilter}<button onClick={() => { setStrategyFilter('All'); setVisibleCount(24); }} style={{ background: 'none', border: 'none', color: '#f1f1ee', cursor: 'pointer', padding: 0 }}><X size={12} /></button></span>}
          </div>
        )}

        {/* Era Buttons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {eras.map(era => <button key={era} onClick={() => { setEraFilter(era); setVisibleCount(24); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, padding: '8px 16px', borderRadius: 99, border: '1px solid', borderColor: eraFilter === era ? '#282b2f' : '#e5e5e0', background: eraFilter === era ? '#282b2f' : 'transparent', color: eraFilter === era ? '#f1f1ee' : '#968671', cursor: 'pointer', transition: 'all 0.2s' }}>{era}</button>)}
        </div>

        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginBottom: 24, textAlign: 'center' }}>Showing {displayed.length} of {filteredTraders.length} traders</div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 48, marginBottom: 64 }}>
            {displayed.map((trader, idx) => (
              <div key={trader.id} ref={el => { if (el) cardsRef.current[idx] = el; }} onClick={() => navigate(`/trader/${trader.id}`)} style={{ opacity: 0, cursor: 'pointer' }}>
                <div style={{ aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', position: 'relative', background: trader.image ? undefined : getGradient(SECTION_GRADIENT_COLORS, trader.id) }}>
                  {trader.image ? (
                    <img src={trader.image} alt={trader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 48 }}>{getInitials(trader.name)}</div>
                  )}
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(40,43,47,0.85)', backdropFilter: 'blur(4px)', color: '#f1f1ee', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 99, letterSpacing: 0.5 }}>{trader.nationality}</div>
                  {/* Action buttons */}
                  <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: 6, zIndex: 2 }}>
                    <BookmarkButton id={trader.id} category="trader" name={trader.name} nickname={trader.nickname} />
                    <CompareToggleButton item={{ id: trader.id, name: trader.name, nickname: trader.nickname, category: 'trader', field: trader.strategy, nationality: trader.nationality, born: trader.born || '', era: trader.era, image: trader.image }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500, color: '#282b2f', marginTop: 16 }}>{trader.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginTop: 4 }}>{trader.nickname}</div>
                
                {/* Visual badges row */}
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {trader.nationality && (
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: '#f1f1ee', color: '#968671', fontWeight: 500, letterSpacing: 0.3 }}>
                      {trader.nationality}
                    </span>
                  )}
                  {traderBioData[trader.id]?.born && (
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: '#282b2f10', color: '#282b2f', fontWeight: 500, letterSpacing: 0.3 }}>
                      {traderBioData[trader.id]?.born}
                    </span>
                  )}
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: '#e6510020', color: '#e65100', fontWeight: 500, letterSpacing: 0.3 }}>
                    {trader.era}
                  </span>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', opacity: 0.7, marginTop: 2 }}>{trader.strategy}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {trader.markets.slice(0, 3).map(m => <span key={m} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, padding: '2px 8px', borderRadius: 99, border: '1px solid #e5e5e0', color: '#968671' }}>{m}</span>)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#968671', fontFamily: "'Inter', sans-serif" }}>
            <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
            <p style={{ fontSize: 18 }}>No traders match your filters</p>
            <button onClick={resetFilters} style={{ marginTop: 24, padding: '12px 32px', borderRadius: 99, border: 'none', background: '#282b2f', color: '#f1f1ee', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Reset All Filters</button>
          </div>
        )}

        {visibleCount < filteredTraders.length && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredTraders.length))} style={{ border: '1px solid #282b2f', borderRadius: 99, padding: '14px 36px', background: 'transparent', color: '#282b2f', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#282b2f'; e.currentTarget.style.color = '#f1f1ee'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#282b2f'; }}>Load More ({filteredTraders.length - visibleCount} remaining)</button>
          </div>
        )}
      </div>
    </section>
  );
}
