import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBookmarks, removeBookmark, getCategoryLabel, getCategoryRoute, type Bookmark } from '../utils/bookmarks';
import { BookmarkX, BookmarkIcon, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Bookmarks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (b: Bookmark) => {
    removeBookmark(b.id, b.category);
    setBookmarks(getBookmarks());
  };

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cards, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
      });
    });
    return () => ctx.revert();
  }, [bookmarks]);

  return (
    <section ref={sectionRef} id="bookmarks" style={{ position: 'relative', zIndex: 2, background: '#f1f1ee', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)', borderTop: '1px solid #e5e5e0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <BookmarkIcon size={20} style={{ color: '#ffcc00' }} />
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671' }}>YOUR COLLECTION</div>
        </div>

        {bookmarks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#968671', fontFamily: "'Inter', sans-serif" }}>
            <BookmarkX size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ fontSize: 16 }}>No bookmarks yet. Click the bookmark icon on any profile to save it here.</p>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginBottom: 20 }}>{bookmarks.length} saved</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {bookmarks.map((b, idx) => (
                <div key={`${b.category}-${b.id}`} ref={el => { if (el) cardsRef.current[idx] = el; }} className="card-bg" style={{ opacity: 0, background: "#fff", borderRadius: 10, padding: '20px', border: '1px solid #e5e5e0', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'box-shadow 0.3s' }}
                  onClick={() => navigate(`${getCategoryRoute(b.category)}/${b.id}`)}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#282b2f' }}>{b.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', marginTop: 2 }}>{b.nickname}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#ffcc00', background: '#282b2f', padding: '2px 8px', borderRadius: 99 }}>{getCategoryLabel(b.category)}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <ArrowRight size={14} style={{ color: '#968671' }} />
                    <button onClick={e => { e.stopPropagation(); handleRemove(b); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#968671', padding: 4 }} title="Remove">
                      <BookmarkX size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
