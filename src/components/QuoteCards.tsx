import { Quote } from 'lucide-react';

interface QuoteCardsProps {
  quotes: string[];
  color?: string;
  authorName?: string;
}

export default function QuoteCards({ quotes, color = '#3498db', authorName }: QuoteCardsProps) {
  if (!quotes || quotes.length === 0) return null;

  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#282b2f', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Quote size={24} style={{ color }} />
        Notable Quotes
      </h3>
      <div style={{ display: 'grid', gap: 16 }}>
        {quotes.slice(0, 6).map((quote, i) => (
          <div
            key={i}
            style={{
              background: `linear-gradient(135deg, ${color}08, ${color}15)`,
              borderLeft: `4px solid ${color}`,
              borderRadius: 12,
              padding: 24,
              position: 'relative',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <Quote size={32} style={{ color: `${color}40`, position: 'absolute', top: 12, left: 12 }} />
            <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#282b2f', lineHeight: 1.5, fontStyle: 'italic', marginLeft: 20 }}>
              "{quote}"
            </p>
            {authorName && (
              <p style={{ textAlign: 'right', marginTop: 12, fontSize: 14, color, fontWeight: 600 }}>
                — {authorName}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
