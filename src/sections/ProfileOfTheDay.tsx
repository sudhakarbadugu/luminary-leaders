import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { leaders } from '../data/leaders';
import { traders } from '../data/traders';
import { athletes } from '../data/sports';
import { cricketers } from '../data/cricket';
import { scientists } from '../data/scientists';
import { bioData } from '../data/bios';
import { traderBioData } from '../data/traderBios';
import { athleteBioData } from '../data/sportsBios';
import { cricketerBioData } from '../data/cricketBios';
import { scientistBioData } from '../data/scientistBios';
import { getCategoryStyle } from '../utils/categoryStyles';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import PrintButton from '../components/PrintButton';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';

interface FeaturedProfile {
  id: number;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  name: string;
  nickname: string;
  image?: string;
  field: string;
  nationality: string;
  born: string;
  era: string;
  bio: string;
  quote: string;
}

const allProfiles: { items: any[]; category: FeaturedProfile['category']; fieldKey: string; bioData: Record<number, any> }[] = [
  { items: leaders, category: 'leader', fieldKey: 'role', bioData: bioData },
  { items: traders, category: 'trader', fieldKey: 'strategy', bioData: traderBioData },
  { items: athletes, category: 'athlete', fieldKey: 'sport', bioData: athleteBioData },
  { items: cricketers, category: 'cricketer', fieldKey: 'role', bioData: cricketerBioData },
  { items: scientists, category: 'scientist', fieldKey: 'field', bioData: scientistBioData },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getFeaturedProfile(): FeaturedProfile {
  const dayOfYear = getDayOfYear();

  // Collect all profiles into a flat array
  const flat: { item: any; category: FeaturedProfile['category']; fieldKey: string; bioData: Record<number, any> }[] = [];
  for (const group of allProfiles) {
    for (const item of group.items) {
      flat.push({ item, category: group.category, fieldKey: group.fieldKey, bioData: group.bioData });
    }
  }

  // Deterministically pick one based on day of year
  const index = dayOfYear % flat.length;
  const selected = flat[index];
  const bio = selected.bioData[selected.item.id];

  return {
    id: selected.item.id,
    category: selected.category,
    name: selected.item.name,
    nickname: selected.item.nickname,
    image: selected.item.image,
    field: (selected.item as any)[selected.fieldKey] || '',
    nationality: bio?.nationality || selected.item.nationality || '',
    born: bio?.born || selected.item.born || '',
    era: bio?.era || selected.item.era || '',
    bio: bio?.bio ? bio.bio.split('\n\n')[0].substring(0, 280) + '...' : '',
    quote: bio?.quotes?.[0] || '',
  };
}

export default function ProfileOfTheDay() {
  const navigate = useNavigate();
  const profile = useMemo(() => getFeaturedProfile(), []);
  const style = getCategoryStyle(profile.category);
  const route = `/${profile.category}/${profile.id}`;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <section style={{ position: 'relative', zIndex: 2, background: '#282b2f', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <Sparkles size={16} style={{ color: '#ffcc00' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 2, color: '#968671' }}>
            Profile of the Day &mdash; {dateStr}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          {/* Left: Image */}
          <div
            onClick={() => navigate(route)}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            {profile.image ? (
              <div style={{ width: '100%', maxWidth: 360, aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
                <img src={profile.image} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(40,43,47,0.6) 0%, transparent 50%)' }} />
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: 360, aspectRatio: '3/4', borderRadius: 12, background: `linear-gradient(135deg, ${style.gradient[0]}, ${style.gradient[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 72, color: '#fff' }}>
                  {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div style={{ position: 'absolute', top: 16, left: 16 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, color: '#fff', background: style.accent, padding: '4px 12px', borderRadius: 99 }}>
                {style.label}
              </span>
            </div>
            <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 8 }}>
              <BookmarkButton id={profile.id} category={profile.category} name={profile.name} nickname={profile.nickname} />
              <ShareButton url={`https://3drrx75zxkbas.kimi.page/${profile.category}/${profile.id}`} title={profile.name} quote={profile.quote} />
              <PrintButton />
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: '#f1f1ee', lineHeight: 1.15, marginBottom: 8 }}>
              {profile.name}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#968671', marginBottom: 16 }}>
              {profile.nickname}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{profile.field}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{profile.nationality}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#968671' }}>{profile.era}</span>
            </div>

            {profile.bio && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.75, color: '#f1f1ee', opacity: 0.85, marginBottom: 24 }}>
                {profile.bio}
              </p>
            )}

            {profile.quote && (
              <div style={{ borderLeft: `3px solid ${style.accent}`, paddingLeft: 20, marginBottom: 24 }}>
                <Quote size={16} style={{ color: style.accent, marginBottom: 6 }} />
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, fontStyle: 'italic', color: '#f1f1ee', lineHeight: 1.5 }}>
                  &ldquo;{profile.quote}&rdquo;
                </p>
              </div>
            )}

            <button
              onClick={() => navigate(route)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                padding: '12px 28px',
                borderRadius: 99,
                border: '1px solid #f1f1ee',
                background: 'transparent',
                color: '#f1f1ee',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f1ee'; e.currentTarget.style.color = '#282b2f'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f1f1ee'; }}
            >
              Read Full Story <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
