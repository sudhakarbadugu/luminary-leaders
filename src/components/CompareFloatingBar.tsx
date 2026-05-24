import { useState, useEffect } from 'react';
import { getCompareItems, clearCompare, type CompareItem } from '../utils/compare';
import CompareModal from './CompareModal';
import { GitCompare, X, Users } from 'lucide-react';

export default function CompareFloatingBar() {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(getCompareItems());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: '#282b2f',
        borderRadius: 12,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        maxWidth: '90vw',
      }}>
        <Users size={16} style={{ color: '#ffcc00', flexShrink: 0 }} />
        <div style={{ display: 'flex', gap: 8, overflow: 'auto', maxWidth: 300 }}>
          {items.map(item => (
            <span key={`${item.category}-${item.id}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#f1f1ee', background: 'rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap' }}>{item.name}</span>
          ))}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          disabled={items.length < 2}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            padding: '6px 16px',
            borderRadius: 99,
            border: 'none',
            background: items.length >= 2 ? '#ffcc00' : 'rgba(255,255,255,0.1)',
            color: items.length >= 2 ? '#282b2f' : '#968671',
            cursor: items.length >= 2 ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexShrink: 0,
          }}
        >
          <GitCompare size={14} /> Compare
        </button>
        <button
          onClick={() => { clearCompare(); setItems([]); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#968671', padding: 4, flexShrink: 0 }}
        >
          <X size={16} />
        </button>
      </div>
      {modalOpen && <CompareModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
