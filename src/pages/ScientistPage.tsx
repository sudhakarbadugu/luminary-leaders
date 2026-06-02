import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { scientists, scientistBioData } from '../data';
import { jsonLoader } from '../data';
import { ArrowLeft, Calendar, Clock, Globe, Quote, FlaskConical } from 'lucide-react';
import BookmarkButton from '../components/BookmarkButton';
import CompareToggleButton from '../components/CompareToggleButton';
import ShareButton from '../components/ShareButton';
import PrintButton from '../components/PrintButton';
import gsap from 'gsap';
import { getReadingTime } from '../utils/readingTime';
import AudioNarration from '../components/AudioNarration';
import Timeline from '../components/Timeline';
import StatCards from '../components/StatCards';
import QuoteCards from '../components/QuoteCards';
import { getGradient, SCIENTIST_GRADIENT_COLORS } from '../utils/visual';

export default function ScientistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const scientistId = parseInt(id || '1');
  const scientist = scientists.find(s => s.id === scientistId);
  const bio = scientistBioData[scientistId];
  const jsonEntry = scientist ? jsonLoader.getJsonBioByName(scientist.name) : undefined;

  const readingTime = bio ? getReadingTime(bio.bio) : 1;
  const fullBioText = bio?.bio || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scientistId]);

  useEffect(() => {
    if (!contentRef.current) return;
    const sections = contentRef.current.querySelectorAll('.section-animate');
    gsap.fromTo(sections, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: contentRef.current, start: 'top 85%' } }
    );
  }, [scientistId]);

  if (!bio || !scientist) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f1ee' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, color: '#282b2f' }}>Scientist Not Found</h1>
          <button onClick={() => navigate('/')} style={{ marginTop: 24, padding: '12px 32px', borderRadius: 99, border: '1px solid #282b2f', background: 'transparent', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const relatedScientists = bio.relatedIds
    .map(rid => scientists.find(s => s.id === rid))
    .filter(Boolean);

  return (
    <div className="page-container" style={{ background: "#f1f1ee", minHeight: "100vh" }}>
      <div className="dark-hero" style={{ background: '#282b2f', color: '#f1f1ee', padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px)', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#968671', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, marginBottom: 40, transition: 'color 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }} onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}>
            <ArrowLeft size={16} /> Back to Legends
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 40, alignItems: 'start' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', background: scientist.image ? undefined : getGradient(SCIENTIST_GRADIENT_COLORS, scientist.id), flexShrink: 0 }}>
              {scientist.image ? (
                <img src={scientist.image} alt={scientist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 64 }}>
                  {scientist.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#ffcc00', marginBottom: 16 }}>
                {scientist.field} — {scientist.era}
              </div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>
                {bio.name}
              </h1>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: '#968671', marginBottom: 24 }}>
                {scientist.role} {scientist.institution && `at ${scientist.institution}`}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Clock size={14} style={{ color: '#968671' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{readingTime} min read</span>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <BookmarkButton id={scientist.id} category="scientist" name={scientist.name} nickname={scientist.role} size={20} />
                <CompareToggleButton item={{ id: scientist.id, name: scientist.name, nickname: scientist.role, category: 'scientist', field: scientist.field, nationality: bio.nationality || '', born: bio.born, era: scientist.era, image: scientist.image }} />
                <ShareButton url={`https://3drrx75zxkbas.kimi.page/scientist/${scientist.id}`} title={scientist.name} quote={bio.quotes?.[0]} />
                <PrintButton />
              </div>

              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671' }}>
                  <Calendar size={16} /> {bio.born}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671' }}>
                  <Globe size={16} /> {bio.nationality}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671' }}>
                  <FlaskConical size={16} /> {scientist.field}
                </div>
              </div>

              {((bio.quotes?.length ?? 0) > 0) && (
                <div style={{ borderLeft: '3px solid #ffcc00', paddingLeft: 24, marginTop: 32 }}>
                  <Quote size={20} style={{ color: '#ffcc00', marginBottom: 8 }} />
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontStyle: 'italic', lineHeight: 1.5, color: '#f1f1ee' }}>
                    {bio.quotes?.[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div ref={contentRef} style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}>
        <AudioNarration text={fullBioText} title={`Listen to ${bio.name}'s story`} />

        <div className="section-animate" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>
          The Story
        </div>
        {bio.bio.split('\n\n').map((paragraph, i) => (
          <p key={i} className="section-animate" style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, lineHeight: 1.8, color: '#282b2f', marginBottom: i === bio.bio.split('\n\n').length - 1 ? 40 : 28 }}>{paragraph}</p>
        ))}

        {/* Visual Components - Rich Data */}
        {jsonEntry && (
          <>
            <StatCards 
              born={jsonEntry.born} 
              died={jsonEntry.died} 
              nationality={jsonEntry.nationality} 
              stats={jsonEntry.stats}
              color="#7b1fa2"
            />
            <Timeline milestones={jsonEntry.milestones || []} color="#7b1fa2" />
            <QuoteCards quotes={jsonEntry.quotes || []} color="#7b1fa2" authorName={jsonEntry.name} />
            <ActionableSteps steps={jsonEntry.actionableSteps || []} color="#7b1fa2" />
          </>
        )}

        {(bio.quotes?.length ?? 0) > 1 && (
          <div className="section-animate" style={{ marginTop: 60, marginBottom: 60 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>In Their Words</div>
            {(bio?.quotes ?? []).slice(1).map((quote, i) => (
              <div key={i} className="card-bg" style={{ background: "#fff", borderRadius: 12, padding: "32px 28px", marginBottom: 16, border: "1px solid #e5e5e0" }}>
                <Quote size={18} style={{ color: '#ffcc00', marginBottom: 12 }} />
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, fontStyle: 'italic', lineHeight: 1.5, color: '#282b2f' }}>{quote}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginTop: 16 }}>-- {bio.name}</p>
              </div>
            ))}
          </div>
        )}

        {relatedScientists.length > 0 && (
          <div className="section-animate" style={{ marginTop: 60 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>Related Scientists</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 24 }}>
              {relatedScientists.map(related => related && (
                <div key={related.id} onClick={() => navigate(`/scientist/${related.id}`)} style={{ cursor: 'pointer', transition: 'transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', background: related.image ? undefined : getGradient(related.id) }}>
                    {related.image ? (
                      <img src={related.image} alt={related.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 36 }}>
                        {related.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#282b2f', marginTop: 10 }}>{related.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{related.role}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
