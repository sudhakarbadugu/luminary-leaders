import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBookmarks, removeBookmark, getCategoryLabel, getCategoryRoute, type Bookmark } from '../utils/bookmarks';
import { BookmarkX, BookmarkIcon, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Bookmarks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());
  const navigate = useNavigate();

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
    <section ref={sectionRef} id="bookmarks" className="relative z-[2] bg-brand-bg border-t border-brand-border dark:bg-brand-bg-dark dark:border-brand-border-dark" style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookmarkIcon size={20} className="text-brand-accent" />
          <div className="font-inter text-[11px] font-medium tracking-widest uppercase text-brand-muted dark:text-brand-muted-dark">YOUR COLLECTION</div>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-[60px] px-5 text-brand-muted dark:text-brand-muted-dark font-inter">
            <BookmarkX size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-base">No bookmarks yet. Click the bookmark icon on any profile to save it here.</p>
          </div>
        ) : (
          <>
            <div className="font-inter text-[13px] text-brand-muted dark:text-brand-muted-dark mb-5">{bookmarks.length} saved</div>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))' }}>
              {bookmarks.map((b, idx) => (
                <div
                  key={`${b.category}-${b.id}`}
                  ref={el => { if (el) cardsRef.current[idx] = el; }}
                  className="flex items-center gap-4 rounded-[10px] border border-brand-border bg-white dark:bg-brand-card-dark dark:border-brand-border-dark p-5 cursor-pointer transition-shadow duration-300 hover:shadow-md"
                  style={{ opacity: 0 }}
                  onClick={() => navigate(`${getCategoryRoute(b.category)}/${b.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-inter text-sm font-medium text-brand-dark dark:text-brand-text-dark">{b.name}</div>
                    <div className="font-inter text-xs text-brand-muted dark:text-brand-muted-dark mt-0.5">{b.nickname}</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="font-inter text-[10px] font-medium tracking-wider uppercase bg-brand-dark text-brand-accent px-2 py-0.5 rounded-full">{getCategoryLabel(b.category)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ArrowRight size={14} className="text-brand-muted dark:text-brand-muted-dark" />
                    <button onClick={e => { e.stopPropagation(); handleRemove(b); }} className="border-none bg-transparent p-1 text-brand-muted dark:text-brand-muted-dark cursor-pointer" title="Remove">
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
