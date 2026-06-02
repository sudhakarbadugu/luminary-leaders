import { Target, CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface ActionableStepsProps {
  steps: Step[];
  color?: string;
}

export default function ActionableSteps({ steps, color = '#3498db' }: ActionableStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#282b2f', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Target size={24} style={{ color }} />
        Actionable Steps
      </h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {steps.map((step, i) => (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              transition: 'transform 0.2s, box-shadow 0.2s',
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
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
            }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#282b2f', marginBottom: 4 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
