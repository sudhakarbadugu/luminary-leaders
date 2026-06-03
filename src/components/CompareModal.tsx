import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompareItems, clearCompare } from '../utils/compare';
import type { CompareItem } from '../utils/compare';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks';
import { getCategoryStyle } from '../utils/categoryStyles';
import { X, GitCompare, ArrowRight, Bookmark } from 'lucide-react';

// Bio imports for different categories
import { bioData as leaderBioData } from '../data/bios';
import { traderBioData } from '../data/traderBios';
import { athleteBioData } from '../data/sportsBios';
import { cricketerBioData } from '../data/cricketBios';
import { scientistBioData } from '../data/scientistBios';

function getItemData(item: CompareItem) {
  const route = `/${item.category === 'leader' ? 'leader' : item.category}/${item.id}`;
  let bio: { bio?: string; keyAchievements?: { year: string; event: string }[] } = {};
  try {
    switch (item.category) {
      case 'leader': bio = leaderBioData[item.id] || {}; break;
      case 'trader': bio = traderBioData[item.id] || {}; break;
      case 'athlete': bio = athleteBioData[item.id] || {}; break;
      case 'cricketer': bio = cricketerBioData[item.id] || {}; break;
      case 'scientist': bio = scientistBioData[item.id] || {}; break;
    }
  } catch { /* ignore */ }
  return { route, bio, style: getCategoryStyle(item.category) };
}

export default function CompareModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const items = useMemo(() => getCompareItems(), []);
  const [bookmarkStates, setBookmarkStates] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    items.forEach(item => { map[`${item.category}-${item.id}`] = isBookmarked(item.id, item.category); });
    return map;
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleBookmark = (item: CompareItem) => {
    const result = toggleBookmark(item.id, item.category, item.name, item.nickname);
    setBookmarkStates(prev => ({ ...prev, [`${item.category}-${item.id}`]: result }));
  };

  if (items.length < 2) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(40,43,47,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: '#f1f1ee', borderRadius: 16, maxWidth: 900, width: '100%', maxHeight: '85vh', overflow: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #e5e5e0', position: 'sticky', top: 0, background: '#f1f1ee', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GitCompare size={20} style={{ color: '#282b2f' }} />
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, color: '#282b2f', margin: 0 }}>Side-by-Side Comparison</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#968671', padding: 4 }}><X size={20} /></button>
        </div>

        {/* Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(260px, 100%), 1fr))`, gap: 0 }}>
          {items.map(item => {
            const { route, bio, style } = getItemData(item);
            const achievements = bio.keyAchievements || [];
            const bioSnippet = bio.bio ? bio.bio.split('\n\n')[0].substring(0, 200) + '...' : '';
            const isBookmarked = bookmarkStates[`${item.category}-${item.id}`];

            return (
              <div key={`${item.category}-${item.id}`} style={{ padding: '24px 28px', borderRight: '1px solid #e5e5e0' }}>
                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  {item.image ? (
                    <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${style.accent}`, flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${style.gradient[0]}, ${style.gradient[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 18, flexShrink: 0 }}>
                      {item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#282b2f' }}>{item.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#968671', marginTop: 2 }}>{item.nickname}</div>
                  </div>
                </div>

                {/* Category Tag */}
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#fff', background: style.accent, padding: '3px 10px', borderRadius: 99 }}>{style.label}</span>
                </div>

                {/* Key Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <StatRow label="Field" value={item.field} />
                  <StatRow label="Nationality" value={item.nationality} />
                  <StatRow label="Born" value={item.born} />
                  <StatRow label="Era" value={item.era} />
                </div>

                {/* Achievements */}
                {achievements.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: '#968671', marginBottom: 10 }}>Key Achievements</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {achievements.slice(0, 3).map((a, i) => (
                        <div key={i} style={{ padding: '10px 12px', background: style.accentLight, borderRadius: 8, borderLeft: `3px solid ${style.accent}` }}>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, color: style.accent }}>{a.year}</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#282b2f', marginTop: 2 }}>{a.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio snippet */}
                {bioSnippet && (
                  <div style={{ marginTop: 20, padding: '12px 16px', background: '#fff', borderRadius: 8, border: '1px solid #e5e5e0' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, lineHeight: 1.7, color: '#282b2f', margin: 0 }}>{bioSnippet}</p>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                  <button onClick={() => navigate(route)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, padding: '8px 0', borderRadius: 99, border: '1px solid #282b2f', background: 'transparent', color: '#282b2f', cursor: 'pointer' }}>
                    <ArrowRight size={12} /> View Profile
                  </button>
                  <button onClick={() => handleBookmark(item)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', border: '1px solid #e5e5e0', background: isBookmarked ? '#ffcc00' : 'transparent', cursor: 'pointer' }}>
                    <Bookmark size={14} fill={isBookmarked ? '#282b2f' : 'none'} color={isBookmarked ? '#282b2f' : '#968671'} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 32px', borderTop: '1px solid #e5e5e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: 0, background: '#f1f1ee' }}>
          <button onClick={() => { clearCompare(); onClose(); }} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', background: 'none', border: 'none', cursor: 'pointer' }}>Clear all</button>
          <button onClick={onClose} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, padding: '8px 20px', borderRadius: 99, border: '1px solid #282b2f', background: 'transparent', color: '#282b2f', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: '#968671' }}>{label}</span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: '#282b2f' }}>{value}</span>
    </div>
  );
}
