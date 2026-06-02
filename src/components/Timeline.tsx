import { useEffect, useRef } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

interface Milestone {
  year: string;
  title?: string;
  event: string;
}

interface TimelineProps {
  milestones: Milestone[];
  color?: string;
}

export default function Timeline({ milestones, color = '#3498db' }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.timeline-item');
    items.forEach((item, i) => {
      (item as HTMLElement).style.animationDelay = `${i * 100}ms`;
    });
  }, [milestones]);

  if (!milestones || milestones.length === 0) return null;

  return (
    <div ref={containerRef} style={{ marginTop: 32, marginBottom: 32 }}>
      <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#282b2f', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <TrendingUp size={24} style={{ color }} />
        Key Milestones
      </h3>
      <div style={{ position: 'relative', paddingLeft: 32 }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${color}, transparent)` }} />
        
        {milestones.map((milestone, i) => (
          <div 
            key={i} 
            className="timeline-item"
            style={{ 
              position: 'relative', 
              marginBottom: 24, 
              paddingLeft: 24,
              opacity: 0,
              animation: 'fadeInSlide 0.5s ease forwards',
            }}
          >
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: -25,
              top: 4,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: color,
              border: '3px solid #fff',
              boxShadow: `0 0 0 3px ${color}30`,
            }} />
            
            {/* Year badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: `${color}15`,
              padding: '4px 12px',
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              color,
              marginBottom: 6,
            }}>
              <Calendar size={12} />
              {milestone.year}
            </div>
            
            {/* Title */}
            {milestone.title && (
              <div style={{ fontWeight: 600, fontSize: 16, color: '#282b2f', marginBottom: 4 }}>
                {milestone.title}
              </div>
            )}
            
            {/* Event description */}
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>
              {milestone.event}
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
