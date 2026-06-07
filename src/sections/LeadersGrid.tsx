import { useEffect, useRef, useState, useMemo } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leaders, bioData } from '../data';
import { Search, X, Globe, Building2, Layers, Zap } from 'lucide-react';
import LeaderCard from '../components/LeaderCard';
import ReadStatusFilter from '../components/ReadStatusFilter';
import { getCategoryStyle } from '../utils/categoryStyles';
import { filterByReadStatus, type ReadFilter } from '../utils/readProfiles';

gsap.registerPlugin(ScrollTrigger);



export default function LeadersGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [fieldFilter, setFieldFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [readFilter, setReadFilter] = useState<ReadFilter>('all');

  const eras = ['All', ...new Set(leaders.map(l => l.era))];

  // Extract unique values for dropdowns from bioData and leaders
  const nationalities = useMemo(() => {
    const set = new Set<string>();
    Object.values(bioData).forEach(bio => {
      const b = bio as { nationality?: string };
      if (b.nationality) set.add(b.nationality);
    });
    return ['All', ...Array.from(set).sort()];
  }, []);

  const companies = useMemo(() => {
    const set = new Set<string>();
    leaders.forEach(l => {
      if (l.company) set.add(l.company);
    });
    return ['All', ...Array.from(set).sort()];
  }, []);

  const fields = useMemo(() => {
    const set = new Set<string>();
    leaders.forEach(l => {
      if (l.role) {
        // Extract key field terms from role
        const role = l.role.toLowerCase();
        if (role.includes('founder') || role.includes('co-founder')) set.add('Founder');
        if (role.includes('ceo')) set.add('CEO');
        if (role.includes('scientist') || role.includes('researcher')) set.add('Scientist');
        if (role.includes('engineer')) set.add('Engineer');
        if (role.includes('mathematician')) set.add('Mathematician');
        if (role.includes('designer') || role.includes('design')) set.add('Designer');
        if (role.includes('investor') || role.includes('partner')) set.add('Investor');
        if (role.includes('professor')) set.add('Academic');
      }
    });
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Apply all filters
  const filteredLeaders = useMemo(() => {
    let result = leaders;

    // Era filter
    if (filter !== 'All') {
      result = result.filter(l => l.era === filter);
    }

    // Search query (name, company, role)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q)
      );
    }

    // Nationality filter
    if (nationalityFilter !== 'All') {
      result = result.filter(l => {
        const bio = bioData[l.id];
        return bio?.nationality === nationalityFilter;
      });
    }

    // Company filter
    if (companyFilter !== 'All') {
      result = result.filter(l => l.company === companyFilter);
    }

    // Field filter
    if (fieldFilter !== 'All') {
      result = result.filter(l => {
        const role = l.role.toLowerCase();
        switch (fieldFilter) {
          case 'Founder': return role.includes('founder') || role.includes('co-founder');
          case 'CEO': return role.includes('ceo');
          case 'Scientist': return role.includes('scientist') || role.includes('researcher');
          case 'Engineer': return role.includes('engineer');
          case 'Mathematician': return role.includes('mathematician');
          case 'Designer': return role.includes('designer') || role.includes('design');
          case 'Investor': return role.includes('investor') || role.includes('partner');
          case 'Academic': return role.includes('professor');
          default: return true;
        }
      });
    }

    return filterByReadStatus(result, 'leader', readFilter);
  }, [filter, searchQuery, nationalityFilter, companyFilter, fieldFilter, readFilter]);

  const displayedLeaders = filteredLeaders.slice(0, visibleCount);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [displayedLeaders]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredLeaders.length));
  };

  const resetFilters = () => {
    setFilter('All');
    setSearchQuery('');
    setNationalityFilter('All');
    setCompanyFilter('All');
    setFieldFilter('All');
    setReadFilter('all');
    setVisibleCount(8);
  };

  const hasActiveFilters = filter !== 'All' || searchQuery || nationalityFilter !== 'All' || companyFilter !== 'All' || fieldFilter !== 'All' || readFilter !== 'all';

  // Nationality display map helper
  const getNationality = (leaderId: string) => {
    return bioData[leaderId]?.nationality || '';
  };

  return (
    <section
      ref={sectionRef}
      id="legends"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: getCategoryStyle('leader').accent,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            <Zap size={14} /> THE LEGENDS
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              color: '#282b2f',
              marginBottom: 16,
            }}
          >
            100 Stories of Human Ingenuity
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#968671',
              maxWidth: 600,
              margin: '0 auto 40px',
            }}
          >
            Search by name, filter by era, nationality, company, or field. Discover the pioneers who shaped technology.
          </p>
        </div>

        {/* Search Bar */}
        <div
          style={{
            maxWidth: 700,
            margin: '0 auto 32px',
            position: 'relative',
          }}
        >
          <Search
            size={18}
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
            type="text"
            placeholder="Search by name, company, or role..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setVisibleCount(24); }}
            style={{
              width: '100%',
              padding: '14px 48px 14px 48px',
              borderRadius: 99,
              border: '1px solid #e5e5e0',
              background: '#fff',
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#282b2f',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#ffcc00';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,204,0,0.15)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#e5e5e0';
              e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setVisibleCount(8); }}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#968671',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Toggle & Active Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              padding: '10px 20px',
              borderRadius: 99,
              border: '1px solid',
              borderColor: isFilterOpen ? '#282b2f' : '#e5e5e0',
              background: isFilterOpen ? '#282b2f' : 'transparent',
              color: isFilterOpen ? '#f1f1ee' : '#968671',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Layers size={14} />
            Filters {hasActiveFilters && '(Active)'}
          </button>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: '#968671',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '10px 0',
              }}
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Expandable Filter Panel */}
        {isFilterOpen && (
          <div
            className="card-bg"
            style={{
              maxWidth: 800,
              margin: '0 auto 40px',
              padding: '28px 32px',
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #e5e5e0',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
              gap: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            {/* Nationality Filter */}
            <div>
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: '#968671',
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Globe size={12} /> Nationality
              </label>
              <select
                value={nationalityFilter}
                onChange={e => { setNationalityFilter(e.target.value); setVisibleCount(24); }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #e5e5e0',
                  background: '#f1f1ee',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#282b2f',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23968671' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: 32,
                }}
              >
                {nationalities.map(n => (
                  <option key={n} value={n}>{n === 'All' ? 'All Countries' : n}</option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: '#968671',
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Building2 size={12} /> Company
              </label>
              <select
                value={companyFilter}
                onChange={e => { setCompanyFilter(e.target.value); setVisibleCount(24); }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #e5e5e0',
                  background: '#f1f1ee',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#282b2f',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23968671' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: 32,
                }}
              >
                {companies.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Companies' : c}</option>
                ))}
              </select>
            </div>

            {/* Field Filter */}
            <div>
              <label
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: '#968671',
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Layers size={12} /> Field / Role
              </label>
              <select
                value={fieldFilter}
                onChange={e => { setFieldFilter(e.target.value); setVisibleCount(24); }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1px solid #e5e5e0',
                  background: '#f1f1ee',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: '#282b2f',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23968671' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: 32,
                }}
              >
                {fields.map(f => (
                  <option key={f} value={f}>{f === 'All' ? 'All Fields' : f}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {filter !== 'All' && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  padding: '6px 14px',
                  borderRadius: 99,
                  background: '#282b2f',
                  color: '#f1f1ee',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Era: {filter}
                <button
                  onClick={() => { setFilter('All'); setVisibleCount(24); }}
                  style={{ background: 'none', border: 'none', color: '#f1f1ee', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {nationalityFilter !== 'All' && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  padding: '6px 14px',
                  borderRadius: 99,
                  background: '#282b2f',
                  color: '#f1f1ee',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {nationalityFilter}
                <button
                  onClick={() => { setNationalityFilter('All'); setVisibleCount(24); }}
                  style={{ background: 'none', border: 'none', color: '#f1f1ee', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {companyFilter !== 'All' && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  padding: '6px 14px',
                  borderRadius: 99,
                  background: '#282b2f',
                  color: '#f1f1ee',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {companyFilter}
                <button
                  onClick={() => { setCompanyFilter('All'); setVisibleCount(24); }}
                  style={{ background: 'none', border: 'none', color: '#f1f1ee', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {fieldFilter !== 'All' && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  padding: '6px 14px',
                  borderRadius: 99,
                  background: '#282b2f',
                  color: '#f1f1ee',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {fieldFilter}
                <button
                  onClick={() => { setFieldFilter('All'); setVisibleCount(24); }}
                  style={{ background: 'none', border: 'none', color: '#f1f1ee', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Era Filter Buttons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {eras.map(era => (
            <button
              key={era}
              onClick={() => { setFilter(era); setVisibleCount(24); }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                padding: '8px 16px',
                borderRadius: 99,
                border: '1px solid',
                borderColor: filter === era ? '#282b2f' : '#e5e5e0',
                background: filter === era ? '#282b2f' : 'transparent',
                color: filter === era ? '#f1f1ee' : '#968671',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {era}
            </button>
          ))}
        </div>

        <ReadStatusFilter
          category="leader"
          totalCount={leaders.length}
          value={readFilter}
          onChange={value => { setReadFilter(value); setVisibleCount(24); }}
        />

        {/* Results Count */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: '#968671',
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          Showing {displayedLeaders.length} of {filteredLeaders.length} legends
        </div>

        {/* Grid */}
        {displayedLeaders.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
              gap: 48,
              marginBottom: 64,
            }}
          >
            {displayedLeaders.map((leader, idx) => (
              <div
                key={leader.id}
                ref={el => { if (el) cardsRef.current[idx] = el; }}
                style={{ opacity: 0, cursor: 'pointer' }}
              >
                <LeaderCard leader={leader} getNationality={getNationality} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#968671',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
            <p style={{ fontSize: 18, marginBottom: 8 }}>No legends match your filters</p>
            <p style={{ fontSize: 14, marginBottom: 24 }}>Try adjusting your search or filters</p>
            <button
              onClick={resetFilters}
              style={{
                padding: '12px 32px',
                borderRadius: 99,
                border: '1px solid #282b2f',
                background: '#282b2f',
                color: '#f1f1ee',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ffcc00'; e.currentTarget.style.color = '#282b2f'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#282b2f'; e.currentTarget.style.color = '#f1f1ee'; }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {visibleCount < filteredLeaders.length && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={loadMore}
              style={{
                border: '1px solid #282b2f',
                borderRadius: 99,
                padding: '14px 36px',
                background: 'transparent',
                color: '#282b2f',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#282b2f';
                e.currentTarget.style.color = '#f1f1ee';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#282b2f';
              }}
            >
              Browse More Legends ({filteredLeaders.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
