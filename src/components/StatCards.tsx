import { Calendar, Globe, GraduationCap, DollarSign, Briefcase, Trophy } from 'lucide-react';

interface Stats {
  netWorth?: string;
  education?: string;
  roles?: string[];
  birthDate?: string;
  deathDate?: string;
}

interface StatCardsProps {
  born?: string;
  died?: string;
  nationality?: string;
  stats?: Stats;
  color?: string;
}

export default function StatCards({ born, died, nationality, stats, color = '#3498db' }: StatCardsProps) {
  const cards = [];

  if (born || stats?.birthDate) {
    cards.push({
      icon: <Calendar size={20} />,
      label: 'Born',
      value: stats?.birthDate || born,
      subtext: died || stats?.deathDate ? `Died: ${died || stats?.deathDate}` : undefined,
    });
  }

  if (nationality) {
    cards.push({
      icon: <Globe size={20} />,
      label: 'Nationality',
      value: nationality,
    });
  }

  if (stats?.education) {
    cards.push({
      icon: <GraduationCap size={20} />,
      label: 'Education',
      value: stats.education,
    });
  }

  if (stats?.netWorth) {
    cards.push({
      icon: <DollarSign size={20} />,
      label: 'Net Worth',
      value: stats.netWorth,
    });
  }

  if (stats?.roles && stats.roles.length > 0) {
    cards.push({
      icon: <Briefcase size={20} />,
      label: 'Key Roles',
      value: stats.roles.slice(0, 3).join(', '),
    });
  }

  if (cards.length === 0) return null;

  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${Math.min(cards.length, 3)}, 1fr)`, 
        gap: 16,
      }}>
        {cards.map((card, i) => (
          <div 
            key={i}
            style={{
              background: 'white',
              borderRadius: 16,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: 8,
              color,
            }}>
              {card.icon}
              <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {card.label}
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#282b2f', lineHeight: 1.4 }}>
              {card.value}
            </div>
            {card.subtext && (
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                {card.subtext}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
