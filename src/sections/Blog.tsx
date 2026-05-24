import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { blogArticles } from '../data/blog';
import { Clock, ArrowRight, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)',
        borderTop: '1px solid #e5e5e0',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: '#968671',
              marginBottom: 24,
            }}
          >
            EDITORIAL
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              alignItems: 'end',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 400,
                  color: '#282b2f',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Full Autobiographies
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  color: '#968671',
                  lineHeight: 1.6,
                  maxWidth: 560,
                }}
              >
                In-depth editorial features exploring the lives, struggles, and triumphs of technology's most influential figures. Stories researched and written for those who want to understand what made them great.
              </p>
            </div>
            <button
              onClick={() => navigate('/blog')}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: '#282b2f',
                background: 'none',
                border: '1px solid #282b2f',
                borderRadius: 99,
                padding: '12px 28px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#282b2f';
                e.currentTarget.style.color = '#f1f1ee';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#282b2f';
              }}
            >
              View All Articles <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Featured Article */}
        {blogArticles.length > 0 && (
          <div
            ref={el => { if (el) cardsRef.current[0] = el; }}
            onClick={() => navigate(`/blog/${blogArticles[0].slug}`)}
            onMouseEnter={() => setHoveredId(blogArticles[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="card-bg"
            style={{
              opacity: 0,
              cursor: 'pointer',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 0,
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #e5e5e0',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              boxShadow: hoveredId === blogArticles[0].id ? '0 12px 48px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
              transform: hoveredId === blogArticles[0].id ? 'translateY(-4px)' : 'translateY(0)',
              marginBottom: 40,
            }}
          >
            {/* Image side */}
            <div
              style={{
                background: `linear-gradient(135deg, ${blogArticles[0].coverGradient[0]}, ${blogArticles[0].coverGradient[1]})`,
                position: 'relative',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 48,
                overflow: 'hidden',
              }}
            >
              {/* Decorative pattern */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.06,
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
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
                  marginBottom: 16,
                  position: 'relative',
                }}
              >
                {blogArticles[0].category}
              </div>
              <h3
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1.2,
                  marginBottom: 12,
                  position: 'relative',
                }}
              >
                {blogArticles[0].title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.6,
                  maxWidth: 400,
                  position: 'relative',
                }}
              >
                {blogArticles[0].subtitle}
              </p>
            </div>

            {/* Content side */}
            <div
              style={{
                padding: 48,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: '#968671',
                    lineHeight: 1.7,
                    marginBottom: 32,
                  }}
                >
                  {blogArticles[0].excerpt}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                  {blogArticles[0].tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 500,
                        color: '#968671',
                        padding: '4px 12px',
                        borderRadius: 99,
                        border: '1px solid #e5e5e0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #e5e5e0',
                  paddingTop: 24,
                }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>
                    {blogArticles[0].author}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', opacity: 0.5 }}>
                    {blogArticles[0].date}
                  </span>
                </div>
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
                  <Clock size={12} /> {blogArticles[0].readTime}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 32,
          }}
        >
          {blogArticles.slice(1).map((article, idx) => {
            return (
              <div
                key={article.id}
                ref={el => { if (el) cardsRef.current[idx + 1] = el; }}
                onClick={() => navigate(`/blog/${article.slug}`)}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="card-bg"
                style={{
                  opacity: 0,
                  cursor: 'pointer',
                  background: '#fff',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #e5e5e0',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  boxShadow: hoveredId === article.id ? '0 8px 32px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
                  transform: hoveredId === article.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Cover */}
                <div
                  style={{
                    height: 200,
                    background: `linear-gradient(135deg, ${article.coverGradient[0]}, ${article.coverGradient[1]})`,
                    position: 'relative',
                    padding: 28,
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
                      fontSize: 22,
                      fontWeight: 400,
                      color: '#fff',
                      lineHeight: 1.3,
                      position: 'relative',
                    }}
                  >
                    {article.title}
                  </h3>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 28px 24px' }}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
