import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getArticleBySlug, getRelatedArticles } from '../data/blog';
import { leaders } from '../data/leaders';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight, User } from 'lucide-react';
import gsap from 'gsap';

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const article = getArticleBySlug(slug || '');
  const relatedArticles = article ? getRelatedArticles(article.slug) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }
  }, [slug]);

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f1ee' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, color: '#282b2f' }}>Article Not Found</h1>
          <button
            onClick={() => navigate('/blog')}
            style={{
              marginTop: 24,
              padding: '12px 32px',
              borderRadius: 99,
              border: '1px solid #282b2f',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#282b2f'; e.currentTarget.style.color = '#f1f1ee'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#282b2f'; }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const leader = leaders.find(l => l.id === article.featuredLeaderId);

  return (
    <div className="page-container" style={{ background: "#f1f1ee", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${article.coverGradient[0]}, ${article.coverGradient[1]})`,
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <button
            onClick={() => navigate('/blog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'rgba(255,255,255,0.7)',
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
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            <ArrowLeft size={16} /> Back to Blog
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
            {article.category}
          </div>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            {article.subtitle}
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
              <User size={14} /> {article.author}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
              <Calendar size={14} /> {article.date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
              <Clock size={14} /> {article.readTime}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
            {article.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.8)',
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: '1px solid rgba(255,255,255,0.2)',
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
      </div>

      {/* Article Content */}
      <div ref={contentRef} style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}>
        {/* Excerpt box */}
        <div
          className="card-bg"
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: '32px',
            marginBottom: 48,
            borderLeft: '4px solid #ffcc00',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: '#282b2f',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            {article.excerpt}
          </p>
        </div>

        {/* Content paragraphs */}
        {article.content.map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              lineHeight: 1.85,
              color: '#282b2f',
              marginBottom: i === article.content.length - 1 ? 0 : 28,
            }}
          >
            {paragraph}
          </p>
        ))}

        {/* CTA to leader page */}
        {leader && (
          <div
            style={{
              marginTop: 60,
              padding: '32px',
              background: '#282b2f',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onClick={() => navigate(`/leader/${leader.id}`)}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#ffcc00', marginBottom: 8 }}>
                Explore the Profile
              </div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#f1f1ee' }}>
                Read the full biography of {leader.name}
              </div>
            </div>
            <ArrowRight size={20} style={{ color: '#ffcc00', flexShrink: 0 }} />
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div style={{ marginTop: 80 }}>
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
              More Stories
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 24 }}>
              {relatedArticles.map(ra => (
                <div
                  key={ra.id}
                  onClick={() => navigate(`/blog/${ra.slug}`)}
                  className="card-bg"
                  style={{
                    cursor: 'pointer',
                    background: '#fff',
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid #e5e5e0',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      height: 120,
                      background: `linear-gradient(135deg, ${ra.coverGradient[0]}, ${ra.coverGradient[1]})`,
                    }}
                  />
                  <div style={{ padding: 20 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#968671', marginBottom: 8 }}>
                      {ra.category}
                    </div>
                    <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, fontWeight: 400, color: '#282b2f', lineHeight: 1.4 }}>
                      {ra.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
