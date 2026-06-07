import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { athletes, athleteBioData } from '../data';
import { jsonLoader } from '../data';
import { ArrowLeft, Calendar, Clock, DollarSign, Trophy, Globe, Quote, Award, Medal } from 'lucide-react';
import BookmarkButton from '../components/BookmarkButton';
import ReadToggleButton from '../components/ReadToggleButton';
import CompareToggleButton from '../components/CompareToggleButton';
import ShareButton from '../components/ShareButton';
import PrintButton from '../components/PrintButton';
import gsap from 'gsap';
import { getReadingTime } from '../utils/readingTime';
import AudioNarration from '../components/AudioNarration';
import Timeline from '../components/Timeline';
import StatCards from '../components/StatCards';
import QuoteCards from '../components/QuoteCards';
import ActionableSteps from '../components/ActionableSteps';
import MarkdownText from '../components/MarkdownText';
import { getGradient, SCIENTIST_GRADIENT_COLORS } from '../utils/visual';
import { markAsRead } from '../utils/readProfiles';

export default function SportsPersonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const athleteId = id || '';
  const athlete = athletes.find(a => a.id === athleteId);
  const bio = athleteBioData[athleteId];
  const jsonEntry = athlete ? jsonLoader.getJsonBioByName(athlete.name) : undefined;

  const readingTime = bio ? getReadingTime(bio.bio) : 1;
  const fullBioText = bio?.bio || '';
  useEffect(() => {
    window.scrollTo(0, 0);
    if (athlete && bio) markAsRead(athleteId, 'athlete');
  }, [id, athleteId, athlete, bio]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    }
  }, [id]);

  if (!athlete || !bio) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f1ee' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, color: '#282b2f' }}>Athlete Not Found</h1>
          <button onClick={() => navigate('/')} style={{ marginTop: 24, padding: '12px 32px', borderRadius: 99, border: '1px solid #282b2f', background: 'transparent', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 14 }}>Back to Home</button>
        </div>
      </div>
    );
  }

  const relatedAthletes = athletes.filter(a => bio.relatedIds.includes(a.id));

  return (
    <div className="page-container" style={{ background: "#f1f1ee", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: getGradient(SCIENTIST_GRADIENT_COLORS, athlete.id), padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, marginBottom: 40, padding: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}><ArrowLeft size={16} /> Back to Home</button>

          {/* Portrait */}
          {athlete.image ? (
            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', marginBottom: 32, border: '3px solid rgba(255,255,255,0.3)' }}>
              <img src={athlete.image} alt={athlete.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#fff', fontWeight: 400 }}>
              {athlete.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
          )}

          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#ffcc00', marginBottom: 16 }}>{athlete.era}</div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>{athlete.name}</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>{athlete.nickname}</p>

                    {/* Reading time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Clock size={14} style={{ color: '#968671' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{readingTime} min read</span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <BookmarkButton id={athlete.id} category="athlete" name={athlete.name} nickname={athlete.nickname} size={20} />
            <ReadToggleButton id={athlete.id} category="athlete" />
            <CompareToggleButton item={{ id: athlete.id, name: athlete.name, nickname: athlete.nickname, category: 'athlete', field: athlete.sport, nationality: athlete.nationality, born: athlete.born, era: athlete.era, image: athlete.image }} />
            <ShareButton url={`https://3drrx75zxkbas.kimi.page/athlete/${athlete.id}`} title={athlete.name} quote={athleteBioData[athlete.id]?.quotes?.[0]} />
            <PrintButton />
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}><Globe size={14} /> {athlete.nationality}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}><Calendar size={14} /> Born {athlete.born}</span>
            {athlete.netWorth && <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}><DollarSign size={14} /> {athlete.netWorth}</span>}
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: 13 }}><Trophy size={14} /> {athlete.sport}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}>
        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 16, marginBottom: 48 }}>
          <div className="card-bg" style={{ background: "#fff", borderRadius: 12, padding: '24px', border: '1px solid #e5e5e0' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: '#968671', marginBottom: 8 }}><Medal size={12} style={{ display: 'inline', marginRight: 6 }} />Sport</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#282b2f' }}>{athlete.sport}</div>
          </div>
          <div className="card-bg" style={{ background: "#fff", borderRadius: 12, padding: '24px', border: '1px solid #e5e5e0' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5, color: '#968671', marginBottom: 8 }}><Award size={12} style={{ display: 'inline', marginRight: 6 }} />Era</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#282b2f' }}>{athlete.era}</div>
          </div>
        </div>

        {/* Bio */}
             <AudioNarration text={fullBioText} title={`Listen to ${athlete.name}'s story`} />

           {bio.bio.split('\n\n').map((paragraph, i) => (
          <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.85, color: '#282b2f', marginBottom: i === bio.bio.split('\n\n').length - 1 ? 0 : 28 }}><MarkdownText text={paragraph} /></p>
        ))}

        {/* Visual Components - Rich Data */}
        {jsonEntry && (
          <>
            <StatCards 
              born={jsonEntry.born} 
              died={jsonEntry.died} 
              nationality={jsonEntry.nationality} 
              stats={jsonEntry.stats}
              color="#2e7d32"
            />
            <Timeline milestones={jsonEntry.milestones || []} color="#2e7d32" />
            <QuoteCards quotes={jsonEntry.quotes || []} color="#2e7d32" authorName={jsonEntry.name} />
            <ActionableSteps steps={jsonEntry.actionableSteps || []} color="#2e7d32" />
          </>
        )}

        {/* Key Achievements */}
        {bio.keyAchievements.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>Key Achievements</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {bio.keyAchievements.map((achievement, i) => (
                <div key={i} className="card-bg" style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #e5e5e0", borderLeft: "4px solid #ffcc00", display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#ffcc00', minWidth: 56 }}>{achievement.year}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#282b2f' }}>{achievement.event}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotes */}
        {(bio.quotes?.length ?? 0) > 0 && (
          <div style={{ marginTop: 60 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>Words of Wisdom</div>
            {(bio?.quotes ?? []).map((quote, i) => (
              <div key={i} style={{ background: '#282b2f', borderRadius: 12, padding: '28px 32px', marginBottom: 12, position: 'relative' }}>
                <Quote size={20} style={{ color: '#ffcc00', position: 'absolute', top: 16, left: 16, opacity: 0.3 }} />
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: '#f1f1ee', lineHeight: 1.6, fontStyle: 'italic', marginLeft: 24 }}><MarkdownText text={quote} /></p>
              </div>
            ))}
          </div>
        )}

        {/* Related Athletes */}
        {relatedAthletes.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>Related Athletes</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 16 }}>
              {relatedAthletes.map(ra => (
                <div key={ra.id} onClick={() => navigate(`/athlete/${ra.id}`)} className="card-bg" style={{ cursor: "pointer", background: "#fff", borderRadius: 10, padding: '20px', border: '1px solid #e5e5e0', transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#282b2f' }}>{ra.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671', marginTop: 4 }}>{ra.nickname}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#968671', marginTop: 8 }}>{ra.sport} &middot; {ra.era}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
