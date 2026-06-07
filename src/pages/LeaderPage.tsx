import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bioData, leaders } from '../data';
import { jsonLoader } from '../data';
import { ArrowLeft, Calendar, Clock, MapPin, Quote, Users } from 'lucide-react';
import BookmarkButton from '../components/BookmarkButton';
import ReadToggleButton from '../components/ReadToggleButton';
import CompareToggleButton from '../components/CompareToggleButton';
import ShareButton from '../components/ShareButton';
import PrintButton from '../components/PrintButton';
import { getReadingTime } from '../utils/readingTime';
import AudioNarration from '../components/AudioNarration';
import Timeline from '../components/Timeline';
import StatCards from '../components/StatCards';
import QuoteCards from '../components/QuoteCards';
import ActionableSteps from '../components/ActionableSteps';
import ReadingProgress from '../components/ReadingProgress';
import MarkdownText from '../components/MarkdownText';
import { getInitials, getGradient, SECTION_GRADIENT_COLORS } from '../utils/visual';
import { markAsRead } from '../utils/readProfiles';



export default function LeaderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const leaderId = id || '';
  const bio = bioData[leaderId];
  const leader = leaders.find(l => l.id === leaderId);

  // Get JSON data for visual components
  const jsonEntry = leader ? jsonLoader.getJsonBioByName(leader.name) : undefined;

  const readingTime = bio ? getReadingTime(bio.bio) : 1;
  const fullBioText = bio?.bio || '';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bio && leader) markAsRead(leaderId, 'leader');
  }, [id, leaderId, bio, leader]);

  if (!bio || !leader) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f1ee' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, color: '#282b2f' }}>Leader Not Found</h1>
          <button onClick={() => navigate('/')} style={{ marginTop: 24, padding: '12px 32px', borderRadius: 99, border: '1px solid #282b2f', background: 'transparent', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const relatedLeaders = bio.relatedIds
    .map(rid => leaders.find(l => l.id === rid))
    .filter(Boolean);

  return (
    <div className="page-container" style={{ background: "#f1f1ee", minHeight: "100vh" }}>
      <ReadingProgress sections={[
        { id: 'story', label: 'Story' },
        { id: 'insights', label: 'Insights' },
        { id: 'quotes', label: 'Quotes' },
        { id: 'related', label: 'Related' },
      ]} />
      {/* Hero Section */}
      <div
        className="dark-hero"
        style={{
          background: '#282b2f',
          color: '#f1f1ee',
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 80px)',
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
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#968671'; }}
          >
            <ArrowLeft size={16} /> Back to Legends
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 40, alignItems: 'start' }}>
            {/* Portrait */}
            <div
              style={{
                aspectRatio: '3/4',
                borderRadius: 12,
                overflow: 'hidden',
                background: leader.image ? undefined : getGradient(SECTION_GRADIENT_COLORS, leader.id),
                flexShrink: 0,
              }}
            >
              {leader.image ? (
                <img src={leader.image} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 64 }}>
                  {getInitials(leader.name)}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#ffcc00', marginBottom: 16 }}>
                {bio.era}
              </div>
              <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>
                {bio.name}
              </h1>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: '#968671', marginBottom: 24 }}>
                {bio.role} at {bio.company}
              </div>

                        {/* Reading time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Clock size={14} style={{ color: '#968671' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{readingTime} min read</span>
          </div>

          {/* Action buttons */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <BookmarkButton id={leader.id} category="leader" name={leader.name} nickname={leader.role} size={20} />
                <ReadToggleButton id={leader.id} category="leader" />
                <CompareToggleButton item={{ id: leader.id, name: leader.name, nickname: leader.role, category: 'leader', field: leader.role, nationality: bio.nationality || '', born: bio.born, era: bio.era, image: leader.image }} />
                <ShareButton url={`https://3drrx75zxkbas.kimi.page/leader/${leader.id}`} title={leader.name} quote={bio.quotes?.[0]} />
                <PrintButton />
              </div>

              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671' }}>
                  <Calendar size={16} /> {bio.born}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671' }}>
                  <MapPin size={16} /> {bio.nationality}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671' }}>
                  <Users size={16} /> {bio.company}
                </div>
              </div>

              {/* Quote */}
              {((bio.quotes?.length ?? 0) > 0) && (
                <div style={{ borderLeft: '3px solid #ffcc00', paddingLeft: 24, marginTop: 32 }}>
                  <Quote size={20} style={{ color: '#ffcc00', marginBottom: 8 }} />
                  <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontStyle: 'italic', lineHeight: 1.5, color: '#f1f1ee' }}>
                    <MarkdownText text={bio.quotes?.[0]} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Content */}
      <div id="story" style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}>
        <AudioNarration text={fullBioText} title={`Listen to ${bio.name}'s story`} />

        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>
          The Story
        </div>
        {bio.bio.split('\n\n').map((paragraph, i) => (
          <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, lineHeight: 1.8, color: '#282b2f', marginBottom: i === bio.bio.split('\n\n').length - 1 ? 40 : 28 }}><MarkdownText text={paragraph} /></p>
        ))}

        {/* Visual Components - Rich Data */}
        {jsonEntry && (
          <div id="insights">
            <StatCards 
              born={jsonEntry.born} 
              died={jsonEntry.died} 
              nationality={jsonEntry.nationality} 
              stats={jsonEntry.stats}
              color="#ffcc00"
            />
            <Timeline milestones={jsonEntry.milestones || []} color="#ffcc00" />
            <QuoteCards quotes={jsonEntry.quotes || []} color="#ffcc00" authorName={jsonEntry.name} />
            <ActionableSteps steps={jsonEntry.actionableSteps || []} color="#ffcc00" />
          </div>
        )}

        {/* Additional Quotes */}
        {(bio.quotes?.length ?? 0) > 1 && (
          <div id="quotes" style={{ marginTop: 60, marginBottom: 60 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>
              In Their Words
            </div>
            {bio.quotes?.slice(1).map((quote, i) => (
              <div key={i} className="card-bg" style={{ background: "#fff", borderRadius: 12, padding: "32px 28px", marginBottom: 16, border: "1px solid #e5e5e0" }}>
                <Quote size={18} style={{ color: '#ffcc00', marginBottom: 12 }} />
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, fontStyle: 'italic', lineHeight: 1.5, color: '#282b2f' }}>
                  <MarkdownText text={quote} />
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#968671', marginTop: 16 }}>
                  -- {bio.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Related Leaders */}
        {relatedLeaders.length > 0 && (
          <div id="related" style={{ marginTop: 60 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671', marginBottom: 24 }}>
              Related Legends
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 24 }}>
              {relatedLeaders.map(related => related && (
                <div
                  key={related.id}
                  onClick={() => navigate(`/leader/${related.id}`)}
                  style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', background: related.image ? undefined : getGradient(SECTION_GRADIENT_COLORS, related.id) }}>
                    {related.image ? (
                      <img src={related.image} alt={related.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Serif', serif", fontSize: 36 }}>
                        {getInitials(related.name)}
                      </div>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: '#282b2f', marginTop: 10 }}>
                    {related.name}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>
                    {related.role}
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
