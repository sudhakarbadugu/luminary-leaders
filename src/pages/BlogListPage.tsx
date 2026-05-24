import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { blogArticles } from '../data/blog';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import gsap from 'gsap';

export default function BlogListPage() {
  const navigate = useNavigate();
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        stagger: 0.1,
        delay: 0.3,
      }
    );
  }, []);

  return (
    <div className="page-container" style={{ background: "#f1f1ee", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="dark-hero"
        style={{
          background: '#282b2f',
          color: '#f1f1ee',
          padding: '120px 40px 60px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#968671',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              marginBottom: 40,
              transition: 'color 0.2s',
              padding: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: '#ffcc00',
              marginBottom: 20,
            }}
          >
            EDITORIAL ARCHIVE
          </div>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Full Autobiographies
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: '#968671',
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            In-depth features exploring the lives, struggles, and triumphs of technology's most influential figures. Each story is researched and written to inspire.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: 32,
          }}
        >
          {blogArticles.map((article, idx) => (
            <div
              key={article.id}
              ref={el => { if (el) cardsRef.current[idx] = el; }}
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="card-bg"
              style={{
                opacity: 0,
                cursor: 'pointer',
                background: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #e5e5e0',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  height: 220,
                  background: `linear-gradient(135deg, ${article.coverGradient[0]}, ${article.coverGradient[1]})`,
                  position: 'relative',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.06,
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    color: '#ffcc00',
                    marginBottom: 12,
                    position: 'relative',
                  }}
                >
                  {article.category}
                </div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: '#fff',
                    lineHeight: 1.3,
                    position: 'relative',
                  }}
                >
                  {article.title}
                </h3>
              </div>

              <div style={{ padding: '28px' }}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#968671',
                    lineHeight: 1.7,
                    marginBottom: 20,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                  {article.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: '#968671',
                        padding: '3px 10px',
                        borderRadius: 99,
                        border: '1px solid #e5e5e0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Tag size={9} /> {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #e5e5e0',
                    paddingTop: 16,
                  }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>
                    {article.date}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: '#968671',
                    }}
                  >
                    <Clock size={12} /> {article.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
